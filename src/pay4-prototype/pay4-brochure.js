const app = document.querySelector("#brochure-app");

const ASSETS = {
  pay4: `${import.meta.env.BASE_URL}assets/pay4-logo-by-pinelabs.png`
};

const issuerNames = ["HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak", "SBI Card"];

const customerBenefits = [
  ["Smaller upfront payment", "Turn a ₹40,000 decision into a ₹10,000 today decision."],
  ["Simple structure", "No tenure maze. No complex EMI discovery. Just 4 clear payments."],
  ["Credit-card led", "Works through eligible credit cards from participating issuers."],
  ["Transparent checkout", "Payment schedule, today’s amount and processing fee are shown before authentication."]
];

const merchantBenefits = [
  ["Higher conversion", "Reduce checkout hesitation by lowering the upfront payment burden."],
  ["Higher AOV", "Help customers upgrade to higher-value carts when the payment is split."],
  ["Lower discount dependency", "Use affordability instead of always relying on coupons and markdowns."],
  ["Upfront settlement", "Merchant receives full order value upfront, net of Pay4 commercial charges."],
  ["No repayment risk", "Customer repayment is managed by the issuing bank."],
  ["Cleaner checkout", "Pay4 appears as a payment mode, not as a complicated EMI submenu."]
];

const journeySteps = [
  ["Customer reaches checkout", "Pay4 appears as a payment mode alongside UPI, Cards, Net Banking and Wallets."],
  ["Customer selects Pay4", "Customer sees ₹10,000 × 4 months for a ₹40,000 purchase."],
  ["Customer chooses credit card", "Customer selects a saved eligible credit card or adds a new credit card."],
  ["Customer authenticates", "Bank authentication happens through standard card authentication."],
  ["Merchant gets paid", "Order is marked paid for the full amount. Bank manages future payments."]
];

const categories = [
  ["Furniture", "Upgrade-led purchases with higher cart values."],
  ["Mattresses", "Considered purchases where affordability can accelerate decisioning."],
  ["Fashion & lifestyle", "Premiumization without deep discounting."],
  ["Travel", "High-intent bookings with flexibility needs."],
  ["Healthcare & wellness", "Planned and semi-planned spends that benefit from split payments."],
  ["Education & upskilling", "Course and upskilling payments with affordability needs."],
  ["Eyewear", "Mid-ticket premium purchases with upgrade potential."],
  ["Premium retail", "AOV expansion through lower upfront payment."]
];

const integrationOptions = [
  [
    "Hosted Checkout Activation",
    "Best for merchants already using Pine Labs hosted checkout.",
    "Pay4 can be enabled as a payment mode through merchant configuration. No front-end build is required for basic acceptance."
  ],
  [
    "Pay4 Affordability Widget",
    "Best for merchants who want Pay4 discovery before checkout.",
    "A lightweight widget can show “Pay ₹10,000 × 4 with Pay4” on product pages, cart pages and checkout pages."
  ],
  [
    "Pay4 Checkout API",
    "Best for large merchants with custom checkout.",
    "Merchants can call Pay4 eligibility and pricing APIs to render Pay4 natively within their checkout."
  ]
];

const engineCards = [
  ["Checkout Engine", "Displays Pay4, captures consent and routes to card authentication."],
  ["Pricing Engine", "Calculates merchant fee, customer processing fee, subvention, taxes and settlement impact."],
  ["Bank Program Engine", "Maintains issuer eligibility, BIN rules, scheme codes, booking mode and refund capabilities."],
  ["Settlement Engine", "Settles merchant upfront, net of Pay4 charges, and tracks bank/acquirer settlement."],
  ["Reporting and Reconciliation Engine", "Provides merchant reports, bank reports, transaction status, refunds and program fee receivables."]
];

const risks = [
  ["Customer confusion", "Customer may not understand card limit usage, future deductions or processing fee.", "Clear schedule, processing fee disclosure and confirmation messaging."],
  ["Bank rail inconsistency", "Different issuers may implement Pay4 through different rails.", "Bank-wise adapters with one consistent customer proposition."],
  ["Refund complexity", "Full and partial refunds require coordination between merchant, Pine Labs and issuer.", "Certify refund behavior bank-wise before enabling partial refunds."],
  ["Processing fee friction", "Bank-wise fees may hurt conversion for lower tickets.", "Show exact fee before authentication and tune minimum order thresholds."],
  ["Settlement mismatch", "Pine Labs may receive acquirer settlement on auth amount but settle merchant on purchase amount less Pay4 fee.", "Dedicated Pay4 ledger and settlement reconciliation."],
  ["Bank program fee receivable risk", "Pay4 economics depend on issuer program fee collection.", "Monthly invoicing, receivables tracking and bank-wise reconciliation."],
  ["Unsupported card frustration", "Customers may try debit cards or unsupported credit cards.", "Show supported issuers before card entry and validate BIN early."],
  ["Over-positioning as BNPL", "Pay4 should not be perceived as separate underwriting-led lending.", "Position as credit-card-funded Pay-in-4 with issuer-managed repayment."]
];

function pay4Logo(className = "pay4-logo") {
  return `<img class="${className}" src="${ASSETS.pay4}" alt="Pay4 by Pine Labs" />`;
}

function pineLabsWordmark() {
  return `<span class="pine-wordmark">Pine Labs</span>`;
}

function pageShell(number, kicker, title, content, modifier = "") {
  return `
    <section class="brochure-sheet ${modifier}" aria-label="Page ${number}: ${title}">
      <header class="sheet-header">
        <div class="brand-row">
          ${pay4Logo("sheet-pay4-logo")}
          ${pineLabsWordmark()}
        </div>
        <div class="page-meta">
          <span>${kicker}</span>
          <strong>${String(number).padStart(2, "0")}</strong>
        </div>
      </header>
      ${content}
      <footer class="sheet-footer">
        <span>Pay4 by Pine Labs</span>
        <span>Credit-card-funded affordability for online checkout.</span>
      </footer>
    </section>
  `;
}

function card(title, copy, className = "") {
  return `
    <article class="info-card ${className}">
      <h3>${title}</h3>
      <p>${copy}</p>
    </article>
  `;
}

function pageOne() {
  return pageShell(
    1,
    "What is Pay4",
    "Affordability, built into checkout.",
    `
      <div class="cover-grid">
        <div class="cover-copy">
          <div class="cover-brand">
            ${pay4Logo("cover-pay4-logo")}
            ${pineLabsWordmark()}
          </div>
          <h1>Affordability, built into checkout.</h1>
          <p class="lead">Pay4 lets customers split online purchases into 4 simple payments using eligible credit cards, while merchants get paid upfront.</p>
          <div class="proof-chip-row">
            <span>Credit cards only</span>
            <span>Merchant paid upfront</span>
            <span>Built for online checkout</span>
          </div>
        </div>
        ${checkoutMockup()}
      </div>

      <div class="explainer-panel">
        <div>
          <span class="section-kicker">What is Pay4?</span>
          <p>Pay4 is a standalone online checkout payment mode that lets eligible credit-card customers split a purchase into four simple payments. The customer completes payment using standard card authentication, the merchant receives full order value upfront, and the issuing bank manages the repayment schedule.</p>
        </div>
        <div class="mini-model">
          ${card("Customer", "Pays one-fourth today and the rest over the next 3 months.")}
          ${card("Merchant", "Receives full order value upfront, net of Pay4 charges.")}
          ${card("Bank", "Drives incremental credit-card spend and short-tenure repayment volume.")}
        </div>
      </div>
    `,
    "cover-sheet"
  );
}

function checkoutMockup() {
  return `
    <aside class="checkout-mockup" aria-label="Pay4 checkout mockup">
      <div class="mock-browser">
        <span></span>
        <strong>gateway.plural.com</strong>
      </div>
      <div class="mock-header">
        <span>Merchant</span>
        <strong>Stanley Living</strong>
        <span>Total Payable</span>
        <strong class="mock-amount">₹40,000</strong>
      </div>
      <div class="mock-pay4-card">
        <div class="mock-pay4-head">
          ${pay4Logo("mock-pay4-logo")}
          <span>NEW</span>
        </div>
        <p>Payment Mode: Pay4 by Pine Labs</p>
        <div class="mock-tiles">
          <div><span>Pay in 4 Payments</span><strong>₹10,000 × 4 months</strong></div>
          <div><span>Pay Today</span><strong>₹10,099</strong></div>
        </div>
        <div class="issuer-strip">
          <span>HDFC Bank</span>
          <span>ICICI Bank</span>
          <span>Axis Bank</span>
          <span>Kotak</span>
          <span>SBI Card <small>Coming soon</small></span>
        </div>
      </div>
    </aside>
  `;
}

function pageTwo() {
  return pageShell(
    2,
    "Customer + Merchant Pitch",
    "From “not now” to “paid now”.",
    `
      <div class="title-block">
        <h1>From “not now” to “paid now”.</h1>
        <p>Pay4 reframes a high upfront amount into a simple four-payment decision for customers, while giving merchants an affordability lever that does not depend on discounting.</p>
      </div>

      <div class="two-column-story">
        <section>
          <span class="section-kicker">Why customers choose Pay4</span>
          <p class="section-copy">Customers do not always abandon because they do not want the product. They abandon because the full upfront amount feels too high. Pay4 reframes the decision from paying the full amount today to paying one-fourth today.</p>
          <div class="benefit-grid customer-grid">
            ${customerBenefits.map(([title, copy]) => card(title, copy)).join("")}
          </div>
          <div class="before-after">
            <div>
              <span>Before</span>
              <strong>Pay ₹40,000 today</strong>
            </div>
            <div class="arrow-line">→</div>
            <div>
              <span>After</span>
              <strong>Pay ₹10,000 today + 3 monthly payments</strong>
            </div>
          </div>
        </section>

        <section>
          <span class="section-kicker">Why merchants activate Pay4</span>
          <p class="section-copy">Pay4 gives merchants an affordability lever without making discounting the only conversion tool.</p>
          <div class="benefit-grid merchant-grid">
            ${merchantBenefits.map(([title, copy]) => card(title, copy, "compact-card")).join("")}
          </div>
          <div class="comparison-card">
            <div>
              <span>Without Pay4</span>
              <p>Full upfront amount. Customer asks for discount. Merchant loses margin or loses sale.</p>
            </div>
            <div>
              <span>With Pay4</span>
              <p>One-fourth upfront. Customer completes purchase. Merchant gets paid upfront.</p>
            </div>
          </div>
        </section>
      </div>
    `,
    "pitch-sheet"
  );
}

function pageThree() {
  return pageShell(
    3,
    "Journey + Categories + Integration",
    "A checkout journey built for affordability.",
    `
      <div class="title-block compact-title">
        <h1>A checkout journey built for affordability.</h1>
        <p>Pay4 is designed to surface as a standalone online payment mode, then move customers through a familiar card-funded authentication flow.</p>
      </div>

      <div class="journey-row">
        ${journeySteps.map(([title, copy], index) => `
          <article class="journey-step">
            <span>${index + 1}</span>
            <h3>${title}</h3>
            <p>${copy}</p>
          </article>
        `).join("")}
      </div>

      <div class="journey-content-grid">
        ${pay4ModuleMockup()}
        <section class="category-panel">
          <span class="section-kicker">Built for mid-ticket online commerce.</span>
          <p>Pay4 is best suited for categories where customers have purchase intent, but the upfront payment creates hesitation.</p>
          <div class="category-grid">
            ${categories.map(([title, copy]) => card(title, copy, "category-card")).join("")}
          </div>
        </section>
      </div>

      <section class="integration-panel">
        <div class="integration-head">
          <span class="section-kicker">Designed for seamless merchant activation.</span>
          <strong>One activation. One payment mode. One settlement experience.</strong>
        </div>
        <div class="integration-options">
          ${integrationOptions.map(([title, bestFor, copy]) => `
            <article>
              <h3>${title}</h3>
              <strong>${bestFor}</strong>
              <p>${copy}</p>
            </article>
          `).join("")}
        </div>
        <div class="integration-flow">
          ${["Merchant site/app", "Pay4 availability and pricing", "Pay4 checkout selection", "Card authentication", "Payment success callback", "Settlement and reporting"].map((item) => `<span>${item}</span>`).join("")}
        </div>
      </section>
    `,
    "journey-sheet"
  );
}

function pay4ModuleMockup() {
  return `
    <aside class="module-mockup">
      <div class="mock-pay4-head">
        ${pay4Logo("mock-pay4-logo")}
        <span>NEW</span>
      </div>
      <p>Pay one-fourth now and the rest over the next 3 months.</p>
      <div class="mock-tiles">
        <div><span>Pay in 4 Payments</span><strong>₹10,000 × 4 Payments</strong></div>
        <div><span>Pay Today</span><strong>₹10,099</strong></div>
      </div>
      <div class="mini-issuer-row">
        <strong>Accepted with these credit card issuers</strong>
        <div>
          <span>HDFC Bank</span>
          <span>ICICI Bank</span>
          <span>Axis Bank</span>
          <span>Kotak</span>
          <span>SBI Card <small>Coming Soon</small></span>
        </div>
      </div>
      <div class="add-card-preview">
        <span>Add eligible credit card</span>
        <button type="button">Pay ₹10,099 now</button>
      </div>
    </aside>
  `;
}

function pageFour() {
  return pageShell(
    4,
    "Commercials + Operating Model + Risks",
    "Built as a program platform, not just a checkout button.",
    `
      <div class="title-block compact-title">
        <h1>Built as a program platform, not just a checkout button.</h1>
        <p>Pay4 brings together checkout orchestration, issuer programs, pricing, settlement and reconciliation in one operating model.</p>
      </div>

      <div class="commercial-layout">
        <section class="party-model">
          <span class="section-kicker">Commercial model snapshot</span>
          <div class="party-grid">
            ${card("Customer", "Pays in 4 using eligible credit card. Issuer-specific processing fee may apply.")}
            ${card("Merchant", "Pays a single Pay4 fee deducted from settlement.")}
            ${card("Issuer bank", "Books Pay4/EMI construct, manages repayment and participates through bank program economics.")}
            ${card("Pine Labs", "Orchestrates checkout, bank integration, pricing, settlement, reporting and reconciliation.")}
          </div>
        </section>

        <section class="commercial-flow-card">
          <span class="section-kicker">For every ₹100 Pay4 purchase</span>
          <div class="money-stack">
            <div><span>Merchant-facing Pay4 fee</span><strong>4.00</strong></div>
            <div><span>Merchant settlement</span><strong>96.00</strong></div>
            <div><span>Pay4 subvention / no-cost EMI bridge</span><strong>~3.25</strong></div>
            <div><span>Card/acquirer cost on auth amount</span><strong>~1.60</strong></div>
            <div><span>Bank program fee receivable</span><strong>~1.70</strong></div>
            <div class="highlight"><span>Illustrative Pine Labs gross margin</span><strong>~1.05</strong></div>
          </div>
          <p>Figures are illustrative and subject to bank-wise commercials, acquirer cost, merchant pricing and final program terms.</p>
        </section>
      </div>

      <section class="mechanics-panel">
        <span class="section-kicker">Commercial mechanics, simplified</span>
        <div class="mechanics-flow">
          ${["Purchase amount: ₹100", "Subvention / ISV: ~₹3.25", "Auth amount: ₹96.75", "Acquirer settlement after buy rate: ~₹95.10", "Merchant settlement: ₹96.00", "Bank program fee receivable: ~₹1.70", "Illustrative margin: ~₹1.05"].map((item) => `<span>${item}</span>`).join("")}
        </div>
        <div class="definition-grid">
          ${card("Subvention / ISV", "The affordability bridge that enables a no-cost customer experience.")}
          ${card("Auth amount", "Purchase amount after subvention.")}
          ${card("Acquirer buy rate", "Card processing cost deducted on the auth amount.")}
          ${card("Bank program fee", "Issuer-side commercial receivable paid to Pine Labs for program participation.")}
          ${card("Merchant Pay4 fee", "Single merchant-facing charge deducted from settlement.")}
        </div>
      </section>

      <div class="operating-risk-grid">
        <section class="engine-panel">
          <span class="section-kicker">Operating model</span>
          <div class="engine-grid">
            ${engineCards.map(([title, copy]) => card(title, copy, "engine-card")).join("")}
          </div>
        </section>

        <section class="risk-panel">
          <span class="section-kicker">Key risks and mitigation</span>
          <div class="risk-table">
            <div class="risk-head"><span>Risk</span><span>Why it matters</span><span>Mitigation</span></div>
            ${risks.map(([risk, why, mitigation]) => `
              <div class="risk-row">
                <strong>${risk}</strong>
                <span>${why}</span>
                <span>${mitigation}</span>
              </div>
            `).join("")}
          </div>
        </section>
      </div>

      <section class="final-cta">
        <h2>Make affordability the default checkout behavior.</h2>
        <p>Pay4 brings a simple promise to online commerce: customers pay in 4, merchants get paid upfront, and banks grow credit-card-led repayment volume. Built into Pine Labs Online PG, Pay4 can become the affordability layer for India’s next wave of digital commerce.</p>
        <div>
          <a href="${import.meta.env.BASE_URL}?entry=pg&variant=b&user=first&eligible=true&outcome=success&step=checkout">Activate Pay4 for your checkout</a>
          <a href="${import.meta.env.BASE_URL}">Talk to Pine Labs</a>
        </div>
      </section>
    `,
    "commercial-sheet"
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
        <div>
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
