import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, AdminTable, DashboardCard } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { formatINR } from "@/data/mockData";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Rituraj Paithani" },
      { name: "description", content: "Store performance overview for Rituraj Paithani." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard | Rituraj Paithani" },
      { property: "og:description", content: "Products, orders, customers and revenue at a glance." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { products, orders, customers } = useStore();
  const revenue = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.amount, 0);
  const pending = orders.filter((o) => ["Pending", "Confirmed", "Processing"].includes(o.status)).length;
  const completed = orders.filter((o) => o.status === "Delivered").length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 3);

  return (
    <AdminLayout title="Dashboard" subtitle="Boutique performance at a glance">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard label="Total Products" value={String(products.length)} hint={`${products.filter((p) => p.status === "Active").length} active`} />
        <DashboardCard label="Total Orders" value={String(orders.length)} hint={`${pending} pending`} />
        <DashboardCard label="Total Customers" value={String(customers.length)} hint="Boutique + online" />
        <DashboardCard label="Total Revenue" value={formatINR(revenue)} hint="Excluding cancelled" />
        <DashboardCard label="Pending Orders" value={String(pending)} />
        <DashboardCard label="Completed Orders" value={String(completed)} />
        <DashboardCard label="Low Stock Products" value={String(lowStock.length)} hint="3 pieces or fewer" />
        <DashboardCard label="Out of Stock" value={String(products.filter((p) => p.stock === 0).length)} />
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-xl text-primary">Recent Orders</h2>
        <AdminTable head={["Order", "Customer", "Products", "Amount", "Date", "Payment", "Status"]}>
          {orders.slice(0, 6).map((o) => (
            <tr key={o.id}>
              <td className="px-4 py-3">{o.id}</td>
              <td className="px-4 py-3">{o.customer}</td>
              <td className="max-w-56 truncate px-4 py-3 text-muted-foreground">{o.products}</td>
              <td className="px-4 py-3">{formatINR(o.amount)}</td>
              <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
              <td className="px-4 py-3"><Badge tone={o.payment === "Paid" ? "green" : "muted"}>{o.payment}</Badge></td>
              <td className="px-4 py-3"><Badge tone={o.status === "Delivered" ? "green" : o.status === "Cancelled" ? "maroon" : "gold"}>{o.status}</Badge></td>
            </tr>
          ))}
        </AdminTable>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl text-primary">Low Stock Alerts</h2>
        <AdminTable head={["Saree", "Category", "Stock", "Price"]}>
          {lowStock.length === 0 ? (
            <tr><td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">All weaves are comfortably stocked.</td></tr>
          ) : (
            lowStock.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{p.category.replace(/-/g, " ")}</td>
                <td className="px-4 py-3"><Badge tone="maroon">{p.stock} left</Badge></td>
                <td className="px-4 py-3">{formatINR(p.price)}</td>
              </tr>
            ))
          )}
        </AdminTable>
      </section>
    </AdminLayout>
  );
}