# Pass-E COMPONENT deep audit — foundations/icons → `<IconChip>`

**Page:** `demo/stories/foundations/icons.vue` · **Import label:** `@mkbabb/glass-ui/icon-chip`
**Component:** `src/components/custom/icon-chip/{IconChip.vue,types.ts,index.ts}` + `src/styles/icon-chip.css`
**Animation dep:** `src/composables/motion/vReveal.ts` (the entrance directive)
**Date:** 2026-06-23 · branch `tranche/BB`

---

## 0 · What this component IS (and is NOT)

`<IconChip>` is the library's ONE color-event vehicle (BA.W-ICON-CHIP): a `color-mix(… --icon-chip-plate-strength, transparent)` circular backplate under a full-chroma lucide glyph, walked over the 13-stop `--section-color-N` ramp (or a complete `tone` token). It is a `<span>`-rooted, NON-interactive presentational primitive. Three opt-in axes — `:duotone` (low-α same-hue fill under the stroke), `:bloom` (the smooth-glass hover register), `:saturated` (the 25%→40% louder focal stop) — plus a `:reveal` entrance that composes `vReveal`. The chip≤glyph proportion is a structural floor (`--icon-chip-glyph-ratio` 2.18, `inline-size: max(size, glyph×ratio)`), so a tiny `size` can never collapse the plate under the glyph.

**Critical architectural fact:** IconChip is NOT a glass surface. Its backplate is the BRAND-OVERLAY register (`color-mix(in srgb, …)`, the `--surface-tint-*` family path), DELIBERATELY `in srgb` (recorded fence, icon-chip.css:11-20 + CLAUDE.md AW.W26) — NOT the glass-tint `in oklab` perceptual path, NOT a `--glass-*` tier. So the DESIGN.md six-layer glass composite does NOT apply: the chip is a tinted color-event chip, not a refractive glass plate. This must be stated explicitly because the audit prompt asks for the six-layer composite — the correct answer here is "N/A by design, recorded fence," NOT "missing layers."

---

## 1 · ANIMATION — affordance audit

**Four-state contract: N/A (correct).** The four-state interactive contract (standard/hover/active/disabled) binds INTERACTIVE atoms (Button, Toggle, dock controls). IconChip is a decorative `<span>` with no role, no activation, no `disabled`. It is NOT in the affordance-map's four-state set. So "missing active/disabled state" is NOT a finding — it would be overfit substrate on a non-interactive mark.

**What it DOES have (strong):**
- **Entrance** — `:reveal` → `@keyframes icon-chip-reveal` (scale 0.85→1 + translateY 0.25rem→0, opacity coupled) on the per-spring `--spring-snappy` linear() string at `--spring-snappy-duration` (0.34s), staggered by `--d × --icon-chip-reveal-step` via `animation-delay` (no setTimeout). This is idiomatic W-MOTION-CANON P1 (spring-iff-spatial) + P3 (coupled fade) + P4 (per-spring clock) + P5 (compositor-only) + P6 (PRM → `animation: none` snap-to-endpoint). EXCELLENT — this is the reference for how a pop should arrive.
- **Hover (`:bloom`)** — the GROW leg (`transform: scale(1.06)`) re-declares its transition on `:hover` to ride `--spring-smooth` (enter spring), while the base rule's `--ease-out` transform leg governs the LEAVE (no overshoot past gone — §6 exit law). Color/box-shadow legs stay on the bezier `--ease-standard`. Glyph stroke firms 1.75→2. `@media (hover: hover)` gated. This is the correct SPATIAL/EFFECTS split.
- **PRM** — fully carved: bloom scale→none, glyph stroke→inherit, reveal→`animation: none`. The legibility color cross-fade survives (correct — color is not motion).

**FINDINGS (animation):**
- **A1 (MINOR, AUGMENT).** The bloom hover is OPT-IN only (`:bloom` prop). A bare `<IconChip>` (no `:bloom`) is COMPLETELY static — no hover affordance at all. The audit's "HIGH animation affordance for EVERY component" bar suggests a calm DEFAULT hover (a sub-perceptual plate-lift or stroke-firm) should be the floor, with `:bloom` the louder opt-in. Currently the default chip is dead-on-hover. → **AUGMENT** an existing wave or a new BD micro-wave: a default calm hover register on the tier-root, `:bloom` stays the loud variant.
- **A2 (MINOR, KEEP).** `--icon-chip-bloom-scale` is read in CSS (`scale(var(--icon-chip-bloom-scale, 1.06))`) but never declared in `:root` — relies on the inline fallback. Works, but the token is un-discoverable (no `:root` default beside `--icon-chip-bloom-mix`/`-glow`). → trivial **MODIFY**: declare `--icon-chip-bloom-scale: 1.06` in `:root` for token-first discoverability.

---

## 2 · PROCEDURAL VIZ

**N/A** — IconChip has no aurora/blob/fourier/GPU surface. No PROCEDURAL-SUITE membership. No GPU-only/Safari bar applies. (The page's COLOR comes from `--section-color-N` CSS tokens, not a shader.)

---

## 3 · PERFORMANCE

**Compositor-only: YES (clean).** Entrance animates `transform` + `opacity` only. Hover animates `transform`/`background-color`/`box-shadow` — `background-color`/`box-shadow` are paint, not layout, and ride the slow bezier (not per-frame). No layout property animates → `proof:no-layout-animation` holds. The `inline-size: max(size, glyph×ratio)` is a STATIC reserve (frame-0), never animated — CLS-safe.

**No offscreen-pause needed** — no rAF, no canvas, no GPU loop. The entrance is a one-shot CSS animation; the hover is event-driven CSS. Zero idle cost.

**FINDING P1 (NONE).** No layout thrash, no forced reflow, no dual rAF. The component is performance-clean.

---

## 4 · SAFARI compatibility

**Clean.** `color-mix(in srgb, …)` — Safari 16.2+ (universal at the library's baseline). `@property`/registered customs not used here (the spring `linear()` string is plain CSS animation-timing-function — Safari 17.4+ for `linear()`, with the `--spring-*` token already gated library-wide). `mask`/`backdrop-filter` NOT used (it's not a glass surface). The lucide `fill` override on `[data-duotone] svg` (CSS-wins-over-presentation-attr) is standard SVG cascade — Safari-safe. **No Safari finding.**

---

## 5 · IDIOMATIC / no-legacy

**Strong.** Single recipe home (icon-chip.css OWNS the recipe; the four inline `:style` pastes collapsed onto it — proof:suffuse d3 / proof:icon-chip D4). Token-first throughout (`--icon-chip-*` knobs, consumer-retunable). The `eventColor`/`plateColor` computed split with `--muted-foreground`/`--muted` fallbacks preserves the empty-states paste behavior. `tone` XOR `section`, `tone` wins — clean precedence. No dual-path, no shim, no back-compat alias.

**FINDINGS (idiomatic):**
- **I1 (LOW, KEEP-RECORDED).** `revealArg = computed(() => undefined)` (IconChip.vue:68) is a dead constant — the `:fade` arg path of `vReveal` is never reachable from IconChip (it always passes the default rise entrance). Not a bug (the `v-reveal:[revealArg]` binding with `undefined` arg = default rise), but `revealArg` is a no-op computed. → trivial **PRUNE**: inline `v-reveal="revealStep"` (drop the always-`undefined` arg binding + the dead computed). Architectural-transposition-for-elegance, zero behavior change.
- **I2 (the SUPERFICIAL-LANGUAGE / IMPORT-LABEL ask, demo-side not component).** The page's import is `from "../../../src/components/custom/icon-chip"` (a deep relative path), NOT the canonical `@mkbabb/glass-ui/icon-chip` label. The audit asks to "standardize the import-path label" — this is the demo page concern, covered conceptually by BD.W-PAGE-* but the icons page specifically still uses the deep relative import. → **MODIFY** (demo-side): the page should label the import as the subpath in its specimen, matching the doc-label.

---

## 6 · The glass six-layer composite

**N/A — recorded by-design fence (NOT a defect).** See §0. IconChip is the brand-overlay color-event chip (`in srgb` `--surface-tint` family), deliberately NOT a glass tier. A consumer who wants the chip ON glass composes it INSIDE a `.glass-*` surface (the page's ShowcaseFrame field tier). The six-layer composite belongs to the HOST surface, not the chip. The one place this could read as a gap: the user's "glass demos over COLORFUL aurora backgrounds" ask — but that is satisfied by the PAGE staging the chips over a live field (ShowcaseFrame `tier="field"`), not by making the chip itself glass (which would dilute its color event — the one-color-event rule forbids stacking a glass refraction UNDER the color pop).

---

## 7 · BD-tranche disposition map

| ID | Finding | Verdict | BD wave |
|----|---------|---------|---------|
| A1 | Bare chip dead-on-hover; bloom is opt-in only | **AUGMENT** | new micro-wave OR fold into BD.W-BC-COMPONENT-CANON's IconChip note (default calm hover floor) |
| A2 | `--icon-chip-bloom-scale` un-declared in `:root` | **MODIFY** | BD.W-PAGE-OFFTOKEN-SWEEP-adjacent token tidy (or the IconChip canon wave) |
| I1 | `revealArg` dead `undefined` computed | **PRUNE** | BD.W-DESHADCN-CANON-adjacent src tidy (component-level, tiny) |
| I2 | Page uses deep relative import, not `/icon-chip` label | **MODIFY** | BD.W-PAGE-HEADER-FOLD / BD.W-DATA-SUFFUSE demo-import-label sweep (demo-side) |
| six-layer | Not a glass surface | **KEEP** | record fence in BD.W-BC-COMPONENT-CANON (the "IconChip is brand-overlay not glass" note) |

**No PRUNE of a viz, no FOLD of a dual-path — the component is architecturally sound.** The substantive opportunity is A1 (a default hover affordance to meet the "HIGH animation for EVERY component" bar) + the I1 micro-tidy. The page-side asks (bigger main card, sub-sections in own glassy cards, dock-API leverage, colorful aurora staging, import-label, tighten language) are DEMO-LAYOUT concerns for the page wave, not the component — the component already ships the `:reveal`/`:bloom`/`:saturated` axes the page consumes.

---

## VERDICT (5 lines)

1. **IconChip is architecturally sound** — single recipe home, token-first, no dual-path/legacy/shim; the four-state contract is correctly N/A (non-interactive `<span>` mark, not an affordance atom).
2. **Animation is idiomatic and strong** where engaged — the `:reveal` spring-clock entrance (snappy linear(), coupled fade, per-spring clock, PRM-snap) is a reference-grade W-MOTION-CANON pop; bloom hover splits SPATIAL(spring)/EFFECTS(bezier)/leave(ease-out) correctly.
3. **One real animation gap (A1, AUGMENT):** a BARE `<IconChip>` is completely static on hover — bloom is opt-in only; a calm DEFAULT hover floor should meet the "HIGH animation for EVERY component" bar.
4. **Performance + Safari clean** — compositor-only, static frame-0 size reserve (CLS-safe), no rAF/offscreen-pause needed, `color-mix(in srgb)` Safari-universal; six-layer glass composite is N/A by recorded design fence (brand-overlay chip, not a glass tier — the one-color-event rule forbids glass under the pop).
5. **Two micro-tidies (PRUNE/MODIFY):** I1 the dead `revealArg = undefined` computed inlines away; A2 declare `--icon-chip-bloom-scale` in `:root`; plus the demo-side import-label standardization (I2) belongs to the page wave (BD.W-PAGE-HEADER-FOLD), not the component.
