import { useState } from "react";
import { content } from "@/data/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function ProductsPage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const t = content[lang];
  const ar = lang === "ar";

  const productsList = [
    {
      id: "maeen",
      titleAr: "منصة معين الرقمية (Ma'een)",
      titleEn: "Ma'een Digital Platform",
      descAr: "منصة ساس متكاملة مخصصة لخدمة الجمعيات الخيرية والمؤسسات غير الربحية في المملكة العربية السعودية، لإدارة المشاريع والتبرعات بكفاءة عالية.",
      descEn: "A comprehensive SaaS platform dedicated to charities and non-profit institutions in Saudi Arabia for efficient project and donation management.",
      tag: "SaaS Enterprise",
      link: "https://github.com/Tomybarq/moeen-ngo",
    },
    {
      id: "ghazara-net",
      titleAr: "شبكة غزارة الرقمية (ghazara.net)",
      titleEn: "Ghazara Digital Network",
      descAr: "البوابة المركزية لخدماتنا ومشاريعنا التقنية، تجمع بين الابتكار التسويقي، الأدوات الذكية، وتقديم الخدمات الرقمية المبتكرة للعملاء عالمياً.",
      descEn: "The central gateway for our technical services and projects, blending marketing innovation, smart tools, and global digital services.",
      tag: "Core Platform",
      link: "#",
    },
    {
      id: "mikrotik",
      titleAr: "أنظمة وأدوات إدارة الشبكات",
      titleEn: "Network Management Utilities",
      descAr: "مجموعة أدوات برمجية متخصصة في مراقبة وتحسين أداء شبكات ميكروتيك وتوزيع النطاق الترددي للشركات ومزودي خدمة الإنترنت.",
      descEn: "Specialized software utilities for monitoring and optimizing MikroTik network performance and bandwidth distribution.",
      tag: "Enterprise Tool",
      link: "#",
    },
  ];

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col" dir={ar ? "rtl" : "ltr"}>
      <Header lang={lang} setLang={setLang} />

      <main className="flex-1 pt-32 pb-20">
        <section className="content-wrap py-12">
          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">{ar ? "المنتجات والمنصات" : "Products & Platforms"}</span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {ar ? "منتجات رقمية وحلول مؤسسية مصممة للتميز" : "Digital Products & Enterprise Solutions Engineered for Excellence"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {ar ? "نخبة من المنصات والمنتجات التقنية التي نطورها وندعمها لخدمة قطاع الأعمال والمنظمات." : "A curated selection of technical platforms and products we develop and support for business and organizational sectors."}
            </p>
          </div>
        </section>

        <section className="content-wrap py-12 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productsList.map((prod) => (
              <div key={prod.id} className="bg-card border border-border rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {prod.tag}
                  </span>
                  <h3 className="font-heading font-bold text-xl">{ar ? prod.titleAr : prod.titleEn}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {ar ? prod.descAr : prod.descEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <a
                    href={prod.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    <span>{ar ? "استكشاف المنتج" : "Explore Product"}</span>
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
