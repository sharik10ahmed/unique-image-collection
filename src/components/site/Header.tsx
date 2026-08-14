import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/store/StoreContext";
import { formatINR } from "@/data/mockData";
import { IconBag, IconClose, IconHeart, IconMenu, IconSearch, IconUser } from "@/components/Icons";

const nav = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Paithani Sarees", to: "/category/$category", params: { category: "traditional-paithani" } },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Wedding Collection", to: "/wedding-collection" },
  { label: "Festive Collection", to: "/festive-collection" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const { cartCount, wishlist, products, categories, isAdmin } = useStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  const q = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      q.length < 2
        ? []
        : products
            .filter(
              (p) =>
                p.name.toLowerCase().includes(q) ||
                p.color.toLowerCase().includes(q) ||
                p.category.includes(q) ||
                p.shortDescription.toLowerCase().includes(q),
            )
            .slice(0, 6),
    [products, q],
  );
  const categoryMatches = useMemo(
    () => (q.length < 2 ? [] : categories.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 4)),
    [categories, q],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-accent/25 bg-background/95 backdrop-blur">
      <div className="bg-primary py-2 text-center text-[11px] uppercase tracking-[0.24em] text-primary-foreground">
        Authentic Handloom Paithani · Woven in Maharashtra · Call 8806091907
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen(true)}>
          <IconMenu className="h-6 w-6 text-primary" />
        </button>

        <Link to="/" className="flex flex-col items-center lg:items-start">
          <span className="font-[family-name:var(--font-display)] text-2xl leading-none tracking-wide text-primary sm:text-3xl">
            Rituraj Paithani
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.36em] text-accent">
            Handloom Silk Boutique
          </span>
        </Link>

        <div className="flex items-center gap-4 text-primary">
          <button aria-label="Search" onClick={() => setSearchOpen(true)} className="hover:text-secondary">
            <IconSearch />
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="relative hover:text-secondary">
            <IconHeart />
            {wishlist.length > 0 ? <Dot count={wishlist.length} /> : null}
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative hover:text-secondary">
            <IconBag />
            {cartCount > 0 ? <Dot count={cartCount} /> : null}
          </Link>
          <Link
            to={isAdmin ? "/admin/dashboard" : "/admin/login"}
            aria-label="Account"
            className="hidden hover:text-secondary sm:block"
          >
            <IconUser />
          </Link>
        </div>
      </div>

      <nav className="hidden border-t border-accent/20 lg:block">
        <ul className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-4 py-3 text-[12px] uppercase tracking-[0.16em]">
          {nav.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                params={"params" in item ? item.params : {}}
                activeProps={{ className: "text-secondary" }}
                className="text-foreground/80 transition-colors hover:text-secondary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-100 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setOpen(false)} />
          <div className="fade-up absolute left-0 top-0 h-full w-[82%] max-w-xs overflow-y-auto bg-background p-6">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-display)] text-xl text-primary">Rituraj Paithani</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <IconClose className="h-5 w-5 text-primary" />
              </button>
            </div>
            <div className="gold-rule my-5" />
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    params={"params" in item ? item.params : {}}
                    onClick={() => setOpen(false)}
                    className="block rounded-sm px-2 py-3 text-sm uppercase tracking-[0.14em] text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/craftsmanship"
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-2 py-3 text-sm uppercase tracking-[0.14em] text-foreground hover:bg-muted"
                >
                  The Art of Paithani
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-2 py-3 text-sm uppercase tracking-[0.14em] text-foreground hover:bg-muted"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : null}

      {searchOpen ? (
        <div className="fixed inset-0 z-100">
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="fade-up absolute inset-x-0 top-0 bg-background p-5 shadow-xl sm:p-8">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-3 border-b border-accent/50 pb-3">
                <IconSearch className="h-5 w-5 text-accent" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchOpen(false);
                      navigate({ to: "/shop", search: { q: query } });
                    }
                  }}
                  placeholder="Search peacock motif, wedding Paithani, pure zari…"
                  className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground/70"
                />
                <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                  <IconClose className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="mt-5 max-h-[60vh] overflow-y-auto">
                {q.length < 2 ? (
                  <p className="text-sm text-muted-foreground">
                    Try “peacock”, “bridal”, “pure zari” or “green Paithani”.
                  </p>
                ) : matches.length === 0 && categoryMatches.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No Paithani matched “{query}”. Call 8806091907 and we will weave-source it for you.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {categoryMatches.length > 0 ? (
                      <div>
                        <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-accent">Collections</p>
                        <div className="flex flex-wrap gap-2">
                          {categoryMatches.map((c) => (
                            <Link
                              key={c.id}
                              to="/category/$category"
                              params={{ category: c.slug }}
                              onClick={() => setSearchOpen(false)}
                              className="rounded-full border border-accent/50 px-3 py-1 text-xs hover:bg-accent/10"
                            >
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {matches.length > 0 ? (
                      <div>
                        <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-accent">Sarees</p>
                        <ul className="divide-y divide-border">
                          {matches.map((m) => (
                            <li key={m.id}>
                              <Link
                                to="/product/$id"
                                params={{ id: m.id }}
                                onClick={() => setSearchOpen(false)}
                                className="flex items-center gap-4 py-3 hover:bg-muted/60"
                              >
                                <img src={m.images[0]} alt={m.name} loading="lazy" className="h-16 w-14 rounded-sm object-cover" />
                                <span className="flex-1">
                                  <span className="block text-sm text-primary">{m.name}</span>
                                  <span className="block text-xs text-muted-foreground">{m.shortDescription}</span>
                                </span>
                                <span className="text-sm">{formatINR(m.price)}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Dot({ count }: { count: number }) {
  return (
    <span className="absolute -right-2 -top-1.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
      {count}
    </span>
  );
}