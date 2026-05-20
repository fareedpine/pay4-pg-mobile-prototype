const app = document.querySelector("#app");

if (window.__pay4PrototypeCleanup) {
  window.__pay4PrototypeCleanup();
}

const ASSETS = {
  pay4: `${import.meta.env.BASE_URL}assets/pay4-logo-by-pinelabs.png`,
  stanley: new URL("./assets/stanley-living-logo.svg", import.meta.url).href,
  hdfc: new URL("./assets/hdfc-bank-logo.svg", import.meta.url).href,
  icici: new URL("./assets/icici-bank-logo.svg", import.meta.url).href,
  axis: new URL("./assets/axis-bank-logo.svg", import.meta.url).href,
  kotak: new URL("./assets/kotak-bank-logo.svg", import.meta.url).href,
  sbi: new URL("./assets/sbi-card-logo.svg", import.meta.url).href
};

const MERCHANT = "Stanley Living";
const PRODUCT = "Handwoven Wool Carpet";
const ORDER_AMOUNT = 40000;
const SPLIT_AMOUNT = 10000;
const PROCESSING_FEE = 99;
const PAY_TODAY = 10099;
const PROCESSING_DELAY_MS = 2200;
const SAVED_CARD = "HDFC Bank Credit Card ending 1234";

const VARIANTS = {
  a: "Minimal trusted checkout",
  b: "Offer-led Pay4-first checkout",
  c: "Payment-method-first checkout",
  d: "Mobile-first repeat checkout"
};

const CARD_STATES = {
  hdfc: { id: "hdfc", name: "HDFC Bank", type: "credit", eligible: true },
  icici: { id: "icici", name: "ICICI Bank", type: "credit", eligible: true },
  axis: { id: "axis", name: "Axis Bank", type: "credit", eligible: true },
  kotak: { id: "kotak", name: "Kotak", type: "credit", eligible: true },
  sbi: { id: "sbi", name: "SBI Card", type: "credit", eligible: false, comingSoon: true },
  debit: { id: "debit", name: "Debit Card", type: "debit", eligible: false },
  unsupported: { id: "unsupported", name: "Unsupported Credit Card", type: "credit", eligible: false }
};

const GENERIC_ELIGIBLE_CARD = { id: "eligible", name: "Eligible", type: "credit", eligible: true };
const SUPPORTED_CREDIT_CARDS = ["hdfc", "icici", "axis", "kotak"];

const ISSUER_LOGOS = [
  { id: "hdfc", name: "HDFC Bank", src: ASSETS.hdfc },
  { id: "icici", name: "ICICI Bank", src: ASSETS.icici },
  { id: "axis", name: "Axis Bank", src: ASSETS.axis },
  { id: "kotak", name: "Kotak", src: ASSETS.kotak },
  { id: "sbi", name: "SBI Card", src: ASSETS.sbi, soon: true }
];

const PAYMENT_METHODS = [
  { id: "pay4", name: "Pay4", helper: "By Pine Labs · Pay in 4 simple payments", icon: "pay4" },
  { id: "upi", name: "UPI", helper: "PhonePe, GooglePay, PayTM, CRED & more", icon: "upi" },
  { id: "cards", name: "Cards", helper: "Visa, MasterCard, RuPay & more", icon: "cards" },
  { id: "emi", name: "EMI", helper: "Credit, Debit & Cardless EMIs", icon: "emi" },
  { id: "netbanking", name: "Net Banking", helper: "All major banks", icon: "netbanking" },
  { id: "wallets", name: "Wallets", helper: "Paytm, PhonePe and more", icon: "wallets" }
];

const PAYMENT_METHOD_ORDER = {
  default: ["pay4", "upi", "cards", "emi", "netbanking", "wallets"],
  c: ["upi", "cards", "emi", "pay4", "netbanking", "wallets"]
};

const PAY4_BENEFITS = [
  { icon: "percent", label: "Interest-free" },
  { icon: "rupee", label: "No hidden<br />charges" },
  { icon: "shield", label: "Safe &<br />secure" },
  { icon: "badge-check", label: "Trusted by<br />Pine Labs" }
];

const REASONS = {
  amount: "Pay4 is not available for this order amount. Please choose another payment method.",
  bank: "This card is not eligible for Pay4. Try an HDFC, ICICI, Axis or Kotak credit card.",
  merchant: "Pay4 is not available for this merchant. Please choose another payment method.",
  debit: "Pay4 is available only on eligible credit cards.",
  auth: "Authentication failed. Try again or choose another payment method.",
  sbi: "SBI Card is coming soon for Pay4."
};

const DEFAULT_STATE = {
  entry: "merchant",
  variant: "b",
  user: "first",
  eligible: "true",
  outcome: "success",
  card: "hdfc",
  cardEntered: "false",
  alternateCard: "false",
  reason: "amount",
  step: "product",
  method: "pay4",
  consent: "false",
  retry: "false"
};

let state = readState();
let formState = createEmptyFormState();
let processingTimer = null;
let processingRunId = 0;
let controlsOpen = false;
let supportedBanksOpen = false;
let copyStatus = "";

function createEmptyFormState() {
  return {
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: ""
  };
}

function clearFormState() {
  formState = createEmptyFormState();
}

function readState() {
  const params = new URLSearchParams(window.location.search);
  const next = { ...DEFAULT_STATE };

  Object.keys(next).forEach((key) => {
    if (params.has(key)) next[key] = params.get(key);
  });

  if (params.has("issuer") && !params.has("card")) {
    next.card = params.get("issuer");
  }

  if (!["merchant", "pg"].includes(next.entry)) next.entry = DEFAULT_STATE.entry;
  if (!VARIANTS[next.variant]) next.variant = DEFAULT_STATE.variant;
  if (!["first", "repeat"].includes(next.user)) next.user = DEFAULT_STATE.user;
  if (!["true", "false"].includes(next.eligible)) next.eligible = DEFAULT_STATE.eligible;
  if (!["success", "failure"].includes(next.outcome)) next.outcome = DEFAULT_STATE.outcome;
  if (!CARD_STATES[next.card]) next.card = DEFAULT_STATE.card;
  if (!["true", "false"].includes(next.cardEntered)) next.cardEntered = DEFAULT_STATE.cardEntered;
  if (!["true", "false"].includes(next.alternateCard)) next.alternateCard = DEFAULT_STATE.alternateCard;
  if (!REASONS[next.reason]) next.reason = DEFAULT_STATE.reason;
  if (next.step === "failure") next.step = "failed";
  if (!["product", "cart", "checkout", "pay4", "processing", "success", "failed", "fallback"].includes(next.step)) {
    next.step = next.entry === "merchant" ? "product" : "checkout";
  }
  if (!PAYMENT_METHODS.some((method) => method.id === next.method)) next.method = "pay4";
  if (!["true", "false"].includes(next.consent)) next.consent = DEFAULT_STATE.consent;
  if (!["true", "false"].includes(next.retry)) next.retry = DEFAULT_STATE.retry;

  return next;
}

function updateState(patch, options = {}) {
  state = { ...state, ...patch };
  const params = new URLSearchParams();

  Object.entries(state).forEach(([key, value]) => {
    if (value !== "" && value !== undefined && value !== null) {
      params.set(key, String(value));
    }
  });

  const nextUrl = `${window.location.pathname}?${params.toString()}`;
  if (options.push) window.history.pushState({}, "", nextUrl);
  else window.history.replaceState({}, "", nextUrl);

  render();
}

function resetDemo() {
  controlsOpen = false;
  supportedBanksOpen = false;
  copyStatus = "";
  state = { ...DEFAULT_STATE };
  clearFormState();
  window.history.replaceState({}, "", window.location.pathname);
  render();
}

function formatMoney(value, decimals = 0) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

function cardState() {
  return CARD_STATES[state.card] || CARD_STATES.hdfc;
}

function cardNumberDigits() {
  return formState.cardNumber.replace(/\D/g, "");
}

function cardFromNumber() {
  const digits = cardNumberDigits();

  if (!digits) return null;
  if (digits.startsWith("411111")) return CARD_STATES.hdfc;
  if (digits.startsWith("422222")) return CARD_STATES.icici;
  if (digits.startsWith("433333")) return CARD_STATES.axis;
  if (digits.startsWith("444444")) return CARD_STATES.kotak;
  if (digits.startsWith("555555")) return CARD_STATES.sbi;
  if (digits.startsWith("6")) return CARD_STATES.debit;
  if (digits.length >= 6) return CARD_STATES.unsupported;
  return null;
}

function detectedCardState() {
  if (isRepeatUser() && !isUsingAnotherCard()) return CARD_STATES.hdfc;
  if (!orderEligible()) return cardState();
  if (state.cardEntered === "true" && SUPPORTED_CREDIT_CARDS.includes(state.card)) return cardState();
  if (cardNumberComplete()) return GENERIC_ELIGIBLE_CARD;
  return null;
}

function isRepeatUser() {
  return state.user === "repeat";
}

function orderEligible() {
  return state.eligible === "true";
}

function isUsingAnotherCard() {
  return isRepeatUser() && state.alternateCard === "true";
}

function cardNumberComplete() {
  return cardNumberDigits().length === 16;
}

function expiryComplete() {
  return /^\d{2}\/\d{4}$/.test(formState.expiry);
}

function cvvComplete() {
  return /^\d{3}$/.test(formState.cvv);
}

function cardNameComplete() {
  return formState.cardName.trim().length > 0;
}

function consentAccepted() {
  return state.consent === "true";
}

function cardEligible() {
  if (isRepeatUser() && !isUsingAnotherCard()) return orderEligible();
  const card = detectedCardState();
  return orderEligible() && Boolean(card) && card.eligible;
}

function hasCardDetection() {
  if (isRepeatUser() && !isUsingAnotherCard()) return true;
  return Boolean(detectedCardState());
}

function formFieldsComplete() {
  return cardNumberComplete() && expiryComplete() && cvvComplete() && cardNameComplete();
}

function pay4Ready() {
  if (isRepeatUser() && !isUsingAnotherCard()) return !pay4UnavailableMessage();
  return cardEligible() && formFieldsComplete() && consentAccepted();
}

function pay4UnavailableMessage() {
  if (orderEligible()) return "";
  if (state.reason === "amount") return REASONS.amount;
  if (state.reason === "merchant") return REASONS.merchant;
  if (state.reason === "debit" || state.card === "debit") return REASONS.debit;
  if (state.card === "sbi") return REASONS.sbi;
  if (state.card === "unsupported" || state.reason === "bank") return REASONS.bank;
  return "";
}

function cardHelperMessage() {
  const message = pay4UnavailableMessage();
  if (!hasCardDetection()) return "Enter an eligible credit card to continue with Pay4.";
  if (message) return message;
  return "";
}

function isPay4Selected() {
  return state.method === "pay4";
}

function cancelProcessingTimer() {
  processingRunId += 1;
  if (processingTimer) {
    window.clearInterval(processingTimer);
    processingTimer = null;
  }
}

function startProcessing() {
  if (pay4UnavailableMessage()) return;
  if (!pay4Ready()) return;

  cancelProcessingTimer();
  updateState({ entry: "pg", step: "processing", method: "pay4" });
  scheduleProcessingCompletion(() => (state.outcome === "failure" ? "failed" : "success"));
}

function retryPay4() {
  cancelProcessingTimer();
  updateState({ entry: "pg", outcome: "success", retry: "true", step: "processing", method: "pay4" });
  scheduleProcessingCompletion(() => "success");
}

function scheduleProcessingCompletion(resolveStep) {
  const runId = processingRunId;
  const finishAt = Date.now() + PROCESSING_DELAY_MS;

  processingTimer = window.setInterval(() => {
    if (runId !== processingRunId) return;
    if (Date.now() < finishAt) return;

    window.clearInterval(processingTimer);
    processingTimer = null;
    updateState({ step: resolveStep() });
  }, 100);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function currentUrl() {
  return window.location.href;
}

function formValue(field) {
  return escapeHtml(formState[field] || "");
}

async function copyCurrentLink() {
  const text = currentUrl();
  try {
    await navigator.clipboard.writeText(text);
    copyStatus = "Copied";
  } catch {
    copyStatus = "Copy unavailable";
  }
  render();
}

function render() {
  app.innerHTML = `
    <main class="app-shell ${controlsOpen ? "controls-open" : ""}">
      <section class="demo-stage" aria-label="Prototype preview">
        <div class="prototype-label">
          <span>${state.entry === "merchant" ? "Stanley Living" : "Pine Labs PG Mobile"}</span>
          <strong>${state.entry === "merchant" ? "Merchant app entry" : "Secure checkout"}</strong>
        </div>
        ${phoneShell()}
      </section>
      <button class="demo-toggle" type="button" data-action="toggle-controls">Demo Controls</button>
      ${controlsOpen ? demoControls() : ""}
    </main>
  `;
}

function phoneShell() {
  const merchantMode = state.entry === "merchant" && ["product", "cart"].includes(state.step);
  return `
    <section class="phone-shell ${merchantMode ? "merchant-phone" : "pg-phone"} variant-${state.variant}" aria-label="${merchantMode ? "Stanley Living app" : "Plural PG mobile checkout"}">
      ${statusBar()}
      ${merchantMode ? merchantContent() : pgContent()}
    </section>
  `;
}

function statusBar() {
  return `
    <div class="status-bar">
      <span>9:41</span>
      <span class="status-icons" aria-hidden="true">
        <span class="signal"></span>
        <span class="wifi"></span>
        <span class="battery"></span>
      </span>
    </div>
  `;
}

function merchantContent() {
  return `
    <div class="merchant-app">
      ${merchantAppHeader()}
      ${state.step === "cart" ? merchantCartScreen() : merchantProductScreen()}
    </div>
  `;
}

function merchantAppHeader() {
  return `
    <header class="merchant-app-header">
      <div class="merchant-brand-lockup">
        ${logoImage("stanley-logo", ASSETS.stanley, "Stanley Living", "Stanley Living")}
        <div class="merchant-brand-copy">
          <strong>Stanley Living</strong>
          <span>Living Studio</span>
        </div>
      </div>
      <button class="merchant-icon-button" type="button" aria-label="Shopping bag">${lineIcon("bag")}</button>
    </header>
  `;
}

function merchantProductScreen() {
  return `
    <section class="merchant-product">
      <div class="product-visual premium-product-visual" aria-label="Handwoven wool carpet product preview">
        <div class="editorial-wall"></div>
        <div class="product-art-card">
          <div class="product-art-meta">
            <span>Natural Wool</span>
            <strong>Handwoven Texture</strong>
          </div>
          <div class="woven-carpet">
            <span class="weave-line line-one"></span>
            <span class="weave-line line-two"></span>
            <span class="weave-line line-three"></span>
            <span class="carpet-border"></span>
          </div>
          <div class="carpet-fringe left"></div>
          <div class="carpet-fringe right"></div>
        </div>
        <div class="material-card">
          <span></span>
          <div>
            <strong>Warm Sand</strong>
            <small>8 x 10 ft</small>
          </div>
        </div>
      </div>
      <div class="merchant-product-copy">
        <span>New Collection</span>
        <h1>Handwoven Wool Carpet</h1>
        <p>Soft natural texture, crafted for warm living rooms and calm corners.</p>
        <strong>${formatMoney(ORDER_AMOUNT)}</strong>
      </div>
      <div class="merchant-bottom-cta">
        <button class="secondary-button" type="button" data-action="go-cart">Add To Cart</button>
        <button class="primary-button" type="button" data-action="go-cart">Buy Now</button>
      </div>
    </section>
  `;
}

function merchantCartScreen() {
  return `
    <section class="merchant-cart">
      <button class="back-button dark" type="button" data-action="go-product">‹ Product</button>
      <div class="cart-card">
        <div class="cart-thumb"><div class="mini-carpet"></div></div>
        <div>
          <h1>${PRODUCT}</h1>
          <p>Natural wool · 8 x 10 ft</p>
          <strong>${formatMoney(ORDER_AMOUNT)}</strong>
        </div>
      </div>
      <div class="address-card">
        <span>Deliver To</span>
        <strong>Home · Indiranagar, Bengaluru</strong>
        <small>Estimated delivery in 5-7 days</small>
      </div>
      <div class="cart-summary">
        <div><span>Subtotal</span><strong>${formatMoney(ORDER_AMOUNT)}</strong></div>
        <div><span>Delivery</span><strong>FREE</strong></div>
        <div><span>Total</span><strong>${formatMoney(ORDER_AMOUNT)}</strong></div>
      </div>
      <div class="merchant-bottom-cta">
        <button class="primary-button" type="button" data-action="proceed-pg">Proceed to Pay ${formatMoney(ORDER_AMOUNT)}</button>
      </div>
    </section>
  `;
}

function pgContent() {
  const bottomCta = fixedBottomCta();
  return `
    ${browserBar()}
    ${pgHeader()}
    <div class="screen-body ${bottomCta ? "with-bottom-cta" : ""}">
      ${screenContent()}
    </div>
    ${bottomCta}
    ${supportedBanksOpen ? supportedBanksSheet() : ""}
  `;
}

function browserBar() {
  return `
    <div class="browser-bar">
      <span class="lock-dot" aria-hidden="true"></span>
      <span>gateway.plural.com</span>
    </div>
  `;
}

function pgHeader() {
  return `
    <header class="pg-header">
      <div class="merchant-line">
        <span class="pg-logo-box">${logoImage("pg-merchant-logo", ASSETS.stanley, MERCHANT, MERCHANT)}</span>
        <div>
          <span class="merchant-label">Paying To</span>
          <strong>${MERCHANT}</strong>
        </div>
        <button class="header-help" type="button" aria-label="Help">?</button>
      </div>
      <div class="amount-line">
        <span>Total Payable</span>
        <strong>${formatMoney(ORDER_AMOUNT)}</strong>
      </div>
      <details class="order-summary">
        <summary>Order Summary</summary>
        <div class="summary-grid">
          <span>${PRODUCT}</span>
          <strong>${formatMoney(ORDER_AMOUNT)}</strong>
          <span>Delivery</span>
          <strong>FREE</strong>
          <span>Total Amount</span>
          <strong>${formatMoney(ORDER_AMOUNT)}</strong>
        </div>
      </details>
      <div class="secure-line">100% secure payments powered by Pine Labs</div>
    </header>
  `;
}

function screenContent() {
  if (state.step === "processing") return processingScreen();
  if (state.step === "success") return successScreen();
  if (state.step === "failed") return failureScreen();
  if (state.step === "pay4") return pay4DetailScreen();
  if (state.step === "fallback") return fallbackScreen();
  return checkoutScreen();
}

function checkoutScreen() {
  if (state.variant === "a") return checkoutVariantA();
  if (state.variant === "c") return checkoutVariantC();
  if (state.variant === "d") return checkoutVariantD();
  return checkoutVariantB();
}

function checkoutVariantA() {
  return `
    <section class="screen-section checkout-variant checkout-variant-a">
      <div class="section-heading">
        <span>Trusted Payment</span>
        <h1>Choose How to Pay</h1>
      </div>
      ${paymentMethodList({ expandedPay4: false, mode: "minimal" })}
      <div class="variant-note trusted-note">Pay securely with Pine Labs. Pay4 is available as a standalone payment mode.</div>
    </section>
  `;
}

function checkoutVariantB() {
  return `
    <section class="screen-section checkout-variant checkout-variant-b">
      <div class="section-heading">
        <span>Recommended</span>
        <h1>Choose How to Pay</h1>
      </div>
      ${paymentMethodList({ expandedPay4: true, mode: "offer" })}
    </section>
  `;
}

function checkoutVariantC() {
  return `
    <section class="screen-section checkout-variant checkout-variant-c">
      <div class="section-heading">
        <span>All Payment Modes</span>
        <h1>Choose How to Pay</h1>
      </div>
      ${paymentMethodList({ expandedPay4: false, mode: "balanced" })}
    </section>
  `;
}

function checkoutVariantD() {
  return `
    <section class="screen-section compact-section checkout-variant checkout-variant-d">
      <div class="section-heading compact-heading">
        <span>Saved Pay4</span>
        <h1>Quick Pay4 Checkout</h1>
      </div>
      ${paymentMethodList({ expandedPay4: true, compact: true, mode: "repeat" })}
    </section>
  `;
}

function paymentMethodsForVariant() {
  const order = PAYMENT_METHOD_ORDER[state.variant] || PAYMENT_METHOD_ORDER.default;
  return order.map((id) => PAYMENT_METHODS.find((method) => method.id === id)).filter(Boolean);
}

function paymentMethodList({ expandedPay4 = false, compact = false, mode = "minimal" } = {}) {
  return `
    <section class="method-list method-list-${mode} ${compact ? "is-compact" : ""}">
      ${paymentMethodsForVariant().map((method) => {
        if (method.id === "pay4") {
          return `${pay4MethodRow({ expanded: expandedPay4, mode })}${expandedPay4 ? pay4CheckoutExpansion({ mode }) : ""}`;
        }
        return paymentMethodRow(method);
      }).join("")}
    </section>
  `;
}

function paymentMethodRow(method) {
  return `
    <button class="method-row" type="button" data-action="select-method" data-method="${method.id}">
      ${lineIcon(method.icon)}
      <span class="method-copy">
        <strong>${method.name}</strong>
        <small>${method.helper}</small>
      </span>
      <span class="method-chevron">›</span>
    </button>
  `;
}

function pay4MethodRow({ expanded = false, mode = "minimal" } = {}) {
  const message = pay4UnavailableMessage();
  return `
    <button class="method-row pay4-row pay4-row-${mode} ${expanded ? "is-selected" : ""} ${message ? "is-unavailable" : ""}" type="button" data-action="open-pay4">
      ${pay4Logo("row")}
      <span class="method-copy">
        <span class="method-title-line">
          <strong>Pay4</strong>
          <em>NEW</em>
        </span>
        <small>By Pine Labs · Pay in 4 simple payments</small>
        <small class="value-cue">${formatMoney(SPLIT_AMOUNT)} × 4 Payments</small>
        ${message ? `<small class="inline-error">${message}</small>` : ""}
      </span>
      <span class="method-chevron">›</span>
    </button>
  `;
}

function pay4CheckoutExpansion({ mode = "minimal" } = {}) {
  const message = pay4UnavailableMessage();
  if (mode === "repeat") return repeatCheckoutExpansion(message);
  if (mode === "offer") return offerCheckoutExpansion(message);

  return `
    <div class="inline-pay4 inline-pay4-minimal">
      ${message ? `<div class="notice error-notice">${message}</div>` : ""}
      <div class="inline-trust-copy">Pay4 works with eligible credit cards from participating banks.</div>
      <button class="secondary-button full-width" type="button" data-action="open-pay4">View Pay4 Details</button>
    </div>
  `;
}

function offerCheckoutExpansion(message) {
  return `
    <div class="inline-pay4 inline-pay4-offer">
      ${message ? `<div class="notice error-notice">${message}</div>` : ""}
      <div class="affordability-callout" aria-label="Pay4 affordability summary">
        <div>
          <span>Pay Today</span>
          <strong>${formatMoney(PAY_TODAY)}</strong>
          <small>Includes ${formatMoney(PROCESSING_FEE)} bank processing fee</small>
        </div>
        <div>
          <span>Pay in 4 Payments</span>
          <strong>${formatMoney(SPLIT_AMOUNT)} × 4</strong>
        </div>
      </div>
      ${benefitStrip()}
      <button class="secondary-button full-width" type="button" data-action="open-pay4">View Pay4 Details</button>
    </div>
  `;
}

function repeatCheckoutExpansion(message) {
  const ready = !message && isRepeatUser() && !isUsingAnotherCard();
  return `
    <div class="inline-pay4 inline-pay4-repeat">
      ${message ? `<div class="notice error-notice">${message}</div>` : ""}
      ${isRepeatUser() ? savedCardModule({ compact: true }) : `<div class="inline-trust-copy">Pay4 repeat checkout works best with a saved eligible credit card.</div>`}
      <div class="quick-pay-actions">
        <button class="primary-button" type="button" data-action="start-pay4" ${ready ? "" : "disabled"}>Pay ${formatMoney(PAY_TODAY)} Now</button>
        <button class="text-button" type="button" data-action="use-another-card">Use Another Card</button>
      </div>
    </div>
  `;
}

function pay4DetailScreen() {
  return `
    <section class="detail-screen">
      <button class="back-button" type="button" data-action="back-checkout">‹ Payment Modes</button>
      ${pay4Panel()}
    </section>
  `;
}

function pay4Panel() {
  const message = pay4UnavailableMessage();
  return `
    <section class="pay4-panel pay4-detail-${state.variant} ${message ? "is-blocked" : ""}">
      <div class="pay4-top">
        <div>
          <div class="badge-row">
            <span class="badge">NEW</span>
          </div>
          ${pay4Logo("header")}
          <p>Pay one-fourth now and the rest over the next 3 months.</p>
        </div>
      </div>

      <div class="split-card">
        <div>
          <span>Pay in 4 Payments</span>
          <strong>${formatMoney(SPLIT_AMOUNT)} × 4 Payments</strong>
        </div>
        <div>
          <span>Pay Today</span>
          <strong>${formatMoney(PAY_TODAY)}</strong>
          <small>Includes ${formatMoney(PROCESSING_FEE)} bank processing fee</small>
        </div>
      </div>

      ${issuerLogoStrip()}
      ${pay4DetailPrimaryModule()}
      ${state.variant === "a" ? "" : benefitStrip()}
      ${pay4DisclosureSections()}
    </section>
  `;
}

function pay4DetailPrimaryModule() {
  if (isRepeatUser() && !isUsingAnotherCard()) return savedCardModule();
  return cardEntryModule();
}

function benefitStrip() {
  return `
    <div class="benefit-strip" aria-label="Pay4 benefits">
      ${PAY4_BENEFITS.map((benefit, index) => `
        ${index > 0 ? `<span class="benefit-divider" aria-hidden="true"></span>` : ""}
        <div class="benefit-item">
          <span class="benefit-icon">${lineIcon(benefit.icon)}</span>
          <span class="benefit-label">${benefit.label}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function savedCardModule({ compact = false } = {}) {
  return `
    <section class="saved-card-module ${compact ? "compact" : ""}">
      <div class="subhead">Saved Pay4 Card</div>
      <div class="saved-card-row">
        ${lineIcon("cards")}
        <div>
          <strong>${SAVED_CARD}</strong>
          <span>${formatMoney(SPLIT_AMOUNT)} × 4 · Pay Today ${formatMoney(PAY_TODAY)}</span>
        </div>
        <span class="selected-dot">✓</span>
      </div>
      ${compact ? "" : `<button class="text-button" type="button" data-action="use-another-card">Use Another Card</button>`}
    </section>
  `;
}

function cardEntryModule() {
  return `
    <section class="card-entry">
      <div class="card-entry-head">
        <div class="subhead">Add Eligible Credit Card</div>
        <p>Enter an eligible credit card to continue with Pay4.</p>
      </div>
      <div class="card-detection-slot">${cardDetectionMarkup()}</div>
      <label>
        <span>Card Number</span>
        <input type="text" inputmode="numeric" autocomplete="off" placeholder="Enter Eligible Credit Card Number" data-action="card-input" data-field="cardNumber" value="${formValue("cardNumber")}" />
      </label>
      <div class="field-grid">
        <label>
          <span>Expiry</span>
          <input type="text" inputmode="numeric" autocomplete="off" placeholder="MM/YYYY" data-action="card-input" data-field="expiry" value="${formValue("expiry")}" />
        </label>
        <label>
          <span>CVV</span>
          <input type="password" inputmode="numeric" autocomplete="off" placeholder="•••" data-action="card-input" data-field="cvv" value="${formValue("cvv")}" />
        </label>
      </div>
      <label>
        <span>Name on Card</span>
        <input type="text" autocomplete="off" placeholder="As Printed on Card" data-action="card-input" data-field="cardName" value="${formValue("cardName")}" />
      </label>
      <label class="check-row">
        <input type="checkbox" data-action="toggle-consent" ${state.consent === "true" ? "checked" : ""} />
        <span>I understand Pay4 will collect the remaining 3 payments as per Pay4 terms.</span>
      </label>
      ${isUsingAnotherCard() ? `<button class="text-button" type="button" data-action="use-saved-card">Use Saved Card</button>` : ""}
    </section>
  `;
}

function cardDetectionMarkup() {
  const card = detectedCardState();
  const error = pay4UnavailableMessage();

  if (error) return `<div class="inline-status is-error">${error}</div>`;
  if (!card) return "";

  const label = card.id === "eligible" ? "Eligible Credit Card" : `${card.name} Credit Card`;

  return `
    <div class="inline-status is-ok">
      <span>Detected Card</span>
      <strong>${label}</strong>
    </div>
  `;
}

function pay4DisclosureSections() {
  return `
    <div class="pay4-disclosures">
      <details>
        <summary>How Pay4 Works</summary>
        <p>Pay one-fourth today and the rest over the next 3 months.</p>
      </details>
      <details>
        <summary>Payment Schedule</summary>
        <div class="schedule-row"><span>Today</span><strong>${formatMoney(SPLIT_AMOUNT)} + ${formatMoney(PROCESSING_FEE)} bank processing fee</strong></div>
        <div class="schedule-row"><span>2nd payment</span><strong>${formatMoney(SPLIT_AMOUNT)}</strong></div>
        <div class="schedule-row"><span>3rd payment</span><strong>${formatMoney(SPLIT_AMOUNT)}</strong></div>
        <div class="schedule-row"><span>4th payment</span><strong>${formatMoney(SPLIT_AMOUNT)}</strong></div>
      </details>
      <details>
        <summary>Security & Terms</summary>
        <p>Your card details are secured via industry-standard encryption. You will be redirected to your bank to complete authentication.</p>
      </details>
    </div>
  `;
}

function issuerLogoStrip() {
  return `
    <section class="issuer-strip" aria-label="Accepted credit card issuers">
      <div class="subhead">Accepted With These Credit Card Issuers</div>
      ${issuerLogoGrid()}
    </section>
  `;
}

function issuerLogoGrid() {
  return `
    <div class="issuer-logo-grid">
      ${ISSUER_LOGOS.map((issuer) => `
        <div class="issuer-logo-chip issuer-${issuer.id}">
          <span>${issuer.name}</span>
          ${issuer.soon ? `<small class="issuer-soon">Coming Soon</small>` : ""}
        </div>
      `).join("")}
      <button class="issuer-view-all" type="button" data-action="open-supported-banks">View all supported banks</button>
    </div>
  `;
}

function supportedBanksSheet() {
  return `
    <div class="supported-banks-overlay" role="dialog" aria-modal="true" aria-labelledby="supported-banks-title">
      <div class="supported-banks-sheet">
        <div class="supported-banks-head">
          <h2 id="supported-banks-title">Supported Credit Card Issuers</h2>
          <button class="close-button sheet-close" type="button" data-action="close-supported-banks" aria-label="Close supported banks">×</button>
        </div>
        <p>Pay4 is available on eligible credit cards from participating issuers. More banks will be added soon.</p>
        <div class="supported-bank-list">
          ${ISSUER_LOGOS.map((issuer) => `
            <div class="supported-bank-item">
              <span>${issuer.name}</span>
              ${issuer.soon ? `<small>Coming Soon</small>` : ""}
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function processingScreen() {
  return `
    <section class="state-screen processing-screen">
      <div class="spinner" aria-hidden="true"></div>
      <h1>Redirecting To Your Bank</h1>
      <p>Complete authentication to confirm your Pay4 payment.</p>
      <div class="processing-card">
        ${pay4Logo("state")}
        <span>${MERCHANT}</span>
        <strong>${formatMoney(PAY_TODAY)}</strong>
        <small>Pay4 by Pine Labs · ${isRepeatUser() ? SAVED_CARD : `${cardState().name} Credit Card`}</small>
      </div>
    </section>
  `;
}

function successScreen() {
  return `
    <section class="state-screen success-screen">
      <div class="success-mark" aria-hidden="true">✓</div>
      ${pay4Logo("state")}
      <h1>Payment Successful</h1>
      <p>You paid ${formatMoney(SPLIT_AMOUNT)} today plus a ${formatMoney(PROCESSING_FEE)} bank processing fee. Your remaining 3 payments of ${formatMoney(SPLIT_AMOUNT)} will be collected by your bank as per Pay4 terms.</p>
      <div class="receipt-card">
        <div><span>Merchant</span><strong>${MERCHANT}</strong></div>
        <div><span>Amount Paid Today</span><strong>${formatMoney(PAY_TODAY)}</strong></div>
        <div><span>Payment Mode</span><strong>Pay4</strong></div>
        <div><span>Funding Instrument</span><strong>${isRepeatUser() ? SAVED_CARD : "Eligible Credit Card"}</strong></div>
        <div><span>Reference ID</span><strong>PL-PAY4-40K91</strong></div>
      </div>
      <button class="primary-button" type="button" data-action="return-merchant">Return To Merchant</button>
    </section>
  `;
}

function failureScreen() {
  return `
    <section class="state-screen failure-screen">
      <div class="failure-mark" aria-hidden="true">!</div>
      <h1>Authentication Failed</h1>
      <p>${REASONS.auth}</p>
      <div class="failure-actions">
        <button class="primary-button" type="button" data-action="retry-pay4">Retry With Pay4</button>
        <button class="secondary-button" type="button" data-action="change-method">Change Payment Method</button>
      </div>
    </section>
  `;
}

function fallbackScreen() {
  const method = PAYMENT_METHODS.find((item) => item.id === state.method) || PAYMENT_METHODS[1];
  return `
    <section class="detail-screen">
      <button class="back-button" type="button" data-action="back-checkout">‹ Payment Modes</button>
      <div class="fallback-card">
        ${lineIcon(method.icon)}
        <h1>${method.name}</h1>
        <p>${method.helper}</p>
        <div class="notice">
          <strong>Fallback Method Selected</strong>
          <span>This prototype does not call real payment APIs. Switch back to Pay4 anytime.</span>
        </div>
      </div>
    </section>
  `;
}

function fixedBottomCta() {
  if (["processing", "success", "failed"].includes(state.step)) return "";

  if (state.step === "fallback") {
    return `
      <div class="bottom-cta">
        <button class="primary-button" type="button" data-action="back-checkout">Back To Payment Modes</button>
      </div>
    `;
  }

  if (state.step === "pay4" && isPay4Selected()) {
    const message = pay4UnavailableMessage();
    const ready = pay4Ready();
    const disabled = !ready;
    const buttonLabel = ready ? `Pay ${formatMoney(PAY_TODAY)} Now` : "Enter Eligible Credit Card to Continue";
    return `
      <div class="bottom-cta">
        ${message ? `<span class="cta-helper">${message}</span>` : ""}
        ${!message && !ready && hasCardDetection() ? `<span class="cta-helper">Complete card details to continue.</span>` : ""}
        ${!message ? `<span class="cta-helper fee-helper">Includes ${formatMoney(PROCESSING_FEE)} bank processing fee.</span>` : ""}
        <button class="primary-button" type="button" data-action="start-pay4" ${disabled ? "disabled" : ""}>${buttonLabel}</button>
      </div>
    `;
  }

  return "";
}

function demoControls() {
  return `
    <aside class="demo-controls" aria-label="Demo controls">
      <div class="drawer-head">
        <div>
          <span class="controls-kicker">Reviewer Controls</span>
          <h2>Pay4 Demo Setup</h2>
        </div>
        <button class="close-button" type="button" data-action="toggle-controls">×</button>
      </div>
      ${controlSegment("Entry", "entry", { merchant: "Merchant", pg: "PG" })}
      ${controlSegment("Variant", "variant", VARIANTS)}
      ${controlSegment("User", "user", { first: "First-time", repeat: "Repeat" })}
      ${controlSegment("Eligibility", "eligible", { true: "Eligible", false: "Ineligible" })}
      ${controlSegment("Outcome", "outcome", { success: "Success", failure: "Failure" })}
      ${selectControl("Card/BIN", "card", [
        { value: "hdfc", label: "HDFC Credit" },
        { value: "icici", label: "ICICI Credit" },
        { value: "axis", label: "Axis Credit" },
        { value: "kotak", label: "Kotak Credit" },
        { value: "sbi", label: "SBI Coming Soon" },
        { value: "debit", label: "Debit Card" },
        { value: "unsupported", label: "Unsupported Card" }
      ])}
      ${selectControl("Reason", "reason", [
        { value: "amount", label: "Order Amount" },
        { value: "bank", label: "Unsupported Card" },
        { value: "merchant", label: "Merchant Unsupported" },
        { value: "debit", label: "Debit Card" },
        { value: "auth", label: "Auth Failure" }
      ])}
      <div class="control-actions">
        <button class="secondary-button" type="button" data-action="copy-link">Copy Current Demo Link</button>
        <button class="reset-button" type="button" data-action="reset-demo">Reset Demo</button>
      </div>
      ${copyStatus ? `<p class="copy-status">${copyStatus}</p>` : ""}
      <details class="debug-panel">
        <summary>Debug State</summary>
        <pre>${escapeHtml(JSON.stringify({
          ...state,
          merchant: MERCHANT,
          orderAmount: formatMoney(ORDER_AMOUNT),
          split: `${formatMoney(SPLIT_AMOUNT)} x 4 Payments`,
          payToday: formatMoney(PAY_TODAY)
        }, null, 2))}</pre>
      </details>
    </aside>
  `;
}

function controlSegment(label, key, values) {
  return `
    <div class="control-group">
      <span>${label}</span>
      <div class="segment">
        ${Object.entries(values).map(([value, text]) => `
          <button
            type="button"
            class="${String(state[key]) === value ? "active" : ""}"
            data-action="set-control"
            data-key="${key}"
            data-value="${value}"
          >${text}</button>
        `).join("")}
      </div>
    </div>
  `;
}

function selectControl(label, key, options) {
  return `
    <label class="control-group">
      <span>${label}</span>
      <select data-action="select-control" data-key="${key}">
        ${options.map((option) => `
          <option value="${option.value}" ${state[key] === option.value ? "selected" : ""}>${option.label}</option>
        `).join("")}
      </select>
    </label>
  `;
}

function logoImage(className, src, alt, fallback) {
  return `
    <span class="${className}">
      <img src="${src}" alt="${alt}" loading="eager" onerror="this.hidden=true;this.nextElementSibling.hidden=false" />
      <span hidden>${fallback}</span>
    </span>
  `;
}

function pay4Logo(size = "row") {
  return `
    <span class="pay4-logo pay4-logo-${size}" aria-label="Pay4 by Pine Labs">
      <img src="${ASSETS.pay4}" alt="Pay4 by Pine Labs" loading="eager" onerror="this.hidden=true;this.nextElementSibling.hidden=false" />
      <span hidden>Pay4 by Pine Labs</span>
    </span>
  `;
}

function lineIcon(type) {
  const common = `viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"`;
  const icons = {
    upi: `<path d="M13 8h10l-5 10h9L14 32l4-11h-8l3-13Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>`,
    cards: `<rect x="8" y="12" width="24" height="17" rx="3" stroke="currentColor" stroke-width="2.2"/><path d="M8 18h24M13 25h7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,
    emi: `<rect x="8" y="10" width="24" height="20" rx="4" stroke="currentColor" stroke-width="2.2"/><path d="M14 24 26 16M15 16h.1M25 24h.1" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>`,
    netbanking: `<path d="M7 17 20 8l13 9H7Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M11 18v11M17 18v11M23 18v11M29 18v11M8 30h24" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,
    wallets: `<path d="M9 13h22v17H9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4Z" stroke="currentColor" stroke-width="2.2"/><path d="M26 20h7v6h-7a3 3 0 0 1 0-6Z" stroke="currentColor" stroke-width="2.2"/><path d="M9 13V9h17" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,
    percent: `<circle cx="20" cy="20" r="12" stroke="currentColor" stroke-width="1.8"/><path d="m15 25 10-10M16 16h.1M24 24h.1" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`,
    rupee: `<path d="M14 12h12M14 17h12M16 12h2.5c4.4 0 6.8 1.7 6.8 4.8 0 3-2.5 5-6.8 5H16l9 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
    smile: `<circle cx="20" cy="20" r="12" stroke="currentColor" stroke-width="2.2"/><path d="M15 17h.1M25 17h.1M15 23c2.6 2.7 7.4 2.7 10 0" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`,
    shield: `<path d="M20 7 30 11v8c0 6-4 10-10 13-6-3-10-7-10-13v-8l10-4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m15 20 3 3 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
    "badge-check": `<path d="m20 7 3.3 3.1 4.5-.2.2 4.5 3.1 3.3-3.1 3.3-.2 4.5-4.5-.2L20 28.5l-3.3-3.1-4.5.2-.2-4.5-3.1-3.3 3.1-3.3.2-4.5 4.5.2L20 7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m15.5 19.5 2.8 2.8 6.2-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
    trusted: `<path d="M12 14h16l-2 16H14l-2-16Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M15 14a5 5 0 0 1 10 0M16 23l3 3 6-7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
    bag: `<path d="M12 15h16l-1 16H13L12 15Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M16 15a4 4 0 0 1 8 0" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`
  };
  return `<span class="line-icon icon-${type}"><svg ${common}>${icons[type] || icons.cards}</svg></span>`;
}

function setControl(key, value) {
  const patch = { [key]: value };
  if (key === "entry") patch.step = value === "merchant" ? "product" : "checkout";
  if (key === "user") patch.alternateCard = "false";
  if (key === "card") {
    clearFormState();
    patch.cardEntered = "true";
    if (value === "debit") patch.reason = "debit";
    if (value === "unsupported" || value === "sbi") patch.reason = "bank";
  }
  updateState(patch, { push: true });
}

function handleAppClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;

  if (action === "toggle-controls") {
    controlsOpen = !controlsOpen;
    copyStatus = "";
    render();
  }
  if (action === "open-supported-banks") {
    supportedBanksOpen = true;
    render();
  }
  if (action === "close-supported-banks") {
    supportedBanksOpen = false;
    render();
  }
  if (action === "go-cart") updateState({ entry: "merchant", step: "cart" }, { push: true });
  if (action === "go-product") updateState({ entry: "merchant", step: "product" }, { push: true });
  if (action === "proceed-pg") updateState({ entry: "pg", step: "checkout", method: "pay4" }, { push: true });
  if (action === "open-pay4") updateState({ entry: "pg", step: "pay4", method: "pay4" }, { push: true });
  if (action === "back-checkout") updateState({ entry: "pg", step: "checkout" }, { push: true });
  if (action === "select-method") updateState({ entry: "pg", step: "fallback", method: target.dataset.method }, { push: true });
  if (action === "change-method") updateState({ entry: "pg", step: "checkout", method: "upi" }, { push: true });
  if (action === "use-another-card" || action === "change-card") {
    clearFormState();
    updateState({ entry: "pg", step: "pay4", method: "pay4", alternateCard: "true", cardEntered: "false", consent: "false" }, { push: true });
  }
  if (action === "use-saved-card") {
    clearFormState();
    updateState({ entry: "pg", user: "repeat", step: "pay4", method: "pay4", alternateCard: "false", cardEntered: "false", consent: "false" }, { push: true });
  }
  if (action === "start-pay4") startProcessing();
  if (action === "retry-pay4") retryPay4();
  if (action === "return-merchant") updateState({ entry: "merchant", step: "product" }, { push: true });
  if (action === "reset-demo") resetDemo();
  if (action === "copy-link") copyCurrentLink();
  if (action === "set-control") setControl(target.dataset.key, target.dataset.value);
}

function handleAppChange(event) {
  const target = event.target;
  if (target.dataset.action === "toggle-consent") {
    updateState({ consent: target.checked ? "true" : "false", method: "pay4" });
  }
  if (target.dataset.action === "select-control") {
    setControl(target.dataset.key, target.value);
  }
}

function handleAppInput(event) {
  const target = event.target;
  if (target.dataset.action === "card-input") {
    const normalized = normalizeCardField(target.dataset.field, target.value);
    formState[target.dataset.field] = normalized;
    target.value = normalized;
    refreshCardFormUi();
  }
}

function normalizeCardField(field, value) {
  if (field === "cardNumber") return value.replace(/\D/g, "").slice(0, 16);
  if (field === "expiry") return normalizeExpiry(value);
  if (field === "cvv") return value.replace(/\D/g, "").slice(0, 3);
  if (field === "cardName") return value.replace(/[^A-Za-z ]/g, "").replace(/\s{2,}/g, " ");
  return value;
}

function normalizeExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 6);
  if (digits.length <= 2) return digits;

  let month = digits.slice(0, 2);
  const monthNumber = Number(month);
  if (month === "00") month = "01";
  else if (monthNumber > 12) month = "12";

  return `${month}/${digits.slice(2)}`;
}

function refreshCardFormUi() {
  const detectionSlot = app.querySelector(".card-detection-slot");
  if (detectionSlot) detectionSlot.innerHTML = cardDetectionMarkup();

  const bottomCta = app.querySelector(".bottom-cta");
  if (bottomCta) bottomCta.outerHTML = fixedBottomCta();
}

function handlePopstate() {
  state = readState();
  clearFormState();
  render();
}

app.addEventListener("click", handleAppClick);
app.addEventListener("change", handleAppChange);
app.addEventListener("input", handleAppInput);
window.addEventListener("popstate", handlePopstate);

window.__pay4PrototypeCleanup = () => {
  app.removeEventListener("click", handleAppClick);
  app.removeEventListener("change", handleAppChange);
  app.removeEventListener("input", handleAppInput);
  window.removeEventListener("popstate", handlePopstate);
  cancelProcessingTimer();
};

render();
