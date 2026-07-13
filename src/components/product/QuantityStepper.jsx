export default function QuantityStepper({ value, onChange, disabled = false, size = "md", variant = "default" }) {
  const className = [
    "stepper",
    `stepper--${size}`,
    variant !== "default" ? `stepper--${variant}` : "",
    disabled ? "stepper--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <button
        type="button"
        className="stepper__btn"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={disabled || value <= 0}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="stepper__value">{value}</span>
      <button
        type="button"
        className="stepper__btn"
        onClick={() => onChange(value + 1)}
        disabled={disabled}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
