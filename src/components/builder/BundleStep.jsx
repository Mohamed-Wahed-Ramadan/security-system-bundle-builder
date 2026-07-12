import StepIcon from "../ui/StepIcon";

export default function BundleStep({ step, isOpen, selectedCount, onToggle, children, onNext, isLastStep }) {
  return (
    <section className={`bundle-step ${isOpen ? "bundle-step--open" : ""}`}>
      <button type="button" className="bundle-step__header" onClick={onToggle} aria-expanded={isOpen}>
        <div className="bundle-step__heading">
          <span className="bundle-step__label">{step.stepLabel}</span>
          <div className="bundle-step__title-row">
            <StepIcon name={step.icon} className="bundle-step__icon" />
            <span className="bundle-step__title">{step.title}</span>
          </div>
        </div>
        <span className="bundle-step__state">
          {selectedCount > 0 && <span className="bundle-step__count">{selectedCount} selected</span>}
          <StepIcon name={isOpen ? "chevron-up" : "chevron-down"} />
        </span>
      </button>

      {isOpen && (
        <div className="bundle-step__content">
          {children}
          {!isLastStep && (
            <button type="button" className="btn btn--outline bundle-step__next" onClick={onNext}>
              {step.nextLabel}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
