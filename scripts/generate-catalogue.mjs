/**
 * Generates lib/catalogue.js from the confirmed client menus.
 * Run: node scripts/generate-catalogue.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const IMAGES = {
  thc: ["/images/lifestyle-kit.jpeg", "/images/glutathione-box.jpeg", "/images/band-kit.jpg"],
  medications: [
    "/images/product-glutathione-v2.jpg",
    "/images/card-glutathione.jpg",
    "/images/product-glutathione.jpg",
    "/images/story-kit-vial.jpg",
  ],
  peptides: [
    "/images/product-hgh-v2.jpg",
    "/images/product-hgh-new.jpg",
    "/images/story-hgh.jpg",
    "/images/card-hgh.jpg",
    "/images/product-hgh.jpg",
    "/images/story-kit-new.jpg",
  ],
  ped: [
    "/images/product-pens-v2.jpg",
    "/images/product-pens-new.jpg",
    "/images/product-pens-fit.jpg",
    "/images/card-pens.jpg",
    "/images/pens.jpeg",
  ],
  accessories: ["/images/product-case-v2.jpg", "/images/product-case-new.jpg", "/images/band-kit.jpg"],
};

let imageCursor = { thc: 0, medications: 0, peptides: 0, ped: 0, accessories: 0 };

function nextImage(category) {
  const list = IMAGES[category] || IMAGES.peptides;
  const i = imageCursor[category] % list.length;
  imageCursor[category] += 1;
  return list[i];
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[+/]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function money(n) {
  return `£${n}`;
}

function variant(label, price, extra = {}) {
  return {
    id: slugify(label),
    label,
    strength: extra.strength ?? label,
    size: extra.size ?? "",
    packSize: extra.packSize ?? "",
    format: extra.format ?? "",
    price,
    priceLabel: money(price),
    stock: extra.stock ?? "In stock",
  };
}

function product(cfg) {
  const variants = cfg.variants.map((v) => ({
    ...v,
    priceLabel: v.priceLabel || money(v.price),
    stock: v.stock || "In stock",
  }));
  const prices = variants.map((v) => v.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const allOos = variants.every((v) => v.stock === "Out of stock");
  const anyIn = variants.some((v) => v.stock === "In stock");
  const stock = allOos ? "Out of stock" : anyIn ? "In stock" : "Out of stock";
  const priceLabel = variants.length > 1 && min !== max ? `From ${money(min)}` : money(min);
  const brand = cfg.brand || "";
  const format = cfg.format || "";
  const description =
    cfg.description ||
    [cfg.name, brand, format, cfg.subcategoryLabel].filter(Boolean).join(" · ");

  const specs = [];
  if (brand) specs.push({ label: "Brand", value: brand });
  if (format) specs.push({ label: "Format", value: format });
  if (cfg.subcategoryLabel) specs.push({ label: "Section", value: cfg.subcategoryLabel });
  specs.push({ label: "Options", value: String(variants.length) });
  if (cfg.notes) specs.push({ label: "Note", value: cfg.notes });

  return {
    id: cfg.id,
    slug: cfg.slug || cfg.id,
    name: cfg.name,
    category: cfg.category,
    subcategory: cfg.subcategory,
    subcategoryLabel: cfg.subcategoryLabel || "",
    tag: cfg.tag || cfg.subcategoryLabel || cfg.category,
    brand,
    format,
    badge: cfg.badge || (allOos ? "Out of stock" : cfg.hasBundle ? "Deal" : ""),
    description,
    longDescription:
      cfg.longDescription ||
      `${description}. Details shown exactly as listed on the Phil's Pharma client menu.`,
    notes: cfg.notes || "",
    rating: "4.8",
    reviews: String(12 + (cfg.id.length % 80)),
    price: min,
    priceLabel,
    stock,
    image: cfg.image || nextImage(cfg.category),
    imagePosition: cfg.imagePosition || "center center",
    variants,
    bundles: cfg.bundles || [],
    specs,
    hasBundle: Boolean(cfg.bundles?.length),
  };
}

const products = [];

// ——— THC ———
products.push(
  product({
    id: "d9-terps",
    name: "D9 + Terps",
    category: "thc",
    subcategory: "pods",
    subcategoryLabel: "Pods",
    tag: "THC",
    format: "Pod only",
    hasBundle: true,
    image: "/images/d9-terps-v2.png",
    notes: "All vapes come with a battery on your first purchase.",
    longDescription:
      "D9 + Terps pod options as listed on the THC menu. Pod only. All vapes come with a battery on your first purchase. How to use: 1 click battery check · 2 clicks pre-heat · 5 clicks on/off · hold to change voltage.",
    variants: [
      variant("1g/1ml", 45, { strength: "1g/1ml", format: "Pod only" }),
      variant("2ml/2g", 80, { strength: "2ml/2g", format: "Pod only" }),
    ],
    bundles: [
      {
        id: "d9-1g-2x",
        variantId: "1g-1ml",
        label: "2× pods",
        unitPrice: 40,
        unitPriceLabel: "£40 each",
        note: "2x Pods for £40 each",
      },
      {
        id: "d9-2ml-2x",
        variantId: "2ml-2g",
        label: "2× pods",
        unitPrice: 75,
        unitPriceLabel: "£75 each",
        note: "2x Pods for £75 each",
      },
    ],
  })
);

// ——— Accessories ———
products.push(
  product({
    id: "battery",
    name: "Battery",
    category: "accessories",
    subcategory: "devices",
    subcategoryLabel: "Devices",
    tag: "Accessories",
    format: "Battery",
    image: "/images/battery-v2.png",
    notes: "Listed on THC menu at £5. All vapes come with a battery on your first purchase.",
    variants: [variant("Battery", 5, { format: "Battery" })],
  })
);

products.push(
  product({
    id: "12-week-peptide-syringe-pack",
    name: "12 Week Peptide Syringe Pack",
    category: "accessories",
    subcategory: "syringes",
    subcategoryLabel: "Syringes",
    tag: "Accessories",
    format: "Accessory pack",
    image: "/images/12-week-peptide-syringe-pack-v2.png",
    description: "12 × 21G needles · 12 × 30G needles · 12 × 1ml dead-space syringes",
    longDescription:
      "12 Week Peptide Syringe Pack. Includes 12 × 21G needles, 12 × 30G needles, and 12 × 1ml dead-space syringes.",
    variants: [
      variant("12 week pack", 12, {
        packSize: "12 × 21G · 12 × 30G · 12 × 1ml syringes",
        format: "Accessory pack",
      }),
    ],
  })
);

// ——— Medications · Standard ———
const standardMeds = [
  ["diazepam-msj-loose", "Diazepam MSJ (loose)", "", [["10mg x 10", 10]]],
  ["accutane", "Accutane", "", [["20mg × 10", 8]]],
  ["modafinil", "Modafinil", "", [["200mg × 10", 8]]],
  [
    "modasafe",
    "Modasafe",
    "",
    [["200mg + 50mg x 10", 10]],
    "Modafinil/Armodafinil",
  ],
  ["armodafinil", "Armodafinil", "", [["250mg x 10", 12]]],
  ["caber", "Caber", "", [["1mg x 4", 7]]],
  ["raloxifene", "Raloxifene", "", [["60mg x 10", 9]]],
  ["telmisartan", "Telmisartan", "", [["40mg × 10", 9]]],
  ["minoxidil", "Minoxidil", "", [["10mg × 10", 8]]],
  ["pregabalin", "Pregabalin", "", [["300mg × 10", 9]]],
  [
    "zopiclone",
    "Zopiclone",
    "",
    [
      ["10mg × 14", 8],
      ["20mg × 10", 9],
    ],
  ],
  [
    "amoxicillin",
    "Amoxicillin",
    "",
    [
      ["250mg × 15", 8],
      ["500mg × 15", 9],
    ],
  ],
  ["viagra", "Viagra", "", [["100mg × 10", 8]]],
  [
    "cialis",
    "Cialis",
    "",
    [
      ["20mg × 10", 9],
      ["5mg × 10", 8],
    ],
  ],
  ["cialis-depoxatine", "Cialis + Depoxatine", "", [["40mg + 60mg x 10", 12]]],
  ["propranolol", "Propranolol", "", [["40mg x 10", 8]]],
  ["arimidex", "Arimidex", "", [["1mg × 10", 8]]],
  ["tamoxifen", "Tamoxifen", "", [["10mg × 10", 8]]],
  ["ezetimibe", "Ezetimibe", "", [["10mg × 10", 8]]],
  ["nebivolol", "Nebivolol", "", [["5mg × 10", 8]]],
  ["finasteride", "Finasteride", "", [["1mg × 10", 8]]],
  ["dutasteride", "Dutasteride", "", [["0.5mg × 10", 8]]],
  ["promethazine", "Promethazine", "", [["10mg × 10", 8]]],
  [
    "diazepam-kern-fake",
    "Diazepam kern (fake)",
    "",
    [["10mg x 30", 20, { stock: "Out of stock" }]],
  ],
  ["tramadol-x-fake", "Tramadol X (fake)", "", [["100mg x 10", 20]]],
  [
    "b12",
    "B12",
    "",
    [
      ["30ml vial", 30, { format: "Vial" }],
      ["Injection (5 amps)", 15, { format: "Injection", packSize: "5 amps" }],
      ["Injection (10 amps)", 25, { format: "Injection", packSize: "10 amps" }],
      ["Injection Box (50 amps)", 100, { format: "Injection box", packSize: "50 amps" }],
    ],
  ],
];

const customMedicationImages = {
  "diazepam-msj-loose": "/images/diazepam-msj.png",
  "accutane": "/images/accutane-v4.png",
  "modafinil": "/images/modafinil-v4.png",
  "modasafe": "/images/modasafe-v4.png",
  "armodafinil": "/images/armodafinil-v4.png",
  "caber": "/images/caber-v4.png",
  "raloxifene": "/images/raloxifene-v4.png",
  "telmisartan": "/images/telmisartan-v4.png",
  "minoxidil": "/images/minoxidil-v6.png",
  "pregabalin": "/images/pregabalin-v6.png",
  "zopiclone": "/images/zopiclone-v6.png",
  "amoxicillin": "/images/amoxicillin-v6.png",
  "viagra": "/images/viagra-v2.png",
  "cialis": "/images/cialis-v2.png",
  "cialis-depoxatine": "/images/cialis-depoxatine-v2.png",
  "propranolol": "/images/propranolol-v2.png",
  "arimidex": "/images/arimidex-v3.png",
  "tamoxifen": "/images/tamoxifen-v2.png",
  "ezetimibe": "/images/ezetimibe-v2.png",
  "nebivolol": "/images/nebivolol-v2.png",
  "finasteride": "/images/finasteride-v2.png",
  "dutasteride": "/images/dutasteride-v2.png",
  "promethazine": "/images/promethazine-v2.png",
  "diazepam-kern-fake": "/images/diazepam-kern-fake-v2.png",
  "b12": "/images/b12-v4.png",
  "tramadol-x-fake": "/images/tramadol-x-fake-v2.png",
  "tramadol-hydrochloride-tillomed": "/images/tramadol-hydrochloride-tillomed-v3.png",
  "tramadol-hci-sr-tanpal": "/images/tramadol-hci-sr-tanpal-v2.png",
  "codeine-phosphate-wockhardt": "/images/codeine-phosphate-wockhardt-v2.png",
  "codeine-phosphate-almus": "/images/codeine-phosphate-almus-v2.png",
  "dihydrocodeine-accord": "/images/dihydrocodeine-accord-v3.png",
  "dihydrocodeine-almus": "/images/dihydrocodeine-almus-v2.png",
  "chlorpheniramine-codeine-lyka": "/images/chlorpheniramine-codeine-lyka-v2.png",
  "diazepam-bensedin-galenika": "/images/diazepam-bensedin-galenika-v2.png",
  "diazepam-replek": "/images/diazepam-replek-v2.png",
  "alprazolem-alprx-neuro-vision": "/images/alprazolem-alprx-neuro-vision-v2.png",
  "trentinoin-cream": "/images/trentinoin-cream-v2.png",
  "azelaic-acid-cream": "/images/azelaic-acid-cream-v3.png",
};

for (const row of standardMeds) {
  const [id, name, brand, variants, note] = row;
  products.push(
    product({
      id,
      name,
      brand,
      category: "medications",
      subcategory: "standard",
      subcategoryLabel: "Standard Medications",
      tag: "Standard",
      format: "Medication",
      notes: note || "",
      image: customMedicationImages[id],
      variants: variants.map(([label, price, extra]) => variant(label, price, extra)),
    })
  );
}

// ——— Medications · Special ———
const specialMeds = [
  ["tramadol-hydrochloride-tillomed", "Tramadol Hydrochloride (Tillomed)", "Tillomed", [["50mg x 10", 25]]],
  ["tramadol-hci-sr-tanpal", "Tramadol HCI-SR (Tanpal)", "Tanpal", [["100mg x 10", 30]]],
  ["codeine-phosphate-wockhardt", "Codeine Phosphate (Wockhardt)", "Wockhardt", [["15mg x 28", 35]]],
  ["codeine-phosphate-almus", "Codeine Phosphate (Almus)", "Almus", [["30 x 28", 60]]],
  ["dihydrocodeine-accord", "Dihydrocodeine (Accord)", "Accord", [["30mg x 28", 60]]],
  ["dihydrocodeine-almus", "Dihydrocodeine (Almus)", "Almus", [["30mg x 100", 145]]],
  [
    "chlorpheniramine-codeine-lyka",
    "Chlorpheniramine maleate & Codeine Phosphate (Lyka)",
    "Lyka",
    [["100ml/bottle", 50, { format: "Bottle" }]],
  ],
  ["diazepam-bensedin-galenika", "Diazepam/bensedin (Galenika)", "Galenika", [["10mg x 30", 55]]],
  ["diazepam-replek", "Diazepam (Replek)", "Replek", [["10mg x 30", 55]]],
  ["alprazolem-alprx-neuro-vision", "Alprazolem ALPRX (Neuro-Vision)", "Neuro-Vision", [["1mg x 30", 50]]],
];

for (const [id, name, brand, variants] of specialMeds) {
  products.push(
    product({
      id,
      name,
      brand,
      category: "medications",
      subcategory: "special",
      subcategoryLabel: "Special Medications",
      tag: "Special",
      format: "Medication",
      image: customMedicationImages[id],
      variants: variants.map(([label, price, extra]) => variant(label, price, { ...extra, format: extra?.format || "Medication" })),
    })
  );
}

// ——— Prescription Creams ———
products.push(
  product({
    id: "trentinoin-cream",
    name: "Trentinoin cream",
    category: "medications",
    subcategory: "creams",
    subcategoryLabel: "Prescription Creams",
    tag: "Creams",
    format: "Cream",
    hasBundle: true,
    image: customMedicationImages["trentinoin-cream"],
    variants: [
      variant("0.1%", 10, { strength: "0.1%", format: "Cream" }),
      variant("0.05%", 10, { strength: "0.05%", format: "Cream" }),
      variant("0.025%", 10, { strength: "0.025%", format: "Cream" }),
    ],
    bundles: [
      {
        id: "trentinoin-3-for-25",
        label: "3 for £25",
        unitPrice: null,
        dealPrice: 25,
        dealPriceLabel: "£25",
        note: "3 for £25",
        appliesTo: "trentinoin-cream",
      },
    ],
  })
);

products.push(
  product({
    id: "azelaic-acid-cream",
    name: "Azelaic acid cream 20% w/w",
    category: "medications",
    subcategory: "creams",
    subcategoryLabel: "Prescription Creams",
    tag: "Creams",
    format: "Cream",
    image: customMedicationImages["azelaic-acid-cream"],
    variants: [variant("20% w/w", 10, { strength: "20% w/w", format: "Cream" })],
  })
);

// ——— Peptides · Vials ———
const peptideVials = [
  [
    "retatrutide-vial",
    "Retatrutide",
    [
      ["20mg", 50],
      ["30mg", 70],
      ["40mg", 85],
      ["60mg", 110],
    ],
  ],
  [
    "tirzepitide-mounjaro-vial",
    "Tirzepitide (Mounjaro)",
    [
      ["30mg", 55],
      ["40mg", 70],
      ["60mg", 95],
    ],
  ],
  ["semaglutide-ozempic-vial", "Semaglutide (Ozempic)", [["10mg", 45]]],
  ["cagrilintide-vial", "Cagrilintide", [["10mg", 70]]],
  ["ss-31-vial", "Ss-31", [["10mg", 35]]],
  ["hgh-eurotropin-vial", "HGH (eurotropin)", [["45iu/3x15iu", 75]]],
  ["hgh-vial", "HGH", [["120iu/10x12iu", 145]]],
  [
    "epithalon-vial",
    "Epithalon",
    [
      ["10mg", 30],
      ["50mg", 55],
    ],
  ],
  ["glow-vial", "GLOW", [["70mg", 50]]],
  ["klow-vial", "KLOW", [["80mg", 70]]],
  ["ahk-cu-vial", "AHK-CU", [["100mg", 35]]],
  ["lemon-bottle-vial", "Lemon bottle", [["10ml", 25]]],
  ["hmg-vial", "HMG", [["75iu", 35]]],
  [
    "hcg-vial",
    "HCG",
    [
      ["5000iu", 30],
      ["10000iu", 55],
    ],
  ],
  ["5-amino-acid-1mq-vial", "5-Amino acid 1MQ", [["Standard", 50]]],
  ["mk677-vial", "MK677", [["10mg", 30]]],
  ["nad-plus-vial", "NAD+", [["1000mg", 35]]],
  ["slupp332-vial", "Slupp332", [["10mg", 30]]],
  ["tesamorelin-vial", "Tesamorelin", [["10mg", 30]]],
  ["igf-1-vial", "IGF-1", [["1mg", 35]]],
  ["kpv-vial", "KPV", [["10mg", 30]]],
  [
    "bpc-157-vial",
    "BPC-157",
    [
      ["10mg", 30],
      ["20mg", 50],
    ],
  ],
  [
    "tb-500-vial",
    "TB-500",
    [
      ["10mg", 30],
      ["20mg", 50],
    ],
  ],
  [
    "mot-c-vial",
    "MOT-C",
    [
      ["10mg", 30, { stock: "Out of stock" }],
      ["40mg", 55],
    ],
  ],
  ["d-sip-vial", "D-sip", [["10mg", 30]]],
  ["ipamorelin-vial", "Ipamorelin", [["10mg", 30]]],
  ["pt-141-vial", "Pt-141", [["10mg", 25]]],
  ["cjc-1259-dac-vial", "CJC-1259 + DAC", [["10mg", 25]]],
  ["cjc-1259-wo-dac-vial", "CJC-1259 W/O DAC", [["10mg", 20]]],
  ["mt1-vial", "MT1", [["10mg", 25]]],
  ["mt2-vial", "MT2", [["10mg", 25]]],
  ["ghk-vial", "GHK", [["100mg", 30]]],
  ["selank-vial", "SELANK", [["10mg", 25]]],
  ["semax-vial", "SEMAX", [["10mg", 25]]],
  ["5-amino-acid-vial", "5-AMINO ACID", [["10mg", 25]]],
  ["bac-water-vial", "BAC WATER", [["10ml", 5]]],
];

const customVialImages = {
  "retatrutide-vial": "/images/product-retatrutide-vial.png",
  "tirzepitide-mounjaro-vial": "/images/product-tirzepitide-vial.png",
  "semaglutide-ozempic-vial": "/images/product-semaglutide-vial.png",
  "cagrilintide-vial": "/images/product-cagrilintide-vial.png",
  "ss-31-vial": "/images/product-ss-31-vial.png",
  "hgh-eurotropin-vial": "/images/product-hgh-eurotropin-vial.png",
  "hgh-vial": "/images/product-hgh-120iu-vial.png",
  "epithalon-vial": "/images/product-epithalon-vial.png",
  "glow-vial": "/images/product-glow-vial.png",
  "klow-vial": "/images/product-klow-vial.png",
  "ahk-cu-vial": "/images/product-ahk-cu-vial.png",
  "lemon-bottle-vial": "/images/product-lemon-bottle-vial.png",
  "hmg-vial": "/images/product-hmg-vial.png",
  "hcg-vial": "/images/product-hcg-vial.png",
  "5-amino-acid-1mq-vial": "/images/product-5-amino-acid-1mq-vial.png",
  "mk677-vial": "/images/product-mk677-vial.png",
  "nad-plus-vial": "/images/product-nad-plus-vial.png",
  "slupp332-vial": "/images/product-slupp332-vial.png",
  "tesamorelin-vial": "/images/product-tesamorelin-vial.png",
  "igf-1-vial": "/images/product-igf-1-vial.png",
  "kpv-vial": "/images/product-kpv-vial.png",
  "bpc-157-vial": "/images/product-bpc-157-vial.png",
  "tb-500-vial": "/images/product-tb-500-vial.png",
  "mot-c-vial": "/images/product-mot-c-vial.png",
  "d-sip-vial": "/images/product-d-sip-vial.png",
  "ipamorelin-vial": "/images/product-ipamorelin-vial.png",
  "pt-141-vial": "/images/product-pt-141-vial.png",
  "cjc-1259-dac-vial": "/images/product-cjc-1259-dac-vial.png",
  "cjc-1259-wo-dac-vial": "/images/product-cjc-1259-wo-dac-vial.png",
  "mt1-vial": "/images/product-mt1-vial.png",
  "mt2-vial": "/images/product-mt2-vial.png",
  "ghk-vial": "/images/product-ghk-vial.png",
  "selank-vial": "/images/product-selank-vial.png",
  "semax-vial": "/images/product-semax-vial.png",
  "5-amino-acid-vial": "/images/product-5-amino-acid-vial.png",
  "bac-water-vial": "/images/product-bac-water-vial.png",
};

for (const [id, name, variants] of peptideVials) {
  products.push(
    product({
      id,
      name,
      category: "peptides",
      subcategory: "vials",
      subcategoryLabel: "Peptide Vials",
      tag: "Vials",
      format: "Vial",
      image: customVialImages[id],
      variants: variants.map(([label, price, extra]) =>
        variant(label, price, { strength: label, format: "Vial", ...extra })
      ),
    })
  );
}

// ——— Peptides · Pens ———
const peptidePens = [
  [
    "retatrutide-pen",
    "Retatrutide",
    [
      ["40mg", 130],
      ["30mg", 110],
    ],
  ],
  [
    "tirzepitide-pen",
    "Tirzepitide",
    [
      ["40mg", 120],
      ["30mg", 99, { stock: "Out of stock" }],
    ],
  ],
  ["ghk-pen", "GHK", [["100mg", 65]]],
  ["bpc-157-pen", "BPC-157", [["20mg", 70]]],
  ["tb-500-pen", "TB-500", [["20mg", 70]]],
];

const customPenImages = {
  "retatrutide-pen": "/images/retatrutide-ready-pen-v2.png",
  "tirzepitide-pen": "/images/tirzepatide-ready-pen-v2.png",
  "ghk-pen": "/images/ghk-ready-pen-v2.png",
  "bpc-157-pen": "/images/bpc-157-ready-pen-v2.png",
  "tb-500-pen": "/images/tb-500-ready-pen-v2.png",
};

for (const [id, name, variants] of peptidePens) {
  products.push(
    product({
      id,
      name,
      category: "peptides",
      subcategory: "pens",
      subcategoryLabel: "Ready to Use Pens",
      tag: "Pens",
      format: "Ready to use pen",
      description: `${name} · Ready to Use Pen`,
      image: customPenImages[id],
      variants: variants.map(([label, price, extra]) =>
        variant(label, price, { strength: label, format: "Ready to use pen", ...extra })
      ),
    })
  );
}

// ——— Peptides · Nasals ———
const peptideNasals = [
  ["mt2-nasal", "MT2", [["20mg", 30]]],
  ["mt1-nasal", "MT1", [["20mg", 30]]],
  ["bpc-157-nasal", "BPC-157", [["10mg", 30]]],
  ["tb-500-nasal", "TB-500", [["10mg", 30]]],
  ["pt-141-nasal", "PT-141", [["10mg", 30]]],
  ["selank-nasal", "SELANK", [["10mg", 30]]],
  ["semax-nasal", "SEMAX", [["10mg", 30]]],
];

const customNasalImages = {
  "mt2-nasal": "/images/mt2-nasal.png",
  "mt1-nasal": "/images/mt1-nasal.png",
  "bpc-157-nasal": "/images/bpc-157-nasal.png",
  "tb-500-nasal": "/images/tb-500-nasal.png",
  "pt-141-nasal": "/images/pt-141-nasal.png",
  "selank-nasal": "/images/selank-nasal.png",
  "semax-nasal": "/images/semax-nasal.png",
};

for (const [id, name, variants] of peptideNasals) {
  products.push(
    product({
      id,
      name,
      category: "peptides",
      subcategory: "nasals",
      subcategoryLabel: "Peptide Nasals",
      tag: "Nasals",
      format: "Nasal",
      description: `${name} · Peptide nasal`,
      image: customNasalImages[id],
      variants: variants.map(([label, price]) =>
        variant(label, price, { strength: label, format: "Nasal" })
      ),
    })
  );
}

// ——— PED · Oils ———
const customOilImages = {
  "test-e-hulk-oil": "/images/test-e-hulk-oil-v2.png",
  "test-c-morph-oil": "/images/test-c-morph-oil-v2.png",
  "test-p-morph-oil": "/images/test-p-morph-oil-v2.png",
  "npp-morph-oil": "/images/npp-morph-oil-v2.png",
  "deca-morph-oil": "/images/deca-morph-oil-v2.png",
  "tren-a-morph-oil": "/images/tren-a-morph-oil-v2.png",
  "tren-e-morph-oil": "/images/tren-e-morph-oil-v2.png",
  "eq-morph-oil": "/images/eq-morph-oil-v2.png",
  "mast-p-morph-oil": "/images/mast-p-morph-oil-v2.png",
  "superdrol-morph-oil": "/images/superdrol-morph-oil-v2.png",
  "anadrol-morph-oil": "/images/anadrol-morph-oil-v2.png",
  "dbol-morph-oil": "/images/dbol-morph-oil-v2.png",
  "primo-crown-oil": "/images/primo-crown-oil-v2.png",
};

const pedOils = [
  ["test-e-hulk-oil", "Test E (Hulk Labs)", "Hulk Labs", [["300mg/ml", 30]]],
  ["test-c-morph-oil", "TEST C (Morph Labs)", "Morph Labs", [["200mg/ml", 30]]],
  ["test-p-morph-oil", "Test P (Morph Labs)", "Morph Labs", [["100mg/ml", 27]]],
  ["npp-morph-oil", "NPP (Morph Labs)", "Morph Labs", [["150mg/ml", 30]]],
  ["deca-morph-oil", "DECA (Morph Labs)", "Morph Labs", [["300mg/ml", 35]]],
  ["tren-a-morph-oil", "Tren A (Morph Labs)", "Morph Labs", [["100mg/ml", 33]]],
  ["tren-e-morph-oil", "Tren E (Morph Labs)", "Morph Labs", [["200mg/ml", 35]]],
  ["eq-morph-oil", "EQ (Morph Labs)", "Morph Labs", [["400mg/ml", 35]]],
  ["mast-p-morph-oil", "Mast P (Morph Labs)", "Morph Labs", [["150mg/ml", 40]]],
  ["superdrol-morph-oil", "Superdrol (Morph Labs)", "Morph Labs", [["20mg/ml", 25]]],
  ["anadrol-morph-oil", "Anadrol (Morph Labs)", "Morph Labs", [["30mg/ml", 25]]],
  ["dbol-morph-oil", "Dbol (Morph Labs)", "Morph Labs", [["50mg/ml", 25]]],
  ["primo-crown-oil", "Primo (Crown)", "Crown", [["150mg/ml", 75]]],
];

for (const [id, name, brand, variants] of pedOils) {
  products.push(
    product({
      id,
      name,
      brand,
      category: "ped",
      subcategory: "oils",
      subcategoryLabel: "Oils",
      tag: "Oils",
      format: "Oil · 10ml",
      notes: "All oils are 10ml — Morph Labs / Hulk Labs / Crown",
      image: customOilImages[id],
      variants: variants.map(([label, price]) =>
        variant(label, price, { strength: label, size: "10ml", format: "Oil" })
      ),
    })
  );
}

// ——— PED · Orals ———
const customOralImages = {
  "anavar-crown-oral": "/images/anavar-crown-oral-v3.png",
  "tbol-crown-oral": "/images/tbol-crown-oral-v2.png",
};

products.push(
  product({
    id: "anavar-crown-oral",
    name: "Anavar (crown)",
    brand: "Crown",
    category: "ped",
    subcategory: "orals",
    subcategoryLabel: "Orals",
    tag: "Orals",
    format: "Oral",
    image: customOralImages["anavar-crown-oral"],
    variants: [
      variant("20mg x 50", 30, { strength: "20mg", packSize: "x 50", format: "Oral" }),
      variant("50mg x 50", 55, { strength: "50mg", packSize: "x 50", format: "Oral" }),
    ],
  })
);

products.push(
  product({
    id: "tbol-crown-oral",
    name: "Tbol (crown)",
    brand: "Crown",
    category: "ped",
    subcategory: "orals",
    subcategoryLabel: "Orals",
    tag: "Orals",
    format: "Oral",
    image: customOralImages["tbol-crown-oral"],
    variants: [variant("20mg x 50", 35, { strength: "20mg", packSize: "x 50", format: "Oral" })],
  })
);

// ——— PED · Ready Pens ———
const customPedPenImages = {
  "test-e-pen": "/images/test-e-pen-v3.png",
  "npp-pen": "/images/npp-pen-v2.png",
  "deca-pen": "/images/deca-pen-v3.png",
  "tren-a-pen": "/images/tren-a-pen-v2.png",
  "tren-e-pen": "/images/tren-e-pen-v2.png",
  "eq-pen": "/images/eq-pen-v2.png",
  "mast-p-pen": "/images/mast-p-pen-v2.png",
};

const pedPens = [
  ["test-e-pen", "Test E", [["900mg/3ml", 40]]],
  ["npp-pen", "NPP", [["450mg/3ml", 40]]],
  ["deca-pen", "DECA", [["900mg/3ml", 45]]],
  ["tren-a-pen", "Tren A", [["300mg/3ml", 45]]],
  ["tren-e-pen", "Tren E", [["600mg/3ml", 45]]],
  ["eq-pen", "EQ", [["1200mg/3ml", 45]]],
  ["mast-p-pen", "Mast P", [["450mg/3ml", 50]]],
];

for (const [id, name, variants] of pedPens) {
  products.push(
    product({
      id,
      name,
      category: "ped",
      subcategory: "pens",
      subcategoryLabel: "Ready to Use Pens",
      tag: "Pens",
      format: "Ready to use pen",
      description: `${name} · Ready to Use Pen`,
      image: customPedPenImages[id],
      variants: variants.map(([label, price]) =>
        variant(label, price, { strength: label, format: "Ready to use pen" })
      ),
    })
  );
}

const parentCount = products.length;
const skuCount = products.reduce((sum, p) => sum + p.variants.length, 0);
const oos = products.flatMap((p) =>
  p.variants.filter((v) => v.stock === "Out of stock").map((v) => `${p.name} · ${v.label}`)
);
const bundles = products.filter((p) => p.bundles?.length).map((p) => p.name);

const byCat = {};
for (const p of products) {
  byCat[p.category] = byCat[p.category] || { parents: 0, skus: 0 };
  byCat[p.category].parents += 1;
  byCat[p.category].skus += p.variants.length;
}

const file = `/* Auto-generated from client menus — do not hand-edit product rows.
 * Generated by scripts/generate-catalogue.mjs
 * Parents: ${parentCount} · SKUs: ${skuCount}
 */
export const catalogueProducts = ${JSON.stringify(products, null, 2)};

export const catalogueStats = ${JSON.stringify({ parentCount, skuCount, byCat, oos, bundles }, null, 2)};
`;

const out = path.join(__dirname, "..", "lib", "catalogue.js");
fs.writeFileSync(out, file);
console.log(JSON.stringify({ parentCount, skuCount, byCat, oos, bundles }, null, 2));
