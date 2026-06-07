# AW Aurora+Blob Band — Implementation-Order Index (W4–W11)

Convergence-lead output. This index is the implementation-ready ordering for the aurora painterly
engine (W4–W8) and the blob droplet (W9–W11), after the critique's six must-fixes were resolved and
the modern-guidance folds (concrete shader algorithms, the value.js color discipline, the WebGPU
fork, the interaction model) were written into each wave spec under `docs/tranches/AW/waves/`.

It is NOT a re-statement of the per-wave specs — read those for the file bounds, the agent units, and
the born-RED gate registrations. This index gives the band-level DAG, the open-order, the must-fix
ledger, the cross-band color discipline, and the budget-governor preamble that gates W4/W7.

---

## 0. The convergence ledger — the six must-fixes, resolved

| # | Must-fix (critique) | Resolution (where it landed) |
|---|---|---|
| 1 | **Budget-containment claim is vacuous** — `profile:budget` measures only `dist/glass-ui.js` (root barrel) + `dist/styles/index.css`; aurora ships as `dist/aurora.js` (the `/aurora` subpath, NOT root-barrel cherry-picked), which is NOT in the `BUDGETS` map and never walked. Every "stays inside profile:budget" for shader growth was a no-op. | **W4 §FileBounds + §6 Budget governor**: an **AW.W4.0 preamble step** adds `"dist/aurora.js"` to the `BUDGETS` map (`scripts/profile-bundle.mjs:118`) at a real ceiling (HEAD ≈53.7k raw / 17.8k gzip + a one-time conscious lift) **BEFORE any shader byte lands** — born-RED governor. All "stays inside profile:budget" re-scoped to the `dist/aurora.js` chunk ceiling. `profile:aurora` (`W5-aurora-profile.json`) stays the orthogonal FPS/ALU floor. **W7 §6 item 7** re-baselines the same aurora-chunk ceiling for the WGSL+compute growth. |
| 2 | **W4 mislocates MEDIUM_ID + underspecifies new-medium dispatch** — `MEDIUM_ID` is in `uniformBridge.ts:32-38` not `presets.ts`; `AuroraMedium` at HEAD is `smooth\|pastel\|watercolor\|oil` (crayon is a peer at `uMedium==4` via `resolveMediumId`); the `uMedium` ladder is `if==1…else if==4` in `aurora.frag.ts:321-324`. | **W4 §Scope 3 + §FileBounds**: the **5-step wiring** enumerated — (1) `presets.ts:48` union `+="vangogh"`; (2) `uniformBridge.ts:32-38` `MEDIUM_ID += vangogh:5` (the `satisfies Record<…>` forces it); (3) `resolveMediumId` pass-through; (4) a NEW `else if (uMedium==5)` dispatch in `aurora.frag.ts:321-324`; (5) the `uStrokeOrient`/`uLightDir`/`uLightColor` uploads. `proof:aurora-vangogh-preset` asserts all five landed. |
| 3 | **W7 is not one-pass buildable — bundles 3+ substrates** (async probe + WGSL twin + createGPUCanvas backend + generic FBO seam + 4-pass Kuwahara). | **W7 §2 State**: re-scoped as **three independently-buildable rungs** — **W7a** (WGSL color-twin parity ONLY, no backend; lands FIRST in commit order to de-risk the divergence class) → **W7b** (the async probe + `createGPUCanvas` backend skeleton drawing the SAME single-pass aurora) → **W7c** (the generic FBO/storageTexture seam + the multi-pass Kuwahara). Each lands + gates + closes on its own; the next is purely additive. |
| 4 | **WebGPU second-context seam is unguarded** — `proof:webgl-substrate-single` clause (a) regex is `getContext('webgl2')`, which a `navigator.gpu` backend never matches (passes by irrelevance); clause (b) only inspects `useWebGLCanvas.ts` text. The "stays green" claim is true-by-irrelevance. | **W7 §6**: a NEW born-RED gate **`proof:webgpu-substrate-single`** — (1) `createGPUCanvas.ts` is the ONLY `navigator.gpu` acquisition site; (2) no baked pass-count / `rgba16float` / Kuwahara-sector-count in EITHER substrate; (3) the WGSL twin SPLICES the shared `procedural-color` chunk rather than re-authoring. |
| 5 | **Blob mood "wire-or-cut ≥2 consumer" is mis-framed** — `useBlobMood` is ALREADY exported (`goo-blob/index.ts:11`) AND consumed by `GooBlob.vue:60`, so it is already load-bearing; excising it is a public-surface BREAK, not an orphan cleanup. | **W11 §Scope 5 + §11.c**: re-scoped to the ACTUAL decision — KEEP the exported composable; the genuine sub-orphans are `setMood` (no caller) + `orbitSpeedScale`/`wobbleScale` (lerped but unread). `proof:blob-mood-resolved` asserts no declared-but-UNREAD sub-orphan (NOT an external-consumer count). FALLBACK collapse is a recorded `MIGRATION.md` public-surface removal (L invariant 4), not a quiet delete. |
| 6 | **value.js peer overstated** — claim was "interpolateHue ships under 0.11.0; the gate HARD-DEPENDS on a peer-widen." Verified: `interpolateHue` + `HueInterpolationMethod` ship in the INSTALLED `0.10.0` (`dist/index.d.ts:15-16`); the peer is ALREADY `^0.10.0 \|\| ^0.11.0` (`package.json:617`). | **W5 §5.1 + §10**: the stale "registry-green ONLY against 0.11.0 / HARD-DEPENDS on the peer-widen" framing RETIRED — the gate is registry-green against the installed `0.10.0`, no peer precondition. The hue-port gate fixture MUST SEED the antipode `(30°,210°,t=0.5,"shorter")` + the warm→cool `(30°,250°,t=0.5,"longer")` as NAMED rows (the radians-native trap diverges by 180° at the antipode and is invisible to a sampled grid). |

### Unhandled cases folded in

- **single-color-core does NOT cover the GLSL hue port** (W5 §6 item 4) — the in-shader turns-domain
  `interpolateHue` transcription is a GLSL string, outside `proof:single-color-core`'s 11-primitive
  TS-regex; the dedicated 1e-6 hue-port gate is LOAD-BEARING and cannot be skipped.
- **WGSL execution mechanism** (W7 §6) — WGSL can't run in vitest/node; the gate uses a
  hand-transcribed WGSL→TS port (`tests/components/custom/aurora/aurora-color.wgsl-port.ts`)
  mirroring the GLSL→TS oracle, BOTH certified against the SAME `metaball-color.glsl-port.ts` (never
  a new oracle), with the asymmetric witness `#3a7bd5`.
- **premultipliedAlpha confirmation** (W9 §Scope 4) — VERIFIED `premultipliedAlpha: true` +
  `antialias: false` (`useMetaballRenderer.ts:149-150`); the premultiply-last discipline is correct
  against the real context attr; both stay untouched.
- **cursor write-path PRM** (W8 §5.1 sub-gate) — the `pointermove` listener writes `uLightDir`
  OUTSIDE the rAF loop, so it must early-out on `handle.reducedMotion` (not just the orbit path
  freezing); the gate asserts the write-path check.
- **first-dt clamp on every integrated axis** (W11 §Scope 7) — the W10 spec clamps the first
  post-park `dt` on the spring only; W11's tempo integration extends the ~50ms clamp to mood.tick /
  orbit / satellite-phase / noise-scroll.

> **Charter reconciliation flag for the orchestrator.** `docs/tranches/AW/AW.md` (the band charter,
> NOT in this convergence's edit scope) still carries the stale "stays inside `profile:budget`"
> phrasing in the W4 row (line 144) and W7 row (line 148). The wave specs are now authoritative (the
> aurora-chunk governor); the charter rows should be reconciled to "stays inside the `dist/aurora.js`
> chunk ceiling" at the orchestrator's convenience. No behavior depends on the charter text.

---

## 1. The band DAG + open-order

Two arms run in parallel; the blob arm is fully disjoint from the aurora arm (separate `custom/`
trees, separate gates), so the two bands can interleave on the orchestrator's schedule.

```
AURORA BAND (W4–W8)                          BLOB BAND (W9–W11)
───────────────────                          ──────────────────
W5  (color core — OPENS FIRST)               W9  (lit droplet — OPENS FIRST in blob arm)
 │   lands the OKLCh brokenColorJitter         │   lands surfaceNormal() keystone
 │   seam W4 consumes                          │
 ▼                                             ▼
W4  (painterly — consumes W5's jitter)       W10 (soft-body — parallel-eligible with W9;
 │   AW.W4.0 budget-governor PREAMBLE          │    if same window, W9 commits first —
 │   lands the dist/aurora.js ceiling          │    shared metaball.frag.ts)
 │   BEFORE any shader byte                     │
 ▼                                             ▼
W6  (atoms — pure TS; after W4+W5 so the    W11 (mood + color-harmony hoist —
 │   medium/harmony unions are final;          │    after W9 (surfaceNormal), W10 (pointer
 │   declares the interactivity flag SHAPE)    │    /idle state), AND W5 (the color.ts
 ▼                                             │    write conflict — W5 owns aurora color.ts;
W7  (gated WebGPU — after W4+W5)              │    W11 hoists ColorHarmony to /color)
 │   W7a (WGSL twin) → W7b (probe+backend)
 │   → W7c (multi-pass FBO/Kuwahara)
 ▼
W8  (interactive — after W4 (uLightDir)
     + W7 (the WebGPU stateful wake))
```

**Aurora open-order (charter D-5/§2 fixed):** **W5 → W4 → W6 → W7 → W8.** W5 opens FIRST despite the
higher NUMBER of W4 — W4's van-Gogh/oil-pastel per-stroke jitter consumes the OKLCh `brokenColorJitter`
seam W5 lands. The numbering (W4 then W5) is NOT the execution order.

**Blob open-order:** **W9 → W10 → W11.** W10 is parallel-eligible with W9 but if dispatched in the
same window both touch `metaball.frag.ts`/`useMetaballRenderer.ts`, so W9 commits to a clean main
first. W11 opens only after W9 + W10 + **W5** are all on a clean main (W11's `ColorHarmony` hoist
sources `aurora/composables/color.ts`, which W5.2 owns as `modify` — never a concurrent write).

**Cross-band coupling — the one hard edge:** W11 depends-on W5 for the harmony hoist. Two landing
paths (W11 §Scope 4): PREFERRED — W5 performs the `ColorHarmony` hoist into `/color` as the last step
of its derive work and W11 only consumes it; FALLBACK — W11 performs the hoist, sequenced strictly
after W5 commits. Decided at dispatch; either way the two waves never co-write `color.ts`.

---

## 2. Implementation order (the linear sequence the orchestrator executes)

The recommended single linear order that respects every dependency (the two arms can be interleaved,
but this is a valid total order):

1. **W5 — Aurora color core.** Opens the aurora band. The OKLCh in-shader interpolation (splice
   `OKLCH_MATRICES_GLSL`, `samplePalette` → OKLab/OKLCh, turns-domain `interpolateHue` hue port,
   `brokenColorJitter`/`saturate3` → OKLCh) + the CPU derive front door (harmonies via
   `interpolateHue` with `complementary='longer'`, bell-chroma default, temperature, `deriveScene`).
   Two parallel file-disjoint units (GLSL arm / CPU-TS arm).
2. **W9 — Blob lit droplet.** Opens the blob band (independent of aurora). `sceneDist()` factor +
   IQ tetrahedron normal (screen-space epsilon) + the four LINEAR-space lit terms (warm-cream OKLCh
   glint, `uRimColor` Fresnel via the injected `ColorResolver`, warm-clamped iridescence, fake-SSS)
   between the OKLCh resolve (`:172`) and the OETF (`:173`); smin normalize + gradient-noise edge.
3. **W4 — Aurora painterly.** **AW.W4.0 budget-governor preamble FIRST**, then the serial shader
   lane: structure-tensor keystone (.1) → impasto height→normal→relight (.2) → van-Gogh medium
   (.3, the 5-step new-medium wiring) → oil-pastel rework (.4). Consumes W5's OKLCh jitter seam.
4. **W10 — Blob soft-body.** The single CPU `useBlobInteraction` state machine: decaying-radius
   trail (fixed `uTrail[TRAIL_N]` + dynamic break), volume-preserving squash (perp `==1/sa`),
   semi-implicit-Euler click spring (`pulse>-0.9`, first-dt clamp), idle Lissajous; migrate the
   `0.12` lerp to the `dt`-fed `SpringProgress` / Holmer damp.
5. **W6 — Aurora atoms.** Pure-TS `resolveAtoms` ≤7-atom door; `DEFAULT_ATOMS` byte-resolve to the
   wispy-sky default; declares the interactivity flag SHAPE (default OFF). Opens after W4+W5 so the
   medium/harmony unions are final.
6. **W7 — Aurora gated WebGPU.** **W7a (WGSL color-twin parity, no backend) → W7b (async probe +
   `createGPUCanvas` skeleton + the new `proof:webgpu-substrate-single`) → W7c (generic FBO seam +
   multi-pass Kuwahara).** Re-baselines the aurora-chunk ceiling.
7. **W11 — Blob mood + color hoist.** Iridescence/SSS (consumes W9 `surfaceNormal`) → `deriveBlobPalette`
   + the `ColorHarmony` hoist to `/color` (after W5) → mood wire-or-recorded-collapse + the master
   tempo scalar (`tempo × dt` never `× uTime`; first-dt clamp; no parallel matchMedia).
8. **W8 — Aurora interactive.** Cursor-as-light driving W4's `uLightDir` (idle auto-orbit), velocity-
   reactive flow (cursorModel gains velocity), scroll via `useScrollProgress`, the WebGPU stateful
   wake (on W7's branch). The master tempo scalar; the cursor write-path PRM early-out.

> Steps 2/4/7 (the blob arm) are fully disjoint from 1/3/5/6/8 (the aurora arm) and may run in a
> parallel lane; the only cross-edge is W11 (step 7) depends-on W5 (step 1) for the harmony hoist.

---

## 3. The shared color discipline (ONE core, certified legs)

The math source is value.js's Ottosson primitives ONLY (`proof:single-color-core` guards 11). The
shared GLSL chunk `procedural-color.glsl.ts` (OETF + the four Ottosson OKLab/OKLCh mat3 literals,
transposed column-major, + FBM_ROT) is spliced into BOTH `aurora.frag.ts` (W5 ADDS the
`OKLCH_MATRICES_GLSL` splice it currently lacks — it imports only `FBM_ROT_GLSL` + `OETF_GLSL` at
`aurora.frag.ts:30-32`) and `metaball.frag.ts` (already splices all three). `metaball-color.glsl-port.ts`
is the SINGLE CPU oracle; every new leg certifies against it, never a new oracle:

| Leg | Wave | Discipline |
|---|---|---|
| In-shader OKLCh hue arc | W5 | Transcribe `interpolateHue` in the NORMALIZED-TURNS domain (`h_rad/TAU→turns`, the exact `.5`/`+1.0` branch, `fract()` wrap, `*TAU` back); a radians-native port (`PI`/`+TAU`) diverges 180° at the antipode — FORBIDDEN. 1e-6 gate with the antipode + warm→cool `'longer'` rows seeded. |
| WGSL twin | W7a | Copy the transposed mat3 literals VERBATIM into `mat3x3f` (column-major takes columns — no re-transpose); premultiply AFTER the OETF; certified against the GLSL oracle via the hand-transcribed WGSL→TS port + witness `#3a7bd5`. |
| Blob warm-cream/rim/iridescence | W9 | Every lit color routes through the spliced OKLCh matrices (warm-cream as an OKLCh tint `L~0.97,C~0.03,hue~85°`, NOT hardcoded sRGB white); `uRimColor` via the injected `ColorResolver` seam (NOT a DOM probe). |
| Blob multi-stop palette + harmony | W11 | `deriveBlobPalette` consumes the `ColorHarmony` hoisted to `/color`; OKLab interp + midpoint chroma-bump. |

**Gamma/OETF discipline is ABSOLUTE.** All lighting (aurora impasto Blinn-Phong; blob spec/rim/
iridescence/SSS) is added in LINEAR space BEFORE `aces()`/`linearToSrgb` — a post-OETF apply
double-gammas highlights and fringes the premultiplied edge; the `*alpha` premultiply stays LAST on
the straight-alpha gamma triple. **Return-space is NOT unified:** `oklchToLinear` is aurora's bake
target (the shader ACES-tonemaps in linear); `oklchToGammaRgb` is the blob's DEC-AT-7 faithful-lift
exit — forcing one return space re-introduces the A5/A2 darkening defect. `ColorHarmony` +
`HueInterpolationMethod` hoist to the `/color` leaf as the single types source for both backdrops.

---

## 4. Per-wave gate roster (born-RED)

| Wave | Gates (★ = NEW at convergence) | Standing-green it must not break |
|---|---|---|
| **W5** | `proof:aurora-oklch-interp` (matrices 1e-6 + ANTIPODE-seeded hue-port + blue→yellow midpoint chroma), `proof:aurora-derive-gamut` (harmony×easing×temperature neon matrix in-sRGB) | `proof:aurora-space-gamma`, `proof:single-color-core`, `proof:blob-color-equivalence`, `proof:color-acyclic` |
| **W4** | `proof:aurora-tensor-field`, `proof:aurora-impasto-relight`, `proof:aurora-vangogh-preset` (the 5-step wiring), `proof:aurora-oilpastel-medium` (+ aurora-chunk ceiling) · ★ the AW.W4.0 `dist/aurora.js` budget governor | `proof:aurora-space-gamma` |
| **W6** | `proof:aurora-atoms-roundtrip` (the total-function fuzz + `DEFAULT_ATOMS` deep-equal wispy-sky; subsumes the PLAN's `atoms-default` + `atoms-total`) | `verify-export-types`, `proof:resolution` |
| **W7** | `proof:aurora-wgsl-equivalence` (W7a; witness `#3a7bd5`), `proof:aurora-backend-fallback` (W7b; `isFallbackAdapter` rejected), ★ `proof:webgpu-substrate-single` (W7b) | `proof:webgl-substrate-single`, `proof:offscreen-pause`, `profile:budget --enforce` on `dist/aurora.js` |
| **W8** | `proof:aurora-interaction-prm` (every axis → master tempo; cursor write-path early-out; wake on the park gate) | `proof:offscreen-pause`, `proof:aurora-space-gamma` |
| **W9** | `proof:blob-smin-normalized`, `proof:blob-gradient-unit-length`, `proof:blob-spec-premult` | `proof:blob-color-equivalence`, `proof:blob-space-gamma` |
| **W10** | `proof:blob-interaction-prm` (folds volume-preserve `==1/sa`, framerate-damp `exp(-λdt)`, trail-fixed-array as named sub-checks) | `proof:offscreen-pause` |
| **W11** | `proof:blob-mood-resolved` (no UNREAD sub-orphan OR recorded MIGRATION collapse), ★ `proof:blob-tempo-suppression` (tempo×dt not ×uTime; substrate-owned PRM; no parallel matchMedia) | `proof:blob-color-equivalence`, `proof:blob-space-gamma`, `proof:single-color-core`, `proof:color-acyclic` |

**Standing green across the WHOLE band:** `proof:aurora-space-gamma`, `proof:blob-space-gamma`,
`proof:blob-color-equivalence`, `proof:single-color-core`, `proof:webgl-substrate-single`,
`proof:offscreen-pause`, `profile:budget` (now including `dist/aurora.js`), `typecheck`, `build`.

---

## 5. The load-bearing risks (and their sanctioned redress)

- **Budget blowout (W4, the load-bearing risk).** The structure tensor + impasto 4-tap normal each
  re-run `sampleBase` (which re-runs `domainWarp`+`nucleiField`+`fbm`), and `bestOil` already does
  ~40 full-field recomputes per fragment. If `profile:budget --enforce` reds on `dist/aurora.js`, the
  SANCTIONED redress is the field-bake hoist (PATH-FORWARD §6 — hoist the single
  `domainWarp`+`nucleiField` so `sampleBase`/`bestOil` stop recomputing it) — a STRUCTURAL
  transposition, NOT a tap-count tweak. The true multi-tap Kuwahara MUST NOT be attempted on WebGL2
  single-pass (defer to W7c).
- **Multi-pass substrate breach (W7c).** `useWebGLCanvas` draws ONE program to the default
  framebuffer. The FBO/storageTexture seam MUST stay generic (a consumer declares N passes); baking
  N=4 or the tensor format reds `proof:webgpu-substrate-single`. Tensor targets MUST be RGBA16F
  (gradient magnitudes exceed [0,1] and clip in 8-bit LDR).
- **Hue-domain error (W5).** `interpolateHue` takes NORMALIZED TURNS [0,1] — degrees silently
  misbehave (the `.5` short-arc threshold is a half-turn); the GLSL port does the fixup in turns;
  `complementary` uses `'longer'` (not `'shorter'`, which cuts through grey on warm→cool).
- **WGSL color drift (W7a).** A hand-authored WGSL color core re-opens the AV.W1 "~2.2× too dark"
  two-copy divergence; the twin splices the shared chunk's transposed literals verbatim, certifies
  against the EXISTING oracle.
- **Gamma/premultiply fringe (W4 impasto + W9 lit terms).** ALL lighting in LINEAR space strictly
  between the OKLCh resolve and the single OETF; the `*alpha` premultiply stays last.
- **Parallel PRM path (W8 + W11).** The `useWebGLCanvas` substrate ALREADY owns + live-monitors PRM;
  a new `matchMedia` listener is the exact AV.W7-removed anti-pattern. Tempo scales `dt`, never the
  clock. `proof:aurora-interaction-prm` + `proof:blob-tempo-suppression` are born-RED to catch escape.
- **Sealed-dispatch / un-threaded uniform (W4 + W9).** A new uniform added to a shader WITHOUT
  threading it through `uniformBridge`/`useMetaballRenderer` (the `UNIFORM_NAMES` array + upload)
  silently no-ops — vue-tsc and units miss it (the binding-verification memory). Each new uniform
  traces shader→bridge→config type in ONE wave; the medium/preset gates assert it.
- **Van-Gogh orientation inversion (W4).** The MINOR eigenvector (least color change) is the stroke
  tangent; the MAJOR (gradient) makes strokes cross the bands. `proof:aurora-tensor-field` asserts
  against a synthetic field; bite = the major-eigenvector swap.
- **Iridescence garish (W9).** Clamp the thin-film wavelength to the warm arc ~560-650nm,
  `iridescenceAmt ~0.18`, tint warm-cream in OKLCh not sRGB white (the warm-cream house identity;
  named themed presets live in consumers).
- **Dead mood substrate framing (W11).** Re-scoped — `useBlobMood` is exported + consumed, so it is
  KEPT; the resolution is wire-the-sub-orphans OR a recorded public-surface collapse, not a false
  ≥2-consumer excision.

---

## 6. Files this convergence wrote

- `docs/tranches/AW/waves/AW.W4-aurora-painterly.md` (budget governor + 5-step MEDIUM_ID wiring)
- `docs/tranches/AW/waves/AW.W5-aurora-color-derive.md` (value.js 0.10.0 + antipode hue-port fixture + harmony→method)
- `docs/tranches/AW/waves/AW.W6-aurora-options.md` (interactivity flag SHAPE)
- `docs/tranches/AW/waves/AW.W7-aurora-webgpu.md` (3-rung split + proof:webgpu-substrate-single + WGSL-port mechanism + isFallbackAdapter + aurora-chunk budget)
- `docs/tranches/AW/waves/AW.W8-aurora-interactive.md` (cursor write-path PRM + tempo×dt)
- `docs/tranches/AW/waves/AW.W9-blob-droplet.md` (premultipliedAlpha confirm + concrete lit terms + uRimColor seam + uniform threading)
- `docs/tranches/AW/waves/AW.W10-blob-interaction.md` (volume-preserve 1/sa + trail fixed-array + semi-implicit-Euler + first-dt clamp + Holmer damp)
- `docs/tranches/AW/waves/AW.W11-blob-mood.md` (wire-not-cut re-frame + master tempo scalar + MIGRATION collapse path)
- `docs/tranches/AW/audit/aurora-blob-impl-plan.md` (this index)
