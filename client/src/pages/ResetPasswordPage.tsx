/**
 * ResetPasswordPage — the /reset-password route.
 *
 * Reached via the link in the reset email (`?token=...`). The user enters a
 * new password (with confirmation), which is submitted together with the
 * token to the `auth.resetPassword` mutation. On success we redirect back
 * to the login screen; on failure the inline error explains that the link
 * is invalid or expired.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Loader2, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Logo } from "@/components/ui/Logo";
import AuthBackground from "@/components/auth/AuthBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Values = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const { isAr } = useLanguage();
  const [, setLocation] = useLocation();
  const [done, setDone] = useState(false);

  const token = new URLSearchParams(window.location.search).get("token") ?? "";
  const mutation = trpc.auth.resetPassword.useMutation();

  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: Values) => {
    try {
      await mutation.mutateAsync({ token, password: values.password });
      setDone(true);
    } catch {
      // Error surfaced via mutation.error below.
    }
  };

  const serverError = mutation.error?.message ?? "";
  const noToken = !token;

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
          </div>

          {done ? (
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/15"
              >
                <CheckCircle2 className="size-8 text-emerald-500" />
              </motion.div>
              <h1 className="text-xl font-heading font-bold text-foreground">
                {isAr ? "تم تغيير كلمة المرور" : "Password updated"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isAr
                  ? "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة"
                  : "You can now sign in with your new password"}
              </p>
              <Button className="w-full" onClick={() => setLocation("/auth", { replace: true })}>
                {isAr ? "تسجيل الدخول" : "Sign in"}
              </Button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-heading font-bold text-foreground text-center mb-1">
                {isAr ? "إعادة تعيين كلمة المرور" : "Reset password"}
              </h1>
              <p className="text-sm text-muted-foreground text-center mb-6">
                {isAr
                  ? "اختر كلمة مرور جديدة لحسابك"
                  : "Choose a new password for your account"}
              </p>

              {noToken ? (
                <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>
                    {isAr
                      ? "رابط إعادة التعيين غير صالح"
                      : "This reset link is invalid or has expired"}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                  <Field
                    icon={<Lock className="size-4" />}
                    label={isAr ? "كلمة المرور الجديدة" : "New password"}
                    error={errors.password?.message}
                  >
                    <Input
                      type="password"
                      autoComplete="new-password"
                      autoFocus
                      className="bg-foreground/[0.03]"
                      {...registerField("password")}
                    />
                  </Field>

                  <Field
                    icon={<Lock className="size-4" />}
                    label={isAr ? "تأكيد كلمة المرور" : "Confirm password"}
                    error={errors.confirmPassword?.message}
                  >
                    <Input
                      type="password"
                      autoComplete="new-password"
                      className="bg-foreground/[0.03]"
                      {...registerField("confirmPassword")}
                    />
                  </Field>

                  {serverError && (
                    <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      <AlertCircle className="size-4 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full"
                    size="lg"
                  >
                    {mutation.isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : isAr ? (
                      "تحديث كلمة المرور"
                    ) : (
                      "Update password"
                    )}
                  </Button>
                </form>
              )}
            </>
          )}
        </div>
      </motion.div>
    </main>
  );
}

function Field({
  icon,
  label,
  error,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground/80">{label}</label>
      <div className="relative">
        <span className="absolute inset-y-0 start-3 flex items-center text-muted-foreground pointer-events-none">
          {icon}
        </span>
        <div className="[&_input]:ps-9">{children}</div>
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
