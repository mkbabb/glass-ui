# Tranche AW — the dock motion-language rebuild + the aurora/blob painterly perfection + the convergence primitives

AW is glass-ui's post-AV tranche. AV shipped 3.3.0 (the AU+AV cut) — the aurora OETF
fix, the slider two-only collapse, the god-module decomposition, the DI factory pair, the
iOS-26 Liquid Glass token edits — and the deep-audit verdict on the primitive set is
**well-built and cohesive (the AW work is a targeted fix pass, not a rebuild)**. AW lands the
ONE high regression that shipped with 3.3.0 (the GlassDock simple-collapse width-morph froze
when AV.W9 fixed the layer-switch), perfects the two procedural backdrops the research fans
named (aurora painterly + blob droplet), prunes the orphans a spot-verify clears, and ships
the convergence primitive the slides arm is the 2nd consumer of (the Constellation on a
`useCanvas2D` substrate). NO landed AV work is re-litigated.

**Plan basis** — `RECAP.md` (the disposition ledger: every session ask → DONE/FOLD/PARTIAL),
`audit/avg-deep-audit-digest.md` (the fold ledger + the convergence plan), and the five
research digests under `audit/research/` (`dock-animation-digest.md`, `aurora-digest.md`,
`blob-digest.md`, `code-quality-digest.md`, `frontend-convergence-digest.md`) plus the two
path-forward syntheses (`aurora/PATH-FORWARD.md`, `blob/PATH-FORWARD.md`). Every wave cites the
digest section it lands. glass-ui HEAD is `afdc485`, branch `at-dock-convergence`, version
**3.3.0 published on npm**.

**Format** — mirrors AV (`AW.md` charter + `PROGRESS.md` + per-wave specs under `waves/` +
`FINAL.md`). This file is the CHARTER only — DEV (it writes no `src`). The per-wave specs
(`waves/AW.W1-dock-collapse-regression.md`, `waves/AW.W7-aurora-painterly.md`, …) are authored
by the sibling fleet, each matching `precepts/instructions/tranche/WAVE_SPEC.md §1-11`. AW.W0
(formalize + spot-verify) is the only DEV wave; W1-W18 are IMPL.

---

## §0 — The directive → disposition

The user's AW-round asks (from `RECAP.md`), each → one disposition row. No ask is silently
absorbed; the disposition cites the RECAP line.

| # | The user's directive (AW round) | Disposition |
|---|---|---|
| D-1 | **"the simple two-layer collapse is broken"** (dock width does not morph) | **AW.W1 HEADLINE (HIGH).** The slides e2e found the regression: AV.W9 fixed the `DockLayerGroup` layer-switch but broke GlassDock's own collapse — state toggles to expanded, width stays stuck at collapsed. Shipped in 3.3.0. AW.W1 fixes it under a behavioral frame-timing gate (`RECAP §2`). |
| D-2 | **"dock shrinks first, THEN items fade — the lockstep lag"** | **AW.W2 (HIGH).** The parent/children desync: child opacity ties to the inner spring settle, not the outer morph start. One-timeline lockstep so opacity begins when both boxes start morphing (`RECAP §2`). |
| D-3 | **"dock animations not springy / iOS-like"** + the rail/wrap/slider refinement | **AW.W3.** Unify the motion language onto one spring family across collapse/switch/press; absorb the dock-with-slider interaction, the multi-row wrap morph, and the DockLayerGroup rail polish into the layering refinement (`RECAP §2`). |
| D-4 | **"make aurora stunning — genuinely painterly oil-pastel + van-Gogh atomic brushstrokes"** | **AW.W4 (the four-fold painterly arc).** The structure-tensor orientation keystone, the height-field impasto relight, the energy-graded van-Gogh medium (tensor strokes + impasto + OKLCh jitter), the reworked deposition/scumble oil-pastel bake — all on the WebGL2 single-pass path (`aurora/PATH-FORWARD.md §1`). |
| D-5 | **"full OKLCh + a derive-color front door"** | **AW.W5 (opens FIRST in the aurora band — W4 consumes its jitter seam).** Move the linear-sRGB palette interpolation + the YIQ hue jitter onto the value.js Ottosson OKLCh core; ship the `deriveScene(seed, mood)` authoring entry over a single seed (`aurora/PATH-FORWARD.md §0`). |
| D-6 | **"keep the wispy-sky default; simplify the option set"** + WebGPU + interactivity | **AW.W6 + W7 + W8.** ADDITIVE `resolveAtoms` authoring door — a small atom set maps to the full `AuroraConfig`, the default atoms resolve to the wispy-sky default, NOTHING removed from `AuroraConfig` (W6); the gated WebGPU render path behind `navigator.gpu` (WebGL2 stays the declared fallback, W7); the fully-dynamic interactive mode on request (W8) (`aurora/PATH-FORWARD.md §0`, `RECAP §4`). |
| D-7 | **"make the blob stunning — visual style, interaction, mood; perfect, performant, dynamic"** | **AW.W9-W11.** The lit iridescent droplet (fake-normal specular + Fresnel rim + OKLCh iridescence), the soft-body squish + felt pointer model, the mood/state system wired-or-excised (`blob/PATH-FORWARD.md §1`, `RECAP §5`). |
| D-8 | **"why do all the glass-panels suck?"** + the broken card toggles + the datatable split | **AW.W12-W15.** The glass-panel svg-filter-tier variant collapse (five rungs → one), the card-toggle perception trap, the DataTable colocation split, the styling/composable hygiene (`frontend-convergence-digest`, `code-quality-digest`). |
| D-9 | **"where's our slides primitive with the bottom bar — abstract it into glass-ui"** | **AW.W16 + W17.** Ship the `DeckProgress` composition over the existing `Progress` fill (W16); land the Constellation component + the `useCanvas2D` substrate (W17; AV.W8 gated-not-landed at 1 consumer, the slides H is consumer #2) (`RECAP §6`, `avg-deep-audit-digest §3`). |
| D-10 | **"the orphan resolution"** (instrument/glyph/disco-glyph, metric-cell/stack) | **A DEDICATED orphan-resolution wave** (the sibling fixer authors it; the `AW.W14-datatable-split.md` file is DataTable-split ONLY — it carries no orphan/metric-cell scope). After a mandatory W0 spot-verify (consumer counts through re-export aliases per `SPEC §"Audit-verdict spot-verification gate"`): migrate-off-and-remove OR keep-and-document, with the metric-cell/stack hidden dep surfaced before any prune (`RECAP §1`). |
| D-11 | **"the READMEs"** (dock, aurora, blob, constellation) | **AW.W19 (the close wave).** The four research-backed READMEs ride the gate-fleet + π-lane + `FINAL.md` close (LAST); the W18 slot now holds the gate-pattern access-modal idiom (`RECAP §6`). |

---

## §1 — Where AW stands (re-ground, HEAD `afdc485`)

HEAD `afdc485`, branch `at-dock-convergence`, version **3.3.0 published on npm** (the AU+AV cut;
release run cited in `MEMORY project_publish_ci_broken`). The deep-audit verdict on the AV+AU
primitive set is **strong architectural discipline** — of 19 large components only `DataTable.vue`
(442) clearly exceeds the god-module threshold, colocation is consistently applied, no orphan
composables (`code-quality-digest §1`). AW is therefore a **refinement-and-perfection tranche**,
not a corrective successor: it lands the one regression the static gates could not catch (the
simple-collapse width-morph — same gate-vs-runtime gap class AV.W9 named for the layer-switch),
perfects the two backdrops the research fans proved have headroom, and ships the convergence
primitives the ≥2-consumer rule now clears.

**The regression — the AW.W1 headline.** AV.W9 retired the AU.W8b dual-driver and made the
`DockLayerGroup` multi-layer switch animate (runtime-verified 40→197 over 12 frames). It also
broke the SIMPLE two-layer collapse — the default + `#collapsed` slot path that slides consume:
the state toggles to expanded, but the width does not morph (stuck at collapsed width). This
shipped green in 3.3.0 because the dock-motion gate samples the layer-switch path, not the
plain-collapse path. AW.W1 fixes it AND widens the gate to sample BOTH paths so this class
cannot ship green again (`RECAP §2`, `avg-deep-audit-digest §1 row 1`).

**AW's braids:**
1. **The dock motion-language** (W1-W3) — the simple-collapse regression fix, the one-timeline
   lockstep, the unified iOS spring family across collapse/switch/press + the slider/wrap/rail
   refinement. Grounded against `dock-animation-digest` (the M3 Expressive spatial-vs-effects
   spring separation, the `.bouncy` morph spring, the velocity-continuity-on-retarget).
2. **The aurora painterly engine** (W4-W8) — the OKLCh color core + derive-color front door
   (W5, opens FIRST in the band), the four-fold painterly arc (structure-tensor + impasto-relight
   + van-Gogh medium + reworked oil-pastel — W4, consumes W5's OKLCh jitter seam), the ADDITIVE
   `resolveAtoms` authoring door (W6 — nothing removed from `AuroraConfig`), the gated WebGPU
   backend (W7), the interactivity (W8). Grounded against `aurora/PATH-FORWARD.md`.
3. **The blob droplet** (W9-W11) — the lit iridescent surface material, the soft-body + felt
   interaction, the mood system. Grounded against `blob/PATH-FORWARD.md`.
4. **The component fix pass** (W12-W15) — the glass-panel tier collapse, the affordance lifts
   (8%-border, gold-audacious cream-on-cream text, goo-blob `var()` throw), the DataTable split,
   the colocation/naming hygiene. Grounded against `frontend-convergence-digest` +
   `code-quality-digest`.
5. **The convergence + close** (W16-W19) — the `DeckProgress` composition (W16) over the existing
   Progress fill, the Constellation + `useCanvas2D` (W17, the 2nd-consumer unblock), the
   gate-pattern access-modal idiom (W18), the gate-fleet close + the four READMEs (W19).

The `waves/` dir holds the per-wave specs this table references.

---

## §2 — The wave table (W0-W19 · 4 bands + gate-pattern + close)

The tranche runs four bands plus the gate-pattern wave and a close wave. **Band A (W1-W3)** is the
dock motion-language — AW.W1 (the simple-collapse regression) is the HIGH headline, AT-disjoint,
opens FIRST. **Band B (W4-W8)** is the aurora painterly engine (W5 — the OKLCh color core — opens
BEFORE W4, which consumes its jitter seam). **Band C (W9-W11)** is the blob droplet. **Band D
(W12-W15)** is the component fix pass. **Band E (W16-W17)** is the convergence (W16 DeckProgress,
W17 Constellation). **W18** is the gate-pattern access-modal idiom; **W19** is the gate-fleet + READMEs
close (LAST). Each wave names a falsifiable HARD gate; the gate is RED on HEAD and GREEN at close.

| Wave | What | Type | HARD gate (one-line, falsifiable) |
|---|---|---|---|
| **AW.W0** | **Formalize + spot-verify (DEV).** Write `AW.md`+`PROGRESS.md`; re-ground against HEAD `afdc485`; bind zero-deferral at open (P-Inv 28). Run the overfitting spot-verify BEFORE any retire wave: every cited path EXISTS (ls/Read), every rg consumer-count re-run verbatim, every "zero consumers" claim resolved through re-export aliases (instrument-chassis/instrument-rail, glyph-face/disco-glyph, metric-cell/metric-stack — see `SPEC §"Audit-verdict spot-verification gate"`). | DEV | `proof:aw-w0-reground` — `AW.md`+`PROGRESS.md` exist; HEAD `afdc485` ancestor-reachable; every digest fold tagged; the spot-verify ledger records EXISTS + verbatim-rg-count + alias-resolved verdict for every W14 retire candidate; a hallucinated item or under-count halts the close |
| **AW.W1** | **DOCK SIMPLE-COLLAPSE REGRESSION FIX (the HIGH headline).** Restore the GlassDock two-layer collapse (default + `#collapsed`) width morph that AV.W9 broke when it fixed the layer-switch. ONE size authority across both the collapse path AND the layer-switch path (the regression is the two paths diverged). Widen the behavioral gate to sample BOTH the FLIP and the VT timelines. See `waves/AW.W1-dock-collapse-regression.md`. Opens FIRST (AT-disjoint) | IMPL | `proof:dock-animation-live` — born-RED on HEAD goes GREEN: a real-browser rAF probe samples the GlassDock OWN collapse↔expand width morph (the `summary`↔`full` outer pair, NO DockLayerGroup) over ≥3 rising frames on BOTH the FLIP and VT paths; bite: a frozen-at-collapsed-width single-frame timeline → RED |
| **AW.W2** | **DOCK LOCKSTEP (HIGH).** Put the outer box, inner box, and child opacity on ONE timeline so opacity begins when both boxes START morphing — not at the inner-spring settle (the "shrinks first, THEN items fade" desync). One opacity authority keyed off the same progress the size authority reads; re-seat opacity from its live value (not 0%) through a mid-flight retarget. Retune `DOCK_SPRING` and the `--spring-dock` token together. See `waves/AW.W2-dock-motion-unify.md`. Opens after W1 | IMPL | `proof:dock-animation-live` (opacity re-seats from its live value through a retarget; the width/opacity arrival delta holds ≤16.7ms — one frame — on the interrupted swap) + `proof:spring-tokens-synced` (`DOCK_SPRING` and the `--spring-dock` token moved together to the retuned curve); bite: re-tie opacity to the inner settle → the start-delta exceeds one frame → RED |
| **AW.W3** | **DOCK LAYERING POLISH + slider/wrap/rail.** Unify the layering motion onto ONE iOS spring family (the M3 spatial-vs-effects separation: spatial springs overshoot, effects springs do not — `dock-animation-digest §B`): directional VT asymmetry (expand vs collapse carry distinct curves), a spring-keyed item-stagger (not a fixed-ms timer), the collapsed-hover scale on the dock spring vocabulary, the multi-row `overflow="wrap"` reflow MORPHING rather than snapping at the `--dock-overflow-bp` boundary, and the DockLayerGroup switcher-rail polish; the dock-with-slider `keepDockOpen` interaction. See `waves/AW.W3-dock-layering-rail-wrap.md`. Opens after W2 | IMPL | `proof:dock-layering-polish` — a Playwright gate asserts directional VT asymmetry (distinct expand/collapse `:active-view-transition-type` curves), the spring-keyed expand-stagger cascade, the collapsed-hover scale riding the dock spring, and the wrap-row reflow morphing at the `--dock-overflow-bp` crossing; bite: a snap (non-morph) wrap or a fixed-ms stagger → RED |
| **AW.W4** | **AURORA PAINTERLY — the four-fold painterly arc (tensor + impasto + van-Gogh + oil-pastel).** The per-pixel structure-tensor orientation+anisotropy field (Kyprianidis & Kang 2009) that drives `strokeOrient:"tensor"`; the height-field impasto relight (a `uLightDir`-driven catch-light replacing the fixed-RGB rim constant in `paintOver`); the energy-graded van-Gogh medium (tensor strokes + impasto + OKLCh jitter); the reworked oil-pastel deposition/scumble bake — all on the WebGL2 single-pass path inside `profile:budget`. The Gaussian-smoothed multi-tap tensor + per-stroke compute are W7's WebGPU scope. See `waves/AW.W4-aurora-painterly.md`. Opens after W5 (the OKLCh color core) | IMPL | four born-RED gates: `proof:aurora-tensor-field` (eigen-decomp matches a synthetic gradient field; `strokeOrient:"tensor"` tracks the field gradient) + `proof:aurora-impasto-relight` (the fixed-RGB rim constant is gone; a `uLightDir` sweep moves the catch-light) + `proof:aurora-vangogh-preset` (the `vangogh` medium resolves its uniforms + the `renderAt(t)` bake is snapshot-blessed) + `proof:aurora-oilpastel-medium` (the reworked bake is blessed + the single-pass path stays inside `profile:budget`); bite: a major-eigenvector swap / a restored fixed rim → RED |
| **AW.W5** | **AURORA COLOR CORE — full OKLCh interp + derive-color front door.** Migrate the palette interpolation + the `brokenColorJitter`/`saturate3` jitter off linear-sRGB/YIQ onto the value.js Ottosson OKLCh core (splicing the shared `OKLCH_MATRICES_GLSL`); add `split-complementary` + `tetradic` to the `AuroraHarmony` union + `deriveHue`, `lightnessEasing`/`chromaEasing`, `temperatureShift`, and the `deriveScene(seed, mood)` front door (one seed → the full palette). Opens BEFORE W4 (the painterly arc consumes the OKLCh jitter seam). See `waves/AW.W5-aurora-color-derive.md`. Opens first in the aurora band | IMPL | two born-RED gates: `proof:aurora-oklch-interp` (the spliced `OKLCH_MATRICES_GLSL` matches the value.js Ottosson constants to 1e-6 + the OKLCh interp of a vivid blue→yellow pair holds chroma ABOVE the linear-`mix` midpoint) + `proof:aurora-derive-gamut` (every stop of every harmony × easing × temperature combo over a neon-seed matrix is in-sRGB after `gamutMapStop`); bite: revert `samplePalette` to the linear `mix()` / remove a `gamutMapStop` guard → RED |
| **AW.W6** | **AURORA ATOMS — the additive authoring door (keep wispy-sky default).** Ship `resolveAtoms(atoms) → AuroraConfig`: a pure, TOTAL mapper over the ≤7 Tier-1 atoms (seed, harmony, mood, medium, textureAmount, motion, zones) so a consumer authors an aurora from a small atom set rather than the full `AuroraConfig`. ADDITIVE — nothing is removed from `AuroraConfig`; `AuroraAtoms` + `DEFAULT_ATOMS` are exported (+ `AuroraAtoms` on `/api`) and the default atoms resolve to the wispy-sky `DEFAULT_AURORA_CONFIG`. See `waves/AW.W6-aurora-options.md`. Opens after W5 | IMPL | `proof:aurora-atoms-roundtrip` — `resolveAtoms` is a total function (every atom combination yields a valid in-range `AuroraConfig` respecting every `budget.ts` cap, no NaN/out-of-range) AND `resolveAtoms(DEFAULT_ATOMS)` deep-equals `DEFAULT_AURORA_CONFIG`; bite: a `DEFAULT_ATOMS` value so the default no longer resolves to wispy-sky / a removed `budget.ts` clamp overflowing a vivid×6-zone combo → RED |
| **AW.W7** | **AURORA WEBGPU (gated).** Lift the backend-AGNOSTIC lifecycle out of `useWebGLCanvas.ts` into a shared core + add a `createGPUCanvas` sibling behind `navigator.gpu`-detection — the multi-tap smoothed tensor + per-stroke compute the WebGL2 single-pass cannot afford; WebGL2 STAYS the declared zero-regression fallback (WebGPU is Limited Baseline per AV's SOTA crosswalk). Hand-written WGSL, no Three.js/TSL. See `waves/AW.W7-aurora-webgpu.md`. Opens after W4/W5 | IMPL | two born-RED gates: `proof:aurora-backend-fallback` (force the WebGL2 path; it renders the identical visual contract — the declared zero-regression fallback) + `proof:aurora-wgsl-equivalence` (the WGSL color/noise chunk matches its GLSL twin to 1e-6 — the AV.W1 divergence-bug-class pre-empt); `proof:offscreen-pause` GREEN with the WebGPU path; bite: break the WebGL2 fallback route / perturb a WGSL matrix constant → RED |
| **AW.W8** | **AURORA INTERACTIVITY.** The fully-dynamic interactive mode on request — cursor-as-light driving W4's `uLightDir`, a velocity-reactive flow burst, scroll coupling via `useScrollProgress`, the WebGPU stateful wake (the ping-pong velocity texture) on the W7 branch; a master tempo scalar dials the stack (opt-in, reduced-motion-guarded so the wispy-sky default stays calm). See `waves/AW.W8-aurora-interactive.md`. Opens after W4/W7 | IMPL | `proof:aurora-interaction-prm` — every new interactive/parallax axis is SUPPRESSED under `prefers-reduced-motion: reduce` AND the master tempo scalar zeroes the stateful field; the `DockBackgroundToggle` pause stops every axis; `proof:offscreen-pause` (W7-extended) confirms a parked rAF skips the wake's self-advection; bite: detach an axis from the master tempo scalar so it animates under reduce → RED |
| **AW.W9** | **BLOB DROPLET — the lit surface material (the HEADLINE).** Flip the flat-shaded silhouette to a wet droplet: derive the fake surface normal from the SDF gradient (already called for the `fwidth` AA), add Blinn-Phong specular (a tight lobe for wet glass + a broad lobe for gel sheen) + Schlick/Fresnel rim — all in linear light before the OETF, premultiply-correct, reusing the shared `procedural-color.glsl.ts` (no new color seam); retire the `POS_SCALE`/`/0.22` smoothK fudge and subsume the `edgeGlow` site into the Fresnel rim. See `waves/AW.W9-blob-droplet.md`. Opens after the blob baseline confirm | IMPL | `proof:blob-smin-normalized` + `proof:blob-gradient-unit-length` (the derived normal is unit-length across the interior; the `edgeGlow` site is gone) + `proof:blob-spec-premult` (light folds into rgb before `linearToSrgb` and before `* alpha`); `proof:blob-color-equivalence` + `proof:blob-space-gamma` stay green; bite: strip the normal → the flat silhouette returns → RED |
| **AW.W10** | **BLOB SOFT-BODY + INTERACTION — wire the built-but-dead model.** The headline finding: `setMood`/`nudge`/`pointerAttraction` are exposed but no consumer calls them. Wire the pointer interaction (a felt, frame-rate-independent attraction over the substrate's single rAF — reusing `useSpring`, not a hand-rolled fixed-α lerp) + a soft-body squish; the demo story drives the shipped interaction (no orphaned `pointerAttraction`); every new motion axis collapses to no-op under `prefers-reduced-motion` and stays reachable by `pause()`/`resume()`. See `waves/AW.W10-blob-interaction.md`. Opens after W9 | IMPL | `proof:blob-interaction-prm` — every new motion axis is no-op/instant under PRM, routes through the single rAF, stays `pause()`/`resume()`-reachable, and the spring is frame-rate independent; the demo story drives it; `proof:offscreen-pause` stays green; bite: an axis that animates under PRM / a frame-rate-dependent deflection → RED |
| **AW.W11** | **BLOB MOOD + SURFACE COLOR — iridescence/SSS + wire-or-excise.** Land the warm-biased OKLCh iridescence + SSS terms in the surface color (in OKLCh before the gamut clamp, splicing the shared chunk; the blob consumes the shared `ColorHarmony`, no forked `deriveHue`); resolve the 5-mood cross-fade engine — a consumer-reachable mood API with a demo exercising every shipped mood OR excise the unwired engine (the substrate-without-consumer rule); no orphaned `setMood`/`orbitSpeedScale`/`wobbleScale`. See `waves/AW.W11-blob-mood.md`. Opens after W10 | IMPL | `proof:blob-color-equivalence` (the iridescence + SSS terms in the TS port; the warm-bias chroma-cap holds) + `proof:single-color-core` (the blob consumes the shared `ColorHarmony`, no forked `deriveHue`) + `proof:blob-mood-resolved` (the mood model is wire-or-cut, no orphaned `setMood`/`orbitSpeedScale`/`wobbleScale`; a demo story exercises every shipped mood); bite: an unwired mood engine survives → RED |
| **AW.W12** | **GLASS-PANEL TIER-COLLAPSE FIX + demo backdrop.** The five-rung ladder collapses to ONE rung under the default `svg-filter` tier (`GlassPanel.vue:60-72` returns `glass-panel--svg` for ALL variants; `:104-108` paints only `--glass-bg-wash`). Make the `--svg`/`--fallback` branches honor `variant` via `--glass-bg-{variant}`; clean the double-nested `light-dark()` bg tokens; give the glass-panel + card stories a high-frequency backdrop (existing Aurora/PaperBackdrop) so the rungs read. See `waves/AW.W12-glass-panel-fix.md`. Opens after the Band-A close | IMPL | `proof:glass-panel-tiers` — the five variants render five DISTINCT backgrounds under the svg-filter tier (a render-capture assert finds five distinct computed `--glass-bg-*`, not five identical wash); bite: re-hardcode wash on `--svg` → the five collapse to one → RED |
| **AW.W13** | **AFFORDANCE LIFTS.** The too-timid cream affordances: lift the 8%-α resting input/select border (token) so the field edge reads on cream; replace `text-white` on `gold-audacious` (cream-on-cream invisible CTA text) with a foreground/contrast token surviving the 8% rest tint + audit `primary-audacious`; fix the goo-blob `var(--primary)` throw (`defaultBlobColorResolver`→`cssToOklch` feeds `var()` to value.js which throws — resolve against computed style OR fix the story to pass concrete colors); fix the card-toggle perception trap (the demo staging, not the component). See `waves/AW.W13-affordance.md`. Opens after W12 | IMPL | `proof:affordance-contrast` — the resting input border resolves above the cream perceptual floor; `gold-audacious`/`primary-audacious` CTA text clears WCAG-AA on its rest substrate (a contrast probe ≥4.5:1); the goo-blob story renders without a per-frame throw (console clean); bite: revert any of the three → RED |
| **AW.W14** | **DATATABLE COMPOSABLE SPLIT.** Split `DataTable.vue` (442→≤380) into two colocated internal composables (`useDataTableRowIdentity` owns row-identity, `useDataTableResponsive` owns the card-vs-table projection) — no public API change, `index.ts` diff empty. See `waves/AW.W14-datatable-split.md`. Opens independent of W12/W13/W15 (disjoint bounds). The orphan-resolution + metric-cell/stack-prune scope D-10 once folded here moved to a DEDICATED orphan-resolution wave the sibling fixer authors (the W14 file is DataTable-split only) | IMPL | `DataTable.vue ≤ 380 lines`; `vue-tsc --noEmit` green; `vitest run tests/components/ui/data-table/` green; `proof:no-test-in-src` clean; `git diff src/components/ui/data-table/index.ts` empty; bite: a >380 `DataTable.vue` or a public-API delta → RED |
| **AW.W15** | **COLOCATION + NAMING HYGIENE.** Every public composable that returns a state object exports a named `Use<Name>Return` interface (or returns a documented primitive); the `twin-line-divider` idiom collapses to a single `@utility` with ≥2 consumers; `useTokenColor` accepts an optional injected resolver (proven by a unit); the cleared god-modules carry a one-line DO-NOT-SPLIT rationale. See `waves/AW.W15-hygiene.md`. Opens independent of W12/W13/W14 (disjoint bounds). The deeper styling assay D-? (brittle-number→token tokenization, Tabs pill-track, raw-`<button>`→`<ToggleGroup>` re-roll) moved to a DEDICATED styling-assay wave the sibling fixer authors (the W15 file is colocation/naming-hygiene only) | IMPL | every state-returning public composable carries a named `Use<Name>Return` interface (or a documented primitive); `twin-line-divider` is a single `@utility` with ≥2 consumers; `useTokenColor` injection seam proven by a unit (`tests/composables/dom/useTokenColor.test.ts`); `vue-tsc --noEmit` green, zero import-site breakage; `proof:no-test-in-src` clean; bite: a state-returning composable with no named return interface → RED |
| **AW.W16** | **DECKPROGRESS COMPOSITION.** Ship the viewport-pinned `DeckProgress` chrome over the EXISTING `Progress` fill (NOT a fork — the percentage/state math is generic and already shipped; the value-add is the fixed/full-width/safe-area/z-layer/leading-glow recipe). A `.glass-progress-rail` CSS recipe composing the existing `<Progress variant="default">` + a thin component that takes `:value`, plus a `deckProgress(index, total)` total helper. The 2nd consumer is slides H.W1 (the de-docked bar); the 1st is the glass-ui demo story. See `waves/AW.W16-deckprogress.md`. Opens after W12 | IMPL | `proof:deck-progress-math` — `deckProgress(index, total)` is a total function mapping a 0-based index + count to 0..100 (documented endpoints incl. both clamps); `DeckProgress.vue` references `<Progress` (composes, not forks) and declares no `position:`/`z-index:`/`env(safe-area` (chrome stays consumer-side); born RED on HEAD (no helper); bite: fork the fill / a wrong endpoint → RED |
| **AW.W17** | **CONSTELLATION COMPONENT + `useCanvas2D` (the 2nd-consumer unblock).** Land the AV.W8 gated-not-landed work: the `Constellation` component on a NEW `useCanvas2D` substrate (Canvas2D, sibling to `useWebGLCanvas`, composing `useRAFLoop` + `useIntersectionPause` + the shared `prng.ts`) — the proximity-graph engine mechanism ports (dpr-resize, palette-read-on-dark-flip, RAF arm/disarm, the draw passes); the slides red-anomaly skin stays a consumer overlay. The 2nd consumer is slides H.W4/W10; the 1st is the glass-ui demo story. See `waves/AW.W17-constellation-component.md`. Opens after the Band-A close | IMPL | `proof:constellation-substrate-single` — `useCanvas2D` (exports `createCanvas2D`) + `Constellation` compose it, the engine consumes glass-ui's `prng` (`mulberry32`/`hashString`, NO private copy), and the anomaly skin is a consumer draw-pass (no `accentColor`/`--ncsu-red`/`Fira Code` literal in `src/components/custom/constellation/*`); the substrate parks offscreen/under PRM; born RED on HEAD; bite: a private `mulberry32` re-roll or a red-skin literal in `src/` → RED |
| **AW.W18** | **GATE PATTERN — the non-dismissable access-modal glass idiom.** Widen the `.input-pill` invalid-ring selector group to include `[aria-invalid="true"]` alongside `:user-invalid`/`.user-invalid-fallback` (the one genuinely ≥2-consumer library edit the slides `DeckGate` surfaced — any app-driven-validation form), and ship a `GatePattern.story.vue` demonstrating the form-in-`Dialog` idiom (consumer #1) composing shipped parts with NO new component; the slides `DeckGate` (H.W2) is consumer #2. Digest: `frontend-convergence-digest` Lane 4 Findings 1+2. See `waves/AW.W18-gate-pattern.md`. Opens independent of the dock/aurora/blob arcs | IMPL | `proof:input-invalid-aria` — the `.input-pill` invalid-ring selector group contains all three members (`:user-invalid`, `.user-invalid-fallback`, `[aria-invalid="true"]`) and the ring still resolves `var(--destructive)`; born RED on HEAD (the rule keys off two of three); bite: drop the `[aria-invalid]` arm → RED |
| **AW.W19** | **GATE-FLEET CLOSE + READMEs (LAST).** Register every AW gate in `gates.mjs` with its `{local,ci,release,sibling}` tag (NOT hand-listed in ci.yml); the four research-backed READMEs (dock, aurora, blob, constellation); the overfitting audit (PROPS, zero orphans); the π visual-runtime lane over the visual-change waves (W1-W3 dock, W4-W11 aurora/blob, W12-W13 component, W16-W17 convergence); `AW.FINAL` citing a green run id per wave. Opens AFTER all bands. The close wave is authored by the sibling fixer (the prior W18 close slot was content-swapped to the gate-pattern wave above; this is its real home). See `waves/AW.W19-close.md` | IMPL (LAST) | `proof:aw-final` — full matrix green over a clean tree; `gates:verify-ci` green (no hand-listed gate); the four READMEs exist + cite their research digest; the π lane ran (≥3 viewports, ≥5 frames per state-toggle, AA contrast, per-story consumption sweep) OR recorded the build-verification floor with the re-probe obligation named; overfitting audit zero orphans; `FINAL.md` cites a green run id per wave |

---

## §3 — Critical files + ownership

| Surface | Files | Owning wave |
|---|---|---|
| Dock motion | `src/components/custom/dock/GlassDock.vue`, `dock/composables/useDockState.ts`, `useLayerTransition.ts`, `dockContext.ts`, `dockLayerContext.ts`, `src/styles/dock.css` | W1·W2·W3 |
| Aurora | `src/components/custom/aurora/`, `src/composables/glass/webgl/shaders/aurora.frag.ts` + the painterly GLSL chunks, `procedural-color.glsl.ts` (shared, read-not-rewrite) | W4-W8 |
| Blob | `src/components/custom/goo-blob/`, `metaball.frag.ts`, `procedural-color.glsl.ts` (shared) | W9-W11 |
| Components | `src/components/custom/glass-panel/GlassPanel.vue`, `ui/data-table/DataTable.vue`, `ui/button/index.ts`, `ui/input/`, `src/styles/utilities.css` | W12-W15 |
| Convergence | a `DeckProgress` package + `deckProgress` helper (new), `src/composables/glass/canvas2d/useCanvas2D.ts` (new), `src/components/custom/constellation/` (new), `src/utils/prng.ts` (read), the existing `<Progress>` fill (compose) | W16·W17 |
| Gate pattern | `src/styles/glass.css` (the `.input-pill` invalid-ring widen), a `GatePattern.story.vue` | W18 |
| Gates + docs | `scripts/gates.mjs`, the four READMEs, `docs/tranches/AW/` | W19 |

**Disjointness:** Band A (dock), Band B (aurora), Band C (blob), Band D (components) write
disjoint surfaces and parallelize across worktrees. Within a band, the waves sequence per their
named dependencies (W2 after W1, W5 after W4, …) — no two parallel waves write the same path.
`procedural-color.glsl.ts` is READ by W4/W5/W9 and not rewritten (the AV.W2 shared chunk is the
single OETF/FBM/matrix source; AW splices, never diverges).

---

## §4 — Cross-repo shape (the publish/consume edges)

**The ownership chain** `value.js ← keyframes.js ← glass-ui ← slides` holds (`AV.md §5`). AW is
glass-ui-internal; every cross-repo item is NAME-FORWARD (glass-ui writes only glass-ui).

**The publish hinge — E1: glass-ui 3.4.0 → npm (USER-DOMAIN).** AW lands the dock-collapse
regression fix + the convergence primitives, then cuts **3.4.0**. The publish fans out to slides
**H.W1** (the pin bump `^3.3.0 → ^3.4.0` + the `DeckProgress` consume) ∥ H.W4/W10 (the
Constellation consume). The publish leg stays confirm-first (the boundary is irreversibility);
agents never run an irreversible release step.

**The convergence primitives AW ships → H consumes:**

| AW ships (wave) | What it absorbs from slides | 2nd consumer | H consumes in |
|---|---|---|---|
| `DeckProgress` (W16) | The viewport-pinned `.deck-progress` fixed/full-width/safe-area/z-layer/leading-glow chrome over the generic percentage/state math. | glass-ui demo story + slides DeckView | H.W1 (de-dock + consume) |
| `Constellation` + `useCanvas2D` (W17) | The `constellation.ts` proximity-graph engine mechanism (dpr-resize, palette-read-on-dark-flip, RAF arm/disarm, draw passes). The branded NCSU-red anomaly + narrative STAY in the slides overlay. | glass-ui demo story + slides deck | H.W4 (visibility) + H.W10 (dedup) |

**The dock-collapse fix → H consumes (W1):** the H.W1 slides arm consumes 3.4.0 purely via the
pin bump — the dock simple-collapse now morphs, so the slides dock chrome animates. The
`DeckProgress` de-dock (H.W1) consumes the AW.W16 composition.

**STAYS slides-specific (never ports):** the NCSU-red anomaly node + the narrative framing, the
XRAY portal embed, the PPTX export pipeline, the `deck.css` brand register (NCSU-red,
cartoon-shadow vocabulary, Fraunces/Newsreader). Only the engine mechanism ports; the brand
content is H-owned (`avg-deep-audit-digest §3 "STAYS slides-specific"`).

---

## §5 — Design language (the cogency the perfection serves)

AW's visual work is bound to ONE coherent design language; every backdrop, panel, and dock
surface reads as the same object. The three axes:

- **Warm-cream glass.** The field is warm paper — `--neutral-0: hsl(48 12% 98%)`, the hue-48
  warm-paper L\* ladder, muted-black ink `--foreground: hsl(24 10% 10%)`, the 5-rung glass ladder,
  the cartoon offset-stamp shadow as the signature, `0.625rem` base radius
  (`frontend-convergence-digest §design-spine`). The affordance lifts (W13) push the too-timid
  8%-α edges UP so glass reads on cream WITHOUT going loud — affordance, not noise.

- **iOS-26 Liquid Glass.** The rim/specular material (the AV.W15 token edits): per-rung saturate,
  the `--glass-edge-light` full-perimeter rim, the content-aware under-shadow, the pointer-anchored
  moving specular. The dock (W3) gets the Liquid-Glass shell identity + the unified hover grammar
  its buttons already carry; the blob droplet (W9) is the glass read made literal — a wet,
  specular, Fresnel-rimmed surface. The iOS spring family (W3) unifies the motion to the same
  Liquid-Glass register.

- **NCSU-red accent.** The hero accent (`#cc0000` + `light-dark()` ink lift) is the consumer-layered
  single-focal-red — the constellation anomaly, the deck trip-line. It STAYS consumer-side; the
  library ships the warm-cream + iOS-26 spine and the consumer layers its red.

**The AI-Nutrition-Label idiom — scoped to SlideXray (the H arm, not AW).** The same-org XRAY app
(Friday Institute / NCSU TIL) speaks the FDA-nutrition-label broadsheet brutalism — heavy-grotesk
display, mono labels, the load-bearing `bar-thick` solid-ink rule, tabular numerics, the cold-blue
AI-lane counterpart. That idiom is XRAY's STRENGTH and survives; the H arm makes XRAY a glass-ui
consumer the way slides is (pulls the shared cream/red/Fraunces spine + the grade-semantic token
set) WITHOUT reskinning the label. AW ships NO nutrition-label component — the
`<NutritionLabel>`/FactsPanel is the one real ≥2-consumer headline candidate but it is below the
bar until both XRAY and the slide consume it; it stays KEEP-BOOK
(`frontend-convergence-digest §nutrition`). The slides `SlideNutrition.vue` already speaks the
idiom in the deck's dialect — H adds the missing heavy-bar signature, never a reskin.

---

## §6 — Precepts in force (HARD gates, not sentiments)

- **inv P1 — no legacy / no workaround.** Every clean break carries NO alias. The dock-collapse
  fix REPLACES the broken size authority (it does not add a `legacyCollapse` flag); the aurora
  OKLCh migration DELETES the linear-sRGB/YIQ interp (it does not keep both behind a switch); the
  orphan prune REMOVES the artefact (it does not deprecate-and-keep). A grep for any retired form
  outside its deletion commit = 0.
- **inv P2 — gestalt transposition over patch.** Each fix is a structural correction, not a
  band-aid: the dock-collapse regression is ONE size authority across both paths (the regression
  was the paths diverged), not a per-path special-case; the glass-panel fix makes the tier branch
  honor `variant` (it does not hardcode a second wash). Net-deletion-or-neutral, proved by LOC.
- **inv P3 — KISS.** The blob droplet reuses the SDF gradient already computed for the `fwidth` AA
  (one quantity unlocks normal/specular/rim/iridescence) — the simplest correct path, not a
  re-architecture. The DataTable split is colocation, not a new public surface.
- **inv P4 — DRY / consume-glass-ui-where-befitting.** No duplication: the aurora/blob shaders
  splice the shared `procedural-color.glsl.ts` (the single OETF/FBM/matrix source); the
  `DeckProgress` composes the existing `Progress` fill (NOT a fork); the Constellation consumes the
  shared `prng.ts` + `useRAFLoop` + `useIntersectionPause`; the demo controls consume
  `<ToggleGroup>` (not raw `<button>`).
- **inv P5 — visual-load-bearing (≥2-consumer).** Every new public surface clears the
  ≥2-DISTINCT-consumer bar before it ships (J-inv-10). `Constellation`/`useCanvas2D`/`DeckProgress`
  each name the glass-ui demo story + the slides H consumer as the two; the blob mood engine ships
  ONLY if a demo exercises ≥2 moods, else it is excised. The overfitting audit tallies PROPS; the
  W0 spot-verify gates every retire.
- **inv P6 — design-language cogency.** Every visual surface reads as warm-cream glass + iOS-26;
  the NCSU-red stays consumer-layered; the AI-Nutrition-Label idiom is scoped to SlideXray (the H
  arm). No surface mints its own palette.
- **inv P7 — the spot-verify gate is binding.** Before W14 retires any orphan, the W0
  spot-verify ledger records EXISTS + verbatim-rg-count + alias-resolved verdict for every
  candidate (`SPEC §"Audit-verdict spot-verification gate"`). A hallucinated item or an under-count
  is an integrity-sweep close-blocker.
- **inv-27 — green-means-green.** Every "done" cites AW's OWN green CI run id. Every born-RED
  gate reddens on a deliberate inject; `git status` clean after `proof:all`; `gates:verify-ci`
  fails closed on drift.
- **the π visual-runtime lane is binding** (AW ships visual changes). Coverage: ≥3 viewports
  (375×667, 1280×800, 1440×900), ≥5 animation frames per state-toggle (the dock collapse/switch,
  the aurora/blob transitions), WCAG-AA contrast-vs-background, per-story consumption sweep. The
  tooling-contingency clause applies if browser automation is unavailable (build-verification floor
  + the named re-probe obligation).

**USER-DOMAIN boundaries (inv-16):** the dirty `docs/precepts` submodule is NOT touched in-flight.
The 3.4.0 publish leg is confirm-first; agents NEVER run an irreversible release step. Agents are
read-only on git (the orchestrator owns the index).

---

**AW headline:** *Fix the dock simple-collapse regression that shipped with 3.3.0 [W1] under a
behavioral frame-timing gate that samples BOTH the collapse and the layer-switch paths, put the
dock motion on one iOS-spring timeline [W2-W3], perfect the two procedural backdrops the research
fans proved have headroom — the aurora engine (the OKLCh color core + derive-color front door [W5,
opens FIRST], the four-fold painterly arc — structure-tensor + impasto-relight + van-Gogh medium +
oil-pastel [W4], the additive `resolveAtoms` authoring door [W6], the gated WebGPU path [W7], the
interactive mode [W8]) and the blob lit droplet (the SDF-normal specular + Fresnel rim + OKLCh
iridescence, the wire-the-dead soft-body interaction + mood) [W9-W11]
— fix the component pass the live audit named (the glass-panel tier collapse, the cream-on-cream
affordances, the DataTable split, the colocation/naming hygiene) [W12-W15], and ship the convergence
primitives the ≥2-consumer rule now clears — the `DeckProgress` composition over the existing
Progress fill [W16] and the Constellation on a `useCanvas2D` substrate [W17] — then the gate-pattern
access-modal idiom [W18] and the gate-fleet close + the four research-backed READMEs [W19].*
The engine mechanisms port to glass-ui while the slides brand content (NCSU-red anomaly, narrative,
PPTX) stays H-owned; the design language is warm-cream glass + iOS-26 with the NCSU-red consumer-layered
and the AI-Nutrition-Label idiom scoped to SlideXray.
