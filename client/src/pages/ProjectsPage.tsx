import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { projectsData } from "@/data/projects";
import { isPubliclyPublishable } from "@/data/contentApproval";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import { ExternalLink, CheckCircle2, ArrowRight, FolderKanban } from "lucide-react";
import { Link } from "wouter";

export default function ProjectsPage() {
  const { lang, isAr } = useLanguage();
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: { ar: "جميع المشاريع", en: "All Projects" } },
    { id: "saas", label: { ar: "حلول سحابية SaaS", en: "SaaS Platforms" } },
    { id: "portal", label: { ar: "بوابات مؤسسية", en: "Corporate Portals" } },
    { id: "infrastructure", label: { ar: "بنية تحتية وشبكات", en: "Infrastructure & Networks" } },
  ];

  const filteredProjects = useMemo(() => {
    const publishedList = projectsData.filter(isPubliclyPublishable);
    if (selectedTag === "all") return publishedList;
    return publishedList.filter((p) => {
      if (selectedTag === "saas") return p.tag.en.toLowerCase().includes("saas");
      if (selectedTag === "portal") return p.tag.en.toLowerCase().includes("portal");
      if (selectedTag === "infrastructure") return p.tag.en.toLowerCase().includes("infrastructure");
      return true;
    });
  }, [selectedTag]);

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead pageKey="projects" />
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <section className="content-wrap py-10">
          <SiteBreadcrumb items={[{ label: isAr ? "مشاريعنا" : "Projects" }]} />

          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">
              {isAr ? "سجل الإنجازات ودراسات الحالة" : "Case Studies & Portfolio"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {isAr
                ? "مشاريع نفتخر بإنجازها وقيادتها نحو النجاح"
                : "Projects We Are Proud to Deliver and Lead to Success"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isAr
                ? "نماذج واقعية من خبرتنا في بناء المنصات الرقمية، إدارة البنى التحتية، وتقديم الحلول التجارية المتخصصة."
                : "Real-world demonstrations of our expertise in digital platforms, infrastructure engineering, and commercial execution."}
            </p>
          </div>
        </section>

        {/* Filter Pills */}
        <section className="content-wrap pb-6 border-t border-border pt-8">
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => {
              const isActive = selectedTag === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedTag(tab.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-heading font-semibold transition cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label[lang]}
                </button>
              );
            })}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="content-wrap py-6">
          {filteredProjects.length === 0 ? (
            <div className="bg-card border border-border rounded-3xl p-12 text-center space-y-3">
              <FolderKanban className="w-10 h-10 text-muted-foreground mx-auto" />
              <h3 className="font-heading font-bold text-lg">
                {isAr ? "سجل المشاريع قيد التوثيق والاعتماد" : "Case Studies Pending Verification"}
              </h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                {isAr
                  ? "نقوم حالياً بتوثيق ونشر دراسات الحالة المعتمدة وفق معايير الحوكمة. تواصل معنا للاطلاع على سابقة أعمالنا المباشرة."
                  : "We are currently documenting verified case studies under strict content governance. Contact us for direct portfolio inquiries."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-card border border-border rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-6 transition-all hover:border-primary/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {proj.tag[lang]}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {proj.clientSector[lang]}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl">{proj.title[lang]}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {proj.shortDesc[lang]}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <span className="text-xs font-bold text-foreground block">
                      {isAr ? "الخدمات المنجزة في المشروع:" : "Services Delivered:"}
                    </span>
                    {proj.servicesDelivered.map((srv, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{srv[lang]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <span>{isAr ? "استعراض دراسة الحالة" : "View Case Study"}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
                  </Link>

                  <Link
                    href={`/request-quote?project=${proj.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
                  >
                    <span>{isAr ? "طلب مشروع مماثل" : "Request RFQ"}</span>
                  </Link>
                </div>
              </div>
            ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
