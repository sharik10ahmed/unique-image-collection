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
      { name: "description", content: "Paithani sarees you have saved for a wedding, festival or gifting occasion." },
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
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        {items.length === 0 ? (
          <EmptyState title="Your wishlist is empty" text="Tap the heart on any Paithani saree to keep it here while you decide.">
            <Link to="/shop"><Button>Explore Paithani</Button></Link>
          </EmptyState>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((p) => (
              <div key={p.id} className="flex gap-4 rounded-sm border border-border bg-card p-4">
                <Link to="/product/$id" params={{ id: p.id }}>
                  <img src={p.images[0]} alt={p.name} loading="lazy" className="h-40 w-32 rounded-sm object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <Link to="/product/$id" params={{ id: p.id }}>
                    <h2 className="text-xl text-primary hover:text-secondary">{p.name}</h2>
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">{p.shortDescription}</p>
                  <p className="mt-2">{formatINR(p.price)}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    <Button size="sm" disabled={p.stock <= 0} onClick={() => moveToCart(p.id)}>
                      {p.stock > 0 ? "Move to Cart" : "Unavailable"}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => removeFromWishlist(p.id)}>
                      <IconTrash className="h-4 w-4" /> Remove
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