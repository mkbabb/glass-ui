# BD viz — live before-state audit (chrome-devtools-mcp, real Chrome :5173)

Captured live while the 32-agent research ran. The CURRENT render + the redesign DELTA per viz. Orchestrator-observed (real pixels), to ground the research synthesis.

## blob (goo-blob → rename `blob`) — `/substrates/blob`
- **Current:** a single small cream metaball droplet (~437×437) over a flat grey glass plate. **WebGL2** metaball ("WebGL2 metaball droplet on the shared substrate"). Real **Configurator** (preset · interaction · mood · seed-palette). A **mood model already exists** — presets **Calm** (cream·curious) / **Excited** (warm·leans in) / **Shy** (cool·…) on a `{valence, arousal}` affect model. Pointer interaction: attraction (0.35, +1 leans IN / −1 SHIES AWAY), click impulse ("Poke"), 2 canvases.
- **Redesign DELTA:** rename → `blob`; GPU-only (confirm WebGPU-first or WebGL2-as-GPU, kill any Canvas2D); formalize the mood model to **4 explicit emotional states** (Calm/Excited/Shy + 1 → the 4); **satellites that morph IN/OUT of the core lava-lamp-style** (the current blob shows no live satellites); **MULTIPLE blobs interacting organically**; the **cartoon-shadow option**; first-principles SDF + lava-lamp sim. The `{valence, arousal}` affect model is the SEED of the 4 emotional states — build on it, don't discard.

## concentric — `/substrates/concentric`
- **Current:** a sophisticated **radial-Fourier ring-interference** field — thin bright elliptical ring-lines from 2-4 sources beating into a slow moiré envelope, IQ gradient-normalized distance-estimation strokes, a sum of sinusoids over the **Tessendorf 2001 deep-water dispersion** (warm-orange over cream, beautiful). **WebGPU-FIRST + clean WebGL2 GLSL fallback (already GPU-only, no Canvas2D)**. Pointer-interactive (rings bend toward the cursor). Real Configurator (Ring families · Base wavelength · Beat).
- **Redesign DELTA:** the user wants a DIFFERENT aesthetic — **irregular topological LEVEL-SET rings** (contours of a random scalar field, like a topographic gradient map; aggregate flows + per-ring perturbation), NOT concentric circles/ellipses. A genuine new direction. **KEY FIND:** concentric ALREADY shares the **Tessendorf deep-water dispersion with dot-flow-field** — the "same wave-based math" seam the user cites EXISTS; the level-set redesign + paper-grid + dot-matrix all consume it.

## dot-flow-field (→ dot-matrix image) — `/substrates/dot-flow-field`
- **Current:** a regular GRID of soft warm-cream dots; each dot's brightness reads the **Gerstner/Tessendorf wave height** at its anchor (`waveBand(h)·contrast`) — a moving iso-band sweeps across (the "slow brush" over the "stable canvas"). WebGPU-first **+ a Canvas2D point-cloud fallback** (the GPU-only target to PURGE). Pointer ripple + flick bloom. **NO Configurator** (gap — every viz needs one).
- **Redesign DELTA:** the dots already fade/modulate off a wave-field — extend so the dot grid's **size/opacity samples an ARBITRARY TARGET (image or SDF)** to display a blob / a wave / a cloud "washing over naturally", the aurora-like flow driving the temporal wash. GPU-only (kill the Canvas2D fallback). Add the robust Configurator. Reconcile vs `dot-matrix` + `goo-dot-matrix` (3 dot vizzes → likely ONE configurable dot engine).

## aurora — `/substrates/aurora` + the dock now-playing (captured earlier)
- **Current:** rich flowing OKLCh nuclei-field (real-GPU far richer than headless), the album-reactive register (W-AUR-ALBUM), painterly mediums, curl-warp. WebGPU-first + WebGL2 + a `getContext("2d")` software-raster ground (the GPU-only purge target). The north-star for the suite's "similar aurora logic".

## paper-grid — `/substrates/paper-grid` (per source, capture pending)
- Ben-Golus AA two-tier grid on a Bridson curl-warped UV sheet, WebGPU-first + WebGL2 (GPU-only). The user: "warps + is subtly perturbed" → deepen the warp/perturbation on the SHARED wave-math.

## The cross-cutting live findings
1. **The shared wave-math seam is REAL** (concentric + dot-flow-field both cite Tessendorf 2001 deep-water dispersion) — the "same wave-based math" the user wants for grid + concentric + dot-matrix is a consolidation, not a green-field mint.
2. **Canvas2D purge targets confirmed live:** dot-flow-field (Canvas2D fallback), aurora (getContext 2d ground); + constellation/fourier-field (useCanvas2D, per the inventory grep).
3. **Configurator coverage is uneven:** blob/concentric have robust ones; dot-flow-field has NONE. The user's "each viz a robust configurator" is a real gap.
4. **The mood/emotional model exists in seed form** (blob's `{valence, arousal}` Calm/Excited/Shy) — the 4-emotional-states redesign extends it.
5. **GPU-only is largely TRUE already** (concentric/dot-matrix/paper-grid/goo-dot-matrix are WebGPU-first/WebGL2); the work is purging the 4 Canvas2D stragglers + deciding the no-fallback policy.
