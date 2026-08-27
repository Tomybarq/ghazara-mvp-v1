/**
 * ForgotPasswordPage — the /forgot-password route.
 *
 * A focused form where a locked-out user enters their email to request a
 * reset link. The endpoint never reveals whether the email exists, so the
 * success screen is always shown — matching the non-leaky backend design.
 *
 * Reuses the same visual shell as AuthPage (split layout + AuthBackground)
 * for a consistent auth surface, but is a standalone component so it can
 * be routed to directly from the "Forgot password?" link.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Loader2, Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Logo } from "@/components/ui/Logo";
import AuthBackground from "@/components/auth/AuthBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailRule = z
  .string()
  .min(5, "Email is too short")
  .max(320, "Email is too long")
  .email("Please enter a valid email address");

const schema = z.object({ email: emailRule });
type Values = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const { isAr } = useLanguage();
  const [, setLocation] = useLocation();
  const [sent, setSent] = useState(false);

  const mutation = trpc.auth.requestPasswordReset.useMutation();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: Values) => {
    try {
      await mutation.mutateAsync({ email: values.email });
      setSent(true);
    } catch {
      // Even on error we show the success screen — the backend is designed
      // to never reveal whether the email exists.
      setSent(true);
    }
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
          </div>

          {sent ? (
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
                {isAr ? "تحقق من بريدك" : "Check your email"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isAr
                  ? "إذا كان هناك حساب مرتبط بهذا البريد، ستصلك رسالة برابط لإعادة تعيين كلمة المرور خلال لحظات."
                  : "If an account exists for this email, you'll receive a message with a reset link shortly."}
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setLocation("/auth", { replace: true })}
              >
                <ArrowLeft className="size-4 me-2" />
                {isAr ? "العودة لتسجيل الدخول" : "Back to sign in"}
              </Button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-heading font-bold text-foreground text-center mb-1">
                {isAr ? "نسيت كلمة المرور؟" : "Forgot password?"}
              </h1>
              <p className="text-sm text-muted-foreground text-center mb-6">
                {isAr
                  ? "أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور"
                  : "Enter your email and we'll send you a link to reset your password"}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                    {isAr ? "البريد الإلكتروني" : "Email"}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 start-3 flex items-center text-muted-foreground pointer-events-none">
                      <Mail className="size-4" />
                    </span>
                    <div className="[&_input]:ps-9">
                      <Input
                        type="email"
                        autoComplete="email"
                        autoFocus
                        className="bg-foreground/[0.03]"
                        {...registerField("email")}
                      />
                    </div>
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full"
                  size="lg"
                >
                  {mutation.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : isAr ? (
                    "إرسال رابط إعادة التعيين"
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>

              <button
                type="button"
                onClick={() => setLocation("/auth", { replace: true })}
                className="mt-6 flex w-full items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-3.5" />
                {isAr ? "العودة لتسجيل الدخول" : "Back to sign in"}
              </button>
            </>
          )}
        </div>
      </motion.div>
    </main>
  );
}
