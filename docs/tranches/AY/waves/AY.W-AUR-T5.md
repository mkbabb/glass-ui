# AY.W-AUR-T5 — multi-pass anisotropic-Kuwahara painterly finish (the oil/oil-pastel coherence successor)

**Wave** W-AUR-T5 — multi-pass anisotropic-Kuwahara finish (greenfield)
· **Repo** glass-ui · **Band** substrate (aurora) · **State** planned (spec-stub — minted by W-AUR-STUDIO §6)
· **Kind** [USER-HINGE] real-cost shader lane (a second FBO pass + a Kuwahara operator)
· **Depends on** W-AUR-PAINTERLY (LANDED) + W-AUR-STUDIO (the D5 single-pass-ceiling measurement + the dead-pointer re-route that MINTS this wave)
· **Gated on** a USER decision (the NECESSITY-MATRIX §2 hinge below)

---

## Why this wave exists (the live owner the dead pointer needed)

The aurora painterly residual — **oil §4.2 anisotropy `A=0.359`**, **oil-pastel §4.2 anisotropy
`A=0.673`** (band `[0.732, 0.932]`), and **oil-pastel §4.3 slope `β=−2.534`** (band
`[−1.85, −1.45]`) — is the structure-tensor coherence the **single-pass WebGL2 painterly
path cannot reach** (W-AUR-PAINTERLY-DELTA §Named-successor; the `A↔β` single-forward-pass
tension + a monochrome-field's near-zero luminance gradient for the tensor to read).

W-AUR-STUDIO (D5) MEASURED the most-relevant single-pass lever — the −5/3 radii respacing
(`mediums.glsl.ts` `sBig/sMed/sSml` 2.4/1.1/0.45 → the φ-adjacent 2.4/1.45/0.87 candidate) —
and recorded the falsifiable result: oil-pastel β moved `−2.534 → −2.413`, **toward** the
−1.85 band edge but **not into it**. The single-pass ceiling is confirmed (HC-aurora §5
anticipated this); the respacing was reverted (the hand-set 2.4/1.1/0.45 stays — van-Gogh's
landed-band spacing). The residual is therefore a **multi-pass** problem.

The prior route pointed at `W-AUR-WEBGPU-DECIDE`, which **closed TERMINAL** (Branch A RETIRE:
the WGSL scaffold is deleted grep-0; "any future WebGPU work opens fresh with a named consumer
… no scaffold to resurrect"). The residual materialized AFTER that terminal close, so it
routed into a wave that can no longer receive it — a dead pointer. **This wave is the live
owner** the dead pointer needed: a greenfield multi-pass operator, NOT a WebGPU resurrection.

## The named operator (greenfield — the WebGPU-resurrect path is DEAD)

**T5 — the anisotropic-Kuwahara multi-pass soft-blend** (RESEARCH.md §3 T5; the "make a
gradient read as oil paint" finish). It is a **fresh WebGL2-or-FBO multi-pass wave** carrying
its own scaffold and its own born-RED gate:

1. **Pass 1** — render the painterly field to an offscreen FBO (the current single-pass
   `aurora.frag` output, unchanged).
2. **Pass 2** — a structure-tensor-steered anisotropic-Kuwahara operator samples the FBO along
   the local tensor's minor eigenvector (the edge-tangent), averaging within an elliptical
   kernel oriented to the flow. This is the coherence lift the single forward pass cannot do:
   it RAISES `A` (the strokes read coherent along the tangent) WITHOUT over-smoothing the
   spectrum (the elliptical kernel preserves the fine cross-tangent high-frequency energy that
   keeps `β` in the −5/3 band) — resolving the single-pass `A↔β` tension.

The WebGPU-resurrect path is **explicitly DEAD** — this is WebGL2/FBO, not WGSL.

## Hard gate (born-RED, on land)

`proof:aurora-t5` (new, fail-closed) asserts the oil/oil-pastel §4.2 anisotropy + the
oil-pastel §4.3 slope land their reference-anchored bands on the real GPU (the residual the
`proof:aurora-arresting` gate currently RECORDS-not-asserts moves into the asserted set), with
the four AX not-flat floors + the van-Gogh HERO bands held (no regression). Born-RED:
oil-pastel A=0.673/β=−2.534, oil A=0.359 sit outside the bands at HEAD.

## USER-HINGE (the NECESSITY-MATRIX §2 decision — surfaced at close)

The multi-pass finish is a **real-cost lane** (a second FBO pass + a Kuwahara operator — a
fragment-shader cost on every frame for every aurora consumer). The user decides:

- **Accept the single-pass ceiling** as the permanent register — van-Gogh (the arresting HERO)
  lands all three bands on the single-pass path today; oil/oil-pastel read pigment-true +
  distinct + clear the colourfulness band, with the anisotropy/slope coherence as a recorded,
  honest residual. (Zero new cost; the band is NOT lowered — the residual stays printed in the
  arresting gate log.)
- **Spend the multi-pass cost** — execute this wave, raising oil/oil-pastel into the full
  arresting bands at the per-frame FBO+Kuwahara cost.

This wave does NOT execute until that hinge is decided. It is the named LIVE owner so the
residual is no longer a dead pointer; it is `planned`, not `open`.

## Cross-references

- W-AUR-PAINTERLY-DELTA.md §Named-successor (the residual triples + the structure-tensor
  ceiling rationale).
- W-AUR-STUDIO §6 / D5 / D6 (the dead-pointer re-route that mints this wave + the measured
  single-pass radii ceiling).
- `W-AUR-WEBGPU-DECIDE-DELTA.md` (the terminal RETIRE — "any future WebGPU work opens fresh
  with a named consumer"; this wave IS that fresh named consumer, on the WebGL2/FBO path).
- RESEARCH.md §3 T5 (the anisotropic-Kuwahara operator).
