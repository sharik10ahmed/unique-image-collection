import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionTitle, Button } from "@/components/ui/Primitives";
import { ProductCard } from "@/components/site/ProductCard";
import { CategoryCard, FAQAccordion, TestimonialCard } from "@/components/site/Pieces";
import { useStore } from "@/store/StoreContext";
import { images } from "@/data/mockData";
import { IconLoom, IconStar } from "@/components/Icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rituraj Paithani | Authentic Handloom Paithani Sarees, Pune" },
      {
        name: "description",
        content:
          "Handcrafted Paithani sarees woven with pure zari, peacock motifs and Maharashtrian heritage. Wedding and festive Paithani from our Pune boutique.",
      },
      { property: "og:title", content: "Rituraj Paithani | The Art of Authentic Paithani" },
      {
        property: "og:description",
        content: "Handwoven Paithani sarees with pure zari and traditional Maharashtrian motifs.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { products, categories, testimonials, faqs, content } = useStore();
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={content.hero.image}
          alt="Draped royal purple Paithani saree with gold zari peacock pallu"
          width={1920}
          height={1200}
          className="slow-zoom h-[78vh] min-h-[520px] w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/45 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
            <div className="fade-up max-w-xl text-background">
              <p className="text-[11px] uppercase tracking-[0.34em] text-accent">{content.hero.eyebrow}</p>
              <h1 className="mt-5 text-4xl leading-[1.1] sm:text-6xl">{content.hero.heading}</h1>
              <div className="gold-rule my-6 w-32" />
              <p className="max-w-md text-sm leading-relaxed text-background/85 sm:text-base">
                {content.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shop">
                  <Button size="lg" variant="gold">{content.hero.primaryCta}</Button>
                </Link>
                <Link to="/craftsmanship">
                  <Button size="lg" variant="heroOutline">
                    {content.hero.secondaryCta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-accent/25 bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground lg:grid-cols-4 lg:px-8">
          <span>Pure Silk Handloom</span>
          <span>Traditional Zari Work</span>
          <span>Handmade Motifs</span>
          <span>Woven in Maharashtra</span>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionTitle
          eyebrow="Shop by Collection"
          title="Curated Paithani Collections"
          subtitle="From bridal weaves with dense zari to festive silks for Gudi Padwa and Diwali — every collection is grounded in traditional Paithani craft."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {categories.filter((c) => c.enabled).map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionTitle
            eyebrow="Handpicked Weaves"
            title="Our Signature Paithani Collection"
            subtitle="Each saree below is handwoven on a traditional loom, with zari borders and motifs placed thread by thread."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/shop">
              <Button size="lg" variant="primary">View All Paithani Sarees</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <img src={images.loom} alt="Artisan weaving a Paithani saree on a handloom" loading="lazy" className="col-span-2 h-64 w-full rounded-sm object-cover" />
            <img src={images.zari} alt="Close-up of gold zari peacock motif" loading="lazy" className="h-48 w-full rounded-sm object-cover" />
            <img src={images.dyeing} alt="Silk yarn dyed in traditional Paithani shades" loading="lazy" className="h-48 w-full rounded-sm object-cover" />
          </div>
          <div>
            <SectionTitle
              align="left"
              eyebrow="Paithani Craftsmanship"
              title="Woven by Hand. Preserved by Tradition."
              subtitle="A single Paithani can take weeks to many months on the loom. There is no shortcut, no print and no machine that can replace the weaver's hand."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                ["Handcrafted Weaving", "Every saree represents skilled traditional weaving and patient, careful craftsmanship."],
                ["Pure Zari Work", "Traditional zari is interlocked by hand, giving the border its depth and glow."],
                ["Traditional Motifs", "Peacocks, lotuses, vines and classic Maharashtrian borders, woven not printed."],
                ["Heritage Craft", "Paithani is more than a saree — it is a living piece of Maharashtra's textile heritage."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-sm border border-accent/30 bg-card p-5">
                  <IconLoom className="h-6 w-6 text-accent" />
                  <h3 className="mt-3 text-lg text-primary">{title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
            <Link to="/craftsmanship" className="mt-8 inline-block">
              <Button variant="outline">The Art of Paithani</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promo band */}
      <section className="bg-primary py-16 text-center text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl sm:text-4xl">{content.promo.heading}</h2>
          <div className="gold-rule mx-auto my-5 w-24" />
          <p className="text-sm text-primary-foreground/80">{content.promo.text}</p>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionTitle eyebrow="Why Rituraj Paithani" title="A Boutique Built Around the Weave" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.why.map((w, i) => (
            <div key={w.id} className="rounded-sm border border-border bg-card p-6 transition-colors hover:border-accent/60">
              <span className="font-[family-name:var(--font-display)] text-3xl text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg leading-snug text-primary">{w.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionTitle eyebrow="Kind Words" title="Loved by Families Across Maharashtra" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
          <p className="mt-8 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <IconStar className="h-4 w-4 text-accent" /> Rated 5.0 by our boutique customers
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
        <SectionTitle eyebrow="Good to Know" title="Paithani Questions, Answered" />
        <div className="mt-10">
          <FAQAccordion items={faqs.slice(0, 5)} />
        </div>
        <div className="mt-8 text-center">
          <Link to="/faq">
            <Button variant="outline">Read All FAQs</Button>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
