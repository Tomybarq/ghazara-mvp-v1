import type { LocalizedString } from "./company";

export interface BlogPostItem {
  id: string;
  slug: string;
  title: LocalizedString;
  date: LocalizedString;
  readTime: LocalizedString;
  category: LocalizedString;
  excerpt: LocalizedString;
  author: LocalizedString;
  tags: string[];
}

export const blogPostsData: BlogPostItem[] = [
  {
    id: "post-1",
    slug: "digital-transformation-in-corporate-trade",
    title: {
      ar: "دور التحول الرقمي في تعزيز كفاءة التجارة المؤسسية",
      en: "The Role of Digital Transformation in Enhancing Corporate Trade Efficiency",
    },
    date: {
      ar: "أغسطس 2026",
      en: "August 2026",
    },
    readTime: {
      ar: "5 دقائق قراءة",
      en: "5 min read",
    },
    category: {
      ar: "التجارة والتقنية",
      en: "Trade & Technology",
    },
    excerpt: {
      ar: "كيف تساهم المنصات السحابية والأتمتة الحديثة في خفض التكاليف التشغيلية وفتح آفاق جديدة للتجارة الإقليمية وسلاسل الإمداد.",
      en: "How cloud platforms and modern automation help reduce operational costs and unlock new horizons for regional commerce and supply chains.",
    },
    author: {
      ar: "فريق غزارة للاستشارات",
      en: "Ghazara Advisory Team",
    },
    tags: ["تجارة", "تحول رقمي", "سلاسل إمداد", "أتمتة"],
  },
  {
    id: "post-2",
    slug: "data-driven-digital-marketing-roi",
    title: {
      ar: "استراتيجيات التسويق الرقمي المرتكزة على البيانات (Data-Driven Marketing)",
      en: "Data-Driven Digital Marketing Strategies for Maximum ROI",
    },
    date: {
      ar: "أغسطس 2026",
      en: "August 2026",
    },
    readTime: {
      ar: "4 دقائق قراءة",
      en: "4 min read",
    },
    category: {
      ar: "التسويق والنمو",
      en: "Marketing & Growth",
    },
    excerpt: {
      ar: "لماذا يعد تحليل سلوك المستهلك واتخاذ القرار بناءً على الأرقام الحقيقية هو الفيصل في نجاح الحملات التسويقية الحديثة ورفع معدل التحويل.",
      en: "Why analyzing consumer behavior and making decisions based on real data is decisive for modern marketing success and conversion rates.",
    },
    author: {
      ar: "فريق غزارة الرقمي",
      en: "Ghazara Digital Team",
    },
    tags: ["تسويق رقمي", "تحسين التحويل", "بيانات", "B2B"],
  },
  {
    id: "post-3",
    slug: "enterprise-network-infrastructure-mikrotik",
    title: {
      ar: "إدارة وتأمين البنية التحتية للشبكات وحلول ميكروتيك للشركات",
      en: "Network Infrastructure Management & MikroTik Solutions for Enterprises",
    },
    date: {
      ar: "يوليو 2026",
      en: "July 2026",
    },
    readTime: {
      ar: "6 دقائق قراءة",
      en: "6 min read",
    },
    category: {
      ar: "البنية التحتية",
      en: "Infrastructure",
    },
    excerpt: {
      ar: "دليل شامل لتأمين وتحسين توزيع النطاق الترددي واستقرار الاتصال للمؤسسات الكبرى وحماية العمليات الرقمية الحساسة.",
      en: "A comprehensive guide to securing, optimizing bandwidth distribution, and ensuring connection stability for major corporate operations.",
    },
    author: {
      ar: "فريق غزارة الهندسي",
      en: "Ghazara Engineering Team",
    },
    tags: ["شبكات", "ميكروتيك", "بنية تحتية", "أمان"],
  },
];
