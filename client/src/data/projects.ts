import type { LocalizedString } from "./company";
import type { ContentApproval } from "./contentApproval";

export interface ProjectTechnology {
  id: string;
  label: LocalizedString;
}

export interface ProjectSector {
  id: string;
  label: LocalizedString;
}

export interface ProjectItem {
  id: string;
  slug: string;
  type: "project" | "case-study" | "initiative";
  published: boolean;
  tag: LocalizedString;
  title: LocalizedString;
  clientSector: LocalizedString;
  shortDesc: LocalizedString;
  overview?: LocalizedString;
  fullDesc: LocalizedString;
  challenge?: LocalizedString;
  solution?: LocalizedString;
  servicesDelivered: LocalizedString[];
  outcomes: LocalizedString[];
  technologies?: ProjectSector[];
  sectors?: ProjectSector[];
  externalLink?: string;
  rfqContext?: {
    projectId: string;
    projectLabel: LocalizedString;
  };
  seo?: {
    title?: LocalizedString;
    description?: LocalizedString;
  };
  approval: ContentApproval;
}

/**
 * Project & Case Studies Catalog
 * Baseline: set to draft / published: false until formal written sign-off is logged.
 */
export const projectsData: ProjectItem[] = [
  {
    id: "moeen-case",
    slug: "moeen-ngo-platform-development",
    type: "case-study",
    published: false,
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
    overview: {
      ar: "مشروع تقني متكامل استهدف بناء بنية برمجية سحابية مرنة تمكن الجمعيات والمؤسسات الإنسانية من أتمتة دورات التبرع وربط بوابات الدفع.",
      en: "A comprehensive tech initiative engineering a scalable cloud architecture that enables NGOs to automate donation pipelines and reporting.",
    },
    challenge: {
      ar: "حاجة المنظمات الإنسانية لنظام موحد يجمع بين سهولة تجربة المتبرع، والرقابة المالية الصارمة، والقدرة على التعامل مع آلاف العمليات في مواسم الإغاثة.",
      en: "The urgent requirement of non-profit entities for an auditable system combining frictionless donor UX with strict financial governance.",
    },
    solution: {
      ar: "هندسة معمارية سحابية متقدمة مبنية بتقنيات الويب الحديثة، مع لوحات تحكم مستقلة للإدارة، وتكامل مباشر مع بوابات الدفع الإلكتروني.",
      en: "Full-stack cloud platform built on modern web frameworks featuring modular administrative dashboards and secure payment gateways.",
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
    technologies: [
      { id: "react", label: { ar: "React & TypeScript", en: "React & TypeScript" } },
      { id: "node", label: { ar: "Node.js & Express", en: "Node.js & Express" } },
      { id: "db", label: { ar: "قواعد بيانات سحابية منظمة", en: "Relational Cloud Database" } },
    ],
    sectors: [
      { id: "ngo", label: { ar: "القطاع الخيري والإنساني", en: "Humanitarian & Non-Profit" } },
    ],
    externalLink: "https://github.com/Tomybarq/moeen-ngo",
    rfqContext: {
      projectId: "moeen-case",
      projectLabel: {
        ar: "مشروع تطوير منصة سحابية مماثلة لمعين",
        en: "Custom Cloud Platform Development",
      },
    },
    seo: {
      title: {
        ar: "دراسة حالة: تطوير منصة معين الرقمية | مؤسسة غزارة",
        en: "Case Study: Ma'een NGO SaaS Development | Ghazara",
      },
      description: {
        ar: "تفاصيل دراسة حالة تصميم وهندسة منصة معين السحابية لإدارة المنظمات والتبرعات من مؤسسة غزارة للتجارة والتسويق.",
        en: "Case study on engineering and deploying Ma'een NGO SaaS platform by Ghazara Trading & Marketing.",
      },
    },
    approval: {
      status: "draft",
      source: "moeen-ngo Case Study Draft (Awaiting formal business sign-off)",
      reviewDueAt: "2026-09-01",
    },
  },
  {
    id: "ghazara-portal-case",
    slug: "ghazara-digital-ecosystem",
    type: "case-study",
    published: false,
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
    overview: {
      ar: "تطوير الحضور الرقمي الرسمي لمؤسسة غزارة بهندسة برمجية حديثة تضمن السرعة الفائقة والجاهزية الإنتاجية وتكامل طلبات الأسعار.",
      en: "Developing Ghazara's official enterprise digital presence engineered for lightning-fast performance, production readiness, and RFQ conversion.",
    },
    challenge: {
      ar: "الحاجة إلى واجهة مؤسسية احترافية ثنائية اللغة تدعم التفاعل السريع مع العملاء والشركاء، مع الحفاظ على حوكمة المحتوى التجاري المعتمد.",
      en: "Establishing a trusted bilingual corporate presence that drives high-converting B2B RFQs while enforcing rigorous content governance.",
    },
    solution: {
      ar: "بناء موقع وتطبيق ويب حديث بتقنيات React و tRPC و Tailwind، مع نموذج RFQ متعدد المسارات وتكامل فوري مع واتساب الإدارة وقاعدة البيانات.",
      en: "Constructing a modern React + tRPC web application with typed RFQ workflows, instant WhatsApp integration, and robust database persistence.",
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
    technologies: [
      { id: "react19", label: { ar: "React 19 & Vite", en: "React 19 & Vite" } },
      { id: "trpc", label: { ar: "tRPC & Zod Type-Safety", en: "tRPC & Zod Type-Safety" } },
      { id: "tailwind", label: { ar: "Tailwind CSS Design System", en: "Tailwind CSS Design System" } },
    ],
    sectors: [
      { id: "commerce", label: { ar: "التمثيل التجاري والتسويق B2B", en: "B2B Representation & Trade" } },
    ],
    rfqContext: {
      projectId: "ghazara-portal-case",
      projectLabel: {
        ar: "مشروع تطوير بوابة رقمية مؤسسية",
        en: "Enterprise Portal Development",
      },
    },
    seo: {
      title: {
        ar: "دراسة حالة: بناء بوابة غزارة الرقمية | مؤسسة غزارة",
        en: "Case Study: Building Ghazara Enterprise Portal | Ghazara",
      },
      description: {
        ar: "تعرف على تفاصيل بناء المنظومة الرقمية وبوابة الأعمال لمؤسسة غزارة للتجارة والتسويق وهندسة تحويل العملاء.",
        en: "Case study on engineering Ghazara's unified digital portal, RFQ workflow, and performance-driven presence.",
      },
    },
    approval: {
      status: "draft",
      source: "Ghazara Portal Case Study Draft (Awaiting formal business sign-off)",
      reviewDueAt: "2026-09-01",
    },
  },
  {
    id: "network-infrastructure-case",
    slug: "enterprise-network-infrastructure",
    type: "case-study",
    published: false,
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
    overview: {
      ar: "مشروع استشاري وهندسي استهدف رفع كفاءة شبكات الاتصال اللاسلكية والسلكية، وتقليل انقطاعات الخدمة للمؤسسات والشركات.",
      en: "An infrastructure engineering case optimizing enterprise wireless and wired network topology, eliminating downtime and latency spikes.",
    },
    challenge: {
      ar: "تعرض شبكات الأعمال للاختناقات المتكررة وتفاوت جودة الخدمة نتيجة عدم التوزيع الأمثل للأحمال وضعف المراقبة اللحظية للأجهزة.",
      en: "Enterprise network congestion and service instability due to unbalanced uplink routing and lack of real-time diagnostics.",
    },
    solution: {
      ar: "إعادة ضبط سياسات التوجيه (Routing Policies)، وبرمجة جدران الحماية، وتفعيل أدوات ميكروتيك لموازنة الأحمال ومراقبة استقرار الربط.",
      en: "Re-engineering routing policies, hardening firewall rules, and deploying MikroTik telemetry for proactive bandwidth management.",
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
    technologies: [
      { id: "mikrotik-routeros", label: { ar: "MikroTik RouterOS", en: "MikroTik RouterOS" } },
      { id: "firewall", label: { ar: "Network Security & Firewalls", en: "Network Security & Firewalls" } },
      { id: "qos", label: { ar: "QoS & Bandwidth Shaping", en: "QoS & Bandwidth Shaping" } },
    ],
    sectors: [
      { id: "telecom", label: { ar: "مزودو الإنترنت وقطاع الأعمال", en: "Telecom & Business Enterprises" } },
    ],
    rfqContext: {
      projectId: "network-infrastructure-case",
      projectLabel: {
        ar: "مشروع استشارات وتأمين شبكات الاتصالات",
        en: "Network Infrastructure Consulting",
      },
    },
    seo: {
      title: {
        ar: "دراسة حالة: تأمين وتحسين شبكات ميكروتيك | مؤسسة غزارة",
        en: "Case Study: Enterprise Network Optimization | Ghazara",
      },
      description: {
        ar: "دراسة حالة تفصيلية حول هندسة وتحسين استقرار شبكات ميكروتيك وتوزيع الأحمال الترددية من مؤسسة غزارة للتجارة والتسويق.",
        en: "Case study on enterprise network engineering, MikroTik bandwidth balancing, and uptime optimization by Ghazara.",
      },
    },
    approval: {
      status: "draft",
      source: "Network Infrastructure Case Study Draft (Awaiting formal business sign-off)",
      reviewDueAt: "2026-09-01",
    },
  },
];
