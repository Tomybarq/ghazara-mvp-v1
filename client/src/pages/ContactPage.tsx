import { useState } from "react";
import { content } from "@/data/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { WA_PHONE } from "@/types";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function ContactPage() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const t = content[lang];
  const ar = lang === "ar";

  const [sector, setSector] = useState("retail");
  const [service, setService] = useState("trade");
  const [region, setRegion] = useState("ye");
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const rfqMutation = trpc.rfq.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success(t.rfq.successMsg);
    },
    onError: () => {
      toast.error(ar ? "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى." : "Error submitting request, please try again.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !companyName) {
      toast.error(ar ? "يرجى تعبئة الحقول الإجبارية." : "Please fill in required fields.");
      return;
    }
    rfqMutation.mutate({
      sector,
      service,
      region,
      clientName,
      companyName,
      notes,
    });
  };

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col" dir={ar ? "rtl" : "ltr"}>
      <Header lang={lang} setLang={setLang} />

      <main className="flex-1 pt-32 pb-20">
        <section className="content-wrap py-12">
          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">{t.nav.contact}</span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {ar ? "تواصل معنا أو اطلب عرض سعر فوراً" : "Contact Us or Request a Quote Instantly"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.rfq.subtitle}
            </p>
          </div>
        </section>

        <section className="content-wrap py-12 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Column */}
            <div className="space-y-8 bg-card border border-border rounded-3xl p-8 shadow-xs">
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">{ar ? "معلومات التواصل المباشر" : "Direct Contact Info"}</h3>
                <p className="text-sm text-muted-foreground">{ar ? "نحن مستعدون للإجابة على كافة استفساراتكم التجارية والتقنية." : "We are ready to answer all your commercial and technical inquiries."}</p>
              </div>

              <ul className="space-y-6 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <span className="font-bold block">{ar ? "العنوان المؤسسي" : "Corporate Address"}</span>
                    <span className="text-muted-foreground">{t.footer.address}</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="font-bold block">{ar ? "البريد الإلكتروني" : "Email Address"}</span>
                    <a href={`mailto:${t.footer.email}`} className="text-primary hover:underline">{t.footer.email}</a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="font-bold block">{ar ? "رقم الهاتف / واتساب" : "Phone / WhatsApp"}</span>
                    <span className="text-muted-foreground" dir="ltr">{t.footer.phone}</span>
                  </div>
                </li>
              </ul>

              <div className="pt-6 border-t border-border">
                <a
                  href={`https://wa.me/${WA_PHONE}`}
                  target="_blank"
                  rel="noreferrer"
                  className="route-button route-button-primary w-full h-12 flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{ar ? "محادثة فورية عبر واتساب" : "Instant WhatsApp Chat"}</span>
                </a>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-xs">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">{ar ? "تم إرسال طلبك بنجاح!" : "Request Sent Successfully!"}</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">{t.rfq.successMsg}</p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="route-button route-button-outline px-6 py-2.5 text-xs mt-4"
                  >
                    {ar ? "إرسال طلب آخر" : "Submit Another Request"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-heading font-bold text-xl mb-6">{ar ? "نموذج طلب عرض سعر / استشارة" : "RFQ / Consultation Form"}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold mb-2">{t.rfq.sectorLabel}</label>
                      <select
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm"
                      >
                        {t.rfq.sectors.map((s) => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-2">{t.rfq.serviceLabel}</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm"
                      >
                        {t.rfq.servicesList.map((s) => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold mb-2">{t.rfq.clientNameLabel} *</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder={ar ? "الاسم الكريم" : "Your Name"}
                        className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-2">{t.rfq.companyNameLabel} *</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder={ar ? "اسم المؤسسة أو الشركة" : "Company Name"}
                        className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">{t.rfq.regionLabel}</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full h-12 rounded-xl border border-border bg-background px-4 text-sm"
                    >
                      {t.rfq.regions.map((r) => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">{t.rfq.notesLabel}</label>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={ar ? "اكتب تفاصيل طلبك أو مشروعك هنا..." : "Write project details or notes here..."}
                      className="w-full rounded-xl border border-border bg-background p-4 text-sm resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={rfqMutation.isPending}
                    className="route-button route-button-primary w-full h-14 text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{rfqMutation.isPending ? (ar ? "جاري الإرسال..." : "Submitting...") : t.rfq.submitBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
