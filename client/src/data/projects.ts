import type { LocalizedString } from "./company";

export interface ProjectItem {
  id: string;
  slug: string;
  tag: LocalizedString;
  title: LocalizedString;
  clientSector: LocalizedString;
  shortDesc: LocalizedString;
  fullDesc: LocalizedString;
  servicesDelivered: LocalizedString[];
  outcomes: LocalizedString[];
  externalLink?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "moeen-case",
    slug: "moeen-ngo-platform-development",
    tag: {
      ar: "منصة ساس مؤسسية",
      en: "SaaS Platform",
    },
    title: {
      ar: "تطوير وإطلاق منصة معين الرقمية للمؤسسات غير الربحية",
      en: "Development & Launch of Ma'een NGO SaaS Platform",
    },
    clientSector: {
      ar: "القطاع غير الربحي والخيري",
      en: "Non-Profit & Philanthropic Sector",
    },
    shortDesc: {
      ar: "تصميم وهندسة منصة سحابية متكاملة لإدارة التبرعات والمشاريع الإنسانية مع نظم أمان متقدمة.",
      en: "Designing and engineering an integrated cloud platform for donation management and humanitarian projects.",
    },
    fullDesc: {
      ar: "تم بناء المنصة وفق معايير الحوكمة المالية وأفضل ممارسات تجربة المستخدم، مع واجهات تفاعلية تدعم التبرع السريع ولوحات تحكم متقدمة لإدارة المشاريع والتقارير.",
      en: "The platform was built following strict financial governance and UX best practices, featuring fast donation funnels and advanced administration dashboards.",
    },
    servicesDelivered: [
      { ar: "هندسة البرمجيات وتطوير Full-Stack", en: "Full-Stack Software Engineering" },
      { ar: "تصميم واجهة وتجربة المستخدم (UI/UX)", en: "UI/UX Design & Prototyping" },
      { ar: "تأمين وحوكمة البيانات المالية", en: "Financial Data Security & Governance" },
    ],
    outcomes: [
      { ar: "منظومة عمل موحدة لإدارة العمليات الخيرية", en: "Unified operating system for non-profit workflows" },
      { ar: "بنية سحابية قابلة للتوسع واستيعاب آلاف المتبرعين", en: "Scalable cloud architecture handling high concurrency" },
    ],
    externalLink: "https://github.com/Tomybarq/moeen-ngo",
  },
  {
    id: "ghazara-portal-case",
    slug: "ghazara-digital-ecosystem",
    tag: {
      ar: "بوابة الأعمال الرقمية",
      en: "Enterprise Portal",
    },
    title: {
      ar: "بناء البوابة الرقمية الموحدة لمؤسسة غزارة",
      en: "Building Ghazara Unified Enterprise Business Portal",
    },
    clientSector: {
      ar: "التجارة والخدمات المؤسسية B2B",
      en: "B2B Trade & Corporate Services",
    },
    shortDesc: {
      ar: "إنشاء بوابة رقمية مؤسسية حديثة تجمع بين استعراض الحلول التجارية، تدفق طلب عروض الأسعار، ونظام التحويل الفوري.",
      en: "Building a modern corporate portal combining commercial solutions showcase, multi-step RFQ flow, and instant conversion.",
    },
    fullDesc: {
      ar: "تطوير تطبيق ويب متكامل بتقنيات React 19 وTailwind مع دعم كامل للغتين وتوافق قياسي مع محركات البحث وسرعة تحميل فائقة.",
      en: "Developing a full-stack web application with React 19, Tailwind, complete bilingual support, robust SEO foundations, and high performance.",
    },
    servicesDelivered: [
      { ar: "استراتيجية الحضور الرقمي والهوية المؤسسية", en: "Digital Presence Strategy & Identity" },
      { ar: "تطوير الواجهة الأمامية والخلفية Type-Safe", en: "Type-Safe Frontend & Backend Development" },
      { ar: "تهيئة محركات البحث والأداء الفني (Technical SEO)", en: "Technical SEO & Performance Optimization" },
    ],
    outcomes: [
      { ar: "هيكل تجاري منظم يعزز الثقة لدى الشركاء والعملاء", en: "Structured commercial architecture enhancing partner trust" },
      { ar: "مسار واضح لتحويل الزوار إلى طلبات عروض أسعار وتواصل", en: "Streamlined path converting visitors into RFQs and inquiries" },
    ],
  },
  {
    id: "network-infrastructure-case",
    slug: "enterprise-network-infrastructure",
    tag: {
      ar: "حلول الشبكات والاتصالات",
      en: "Network Infrastructure",
    },
    title: {
      ar: "تأمين وتحسين البنى التحتية لشبكات ميكروتيك للشركات",
      en: "Securing & Optimizing Enterprise MikroTik Network Infrastructure",
    },
    clientSector: {
      ar: "الاتصالات والشركات المزودة",
      en: "Telecom & Service Providers",
    },
    shortDesc: {
      ar: "تصميم وتنفيذ حلول مراقبة وتأمين لشبكات الأعمال لضمان استقرار الاتصال وحماية البيانات.",
      en: "Designing and implementing monitoring and security solutions for enterprise networks to ensure uptime.",
    },
    fullDesc: {
      ar: "تقديم استشارات فنية وهندسة حلول شبكية تقلل فترات التوقف، وتعيد توزيع الأحمال الترددية بكفاءة بين خطوط الربط المتعددة.",
      en: "Delivering technical consulting and network engineering to minimize downtime and balance bandwidth loads efficiently.",
    },
    servicesDelivered: [
      { ar: "تخطيط وهيكلة سياسات التوجيه والشبكات", en: "Network Architecture & Routing Policies" },
      { ar: "إعداد لوحات المراقبة والتشخيص اللحظي", en: "Real-Time Telemetry & Monitoring Setup" },
      { ar: "اختبارات الاستقرار والحماية من الاختناق", en: "Stress Testing & Congestion Elimination" },
    ],
    outcomes: [
      { ar: "استقرار أعلى للاتصال وانخفاض ملموس في الانقطاعات", en: "Higher connection stability and significant drop in outages" },
      { ar: "كفاءة أكبر في استغلال النطاق الترددي للشبكة", en: "Optimized bandwidth utilization across enterprise sites" },
    ],
  },
];
