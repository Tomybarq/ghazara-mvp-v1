import { useLanguage } from "@/contexts/LanguageContext";
import { erpChallenges } from "@/data/erp";
import { AlertCircle, ArrowDown, CheckCircle2 } from "lucide-react";
import ErpSectionHeading from "./ErpSectionHeading";

export default function ErpChallenges() {
  const { lang, isAr } = useLanguage();

  return (
    <section id="challenges" className="py-16 sm:py-20 lg:py-24">
      <div className="content-wrap">
        <ErpSectionHeading
          eyebrow={{ ar: "التحديات والحلول", en: "Challenges & solutions" }}
          title={{
            ar: "كل تحدٍ تشغيلي له حل مباشر داخل النظام",
            en: "Every operational challenge has a direct answer inside the system",
          }}
          desc={{
            ar: "هذه الفجوات الست تتكرر في معظم المؤسسات التجارية قبل التحول إلى نظام ERP — وهذه هي الطريقة التي نغلقها بها.",
            en: "These six gaps recur in most trading organisations before an ERP move — and this is how we close each one.",
          }}
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {erpChallenges.map((pair, index) => (
            <article key={pair.id} className="erp-card p-6 sm:p-7 flex flex-col">
              <span className="font-mono text-[0.6875rem] font-bold text-muted-foreground/70">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="mt-3 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground/70" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-muted-foreground">{pair.challenge[lang]}</p>
              </div>

              <div className="my-4 flex items-center gap-2" aria-hidden="true">
                <span className="h-px flex-1 bg-border" />
                <ArrowDown className="w-3.5 h-3.5 text-amber-500" />
              </div>

              <div className="flex items-start gap-3 mt-auto">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-sm leading-relaxed font-medium text-foreground">
                  {pair.solution[lang]}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs sm:text-sm text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
          {isAr
            ? "التشخيص يسبق البرنامج: نراجع واقع عملياتك أولاً، ثم نبني الحل المناسب لها."
            : "Diagnosis before software: we review how you actually operate, then build the right fit."}
        </p>
      </div>
    </section>
  );
}
