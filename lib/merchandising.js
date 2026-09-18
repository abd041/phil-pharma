export const productOverlays = {
  battery: {
    name: "510 Thread Battery",
    description: "510-thread battery with USB-C charging. Included with your first vape.",
    longDescription:
      "510-thread battery with variable voltage (3.3–4.8V) and USB-C charging. Fits listed 510 cartridges. £5 on the THC menu — included with your first vape purchase.",
    priceLabel: "£5",
    offerChip: "Included with first vape",
    imagePosition: "center center",
    specs: [
      { label: "Thread", value: "510" },
      { label: "Voltage", value: "3.3–4.8V" },
      { label: "Charging", value: "USB-C" },
      { label: "Compatibility", value: "Fits 510 cartridges" },
    ],
    variants: [
      {
        id: "battery",
        label: "510 thread",
        strength: "510",
        size: "",
        packSize: "",
        format: "Battery",
        price: 5,
        priceLabel: "£5",
        stock: "In stock",
      },
    ],
    inTheBox: ["510 thread battery", "USB-C charging cable"],
    howTo: [
      { step: "1 click", label: "Battery check" },
      { step: "2 clicks", label: "Pre-heat" },
      { step: "5 clicks", label: "On / off" },
      { step: "Hold", label: "Change voltage" },
    ],
    highlights: [
      { icon: "bolt", title: "Variable voltage", body: "3.3 – 4.8V" },
      { icon: "usb", title: "USB-C", body: "Fast charging" },
      { icon: "shield", title: "Universal compatibility", body: "Fits 510 cartridges" },
      { icon: "gem", title: "Premium build", body: "Research grade" },
    ],
    pairsWith: ["d9-terps"],
    relatedCategory: "thc",
  },
};

export function decorateProduct(product) {
  const overlay = productOverlays[product.id];
  if (!overlay) return product;
  const { pairsWith, relatedCategory, ...fields } = overlay;
  return {
    ...product,
    ...fields,
    pairsWith: pairsWith || product.pairsWith,
    relatedCategory: relatedCategory || product.relatedCategory,
  };
}

export function visibleSpecs(product, variant, { singleVariant = false } = {}) {
  const specs = [...(product.specs || [])];
  if (!singleVariant && variant?.label) {
    specs.push({ label: "Selected", value: variant.label });
  }

  return specs.filter((spec) => {
    const label = String(spec.label || "").toLowerCase();
    const value = String(spec.value || "").trim();
    if (!value) return false;
    if (label === "options" && value === "1") return false;
    if (label === "note") return false;
    if (label === "format" && value.toLowerCase() === String(product.name || "").toLowerCase()) {
      return false;
    }
    if (label === "selected" && singleVariant) return false;
    return true;
  });
}

export function getRelatedProducts(product, catalogue = []) {
  const pairedIds = product.pairsWith || productOverlays[product.id]?.pairsWith || [];
  const paired = pairedIds
    .map((id) => catalogue.find((item) => item.id === id || item.slug === id))
    .filter(Boolean);

  const relatedCategory =
    product.relatedCategory || productOverlays[product.id]?.relatedCategory || product.category;

  const rest = catalogue.filter((item) => {
    if (item.id === product.id) return false;
    if (paired.some((entry) => entry.id === item.id)) return false;
    if (product.subcategory === "oils") return item.subcategory === "oils";
    return item.category === relatedCategory;
  });

  return [...paired, ...rest].slice(0, 4);
}
