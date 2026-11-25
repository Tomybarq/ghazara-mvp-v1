import { useLanguage } from "@/contexts/LanguageContext";
import { erpIntegrations } from "@/data/erp";
import { ErpIcon } from "./erpIcons";
import ErpSectionHeading from "./ErpSectionHeading";

export default function ErpIntegrations() {
  const { lang, isAr } = useLanguage();

  return (
    <section
      id="integrations"
      className="py-16 sm:py-20 lg:py-24 border-y border-border bg-card/60"
    >
      <div className="content-wrap">
        <ErpSectionHeading
          eyebrow={{ ar: "التكاملات الرقمية", en: "Digital integrations" }}
          title={{
            ar: "نظامك لا يعمل وحده — نوصله بما تستخدمه فعلاً",
            en: "Your system doesn't work alone — we connect it to what you already use",
          }}
          desc={{
            ar: "نربط ERP بالمدفوعات والمتاجر والبنوك والفوترة والأجهزة وقنوات التواصل، حتى تبقى البيانات متدفقة دون إدخال يدوي.",
            en: "We connect ERP to payments, stores, banks, invoicing, devices and communication channels so data keeps flowing without manual entry.",
          }}
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border bg-border">
          {erpIntegrations.map((integration) => (
            <article
              key={integration.id}
              className="group bg-card p-6 transition-colors hover:bg-muted/40"
            >
              <span className="erp-icon-tile is-amber">
                <ErpIcon name={integration.icon} className="w-5 h-5" />
              </span>
              <h3 className="mt-4 font-heading text-sm sm:text-base font-bold text-foreground">
                {integration.title[lang]}
              </h3>
              <p className="mt-1.5 text-xs sm:text-[0.8125rem] leading-relaxed text-muted-foreground">
                {integration.desc[lang]}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {isAr
            ? "أي نظام خارج القائمة يمكن ربطه عبر واجهات API موثّقة، بشرط توفر صلاحية الوصول لدى مزوّد الخدمة."
            : "Any system outside this list can be connected through documented APIs, provided the provider grants access."}
        </p>
      </div>
    </section>
  );
}
