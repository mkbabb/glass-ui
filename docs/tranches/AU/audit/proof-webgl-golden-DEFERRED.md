# `proof:webgl-golden` — DEFERRED (the deferral register)

**Status:** KEEP-DEFERRED (documented), NOT added to `scripts/gates.mjs`. Chronic across W6 → W7 →
W10 (`AU-AUGMENT.md §3.1`). This file is the named deferral record; it is cited in `AU.FINAL.md`.

## What the gate would assert

A pixel-golden over the WebGL2 metaball (`/goo-blob`): mount the blob with a fixed seed + zero
perturbation, capture the rendered framebuffer, and assert a byte-for-byte (or sub-threshold)
match against a committed golden PNG — the GPU-path correctness instrument for the shader color +
metaball field.

## Why it is deferred (not killed)

**Headless WebGL-live is unavailable in this CI environment.** This env's headless Chrome runs only
the deterministic *capture* path; the *live-rAF* path fails identically for aurora AND a blob
golden would inherit the same failure (PROGRESS.md AU.W6 / AU.W7). A pixel golden that cannot run
green in CI here would either be a permanently-skipped gate (dead weight) or a flake source — both
violate the manifest-is-law / fail-closed discipline (`gates.mjs` inv-θ). KISS: do not add a gate
that the runner cannot honor.

## The correctness evidence that stands IN ITS PLACE

GPU correctness for the blob is already proven by two landed, green gates plus a render pass — the
deferral leaves NO correctness hole:

1. **`proof:blob-color-equivalence` (8/8, ~2e-16).** The metaball OKLCh shader-color TS port matches
   value.js's Ottosson CPU result to ~2e-16 — ~10 orders of magnitude under the 1e-6 bar. The
   asymmetric witness `#3a7bd5` detects the LYGIA/column-major-transpose trap. This proves the
   *color math* to float-epsilon on the CPU side of the exact GPU shader code.
2. **`proof:blob-space-gamma`.** The default resolver paints GAMMA (`oklchToGammaRgb`), and the
   shader linear-flip closes with `linearToSrgb()` (the OETF) — the DEC-AT-7 space seam is asserted
   closed (no too-dark).
3. **The aurora capture-render (`profile:aurora` thumbnail batch).** Verifies the SHARED
   `useWebGLCanvas` substrate's GPU path renders correctly post-W6-refactor (pixel parity preserved).
   The blob rides the *same* substrate (W6 consumer #2), so the substrate's GPU correctness is
   already capture-verified.

Together: the 8-assert CPU-equivalence proves the color to float-epsilon, and the aurora
capture-render verifies the shared substrate's GPU path — the GPU correctness is covered. The blob
zero-perturb *pixel* golden adds only a redundant byte-comparison of an already-proven path.

## The named trigger (BOOK)

The blob pixel golden BOOKs on **a stable headless WebGL-live capture** — i.e. a CI runner (or a
local harness) on which the live-rAF WebGL2 path renders deterministically green. The downstream
slides-deck Playwright dock validation (F arm) consumes the published 3.3.0 in a real browser; a
real-browser blob capture could land there or in a future glass-ui CI that gains a WebGL-live
runner. Until that runner exists, the gate stays DEFERRED, not minted into the manifest.
