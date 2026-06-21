import { cn } from "@/lib/utils";

interface PageHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  dark?: boolean;
}

export function PageHeader({ label, title, subtitle, className, dark }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-12 pb-8 border-b",
        dark ? "border-white/10" : "border-border/70",
        className
      )}
    >
      {label && (
        <p className={cn("label-caps mb-3", dark ? "text-white/70" : "text-primary")}>
          {label}
        </p>
      )}
      <div className={cn("oud-accent-bar mb-5", dark && "opacity-90")} />
      <h1
        className={cn(
          "font-heading text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] tracking-tight max-w-3xl",
          dark ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed max-w-2xl",
            dark ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
