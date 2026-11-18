import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import ErpHero from "@/components/erp/ErpHero";
import ErpChallenges from "@/components/erp/ErpChallenges";
import ErpWhyGhazara from "@/components/erp/ErpWhyGhazara";
import ErpModules from "@/components/erp/ErpModules";
import ErpIntegrations from "@/components/erp/ErpIntegrations";
import ErpIndustries from "@/components/erp/ErpIndustries";
import ErpMethodology from "@/components/erp/ErpMethodology";
import ErpSupport from "@/components/erp/ErpSupport";
import ErpCta from "@/components/erp/ErpCta";
import "@/components/erp/erp.css";

export default function ErpPage() {
  const { isAr } = useLanguage();

  return (
    <div className="erp-page site-shell min-h-screen flex flex-col">
      <SEOHead pageKey="erp" />
      <Header />

      <main className="flex-1">
        <div className="content-wrap pt-8">
          <SiteBreadcrumb
            items={[
              {
                label: isAr ? "الحلول الرقمية" : "Digital Solutions",
                href: "/services",
              },
              { label: isAr ? "أنظمة ERP" : "ERP Systems" },
            ]}
          />
        </div>

        <ErpHero />

        <ErpChallenges />
        <ErpWhyGhazara />
        <ErpModules />
        <ErpIntegrations />
        <ErpIndustries />
        <ErpMethodology />
        <ErpSupport />
        <ErpCta />
      </main>

      <Footer />
    </div>
  );
}
