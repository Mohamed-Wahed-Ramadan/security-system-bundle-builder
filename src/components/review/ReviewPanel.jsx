import ProductImage from "../product/ProductImage";
import QuantityStepper from "../product/QuantityStepper";
import { REVIEW_GROUP_ORDER } from "../../constants/bundle";

export default function ReviewPanel({ reviewLines, totals, shipping, guarantee, financingText, onQuantityChange, saveForLater, saveMessage }) {
  return (
    <aside className="review-panel">
      <span className="review-panel__eyebrow">Review</span>
      <h2 className="review-panel__title">Your security system</h2>
      <p className="review-panel__subtitle">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      {REVIEW_GROUP_ORDER.filter((group) => reviewLines[group]?.length).map((group) => (
        <div className="review-group" key={group}>
          <span className="review-group__label">{group}</span>
          {reviewLines[group].map((line) => (
            <div className="review-line" key={line.key}>
              <div className="review-line__thumb">
                <ProductImage shape={line.shape} size={40} />
              </div>
              <span className="review-line__name">{line.name}</span>
              {!line.isPlan && !line.locked ? (
                <QuantityStepper
                  size="sm"
                  value={line.qty}
                  onChange={(nextQuantity) => onQuantityChange(line.productId, line.variantId, nextQuantity)}
                />
              ) : (
                <span className="review-line__spacer" />
              )}
              <span className="review-line__price">
                {line.price === 0 ? "FREE" : `$${line.lineTotal.toFixed(2)}${line.billingSuffix || ""}`}
              </span>
            </div>
          ))}
        </div>
      ))}

      <div className="review-line review-line--shipping">
        <div className="review-line__thumb review-line__thumb--icon">🚚</div>
        <span className="review-line__name">{shipping.label}</span>
        <span className="review-line__spacer" />
        <span className="review-line__price">
          <span className="price price--compare">${shipping.compareAtPrice.toFixed(2)}</span>{" "}
          <span className="price--free">{shipping.price === 0 ? "FREE" : `$${shipping.price.toFixed(2)}`}</span>
        </span>
      </div>

      <div className="review-panel__totals">
        <div className="guarantee-badge">
          <span className="guarantee-badge__pct">{guarantee.badgeText}</span>
          <span className="guarantee-badge__sub">{guarantee.badgeSubtext}</span>
        </div>
        <div className="review-panel__totals-text">
          <p className="guarantee-heading">{guarantee.heading}</p>
          <p className="guarantee-body">{guarantee.body}</p>
          <span className="financing-pill">{financingText}</span>
          <div className="review-panel__total-row">
            <span className="price price--compare price--compare-lg">${totals.compareAt.toFixed(2)}</span>
            <span className="review-panel__total">${totals.price.toFixed(2)}</span>
          </div>
          {totals.savings > 0 && (
            <p className="review-panel__savings">
              Congrats! You're saving ${totals.savings.toFixed(2)} on your security bundle!
            </p>
          )}
        </div>
      </div>

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
    </aside>
  );
}
