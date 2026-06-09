# AY.W-LIQUID — the iOS-27 Siri liquid-glass facility: amorphous flex + squish as a SHARED primitive

**State:** OPEN (user-directed 2026-06-09: "audit of the new siri component, which is an amorphous
glass blob that flexes and squishes — our blobs and docks and other components should have this
facility") · **Repo:** glass-ui · **Band:** A (component perfection — research-first)
**Type:** SOTA research → plan → facility impl (the triumvirate; the research arm runs INSIDE the
hardening hand-challenge as a dedicated lane, then this spec re-grounds before build).
**Depends on:** W-COHERE (the set-cohesion contract the facility must join), W-GOD1 (the carved
SFCs are the integration sites), the W52/W53 axes (the shipped liquid-glass + elastic-stretch
precedents this EXTENDS, not duplicates).

## §1 — The target (what "Siri-like" means, concretely)

The iOS-26/27 Siri orb register: an amorphous glass volume that
- **flexes** — the silhouette deforms toward input (pointer/touch/focus), a soft directional lean
  with surface-tension resistance, not a rigid translate;
- **squishes** — volume-preserving deformation on press/impact (the scale X/Y reciprocal — the
  AX.W53 `--tab-indicator-max-stretch` precedent generalized), released on a spring;
- stays GLASS throughout — the refraction/specular/edge-gleam reads as one continuous material
  while deforming (the W52 liquid-glass model: thin edge catch-light over a diffuse bloom).

glass-ui already owns the PIECES: the blob's membrane wobble + centroid lean (mood), the
SegmentedTabs elastic indicator (volume-preserving stretch, capped low, snappy release), the W52
specular/edge model, the dock morph spring. What does NOT exist is the SHARED facility — each
component hand-rolls its own deformation; none reads as the Siri-register material response.

## §2 — Research lane (runs in the hand-challenge; the brief)

A dedicated SOTA lane: the iOS 26/27 Siri orb + Apple's Liquid Glass material system (WWDC
2025/2026 sessions, the HIG material chapter, the published motion specs + credible teardowns) —
extract the deformation model (what drives flex: input proximity? audio? state), the
volume-preservation constraints, the material-continuity tricks (how the specular tracks a
deforming silhouette), and the PRM/a11y story. Output: a falsifiable parameter model (max
deformation %, response/damping bands, the squish-axis rules) the facility implements — the
W-AUR-PAINTERLY reference-anchored-bands discipline applied to deformation.

## §3 — Objective (the facility, post-research)

ONE shared primitive — working name `useLiquidFlex` (composable) + the `--liquid-*` token cohort —
that any component composes:

1. **The deformation engine:** a small state machine over (rest → flex-toward-input → squish-on-
   press → spring-release), driving CSS transform pairs (volume-preserving `scale(sx, 1/sx)` +
   directional skew/translate within capped bands) on the component's deformation root. Springs
   ride the house `--spring-*`/keyframes.js vocabulary (W-MOTION2's table) — no second clock.
2. **The material-continuity contract:** the deforming root carries the glass tier + specular so
   the material deforms as ONE (the W52 axes read on the same element the transform deforms).
3. **The consumers (≥3, real):** the BLOB (the mood lean upgraded to the flex model; the squish on
   click — the W-BLOB3 interaction DELTA's bounce becomes the shared squish), the DOCK (the held/
   press states gain the capped squish — the iOS dock-icon press register), and the SegmentedTabs
   indicator RE-POINTS its bespoke stretch onto the shared facility (deletion of the local impl —
   the proof the abstraction is right).
4. **PRM:** deformation is motion — under reduce, flex/squish collapse to the static state change
   (opacity/tier only); the engine never animates transforms under PRM.

## §4 — HARD GATE (sketch; the research lane + hand-challenge harden the numbers)

1. **FLEX-RESPONDS π readback (born-RED):** pointer-proximity drive on the blob demo — the
   silhouette centroid/extent readback deforms toward the pointer within the researched band, and
   returns to rest on a measured spring (response/ζ within the model's bands).
2. **VOLUME-PRESERVED:** during squish, measured `sx · sy ≈ 1` within tolerance on every frame
   (the reciprocal invariant — a squash that loses volume reads as deflation, not material).
3. **ONE-FACILITY deletion-proof:** SegmentedTabs' bespoke stretch code DELETED, re-pointed to the
   shared engine; the W53 `proof:tabs-unified` stays green (behaviour-preserving swap).
4. **MATERIAL-CONTINUITY:** the specular/edge-gleam tracks the deforming silhouette (a π sample of
   the gleam position vs the deformed bounds at mid-squish).
5. **PRM + DELTA:** no transform animation under reduce; captured light+dark flex/squish frame
   series per the cardinal protocol.

## §5 — Scope fence

- EXTENDS W52 (specular/edge material) + W53 (elastic stretch) — does not re-litigate either; the
  shipped tokens stay the vocabulary.
- NOT a physics engine — capped parametric deformation bands, not soft-body simulation (KISS; the
  Siri register is a TUNED parametric response, which is the point of the research lane).
- The aurora/fourier substrates are out of scope (they are fields, not bodies); constellation's
  warp already has its own spring model (W-CON2).
