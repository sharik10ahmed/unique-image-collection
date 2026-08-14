import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button, Field, Input, Textarea } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { IconMail, IconPhone, IconPin } from "@/components/Icons";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Rituraj Paithani | Wadgaon Sheri, Pune" },
      {
        name: "description",
        content:
          "Visit or call Rituraj Paithani in Wadgaon Sheri, Pune for personal guidance on handloom Paithani sarees. Phone 8806091907.",
      },
      { property: "og:title", content: "Contact Rituraj Paithani" },
      { property: "og:description", content: "Our Pune boutique address, phone and enquiry form." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { business, notify } = useStore();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      notify("Please add your name and phone");
      return;
    }
    setSent(true);
    notify("Thank you — we will call you soon");
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Visit Our Boutique"
        title="Contact Rituraj Paithani"
        subtitle="Come see the weaves in person, or send us a note and we will guide you to the right Paithani."
      />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:py-14 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <div>
          <h2 className="text-2xl sm:text-3xl text-primary">{business.name}</h2>
          <div className="gold-rule my-3 sm:my-5 w-24" />
          <ul className="space-y-4 text-xs sm:text-sm">
            <li className="flex gap-3.5">
              <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span className="leading-relaxed text-muted-foreground">{business.address}</span>
            </li>
            <li className="flex gap-3.5">
              <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <a href={`tel:${business.phone}`} className="hover:text-secondary">
                {business.phone}
              </a>
            </li>
            <li className="flex gap-3.5">
              <IconMail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <a href={`mailto:${business.email}`} className="hover:text-secondary">
                {business.email}
              </a>
            </li>
          </ul>

          <div className="mt-6 sm:mt-8 rounded-sm border border-border bg-card p-4 sm:p-5 text-xs sm:text-sm">
            <h3 className="text-base sm:text-lg font-medium text-primary">
              Boutique Visiting Hours
            </h3>
            <p className="mt-2 text-muted-foreground">Monday – Saturday · 10:30 AM – 8:30 PM</p>
            <p className="text-muted-foreground">Sunday · 11:00 AM – 6:00 PM</p>
          </div>

          <div className="mt-6 sm:mt-8 overflow-hidden rounded-sm border border-accent/40">
            <div className="relative grid h-44 sm:h-56 place-items-center bg-[repeating-linear-gradient(45deg,var(--muted),var(--muted)_12px,var(--card)_12px,var(--card)_24px)]">
              <div className="rounded-sm border border-accent/50 bg-card/95 px-4 py-3 sm:px-5 sm:py-4 text-center">
                <IconPin className="mx-auto h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                <p className="mt-1.5 text-xs sm:text-sm font-medium text-primary">
                  Samruddhi Market, Sangarsh Chowk
                </p>
                <p className="text-[11px] sm:text-xs text-muted-foreground">
                  Kharadi Road, Wadgaon Sheri, Pune 411014
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="h-fit rounded-sm border border-accent/40 bg-card p-5 sm:p-6"
        >
          <h2 className="text-xl sm:text-2xl text-primary">Send an Enquiry</h2>
          <div className="gold-rule my-3 sm:my-4 w-20" />
          <div className="space-y-3.5 sm:space-y-4">
            <Field label="Name *">
              <Input
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </Field>
            <Field label="Phone *">
              <Input
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="98xxxxxxxx"
              />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Message">
              <Textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us the occasion, colour or motif you are looking for…"
              />
            </Field>
            <Button type="submit" size="lg" className="w-full">
              Submit Enquiry
            </Button>
            {sent ? (
              <p className="rounded-sm border border-peacock/40 bg-peacock/10 px-4 py-3 text-center text-xs text-peacock">
                Thank you. Our boutique team will contact you shortly.
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </SiteLayout>
  );
}
