import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { discountPercent, formatINR, type Product } from "@/data/mockData";
import { useStore } from "@/store/StoreContext";
import { IconEye, IconHeart } from "@/components/Icons";
import { Button, Modal } from "@/components/ui/Primitives";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [quickView, setQuickView] = useState(false);
  const off = discountPercent(product.price, product.originalPrice);
  const saved = wishlist.includes(product.id);
  const soldOut = product.stock <= 0;

  return (
    <>
      <article className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-all duration-500 hover:border-accent/60 hover:shadow-[0_20px_50px_-30px_rgba(106,27,93,0.55)]">
        <Link to="/product/$id" params={{ id: product.id }} className="relative block overflow-hidden">
          <img
            src={product.images[0]}
            alt={`${product.name} handwoven Paithani saree`}
            loading="lazy"
            width={1000}
            height={1250}
            className="aspect-4/5 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {off > 0 ? (
              <span className="rounded-sm bg-maroon px-2 py-1 text-[10px] uppercase tracking-widest text-background">
                {off}% Off
              </span>
            ) : null}
            {product.newArrival ? (
              <span className="rounded-sm bg-peacock px-2 py-1 text-[10px] uppercase tracking-widest text-background">
                New
              </span>
            ) : null}
            {soldOut ? (
              <span className="rounded-sm bg-foreground/80 px-2 py-1 text-[10px] uppercase tracking-widest text-background">
                Sold Out
              </span>
            ) : null}
          </div>
        </Link>

        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Add to wishlist"
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-accent/40 bg-card/90 transition-colors ${saved ? "text-secondary" : "text-foreground hover:text-secondary"}`}
        >
          <IconHeart filled={saved} className="h-4.5 w-4.5" />
        </button>

        <button
          onClick={() => setQuickView(true)}
          className="absolute inset-x-3 bottom-[6.5rem] hidden items-center justify-center gap-2 rounded-sm border border-accent/50 bg-card/95 py-2 text-[11px] uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:opacity-100 sm:flex"
        >
          <IconEye className="h-4 w-4" /> Quick View
        </button>

        <div className="flex flex-1 flex-col p-4">
          <Link to="/product/$id" params={{ id: product.id }}>
            <h3 className="text-lg leading-snug text-primary transition-colors hover:text-secondary">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-base font-semibold text-foreground">{formatINR(product.price)}</span>
            {product.originalPrice ? (
              <span className="text-xs text-muted-foreground line-through">
                {formatINR(product.originalPrice)}
              </span>
            ) : null}
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              size="sm"
              className="flex-1"
              disabled={soldOut}
              onClick={() => addToCart(product.id)}
            >
              {soldOut ? "Unavailable" : "Add to Cart"}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setQuickView(true)} aria-label="Quick view">
              <IconEye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>

      <Modal open={quickView} onClose={() => setQuickView(false)} title={product.name} wide>
        <div className="grid gap-6 sm:grid-cols-2">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="aspect-4/5 w-full rounded-sm object-cover"
          />
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-primary">{formatINR(product.price)}</span>
              {product.originalPrice ? (
                <span className="text-sm text-muted-foreground line-through">
                  {formatINR(product.originalPrice)}
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {[
                ["Fabric", product.fabric],
                ["Weaving", product.weaving],
                ["Zari", product.zari],
                ["Motif", product.motif],
              ].map(([k, v]) => (
                <div key={k} className="rounded-sm border border-border p-2">
                  <dt className="uppercase tracking-widest text-accent">{k}</dt>
                  <dd className="mt-1 text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex gap-2">
              <Button className="flex-1" disabled={soldOut} onClick={() => addToCart(product.id)}>
                Add to Cart
              </Button>
              <Link to="/product/$id" params={{ id: product.id }} onClick={() => setQuickView(false)}>
                <Button variant="outline">View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}