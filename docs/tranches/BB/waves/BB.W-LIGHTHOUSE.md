# BB.W-LIGHTHOUSE — mint proof:lighthouse: the never-owned performance score-floor gate (LCP/CLS/TBT) over the demo + a minimal consumer harness

**Name**: W-LIGHTHOUSE - the performance axis owned at last (a 4-tranche chronic, gate-FIRST)
**Opens after**: Batch 2 landed (the master-CI floor is green via Batch-0, the dead code retired). Runs in Batch 3 ‖ W-CSS-CRITICAL ‖ W-CARD-COMPOSITE ‖ W-PERF-PRODUCER ‖ W-PAYLOAD-DEFER (PERFORMANCE band, component-disjoint per EXECUTION-DAG §3). This wave MINTS the gate + the production-preview protocol; the three sibling waves land the FIXES the floor measures (the dependency is one-directional — see Dependencies).
**Agents**: 2 serial within the wave (`.1` mints the production-preview protocol + the `proof:lighthouse` runner + the score-floor + the consumer harness; `.2` records the born-RED baseline matrix, lands the floor at the post-fix numbers once the sibling fixes are in, and writes the DELTA — `.2` reads the protocol+runner `.1` produces, so they sequence).
**Hard gate**: `proof:lighthouse` (born-RED) — a per-surface score FLOOR (perf/a11y/CLS/TBT, mobile + desktop) over the PRODUCTION `vite preview` build of the demo SPA, PLUS a minimal consumer harness that builds a bare `@mkbabb/glass-ui` consumer app and asserts the published `/styles` + root-barrel reach do not regress the consumer's own first-paint floor. Born-RED because **no perf gate exists at HEAD** (`grep -nE 'lighthouse|web-vital|score-floor' package.json` → 0; the never-owned axis). The floors are pinned at the POST-FIX measured numbers (after W-CSS-CRITICAL + W-PAYLOAD-DEFER + W-CARD-COMPOSITE land), NOT a guessed constant. + the captured DELTA (the before/after score matrix + the network-waterfall pair, the cardinal-lesson on-disk artefact).
**Status**: SPEC

## The miss (the never-owned performance axis)

The library has **never owned performance as a tranche concern with a gate**. The chronic is 4 tranches deep:

- **AW.W32** authored `proof:lighthouse-demo` (a per-page Lighthouse floor over the demo) — IMPL-flagged, never landed.
- **AX.W39** re-formed it as the lighthouse-perf-a11y route matrix — folded into a runtime-perf wave, the score-floor arm dropped.
- **AY.W-LIGHTHOUSE** authored the most complete spec to date (`docs/tranches/AY/waves/AY.W-LIGHTHOUSE.md`) with a measured born-RED baseline (the 16 saved reports under `docs/tranches/AY/audit/design/lighthouse/`, the production-preview protocol, the four LH-G clauses) — AY FINAL §86 / §200 record it as "planned (spec authored) — named-successor deferred, no green run owed at this close." It was carried name-forward.
- **BA** closed with the chronic-deferral ledger and **silently dropped W-LIGHTHOUSE on its zero-deferral close** — the perf axis is not in BA FINAL §6, not gated, not measured.

So at HEAD there is a thorough AY-era SPEC and a measured born-RED baseline matrix — but ZERO gate, ZERO CI run, ZERO floor pinned. `grep -nE 'lighthouse' package.json` returns nothing; the only adjacent runtime gate is `proof:dock-perfection` (an onset-timing gate, not a score-floor one). The performance axis is **measured-once, gated-never** — exactly the "audit ran, no gate, regresses freely" class the BB INTEGRITY spine exists to close. This wave BUILDS the gate (the §2 chronic-fold disposition: **BUILD — mint the gate**).

The BB version strategy (§4: fold-all → ONE 4.1.0) reshapes the scope vs the AY spec: the AY spec bundled the gate WITH the render-block split (O-1), the value.js deferral (O-2), and the aurora-dock a11y wiring (O-3). In BB those FIXES are owned by sibling Batch-3 waves — **W-CSS-CRITICAL** (the critical/deferred `/styles` split, O-1), **W-PAYLOAD-DEFER** (the lazy WebGL + value.js off the critical path, O-2), **W-CARD-COMPOSITE** (the A'-3 CardHeader layout-animation CLS, the CLS lever). So W-LIGHTHOUSE is scoped to the AXIS the others lack: **the production-preview protocol + the `proof:lighthouse` runner + the per-surface score FLOOR + the minimal consumer harness + the DELTA**. It is the gate that makes the sibling fixes' wins BINDING and a regression RED — the perf axis owned, not the fixes re-implemented.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the AY-era SPEC + baseline (the perf axis was diagnosed at file:line + measured under a recorded protocol), not a blind re-diagnose (BB invariant — re-opened ≠ rebuilt-blind). The AY baseline is **7+ months stale and pre-dates W-CSS-CRITICAL/W-PAYLOAD-DEFER/W-CARD-COMPOSITE** — the impl agent MUST re-measure the born-RED baseline at HEAD (the AY numbers are the SHAPE of the analysis, never the floor values). Before pinning a floor, re-build + re-run; if a route name has drifted (the manifest `s()` factory rename) or a sibling fix has already landed, the agent records the drift in PROGRESS and re-measures — it does NOT inherit the AY numbers as the floor.

The four audited surfaces (re-confirm at HEAD — the demo router is `/:category/:story` per `demo/router.ts:7-34`, `/` redirects to the first story):
- **Home** — `/foundations/intro` (the front-door aurora HERO; `demo/stories/manifest.ts:162-165` declares `background: { kind: "aurora" }`)
- **Aurora** — `/substrates/aurora` (the heavy WebGL substrate + its config dock — the heaviest page)
- **Forms** — `/forms/inputs` (the clean primitives page, no substrate — the shared-shell-cost canary)
- **Dock** — `/dock/overview` (the GlassDock walkthrough)

RE-GROUND command set (run all; confirm each anchor):

```
grep -nE 'lighthouse|web-vital|score-floor|LCP|CLS|TBT' package.json   # MUST be 0 — born-RED proof (no perf gate)
node -e "const p=require('./package.json'); console.log(Object.keys(p.scripts).filter(k=>/light|perf|budget|profile/i.test(k)).join('\n'))"  # the adjacent gates: profile:budget (BYTE budget, not score)
sed -n '162,180p' demo/stories/manifest.ts                              # the four surface routes still resolve
sed -n '7,52p'    demo/router.ts                                        # /:category/:story + the / redirect
sed -n '1,80p'    scripts/profile-bundle.mjs                            # the byte-budget gate's artefact + cache pattern (the model to mirror)
sed -n '24,60p'   scripts/gate-output.mjs                               # gateArtifactPath / writeGateArtifact / snapshotStamp (the pure-output discipline)
sed -n '1,50p'    scripts/proof-consumers-build.sh                      # the consumer-harness precedent (constellation.mjs membership + absent-sibling skip)
sed -n '1,40p'    scripts/constellation.mjs                            # ROOT + CONSUMERS/PUBLISHERS (the consumer-set authority)
ls docs/tranches/AY/audit/design/lighthouse/                            # the 16 AY-era reports (the SHAPE; re-measure for the floor)
grep -rnE 'GLASS_UI_DEMO_URL|5199' scripts/*.mjs | head                 # the live-gate :5199 demo-server default (the gate-manifest-sound clause-4 port)
```

## The born-RED baseline (the AY-era SHAPE — RE-MEASURE at HEAD before pinning a floor)

> The AY baseline (2026-06-09, LH 13.4.0, headless Chrome, production `vite preview`, gzip-on-wire) is the analysis SHAPE, NOT the floor. It pre-dates the BB sibling fixes — the impl agent re-measures and pins the floor at the POST-FIX number. Recorded here so the wave knows what RED looks like:

```
page             form      perf  a11y    bp |     LCP     FCP    CLS    TBT     SI
home             desktop    100   100    96 |   0.7 s   0.6 s  0.023   0 ms  0.6 s
home             mobile      90   100    96 |   3.2 s   2.4 s  0.000   0 ms  2.4 s
aurora           desktop     99    90    96 |   0.9 s   0.7 s  0.032   0 ms  0.7 s
aurora           mobile      81    90    96 |   4.0 s   2.7 s  0.087  20 ms  2.7 s
forms-inputs     desktop    100   100   100 |   0.7 s   0.6 s  0.023   0 ms  0.6 s
forms-inputs     mobile      92   100   100 |   2.9 s   2.4 s  0.000   0 ms  2.4 s
dock-overview    desktop     99   100   100 |   0.8 s   0.6 s  0.011   0 ms  0.6 s
dock-overview    mobile      86   100   100 |   3.6 s   2.7 s  0.014  10 ms  2.7 s
```

Reading the SHAPE (the levers the sibling fixes target — re-confirm each is still present at HEAD):
- **Desktop is effectively perfect** (perf 99-100, LCP 0.7-0.9s, TBT 0ms). The floor's bite is MOBILE; desktop holds trivially.
- **Mobile perf 81-92** — the gap is PAINT TIMING under the throttle, NOT runtime cost (TBT 0-20ms everywhere — the JS is cheap, the thread idle). ONE shared lever dominates: the render-blocking `index.css` (~602ms mobile, W-CSS-CRITICAL's target) + the eager value.js (~21KiB unused on substrate-free routes, W-PAYLOAD-DEFER's target).
- **The aurora a11y 90** was the AY-era defect (3 unnamed `LabeledField` sliders + 1 unlabeled color input) — RE-CHECK at HEAD: BA's W-CONFIG-CHASSIS minted `<ColorSwatch>` (the native color input is now the accessible carrier) and the configurator chrome was reworked, so the color-input miss may already be CLOSED; the slider-thumb `aria-input-field-name` class must be re-probed (if still present, the residual routes to W-CHIP-GRAZE / a demo-a11y arm, NOT re-implemented here — record the exact selector).
- **The BP-96 home/aurora** is a MEASUREMENT ARTEFACT (headless `--disable-gpu` → no WebGL2 → `useWebGLCanvas` throws `WebGL2 unavailable` under `errors-in-console`), NOT a defect. The gate MUST run GPU-backed (SwiftShader) OR exempt the one WebGL2-console-error class so BP reads its real value (see the protocol).
- **The CLS 0.087 aurora-mobile** is the WebGL-hero settle + the CardHeader layout-animation A'-3 (CLS 1.03 worst-cluster, the W-CARD-COMPOSITE target). CLS is the SECOND floor lever this wave gates after W-CARD-COMPOSITE lands.

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | no `proof:lighthouse` gate exists [the headline] | `package.json` (0 matches `lighthouse`); `scripts/` (no `proof-lighthouse.mjs`); `gates.mjs` (no row) | the performance axis is measured-once (AY), gated-never; a regression in LCP/CLS/TBT reds NOTHING |
| 2 | no production-preview protocol artefact | `docs/tranches/AY/audit/design/PERF-lighthouse-demo.md:170-175` (the throwaway `.cache/vite.demo-perf.config.mts`, removed at lane close) | the AY harness was throwaway; there is no committed, re-runnable production-preview build config the gate can invoke |
| 3 | no consumer-side perf harness | `scripts/proof-consumers-build.sh` (builds consumers, asserts BUILD success only — no perf floor) | the published `/styles` monolith + root-barrel reach are byte-gated (`profile:budget`) but never SCORE-gated from a real consumer's first-paint perspective |
| 4 | the byte-budget gate is blind to PAINT timing | `scripts/profile-bundle.mjs:54-80` (gzip/raw ceilings on `dist/glass-ui.js` + `dist/styles/index.css`) | `profile:budget` gates PAYLOAD BYTES; it cannot see render-block ms, LCP, CLS, or TBT — a CSS split that holds the byte ceiling but regresses first-paint sails past it |
| 5 | AY baseline stale + pre-fix | `docs/tranches/AY/audit/design/lighthouse/*.report.json` (2026-06-09) | the 16 saved reports pre-date W-CSS-CRITICAL/W-PAYLOAD-DEFER/W-CARD-COMPOSITE + BA's whole demo redesign — re-measurement is mandatory before pinning a floor |

## Scope

The gestalt: **own the performance axis with a binding gate**, gate-first, mirroring the BB INTEGRITY spine. Not a workaround (a one-time audit), not legacy (the AY throwaway config) — a committed, re-runnable production-preview protocol + a `proof:lighthouse` runner + a per-surface score FLOOR pinned at the post-fix numbers + a minimal consumer harness, all on the existing gate-fleet machinery (`gate-output.mjs` artefacts, `constellation.mjs` consumer membership, the live-gate `:5199` default).

1. **Author the production-preview protocol as a COMMITTED, re-runnable artefact** (defect 2). The AY harness was throwaway (`.cache/vite.demo-perf.config.mts`, removed at close); this wave commits it. A `scripts/lighthouse/` helper (the demo SPA build config + the `vite preview` server bring-up + the LH config) is committed so the gate re-runs deterministically. The canonical axes (carried from the AY protocol, re-confirmed at HEAD):
   - **Artefact**: the PRODUCTION demo SPA build (minified, code-split, gzip-served) — NOT the dev server, NOT the lib-mode build. The repo's `vite.config.ts`/`vite.library.ts` are lib-mode only, so the demo SPA build is a dedicated config (root `index.html` + `@`→`src` alias + tailwind/vue plugins) committed under `scripts/lighthouse/` (NOT the gitignored `.cache/` — it must be re-runnable in CI).
   - **Server**: `vite preview` on a free high port (avoid `:5173`/`:5175`/`:5199`/`:5273`/`:4178`/`:4188` — the `:5199` live-demo default is the `gate-manifest-sound` clause-4 reserved port, so this preview picks a distinct one and resolves it the `GLASS_UI_*_URL ?? "http://…:<port>"` env-override way the house live-gates use). gzip-on-the-wire CONFIRMED (`Content-Encoding: gzip`) so transfer sizes are production-representative; SPA history-fallback verified (all routes → 200).
   - **Lighthouse**: pinned major via `npx lighthouse` (or the programmatic node API), **GPU-backed (SwiftShader `--enable-unsafe-swiftshader`) OR the WebGL2-console-error class exempted** so BP reads its real value on the substrate pages (the headless `--disable-gpu` artefact, defect note above).
   - **Desktop config**: `--preset=desktop` (no throttle, 1350×940). **Mobile config**: LH default (Moto-G-class 4× CPU + simulated slow-4G, 412×823) — THIS is the floor's bite.
   - **Throttle honesty** (the cardinal-lesson discipline): the slow numbers are the LAB throttle, NOT the host; record "observed (real paint)" vs "simulated (Lantern-projected)" separately wherever they diverge by more than ~2× (the AY slides 0.86s-observed vs 14.2s-projected is the canonical example — the gate floors on the SIMULATED-mobile number but RECORDS both).

2. **Mint `proof:lighthouse` — the per-surface score FLOOR runner** (defect 1). `scripts/proof-lighthouse.mjs` + the `package.json` key (verified ABSENT at HEAD). The runner builds the demo SPA via the §1 protocol, serves it, runs LH over the four audited surfaces × two form-factors, and ASSERTS each surface clears a RECORDED floor. The runner is **device-bound** (a live browser is required — it is tagged `["local"]` like the other π/render gates so it does NOT block headless CI mid-tranche; the `proof:live-verified-ledger` static gate enforces that the live-verification HAPPENED, the house pattern at `gates.mjs:30-42`). The floor SHAPE:
   - **Desktop floor**: `perf ≥ 99`, `a11y ≥ 100` (the re-measured per-page number; aurora ≥ 100 IFF the a11y misses are closed by BA's config rework — else the achieved number), `CLS ≤ 0.04`.
   - **Mobile floor (the bite)**: `perf ≥ <post-fix number>` — born-RED at the HEAD pre-fix baseline (~81-92), pinned at the number ACHIEVED after W-CSS-CRITICAL + W-PAYLOAD-DEFER land (the floor is the achieved value + a small tolerance band, NEVER a lowered bar). `TBT ≤ 50 ms` (the JS-is-cheap invariant the analysis confirms — a regression that pushes TBT up reds even if the score holds). `CLS ≤ <post-W-CARD-COMPOSITE number>` (the layout-animation CLS lever closed).
   - The floor numbers are stored in a COMMITTED, reviewed baseline file (the `profile-bundle.mjs` read-baseline-vs-write-profile discipline at `:42-51` — the gate READS the committed floor; only a deliberate `--rebaseline` flag re-pins it, so drift is a real measurement against the last reviewed point, never self-erasing).

3. **A focused load-lever arm** (the W-CSS-CRITICAL + W-PAYLOAD-DEFER wins MADE BINDING). The runner (or a sibling read-arm `proof:load-levers`) reads the LH diagnostics JSON and ASSERTS:
   - `render-blocking-insight` for the demo's `index.css` is below a recorded ms ceiling on the mobile profile (born-RED at the HEAD ~602ms; GREEN after W-CSS-CRITICAL splits/defers it — this wave does NOT split the CSS, it GATES the split).
   - `unused-javascript` for `value.js` on a substrate-FREE route (forms/dock) is below a recorded KiB ceiling (born-RED at the HEAD ~21KiB eager-unused; GREEN after W-PAYLOAD-DEFER defers it — this wave GATES the deferral).
   The bite-check (anti-evasion): reverting the CSS split → the render-block ms climbs back over the ceiling → RED. This is the arm that makes the sibling waves' wins non-regressing.

4. **The minimal consumer harness** (defect 3 — the charge's "minimal consumer harness"). A bare consumer app — a single-route Vite app that `import`s `@mkbabb/glass-ui` + `@mkbabb/glass-ui/styles` and mounts ONE glass surface (a Card + a Button over a page wash, the smallest representative consumer) — built from the BUILT `dist/` (the contract-v2 dev-resolution model, CLAUDE.md §"The self-emission class") and Lighthouse-scored against a recorded consumer FLOOR. This proves the PUBLISHED artefact's first-paint reach, not just the demo's (the demo imports library SOURCE; a consumer imports the bundle — they diverge, and only the consumer harness sees the published `/styles` monolith the way a real app does). The harness lives under `scripts/lighthouse/consumer-app/` (committed, re-runnable), reuses the `constellation.mjs` membership + absent-sibling skip discipline (`proof-consumers-build.sh` precedent) so it never hard-fails in a siblings-absent CI checkout, and asserts the consumer's `render-blocking` + LCP clear the recorded floor (born-RED if the published `/styles` monolith blocks the consumer's first paint over the documented ms ceiling — the W-CSS-CRITICAL `/styles` split decision's consumer-facing proof).

5. **The captured DELTA + the cardinal-lesson ledger row** (the binding own-surface evidence). The before/after LH score matrix (the born-RED baseline vs the post-fix GREEN) + the `render-blocking-insight` network-waterfall pair land at `docs/tranches/BB/audit/visual/W-LIGHTHOUSE-DELTA.md` with the AZ-form freshness headers (the capture date + the demo build hash + the LH version per the cardinal-lesson freshness discipline). The `proof:live-verified-ledger` BB row for W-LIGHTHOUSE carries the DELTA artefact (filename matched `^W-LIGHTHOUSE-*` per the ledger clause), NOT a prose "improved" claim. A score-floor wave is a measured wave — no row marks the floor held without the report pair on disk.

6. **Register the gate + record the canon.** `proof:lighthouse` registered in `package.json` + the `gates.mjs` registry (tagged `["local"]` — device-bound, like the π/render gates) + added to `proof:all`/the parity manifest so `proof:gate-script-parity` + `proof:gate-manifest-sound` stay green. CLAUDE.md gains a "Performance gate" note under the §Build/§Gate-hygiene canon naming `proof:lighthouse`, the production-preview protocol, the per-surface floor, and the consumer harness (the axis is now owned + documented).

## Triumvirate Dispatch

- **The sibling-fix dependency is one-directional, NOT a fork license.** This wave GATES the W-CSS-CRITICAL / W-PAYLOAD-DEFER / W-CARD-COMPOSITE wins; it does NOT implement them. If the re-measured born-RED baseline shows a load lever the three sibling waves do NOT cover (a new render-blocking resource, a fresh eager chunk BA introduced), that is a SCOPE-REVEAL: triumvirate (research the residual lever, name the owning wave or a `BB.W-LOAD2` successor), do NOT widen this wave into a CSS split or a chunk-boundary edit. The gate floors on the achieved number; an under-delivering sibling fix that leaves the floor un-clearable is a sibling-wave miss owed back to it, not a loop here.
- **Floor-pinning before the sibling fixes land is a sequencing trap.** The floor is the POST-FIX number — if the impl agent must pin a floor before W-CSS-CRITICAL/W-PAYLOAD-DEFER/W-CARD-COMPOSITE have landed, that is the §3-style sequencing fall: pin the floor at the BORN-RED baseline (so the gate is genuinely red), record the floor as PROVISIONAL, and re-pin at the post-fix number when the siblings land (the `--rebaseline` flag, recorded in PROGRESS). Do NOT pin a guessed post-fix floor (a fabricated green) — the floor must be a MEASURED number.
- **The aurora a11y 90 may already be closed (a re-grounding, not a re-implement).** If the re-probe at HEAD finds BA's config rework already cleared the unlabeled-color-input miss (the `<ColorSwatch>` native carrier) and only the slider-thumb `aria-input-field-name` residual remains, that residual is a DEMO-a11y fix owed to W-CHIP-GRAZE / a demo-a11y arm (the same class) — record the exact selector + route it; do NOT widen this gate into the aurora-dock SFC. If a11y is ALREADY 100 at HEAD, the floor is `a11y ≥ 100` (the achieved number) and the LH-G3-equivalent arm is a regression guard.
- **The GPU-backed-vs-exempt decision is a protocol choice, not a loop.** If the SwiftShader GPU-backed run is flaky in CI (a known headless-LH limitation) and three attempts have not stabilized BP on the substrate pages, halt and triumvirate the protocol decision (exempt the one WebGL2-console-error class explicitly + record it in the protocol artefact, the AY note's fallback) — do NOT loop on the headless config. The gate's POINT is the perf/CLS/TBT floor; BP on the WebGL pages is a measurement-artefact axis, not the bite.

## File Bounds

| File | Access |
|---|---|
| `scripts/proof-lighthouse.mjs` | create (the born-RED score-floor runner) |
| `scripts/lighthouse/preview-build.config.mts` | create (the committed, re-runnable production demo-SPA build config) |
| `scripts/lighthouse/protocol.mjs` | create (the `vite preview` bring-up + LH config + the four-surface × two-form-factor sweep + the GPU-backed/exempt decision) |
| `scripts/lighthouse/consumer-app/` | create (the minimal bare-consumer Vite app — one Card + Button over a wash, importing `@mkbabb/glass-ui` + `/styles` from `dist/`) |
| `scripts/lighthouse/floor.baseline.json` | create (the committed, reviewed per-surface floor — read by the gate, re-pinned only via `--rebaseline`) |
| `package.json` | modify (register `proof:lighthouse` + add to `proof:all`/parity; the protocol-helper script keys) |
| `scripts/gates.mjs` | modify (register the gate row, tags `["local"]` — device-bound) |
| `docs/tranches/BB/audit/visual/W-LIGHTHOUSE-DELTA.md` | create (the before/after score matrix + waterfall pair + the AZ-form freshness headers) |
| `CLAUDE.md` | modify (the "Performance gate" canon note under §Build/§Gate-hygiene) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge row + the cardinal-ledger row) |

Read-IF (cohesion only, NOT edited):
- `scripts/profile-bundle.mjs` — the byte-budget gate's artefact/cache pattern + the read-baseline-vs-write-profile discipline (the model the floor.baseline.json mirrors).
- `scripts/gate-output.mjs` — `gateArtifactPath`/`writeGateArtifact`/`snapshotStamp` (the pure-output cache discipline the runner reuses).
- `scripts/constellation.mjs` + `scripts/proof-consumers-build.sh` — the consumer-set membership + absent-sibling skip (the consumer harness reuses this).
- `demo/stories/manifest.ts` + `demo/router.ts` — the four surface routes (read to confirm the route names at HEAD).
- `docs/tranches/AY/waves/AY.W-LIGHTHOUSE.md` + `docs/tranches/AY/audit/design/PERF-lighthouse-demo.md` + the 16 saved reports — the analysis SHAPE + the protocol (re-measured, never inherited as the floor).

Do NOT touch:
- **W-CSS-CRITICAL's bound** — the critical/deferred `/styles` split, the `src/styles/index.css` cascade carve, the `proof:css-critical` gate. This wave GATES the split's mobile-render-block win (scope 3 arm 1); it never carves the CSS. No file written by both.
- **W-PAYLOAD-DEFER's bound** — the lazy WebGL chunk split + value.js off the critical path, the demo `manualChunks` boundary, the `profile:budget` extension. This wave GATES the unused-JS win (scope 3 arm 2); it never edits a chunk boundary or the byte budget.
- **W-CARD-COMPOSITE's bound** — the CardHeader scroll-shrink compositor-safe rewrite, the `proof:no-layout-animation` gate. This wave GATES the resulting CLS floor (scope 2 mobile-CLS); it never edits the CardHeader keyframes.
- **W-PERF-PRODUCER's bound** — the value.js A′ runtime-perf cluster (zombie canvas, dock-morph restyle, aurora DPR cap, dock-glyph density) — that wave owns per-FRAME runtime cost; this wave owns first-paint/LCP/payload + the score-floor. Disjoint protocols (it measures rAF cost on a headed GPU dev server; this measures first-paint under throttle on a production preview).
- **W-CHIP-GRAZE / the demo-a11y arm** — if the aurora-dock slider-thumb `aria-input-field-name` residual is still live at HEAD, the fix is owed there (record the selector + route it). This gate floors a11y; it never wires the demo-chrome name.
- **The standing fences** — the GL shader internals (aurora.frag/metaball.frag — never touched; the protocol RUNS the demo, it does not edit a shader); ppmycota purple (no token edit); the slides `docs/tranches/M/`/`N/` + the value.js/fourier/kf trees (foreign — the slides-side Lighthouse arm is W-SLIDES-HANDOFF coordination only, the AY LH-G4 cross-repo dependency, NOT this wave's gate).

### Disjointness

Two agent units, SERIAL within the wave (`.2` reads the protocol + runner `.1` creates):
- **W-LIGHTHOUSE.1 (the gate + protocol + harness)** writes `scripts/proof-lighthouse.mjs` + `scripts/lighthouse/*` (the protocol, the build config, the consumer app) + `scripts/lighthouse/floor.baseline.json` + the `package.json`/`gates.mjs` registrations. It produces the born-RED runner (red because no floor is cleared at HEAD — the baseline is the pre-fix state).
- **W-LIGHTHOUSE.2 (the baseline + floor + DELTA)** re-measures the born-RED baseline at HEAD, pins the floor at the post-fix numbers once the sibling fixes land (the `--rebaseline` flag), writes `W-LIGHTHOUSE-DELTA.md`, and records the canon in CLAUDE.md + the PROGRESS/ledger rows. It reads `.1`'s protocol + runner; no `modify` path is shared (the `floor.baseline.json` is created by `.1` empty/provisional and re-pinned by `.2` via the runner's `--rebaseline`, not hand-edited by both).

Across Batch 3: W-CSS-CRITICAL (`src/styles/*` carve + `proof:css-critical`), W-PAYLOAD-DEFER (chunk boundaries + `profile:budget`), W-CARD-COMPOSITE (CardHeader keyframes + `proof:no-layout-animation`), W-PERF-PRODUCER (the value.js A′ runtime cluster) — all file-bound-disjoint from this wave by construction (this wave writes only `scripts/proof-lighthouse.mjs` + `scripts/lighthouse/*` + the gate registrations + the DELTA/doc). The registry single-owner rule: W-LIGHTHOUSE owns its own `package.json`/`gates.mjs` row; the byte-budget block stays W-PAYLOAD-DEFER's.

## Hard Gate

`proof:lighthouse` (born-RED at HEAD — no perf gate exists; driven GREEN by the wave once the sibling fixes land + the floor is pinned at the achieved numbers). Falsifiable witnesses, each red at HEAD pre-wave:

1. **W1 — the gate + protocol exist + run.** `npm run proof:lighthouse` resolves a runner that builds the demo SPA via the committed protocol, serves it via `vite preview`, and runs LH over the four surfaces × two form-factors, emitting the score matrix to a `gate-output.mjs` artefact. RED-equivalent at HEAD: `grep -nE 'lighthouse' package.json` → 0 (no key, no runner). Assert shape: the gate's JSON artefact carries `{ surfaces: 4, formFactors: 2, protocol: "production-preview" }` and a non-empty score matrix.

2. **W2 — the per-surface score FLOOR holds (the bite).** Each surface × form-factor clears its RECORDED floor (read from the committed `floor.baseline.json`): mobile `perf ≥ <pinned>`, `TBT ≤ 50ms`, `CLS ≤ <pinned>`; desktop `perf ≥ 99`, `CLS ≤ 0.04`; a11y `≥ <achieved>`. RED at HEAD: the floor pinned at the post-fix number reds against the pre-fix baseline (mobile perf 81-92 < the post-W-CSS-CRITICAL/W-PAYLOAD-DEFER target). **Bite-check (anti-evasion)**: revert the CSS split → mobile perf drops below the floor → RED; push TBT up → RED even if perf holds; the floor is the ACHIEVED number, NOT a lowered bar (a wave that lowers the floor to dodge a regression fails the `--rebaseline`-only-via-review discipline — the baseline is a committed, reviewed file).

3. **W3 — the load levers are measured-down.** The focused arm reads the LH diagnostics JSON and asserts `render-blocking-insight` for `index.css` < the recorded mobile-ms ceiling AND `unused-javascript` for `value.js` on a substrate-free route < the recorded KiB ceiling. RED at HEAD: ~602ms render-block + ~21KiB eager-unused (the pre-fix levers). GREEN after W-CSS-CRITICAL + W-PAYLOAD-DEFER land. Assert shape: `facts.renderBlockMs <= ceiling` AND `facts.unusedValueJsKiB <= ceiling`.

4. **W4 — the consumer harness clears its floor.** The minimal bare-consumer app (built from `dist/`, importing `@mkbabb/glass-ui` + `/styles`) is Lighthouse-scored and its `render-blocking` + LCP clear the recorded consumer floor. RED at HEAD: the published `/styles` monolith blocks the consumer's first paint over the documented ceiling (born-RED until the W-CSS-CRITICAL `/styles`-split decision lands its consumer-facing win). **Bite**: a published-bundle regression (a new eager leaf dragged onto the consumer's critical path) reds this even if the demo gate holds (the consumer imports the bundle, the demo imports source — they diverge). Skip-by-policy in a siblings-absent checkout (the `constellation.mjs` absent-sibling discipline — never a hard-fail when a sibling is absent).

5. **The π/DELTA binding readback** (the cardinal-lesson, captured own-surface, both form-factors): `docs/tranches/BB/audit/visual/W-LIGHTHOUSE-DELTA.md` records (a) the before→after score matrix (the born-RED baseline vs the post-fix GREEN, per surface × form-factor), (b) the `render-blocking-insight` network-waterfall pair (the ~602ms → post-split ms), (c) the `proof:lighthouse` born-RED log (no floor cleared) vs the GREEN-at-close log, (d) the consumer-harness before/after, (e) the AZ-form freshness headers (capture date + demo build hash + LH version) so the ledger freshness clause reads them. This is a MEASURED wave — the DELTA is the report pair on disk, not a prose "improved" claim.

6. **The `proof:live-verified-ledger` row** (W-CARDINAL-INFRA / the BB ledger). The BB ledger row for W-LIGHTHOUSE carries the DELTA artefact (filename matched `^W-LIGHTHOUSE-*` per the ledger clause), with the freshness header parsed (the W-LEDGER-REPAIR Batch-0 fix makes the ledger gate actually read the rows). No row marks the floor held without the report pair.

W1 (gate exists) is device-bound but structural; W2-W4 are the binding score/lever/consumer floors; W5-W6 are the captured-DELTA + ledger truth. The gate is tagged `["local"]` (device-bound) so it does not block headless CI mid-tranche; the ledger static gate (ci) enforces the live-verification HAPPENED — the house π-gate pattern.

## Format And Lint Cadence

`node scripts/proof-lighthouse.mjs` born-RED before the floor is pinned (proof it fails at HEAD — no floor cleared); GREEN at close after the sibling fixes land + the floor is re-pinned at the achieved numbers. `npm run build` green (the demo SPA build config must compile; the published `dist/` the consumer harness imports must be fresh). `npm run proof:gate-script-parity` + `npm run proof:gate-manifest-sound` after the `package.json`/`gates.mjs` registration (the gate registry stays sound; the `:5199` clause-4 port is untouched — the preview picks a distinct port). `npm run proof:live-verified-ledger` after the DELTA lands (the ledger row reads the freshness header). `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BB/audit/visual/W-LIGHTHOUSE-DELTA.md` — the before/after score matrix (per surface × form-factor), the render-blocking-insight waterfall pair, the consumer-harness before/after, the born-RED→GREEN `proof:lighthouse` logs, the AZ-form freshness headers.
- The `proof:lighthouse` JSON artefact (the born-RED no-floor-cleared log + the GREEN-at-close score matrix).
- The committed production-preview protocol (`scripts/lighthouse/*`) — the re-runnable harness (NOT a throwaway `.cache/` config).
- The `proof:gate-script-parity` + `proof:gate-manifest-sound` output post-registration.
- The `proof:live-verified-ledger` output (the W-LIGHTHOUSE row with the DELTA + freshness header).

## Commit Plan

- gate/protocol commit (`.1`): `feat(perf): mint proof:lighthouse score-floor + the committed production-preview protocol + the consumer harness (BB.W-LIGHTHOUSE)` — names the runner + the `scripts/lighthouse/*` protocol + the consumer-app + the floor.baseline.json in the body.
- baseline/floor commit (`.2`): `test(perf): pin the proof:lighthouse per-surface floor at the post-fix numbers + the born-RED→GREEN DELTA (BB.W-LIGHTHOUSE)` — names the re-measured baseline + the `--rebaseline` floor pin + the W-LIGHTHOUSE-DELTA capture.
- registration commit: `test(gate): register proof:lighthouse (local-tagged, device-bound) + parity (BB.W-LIGHTHOUSE)`.
- doc/status commit: the CLAUDE.md Performance-gate canon note + the BB PROGRESS row + the cardinal-ledger row.

## Dependencies

- **Depends on**: Batch 0 (master CI green — the perf gate runs under the repaired harness, W-CLOSE-BATTERY's full-set rule) + Batch 1 (W-LEDGER-REPAIR — the cardinal-ledger gate must actually parse rows for the W-LIGHTHOUSE DELTA row to be read). SOFT-depends on the SAME-BATCH siblings landing their FIXES before the floor is pinned at the post-fix number: **W-CSS-CRITICAL** (the render-block split, the W3-arm-1 lever), **W-PAYLOAD-DEFER** (the value.js deferral, the W3-arm-2 lever), **W-CARD-COMPOSITE** (the CLS lever, the W2-mobile-CLS floor). The dependency is one-directional — this wave GATES their wins; the floor is pinned LAST in the batch (the orchestrator sequences the floor-pin after the three fixes land; pre-fix the floor is PROVISIONAL at the born-RED baseline).
- **Blocks**: W-REFLECT3 (Batch 7 close) — the close is `complete` IFF the perf axis is owned (master CI green + the gestalt + the visual-π runner + `proof:lighthouse` green). The performance chronic is now BUILT (the §2 disposition), so the BB close does not inherit a 5th-tranche perf re-book. W-CLOSE (the 4.1.0 cut) runs the full release battery including `proof:lighthouse` per the W-CLOSE-BATTERY full-set rule.

## Archaeology

Prior attempts: AW.W32 (`proof:lighthouse-demo`, IMPL-flagged, never landed), AX.W39 (folded into the runtime-perf wave, the score-floor arm dropped), AY.W-LIGHTHOUSE (the most complete spec — a measured born-RED baseline + the protocol + four LH-G clauses — carried name-forward, AY FINAL §86/§200 "planned, no green run owed"), and BA's silent zero-deferral drop. The new guardrail: this wave's close state is a BINDING `proof:lighthouse` gate registered in the fleet + a committed, re-runnable protocol (NOT a throwaway `.cache/` config) + a pinned floor in a reviewed baseline file — so the perf axis cannot survive as a "planned, deferred" name-forward again. The cardinal lesson is the binding floor: a score-floor wave is a MEASURED wave; the DELTA report pair on disk + the ledger row (made real by W-LEDGER-REPAIR) is the truth, not a prose claim. The four-tranche carry ends here — BUILT, not re-booked.

## Named successors

- If the re-measured born-RED baseline surfaces a load lever the three sibling waves do NOT cover (a fresh render-blocking resource or eager chunk BA introduced), it routes to a named `BB.W-LOAD2` with the exact unsplit resource (recorded, never a silent carry).
- If the aurora-dock slider-thumb `aria-input-field-name` residual is still live at HEAD, the demo-a11y fix is owed to **W-CHIP-GRAZE / the demo-a11y arm** (the same class) with the exact selector recorded — this gate floors a11y, it does not wire the demo-chrome name.
- The slides-side Lighthouse arm (the AY LH-G4 cross-repo dependency — eager-image lazy/de-prioritize + the LCP-stagger lift + the font preload over the deck) is **W-SLIDES-HANDOFF** coordination (the slides team owns the deck edit on the BA-4.0.0 adopt + the redeploy greenlight); recorded as the cross-repo dependency, NOT this wave's gate (the foreign-tree fence).
- The bf-cache ineligibility (the AY one-line headed-run follow-up) is a LOW-priority non-blocker — recorded, not gated (it is a back/forward-nav nicety, not a first-load metric).
