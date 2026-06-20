# BD.W-AURORA-WGSL-STROKES

## (1) Band + goal

**Band 3 — Procedural viz parity + GL-fence tails.**

Port the full per-dab Starry-Night STROKE cascade (`bestOil`/`paintOver`/`StrokeProfile`/`relight`, the ~38KB GLSL engine) to WGSL so `medium:'vangogh'|'oil'|'oil-pastel'` on a Safari-26 WebGPU host paints the REAL per-dab oil read, not the anisotropic-Kuwahara finish stand-in BC landed. Discharges the booked tail `W-AURORA-WGPU-MEDIUMS-STROKES`.

## (2) Starting state — the exact on-disk reality

`src/components/custom/aurora/constants/shaders/aurora-mediums.wgsl.ts` (VERIFIED by reading):
- The header (lines 27-33) states verbatim: "THE OIL/VANGOGH/OIL-PASTEL STROKE CASCADE (bestOil/paintOver/StrokeProfile/relight — the ~38KB GLSL stroke engine) stays the WebGL2 `aurora.frag.ts` full-fidelity register (the GL-shader fence: aurora.frag.ts is byte-untouched). In the WGSL primary those three stroke mediums render the anisotropic-Kuwahara PAINTERLY finish … The full per-dab Starry-Night stroke cascade WGSL port is the booked W-AURORA-WGPU-MEDIUMS-STROKES tail."
- The WGSL module exports `AURORA_MEDIUMS_WGSL` (line 40) and already carries `sampleBase` (:54-60), `structureTensorField`, `flowField`, `brokenColorJitter`, `mediumPastel`/`mediumWatercolor`/`mediumCrayon`, and `mediumKuwahara` (the SOFT polynomial anisotropic-Kuwahara, the keystone — lines 18-25). The painterly scalars already ride appended `scalars4`/`scalars5`/`kuwahara` struct lanes written by `packAuroraWGPUUniforms` (lines 35-38).
- So `medium:'vangogh'|'oil'|'oil-pastel'` on WGSL today maps to `mediumKuwahara` — the smooth painterly FINISH, NOT the per-dab stroke read.

The GLSL stroke engine the .frag uses (the byte-untouched full-fidelity register):
- `mediums.glsl.ts` (495L), `oil-modes.glsl.ts` (the `profileFor` (medium,mode)→StrokeProfile selector spliced into `AURORA_MEDIUMS_POST_BRUSH_GLSL`, per CLAUDE.md §W-CARVE5), `vangogh-medium.glsl.ts` (~258L), `brush.glsl.ts` (~383L) — `bestOil`/`paintOver`/`StrokeProfile`/`relight`.

The uniform packer: `src/components/custom/aurora/composables/uniformBridgeWGPU.ts` (the typed-struct source-of-truth, the std140-vs-WGSL alignment trap closer — CLAUDE.md §W-AURORA-WGPU) — the WGSL struct ↔ JS ArrayBuffer offsets from ONE layout.

The decision is DECIDED-BUILD at `BC.W-VIZ-AURORA.md` Folds (`bb-aurora-wgpu-mediums` DECIDED — BUILD: T4 ports the painterly mediums; the per-dab stroke cascade is the booked tail). The fold ledger routes it `→BD.W-AURORA-WGSL-STROKES`.

## (3) The build

Port the per-dab stroke cascade GLSL bodies to WGSL, appended to `AURORA_MEDIUMS_WGSL`, and route `vangogh`/`oil`/`oil-pastel` to the per-dab path on the WGSL primary:

1. **Transcribe the stroke cascade (GLSL → WGSL, same math).** Port `bestOil` / `paintOver` / the `StrokeProfile` struct + `profileFor(medium, mode)` selector / `relight` from `mediums.glsl.ts`+`oil-modes.glsl.ts`+`vangogh-medium.glsl.ts`+`brush.glsl.ts` to WGSL bodies. The per-dab stamp samples `sampleBase` (already ported) along the structure-tensor flow (already ported via `structureTensorField`/`flowField`) — the per-dab cascade is the LAYER over the existing base. WGSL syntax: `struct StrokeProfile { … }`, explicit `var`/`let`, no GLSL prototype (declare callee ABOVE caller — the splice-order law from `flow.wgsl.ts:32-34`); avoid the `var target` reserved-keyword class (the goo-blob WGSL-broke fingerprint).
2. **Route the three stroke mediums.** In the WGSL medium dispatch, `medium:'vangogh'|'oil'|'oil-pastel'` (the `uMedium` int lanes) now run the per-dab cascade; `mediumKuwahara` stays the FINISH for `medium:'kuwahara'` (`uMedium == 7`) and as the cheap-PEER read for unmatched mediums. The smooth core + the cheap PEER mediums (pastel/watercolor/crayon) are BYTE-unchanged.
3. **Lockstep the packer.** Any NEW per-dab scalar the cascade needs (the `bestOil` count, the dab anisotropy, the relight strength) rides a NEW appended struct lane written in LOCKSTEP by `packAuroraWGPUUniforms` (`uniformBridgeWGPU.ts`) — a one-sided add blows the parity ΔE (the typed-struct discipline). If the existing `scalars4`/`scalars5`/`kuwahara` lanes already carry every needed scalar (the stroke amount/scale/anisotropy/wet-edge/granulation/broken-color are ALL present, lines 44-52), no new lane is needed — verify against the GLSL uniform set first.

Fences honored: **GL-shader fence ABSOLUTE** — `aurora.frag.ts` is byte-untouched (`git diff --stat` empty); the WGSL add MIRRORS the GLSL math, never edits the .frag. The smooth default + the cheap mediums + the Kuwahara finish are unchanged (BC's port is not re-tuned). Warm-cream identity held (the stroke cascade carries no new hue — it re-stamps `sampleBase`'s palette read).

## (4) The gate — born-RED → GREEN

**`proof:aurora-wgsl-strokes` (new) OR extend `proof:aur-kuwahara` in-place:**
- **S1 stroke bodies present** — the WGSL module exports the per-dab cascade functions (`bestOil`/`paintOver`/`profileFor`/`relight` or their transcribed names); born-RED on HEAD (grep = 0, the header says it's the booked tail).
- **S2 routed** — `vangogh`/`oil`/`oil-pastel` dispatch to the per-dab cascade, NOT to `mediumKuwahara`; born-RED on HEAD (today they map to Kuwahara — verified by the header text :30-32).
- **S3 GL-fence held** — `aurora.frag.ts` content-hash UNCHANGED; the WGSL stroke scalars are written by `packAuroraWGPUUniforms` (the typed-struct parity — every cascade scalar named in the WGSL struct has a packer write; a one-sided add reds).
- **S4 default-unchanged fence** — the smooth core + `mediumKuwahara` (`uMedium == 7`) byte-identical; a default-config aurora renders unchanged (parity green by construction).
- **Self-test bite** — a synthetic WGSL that routes `vangogh`→`mediumKuwahara` (the HEAD shape) MUST red S2; a synthetic stroke-scalar in the WGSL struct with NO packer write MUST red S3.

Born-RED on HEAD: S1+S2 fail. GREEN at the build.

## (5) Paint verification

A `medium:'vangogh'` aurora on a REAL WebGPU host (Safari 26 / Chrome 149) reads the per-dab brush stamp (visible directional oil dabs, NOT the Kuwahara smooth), captured against the WebGL2 `aurora.frag.ts` read via **BD.W-VIZ-PARITY-METAL's** machinery — the empirical OKLab ΔE within the bar (`mean ≤ 2.0 / p99 ≤ 5.0`); a transcription error in the cascade blows past it. Both modes × desktop. `proof:ba-gestalt` aurora verdict on the fresh per-dab capture (per-wave paint, no terminal-reflect funnel).

**Sequencing:** runs AFTER BD.W-VIZ-PARITY-METAL establishes the live-capture harness; re-records the aurora row's vangogh-medium parity with the real numbers.

## (6) Fences + risks

- **GL-shader fence** — `aurora.frag.ts` byte-untouched; the ~38KB GLSL engine is the math SOURCE the WGSL transcribes, never edited.
- **Profile:budget** — the per-dab cascade is the heaviest WGSL medium; the LIVE `dist/aurora.js` ceiling is **gzip 54_000 / raw 162_000** (`scripts/profile-bundle.mjs:213` — verify against the live value, NOT the stale CLAUDE.md "lifted to 50000" figure, which trails the actual 54000 ceiling by one lift). Re-measure: if the stroke cascade WGSL growth blows the 54000 budget, the lift is the named successor (record the number, do not over-spend silently).
- **The reserved-keyword trap** — WGSL rejects `var target`/other reserved identifiers (the goo-blob WGSL-broke class); the transcription avoids them and the parity capture is the proof the pipeline ARMS (a non-arming WGSL falls to the WebGL2 net forever — the exact goo-blob failure BC.W-GOOBLOB-MEATBALL fixed).
- **Smooth/Kuwahara/cheap-medium registers unchanged** — only the three stroke mediums change their WGSL path.
- **Safari-only fidelity** — the per-dab read is the WGPU-primary register; a WebGL2-tail host still rides the full-fidelity `.frag` (the fallback is BETTER, not worse — the §E mandate is "WebGPU EVERYWHERE no smooth degrade", now fully discharged).
