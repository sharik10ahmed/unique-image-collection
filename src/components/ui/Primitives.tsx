import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { useEffect } from "react";

type Variant = "primary" | "gold" | "outline" | "heroOutline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-secondary active:bg-secondary border border-transparent",
  gold: "bg-accent text-accent-foreground hover:brightness-105 active:brightness-95 border border-transparent font-medium",
  outline: "border border-accent/60 text-foreground hover:bg-accent/10 active:bg-accent/20",
  heroOutline:
    "border border-background/80 bg-background/15 text-background backdrop-blur-sm hover:bg-background/30 hover:border-background active:bg-background/40",
  ghost: "text-foreground hover:bg-muted active:bg-muted/80 border border-transparent",
  dark: "bg-foreground text-background hover:opacity-90 active:opacity-100 border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-2 text-xs min-h-[36px]",
  md: "px-5 py-2.5 text-xs sm:text-sm min-h-[42px]",
  lg: "px-6 py-3.5 text-xs sm:text-sm min-h-[48px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-sm font-medium uppercase tracking-[0.14em] transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 ${variants[variant]} ${sizes[size]} ${className}`}
    />
  );
}

const fieldBase =
  "w-full rounded-sm border border-border bg-card px-3.5 py-2.5 text-base sm:text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldBase} ${className}`} />;
}

export function Textarea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${fieldBase} ${className}`} />;
}

export function Select({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${fieldBase} ${className}`} />;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/60 p-0 backdrop-blur-xs sm:items-center sm:p-4 md:p-8">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      {/* Mobile: Bottom Sheet | Desktop: Centered Modal */}
      <div
        className={`fade-up relative z-[101] flex max-h-[90vh] w-full flex-col rounded-t-xl sm:rounded-sm border border-accent/30 bg-card shadow-2xl pb-safe sm:pb-0 ${
          wide ? "sm:max-w-3xl" : "sm:max-w-lg"
        }`}
      >
        {/* Mobile Drag/Pull Indicator */}
        <div className="flex justify-center pt-2 sm:hidden">
          <div className="h-1.5 w-12 rounded-full bg-muted-foreground/30" />
        </div>

        <div className="flex items-center justify-between border-b border-border px-5 py-3.5 sm:py-4">
          <h3 className="text-lg font-medium text-primary sm:text-xl">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl sm:mt-3 sm:text-3xl lg:text-4xl leading-tight text-primary">
        {title}
      </h2>
      <div
        className={`gold-rule mt-3 sm:mt-4 w-20 sm:w-24 ${align === "center" ? "mx-auto" : ""}`}
      />
      {subtitle ? (
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md rounded-sm border border-dashed border-accent/40 bg-card/60 px-5 py-10 sm:px-6 sm:py-14 text-center">
      <h3 className="text-xl sm:text-2xl text-primary">{title}</h3>
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">{text}</p>
      {children ? (
        <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-3">{children}</div>
      ) : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: "gold" | "green" | "maroon" | "muted";
}) {
  const tones = {
    gold: "bg-accent/20 text-accent-foreground border-accent/50",
    green: "bg-peacock/15 text-peacock border-peacock/40",
    maroon: "bg-maroon/15 text-maroon border-maroon/40",
    muted: "bg-muted text-muted-foreground border-border",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] sm:text-[11px] tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
