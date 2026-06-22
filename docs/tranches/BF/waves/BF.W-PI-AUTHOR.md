# BF.W-PI-AUTHOR — author the absent binding-π layer + widen the compositor scan to `demo/` + de-fang the source-only `release` gates

**Band: 0 · Tier T2 · depends: W-GESTALT-WIRE**

## The defect / the ask

Three coupled bookkeeping-of-truth gaps the BE work left:

1. **The binding-π layer is ABSENT** (DEFERRED-CENSUS **D5**, `chronic ✓`). The ~8-10 `tests-visual/*.spec.ts` the BE source gates CITE as their binding painted truth **do not exist** — `proof:dock-fission`'s note names `tests-visual/dock-fission.spec.ts`, `proof:metaball-bridge2` names `tests-visual/metaball-bridge2.spec.ts`, `proof:bloom-up` names `tests-visual/bloom-up.spec.ts`, `proof:dock-context` names "the W-GESTALT-ROSTER-BE dock-context π row", `proof:dock-rail-realize` + `proof:celebration-burst` name their specs — yet `ls tests-visual/ | grep -iE 'bloom|fission|metaball|dock-context|rail-realize|celebration'` returns ONLY `_dock-context-capture.spec.ts` (a private `_`-prefixed capture helper) and `aria-orientation.spec.ts`. The cited specs are phantom. A source gate that greens on file-existence with no painted readback is the close-class lie BF exists to kill (SEED §2 thesis-3).

2. **`proof:no-layout-animation` scans `src/` ONLY** (DEFERRED-CENSUS **D32** / SEED §1 R21). Its corpus at `scripts/proof-no-layout-animation.mjs:284-287` is:

   ```
   const corpusFiles = [
       ...walk(resolve(ROOT, "src/styles"), [".css"]),
       ...walk(resolve(ROOT, "src/components"), [".vue", ".css"]),
   ];
   ```

   — it does NOT reach `demo/stories/**`, so the BE demo gallery's CSS-facsimile transitions (the `max-block-size`/`-webkit-line-clamp`/`inline-size` reflow lanes `proof:dock-gallery`'s G4 calls "the down-payment on the W11 `proof:no-layout-animation`→demo widening") ride un-scanned. SEED §6 precept 3 is explicit: "`proof:no-layout-animation` scans `src/styles` + `src/components` + `demo/stories/**`."

3. **The source-only `release` gates** (DEFERRED-CENSUS **D32**). FIVE BE source gates carry `tags: ["local","ci","release"]` with NO authored binding π — confirmed in `gates.mjs`: `proof:dock-fission` (l.210), `proof:metaball-bridge2` (l.234), `proof:bloom-up` (l.1316), `proof:dock-context` (l.270), `proof:dock-rail-realize` (l.1714). (`proof:celebration-burst` is already `["local","ci"]` — its π is authored here but no downgrade is owed; `proof:haptic-couple` carries NO π by design — the body-confirm is non-visual, BB inv-4.) A `release`-tagged gate ships a tag at the irreversible cut with no paint behind it — the exact source-green close the anti-disease invariant forbids.

## The mechanism

Three seams, all bookkeeping-of-truth (this wave authors π SHELLS + widens the scan + downgrades tags — it paints no `src/` surface; the actual row-flips are the integrate/fidelity/Safari waves'):

### (a) Author the absent binding-π specs (born-RED until their painting wave lands)

Author the ~8 cited specs under `tests-visual/`, each the BC/BE binding-π house shape (the `liquid-reveal.spec.ts` precedent — a both-mode region-readback over the demo route, the `pngRegionStats`-style measured assertion, NOT a screenshot diff). Each spec is **born-RED / `test.fixme`-gated against its painting wave** (the surface is unwired/grey at HEAD; the spec asserts the painted truth its wave will deliver — it RUNS and FAILS until that wave wires the engine, then GREENs). The set (computed-from-disk enrollment auto-picks them up — see (c)):

| spec | the painted readback it binds | painting wave |
|---|---|---|
| `bloom-up.spec.ts` | the 3-channel FLIP (scale-from-source-rect / opacity-couple / filter blur-settle) + the 4th `--glass-ambient-hue` FIELD-tint warming across the SAME frames + the surface carries NO hue + the PRM single-paint | W-DOCK-INTEGRATE |
| `dock-fission.spec.ts` | the n-ary detach frame-series (search blooms radial / media peels lateral / nav merges inward) on ONE `--dock-split-t` spring, the seam-tension resist+snap, box-INVIOLATE `deltaW=deltaH=0`, both modes | W-DOCK-INTEGRATE · W-FISSION-FILAMENT |
| `metaball-bridge2.spec.ts` | the N-seam neck each piece budding off ONE liquid neck, the snap-back overshoot, the neck specular-sweep ridge, the goo-OR-glass swap at `--neck-break`, PRM single-paint | W-FISSION-FILAMENT |
| `dock-context.spec.ts` | the live context→silhouette (bar → bar+pill → split), the `--silhouette-fuse-t` pill→tabbar meld reading as ONE glass plate (not pill-above-bar), the FLIP via the shipped ElementMorph | W-SILHOUETTE-REALIZE |
| `dock-rail-realize.spec.ts` | the EXPANDED facet carousel force-open, both orientations, distinct per-facet `--glass-accent` hues, `deltaW=deltaH=0` across the fan | W-RAIL-FIDELITY |
| `celebration-burst.spec.ts` | the warm-cream glass petal frame-series (scale+fade+drift on the bouncy spring), the terminal petals-gone + cascade-settled, PRM single-paint, both modes | W-JUBILANCE-WIRE |
| `liquid-grow.spec.ts` | the scroll-condense `--grow` scalar binding to the `scroll()`/`view()` timeline + touch-drag-to-grow, compositor-only, PRM-safe (the W14 feel-ask) | W-LIQUID-GROW-ON-EVENT |
| `dock-vh-compose.spec.ts` | the V↔H morph on the shipped `useDockOrientationMorph` `--dock-morph-t` (NOT a crossfade facsimile), the vertical content-reflow, both modes | W-VH-COMPOSE |

Each spec runs on `chromium-headless-new` + `coarse-touch` AND is written to ALSO run on the `webkit` project (the SEED §6 Safari-first precept — the webkit `testMatch` widening to ENROLL them is `W-SAFARI-CAPTURE`'s, T8; this wave authors them webkit-runnable so that widening is a `testMatch` edit, not a spec rewrite). The specs are `local`-tagged (real GPU + demo + the live morph); CI proves their ENROLLMENT via `proof:visual-runner`, the local close proves the PAINT (the cardinal-lesson split). `liquid-morph.spec.ts` is NOT authored — `useLiquidMorph` is the RETIRE-with-rationale orphan (D30 → `W-SPIKE-DELETE`); a π for a deleted engine is dead substrate (the census records the no-spec rationale).

### (b) Widen `proof:no-layout-animation` to scan `demo/stories/**`

Extend the `corpusFiles` array (`proof-no-layout-animation.mjs:284-287`) to ALSO walk `demo/stories/`:

```
const corpusFiles = [
    ...walk(resolve(ROOT, "src/styles"), [".css"]),
    ...walk(resolve(ROOT, "src/components"), [".vue", ".css"]),
    ...walk(resolve(ROOT, "demo/stories"), [".vue", ".css"]),   // BF.W-PI-AUTHOR
];
```

The `styleBodyOf` `<style>`-masking (l.293) + the shared reflow-set table + the NARROW NAMED allowlist all apply unchanged (a demo facsimile transition on a reflow property — `max-block-size`/`inline-size`/`-webkit-line-clamp` — now REDs; a genuine demo discrete-reclaim lands on the named allowlist with its rationale). This is the `proof:dock-gallery` G4 "down-payment on the W11 widening" discharged. The gate's existing self-test bites (a `@keyframes width`, a `transition: padding`) carry forward; a NEW demo-corpus self-test bite (a synthetic `demo/stories/_fixture` animating `inline-size` MUST flag) proves the widened scan is load-bearing.

### (c) Downgrade the 5 source-only `release` gates to `["local","ci"]`

Re-tag the 5 confirmed gates in `gates.mjs` from `["local","ci","release"]` → `["local","ci"]`: `proof:dock-fission`, `proof:metaball-bridge2`, `proof:bloom-up`, `proof:dock-context`, `proof:dock-rail-realize`. The `release` tag re-EARNS itself per-gate when its painting wave lands the binding π GREEN (the wave that flips the spec re-adds `release` to its gate — the π-present check the SEED §1 R21 names: "gate `release` behind the π-present check"). This is the honest cut floor: a `release`-tagged gate at the irreversible tag MUST have a painted readback behind it. The new π specs auto-enroll in the `--run pi` set the moment they land (`tests-visual/pi-runner-manifest.mjs`'s `enrolledSpecs()` is COMPUTED-FROM-DISK — the non-private glob minus the EXCLUDE allowlist; no manifest edit is owed for an INCLUDE, and `proof:visual-runner`'s W2 orphan-bite asserts every committed non-private spec is enrolled-or-excluded-with-rationale).

## The gate — `proof:visual-runner` + `proof:no-layout-animation` (born-RED → GREEN)

No new gate; this wave makes two EXISTING gates load-bearing on the BF surface:
- **`proof:visual-runner`** — after the specs land, its enrollment-soundness arm asserts every committed non-private `*.spec.ts` (the 8 new BF specs included) is enrolled in `--run pi` or excluded-with-rationale. A new spec NOT enrolled (or a re-hand-listed enrollment array) REDs. **Born-RED:** before the specs exist the cited-but-absent class is invisible to this gate (it only sees committed specs); the wave's binding floor is that after authoring, the 8 specs are present + enrolled + `proof:visual-runner` GREEN.
- **`proof:no-layout-animation`** — after the corpus widen, RED on any `demo/stories/**` facsimile reflow-transition. **Born-RED:** the BE demo gallery's facsimile transitions (if any survive `W-SPIKE-DELETE`'s CSS relocate) flag the moment the scan reaches `demo/`; GREEN once the demo is compositor-clean (the down-payment discharged). The new demo-corpus self-test bite proves the widened scan flags a planted demo reflow.

**What REDs on the pre-fix tree:** (1) the 8 cited specs are absent → `proof:visual-runner` cannot enroll them (the phantom-π class); (2) `demo/stories/**` is un-scanned → a demo reflow transition rides silent; (3) 5 gates carry `release` with no π → a `--run release` close ships an un-painted tag. After the wave: specs authored + enrolled, demo scanned, the 5 gates de-fanged to `local,ci`.

## The binding π — the specs THIS wave authors (the meta-case)

This wave's deliverable IS the binding-π layer — it authors the shells but does NOT flip them (the surfaces are unwired/grey at T2; the specs are born-RED, `test.fixme`-anchored against their painting wave). The binding truth of THIS wave is: (a) the 8 specs exist, are webkit-runnable, and are `proof:visual-runner`-enrolled; (b) `proof:no-layout-animation` scans `demo/stories/**` (proven by the new demo-corpus self-test bite); (c) the 5 gates carry no un-painted `release` tag. The specs GREEN downstream as their painting waves wire the engines — the close-class lie (a `release` gate with a phantom π) is structurally closed.

## The gestalt row

None of its own — this wave is the π-LAYER foundation (the third Band-0 truth wave beside `W-FOLD-LEDGER` + `W-GESTALT-WIRE`). The gestalt rows the specs back-stop are the dock-hallmark rows `W-GESTALT-WIRE` authored; the row-flips ride the painting waves.

## Fences

- **No-legacy / no phantom π.** A spec is authored ONLY for a surface a real BF wave will paint into a shipped SFC — `liquid-morph.spec.ts` is NOT authored (the engine is RETIRE-with-rationale, D30). A π for a deleted/orphaned engine is dead substrate.
- **The π is born-RED, never a green-stub.** Each authored spec asserts the REAL painted truth its wave delivers (a measured `pngRegionStats` band / a `deltaW=deltaH=0` box-invariance / a PRM single-paint) — NOT a trivially-true `expect(true).toBe(true)` placeholder (the `reflect-medium.spec.ts` anti-pattern the EXCLUDE allowlist exists to fence). It RUNS-and-FAILS until its wave wires the engine.
- **CI proves wiring, local proves paint.** The specs are `local`-tagged; CI's `proof:visual-runner` proves enrollment; the painting wave's LOCAL `--run pi` GREEN is the binding paint. Never invert this (a `ci`-tagged real-GPU morph spec is the flaky-CI class).
- **Foreign-tree fence.** The webkit-runnable authoring sets up `W-SAFARI-CAPTURE`'s `testMatch` widen — but reads ZERO sibling tree.

## Disposition links

Closes **D5** (the absent binding-π layer, BUILD → this wave) and the **gate-tag half of D32** (the 5 source-only `release` gates downgraded; the `demo/` scan widen). The bookkeeping half of D32 (the ledger ROWS recording these as BUILD) is `W-FOLD-LEDGER`'s; the gate edits are this wave's.
