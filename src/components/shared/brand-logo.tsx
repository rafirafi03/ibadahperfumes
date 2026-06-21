import { cn } from "@/lib/utils";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";

interface BrandLogoProps {
  className?: string;
  variant?: "default" | "light";
  compact?: boolean;
}

export function BrandLogo({ className, variant = "default", compact = false }: BrandLogoProps) {
  const isLight = variant === "light";

  if (compact) {
    return (
      <span className={cn("inline-flex flex-col items-center leading-none text-center", className)}>
        <span
          className={cn(
            "font-heading text-lg sm:text-xl font-normal tracking-[0.12em] uppercase",
            isLight ? "text-white" : "text-foreground"
          )}
        >
          {BRAND_NAME}
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.28em] font-medium",
            isLight ? "text-white/55" : "text-muted-foreground"
          )}
        >
          {BRAND_TAGLINE}
        </span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
        <span
          className={cn(
            "font-heading text-2xl sm:text-3xl font-normal tracking-wide",
            isLight ? "text-white" : "text-foreground"
          )}
        >
        {BRAND_NAME}
        <span className="font-normal italic ml-1.5">{BRAND_TAGLINE}</span>
      </span>
      <span
        className={cn(
          "mt-1.5 label-caps tracking-[0.22em]",
          isLight ? "text-white/55" : "text-muted-foreground"
        )}
      >
        Oud · Attar · Niche
      </span>
    </span>
  );
}
