import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Badge, Button, EmptyState, SectionTitle } from "@/components/ui/Primitives";
import { ProductGrid } from "@/components/site/ProductCard";
import { useStore } from "@/store/StoreContext";
import { discountPercent, formatINR } from "@/data/mockData";
import { IconChevron, IconHeart, IconShare, IconWhatsApp } from "@/components/Icons";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "Paithani Saree Details | Rituraj Paithani" },
      {
        name: "description",
        content:
          "Craftsmanship details, zari work, motifs and occasion notes for this handwoven Paithani saree.",
      },
      { property: "og:title", content: "Handwoven Paithani Saree | Rituraj Paithani" },
      {
        property: "og:description",
        content: "Pure silk, traditional zari and handmade Maharashtrian motifs.",
      },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const { products, addToCart, toggleWishlist, wishlist, notify } = useStore();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>("craft");

  if (!product) {
    return (
      <SiteLayout>
        <div className="py-24">
          <EmptyState title="Saree not found" text="This weave may have found its home already.">
            <Link to="/shop">
              <Button>Back to Shop</Button>
            </Link>
          </EmptyState>
        </div>
      </SiteLayout>
    );
  }

  const off = discountPercent(product.price, product.originalPrice);
  const saved = wishlist.includes(product.id);
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const shareSaree = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out this handwoven ${product.name} at Rituraj Paithani`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      notify("Saree link copied to clipboard!");
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Rituraj Paithani, I am interested in this saree: "${product.name}" (Price: ${formatINR(product.price)}). Can you share more photos/videos or weaving details?`,
  );

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10 lg:px-8 pb-24 lg:pb-10">
        <nav className="mb-4 sm:mb-8 text-[11px] sm:text-xs uppercase tracking-[0.16em] text-muted-foreground truncate">
          <Link to="/" className="hover:text-accent">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/shop" className="hover:text-accent">
            Shop
          </Link>{" "}
          / <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery Section */}
          <div>
            <div className="relative overflow-hidden rounded-sm border border-border bg-card">
              <img
                src={product.images[active]}
                alt={`${product.name} — handwoven Paithani saree`}
                className="aspect-4/5 w-full object-cover transition-all duration-300"
              />
              {off > 0 ? (
                <span className="absolute left-3 top-3 rounded-sm bg-maroon px-2 py-1 text-xs uppercase tracking-widest text-background font-medium">
                  {off}% Off
                </span>
              ) : null}
              <button
                onClick={shareSaree}
                aria-label="Share saree"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-card/90 text-foreground shadow-sm backdrop-blur-xs hover:text-primary active:scale-95"
              >
                <IconShare className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Thumbnails - Touch Friendly Horizontal Scroll */}
            <div className="mt-3 sm:mt-4 flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActive(i)}
                  className={`h-20 w-16 sm:h-24 sm:w-20 shrink-0 overflow-hidden rounded-sm border-2 transition-all active:scale-95 ${
                    active === i
                      ? "border-accent ring-2 ring-accent/30"
                      : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Actions Section */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="green">
                {product.weaving} · {product.work}
              </Badge>
              {product.newArrival ? <Badge>New Arrival</Badge> : null}
              {product.bestSeller ? <Badge tone="maroon">Best Seller</Badge> : null}
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl text-primary font-medium">
              {product.name}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              {product.shortDescription}
            </p>

            <div className="mt-4 sm:mt-6 flex flex-wrap items-baseline gap-2.5 sm:gap-3">
              <span className="text-2xl sm:text-3xl font-semibold text-foreground">
                {formatINR(product.price)}
              </span>
              {product.originalPrice ? (
                <span className="text-sm sm:text-base text-muted-foreground line-through">
                  {formatINR(product.originalPrice)}
                </span>
              ) : null}
              {off > 0 ? <Badge tone="maroon">{off}% Off</Badge> : null}
            </div>
            <p className="mt-1.5 text-[11px] sm:text-xs text-muted-foreground">
              Inclusive of all taxes · Free insured shipping across India
            </p>

            <div className="gold-rule my-5 sm:my-6" />

            <p className="text-xs sm:text-sm leading-relaxed text-foreground/85">
              {product.description}
            </p>

            <div className="mt-5">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-accent font-medium">
                Availability
              </p>
              <p className="mt-1 text-xs sm:text-sm">
                {product.stock > 0 ? (
                  <span className="text-peacock font-medium">
                    ● In stock · {product.stock} piece{product.stock === 1 ? "" : "s"} ready to
                    dispatch
                  </span>
                ) : (
                  <span className="text-maroon font-medium">
                    ● Currently sold out — call 8806091907 to commission
                  </span>
                )}
              </p>
            </div>

            {/* Desktop Action Buttons */}
            <div className="mt-6 hidden lg:flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-sm border border-border">
                <button
                  className="px-4 py-2.5 text-lg hover:bg-muted"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  className="px-4 py-2.5 text-lg hover:bg-muted"
                  onClick={() => setQty(qty + 1)}
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
              <Button
                size="lg"
                disabled={product.stock <= 0}
                onClick={() => addToCart(product.id, qty)}
              >
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="gold"
                disabled={product.stock <= 0}
                onClick={() => {
                  addToCart(product.id, qty);
                  navigate({ to: "/checkout" });
                }}
              >
                Buy Now
              </Button>
              <Button variant="outline" size="lg" onClick={() => toggleWishlist(product.id)}>
                <IconHeart filled={saved} className="h-4 w-4" /> {saved ? "Saved" : "Wishlist"}
              </Button>
            </div>

            {/* Direct WhatsApp Consultation Button */}
            <div className="mt-5">
              <a
                href={`https://wa.me/918806091907?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-sm border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3 text-xs sm:text-sm font-medium text-[#128C7E] transition-all hover:bg-[#25D366]/20 active:scale-98"
              >
                <IconWhatsApp className="h-4.5 w-4.5 text-[#25D366]" />
                <span>Ask for Video / Photos on WhatsApp</span>
              </a>
            </div>

            {/* Collapsible Accordion Sections for Mobile & Clean Reading */}
            <div className="mt-8 space-y-3">
              {/* Craftsmanship Accordion */}
              <div className="rounded-sm border border-accent/40 bg-card overflow-hidden">
                <button
                  onClick={() => setOpenSection(openSection === "craft" ? null : "craft")}
                  className="flex w-full items-center justify-between p-4 text-left font-medium text-primary hover:bg-muted/40"
                >
                  <span className="text-base sm:text-lg">Craftsmanship Details</span>
                  <IconChevron
                    className={`h-4 w-4 transition-transform duration-200 ${openSection === "craft" ? "rotate-180" : ""}`}
                  />
                </button>
                {openSection === "craft" ? (
                  <div className="border-t border-border px-4 py-4">
                    <dl className="grid grid-cols-2 gap-3 text-xs">
                      {[
                        ["Fabric", product.fabric],
                        ["Weaving", product.weaving],
                        ["Work", product.work],
                        ["Zari", product.zari],
                        ["Motif", product.motif],
                        ["Occasion", product.occasion],
                        ["Colour", product.color],
                        ["Collection", product.category.replace(/-/g, " ")],
                      ].map(([k, v]) => (
                        <div
                          key={k}
                          className="rounded-sm border border-border/80 p-2.5 bg-muted/20"
                        >
                          <dt className="text-[10px] uppercase tracking-wider text-accent font-medium">
                            {k}
                          </dt>
                          <dd className="mt-0.5 text-xs capitalize text-foreground font-medium">
                            {v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null}
              </div>

              {/* Product Information Accordion */}
              <div className="rounded-sm border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenSection(openSection === "info" ? null : "info")}
                  className="flex w-full items-center justify-between p-4 text-left font-medium text-primary hover:bg-muted/40"
                >
                  <span className="text-base sm:text-lg">Dimensions & Specifications</span>
                  <IconChevron
                    className={`h-4 w-4 transition-transform duration-200 ${openSection === "info" ? "rotate-180" : ""}`}
                  />
                </button>
                {openSection === "info" ? (
                  <div className="border-t border-border px-4 py-4">
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li>• Saree length: 5.5 meters with unstitched blouse piece (0.8m)</li>
                      <li>• 100% pure silk yarns dyed in natural traditional palettes</li>
                      <li>• Handwoven — slight weave textures are authentic marks of handloom</li>
                      <li>• Dispatched in 2-3 business days in insured silk-safe box packaging</li>
                    </ul>
                  </div>
                ) : null}
              </div>

              {/* Care Instructions Accordion */}
              <div className="rounded-sm border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenSection(openSection === "care" ? null : "care")}
                  className="flex w-full items-center justify-between p-4 text-left font-medium text-primary hover:bg-muted/40"
                >
                  <span className="text-base sm:text-lg">Care & Preservation</span>
                  <IconChevron
                    className={`h-4 w-4 transition-transform duration-200 ${openSection === "care" ? "rotate-180" : ""}`}
                  />
                </button>
                {openSection === "care" ? (
                  <div className="border-t border-border px-4 py-4">
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li>• Dry clean only by experienced silk specialists</li>
                      <li>• Store wrapped in pure cotton or muslin fabric</li>
                      <li>• Periodically change folds every 4-6 months to maintain zari luster</li>
                      <li>• Avoid direct spray of perfumes and keep away from moisture</li>
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-16 sm:mt-24">
            <SectionTitle eyebrow="You May Also Love" title="Similar Handloom Weaves" />
            <div className="mt-8 sm:mt-10">
              <ProductGrid products={related} />
            </div>
          </section>
        ) : null}
      </div>

      {/* Sticky Mobile Bottom CTA Bar */}
      <div className="fixed inset-x-0 bottom-14 z-30 flex items-center justify-between gap-3 border-t border-accent/30 bg-background/95 px-4 py-2.5 shadow-[0_-8px_20px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Total Price
          </span>
          <span className="text-base font-bold text-primary">{formatINR(product.price * qty)}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label="Wishlist"
            className={`flex h-10 w-10 items-center justify-center rounded-sm border border-accent/50 bg-card ${
              saved ? "text-secondary" : "text-foreground"
            }`}
          >
            <IconHeart filled={saved} className="h-4.5 w-4.5" />
          </button>
          <Button
            size="sm"
            disabled={product.stock <= 0}
            onClick={() => addToCart(product.id, qty)}
            className="px-3"
          >
            Add to Bag
          </Button>
          <Button
            size="sm"
            variant="gold"
            disabled={product.stock <= 0}
            onClick={() => {
              addToCart(product.id, qty);
              navigate({ to: "/checkout" });
            }}
            className="px-3.5"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
}
