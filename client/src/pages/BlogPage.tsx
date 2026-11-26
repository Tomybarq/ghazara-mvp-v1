import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { articleSummary, articleTitle } from "@/lib/blog";
import ArticleCard from "@/components/blog/ArticleCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import { BookOpen, RefreshCw, Search } from "lucide-react";

export default function BlogPage() {
  const { lang, isAr } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: posts, isLoading, isError, refetch } = trpc.blog.list.useQuery();
  const { data: categories } = trpc.blog.categories.useQuery();

  const filteredPosts = useMemo(() => {
    const list = posts ?? [];
    const query = searchQuery.trim().toLowerCase();

    return list.filter(article => {
      const matchesCategory =
        selectedCategory === "all" || article.category?.slug === selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;

      const haystack = [
        articleTitle(article, lang),
        articleSummary(article, lang),
        article.author,
        article.category?.name ?? "",
        ...article.tags.map(tag => tag.name),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [posts, selectedCategory, searchQuery, lang]);

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead pageKey="blog" />
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <section className="content-wrap py-10">
          <SiteBreadcrumb items={[{ label: isAr ? "المدونة والرؤى" : "Insights & Blog" }]} />

          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">
              {isAr ? "المدونة والرؤى المهنية" : "Insights & Articles"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {isAr
                ? "رؤى استراتيجية ومقالات في التجارة والتكنولوجيا"
                : "Strategic Insights & Articles in Trade & Technology"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isAr
                ? "مقالات تحليلية وخبرات عملية يقدمها فريق غزارة في مجالات التجارة، التسويق الرقمي، وتقنية المعلومات."
                : "Analytical articles and actionable intelligence from Ghazara experts across modern trade, digital growth, and enterprise IT."}
            </p>
            {!isLoading && !isError && (posts?.length ?? 0) > 0 && (
              <p className="mt-4 text-xs font-semibold text-primary">
                {isAr
                  ? `${posts?.length} مقالات منشورة`
                  : `${posts?.length} published ${posts?.length === 1 ? "article" : "articles"}`}
              </p>
            )}
          </div>
        </section>

        {/* Filters & Search Toolbar */}
        <section className="content-wrap pb-6 border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-2xl text-xs font-heading font-semibold transition cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {isAr ? "جميع المقالات" : "All Articles"}
              </button>
              {(categories ?? []).map(category => {
                const isActive = selectedCategory === category.slug;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-4 py-2 rounded-2xl text-xs font-heading font-semibold transition cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-muted-foreground absolute top-1/2 -translate-y-1/2 rtl:right-3 ltr:left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={isAr ? "ابحث في المقالات..." : "Search articles..."}
                aria-label={isAr ? "ابحث في المقالات" : "Search articles"}
                className="w-full h-10 rounded-2xl border border-border bg-card rtl:pr-9 rtl:pl-4 ltr:pl-9 ltr:pr-4 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
              />
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="content-wrap py-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2].map(index => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-3xl border border-border bg-card"
                >
                  <div className="aspect-[16/9] bg-muted" />
                  <div className="space-y-3 p-6">
                    <div className="h-3 w-24 rounded bg-muted" />
                    <div className="h-5 w-full rounded bg-muted" />
                    <div className="h-3 w-4/5 rounded bg-muted" />
                    <div className="h-3 w-2/3 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="bg-card border border-border rounded-3xl p-12 text-center space-y-3">
              <h3 className="font-heading font-bold text-lg">
                {isAr ? "تعذر تحميل المقالات" : "Couldn't load the articles"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isAr
                  ? "حدث خطأ أثناء جلب المقالات من الخادم. حاول مرة أخرى."
                  : "Something went wrong while fetching articles. Please try again."}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                {isAr ? "إعادة المحاولة" : "Retry"}
              </button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-card border border-border rounded-3xl p-12 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-muted-foreground mx-auto" />
              <h3 className="font-heading font-bold text-lg">
                {isAr ? "لا توجد مقالات مطابقة لبحثك" : "No matching articles found"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isAr
                  ? "جرب البحث بكلمات أخرى أو اختر جميع المقالات."
                  : "Try adjusting your query or category selection."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(article => (
                <ArticleCard key={article.id} article={article} lang={lang} isAr={isAr} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
