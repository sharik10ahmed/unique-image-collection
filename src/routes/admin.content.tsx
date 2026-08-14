import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button, Field, Input, Textarea } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";

export const Route = createFileRoute("/admin/content")({
  head: () => ({
    meta: [
      { title: "Homepage Content | Rituraj Paithani Admin" },
      {
        name: "description",
        content: "Edit the hero banner, promo strip and highlight copy shown on the storefront.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Homepage Content | Rituraj Paithani Admin" },
      { property: "og:description", content: "Storefront content editing." },
    ],
  }),
  component: AdminContent,
});

function AdminContent() {
  const { content, setContent, notify } = useStore();

  return (
    <AdminLayout title="Homepage & Content" subtitle="Edit the copy shown across the storefront">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-sm border border-border bg-card p-6">
          <h2 className="text-xl text-primary">Hero Banner</h2>
          <div className="gold-rule my-4 w-16" />
          <div className="space-y-4">
            <Field label="Eyebrow">
              <Input
                value={content.hero.eyebrow}
                onChange={(e) =>
                  setContent({ ...content, hero: { ...content.hero, eyebrow: e.target.value } })
                }
              />
            </Field>
            <Field label="Heading">
              <Input
                value={content.hero.heading}
                onChange={(e) =>
                  setContent({ ...content, hero: { ...content.hero, heading: e.target.value } })
                }
              />
            </Field>
            <Field label="Description">
              <Textarea
                rows={3}
                value={content.hero.description}
                onChange={(e) =>
                  setContent({ ...content, hero: { ...content.hero, description: e.target.value } })
                }
              />
            </Field>
            <Field label="Primary button">
              <Input
                value={content.hero.primaryCta}
                onChange={(e) =>
                  setContent({ ...content, hero: { ...content.hero, primaryCta: e.target.value } })
                }
              />
            </Field>
            <Field label="Secondary button">
              <Input
                value={content.hero.secondaryCta}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, secondaryCta: e.target.value },
                  })
                }
              />
            </Field>
          </div>
        </section>

        <section className="rounded-sm border border-border bg-card p-6">
          <h2 className="text-xl text-primary">Promotional Strip</h2>
          <div className="gold-rule my-4 w-16" />
          <div className="space-y-4">
            <Field label="Heading">
              <Input
                value={content.promo.heading}
                onChange={(e) =>
                  setContent({ ...content, promo: { ...content.promo, heading: e.target.value } })
                }
              />
            </Field>
            <Field label="Message">
              <Textarea
                rows={3}
                value={content.promo.text}
                onChange={(e) =>
                  setContent({ ...content, promo: { ...content.promo, text: e.target.value } })
                }
              />
            </Field>
          </div>

          <h2 className="mt-10 text-xl text-primary">Why Choose Us</h2>
          <div className="gold-rule my-4 w-16" />
          <div className="space-y-4">
            {content.why.map((w) => (
              <div key={w.id} className="space-y-2 border-b border-border pb-4 last:border-0">
                <Input
                  value={w.title}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      why: content.why.map((x) =>
                        x.id === w.id ? { ...x, title: e.target.value } : x,
                      ),
                    })
                  }
                />
                <Textarea
                  rows={2}
                  value={w.text}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      why: content.why.map((x) =>
                        x.id === w.id ? { ...x, text: e.target.value } : x,
                      ),
                    })
                  }
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={() => notify("Storefront content updated")}>Save Changes</Button>
      </div>
    </AdminLayout>
  );
}
