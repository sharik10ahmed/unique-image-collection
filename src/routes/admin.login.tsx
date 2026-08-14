import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Field, Input } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import { images } from "@/data/mockData";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Rituraj Paithani" },
      {
        name: "description",
        content: "Secure admin access for managing the Rituraj Paithani storefront.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Login | Rituraj Paithani" },
      { property: "og:description", content: "Store management access for Rituraj Paithani." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate({ to: "/admin/dashboard" });
    } else {
      setError("Those credentials did not match our records.");
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src={images.hero} alt="Paithani saree" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute bottom-12 left-12 max-w-sm text-primary-foreground">
          <h2 className="text-4xl">Rituraj Paithani</h2>
          <div className="gold-rule my-4 w-24" />
          <p className="text-sm text-primary-foreground/80">
            Manage products, collections, orders and storefront content from one place.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background p-6">
        <form onSubmit={submit} className="w-full max-w-sm">
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent">Admin Panel</p>
          <h1 className="mt-3 text-4xl text-primary">Welcome back</h1>
          <div className="gold-rule my-6 w-20" />
          <div className="space-y-4">
            <Field label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@riturajpaithani.com"
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field>
            {error ? <p className="text-xs text-destructive">{error}</p> : null}
            <Button type="submit" size="lg" className="w-full">
              Log In
            </Button>
          </div>
          <div className="mt-6 rounded-sm border border-accent/40 bg-card p-4 text-xs text-muted-foreground">
            <p className="text-accent">Demo credentials</p>
            <p className="mt-1">admin@riturajpaithani.com</p>
            <p>admin123</p>
          </div>
          <Link
            to="/"
            className="mt-6 block text-center text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-secondary"
          >
            ← Back to store
          </Link>
        </form>
      </div>
    </div>
  );
}
