import ProductImage from "./ProductImage";
import VariantSelector from "./VariantSelector";
import QuantityStepper from "./QuantityStepper";
import { getProductVariantId } from "../../utils/bundle";
import "../../styles/components/ProductCard.css";

export default function ProductCard({ product, activeVariantId, onSelectVariant, onQuantityChange }) {
  const variantId = getProductVariantId(product, activeVariantId);
  const quantity = product.quantities[variantId] ?? 0;
  const isSelected = quantity > 0;
  const activeVariant = product.variants.find((variant) => variant.id === variantId);
  const tint = activeVariant?.swatch;

  return (
    <div className={`product-card ${isSelected ? "product-card--selected" : ""}`}>
      <div className="product-card__media">
        {product.badge && <span className="product-card__badge">{product.badge}</span>}
        <div className="product-card__image">
          <ProductImage
            productId={product.id}
            variantId={variantId}
            shape={product.shape}
            tint={tint}
            alt={product.name}
          />
        </div>
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>
        <a href={product.learnMoreUrl} className="product-card__learn-more">
          Learn More
        </a>

        <VariantSelector
          productId={product.id}
          variants={product.variants}
          activeVariant={variantId}
          onSelect={(nextVariantId) => onSelectVariant(product.id, nextVariantId)}
          shape={product.shape}
        />

        <div className="product-card__footer">
          <QuantityStepper
            value={quantity}
            disabled={!!product.locked}
            onChange={(nextQuantity) => onQuantityChange(product.id, variantId, nextQuantity)}
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
    </div>
  );
}
