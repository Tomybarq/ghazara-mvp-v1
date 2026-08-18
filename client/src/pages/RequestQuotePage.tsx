import { useLanguage } from "@/contexts/LanguageContext";
import { contactData } from "@/data/contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import RFQForm from "@/components/quote/RFQForm";
import { ShieldCheck, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";

export default function RequestQuotePage() {
  const { isAr } = useLanguage();

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead pageKey="rfq" />
      <Header />

      <main className="flex-1 pt-32 pb-20">
        {/* Hero Section */}
        <section className="content-wrap py-10">
          <SiteBreadcrumb items={[{ label: isAr ? "طلب عرض سعر" : "Request Quote" }]} />

          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">
              {isAr ? "طلب عرض سعر أو استشارة" : "Request a Quote or Consultation"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {isAr ? "لنرسم معاً مسار طلبك التجاري بدقة" : "Let's Define Your Commercial Request with Precision"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isAr
                ? "املأ النموذج أدناه لتحديد متطلباتك وسيقوم فريق غزارة بدراسة الطلب وتقديم الحل الأنسب لنشاطك التجاري."
                : "Fill out the form below to outline your requirements and our team will analyze your request and deliver the optimal business solution."}
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="content-wrap py-8 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Assurance & Contact Sidebar */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-3xl p-8 shadow-xs space-y-5">
                <div className="flex items-center gap-2 text-primary font-bold font-heading">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="text-lg">{isAr ? "ضمانات غزارة المؤسسية" : "Institutional Assurance"}</h3>
                </div>

                <ul className="space-y-4 text-xs text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? "دراسة تجارية متخصصة تناسب بيئة السوق المستهدفة وقنوات التوزيع."
                        : "Specialized commercial assessment tailored to target market realities."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E6833E] shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? "حفظ نسخة آمنة من طلبك في منظومتنا الرقمية للمتابعة والتوثيق."
                        : "Secure copy of your request logged in our digital database for follow-up."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? "إمكانية إرسال نسخة فورية للإدارة عبر WhatsApp لتسريع المعالجة."
                        : "Instant WhatsApp copy handoff directly to management for rapid dispatch."}
                    </span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-border">
                  <p className="text-[11px] text-muted-foreground">
                    {isAr
                      ? "للتواصل المستعجل مباشرة مع الإدارة التنفيذية:"
                      : "For urgent inquiries with executive management:"}
                  </p>
                  <p className="text-sm font-bold text-foreground mt-1" dir="ltr">
                    {contactData.phone.display}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Form Column */}
            <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-md">
              <RFQForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
