import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { siteContent } from "../data/siteContent";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ContactSection } from "../components/ContactSection";
import {
  TrendingUp,
  Megaphone,
  Network,
  ArrowUpRight,
  CheckCircle,
  Sparkles,
  Layers,
  Compass,
  Target,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const Home: React.FC = () => {
  const { lang, dir, isAr } = useLanguage();
  const content = siteContent[lang];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getServiceIcon = (iconType: string) => {
    switch (iconType) {
      case "trading":
        return <Network className="w-5 h-5 text-[#F97316]" />;
      case "marketing":
        return <Megaphone className="w-5 h-5 text-[#F97316]" />;
      case "growth":
      default:
        return <TrendingUp className="w-5 h-5 text-[#F97316]" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7ED] text-[#27272A] selection:bg-[#FDBA74] selection:text-[#27272A]">
      <Header />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION
            ========================================================================= */}
        <section id="hero" className="pt-10 pb-16 sm:pt-16 sm:pb-24">
          <div className="editorial-container">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#27272A]/8 text-xs font-semibold text-[#52525B] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
                <span>{content.hero.eyebrow}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#27272A] leading-[1.18] tracking-tight">
                {content.hero.headline}
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto leading-relaxed">
                {content.hero.supporting}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, "#contact")}
                  className="btn-primary w-full sm:w-auto text-sm sm:text-base py-3 px-7"
                >
                  <span>{content.hero.primaryCta}</span>
                  <ArrowUpRight className={`w-4 h-4 transition-transform ${dir === "rtl" ? "rotate-[-90deg]" : ""}`} />
                </a>

                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, "#services")}
                  className="btn-secondary w-full sm:w-auto text-sm sm:text-base py-3 px-6"
                >
                  <span>{content.hero.secondaryCta}</span>
                </a>
              </div>
            </div>

            {/* Bespoke Abstract Growth & Commerce Graphic (Nocturnal Tech references derived from logo) */}
            <div className="mt-12 sm:mt-16 bg-white border border-[#27272A]/8 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#FDBA74]/15 via-transparent to-transparent opacity-70 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left/Start Graphic Narrative */}
                <div className="space-y-3 max-w-md text-center md:text-start">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F97316] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{content.hero.badge}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#27272A]">
                    {isAr
                      ? "منظومة متكاملة لربط العرض بالطلب وتحفيز النمو التجاري"
                      : "An Integrated Engine Connecting Supply, Demand & Market Expansion"}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
                    {isAr
                      ? "نجمع بين كفاءة التوريد التجاري والتسويق الموجه بالبيانات لفتح مسارات بيع مستدامة لعلامتك التجارية."
                      : "Unifying commercial trade execution with data-driven demand generation to construct predictable sales pipelines."}
                  </p>
                </div>

                {/* Right/End Abstract SVG Network Nodes */}
                <div className="w-full md:w-auto flex items-center justify-center">
                  <svg
                    viewBox="0 0 320 180"
                    className="w-full max-w-[280px] sm:max-w-[320px] h-auto drop-shadow-sm"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background Grid Lines */}
                    <path d="M20 90 H300" stroke="#FDBA74" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                    <path d="M160 20 V160" stroke="#FDBA74" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                    
                    {/* Growth Wave Curve */}
                    <path
                      d="M30 140 C 90 140, 110 90, 160 80 C 210 70, 240 35, 290 30"
                      stroke="url(#growthGradient)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Nodes with Glow */}
                    <circle cx="30" cy="140" r="6" fill="#5E3B95" />
                    <circle cx="160" cy="80" r="7" fill="#F97316" className="pulse-node" />
                    <circle cx="290" cy="30" r="8" fill="#F97316" />
                    <circle cx="290" cy="30" r="14" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.4" />

                    {/* Node Labels */}
                    <text x="30" y="165" textAnchor="middle" fontSize="9" fill="#71717A" fontFamily="sans-serif">
                      {isAr ? "السوق" : "Market"}
                    </text>
                    <text x="160" y="105" textAnchor="middle" fontSize="9" fill="#71717A" fontFamily="sans-serif">
                      {isAr ? "الفرصة" : "Opportunity"}
                    </text>
                    <text x="290" y="58" textAnchor="middle" fontSize="9" fill="#F97316" fontWeight="bold" fontFamily="sans-serif">
                      {isAr ? "النمو" : "Growth"}
                    </text>

                    <defs>
                      <linearGradient id="growthGradient" x1="30" y1="140" x2="290" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#5E3B95" />
                        <stop offset="0.55" stopColor="#F97316" />
                        <stop offset="1" stopColor="#FDBA74" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. TRUST BAR
            ========================================================================= */}
        <section className="py-8 border-y border-[#27272A]/6 bg-white/60">
          <div className="editorial-container">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
              <span className="text-xs font-bold text-[#27272A] tracking-tight">
                {content.trustBar.statement}
              </span>
              <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-[#52525B]">
                {content.trustBar.pillars.map((pillar, idx) => (
                  <span key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
                    <span>{pillar}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. SERVICES SECTION (3 Cards)
            ========================================================================= */}
        <section id="services" className="py-16 sm:py-24">
          <div className="editorial-container">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                {content.services.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#27272A] tracking-tight">
                {content.services.title}
              </h2>
              <p className="text-sm sm:text-base text-[#52525B]">
                {content.services.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.services.items.map((service) => (
                <div
                  key={service.id}
                  className="premium-card p-6 sm:p-7 flex flex-col justify-between group hover:border-[#F97316]/40"
                >
                  <div className="space-y-4">
                    {/* Top Row: Number & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2 py-1 rounded-md bg-[#FFF7ED] text-[#F97316] border border-[#F97316]/15">
                        {service.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] border border-[#27272A]/6 flex items-center justify-center group-hover:bg-[#F97316]/10 transition-colors">
                        {getServiceIcon(service.icon)}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#27272A] group-hover:text-[#F97316] transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Tag & Direct Action */}
                  <div className="pt-6 mt-6 border-t border-[#27272A]/6 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#71717A]">
                      {service.tag}
                    </span>
                    <a
                      href="#contact"
                      onClick={(e) => handleScrollTo(e, "#contact")}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#F97316] group-hover:translate-x-0.5 transition-transform"
                      aria-label={`Request ${service.title}`}
                    >
                      <span>{isAr ? "طلب الخدمة" : "Inquire"}</span>
                      <ArrowUpRight className={`w-3.5 h-3.5 ${dir === "rtl" ? "rotate-[-90deg]" : ""}`} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. DEEPER FEATURE SECTION (From Opportunity to Growth)
            ========================================================================= */}
        <section id="about" className="py-16 sm:py-20 bg-white border-y border-[#27272A]/8">
          <div className="editorial-container">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
              <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                {content.deeperFeature.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#27272A] tracking-tight">
                {content.deeperFeature.title}
              </h2>
              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
                {content.deeperFeature.body}
              </p>
            </div>

            {/* 4 Connected Growth Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {content.deeperFeature.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FFF7ED]/70 border border-[#27272A]/8 hover:border-[#F97316]/30 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#F97316]">
                      {pillar.step}
                    </span>
                    <Layers className="w-4 h-4 text-[#71717A]/60" />
                  </div>
                  <h4 className="text-sm font-bold text-[#27272A]">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#71717A] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. GHAZARA APPROACH / PROCESS (4 Steps)
            ========================================================================= */}
        <section className="py-16 sm:py-24">
          <div className="editorial-container">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                {content.process.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#27272A] tracking-tight">
                {content.process.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {content.process.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#27272A]/8 rounded-2xl p-6 shadow-xs relative flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-mono font-black text-[#F97316]/30">
                        {step.number}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#71717A] px-2 py-0.5 rounded-full bg-[#FFF7ED]">
                        {step.subtitle}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#27272A]">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#52525B] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#27272A]/6 flex items-center gap-1.5 text-[11px] font-semibold text-[#F97316]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{isAr ? "مرحلة معتمدة" : "Verified Stage"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. DIFFERENTIATION / WHY GHAZARA
            ========================================================================= */}
        <section id="why-ghazara" className="py-16 sm:py-24 bg-white border-y border-[#27272A]/8">
          <div className="editorial-container">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                {content.whyGhazara.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#27272A] tracking-tight">
                {content.whyGhazara.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {content.whyGhazara.principles.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-[#FFF7ED]/50 border border-[#27272A]/8 hover:bg-[#FFF7ED] transition-colors space-y-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#27272A]/8 flex items-center justify-center shadow-2xs">
                      {idx === 0 && <Compass className="w-4 h-4 text-[#F97316]" />}
                      {idx === 1 && <Zap className="w-4 h-4 text-[#F97316]" />}
                      {idx === 2 && <BarChart3 className="w-4 h-4 text-[#F97316]" />}
                      {idx === 3 && <ShieldCheck className="w-4 h-4 text-[#F97316]" />}
                    </div>
                    <h3 className="text-base font-bold text-[#27272A]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. STAT / TESTIMONIAL CALLOUT
            ========================================================================= */}
        <section className="py-16 sm:py-20">
          <div className="editorial-container">
            <div className="bg-[#27272A] text-white rounded-2xl sm:rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center space-y-4">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5E3B95]/20 rounded-full blur-3xl pointer-events-none"></div>

              <span className="inline-block text-[11px] font-bold text-[#FDBA74] uppercase tracking-widest px-3 py-1 rounded-full bg-white/10">
                {content.callout.tag}
              </span>

              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold max-w-2xl mx-auto leading-relaxed text-white">
                "{content.callout.quote}"
              </blockquote>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. FINAL CTA
            ========================================================================= */}
        <section className="py-12">
          <div className="editorial-container">
            <div className="bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] border border-[#F97316]/30 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-md">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#27272A] tracking-tight max-w-xl mx-auto">
                {content.finalCta.title}
              </h2>
              <p className="text-sm sm:text-base text-[#52525B] max-w-md mx-auto">
                {content.finalCta.supporting}
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, "#contact")}
                  className="btn-primary text-base py-3.5 px-8 shadow-lg inline-flex items-center gap-2"
                >
                  <span>{content.finalCta.cta}</span>
                  <ArrowUpRight className={`w-4 h-4 ${dir === "rtl" ? "rotate-[-90deg]" : ""}`} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. CONTACT EXPERIENCE
            ========================================================================= */}
        <ContactSection />
      </main>

      {/* =========================================================================
          10. FOOTER
          ========================================================================= */}
      <Footer />
    </div>
  );
};

export default Home;
