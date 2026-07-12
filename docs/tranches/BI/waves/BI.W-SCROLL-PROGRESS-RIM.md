# BI.W-SCROLL-PROGRESS-RIM — the dock-rim scroll progress: rainbow, thinner, rounded (UF-D1)

## Mandate
UF-D1 (verbatim): "The scrolling progressbar needs a great deal of refinement, should be rainbow,
thinner, and rounded." ss-02: the current read is a chunky flat gray band on the vertical dock rim.

## Design
The dock-rim scroll progress re-expresses on the BorderProgress masked-band mechanism (the ONE
radius-following band register — never border-image, per geometry Law 3): `coverage` follows the dock
edge, the band width drops to the thin rung (~3-4px, ≤ the 10-14px card envelope's floor — a RIM
indicator, not a card chrome), the fill walks the brand spectrum OKLCH/shorter (the `useBorderSpectrum`
ramp — "rainbow" = the section-color ramp, staying in the warm identity), and the band inherits the
dock plate's radius (rounded by construction on the masked band). The demo passes the spectrum config
(presets-in-consumers). Coordinates with B3 (the greenfield dock's plate is the host; this wave binds
AFTER W-DOCK-SPINE lands the plate) and B1 Law 3.

## Acceptance — `proof:dock-progress-rim` (born-RED)
(a) the band is the masked-band mechanism (no border-image, no floating bar); (b) width within the
thin rung; (c) the fill resolves ≥4 distinct ramp hues across 0→100% (the rainbow walk); (d) radius-
following at the dock corners (the Law-3 corner probe); + self-test bites.

## π/DELTA
The scrolled-route capture pair (0%/50%/100%) on the vertical + horizontal dock, both modes, both
engines — the thin rounded rainbow rim reads against ss-02's gray band as the ground.
