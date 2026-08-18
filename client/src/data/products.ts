import type { LocalizedString } from "./company";

export interface ProductItem {
  id: string;
  slug: string;
  category: "saas" | "portal" | "utilities";
  tag: LocalizedString;
  title: LocalizedString;
  shortDesc: LocalizedString;
  fullDesc: LocalizedString;
  keyFeatures: LocalizedString[];
  status: "live" | "development" | "enterprise";
  externalLink?: string;
  badgeAccent?: "amber" | "iris" | "emerald";
}

export const productsData: ProductItem[] = [
  {
    id: "maeen",
    slug: "maeen-ngo-platform",
    category: "saas",
    tag: {
      ar: "منصة ساس مؤسسية",
      en: "Enterprise SaaS",
    },
    title: {
      ar: "منصة معين الرقمية (Ma'een NGO Platform)",
      en: "Ma'een Digital Platform (NGO SaaS)",
    },
    shortDesc: {
      ar: "منصة ساس متكاملة ومخصصة لإدارة العمل الخيري والمؤسسات غير الربحية، تشمل إدارة التبرعات والمشاريع والتقارير المالية.",
      en: "An integrated SaaS platform for non-profit organizations and charities, managing donations, projects, and financial reporting.",
    },
    fullDesc: {
      ar: "صُممت منصة معين لتمكين المنظمات والجمعيات من أتمتة العمليات الإدارية والمالية وإدارة المستفيدين والربط مع بوابات الدفع الإلكتروني وفق أعلى معايير الحوكمة والأمان.",
      en: "Ma'een was built to empower NGOs to automate administrative and financial workflows, manage beneficiaries, and integrate electronic payment gateways securely.",
    },
    keyFeatures: [
      { ar: "إدارة التبرعات والمشاريع الإنسانية أونلاين", en: "Online donations & humanitarian projects management" },
      { ar: "تقارير حوكمة وشفافية مالية متقدمة", en: "Advanced financial transparency & governance reporting" },
      { ar: "بوابة متبرعين تفاعلية ونظام إشعارات ذكي", en: "Interactive donor portal & smart notification system" },
    ],
    status: "live",
    externalLink: "https://github.com/Tomybarq/moeen-ngo",
    badgeAccent: "iris",
  },
  {
    id: "ghazara-net",
    slug: "ghazara-digital-network",
    category: "portal",
    tag: {
      ar: "البوابة المركزية",
      en: "Core Platform",
    },
    title: {
      ar: "شبكة غزارة الرقمية (ghazara.net)",
      en: "Ghazara Digital Network",
    },
    shortDesc: {
      ar: "البوابة الموحدة لمنظومة غزارة التجارية والخدمية، تربط الشركاء والعملاء بالحلول الرقمية وأدوات التحويل التجاري.",
      en: "The unified portal for Ghazara commercial and service ecosystem, connecting partners and clients to digital solutions and conversion tools.",
    },
    fullDesc: {
      ar: "تمثل شبكة غزارة النواة الرقمية التي تنظم قنوات طلب عروض الأسعار، استعراض الفرص التجارية، واستقبال طلبات التمثيل التجاري والشراكات الإقليمية.",
      en: "Ghazara Network represents the digital nucleus orchestrating RFQs, commercial opportunities, and regional partnership applications.",
    },
    keyFeatures: [
      { ar: "تدفق RFQ متعدد المراحل لطلب الخدمات والتمثيل التجاري", en: "Multi-stage RFQ workflow for services and representation" },
      { ar: "تكامل مباشر مع قنوات المراسلة الفورية وقاعدة البيانات", en: "Direct integration with instant messaging and secure database" },
      { ar: "واجهة ثنائية اللغة مهيأة لخدمة عملاء اليمن والمنطقة", en: "Bilingual interface optimized for Yemen and regional clients" },
    ],
    status: "live",
    badgeAccent: "amber",
  },
  {
    id: "mikrotik-tools",
    slug: "network-management-utilities",
    category: "utilities",
    tag: {
      ar: "حلول البنية التحتية",
      en: "Infrastructure Solutions",
    },
    title: {
      ar: "أنظمة وأدوات إدارة الشبكات وميكروتيك",
      en: "Network & MikroTik Management Solutions",
    },
    shortDesc: {
      ar: "أدوات برمجية متخصصة لمراقبة وتأمين شبكات الاتصالات، وتحسين توزيع النطاق الترددي للشركات ومزودي الخدمة.",
      en: "Specialized utilities for monitoring and securing telecom networks, and optimizing bandwidth distribution for enterprises and ISPs.",
    },
    fullDesc: {
      ar: "حلول هندسية لإدارة البنى التحتية السلكية واللاسلكية تضمن استقرار الاتصال، وعزل الاختناقات في الشبكة، وتوفير لوحات مراقبة لحظية لأداء الأجهزة.",
      en: "Engineering solutions for wired and wireless infrastructure management, guaranteeing uptime, eliminating bottlenecks, and providing real-time telemetry.",
    },
    keyFeatures: [
      { ar: "مراقبة استهلاك النطاق الترددي واستقرار الاتصال", en: "Bandwidth consumption monitoring and link stability" },
      { ar: "أتمتة سياسات التوجيه والحماية والجدران النارية", en: "Automated routing policies, firewalls, and security rules" },
      { ar: "تقارير تشخيصية للأداء وحالات الانقطاع", en: "Diagnostic performance and outage reporting" },
    ],
    status: "enterprise",
    badgeAccent: "emerald",
  },
];
