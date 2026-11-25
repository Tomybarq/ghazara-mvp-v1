import { useLanguage } from "@/contexts/LanguageContext";
import { erpCta } from "@/data/erp";
import { contactData } from "@/data/contact";
import { ArrowLeft, ArrowRight, Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function ErpCta() {
  const { lang, isAr } = useLanguage();
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const whatsappLink = `https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(
    erpCta.whatsappMessage[lang]
  )}`;

  return (
    <section id="erp-cta" className="pb-20 sm:pb-24 lg:pb-28">
      <div className="content-wrap">
        <div className="erp-band">
          <div className="erp-band-content grid grid-cols-1 lg:grid-cols-12 gap-10 items-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[0.6875rem] font-heading font-bold text-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                {erpCta.eyebrow[lang]}
              </span>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.5rem] font-bold leading-tight text-white">
                {erpCta.title[lang]}
              </h2>

              <p className="max-w-xl text-sm sm:text-base leading-relaxed text-white/80">
                {erpCta.desc[lang]}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/request-quote?service=digital" className="erp-band-cta is-primary">
                  <span>{erpCta.primaryCta[lang]}</span>
                  <Arrow className="w-4 h-4" />
                </Link>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="erp-band-cta is-ghost"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>{erpCta.secondaryCta[lang]}</span>
                </a>
              </div>

              <p className="text-[0.6875rem] sm:text-xs text-white/60 leading-relaxed pt-1">
                {erpCta.note[lang]}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/20 bg-white/8 p-6 backdrop-blur-sm space-y-4">
                <p className="inline-flex items-center gap-2 text-[0.6875rem] font-bold text-amber-200">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  {isAr ? "قنوات مباشرة مع فريق الحلول الرقمية" : "Direct channels to the digital solutions team"}
                </p>

                <ul className="space-y-3 text-sm text-white">
                  <li>
                    <a
                      href={`tel:${contactData.phone.value}`}
                      className="flex items-center gap-3 hover:text-amber-200 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                      <span dir="ltr">{contactData.phone.display}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${contactData.email.address}`}
                      className="flex items-center gap-3 hover:text-amber-200 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                      <span dir="ltr">{contactData.email.address}</span>
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-white/70 text-xs leading-relaxed">
                    <MessageCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      {isAr
                        ? "واتساب الأعمال متاح خلال ساعات العمل: السبت – الخميس، 8:00 ص – 5:00 م."
                        : "Business WhatsApp during working hours: Sat – Thu, 8:00 AM – 5:00 PM."}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
