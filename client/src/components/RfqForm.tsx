import { useState } from "react";
import { content } from "@/data/content";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface RfqFormProps {
  lang: "ar" | "en";
}

export default function RfqForm({ lang }: RfqFormProps) {
  const t = content[lang].rfq;
  const isAr = lang === "ar";

  const [sector, setSector] = useState("retail");
  const [service, setService] = useState("trade");
  const [region, setRegion] = useState("ye");
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const rfqMutation = trpc.rfq.submit.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success(t.successTitle);
    },
    onError: () => {
      toast.error(t.errorMsg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !companyName.trim()) {
      toast.error(t.requiredMsg);
      return;
    }

    rfqMutation.mutate({
      sector,
      service,
      region,
      clientName: clientName.trim(),
      companyName: companyName.trim(),
      notes: notes.trim() || undefined,
    });
  };

  return (
    <section id="rfq" className="py-24 relative overflow-hidden bg-gradient-to-b from-card/40 to-background">
      <div className="content-wrap relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex justify-center">
            <span className="eyebrow">{t.eyebrow}</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
            {t.title}
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl">
          {isSubmitted ? (
            <div className="rfq-success-card text-center py-12 space-y-6" role="status" aria-live="polite">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <CheckCircle2 className="w-10 h-10" />
              </div>
                <h3 className="font-heading font-bold text-2xl text-foreground">
                {t.successTitle}
              </h3>
                <p className="text-muted-foreground max-w-md mx-auto leading-7">
                {t.successMsg}
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSector("retail");
                  setService("trade");
                  setRegion("ye");
                  setClientName("");
                  setCompanyName("");
                  setNotes("");
                }}
                className="route-button route-button-primary px-8 py-3 text-sm"
              >
                {t.successAction}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" aria-busy={rfqMutation.isPending}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t.sectorLabel}
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {t.sectors.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t.serviceLabel}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {t.servicesList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Region */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t.regionLabel}
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {t.regions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Client Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t.clientNameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={isAr ? "مثال: م. أحمد عبد الله" : "e.g. John Smith"}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t.companyNameLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={isAr ? "مثال: مؤسسة النور للتجارة" : "e.g. Al-Noor Trading Co."}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t.notesLabel}
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isAr ? "اكتب نبذة عن مشروعك أو استفسارك..." : "Write a brief description of your project..."}
                  className="w-full bg-background border border-border rounded-xl p-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              {rfqMutation.isPending && (
                <div className="rfq-loading-state" role="status" aria-live="polite">
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>{t.loadingMsg}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={rfqMutation.isPending}
                aria-disabled={rfqMutation.isPending}
                className="w-full route-button route-button-primary py-4 text-base flex items-center justify-center gap-2 shadow-lg disabled:cursor-wait disabled:opacity-70"
              >
                {rfqMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    <span>{t.loadingMsg}</span>
                  </>
                ) : (
                  <>
                    <span>{t.submitBtn}</span>
                    {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
