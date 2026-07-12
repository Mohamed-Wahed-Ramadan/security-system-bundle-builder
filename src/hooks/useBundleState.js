import { useState, useEffect, useCallback, useMemo } from "react";
import { SAVE_MESSAGE_DURATION_MS, DEFAULT_OPEN_STEP } from "../constants/bundle";
import { buildInitialActiveVariants, buildReviewLines, calculateTotals, getInitialBundleData, getSelectedCount, getTotalQuantity } from "../utils/bundle";

export function useBundleState() {
  const [data, setData] = useState(getInitialBundleData);
  const [activeVariants, setActiveVariants] = useState(() => buildInitialActiveVariants(getInitialBundleData().products));
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

  const toggleStep = useCallback((stepId) => {
    setOpenStep((prev) => (prev === stepId ? null : stepId));
  }, []);

  const goToStep = useCallback((stepId) => {
    setOpenStep(stepId);
  }, []);

  const saveForLater = useCallback(() => {
    try {
      localStorage.setItem("wyze-bundle-saved-system-v1", JSON.stringify(data));
      setSaveMessage("Saved! Your system will be here when you return.");
    } catch (error) {
      setSaveMessage("Couldn't save right now — try again.");
    }
  }, [data]);

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
    toggleStep,
    goToStep,
    saveForLater,
    selectedCount,
    reviewLines,
    totals,
    totalQtyForProduct,
  };
}
