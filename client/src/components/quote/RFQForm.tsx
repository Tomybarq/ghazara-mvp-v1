import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { rfqSectors, rfqServices, rfqRegions, contactData } from "@/data/contact";
import { trpc } from "@/lib/trpc";
import { Send, CheckCircle2, MessageCircle, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";

export interface RFQFormProps {
  initialSectorId?: string;
  initialServiceId?: string;
  initialRegionId?: string;
  compact?: boolean;
  className?: string;
  onSuccess?: () => void;
}

export default function RFQForm({
  initialSectorId,
  initialServiceId,
  initialRegionId,
  compact = false,
  className = "",
  onSuccess,
}: RFQFormProps) {
  const { lang, isAr } = useLanguage();

  const [sector, setSector] = useState(initialSectorId || rfqSectors[0].id);
  const [service, setService] = useState(initialServiceId || rfqServices[0].id);
  const [region, setRegion] = useState(initialRegionId || rfqRegions[0].id);
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Sync initial selections from URL query string if present
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const srvParam = params.get("service");
    const secParam = params.get("sector");
    const regParam = params.get("region");
    const prodParam = params.get("product");

    if (srvParam && rfqServices.some((s) => s.id === srvParam)) {
      setService(srvParam);
    }
    if (secParam && rfqSectors.some((s) => s.id === secParam)) {
      setSector(secParam);
    }
    if (regParam && rfqRegions.some((r) => r.id === regParam)) {
      setRegion(regParam);
    }
    if (prodParam && !notes) {
      setNotes(
        isAr
          ? `استفسار بخصوص المنتج/المنصة: ${prodParam}`
          : `Inquiry regarding product/platform: ${prodParam}`
      );
    }
  }, [isAr, notes]);

  const rfqMutation = trpc.rfq.submit.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      setFormError("");
      toast.success(
        isAr ? "تم تسجيل طلبك بنجاح في المنظومة" : "Your request was logged successfully in system"
      );
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: () => {
      toast.error(
        isAr
          ? "تعذر تسجيل الطلب حالياً، لكن يمكنك المتابعة عبر واتساب مباشرة."
          : "Could not log to system, but you can continue via WhatsApp directly."
      );
    },
  });

  const selectedSector = rfqSectors.find((s) => s.id === sector);
  const selectedService = rfqServices.find((s) => s.id === service);
  const selectedRegion = rfqRegions.find((r) => r.id === region);

  const formatWhatsAppMessage = () => {
    const header = isAr ? "*طلب عرض سعر جديد — غزارة*" : "*New RFQ — Ghazara*";
    const nameLabel = isAr ? "الاسم" : "Name";
    const compLabel = isAr ? "الشركة/النشاط" : "Company";
    const secLabel = isAr ? "القطاع" : "Sector";
    const srvLabel = isAr ? "الخدمة" : "Service";
    const regLabel = isAr ? "النطاق" : "Scope";
    const notesLabel = isAr ? "التفاصيل" : "Notes";

    return `${header}\n\n${nameLabel}: ${clientName.trim()}\n${compLabel}: ${companyName.trim()}\n${secLabel}: ${
      selectedSector?.label[lang] || sector
    }\n${srvLabel}: ${selectedService?.label[lang] || service}\n${regLabel}: ${
      selectedRegion?.label[lang] || region
    }${notes.trim() ? `\n${notesLabel}: ${notes.trim()}` : ""}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rfqMutation.isPending) return; // Prevent double submission

    if (!clientName.trim() || !companyName.trim()) {
      const errMsg = isAr
        ? "يرجى كتابة الاسم واسم المؤسسة أو الشركة للمتابعة."
        : "Please enter your name and company name to proceed.";
      setFormError(errMsg);
      toast.error(errMsg);
      return;
    }

    setFormError("");
    setShowConfirmSubmit(true);
  };

  const handleConfirmSubmit = () => {
    rfqMutation.mutate({
      sector,
      service,
      region,
      clientName: clientName.trim(),
      companyName: companyName.trim(),
      notes: notes.trim() || undefined,
    });
  };

  const handleOpenWhatsApp = () => {
    const msg = formatWhatsAppMessage();
    window.open(
      `https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (isSubmitted) {
    return (
      <div
        className={`rfq-success-card text-center space-y-6 ${
          compact ? "py-8" : "py-12"
        } ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
            {isAr ? "تم تسجيل طلبك بنجاح" : "Your Request Was Logged Successfully"}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            {isAr
              ? "شكراً لتواصلك معنا. تم حفظ طلبك بنجاح في قاعدة البيانات المؤسسية. يمكنك الآن إرسال نسخة من بيانات الطلب عبر WhatsApp لتسريع المتابعة مع المسؤول المختص."
              : "Thank you for reaching out. Your request has been securely logged. You can now send a copy via WhatsApp for accelerated executive dispatch."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="route-button bg-[#25D366] text-white hover:bg-[#20ba5a] w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isAr ? "إرسال النسخة عبر WhatsApp" : "Send Copy via WhatsApp"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setClientName("");
              setCompanyName("");
              setNotes("");
              setFormError("");
            }}
            className="route-button route-button-outline w-full sm:w-auto px-5 py-3 text-xs"
          >
            {isAr ? "إرسال طلب آخر" : "Submit Another Request"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      aria-busy={rfqMutation.isPending}
      noValidate
    >
      {formError && (
        <div
          id="rfq-form-error"
          role="alert"
          className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Sector Selection */}
        <div className="space-y-2">
          <label htmlFor="rfq-sector" className="block text-xs font-heading font-bold text-foreground">
            {isAr ? "قطاع الأعمال" : "Business Sector"} *
          </label>
          <select
            id="rfq-sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full h-12 rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
          >
            {rfqSectors.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label[lang]}
              </option>
            ))}
          </select>
        </div>

        {/* Service Selection */}
        <div className="space-y-2">
          <label htmlFor="rfq-service" className="block text-xs font-heading font-bold text-foreground">
            {isAr ? "الخدمة المطلوبة" : "Required Service"} *
          </label>
          <select
            id="rfq-service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full h-12 rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
          >
            {rfqServices.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label[lang]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Client Name */}
        <div className="space-y-2">
          <label htmlFor="rfq-client-name" className="block text-xs font-heading font-bold text-foreground">
            {isAr ? "اسم المسؤول / جهة الاتصال" : "Contact Person Name"} *
          </label>
          <input
            id="rfq-client-name"
            type="text"
            required
            aria-required="true"
            aria-describedby={formError ? "rfq-form-error" : undefined}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder={isAr ? "مثال: م. أحمد عبد الله" : "e.g. Adnan Al-Hanashi"}
            className="w-full h-12 rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
          />
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <label htmlFor="rfq-company-name" className="block text-xs font-heading font-bold text-foreground">
            {isAr ? "اسم المؤسسة / الشركة" : "Company / Enterprise Name"} *
          </label>
          <input
            id="rfq-company-name"
            type="text"
            required
            aria-required="true"
            aria-describedby={formError ? "rfq-form-error" : undefined}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder={isAr ? "مثال: مؤسسة النور للتجارة" : "e.g. Al-Noor Commerce Co."}
            className="w-full h-12 rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
          />
        </div>
      </div>

      {/* Region Selection */}
      <div className="space-y-2">
        <label htmlFor="rfq-region" className="block text-xs font-heading font-bold text-foreground">
          {isAr ? "النطاق الجغرافي للنشاط" : "Geographic Scope"} *
        </label>
        <select
          id="rfq-region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full h-12 rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition"
        >
          {rfqRegions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label[lang]}
            </option>
          ))}
        </select>
      </div>

      {/* Notes / Details */}
      <div className="space-y-2">
        <label htmlFor="rfq-notes" className="block text-xs font-heading font-bold text-foreground">
          {isAr ? "تفاصيل الطلب أو المشروع (اختياري)" : "Request Details or Notes (Optional)"}
        </label>
        <textarea
          id="rfq-notes"
          rows={compact ? 3 : 4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={
            isAr
              ? "اكتب نبذة عن حجم التوريد المطلوب، أو نطاق الحملة التسويقية، أو أي متطلبات خاصة..."
              : "Write details regarding procurement volume, marketing campaign scope, or specific requirements..."
          }
          className="w-full rounded-2xl border border-border bg-background p-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition resize-none"
        />
      </div>

      {rfqMutation.isPending && (
        <div className="rfq-loading-state" role="status" aria-live="polite">
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          <span>{isAr ? "جارٍ تسجيل طلبك في المنظومة…" : "Logging request in system…"}</span>
        </div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={rfqMutation.isPending}
          aria-disabled={rfqMutation.isPending}
          className="route-button route-button-primary flex-1 h-14 text-sm font-bold flex items-center justify-center gap-2 disabled:cursor-wait disabled:opacity-70"
        >
          {rfqMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>{isAr ? "جارٍ الإرسال…" : "Sending…"}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{isAr ? "إرسال طلب عرض السعر" : "Submit Request for Quote"}</span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={handleOpenWhatsApp}
          className="route-button bg-[#25D366] text-white hover:bg-[#20ba5a] h-14 px-6 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{isAr ? "إرسال مباشر عبر واتساب" : "Direct WhatsApp"}</span>
        </button>
      </div>

      <ConfirmationDialog
        open={showConfirmSubmit}
        onOpenChange={setShowConfirmSubmit}
        variant="info"
        loading={rfqMutation.isPending}
        title={isAr ? "تأكيد إرسال طلب عرض السعر" : "Confirm RFQ Submission"}
        description={
          isAr
            ? `هل تود إرسال طلب عرض السعر لقطاع (${selectedSector?.label[lang] || sector}) لصالح (${companyName})؟ سيتم تسجيل الطلب في المنظومة وإتاحة إرساله عبر WhatsApp.`
            : `Do you wish to submit the RFQ for (${selectedSector?.label[lang] || sector}) on behalf of (${companyName})? It will be logged in the system and ready for WhatsApp dispatch.`
        }
        confirmLabel={isAr ? "نعم، إرسال الطلب" : "Yes, Submit Request"}
        cancelLabel={isAr ? "مراجعة البيانات" : "Review Details"}
        onConfirm={handleConfirmSubmit}
      />
    </form>
  );
}
