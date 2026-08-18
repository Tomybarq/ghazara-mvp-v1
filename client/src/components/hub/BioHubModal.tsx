import type { Language } from "@/types";
import { contactData } from "@/data/contact";
import { BriefcaseBusiness, ExternalLink, MessageCircle, Send, X } from "lucide-react";
import { Link } from "wouter";

interface BioHubModalProps {
  open: boolean;
  language: Language;
  onClose?: () => void;
  onRequest?: () => void;
  mode?: "overlay" | "page";
}

const quickMessage = encodeURIComponent(
  "مرحباً غزارة، أود الحصول على استشارة تجارية وتسويقية مباشرة."
);

export default function BioHubModal({
  open,
  language,
  onClose,
  mode = "overlay",
}: BioHubModalProps) {
  if (!open) return null;

  const ar = language === "ar";
  const items = [
    {
      icon: BriefcaseBusiness,
      title: ar ? "دليل الخدمات والقطاعات" : "Services & sectors directory",
      hint: ar ? "استكشف مصفوفة الخدمات" : "Explore services matrix",
      action: "directory" as const,
    },
    {
      icon: Send,
      title: ar ? "طلب عرض سعر أو استشارة" : "Request a quote or advisory",
      hint: ar ? "نموذج RFQ الموحد" : "Unified RFQ form",
      action: "request" as const,
    },
    {
      icon: MessageCircle,
      title: ar ? "استشارة تجارية مباشرة" : "Direct commercial consultation",
      hint: "WhatsApp",
      action: "whatsapp" as const,
    },
  ];

  const content = (
    <section className="relative w-full max-w-5xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#242424] p-5 text-white shadow-[0_40px_110px_rgba(0,0,0,.5)] sm:p-9">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 87% 14%, rgba(241,152,68,.22), transparent 23%), radial-gradient(circle at 10% 88%, rgba(94,59,149,.42), transparent 29%)",
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="eyebrow">GHAZARA / BUSINESS-HUB</p>
            <h1 className="mt-4 text-3xl font-bold tracking-[-.04em] sm:text-5xl">
              {ar ? "بوابة غزارة الرقمية" : "Ghazara Digital Hub"}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              {ar
                ? "اختر نقطة اتصال واحدة، ثم دعنا نرتّب بقية المسار معاً."
                : "Choose one connection point, then let us shape the rest of the route together."}
            </p>
          </div>
          {mode === "overlay" && onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10 cursor-pointer"
              aria-label={ar ? "إغلاق" : "Close"}
            >
              <X size={20} />
            </button>
          ) : (
            <Link
              href="/"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10"
              aria-label={ar ? "العودة للرئيسية" : "Back home"}
            >
              <X size={20} />
            </Link>
          )}
        </div>

        <div className="mt-9 grid gap-3 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            if (item.action === "directory") {
              return (
                <Link
                  key={item.action}
                  href="/services"
                  className="group rounded-3xl border border-white/10 bg-white/[.055] p-5 transition hover:-translate-y-1 hover:border-[#f19844]/60 hover:bg-white/[.08]"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f19844]/15 text-[#f7b46f]">
                      <Icon size={19} />
                    </span>
                    <ExternalLink size={16} className="text-white/45" />
                  </div>
                  <h2 className="mt-9 text-lg font-bold">{item.title}</h2>
                  <p className="mt-1 text-sm text-white/50">{item.hint}</p>
                </Link>
              );
            }
            if (item.action === "request") {
              return (
                <Link
                  key={item.action}
                  href="/request-quote"
                  className="group rounded-3xl border border-white/10 bg-white/[.055] p-5 transition hover:-translate-y-1 hover:border-[#f19844]/60 hover:bg-white/[.08]"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f19844]/15 text-[#f7b46f]">
                      <Icon size={19} />
                    </span>
                    <ExternalLink size={16} className="text-white/45" />
                  </div>
                  <h2 className="mt-9 text-lg font-bold">{item.title}</h2>
                  <p className="mt-1 text-sm text-white/50">{item.hint}</p>
                </Link>
              );
            }
            return (
              <a
                key={item.action}
                href={`https://wa.me/${contactData.whatsapp.number}?text=${quickMessage}`}
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl border border-white/10 bg-white/[.055] p-5 transition hover:-translate-y-1 hover:border-[#f19844]/60 hover:bg-white/[.08]"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f19844]/15 text-[#f7b46f]">
                    <Icon size={19} />
                  </span>
                  <ExternalLink size={16} className="text-white/45" />
                </div>
                <h2 className="mt-9 text-lg font-bold">{item.title}</h2>
                <p className="mt-1 text-sm text-white/50">{item.hint}</p>
              </a>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col justify-between gap-4 rounded-3xl border border-[#f19844]/25 bg-[#f19844]/[.07] p-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-bold">{ar ? "تواصل مع الإدارة التنفيذية" : "Executive Management"}</p>
            <p className="mt-1 text-sm text-white/55">{contactData.phone.display}</p>
          </div>
          <a
            href={`https://wa.me/${contactData.whatsapp.number}`}
            target="_blank"
            rel="noreferrer"
            className="route-button route-button-primary h-11 px-5 text-sm inline-flex items-center gap-2"
          >
            <span>{ar ? "فتح WhatsApp" : "Open WhatsApp"}</span>
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </section>
  );

  if (mode === "page") {
    return (
      <main
        className="relative min-h-screen overflow-hidden bg-[#18171a] px-4 py-6 sm:px-8 sm:py-10"
        dir={ar ? "rtl" : "ltr"}
      >
        <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center">
          {content}
        </div>
      </main>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={ar ? "بوابة غزارة الرقمية" : "Ghazara Digital Hub"}
    >
      {content}
    </div>
  );
}
