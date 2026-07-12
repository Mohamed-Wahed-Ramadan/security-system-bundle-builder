# Bundle Builder — Frontend Take-Home

A two-column, data-driven bundle builder: a 4-step accordion on the left ("Choose your
cameras" → "Choose your plan" → "Choose your sensors" → "Add extra protection") and a
live "Your security system" review panel on the right.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To produce a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  data/bundleData.json     -- the single JSON source of truth (steps, products,
                               plans, shipping, guarantee copy). Everything on
                               screen is rendered from this file; no per-product
                               markup is hardcoded.
  hooks/useBundleState.js  -- all state: quantities per variant, active variant
                               per product, open accordion step, selected counts,
                               grouped review lines, totals/savings, and the
                               localStorage save/restore for "Save my system
                               for later".
  components/
    BundleStep.jsx         -- one accordion step (header + collapsible content)
    ProductCard.jsx        -- a builder-side product card
    PlanCard.jsx           -- the plan option shown in "Choose your plan"
    VariantSelector.jsx    -- the color/variant chip row
    QuantityStepper.jsx    -- the shared +/- stepper (used on cards AND in the
                               review panel, bound to the same state)
    ReviewPanel.jsx        -- the right-hand summary
    ProductImage.jsx       -- lightweight inline SVG illustrations per product
                               (see "Product images" below)
    StepIcon.jsx           -- step + chevron icons
  App.jsx / App.css        -- layout + all styling
```

## How the interactions work

- **Quantities are stored per variant**, e.g. `{ white: 1, grey: 0, black: 0 }`.
  Selecting a color only changes which variant is "active" for that card; it does
  not touch any variant's count. The stepper always reads/writes the *active*
  variant's quantity, so switching from Red (2) to Blue shows 0, and switching
  back shows 2 again.
- **The review panel renders one line per variant with qty > 0** across every
  product, so Red ×2 and Blue ×1 of the same product both show up as their own
  lines if you add both. If a product has just one active variant, its line
  omits the variant suffix to match the clean look in the design.
- **The review panel's quantity steppers write to the exact same state** as the
  card steppers (`setQuantity` from the hook), so editing either place keeps
  everything in sync, including the "N selected" counts and the total.
- **"N selected"** counts distinct products (not variant lines) in a step that
  have at least one variant with qty > 0. The plan step counts 1 when a plan is
  selected.
- **Totals**: the reviewed total is the sum of `price × qty` for every
  product line plus the selected plan's monthly price (matching the design,
  where the plan's price is folded directly into the same total as the
  hardware). Shipping is shown as its own line (with a struck-through compare
  price) but isn't included in the total/savings math, since it's already free
  in the seed data — this matches the numbers in the provided mock exactly
  ($238.81 struck through → $187.89, saving $50.92).
- **Persistence**: "Save my system for later" writes the full state (all
  quantities + active variants) to `localStorage`. On load, the app checks for
  a saved system first and restores it; if none exists yet, it seeds from
  `bundleData.json` so a fresh clone matches the design exactly. Reloading the
  page (or coming back later) after saving restores things exactly as they
  were left.

## Responsiveness

The two-column layout collapses to a single column under 900px, the product
grid drops from 3 → 2 → 1 columns as space shrinks, and a mobile-only "Let's
get started!" heading appears under ~600px, matching the provided mobile
reference. The review panel moves below the accordion at that breakpoint.

## Decisions, tradeoffs, and what I didn't finish

- **Product photography**: I didn't have access to the real Wyze product
  photos (or general internet image fetches) in this environment, so each
  product renders a small inline SVG illustration instead (see
  `ProductImage.jsx`) rather than a raster photo. Swapping in real photos is a
  drop-in change — just add an `image` URL to each product in
  `bundleData.json` and render an `<img>` instead of `<ProductImage />`.
- **Variant chip styling**: per the brief, I did not spend time on a
  bespoke "selected chip" visual treatment — chips get a light highlight on the
  active one, but the focus went into the selection-and-quantity behavior and
  making sure it flows through to the review panel correctly.
- **"Choose your plan"**: the design only shows this step collapsed, so I
  built a single-plan selectable card (Cam Unlimited) using the same visual
  language as the rest of the builder; there's only one plan in the seed data
  since that's all the mock specifies.
- **Financing line** ("as low as $19.19/mo"): kept as a static string from the
  data file rather than computed, since no amortization/APR was specified.
- **Checkout button**: shows a placeholder confirmation (`window.alert`), as
  called out as acceptable in the brief.
- **No backend**: the JSON is served from a local file
  (`src/data/bundleData.json`) rather than an API — the brief calls a backend
  a bonus, not a requirement.
