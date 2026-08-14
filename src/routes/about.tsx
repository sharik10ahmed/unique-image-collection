import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button, SectionTitle } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { images } from "@/data/mockData";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Rituraj Paithani, Pune" },
      {
        name: "description",
        content:
          "Rituraj Paithani preserves the art of handloom Paithani — pure zari, premium silk and traditional Maharashtrian motifs, curated by Swapnali Patil in Pune.",
      },
      { property: "og:title", content: "Preserving the Art of Paithani" },
      {
        property: "og:description",
        content: "Our story of handloom craftsmanship and Maharashtrian textile heritage.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { content, business } = useStore();
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our Story"
        title={content.about.heading}
        subtitle={content.about.intro}
      />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-16 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <img
            src={images.boutique}
            alt="Rituraj Paithani boutique interior in Pune"
            loading="lazy"
            className="h-64 sm:h-[26rem] w-full rounded-sm object-cover"
          />
          <div>
            <SectionTitle
              align="left"
              eyebrow="Rituraj Paithani"
              title="Tradition Woven Into Every Thread"
            />
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm leading-relaxed text-foreground/85">
              {content.about.body}
            </p>
            <dl className="mt-6 sm:mt-8 grid grid-cols-2 gap-4 sm:gap-5">
              {[
                ["Founded by", business.owner],
                ["Boutique", "Wadgaon Sheri, Pune"],
                ["Speciality", "Handloom Paithani Sarees"],
                ["Craft", "Pure Zari · Handmade Motifs"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-sm border border-border/80 p-3 bg-card sm:border-none sm:p-0 sm:bg-transparent"
                >
                  <dt className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-accent font-medium">
                    {k}
                  </dt>
                  <dd className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionTitle eyebrow="What We Stand For" title="Craft Before Catalogue" />
          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "Handcrafted Work",
                "No prints, no power-loom imitations — only genuine handwoven Paithani.",
              ],
              [
                "Traditional Weaving",
                "Techniques passed down within weaving families for generations.",
              ],
              [
                "Maharashtrian Heritage",
                "Motifs and borders rooted in the textile history of Paithan.",
              ],
              ["Pure Zari", "Zari borders and pallus interlocked by hand, thread by thread."],
              ["Premium Silk", "Lustrous mulberry silk chosen for drape, sheen and longevity."],
              [
                "Saree Craftsmanship",
                "Each piece inspected for weave density, finish and motif symmetry.",
              ],
            ].map(([title, text]) => (
              <div key={title} className="rounded-sm border border-accent/30 bg-card p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl text-primary font-medium">{title}</h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-16 lg:px-8">
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
          <img
            src={images.motifDetail}
            alt="Gold zari lotus and vine motifs close-up"
            loading="lazy"
            className="h-48 sm:h-64 w-full rounded-sm object-cover"
          />
          <img
            src={images.bridalDetail}
            alt="Bridal maroon Paithani pallu with heavy zari"
            loading="lazy"
            className="h-48 sm:h-64 w-full rounded-sm object-cover"
          />
          <img
            src={images.weaver}
            alt="Artisan weaver at her handloom"
            loading="lazy"
            className="h-48 sm:h-64 w-full rounded-sm object-cover"
          />
        </div>
        <div className="mt-8 sm:mt-12 text-center">
          <Link to="/craftsmanship" className="inline-block w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              Discover The Art of Paithani
            </Button>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
