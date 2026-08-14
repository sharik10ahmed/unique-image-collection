import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Category, Faq, Testimonial } from "@/data/mockData";
import { IconChevron, IconStar } from "@/components/Icons";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/category/$category"
      params={{ category: category.slug }}
      className="group relative block overflow-hidden rounded-sm border border-border transition-all active:scale-98"
    >
      <img
        src={category.image}
        alt={`${category.name} Paithani sarees`}
        loading="lazy"
        className="aspect-3/4 w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-background">
        <h3 className="text-base sm:text-xl font-medium leading-tight">{category.name}</h3>
        <p className="mt-1 line-clamp-2 text-[10px] sm:text-[11px] text-background/80">
          {category.description}
        </p>
        <span className="mt-2 sm:mt-3 inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-accent font-medium">
          Explore →
        </span>
      </div>
    </Link>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-sm border border-accent/30 bg-card p-4 sm:p-6">
      <div className="flex gap-1 text-accent">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <IconStar key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        ))}
      </div>
      <blockquote className="mt-3 sm:mt-4 flex-1 font-[family-name:var(--font-display)] text-base sm:text-lg leading-relaxed text-foreground/90">
        “{testimonial.message}”
      </blockquote>
      <figcaption className="mt-4 sm:mt-5 border-t border-border pt-3 sm:pt-4 text-xs sm:text-sm">
        <span className="block font-medium text-primary">{testimonial.name}</span>
        <span className="text-[11px] sm:text-xs text-muted-foreground">{testimonial.location}</span>
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
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left hover:bg-muted/30"
            >
              <span className="font-[family-name:var(--font-display)] text-base sm:text-lg text-primary">
                {item.question}
              </span>
              <IconChevron
                className={`h-4 w-4 shrink-0 text-accent transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
