import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type Variant = "primary" | "gold" | "outline" | "heroOutline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-secondary border border-transparent",
  gold: "bg-accent text-accent-foreground hover:brightness-105 border border-transparent",
  outline:
    "border border-accent/60 text-foreground hover:bg-accent/10",
  heroOutline:
    "border border-background/80 bg-background/15 text-background backdrop-blur-sm hover:bg-background/30 hover:border-background",
  ghost: "text-foreground hover:bg-muted border border-transparent",
  dark: "bg-foreground text-background hover:opacity-90 border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm",
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
      className={`inline-flex items-center justify-center gap-2 rounded-sm font-medium uppercase tracking-[0.14em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
    />
  );
}

const fieldBase =
  "w-full rounded-sm border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldBase} ${className}`} />;
}

export function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
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
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-foreground/50 p-4 backdrop-blur-sm sm:p-8">
      <div
        className={`fade-up my-auto w-full ${wide ? "max-w-3xl" : "max-w-lg"} rounded-sm border border-accent/30 bg-card shadow-xl`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-xl">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
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
        <p className="text-[11px] uppercase tracking-[0.32em] text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-3xl leading-tight text-primary sm:text-4xl">{title}</h2>
      <div className={`gold-rule mt-4 w-24 ${align === "center" ? "mx-auto" : ""}`} />
      {subtitle ? <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{subtitle}</p> : null}
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
    <div className="mx-auto max-w-md rounded-sm border border-dashed border-accent/40 bg-card/60 px-6 py-14 text-center">
      <h3 className="text-2xl text-primary">{title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{text}</p>
      {children ? <div className="mt-6 flex justify-center gap-3">{children}</div> : null}
    </div>
  );
}

export function Badge({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "green" | "maroon" | "muted" }) {
  const tones = {
    gold: "bg-accent/20 text-accent-foreground border-accent/50",
    green: "bg-peacock/15 text-peacock border-peacock/40",
    maroon: "bg-maroon/15 text-maroon border-maroon/40",
    muted: "bg-muted text-muted-foreground border-border",
  } as const;
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}