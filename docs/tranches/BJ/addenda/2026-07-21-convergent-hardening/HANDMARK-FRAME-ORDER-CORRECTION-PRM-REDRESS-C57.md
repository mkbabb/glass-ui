# HandMark frame-order correction and PRM redress — C57

Date: 2026-07-22 EDT  
Status: **FORWARD CORRECTION TO C55 · CORE DEFECT PRESERVED · PRM NONDETERMINISM ADDED**

C55 remains immutable historical formation evidence. A concatenated multi-image
preview rendered misleading partial crops, so every artifact was re-inspected
one file at a time. This receipt strikes the misattributed frame while preserving
only claims supported by exact single-file pixels.

## Corrected normal-motion chronology

Assay A:

- onset `6f21b38a…`: full `A drawn line` paint;
- +120 ms `cabc9046…`: text clipped to the small `wI`-like fragment while the
  underline remains;
- later `1c6b9f23…`: full paint returns.

Assay B:

- onset `2285b8fd…`: full paint — C55's statement that this onset was clipped is
  **retracted**;
- +120 ms `963c3914…`: full paint;
- +900 ms `6b593522…`: text is clipped to the small fragment while the underline
  remains;
- late `47d89b32…`: full paint returns.

Thus two independent assays still reproduce the semantic-text/paint divergence,
but at different lifecycle positions. The non-deterministic timing strengthens
the need to test ResizeObserver/font-settle/replay interleavings; it does not
authorize labeling every onset defective.

## Reduced-motion deepening

Assay A under requested PRM produced byte-identical onset/mid/settled frames,
SHA-256 `572bb3f56bfcc41f86ff2536aaa393760cbe26f3bafd28b92094c002d3b72c25`.
A second tab-B PRM run also retained full text in its credited individual files.
Neither passing run can prove determinism.

A fresh tab-B run independently verified the live media posture before input:
`390×844`, DPR 1, coarse true, fine false, hover false,
`prefers-reduced-motion: reduce` true. Trusted replay then retained:

- first frame, full paint:
  `evidence/browser-assay-b/handmark-replay-prm-first-frame-coarse-mobile-b3.jpg`,
  SHA-256 `74597f23e6bc06e79b7d5f7ab0d68d9b4873a821cc5721ad0f6b15b2a4a748d3`;
- +120 ms, clipped text/underline-only paint:
  `evidence/browser-assay-b/handmark-replay-prm-next-frame-coarse-mobile-b3.jpg`,
  SHA-256 `2010efbd0a4de82c855e5436f3d8a28d6af0d0fb4aae595682a8d3d74ac0186e`.

PRM therefore does not yet guarantee a stable terminal paint across every
post-activation frame. `transition:none` is insufficient while `play()` still
executes a `drawn=false` reset, forced reflow, and requestAnimationFrame state
flip alongside live measurement. The later implementation may choose a simpler
mechanism; the public contract is that PRM never exposes an intermediate blank
or clipped text/mark frame.

## Evidence law

Only one-file-at-a-time visual inspection may support frame-local claims. A
concatenated preview, hash equality, DOM semantics, or stable endpoint may
support identity/structure but cannot substitute for exact per-frame pixels.
The C55 existing-owner disposition remains: GF-HANDMARK W2/W3/W5, one renderer,
one narrow public mark plane, no generic scrub primitive.

No product, source, test, gate, package, lock, repin, or acceptance change is
authorized by this forward correction.
