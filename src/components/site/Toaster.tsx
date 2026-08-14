import { useStore } from "@/store/StoreContext";

export function Toaster() {
  const { toasts } = useStore();
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-200 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="fade-up rounded-sm border border-accent/50 bg-primary px-4 py-3 text-sm text-primary-foreground shadow-lg"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}