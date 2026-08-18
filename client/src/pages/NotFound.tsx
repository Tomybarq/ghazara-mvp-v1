import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import { Home, Briefcase, FileText, Mail, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  const { isAr } = useLanguage();

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead pageKey="notFound" />
      <Header />

      <main className="flex-1 pt-32 pb-20 flex flex-col justify-center">
        <section className="content-wrap py-10">
          <SiteBreadcrumb items={[{ label: isAr ? "خطأ 404" : "404 Not Found" }]} />

          <div className="max-w-2xl mx-auto text-center space-y-6 bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
              <HelpCircle className="w-10 h-10" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E6833E] bg-[#E6833E]/10 px-3 py-1 rounded-full">
                Error 404
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold font-heading">
                {isAr ? "الصفحة المطلوبة غير موجودة" : "Page Not Found"}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                {isAr
                  ? "عذراً، الرابط الذي حاولت الوصول إليه غير متوفر أو قد يكون تم نقله أو تغييره. يمكنك استخدام الروابط السريعة أدناه للعودة لمسارك الصحيح."
                  : "Sorry, the page you requested is unavailable or may have been moved. You can use the quick recovery routes below to continue."}
              </p>
            </div>

            {/* Recovery Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 text-start">
              <Link
                href="/"
                className="p-4 rounded-2xl bg-background border border-border hover:border-primary/50 transition flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-foreground">
                    {isAr ? "الصفحة الرئيسية" : "Homepage"}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {isAr ? "العودة للواجهة الرسمية" : "Return to main portal"}
                  </p>
                </div>
              </Link>

              <Link
                href="/services"
                className="p-4 rounded-2xl bg-background border border-border hover:border-primary/50 transition flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-foreground">
                    {isAr ? "استعراض الخدمات" : "Explore Services"}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {isAr ? "مصفوفة خدمات الأعمال" : "Commercial services matrix"}
                  </p>
                </div>
              </Link>

              <Link
                href="/request-quote"
                className="p-4 rounded-2xl bg-background border border-border hover:border-primary/50 transition flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E6833E]/10 text-[#E6833E] flex items-center justify-center shrink-0 group-hover:bg-[#E6833E] group-hover:text-white transition">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-foreground">
                    {isAr ? "طلب عرض سعر" : "Request a Quote"}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {isAr ? "نموذج التسعير والاستشارة" : "RFQ & commercial quotes"}
                  </p>
                </div>
              </Link>

              <Link
                href="/contact"
                className="p-4 rounded-2xl bg-background border border-border hover:border-primary/50 transition flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-foreground">
                    {isAr ? "تواصل مع الإدارة" : "Contact Management"}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {isAr ? "قنوات الاتصال المباشرة" : "Direct inquiry channels"}
                  </p>
                </div>
              </Link>
            </div>

            <div className="pt-4">
              <Link
                href="/"
                className="route-button route-button-primary px-8 py-3.5 text-xs font-bold inline-flex items-center gap-2"
              >
                <span>{isAr ? "العودة إلى الصفحة الرئيسية" : "Go to Homepage"}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
