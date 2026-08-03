# BK ROW #12 · `W-BG-CLOSE-RECONCILE` — the BG join against HEAD

**modelId: `claude-opus-5[1m]`** (asserted by prefix `claude-opus-5`; #11 tri-fold labor law, cursor ⊕¹⁵).
**Owner:** Claude Code (⊕¹⁸). **Executed:** 2026-08-03, doc-side only, zero `src/` bytes.
**HEAD walked:** `aee47957` (`package.json:3` → `"version": "7.0.0"`).
**Spec of record:** `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:162` →
`RECONCILIATION.md` §8 item 9 (`:340`) + §9, as extended by `PROOF-SWEEP.md:367` (U-05).

This is a **join, not a re-run**. Nothing here re-executes a BG wave; every row states what is on
disk at `aee47957` and where the residue goes in the BK roster.

---

## 0 · Corpus derivation, and the three figures reconciled

Three different name-counts circulate. All three are stated, one is adopted.

| figure | where it is asserted | what it counts | status here |
|---|---|---|---|
| **~119 waves** | `RECONCILIATION.md:77` | every `BG.W-*` id in `BG/FINAL.md` | **ADOPTED** — re-derived from disk: `grep -o "BG\.W-[A-Z0-9-]*" docs/tranches/BG/FINAL.md \| sort -u` → **119** distinct ids (plus one artifact token `BG.W-` discarded) |
| **66 orphan names** | `RECONCILIATION.md:77`/`:340` | of the 119, those in zero commits AND zero `docs/tranches/BJ/` files | **SUBSUMED** — the 119-walk is a superset; per-name commit/file evidence is in §2 |
| **60 unmapped names** | `PROOF-SWEEP.md:367` (U-05), quoted at `TERMINAL-ROSTER.md:162` | of the 119, those unmapped to a BK cursor row | **NOT REPRODUCIBLE, and superseded.** The nearest mechanical test — exact name-stem present in `TERMINAL-ROSTER.md` or `BK/EXECUTION-PROGRESS.md` — yields 8 mapped / 111 unmapped, not 59/60. BK renamed nearly every seat (`BG.W-DOCK-*` → `#47 GF-DOCK`, etc.), so no stem test can land on 60. **Correction of record: the U-05 "60" is an un-methodised figure and is retired; row #12 walks all 119.** |

**Adopted corpus: 119 `BG.W-*` ids + 1 booked non-wave name (`createFragmentGLPass`, U-05 B6) = 120 units.**

**Coverage honesty.** Every row below carries a disk probe (grep/`wc -l`/`git log`) run at
`aee47957`. Probes are *existence and shape* probes — doc-side. **No row claims a paint or motion
verdict**; where a BG wave's acceptance was a live-π, this row records the disposition of its
*subject* and routes the π to its BK owner. Row #12 has no browser seat and asserts no π.

---

## 1 · The two abrogation facts that dispose ~17 rows at once

1. **The gate mesh is gone.** `package.json` has **zero** `proof:*` entries (`grep -c '"proof:' package.json` → 0);
   `ls scripts/` → **10 files**, none of them a `proof-*.mjs`. The deletions are on record at
   `1c2cda3a` and `d17153ec` (cited at `ROUND-1-FINDINGS.md:769`), under the standing
   gates-abrogation mandate. **Every BG wave whose whole body was its `proof:*` gate is
   MOOT-GATE** — the wave cannot land, and its *substance* (if any) routes to a BK row.
2. **The graph-v3 arc FALLS.** APOTHEOSIS cluster C, `FALLS ENTIRE`; cure §1 executed on disk at
   **`d2f202bc`** (`revert(BK): kill the graph-v3 instrument arc + un-serialize the suite`).
   Verified at HEAD: `tests/architecture/` **absent** · `scripts/build-import-dag-v3.mjs` **absent** ·
   `IMPORT-DAG-V3.json` **absent** · `tests/gates/boot-graph.test.ts` present at 406 lines.
   **Consequence for this row:** BG's `G1 dag-paint-keystone` arc (`FINAL.md:656`) is a *different*
   dag from the codex graph-v3 instrument and is **not** revived by it. All graph questions return
   to **BK #21 `W-DAG-REDUCE`** at Φ5, per cure §1's own words.

---

## 2 · The 119-name walk

Codes — **LANDED** (the named subtraction/addition is verified at HEAD) · **LANDED-OTHER** (verified
at HEAD, but under another name/SHA/tranche) · **MOOT-GATE** (body was a `proof:*` gate; §1.1) ·
**LIVE** (open at HEAD, routed) · **RETIRE** (struck with the falsifier stated).

### WS1 · Shell · Routing · Field (7)

| name | disp | evidence at `aee47957` | route |
|---|---|---|---|
| `W-ROUTE-TRANSITION` | LIVE | `startViewTransition` 25 hits in `src`+`demo`; `route-enter` **0 hits** — the bare keyed atomic swap never landed | #29 `W-ROUTE-MOTION` |
| `W-FIELD-AURORA` | LANDED (residue) | one shell `<Aurora>` at `demo/shell/AppShell.vue`; `.paper-field` plane DELETED (`src/styles/paper.css:156-173` records the deletion) — **residue: `[data-paper-field]` still selected at `src/styles/typography/utilities.css:152,162`** | residue → #61 `W-DOC-TRUTH` / #59 |
| `W-SCROLL-PROGRESS-RAIL` | LANDED-OTHER | shipped as `src/components/scroll-progress-rim/` | #88 (carries #74) |
| `W-FIELD-ACCENT-RECONCILE` | LIVE | the fold never happened — **both** `demo/chassis/hero/warm-field.ts` and `demo/chassis/hero/aurora-hero.ts` exist and both carry `warmProjectHue`/`SECTION_COLOR_OKLCH` | #49 `GF-AURORA` |
| `W-PAPER-GRAIN-OPTIN` | LIVE | `src/components/paper-backdrop/PaperBackdrop.vue` exists; the per-surface opt-in demotion is not decidable doc-side | #22 ∥ #59 |
| `W-HERO-FIT` | LIVE | demo hero chassis present; acceptance was a 4-viewport both-mode π — not decidable doc-side | #59 `W-LAYOUT` |
| `W-VT-ROUTE-ENHANCE` | RETIRE | BG's own text marks it DEFERRED/OPTIONAL and purely additive; `src/composables/motion/core/useViewTransition.ts` exists, and the typed route grammar is #29's | falsifier: BG DEFERRED/OPTIONAL + #29 supersession |

### WS3 · Glass standardization (11)

| name | disp | evidence | route |
|---|---|---|---|
| `W-CARTOON-INK-GAMUT` | LANDED (gate MOOT) | `--cartoon-ink` 37 hits, token pinned; the `proof:no-gray` witness is abrogated | #31 (contrast, computed) |
| `W-DOCK-CAST-RETIRE` | LANDED-partial | dock half done — `src/components/dock/styles/shape.css:178` records the `.cartoon-cast` child GONE from the dock; **the global class survives with live rules** (`glass/glass-atom.css:32,84`; `glass/liquid-enter.css:163-222`) | #22 ∥ #87 |
| `W-GLASS-CLIP-DISCIPLINE` | LANDED-partial | `contain: paint` 4 hits (narrowed as specified); the Safari-26 Job-B sign-off is a π, unowned here | #22 |
| `W-SAFARI-BLUR-LITERAL` | LANDED-OTHER | 9 `-webkit-backdrop-filter` legs at HEAD; the paired-legs assertion is **BK #5's** cure §4 gate arm (`G-GLASS-HAS-FROST` arm b) | #5 |
| `W-GLASS-BLUR-PEER` | LANDED | `--glass-blur-resting` 26 hits; `--glass-blur-dock` chain retired at **`20f2eabe`** — its 6 remaining hits are **all prose comments** (`bridges.css:334`, `tokens/glass.css:161,193,220`, `dark-arm-glass.css:35`, `dock/styles/shell.css:26`), zero declarations | prose → #17 `W-COMMENT-DIET` |
| `W-GLASS-TINT-UNIFY` | LIVE | never landed: `--glass-tint-bias-*` **0 hits**; `--glass-fill-tint` still **26 hits** (the fold is undone) | #86 ∥ #22 (see §3.3) |
| `W-GLASS-IDIOM-FACTOR` | LIVE | `--glass-plate-tinted` 15 hits — not "declared ONCE" | #86 |
| `W-GLASS-CONSUMER-BAND` | LIVE | the fill-tint consumer band is the same 26 hits | #43 `W-CHIP` ∥ #87 |
| `W-DOCK-LEGIBILITY-RECAL` | MOOT-GATE | body = `proof:no-gray` dock witnesses | #31 `G-CONTRAST-COMPUTED` |
| `W-GLASS-DYNAMICS` | RETIRE | subject deleted: `glass-lens` **0 hits**, `glass-refract.css` absent — BK #2 `W-REFRACT-DELETE` at `82bdc93e`, specs retired at ⊕¹⁶(2) | falsifier: #2's subtraction |
| `W-DEMO-STYLE-REHOME` | LANDED-partial | `liquid-morph.css` (850L) **absent everywhere**; but `liquid-enter.css` still lives at `src/styles/glass/liquid-enter.css`, not `demo/` | #62 `W-COLOCATION` |

### WS2 · Dock convergence (11)

| name | disp | evidence | route |
|---|---|---|---|
| `W-DOCK-MORPH-UNIFY` | LANDED-partial | `src/components/dock/composables/useDockSpring.ts` exists; **`new SpringProgress` in `src/components/dock` = 4**, spec demanded exactly 1 | #26 ∥ #47 |
| `W-DOCK-BUSY-SINGLE` | LIVE | `useDockMorphWindow` still referenced at `src/components/dock/GlassDock.vue` — the 4→1 busy collapse did not land | #47 |
| `W-DOCK-CUT` | LANDED | `useDockContextSilhouette` **0 hits** | — |
| `W-DOCK-DECOMPOSE` | LANDED | `GlassDock.vue` **462 lines** (from 711; under the 500 floor) | — |
| `W-DOCK-FISSION-WIRE` | LIVE | `GooFilter` **0 hits** — the DRY goo bridge never landed; the fission DECIDE is unmade | #48 `W-DOCK-FISSION` |
| `W-DOCK-PERSISTENT-CUT` | LIVE | demo-shell surface, not decidable doc-side | #47 |
| `W-DOCK-CAP-SCROLLS` | LANDED-OTHER | `src/components/fading-scroll/` + `useFadingScroll` at HEAD (BG's own D12 row marks it ✅ at `FINAL.md:227`) | — |
| `W-DOCK-OVERFLOW-FADE` | LANDED | same `useFadingScroll` seam | — |
| `W-SHELL-DOCK-DRY` | LIVE | two-shell-docks collapse is a demo-shell act | #47 |
| `W-DOCK-INPLACE-MORPH` | LIVE | `DockCrossfade.vue` + `useDockMorph.ts` exist, but the in-place V↔H flip **is** #47's headline and is unstarted | #47 |
| `W-DOCK-STORY-MODULARIZE` | RETIRE | BG marks it DEFERRABLE; the story chassis is #58's | falsifier: BG DEFERRABLE + #58 |

### WS5 · Viz refinement (9 active + 2 booked)

| name | disp | evidence | route |
|---|---|---|---|
| `W-VIZ-INTRINSIC-SIZE` | LANDED-OTHER | the canvas-resize class was cured in the BD substrate pass (9 vizzes) | — |
| `W-VIZ-SIZER-ADOPT-HARD` | LANDED-OTHER (gate MOOT) | shared sizer adopted in the same BD pass; `proof:viz-resize-upload-only` abrogated | — |
| `W-VIZ-DEMIGRATE` | LANDED | `src/components/fourier-field/composables/fourierFieldGLSetup.ts` (GL, not WebGPU); `src/components/constellation/` is plain TS | — |
| `W-VIZ-REVEAL-BLOOM` | LIVE | `useVizChoreography` **0 hits** (DEFINITION-ABSENT as BG required), but the reveal-bloom itself never shipped | #27 `W-ENGAGE-LADDER` |
| `W-VIZ-PREVIEW-LIVE` | LIVE | **falsified on its face at HEAD**: the landing preview path is `demo/chassis/landing/vizPreviewStill.ts` — stills, not the 11 distinct live previews | #58 (the 4-vs-124 live-tile band) |
| `W-DOTFLOW-REBUILD` | RETIRE | subject absent: no dot-flow component under `src/components/` at HEAD | falsifier: 0 files; RATIFICATION §1.3 Q051-r15 |
| `W-VIZ-SUBSTRATE-DELETE` | LANDED | no concentric, no paper-grid component at HEAD; `flow.wgsl.ts` lives as an owned WebGL shader, not an orphan | — |
| `W-GOODOT-SETUP-SPLIT` | RETIRE | subject absent: no goo-dot component at HEAD | falsifier: 0 files |
| `W-BLOB-KINEMATICS-LEAF` | LIVE | `useBlobSatellites` still referenced from `src/components/blob/index.ts`+`constants.ts`; the kinematics leaf carve is unmade | #50 `GF-BLOB` W0 |
| `W-VIZ-SUBSTRATE-DELETE2` *(U-05 B5)* | MOOT | its three subjects (goo-blob, dot-matrix, goo-dot) are **absent at HEAD**; the only WGPU residue is blob's | #50 `GF-BLOB` W0 GL-excise |
| `createFragmentGLPass` *(U-05 B6)* | RETIRE-UNTRIGGERED | its trigger was ≥3 consumers; **0 hits at HEAD**. The GL/2D factory question is now #54's one-seam ruling | #54 `DUAL-ENGINE BAND` |

### WS6 · Siri capabilities (4)

`siri` appears **7 times total** in `src` (dock `index.ts`, `composables/index.ts`, `styles/index.css`);
`--siri-island-t` has **0 hits** in `src`+`demo`. The band is essentially unbuilt.

| name | disp | evidence | route |
|---|---|---|---|
| `W-GLASS-BLUR-ENGAGE` | LIVE | the `--siri-island-t`-coupled descend scrim has no token at HEAD | #22 `W-FROST` |
| `W-SIRI-ISLAND` | LIVE | naming survives in the dock barrel only | #47 |
| `W-SIRI-WAVEFORM` | LIVE (OWNER-GATED) | no waveform component; its design input is the **R-7 footage ×3** owner gate | #67 (owner gate) |
| `W-SIRI-DOCK-INTEGRATION` | LANDED-partial | `useDockSearch.ts` is the ONE pipeline as specified; island integration unbuilt | #47 |

### WS4 · Components · Demo · Encapsulation (24 named)

| name | disp | evidence | route |
|---|---|---|---|
| `W-SCROLL-SHRINK-UNIFY` | LIVE | born-RED 0 sites — the page-chrome shrink is #73's | #73 |
| `W-SHEET-INSET-ROOT` | LANDED-partial | `src/components/dialog/sheet-motion.ts` + `src/components/drawer/` at HEAD; detents are #39's | #38/#39 |
| `W-SPECIMEN-PER-STORY` | LIVE | `StorySpecimen` **0 hits**; the landing uses `storyTile.ts` + stills | #58 |
| `W-BENTO-FRONTDOOR-UNFORK` | LIVE | same chassis question | #58 |
| `W-DEAD-COMPOSABLE-CUT` | LANDED | `useLiquidMorph` 0 · `useVizChoreography` 0 · `useDockContextSilhouette` 0 · `morph-field.css` absent · `useMorphField` folded into `src/components/_shared/useMotionAxis.ts`. Cut at **`79f4641c`** | see §3.1 (it also took the jubilance pair) |
| `W-FLIP-ONE` | LIVE | `useFlip` **0 hits**; FLIP is minted inside #41 | #41 ∥ #26 |
| `W-PRESS-MOUNT-RECONCILE` | LIVE | one-runner enter unmade | #26/#27 |
| `W-SPRING-REGISTER-TIDY` | LIVE | the ONE spring authority + six ruled names is #26's whole body | #26 |
| `W-SCROLL-READER-UNIFY` | LIVE | both `src/composables/motion/scroll/scrollReader.ts` and `useScrollProgress.ts` exist — unfolded | #73 ∥ #59 |
| `W-LIQUID-ENTRANCE-GENERAL` | LANDED-partial | `src/styles/glass/liquid-enter.css` exists with live rules; the named-surface wiring is the engage ladder's | #27 |
| `W-COLOCATION-GATE-STRUCTURAL` | MOOT-GATE | body = the structural colocation gate | #62 |
| `W-CANVAS-LIFECYCLE-LEAVES` | LANDED | `createCanvasLifecycle.ts` **475L** (from 695) · `useWebGPUCanvas.ts` **520L** (from 606) | residue (>500) → #62's 8-file carve |
| `W-AMBIENT-HISTOGRAM-LEAF` | LANDED-partial | `useGlassBackdropLuminance.ts` **433L** (from 542). **Superseding fact:** ⊕¹⁶(3) — the ambient specular channel (`--glass-ambient-hue`/`-strength`) has ZERO CSS paint consumers after `cfc4dffa`; its ~20-line deletion is routed to #22 ∥ #68 | #22 ∥ #68 |
| `W-TABS-KEYBOARD-LEAF` | LANDED-partial | `SegmentedTabs.vue` **458L** (from 512); the roving-focus/responsive leaves are not separate files | #32 |
| `W-GOO-BARBELL-CSS` | LANDED | `goo-barbell.css` absent at HEAD; carousel≡pager goo is #40's | #40 |
| `W-TIMELINE-ENCAPSULATE` | LANDED-OTHER | `src/components/timeline/` colocated in the BI restructure; **no `styles/timeline.css`** at HEAD | #46 `GF-TIMELINE` |
| `W-SFC-CSS-PARTIAL-SWEEP` | LANDED-OTHER | absorbed by the BI style-fold pipeline (`vite.style-fold.ts` at HEAD) | #62 |
| `W-UNIFORM-LAYOUT-BUILDER` | LIVE | std140-packing copies persist with the WebGPU path | #54 |
| `W-CHIP-ALIAS-KILL` | LANDED | `selectableChipVariants` **0 hits**; `src/components/chip/chipVariants.ts` is the single name | — |
| `W-DEAD-TOKEN-SWEEP` | LANDED | `--corner-shape-card` 3 hits, **all prose recording the sweep** (`squircle.css:17,20`, `theme/radius.css:182`) | prose → #17 |
| `W-DEMO-CHASSIS-CONSOLIDATE` | LANDED | `DemoFrame` 0 · `StorySectionHeader` 0 · `ShowcaseFrame` present in `demo/chassis/` | #56 owns the `surface="opaque"` truth |
| `W-MANIFEST-COLOCATE` | LIVE | the string-keyed map fold is the story-taxonomy question | #58 ∥ #62 |
| `W-DESHADCN-SWEEP` | LIVE | shadcn residue live: `0.625rem` **17 hits**; `shadcn` named in `styles/glass/control-surfaces.css`, `styles/theme/bridges.css`, `styles/tokens/dark-arm.css` | #23 (root literal) ∥ #64 |
| `W-12-LAWS-UNIVERSAL` | LIVE | the liquid-weight universal edict is carried by the #26/#27 spine, not by a BG law-wave | #26 ∥ #27 |

### WS7 · Quality · Coverage · Close (19)

| name | disp | evidence | route |
|---|---|---|---|
| `W-DEFERRED-LEDGER` | LANDED (gate MOOT) | `docs/tranches/BG/FOLD-LEDGER.md` (178L) + `FOLD-LEDGER.json` on disk; corpus **135**, dispositions RETIRE 23 · MET 12 · COORDINATED 74 · DEFER-with-trigger 23 · SUPERSEDED 3 (`FOLD-LEDGER.md:11-12`) | cited, not re-derived (§6) |
| `W-BE-BF-LEDGER` | LANDED | `docs/tranches/BG/BE-BF-LEDGER.md` (218L): **70 rows = 27 LANDED-no-build · 33 NEVER-BUILT · 10 RETIRE** (`:22`) — the U-05 file-name line, §3.8 | §3.8 |
| `W-DISPOSITION-RESTAMP` | LANDED | the 31 BC→BG dispositions are re-stamped in that ledger set | — |
| `W-SPIKE-DELETE` | LANDED | `useLiquidMorph` 0 · `useMorphField` rehomed · `selectableChipVariants` 0 · `liquid-morph.css` absent | — |
| `W-JUBILANCE-DECIDE` | RETIRE-6 + 1 DECIDE | **see §3.1** — `useHaptic` 0 hits, `useCelebrationBurst` 0 hits, both taken by `79f4641c` | §3.1 → #28 |
| `W-DEAD-GATE-SWEEP` | MOOT-GATE | the whole gate mesh is deleted (§1.1) | #65 `W-GATE-COLLAPSE` |
| `W-PAINT-IS-THE-GATE` | MOOT-GATE | `proof:ba-gestalt` gone with the mesh | #10 π-SUITE |
| `W-GESTALT-ROSTER-RE-POINT` | MOOT-GATE | same mesh | #10 |
| `W-SHIP-DISCIPLINE-LIVE-PRECONDITION` | MOOT-GATE | `proof:ship-attestation` gone | #66 CLOSE |
| `W-GATE-ROUTING-LIVE` | MOOT-GATE | `proof:route-navigates` gone | #10 |
| `W-GATE-FIELD-AURORA` | MOOT-GATE | `proof:field-aurora` gone | #49 |
| `W-GATE-PREVIEWS-RENDER` | MOOT-GATE | gone | #58 |
| `W-GATE-UNIFORM-BLUR` | MOOT-GATE | gone | #22 |
| `W-SAFARI-PARITY-GATE` | MOOT-GATE | gone; the real-Safari cells need owner `safaridriver` enablement | #10 (owner gate) |
| `W-CONSTRAINT-MANIFEST` | LANDED (gate MOOT) | `docs/tranches/BG/CONSTRAINTS.md` on disk | — |
| `W-DATE-CALENDAR` | RETIRE | **§3.2** — zero calendar/date-picker files at HEAD; fails the ≥2-consumer bar | §3.2 |
| `W-CHART-FAMILY` | RETIRE | **§3.2** — zero chart files at HEAD; same bar | §3.2 |
| `W-DS-COMPLETE` *(U-05 B3)* | RETIRE-UNBUILT | **§3.7** — no design-system-completeness artifact at HEAD; `/DESIGN.md` is #78's canon LAND | #78 |
| `W-CUT` | LANDED-SUPERSEDED | BG cut as 5.0.0; HEAD is **7.0.0**; the next cut is #66's 8.0.0 | #66 |

### WS8 · Glass-deep (5)

| name | disp | evidence | route |
|---|---|---|---|
| `W-GLASS-SUFFUSE-UNIVERSAL` | LIVE | `useSpecularPointer` **0 hits** — the atomic fold never landed; the bevel floor is #22's material apex | #22 |
| `W-GLASS-REFRACT-WEBGL` | RETIRE | subject deleted by BK #2 (`82bdc93e`); no `*refract*` file in `src` at HEAD | falsifier: #2 |
| `W-GLASS-BACKDROP-SAMPLE` *(U-05 B4)* | RETIRE-UNBUILT | `createRenderTarget` **absent**, `sampleBG` **0 hits** — the "keystone" was never built. The transmission question it was to answer is now **`G-FROST-TRANSMISSION`** (#22, F-2) | #22 |
| `W-GLASS-SOTA-LADDER` | LANDED | the retire matrix is complete **by subtraction**: `detectTier` 0 · `glass-lens` 0 · `glass-refract.css` absent (#2 + ⊕¹⁶(2)) | — |
| `W-GLASS-LIQUID-TRANSITION` | RETIRE | its subject (the refraction magnitude) is deleted; the press-swell survives as an engage-ladder affordance | #27 |

### WS9 · Paper-deep (5)

| name | disp | evidence | route |
|---|---|---|---|
| `W-PAPER-GRAIN-REAL` | LIVE | `feTurbulence` **22 hits** vs `feDiffuseLighting` **3** — the speckle still dominates the lit tooth | #22 ∥ #68 |
| `W-PAPER-SUFFUSE` | **LANDED INVERTED** | the wave ordered *DELETE* `--paper-clean-texture` and *KEEP* `--paper-aged-texture`. At HEAD: **clean = 7 hits with 4 real consumers** (`glass/grain-overlay.css:38`, `music-staff/styles.css:26`, `dock/styles/dock.css:148`, `tokens/scale-paper.css:117`) and **aged = 0 hits**. Exactly backwards, and `aged` was the **atlas contract** | #22 (material) ∥ #76 (atlas contract) |
| `W-HANDMARK-PERFECT` | LIVE | `src/components/handmark/` exists (`HandMark.vue`, `useHandMark.ts`, `geometry.ts`, `brush.ts`); perfection is the greenfield's | #51 `GF-HANDMARK` |
| `W-PENCIL-BOIL-DEEPEN` | LIVE | `brush.ts` at HEAD; pencil-boil is a sibling repo, held pending its own audit (⊕¹²) | #51 ∥ #76 |
| `W-PAPER-CROSSREPO-ASKS` | LANDED-partial | `--glass-key-direction` **7 hits** (the GU-1 key spine landed); the by-name cross-repo contracts are the consumer band's | #76 |

### WS10 · De-shadcn / Tailwind v4 (5)

Tailwind-v4 idiom is **LANDED** at HEAD (`@theme` 39 · `@utility` 64, no `theme()` fn-syntax
question outstanding). The de-shadcn residue is **LIVE** (`0.625rem` ×17 + three named style files).
All five gates are **MOOT-GATE**.

| name | disp | route |
|---|---|---|
| `W-DESHADCN-CENSUS` | LIVE | #64 (the eight-family shadcn-abrogation ledger) |
| `W-DESHADCN-TOKEN-REPLACE` | LIVE | #64 ∥ #68 |
| `W-TAILWIND4-IDIOM` | LANDED | — |
| `W-DESHADCN-MATERIAL` | LIVE | #81 `W-PICKER` (grouped-inset Select) ∥ #83 (Switch material) |
| `W-DESHADCN-GATE` | MOOT-GATE | #65 |

### WS11 · Storybook facility (4)

| name | disp | evidence | route |
|---|---|---|---|
| `W-SCROLL-PROGRESS-GLASSY` | LANDED-OTHER | `src/components/scroll-progress-rim/` (`ScrollProgressRim.vue` + `styles.css`) | #88 ∥ #74 |
| `W-SECTION-TYPEWRITER-FADEUP` | LANDED-partial | `src/components/typewriter/` at HEAD; the section-entrance cascade is an engage affordance | #27 |
| `W-STORY-PAGE-API` | LANDED | `demo/chassis/page/StoryPage.vue` at HEAD | taxonomy residue → #58 |
| `W-STORYBOOK-SUFFUSE` | LIVE | the per-category chrome-chroma lift is the preview-card band's | #58 ∥ #59 |

### WS12 · Coherence · Congruence (6)

| name | disp | evidence | route |
|---|---|---|---|
| `W-COHERENCE-CENSUS` | RETIRE-SUPERSEDED | its audit-of-record role is discharged by the BJ `RECONCILIATION.md` + this row | falsifier: BJ supersession |
| `W-COHERENCE-GATE` | MOOT-GATE | `hue-at-l.mjs`/`proof-coherence-census.mjs` gone with the mesh | #65 |
| `W-DESIGN-LANGUAGE-UNIFY` | RETIRE | BG itself records the measurement as **NULL → DROPPED by KISS** (`FINAL.md` WS12) | falsifier: BG's own null |
| `W-ANIMATION-CONGRUENCE` | LIVE | the ONE-clock lock is #26's clock-fence arm | #26 |
| `W-GLASS-PAPER-CONGRUENCE` | LIVE | `--glass-key-*` spine present (7 hits) but the Regular/Clear tier map is unmade | #22 |
| `W-PAGE-COMPONENT-AUDIT` | LIVE | the 480-capture dual-engine verdict is a π, and π is #10's | #10 |

### Late-minted names (8, from `FINAL.md` §10/§13 amendments)

| name | disp | evidence | route |
|---|---|---|---|
| `W-CLOSEFIX-9SITE` (G4, "lands FIRST") | LANDED-partial | the `--glass-blur-dock` FULL RETIREMENT landed (`20f2eabe`, prose-only residue); the `ladder.css`/`shell.css` <500 carves rode the same commit message | prose → #17 |
| `W-CLOSE-SWEEP` (G3) | MOOT-GATE | body = `proof:close-sweep` born-RED | #65 |
| `W-GESTALT-CURSOR-PARITY` (G2 keystone) | MOOT-GATE | body = the `ba-gestalt` cursor↔roster gate | #10 |
| `W-EYEBROW-LIGHT-POLISH` (G6) | LIVE | eyebrow styling lives at `src/styles/typography/utilities.css`; the ≥4.5 light lift is a computed-contrast claim | #31 `G-CONTRAST-COMPUTED` |
| `W-CONSTELLATION-PARALLAX-OFF` (D-1) | LANDED | `src/components/constellation/constants.ts:118` → `export const DEFAULT_PARALLAX = 0;` — exactly the `07c6e6ec` clean break | — |
| `W-PAPER-GRAIN-WARM-SUBSTRATE` (D-2) | LIVE — **recorded, not fixed** | commit `e40e5095` exists and is **demo-local**; the library-side warm substrate is unproven and `RECONCILIATION.md:358` lists D-2 as needing a browser seat | §3.4 → #22 ∥ #10 |
| `W-DOCK-COLLAPSE-DIR` (D-3) | LIVE — **recorded, not fixed** | commit `8947288a` exists; `RECONCILIATION.md:358` lists D-3 unswept | §3.4 → #47 ∥ #10 |
| `W-DOCK-BLUR-RETIRE-CARVE` (the frozen frontier) | LANDED | **§3.10** — the record-correction: the *cursor* froze at 0.7, the 0.7 *content* landed at `20f2eabe` | §3.10 |

---

## 3 · The absorb list — `RECONCILIATION.md:340` as extended by U-05

### 3.1 · Jubilance — 6 RETIRE + 1 DECIDE + 1 route (§8 item 9, first clause)

`RECONCILIATION.md:78` routes **7 of the 135 fold-ledger rows** to `BG.W-JUBILANCE-DECIDE`:
D9 · D21 · D31 · D13 · `BE.W-CELEBRATE-BURST` · `BF.W-JUBILANCE-WIRE` · `BE.W-HAPTIC-COUPLE`.
The disposition, executed here:

- **Six RETIRE-with-rationale**, ratifying falsifier **`MOTION-CANON.md:84`** (the `bouncy` row):
  9.5 % overshoot is above the entire measured corpus, whose ceiling is 4.7 %; the exemplar's rule
  is *"the liveliness budget is spent on the LIGHT that follows, never on a geometry bounce."*
  The six are the geometry-half rows — D9, D13, D21, D31, `BE.W-CELEBRATE-BURST`,
  `BF.W-JUBILANCE-WIRE`. Their riders go where MOTION-CANON sends them: completion-seal geometry →
  `panel`, the ceremony → the light channel (`engageEnvelopes`).
- **One DECIDE line, `BE.W-HAPTIC-COUPLE`** — it is **not** retired by MOTION-CANON:84, which rules
  only the geometry half. It is a *live, unowned* ask. **Disposition: DECIDE at #27
  `W-ENGAGE-LADDER+AFFORD`** — haptic coupling is an engagement rung or it is nothing; the wave
  either wires it to a real affordance or retires it with a stated falsifier of its own. It may not
  be closed silently a second time.
- **Ripple/splash → #28 `W-FEEDBACK-MOTION`** (TERMINAL-ROSTER `:162`; `TERMINAL-ROSTER.arm-fable.md:113`).
- **The erasure, stated:** both composables died at **`79f4641c`** — `BG WS4
  (BG.W-DEAD-COMPOSABLE-CUT): dead-cut owned ONCE — useHaptic/useCelebrationBurst/useVizChoreography…`
  — i.e. **inside a different wave**, whose rationale never references the owner ask, and it took
  `useCelebrationBurst` which `BG.W-JUBILANCE-DECIDE` had explicitly ruled **KEEP at 2 consumers**.
  Verified at HEAD: `useHaptic` 0 hits, `useCelebrationBurst` 0 hits.

### 3.2 · `W-DATE-CALENDAR` / `W-CHART-FAMILY` — two RETIRE lines

Both **RETIRE under the ≥2-consumer bar**. Evidence at HEAD: `find src -iname '*calendar*' -o
-iname '*date-picker*'` → **0**; `find src -iname '*chart*'` → **0**. Neither was ever built,
neither has a consumer of any kind, and the overfitting-audit bar (≥2 sites or exported or a
private demo helper) is unmeetable by a component that does not exist. Owner-revivable in a later
tranche only; no BK row inherits either.

### 3.3 · `--glass-fill-tint` — one ruling sentence

**LIVE residue, not a sanctioned axis.** At HEAD `--glass-fill-tint` has **26 hits** while its
intended replacement `--glass-tint-bias-*` has **0** — the token is the *un-folded remnant* of
`BG.W-GLASS-TINT-UNIFY`, not a designed per-instance hue axis, and it is a second chromatic writer
against the ≤2-pair rule. **Ruled: residue. It folds onto the plate/rim pair at #86
`W-SURFACE-MATERIAL` (the joint C-1 cut with #88), with the material law authored at #22.**

### 3.4 · D-2 / D-3 — recorded, not fixed

Both commits exist (`e40e5095`, `8947288a`) and both defects remain **unswept** by
`RECONCILIATION.md:358`'s own list. D-2's fix is **demo-local** by its own commit subject, so the
library-side gray/metallic paper wash is unproven at HEAD. **Neither may be cited as closed.**
D-2 → #22 (material) with the π at #10; D-3 → #47 (`GF-DOCK`) with the π at #10. This is the exact
"resurfaces as new a third time" class §2 row 17 warns about — the record now names them open.

### 3.5 · `<Concentric>` — one RETIRE line beside ASK-23

**RETIRE.** `find src -iname '*concentric*'` → **0 files** at HEAD; `RECONCILIATION.md:310` already
records it as the *one exception* to BB's otherwise-landed technical content. The subject is gone,
the WGPU substrate that hosted it is gone (`W-VIZ-SUBSTRATE-DELETE`, LANDED), and no BK row claims
it. Struck with that falsifier, beside ASK-23; owner-revivable only.

### 3.6 · The three JSDoc phantom-viz lines

**Class disposition:** JSDoc/prose references to viz that no longer exist are the same defect as the
`--glass-blur-dock` and `--corner-shape-card` prose residues found in §2 — a doc-rot class, not a
build class. **All prose-only residue found by this walk routes to #17 `W-COMMENT-DIET` (one
comment counter + named detector) and #61 `W-DOC-TRUTH`.** This row does not edit `src/` comments;
it hands #17 a named starting set: the 6 `--glass-blur-dock` comments, the 3 `--corner-shape-card`
comments, the `.paper-field` deletion prose at `paper.css:156-173`, and the phantom-viz JSDoc.

### 3.7 · U-05's four named lines *(B3-B6)*

Each is answered in place in §2 and restated here as the four lines U-05 demanded:

- **B3 `W-DS-COMPLETE`** — **RETIRE-UNBUILT.** Band-4 census BUILD, never built, no artifact at
  HEAD; its content is superseded by **#78 `W-DESIGN-CANON`** (spec sealed, canon bytes committed at
  `e277ea42`, LAND-not-AUTHOR).
- **B4 `W-GLASS-BACKDROP-SAMPLE`** — **RETIRE-UNBUILT.** The WS8 "keystone": `createRenderTarget`
  absent, `sampleBG` 0 hits. The transmission law it was to establish is now
  `G-FROST-TRANSMISSION` at **#22**, which closes on nothing else.
- **B5 `W-VIZ-SUBSTRATE-DELETE2`** — **MOOT.** Its three subjects are absent at HEAD; the surviving
  WGPU residue is blob's alone and is **#50 `GF-BLOB` W0's GL-excise**.
- **B6 `createFragmentGLPass`** — **RETIRE-UNTRIGGERED.** Trigger was ≥3 consumers; 0 hits. The
  one-seam GL/2D question is **#54 `DUAL-ENGINE BAND`**'s, with its specified fallback and DPR law.

### 3.8 · U-05's file-name line — `BE-BF-LEDGER.md`

**`docs/tranches/BG/BE-BF-LEDGER.md` is IN SCOPE and is LANDED as a doc artifact.** 218 lines;
corpus derived from disk (`readdir docs/tranches/{BE,BF}/waves`); **70 rows = 39 BE + 31 BF**;
tally at `:22` — **27 LANDED-no-build · 33 NEVER-BUILT-names-a-wave · 10 RETIRE**. Row #12 **cites**
it and does not copy it: it is the one source of record for BE/BF parity, and #16
`W-ORPHAN-ROWS` (`G-ROW-HOMED`) reads it there for the BE/BF carries. The 33 NEVER-BUILT rows are
**not** re-opened by this row — each already names a wave or a RETIRE in that file.

### 3.9 · U-05's MOOT-BY-ABROGATION line — the 3 WS7 DROP-WITH-TRIGGER units

`FINAL.md` §6's DROP-WITH-TRIGGER register lists five; **three are adjudicated MOOT here**, and the
adjudication is one line because the trigger can no longer fire:

- **C-PAINT forgery-beyond-re-stamp** (re-enable at capture-signing/OIDC) — **MOOT-BY-ABROGATION.**
  Its host gate mesh is deleted (§1.1) and capture-signing has no owner in BK; the honest successor
  is #10's π protocol (P0 mode-assert · σ≈50 · corner-crop · build freshness), which secures
  captures by protocol rather than by signature.
- **`authoredBy ≠ runnerIdentity`** (re-enable Phase-2 OIDC) — **MOOT-BY-ABROGATION**, same mesh.
  Its *substance* survives as standing process law, not as a gate: APOTHEOSIS §"Standing process law"
  — *"no full-history fork grades its own author"*, *"no seat prompt pre-states the verdict"*.
  That law is enforced by the Challenge Law's two-pass structure, which is #11's charter.
- **Safari PAINT certification (safaridriver-or-DROP)** — **MOOT-BY-ABROGATION as a gate; LIVE as an
  owner gate.** It is not a drop: real-Safari cells are named on **#10** and blocked only on owner
  `safaridriver` enablement (playwright-webkit ≠ Safari — both cells must be banked separately).

The remaining two register entries (Safari ≤18 `var()`-bake; Safari backdrop-refraction lens) are
**not** moot-by-abrogation: the first landed as the WS3 literal-bake (`W-SAFARI-BLUR-LITERAL`,
LANDED-OTHER at #5); the second is **RETIRE** with its subject, deleted by BK #2.

### 3.10 · U-05's two R7 record-corrections

**Correction 1 — the fourier phantom-classes.** `PROOF-SWEEP.md:341` records the BA seat's grep of
`fourier-analysis/web/src` returning **0 hits** for the phantom classes, which **falsifies
`BI/TAIL-EXCAVATION.md` §1 row 6**. Carried here as a BG-adjacent record correction: the claim is
struck, and no BK row inherits a fourier phantom-class remediation. `#53 GF-FOURIER` builds the
fourier greenfield on its own ground, not on that claim. *(Sibling-repo grep, not re-run by this
doc-side row; cited to its seat of record.)*

**Correction 2 — "BG froze at frontier 0.7".** `RECONCILIATION.md:77` states BG's *"own cursor froze
at frontier `0.7 BG.W-DOCK-BLUR-RETIRE-CARVE`"*, which reads as *the work stopped there*. **That
reading is falsified by `20f2eabe`** — `BG WS3 (0.7): retire --glass-blur-dock chain; carve
ladder/shell <500 — gate proof:glass-cal GREEN` — the 0.7 frontier's content **landed**, and this
walk confirms it at HEAD (the `--glass-blur-dock` chain survives only as 6 prose comments; zero
declarations). **The corrected statement of record: BG's *cursor* froze at frontier 0.7; BG's *work*
did not stop there.** The genuine BG failure is the one this row exists to cure — **no FINAL, no
close record** — not an early halt. `FINAL.md` self-describes as *"the develop-ready plan, NOT an
implementation"*, and BG's own 34-row ledger against 119 waves is a *ledger* gap, not a build gap:
this walk finds **34 names LANDED or LANDED-OTHER at HEAD** that no BG close record ever claimed.

---

## 4 · Codex-era record corrections applied to this row's inputs

Per ⊕¹¹–⊕¹⁸, and applied wherever this row's inputs assert otherwise:

1. **Census: 0/87.** No codex-delta seal stands. Anywhere a BG-adjacent record cites a codex seal as
   evidence of landing, this row substitutes a disk probe at `aee47957`. No row above rests on a seal.
2. **Seals VOID on QUALITY grounds** (⊕¹⁴) — zero-tool-call challenge seats, verdicts dictated in
   scribe prompts, receipts citing absent artifacts — **not** on seat authority. The "forgery"
   framing is WITHDRAWN; codex ownership was owner-authorized delegation, since revoked (⊕¹⁸).
   This row uses no adjective the evidence does not carry.
3. **The graph-v3 arc FALLS** (APOTHEOSIS cluster C), and its fall is **executed on disk** at
   `d2f202bc` — verified in §1.2. BG's `G1 dag-paint-keystone` is a distinct arc and is **not**
   revived; all graph questions are #21's at Φ5.
4. **`#75` is machine-local evidence only; `#90` is LANDED with residue** — neither is cited here.
5. **The gate mesh is abrogated by owner mandate**, which is why 17 BG rows above are MOOT-GATE
   rather than open. A moot gate is not a passed gate: where a MOOT-GATE row had real substance, the
   substance is routed, never dropped.

---

## 5 · Counts of record

Derived from §2's table, single-pass (this is the only place they are stated; do not copy them
onward — cite this file).

Machine-derived from §2's own table, not hand-tallied:
`awk -F'|' '/^\| `(W-|create)/ {print $3}' BG-CLOSE-RECONCILE.md | sort | uniq -c`.

| disposition | count | the sub-codes it aggregates |
|---|---|---|
| LANDED | **38** | LANDED 20 · LANDED-partial 12 · LANDED (gate MOOT) 3 · LANDED-SUPERSEDED 1 · LANDED (residue) 1 · LANDED-INVERTED 1 |
| LANDED-OTHER | **8** | LANDED-OTHER 7 · LANDED-OTHER (gate MOOT) 1 |
| MOOT | **16** | MOOT-GATE 15 · MOOT 1 |
| LIVE (routed to a named BK row) | **43** | LIVE 40 · LIVE recorded-not-fixed 2 · LIVE (OWNER-GATED) 1 |
| RETIRE (falsifier stated) | **15** | RETIRE 10 · RETIRE-UNBUILT 2 · RETIRE-UNTRIGGERED 1 · RETIRE-SUPERSEDED 1 · RETIRE-6+1-DECIDE 1 |
| **total units walked** | **120** | 119 `BG.W-*` ids + `createFragmentGLPass` |

**Landed-and-never-claimed: 46** (LANDED + LANDED-OTHER) — the size of the accounting loss a BG
FINAL would have prevented, and the answer to `RECONCILIATION.md:77`'s "66 of 119 appear in zero
commits": far more of BG is on disk than its own ledger ever claimed. **Live residue: 43 rows, every
one homed** on a BK roster row; #16 `W-ORPHAN-ROWS` (`G-ROW-HOMED`) verifies that closure over this
file.

**Routing concentration** — every `#NN` appearing in a route/falsifier cell across all 120 rows (a
row may name two): #22×13 · #58×8 · #47×8 · #10×8 · #27×6 · #26×6 · #62×5 · #59×5 · #65×4 · #76×3 ·
#68×3 · #64×3 · #31×3 · #17×3 · #88×2 · #87×2 · #86×2 · #74×2 · #73×2 · #66×2 · #54×2 · #51×2 ·
#50×2 · #49×2 · #29×2 · #2×2 · #5 · #23 · #28 · #32 · #38 · #39 · #40 · #41 · #43 · #46 · #48 ·
#56 · #61 · #67 · #78 · #81 · #83 ×1 each. **#22 `W-FROST` is the single largest inheritor of BG's
unfinished material work** — 13 of 120 — which independently corroborates its seat as the Φ5 spine
head. No row lands on a retired seat (#36, #37) and none lands on #12 itself.

---

## 6 · What this row does NOT claim

- **No π, no paint verdict, no motion verdict.** Every acceptance that was a live capture is routed,
  not asserted. Rows marked LANDED-partial are *shape*-verified only.
- **No `src/` edit, no commit, no cursor flip.** The cursor row for #12 is at
  `docs/tranches/BK/EXECUTION-PROGRESS.md:245` and remains UNSTARTED until the lead flips it; the
  exact cell it should carry: `Φ3 | DONE (doc-side join at aee47957) | TR#12 → RECONCILIATION §8-9 |
  — (120 units walked; ledger at docs/tranches/BK/execution/2026-08-03-row12-bg-close-reconcile/BG-CLOSE-RECONCILE.md)`.
  Shared-file discipline under concurrent lanes: the flip is the lead's act, not this seat's.
- **`docs/tranches/BG/` is untouched by design.** RECONCILIATION §8 item 9 asks for *"the
  `BG/FINAL.md` that never existed"*; `BG/FINAL.md` **does** exist as the develop-ready plan, and
  overwriting another tranche's artifact from a BK execution lane is exactly the record-destruction
  class ⊕¹³ᵃ indicts. **This file IS the BG close record**; the one-line pointer a lead may place at
  the head of `BG/FINAL.md` is: *"BG's close record is
  `docs/tranches/BK/execution/2026-08-03-row12-bg-close-reconcile/BG-CLOSE-RECONCILE.md` (BK row #12)."*
- **The 135-row `FOLD-LEDGER` is cited, not re-derived.** It is machine-locked, doc⟷JSON parity
  asserted, and its own dispositions stand; re-stamping it here would mint the duplicated-derived-data
  defect the convergence-gates ruling forbids. Its 23 DEFER-with-trigger rows are #16's to home.
- **`#9`/`#65` are not quoted.** ⊕¹³ᵃ stands: no code-side gate register may be quoted until
  `scripts/verify-governed-invariants.mjs` is recovered or re-derived and committed. §1.1's figures
  are `package.json` and `ls scripts/` counts — not a register.
