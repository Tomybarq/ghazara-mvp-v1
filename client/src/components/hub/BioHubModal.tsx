import type { Language } from "@/types";
import { WA_PHONE } from "@/types";
import { ArrowLeft, BriefcaseBusiness, ExternalLink, MessageCircle, Send, X } from "lucide-react";
import { Link } from "wouter";

interface BioHubModalProps {
  open: boolean;
  language: Language;
  onClose?: () => void;
  onRequest: () => void;
  mode?: "overlay" | "page";
}

const quickMessage = encodeURIComponent("مرحباً غزارة، أود الحصول على استشارة تسويقية مباشرة.");

export default function BioHubModal({ open, language, onClose, onRequest, mode = "overlay" }: BioHubModalProps) {
  if (!open) return null;

  const ar = language === "ar";
  const items = [
    { icon: BriefcaseBusiness, title: ar ? "دليل الخدمات والقطاعات" : "Services & sectors directory", hint: ar ? "استكشف نقاط الدخول" : "Explore access points", action: "directory" as const },
    { icon: Send, title: ar ? "طلب تمثيل تجاري" : "Commercial representation request", hint: ar ? "نموذج RFQ مختصر" : "Concise RFQ form", action: "request" as const },
    { icon: MessageCircle, title: ar ? "استشارة تسويقية مباشرة" : "Direct marketing consultation", hint: "WhatsApp", action: "whatsapp" as const },
  ];

  const content = (
    <section className="relative w-full max-w-5xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#242424] p-5 text-white shadow-[0_40px_110px_rgba(0,0,0,.5)] sm:p-9">
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(circle at 87% 14%, rgba(241,152,68,.22), transparent 23%), radial-gradient(circle at 10% 88%, rgba(94,59,149,.42), transparent 29%)" }} />
      <div className="relative">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="eyebrow">GHAZARA / BIO-HUB</p>
            <h1 className="mt-4 text-3xl font-bold tracking-[-.04em] sm:text-5xl">{ar ? "بوابة غزارة الرقمية" : "Ghazara Digital Bio-Hub"}</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">{ar ? "اختر نقطة اتصال واحدة، ثم دعنا نرتّب بقية المسار معاً." : "Choose one connection point, then let us shape the rest of the route together."}</p>
          </div>
          {mode === "overlay" && onClose ? <button type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10" aria-label={ar ? "إغلاق" : "Close"}><X size={20} /></button> : <Link href="/" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10" aria-label={ar ? "العودة للرئيسية" : "Back home"}><X size={20} /></Link>}
        </div>

        <div className="mt-9 grid gap-3 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            if (item.action === "directory") {
              return <Link key={item.action} href="/#sectors" className="group rounded-3xl border border-white/10 bg-white/[.055] p-5 transition hover:-translate-y-1 hover:border-[#f19844]/60 hover:bg-white/[.08]"><div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f19844]/15 text-[#f7b46f]"><Icon size={19} /></span><ExternalLink size={16} className="text-white/45" /></div><h2 className="mt-9 text-lg font-bold">{item.title}</h2><p className="mt-1 text-sm text-white/50">{item.hint}</p></Link>;
            }
            if (item.action === "request") {
              return <button key={item.action} type="button" onClick={onRequest} className="group rounded-3xl border border-white/10 bg-white/[.055] p-5 text-right transition hover:-translate-y-1 hover:border-[#f19844]/60 hover:bg-white/[.08]"><div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f19844]/15 text-[#f7b46f]"><Icon size={19} /></span><ArrowLeft size={16} className="text-white/45" /></div><h2 className="mt-9 text-lg font-bold">{item.title}</h2><p className="mt-1 text-sm text-white/50">{item.hint}</p></button>;
            }
            return <a key={item.action} href={`https://wa.me/${WA_PHONE}?text=${quickMessage}`} target="_blank" rel="noreferrer" className="group rounded-3xl border border-white/10 bg-white/[.055] p-5 transition hover:-translate-y-1 hover:border-[#f19844]/60 hover:bg-white/[.08]"><div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f19844]/15 text-[#f7b46f]"><Icon size={19} /></span><ExternalLink size={16} className="text-white/45" /></div><h2 className="mt-9 text-lg font-bold">{item.title}</h2><p className="mt-1 text-sm text-white/50">{item.hint}</p></a>;
          })}
        </div>

        <div className="mt-5 flex flex-col justify-between gap-4 rounded-3xl border border-[#f19844]/25 bg-[#f19844]/[.07] p-5 sm:flex-row sm:items-center">
          <div><p className="font-bold">{ar ? "تواصل مع الإدارة" : "Contact management"}</p><p className="mt-1 text-sm text-white/55">+967 784 984 528</p></div>
          <a href={`https://wa.me/${WA_PHONE}`} target="_blank" rel="noreferrer" className="route-button route-button-primary h-11 px-5 text-sm">{ar ? "فتح WhatsApp" : "Open WhatsApp"}<MessageCircle size={16} /></a>
        </div>
      </div>
    </section>
  );

  if (mode === "page") return <main className="relative min-h-screen overflow-hidden bg-[#18171a] px-4 py-6 sm:px-8 sm:py-10" dir={ar ? "rtl" : "ltr"}><svg className="pointer-events-none absolute inset-0 h-full w-full opacity-35" viewBox="0 0 1280 720" fill="none" aria-hidden="true"><path d="M-20 570C240 522 211 358 458 330C693 303 725 125 1320 84" stroke="#F19844" strokeDasharray="8 16" /><circle cx="458" cy="330" r="5" fill="#F19844" /><circle cx="725" cy="125" r="5" fill="#F19844" /></svg><div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center">{content}</div></main>;

  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={ar ? "بوابة غزارة الرقمية" : "Ghazara Digital Bio-Hub"}>{content}</div>;
}
