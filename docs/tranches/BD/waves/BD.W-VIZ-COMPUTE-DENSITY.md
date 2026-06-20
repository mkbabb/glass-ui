# BD.W-VIZ-COMPUTE-DENSITY

## (1) Band + goal

**Band 3 — Procedural viz parity + GL-fence tails. GATED — fires only on a real dense-count consumer.**

Build the GPU spatial-hash compute neighbor-bin path for constellation (O(N) bin instead of the CPU all-pairs scan) AND the analogous fourier compute optimization — the BOOKED dense-register successor that activates ONLY at counts ≫ the overfit default. Recorded to satisfy no-silent-drop; the correct disposition is almost certainly HELD (the trigger has not fired).

## (2) Starting state — the exact on-disk reality

**Constellation (VERIFIED):**
- `src/components/custom/constellation/constellationField.ts:258-261`: the comment names it verbatim — "the GPU spatial-hash compute neighbor-bin is the BOOKED dense-register successor — overfit substrate at the default count=64). At count=64 the O(N²)/2 ≈ 2k pairs/frame is trivial." `buildEdges` (:277) is the pure CPU all-pairs scan (the ONE JS math source the WGSL/GLSL render transcribes).
- `constellation/constants.ts:113-123` (VERIFIED): "the GPU spatial-hash compute neighbor-bin is the BOOKED dense-register successor, triggered ONLY at N ≫ 256 — overfit substrate against the J-inv-10 ≥2-consumer bar until a ≥256-node consumer lands"; `MAX_NODES = 256` (:123) is the slider cap (a count above BOOKS the compute neighbor-bin path).
- `gpu-parity-table.md:133` constellation note: "the compute neighbor-bin is BOOKED at N ≫ 256 — overfit at the default count=64." No neighbor-bin kernel exists (the render is two instanced-billboard passes; the edge SET stays the CPU scan).

**Fourier-field (VERIFIED):**
- `fourier-field/composables/fourierFieldGLSetup.ts:32`: `GL_MAX_PHASORS = 64`; `presets.ts:62,82`: default `harmonics: 5` / `11` (few-to-dozens phasors). The fourier migrated to compute+fragment SDF (gpu-parity-table :121) but the harmonic density is few-to-dozens — no neighbor-bin needed (the phasor sum is O(harmonics), trivially small).

The named successors: `PROCEDURAL-SUITE.md` (VERIFIED) — **W-CONSTELLATION-GPU** "Constellation migrates to a WebGPU compute-particle lattice IF a much denser lattice is wanted" + **W-FOURIER-GPU** "FourierField migrates … IF the harmonic density scales to thousands of phasors. Today Canvas2D is the RIGHT tool" (now the compute+SDF, the density still few-to-dozens). FOLD-LEDGER routes both `→BD.W-VIZ-COMPUTE-DENSITY (GATED)` — "Ships ONLY if a real dense-count (N ≫ 256) / ≥2-binary consumer fires; else re-stamp HELD (the all-pairs scan handles count=64 — building blind is overfit substrate, J-inv-10)."

## (3) The build — TRIGGER-GATED

**This wave ships ONLY if the trigger fires; it does NOT mandate a build.**

**The trigger:** a real ≥2-binary consumer OR a density (constellation N ≫ 256 / fourier thousands-of-phasors) materializes in BD. At BD-HEAD the constellation default is count=64 (`MAX_NODES=256` cap) and fourier is few-to-dozens — neither fires.

**IF the trigger fires (a ≥256-node constellation consumer / a thousands-of-phasors fourier consumer lands):**
1. **Constellation neighbor-bin.** Build the GPU spatial-hash compute kernel (a `@compute` pass that bins nodes into a uniform grid, then scans only the ≤9 neighbor bins per node — O(N) instead of O(N²)/2). The kernel transcribes the SAME edge predicate `buildEdges` uses (the ONE JS math source stays the transcription source — `proof:single-color-core`/the single-math-source bar). The CPU all-pairs scan stays the WebGL2-fallback / low-count path (the neighbor-bin is the WebGPU dense path).
2. **Fourier compute (if its trigger fires).** The analogous compute optimization for thousands-of-phasors (the partial-sum compute already exists; the dense optimization is the per-phasor parallelism at scale).
3. Both ride `useGpuSubstrate` (the WebGPU-first picker); the WebGL2 fallback keeps the all-pairs/serial path (the graceful tail).

**IF the trigger does NOT fire (the likely default):** re-stamp BOTH bookings HELD-with-rationale — "the count that would fire it (constellation N ≫ 256 / fourier thousands-of-phasors) does not exist at BD-HEAD; the all-pairs scan handles count=64 trivially; building blind is overfit substrate (J-inv-10)." A terminal HELD with the named trigger, NOT a re-book.

## (4) The gate — born-RED → GREEN (conditional)

**IF the trigger fires — `proof:viz-compute-density` (new):**
- **C1 neighbor-bin kernel present** — the constellation spatial-hash compute kernel exists; born-RED before the build.
- **C2 ONE math source** — the kernel transcribes the SAME `buildEdges` predicate (the pure JS edge math stays the single source; a re-forked edge math reds).
- **C3 parity** — the O(N) neighbor-bin read matches the all-pairs read at the dense count (the same edge set, a different algorithm — the dense lattice reads identically); the WebGL2 all-pairs fallback unchanged.
- **C4 ≥2-consumer / count** — the trigger (a ≥256-node consumer / thousands-of-phasors) is REAL + recorded.
- **Self-test bite** — a synthetic build with NO real dense consumer (the overfit-substrate state) reds C4 (the J-inv-10 floor — building blind is forbidden).

**IF the trigger does NOT fire — `proof:disposition-live`-shaped HELD lock:** the bookings stay terminally HELD with the named trigger; a synthetic build with no consumer reds (the overfit-substrate bite). NO new build gate.

## (5) Paint verification

**IF the trigger fires:** the dense lattice reads (the O(N) neighbor-bin path matches the all-pairs read at the dense count — a 256+-node constellation reads identically to the all-pairs reference, just faster); the frame-budget clears at the dense count (the whole point — O(N) where O(N²) would not). `proof:ba-gestalt` constellation verdict on the fresh dense capture.

**IF the trigger does NOT fire:** device-free — the HELD disposition is recorded; no paint (no build, no visual change). The recorded "no consumer fires it" IS the artefact.

## (6) Fences + risks

- **GATED — building blind is the forbidden overfit** — J-inv-10: a neighbor-bin kernel with no ≥256-node consumer is overfit substrate. The trigger MUST be real. The likely outcome is HELD (the count does not exist at BD-HEAD).
- **ONE math source** — the kernel transcribes `buildEdges` (the pure JS predicate); a re-forked edge math reds C2.
- **The WebGL2 fallback / low-count path is PRESERVED** — the all-pairs scan stays the graceful path (the neighbor-bin is the dense WebGPU path only); `proof:gpu-substrate-single` clause B unchanged.
- **GL-shader fence** — a new compute kernel is a NEW WGSL stage (not an edit to a `.frag`/`.glsl` fallback); the fallback bodies are byte-untouched.
- **No-silent-drop** — recorded to satisfy the ledger, NOT to mandate a build. The re-stamp-HELD outcome is a first-class terminal disposition.
