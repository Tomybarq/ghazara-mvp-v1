import React, { useState } from "react";

interface LogoProps {
  variant?: "transparent" | "white-bg" | "icon-only";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
}

const sizeMap = {
  sm: "h-9 w-auto min-w-[152px]",
  md: "h-12 w-auto min-w-[190px]",
  lg: "h-16 w-auto min-w-[240px]",
  xl: "h-20 w-auto min-w-[320px]",
};

const iconSizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
  xl: "h-18 w-18",
};

export const Logo: React.FC<LogoProps> = ({
  variant = "transparent",
  size = "md",
  className = "",
  priority = false,
}) => {
  const [imgError, setImgError] = useState(false);

  const imgSrc =
    variant === "white-bg"
      ? "/manus-storage/logo-white-bg_4dacebf1.webp"
      : "/manus-storage/logo-transparent_05b3f88a.webp";

  if (variant === "icon-only" || imgError) {
    return (
      <div className={`inline-flex items-center gap-2 group ${className}`}>
        <div className={`${iconSizeMap[size]} rounded-xl bg-gradient-to-tr from-primary to-amber-500 flex items-center justify-center text-white font-heading font-bold shadow-md`}>
          غ
        </div>
        <div className="flex flex-col">
          <span className="font-heading font-bold text-base leading-tight text-foreground">غزارة</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Ghazara</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center transition-transform hover:scale-[1.01] ${className}`}>
      <img
        src={imgSrc}
        alt="مؤسسة غزارة للتجارة والتسويق - Ghazara Trading & Marketing"
        className={`${sizeMap[size]} object-contain`}
        loading={priority ? "eager" : "lazy"}
        onError={() => setImgError(true)}
      />
    </div>
  );
};
