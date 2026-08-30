import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Info, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive" | "warning" | "info";
  icon?: React.ReactNode;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "تأكيد",
  cancelLabel = "إلغاء",
  variant = "default",
  icon,
  loading = false,
  onConfirm,
  onCancel,
  className,
}: ConfirmationDialogProps) {
  const getIcon = () => {
    if (icon) return icon;
    switch (variant) {
      case "destructive":
        return <AlertCircle className="w-6 h-6 text-destructive shrink-0" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />;
      case "info":
      default:
        return <Info className="w-6 h-6 text-primary shrink-0" />;
    }
  };

  const getActionVariantClass = () => {
    switch (variant) {
      case "destructive":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      case "warning":
        return "bg-amber-600 text-white hover:bg-amber-700";
      default:
        return "bg-primary text-primary-foreground hover:bg-primary/90";
    }
  };

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;
    try {
      await onConfirm();
      onOpenChange(false);
    } catch {
      // Allow parent error handling to display toast
    }
  };

  const handleCancel = () => {
    if (loading) return;
    if (onCancel) onCancel();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={loading ? undefined : onOpenChange}>
      <AlertDialogContent className={cn("sm:max-w-md", className)}>
        <AlertDialogHeader className="text-right sm:text-right space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-muted/60 flex items-center justify-center">
              {getIcon()}
            </div>
            <AlertDialogTitle className="text-lg font-heading font-bold text-foreground">
              {title}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row-reverse sm:justify-start gap-2 pt-2">
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className={cn(
              "font-bold transition-all rounded-xl px-5 h-10 cursor-pointer",
              getActionVariantClass()
            )}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جارٍ المعالجة…</span>
              </span>
            ) : (
              confirmLabel
            )}
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={handleCancel}
            disabled={loading}
            className="font-semibold rounded-xl px-5 h-10 border-border hover:bg-muted cursor-pointer"
          >
            {cancelLabel}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
