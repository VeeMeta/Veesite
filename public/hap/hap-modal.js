/*!
 * HAP DIY Kit pop-out — drop-in, no dependencies.
 * Open:  any element with [data-hap-open]  (data-hap-open="buy" jumps to checkout-request step)
 *        URL ?hap=1  |  #hap-diy  |  #buy
 *        JS: window.HapModal.open() / .open('buy') / .close()
 * Close: Esc, overlay click, × button.
 * Optional config BEFORE this script: window.HAP_MODAL_CONFIG = { email, bookingUrl, landingUrl }
 * Checkout is NOT wired: "Buy" collects intent by email; Vee sends the payment link same day.
 */
(function () {
  "use strict";
  if (window.HapModal) return;

  var cfg = Object.assign({
    email: "Veemetax@gmail.com",
    bookingUrl: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ23LIV9Exs_DyhOX4K2UA2TL96bIOD2o_uB_jFXvrtWkProajI56FJqyznDwY7ltMo89FRBWLEd",
    landingUrl: "/hardline"
  }, window.HAP_MODAL_CONFIG || {});

  var subject = "HAP DIY Kit checkout request";
  var body = [
    "Hi Vee,",
    "",
    "I'd like the Hardline API Protocol (HAP) DIY Kit — $497 one-time.",
    "If I move to Guided Install within 30 days, please credit the full $497.",
    "",
    "Project:",
    "Best email for the payment link and the kit:",
    "",
    "Thanks!"
  ].join("\n");
  var mailto = "mailto:" + cfg.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

  var html =
    '<div class="hapm-overlay" data-hapm-close></div>' +
    '<div class="hapm-dialog" role="dialog" aria-modal="true" aria-labelledby="hapm-title" tabindex="-1">' +
      '<button type="button" class="hapm-close" aria-label="Close" data-hapm-close>&times;</button>' +

      '<div class="hapm-step" data-hapm-step="offer">' +
        '<p class="hapm-eyebrow">Hardline API Protocol · DIY Kit</p>' +
        '<h2 class="hapm-title" id="hapm-title">Your API keys and agents, <span>locked down by you.</span></h2>' +
        '<p class="hapm-sub">The full HAP playbook to run it yourself — and walk away with an Evidence Pack you can show investors, partners, and your own team.</p>' +
        '<ul class="hapm-list">' +
          '<li>Protocol (PDF + Markdown) — 7 layers incl. agent surface</li>' +
          '<li>32-control checklist with pass/fail + artifact per control</li>' +
          '<li>Sample policy YAML + Evidence Pack templates</li>' +
          '<li>Attack-sim self-tests + 0–100 scorecard</li>' +
          '<li>1 async Q&amp;A with Vee</li>' +
        '</ul>' +
        '<div class="hapm-price"><b>$497</b><small>one-time · Seed tier</small></div>' +
        '<p class="hapm-credit"><strong>100% credit</strong> toward Guided Install ($4,500 Seed) if you upgrade within 30 days.</p>' +
        '<div class="hapm-actions">' +
          '<a class="hapm-btn hapm-btn-primary" href="' + mailto + '" data-hapm-go="buy">Get the DIY Kit — $497</a>' +
          '<a class="hapm-btn hapm-btn-ghost" href="' + cfg.bookingUrl + '" target="_blank" rel="noopener">Not sure yet? Free 20-min Quick-Score</a>' +
        '</div>' +
        '<p class="hapm-fine">Independent protocol built on public baselines. Not an OWASP/NIST certification. · <a href="' + cfg.landingUrl + '">Full details</a></p>' +
      '</div>' +

      '<div class="hapm-step" data-hapm-step="buy" hidden>' +
        '<p class="hapm-eyebrow">Request checkout link</p>' +
        '<h2 class="hapm-title">Almost there — <span>one email.</span></h2>' +
        '<p class="hapm-sub">Checkout is handled personally for now. Send a quick note and I\'ll reply with a secure payment link the same day (ET business hours).</p>' +
        '<ol class="hapm-steps">' +
          '<li><strong>Email me</strong> — the button pre-fills it.</li>' +
          '<li><strong>Pay</strong> via the link I send back.</li>' +
          '<li><strong>Get the kit</strong> delivered to your inbox.</li>' +
        '</ol>' +
        '<div class="hapm-emailbox"><code>' + cfg.email + '</code><button type="button" class="hapm-copy" data-hapm-copy>Copy</button></div>' +
        '<div class="hapm-actions">' +
          '<a class="hapm-btn hapm-btn-primary" href="' + mailto + '">Request checkout link</a>' +
          '<a class="hapm-btn hapm-btn-ghost" href="' + cfg.bookingUrl + '" target="_blank" rel="noopener">Or book the free Quick-Score first</a>' +
        '</div>' +
        '<button type="button" class="hapm-back" data-hapm-go="offer">&larr; Back to what\'s included</button>' +
      '</div>' +
    '</div>';

  var root, dialog, lastFocus;

  function build() {
    if (root) return;
    root = document.createElement("div");
    root.className = "hapm-root";
    root.id = "hap-diy-modal";
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = html;
    document.body.appendChild(root);
    dialog = root.querySelector(".hapm-dialog");

    root.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest("[data-hapm-close],[data-hapm-go],[data-hapm-copy]") : null;
      if (!t) return;
      if (t.hasAttribute("data-hapm-close")) { e.preventDefault(); close(); return; }
      if (t.hasAttribute("data-hapm-copy")) { e.preventDefault(); copyEmail(t); return; }
      if (t.hasAttribute("data-hapm-go")) {
        // First "Get" click shows the honest checkout-request step instead of jumping straight to mail.
        e.preventDefault(); show(t.getAttribute("data-hapm-go"));
      }
    });
    root.addEventListener("keydown", trap);
  }

  function show(step) {
    var steps = root.querySelectorAll("[data-hapm-step]");
    for (var i = 0; i < steps.length; i++) steps[i].hidden = steps[i].getAttribute("data-hapm-step") !== step;
    var h = root.querySelector('[data-hapm-step="' + step + '"] .hapm-title');
    if (h) { dialog.setAttribute("aria-labelledby", h.id || (h.id = "hapm-title-" + step)); }
    focusFirst();
  }

  function focusables() {
    return Array.prototype.filter.call(
      dialog.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null; });
  }
  function focusFirst() { var f = focusables(); (f[1] || f[0] || dialog).focus(); }

  function trap(e) {
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    if (e.key !== "Tab") return;
    var f = focusables(); if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function copyEmail(btn) {
    var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(cfg.email).then(done, function () {});
    else { var ta = document.createElement("textarea"); ta.value = cfg.email; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); done(); } catch (_) {} ta.remove(); }
  }

  function open(step) {
    build();
    lastFocus = document.activeElement;
    root.classList.add("hapm-open");
    root.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("hapm-lock");
    show(step === "buy" ? "buy" : "offer");
    try { window.dispatchEvent(new CustomEvent("hap:open", { detail: { step: step || "offer" } })); } catch (_) {}
  }

  function close() {
    if (!root || !root.classList.contains("hapm-open")) return;
    root.classList.remove("hapm-open");
    root.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("hapm-lock");
    if (/^#(hap-diy|buy)$/.test(location.hash) && history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function fromUrl() {
    var h = location.hash;
    if (h === "#buy") return open("buy");
    if (h === "#hap-diy" || /[?&]hap=1(&|$)/.test(location.search)) return open("offer");
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-hap-open]") : null;
    if (!t) return;
    e.preventDefault();
    open(t.getAttribute("data-hap-open"));
  });
  window.addEventListener("hashchange", fromUrl);

  window.HapModal = { open: open, close: close, config: cfg, mailto: mailto };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fromUrl); else fromUrl();
})();
