import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { latinSlug, toDateInputValue, type BlogArticle, type BlogCategory } from "@/lib/blog";
import { toast } from "sonner";

export interface ArticleFormPayload {
  id?: number;
  title: string;
  titleEn: string | null;
  slug: string;
  summary: string | null;
  summaryEn: string | null;
  content: string;
  contentEn: string | null;
  featuredImage: string | null;
  categoryId: number | null;
  author: string;
  status: "draft" | "published";
  publishedAt: string | null;
  tags: string[];
}

interface FormState {
  title: string;
  titleEn: string;
  slug: string;
  summary: string;
  summaryEn: string;
  content: string;
  contentEn: string;
  featuredImage: string;
  categoryId: string;
  author: string;
  status: "draft" | "published";
  publishedAt: string;
  tags: string;
}

const emptyForm: FormState = {
  title: "",
  titleEn: "",
  slug: "",
  summary: "",
  summaryEn: "",
  content: "",
  contentEn: "",
  featuredImage: "",
  categoryId: "",
  author: "فريق غزارة",
  status: "draft",
  publishedAt: "",
  tags: "",
};

const selectClass =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:bg-input/30";

export default function ArticleEditorDialog({
  open,
  onOpenChange,
  article,
  categories,
  isSaving,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: BlogArticle | null;
  categories: BlogCategory[];
  isSaving: boolean;
  onSave: (payload: ArticleFormPayload) => void;
}) {
  const { isAr } = useLanguage();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (!open) return;

    setSlugTouched(Boolean(article));
    setForm(
      article
        ? {
            title: article.title,
            titleEn: article.titleEn ?? "",
            slug: article.slug,
            summary: article.summary ?? "",
            summaryEn: article.summaryEn ?? "",
            content: article.content,
            contentEn: article.contentEn ?? "",
            featuredImage: article.featuredImage ?? "",
            categoryId: article.categoryId ? String(article.categoryId) : "",
            author: article.author,
            status: article.status,
            publishedAt: toDateInputValue(article.publishedAt),
            tags: article.tags.map(tag => tag.name).join(", "),
          }
        : {
            ...emptyForm,
            publishedAt: new Date().toISOString().slice(0, 10),
          },
    );
  }, [open, article]);

  const update = (patch: Partial<FormState>) => setForm(current => ({ ...current, ...patch }));

  const handleTitleEn = (value: string) => {
    setForm(current => ({
      ...current,
      titleEn: value,
      slug: !slugTouched && latinSlug(value) ? latinSlug(value) : current.slug,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.title.trim() || !form.slug.trim() || !form.content.trim() || !form.author.trim()) {
      toast.error(
        isAr
          ? "يرجى تعبئة العنوان والرابط والمحتوى والكاتب."
          : "Please fill in the title, slug, content and author.",
      );
      return;
    }

    onSave({
      id: article?.id,
      title: form.title.trim(),
      titleEn: form.titleEn.trim() || null,
      slug: form.slug.trim(),
      summary: form.summary.trim() || null,
      summaryEn: form.summaryEn.trim() || null,
      content: form.content,
      contentEn: form.contentEn.trim() || null,
      featuredImage: form.featuredImage.trim() || null,
      categoryId: form.categoryId ? Number(form.categoryId) : null,
      author: form.author.trim(),
      status: form.status,
      publishedAt: form.status === "published" ? form.publishedAt || null : null,
      tags: form.tags
        .split(/[,،]/)
        .map(tag => tag.trim())
        .filter(Boolean),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {article
              ? isAr
                ? "تعديل المقال"
                : "Edit article"
              : isAr
                ? "مقال جديد"
                : "New article"}
          </DialogTitle>
          <DialogDescription>
            {isAr
              ? "اكتب المحتوى بصيغة Markdown بسيطة (# للعناوين، - للقوائم، ** للنص العريض)."
              : "Write the body in simple Markdown (# headings, - lists, ** bold)."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="article-title">{isAr ? "العنوان (عربي)" : "Title (Arabic)"}</Label>
              <Input
                id="article-title"
                value={form.title}
                onChange={event => update({ title: event.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="article-title-en">{isAr ? "العنوان (إنجليزي)" : "Title (English)"}</Label>
              <Input
                id="article-title-en"
                dir="ltr"
                value={form.titleEn}
                onChange={event => handleTitleEn(event.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="article-slug">Slug</Label>
              <Input
                id="article-slug"
                dir="ltr"
                value={form.slug}
                onChange={event => {
                  setSlugTouched(true);
                  update({ slug: latinSlug(event.target.value) });
                }}
                placeholder="my-article-slug"
                required
              />
              <p className="text-[11px] text-muted-foreground">
                {isAr
                  ? "يظهر في رابط المقال: /blog/my-article-slug"
                  : "Used in the article URL: /blog/my-article-slug"}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="article-author">{isAr ? "الكاتب" : "Author"}</Label>
              <Input
                id="article-author"
                value={form.author}
                onChange={event => update({ author: event.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="article-category">{isAr ? "التصنيف" : "Category"}</Label>
              <select
                id="article-category"
                className={selectClass}
                value={form.categoryId}
                onChange={event => update({ categoryId: event.target.value })}
              >
                <option value="">{isAr ? "بدون تصنيف" : "No category"}</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="article-status">{isAr ? "الحالة" : "Status"}</Label>
              <select
                id="article-status"
                className={selectClass}
                value={form.status}
                onChange={event =>
                  update({ status: event.target.value === "published" ? "published" : "draft" })
                }
              >
                <option value="draft">{isAr ? "مسودة" : "Draft"}</option>
                <option value="published">{isAr ? "منشور" : "Published"}</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="article-date">{isAr ? "تاريخ النشر" : "Publish date"}</Label>
              <Input
                id="article-date"
                type="date"
                value={form.publishedAt}
                disabled={form.status !== "published"}
                onChange={event => update({ publishedAt: event.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="article-summary">{isAr ? "الملخص (عربي)" : "Summary (Arabic)"}</Label>
            <Textarea
              id="article-summary"
              rows={3}
              value={form.summary}
              onChange={event => update({ summary: event.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="article-summary-en">{isAr ? "الملخص (إنجليزي)" : "Summary (English)"}</Label>
            <Textarea
              id="article-summary-en"
              dir="ltr"
              rows={3}
              value={form.summaryEn}
              onChange={event => update({ summaryEn: event.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="article-content">{isAr ? "المحتوى (Markdown)" : "Content (Markdown)"}</Label>
            <Textarea
              id="article-content"
              rows={10}
              value={form.content}
              onChange={event => update({ content: event.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="article-content-en">
              {isAr ? "المحتوى (إنجليزي)" : "Content (English)"}
            </Label>
            <Textarea
              id="article-content-en"
              dir="ltr"
              rows={6}
              value={form.contentEn}
              onChange={event => update({ contentEn: event.target.value })}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="article-image">{isAr ? "رابط صورة الغلاف" : "Featured image URL"}</Label>
              <Input
                id="article-image"
                dir="ltr"
                value={form.featuredImage}
                onChange={event => update({ featuredImage: event.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="article-tags">{isAr ? "الوسوم (مفصولة بفاصلة)" : "Tags (comma separated)"}</Label>
              <Input
                id="article-tags"
                value={form.tags}
                onChange={event => update({ tags: event.target.value })}
                placeholder={isAr ? "تجارة، أتمتة" : "trade, automation"}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {isAr ? "إلغاء" : "Cancel"}
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving
                ? isAr
                  ? "جارٍ الحفظ..."
                  : "Saving..."
                : isAr
                  ? "حفظ المقال"
                  : "Save article"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
