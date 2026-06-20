# BD.W-VIZ-PARITY-METAL

## (1) Band + goal

**Band 3 — Procedural viz parity + GL-fence tails.**

Discharge the suite-wide W-REFLECT3 deferral: produce the BINDING real-GPU parity capture-pair for every migrated / born-WebGPU viz — an actual WebGPU swap-chain readback vs a WebGL2 `readPixels` on real hardware (Metal dev-box) — re-record the EMPIRICAL OKLab ΔE (including the real per-GPU `fwidth()` derivative drift on goo-blob), and REPLACE the device-free structural-proxy rows in `gpu-parity-table.md` with the live numbers. This is the single biggest owed item in BD and the **sequencing gate**: it runs BEFORE any band-3 wave that claims cross-backend parity (STROKES/CURL/SAT-SHADE/SQUIRCLE).

## (2) Starting state — the exact on-disk reality

All five+ parity records are **device-free structural proxies** with byte-identical primary==fallback PNGs (verified by reading the records):

- `docs/tranches/BB/audit/visual/aurora-wgpu-parity/parity-record.json` — `deltaE.mean = 0`, `p99 = 0`, `max = 0`; raster `96×96`; both captures share `sha256_16: "6aaf2d2414225f7a"` (BYTE-IDENTICAL); `methodology` reads verbatim "device-free STRUCTURAL proxy … the W-REFLECT3 Metal-GPU capture is the binding live readback" (VERIFIED, lines 5,11-18,20-24).
- `docs/tranches/BB/audit/gpu-parity-table.md` — the machine-read block (`deltaThreshold { mean: 2.0, p99: 5.0 }`, line 30) carries 7 `verified` viz rows + 1 `no-migrate` (watercolor-dot). EVERY `verified` note ends with the phrase "rides W-REFLECT3" (aurora :46, goo-blob :62, concentric :94) OR "rides this wave's close" (dot-flow-field :78, paper-grid :109, fourier-field :121, constellation :133); every `deltaE` is `{ mean: 0.0, p99: 0.0 }` (VERIFIED).

The 8 viz + their files (all verified present in the table):
| viz | primary `.wgsl` | fallback `.frag`/`.glsl` | record |
|---|---|---|---|
| aurora | `aurora.wgsl.ts` | `aurora.frag.ts` | BB aurora-wgpu-parity/ |
| goo-blob | `metaball.wgsl.ts` | `metaball.frag.ts` | BB goo-blob-wgpu-parity/ |
| dot-flow-field | `flow-field.compute.wgsl.ts` | `flow-field.glsl.ts` | BB flow-field-parity/ |
| concentric | `concentric.wgsl.ts` | `concentric.glsl.ts` | BB concentric-parity/ |
| paper-grid | `paper-grid.wgsl.ts` | `paper-grid.glsl.ts` | BC paper-grid-parity/ |
| fourier-field | `fourier-field.render.wgsl.ts` | `fourier-field.glsl.ts` | BC W-VIZ-FOURIER-DELTA.md |
| constellation | `constellation-points.wgsl.ts` | `constellation-points.glsl.ts` | BC W-VIZ-CONSTELLATION-DELTA.md |
| watercolor-dot | `null` (no-migrate) | `WatercolorDot.vue` | — (PERMANENTLY OUT, KEEP) |

The gate `proof:gpu-substrate-single` exists (package.json, VERIFIED) and its clause F machine-reads `gpu-parity-table.md` with an "on-disk-resolves anti-evasion floor" (CLAUDE.md §WebGPU substrate) — it currently passes against the structural-proxy rows.

The BB postmortem class `structural-proxy-parity-is-tautological` (named in `BC.W-VIZ-AURORA.md` Folds, last line) is the disease-root: a CPU-evaluator-vs-itself ΔE 0.0 is NOT proof the WGSL primary matches WebGL2 on real Metal. The goo-blob WGSL shipped broken ONCE (the `if(uLit>0.5)`-branch non-uniform `fwidth(N)` rejected the pipeline; the `var target` reserved-keyword class) — a headless SwiftShader compile is not parity proof.

## (3) The build

This IS the paint wave — its product is a set of REAL-GPU capture artefacts + the re-recorded numbers, NOT a src change (no shader edit, GL-fence trivially held).

1. **Real-GPU capture harness.** Run each viz on a real WebGPU-capable browser on the Metal dev-box (Chrome 149 / Safari 26). For each viz, at a FIXED deterministic `t` and seed (the same frozen field the structural proxy used), capture:
   - the **WebGPU** path: render with `useGpuSubstrate` selecting the WGSL primary, then `device.queue` → texture → `copyTextureToBuffer` → `mapAsync` readback (the swap-chain readback);
   - the **WebGL2** path: force the fallback (a `forceWebGL` substrate flag or `navigator.gpu` mask), render the `.frag`/`.glsl`, then `gl.readPixels`.
   The harness mounts the SAME deterministic config both backends, same DPR, same raster (lift to ≥256×256 so sub-pixel drift is measurable, not the 96×96 proxy).
2. **Compute the EMPIRICAL OKLab ΔE live** — decode both PNGs, sRGB→OKLab per pixel, ΔE per pixel, mean + p99 + max. The fwidth()-bearing viz (goo-blob the only live fwidth() consumer at HEAD: AA-edge half-width + the hoisted Toksvig spec-clamp, gpu-parity-table :62) may legitimately show a **non-zero mean** (the real per-GPU derivative drift); the bar `mean ≤ 2.0 / p99 ≤ 5.0` accommodates sub-pixel drift — an OETF transcription error / uniform-alignment garbage-read blows past it.
3. **Re-record the rows.** For each viz, REPLACE the `parity-record.json` (a NEW `methodology: "real-GPU swap-chain readback vs WebGL2 readPixels on Metal (Chrome 149 / Safari 26)"`, the two DISTINCT PNGs with DIFFERENT sha256, the empirical `deltaE`), and update the `gpu-parity-table.md` note: strip "rides W-REFLECT3" / "rides this wave's close" → "VERIFIED LIVE at BD.W-VIZ-PARITY-METAL (real-GPU capture, ΔE …)". The records live under `docs/tranches/BD/audit/visual/<viz>-parity-metal/`.
4. **Re-point the anti-evasion floor.** `proof:gpu-substrate-single`'s on-disk-resolves floor re-points at the NEW BD capture paths; the structural-proxy rows are SUPERSEDED, not deleted (the BB records stay as the calibration history).

Fences honored: GL-shader fence ABSOLUTE (no `.frag`/`.wgsl` edit — this captures, not edits); watercolor-dot stays `no-migrate` (it mounts no context — there is nothing to capture); one-GL-per-route preserved (each viz captured on its own route).

## (4) The gate — born-RED → GREEN

**`proof:gpu-substrate-single` clause F HARDENED (extend-in-place, no new key) + a new BD freshness arm:**
- **Clause F-LIVE (the disease-root close):** every `verified` row's record `methodology` must be the LIVE-GPU form (NOT a "STRUCTURAL proxy" string), AND the two capture PNGs must have DISTINCT `sha256_16` (a byte-identical primary==fallback pair is the tautological-proxy tell — born-RED on HEAD where all five share one hash). The empirical `deltaE.mean` must be `> 0` for at least the fwidth()-bearing goo-blob row (a real GPU readback of a derivative-bearing shader is never bit-identical to a CPU stand-in — a `0.0` there is the proxy fingerprint).
- **Clause F-BAR:** every recorded empirical `deltaE` stays within `mean ≤ 2.0 / p99 ≤ 5.0`; a row whose live ΔE exceeds the bar reds (a genuine parity defect surfaced).
- **The on-disk-resolves floor** re-points at the BD capture paths and reds if any cited capture is missing.
- **Self-test bite:** a synthetic record with `methodology: "device-free STRUCTURAL proxy"` AND identical primary/fallback hashes MUST red the F-LIVE clause (the exact HEAD shape — proves the clause bites the disease).

Born-RED on HEAD: clause F-LIVE fails (every record is `STRUCTURAL proxy` with byte-identical hashes). GREEN at the build: the live records replace them.

## (5) Paint verification

**This wave IS the binding paint.** Per-viz, both modes (light/dark) × desktop+mobile, on real Metal GPU:
- the captured WebGPU readback vs the WebGL2 readback, the empirical ΔE within bar;
- `proof:ba-gestalt` per-viz verdict re-earned on the FRESH live capture (NOT a structural proxy — the G8 "rides W-REFLECT3" pattern is FORBIDDEN; G7 auto-revokes a stale-source surface until re-captured).
- The fwidth()-bearing goo-blob row records its real per-GPU derivative drift as a non-zero-but-in-band ΔE (the honest number, not the tautological 0.0).

The BC anti-disease law is the whole point: this wave converts the deferred-to-one-terminal-reflect proxies into per-viz real-GPU paint. No source-green close.

## (6) Fences + risks

- **GL-shader fence ABSOLUTE** — this wave captures + records, it edits ZERO `.frag`/`.frag.ts`/`.wgsl.ts`/`.glsl.ts`. A shader change here would be out of scope.
- **Hardware dependency** — needs a real WebGPU + Metal dev-box. If a viz legitimately cannot be captured on the available hardware (a Safari-26-only path on a non-Safari box), record that constraint honestly (the row stays `verified` against the achievable backend pair with the recorded hardware caveat) — NEVER a fabricated live number over a proxy.
- **The bar is calibrated, not re-tuned silently** — if the empirical aurora capture (the cleanest port, 0 derivatives) demands a bar re-tune, re-record the calibration at THIS wave per the gpu-parity-table header (:16-17), with the recorded rationale.
- **Sequencing** — STROKES/CURL/SAT-SHADE/SQUIRCLE all claim cross-backend parity; they re-record their own viz's row AFTER this wave establishes the live-capture machinery. This wave does NOT block on them; it establishes the harness + re-records the HEAD-shipping shaders.
- **watercolor-dot** stays `no-migrate` (no context to capture) — do not fabricate a parity row.
