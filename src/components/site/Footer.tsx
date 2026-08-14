import { Link } from "@tanstack/react-router";
import { useStore } from "@/store/StoreContext";
import { IconMail, IconPhone, IconPin } from "@/components/Icons";

export function Footer() {
  const { business, content } = useStore();
  return (
    <footer className="mt-24 border-t border-accent/30 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-2xl">{business.name}</h3>
          <div className="gold-rule my-4 w-20" />
          <p className="text-sm leading-relaxed text-primary-foreground/75">{content.footer.description}</p>
          <div className="mt-5 flex gap-3">
            {["FB", "IG", "WA", "YT"].map((s) => (
              <span
                key={s}
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-accent/50 text-[11px] tracking-wider transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[12px] uppercase tracking-[0.24em] text-accent">Shop</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-primary-foreground/75">
            <li><Link to="/category/$category" params={{ category: "traditional-paithani" }} className="hover:text-accent">Paithani Sarees</Link></li>
            <li><Link to="/wedding-collection" className="hover:text-accent">Wedding Collection</Link></li>
            <li><Link to="/festive-collection" className="hover:text-accent">Festive Collection</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-accent">New Arrivals</Link></li>
            <li><Link to="/shop" search={{ sort: "best" }} className="hover:text-accent">Best Sellers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[12px] uppercase tracking-[0.24em] text-accent">Customer Care</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-primary-foreground/75">
            <li><Link to="/contact" className="hover:text-accent">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
            <li><Link to="/faq" hash="shipping" className="hover:text-accent">Shipping</Link></li>
            <li><Link to="/faq" hash="returns" className="hover:text-accent">Returns</Link></li>
            <li><Link to="/craftsmanship" className="hover:text-accent">Saree Care</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[12px] uppercase tracking-[0.24em] text-accent">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex gap-3"><IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><a href={`tel:${business.phone}`} className="hover:text-accent">{business.phone}</a></li>
            <li className="flex gap-3"><IconMail className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><a href={`mailto:${business.email}`} className="hover:text-accent">{business.email}</a></li>
            <li className="flex gap-3"><IconPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{business.address}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/65 sm:flex-row lg:px-8">
          <p>{content.footer.copyright}</p>
          <Link to="/admin/login" className="tracking-[0.18em] uppercase hover:text-accent">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}