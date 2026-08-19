import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { productsData } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import { ExternalLink, CheckCircle2, ArrowUpRight, Search, Layers, Box } from "lucide-react";
import { Link } from "wouter";

import { isPubliclyPublishable } from "@/data/contentApproval";

export default function ProductsPage() {
  const { lang, isAr } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: { ar: "جميع المنتجات", en: "All Products" } },
    { id: "saas", label: { ar: "منصات سحابية SaaS", en: "Enterprise SaaS" } },
    { id: "portal", label: { ar: "بوابات رقمية", en: "Digital Portals" } },
    { id: "network", label: { ar: "حلول البنية والشبكات", en: "Network Solutions" } },
  ];

  const filteredProducts = useMemo(() => {
    const publishedList = productsData.filter(isPubliclyPublishable);
    return publishedList.filter((prod) => {
      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "saas" && prod.category === "saas") ||
        (selectedCategory === "portal" && prod.category === "portal") ||
        (selectedCategory === "network" && prod.category === "utilities");

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        prod.title[lang].toLowerCase().includes(query) ||
        prod.shortDesc[lang].toLowerCase().includes(query) ||
        prod.tag[lang].toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, lang]);

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead pageKey="products" />
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <section className="content-wrap py-10">
          <SiteBreadcrumb items={[{ label: isAr ? "المنتجات والمنصات" : "Products & Platforms" }]} />

          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">
              {isAr ? "المنتجات والحلول الرقمية" : "Products & Digital Solutions"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {isAr
                ? "منتجات رقمية وحلول مؤسسية مصممة للتميز"
                : "Digital Products & Enterprise Solutions Engineered for Excellence"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isAr
                ? "نخبة من المنصات والمنتجات التقنية التي نطورها وندعمها لخدمة قطاع الأعمال والمنظمات الإنسانية والتجارية."
                : "A curated portfolio of technical platforms and products we develop and maintain for enterprises, commerce, and non-profits."}
            </p>
          </div>
        </section>

        {/* Filters & Search Toolbar */}
        <section className="content-wrap pb-6 border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Filter Pills */}
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

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-muted-foreground absolute top-1/2 -translate-y-1/2 rtl:right-3 ltr:left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? "ابحث عن منتج أو منصة..." : "Search products & platforms..."}
                aria-label={isAr ? "ابحث عن منتج أو منصة" : "Search products & platforms"}
                className="w-full h-10 rounded-2xl border border-border bg-card rtl:pr-9 rtl:pl-4 ltr:pl-9 ltr:pr-4 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
              />
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="content-wrap py-6">
          {filteredProducts.length === 0 ? (
            <div className="bg-card border border-border rounded-3xl p-12 text-center space-y-3">
              <Box className="w-10 h-10 text-muted-foreground mx-auto" />
              <h3 className="font-heading font-bold text-lg">
                {isAr ? "لم يتم العثور على منتجات مطابقة" : "No matching products found"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isAr ? "جرب تغيير كلمات البحث أو الفئة المختارة." : "Try adjusting your search query or selected category."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-card border border-border rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-6 transition-all hover:border-primary/40"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {prod.tag[lang]}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {prod.category}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl">{prod.title[lang]}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {prod.shortDesc[lang]}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-border/50">
                      <span className="text-xs font-bold text-foreground block">
                        {isAr ? "الميزات والقدرات الأساسية:" : "Key Features & Capabilities:"}
                      </span>
                      <ul className="space-y-1.5">
                        {prod.keyFeatures.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span>{feat[lang]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                    <Link
                      href={`/products/${prod.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      <span>{isAr ? "تفاصيل المنتج" : "Product Details"}</span>
                      <ArrowUpRight className={`w-3.5 h-3.5 ${isAr ? "rotate-[-90deg]" : ""}`} />
                    </Link>

                    <Link
                      href={`/request-quote?product=${prod.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
                    >
                      <span>{isAr ? "طلب عرض سعر" : "Request RFQ"}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
