# BC.W-AX-BP-LAZY — payload-delta (the bundle-graph measure)

This wave changes **ZERO paint** — the BorderProgress ring renders identically. The
binding artefact is this payload-delta table (the `profile:bundle` precedent), NOT a
pixel gestalt; the wave carries **no `proof:ba-gestalt` verdict** (the BorderProgress
PAINT gestalt is `BC.W-VISUAL-RECONCILE`'s, not this one's).

The delta: WHERE the value.js color-math leaf lands in the `/border-progress` bundle
graph — moved from the EAGER first-paint chunk behind a dynamic `import()` boundary.

## The eager-graph reach (the binding measure)

| chunk | value.js / `/color` reach | how |
|---|---|---|
| `dist/border-progress.js` **BEFORE** | **REACHED** (eager) | static `import { interpolateHue } from "@mkbabb/value.js"` + the transitive `./color-*.js` chunk (`useBorderSpectrum.ts:18-19`) |
| `dist/border-progress.js` **AFTER**  | **value.js-FREE** | imports only `./cn-*.js` + `vue`; the value.js walk is reached ONLY via `import("./spectrum-walk-*.js")` (a dynamic edge the bundler code-splits) |
| `dist/spectrum-walk-*.js` **AFTER** (new) | the value.js + `/color` leaf (the dynamic chunk) | `interpolateHue` + the `/color` `cssToOklch`/`oklchStopToHex` imports — loaded on demand the first time a consumer passes CONCRETE `#hex`/`oklch(…)` anchors |

## The gzip delta (the recorded weight move)

| chunk | raw (B) | gzip (B) |
|---|---|---|
| `dist/border-progress.js` BEFORE | 3315 | 1463 |
| `dist/border-progress.js` AFTER  | 3027 | 1363 |
| **eager Δ (removed from first-paint reach)** | **−288** | **−100** |
| `dist/spectrum-walk-*.js` (new dynamic chunk) | 857 | 503 |

The eager chunk's own gzip drops 100 B; the larger win is the **transitive** one — the
HEAD eager graph dragged the whole value.js color-math peer (the `~124 KB` peer the
`profile:budget` critical-path arm guards) into the consumer's first-paint reach via the
static `interpolateHue` edge + the value.js-bearing `./color-*.js` chunk. After the
split, a consumer riding the default `var(--…)` brand ramp (the common case —
presets-in-consumers) resolves ZERO value.js on its critical path; value.js loads on
demand only for the rare concrete-anchor consumer, off the first-paint reach.

## Why the default ramp pays nothing

`BORDER_PROGRESS_DEFAULT_SPECTRUM` is FOUR `var(--section-color-N)` token strings — the
`var()` fast path returns `[...stops]` synchronously (the value.js-free hot path, BP4),
never firing the dynamic import. The token strings resolve in the CSS cascade at paint,
so the default ring is byte-identical paint AND value.js-free payload.

## The cross-repo consume-seam (speedtest results-card)

The speedtest fleet binds `<BorderProgress coverage="bottom-edge" :value :stops :milestones>`
on `.results-card` (a FIRST-PAINT surface — `BC.W-SPEEDTEST-ADOPT`). If `phasePalette` is
`var(--chart-{phase})` tokens (the brand-ramp shape) it rides the value.js-free fast path;
if it is concrete hex anchors, value.js loads on demand off the first-paint reach. Either
way the results-card's critical path is value.js-free on first paint. The consumer
inherits the improvement transparently on its `^4.x` bump (no speedtest-side interim to
delete — a payload improvement, not an API change).

## Gates

- **`proof:bp-lazy`** (born-RED on the static-import HEAD → GREEN at the dynamic
  boundary): BP1 the eager `/border-progress` graph is value.js-free (a static-only
  critical-path walk from the subpath entry — the dynamic `import()` is NOT traversed) ·
  BP2 `spectrum-walk.ts` is the dynamic leaf reached ONLY by `import()` · BP3
  `spectrumStops` stays synchronous · BP4 the `var()` fast path is value.js-free +
  byte-identical · + a self-test bite per clause.
- **`profile:budget`** holds — `dist/border-progress.js` is OFF the tracked-budget set
  (subpath chunk under the 1024-byte budget floor), and the root-barrel critical-path
  arm was already value.js-free (border-progress is subpath-only, off the root barrel).
  The split makes the subpath chunk smaller; the budget cannot regress for it.
- **`proof:border-progress`** stays GREEN — W3's value.js/`/color`/`shorter`/CONSUME-marker
  evidence FOLLOWS the carve into `spectrum-walk.ts` (the reader-gate-follows-carve
  precedent, `proof:webgl-substrate-single` W-CARVE lineage).
- **`proof:single-color-core`** holds — value.js stays the single color-math source; it
  just loads on demand. The math is byte-faithful (the parity unit asserts it).

## Parity unit

`tests/components/custom/border-progress/spectrum-walk.test.ts` (node, device-free):
(a) the carved `walkConcreteSpectrum` walks concrete anchors to deterministic no-trough
HEX stops; (b) a `var()` ramp + the library default resolve synchronously with NO upgrade
callback fired (the dynamic import never loads value.js); (c) a concrete-anchor
`spectrumStops` returns the synchronous interim immediately AND upgrades to the perceptual
walk after the dynamic chunk resolves — and the upgraded output equals the carved leaf's
direct `walkConcreteSpectrum` (the dynamic boundary routes to the SAME math), plus the
load-once cache serves a repeated call synchronously.
