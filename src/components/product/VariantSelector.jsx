import ProductImage from "./ProductImage";

export default function VariantSelector({ productId, variants, activeVariant, onSelect, shape }) {
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
          <ProductImage
            productId={productId}
            variantId={variant.id}
            shape={shape}
            tint={variant.swatch}
            size={20}
            className="variant-chip__thumb"
          />
          <span className="variant-chip__label">{variant.label}</span>
        </button>
      ))}
    </div>
  );
}
