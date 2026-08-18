import { useLanguage } from "@/contexts/LanguageContext";
import { companyData } from "@/data/company";
import { contactData } from "@/data/contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SiteBreadcrumb from "@/components/ui/SiteBreadcrumb";
import { Shield, Target, Award, CheckCircle2, ArrowRight, UserCheck, MapPin, Building2 } from "lucide-react";
import { Link } from "wouter";

export default function AboutPage() {
  const { lang, isAr } = useLanguage();

  return (
    <div className="site-shell bg-background text-foreground min-h-screen flex flex-col">
      <SEOHead pageKey="about" />
      <Header />

      <main className="flex-1 pt-32 pb-20">
        {/* Hero Section */}
        <section className="content-wrap py-10">
          <SiteBreadcrumb items={[{ label: isAr ? "من نحن" : "About Us" }]} />
          
          <div className="max-w-3xl">
            <span className="eyebrow inline-block mb-4">
              {isAr ? "الهوية والمؤسسة" : "Corporate Identity"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              {isAr
                ? "مؤسسة غزارة: ريادة موثوقة في التجارة والحلول التسويقية"
                : "Ghazara: Trusted Leadership in Trade & Marketing Solutions"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {companyData.storyP1[lang]}
            </p>
          </div>
        </section>

        {/* Story & Institutional Vision */}
        <section className="content-wrap py-12 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading">
                {isAr ? "قصتنا ورؤيتنا الاستراتيجية" : "Our Story & Strategic Vision"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {companyData.storyP2[lang]}
              </p>
              
              <div className="space-y-4 pt-4">
                {companyData.pillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-card/60 border border-border p-4 rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-sm text-foreground">{pillar.title[lang]}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{pillar.desc[lang]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Vision & Mission Cards */}
              <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">{isAr ? "رؤيتنا" : "Our Vision"}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{companyData.vision[lang]}</p>
                  </div>
                </div>
                <hr className="border-border" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">{isAr ? "رسالتنا" : "Our Mission"}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{companyData.mission[lang]}</p>
                  </div>
                </div>
              </div>

              {/* Verified Leadership & Entity Box */}
              <div className="bg-muted/40 border border-border rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">
                      {isAr ? "الكيان المؤسسي المعتمد" : "Verified Corporate Structure"}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {companyData.legalName[lang]}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <UserCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>{isAr ? "المدير التنفيذي: أ/ عدنان الحنشي" : "Executive Director: Adnan Al-Hanashi"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-[#E6833E] shrink-0" />
                    <span>{isAr ? "المقر: سيئون - حضرموت" : "HQ: Seiyun, Hadramout"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="content-wrap py-16 border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow inline-block mb-2">{isAr ? "مبادئ العمل" : "Operating Principles"}</span>
            <h2 className="text-3xl font-bold font-heading">{isAr ? "قيمنا الجوهرية" : "Our Core Values"}</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              {isAr ? "المبادئ الراسخة التي تحكم كل شراكة وعقد تجاري نبرمه." : "The core principles governing every partnership and contract we execute."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyData.values.map((val) => (
              <div key={val.id} className="bg-card border border-border rounded-3xl p-8 shadow-xs space-y-4 hover:border-primary/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg">{val.title[lang]}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{val.desc[lang]}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-card border border-border rounded-3xl p-10 max-w-3xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold font-heading">
              {isAr ? "جاهزون للتعاون وبناء شراكة استراتيجية؟" : "Ready to Build a Strategic Partnership?"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              {isAr
                ? "تواصل مع فريق الإدارة مباشرة لمناقشة فرص التمثيل التجاري وحلول الأعمال."
                : "Reach out to management directly to explore commercial representation and business solutions."}
            </p>
            <div className="pt-2">
              <Link
                href="/request-quote"
                className="route-button route-button-primary px-8 py-3.5 text-sm font-bold inline-flex items-center gap-2"
              >
                <span>{isAr ? "طلب عرض سعر أو شراكة" : "Request RFQ or Partnership"}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
