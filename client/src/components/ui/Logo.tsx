import React, { useState } from "react";

export interface LogoProps {
  variant?: "header" | "transparent" | "white-bg" | "icon-only" | "official";
  size?: "sm" | "header" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
}

const sizeMap: Record<string, string> = {
  sm: "h-9 sm:h-10 w-auto min-w-[130px] max-h-10",
  header: "h-10 sm:h-11.5 w-auto min-w-[155px] max-h-12",
  md: "h-12 sm:h-13 w-auto min-w-[175px] max-h-13",
  lg: "h-16 sm:h-18 w-auto min-w-[230px] max-h-18",
  xl: "h-20 sm:h-24 w-auto min-w-[290px] max-h-24",
};

const iconSizeMap: Record<string, string> = {
  sm: "h-8 w-8",
  header: "h-10 w-10",
  md: "h-11 w-11",
  lg: "h-14 w-14",
  xl: "h-18 w-18",
};

export const Logo: React.FC<LogoProps> = ({
  variant = "header",
  size = "header",
  className = "",
  priority = true,
}) => {
  const [imgError, setImgError] = useState(false);

  const imgSrc =
    variant === "icon-only"
      ? "/branding/logo-icon.svg"
      : variant === "white-bg"
      ? "/branding/ghazara-logo-white.jpg"
      : "/branding/ghazara-logo.png";

  if (variant === "icon-only") {
    return (
      <div className={`inline-flex items-center transition-all duration-300 hover:scale-105 ${className}`}>
        <img
          src="/branding/logo-icon.svg"
          alt="Ghazara Icon"
          className={`${iconSizeMap[size] || iconSizeMap.header} object-contain drop-shadow-sm`}
          loading={priority ? "eager" : "lazy"}
          width={48}
          height={48}
        />
      </div>
    );
  }

  if (imgError) {
    return (
      <div className={`inline-flex items-center gap-3 group transition-transform hover:scale-[1.02] ${className}`}>
        <div
          className={`${iconSizeMap[size] || iconSizeMap.header} rounded-2xl bg-gradient-to-tr from-[#5E3B95] to-[#E6833E] flex items-center justify-center text-white font-heading font-extrabold shadow-md text-lg`}
        >
          غ
        </div>
        <div className="flex flex-col">
          <span className="font-heading font-extrabold text-base leading-tight text-foreground tracking-tight">
            مؤسسة غزارة
          </span>
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            Ghazara Trading
          </span>
        </div>
      </div>
    );
  }

  const containerClasses =
    variant === "header"
      ? "bg-white/95 dark:bg-white/95 px-3 py-1.5 rounded-2xl shadow-xs border border-black/5 dark:border-white/10 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02] backdrop-blur-xs"
      : variant === "white-bg"
      ? "bg-white p-2 rounded-2xl shadow-xs border border-border"
      : "bg-white/95 dark:bg-white/95 px-3 py-1.5 rounded-2xl shadow-xs border border-black/5 dark:border-white/10";

  return (
    <div className={`inline-flex items-center select-none ${containerClasses} ${className}`}>
      <img
        src={imgSrc}
        alt="مؤسسة غزارة للتجارة والتسويق - Ghazara Trading & Marketing"
        className={`${sizeMap[size] || sizeMap.header} object-contain transition-transform`}
        loading={priority ? "eager" : "lazy"}
        onError={() => setImgError(true)}
        width={240}
        height={65}
        style={{
          imageRendering: "auto",
        }}
      />
    </div>
  );
};

export default Logo;
