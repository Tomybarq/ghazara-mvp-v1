import { and, desc, eq, inArray, ne } from "drizzle-orm";
import { getDb } from "./db";
import {
  articleTags,
  articles,
  categories,
  incomingEmails,
  tags,
  type Article,
  type Category,
} from "../drizzle/schema";

type Database = NonNullable<Awaited<ReturnType<typeof getDb>>>;

export type ArticleTagView = { name: string; slug: string };

export type ArticleWithMeta = Article & {
  category: Pick<Category, "id" | "name" | "slug"> | null;
  tags: ArticleTagView[];
};

export type ArticleStatus = "draft" | "published";

export interface ArticleInput {
  id?: number;
  title: string;
  titleEn?: string | null;
  slug: string;
  summary?: string | null;
  summaryEn?: string | null;
  content: string;
  contentEn?: string | null;
  featuredImage?: string | null;
  categoryId?: number | null;
  author: string;
  status: ArticleStatus;
  publishedAt?: string | null;
  tags?: string[];
}

export class BlogError extends Error {
  constructor(public code: "DB_UNAVAILABLE" | "SLUG_TAKEN" | "NOT_FOUND") {
    super(code);
  }
}

/** Builds a URL-safe slug that also keeps non-latin (e.g. Arabic) letters. */
export function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    // Latin letters, digits and the Arabic block (keeps Arabic tags readable).
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
  return slug || "tag";
}

async function requireDb(): Promise<Database> {
  const db = await getDb();
  if (!db) throw new BlogError("DB_UNAVAILABLE");
  return db;
}

async function attachMeta(db: Database, rows: Article[]): Promise<ArticleWithMeta[]> {
  if (rows.length === 0) return [];

  const articleIds = rows.map(row => row.id);
  const categoryIds = Array.from(
    new Set(rows.map(row => row.categoryId).filter((id): id is number => id !== null)),
  );

  const categoryRows = categoryIds.length
    ? await db
        .select({ id: categories.id, name: categories.name, slug: categories.slug })
        .from(categories)
        .where(inArray(categories.id, categoryIds))
    : [];

  const tagRows = await db
    .select({ articleId: articleTags.articleId, name: tags.name, slug: tags.slug })
    .from(articleTags)
    .innerJoin(tags, eq(tags.id, articleTags.tagId))
    .where(inArray(articleTags.articleId, articleIds));

  const categoryById = new Map(categoryRows.map(category => [category.id, category]));
  const tagsByArticle = new Map<number, ArticleTagView[]>();
  for (const row of tagRows) {
    const list = tagsByArticle.get(row.articleId) ?? [];
    list.push({ name: row.name, slug: row.slug });
    tagsByArticle.set(row.articleId, list);
  }

  return rows.map(row => ({
    ...row,
    category: row.categoryId ? categoryById.get(row.categoryId) ?? null : null,
    tags: tagsByArticle.get(row.id) ?? [],
  }));
}

export async function listCategories(): Promise<Category[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(categories).orderBy(categories.name);
}

export async function listArticles(options: { status?: ArticleStatus; limit?: number } = {}) {
  const db = await getDb();
  if (!db) return [] as ArticleWithMeta[];

  const { status, limit = 60 } = options;
  const base = db.select().from(articles);
  const rows = status
    ? await base
        .where(eq(articles.status, status))
        .orderBy(desc(articles.publishedAt), desc(articles.createdAt))
        .limit(limit)
    : await base.orderBy(desc(articles.updatedAt)).limit(limit);

  return attachMeta(db, rows);
}

export async function getArticleBySlug(
  slug: string,
  options: { includeDrafts?: boolean } = {},
): Promise<ArticleWithMeta | null> {
  const db = await getDb();
  if (!db) return null;

  const condition = options.includeDrafts
    ? eq(articles.slug, slug)
    : and(eq(articles.slug, slug), eq(articles.status, "published"));

  const rows = await db.select().from(articles).where(condition).limit(1);
  if (rows.length === 0) return null;
  const [article] = await attachMeta(db, rows);
  return article ?? null;
}

export async function listRelatedArticles(
  articleId: number,
  categoryId: number | null,
  limit = 3,
): Promise<ArticleWithMeta[]> {
  const db = await getDb();
  if (!db) return [];

  const sameCategory = categoryId
    ? await db
        .select()
        .from(articles)
        .where(
          and(
            eq(articles.status, "published"),
            eq(articles.categoryId, categoryId),
            ne(articles.id, articleId),
          ),
        )
        .orderBy(desc(articles.publishedAt))
        .limit(limit)
    : [];

  if (sameCategory.length >= limit) return attachMeta(db, sameCategory);

  const excludeIds = [articleId, ...sameCategory.map(row => row.id)];
  const latest = await db
    .select()
    .from(articles)
    .where(and(eq(articles.status, "published"), ne(articles.id, articleId)))
    .orderBy(desc(articles.publishedAt))
    .limit(limit + excludeIds.length);

  const filler = latest
    .filter(row => !excludeIds.includes(row.id))
    .slice(0, limit - sameCategory.length);

  return attachMeta(db, [...sameCategory, ...filler]);
}

async function syncArticleTags(db: Database, articleId: number, tagNames: string[]) {
  await db.delete(articleTags).where(eq(articleTags.articleId, articleId));

  const clean = Array.from(
    new Set(tagNames.map(name => name.trim()).filter(Boolean)),
  ).slice(0, 12);
  if (clean.length === 0) return;

  for (const name of clean) {
    const slug = slugify(name);
    await db
      .insert(tags)
      .values({ name, slug })
      .onDuplicateKeyUpdate({ set: { name } });

    const [tag] = await db.select({ id: tags.id }).from(tags).where(eq(tags.slug, slug)).limit(1);
    if (!tag) continue;

    await db
      .insert(articleTags)
      .values({ articleId, tagId: tag.id })
      .onDuplicateKeyUpdate({ set: { tagId: tag.id } });
  }
}

export async function saveArticle(input: ArticleInput): Promise<{ id: number }> {
  const db = await requireDb();

  const clash = await db
    .select({ id: articles.id })
    .from(articles)
    .where(eq(articles.slug, input.slug))
    .limit(1);

  if (clash.length > 0 && clash[0].id !== input.id) {
    throw new BlogError("SLUG_TAKEN");
  }

  const publishedAt =
    input.status === "published"
      ? input.publishedAt
        ? new Date(input.publishedAt)
        : new Date()
      : null;

  const values = {
    title: input.title,
    titleEn: input.titleEn?.trim() || null,
    slug: input.slug,
    summary: input.summary?.trim() || null,
    summaryEn: input.summaryEn?.trim() || null,
    content: input.content,
    contentEn: input.contentEn?.trim() || null,
    featuredImage: input.featuredImage?.trim() || null,
    categoryId: input.categoryId ?? null,
    author: input.author,
    status: input.status,
    publishedAt,
  };

  let articleId = input.id;

  if (articleId) {
    const updated = await db
      .update(articles)
      .set(values)
      .where(eq(articles.id, articleId))
      .limit(1);
    if (updated[0].affectedRows === 0) throw new BlogError("NOT_FOUND");
  } else {
    const [inserted] = await db.insert(articles).values(values);
    articleId = Number(inserted.insertId);
  }

  await syncArticleTags(db, articleId, input.tags ?? []);
  return { id: articleId };
}

export async function setArticleStatus(id: number, status: ArticleStatus): Promise<void> {
  const db = await requireDb();
  await db
    .update(articles)
    .set({
      status,
      publishedAt: status === "published" ? new Date() : null,
    })
    .where(eq(articles.id, id));
}

export async function deleteArticle(id: number): Promise<void> {
  const db = await requireDb();
  await db.delete(articleTags).where(eq(articleTags.articleId, id));
  await db.delete(articles).where(eq(articles.id, id));
}

/* ------------------------------------------------------------------ */
/* Inbound domain mail                                                 */
/* ------------------------------------------------------------------ */

export async function listIncomingEmails(limit = 100) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(incomingEmails)
    .orderBy(desc(incomingEmails.receivedAt))
    .limit(limit);
}

export async function createIncomingEmail(input: {
  sender: string;
  recipient: string;
  subject: string | null;
  body: string | null;
  receivedAt?: Date;
}): Promise<{ id: number } | null> {
  const db = await getDb();
  if (!db) return null;

  const [inserted] = await db.insert(incomingEmails).values({
    sender: input.sender,
    recipient: input.recipient,
    subject: input.subject,
    body: input.body,
    receivedAt: input.receivedAt ?? new Date(),
    isRead: false,
  });

  return { id: Number(inserted.insertId) };
}

export async function setIncomingEmailRead(id: number, isRead: boolean): Promise<void> {
  const db = await requireDb();
  await db.update(incomingEmails).set({ isRead }).where(eq(incomingEmails.id, id));
}

export async function deleteIncomingEmail(id: number): Promise<void> {
  const db = await requireDb();
  await db.delete(incomingEmails).where(eq(incomingEmails.id, id));
}
