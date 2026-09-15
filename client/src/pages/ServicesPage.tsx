import { useLanguage } from "@/contexts/LanguageContext";
import { servicesData } from "@/data/services";
import { contactData } from "@/data/contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import { Briefcase, TrendingUp, Code, LineChart, ArrowUpRight, CheckCircle2, ArrowRight, ShieldCheck, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function ServicesPage() {
  const { lang, isAr } = useLanguage();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6" />;
      case "Briefcase":
        return <Briefcase className="w-6 h-6" />;
      case "Code":
        return <Code className="w-6 h-6" />;
      case "LineChart":
      default:
        return <LineChart className="w-6 h-6" />;
    }
  };

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead pageKey="services" />
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <section className="content-wrap py-10">
          <SiteBreadcrumb items={[{ label: isAr ? "خدماتنا" : "Our Services" }]} />

          <div className="max-w-3xl space-y-4">
            <span className="eyebrow inline-block">
              {isAr ? "مصفوفة الخدمات المتكاملة" : "Integrated Services Matrix"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              {isAr
                ? "حلول مؤسسية متكاملة مصممة لنمو وريادة أعمالك"
                : "Integrated Enterprise Solutions Engineered for Business Growth"}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {isAr
                ? "نغطي كافة الاحتياجات التجارية والتسويقية والتقنية لتمكين منشأتك من المنافسة والتوسع بكفاءة في الأسواق المستهدفة."
                : "Covering commercial, marketing, and technical requirements to empower your organization to scale across target markets."}
            </p>
          </div>
        </section>

        <section className="content-wrap py-12 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {servicesData.map((svc) => (
              <div
                key={svc.id}
                className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-xs flex flex-col justify-between space-y-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {getServiceIcon(svc.icon)}
                    </div>
                    <span className="text-xs font-mono font-bold text-muted-foreground px-3 py-1 bg-muted/60 rounded-full border border-border">
                      {svc.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-2xl mb-2 text-foreground">{svc.title[lang]}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {svc.fullDesc[lang]}
                    </p>
                  </div>

                  {/* Problem Solved & Value Delivered */}
                  <div className="space-y-3 pt-2">
                    <div className="rounded-2xl bg-muted/40 p-4 border border-border/50 space-y-1">
                      <span className="text-xs font-bold text-foreground block">
                        {isAr ? "التحدي الذي نعالجه:" : "Problem Solved:"}
                      </span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {svc.problemSolved[lang]}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-primary/5 p-4 border border-primary/15 space-y-1">
                      <span className="text-xs font-bold text-primary block">
                        {isAr ? "القيمة المحققة لأعمالك:" : "Value Delivered:"}
                      </span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {svc.valueDelivered[lang]}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2">
                      {svc.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{feat[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href={`/request-quote?service=${svc.id}`}
                    className="route-button route-button-primary px-6 py-3 text-xs sm:text-sm font-bold inline-flex items-center gap-2"
                  >
                    <span>{isAr ? "طلب هذه الخدمة" : "Request This Service"}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isAr ? "rotate-[-90deg]" : ""}`} />
                  </Link>

                  <a
                    href={`https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(
                      isAr
                        ? `مرحبًا، أود الاستفسار عن خدمة (${svc.title.ar}) في مؤسسة غزارة.`
                        : `Hello, I'd like to inquire about the (${svc.title.en}) service at Ghazara.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-bold inline-flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isAr ? "استفسار فوري واتساب" : "Direct WhatsApp"}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-card border border-border rounded-3xl p-10 max-w-3xl mx-auto space-y-5 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
              {isAr ? "هل تبحث عن خطة عمل تجارية أو تسويقية مخصصة؟" : "Looking for a Custom Commercial or Marketing Plan?"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              {isAr
                ? "فريقنا مستعد لدراسة احتياجك وتقديم خطة عمل متكاملة تناسب أهدافك ونطاق نشاطك في السوق."
                : "Our team is ready to analyze your requirements and build an actionable plan aligned with your budget and commercial goals."}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/request-quote"
                className="route-button route-button-primary px-8 py-3.5 text-sm font-bold inline-flex items-center gap-2"
              >
                <span>{isAr ? "اطلب عرض سعر الآن" : "Request a Quote Now"}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/contact"
                className="route-button route-button-outline px-7 py-3.5 text-sm font-bold inline-flex items-center gap-2"
              >
                <span>{isAr ? "تواصل مع الإدارة" : "Contact Management"}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

