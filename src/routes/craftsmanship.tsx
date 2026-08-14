import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button, SectionTitle } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { images } from "@/data/mockData";

export const Route = createFileRoute("/craftsmanship")({
  head: () => ({
    meta: [
      { title: "The Art of Paithani | Handloom Craftsmanship" },
      {
        name: "description",
        content:
          "From selecting premium silk to weaving zari borders and traditional motifs — the seven stages behind an authentic handloom Paithani saree.",
      },
      { property: "og:title", content: "The Art of Paithani" },
      {
        property: "og:description",
        content: "How an authentic handloom Paithani saree is made, stage by stage.",
      },
    ],
  }),
  component: Craftsmanship,
});

function Craftsmanship() {
  const { content } = useStore();
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Heritage Craft"
        title="The Art of Paithani"
        subtitle="A Paithani is not manufactured. It is grown slowly on a wooden loom, stage by patient stage, by hands that learned the craft from the generation before."
      />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-16 lg:px-8">
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          <img
            src={images.shuttle}
            alt="Weaving shuttle with gold zari thread on the loom"
            loading="lazy"
            className="h-52 sm:h-80 w-full rounded-sm object-cover"
          />
          <img
            src={images.inspection}
            alt="Finished Paithani saree being inspected and folded"
            loading="lazy"
            className="h-52 sm:h-80 w-full rounded-sm object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-14 sm:pb-20 lg:px-8">
        <SectionTitle eyebrow="Stage by Stage" title="How a Paithani Comes to Life" />
        <ol className="mt-8 sm:mt-12 space-y-4 sm:space-y-6">
          {content.craftJourney.map((step, i) => (
            <li
              key={step.id}
              className="flex gap-4 sm:gap-6 rounded-sm border border-border bg-card p-4 sm:p-6"
            >
              <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl leading-none text-accent shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-medium text-primary">{step.title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-primary py-12 sm:py-16 text-center text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl">Caring for Your Paithani</h2>
          <div className="gold-rule mx-auto my-4 sm:my-5 w-20 sm:w-24" />
          <p className="text-xs sm:text-sm text-primary-foreground/85 leading-relaxed">
            Dry clean only. Store wrapped in cotton or muslin, refold every few months so the zari
            does not crease along one line, and keep the saree away from direct sunlight, perfume
            and damp. Cared for well, a Paithani outlives the person who bought it.
          </p>
          <div className="mt-6 sm:mt-8">
            <Link to="/shop">
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                Shop Handloom Paithani
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
