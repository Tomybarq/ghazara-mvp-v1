import type { LocalizedString } from "./company";

export type AppRoute =
  | "/"
  | "/about"
  | "/services"
  | "/products"
  | "/projects"
  | "/blog"
  | "/contact"
  | "/request-quote"
  | "/hub"
  | "/404";

export interface NavItem {
  id: string;
  href: AppRoute;
  label: LocalizedString;
  breadcrumbLabel?: LocalizedString;
  description?: LocalizedString;
  isExternal?: boolean;
  showInHeader?: boolean;
  showInFooter?: boolean;
  isPrimaryCTA?: boolean;
}

export const navigationItems: NavItem[] = [
  {
    id: "home",
    href: "/",
    label: { ar: "الرئيسية", en: "Home" },
    breadcrumbLabel: { ar: "الرئيسية", en: "Home" },
    description: {
      ar: "البوابة المؤسسية الرسمية لمؤسسة غزارة للتجارة والتسويق",
      en: "Official Corporate Portal of Ghazara Trading & Marketing",
    },
    showInHeader: true,
    showInFooter: true,
  },
  {
    id: "about",
    href: "/about",
    label: { ar: "من نحن", en: "About Us" },
    breadcrumbLabel: { ar: "من نحن", en: "About Us" },
    description: {
      ar: "تعرف على رؤية ورسالة وقيم وإدارة مؤسسة غزارة",
      en: "Learn about Ghazara's vision, mission, values, and leadership",
    },
    showInHeader: true,
    showInFooter: true,
  },
  {
    id: "services",
    href: "/services",
    label: { ar: "الخدمات", en: "Services" },
    breadcrumbLabel: { ar: "خدماتنا", en: "Our Services" },
    description: {
      ar: "مصفوفة الخدمات التجارية والتسويقية والتقنية المتكاملة",
      en: "Integrated commercial, marketing, and technical services matrix",
    },
    showInHeader: true,
    showInFooter: true,
  },
  {
    id: "products",
    href: "/products",
    label: { ar: "المنتجات", en: "Products" },
    breadcrumbLabel: { ar: "المنتجات والمنصات", en: "Products & Platforms" },
    description: {
      ar: "المنصات والحلول والمنتجات الرقمية المؤسسية",
      en: "Enterprise platforms, solutions, and digital products",
    },
    showInHeader: true,
    showInFooter: true,
  },
  {
    id: "projects",
    href: "/projects",
    label: { ar: "المشاريع", en: "Projects" },
    breadcrumbLabel: { ar: "مشاريعنا", en: "Projects" },
    description: {
      ar: "سجل الأعمال والمشاريع المنفذة ودراسات الحالة",
      en: "Delivered projects portfolio and verified case studies",
    },
    showInHeader: true,
    showInFooter: true,
  },
  {
    id: "blog",
    href: "/blog",
    label: { ar: "الرؤى والمدونة", en: "Insights & Blog" },
    breadcrumbLabel: { ar: "المدونة والرؤى", en: "Insights & Blog" },
    description: {
      ar: "مقالات وتحليلات استراتيجية في التجارة والتكنولوجيا والتسويق",
      en: "Strategic articles and insights in trade, tech, and marketing",
    },
    showInHeader: true,
    showInFooter: true,
  },
  {
    id: "contact",
    href: "/contact",
    label: { ar: "تواصل معنا", en: "Contact Us" },
    breadcrumbLabel: { ar: "اتصل بنا", en: "Contact Us" },
    description: {
      ar: "قنوات التواصل المباشرة ومقر إدارة المؤسسة",
      en: "Direct communication channels and corporate headquarters",
    },
    showInHeader: true,
    showInFooter: true,
  },
  {
    id: "rfq",
    href: "/request-quote",
    label: { ar: "طلب عرض سعر", en: "Request Quote" },
    breadcrumbLabel: { ar: "طلب عرض سعر", en: "Request Quote" },
    description: {
      ar: "النموذج الرسمي لطلب عروض الأسعار والدراسات التجارية",
      en: "Official RFQ form for quotes and commercial assessments",
    },
    showInHeader: false, // Featured as primary CTA button in header
    showInFooter: true,
    isPrimaryCTA: true,
  },
  {
    id: "hub",
    href: "/hub",
    label: { ar: "بوابة الأعمال (Hub)", en: "Business Hub" },
    breadcrumbLabel: { ar: "بوابة الأعمال", en: "Business Hub" },
    description: {
      ar: "بوابة الوصول السريع للروابط والخدمات المباشرة",
      en: "Quick access portal for direct links and operations",
    },
    showInHeader: false,
    showInFooter: true,
  },
  {
    id: "notFound",
    href: "/404",
    label: { ar: "الصفحة غير موجودة", en: "Page Not Found" },
    breadcrumbLabel: { ar: "خطأ 404", en: "Error 404" },
    showInHeader: false,
    showInFooter: false,
  },
];

export const headerNavLinks = navigationItems.filter((item) => item.showInHeader);
export const footerNavLinks = navigationItems.filter((item) => item.showInFooter);

export function getRouteByPath(pathname: string): NavItem | undefined {
  // Exact match
  const found = navigationItems.find((item) => item.href === pathname);
  if (found) return found;

  // Normalized path match without trailing slash
  const normalized = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  return navigationItems.find((item) => item.href === normalized);
}
