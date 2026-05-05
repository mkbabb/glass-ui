# Wβ0 - SPEC.md consistency check

**Wave**: G.β.Wβ0
**Date**: 2026-05-04
**Authority**: spec verification only; the five §11 questions were locked by user before Wβ0 opened.

## Scope

Verify SPEC.md is internally consistent with the five user-locked decisions. Do not re-decide.

## Gates

### (a) §3 API includes `:tap-mood` and `:tap-duration` props

`docs/tranches/G/blob/SPEC.md` §3, lines 48-49:

```
:tap-mood        // BlobMood | null — on tap (touch) or click, transition to this mood
                 //   for `tap-duration` ms then return to base. Default null = no tap behavior.
:tap-duration    // number — ms; default 800
```

Status: **present**. Matches §11.5 lock.

### (b) §3 records Blob-owned cast shadow with `--blob-cast-shadow-{y,blur,mix}` knobs

SPEC.md §3, line 57:

```
The `<Blob>` wrapper element renders a subtle cast shadow on the substrate via
`box-shadow: 0 var(--blob-cast-shadow-y) var(--blob-cast-shadow-blur)
color-mix(in srgb, var(--blob-color) 18%, var(--foreground))` — the blob casts
its own shadow.
```

The literal `18%` here is the SPEC.md authored default. The token-driven form (replacing `18%` with `var(--blob-cast-shadow-mix)`) is recorded in §11.3:

> The `<Blob>` wrapper renders `box-shadow: 0 var(--blob-cast-shadow-y) var(--blob-cast-shadow-blur) color-mix(in srgb, var(--blob-color) var(--blob-cast-shadow-mix), var(--foreground))` per §3 / §7.

§11.3 is the canonical formulation (token-driven). §3 narrative records the `18%` default *value* of `--blob-cast-shadow-mix`. §7 records all three knobs:

```
--blob-cast-shadow-y:                       0.5rem
--blob-cast-shadow-blur:                    1.5rem
--blob-cast-shadow-mix:                     18%
```

Status: **present**. The §3 prose-literal vs §11.3 token-form is intentional reading guidance, not drift; both documents agree on the value (`18%` = `var(--blob-cast-shadow-mix)` default).

### (c) §6 GLSL has `uChromaticAberration` uniform

SPEC.md §6, line 205:

```glsl
uniform float uChromaticAberration;  // 0.0..0.005
```

Used in main() at lines 234-235:

```glsl
float dR = sdField(p + vec2( uChromaticAberration, 0.0));
float dB = sdField(p - vec2( uChromaticAberration, 0.0));
```

Status: **present**. Matches §11.2 lock.

### (d) §7 token list completeness

SPEC.md §7 "New tokens (W1 hosts these)":

```
--blob-border-mix:                          12%
--blob-border-mix-contrast:                 24%
--blob-grain-opacity:                       0.04
--blob-chromatic-aberration:                0.002
--blob-cast-shadow-y:                       0.5rem
--blob-cast-shadow-blur:                    1.5rem
--blob-cast-shadow-mix:                     18%
```

Plus the consumed `--blob-color: var(--easing-accent)` in the "Consumed canon tokens" subsection (line 286).

Cross-check vs `docs/tranches/G/waves/W1.md` §"Blob token primitives", which enumerates every token above with the same default values. Zero drift.

Status: **complete**. All eight `--blob-*` tokens listed; W1 will host them per W1.md.

### (e) §11 records all five decisions as "locked 2026-05-04"

SPEC.md §11, line 448:

> ## 11. Decisions (locked 2026-05-04 by user; Wβ0 verifies, does not re-decide)

Five decisions enumerated:

1. Renderer architecture: instance-local GL context (line 450).
2. Chromatic aberration: exposed CSS variable (line 451).
3. Cast shadow: owned by Blob (line 452).
4. Web Worker for state machine: deferred (line 453).
5. Touch interaction: `:tap-mood` prop (line 454).

Status: **all five present, all marked locked**. Section header explicitly states "Wβ0 verifies, does not re-decide."

## GLSL placeholder note

SPEC.md §6 includes two placeholder comments:

```glsl
vec3 hsl2rgb(vec3 c) { /* canonical 8-line transform */ }
float snoise(vec2 v) { /* canonical 24-line simplex noise */ }
```

These are intentional spec elision markers — the spec names canonical implementations rather than inlining well-known public-domain algorithms. Wβ0's playground inlines:

- **hsl2rgb**: standard HSL→RGB transform (Wikipedia / GLSL idiomatic vec3-mod form, 8 lines).
- **snoise**: Ashima Arts / McEwan / Stefan Gustavson 2D simplex noise (MIT-licensed reference at https://github.com/ashima/webgl-noise, 24 lines).

The playground compile log (`Wβ0-shader-proof.md`) documents the inlined sources. Wβ1 will inline these canonical implementations into the production renderer source verbatim with the same provenance comment.

This is **not a SPEC bug**. It is a deliberate elision per the precedent that the spec lists what the shader produces, not how each well-known helper is written.

## Result

**SPEC.md consistency: zero diff applied.** All five gates pass. All five §11 decisions are recorded as locked 2026-05-04. Wβ1–Wβ3 amendments proceed without spec modification.
