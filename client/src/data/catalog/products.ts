import type { LocalizedString } from "../site/company";
import type { ContentApproval } from "../governance/contentApproval";

export interface ProductCapability {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
}

export interface ProductUseCase {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
}

export interface ProductSector {
  id: string;
  label: LocalizedString;
}

export interface ProductItem {
  id: string;
  slug: string;
  type: "product" | "platform" | "solution" | "service";
  category: "saas" | "portal" | "utilities";
  published: boolean;
  tag: LocalizedString;
  title: LocalizedString;
  shortDesc: LocalizedString;
  overview?: LocalizedString;
  fullDesc: LocalizedString;
  keyFeatures: LocalizedString[];
  capabilities?: ProductCapability[];
  useCases?: ProductUseCase[];
  sectors?: ProductSector[];
  status: "live" | "development" | "enterprise";
  externalLink?: string;
  badgeAccent?: "amber" | "iris" | "emerald";
  rfqContext?: {
    productId: string;
    productLabel: LocalizedString;
  };
  seo?: {
    title?: LocalizedString;
    description?: LocalizedString;
  };
  approval: ContentApproval;
}

/**
 * Product Catalog
 * Baseline: set to draft / published: false until formal written sign-off is logged.
 */
export const productsData: ProductItem[] = [
  {
    id: "maeen",
    slug: "maeen-ngo-platform",
    type: "platform",
    category: "saas",
    published: false,
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
    overview: {
      ar: "صُممت منصة معين لتمكين المنظمات والمؤسسات غير الربحية من إدارة التبرعات والمشاريع الإنسانية وفق أعلى معايير الشفافية والحوكمة المالية.",
      en: "Ma'een was engineered to empower non-profit and humanitarian organizations to govern donations, campaigns, and financial transparency seamlessly.",
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
    capabilities: [
      {
        id: "donations-engine",
        title: { ar: "محرك تبرعات متعدد القنوات", en: "Multi-Channel Donation Engine" },
        description: {
          ar: "استقبال التبرعات والمساهمات عبر المحافظ الإلكترونية والتحويلات المصرفية.",
          en: "Accept contributions through digital wallets, bank transfers, and gateway links.",
        },
      },
      {
        id: "governance-reports",
        title: { ar: "لوحة تقارير الحوكمة والرقابة", en: "Governance & Audit Telemetry" },
        description: {
          ar: "توليد كشوفات الحساب وتقارير الإنجاز للمانحين ومجالس الإدارة.",
          en: "Generate auditable statements and project achievement metrics for donors.",
        },
      },
    ],
    useCases: [
      {
        id: "relief-projects",
        title: { ar: "إدارة الحملات والمشاريع الإغاثية", en: "Humanitarian & Relief Campaigns" },
      },
      {
        id: "donor-relations",
        title: { ar: "إدارة علاقات المتبرعين والشركاء", en: "Donor & Partner Relations Management" },
      },
    ],
    sectors: [
      { id: "ngo", label: { ar: "المنظمات والمؤسسات غير الربحية", en: "NGOs & Non-Profits" } },
      { id: "philanthropy", label: { ar: "الصناديق الوقفية والخيرية", en: "Endowments & Charities" } },
    ],
    status: "live",
    externalLink: "https://github.com/Tomybarq/moeen-ngo",
    badgeAccent: "iris",
    rfqContext: {
      productId: "maeen",
      productLabel: {
        ar: "منصة معين لإدارة المنظمات",
        en: "Ma'een NGO Platform",
      },
    },
    seo: {
      title: {
        ar: "منصة معين لإدارة المؤسسات غير الربحية | مؤسسة غزارة",
        en: "Ma'een NGO SaaS Platform | Ghazara",
      },
      description: {
        ar: "تعرف على منصة معين السحابية لإدارة التبرعات والمشاريع والتقارير المالية للمنظمات الإنسانية من تطوير ودعم مؤسسة غزارة.",
        en: "Explore Ma'een NGO SaaS platform for donation workflows, project governance, and financial reporting developed and supported by Ghazara.",
      },
    },
    approval: {
      status: "draft",
      source: "Open-Source Prototype moeen-ngo (Awaiting formal business sign-off)",
      reviewDueAt: "2026-09-01",
    },
  },
  {
    id: "ghazara-net",
    slug: "ghazara-digital-network",
    type: "platform",
    category: "portal",
    published: false,
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
    overview: {
      ar: "منظومة الحضور الرقمي المتكاملة التي تدير استعراض الحلول التجارية، وتدفقات طلب عروض الأسعار، ونوافذ التواصل المباشر.",
      en: "Integrated digital presence ecosystem orchestrating commercial solutions showcase, multi-channel RFQ funnels, and executive communication.",
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
    capabilities: [
      {
        id: "rfq-bridge",
        title: { ar: "محرك طلب عروض الأسعار الذكي", en: "Structured RFQ Dispatch Engine" },
        description: {
          ar: "معالجة وتحقق صارم لطلبات الأسعار والتكامل السلس مع الواتساب المؤسسي.",
          en: "Strict validation and database persistence with instant WhatsApp bridge.",
        },
      },
      {
        id: "bilingual-core",
        title: { ar: "هندسة المحتوى ثنائي اللغة", en: "Bilingual Editorial Engine" },
        description: {
          ar: "دعم كامل للغة العربية (RTL) والإنجليزية (LTR) مع مراعاة كاملة لمعايير الوصول.",
          en: "Arabic-first RTL and English LTR UX designed to WCAG 2.2 AA standards.",
        },
      },
    ],
    sectors: [
      { id: "b2b", label: { ar: "الشركات والمؤسسات التجارية", en: "Commercial Enterprises & B2B" } },
      { id: "regional", label: { ar: "الشركاء والوكالات الإقليمية", en: "Regional Agency & Distribution" } },
    ],
    status: "live",
    badgeAccent: "amber",
    rfqContext: {
      productId: "ghazara-net",
      productLabel: {
        ar: "بوابة وحلول شبكة غزارة الرقمية",
        en: "Ghazara Digital Network Solutions",
      },
    },
    seo: {
      title: {
        ar: "شبكة غزارة الرقمية والحلول المؤسسية | مؤسسة غزارة",
        en: "Ghazara Digital Network & Solutions | Ghazara",
      },
      description: {
        ar: "استعرض البوابة الرقمية لمؤسسة غزارة وحلول التمثيل التجاري والخدمات الرقمية وسلاسل الإمداد في اليمن والمنطقة.",
        en: "Explore Ghazara Digital Network portal for commercial representation, digital marketing, and supply chain solutions.",
      },
    },
    approval: {
      status: "draft",
      source: "Ghazara Operations Framework (Awaiting formal business sign-off)",
      reviewDueAt: "2026-09-01",
    },
  },
  {
    id: "mikrotik-tools",
    slug: "network-management-utilities",
    type: "solution",
    category: "utilities",
    published: false,
    tag: {
      ar: "حلول البنية والشبكات",
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
    overview: {
      ar: "حلول هندسية متقدمة لإدارة وتأمين شبكات الأعمال اللاسلكية والسلكية، وضمان استقرار الاتصال وتحسين استغلال الترددات.",
      en: "Advanced network engineering solutions for enterprise wired and wireless networks, maximizing uptime and optimizing link utilization.",
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
    capabilities: [
      {
        id: "traffic-balancing",
        title: { ar: "موازنة وتوزيع الأحمال الترددية", en: "Load Balancing & Traffic Shaping" },
        description: {
          ar: "توزيع حركة المرور بين خطوط الإنترنت المتعددة لضمان استمرارية الخدمة.",
          en: "Distribute traffic across redundant uplinks ensuring high availability.",
        },
      },
      {
        id: "firewall-hardening",
        title: { ar: "تأمين الجدران النارية والسياسات الأمنية", en: "Firewall & Security Hardening" },
        description: {
          ar: "حماية البنية التحتية من الاختراقات وعزل التهديدات السيبرانية.",
          en: "Protect enterprise network perimeters against unauthorized intrusion.",
        },
      },
    ],
    sectors: [
      { id: "isp", label: { ar: "مزودو خدمات الإنترنت والاتصالات", en: "ISPs & Telecom Providers" } },
      { id: "enterprise-it", label: { ar: "إدارات تقنية المعلومات في الشركات", en: "Enterprise IT Departments" } },
    ],
    status: "enterprise",
    badgeAccent: "emerald",
    rfqContext: {
      productId: "mikrotik-tools",
      productLabel: {
        ar: "حلول وتجهيزات إدارة الشبكات وميكروتيك",
        en: "Network & MikroTik Infrastructure Solutions",
      },
    },
    seo: {
      title: {
        ar: "حلول وأنظمة إدارة شبكات ميكروتيك | مؤسسة غزارة",
        en: "Network & MikroTik Management Solutions | Ghazara",
      },
      description: {
        ar: "خدمات وحلول هندسة وتأمين شبكات الأعمال وميكروتيك ومراقبة استقرار الاتصال من مؤسسة غزارة للتجارة والتسويق.",
        en: "Enterprise network engineering, MikroTik management, and bandwidth optimization services by Ghazara Trading & Marketing.",
      },
    },
    approval: {
      status: "draft",
      source: "Telecom Consulting Framework (Awaiting formal business sign-off)",
      reviewDueAt: "2026-09-01",
    },
  },
];
