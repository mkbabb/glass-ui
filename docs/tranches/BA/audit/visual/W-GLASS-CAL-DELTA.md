# BA.W-GLASS-CAL — DELTA (the blur dial-back + the disco retirement + the per-spring clock)

**Wave**: BA.W-GLASS-CAL (Batch 4) · **Branch**: tranche/BA · **Date**: 2026-06-12
**Hinge**: H2 arm (a) — DECIDED: gold survives CALM (static wash + edge catch-light; every animated sweep/sparkle/grain retires).
**Gate**: `proof:glass-cal` born-RED → GREEN. No-regress: `proof:dark-material`, `proof:no-gray`, `proof:dock-unify`, `proof:dock-perfection`, `proof:tabs-unified`, `proof:spring-tokens-synced`, `proof:motion-suite` all GREEN. Rebaselined: `proof:affordance-contrast`, `proof:animation-coherence` GREEN on the new register.

## §0 RE-GROUND — drift at HEAD (recorded, never re-diagnosed)

Every §0 cite re-grepped at HEAD `d60ffdd3`. The mechanisms HELD; line numbers drifted across the six landed batches:

| cite (spec) | HEAD | note |
|---|---|---|
| `tokens/glass.css:33–50` six radius primitives | :33–50 (1/10/12/16/15/11) | EXACT — no drift |
| `--glass-grain-opacity-disco` `glass.css:156` | `glass.css:164` → :191 (after Batch-1 dark token re-tune + sibling state) | drifted +35 lines |
| `tokens/light-dark.css:30–34` @2dppx 24px at :32 | :30 block, 24px at :32 | EXACT |
| `theme/bridges.css:302–307` `--blur-glass-*` | :310–315 | drifted +8 |
| `btn.css:92–197` btn-audacious, `:218–271` gold, `:277–280` gold-bg-sweep | EXACT | no drift |
| `animations.css:151–170` sparkle-sweep + PRM stub | :151–169 | EXACT (the stub closes :169) |
| `scheme-motion.css:78` `--duration-sparkle` | :78 | EXACT |
| `tab-button.css:106–173` dock phase-grain | the `[data-tier="primary"]` block at :114–182 (grain hover :131–146, `[data-phase]::before` :162–181) | drifted +8 |
| `DockTabButton.vue:36` btn-audacious auto-attach | :36 | EXACT |
| `toggle-chip/index.ts:19` `transition-colors duration-150 ease-out` | :19 | EXACT |
| demo footprint `display/buttons.vue:61–63` | the CTA variant call sites at :51–53 + :71–73; the prose at :46–48 + :60–64 | drifted (the showcase grid re-laid-out) |

The spring-clock census (Unit 3 §0): the ~20 spring-easing+generic-clock pairings re-grepped at HEAD (full list under "Unit 3").

## Unit 3 — the per-spring DURATION clock (LANDS FIRST; W-TABS consumes its vocabulary)

**The architectural root** (`r10-suffusion-pops-delta.md` §3 [S1]): `springLinearStops` NORMALIZES each spring's `linear()` curve to 0..1 and DISCARDS the spring's settle time, so every CSS consumer pairing a `--spring-<name>` easing with a generic `--duration-*` clock (0.2/0.3/0.45s) re-times EVERY spring to the same wall clock regardless of which spring — snappy (response 0.35s) and smooth (0.5s) both ran 300ms; the JS `SpringProgress` path settles by physics (feels right) while the CSS path drags a dead sub-pixel tail.

**The minted vocabulary** — `--spring-<name>-duration`, GENERATED in `scripts/regen-spring-tokens.mjs` from the EXISTING `(response, ζ)` SPRING_PRESETS table (never a hand value). The metric is the analytic **2%-band envelope settling time** `t_s = -ln(0.02) / (ζ·ωₙ)` (ωₙ = 2π/response, the iOS/Apple `response` convention) — the moment the residual travel decays below 2% of unit span (the sub-pixel "dead tail" horizon), rounded to the nearest 10ms:

| spring | (response, ζ) | settle clock | vs generic |
|---|---|---|---|
| smooth | (0.50, 0.86) | **0.36s** | ≈ the gentle settle |
| snappy | (0.35, 0.65) | **0.34s** | BELOW the generic 0.45s slow |
| bouncy | (0.50, 0.45) | **0.69s** | longer — the emphatic ring reads fully |
| gentle | (0.70, 1.00) | **0.44s** | patient |
| dock | (0.32, 0.70) | **0.28s** | BELOW the generic 0.3s normal — crisp |

The generator emits a SECOND contiguous block (its own `SPRING_DURATION_LINES_RE`) right after the `linear()` easing block, idempotent (re-running produces byte-identical output) — `proof:spring-tokens-synced` stays GREEN (it diffs the easing block, untouched). The §6 REGISTER canon (which spring fits which job) is UNTOUCHED — this re-times the clock UNDER each register to the spring's own settle.

**The sweep (15 edits across 9 files; the off-clock pattern re-pointed to the matching `--spring-<name>-duration`):**

- `transitions.css` ×7 — `.fade-slide`/`.dialog-scale`/`.pop`/`.dropdown`/`.pane-swap`/`.metric-swap` transform-enter legs + `.dock-in` animation (the spring-bearing leg only; the opacity/surface legs stay on their bezier clock per §6).
- `glass/surfaces.css` ×2 — `.glass-btn` + `.btn-pill` scale legs (the §6 button family; a CLOCK-only swap on the existing scale leg, not a recipe change — the Triumvirate base-recipe trigger did NOT fire).
- `utilities/btn.css` ×3 — `scale-on-hover` + `btn-interactive` (×2: base + focus-visible) scale legs.
- `typography/utilities.css` ×1 — `.char-stagger` fade-in.
- `tokens/scale-paper.css` ×1 + `dock.css` ×1 — the dock motion-bus shorthand tokens `--dock-press-spring` (→ `--spring-smooth-duration`) + `--dock-motion-resize` (→ `--spring-dock-duration`), which propagate to ~6 dock-control consumers via one edit each.
- `animations.css` ×1 (`.glass-top-layer` enter), `view-transition.css` ×1 (the `--vt-duration` fallback), `Switch.vue` ×1 (thumb translate).

**FENCED OUT of the sweep (recorded; the §6 register untouched there):** `segmented-tabs.css` indicator clock (W-TABS owns the `--tab-indicator-duration` mint — the spec's explicit carve), `ConfiguratorLayer.vue` (W-CONFIG-CHASSIS bound, "Do NOT touch"), `DarkModeToggle.vue` (the hand-authored 750ms/500ms icon-morph literals carry a ported-gate dependency — a deliberately-authored timing, not a generic-clock straggler). `proof:glass-cal` S2 asserts no off-clock spring survives in the **swept** files; the gate's anti-recurrence floor is scoped to the files this wave owns.

## Unit 1 — the BLUR dial-back

The six `--glass-blur-*-radius` primitives dialed back ~15–20% UNIFORMLY (the user's "a hair too much"): quiet 10→8, resting 12→10, floating 16→13, overlay 15→13, dock 11→9; wash stays 1px. The @2dppx overlay restore 24→20px (in lockstep with the base ladder). The radius axis ONLY — `--glass-level` + every per-rung `saturate()`/`brightness()` companion byte-UNCHANGED (B3), the W-DARK-MATERIAL dark-arm.css dark companions preserved (radius-only, the spec's B3 assert). `--glass-blur-btn` reads the quiet radius → tracks 10→8 with no separate edit. The `--glass-grain-opacity-disco` deletion applied here on Unit 2's behalf (the Disjointness one-line block).

**π readback (both modes, `tests-visual/glass-cal.spec.ts`, GREEN):** the resolved `:root` radii read exactly 1/8/10/13/13/9; a glass surface still composes a real backdrop-filter blur in the 7–15px band (the glass STILL reads as glass). The dock-over-photo capture (`W-GLASS-CAL-dock-{light,dark}.png`) shows the blue→amber backdrop structure reading a hair more through the dock pill while the controls stay crisp.

## Unit 2 — the DISCO retirement (H2a arm a)

**Deleted (clean break, no alias):** `@utility btn-audacious` + `@utility btn-audacious-gold` (btn.css), `@keyframes sparkle-sweep` + its PRM stub (animations.css), `@keyframes btn-gold-bg-sweep` (btn.css), `--duration-sparkle` (scheme-motion.css), `--glass-grain-opacity-disco` (glass.css). The press-ripple retired WITH the recipe (it was btn-audacious-private — RE-GREP confirmed zero other consumer): the `--ripple-radius-max`/`--motion-duration-ripple` knobs (scheme-motion.css §2.C) + the `@property --ripple-radius` registration (property-regs.css) + the dead `--transition-duration-sparkle` bridge (theme/bridges.css). The calm CTA register's press is the §6 `--scale-press-btn` scale beat.

**The variant collapse (the keys re-pointed, NO rename — the demo call sites need no edit):**
- `primary-audacious` → the calm glass-first register: `glass-wash btn-glass text-foreground` + the `--glass-specular` edge catch-light gleam (from the glass-material mixin the `glass-wash` rung composes), hover/press on the §6 doctrine, distinguished by the `--scale-hover-btn` lift.
- `gold-audacious` → the calm glass register + a STATIC warm-gold tint (an at-rest `--color-gold` linear-gradient wash) + specular, MINUS the animated sweep. The label is warm-ink `--foreground` at EVERY state (no white flip — the calm register has no saturated backplate to clear).

**The dock-tab primary tier collapsed** (`tab-button.css`): the disco-grain hover (`--glass-grain-opacity-disco` + `--paper-clean-texture`/`--phase-color` radial) + the `[data-phase]::before` rest-halo DROPPED; the tier keeps ONLY its structural shell (taller min-height, wider padding, the stronger base tint) and inherits the plain de-red'd glass hover register from the base `.dock-tab-button` rule. The `btn-audacious` auto-attach removed from `DockTabButton.vue`.

**The toggle-chip on §6** (`toggle-chip/index.ts`): off `transition-colors duration-150 ease-out` (the hardcoded 150ms color-only snap with no lift — the "hover far too quick and jittery" read) onto the canonical §6 register — the surface legs (bg/border/box-shadow/color) on `--duration-fast`/`--ease-standard`, the `scale` transform leg on `--spring-smooth-duration`/`--spring-smooth` (Unit 3's vocabulary), with a hover scale (`--scale-hover-btn`) + press scale, so the chip lifts identically to its neighbors.

**The fence held (D5, anti-overreach):** `.gold-shimmer` static text gradient + the `--glass-specular`/specular-track registers STAY (verified resolving).

**π readback (both modes, GREEN):** at `/display/buttons` ZERO `[class*=btn-audacious]` elements + ZERO `✦` sparkle pseudo-glyphs (the lane's 6/6 baseline → 0/0). The buttons capture (`W-GLASS-CAL-buttons-{light,dark}.png`) shows the "Primary glass CTA" + "Gold glass CTA" reading as calm glass buttons — no sparkle, no grain texture-swap. The chip capture (`W-GLASS-CAL-chip-blob-light.png`) confirms the §6 scale-lift transition.

## Gate rebaselines (the assertions DROPPED onto the new register, not defeated)

- **`proof:affordance-contrast`** — clause 1 (gold rest text) re-pointed: the calm register asserts `text-foreground` at rest + NO `text-white` flip + a static `--color-gold` tint + the `btn-glass` calm-glass composition (no retired `btn-audacious` class). Clause 1b (the opaque deep-gold HOVER backplate for white-label ≥4.5:1) DROPPED — the calm register has no white label and no saturated backplate; the new positive truth is `@utility btn-audacious-gold` is GONE. GREEN.
- **`proof:animation-coherence`** — `sparkle-sweep` DROPPED from `NON_PHYSICAL_ALLOW` (its keyframe is retired, no consumer). The EASING-TABLE-BOUND check made DURATION-aware: `--spring-<name>-duration` is a duration leg (skipped from the curve-row requirement); the SPRING-CONSUMER-COVERAGE preset-name extraction excludes the `-duration` twins. 5/5 presets reached, 0 easing-table forks, 0 duration-band forks. GREEN.

## Verification

- `npm run typecheck` — GREEN (vue-tsc + tsconfig.test).
- `npm run build` — the CSS partials compile (a deleted `@utility`/`@keyframes` is the binding compile check); vite arm green, dts arm green.
- `node scripts/proof-glass-cal.mjs` — born-RED at HEAD (radii full, `@utility btn-audacious` ×2, chip `duration-150 ease-out`, no `--spring-*-duration`), GREEN at close.
- `npm run proof:gate-script-parity` — GREEN (the proof-*.mjs ↔ package.json ↔ gates.mjs bijection holds with the new gate).
- `npx playwright test glass-cal` — 8/8 GREEN (chromium-headless + coarse-touch × the 4 π checks).
- `git diff --check` — clean.

## Files changed

Unit 1 (BLUR): `tokens/glass.css` (radii + the disco-knob deletion), `tokens/light-dark.css` (@2dppx).
Unit 3 (SPRING CLOCK): `scripts/regen-spring-tokens.mjs`, `tokens/scheme-motion.css` (the minted block + the sweep), `transitions.css`, `glass/surfaces.css`, `utilities/btn.css`, `typography/utilities.css`, `tokens/scale-paper.css`, `dock.css`, `animations.css`, `view-transition.css`, `Switch.vue`.
Unit 2 (DISCO): `utilities/btn.css`, `animations.css`, `tokens/scheme-motion.css`, `tokens/property-regs.css`, `theme/bridges.css`, `dock-controls/tab-button.css`, `button/index.ts`, `DockTabButton.vue`, `toggle-chip/index.ts`, `demo/stories/display/buttons.vue`, `proof-affordance-contrast.mjs`, `proof-animation-coherence.mjs`.
Integration: `scripts/proof-glass-cal.mjs` (NEW), `package.json`, `scripts/gates.mjs`, `MIGRATION.md`, `CLAUDE.md`, `tests-visual/glass-cal.spec.ts` (NEW), this DELTA.

## Gestalt verdict (BA inv-4 — the binding visual truth)

(a) BLUR — the glass reads as glass at the dialed-back radii with more backdrop structure visible: **PASS** (the dock-over-photo capture + the resolved-radii π).
(b) DISCO — the CTAs read as calm, distinguished glass buttons with NO disco: **PASS** (0 `✦`, 0 `btn-audacious`, the calm-register capture).
(c) DOCK — the dock primary tier reads as the primary affordance via the glass register, not grain: **PASS** (the grain rule gone, the dock plate composes the dialed-back glass blur).
(d) CHIP — the toggle-chip grid lifts coherently with its neighbors: **PASS** (the §6 scale-lift transition resolves).

The `proof:ba-gestalt` roster verdict for the W-GLASS-CAL surfaces (`/display/buttons`, `/dock/overview`, the studio chip grid) reads operative-PASS — per-mechanism greens AND the live gestalt both hold.
