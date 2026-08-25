"use client";

import { useMemo, useState } from "react";
import { Select, TextArea } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface ProductOption {
  id: string;
  name: string;
  price: number;
  currency: string;
  stock: number;
  categoryName: string;
}

interface CartLine {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  maxStock: number;
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function SaleForm({
  action,
  products,
}: {
  action: (formData: FormData) => Promise<void>;
  products: ProductOption[];
}) {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return products.slice(0, 8);
    const q = query.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8);
  }, [query, products]);

  function addToCart(product: ProductOption) {
    if (product.stock <= 0) return;
    setCart((prev) => {
      const existing = prev.find((l) => l.productId === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map((l) =>
          l.productId === product.id ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          unitPrice: product.price,
          quantity: 1,
          maxStock: product.stock,
        },
      ];
    });
  }

  function updateQuantity(productId: string, quantity: number) {
    setCart((prev) =>
      prev.map((l) =>
        l.productId === productId
          ? { ...l, quantity: Math.max(1, Math.min(quantity, l.maxStock)) }
          : l
      )
    );
  }

  function updatePrice(productId: string, unitPrice: number) {
    setCart((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, unitPrice } : l))
    );
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((l) => l.productId !== productId));
  }

  const total = cart.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (cart.length === 0) {
      e.preventDefault();
      setError("Agregá al menos un producto al carrito.");
    }
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar producto por nombre…"
          className="w-full rounded-lg border border-ink-line bg-ink px-3.5 py-2.5 text-sm text-paper outline-none focus:border-brass"
        />

        <div className="mt-4 flex flex-col gap-2">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => addToCart(p)}
              disabled={p.stock <= 0}
              className="flex items-center justify-between rounded-lg border border-ink-line bg-ink-soft px-4 py-3 text-left transition-colors hover:border-brass/50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <div>
                <p className="text-sm text-paper">{p.name}</p>
                <p className="text-xs text-paper-dim">
                  {p.categoryName} · Stock: {p.stock}
                </p>
              </div>
              <p className="text-sm text-brass">{formatPrice(p.price)}</p>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-paper-dim">No se encontraron productos.</p>
          )}
        </div>
      </div>

      <form
        action={action}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-ink-line bg-ink-soft p-6"
      >
        <input type="hidden" name="cart" value={JSON.stringify(
          cart.map((l) => ({
            productId: l.productId,
            quantity: l.quantity,
            unitPrice: l.unitPrice,
          }))
        )} />

        <p className="font-display text-xl text-paper">Carrito</p>

        {cart.length === 0 && (
          <p className="text-sm text-paper-dim">Todavía no agregaste productos.</p>
        )}

        <div className="flex flex-col gap-3">
          {cart.map((line) => (
            <div key={line.productId} className="border-b border-ink-line pb-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-paper">{line.name}</p>
                <button
                  type="button"
                  onClick={() => removeFromCart(line.productId)}
                  className="text-xs text-wine hover:underline"
                >
                  Quitar
                </button>
              </div>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <label className="flex items-center gap-1 text-paper-dim">
                  Cant.
                  <input
                    type="number"
                    min={1}
                    max={line.maxStock}
                    value={line.quantity}
                    onChange={(e) =>
                      updateQuantity(line.productId, Number(e.target.value))
                    }
                    className="w-16 rounded border border-ink-line bg-ink px-2 py-1 text-paper"
                  />
                </label>
                <label className="flex items-center gap-1 text-paper-dim">
                  Precio
                  <input
                    type="number"
                    min={0}
                    value={line.unitPrice}
                    onChange={(e) =>
                      updatePrice(line.productId, Number(e.target.value))
                    }
                    className="w-24 rounded border border-ink-line bg-ink px-2 py-1 text-paper"
                  />
                </label>
                <p className="ml-auto text-paper">
                  {formatPrice(line.unitPrice * line.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-ink-line pt-4">
          <p className="text-paper-dim">Total</p>
          <p className="font-display text-2xl text-brass">{formatPrice(total)}</p>
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-paper-dim">
          Forma de pago
          <Select name="paymentMethod" defaultValue="efectivo">
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
            <option value="otro">Otro</option>
          </Select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-paper-dim">
          Notas (opcional)
          <TextArea name="notes" rows={2} />
        </label>

        {error && <p className="text-sm text-wine">{error}</p>}

        <SubmitButton>Confirmar venta</SubmitButton>
      </form>
    </div>
  );
}
