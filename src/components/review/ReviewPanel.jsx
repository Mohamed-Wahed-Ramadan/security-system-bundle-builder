import ProductImage from "../product/ProductImage";
import QuantityStepper from "../product/QuantityStepper";
import ShippingIcon from "../ui/ShippingIcon";
import { REVIEW_GROUP_ORDER } from "../../constants/bundle";
import guaranteeBadgeImage from "../../assets/guarantee-badge.png";

function formatReviewPrice(amount, billingSuffix = "") {
  return `$${amount.toFixed(2)}${billingSuffix}`;
}

function ReviewLinePrice({ unitCompare, lineTotal, billingSuffix = "" }) {
  const showComparePrice = typeof unitCompare === "number" && unitCompare > 0;

  return (
    <div className="review-line__price">
      {showComparePrice && (
        <span className="review-line__price-compare">{formatReviewPrice(unitCompare, billingSuffix)}</span>
      )}
      <span className="review-line__price-current">
        {lineTotal === 0 ? "FREE" : formatReviewPrice(lineTotal, billingSuffix)}
      </span>
    </div>
  );
}

function ReviewLineName({ line }) {
  if (line.isPlan) {
    return (
      <span className="review-line__name">
        Cam <span className="review-line__name-accent">Unlimited</span>
      </span>
    );
  }

  return <span className="review-line__name">{line.name}</span>;
}

export default function ReviewPanel({ reviewLines, totals, shipping, guarantee, financingText, onQuantityChange, saveForLater, saveMessage }) {
  return (
    <aside className="review-panel">
      <div className="review-panel__main">
        <span className="review-panel__eyebrow">Review</span>
        <h2 className="review-panel__title">Your security system</h2>
        <p className="review-panel__subtitle">
          Review your personalized protection system designed to keep what matters most safe.
        </p>

        {REVIEW_GROUP_ORDER.filter((group) => reviewLines[group]?.length).map((group) => (
          <div className="review-group" key={group}>
            <span className="review-group__label">{group}</span>
            <hr/>
            {reviewLines[group].map((line) => (
              <div className="review-line" key={line.key}>
                <div className="review-line__thumb">
                  <ProductImage
                    productId={line.productId}
                    variantId={line.variantId}
                    shape={line.shape}
                    size={36}
                    alt={line.name}
                  />
                </div>

                <ReviewLineName line={line} />

                <div className="review-line__controls">
                  {!line.isPlan && (
                    <QuantityStepper
                      variant="review"
                      size="sm"
                      value={line.qty}
                      disabled={line.locked}
                      onChange={(nextQuantity) => onQuantityChange(line.productId, line.variantId, nextQuantity)}
                    />
                  )}
                </div>

                <ReviewLinePrice
                  unitCompare={line.compareAtPrice ?? line.price}
                  lineTotal={line.lineTotal}
                  billingSuffix={line.billingSuffix}
                />
                
              </div>
            ))}
          </div>
        ))}

        <div className="review-line review-line--shipping">
          <div className="review-line__thumb review-line__thumb--icon">
            <ShippingIcon width={20} height={20} />
          </div>
          <span className="review-line__name">{shipping.label}</span>
          <div className="review-line__controls" />
          <ReviewLinePrice unitCompare={shipping.compareAtPrice} lineTotal={shipping.price} />
        </div>
      </div>

      <div className="review-panel__side">
        <div className="review-panel__totals">
          <div className="review-panel__badge-and-text">
            <div className="guarantee-badge">
              <img src={guaranteeBadgeImage} alt="Guarantee badge" className="guarantee-badge__image" />
            </div>
            <div className="review-panel__totals-text">
              <p className="guarantee-heading">{guarantee.heading}</p>
              <p className="guarantee-body">{guarantee.body}</p>
            </div>
          </div>
          
          
          
          <div className="review-panel__price-row">
            <span className="financing-pill">{financingText}</span>
            <div className="review-panel__total-row">
              <span className="price price--compare price--compare-lg">${totals.compareAt.toFixed(2)}</span>
              <span className="review-panel__total">${totals.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
        {totals.savings > 0 && (
            <p className="review-panel__savings">
              Congrats! You're saving ${totals.savings.toFixed(2)} on your security bundle!
            </p>
          )}
        <button
          type="button"
          className="btn btn--primary review-panel__checkout"
          onClick={() => window.alert("This is a prototype — checkout isn't wired up yet!")}
        >
          Checkout
        </button>
        <button type="button" className="review-panel__save-link" onClick={saveForLater}>
          Save my system for later
        </button>
        {saveMessage && <p className="review-panel__save-message">{saveMessage}</p>}
      </div>
    </aside>
  );
}