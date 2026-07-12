import { useState, useEffect, useCallback, useMemo } from "react";
import seedData from "../data/bundleData.json";

const STORAGE_KEY = "wyze-bundle-saved-system-v1";

function cloneSeed() {
  return JSON.parse(JSON.stringify(seedData));
}

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.products && parsed.plans) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore corrupted storage, fall back to seed
  }
  return cloneSeed();
}

export function useBundleState() {
  const [data, setData] = useState(loadInitialState);
  const [activeVariants, setActiveVariants] = useState(() => {
    const map = {};
    loadInitialState().products.forEach((p) => {
      map[p.id] = p.defaultVariant;
    });
    return map;
  });
  const [openStep, setOpenStep] = useState("cameras");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (!saveMessage) return;
    const t = setTimeout(() => setSaveMessage(""), 2600);
    return () => clearTimeout(t);
  }, [saveMessage]);

  const setQuantity = useCallback((productId, variantId, qty) => {
    setData((prev) => {
      const next = { ...prev, products: prev.products.map((p) => ({ ...p, quantities: { ...p.quantities } })) };
      const product = next.products.find((p) => p.id === productId);
      if (!product) return prev;
      const clamped = Math.max(0, qty);
      product.quantities[variantId] = clamped;
      return next;
    });
  }, []);

  const setActiveVariant = useCallback((productId, variantId) => {
    setActiveVariants((prev) => ({ ...prev, [productId]: variantId }));
  }, []);

  const toggleStep = useCallback((stepId) => {
    setOpenStep((prev) => (prev === stepId ? null : stepId));
  }, []);

  const goToStep = useCallback((stepId) => {
    setOpenStep(stepId);
  }, []);

  const saveForLater = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaveMessage("Saved! Your system will be here when you return.");
    } catch (e) {
      setSaveMessage("Couldn't save right now — try again.");
    }
  }, [data]);

  const totalQtyForProduct = useCallback(
    (product) => Object.values(product.quantities).reduce((sum, q) => sum + (q || 0), 0),
    []
  );

  const selectedCount = useMemo(() => {
    const counts = {};
    data.products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + (totalQtyForProduct(p) > 0 ? 1 : 0);
    });
    counts.plan = data.plans.some((pl) => pl.selected) ? 1 : 0;
    return counts;
  }, [data, totalQtyForProduct]);

  const reviewLines = useMemo(() => {
    const groups = {};
    data.products.forEach((product) => {
      const entries = Object.entries(product.quantities).filter(([, qty]) => qty > 0);
      if (entries.length === 0) return;
      const group = product.reviewGroup;
      if (!groups[group]) groups[group] = [];
      entries.forEach(([variantId, qty]) => {
        const variant = product.variants.find((v) => v.id === variantId);
        const showVariantLabel = entries.length > 1 && variant;
        groups[group].push({
          key: `${product.id}:${variantId}`,
          productId: product.id,
          variantId,
          name: showVariantLabel ? `${product.name} — ${variant.label}` : product.name,
          shape: product.shape,
          qty,
          price: product.price,
          lineTotal: product.price * qty,
          locked: !!product.locked,
        });
      });
    });
    data.plans
      .filter((pl) => pl.selected)
      .forEach((pl) => {
        const group = pl.reviewGroup;
        if (!groups[group]) groups[group] = [];
        groups[group].push({
          key: pl.id,
          name: pl.name,
          shape: "plan",
          qty: 1,
          price: pl.price,
          billingSuffix: pl.billingSuffix,
          lineTotal: pl.price,
          isPlan: true,
        });
      });
    return groups;
  }, [data]);

  const totals = useMemo(() => {
    let price = 0;
    let compareAt = 0;
    data.products.forEach((product) => {
      const qty = totalQtyForProduct(product);
      price += product.price * qty;
      compareAt += (product.compareAtPrice ?? product.price) * qty;
    });
    data.plans
      .filter((pl) => pl.selected)
      .forEach((pl) => {
        price += pl.price;
        compareAt += pl.compareAtPrice ?? pl.price;
      });
    return {
      price,
      compareAt,
      savings: Math.max(0, compareAt - price),
    };
  }, [data, totalQtyForProduct]);

  return {
    data,
    activeVariants,
    openStep,
    saveMessage,
    setQuantity,
    setActiveVariant,
    toggleStep,
    goToStep,
    saveForLater,
    selectedCount,
    reviewLines,
    totals,
    totalQtyForProduct,
  };
}
