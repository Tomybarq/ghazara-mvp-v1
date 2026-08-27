/**
 * ProfilePage — the gated /profile route.
 *
 * Lets an authenticated user view their account details (role, login method,
 * member since, last sign-in) and update their personal information (name and
 * email). Rendered only behind `requireAuth`, so a user is guaranteed to exist
 * on mount.
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  KeyRound,
  LogOut,
  Mail,
  Save,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOHead from "@/components/seo/SEOHead";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuth();
  const { isAr, t } = useLanguage();
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Sync local form state whenever the cached user changes (initial load or
  // after a refetch) so the inputs always reflect the server truth.
  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
  }, [user?.name, user?.email]);

  const updateProfile = trpc.auth.updateProfile.useMutation({
    onSuccess: async (updatedUser) => {
      await utils.auth.me.invalidate();
      toast.success(t("تم تحديث الملف الشخصي", "Profile updated successfully"));
      // Keep the form in sync with the freshly-fetched user.
      setName(updatedUser.name ?? "");
      setEmail(updatedUser.email ?? "");
    },
    onError: (error) => {
      toast.error(error.message || t("فشل التحديث", "Failed to update profile"));
    },
  });

  const logout = trpc.auth.logout.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      setLocation("/auth", { replace: true });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate({ name, email });
  };

  const detailItems = [
    {
      icon: ShieldCheck,
      label: t("الدور", "Role"),
      value: user?.role === "admin" ? "Admin" : "User",
    },
    {
      icon: KeyRound,
      label: t("طريقة تسجيل الدخول", "Login method"),
      value: user?.loginMethod ?? (isAr ? "غير معروف" : "Unknown"),
    },
    {
      icon: CalendarDays,
      label: t("عضو منذ", "Member since"),
      value: user?.createdAt ? format(new Date(user.createdAt), "MMM d, yyyy") : "—",
    },
    {
      icon: Clock,
      label: t("آخر تسجيل دخول", "Last sign-in"),
      value: user?.lastSignedIn ? format(new Date(user.lastSignedIn), "MMM d, yyyy") : "—",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        pageKey="home"
        customTitle={isAr ? "الملف الشخصي | غزارة" : "Profile | Ghazara"}
        customDescription={isAr ? "إدارة الملف الشخصي" : "Manage your profile"}
      />

      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="content-wrap flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4 rtl:rotate-180" />
              {t("لوحة التحكم", "Dashboard")}
            </Link>
          </div>
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
      </header>

      <div className="content-wrap py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h1 className="mb-1 text-2xl font-heading font-bold">
            {t("الملف الشخصي", "Profile")}
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            {t(
              "عرض تفاصيل حسابك وتحديث معلوماتك الشخصية",
              "View your account details and update your personal information",
            )}
          </p>

          {/* Identity banner */}
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
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

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Personal information form */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-4 font-heading font-semibold text-lg">
                {t("المعلومات الشخصية", "Personal Information")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {t("الاسم", "Name")}
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? "اسمك" : "Your name"}
                    required
                    disabled={updateProfile.isPending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t("البريد الإلكتروني", "Email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    disabled={updateProfile.isPending}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={updateProfile.isPending}
                  className="w-full"
                >
                  <Save className="size-4" />
                  {updateProfile.isPending
                    ? t("جارٍ الحفظ...", "Saving...")
                    : t("حفظ التغييرات", "Save changes")}
                </Button>
              </form>
            </div>

            {/* Account details (read-only) */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-4 font-heading font-semibold text-lg">
                {t("تفاصيل الحساب", "Account Details")}
              </h2>
              <dl className="space-y-4">
                {detailItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3"
                  >
                    <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                      <item.icon className="size-4 text-muted-foreground" />
                      {item.label}
                    </dt>
                    <dd className="text-sm font-medium capitalize">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
