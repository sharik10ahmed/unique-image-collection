import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "Order Placed | Rituraj Paithani" },
      { name: "description", content: "Your Paithani saree order has been placed. Our boutique team will confirm shortly." },
      { property: "og:title", content: "Order Placed Successfully" },
      { property: "og:description", content: "Thank you for choosing an authentic handloom Paithani saree." },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { lastOrderNumber } = useStore();
  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-28 text-center">
        <div className="fade-up mx-auto grid h-20 w-20 place-items-center rounded-full border border-accent text-3xl text-accent">
          ✓
        </div>
        <h1 className="mt-8 text-4xl text-primary sm:text-5xl">Order Placed Successfully</h1>
        <div className="gold-rule mx-auto my-6 w-28" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Thank you for choosing an authentic handloom Paithani. Our boutique team will call you shortly to
          confirm the weave, delivery details and dispatch date.
        </p>
        <p className="mt-8 inline-block rounded-sm border border-accent/50 bg-card px-6 py-4">
          <span className="block text-[11px] uppercase tracking-[0.24em] text-accent">Order Number</span>
          <span className="mt-1 block text-2xl text-primary">{lastOrderNumber ?? "RP-0000"}</span>
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/shop"><Button>Continue Shopping</Button></Link>
          <Link to="/contact"><Button variant="outline">Contact Boutique</Button></Link>
        </div>
      </div>
    </SiteLayout>
  );
}