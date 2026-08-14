import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Category, Faq, Testimonial } from "@/data/mockData";
import { IconChevron, IconStar } from "@/components/Icons";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/category/$category"
      params={{ category: category.slug }}
      className="group relative block overflow-hidden rounded-sm border border-border"
    >
      <img
        src={category.image}
        alt={`${category.name} Paithani sarees`}
        loading="lazy"
        className="aspect-3/4 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-background">
        <h3 className="text-xl leading-tight">{category.name}</h3>
        <p className="mt-1 line-clamp-2 text-[11px] text-background/80">{category.description}</p>
        <span className="mt-3 inline-block text-[10px] uppercase tracking-[0.22em] text-accent">
          Explore →
        </span>
      </div>
    </Link>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-sm border border-accent/30 bg-card p-6">
      <div className="flex gap-1 text-accent">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <IconStar key={i} className="h-4 w-4" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 font-[family-name:var(--font-display)] text-lg leading-relaxed text-foreground/90">
        “{testimonial.message}”
      </blockquote>
      <figcaption className="mt-5 border-t border-border pt-4 text-sm">
        <span className="block text-primary">{testimonial.name}</span>
        <span className="text-xs text-muted-foreground">{testimonial.location}</span>
      </figcaption>
    </figure>
  );
}

export function FAQAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="divide-y divide-border rounded-sm border border-border bg-card">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-[family-name:var(--font-display)] text-lg text-primary">
                {item.question}
              </span>
              <IconChevron className={`h-5 w-5 shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}