import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button, EmptyState, Field, Input } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { formatINR } from "@/data/mockData";
import { IconChevron } from "@/components/Icons";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Rituraj Paithani" },
      {
        name: "description",
        content: "Complete your Paithani saree order with delivery details and payment preference.",
      },
      { property: "og:title", content: "Checkout | Rituraj Paithani" },
      {
        property: "og:description",
        content: "Secure, simple checkout for your handloom Paithani saree.",
      },
    ],
  }),
  component: Checkout,
});

const payments = [
  { id: "upi", label: "UPI / QR Code", note: "Google Pay, PhonePe, Paytm" },
  { id: "card", label: "Credit / Debit Card", note: "Visa, MasterCard, RuPay" },
  { id: "netbanking", label: "Net Banking", note: "All major Indian banks" },
  { id: "cod", label: "Cash on Delivery", note: "Available across Maharashtra" },
];

function Checkout() {
  const { cart, products, cartSubtotal, cartSavings, placeOrder, notify } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
  });
  const [payment, setPayment] = useState("upi");
  const [placing, setPlacing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const lines = cart
    .map((l) => ({ l, p: products.find((x) => x.id === l.productId) }))
    .filter((x) => x.p);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      notify("Please complete all required fields (*)");
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      placeOrder({ name: form.name, email: form.email });
      setPlacing(false);
      navigate({ to: "/order-success" });
    }, 800);
  };

  if (lines.length === 0) {
    return (
      <SiteLayout>
        <PageHeader eyebrow="Checkout" title="Nothing to check out" />
        <div className="py-16">
          <EmptyState
            title="Your cart is empty"
            text="Add a Paithani saree to your bag to continue to checkout."
          >
            <Link to="/shop">
              <Button>Shop Paithani Sarees</Button>
            </Link>
          </EmptyState>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow="Almost There" title="Checkout" />

      {/* Mobile Collapsible Order Summary Bar */}
      <div className="border-b border-border bg-card lg:hidden">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <button
            type="button"
            onClick={() => setShowSummary(!showSummary)}
            className="flex w-full items-center justify-between text-xs font-medium uppercase tracking-wider text-primary"
          >
            <div className="flex items-center gap-2">
              <span>
                {showSummary ? "Hide" : "View"} Order Summary ({lines.length} items)
              </span>
              <IconChevron
                className={`h-3.5 w-3.5 transition-transform duration-200 ${showSummary ? "rotate-180" : ""}`}
              />
            </div>
            <span className="text-sm font-bold text-foreground">{formatINR(cartSubtotal)}</span>
          </button>

          {showSummary ? (
            <div className="mt-3 border-t border-border/70 pt-3">
              <ul className="space-y-2.5">
                {lines.map(({ l, p }) => (
                  <li key={l.productId} className="flex gap-3 text-xs">
                    <img
                      src={p!.images[0]}
                      alt={p!.name}
                      className="h-14 w-12 rounded-sm object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-primary truncate">{p!.name}</p>
                      <p className="text-muted-foreground">Qty {l.qty}</p>
                    </div>
                    <span className="font-medium">{formatINR(p!.price * l.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 border-t border-border pt-2 text-xs flex justify-between text-muted-foreground">
                <span>
                  Insured Shipping: <strong className="text-peacock">FREE</strong>
                </span>
                <span>
                  Total:{" "}
                  <strong className="text-primary font-bold">{formatINR(cartSubtotal)}</strong>
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <form
        onSubmit={submit}
        className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:py-14 lg:grid-cols-[1fr_380px] lg:gap-10 lg:px-8"
      >
        <div className="space-y-6 sm:space-y-8">
          <section className="rounded-sm border border-border bg-card p-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl text-primary">Customer Information</h2>
            <div className="gold-rule my-3 sm:my-4 w-20" />
            <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
              <Field label="Full name *">
                <Input
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Swapnali Patil"
                />
              </Field>
              <Field label="Phone number *">
                <Input
                  required
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="98xxxxxxxx"
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Email Address">
                  <Input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                  />
                </Field>
              </div>
            </div>
          </section>

          <section className="rounded-sm border border-border bg-card p-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl text-primary">Delivery Address</h2>
            <div className="gold-rule my-3 sm:my-4 w-20" />
            <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Street / Flat / Area *">
                  <Input
                    required
                    autoComplete="street-address"
                    value={form.address}
                    onChange={set("address")}
                    placeholder="Flat 402, Samruddhi Apts, Kharadi Rd"
                  />
                </Field>
              </div>
              <Field label="City *">
                <Input
                  required
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={set("city")}
                  placeholder="Pune"
                />
              </Field>
              <Field label="State">
                <Input autoComplete="address-level1" value={form.state} onChange={set("state")} />
              </Field>
              <Field label="Pincode *">
                <Input
                  required
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="postal-code"
                  value={form.pincode}
                  onChange={set("pincode")}
                  placeholder="411014"
                />
              </Field>
            </div>
          </section>

          <section className="rounded-sm border border-border bg-card p-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl text-primary">Payment Preference</h2>
            <div className="gold-rule my-3 sm:my-4 w-20" />
            <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
              {payments.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPayment(m.id)}
                  className={`rounded-sm border p-3.5 sm:p-4 text-left transition-all active:scale-98 ${
                    payment === m.id
                      ? "border-accent bg-accent/15 ring-1 ring-accent/50"
                      : "border-border hover:border-accent/50 bg-background"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="block text-sm font-medium text-primary">{m.label}</span>
                    <span
                      className={`h-4 w-4 rounded-full border flex items-center justify-center ${payment === m.id ? "border-primary bg-primary" : "border-muted-foreground"}`}
                    >
                      {payment === m.id ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-background" />
                      ) : null}
                    </span>
                  </div>
                  <span className="mt-1 block text-xs text-muted-foreground">{m.note}</span>
                </button>
              ))}
            </div>
            <p className="mt-3.5 text-[11px] text-muted-foreground">
              Demo Checkout — Your test order will be recorded in the boutique admin panel without
              real billing.
            </p>
          </section>
        </div>

        {/* Desktop Sidebar & Mobile Submit */}
        <aside className="h-fit rounded-sm border border-accent/40 bg-card p-5 sm:p-6 lg:sticky lg:top-40">
          <h2 className="text-xl sm:text-2xl text-primary">Order Summary</h2>
          <div className="gold-rule my-4" />
          <ul className="space-y-3">
            {lines.map(({ l, p }) => (
              <li key={l.productId} className="flex gap-3">
                <img
                  src={p!.images[0]}
                  alt={p!.name}
                  loading="lazy"
                  className="h-16 w-14 rounded-sm object-cover border border-border"
                />
                <div className="flex-1 text-xs sm:text-sm min-w-0">
                  <p className="text-primary font-medium truncate">{p!.name}</p>
                  <p className="text-muted-foreground">Qty {l.qty}</p>
                </div>
                <span className="text-xs sm:text-sm font-semibold shrink-0">
                  {formatINR(p!.price * l.qty)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-xs sm:text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">{formatINR(cartSubtotal)}</dd>
            </div>
            {cartSavings > 0 ? (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">You save</dt>
                <dd className="text-peacock font-medium">− {formatINR(cartSavings)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Insured Shipping</dt>
              <dd className="text-peacock font-medium">FREE</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base sm:text-lg font-bold">
              <dt>Total Amount</dt>
              <dd className="text-primary">{formatINR(cartSubtotal)}</dd>
            </div>
          </dl>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={placing}>
            {placing ? "Placing Order…" : `Place Order · ${formatINR(cartSubtotal)}`}
          </Button>
        </aside>
      </form>
    </SiteLayout>
  );
}
