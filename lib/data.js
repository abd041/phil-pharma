import { catalogueProducts, catalogueStats } from "./catalogue";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const shopCategories = [
  {
    slug: "peptides",
    name: "Peptides",
    href: "/shop/peptides",
    blurb: "Peptide vials, ready-to-use pens, and nasals as listed on the client menu.",
    subcategories: [
      { slug: "vials", name: "Peptide Vials" },
      { slug: "pens", name: "Ready to Use Pens" },
      { slug: "nasals", name: "Peptide Nasals" },
    ],
  },
  {
    slug: "medications",
    name: "Medications",
    href: "/shop/medications",
    blurb: "Standard medications, special medications, and prescription creams.",
    subcategories: [
      { slug: "standard", name: "Standard" },
      { slug: "special", name: "Special" },
      { slug: "creams", name: "Prescription Creams" },
    ],
  },
  {
    slug: "thc",
    name: "THC",
    href: "/shop/thc",
    blurb: "D9 + Terps pod options with listed bundle pricing.",
    subcategories: [{ slug: "pods", name: "Pods" }],
  },
  {
    slug: "ped",
    name: "PED",
    href: "/shop/ped",
    blurb: "Oils, orals, and ready-to-use pens from the PED menu.",
    subcategories: [
      { slug: "oils", name: "Oils" },
      { slug: "orals", name: "Orals" },
      { slug: "pens", name: "Ready Pens" },
    ],
  },
  {
    slug: "accessories",
    name: "Accessories",
    href: "/shop/accessories",
    blurb: "Batteries, syringe packs, and other accessories.",
    subcategories: [
      { slug: "devices", name: "Devices" },
      { slug: "syringes", name: "Syringes" },
    ],
  },
];

export const products = catalogueProducts;
export const catalogueMeta = catalogueStats;

export const featuredProductIds = [
  "d9-terps",
  "retatrutide-vial",
  "tirzepitide-mounjaro-vial",
  "bpc-157-vial",
  "test-e-hulk-oil",
  "12-week-peptide-syringe-pack",
];

export function getProductBySlug(slug) {
  return products.find((item) => item.slug === slug);
}

export function getProductsByCategory(category) {
  return products.filter((item) => item.category === category);
}

export function getProductsBySubcategory(category, subcategory) {
  return products.filter(
    (item) => item.category === category && item.subcategory === subcategory
  );
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((item) => {
    const haystack = [
      item.name,
      item.tag,
      item.category,
      item.subcategory,
      item.subcategoryLabel,
      item.brand,
      item.format,
      item.description,
      ...(item.variants || []).map((variant) => variant.label),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getDefaultVariant(product) {
  if (!product?.variants?.length) return null;
  return product.variants.find((variant) => variant.stock === "In stock") || product.variants[0];
}

export function getVariantBundles(product, variantId) {
  if (!product?.bundles?.length) return [];
  return product.bundles.filter((bundle) => !bundle.variantId || bundle.variantId === variantId);
}

export const standards = [
  {
    id: "01",
    title: "Clear product information",
    body: "Strength, format, and stock status are stated at product level — before the order is placed, not after.",
  },
  {
    id: "02",
    title: "Batch documents on request",
    body: "Certificates of analysis and batch records are handled directly through the documentation channel.",
  },
  {
    id: "03",
    title: "Discreet dispatch",
    body: "Plain outer packaging, tracked delivery options, and a supply process that stays out of the way.",
  },
];

export const constants = [
  {
    id: "01",
    title: "Research supply",
    body: "Catalogue structured for laboratory and research purchasing clarity.",
  },
  {
    id: "02",
    title: "Tracked delivery",
    body: "Royal Mail Tracked 24hr listed at £8 across client menus. No minimum order.",
  },
  {
    id: "03",
    title: "Transparent options",
    body: "Variants, brands, and formats shown exactly as provided on the client menus.",
  },
];

export const faqs = [
  {
    q: "Is there a minimum order?",
    a: "Client menus state there is no minimum order.",
  },
  {
    q: "How much is delivery?",
    a: "Royal Mail Tracked 24hr is listed at £8 across the client menus.",
  },
  {
    q: "Are out-of-stock items shown?",
    a: "Yes. Out-of-stock variants remain visible with a clear Out of Stock state.",
  },
  {
    q: "Do products have multiple strengths?",
    a: "Where the menu lists multiple sizes or strengths, they appear as selectable variants on one product page.",
  },
];

export const processSteps = [
  {
    id: "01",
    title: "Select",
    body: "Browse the catalogue by product type and format.",
  },
  {
    id: "02",
    title: "Prepare",
    body: "Add the vials and essentials to your order.",
  },
  {
    id: "03",
    title: "Track",
    body: "Get dispatch updates, then verify batch and documentation when needed.",
  },
];

export const mockOrders = [
  {
    id: "PP-10428",
    date: "12 Sep 2026",
    status: "Dispatched",
    total: "£95.00",
    items: [
      { name: "D9 + Terps · 1g/1ml", qty: 1, price: "£45" },
      { name: "Retatrutide · 20mg", qty: 1, price: "£50" },
    ],
  },
  {
    id: "PP-10391",
    date: "28 Aug 2026",
    status: "Delivered",
    total: "£42.00",
    items: [
      { name: "Test E (Hulk Labs) · 300mg/ml", qty: 1, price: "£30" },
      { name: "12 Week Peptide Syringe Pack", qty: 1, price: "£12" },
    ],
  },
  {
    id: "PP-10255",
    date: "04 Aug 2026",
    status: "Delivered",
    total: "£55.00",
    items: [{ name: "Tirzepitide (Mounjaro) · 30mg", qty: 1, price: "£55" }],
  },
];

export const cartSeed = [
  { slug: "d9-terps", variantId: "1g-1ml", qty: 1 },
  { slug: "retatrutide-vial", variantId: "20mg", qty: 1 },
  { slug: "12-week-peptide-syringe-pack", variantId: "12-week-pack", qty: 1 },
];

export const mockAddresses = [
  {
    id: "addr-home",
    label: "Lab — Manchester",
    name: "Alex Researcher",
    line1: "14 Lab Lane",
    line2: "Suite 2",
    city: "Manchester",
    postcode: "M1 2AB",
    country: "United Kingdom",
    phone: "+44 7700 900123",
    primary: true,
  },
  {
    id: "addr-alt",
    label: "Secondary — London",
    name: "Alex Researcher",
    line1: "88 Research Yard",
    line2: "",
    city: "London",
    postcode: "E1 6AN",
    country: "United Kingdom",
    phone: "+44 7700 900123",
    primary: false,
  },
];

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All products" },
      { href: "/shop/peptides", label: "Peptides" },
      { href: "/shop/medications", label: "Medications" },
      { href: "/shop/thc", label: "THC" },
      { href: "/shop/ped", label: "PED" },
      { href: "/shop/accessories", label: "Accessories" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Login" },
      { href: "/register", label: "Register" },
      { href: "/account", label: "My account" },
      { href: "/account/orders", label: "My orders" },
      { href: "/cart", label: "Cart" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/about", label: "About us" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/shipping", label: "Shipping" },
      { href: "/returns", label: "Returns" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms & conditions" },
    ],
  },
];
