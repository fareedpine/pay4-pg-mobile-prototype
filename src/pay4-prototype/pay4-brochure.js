const app = document.querySelector("#brochure-app");

const ASSETS = {
  pay4: `${import.meta.env.BASE_URL}assets/pay4-logo-by-pinelabs.png`,
  pineLabs: `${import.meta.env.BASE_URL}assets/brochure-logos/pinelabs-logo.svg`,
  hdfc: `${import.meta.env.BASE_URL}assets/brochure-logos/hdfc-bank-logo.svg`,
  icici: `${import.meta.env.BASE_URL}assets/brochure-logos/icici-bank-logo.svg`,
  axis: `${import.meta.env.BASE_URL}assets/brochure-logos/axis-bank-logo.svg`,
  kotak: `${import.meta.env.BASE_URL}assets/brochure-logos/kotak-bank-logo.svg`,
  sbi: `${import.meta.env.BASE_URL}assets/brochure-logos/sbi-bank-logo.svg`
};

const issuers = [
  { name: "HDFC Bank", logo: ASSETS.hdfc, className: "issuer-hdfc" },
  { name: "ICICI Bank", logo: ASSETS.icici, className: "issuer-icici" },
  { name: "Axis Bank", logo: ASSETS.axis, className: "issuer-axis" },
  { name: "Kotak", logo: ASSETS.kotak, className: "issuer-kotak" },
  { name: "SBI", logo: ASSETS.sbi, className: "issuer-sbi" }
];

const customerBenefits = [
  ["Smaller upfront payment", "Turns a ₹40,000 decision into ₹10,099 today, then ₹10,000/month for 3 months."],
  ["Simple structure", "No tenure maze. One clear first payment followed by 3 monthly bank collections."],
  ["Credit-card funded", "Customers use eligible credit cards from participating issuers."],
  ["Transparent checkout", "Today’s amount, bank processing fee and future monthly schedule are shown before authentication."]
];

const merchantBenefits = [
  ["Higher conversion", "Reduce checkout hesitation by lowering the upfront payment burden."],
  ["Higher AOV", "Help customers upgrade to higher-value carts when payment is split."],
  ["Lower discount dependency", "Use affordability instead of always relying on coupons."],
  ["Lower commercial complexity", "One merchant-facing Pay4 charge, with issuer economics handled through the program."],
  ["Upfront settlement", "Merchant receives full order value upfront, net of Pay4 commercial charges."],
  ["Cleaner checkout", "Pay4 appears as a payment mode, not as a complicated EMI submenu."]
];

const journeySteps = [
  ["Customer reaches checkout", "Pay4 appears alongside UPI, Cards, Net Banking and Wallets."],
  ["Customer selects Pay4", "A ₹40,000 purchase is reframed as ₹10,099 today, then ₹10,000/month for 3 months."],
  ["Customer chooses card", "Saved eligible card or new eligible credit card inside Pay4."],
  ["Customer authenticates", "Standard card authentication with the issuer bank."],
  ["Merchant gets paid", "Order is paid for the full value; bank manages future payments."]
];

const categories = [
  ["Furniture", "Upgrade-led carts with higher values."],
  ["Mattresses", "Considered purchases with affordability friction."],
  ["Fashion & lifestyle", "Premiumization without deep discounting."],
  ["Travel", "High-intent bookings with flexibility needs."],
  ["Healthcare", "Planned and semi-planned spends."],
  ["Education", "Course and upskilling payments."],
  ["Eyewear", "Mid-ticket premium purchases."],
  ["Premium retail", "AOV expansion through lower upfront payment."]
];

const integrationOptions = [
  ["Hosted Checkout", "Enable Pay4 as a payment mode for merchants already on Pine Labs hosted checkout."],
  ["Affordability Widget", "Surface Pay ₹10,099 today, then ₹10,000/month for 3 months on product pages, cart pages and checkout."],
  ["Checkout API", "Allow large merchants to render Pay4 eligibility and pricing natively."]
];

const integrationFlow = [
  "Merchant site/app",
  "Pay4 availability & pricing",
  "Pay4 checkout selection",
  "Card authentication",
  "Payment success callback",
  "Settlement & reporting"
];

const partyModel = [
  ["Customer", "Pays today, then 3 monthly payments using an eligible credit card. Issuer-specific processing fee may apply."],
  ["Merchant", "Sees one Pay4 charge and receives upfront settlement net of Pay4 commercials."],
  ["Issuer Bank", "Manages card eligibility, repayment schedule, processing fee and future collections."],
  ["Pine Labs", "Orchestrates checkout, issuer integration, pricing, settlement and reconciliation."]
];

const waterfall = [
  ["Start", "₹100 purchase", "Customer purchase value", "start"],
  ["Less", "~₹3.25", "Subvention / no-cost EMI bridge", "cost"],
  ["Equals", "₹96.75", "Auth amount", "value"],
  ["Less", "~₹1.60", "Acquirer / card cost", "cost"],
  ["Equals", "~₹95.10", "Received from acquiring leg", "inflow"],
  ["Settle", "₹96.00", "Merchant settlement", "settlement"],
  ["Add", "~₹1.70", "Bank program fee receivable", "receivable"],
  ["Final", "~₹1.05", "Illustrative gross margin", "margin"]
];

const engineCards = [
  ["Checkout", "Displays Pay4, captures consent and routes to card authentication."],
  ["Pricing", "Calculates merchant fee, processing fee, subvention, taxes and settlement impact."],
  ["Bank Program", "Maintains issuer eligibility, BIN rules, scheme codes and refund capabilities."],
  ["Settlement", "Settles merchants upfront and tracks bank/acquirer settlement legs."],
  ["Reconciliation", "Provides merchant reports, bank reports, transaction status and receivables."]
];

const risks = [
  ["Product", "Customer confusion", "Card limit usage, future deductions or processing fee may be unclear.", "Clear schedule, fee disclosure and confirmation messaging."],
  ["Bank", "Bank rail inconsistency", "Issuers may implement Pay4 through different rails.", "Bank-wise adapters with one consistent customer proposition."],
  ["Finance", "Settlement mismatch", "Acquirer settlement, merchant settlement and Pay4 fee may not align naturally.", "Dedicated Pay4 ledger and settlement reconciliation."],
  ["Support", "Refund complexity", "Full and partial refunds require coordination across merchant, Pine Labs and issuer.", "Certify refund behavior bank-wise before enabling partial refunds."],
  ["Product", "Unsupported card friction", "Customers may try debit cards or unsupported credit cards.", "Show issuers before card entry and validate BIN early."],
  ["Bank", "Receivable risk", "Economics depend on issuer program fee collection.", "Monthly invoicing, receivables tracking and bank-wise reconciliation."]
];

function pay4Logo(className = "pay4-logo") {
  return `<img class="${className}" src="${ASSETS.pay4}" alt="Pay4 by Pine Labs" />`;
}

function pineLabsWordmark() {
  return `<img class="pine-brand-logo" src="${ASSETS.pineLabs}" alt="Pine Labs" />`;
}

function pageShell(number, kicker, title, content, modifier = "") {
  return `
    <section class="brochure-page ${modifier}" aria-label="Page ${number}: ${title}">
      <header class="page-header">
        <div class="brand-lockup">
          ${pay4Logo("header-pay4-logo")}
          ${pineLabsWordmark()}
        </div>
        <div class="page-index">
          <span>${kicker}</span>
          <strong>${String(number).padStart(2, "0")}</strong>
        </div>
      </header>
      <div class="page-body">
        ${content}
      </div>
      <footer class="page-footer">
        <span>Pay4 by Pine Labs</span>
        <span>Credit-card-funded affordability for online checkout.</span>
      </footer>
    </section>
  `;
}

function card(title, copy, className = "") {
  return `
    <article class="content-card ${className}">
      <h3>${title}</h3>
      <p>${copy}</p>
    </article>
  `;
}

function issuerLogoRow({ compact = false, showMore = true } = {}) {
  return `
    <section class="issuer-panel ${compact ? "issuer-panel-compact" : ""}">
      <div class="issuer-label">Accepted Credit Card Issuers</div>
      <div class="issuer-logo-row">
        ${issuers.map((issuer) => `
          <div class="issuer-logo-mark ${issuer.className}" title="${issuer.name}">
            <img src="${issuer.logo}" alt="${issuer.name}" />
          </div>
        `).join("")}
        ${showMore ? `<span class="issuer-more">SBI Card &amp; more coming soon</span>` : ""}
      </div>
    </section>
  `;
}

function checkoutMockup() {
  return `
    <aside class="checkout-mockup" aria-label="Pay4 online checkout module">
      <div class="browser-bar">
        <span></span>
        <strong>gateway.plural.com</strong>
      </div>
      <div class="checkout-top">
        <div>
          <span>Paying To</span>
          <strong>Stanley Living</strong>
        </div>
        <div>
          <span>Total Payable</span>
          <strong class="checkout-amount">₹40,000</strong>
        </div>
      </div>
      <div class="checkout-pay4">
        <div class="checkout-pay4-head">
          ${pay4Logo("mock-pay4-logo")}
          <span>NEW</span>
        </div>
        <p>Pay ₹10,099 today, then ₹10,000/month for 3 months.</p>
        <div class="amount-pair">
          <div>
            <span>Pay Today</span>
            <strong>₹10,099</strong>
            <small>₹10,000 first payment + ₹99 bank processing fee</small>
          </div>
          <div>
            <span>Later</span>
            <strong>₹10,000/month × 3</strong>
            <small>Collected by your bank</small>
          </div>
        </div>
        ${issuerLogoRow({ compact: true, showMore: false })}
      </div>
    </aside>
  `;
}

function systemModel() {
  const cards = [
    ["01", "Customer", "Pays ₹10,099 today, then ₹10,000/month for 3 months using an eligible credit card."],
    ["02", "Merchant", "Receives full order value upfront, net of Pay4 commercial charges."],
    ["03", "Issuer Bank", "Manages card eligibility, repayment schedule, processing fee and future collections."]
  ];

  return `
    <section class="system-model">
      <div class="system-copy">
        <span class="eyebrow">What is Pay4?</span>
        <p>Pay4 is a standalone online checkout payment mode. It is embedded directly into Pine Labs Online PG, uses eligible credit cards from participating issuers, and applies at order level rather than SKU or brand level.</p>
      </div>
      <div class="model-cards">
        ${cards.map(([number, title, copy]) => `
          <article>
            <span>${number}</span>
            <h3>${title}</h3>
            <p>${copy}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function pageOne() {
  return pageShell(
    1,
    "What is Pay4",
    "Affordability, built into checkout.",
    `
      <div class="cover-layout">
        <section class="cover-copy">
          <span class="eyebrow">Online PG affordability</span>
          <h1>Affordability, built into checkout.</h1>
          <p class="lead">Pay4 lets customers split online purchases into 4 simple payments using eligible credit cards, while merchants get paid upfront.</p>
          <div class="proof-row">
            <span>Credit cards only</span>
            <span>Merchant paid upfront</span>
            <span>Always-on for enabled merchants</span>
            <span>No Pine Labs underwriting</span>
          </div>
        </section>
        ${checkoutMockup()}
      </div>
      ${systemModel()}
    `,
    "cover-page"
  );
}

function emiComparison() {
  return `
    <section class="emi-comparison">
      <div class="comparison-title">
        <span class="eyebrow">Pay4 vs Traditional EMI</span>
        <p>Instead of multiple tenures, hidden offer rules and issuer-by-issuer discovery, Pay4 presents one simple construct: pay today, then 3 monthly payments.</p>
      </div>
      <div class="comparison-columns">
        <article>
          <h3>Traditional EMI</h3>
          <ul>
            <li>Often discovered late inside card/EMI flows</li>
            <li>Multiple tenures and issuer-specific rules</li>
            <li>Campaign-led or offer-led</li>
            <li>Eligibility and pricing can feel unclear</li>
            <li>Higher merchant complexity across MDR, EMI fee and subvention</li>
          </ul>
        </article>
        <article class="pay4-column">
          <h3>Pay4</h3>
          <ul>
            <li>Always-on payment mode at checkout</li>
            <li>One simple construct: today + 3 monthly payments</li>
            <li>Visible for enabled merchants</li>
            <li>Usable by customers with eligible credit cards from participating issuers</li>
            <li>No Pine Labs underwriting journey</li>
            <li>One merchant-facing Pay4 commercial</li>
          </ul>
        </article>
      </div>
    </section>
  `;
}

function pageTwo() {
  return pageShell(
    2,
    "Customer + Merchant Pitch",
    "From “not now” to “paid now”.",
    `
      <div class="pitch-title">
        <div>
          <h1>From “not now” to “paid now”.</h1>
          <p>Customers often abandon not because they do not want the product, but because the full upfront amount feels too high.</p>
        </div>
        <div class="before-after">
          <div>
            <span>Before</span>
            <strong>Pay ₹40,000 today</strong>
          </div>
          <div class="arrow">→</div>
          <div>
            <span>After</span>
            <strong>Pay ₹10,099 today + ₹10,000/month × 3</strong>
          </div>
        </div>
      </div>

      <div class="pitch-grid">
        <section>
          <span class="eyebrow">Why customers choose Pay4</span>
          <div class="benefit-grid">
            ${customerBenefits.map(([title, copy]) => card(title, copy)).join("")}
          </div>
        </section>
        <section>
          <span class="eyebrow">Why merchants activate Pay4</span>
          <div class="benefit-grid merchant-benefits">
            ${merchantBenefits.map(([title, copy]) => card(title, copy, "tight-card")).join("")}
          </div>
        </section>
      </div>

      ${emiComparison()}

      <section class="merchant-note">
        <strong>For merchants, Pay4 replaces fragmented EMI economics with a single Pay4 commercial construct, while issuer-side economics are handled through the program.</strong>
        <span>Pay4 is designed as an always-on checkout payment mode for enabled merchants, not a campaign customers need to discover.</span>
      </section>
    `,
    "pitch-page"
  );
}

function journeyDiagram() {
  return `
    <section class="journey-diagram">
      ${journeySteps.map(([title, copy], index) => `
        <article class="journey-node">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${title}</h3>
          <p>${copy}</p>
        </article>
      `).join("")}
    </section>
  `;
}

function pay4ModuleMockup() {
  return `
    <aside class="pay4-module">
      <div class="checkout-pay4-head">
        ${pay4Logo("mock-pay4-logo")}
        <span>NEW</span>
      </div>
      <p>Pay ₹10,099 today, then ₹10,000/month for 3 months.</p>
      <div class="module-meta">
        <span>Credit cards only</span>
        <span>Order-level financing</span>
      </div>
      <div class="amount-pair compact-amounts">
        <div>
          <span>Pay Today</span>
          <strong>₹10,099</strong>
          <small>₹10,000 first payment + ₹99 bank processing fee</small>
        </div>
        <div>
          <span>Later</span>
          <strong>₹10,000/month × 3</strong>
          <small>Collected by your bank</small>
        </div>
      </div>
      ${issuerLogoRow({ showMore: true })}
      <div class="card-preview">
        <div>
          <span>Add eligible credit card</span>
          <small>Pay today includes ₹99 bank processing fee</small>
        </div>
        <button type="button">Pay ₹10,099 now</button>
      </div>
    </aside>
  `;
}

function categoryGrid() {
  return `
    <section class="category-panel">
      <div class="section-headline">
        <span class="eyebrow">Built for mid-ticket online commerce</span>
        <p>Best suited for categories where customers have purchase intent, but the upfront payment creates hesitation.</p>
      </div>
      <div class="category-grid">
        ${categories.map(([title, copy]) => card(title, copy, "category-card")).join("")}
      </div>
    </section>
  `;
}

function integrationPanel() {
  return `
    <section class="integration-panel">
      <div class="integration-topline">
        <span class="eyebrow">Designed for merchant activation</span>
        <strong>One activation. One payment mode. One settlement experience.</strong>
      </div>
      <div class="integration-options">
        ${integrationOptions.map(([title, copy]) => card(title, copy, "integration-card")).join("")}
      </div>
      <div class="integration-flow">
        ${integrationFlow.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </section>
  `;
}

function pageThree() {
  return pageShell(
    3,
    "Journey + Categories + Integration",
    "A checkout journey built for affordability.",
    `
      <div class="journey-title">
        <h1>A checkout journey built for affordability.</h1>
        <p>Pay4 appears as a standalone online payment mode, then moves customers through a familiar card-funded authentication flow.</p>
      </div>
      ${journeyDiagram()}
      <div class="page3-showcase">
        ${pay4ModuleMockup()}
      </div>
      <div class="category-integration-grid">
        ${categoryGrid()}
        ${integrationPanel()}
      </div>
    `,
    "journey-page"
  );
}

function partyModelCards() {
  return `
    <section class="party-model">
      <span class="eyebrow">Four-party operating model</span>
      <div class="party-grid">
        ${partyModel.map(([title, copy]) => card(title, copy, "party-card")).join("")}
      </div>
      <p class="plain-explainer">The merchant sees one Pay4 charge. Pine Labs manages the underlying issuer subvention, acquirer cost and bank program receivable.</p>
    </section>
  `;
}

function commercialWaterfall() {
  return `
    <section class="waterfall-panel">
      <div class="waterfall-head">
        <span class="eyebrow">Illustrative ₹100 commercial flow</span>
        <p>Color separates customer purchase value, deductions, acquiring-leg inflow, merchant settlement, bank receivable and final margin.</p>
      </div>
      <div class="legend-row">
        <span class="legend-inflow">Inflow / value retained</span>
        <span class="legend-cost">Cost or deduction</span>
        <span class="legend-receivable">Bank program receivable</span>
        <span class="legend-margin">Illustrative margin</span>
      </div>
      <div class="waterfall">
        ${waterfall.map(([label, value, copy, type]) => `
          <article class="waterfall-step waterfall-${type}">
            <span>${label}</span>
            <strong>${value}</strong>
            <p>${copy}</p>
          </article>
        `).join("")}
      </div>
      <small>Figures are illustrative and subject to bank-wise commercials, acquirer cost, merchant pricing and final program terms.</small>
    </section>
  `;
}

function enginePanel() {
  return `
    <section class="engine-panel">
      <span class="eyebrow">Operating engines</span>
      <div class="engine-grid">
        ${engineCards.map(([title, copy]) => card(title, copy, "engine-card")).join("")}
      </div>
    </section>
  `;
}

function riskPanel() {
  return `
    <section class="risk-panel">
      <span class="eyebrow">Key risks and mitigation</span>
      <div class="risk-table">
        ${risks.map(([tag, risk, why, mitigation]) => `
          <article class="risk-row">
            <span class="risk-tag">${tag}</span>
            <strong>${risk}</strong>
            <p>${why}</p>
            <p>${mitigation}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function pageFour() {
  return pageShell(
    4,
    "Commercials + Operating Model + Risks",
    "A program platform, not just a checkout button.",
    `
      <div class="commercial-title">
        <h1>A program platform, not just a checkout button.</h1>
        <p>Pay4 combines checkout orchestration, issuer programs, pricing, settlement and reconciliation into one operating model.</p>
      </div>
      <div class="commercial-grid">
        ${partyModelCards()}
        ${commercialWaterfall()}
      </div>
      <div class="ops-risk-grid">
        ${enginePanel()}
        ${riskPanel()}
      </div>
      <section class="final-cta">
        <div>
          <span class="eyebrow">Launch proposition</span>
          <h2>Make affordability the default checkout behavior.</h2>
          <p>Pay4 brings a simple promise to online commerce: customers pay in 4, merchants get paid upfront, and banks grow credit-card-led repayment volume.</p>
        </div>
        <div class="cta-actions">
          <a href="${import.meta.env.BASE_URL}?entry=pg&variant=b&user=first&eligible=true&outcome=success&step=checkout">Activate Pay4 for your checkout</a>
          <a href="${import.meta.env.BASE_URL}">Talk to Pine Labs</a>
        </div>
      </section>
    `,
    "commercial-page"
  );
}

function renderBrochure() {
  app.innerHTML = `
    <main class="brochure-booklet">
      <nav class="brochure-nav" aria-label="Brochure navigation">
        <div class="nav-brand">
          ${pay4Logo("nav-pay4-logo")}
          ${pineLabsWordmark()}
        </div>
        <div class="nav-links">
          <a href="#page-1">01</a>
          <a href="#page-2">02</a>
          <a href="#page-3">03</a>
          <a href="#page-4">04</a>
          <a class="prototype-link" href="${import.meta.env.BASE_URL}?entry=merchant&variant=b&user=first&eligible=true&outcome=success&step=product">Prototype</a>
        </div>
      </nav>
      <div id="page-1">${pageOne()}</div>
      <div id="page-2">${pageTwo()}</div>
      <div id="page-3">${pageThree()}</div>
      <div id="page-4">${pageFour()}</div>
    </main>
  `;
}

renderBrochure();
