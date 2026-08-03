# BJ REFINEMENT — the finding-family registry

Date: 2026-07-24 · Phase: **tranche development only** · No source edits land from this document.

**⊕ RE-POINT (BK row #14 PHANTOM-REPAIR, 2026-08-03 — the doc-side act TR #14 names).** Every
disposition cell that named `W-A11Y`, `W-DOC-TRUTH`, or `W-PERF` now carries the **real roster row
id** beside the name: `W-A11Y` → **TR #31** · `W-DOC-TRUTH` → **TR #61** · `W-PERF` → **TR #69**
(`docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:181`, `:211`, `:219`). 21 cells
re-pointed, no disposition changed. This closes the ECOUTE §1a "cited as owning waves … none of the
three has a `## W-` heading in `WAVES.md`" gap (`ECOUTE.md:137`): the instrument was WAVES.md-scoped
only — all three waves have band bodies on disk at `docs/tranches/BJ/waves/BAND-A11Y.md` (359 lines),
`BAND-DOC-TRUTH.md` (283), `BAND-PERF.md` (660), which is why TR #31 reads "≡BAND-A11Y five" and #69
"≡BAND-PERF". Record of this repair: `docs/tranches/BK/execution/2026-08-03-row14-phantom-repair/PHANTOM-REPAIR.md`.

This registry refines BJ. It does not open a new tranche. Every family below is grouped by the
UNDERLYING DEFECT MECHANISM, not by wording or by area; two findings that share a mechanism share a
family. Each family carries a terminal disposition and an owning wave in `WAVES.md`.

**Admissibility rule this registry enforces on itself (the cure for BJ's own P-2):** a row is
admissible only if it names a path under `src/`, `tests/`, `demo/`, `scripts/`, or `package.json`
**and** a command whose output demonstrates it, **or** a live browser observation with the exact
element and computed value. A finding whose subject is another document is out of scope. The three
process families (X-1…X-3) are the sole, deliberate exception — they are admitted because the owner's
standing edicts name process parsimony directly, and each still cites measurable repository state.

Evidence sources: the lead's direct measurement at HEAD `0371836d`; twelve independent audit lenses
run without the tranche's success narrative; live Chromium at `localhost:5199`.

**`ROUND-1-FINDINGS.md` is the single source of record for the 136 audited findings** (30 blocker · 72
major · 22 minor · 12 observation). This registry groups them by mechanism and cites them by id. It does
not restate their evidence — duplicated derived data is what made BJ's own convergence gates unable to
terminate (X-1), and this registry will not reproduce the disease it diagnoses.

| family | mechanism | finding ids |
|---|---|---|
| A | the published package is broken | `CT-1`…`CT-7` |
| B | the renderer lies about its capability | `F1` |
| C | the reduction never ran | `M1`, `M2`, `M3` |
| D | shims and dual paths under a no-legacy edict | `F2`…`F12` |
| E | the gate battery cannot do its job | `G-1`…`G-13` |
| F | the story surface is a placeholder | `M4` |
| G | motion promised, not shipped | `M5`, `M7`, `M9` |
| H | the dock | `M6`, `M8` |
| I | material too bright | `M5` |
| K | accessibility | `A11Y-1`…`A11Y-9` |
| L | shipped documentation lies | `DOC-1`…`DOC-14` |
| **M** | **performance** (new — no prior family) | `P1`…`P10` |
| **N** | **the archive's durable lessons** (new) | `ARCH-1`…`ARCH-13`, `TA2-1`…`TA2-9`, `TA3-01`…`TA3-12` |
| X | process | `P-1`…`P-11` |
| Y | BJ's own wave ledger | `BJ-1`…`BJ-11` |

---

## Severity key

**S0** — ships broken to consumers today (7.0.0 is live on npm).
**S1** — the product is visibly wrong to the owner, or a named ask is 0% executed.
**S2** — real defect, bounded blast radius.
**S3** — hygiene; costs future work, costs no user today.

---

## FAMILY A — SHIPPED-BROKEN PACKAGE (S0)

**Mechanism.** The published surface was never exercised the way a consumer exercises it. Every gate
runs *inside* the repo against source; none installs the tarball and imports it as a stranger would.
So defects that live exactly at the package boundary are structurally invisible to the battery.

| id | finding | evidence | disposition |
|---|---|---|---|
| A-1 | Root barrel `@mkbabb/glass-ui` hard-requires a peer it declares **optional**. A README-conformant install yields a main entry that throws. **The peer is `@mkbabb/keyframes.js`, not `value.js`** — see the correction below. | lens CT-1, **re-verified and re-attributed by the lead against the built artifact** | **BUILD** — `W-PKG-TRUTH` |
| A-2 | The entire published **type** surface is empty under `moduleResolution: node16`/`nodenext`. `import { Button }` reports "has no exported member". **Mechanism proven by the lead — see below.** | lens CT-2, reproduced against the built `dist/` | **BUILD** — `W-PKG-TRUTH` |
| A-3 | `@mkbabb/glass-ui/styles` silently overrides a consumer's Tailwind `@theme`: `--spacing`, `--radius*`, `--text-base`, `--container-lg`, `--font-weight*`. | audit lens CT-3 | **BUILD** — `W-PKG-TRUTH` |
| A-4 | `./styles.css` ships components whose paint is structurally undefined — **143 of 172** no-fallback custom properties resolve to nothing. | audit lens CT-4 | **BUILD** — `W-PKG-TRUTH` |
| A-5 | The library's one dynamic-import optionality boundary has no rejection handler; a missing `@mkbabb/value.js` becomes an unhandled promise rejection. | audit lens CT-5 | **BUILD** — `W-PKG-TRUTH` |
| A-6 | README + the root barrel's own API table document two symbols absent from the published surface: `useKeyboardShortcuts`, `Combobox`. | audit lens CT-6 | **BUILD** — `W-DOC-TRUTH` (TR #61) |
| A-7 | 26.6 KB of component CSS ships in the tarball unreachable from any export entry. | audit lens CT-7 | **BUILD** — `W-PKG-TRUTH` |

### A-1 CORRECTED — the right peer, and the library's own quarantine vindicated

The audit named `@mkbabb/value.js` as the hard-required optional peer. **That attribution is wrong**, and
the correction matters because it changes the fix. Walked against the *built* artifact — the only thing a
consumer actually loads — not against the source graph:

```
exports["."] → dist/glass-ui.js            (65 modules walked)
  value.js         → NOT statically reachable from the root entry
  keyframes.js     → STATICALLY REACHABLE:
     glass-ui.js → button-*.js → useLiquidPress-*.js → useSpring-*.js
     useSpring-*.js:3   import { SpringProgress } from "@mkbabb/keyframes.js"
  source: src/composables/motion/spring/useSpring.ts
  package.json: peerDependenciesMeta["@mkbabb/keyframes.js"].optional === true   (range ^6.0.0)
```

**The defect is real and is worse than described**, because the chain runs through `Button` — the
library's most-used component (50 demo consumers) and an unconditional root-barrel export. A conformant
install omitting the optional peer therefore throws on import of *any* root symbol, not merely a
motion symbol.

**And the library's `value.js` discipline actually works.** `composables/color` is deliberately kept off
the root barrel; `ambientHueHistogram.ts` (the one `composables/glass` file that touches value.js) is not
re-exported from that barrel; `useAccentTone` quarantines the math behind a dynamic
`import('./accent-tone-solve')`. The source comments claim a value.js-free root barrel and **the built
graph confirms it.** An audit finding was filed against the one boundary the library defends correctly.

**Lesson for the battery, and it is the whole of family A's mechanism:** this was settled in one command by
walking the *built* entry. Every gate that reasons about the package boundary from `src/` will keep
mis-attributing, in both directions — inventing violations that the bundler drops, and missing real ones
that only appear after tree-shaking. `G-PACK-INSTALL` must run against the tarball or it is theatre.

### A-2 MECHANISM — extensionless relative specifiers in an ESM package

Reproduced in a clean fixture against the built `dist/`, and the resolution split is exact:

```
tsconfig moduleResolution: "bundler"   →  clean. Button resolves.
tsconfig moduleResolution: "node16"    →  error TS2305:
                                          Module '"@mkbabb/glass-ui"' has no exported member 'Button'.
```

Cause: `package.json` declares `"type": "module"`, and `dist/index.d.ts` re-exports with **extensionless
relative specifiers** — `export * from "./components/button"`. The target
`dist/components/button/index.d.ts` does exist, so *classic* and *bundler* resolution find it. `node16` /
`nodenext` require an explicit extension for a relative specifier inside an ESM package, so **every one of
the ~30 `export *` lines fails to resolve and the root type surface resolves to empty.**

**Why nobody noticed:** Vite, webpack and the repo's own `tsconfig` all use bundler-style resolution, under
which the package is perfectly typed. Only a consumer on `node16`/`nodenext` — the modern default for any
Node-targeting TypeScript project — sees an untyped package. The repo cannot observe this defect from
inside itself under any configuration it currently uses.

**The fix** is to emit extensioned specifiers (`./components/button/index.js`) in the declaration output,
and the gate is a fixture that type-checks the packed tarball under `node16` — not under the repo's own
tsconfig, which is precisely the configuration that hides it.

**Why this family is first.** BJ's §7 close definition ends in an 8.0.0 tag-push publish. Publishing
again over A-1/A-2 repeats the 7.0.0 mistake at a higher version.

---

## FAMILY B — THE RENDERER LIES ABOUT ITS OWN CAPABILITY (S1)

**Mechanism.** A primary path silently degrades to a poorer render than its own fallback, and nothing
compares the two. This is the exact inverse of the standing **no-masking-fallback** edict: the mandate
forbids a fallback that hides a dead primary, and here the *primary* hides a richer *fallback*.

| id | finding | evidence | disposition |
|---|---|---|---|
| B-1 | **Aurora's WebGPU primary collapses four named mediums into one.** `src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts:399-401` — `oil(3)`, `vangogh(5)`, `oil-pastel(6)`, `kuwahara(7)` all `return mediumKuwahara(...)`. The file's own comment concedes "the WebGL2 fallback carries the full per-dab stroke cascade". Live-verified: `[data-renderer="webgpu"]` on `/substrates/aurora` in Chromium — the default path is the collapsed one. | lead, live + source | **BUILD** — `W-AURORA-MEDIUM` |
| B-2 | **F08 is therefore misdiagnosed in BJ.** The ledger reads "many presets are duplicative — reduce the set dramatically" and `BAND-REDUCTION`/`GF-AURORA` schedule a *preset cut*. Cutting presets cannot fix identical renders; it deletes the evidence of the bug. Preset count is 17 before and 17 after (audit lens M3) — so nothing was cut either. | lead + audit lens M3 | **RE-ROOT** — F08 re-homes from a preset cut onto `W-AURORA-MEDIUM`; A13's "proper van-Gogh / oil-pastel / crayon" is the same row |
| B-3 | The aurora canvas reports `data-state="initializing"` while painting at `opacity: 1`. A state marker that never reaches its terminal value is an unreliable probe target for every downstream gate. | lead, live | **BUILD** — `W-AURORA-MEDIUM` |

---

## FAMILY C — THE REDUCTION NEVER RAN (S1)

**Mechanism.** BJ execution selected for waves a headless gate can prove (token codemods, aria
linkage, radius repoints) and left every wave requiring a judgement about *what to remove*. The
ledger therefore reads "broadly worked" while the class of ask the owner cared most about is
collectively 0% executed. Net reduction: 66→63 component dirs, 74→72 exports — **4.5%**, against
asks phrased "REMOVED", "dramatically", "pruned", "purge to the core".

| id | finding | evidence | disposition |
|---|---|---|---|
| C-1 | Every deletion-shaped ledger row is unexecuted. `instrument-chassis/`, `metric/`, `completion-seal/` all present at HEAD **and still in `package.json` exports** (F18, F26). | lead + audit lens M1 | **BUILD** — `W-DELETE` |
| C-2 | `deck` — 277 LOC, **exported**, **zero** usage sites in `src/` or `demo/`. | lead census | **BUILD** — `W-DELETE` |
| C-3 | Zero-`src`-usage exported components: `paper-backdrop`, `animated-digit`, `header-ribbon`, `scroll-progress-rim`. | lead census | **BUILD** — `W-DELETE` |
| C-4 | `demo/stories/manifest.ts:922-1095` still lists `motion/tempo` (F30), `motion/reveal` (F32), `motion/scroll` (F42), and all 6 `compositions` pages (F43/F44/F45). | audit lens M1 | **BUILD** — `W-DELETE` |
| C-5 | Timeline still ships all five variants (`Continuous`/`Scrubber`/`Segmented`/`Glass` + dispatcher), 2,254 LOC, against F16 "redesign from the ground up". | lead | **BUILD** — `W-TIMELINE` |
| C-6 | **118 runtime exports have zero internal consumers; 5 are 100% dead.** There is no export-reachability gate for TS/JS — only for CSS. | audit lens F2 | **BUILD** — `W-DEAD-EXPORT` |
| C-7 | Four published motion composables (627 lines) have no `src` or `demo` consumer. | audit lens F10 | **BUILD** — `W-DEAD-EXPORT` |
| C-8 | `engageEnvelopes.ts` — a 117-line published register whose only reader is a test asserting the table against constants declared beside it. | audit lens F9 | **BUILD** — `W-DEAD-EXPORT` |
| C-9 | The five procedural/shell giants are **27,815 LOC — 48% of all component code**: aurora 8,968 · dock 7,974 · blob 5,546 · constellation 2,442 · fourier-field 2,885, against a 57,657-line component tree. Several have near-zero consumers. | lead census (code-only; the earlier figures counted `.md` inside component dirs) | **RULE** — sized by `W-DAG-REDUCE`; the owner's ≥2-consumer bar applies to them exactly as to everything else |

---

## FAMILY D — SHIMS AND DUAL PATHS SURVIVING A NO-LEGACY EDICT (S2)

**Mechanism.** Each shim was locally justified at the moment it was written, and the no-legacy edict
is enforced by prose rather than by a detector. Prose does not fail a build.

| id | finding | evidence | disposition |
|---|---|---|---|
| D-1 | `floatingContentAttrs` — a **30-entry retired-prop deny-list applied at runtime** on 6 components; it silently swallows `asChild`. A migration shim by any definition. | audit lens F4 | **BUILD** — `W-SHIM-PURGE` |
| D-2 | `useCanvasLifecycle` — a literal alias-of-record, shipped on **two** public subpaths, **zero** consumers, inside a barrel whose own comment forbids aliases. | audit lens F3 | **BUILD** — `W-SHIM-PURGE` |
| D-3 | Eight re-export shims exist solely to hold a symbol on a barrel path after its implementation moved; one says so in its comment. | audit lens F11 | **BUILD** — `W-SHIM-PURGE` |
| D-4 | `createCanvasLifecycle`'s `dprPolicy` "migration seam" is a dead branch — every consumer supplies it. | audit lens F5 | **BUILD** — `W-SHIM-PURGE` |
| D-5 | Three independent module-load `NATIVE_SCROLL_TIMELINE` feature-detect ladders; the flagship (`useScrollProgress`) has its gate exercised by no test. | audit lens F6 | **BUILD** — `W-SHIM-PURGE` |
| D-6 | **Selection-engine trifurcation.** `useSelectionGroup` documents itself as the ONE engine for dock + SegmentedTabs + ToggleGroup; SegmentedTabs bypasses it. | audit lens F7 | **BUILD** — `W-SELECTION-ONE` |
| D-7 | `_shared/axes.ts` keeps three dead meta-arrays alive with `void` statements, shipping as runtime bytes on a subpath documented as types-only. | audit lens F8 | **BUILD** — `W-SHIM-PURGE` |
| D-8 | **`supportsBackdropRefract.ts`**: at HEAD, `armed = true` is set *before* the throwing probe and the negative arm never calls `removeAttribute`, so a stale `data-glass-refract="on"` survives an honest rejection. The ~20-line cure exists **uncommitted** in the working tree. The multi-Document defect (module-global `armed`, `:52`/`:144`) survives in **both**. | lead, `git show HEAD:` vs working tree | **BUILD** — `W-REFRACT-LATCH` (already chartered; this row supplies its exact born-RED) |

---

## FAMILY E — THE GATE BATTERY CANNOT DO ITS JOB (S1)

**Mechanism.** Gates are authored as prose-shaped assertions over source text rather than as
observations of behaviour, and their close stamps are hand-written. A hand-written stamp cannot be
falsified by a runner, so the corpus's status is only as fresh as the last seat that chose to run
something and write it down.

| id | finding | evidence | disposition |
|---|---|---|---|
| E-1 | **The entire governed-gate apparatus exists only in the working tree. HEAD has no battery at all.** | audit lens G-1 | **BUILD** — `W-GATE-TRUTH` |
| E-2 | `npm test` / `npx vitest run tests/gates` is **RED at HEAD** (2 failed / 60 passed), one failure being a governed seat with a stale roster row. | lead + audit lenses G-6, BJ-1 | **BUILD** — `W-GATE-TRUTH` |
| E-3 | `caseIdentity` — the roster's anti-erosion device — is a static-vs-static string compare with **zero runtime binding**. | audit lens G-2 | **BUILD** — `W-GATE-TRUTH` |
| E-4 | Raw-regex-over-source gates cannot distinguish a live CSS rule from a commented-out one; the orphan-CSS reach walker counts **commented-out imports as live graph edges**. | audit lenses G-3, G-4 | **BUILD** — `W-GATE-TRUTH` |
| E-5 | **CSS reachability has two mechanisms and every gate models one.** `@import` closure from `src/styles/index.css` reaches 110/124 `src/**/*.css`; the other 13 are reached by SFC `<style src="./styles.css">` (verified in avatar, checkbox, command, data-table, dropdown-menu, expandable-container, number-field, radio-group, switch, tags-input, toggle-group, `_shared/disclosure`, `_shared/field/field-control`); `fonts.css` is a deliberate separate export. A gate modelling only `@import` false-positives; only SFC, false-negatives. | lead, closure script | **BUILD** — `W-GATE-TRUTH` (the union is the invariant) |
| E-6 | `placeholder-contrast.test.ts` is a contrast gate that **computes no contrast**. Tautological assertions sit inside governed seats. A governed seat's frozen title claims an assertion its body never makes. | audit lenses G-9, G-7, G-8 | **BUILD** — `W-GATE-TRUTH` |
| E-7 | The "≤60 gates" collapse is a **labelling change**: 48 governed seats / 201 assertions sit inside a 2,614-assertion battery that fails CI identically. Measured now: **1,095 `it()` cases across 217 files**. | lead + audit lens G-11 | **BUILD** — `W-GATE-TRUTH` |
| E-8 | The only gate on the published `./styles.css` manifest returns **green when the artifact it measures is absent** — the exact trap its sibling gate refuses. | audit lens G-12 | **BUILD** — `W-GATE-TRUTH` |
| E-9 | **176 Playwright specs exist; exactly one is reachable** from any workflow or release script. 16 are `_`-prefixed one-off tranche captures left in the tree. | lead + audit lens G-13 | **BUILD** — `W-GATE-TRUTH` |
| E-10 | A MEMORY-recorded recurring product defect (inset shadow inside `light-dark()` computing the whole `box-shadow` to `none`) is guarded by prose in 7 source files and by **no detector**. | audit lens G-10 | **BUILD** — `W-GATE-TRUTH` |
| E-11 | Both vitest projects run the entire 200-file suite; the chip-listener project's `include` is inert, so every test executes twice under `EventTarget` monkey-patching. | audit lens G-5 | **BUILD** — `W-GATE-TRUTH` |

---

## FAMILY F — THE STORY SURFACE IS A PLACEHOLDER (S1)

**Mechanism.** The landing tile was built as an identity label and never replaced with a preview, and
no gate asserts that a preview renders anything. The owner reported it as "blank white cards"; the
corpus recorded it as a perf/above-fold problem and scheduled an `intrinsic-size` number.

| id | finding | evidence | disposition |
|---|---|---|---|
| F-1 | **The preview machinery is correct and complete; its content was never authored.** `SectionPreviewCard` implements a four-rung tile ladder (`storyTile.ts:41-52`): `authored` (a co-located `<cat>/<id>.tile.vue`) → `still` (a frozen data-URI raster for GL routes) → `identity` (the terminal floor: a div containing only the story's own title). `manifest.ts:158` already ships the `./*/*.tile.vue` glob and a `tileLoader` resolver. **Only 4 `.tile.vue` files exist for 120 stories.** Live-measured across all 12 landings: **98 cards — 88 `identity` (90%), 6 `still`, 4 `authored`.** Eight landings are 100% blank (`/`, `/foundations`, `/containers`, `/navigation`, `/data`, `/feedback`, `/motion`, `/compositions`); only `/substrates` is fully populated. The card additionally prints the title inside the identity tile **and again** in the `<span>` below it. F01, F02, F46 are one defect. | lead, live per-landing tile census + `demo/chassis/landing/storyTile.ts:41-52`, `SectionPreviewCard.vue:35-56`, `demo/stories/manifest.ts:158` | **BUILD** — `W-PREVIEW-CARD`. *Corrected 2026-07-24 by the band-fold seat: the earlier "SectionPreviewCard has no preview / 77 of 87 routes" reading blamed the component. The component is right; the ladder is right; the tiles do not exist. The wave is authoring content, not rebuilding a card — a materially cheaper and more correct cut.* |
| F-2 | F01's masonry/expressive-sizing ask is unimplemented; the grid is uniform with an arbitrary 2-up/3-up row inconsistency, and card descriptions clip at the fold. | lead, live at `/foundations` | **BUILD** — `W-PREVIEW-CARD` |
| F-3 | Story heroes burn ~240–400px on a title plus one line, and repeat the page name up to three times (title, eyebrow, section heading) — e.g. `/substrates/aurora`. F10 hierarchy + F03 parsimony. | lead, live | **BUILD** — `W-STORY-PROPORTION` |
| F-4 | F06/F07 route transitions are **byte-identical** to the complaint state. | audit lens M7 | **BUILD** — `W-ROUTE-MOTION` |
| F-5 | F05 — the dock category still declares no background field on any story or landing. | audit lens M8 | **BUILD** — `W-STORY-PROPORTION` |
| F-6 | F43/F45/F46 received only the global `text-sm`→`text-small` codemod and now read as "touched". | audit lens M11 | **RE-OPEN** — these rows return to RED in `WAVES.md` |

---

## FAMILY G — MOTION PROMISED, NOT SHIPPED (S1)

**Mechanism.** The motion canon is expressed as generated tokens and prose laws, with no probe that
compares the shipped curve against the promise. A token whose register text says "weighty rebound"
and whose generated overshoot is `+0.0%` passes every gate.

| id | finding | evidence | disposition |
|---|---|---|---|
| G-1 | **Four of eight springs ship monotone.** `smooth`, `press`, `dock`, `orb-drop` document `overshoot +0.0%` in `src/styles/tokens/scheme-spring.css` while their register text promises weight and rebound. The file itself says such a row "is a row to RE-TUNE"; nobody re-tuned it. Directly contradicts the liquid-weight edict. | lead, source | **BUILD** — `W-SPRING-RETUNE` |
| G-2 | **A01/A11 engagement variants do not exist in the type surface.** Neither the slider modal-expansion nor the grow-on-engage variant is implemented; `BI.W-ENGAGE-AFFORD` is spec-only with zero implementation on any mainline. | audit lens M9 | **BUILD** — `W-ENGAGE-LADDER` |
| G-3 | F20 (toast animation "awful, should be exactly like our refined dialog"), F22 (loop jitter), F24 (skeleton too slow) — the feedback-motion cohort. | ledger + `BAND-FEEDBACK-MOTION` | **BUILD** — `W-FEEDBACK-MOTION` |
| G-4 | F34–F40 HandMark: live at `/motion/handmark`, the underline under "future"/"here" renders as **two disjoint segments with a visible gap and blunt chopped ends**, uniform stroke width, no pressure or velocity taper. Every named greenfield target is **byte-identical** to the pre-feedback commit. | lead, live + audit lens M2 | **BUILD** — `W-HANDMARK` (greenfield; owner granted first-principles authority 2026-07-17) |
| G-5 | The exemplar corpus (Apple Music, ChatGPT, Gemini, Siri, the Photos popover, the iOS-27 archive) is analysed in `MOTION-CANON.md`; its lead/lag law, engagement ladder, gradient-blur focus, dock primitives and dissolve are the specification these waves consume. | `MOTION-CANON.md` | **BUILD** — canon feeds G-1…G-4 and Family H |

---

## FAMILY H — THE DOCK (S1) — owner ruling 2026-07-24: "likely fully contrived and should be replaced"

**Mechanism.** The dock accreted capability as props and state classes rather than as composable
primitives, then shed the capabilities that were expensive to prove — including the ones the owner
now names as the headline. Its `index.ts` is a manifesto of retirements rather than an export list.

| id | finding | evidence | disposition |
|---|---|---|---|
| H-1 | 7,974 LOC · 45 files · 20 CSS partials · 19 props on `GlassDock` · live class soup `expanded pinned always-expanded`. | lead, source + live | **GREENFIELD** — `W-DOCK` |
| H-2 | **`useDockFission` + `DOCK_SPLIT_SIGNATURES` are DEFINITION-ABSENT**, retired as "a demo-only spectacle AND the prime Safari suspect". This is precisely the facility the owner now names as the headline capability (controls gird left, search girds right, now-playing centre). | `src/components/dock/index.ts` | **REVERSE** — `W-DOCK-FISSION`; the retirement rationale is re-tried against the Music exemplar |
| H-3 | **`useDockOrientationMorph` is definition-absent** on the claim "the platform cannot continuously interpolate a flex-column→row topology change". The Music dock performs exactly this on video. The claim is a capitulation the exemplar refutes; the correct mechanism is transform/clip interpolation over a measured pair, never layout. | `src/components/dock/index.ts` + `MOTION-CANON.md` | **REVERSE** — `W-DOCK` |
| H-4 | F47 overflow affordance: live at `/motion/handmark` the dock **clips its own active label** ("Hand Mar…") with no indication of further items and no auto-scroll on selecting an edge-occluded item. | lead, live | **BUILD** — `W-DOCK-OVERFLOW` |
| H-5 | F27 — the horizontal dock is still a vertical scroll container by a CSS coercion whose own source comment acknowledges and does not fix it. | audit lens M6 | **BUILD** — `W-DOCK-OVERFLOW` |

---

## FAMILY I — MATERIAL: TOO BRIGHT, NOT FROSTED (S1)

**Mechanism.** The blur ladder was tuned by token arithmetic against captures of our own surfaces,
never against a frosted reference. Nothing in the battery distinguishes "translucent and shiny" from
"blurred and frosted", so a specular-heavy result passes.

| id | finding | evidence | disposition |
|---|---|---|---|
| I-1 | **F48's headline clause shipped as prose with zero value change** — "glass blur for ALL glass components slightly more subtle". | audit lens M5 | **BUILD** — `W-FROST` |
| I-2 | Owner 2026-07-24: the F5 tabs-toggle glass is poor; F4 tabs are "far too trite, shiny, and bright — not like blurred and frosted glass"; the slider is the same. F1's glass is good and the iOS-27 micro demo's glass is good — so the target exists in-repo and the delta is measurable. | owner | **BUILD** — `W-FROST` |
| I-3 | Owner 2026-07-24: **"No chrome special behavior for any glass items."** Any engine-conditional glass arm is a defect, not an optimisation. Intersects the standing no-masking-fallback edict and Family B. | owner | **RULE** — binds `W-FROST`, `W-AURORA-MEDIUM`, `W-REFRACT-LATCH` |
| I-4 | The radius cohort: F09 (over-rounded container / cramped configurator), F12 (tags-input unrounded), F15 (reset button unrounded), F17 (search inputs unrounded), F19 (Alert not glassy/rounded — byte-identical, still 10px against the 16px card canon), F45 (gate-pattern rounding), CFR-01 (metric pill in a grid). | ledger + audit lens M10 | **BUILD** — `W-RADIUS-ROLE` |
| I-5 | F49/F50 — the gradient blur behind popovers/modals, and the ChatGPT slider's gradient-blur focus. Specified in `MOTION-CANON.md`. | owner + canon | **BUILD** — `W-GRADIENT-BLUR` |
| I-6 | F28 blur inconsistency — "ensure this is intentional". Becomes a checkable rung table, not a judgement. | ledger | **BUILD** — `W-FROST` |

---

## FAMILY J — THE WATERCOLOR DOT AND THE HERO ORNAMENT (S2) — owner 2026-07-24

**Mechanism.** A component was used as decorative markup rather than mounted as itself, so its
interactive contract never runs; and a bespoke hand-authored ornament sits in the hero of a library
whose entire point is that its own primitives are the design language.

| id | finding | evidence | disposition |
|---|---|---|---|
| J-1 | The "ovular rainbow thing" is `<span class="optical-bench-meniscus">` — a hand-authored `linear-gradient(102deg, …)` with an organic border-radius, a **demo-only hero ornament**, not glass and not a component. It reads as a gradient pill on cream. | lead, live computed style | **BUILD** — `W-STORY-PROPORTION` (delete the ornament; the hero uses real primitives or nothing) |
| J-2 | The ochre shape beside it is a `WatercolorDot` rendered as `optical-bench-dot watercolor-swatch` — a flat `background-color: oklch(0.53 0.124 69.6)` plus `filter: url(#watercolor-filter-v-13)`, inside a decorative `<span>`. **This is why it has no procedural or random hover state: it is not mounted as an interactive component.** | lead, live computed style | **BUILD** — `W-STORY-PROPORTION` + `W-DAG-REDUCE` |
| J-3 | Owner asks why WatercolorDot lacks value.js's procedural/random hover states. Its 509 LOC serve one external consumer (value.js). Either it earns its public seat with the procedural treatment, or it relocates to its one consumer. | owner + lead census | **RULE** — `W-DAG-REDUCE` decides; the ≥2-consumer bar applies |

---

## FAMILY K — ACCESSIBILITY (S1/S2)

**Mechanism.** A11y was pursued as ARIA-attribute coverage — linkage, roles, labels — which a headless
gate can assert. The defects that survive are the ones only a *user* meets: a key that never reaches the
control, a contrast that computes but was never computed, a state with no keyboard path.

| id | finding | disposition |
|---|---|---|
| K-1 | **`SortableList` steals Space/Enter from every focusable descendant** — a nested input cannot type a space. | **BUILD** — `W-A11Y` (TR #31) |
| K-2 | An unchecked `Checkbox` / `RadioGroupItem` is drawn at **1.28:1** against its own surface — effectively invisible. | **BUILD** — `W-A11Y` (TR #31) |
| K-3 | Dark-mode form error text computes **3.67:1** while the token's own comment asserts 4.60:1. | **BUILD** — `W-A11Y` (TR #31) |
| K-4 | `DropdownMenuTrigger` ships with **no visible focus indicator at all**. | **BUILD** — `W-A11Y` (TR #31) |
| K-5 | `Carousel`: off-screen slides remain in the tab order and the a11y tree; slide changes announce nothing. | **BUILD** — `W-A11Y` (TR #31) (moot if carousel deletes — then it is struck, not silently dropped) |
| K-6 | `ScrubberTimeline`'s value readout appears on hover/active only — a keyboard scrubber shows no value. | **BUILD** — `W-TIMELINE` |
| K-7 | The dock's pinned (latched-open) state has **no keyboard path**. | **BUILD** — `W-DOCK` |
| K-8 | The 44px `touch-hit-area` utility receives no pointer events and has **zero consumers**; its comment records satisfying a readback rather than a user need. | **BUILD** — `W-A11Y` (TR #31) + `W-SHIM-PURGE` |
| K-9 | reka-ui 2.10.1 `VisuallyHidden` always emits `aria-hidden="true"`, silencing `ToastAnnounce`; our compensating live region is a shim in waiting. | **RULE** — `W-A11Y` (TR #31); upstream-pin, not a local shim |

**Perf note.** A17's slow-load/stutter class (F01, F46) is *partially* explained by Family F — a blank
tile is not slow, it is empty. `W-PERF` (TR #69) re-measures against the **fixed** card and does not inherit the
original diagnosis.

---

## FAMILY L — SHIPPED DOCUMENTATION LIES (S0/S1)

**Mechanism.** The doc-canon enforcement seam is dead code (zero importers), and exactly **one of 200
test files** reads any root doc. So documentation drifted freely for sixteen tranches while every gate
stayed green. These are S0 because they are what a consumer reads *first*.

| id | finding | disposition |
|---|---|---|
| L-1 | **README's primary usage example imports two symbols that do not exist anywhere in the library.** | **BUILD** — `W-DOC-TRUTH` (TR #61) |
| L-2 | **`DESIGN.md`'s z-index table is wrong on the six highest rungs** — a consumer stacking against it lands *under* the modal. | **BUILD** — `W-DOC-TRUTH` (TR #61) |
| L-3 | `DESIGN.md`'s glass-tier table lies about **every blur radius and every saturate factor**, and `MIGRATION.md` at HEAD states the opposite. | **BUILD** — `W-DOC-TRUTH` (TR #61) (couples to `W-FROST`, which changes these values) |
| L-4 | `DESIGN.md`'s canonical spring table is wrong on **all four damping ratios and all three overshoot figures**, and quotes `linear()` payloads that no longer exist. | **BUILD** — `W-DOC-TRUTH` (TR #61) (couples to `W-SPRING-RETUNE`) |
| L-5 | `DESIGN.md` documents **ten retired components and composables as the current API**, including a whole Dock table whose every trigger is retired. | **BUILD** — `W-DOC-TRUTH` (TR #61) |
| L-6 | ~40 CSS custom properties documented as consumer-tunable knobs are **never declared anywhere in `src`**. | **BUILD** — `W-DOC-TRUTH` (TR #61) |
| L-7 | `docs/canon` — the set README calls "the authoritative canon" — carries wrong constants, a retired-component example, and a superseded formula. Two forked copies of the same canon ship side by side (`docs/design` vs the `docs/precepts` submodule) and have **diverged on live constants**. | **BUILD** — `W-DOC-TRUTH` (TR #61); one canon survives |
| L-8 | `docs/consumer-evidence/` — the corpus justifying each public API's existence — cites the **pre-restructure source tree wholesale**: 29 dead paths. | **BUILD** — `W-DOC-TRUTH` (TR #61) |
| L-9 | `MIGRATION.md`'s newest section omits the two export removals made since v7.0.0 and still hands consumers a now-dead path. | **BUILD** — `W-DOC-TRUTH` (TR #61) |
| L-10 | **The root barrel is a wildcard re-export**, so two undocumented symbols joined the public API; the only gate that would notice is RED at HEAD. | **BUILD** — `W-PKG-TRUTH` |
| L-11 | 94 backticked token references in `src` comments name registers that have since drifted. | **BUILD** — `W-COMMENT-DIET` |
| L-12 | The doc-canon enforcement seam has **zero importers**. | **BUILD** — `W-GATE-TRUTH`: one gate that diffs documented constants against source, or the docs stop stating constants. |

---

## FAMILY M — PERFORMANCE (S1) — measured, not inferred

No prior BJ family covered performance. These were measured against both the built demo
(`npm run demo:dist:build` → `vite preview`) and the dev server, driven by Playwright.

| id | finding | disposition |
|---|---|---|
| M-1 | **Three seconds of literally empty DOM.** App mount is gated on the deepest lazy route chunk and `index.html` ships no fallback shell. `P1` | **BUILD** — `W-BOOT-SHELL` |
| M-2 | **Chunk shrapnel: 287 JS chunks, 1,091-byte median, 104 requests on one route.** 1.67 s of FCP is pure round-trip serialization, not bytes. `P2` | **BUILD** — `W-BOOT-SHELL` |
| M-3 | The decorative shell WebGL field is **on the critical render path with no error boundary** — one failed chunk yields a permanently blank app. `P3` | **BUILD** — `W-BOOT-SHELL`; couples to the no-masking-fallback edict: a decorative field must never be able to blank the product. |
| M-4 | Per-frame Vue-reactive inline custom-property write, **unregistered so it inherits**, on a filtered element that also carries a CSS transition on the same property. `P4` | **BUILD** — `W-FRAME-DISCIPLINE` |
| M-5 | "One GL context per route" is a **doc comment, not an invariant** — `/substrates/constellation` mounts **9 canvases** and runs at 27 fps on a weak GPU. `P5` | **BUILD** — `W-FRAME-DISCIPLINE`; evidence for constellation's `W-DAG-REDUCE` row. |
| M-6 | Dev server ships **16.8 MB across 303 modules per page** because reka-ui and `@lucide/vue` are consumed through root barrels with no `optimizeDeps` entry. `P6` | **BUILD** — `W-BOOT-SHELL` |
| M-7 | The configurator sheet **mounts on every route** despite never being visible — a 12-chunk tail landing after FCP. `P7` | **BUILD** — `W-BOOT-SHELL`; couples to configurator's demotion row. |
| M-8 | Brand woff2 arrives at **3.7 s**, past its `font-display: optional` window, and `index.html` deliberately ships no preload. `P8` | **BUILD** — `W-BOOT-SHELL` |
| M-9 | The bundle-drift gate is **structurally blind to relative regressions** — an absolute 1024-byte floor skips a **37× size increase**. `P9` | **BUILD** — `W-PKG-TRUTH`'s ratchet replaces it. |
| M-10 | **No route ever reaches a quiescent frame** — every page schedules rAF at display rate forever, including static specimen pages. `P10` | **BUILD** — `W-FRAME-DISCIPLINE`. This is also the measurable form of the BREATH-OF-LIFE boundary: `MOTION-CANON.md` §4 rules that a control at rest carries **no** decorative idle loop, and only an ambient substrate may idle, at period ≥1 s. |

---

## FAMILY N — WHAT THE ARCHIVE ACTUALLY TEACHES (S1)

The owner asked for a historical audit of the last 20+ tranches. Three lenses ran it — early archive
(C…AS), middle (AT…BC), recent (BD…BJ). These are the **recurrences**, not the incidents: a lesson is
admitted here only if it recurred across tranches after being declared closed.

| id | the recurrence | why it kept happening |
|---|---|---|
| N-1 | **Gate-minting is the standard close remedy.** The mesh then drifts into false witness and is deleted wholesale, taking every real remedy with it. `ARCH-2`, `TA2-5` | A close needs a visible artifact; a gate is the cheapest one to author and the most expensive one to maintain. This is the direct ancestor of the gates-abrogation mandate. |
| N-2 | **The terminal-reflect funnel.** Binding paint-truth is deferred to a close wave that never runs — AW, AX, BA, BB, and **live at HEAD**. `TA2-1`, `TA2-3` | The close wave is scheduled last, so it is the most-moved and least-executed row in every plan. |
| N-3 | **The headless-green / visually-broken gap**, on its fourth-plus recurrence. BG banked 20 captures per wave; BI banked 0.20 and shipped three majors. `TA3-08` | Captures are the only instrument that catches it and the only one with an external dependency, so it is the lane that is always waived — including once by a "PERMANENT" waiver. `ARCH-4` |
| N-4 | **The bundle budget's only failure mode is to raise its own ceiling** — 24× growth across 12 self-declared one-time lifts. `ARCH-3` | A budget that the failing party may amend is not a budget. Cured here by `G-BUNDLE-RATCHET` (decrease-only without an owner mark). |
| N-5 | **Author-assertable status vocabulary is the vehicle of ledger inflation.** AX minted it, retired it; BB re-invented it. `TA2-6`, `ARCH-5` | Audit verdicts are structurally indistinguishable from evidence, so hallucinated and stale findings drive real retirements. Cured by Law 4 (status is emitted, never authored). |
| N-6 | **Omnibus landing commits destroy per-wave provenance.** BI landed 5% of its 134 P-waves attributably; one commit touched **926 files**. `TA3-03`, `TA3-02` | With no per-wave status column, wave state is reconstructed inferentially from git — which is why BI produced 14 register corrections. |
| N-7 | **The "USER-GATED" row is the drop mechanism.** A directive becomes a recommendation, the gate never fires, the tag cuts anyway. `TA3-01` | This is *the* BI misfire, named. `ASK.md` inverts it here: **silence advances the recommendation** rather than parking the wave. |
| N-8 | **Formation cost is not correlated with build output.** BD: 957 documents / 159,041 lines / 158 wave specs → **zero** landing commits for its own waves. BI's formation cost 1.12M tracked lines and produced one bit — 8,506 of 8,509 routed rows got the identical disposition. `TA3-07`, `TA3-06` | The single strongest argument for this refinement's Law 5 (the corpus is versioned and smaller than what it changes). |
| N-9 | **The durable-lessons ledger has been unwritable from the tranche workflow since 2026-06-12** — 1,276 commits and four majors have produced zero entries. `TA3-05` | The mechanism that would have prevented N-1…N-8 is itself broken, which is why they are all still live. **This is the highest-leverage row in the family.** |
| N-10 | **Rework tax is rising** — 53% of BJ-era commits exist to correct the tranche's own record, up from 30% in BI. `TA3-10` | Compounding consequence of N-5 and N-6. |

> **The one unambiguous durable win** (`TA3-11`): the gates-abrogation mandate was executed completely and
> is verifiable by running it. **The verdict on the trend** (`TA3-12`): the machinery is getting better at
> document economy and per-wave attribution, and **no better at closing the user loop** — the same
> complaint families recur verbatim across the BI→BJ boundary, on components BI landed and gated GREEN in
> between (`TA3-09`).

**Disposition:** N-9 is owned by `W-PROCESS-CURE` and is a precondition for the close. N-1…N-8 and N-10 are
not separate waves — they are the reason `REFINEMENT.md`'s five laws exist, and each law names the
recurrence it kills.

---

## FAMILY Z — THE CHRONICS (a disease row is a wave of its own)

The owner's standing rule: *"A chronic that has ridden two or more closes un-decided is a disease row,
and deciding it is a wave of its own."* Twenty-plus tranches of archaeology produce seven, each with the
tranches it rode.

| id | the mechanism | rode | terminal disposition |
|---|---|---|---|
| Z-1 | **The terminal-reflect funnel.** Binding paint-truth is deferred to a close wave that never runs. | AW, AX, BA, BB — **and live at HEAD** | **DECIDED — BUILD.** Paint truth moves to the *wave* grain: no wave closes without its own π/DELTA. There is no close-wave to defer to, because the close wave is deleted. Owner: `W-GATE-TRUTH`. |
| Z-2 | **Gate-minting as the standard close remedy**, followed by wholesale abrogation that takes the load-bearing gates out with the overfit ones. Sixteen tranches. The paint-gate scope narrowed 16 surfaces → 1 in CI, and BC's keystone paint probe is now an **unimported orphan**. | C…BJ | **DECIDED — BUILD.** A fixed 40–60 budget with a keep-list justified per gate; minting a gate requires retiring one. Owner: `W-GATE-TRUTH`. |
| Z-3 | **The immortal `min-consumers` book.** Three AY deferrals have ridden **10–11 tranches**; 28 such rows were re-stamped un-MET at BI. The ≥2-consumer bar has no expiry, so rejected substrate becomes a ledger copied forward forever. | AY…BJ | **DECIDED — RETIRE THE BOOK.** The bar is applied *once*, at `W-DAG-REDUCE`, and the verdict is terminal: keep, demote, or delete. No watched-conditions ledger survives this tranche. |
| Z-4 | **Shadow execution.** Work performed off the recorded branch. Five occurrences; the remedy each time was a retrospective, never a mechanism. Worst case: **H and I closed on a branch that never merged — their FINAL docs are on master and their work is not.** | H, I, +3 | **DECIDED — BUILD.** Law 4: status is emitted from the SHA it ran against. A close stamp naming a SHA not reachable from the default branch fails. Owner: `W-PROCESS-CURE`. |
| Z-5 | **Doc-drift numerals re-found at every close for sixteen tranches**, absorbed inline each time, never mechanised. Family L is this chronic's current balance. | C…BJ | **DECIDED — BUILD.** Docs stop restating constants; a gate diffs the few that remain against source. Owner: `W-DOC-TRUTH` (TR #61) + `W-GATE-TRUTH`. |
| Z-6 | **Author-assertable status vocabulary** as the vehicle of ledger inflation — AX minted it, retired it; BB re-invented it; BJ ran it at scale. | AX, BB, BJ | **DECIDED — STRUCK.** Law 4. The vocabulary is reduced to what a runner can emit: PASS, FAIL, ABSENT. Owner: `W-PROCESS-CURE`. |
| Z-7 | **The bundle budget whose only failure mode is raising its own ceiling** — 24× growth across 12 self-declared one-time lifts. | C…BJ | **DECIDED — BUILD.** The budget becomes a ratchet: it may only fall. A raise requires an owner mark, not a wave's own declaration. Owner: `W-PKG-TRUTH`. |

**Supporting archaeology, no separate wave:** five published versions carry **zero CHANGELOG record**
(the halt propagates into the public release history — folded into `W-DOC-TRUTH` (TR #61)); audit verdicts are
structurally indistinguishable from evidence, so hallucinated findings drove real retirements (cured by
Law 1); the destructive-git precept recurred five times and its one tooling remedy has since been
deleted (folded into `W-PROCESS-CURE`); "zero-deferral" and "permanent-archive" are close-time
inventions that the next close reverses (cured by Law 2's round cap and merged-commit exit).

---

## FAMILY X — PROCESS (the reason none of the above landed)

These three are admitted deliberately: the owner's edicts name process parsimony directly, and each
cites measurable repository state.

### X-1 · The convergence gate cannot terminate (S1)

**Mechanism.** The convergence artifact embeds hashes of its own predecessor and of the critics that
judged it (`supersedesRosterSha256`, `parentFormationSha256`, `criticSha256.{A,B}`, an incrementing
`schemaVersion`). Every round therefore produces a byte-different artifact even when zero content
changed — and to the loop, byte-different is a delta. **Two-consecutive-clean is unreachable by
construction.** The loop terminates by exhaustion instead.

Evidence: `GATE-SEMANTIC-ROSTER-C{8..19}` — 13 re-issues growing 529→1,360 lines, plus 24 critic and
adjudication documents, **19,484 lines produced in 3h21m**. `diff C17.json C18.json` = 24 lines, of
which **23 are provenance**; exactly one content line differs, and it is one prose clause growing into
a 90-word paragraph. C17, C18, C19 are all 1,360 lines.

**Disposition — BUILD `W-PROCESS-CURE`:** provenance moves to git or a sidecar; the convergence
predicate is defined over the content-only projection, so an empty content diff terminates the loop.

### X-2 · Findings may be raised against documents, so cures manufacture the next round's findings (S1)

**Mechanism.** Nothing restricts an admissible finding to a source artifact, and derived data (counts,
rosters, phase lists, SHAs) is duplicated across `PLAN.md`, `APOTHEOSIS.md`, the cursor and the band
files. Every cure that charters a wave invalidates three or four copies, which the next round's critics
correctly report. The corpus diagnosed this itself for *counts* and applied a one-time sweep; the
identical mechanism then recurred for *hashes* and for *SHAs*, because the cure was a sweep and not a
standing admissibility rule.

Evidence: commit `c9207a00`, verbatim — "the cures manufacture the next round's findings". Per-round
material r9=13 · r10=9 · r11=12 · r12=13 (a plateau, not a decay). Of 22 escalated legs across six
stability rounds: 3 folded, 12 discharged-as-redundant, 4 routed, 3 pre-discharged — **13.6% yield,
zero changed `src`**, at a cost of 30 files / 7,054 lines.

**Disposition — BUILD `W-PROCESS-CURE`:** the admissibility rule at the head of this registry becomes
the standing rule. A finding needs a path and a failing command.

### X-3 · The model-caste routing sink (S0 for throughput)

**Mechanism.** Bounded product edits were reserved for a "Luna x-high" seat. **That seat has authored
zero commits, ever** (`git log --all --format='%B' | grep -ci 'model: *luna'` → 0), while **103 files**
route obligations to it. Routing is therefore an absorbing sink: an obligation enters, a document is
emitted explaining that the fix was *not* made, and the defect stays live. The sink is cheap and
lawful, so seats prefer it — writing the routing document is in-caste, writing the fix is not.

Proven end-to-end on one file: `supportsBackdropRefract.ts`, 174 lines, governed by **43 documents /
13,264 lines** (57 doc lines per source line changed), ending with the defects still live at HEAD and
a ~20-line cure sitting uncommitted (family D-8).

Supporting scale: BJ's execution week produced **docs ± 191,172 vs src ± 8,427** across 181 commits,
**149 of which (82.3%) touch zero `src` files** — plus 172,112 lines of *untracked* addenda in a single
~20-hour span. Combined process:product ≈ **43:1**. All-time `docs/tranches` ± 4,262,020 vs `src` ±
391,855 = **10.9:1**. Standing: 858,514 doc lines against 86,899 src lines.

**Disposition — BUILD `W-PROCESS-CURE`:** the caste gate is deleted for bounded fixes — the seat that
reproduces a ≤10-line defect lands it — and a route to a seat with no landed commits is a hard failure,
not a valid disposition. **Per the owner's 2026-07-24 order, the operative law is: Fable owns design,
critique, brainstorming and planning; Opus takes implementation fanout. Sol/Luna is discharged.**

### X-4 · Supporting hygiene (S3)

| id | finding | evidence | disposition |
|---|---|---|---|
| X-4a | **240 untracked governing documents** cited by commits as binding authority; 34 of 41 `coordination/` steers untracked; 206 untracked addenda files. Commit `4b5bc369` exists solely to retract a status claim that described uncommitted bytes as landed. | audit lens P-8 | **BUILD** — `W-PROCESS-CURE`: a commit may not cite an uncommitted document |
| X-4b | **34.4% of `src` is comment** (30,120 / 87,559). `src/styles/index.css` is 84% comment for a 40-line import list; the token files reach 80%. Style markers of decision-history rather than contract: 53× "clean break", 48× "no alias", 24× "byte-isomorphic", plus obituaries for already-deleted files. | lead, measured | **BUILD** — `W-COMMENT-DIET` |
| X-4c | **2.7 GB of tranche screenshots tracked in git; `.git` is 4.0 GB** for an 87k-line library. Largest single asset 8.7 MB. Every clone, CI job and worktree lane pays this. | lead, measured | **BUILD** — `W-REPO-WEIGHT` |
| X-4d | 67 numbered convergence rounds in ~24 hours, exiting into handoff documents rather than a merge; BJ has **no `FINAL.md`**. | audit lens P-10 | **BUILD** — `W-PROCESS-CURE`: round cap 3, exit artifact is a merged commit |
| X-4e | The model-declaration law is **0.5% enforced** (4 of 836 July commits), and the corpus spends prose adjudicating violations of an advisory rule. | audit lens P-11 | **BUILD** — `W-PROCESS-CURE`: enforce in a commit-msg hook or delete the law |
| X-4f | The execution cursor's close criterion is unfalsifiable — it declares that landing bytes can never mark a row done. | audit lens BJ-11 | **STRIKE** — `W-PROCESS-CURE` replaces it with the machine-emitted stamp |

---

## FAMILY Y — BJ'S OWN WAVE LEDGER (S2)

| id | finding | evidence | disposition |
|---|---|---|---|
| Y-1 | **21 of 50 chartered waves are wholly ABSENT** — every born-RED probe still reds at the exact line its wave documents. | audit lens BJ-4 | rows carried into `WAVES.md`; the absent 21 are re-scoped, not re-booked |
| Y-2 | `BJ.W-GATE-COLLAPSE` — the tranche's user-mandated headline — is **absent**, and its acceptance instrument was swapped for one that reports success without measuring. | audit lens BJ-2 | **BUILD** — `W-GATE-TRUTH` supersedes it |
| Y-3 | Commit `35a30fbb` is labelled one wave but discharges arms of three, crediting `BJ.W-A11Y-CONTRAST` GREEN while its MAJOR arm is untouched. | audit lens BJ-5 | **RE-OPEN** — `W-A11Y` (TR #31) |
| Y-4 | Three wave ids exist outside the wave roster: two landed in source with no charter; one is charter-less but cited as seated. | audit lens BJ-6 | **RECONCILE** — `WAVES.md` is the single roster |
| Y-5 | `BJ.W-GRADED-BACKDROP-JUDGE` recorded a DECLINE verdict **without executing the DECLINE branch**, and dropped its unconditional deliverable. | audit lens BJ-7 | **RE-OPEN** — `W-FROST` absorbs the residual scrim |
| Y-6 | Gates authored by `BAND-GATES` W2/W3 are enrolled in no automated runner; `ci.yml` cites a release job that does not exist. | audit lens BJ-8 | **BUILD** — `W-GATE-TRUTH` |
| Y-7 | `BJ.W-REDUCE-DELETE` landed deletions but not relocations, leaving a CSS register citing a module it deleted. | audit lens BJ-9 | **BUILD** — `W-DELETE` |
| Y-8 | **The gate-abrogation tranche grew the gate tree by 4,712 lines / 93 seats while shrinking the product tree by 4,789.** | audit lens BJ-10 | evidence for X-2; no separate wave |

---

## Corrections to this registry

Recorded here rather than silently edited, because a corpus that diagnoses status inflation must show its
own corrections.

| what was wrong | the correction | how it was caught |
|---|---|---|
| **A-1 named the wrong peer.** The audit reported `@mkbabb/value.js` as the optional peer hard-required by the root barrel. | The peer is **`@mkbabb/keyframes.js`**, reachable via `glass-ui.js → button → useLiquidPress → useSpring`. `value.js` is **not** statically reachable — its dynamic-import quarantine works exactly as its comments claim. | lead walked the **built** entry (`dist/glass-ui.js`, 65 modules) instead of the source graph |
| **Two owner rows recorded as open were already fixed.** F20 (toast animation) and F21 (scroll-progress rim) are carried as live defects. | Both have **landed remedy waves with paired π evidence**: `937aa510` (`BJ.W-TOAST-DIALOG-PARITY`) and `19ea4ce1` (`BJ.W-PROGRESS-RIM-REPLACE`), each touching real `src/` files and banking before/after captures. Lead-verified via `git show --stat`. | the `ECOUTE.md` pass, measuring every row against the pre-complaint commit |
| **The WebKit crash was attributed to CSS content, then to the `@supports` guards.** Both were premature. | The guards are innocent — unwrapping them while keeping the declarations still crashes. It is a **threshold on the population of `color-mix()`-valued custom properties**. The first attribution came from a bisect that disabled the app; the second from localising the construct and then *not testing the cure*. | lead re-ran with mount as a precondition, then tested the cure itself |
| **The consumer census said 33 of 61 components.** | **42 of 62.** The earlier count mis-listed one component and counted the root barrel as a consumer. | the deterministic graph (`DAG.md`), which excludes barrels by construction |

> **The pattern worth keeping:** every one of these was caught by measuring the *artifact a consumer or a
> browser actually loads* — the built entry, the packed types, the mounted page — rather than the source
> the repo reasons about. Family A's mechanism generalises past family A.

---

## Contradictions requiring an owner mark

| id | the disagreement | why it cannot be settled below the owner |
|---|---|---|
| Q-1 | **F18 vs CFR-01.** F18 orders `metric` REMOVED. CFR-01 (later, same ledger) prescribes a `MetricCell appearance="dashboard"` API **that does not exist at HEAD**. One says delete, the other says fix the shape. | Both are the owner's own words, seven days apart, and they are incompatible. |
| Q-2 | **The eight unfalsifiable rows.** F03, F04, F10, F14, F28, F31, F33, F50 have no definition of done two readers would agree on. | Each needs one sentence of "done means X" from the owner, or it will be re-litigated forever. `ASK.md` proposes a definition for each; a nod converts them. |

Everything else in BJ's 33-row `ASK.md` is either already decided by the owner's own feedback or by a
standing edict. `ASK.md` in this folder carries the reduction and the reasoning.
