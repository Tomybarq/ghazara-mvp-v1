import { useLanguage } from "@/contexts/LanguageContext";
import { footerNavLinks } from "@/data/navigation";
import { contactData } from "@/data/contact";
import { companyData } from "@/data/company";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Link } from "wouter";

export default function Footer() {
  const { lang, isAr } = useLanguage();

  return (
    <footer className="bg-card border-t border-border py-16 text-card-foreground">
      <div className="content-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
            aria-label={isAr ? "الرئيسية - مؤسسة غزارة" : "Home - Ghazara"}
          >
            <Logo variant="header" size="md" />
          </Link>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            {companyData.tagline[lang]}
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              {isAr ? "سجل تجاري ومؤسسي معتمد" : "Verified Corporate Entity"}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-base text-foreground">
            {isAr ? "الاستكشاف والمسارات" : "Navigation"}
          </h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-primary transition-colors inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm">
                {isAr ? "من نحن" : "About Us"}
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm">
                {isAr ? "الخدمات" : "Services"}
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-primary transition-colors inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm">
                {isAr ? "المنتجات والمنصات" : "Products"}
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-primary transition-colors inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm">
                {isAr ? "المشاريع" : "Projects"}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-primary transition-colors inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm">
                {isAr ? "المدونة والرؤى" : "Insights & Blog"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Governance */}
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-base text-foreground">
            {isAr ? "الحوكمة والشفافية" : "Governance & Legal"}
          </h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link href="/request-quote" className="hover:text-primary transition-colors font-medium text-primary inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm">
                {isAr ? "طلب عرض سعر (RFQ)" : "Request Quote"}
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-primary transition-colors inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm">
                {isAr ? "الأسئلة الشائعة" : "FAQ"}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-primary transition-colors inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm">
                {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-primary transition-colors inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm">
                {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
              </Link>
            </li>
            <li>
              <Link href="/hub" className="hover:text-primary transition-colors inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm">
                {isAr ? "بوابة الأعمال (Hub)" : "Business Hub"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-base text-foreground">
            {isAr ? "معلومات التواصل" : "Contact Information"}
          </h4>
          <ul className="space-y-3.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span className="leading-snug">{contactData.address.display[lang]}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <a
                href={`mailto:${contactData.email.address}`}
                className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
              >
                {contactData.email.address}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <a
                href={`tel:${contactData.phone.value}`}
                className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                dir="ltr"
              >
                {contactData.phone.display}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
              <a
                href={`https://wa.me/${contactData.whatsapp.number}?text=${encodeURIComponent(
                  isAr
                    ? contactData.whatsapp.defaultPrefillAr
                    : contactData.whatsapp.defaultPrefillEn
                )}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#25D366] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#25D366] rounded-sm"
                dir="ltr"
              >
                {contactData.whatsapp.display}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="content-wrap mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
        <p>
          {isAr
            ? `جميع الحقوق محفوظة © ${new Date().getFullYear()} ${companyData.legalName.ar}.`
            : `All Rights Reserved © ${new Date().getFullYear()} ${companyData.legalName.en}.`}
        </p>
        <p className="mt-2 sm:mt-0">
          Powered by <span className="font-semibold text-primary">Ghazara Systems</span>
        </p>
      </div>
    </footer>
  );
}
