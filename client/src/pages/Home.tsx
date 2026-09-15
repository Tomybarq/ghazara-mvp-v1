import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Logo } from "@/components/ui/Logo";
import SEOHead from "@/components/seo/SEOHead";
import { servicesData } from "@/data/services";
import { productsData } from "@/data/products";
import { contactData } from "@/data/contact";
import {
  ArrowRight,
  Briefcase,
  TrendingUp,
  Code,
  LineChart,
  ShieldCheck,
  Search,
  Compass,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Layers,
  Sparkles,
  ArrowUpRight,
  PhoneCall,
  Clock,
  Building2,
  Zap,
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { lang, isAr } = useLanguage();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase":
        return <Briefcase className="w-6 h-6" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6" />;
      case "Code":
        return <Code className="w-6 h-6" />;
      case "LineChart":
        return <LineChart className="w-6 h-6" />;
      default:
        return <Briefcase className="w-6 h-6" />;
    }
  };

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead pageKey="home" />
      <Header />

      <main className="flex-1">
        {/* 1. Hero Section: Direct Positioning, Verified Authority & High-Conversion Operations Hub */}
        <section
          id="hero"
          className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-card via-card/80 to-background overflow-hidden border-b border-border"
        >
          {/* Subtle Ambient Background Accents */}
          <div className="absolute -top-24 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="content-wrap grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Clear Value Proposition & Dual CTAs */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>
                  {isAr
                    ? "مؤسسة غزارة للتجارة والتسويق — شريكك المؤسسي المعتمد"
                    : "Ghazara Trading & Marketing — Verified Enterprise Partner"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold font-heading tracking-tight leading-[1.16]">
                {isAr ? (
                  <>
                    حلول تجارية وتسويقية تساعد الأعمال على{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-700 to-amber-500 dark:from-purple-400 dark:to-amber-400">
                      النمو والتوسع بوضوح
                    </span>
                  </>
                ) : (
                  <>
                    Commercial & marketing solutions that help businesses{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-amber-500 dark:from-purple-400 dark:to-amber-400">
                      grow with clarity
                    </span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {isAr
                  ? "شريكك المؤسسي في إدارة التمثيل التجاري، تيسير سلاسل التوريد، التسويق الرقمي القائم على الأداء، وبناء المنصات التقنية الموثوقة في اليمن والمنطقة."
                  : "Your strategic corporate partner in commercial representation, supply chain facilitation, performance digital marketing, and robust tech platforms in Yemen and the region."}
              </p>

              {/* Conversion Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/request-quote"
                  className="route-button route-button-primary h-14 px-8 text-sm sm:text-base font-bold flex items-center gap-2.5 shadow-md"
                >
                  <span>{isAr ? "اطلب عرض سعر أو استشارة" : "Request Quote or Advisory"}</span>
                  <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                </Link>
                <Link
                  href="/services"
                  className="route-button route-button-outline h-14 px-7 text-sm font-bold flex items-center gap-2"
                >
                  <span>{isAr ? "استعراض مصفوفة الخدمات" : "Explore Services Matrix"}</span>
                </Link>
              </div>

              {/* Verified Trust Micro-Badges */}
              <div className="pt-4 border-t border-border/70 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>{isAr ? "كيان تجاري موثق" : "Verified Entity"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{isAr ? "استجابة مهنية فورية" : "Rapid Response"}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isAr ? "إدارة تنفيذية مباشرة" : "Direct Leadership"}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Commercial Operations & Verification Hub Card */}
            <div className="lg:col-span-5">
              <div className="bg-card border border-border rounded-3xl p-7 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-5">
                  <Logo variant="header" size="md" priority />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    {isAr ? "موثوقية مؤسسية" : "Enterprise Grade"}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {isAr ? "المسارات التشغيلية المعتمدة" : "Operational Service Tracks"}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-muted/40 border border-border/60 text-xs font-semibold flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate">{isAr ? "التمثيل التجاري والتوريدات" : "Trade & Procurement"}</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-muted/40 border border-border/60 text-xs font-semibold flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{isAr ? "التسويق الرقمي والأداء" : "Performance Marketing"}</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-muted/40 border border-border/60 text-xs font-semibold flex items-center gap-2">
                      <Code className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{isAr ? "تطوير المنصات والحلول" : "Platform Engineering"}</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-muted/40 border border-border/60 text-xs font-semibold flex items-center gap-2">
                      <LineChart className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <span className="truncate">{isAr ? "دراسات الجدوى والسوق" : "Economic Advisory"}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Executive Contact Bar */}
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/15 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{isAr ? "قناة التواصل المعتمدة:" : "Verified Direct Channel:"}</span>
                    <span className="font-bold text-foreground">{isAr ? "المدير التنفيذي: أ/ عدنان الحنشي" : "Adnan Al-Hanashi"}</span>
                  </div>
                  <a
                    href={`https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(
                      isAr ? contactData.whatsapp.defaultPrefillAr : contactData.whatsapp.defaultPrefillEn
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full h-12 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      {isAr
                        ? "محادثة فورية مع الإدارة: +967 783 334 002"
                        : "Direct WhatsApp: +967 783 334 002"}
                    </span>
                  </a>
                </div>

                {/* Physical HQ & Office info */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                    <span>{isAr ? "المقر: سيئون - حضرموت" : "HQ: Seiyun, Hadramout"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isAr ? "نموذج موحد لطلبات RFQ" : "Unified RFQ System"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Choose Your Path: 3-Lane Intent Selector (Decision Hub) */}
        <section className="py-20 bg-background border-b border-border">
          <div className="content-wrap space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="eyebrow">{isAr ? "مسارات الوصول السريع" : "Decision Hub"}</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading">
                {isAr ? "حدد وجهتك بدقة" : "Choose Your Path"}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isAr
                  ? "اختر المسار الذي يلائم احتياجك للوصول المباشر للمعلومة أو طلب الخدمة المناسبة لنشاطك."
                  : "Select the route that matches your current goal for frictionless navigation and inquiry."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Lane A: Services */}
              <Link
                href="/services"
                className="group bg-card border border-border rounded-3xl p-8 hover:border-primary/50 transition-all flex flex-col justify-between space-y-6 shadow-xs hover:shadow-lg hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
                    {isAr ? "الخدمات التجارية والتسويقية" : "Commercial & Marketing Services"}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {isAr
                      ? "أبحث عن وكالة تجارية، تيسير توريدات، إدارة حملات إعلانية، أو استشارات اقتصادية."
                      : "Looking for commercial representation, supply sourcing, paid campaigns, or economic advisory."}
                  </p>
                </div>
                <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-primary">
                  <span>{isAr ? "استعراض الخدمات" : "Explore Services"}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition ${isAr ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                </div>
              </Link>

              {/* Lane B: Products */}
              <Link
                href="/products"
                className="group bg-card border border-border rounded-3xl p-8 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-6 shadow-xs hover:shadow-lg hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
                    {isAr ? "المنتجات والمنصات الرقمية" : "Products & Digital Platforms"}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {isAr
                      ? "أريد التعرف على منصة معين للقطاع غير الربحي، شبكة غزارة، أو أدوات إدارة الشبكات."
                      : "Interested in Ma'een NGO SaaS platform, Ghazara network, or telecom utilities."}
                  </p>
                </div>
                <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-amber-500">
                  <span>{isAr ? "استكشاف المنتجات" : "Explore Products"}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition ${isAr ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                </div>
              </Link>

              {/* Lane C: Corporate & Direct Contact */}
              <Link
                href="/contact"
                className="group bg-card border border-border rounded-3xl p-8 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-6 shadow-xs hover:shadow-lg hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
                    {isAr ? "التواصل والشراكات المؤسسية" : "Corporate Inquiries & Contact"}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {isAr
                      ? "أرغب في لقاء مع الإدارة التنفيذية، استفسار عن شراكة استراتيجية، أو زيارة مقرنا."
                      : "Seeking an executive meeting, strategic partnership inquiry, or office visitation."}
                  </p>
                </div>
                <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>{isAr ? "تواصل مع الإدارة" : "Contact Management"}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition ${isAr ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. What We Bring: Trust Without Numbers (Real Operational Capabilities) */}
        <section className="py-24 bg-card border-b border-border">
          <div className="content-wrap space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="eyebrow">{isAr ? "ركائز القيمة والاعتماد" : "Institutional Capability"}</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading">
                {isAr ? "ما نقدمه لشركائنا المؤسسيين" : "What We Bring to Our Partners"}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isAr
                  ? "لا نعتمد على أرقام تسويقية غير موثقة، بل نرتكز على قدرات تشغيلية ومنهجيات عمل مثبتة تحقق نتائج واقعية قابلة للقياس."
                  : "We do not rely on unverified claims. We build on disciplined operational capabilities and structured methodologies that deliver verifiable impact."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-background border border-border rounded-3xl p-7 shadow-xs space-y-4 hover:border-primary/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground">
                  {isAr ? "1. دقة تشخيص الاحتياج" : "1. Precise Need Diagnosis"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? "دراسة عميقة للواقع التجاري وظروف السوق وتحديد متطلبات التوريد أو التسويق بدقة قبل البدء."
                    : "Deep analysis of market dynamics, operational bottlenecks, and commercial feasibility before execution."}
                </p>
              </div>

              <div className="bg-background border border-border rounded-3xl p-7 shadow-xs space-y-4 hover:border-amber-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground">
                  {isAr ? "2. صياغة الحلول التنافسية" : "2. Strategic Formulation"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? "بناء خطة تجارية أو تسويقية متوازنة تجمع بين الجدوى الاقتصادية وسرعة النفاذ للسوق المستهدف."
                    : "Structuring commercially balanced roadmaps uniting economic feasibility with competitive go-to-market speed."}
                </p>
              </div>

              <div className="bg-background border border-border rounded-3xl p-7 shadow-xs space-y-4 hover:border-emerald-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground">
                  {isAr ? "3. التنفيذ والتوريد الموثوق" : "3. Execution & Sourcing"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? "تيسير سلاسل الإمداد وإدارة العقود والحملات بدقة عالية لضمان استمرارية الأعمال وثبات الأداء."
                    : "Facilitating supply chains, contract execution, and campaigns to ensure stability and seamless flow."}
                </p>
              </div>

              <div className="bg-background border border-border rounded-3xl p-7 shadow-xs space-y-4 hover:border-indigo-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground">
                  {isAr ? "4. الحوكمة والدعم المستمر" : "4. Governance & Support"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? "تقارير شفافية ومتابعة دورية مع التزام تام بالحفاظ على حقوق الشركاء والمحافظة على جودة المخرجات."
                    : "Periodic reporting, operational transparency, and ongoing technical support for sustainable growth."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Productized Core Services Matrix */}
        <section id="services" className="py-24 bg-background border-b border-border">
          <div className="content-wrap space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <span className="eyebrow">{isAr ? "مصفوفة الخدمات" : "Services Matrix"}</span>
                <h2 className="text-3xl sm:text-4xl font-bold font-heading">
                  {isAr ? "خدمات متخصصة مصممة للنتائج" : "Specialized Services Engineered for Results"}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isAr
                    ? "كل خدمة تجيب عن تحدٍ واضح في السوق وتقدم قيمة تجارية مباشرة قابلة للقياس والتحقق."
                    : "Each service addresses a distinct commercial challenge and delivers measurable value."}
                </p>
              </div>
              <Link
                href="/services"
                className="route-button route-button-outline px-6 py-3 text-xs shrink-0 self-start md:self-end flex items-center gap-2"
              >
                <span>{isAr ? "استعراض كافة التفاصيل" : "View Full Matrix"}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {servicesData.map((svc) => (
                <div
                  key={svc.id}
                  className="bg-card border border-border rounded-3xl p-8 sm:p-9 shadow-xs flex flex-col justify-between space-y-6 hover:border-primary/40 transition hover:shadow-md"
                >
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-13 h-13 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">
                        {getServiceIcon(svc.icon)}
                      </div>
                      <span className="text-xs font-mono font-bold text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-border">
                        {svc.number}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
                        {svc.title[lang]}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {svc.shortDesc[lang]}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-1">
                        <span className="text-xs font-bold text-foreground block">
                          {isAr ? "التحدي الذي نعالجه:" : "Problem Solved:"}
                        </span>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {svc.problemSolved[lang]}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/15 space-y-1">
                        <span className="text-xs font-bold text-primary block">
                          {isAr ? "القيمة المحققة لأعمالك:" : "Value Delivered:"}
                        </span>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {svc.valueDelivered[lang]}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                    <Link
                      href={`/request-quote?service=${svc.id}`}
                      className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1.5"
                    >
                      <span>{isAr ? "اطلب تسعير هذه الخدمة" : "Request RFQ for this Service"}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
                    </Link>
                    <Link
                      href="/services"
                      className="text-xs text-muted-foreground hover:text-foreground transition"
                    >
                      {isAr ? "تفاصيل إضافية" : "More details"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Verified Products & Digital Platforms */}
        <section id="products" className="py-24 bg-card border-b border-border">
          <div className="content-wrap space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="eyebrow">{isAr ? "المنتجات والمنصات" : "Products & Platforms"}</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading">
                {isAr ? "منصات وحلول برمجية معتمدة" : "Verified Digital Platforms & SaaS"}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isAr
                  ? "حلول رقمية سحابية وبنى تحتية طورتها ودعمتها غزارة لخدمة المؤسسات والشركات."
                  : "Cloud SaaS solutions and network utilities engineered and supported by Ghazara."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productsData.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-background border border-border rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-6 hover:border-primary/40 transition hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {prod.tag[lang]}
                      </span>
                      <span className="text-[11px] font-mono uppercase font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                        {prod.status === "live"
                          ? isAr
                            ? "متاح وجاهز"
                            : "Live Platform"
                          : isAr
                          ? "حل مؤسسي"
                          : "Enterprise Solution"}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-foreground">
                      {prod.title[lang]}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {prod.shortDesc[lang]}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-border/70">
                      {prod.keyFeatures.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{feat[lang]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <Link
                      href={`/request-quote?product=${prod.id}`}
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>{isAr ? "طلب المنصة / استفسار" : "Inquire / Request Access"}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
                    </Link>

                    {prod.externalLink && (
                      <a
                        href={prod.externalLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                      >
                        <span>{isAr ? "المستودع" : "Repo"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. How We Work: 4-Stage Transparent Methodology */}
        <section className="py-24 bg-background border-b border-border">
          <div className="content-wrap space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="eyebrow">{isAr ? "منهجية العمل" : "Our Methodology"}</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading">
                {isAr ? "مسار واضح من الطلب إلى الإنجاز" : "A Clear Route from Scoping to Delivery"}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isAr
                  ? "خطوات تنفيذ منضبطة وشفافة تضمن عدم ضياع الوقت وتحدد المسؤوليات بدقة في كل مرحلة."
                  : "Disciplined execution stages ensuring clarity, milestone tracking, and optimal commercial outcomes."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-7 rounded-3xl bg-card border border-border space-y-4 relative hover:border-primary/40 transition">
                <span className="text-3xl font-mono font-bold text-primary/30 block">01</span>
                <h3 className="font-heading font-bold text-base text-foreground">
                  {isAr ? "الاستكشاف والتشخيص" : "1. Discovery & Scoping"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? "استقبال متطلباتك عبر النموذج الموحد، وتحديد النطاق الجغرافي وحجم العمل والخدمة المناسبة."
                    : "Receiving your RFQ, diagnosing the commercial scope, and defining technical requirements."}
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-card border border-border space-y-4 relative hover:border-amber-500/40 transition">
                <span className="text-3xl font-mono font-bold text-amber-500/30 block">02</span>
                <h3 className="font-heading font-bold text-base text-foreground">
                  {isAr ? "دراسة الجدوى والتسعير" : "2. Feasibility & Proposal"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? "إعداد دراسة موجزة وعرض أسعار واضح يحدد المخرجات المتوقعة والجدول الزمني للتنفيذ."
                    : "Preparing a tailored feasibility brief and transparent commercial proposal with timelines."}
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-card border border-border space-y-4 relative hover:border-emerald-500/40 transition">
                <span className="text-3xl font-mono font-bold text-emerald-500/30 block">03</span>
                <h3 className="font-heading font-bold text-base text-foreground">
                  {isAr ? "التنفيذ والتوريد" : "3. Execution & Sourcing"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? "بدء العمليات التشغيلية، إدارة التوريدات والحملات، أو بناء المنصة الرقمية وفق المواصفات."
                    : "Initiating operations, supply workflows, campaign launches, or platform engineering."}
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-card border border-border space-y-4 relative hover:border-indigo-500/40 transition">
                <span className="text-3xl font-mono font-bold text-indigo-500/30 block">04</span>
                <h3 className="font-heading font-bold text-base text-foreground">
                  {isAr ? "المتابعة والتقييم" : "4. Review & Governance"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? "تسليم المخرجات، مراجعة مؤشرات الأداء، وتوفير الدعم المستمر لضمان استدامة النجاح."
                    : "Delivering milestones, reviewing KPIs, and providing ongoing support for growth."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Sectors Served: Verifiable B2B Capabilities */}
        <section className="py-24 bg-card border-b border-border">
          <div className="content-wrap space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="eyebrow">{isAr ? "القطاعات والجاهزية" : "Target Sectors"}</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading">
                {isAr ? "قطاعات الأعمال المخدومة" : "Commercial Sectors Served"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isAr
                  ? "خبرات متراكمة في خدمة مختلف القطاعات التجارية والخدمية وغير الربحية."
                  : "Dedicated solutions designed to meet the demands of diverse business ecosystems."}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-background border border-border rounded-3xl p-6 shadow-xs text-center space-y-2 hover:border-primary/40 transition">
                <div className="font-heading font-bold text-base text-foreground">
                  {isAr ? "التجارة والتجزئة (FMCG)" : "Retail & Consumer Goods"}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr ? "وكالات تجارية وتوريدات وسلاسل إمداد" : "Agencies, procurement & distribution"}
                </p>
              </div>

              <div className="bg-background border border-border rounded-3xl p-6 shadow-xs text-center space-y-2 hover:border-primary/40 transition">
                <div className="font-heading font-bold text-base text-foreground">
                  {isAr ? "القطاع غير الربحي والخيري" : "Non-Profit & NGOs"}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr ? "منصات ساس وحلول حوكمة التبرعات" : "SaaS platforms & donor governance"}
                </p>
              </div>

              <div className="bg-background border border-border rounded-3xl p-6 shadow-xs text-center space-y-2 hover:border-primary/40 transition">
                <div className="font-heading font-bold text-base text-foreground">
                  {isAr ? "الاتصالات وتقنية المعلومات" : "Telecom & IT Infrastructure"}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr ? "حلول ميكروتيك وإدارة الشبكات" : "MikroTik utilities & traffic telemetry"}
                </p>
              </div>

              <div className="bg-background border border-border rounded-3xl p-6 shadow-xs text-center space-y-2 hover:border-primary/40 transition">
                <div className="font-heading font-bold text-base text-foreground">
                  {isAr ? "الشركات والخدمات B2B" : "Enterprise & B2B Services"}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isAr ? "استراتيجيات التسويق والأداء والنمو" : "Performance marketing & expansion plans"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Final Conversion Action: Dual Action Closing Block */}
        <section id="rfq" className="py-24 bg-background">
          <div className="content-wrap max-w-4xl mx-auto space-y-10 text-center">
            <div className="space-y-4">
              <span className="eyebrow">{isAr ? "ابدأ مسارك الآن" : "Take Action"}</span>
              <h2 className="text-3xl sm:text-5xl font-bold font-heading">
                {isAr
                  ? "جاهز لبدء التعاون أو طلب استشارة؟"
                  : "Ready to Initiate Collaboration or Request a Quote?"}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                {isAr
                  ? "تواصل مع فريق مؤسسة غزارة اليوم للحصول على تسعير دقيق، دراسة أولية لاحتياجك، أو لقاء عمل مؤسسي."
                  : "Contact Ghazara team today for an accurate quote, initial assessment, or direct executive discussion."}
              </p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-lg space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/request-quote"
                  className="route-button route-button-primary w-full sm:w-auto px-8 h-14 text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <span>{isAr ? "نموذج طلب عرض السعر الموحد" : "Launch Unified RFQ Form"}</span>
                  <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                </Link>

                <a
                  href={`https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(
                    isAr ? contactData.whatsapp.defaultPrefillAr : contactData.whatsapp.defaultPrefillEn
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="route-button bg-[#25D366] text-white hover:bg-[#20ba5a] w-full sm:w-auto px-8 h-14 text-sm font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? "محادثة فورية عبر واتساب" : "Direct WhatsApp Chat"}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-muted-foreground">
                <span>
                  {isAr ? "البريد الإلكتروني المعتمد:" : "Official Email:"}{" "}
                  <strong className="text-foreground">{contactData.email.address}</strong>
                </span>
                <span className="hidden sm:inline">•</span>
                <span>
                  {isAr ? "هاتف الإدارة التنفيذية:" : "Executive Phone:"}{" "}
                  <strong className="text-foreground" dir="ltr">{contactData.phone.display}</strong>
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

