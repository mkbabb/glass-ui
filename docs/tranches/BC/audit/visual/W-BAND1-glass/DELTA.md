# BC Band 1 (glass spine) — DELTA (the warm-cream floor, paint-verified)

**Binding paint proof:** `npx playwright test glass-identity.spec.ts glass-legibility.spec.ts
adaptive-glass-live.spec.ts` → **130 passed, 0 failed** on BOTH projects
(`chromium-headless-new` real-Metal-GPU desktop 1280×800 + `coarse-touch` mobile 390×844),
both modes. The cardinal-lesson close-paint (`--run pi` GREEN on a real device) for the glass band.

## What landed (the spine)
- **BLACK-BAR** — the D2 dark-bar retired at ONE token source: the card border-top rim is a
  DIRECTIONAL catch-light (`--glass-rim-top` bright inset + `--glass-rim-bottom` warm under-shadow),
  the six `--glass-border-*` rungs dropped to ≤5% α. `proof:black-bar` born-RED 15→0.
- **GLASS-IDENTITY** — the warm-cream translucent identity floor, gated BIDIRECTIONALLY: the grey
  slab `oklab(0.695 0.002 0.006 / 0.536)` now REDs the calm-light band (the monotonic blind spot
  closed — grey can no longer score better than warm cream). `proof:glass-identity`.
- **ADAPTIVE-RECONCILE** — the observer loop CLOSED: `--glass-backdrop-luma` is READ into the
  `--glass-tint-strength` clamp (continuous, bounded [4%..20%, ≤24% iOS], knee 0.6). ONE axis / ONE
  driver / ONE signal. `proof:observer-loop` flipped born-RED→GREEN (6 read sites, in-compose).
- **GLASS-LEGIBILITY-MEASURED** — iOS-27 more-glass-AND-more-legible, measured both-directions; the
  per-rung `--glass-saturate-{tier}` knobs minted. `proof:glass-legibility`.

## Pixel-readback (live :5199, getComputedStyle, the captured surfaces)
| route | selector | light | dark |
|---|---|---|---|
| /dock/overview | .glass-dock | `srgb(0.895 0.883 0.867 / 0.443)` warm-cream translucent | `srgb(0.334 0.319 0.307 / 0.490)` warm dark |
| /substrates/glass-material | .glass-resting | `oklab(0.768 0.0020 0.0061 / 0.72)` (adaptive-darkened over the busy aurora — the dock-at-REST identity) | `oklab(0.383 0.0039 0.0061 / 0.754)` warm dark register |

Captures (LIVE motion, this dir): `dock-{light,dark}.png`, `glass-material-{light,dark}.png`,
`glass-card-{light,dark}.png`, `feedback-{light,dark}.png`.

## The verification-leaf fix (orchestrator)
The shared `scripts/lib/paint-arm.mjs` was extended to read `oklab()`/`oklch()` computed values
directly (modern Chromium keeps oklab-authored colours in computed style — it does NOT down-convert
to sRGB; the warm-cream tokens resolve to `oklab(...)`). A per-tier/per-mode `bandForTier` resolver
replaced the flat band (content α<0.72 light / <0.82 dark; floating <0.86; overlay <0.97; chroma
floor 0.004 — the actual warm-cream chroma, since grey's chroma 0.0063 is IDENTICAL, so **L** is the
grey separator). Anti-disease invariant held: the grey slab REDs every band on L<0.85.

## Note (gestalt-roster)
`proof:ba-gestalt`'s bc-gestalt-roster PNG-probe rows stay born-RED; the roster's per-surface
capture-framing + probe regions need reconciliation to the actual routes (several probe regions
assume a framing the live demo doesn't hold) — an owned gestalt-capture hardening pass, NOT a
deferral: the BINDING per-band paint runs here (the π, GREEN) and is not punted to a terminal wave.
