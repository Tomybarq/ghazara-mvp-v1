import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogPostsData } from "@/data/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import { Calendar, Clock, User, Search, BookOpen } from "lucide-react";

export default function BlogPage() {
  const { lang, isAr } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: { ar: "جميع المقالات", en: "All Articles" } },
    { id: "trade", label: { ar: "التجارة والتمثيل التجاري", en: "Trade & Commerce" } },
    { id: "tech", label: { ar: "التكنولوجيا والمنصات", en: "Tech & Platforms" } },
    { id: "marketing", label: { ar: "التسويق الرقمي", en: "Digital Marketing" } },
  ];

  const filteredPosts = useMemo(() => {
    return blogPostsData.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "trade" && (post.category.ar.includes("تجارة") || post.category.en.includes("Trade"))) ||
        (selectedCategory === "tech" && (post.category.ar.includes("تقنية") || post.category.en.includes("Tech") || post.category.en.includes("SaaS"))) ||
        (selectedCategory === "marketing" && (post.category.ar.includes("تسويق") || post.category.en.includes("Marketing")));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title[lang].toLowerCase().includes(q) ||
        post.excerpt[lang].toLowerCase().includes(q) ||
        post.author[lang].toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, lang]);

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
          </div>
        </section>

        {/* Filters & Search Toolbar */}
        <section className="content-wrap pb-6 border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-2xl text-xs font-heading font-semibold transition cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.label[lang]}
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-muted-foreground absolute top-1/2 -translate-y-1/2 rtl:right-3 ltr:left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? "ابحث في المقالات..." : "Search articles..."}
                aria-label={isAr ? "ابحث في المقالات" : "Search articles"}
                className="w-full h-10 rounded-2xl border border-border bg-card rtl:pr-9 rtl:pl-4 ltr:pl-9 ltr:pr-4 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
              />
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="content-wrap py-6">
          {filteredPosts.length === 0 ? (
            <div className="bg-card border border-border rounded-3xl p-12 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-muted-foreground mx-auto" />
              <h3 className="font-heading font-bold text-lg">
                {isAr ? "لا توجد مقالات مطابقة لبحثك" : "No matching articles found"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isAr ? "جرب البحث بكلمات أخرى أو اختر جميع المقالات." : "Try adjusting your query or category selection."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPosts.map((art) => (
                <article
                  key={art.id}
                  className="bg-card border border-border rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-6 transition-all hover:border-primary/40"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {art.date[lang]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {art.readTime[lang]}
                      </span>
                    </div>

                    <span className="inline-block px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold">
                      {art.category[lang]}
                    </span>

                    <h3 className="font-heading font-bold text-xl leading-snug text-foreground">
                      {art.title[lang]}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {art.excerpt[lang]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-primary" />
                      {art.author[lang]}
                    </span>
                    <span className="font-semibold text-primary">
                      {isAr ? "مقال معتمد" : "Verified Article"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
