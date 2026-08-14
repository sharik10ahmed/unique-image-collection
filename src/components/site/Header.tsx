import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/store/StoreContext";
import { formatINR } from "@/data/mockData";
import { IconBag, IconClose, IconHeart, IconMenu, IconSearch, IconUser } from "@/components/Icons";

const nav = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  {
    label: "Paithani Sarees",
    to: "/category/$category",
    params: { category: "traditional-paithani" },
  },
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

  // Lock body scroll when mobile menu or search is open
  useEffect(() => {
    if (open || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, searchOpen]);

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
    () =>
      q.length < 2 ? [] : categories.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 4),
    [categories, q],
  );

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-accent/25 bg-background/95 backdrop-blur">
        <div className="bg-primary px-2 py-1.5 text-center text-[10px] uppercase tracking-[0.2em] text-primary-foreground sm:py-2 sm:text-[11px] sm:tracking-[0.24em]">
          Authentic Handloom Paithani · Pune Boutique ·{" "}
          <a href="tel:8806091907" className="underline underline-offset-2">
            Call 8806091907
          </a>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-4 sm:py-4 lg:px-8">
          <button
            className="flex h-11 w-11 items-center justify-center rounded-sm text-primary active:bg-muted lg:hidden"
            aria-label="Open navigation menu"
            onClick={() => setOpen(true)}
          >
            <IconMenu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex flex-col items-center lg:items-start">
            <span className="font-[family-name:var(--font-display)] text-xl leading-none tracking-wide text-primary sm:text-2xl lg:text-3xl">
              Rituraj Paithani
            </span>
            <span className="mt-0.5 text-[8px] uppercase tracking-[0.3em] text-accent sm:mt-1 sm:text-[9px] sm:tracking-[0.36em]">
              Handloom Silk Boutique
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-3 text-primary">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-sm hover:text-secondary active:bg-muted"
            >
              <IconSearch className="h-5 w-5" />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative flex h-11 w-11 items-center justify-center rounded-sm hover:text-secondary active:bg-muted"
            >
              <IconHeart className="h-5 w-5" />
              {wishlist.length > 0 ? <Dot count={wishlist.length} /> : null}
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-sm hover:text-secondary active:bg-muted"
            >
              <IconBag className="h-5 w-5" />
              {cartCount > 0 ? <Dot count={cartCount} /> : null}
            </Link>
            <Link
              to={isAdmin ? "/admin/dashboard" : "/admin/login"}
              aria-label="Account"
              className="hidden h-11 w-11 items-center justify-center rounded-sm hover:text-secondary sm:flex"
            >
              <IconUser className="h-5 w-5" />
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
                  activeProps={{ className: "text-secondary font-semibold" }}
                  className="text-foreground/80 transition-colors hover:text-secondary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile Drawer - Rendered outside header to avoid backdrop-blur fixed positioning trap */}
      {open ? (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="fixed inset-0 bg-foreground/65 backdrop-blur-xs transition-opacity"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-[101] flex h-full w-[85%] max-w-xs flex-col bg-background pb-safe shadow-2xl border-r border-border">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-accent/25 px-5 py-4 bg-card">
              <div>
                <span className="font-[family-name:var(--font-display)] text-xl text-primary font-medium">
                  Rituraj Paithani
                </span>
                <p className="text-[9px] uppercase tracking-widest text-accent font-medium">
                  Pune Boutique
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-sm text-primary hover:bg-muted"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex-1 overflow-y-auto px-4 py-3 bg-background">
              <ul className="space-y-1">
                {nav.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      params={"params" in item ? item.params : {}}
                      onClick={() => setOpen(false)}
                      activeProps={{ className: "bg-accent/15 text-secondary font-semibold" }}
                      className="block rounded-sm px-3 py-3 text-sm uppercase tracking-[0.14em] text-foreground hover:bg-muted active:bg-muted"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/craftsmanship"
                    onClick={() => setOpen(false)}
                    className="block rounded-sm px-3 py-3 text-sm uppercase tracking-[0.14em] text-foreground hover:bg-muted"
                  >
                    The Art of Paithani
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    onClick={() => setOpen(false)}
                    className="block rounded-sm px-3 py-3 text-sm uppercase tracking-[0.14em] text-foreground hover:bg-muted"
                  >
                    FAQ & Shipping
                  </Link>
                </li>
              </ul>

              {/* Mobile Quick Contact Card in Drawer */}
              <div className="mt-6 rounded-sm border border-accent/30 bg-card p-4 text-xs">
                <p className="font-semibold uppercase tracking-wider text-primary">
                  Boutique Assistance
                </p>
                <p className="mt-1 text-muted-foreground">Wadgaon Sheri, Kharadi Road, Pune</p>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href="tel:8806091907"
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-3 py-2 text-center text-xs uppercase tracking-wider text-primary-foreground active:scale-98"
                  >
                    📞 Call 8806091907
                  </a>
                  <a
                    href="https://wa.me/918806091907?text=Hello%20Rituraj%20Paithani%2C%20I%20need%20help%20choosing%20a%20Paithani%20saree"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#25D366] bg-[#25D366]/10 px-3 py-2 text-center text-xs font-medium text-[#128C7E] active:scale-98"
                  >
                    💬 WhatsApp Consultation
                  </a>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-border px-5 py-3.5 bg-card">
              <Link
                to={isAdmin ? "/admin/dashboard" : "/admin/login"}
                onClick={() => setOpen(false)}
                className="block text-xs uppercase tracking-wider text-muted-foreground hover:text-primary"
              >
                {isAdmin ? "Admin Dashboard →" : "Admin Login"}
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile-optimized Search Modal - Rendered outside header to avoid backdrop-blur fixed positioning trap */}
      {searchOpen ? (
        <div className="fixed inset-0 z-[100]">
          <div
            className="fixed inset-0 bg-foreground/65 backdrop-blur-xs"
            onClick={() => setSearchOpen(false)}
          />
          <div className="fixed inset-x-0 top-0 z-[101] max-h-[90vh] overflow-y-auto bg-background p-4 pb-safe shadow-2xl sm:p-8 border-b border-border">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-3 border-b border-accent/50 pb-3">
                <IconSearch className="h-5 w-5 shrink-0 text-accent" />
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
                  className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground/70 sm:text-lg"
                />
                {query ? (
                  <button
                    onClick={() => setQuery("")}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
                    aria-label="Clear query"
                  >
                    ✕
                  </button>
                ) : null}
                <button
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground hover:text-primary"
                >
                  <IconClose className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 max-h-[60vh] overflow-y-auto">
                {q.length < 2 ? (
                  <div className="space-y-4 py-2">
                    <p className="text-xs text-muted-foreground">Popular Paithani searches:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Peacock Pallu",
                        "Bridal Red",
                        "Pure Gold Zari",
                        "Emerald Green",
                        "Royal Purple",
                        "Lotus Motif",
                      ].map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchOpen(false);
                            navigate({ to: "/shop", search: { q: term } });
                          }}
                          className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground hover:border-accent hover:bg-accent/10 active:scale-95"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : matches.length === 0 && categoryMatches.length === 0 ? (
                  <div className="py-6 text-center">
                    <p className="text-sm text-muted-foreground">No Paithani matched “{query}”.</p>
                    <a
                      href="tel:8806091907"
                      className="mt-3 inline-block rounded-sm bg-primary px-4 py-2 text-xs uppercase tracking-wider text-primary-foreground"
                    >
                      Call 8806091907 to Custom-Weave
                    </a>
                  </div>
                ) : (
                  <div className="space-y-6 py-2">
                    {categoryMatches.length > 0 ? (
                      <div>
                        <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-accent">
                          Collections
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {categoryMatches.map((c) => (
                            <Link
                              key={c.id}
                              to="/category/$category"
                              params={{ category: c.slug }}
                              onClick={() => setSearchOpen(false)}
                              className="rounded-full border border-accent/50 px-3 py-1.5 text-xs hover:bg-accent/10 active:scale-95"
                            >
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {matches.length > 0 ? (
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-[11px] uppercase tracking-[0.24em] text-accent">
                            Sarees ({matches.length})
                          </p>
                          <button
                            onClick={() => {
                              setSearchOpen(false);
                              navigate({ to: "/shop", search: { q: query } });
                            }}
                            className="text-xs uppercase tracking-wider text-secondary underline underline-offset-2"
                          >
                            View all in shop →
                          </button>
                        </div>
                        <ul className="divide-y divide-border">
                          {matches.map((m) => (
                            <li key={m.id}>
                              <Link
                                to="/product/$id"
                                params={{ id: m.id }}
                                onClick={() => setSearchOpen(false)}
                                className="flex items-center gap-3 py-3 hover:bg-muted/60 active:bg-muted"
                              >
                                <img
                                  src={m.images[0]}
                                  alt={m.name}
                                  loading="lazy"
                                  className="h-16 w-14 rounded-sm object-cover shrink-0"
                                />
                                <span className="flex-1 min-w-0">
                                  <span className="block truncate text-sm font-medium text-primary">
                                    {m.name}
                                  </span>
                                  <span className="block truncate text-xs text-muted-foreground">
                                    {m.shortDescription}
                                  </span>
                                </span>
                                <span className="text-sm font-semibold text-foreground shrink-0">
                                  {formatINR(m.price)}
                                </span>
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
    </>
  );
}

function Dot({ count }: { count: number }) {
  return (
    <span className="absolute right-1 top-1 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground shadow-sm">
      {count}
    </span>
  );
}
