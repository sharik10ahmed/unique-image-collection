import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button, EmptyState } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { formatINR } from "@/data/mockData";
import { IconTrash } from "@/components/Icons";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist | Rituraj Paithani" },
      {
        name: "description",
        content: "Paithani sarees you have saved for a wedding, festival or gifting occasion.",
      },
      { property: "og:title", content: "Your Wishlist | Rituraj Paithani" },
      { property: "og:description", content: "Saved handloom Paithani sarees from our boutique." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, products, removeFromWishlist, moveToCart } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <SiteLayout>
      <PageHeader eyebrow="Saved Weaves" title="Your Wishlist" />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-14 lg:px-8">
        {items.length === 0 ? (
          <EmptyState
            title="Your wishlist is empty"
            text="Tap the heart on any Paithani saree to keep it here while you decide."
          >
            <Link to="/shop">
              <Button>Explore Paithani</Button>
            </Link>
          </EmptyState>
        ) : (
          <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
            {items.map((p) => (
              <div
                key={p.id}
                className="flex gap-3 sm:gap-4 rounded-sm border border-border bg-card p-3 sm:p-4"
              >
                <Link to="/product/$id" params={{ id: p.id }} className="shrink-0">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    loading="lazy"
                    className="h-28 w-22 sm:h-36 sm:w-28 rounded-sm object-cover border border-border"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    <Link to="/product/$id" params={{ id: p.id }}>
                      <h2 className="text-sm sm:text-base font-medium text-primary hover:text-secondary truncate">
                        {p.name}
                      </h2>
                    </Link>
                    <p className="mt-0.5 line-clamp-1 text-[11px] sm:text-xs text-muted-foreground">
                      {p.shortDescription}
                    </p>
                    <p className="mt-1.5 text-sm sm:text-base font-semibold text-foreground">
                      {formatINR(p.price)}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-border/50 sm:border-none sm:pt-0">
                    <Button
                      size="sm"
                      disabled={p.stock <= 0}
                      onClick={() => moveToCart(p.id)}
                      className="text-xs px-2.5 py-1.5 flex-1 sm:flex-none"
                    >
                      {p.stock > 0 ? "Move to Cart" : "Sold Out"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromWishlist(p.id)}
                      className="text-xs px-2 py-1.5 text-destructive hover:bg-destructive/10"
                    >
                      <IconTrash className="h-3.5 w-3.5" /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
