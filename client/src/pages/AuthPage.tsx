/**
 * AuthPage — the /auth route.
 *
 * Composition: a full-viewport split layout. The motion-graphics background
 * (AuthBackground) fills the screen; the auth card sits centered on top. The
 * page itself owns navigation (reads the optional `redirect` query param and
 * routes there after a successful auth), while the form stays route-agnostic.
 *
 * The card uses an entrance animation (fade + scale) so the auth surface feels
 * intentional rather than abruptly appearing.
 */
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Logo } from "@/components/ui/Logo";
import AuthBackground from "@/components/auth/AuthBackground";
import AuthForm from "@/components/auth/AuthForm";

export default function AuthPage() {
  const { isAr } = useLanguage();
  const [, setLocation] = useLocation();

  // The guard appends `?redirect=<path>` when it bounces an anonymous visitor.
  // After auth we send them back there, falling back to /dashboard. Reading the
  // raw search string avoids depending on wouter's path-only location value.
  const redirect = new URLSearchParams(window.location.search).get("redirect");

  const handleAuthenticated = () => {
    setLocation(redirect || "/dashboard", { replace: true });
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <AuthBackground />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-3xl border border-border/40 bg-card/80 backdrop-blur-xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <Logo variant="header" size="header" priority />
            <h1 className="mt-5 text-2xl font-heading font-bold text-foreground">
              {isAr ? "بوابة الدخول" : "Welcome back"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground text-center">
              {isAr
                ? "سجّل الدخول للوصول إلى لوحة التحكم المؤسسية"
                : "Sign in to access your dashboard"}
            </p>
          </div>

          <AuthForm onAuthenticated={handleAuthenticated} />
        </div>
      </motion.div>
    </main>
  );
}
