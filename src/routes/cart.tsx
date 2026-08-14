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
      { name: "description", content: "Review the handloom Paithani sarees in your shopping bag before checkout." },
      { property: "og:title", content: "Your Cart | Rituraj Paithani" },
      { property: "og:description", content: "Review your selected Paithani sarees." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, products, updateQty, removeFromCart, cartSubtotal, cartSavings, toggleWishlist } = useStore();
  const lines = cart
    .map((l) => ({ line: l, product: products.find((p) => p.id === l.productId) }))
    .filter((x) => x.product);

  return (
    <SiteLayout>
      <PageHeader eyebrow="Shopping Bag" title="Your Cart" />
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        {lines.length === 0 ? (
          <EmptyState title="Your cart is empty" text="Discover handwoven Paithani sarees with pure zari borders and traditional motifs.">
            <Link to="/shop"><Button>Shop Paithani Sarees</Button></Link>
          </EmptyState>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {lines.map(({ line, product }) => (
                <div key={line.productId} className="flex flex-col gap-4 rounded-sm border border-border bg-card p-4 sm:flex-row">
                  <Link to="/product/$id" params={{ id: product!.id }} className="shrink-0">
                    <img src={product!.images[0]} alt={product!.name} loading="lazy" className="h-40 w-32 rounded-sm object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link to="/product/$id" params={{ id: product!.id }}>
                      <h2 className="text-xl text-primary hover:text-secondary">{product!.name}</h2>
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {product!.fabric} · {product!.weaving} · {product!.zari}
                    </p>
                    <p className="mt-2 text-base">{formatINR(product!.price)}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                      <div className="flex items-center rounded-sm border border-border">
                        <button className="px-3 py-1.5" onClick={() => updateQty(line.productId, line.qty - 1)} aria-label="Decrease">−</button>
                        <span className="w-9 text-center text-sm">{line.qty}</span>
                        <button className="px-3 py-1.5" onClick={() => updateQty(line.productId, line.qty + 1)} aria-label="Increase">+</button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          toggleWishlist(product!.id);
                          removeFromCart(product!.id);
                        }}
                      >
                        <IconHeart className="h-4 w-4" /> Move to Wishlist
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => removeFromCart(line.productId)}>
                        <IconTrash className="h-4 w-4" /> Remove
                      </Button>
                    </div>
                  </div>
                  <div className="text-right text-lg">{formatINR(product!.price * line.qty)}</div>
                </div>
              ))}
              <Link to="/shop" className="inline-block pt-2">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>

            <aside className="h-fit rounded-sm border border-accent/40 bg-card p-6 lg:sticky lg:top-40">
              <h2 className="text-2xl text-primary">Order Summary</h2>
              <div className="gold-rule my-4" />
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatINR(cartSubtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Discount saved</dt><dd className="text-peacock">− {formatINR(cartSavings)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>Free</dd></div>
                <div className="flex justify-between border-t border-border pt-3 text-lg"><dt>Total</dt><dd>{formatINR(cartSubtotal)}</dd></div>
              </dl>
              <Link to="/checkout" className="mt-6 block">
                <Button size="lg" className="w-full">Proceed to Checkout</Button>
              </Link>
              <p className="mt-4 text-center text-[11px] text-muted-foreground">
                Need help? Call 8806091907 for saree guidance.
              </p>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}