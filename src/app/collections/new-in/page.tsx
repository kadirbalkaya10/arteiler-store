import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getNewArrivals } from "@/lib/products";

/** Re-read products and stock from the database at most once a minute. */
export const revalidate = 60;

/** How many of the latest products the page lists */
const LIMIT = 24;

export const metadata: Metadata = {
  title: "New arrivals",
  description: "The latest clothing, bags and accessories, newest first.",
};

export default async function NewArrivalsPage() {
  const products = await getNewArrivals(LIMIT);

  return (
    <>
      <nav aria-label="Breadcrumb" className="container-fluid py-4 type-small text-muted">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="link-quiet">
              Home
            </Link>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-foreground">
              New in
            </span>
          </li>
        </ol>
      </nav>

      <section aria-labelledby="new-arrivals-title" className="container-fluid pb-section">
        <div className="mb-8 flex flex-col gap-3 md:mb-10">
          <p className="type-eyebrow text-muted">Just landed</p>
          <h1 id="new-arrivals-title" className="type-title-xl">
            New arrivals
          </h1>
          <p className="type-small text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"}, newest first
          </p>
        </div>

        {products.length > 0 ? (
          <ul className="product-grid">
            {products.map((product) => (
              <li key={product.slug}>
                <ProductCard
                  product={product}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="type-body text-muted">Nothing new right now. Check back soon.</p>
        )}
      </section>
    </>
  );
}
