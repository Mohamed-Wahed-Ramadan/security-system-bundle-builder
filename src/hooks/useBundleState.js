import { useState, useEffect, useCallback, useMemo } from "react";
import { SAVE_MESSAGE_DURATION_MS, DEFAULT_OPEN_STEP, STORAGE_KEY } from "../constants/bundle";
import { buildInitialActiveVariants, buildReviewLines, calculateTotals, getSelectedCount, getTotalQuantity, cloneSeedData } from "../utils/bundle";

function readSavedBundleState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.data && parsed?.activeVariants) {
        return parsed;
      }
      if (parsed?.products && parsed?.plans) {
        return { data: parsed, activeVariants: buildInitialActiveVariants(parsed.products) };
      }
    }
  } catch (error) {
    // ignore corrupted storage and fall back to seed
  }

  const seedData = cloneSeedData();
  return { data: seedData, activeVariants: buildInitialActiveVariants(seedData.products) };
}

export function useBundleState() {
  const initialState = useMemo(() => readSavedBundleState(), []);
  const [data, setData] = useState(initialState.data);
  const [activeVariants, setActiveVariants] = useState(initialState.activeVariants);
  const [openStep, setOpenStep] = useState(DEFAULT_OPEN_STEP);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (!saveMessage) return;
    const timeoutId = setTimeout(() => setSaveMessage(""), SAVE_MESSAGE_DURATION_MS);
    return () => clearTimeout(timeoutId);
  }, [saveMessage]);

  const setQuantity = useCallback((productId, variantId, qty) => {
    setData((prev) => {
      const next = { ...prev, products: prev.products.map((product) => ({ ...product, quantities: { ...product.quantities } })) };
      const product = next.products.find((item) => item.id === productId);
      if (!product) return prev;

      product.quantities[variantId] = Math.max(0, qty);
      return next;
    });
  }, []);

  const setActiveVariant = useCallback((productId, variantId) => {
    setActiveVariants((prev) => ({ ...prev, [productId]: variantId }));
  }, []);

  const setPlanSelection = useCallback((planId, isSelected) => {
    setData((prev) => ({
      ...prev,
      plans: prev.plans.map((plan) => ({ ...plan, selected: plan.id === planId ? isSelected : false })),
    }));
  }, []);

  const toggleStep = useCallback((stepId) => {
    setOpenStep((prev) => (prev === stepId ? null : stepId));
  }, []);

  const goToStep = useCallback((stepId) => {
    setOpenStep(stepId);
  }, []);

  const saveForLater = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, activeVariants }));
      setSaveMessage("Saved! Your system will be here when you return.");
    } catch (error) {
      setSaveMessage("Couldn't save right now — try again.");
    }
  }, [data, activeVariants]);

  const totalQtyForProduct = useCallback((product) => getTotalQuantity(product), []);

  const selectedCount = useMemo(() => getSelectedCount(data, totalQtyForProduct), [data, totalQtyForProduct]);

  const reviewLines = useMemo(() => buildReviewLines(data), [data]);

  const totals = useMemo(() => calculateTotals(data, totalQtyForProduct), [data, totalQtyForProduct]);

  return {
    data,
    activeVariants,
    openStep,
    saveMessage,
    setQuantity,
    setActiveVariant,
    setPlanSelection,
    toggleStep,
    goToStep,
    saveForLater,
    selectedCount,
    reviewLines,
    totals,
    totalQtyForProduct,
  };
}
