# W-G.5 · W-BLOB-GREENFIELD: the blob as a colony that separates, settles on one signal, and paints glass-ui's ink

| field | value |
|---|---|
| seat | band-G wave-spec seat, formation (relaunch 2026-09-25), `claude-opus-5-5`. Re-cut against master by the blob-run spec seat, 2026-11-10, `claude-fable-5-2` |
| read at | First cut: `b37a37c3`, built and probed on Chromium with Metal and WebGPU; the paint readings in §2 and the appendices are that seat's. Re-cut: master `b5ac6c5b6`, source and records only; nothing was built or run. Every source line cited below was re-read on master |
| release | `waves/INDEX.md`, the one record |
| the run | the blob run, third of four: W-G.1, W-B.9, W-G.5, W-G.5b (`W-G.1.md` §0.1) |
| families | F-48, the blob split (`audit/REGISTRY.md:1171-1183`): L01b-50, L05a-02, L05b-10 (blob half), R2-03-07. F-50, the blob's settle seam (`REGISTRY.md:1206,1212-1213,1219`): R2-03-06 and value.js's quiescence ask. Inbound: O-56 G-3 (the look), UIA-V-47, UIA-V-164, UIA-V-199, UIA-V-386, O-52 (hero-blob display-p3), O-153 (wake on `setMood` and `pulse`), O-204 causes (1) and (2). Folded here by W-E.10: the seed ceiling pair G-CHROMA and G-MOOD-STILL |
| a disease row | #50 GF-BLOB rode BJ and BK at W0 (`census-register-a.md:57`); five owner asks since BC H42 (L05b-10). Deciding it is this wave |
| edges | §8 |

## 0 · The spec of record, and what BL changes in it

The spec of record is GF-BLOB TERMINAL of 2026-07-28 (`BJ/addenda/2026-07-24-refinement/DESIGN-NOW.md:58-175`), which supersedes GREENFIELD-TERMINAL's GF-BLOB PASS 4 except for PASS 4's W3 (the stamp), W4 (the ink), ADJ-1/2/9/11 and its §REJECTED (`DESIGN-NOW.md:60`). The census's "#50 W1-W8" and C-12's "seven blob cells (W2-W6)" name this spec's waves. BL changes it in six places:

- **W1 (the GL excise) is W-G.1's**, with π-W1 (C-11). This wave starts at W2.
- **The settle seam is decided by W6's predicate.** `settled` is the closed-form energy predicate with a 1 s dwell and nothing else, so no mood source can veto it; that is value.js's ask ("a mood pin does not veto settle", `REGISTRY.md:1219`). Under an ambient drive the colony orbits and `settled` is false by definition; the consumer parks by quenching (`drive` → 0), which W6 makes the settle command.
- **O-52 joins W8.** The blob configures its canvas in `display-p3` where `(color-gamut: p3)` matches, resolves palette stops into that space by css-color-4 gamut mapping (never a per-channel clip), bounds `gamutClampOklch` by the buffer's gamut, and exposes the resolved space. W4's chroma targets are written in the buffer's gamut.
- **The body paints no shadow of its own.** The spec's W6 ends "the 24-step `softShadow2D` march dies; analytic per-body penumbra" with a gate, G-SHADOW-ANALYTIC (`DESIGN-NOW.md:106,129`). The march still dies. Its analytic replacement and that gate are struck. The owner's order of 2026-11-09 is "satellite blobs and goo morphing needs to be more pronounced, less shaded" (O-204), which postdates the spec, and value already ships the body with the shadow off. So the shader has no shadow term, the config loses `surface.shadow` and `surface.shadowSoftness`, and the stamp under the wrapper is the blob's one shadow.
- **The stamp is one neutral shadow that does not move.** PASS 4 W3 tinted the stamp's ink from palette stop 0 (chroma up to 0.06) and lifted it one rung on hover. `restraint.md` is newer: one shadow per surface, neutral in colour, and motion on transform and opacity only. The ink drops its hue and the hover lift is struck. W-G.5b's hover (the beads' pull, the body's lean) is the interaction's one motion.
- **Simulation facts are gated in vitest.** The spec measured separation, settle and chaos "on capture". A gate here runs in a browser only where the claim is what the page paints (§5).

## 1 · What it closes

| id | what |
|---|---|
| L01b-50, L05a-02, #50, C-12 | GF-BLOB W2-W8 unbuilt: `MAX_SATS = 4` (`constants.ts:13`); `lambda`, `quench`, `chaosLambda`, `0.3381` 0 hits in `src/components/blob` |
| L05b-10 (blob), R2-03-07, O-56 G-3 (look), N-8c, UIA-V-199 | "the blob is awful, not animated, and not glass-ui idiomatic": a matte shaded body with fused horns; no satellite ever separates |
| O-204 (1), (2) | an orbiting satellite's disc is shrunk by its opacity (`metaball.wgsl.ts:209`), and its wobble is absolute uv, so beads read as lobes fused to the body. Cause (3), the wrapper's `content-visibility`, is 11.1.0's |
| R2-03-06, the quiescence ask, UIA-V-47, UIA-V-386, O-153 | `settled` never turns true under a manual mood pin, so consumers park by wall clock; a config write, a `setMood()` or a `pulse()` neither wakes nor settles the parked blob |
| UIA-V-164 | the hero blob flashes as an opaque square tile during a colour jump (unmeasured; π-INK re-reads it) |
| O-52 | the blob renders sRGB on a p3 display |
| G-CHROMA, G-MOOD-STILL (from W-E.10) | the blob's ink: C p95 0.085-0.093 against the aurora's 0.140 one route away |

## 2 · The defect

Source, on master:

- **The inflation.** `shaders/metaball.wgsl.ts:209` `satG.x = satG.x + (1.0 - s.w) * 0.3;`. At the shipped orbit opacity 0.75 (`constants.ts:172`, `BASE_OPACITY`) that subtracts 0.075 uv from every satellite's radius, most of a 0.09 bead (O-204).
- **Separation is off.** `surface.fissionAmp` defaults to 0 (`types.ts:412`), read once (`useBlobSatellites.ts:142`).
- **The phase machine.** `useBlobSatellites.ts:226,233,301` (`absorbed`), `satelliteKinematics.ts` (129 lines, a closed-form orbit with absolute-uv wobble, `constants.ts:160-162`), `blobSimulation.ts:83-89` (`isQuiescent`), `:101,169` (`nextEventMs`).
- **The veto.** `useBlobMood.ts:173` `if (manualOverride && currentMood.value !== "idle") return false;`, with `manualOverride` armed by every `setMood` from the component (`Blob.vue:258-259`).
- **The shading.** `types.ts:384` `shadow: true` and `:430` `morphT: 1`, "the fully dressed endpoint"; the march at `metaball.wgsl.ts:241` (`softShadow2D`), applied at `:452-467` as a darkening of up to 0.20 L on the lower rim.
- **The stamp.** `Blob.vue:355` chains two `drop-shadow()` filters, `:356` transitions `filter`, `:360` swaps both on hover. Their eleven `--blob-shadow-*` declarations sit at `:root` (`src/styles/tokens/shadow.css:106-145`), unregistered, so the tint substitutes at `:root` and never sees the wrapper's `--blob-color` (GF-BLOB PASS 4 ADJ-6).
- **Resting promotion.** `Blob.vue:373` `will-change: transform` at rest.

Paint and behaviour, as read in September (appendices A-C):

| probe | reading |
|---|---|
| appendix A: `/substrates/blob`, the Blob's exposed API, pointer parked | `settled` false on all **48** samples over 12 s unpinned; after `setMood("sleepy")`, false on all **60** samples over 15 s |
| appendix A: the first blob isolated (page `#808080`, 1440×1400), 24 frames at 2 fps, connected components ≥ 3 % of the largest | **1** component in **24 of 24** frames: a matte shaded body with three fused horns |
| appendix B: G-CHROMA over that frame's blob pixels | C p95 **0.0926**, C max 0.0953, 4 hue bins (10°) at ≥ 1 % |
| appendix C: `(color-gamut: p3)` emulated, `GPUCanvasContext.configure` recorded | both blob canvases configured with the default colour space (`srgb`) |

And value's read of 2026-11-09 on its hero (value `56979e978`, `e2e/smoke/o1109-blob-goo.spec.ts`, ANGLE Metal, a 10 s window): before its change the body interior's OKLab L spread is **0.25**; with `morphT` scaled by 0.3 and the shadow off it is **0.044**. With everything config can reach (body 0.27, four 0.12 satellites at orbit 0.39, `fissionAmp` 0.8) lobes went from 0.25 to about 3 and the goo outside the body from 0.012 to 0.20 of the body's area, and the satellites still read as lobes fused to the body.

An earlier cut of appendix A cropped the canvas box with page chrome in view and read 3-4 "components" per frame. The isolation step is part of the instrument.

## 3 · The cure

GF-BLOB W2 to W8 (`DESIGN-NOW.md` §3) with PASS 4's W3 stamp and W4 ink, as §0 amends them:

1. **W2, the colony.** `BlobNode { parent, depth, r, m, x, y, vx, vy, children[] }`; the core pinned at the origin; the φ^(1/4) radius ladder from R = 0.22 (0.135967, 0.120556, 0.106891); depth-1 roster N = 3; per-pair k₀ = min(r_parent, r_child) / 3; one `array<vec4f>` of sources into one smin field; fixed dt = 1/240 s, 4 substeps per 60 Hz frame. `useBlobSatellites.ts` and `satelliteKinematics.ts` become `composables/blobColony.ts`.
   - **A bead's visible disc is its physical disc** (O-204 (1)). The inflation literal and its compensation comment go. Opacity never enters the distance field; a fade, if one remains, is an opacity on the colour.
   - **A bead's excursion is a fixed fraction of its orbit** (O-204 (2)). The colony has no closed-form orbit and no absolute-uv wobble: its forces are dimensionless in the orbit radius.
2. **W3, cohesion.** Central attraction n = 1.70 with the interior solution; the capillary contact well to gap = 2k₀ with approach-only damping; the integral pump (τ_ε = 7 s, Bo = 0.14, T₀ = 12 s) targeting specific orbital energy between the two derived turning radii; the one-sided containment invariant at `0.475 / POS_SCALE − r − subtreeReach`.
3. **W4, fission.** `surface.fissionAmp` becomes `surface.drive` (default 0.90; the Calm preset 0.30, below the threshold 0.3381); bonded or free is read from the field; the only latch is event hysteresis (latch above 2k₀ + r/2, release below 2k₀); a click adds a radial impulse at the derived knee J* = 0.00284.
4. **W5, depth.** `MAX_DEPTH = 2`, a loud clamp; depth-2 nodes are bonded lobes; the hero ships depth 1.
5. **W6, one settle signal.** `settled ⇔ ∀ nodes: ½v²_rel + U(d) + ψ(gap) ≤ L²/(2r_b²) + U(r_b)` held for 1 s. `isQuiescent` and `nextEventMs` are deleted, and so is `useBlobMood`'s `manualOverride` veto. The loop parks on `settled` and re-arms on pointer, mood, config and resize, through one scheduler: `setMood()`, `pulse()` and a config write on a parked blob each wake the renderer for the motion they start (O-153, UIA-V-47, UIA-V-386). Quench is `drive` → 0 on one row of the spring table. The spec names `gentle` (τ 1.2 s), a row master's table does not have (`src/composables/motion/spring/springPresets.ts:27-33`: press, present, dock, panel, bloom, world); the row is OQ-6.
6. **No shader shadow.** `softShadow2D`, its call site, the `uShadow` and `uShadowSoftness` lanes of the uniform block, and the config's `surface.shadow` and `surface.shadowSoftness` are deleted. Nothing replaces them (§0).
7. **W7, mood as three scalars** into the laws (arousal → drive in [0.55, 1.00], valence → T₀ in [16 s, 9 s], arousal → Bo in [0.22, 0.09]); below drive* the configured drive is literal and mood may not raise it. PASS 4 W5's lean law and `baseSquash` channel ride unchanged until W-G.5b replaces both with the membrane. The configurator rows are VizStudio's and attach when W-G.4 lands; until then the demo story keeps its own controls, with `fissionAmp` renamed.
8. **PASS 4 W3, the stamp, amended.** The `--blob-shadow-*` declarations are deleted from `:root`, with the hover `filter` swap and the `filter` transition. The wrapper carries one `drop-shadow()` from three properties of its own:
   - `--blob-stamp-offset` and `--blob-stamp-blur`, set from JS on the resize seam: the offset is the space rung nearest 4.4 % of the rendered diameter, and the blur is half the offset, floored to the series and never under 4.
   - `--blob-stamp-ink`, one declaration in the component's style: PASS 4 W3's lightness band [0.28, 0.34] with chroma 0, the same in both themes. It no longer reads the palette, so it needs no JS.
   - It does not change on hover.
9. **PASS 4 W4, the ink.** Per-bead ink is `paletteStops` whole; hue solved upward until G-CHROMA and G-MOOD-STILL pass.
10. **W8 close.**
    - Technicolor default, warm cream as the Calm preset, the heavy-cartoon A/B as the first capture.
    - **The default is painted, not lit.** The default `morphT` (`types.ts:430`, 1 today) drops to the largest value at which G5-G11 passes. value's measured point (its `morphT` scaled by 0.3, no shadow, 0.044) is the start. The lit terms stay as config rows and are not retuned here.
    - The canvas is sized to the orbit envelope, not 160 %; `will-change` only while unsettled; the display-p3 path of §0.
    - The demo's STAGE-1 section and all WebGL2 prose are struck (`demo/stories/manifest.ts:466`, `blob.vue:2`).
    - The WatercolorDot standing falsifier (`DESIGN-NOW.md:160`) is carried: if G5-G2 still reads one component in every frame after W3 and W4, the wave stops, and the next ruling is whether WatercolorDot replaces the engine.

## 4 · Files it touches

`src/components/blob/`: `Blob.vue`, `README.md`, `types.ts`, `constants.ts`, `presets.ts`, `config.ts`, `index.ts`, `shaders/{metaball,metaball-noise,metaball-palette}.wgsl.ts`, `composables/{blobColony (new),blobSimulation,useBlobMood,useBlobPointer,useMetaballRenderer,wgpuSetup,packBlobUniforms,resolveBlobSurface,easing}.ts`; deleted `composables/{useBlobSatellites,satelliteKinematics}.ts`. `src/styles/tokens/shadow.css` (the blob declarations out). `demo/stories/substrates/blob.vue` and the blob manifest entry.

Tests: new `tests/components/custom/blob/colony.test.ts` (§5's vitest gates, over the simulation with a seeded generator and the fixed step; no browser, no renderer). New probes in `tests-visual/blob-run/` (the folder, its `lib.mjs` and its harness page are W-G.1's): `g5-blob.mjs`, `g5-ink.mjs`, `g5-p3.mjs` (appendices A-C, driving harness `c=blob`) and `g5-shade.mjs`, which holds value's frame reader (`readGoo`'s body radius and `shade`, copied from value `56979e978` `e2e/smoke/o1109-blob-goo.spec.ts`). `MIGRATION.md`.

## 5 · Acceptance gates

**RED first.** Before its first edit the wave runs every gate on the commit W-B.9 leaves and banks the readings under `.cache/evidence/W-G.5/`. A gate that reads green there is struck and reported.

In vitest, over the simulation (`npx vitest run tests/components/custom/blob/colony.test.ts`). Times are simulated seconds at the fixed step:

| id | gate | passes when | before |
|---|---|---|---|
| G5-G1 · a mood pin does not veto settle | for each mood in the roster: `setMood(m)`, then `drive` → 0 | `settled` turns true within 5.2 s and holds for 3 s, on every mood | cannot be written (`drive` and `blobColony` do not exist). September, in the browser: false on 60 of 60 samples after `setMood("sleepy")` |
| G5-G3 · G-SEPARATION, on the field | drive 0.90, 300 s, 8 seeds, bonded or free read from the field | every seed has at least one latched event (gap > 2k₀ + r/2 held ≥ 250 ms) and the colony mean is ≥ 4 per minute; at drive 0.30 every seed has 0 | no event on any config |
| G5-G5 · the colony's laws | G-CHAOS (Benettin λ ≥ 0.25/s undriven, every seed, 300 s); G-FISSION-CAUSED+LATCHED (a click at J* at least doubles the 10 s event count; no latch without gap > 2k₀ + r/2; release below 2k₀); G-SETTLED-ONE-SIGNAL (true within 5.2 s of quench on 8 of 8 seeds, 0 flap, never true while any gap > 2k₀); G-BOUNDED (max (\|p\| + r) · POS_SCALE ≤ 0.500 at the 10-body depth-2 tree); G-DEPTH-BOUND | all | no file |
| G5-G12 · excursion scales with the orbit | orbit radii 0.25, 0.35 and 0.45, 8 seeds × 60 s each | the 99th-percentile excursion over the orbit radius varies by at most 10 % across the radii, and no bead crosses the containment ceiling | absolute-uv wobble (`constants.ts:160-162`) |

Static:

| id | gate | passes when | master |
|---|---|---|---|
| G5-G4 · the old physics is gone | `git grep -nE '\(1\.0 - s\.w\) \* 0\.3\|"absorbed"\|isQuiescent\|nextEventMs\|fissionAmp\|manualOverride\|satelliteKinematics' -- src/components/blob` | prints nothing | `metaball.wgsl.ts:209`, `useBlobSatellites.ts:142,226,233,301`, `blobSimulation.ts:83,101,169`, `useBlobMood.ts:173`, `types.ts:234,412` and others |
| G5-G4b · the shader has no shadow | `git grep -niE 'shadow' -- src/components/blob/shaders src/components/blob/composables src/components/blob/types.ts src/components/blob/constants.ts src/components/blob/presets.ts src/components/blob/config.ts` | prints nothing | `metaball.wgsl.ts:241,313,452-467`, `uniformBridgeWGPU.ts:251-252`, `constants.ts:249-250`, `types.ts:189,195,384,385` and their comments |
| G5-G8a · no root stamp tokens | `git grep -n -- '--blob-shadow-' -- src` | prints nothing | 11 declarations in `shadow.css`, 3 uses in `Blob.vue` |

In paint, Chromium on Metal, harness `c=blob` at ⌀512 on a flat page, one run. Captures are canvas-cropped and connected-component labelled:

| id | gate | passes when | before |
|---|---|---|---|
| G5-G2 · the blob separates | appendix A's strip at the default drive: 24 frames at 2 fps | at least 1 frame with ≥ 2 components | **0 of 24** (September) |
| G5-G6 · G-CHROMA | appendix B over the blob's pixels, light and dark, Calm preset idle | C p95 ≥ 0.13, C max ≤ 0.15, ≥ 4 hue bins (10°) at ≥ 1 %, in both themes | light: C p95 0.0926 (September) |
| G5-G7 · G-MOOD-STILL | five mood stills, each time-averaged over 4 s | sleepy and excited separate on bead reach and rest aspect by ≥ 3× the same-mood spread; pairwise ΔL ≥ 8/255; hue spread ≥ 20° | GF-BLOB's reading: ΔL 1.83-3.18, hue 1.4° |
| G5-G8b · the stamp is one neutral shadow | the wrapper's computed `filter` and `--blob-stamp-ink`, light and dark, at rest and under hover | exactly one `drop-shadow(`; the ink's chroma ≤ 0.02 and L ≤ 0.35; the four readings are identical | two chained drop-shadows, swapped on hover; `--blob-stamp-ink` absent |
| G5-G9 · display-p3 | appendix C | under `(color-gamut: p3)` the canvas is configured `display-p3` and the instance exposes `colorSpace: "display-p3"` | default colour space (September) |
| G5-G10 · no resting promotion | the wrapper at rest (`settled` true) | computed `will-change: auto` | `Blob.vue:373` |
| G5-G11 · the body is painted, not shaded | `g5-shade.mjs` on the default preset: the page plated black, the wrapper's filter off, 20 frames at 500 ms. Per frame, the OKLab L spread (p97 − p3) over the pixels inside 0.9 body radii | the median of the 20 is ≤ 0.05 | not read on glass's harness. value's hero before its change: 0.25; with `morphT` × 0.3 and no shadow: 0.044 |
| G5-G13 · a free bead is its own size | one frame holding a free bead, at DPR 2: the bead's component, measured across its bounding box | its diameter is within 0.004 uv (4 px) of twice one of the three ladder radii of §3 item 1 | no bead is ever free; the inflation takes 0.075 uv |
| G5-G14 · a parked blob wakes | after `settled` is true and the loop is parked, in turn: `setMood()`, `pulse()`, one config write; frames counted at `GPUQueue.submit` | each presents at least one new frame within two animation frames | O-153 |

Bites, each run once and banked beside its green reading: re-add the ×0.3 inflation (G5-G4, G5-G13, G5-G2); drop the hysteresis (G5-G5's latch clause); set drive 0.30 (G5-G3's zero clause is this bite's own assertion); restore the mood veto (G5-G1); restore the absolute wobble (G5-G12); restore `shadow: true` with the march (G5-G4b, G5-G11); tint the ink from stop 0 or add a second `drop-shadow` (G5-G8b); hold `baseSquash` constant across moods (G5-G7).

WebKit runs no cell of this wave. The shader is one WGSL source, and whether Playwright WebKit has WebGPU at all is `W-G.1.md` OQ-2.

## 6 · π and DELTA obligations

Harness `c=blob` and route `/substrates/blob`; canvas-cropped, component-labelled, screenshots only.

- **π-SEPARATE.** 30 s at 2 fps at drive 0.90, before and after, light and dark. The heavy-cartoon A/B is this first capture.
- **π-FISSION** (one latched episode, bonded → free → re-bonded, 9 frames at 1.4 s), **π-CALM** (drive 0.30, every frame one component), **π-CHAOS** (twin seeds 60 s apart, overlaid, with the λ figure), **π-DEPTH** (depth 1 and 2, same seed and time), **π-CONTAIN** (the peak frame at 1440×979 and 390×844), **π-SETTLE** (the quench pair), **π-PERF** (simulation ≤ 0.5 ms per frame at 13 bodies; GPU fill with the aurora co-present against the < 7 % budget).
- **π-INK and π-STAMP.** The blob beside the aurora, both themes, before and after, with appendix B's numbers; the stamp at ⌀112, 240, 480 and 768; UIA-V-164's colour-jump frame strip re-read here.
- **π-SHADE.** The default preset before (dressed, shadow on) and after, both themes, with G5-G11's twenty readings.
- **π-P3.** On a p3-capable display the same frame in sRGB and in p3, with the configured colour space recorded.
- **π-LOOK (O-56 G-3, O-204).** The hero at rest and in an episode, both themes, put to the owner at the run's close with π-SHADE and π-STAMP. The run does not tag before he has read them.
- Real Safari is unmeasured; its one cell is the owner's glance at the close.

## 7 · MIGRATION rows

| removed or changed | replacement |
|---|---|
| `config.surface.fissionAmp` | `config.surface.drive` (0 to 1; default 0.90; below 0.3381 the colony never separates) |
| `config.surface.shadow`, `config.surface.shadowSoftness` | none; the body paints no shadow. The stamp under the wrapper is the one shadow |
| the default `config.morphT` of 1 | the value G5-G11 sets; a consumer that wants the dressed body sets `morphT: 1` |
| `config.membrane.smoothK` and its mood multiplier | none; the meniscus is derived per pair |
| `config.satellites.absorbedDuration`, the phase timing constants, `eccentricity` | none; phases no longer exist |
| `settled` true only when no satellite is in transition and no mood is pinned | `settled` is the colony's energy predicate held 1 s; set `drive` to 0 to settle |
| barrel names `useBlobSatellites`, `BlobSatelliteSystem`, `SatellitePhase`, `SatelliteInternal`, `MetaballSource` (where exported) | none |
| `--blob-shadow-*` tokens | `--blob-stamp-offset`, `--blob-stamp-blur`, `--blob-stamp-ink`, set by the component |
| `BLOB_HERO` roster of 4 | 3 |
| (new) the instance's `colorSpace` | additive |

value.js's HeroBlob, in its own tranche: its wall-clock park (`BLOB_IDLE_MS`, `SLEEPY_POSE_MS`, R2-03-05) becomes `drive` → 0 and a watch on `settled`; its `shadow: false` and `fissionAmp` lines go (`HeroBlob.vue:239` at `56979e978`); its body returns to 0.325 with detached beads orbiting outside it. slides carries the barrel breaks and `fissionAmp` → `drive`.

## 8 · Edges

This wave waits on W-G.1, for the one engine, the blob's GL excise and the harness. It does not wait on W-G.6: the harness page W-G.6 was to land is W-G.1's now. It does not wait on W-B.9, which precedes it in the run only because one branch lands one wave at a time. W-G.5b waits on this wave. W-G.4 is unordered against it; the configurator rows attach when both are in.

## 9 · Ledger rows it closes

#50 (BUILD, the disease row decided; C-11 by W-G.1, C-12 here); L01b-50, L05a-02, L05b-10's blob half; R2-03-06, R2-03-07; O-56 G-3's look; N-8c; the quiescence ask (ANSWERED: `settled` is the energy predicate; park with `drive` → 0); O-52 (BUILD); O-153; O-204 (1) and (2); UIA-V-47, UIA-V-164, UIA-V-199, UIA-V-386; G-CHROMA and G-MOOD-STILL (W-E.10's fold).

## 10 · Gestalt passes (P-1)

- **Tranche fit:** the oldest live owner ask is built from its converged spec, and the one consumer that parks the blob gets a signal it can use.
- **Wave:** the four vitest gates, the three static gates and the nine paint cells green in one pass, each with its banked bite.
- **Feature:** π-SEPARATE and π-FISSION show beads that leave and return; π-SHADE shows a painted body; π-LOOK is read by the owner.

## Open questions

- **OQ-4 (owner, by capture).** G5-G11 reads L spread over the whole body interior, so it counts the palette's own lightness range as well as the shading. With a Technicolor default whose stops differ in lightness, the bound holds only if the stops painted across the body sit within a 0.05 band. Default: the gate stands as value wrote the read, and the default palette's body stops are chosen inside that band (hue and chroma carry the colour). If π-SHADE reads flat to him, the gate narrows to shading alone: the same read with `morphT` 0 subtracted.
- **OQ-5 (owner, by capture).** The stamp's ink at chroma 0 against the spec's stop-0 tint (chroma ≤ 0.06). Default: neutral, as `restraint.md` rules shadows. π-STAMP shows both at ⌀240 and ⌀480 in both themes.
- **OQ-6 (measurement).** The quench spring, and PASS 4 W5's mood posture spring, are specified on `gentle` (0.82, ζ 1.00), which is not a row of the table. Default: `world` (0.48, ζ 1.0), the table's long critically damped row, with no new row; the 5.2 s bound in G5-G1 and G5-G5 was measured at τ 1.2 s and is re-read in simulation on the first run. If the colony does not settle inside it on `world`, the bound is re-derived from that reading; no spring row is added for it.

## Appendix A · `g5-blob.mjs`

As run in September on the demo route; in the three appendices "HEAD" is `b37a37c3`. The wave lands it in `tests-visual/blob-run/` with two changes: the vnode walk goes, since harness `c=blob` puts the instance on `window`, and its settle row leaves the probe, since G5-G1 is a vitest gate now. Its 24-frame strip is G5-G2.

```js
// Screenshot-only on the canvas bbox (never getContext on the live WebGPU canvas). Real GPU.
import { open, reporter, sleep, CAP } from './lib.mjs';
import { PNG } from '/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js';
import fs from 'node:fs';
const R = reporter('g5-blob');
const { browser, page } = await open('/substrates/blob', { settle: 3000, h: 1400 });
await page.mouse.move(2, 2);
const exposedOk = await page.evaluate(() => { const found = []; const walk = (v, d) => { if (!v || d > 400) return; if (v.component) { const e = v.component.exposed; if (e && typeof e.setMood === 'function') found.push(e); walk(v.component.subTree, d + 1); } if (Array.isArray(v.children)) for (const c of v.children) if (c && typeof c === 'object') walk(c, d + 1); if (v.suspense) walk(v.suspense.activeBranch, d + 1); }; walk(document.querySelector('#app')._vnode, 0); window.__blob = found[0]; return { blobs: found.length, ok: !!window.__blob }; });
const watch = async (ms) => page.evaluate(async (ms) => { const seen = []; const t0 = performance.now(); while (performance.now() - t0 < ms) { seen.push(!!window.__blob.settled?.value); await new Promise((r) => setTimeout(r, 250)); } return { anyTrue: seen.includes(true), lastTrue: seen.at(-1), samples: seen.length }; }, ms);
const unpinned = await watch(12000);
await page.evaluate(() => window.__blob.setMood('sleepy'));
const pinned = await watch(15000);
R.row('G5-G1 a manual mood pin does not veto settle', pinned.anyTrue, { exposedOk, unpinned, pinnedSleepy: pinned, mood: await page.evaluate(() => window.__blob.currentMood?.value) });
await page.addStyleTag({ content: 'body * { visibility: hidden !important } .goo-blob-wrapper:first-of-type, .goo-blob-wrapper:first-of-type * { visibility: visible !important } html, body { background: #808080 !important } .shell-aurora { display: none !important }' });
await sleep(800);
const box = await page.evaluate(() => { const c = document.querySelector('canvas.goo-blob-canvas'); const r = c.getBoundingClientRect(); const x = Math.max(0, r.x), y = Math.max(0, r.y); return { x, y, width: Math.min(innerWidth, r.right) - x, height: Math.min(innerHeight, r.bottom) - y }; });
await sleep(600);
const comps = [];
for (let f = 0; f < 24; f++) {
  const png = PNG.sync.read(await page.screenshot({ clip: box }));
  const { width: w, height: h, data } = png; const bg = [data[0], data[1], data[2]];
  const m = new Uint8Array(w * h); for (let i = 0; i < w * h; i++) m[i] = Math.abs(data[4 * i] - bg[0]) + Math.abs(data[4 * i + 1] - bg[1]) + Math.abs(data[4 * i + 2] - bg[2]) > 40 ? 1 : 0;
  const lab = new Int32Array(w * h); const areas = []; let k = 0;
  for (let i = 0; i < w * h; i++) { if (!m[i] || lab[i]) continue; k++; let a = 0; const st = [i]; lab[i] = k; while (st.length) { const j = st.pop(); a++; const x = j % w, y = (j / w) | 0; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= w || Y >= h) continue; const q = Y * w + X; if (m[q] && !lab[q]) { lab[q] = k; st.push(q); } } } areas.push(a); }
  const big = Math.max(0, ...areas); comps.push(areas.filter((a) => a >= 0.03 * big).length);
  if (f === 0) fs.writeFileSync(`${CAP}/g5-blob-f0.png`, PNG.sync.write(png));
  await sleep(500);
}
R.row('G5-G2 the blob separates in paint: >= 1 frame of 24 (12 s) with >= 2 components', comps.some((c) => c >= 2), { componentsPerFrame: comps });
await browser.close();
R.done();
```

HEAD output: `FAIL G5-G1 … {"exposedOk":{"blobs":2,"ok":true},"unpinned":{"anyTrue":false,"lastTrue":false,"samples":48},"pinnedSleepy":{"anyTrue":false,"lastTrue":false,"samples":60},"mood":"sleepy"}`; `FAIL G5-G2 … {"componentsPerFrame":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}`. G5-G2 keeps this form.

## Appendix B · `g5-ink.mjs`

```js
// G-CHROMA over the isolated blob's pixels (background #808080 masked out).
import { PNG } from '/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js';
import fs from 'node:fs';
const png = PNG.sync.read(fs.readFileSync(process.argv[2]));
const f = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const Cs = []; const bins = new Array(36).fill(0);
for (let i = 0; i < png.data.length; i += 4) { const R = png.data[i], G = png.data[i + 1], B = png.data[i + 2]; if (Math.abs(R - 128) + Math.abs(G - 128) + Math.abs(B - 128) <= 40) continue;
  const r = f(R / 255), g = f(G / 255), b = f(B / 255); const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s; const C = Math.hypot(a, bb); Cs.push(C); bins[Math.floor(((Math.atan2(bb, a) * 180 / Math.PI + 360) % 360) / 10)]++; }
Cs.sort((x, y) => x - y); const n = Cs.length; const occ = bins.filter((k) => k / n >= 0.01).length;
const r = { px: n, Cp95: +Cs[Math.floor(0.95 * n)].toFixed(4), Cmax: +Cs[n - 1].toFixed(4), hueBinsAt1pct: occ };
const pass = r.Cp95 >= 0.13 && r.Cmax <= 0.15 && occ >= 4;
console.log(`${pass ? 'PASS' : 'FAIL'} G5-G6 G-CHROMA ${JSON.stringify(r)}`); process.exitCode = pass ? 0 : 1;
```

HEAD output on `g5-blob-f0.png`: `FAIL G5-G6 G-CHROMA {"px":48237,"Cp95":0.0926,"Cmax":0.0953,"hueBinsAt1pct":4}`. The dark-theme cell is taken in the same run after the wave (HEAD's dark cell was not captured at this seat).

## Appendix C · `g5-p3.mjs`

```js
import { open, reporter, sleep } from './lib.mjs';
const R = reporter('g5-p3');
const init = `(() => { window.__cfg = []; const c = GPUCanvasContext.prototype.configure; GPUCanvasContext.prototype.configure = function (d) { window.__cfg.push({ cls: this.canvas?.className?.split(' ')[0], colorSpace: d.colorSpace ?? '(default srgb)', format: d.format }); return c.call(this, d); }; })();`;
const { browser, ctx, page } = await open('/substrates/blob', { init, settle: 500, h: 1400 });
const cdp = await ctx.newCDPSession(page);
await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'color-gamut', value: 'p3' }] });
await page.reload({ waitUntil: 'networkidle' }); await sleep(3000);
const r = await page.evaluate(() => ({ p3: matchMedia('(color-gamut: p3)').matches, cfg: window.__cfg.filter((x) => /goo-blob/.test(x.cls || '')) }));
R.row('G5-G9 (color-gamut: p3): every blob canvas is configured display-p3', r.p3 && r.cfg.length > 0 && r.cfg.every((x) => x.colorSpace === 'display-p3'), r);
await browser.close();
R.done();
```

HEAD output: `FAIL … {"p3":true,"cfg":[{"cls":"goo-blob-canvas","colorSpace":"(default srgb)","format":"bgra8unorm"},{"cls":"goo-blob-canvas","colorSpace":"(default srgb)","format":"bgra8unorm"}]}`.
