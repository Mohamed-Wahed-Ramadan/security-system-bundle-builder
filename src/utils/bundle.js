import seedData from "../data/bundleData.json";
import { DEFAULT_VARIANT_ID } from "../constants/bundle";

export function cloneSeedData() {
  return JSON.parse(JSON.stringify(seedData));
}

export function buildInitialActiveVariants(products) {
  return products.reduce((accumulator, product) => {
    accumulator[product.id] = product.defaultVariant;
    return accumulator;
  }, {});
}

export function getTotalQuantity(product) {
  return Object.values(product.quantities).reduce((sum, quantity) => sum + (quantity || 0), 0);
}

export function getSelectedCount(data, totalQtyForProduct) {
  const counts = {};

  data.products.forEach((product) => {
    counts[product.category] = (counts[product.category] || 0) + (totalQtyForProduct(product) > 0 ? 1 : 0);
  });

  counts.plan = data.plans.some((plan) => plan.selected) ? 1 : 0;
  return counts;
}

export function buildReviewLines(data) {
  const groups = {};

  data.products.forEach((product) => {
    const entries = Object.entries(product.quantities).filter(([, quantity]) => quantity > 0);
    if (entries.length === 0) return;

    const group = product.reviewGroup;
    if (!groups[group]) groups[group] = [];

    entries.forEach(([variantId, quantity]) => {
      const variant = product.variants.find((item) => item.id === variantId);
      const showVariantLabel = entries.length > 1 && variant;
      groups[group].push({
        key: `${product.id}:${variantId}`,
        productId: product.id,
        variantId,
        name: showVariantLabel ? `${product.name} — ${variant.label}` : product.name,
        shape: product.shape,
        qty: quantity,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        lineTotal: product.price * quantity,
        locked: !!product.locked,
      });
    });
  });

  data.plans
    .filter((plan) => plan.selected)
    .forEach((plan) => {
      const group = plan.reviewGroup;
      if (!groups[group]) groups[group] = [];
      groups[group].push({
        key: plan.id,
        name: plan.name,
        shape: "plan",
        qty: 1,
        price: plan.price,
        compareAtPrice: plan.compareAtPrice,
        billingSuffix: plan.billingSuffix,
        lineTotal: plan.price,
        isPlan: true,
      });
    });

  return groups;
}

export function calculateTotals(data, totalQtyForProduct) {
  let price = 0;
  let compareAt = 0;

  data.products.forEach((product) => {
    const quantity = totalQtyForProduct(product);
    price += product.price * quantity;
    compareAt += (product.compareAtPrice ?? product.price) * quantity;
  });

  data.plans
    .filter((plan) => plan.selected)
    .forEach((plan) => {
      price += plan.price;
      compareAt += plan.compareAtPrice ?? plan.price;
    });

  return {
    price,
    compareAt,
    savings: Math.max(0, compareAt - price),
  };
}

export function getProductVariantId(product, activeVariantId) {
  return product.variants.length > 0 ? activeVariantId : DEFAULT_VARIANT_ID;
}
