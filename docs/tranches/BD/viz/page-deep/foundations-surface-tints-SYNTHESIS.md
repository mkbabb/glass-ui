# foundations/surface-tints — Pass-E SYNTHESIS (binding per-page verdict)

**Route:** `/foundations/surface-tints` · **SFC:** `demo/stories/foundations/surface-tints.vue`
**Inputs:** the three Pass-E reports (`-demo.md`, `-design.md`, `-component.md`).
**Resolved facts:** background `paper` (category default, no override); zero library components composed; 3 sections in ONE `StoryHero resting` card; the tier-alias section is a DEAD demo (transparent swatches); enrolled in NO BD wave.

---

## 1 · Reconciled read (all three agree)

The page is a flat token spec-sheet that violates the page's own design language on nearly every user axis. The three lenses converge with zero contradiction — they differ only in emphasis (demo=API-completeness, design=iOS-27-fidelity, component=wave-mapping). The unanimous findings:

- **BUG (P0, all three).** The tier-alias swatches read `bg-[var(--surface-tint-quiet|floating|modal)]` — bare custom properties that DO NOT EXIST in `src/` (only the `@theme` bridge `--color-surface-tint-*` does, `theme/bridges.css:159-161`). All three resolve `transparent`. 1/3 of the page demonstrates a blank checker with a code label — the demo is lying, and it re-occurs the exact imperceptibility defect the page's own docstring claims it fixed.
- **No live colorful field (all three).** `background: paper` → static wash, no aurora, zero `<canvas>`. The page whose ENTIRE subject is translucency demos it over a flat field where the tint cannot read (the BG-2 self-defeat). The checker is a SIMULATED backdrop; a live aurora is the real one.
- **One card, three sections (all three).** User's "each sub-section in its OWN glassy card" unmet — bare `<section>`s share one plate.
- **Zero component composition (all three).** Only `StoryPage`+`StorySection` chassis + raw divs. No Card/Tabs/Button/Dock/viz. The user's "deftly uses a series of components" + "leverage the dock APIs" entirely unmet.
- **Animation affordance fails the iOS-27 bar (all three).** ONE entrance (`.scroll-cascade`), then frozen. No hover/press/state/ambient. Most damning given the subject: a tint IS an alpha, the single most animatable property over a moving backdrop.
- **Dead third section (demo+design).** "dark-mode parity" is a heading+blurb pointing UPWARD ("the swatches above shift") — the page outsourcing its own demo.
- **Superfluous prose + over-claim (all three).** The blurbs re-explain the checker rationale to the reader and promise a "warm→cool gradation" that is sub-threshold/invisible at swatch scale.
- **Path label (demo PASS; component nuance).** The Fira-Code chip renders the route `/foundations/surface-tints`. Component lens: a pure-CSS token page's canonical import label should be `@mkbabb/glass-ui/styles` (the tokens' real ship channel), not the demo URL.

**The one genuine CONFLICT to resolve (component lens surfaced it):** the user mandate "glass over COLORFUL aurora" DIRECTLY contradicts `BD.W-TOKEN-TOUR-GLASS`'s load-bearing **M8 one-GL-per-route fence** (M12-4 reds an `<Aurora>`/GL stage on a static-wash foundations route — `BD.W-TOKEN-TOUR-GLASS.md:73,78,93,102`). This is not a swatch detail; it is a tranche-architecture decision. Resolution below (RANK #2).

**The structural gap:** `surface-tints.vue` is in NO BD wave's enrolled set (`grep` = 0). W-TOKEN-TOUR-GLASS modernizes motion/section/pulse/radii/shadows/paper-glass but never cites this file. Any fix needs an explicit enrollment.

---

## 2 · Ranked changes + tranche actions

### RANK 1 — Fix the dead alias bug (P0 correctness; smallest, highest-certainty)
The page lies on 1/3 of its surface. `bg-[var(--surface-tint-quiet)]` → `bg-surface-tint-quiet` (the documented bridge utility) or `var(--color-surface-tint-quiet)`.
**ACTION: AUGMENT `BD.W-TOKEN-TOUR-GLASS`** — add a born-RED M-clause asserting every swatch `var()` resolves to a non-`transparent` paint (a `getComputedStyle` proxy or a source-grep that the alias swatches read a defined token). The wave owns the foundations token-tour modernization but does not yet cite this file — enroll it.

### RANK 2 — Resolve the aurora-vs-M8 conflict; put a COLORFUL field behind glass tint cells (highest user-impact; tranche decision)
This is the page's headline move AND the one architectural conflict. The user's bar is explicit and binding ("glass demos over COLORFUL aurora backgrounds"); the M8 fence is also real (perf — the one-GL-per-route budget). They are reconcilable, NOT mutually exclusive: M8's intent is "don't stage a GHOST second GL context on a page that already has a designed static wash" — it was written to keep the GL-FREE glass-band CSS demo honest. An ELEVATED token-tour page that EARNS its single aurora (≤1 GL context per route, the budget preserved) is a different case.
**ACTION: MODIFY `BD.W-TOKEN-TOUR-GLASS` §6 + the M8/M12-4 gate.** Reframe the fence from "foundations pages are GL-FREE" to "≤1 GL context per route; a NAMED allowlist of translucency-subject pages (surface-tints + paper-glass) earns its aurora." Flip the `surface-tints` manifest row `background: "aurora"` (the rose-indigo-amber colorful field, not the warm-only default). Re-render each rung as a real `glass-resting` tile carrying `--surface-tint-N` as its actual admit-through layer over the LIVE field. PRUNE `.tint-checker` once aurora lands — the aurora IS the contrast reference. This is the move that turns the page's monochrome liability into its one suffusion color-event (the color is the LIGHT the tint admits, not a decoration).

### RANK 3 — Each sub-section in its OWN glassy card + bigger canvas (user mandate, structural)
Split scale/aliases/parity into three distinct glass plates; make the dead parity section a LIVE light|dark split. Differentiate weight: Numeric scale = quiet reference strip; aliases = LOUD applied showcase (each alias ON its real tier — quiet/floating/overlay); parity = live split. Use the bleed register (`StoryHero.vue:327 .story-hero-bleed-content`) for the full-viewport-over-field canvas the "bigger card area" mandate wants.
**ACTION: AUGMENT the NEW wave (RANK 5)** — wrap each `<StorySection>` body in `<ShowcaseFrame tier="field">` (the BG-2 glass-over-field host). Honor the specimen-KEEP fence (W-TOKEN-TOUR-GLASS §6): the swatch divs stay bare (they ARE the demo); only the SECTION wrapper gains the card.

### RANK 4 — HIGH animation affordance: animate the ALPHA (iOS-27 bar, the subject's reason to exist)
A hero specimen whose `--surface-tint-strength` sweeps `4% → 25%` on a `--spring-smooth` clock (`@property`-typed interpolation, DESIGN.md §L2) so the reader WATCHES the plate densify over the aurora. Per-cell hover springs the alpha up one rung with a W-LIQUIDHOVER specular gleam + `useLiquidFlex` squish. Click-to-copy the token (the token-tour's PRIMARY missing affordance) with the affordance-map FOCUS-RING + tooltip confirm.
**ACTION: AUGMENT the NEW wave (RANK 5).** Compositor-only, PRM→terminal (motion-canon P5/P6). The five-affordance vocabulary (HOVER-LIFT/GLEAM-TRACK/PRESS-SQUISH/DRAG-MORPH/FOCUS-RING) is currently entirely absent — even click-to-copy alone clears the floor.

### RANK 5 — Compose a series of components + leverage the dock APIs (user mandate, the "deft composition" bar)
`<SegmentedTabs>` switches scale | aliases | parity panels; a `<DockStack mode="facets">` rail (BE.W-DOCK-RAIL-REALIZE) switches the showcase CONTEXT — Numeric ramp ↔ Tier aliases ↔ Light|Dark parity ↔ "tint as hairline vs tint as plate" — each facet carrying its `--glass-accent` hue, the dock morph (W-DOCK-MORPH-FAMILY) animating transitions. Teach the two-axis distinction the library keeps disjoint: render `--surface-tint-N` AS its real use (a `border-[var(--surface-tint-12)]` hairline on a card, a chip backplate) and contrast it against the in-oklab `--glass-tint-*` admit-through — the AW.W26 in-srgb-vs-in-oklab fence made visible. Promote ONE giant hero specimen to `text-display` scale (the audacious √φ tail the page abandons).
**ACTION: NEW Band-16 wave `BD.W-SURFACE-TINTS-STAGE`.** No existing wave enrolls surface-tints, and the dock/tabs/hero-specimen composition exceeds W-TOKEN-TOUR-GLASS's wrapper-fold + GL-free-glass-band scope. Real gate `proof:surface-tints-stage`: S1 aurora field staged (≤1 GL, allowlisted off M8) · S2 per-section ShowcaseFrame glass cards · S3 the three-context dock/tabs switcher wired · S4 the alpha-sweep + hover/click-to-copy affordances present + PRM-carved · S5 the in-srgb-vs-in-oklab two-axis specimen + the dead-alias resolve · S6 the language tighten + import-label standardize + a self-test bite (a synthetic bare flat-stack reds; a synthetic GL-ghost on a non-allowlisted route reds). Tie the ShowcaseFrame (RANK 3), alpha-animation (RANK 4), and tighten/relabel (below) arms here.

### RANK 6 — Tighten language + standardize the import-path label (user mandate, trivial)
Cut the checker-rationale meta-justification (belongs in a source comment); drop the unverifiable warm→cool over-claim; replace the third section's "toggle the theme" instruction with the live parity cell. Standardize the chip to `@mkbabb/glass-ui/styles` (the tokens' ship channel) per the token-page convention.
**ACTION: FOLD into `BD.W-SURFACE-TINTS-STAGE` S6** (and the import-label convention reconciles under the page-chassis subpath-chip convention — note there is NO `BD.W-PAGE-CHASSIS` wave on disk; if the import-label convention needs a home, it folds into `BD.W-PAGE-OFFTOKEN-SWEEP` which owns the cross-page prose/label sweep). PRUNE the over-claim and the meta-prose.

---

## 3 · Tranche-action summary

| # | Change | Action | Wave |
|---|--------|--------|------|
| 1 | Dead alias vars → transparent (P0 bug) | AUGMENT (born-RED resolve-clause) | BD.W-TOKEN-TOUR-GLASS (+ enroll the file) |
| 2 | Aurora-vs-M8 conflict + colorful field behind glass | MODIFY §6 + M8/M12-4 gate (≤1-GL allowlist) | BD.W-TOKEN-TOUR-GLASS |
| 3 | Per-section glassy cards + bigger canvas | AUGMENT (ShowcaseFrame tier=field + bleed) | BD.W-SURFACE-TINTS-STAGE |
| 4 | Animate the alpha + hover/click-to-copy | AUGMENT (spring sweep + affordance vocab) | BD.W-SURFACE-TINTS-STAGE |
| 5 | Tabs + dock facets + hero specimen + two-axis | NEW Band-16 wave + gate | BD.W-SURFACE-TINTS-STAGE |
| 6 | Tighten prose + standardize import label | FOLD (S6) / PRUNE over-claim | BD.W-SURFACE-TINTS-STAGE (label → W-PAGE-OFFTOKEN-SWEEP) |

---

## 4 · Convergence call

**FAR from converged — needs several more loops.** This is one of the FLAT/THIN pages: it fails on every user axis simultaneously (no aurora, no per-section cards, no components, no dock, no animation beyond entrance, a P0 dead-demo bug, dead third section, over-claiming prose). It is a near-total rebuild, not a polish. The three lenses agree unanimously, so the DIRECTION is unambiguous — but the work is a NEW Band-16 wave (`BD.W-SURFACE-TINTS-STAGE`) plus a load-bearing gate reconcile on W-TOKEN-TOUR-GLASS (the M8 aurora-allowlist), and the rebuilt page then needs at least one more deep-loop to verify the aurora reads, the dock-facet switch animates, the alpha-sweep is perceptible, and the two-axis distinction actually teaches. Estimate: 1 build loop + 1–2 verify loops after the wave lands.
