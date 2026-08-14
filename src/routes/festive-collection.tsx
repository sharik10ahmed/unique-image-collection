import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { CollectionView } from "@/components/site/CollectionView";
import { useStore } from "@/store/StoreContext";

export const Route = createFileRoute("/festive-collection")({
  head: () => ({
    meta: [
      { title: "Festive Paithani Sarees | Rituraj Paithani" },
      {
        name: "description",
        content:
          "Festive Paithani sarees for Diwali, Gudi Padwa, Ganesh Chaturthi and family celebrations — handwoven silk with traditional zari.",
      },
      { property: "og:title", content: "Celebrate Tradition in Paithani" },
      {
        property: "og:description",
        content: "Handloom Paithani silks for Diwali, Gudi Padwa and every celebration.",
      },
    ],
  }),
  component: FestiveCollection,
});

function FestiveCollection() {
  const { products } = useStore();
  const list = products.filter(
    (p) => p.collections.includes("festive") || p.collections.includes("diwali"),
  );
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Festive Collection"
        title="Celebrate Tradition in Paithani"
        subtitle="Luminous handwoven silks for Diwali, Gudi Padwa, Ganesh Chaturthi, weddings and every family celebration."
      />
      <CollectionView
        products={list}
        filters={[
          { label: "Diwali", value: "diwali" },
          { label: "Traditional Ceremonies", value: "traditional" },
          { label: "Wedding Guest", value: "wedding-guest" },
          { label: "Peacock Motif", value: "peacock" },
          { label: "Premium Silk", value: "premium-silk" },
        ]}
      />
    </SiteLayout>
  );
}
