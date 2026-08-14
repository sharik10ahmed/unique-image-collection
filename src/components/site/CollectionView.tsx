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
  const list =
    active === "all" ? products : products.filter((p) => p.collections.includes(active));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {[{ label: "All", value: "all" }, ...filters].map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors ${
              active === f.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-accent/40 text-foreground hover:bg-accent/10"
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