# BG.W-DOCK-PANE-OVERLAP — dual-engine paint judge DELTA

> **Role:** fresh NON-AUTHORING paint judge (did not build this wave). Verifies the PAINTED
> truth of the DockLayerGroup pane-swap OVERLAPPED-crossfade + the box-flip-monotonic invariant
> against IOS27-MOTION-TRUTH §2.2/§4.5, never the builder's claim.
> **Wave:** `BG.W-DOCK-PANE-OVERLAP` (F3.R2) · **Route:** `/dock/layers`
> **Date:** 2026-07-04 (re-judge after FIX landed) · **Engines:** Chrome CDP (real Chrome 149 /
> ANGLE Metal Renderer Apple M5 Max) + Safari off-screen WKWebView (system WebKit.framework /
> Apple GPU) · **Modes:** light + dark
> **Fence honored:** operated ONLY under `/Users/mkbabb/Programming/glass-ui`; zero
> `src`/`demo`/`styles`/`scripts` edits (verified the landed fix, did not author it); no `/tmp`
> PNG/DELTA output (repo-local `.wkshot-bin` used for the WebKit leg); no sibling under
> `~/Programming` touched. `verify-siblings-intact.mjs --quiet` exit 0 before + after.

## VERDICT: **PASS** — the box-flip-monotonic invariant HOLDS + the overlapped crossfade stays correct

The prior FAIL (2026-07-04, same day) had the visible plate box COLLAPSE to the 53.68px pill
mid-swap (`dipRatioOfRest 0.199`, 31 dip frames) while the opacity crossfade was already
correct. The FIX — `--dock-expand-t` DECOUPLED from the pane-swap crossfade via
`:not([data-pane-swap])` guards in `dock/morph.css` + the `dockMorphContext` `isOuter` /
`data-pane-swap` seam — has LANDED and PAINTS: the box now HOLDS its expanded footprint
(269.12px, `min == max`, ZERO dip frames) across all 31 morph frames on a nested layer swap,
`--dock-expand-t` stays pinned at 1 (never cycles to 0), and the P1/P2/CO/DZ/SWAP opacity
crossfade stays green. Verified on **real Metal (ANGLE Metal Renderer Apple M5 Max)** in Chrome
via an on-screen trusted-click rAF frame-series, both modes, both nested cases; the settled
paint provenance confirmed in **system WebKit (Apple GPU)** both modes.

| criterion (§2.2/§4.5) | light rail-group | light nested-collapsible | dark rail-group | dark nested-collapsible | verdict |
|---|---|---|---|---|---|
| **P1** entering engages by t≈0.15, ramps UP (→1.0) | PASS | PASS | PASS | PASS | ✅ |
| **P2** leaving persists to t≈0.6, ramps DOWN | PASS | PASS | PASS | PASS | ✅ |
| **CO** co-presence (both >0.3 alpha) | PASS (3) | PASS (3) | PASS (3) | PASS (3) | ✅ |
| **DZ** no neither-<0.3 dead-zone | PASS (0) | PASS (0) | PASS (0) | PASS (0) | ✅ |
| **SWAP** overlapped handoff (enter≥0.5 while leave>0.05) | PASS | PASS | PASS | PASS | ✅ |
| **P3** box FLIP no dip below endpoints | **PASS** | **PASS** | **PASS** | **PASS** | ✅ |
| **EXPANDT** no spurious collapse on swap | **PASS** | **PASS** | **PASS** | **PASS** | ✅ |

`verdict.json` `overallPass: true` (both modes × both cases, all seven checks green).

## The box-FLIP invariant — the part that WAS the FAIL, now PASSES

Chrome on-screen Metal, per-frame `getBoundingClientRect().width` on the VISIBLE `.glass-dock`
plate during a single trusted LAYER SWAP (tab 0 → tab 1, dock already expanded,
`--dock-expand-t`=1 at rest):

| measure | prior FAIL (HEAD) | **this judge (FIX)** |
|---|---|---|
| rest plate width | 269.12px | 269.12px |
| **min plate width during swap** | **53.68px** (collapse to pill) | **269.12px** (held) |
| max plate width during swap | 269.12px | 269.12px |
| **dip frames (< rest − 2px)** | **31** | **0** |
| dipRatioOfRest | 0.199 | n/a (no dip) |
| **`--dock-expand-t` min during swap** | **0** (spurious collapse) | **1** (held) |
| morph frames observed | 31 | 31 |

Identical PASS numbers across `dock-layer-rail-group` (always-expanded) + `dock-nested-collapsible-group`
(collapsible), both modes. `min(A,B)−ε ≤ box(t) ≤ max(A,B)+overshoot` holds every frame — the
box never dips toward the 44/53px collapsed-pill footprint on a pane swap.

## The overlapped-opacity crossfade — the part that already PASSED, still green

Measured per-frame off `--dock-morph-t` (Chrome, on-screen Metal, 60fps), light rail-group:

| t | entering opacity | leaving opacity |
|---|---|---|
| 0.317 | 0.334 | 0.471 |
| 0.361 | 0.421 | 0.399 |
| 0.408 | 0.516 | 0.320 |
| 0.453 | — | 0.245 |
| 0.498 | — | 0.170 |

Entering engages by t≈0.15 and ramps to 1.0; leaving persists to t≈0.5 and ramps down; **3
co-present frames** with BOTH >0.3 alpha; **0 dead-zone frames**; enter crosses 0.5 at t≈0.41
while leave is still 0.32 (overlapped handoff). No sequential-out→blank→in dead-zone, no
double-exposure ghost. The three source CSS rules (`hasOverlapRule`/`hasEnterRule`/`hasReserveRule`)
resolve true in both modes.

## Computed structure facts (both modes, both engines' Chrome-measured DOM)

- `groupCount: 5`, **`standaloneGroupCount: 0`** — EVERY DockLayerGroup nested in a `<GlassDock>`
  (the box is owned by the orchestrator `dockMorphContext`, the `--dock-expand-t` convex-blend
  path — the exact path the fix guards; `useLayerTransition`'s standalone reserve/clip-reveal is
  correctly not exercised on this route).
- `glCount: 0` — the `/dock/layers` DockStage aurora renders as the recessive CSS/2D warm field
  (no live WebGL context on this route; the aurora reads soft — no conic banding, no
  oversaturation).
- `mainChildren: 2` (hero cluster + body), `bodyTextLen: ~2112` (real content).
- 5 groups: `dock-layer-drill-group`, `dock-layer-rail-group`, `dock-rail-layer-group`,
  `dock-nested-collapsible-group`, `dock-vertical-overflow-group` — all `insideGlassDock: true`.

## The fix (verified in source, NOT authored here)

- `src/styles/dock/morph.css` — the three `[data-morphing]` `--dock-expand-t` derivation arms are
  all guarded `:not([data-pane-swap])` (expanded/always-expanded at lines 70-72, collapsed at
  75-76). During a nested pane swap `[data-pane-swap]` is armed, so these arms do NOT match and
  `--dock-expand-t` falls back to the static class endpoint (1 for an expanded dock) — the box
  HOLDS.
- `src/components/custom/dock/composables/dockMorphContext.ts` — `onSwap` distinguishes the OUTER
  collapse↔expand target (`isOuter:true`, owns the box) from a NESTED pane-swap target, arming
  `data-pane-swap` ONLY on the nested swap (`ensureSpringRunning(!t.isOuter)` at line 313) and
  clearing it on settle (`removeAttribute("data-pane-swap")` at line 188). `--dock-morph-t` still
  glides 0→1 to drive the overlapped opacity crossfade + inner stagger (both read `--dock-morph-t`
  directly, untouched); only the BOX scalar `--dock-expand-t` is decoupled.
- The OUTER collapse/expand box morph is byte-identical to HEAD (an outer target arms no
  `data-pane-swap`, so its `--dock-expand-t` derivation is unchanged).

## Method (reproducible)

```
# 0 · siblings tripwire (before + after) — exit 0
node scripts/verify-siblings-intact.mjs --quiet
# 1 · BUILT library + demo dist on :5200
npm run build && npm run demo:dist:build && npm run demo:dist:serve   # vite preview :5200
# 2 · real Chrome 149 with CDP
"/Applications/Google Chrome.app/…/Google Chrome" --remote-debugging-port=9477 \
  --user-data-dir=/tmp/chrome-cap-verify-profile "--remote-allow-origins=*" about:blank &
# 3 · Chrome CDP frame-series (on-screen Metal, 60fps trusted clicks) — the BINDING box measure
CDP_URL=http://localhost:9477 node docs/tranches/BG/audit/visual/BG.W-DOCK-PANE-OVERLAP-chrome-capture.mjs
node docs/tranches/BG/audit/visual/BG.W-DOCK-PANE-OVERLAP-verdict.mjs   # → verdict.json overallPass:true
# 4 · Safari off-screen WKWebView settled captures (both modes) — provenance + settled paint
docs/tranches/BG/audit/.wkshot-bin "http://localhost:5200/?capture=%2Fdock%2Flayers&mode=light" \
  …/paneloverlap-layers-safari-light.png light 15000
docs/tranches/BG/audit/.wkshot-bin "http://localhost:5200/?capture=%2Fdock%2Flayers&mode=dark"  \
  …/paneloverlap-layers-safari-dark.png  dark  15000
```

**On the WebKit frame-series limit (unchanged from the prior judge):** an off-screen WKWebView
throttles/suspends `rAF`, so the `SpringProgress`-driven `--dock-morph-t` glide is not
measurable off-screen in WebKit. The BINDING computational box-FLIP truth is therefore the Chrome
CDP measurement (on-screen, real rAF/Metal, both modes); the WebKit leg supplies the settled-paint
provenance + the engine badge. The box behavior is engine-agnostic (the same `dockMorphContext`
spring + `morph.css`/`layers.css` CSS cascade), so the Chrome measure is authoritative for the box.

## Evidence on disk (`BG.W-DOCK-PANE-OVERLAP-paint/`)

| png | engine | mode | dims | real | provenance badge (decoded from pixels) |
|---|---|---|---|---|---|
| `paneloverlap-layers-chrome-light.png` | CHROME (CDP) | light | 2880×1800 | true | ENGINE CHROME · ANGLE Metal Renderer Apple M5 Max · LIGHT |
| `paneloverlap-layers-chrome-dark.png` | CHROME | dark | 2880×1800 | true | ENGINE CHROME · ANGLE Metal Renderer Apple M5 Max · DARK |
| `paneloverlap-layers-safari-light.png` | WEBKIT (off-screen WKWebView) | light | 2880×1800 | true | ENGINE WEBKIT · Apple GPU · LIGHT |
| `paneloverlap-layers-safari-dark.png` | WEBKIT | dark | 2880×1800 | true | ENGINE WEBKIT · Apple GPU · DARK |

Plus `chrome-frameseries.json` (raw per-frame series, both modes × both cases) and `verdict.json`
(`overallPass: true` — P1/P2/CO/DZ/SWAP/P3/EXPANDT all green). All 4 settled PNGs
`isRealPng: true` (89504e47 signature), 2880×1800, mode-differentiated (light near-white page /
dark near-black page), warm-cream/aurora chroma; distinct engine typography (Chrome vs system
WebKit) + the decoded top-left engine badge confirm provenance FROM the pixels. The settled route
renders correctly in BOTH engines (hero fits its envelope + blurb + recessive aurora DockStage
field + the left nav dock + the bottom nav dock + all 5 DockLayerGroups' expanded plates); the box
holds through the swap — no transient collapse.

## Fences honored

Operated ONLY under `/Users/mkbabb/Programming/glass-ui`. No `/tmp` PNG/DELTA output (the WebKit
binary used is the repo-local `docs/tranches/BG/audit/.wkshot-bin`). No sibling under
`~/Programming` touched/moved. Zero `src`/`demo`/`styles`/`scripts` edits (the fix was verified in
source, not authored). `demo:dist:serve` + Chrome CDP killed on completion.
`verify-siblings-intact.mjs --quiet` exit 0 before AND after.
