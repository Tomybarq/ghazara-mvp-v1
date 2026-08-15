import type { Language, Sector } from "@/types";
import { ArrowUpLeft, Factory, Leaf, ShoppingBag, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const sectorIcons: Record<Sector["id"], LucideIcon> = {
  agriculture: Leaf,
  consumer: ShoppingBag,
  industrial: Factory,
  business: TrendingUp,
};

const accentStyles: Record<Sector["accent"], string> = {
  amber: "from-[#f19844]/26 via-[#242424] to-[#242424]",
  iris: "from-[#5e3b95]/34 via-[#242424] to-[#242424]",
  amethyst: "from-[#8a4e91]/32 via-[#242424] to-[#242424]",
  slate: "from-[#4a596b]/36 via-[#242424] to-[#242424]",
};

interface SectorCardProps {
  sector: Sector;
  language: Language;
  onRequest: () => void;
}

export default function SectorCard({ sector, language, onRequest }: SectorCardProps) {
  const Icon = sectorIcons[sector.id];
  const requestLabel = language === "ar" ? "ابدأ من هذا القطاع" : "Start from this sector";

  return (
    <article className={`group relative min-h-[255px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-gradient-to-br ${accentStyles[sector.accent]} p-6 text-white transition duration-300 hover:-translate-y-1 hover:border-[#f19844]/55 hover:shadow-[0_24px_70px_rgba(0,0,0,.28)]`}>
      <div className="absolute -left-7 -top-10 text-[9rem] font-heading font-bold leading-none text-white/[.045]">{sector.number}</div>
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="font-heading text-xs tracking-[.18em] text-[#f5bd7c]">{sector.number} / HUB</span>
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/[.07] text-[#f4a65b]"><Icon size={20} /></span>
        </div>
        <div className="mt-auto">
          <h3 className="max-w-xs text-2xl font-bold leading-tight">{sector.title[language]}</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">{sector.description[language]}</p>
          <button type="button" onClick={onRequest} className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#f7c48d] transition hover:text-white">
            {requestLabel}<ArrowUpLeft size={15} className="transition group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
