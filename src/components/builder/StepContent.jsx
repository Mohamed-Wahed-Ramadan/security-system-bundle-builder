import PlanCard from "../product/PlanCard";
import ProductCard from "../product/ProductCard";
import "../../styles/components/StepContent.css";

// Render the correct content for the currently active builder step.
export default function StepContent({ step, data, activeVariants, setActiveVariant, setPlanSelection, setQuantity }) {
  // The plan step uses a different UI from the product-selection steps.
  if (step.category === "plan") {
    return (
      <div className="plan-list">
        {data.plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onSelect={(planId) => setPlanSelection(planId, true)} />
        ))}
      </div>
    );
  }

  // Other steps show a grid of products that match the selected category.
  return (
    <div className="product-grid">
      {data.products
        .filter((product) => product.category === step.category)
        .map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            activeVariantId={activeVariants[product.id]}
            onSelectVariant={setActiveVariant}
            onQuantityChange={setQuantity}
          />
        ))}
    </div>
  );
}
