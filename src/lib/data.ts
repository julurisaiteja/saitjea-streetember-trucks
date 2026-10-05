import itemsA from "./items-a.json";
import itemsB from "./items-b.json";

export type CatalogItem = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  badge: string | null;
  rating: number;
  reviews: number;
  specs: Record<string, string>;
  options: string[];
  pdpFaqs: { q: string; a: string }[];
};

export const brand = {
  name: "StreetEmber",
  tagline: "Spray the map. Order before the line.",
  slug: "streetember-trucks",
  style: "graffiti-street",
  coupon: "EMBER5",
  cta: "Find trucks",
  heroStill: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=1800&q=80",
  heroVideo: "https://videos.pexels.com/video-files/4253694/4253694-uhd_2560_1440_25fps.mp4" as string | null,
  shopLabel: "Menu",
  nichePath: "locator",
  nicheLabel: "Locator",
  isBooking: false,
  stickyCta: "Order ahead",
  stickyHref: "/order",
};

export const items: CatalogItem[] = [...itemsA, ...itemsB] as CatalogItem[];

export const reviewList = [
  {
    "name": "DJ K.",
    "quote": "Locator ETA beat the line by 12 minutes."
  },
  {
    "name": "Sasha P.",
    "quote": "Graffiti energy, real food."
  },
  {
    "name": "Moe H.",
    "quote": "Order-ahead smash burger hit."
  }
];

export const aiFaqs = [
  {
    "q": "How does order-ahead work?",
    "a": "Pick a truck on /locator, add menu items, we target a 12–20 min ETA."
  },
  {
    "q": "Multiple trucks?",
    "a": "Yes — Ember, Smoke, and Night carts rotate weekly."
  },
  {
    "q": "EMBER5?",
    "a": "$5 off Family Feast Box in demo."
  }
];

export const counselTips = [
  {
    "title": "Order-ahead",
    "body": "Locator ETA updates every 15 minutes in demo."
  },
  {
    "title": "Heat level",
    "body": "Ember hot is habanero-forward — choose mild for kids."
  },
  {
    "title": "Pickup",
    "body": "Text name on order notes field."
  }
];

export const categories = Array.from(new Set(items.map((i) => i.category))).sort();

export function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function getItem(id: string) {
  return items.find((i) => i.id === id);
}

export function relatedItems(id: string, limit = 3) {
  const item = getItem(id);
  if (!item) return [];
  return items.filter((i) => i.category === item.category && i.id !== id).slice(0, limit);
}
