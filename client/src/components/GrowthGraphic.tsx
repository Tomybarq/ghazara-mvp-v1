import React from "react";
import { Sparkles } from "lucide-react";

interface GrowthGraphicProps {
  badge: string;
  isAr: boolean;
}

export const GrowthGraphic: React.FC<GrowthGraphicProps> = React.memo(({ badge, isAr }) => {
  return (
    <div className="mt-12 sm:mt-16 bg-white border border-[#27272A]/8 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-radial from-[#FDBA74]/15 via-transparent to-transparent opacity-70 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left/Start Graphic Narrative */}
        <div className="space-y-3 max-w-md text-center md:text-start">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F97316] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#27272A]">
            {isAr
              ? "منظومة متكاملة لربط العرض بالطلب وتحفيز النمو التجاري"
              : "An Integrated Engine Connecting Supply, Demand & Market Expansion"}
          </h3>
          <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
            {isAr
              ? "نجمع بين كفاءة التوريد التجاري والتسويق الموجه بالبيانات لفتح مسارات بيع مستدامة لعلامتك التجارية."
              : "Unifying commercial trade execution with data-driven demand generation to construct predictable sales pipelines."}
          </p>
        </div>

        {/* Right/End Abstract SVG Network Nodes */}
        <div className="w-full md:w-auto flex items-center justify-center">
          <svg
            viewBox="0 0 320 180"
            className="w-full max-w-[280px] sm:max-w-[320px] h-auto drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Background Grid Lines */}
            <path d="M20 90 H300" stroke="#FDBA74" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <path d="M160 20 V160" stroke="#FDBA74" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

            {/* Growth Wave Curve */}
            <path
              d="M30 140 C 90 140, 110 90, 160 80 C 210 70, 240 35, 290 30"
              stroke="url(#growthGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Nodes with Glow */}
            <circle cx="30" cy="140" r="6" fill="#5E3B95" />
            <circle cx="160" cy="80" r="7" fill="#F97316" className="pulse-node" />
            <circle cx="290" cy="30" r="8" fill="#F97316" />
            <circle cx="290" cy="30" r="14" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Node Labels */}
            <text x="30" y="165" textAnchor="middle" fontSize="9" fill="#71717A" fontFamily="sans-serif">
              {isAr ? "السوق" : "Market"}
            </text>
            <text x="160" y="105" textAnchor="middle" fontSize="9" fill="#71717A" fontFamily="sans-serif">
              {isAr ? "الفرصة" : "Opportunity"}
            </text>
            <text x="290" y="58" textAnchor="middle" fontSize="9" fill="#F97316" fontWeight="bold" fontFamily="sans-serif">
              {isAr ? "النمو" : "Growth"}
            </text>

            <defs>
              <linearGradient id="growthGradient" x1="30" y1="140" x2="290" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5E3B95" />
                <stop offset="0.55" stopColor="#F97316" />
                <stop offset="1" stopColor="#FDBA74" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
});

GrowthGraphic.displayName = "GrowthGraphic";
