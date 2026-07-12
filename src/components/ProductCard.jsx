import ProductImage from "./ProductImage";
import VariantSelector from "./VariantSelector";
import QuantityStepper from "./QuantityStepper";

export default function ProductCard({ product, activeVariantId, onSelectVariant, onQuantityChange }) {
  const variantId = product.variants.length > 0 ? activeVariantId : "default";
  const qty = product.quantities[variantId] ?? 0;
  const isSelected = qty > 0;
  const activeVariant = product.variants.find((v) => v.id === variantId);
  const tint = activeVariant?.swatch;

  return (
    <div className={`product-card ${isSelected ? "product-card--selected" : ""}`}>
      {product.badge && <span className="product-card__badge">{product.badge}</span>}

      <div className="product-card__image">
        <ProductImage shape={product.shape} tint={tint} />
      </div>

      <h3 className="product-card__title">{product.name}</h3>
      <p className="product-card__desc">
        {product.description} <a href={product.learnMoreUrl}>Learn More</a>
      </p>

      <VariantSelector
        variants={product.variants}
        activeVariant={variantId}
        onSelect={(vId) => onSelectVariant(product.id, vId)}
      />

      <div className="product-card__footer">
        <QuantityStepper
          value={qty}
          disabled={!!product.locked}
          onChange={(next) => onQuantityChange(product.id, variantId, next)}
        />
        <div className="product-card__price">
          {product.compareAtPrice != null && (
            <span className="price price--compare">${product.compareAtPrice.toFixed(2)}</span>
          )}
          <span className="price price--active">
            {product.price === 0 ? "FREE" : `$${product.price.toFixed(2)}`}
          </span>
        </div>
      </div>
    </div>
  );
}
