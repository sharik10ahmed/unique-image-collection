import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, AdminTable } from "@/components/admin/AdminLayout";
import { Badge, Select } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { formatINR, type Order } from "@/data/mockData";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Manage Orders | Rituraj Paithani Admin" },
      {
        name: "description",
        content: "Track and update Paithani saree orders from placement to delivery.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Manage Orders | Rituraj Paithani Admin" },
      { property: "og:description", content: "Order tracking and fulfilment for the boutique." },
    ],
  }),
  component: AdminOrders,
});

const statuses: Order["status"][] = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function AdminOrders() {
  const { orders, setOrders, notify } = useStore();
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <AdminLayout title="Orders" subtitle="Every order placed through the storefront">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Select className="max-w-56" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {list.length} orders
        </p>
      </div>

      <AdminTable
        head={["Order ID", "Customer", "Products", "Amount", "Date", "Payment", "Status"]}
      >
        {list.length === 0 ? (
          <tr>
            <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
              No orders with this status.
            </td>
          </tr>
        ) : (
          list.map((o) => (
            <tr key={o.id}>
              <td className="px-4 py-3">{o.id}</td>
              <td className="px-4 py-3">
                <p>{o.customer}</p>
                <p className="text-xs text-muted-foreground">{o.email}</p>
              </td>
              <td className="max-w-56 truncate px-4 py-3 text-muted-foreground">{o.products}</td>
              <td className="px-4 py-3">{formatINR(o.amount)}</td>
              <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
              <td className="px-4 py-3">
                <Badge
                  tone={
                    o.payment === "Paid" ? "green" : o.payment === "Refunded" ? "maroon" : "muted"
                  }
                >
                  {o.payment}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Select
                  className="w-40"
                  value={o.status}
                  onChange={(e) => {
                    const status = e.target.value as Order["status"];
                    setOrders((prev) => prev.map((x) => (x.id === o.id ? { ...x, status } : x)));
                    notify(`${o.id} → ${status}`);
                  }}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </td>
            </tr>
          ))
        )}
      </AdminTable>
    </AdminLayout>
  );
}
