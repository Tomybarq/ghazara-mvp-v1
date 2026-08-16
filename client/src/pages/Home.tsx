import { useState } from "react";
import { content } from "@/data/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Logo } from "@/components/ui/Logo";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Briefcase, Code, LineChart, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const t = content[lang];
  const ar = lang === "ar";

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col" dir={ar ? "rtl" : "ltr"}>
      <Header lang={lang} setLang={setLang} />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-card to-background overflow-hidden">
          <div className="content-wrap grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="eyebrow inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {t.hero.eyebrow}
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
                {t.hero.title1}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">
                  {t.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {t.hero.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/contact" className="route-button route-button-primary h-14 px-8 text-sm font-bold flex items-center gap-2">
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className={`w-4 h-4 ${ar ? "rotate-180" : ""}`} />
                </Link>
                <a href="#services" className="route-button route-button-outline h-14 px-8 text-sm font-bold">
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-lg relative">
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-2xl shadow-md">
                {ar ? "موثوقية مؤسسية" : "Enterprise Trust"}
              </div>
              <div className="space-y-6">
                <Logo variant="transparent" size="lg" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.tagline}
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="space-y-1">
                    <div className="text-sm font-bold font-heading text-primary">{t.hero.statsValue1}</div>
                    <div className="text-[11px] text-muted-foreground">{t.hero.statsTitle1}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold font-heading text-primary">{t.hero.statsValue2}</div>
                    <div className="text-[11px] text-muted-foreground">{t.hero.statsTitle2}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold font-heading text-primary">{t.hero.statsValue3}</div>
                    <div className="text-[11px] text-muted-foreground">{t.hero.statsTitle3}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Summary Section */}
        <section id="about" className="py-24 bg-card border-y border-border">
          <div className="content-wrap grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="eyebrow">{t.about.eyebrow}</span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">{t.about.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.about.p1}</p>
              <p className="text-muted-foreground leading-relaxed">{t.about.p2}</p>
              <div className="pt-2">
                <Link href="/about" className="route-button route-button-outline px-6 py-3 text-xs inline-flex items-center gap-2">
                  <span>{ar ? "تعرف علينا أكثر" : "Learn More About Us"}</span>
                  <ArrowRight className={`w-4 h-4 ${ar ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.about.values.map((val, idx) => (
                <div key={idx} className="bg-background border border-border rounded-3xl p-6 shadow-xs space-y-3">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                  <h3 className="font-heading font-bold text-lg">{val.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section id="services" className="py-24 bg-background">
          <div className="content-wrap space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="eyebrow">{t.services.eyebrow}</span>
              <h2 className="text-3xl sm:text-4xl font-bold">{t.services.title}</h2>
              <p className="text-muted-foreground">{t.services.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.services.list.map((svc) => (
                <div key={svc.id} className="bg-card border border-border rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {svc.id === "marketing" && <TrendingUp className="w-6 h-6" />}
                      {svc.id === "trade" && <Briefcase className="w-6 h-6" />}
                      {svc.id === "digital" && <Code className="w-6 h-6" />}
                      {svc.id === "consulting" && <LineChart className="w-6 h-6" />}
                    </div>
                    <h3 className="font-heading font-bold text-lg">{svc.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{svc.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <Link href="/services" className="text-xs font-semibold text-primary hover:underline">
                      {ar ? "استعراض الخدمة ←" : "Explore Service →"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Showcase Section */}
        <section id="products" className="py-24 bg-card border-y border-border">
          <div className="content-wrap space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="eyebrow">{ar ? "المنتجات والمنصات" : "Products & Platforms"}</span>
              <h2 className="text-3xl sm:text-4xl font-bold">{ar ? "منصات وحلول رقمية مبتكرة" : "Innovative Digital Platforms & Solutions"}</h2>
              <p className="text-muted-foreground">{ar ? "نخبة من المنصات التجارية والخيرية التي طورتها ودعمتها غزارة." : "Curated commercial and non-profit platforms developed and supported by Ghazara."}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background border border-border rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">SaaS Enterprise</span>
                  <h3 className="font-heading font-bold text-xl">{ar ? "منصة معين الرقمية (Ma'een)" : "Ma'een Digital Platform"}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ar ? "منصة ساس متكاملة لخدمة الجمعيات الخيرية والمؤسسات غير الربحية في المملكة العربية السعودية." : "An integrated SaaS platform for charities and non-profit organizations in Saudi Arabia."}</p>
                </div>
                <div className="pt-4 border-t border-border">
                  <a href="https://github.com/Tomybarq/moeen-ngo" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                    <span>{ar ? "عرض المشروع على جيت هب" : "View on GitHub"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="bg-background border border-border rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-semibold">Core Portal</span>
                  <h3 className="font-heading font-bold text-xl">{ar ? "شبكة غزارة الرقمية (ghazara.net)" : "Ghazara Digital Network"}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ar ? "البوابة المركزية لخدماتنا ومشاريعنا التقنية والتسويقية للعملاء في المنطقة والعالم." : "The central gateway for our technical and marketing services for regional and global clients."}</p>
                </div>
                <div className="pt-4 border-t border-border">
                  <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                    <span>{ar ? "استكشاف المنتجات" : "Explore Products"}</span>
                    <ArrowRight className={`w-4 h-4 ${ar ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              </div>

              <div className="bg-background border border-border rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold">Enterprise Utilities</span>
                  <h3 className="font-heading font-bold text-xl">{ar ? "أنظمة إدارة الشبكات وميكروتيك" : "Network & MikroTik Systems"}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ar ? "أدوات متخصصة لمراقبة وتأمين شبكات الاتصالات وتوزيع النطاق الترددي بكفاءة عالية." : "Specialized tools for monitoring and securing telecom networks and bandwidth distribution."}</p>
                </div>
                <div className="pt-4 border-t border-border">
                  <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                    <span>{ar ? "معرفة المزيد" : "Learn More"}</span>
                    <ArrowRight className={`w-4 h-4 ${ar ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Proof / Partners Section */}
        <section className="py-24 bg-background">
          <div className="content-wrap space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="eyebrow">{ar ? "الثقة والاعتماد" : "Trust & Credibility"}</span>
              <h2 className="text-3xl sm:text-4xl font-bold">{ar ? "شركاء النجاح والقطاعات المخدومة" : "Success Partners & Sectors Served"}</h2>
              <p className="text-muted-foreground">{ar ? "نعتز بشراكاتنا مع المؤسسات الرائدة في التجارة والتقنية والعمل غير الربحي." : "Proud to partner with leading enterprises in commerce, tech, and non-profits."}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-card border border-border rounded-3xl p-6 shadow-xs">
                <div className="font-heading font-bold text-lg mb-1">{ar ? "التجارة والتجزئة" : "Retail & Commerce"}</div>
                <p className="text-xs text-muted-foreground">{ar ? "توريدات وسلاسل إمداد" : "Procurement & Supply"}</p>
              </div>
              <div className="bg-card border border-border rounded-3xl p-6 shadow-xs">
                <div className="font-heading font-bold text-lg mb-1">{ar ? "القطاع غير الربحي" : "Non-Profit Sector"}</div>
                <p className="text-xs text-muted-foreground">{ar ? "منصات ساس للجمعيات" : "SaaS for NGOs"}</p>
              </div>
              <div className="bg-card border border-border rounded-3xl p-6 shadow-xs">
                <div className="font-heading font-bold text-lg mb-1">{ar ? "التقنية والشبكات" : "Tech & Networks"}</div>
                <p className="text-xs text-muted-foreground">{ar ? "حلول ميكروتيك المتقدمة" : "Advanced MikroTik"}</p>
              </div>
              <div className="bg-card border border-border rounded-3xl p-6 shadow-xs">
                <div className="font-heading font-bold text-lg mb-1">{ar ? "ريادة الأعمال" : "Enterprises & Startups"}</div>
                <p className="text-xs text-muted-foreground">{ar ? "استراتيجيات التسويق والنمو" : "Marketing & Growth"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* RFQ & Contact Section */}
        <section id="rfq" className="py-24 bg-card border-t border-border">
          <div className="content-wrap max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <span className="eyebrow">{t.rfq.eyebrow}</span>
              <h2 className="text-3xl sm:text-5xl font-bold">{t.rfq.title}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">{t.rfq.subtitle}</p>
            </div>

            <div className="bg-background border border-border rounded-3xl p-8 sm:p-12 shadow-md">
              <Link href="/contact" className="route-button route-button-primary w-full h-14 text-sm font-bold flex items-center justify-center gap-2">
                <span>{ar ? "الانتقال إلى نموذج طلب الخدمة الكامل" : "Proceed to Full RFQ Form"}</span>
                <ArrowRight className={`w-4 h-4 ${ar ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
