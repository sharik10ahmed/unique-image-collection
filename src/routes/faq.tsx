import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { FAQAccordion } from "@/components/site/Pieces";
import { Button } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Paithani FAQs | Rituraj Paithani" },
      {
        name: "description",
        content:
          "Answers about handloom Paithani sarees — zari types, saree care, wedding suitability, ordering and delivery.",
      },
      { property: "og:title", content: "Paithani Questions, Answered" },
      { property: "og:description", content: "Everything to know before choosing your handloom Paithani saree." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { faqs } = useStore();
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Help Centre"
        title="Frequently Asked Questions"
        subtitle="Everything about our handloom Paithani sarees, zari work, care and delivery."
      />
      <div className="mx-auto max-w-4xl px-4 py-14 lg:px-8">
        <FAQAccordion items={faqs} />

        <div id="shipping" className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-sm border border-accent/30 bg-card p-6">
            <h2 className="text-xl text-primary">Shipping</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Free insured shipping across India. Sarees are dispatched within 2-3 working days and usually
              delivered in 4-7 working days.
            </p>
          </div>
          <div id="returns" className="rounded-sm border border-accent/30 bg-card p-6">
            <h2 className="text-xl text-primary">Returns</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Unused sarees with original packing can be returned within 7 days of delivery. Handloom
              irregularities are a feature of the craft and are not considered defects.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">Still have a question about a weave?</p>
          <Link to="/contact" className="mt-4 inline-block"><Button>Contact Our Boutique</Button></Link>
        </div>
      </div>
    </SiteLayout>
  );
}