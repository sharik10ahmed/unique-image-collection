import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button, EmptyState } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { formatINR } from "@/data/mockData";
import { IconHeart, IconTrash } from "@/components/Icons";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Rituraj Paithani" },
      {
        name: "description",
        content: "Review the handloom Paithani sarees in your shopping bag before checkout.",
      },
      { property: "og:title", content: "Your Cart | Rituraj Paithani" },
      { property: "og:description", content: "Review your selected Paithani sarees." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, products, updateQty, removeFromCart, cartSubtotal, cartSavings, toggleWishlist } =
    useStore();
  const lines = cart
    .map((l) => ({ line: l, product: products.find((p) => p.id === l.productId) }))
    .filter((x) => x.product);

  return (
    <SiteLayout>
      <PageHeader eyebrow="Shopping Bag" title="Your Cart" />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-14 lg:px-8">
        {lines.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            text="Discover handwoven Paithani sarees with pure zari borders and traditional motifs."
          >
            <Link to="/shop">
              <Button>Shop Paithani Sarees</Button>
            </Link>
          </EmptyState>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-10">
            <div className="space-y-4">
              {lines.map(({ line, product }) => (
                <div
                  key={line.productId}
                  className="flex gap-3.5 rounded-sm border border-border bg-card p-3.5 sm:p-4 sm:gap-5"
                >
                  <Link to="/product/$id" params={{ id: product!.id }} className="shrink-0">
                    <img
                      src={product!.images[0]}
                      alt={product!.name}
                      loading="lazy"
                      className="h-28 w-22 sm:h-36 sm:w-28 rounded-sm object-cover border border-border"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link to="/product/$id" params={{ id: product!.id }} className="truncate">
                          <h2 className="text-base sm:text-lg font-medium text-primary hover:text-secondary truncate">
                            {product!.name}
                          </h2>
                        </Link>
                        <span className="text-sm sm:text-base font-semibold text-foreground shrink-0">
                          {formatINR(product!.price * line.qty)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground truncate">
                        {product!.fabric} · {product!.weaving}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground sm:hidden">
                        {formatINR(product!.price)} each
                      </p>
                    </div>

                    {/* Quantity Stepper & Actions */}
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-2 sm:border-none sm:pt-0">
                      <div className="flex items-center rounded-sm border border-border bg-background">
                        <button
                          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-base hover:bg-muted active:bg-muted"
                          onClick={() => updateQty(line.productId, line.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs sm:text-sm font-medium">
                          {line.qty}
                        </span>
                        <button
                          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-base hover:bg-muted active:bg-muted"
                          onClick={() => updateQty(line.productId, line.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            toggleWishlist(product!.id);
                            removeFromCart(product!.id);
                          }}
                          className="flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
                          aria-label="Save to Wishlist"
                        >
                          <IconHeart className="h-4 w-4" />
                          <span className="hidden sm:inline">Wishlist</span>
                        </button>
                        <button
                          onClick={() => removeFromCart(line.productId)}
                          className="flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/10 active:scale-95"
                          aria-label="Remove from cart"
                        >
                          <IconTrash className="h-4 w-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Link to="/shop" className="inline-block">
                  <Button variant="outline" size="sm">
                    ← Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="h-fit rounded-sm border border-accent/40 bg-card p-5 sm:p-6 lg:sticky lg:top-40">
              <h2 className="text-xl sm:text-2xl text-primary">Order Summary</h2>
              <div className="gold-rule my-4" />
              <dl className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-medium">{formatINR(cartSubtotal)}</dd>
                </div>
                {cartSavings > 0 ? (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Discount saved</dt>
                    <dd className="text-peacock font-medium">− {formatINR(cartSavings)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Insured Shipping</dt>
                  <dd className="text-peacock font-medium">FREE</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base sm:text-lg font-bold">
                  <dt>Total Amount</dt>
                  <dd className="text-primary">{formatINR(cartSubtotal)}</dd>
                </div>
              </dl>
              <Link to="/checkout" className="mt-6 block">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
              <p className="mt-4 text-center text-[11px] text-muted-foreground">
                Questions about your order? Call{" "}
                <a href="tel:8806091907" className="underline text-primary">
                  8806091907
                </a>
              </p>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
