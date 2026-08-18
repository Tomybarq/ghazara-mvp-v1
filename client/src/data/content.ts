import { companyData } from "./company";
import { navigationItems } from "./navigation";
import { servicesData } from "./services";
import { productsData } from "./products";
import { projectsData } from "./projects";
import { blogPostsData } from "./blog";
import { contactData, rfqSectors, rfqServices, rfqRegions } from "./contact";
import { siteSeoData } from "./seo";

export * from "./company";
export * from "./navigation";
export * from "./services";
export * from "./products";
export * from "./projects";
export * from "./blog";
export * from "./contact";
export * from "./seo";

/**
 * Backward-compatible content tree matching Ghazara V1 component consumption
 * while referencing the new modular typed foundation.
 */
export const content = {
  ar: {
    brandName: companyData.brandName.ar,
    brandShort: companyData.shortName.ar,
    tagline: companyData.tagline.ar,
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      products: "المنتجات",
      projects: "المشاريع",
      insights: "الرؤى والمدونة",
      contact: "تواصل معنا",
      requestQuote: "طلب عرض سعر",
    },
    hero: {
      eyebrow: "الشريك التجاري والتسويقي الاستراتيجي",
      title1: "نبني جسور النمو لعملك عبر",
      titleHighlight: "التجارة والحلول الرقمية",
      description: "نجمع بين الخبرة التجارية العميقة وأحدث استراتيجيات التسويق الرقمي والربط الإقليمي لنمكن مؤسستك من قيادة السوق بكفاءة وثقة.",
      ctaPrimary: "اطلب استشارة أو عرض سعر",
      ctaSecondary: "استكشف خدماتنا",
      statsTitle1: "سنوات الخبرة والريادة",
      statsValue1: "خبرة مؤسسية موثوقة",
      statsTitle2: "الشراكات والعملاء",
      statsValue2: "شبكة واسعة من الشركاء",
      statsTitle3: "معدل رضا العملاء",
      statsValue3: "التزام بأعلى معايير الجودة",
    },
    about: {
      eyebrow: "من نحن",
      title: companyData.storyP1.ar,
      p1: companyData.storyP1.ar,
      p2: companyData.storyP2.ar,
      values: companyData.values.map((v) => ({ title: v.title.ar, desc: v.desc.ar })),
    },
    services: {
      eyebrow: "خدماتنا المتخصصة",
      title: "حلول مؤسسية مصممة خصيصاً لنمو أعمالك",
      subtitle: "نغطي كافة الاحتياجات التجارية والتسويقية والتقنية لمنشأتك بمستوى احترافي عالي.",
      list: servicesData.map((s) => ({
        id: s.id,
        title: s.title.ar,
        desc: s.shortDesc.ar,
        icon: s.icon,
      })),
    },
    rfq: {
      eyebrow: "طلب عرض سعر أو استشارة",
      title: "ابدأ مشروعك القادم معنا اليوم",
      subtitle: "املأ النموذج وسيقوم فريقنا المختص بدراسة طلبك والتواصل معك فور استلامه.",
      sectorLabel: "قطاع الأعمال",
      serviceLabel: "الخدمة المطلوبة",
      regionLabel: "النطاق الجغرافي",
      clientNameLabel: "اسم المسؤول",
      companyNameLabel: "اسم الشركة / المؤسسة",
      notesLabel: "تفاصيل الطلب أو المشروع",
      submitBtn: "إرسال الطلب الآن",
      loadingMsg: "جاري معالجة طلبك…",
      successTitle: "تم استلام طلبك بنجاح",
      successMsg: "شكراً لتواصلك معنا. راجع فريقنا تفاصيل طلبك وسنتواصل معك لاستكمال الخطوات التالية.",
      successAction: "إرسال طلب آخر",
      errorMsg: "تعذر إرسال الطلب حالياً. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب مباشرة.",
      requiredMsg: "يرجى إدخال اسم المسؤول واسم الشركة.",
      sectors: rfqSectors.map((s) => ({ id: s.id, label: s.label.ar })),
      servicesList: rfqServices.map((s) => ({ id: s.id, label: s.label.ar })),
      regions: rfqRegions.map((r) => ({ id: r.id, label: r.label.ar })),
    },
    footer: {
      about: companyData.tagline.ar,
      quickLinks: "روابط سريعة",
      contactInfo: "معلومات التواصل",
      address: contactData.address.display.ar,
      email: contactData.email.address,
      phone: contactData.phone.display,
      rights: "جميع الحقوق محفوظة © 2026 مؤسسة غزارة للتجارة والتسويق.",
    },
  },
  en: {
    brandName: companyData.brandName.en,
    brandShort: companyData.shortName.en,
    tagline: companyData.tagline.en,
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      products: "Products",
      projects: "Projects",
      insights: "Insights & Blog",
      contact: "Contact Us",
      requestQuote: "Request Quote",
    },
    hero: {
      eyebrow: "Strategic Commercial & Marketing Partner",
      title1: "Building Growth Bridges for Your Business Through",
      titleHighlight: "Trade & Digital Solutions",
      description: "Combining deep commercial expertise with advanced digital marketing and regional integration strategies to empower your organization to lead the market with confidence.",
      ctaPrimary: "Request Quote or Consultation",
      ctaSecondary: "Explore Services",
      statsTitle1: "Institutional Track Record",
      statsValue1: "Trusted Experience",
      statsTitle2: "Partners & Reach",
      statsValue2: "Wide Business Network",
      statsTitle3: "Quality Assurance",
      statsValue3: "Top Industry Standards",
    },
    about: {
      eyebrow: "About Us",
      title: companyData.storyP1.en,
      p1: companyData.storyP1.en,
      p2: companyData.storyP2.en,
      values: companyData.values.map((v) => ({ title: v.title.en, desc: v.desc.en })),
    },
    services: {
      eyebrow: "Our Specialized Services",
      title: "Enterprise Solutions Tailored for Your Growth",
      subtitle: "Covering all commercial, marketing, and technical needs for your organization at a professional grade.",
      list: servicesData.map((s) => ({
        id: s.id,
        title: s.title.en,
        desc: s.shortDesc.en,
        icon: s.icon,
      })),
    },
    rfq: {
      eyebrow: "Request Quote or Consultation",
      title: "Start Your Next Project With Us Today",
      subtitle: "Fill out the form below and our team will review your request and reach out promptly.",
      sectorLabel: "Business Sector",
      serviceLabel: "Required Service",
      regionLabel: "Geographic Scope",
      clientNameLabel: "Contact Name",
      companyNameLabel: "Company / Organization",
      notesLabel: "Project Details or Notes",
      submitBtn: "Submit Request Now",
      loadingMsg: "Processing your request…",
      successTitle: "Your request was received successfully",
      successMsg: "Thank you for contacting us. Our team will review your details and contact you with the next steps.",
      successAction: "Submit another request",
      errorMsg: "We could not send your request right now. Please try again or reach out via WhatsApp.",
      requiredMsg: "Please enter the contact name and company name.",
      sectors: rfqSectors.map((s) => ({ id: s.id, label: s.label.en })),
      servicesList: rfqServices.map((s) => ({ id: s.id, label: s.label.en })),
      regions: rfqRegions.map((r) => ({ id: r.id, label: r.label.en })),
    },
    footer: {
      about: companyData.tagline.en,
      quickLinks: "Quick Links",
      contactInfo: "Contact Information",
      address: contactData.address.display.en,
      email: contactData.email.address,
      phone: contactData.phone.display,
      rights: "All Rights Reserved © 2026 Ghazara Trading & Marketing.",
    },
  },
};
