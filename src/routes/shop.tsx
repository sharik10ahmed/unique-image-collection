import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ProductGrid } from "@/components/site/ProductCard";
import { Button, EmptyState, Input, Select } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { formatINR } from "@/data/mockData";
import { IconClose, IconFilter, IconSearch } from "@/components/Icons";

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
      {
        property: "og:description",
        content: "Filter our full Paithani collection by category, price and availability.",
      },
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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state if URL query params change
  useEffect(() => {
    if (search.q !== undefined) setQuery(search.q);
    if (search.category !== undefined) setCategory(search.category);
    if (search.sort !== undefined) setSort(search.sort);
  }, [search.q, search.category, search.sort]);

  // Lock scroll when mobile filter drawer is open
  useEffect(() => {
    if (mobileFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (query) count++;
    if (category !== "all") count++;
    if (maxPrice < 50000) count++;
    if (availability !== "all") count++;
    if (tag !== "all") count++;
    return count;
  }, [query, category, maxPrice, availability, tag]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = products.filter((p) => {
      if (q && !`${p.name} ${p.shortDescription} ${p.color} ${p.motif}`.toLowerCase().includes(q))
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

  const FilterForm = () => (
    <div className="space-y-5">
      <div>
        <label className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Search
        </label>
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Peacock, bridal, zari…"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          ) : null}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Category
        </label>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All collections</option>
          {categories
            .filter((c) => c.enabled)
            .map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
        </Select>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Max price
          </label>
          <span className="text-xs font-semibold text-primary">{formatINR(maxPrice)}</span>
        </div>
        <input
          type="range"
          min={10000}
          max={50000}
          step={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--primary)] h-2 bg-muted rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>₹10,000</span>
          <span>₹50,000</span>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Availability
        </label>
        <Select value={availability} onChange={(e) => setAvailability(e.target.value)}>
          <option value="all">All</option>
          <option value="in">In stock</option>
          <option value="out">Sold out</option>
        </Select>
      </div>
      <div>
        <label className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Highlights
        </label>
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
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors active:scale-95 ${
                tag === v
                  ? "border-primary bg-primary text-primary-foreground font-medium"
                  : "border-accent/40 hover:bg-accent/10"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={reset}>
        Reset All Filters
      </Button>
    </div>
  );

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The Collection"
        title="Handloom Paithani Sarees"
        subtitle="Every saree here is handwoven pure silk with traditional zari. Filter by collection, price or occasion to find your weave."
      />

      {/* Horizontal Scrollable Category Bar (Mobile & Desktop) */}
      <div className="border-b border-border bg-card/70 py-2.5">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 no-scrollbar lg:px-8">
          <button
            onClick={() => setCategory("all")}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-wider transition-colors active:scale-95 ${
              category === "all"
                ? "border-primary bg-primary text-primary-foreground font-medium"
                : "border-accent/40 bg-card hover:bg-accent/10"
            }`}
          >
            All Collections
          </button>
          {categories
            .filter((c) => c.enabled)
            .map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.slug)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-wider transition-colors active:scale-95 ${
                  category === c.slug
                    ? "border-primary bg-primary text-primary-foreground font-medium"
                    : "border-accent/40 bg-card hover:bg-accent/10"
                }`}
              >
                {c.name}
              </button>
            ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10 lg:grid lg:grid-cols-[260px_1fr] lg:gap-8 lg:px-8">
        {/* Desktop Aside */}
        <aside className="hidden h-fit rounded-sm border border-border bg-card p-5 lg:sticky lg:top-40 lg:block">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-primary">Refine</h2>
            {activeFilterCount > 0 ? (
              <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                {activeFilterCount} active
              </span>
            ) : null}
          </div>
          <div className="gold-rule my-4" />
          <FilterForm />
        </aside>

        <section>
          {/* Mobile Filter & Sort Sticky/Action Bar */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2.5 rounded-sm border border-border bg-card p-3 shadow-xs lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none">
            <div className="flex items-center gap-2">
              {/* Mobile Filter Trigger Button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-sm border border-accent/60 bg-card px-3.5 py-2 text-xs font-medium uppercase tracking-wider text-primary shadow-xs transition-colors hover:bg-accent/10 active:scale-95 lg:hidden"
              >
                <IconFilter className="h-4 w-4 text-accent" />
                <span>Filters</span>
                {activeFilterCount > 0 ? (
                  <span className="grid h-4.5 min-w-4.5 place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                    {activeFilterCount}
                  </span>
                ) : null}
              </button>

              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {list.length} saree{list.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="shop-sort"
                className="hidden text-xs uppercase tracking-wider text-muted-foreground sm:inline"
              >
                Sort:
              </label>
              <Select
                id="shop-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-36 sm:w-48 text-xs py-2"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="new">Newest First</option>
                <option value="best">Best Sellers</option>
              </Select>
            </div>
          </div>

          {/* Active Filter Pills on Mobile/Desktop */}
          {activeFilterCount > 0 ? (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Active:
              </span>
              {category !== "all" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 text-xs">
                  {categories.find((c) => c.slug === category)?.name || category}
                  <button onClick={() => setCategory("all")} className="hover:text-primary">
                    ✕
                  </button>
                </span>
              ) : null}
              {query ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 text-xs">
                  “{query}”
                  <button onClick={() => setQuery("")} className="hover:text-primary">
                    ✕
                  </button>
                </span>
              ) : null}
              {maxPrice < 50000 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 text-xs">
                  Under {formatINR(maxPrice)}
                  <button onClick={() => setMaxPrice(50000)} className="hover:text-primary">
                    ✕
                  </button>
                </span>
              ) : null}
              {tag !== "all" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 text-xs capitalize">
                  {tag}
                  <button onClick={() => setTag("all")} className="hover:text-primary">
                    ✕
                  </button>
                </span>
              ) : null}
              <button
                onClick={reset}
                className="text-xs uppercase tracking-wider text-secondary underline underline-offset-2 hover:opacity-80"
              >
                Clear all
              </button>
            </div>
          ) : null}

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

      {/* Mobile Filter Slide-Over Drawer */}
      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="fixed inset-0 bg-foreground/65 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-[101] flex w-[88%] max-w-sm flex-col bg-background shadow-2xl pb-safe border-l border-border">
            <div className="flex items-center justify-between border-b border-border px-5 py-4 bg-card">
              <div className="flex items-center gap-2">
                <IconFilter className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-medium text-primary">Filter Sarees</h3>
              </div>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 bg-background">
              <FilterForm />
            </div>

            <div className="border-t border-border p-4 bg-card flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </Button>
              <Button className="flex-1" onClick={() => setMobileFiltersOpen(false)}>
                Show {list.length} Sarees
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </SiteLayout>
  );
}
