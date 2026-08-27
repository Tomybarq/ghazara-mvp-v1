/**
 * AvatarUpload — circular avatar with an inline photo upload control.
 *
 * Shows the user's current avatar image (or their initials as a fallback) and
 * lets them pick a new image file. The selected file is read as a base64 data
 * URL and sent to the `auth.uploadAvatar` tRPC mutation. On success the auth
 * cache is invalidated so every component reading `useAuth` sees the new photo.
 */
import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB — matches the server limit

export function AvatarUpload() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const utils = trpc.useUtils();
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadAvatar = trpc.auth.uploadAvatar.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      toast.success(t("تم تحديث الصورة", "Avatar updated"));
    },
    onError: (error) => {
      toast.error(error.message || t("فشل رفع الصورة", "Failed to upload avatar"));
    },
  });

  const initials = (user?.name ?? "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error(t("حجم الصورة كبير جدًا (الحد ٥ ميجابايت)", "Image too large (max 5 MB)"));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      uploadAvatar.mutate({ dataUrl });
    };
    reader.onerror = () => {
      toast.error(t("فشل قراءة الملف", "Failed to read file"));
    };
    reader.readAsDataURL(file);

    // Reset the input so the same file can be selected again.
    e.target.value = "";
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative group">
        <Avatar className="size-20 border-2 border-border shadow-sm">
          {user?.avatar ? (
            <AvatarImage src={user.avatar} alt={user?.name ?? "Avatar"} />
          ) : null}
          <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploadAvatar.isPending}
          className="absolute inset-0 grid place-items-center rounded-full bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:cursor-not-allowed"
          aria-label={t("تغيير الصورة", "Change avatar")}
        >
          {uploadAvatar.isPending ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <Camera className="size-5" />
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploadAvatar.isPending}
        />
      </div>
      <div>
        <p className="text-sm font-medium">
          {t("الصورة الشخصية", "Profile Photo")}
        </p>
        <p className="text-xs text-muted-foreground">
          {t(
            "انقر لتحميل صورة (حد أقصى ٥ ميجابايت)",
            "Click to upload an image (max 5 MB)",
          )}
        </p>
      </div>
    </div>
  );
}
