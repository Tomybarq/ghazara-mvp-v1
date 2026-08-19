import type { LocalizedString, ContentApproval } from "./company";

export interface ContactInfo {
  approval: ContentApproval;
  phone: {
    display: string;
    value: string;
    isApproved: boolean;
  };
  whatsapp: {
    display: string;
    number: string;
    isApproved: boolean;
    defaultPrefillAr: string;
    defaultPrefillEn: string;
  };
  email: {
    display: string;
    address: string;
    isApproved: boolean;
  };
  address: {
    display: LocalizedString;
    isApproved: boolean;
  };
  workingHours?: {
    display: LocalizedString;
    isApproved: boolean;
  };
  socialLinks: {
    id: string;
    label: string;
    url: string;
    isApproved: boolean;
  }[];
}

export const contactData: ContactInfo = {
  approval: {
    status: "approved",
    source: "Executive Management Contact Sign-Off 2026",
    approvedBy: "Adnan Al-Hanashi",
    approvedAt: "2026-08-16",
  },
  phone: {
    display: "+967 783 334 002",
    value: "967783334002",
    isApproved: true, // Approved: Executive Director Adnan Al-Hanashi
  },
  whatsapp: {
    display: "+967 783 334 002",
    number: "967783334002",
    isApproved: true, // Approved: Executive Director Adnan Al-Hanashi
    defaultPrefillAr: "مرحبًا، أرغب في معرفة المزيد عن خدمات وحلول مؤسسة غزارة للتجارة والتسويق.",
    defaultPrefillEn: "Hello, I would like to inquire about Ghazara Trading & Marketing services and solutions.",
  },
  email: {
    display: "info@ghazara.net",
    address: "info@ghazara.net",
    isApproved: true,
  },
  address: {
    display: {
      ar: "شارع الجزائر - عمارة باطاهر - الدور الثاني - شقة 6 - سيئون - حضرموت - اليمن",
      en: "Al-Jazair Street, Ba-Taher Building, 2nd Floor, Apt 6, Seiyun, Hadramout, Yemen",
    },
    isApproved: true,
  },
  workingHours: {
    display: {
      ar: "السبت – الخميس: 8:00 صباحاً – 5:00 مساءً (توقيت اليمن GMT+3)",
      en: "Saturday – Thursday: 8:00 AM – 5:00 PM (Yemen GMT+3)",
    },
    isApproved: true,
  },
  socialLinks: [
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/company/ghazara",
      isApproved: false,
    },
    {
      id: "x",
      label: "X (Twitter)",
      url: "https://x.com/ghazara_ye",
      isApproved: false,
    },
  ],
};

export interface RfqOption {
  id: string;
  label: LocalizedString;
  desc?: LocalizedString;
}

export const rfqSectors: RfqOption[] = [
  {
    id: "agriculture",
    label: { ar: "القطاع الزراعي والغذائي", en: "Agriculture & Food Products" },
    desc: { ar: "توزيع المنتجات الزراعية والغذائية وسلاسل التوريد", en: "Agricultural and food distribution & supply chain" },
  },
  {
    id: "retail",
    label: { ar: "السلع الاستهلاكية والتجزئة (FMCG)", en: "FMCG & Consumer Goods" },
    desc: { ar: "تسويق المنتجات الاستهلاكية وبناء حضور نقاط البيع", en: "Consumer marketing & retail point-of-sale presence" },
  },
  {
    id: "industrial",
    label: { ar: "الصناعة والتوريدات المؤسسية", en: "Industrial & Enterprise Procurement" },
    desc: { ar: "تمثيل تجاري ومشتريات المصانع والشركات الكبرى", en: "Commercial representation for factories & suppliers" },
  },
  {
    id: "b2b",
    label: { ar: "الخدمات المهنية والشركات B2B", en: "B2B & Professional Services" },
    desc: { ar: "حلول التسويق الرقمي وتطوير الأعمال والاستشارات", en: "Digital marketing, business development & advisory" },
  },
];

export const rfqServices: RfqOption[] = [
  {
    id: "representation",
    label: { ar: "التمثيل التجاري وقنوات التوزيع", en: "Commercial Representation & Distribution" },
  },
  {
    id: "marketing",
    label: { ar: "التسويق الرقمي وإدارة الحملات", en: "Digital Marketing & Campaigns" },
  },
  {
    id: "digital",
    label: { ar: "تطوير المنصات والحلول البرمجية", en: "Platform Development & Software" },
  },
  {
    id: "consulting",
    label: { ar: "الاستشارات الاقتصادية ودراسات السوق", en: "Economic Advisory & Market Research" },
  },
];

export const rfqRegions: RfqOption[] = [
  { id: "hadramout", label: { ar: "حضرموت والمحافظات الشرقية", en: "Hadramout & Eastern Provinces" } },
  { id: "aden", label: { ar: "عدن والمحافظات الجنوبية", en: "Aden & Southern Provinces" } },
  { id: "sanaa", label: { ar: "صنعاء والمحافظات الوسطى", en: "Sana'a & Central Provinces" } },
  { id: "taiz", label: { ar: "تعز والحديدة", en: "Taiz & Al-Hudaydah" } },
  { id: "gcc", label: { ar: "دول مجلس التعاون الخليجي", en: "Gulf Cooperation Council (GCC)" } },
  { id: "other", label: { ar: "نطاق إقليمي / دولي آخر", en: "Other Regional / International Scope" } },
];
