import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  business as initialBusiness,
  categories as initialCategories,
  customers as initialCustomers,
  faqs as initialFaqs,
  orders as initialOrders,
  products as initialProducts,
  siteContent as initialContent,
  testimonials as initialTestimonials,
  adminCredentials,
  type Category,
  type Customer,
  type Faq,
  type Order,
  type Product,
  type Testimonial,
} from "@/data/mockData";

export type CartLine = { productId: string; qty: number };
export type Toast = { id: number; message: string };

type StoreValue = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  faqs: Faq[];
  setFaqs: React.Dispatch<React.SetStateAction<Faq[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  customers: Customer[];
  content: typeof initialContent;
  setContent: React.Dispatch<React.SetStateAction<typeof initialContent>>;
  business: typeof initialBusiness;
  setBusiness: React.Dispatch<React.SetStateAction<typeof initialBusiness>>;
  cart: CartLine[];
  wishlist: string[];
  addToCart: (id: string, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  moveToCart: (id: string) => void;
  cartCount: number;
  cartSubtotal: number;
  cartSavings: number;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  toasts: Toast[];
  notify: (message: string) => void;
  lastOrderNumber: string | null;
  placeOrder: (customer: { name: string; email: string }) => string;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [customers] = useState<Customer[]>(initialCustomers);
  const [content, setContent] = useState(initialContent);
  const [business, setBusiness] = useState(initialBusiness);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [lastOrderNumber, setLastOrderNumber] = useState<string | null>(null);

  const notify = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const addToCart = useCallback(
    (id: string, qty = 1) => {
      setCart((c) => {
        const found = c.find((l) => l.productId === id);
        if (found) return c.map((l) => (l.productId === id ? { ...l, qty: l.qty + qty } : l));
        return [...c, { productId: id, qty }];
      });
      notify("Added to cart");
    },
    [notify],
  );

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((c) =>
      qty <= 0
        ? c.filter((l) => l.productId !== id)
        : c.map((l) => (l.productId === id ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = useCallback(
    (id: string) => {
      setCart((c) => c.filter((l) => l.productId !== id));
      notify("Removed from cart");
    },
    [notify],
  );

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlist((w) => {
        const has = w.includes(id);
        notify(has ? "Removed from wishlist" : "Saved to wishlist");
        return has ? w.filter((x) => x !== id) : [...w, id];
      });
    },
    [notify],
  );

  const removeFromWishlist = useCallback(
    (id: string) => {
      setWishlist((w) => w.filter((x) => x !== id));
      notify("Removed from wishlist");
    },
    [notify],
  );

  const moveToCart = useCallback(
    (id: string) => {
      setWishlist((w) => w.filter((x) => x !== id));
      addToCart(id, 1);
    },
    [addToCart],
  );

  const login = useCallback(
    (email: string, password: string) => {
      const ok = email.trim() === adminCredentials.email && password === adminCredentials.password;
      setIsAdmin(ok);
      notify(ok ? "Welcome back, admin" : "Invalid credentials");
      return ok;
    },
    [notify],
  );

  const logout = useCallback(() => setIsAdmin(false), []);

  const { cartCount, cartSubtotal, cartSavings } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    let savings = 0;
    for (const line of cart) {
      const product = products.find((x) => x.id === line.productId);
      if (!product) continue;
      count += line.qty;
      subtotal += product.price * line.qty;
      if (product.originalPrice) savings += (product.originalPrice - product.price) * line.qty;
    }
    return { cartCount: count, cartSubtotal: subtotal, cartSavings: savings };
  }, [cart, products]);

  const placeOrder = useCallback(
    (customer: { name: string; email: string }) => {
      const number = "RP-" + Math.floor(2000 + Math.random() * 8000);
      const names = cart
        .map((l) => products.find((p) => p.id === l.productId)?.name)
        .filter(Boolean)
        .join(", ");
      setOrders((o) => [
        {
          id: number,
          customer: customer.name || "Guest",
          email: customer.email || "guest@example.com",
          products: names,
          amount: cartSubtotal,
          date: new Date().toISOString().slice(0, 10),
          payment: "Pending",
          status: "Pending",
        },
        ...o,
      ]);
      setLastOrderNumber(number);
      setCart([]);
      return number;
    },
    [cart, products, cartSubtotal],
  );

  const value: StoreValue = {
    products,
    setProducts,
    categories,
    setCategories,
    testimonials,
    setTestimonials,
    faqs,
    setFaqs,
    orders,
    setOrders,
    customers,
    content,
    setContent,
    business,
    setBusiness,
    cart,
    wishlist,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart: () => setCart([]),
    toggleWishlist,
    removeFromWishlist,
    moveToCart,
    cartCount,
    cartSubtotal,
    cartSavings,
    isAdmin,
    login,
    logout,
    toasts,
    notify,
    lastOrderNumber,
    placeOrder,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}