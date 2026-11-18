import { useLanguage } from "@/contexts/LanguageContext";
import { erpModules } from "@/data/erp";
import { Check } from "lucide-react";
import { ErpIcon } from "./erpIcons";
import ErpSectionHeading from "./ErpSectionHeading";

export default function ErpModules() {
  const { lang, isAr } = useLanguage();

  return (
    <section id="modules" className="py-16 sm:py-20 lg:py-24">
      <div className="content-wrap">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <ErpSectionHeading
            eyebrow={{ ar: "وحدات النظام", en: "ERP modules" }}
            title={{
              ar: "تسع وحدات أساسية تعمل كمنظومة واحدة",
              en: "Nine core modules working as one system",
            }}
            desc={{
              ar: "تفعّل ما تحتاجه اليوم، وتوسّع لاحقاً دون إعادة بناء — كل وحدة مرتبطة بالقيود المحاسبية والتقارير التنفيذية.",
              en: "Activate what you need today and extend later without rebuilding — every module is wired to accounting entries and executive reporting.",
            }}
          />
          <p className="text-xs sm:text-sm text-muted-foreground lg:max-w-[15rem] lg:text-end leading-relaxed">
            {isAr
              ? "الوحدات قابلة للتفعيل التدريجي حسب أولويات التشغيل."
              : "Modules can be rolled out progressively by operational priority."}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {erpModules.map((module) => (
            <article key={module.id} className="erp-card p-6 flex flex-col gap-4">
              <span className="erp-icon-tile">
                <ErpIcon name={module.icon} className="w-5 h-5" />
              </span>

              <div className="space-y-2">
                <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">
                  {module.title[lang]}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{module.desc[lang]}</p>
              </div>

              <ul className="mt-auto space-y-1.5 pt-3 border-t border-border/70">
                {module.points.map((point) => (
                  <li
                    key={point.en}
                    className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                  >
                    <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                    <span>{point[lang]}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
