# foundations/motion — COMPONENT deep audit (Pass-E)

**Page:** `demo/stories/foundations/motion.vue` → import label `/foundations/motion` (route path; class-only page — the PAGES.json convention for non-subpath foundations pages, consistent with intro/typography/radii/shadows).
**Underlying "component":** this is a foundation-TOUR page (the CSS-half of the motion system), not a Vue SFC with its own logic. The real source surface is the **Vue `<Transition>` recipe system** + the **§6 easing/spring token canon**:
- `src/styles/transitions.css` (the 9 `<Transition>` class-sets: `fade` · `fade-slide` · `dialog-scale` · `pop` · `dropdown` · `tab-fade` · `pane-swap` · `metric-swap` + the `.dock-in` entrance utility — the page demos the first 6)
- `src/styles/tokens/scheme-motion.css:236-291` (the `--spring-{smooth,snappy,bouncy}` `linear()` curves, the generated `--spring-*-duration` settle clocks, the `--ease-{standard,out,out-expo}` bezier aliases, and the §6 easing-doctrine table the page's legend mirrors)
- `src/styles/animations.css:89+` (the `@keyframes dock-in` the `.dock-in` utility drives)
- canon: `docs/precepts/motion-canon.md` (P1-P6 the table embodies)
- gate: `scripts/proof-animation-coherence.mjs` (the EASING-TABLE-BOUND + register-assignment gate that locks this surface)

This audit is the COMPONENT (the transition/token system), NOT the demo presentation (the easing-table card + the 6 toggle cards — those demo concerns are already owned by `BD.W-TOKEN-TOUR-GLASS` Arm A + `BD.W-PAGE-OFFTOKEN-SWEEP`).

---

## (1) ANIMATION — affordance, four-state contract, motion-canon

The `<Transition>` recipe system is the **single most motion-canon-correct surface in the library** — it is the source the §6 doctrine table re-states, so it is idiomatic by construction:

- **GOOD — the P1 spring-iff-spatial / bezier-iff-effect split is EXACT across all 9 recipes.** Every SPATIAL leg (`transform` scale/translate) rides a `--spring-*`; every EFFECTS leg (`opacity`) rides a bezier `--ease-*`. `fade-slide` enter: `opacity … --ease-out` + `transform … --spring-smooth`. `dialog-scale`/`pop` enter: `transform … --spring-bouncy`. `dropdown` enter: `transform … --spring-snappy`. No spring on a colour/opacity leg, anywhere.
- **GOOD — P2 enter-bouncy / exit-no-overshoot is honoured.** Every ENTER rides a spring (`--spring-bouncy`/`-snappy`/`-smooth` = overshoot = physicality); every LEAVE rides a bezier (`--ease-out`/`--ease-standard`/`--ease-in`) — an exit never overshoots past gone. `dialog-scale-leave` / `pop-leave` / `dropdown-leave` all drop the spring for the bezier. This is the exact canon.
- **GOOD — P4 the per-spring DURATION clock is wired.** Every spring leg pairs its MATCHED `--spring-<name>-duration` settle clock (`--spring-smooth-duration` 0.36s / `--spring-snappy-duration` 0.34s / `--spring-bouncy-duration` 0.57s), NOT a generic `--duration-normal`. This is the W-GLASS-CAL fence held — the surface does NOT carry the re-timed-tail jank the cartoon-surface sibling (shadows audit DEFECT B) still carries.
- **GOOD — P3 fade-coupled-to-transform.** Every transform recipe couples an opacity leg in the same class-set; no naked transform.
- **GOOD — P6 PRM keeps-fade / drops-transform.** The `@media (prefers-reduced-motion: reduce)` block (transitions.css:212-262) keeps the opacity transition (shortened), forces `transition-property: opacity !important` to eliminate the transform leg, and snaps `transform: none !important` on every from/to. The `.dock-in` keyframe collapses to `0.01ms`. Textbook P6.
- **GOOD — the layer hygiene.** The whole sheet is `@layer components` (Q.W4 Lane C) so a `<Transition>` class can never silently outrank a recipe at equal specificity — the documented cascade-asymmetry fix.
- **MISS (minor, not the page's component) — the four-state CONTRACT does not apply here.** The four-state contract (rest/hover/active/disabled) is a CONTROL bar; `<Transition>` recipes are enter/leave grammar, not interactive controls — so "four-state" is N/A by category. The page's interactive surface (the Toggle button) is a real `<Button variant="secondary">` which DOES carry the four-state contract (it is the library button, not a hand-roll). No miss.
- **NO dead/janky/missing animation in the component.** Every recipe is live, spring-clocked, PRM-carved. The Toast exemption (reka-owned `tw-animate-css` choreography, not a `<Transition>`) is a DELIBERATE, gated keep (the REGISTER_ASSIGNMENT_ALLOW set in proof:animation-coherence) — documented at transitions.css:152-209.

## (2) PROCEDURAL VIZ
**None.** No aurora/blob/fourier/dot-flow on this page or in the transition/token system. N/A — out of scope. (The page's category default background is `constellation` per manifest motion-band identity, but foundations/motion resolves the route as a foundations-tour page; the actual rendered backdrop is the calm wash, no GL — correct for a token tour.)

## (3) PERFORMANCE
- **Compositor-only:** every recipe animates ONLY `opacity` + `transform` (translate/scale). Zero layout properties (no width/height/top/left/padding). `proof:no-layout-animation` holds by construction — these are the canonical compositor-only recipes the gate's allowlist is BUILT from. GOOD.
- **No offscreen-pause concern** (no rAF, no GL in the component). N/A.
- **No layout-thrash.** The spring `linear()` curves + duration tokens resolve once at first paint; a `<Transition>` toggle is a single class-swap. The demo's 6 simultaneous toggles are 6 independent compositor transitions — trivial. GOOD.

## (4) SAFARI COMPATIBILITY
- **`linear()` easing function** (the spring curves) — Safari 17.2+. This is the load-bearing primitive of the whole spring system. Pre-17.2 Safari falls back to `linear` (the un-prefixed keyword the parser accepts), so a spring degrades to a flat ramp — motion still completes, no break (the documented graceful floor). GOOD.
- **Individual `transform` / `opacity` transitions** — universal. GOOD.
- **`@layer`** — Safari 15.4+. GOOD.
- **No `light-dark()` / no inset-shadow trap / no `backdrop-filter`** in the component. Clean.

## (5) IDIOMATIC / NO-LEGACY — the real component defects

- **GOOD — the component is the no-legacy MODEL.** No dual-path, no workaround, no dead recipe in transitions.css. `pane-swap`/`metric-swap`/`dock-in` are live consumed elsewhere (KeepAlive panes, metric crossfades, dock entrance). The §6 doctrine table is single-sourced (scheme-motion.css) and re-stated (not duplicated) in motion-canon.md.
- **NO src defect.** Unlike the shadows audit (dead `--shadow-soft`/`--shadow-elevated`, alias round-trip, cartoon-surface clock-drift), the motion component has no dead token, no clock-drift, no alias bloat. The spring tokens are GENERATED (`regen-spring-tokens.mjs`) from the SPRING_PRESETS table — never hand-authored.

### DEMO-side findings (already enrolled — NOT new src work)
- **`motion.vue:133` `text-white` over `bg-[var(--motion-accent)]`** — the brand-hue-plate + white-label co-occurrence the W-NO-GRAY/legibility register condemns. **ALREADY ENROLLED in `BD.W-PAGE-OFFTOKEN-SWEEP`** (M11-1, `OFFTOKEN_ENROLLED = {foundations/motion, display/buttons, display/badge}`; re-point `text-white` → `text-foreground`, page-band gestalt verdict).
- **The easing-doctrine `<table>` card (`:85-100`) + the 6 transition-demo content wrappers (`:108-115`, the raw `rounded-card border bg-card p-5 shadow-cartoon` triplet)** — hand-rolled container wrappers. **ALREADY ENROLLED in `BD.W-TOKEN-TOUR-GLASS` Arm A** (cited verbatim at the wave's §2; fold onto `<ShowcaseFrame>`/`<Card>`, drain from the M9A_BASELINE).
- **DEMO docstring (`:2-7`) restates the de-dup thesis** — minor superfluous language; the comment is informative (it records the AZ.W-MOTION-SUITE de-dup rationale), borderline KEEP.

## User-ask mapping (the 2026-06-22 directive)
- **"each sub-section in its OWN glassy card"** — the 2 sections are bare `StorySection` blocks; the easing table + the 6 cards are NOT per-section glass cards. The 6 demo cards are opaque `bg-card` + the easing table is a bordered `<div>`. The per-section glass framing is exactly **BD.W-TOKEN-TOUR-GLASS Arm A** remit (fold to ShowcaseFrame/Card `tier="field"` over the wash).
- **"the main card area BIGGER (more screen space)"** — bounded by `--story-page-max-inline` on the article; a wider field is a chassis change, not this page.
- **"glass demos over COLORFUL aurora backgrounds"** — this page is a STATIC wash (foundations→paper / one-GL-per-route budget). A colorful aurora behind it COLLIDES with the M8 GL-on-static-wash gate + the foundations→paper default + the GL-FREE remit of TOKEN-TOUR-GLASS — a DECISION-GATED scope call, NOT a free fold (same verdict as the typography audit F7).
- **"leverage the dock APIs (contextual switching/animating)"** — the page has no dock. A natural `DockLayerGroup` candidate: switch contexts between the easing-doctrine LEGEND · the `<Transition>` GALLERY · a (future) spring-curve PLOT register — one dock per route, contextual-switching the three motion registers. This is an AUGMENT, not a defect (a NEW wave).
- **"standardize the import-path label"** — `/foundations/motion` is the route path (class-only page, no subpath) — already consistent with the foundations class-page convention. No change.
- **"tighten superfluous language"** — the SFC docstring + the doctrine/transition blurbs; minor, owned by the off-token/comment-tighten arm.

## FOLD / MODIFY / AUGMENT / PRUNE → BD waves

| # | Finding | Verdict | Wave |
|---|---------|---------|------|
| F1 | The `<Transition>` recipe system + §6 spring/easing tokens are FULLY motion-canon-correct (P1-P6), Safari-graceful, compositor-only, no-legacy — the MODEL surface | **KEEP (no change)** | — (locked by `proof:animation-coherence` + `proof:no-layout-animation`) |
| F2 | `motion.vue:133` `text-white` over `--motion-accent` brand plate (illegibility/no-gray) | **MODIFY** | **BD.W-PAGE-OFFTOKEN-SWEEP** (M11-1 — already enrolled; `→ text-foreground`) |
| F3 | The easing `<table>` card + the 6 raw `rounded-card border bg-card shadow-cartoon` content wrappers → glass framing per-section | **FOLD** | **BD.W-TOKEN-TOUR-GLASS** Arm A (already cites `motion.vue:85-100` + `:108-115` verbatim) |
| F4 | The transition-demo cards are STATIC specimens — each `<Transition>` toggle is the only motion; no entrance/`.scroll-cascade` build on the card grid; the sample chip is inert until toggled | **AUGMENT** | **BD.W-TOKEN-TOUR-GLASS** Arm B (the glass-band demo over `tier="field"` + the `.scroll-cascade` section build the foundations pages get) — extend coverage to motion.vue's card grid; PRM-static |
| F5 | "leverage the dock APIs" — a `DockLayerGroup` contextual-switch between LEGEND · GALLERY · (curve PLOT) registers | **AUGMENT** | **NEW (scope-gated)** — a demo-private dock layer-group; respects one-dock-per-route; NOT a free fold |
| F6 | "colorful aurora behind the motion pane" collides with M8 GL-on-static-wash + foundations→paper + GL-FREE TOKEN-TOUR remit | **DECISION-GATED** | Orchestrator scope call — a manifest `background:` change + M8 carve, owned by a NEW wave, NEVER smuggled into the GL-FREE TOKEN-TOUR wave |
| F7 | SFC docstring + doctrine/transition blurbs restate the thesis | **PRUNE (minor)** | **BD.W-PAGE-OFFTOKEN-SWEEP** comment-tighten arm |

## Verdict (5 lines)
1. **The COMPONENT is the library's cleanest motion surface — KEEP, no src change:** the 9 `<Transition>` recipes + the `--spring-*`/`--ease-*` tokens are the SOURCE the §6 doctrine re-states, so they are P1-P6 motion-canon-correct BY CONSTRUCTION (spring-iff-spatial, enter-bouncy/exit-no-overshoot, per-spring duration clock wired, PRM keeps-fade/drops-transform), compositor-only, `@layer`-hygienic, and gate-locked by `proof:animation-coherence` + `proof:no-layout-animation`.
2. **No procedural viz, no Safari trap:** N/A on viz; the only Safari floor is `linear()` (17.2+) which degrades to a flat ramp pre-17.2 — graceful, no break; no `light-dark()`/`backdrop-filter`/inset-shadow trap in the component.
3. **Zero src defect — unlike the shadows sibling:** no dead token, no clock-drift, no alias bloat, no dual-path; the spring tokens are GENERATED from the SPRING_PRESETS table, never hand-set. The Toast `tw-animate-css` exemption is a deliberate, gated keep.
4. **All gaps are DEMO-presentation-side and ALREADY ENROLLED:** the `text-white`-over-brand-plate is in **BD.W-PAGE-OFFTOKEN-SWEEP** (M11-1); the easing-table card + 6 raw wrappers are in **BD.W-TOKEN-TOUR-GLASS** Arm A (cited verbatim) + the per-section glass framing + `.scroll-cascade` build is its Arm B.
5. **The user-ask "own glassy card / dock APIs / aurora" maps to AUGMENTS, not the component:** per-section glass = TOKEN-TOUR-GLASS Arm B; a `DockLayerGroup` LEGEND·GALLERY·PLOT contextual-switch = a NEW scope-gated wave; the "colorful aurora behind the pane" is a **DECISION-GATED** collision with the M8 GL-on-static-wash gate + foundations→paper default — must NOT be smuggled into the GL-FREE TOKEN-TOUR wave.
