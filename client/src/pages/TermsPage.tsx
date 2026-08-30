import { useLanguage } from "@/contexts/LanguageContext";
import { companyData } from "@/data/company";
import { contactData } from "@/data/contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import { FileText, ShieldCheck, Scale, AlertCircle, HelpCircle } from "lucide-react";
import { Link } from "wouter";

export default function TermsPage() {
  const { lang, isAr } = useLanguage();

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead pageKey="terms" />
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <section className="content-wrap py-10">
          <SiteBreadcrumb items={[{ label: isAr ? "الشروط والأحكام" : "Terms & Conditions" }]} />

          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">
              {isAr ? "الإطار القانوني والتنظيمي" : "Legal Framework"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {isAr ? "الشروط والأحكام المؤسسية" : "Terms & Conditions"}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {isAr
                ? `تحكم هذه الوثيقة الشروط والضوابط المنظمة لاستخدام البوابة الرقمية لمؤسسة ${companyData.legalName.ar} والتعاملات التجارية وعروض الأسعار الناتجة عنها.`
                : `This document governs the terms of use for ${companyData.legalName.en} corporate portal and related commercial engagements and RFQ submissions.`}
            </p>
          </div>
        </section>

        <section className="content-wrap py-10 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* Section 1 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-heading">
                    {isAr ? "1. نطاق وسريان الشروط" : "1. Scope & Applicability"}
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {isAr
                    ? "تسري هذه الشروط على كافة زوار الموقع والشركات والمؤسسات التي تطلب عروض أسعار (RFQ) أو تستفيد من خدمات التمثيل التجاري أو الحلول التسويقية والتقنية المقدمة من مؤسسة غزارة."
                    : "These terms apply to all portal visitors, businesses, and enterprises requesting quotes (RFQ) or utilizing commercial representation, marketing, and technology solutions provided by Ghazara."}
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-heading">
                    {isAr ? "2. طلبات عروض الأسعار (RFQ) والتعاقد" : "2. RFQ & Commercial Contracts"}
                  </h2>
                </div>
                <div className="space-y-2 text-muted-foreground text-sm sm:text-base leading-relaxed">
                  <p>
                    {isAr
                      ? "• يُعد تقديم طلب عرض السعر عبر البوابة أو عبر قنوات WhatsApp المعتمدة طلباً استرشادياً لدراسة الاحتياج ولا يُمثل التزاماً تعاقدياً نهائياً إلا بعد صدور عرض السعر الرسمي وتوقيع اتفاقية تقديم الخدمة."
                      : "• Submitting an RFQ via the portal or official WhatsApp channels is an exploratory request and does not constitute a final binding contract until formal quote approval and agreement execution."}
                  </p>
                  <p>
                    {isAr
                      ? "• يلتزم العميل بتقديم بيانات دقيقة وصحيحة تمثل الصفة القانونية للنشاط التجاري أو المؤسسي."
                      : "• Clients commit to providing accurate and verified business information representing their legal entity."}
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-heading">
                    {isAr ? "3. الملكية الفكرية والعلامات التجارية" : "3. Intellectual Property"}
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {isAr
                    ? `كافة حقوق الملكية الفكرية، بما في ذلك الشعار المؤسسي، التصاميم، النصوص البرمجية، والمحتوى المنشور على البوابة هي ملك حصري لمؤسسة ${companyData.legalName.ar} ومحمية بموجب القوانين والأنظمة المعمول بها.`
                    : `All intellectual property rights, including brand marks, designs, codebases, and published content are exclusively owned by ${companyData.legalName.en} and protected by applicable laws.`}
                </p>
              </div>

              {/* Section 4 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-heading">
                    {isAr ? "4. القانون الواجب التطبيق والاختصاص القضائي" : "4. Governing Law"}
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {isAr
                    ? "تخضع هذه الشروط وتُفسر وفقاً للقوانين والأنظمة التجارية المعمول بها في الجمهورية اليمنية، ويكون الاختصاص القضائي للمحاكم التجارية المختصة في محافظة حضرموت."
                    : "These terms are governed and construed in accordance with the commercial laws of the Republic of Yemen, subject to the jurisdiction of competent commercial courts in Hadramout."}
                </p>
              </div>
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
                <h3 className="font-heading font-bold text-lg text-foreground">
                  {isAr ? "هل لديك استفسار قانوني؟" : "Have Legal Inquiries?"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {isAr
                    ? "لأي استفسارات حول الشروط التجارية أو العقود الرسمية، يمكنك التواصل مباشرة مع الإدارة التنفيذية."
                    : "For inquiries regarding commercial terms or agreements, contact executive management directly."}
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="route-button route-button-primary w-full text-xs font-bold py-3 text-center block"
                  >
                    {isAr ? "التواصل مع الإدارة" : "Contact Management"}
                  </Link>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-muted/40 border border-border space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <HelpCircle className="w-4 h-4" />
                  <span>{isAr ? "الأسئلة الشائعة" : "Frequently Asked"}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? "اطلع على إجابات الأسئلة المتكررة حول الخدمات والشراكات وآليات التوريد."
                    : "Explore answers to frequent questions regarding services, partnerships, and supply pipelines."}
                </p>
                <Link
                  href="/faq"
                  className="text-xs text-primary font-semibold hover:underline inline-block pt-1"
                >
                  {isAr ? "انتقل لصفحة الأسئلة ←" : "View FAQ Page →"}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
