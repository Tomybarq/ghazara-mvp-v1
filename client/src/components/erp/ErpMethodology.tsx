import { useLanguage } from "@/contexts/LanguageContext";
import { erpPhases } from "@/data/erp";
import { Clock } from "lucide-react";
import ErpSectionHeading from "./ErpSectionHeading";

export default function ErpMethodology() {
  const { lang, isAr } = useLanguage();

  return (
    <section
      id="methodology"
      className="py-16 sm:py-20 lg:py-24 border-y border-border bg-card/60"
    >
      <div className="content-wrap">
        <ErpSectionHeading
          eyebrow={{ ar: "منهجية التنفيذ", en: "Implementation methodology" }}
          title={{
            ar: "أربع مراحل واضحة من التشخيص إلى التحسين",
            en: "Four clear phases from diagnosis to optimisation",
          }}
          desc={{
            ar: "كل مرحلة لها نطاق وتسليمات واختبار قبول قبل الانتقال — تعرف دائماً أين أنت وماذا يأتي بعد ذلك.",
            en: "Each phase has a scope, deliverables and acceptance test before moving on — you always know where you are and what comes next.",
          }}
        />

        <ol className="erp-phase-track mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-5">
          {erpPhases.map((phase) => (
            <li key={phase.id} className="relative flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="erp-phase-step">{phase.step}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[0.6875rem] font-semibold text-muted-foreground">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {phase.duration[lang]}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading text-base font-bold text-foreground">{phase.title[lang]}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{phase.desc[lang]}</p>
              </div>

              <p className="mt-auto rounded-xl bg-muted/50 px-3.5 py-2.5 text-[0.6875rem] font-semibold text-foreground/80 leading-relaxed">
                <span className="text-primary font-bold">{isAr ? "المُخرَج: " : "Output: "}</span>
                {phase.output[lang]}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
