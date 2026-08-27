/**
 * AdminDashboardPage — the gated /admin route (admin-only via RLS).
 *
 * Shows recent user activities (from the activity log), account changes, a
 * full users table, and an "add user" action restricted to admins. The route
 * is wrapped in `requireAdmin`, and the tRPC procedures it calls are
 * `adminProcedure`-guarded server-side as well.
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Activity,
  ArrowLeft,
  KeyRound,
  LogOut,
  Mail,
  Plus,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SEOHead from "@/components/seo/SEOHead";
import { toast } from "sonner";

const ACTIVITY_ICONS: Record<string, typeof Activity> = {
  register: UserPlus,
  login: UserCheck,
  profile_update: Activity,
  user_created: Users,
  role_change: ShieldCheck,
};

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { isAr, t } = useLanguage();
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const usersQuery = trpc.admin.listUsers.useQuery();
  const activitiesQuery = trpc.admin.recentActivities.useQuery({ limit: 20 });

  const addUser = trpc.admin.addUser.useMutation({
    onSuccess: async () => {
      toast.success(t("تم إنشاء المستخدم", "User created successfully"));
      setDialogOpen(false);
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      await Promise.all([utils.admin.listUsers.invalidate(), utils.admin.recentActivities.invalidate()]);
    },
    onError: (error) => {
      toast.error(error.message || t("فشل إنشاء المستخدم", "Failed to create user"));
    },
  });

  const logout = trpc.auth.logout.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      setLocation("/auth", { replace: true });
    },
  });

  const allUsers = usersQuery.data ?? [];
  const activities = activitiesQuery.data ?? [];
  const adminCount = allUsers.filter((u) => u.role === "admin").length;
  const recentSignins = allUsers.filter((u) => {
    if (!u.lastSignedIn) return false;
    const days = (Date.now() - new Date(u.lastSignedIn).getTime()) / (1000 * 60 * 60 * 24);
    return days <= 7;
  }).length;

  const stats = [
    { label: t("إجمالي المستخدمين", "Total Users"), value: allUsers.length, icon: Users },
    { label: t("المشرفون", "Admins"), value: adminCount, icon: ShieldCheck },
    { label: t("تسجيلات الدخول الأخيرة", "Recent Sign-ins"), value: recentSignins, icon: UserCheck },
    { label: t("الأنشطة الأخيرة", "Recent Activities"), value: activities.length, icon: Activity },
  ];

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUser.mutate({ name: newName, email: newEmail, password: newPassword });
  };

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        pageKey="home"
        customTitle={isAr ? "لوحة المشرف | غزارة" : "Admin Dashboard | Ghazara"}
        customDescription={isAr ? "مراقبة نشاط المستخدمين وتغييرات الحسابات" : "Monitor user activities and account changes"}
      />

      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="content-wrap flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="size-4 rtl:rotate-180" />
              {t("لوحة التحكم", "Dashboard")}
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-sm font-medium">{t("الإدارة", "Admin")}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => logout.mutate()} disabled={logout.isPending}>
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
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h1 className="mb-1 text-2xl font-heading font-bold">
                {t("لوحة المشرف", "Admin Dashboard")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("مراقبة نشاط المستخدمين وتغييرات الحسابات", "Monitor user activities and account changes")}
              </p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="size-4" />
                  {t("إضافة مستخدم", "Add User")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("إضافة مستخدم جديد", "Add New User")}</DialogTitle>
                  <DialogDescription>
                    {t("أنشئ حساب بيانات اعتماد جديد. يمكن للمستخدم تسجيل الدخول لاحقًا.", "Create a new credentials account. The user can sign in afterwards.")}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddUser} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-name">{t("الاسم", "Name")}</Label>
                    <Input
                      id="new-name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder={isAr ? "اسم المستخدم" : "User's name"}
                      required
                      disabled={addUser.isPending}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-email">{t("البريد الإلكتروني", "Email")}</Label>
                    <Input
                      id="new-email"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      disabled={addUser.isPending}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">{t("كلمة المرور", "Password")}</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder={isAr ? "8 أحرف على الأقل" : "At least 8 characters"}
                      required
                      minLength={8}
                      disabled={addUser.isPending}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={addUser.isPending} className="w-full">
                      {addUser.isPending ? t("جارٍ الإنشاء...", "Creating...") : t("إنشاء المستخدم", "Create User")}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * (i + 1), ease: "easeOut" }}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <s.icon className="size-4 text-muted-foreground" />
                </div>
                <p className="mt-2 text-2xl font-heading font-bold">{s.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Activity feed — spans 2 columns */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
              <h2 className="mb-4 flex items-center gap-2 font-heading font-semibold text-lg">
                <Activity className="size-5 text-primary" />
                {t("النشاط الأخير", "Recent Activity")}
              </h2>
              {activitiesQuery.isLoading ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  {t("جارٍ التحميل...", "Loading...")}
                </p>
              ) : activities.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  {t("لا يوجد نشاط بعد", "No activity yet")}
                </p>
              ) : (
                <ul className="space-y-1">
                  {activities.map((act, idx) => {
                    const Icon = ACTIVITY_ICONS[act.type] ?? Activity;
                    return (
                      <li
                        key={act.id ?? idx}
                        className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
                      >
                        <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm">{act.description ?? act.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {act.createdAt && format(new Date(act.createdAt), "MMM d, yyyy · h:mm a")}
                          </p>
                        </div>
                        <Badge variant="outline" className="shrink-0 capitalize">
                          {act.type.replace("_", " ")}
                        </Badge>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Account summary — current admin */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-4 font-heading font-semibold text-lg">
                {t("حسابك", "Your Account")}
              </h2>
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="size-6" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-heading font-semibold">{user?.name ?? "—"}</p>
                  <p className="flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                    <Mail className="size-3.5 shrink-0" />
                    {user?.email ?? "—"}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-3 border-t border-border pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("الدور", "Role")}</span>
                  <Badge variant="secondary" className="capitalize">{user?.role ?? "user"}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <KeyRound className="size-3.5" />
                    {t("طريقة الدخول", "Login method")}
                  </span>
                  <span className="font-medium capitalize">{user?.loginMethod ?? "—"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <UserCheck className="size-3.5" />
                    {t("آخر دخول", "Last sign-in")}
                  </span>
                  <span className="font-medium">
                    {user?.lastSignedIn ? format(new Date(user.lastSignedIn), "MMM d, yyyy") : "—"}
                  </span>
                </div>
              </div>
              <Link href="/profile">
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  {t("تعديل الملف الشخصي", "Edit Profile")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Users table */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-heading font-semibold text-lg">
              {t("جميع المستخدمين", "All Users")}
            </h2>
            {usersQuery.isLoading ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                {t("جارٍ التحميل...", "Loading...")}
              </p>
            ) : allUsers.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                {t("لا يوجد مستخدمون", "No users found")}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("الاسم", "Name")}</TableHead>
                      <TableHead>{t("البريد الإلكتروني", "Email")}</TableHead>
                      <TableHead>{t("الدور", "Role")}</TableHead>
                      <TableHead className="hidden md:table-cell">{t("الطريقة", "Method")}</TableHead>
                      <TableHead className="hidden md:table-cell">{t("العضوية", "Joined")}</TableHead>
                      <TableHead className="hidden lg:table-cell">{t("آخر دخول", "Last Sign-in")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allUsers.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">{u.name ?? "—"}</TableCell>
                        <TableCell className="text-muted-foreground">{u.email ?? "—"}</TableCell>
                        <TableCell>
                          <Badge variant={u.role === "admin" ? "secondary" : "outline"} className="capitalize">
                            {u.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden capitalize md:table-cell text-muted-foreground">
                          {u.loginMethod ?? "—"}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {u.createdAt ? format(new Date(u.createdAt), "MMM d, yyyy") : "—"}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">
                          {u.lastSignedIn ? format(new Date(u.lastSignedIn), "MMM d, yyyy") : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
