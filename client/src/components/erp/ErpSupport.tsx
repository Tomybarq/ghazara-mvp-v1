import { useLanguage } from "@/contexts/LanguageContext";
import { erpSupport, erpSupportNote } from "@/data/erp";
import { Check } from "lucide-react";
import { ErpIcon } from "./erpIcons";
import ErpSectionHeading from "./ErpSectionHeading";

export default function ErpSupport() {
  const { lang } = useLanguage();

  return (
    <section id="support" className="py-16 sm:py-20 lg:py-24">
      <div className="content-wrap">
        <ErpSectionHeading
          eyebrow={{ ar: "الاستشارات والدعم", en: "Consulting & support" }}
          title={{
            ar: "علاقة تشغيلية تستمر بعد الإطلاق",
            en: "An operating relationship that continues after go-live",
          }}
          desc={{
            ar: "قبل الشراء، وأثناء التنفيذ، وبعد الإطلاق — فريق واحد مسؤول عن أن يعمل النظام في مؤسستك.",
            en: "Before purchase, during delivery and after go-live — one team accountable for the system working inside your organisation.",
          }}
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {erpSupport.map((item) => (
            <article key={item.id} className="erp-card p-6 sm:p-7 flex flex-col gap-4">
              <span className="erp-icon-tile">
                <ErpIcon name={item.icon} className="w-5 h-5" />
              </span>

              <div className="space-y-2">
                <h3 className="font-heading text-lg font-bold text-foreground">{item.title[lang]}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc[lang]}</p>
              </div>

              <ul className="mt-auto space-y-2 pt-4 border-t border-border/70">
                {item.points.map((point) => (
                  <li
                    key={point.en}
                    className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                  >
                    <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{point[lang]}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="erp-quote mt-8">
          <p className="font-heading text-sm sm:text-base font-semibold leading-relaxed text-foreground">
            {erpSupportNote[lang]}
          </p>
        </div>
      </div>
    </section>
  );
}
