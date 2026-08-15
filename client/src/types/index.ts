export type Language = "ar" | "en";

export type LocalizedText = {
  ar: string;
  en: string;
};

export type SectorId = "agriculture" | "consumer" | "industrial" | "business";

export type ServiceId = "representation" | "digital" | "identity" | "research";

export type YemenRegionId = "aden" | "sanaa" | "taiz" | "hadramout" | "hodeidah" | "ibb" | "other";

export interface Sector {
  id: SectorId;
  number: string;
  title: LocalizedText;
  description: LocalizedText;
  accent: "amber" | "iris" | "amethyst" | "slate";
}

export interface Service {
  id: ServiceId;
  number: string;
  title: LocalizedText;
  description: LocalizedText;
  size: "wide" | "tall" | "standard";
}

export interface YemenRegion {
  id: YemenRegionId;
  label: LocalizedText;
}

export interface RFQDraft {
  sectorId: SectorId | null;
  serviceId: ServiceId | null;
  regionId: YemenRegionId | null;
  clientName: string;
  companyName: string;
  notes: string;
}

export const WA_PHONE = "967784984528";

export const SECTORS: readonly Sector[] = [
  {
    id: "agriculture",
    number: "01",
    title: { ar: "القطاع الزراعي والغذائي", en: "Agriculture & Food" },
    description: { ar: "توزيع المنتجات الزراعية والغذائية وفتح قنوات وصول أكثر اتساعاً.", en: "Distribution routes for agricultural and food products with wider market access." },
    accent: "amber",
  },
  {
    id: "consumer",
    number: "02",
    title: { ar: "السلع الاستهلاكية والتجزئة", en: "FMCG & Retail" },
    description: { ar: "تسويق منتجات المستهلك وبناء حضور مقنع عند نقاط البيع.", en: "Consumer-product marketing and a persuasive presence at points of sale." },
    accent: "iris",
  },
  {
    id: "industrial",
    number: "03",
    title: { ar: "الصناعة والتوريدات", en: "Industry & Supply" },
    description: { ar: "تمثيل تجاري مدروس يدعم الموردين والفرص الصناعية المتخصصة.", en: "Considered representation for suppliers and specialist industrial opportunities." },
    accent: "amethyst",
  },
  {
    id: "business",
    number: "04",
    title: { ar: "الخدمات والشركات B2B", en: "Business Services & B2B" },
    description: { ar: "تسويق رقمي وعلامات تجارية ومسارات نمو قابلة للتنفيذ.", en: "Digital marketing, brand systems, and practical routes for business growth." },
    accent: "slate",
  },
] as const;

export const SERVICES: readonly Service[] = [
  {
    id: "representation",
    number: "01",
    title: { ar: "التمثيل التجاري وقنوات البيع", en: "Commercial Representation & Sales Channels" },
    description: { ar: "نرسم مساراً واضحاً بين العرض والسوق وشركاء التوزيع.", en: "A clear route among offer, market, and distribution partners." },
    size: "wide",
  },
  {
    id: "digital",
    number: "02",
    title: { ar: "التسويق الرقمي وإدارة الحملات", en: "Digital Marketing & Campaigns" },
    description: { ar: "تخطيط وتنفيذ وتحسين قائم على الأهداف التجارية.", en: "Planning, execution, and optimisation led by commercial objectives." },
    size: "tall",
  },
  {
    id: "identity",
    number: "03",
    title: { ar: "الهويات والحلول التفاعلية", en: "Brand Identities & Interactive Portals" },
    description: { ar: "هوية متماسكة وبوابات رقمية تنظم نقاط اتصال علامتك.", en: "A cohesive identity and digital portals that organise your brand touchpoints." },
    size: "standard",
  },
  {
    id: "research",
    number: "04",
    title: { ar: "الربط الإقليمي والدراسات الميدانية", en: "Regional Reach & Field Research" },
    description: { ar: "قراءة للسوق تساعدك على اتخاذ خطوة مدروسة إلى الأمام.", en: "Market insight that supports a considered next move." },
    size: "standard",
  },
] as const;

export const YEMEN_REGIONS: readonly YemenRegion[] = [
  { id: "aden", label: { ar: "عدن", en: "Aden" } },
  { id: "sanaa", label: { ar: "صنعاء", en: "Sana'a" } },
  { id: "taiz", label: { ar: "تعز", en: "Taiz" } },
  { id: "hadramout", label: { ar: "حضرموت", en: "Hadramout" } },
  { id: "hodeidah", label: { ar: "الحديدة", en: "Al Hudaydah" } },
  { id: "ibb", label: { ar: "إب", en: "Ibb" } },
  { id: "other", label: { ar: "مدينة أو منطقة أخرى", en: "Another city or region" } },
] as const;
