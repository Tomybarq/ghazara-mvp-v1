import { useLanguage } from "@/contexts/LanguageContext";
import { erpHero, erpCta } from "@/data/erp";
import { contactData } from "@/data/contact";
import { ArrowLeft, ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function ErpHero() {
  const { lang, isAr } = useLanguage();
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const whatsappLink = `https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(
    erpCta.whatsappMessage[lang]
  )}`;

  return (
    <section id="erp-hero" className="erp-hero">
      <div className="content-wrap grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-7 space-y-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-[0.6875rem] sm:text-xs font-heading font-bold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
            {erpHero.eyebrow[lang]}
          </span>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-[3.15rem] font-bold leading-[1.18] tracking-tight">
            {erpHero.titleLead[lang]}{" "}
            <span className="erp-hero-highlight">{erpHero.titleAccent[lang]}</span>{" "}
            {erpHero.titleTail[lang]}
          </h1>

          <p className="max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            {erpHero.lead[lang]}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-1">
            <Link
              href="/request-quote?service=digital"
              className="route-button route-button-primary h-13 px-7 text-sm font-bold flex items-center justify-center gap-2.5"
            >
              <span>{erpHero.primaryCta[lang]}</span>
              <Arrow className="w-4 h-4" />
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="route-button route-button-outline h-13 px-6 text-sm font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <span>{erpHero.secondaryCta[lang]}</span>
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2.5 pt-1 text-xs text-muted-foreground">
            {erpHero.badges.map((badge) => (
              <li key={badge.en} className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                <span>{badge[lang]}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Minimal geometric visualisation */}
        <div className="lg:col-span-5">
          <div className="erp-viz" aria-hidden="true">
            <p className="erp-viz-caption">{erpHero.viz.caption[lang]}</p>

            <span className="erp-viz-ring is-outer" />
            <span className="erp-viz-ring is-mid" />

            <div className="erp-viz-core">
              <span>{erpHero.viz.centerLabel[lang]}</span>
            </div>

            {erpHero.viz.nodes.map((node, index) => (
              <span key={node.en} className={`erp-viz-chip is-${["a", "b", "c", "d", "e"][index]}`}>
                {node[lang]}
              </span>
            ))}

            <div className="erp-viz-bars">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>

      {/* Proof metrics */}
      <div className="content-wrap mt-12 lg:mt-16">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border bg-border">
          {erpHero.metrics.map((metric) => (
            <div key={metric.label.en} className="bg-card px-5 py-5 sm:px-6 sm:py-6">
              <dt className="font-heading text-2xl sm:text-3xl font-bold text-primary">
                {metric.value}
              </dt>
              <dd className="mt-1.5 text-xs sm:text-[0.8125rem] text-muted-foreground leading-snug">
                {metric.label[lang]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
