# RA-dock-anim — dock animations, REALITY audit (RealityB)

**Lane** RA-dock-anim · **Captured** 2026-06-09 against the live demo (`http://localhost:5199`,
branch `at-dock-convergence`) · **Method** headed Chromium (playwright) + CDP screencast
frame-series + same-clock rAF samplers; headless used only where noted (and discounted —
headless software rendering drops frames and distorts pacing). Throwaway scripts under
`/tmp`, cleaned up. NO source edits, NO git.

**The bar** "springy, iOS-like; the items fade/morph in lockstep with the shell."

## VERDICT — MIXED

- The **collapse↔expand morph on `/dock/overview` is genuinely excellent** — 120Hz-smooth
  steady-state, real spring character, entering items riding the shell edge in lockstep.
  The human eye AGREES with the W-DOCK1 `lag captured-ABSENT` verdict **on the expand
  direction**.
- The **collapse direction carries two visible blemishes** the W-DOCK1 instrument is
  structurally blind to: a one-frame hard cut-out of ALL content at collapse onset, and a
  −53% pill-width undershoot squash at collapse end.
- The **`/dock/layers` "crossfade + size FLIP" is BROKEN in painted reality** — a layer
  switch blanks the dock to an empty ~14px capsule for ~650ms, then the new layer pops in
  complete in ONE frame. Measured-green (the box glides 265→380 px), paints-broken — the
  exact headless-green/visually-broken class this tranche exists to kill. The switcher
  rail is additionally broken AT REST.
- Rail hover registers and the slider keep-open held contract verify cleanly live.

---

## §A — expand morph: springy-iOS CONFIRMED (the eye agrees with the instrument)

Captured headed at 120Hz (`/tmp` scripts; strip:
[`RA-dock-anim-expand-strip.png`](./RA-dock-anim-expand-strip.png), 13 frames, 0→205ms,
cycle-2 of a 4-cycle session on the `data-testid="dock-capture"` slider dock).

- **Pacing (steady-state, headed):** rAF deltas 8.3ms flat through the morph; repeat
  cycles 3 and 4 had **zero frames >24ms**. Dark mode identical (max Δ 11ms, 0/132
  janky). The spring sweeps 38→~400px in ~100ms, rings to 509px (`--dock-morph-t` peak
  1.045, +4.4%), settles at 488px by ~650ms. Real underdamped spring character — a
  subtle, classy overshoot. This IS the iOS register.
- **Lockstep (the chronic):** the strip shows content materializing AT the shell's leading
  edge as the aperture opens — speaker icon at 45ms, first slider track growing with the
  shell 56–100ms, second group fading in 114–155ms. Sampled on one clock: last entering
  child opacity 0.13 at morphT 0.37 → 1.00 at morphT 0.77 — the deliberate stagger,
  WITHIN the morph window. **No empty-shell-then-content-pop. No second clock.** The eye
  agrees with W-DOCK1 §A here.
- **Blemish (minor):** the collapsed-summary glyph does not crossfade — it SNAPS to the
  first entering child between two frames (opacity 1→0 in one frame at the class flip,
  both directions). At 45ms into a 150ms fast-arm it reads as a quick swap, not a defect,
  but Apple would crossfade the glyph.
- **First-expand-only stall:** the session's FIRST expand froze ~157ms mid-morph at
  morphT≈0.82 (shell held at 405px, then jumped to 502px — the visible overshoot ring was
  eaten). Never recurs on later cycles — a lazy-mount/first-style cost of the entering
  pane. A real first-impression blemish on a cold page, invisible to every repeat-cycle
  gate.

## §B — collapse morph: two visible defects the instrument verdict misses

Strips: [`RA-dock-anim-collapse-strip.png`](./RA-dock-anim-collapse-strip.png) (17 frames,
794→1168ms) and the onset zoom
[`RA-dock-anim-collapse-onset-hardcut.png`](./RA-dock-anim-collapse-onset-hardcut.png)
(frames 742→811ms).

1. **One-frame hard cut-out at collapse onset.** Frame N: full content (two sliders,
   icons, separator) in a 487px shell. Frame N+1: shell still ~487px, content GONE
   ENTIRELY. The summary glyph then fades in centered while the husk shrinks around it.
   W-DOCK1 §A records the trailing child as "N/A (clip) — opacity held at 1, concealed by
   the clip" — but that is NOT what paints: the content vanishes BEFORE the aperture
   moves, a hard cut, not a progressive clip-conceal. One to two frames of full-width
   EMPTY shell are visible at 60Hz. The shrink itself (487→39px in ~190ms with the glyph
   riding centered) reads fine.
2. **The −53% undershoot squash.** The same ±4.5% scalar ring that gives the expand its
   classy +21px overshoot extrapolates on collapse to `488 − 449×1.046 = 17.3px` — the
   38px resting pill squashes to LESS THAN HALF its width and re-inflates over ~170ms
   (captured: 39→17.3→19→30→34→38, the glyph itself visibly squeezed). Symmetric in
   PIXELS, wildly asymmetric in PROPORTION. The expand ring is sub-perceptual polish; the
   collapse ring is a cartoonish squeeze-pop on a 38px target. A SOTA morph would damp or
   clamp the collapse-side extrapolation.

Pacing on collapse is otherwise flawless (0 frames >24ms over 240 samples, headed).

## §C — `/dock/layers`: the crossfade + size FLIP DOES NOT PAINT (BROKEN)

The manifest claims "crossfade + size FLIP between layers". Three instruments, two engine
arms, all agree the painted truth is:

```
root pill (content 247px)
  → ~70ms: ALL content gone; the dock paints as an EMPTY ~14×55px capsule
  → ... ~650ms of empty capsule (the page text around it is fine)
  → ~740ms: the new layer pill POPS IN COMPLETE in ONE frame
```

- Evidence: [`RA-dock-anim-layers-blankout-320ms.png`](./RA-dock-anim-layers-blankout-320ms.png)
  (plain screenshot 320ms after a rail-tab click — BOTH layer-group docks on the page are
  empty capsules; they share the demo's `v-model:active` so both transition),
  [`RA-dock-anim-layers-drillin-strip.png`](./RA-dock-anim-layers-drillin-strip.png)
  (12-frame drill-in series), rest/settled pair
  [`RA-dock-anim-layers-rest.png`](./RA-dock-anim-layers-rest.png) /
  [`RA-dock-anim-layers-settled.png`](./RA-dock-anim-layers-settled.png).
- **Not a View-Transitions artifact:** reproduced byte-alike with
  `document.startViewTransition` DELETED before boot (the π specs' "readable arm") — trim
  scan: content 247px at t=0, ≤13px from 99ms, 1px through 734ms, 343px at 747ms. The
  ~650ms blank ≈ the `--spring-dock` settle: the shell's clip aperture appears to ride a
  degenerate/frozen FLIP for the whole spring while the stagger window releases only at
  spring end — the §F1/§F2 mis-seat class, now on the SHIPPED layer-switch path.
- **Measured-green, paints-broken:** my own rAF sampler read the group box gliding
  265×28→380×40 with maxΔ 15ms while the paint was an empty capsule — a box-geometry
  gate CANNOT see this defect. Neither W-DOCK1 (overview-only) nor the dock-animation-live
  spec (collapse↔expand only) covers the layer-switch surface at all.
- **Rapid switching** (6 clicks at 120ms): each click restarts the blank — the dock is an
  empty capsule for the entire interaction. By eye: broken.
- **The switcher rail is broken AT REST:**
  [`RA-dock-anim-layers-rail-broken-rest.png`](./RA-dock-anim-layers-rail-broken-rest.png)
  — the three rail tabs render as bare single LETTERS ("A", "L", "L"; no icons), stacked
  vertically, the outer two spilling OUTSIDE the glass capsule onto the page background.
  Reproduced across sessions. The "Figma-style switcher rail" claim does not paint.

## §D — `/dock/rail`: hover registers VERIFIED (with two calibration notes)

Live computed-style probe of the story rail's `.dock-icon-button`s
([`RA-dock-anim-rail-hover-tooltip.png`](./RA-dock-anim-rail-hover-tooltip.png)):

| state | bg | scale | specular (::before opacity) |
|---|---|---|---|
| rest (non-active) | transparent | 1 | **0** (the 19→0 rest-specular claim HOLDS) |
| hover (non-active) | glass 0.65α (resting tier) | **1.1** | **0.1** |
| active item (`aria-pressed` + `aria-current`) | glass 0.8α (floating tier) | 1 | **0.16** |
| press @60ms | oklab cross-fade in flight | 0.9998→ squish | 0.087 |

All three hover legs read on hover before click — the W45-TUNE claim is MEASURED-TRUE
live. Tooltip anchors cleanly beside the hovered button. Calibration notes: (1) over the
rail's own near-white substrate the hover bg leg is **sub-perceptual** — scale + tooltip
carry the visible affordance (the glass-on-glass legibility problem in miniature); (2)
hovering the ACTIVE item DROPS its fill 0.8α→0.65α — the hover register overrides the
active register, so the selected item dims on hover (a small register inversion).

## §E — dock-with-slider held contract: VERIFIED end-to-end live

`/compositions/dock-with-slider`, real pointer drag
([`RA-dock-anim-slider-held-middrag.png`](./RA-dock-anim-slider-held-middrag.png)):
mousedown on the thumb → dock root `data-held="true"` immediately + thumb halo animates
0→8px ring @0.15α; drag 140px BELOW the dock bounds → stays expanded + held; hold 900ms
past the collapse window → still held (idle-collapse suppressed); release → `data-held`
drops instantly, halo decays to the 4px/0.08 hover tier, dock re-collapses on its own
delay. Exactly as documented. Good.

## §F — mount state + an intermittent state-machine anomaly

- **Every collapsible dock on `/dock/overview` mounts `expanded`** and stays so untouched
  (probed 0/1/2/4s — class `expanded`, full width, morphT 0). The collapse↔expand
  choreography only exists after a pointer pass-over arms the idle timer. A fresh visitor
  sees no collapsed pills and no morph until they happen to mouse across a dock. Whether
  intended ("present the goods first") or not, the W-DOCK1 §F2 "expanded-class +
  collapsed-WIDTH degenerate mount" did NOT reproduce in any of my 7 sessions — what I see
  is expanded-class + expanded-width.
- **Intermittent parked-pointer collapse (observed once, unreproduced):** in ONE 4-cycle
  session, 3 of 4 expands auto-collapsed ~644ms after the hover with the pointer parked
  INSIDE the dock the whole time (proven by bbox minima + the cycle-2 screencast). Exact
  protocol replication (4 cycles), a dedicated 2.5s parked-pointer test, and 4 mid-morph
  re-hover trials all behaved correctly (expand ~40ms after hover; hold under parked
  pointer; collapse 644ms after leave). Filed as a real-but-rare interaction-order
  mis-seat in the same family as W-DOCK1 §F2 — worth a state-machine audit, not worth a
  red gate on this evidence.

## §G — the verdict vs W-DOCK1 "lag captured-ABSENT"

**The human eye agrees with the instrument exactly as far as the instrument looks, and no
further.** On hover-expand at `/dock/overview`: yes — one clock, one coherent glide,
items riding the shell, the trail IS the designed cascade. Captured-ABSENT stands there.
But the instrument's own table marks the collapse-direction child column "N/A (clip)" —
and that N/A is precisely where the visible defect lives (the §B hard cut-out). And no
instrument in the W-DOCK1/W-DOCK2 set drives the layer-switch surface, which is where the
dock animation story is currently BROKEN (§C). A verdict scoped to "the items-lag chronic
as a clock-desync on collapse↔expand" is honest; reading it as "dock animations are
SOTA" would be inflation.

## Captures (all own-surface, this lane)

| file | what |
|---|---|
| `RA-dock-anim-expand-strip.png` | 13-frame headed expand series, 0→205ms — the lockstep evidence |
| `RA-dock-anim-collapse-strip.png` | 17-frame collapse series incl. the 17px undershoot squash |
| `RA-dock-anim-collapse-onset-hardcut.png` | frames 742→811ms — full shell, content hard-cut to empty |
| `RA-dock-anim-layers-blankout-320ms.png` | both layer docks as empty capsules 320ms after a switch |
| `RA-dock-anim-layers-drillin-strip.png` | drill-in series — pill → capsule |
| `RA-dock-anim-layers-rest.png` / `-settled.png` | layer story before/after states |
| `RA-dock-anim-layers-rail-broken-rest.png` | switcher rail at rest — clipped letters spilling out of the glass |
| `RA-dock-anim-rail-hover-tooltip.png` | rail hover state + anchored tooltip |
| `RA-dock-anim-slider-held-middrag.png` | held dock + intensified thumb halo mid-drag |
| `RA-dock-anim-overview-light.png` / `-dark.png` | route statics, both themes |
| `RA-dock-anim-dark-expanded-zoom.png` | dark expanded dock zoom (post-morph) |

Repro: throwaway scripts (deleted after run) drove headed Chromium via the repo's
playwright; morph series via CDP `Page.startScreencast` + an in-page rAF sampler on one
`performance.now()` clock; layer blank-out reproduced with and without
`document.startViewTransition`.
