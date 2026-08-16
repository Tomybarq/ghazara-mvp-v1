import { useState } from "react";
import { content } from "@/data/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Target, Eye, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function AboutPage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const t = content[lang];
  const ar = lang === "ar";

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col" dir={ar ? "rtl" : "ltr"}>
      <Header lang={lang} setLang={setLang} />

      <main className="flex-1 pt-32 pb-20">
        {/* Hero Section */}
        <section className="content-wrap py-12">
          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">{t.about.eyebrow}</span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {ar ? "مؤسسة غزارة: ريادة موثوقة في التجارة والحلول التسويقية" : "Ghazara: Trusted Leadership in Trade & Marketing Solutions"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.about.p1}
            </p>
          </div>
        </section>

        {/* Story & Vision */}
        <section className="content-wrap py-12 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">
                {ar ? "قصتنا ورؤيتنا الاستراتيجية" : "Our Story & Strategic Vision"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.about.p2}
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-base">{ar ? "التمثيل التجاري الموثوق" : "Reliable Commercial Representation"}</h3>
                    <p className="text-sm text-muted-foreground">{ar ? "إدارة الوكالات وسلاسل الإمداد بأعلى كفاءة مؤسسية." : "Managing agencies and supply chains with top corporate efficiency."}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-base">{ar ? "التحول الرقمي المتكامل" : "Integrated Digital Transformation"}</h3>
                    <p className="text-sm text-muted-foreground">{ar ? "بناء المنصات الرقمية وتطبيقات الويب وفق أحدث المعايير." : "Building digital platforms and web apps to the highest standards."}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg">{ar ? "رؤيتنا" : "Our Vision"}</h3>
                  <p className="text-sm text-muted-foreground">{ar ? "الشريك التجاري الأكثر ابتكاراً وموثوقية في المنطقة." : "The most innovative and trusted commercial partner in the region."}</p>
                </div>
              </div>
              <hr className="border-border" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg">{ar ? "رسالتنا" : "Our Mission"}</h3>
                  <p className="text-sm text-muted-foreground">{ar ? "تمكين الشركات من قيادة السوق عبر حلول تجارية وتسويقية متكاملة." : "Empowering enterprises to lead the market via integrated solutions."}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="content-wrap py-16 border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold">{ar ? "قيمنا الجوهرية" : "Our Core Values"}</h2>
            <p className="text-muted-foreground mt-2">{ar ? "المبادئ التي توجه كل خطوة نقوم بها." : "The principles guiding every step we take."}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.about.values.map((val, idx) => (
              <div key={idx} className="bg-card border border-border rounded-3xl p-6 shadow-xs space-y-3">
                <Shield className="w-8 h-8 text-primary" />
                <h3 className="font-heading font-bold text-lg">{val.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
