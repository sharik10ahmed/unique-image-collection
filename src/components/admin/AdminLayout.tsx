import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useStore } from "@/store/StoreContext";
import { IconClose, IconMenu } from "@/components/Icons";
import { Button } from "@/components/ui/Primitives";

const links = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Products", to: "/admin/products" },
  { label: "Categories", to: "/admin/categories" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Customers", to: "/admin/customers" },
  { label: "Homepage & Content", to: "/admin/content" },
  { label: "Testimonials", to: "/admin/testimonials" },
  { label: "FAQs", to: "/admin/faqs" },
  { label: "Settings", to: "/admin/settings" },
] as const;

export function AdminLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const { isAdmin, logout, business } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) navigate({ to: "/admin/login" });
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-muted text-sm text-muted-foreground">
        Redirecting to admin login…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/60">
      <aside
        className={`fixed inset-y-0 left-0 z-[60] w-64 overflow-y-auto bg-sidebar p-5 text-sidebar-foreground transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="font-[family-name:var(--font-display)] text-xl">
            {business.name}
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <IconClose className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-sidebar-primary">
          Admin Panel
        </p>
        <nav className="mt-8 space-y-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
              className="block rounded-sm px-3 py-2.5 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/70"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-sidebar-border pt-5">
          <Link
            to="/"
            className="block px-3 py-2 text-xs text-sidebar-foreground/70 hover:text-sidebar-primary"
          >
            ← View storefront
          </Link>
          <button
            onClick={() => {
              logout();
              navigate({ to: "/admin/login" });
            }}
            className="mt-1 block w-full px-3 py-2 text-left text-xs text-sidebar-foreground/70 hover:text-sidebar-primary"
          >
            Log out
          </button>
        </div>
      </aside>

      {open ? (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center gap-4 border-b border-border bg-card px-4 py-4 lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <IconMenu className="h-6 w-6 text-primary" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl text-primary">{title}</h1>
            {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
          </div>
          <span className="hidden rounded-full border border-accent/50 px-3 py-1 text-[11px] text-muted-foreground sm:block">
            admin@riturajpaithani.com
          </span>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function DashboardCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-card p-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-primary">{value}</p>
      {hint ? <p className="mt-1 text-[11px] text-accent">{hint}</p> : null}
    </div>
  );
}

export function AdminTable({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-end lg:hidden">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          ⇄ Scroll horizontally to view all
        </span>
      </div>
      <div className="overflow-x-auto rounded-sm border border-border bg-card shadow-xs">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-border bg-muted/60">
            <tr>
              {head.map((h) => (
                <th
                  key={h}
                  className="whitespace-nowrap px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminActions({ onEdit, onDelete }: { onEdit?: () => void; onDelete?: () => void }) {
  return (
    <div className="flex gap-2">
      {onEdit ? (
        <Button size="sm" variant="outline" onClick={onEdit} className="text-xs py-1.5 px-3">
          Edit
        </Button>
      ) : null}
      {onDelete ? (
        <Button
          size="sm"
          variant="ghost"
          onClick={onDelete}
          className="text-xs py-1.5 px-3 text-destructive hover:bg-destructive/10"
        >
          Delete
        </Button>
      ) : null}
    </div>
  );
}
