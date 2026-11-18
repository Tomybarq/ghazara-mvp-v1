import type { LocalizedString } from "./company";

/**
 * Ghazara Digital Solutions — ERP landing page content.
 * Arabic-first, mirrored in English for the site language switcher.
 */

export interface ErpPair {
  id: string;
  challenge: LocalizedString;
  solution: LocalizedString;
}

export interface ErpReason {
  id: string;
  index: string;
  icon: string;
  title: LocalizedString;
  desc: LocalizedString;
}

export interface ErpModule {
  id: string;
  icon: string;
  title: LocalizedString;
  desc: LocalizedString;
  points: LocalizedString[];
}

export interface ErpIntegration {
  id: string;
  icon: string;
  title: LocalizedString;
  desc: LocalizedString;
}

export interface ErpIndustry {
  id: string;
  icon: string;
  title: LocalizedString;
  pain: LocalizedString;
  outcome: LocalizedString;
}

export interface ErpPhase {
  id: string;
  step: string;
  duration: LocalizedString;
  title: LocalizedString;
  desc: LocalizedString;
  output: LocalizedString;
}

export interface ErpSupportItem {
  id: string;
  icon: string;
  title: LocalizedString;
  desc: LocalizedString;
  points: LocalizedString[];
}

export const erpHero = {
  eyebrow: {
    ar: "غزارة للحلول الرقمية — ERP",
    en: "Ghazara Digital Solutions — ERP",
  },
  titleLead: {
    ar: "نظام ERP متكامل يوحّد",
    en: "An integrated ERP that unifies",
  },
  titleAccent: {
    ar: "أرقام مؤسستك",
    en: "your company's numbers",
  },
  titleTail: {
    ar: "في منصة واحدة قابلة للتوسع",
    en: "on one scalable platform",
  },
  lead: {
    ar: "من المالية والمخزون إلى المبيعات والمشتريات والموارد البشرية — نصمم وننفذ نظام تخطيط موارد مؤسسية يحوّل بياناتك اليومية إلى قرارات دقيقة، بمنهجية تنفيذ واضحة ودعم محلي مستمر.",
    en: "From finance and inventory to sales, procurement and HR — we design and deliver an enterprise resource planning system that turns daily data into precise decisions, with a clear delivery method and continuous local support.",
  },
  primaryCta: {
    ar: "احجز تقييماً تشغيلياً",
    en: "Book an operational assessment",
  },
  secondaryCta: {
    ar: "تحدث مع مستشار ERP",
    en: "Talk to an ERP consultant",
  },
  badges: [
    { ar: "تنفيذ مرحلي منخفض المخاطر", en: "Low-risk phased delivery" },
    { ar: "بيانات مستضافة وفق سياسة واضحة", en: "Clear data hosting policy" },
    { ar: "دعم وتدريب بالعربية", en: "Arabic support & training" },
  ] as LocalizedString[],
  metrics: [
    {
      value: "18+",
      label: { ar: "وحدة أعمال قابلة للتفعيل", en: "Activatable business modules" },
    },
    {
      value: "6–10",
      label: { ar: "أسابيع لأول إطلاق تشغيلي", en: "Weeks to first live release" },
    },
    {
      value: "99.5%",
      label: { ar: "جهوزية تشغيلية مستهدفة", en: "Target operational uptime" },
    },
    {
      value: "24/7",
      label: { ar: "قناة دعم للحالات الحرجة", en: "Critical support channel" },
    },
  ],
  viz: {
    centerLabel: { ar: "ERP", en: "ERP" },
    caption: {
      ar: "طبقة تشغيل واحدة تربط كل الأقسام",
      en: "One operating layer connecting every department",
    },
    nodes: [
      { ar: "المالية", en: "Finance" },
      { ar: "المخزون", en: "Inventory" },
      { ar: "المبيعات", en: "Sales" },
      { ar: "المشتريات", en: "Procurement" },
      { ar: "الموارد البشرية", en: "Human resources" },
    ] as LocalizedString[],
  },
};

export const erpChallenges: ErpPair[] = [
  {
    id: "scattered-data",
    challenge: {
      ar: "البيانات موزعة بين ملفات Excel وأنظمة منفصلة لا تتحدث مع بعضها.",
      en: "Data is scattered across Excel files and disconnected systems.",
    },
    solution: {
      ar: "مصدر واحد للحقيقة يربط المالية والمخزون والمبيعات لحظياً، دون إدخال مكرر.",
      en: "A single source of truth linking finance, inventory and sales in real time, with no duplicate entry.",
    },
  },
  {
    id: "inventory-gap",
    challenge: {
      ar: "أرصدة المخزون لا تعكس الواقع، وخسائر لا يمكن تفسيرها أو تتبع مصدرها.",
      en: "Stock balances don't reflect reality, and losses cannot be traced.",
    },
    solution: {
      ar: "تتبع دقيق للكميات والتكلفة وحركة كل صنف بين المستودعات والفروع.",
      en: "Accurate tracking of quantities, cost and movement for every item across warehouses and branches.",
    },
  },
  {
    id: "late-reporting",
    challenge: {
      ar: "تقارير مالية متأخرة، وقرارات تُبنى على التقدير لا على أرقام موثّقة.",
      en: "Late financial reporting and decisions based on estimates rather than verified numbers.",
    },
    solution: {
      ar: "قوائم مالية ولوحات تنفيذية فورية مبنية على قيود محاسبية منظمة.",
      en: "Instant financial statements and executive dashboards built on disciplined accounting entries.",
    },
  },
  {
    id: "branch-silos",
    challenge: {
      ar: "الفروع والقنوات تعمل بمعزل عن المركز، والمركز ينتظر تقارير يدوية.",
      en: "Branches and channels operate apart from head office, which waits for manual reports.",
    },
    solution: {
      ar: "إدارة مركزية متعددة الفروع والمستودعات والقنوات، بصلاحيات دقيقة لكل دور.",
      en: "Central management across branches, warehouses and channels, with precise role-based permissions.",
    },
  },
  {
    id: "people-dependency",
    challenge: {
      ar: "العمليات تعتمد على خبرة أفراد، وتتعطل المؤسسة عند غيابهم.",
      en: "Operations depend on individual experience and stall when people leave.",
    },
    solution: {
      ar: "سير عمل موثّق وتدقيق كامل لكل عملية من الطلب حتى التحصيل.",
      en: "Documented workflows and full audit trails from order to collection.",
    },
  },
  {
    id: "cash-flow",
    challenge: {
      ar: "تدفقات نقدية غير واضحة وتحصيل متأخر يضغط على السيولة.",
      en: "Unclear cash flow and late collection squeeze liquidity.",
    },
    solution: {
      ar: "متابعة الالتزامات والمستحقات وأعمار الديون مع تنبيهات آلية للمتابعة.",
      en: "Tracking of commitments, receivables and aging with automated follow-up alerts.",
    },
  },
];

export const erpReasons: ErpReason[] = [
  {
    id: "local-context",
    index: "01",
    icon: "Compass",
    title: { ar: "فهم قطاعي محلي", en: "Local sector knowledge" },
    desc: {
      ar: "خبرة عملية في بيئة التجارة اليمنية ومتطلبات أسواق الخليج: الضرائب، الفواتير، تعدد العملات، وتعدد الفروع.",
      en: "Hands-on experience in Yemen's trading environment and GCC requirements: taxation, invoicing, multiple currencies and multi-branch operations.",
    },
  },
  {
    id: "solution-engineering",
    index: "02",
    icon: "Workflow",
    title: { ar: "هندسة حلول لا تركيب برامج", en: "Solution engineering, not software installation" },
    desc: {
      ar: "نبدأ من تحليل عملياتك الفعلية ونصمم سير العمل قبل ضبط الإعدادات، فلا ننقل فوضى قديمة إلى نظام جديد.",
      en: "We start from your real operations and design the workflow before configuring anything, so old chaos isn't moved into a new system.",
    },
  },
  {
    id: "phased-delivery",
    index: "03",
    icon: "ShieldCheck",
    title: { ar: "تنفيذ مرحلي بحدود مخاطر واضحة", en: "Phased delivery with clear risk boundaries" },
    desc: {
      ar: "نطاق محدد لكل مرحلة، وتسليمات موثّقة، واختبارات قبول قبل الانتقال — دون إيقاف أعمالك اليومية.",
      en: "A defined scope per phase, documented deliverables and acceptance testing before moving on — without stopping your daily operations.",
    },
  },
  {
    id: "long-term-partner",
    index: "04",
    icon: "LifeBuoy",
    title: { ar: "شريك تشغيل طويل الأمد", en: "A long-term operating partner" },
    desc: {
      ar: "تدريب فريقك، توثيق الإجراءات، ودعم مستمر مع تطوير تدريجي يواكب نمو المؤسسة.",
      en: "Training your team, documenting procedures, and ongoing support with incremental development that follows your growth.",
    },
  },
];

export const erpReasonsNote = {
  ar: "لا نبيع تراخيص ثم نختفي. نبقى مسؤولين عن أن يعمل النظام داخل مؤسستك، لا أن يُسلَّم فقط.",
  en: "We don't sell licenses and disappear. We stay accountable for the system actually working inside your organisation — not just being delivered.",
};

export const erpModules: ErpModule[] = [
  {
    id: "finance",
    icon: "Wallet",
    title: { ar: "المالية والمحاسبة", en: "Finance & accounting" },
    desc: {
      ar: "دفتر أستاذ عام، قيود آلية، مراكز تكلفة، وقوائم مالية معتمدة.",
      en: "General ledger, automated entries, cost centers and audited financial statements.",
    },
    points: [
      { ar: "قيود ومطابقات آلية", en: "Automated entries & reconciliation" },
      { ar: "مراكز تكلفة وإقفال دوري", en: "Cost centers & period close" },
    ],
  },
  {
    id: "inventory",
    icon: "Boxes",
    title: { ar: "المخزون والمستودعات", en: "Inventory & warehouses" },
    desc: {
      ar: "كميات لحظية وتكلفة دقيقة عبر كل المستودعات والفروع.",
      en: "Live quantities and accurate cost across every warehouse and branch.",
    },
    points: [
      { ar: "تحويلات وجرد دائم", en: "Transfers & perpetual counts" },
      { ar: "تقييم التكلفة وحدود الطلب", en: "Cost valuation & reorder limits" },
    ],
  },
  {
    id: "procurement",
    icon: "ShoppingCart",
    title: { ar: "المشتريات والتوريد", en: "Procurement & supply" },
    desc: {
      ar: "دورة كاملة من طلب الشراء حتى الاستلام والمطابقة الثلاثية.",
      en: "A full cycle from purchase request to receipt and three-way matching.",
    },
    points: [
      { ar: "اعتمادات ومقارنة عروض", en: "Approvals & quote comparison" },
      { ar: "مطابقة الفاتورة والاستلام", en: "Invoice & receipt matching" },
    ],
  },
  {
    id: "sales",
    icon: "Handshake",
    title: { ar: "المبيعات والعملاء", en: "Sales & customers" },
    desc: {
      ar: "عروض أسعار وأوامر بيع وفواتير مع متابعة أرصدة العملاء.",
      en: "Quotations, sales orders and invoices with continuous customer balance tracking.",
    },
    points: [
      { ar: "ملف عميل موحّد (CRM)", en: "Unified customer record (CRM)" },
      { ar: "حدود ائتمان ومتابعة تحصيل", en: "Credit limits & collection follow-up" },
    ],
  },
  {
    id: "hr",
    icon: "Users",
    title: { ar: "الموارد البشرية والرواتب", en: "HR & payroll" },
    desc: {
      ar: "حضور وإجازات وعقود ورواتب مرتبطة مباشرة بالقيود المحاسبية.",
      en: "Attendance, leave, contracts and payroll wired directly into accounting entries.",
    },
    points: [
      { ar: "مسير رواتب محكوم", en: "Controlled payroll runs" },
      { ar: "صلاحيات واعتمادات", en: "Roles & approvals" },
    ],
  },
  {
    id: "production",
    icon: "Factory",
    title: { ar: "الإنتاج والتكاليف", en: "Production & costing" },
    desc: {
      ar: "أوامر تشغيل وقوائم مواد وتكلفة منتج يمكن الاعتماد عليها.",
      en: "Work orders, bills of materials and dependable product costing.",
    },
    points: [
      { ar: "قوائم مواد (BOM)", en: "Bills of materials (BOM)" },
      { ar: "تكلفة تشغيل فعلية", en: "Actual production cost" },
    ],
  },
  {
    id: "pos",
    icon: "Store",
    title: { ar: "نقاط البيع والتجزئة", en: "Point of sale & retail" },
    desc: {
      ar: "ربط منافذ التجزئة بالمخزون والمالية في اللحظة نفسها.",
      en: "Retail outlets connected to inventory and finance in the same moment.",
    },
    points: [
      { ar: "ورديات وصناديق", en: "Shifts & cash drawers" },
      { ar: "مزامنة فورية للمخزون", en: "Real-time stock sync" },
    ],
  },
  {
    id: "projects",
    icon: "FolderKanban",
    title: { ar: "المشاريع والأصول", en: "Projects & assets" },
    desc: {
      ar: "تكاليف المشاريع والأصول الثابتة وإهلاكها في مكان واحد.",
      en: "Project costs, fixed assets and depreciation in one place.",
    },
    points: [
      { ar: "ربحية المشروع", en: "Project profitability" },
      { ar: "سجل أصول وإهلاك", en: "Asset register & depreciation" },
    ],
  },
  {
    id: "analytics",
    icon: "BarChart3",
    title: { ar: "التقارير وذكاء الأعمال", en: "Reporting & business intelligence" },
    desc: {
      ar: "لوحات تنفيذية وتقارير مخصصة لكل مستوى إداري.",
      en: "Executive dashboards and custom reports for every management level.",
    },
    points: [
      { ar: "مؤشرات أداء لحظية", en: "Live performance indicators" },
      { ar: "تقارير قابلة للتصدير", en: "Exportable reports" },
    ],
  },
];

export const erpIntegrations: ErpIntegration[] = [
  {
    id: "payments",
    icon: "CreditCard",
    title: { ar: "بوابات الدفع", en: "Payment gateways" },
    desc: {
      ar: "تحصيل المدفوعات وربطها بالفواتير تلقائياً.",
      en: "Collect payments and link them to invoices automatically.",
    },
  },
  {
    id: "ecommerce",
    icon: "ShoppingBag",
    title: { ar: "المتاجر الإلكترونية", en: "E-commerce stores" },
    desc: {
      ar: "مزامنة المنتجات والأسعار والطلبات مع المخزون.",
      en: "Sync products, prices and orders with inventory.",
    },
  },
  {
    id: "banking",
    icon: "Landmark",
    title: { ar: "البنوك والتحويلات", en: "Banks & transfers" },
    desc: {
      ar: "مطابقة كشوف الحسابات والمدفوعات البنكية.",
      en: "Reconcile bank statements and payments.",
    },
  },
  {
    id: "tax",
    icon: "ReceiptText",
    title: { ar: "الفوترة الإلكترونية والضرائب", en: "E-invoicing & tax" },
    desc: {
      ar: "فواتير متوافقة مع المتطلبات المحلية والإقليمية.",
      en: "Invoices aligned with local and regional requirements.",
    },
  },
  {
    id: "whatsapp",
    icon: "MessageCircle",
    title: { ar: "واتساب وخدمة العملاء", en: "WhatsApp & customer care" },
    desc: {
      ar: "إشعارات الطلبات والفواتير ومتابعة العملاء.",
      en: "Order and invoice notifications with customer follow-up.",
    },
  },
  {
    id: "hardware",
    icon: "ScanBarcode",
    title: { ar: "الباركود والأجهزة", en: "Barcode & devices" },
    desc: {
      ar: "قارئات وطابعات وموازين مرتبطة بالمستودع.",
      en: "Scanners, printers and scales connected to the warehouse.",
    },
  },
  {
    id: "api",
    icon: "Plug",
    title: { ar: "واجهات API", en: "API interfaces" },
    desc: {
      ar: "ربط الأنظمة الحالية دون إعادة بنائها.",
      en: "Connect existing systems without rebuilding them.",
    },
  },
  {
    id: "maeen",
    icon: "Layers",
    title: { ar: "منصة معين", en: "Ma'een platform" },
    desc: {
      ar: "ربط التشغيل المالي والإداري بمنصة معين للمنظمات.",
      en: "Connect financial and administrative operations to the Ma'een platform.",
    },
  },
];

export const erpIndustries: ErpIndustry[] = [
  {
    id: "trading",
    icon: "Truck",
    title: { ar: "التجارة والاستيراد والتوزيع", en: "Trading, import & distribution" },
    pain: {
      ar: "هامش ربح غير واضح لكل صنف وكل قناة.",
      en: "Unclear margin per item and per channel.",
    },
    outcome: {
      ar: "تكلفة وربحية دقيقة لكل صنف وشحنة وعميل.",
      en: "Accurate cost and profitability per item, shipment and customer.",
    },
  },
  {
    id: "retail",
    icon: "Store",
    title: { ar: "التجزئة ونقاط البيع", en: "Retail & point of sale" },
    pain: {
      ar: "فرق بين رصيد الرف ورصيد النظام.",
      en: "A gap between shelf stock and system stock.",
    },
    outcome: {
      ar: "مخزون موحّد بين المنافذ والمستودع المركزي.",
      en: "Unified stock across outlets and the central warehouse.",
    },
  },
  {
    id: "manufacturing",
    icon: "Factory",
    title: { ar: "التصنيع والإنتاج", en: "Manufacturing & production" },
    pain: {
      ar: "تكلفة منتج غير معروفة بدقة.",
      en: "Product cost not known precisely.",
    },
    outcome: {
      ar: "تكلفة مواد وتشغيل محسوبة لكل أمر إنتاج.",
      en: "Material and running cost calculated per production order.",
    },
  },
  {
    id: "contracting",
    icon: "HardHat",
    title: { ar: "المقاولات والمشاريع", en: "Contracting & projects" },
    pain: {
      ar: "مشاريع تتجاوز ميزانيتها دون إنذار مبكر.",
      en: "Projects exceed budget without early warning.",
    },
    outcome: {
      ar: "متابعة تكلفة ومستخلصات وربحية كل مشروع.",
      en: "Cost, progress claims and profitability tracked per project.",
    },
  },
  {
    id: "services",
    icon: "Briefcase",
    title: { ar: "الخدمات المهنية", en: "Professional services" },
    pain: {
      ar: "ساعات العمل والفوترة غير مرتبطة.",
      en: "Billable hours are not linked to invoicing.",
    },
    outcome: {
      ar: "ربط الوقت بالمشروع بالفاتورة بالتحصيل.",
      en: "Time linked to project, invoice and collection.",
    },
  },
  {
    id: "ngo",
    icon: "HeartHandshake",
    title: { ar: "المنظمات والقطاع غير الربحي", en: "Organisations & non-profit" },
    pain: {
      ar: "صعوبة إثبات الإنفاق لكل مشروع وممول.",
      en: "Difficulty proving spending per project and donor.",
    },
    outcome: {
      ar: "تقارير ممولين دقيقة وقابلة للتدقيق.",
      en: "Accurate, auditable donor reports.",
    },
  },
];

export const erpPhases: ErpPhase[] = [
  {
    id: "discovery",
    step: "01",
    duration: { ar: "1–2 أسبوع", en: "1–2 weeks" },
    title: { ar: "التقييم والتشخيص", en: "Assessment & diagnosis" },
    desc: {
      ar: "نراجع عملياتك الحالية، ونحدد الفجوات والأولويات قبل أي قرار تقني.",
      en: "We review current operations and define gaps and priorities before any technical decision.",
    },
    output: { ar: "خريطة عمليات وفجوات موثّقة", en: "Documented process & gap map" },
  },
  {
    id: "design",
    step: "02",
    duration: { ar: "أسبوع", en: "1 week" },
    title: { ar: "تصميم الحل", en: "Solution design" },
    desc: {
      ar: "تصميم سير العمل وهيكل البيانات والأدوار والصلاحيات قبل البناء.",
      en: "Workflow, data structure, roles and permissions designed before build.",
    },
    output: { ar: "مخطط حل معتمد من الإدارة", en: "Management-approved solution blueprint" },
  },
  {
    id: "build",
    step: "03",
    duration: { ar: "2–4 أسابيع", en: "2–4 weeks" },
    title: { ar: "البناء والتهيئة", en: "Build & configuration" },
    desc: {
      ar: "إعداد الوحدات والتكاملات واختبار سيناريوهات العمل الحقيقية.",
      en: "Modules and integrations configured, tested against real business scenarios.",
    },
    output: { ar: "بيئة تجريبية جاهزة للاختبار", en: "Test environment ready for validation" },
  },
  {
    id: "migration",
    step: "04",
    duration: { ar: "1–2 أسبوع", en: "1–2 weeks" },
    title: { ar: "الترحيل والتدريب", en: "Migration & training" },
    desc: {
      ar: "ترحيل البيانات وتدريب الفرق على الإجراءات الجديدة خطوة بخطوة.",
      en: "Data migration and step-by-step team training on the new procedures.",
    },
    output: { ar: "بيانات مرحّلة وفريق مدرَّب", en: "Migrated data & trained team" },
  },
  {
    id: "launch",
    step: "05",
    duration: { ar: "مستمر", en: "Ongoing" },
    title: { ar: "الإطلاق والتحسين", en: "Launch & optimisation" },
    desc: {
      ar: "إطلاق تشغيلي مدعوم، ثم مراجعة أداء دورية وخطة تطوير تدريجي.",
      en: "Supported go-live, followed by periodic performance reviews and a gradual roadmap.",
    },
    output: { ar: "خطة تحسين ربع سنوية", en: "Quarterly improvement plan" },
  },
];

export const erpSupport: ErpSupportItem[] = [
  {
    id: "advisory",
    icon: "ClipboardCheck",
    title: { ar: "استشارات ما قبل الشراء", en: "Pre-purchase advisory" },
    desc: {
      ar: "نساعدك على اتخاذ قرار مبني على احتياج فعلي لا على عرض بيع.",
      en: "We help you decide based on real need, not on a sales pitch.",
    },
    points: [
      { ar: "تقييم جاهزية المؤسسة", en: "Readiness assessment" },
      { ar: "مقارنة الخيارات والتكلفة الإجمالية", en: "Option & total-cost comparison" },
    ],
  },
  {
    id: "sla",
    icon: "Headset",
    title: { ar: "دعم تشغيلي باتفاقية خدمة", en: "Support with a service agreement" },
    desc: {
      ar: "قنوات دعم مباشرة وأوقات استجابة محددة ومتابعة موثّقة لكل حالة.",
      en: "Direct support channels, defined response times and documented follow-up.",
    },
    points: [
      { ar: "تصعيد واضح للحالات الحرجة", en: "Clear critical escalation path" },
      { ar: "نسخ احتياطي وتحديثات دورية", en: "Backups & scheduled updates" },
    ],
  },
  {
    id: "growth",
    icon: "TrendingUp",
    title: { ar: "تحسين وتطوير مستمر", en: "Continuous improvement" },
    desc: {
      ar: "مراجعة استخدام النظام وتقاريرك المخصصة مع كل مرحلة نمو.",
      en: "Usage reviews and custom reporting as your organisation grows.",
    },
    points: [
      { ar: "مراجعة أداء ربع سنوية", en: "Quarterly performance review" },
      { ar: "وحدات وتقارير إضافية", en: "Additional modules & reports" },
    ],
  },
];

export const erpSupportNote = {
  ar: "فريق الدعم يتحدث لغتك: قنوات عربية مباشرة، وتدريب على الإجراءات لا على الأزرار فقط.",
  en: "Support speaks your language: direct Arabic channels and training on procedures, not just buttons.",
};

export const erpCta = {
  eyebrow: { ar: "الخطوة التالية", en: "Next step" },
  title: {
    ar: "جاهز لتحويل تشغيل مؤسستك إلى نظام واحد واضح؟",
    en: "Ready to turn your operations into one clear system?",
  },
  desc: {
    ar: "ابدأ بجلسة تقييم تشغيلي مجانية مدتها 30 دقيقة مع مستشار ERP من غزارة — تخرج منها بتشخيص أولي وخطوات عملية قابلة للتنفيذ.",
    en: "Start with a free 30-minute operational assessment with a Ghazara ERP consultant — you leave with an initial diagnosis and actionable next steps.",
  },
  primaryCta: { ar: "احجز جلسة التقييم", en: "Book the assessment" },
  secondaryCta: { ar: "تواصل عبر واتساب", en: "Continue on WhatsApp" },
  whatsappMessage: {
    ar: "مرحبًا، أرغب في حجز جلسة تقييم تشغيلي لنظام ERP مع فريق غزارة للحلول الرقمية.",
    en: "Hello, I'd like to book an ERP operational assessment with the Ghazara Digital Solutions team.",
  },
  note: {
    ar: "لا التزام مالي في الجلسة الأولى — نناقش النطاق والتكلفة بشفافية.",
    en: "No financial commitment for the first session — scope and cost discussed transparently.",
  },
};
