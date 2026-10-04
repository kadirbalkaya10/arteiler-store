import { SectionHeading } from "@/components/home/section-heading";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/catalog";

type ShowcaseProps = {
  id: string;
  eyebrow: string;
  title: string;
  action: { label: string; href: string };
  products: Product[];
};

/** Product grid: 2 → 3 → 4 columns. */
export function ProductGrid({ id, eyebrow, title, action, products }: ShowcaseProps) {
  return (
    <section aria-labelledby={id} className="container-fluid section">
      <SectionHeading id={id} eyebrow={eyebrow} title={title} action={action} />
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
    </section>
  );
}

/** Horizontally scrolling rail that snaps to each card; swipeable on touch. */
export function ProductRail({ id, eyebrow, title, action, products }: ShowcaseProps) {
  return (
    <section aria-labelledby={id} className="section bg-surface">
      <div className="container-fluid">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} action={action} />
      </div>
      <ul className="flex snap-x snap-mandatory scroll-px-gutter gap-grid overflow-x-auto px-gutter [scrollbar-width:none]">
        {products.map((product) => (
          <li
            key={product.slug}
            className="w-[72%] shrink-0 snap-start md:w-[40%] lg:w-[calc((100%-3*var(--grid-gap))/4.5)]"
          >
            <ProductCard
              product={product}
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 40vw, 72vw"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
