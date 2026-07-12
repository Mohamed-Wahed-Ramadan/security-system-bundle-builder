import ProductImage from "./ProductImage";

export default function PlanCard({ plan, onSelect }) {
  return (
    <button
      type="button"
      className={`plan-card ${plan.selected ? "plan-card--selected" : ""}`}
      onClick={() => onSelect(plan.id)}
    >
      <div className="plan-card__image">
        <ProductImage shape="plan" size={56} />
      </div>
      <div className="plan-card__body">
        <h3 className="product-card__title">{plan.name}</h3>
        <p className="product-card__desc">{plan.description}</p>
      </div>
      <div className="product-card__price">
        <span className="price price--compare">
          ${plan.compareAtPrice.toFixed(2)}
          {plan.billingSuffix}
        </span>
        <span className="price price--active">
          ${plan.price.toFixed(2)}
          {plan.billingSuffix}
        </span>
      </div>
      <span className={`plan-card__radio ${plan.selected ? "plan-card__radio--on" : ""}`} aria-hidden="true" />
    </button>
  );
}
