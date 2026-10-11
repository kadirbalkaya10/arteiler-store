import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getCategory, getCategorySlugs, getProductsByCategory } from "@/lib/products";

/** Re-read products and stock from the database at most once a minute. */
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const category = await getCategory((await params).slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.tagline,
    openGraph: { images: [{ url: category.image.src, alt: category.image.alt }] },
  };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
  ]);
  if (!category) notFound();

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
              {category.name}
            </span>
          </li>
        </ol>
      </nav>

      <section aria-labelledby="collection-title" className="container-fluid pb-section">
        <div className="mb-8 flex flex-col gap-3 md:mb-10">
          <p className="type-eyebrow text-muted">{category.tagline}</p>
          <h1 id="collection-title" className="type-title-xl">
            {category.name}
          </h1>
          <p className="type-small text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
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
          <p className="type-body text-muted">Nothing here right now. Check back soon.</p>
        )}
      </section>
    </>
  );
}
