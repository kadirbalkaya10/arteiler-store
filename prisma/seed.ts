/*
 * Seeds the catalog with the original sample categories and products.
 * Idempotent: rows are upserted by slug, so re-running resets them to these values.
 *
 * Photos are from Unsplash (https://unsplash.com/license).
 */
import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient, type ProductBadge } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}`;
}

type CategorySeed = {
  slug: string;
  name: string;
  tagline: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition?: string;
};

type ProductSeed = {
  slug: string;
  name: string;
  detail: string;
  priceCents: number;
  category: string;
  stock: number;
  badge?: ProductBadge;
  description: string;
  details: string[];
  imageUrl: string;
  imageAlt: string;
  imagePosition?: string;
};

/** In homepage order */
const categories: CategorySeed[] = [
  {
    slug: "women",
    name: "Women",
    tagline: "Outerwear, knitwear and tailoring",
    imageUrl: unsplash("1485968579580-b6d095142e6e"),
    imageAlt: "A woman in a dark plaid coat on a city street",
    imagePosition: "50% 30%",
  },
  {
    slug: "men",
    name: "Men",
    tagline: "Suiting and leather for every day",
    imageUrl: unsplash("1617137968427-85924c800a22"),
    imageAlt: "A man in a navy suit standing outside a glass building",
    imagePosition: "50% 25%",
  },
  {
    slug: "bags",
    name: "Bags",
    tagline: "Top handles, totes and shoulder bags",
    imageUrl: unsplash("1598532163257-ae3c6b2524b6"),
    imageAlt: "A cognac woven leather tote with a gold chain",
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "Eyewear, jewellery and small leather goods",
    imageUrl: unsplash("1511499767150-a48a237f0083"),
    imageAlt: "Round gold-framed sunglasses on a white surface",
  },
];

/** Newest first: the first eight make up "New arrivals" */
const products: ProductSeed[] = [
  {
    slug: "maren-top-handle-bag",
    name: "Maren top-handle bag",
    detail: "Grained calf, teal",
    priceCents: 245000,
    category: "bags",
    stock: 6,
    badge: "NEW_IN",
    description:
      "A structured top-handle bag in grained calf, sized for the essentials. The rolled handle and turn-lock closure are finished by hand.",
    details: [
      "Grained calf leather, suede lining",
      "Detachable shoulder strap",
      "W 24 × H 18 × D 10 cm",
      "Made in Italy",
    ],
    imageUrl: unsplash("1594223274512-ad4803739b7c"),
    imageAlt: "Teal leather top-handle bag resting on a stack of books",
    imagePosition: "60% 50%",
  },
  {
    slug: "riva-biker-jacket",
    name: "Riva biker jacket",
    detail: "Lambskin, black",
    priceCents: 320000,
    category: "women",
    stock: 2,
    badge: "BESTSELLER",
    description:
      "Our classic biker cut in supple lambskin that softens with every wear. Asymmetric zip, notched lapels and a close, cropped fit.",
    details: [
      "100% lambskin, viscose lining",
      "Antique silver hardware",
      "Specialist leather clean",
      "Made in Spain",
    ],
    imageUrl: unsplash("1551028719-00167b16eac5"),
    imageAlt: "Black lambskin biker jacket",
  },
  {
    slug: "lune-round-sunglasses",
    name: "Lune round sunglasses",
    detail: "Gold metal, green lenses",
    priceCents: 42000,
    category: "accessories",
    stock: 14,
    description:
      "Fine round frames in gold-plated metal with bottle-green lenses. Light enough to forget you are wearing them.",
    details: [
      "Gold-plated metal frame",
      "Category 3 lenses, 100% UV protection",
      "Leather case included",
      "Made in Japan",
    ],
    imageUrl: unsplash("1511499767150-a48a237f0083"),
    imageAlt: "Round gold-framed sunglasses",
  },
  {
    slug: "perla-necklace",
    name: "Perla necklace",
    detail: "Freshwater pearls, silver clasp",
    priceCents: 89000,
    category: "accessories",
    stock: 0,
    badge: "LIMITED",
    description:
      "Hand-knotted freshwater pearls, each one chosen for its soft lustre, finished with a sterling silver clasp.",
    details: [
      "Freshwater pearls, 7–8 mm",
      "Sterling silver clasp",
      "Length 45 cm",
      "Strung by hand in France",
    ],
    imageUrl: unsplash("1515562141207-7a88fb7ce338"),
    imageAlt: "Pearl necklace in an open jewellery box",
  },
  {
    slug: "sienna-bomber",
    name: "Sienna bomber",
    detail: "Washed satin, terracotta",
    priceCents: 135000,
    category: "women",
    stock: 9,
    badge: "NEW_IN",
    description:
      "A relaxed bomber in washed satin with a quiet sheen. Ribbed cuffs and hem keep the volume soft.",
    details: ["100% washed silk satin", "Cupro lining", "Dry clean only", "Made in Portugal"],
    imageUrl: unsplash("1591047139829-d91aecb6caea"),
    imageAlt: "Terracotta satin bomber jacket on a hanger",
  },
  {
    slug: "tessa-woven-tote",
    name: "Tessa woven tote",
    detail: "Woven calf, cognac",
    priceCents: 215000,
    category: "bags",
    stock: 3,
    description:
      "Strips of calf leather woven by hand into a generous tote, with a gold chain detail and room for a laptop.",
    details: [
      "Hand-woven calf leather",
      "Unlined, with inner pouch",
      "W 40 × H 30 × D 14 cm",
      "Made in Italy",
    ],
    imageUrl: unsplash("1598532163257-ae3c6b2524b6"),
    imageAlt: "Cognac woven leather tote with a gold chain",
  },
  {
    slug: "alba-knit-poncho",
    name: "Alba knit poncho",
    detail: "Cotton crochet, ivory",
    priceCents: 76000,
    category: "women",
    stock: 11,
    description:
      "An open crochet poncho in soft organic cotton. Worn over linen in summer or layered over knitwear into autumn.",
    details: ["100% organic cotton", "Hand-crocheted", "One size", "Made in Peru"],
    imageUrl: unsplash("1434389677669-e08b4cac3105"),
    imageAlt: "Ivory crochet poncho on a wooden hanger",
  },
  {
    slug: "brera-derby",
    name: "Brera derby",
    detail: "Polished calf, cognac",
    priceCents: 94000,
    category: "men",
    stock: 7,
    description:
      "A Goodyear-welted derby in hand-polished calf. Built to be resoled and worn for decades.",
    details: [
      "Polished calf upper, leather lining",
      "Goodyear-welted leather sole",
      "Fits true to size",
      "Made in England",
    ],
    imageUrl: unsplash("1614252235316-8c857d38b5f4"),
    imageAlt: "Cognac leather derby shoe, close up",
  },
  {
    slug: "lior-satchel",
    name: "Lior satchel",
    detail: "Pebbled leather, dove grey",
    priceCents: 129000,
    category: "bags",
    stock: 5,
    description:
      "A soft satchel in pebbled leather with buckled straps and an adjustable shoulder strap for wearing crossbody.",
    details: [
      "Pebbled calf leather",
      "Cotton twill lining",
      "W 30 × H 22 × D 9 cm",
      "Made in Italy",
    ],
    imageUrl: unsplash("1605733513597-a8f8341084e6"),
    imageAlt: "Dove-grey leather satchel with buckled straps",
  },
  {
    slug: "nove-chain-bag",
    name: "Nove chain bag",
    detail: "Smooth leather, blush",
    priceCents: 165000,
    category: "bags",
    stock: 1,
    badge: "NEW_IN",
    description:
      "A compact shoulder bag in smooth leather on a sliding chain strap, worn long or doubled up.",
    details: [
      "Smooth calf leather, suede lining",
      "Gold-tone chain strap",
      "W 22 × H 14 × D 6 cm",
      "Made in Italy",
    ],
    imageUrl: unsplash("1566150905458-1bf1fc113f0d"),
    imageAlt: "Blush leather shoulder bag with chain strap",
  },
  {
    slug: "fiore-stiletto",
    name: "Fiore stiletto",
    detail: "Printed silk, 105mm",
    priceCents: 98000,
    category: "women",
    stock: 4,
    description:
      "A pointed stiletto covered in our archive floral print, on a slender 105mm heel with a cushioned footbed.",
    details: [
      "Printed silk upper, leather lining",
      "Heel height 105 mm",
      "Leather sole",
      "Made in Italy",
    ],
    imageUrl: unsplash("1543163521-1bf539c55dd2"),
    imageAlt: "Floral printed stiletto pumps",
  },
  {
    slug: "stella-drop-earrings",
    name: "Stella drop earrings",
    detail: "Crystal and blue glass",
    priceCents: 64000,
    category: "accessories",
    stock: 8,
    description:
      "Cut crystal and blue glass set in a hand-finished drop, made to catch the light with every movement.",
    details: ["Crystal and blue glass", "Gold-plated brass posts", "Drop 5 cm", "Made in Austria"],
    imageUrl: unsplash("1535632066927-ab7c9ab60908"),
    imageAlt: "Crystal drop earrings on a green leaf",
  },
];

const DAY = 24 * 60 * 60 * 1000;
const LATEST = Date.UTC(2026, 9, 1);

async function main() {
  const categoryIds = new Map<string, string>();

  for (const [sortOrder, category] of categories.entries()) {
    const data = { ...category, imagePosition: category.imagePosition ?? null, sortOrder };
    const { id } = await prisma.category.upsert({
      where: { slug: category.slug },
      create: data,
      update: data,
    });
    categoryIds.set(category.slug, id);
  }

  for (const [index, { category, ...product }] of products.entries()) {
    const categoryId = categoryIds.get(category);
    if (!categoryId) throw new Error(`Unknown category "${category}" for ${product.slug}`);

    // Space products a day apart so "newest first" keeps the order above
    const data = {
      ...product,
      badge: product.badge ?? null,
      imagePosition: product.imagePosition ?? null,
      categoryId,
      createdAt: new Date(LATEST - index * DAY),
    };
    await prisma.product.upsert({
      where: { slug: product.slug },
      create: data,
      update: data,
    });
  }

  console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
