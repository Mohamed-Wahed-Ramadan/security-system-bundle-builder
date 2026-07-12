import { useBundleState } from "./hooks/useBundleState";
import BundleStep from "./components/BundleStep";
import ProductCard from "./components/ProductCard";
import PlanCard from "./components/PlanCard";
import ReviewPanel from "./components/ReviewPanel";
import "./App.css";

export default function App() {
  const {
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
  } = useBundleState();

  const productsByCategory = (category) => data.products.filter((p) => p.category === category);

  const renderStepContent = (step) => {
    if (step.category === "plan") {
      return (
        <div className="plan-list">
          {data.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={() => {}} />
          ))}
        </div>
      );
    }
    return (
      <div className="product-grid">
        {productsByCategory(step.category).map((product) => (
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
  };

  return (
    <div className="bundle-app">
      <h1 className="bundle-app__mobile-title">Let's get started!</h1>
      <div className="bundle-app__layout">
        <div className="bundle-app__builder">
          {data.steps.map((step, index) => (
            <BundleStep
              key={step.id}
              step={step}
              isOpen={openStep === step.id}
              selectedCount={selectedCount[step.category] || 0}
              onToggle={() => toggleStep(step.id)}
              onNext={() => goToStep(data.steps[index + 1]?.id)}
              isLastStep={index === data.steps.length - 1}
            >
              {renderStepContent(step)}
            </BundleStep>
          ))}
        </div>

        <ReviewPanel
          reviewLines={reviewLines}
          totals={totals}
          shipping={data.shipping}
          guarantee={data.guarantee}
          financingText={data.financingText}
          onQuantityChange={setQuantity}
          saveForLater={saveForLater}
          saveMessage={saveMessage}
        />
      </div>
    </div>
  );
}
