/*
 * Sample storefront data for the homepage and product pages. Replace with Prisma queries
 * once Product and Collection models exist.
 *
 * Photos are from Unsplash (https://unsplash.com/license).
 */

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position, to keep the subject in frame when cropped */
  position?: string;
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  image: Photo;
};

export type Product = {
  slug: string;
  name: string;
  detail: string;
  price: number;
  /** Collection slug the product belongs to */
  category: string;
  /** Units available; 0 means sold out */
  stock: number;
  description: string;
  details: string[];
  badge?: "New in" | "Limited" | "Bestseller";
  image: Photo;
};

export type Story = {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  image: Photo;
};

function unsplash(id: string, alt: string, position?: string): Photo {
  return { src: `https://images.unsplash.com/photo-${id}`, alt, position };
}

export const hero: Story = {
  eyebrow: "Autumn–Winter 2026",
  title: "The Quiet Season",
  body: "Tailored wool, soft structure and colour taken from the city at dusk.",
  cta: { label: "Discover the collection", href: "/collections/autumn-winter" },
  image: unsplash(
    "1539109136881-3be0616acf4b",
    "A woman in a long pale-blue coat stands in a cathedral square",
    "50% 35%",
  ),
};

export const collections: Collection[] = [
  {
    slug: "women",
    name: "Women",
    tagline: "Outerwear, knitwear and tailoring",
    image: unsplash(
      "1485968579580-b6d095142e6e",
      "A woman in a dark plaid coat on a city street",
      "50% 30%",
    ),
  },
  {
    slug: "men",
    name: "Men",
    tagline: "Suiting and leather for every day",
    image: unsplash(
      "1617137968427-85924c800a22",
      "A man in a navy suit standing outside a glass building",
      "50% 25%",
    ),
  },
  {
    slug: "bags",
    name: "Bags",
    tagline: "Top handles, totes and shoulder bags",
    image: unsplash("1598532163257-ae3c6b2524b6", "A cognac woven leather tote with a gold chain"),
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "Eyewear, jewellery and small leather goods",
    image: unsplash(
      "1511499767150-a48a237f0083",
      "Round gold-framed sunglasses on a white surface",
    ),
  },
];

export const products: Product[] = [
  {
    slug: "maren-top-handle-bag",
    name: "Maren top-handle bag",
    detail: "Grained calf, teal",
    price: 2450,
    category: "bags",
    stock: 6,
    badge: "New in",
    description:
      "A structured top-handle bag in grained calf, sized for the essentials. The rolled handle and turn-lock closure are finished by hand.",
    details: [
      "Grained calf leather, suede lining",
      "Detachable shoulder strap",
      "W 24 × H 18 × D 10 cm",
      "Made in Italy",
    ],
    image: unsplash(
      "1594223274512-ad4803739b7c",
      "Teal leather top-handle bag resting on a stack of books",
      "60% 50%",
    ),
  },
  {
    slug: "riva-biker-jacket",
    name: "Riva biker jacket",
    detail: "Lambskin, black",
    price: 3200,
    category: "women",
    stock: 2,
    badge: "Bestseller",
    description:
      "Our classic biker cut in supple lambskin that softens with every wear. Asymmetric zip, notched lapels and a close, cropped fit.",
    details: [
      "100% lambskin, viscose lining",
      "Antique silver hardware",
      "Specialist leather clean",
      "Made in Spain",
    ],
    image: unsplash("1551028719-00167b16eac5", "Black lambskin biker jacket"),
  },
  {
    slug: "lune-round-sunglasses",
    name: "Lune round sunglasses",
    detail: "Gold metal, green lenses",
    price: 420,
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
    image: unsplash("1511499767150-a48a237f0083", "Round gold-framed sunglasses"),
  },
  {
    slug: "perla-necklace",
    name: "Perla necklace",
    detail: "Freshwater pearls, silver clasp",
    price: 890,
    category: "accessories",
    stock: 0,
    badge: "Limited",
    description:
      "Hand-knotted freshwater pearls, each one chosen for its soft lustre, finished with a sterling silver clasp.",
    details: [
      "Freshwater pearls, 7–8 mm",
      "Sterling silver clasp",
      "Length 45 cm",
      "Strung by hand in France",
    ],
    image: unsplash("1515562141207-7a88fb7ce338", "Pearl necklace in an open jewellery box"),
  },
  {
    slug: "sienna-bomber",
    name: "Sienna bomber",
    detail: "Washed satin, terracotta",
    price: 1350,
    category: "women",
    stock: 9,
    badge: "New in",
    description:
      "A relaxed bomber in washed satin with a quiet sheen. Ribbed cuffs and hem keep the volume soft.",
    details: ["100% washed silk satin", "Cupro lining", "Dry clean only", "Made in Portugal"],
    image: unsplash("1591047139829-d91aecb6caea", "Terracotta satin bomber jacket on a hanger"),
  },
  {
    slug: "tessa-woven-tote",
    name: "Tessa woven tote",
    detail: "Woven calf, cognac",
    price: 2150,
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
    image: unsplash("1598532163257-ae3c6b2524b6", "Cognac woven leather tote with a gold chain"),
  },
  {
    slug: "alba-knit-poncho",
    name: "Alba knit poncho",
    detail: "Cotton crochet, ivory",
    price: 760,
    category: "women",
    stock: 11,
    description:
      "An open crochet poncho in soft organic cotton. Worn over linen in summer or layered over knitwear into autumn.",
    details: ["100% organic cotton", "Hand-crocheted", "One size", "Made in Peru"],
    image: unsplash("1434389677669-e08b4cac3105", "Ivory crochet poncho on a wooden hanger"),
  },
  {
    slug: "brera-derby",
    name: "Brera derby",
    detail: "Polished calf, cognac",
    price: 940,
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
    image: unsplash("1614252235316-8c857d38b5f4", "Cognac leather derby shoe, close up"),
  },
  {
    slug: "lior-satchel",
    name: "Lior satchel",
    detail: "Pebbled leather, dove grey",
    price: 1290,
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
    image: unsplash("1605733513597-a8f8341084e6", "Dove-grey leather satchel with buckled straps"),
  },
  {
    slug: "nove-chain-bag",
    name: "Nove chain bag",
    detail: "Smooth leather, blush",
    price: 1650,
    category: "bags",
    stock: 1,
    badge: "New in",
    description:
      "A compact shoulder bag in smooth leather on a sliding chain strap, worn long or doubled up.",
    details: [
      "Smooth calf leather, suede lining",
      "Gold-tone chain strap",
      "W 22 × H 14 × D 6 cm",
      "Made in Italy",
    ],
    image: unsplash("1566150905458-1bf1fc113f0d", "Blush leather shoulder bag with chain strap"),
  },
  {
    slug: "fiore-stiletto",
    name: "Fiore stiletto",
    detail: "Printed silk, 105mm",
    price: 980,
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
    image: unsplash("1543163521-1bf539c55dd2", "Floral printed stiletto pumps"),
  },
  {
    slug: "stella-drop-earrings",
    name: "Stella drop earrings",
    detail: "Crystal and blue glass",
    price: 640,
    category: "accessories",
    stock: 8,
    description:
      "Cut crystal and blue glass set in a hand-finished drop, made to catch the light with every movement.",
    details: ["Crystal and blue glass", "Gold-plated brass posts", "Drop 5 cm", "Made in Austria"],
    image: unsplash("1535632066927-ab7c9ab60908", "Crystal drop earrings on a green leaf"),
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

function pick(slugs: string[]) {
  return slugs.map((slug) => {
    const product = getProduct(slug);
    if (!product) throw new Error(`Unknown product: ${slug}`);
    return product;
  });
}

export const newArrivals = pick([
  "maren-top-handle-bag",
  "riva-biker-jacket",
  "lune-round-sunglasses",
  "perla-necklace",
  "sienna-bomber",
  "tessa-woven-tote",
  "alba-knit-poncho",
  "brera-derby",
]);

export const giftEdit = pick([
  "maren-top-handle-bag",
  "lior-satchel",
  "nove-chain-bag",
  "fiore-stiletto",
  "stella-drop-earrings",
  "lune-round-sunglasses",
]);

/** Up to `limit` other products, same category first. */
export function getRelatedProducts(product: Product, limit = 4) {
  const others = products.filter((other) => other.slug !== product.slug);
  return [
    ...others.filter((other) => other.category === product.category),
    ...others.filter((other) => other.category !== product.category),
  ].slice(0, limit);
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

/** Stock levels at or below this show a low-stock warning. */
const LOW_STOCK = 3;

export type StockState =
  | { status: "in-stock"; label: string }
  | { status: "low-stock"; label: string }
  | { status: "sold-out"; label: string };

export function getStockState(stock: number): StockState {
  if (stock <= 0) return { status: "sold-out", label: "Sold out" };
  if (stock <= LOW_STOCK) return { status: "low-stock", label: `Only ${stock} left` };
  return { status: "in-stock", label: "In stock" };
}

export const stories: Story[] = [
  {
    eyebrow: "The summer edit",
    title: "Colour, in motion",
    body: "Bias-cut silk and full skirts made to move. A wardrobe for long evenings and slow mornings.",
    cta: { label: "Shop dresses", href: "/collections/dresses" },
    image: unsplash(
      "1595777457583-95e059d581b8",
      "A woman in a flowing red dress turning in a garden",
      "50% 40%",
    ),
  },
  {
    eyebrow: "Menswear",
    title: "Suede, softened",
    body: "Unlined suede overshirts and boots in desert tones, cut easy and finished by hand in our partner workshops.",
    cta: { label: "Shop menswear", href: "/collections/men" },
    image: unsplash(
      "1617114919297-3c8ddb01f599",
      "A man in a tan suede jacket and jeans leaning on a stone wall",
      "85% 30%",
    ),
  },
];

export const campaign: Story = {
  eyebrow: "The atelier",
  title: "Made slowly, worn for years",
  body: "Every piece is cut, stitched and finished by artisans we know by name.",
  cta: { label: "Our craft", href: "/about" },
  image: unsplash(
    "1558769132-cb1aea458c5e",
    "Neutral-toned knitwear and linen hanging on a wooden rail",
    "50% 50%",
  ),
};

export const services = [
  {
    title: "Complimentary shipping",
    body: "Free express delivery on every order, with signature on arrival.",
  },
  {
    title: "Returns within 30 days",
    body: "Free collection from your door. Refunds within five working days.",
  },
  {
    title: "Signature packaging",
    body: "Every order arrives gift-wrapped, with a handwritten note on request.",
  },
  {
    title: "Book an appointment",
    body: "Shop in store or by video with a personal client advisor.",
  },
];

export const navigation = [
  { label: "New in", href: "/collections/new-in" },
  { label: "Women", href: "/collections/women" },
  { label: "Men", href: "/collections/men" },
  { label: "Bags", href: "/collections/bags" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Gifts", href: "/collections/gifts" },
];

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number) {
  return priceFormat.format(amount);
}
