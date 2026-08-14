import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ProductGrid } from "@/components/site/ProductCard";
import { Button, EmptyState } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";

export const Route = createFileRoute("/category/$category")({
  head: () => ({
    meta: [
      { title: "Paithani Collection | Rituraj Paithani" },
      {
        name: "description",
        content:
          "Explore handloom Paithani sarees from this collection — pure zari, traditional motifs and premium silk.",
      },
      { property: "og:title", content: "Paithani Collection | Rituraj Paithani" },
      { property: "og:description", content: "Handwoven Paithani sarees curated by collection." },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const { products, categories } = useStore();
  const meta = categories.find((c) => c.slug === category);
  const list = products.filter((p) => p.category === category);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Collection"
        title={meta?.name ?? "Paithani Sarees"}
        subtitle={meta?.description ?? "Handwoven Paithani sarees from our Pune boutique."}
      />
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        {list.length === 0 ? (
          <EmptyState
            title="This collection is being woven"
            text="New pieces for this collection arrive shortly. Explore the rest of our Paithani sarees meanwhile."
          >
            <Link to="/shop">
              <Button>Browse All Paithani</Button>
            </Link>
          </EmptyState>
        ) : (
          <ProductGrid products={list} />
        )}
      </div>
    </SiteLayout>
  );
}
