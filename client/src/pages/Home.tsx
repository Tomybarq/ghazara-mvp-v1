/**
 * Ghazara design reminder: "Growth Axis" treats commerce as an interconnected route.
 * The Arabic-first hero anchors a directional, asymmetrical experience with amber action paths.
 */
import { useTheme } from "@/contexts/ThemeContext";
import {
  ArrowLeft,
  ArrowUpLeft,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  Compass,
  Globe2,
  Landmark,
  Menu,
  MessageCircle,
  Moon,
  Network,
  Send,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type Language = "ar" | "en";

type Copy = {
  nav: { home: string; services: string; solutions: string; contact: string };
  hero: { label: string; title: string; emphasis: string; body: string; explore: string; direct: string; marker: string };
  values: { label: string; title: string; body: string; cards: Array<{ number: string; title: string; body: string }> };
  hub: { label: string; title: string; body: string; open: string; cards: Array<{ title: string; note: string }> };
  contact: { label: string; title: string; body: string; action: string; place: string };
  footer: { line: string; rights: string; privacy: string; terms: string; social: string };
  language: string;
  theme: string;
  menu: string;
};

const copy: Record<Language, Copy> = {
  ar: {
    nav: { home: "الرئيسية", services: "خدماتنا", solutions: "حلول التسويق", contact: "تواصل معنا" },
    hero: {
      label: "غزارة — محور الأعمال والفرص",
      title: "مؤسسة غزارة للتجارة والتسويق",
      emphasis: "حلّ تسويقي متكامل لعملك.",
      body: "نصنع المسارات التي تنقل الأعمال من الفكرة إلى الانتشار؛ عبر حلول تجارية وتسويقية مترابطة تنطلق من اليمن نحو فرص أوسع.",
      explore: "استكشف خدماتنا",
      direct: "تواصل مباشرة",
      marker: "من اليمن إلى سوقٍ أكثر اتصالاً",
    },
    values: {
      label: "01 / ما نصنعه",
      title: "ثلاثة مسارات، وجهة نمو واحدة.",
      body: "نحوّل الاتصال إلى بنية عملية تمنح علامتك حضوراً أوضح وحركة تجارية قابلة للقياس.",
      cards: [
        { number: "01", title: "التجارة والتمثيل التجاري", body: "نوسع مسار أعمالك من خلال حلول تجارية مدروسة وشراكات تمثيلية ذات أثر." },
        { number: "02", title: "الحلول التسويقية الرقمية", body: "نربط الاستراتيجية بالمحتوى والقنوات الرقمية لتتحول الرسالة إلى نمو فعلي." },
        { number: "03", title: "الربط والانتشار الإقليمي", body: "نبني صلات أوسع بين الأعمال والأسواق والفرص في بيئة إقليمية متحركة." },
      ],
    },
    hub: {
      label: "02 / بوابة غزارة",
      title: "اختر وجهتك. ابدأ مسارك.",
      body: "مداخل سريعة نحو منظومة غزارة التجارية. كل وجهة تفتح نقطة اتصال جديدة لأعمالك.",
      open: "فتح المسار",
      cards: [
        { title: "دليل الأعمال والخدمات", note: "Services Hub" },
        { title: "المعرض التجاري", note: "Commercial Gallery" },
        { title: "مجتمع الأعمال", note: "Community & B2B" },
        { title: "التواصل السريع", note: "Direct WhatsApp / Bio" },
      ],
    },
    contact: { label: "03 / نقطة البداية", title: "لنجعل فرصتك التالية أقرب.", body: "ابدأ محادثة مع غزارة وحدد المسار التجاري أو التسويقي الذي تحتاجه الآن.", action: "ابدأ المحادثة", place: "اليمن" },
    footer: { line: "تجارة. تسويق. اتصالٌ ينمو.", rights: "جميع الحقوق محفوظة لمؤسسة غزارة للتجارة والتسويق.", privacy: "الخصوصية", terms: "الشروط", social: "قنواتنا" },
    language: "English",
    theme: "تبديل المظهر",
    menu: "القائمة",
  },
  en: {
    nav: { home: "Home", services: "Services", solutions: "Marketing Solutions", contact: "Contact" },
    hero: {
      label: "Ghazara — Business & Opportunity Axis",
      title: "Ghazara Trading & Marketing",
      emphasis: "A complete marketing solution for your business.",
      body: "We build the paths that take businesses from intent to reach through connected trade and marketing solutions, starting in Yemen and opening into wider opportunity.",
      explore: "Explore our services",
      direct: "Contact directly",
      marker: "From Yemen to a more connected market",
    },
    values: {
      label: "01 / What we build",
      title: "Three paths. One growth destination.",
      body: "We turn connection into a practical structure that gives your brand clearer presence and measurable commercial movement.",
      cards: [
        { number: "01", title: "Trade & Commercial Representation", body: "We expand your business route through considered trade solutions and meaningful representation partnerships." },
        { number: "02", title: "Digital Marketing Solutions", body: "We connect strategy, content, and digital channels so your message becomes tangible growth." },
        { number: "03", title: "Regional Connectivity & Reach", body: "We build wider links among businesses, markets, and opportunities in a fast-moving regional landscape." },
      ],
    },
    hub: {
      label: "02 / Ghazara gateway",
      title: "Choose a destination. Open a route.",
      body: "Quick entrances to Ghazara's commercial ecosystem. Each destination opens a new connection point for your business.",
      open: "Open route",
      cards: [
        { title: "Business & Services Directory", note: "Services Hub" },
        { title: "Commercial Gallery", note: "Commercial Gallery" },
        { title: "Business Community", note: "Community & B2B" },
        { title: "Quick Contact", note: "Direct WhatsApp / Bio" },
      ],
    },
    contact: { label: "03 / Starting point", title: "Let’s bring your next opportunity closer.", body: "Start a conversation with Ghazara and define the commercial or marketing route your business needs now.", action: "Start a conversation", place: "Yemen" },
    footer: { line: "Trade. Marketing. Connection that grows.", rights: "All rights reserved to Ghazara Trading & Marketing.", privacy: "Privacy", terms: "Terms", social: "Our channels" },
    language: "العربية",
    theme: "Toggle appearance",
    menu: "Menu",
  },
};

const valueIcons = [BriefcaseBusiness, ChartNoAxesCombined, Network];
const hubIcons = [Compass, Landmark, Building2, MessageCircle];

export default function Home() {
  const [language, setLanguage] = useState<Language>("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const t = copy[language];
  const direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.title = language === "ar" ? "غزارة | التجارة والتسويق" : "Ghazara | Trading & Marketing";
  }, [direction, language]);

  const selectLanguage = () => setLanguage((current) => (current === "ar" ? "en" : "ar"));
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell bg-background text-foreground" dir={direction}>
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="content-wrap flex h-[86px] items-center justify-between gap-3">
          <a href="#home" className="flex items-center gap-3 text-white" aria-label="Ghazara home">
            <img src="/manus-storage/ghazara-logo-mark_4f8f6011.png" alt="" className="h-11 w-11 object-contain" />
            <span className="leading-[.9] font-heading font-bold tracking-tight">
              <span className="block text-[1.15rem]">غزارة</span>
              <span className="block text-[.62rem] font-body font-medium tracking-[.17em] uppercase opacity-70">GHAZARA</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-white/75 lg:flex" aria-label={t.menu}>
            <a href="#home" className="transition-colors hover:text-[#f19844]">{t.nav.home}</a>
            <a href="#services" className="transition-colors hover:text-[#f19844]">{t.nav.services}</a>
            <a href="#hub" className="transition-colors hover:text-[#f19844]">{t.nav.solutions}</a>
          </nav>

          <div className="flex items-center gap-2">
            <button type="button" onClick={selectLanguage} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 px-3 text-xs font-heading font-bold text-white transition hover:border-white/60 hover:bg-white/10" aria-label={t.language}>
              <Globe2 size={15} /> <span>{t.language}</span>
            </button>
            <button type="button" onClick={toggleTheme} className="inline-grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:border-white/60 hover:bg-white/10" aria-label={t.theme}>
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a href="#contact" className="route-button route-button-primary hidden h-10 px-4 text-xs sm:inline-flex">{t.nav.contact}<ArrowLeft size={15} className="rtl:rotate-180" /></a>
            <button type="button" onClick={() => setMenuOpen((open) => !open)} className="inline-grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white lg:hidden" aria-label={t.menu} aria-expanded={menuOpen}>
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="content-wrap lg:hidden">
            <nav className="mb-4 flex flex-col rounded-2xl border border-white/15 bg-[#211b29]/95 p-3 text-sm text-white shadow-2xl backdrop-blur-xl" aria-label={t.menu}>
              <a onClick={closeMenu} href="#home" className="rounded-xl px-4 py-3 hover:bg-white/10">{t.nav.home}</a>
              <a onClick={closeMenu} href="#services" className="rounded-xl px-4 py-3 hover:bg-white/10">{t.nav.services}</a>
              <a onClick={closeMenu} href="#hub" className="rounded-xl px-4 py-3 hover:bg-white/10">{t.nav.solutions}</a>
              <a onClick={closeMenu} href="#contact" className="rounded-xl px-4 py-3 text-[#f19844] hover:bg-white/10">{t.nav.contact}</a>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="noise-surface relative isolate min-h-[780px] overflow-hidden bg-[#1a1a1a] pb-24 pt-[150px] text-white lg:min-h-[850px]">
          <div className="absolute inset-0 bg-cover bg-[position:68%_center] opacity-[.78] mix-blend-screen" style={{ backgroundImage: "url('/manus-storage/ghazara-hero-network_b53c6107.png')" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_40%,rgba(138,78,145,.20),transparent_31%),linear-gradient(90deg,#1a1a1a_0%,rgba(26,26,26,.92)_39%,rgba(26,26,26,.30)_78%,#1a1a1a_100%)]" />
          <svg className="pointer-events-none absolute bottom-0 right-0 h-[75%] w-[72%] opacity-45" viewBox="0 0 800 640" fill="none" aria-hidden="true">
            <path className="grid-path" d="M760 38C620 120 705 207 514 250C343 288 415 420 180 520C97 555 86 606 16 640" stroke="#F19844" strokeWidth="1.15" />
            <path d="M800 161C636 188 623 314 431 334C284 349 261 458 91 473" stroke="#8A4E91" strokeWidth=".8" opacity=".75" />
            <circle cx="514" cy="250" r="5" fill="#F19844" />
            <circle cx="180" cy="520" r="5" fill="#F19844" />
            <circle cx="431" cy="334" r="4" fill="#8A4E91" />
          </svg>
          <div className="content-wrap relative grid min-h-[600px] items-center lg:grid-cols-[1.1fr_.9fr]">
            <div className="max-w-3xl">
              <p className="eyebrow reveal">{t.hero.label}</p>
              <h1 className="reveal reveal-delay-1 mt-6 text-[clamp(2.9rem,7vw,6.8rem)] font-bold leading-[1.08] tracking-[-.045em]">
                <span className="block">{t.hero.title}</span>
                <span className="mt-2 block bg-gradient-to-l from-[#fff1df] via-[#f8bd76] to-[#f19844] bg-clip-text text-transparent">{t.hero.emphasis}</span>
              </h1>
              <p className="reveal reveal-delay-2 mt-7 max-w-xl text-base leading-8 text-white/72 sm:text-lg">{t.hero.body}</p>
              <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#services" className="route-button route-button-primary h-14 px-6 text-sm">{t.hero.explore}<ArrowLeft size={18} className="rtl:rotate-180" /></a>
                <a href="#contact" className="route-button route-button-outline h-14 px-6 text-sm">{t.hero.direct}<Send size={17} /></a>
              </div>
            </div>
            <div className="relative hidden h-full lg:block">
              <div className="absolute bottom-[17%] left-[20%] flex items-center gap-3 text-sm font-medium text-white/75" dir="rtl">
                <span className="inline-grid h-9 w-9 place-items-center rounded-full border border-[#f19844]/40 bg-[#f19844]/10 text-[#f19844]"><Sparkles size={15} /></span>
                <span>{t.hero.marker}</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[.64rem] font-heading tracking-[.18em] text-white/45 lg:flex"><span className="h-px w-12 bg-white/30" /> SCROLL TO CONNECT <span className="h-px w-12 bg-white/30" /></div>
        </section>

        <section id="services" className="noise-surface relative overflow-hidden bg-background py-24 sm:py-32">
          <div className="content-wrap">
            <span className="waypoint-number left-[8%] top-14">01</span>
            <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-end">
              <div>
                <p className="eyebrow">{t.values.label}</p>
                <h2 className="mt-5 max-w-md text-4xl font-bold leading-tight tracking-[-.04em] sm:text-5xl">{t.values.title}</h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">{t.values.body}</p>
            </div>
            <div className="relative mt-16 grid gap-4 md:grid-cols-3">
              <svg className="pointer-events-none absolute -top-12 right-[7%] hidden h-24 w-[72%] md:block" viewBox="0 0 900 120" fill="none" aria-hidden="true">
                <path d="M22 95H330C408 95 420 29 500 29H860" stroke="#F19844" strokeWidth="1" strokeDasharray="7 10" opacity=".55" />
                <circle cx="330" cy="95" r="4" fill="#F19844" /><circle cx="500" cy="29" r="4" fill="#F19844" /><circle cx="860" cy="29" r="4" fill="#F19844" />
              </svg>
              {t.values.cards.map((card, index) => {
                const Icon = valueIcons[index];
                return (
                  <article key={card.number} className={`access-module group relative min-h-[310px] overflow-hidden rounded-[1.15rem] border border-border bg-card p-7 transition duration-300 hover:-translate-y-1 hover:border-[#f19844]/50 hover:shadow-[0_24px_50px_rgba(94,59,149,.12)] ${index === 1 ? "md:translate-y-10" : ""}`}>
                    <span className="absolute bottom-0 right-0 h-[42%] w-px bg-gradient-to-b from-transparent via-[#f19844] to-[#f19844]/10" />
                    <span className="absolute bottom-[42%] right-[-3px] h-1.5 w-1.5 rounded-full bg-[#f19844]" />
                    <span className="absolute -left-3 -top-7 select-none font-heading text-[8rem] font-bold leading-none text-[94,59,149] opacity-[.045]">{card.number}</span>
                    <div className="relative flex h-full flex-col">
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-xs font-bold tracking-[.18em] text-[#f19844]">{card.number}</span>
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#5e3b95]/10 text-[#5e3b95] dark:bg-[#f19844]/10 dark:text-[#f19844]"><Icon size={20} /></span>
                      </div>
                      <div className="mt-auto">
                        <h3 className="font-heading text-xl font-bold leading-snug">{card.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.body}</p>
                        <div className="mt-6 h-px w-10 bg-[#f19844] transition-all duration-300 group-hover:w-20" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="hub" className="relative isolate overflow-hidden bg-[#242424] py-24 text-white sm:py-32">
          <div className="absolute inset-0 bg-cover bg-[position:72%_center] opacity-40" style={{ backgroundImage: "url('/manus-storage/ghazara-digital-hub_05b59eeb.png')" }} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#242424_8%,rgba(36,36,36,.94)_41%,rgba(36,36,36,.58)_100%)]" />
          <div className="content-wrap relative">
            <span className="waypoint-number left-[7%] top-1 text-[#f19844]/[.12]">02</span>
            <svg className="pointer-events-none absolute bottom-[-3rem] left-[20%] h-[90%] w-[65%] opacity-50" viewBox="0 0 760 510" fill="none" aria-hidden="true">
              <path className="grid-path" d="M25 42C127 42 109 179 229 179H460C567 179 517 380 725 380" stroke="#F19844" strokeWidth="1" />
              <circle cx="229" cy="179" r="4" fill="#F19844" /><circle cx="460" cy="179" r="4" fill="#F19844" /><circle cx="725" cy="380" r="4" fill="#F19844" />
            </svg>
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <div className="lg:pt-5">
                <p className="eyebrow">{t.hub.label}</p>
                <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-.04em] sm:text-5xl">{t.hub.title}</h2>
                <p className="mt-6 max-w-md leading-8 text-white/68">{t.hub.body}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {t.hub.cards.map((card, index) => {
                  const Icon = hubIcons[index];
                  return (
                    <a key={card.title} href="#contact" className={`access-module group relative min-h-[180px] overflow-hidden rounded-[1.05rem] border border-white/13 bg-white/[.065] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#f19844]/70 hover:bg-white/[.10] ${index === 0 ? "sm:translate-y-7" : ""} ${index === 3 ? "sm:translate-y-7" : ""}`}>
                      <span className="absolute bottom-0 left-0 h-px w-[55%] bg-gradient-to-l from-[#f19844] to-transparent opacity-70" />
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f19844] text-[#241a16] shadow-[0_8px_24px_rgba(241,152,68,.25)]"><Icon size={18} /></span>
                      <div className="mt-7 flex items-end justify-between gap-3">
                        <div>
                          <p className="font-heading text-lg font-bold leading-snug">{card.title}</p>
                          <p dir="ltr" className="mt-1 text-[.67rem] tracking-[.11em] text-white/45">{card.note}</p>
                        </div>
                        <ArrowUpLeft size={18} className="mb-1 shrink-0 text-[#f19844] transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1 rtl:rotate-90" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="noise-surface relative bg-background py-24 sm:py-32">
          <div className="content-wrap">
            <div className="relative overflow-hidden rounded-[1.4rem] border border-[#f19844]/30 bg-[#2a1e36] px-7 py-12 text-white shadow-[0_30px_80px_rgba(94,59,149,.24)] sm:px-12 sm:py-16">
              <div className="absolute inset-y-0 left-0 hidden w-[46%] bg-cover bg-center opacity-30 mix-blend-screen md:block" style={{ backgroundImage: "url('/manus-storage/ghazara-commerce-geometry_6001ac51.png')" }} />
              <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-70" viewBox="0 0 1200 450" fill="none" aria-hidden="true">
                <path className="grid-path" d="M-40 365H270C410 365 388 230 530 230H810C933 230 958 90 1240 90" stroke="#F19844" strokeWidth="1.2" />
                <circle cx="270" cy="365" r="5" fill="#F19844" /><circle cx="530" cy="230" r="5" fill="#F19844" /><circle cx="810" cy="230" r="5" fill="#F19844" />
              </svg>
              <span className="waypoint-number bottom-9 right-12 text-[#f19844]/[.15]">03</span>
              <div className="relative max-w-2xl">
                <p className="eyebrow text-[#f7d3ac]">{t.contact.label}</p>
                <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-.04em] sm:text-5xl">{t.contact.title}</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/75 sm:text-lg">{t.contact.body}</p>
                <a href="mailto:contact@ghazara.net" className="route-button route-button-primary mt-9 h-14 px-6 text-sm">{t.contact.action}<ArrowLeft size={18} className="rtl:rotate-180" /></a>
              </div>
              <div className="relative mt-12 flex items-center gap-2 text-sm text-white/60"><Globe2 size={16} className="text-[#f19844]" /><span>{t.contact.place}</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#17151a] py-10 text-white/60">
        <div className="content-wrap">
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
            <div className="flex items-center gap-3 text-white">
              <img src="/manus-storage/ghazara-logo-mark_4f8f6011.png" alt="" className="h-11 w-11 object-contain" />
              <p className="font-heading text-lg font-bold">{t.footer.line}</p>
            </div>
            <div className="flex items-center gap-4 text-xs"><span>{t.footer.social}</span><span className="h-px w-8 bg-[#f19844]" /><a href="#contact" className="transition-colors hover:text-[#f19844]">LinkedIn</a><a href="#contact" className="transition-colors hover:text-[#f19844]">Instagram</a></div>
          </div>
          <div className="flex flex-col gap-4 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>{t.footer.rights}</p>
            <div className="flex gap-4"><a href="#contact" className="hover:text-white">{t.footer.privacy}</a><a href="#contact" className="hover:text-white">{t.footer.terms}</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
