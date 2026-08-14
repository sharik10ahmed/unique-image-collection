import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button, Field, Input, Textarea } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Store Settings | Rituraj Paithani Admin" },
      {
        name: "description",
        content: "Update boutique contact details, address and store availability.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Store Settings | Rituraj Paithani Admin" },
      { property: "og:description", content: "Business information settings." },
    ],
  }),
  component: AdminSettings,
});

function AdminSettings() {
  const { business, setBusiness, notify } = useStore();

  return (
    <AdminLayout title="Settings" subtitle="Business information used across the site">
      <div className="max-w-2xl rounded-sm border border-border bg-card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Store name">
            <Input
              value={business.name}
              onChange={(e) => setBusiness({ ...business, name: e.target.value })}
            />
          </Field>
          <Field label="Owner">
            <Input
              value={business.owner}
              onChange={(e) => setBusiness({ ...business, owner: e.target.value })}
            />
          </Field>
          <Field label="Tagline">
            <Input
              value={business.tagline}
              onChange={(e) => setBusiness({ ...business, tagline: e.target.value })}
            />
          </Field>
          <Field label="Phone">
            <Input
              value={business.phone}
              onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
            />
          </Field>
          <Field label="Email">
            <Input
              value={business.email}
              onChange={(e) => setBusiness({ ...business, email: e.target.value })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Address">
              <Textarea
                rows={3}
                value={business.address}
                onChange={(e) => setBusiness({ ...business, address: e.target.value })}
              />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input
              type="checkbox"
              checked={business.storeOpen}
              onChange={(e) => setBusiness({ ...business, storeOpen: e.target.checked })}
              className="accent-[var(--primary)]"
            />
            Store is open for orders
          </label>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => notify("Settings saved")}>Save Settings</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
