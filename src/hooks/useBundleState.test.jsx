// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useBundleState } from "./useBundleState";

describe("useBundleState", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("persists quantities, active variants, and plan selection for later reloads", () => {
    const { result, rerender } = renderHook(() => useBundleState());

    act(() => {
      result.current.setQuantity("cam-v4", "white", 2);
      result.current.setActiveVariant("cam-v4", "black");
      result.current.setQuantity("motion-sensor", "default", 1);
      result.current.setPlanSelection("cam-unlimited", true);
      result.current.saveForLater();
    });

    rerender();

    expect(result.current.data.products.find((product) => product.id === "cam-v4").quantities.white).toBe(2);
    expect(result.current.activeVariants["cam-v4"]).toBe("black");
    expect(result.current.data.plans.find((plan) => plan.id === "cam-unlimited").selected).toBe(true);
    expect(result.current.reviewLines.Plan.some((line) => line.name === "Cam Unlimited")).toBe(true);
  });
});
