# Tranche AQ — the platform-native substrate (modern-web)

AQ modernizes glass-ui's substrate to the browser platform. The library is mature and token-first, but
it predates the `light-dark()` / `color-scheme` / anchor-positioning / View-Transitions /
scroll-driven-animation / `:has()` / customizable-`<select>` era, and it hand-rolls in JS (reka-ui +
keyframes.js) a large set of behaviors the platform now owns natively. AQ swaps the hand-rolled paths
for the platform primitives — cutting code, moving work off the main thread (the consumer INP lever),
fixing a live consumer correctness bug — without losing the glassmorphic look. It is the substrate half
of a coordinated cross-repo pair: AQ ships the primitives; **muster tranche J** is the first adopter.

AQ is in DEVELOPMENT now. W0-W1 formulate the tranche (the 6-agent modern-web baseline audit + the
design slices); W2-W8 are authored-now-run-later — the implementation phase opens only on explicit user
authorization. The dev/impl boundary sits between W1 and W2.

## § Thesis

The AQ.W0 audit (a 6-agent analysis against Google's modern-web-guidance corpus + a real Lighthouse run
on the consumer muster) found glass-ui hand-rolling, in JS, what the platform now does in CSS or
declarative HTML: a 142-line `.dark` token mirror that `light-dark()` collapses; HSL-channel alpha
derivatives that produce a **malformed color that never paints in consumers** (`color-mix()` fixes it);
zero `color-scheme` (so native UI ignores dark mode); zero `:has()`/`:user-valid` (so consumers
hand-roll validity + parent-state class toggles); per-frame offset-FLIP tab underlines + a 165-line
dock FLIP + scroll/IntersectionObserver loops (anchor positioning + View Transitions + scroll-driven
animations replace them); per-frame inline-style dialog entry (`@starting-style` replaces it); and a
10-file JS `<select>` rebuild (the customizable native `<select>` exists now). Each is a documented
modern-web-guidance lever with a real file:line site.

**AQ makes glass-ui platform-native** — every swap keeps the current path as the documented fallback,
so the publish degrades gracefully on any consumer target.

## § Binding question

Can glass-ui adopt the platform-native substrate — `color-scheme` + `light-dark()` + `color-mix` alpha
(fixing the consumer `hsl(var())` bug) + `accent-color` + forced-colors focus; `:has()` + `:user-valid`
+ individual transforms + `text-wrap` + tokenized scrollbars; a `:user-invalid`/required-field/
`field-sizing`/native-`<select>` form vocabulary; scroll-driven animations + `@starting-style` + a
View-Transitions motion substrate; anchor-positioned underlines + native `<dialog>`/popover +
`interestfor` + `command`/`moveBefore` + a dock VT swap; and a heavy-leaf bundle guardrail — all
token-first, every Newly/Limited feature feature-detected with the current path kept as the fallback,
the visual-regression + token-proof + profile gates green, and muster J adopting each as the proof of ≥
2 consumers?

## § Goal criterion

AQ succeeds when the substrate is platform-native, gated, and adopted:

- **Color & theming (W2)** — `color-scheme` set; the `.dark` mirror collapsed via `light-dark()`; alpha
  derivatives on `color-mix` (the consumer `hsl(var())` bug fixed); `accent-color` set; forced-colors
  focus restored.
- **Selectors & transforms (W3)** — `:has()` parent-state styling; individual transforms with an
  identity base (the stacking-context hazard closed); `text-wrap`; tokenized scrollbars.
- **Form vocabulary (W4)** — `:user-invalid`/`:user-valid` + the `aria-invalid` bridge; attr-passthrough
  contract; `field-sizing`; `required` + error slot; the native-`<select>` primitive (gated on a
  consumer); `:focus-visible` consistency.
- **Motion → platform (W5)** — scroll-driven CSS replaces the scroll/IO composables (kept as fallback);
  `@starting-style` top-layer animation; a `useViewTransition` motion substrate.
- **Anchor & top-layer (W6)** — anchor-positioned tab underline (JS FLIP retired); native-`<dialog>`
  pilot with `commandfor` + light-dismiss; `interestfor` tooltips (opt-in); dock VT/anchor swap;
  `moveBefore` for re-parented top-layer.
- **Bundle guardrail (W7)** — the heavy-leaf carve + barrel-vs-subpath delta (the consumer payload
  ceiling); value.js full-laziness coordination; container-style-query density (progressive).
- **Gates green + consumers adopt** — visual-regression + token-proof + `profile:budget`/`profile:bundle`
  + typecheck throughout; each platform primitive proven by muster J's adoption (the ≥ 2-consumer bar).

## § Completion criterion

The development half (W0-W1) completes when the W0 baseline audit + the W1 design slices verify (the
`light-dark()` inheritance-safe token design; the `color-mix` migration map; the `:user-invalid` +
`aria-invalid` bridge contract; the scroll-driven `@supports` boundary; the anchor-positioning fallback
ladder; the native-`<select>` API). The implementation half (W2-W8) completes when every wave's hard
gate verifies (VR snapshots, the token-resolution proof, the profile budgets, the listener-count + grep
gates) and the close ceremony (overfitting audit — every new primitive has ≥ 2 consumers or a demo or is
not shipped — + AQ.FINAL + the 3.x fold) lands.

## § Wave sequence

| Wave | Disposition | Contents |
|---|---|---|
| **W0** | DEV — done | 6-agent modern-web baseline audit (`audit/W0-modern-web-baseline.md`) |
| **W1** | DEV — done | Design slices W1.1-W1.3 authored + verified; AQ↔J couplings (`useUserInvalidAria`, `useViewTransition`) cohere; the 71-site `hsl(var())` classification (64 bug / 6 legit) + the `/number-field`+`/switch` subpath deliverable folded into W7 (`audit/W1-design-close.md`) |
| **W2** | IMPL | **Color & theming** — `color-scheme` + `light-dark()` mirror collapse + `color-mix` alpha (consumer bug fix) + `accent-color` + forced-colors focus |
| **W3** | IMPL | **Selectors & transforms** — `:has()` parent-state + individual transforms (identity base) + `text-wrap` + tokenized scrollbars |
| **W4** | IMPL | **Form vocabulary** — `:user-invalid`/required-field + `aria-invalid` bridge + attr-passthrough + `field-sizing` + native `<select>` + `:focus-visible` |
| **W5** | IMPL | **Motion → platform** — scroll-driven animations + `@starting-style` top-layer + the `useViewTransition` substrate |
| **W6** | IMPL | **Anchor & top-layer** — anchor-positioned underline + native `<dialog>`/popover + `interestfor` (opt-in) + dock VT swap + `command`/`moveBefore` |
| **W7** | IMPL | **Bundle guardrail** — heavy-leaf carve + barrel-vs-subpath delta + value.js laziness + container-style-query density + **subpath completeness (`+/number-field`, `+/switch`)** so muster J.W4 can fully sweep (`/drawer` stays root-barrel by AN.W3) |
| **W8** | IMPL | Close — overfitting audit + AQ.FINAL + the 3.x fold |

Ordering rationale: W2 (color) is the foundation — `color-scheme` precedes `light-dark()` precedes
tokenized scrollbars/`accent-color`, and the `color-mix` migration fixes the live consumer bug first.
W3-W4 are the CSS-selector + form vocabulary. W5-W6 are the JS→platform swaps (the largest LOC cuts).
W7 is the bundle guardrail. The Baseline-Limited reaches (`interestfor`, native `<select>`, `moveBefore`,
style queries) are gated as progressive-enhancement-only with the current path kept.

## § Inherited invariants

All standing glass-ui invariants bind unchanged. Load-bearing for AQ:

- **Token-first** — every visual axis stays a CSS custom property; platform features resolve THROUGH
  tokens (e.g. `light-dark()` lives in the token tier, not scattered in components).
- **No backwards-compat alias** — a platform swap RETIRES the hand-rolled path OR keeps it as the SOLE
  feature-detected fallback. Never both live + dead (the keyframes.js spring, the reka-ui wrapper, the
  JS FLIP — each is removed where AQ goes native, or kept as the documented fallback).
- **Substrate-without-consumer is binary** — a new primitive (native `<select>`, `interestfor`
  tooltip, the `useViewTransition` helper) ships ONLY with ≥ 2 consumers or a demo. muster J's adoption
  is the proof; a primitive J does not adopt is gated to a demo or not shipped.
- **The overfitting audit runs at close** — `docs/audits/overfitting-audit.md` against every AQ artefact.
- **vueuse-/keyframes-free root barrel (L/AP)** — the SCC-trap closure holds; a platform swap that
  removes a keyframes.js spring is a payload win, not a barrel-shape change.
- **The fallback is mandatory for Newly/Limited features** — the SKILL.md Baseline policy binds; every
  such wave ships the ≤ 20-LOC feature-detected fallback (no runtime-dep polyfills).

## § Cross-repo perimeter (EXECUTION-AUTHORIZED — green-gated)

AQ is the substrate; muster J adopts it via the published glass-ui (the contract-v2 dev-resolution, not
a source reach-around). The outward leg is now **orchestrator-authorized** (green-gated, secret-safe —
never echo/commit `NPM_TOKEN`): the staged **3.0.0 publish** (GATE 1) lands first, then the AQ
implementation publishes a glass-ui **3.x minor per wave** (each additive + fallback-guarded, so
SemVer-minor — GATE 2), which muster J's platform-adoption waves gate on. AQ.W2's `color-mix` migration
is the substrate fix for muster's live `hsl(var(--border) / α)` bug — delivered to the consumer through
the publish. Conductor + gate order: `docs/constellation/MODERN-WEB-EXECUTION-PLAN.md` (tasks
#160–#169).

## § Successor

AQ closes the modern-web substrate arc for glass-ui. Named-forward contingencies: customizable
`<select>` + `interestfor` graduate from opt-in to default when they reach Baseline Widely Available;
the dock VT swap + native drawer extend to more surfaces as consumers adopt.
