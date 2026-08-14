import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminActions, AdminLayout, AdminTable } from "@/components/admin/AdminLayout";
import { Badge, Button, Field, Input, Modal, Select, Textarea } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { images, type Category } from "@/data/mockData";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [
      { title: "Manage Categories | Rituraj Paithani Admin" },
      { name: "description", content: "Create, edit, enable or disable Paithani storefront collections." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Manage Categories | Rituraj Paithani Admin" },
      { property: "og:description", content: "Collection management for the boutique storefront." },
    ],
  }),
  component: AdminCategories,
});

const blank: Category = { id: "", name: "", slug: "", description: "", image: images.catalog.c1, enabled: true };

function AdminCategories() {
  const { categories, setCategories, products, notify } = useStore();
  const [editing, setEditing] = useState<Category | null>(null);

  const save = () => {
    if (!editing || !editing.name.trim()) {
      notify("Category name is required");
      return;
    }
    const slug = editing.slug || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setCategories((prev) =>
      editing.id
        ? prev.map((c) => (c.id === editing.id ? { ...editing, slug } : c))
        : [...prev, { ...editing, slug, id: "c" + (Date.now() % 100000) }],
    );
    notify(editing.id ? "Category updated" : "Category added");
    setEditing(null);
  };

  return (
    <AdminLayout title="Categories" subtitle="Storefront collections">
      <div className="mb-6 flex justify-end">
        <Button onClick={() => setEditing({ ...blank })}>Add Category</Button>
      </div>

      <AdminTable head={["Collection", "Slug", "Products", "Status", "Actions"]}>
        {categories.map((c) => (
          <tr key={c.id}>
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <img src={c.image} alt={c.name} loading="lazy" className="h-12 w-10 rounded-sm object-cover" />
                <div>
                  <p>{c.name}</p>
                  <p className="max-w-64 truncate text-xs text-muted-foreground">{c.description}</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-muted-foreground">{c.slug}</td>
            <td className="px-4 py-3">{products.filter((p) => p.category === c.slug).length}</td>
            <td className="px-4 py-3">
              <button
                onClick={() => {
                  setCategories((prev) => prev.map((x) => (x.id === c.id ? { ...x, enabled: !x.enabled } : x)));
                  notify(c.enabled ? "Category disabled" : "Category enabled");
                }}
              >
                <Badge tone={c.enabled ? "green" : "muted"}>{c.enabled ? "Enabled" : "Disabled"}</Badge>
              </button>
            </td>
            <td className="px-4 py-3">
              <AdminActions
                onEdit={() => setEditing(c)}
                onDelete={() => {
                  setCategories((prev) => prev.filter((x) => x.id !== c.id));
                  notify("Category deleted");
                }}
              />
            </td>
          </tr>
        ))}
      </AdminTable>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? "Edit Category" : "Add Category"}>
        {editing ? (
          <div className="space-y-4">
            <Field label="Name"><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="Slug"><Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="wedding-paithani" /></Field>
            <Field label="Description"><Textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></Field>
            <Field label="Banner image">
              <Select value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })}>
                <option value={images.catalog.c1}>Traditional Paithani stack</option>
                <option value={images.catalog.c2}>Bridal Paithani styling</option>
                <option value={images.catalog.c3}>Festive Diwali silks</option>
                <option value={images.catalog.c4}>Pure zari border close-up</option>
                <option value={images.catalog.c5}>Peacock motif close-up</option>
                <option value={images.catalog.c6}>Handloom at work</option>
                <option value={images.catalog.c7}>New arrivals display</option>
                <option value={images.catalog.c8}>Premium silk fabric</option>
              </Select>
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.enabled} onChange={(e) => setEditing({ ...editing, enabled: e.target.checked })} className="accent-[var(--primary)]" />
              Show on storefront
            </label>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={save}>Save Category</Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </AdminLayout>
  );
}