import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminActions, AdminLayout, AdminTable } from "@/components/admin/AdminLayout";
import { Button, Field, Input, Modal, Textarea } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import type { Testimonial } from "@/data/mockData";

export const Route = createFileRoute("/admin/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials | Rituraj Paithani Admin" },
      {
        name: "description",
        content: "Add and moderate customer testimonials shown on the storefront.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Testimonials | Rituraj Paithani Admin" },
      { property: "og:description", content: "Customer testimonial management." },
    ],
  }),
  component: AdminTestimonials,
});

const blank: Testimonial = { id: "", name: "", location: "", message: "", rating: 5 };

function AdminTestimonials() {
  const { testimonials, setTestimonials, notify } = useStore();
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const save = () => {
    if (!editing || !editing.name.trim()) {
      notify("Customer name is required");
      return;
    }
    setTestimonials((prev) =>
      editing.id
        ? prev.map((t) => (t.id === editing.id ? editing : t))
        : [...prev, { ...editing, id: "t" + (Date.now() % 100000) }],
    );
    notify(editing.id ? "Testimonial updated" : "Testimonial added");
    setEditing(null);
  };

  return (
    <AdminLayout title="Testimonials" subtitle="Words from our customers">
      <div className="mb-6 flex justify-end">
        <Button onClick={() => setEditing({ ...blank })}>Add Testimonial</Button>
      </div>
      <AdminTable head={["Customer", "Location", "Message", "Rating", "Actions"]}>
        {testimonials.map((t) => (
          <tr key={t.id}>
            <td className="px-4 py-3">{t.name}</td>
            <td className="px-4 py-3 text-muted-foreground">{t.location}</td>
            <td className="max-w-80 truncate px-4 py-3 text-muted-foreground">{t.message}</td>
            <td className="px-4 py-3 text-accent">{"★".repeat(t.rating)}</td>
            <td className="px-4 py-3">
              <AdminActions
                onEdit={() => setEditing(t)}
                onDelete={() => {
                  setTestimonials((prev) => prev.filter((x) => x.id !== t.id));
                  notify("Testimonial deleted");
                }}
              />
            </td>
          </tr>
        ))}
      </AdminTable>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? "Edit Testimonial" : "Add Testimonial"}
      >
        {editing ? (
          <div className="space-y-4">
            <Field label="Customer name">
              <Input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </Field>
            <Field label="Location">
              <Input
                value={editing.location}
                onChange={(e) => setEditing({ ...editing, location: e.target.value })}
              />
            </Field>
            <Field label="Message">
              <Textarea
                rows={4}
                value={editing.message}
                onChange={(e) => setEditing({ ...editing, message: e.target.value })}
              />
            </Field>
            <Field label="Rating (1-5)">
              <Input
                type="number"
                min={1}
                max={5}
                value={editing.rating}
                onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}
              />
            </Field>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button onClick={save}>Save</Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </AdminLayout>
  );
}
