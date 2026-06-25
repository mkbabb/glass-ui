# STORY-PAGE-STANDARD — WAVE-AMENDMENT (the concrete tranche amendment)

> Makes `W-STORY-PAGE-STANDARD` BUILDABLE by reconciling it against the live 116-wave union set +
> the GOLDEN (`./GOLDEN.md`) + the three challenge folds (`./DELTA-ASSAY.md`). Reference
> implementation throughout: **`./GOLDEN.md`** (with the §4 struck claims in the DELTA-ASSAY binding).
> No duplicative work — every cross-wave edge is reconciled below. Tranche-DEV only; build USER-gated.

---

## 0 — RECONCILE FIRST (the on-disk reality of the 116-wave set)

Grepped live (`docs/tranches/BD/union/waves/`, 116 `.md`):

- **ON DISK (this item's territory):** `W-STORY-PAGE-STANDARD.md` (the sub-type spine — the wave to
  make buildable), `BD.W-PAGE-CHASSIS.md` (the header rule + the 36-file double-header fold +
  `label→heading` re-key — DISJOINT, already specced + gated), `BD.W-PAGE-BACKGROUND.md` (the
  field-map + the demo-side staging seam — DISJOINT, AUGMENTED by the page-background sibling),
  `W-HEADER-SCALE.md` / `W-STICKY-TITLE-CONDENSE.md` (the heroScale + sticky bar — DISJOINT),
  `BD.W-LIQUID-ENTRANCE-GENERAL` / `W-LIQUID-ENTRANCE-GENERAL.md` (the universal liquid-weight LAW —
  the cel-slam is an INSTANCE of it, already cited there at `:110`), `BD.W-CONCENTRIC-RADIUS.md` (the
  matrix-cell radius rung — CONSUME).
- **BOOKED-BUT-UNWRITTEN (sibling-delta deliverables, files pending tranche-dev close):**
  `BD.W-PAGE-FIELD` + `BD.W-FIELD-SCRIPT` + `BD.W-FIELD-AURORA-RECONCILE` (page-background delta — the
  field primitive + `warmFieldHue` + the Aurora amplifier), `BD.W-CARTOON-PUNCH` + `BD.W-MOTION-WEIGHT`
  (motion-spring delta — the punch easing + the weight scalar), `BD.W-CARTOON-CASTER` (cartoon-shadow
  delta — the inert `.cartoon-cast` child). These are the DEPEND edges below.

**The headline reconcile: the GOLDEN's "FOLD PAGE-CHASSIS + PAGE-BACKGROUND into one chassis wave" is
REJECTED.** Those two waves are DISJOINT axes already on disk, each born-RED + gated. Folding them
would duplicate authored, gated work (R8). Instead `W-STORY-PAGE-STANDARD` is AUGMENTED to own ONLY
the `<DemoFrame>` sub-type spine + the cel-slam + the universal field MOUNT + the φ² stage, and it
DEPENDS on the other two — three disjoint waves on the same chassis (the `BD.W-PAGE-CHASSIS` "four
disjoint edits, one chassis" precedent generalized).

---

## 1 — THE AMENDMENT (augment / new / depend / prune / excise — cite by filename)

### AUGMENT `docs/tranches/BD/union/waves/W-STORY-PAGE-STANDARD.md` (make it buildable)

The wave is currently a SPEC of the conformity invariants + the sub-type taxonomy table, with the
chassis "minted ONCE … BUILD once the taxonomy converges." That spec is FIT and stays. The augment
makes it BUILDABLE by (a) naming the THREE net-new artefacts + their exact construction per
`./GOLDEN.md` §2 with the §4-struck claims corrected, (b) declaring the build-DAG, (c) RE-INVENTING
the born-RED gate to the painted RASTER bar:

- **The three net-new artefacts (reference `./GOLDEN.md` §2a/§2c/§2e, with the DELTA-ASSAY §4 folds):**
  - `demo/stories/_chassis/DemoFrame.vue` — the SINGLE-BOX chassis: `<StorySection heading label
    blurb class="demo-frame story-cel" :data-variant>` → `<Card :tier>` (the glass) + a sibling
    `<div class="demo-frame-caption">`. `tier = stage ? "quiet" : "wash"` (field-aware translucent,
    NEVER opaque `bg-card`). **NO `ShowcaseFrame` wrapper** (the redundant 3-deep nest collapse,
    challenge R2). **NO `::after` cast** (consume `.cartoon-cast`, challenge R4). The `<slot/>` is the
    only per-page free content. **NO `index.ts` re-exports** — pages compose `<DemoFrame variant>`
    DIRECTLY (the broken slot-dropping `(p)=>h(...)` is EXCISED, challenge R1).
  - `demo/stories/_chassis/demo-frame.css` — the φ ladder off `--story-article-w`; the per-variant
    internal layouts; the φ² stage escape via HOISTED stage cels (direct article children at
    `--story-stage-w`, prose cels at `--story-prose-measure` — **NO `cqw`, NO `container-type`**, the
    dock-collapse-scar-safe form, challenge R4/R7); the cel-slam on the SHIPPED `.scroll-build`
    mount-clock as PRIMARY (the `--i` 1/φ overlap stagger that works on a TIME clock), `view()`
    `@supports`-gated for below-fold scroll-reveal ONLY (challenge R2/R3); the concentric-radius
    matrix cells (CONSUME `BD.W-CONCENTRIC-RADIUS`).
  - the `field`/`palette` prop wiring at `AppShell.vue:251` — grow the page-background sibling's prop
    on the already-mounted `<PaperBackdrop>`, fed `warmFieldHue(categoryHue(currentCategory))`. ONE
    writer → all 118 routes inherit the warm field. **This is the demo-side per-route MOUNT the
    page-background GOLDEN §2b names** — the field PRIMITIVE + the adapter are the sibling's; this is
    the mount that consumes them.
- **The `variant="stage"` body RENDERS a `VizStudio`** for the stage layout (a UNION — DemoStage is
  the φ²-bleed + caption + cel-slam wrapper, VizStudio is its stage-body engine), NOT a fold that
  deletes VizStudio's `presets`/`scrollMode`/state surface (challenge R8). No parallel chassis, no
  capability loss, no legacy.
- **KEEP** the wave's conformity-invariant list, the sub-type taxonomy table, the per-category
  migration roster — but STAGE the migration per-category (the gate samples each band as it lands),
  NOT a single ~118-file GREEN flip (challenge R8).
- **The build-DAG (HARD ordering — assert before the dependent gate clauses evaluate):**
  `W-STORY-PAGE-STANDARD` BLOCKS-ON `BD.W-PAGE-FIELD` + `BD.W-FIELD-SCRIPT` + `BD.W-FIELD-AURORA-
  RECONCILE` (the field, S2/S8) + `BD.W-CARTOON-PUNCH` + `BD.W-MOTION-WEIGHT` (the punch/weight, S6) +
  `BD.W-CARTOON-CASTER` (the cast, S6) + `BD.W-PAGE-CHASSIS` (the one-title fold, S5). All 0-in-`src/`
  live-verified — the chassis is GREEN-on-paint only after they land.
- **Born-RED (live-verified this session, `/display/buttons` @ 1440):** 0 `_chassis/`; article
  **1152px**, `artLeft 189.5` → ~188px dead margin/side; **0 `.paper-field`**, `--field-h` UNSET, page
  raster **C 0.0029**; the body ONE flat `.story-hero-card` plate + the duplicate in-card descriptor
  (`assay/buttons-light.png`); `--story-header-rule` UNSET, header `border-bottom: 0px`.

### NO NEW STANDALONE WAVE (the spine is the AUGMENT above)

The GOLDEN proposed `W-STORY-PAGE-STANDARD` as the chassis with PAGE-CHASSIS/PAGE-BACKGROUND folded
in. The union keeps the on-disk wave + AUGMENTS it (no new file for the spine — the existing
`W-STORY-PAGE-STANDARD.md` IS the spine wave, made buildable). The field/motion/caster work is NOT
re-authored here — it is the sibling deltas' already-booked waves (DEPEND, below).

### DEPEND / CONSUME / PRUNE / EXCISE edges (reconciled against the 116-wave set)

| edge | wave | action |
|---|---|---|
| DEPEND | `BD.W-PAGE-FIELD` (booked, page-background delta) | the `@utility paper-field` chroma core + the CSS-clamped `--field-h`. CONSUME; the chassis mounts it universally, never re-mints it. |
| DEPEND | `BD.W-FIELD-SCRIPT` (booked, page-background delta) | the `warmFieldHue(categoryHue(id))` adapter. The `AppShell.vue:251` mount FEEDS it; the chassis owns no second category-hue registry (DRY). |
| DEPEND | `BD.W-FIELD-AURORA-RECONCILE` (booked, page-background delta) | `<Aurora field>` reads `--field-h` — the `variant="stage"` substrate amplifier (the rung-1 over the mesh floor). |
| DEPEND | `BD.W-CARTOON-PUNCH` (booked, motion-spring delta) | `--ease-cartoon-punch` for the cel-slam arc; no literal-cubic duplicate in `demo-frame.css` (the var() fallback is the unlanded-stopgap ONLY). |
| DEPEND | `BD.W-MOTION-WEIGHT` (booked, motion-spring delta) | `--motion-weight` co-scales the squash/overshoot/cast-lag so the cel deforms as ONE proportioned object (§L4); PRM → 0. |
| DEPEND | `BD.W-CARTOON-CASTER` (booked, cartoon-shadow delta) | the inert `.cartoon-cast` child + its `will-change`/no-inherited-backdrop-filter cross-engine fences. The cel-slam's lagging cast CONSUMES `.cartoon-cast`, NOT a hand-rolled `::after { box-shadow }` (challenge R4). |
| DEPEND | `BD.W-PAGE-CHASSIS` (on disk) | the `--story-header-rule` seam + the 36-file double-header fold + the `label→heading` re-key. The `<DemoFrame>` renders only `<StorySection heading>` (the `<h2>`), never a 2nd `<h1>`/in-card eyebrow — it RELIES on PAGE-CHASSIS having folded the dup (S5). DISJOINT axis, not re-authored. |
| CONSUME | `BD.W-CONCENTRIC-RADIUS` (on disk) | `r_inner = r_outer − gap` on the `matrix`-variant cells. |
| INSTANCE-OF | `W-LIQUID-ENTRANCE-GENERAL` / `BD.W-LIQUID-ENTRANCE-GENERAL` (on disk, P7 the universal law) | the cel-slam is a P7 instance (it already cites `W-STORY-PAGE-STANDARD` at `:110` as "the sub-card entrance"). The mount-clock spring + squish + fade-coupling ride P7a–P7d; the `liquid-weight` gestalt lens judges the cel-slam. No new motion engine. |
| RECONCILE (no edit) | `BD.W-PAGE-BACKGROUND` (on disk, AUGMENTED by page-background delta) | the demo-chassis field-MAP (`CATEGORY_DEFAULT_BG`) + the `tier="field"` re-points + the BUG-D1/D2 dock folds STAY whole. The chassis's universal field MOUNT is the GROUND the map's amplifier selector sits over (the page-background reconcile — "amplified vs plain, never live vs dead"). DISJOINT: that wave owns the per-category amplifier map, this owns the universal mount + the per-sub-type transmit. |
| RECONCILE (no edit) | `W-HEADER-SCALE` / `W-STICKY-TITLE-CONDENSE` (on disk) | the heroScale rung + the sticky bar — orthogonal chassis edits; the cel-slam + the φ² stage are disjoint from the header scale + the sticky condense. |
| PRUNE | — | NO on-disk wave is pruned. |
| EXCISE (from the GOLDEN, not a wave) | the five `(p)=>h(DemoFrame,{...p})` re-exports + `index.ts`; the `ShowcaseFrame tier="field"`→`Card` 3-deep nest; the `cqw`/`container-type` bleed; the `view()`-as-PRIMARY entrance + the no-op `animation-delay` stagger on it; the `::after { box-shadow }` cast + the re-minted warm `--shadow-cartoon`; the "fold PAGE-CHASSIS+PAGE-BACKGROUND" framing; the "RE-EXPRESS VizStudio (retire the parallel)"; the monochrome single-hue field as the chassis's concern | replaced by the union §2 of `./DELTA-ASSAY.md` (the single-box `<Card>` + caption div, the hoisted fixed-width stage, the `.scroll-build` mount-clock primary, the `.cartoon-cast` consume, the three-disjoint-waves reconcile, the VizStudio union-render, the field hardening deferred to the page-background delta). |

**NO existing on-disk wave is PRUNED.** `W-STORY-PAGE-STANDARD` is AUGMENTED (the spine, made
buildable); `BD.W-PAGE-CHASSIS` + `BD.W-PAGE-BACKGROUND` + `W-HEADER-SCALE` + `W-STICKY-TITLE-CONDENSE`
stay whole as disjoint axes; the field/motion/caster work MERGEs onto already-booked sibling-delta
waves. No duplicative work against the 116-wave set.

---

## 2 — THE BORN-RED GATE: `proof:story-page-standard` + `tests-visual/story-page-standard.spec.ts` (RASTER, paired-engine, both modes)

Reference: `./GOLDEN.md` §6, with the apparatus held to the page-background RASTER discipline (the
fraudulent-stop-string-average lesson). **Sample the COMPOSITED page pixel via SVG-foreignObject→
canvas RASTER or Playwright full-page `getImageData` — NEVER `getComputedStyle`-string parsing.**
Paired-engine (Chromium + WebKit), both modes. Born-RED on HEAD by construction.

| # | assert | born-RED on HEAD (live this session) | GREEN when |
|---|---|---|---|
| **S0 deps-present (the build-DAG guard)** | `@utility paper-field`, `--field-h`, `warmFieldHue`, `--ease-cartoon-punch`, `--motion-weight`, `.cartoon-cast`, `--story-header-rule` all EXIST in `src/`/`demo/` before S2/S5/S6/S8 are scored | all 0-in-`src/` (live grep) | the 7 sibling DEPENDS land — until then S2/S5/S6/S8 are CONDITIONAL (a deps-absent run is RED-on-S0, not a false-RED on the dependents) |
| **S1 chassis-adopted** | every `demo/stories/<cat>/*.vue` composes `<StoryPage>` + ≥1 `<DemoFrame variant>`; NO bespoke `rounded-card border bg-card` scaffold off the allowlist; NO `index.ts` re-export indirection (pages use `<DemoFrame variant>` directly) | 0 `_chassis`, ad-hoc per-page boxes | the per-category migration lands (STAGED, sampled per band) |
| **S2 field-behind-glass (§3)** | every glassy `DemoFrame` has a `.paper-field` ancestor at `z` below it; the field region RASTERS mean OKLab **C ≥ 0.045 warm** (H ∈ [25,95], tealFrac 0); the field carries a hue-SPREAD Δ ≥ 25° across sampled patches (polychrome, not monochrome — challenge R5) | 0 fields, C 0.0029 | the universal mount + `warmFieldHue` (the page-background delta's hardened field) |
| **S3 glassy sub-card + DEFINED EDGE** | each `DemoFrame` cel is translucent `quiet`/`wash` (NOT opaque `bg-card`); composited transmit-delta over the field vs a flat `--neutral-0` patch **C ≥ 0.018 warm**; the cel BORDER rasters a contrast delta ≥ floor against the field at its rim (the §3 "defined edge" — challenge R5) | ONE flat `.story-hero-card` plate | the field-aware tier + the edge |
| **S4 φ²-stage (hoisted, no cqw)** | a `stage`-variant cel measures **≥ φ × the prose column** AND **> 1152**; the prose cels stay measure-bound; dead margin < 60px; the stage is a DIRECT article child (no `container-type` ancestor — challenge R4/R7) | 1152 @ 1440, ~376px total dead | the hoisted fixed-width stage escape |
| **S5 ONE title** | exactly 1 `<h1>` + the descriptor ONCE (no 2nd in-card eyebrow); `--story-header-rule` paints (`border-bottom > 0`, resolving through `--configurator-divider`) | header rule unset, double-header (`assay/buttons-light.png`) | DEPEND `BD.W-PAGE-CHASSIS` (the fold) |
| **S6 cel-slam (the punch, on the MOUNT clock)** | the above-the-fold protagonist builds on the punch arc FROM `t=0` of paint (anticipation dip below origin → overshoot > 1 → settle) with the cast LAGGING (the `.cartoon-cast` transform settles ≥1 frame after the plate); captured on the on-mount clock, NOT a scroll-only `view()` (challenge R2) | static chrome, no build | the `.scroll-build` mount-clock cel-slam + the `.cartoon-cast` consume |
| **S7 overlapping stagger (TIME clock)** | cel N+1's build begins BEFORE cel N settles, over the on-mount frame-series (the `--i` 1/φ step on a TIME clock — NOT a no-op `animation-delay` on a view timeline, challenge #3-R1) | — | the mount-clock overlap step |
| **S8 both-mode warm** | the field + glass read warm-luminous in BOTH modes (dark GLOWS, never charcoal) — dark raster C ≥ 0.045, L ∈ [0.25,0.6] | dark page C ~0.0028 @ L 0.146 (page-background live) | the warm-dark mesh + tier |
| **S9 conformity WITH variation** | ≥4 sampled pages share the kernel fingerprint (glassy · field · one-title · entrance) WHILE their body content DIFFERS | ad-hoc per-page | the chassis |
| **S10 cross-engine (Safari-real)** | the WebKit capture (emulate `@supports not (animation-timeline: view())`) STILL shows the punch arc + the lagging cast via the MOUNT clock — a plain fade FAILS (challenge R3); the field path is sRGB-pinned (chroma-preserving end-stops, no gray edge — challenge #2-R1) | — | the mount-clock primary (engine-independent) |
| **S11 a11y arms (PRM + PRT, separate)** | PRM → the cel-slam + cast + field-drift freeze to the terminal frame (`--motion-weight: 0` + the `@media` gate), the page reads one static cel sheet; PRT → `--field-intensity: 0` drops to the `--neutral-0` warm-solid floor (H ∈ [25,95], C ≥ 0.012 still warm, NOT gray), the cels go opaque-warm, conformity survives (challenge R9) | — | the carves wire |
| **S12 anti-evasion (≥8 bites)** | FAILS on: a flat opaque cel (S1/S3), a dead field C 0.003 (S2), a teal field h210 (S2), a monochrome field with no edge (S3 edge-bite), a 1152-capped or `cqw`-bled stage (S4), a 2nd header (S5), a `view()`-only entrance that misses above-fold (S6), a non-overlapping march (S7), a `.cartoon-cast` that does NOT lag (S6), an EMPTY `<DemoStage>` (the slot-drop regression — challenge R1), a stop-string-average field input (the fraudulent-proof bite) | — | passes ONLY on the real cel-stage |

**Self-test (`--self-test`, born-RED→GREEN):** re-introduce a bare `bg-card` section → S1/S3 RED;
pin the article to 1152 → S4 RED; add a `container-type` ancestor + `cqw` bleed → S4 RED; strip the
`.paper-field` mount → S2 RED; re-paste an in-card eyebrow → S5 RED; swap the mount-clock for
`view()`-only → S6 RED (above-fold static); set the stagger step to 0 → S7 RED; a `.cartoon-cast`
with no lag → S6 RED; a `(p)=>h(DemoFrame,{...p})` re-export that drops the slot (empty stage) → the
S12 slot-drop bite RED; a stop-string-average field reader → the S12 fraud bite RED. Each MUST flag;
the fixed tree clean. **No source-green close — the painted, paired-engine, RASTER-honest π is binding.**

**Surfaces:** `/display/buttons`, `/forms/select`, `/substrates/aurora`, `/containers/dialog`,
`/feedback/alert` — BOTH modes, BOTH engines. **The gestalt row** (`BD-union-roster surface:
story-page-standard`, wired by `BD.W-GESTALT-WIRE`): on a FRESH whole-page both-mode `:5199` capture
(NEVER reducedMotion, surface-hash floor), every content page wears the hero page's clothes — a vivid
warm field behind every glass demo, each sub-section its own glassy cel, the φ² protagonist BIGGER,
ONE title, the page ASSEMBLES on the cartoon punch arc with the lagging cast — conformity WITH natural
variation. Born-FAIL on HEAD; GREEN at its OWN close; W-REFLECT re-confirms on fresh pixels.

---

## 3 — SUMMARY

ONE AUGMENT of the on-disk `W-STORY-PAGE-STANDARD.md` (made buildable: the three net-new demo-side
artefacts — `DemoFrame.vue` single-box chassis + `demo-frame.css` hoisted-φ²-stage + mount-clock
cel-slam + the `AppShell.vue:251` field mount; the build-DAG; the RE-INVENTED RASTER π); NO new
standalone wave for the spine; SEVEN DEPEND edges (`BD.W-PAGE-FIELD`/`BD.W-FIELD-SCRIPT`/
`BD.W-FIELD-AURORA-RECONCILE` + `BD.W-CARTOON-PUNCH`/`BD.W-MOTION-WEIGHT` + `BD.W-CARTOON-CASTER` +
`BD.W-PAGE-CHASSIS`); CONSUME `BD.W-CONCENTRIC-RADIUS`; INSTANCE-OF `W-LIQUID-ENTRANCE-GENERAL` (P7);
RECONCILE (no edit) `BD.W-PAGE-BACKGROUND` + `W-HEADER-SCALE` + `W-STICKY-TITLE-CONDENSE` as disjoint
axes. NO on-disk wave pruned. The GOLDEN's broken slot-dropping re-exports, the redundant ShowcaseFrame
nest, the `cqw` bleed, the `view()`-primary entrance, the `::after` cast, the re-minted
`--shadow-cartoon`, the "fold three waves into one" framing, the "retire VizStudio" framing, and the
monochrome field as the chassis's concern are EXCISED (folded into the union of `./DELTA-ASSAY.md`).
Reference implementation: `./GOLDEN.md`.
</content>
