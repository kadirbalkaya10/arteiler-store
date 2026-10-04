import { CollectionGrid } from "@/components/home/collection-grid";
import { CampaignBanner, StorySplit } from "@/components/home/editorial";
import { Hero } from "@/components/home/hero";
import { ProductGrid, ProductRail } from "@/components/home/product-showcase";
import { Newsletter, ServicesStrip } from "@/components/home/services";
import {
  campaign,
  collections,
  giftEdit,
  hero,
  newArrivals,
  services,
  stories,
} from "@/lib/catalog";

export default function Home() {
  return (
    <>
      <Hero story={hero} />

      <CollectionGrid collections={collections} />

      <StorySplit story={stories[0]} />

      <ProductGrid
        id="new-arrivals-title"
        eyebrow="Just landed"
        title="New arrivals"
        action={{ label: "View all", href: "/collections/new-in" }}
        products={newArrivals}
      />

      <StorySplit story={stories[1]} reverse />

      <ProductRail
        id="gift-edit-title"
        eyebrow="Curated"
        title="The gift edit"
        action={{ label: "Shop gifts", href: "/collections/gifts" }}
        products={giftEdit}
      />

      <CampaignBanner story={campaign} />

      <ServicesStrip services={services} />

      <Newsletter />
    </>
  );
}
