import type { LocalizedString } from "./company";

export interface PageMetadata {
  title: LocalizedString;
  description: LocalizedString;
  keywords: {
    ar: string[];
    en: string[];
  };
  canonicalPath: string;
  ogType: "website" | "article" | "product";
}

export const SITE_URL = "https://ghazara.net";

export const siteSeoData: Record<string, PageMetadata> = {
  home: {
    title: {
      ar: "مؤسسة غزارة للتجارة والتسويق | حلول تجارية وتسويقية متكاملة",
      en: "Ghazara Trading & Marketing | Integrated Commercial & Marketing Solutions",
    },
    description: {
      ar: "مؤسسة غزارة للتجارة والتسويق — شريكك الاستراتيجي في التمثيل التجاري، سلاسل التوريد، التسويق الرقمي القائم على الأداء، وبناء المنصات الرقمية في اليمن والمنطقة.",
      en: "Ghazara Trading & Marketing — Your strategic partner for commercial representation, supply chain facilitation, performance digital marketing, and enterprise web solutions in Yemen and the region.",
    },
    keywords: {
      ar: ["مؤسسة غزارة", "غزارة للتجارة والتسويق", "تمثيل تجاري", "تسويق رقمي", "سلاسل توريد", "استشارات أعمال", "اليمن", "حضرموت"],
      en: ["Ghazara", "Ghazara Trading", "Commercial Representation", "Digital Marketing", "Supply Chain", "Business Consulting", "Yemen", "Middle East"],
    },
    canonicalPath: "/",
    ogType: "website",
  },
  about: {
    title: {
      ar: "من نحن | مؤسسة غزارة للتجارة والتسويق",
      en: "About Us | Ghazara Trading & Marketing",
    },
    description: {
      ar: "تعرف على رؤية ورسالة وقيم مؤسسة غزارة للتجارة والتسويق، ومنهجنا في تقديم حلول تجارية ورقمية مبنية على الموثوقية والاستدامة.",
      en: "Learn about Ghazara's vision, mission, core values, and our institutional methodology for delivering sustainable commercial and digital solutions.",
    },
    keywords: {
      ar: ["عن غزارة", "رؤية غزارة", "التمثيل التجاري في اليمن", "قيم مؤسسة غزارة"],
      en: ["About Ghazara", "Ghazara Vision", "Commercial Representation Yemen", "Corporate Values"],
    },
    canonicalPath: "/about",
    ogType: "website",
  },
  services: {
    title: {
      ar: "خدماتنا التجارية والتسويقية | مؤسسة غزارة",
      en: "Commercial & Marketing Services | Ghazara",
    },
    description: {
      ar: "استكشف خدمات غزارة: التمثيل التجاري، إدارة قنوات التوزيع، التسويق الرقمي، تطوير المنصات التقنية، والاستشارات الاقتصادية ودراسات السوق.",
      en: "Explore Ghazara services: Commercial representation, distribution channels, performance digital marketing, tech platform engineering, and economic consulting.",
    },
    keywords: {
      ar: ["خدمات غزارة", "تمثيل تجاري", "تسويق رقمي B2B", "تطوير مواقع تجارية", "دراسات جدوى تسويقية"],
      en: ["Ghazara Services", "Commercial Representation", "B2B Digital Marketing", "Web Development", "Market Feasibility"],
    },
    canonicalPath: "/services",
    ogType: "website",
  },
  products: {
    title: {
      ar: "المنتجات والمنصات الرقمية | مؤسسة غزارة",
      en: "Products & Digital Platforms | Ghazara",
    },
    description: {
      ar: "استعرض المنتجات والمنصات السحابية التي تطورها وتدعمها غزارة، بما فيها منصة معين للقطاع غير الربحي وحلول إدارة الشبكات.",
      en: "Browse products and cloud platforms developed and supported by Ghazara, including Ma'een NGO SaaS platform and network utilities.",
    },
    keywords: {
      ar: ["منتجات غزارة", "منصة معين", "أنظمة ميكروتيك", "منصات ساس"],
      en: ["Ghazara Products", "Maeen Platform", "MikroTik Systems", "Enterprise SaaS"],
    },
    canonicalPath: "/products",
    ogType: "product",
  },
  projects: {
    title: {
      ar: "مشاريعنا ودراسات الحالة | مؤسسة غزارة",
      en: "Projects & Case Studies | Ghazara",
    },
    description: {
      ar: "نماذج عملية ودراسات حالة لمشاريع أنجزتها غزارة في بناء المنصات التقنية، تطوير الهويات، وإدارة الحلول التجارية.",
      en: "Practical case studies of projects delivered by Ghazara across tech platform engineering, brand systems, and commercial execution.",
    },
    keywords: {
      ar: ["مشاريع غزارة", "دراسات حالة", "أعمال غزارة السابقة", "قصص نجاح تجارية"],
      en: ["Ghazara Projects", "Case Studies", "Enterprise Portfolio", "Commercial Success Stories"],
    },
    canonicalPath: "/projects",
    ogType: "website",
  },
  blog: {
    title: {
      ar: "الرؤى والمقالات المهنية | مؤسسة غزارة",
      en: "Insights & Articles | Ghazara",
    },
    description: {
      ar: "مقالات وتحليلات استراتيجية يقدمها خبراء غزارة في مجالات التجارة الحديثة، التسويق الرقمي، والتحول التقني.",
      en: "Strategic articles and analysis by Ghazara experts in modern commerce, digital marketing, and tech transformation.",
    },
    keywords: {
      ar: ["مدونة غزارة", "مقالات التجارة والتسويق", "التحول الرقمي", "سلاسل الإمداد"],
      en: ["Ghazara Blog", "Trade & Marketing Articles", "Digital Transformation", "Supply Chains"],
    },
    canonicalPath: "/blog",
    ogType: "article",
  },
  contact: {
    title: {
      ar: "تواصل معنا | مؤسسة غزارة للتجارة والتسويق",
      en: "Contact Us | Ghazara Trading & Marketing",
    },
    description: {
      ar: "تواصل مباشرة مع فريق مؤسسة غزارة للاستفسارات التجارية والتقنية وطلب عروض الأسعار والشراكات.",
      en: "Contact Ghazara Trading & Marketing team directly for commercial inquiries, technical consulting, RFQs, and partnerships.",
    },
    keywords: {
      ar: ["تواصل مع غزارة", "رقم غزارة", "واتساب غزارة", "طلب استشارة تجارية"],
      en: ["Contact Ghazara", "Ghazara Phone", "Ghazara WhatsApp", "Commercial Inquiry"],
    },
    canonicalPath: "/contact",
    ogType: "website",
  },
  rfq: {
    title: {
      ar: "طلب عرض سعر أو استشارة | مؤسسة غزارة",
      en: "Request Quote or Consultation | Ghazara",
    },
    description: {
      ar: "أرسل طلبك التجاري أو استشارتك التسويقية عبر نموذج طلب عرض السعر الموحد للتواصل الفوري والمباشر مع مسؤولينا.",
      en: "Submit your commercial request or marketing inquiry through our unified RFQ workflow for prompt follow-up.",
    },
    keywords: {
      ar: ["طلب عرض سعر", "RFQ", "استشارة تجارية", "تسعير خدمات غزارة"],
      en: ["Request Quote", "RFQ Yemen", "Commercial Advisory", "Ghazara Pricing"],
    },
    canonicalPath: "/request-quote",
    ogType: "website",
  },
  faq: {
    title: {
      ar: "الأسئلة الشائعة | مؤسسة غزارة للتجارة والتسويق",
      en: "Frequently Asked Questions | Ghazara Trading & Marketing",
    },
    description: {
      ar: "إجابات معتمدة وشاملة حول خدمات التمثيل التجاري، طلبات عروض الأسعار، والحلول التقنية في غزارة.",
      en: "Verified and comprehensive answers regarding Ghazara's commercial agency, RFQs, and tech solutions.",
    },
    keywords: {
      ar: ["الأسئلة الشائعة", "استفسارات غزارة", "خدمات غزارة", "عروض الأسعار"],
      en: ["FAQ", "Ghazara FAQ", "Commercial Services", "Quotes"],
    },
    canonicalPath: "/faq",
    ogType: "website",
  },
  terms: {
    title: {
      ar: "الشروط والأحكام | مؤسسة غزارة للتجارة والتسويق",
      en: "Terms & Conditions | Ghazara Trading & Marketing",
    },
    description: {
      ar: "الشروط والضوابط القانونية والتجارية الحاكمة لخدمات وتعاملات مؤسسة غزارة للتجارة والتسويق.",
      en: "Legal and commercial terms governing Ghazara Trading & Marketing services and transactions.",
    },
    keywords: {
      ar: ["الشروط والأحكام", "الضوابط القانونية", "شروط التعامل التجاري", "غزارة"],
      en: ["Terms & Conditions", "Legal Terms", "Commercial Terms", "Ghazara"],
    },
    canonicalPath: "/terms",
    ogType: "website",
  },
  privacy: {
    title: {
      ar: "سياسة الخصوصية | مؤسسة غزارة للتجارة والتسويق",
      en: "Privacy Policy | Ghazara Trading & Marketing",
    },
    description: {
      ar: "سياسة الخصوصية وحماية بيانات العملاء والشركاء في مؤسسة غزارة للتجارة والتسويق.",
      en: "Privacy policy and client data protection commitments at Ghazara Trading & Marketing.",
    },
    keywords: {
      ar: ["سياسة الخصوصية", "حماية البيانات", "سرية المعلومات", "غزارة"],
      en: ["Privacy Policy", "Data Protection", "Confidentiality", "Ghazara"],
    },
    canonicalPath: "/privacy",
    ogType: "website",
  },
  notFound: {
    title: {
      ar: "الصفحة غير موجودة (404) | مؤسسة غزارة",
      en: "Page Not Found (404) | Ghazara",
    },
    description: {
      ar: "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يمكنك العودة إلى الصفحة الرئيسية أو استكشاف خدماتنا.",
      en: "Sorry, the page you are looking for does not exist. You can return to the homepage or explore our services.",
    },
    keywords: {
      ar: ["404", "غزارة"],
      en: ["404", "Ghazara"],
    },
    canonicalPath: "/404",
    ogType: "website",
  },
};
