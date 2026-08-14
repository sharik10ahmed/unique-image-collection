import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/mockData";
import { ProductGrid } from "./ProductCard";
import { Button, EmptyState } from "@/components/ui/Primitives";

export function CollectionView({
  products,
  filters,
}: {
  products: Product[];
  filters: { label: string; value: string }[];
}) {
  const [active, setActive] = useState("all");
  const list = active === "all" ? products : products.filter((p) => p.collections.includes(active));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-14 lg:px-8">
      <div className="mb-6 sm:mb-10 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {[{ label: "All", value: "all" }, ...filters].map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] transition-all active:scale-95 ${
              active === f.value
                ? "border-primary bg-primary text-primary-foreground font-medium"
                : "border-accent/40 bg-card text-foreground hover:bg-accent/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState
          title="No sarees in this filter yet"
          text="New weaves arrive from our artisans every few weeks. Explore the full collection meanwhile."
        >
          <Link to="/shop">
            <Button>Browse All Paithani</Button>
          </Link>
        </EmptyState>
      ) : (
        <ProductGrid products={list} />
      )}
    </div>
  );
}
