import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, User } from "lucide-react";
import {
  articleContent,
  articleSummary,
  articleTitle,
  estimateReadingMinutes,
  formatArticleDate,
  readingTimeLabel,
  type BlogArticle,
  type BlogLang,
} from "@/lib/blog";

export default function ArticleCard({
  article,
  lang,
  isAr,
}: {
  article: BlogArticle;
  lang: BlogLang;
  isAr: boolean;
}) {
  const minutes = estimateReadingMinutes(articleContent(article, lang));
  const date = formatArticleDate(article.publishedAt ?? article.createdAt, lang);

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/20 via-primary/5 to-accent">
        {article.featuredImage ? (
          <img
            src={article.featuredImage}
            alt={articleTitle(article, lang)}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen className="h-10 w-10 text-primary/35" aria-hidden="true" />
          </div>
        )}
        {article.category && (
          <span className="absolute top-4 start-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-bold text-primary shadow-xs backdrop-blur">
            {article.category.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
            {readingTimeLabel(minutes, lang)}
          </span>
        </div>

        <h2 className="font-heading text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {articleTitle(article, lang)}
        </h2>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {articleSummary(article, lang)}
        </p>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {article.tags.slice(0, 3).map(tag => (
              <span
                key={tag.slug}
                className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4 text-xs">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <User className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {article.author}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-primary">
            {isAr ? "اقرأ المقال" : "Read article"}
            {isAr ? (
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
