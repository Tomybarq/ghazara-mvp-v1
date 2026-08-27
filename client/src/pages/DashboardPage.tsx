/**
 * DashboardPage — the gated /dashboard route.
 *
 * Rendered only behind `requireAuth`, so by the time it mounts a user is
 * guaranteed to exist. It shows a minimal but production-shaped overview:
 * the signed-in identity, role, and a sign-out action that clears the session
 * and returns to /auth. Kept intentionally lean — business widgets plug in here.
 */
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { LogOut, ShieldCheck, Mail, User as UserIcon } from "lucide-react";
import { ADMIN_EMAILS } from "@shared/const";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/seo/SEOHead";

export default function DashboardPage() {
  const { user } = useAuth();
  const { isAr, t } = useLanguage();
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();

  const logout = trpc.auth.logout.useMutation({
    onSuccess: async () => {
      // Drop the cached session so the guard immediately sees the user as
      // anonymous, then route back to the auth page.
      await utils.auth.me.invalidate();
      setLocation("/auth", { replace: true });
    },
  });

  const stats = [
    { label: t("الحسابات", "Accounts"), value: "1", icon: UserIcon },
    { label: t("الأذونات", "Permissions"), value: user?.role === "admin" ? "Admin" : "User", icon: ShieldCheck },
  ];

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        pageKey="home"
        customTitle={isAr ? "لوحة التحكم | غزارة" : "Dashboard | Ghazara"}
        customDescription={isAr ? "لوحة التحكم المؤسسية" : "Institutional dashboard"}
      />

      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="content-wrap flex items-center justify-between py-4">
          <h1 className="text-lg font-heading font-bold">
            {t("لوحة التحكم", "Dashboard")}
          </h1>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              {t("الرئيسية", "Home")}
            </Link>
            <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground">
              {t("الملف الشخصي", "Profile")}
            </Link>
            {(user?.role === "admin" || ADMIN_EMAILS.has(user?.email ?? "")) && (
              <Link href="/admin" className="text-sm text-primary hover:text-primary/80 font-medium">
                {t("لوحة المشرف", "Admin")}
              </Link>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
            >
              <LogOut className="size-4" />
              {t("تسجيل الخروج", "Sign out")}
            </Button>
          </div>
        </div>
      </header>

      <div className="content-wrap py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
              <UserIcon className="size-6" />
            </div>
            <div>
              <p className="font-heading font-semibold text-lg">
                {user?.name ?? (isAr ? "مستخدم" : "User")}
              </p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="size-3.5" />
                {user?.email ?? "—"}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * (i + 1), ease: "easeOut" }}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <s.icon className="size-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-heading font-bold">{s.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
