import { useLanguage } from "@/contexts/LanguageContext";
import { erpReasons, erpReasonsNote } from "@/data/erp";
import { ErpIcon } from "./erpIcons";
import ErpSectionHeading from "./ErpSectionHeading";

export default function ErpWhyGhazara() {
  const { lang } = useLanguage();

  return (
    <section id="why-ghazara" className="py-16 sm:py-20 lg:py-24 border-y border-border bg-card/60">
      <div className="content-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-4">
            <ErpSectionHeading
              eyebrow={{ ar: "لماذا غزارة", en: "Why Ghazara" }}
              title={{
                ar: "نبني النظام حول مؤسستك، لا العكس",
                en: "We build the system around your business, not the reverse",
              }}
              desc={{
                ar: "البرنامج وحده لا يصلح مؤسسة. ما يصلحها هو تصميم تشغيلي واضح، وتنفيذ منضبط، وشريك يعرف بيئة عملك.",
                en: "Software alone doesn't fix an organisation. Clear operating design, disciplined delivery and a partner who knows your market do.",
              }}
            />

            <div className="erp-quote mt-8">
              <p className="font-heading text-sm sm:text-base font-semibold leading-relaxed text-foreground">
                {erpReasonsNote[lang]}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {erpReasons.map((reason) => (
              <article key={reason.id} className="erp-card p-6 sm:p-7 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <span className="erp-icon-tile">
                    <ErpIcon name={reason.icon} className="w-5 h-5" />
                  </span>
                  <span className="font-heading text-2xl font-bold text-primary/20">
                    {reason.index}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {reason.title[lang]}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{reason.desc[lang]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
