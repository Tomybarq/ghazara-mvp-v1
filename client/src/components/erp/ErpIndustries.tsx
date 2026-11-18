import { useLanguage } from "@/contexts/LanguageContext";
import { erpIndustries } from "@/data/erp";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ErpIcon } from "./erpIcons";
import ErpSectionHeading from "./ErpSectionHeading";

export default function ErpIndustries() {
  const { lang, isAr } = useLanguage();
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section id="industries" className="py-16 sm:py-20 lg:py-24">
      <div className="content-wrap">
        <ErpSectionHeading
          eyebrow={{ ar: "حلول القطاعات", en: "Industry solutions" }}
          title={{
            ar: "لكل قطاع منطق تشغيلي مختلف",
            en: "Every sector runs on different logic",
          }}
          desc={{
            ar: "لا نطبق قالباً واحداً على الجميع — نضبط الوحدات وسير العمل بحسب طبيعة نشاطك ومؤشراتك الحاسمة.",
            en: "We don't apply one template to everyone — modules and workflows are tuned to your activity and the metrics that matter.",
          }}
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {erpIndustries.map((industry) => (
            <article key={industry.id} className="erp-card group p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="erp-icon-tile">
                  <ErpIcon name={industry.icon} className="w-5 h-5" />
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">
                  {industry.title[lang]}
                </h3>
              </div>

              <div className="space-y-3 text-sm leading-relaxed">
                <p className="text-muted-foreground">
                  <span className="block text-[0.6875rem] font-bold uppercase tracking-wide text-muted-foreground/70 mb-1">
                    {isAr ? "الواقع اليوم" : "Today"}
                  </span>
                  {industry.pain[lang]}
                </p>
                <p className="text-foreground">
                  <span className="block text-[0.6875rem] font-bold uppercase tracking-wide text-primary mb-1">
                    {isAr ? "مع غزارة" : "With Ghazara"}
                  </span>
                  {industry.outcome[lang]}
                </p>
              </div>

              <Arrow
                className="mt-auto w-4 h-4 text-primary/50 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
