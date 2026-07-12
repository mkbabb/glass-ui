# BI.W-METAL-RIM-BAND — the masked-band metal rim (Law 3, band-on-overlay)

Band B1 (geometry grammar). Discharges Law 3 of `proof:geometry-grammar` + hardens it to the
ruling-10 band-on-overlay form.

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-A7** — "Borders on these are totally wrong" (ss-07; the `.metal-*-border` border-image SQUARES the
  corners on a rounded card — the exact defect BorderProgress's masked-conic avoided).
- **FAM-4** "Metal rim border-image squares corners" · **GEO-3** (radius-grammar; metal border-image, vacuous
  `proof:metal-shimmer`).
- **Ruling 10** (PASS-4B) — GLASS Law-3 band-on-overlay is MANDATORY: the mask-composite ring lives on a
  DEDICATED overlay element / `::before`, NEVER the host (the pass-4b direct-host application was the
  regression the critic caught; pass-5 re-forms it).

## §Design

Decided mechanism — D-GLASS PASS-1 §4 Law 3 + PASS-4B ruling 10 (the band-on-overlay reform). The masked-band
recipe is a PROVEN in-repo mechanism (`border-progress.css:57-70` — `mask: …padding-box, …border-box;
mask-composite: exclude` + the `-webkit-mask-composite: xor` companion). NO re-litigating.

- **Re-express the swept metal rim as a MASKED BAND on a dedicated overlay** (the BorderProgress precedent): the
  `--metal-shimmer-color`-bound gradient paints on a `::before` overlay whose `mask-composite: exclude` leaves
  ONLY the border band, which FOLLOWS `border-radius` exactly. `border-image` is DELETED (clean break, no alias).
  The `metal-shimmer-sweep` `background-position` keyframe rides UNCHANGED; PRM-static bracket inherited.
- **The band lives on the overlay, never the host** (ruling 10): the ring is a `::before` (or a dedicated child
  element), so the host's own content/backdrop is untouched — cards keep interiors, rims follow radii.
- **Mandatory `@supports (mask-composite: exclude)` gate + the solid-inset-ring fall** (metal-base-color rim):
  without it a gap engine paints the gradient as a FULL BOX fill (a real break); with it the rim still reads,
  only the sweep is lost (honest degrade, primary present — NOT a masking fallback). Safari 26 takes the masked
  path (pass-4 verified on real WebKit).
- **`.metal-rainbow-rim` is already correct** (it composes the `--glass-accent` inset seam) — UNTOUCHED.

## §Work

- `src/styles/utilities/metal.css:108-162` — the `.metal-{gold,silver,bronze}-border` group: DELETE the
  `border-image` (`:121-130`) + the `background-clip: border-box` host paint; move the swept gradient onto a
  `::before` band overlay with the mask-composite exclude recipe; wrap in `@supports (mask-composite: exclude)`
  with the solid-inset-ring fall in `@supports not (…)`.
- `src/styles/utilities/metal.css:204-214` — the PRM-static bracket re-targets the `::before` overlay (the
  `animation:` line the sole motion, gated by `prefers-reduced-motion: no-preference`).
- `scripts/proof-geometry-grammar.mjs` (LANDED by W-RADIUS-GRAMMAR) — HARDEN the Law-3 arm: beyond the
  border-image flag, add the ruling-10 **band-on-overlay** assert (a `mask-composite` band decorating a metal
  rim must sit on a `::before`/dedicated overlay, not a `.metal-*-border` HOST `background`) + a self-test bite
  (a planted host-applied band flags).
- `scripts/proof-metal-shimmer.mjs` — add the border-image-absent + corner-follows-radius bite (the vacuous-gate
  fix, GEO-2/GEO-3 evidence).

## §Acceptance

Gate: **`proof:geometry-grammar`** Law-3 clause + **`proof:metal-shimmer`** (extended).
Born-RED at HEAD: Law 3 flags the `border-image: linear-gradient` at `metal.css:122`. GREEN here.
- Law 3: no `border-image` gradient on a rounded rim + the band-on-overlay assert (born-RED: the direct-host
  application; GREEN on the `::before` overlay).
- `proof:metal-shimmer`: border-image-absent + corner-follows-radius (born-RED: the gate never checked geometry —
  green-over-broken; a real bite now).
- Self-test: a planted `border-image` gradient flags; a planted host-applied band flags; a masked `::before` band
  passes; a `@supports not` degrade with border-image is allowed.

## §π/DELTA

`tests-visual/metal-shimmer.spec.ts` (extend) + the ruling-10 **pixel-sampled whole-surface gestalt** (the
pass-5 re-verify — pixel sampling, NOT computed-style greps):
- `.metal-gold-border` on a `rounded-card` host: the rim FOLLOWS the 16px radius (corners round, not squared);
  the swept sheen runs; the card interior is intact (backdrop transmits).
- the `@supports not (mask-composite)` fall renders a solid-inset-ring RIM (not a filled box).
- Chromium + **real WebKit** (the SAF-1-sanctioned paint question; the pass-4 residual — mask-composite on the
  genuine engine), BOTH modes.

## §Obligations

- **Device run:** real-Safari.app / WKWebView capture of the masked band (the mask-composite gestalt on the
  Metal compositor) — shared with the band's whole-surface gestalt readback (dis:safari-metal-verify seam).
- No cross-repo ask (same `.metal-*-border` class name; visual-only clean break — no API surface change; a
  consumer binding the class re-paints correctly on rebuild).

## §Dispositions

- **cmd:chromatic-aberration-rim** (CHRONIC §4c) — the full RGB-split rim successor stays FOLD→D-GLASS
  glass-simplify (the `--glass-edge-dispersion` rim already landed); NOT re-opened here. Recorded, no re-book.
- Liveness probe: a `border-image` gradient on ANY rounded rim REDs; a host-applied band REDs (the ruling-10
  regression cannot return).
