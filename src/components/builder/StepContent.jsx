import PlanCard from "../product/PlanCard";
import ProductCard from "../product/ProductCard";

export default function StepContent({ step, data, activeVariants, setActiveVariant, setPlanSelection, setQuantity }) {
  if (step.category === "plan") {
    return (
      <div className="plan-list">
        {data.plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onSelect={(planId) => setPlanSelection(planId, true)} />
        ))}
      </div>
    );
  }

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
