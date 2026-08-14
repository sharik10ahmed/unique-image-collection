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
      {
        property: "og:description",
        content: "Everything to know before choosing your handloom Paithani saree.",
      },
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
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-14 lg:px-8">
        <FAQAccordion items={faqs} />

        <div id="shipping" className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2">
          <div className="rounded-sm border border-accent/30 bg-card p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-medium text-primary">Shipping & Delivery</h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Free insured shipping across all Indian pin codes. Sarees are dispatched within 2-3
              working days in moisture-proof packaging and delivered in 4-7 working days.
            </p>
          </div>
          <div id="returns" className="rounded-sm border border-accent/30 bg-card p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-medium text-primary">Returns & Exchanges</h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Unused sarees with original tags and fold intact can be returned within 7 days of
              delivery. Authentic handloom textures are natural proof of artisanal weaving.
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Still have a question about a weave?
          </p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">Contact Our Boutique</Button>
            </Link>
            <a
              href="https://wa.me/918806091907?text=Hello%20Rituraj%20Paithani%2C%20I%20have%20a%20question%20about%20your%20sarees"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#25D366] bg-[#25D366]/10 px-5 py-2.5 text-xs font-medium text-[#128C7E] active:scale-98"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
