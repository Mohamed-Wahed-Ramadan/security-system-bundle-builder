export default function VariantSelector({ variants, activeVariant, onSelect }) {
  if (!variants || variants.length === 0) return null;
  return (
    <div className="variant-selector" role="group" aria-label="Choose a color">
      {variants.map((variant) => (
        <button
          type="button"
          key={variant.id}
          className={`variant-chip ${activeVariant === variant.id ? "variant-chip--active" : ""}`}
          onClick={() => onSelect(variant.id)}
        >
          <span className="variant-chip__swatch" style={{ background: variant.swatch }} />
          <span className="variant-chip__label">{variant.label}</span>
        </button>
      ))}
    </div>
  );
}
