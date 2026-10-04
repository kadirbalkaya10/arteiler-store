/*
 * Storefront types, editorial content and display helpers. Products and categories
 * live in the database; query them through `@/lib/products`.
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
  category: { slug: string; name: string };
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

/** Hand-picked for the homepage gift edit, in display order. */
export const GIFT_EDIT_SLUGS = [
  "maren-top-handle-bag",
  "lior-satchel",
  "nove-chain-bag",
  "fiore-stiletto",
  "stella-drop-earrings",
  "lune-round-sunglasses",
];

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
