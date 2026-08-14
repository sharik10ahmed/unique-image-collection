import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, AdminTable } from "@/components/admin/AdminLayout";
import { Badge, Input } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { formatINR } from "@/data/mockData";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({
    meta: [
      { title: "Customers | Rituraj Paithani Admin" },
      {
        name: "description",
        content: "Customer records, order counts and spending for the boutique.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Customers | Rituraj Paithani Admin" },
      { property: "og:description", content: "Boutique customer management." },
    ],
  }),
  component: AdminCustomers,
});

function AdminCustomers() {
  const { customers } = useStore();
  const [query, setQuery] = useState("");
  const list = customers.filter((c) =>
    `${c.name} ${c.email} ${c.phone}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <AdminLayout title="Customers" subtitle="Everyone who has shopped with the boutique">
      <div className="mb-6">
        <Input
          className="max-w-xs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customers…"
        />
      </div>
      <AdminTable
        head={["Customer", "Phone", "Email", "Orders", "Total Spend", "Last Order", "Status"]}
      >
        {list.length === 0 ? (
          <tr>
            <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
              No customers match this search.
            </td>
          </tr>
        ) : (
          list.map((c) => (
            <tr key={c.id}>
              <td className="px-4 py-3">{c.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{c.phone}</td>
              <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
              <td className="px-4 py-3">{c.orders}</td>
              <td className="px-4 py-3">{formatINR(c.spent)}</td>
              <td className="px-4 py-3 text-muted-foreground">{c.lastOrder}</td>
              <td className="px-4 py-3">
                <Badge tone={c.status === "Active" ? "green" : "muted"}>{c.status}</Badge>
              </td>
            </tr>
          ))
        )}
      </AdminTable>
    </AdminLayout>
  );
}
