# foundations — Pass-E CATEGORY GESTALT (binding category verdict)

**Category:** `foundations` (the design-token + system-doc band) · **13 pages** synthesized:
`intro` · `typography` · `colors` · `radii` · `shadows` · `motion` · `icons` · `paper-glass` · `paper-texture` · `surface-tints` · `overlays-scrims` · `chart-chassis-palette` · `css-utilities`.
**Inputs:** all 13 per-page SYNTHESIS docs (each reconciling its own demo/design/component lenses — 39 lens reports) + the BD union roster (Bands 0-16, 97 canonical waves) + the Band-16 demo-chassis cluster (`W-PAGE-CHASSIS`/`W-HEADER-SCALE`/`W-PAGE-BACKGROUND`/`W-PAPER-MORPHISM`/`W-STICKY-TITLE-CONDENSE` + `W-STORY-PAGE-STANDARD` the spine) + `W-TOKEN-TOUR-GLASS` (Band 4) + `W-DEMO-BREADTH` (Band 9).
**North star (binding):** DESIGN.md (six-layer optical composite · 7 glass tiers · glass-cannot-sample-glass · spring physics) · design-idioms/motion-canon/affordance-map · the dock system · GLASS+PAPER both · TYPOGRAPHY-forward (√φ ladder) · HIGH animation for EVERY component · performant + Safari-safe.

---

## 0 · The one-paragraph category verdict

The foundations band is the storybook's THESIS — the pages that document the design language are exactly the pages that REFUSE it. **Thirteen independent triangulations land ONE identical verdict:** the COMPONENTS and TOKENS under every page are SOUND (√φ ladder correct · dark register honest · route-chips non-drifting · Safari/perf clean · no dual-path) — the failure is uniformly in the DEMO-EXECUTION layer, where the same FIVE structural defects recur on all 13 pages: (1) **glass over a dead/flat field** (the six-layer composite is invisible over `foundations→paper`/`grid` static washes — the BG-2 black-plate class the library's own canon condemns); (2) **no per-section glassy card / main area too small** (one flat slab, ~288px dead gutter on 1440); (3) **near-zero animation affordance** (one `.scroll-cascade` entrance, then frozen — the dead column-stagger `* 0` no-op surfacing on colors); (4) **zero-to-one library components composed** (the color page hand-rolls `<div :style>` instead of `<ColorSwatch>`; the overlays page never MOUNTS its protagonist `<ModalOverlay>`; the radii page writes "GLASS PILL DOCK" beneath a cream circle instead of a live `<GlassDock>`); (5) **the dock-API mandate entirely absent**. PLUS a cluster of **genuine SRC/render bugs** the demos surface: the dead `--surface-tint-quiet|floating|modal` aliases (surface-tints, P0), the frozen-half-faded rainbow (colors, P0), the dead `--paper-underpaint-color` token (paper-texture, SRC), the `position:fixed` PaperBackdrop conflation (paper-texture, SRC), the dead-swatch box-shadow-as-background (chart-chassis, P0), the dead `--shadow-soft`/`-elevated` non-adaptive rungs (shadows, SRC), the lying `btn.css` comment (css-utilities), the un-minted `--shadow-card-hover` (intro), the ℱ-caption render lie (typography). **The category is ~32% converged** — the DIRECTION is unambiguous (39 reports, zero substantive contradiction) but the work is an EXECUTION redesign of all 13 SFCs, not a polish pass.

---

## 1 · BRAINSTORM — what is DONE vs what REMAINS

### A · DONE — the SYSTEMIC fixes already covered by landed BD waves (do NOT re-mint)

The Band-16 demo-chassis cluster + W-TOKEN-TOUR-GLASS already OWN the cross-page systemic half. Every foundations page inherits these by construction once the cluster lands:

| Systemic defect (recurs on ALL 13 pages) | Owning wave (specced, gated) | Coverage |
|---|---|---|
| Oversized hero (`text-display-4/5` 86-110px eats the fold) | **W-HEADER-SCALE** (halve the rung map; library √φ byte-fenced) | FULL — chassis-once, all 13 propagate |
| No dividing rule below header + 36 duplicate in-card headers + 0 `<h2>` sections | **W-PAGE-CHASSIS** (`--story-header-rule` + CATEGORY_STOP fold + `label→heading` re-key) | FULL — chassis-once |
| Paper grain invisible (0.025 sub-perceptual; `--story-paper-wash: transparent`; typography wears zero grain) — **the "PAPER MORPHISM gap"** | **W-PAPER-MORPHISM** (lift demo `--story-paper-grain` 0.025→0.10/3.2×; tint the light wash; `ShowcaseFrame grain` prop on typography; library `--glass-grain-opacity` byte-fenced) | FULL — the prompt's "FIX 7" IS this wave |
| Glass over a dead field (BG-2) on the GLASS bands (forms/containers/feedback) | **W-PAGE-BACKGROUND** (CATEGORY_DEFAULT_BG live-field re-map; one-GL-per-route) | PARTIAL — covers the glass-heavy bands, but **foundations stays `paper` static** (the deliberate dense/specimen-band keep). The foundations colorful-field ask is NOT served here — see the GAP below. |
| The BC liquid-glass band (deep/lens/accent) undemoed on foundations | **W-TOKEN-TOUR-GLASS Arm B** (GL-FREE `tier="field"` over the static wash; enrolls paper-glass) | PARTIAL — Arm B is GL-FREE by fence; it satisfies "own glassy card" + "tier=field" but NOT a live colorful field |
| Wrapper folds (motion table / section / pulse raw triplets → ShowcaseFrame) | **W-TOKEN-TOUR-GLASS Arm A** | FULL for motion/section/pulse; the specimen-swatch KEEP fence (M12-2) holds for radii/shadows |
| The standardized chassis + demo sub-type taxonomy (DemoSpecimen/DemoStage/…) | **W-STORY-PAGE-STANDARD** (the SPINE — mint once, every page composes) | SPINE — the migration roster reaches foundations after the ≥6-category taxonomy converge |
| Page copy tighten + off-token sweep + the ℱ-caption fix + the motion `text-white` chip | **W-PAGE-OFFTOKEN-SWEEP** (Band 4) | PARTIAL — enrolled set is `{motion, buttons, badge}`; foundations pages must be ENROLLED |

**The DONE half is real and load-bearing.** ~50% of every foundations page's defect surface is the SYSTEMIC chassis recurrence, and that half has a specced, gated home. The prompt's named systemic asks — W-STORY-PAGE-STANDARD (glassy sub-cards · colorful field · protagonist · header-2× · dividing rule), the PAPER MORPHISM gap (W-PAPER-MORPHISM, FIX 7), the dead column-stagger, the oversized heroes (W-HEADER-SCALE) — are ALL already owned. The components/tokens KEEP verdict is unanimous and confirmed.

### B · REMAINS — the per-page EXECUTION redesigns with NO home at HEAD (the GAP)

The systemic chassis fixes the SCAFFOLD; they do NOT rebuild the CONTENT ARCHITECTURE of each page. Every synthesis independently reaches the same conclusion: after the chassis lands, each foundations page STILL needs a per-page wave that (a) composes ≥3 real library components, (b) wires a `<DockStack mode="facets">`/`<DockLayerGroup>` contextual switch, (c) animates the page's OWN subject (the corner morphs / the alpha sweeps / the scrim fires / the chassis breathes), and (d) makes the page demonstrate the system it documents. These per-page "ALIVE/COMPOSE" waves are NAMED in the syntheses but **DO NOT EXIST as wave files** (grep-confirmed: only `BD.W-VH-COMPOSE.md` exists; zero `*-ALIVE`/`*-COMPOSE`/`*-STAGE` foundations wave files).

| Page | Proposed per-page wave (synthesis) | Exists? | The genuine remaining work |
|---|---|---|---|
| typography | `BD.W-TYPOGRAPHY-ALIVE` | NO | Fraunces-kinetic focal word (SplitChars) + ratio-poster ladder + SegmentedTabs/DockLayerGroup register switch + `<Card :pressable>` peaks |
| radii | `BD.W-RADII-ALIVE` | NO | `--radius` liquefy `xs→pill` morph + per-swatch corner-spring + live-component aliases (`<Card>`/`<Button>`/`<GlassDock>` wearing their radius) + DockStack contextual switch |
| shadows | `BD.W-SHADOW-ALIVE` | NO | glass-tier elevation parade + raking `--light-angle` key-light + cartoon-HERO `text-display-audacious` + Dialog-casts-shadow-modal + DockStack facets |
| motion | `BD.W-MOTION-DOCTRINE-LIVE` | NO | kill the `<table>` → live two-lane SPATIAL(spring)/EFFECTS(bezier) split + hero specimen + dock contextual-switch + `<Card :pressable>` tiles |
| colors | `BD.W-COLOR-PAGE-COMPOSE` | NO | `<ColorSwatch>` (every stop/role) + DockStack facets + SegmentedTabs + `<IconChip>` viz glyphs |
| icons | `BD.W-ICON-PAGE-COMPOSE` | NO | SegmentedTabs size/stroke axis-morph + DockStack facets + `<IconChip bare>` grid + the full `tone`/`bare`/`duotone` API |
| surface-tints | `BD.W-SURFACE-TINTS-STAGE` | NO | alpha-sweep hero + click-to-copy + tabs/dock facets + the in-srgb-vs-in-oklab two-axis specimen |
| overlays-scrims | `BD.W-OVERLAYS-SCRIMS-LIVE` | NO | MOUNT + TRIGGER `<ModalOverlay>`/`<Dialog>`/`<Popover>`/`<ConfirmDialog>` (the scrim as a VERB) + self-demonstrating motion ladder + dock switch |
| paper-glass + paper-texture | `BD.W-PAPER-GLASS-ALIVE` (shared) | NO | vSpecular catch-light + useLiquidReveal bloom + useSpringPress + DockStack tier/texture facet-switch |
| intro | `BD.W-FRONTDOOR-BENTO` | NO | glass-deep hero + SplitChars entrance + DockStack category switcher + alive `#preview` thumbs + fold-rebalance |
| css-utilities | `BD.W-FOUNDATIONS-UTILS-REDESIGN` | NO | dock-facets-driven living swatch + real `<Button class=scale-on-hover>`/`<DockIconButton>`/`<Card :pressable>` + `:active`/specular/mount-pulse |
| chart-chassis-palette | (folds onto TOKEN-TOUR-GLASS — NO new wave) | n/a | dead-swatch composed-pair fix + chassis phase-bus cycling + `<ColorSwatch>`/`<Progress sectioned>`/`<DockStack facets>` |

**The category-defining decision (see §3):** these ~9 page-redesigns should NOT each become its own wave (9 waves fighting 13 SFCs is the per-page-bespoke anti-pattern W-STORY-PAGE-STANDARD exists to KILL). The GESTALT FOLD is to route them through the **W-STORY-PAGE-STANDARD demo sub-type taxonomy** + ONE consolidating Band-16 wave (`BD.W-FOUNDATIONS-ALIVE`) that enrolls all 13 foundations pages as `<DemoSpecimen>`/`<DemoMatrix>` instances with their per-page CONTENT free — exactly the spine's design intent.

### C · REMAINS — the genuine SRC/render bugs (a distinct, small, high-certainty set)

Unlike the demo redesigns, these are real `src/`-or-render defects that gate any "close" verdict. They are NOT a rebuild — they are point fixes with existing or trivially-new gate homes:

| Bug | Page | Severity | Home |
|---|---|---|---|
| Dead `--surface-tint-quiet\|floating\|modal` aliases → `transparent` (1/3 of page is a blank checker) | surface-tints | **P0** | demo-side: `bg-surface-tint-*` bridge utility (AUGMENT W-TOKEN-TOUR-GLASS resolve-clause) |
| Frozen rainbow `opacity 0.40` + ±11.9px zig-zag (scroll-entry timeline above fold) + the `* 0` dead column-stagger | colors | **P0** | `src/styles/scroll-choreography.css` repair (`.scroll-build` re-key + `--col` load-bearing) — **the "dead column-stagger" the prompt names** |
| Dead `--paper-underpaint-color` token (warm/cool/bone paint byte-identical) | paper-texture | **SRC** | **NEW `BD.W-PAPER-BACKDROP-CONTAIN`** (born-RED: token must paint) |
| `position:fixed` PaperBackdrop register-conflation (8 instances escape their cards) | paper-texture | **SRC** | same NEW wave (default contained, `fixed` opt-in prop) |
| Dead-swatch: `--glass-specular` (box-shadow) + `--glass-curvature-overlay` (0.012-α) painted as flat backgrounds → paint nothing | chart-chassis | **P0** | MODIFY W-TOKEN-TOUR-GLASS (composed before/after pair clause) |
| Dead `--shadow-soft`/`--shadow-elevated` non-adaptive raw-`rgba(0,0,0)` rungs, 0 consumers | shadows | **SRC** | RETIRE → `BD.W-WEAK-KEEP-REGRADE` / `BD.W-MISSED-SLAB-CENSUS` |
| `cartoon-surface` generic `--duration-normal` clock + no `:active` press | shadows | **SRC** | MODIFY `BD.W-BC-COMPONENT-CANON` (per-spring clock + press-unify) |
| `--shadow-cartoon`/`--soft-shadow` reversed-alias round-trip residue | shadows | **SRC** | AUGMENT W-PAGE-OFFTOKEN-SWEEP token-canon |
| Un-minted `--shadow-card-hover` (cartoon-stamp hover-flip on every preview card) | intro | **SRC** | AUGMENT W-PAGE-OFFTOKEN-SWEEP (mint soft-elevated rung) |
| ℱ-caption render lie (`.fourier-f` declares no color, resolves warm-ink) — **the "ℱ-caption render lie" the prompt names** | typography | render | caption-correction (zero src) in W-PAGE-OFFTOKEN-SWEEP |
| Lying `btn.css:11-13` lead comment (claims bezier, rule rides spring) | css-utilities | doc | MODIFY W-HOMEMAP-RESYNC (2-line comment) |
| `ModalOverlay` scrim/reveal clock desync (`sheet-animate` vs `.glass-reveal`) + Safari `-webkit-` gap + legacy `animate="scale\|slide"` dead arms | overlays-scrims | SRC | AUGMENT `BD.W-BC-COMPONENT-CANON` + `BD.W-DESHADCN-CANON` |
| `revealArg = computed(()=>undefined)` dead indirection + `--icon-chip-bloom-scale` un-declared | intro/icons | tidy | AUGMENT `BD.W-BC-COMPONENT-CANON` |

**Only ONE genuinely NEW src wave is owed across all 13 pages:** `BD.W-PAPER-BACKDROP-CONTAIN` (the two paper-texture src bugs). Every other src fix AUGMENTS an existing wave. This is the load-bearing distinction: foundations is overwhelmingly DEMO-side work + ONE small src micro-wave.

---

## 2 · CROSS-PAGE PATTERNS — the shared-chassis fixes vs the per-page

### The SHARED-CHASSIS axis (lands ONCE, propagates to all 13 — the KISS/DRY single-writer)
1. **Header scale** (W-HEADER-SCALE) — halve the rung. EVERY page.
2. **Header rule + duplicate-header fold + `<h2>` re-key** (W-PAGE-CHASSIS). EVERY page.
3. **Paper grain perceptible** (W-PAPER-MORPHISM). The paper-default foundations pages (all 13 inherit `foundations→paper`).
4. **Glassy sub-cards + `tier="field"` + bigger main + BC band over the wash** (W-TOKEN-TOUR-GLASS Arm B). The token-tour pages, enrolled per page.
5. **The standardized sub-type taxonomy** (W-STORY-PAGE-STANDARD). The spine every page composes.
6. **Copy tighten + off-token sweep** (W-PAGE-OFFTOKEN-SWEEP). Enrolled per page.

### The PER-PAGE axis (the content-architecture redesign — the subject is different per page)
- **typography** → kinetic Fraunces + ratio-poster ladder (the type IS the subject).
- **radii** → the `--radius`/`--corner-shape` SHAPE morph (the corner IS the subject).
- **shadows** → the raking `--light-angle` key-light + glass-tier elevation parade (the cast IS the subject).
- **motion** → the live SPATIAL/EFFECTS two-lane doctrine (the easing IS the subject).
- **colors / icons** → `<ColorSwatch>`/`<IconChip>` real-component grids + axis-morph (the swatch IS the subject).
- **surface-tints** → the alpha sweep (the α IS the subject).
- **overlays-scrims** → MOUNT + TRIGGER the scrim as a VERB (the dim event IS the subject).
- **paper-glass / paper-texture** → the six-layer composite over a live field (the duality IS the subject).
- **intro** → the bento front-door (the SAMPLER is the subject).
- **css-utilities** → the dock-facets living swatch (one hero interaction makes scarcity a virtue).
- **chart-chassis-palette** → the chassis phase-bus breathing (the chassis IS the subject).

### The TWO cross-page ARCHITECTURAL DECISIONS (the orchestrator calls)

**DECISION-1 — the foundations colorful-aurora ask vs the one-GL-per-route / M8 fence.** SEVEN syntheses (typography, colors, radii, shadows, paper-glass, paper-texture, surface-tints, chart-chassis) name the identical conflict: the user's literal "glass demos over COLORFUL aurora backgrounds" vs W-TOKEN-TOUR-GLASS's GL-FREE Arm-B fence (M8 reds a live `<Aurora>` on a `foundations→paper` static-wash route). The syntheses converge on a **TWO-PATH resolution**, and they are NOT unanimous on which path ships:
- **Path (a) — GL-FREE default (in-scope NOW):** per-section glass cards + the BC band over a CHROMATIC `tier="field"` wash seeded from the page's own `--section-color`/`--chart-*`/`--viz-*` ramp. M8 stays GREEN. Satisfies own-card + bigger-main + glass-over-color-WASH. **Default for radii/shadows/css-utilities/chart-chassis.**
- **Path (b) — LIVE `<Aurora>` (decision-gated NEW wave):** a manifest `paper → aurora` flip on a NAMED allowlist of translucency-subject pages (the paper-glass + paper-texture + surface-tints + overlays-scrims syntheses argue the colorful aurora is LOAD-BEARING for the teaching, not decoration — a scrim dims a colorful field; a tint admits colorful light; the six-layer composite needs a live backdrop). The flip is NOT an M8 violation (the route DECLARES its single GL background; M8 forbids a SECOND undeclared context) — it is a budget-allowlist + a fence rewrite of M12-4.

**The GESTALT resolution:** mint ONE shared decision-gated wave `BD.W-FOUNDATIONS-AURORA-FIELD` (the consumer set named by FOUR syntheses by construction: paper-glass · paper-texture · surface-tints · overlays-scrims — the translucency-protagonist pages where the field is the PHENOMENON). The token-tour/specimen pages (radii/shadows/colors/icons/css-utilities/chart-chassis) DEFAULT to path (a) GL-FREE chromatic-wash. **motion is the SPECIAL case** — its route is ALREADY GL (`background: constellation`, disk-confirmed), so its `constellation→aurora` re-point is a free manifest one-liner that folds into W-TOKEN-TOUR-GLASS with NO M8 collision (do NOT double-enroll motion in the AURORA-FIELD wave). **intro** is ALREADY `background: aurora` (the front door) — its aurora is a KEEP, not a flip.

**DECISION-2 — the "standardize the import-path label" ask.** Resolved UNANIMOUSLY across the band, two rules:
- A foundations page documenting a SYSTEM (not one exported component) uses the **route-form** chip (`/foundations/colors`, `/foundations/typography`, …) — this is ALREADY correct on intro/typography/colors/radii/shadows/motion/overlays-scrims/css-utilities/surface-tints/chart-chassis.
- **icons is the DRIFT** (renders `@mkbabb/glass-ui/icon-chip` — change the manifest subpath row off the component subpath onto the route-form `/foundations/icons` to match the band). **paper-glass is the GAP** (manifest `subpath` key ABSENT → no chip renders → add `subpath:"@mkbabb/glass-ui/styles"`). paper-texture is the REFERENCE (`@mkbabb/glass-ui/paper-backdrop`, correct — KEEP).
- The token-page `@mkbabb/glass-ui/styles`-vs-route-form question (raised by typography/surface-tints/radii component lenses) is a CROSS-CUTTING manifest convention, NOT per-page — book it to ONE manifest pass under W-PAGE-OFFTOKEN-SWEEP / W-PAGE-CHASSIS, not 13 page edits.

### The reference-class KEEPS (do NOT regress — unanimous across the band)
- The IconChip "Pops" row (icons) — the corpus reference for the one-color-event idiom.
- The √φ display ladder + the dark register (every page) — sound by construction.
- The `.shadow-stage` dark perception-correction (shadows) — the one genuine craft on its page.
- The `<Transition>` + §6 token system (motion) — the library's cleanest motion surface, zero src change.
- The specimen-swatch KEEP fence (radii/shadows) — the box-style IS the demoed token; folding masks it (M12-2).
- The `paper-grain-overlay` / `<PaperBackdrop>` / `ShowcaseFrame grain` mechanisms — already ship; W-PAPER-MORPHISM is a strength recalibration, not a new mechanism.

---

## 3 · The TRANCHE FOLD — consolidated wave amendments + new waves

### FOLD-A · The per-page redesigns → ONE consolidating wave on the W-STORY-PAGE-STANDARD spine

**Do NOT mint 9 separate `*-ALIVE`/`*-COMPOSE` waves** (the per-page-bespoke anti-pattern the spine kills). Instead:

**NEW (Band 16): `BD.W-FOUNDATIONS-ALIVE`** — the foundations content-architecture rebuild, enrolling all 13 pages onto the W-STORY-PAGE-STANDARD sub-type taxonomy (`<DemoSpecimen>`/`<DemoMatrix>`/`<DemoStage>`/`<DemoComposition>`) with per-page CONTENT free. Demo-private, zero src paint. Its sub-arms ARE the per-page syntheses' redesigns (typography-kinetic · radii-shape-morph · shadows-raking-light · motion-doctrine-live · color/icon real-component grids · surface-tint alpha-sweep · scrim-as-verb · paper-six-layer-composite · front-door-bento · css-utils-living-swatch · chassis-phase-bus), but they share ONE wave + ONE gate so the gestalt is coherent. **Gate (born-RED):** each enrolled foundations page (a) composes ≥3 real library components, (b) wires a `<DockStack mode="facets">`/`<DockLayerGroup>` contextual switch, (c) animates its OWN subject (the page-specific kinetic move), (d) `:active`/specular/entrance affordances present, (e) the dead/hand-rolled `<div :style>` swatches → real components. **π:** the `page-band` aggregate per-page verdict on fresh captures, both modes. **DEPENDS:** W-STORY-PAGE-STANDARD (the chassis must exist first), W-HEADER-SCALE, W-PAGE-CHASSIS, W-PAGE-BACKGROUND/AURORA-FIELD (the field staging).

This is the single highest-leverage FOLD: it converts 9 phantom per-page waves + the chart-chassis composition arm into ONE spine-consuming wave, honoring the KISS/DRY mandate the user binds.

### FOLD-B · The shared decision-gated aurora field

**NEW (Band 16, decision-gated): `BD.W-FOUNDATIONS-AURORA-FIELD`** — the live colorful `<Aurora>` for the translucency-protagonist foundations pages (paper-glass · paper-texture · surface-tints · overlays-scrims; ≥4 consumers by construction). Manifest `paper→aurora` flip on a NAMED allowlist + the M12-4 fence rewrite ("no SECOND GL context" — the route's declared aurora is its one-and-only) + the M8 allowlist carve. Default ships path (a) GL-FREE chromatic-wash for the OTHER foundations pages; this wave is the orchestrator scope-call for the four where the field is the teaching. **Gate:** the four routes stage a contained offscreen-paused `<Aurora>`; the glass demos composite a live non-uniform field (variance-floor π); one-GL-per-route holds.

### FOLD-C · The MODIFY/AUGMENT amendments to existing waves

| Existing wave | Amendment | Pages |
|---|---|---|
| **W-TOKEN-TOUR-GLASS** | ENROLL `typography·colors·radii·shadows·icons·surface-tints·paper-glass·paper-texture·chart-chassis·css-utilities` in Arm-B (per-section `tier="field"` glass cards over the chromatic wash, M12-2 specimen-KEEP held); ADD the **dead-swatch composed-pair clause** (a box-shadow/sub-α composite token is NEVER swatched as a flat `background` — chart-chassis `--glass-specular`/`--glass-curvature-overlay`); ADD the **surface-tints dead-alias resolve-clause** (every swatch `var()` resolves non-`transparent`); LIFT the strict-zero-src posture for the ONE `scroll-choreography.css` `* 0` column-stagger repair (colors) | 10 |
| **W-PAGE-OFFTOKEN-SWEEP** | ENROLL `typography·colors·icons·radii·shadows·surface-tints·paper-glass·paper-texture·intro` (copy-tighten + the ℱ-caption fix + the dead-alias round-trip collapse + **mint `--shadow-card-hover`** soft-elevated + **mint the motion `text-white`→`text-foreground`** already enrolled); the import-label manifest convention pass (icons drift, paper-glass gap) | 9 |
| **W-PAGE-BACKGROUND** | motion `constellation→aurora` re-point (the ONE M8-free foundations flip — its route is already GL) | 1 (motion) |
| **W-BC-COMPONENT-CANON** | `cartoon-surface` per-spring clock + `:active` press (shadows); `<InstrumentChassis>` mount-bloom + vSpecular reach + `-webkit-backdrop-filter` (chart-chassis); `ModalOverlay` scrim-couples-the-reveal-clock + Safari pair (overlays-scrims); IconChip `revealArg` PRUNE + `--icon-chip-bloom-scale` `:root` (intro/icons); the IconChip-is-brand-overlay-not-glass fence note | 5 |
| **W-DESHADCN-CANON** | `ModalOverlay` legacy `animate="scale\|slide"`/`layout="edge"` dead-arm prune (overlays-scrims) | 1 |
| **W-DEEP-GLASS-20PX / W-GLASS-LENS-CHROMA** | the chassis dial + the modal-scrim recede as consumers; `--phase-tint-peak` recalibration | 2 |
| **W-HOMEMAP-RESYNC** | the lying `btn.css:11-13` lead comment (2 lines) — the SOLE src paint css-utilities surfaces | 1 (css-utilities) |
| **W-WEAK-KEEP-REGRADE / W-MISSED-SLAB-CENSUS** | RETIRE dead `--shadow-soft`/`--shadow-elevated` (0 consumers, non-adaptive raw-rgba); re-confirm chassis `spine`/`structure` ≥2-consumer bar | 1 (shadows) + chart-chassis |
| **W-PAPER-MORPHISM** | the paper-texture grain-exaggeration on the comparison panels rides this wave's demo rung (no edit owed — already its remit) | paper-texture |

### FOLD-D · The ONE genuinely-new src micro-wave

**NEW (Band 16, src): `BD.W-PAPER-BACKDROP-CONTAIN`** — the two paper-texture SRC bugs. (a) `paper.css paper-underpaint` reads `background-color: var(--paper-underpaint-color, transparent)` so the warm/cool/bone retint PAINTS (born-RED: zero readers today); (b) the SFC defaults the CONTAINED `paper-grain-overlay` register with an explicit `fixed` opt-in prop (born-RED: `position:fixed` default today); (c) `frequency` resolves a single `--paper-texture` indirection. Gate `proof:paper-backdrop` born-RED → GREEN + a 3-bite self-test + a π (the retint paints three distinct hues). **The ONLY new src wave the entire foundations band owes.**

### PRUNE summary
- The empty non-interactive decorative `<button>`s (css-utilities Sections 1-2) → folded into the real-component series.
- The "resolved drift" changelog section (chart-chassis) → DELETE from the UI (no-meta-in-artifacts).
- The redundant second tier-role string table (paper-glass) + accent-dot confetti → cut.
- The spec-chip `<ul>`s (paper-texture, icons proportion-doctrine `<p>`) → README/`/api`, one code-voiced line.
- The dead `--shadow-soft`/`--shadow-elevated` rungs → RETIRE (clean break, no alias).
- The `BezierEditor`/`StepsEditor` demo forks (already retired by BB.W-EASING-PRIMITIVE — confirm).

---

## 4 · CONVERGENCE assessment

**Category convergence: ~32%.** The DIRECTION is fully converged (39 lens reports + 13 syntheses, zero substantive contradiction — the rare case where the diagnosis is unambiguous). The EXECUTION is a near-total demo-layer redesign of all 13 SFCs gated behind the W-STORY-PAGE-STANDARD spine, plus a cluster of point bugs. NO page in the band is "close"; the SOUND components/tokens (the KEEP half) converge immediately, but they are not what the user is judging — the user is judging the demo SURFACES, which fail FOUR-to-SEVEN of the BD bars each.

| Page | Conv % | Loops to converge | Driver of the remaining loops |
|---|---|---|---|
| intro (front door) | **~40%** | 2 | the highest BAR (the thesis statement); world-class typography + real aurora already RIGHT; ONE bento-rebuild wave then verify |
| typography | ~25% | 2-3 | worst-converged in band; misses 4 bars + the ℱ bug; Fraunces-kinetic focal word needs a design re-judge |
| colors | ~35% | 2-3 | P0 frozen-rainbow + the `* 0` dead-stagger + full component composition (ColorSwatch/dock/tabs) |
| radii | ~30% | 2 | the SHAPE-morph is the page's reason to exist (un-demoed); execution redesign composing shipped primitives |
| shadows | ~25% | 2 | LOWEST bespoke-premium (2/10) + 3 component-source defects the siblings lack; raking-key-light design re-judge |
| motion | ~25% | 2-3 | worst-converged alongside typography; the live two-lane doctrine is a near-total redesign; component is the CLEANEST in the library (KEEP) |
| icons | ~30% | 2-3 | structural twin of colors; one hero row over a spec-sheet; 2/4 sections never touch IconChip |
| paper-glass | ~20% | 3-4 | the highest-leverage foundations page + FURTHEST from north star; 6/7 asks unmet; manifest-flip + fence rewrite + behavior wave |
| paper-texture | ~18% | 3-4 | FURTHEST in band; TWO genuine SRC bugs ON TOP of the 6-axis demo gap; src wave gates the demo |
| surface-tints | ~20% | 2-3 | P0 dead-alias + near-total rebuild; the alpha-sweep is the subject's reason to exist |
| overlays-scrims | ~18% | 2-3 | WORST-converged (never mounts its protagonist; dead section + dead ladder); needs BOTH a demo-redesign AND src fixes |
| chart-chassis-palette | ~30% | 2-3 | P0 dead-swatch forecloses close; frozen chassis; full rebuild (field + glass cards + live chassis + component series + content cuts) |
| css-utilities | ~25% | 2 | thinnest page in system; the redesign makes content scarcity a virtue (one hero interaction); 2-line src comment converges instantly |

**Per-page average ≈ 27%; weighting the front-door's higher base and the deeper paper/overlays pages → category ~32%.**

**Loops to category convergence: 2-3 full loops after the wave fold lands.**
- **Loop 1 (build):** W-STORY-PAGE-STANDARD spine + W-FOUNDATIONS-ALIVE (the 13-page redesign) + W-FOUNDATIONS-AURORA-FIELD (the 4 translucency pages) + W-PAPER-BACKDROP-CONTAIN (src) + the MODIFY/AUGMENT amendments + the chassis cluster (W-HEADER-SCALE/W-PAGE-CHASSIS/W-PAPER-MORPHISM/W-PAGE-BACKGROUND). Capture all 13 pages, both modes.
- **Loop 2 (verify + hardening):** live-π re-audit — the glass-over-field reads, the dock-facet contextual-switch animates, the page-specific kinetic move (corner-morph/alpha-sweep/scrim-fire/chassis-breathe) reads, the dark mode is not a charcoal void, the P0 bugs are dead. Bento-rhythm + dark-mode tune.
- **Loop 3 (gestalt re-earn, conditional):** the `proof:ba-gestalt` per-page verdict on fresh pixels — does each page read as iOS-27 liquid-glass demonstrating its own system, rather than compliant-flat? The pages most likely to need this 3rd loop: typography (the Fraunces-kinetic focal word), shadows (the raking key-light reads as canonical-not-gimmick), paper-glass/paper-texture (the six-layer composite over the live field), overlays-scrims (reads as the surface where a backdrop dims).

**The single highest-leverage move (do FIRST):** land W-STORY-PAGE-STANDARD + the chassis cluster (W-HEADER-SCALE/W-PAGE-CHASSIS/W-PAPER-MORPHISM) — they fix ~50% of every page's defect surface in ONE chassis-once edit and are the PREREQUISITE the per-page redesigns build ON. Then W-FOUNDATIONS-ALIVE + W-FOUNDATIONS-AURORA-FIELD convert the 13 spec-sheets into glass-over-color compositions in one structural pass. The src bugs (P0 dead-alias, frozen rainbow, dead paper token, dead-swatch) are point fixes that clear "close" — do them in the same loop.

**RUTHLESS-CHALLENGER caveat:** the risk is the per-page CONTENT over-converging to surgical banality — 13 pages each with a DockStack-facet-switch + an alpha/corner/scrim animation could read as ONE template stamped 13 times (the generic-AI tell the band is trying to ESCAPE). The W-STORY-PAGE-STANDARD sub-type taxonomy is the guard (the frame conforms, the content varies NATURALLY), but it is only as good as the per-page CONTENT judgment. The 2nd verify loop MUST check distinctiveness, not just conformity — each foundations page should read as its OWN subject's showcase (typography ≠ shadows ≠ scrims), not as the same glass-card-with-a-dock thirteen times.
