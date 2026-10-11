import "server-only";
import { cache } from "react";
import type { Prisma, ProductBadge } from "@/generated/prisma/client";
import type { Collection, Product } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

/*
 * Catalog queries. Rows are mapped to the `Product` / `Collection` shapes the
 * storefront components already use.
 */

const productInclude = {
  category: { select: { slug: true, name: true } },
} satisfies Prisma.ProductInclude;

type ProductRow = Prisma.ProductGetPayload<{ include: typeof productInclude }>;
type CategoryRow = Prisma.CategoryGetPayload<object>;

const badgeLabels: Record<ProductBadge, NonNullable<Product["badge"]>> = {
  NEW_IN: "New in",
  LIMITED: "Limited",
  BESTSELLER: "Bestseller",
};

function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    detail: row.detail,
    price: row.priceCents / 100,
    category: row.category,
    stock: row.stock,
    description: row.description,
    details: row.details,
    badge: row.badge ? badgeLabels[row.badge] : undefined,
    image: {
      src: row.imageUrl,
      alt: row.imageAlt,
      position: row.imagePosition ?? undefined,
    },
  };
}

function toCollection(row: CategoryRow): Collection {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    image: {
      src: row.imageUrl,
      alt: row.imageAlt,
      position: row.imagePosition ?? undefined,
    },
  };
}

export async function getCategories() {
  const rows = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map(toCollection);
}

/** Memoized per request: generateMetadata and the page both call it. */
export const getCategory = cache(async (slug: string) => {
  const row = await prisma.category.findUnique({ where: { slug } });
  return row ? toCollection(row) : undefined;
});

export async function getCategorySlugs() {
  const rows = await prisma.category.findMany({ select: { slug: true } });
  return rows.map((row) => row.slug);
}

/** Products in a category, newest first. */
export async function getProductsByCategory(slug: string) {
  const rows = await prisma.product.findMany({
    where: { category: { slug } },
    include: productInclude,
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toProduct);
}

/** Memoized per request: generateMetadata and the page both call it. */
export const getProduct = cache(async (slug: string) => {
  const row = await prisma.product.findUnique({ where: { slug }, include: productInclude });
  return row ? toProduct(row) : undefined;
});

export async function getProductSlugs() {
  const rows = await prisma.product.findMany({ select: { slug: true } });
  return rows.map((row) => row.slug);
}

export async function getNewArrivals(limit = 8) {
  const rows = await prisma.product.findMany({
    include: productInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map(toProduct);
}

/** Products in the order given; unknown slugs are skipped. */
export async function getProductsBySlugs(slugs: string[]) {
  const rows = await prisma.product.findMany({
    where: { slug: { in: slugs } },
    include: productInclude,
  });
  const bySlug = new Map(rows.map((row) => [row.slug, toProduct(row)]));
  return slugs.flatMap((slug) => bySlug.get(slug) ?? []);
}

/** Up to `limit` other products, same category first. */
export async function getRelatedProducts(product: Product, limit = 4) {
  const sameCategory = await prisma.product.findMany({
    where: { slug: { not: product.slug }, category: { slug: product.category.slug } },
    include: productInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  const others =
    sameCategory.length < limit
      ? await prisma.product.findMany({
          where: { category: { slug: { not: product.category.slug } } },
          include: productInclude,
          orderBy: { createdAt: "desc" },
          take: limit - sameCategory.length,
        })
      : [];

  return [...sameCategory, ...others].map(toProduct);
}
