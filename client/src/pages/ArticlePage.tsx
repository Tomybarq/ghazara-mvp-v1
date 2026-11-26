import { Link, useParams } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import {
  articleContent,
  articleSummary,
  articleTitle,
  estimateReadingMinutes,
  formatArticleDate,
  readingTimeLabel,
} from "@/lib/blog";
import ArticleCard from "@/components/blog/ArticleCard";
import MarkdownContent from "@/components/blog/MarkdownContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import { ArrowLeft, ArrowRight, Calendar, Clock, Loader2, RefreshCw, User } from "lucide-react";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, isAr } = useLanguage();

  const { data, isLoading, isError, refetch } = trpc.blog.bySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: Boolean(slug) },
  );

  if (isLoading) {
    return (
      <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center pt-32 pb-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Loading" />
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-32 pb-20">
          <div className="content-wrap max-w-2xl">
            <div className="rounded-3xl border border-border bg-card p-12 text-center space-y-4">
              <h1 className="font-heading text-2xl font-bold">
                {isAr ? "تعذر تحميل المقال" : "Couldn't load this article"}
              </h1>
              <button
                type="button"
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                {isAr ? "إعادة المحاولة" : "Retry"}
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-32 pb-20">
          <div className="content-wrap max-w-2xl">
            <div className="rounded-3xl border border-border bg-card p-12 text-center space-y-4">
              <h1 className="font-heading text-2xl font-bold">
                {isAr ? "المقال غير موجود" : "Article not found"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isAr
                  ? "ربما تم حذف هذا المقال أو لم يُنشر بعد."
                  : "This article may have been removed or is not published yet."}
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                {isAr ? "العودة إلى المدونة" : "Back to Insights & Blog"}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { article, related } = data;
  const title = articleTitle(article, lang);
  const summary = articleSummary(article, lang);
  const content = articleContent(article, lang);
  const minutes = estimateReadingMinutes(content);
  const date = formatArticleDate(article.publishedAt ?? article.createdAt, lang);

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead pageKey="blog" customTitle={title} customDescription={summary} />
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <article className="content-wrap max-w-4xl">
          <SiteBreadcrumb
            items={[
              { label: isAr ? "المدونة والرؤى" : "Insights & Blog", href: "/blog" },
              { label: title },
            ]}
          />

          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            {isAr ? (
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {isAr ? "العودة إلى جميع المقالات" : "Back to all articles"}
          </Link>

          <header className="space-y-5">
            {article.category && (
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                {article.category.name}
              </span>
            )}

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight">
              {title}
            </h1>

            {summary && (
              <p className="text-lg leading-relaxed text-muted-foreground">{summary}</p>
            )}

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border py-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary" aria-hidden="true" />
                {article.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                {date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-500" aria-hidden="true" />
                {readingTimeLabel(minutes, lang)}
              </span>
            </div>
          </header>

          {article.featuredImage && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-border">
              <img
                src={article.featuredImage}
                alt={title}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          )}

          <div className="mt-10" dir={lang === "ar" ? "rtl" : "ltr"}>
            <MarkdownContent content={content} />
          </div>

          {article.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <span className="text-xs font-semibold text-muted-foreground">
                {isAr ? "الوسوم:" : "Tags:"}
              </span>
              {article.tags.map(tag => (
                <span
                  key={tag.slug}
                  className="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-12 rounded-3xl border border-border bg-card p-8 text-center space-y-3">
            <h2 className="font-heading text-xl font-bold">
              {isAr ? "هل تحتاج استشارة في هذا المجال؟" : "Need advice in this area?"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isAr
                ? "يتواصل فريق غزارة معك لفهم احتياجك واقتراح خطوة عملية واضحة."
                : "The Ghazara team can review your needs and propose a clear next step."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground"
            >
              {isAr ? "تواصل معنا" : "Contact us"}
              {isAr ? (
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </Link>
          </div>
        </article>

        {related.length > 0 && (
          <section className="content-wrap mt-16">
            <h2 className="mb-6 font-heading text-2xl font-bold">
              {isAr ? "مقالات ذات صلة" : "Related articles"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map(item => (
                <ArticleCard key={item.id} article={item} lang={lang} isAr={isAr} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
