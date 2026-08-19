import { useParams, Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { projectsData } from "@/data/projects";
import { resolvePublishedProject } from "@/data/detailRoutes";
import { isPubliclyPublishable } from "@/data/contentApproval";
import { contactData } from "@/data/contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import NotFound from "@/pages/NotFound";
import {
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Code2,
  Briefcase,
  Layers,
  MessageCircle,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, isAr } = useLanguage();

  const project = resolvePublishedProject(slug);

  if (!project) {
    return <NotFound />;
  }

  const otherProjects = projectsData.filter(
    (p) => isPubliclyPublishable(p) && p.id !== project.id
  );

  const seoTitle =
    project.seo?.title?.[lang] ||
    (isAr
      ? `${project.title.ar} | مؤسسة غزارة للتجارة والتسويق`
      : `${project.title.en} | Ghazara Trading & Marketing`);

  const seoDescription =
    project.seo?.description?.[lang] || project.shortDesc[lang];

  const handleWhatsAppInquiry = () => {
    const header = isAr
      ? `*طلب تنفيذ مشروع مماثل لـ: ${project.title.ar}*`
      : `*Inquiry regarding similar project to: ${project.title.en}*`;
    const body = isAr
      ? `السلام عليكم، اطلعت على دراسة حالة (${project.title.ar}) وأرغب في استشارة وبحث تنفيذ مشروع مماثل لمؤسستنا.`
      : `Hello, I reviewed the case study for (${project.title.en}) and would like to explore a similar execution for our organization.`;

    window.open(
      `https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(
        `${header}\n\n${body}`
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead
        pageKey="projects"
        customTitle={seoTitle}
        customDescription={seoDescription}
        customCanonicalPath={`/projects/${project.slug}`}
      />
      <Header />

      <main className="flex-1 pt-32 pb-20">
        {/* Project Hero Section */}
        <section className="content-wrap py-8">
          <SiteBreadcrumb
            items={[
              {
                label: isAr ? "مشاريعنا ودراسات الحالة" : "Projects & Case Studies",
                href: "/projects",
              },
              { label: project.title[lang] },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-heading">
                  {project.tag[lang]}
                </span>
                <span className="px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground text-[11px] font-mono">
                  {project.clientSector[lang]}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isAr ? "مشروع منجز وموثق" : "Delivered Case"}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight leading-tight">
                {project.title[lang]}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {project.overview ? project.overview[lang] : project.shortDesc[lang]}
              </p>

              {/* Primary Action Row */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/request-quote?project=${project.slug}`}
                  className="route-button route-button-primary px-7 py-3.5 text-sm font-bold shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <span>{isAr ? "طلب تنفيذ مشروع مماثل" : "Request Similar Project"}</span>
                  <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                </Link>

                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="route-button bg-[#25D366] text-white hover:bg-[#20ba5a] px-6 py-3.5 text-sm font-bold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? "محادثة فورية عبر واتساب" : "Direct WhatsApp"}</span>
                </button>

                {project.externalLink && (
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noreferrer"
                    className="route-button route-button-outline px-5 py-3.5 text-xs font-medium flex items-center gap-2"
                  >
                    <span>{isAr ? "رابط المنظومة الحية" : "Live System / Repo"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Metadata Sidebar Card */}
            <div className="lg:col-span-4 bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
              <h3 className="font-heading font-bold text-base border-b border-border pb-3">
                {isAr ? "بطاقة دراسة الحالة" : "Case Study Overview"}
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-muted-foreground block mb-1">
                    {isAr ? "القطاع المستفيد:" : "Target Sector:"}
                  </span>
                  <span className="font-bold text-foreground block text-sm">
                    {project.clientSector[lang]}
                  </span>
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div>
                    <span className="text-muted-foreground block mb-1">
                      {isAr ? "التقنيات والأدوات المستخدمة:" : "Technologies Deployed:"}
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((t) => (
                        <span
                          key={t.id}
                          className="px-2.5 py-1 rounded-xl bg-muted text-foreground text-[11px] font-medium"
                        >
                          {t.label[lang]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-border">
                  <span className="text-muted-foreground block mb-1">
                    {isAr ? "حالة التحقق المؤسسي:" : "Verification Status:"}
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isAr ? "موثق ضمن سجل إنجازات غزارة" : "Verified Project Baseline"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge, Solution & Impact Breakdown */}
        <section className="content-wrap py-12 border-t border-border space-y-12">
          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.challenge && (
              <div className="bg-card border border-border rounded-3xl p-8 shadow-xs space-y-4">
                <span className="eyebrow">{isAr ? "التحدي التشغيلي" : "The Challenge"}</span>
                <h3 className="font-heading font-bold text-xl text-foreground">
                  {isAr ? "طبيعة الاحتياج والمتطلبات" : "Operational Context & Problem"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.challenge[lang]}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="bg-card border border-border rounded-3xl p-8 shadow-xs space-y-4">
                <span className="eyebrow">{isAr ? "الحل الهندسي والتنفيذي" : "The Solution"}</span>
                <h3 className="font-heading font-bold text-xl text-foreground">
                  {isAr ? "منهجية التنفيذ والحلول المقدمة" : "Delivered Methodology & Architecture"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.solution[lang]}
                </p>
              </div>
            )}
          </div>

          {/* Services Delivered */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-xs space-y-6">
            <h3 className="font-heading font-bold text-xl text-foreground">
              {isAr ? "نطاق الخدمات والتسليمات المنجزة" : "Delivered Work & Deliverables"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.servicesDelivered.map((srv, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex items-start gap-3 text-xs sm:text-sm text-foreground font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{srv[lang]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes & Impact */}
          {project.outcomes && project.outcomes.length > 0 && (
            <div className="bg-card border border-border rounded-3xl p-8 shadow-xs space-y-6">
              <h3 className="font-heading font-bold text-xl text-foreground">
                {isAr ? "الأثر التشغيلي والنتائج المحققة" : "Outcomes & Measurable Impact"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.outcomes.map((out, oIdx) => (
                  <div
                    key={oIdx}
                    className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3 text-xs sm:text-sm text-foreground"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{out[lang]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contextual RFQ Conversion Callout */}
          <div className="rounded-3xl bg-linear-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-start">
              <span className="eyebrow">
                {isAr ? "استشارة وتنفيذ مخصص" : "Custom Project Consultation"}
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                {isAr
                  ? "هل لديك متطلبات مشروع تجاري أو تقني مماثل؟"
                  : "Have a similar commercial or technical initiative?"}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                {isAr
                  ? "فريق مؤسسة غزارة مستعد لمناقشة نطاق عملك، وتقديم استشارة متخصصة لدعم نجاح مشروعك."
                  : "Ghazara consultants are prepared to assess your scope and deliver specialized execution support."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href={`/request-quote?project=${project.slug}`}
                className="route-button route-button-primary px-6 py-3.5 text-xs sm:text-sm font-bold text-center"
              >
                <span>{isAr ? "طلب عرض سعر للمشروع" : "Request RFQ"}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>

          {/* Related Projects */}
          {otherProjects.length > 0 && (
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-heading font-bold text-foreground">
                  {isAr ? "مشاريع ودراسات حالة أخرى" : "Other Case Studies & Projects"}
                </h3>
                <Link
                  href="/projects"
                  className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>{isAr ? "عرض جميع المشاريع" : "View All Projects"}</span>
                  {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherProjects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.slug}`}
                    className="bg-card border border-border hover:border-primary/50 rounded-3xl p-6 transition-all shadow-xs flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-primary font-heading">
                        {p.tag[lang]}
                      </span>
                      <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {p.title[lang]}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {p.shortDesc[lang]}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold text-primary">
                      <span>{isAr ? "استعراض دراسة الحالة" : "View Case Study"}</span>
                      <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
