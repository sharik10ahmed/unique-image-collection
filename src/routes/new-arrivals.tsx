import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ProductGrid } from "@/components/site/ProductCard";
import { Button, EmptyState } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrival Paithani Sarees | Rituraj Paithani" },
      {
        name: "description",
        content: "The newest handloom Paithani weaves to reach our Pune boutique — fresh off the artisan's loom.",
      },
      { property: "og:title", content: "New Arrivals | Rituraj Paithani" },
      { property: "og:description", content: "Freshly woven Paithani sarees, newly arrived in our boutique." },
    ],
  }),
  component: NewArrivals,
});

function NewArrivals() {
  const { products } = useStore();
  const list = products.filter((p) => p.newArrival);
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Just Off the Loom"
        title="New Arrivals"
        subtitle="Newly finished weaves from our artisan families, photographed the week they reached the boutique."
      />
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        {list.length === 0 ? (
          <EmptyState title="Nothing new just yet" text="Our weavers are at the loom. New Paithani sarees arrive every few weeks.">
            <Link to="/shop"><Button>Browse the Collection</Button></Link>
          </EmptyState>
        ) : (
          <ProductGrid products={list} />
        )}
      </div>
    </SiteLayout>
  );
}