import { useState } from "react";
import { content } from "@/data/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Briefcase, TrendingUp, Code, LineChart, ArrowUpRight } from "lucide-react";

export default function ServicesPage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const t = content[lang];
  const ar = lang === "ar";

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col" dir={ar ? "rtl" : "ltr"}>
      <Header lang={lang} setLang={setLang} />

      <main className="flex-1 pt-32 pb-20">
        <section className="content-wrap py-12">
          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">{t.services.eyebrow}</span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {t.services.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>
        </section>

        <section className="content-wrap py-12 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {t.services.list.map((svc) => (
              <div key={svc.id} className="bg-card border border-border rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {svc.id === "marketing" && <TrendingUp className="w-6 h-6" />}
                    {svc.id === "trade" && <Briefcase className="w-6 h-6" />}
                    {svc.id === "digital" && <Code className="w-6 h-6" />}
                    {svc.id === "consulting" && <LineChart className="w-6 h-6" />}
                  </div>
                  <h3 className="font-heading font-bold text-xl">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-border">
                  <a href="/hub?request=1" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                    <span>{ar ? "اطلب هذه الخدمة" : "Request Service"}</span>
                    <ArrowUpRight className="w-4 h-4" />
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
