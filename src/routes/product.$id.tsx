import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Badge, Button, EmptyState, SectionTitle } from "@/components/ui/Primitives";
import { ProductGrid } from "@/components/site/ProductCard";
import { useStore } from "@/store/StoreContext";
import { discountPercent, formatINR } from "@/data/mockData";
import { IconHeart } from "@/components/Icons";

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
      { property: "og:description", content: "Pure silk, traditional zari and handmade Maharashtrian motifs." },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const { products, addToCart, toggleWishlist, wishlist } = useStore();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <SiteLayout>
        <div className="py-24">
          <EmptyState title="Saree not found" text="This weave may have found its home already.">
            <Link to="/shop"><Button>Back to Shop</Button></Link>
          </EmptyState>
        </div>
      </SiteLayout>
    );
  }

  const off = discountPercent(product.price, product.originalPrice);
  const saved = wishlist.includes(product.id);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <nav className="mb-8 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link> / <Link to="/shop" className="hover:text-accent">Shop</Link> /{" "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <img
              src={product.images[active]}
              alt={`${product.name} — handwoven Paithani saree`}
              className="aspect-4/5 w-full rounded-sm border border-border object-cover"
            />
            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActive(i)}
                  className={`h-24 w-20 overflow-hidden rounded-sm border transition-colors ${
                    active === i ? "border-accent" : "border-border hover:border-accent/60"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="green">{product.weaving} · {product.work}</Badge>
              {product.newArrival ? <Badge>New Arrival</Badge> : null}
              {product.bestSeller ? <Badge tone="maroon">Best Seller</Badge> : null}
            </div>
            <h1 className="mt-4 text-4xl text-primary">{product.name}</h1>
            <p className="mt-3 text-sm text-muted-foreground">{product.shortDescription}</p>

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl text-foreground">{formatINR(product.price)}</span>
              {product.originalPrice ? (
                <span className="text-base text-muted-foreground line-through">{formatINR(product.originalPrice)}</span>
              ) : null}
              {off > 0 ? <Badge tone="maroon">{off}% Off</Badge> : null}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Inclusive of all taxes · Free insured shipping across India</p>

            <div className="gold-rule my-7" />

            <p className="text-sm leading-relaxed text-foreground/85">{product.description}</p>

            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Availability</p>
              <p className="mt-1 text-sm">
                {product.stock > 0 ? (
                  <span className="text-peacock">In stock · {product.stock} piece{product.stock === 1 ? "" : "s"} available</span>
                ) : (
                  <span className="text-maroon">Currently unavailable — call 8806091907 to commission a similar weave</span>
                )}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-sm border border-border">
                <button className="px-4 py-2.5 text-lg" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button className="px-4 py-2.5 text-lg" onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
              </div>
              <Button size="lg" disabled={product.stock <= 0} onClick={() => addToCart(product.id, qty)}>
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

            <div className="mt-10 rounded-sm border border-accent/40 bg-card p-6">
              <h2 className="text-2xl text-primary">Craftsmanship Details</h2>
              <div className="gold-rule my-4 w-20" />
              <dl className="grid gap-4 sm:grid-cols-2">
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
                  <div key={k}>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-accent">{k}</dt>
                    <dd className="mt-1 text-sm capitalize text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-sm border border-border bg-card p-5">
                <h3 className="text-lg text-primary">Product Information</h3>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  <li>Saree length 5.5m with unstitched blouse piece 0.8m</li>
                  <li>Handwoven — slight irregularities are proof of handloom work</li>
                  <li>Colour may vary slightly with screen and lighting</li>
                  <li>Dispatched in 2-3 working days from Pune</li>
                </ul>
              </div>
              <div className="rounded-sm border border-border bg-card p-5">
                <h3 className="text-lg text-primary">Care Instructions</h3>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  <li>Dry clean only</li>
                  <li>Store wrapped in cotton or muslin cloth</li>
                  <li>Refold every few months to protect the zari</li>
                  <li>Keep away from direct sunlight, perfume and moisture</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-24">
            <SectionTitle eyebrow="You May Also Love" title="Similar Handloom Weaves" />
            <div className="mt-10">
              <ProductGrid products={related} />
            </div>
          </section>
        ) : null}
      </div>
    </SiteLayout>
  );
}