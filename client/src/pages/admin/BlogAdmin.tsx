import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { formatArticleDate, type BlogArticle } from "@/lib/blog";
import DashboardLayout from "@/components/DashboardLayout";
import ArticleEditorDialog, {
  type ArticleFormPayload,
} from "@/components/admin/ArticleEditorDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, EyeOff, FileText, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function BlogAdmin() {
  const { lang, isAr } = useLanguage();
  const utils = trpc.useUtils();

  const { data: articles, isLoading, isError } = trpc.blog.admin.list.useQuery();
  const { data: categories } = trpc.blog.categories.useQuery();

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const [pendingDelete, setPendingDelete] = useState<BlogArticle | null>(null);

  const saveArticle = trpc.blog.admin.save.useMutation({
    onSuccess: () => {
      utils.blog.admin.list.invalidate();
      utils.blog.list.invalidate();
      setEditorOpen(false);
      setEditingArticle(null);
      toast.success(isAr ? "تم حفظ المقال" : "Article saved");
    },
    onError: error => toast.error(error.message),
  });

  const setStatus = trpc.blog.admin.setStatus.useMutation({
    onSuccess: () => {
      utils.blog.admin.list.invalidate();
      utils.blog.list.invalidate();
    },
    onError: error => toast.error(error.message),
  });

  const removeArticle = trpc.blog.admin.remove.useMutation({
    onSuccess: () => {
      utils.blog.admin.list.invalidate();
      utils.blog.list.invalidate();
      setPendingDelete(null);
      toast.success(isAr ? "تم حذف المقال" : "Article deleted");
    },
    onError: error => toast.error(error.message),
  });

  const openNew = () => {
    setEditingArticle(null);
    setEditorOpen(true);
  };

  const openEdit = (article: BlogArticle) => {
    setEditingArticle(article);
    setEditorOpen(true);
  };

  const handleSave = (payload: ArticleFormPayload) => saveArticle.mutate(payload);

  const toggleStatus = (article: BlogArticle) =>
    setStatus.mutate({
      id: article.id,
      status: article.status === "published" ? "draft" : "published",
    });

  const publishedCount = (articles ?? []).filter(article => article.status === "published").length;

  return (
    <DashboardLayout requireAuth={false}>
      <div className="mx-auto w-full max-w-6xl space-y-6 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {isAr ? "إدارة المقالات" : "Articles"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isAr
                ? `${articles?.length ?? 0} مقال — ${publishedCount} منشور`
                : `${articles?.length ?? 0} articles — ${publishedCount} published`}
            </p>
          </div>
          <Button onClick={openNew} className="gap-2">
            <Plus className="h-4 w-4" aria-hidden="true" />
            {isAr ? "مقال جديد" : "New article"}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center rounded-xl border border-border bg-card py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            {isAr ? "تعذر تحميل المقالات." : "Couldn't load articles."}
          </div>
        ) : (articles ?? []).length === 0 ? (
          <div className="space-y-3 rounded-xl border border-border bg-card p-12 text-center">
            <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {isAr ? "لا توجد مقالات بعد. ابدأ بأول مقال." : "No articles yet. Write your first one."}
            </p>
            <Button onClick={openNew} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" aria-hidden="true" />
              {isAr ? "إنشاء مقال" : "Create article"}
            </Button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isAr ? "العنوان" : "Title"}</TableHead>
                  <TableHead className="hidden md:table-cell">
                    {isAr ? "التصنيف" : "Category"}
                  </TableHead>
                  <TableHead>{isAr ? "الحالة" : "Status"}</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    {isAr ? "التاريخ" : "Date"}
                  </TableHead>
                  <TableHead className="text-end">{isAr ? "إجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(articles ?? []).map(article => (
                  <TableRow key={article.id}>
                    <TableCell className="max-w-[22rem]">
                      <div className="space-y-1">
                        <p className="truncate font-medium text-foreground">{article.title}</p>
                        <p dir="ltr" className="truncate text-[11px] text-muted-foreground">
                          /blog/{article.slug}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {article.category?.name ?? "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          article.status === "published"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }
                      >
                        {article.status === "published"
                          ? isAr
                            ? "منشور"
                            : "Published"
                          : isAr
                            ? "مسودة"
                            : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                      {formatArticleDate(article.publishedAt ?? article.updatedAt, lang)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        {article.status === "published" && (
                          <Link
                            href={`/blog/${article.slug}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            aria-label={isAr ? "عرض المقال" : "View article"}
                          >
                            <Eye className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleStatus(article)}
                          disabled={setStatus.isPending}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
                          aria-label={
                            article.status === "published"
                              ? isAr
                                ? "إلغاء النشر"
                                : "Unpublish"
                              : isAr
                                ? "نشر"
                                : "Publish"
                          }
                        >
                          {article.status === "published" ? (
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Eye className="h-4 w-4" aria-hidden="true" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(article)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          aria-label={isAr ? "تعديل" : "Edit"}
                        >
                          <Pencil className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingDelete(article)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          aria-label={isAr ? "حذف" : "Delete"}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <ArticleEditorDialog
        open={editorOpen}
        onOpenChange={open => {
          setEditorOpen(open);
          if (!open) setEditingArticle(null);
        }}
        article={editingArticle}
        categories={categories ?? []}
        isSaving={saveArticle.isPending}
        onSave={handleSave}
      />

      <ConfirmationDialog
        open={Boolean(pendingDelete)}
        onOpenChange={open => {
          if (!open) setPendingDelete(null);
        }}
        variant="destructive"
        title={isAr ? "حذف المقال" : "Delete article"}
        description={
          isAr
            ? `سيتم حذف «${pendingDelete?.title ?? ""}» نهائيًا.`
            : `"${pendingDelete?.title ?? ""}" will be permanently deleted.`
        }
        confirmLabel={isAr ? "حذف" : "Delete"}
        cancelLabel={isAr ? "إلغاء" : "Cancel"}
        loading={removeArticle.isPending}
        onConfirm={() => {
          if (pendingDelete) removeArticle.mutate({ id: pendingDelete.id });
        }}
      />
    </DashboardLayout>
  );
}
