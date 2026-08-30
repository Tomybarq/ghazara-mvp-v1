import { useLanguage } from "@/contexts/LanguageContext";
import { companyData } from "@/data/company";
import { contactData } from "@/data/contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ArrowRight, MessageCircle, FileText } from "lucide-react";
import { Link } from "wouter";

const faqs = [
  {
    id: "faq-1",
    question: {
      ar: "ما هي مجالات ونطاق الخدمات الرئيسية لمؤسسة غزارة؟",
      en: "What are the core operational domains and services of Ghazara?",
    },
    answer: {
      ar: "تعمل مؤسسة غزارة في 4 قطاعات رئيسية متكاملة: التمثيل التجاري ووكالات التوزيع، التسويق الرقمي وتنمية المبيعات، تطوير الأنظمة والحلول التقنية (SaaS)، ودراسات السوق واستشارات التوريد.",
      en: "Ghazara operates across 4 integrated domains: Commercial representation & distribution agency, digital marketing & revenue growth, technical systems & SaaS solutions, and market research & procurement advisory.",
    },
  },
  {
    id: "faq-2",
    question: {
      ar: "كيف يمكن تقديم طلب عرض سعر (RFQ) تجاري؟",
      en: "How can businesses submit a formal Request for Quote (RFQ)?",
    },
    answer: {
      ar: "يمكنك تقديم الطلب مباشرة عبر نموذج طلب عرض السعر الرقمي في الموقع واختيار قطاع الأعمال ونوع الخدمة، أو من خلال إرسال البيانات مباشرة عبر قناة WhatsApp الرسمية للمدير التنفيذي.",
      en: "You can submit directly through our digital RFQ portal by selecting your sector and service, or by dispatching requirements directly through our verified WhatsApp executive channel.",
    },
  },
  {
    id: "faq-3",
    question: {
      ar: "ما هو النطاق الجغرافي الذي تغطيه مؤسسة غزارة؟",
      en: "What geographic scope is covered by Ghazara's operations?",
    },
    answer: {
      ar: "يقع المقر الرئيسي لإدارة المؤسسة في مدينة سيئون بمحافظة حضرموت، وتغطي خدماتنا وعمليات التوريد والتمثيل التجاري كافة المحافظات اليمنية، بالإضافة إلى تنسيق العمليات مع الشركاء الإقليميين.",
      en: "Corporate headquarters are located in Seiyun, Hadramout, with supply chain and commercial representation capabilities spanning all Yemeni governorates alongside regional partner coordination.",
    },
  },
  {
    id: "faq-4",
    question: {
      ar: "ما هي مدة الاستجابة المتوقعة لطلبات عروض الأسعار؟",
      en: "What is the expected response SLA for RFQ submissions?",
    },
    answer: {
      ar: "تتم مراجعة الطلبات الأولية خلال ساعات العمل الرسمية (السبت – الخميس: 8:00 صباحاً – 5:00 مساءً)، ويتم التواصل معكم لإصدار عرض السعر أو جدولة جلسة تقييم الاحتياج في غضون 24 إلى 48 ساعة عمل.",
      en: "Initial submissions are processed during official business hours (Saturday – Thursday: 8:00 AM – 5:00 PM), with direct contact and formal quote delivery scheduled within 24–48 business hours.",
    },
  },
  {
    id: "faq-5",
    question: {
      ar: "هل تضمن المؤسسة سرية البيانات والأسعار التنافسية؟",
      en: "Does Ghazara guarantee data confidentiality and pricing security?",
    },
    answer: {
      ar: "نعم وبشكل صارم. تخضع كافة طلبات عروض الأسعار وبيانات الشركاء التجاريين لسياسة خصوصية معتمدة واتفاقيات عدم إفصاح (NDA) عند الطلب لحماية سرية العمليات والأسعار.",
      en: "Yes, strictly. All commercial requests and partner records are governed by our institutional Privacy Policy and available NDAs to ensure absolute pricing and operational confidentiality.",
    },
  },
  {
    id: "faq-6",
    question: {
      ar: "هل تقدم غزارة منصات رقمية جاهزة أم حلول مخصصة؟",
      en: "Does Ghazara provide ready digital platforms or custom software?",
    },
    answer: {
      ar: "نقدم الاثنين معاً: منصات SaaS جاهزة ومطورة محلياً (مثل منصة معين وشبكة غزارة)، بالإضافة إلى خدمات التحول الرقمي وبناء البوابات والأنظمة السحابية المخصصة حسب احتياج المنشأة.",
      en: "We provide both: enterprise SaaS platforms (such as Moeen and Ghazara Network) as well as tailored digital transformation, custom portal engineering, and cloud backend integrations.",
    },
  },
];

export default function FaqPage() {
  const { lang, isAr } = useLanguage();

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead pageKey="faq" />
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <section className="content-wrap py-10">
          <SiteBreadcrumb items={[{ label: isAr ? "الأسئلة الشائعة" : "FAQ" }]} />

          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">
              {isAr ? "مركز الاستفسارات والدعم" : "Inquiries & Support"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {isAr
                ? "إجابات موثقة ومباشرة لأبرز التساؤلات حول آليات العمل، قنوات التوريد، والتعاقد مع مؤسسة غزارة."
                : "Verified direct answers to common inquiries regarding operations, supply chains, and contracting with Ghazara."}
            </p>
          </div>
        </section>

        <section className="content-wrap py-10 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="border border-border rounded-2xl px-6 bg-card/60 overflow-hidden"
                  >
                    <AccordionTrigger className="text-right sm:text-right font-heading font-bold text-base sm:text-lg text-foreground hover:no-underline py-5">
                      {faq.question[lang]}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pt-1 pb-6">
                      {faq.answer[lang]}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Quick CTA column */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  {isAr ? "هل لديك طلب محدد؟" : "Have a Specific Request?"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {isAr
                    ? "ابدأ بتحديد متطلبات مشروعك وسنزودك بعرض سعر رسمي مفصل."
                    : "Specify your project requirements and receive a customized formal quotation."}
                </p>
                <Link
                  href="/request-quote"
                  className="route-button route-button-primary w-full text-xs font-bold py-3 text-center block"
                >
                  {isAr ? "طلب عرض سعر الآن" : "Request a Quote Now"}
                </Link>
              </div>

              <div className="p-6 rounded-3xl bg-muted/40 border border-border space-y-3">
                <div className="flex items-center gap-2 text-[#25D366] font-bold text-sm">
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? "تواصل مباشر عبر WhatsApp" : "Direct WhatsApp"}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? "تحدث مع إدارة المؤسسة مباشرة لأي استفسار عاجل."
                    : "Connect directly with executive management for urgent inquiries."}
                </p>
                <a
                  href={`https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(
                    isAr ? "مرحباً مؤسسة غزارة، لدي استفسار..." : "Hello Ghazara, I have an inquiry..."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary font-semibold hover:underline inline-block pt-1"
                >
                  {contactData.whatsapp.display}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
