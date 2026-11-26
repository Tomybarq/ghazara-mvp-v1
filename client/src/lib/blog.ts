import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../../server/routers";

export type BlogArticle = inferRouterOutputs<AppRouter>["blog"]["list"][number];
export type BlogCategory = inferRouterOutputs<AppRouter>["blog"]["categories"][number];
export type InboxEmail = inferRouterOutputs<AppRouter>["inbox"]["list"][number];
export type BlogLang = "ar" | "en";

/** Arabic-first fallback: an empty translation falls back to the other language. */
export function localizedText(
  ar: string | null | undefined,
  en: string | null | undefined,
  lang: BlogLang,
): string {
  const value = lang === "en" ? en?.trim() || ar : ar?.trim() || en;
  return value ?? "";
}

export function articleTitle(article: BlogArticle, lang: BlogLang): string {
  return localizedText(article.title, article.titleEn, lang);
}

export function articleSummary(article: BlogArticle, lang: BlogLang): string {
  return localizedText(article.summary, article.summaryEn, lang);
}

export function articleContent(article: BlogArticle, lang: BlogLang): string {
  return localizedText(article.content, article.contentEn, lang);
}

export function estimateReadingMinutes(content: string | null | undefined): number {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function readingTimeLabel(minutes: number, lang: BlogLang): string {
  if (lang === "en") return `${minutes} min read`;
  if (minutes === 1) return "دقيقة واحدة للقراءة";
  if (minutes === 2) return "دقيقتان للقراءة";
  return `${minutes} دقائق للقراءة`;
}

export function formatArticleDate(
  value: Date | string | null | undefined,
  lang: BlogLang,
): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function toDateInputValue(value: Date | string | null | undefined): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

/** URL slug for article routes (latin, numbers and dashes only). */
export function latinSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}
