import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminActions, AdminLayout, AdminTable } from "@/components/admin/AdminLayout";
import { Badge, Button, Field, Input, Modal, Select, Textarea } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { formatINR, images, type Product } from "@/data/mockData";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [
      { title: "Manage Products | Rituraj Paithani Admin" },
      { name: "description", content: "Add, edit and remove Paithani sarees from the storefront catalogue." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Manage Products | Rituraj Paithani Admin" },
      { property: "og:description", content: "Product catalogue management for the boutique." },
    ],
  }),
  component: AdminProducts,
});

const blank: Product = {
  id: "",
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  price: 0,
  originalPrice: undefined,
  images: [images.catalog.p1],
  category: "traditional-paithani",
  collections: ["traditional"],
  tags: [],
  fabric: "Premium Silk",
  weaving: "Handloom",
  work: "Handmade",
  zari: "Traditional Zari",
  motif: "Peacock / Traditional Maharashtrian Motifs",
  occasion: "Wedding / Festive / Traditional",
  color: "",
  stock: 1,
  status: "Active",
  featured: false,
  bestSeller: false,
  newArrival: true,
  rating: 5,
};

function AdminProducts() {
  const { products, setProducts, categories, notify } = useStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState<Product | null>(null);

  const list = useMemo(
    () =>
      products.filter((p) => {
        if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
        if (filter !== "all" && p.category !== filter) return false;
        return true;
      }),
    [products, query, filter],
  );

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) {
      notify("Product name is required");
      return;
    }
    setProducts((prev) =>
      editing.id
        ? prev.map((p) => (p.id === editing.id ? editing : p))
        : [{ ...editing, id: "p" + (Date.now() % 100000), slug: editing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") }, ...prev],
    );
    notify(editing.id ? "Product updated" : "Product added");
    setEditing(null);
  };

  const set = <K extends keyof Product>(key: K, value: Product[K]) =>
    setEditing((e) => (e ? { ...e, [key]: value } : e));

  return (
    <AdminLayout title="Products" subtitle="Manage the Paithani catalogue">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Input className="max-w-xs" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search sarees…" />
        <Select className="max-w-56" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </Select>
        <Button className="ml-auto" onClick={() => setEditing({ ...blank })}>Add Product</Button>
      </div>

      <AdminTable head={["Saree", "Category", "Price", "Sale", "Stock", "Status", "Actions"]}>
        {list.length === 0 ? (
          <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No products match this search.</td></tr>
        ) : (
          list.map((p) => (
            <tr key={p.id}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={p.images[0]} alt={p.name} loading="lazy" className="h-12 w-10 rounded-sm object-cover" />
                  <span>{p.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 capitalize text-muted-foreground">{p.category.replace(/-/g, " ")}</td>
              <td className="px-4 py-3">{formatINR(p.originalPrice ?? p.price)}</td>
              <td className="px-4 py-3">{p.originalPrice ? formatINR(p.price) : "—"}</td>
              <td className="px-4 py-3">{p.stock}</td>
              <td className="px-4 py-3">
                <Badge tone={p.status === "Active" ? "green" : "muted"}>{p.status}</Badge>
              </td>
              <td className="px-4 py-3">
                <AdminActions
                  onEdit={() => setEditing(p)}
                  onDelete={() => {
                    setProducts((prev) => prev.filter((x) => x.id !== p.id));
                    notify("Product deleted");
                  }}
                />
              </td>
            </tr>
          ))
        )}
      </AdminTable>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? "Edit Product" : "Add Product"} wide>
        {editing ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name"><Input value={editing.name} onChange={(e) => set("name", e.target.value)} /></Field>
            <Field label="Colour"><Input value={editing.color} onChange={(e) => set("color", e.target.value)} /></Field>
            <Field label="Price (₹)"><Input type="number" value={editing.price} onChange={(e) => set("price", Number(e.target.value))} /></Field>
            <Field label="Original price (₹)">
              <Input type="number" value={editing.originalPrice ?? ""} onChange={(e) => set("originalPrice", e.target.value ? Number(e.target.value) : undefined)} />
            </Field>
            <Field label="Category">
              <Select value={editing.category} onChange={(e) => set("category", e.target.value)}>
                {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </Select>
            </Field>
            <Field label="Stock quantity"><Input type="number" value={editing.stock} onChange={(e) => set("stock", Number(e.target.value))} /></Field>
            <Field label="Status">
              <Select value={editing.status} onChange={(e) => set("status", e.target.value as Product["status"])}>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </Select>
            </Field>
            <Field label="Product image">
              <Select value={editing.images[0]} onChange={(e) => set("images", [e.target.value])}>
                <option value={images.catalog.p1}>Royal purple peacock weave</option>
                <option value={images.catalog.p3}>Peacock green weave</option>
                <option value={images.catalog.p4}>Kadiyal maroon weave</option>
                <option value={images.catalog.p5}>Pure zari gold weave</option>
                <option value={images.catalog.p7}>Rani pink weave</option>
                <option value={images.catalog.p9}>Marigold festive weave</option>
                <option value={images.catalog.p10}>Blush muniya border weave</option>
                <option value={images.catalog.p12}>Violet brocade weave</option>
              </Select>
            </Field>
            <Field label="Fabric"><Input value={editing.fabric} onChange={(e) => set("fabric", e.target.value)} /></Field>
            <Field label="Weaving"><Input value={editing.weaving} onChange={(e) => set("weaving", e.target.value)} /></Field>
            <Field label="Zari"><Input value={editing.zari} onChange={(e) => set("zari", e.target.value)} /></Field>
            <Field label="Motif"><Input value={editing.motif} onChange={(e) => set("motif", e.target.value)} /></Field>
            <Field label="Occasion"><Input value={editing.occasion} onChange={(e) => set("occasion", e.target.value)} /></Field>
            <Field label="Work"><Input value={editing.work} onChange={(e) => set("work", e.target.value)} /></Field>
            <div className="sm:col-span-2">
              <Field label="Short description"><Input value={editing.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} /></Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Description"><Textarea rows={4} value={editing.description} onChange={(e) => set("description", e.target.value)} /></Field>
            </div>
            <div className="flex flex-wrap gap-4 sm:col-span-2">
              {([
                ["featured", "Featured"],
                ["bestSeller", "Best seller"],
                ["newArrival", "New arrival"],
              ] as const).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={editing[key]} onChange={(e) => set(key, e.target.checked)} className="accent-[var(--primary)]" />
                  {label}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2 sm:col-span-2">
              <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={save}>Save Product</Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </AdminLayout>
  );
}