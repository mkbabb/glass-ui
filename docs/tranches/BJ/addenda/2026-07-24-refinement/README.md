# BJ REFINEMENT — 2026-07-24

**This refines BJ. It opens no new tranche.** Phase: tranche development only — no source edits land from
this folder. HEAD at audit `0371836d`; package 7.0.0 live on npm.

## Read in this order

| file | what it is |
|---|---|
| **`REFINEMENT.md`** | the plan of record: why BJ needs refining (measured), **the six laws**, the band DAG, the completion model, what this supersedes |
| **`REGISTRY.md`** | finding families A–N, X, Y, Z, grouped by underlying mechanism, each with a terminal disposition and an owning wave |
| **`ROUND-1-FINDINGS.md`** | the evidence base — 136 findings from 12 independent audit lenses (30 blocker · 72 major · 22 minor · 12 observation). **Source of record; cite by id, never restate.** |
| **`WAVES.md`** | the wave set: born-RED gates with RED-at-HEAD conditions, π/DELTA obligations, breakage |
| **`ECOUTE.md`** | every owner item — 76 rows — with a prior-closure verdict measured against the pre-complaint commit. **One of 76 is closed.** |
| **`REDUCTION.md`** | the reduction, re-authored defect-first after two adversarial critics rejected the first attempt; §1 records every killed claim |
| **`DAG.md`** | the deterministic component/library graph, its method, and its two refuted predecessors |
| **`MOTION-CANON.md`** | the measured motion law: the corrected spring table, lead/lag ranks, the material split, exit asymmetry |
| **`IOS27-ARCHIVE.md`** | photometric re-analysis of the iOS-27 corpus — the graded-blur mechanism, the vaporize, the corner affordance, the frost quadruple |
| **`COMPONENT-WAVES.md`** | tier-1 per-component specs (8). **Read the provenance note** — single-seat, benches died on quota. |
| **`BAND-FOLD.md`** | cross-component reconciliation of the tier-1 cut |
| **`ASK.md`** | 33 owner questions reduced to 6. **Silence advances the recommendation.** |

## The headline results

- **`npm test` is RED at HEAD**, and `release.yml:48` runs it immediately before `npm publish` at `:50`.
- **The published package is broken two ways.** `@mkbabb/keyframes.js` is declared *optional* yet is
  statically reachable from the root entry through `Button`; and the type surface resolves **empty** under
  `node16`/`nodenext` because `dist/index.d.ts` re-exports with extensionless specifiers in a
  `"type":"module"` package. Both lead-reproduced. The `value.js` quarantine, by contrast, **works** — the
  audit misattributed it.
- **The WebKit crash is localised — and re-scoped.** Playwright-WebKit crashes 5/5 whenever the demo
  mounts; it is a **threshold effect on the population of `color-mix()`-valued custom properties** (~38
  survive, ~46 die, 249 shipped), with the `@supports` guards innocent. **But real Safari 26.4 renders
  every route perfectly** — 302 nodes on `/`, exactly matching Chromium. It is a **test-harness defect,
  not a product defect**; the S0 framing is withdrawn and the wave moves out of Band 0.
- **"Trite, shiny and bright" is solved, and the cause is the opposite of a tuning problem.** Measured live
  on the two surfaces you named: `.segmented-tabs` and `.glass-track-well` both compute
  **`backdrop-filter: none`** — they are ~50% opaque cream veils with **no blur at all**, and the tabs plate
  carries **white inset specular highlights** at 0.30 alpha. There is no frost to soften; there is no frost.
  The slider proves it internally — its *fill* is correctly frosted at `blur(7px) saturate(1.4)` while the
  *track it sits in* has none. The blur radius was never the defect.
- **Duplication is largely refuted; superfluity is confirmed.** Exactly one component pair of 1,891 clears
  the similarity bar. **42 of 62 components — 67% of the component tree — have zero `src` consumers.**
- **The comment stock is the largest, safest reduction in the library.** `src` is 39.4% comment;
  `src/styles/tokens/` is 72.8%; the dock is 51.7%. This gates any LOC-ranked decision, because the
  frontier's own inputs are one-third prose.
- **One owner row of seventy-six is closed.** The dominant failure is **verdict laundering by proximity** —
  a row's file changed, so the row read as worked, while the property the owner named never moved. That
  gap is what **Law 6** exists to close.

## Standing caveats

- **Safari is live**, but `webkit-engine` and `safari-app` are **separate cells** and neither discharges
  the other — proven here, where they gave opposite answers and the difference inverted an S0.
- **`COMPONENT-WAVES.md` is single-seat.** Its challenge and jury benches died on a model quota; the
  foremen re-derived independently and say so. The apotheosis pass re-runs them.
- **One contradiction is open and deliberately unresolved:** the motion canon argues `--glass-saturate-*`
  **down** on warm cream; the iOS photometry measures transmission saturation **+62%** and argues up.
  `WAVES.md` `W-FROST` makes the measured quadruple the gate and lets the first paired capture settle it.
