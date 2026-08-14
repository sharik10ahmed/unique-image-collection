import { Link, useRouterState } from "@tanstack/react-router";
import { useStore } from "@/store/StoreContext";
import { IconBag, IconHeart, IconHome, IconStore, IconWhatsApp } from "@/components/Icons";

export function MobileBottomNav() {
  const { cartCount, wishlist } = useStore();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Don't show bottom nav inside admin panel
  if (currentPath.startsWith("/admin")) {
    return null;
  }

  const items = [
    {
      label: "Home",
      to: "/",
      icon: <IconHome className="h-5 w-5" />,
      active: currentPath === "/",
    },
    {
      label: "Shop",
      to: "/shop",
      icon: <IconStore className="h-5 w-5" />,
      active:
        currentPath === "/shop" ||
        currentPath.startsWith("/category") ||
        currentPath.startsWith("/product"),
    },
    {
      label: "Wishlist",
      to: "/wishlist",
      icon: (
        <IconHeart
          className="h-5 w-5"
          filled={wishlist.length > 0 && currentPath === "/wishlist"}
        />
      ),
      badge: wishlist.length,
      active: currentPath === "/wishlist",
    },
    {
      label: "Cart",
      to: "/cart",
      icon: <IconBag className="h-5 w-5" />,
      badge: cartCount,
      active: currentPath === "/cart" || currentPath === "/checkout",
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed inset-x-0 bottom-0 z-40 block border-t border-accent/30 bg-background/95 pb-safe shadow-[0_-8px_20px_rgba(0,0,0,0.06)] backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`relative flex min-w-[58px] flex-col items-center justify-center py-1 text-center transition-transform active:scale-95 ${
              item.active
                ? "text-secondary font-semibold"
                : "text-foreground/75 hover:text-secondary"
            }`}
          >
            <div className="relative">
              {item.icon}
              {item.badge && item.badge > 0 ? (
                <span className="absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span className="mt-1 text-[10px] uppercase tracking-wider">{item.label}</span>
          </Link>
        ))}

        {/* WhatsApp Direct Chat */}
        <a
          href="https://wa.me/918806091907?text=Hello%20Rituraj%20Paithani%2C%20I%20would%20like%20to%20know%20more%20about%20your%20handloom%20sarees"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative flex min-w-[58px] flex-col items-center justify-center py-1 text-center text-[#25D366] transition-transform active:scale-95 hover:brightness-110"
        >
          <IconWhatsApp className="h-5 w-5" />
          <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-foreground/75">
            Chat
          </span>
        </a>
      </div>
    </nav>
  );
}
