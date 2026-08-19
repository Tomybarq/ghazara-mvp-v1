import type { LocalizedString, ContentApproval } from "../site/company";

export interface ServiceItem {
  id: "trade" | "marketing" | "digital" | "consulting";
  number: string;
  title: LocalizedString;
  shortDesc: LocalizedString;
  fullDesc: LocalizedString;
  problemSolved: LocalizedString;
  valueDelivered: LocalizedString;
  features: LocalizedString[];
  icon: "Briefcase" | "TrendingUp" | "Code" | "LineChart";
  accent: "amber" | "iris" | "amethyst" | "slate";
  approval?: ContentApproval;
}

export const servicesData: ServiceItem[] = [
  {
    id: "trade",
    number: "01",
    title: {
      ar: "التجارة والتمثيل التجاري",
      en: "Trade & Commercial Representation",
    },
    shortDesc: {
      ar: "إدارة الوكالات التجارية، تيسير سلاسل التوريد، والربط التجاري الإقليمي بكفاءة عالية.",
      en: "Managing commercial agencies, supply chain facilitation, and high-efficiency regional trade linking.",
    },
    fullDesc: {
      ar: "نقدم حلول تمثيل تجاري مدروسة تربط المصنعين والموردين بمنافذ البيع وشبكات التوزيع في الأسواق المستهدفة، مع إدارة عقود التوريد والامتثال اللوجستي.",
      en: "We provide structured commercial representation solutions linking manufacturers and suppliers to distribution networks in target markets, with supply contract management.",
    },
    problemSolved: {
      ar: "صعوبة اختراق الأسواق الجديدة، وبطء الوصول إلى شركاء توزيع موثوقين، وتعقيدات سلاسل الإمداد.",
      en: "Difficulty penetrating new markets, slow access to verified distributors, and supply chain complexity.",
    },
    valueDelivered: {
      ar: "قنوات بيع منظمة، تدفق توريد مستقر، وتسريع دورة المبيعات مع تقليل مخاطر التوسع.",
      en: "Structured sales channels, stable supply flow, and accelerated sales cycles with reduced expansion risk.",
    },
    features: [
      { ar: "إدارة الوكالات وتطوير قنوات التوزيع", en: "Agency management & distribution channel development" },
      { ar: "تيسير سلاسل التوريد وعمليات الشراء المؤسسي", en: "Supply chain facilitation & institutional procurement" },
      { ar: "الربط التجاري بين الموردين ومنافذ البيع", en: "Commercial bridging between suppliers and POS" },
    ],
    icon: "Briefcase",
    accent: "iris",
  },
  {
    id: "marketing",
    number: "02",
    title: {
      ar: "التسويق الرقمي واستراتيجيات النمو",
      en: "Digital Marketing & Growth Strategies",
    },
    shortDesc: {
      ar: "إدارة الحملات الإعلانية، بناء الهوية البصرية، وتحسين معدلات التحويل للعلامات التجارية.",
      en: "Ad campaign management, brand identity building, and conversion rate optimization.",
    },
    fullDesc: {
      ar: "تخطيط وتنفيذ حملات تسويقية قائمة على الأداء والبيانات، تصمم لزيادة الوعي المؤسسي وتوليد العملاء المحتملين (Leads) ورفع القيمة الدائمة للعميل.",
      en: "Planning and executing data-driven performance campaigns designed to increase corporate awareness, generate qualified leads, and maximize customer lifetime value.",
    },
    problemSolved: {
      ar: "هدر الميزانيات الإعلانية على حملات غير موجهة، وضعف العائد على الاستثمار، وغياب الحضور الرقمي المقنع.",
      en: "Wasted ad spend on non-targeted campaigns, low ROI, and weak digital brand credibility.",
    },
    valueDelivered: {
      ar: "استهداف دقيق للشريحة التجارية المناسبة، وتحسين معدلات التحويل، وتوليد فرص بيعية مستمرة.",
      en: "Precision targeting for qualified B2B buyers, optimized conversion rates, and continuous deal flow.",
    },
    features: [
      { ar: "إدارة الحملات الإعلانية الممولة متناهية الدقة", en: "Precision paid advertising management" },
      { ar: "بناء الهوية المؤسسية وأنظمة العلامة التجارية", en: "Corporate identity systems and brand positioning" },
      { ar: "تحسين معدلات التحويل (CRO) وتوليد العملاء", en: "Conversion rate optimization (CRO) & lead generation" },
    ],
    icon: "TrendingUp",
    accent: "amber",
  },
  {
    id: "digital",
    number: "03",
    title: {
      ar: "تطوير المنصات والحلول التقنية",
      en: "Platform Development & Tech Solutions",
    },
    shortDesc: {
      ar: "تصميم وبناء المواقع الإلكترونية، التطبيقات التجارية، ونظم إدارة علاقات العملاء.",
      en: "Web design and development, commercial apps, and CRM systems.",
    },
    fullDesc: {
      ar: "هندسة وبناء منصات ويب متقدمة وأنظمة أعمال سحابية تدعم العمليات التجارية والتسويقية للمؤسسة، مع مراعاة الأمان العالي وتجربة المستخدم الحديثة.",
      en: "Engineering advanced web platforms and cloud business systems supporting commercial and marketing operations with enterprise security and seamless UX.",
    },
    problemSolved: {
      ar: "الاعتماد على قوالب بطيئة غير مهيأة للتحويل، ومحدودية التوسع التقني في الأنظمة القديمة.",
      en: "Reliance on slow generic templates unoptimized for conversion and legacy scalability bottlenecks.",
    },
    valueDelivered: {
      ar: "منصات رقمية متجاوبة وسريعة، Type-Safe Architecture قابلة للتوسع، وتجربة تصفح تزيد ثقة العملاء.",
      en: "Fast responsive platforms, scalable type-safe architecture, and high-trust user experiences.",
    },
    features: [
      { ar: "تطوير منصات الويب وتطبيقات الأعمال المتكاملة", en: "Enterprise web platforms & business applications" },
      { ar: "بوابات الخدمة الذاتية ونماذج التحويل الرقمية", en: "Self-service portals & conversion funnels" },
      { ar: "تكامل الأنظمة البرمجية ونقاط الاتصال الرقمية", en: "API integrations & digital touchpoints synchronization" },
    ],
    icon: "Code",
    accent: "amethyst",
  },
  {
    id: "consulting",
    number: "04",
    title: {
      ar: "الاستشارات الاقتصادية ودراسات السوق",
      en: "Economic Consulting & Market Research",
    },
    shortDesc: {
      ar: "تحليل الفرص الاستثمارية، دراسات جدوى الأسواق، وتقديم الاستشارات الاستراتيجية.",
      en: "Investment opportunity analysis, market feasibility studies, and strategic advisory.",
    },
    fullDesc: {
      ar: "تقديم قراءات واقعية وتحليلات ميدانية للسوق المحلي والإقليمي، تساعد الإدارة التنفيذية وأصحاب الأعمال على اتخاذ قرارات استثمارية وتجارية واثقة.",
      en: "Delivering realistic market insights and field intelligence for local and regional markets to support confident executive decisions.",
    },
    problemSolved: {
      ar: "القرارات العشوائية المبنية على التخمين، وغياب البيانات الموثوقة لواقع السوق والمنافسة.",
      en: "Uninformed guesswork decisions and lack of credible data regarding market dynamics and competitors.",
    },
    valueDelivered: {
      ar: "وضوح استراتيجي، تحديد الفرص الأكثر ربحية، وتقليل مخاطر الدخول أو إطلاق المنتجات الجديدة.",
      en: "Strategic clarity, identification of lucrative opportunities, and minimized launch risks.",
    },
    features: [
      { ar: "دراسات الجدوى وتحليل الفرص التجارية", en: "Feasibility studies & commercial opportunity analysis" },
      { ar: "تحليل المنافسين وسلوك المستهلك المحلي", en: "Competitor profiling & local consumer behavior" },
      { ar: "استشارات خطط التوسع والنمو المؤسسي", en: "Corporate growth & expansion advisory" },
    ],
    icon: "LineChart",
    accent: "slate",
  },
];
