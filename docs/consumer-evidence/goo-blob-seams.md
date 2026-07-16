# goo-blob producer seams — the GAP-L5 terminal decision record (BI.W-BLOB-SEAMS)

> The component was renamed `<GooBlob>` → `<Blob>` and the dir `goo-blob/` → `blob/` (the
> BLOB-RENAME land). This doc keeps the `goo-blob-seams.md` name the value.js roster + the
> wave §Work / execution-manifest cite by name; every path below resolves under
> `src/components/custom/blob/`.

## What this record is

The value.js GAP-L5 family (T-49, communiqué §1.4/§2.4; BH inbox §2b) routed a bundle of
blob producer seams + a per-row legibility/engine-contract adjudication onto BI band B5.
This wave (`BI.W-BLOB-SEAMS`) is the owner. Per the no-silent-drop law, EVERY row gets a
TERMINAL verdict here — a bare "book" is forbidden (`proof:blob-seams` S4 reds on it).

**Verdict vocabulary (terminal tokens):**

- `BUILD-LANDED` — built by this wave (or a named sibling wave), on disk now.
- `SHIPPED-EVIDENCE` — already shipped by a prior wave; the seam/mechanism + its witness
  gate exist at HEAD (no new work owed).
- `DECLINE-RECORDED` — declined with rationale; new physics / GL-shader capability / no
  consumer — booked to a NAMED successor, never a bare re-book.
- `TERMINAL-DECLINED` — declined terminally per the communiqué's own pre-recorded
  disposition (no successor booked).
- `DISCHARGED-SHIPPED` — the item shipped in a prior wave and the family's own dedup
  already discharged it.

## The four headline seams

| Seam | Verdict | Evidence |
|---|---|---|
| `settled` quiescence seam (T-49, BLOCKING) | `BUILD-LANDED` | `blobSimulation.ts` owns `settled: Readonly<Ref<boolean>>`; `useMetaballRenderer.ts` adapts it and `Blob.vue` exposes it. The SAME `mood.isSettled() && pointer.isAtRest() && satellites.isQuiescent()` predicate drives demand-loop park and the public value. `satellites.isQuiescent()` is false for any phase `!== "orbiting"`, so a mid-`fissioning` beat holds `settled` false. |
| Exported HERO preset | `BUILD-LANDED` | `presets.ts` `BLOB_HERO` (the `DEFAULT_AURORA_CONFIG` twin) — the separation geometry (orbit 0.30 > body 0.22, 4 satellites, ecc 0.04, smoothK 0.06) the demo re-derived by hand. Exported from `/blob` (`index.ts`); the `/blob/config` value.js-free subpath is the booked one-window rider (below). |
| `lightnessFloor` config atom | `BUILD-LANDED` | `types.ts` `BlobColor.lightnessFloor?: number` (default 0.15 in `BLOB_CONFIG_DEFAULTS.color`) + `presets.ts` `LIGHTNESS_FLOOR_BRACKET = [0.12, 0.20]` / `LIGHTNESS_FLOOR_DEFAULT = 0.15` / `clampLightnessFloor(v)`. The D8 ink-floor bracket, fed to `deriveBlobPalette`'s `lightnessFloor` param (the `/color` leaf already carries it). |
| Single-WebGL2 collapse (drain `metaball.wgsl`) | `DECLINE-RECORDED` | **A live WebGPU blob consumer IS found at build time** — the spec's fail-loud branch fires (never a silent keep). See the WGSL section below. Booked to a named successor. |

### The WGSL drain — DECLINE-RECORDED (the fail-loud branch)

The wave's §Design provisions: "If a live WebGPU blob consumer is found at build time,
record-with-rationale instead and book to the successor (fail-loud, never a silent keep)."
The premise "consumer-less at HEAD" is FALSE at build time:

1. **The renderer wires it live.** `useMetaballRenderer.ts start()` passes
   `setupWGPU: createBlobWGPUSetup(...)` to `createGpuSubstrate`; the picker arms the
   `metaball.wgsl` WGSL primary whenever `navigator.gpu` is present (Chrome/Edge 113+,
   Safari 26+, Firefox 141+). On those engines the blob renders WGSL, not WebGL2.
2. **The architecture is gate-locked as a migrated member.** `PROCEDURAL-SUITE.md` records
   blob as MIGRATED with 2 consumers; `proof:gpu-substrate-single` treats
   `custom/blob`+`metaball` as a migrated WGSL member (the OKLab ΔE parity table);
   `proof:webgpu-everywhere` VALIDATES `metaball.wgsl`'s WGSL (its self-test bite at
   `:542` names "the GooBlob metaball.wgsl reserved-keyword class"); `proof:gooblob-meatball`
   / `proof:gooblob-plain` / `proof:no-god-module` (the `:357` exemption) / `profile-bundle`
   / `goo-blob-wgpu-parity-capture.mjs` all reference it.

Draining `metaball.wgsl` would (a) remove a LIVE render path from every WebGPU device and
(b) RED ~8 gates that lock the WebGPU-everywhere invariant — several of which are de-registered
only by editing `scripts/gates.manifest.mjs` + `package.json`, the exports/gate-registry the
close serializes. This is not a config/seam-level drain; it is a substrate-architecture
reversal coupled to the WebGPU-everywhere invariant. **Verdict: DECLINE-RECORDED.**

**Named successor:** `W-BLOB-SINGLE-WEBGL2` (a future wave) — the single-WebGL2 collapse is
a joint substrate + gate-registry decision (de-register the 4 WGSL-parity/webgpu-everywhere
blob arms, retire `metaball.wgsl` + `wgpuSetup.ts` + `uniformBridgeWGPU.ts` + the renderer's
`setupWGPU` wiring, drop the PROCEDURAL-SUITE row, re-pin `profile-bundle`), landed WITH the
`gates.manifest.mjs`/`package.json` owner. The ~−33 KiB value.js eager-budget win the RP-2
coupling wants is delivered independently by the `/blob/config` value.js-free subpath (below),
so the eager-budget win does NOT wait on the WGSL drain.

## Rows A–F (legibility / genesis / arrival — frame-diff-at-bead-box family)

| Row | Item | Verdict | Evidence |
|---|---|---|---|
| Row A | hero-scale mood-legibility floor | `BUILD-LANDED` | The `lightnessFloor` ink-floor bracket (this wave) + `BLOB_HERO`'s hero-scale calibration + the warm-cream default palette floor (`proof:blob-warm-default`, body-L ≥ 0.62 both modes). The frame-diff-at-bead-box verification is the π / O-12 oracle. |
| Row B | curvature-bounded pseudopod | `SHIPPED-EVIDENCE` | `BA.W-GOO-REDRESS` bounds the reaching neck: the capped orbit envelope (`constants.ts` `ORBIT_RANDOM_*` / `SAT_WOBBLE*` ×0.85..1.05) + the worst-case smin band widen (`uploadBlobUniforms.ts`) + the tanh velocity-squash cap keep the pseudopod a single connected gooey neck (never a taffy-pull, never a detached disc). No measured over-curvature defect → no new curvature-clamp physics warranted. |
| Row C | containment / genesis update | `SHIPPED-EVIDENCE` | Containment: `proof:blob-page` four-side canvas clearance (the geometry re-solve). Genesis: the `merging`/`absorbed`/`emerging`/`fissioning` FSM (`useBlobSatellites.ts`, `BD.W-GOOBLOB-MERCURY-COLONY`). |
| Row D | contact-shadow register | `SHIPPED-EVIDENCE` | `BC.W-GOOBLOB-MEATBALL` T2 — `surface.shadow` + `surface.shadowSoftness` driving the shader `uShadow`/`uShadowSoftness` procedural 2D SDF soft contact shadow that FOLLOWS the silhouette (not a hard disc). |
| Row E | wake-order arm (cached-pane return repaints GRAY) | `BUILD-LANDED` | `BI.W-E10-AURORA-ENTRANCE` — the palette-honest reveal (`viz-reveal.css` brightness/saturate never dip below 1, no gray veil) + the `revealBloom?: boolean` consumer door on `useMetaballRenderer.ts` (default ON; a cached-pane / arrival-sync host that owns its own entrance passes `revealBloom: false`). The gray-on-re-enter is closed at the reveal-bloom root (§1.1 cross-link). This wave records the seam present + terminal. |
| Row F | body-arrival pose | `TERMINAL-DECLINED` | Per the communiqué's own pre-recorded disposition: the FSM `emerging` state is the sanctioned interim. No successor booked. |

## Q1–Q10 (BLOB-GENESIS engine-contract rows — scope widen, marking round 2)

| Q | Item | Verdict | Evidence |
|---|---|---|---|
| Q1 | HERO headroom | `SHIPPED-EVIDENCE` (+ HERO preset this wave) | `proof:blob-page` four-side headroom + `BLOB_HERO`'s hero-scale separation geometry re-solved for canvas clearance. |
| Q2 | satellites-at-rest | `SHIPPED-EVIDENCE` | `BA.W-GOO-REDRESS` capped orbit envelope; `satellites.isQuiescent()` = all `orbiting`. A satellite never floats as an unrelated disc at rest. |
| Q3 | SDF hit-test | `SHIPPED-EVIDENCE` | `BG.W-BLOB-AFFECT-INTERACT` (F9.R8) — the SDF `hitTest` fn + SDF-gated `active`; a click outside the silhouette falls through. Witness: `proof:blob-affect-interact`. |
| Q4 | mobile envelope | `SHIPPED-EVIDENCE` | The aspect-square hero sizing + four-side containment on a portrait/coarse stage (`blob.vue` `aspect-square max-h/max-w` re-solve; `proof:blob-page`). |
| Q5 | frame pacing | `SHIPPED-EVIDENCE` | The tempo-integrated `simTimeMs` clock + the `[0, 50]ms` dt clamp + the resume-rebase `Math.max(0, ...)` in `blobSimulation.ts` `resolveFrame`. |
| Q6 | single-surface | `SHIPPED-EVIDENCE` | The single connected silhouette — the smin bridge + the single-fissioner + bounded-apex rule (`BD.W-GOOBLOB-MERCURY-COLONY`) + `BA.W-GOO-REDRESS`; never two unrelated discs. |
| Q7 | sequencing | `SHIPPED-EVIDENCE` | The satellite phase sequencing (`merge → absorbed → emerging → orbiting`) + `MERGE_STAGGER_MS` spacing + `ORBIT_BLEND_MS`; `nextEventMs` the scheduled-wake horizon. |
| Q8 | scale-aware deform | `SHIPPED-EVIDENCE` | `POS_SCALE = 1/1.6` — every length uniform rides it (config-UV → canvas-UV), so the deformation scales with the footprint (`constants.ts`, `uploadBlobUniforms.ts`). |
| Q9 | uBackdrop refraction | `DECLINE-RECORDED` | No backdrop-refraction uniform exists in the blob shaders (grep-verified: no `uBackdrop`/`refract`). Refracting the page backdrop through the bead is a NEW GL-shader capability behind the GL fence, with no consumer at HEAD. Booked to a named successor `W-BLOB-BACKDROP-REFRACT` (a GL-fence-widening wave with a recorded ≥2-consumer trigger); not config/seam-level. |
| Q10 | atom stability | `SHIPPED-EVIDENCE` | The ≤12-atom config door (`proof:blob-config-atoms`, the aurora atom-set twin). Note: that gate is currently RED at HEAD on a PRE-EXISTING `satelliteColors`-missing-default mismatch (owned by `BG.W-BLOB-SATELLITE-SHADE`, NOT this wave); this wave's `lightnessFloor` atom ships WITH its default (introduces no new violation). |

## The mercury-colony fission register

| Item | Verdict | Evidence |
|---|---|---|
| Mercury-colony fission register | `DISCHARGED-SHIPPED` | `BD.W-GOOBLOB-MERCURY-COLONY` — `surface.fissionAmp` (default 0, the calm non-splitting default) + the `fissioning` phase + the `FISSION_*` constants + the pinch→body-pulse recoil wire. The demo arms it demo-side; no producer ask for the register itself (the value.js family's own dedup). |

## The `/blob/config` value.js-free subpath (RP-2 / L20 — booked, orchestrator-owned)

The RP-2 one-window coupling wants the value.js eager-budget win (~−33 KiB): a
config-only import that never drags value.js onto the critical path. The value.js-FREE
SOURCE LEAF is landed this wave — `presets.ts` (BLOB_HERO + the ink-floor bracket, plain
data + pure math, NO `/color` reach) atop the already-value.js-free `types.ts`. The subpath
EXPORT wiring is the exports-owner's serialized step (the `package.json`/`subpath-policy`
regen the close runs — outside this wave's fence): add the nested `./blob/config` entry
(`src/subpaths/blob-config.ts` re-exporting the config types/defaults/key + `BLOB_HERO` +
the `lightnessFloor` helpers) via `subpath-policy.mjs` + `regen-exports --write`, then verify
`proof:subpath-classify` + `verify-export-types` + a value.js-free-chunk probe. Recorded in
the wave report §(d). Until it lands, HERO + `lightnessFloor` are reachable from `/blob`
(value.js-bearing but present) — the substance is shipped; only the eager-budget-free chunk
awaits the exports owner.

## The 390 blob perf gate (HARD) + the WGSL keep

The 390 blob perf gate stays green by construction: this wave adds NO per-frame work (the
`settled` write is one boolean assignment inside the existing `shouldContinue`), and — because
the WGSL drain is DECLINED — the render pipeline is byte-unchanged. The value.js verify-at-cut
(their W7) consumes `settled` + `BLOB_HERO` + `lightnessFloor` at the 5.0.0 adopt; the roster
rows reference this wave by name.
