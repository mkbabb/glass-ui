# Blob — first-principles redevelopment gap audit (BD viz)

Audit of the shipped `src/components/custom/goo-blob/` against the user's "re-develop from
FIRST PRINCIPLES" mandate. Scope: the satellite system, pointer model, metaball renderer,
mood model, and the two shaders (`metaball.wgsl.ts` primary, `metaball.frag.ts` fallback),
versus the five spec demands:

1. an option for **cartoon-shadow style or not**
2. **robust interactivity** (mouse + keyboard + configurator)
3. **FOUR "emotional" states** controlling blob facilities + movement tendencies
4. a **configurable number of SATELLITE blobs** morphing in/out lava-lamp randomized
5. **MULTIPLE blobs spawnable together**, interacting organically (morph in/out)
6. fluid + lava-lamp + robust/smooth/**liquid-glass-like**

Plus the rename `goo-blob → blob` and the **Safari-absolute / WebGPU-or-WebGL2-only** floors.

---

## 0. Verdict at a glance

| Spec demand | Status | Verdict |
|---|---|---|
| Cartoon-shadow ON/OFF option | PARTIAL (always-on CSS gel-dome shadow; no toggle) | **REBUILD as a prop axis** |
| Robust mouse interactivity | STRONG (spring follow + trail pseudopod + click pulse + accel snap-back) | **SALVAGE — best-in-suite** |
| Keyboard interactivity | ABSENT | **BUILD from zero** |
| Configurator | PARTIAL (rich atoms, but `commit-on-write`, no live studio per-preset) | **EXTEND** |
| 4 emotional states | EXISTS as 5 scalar moods; NO state-distinct facilities/behaviours in shader | **REBUILD the state→behaviour map** |
| Configurable satellite count, lava-lamp morph | STRONG (count atom + 4-phase lifecycle + smin bridge) | **SALVAGE the engine, RE-TUNE the look** |
| MULTIPLE interacting blobs | ABSENT (single-core architecture, hard-capped) | **BUILD from zero — the headline gap** |
| Fluid / lava-lamp / liquid-glass | PARTIAL (lit meatball + smin good; satellite envelope deliberately *capped* away from lava-lamp by BA.W-GOO-REDRESS) | **RE-TUNE + lift the containment cage** |
| `goo-blob → blob` rename | not started | mechanical (dir + subpath + types + gates) |
| Safari-absolute | UNVERIFIED (WGSL primary is Chromium-only on most Safari; `.frag` WebGL2 fallback is the Safari path) | **VERIFY — fallback is load-bearing, NOT deletable** |

Bottom line: the **renderer substrate, the smin SDF body, the pointer model, and the
satellite lifecycle engine are excellent and salvageable.** The **architecture is
single-core by construction** and the **mood model is scalar-only** (no state-distinct
shader behaviour). Multiple-blob and 4-distinct-emotional-facilities are genuine
first-principles rebuilds. The lava-lamp look is *actively suppressed* by an
over-conservative containment cage that a redev must lift.

---

## 1. What exists — component-by-component

### 1.1 Substrate + renderer (`useMetaballRenderer.ts`, 421L) — SALVAGE
- Composes `createGpuSubstrate` (WebGPU-first / WebGL2 fallback over the ONE
  `createCanvasLifecycle` leaf). Demand-driven park, offscreen-pause, live-PRM-freeze,
  tempo-integrated clock, context-loss self-heal — all inherited, all correct.
- `resolveFrame(timeSec)` is the substrate-agnostic simulation advance; WGSL `frame` and
  WebGL2 `drawFrame` both call it → the physics is single-source, only upload+draw differ.
- Color resolved via the `/color` leaf (`cssToOklch → oklchToGammaRgb`), DOM-free renderer
  (SFC un-wraps `var(--token)` before the renderer sees strings). Clean.
- Consumes `usePointerVelocityField` (the shared B4 leaf) for the iOS-27 accel snap-back —
  a fast decelerating flick kicks the body pulse. Good, already wired.
- **Salvage verdict:** keep wholesale. This is the strongest part. Any redev rides this
  exact substrate seam.

### 1.2 Pointer model (`useBlobPointer.ts`, 261L) — SALVAGE (best-in-suite)
- Two critically-damped `SpringProgress` springs (x/y), framerate-independent `tickDt(ms)`,
  driven by the substrate's single rAF (no parallel loop — `proof:blob-interaction-prm`).
- Decaying-radius **trail ring-buffer** (`TRAIL_N=15`) → the elastic pseudopod that reaches
  the cursor and snaps back. Smin-merged in-shader.
- One-shot **underdamped click-impulse oscillator** (symplectic Euler, `PULSE_OMEGA=18`,
  `PULSE_ZETA=0.35`) → the body bounces on click, clamped so `bodyR` never inverts.
- Deterministic PRM `rest()` pose + `isAtRest()` quiescence predicate for the park gate.
- **Salvage verdict:** keep. This is exactly the "robust interactivity" the spec wants for
  the MOUSE axis. Two known live-tune questions are already booked (BD.W-BLOB-MOTION-TUNE:
  does ζ=0.35 ring-back read as iOS flinch or wobble; the stretch axis reads ~6% within
  noise). **Gap: zero keyboard** — `pointermove`/`pointerleave`/`click` only.

### 1.3 Satellite system (`useBlobSatellites.ts`, 392L) — SALVAGE engine, RE-TUNE look
- Deterministic PRNG (house `mulberry32 + hashString`), a pool sized by
  `config.geometry.satelliteCount` (the **configurable count atom exists**, `syncCount`
  grows/shrinks the pool live).
- A **4-phase lifecycle** per satellite: `orbiting → merging → absorbed → emerging → orbiting`,
  with eased blends, stagger gating (`MERGE_STAGGER_MS`), and an orbit-blend smoothing.
  This **IS** the "morph in/out in a randomized lava-lamp way" mechanism — the bones are
  here and good.
- The smin **bridge-hold** is coupled: orbit envelope worst-case ↔ `uSmoothK` band widen
  (`uploadBlobUniforms.ts`) ↔ opacity→distance inflation, so a satellite never floats as an
  unrelated disc.
- **CRITICAL RE-TUNE (the look-vs-spec conflict):** `BA.W-GOO-REDRESS` *deliberately
  TIGHTENED* the lava-lamp behaviour. The orbit random multiplier was capped `×0.8..1.2 →
  ×0.85..1.05`, the wobble amplitudes calmed (`≤0.08 → ≤0.035`), `eccentricity` pulled to
  0.05, `BASE_OPACITY` held at 0.75 — ALL to keep the creature inside a four-side
  containment ceiling (`proof:blob-page`) and a calm-lean ceiling (`proof:blob-render` 0.10).
  The result is a *contained, polite* bead — the OPPOSITE of "robust lava-lamp." A redev
  must **lift the containment cage** (larger canvas headroom, looser orbit envelope, real
  eccentricity) and re-baseline those gates, or the lava-lamp read stays suppressed.

### 1.4 Mood model (`useBlobMood.ts` 219L + `constants.ts` `paramsFor`) — REBUILD the map
- A principled 2-axis **circumplex** {valence, arousal} surface; FIVE named moods (`idle,
  happy, curious, sleepy, excited`) are POINTS on it; `MoodParams` (12 scalars) derived by
  `paramsFor`. Manual/auto precedence latch (`setMood({source})`), idle→sleepy auto-arc.
- **The gap (load-bearing):** the moods modulate **only scalar uniforms** — orbit speed,
  wobble, pulse, smin-k multiplier, hue/sat/brightness shift, iridescence intensity,
  pointer-attraction. **There is NO state-DISTINCT facility or behaviour.** The shaders
  carry **zero mood branching** (grep for `happy/excited/curious/sleepy/idle` in
  `metaball.wgsl.ts` = 0 hits). Every mood is the same creature running its dials hotter or
  cooler. The spec wants FOUR emotional states that **control blob facilities + movement
  TENDENCIES** — i.e. qualitatively different behaviours (e.g. shy/recoil, playful/bouncy,
  curious/reach, sleepy/drift), not just a faster orbit. This is a behaviour-architecture
  rebuild, not a re-tune.
- Spec says FOUR states; code ships FIVE. The redev picks the four canonical emotional
  states and gives each a distinct facility/tendency bundle.

### 1.5 Shaders (`metaball.wgsl.ts` 23KB primary, `metaball.frag.ts` 27KB fallback) — SALVAGE core
- Clean SDF: `sdgCircle` (value+gradient), IQ normalized `sminQuadraticG`/`sminCircularG`
  (variant-switched), `sceneDistG` merges body + up-to-4 satellites + 15 trail samples.
- Lit-glass surface: Blinn-Phong glint, Fresnel rim, iridescence, fast-SSS, core-glow,
  procedural 2D soft-shadow march, warped-FBM watercolor edge, OKLCh per-pixel perturb.
- `uStage` gate strips the lit/shadow block for the plain `"blob"` variant; `"meatball"` is
  the full lit default.
- `MAX_SATS=4` / `TRAIL_N=15` are **compile-time `#define`/fixed-array caps** — a hard
  ceiling the JS uploader, program builder, and shader all contract on.
- **Salvage verdict:** the SDF + lit-glass machinery is excellent and the liquid-glass read
  is largely here. **Caps are the multi-blob blocker** (see §2).

### 1.6 Config surface (`types.ts` 8 atoms + `BLOB_CONFIG_DEFAULTS`) — EXTEND
- Eight cohesive atoms (geometry, satellites, membrane, color, surface, interaction, variant,
  quality, tempo). Rich and well-shaped — the configurator vocabulary is here.
- `variant: "blob" | "meatball"` is the closest existing thing to the cartoon-shadow axis,
  but it gates the SHADER lit-block, NOT the CSS drop-shadow (the shadow is unconditional).

---

## 2. The first-principles GAPS (what must be built/rebuilt)

### GAP-1 — MULTIPLE interacting blobs (THE HEADLINE — build from zero)
The whole architecture is **single-core**. One `<GooBlob>` = one canvas = one body SDF at
the origin + N satellites that orbit IT. There is no notion of >1 independent "core" blob,
no global SDF field shared between cores, no spawn/despawn of cores, no core↔core smin
interaction. `MAX_SATS=4` is a per-instance fixed-array cap baked into the shader and the
uniform bridge.
- **Two architectural routes:**
  - **(A) Promote satellites to first-class cores in ONE field** — generalize `sceneDistG`
    to smin-merge an array of N independent metaball sources (cores), each with its own
    drift/wander/spawn-lifecycle, the existing satellites becoming a sub-class. ONE canvas,
    ONE field, cores morph in/out of each other organically (the true lava-lamp). Requires
    lifting `MAX_SATS` to a configurable `MAX_SOURCES` and re-architecting the per-source
    uniform packing (dynamic-length storage buffer on WGSL; the WebGL2 fallback caps at a
    `#define` ceiling — the Safari-path constraint).
  - **(B) Multiple `<Blob>` instances** that share a coordinating field — heavier (N canvases
    or N contexts) and breaks the one-GL-per-route budget; (A) is the idiomatic answer.
- **Recommendation:** route (A). The satellite engine's phase-lifecycle is the seed for
  core spawn/morph; the smin field already merges sources — the work is *un-privileging* the
  body and making cores plural + dynamically-counted. This is the largest single rebuild.

### GAP-2 — FOUR emotional states with DISTINCT facilities/behaviours (rebuild the map)
Today's moods are scalar-only (§1.4). Build a state→behaviour bundle where each of four
states changes WHAT the blob does, not just how fast:
- distinct **movement tendencies** (drift direction/character, recoil-from vs reach-toward
  pointer, settle vs roam), distinct **satellite/core behaviour** (more/fewer cores spawn,
  faster/slower morph, tighter/looser merge), distinct **surface** (sheen, color warmth,
  squash character). Keep the circumplex as the *interpolation* substrate, but each state
  must own a genuinely different gestalt. May need shader-side state input (a `uMoodState`
  branch or state-blended facility weights) — the shaders currently have none.

### GAP-3 — cartoon-shadow ON/OFF as a real prop axis (rebuild as toggle)
The CSS gel-dome `drop-shadow` is **always on** (`GooBlob.vue` `.goo-blob-wrapper` filter,
unconditional incl. under PRM). The Memphis offset-stamp cartoon shadow is explicitly
reserved for `<Card surface="cartoon">` only. Spec wants the blob itself to offer
cartoon-shadow style **or not**. Build a `shadow: "gel" | "cartoon" | "none"` (or
`cartoonShadow: boolean`) prop that switches the wrapper filter between the grounded gel-dome
(current), the hard offset-stamp cartoon (`--shadow-cartoon-*` tokens, already in the system),
and none. Mechanical but currently absent.

### GAP-4 — keyboard interactivity (build from zero)
Zero keyboard handling. The spec's "robust interactivity" + the birthdaycolor.com-grade bar
need keyboard: arrow-keys to nudge/lean the blob, space/enter to pulse, number-keys or
tab-cycle to switch emotional state, etc. Build a focus-able host + `keydown` map that drives
the SAME pointer/mood seams the mouse drives (no parallel path).

### GAP-5 — the lava-lamp look is SUPPRESSED, not just missing (re-tune + re-baseline)
The single most important *look* fix: BA.W-GOO-REDRESS caged the satellite envelope to pass
containment/lean gates (§1.3). A redev wanting "fluid + lava-lamp robust" must lift the cage —
bigger field headroom, looser/eccentric orbits, slower richer morph, more cores — and
**re-baseline `proof:blob-render` / `proof:blob-page` / `proof:goo-redress`** to the new,
intentionally-larger creature. This is a deliberate reversal of a prior conservative pass;
flag it loudly so it is not re-tightened by a future gate-hugging agent.

### GAP-6 — Safari-absolute verification (verify; do NOT delete the fallback)
WGSL is the primary but is Chromium-only on most shipping Safari; the **`metaball.frag.ts`
WebGL2 path is the Safari-load-bearing fallback** and is NOT deletable (`proof:gpu-substrate-single`
clause B blocks premature `.frag` retirement until the ~5-10% tail closes). The
WebGPU-or-WebGL2-only mandate is **already satisfied** for blob (no Canvas2D anywhere in the
dir — verified). The redev must keep the WGSL↔`.frag` typed-struct parity in lockstep
(the cardinal drift risk; any per-core/per-state uniform widen is a both-backend edit) and
live-verify the metaball on real WebKit.

### GAP-7 — rename `goo-blob → blob` (mechanical)
Dir rename, subpath (`/goo-blob → /blob`), `GooBlob.vue → Blob.vue`, type/export renames,
`PROCEDURAL-SUITE.md` + README + gate-name reconcile, MIGRATION row (clean break, no alias).
Touches the colocation/subpath/api/structure gates; coordinate with the dock-as-hallmark
band since the dock now-playing goo-split (`useDockFission`, ORCHESTRATOR-NOTES) is a blob
consumer.

### GAP-8 — robust per-viz configurator + studio (extend)
`commit-on-write` config exists; the aurora-grade live studio per-preset
(`cloneMode="per-preset"` + the hierarchy vocabulary) is not wired for blob. The spec wants a
robust configurator per viz with the full interactivity. Extend onto the existing 8-atom
surface + the new state/core/shadow axes.

---

## 3. Salvage-vs-rebuild ledger

| Subsystem | Verdict | Note |
|---|---|---|
| `createGpuSubstrate` seam + lifecycle | **SALVAGE wholesale** | strongest part; redev rides it unchanged |
| `useBlobPointer` (spring/trail/pulse/accel) | **SALVAGE** | best-in-suite mouse interactivity; add keyboard beside it |
| `useBlobSatellites` 4-phase lifecycle engine | **SALVAGE engine** | the morph-in/out bones; generalize to plural cores (GAP-1) |
| satellite ENVELOPE tuning (REDRESS cage) | **REBUILD/RE-TUNE** | lift the containment cage for lava-lamp (GAP-5) |
| SDF + smin + lit-glass shaders | **SALVAGE core** | excellent; lift `MAX_SATS` cap → `MAX_SOURCES` for plural cores |
| mood circumplex (interp substrate) | **SALVAGE substrate** | keep as the blend surface |
| mood → behaviour MAP (scalar-only) | **REBUILD** | 4 states with distinct facilities/tendencies (GAP-2) |
| CSS gel-dome shadow | **REBUILD as toggle** | gel/cartoon/none prop axis (GAP-3) |
| keyboard | **BUILD from zero** | GAP-4 |
| multiple interacting cores | **BUILD from zero** | the headline; GAP-1 |
| 8-atom config + configurator | **EXTEND** | add state/core/shadow axes + live studio (GAP-8) |
| `.frag` WebGL2 Safari fallback | **KEEP (do not delete)** | Safari-absolute; parity-lockstep cardinal risk (GAP-6) |

---

## 4. Existing BD waves that touch blob (and what they MISS)
- `BD.W-BLOB-MOTION-TUNE` — narrow: pulse-ζ flinch read + stretch-axis honesty. **Does not
  touch** multi-blob / emotional-states / lava-lamp / shadow-toggle / keyboard.
- `BD.W-GOOBLOB-SAT-SHADE` — per-satellite OKLCh-derived shade (color only). Useful for the
  plural-core color story but **not** the architecture.
- `BD.W-GOOBLOB-SQUIRCLE-REFRACT` — squircle dome-Z + refraction; the sanctioned metaball
  re-touch. Adjacent, not the redev.
- **None of the three is the first-principles redevelopment.** The redev is a NEW wave-cluster:
  GAP-1 (plural cores) + GAP-2 (4 emotional facilities) + GAP-3 (shadow toggle) + GAP-4
  (keyboard) + GAP-5 (lava-lamp un-cage + gate re-baseline) + GAP-7 (rename) + GAP-8 (studio),
  all under GAP-6's Safari-parity floor.
