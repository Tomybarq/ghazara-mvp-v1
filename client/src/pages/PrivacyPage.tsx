import { useLanguage } from "@/contexts/LanguageContext";
import { companyData } from "@/data/company";
import { contactData } from "@/data/contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import { Lock, Shield, EyeOff, Database, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPage() {
  const { lang, isAr } = useLanguage();

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead pageKey="privacy" />
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <section className="content-wrap py-10">
          <SiteBreadcrumb items={[{ label: isAr ? "سياسة الخصوصية" : "Privacy Policy" }]} />

          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">
              {isAr ? "حماية وسرية البيانات" : "Data Protection & Privacy"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {isAr ? "سياسة الخصوصية وأمان المعلومات" : "Privacy Policy"}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {isAr
                ? `تلتزم مؤسسة ${companyData.legalName.ar} بأعلى معايير السرية والأمان في التعامل مع بيانات الشركاء والعملاء وطلبات عروض الأسعار.`
                : `${companyData.legalName.en} is committed to the highest standards of confidentiality and data security for all client and partner interactions.`}
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
                    <Database className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-heading">
                    {isAr ? "1. البيانات التي نقوم بجمعها" : "1. Information We Collect"}
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {isAr
                    ? "نجمع حصراً البيانات الضرورية لمعالجة طلباتكم التجارية والتواصل معكم، والتي تشمل:"
                    : "We exclusively collect information necessary to process commercial requests and communicate with you, including:"}
                </p>
                <ul className="space-y-2.5 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>{isAr ? "اسم المسؤول / جهة الاتصال والصفة الوظيفية." : "Contact person name and organizational title."}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>{isAr ? "اسم المنشأة أو الشركة والقطاع التجاري والنطاق الجغرافي." : "Business or company name, commercial sector, and geographic location."}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>{isAr ? "بيانات التواصل (رقم الهاتف، WhatsApp، البريد الإلكتروني)." : "Contact information (Phone number, WhatsApp, Email)."}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>{isAr ? "المتطلبات والملاحظات الفنية المرفقة بطلب عرض السعر." : "Technical specifications and notes attached to the RFQ."}</span>
                  </li>
                </ul>
              </div>

              {/* Section 2 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-heading">
                    {isAr ? "2. كيفية استخدام وحماية البيانات" : "2. How We Use & Protect Data"}
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {isAr
                    ? "تُستخدم البيانات المسجلة فقط لأغراض إعداد عروض الأسعار، وتنسيق سلاسل الإمداد، والتواصل التجاري المباشر. لا نقوم إطلاقاً ببيع أو تأجير أو مشاركة أي بيانات مع أي أطراف ثالثة لأغراض دعائية."
                    : "Logged data is strictly utilized to prepare commercial quotes, coordinate supply chains, and facilitate direct communications. We never sell, lease, or share business data with third parties for marketing purposes."}
                </p>
              </div>

              {/* Section 3 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-heading">
                    {isAr ? "3. التشفير والأمان الفني" : "3. Technical Security & Encryption"}
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {isAr
                    ? "تعتمد البوابة بروتوكول HTTPS المشفر وتخزين مشفر لقواعد البيانات لحماية تدفق البيانات من أي وصول غير مصرح به."
                    : "The portal implements HTTPS encryption and secure database access protocols to protect all data transmissions against unauthorized access."}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
                <h3 className="font-heading font-bold text-lg text-foreground">
                  {isAr ? "طلب حذف أو تعديل البيانات" : "Data Inquiries & Rights"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {isAr
                    ? "يحق لأي منشأة مسجلة طلب تعديل أو حذف بياناتها المسجلة لدينا في أي وقت عبر مراسلة البريد الرسمي."
                    : "Registered entities may request updating or deleting their stored data at any time via official email."}
                </p>
                <div className="pt-2">
                  <a
                    href={`mailto:${contactData.email.address}?subject=Privacy%20Data%20Request`}
                    className="route-button route-button-primary w-full text-xs font-bold py-3 text-center block"
                  >
                    {contactData.email.address}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
