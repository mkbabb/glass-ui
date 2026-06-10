# AY.W-BLOB-CONFIG — the blob page: hand-rolled config strip → library Configurator + the two broken axes + the dead hero color-feed + the pause→resume render-wreck

**Tranche** AY (glass-ui) · **Band** A (SOTA component perfection — the substrate band) · **Type** demo-Configurator adoption (the inv-16 dog-food) + source-bug fix (3 binding defects + 1 SEVERE render-wreck) · **State** OPEN · **Repo** glass-ui (`/Users/mkbabb/Programming/glass-ui`, branch `tranche/AY`)
**Depends on** W-BLOB2 (the light-cream default base ships FIRST so the hero color-feed fix is verified over the cream bead, not the charcoal mass) + W-BLOB3 (the DI-strip + the interaction capture land FIRST so this wave's config edits do not re-conflict the renderer DI-seam files; the W-BLOB3 scope fence explicitly does NOT touch the config strip or the broken axes) + W-GOD1 (the `useMetaballRenderer` <500 carve — the renderer edits here land on the carved file) + W-CARDINAL-INFRA (the AY cardinal home + `proof:live-verified-ledger:ay`).
**Source risk** MEDIUM-HIGH — the pause→resume wreck is a SEVERE substrate-level render bug (the WCAG-2.2.2 control the page showcases DESTROYS the canvas it pauses) touching the SHARED `createCanvasLifecycle` substrate that Aurora ALSO composes (a fix must not regress aurora's resume — the cross-substrate blast radius); the two broken axes are a shader-sign defect (`metaball.frag.ts`) + a swamped-axis honesty call; the dead hero color-feed is a missing reactive watcher in `GooBlob.vue` (additive, low risk); the config-strip → Configurator swap is demo-private (the inv-16 dog-food, zero library surface delta).

---

## §1 — Why this is a wave (the mass decision)

RA-blob found the blob creature-core ALIVE (the hover-lean + drag-follow are the best frames in the AY audit — RA-blob §D) but caught a CLUSTER of config-and-render defects too large for a W-BLOB3 residue arm and distinct from W-BLOB3's DI-strip/interaction-capture write-scope: (1) the page's config UI is a HAND-ROLLED strip of raw `<input type=range>` + `<select>` + mood pills, NOT the library `Configurator` — the exact inv-16 dog-food gap (a showcase demo for a glass-ui Configurator that doesn't USE the Configurator, while Aurora's Configurator-driven page is "in a different league" — RA-blob §B); (2) TWO of the five config axes are BROKEN (the `pointerAttraction` sign drops/inverts; the `stretch` axis is a measurable no-op); (3) the seed/harmony palette never reaches the LIVE hero (the headline break — the OKLCh stops fed to the dots work, the HERO body is byte-identical coral); (4) the page's own pause control DESTROYS the canvas on resume (a SEVERE substrate render-wreck). That is four coherent defects on ONE surface, three of them SOURCE bugs (one severe), sharing the blob page write-scope but NOT W-BLOB3's DI-seam files — a wave, not a residue. The config-strip swap is demo-side; the three render bugs are source.

## Goal criterion

The blob page becomes a CREDIBLE SOTA claim (RA-blob §D: "if the resume wreck, the dead hero color feed, and the attraction sign were fixed, this page would be a credible SOTA claim; today it is a lovely creature in a glitchy enclosure"). The hand-rolled config strip is REPLACED by the library `Configurator` / `ConfiguratorLayer` / `ConfiguratorRow` (the inv-16 dog-food — the blob showcase USES the component the library ships, mirroring Aurora's Configurator chrome); the `pointerAttraction` axis HONORS its sign (negative shies away, positive leans in — verified live, not just claimed in the shader comment); the `stretch` axis either reads perceptibly OR is honestly removed/documented as swamped; the seed/harmony palette reaches the LIVE hero (a post-mount `paletteStops` change re-paints the hero body color); and the `paused`-prop pause→resume path is CLEAN (the canvas resumes intact, like the already-clean intersection-park path), so the WCAG-2.2.2 control no longer wrecks the surface it pauses. A fresh reader sees a robust, Configurator-driven blob page whose every advertised axis bites and whose pause control is safe.

## Completion criterion

ALL of the §6 hard-gate set verify: a π readback proves a post-mount `config.color.paletteStops` write RE-PAINTS the hero body (the dead-feed fix, born-RED on the byte-identical-coral HEAD); a live readback proves `pointerAttraction = -1` SHIES the centroid AWAY from a parked pointer (the sign fix, born-RED on the lunge-toward HEAD); the `stretch` axis decision is recorded (perceptible-tune OR honest-removal) + machine-checked; the `paused`-prop resume produces a CLEAN canvas (motion resumes WITHOUT the full-frame strobe + the charcoal-slab wreck — born-RED on the resume-explosion HEAD, and the aurora resume path is NON-regressed); the config strip is the library `Configurator` (a source/structural check — the demo imports `Configurator` and mounts no raw `<input type=range>` for the blob axes); and the own-surface DELTA (`W-BLOB-CONFIG-*.png`, light+dark) is captured with the four fixes shown. `proof:live-verified-ledger:ay` GREEN over the row.

---

## §2 — The verified defects (file:line — cited from RA-blob, grounded against HEAD this lane)

### D1 — the seed/harmony palette never reaches the LIVE hero (the headline break: `GooBlob` has no watcher on `config.color.paletteStops`)

`RA-blob.md` §B (the headline break): `deriveBlobPalette` WORKS (blue seed → teal/blue/periwinkle DOTS, triad → blue/pink/green — `RA-blob-palette-dots.png`, all correct), but the HERO body color is BYTE-IDENTICAL coral before/after a seed change: RGB (239,118,123) → (239,117,123) after 3s, (240,139,140) after 9s. The blurb's "OKLCh stops fed LIVE to the one hero" is FALSE as rendered.

**Root cause (grounded this lane):** `src/components/custom/goo-blob/GooBlob.vue:91` initializes `resolvedStops = ref<string[]>([...cfg!.color.paletteStops])` ONCE; the `refreshResolvedColors()` function (`:93-100`) that re-resolves `resolvedStops` from `cfg.color.paletteStops` is triggered ONLY by `watch(wrapperRef, …)` (mount-once, `:121`), the dark-mode `MutationObserver` (`:124-127`), and `watch(colorRef, …)` (the `color` PROP, `:132-135`) — there is **NO watcher on `cfg.color.paletteStops`**. The renderer reads the `resolvedStops` Ref each frame (`useMetaballRenderer.ts:401` `const stops = paletteStops.value`), so a post-mount `paletteStops` change in the parent's reactive `moodConfig` (`demo/stories/substrates/blob.vue:88-90` `color: { ...moodConfig.color, paletteStops: paletteStops.value }`) updates the CONFIG but never re-resolves into the Ref the renderer reads. The demo's `paletteStops` computed (`blob.vue:69-73`) recomputes correctly; the wire from config→Ref is the break. Captures: `RA-blob-seed-hero.png`, `RA-blob-hero-after-blue-seed-9s.png`.

### D2 — the `pointerAttraction` axis DROPS/INVERTS its sign (the shader comment CLAIMS sign-honor; the render shows the opposite)

`RA-blob.md` §B: at `pointerAttraction = -1` ("shy-away"), pointer parked right: centroid +35.4px **TOWARD** the pointer — STRONGER than the +0.35 default lean (+24). The sign is dropped/inverted; only magnitude registers. `RA-blob-shyaway-right.png` shows the bead LUNGING at the cursor and clipping out of the canvas.

**Root cause (grounded this lane):** `src/components/custom/goo-blob/shaders/metaball.frag.ts:318-335` — the shader DOC-COMMENT claims it "honors the SIGN of uPointerAttraction… a positive attraction leans the body IN toward the cursor, a negative shies it AWAY" (`:318-319`), and the math at `:333-334` (`influence = smoothstep(0.5,0.0,pointerDist) * uPointerAttraction * uPointerStrength; uv -= normalize(pointerDir+1e-6) * influence`) SHOULD carry the sign (a negative `uPointerAttraction` → negative `influence` → `uv +=` → shies away). The render proves the sign is LOST upstream: either `uPointerStrength` is derived from `|pointerAttraction|` (dropping the sign before the shader sees the product), or the renderer's upload `cInt.pointerAttraction + params.pointerAttraction` (`useMetaballRenderer.ts:420-421`, where `params.*` is the MOOD additive) clamps/abs-es the negative half. The exact site needs live diagnosis (the candidate sites are grounded: the `uPointerStrength` derivation + the `:421` additive + the `:333` shader product) — the fix restores the sign end-to-end so `-1` shies away as the shader comment promises. Edge-clip companion (RA-blob §C.5): at high `|attraction|` the leaning lobe presses OUT of the `overflow-hidden` frame and is guillotined — the sign fix + a `reach`/`influence` clamp at the canvas edge resolves both.

### D3 — the `stretch` axis is a measurable NO-OP (swamped by the lean/follow channel)

`RA-blob.md` §B: identical-drag motion sum **56.2 @0 vs 59.4 @1.5 (~6%, within noise)** — visually swamped by the lean/follow channel. The `stretch` uniform IS uploaded (`useMetaballRenderer.ts:433` `gl.uniform1f(U.uStretch, cInt.stretch)`) and consumed in-shader, but at the shipped scale the squash-stretch is perceptually swamped by the dominant pointer-lean deformation. This is the RA-anim-suite "oversold relative to what renders" class on the blob's own axis.

**Decision (recorded, NOT a guessed tune):** EITHER (a) raise the `stretch` shader gain so the axis reads perceptibly at the slider's mid-range (a tune verified by a motion-delta readback that `stretch=1.5` produces a measurable >2× the noise-floor squash distinct from the lean channel), OR (b) honestly DOCUMENT it as a fine-detail axis swamped at default lean (and either remove the demo slider or label it "subtle"). The flick-overstatement (RA-blob §A R1, routed from W-BLOB3-§RESIDUE) is the SAME axis — the flick "velocity squash-and-stretch" doesn't read because `stretch` is swamped. The decision binds both.

### D4 (SEVERE) — the `paused`-prop pause→resume DESTROYS the render (the WCAG-2.2.2 control wrecks the surface it pauses)

`RA-blob.md` §C.1: via the page's own `DockBackgroundToggle`, PAUSE freezes correctly (motion 0, bead intact, area 0.196). RESUME: the canvas erupts into full-frame STROBING (motion 65.3, mask area 0.99) and settles as a SOLID CHARCOAL SLAB — bead GONE, still broken 5s later (`RA-blob-after-pause-resume.png`, `-5s.png`). Reproduced TWICE (run 1 wrecked to near-white, run 3 to black — a DIVERGED-STATE signature, consistent with an unclamped dt step on resume). The gate-trap: a "motion stops, motion resumes" assertion PASSES this — motion DOES resume, as WRECKAGE.

**Critical contrast (the diagnostic key):** the intersection-park path (scroll away + back) is CLEAN (`RA-blob-after-scroll-roundtrip.png`, area 0.267/motion 0.36 after two roundtrips — RA-blob §C.1). BOTH paths call the SAME `createCanvasLifecycle.resume()` (`src/composables/glass/webgl/createCanvasLifecycle.ts:146-160`), which sets `startTime = performance.now() - 1000` (`:150`) + `resize()` + `tick()`. The renderer's per-frame dt IS clamped (`useMetaballRenderer.ts:324-326` `rawDtMs = lastTimeSec ? … : 16; dtMs = Math.min(rawDtMs, 50)`) AND the pointer integrator clamps (`useBlobPointer.ts:117`), so the PHYSICS dt is bounded. The divergence between the (clean) scroll-park and the (exploding) `paused`-prop path — both through one `resume()` — is the diagnostic puzzle: the `manual` suspend (the `paused` prop → renderer `pause()` → `canvasHandle.suspend("manual")` → `resume("manual")`) differs from the `off-screen` IntersectionObserver suspend ONLY in the suspend REASON, so the explosion is in what HAPPENS while `manual`-suspended vs `off-screen`-suspended, or the GL state at the `manual` resume (the `resize()` at `:157` re-measuring a box the `DockBackgroundToggle` overlaps — RA-blob §C.2 — or the GL context losing bound state across the manual park). This is a diagnostic-loop-class bug — the fixer DIAGNOSES live (the candidate sites are grounded), the spec does NOT over-prescribe a one-line fix. The fix MUST clamp/reset the post-resume frame so the simulation cannot diverge (the unclamped-dt-step signature), and MUST be verified on BOTH the `paused`-prop path AND a NON-regression of the aurora resume (the shared substrate).

### D5 — the config UI is a HAND-ROLLED strip, NOT the library Configurator (the inv-16 dog-food gap)

`RA-blob.md` §B: the page's config UI is a hand-rolled strip — 3 raw `<input type=range>` (`blob.vue:163,175,187` stretch/attraction/clickImpulse), a seed text input, a harmony `<select>`, 5 mood pills — NOT the library `Configurator`. "Aurora's Configurator-driven page is in a different league." This is the inv-16 (MEMORY: the library's OWN showcase must consume the library's OWN components — Aurora's chrome uses `useConfiguratorState<AuroraConfig>` + `DockLayerGroup`/`DockLayer`, CLAUDE.md §Configurator). The blob showcase dog-foods the raw `<input>` strip instead of the `Configurator`/`ConfiguratorLayer`/`ConfiguratorRow` it should demonstrate.

---

## §3 — Objective (root-not-consumer; the source bugs at their seam, the demo on the library Configurator)

1. **D1 — wire `paletteStops` to a reactive watcher (the dead-feed fix at the SEAM).** Add a watcher in `GooBlob.vue` on `cfg.color.paletteStops` (and `cfg.color` if the demo replaces the whole color object) that calls `refreshResolvedColors()` — so a post-mount stops change re-resolves into the `resolvedStops` Ref the renderer reads. Mirror the existing `watch(colorRef, …)` pattern (`:132-135`). The renderer + the demo computed are already correct; this closes the config→Ref wire.
2. **D2 — restore the `pointerAttraction` sign end-to-end + clamp the edge-clip.** Diagnose where the sign is lost (the `uPointerStrength` derivation / the `:421` additive / the shader product `:333`) and restore it so `-1` shies AWAY (matching the shader comment's promise). Add a canvas-edge clamp on the lean excursion so high `|attraction|` does not guillotine the lobe out of `overflow-hidden`.
3. **D3 — decide the `stretch` axis (perceptible-tune OR honest-removal) + bind the flick honesty.** Per §2 D3: tune the gain to read >2× the noise floor distinct from the lean channel, OR document/de-slider it as swamped. The decision binds the flick-overstatement (W-BLOB3 §RESIDUE R1).
4. **D4 — make the `paused`-prop resume CLEAN (the SEVERE fix; cross-substrate guard).** Diagnose the `manual`-suspend/resume divergence from the (clean) `off-screen` path; clamp/reset the post-resume frame so the simulation cannot diverge (the unclamped-dt signature); verify on the `paused`-prop path AND non-regress the aurora resume (the shared `createCanvasLifecycle`).
5. **D5 — adopt the library `Configurator` (the inv-16 dog-food).** Replace the hand-rolled `<input type=range>` / `<select>` / mood-pill strip in `demo/stories/substrates/blob.vue` with `Configurator` + `ConfiguratorLayer` + `ConfiguratorRow` (the Aurora chrome model). The blob axes (stretch/attraction/clickImpulse/seed/harmony/mood) become `ConfiguratorRow`s; the page demonstrates the library's own controls. Demo-private; zero library surface delta.

This is the ROOT fix per defect: the dead feed is a missing reactive seam (not a renderer change), the sign is restored at its lost site, the resume is clamped at the substrate, and the demo eats the library's own dog food.

---

## §4 — Edit-sites (exact; re-grep every cite against HEAD before editing)

### E1 — `src/components/custom/goo-blob/GooBlob.vue` (D1 dead-feed)
Add `watch(() => cfg!.color.paletteStops, refreshResolvedColors, { deep: true })` (and/or watch `cfg!.color` if the demo swaps the object) beside the existing `watch(colorRef, …)` (`:132-135`). Re-grep `:91` (`resolvedStops` init) + `:93-100` (`refreshResolvedColors`) + `:132-135` against HEAD (W-BLOB2 + W-BLOB3 shifted the file).

### E2 — `src/components/custom/goo-blob/shaders/metaball.frag.ts` (+ the renderer upload site) (D2 sign)
Restore the `pointerAttraction` sign through `uPointerStrength` / `uPointerAttraction`. The shader product is at `:333-334`; the upload is `useMetaballRenderer.ts:420-421` (`cInt.pointerAttraction + params.pointerAttraction`). Diagnose the abs/clamp that drops the negative half; add the canvas-edge lean clamp (RA-blob §C.5). Re-grep `metaball.frag.ts:318-335` + the renderer `:420-433`.

### E3 — `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` / `types.ts` (D3 stretch)
Per the §2 D3 decision: raise the `uStretch` gain (the `:433` upload's shader consumption) OR document the axis as swamped in `types.ts` (the `stretch` field jsdoc `:166-167`). Re-grep the `uStretch` upload + consumption.

### E4 — `src/composables/glass/webgl/createCanvasLifecycle.ts` (D4 SEVERE resume; the shared substrate) + possibly `useMetaballRenderer.ts` first-post-resume frame
The `resume()` block (`:146-160`, the `startTime = performance.now() - 1000` + `resize()` + `tick()`). Diagnose the `manual`-vs-`off-screen` divergence; clamp/reset the first post-resume frame so the sim cannot diverge. **CROSS-SUBSTRATE GUARD:** this file is composed by BOTH `useMetaballRenderer` AND `useWebGLCanvas` (aurora) — the fix MUST non-regress aurora's resume (verify both). If the divergence is blob-specific (the metaball physics first-frame, not the substrate), the fix lands in `useMetaballRenderer.ts`'s first-post-resume guard instead — the diagnosis decides.

### E5 — `demo/stories/substrates/blob.vue` (D5 Configurator adoption + D3 flick-blurb honesty — DEMO-PRIVATE)
Replace the hand-rolled config strip (`:163,175,187` the raw range inputs; the seed `<input>` + harmony `<select>` + the 5 mood pills) with `Configurator` + `ConfiguratorLayer` + `ConfiguratorRow` (import from `@mkbabb/glass-ui/configurator`; mirror Aurora's chrome). Honest-down the flick blurb (`:136-138` "elastic pseudopod") per W-BLOB3 §RESIDUE R1. Re-grep all cites (W-BLOB2/W-BLOB3 shifted the file).

### E6 — `docs/tranches/AY/audit/visual/W-BLOB-CONFIG-DELTA.md` (NEW) + `VISUAL-ALLOWLIST.json`
The own-surface DELTA: the four fixes shown — (a) hero body color CHANGED after a blue seed (the dead-feed fix), (b) `pointerAttraction=-1` centroid shifted AWAY (the sign fix), (c) the `stretch` axis result (perceptible OR documented), (d) the `paused`-prop resume CLEAN (intact bead, not the charcoal slab) — light+dark, with the readback NUMBERS. Append `"W-BLOB-CONFIG"`.

---

## §4a — Triumvirate dispatch

- **D4 diagnostic loop (the SEVERE bug):** if the resume-wreck root cause is not isolated in THREE iterations (the manual-vs-offscreen divergence resists diagnosis) — the diagnostic-loop trigger fires; the orchestrator triumvirates (research the GL-state/dt divergence across the two suspend reasons, amend the edit-bounds, redress). Use chrome-devtools-mcp for the live diagnosis (MEMORY `feedback_chrome_devtools_mcp`), not a hand-rolled playwright script.
- **Cross-substrate scope-reveal (D4):** if the resume fix in `createCanvasLifecycle` REGRESSES aurora's resume (the shared substrate) — the scope-reveal trigger fires; the fix re-homes to a blob-specific first-frame guard in `useMetaballRenderer` (the diagnosis decides which substrate owns the bug).
- **D2 sign-site uncertainty:** if the sign is lost in a site OUTSIDE the grounded candidates (`uPointerStrength` / `:421` / `:333`) — the scope-reveal trigger fires (the file bounds expand).

## §5 — File bounds + disjointness

| File | Access |
|---|---|
| `src/components/custom/goo-blob/GooBlob.vue` | modify (the `paletteStops` watcher — D1) |
| `src/components/custom/goo-blob/shaders/metaball.frag.ts` | modify (the sign + edge clamp — D2) |
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | modify (the sign upload — D2; the stretch gain — D3; possibly the first-post-resume guard — D4) |
| `src/components/custom/goo-blob/types.ts` | modify (the `stretch` jsdoc — D3, conditional) |
| `src/composables/glass/webgl/createCanvasLifecycle.ts` | modify (the resume clamp — D4 SEVERE; cross-substrate guard) |
| `demo/stories/substrates/blob.vue` | modify (Configurator adoption + flick-blurb honesty — D5/D3; demo-private) |
| `docs/tranches/AY/audit/visual/W-BLOB-CONFIG-DELTA.md` | create |
| `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` | modify (append `"W-BLOB-CONFIG"`) |

**Disjointness.** This wave touches `useMetaballRenderer.ts` (D2 upload, D3 gain) + `metaball.frag.ts` + `GooBlob.vue` — the SAME files W-BLOB2 (cream default) + W-BLOB3 (DI-strip) + W-GOD1 (carve) edit. SEQUENCE after all three (W-BLOB2 → W-BLOB3 → W-GOD1 → W-BLOB-CONFIG) so the renderer DI-seam + the carve are SETTLED before the sign/gain edits land (the §F serialization — these waves are NOT independent on the blob files). `createCanvasLifecycle.ts` is shared with aurora — coordinate with any aurora wave touching the substrate (W-AUR* do not edit `resume()`, but verify at integration). `blob.vue` is demo-private and disjoint from src waves but shared with W-BLOB2/W-BLOB3's demo edits — sequence. The `VISUAL-ALLOWLIST.json` append merges with siblings.

## §6 — HARD GATE (evidence-backed; born-RED against the current state)

**Gate name:** `proof:live-verified-ledger:ay` + the per-defect π readbacks. The wave closes GREEN only when ALL hold:

1. **D1 HERO COLOR-FEED LIVE.** A π readback drives `/substrates/blob`, writes a post-mount `config.color.paletteStops` (a blue-seed palette), and asserts the HERO body RGB CHANGES (≥ a threshold OKLCh-hue shift from the coral default), NOT the byte-identical (239,118,123)→(239,117,123). **Born-RED:** at HEAD the hero is byte-identical after the seed change (the watcher is absent) — the readback REDs.

2. **D2 SIGN HONORED LIVE.** A live readback parks a pointer right at `pointerAttraction = -1` and asserts the centroid shifts AWAY (negative, leftward), NOT the +35.4px lunge-toward. AND a positive attraction still leans IN. **Born-RED:** at HEAD `-1` lunges +35.4px toward (the sign is dropped) — the readback REDs.

3. **D3 STRETCH DECISION RECORDED + MACHINE-CHECKED.** The DELTA records the decision (tune OR document). For (a) tune: a motion-delta readback shows `stretch=1.5` produces a squash >2× the noise floor distinct from the lean channel. For (b) document: the `stretch` jsdoc names it a swamped fine-detail axis + the demo slider is removed/labeled. **Born-RED on the no-op state** if (a) is chosen (the ~6%-within-noise HEAD REDs the >2× assert).

4. **D4 RESUME CLEAN + AURORA NON-REGRESSED (the SEVERE fix).** A π readback PAUSES then RESUMES the blob via the `paused`-prop path (the `DockBackgroundToggle` seam) and asserts the post-resume canvas is INTACT — the bead present (mask area in the resting band, ~0.13-0.27), motion in the normal range (NOT the 65.3 strobe), NO charcoal-slab/white-out (the body OKLCh-L in the cream band, not the wrecked solid). AND the aurora resume path (a sibling π readback or `proof:offscreen-pause` aurora arm) is NON-regressed. **Born-RED:** at HEAD the `paused`-prop resume explodes to motion 65.3 / mask 0.99 / charcoal slab — the readback REDs (and the "motion resumes" assertion that PASSES the wreck is replaced by the intact-canvas assertion that catches it — RA-blob §C.1's gate-trap).

5. **D5 LIBRARY CONFIGURATOR ADOPTED.** A source/structural check: `demo/stories/substrates/blob.vue` imports `Configurator` from `@mkbabb/glass-ui/configurator` and mounts NO raw `<input type=range>` for the blob config axes (the inv-16 dog-food). **Born-RED:** at HEAD the strip is raw `<input type=range>` (`:163,175,187`) — the structural check REDs the raw-input mounts.

6. **DELTA REGISTERED + LEDGER GREEN.** `W-BLOB-CONFIG-DELTA.md` exists, references own-surface `^W-BLOB-CONFIG-` real PNGs (the four fixes) at light+dark, carries the readback numbers; `"W-BLOB-CONFIG"` on `VISUAL-ALLOWLIST.json`; the `AY/PROGRESS.md` row flips `live-verified`; `proof:live-verified-ledger:ay` passes.

**Born-RED at HEAD (the whole gate):** the hero is byte-identical-coral after a seed (clause 1); `-1` lunges toward (clause 2); `stretch` is a no-op (clause 3); the `paused` resume wrecks the canvas (clause 4); the config is a raw-input strip (clause 5); the DELTA row is absent (clause 6). The wave is complete only when all six verify GREEN with the DELTA on disk.

## §7 — Scope fence + named successors

- It does **NOT** re-build the interaction (the hover-lean + drag-follow + mood-latch are the SHIPPED W10/W11/D7 machinery — RA-blob §D confirms them ALIVE; this wave fixes the config/render bugs AROUND them).
- It does **NOT** ship the cream default (W-BLOB2) or strip the DI (W-BLOB3) or carve the renderer (W-GOD1) — those land FIRST (the §5 sequence).
- The **mood hero resting RED** (RA-blob §C.3, the seed default `oklch(0.62 0.19 25)`) is **W-BLOB2 RG3 / W-COHERE E1**'s (the seed move to the cream/warm-red desaturated register) — NOT this wave (this wave fixes the LIVE feed, not the default seed value).
- The **WatercolorDot static-register overstatement** (RA-blob §C.4, "flat fully-saturated stickers, no droplet look") + the **bottom-dock occluding the hero** (RA-blob §C.2) route to **W-COHERE** (the set-cohesion + the demo-layout pass) — recorded here, owned there.
- The **click-flinch-not-bounce TUNE** (W-BLOB3 §RESIDUE R2, the `PULSE_ZETA` underdamp decision) folds into this wave's D3 axis pass OR the W-BLOB-TUNE register pass (HC-blob §4 RG6) — the orchestrator records which at dispatch (the W-BLOB-TUNE spec does not yet exist; the fold-into escape is the live default — HC-blob §4 RG6 caveat).
- **Named successor on any miss:** if the D4 resume-wreck root cause resists a clean fix (the cross-substrate diagnosis is inconclusive), the row stays `live-pending` and the named successor is a dedicated substrate-resume hardening pass (coordinated with W-AUR* + the W-CARDINAL-INFRA substrate-park clause) — the SEVERE bug does NOT ship un-fixed behind a green "motion resumes" trap.

## §8 — Cross-references

- Audit corpus: `docs/tranches/AY/audit/reality/RA-blob.md` (§A flick/click overstatement → routed to W-BLOB3 §RESIDUE; §B the 2 broken axes + the dead hero feed; §C.1 the SEVERE pause-resume wreck + the clean intersection-park contrast; §C.2 dock occlusion; §C.5 edge clip; §D the alive creature core) + the hc2 residue `docs/tranches/AY/audit/hardening/hc2/HC-blob.md` (the W-BLOB2/W-BLOB3 RG debts the cohesion pass coordinates).
- Sibling waves: W-BLOB2 (cream default — first), W-BLOB3 (DI-strip + interaction capture — first; its §RESIDUE routes the flick/click honesty here), W-GOD1 (carve — first), W-COHERE (the seed move + the static-dot/occlusion residues), W-AUR* (the shared `createCanvasLifecycle` substrate — verify non-regression).
- Canon: CLAUDE.md §Configurator (the Aurora chrome model the blob adopts — the inv-16 dog-food) + §"WebGL substrate offscreen-pause" (the `createCanvasLifecycle` park seam D4 must not regress) + §"DockBackgroundToggle" (the WCAG-2.2.2 control whose resume D4 fixes).
- MEMORY: `feedback_chrome_devtools_mcp` (use chrome-devtools-mcp for the D4 live diagnosis), `feedback_live_verify_capture` (the captured-DELTA bar), inv-16 (the library consumes its own components — the dog-food).
- Precepts: `docs/precepts/instructions/TRANCHE-AND-WAVE-SPEC.md` §"Hard gate" (the intact-canvas runtime assert that catches the wreck the "motion resumes" trap passes) + §"Trigger" (the diagnostic-loop trigger on the SEVERE bug).
