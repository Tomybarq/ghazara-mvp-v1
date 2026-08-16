import { useState } from "react";
import { content } from "@/data/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, User } from "lucide-react";

export default function BlogPage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const t = content[lang];
  const ar = lang === "ar";

  const articles = [
    {
      titleAr: "دور التحول الرقمي في تعزيز كفاءة التجارة المؤسسية",
      titleEn: "The Role of Digital Transformation in Enhancing Corporate Trade Efficiency",
      date: "أغسطس 2026",
      readTime: "5 دقائق قراءة",
      excerptAr: "كيف تساهم المنصات السحابية والأتمتة الحديثة في خفض التكاليف التشغيلية وفتح آفاق جديدة للتجارة الإقليمية.",
      excerptEn: "How cloud platforms and modern automation help reduce operational costs and unlock new horizons for regional trade.",
    },
    {
      titleAr: "استراتيجيات التسويق الرقمي المرتكزة على البيانات (Data-Driven Marketing)",
      titleEn: "Data-Driven Digital Marketing Strategies for Maximum ROI",
      date: "أغسطس 2026",
      readTime: "4 دقائق قراءة",
      excerptAr: "لماذا يعد تحليل سلوك المستهلك واتخاذ القرار بناءً على الأرقام الحقيقية هو الفيصل في نجاح الحملات التسويقية الحديثة.",
      excerptEn: "Why analyzing consumer behavior and making decisions based on real numbers is decisive for modern marketing success.",
    },
    {
      titleAr: "إدارة البنية التحتية للشبكات وحلول ميكروتيك للشركات",
      titleEn: "Network Infrastructure Management & MikroTik Solutions for Enterprises",
      date: "يوليو 2026",
      readTime: "6 دقائق قراءة",
      excerptAr: "دليل شامل لتأمين وتحسين توزيع النطاق الترددي واستقرار الاتصال للمؤسسات الكبرى.",
      excerptEn: "A comprehensive guide to securing, optimizing bandwidth distribution, and ensuring connection stability for major enterprises.",
    },
  ];

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col" dir={ar ? "rtl" : "ltr"}>
      <Header lang={lang} setLang={setLang} />

      <main className="flex-1 pt-32 pb-20">
        <section className="content-wrap py-12">
          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">{ar ? "المدونة والرؤى المهنية" : "Insights & Articles"}</span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {ar ? "رؤى استراتيجية ومقالات في التجارة والتكنولوجيا" : "Strategic Insights & Articles in Trade & Technology"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {ar ? "مقالات تحليلية وخبرات عملية يقدمها فريق غزارة في مجالات التجارة، التسويق الرقمي، وتقنية المعلومات." : "Analytical articles and practical expertise by the Ghazara team in commerce, digital marketing, and IT."}
            </p>
          </div>
        </section>

        <section className="content-wrap py-12 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art, idx) => (
              <article key={idx} className="bg-card border border-border rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl leading-snug">{ar ? art.titleAr : art.titleEn}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {ar ? art.excerptAr : art.excerptEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">{ar ? "مقال حصري" : "Exclusive Article"}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    Ghazara Editorial
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
