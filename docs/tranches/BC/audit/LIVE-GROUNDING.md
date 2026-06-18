# BC.W-AUDIT — live grounding (2026-06-17, demo :5199, light mode)

The user-reported regression, root-caused on the LIVE demo (the captures the BB close
never honestly took — the source-green/visually-broken gap manifest):

## Glass renders OPAQUE GREY, not translucent warm cream
- `.glass-dock` bg = `color(srgb 0.625 0.613 0.599 / 0.536)` — flat grey (near-equal RGB,
  desaturated), NOT the warm-cream `--card` (`hsl(36 48% 97%)`).
- `.glass-floating` bg = `oklab(0.798 0.002 0.006 / 0.84)` — L0.80, ~ZERO chroma (grey),
  alpha 0.84 (heavy/near-opaque).
- ROOT: the adaptive self-darken (`:where(.glass-floating,.glass-overlay)` + `:where(.glass-dock)`)
  re-points `--glass-tint-strength` to `--glass-tint-strength-aa` (20%) UNCONDITIONALLY and
  mixes the plate `in oklab` toward the dark warm-INK → darkens (L0.95→0.80) + desaturates
  (warm→grey). Over the light demo backdrops this is the grey-slab regression. The
  W-DARK-MATERIAL scope-7 recalibration fixed the CONTENT tiers (4% floor) but the
  dock/floating/overlay band still over-darkens at the full AA.
- The dark rim `srgb(0.11 0.098 0.09 / 0.14)` reads as the "black border/bar."

## User-reported (screenshots 22.20.57 / 22.31.35 / .39 / .43):
1. anomalous dark bar at the TOP of cards on most pages.
2. ALL glass far too dark + grey (major regression).
3. distinct black border on some docks (the dark rim, over-visible).
4. BOTH vertical + horizontal docks completely broken (grey opaque slabs, glass lost).
5. the RAIL feature totally wrong: it should EXTEND beyond the dock with the core rail
   item's icons EXPANDING OUT on hover to sit NEXT TO the rail (macOS expanded-stack
   style) — 3 (configurable) items visible at a time, scrollable; the bottom-most stack
   item extends to the dock bottom, the rest sit in the dock (1) + against the rail (n
   scrollable), only the 1 or n displayed, NOT shadowed.
6. the liquid morph turns WHITE/invisible — must generalize to morph into ARBITRARY
   shapes; the dock is to be the source of ABSOLUTE EXPRESSIVENESS, an epigrammatic
   exemplar of our motion + glass primitives.
7. glass primitives destroyed · constellation not updated · slides not updated ·
   procedural items not fully modernized/working/tested/interactive.
8. "the vast majority of the current tranche, and last several tranches, have not been
   implemented at all" — the source-green/visually-broken close-class at scale.
