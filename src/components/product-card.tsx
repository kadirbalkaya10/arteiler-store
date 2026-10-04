import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/catalog";

type ProductCardProps = {
  product: Product;
  /** next/image `sizes`, matched to the grid the card sits in */
  sizes: string;
};

export function ProductCard({ product, sizes }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group flex h-full flex-col">
      <div className="media-product">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-standard group-hover:scale-[1.03]"
          style={{ objectPosition: product.image.position }}
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-background px-2 py-1 type-micro uppercase">
            {product.badge}
          </span>
        )}
      </div>

      <div className="product-info">
        <h3 className="type-small-strong">
          <span className="link-quiet group-hover:bg-size-[100%_1px]">{product.name}</span>
        </h3>
        <p className="type-small text-muted">{product.detail}</p>
        <p className="mt-1 type-small">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
