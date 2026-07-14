import StepIcon from "../ui/StepIcon";
import "../../styles/components/BundleStep.css";

// Single accordion item for one builder step.
export default function BundleStep({ step, isOpen, selectedCount, onToggle, children, onNext, isLastStep }) {
  return (
    <section className={`bundle-step ${isOpen ? "bundle-step--open" : ""}`}>
      {/* Label shown above each step, such as "STEP 1 OF 4". */}
      <span className="bundle-step__label">{step.stepLabel}</span>
      <hr />

      {/* Main toggle button for expanding/collapsing the step content. */}
      <button type="button" className="bundle-step__header" onClick={onToggle} aria-expanded={isOpen}>
        <div className="bundle-step__heading">
          <div className="bundle-step__title-row">
            {/* Icon representing the current step type. */}
            <StepIcon name={step.icon} className="bundle-step__icon" />
            <span className="bundle-step__title">{step.title}</span>
          </div>
        </div>

        <span className="bundle-step__state">
          {/* Show how many items are currently selected in this step. */}
          {selectedCount > 0 && <span className="bundle-step__count">{selectedCount} selected</span>}
          {/* Keep the chevron as a simple text symbol instead of the old icon component. */}
          <span>{isOpen ? "▲" : "▼"}</span>
        </span>
      </button>

      <hr />

      {/* Render the step body only when the step is open. */}
      {isOpen && (
        <div className="bundle-step__content">
          {children}
          <br />
          {/* Show the next action only when this is not the last step. */}
          {!isLastStep && (
            <button type="button" className="bundle-step__next" onClick={onNext}>
              {step.nextLabel}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
