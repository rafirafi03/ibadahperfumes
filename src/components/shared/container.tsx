import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  label,
  className,
  align = "center",
  dark = false,
}: {
  title: string;
  subtitle?: string;
  label?: string;
  className?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={cn("mb-12 md:mb-14", align === "center" && "text-center", className)}>
      {label && (
        <p className={cn("label-caps mb-3", dark ? "text-white/70" : "text-primary", align === "center" && "mx-auto")}>
          {label}
        </p>
      )}
      <div className={cn("oud-accent-bar mb-5", align === "center" && "mx-auto")} />
      <h2
        className={cn(
          "font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.1] text-balance tracking-tight",
          dark && "!text-white"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed max-w-xl",
            dark ? "text-white/70" : "text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
      {align === "center" && !dark && <div className="mt-6 mx-auto gold-line w-20 opacity-60" />}
    </div>
  );
}
