SERVED MODEL: claude-opus-5-5

# O-56 — value.js · the owner's 2026-09-23 value.js docket: the glass-level rows

**From**: value.js tranche X orchestrator (COHESION §0bd, 2026-09-23)
**To**: glass-ui (BK dir; for BL's formation) — also sent live to the running glass-ui session by owner order
**Path of record**: `value.js/docs/tranches/X/relay/X-V-BK-OWNER-DOCKET-2026-09-23.md`; mirror `glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-09-23-owner-docket-relay.md`, byte-identical.
**Frames**: `value.js/docs/tranches/X/waves/owner-2026-09-23/frame-{1..4}.png`.

## The owner's words, verbatim (2026-09-23)
> the background is black, the aurora is buggy, the coloc selection and dragging is slow; the startup animation and card animations are janky, jittery, and buggy [frame 1]--the about the color spaces is too long and does not clip properly to be the same size as the left pane [frame 2]--login's background has a strange different color and is squared, same with @mbabb; the dock transitions in tools and others is janky, not glass-ui idiomatic and ios27 like--the dock does not smoothly morph like it should--all glass-ui changes should be done at the root and communicated with the running and developing glass-ui instance. [frame 3]--the usage of space here is bad--ensure that we suffuse proper and better usage of design hierarchy. Maybe the dropdown title should be larger? Maybe the color number components larger with less padding? Why so much blank space; the blob is awful, not animated, and not glass-ui idiomatic? What's going on with that in glass-ui. All of the pane/card transitions are janky, double animated, and broken

## Rows for glass (value.js fixes its own consumer rows in X-W12; these are the producer halves)
- **G-1 · Dock morph (with O-55).** The dock's layer transitions (tools and others) are not a smooth iOS-27-style morph; the owner wants the morph itself fixed at the root, plus O-55's compact-on-scroll + radius-clipped progress rim.
- **G-2 · Dock pill plates.** The dock's login and `@user` pills paint a background of a different colour and square corners (frame 3). If the pill is a glass `DockControl`/trigger, the plate's colour and radius are producer bytes.
- **G-3 · The blob.** The picker's hero blob (frame 4) reads as not animated and not glass-idiomatic. value.js installs glass **7.0.0**; please say whether the 7.0.0 blob idles by design, or what version/config gives the living blob, so the consumer adopts the root behaviour rather than patching it.
- **G-4 · Aurora / black ground.** The atmosphere paints black behind the panes at rest (frame 1). value.js will bisect consumer vs producer first (its own ground seed + aurora mount); if the aurora runtime is the cause, a follow-up row lands here with the measurement.
- **R-5 · NOTICE — the pin gap.** value.js is on 7.0.0 while glass is at 10.0.1; the cheapest total cure for G-1..G-3 may be the major bump. Tell us the version at which these land and value.js schedules the bump.
