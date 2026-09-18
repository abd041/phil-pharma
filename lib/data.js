import { catalogueProducts, catalogueStats } from "./catalogue";
import { decorateProduct } from "./merchandising";

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
    slug: "oils",
    name: "Oils",
    href: "/shop/oils",
    blurb: "Injectable oils from Morph Labs, Hulk Labs, and Crown — all 10ml as listed on the client menu.",
    productCategory: "ped",
    productSubcategory: "oils",
    subcategories: [],
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

export const products = catalogueProducts.map(decorateProduct);
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

export function getShopCategoryProducts(slug) {
  const category = shopCategories.find((item) => item.slug === slug);
  if (!category) return [];
  if (category.productSubcategory) {
    return products.filter(
      (item) =>
        item.category === (category.productCategory || slug) &&
        item.subcategory === category.productSubcategory
    );
  }
  return products.filter((item) => item.category === slug);
}

export function getProductsBySubcategory(category, subcategory) {
  return products.filter(
    (item) => item.category === category && item.subcategory === subcategory
  );
}

export function searchProducts(query) {
  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (!terms.length) return [];
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
    return terms.every((term) => haystack.includes(term));
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

export const SHIPPING_FEE = 8;
export const SHIPPING_LABEL = "£8.00 Tracked 24hr";
export const LAST_ORDER_KEY = "pp-last-order";

export function hydrateCartLines(storedLines = []) {
  return storedLines
    .map((entry) => {
      const product = getProductBySlug(entry.slug);
      if (!product) return null;
      const variant =
        product.variants?.find((item) => item.id === entry.variantId) || getDefaultVariant(product);
      if (!variant) return null;
      return {
        key: `${product.slug}::${variant.id}`,
        slug: product.slug,
        variantId: variant.id,
        name: product.name,
        variantLabel: variant.label,
        tag: product.tag,
        image: product.image,
        imagePosition: product.imagePosition,
        price: variant.price,
        priceLabel: variant.priceLabel,
        qty: Math.max(1, Math.min(20, Number(entry.qty) || 1)),
        stock: variant.stock,
      };
    })
    .filter(Boolean);
}

export function cartTotals(lines = []) {
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  const shipping = lines.length ? SHIPPING_FEE : 0;
  return { subtotal, shipping, total: subtotal + shipping };
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
  {
    id: "04",
    title: "Documentation on request",
    body: "Batch records and certificates of analysis are handled through the documentation channel.",
  },
];

export const faqGroups = [
  {
    id: "orders",
    title: "Orders & catalogue",
    items: [
      {
        id: "minimum-order",
        q: "Is there a minimum order?",
        a: "No. Client menus state there is no minimum order. You can check out a single listed item.",
      },
      {
        id: "how-to-order",
        q: "How do I place an order?",
        a: "Open a product, choose the listed variant, add it to your bag, then complete checkout. Stock and format are shown on the product page before you pay.",
      },
      {
        id: "variants",
        q: "Do products have multiple strengths or sizes?",
        a: "Where the menu lists more than one strength, size, or pack, those options appear as selectable variants on one product page.",
      },
      {
        id: "out-of-stock",
        q: "Are out-of-stock items shown?",
        a: "Yes. Out-of-stock variants stay visible with a clear Out of stock state so the catalogue matches the client menus.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping & returns",
    items: [
      {
        id: "delivery-cost",
        q: "How much is delivery?",
        a: "Royal Mail Tracked 24hr is listed at £8 across the client menus. There is no extra threshold to unlock shipping.",
      },
      {
        id: "packaging",
        q: "How are orders packed?",
        a: "Outer cartons are plain, with no product branding. Inner contents stay labelled for laboratory identification.",
      },
      {
        id: "international",
        q: "Do you ship internationally?",
        a: "Worldwide dispatch may be available depending on destination rules. You are responsible for knowing local research-import restrictions.",
      },
      {
        id: "returns",
        q: "Can I return a product?",
        a: "Unopened research products may be considered within 14 days of delivery, subject to inspection. Opened vials and compromised cold-chain items are generally excluded.",
      },
    ],
  },
  {
    id: "research",
    title: "Research & documents",
    items: [
      {
        id: "research-use",
        q: "Are these products for human use?",
        a: "No. Everything is supplied for laboratory and research purposes only. Nothing is a medicine, supplement, or intended for human or veterinary consumption.",
      },
      {
        id: "medical-advice",
        q: "Do you provide medical advice?",
        a: "No. Product pages state research / informational use only. We do not diagnose, treat, or recommend personal use.",
      },
      {
        id: "documents",
        q: "Can I request batch documents?",
        a: "Certificates of analysis and batch records are handled on request through the documentation channel. Use Contact with the product name and order reference.",
      },
    ],
  },
  {
    id: "account",
    title: "Account",
    items: [
      {
        id: "need-account",
        q: "Do I need an account to check out?",
        a: "You can complete the checkout form in this browser without a live payment account. Registering lets you preview saved details and mock order history.",
      },
      {
        id: "order-history",
        q: "Where do I find past orders?",
        a: "Open Account, then Orders. Live order records will connect later; mock checkouts in this browser appear there for the session.",
      },
    ],
  },
];

export const faqs = faqGroups.flatMap((group) => group.items);

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
      { href: "/shop/oils", label: "Oils" },
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
