import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { contactData } from "@/data/contact";
import { trackConversion } from "@/lib/analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import { Mail, MapPin, Phone, MessageCircle, Send, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

const inquiryTypes = [
  { id: "general", label: { ar: "استفسار عام ومعلومات", en: "General Inquiry & Info" } },
  { id: "partnership", label: { ar: "شراكة وتمثيل تجاري", en: "Partnership & Representation" } },
  { id: "procurement", label: { ar: "توريدات وسلاسل إمداد", en: "Procurement & Supply" } },
  { id: "tech", label: { ar: "حلول تقنية ومنصات سحابية", en: "Tech Solutions & SaaS" } },
  { id: "marketing", label: { ar: "خدمات واستشارات تسويقية", en: "Marketing & Advisory" } },
];

export default function ContactPage() {
  const { lang, isAr } = useLanguage();

  const [inquiryType, setInquiryType] = useState("general");
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !organization.trim() || !message.trim()) {
      toast.error(
        isAr
          ? "يرجى تعبئة الاسم واسم الجهة وتفاصيل الرسالة."
          : "Please enter your name, organization, and message details."
      );
      return;
    }

    setIsSubmitting(true);
    // Simulate immediate clean local log / dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      trackConversion({
        name: "submit_contact",
        properties: {
          category: inquiryType,
          locale: lang,
        },
      });
      toast.success(
        isAr ? "تم استلام رسالتك وسيتواصل معك فريقنا." : "Your message has been received."
      );
    }, 400);
  };

  const selectedInquiry = inquiryTypes.find((t) => t.id === inquiryType);

  const handleWhatsAppHandoff = () => {
    trackConversion({
      name: "click_whatsapp",
      properties: {
        source: "contact_page",
        locale: lang,
      },
    });

    const header = isAr ? "*رسالة تواصل واستفسار — مؤسسة غزارة*" : "*Inbound Contact Message — Ghazara*";
    const nameLabel = isAr ? "الاسم" : "Name";
    const orgLabel = isAr ? "الجهة" : "Organization";
    const typeLabel = isAr ? "نوع الاستفسار" : "Inquiry Type";
    const emailLabel = isAr ? "البريد" : "Email";
    const phoneLabel = isAr ? "الهاتف" : "Phone";
    const msgLabel = isAr ? "نص الرسالة" : "Message";

    const msg = `${header}\n\n${nameLabel}: ${fullName.trim()}\n${orgLabel}: ${organization.trim()}\n${typeLabel}: ${
      selectedInquiry?.label[lang] || inquiryType
    }${email.trim() ? `\n${emailLabel}: ${email.trim()}` : ""}${
      phone.trim() ? `\n${phoneLabel}: ${phone.trim()}` : ""
    }\n\n${msgLabel}:\n${message.trim()}`;

    window.open(
      `https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead pageKey="contact" />
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <section className="content-wrap py-10">
          <SiteBreadcrumb items={[{ label: isAr ? "اتصل بنا" : "Contact Us" }]} />

          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">
              {isAr ? "قنوات التواصل المؤسسي المباشر" : "Direct Corporate Channels"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {isAr ? "تواصل معنا أو ابدأ محادثة عمل مباشرة" : "Contact Us or Start a Direct Business Inquiry"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isAr
                ? "فريق إدارة غزارة مستعد للإجابة على استفساراتكم وبناء علاقات تجارية وشراكات استراتيجية موثوقة."
                : "Ghazara management is ready to address your inquiries and build dependable commercial partnerships."}
            </p>
          </div>
        </section>

        <section className="content-wrap py-12 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Column */}
            <div className="space-y-8 bg-card border border-border rounded-3xl p-8 shadow-xs">
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">
                  {isAr ? "المقر وبيانات الاتصال" : "Headquarters & Channels"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isAr
                    ? "القنوات الرسمية المعتمدة لإدارة ومراسلات مؤسسة غزارة."
                    : "Official verified channels for Ghazara management and corporate communications."}
                </p>
              </div>

              <ul className="space-y-6 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <span className="font-bold block">{isAr ? "العنوان المؤسسي" : "Corporate Address"}</span>
                    <span className="text-muted-foreground leading-relaxed">{contactData.address.display[lang]}</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#E6833E] shrink-0" />
                  <div>
                    <span className="font-bold block">{isAr ? "أوقات العمل الرسمية" : "Operating Hours"}</span>
                    <span className="text-muted-foreground">{contactData.workingHours?.display[lang]}</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="font-bold block">{isAr ? "البريد الإلكتروني المعتمد" : "Corporate Email"}</span>
                    <a href={`mailto:${contactData.email.address}`} className="text-primary hover:underline font-medium">
                      {contactData.email.address}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="font-bold block">{isAr ? "هاتف الإدارة التنفيذية" : "Executive Direct Phone"}</span>
                    <a
                      href={`tel:${contactData.phone.value}`}
                      className="text-muted-foreground hover:text-primary font-medium"
                      dir="ltr"
                    >
                      {contactData.phone.display}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
                  <div>
                    <span className="font-bold block">{isAr ? "واتساب الإدارة المباشر" : "Executive Direct WhatsApp"}</span>
                    <span className="text-muted-foreground font-medium" dir="ltr">
                      {contactData.whatsapp.display}
                    </span>
                  </div>
                </li>
              </ul>

              <div className="pt-6 border-t border-border space-y-3">
                <a
                  href={`https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(
                    isAr ? contactData.whatsapp.defaultPrefillAr : contactData.whatsapp.defaultPrefillEn
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="route-button bg-[#25D366] text-white hover:bg-[#20ba5a] w-full h-12 flex items-center justify-center gap-2 text-sm font-bold shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{isAr ? "محادثة مباشرة عبر واتساب" : "Direct WhatsApp Chat"}</span>
                </a>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 text-xs text-muted-foreground">
                  <p>
                    {isAr
                      ? "هل تبحث عن دراسة تسعير أو استشارة تجارية مفصلة؟"
                      : "Looking for a structured quote or comprehensive commercial study?"}
                  </p>
                  <Link
                    href="/request-quote"
                    className="text-primary font-bold hover:underline inline-block mt-1"
                  >
                    {isAr ? "انتقل لنموذج طلب عرض السعر (RFQ) ←" : "Go to Request Quote Form (RFQ) →"}
                  </Link>
                </div>
              </div>
            </div>

            {/* General Contact Form */}
            <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-xs">
              {submitted ? (
                <div className="rfq-success-card py-16 text-center space-y-6" role="status" aria-live="polite">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-heading">
                      {isAr ? "تم استلام رسالتك بنجاح" : "Your Message Was Received Successfully"}
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto leading-relaxed text-sm">
                      {isAr
                        ? "شكراً لتواصلك مع مؤسسة غزارة. يمكنك أيضاً إرسال نسخة من الرسالة عبر WhatsApp للتواصل الفوري."
                        : "Thank you for reaching out to Ghazara. You can also send a copy via WhatsApp for immediate executive dispatch."}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleWhatsAppHandoff}
                      className="route-button bg-[#25D366] text-white hover:bg-[#20ba5a] w-full sm:w-auto px-6 py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{isAr ? "إرسال النسخة عبر WhatsApp" : "Send Copy via WhatsApp"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFullName("");
                        setOrganization("");
                        setEmail("");
                        setPhone("");
                        setMessage("");
                      }}
                      className="route-button route-button-outline w-full sm:w-auto px-6 py-3 text-xs"
                    >
                      {isAr ? "إرسال رسالة أخرى" : "Send Another Message"}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" aria-busy={isSubmitting}>
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-1">
                      {isAr ? "نموذج التواصل والاستفسارات" : "Inquiries & Contact Form"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {isAr
                        ? "املأ الحقول أدناه وسيقوم القسم المختص بالرد عليك في أقرب وقت."
                        : "Fill out the fields below and our relevant department will respond promptly."}
                    </p>
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-2">
                    <label htmlFor="contact-inquiry-type" className="block text-xs font-semibold">
                      {isAr ? "نوع الاستفسار أو موضوع الرسالة" : "Inquiry Topic / Subject"} *
                    </label>
                    <select
                      id="contact-inquiry-type"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
                    >
                      {inquiryTypes.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label[lang]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold mb-2">
                        {isAr ? "الاسم الكريم" : "Your Name"} *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        aria-required="true"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={isAr ? "الاسم الكامل" : "Your Full Name"}
                        className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-org" className="block text-xs font-semibold mb-2">
                        {isAr ? "اسم المؤسسة أو الشركة" : "Enterprise / Company"} *
                      </label>
                      <input
                        id="contact-org"
                        type="text"
                        required
                        aria-required="true"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder={isAr ? "اسم الجهة أو النشاط" : "Company / Organization Name"}
                        className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold mb-2">
                        {isAr ? "البريد الإلكتروني" : "Email Address"} (اختياري)
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold mb-2">
                        {isAr ? "رقم الهاتف / الواتساب" : "Phone / WhatsApp"} (اختياري)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+967 ..."
                        className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-msg" className="block text-xs font-semibold mb-2">
                      {isAr ? "تفاصيل الرسالة أو الاستفسار" : "Message / Inquiry Details"} *
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={5}
                      required
                      aria-required="true"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        isAr
                          ? "اكتب استفسارك أو نبذة عن طبيعة التعاون المطلوب هنا..."
                          : "Write your inquiry or partnership details here..."
                      }
                      className="w-full rounded-xl border border-border bg-background p-4 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-disabled={isSubmitting}
                    className="route-button route-button-primary w-full h-14 text-sm font-bold flex items-center justify-center gap-2 disabled:cursor-wait disabled:opacity-70"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>{isAr ? "إرسال رسالة التواصل" : "Submit Contact Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
