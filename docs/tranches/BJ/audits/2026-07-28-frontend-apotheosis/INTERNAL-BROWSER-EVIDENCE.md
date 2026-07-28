# Internal Browser evidence — frontend audit

**Seat:** coordinating root, in-app Browser
**Date:** 2026-07-28
**Target:** `http://localhost:5261`
**Viewports:** 1280×720 desktop and 390×844 mobile

This is measured audit evidence, not a source of design law. The Browser session used the
application's real routes and mounted components. Assertions below distinguish measurements from
judgment.

## Shell and landing

- The document is a fixed shell; `main.demo-main-scroller` is the intentional scroll owner.
- Desktop home: `main` measured 1192×652 with `scrollHeight=1862`; `scrollTop` moved 0→558.
- Mobile home: `main` measured 390×776 with `scrollHeight=3996` and
  `scrollWidth=clientWidth=390`. At its maximum scroll, the final composition card ended above the
  fixed dock; the endpoint was reachable and not occluded.
- The front door uses a large “Glass UI” title, a pastel aurora band, a yellow blob, category cards,
  the left category rail, and the bottom story dock at once. This is reachable, but several identity
  preview tiles repeat the category/story title instead of demonstrating a property.
- The palette is consistently warm and dark, but the shell, cards, controls, and overlays are so
  close in low-chroma brown that the Golden Glass hierarchy is often weak unless a vivid substrate
  is present.

## Display and controls

- `/display`: one H1 and five cards; `main.scrollHeight=1064`.
- `/display/buttons`: mounted button variants include primary/default/quiet/text/delete, disabled,
  loading, icon, and size variants. Keyboard focus produced a visible ring.
- Mobile `/display/buttons`: no horizontal overflow; `main.scrollHeight=1268`. Measured button
  heights include 28, 36, 40, and 44 px. The selected bottom-dock label visually clipped “Buttons”
  to “But” in the captured posture. This is a capture finding, not yet a proven persistent defect.

## Forms

- `/forms/inputs`: `main` measured 1192×652 with `scrollHeight=3084`, no horizontal overflow, and no
  duplicate IDs.
- The sampled native inputs measured 36, 40, and 44 px for the explicit size variants; the default
  measured 40 px. The textarea measured 123 px.
- Invalid, readonly, and disabled states are distinguishable, and the invalid description is
  associated in the accessibility snapshot.
- The first fold renders each editing state inside its own large material card, then renders the
  field inside it. This is visually legible but over-containerized for a workbench and makes a
  control-family route more than 3,000 px tall.

## Dialog and overlay

- `/containers/dialog`: `main.scrollHeight=1517`.
- Activating “Open glass dialog” mounted one `role=dialog` at 512×274, x=384/y=223. Focus moved to
  the Slug input.
- The modal had a visible scrim, plate, close control, label, field, and Cancel/Save actions.
  Focus/material behavior worked in this sample. The glass reads primarily as a brown translucent
  plate; it does not alone prove the proposed new material canon.

## Dock

- `/dock/overview`: `main.scrollHeight=3792`.
- The compact toolbar measured 56×56; the open toolbar measured 221×56. Both exposed named toolbar
  semantics in the accessibility tree.
- The first demonstration section is a very large pink/brown slab with dense explanatory prose and
  two small docks nested inside it. The component behavior is present, but the specimen does not
  read first; the documentation surface dominates the hallmark control.

## Motion

- `/motion/tempo`: `main.scrollHeight=1068`.
- The route presents one `--motion-tempo` slider, 0.70/1.00/1.30 controls, overlay triggers, and a
  dock specimen. Its “one clock, different motion characters” thesis is materially clearer and less
  contrived than the more encyclopedic routes.

## Aurora

- `/substrates/aurora`: `main.scrollHeight=1381`, one canvas.
- The first fold contains a very large prose block and a long preset control surface before the
  procedural field becomes the visual subject. The component is real and interactive, but the
  workbench gives its explanation and configurator almost equal or greater visual authority.

## Browser-backed frontend conclusions

1. There is no evidence for a blanket “clipped/unreachable demo” defect; the dedicated scroller and
   bottom reserve work on the audited desktop/mobile endpoints.
2. The demo's chief problem is hierarchy and information density, not basic reachability.
3. A truthful workbench should give one active specimen primary visual authority, reduce nested
   card prose, and collapse the persistent story dock to previous/current/next plus an on-demand
   chooser.
4. The Golden Glass, Breath of Life, and Movement of Momentum edicts need a small route matrix with
   captured material, focus, engagement, travel, PRM, narrow-width, and WebKit/device evidence. The
   current visual consistency is not itself proof that those laws are implemented system-wide.
