# W-aurora — Aurora band inventory (AX tranche, HEAD c72d2ac)

Read-only step-back inventory of the Aurora band. Scope: the DONE core
(W07/W10/W11/W12/W13) + the PLANNED tail (W14/W38/W47). Covers the configurator idiom
(D1), van-Gogh discoverability (D2/W47), and the WebGPU parity/excise decision (W14).

---

## 1. Status matrix (DONE / PARTIAL / NOT-STARTED / AT-RISK)

| Wave | Title | PROGRESS status | Source-verified state | Inventory verdict |
|------|-------|-----------------|------------------------|-------------------|
| **W07** | Aurora core unblock — WGSL black canvas | complete | `WEBGPU_PARITY=false` lands in `renderMode.ts:39`; f32-cast + storage-buffer transposition shipped; `proof:aurora-webgpu-render` audit json `status:green` (RE-PROBED GREEN on real Metal 3/3 + bite-checks) | **DONE** (live-verified) |
| **W10** | Aurora options converge — atoms door | complete | `resolveAtoms` is the single door; atoms panel wired into live UI; dead `deriveScene` excised; `mediumOptions` exposes van-Gogh in `<select>`; audit json `green-pending-live-visual-truth` → closed by orchestrator live pass per A-tranche audit | **DONE** (live-verified) |
| **W11** | Aurora color seams — OKLCh catch-light + palette-ramp twin | complete | OKLCh catch-light helper landed; palette-ramp twin hoisted; README/DESIGN planned→landed sweep DONE (0 stale `(planned` tags remaining) | **DONE** |
| **W12** | Mediums substrate — StrokeProfile + noise basis | complete | StrokeProfile + paintStrokeLayers extracted; net-new integer-PCG GLSL hash authored + spliced into both `aurora.frag.ts` + `aurora.wgsl.ts` | **DONE** |
| **W13** | van-Gogh + oil-pastel first-class mediums | complete | `AuroraMedium` union carries `vangogh`/`oil-pastel`/`crayon` first-class (`presets.ts:61-68`); first-class bodies, no passthrough; TWO live integration defects fixed (crayon in atoms MEDIA list + van-Gogh sparse-fill); `proof:aurora-painterly-statistics` GREEN 2/2 viewports | **DONE** (live-verified) |
| **W14** | WebGPU painterly parity OR excise | planned | `gpuRuntime.ts` (170 lines) draws SINGLE-PASS, "BAKES NO pass-count/tensor/Kuwahara-sector"; NO `gpuPasses.ts` multi-pass compositor; `painterly.wgsl.ts` + `wake.wgsl.ts` still present as DEAD scaffold; NO `device.lost` handling anywhere in aurora/; `WEBGPU_PARITY=false` still gates webgpu off | **NOT-STARTED** (decision unresolved — §4) |
| **W38** | Aurora-Configurator glass-atoms RESTYLE | planned | `proof:configurator-glass-atoms` NOT registered (grep count 0); no W38 audit json; chrome unrestyled | **NOT-STARTED** |
| **W47** | Aurora preset-roster reconcile (name van-Gogh) | planned | `presets.ts` still has `OIL_VANGOGH` baking `medium:"oil"`, labeled "Oil Swirl" (`:499`); ZERO `medium:"vangogh"` and ZERO `medium:"crayon"` in roster; `CRAYON_*` keys bake `oil-pastel` labeled "Pastel"; no W47 audit json; gate `proof:aurora-preset-roster` not registered | **NOT-STARTED** (full wave doc authored, born-RED witnesses confirmed live) |

**Band health summary.** The aurora CORE is DONE and live-verified — the black-canvas
blocker (W07), the options convergence (W10), the OKLCh seams (W11), the mediums substrate
(W12), and the first-class van-Gogh/oil-pastel mediums (W13) all closed GREEN against the
real device. The TAIL is three NOT-STARTED waves: **W14** (WebGPU painterly — the dead
scaffold decision), **W38** (configurator glass-atoms restyle), **W47** (the van-Gogh
discoverability fix). Nothing in the band is AT-RISK or PARTIAL — the split is clean
DONE-core / NOT-STARTED-tail.

---

## 2. The DONE core — what shipped (W07/W10/W11/W12/W13)

### W07 — aurora core unblock (DONE, live-verified)
The device-proven black-canvas root cause was TWO compounding WGSL defects, jointly fixed:
the int-in-float type mismatch (i32 struct fields written into a `Float32Array` →
bit-pattern reads → out-of-bounds `samplePalette` → black) resolved via the all-f32-uniform
+ in-shader `i32()` cast; the `var<uniform>` dynamic-index Metal miscompile resolved via the
`var<storage,read>` Field-buffer transposition. The CONVERGE harden's load-bearing finding
landed: **the gating seam is NOT a flip of an existing option** — a NEW internal
`WEBGPU_PARITY` const in `renderMode.ts:39` (NOT a consumer prop) gates the `'webgpu'`
branch in `resolveRenderModeAsync`, returning `'webgl'` while false. W07 sets it `false`;
W14 owns the flip. `proof:aurora-webgpu-render` re-probed GREEN 3/3 on real Metal.

### W10 — atoms door (DONE, live-verified)
Collapsed to ONE consumer-facing control model: dead `deriveScene` + its `AuroraMood` union
+ duplicated `thirdsNuclei` excised; `resolveAtoms` is the single front door (COLOR / ZONES
/ NOISE / MEDIUM / texture / MOTION ≤7 atoms); `AuroraConfigDock` rebuilt to drive the
atoms. The named consumer-#2 leg (speedtest E2 `deriveAurora` adoption) routes to W34, NOT
absorbed here. The audit json read `green-pending-live-visual-truth`; the A-tranche wave
audit lists W10 among "complete + live-verified (W07-W17 closed on the real device)."

### W11 — color seams (DONE)
The OKLCh migration was CONFIRMED-CORRECT (not a redo) — this wave was SEAM-level only:
the shared `warmCatchLight(L,C,h)` CPU helper (consumed by both blob `warmCream` + aurora
`lightColor`, deleting the eyeballed sRGB literal), the palette-ramp twin hoisted to the
shared `procedural-color` chunk (GLSL+WGSL), and the README/DESIGN **planned→landed sweep**
— verified DONE (0 `(planned` tags remain in README.md / DESIGN.md).

### W12 — mediums substrate (DONE)
`StrokeProfile` struct + `profileFor(medium,mode)` selector + parameterized
`paintStrokeLayers(profile)` extracted (DRY at the substrate, differentiated at the medium).
The CORRECTION held: the integer-PCG GLSL hash was NET-NEW (no in-tree GLSL hash existed;
`utils/prng.ts` is CPU mulberry32, unrelated) — authored fresh in the shared chunk + spliced
into both `aurora.frag.ts` and `aurora.wgsl.ts` per the OETF/FBM_ROT single-source
discipline.

### W13 — first-class van-Gogh + oil-pastel (DONE, live-verified)
The `mediumVangogh` body is first-class (no longer a `return mediumOil(...)` passthrough);
oil-pastel split from crayon (shared SUBSTRATE not dispatch body); crayon promoted to a
first-class `AuroraMedium` (`uMedium==4`, the legacy `strokeMode:"crayon"` peer-route
REMOVED clean-break). TWO live integration defects were fixed (the cardinal lesson at the
integration layer): (1) crayon was missing from the atoms-panel `MEDIA` list — the π gate
hung on `selectOption("crayon")`; (2) van-Gogh rendered as a continuous smear (gap-fraction
0.002 vs the 0.04 floor) — fixed with the profile-driven Layer-4 `densityFill` +
height-gated `groundFloor` darken. `proof:aurora-painterly-statistics` GREEN 2/2 viewports.

**The W13→W47 handoff is the critical incomplete link.** W13 shipped + gated the medium
BODY against a gate-CONSTRUCTED `vangogh` config and live-verified GREEN — but its FileBounds
EXCLUDE `demo/stories/aurora/presets.ts`. The demo's named-preset roster silently stayed on
pre-W13 oil. This is the W47 defect (§3.3 below) — the exposure-layer instance of the
cardinal lesson.

---

## 3. The NOT-STARTED tail — what remains

### 3.1 W14 — WebGPU painterly parity OR excise (NOT-STARTED; decision unresolved)
**Source-verified state.** `gpuRuntime.ts` (170 lines) draws SINGLE-PASS; its own header
comment confirms it "BAKES NO pass-count / tensor format / Kuwahara-sector-count … exactly
as the WebGL2 single-pass fragment shader does." There is NO `gpuPasses.ts` (the multi-pass
ping-pong compositor the wave spec calls for). `painterly.wgsl.ts` + `wake.wgsl.ts` are
present and imported by gpuRuntime + aurora.wgsl.ts + DESIGN.md but are DEAD EXPORTS (the FBO
ping-pong plumbing the W14 spec says "is missing" is indeed missing). There is NO
`device.lost` handling anywhere in `src/components/custom/aurora/` — the silent-failure trap
the spec flags persists. `WEBGPU_PARITY=false` still gates the webgpu branch off.

**The unresolved decision (the headline of this wave — §4 note 14 disposition).** The
"re-enable the WebGPU default until medium parity" framing is UNMEETABLE by the wave chain:
W13 shipped GLSL/WebGL2 mediums ONLY; the WGSL single-pass twin never gained a medium
dispatch; W14's Kuwahara multi-pass is a separate painterly FINISH, not the six per-fragment
mediums. The de-facto answer (matching the single-source-shader charter + the W14 "OR
excise" branch): keep WebGPU as an OPT-IN enhancement over a parity-floor field, DELETE the
"re-enable the auto-default" framing, and EXCISE the dead `painterly.wgsl.ts`+`wake.wgsl.ts`
scaffold — OR build the real multi-pass compositor in `gpuPasses.ts`. **This wave is a fork,
not a build-out, and the fork must be picked.** The `device.lost` subscription (a
befitting-silent browser-API fallback to WebGL2, NOT a fail-explicit throw) lands regardless
of which branch.

### 3.2 W38 — Aurora-Configurator glass-atoms RESTYLE (NOT-STARTED) + D1 augment
**Source-verified state.** `proof:configurator-glass-atoms` is NOT registered in package.json
(grep count 0); no W38 audit json exists; the Configurator chrome is unrestyled. W38's
authored scope is the LIBRARY restyle of the three Configurator SFCs (`Configurator.vue` /
`ConfiguratorLayer.vue` / `ConfiguratorRow.vue`) onto the iOS-26 glass-atoms spine
(preset-chip glass-tier active state, layer-trigger glass-button + press-spring, control-row
`.glass-material`, full data-slot sweep). DependsOn W09 (the glass-atoms/specular spine —
note W09's D11 radials were absorbed by W52, which is DEVELOPED) + W10 (DONE).

**The D1 augment MUST fold in (deferred item).** D1 ("aurora configurator not idiomatic")
is a DEMO-CHROME defect distinct from W38's library-SFC restyle. Source-confirmed:
`AuroraAtomsPanel.vue` (the DEFAULT-visible surface) carries **9 native controls** (4 native
`<select>`, 4 native `<input type=range>`, 1 `type=color`); **0 uses of `LabeledSelect`** in
the entire aurora demo. The enum-as-panel-nav category error persists (`BouncyTabs
variant=pill` used to pick a single enum value — but note W53 unified BouncyTabs onto
`SegmentedTabs`, so the demo's `BouncyTabs` references are themselves now stale/broken
bindings — see Gaps §5). D1's verdict: AUGMENT W38 (extend the demo arm from "class-string
alignment only" to a real demo-chrome idiom pass on `AuroraAtomsPanel.vue` +
`config/*Layer.vue`), OR carve a sibling **W38b** for born-RED-gate disjointness
(library-SFC gate vs demo idiom pass) — the convergence plan recommends W38b. RATIFY-BEFORE-
IMPL: the `type=color` seed swatch (3 sites) — mint a `ColorSwatch` primitive (≥2-consumer
decision) or keep the deliberate native hex-paste affordance (matching `OklchStopRow`'s
documented rationale).

### 3.3 W47 — Aurora preset-roster reconcile / van-Gogh discoverability (NOT-STARTED)
**Source-verified state — all four born-RED witnesses confirmed live at HEAD:**
- `medium:"vangogh"` in `demo/stories/aurora/presets.ts` → **ZERO** matches (witness 1).
- `PRESET_META.OIL_VANGOGH` labeled **"Oil Swirl"** baking `medium:"oil"` (`:499`); "Van
  Gogh" paints nowhere visible (witness 2).
- The three W13 first-class mediums {vangogh, oil-pastel, crayon} are NAMED for ZERO on the
  strip; `medium:"crayon"` → ZERO presets bake it; the `CRAYON_*` keys all moved to
  `oil-pastel` (the key lies about its medium) (witness 3).
- The medium display name is hand-typed in two unsynced places — `config/options.ts`
  `mediumOptions` (canonical "Van Gogh"/"Oil Pastel"/"Crayon", CONFIRMED present `:20-22`)
  vs `PRESET_META` `sub` prose that has already drifted (witness 4).

The full wave doc (`waves/AX.W47-aurora-preset-roster-reconcile.md`) is authored: it is a
DEMO-CONTENT reconciliation (no library edit, no token) — repoint `OIL_VANGOGH`→`VANGOGH`
(`medium:"vangogh"`+`strokeOrient:"tensor"`, drop dead `strokeMode`, label "Van Gogh"),
rename `CRAYON_*`→`OILPASTEL_*` (name oil-pastel), add a NEW `CRAYON` hero
(`medium:"crayon"`, dry/matte, `impasto:0`), and one-source the `sub` medium-segment off
`mediumOptions` via a demo-internal `mediumLabel()`. The new gate
`proof:aurora-preset-roster` (device-free source-structure parse + fail-closed π
thumbnail-readback tier) is NOT registered. The W13 consumed surface IS landed
(`AuroraMedium` union confirmed `:61-68`; `mediumOptions` confirmed). **W47 is the demo
consumer-adoption of W13 — a small, fully-specced, self-contained content wave ready to
execute.**

---

## 4. The configurator idiom (D1) cross-cut — W38 vs W47 vs W10

The configurator surface has THREE distinct seams the band must keep DISJOINT:
- **W10 (DONE)** — the FUNCTIONAL atoms-door wiring + `AuroraConfigDock` Atoms↔Advanced
  split + `config/options.ts` `mediumOptions` (where van-Gogh IS exposed). Explicitly
  deferred the visual restyle.
- **W38 (NOT-STARTED)** — the LIBRARY glass-atoms VISUAL restyle of the three Configurator
  SFCs. + the **D1 demo-chrome augment** (the 9 native controls → `LabeledSelect`/
  `LabeledSlider`; enum-`BouncyTabs`/`SegmentedTabs` → `LabeledSelect`; hand-rolled sections
  → `ConfiguratorLayer`/`Row`). Recommended split: W38 (library) + W38b (demo idiom).
- **W47 (NOT-STARTED)** — the demo preset-roster CONTENT (the van-Gogh hero repoint + naming
  + the crayon hero + one-sourced labels). Touches ONLY `presets.ts` data, never the chrome.

These are file-disjoint and parallel-dispatchable. The sequencing constraint: W38's library
restyle settles the Configurator section recipe BEFORE the W38b demo controls skin it; W47 is
independent of both (it edits the DATA the chrome renders, not the chrome).

---

## 5. Gaps, deferred items, and plan divergences

1. **W14 decision is a FORK that must be PICKED, not deferred.** The wave is authored as
   "wire OR excise," but the de-facto answer (excise the dead scaffold + keep WebGPU opt-in
   over a parity-floor, DELETE the re-enable-default framing) is recorded in §4 note 14 and
   the W14 CONVERGE folds. The inventory's path-forward (§6) is to make this an explicit
   ratify-at-wave-open so the dead `painterly.wgsl.ts`+`wake.wgsl.ts` are not left as
   forbidden dead scaffold. The `device.lost` befitting-silent fallback lands regardless.

2. **W53 stale-binding hazard in the W38/D1 demo arm (CONVERGENCE divergence).** D1 (authored
   pre-W53) targets the `BouncyTabs variant="pill"` enum-misuse in `MediumLayer.vue`/
   `FlowLayer.vue`/`CompositionLayer.vue`/`AuroraConfigDock.vue`. W53 (DEVELOPED) UNIFIED
   BouncyTabs onto `SegmentedTabs` with a clean break (no alias). The aurora demo's
   `BouncyTabs` call-sites are therefore now either already-migrated or STALE/BROKEN bindings
   — the W38/W38b demo idiom pass must re-census the actual current call-sites (per the
   glass-ui-binding-verification MEMORY: stale reka/tabs bindings silently no-op) before
   transposing onto `LabeledSelect`. This is a fold-in, not a new gap.

3. **W47 / W38b / W38 are all UN-REGISTERED gates.** None of `proof:aurora-preset-roster`,
   `proof:configurator-glass-atoms`, or a W38b demo idiom gate exist in package.json. Each
   must be born-RED-authored at its wave open (the W00 fail-closed lane discipline + the
   meta-gate parity match).

4. **W47 audit json absent.** No `docs/tranches/AX/audit/W47*.json` — the born-RED→GREEN
   ledger + paired-π BEFORE/AFTER thumbnail-strip capture is owed at wave execution.

5. **ColorSwatch ratify (D1) is an open ≥2-consumer decision.** 3 native `type="color"`
   sites (atoms seed, palette derive-seed, `OklchStopRow` hex-paste). Mint a `ColorSwatch`
   library primitive (overfitting-bar-clearing if ≥2 consumers) OR keep the deliberate native
   hex-paste affordance. This is a RATIFY-BEFORE-IMPL gate in W38b, not a silent default.

6. **No band-level divergence from the charter otherwise.** The DONE core matches the AX.md
   wave specs; the tail is correctly scoped. The only structural note: the convergence pass
   correctly identified W47 as net-new (D2) and W38/D1 as an augment — both dispositions are
   recorded in the convergence plans and the W47 wave doc, with no double-assignment.

---

## 6. The gestalt PATH FORWARD (planning, not code)

The aurora band is in good shape: the hard graphics blockers are DONE and live-verified. The
tail is three independent, well-specced waves. The idiomatic path:

**W47 first (smallest, fully-specced, highest user-visible value).** The van-Gogh
discoverability fix is a pure demo-content reconciliation with a complete wave doc + four
confirmed born-RED witnesses. It consumes the LANDED W13 surface (no library edit). It is
the exposure-layer close of the cardinal lesson — W13's medium is real but invisible on the
most-prominent surface. Sequence: author the born-RED `proof:aurora-preset-roster` gate (+ π
thumbnail tier), repoint the van-Gogh hero + name oil-pastel + add the crayon hero +
one-source the label, then close on the executed VISUAL-TRUTH live audit (the "Van Gogh"
thumbnail re-bakes to atomic dabs, not the old oil smear) per the W00 paired-π protocol.

**W14 second — DECIDE the fork at wave-open, then execute one branch cleanly.** Make the
"excise vs build multi-pass" a ratify-before-impl gate. The precept-clean default (single-
source-shader charter + no-dead-scaffold): EXCISE `painterly.wgsl.ts`+`wake.wgsl.ts`,
re-scope WebGPU to a pure single-pass parity backend, DELETE the "re-enable the auto-default"
framing (keep `WEBGPU_PARITY` opt-in only), and land the `device.lost`→WebGL2 befitting-
silent fallback. If the multi-pass painterly finish is judged worth the build, author
`gpuPasses.ts` as the ping-pong RT ladder — but that is the larger commitment and is NOT
required for the band to be coherent. Either way: NO dead scaffold survives the wave.

**W38 + W38b third (the configurator idiom).** W38 restyles the three library Configurator
SFCs onto the glass-atoms spine (born-RED `proof:configurator-glass-atoms`); W38b runs the
demo-chrome idiom pass (the 9 native controls → `LabeledSelect`/`LabeledSlider`, the enum
pickers → `LabeledSelect`, the hand-rolled sections → `ConfiguratorLayer`/`Row`). Two hard
preconditions: (a) re-census the actual current tab call-sites post-W53 (the BouncyTabs→
SegmentedTabs unification may have left stale bindings — verify, don't assume); (b) RATIFY
the ColorSwatch mint-or-keep-native decision before touching the seed swatches. Sequence W38
(library) before W38b (demo) so the demo controls skin the FINAL section recipe. W38 depends
on W09's glass-atoms spine (absorbed by W52, DEVELOPED) — confirm that spine is settled live
before W38 opens.

All three close on the W00 fail-closed π lane + an executed VISUAL-TRUTH live audit — never
a headless gate alone (the cardinal lesson). The band carries no quick-fix or workaround
risk; the only judgment call is the W14 fork, which this inventory recommends resolving as
EXCISE (precept-clean, matches the charter).
