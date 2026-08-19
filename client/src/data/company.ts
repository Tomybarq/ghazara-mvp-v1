export interface LocalizedString {
  ar: string;
  en: string;
}

export interface ValueItem {
  id: string;
  title: LocalizedString;
  desc: LocalizedString;
  icon?: string;
}

export interface ContentApproval {
  status: "approved" | "pending" | "blocked";
  source?: string;
  approvedBy?: string;
  approvedAt?: string;
  reviewDueAt?: string;
}

export interface CompanyData {
  legalName: LocalizedString;
  brandName: LocalizedString;
  shortName: LocalizedString;
  tagline: LocalizedString;
  storyP1: LocalizedString;
  storyP2: LocalizedString;
  vision: LocalizedString;
  mission: LocalizedString;
  values: ValueItem[];
  pillars: {
    title: LocalizedString;
    desc: LocalizedString;
  }[];
  approval: ContentApproval;
}

export const companyData: CompanyData = {
  approval: {
    status: "approved",
    source: "Executive Management Review 2026",
    approvedBy: "Adnan Al-Hanashi",
    approvedAt: "2026-08-16",
  },
  legalName: {
    ar: "مؤسسة غزارة للتجارة والتسويق",
    en: "Ghazara Trading & Marketing",
  },
  brandName: {
    ar: "مؤسسة غزارة للتجارة والتسويق",
    en: "Ghazara Trading & Marketing",
  },
  shortName: {
    ar: "غزارة",
    en: "Ghazara",
  },
  tagline: {
    ar: "حلول تجارية وتسويقية متكاملة تربط الأعمال بالفرص في اليمن والمنطقة",
    en: "Integrated commercial and marketing solutions connecting businesses to opportunities in Yemen and the region.",
  },
  storyP1: {
    ar: "تأسست مؤسسة غزارة للتجارة والتسويق لتكون ركيزة أساسية في تطوير بيئة الأعمال والتجارة والحلول التسويقية. نؤمن بأن النجاح المستدام يتطلب دمج الأصالة التجارية مع الابتكار الرقمي.",
    en: "Ghazara Trading & Marketing was founded to be a key pillar in developing the business environment, commerce, and marketing solutions. We believe sustainable success requires uniting commercial authenticity with digital innovation.",
  },
  storyP2: {
    ar: "نقدم منظومة متكاملة تشمل التمثيل التجاري، توريد الحلول، التخطيط التسويقي المتقدم، واستشارات النمو المؤسسي لضمان تفوق شركائنا في الأسواق المحلية والإقليمية.",
    en: "We deliver an integrated ecosystem including commercial representation, solution sourcing, advanced marketing planning, and corporate growth consulting to ensure our partners excel locally and regionally.",
  },
  vision: {
    ar: "أن نكون الشريك التجاري والتسويقي الأكثر ابتكاراً وموثوقية في ربط الأسواق المحلية والإقليمية بأعلى معايير الجودة.",
    en: "To be the most innovative and trusted commercial and marketing partner connecting local and regional markets with the highest quality standards.",
  },
  mission: {
    ar: "تمكين المؤسسات والشركات من قيادة قطاعاتها عبر حلول تجارية وتسويقية وتقنية استراتيجية قابلة للقياس والتوسع.",
    en: "Empowering institutions and enterprises to lead their sectors through scalable, measurable commercial, marketing, and technical strategies.",
  },
  values: [
    {
      id: "trust",
      title: { ar: "الاحترافية والموثوقية", en: "Professionalism & Reliability" },
      desc: {
        ar: "التزام صارم بأعلى معايير الجودة والشفافية في كل تعامل تجاري وشراكة استراتيجية.",
        en: "Strict adherence to the highest standards of quality and transparency in every commercial partnership.",
      },
      icon: "ShieldCheck",
    },
    {
      id: "innovation",
      title: { ar: "الابتكار المستمر", en: "Continuous Innovation" },
      desc: {
        ar: "استخدام أحدث الأدوات والمنهجيات التسويقية والرقمية لتعظيم العائد التجاري لشركائنا.",
        en: "Leveraging modern digital and marketing methodologies to maximize ROI for our partners.",
      },
      icon: "TrendingUp",
    },
    {
      id: "partnership",
      title: { ar: "الشراكة بعيدة المدى", en: "Long-Term Partnership" },
      desc: {
        ar: "نعمل كامتداد لفريقك المؤسسي لضمان تحقيق أهدافك التجارية بنجاح واستدامة.",
        en: "Operating as an extension of your team to ensure sustainable strategic success.",
      },
      icon: "Briefcase",
    },
  ],
  pillars: [
    {
      title: { ar: "التمثيل التجاري الموثوق", en: "Reliable Commercial Representation" },
      desc: {
        ar: "إدارة الوكالات وسلاسل الإمداد والتوريدات بكفاءة مؤسسية عالية.",
        en: "Managing agencies, supply chains, and procurement with top corporate efficiency.",
      },
    },
    {
      title: { ar: "التحول والحلول الرقمية", en: "Digital Transformation & Solutions" },
      desc: {
        ar: "بناء المنصات الرقمية وتطبيقات الويب وحلول الربط التقني الحديثة.",
        en: "Building digital platforms, web applications, and modern integration solutions.",
      },
    },
    {
      title: { ar: "استراتيجيات النمو والتسويق", en: "Growth & Marketing Strategies" },
      desc: {
        ar: "إدارة الحملات وبناء الهويات المؤسسية وتحسين معدلات التحويل التجاري.",
        en: "Ad campaigns management, institutional branding, and conversion rate optimization.",
      },
    },
  ],
};
