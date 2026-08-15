import { WA_PHONE, type Language } from "@/types";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

interface FloatingWhatsAppWidgetProps {
  language: Language;
}

export default function FloatingWhatsAppWidget({ language }: FloatingWhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ar = language === "ar";

  const message = encodeURIComponent(
    ar
      ? "مرحباً مؤسسة غزارة، أود الاستفسار عن الخدمات التجارية والتسويقية."
      : "Hello Ghazara, I would like to inquire about your commercial and marketing services."
  );

  const greetingTitle = ar ? "مؤسسة غزارة للتجارة والتسويق" : "Ghazara Trading & Marketing";
  const greetingText = ar
    ? "مرحباً بك! كيف يمكننا مساعدتك في نمو أعمالك اليوم؟"
    : "Hello! How can we help grow your business today?";
  const chatButtonText = ar ? "ابدأ المحادثة عبر واتساب" : "Start WhatsApp Chat";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-3">
          <div className="bg-[#25D366] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#25D366]">
                  <MessageCircle size={18} />
                </span>
                <div>
                  <h4 className="text-sm font-bold leading-tight">{greetingTitle}</h4>
                  <span className="text-[10px] text-white/80">
                    {ar ? "عادةً نرد خلال دقائق" : "Typically replies in minutes"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-7 w-7 place-items-center rounded-full hover:bg-black/10"
                aria-label={ar ? "إغلاق" : "Close"}
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="rounded-xl bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
              {greetingText}
            </div>
            <a
              href={`https://wa.me/${WA_PHONE}?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-xs font-bold text-white transition hover:bg-[#20ba5a]"
            >
              <MessageCircle size={16} />
              {chatButtonText}
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_rgba(37,211,102,.4)] transition hover:scale-105 active:scale-95"
        aria-label={ar ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
      >
        <MessageCircle size={28} className="transition group-hover:scale-110" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-600 text-[9px] font-bold text-white items-center justify-center">
            1
          </span>
        </span>
      </button>
    </div>
  );
}
