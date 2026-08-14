import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ProductGrid } from "@/components/site/ProductCard";
import { Button, EmptyState, Input, Select } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { formatINR } from "@/data/mockData";

type ShopSearch = {
  q?: string | undefined;
  sort?: string | undefined;
  category?: string | undefined;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    sort: typeof search["sort"] === "string" ? search["sort"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Paithani Sarees | Rituraj Paithani" },
      {
        name: "description",
        content:
          "Browse handloom Paithani sarees by collection, price and occasion. Pure zari borders, peacock motifs and premium silk.",
      },
      { property: "og:title", content: "Shop Handloom Paithani Sarees" },
      { property: "og:description", content: "Filter our full Paithani collection by category, price and availability." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const { products, categories } = useStore();
  const [query, setQuery] = useState(search.q ?? "");
  const [category, setCategory] = useState(search.category ?? "all");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [availability, setAvailability] = useState("all");
  const [tag, setTag] = useState("all");
  const [sort, setSort] = useState(search.sort ?? "featured");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = products.filter((p) => {
      if (q && !(`${p.name} ${p.shortDescription} ${p.color} ${p.motif}`.toLowerCase().includes(q)))
        return false;
      if (category !== "all" && p.category !== category) return false;
      if (p.price > maxPrice) return false;
      if (availability === "in" && p.stock <= 0) return false;
      if (availability === "out" && p.stock > 0) return false;
      if (tag === "new" && !p.newArrival) return false;
      if (tag === "best" && !p.bestSeller) return false;
      if (tag === "featured" && !p.featured) return false;
      return true;
    });
    out = [...out];
    if (sort === "low") out.sort((a, b) => a.price - b.price);
    if (sort === "high") out.sort((a, b) => b.price - a.price);
    if (sort === "new") out.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    if (sort === "best") out.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
    return out;
  }, [products, query, category, maxPrice, availability, tag, sort]);

  const reset = () => {
    setQuery("");
    setCategory("all");
    setMaxPrice(50000);
    setAvailability("all");
    setTag("all");
    setSort("featured");
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The Collection"
        title="Handloom Paithani Sarees"
        subtitle="Every saree here is handwoven pure silk with traditional zari. Filter by collection, price or occasion to find your weave."
      />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="h-fit rounded-sm border border-border bg-card p-5 lg:sticky lg:top-40">
          <h2 className="text-lg text-primary">Refine</h2>
          <div className="gold-rule my-4" />
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Search</label>
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Peacock, bridal, zari…" />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Category</label>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All collections</option>
                {categories.filter((c) => c.enabled).map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Max price · {formatINR(maxPrice)}
              </label>
              <input
                type="range"
                min={10000}
                max={50000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Availability</label>
              <Select value={availability} onChange={(e) => setAvailability(e.target.value)}>
                <option value="all">All</option>
                <option value="in">In stock</option>
                <option value="out">Sold out</option>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Highlights</label>
              <div className="flex flex-wrap gap-2">
                {[
                  ["all", "All"],
                  ["new", "New Arrivals"],
                  ["best", "Best Sellers"],
                  ["featured", "Featured"],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    onClick={() => setTag(v as string)}
                    className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors ${
                      tag === v ? "border-primary bg-primary text-primary-foreground" : "border-accent/40 hover:bg-accent/10"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={reset}>Reset Filters</Button>
          </div>
        </aside>

        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {list.length} saree{list.length === 1 ? "" : "s"}
            </p>
            <Select value={sort} onChange={(e) => setSort(e.target.value)} className="w-48">
              <option value="featured">Sort: Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="new">Newest First</option>
              <option value="best">Best Sellers</option>
            </Select>
          </div>

          {list.length === 0 ? (
            <EmptyState
              title="No matching Paithani"
              text="Try a wider price range or a different collection — or call 8806091907 and we will help you find the right weave."
            >
              <Button onClick={reset}>Reset Filters</Button>
            </EmptyState>
          ) : (
            <ProductGrid products={list} />
          )}
        </section>
      </div>
    </SiteLayout>
  );
}