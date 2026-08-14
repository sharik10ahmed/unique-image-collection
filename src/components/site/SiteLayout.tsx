import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-accent/25 bg-muted/60">
      <div className="mx-auto max-w-7xl px-4 py-14 text-center lg:px-8">
        {eyebrow ? <p className="text-[11px] uppercase tracking-[0.32em] text-accent">{eyebrow}</p> : null}
        <h1 className="mt-3 text-4xl text-primary sm:text-5xl">{title}</h1>
        <div className="gold-rule mx-auto mt-5 w-28" />
        {subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}