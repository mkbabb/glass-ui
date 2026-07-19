# PROBE-NOTES — V-VAPOR, the vaporize dissolve

verified-model: claude-fable-5 (system-context model ID, verbatim). Seat novelty:PROTO-2
(PROTO-ATTENTION-EXIT), 2026-07-18. Status: RUNS; `node check.mjs` 39/39 PASS at write time.
Files: `index.html` (self-contained; the three noise masks are build-time data-URI PNGs
stamped inline — mulberry32 seeds 1001/2002/3003), `check.mjs` (extracts the physics block
AND decodes the mask PNGs straight out of the CSS: signature, filter-0 rows, mean alpha,
horizontal run-length grain metric).

## What the prototype claims to prove

Roster card 4 whole: dismissal erodes through a static coarse→mid→fine noise ladder,
scrub-mapped to drag travel (`--scrub-t`), catchable mid-vaporize (C¹ at the catch seam),
velocity-projected on release (law 7c, τ=0.2s), with the close order honest — content leaves
first, the 140ms empty-medium beat holds, the medium relaxes last (the F5/N8 inversion).
Exactly 3 layers: the body carries the shallow fine grain (reads clean at rest, mean alpha
0.95), two cream ghosts carry the full-depth coarse/mid masks (measured run lengths
21.3/4.6/1.5px — three REAL densities, decoded not asserted). Ghost blur radii fixed
(2px/4px); only layer opacity + translate move. The vapor is warm cream (R>B on every mask
texel — never white noise).

Node-proven: release truth table 4/4 (drift returns, flick commits, thrown-back returns,
placed-past-half commits); snap duration-stable (642/596ms across seeds, ratio 1.08);
zero-seed overshoot 0 (overshoot is velocity-bought); ladder continuous (max step 0.006 per
0.002 of scrub) and clean at both ends; close order content 433ms → beat 140ms → medium tail
499ms.

## QUEUED-PAINT (the serialized browser arm's ledger — video path only)

1. **QUEUED-PAINT / the erosion read.** WebKit video of a slow scrub: the body must granulate
   through the fine grain as it thins while coarse cream flecks drift up through it — an
   EROSION, not a crossfade. If it reads as two soft ghosts fading, the mid-density mask needs
   a deeper alpha floor (mask regeneration, not mechanism change).
2. **QUEUED-PAINT / the empty-medium beat.** Video the commit: content fully out, then a
   visible beat (~140ms) of pure contentless blur, THEN the medium relaxes decelerating. The
   beat is the signature moment; a screenshot cannot see it.
3. **QUEUED-PAINT / masked backdrop body under scrub.** The body layer combines
   backdrop-filter with a mask-image; confirm WebKit composites both (the F1 glass under a
   96px tiled alpha mask) without dropping the backdrop blur — same class of claim as the
   V-ALENS stack, same video organ.
4. **QUEUED-PAINT / compositor-only channels.** Trace a full scrub+release: opacity +
   translate + the fixed-radius ghost blurs only; no repaint storms from the static masks.
5. **QUEUED-PAINT / catch mid-snap.** Video: pointer down during a live release snap seizes
   the value with zero visual jump (node-proves C¹; paint must agree).

## Known dishonesties and limits

1. The masks tile (96px body / 64px ghosts). At card width ~360px the tiling repeat is
   3.75x/5.6x — visible periodicity is possible under close inspection; the browser arm should
   judge. Cure if needed: larger single-tile masks, still build-time, still static.
2. The ghost layers duplicate the card's text content (aria-hidden). Real integration should
   snapshot-free duplicate via CSS (element() is not available) — duplication is the honest
   web mechanism, but it doubles text layout cost at mount. Bounded: layers exist only during
   dismissal.
3. `commitClose` uses one `setTimeout` to flip the final `closed` class after the medium's
   CSS transition — a clock parallel to the transition, not a listener. Drift risk is ~ms and
   post-commit only; `transitionend` would be tighter (noted for the library form).
4. The release snap is critically damped (ω=11) — the law-14a duration-stable CLASS, but the
   τ≈130ms/settle 650-683ms constants are the dock's; this organ's 596-642ms sits inside the
   class band, not at the canonical point. Deliberate: dismissal is heavier than a dock seat.
