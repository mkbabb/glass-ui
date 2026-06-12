# BA.W-GLASS-CAL — the blur ladder dialed back + the disco recipe family retired

**Name**: W-GLASS-CAL - the two global glass calibrations
**Opens after**: BA Batch 3 (W-DOCK-SECTIONS → W-DOCK-MORPH-INSITU). Runs ‖ Batch 4 siblings W-SURFACE-AXIS ‖ W-FEEDBACK-TONE ‖ W-MENU-GLASS ‖ W-PROGRESS-GRADIENT — component-family-disjoint write bounds (DAG §5). Gated by hinge **H2** (the gold CTA's post-disco form — recommend (a) gold survives CALM; the agent does not pick).
**Agents**: 2 parallel (BA.W-GLASS-CAL.1 the blur dial-back ‖ BA.W-GLASS-CAL.2 the disco retirement) — disjoint file bounds; see §Disjointness.
**Hard gate**: `proof:glass-cal` (born-RED) — two arms: (BLUR) the six `--glass-blur-*-radius` primitives + the `@2dppx` overlay restore resolve to their calibrated values within the AV.W7-F2 8–15px band, `--glass-level` + the `saturate()`/`brightness()` companions untouched; (DISCO) `btn-audacious`/`btn-audacious-gold` + `sparkle-sweep`/`btn-gold-bg-sweep` + the `--duration-sparkle`/`--glass-grain-opacity-disco` knobs are GONE from the source, no `btn-audacious` class survives on any consumer, the dock-tab PRIMARY grain is collapsed, and `toggle-chip` reads the §6 tokens (no `duration-150`/raw `ease-out`). Plus the π gestalt readback + the `proof:ba-gestalt` verdict per BA inv-4.
**Status**: SPEC

## Goal criterion

Every glass surface reads as glass with the backdrop's structure showing a hair more through the plate (the ~15–20% blur pull, ONE knob-family edit, zero per-site change), and the disco is GONE everywhere — the audacious/gold CTAs collapse onto the calm glass-first button register (specular gleam + optional static warm-gold tint survive; sparkle/grain/sweep retire), the dock primary tier loses its phase-grain re-implementation, and the toggle-chip hover-lifts on the §6 doctrine like every neighboring control. A user on `/display/buttons`, `/dock/overview`, and the goo/aurora studios sees no sparkle glyph, no grain texture-swap, no flat-snap chip — and the glass still reads unmistakably as glass at the reduced radii.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the two grounding lanes' file:line root causes, not a blind re-diagnose (BA invariant 3 — re-opened ≠ rebuilt-blind). Before touching a byte, each impl agent re-greps its anchors at HEAD and confirms the mechanisms still hold; if a cite has drifted (the AZ Batch-0..3 waves and the W-DARK-MATERIAL token re-tune may have shifted line numbers), the agent records the drift in PROGRESS and re-locates the mechanism before proceeding — it does NOT re-invent the diagnosis.

Grounding lanes: `audit/fleet/glass-blur-cal.md` (R8-19) + `audit/fleet/disco-hover.md` (R8-18).

### Arm 1 — BLUR (BA-BLUR-1/2; lane glass-blur-cal §1–§4)

1. **The radius primitives are the correct knob-family** (lane §1). The blur ladder routes through SIX length primitives in `src/styles/tokens/glass.css:33–50`: `--glass-blur-wash-radius:1px` (:33), `-quiet:10px` (:34), `-resting:12px` (:35), `-floating:16px` (:36), `-overlay:15px` (:44), `-dock:11px` (:50). Each feeds a composed token shaped `blur(calc(<radius> * var(--glass-level))) saturate(…)` at `glass.css:57–85`. `--glass-blur-btn` (`glass.css:85`) reads the **quiet radius** — it tracks the quiet pull automatically, NO separate edit. The `@2dppx` overlay restore is `24px` at `src/styles/tokens/light-dark.css:30–34` (the actual path carries the `tokens/` segment — the lane cites the bare `light-dark.css:30–34`/`:32` + the CLAUDE.md header cites `light-dark.css:30-34`; the file is `src/styles/tokens/light-dark.css`, the `@media (min-resolution:2dppx)` block at :30, the `24px` at :32 — RE-GREP at HEAD).
2. **`--glass-level` is the WRONG knob** (lane §1, §3): it scales opacity too (`level=0` → solid `--card` + `blur(0)`), so dialing it down would make every glass surface more transparent. The radius primitives scale the blur radius ALONE. `--glass-level` and the per-rung `saturate()`/`brightness()` companions stay UNTOUCHED (R8-19 is blur only).
3. **Token-first propagation proven in-browser** (lane §1, §4): overriding a radius primitive at `:root` re-resolved the downstream composed token (`--glass-blur-floating` → `blur(calc(13px * 1)) saturate(1.18)`). Every consumer composes a `--glass-blur-*` token, never a hardcoded `blur(Npx)` — the six-value edit reaches the entire surface with no per-site change (the consumer census is lane §4: ladder tiers, dock, Dialog/Toast/HoverPopover/Drawer/floating-panel/instrument-chassis/metric-badge/segmented-tabs/glass-refract/veil/timeline + the `--blur-glass-*` theme bridge at `theme/bridges.css:302–307`).
4. **OUT of scope** (lane §4 — separate knobs, do NOT fold): `--top-layer-backdrop-blur` (8px, `animations.css:366` — the modal SCRIM dim, not a glass-surface backdrop); `segmented-tabs.css:161` `blur(0.5px)` (disabled-tab defocus); the Slider thumb halo `blur(2px)` (rides `--glass-level`); the `animations.css:7–12` entrance keyframe.

### Arm 2 — DISCO (BA-disco-01/02/03/05; lane disco-hover Part A + B1)

5. **The canonical disco recipe** (lane A1): `@utility btn-audacious` at `src/styles/utilities/btn.css:92–197` — the `::after` sparkle glyph (`content:"✦"` :163–175, animated by `sparkle-sweep` on hover :177–181), the hover disco-grain (`background-image: var(--paper-clean-texture), radial-gradient(...)` :112–125), the specular-swap box-shadow (:122–124), and the `::before` press-ripple (:138–158). `@utility btn-audacious-gold` at `btn.css:218–271` extends it with the gold-sweep shimmer (`btn-gold-bg-sweep` infinite keyframe on hover :266–270) + the at-rest 8%-gold tint (:221–227). The two sparkle keyframes: `@keyframes sparkle-sweep` at `animations.css:151–164` (+ the PRM stub :166–170) and `@keyframes btn-gold-bg-sweep` at `btn.css:277–280`. The two disco knobs: `--duration-sparkle:600ms` at `scheme-motion.css:78` and `--glass-grain-opacity-disco:0.08` at `glass.css:156`.
6. **The dock SECOND disco surface** (lane A2): `.dock-tab-button[data-tier="primary"]` at `src/styles/dock-controls/tab-button.css:106–138` — the dock-local phase-grain (`--glass-grain-opacity: var(--glass-grain-opacity-disco)` + `--paper-clean-texture` + `--phase-color` radial :123–138) and the `[data-phase]` `::before` rest-halo (:154–173). `<DockTabButton>` auto-attaches `btn-audacious` when `data-tier="primary"` (`src/components/custom/dock/DockTabButton.vue:36`), so this surface gets BOTH the utility disco AND the dock-local phase grain.
7. **The variant + consumer footprint** (lane A3): the Button `primary-audacious` variant composes `btn-audacious` (`src/components/ui/button/index.ts:44–45`); `gold-audacious` composes `btn-audacious btn-audacious-gold` (`index.ts:51–52`). Demo consumers: `demo/stories/compositions/hero.vue:171`, `gate-pattern.vue:100,155`, `AuroraColorSection.vue:217`, `PaletteLayer.vue:150`, `display/buttons.vue:61–63` (the 6-button showcase grid), `instrument-chassis.vue:220` (the A2 dock disco via `<DockTabButton data-tier="primary">`). Live readback (binding, lane A3): at `/display/buttons`, 6 `[class*=btn-audacious]` elements each with `::after { content:"✦"; color: rgba(255,255,255,0.7) }` (hardcoded white, `btn.css:168` — mode-invariant) + the press-ripple transition leg.
8. **The toggle-chip flat-snap** (lane B1): `src/components/custom/toggle-chip/index.ts:19` carries `transition-colors duration-150 ease-out` — THREE §6 divergences: (a) `duration-150` is a hardcoded 150ms off `--duration-fast` (200ms), faster than every sibling control; (b) `transition-colors` only — NO scale leg and NO box-shadow leg, so the chip COLOR-snaps with no lift while neighbors lift on `--spring-smooth`; (c) the timing-function is a raw `ease-out` literal, not `--ease-standard`. This is the chip the goo/aurora studios' `<ToggleChip>` grids use (R8-7 "hover far too quick and jittery").
9. **FENCED OUT — the good pops STAY** (lane A4): `.gold-shimmer` static text gradient (`src/styles/utilities/base.css:335–345` — a STATIC brand HEADLINE gradient, `background-clip: text`, NOT a hover disco), `rainbow-vivid`/`rainbow-pastel` (`btn.css:305–329` — keyframes.js transport chrome, a different consumer), the `.glass-specular-track` + the specular gleam on every dock control (the liquid-glass catch-light register, the GOOD pop). The press-ripple (`--ripple-radius`) is a tasteful affordance, NOT disco — keep or fold into the §6 press-scale (designer's call; see Scope 7).

### RE-GROUND command set (run all; confirm each mechanism)

```
sed -n '33,50p'   src/styles/tokens/glass.css                       # the six radius primitives
sed -n '30,34p'   src/styles/tokens/light-dark.css                  # the @2dppx overlay restore 24px (:32)
grep -n 'glass-blur' src/styles/theme/bridges.css                   # the --blur-glass-* bridge aliases
sed -n '92,197p'  src/styles/utilities/btn.css                      # @utility btn-audacious
sed -n '218,280p' src/styles/utilities/btn.css                      # btn-audacious-gold + btn-gold-bg-sweep
sed -n '151,170p' src/styles/animations.css                         # @keyframes sparkle-sweep + PRM stub
grep -n 'duration-sparkle\|glass-grain-opacity-disco' src/styles/tokens/{scheme-motion,glass}.css
sed -n '106,174p' src/styles/dock-controls/tab-button.css           # the A2 dock phase-grain
grep -n 'data-tier' src/components/custom/dock/DockTabButton.vue    # the btn-audacious auto-attach
sed -n '16,21p'   src/components/custom/toggle-chip/index.ts        # the duration-150 flat-snap
grep -rn "btn-audacious" demo/ src/components/ui/button/index.ts    # the consumer footprint to re-point
```

Captures (beside the lane reports): `audit/fleet/glass-blur-cal-dock-light-CURRENT-11px.png` vs `-PROPOSED-9px.png` (the A/B), `-DARK-CURRENT-11px.png`, `glass-blur-cal-dialog-light-16px.png`; `audit/fleet/disco-hover-audacious-row.png` + `audit/ground/R8-18-disco-hover.png`.

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | BA-BLUR-1 over-diffusion | `tokens/glass.css:33–50` (six radius primitives); `tokens/light-dark.css:30–34` (the @2dppx 24px at :32) | the ladder over-blurs the backdrop ~15–20% past "a hair too much" in BOTH modes |
| 2 | BA-BLUR-2 token-first reach | `glass.css:57–85` (composed tokens); `glass.css:85` (`--glass-blur-btn` reads quiet); `theme/bridges.css:302–307` | every consumer composes a `--glass-blur-*` token — the six-value edit propagates with zero per-site change |
| 3 | BA-disco-01 the recipe family | `utilities/btn.css:92–197` (btn-audacious), `:218–271` (gold); `animations.css:151–170` (sparkle-sweep); `btn.css:277–280` (gold-bg-sweep); `scheme-motion.css:78` + `glass.css:156` (the knobs) | the sparkle glyph + disco-grain + gold sweep is the "disco effect" the user removes everywhere |
| 4 | BA-disco-02 the dock re-impl | `dock-controls/tab-button.css:106–173`; `DockTabButton.vue:36` | a SECOND disco surface: dock-local phase-grain + rest-halo, plus the auto-attached `btn-audacious` |
| 5 | BA-disco-03 the variant collapse | `button/index.ts:44–45,51–52`; the demo footprint (lane A3) | `primary-audacious`/`gold-audacious` reduce to "glass button + optional warm-gold tint + specular gleam" |
| 6 | BA-disco-05 the chip flat-snap | `toggle-chip/index.ts:19` | `transition-colors duration-150 ease-out` — off-§6 fast color-snap, no lift; the "jittery" chip read |

## Scope

### BLUR (BA.W-GLASS-CAL.1)

1. Dial the six `--glass-blur-*-radius` primitives back ~15–20% UNIFORMLY in `tokens/glass.css:33–50` (the lane §3 A/B-validated direction, final values a tuning pass within the wave): `--glass-blur-quiet-radius` 10→8, `-resting` 12→10, `-floating` 16→13, `-overlay` 15→13, `-dock` 11→9; `--glass-blur-wash-radius` stays 1px (sub-perceptual). The reduction is proportional (preserves tier separation) and keeps every rung in the AV.W7-F2 8–15px band.
2. Restore the `@2dppx` overlay value 24→~20px in `src/styles/tokens/light-dark.css:32` (the high-resolution `@media (min-resolution:2dppx)` arm — RE-GREP at HEAD). This is the only edit outside `glass.css`.
3. Leave `--glass-level` and every per-rung `saturate()`/`brightness()` companion (`glass.css:57–85`) UNTOUCHED — the radius axis ONLY. `--glass-blur-btn` (`glass.css:85`) needs no edit (it reads the quiet radius, tracks the 10→8 pull). NO consumer edit (token-first holds; no hardcoded radius exists — RE-GREP `grep -rn 'blur([0-9]' src/styles` returns only the OUT-of-scope four from §0.4).

### DISCO (BA.W-GLASS-CAL.2)

4. DELETE the disco recipe family clean-break (no alias — house no-backwards-compat): `@utility btn-audacious` (`btn.css:92–197`) and `@utility btn-audacious-gold` (`btn.css:218–271`); the `@keyframes sparkle-sweep` + its PRM stub (`animations.css:151–170`); the `@keyframes btn-gold-bg-sweep` (`btn.css:277–280`); the `--duration-sparkle` knob (`scheme-motion.css:78`); the `--glass-grain-opacity-disco` knob (`glass.css:156`). The press-ripple's `--ripple-radius-max` / `--motion-duration-ripple` knobs survive ONLY if Scope 7 keeps the ripple; otherwise they retire with the recipe (RE-GREP for any other consumer first — the ripple is currently btn-audacious-private).
5. Collapse the Button `primary-audacious` + `gold-audacious` variants (`button/index.ts:44–45,51–52`) onto the glass-first register per hinge H2 arm (a): drop the `btn-audacious`/`btn-audacious-gold` class composition; `primary-audacious` becomes the calm glass button + `--glass-specular` gleam; `gold-audacious` keeps the STATIC warm-gold tint (the at-rest `--color-gold` wash, the AW.W13 rest-text contract preserved) + the specular edge catch-light, MINUS the animated sweep. The hover/press smooths onto the §6 doctrine (surface → `--ease-standard`, scale → `--spring-smooth`). Whether the variant keys themselves survive (re-pointed) or rename is a hinge-H2-recommendation-(a) detail — the lane recommends keeping the keys re-pointed so the demo footprint needs no class rename, only a register change.
6. Collapse the dock-tab PRIMARY tier's phase-grain (`tab-button.css:106–173`) onto the plain de-red'd dock-control glass hover register: drop the `--glass-grain-opacity-disco` consumption + the `--paper-clean-texture`/`--phase-color` radial hover (:123–138) and the `[data-phase]` `::before` rest-halo (:154–173); the primary tier hover lands the SAME glass register the `.dock-icon-button` already speaks (bg → `--glass-bg-resting`, scale → `--scale-hover-dock`, the specular gleam — lane B "the dock primary tier collapses onto the plain dock-control glass hover register"). The structural shell (padding, base tint, min-height) stays. Remove the `btn-audacious` auto-attach from `DockTabButton.vue:36` (the utility no longer exists).
7. Re-point `toggle-chip` (`index.ts:19`) onto the §6 easing doctrine: replace `transition-colors duration-150 ease-out` with the canonical `--duration-fast`/`--ease-standard` surface legs + the `--spring-smooth` scale lift the rest of the interactive family speaks (and a box-shadow leg if the chip gains the lift), so a chip times and lifts identically to its neighbors. The press-ripple disposition (Scope 4) is the designer's call recorded in PROGRESS.
8. Re-point every `btn-audacious`/`primary-audacious`/`gold-audacious` consumer in the demo (lane A3 footprint) ONLY where a class rename is forced; if Scope 5 keeps the variant keys re-pointed, the demo `variant="primary-audacious"`/`"gold-audacious"` call sites are untouched and inherit the calm register. The 6-button showcase grid (`display/buttons.vue:61–63`) re-captures clean (no `✦`, no grain).

### SPRING CLOCK (BA.W-GLASS-CAL.3 — the R10 [S1] fold; lands FIRST within the wave: W-TABS consumes its vocabulary, the DAG §5a edge)

9. **Mint the per-spring DURATION vocabulary (`r10-suffusion-pops-delta.md` §3 [S1] — the architectural root of "the animations for springs suck… too slow").** `springLinearStops` bakes each spring's `linear()` curve NORMALIZED to 0..1 and DISCARDS the spring's response, so every CSS consumer applies a generic fixed clock (`--duration-fast` 0.2s / `--duration-normal` 0.3s / `--duration-slow` 0.45s) regardless of which spring — snappy (response 0.35s) and smooth (0.5s) both run 300ms; the JS path (`SpringProgress`, settles by physics) feels right while the CSS path drags a dead sub-pixel tail (the R10-2 tabs read, generalized — within-1px at ~109ms, transition runs 300ms). Mint `--spring-<name>-duration` PER SPRING from the EXISTING `(response, ζ)` table in `scripts/regen-spring-tokens.mjs` (the calibrated settle time, generated — never a hand value), emitted alongside the `--spring-<name>` easing tokens in tokens.css §2.
10. **Sweep the CSS spring consumers off the generic clock (~20 sites — RE-GREP the lane census at HEAD):** every `transition` pairing a `--spring-<name>` easing with a generic `--duration-*` (or a literal) re-points to the matching `--spring-<name>-duration` (segmented-tabs.css, transitions.css, the card/surface lifts, Switch, the dots/pager, the literal stragglers). The §6 REGISTER canon (which spring fits which job) is untouched — this re-times the clock UNDER each register to the spring's own settle. The tab indicator's `--tab-indicator-duration` consumption is W-TABS's (not swept here); the gate gains a witness that no `--spring-*` easing rides a generic `--duration-*` clock in src/styles (the anti-recurrence floor).

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if collapsing the `primary-audacious`/`gold-audacious` variants (Scope 5) onto the glass register requires editing the shared `.btn-pill`/`.glass-btn`/`btn-interactive` base surface recipe in `src/styles/glass/surfaces.css` (a cross-wave surface W-SURFACE-AXIS and the whole button family consume) — that is a scope-reveal; triumvirate (research the register-collapse options + plan-augment the bound + redress), do NOT widen unilaterally. The recommendation is to express the calm CTA register as a variant-class composition over the EXISTING glass-button base, touching no shared surface recipe.
- **Hard-gate failures not local-edit-recoverable**: if the disco-retired CTA gestalt fails the H2-(a) intent — the gold CTA reads dead/undistinguished without the sweep, OR the de-red'd dock primary tier loses its primary affordance read against the secondary tier — after the register collapse, that is a register-design miss (not a token tweak); triumvirate, do not loop on tint/alpha values. Hinge H2's "does gold's static register survive" is the user-domain question this surfaces.
- **Diagnostic loop halt**: if the blur dial-back re-captures and the glass STILL over-diffuses (or now reads non-glass / crisp-edged) at the chosen radii, and three A/B tuning iterations have not landed "glass still reads as glass" in BOTH modes, halt and triumvirate (the radius target is a register-design call, not an endless numeric loop).
- **The gate-rebaseline reveal**: `proof:affordance-contrast` (asserts the `gold-audacious` rest-text + the `btn-audacious-gold` hover backplate) and `proof:animation-coherence` (carries `sparkle-sweep` on its motion allow-list) BOTH reference the retired utilities. If retiring the recipes cannot rebaseline those gates within their existing structure (the assertions must DROP, not be defeated) — that is a gate-design reveal; triumvirate the rebaseline so the gates stay sound (assert the NEW calm register, not a hole).

## File Bounds

| File | Access |
|---|---|
| `src/styles/tokens/glass.css` | modify (BLUR: the six radius primitives at :33–50; DISCO: delete `--glass-grain-opacity-disco` at :156) — see Disjointness: a SINGLE agent owns this file |
| `src/styles/tokens/light-dark.css` | modify (BLUR: the @2dppx overlay restore 24→~20 at :32) |
| `src/styles/utilities/btn.css` | modify-carve (DISCO: delete `btn-audacious`/`btn-audacious-gold`/`btn-gold-bg-sweep`) |
| `src/styles/animations.css` | modify-carve (DISCO: delete `sparkle-sweep` + its PRM stub) |
| `src/styles/tokens/scheme-motion.css` | modify (DISCO: delete `--duration-sparkle` at :78) |
| `src/styles/dock-controls/tab-button.css` | modify-carve (DISCO: collapse the primary-tier phase-grain at :106–173 onto the plain glass hover register) |
| `src/components/ui/button/index.ts` | modify (DISCO: collapse `primary-audacious`/`gold-audacious` onto the calm glass register) |
| `src/components/custom/dock/DockTabButton.vue` | modify (DISCO: drop the `btn-audacious` auto-attach at :36) |
| `src/components/custom/toggle-chip/index.ts` | modify (DISCO: re-point off `duration-150 ease-out` onto §6 tokens) |
| `demo/stories/display/buttons.vue` | modify (DISCO: re-capture clean; class re-point ONLY if Scope 5 forces a rename) |
| `demo/stories/compositions/{hero,gate-pattern}.vue` | modify (DISCO: class re-point ONLY if forced) |
| `demo/stories/aurora/sections/AuroraColorSection.vue` | modify-carve (DISCO: the `primary-audacious` CTA re-point ONLY if forced — COORDINATION: this file is W-CONFIG-CHASSIS's bound in Batch 2; see Do-NOT-touch) |
| `demo/stories/aurora/config/PaletteLayer.vue` | modify (DISCO: class re-point ONLY if forced) |
| `demo/stories/compositions/instrument-chassis.vue` | modify (DISCO: re-capture the A2 dock surface clean) |
| `scripts/proof-glass-cal.mjs` | create (the born-RED gate) |
| `scripts/proof-affordance-contrast.mjs` | modify (rebaseline: drop the retired-utility assertions onto the calm register) |
| `scripts/proof-animation-coherence.mjs` | modify (rebaseline: drop `sparkle-sweep` from the motion allow-list) |
| `package.json` | modify (register `proof:glass-cal` + add to `proof:all`/parity) |
| `scripts/gates.mjs` | modify (register the gate row in the gate registry) |
| `MIGRATION.md` | modify (the retired-utility migration rows: `btn-audacious`/`btn-audacious-gold` + the variants for speedtest + slides) |
| `CLAUDE.md` | modify (record the calm CTA register + the dialed-back blur ladder; the §"Easing doctrine"/glass-first sections) |

**Do NOT touch:**
- `src/styles/utilities/base.css` `.gold-shimmer` (:335–345) — the FENCED-OUT static text gradient (lane A4); it STAYS.
- The `.glass-specular-track` / `--glass-specular` registers and the dock specular gleam — the FENCED-OUT good pop (lane A4); they STAY.
- `rainbow-vivid`/`rainbow-pastel` (`btn.css:305–329`) — keyframes.js transport chrome, a different consumer; not disco.
- `--top-layer-backdrop-blur` (`animations.css:366`), `segmented-tabs.css:161` `blur(0.5px)`, the Slider thumb halo `blur(2px)`, the `animations.css:7–12` entrance keyframe — the OUT-of-scope blur knobs (lane §4); they STAY.
- `--glass-level` + every `saturate()`/`brightness()` companion (`glass.css:57–85`) — the wrong axis (lane §1/§3).
- The Batch-4 sibling write bounds: `card`/`glass-panel`/`dialog`/`sheet`/`drawer`/`popover`/`command`/`expandable-container`/`skeleton` + the `surface` mixin file (**W-SURFACE-AXIS**); `toast`/`notification`/`alert` + `proof-glass-cohesion.mjs` (**W-FEEDBACK-TONE**); `_shared/menuItemVariants.ts` + dropdown/context-menu styles (**W-MENU-GLASS**); `progress/*` (**W-PROGRESS-GRADIENT**). This wave does not write any of them.
- The Batch-2 coordination seam: `AuroraColorSection.vue` + the configurator/labeled-field files belong to **W-CONFIG-CHASSIS** (DAG §3). Batch 2 has landed before Batch 4 opens, so the file is at rest — but the `primary-audacious` CTA re-point here is touched ONLY-IF-forced (Scope 5 recommends keeping the variant keys so it is NOT forced); if forced, coordinate via the orchestrator-owned final re-point, never a parallel write. The lane footprint's `PaletteLayer.vue`/`instrument-chassis.vue` are not Batch-2 bounds.
- The GL shader internals (aurora.frag, metaball.frag) — fence-locked (BA inv-9).
- ppmycota purple — the W-SUFFUSE2 motion violet stays demo-local (BA fence); no library token gains it.
- The slides repo `docs/tranches/M/` — foreign (BA inv-10); the disco-retirement MIGRATION rows for speedtest + slides are AUTHORED in glass-ui's `MIGRATION.md`, the slides adopt happens at W-CLOSE's hand-off, never edited here.

### Disjointness

Two parallel agent units. The ONLY shared file is `tokens/glass.css` (BLUR edits :33–50 + the @2dppx, DISCO deletes `--glass-grain-opacity-disco` at :156). To keep the units truly disjoint, **BA.W-GLASS-CAL.1 (blur) owns `tokens/glass.css` entirely** — it makes the radius-primitive edits AND deletes the `--glass-grain-opacity-disco` line on BA.W-GLASS-CAL.2's behalf (a one-line deletion declared as a literal diff block in this spec; the AZ literal-markdown-block idiom). Every other DISCO file (`btn.css`, `animations.css`, `scheme-motion.css`, `dock-controls/tab-button.css`, `button/index.ts`, `DockTabButton.vue`, `toggle-chip/index.ts`, the demo consumers, the two rebaselined gates) is BA.W-GLASS-CAL.2's alone. No two units share a `modify`/`modify-carve`/`delete` path. Across Batch 4: every sibling's write bound is component-family-disjoint (DAG §5) — no sibling writes any path above. `proof-glass-cal.mjs`/`gates.mjs`/`package.json`/`MIGRATION.md`/`CLAUDE.md` are orchestrator-integration files written after both units land (the gate-create + registration is the integration commit, not a parallel-unit write).

### Worktree Plan

| Agent unit | Sibling worktree absolute path | note |
|---|---|---|
| BA.W-GLASS-CAL.1 | `/Users/mkbabb/Programming/glass-ui-ba-glasscal-1` | owns `tokens/glass.css` (incl. the one-line disco-knob deletion) + `tokens/light-dark.css` |
| BA.W-GLASS-CAL.2 | `/Users/mkbabb/Programming/glass-ui-ba-glasscal-2` | owns every other DISCO file + the demo re-points + the two gate rebaselines |

The orchestrator runs `git worktree list`/`git worktree add` before dispatch; both seed at the real `tranche/BA` HEAD (the stale-worktree step-0 reset per the workflow trap — verify HEAD before harvest). The literal `--glass-grain-opacity-disco` deletion block BA.W-GLASS-CAL.1 applies:

```css
/* DELETE from src/styles/tokens/glass.css (the disco-grain knob, no surviving consumer after Scope 6): */
    --glass-grain-opacity-disco: 0.08;
```

## Agent Units

### BA.W-GLASS-CAL.1 the blur dial-back

- Goal: every glass surface shows a hair more backdrop structure through the plate at the dialed-back radii, while still reading unmistakably as glass in BOTH modes — ONE knob-family edit, zero per-site change.
- Mechanism: edit the six `--glass-blur-*-radius` primitives in `tokens/glass.css:33–50` (~15–20% uniform pull; quiet 10→8, resting 12→10, floating 16→13, overlay 15→13, dock 11→9, wash stays 1) + the `@2dppx` overlay restore 24→~20 in `tokens/light-dark.css:32`; leave `--glass-level` and the `saturate()`/`brightness()` companions untouched; apply the one-line `--glass-grain-opacity-disco` deletion on Unit 2's behalf. Final radii are an A/B tuning pass on the dock-over-photo + the floating dialog in both modes (the lane §3 direction).
- Files: `tokens/glass.css`, `tokens/light-dark.css`.
- Sub-gate: the gate's BLUR witnesses — the six radii resolve to their calibrated values (each ≤ its pre-wave value, every rung within the AV.W7-F2 8–15px band, wash unchanged at 1px), the @2dppx restore resolves ~20px, `--glass-level` + every `saturate()`/`brightness()` companion byte-unchanged; AND the π readback shows the dock-over-photo backdrop structure reads more through the pill while the glass register still computes (the A/B before/after captured).

### BA.W-GLASS-CAL.2 the disco retirement

- Goal: the disco is gone everywhere — no sparkle glyph, no grain texture-swap, no gold sweep, no `btn-audacious` class on any consumer; the CTAs read as calm glass buttons (specular + optional static gold) and the toggle-chip lifts on the §6 doctrine.
- Mechanism: delete the disco recipe family (`btn-audacious`/`btn-audacious-gold`/`sparkle-sweep`/`btn-gold-bg-sweep`/`--duration-sparkle`); collapse the `primary-audacious`/`gold-audacious` variants onto the calm glass register (gold keeps the static warm tint + specular, drops the sweep — hinge H2 arm a); collapse the dock-tab primary-tier phase-grain onto the plain glass hover register + drop the `btn-audacious` auto-attach; re-point `toggle-chip` onto `--duration-fast`/`--ease-standard` + the `--spring-smooth` scale lift; re-point any forced demo class site; rebaseline `proof:affordance-contrast` + `proof:animation-coherence` onto the new register.
- Files: `utilities/btn.css`, `animations.css`, `scheme-motion.css`, `dock-controls/tab-button.css`, `button/index.ts`, `DockTabButton.vue`, `toggle-chip/index.ts`, the demo consumers (lane A3), `proof-affordance-contrast.mjs`, `proof-animation-coherence.mjs`.
- Sub-gate: the gate's DISCO witnesses — `grep -n 'btn-audacious\|sparkle-sweep\|btn-gold-bg-sweep\|--duration-sparkle\|--glass-grain-opacity-disco' src/` returns ZERO (the recipe family + knobs gone); no `class*=btn-audacious` element renders at `/display/buttons` (the π live readback — 0 `✦` glyphs, 0 grain texture-swaps); the dock-tab primary tier hover composes the glass register not the grain; `toggle-chip/index.ts` carries no `duration-150` / raw `ease-out` literal (the §6 tokens resolve); the two rebaselined gates pass on the new register (their dropped assertions removed, not defeated).

## Hard Gate

`proof:glass-cal` (born-RED at HEAD, driven GREEN by the wave) — the comment-strip + pure-detector house pattern (mirroring `proof-dock-unify.mjs`), each witness RED at HEAD pre-wave. Plus the π gestalt readback (BA inv-4 — per-mechanism greens do NOT close a visual wave).

### BLUR arm (born-RED at HEAD: the radii sit at 10/12/16/15/11)

1. **B1 — the six radii calibrated.** `--glass-blur-quiet/-resting/-floating/-overlay/-dock-radius` each resolve to a value STRICTLY BELOW its pre-wave value (10/12/16/15/11) and WITHIN the AV.W7-F2 8–15px band; `--glass-blur-wash-radius` resolves 1px (unchanged). The assert reads the resolved `:root` tokens, not a literal string per rung (a value-drift evasion — a re-point to 9.5px must still pass the "below 10 AND in-band" predicate, not match an exact `8px`). RED at HEAD: the radii are at their full values.
2. **B2 — the @2dppx restore pulled.** The `tokens/light-dark.css` `@media (min-resolution:2dppx)` `--glass-blur-overlay-radius` resolves BELOW 24px (the ~20 target), in-band. RED at HEAD: 24px.
3. **B3 — the wrong axis untouched (anti-overreach).** `--glass-level` resolves its registered default (1) and EVERY `saturate()`/`brightness()` companion in the composed tokens (`glass.css:57–85`) is byte-unchanged from HEAD (the source half — the dial-back touched the radius axis ONLY). This is a POSITIVE no-drift assert, not merely "the radii changed" — it catches a lane that achieves the pull by dropping `--glass-level` (which would over-transparent every surface). RED-by-construction only if a future edit drifts the companions; born-GREEN, asserted at close.

### DISCO arm (born-RED at HEAD: the recipe family + knobs + chip flat-snap all present)

4. **D1 — the recipe family is GONE.** A `grep` over `src/styles/` finds NO `@utility btn-audacious`, NO `@utility btn-audacious-gold`, NO `@keyframes sparkle-sweep`, NO `@keyframes btn-gold-bg-sweep`, NO `--duration-sparkle`, NO `--glass-grain-opacity-disco` declaration. The assert is the POSITIVE absence (the source half). RED at HEAD: all six present.
5. **D2 — no consumer carries the class.** A `grep` over `src/` + `demo/` finds NO `btn-audacious`/`btn-audacious-gold` class string on any element/variant (`button/index.ts` `primary-audacious`/`gold-audacious` no longer compose it; `DockTabButton.vue:36` no longer auto-attaches it). The π half: at `/display/buttons` the live readback finds ZERO `[class*=btn-audacious]` elements and ZERO `::after { content:"✦" }` pseudo-elements (the binding visual truth — the lane's 6-element/6-sparkle baseline goes to 0). RED at HEAD: 6 elements, 6 sparkles.
6. **D3 — the dock primary tier collapsed.** `.dock-tab-button[data-tier="primary"]`'s hover rule references NO `--glass-grain-opacity-disco` / `--paper-clean-texture` / `--phase-color` grain composition and NO `[data-phase] ::before` rest-halo; its hover composes the plain dock-control glass register (bg → a `--glass-bg-*` tier, scale → `--scale-hover-dock`). RED at HEAD: the grain hover + halo present at `tab-button.css:123–173`.
7. **D4 — the chip on §6.** `toggle-chip/index.ts` carries NO `duration-150` and NO raw `ease-out` literal in its base; it reads the canonical `--duration-fast`/`--ease-standard` register + a scale leg (the §6 lift). The π half: a `<ToggleChip>` grid hover lifts (a non-1 scale + a surface cross-fade timed at `--duration-fast`), not a color-only snap. RED at HEAD: `transition-colors duration-150 ease-out`, no scale.
8. **D5 — the FENCE held (anti-overreach).** `.gold-shimmer` (`base.css:335–345`) STILL resolves its `background-clip: text` gradient; the `.glass-specular`/specular-track registers STILL resolve. A POSITIVE survival assert — the retirement did NOT take the fenced-out good pops. RED-by-construction only if a lane over-prunes; born-GREEN, asserted at close.

### The π binding readback (the gestalt bar — BA inv-4)

9. **The whole-page gestalt, BOTH modes, real backdrop.** Per `proof:ba-gestalt` (W-GESTALT-GATE), the owning surfaces — `/display/buttons` (the CTA register), `/dock/overview` (the blur-over-photo + the dock primary tier), the goo/aurora studio configurator (the toggle-chip grid) — are captured WHOLE-PAGE in BOTH modes over their real backdrops with an explicit gestalt verdict recorded: (a) the glass reads as glass at the dialed-back radii with more backdrop structure visible (BLUR); (b) the CTAs read as calm, distinguished glass buttons with NO disco (DISCO); (c) the dock primary tier reads as the primary affordance via glass register, not grain; (d) the toggle-chip grid lifts coherently with its neighbors. Captured to `docs/tranches/BA/audit/visual/W-GLASS-CAL-DELTA.md` with before/after frames against the lane A/B baselines (`glass-blur-cal-*` + `disco-hover-audacious-row.png`). **The π gestalt half is the binding visual truth — if D1–D5 + B1–B3 pass but the live render still reads disco-y or non-glass, the wave does NOT close (the AZ source-green/visually-broken close-class is exactly what BA inv-4 forbids).** The `proof:ba-gestalt` verdict for the W-GLASS-CAL roster surfaces must read operative-PASS; per-mechanism greens alone do not close this visual wave.

B1–B3 + D1–D5 are the device-free CI half (`proof:glass-cal`); the π gestalt readback (#9) + the `proof:ba-gestalt` verdict are the binding visual truth. Both halves must hold for a clean close.

## Format And Lint Cadence

`npm run typecheck` after the `button/index.ts` + `DockTabButton.vue` + `toggle-chip/index.ts` edits; `npm run build` to confirm the CSS partials compile (the btn.css/animations.css/tab-button.css carves + the glass.css/tokens/light-dark.css radius edits — the build is the binding compile check for a deleted `@utility`/`@keyframes`); `node scripts/proof-glass-cal.mjs` born-RED before the source edits (proof it fails at HEAD), GREEN at close; `npm run proof:affordance-contrast` + `npm run proof:animation-coherence` after the rebaseline (they must pass on the new register, not by a hole); `npm run proof:gate-script-parity` after the package.json/scripts/gates.mjs registration; `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-GLASS-CAL-DELTA.md` — before/after frames for both arms: the dock-over-photo + floating-dialog blur A/B (both modes) against `glass-blur-cal-*`; the `/display/buttons` disco before/after against `disco-hover-audacious-row.png`; the dock primary tier + the toggle-chip grid; the paired π readback (resolved radii, 0-sparkle count, chip scale-on-hover) + the recorded gestalt verdicts.
- The `proof:glass-cal` JSON artefact (born-RED log + GREEN-at-close log).
- The `proof:affordance-contrast` + `proof:animation-coherence` rebaselined pass logs.
- The gate-script-parity output post-registration.

## Commit Plan

- impl commit (Unit 1): `style(glass): dial back the blur ladder ~15-20% — six radius primitives + @2dppx restore (BA.W-GLASS-CAL)` — names the six values + the untouched `--glass-level`/saturate axis in the body.
- impl commit (Unit 2): `style(disco): retire btn-audacious family + dock-tab grain, chip onto §6 (BA.W-GLASS-CAL)` — names the deleted utilities/keyframes/knobs + the variant collapse + the chip re-point in the body (a deletion-scope commit body is required).
- gate commit: `test(glass): proof:glass-cal born-RED→GREEN + affordance/animation rebaseline + parity registration`.
- doc/status commit: `docs: calm CTA register + dialed-back blur in CLAUDE.md; MIGRATION rows; W-GLASS-CAL DELTA + PROGRESS`.

## Dependencies

- **Depends on**: W-DARK-MATERIAL (Batch 1) landed — the dark register re-tune may have shifted token line numbers (the §0 RE-GROUND re-locates). W-GLASS-CAL must land BEFORE Batch 6 captures (DAG §5): the blur dial-back changes every glass surface's render, so any Batch-6 staging capture taken pre-cal would stale at the cal. Hinge **H2** (gold's post-disco form) is decided by the user before this wave's variant collapse lands; the lane recommends arm (a) — gold survives CALM.
- **Blocks**: Batch 6 (W-STAGE et al.) consumes the dialed-back glass for its over-backdrop captures. W-REFLECT2 (Batch 7) re-walks the CTA + blur surfaces under the gestalt bar. W-CLOSE (Batch 7) carries the disco-retirement MIGRATION rows into the BA cut (hinge H4 — the disco retirement is a breaking change for the btn-audacious/gold consumers speedtest + slides, an input to the 4.0.0-vs-3.14.0 version call).
- **Coordinates**: the goo "jittery" defect is split by mechanism (DAG §3) — the renderer half (the wake seam) is W-GOO-REDRESS (Batch 2, landed); the CSS register half (the toggle-chip easing) is THIS wave's Scope 7. The W-REFLECT2 goo verdict checks BOTH landed.

## Archaeology

No prior attempt — both calibrations are first-pass on R8-directed grounding (the disco was an AN.R0/AW.W13-era audacious-CTA register the user now retires wholesale; the blur ladder is the AV.W7-F2 band the user finds "a hair too much"). The guardrail against the AZ close-class: the gate asserts the RETIRED state (the recipe family GONE, the radii dialed) with a π gestalt readback, not a mechanism-presence — and the FENCE witnesses (D5, B3) catch the over-prune / wrong-axis evasions a clean-break retirement is prone to.
