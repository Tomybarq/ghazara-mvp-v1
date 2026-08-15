import SectorCard from "@/components/sectors/SectorCard";
import ServiceBento from "@/components/services/ServiceBento";
import { SECTORS, SERVICES, type Language } from "@/types";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft, Globe2, Menu, Moon, Send, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const content = {
  ar: {
    nav: ["الرئيسية", "قطاعاتنا", "حلولنا"],
    label: "غزارة — التجارة والتسويق في مسار واحد",
    title: "شريكك التجاري والتسويقي متعدد القطاعات في اليمن.",
    body: "نربط المنتجات والأسواق والقرارات التسويقية ضمن منظومة عملية واحدة؛ من التمثيل التجاري إلى بناء العلامات والمسارات الرقمية.",
    request: "طلب استشارة / خدمة",
    explore: "استكشف قطاعاتنا",
    sectorsLabel: "01 / قطاعات نخدمها",
    sectorsTitle: "أربعة مداخل. سوقٌ أكثر اتصالاً.",
    sectorsBody: "نبدأ من طبيعة قطاعك، ثم نبني قناة التمثيل أو الانتشار أو التسويق الأنسب له.",
    solutionsLabel: "02 / حلول أساسية",
    solutionsTitle: "حلول تقود الحركة، لا تضيف طبقة جديدة من التعقيد.",
    solutionsBody: "من نقطة البيع إلى الواجهة الرقمية، نُبقي كل خطوة مرتبطة بهدفها التجاري.",
    hubLabel: "03 / بوابتك السريعة",
    hubTitle: "اختر وجهتك. نبدأ من هناك.",
    hubBody: "دليل خدمات، طلب تمثيل، استشارة مباشرة، وتواصل مع الإدارة — كلها في بوابة واحدة.",
    hubCta: "فتح Bio-Hub",
    footer: "غزارة — حلول تجارية وتسويقية متكاملة من اليمن إلى الأسواق الأوسع.",
  },
  en: {
    nav: ["Home", "Sectors", "Solutions"],
    label: "Ghazara — trade and marketing on one route",
    title: "Your multi-sector trade and marketing partner in Yemen.",
    body: "We connect products, markets, and marketing decisions in one practical system — from commercial representation to brand systems and digital routes.",
    request: "Request a consultation / service",
    explore: "Explore our sectors",
    sectorsLabel: "01 / Sectors we serve",
    sectorsTitle: "Four gateways. A more connected market.",
    sectorsBody: "We begin with your sector, then build the representation, reach, or marketing route that fits it.",
    solutionsLabel: "02 / Core solutions",
    solutionsTitle: "Solutions that create movement, not another layer of complexity.",
    solutionsBody: "From the point of sale to the digital interface, every step remains linked to its commercial purpose.",
    hubLabel: "03 / Your quick gateway",
    hubTitle: "Choose a destination. We begin there.",
    hubBody: "Service directory, representation request, direct consultation, and management contact — in one gateway.",
    hubCta: "Open Bio-Hub",
    footer: "Ghazara — integrated commercial and marketing solutions from Yemen to wider markets.",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const t = content[language];
  const direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    document.title = language === "ar" ? "غزارة | التجارة والتسويق" : "Ghazara | Trading & Marketing";
  }, [direction, language]);

  const requestPath = "/hub?request=1";

  return (
    <div className="site-shell bg-background text-foreground" dir={direction}>
      <header className="absolute inset-x-0 top-0 z-30 text-white">
        <div className="content-wrap flex h-[82px] items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2.5" aria-label="Ghazara home"><img src="/manus-storage/ghazara-logo-mark_4f8f6011.png" alt="" className="h-10 w-10" /><span className="font-heading text-lg font-bold leading-none">غزارة<small className="mt-1 block text-[.53rem] font-body tracking-[.18em] text-white/55">GHAZARA</small></span></a>
          <nav className="hidden items-center gap-7 text-sm text-white/70 lg:flex"><a href="#home" className="hover:text-[#f19844]">{t.nav[0]}</a><a href="#sectors" className="hover:text-[#f19844]">{t.nav[1]}</a><a href="#solutions" className="hover:text-[#f19844]">{t.nav[2]}</a></nav>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setLanguage((current) => current === "ar" ? "en" : "ar")} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 px-3 text-xs font-bold hover:bg-white/10"><Globe2 size={15} />{language === "ar" ? "English" : "العربية"}</button>
            <button type="button" onClick={toggleTheme} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 hover:bg-white/10" aria-label="Toggle theme">{theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</button>
            <Link href={requestPath} className="route-button route-button-primary hidden h-10 px-4 text-xs sm:inline-flex">{t.request}<ArrowLeft size={15} className="rtl:rotate-180" /></Link>
            <button type="button" onClick={() => setMenuOpen((current) => !current)} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 lg:hidden" aria-label="Menu">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        {menuOpen && <div className="content-wrap lg:hidden"><nav className="mb-4 flex flex-col rounded-2xl border border-white/10 bg-[#242424]/95 p-2 text-sm shadow-2xl backdrop-blur"><a onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 hover:bg-white/10" href="#home">{t.nav[0]}</a><a onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 hover:bg-white/10" href="#sectors">{t.nav[1]}</a><a onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 hover:bg-white/10" href="#solutions">{t.nav[2]}</a><Link className="rounded-xl px-4 py-3 text-[#f19844] hover:bg-white/10" href={requestPath}>{t.request}</Link></nav></div>}
      </header>

      <main>
        <section id="home" className="relative isolate min-h-[790px] overflow-hidden bg-[#1a1a1a] pb-24 pt-36 text-white lg:min-h-[850px]">
          <div className="absolute inset-0 bg-cover bg-[position:72%_center] opacity-75 mix-blend-screen" style={{ backgroundImage: "url('/manus-storage/ghazara-hero-network_b53c6107.png')" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(138,78,145,.28),transparent_24%),linear-gradient(90deg,#1a1a1a_0%,rgba(26,26,26,.93)_37%,rgba(26,26,26,.43)_76%,#1a1a1a_100%)]" />
          <div className="content-wrap relative grid min-h-[620px] items-center lg:grid-cols-[1.15fr_.85fr]"><div className="max-w-4xl"><p className="eyebrow reveal">{t.label}</p><h1 className="reveal reveal-delay-1 mt-6 text-[clamp(3rem,6.2vw,6.6rem)] font-bold leading-[1.06] tracking-[-.055em]">{t.title}</h1><p className="reveal reveal-delay-2 mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">{t.body}</p><div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row"><Link href={requestPath} className="route-button route-button-primary h-14 px-6 text-sm">{t.request}<ArrowLeft size={18} className="rtl:rotate-180" /></Link><a href="#sectors" className="route-button route-button-outline h-14 px-6 text-sm">{t.explore}<Send size={17} /></a></div></div></div>
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[.62rem] tracking-[.2em] text-white/40 lg:flex"><span className="h-px w-12 bg-white/25" /> SCROLL TO CONNECT <span className="h-px w-12 bg-white/25" /></div>
        </section>

        <section id="sectors" className="noise-surface relative bg-[#171618] py-24 text-white sm:py-32"><div className="content-wrap"><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="eyebrow">{t.sectorsLabel}</p><h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-.04em] sm:text-5xl">{t.sectorsTitle}</h2></div><p className="max-w-xl text-base leading-8 text-white/62 sm:text-lg">{t.sectorsBody}</p></div><div className="mt-14 grid gap-4 sm:grid-cols-2">{SECTORS.map((sector) => <SectorCard key={sector.id} sector={sector} language={language} onRequest={() => window.location.assign(`/hub?request=1&sector=${sector.id}`)} />)}</div></div></section>

        <section id="solutions" className="noise-surface relative bg-background py-24 sm:py-32"><div className="content-wrap"><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div className="max-w-2xl"><p className="eyebrow">{t.solutionsLabel}</p><h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-.045em] sm:text-5xl">{t.solutionsTitle}</h2></div><p className="max-w-lg text-base leading-8 text-muted-foreground">{t.solutionsBody}</p></div><div className="mt-14 grid gap-4 md:auto-rows-[170px] md:grid-cols-3">{SERVICES.map((service) => <ServiceBento key={service.id} service={service} language={language} onRequest={() => window.location.assign(`/hub?request=1&service=${service.id}`)} />)}</div></div></section>

        <section className="relative overflow-hidden bg-[#1a1a1a] py-24 text-white sm:py-32"><div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_72%,rgba(94,59,149,.48),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(241,152,68,.18),transparent_23%)]" /><div className="content-wrap relative"><div className="rounded-[2rem] border border-white/10 bg-white/[.035] p-7 sm:p-12"><p className="eyebrow">{t.hubLabel}</p><div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-[-.045em] sm:text-6xl">{t.hubTitle}</h2><p className="mt-5 max-w-xl text-base leading-8 text-white/64">{t.hubBody}</p></div><div className="lg:text-left"><Link href="/hub" className="route-button route-button-primary h-14 px-6 text-sm">{t.hubCta}<ArrowLeft size={17} className="rtl:rotate-180" /></Link></div></div><div className="mt-12 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-5 text-xs tracking-wide text-white/46"><span>COMMERCIAL REPRESENTATION</span><span>•</span><span>DIGITAL GROWTH</span><span>•</span><span>MARKET CONNECTION</span></div></div></div></section>
      </main>

      <footer className="bg-[#111012] py-10 text-white/55"><div className="content-wrap flex flex-col justify-between gap-5 text-sm sm:flex-row sm:items-end"><div className="flex items-center gap-2"><img src="/manus-storage/ghazara-logo-mark_4f8f6011.png" alt="" className="h-8 w-8 opacity-80" /><p>{t.footer}</p></div><p className="text-xs">© {new Date().getFullYear()} Ghazara</p></div></footer>
    </div>
  );
}
