import { useBundleState } from "./hooks/useBundleState";
import BundleStep from "./components/builder/BundleStep";
import StepContent from "./components/builder/StepContent";
import ReviewPanel from "./components/review/ReviewPanel";
import "./App.css";

export default function App() {
  const {
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
  } = useBundleState();

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
              <StepContent
                step={step}
                data={data}
                activeVariants={activeVariants}
                setActiveVariant={setActiveVariant}
                setPlanSelection={setPlanSelection}
                setQuantity={setQuantity}
              />
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
