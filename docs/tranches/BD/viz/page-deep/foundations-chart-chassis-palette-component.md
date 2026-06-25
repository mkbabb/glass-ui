# Pass-E COMPONENT DEEP AUDIT — foundations/chart-chassis-palette

**Page:** `/foundations/chart-chassis-palette` (`demo/stories/foundations/chart-chassis-palette.vue`)
**Real component(s) under audit (src, not demo):**
- `src/components/custom/instrument-chassis/InstrumentChassis.vue` — the page's ONE live protagonist (the rest of the page is `<TokenLadder>` swatch rows + plain token-color tiles)
- `src/components/custom/instrument-chassis/ChassisDivider.vue` — the twin-line hairline groove primitive (catch-light + under-shadow)
- `src/styles/instrument-chassis.css` (449 L) — the chassis surface composite + the `--phase-color` cascade + the `@property --phase-tint-amount` warmth ramp + the mobile/desktop dial reserves
- `src/styles/tokens/property-regs.css §--phase-tint-amount` · `src/styles/tokens/scheme-motion.css §--phase-tint-peak` · `src/styles/tokens/offsets.css §--chassis-max-block-size`
- Tokens demoed (NOT components): `--chart-{ping,download,upload,jitter}`, `--glass-bg-{dock,chassis}`, `--glass-curvature-overlay`, `--glass-specular`

No procedural viz backs this page — it is a chart/chassis TOKEN tour. The single live component is `<InstrumentChassis phase="ready">` with three trivial mono-caption slots ("strip region" / "dial region" / "control region").

---

## 1. ANIMATION — affordance, dead/janky/missing

**The headline finding (the page captures the chassis FROZEN at its weakest moment).** `<InstrumentChassis>` carries exactly ONE animated register: the `--phase-color` + `--phase-tint-amount` cascade, a chassis-wide retint on `data-phase` change. It is genuinely well-built — the tint amount is a typed `@property --phase-tint-amount` (`property-regs.css:73`), so the `color-mix` warmth ramp INTERPOLATES (0% idle → `--phase-tint-peak` 6%) over the `--motion-duration-phase-handoff` clock with `--motion-ease-standard`, PRM-bracketed to an instant discrete swap. That is motion-canon-correct: an EFFECTS channel (color/tint) on a bezier, not a spring (P1), PRM-keeps-the-state-drops-the-tween (P6).

BUT the page mounts the chassis at `phase="ready"` and never changes it — so the ONE animation the component has is **never exercised on this page**. The page shows a dead-still chassis, and the cascade (the component's whole motion story) is invisible. The demo proves nothing the docstring claims ("retints every consumer with a single transition").

**Four-state contract: structurally absent (by design — and that is the real gap).** `<InstrumentChassis>` is a non-interactive `<section>` — zero `:hover` / `:active` / `:focus-visible` rules in `instrument-chassis.css` (grep-verified: 0). It is a HOUSING, not a control, so the literal four-state contract does not bind it. The relevant contract is ENTRANCE/EXIT, and the chassis has **neither** — no mount bloom, no `.glass-reveal`, no `.scroll-cascade` build, no `vReveal`. A surface this load-bearing (the speedtest instrument hero) arrives with a hard cut. Under the BD HIGH-animation-affordance bar (DESIGN.md spring physics + motion-canon entrance/exit on EVERY component), the chassis is the lowest-affordance surface in the design-language band: ONE bezier tint cross-fade and nothing else.

**`--phase-tint-peak` 6% is sub-perceptual.** The warmth ramp the component's whole motion narrative rides peaks at a 6% `color-mix` toward `--phase-color`. On a chassis-tier plate that is a whisper — the "warmth cross-fades alongside the hue" claim is barely a frame of color delta. The hue retint (`--phase-color` itself, read by the fills/labels) is the load-bearing event; the tint companion is near-dead.

## 2. PROCEDURAL VIZ
None. The page is a token tour — no aurora/blob/fourier/concentric. NO PROCEDURAL-SUITE obligation. **But that IS a finding against the user's mandate:** "glass demos over COLORFUL aurora backgrounds" + "each page deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)." This page stages a flat gray-card swatch tour over a FLAT GRAY background (capture `_cap-chart-chassis-light.png` confirms it: no field, no aurora, monochrome). The chassis — which exists to read PHASE COLOR off a live meter — is shown over nothing, at rest, with empty slots. It demos the chart palette as static squares instead of letting the chassis cycle the palette live (the obvious deft composition: a `<DockBackgroundToggle>` / phase-stepper driving the chassis through ping→download→upload→jitter→complete over an aurora field).

## 3. PERFORMANCE
- The `--phase-tint-amount` transition is a typed-`@property` percentage interpolation feeding a `color-mix` `background` — a paint-only animation (NOT compositor-promoted, but also not a layout property; no reflow). Acceptable for a 6%/600ms one-shot on phase change; would be a concern only if it fired per-frame (it does not).
- `backdrop-filter: var(--glass-blur-quiet)` — one backdrop-filter layer, static. Fine.
- The dial reserves are STATIC `min-height` / `min-block-size` (mobile `@container chassis (max-width:44.9375rem)` + desktop `(min-width:45rem)`) — frame-0 box reservations, NEVER animated heights — so the CLS story is clean (`proof:no-layout-animation` holds; the BB.W-DESKTOP-RESERVE B3 disjoint-complement is correctly authored). **Good architecture, real CLS≈0 contract.**
- No rAF, no canvas → no offscreen-pause concern on the chassis itself.

## 4. SAFARI COMPATIBILITY
- **`backdrop-filter: var(--glass-blur-quiet)` is written BARE — NO `-webkit-backdrop-filter` companion** (grep-verified: 0 in `instrument-chassis.css`). On Safari ≤17 / older WebKit the chassis plate blur silently DROPS — the glass plate flattens to its tint-only fill, losing a full optical layer. This is the same bare-`backdrop-filter` Safari gap flagged on overlays-scrims; it recurs across the glass ladder and wants a systemic prefixed-pair sweep.
- `color-mix(in oklab, …)` and `@property` are Newly-Available; Safari 18+ OK; on a gap engine the `@property` falls back to the `initial-value` (0%) — the chassis reads its untinted plate, a safe degrade.
- No other WebKit-hostile primitive.

## 5. IDIOMATIC / NO-LEGACY / dual-path
- **The `complete`-phase ink is correctly de-hardcoded** (BB.W-PHASE-PALETTE — `--phase-complete-color` consumer seam, no `--color-gold` dual-read). Clean, idiomatic. No legacy residue in the phase cascade.
- **`InstrumentChassisVariant = "glass" | "spine" | "structure"` — verify live consumers.** `"glass"` is the default (every speedtest/survey consumer). `"spine"` (HOUSING register, ~40-line docstring) and `"structure"` (silver milled-metal, BA.W-ATLAS-RECONCILE C-3) each carry heavy prose; `structure` claims "consumer #2 of the silver quad." The `spine` variant's value is a question — it is an App-level mount register with no demo and an uncertain live binding; it reads as substrate-with-thin-consumer. Worth a ≥2-consumer re-confirm at the BD overfitting-audit close (not necessarily a prune, but the prose-to-consumer ratio is high).
- **Docstring prose is heavy** (the `InstrumentChassis.vue` header is ~60 lines of variant narration; `instrument-chassis.css` opens with a 20-line essay). The user's "tighten superfluous language" mandate applies to the component docstrings too, not just the demo blurbs.
- **The demo references a "resolved drift" section** (a `--viz-topology`/`--viz-recursion` post-mortem) that is pure changelog narration in a token-tour page — superfluous, prunable.
- No dual-path, no dead enum arm in the component itself (unlike ModalOverlay). The chassis is structurally clean; its gaps are affordance + Safari + prose, not architecture.

## 6. THE GLASS SIX-LAYER COMPOSITE
Partial — the chassis carries a credible but INCOMPLETE iOS-27 composite:
1. **Backdrop blur+saturate** — `backdrop-filter: var(--glass-blur-quiet)` ✓ (but bare — Safari §4) — and NO saturate companion (the BC dark-arm `saturate(1.22-1.35)` luminosity-lift is a dark-mode glass register the chassis plate does not opt into; the plate is blur-only).
2. **Surface tint** — `color-mix(in oklab, --glass-bg-chassis, --phase-color …)` ✓ (the phase-tint companion).
3. **Edge rim** — `border: 1px var(--glass-border-wash)` + the engraved-bezel `::before` inner stroke (`--surface-tint-4`) ✓✓ (twin-stroke, genuinely well-done — the chassis's strongest optical layer).
4. **Inner catch-light** — the `--glass-curvature-overlay` radial-gradient layered in `background` ✓ (the "glass under angled light" band) — but STATIC, never pointer-tracked (no `useSpecularPointer` / `vSpecular` — the BC tier-root specular auto-arm W-LIQUIDHOVER does NOT reach the chassis; the catch-light is a fixed gradient, not a living gleam).
5. **Drop shadow** — `box-shadow: var(--glass-shadow-quiet), inset 0 -0.5px … 0.06` ✓.
6. **Grain** — ABSENT. The chassis carries no `--paper-clean-texture` grain `::after` (the BC liquid-hover grain layer).

So **4.5 of 6 layers present, statically.** The chassis predates the BC deep-glass / lensing / glass-accent / liquid-hover band entirely — it is a calm-tier W-GLASS-CAL plate that never opted into the iOS-27 refractive registers. The user's DESIGN.md north star (deep refraction, living catch-light, the full six-layer composite) is under-delivered: the chassis is a competent 2024-era glass plate, not a 2026 liquid-glass surface. The strongest path is to opt the chassis plate into `.glass-lens` (edge-concentrated squircle refraction) + the `vSpecular` pointer catch-light + the deep tier on the dial hero — turning a static plate into the refractive instrument housing DESIGN.md describes.

---

## FINDINGS → BD WAVE MAP

| # | Finding | Disposition | Wave |
|---|---------|-------------|------|
| 1 | The page mounts `<InstrumentChassis phase="ready">` STATIC — the ONE animation the component has (the `--phase-color`/`--phase-tint` cascade) is never exercised; the chassis is shown dead-still with empty slots | **MODIFY** (demo) — drive the chassis through ping→download→upload→jitter→complete on a stepper/`<DockBackgroundToggle>` so the phase cascade animates LIVE; this is the chassis's whole motion story | `BD.W-TOKEN-TOUR-GLASS` (the token-tour page-modernization vehicle — extend its Arm-B live-demo clause to the chassis cascade) |
| 2 | Flat gray swatches over a FLAT GRAY background; sub-sections share one wrapper; main area small; no aurora; no deft component series (the user's 4 explicit asks) | **MODIFY** (demo) — each sub-section its OWN glass card via `<ShowcaseFrame>`; the live chassis + chart swatches over a COLORFUL aurora field via `tier="field"`; enlarge the main/chassis area; compose dock/cards/tabs deftly | `BD.W-TOKEN-TOUR-GLASS` (Arm A wrapper-fold + Arm B field-staging — this page JOINS its fleet; **note: NO `BD.W-PAGE-BACKGROUND` exists — the aurora-staging here must ride TOKEN-TOUR-GLASS's `tier="field"` over the page's designed wash, NOT a new GL context, to keep the one-GL-per-route + M8 GL-on-static-wash fences GREEN**) |
| 3 | `<InstrumentChassis>` has NO entrance/exit and NO four-state — arrives with a hard cut; lowest animation-affordance surface in the band | **AUGMENT** (src) — give the chassis a mount bloom (`.scroll-cascade` build or a `.glass-reveal`-clocked entrance) + opt the dial hero into the BC living-catch-light (`vSpecular`/`useSpecularPointer`) so the catch-light tracks the pointer | `BD.W-BC-COMPONENT-CANON` (extend the component-canon sweep to the chassis: entrance + tier-root specular auto-arm reach) |
| 4 | Bare `backdrop-filter` with no `-webkit-` pair — Safari ≤17 drops the chassis plate blur | **MODIFY** (src) — add `-webkit-backdrop-filter` companion (systemic glass-ladder Safari sweep — recurs on overlays-scrims) | `BD.W-BC-COMPONENT-CANON` (Safari-bar clause, shared with the ladder sweep) |
| 5 | Six-layer composite is 4.5/6 STATIC — no grain, no saturate companion, static (not living) catch-light, no deep/lens refraction; a 2024 plate, not a 2026 liquid-glass surface | **AUGMENT** (src) — opt the chassis into the BC band: `.glass-lens` edge refraction on the dial, the `vSpecular` living catch-light, the deep tier on the hero dial; calibrate `--phase-tint-peak` up from the sub-perceptual 6% | `BD.W-DEEP-GLASS-20PX` (deep-glass calibration band — add the chassis as a consumer) + `BD.W-GLASS-LENS-CHROMA` |
| 6 | Heavy docstring prose (60-line variant narration + 20-line CSS essay); the demo's "resolved drift" changelog section; non-standardized import label | **MODIFY** — standardize import label (`@mkbabb/glass-ui/instrument-chassis`); prune the "resolved drift" changelog section; tighten the component docstrings | `BD.W-PAGE-HEADER-FOLD` (import-label standardization) + `BD.W-PRECEPTS-README-FRESHEN` (prose) |
| 7 | `spine` variant — high prose-to-consumer ratio; uncertain ≥2 live binding | **PRUNE-CANDIDATE** — re-confirm the `spine`/`structure` ≥2-consumer bar at the BD overfitting-audit close; prune `spine` if the App-level binding is not real | `BD.W-WEAK-KEEP-REGRADE` (the substrate-without-consumer re-grade arm) |

No NEW wave needed — every finding folds onto an existing BD wave. The page-redesign asks (1/2) ride `BD.W-TOKEN-TOUR-GLASS`; the genuinely-component upgrades (3/4/5) ride `BD.W-BC-COMPONENT-CANON` + the deep-glass band; 6/7 are the prose/overfitting cleanups. The ONE structural caveat to flag to the orchestrator: there is NO `BD.W-PAGE-BACKGROUND` wave on disk — the "aurora background" ask must be satisfied via `tier="field"` over the designed page wash (the one-GL-per-route + M8 fences), NOT a new per-page GL context.
