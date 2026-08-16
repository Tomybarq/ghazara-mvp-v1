import { useState } from "react";
import { content } from "@/data/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink, CheckCircle2 } from "lucide-react";

export default function ProjectsPage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const t = content[lang];
  const ar = lang === "ar";

  const projectsList = [
    {
      titleAr: "منصة معين الرقمية (Ma'een NGO Platform)",
      titleEn: "Ma'een Digital Platform (NGO SaaS)",
      descAr: "تطوير وبناء منصة متكاملة لإدارة العمل الخيري والمؤسسي في المملكة العربية السعودية مع إدارة البيانات بكفاءة وأمان تام.",
      descEn: "Developing an integrated platform for charity and institutional management in Saudi Arabia with secure data operations.",
      tag: "SaaS Platform",
      link: "https://github.com/Tomybarq/moeen-ngo",
    },
    {
      titleAr: "بوابة غزارة للتجارة والخدمات الرقمية",
      titleEn: "Ghazara Trade & Digital Services Portal",
      descAr: "المنصة الرسمية الموحدة لتقديم الحلول التجارية، استراتيجيات التسويق، وربط الشركات بالفرص الإقليمية.",
      descEn: "The official unified platform delivering commercial solutions, marketing strategies, and regional business opportunities.",
      tag: "Enterprise Portal",
      link: "#",
    },
    {
      titleAr: "منظومات شبكات الاتصالات وميكروتيك المؤسسية",
      titleEn: "Enterprise MikroTik & Network Infrastructure",
      descAr: "تصميم وإدارة بنى تحتية للشبكات والاتصالات لضمان أقصى موثوقية وسرعة للشركات ومزودي الخدمات.",
      descEn: "Designing and managing network and communication infrastructure to ensure maximum reliability for enterprises.",
      tag: "Network Infrastructure",
      link: "#",
    },
  ];

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col" dir={ar ? "rtl" : "ltr"}>
      <Header lang={lang} setLang={setLang} />

      <main className="flex-1 pt-32 pb-20">
        <section className="content-wrap py-12">
          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">{ar ? "مشاريعنا وإنجازاتنا" : "Projects & Case Studies"}</span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {ar ? "مشاريع نفتخر بإنجازها وقيادتها نحو النجاح" : "Projects We Are Proud to Deliver and Lead to Success"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {ar ? "نماذج حية من خبرتنا في بناء المنصات التقنية، إدارة الشبكات، وتقديم الحلول التجارية." : "Live examples of our expertise in building tech platforms, managing networks, and delivering commercial solutions."}
            </p>
          </div>
        </section>

        <section className="content-wrap py-12 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectsList.map((proj, idx) => (
              <div key={idx} className="bg-card border border-border rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {proj.tag}
                  </span>
                  <h3 className="font-heading font-bold text-xl">{ar ? proj.titleAr : proj.titleEn}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {ar ? proj.descAr : proj.descEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    <span>{ar ? "عرض المشروع" : "View Project"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
