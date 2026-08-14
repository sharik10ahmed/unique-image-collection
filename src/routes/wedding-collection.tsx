import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { CollectionView } from "@/components/site/CollectionView";
import { useStore } from "@/store/StoreContext";

export const Route = createFileRoute("/wedding-collection")({
  head: () => ({
    meta: [
      { title: "Wedding Paithani Sarees | Rituraj Paithani" },
      {
        name: "description",
        content:
          "Bridal and wedding Paithani sarees with heavy pure zari, peacock motifs and premium handloom silk for your special day.",
      },
      { property: "og:title", content: "Paithani Sarees for Your Special Day" },
      { property: "og:description", content: "Bridal Paithani woven with heavy zari and traditional Maharashtrian motifs." },
    ],
  }),
  component: WeddingCollection,
});

function WeddingCollection() {
  const { products } = useStore();
  const list = products.filter((p) => p.collections.includes("wedding") || p.collections.includes("bridal"));
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Wedding Collection"
        title="Paithani Sarees for Your Special Day"
        subtitle="Heirloom bridal weaves with dense pure zari, grand pallus and motifs that have dressed Maharashtrian brides for generations."
      />
      <CollectionView
        products={list}
        filters={[
          { label: "Bridal", value: "bridal" },
          { label: "Wedding Guest", value: "wedding-guest" },
          { label: "Traditional", value: "traditional" },
          { label: "Heavy Zari", value: "heavy-zari" },
          { label: "Peacock Motif", value: "peacock" },
          { label: "Premium Silk", value: "premium-silk" },
        ]}
      />
    </SiteLayout>
  );
}