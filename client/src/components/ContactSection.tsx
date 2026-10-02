import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { siteContent } from "../data/siteContent";
import { trpc } from "../lib/trpc";
import { Send, CheckCircle2, AlertCircle, MessageSquare, ArrowRight, ArrowLeft } from "lucide-react";

export const ContactSection: React.FC = () => {
  const { lang, dir, isAr } = useLanguage();
  const content = siteContent[lang].contact;

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "trading",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitRfq = trpc.rfq.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setErrorMessage(null);
    },
    onError: (err) => {
      console.error("RFQ submission failed:", err);
      // Even if offline DB fail-safe triggers, provide a clear fallback or graceful retry
      setErrorMessage(content.form.errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !formData.phone) {
      setErrorMessage(isAr ? "يرجى تعبئة كافة الحقول الإلزامية." : "Please fill in all required fields.");
      return;
    }

    setErrorMessage(null);
    submitRfq.mutate({
      sector: "Commercial & Marketing",
      service: formData.service,
      region: isAr ? "المملكة العربية السعودية والخليج" : "Saudi Arabia & GCC",
      clientName: formData.name,
      companyName: formData.company,
      notes: `[Email: ${formData.email}] [Phone: ${formData.phone}] - ${formData.message}`,
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-[#27272A]/8">
      <div className="editorial-container">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="inline-block text-xs font-bold text-[#F97316] uppercase tracking-wider mb-2">
            {content.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27272A] tracking-tight mb-3">
            {content.title}
          </h2>
          <p className="text-sm sm:text-base text-[#52525B]">
            {content.subtitle}
          </p>
        </div>

        <div className="bg-white border border-[#27272A]/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-[#F97316]/10 text-[#F97316] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#27272A]">
                {content.form.successTitle}
              </h3>
              <p className="text-sm text-[#52525B] max-w-md mx-auto">
                {content.form.successMessage}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    company: "",
                    email: "",
                    phone: "",
                    service: "trading",
                    message: "",
                  });
                }}
                className="mt-4 inline-flex text-xs font-semibold text-[#F97316] hover:underline"
              >
                {isAr ? "إرسال طلب آخر" : "Submit another inquiry"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#27272A] mb-1.5">
                    {content.form.name} <span className="text-[#F97316]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={content.form.namePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF7ED]/50 border border-[#27272A]/12 text-sm text-[#27272A] placeholder:text-[#71717A]/60 focus:bg-white focus:outline-hidden focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#27272A] mb-1.5">
                    {content.form.company} <span className="text-[#F97316]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={content.form.companyPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF7ED]/50 border border-[#27272A]/12 text-sm text-[#27272A] placeholder:text-[#71717A]/60 focus:bg-white focus:outline-hidden focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#27272A] mb-1.5">
                    {content.form.email} <span className="text-[#F97316]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={content.form.emailPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF7ED]/50 border border-[#27272A]/12 text-sm text-[#27272A] placeholder:text-[#71717A]/60 focus:bg-white focus:outline-hidden focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#27272A] mb-1.5">
                    {content.form.phone} <span className="text-[#F97316]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={content.form.phonePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF7ED]/50 border border-[#27272A]/12 text-sm text-[#27272A] placeholder:text-[#71717A]/60 focus:bg-white focus:outline-hidden focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#27272A] mb-1.5">
                  {content.form.service}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF7ED]/50 border border-[#27272A]/12 text-sm text-[#27272A] focus:bg-white focus:outline-hidden focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 transition-all"
                >
                  <option value="trading">{content.form.serviceOptions.trading}</option>
                  <option value="marketing">{content.form.serviceOptions.marketing}</option>
                  <option value="growth">{content.form.serviceOptions.growth}</option>
                  <option value="other">{content.form.serviceOptions.other}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#27272A] mb-1.5">
                  {content.form.message}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={content.form.messagePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF7ED]/50 border border-[#27272A]/12 text-sm text-[#27272A] placeholder:text-[#71717A]/60 focus:bg-white focus:outline-hidden focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitRfq.isPending}
                className="w-full btn-primary text-sm py-3 justify-center shadow-md disabled:opacity-60 cursor-pointer"
              >
                <span>
                  {submitRfq.isPending ? content.form.submitting : content.form.submit}
                </span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Direct WhatsApp Connectivity */}
          <div className="mt-8 pt-6 border-t border-[#27272A]/8 text-center">
            <p className="text-xs text-[#71717A] mb-3">
              {content.whatsappNotice}
            </p>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 text-xs font-bold transition-all border border-[#25D366]/30"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{content.whatsappCta}</span>
              {dir === "rtl" ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
