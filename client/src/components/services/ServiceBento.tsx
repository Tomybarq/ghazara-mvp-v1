import type { Language, Service } from "@/types";
import { ArrowUpLeft, BarChart3, Braces, Megaphone, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const serviceIcons: Record<Service["id"], LucideIcon> = {
  representation: Store,
  digital: Megaphone,
  identity: Braces,
  research: BarChart3,
};

const sizeStyles: Record<Service["size"], string> = {
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  standard: "",
};

interface ServiceBentoProps {
  service: Service;
  language: Language;
  onRequest: () => void;
}

export default function ServiceBento({ service, language, onRequest }: ServiceBentoProps) {
  const Icon = serviceIcons[service.id];
  const label = language === "ar" ? "اطلب الحل" : "Request solution";

  return (
    <article className={`group relative flex min-h-[225px] flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_18px_50px_rgba(37,28,48,.07)] transition duration-300 hover:-translate-y-1 hover:border-[#5e3b95]/45 hover:shadow-[0_24px_60px_rgba(94,59,149,.14)] ${sizeStyles[service.size]}`}>
      <div className="absolute left-0 top-0 h-20 w-20 border-b border-r border-[#f19844]/45" />
      <div className="relative flex items-center justify-between">
        <span className="font-heading text-xs font-bold tracking-[.18em] text-[#a980db]">{service.number} / SOLUTION</span>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#5e3b95]/10 text-[#5e3b95] dark:bg-[#a980db]/12 dark:text-[#d9c1ff]"><Icon size={20} /></span>
      </div>
      <div className="relative mt-auto pt-10">
        <h3 className="max-w-lg text-2xl font-bold leading-tight">{service.title[language]}</h3>
        <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">{service.description[language]}</p>
        <button type="button" onClick={onRequest} className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#5e3b95] dark:text-[#d9c1ff]">
          {label}<ArrowUpLeft size={15} className="transition group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}
