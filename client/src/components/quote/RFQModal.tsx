import { trpc } from "@/lib/trpc";
import { SECTORS, SERVICES, WA_PHONE, YEMEN_REGIONS, type Language, type RFQDraft, type SectorId, type ServiceId } from "@/types";
import { ArrowLeft, Check, ChevronLeft, Loader2, Send, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface RFQModalProps {
  open: boolean;
  language: Language;
  initialSectorId?: SectorId | null;
  initialServiceId?: ServiceId | null;
  onClose: () => void;
}

const emptyDraft: RFQDraft = { sectorId: null, serviceId: null, regionId: null, clientName: "", companyName: "", notes: "" };

export default function RFQModal({ open, language, initialSectorId = null, initialServiceId = null, onClose }: RFQModalProps) {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<RFQDraft>(emptyDraft);
  const [validationError, setValidationError] = useState("");
  const [saveNotice, setSaveNotice] = useState("");
  const submitRequest = trpc.rfq.submit.useMutation();
  const ar = language === "ar";

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setValidationError("");
    setSaveNotice("");
    setDraft({ ...emptyDraft, sectorId: initialSectorId, serviceId: initialServiceId });
  }, [initialSectorId, initialServiceId, open]);

  const selected = useMemo(() => ({
    sector: SECTORS.find((item) => item.id === draft.sectorId),
    service: SERVICES.find((item) => item.id === draft.serviceId),
    region: YEMEN_REGIONS.find((item) => item.id === draft.regionId),
  }), [draft.regionId, draft.sectorId, draft.serviceId]);

  if (!open) return null;

  const labels = ar ? {
    eyebrow: "GHZ / RFQ", title: "لنرسم طلبك التجاري بدقة.", close: "إغلاق", previous: "السابق", next: "التالي", send: "إرسال الطلب عبر WhatsApp", sectors: "اختر القطاع", services: "ما الخدمة المطلوبة؟", region: "أين يقع نشاطك؟", details: "أخبرنا عن جهة الاتصال", name: "الاسم", company: "اسم الشركة أو النشاط", notes: "ملاحظات مختصرة (اختياري)", review: "راجع المسار قبل الإرسال", required: "اختر خياراً واحداً للمتابعة.", detailsRequired: "يرجى كتابة الاسم واسم الشركة أو النشاط.", saved: "تم حفظ نسخة من الطلب لدينا. يمكنك الآن إرساله عبر WhatsApp.", notSaved: "تعذّر حفظ النسخة، لكن يمكنك إرسال الطلب عبر WhatsApp مباشرة.", step: "الخطوة", of: "من", sector: "القطاع", service: "الخدمة", city: "المدينة / المنطقة", summary: "ملخص الطلب", sending: "جارٍ تجهيز الرسالة…",
  } : {
    eyebrow: "GHZ / RFQ", title: "Let’s define your commercial request precisely.", close: "Close", previous: "Back", next: "Next", send: "Send request via WhatsApp", sectors: "Choose your sector", services: "Which service do you need?", region: "Where is your business based?", details: "Tell us about the contact", name: "Your name", company: "Company or business name", notes: "Short notes (optional)", review: "Review your route before sending", required: "Choose one option to continue.", detailsRequired: "Please enter your name and company or business name.", saved: "A copy of your request was saved. You can now send it through WhatsApp.", notSaved: "We could not save this copy, but you can still send it directly through WhatsApp.", step: "Step", of: "of", sector: "Sector", service: "Service", city: "City / region", summary: "Request summary", sending: "Preparing your message…",
  };

  const setValue = <K extends keyof RFQDraft>(key: K, value: RFQDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));

  const validCurrentStep = () => {
    if (step === 1 && !draft.sectorId) return labels.required;
    if (step === 2 && !draft.serviceId) return labels.required;
    if (step === 3 && !draft.regionId) return labels.required;
    if (step === 4 && (!draft.clientName.trim() || !draft.companyName.trim())) return labels.detailsRequired;
    return "";
  };

  const next = () => {
    const error = validCurrentStep();
    if (error) { setValidationError(error); return; }
    setValidationError("");
    setStep((current) => Math.min(5, current + 1));
  };

  const message = `*${ar ? "طلب خدمة جديد — غزارة" : "New service request — Ghazara"}*\n\n${labels.name}: ${draft.clientName}\n${labels.company}: ${draft.companyName}\n${labels.sector}: ${selected.sector?.title[language] ?? "-"}\n${labels.service}: ${selected.service?.title[language] ?? "-"}\n${labels.city}: ${selected.region?.label[language] ?? "-"}${draft.notes.trim() ? `\n${labels.notes}: ${draft.notes.trim()}` : ""}`;

  const submit = async () => {
    setSaveNotice("");
    try {
      const result = await submitRequest.mutateAsync({
        sector: draft.sectorId ?? "",
        service: draft.serviceId ?? "",
        region: draft.regionId ?? "",
        clientName: draft.clientName.trim(),
        companyName: draft.companyName.trim(),
        notes: draft.notes.trim() || undefined,
      });
      setSaveNotice(result.saved ? labels.saved : labels.notSaved);
    } catch {
      setSaveNotice(labels.notSaved);
    }
    window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/75 p-3 backdrop-blur-md sm:p-6" role="dialog" aria-modal="true" aria-label={labels.title}>
      <div className="mx-auto flex min-h-full max-w-3xl items-center py-5"><section className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#242424] text-white shadow-[0_36px_100px_rgba(0,0,0,.52)]"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_87%_11%,rgba(241,152,68,.17),transparent_22%),radial-gradient(circle_at_4%_88%,rgba(94,59,149,.42),transparent_32%)]" /><div className="relative p-5 sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">{labels.eyebrow}</p><h1 className="mt-3 max-w-xl text-2xl font-bold tracking-[-.04em] sm:text-4xl">{labels.title}</h1></div><button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-white/75 hover:bg-white/10" aria-label={labels.close}><X size={19} /></button></div>
        <div className="mt-7 flex items-center gap-2" aria-label={`${labels.step} ${step} ${labels.of} 5`}>{[1, 2, 3, 4, 5].map((item) => <span key={item} className={`h-1.5 flex-1 rounded-full ${item <= step ? "bg-[#f19844]" : "bg-white/10"}`} />)}</div><p className="mt-2 text-xs text-white/45">{labels.step} {step} {labels.of} 5</p>
        <div className="mt-7 min-h-[280px]">
          {step === 1 && <div><h2 className="text-xl font-bold">{labels.sectors}</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{SECTORS.map((sector) => <button key={sector.id} type="button" onClick={() => setValue("sectorId", sector.id)} className={`rounded-2xl border p-4 text-right transition ${draft.sectorId === sector.id ? "border-[#f19844] bg-[#f19844]/12" : "border-white/10 bg-white/[.035] hover:border-white/30"}`}><span className="text-xs text-[#f4ae64]">{sector.number}</span><strong className="mt-2 block text-base">{sector.title[language]}</strong><span className="mt-1 block text-xs leading-5 text-white/50">{sector.description[language]}</span></button>)}</div></div>}
          {step === 2 && <div><h2 className="text-xl font-bold">{labels.services}</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{SERVICES.map((service) => <button key={service.id} type="button" onClick={() => setValue("serviceId", service.id)} className={`rounded-2xl border p-4 text-right transition ${draft.serviceId === service.id ? "border-[#f19844] bg-[#f19844]/12" : "border-white/10 bg-white/[.035] hover:border-white/30"}`}><span className="text-xs text-[#f4ae64]">{service.number}</span><strong className="mt-2 block text-base">{service.title[language]}</strong><span className="mt-1 block text-xs leading-5 text-white/50">{service.description[language]}</span></button>)}</div></div>}
          {step === 3 && <div><h2 className="text-xl font-bold">{labels.region}</h2><div className="mt-5 flex flex-wrap gap-2">{YEMEN_REGIONS.map((region) => <button key={region.id} type="button" onClick={() => setValue("regionId", region.id)} className={`rounded-full border px-4 py-3 text-sm font-bold transition ${draft.regionId === region.id ? "border-[#f19844] bg-[#f19844] text-[#25170d]" : "border-white/15 bg-white/[.035] text-white/80 hover:border-white/35"}`}>{region.label[language]}</button>)}</div></div>}
          {step === 4 && <div><h2 className="text-xl font-bold">{labels.details}</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="block text-sm font-bold">{labels.name}<input value={draft.clientName} onChange={(event) => setValue("clientName", event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-white/12 bg-white/[.055] px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f19844]" /></label><label className="block text-sm font-bold">{labels.company}<input value={draft.companyName} onChange={(event) => setValue("companyName", event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-white/12 bg-white/[.055] px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f19844]" /></label></div><label className="mt-4 block text-sm font-bold">{labels.notes}<textarea value={draft.notes} onChange={(event) => setValue("notes", event.target.value)} rows={4} className="mt-2 w-full resize-none rounded-xl border border-white/12 bg-white/[.055] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#f19844]" /></label></div>}
          {step === 5 && <div><h2 className="text-xl font-bold">{labels.review}</h2><div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm sm:grid-cols-2"><div><span className="text-white/45">{labels.sector}</span><strong className="mt-1 block">{selected.sector?.title[language]}</strong></div><div><span className="text-white/45">{labels.service}</span><strong className="mt-1 block">{selected.service?.title[language]}</strong></div><div><span className="text-white/45">{labels.city}</span><strong className="mt-1 block">{selected.region?.label[language]}</strong></div><div><span className="text-white/45">{labels.company}</span><strong className="mt-1 block">{draft.companyName}</strong></div></div>{saveNotice && <p className="mt-4 rounded-xl border border-[#f19844]/25 bg-[#f19844]/10 p-3 text-sm text-[#ffd1a1]">{saveNotice}</p>}</div>}
        </div>
        {validationError && <p className="mt-4 text-sm text-[#f7b46f]">{validationError}</p>}<div className="mt-7 flex items-center justify-between gap-3 border-t border-white/10 pt-5">{step > 1 ? <button type="button" onClick={() => { setValidationError(""); setStep((current) => current - 1); }} className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-bold text-white/70 hover:bg-white/10"><ChevronLeft size={17} className="rtl:rotate-180" />{labels.previous}</button> : <span />}{step < 5 ? <button type="button" onClick={next} className="route-button route-button-primary h-11 px-5 text-sm">{labels.next}<ArrowLeft size={16} className="rtl:rotate-180" /></button> : <button type="button" onClick={submit} disabled={submitRequest.isPending} className="route-button route-button-primary h-11 px-5 text-sm disabled:cursor-wait disabled:opacity-70">{submitRequest.isPending ? <><Loader2 size={16} className="animate-spin" />{labels.sending}</> : <><Send size={16} />{labels.send}</>}</button>}</div>
      </div></section></div>
    </div>
  );
}
