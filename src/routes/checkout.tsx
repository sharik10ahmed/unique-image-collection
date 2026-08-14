import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button, EmptyState, Field, Input } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { formatINR } from "@/data/mockData";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Rituraj Paithani" },
      { name: "description", content: "Complete your Paithani saree order with delivery details and payment preference." },
      { property: "og:title", content: "Checkout | Rituraj Paithani" },
      { property: "og:description", content: "Secure, simple checkout for your handloom Paithani saree." },
    ],
  }),
  component: Checkout,
});

const payments = [
  { id: "upi", label: "UPI / QR", note: "Google Pay, PhonePe, Paytm" },
  { id: "card", label: "Card", note: "Credit or debit card" },
  { id: "netbanking", label: "Net Banking", note: "All major Indian banks" },
  { id: "cod", label: "Cash on Delivery", note: "Available across Maharashtra" },
];

function Checkout() {
  const { cart, products, cartSubtotal, cartSavings, placeOrder, notify } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", state: "Maharashtra", pincode: "" });
  const [payment, setPayment] = useState("upi");
  const [placing, setPlacing] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const lines = cart.map((l) => ({ l, p: products.find((x) => x.id === l.productId) })).filter((x) => x.p);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      notify("Please complete the required fields");
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      placeOrder({ name: form.name, email: form.email });
      setPlacing(false);
      navigate({ to: "/order-success" });
    }, 900);
  };

  if (lines.length === 0) {
    return (
      <SiteLayout>
        <PageHeader eyebrow="Checkout" title="Nothing to check out" />
        <div className="py-16">
          <EmptyState title="Your cart is empty" text="Add a Paithani saree to your bag to continue to checkout.">
            <Link to="/shop"><Button>Shop Paithani Sarees</Button></Link>
          </EmptyState>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow="Almost There" title="Checkout" />
      <form onSubmit={submit} className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="space-y-8">
          <section className="rounded-sm border border-border bg-card p-6">
            <h2 className="text-2xl text-primary">Customer Information</h2>
            <div className="gold-rule my-4 w-20" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name *"><Input value={form.name} onChange={set("name")} placeholder="Swapnali Patil" /></Field>
              <Field label="Phone *"><Input value={form.phone} onChange={set("phone")} placeholder="98xxxxxxxx" /></Field>
              <Field label="Email"><Input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" /></Field>
            </div>
          </section>

          <section className="rounded-sm border border-border bg-card p-6">
            <h2 className="text-2xl text-primary">Delivery Address</h2>
            <div className="gold-rule my-4 w-20" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Address *"><Input value={form.address} onChange={set("address")} placeholder="Flat / building, street, area" /></Field>
              </div>
              <Field label="City"><Input value={form.city} onChange={set("city")} placeholder="Pune" /></Field>
              <Field label="State"><Input value={form.state} onChange={set("state")} /></Field>
              <Field label="Pincode *"><Input value={form.pincode} onChange={set("pincode")} placeholder="411014" /></Field>
            </div>
          </section>

          <section className="rounded-sm border border-border bg-card p-6">
            <h2 className="text-2xl text-primary">Payment Method</h2>
            <div className="gold-rule my-4 w-20" />
            <div className="grid gap-3 sm:grid-cols-2">
              {payments.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPayment(m.id)}
                  className={`rounded-sm border p-4 text-left transition-colors ${
                    payment === m.id ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                  }`}
                >
                  <span className="block text-sm text-primary">{m.label}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{m.note}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground">
              This is a demonstration checkout — no payment is processed.
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-sm border border-accent/40 bg-card p-6 lg:sticky lg:top-40">
          <h2 className="text-2xl text-primary">Order Summary</h2>
          <div className="gold-rule my-4" />
          <ul className="space-y-3">
            {lines.map(({ l, p }) => (
              <li key={l.productId} className="flex gap-3">
                <img src={p!.images[0]} alt={p!.name} loading="lazy" className="h-16 w-14 rounded-sm object-cover" />
                <div className="flex-1 text-sm">
                  <p className="text-primary">{p!.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {l.qty}</p>
                </div>
                <span className="text-sm">{formatINR(p!.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatINR(cartSubtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">You save</dt><dd className="text-peacock">{formatINR(cartSavings)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>Free</dd></div>
            <div className="flex justify-between border-t border-border pt-3 text-lg"><dt>Total</dt><dd>{formatINR(cartSubtotal)}</dd></div>
          </dl>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={placing}>
            {placing ? "Placing Order…" : "Place Order"}
          </Button>
        </aside>
      </form>
    </SiteLayout>
  );
}