import type { Metadata } from "next";
import { updateStock } from "@/app/admin/actions";
import { getStockState } from "@/lib/catalog";
import { getStockList } from "@/lib/products";
import { requireAdmin } from "@/lib/session";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

export default async function AdminPage() {
  const { user } = await requireAdmin();
  const products = await getStockList();
  const soldOut = products.filter((product) => product.stock === 0).length;

  return (
    <section aria-labelledby="admin-title" className="container-page section">
      <div className="mb-8 flex flex-col gap-3 md:mb-10">
        <p className="type-eyebrow text-muted">Admin · {user.email}</p>
        <h1 id="admin-title" className="type-title-l">
          Stock
        </h1>
        <p className="type-small text-muted">
          {products.length} products, {soldOut} sold out
        </p>
      </div>

      <ul className="flex flex-col border-t border-divider">
        {products.map((product) => (
          <li
            key={product.slug}
            className="flex flex-col gap-3 border-b border-divider py-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex flex-col gap-1">
              <p className="type-small-strong">{product.name}</p>
              <p className="type-small text-muted">
                {product.category.name} · {getStockState(product.stock).label}
              </p>
            </div>
            <form action={updateStock} className="flex items-end gap-4">
              <input type="hidden" name="slug" value={product.slug} />
              <div className="w-24">
                <label htmlFor={`stock-${product.slug}`} className="label">
                  Stock
                </label>
                <input
                  id={`stock-${product.slug}`}
                  name="stock"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={10000}
                  step={1}
                  required
                  defaultValue={product.stock}
                  className="input"
                />
              </div>
              <button type="submit" className="btn btn-secondary btn-sm w-auto">
                Save
              </button>
            </form>
          </li>
        ))}
      </ul>
    </section>
  );
}
