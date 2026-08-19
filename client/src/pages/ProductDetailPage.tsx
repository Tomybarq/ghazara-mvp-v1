import { useParams, Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { productsData } from "@/data/products";
import { resolvePublishedProduct } from "@/data/detailRoutes";
import { isPubliclyPublishable } from "@/data/contentApproval";
import { contactData } from "@/data/contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import NotFound from "@/pages/NotFound";
import {
  CheckCircle2,
  ExternalLink,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Building2,
  MessageCircle,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, isAr } = useLanguage();

  const product = resolvePublishedProduct(slug);

  if (!product) {
    return <NotFound />;
  }

  const otherProducts = productsData.filter(
    (p) => isPubliclyPublishable(p) && p.id !== product.id
  );

  const seoTitle =
    product.seo?.title?.[lang] ||
    (isAr
      ? `${product.title.ar} | مؤسسة غزارة للتجارة والتسويق`
      : `${product.title.en} | Ghazara Trading & Marketing`);

  const seoDescription =
    product.seo?.description?.[lang] || product.shortDesc[lang];

  const handleWhatsAppInquiry = () => {
    const header = isAr
      ? `*استفسار بخصوص منتج/منصة: ${product.title.ar}*`
      : `*Inquiry regarding product/platform: ${product.title.en}*`;
    const body = isAr
      ? `السلام عليكم، أود الاستفسار وطلب تفاصيل وتكلفة التوريد أو الاشتراك الخاصة بـ (${product.title.ar}).`
      : `Hello, I would like to inquire about specifications and commercial quote for (${product.title.en}).`;

    window.open(
      `https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(
        `${header}\n\n${body}`
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead
        pageKey="products"
        customTitle={seoTitle}
        customDescription={seoDescription}
        customCanonicalPath={`/products/${product.slug}`}
      />
      <Header />

      <main className="flex-1 pt-32 pb-20">
        {/* Product Hero Section */}
        <section className="content-wrap py-8">
          <SiteBreadcrumb
            items={[
              {
                label: isAr ? "المنتجات والمنصات" : "Products & Platforms",
                href: "/products",
              },
              { label: product.title[lang] },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-heading">
                  {product.tag[lang]}
                </span>
                <span className="px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground text-[11px] font-mono uppercase">
                  {product.category}
                </span>
                {product.status === "live" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{isAr ? "جاهز للتشغيل والربط" : "Live & Operational"}</span>
                  </span>
                )}
                {product.status === "enterprise" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isAr ? "حلول مؤسسية متقدمة" : "Enterprise Custom"}</span>
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight leading-tight">
                {product.title[lang]}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {product.overview ? product.overview[lang] : product.shortDesc[lang]}
              </p>

              {/* Primary Action Row */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/request-quote?product=${product.slug}`}
                  className="route-button route-button-primary px-7 py-3.5 text-sm font-bold shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <span>{isAr ? "طلب عرض سعر أو استشارة" : "Request a Quote"}</span>
                  <ArrowUpRight className={`w-4 h-4 ${isAr ? "rotate-[-90deg]" : ""}`} />
                </Link>

                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="route-button bg-[#25D366] text-white hover:bg-[#20ba5a] px-6 py-3.5 text-sm font-bold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? "استفسار مباشر عبر واتساب" : "Direct WhatsApp"}</span>
                </button>

                {product.externalLink && (
                  <a
                    href={product.externalLink}
                    target="_blank"
                    rel="noreferrer"
                    className="route-button route-button-outline px-5 py-3.5 text-xs font-medium flex items-center gap-2"
                  >
                    <span>{isAr ? "مستودع المشروع المفتوح" : "View Source Repository"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Metadata Sidebar Card */}
            <div className="lg:col-span-4 bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
              <h3 className="font-heading font-bold text-base border-b border-border pb-3">
                {isAr ? "بطاقة تعريف المنظومة" : "Specification Summary"}
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-muted-foreground block mb-1">
                    {isAr ? "النوع والتصنيف:" : "Architecture Type:"}
                  </span>
                  <span className="font-bold text-foreground block text-sm">
                    {product.tag[lang]}
                  </span>
                </div>

                {product.sectors && product.sectors.length > 0 && (
                  <div>
                    <span className="text-muted-foreground block mb-1">
                      {isAr ? "القطاعات المستفيدة:" : "Target Sectors:"}
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.sectors.map((sec) => (
                        <span
                          key={sec.id}
                          className="px-2.5 py-1 rounded-xl bg-muted text-foreground text-[11px] font-medium"
                        >
                          {sec.label[lang]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-border">
                  <span className="text-muted-foreground block mb-1">
                    {isAr ? "مرجع الاعتماد المؤسسي:" : "Approval Reference:"}
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isAr ? "معتمد وموثق رسمياً" : "Verified & Approved"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Capabilities & Description */}
        <section className="content-wrap py-12 border-t border-border space-y-12">
          {/* Detailed Overview */}
          <div className="max-w-4xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              {isAr ? "تفاصيل المنظومة والقيمة التشغيلية" : "Operational Architecture & Scope"}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {product.fullDesc[lang]}
            </p>
          </div>

          {/* Key Capabilities Grid */}
          {product.capabilities && product.capabilities.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-bold text-foreground">
                {isAr ? "القدرات الهندسية والميزات المتخصصة" : "Core Capabilities & Modules"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.capabilities.map((cap) => (
                  <div
                    key={cap.id}
                    className="bg-card border border-border rounded-3xl p-6 shadow-xs space-y-3"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-foreground">
                      {cap.title[lang]}
                    </h4>
                    {cap.description && (
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {cap.description[lang]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features List */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-lg text-foreground">
              {isAr ? "المزايا والمواصفات الفنية الرئيسية" : "Key Specifications & Features"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {product.keyFeatures.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{feat[lang]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contextual RFQ Conversion Card */}
          <div className="rounded-3xl bg-linear-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-start">
              <span className="eyebrow">
                {isAr ? "طلب الخدمة أو المنصة" : "Procurement & Consultation"}
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                {isAr
                  ? `هل ترغب في الاستفادة من (${product.title.ar})؟`
                  : `Looking to deploy or license (${product.title.en})?`}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                {isAr
                  ? "تواصل مع فريق مؤسسة غزارة لبحث متطلبات مؤسستك، دراسة الجدوى الفنية، والحصول على عرض سعر مفصل."
                  : "Connect with Ghazara specialists to evaluate your enterprise requirements and receive a structured quote."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href={`/request-quote?product=${product.slug}`}
                className="route-button route-button-primary px-6 py-3.5 text-xs sm:text-sm font-bold text-center"
              >
                <span>{isAr ? "طلب عرض سعر للمنصة" : "Request RFQ"}</span>
                <ArrowUpRight className={`w-4 h-4 ${isAr ? "rotate-[-90deg]" : ""}`} />
              </Link>
            </div>
          </div>

          {/* Related Products Carousel / Grid */}
          {otherProducts.length > 0 && (
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-heading font-bold text-foreground">
                  {isAr ? "منتجات وحلول أخرى من غزارة" : "Other Products & Platforms"}
                </h3>
                <Link
                  href="/products"
                  className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>{isAr ? "عرض جميع المنتجات" : "View All Products"}</span>
                  {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="bg-card border border-border hover:border-primary/50 rounded-3xl p-6 transition-all shadow-xs flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-primary font-heading">
                        {p.tag[lang]}
                      </span>
                      <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {p.title[lang]}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {p.shortDesc[lang]}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold text-primary">
                      <span>{isAr ? "استعراض التفاصيل" : "View Details"}</span>
                      <ArrowUpRight className={`w-4 h-4 ${isAr ? "rotate-[-90deg]" : ""}`} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
