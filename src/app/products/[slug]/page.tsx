import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/home/product-showcase";
import { AddToBag } from "@/components/product/add-to-bag";
import { StockStatus } from "@/components/product/stock-status";
import { formatPrice, getStockState, services } from "@/lib/catalog";
import { getProduct, getProductSlugs, getRelatedProducts } from "@/lib/products";

/** Re-read price and stock from the database at most once a minute. */
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [{ url: product.image.src, alt: product.image.alt }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const { category } = product;
  const stock = getStockState(product.stock);
  const related = await getRelatedProducts(product);

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
            <Link href={`/collections/${category.slug}`} className="link-quiet">
              {category.name}
            </Link>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-foreground">
              {product.name}
            </span>
          </li>
        </ol>
      </nav>

      <article className="container-fluid grid gap-8 pb-section lg:grid-cols-12 lg:gap-grid">
        <div className="media-product lg:col-span-7">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            preload
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
            style={{ objectPosition: product.image.position }}
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-background px-2 py-1 type-micro uppercase">
              {product.badge}
            </span>
          )}
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="flex flex-col gap-8 lg:sticky lg:top-32">
            <div className="flex flex-col gap-3">
              <Link
                href={`/collections/${category.slug}`}
                className="link-quiet w-fit type-eyebrow text-muted"
              >
                {category.name}
              </Link>
              <h1 className="type-title-l">{product.name}</h1>
              <p className="type-body text-muted">{product.detail}</p>
              <p className="type-body-strong">{formatPrice(product.price)}</p>
            </div>

            <div className="flex flex-col gap-4">
              <StockStatus state={stock} />
              <AddToBag soldOut={stock.status === "sold-out"} />
            </div>

            <div className="flex flex-col gap-4 border-t border-divider pt-8">
              <h2 className="type-eyebrow">Description</h2>
              <p className="type-body">{product.description}</p>
              <ul className="flex list-disc flex-col gap-1 pl-4 type-small text-muted">
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>

            <ul className="flex flex-col gap-4 border-t border-divider pt-8">
              {services.slice(0, 2).map((service) => (
                <li key={service.title} className="flex flex-col gap-1">
                  <h2 className="type-small-strong uppercase">{service.title}</h2>
                  <p className="type-small text-muted">{service.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <div className="border-t border-divider">
          <ProductGrid
            id="related-title"
            eyebrow="Complete the look"
            title="You may also like"
            action={{
              label: `Shop ${category.name}`,
              href: `/collections/${category.slug}`,
            }}
            products={related}
          />
        </div>
      )}
    </>
  );
}
