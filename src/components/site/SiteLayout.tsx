import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pb-16 lg:pb-0">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBottomNav />
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
      <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:py-14 lg:px-8">
        {eyebrow ? (
          <p className="text-[10px] uppercase tracking-[0.32em] text-accent sm:text-[11px]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-3xl text-primary sm:mt-3 sm:text-4xl md:text-5xl">{title}</h1>
        <div className="gold-rule mx-auto mt-4 w-20 sm:mt-5 sm:w-28" />
        {subtitle ? (
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:mt-5 sm:text-sm">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
