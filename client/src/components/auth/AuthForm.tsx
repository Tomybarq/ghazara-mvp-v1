/**
 * AuthForm — the interactive core of the auth page.
 *
 * Responsibilities:
 *   - Toggle between "login" and "register" modes with motion transitions.
 *   - Validate input client-side with Zod (mirrors the server schema) so bad
 *     submissions never reach the network.
 *   - Call the `auth.login` / `auth.register` tRPC mutations and surface
 *     server errors inline.
 *   - On success, invoke `onAuthenticated()` so the parent owns navigation
 *     (the form never imports the router — keeps it reusable).
 *
 * Uses react-hook-form + zodResolver for schema-driven validation, matching
 * the project's existing form conventions. `mode: "onBlur"` validates fields as
 * the user leaves them rather than on every keystroke, which is less noisy and
 * avoids interrupting Arabic/IME composition.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Lock, Mail, User, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Mode = "login" | "register";

// Shared field rules — kept in sync with the server schema in authRouter.ts.
// Duplicated rather than imported because the server bundle must not leak into
// the client build; the schemas are small and stable.
const emailRule = z
  .string()
  .min(5, "Email is too short")
  .max(320, "Email is too long")
  .email("Please enter a valid email address");

const passwordRule = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be too long");

const loginSchema = z.object({
  email: emailRule,
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name is too short").max(120, "Name is too long"),
  email: emailRule,
  password: passwordRule,
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

interface AuthFormProps {
  /** Called after a successful login/register; parent navigates. */
  onAuthenticated: () => void;
}

export default function AuthForm({ onAuthenticated }: AuthFormProps) {
  const { t, isAr } = useLanguage();
  const [mode, setMode] = useState<Mode>("login");

  const login = trpc.auth.login.useMutation();
  const register = trpc.auth.register.useMutation();
  const utils = trpc.useUtils();

  // One RHF instance drives both modes. The schema is chosen per mode; the
  // `as any` cast works around a known zod v4 + @hookform/resolvers generic
  // friction (the two schemas share a superset shape but differ in `name`).
  // Validation behaviour is unaffected — only the resolver's TS generics need it.
  const schema = mode === "login" ? loginSchema : registerSchema;
  const form = useForm<RegisterValues>({
    resolver: zodResolver(schema as any),
    defaultValues: { name: "", email: "", password: "" },
  });

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  // The active mutation error (tRPC error message) surfaced above the submit
  // button. We read from whichever mutation is in flight.
  const serverError =
    (mode === "login" ? login.error : register.error)?.message ?? "";

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    reset({ name: "", email: "", password: "" });
    login.reset();
    register.reset();
    setMode(next);
  };

  const onSubmit = async (values: RegisterValues) => {
    try {
      if (mode === "login") {
        await login.mutateAsync({
          email: values.email,
          password: values.password,
        });
      } else {
        await register.mutateAsync({
          name: values.name,
          email: values.email,
          password: values.password,
        });
      }
      // Refetch the session so the guard sees the now-authenticated user and
      // doesn't bounce back to /auth with a stale null cache.
      await utils.auth.me.invalidate();
      onAuthenticated();
    } catch {
      // Errors are exposed via the mutation's `.error`; nothing to do here
      // beyond preventing an unhandled rejection.
    }
  };

  const pending = isSubmitting || login.isPending || register.isPending;

  return (
    <div className="w-full max-w-md">
      {/* Mode toggle — a sliding pill indicator highlights the active tab. */}
      <div className="relative grid grid-cols-2 mb-8 rounded-full bg-foreground/5 p-1 border border-border">
        <motion.div
          className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-primary shadow-lg"
          // Animate the highlight left/right when the mode flips. RTL handling:
          // the visual position is driven by `x`, not by logical `left`, so it
          // behaves consistently regardless of document direction.
          animate={{ x: mode === "login" ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
          style={{ left: 4 }}
        />
        {(["login", "register"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className={`relative z-10 py-2 text-sm font-medium rounded-full transition-colors ${
              mode === m ? "text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {m === "login" ? (isAr ? "تسجيل الدخول" : "Sign in") : (isAr ? "حساب جديد" : "Register")}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* Name field only for register — animated in/out with the mode. */}
            {mode === "register" && (
              <Field
                icon={<User className="size-4" />}
                label={isAr ? "الاسم" : "Name"}
                error={errors.name?.message}
              >
                <Input
                  type="text"
                  autoComplete="name"
                  className="bg-foreground/[0.03]"
                  {...registerField("name")}
                />
              </Field>
            )}

            <Field
              icon={<Mail className="size-4" />}
              label={isAr ? "البريد الإلكتروني" : "Email"}
              error={errors.email?.message}
            >
              <Input
                type="email"
                autoComplete="email"
                className="bg-foreground/[0.03]"
                {...registerField("email")}
              />
            </Field>

            <Field
              icon={<Lock className="size-4" />}
              label={isAr ? "كلمة المرور" : "Password"}
              error={errors.password?.message}
            >
              <Input
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className="bg-foreground/[0.03]"
                {...registerField("password")}
              />
            </Field>
          </motion.div>
        </AnimatePresence>

        {/* "Forgot password?" link — shown only in login mode, aligned right. */}
        {mode === "login" && (
          <div className="flex justify-end -mt-1">
            <a
              href="/forgot-password"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {isAr ? "نسيت كلمة المرور؟" : "Forgot password?"}
            </a>
          </div>
        )}

        {/* Server error — animated in so it draws attention without startling. */}
        <AnimatePresence>
          {serverError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              <AlertCircle className="size-4 shrink-0" />
              <span>{serverError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <Button type="submit" disabled={pending} className="w-full" size="lg">
          {pending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : mode === "login" ? (
            t("تسجيل الدخول", "Sign in")
          ) : (
            t("إنشاء الحساب", "Create account")
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {mode === "login"
          ? (isAr ? "ليس لديك حساب؟ " : "No account? ")
          : (isAr ? "لديك حساب بالفعل؟ " : "Already have an account? ")}
        <button
          type="button"
          onClick={() => switchMode(mode === "login" ? "register" : "login")}
          className="text-primary hover:underline font-medium"
        >
          {mode === "login" ? (isAr ? "أنشئ واحداً" : "Register") : (isAr ? "سجّل الدخول" : "Sign in")}
        </button>
      </p>
    </div>
  );
}

/** A labeled field with a leading icon and inline error slot. */
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
      <label className="mb-1.5 block text-sm font-medium text-foreground/80">
        {label}
      </label>
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
