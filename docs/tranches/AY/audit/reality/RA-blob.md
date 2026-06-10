# RA-blob — reality audit of /substrates/blob (GooBlob)

Live demo driven at `http://localhost:5199/substrates/blob` (headless Chromium 1440×1100, DPR 1, no
reduced-motion). Method: pointer choreography via Playwright + composited element screenshots decoded
with pngjs. Metrics: body mask = pixels >10/255 from the border-median background; motion rate = mean
abs per-pixel frame delta; lean = body-centroid x-shift. Idle baseline motion at a clean (un-occluded)
scroll position: **0.391**. All captures in this dir, `RA-blob-*.png`.

**Verdict: MIXED.** The creature core is genuinely alive — the hover lean and drag-follow are the best
interaction frames I captured anywhere in this audit. But two of the five configurator axes are broken,
the seed/harmony palette never reaches the live hero, and the page's own pause control destroys the
canvas on resume. Gate-green and visually broken coexist on this page, sometimes within one section.

## A. Interaction verdict — ALIVE on hover/drag, overstated on flick, half-true on click

- **Hover lean — READS, strongly.** Park the pointer at x=0.9: centroid +20px within 400ms, settling
  ~+24px (11% of the 224px bead) — `leanTimeline`: rest cx 113.9 → 124.7 @127ms → 134.3 @398ms →
  137.4 @2.1s. Twelve-frame averaged centroids: no-pointer 114.8±2.3, pointer-left 95.0, pointer-right
  139.6 — ±25px, an order of magnitude above orbit noise. The pose is the money shot:
  `RA-blob-lean-pair.png` — rest teardrop vs a pseudopod visibly reaching toward the cursor with a
  satellite merging into the reach. "The creature notices you" is TRUE for a parked or slow pointer.
- **Drag-follow — emphatically alive.** During a ~1.8s traverse the bead chases the pointer (cx 96→137)
  while squashing through peanut/loaf shapes; per-frame deltas 3.6–6.0 vs idle 0.39 (9–15×).
  `RA-blob-drag-series.png` (magenta ring = pointer position) is the proof strip.
- **Flick — does NOT read.** After a fast L→R flick, one brief transient (delta 1.72 at ~250ms, ≈4×
  idle) then back to idle by ~500ms; the post-flick frames are near-identical
  (`RA-blob-flick-default-series.png`). The demo blurb's "velocity squash-and-stretch... and the
  decaying-radius trail reach an elastic pseudopod" does not read at default stretch, and only modestly
  at stretch=1.5. The pseudopod the blurb promises shows up on PARK, not on flick.
- **Click — perceptible, but a flinch, not a bounce.** mask area 0.134 → 0.076 at t=115ms (the bead
  visibly halves), then a monotonic slow re-inflate over >1s with NO ring-back
  (`RA-blob-click-default-series.png`: 0.076/0.069/0.070/0.071/0.072/0.073). "One-shot spring impulse —
  the blob bounces" is half-true: it reacts hard and instantly (good), it never bounces (no overshoot,
  no ring at any captured frame). The Poke button drives the same path: ~1s of visible churn
  (deltas 6.4/4.2/1.4/2.7/2.5, `RA-blob-poke-series.png`) — a soft jiggle, alive but understated.
- **Satellites/merge.** At rest the 3 satellites read as slow surface lumps (mask-area cycle
  0.246→0.282→0.246 over ~5s, `RA-blob-orbit-rest-series.png`) — subtle, readable on inspection.
  During lean/drag the circular merge is excellent: necking lobes, satellites absorbed into the reach.
- **Cream default at rest.** The interaction hero rests as a warm peach-tan bead
  (`RA-blob-interaction-rest.png`) — warm-cream-adjacent, reads more "peanut butter" than cream, but
  attractive and on-brand. PASS with a shrug.

## B. Configurator verdict — NOT robust (2 of 5 axes broken, the hero color feed dead)

The page's config UI is a hand-rolled strip (3 raw `<input type=range>`, a seed text input, a harmony
`<select>`, 5 mood pills) — not the library `Configurator`. Per-control bite, measured:

| Control | Bites? | Evidence |
|---|---|---|
| Mood pills (5) | **YES — excellent** | motion rates idle 0.28 · happy 0.82 · curious 0.97 · sleepy 0.13 · excited 1.57; excited/sleepy ≈ 12×, distinct poses/sheen (`RA-blob-moods.png`). The D7 mood latch is genuinely live. |
| `clickImpulse` slider | YES | post-click motion sum 7.15 @0 vs 17.03 @1.5 (2.4×) |
| `pointerAttraction` slider | **BROKEN on the negative half** | at −1 ("shy-away"), pointer parked right: cx +35.4px TOWARD the pointer — stronger than the +0.35 default (+24). The sign is dropped/inverted; only magnitude registers. `RA-blob-shyaway-right.png` shows the bead lunging at the cursor and clipping out of the canvas. |
| `stretch` slider | NO measurable effect | identical-drag motion sum 56.2 @0 vs 59.4 @1.5 (~6%, within noise). Visually swamped by the lean/follow channel. |
| Seed input + harmony select | **Dots yes, HERO NO — the headline break** | `deriveBlobPalette` works: blue seed → teal/blue/periwinkle dots, triad → blue/pink/green (`RA-blob-palette-dots.png`, all correct). But the hero body color is byte-identical coral before/after: RGB (239,118,123) → (239,117,123) after 3s, (241,137,139) after a mood transition, (240,139,140) after 9s. The blurb's "OKLCh stops fed LIVE to the one hero" is FALSE as rendered — `GooBlob` never takes a post-mount `config.color.paletteStops` change. `RA-blob-seed-hero.png`, `RA-blob-hero-after-blue-seed-9s.png`. |

Coverage is also thin — no body/satellite/surface atoms exposed — fine for a demo, but "robust
configurator" it is not. Aurora's Configurator-driven page is in a different league.

## C. Hard defects found by driving

1. **Pause → resume DESTROYS the render (severe).** Via the page's own `DockBackgroundToggle`:
   pause freezes correctly (motion 0, bead intact, area 0.196). Resume: the canvas erupts into
   full-frame strobing (motion 65.3, mask area 0.99) and settles as a solid charcoal slab — bead gone,
   still broken 5s later (`RA-blob-after-pause-resume.png`, `RA-blob-after-pause-resume-5s.png`).
   Reproduced twice (run 1 wrecked to near-white, run 3 to black — a diverged-state signature,
   consistent with an unclamped dt step on resume). The WCAG-2.2.2 control the page showcases breaks
   the very surface it pauses. Note the gate-trap: a "motion stops, motion resumes" assertion PASSES
   this — motion does resume, as wreckage. The intersection-park path (scroll away + back) is CLEAN
   (`RA-blob-after-scroll-roundtrip.png`, area 0.267/motion 0.36 after two roundtrips) — only the
   `paused`-prop path explodes.
2. **Floating bottom dock occludes + click-swallows the interaction hero.** At the scroll position
   `scrollIntoViewIfNeeded` produces, the demo's bottom dock overlays the hero's lower third
   (`RA-blob-interaction-rest.png`, `RA-blob-orbit-rest-series.png` — "Fourier Field | Glass Panel"
   across the bead) and intercepted my center-of-bead click (counter stayed 0; at a clean scroll the
   same click increments). A real user scrolling casually can sit exactly there.
3. **Mood hero rests RED, not cream.** The source comment ("the resting/idle state with the seed UI
   untouched is the cream default") is contradicted by the render: the default seed
   `oklch(0.62 0.19 25)` paints the hero coral-red at rest (`RA-blob-mood-rest.png`).
4. **Static register overstatement.** "The droplet look in the static register... pastel swatch" — the
   WatercolorDots render as flat, fully-saturated stickers with wobbly edges, the first one near-black
   (`var(--primary)`); no lighting, no droplet look (`RA-blob-static-dots.png`). They work as organic
   color swatches; the droplet-parity claim does not survive looking at it.
5. **Edge clipping at high |attraction|.** The leaning lobe presses out of the `overflow-hidden` frame
   and gets guillotined (`RA-blob-shyaway-right.png`, `RA-blob-maxattr-right.png`).

## D. Calibration — what is genuinely excellent

The lean/drag interaction model, the mood-affect engine, and the merge dynamics are real and
delightful — `RA-blob-lean-pair.png` and `RA-blob-drag-series.png` would make honest marketing
material. The mood latch (the AX.W46 D7 fix) demonstrably holds live, with a 12× excited/sleepy motion
ratio. Pause-freeze itself is clean. If the resume wreck, the dead hero color feed, and the
attraction sign were fixed, this page would be a credible SOTA claim; today it is a lovely creature in
a glitchy enclosure.

## Capture index

- `RA-blob-page-rest.png` — full page at load
- `RA-blob-interaction-rest.png` — interaction hero rest (tan bead; dock overlap visible)
- `RA-blob-mood-rest.png` — mood hero rest (coral red, not cream)
- `RA-blob-lean-pair.png` — rest vs pointer parked right (the pseudopod reach)
- `RA-blob-drag-series.png` — annotated during-drag strip (pointer = magenta ring)
- `RA-blob-hover-sweep.png` — probe-1 sweep (taken at the dock-occluded scroll position; kept as the occlusion exhibit)
- `RA-blob-flick-default-series.png` / `RA-blob-click-default-series.png` / `RA-blob-poke-series.png` — post-event frame strips
- `RA-blob-moods.png` — five mood stills
- `RA-blob-palette-dots.png` — red-analogous | blue-analogous | blue-triad dot trios (derivation correct)
- `RA-blob-seed-hero.png` / `RA-blob-hero-after-blue-seed-9s.png` — hero still red after the blue seed
- `RA-blob-shyaway-right.png` / `RA-blob-maxattr-right.png` — attraction-sign break + edge clip
- `RA-blob-after-pause-resume.png` / `-5s.png` — the resume wreck
- `RA-blob-after-scroll-roundtrip.png` — the clean intersection-park resume
- `RA-blob-orbit-rest-series.png` — resting satellite cycle (+ dock occlusion)
- `RA-blob-static-dots.png` — the static register as rendered
