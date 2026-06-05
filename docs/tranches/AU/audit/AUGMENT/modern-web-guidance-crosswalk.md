# modern-web-guidance crosswalk — every AUGMENT item, Baseline-grounded

The "all items audited through modern-web-guidance" deliverable for the augmented glass-ui (AU) +
slides (F) tranches. Every modern-platform / a11y / forms item in the AUGMENT specs is threaded
against the AUTHORITATIVE, Baseline-dated guidance corpus.

**Corpus (the authority).** Three files harvested from the `modern-web-guidance` npm package via
`retrieve`, each carrying per-feature implementation steps, constraints, fallbacks, AND the
load-bearing `Baseline status for X … since YYYY-MM-DD` lines:

- `mwg/01-dock-animation.txt` (dock-motion features)
- `mwg/02-slides-a11y.txt` (slides + a11y + forms features)
- `mwg/03-crosscutting.txt` (CSS architecture, perf, theming, scheduling)

**Specs audited.** `AU-AUGMENT.md` (§2.4 ADOPT/DEFER, §5.4 styling) · `AU.W8-dock-motion.md` ·
`AU.W8b-modern-css.md` · `AU-keyframes-coordination.md` · `AU-gate-fleet-augment.md` ·
`F-AUGMENT.md` · `slides-digest.md` · `new-deck-spec.md` · `F.W-dock-consume.md`.

---

## 0. How to read this

Every modern-CSS / a11y / forms item the AUGMENT specs reference is now grounded in the authoritative
Baseline date (quoted verbatim from the corpus); each ADOPT/DEFER/KEEP call is re-checked against
that date. §1 is the Baseline ledger (the authority). §2 is the item-by-item crosswalk with a
verdict ∈ {**CONFIRMS** — guidance agrees with the spec call; **STRENGTHENS** — guidance adds a
recipe/date that reinforces and sharpens the call; **REVISITS** — guidance changes or re-opens the
call}. §3 collects the material decision changes. §4 is per-spec strengthening notes for a later edit
pass.

The Baseline dates are the load-bearing authority — where a feature is only **Newly** available (or
has **limited availability**), the spec's `@supports`/fallback discipline is mandatory, and where a
feature is **Widely** available the spec can lean on it as a primary path.

---

## 1. Baseline ledger (the authority)

Every feature the AUGMENT specs reference, with its authoritative Baseline status + date pulled
verbatim from the corpus, and the use-case ID(s) it comes from. **Widely** = Baseline Widely
available; **Newly** = Baseline Newly available; **limited** = limited availability (NOT Baseline).

| feature | Baseline status | since | use-case id (corpus file) |
|---|---|---|---|
| `@starting-style` | Newly | **2024-08-06** | `animate-element-entry-exit`, `animate-to-from-top-layer` (01) |
| `transition-behavior: allow-discrete` | Newly | **2024-08-06** | `animate-to-from-top-layer` (01); CSS §9 perf (03) |
| `overlay` (property) | limited (Chrome/Edge only) | — | `animate-to-from-top-layer` (01) |
| `interpolate-size: allow-keywords` | limited (Chrome 129/Edge 129) | — | `animate-to-intrinsic-sizes`, `calculate-with-intrinsic-sizes` (01/02) |
| `calc-size()` | limited (Chrome 129/Edge 129) | — | `animate-to-intrinsic-sizes`, `calculate-with-intrinsic-sizes` (01/02) |
| `linear()` easing | Newly | **2023-12-11** | `physics-based-easing` (01) |
| Individual transform properties (`translate`/`rotate`/`scale`) | Widely | **2022-08-05** | `individual-transform-properties` (01) |
| View Transitions (same-doc) | Newly | **2025-10-14** | `same-document-transitions`, `group-element-transitions`, `directional-navigation-transitions` (01) |
| `view-transition-class` | Newly | **2025-10-14** | `group-element-transitions` (01) |
| Active view transition (`:active-view-transition-type`) | Newly | **2026-01-13** | `directional-navigation-transitions` (01) |
| `moveBefore()` | limited (Chrome/Edge 133, FF 144; no Safari) | — | `move-dom-element-without-losing-state`, `persistent-top-layer-ui` (01) |
| `sibling-index()` / `sibling-count()` | limited (Chrome/Edge 138, Safari 26.2; no FF) | — | `dynamic-sibling-animations` (01) |
| Anchor positioning | NOT natively supported by any major browser yet | — | `anchor-positioning-tab-underline` (01); `css-layout` §5 (03) |
| Anchor position container queries | limited (Chrome/Edge 143) | — | `position-aware-tooltips` (03) |
| Container queries | Widely | **2023-02-14** | `fluid-scaling`, `size-aware-styling`, `css-layout` §4 (02/03) |
| Container **style** queries | limited (Chrome/Edge 111, Safari 18; no FF) | — | `design-token-reactivity` (03) |
| `light-dark()` | Newly | **2024-05-13** | `dark-mode`, `component-specific-light-dark-theme` (02) |
| `color-scheme` | Widely | **2022-02-03** | `dark-mode`, `component-specific-light-dark-theme` (02) |
| `:user-valid` / `:user-invalid` | Widely | **2023-11-02** | `required-field-feedback`, `validate-input-after-interaction`, `accessible-error-announcement`, `style-parent-with-has` (02) |
| `<dialog>` | Widely | **2022-03-14** | `css-layout` §5, accessibility §11 (03) |
| Popover API | Newly | **2025-01-27** | `animate-to-from-top-layer`, `navigation-drawer`, `declarative-dialog-popover-control`, `position-aware-tooltips` (01/03) |
| `HTMLElement.showPopover` capability | Newly | **2024-04-16** | `navigation-drawer` (03) |
| Invoker commands (`command`/`commandfor`) | Newly | **2025-12-12** | `declarative-dialog-popover-control` (03) |
| `<dialog closedby>` (light-dismiss) | limited (Chrome/Edge 134, FF 141; no Safari) | — | `light-dismiss-a-dialog` (03) |
| Registered custom properties (`@property`) | Newly | **2024-07-09** | `navigation-drawer` (03); CSS §9 (03) |
| `text-wrap` (shorthand / `nowrap`) | Newly | **2024-10-17** | `prevent-text-wrapping` (02) |
| `text-wrap: balance` | Newly | **2024-05-13** | `improve-text-layout-and-legibility` (02) |
| `text-wrap: pretty` | limited (Chrome/Edge 117, Safari 26; no FF) | — | `improve-text-layout-and-legibility` (02) |
| Subgrid | Widely | **2023-09-15** | `css-layout` §3 (03) |
| Masks (`mask-image`) | Newly | **2023-12-07** | `soft-edge-content-fade` (02) |
| `scrollbar-color` | Newly | **2025-12-12** | `dark-mode` (02) |
| `scrollbar-gutter` | Newly | **2024-12-11** | `css-layout` §6 (03) |
| `content-visibility` | Newly | **2025-09-15** | `faster-spa-view-transitions` (03) |
| `font-size-adjust` | Newly | **2024-07-25** | `visually-stable-font-fallbacks` (02) |
| Small/large/dynamic viewport units (`dvh`/`svh`…) | Widely | **2022-12-05** | `css-layout` §7 (03) |
| Fetch priority (`fetchpriority`) | Newly | **2024-10-29** | `optimize-image-priority` (03) |
| Scroll-driven animations (`animation-timeline: scroll()`) | limited (Chrome/Edge 115, Safari 26; no FF) | — | `scroll-progress-indicator`, `navigation-drawer` (02/03) |
| Scheduler API (`scheduler.yield`/`postTask`) | limited (Chrome/Edge 129, FF 142; no Safari) | — | `break-up-long-tasks`, `schedule-tasks-by-priority` (03) |
| `accent-color` | limited (Chrome 93/Edge 93/FF 92; no Safari) | — | `brand-consistent-forms`, `dark-mode` (03/02) |
| `scroll-initial-target` | limited (Chrome/Edge 133; no FF/Safari) | — | `navigation-drawer` (03) |
| Temporal | limited (Chrome/Edge 144, FF 139; no Safari) | — | `stabilize-reactive-state`, `manage-recurring-intervals` (03) |
| CSS `@function` | limited (Chrome/Edge 139; no FF/Safari) | — | `reduce-style-repetition` (03) |
| Native CSS nesting | Widely (Baseline 2023; per `dock.css refactor` row + corpus example) | 2023 | `css` §3 nesting (03); AU.W8b §2 |

---

## 2. The crosswalk (every item → guidance)

`| spec item (file) | mwg use-case id | Baseline status + date | authoritative recipe note | verdict |`

### 2.1 Dock motion — the headline (AU.W8 / AU.W8b / AU-AUGMENT §2.4)

| spec item (file) | mwg use-case id | Baseline status + date | authoritative recipe note | verdict |
|---|---|---|---|---|
| `interpolate-size: allow-keywords` + `calc-size(auto)` on `.dock-layers` — ADOPT W8b, "eliminates the JS measure/pin dance" (AU-AUGMENT §2.4; AU.W8b §1) | `animate-to-intrinsic-sizes`, `calculate-with-intrinsic-sizes` (01/02 §"Animating to and from Intrinsic Sizes") | both **limited** (Chrome 129/Edge 129; no FF/Safari) | Corpus mandates the `@supports (interpolate-size: allow-keywords)` gate + a fixed-length fallback verbatim ("Always provide a standard keyword or length"). For `0→auto` use `interpolate-size`, NOT `calc-size()`; `calc-size()` only when adding math. AU.W8b §1 already gates `@supports (interpolate-size…)` and keeps the FLIP fixed-pixel fallback. | **CONFIRMS** (spec's `@supports`-gate + FLIP-fallback matches the mandate; the "Baseline 2024" claim in AU.W8b §1 risk is loose — the feature is *limited*, not Baseline — but the gate makes the call safe) |
| `@starting-style` + `transition-behavior: allow-discrete` on `.dock-layer` — folds the visibility fork (AU-AUGMENT §2.4; AU.W8b §1) | `animate-element-entry-exit`, `animate-to-from-top-layer` (01) | both **Newly 2024-08-06** | Corpus: `@starting-style` is MANDATORY for entry; `allow-discrete` MANDATORY for `display`/`visibility`; do NOT put `allow-discrete` in the `transition` shorthand (older browsers drop the whole declaration — use a separate `transition-behavior` line); `@starting-style` is entry-ONLY (exit is the transition to the base state). AU.W8b §1 uses a separate `transition-behavior` line and an `@supports` gate — both correct. | **STRENGTHENS** (>1yr Baseline → the fold is Baseline-safe behind `@supports`; the corpus "do NOT use allow-discrete in shorthand" rule validates the spec's separate-declaration form) |
| Animate-to/from top-layer recipe for dock popovers (W8 anchor + popover content) | `animate-to-from-top-layer` (01) | `@starting-style`/`transition-behavior` **Newly 2024-08-06**; `overlay` **limited** (Chrome/Edge only) | Corpus: MANDATORY include `overlay` in the transition list for top-layer elements. `overlay` is NOT Baseline (Chrome/Edge only) → must be progressive-enhancement. The dock-popover anchor fold (AU.W8b §8) is `@supports`-gated with the floating-ui fallback. | **STRENGTHENS** (adds the `overlay`-in-transition recipe the spec does not mention; flags `overlay` as non-Baseline) |
| `--spring-dock` via `linear()` token (response 0.5, ζ 0.5, ~+18.5% overshoot), VT + FLIP + runtime driver on one source (AU.W8 §2; AU-keyframes §4) | `physics-based-easing` (01) | **Newly 2023-12-11** | Corpus mandates: ALWAYS include an explicit `duration` (`linear()` does not derive it); apply `linear()` to compositor properties (`transform`/`opacity`); provide a standard-easing fallback (`transition-timing-function` previous-valid-declaration) OR `@supports not (animation-timing-function: linear(0,1))`; avoid bounce easing on `opacity` (overshoot <0 / >1 flickers). The spec's build-time `regen-spring-tokens.mjs` emit + the 48-sample grid match the "precision-vs-payload / simplify the curve" note. | **STRENGTHENS** (the >1.5yr Baseline confirms `linear()` is safe; the corpus "avoid opacity overshoot flicker" note is a NEW caveat for the dock — opacity rides the +18.5% overshoot spring, so clamp opacity to `[0,1]` or drive it off a separate non-overshooting progress) |
| VT layer A↔B morph — KEEP (mature); VT/FLIP unified on `--dock-resize-spring`; FLIP is the live iOS path (AU-AUGMENT §2.4) | `same-document-transitions`, `group-element-transitions` (01) | View transitions **Newly 2025-10-14**; `view-transition-class` **Newly 2025-10-14**; active-VT **Newly 2026-01-13** | Corpus: VT is a progressive enhancement; unsupported browsers (iOS Safari pre-18 lacks it; FF only since 144) execute the DOM update with NO animation → the FLIP fallback MUST carry the motion. MANDATORY focus-routing after the VT (`tabindex="-1"` + `.focus()` on the new heading) since VT does not manage focus. `view-transition-class` lets the dock define the layer-morph logic once across both layers. | **REVISITS** → see §3 (VT keep-FLIP CONFIRMATION). The spec's "FLIP is the live iOS path" is exactly right given VT only went Baseline 2025-10-14. **STRENGTHENS** the keep-FLIP decision; adds the MANDATORY post-VT focus-routing the spec does not name. |
| Travelling rail indicator via reka `Tabs` + anchor positioning (AU.W8 §Step 4; AU.W8b §8 mentions `UnderlineTabs` anchor recipe) | `anchor-positioning-tab-underline` (01) — **exact match** | Anchor positioning **NOT Baseline** (no major browser natively) | Corpus is the exact recipe: a `::before` pseudo on the `<ul>` container (DOM-clean), `anchor-name: --active` on the active `<li>`, `position-anchor: --active` + `inset` via `anchor()` (NOT `position-area` — it can't transition), `transition: inset .2s` wrapped in `@media (prefers-reduced-motion: no-preference)`, and `@supports not (position-anchor: auto)` → `border-bottom` fallback. MANDATORY: keep `aria-current="page"`/`aria-selected` alongside the visual indicator. reka `TabsIndicator` (the spec's choice) provides `--reka-tabs-indicator-position/size` instead — a JS-measured equivalent that works TODAY where native anchor does not. | **STRENGTHENS** (the corpus is the canonical anchor recipe; since anchor positioning is NOT Baseline, the spec's reka-`TabsIndicator` JS path is the correct primary, with the `anchor()` recipe as the `@supports`-gated enhancement — exactly AU.W8b §8. The corpus' "indicator must not replace `aria-selected`" is already in AU.W8 §Step 4 / the a11y gate) |
| FLIP single-frame sync — move the layer ref-swap into the rAF that sets width (AU.W8 §Step 1; "move DOM without losing state" framing) | `move-dom-element-without-losing-state` (01) | `moveBefore()` **limited** (no Safari) | The corpus use-case is `moveBefore()` for state-preserving reparenting; it is NOT the dock's mechanism (the dock does not reparent — it co-schedules opacity + width on one frame). The relevant corpus law is `individual-transform-properties` (one-clock compositor scheduling) + `physics-based-easing` (one solver). `moveBefore()` is NOT Baseline → if any future dock work reparents an open layer, it needs the `'moveBefore' in Element.prototype` feature-gate + `insertBefore` fallback. | **CONFIRMS** (the dock's single-frame fix is not a `moveBefore` case; the corpus' state-preserve guidance is informational. Booked: if the dock ever reparents a live popover, `persistent-top-layer-ui` mandates `moveBefore()` with the feature-gate) |
| Compositor `scaleX` over `width` — DEFER → BOOK (AU-AUGMENT §2.4) | `individual-transform-properties` (01); CSS §9 Performance (03) | **Widely 2022-08-05** | Corpus: prefer `translate`/`scale`/`opacity` (compositor thread) over `width`/`height`/`left`. MANDATORY: apply an IDENTITY transform on the base element (`translate:0; rotate:0deg; scale:1`) so a `:hover`/transition transform does not create a new stacking context / containing block. The dock animates `width` (layout) today; the BOOK note acknowledges `scaleX` escapes reflow but distorts children unless counter-scaled. | **STRENGTHENS** (Widely-since-2022 means the compositor path is unequivocally safe IF adopted; the corpus' identity-transform mandate is the missing piece the BOOK note should carry — and the children-distortion caveat is real, so the DEFER stands. Note: `individual-transform-properties` are ALREADY in the dock-press family — `--dock-press-spring` drives `scale`/`rotate`) |
| Child stagger orchestration — DEFER → BOOK ("lead-or-lockstep, NOT trail") (AU-AUGMENT §2.4; F.W-dock-consume §"Reveals lead-or-lockstep") | `dynamic-sibling-animations` (01) | `sibling-index()`/`sibling-count()` **limited** (no FF) | Corpus: `animation-delay: calc(sibling-index() * --stagger-time)`; MANDATORY `prefers-reduced-motion` disable; `@supports` test + a JS `--sibling-index` fallback. The spec DEFERs stagger entirely (the user wants no trailing lag). | **CONFIRMS** (the DEFER is correct — stagger re-introduces perceived lag; and `sibling-index()` is not Baseline anyway, so even an opt-in would need the JS fallback. The F.W-dock-consume rule "stagger to slide-body reveal only, never dock chrome" is the right boundary) |
| reduced-motion across VT + FLIP + driver (`SpringProgress({respectReducedMotion:true})` + VT `animation:none`) (AU.W8 §2.5; AU-keyframes §8.4) | `physics-based-easing`, `same-document-transitions`, accessibility §10 (01/02) | n/a (PRM is universal) | Corpus: `@media (prefers-reduced-motion: reduce)` on every animated surface; for VT, zero `::view-transition-group(*)/old(*)/new(*) { animation: none !important }`; do NOT globally set `animation-duration:0.01ms` (CSS §9 — can make animations MORE jarring; prefer a per-property `--animation-reduced` custom prop). | **STRENGTHENS** (the corpus' VT-PRM selector triad is exactly the spec's `view-transition.css:27-33` gate; the "don't blanket-zero duration" CSS §9 rule validates the spec's explicit per-path PRM over a global strip) |

### 2.2 Modern-CSS hygiene + styling (AU.W8b / AU-AUGMENT §5.4)

| spec item (file) | mwg use-case id | Baseline status + date | authoritative recipe note | verdict |
|---|---|---|---|---|
| CSS nesting (dock.css refactor) — ADOPT W8b P2 (AU-AUGMENT §2.4; AU.W8b §2) | `css` §3 Nesting/scoping (03) | Native nesting **Widely (2023)** | Corpus: use native nesting to group related styles for maintainability; prefer `@scope` over nesting when proximity should win over specificity; `&` preserves specificity. AU.W8b §2 preserves specificity + diffs compiled output — matches. | **CONFIRMS** (Widely-2023 → safe; Lightning CSS down-compiles so shipped dist is flat anyway) |
| Non-idiomatic Tailwind lift — `text-[var(--…)]`/`shadow-[var(--…)]` → `@theme` utilities; `@utility` recipes; design-idiom localization gate (AU-AUGMENT §5.4; AU.W8b §4) | `css` §1 Foundations + §5 Design Tokens (03); `reduce-style-repetition` (03) | tokens/`@theme` are buildtime (no Baseline gate); `@function` **limited** (Chrome/Edge 139 only) | Corpus: "Be allergic to knowledge duplication"; tier tokens (literal → semantic → UI → component); DO NOT specify nontrivial styling values inline; prefer `currentColor`/`inherit`/`em` over re-declared vars. `@function` (the CSS-native DRY primitive) is NOT Baseline → the spec's `@theme`/`@utility` (Tailwind buildtime) approach is the correct DRY mechanism today, not `@function`. | **CONFIRMS + STRENGTHENS** (the corpus' tier model + "no inline nontrivial values" IS the design-idiom discipline the gate enforces; `reduce-style-repetition` notes `@function` is limited, so the Tailwind `@utility` path is right — do NOT reach for CSS `@function` yet) |
| Design-idiom tokens / reactive density (`data-density` cascade, `--dock-motion-*`) (AU-AUGMENT §5.4 "gold standard"; AU.W8b §3) | `design-token-reactivity` (03) | Container **style** queries **limited** (no FF) | Corpus: container STYLE queries (`@container style(--density: compact)`) let tokens drive layout without markup — but they are NOT Baseline (no Firefox) → "NOT RECOMMENDED for core features that must work across all browsers". The fallback is the `[data-density]` selector pattern with `:where()` to avoid specificity inflation. The dock already uses `[data-density]` attribute selectors (NOT style queries). | **CONFIRMS** (the spec's `[data-density]` attribute cascade is exactly the corpus' recommended fallback over the non-Baseline style-query; `:where()` to bound specificity is the corpus rule and the dock's `:where()` four-state contract honors it) |
| `defineModel` ×8, `Readonly<>` context guards (AU.W8b §5–6) | — (Vue framework, not a web-platform feature) | n/a | No mwg use-case (framework-level). The closest corpus principle is `move-dom-element-without-losing-state` (state preservation) — not applicable. Covered by `proof:strict-templates` + typecheck, not a Baseline gate. | **n/a** (no platform-feature audit; correctly out of the modern-web-guidance scope) |
| Deprecated `-webkit-*` cleanup — KEEP `-webkit-backdrop-filter` feature-test; guard `::-webkit-scrollbar` under `@supports not(scrollbar-color)` (AU-AUGMENT §5.4; AU.W8b §7) | `dark-mode` §"scrollbar-color" + Fallbacks (02); `css` §5 "Theming browser-generated UI" (03) | `scrollbar-color` **Newly 2025-12-12** | **The corpus DIRECTLY corrects the AU-AUGMENT §5.4 "remove `-webkit-scrollbar`" directive** — see §3. Corpus (`dark-mode` fallbacks): "If the user's Baseline target is 'Baseline Widely Available' or earlier, you SHOULD include the non-standard `::-webkit-scrollbar` pseudo-elements as fallbacks. Wrap legacy fallbacks in `@supports not (scrollbar-color: auto)`." AU.W8b §7 already re-grounds to KEEP the guarded `::-webkit-scrollbar`. | **REVISITS** → see §3 (`::-webkit-scrollbar` fallback CAVEAT). AU.W8b §7 already corrected the stale directive; the corpus is the authority that ratifies KEEP. |
| `@property` typed custom properties for the spring/animated tokens (implicit in AU.W8b §1 design-idiom; not explicit) | `navigation-drawer` §"@property is REQUIRED" (03); CSS §9 (03) | Registered custom properties **Newly 2024-07-09** | Corpus: a custom property that gets INTERPOLATED (animated/transitioned) MUST be `@property`-registered with a typed `syntax` or it is treated as a string and JUMPS instead of interpolating. The drawer recipe registers `--drawer-backdrop` as `<number>`; CSS §9 registers `--animation-reduced`. The dock's animated numeric custom props (if any drive interpolation) should be typed. | **REVISITS** → see §3 (`@property` typed tokens). Not currently in the spec; a STRENGTHENING for the design-idiom layer. |

### 2.3 Slides — progress bar, gate, forms, dark, masks, modal (F-AUGMENT / slides-digest)

| spec item (file) | mwg use-case id | Baseline status + date | authoritative recipe note | verdict |
|---|---|---|---|---|
| N1 progress-bar visual articulation — viewport-root bottom band, `aria-hidden`, contrast floor (F-AUGMENT N1; gate `proof:progress-bar-detached`) | `scroll-progress-indicator` (02) | `animation-timeline: scroll()` **limited** (Chrome/Edge 115, Safari 26; no FF) | Corpus: MANDATORY a purely-decorative progress bar sets `aria-hidden="true"` (empty unnamed node otherwise); animate `transform: scaleX()` on the compositor (NOT `width`); gate `@supports (animation-timeline: scroll())` + a `scroll` listener fallback for the JS path; if decorative, opt for progressive enhancement and DON'T provide a fallback. The slides bar is JS-driven (deck progress %), not scroll-timeline — but the `aria-hidden` + `scaleX` + contrast-floor rules apply. | **STRENGTHENS** (the corpus' MANDATORY `aria-hidden` on a decorative progress element should be folded into the N1 gate alongside the contrast-floor assertion; the `scaleX`-not-`width` compositor rule sharpens the visual articulation) |
| DeckGate error announcement — `--destructive` → `--red-text`, `:focus-visible` ring, glass variant (F-AUGMENT N/F.W1; FIND-006, C08-FOCUS-RING) | `accessible-error-announcement`, `validate-input-after-interaction`, `required-field-feedback` (02) | `:user-valid`/`:user-invalid` **Widely 2023-11-02** | **The corpus is the canonical recipe AU's W3 KILL'd — see §3.** Visual layer = `:user-invalid` CSS; a11y layer = `aria-invalid` + `aria-errormessage`; bridge them in JS (listen `blur`/`input`, check `el.matches(':user-invalid')`, sync `aria-invalid`). MANDATORY: error icon + text, not color alone; place hint ABOVE the input; keep submit enabled. `:focus-visible` (NOT `:focus`) for the ring (accessibility §5 + CSS §4). | **REVISITS** → see §3 (`:user-invalid` REVISIT). The DeckGate error is exactly the `accessible-error-announcement` case; the gate-after-interaction pattern should be reinstated for the gate + the glass-ui input. |
| Gate validation timing — show error only after interaction (F.W1; implicit in the gate UX) | `validate-input-after-interaction`, `required-field-feedback` (02) | `:user-valid`/`:user-invalid` **Widely 2023-11-02** | Corpus: `:user-invalid` defers the error to blur/submit (NOT page-load); `:invalid` is the hostile default that flags required-empty on load. Use `required`/`pattern`/`type=` HTML constraints; keep the submit button ENABLED (browser focuses the first invalid field on submit-attempt); MANDATORY JS to sync `aria-invalid` (no "UserInvalidChanged" event — hook `blur`/`input`). | **STRENGTHENS** (the gate-after-interaction timing is the authoritative pattern; the corpus' "keep submit enabled" + "first-invalid auto-focus on submit" are concrete UX the F.W1 spec should adopt) |
| Constellation dark-arm `--constellation-accent` has NO `.dark` override → `light-dark()` token lift (F-AUGMENT S6/F.W4; gate `proof:dark-red-contrast`) | `component-specific-light-dark-theme`, `dark-mode` (02) | `light-dark()` **Newly 2024-05-13**; `color-scheme` **Widely 2022-02-03** | Corpus: `light-dark()` resolves at COMPUTED-VALUE time — an inherited `<color>` set to a `light-dark()` value passes ONE resolved color to descendants, not the expression. CRITICAL: do NOT register design-token custom props as `<color>` (they'd snapshot and stop re-resolving under a descendant `color-scheme`); keep them UNregistered so they stay live. Pair `light-dark()` with `color-scheme: light dark` on `:root`. For browsers without `light-dark()`, the `prefers-color-scheme` media-query + custom-prop fallback. | **STRENGTHENS** (the `light-dark()` lift is the right fix for the missing `.dark` override; the corpus' "don't register color tokens as `<color>`" gotcha is a load-bearing caveat for the constellation token — keep `--constellation-accent` unregistered; add the `@supports (color: light-dark(white,black))` + `prefers-color-scheme` fallback since `light-dark()` is only Newly-2024) |
| Dark-glass densify 68%→92%, dark-red graphical-stroke contrast (F.W4; "blessed non-isomorphic delta") | `dark-mode`, accessibility §9 (02) | `color-scheme` **Widely 2022-02-03** | Corpus accessibility §9: 3:1 non-text contrast for UI component boundaries/states; do NOT denote state by color alone; honor `prefers-color-scheme` paired with `color-scheme`. Reach for `prefers-contrast: more` only when low-contrast accents need reinforcement. | **CONFIRMS** (the densify is a perceptual contrast fix the corpus 3:1 floor backs; the dark-red-contrast gate IS the corpus' non-text-contrast rule) |
| Mobile squish — fluid scaling, container-query sizing, `clamp()` (F-AUGMENT F.W3 / N-systemic; slides-digest §1) | `fluid-scaling`, `calculate-with-intrinsic-sizes`, `size-aware-styling` (02) | Container queries **Widely 2023-02-14**; `calc-size()` **limited** | Corpus: `cqi`/`cqb` units scale to the container; `clamp(min, Ncqi, max)` to bound; MANDATORY max ≤ 2.5× min for zoom/a11y; container-query fallback to `vw`/media-queries via `@supports (container-type: inline-size)`. The slides squish root-cause (hardcoded px in portrait `@container` blocks dropping below the `--space` floor) is exactly the corpus' "use cqi + clamp, not fixed px" mandate. | **STRENGTHENS** (the corpus' "max ≤ 2.5× min" a11y rule is a concrete bound the `proof:no-orphan-px` / squish fixes should honor; container queries Widely-2023 means the cqi-ization is fully safe) |
| Typography — display ladder, `text-wrap: balance`/`pretty`, stable font fallbacks (F-AUGMENT F.W6; slides-digest D10/D01) | `improve-text-layout-and-legibility`, `prevent-text-wrapping`, `visually-stable-font-fallbacks` (02); `css` §7 (03) | `text-wrap: balance` **Newly 2024-05-13**; `text-wrap: pretty` **limited** (no FF); `text-wrap` **Newly 2024-10-17**; `font-size-adjust` **Newly 2024-07-25** | Corpus: `balance` for headlines (≤6-10 lines, HIGH perf cost, NOT on `*`, avoid on boxed elements — leaves empty space); `pretty` for body (`<p>`/`<li>`/`<blockquote>`, medium cost); `text-wrap: nowrap` is the modern `white-space: nowrap` (keep `white-space` fallback); `font-size-adjust: from-font` normalizes fallback-font x-height to kill CLS during font swap. Use `rem`/unitless line-height. | **STRENGTHENS** (the display-ladder + balance/pretty discipline are Baseline-grounded; `pretty` is NOT Baseline (no FF) → gate it as enhancement; `font-size-adjust` (Newly-2024) is a NEW tool the F.W6 layer should add for the Fraunces/fallback CLS) |
| Constellation masks — soft-edge content fade (F-AUGMENT F.W4 S10 un-mask; `transparent 74%`→`90%`) | `soft-edge-content-fade` (02) | Masks **Newly 2023-12-07** | Corpus: `mask-image: linear-gradient(...)` fades the content itself (superior to a scrim overlay — no text-selection/pointer interference); MANDATORY the `-webkit-mask-image` prefix for older-browser coverage; `@supports not (mask-image…)` overlay fallback. The slides constellation uses a `linear-gradient` mask; the un-mask is tuning the gradient stops. | **STRENGTHENS** (the corpus mandates the `-webkit-mask-image` prefix alongside the standard — verify the slides mask carries both; masks Newly-2023 means the technique is safe) |
| Access modal — light-dismiss + declarative control (F.W1 access modal; new-deck Slide 5/6 XRAY window) | `light-dismiss-a-dialog`, `declarative-dialog-popover-control` (03); accessibility §11 + `css-layout` §5 (03) | `<dialog>` **Widely 2022-03-14**; `<dialog closedby>` **limited** (no Safari); Invoker commands **Newly 2025-12-12**; Popover **Newly 2025-01-27** | Corpus: use native `<dialog>` + `.showModal()` (browser makes outside inert — no focus-trap JS); `closedby="any"` for light-dismiss BUT it's NOT Baseline (no Safari) → MANDATORY the click-outside JS fallback (`event.target !== dialog` + `getBoundingClientRect` bounds check). Invoker commands (`command="show-modal"`/`commandfor`) are declarative but Newly-2025-12-12 (very recent) → polyfill (`invokers-polyfill`) + manual ARIA. `aria-labelledby`/`aria-label` MANDATORY for the dialog name. | **STRENGTHENS** (DeckGate restyles onto a glass Dialog (reka, not native `<dialog>`) — the corpus' native-dialog inert behavior is the gold standard the reka path must match; `closedby` is NOT Baseline so the JS light-dismiss fallback is mandatory; Invoker commands are too new to depend on — keep the JS event wiring) |
| Design-idiom tokens / `deck-theme.css` `@theme`+`@utility` (F.W6; "the gold standard slides adopts") | `css` §5 Design Tokens, §1 Foundations (03); `reduce-style-repetition`, `design-token-reactivity` (03) | tokens buildtime; `@function` **limited**; container style queries **limited** | Corpus tier model + "no inline nontrivial values" + `:where()` for token-driven selectors. Same authority as the glass-ui design-idiom item (§2.2). | **CONFIRMS** (slides adopting glass-ui's cascade is corpus-aligned; `@function`/style-queries stay non-Baseline so the buildtime `@theme`/`@utility` is the right tool) |

### 2.4 Performance + scheduling + the new deck (new-deck-spec / F.W-dock-consume / 03 crosscutting)

| spec item (file) | mwg use-case id | Baseline status + date | authoritative recipe note | verdict |
|---|---|---|---|---|
| Break up long tasks / schedule by priority (deck count-up, capture/export, large-array work — implicit in F.W5 export, deckNav) | `break-up-long-tasks`, `schedule-tasks-by-priority` (03) | Scheduler API **limited** (Chrome/Edge 129, FF 142; no Safari) | Corpus: `scheduler.yield()` inside async loops with a 50ms deadline; `scheduler.postTask({priority})` for user-blocking/visible/background; MANDATORY `setTimeout(0)` fallback (`scheduler.yield`) / `scheduler-polyfill` (`postTask`) since no Safari. | **STRENGTHENS** (not explicit in the specs; if the export/capture or count-up loops block the main thread, the scheduler pattern + Safari fallback is the authoritative recipe to fold — booked, low priority) |
| Faster SPA view transitions / view caching (slide page-transitions, XRAY portal mount) | `faster-spa-view-transitions` (03) | `content-visibility` **Newly 2025-09-15** | Corpus: `content-visibility: hidden` caches the rendering state of inactive views (CPU-cheap, RAM-costly); MANDATORY an LRU eviction strategy for dynamic apps; MANDATORY move focus to the new view (`activeView.focus()`); `@supports not (content-visibility: hidden)` → `display: none` fallback. The 6-slide deck is a small fixed view count (the corpus' "DO use for 3-5 tabbed interfaces" case). | **STRENGTHENS** (a candidate for the deck's slide caching — `content-visibility` Newly-2025-09-15 is recent but the small fixed slide count fits the safe case; the focus-management mandate aligns with the deck's nav a11y) |
| Optimize image priority (XRAY poster, hero images, new-deck cover) | `optimize-image-priority` (03) | Fetch priority **Newly 2024-10-29** | Corpus: `fetchpriority="high"` on the LCP image (cover hero); `fetchpriority="low"` on above-fold-but-hidden (XRAY poster behind the live frame, off-screen slides); NEVER `loading="lazy"` on the LCP; omit `fetchpriority` for normal priority. The XRAY poster (revealed-on-interaction) is the corpus' "deprioritize hidden-above-fold" case. | **STRENGTHENS** (Newly-2024-10-29 → safe; the XRAY poster + off-screen slide images are textbook `fetchpriority="low"` candidates — fold into the new-deck image story) |
| Brand-consistent forms — glass-ui form controls (`accent-color`, checkbox/radio/range theming) (glass-ui forms surface; AU-AUGMENT forms/idiom) | `brand-consistent-forms` (03); `css` §5 "Multiple choice controls" (03) | `accent-color` **limited** (no Safari) | Corpus: `accent-color: var(--brand)` tints checkbox/radio/range/progress with ONE line; pair with `color-scheme: light dark`; `accent-color` is NOT Baseline (no Safari) → `@supports not (accent-color: …)` + the visually-hidden-input custom-control fallback. DO NOT trust the browser to invert checkmark contrast (Safari/Android bugs). | **STRENGTHENS** (the glass-ui form primitives can adopt `accent-color` for the cheap brand tint, but the no-Safari status means the `@supports not` custom-control fallback is mandatory for full coverage; the spec's `appearance: none` + pseudo-element checkbox recipe matches the corpus fallback) |
| Slide page-transition `--spring-deck` (`.smooth` ζ0.85) vs dock `--spring-dock` — keep distinct (F.W-dock-consume §"One motion vocabulary") | `physics-based-easing` (01) | `linear()` **Newly 2023-12-11** | Corpus: `linear()` for physics curves; the dock SNAPS (overshoot) vs the page SETTLES (no overshoot) is exactly the corpus' per-job easing distinction. Both sample the same keyframes.js solver (the convergence). | **CONFIRMS** (the keep-distinct call is correct; both ride the Baseline `linear()` token form — no fork) |
| New-deck slide caching / portrait clearance / reveals lead-or-lockstep (new-deck-spec; F.W-dock-consume §"New-deck implications") | `dynamic-sibling-animations`, `faster-spa-view-transitions` (01/03) | `sibling-index()` **limited**; `content-visibility` **Newly 2025-09-15** | Corpus stagger rule (PRM-disable + JS fallback) + the lead-or-lockstep boundary (stagger on slide-body reveal only, never dock chrome). | **CONFIRMS** (the new-deck animation rules align with the corpus; `sibling-index()` stays non-Baseline so the existing `--d` custom-prop stagger is the right mechanism) |

---

## 3. DECISION CHANGES (the material strengthenings)

Where the authoritative guidance CHANGES or REVISITS a spec call.

### 3.1 `:user-invalid` REVISIT — reinstate the gate-after-interaction pattern

**Baseline: `:user-valid`/`:user-invalid` Widely available since 2023-11-02** (`required-field-feedback`,
`validate-input-after-interaction`, `accessible-error-announcement` — corpus 02). Over 2.5 years
Baseline-Widely — fully safe as a primary path.

AU's W3 KILL'd the `.input-pill :user-invalid` rung (per the AU charter's KILL batch). But the DeckGate
F.W1 error wants EXACTLY this: an error that shows only after the user has interacted (blur/submit),
not on page load. The corpus' `accessible-error-announcement` is the canonical recipe:

- **Visual layer:** `input:user-invalid { border-color … }` + `input:user-invalid ~ .error-msg { display: block }`.
- **A11y layer:** `aria-invalid="true"` + `aria-errormessage="…"` (or `aria-describedby`).
- **Bridge:** a JS utility listening `blur`/`input` (capture phase — they don't bubble) that checks
  `el.matches(':user-invalid')` and syncs `aria-invalid` (there is no "UserInvalidChanged" event).
- MANDATORY: error icon + text (not color alone), hint ABOVE the input, submit button stays enabled.

**Recommendation:** reinstate the `:user-invalid` pattern (gate-after-interaction) for BOTH the
DeckGate (F.W1) AND the glass-ui Input primitive. The Widely-2023 Baseline removes any reason to keep
it KILL'd; the DeckGate error is the consumer that needs it. The fallback (`WeakMap` interaction
tracking + `.user-invalid-fallback` class) is corpus-supplied if a pre-2023 target matters (it does
not for these apps). F.W1's `--destructive`→`--red-text` + `:focus-visible` ring edits compose on top.

### 3.2 VT keep-FLIP CONFIRMATION — the FLIP fallback must stay the live iOS path

**Baseline: View transitions Newly available since 2025-10-14** (`same-document-transitions` — corpus 01);
**active-view-transition Newly since 2026-01-13** (`directional-navigation-transitions`). View
transitions are only ~8 months Baseline; Firefox shipped them only in 144 (Oct 2025), and iOS Safari's
support is recent (Safari 18, Sep 2024). The dock's iOS-Safari path therefore CANNOT rely on VT.

This STRENGTHENS AU.W8: the spec already names "FLIP is the live iOS path; the §2.2 fix MUST land in
the FLIP fallback." The authoritative date is the proof — VT only went Baseline a month ago (relative
to the 2026-06-05 authoring date), so the FLIP fallback is load-bearing, not a legacy hedge. The
`proof:dock-motion-single-source` settle probe targeting the FLIP path (VT disabled) is correct.
**Corpus addition the spec should fold:** the MANDATORY post-VT focus-routing
(`tabindex="-1"` + `.focus()` on the revealed view) — VT does not manage focus, and a layer-morph that
hides the focused element abandons focus for keyboard/AT users.

### 3.3 `::-webkit-scrollbar` fallback CAVEAT — do NOT strip it

**Baseline: `scrollbar-color` Newly available since 2025-12-12** (`dark-mode` — corpus 02). Only ~6
months Baseline (and only reached Safari in 26.2, Dec 2025).

AU-AUGMENT §5.4 originally directed "guard `-webkit-scrollbar` under `@supports not(scrollbar-color)`"
and (in a looser reading) "remove `-webkit-*`." The corpus DIRECTLY corrects the strip impulse:

> "If the user's Baseline target is 'Baseline Widely Available' or earlier, you SHOULD include the
> non-standard `::-webkit-scrollbar` pseudo-elements as fallbacks. Wrap legacy fallbacks in
> `@supports not (scrollbar-color: auto)`."

Because `scrollbar-color` is only **Newly** (not Widely), any "Widely Available" Baseline target MUST
keep `::-webkit-scrollbar`. AU.W8b §7 already re-grounded to KEEP the guarded `::-webkit-scrollbar`
(and found the directive's line numbers stale). The corpus is the authority that ratifies KEEP —
record it so the FINAL does not re-flag the strip. (Also from `dark-mode`: do NOT animate/transition
`scrollbar-color` — a WebKit flicker bug; and on macOS pair with `scrollbar-width` or the colors are
ignored.)

### 3.4 `@property` typed tokens — type the interpolated spring/animated custom props

**Baseline: Registered custom properties (`@property`) Newly available since 2024-07-09**
(`navigation-drawer` — corpus 03). Nearly 2 years Baseline.

The corpus makes `@property` MANDATORY for any custom property that is INTERPOLATED (animated /
transitioned): without a typed `syntax` registration, the browser treats it as a string and JUMPS
between keyframes instead of interpolating (the drawer recipe registers `--drawer-backdrop` as
`<number>`; CSS §9 registers `--animation-reduced`).

**Recommendation (STRENGTHENS the design-idiom layer):** if any dock or deck custom property is the
TARGET of a transition/animation (e.g. a numeric progress var driving an inline morph, or an animated
color), register it with `@property` so it interpolates correctly. The `--spring-*` `linear()` tokens
are easing FUNCTIONS (not interpolated values) so they do NOT need registration — but a per-element
animation target (e.g. a `<number>` progress or a `<color>` being animated) DOES. **Caveat from
`component-specific-light-dark-theme`:** do NOT register DESIGN-TOKEN color props (e.g.
`--constellation-accent`, `--surface-color`) as `<color>` — registration snapshots the resolved color
and breaks `light-dark()` re-resolution under a descendant `color-scheme`. Register only per-element
animation targets, never the design tokens. This is the precise boundary §2.2 + §2.3 flag.

### 3.5 `interpolate-size` confidence — the W8b visibility-fork fold is Baseline-safe behind `@supports`

**Baseline: `@starting-style` + `transition-behavior` Newly available since 2024-08-06**
(`animate-element-entry-exit` / `animate-to-from-top-layer` — corpus 01). Over 1.5 years Baseline.

The two properties carrying the AU.W8b §1 visibility-fork fold (`@starting-style` for the entry,
`transition-behavior: allow-discrete` for the discrete `visibility` flip) are >1yr Baseline-safe — so
the fold, gated behind `@supports (transition-behavior: allow-discrete)` with the hand-rolled
3-state fork as the fallback, is sound. The COMPANION `interpolate-size`/`calc-size()` (the `.dock-layers`
auto-width path) is NOT Baseline (Chrome/Edge 129 only) — but the spec correctly `@supports`-gates it
with the FLIP fixed-pixel fallback. **Correction to a loose claim:** AU.W8b §1's risk note says
"`calc-size(auto, size)` … (Baseline 2024)" — `calc-size()`/`interpolate-size` are NOT Baseline
(they are *limited*: Chrome/Edge only). The `@supports` gate is therefore not optional polish but the
required correctness mechanism. The fold is safe BECAUSE of the gate, not because the feature is Baseline.

### 3.6 `text-wrap: pretty` and `accent-color` are NOT Baseline — gate them

Two slides/forms items lean on features that are NOT Baseline:

- **`text-wrap: pretty`** (`improve-text-layout-and-legibility` — corpus 02) is **limited** (no
  Firefox). The F.W6 typography ladder can use `balance` (Newly-2024-05-13, safe) freely but must
  treat `pretty` as a progressive enhancement (it degrades to default `wrap` harmlessly — no `@supports`
  strictly needed, but do not depend on it for layout).
- **`accent-color`** (`brand-consistent-forms` — corpus 03) is **limited** (no Safari). Any glass-ui
  form-control brand tint via `accent-color` needs the `@supports not (accent-color: …)` custom-control
  fallback for Safari coverage.

Neither is in a spec as a hard dependency, but flag them so a later edit pass does not promote them to
primary paths.

---

## 4. Per-spec strengthening notes (for a later edit pass)

The highest-value Baseline annotations to thread into each spec.

### AU-AUGMENT.md (§2.4 ADOPT/DEFER, §5.4 styling)
- §2.4 — annotate each row with the Baseline date: `interpolate-size`/`calc-size()` are **limited** (NOT
  "Baseline 2024" as loosely stated) → the `@supports` gate is the correctness mechanism; `@starting-style`
  + `transition-behavior` **Newly 2024-08-06**; View transitions **Newly 2025-10-14** (the date that
  makes FLIP the live iOS path); anchor positioning **NOT Baseline** (the reka-`TabsIndicator` JS path
  is primary, `anchor()` the enhancement); individual transforms **Widely 2022-08-05**.
- §5.4 — fold §3.3: `scrollbar-color` is **Newly 2025-12-12**, so KEEP the `@supports not(scrollbar-color)`-guarded
  `::-webkit-scrollbar` (do not strip); add the "do not animate `scrollbar-color`" WebKit-flicker note.
- §5.4 — add the `@property` typing note (§3.4) for any interpolated custom prop, with the
  "never register design-token colors as `<color>`" boundary.

### AU.W8-dock-motion.md
- §2.4/Step 2 — `linear()` is **Newly 2023-12-11** (safe); add the corpus' "avoid opacity overshoot
  flicker" caveat — clamp the dock opacity to `[0,1]` since `--spring-dock` overshoots ~+18.5%.
- §2.5 PRM — the corpus VT-PRM selector triad (`::view-transition-group/old/new(*) { animation:none }`)
  is exactly the gate; cite it; add the CSS §9 "don't blanket-zero `animation-duration`" rule.
- Step 4 (rail) — `anchor-positioning-tab-underline` is the EXACT recipe; cite it; note anchor
  positioning is NOT Baseline so `TabsIndicator` is primary; keep `aria-selected`/`aria-current`
  (the corpus' "visual indicator must not replace ARIA state").
- VT section — fold the MANDATORY post-VT focus-routing (`tabindex="-1"` + `.focus()`); VT does not
  manage focus (§3.2).

### AU.W8b-modern-css.md
- §1 — correct the risk note: `calc-size()`/`interpolate-size` are **limited** (Chrome/Edge only), NOT
  Baseline 2024; the `@supports` gate is required, not optional (§3.5). `@starting-style`/`allow-discrete`
  are **Newly 2024-08-06** — Baseline-safe (§3.5). Add the corpus' "do NOT put `allow-discrete` in the
  `transition` shorthand" rule (the spec uses a separate declaration — confirm it stays that way).
- §7 — §3.3: the corpus is the authority for KEEP `::-webkit-scrollbar` (already re-grounded); add the
  Baseline date.
- §8 anchor — `anchor-positioning-tab-underline` recipe + `position-aware-tooltips` (anchored container
  queries are **limited** Chrome/Edge 143 only — the arrow-reposition enhancement is far from Baseline);
  the `@supports (anchor-name: --x)` gate is mandatory; floating-ui stays the unconditional fallback.

### AU-keyframes-coordination.md
- §4 — `linear()` **Newly 2023-12-11** ratifies the build-time `springLinearStops` emit; the
  build/runtime bit-identity invariant is the corpus' "store easing as a reusable custom property" note.
- Add the opacity-overshoot-flicker caveat (the dock opacity should not ride the overshooting spring
  unclamped).

### AU-gate-fleet-augment.md
- §5 `proof:design-idiom-localization` — the corpus' tier model + "no inline nontrivial values" +
  `@function` is **limited** (so `@theme`/`@utility`, not CSS `@function`, is the DRY tool) is the
  authority behind the gate.

### F-AUGMENT.md / slides-digest.md
- N1 progress bar — `scroll-progress-indicator`: MANDATORY `aria-hidden="true"` on the decorative bar
  + `scaleX` (compositor) not `width`; fold the `aria-hidden` assertion into `proof:progress-bar-detached`.
- F.W1 DeckGate — §3.1: `:user-invalid` **Widely 2023-11-02** → reinstate gate-after-interaction +
  the `aria-invalid`↔`:user-invalid` JS bridge + `aria-errormessage`; `:focus-visible` (not `:focus`).
- F.W4 constellation — `light-dark()` **Newly 2024-05-13** + the "don't register color tokens as
  `<color>`" gotcha; pair with `color-scheme` + the `prefers-color-scheme` fallback. Masks
  (`soft-edge-content-fade`) **Newly 2023-12-07** — verify the `-webkit-mask-image` prefix is present.
- F.W6 typography — `text-wrap: balance` **Newly 2024-05-13** (safe), `pretty` **limited** (gate as
  enhancement); add `font-size-adjust` **Newly 2024-07-25** for fallback-font CLS.
- F.W3 squish — container queries **Widely 2023-02-14** (safe); fold the corpus' "max ≤ 2.5× min"
  clamp a11y bound.

### new-deck-spec.md
- Slide 5/6 XRAY window / access modal — `light-dismiss-a-dialog`: `<dialog closedby>` is **limited**
  (no Safari) → JS light-dismiss fallback mandatory; Invoker commands **Newly 2025-12-12** (too recent
  to depend on — keep JS wiring); `<dialog>` itself **Widely 2022-03-14**.
- Image priority — `fetchpriority` **Newly 2024-10-29**: `high` on the cover LCP, `low` on the XRAY
  poster + off-screen slide images.
- Slide caching — `content-visibility` **Newly 2025-09-15** is a candidate for the 6-slide fixed set
  (the corpus' safe "3-5 view" case) + the MANDATORY focus-management on view-swap.

### F.W-dock-consume.md
- §"One motion vocabulary" — `physics-based-easing` **Newly 2023-12-11** ratifies the
  `--spring-deck` (settle) vs `--spring-dock` (snap) per-job split; both ride the Baseline `linear()`
  form — keep distinct (CONFIRMS).
- §"Reveals lead-or-lockstep" — `dynamic-sibling-animations` (`sibling-index()` **limited**, no FF)
  confirms the existing `--d` custom-prop stagger is the right mechanism (not `sibling-index()`); keep
  stagger to slide-body reveal only, never dock chrome.
