import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { contentEditorProcedure, publicProcedure, router } from "./trpc";
import {
  BlogError,
  deleteArticle,
  deleteIncomingEmail,
  getArticleBySlug,
  listArticles,
  listCategories,
  listIncomingEmails,
  listRelatedArticles,
  saveArticle,
  setArticleStatus,
  setIncomingEmailRead,
} from "../blog";

const articleInput = z.object({
  id: z.number().int().positive().optional(),
  title: z.string().trim().min(3).max(255),
  titleEn: z.string().trim().max(255).nullish(),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must use lowercase latin letters, numbers and dashes"),
  summary: z.string().trim().max(1200).nullish(),
  summaryEn: z.string().trim().max(1200).nullish(),
  content: z.string().trim().min(1),
  contentEn: z.string().nullish(),
  featuredImage: z.string().trim().max(1024).nullish(),
  categoryId: z.number().int().positive().nullish(),
  author: z.string().trim().min(2).max(160),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().trim().max(40).nullish(),
  tags: z.array(z.string().trim().min(1).max(60)).max(12).optional(),
});

function rethrow(error: unknown): never {
  if (error instanceof BlogError) {
    if (error.code === "SLUG_TAKEN") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "هذا الرابط (slug) مستخدم بالفعل | This slug is already in use",
      });
    }
    if (error.code === "NOT_FOUND") {
      throw new TRPCError({ code: "NOT_FOUND", message: "Article not found" });
    }
    throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "Blog storage is unavailable" });
  }
  throw error;
}

export const blogRouter = router({
  list: publicProcedure.query(() => listArticles({ status: "published" })),

  categories: publicProcedure.query(() => listCategories()),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string().trim().min(1).max(255) }))
    .query(async ({ input }) => {
      const article = await getArticleBySlug(input.slug);
      if (!article) return null;
      const related = await listRelatedArticles(article.id, article.categoryId);
      return { article, related };
    }),

  admin: router({
    list: contentEditorProcedure.query(() => listArticles()),

    save: contentEditorProcedure.input(articleInput).mutation(async ({ input }) => {
      try {
        return await saveArticle(input);
      } catch (error) {
        rethrow(error);
      }
    }),

    setStatus: contentEditorProcedure
      .input(
        z.object({
          id: z.number().int().positive(),
          status: z.enum(["draft", "published"]),
        }),
      )
      .mutation(async ({ input }) => {
        try {
          await setArticleStatus(input.id, input.status);
          return { success: true } as const;
        } catch (error) {
          rethrow(error);
        }
      }),

    remove: contentEditorProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        try {
          await deleteArticle(input.id);
          return { success: true } as const;
        } catch (error) {
          rethrow(error);
        }
      }),
  }),
});

export const inboxRouter = router({
  list: contentEditorProcedure.query(() => listIncomingEmails()),

  setRead: contentEditorProcedure
    .input(z.object({ id: z.number().int().positive(), isRead: z.boolean() }))
    .mutation(async ({ input }) => {
      try {
        await setIncomingEmailRead(input.id, input.isRead);
        return { success: true } as const;
      } catch (error) {
        rethrow(error);
      }
    }),

  remove: contentEditorProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      try {
        await deleteIncomingEmail(input.id);
        return { success: true } as const;
      } catch (error) {
        rethrow(error);
      }
    }),
});
