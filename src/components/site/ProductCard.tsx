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
      <article className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:border-accent/60 hover:shadow-[0_12px_30px_-15px_rgba(106,27,93,0.4)]">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="relative block overflow-hidden"
        >
          <img
            src={product.images[0]}
            alt={`${product.name} handwoven Paithani saree`}
            loading="lazy"
            width={1000}
            height={1250}
            className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2 sm:left-3 sm:top-3 flex flex-col gap-1 sm:gap-1.5">
            {off > 0 ? (
              <span className="rounded-sm bg-maroon px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-[10px] uppercase tracking-widest text-background font-medium shadow-sm">
                {off}% Off
              </span>
            ) : null}
            {product.newArrival ? (
              <span className="rounded-sm bg-peacock px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-[10px] uppercase tracking-widest text-background font-medium shadow-sm">
                New
              </span>
            ) : null}
            {soldOut ? (
              <span className="rounded-sm bg-foreground/85 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-[10px] uppercase tracking-widest text-background font-medium shadow-sm">
                Sold Out
              </span>
            ) : null}
          </div>
        </Link>

        {/* Wishlist Button - Min 40x40px touch area */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-2 top-2 sm:right-3 sm:top-3 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-accent/40 bg-card/90 shadow-sm backdrop-blur-xs transition-transform active:scale-90 ${
            saved ? "text-secondary" : "text-foreground hover:text-secondary"
          }`}
        >
          <IconHeart filled={saved} className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
        </button>

        <button
          onClick={() => setQuickView(true)}
          className="absolute inset-x-3 bottom-[6.5rem] hidden items-center justify-center gap-2 rounded-sm border border-accent/50 bg-card/95 py-2 text-[11px] uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:opacity-100 sm:flex"
        >
          <IconEye className="h-4 w-4" /> Quick View
        </button>

        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <Link to="/product/$id" params={{ id: product.id }}>
            <h3 className="line-clamp-1 text-sm sm:text-base lg:text-lg font-medium leading-snug text-primary transition-colors hover:text-secondary">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-1 sm:line-clamp-2 text-[11px] sm:text-xs leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>
          <div className="mt-2.5 sm:mt-3 flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-sm sm:text-base font-semibold text-foreground">
              {formatINR(product.price)}
            </span>
            {product.originalPrice ? (
              <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                {formatINR(product.originalPrice)}
              </span>
            ) : null}
          </div>
          <div className="mt-3 sm:mt-4 flex gap-1.5 sm:gap-2">
            <Button
              size="sm"
              className="flex-1 text-[11px] sm:text-xs px-2 sm:px-3"
              disabled={soldOut}
              onClick={() => addToCart(product.id)}
            >
              {soldOut ? "Sold Out" : "Add to Cart"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuickView(true)}
              aria-label="Quick view"
              className="px-2.5 sm:px-3"
            >
              <IconEye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>

      <Modal open={quickView} onClose={() => setQuickView(false)} title={product.name} wide>
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="aspect-4/5 w-full rounded-sm object-cover"
          />
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-medium text-primary">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice ? (
                  <span className="text-xs sm:text-sm text-muted-foreground line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                ) : null}
                {off > 0 ? (
                  <span className="rounded-sm bg-maroon px-2 py-0.5 text-[10px] uppercase text-background">
                    {off}% Off
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                {[
                  ["Fabric", product.fabric],
                  ["Weaving", product.weaving],
                  ["Zari", product.zari],
                  ["Motif", product.motif],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-sm border border-border p-2">
                    <dt className="text-[10px] uppercase tracking-widest text-accent">{k}</dt>
                    <dd className="mt-0.5 text-foreground capitalize">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-2">
              <Button className="flex-1" disabled={soldOut} onClick={() => addToCart(product.id)}>
                {soldOut ? "Unavailable" : "Add to Cart"}
              </Button>
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                onClick={() => setQuickView(false)}
                className="w-full sm:w-auto"
              >
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
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
    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
