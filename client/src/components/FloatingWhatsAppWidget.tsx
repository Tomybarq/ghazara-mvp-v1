import { useLanguage } from "@/contexts/LanguageContext";
import { contactData } from "@/data/contact";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export default function FloatingWhatsAppWidget() {
  const { lang, isAr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const prefill = isAr
    ? contactData.whatsapp.defaultPrefillAr
    : contactData.whatsapp.defaultPrefillEn;

  const phone = contactData.whatsapp.number;

  const greetingTitle = isAr ? "مؤسسة غزارة للتجارة والتسويق" : "Ghazara Trading & Marketing";
  const greetingText = isAr
    ? "مرحباً بك! كيف يمكننا مساعدتك في نمو وتطوير أعمالك اليوم؟"
    : "Welcome! How can we support and scale your business today?";
  const chatButtonText = isAr ? "ابدأ المحادثة عبر واتساب" : "Start WhatsApp Chat";
  const tooltipText = isAr ? "تواصل مباشر مع الإدارة" : "Direct WhatsApp Chat";

  return (
    <div className={`fixed bottom-6 ${isAr ? "left-6" : "right-6"} z-50 flex flex-col ${isAr ? "items-start" : "items-end"}`}>
      {isOpen && (
        <div className="mb-4 w-80 overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
          <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#128C7E] shadow-sm">
                  <MessageCircle size={20} />
                </span>
                <div>
                  <h4 className="text-xs font-heading font-bold leading-tight">{greetingTitle}</h4>
                  <span className="text-[10px] text-white/85">
                    {isAr ? "استجابة مباشرة وموثوقة" : "Direct & verified response"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-7 w-7 place-items-center rounded-full hover:bg-black/15 transition-colors"
                aria-label={isAr ? "إغلاق" : "Close"}
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="rounded-2xl bg-muted/60 p-3.5 text-xs leading-relaxed text-muted-foreground border border-border/50">
              {greetingText}
            </div>
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(prefill)}`}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 text-xs font-heading font-bold text-white transition-all duration-200 hover:bg-[#20ba5a] hover:shadow-lg active:scale-[0.98]"
            >
              <MessageCircle size={16} />
              <span>{chatButtonText}</span>
            </a>
          </div>
        </div>
      )}

      <div className="relative flex items-center">
        {/* Tooltip */}
        <div
          role="tooltip"
          aria-hidden={!isHovered}
          className={`absolute ${isAr ? "left-16" : "right-16"} whitespace-nowrap rounded-2xl bg-card border border-border px-3.5 py-2 text-xs font-heading font-bold text-foreground shadow-xl transition-all duration-300 pointer-events-none ${
            isHovered ? "opacity-100 translate-x-0 scale-100" : `opacity-0 ${isAr ? "-translate-x-2" : "translate-x-2"} scale-95`
          }`}
        >
          {tooltipText}
        </div>

        {/* Floating Action Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_rgba(37,211,102,.45)] transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label={isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
        >
          <MessageCircle size={28} className="transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-700 text-[9px] font-bold text-white items-center justify-center">
              ✓
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
