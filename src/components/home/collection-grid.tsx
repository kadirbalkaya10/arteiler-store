import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/home/section-heading";
import type { Collection } from "@/lib/catalog";

export function CollectionGrid({ collections }: { collections: Collection[] }) {
  return (
    <section aria-labelledby="collections-title" className="container-fluid section">
      <SectionHeading id="collections-title" eyebrow="Shop by category" title="The collections" />

      <ul className="grid grid-cols-2 gap-x-grid gap-y-8 lg:grid-cols-4">
        {collections.map((collection) => (
          <li key={collection.slug}>
            <Link href={`/collections/${collection.slug}`} className="group flex flex-col gap-4">
              <div className="relative aspect-3/4 overflow-hidden bg-surface-media">
                <Image
                  src={collection.image.src}
                  alt={collection.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-standard group-hover:scale-[1.03]"
                  style={{ objectPosition: collection.image.position }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="type-title-s">
                  <span className="link-quiet group-hover:bg-size-[100%_1px]">
                    {collection.name}
                  </span>
                </h3>
                <p className="type-small text-muted">{collection.tagline}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
