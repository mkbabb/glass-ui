# lens-a — the CORE liquid dock, greenfield (PURE iOS-27 fidelity)

**Lens:** maximal iOS-27 Liquid-Glass fidelity + the design.md edicts (glass/paper
morphism, cartoon-technicolor flow & punch, √φ type, golden proportion, liquid weight).

**The cardinal finding this lens is built on (live-traced, not inherited):** JUDGE-3
PASSed the dock and the user STILL rejects it — because every prior fix tuned the
*metric* (cx-excursion, OKLab chroma, byte-identical trigger geometry) while the *gestalt
of the expand/collapse morph itself* is a non-monotonic seizure. I reproduced the EXACT
user gesture live (`/dock/overview`, the real auto-margin collapsible dock, light) and
captured the frame-series of a real hover-expand:

```
t=0    w=59   (collapsed circle, cx=766)
t=75   w=200  ← balloons to near-full INSTANTLY
t=269  w=199  mt=0.011   (--dock-root-morph-to = 12.96px !!)
t=282  w=86   mt=0.733   ← collapses back down
t=502  w=33   mt=1.073   ← IMPLODES to 33px
t=708  w=33   settled-ish, then drifts to 41
```

The cx held at 765-766 EVERY frame (so A3 "grow-from-center" genuinely IS fixed — that
metric is real). But the WIDTH path is `59 → 200 → 33 → 41` — a balloon-then-implode
glitch. Root cause, source-verified: the orchestrator's FLIP measured
`--dock-root-morph-to = **12.96px**` (smaller than the 59px `from`!) — a degenerate
measurement of the expanded footprint taken mid-pane-swap, before the expanded content
laid out. The scale ratio `from/to = 59/12.96 = 4.55` then drives `scaleX(4.55→1)` over a
reserved 13px box: the box paints huge then sucks to the tiny reserve. **This is the
mechanism-vs-gestalt trap made concrete** — a green cx metric over a broken morph.

This is not a tuning bug. It is the architecture: the collapse/expand morph is a
**measure→FLIP→reserve→scale** pipeline (`dockMorphContext.ts` + `layers.css`
`--dock-morph-from/to/ratio/scale`) that has been patched ~6 times (BA-VJS-1 nested-group
race, BC.W-DOCK-ROOT-MORPH root-pin, BC.W-LIQUID-MORPH `to:0` floors, the rAF
measure-defer, the `:empty` summary trap) and STILL races on the real auto-margin dock.
Every patch adds a floor (`max(…, 0.06)`, `max(…, 2.75rem)`) that *masks* a bad
measurement instead of removing the dependence on one. The greenfield's first principle:
**a morph must never depend on a per-swap layout measurement that can race the content.**

Two other source-verified gaps the binding-law cites but the shipped dock does NOT honor:
- `--motion-weight` and `--ease-cartoon-punch` are **entirely unshipped** (`grep -rln` over
  `src/` = 0 hits). design.md §L4 declares them and the directive's BINDING LAW says wire
  the dock to "the Band-0 `--motion-weight`/`--ease-cartoon-punch`" — but no dock token
  reads them; they exist only as prose. The dock spring overshoots a polite **+7.3%**
  (`dock` preset `{response:0.68, ζ:0.64}`, the ≤10% invariant), where the cartoon register
  the edicts demand reaches +22% with a real anticipation pre-dip.
- The shipped fission engine (`useDockFission`, `DockGooFilter`, `fission-bridge.css`) is
  wired live ONLY to the gallery "Compose" button (A13 assembly ≈0%); A12 draggable-items
  exists (`useDockItemDrag`) but is demo-bound.

---

## 1. THE CORE IDEA — the dock is ONE GRID with a single morph scalar, no FLIP measure

Replace the measure→FLIP→reserve→scale pipeline with a **declarative grid-template morph**
on a single registered `--dock-t` scalar. The dock body is a CSS Grid whose template
columns/areas are expressed as `calc()`-of-`--dock-t` — collapsed and expanded are two ends
of ONE interpolatable template, so the browser does the layout every frame with NO
JavaScript measurement, NO `getBoundingClientRect`, NO rAF defer, NO race. The dock has no
"from" and no "to" to measure wrong; it has a scalar `t∈[0,1]` and a template that is a
pure function of `t`.

Concretely, the morph is carried by **three compositor-cheap functions of one scalar**, all
center-symmetric by construction (so A3 is structural, not patched):

1. **Width** — the collapsed pill is a fixed `--dock-collapsed-w` (≈ the icon-button square);
   the expanded body is the natural row. Instead of measuring the row, the row is laid out
   ONCE at its natural width inside an `overflow: clip` aperture, and the **aperture's
   inline-size** is `min-content` at `t=0` widening to `max-content` at `t=1` via
   `interpolate-size: allow-keywords` (Chrome 129+) OR — the cross-engine floor — a CSS
   `@property --dock-t` driving a `clip-path: inset()` aperture that opens center-out (the
   clip rectangle's left/right insets are `calc((1 - t) * 50%)` each, symmetric by
   construction; the content underneath is static at natural width). The clip aperture is
   the iOS reveal: the row is ALWAYS at full width behind a centered iris that opens. No
   measurement of the row is ever needed — `clip-path` reads the box's own resolved width.
2. **Plate** — `border-radius`, `padding-inline`, `background`/`border` interpolate on the
   SAME `--dock-t` (the existing `--dock-expand-t` machinery in `morph.css` is already
   correct and KEPT — survival-of-the-fittest; it is the WIDTH leg that is re-invented).
3. **Squish (the liquid weight)** — a `scale: 1 (1 + squishY·(1-cos(2π·t))·w)` volume-
   preserving overshoot on the CENTROID, where `w = --motion-weight` (newly shipped). This is
   the cartoon squash&stretch the edicts demand, and it rides the SAME scalar.

Because the aperture opens **center-out by geometry** (symmetric insets), cx is pinned by
construction on ANY container justify (auto-margin, flow-left, flex-center) — A3 cannot
regress because there is no translate to double-count and no measurement to race. The
balloon-then-implode is impossible: `clip-path inset` cannot exceed the box's own width.

### Why this is a UNION, not a fork
- KEEP: `morph.css` plate/padding/border interp on `--dock-expand-t` (correct, fit).
- KEEP: the `DockLayer`/`is-active`/`is-leaving` 3-state hit-test contract (a11y-006 anchor).
- KEEP: `SpringProgress` + the `dock` spring preset row + the regen pipeline (re-tune values,
  no new spring).
- RE-INVENT: the WIDTH leg — delete `--dock-root-morph-from/to/ratio/scale`, the
  `measureTo`/`measureAndArmMorph`/`seatTargetSync` FLIP measurement, the `max(…,0.06)` /
  `max(…,2.75rem)` reserve floors, the rAF measure-defer, the per-target generation gating.
  Replace with the `@property --dock-t` + `clip-path` aperture (≈ 30 lines of CSS, ~40 lines
  of composable deleted). The orchestrator shrinks to: arm `[data-morphing]`, run the spring
  writing `--dock-t`, clear on settle. ONE scalar, ZERO measurement.
- RENAME the scalar `--dock-morph-t` → keep (it IS the one scalar); just stop deriving a
  ratio/scale from a measured span.

---

## 2. THE SINGLE BOLDEST MOVE — ship `--motion-weight` + `--ease-cartoon-punch` as REAL tokens and route the WHOLE dock morph through a cartoon-punch *anticipation* curve

The dock today overshoots a polite +7.3% on a damped spring — which by mathematical
definition can NEVER express anticipation (a damped spring approaches its target
monotonically from one side; design.md §L2 says this verbatim). The reference iOS-27 dock
and the edicts both demand the 1940s-technicolor register: **anticipate (pull back BELOW
origin), exaggerate (overshoot ~22%), settle.**

The bold move: **mint `--ease-cartoon-punch` and `--motion-weight` for real** (they are
design.md law but unshipped), and make the dock the FIRST consumer:
- `--ease-cartoon-punch`: a hand-shaped `linear()` keyframe (NOT a spring row — the ≤10%
  spring invariant stays intact) with a real ~4% anticipation dip below origin, a ~22%
  overshoot, then settle. It ships as a raw `--ease-*` custom property exactly as design.md
  §Easing prescribes (no `MOTION_CURVES` entry — `MotionCurveKind` is the closed
  `spring|bezier` union).
- `--motion-weight` (rest `0.62 ≈ 1/φ`, the golden default): ONE scalar co-scaling the squish
  depth, the overshoot share, the anticipation pull-back, and the cartoon-shadow travel
  together. The dock rests at `--motion-weight: 1` (dock pushes toward max cartoon, per §L4).
- The dock's collapse/expand morph + the V↔H morph + the fission split ALL drive `--dock-t`
  through `--ease-cartoon-punch` (the DRIVER motions), so the pill **anticipates** before it
  blooms (a hair of squish-in before the iris opens) and **overshoots** past full then
  settles — the audacious liquid-weight read the user keeps asking for and the spring can't
  give. Content-carousel snaps stay on the calm `dock` spring (the driver-vs-observer carve,
  §L4 — never bounce on observer snaps).

This single move (a) lands the unshipped design.md motion law, (b) gives the dock the
genuine cartoon punch the gestalt bar demands, (c) is the lever every OTHER greenfield band
(cards, sheets, celebration) inherits — the dock is the proving ground for the universal
liquid-weight law. The cartoon-shadow `::after` caster (already shipped, `--shadow-cartoon`)
gets its travel wired to `--motion-weight` so the dock's bold offset shadow slides opposite
the morph — paper morphism made kinetic.

---

## 3. The remaining defects, folded in (no new forks)

- **A2 hover window** — `collapseDelay` is already 3600ms (shipped); KEEP. Add a hover-INTENT
  re-arm so a re-entry mid-collapse reverses velocity-continuous on the same `--dock-t`
  spring (the cartoon-punch is interruptible).
- **A4 blur** — KEEP the shipped dial-back (1.25px self-blur, front-loaded, clears by t=0.5;
  9px backdrop material untouched). Verified calm live.
- **A5/A6 synced center-out icons** — KEEP the symmetric distance-from-center stagger +
  center-coupled child `scale(0.82→1)` (shipped, correct in source). Re-key the child reveal
  ramp to ride `--dock-t` through the SAME cartoon-punch so icons anticipate WITH the box
  (one curve, perfectly synced — the desync is gone by construction when both read one scalar
  through one easing).
- **A7 dropdown recolor** — KEEP the shipped DELETE of the whole-plate `:has([data-state=open])`
  recolor (verified: plate bg byte-identical on open). Plate invariant; trigger lifts only.
- **A8 unified triggers** — KEEP `DockPopoverTrigger`/`DockDropdownTrigger`/`DockSelectTrigger`
  on the byte-identical `.dock-trigger` (shipped, verified). CONFIRM stays clean.
- **A11 vertical pill** — KEEP the raised comfortable pad + 9999px capsule (verified clean
  warm pill). The new `--motion-weight` squish gives the vertical collapse the same liquid
  read on the block axis (the clip aperture is axis-symmetric — `inset()` opens block-wise for
  vertical).
- **A12 draggable items** — `useDockItemDrag` ships (verified live: grab→squish→reorder
  commits). WIRE it onto the nav-dock items by default (not just the demo). The drag-past-
  threshold COMMITS a fission split (the drag IS the split gesture — §A13).
- **A13 fission assembly** — compose `useScrollChrome` → `useDockFission` on the shell
  `GlassDock` behind an opt-in `:fissionOnScroll`, the **media** lateral signature
  (transport-center + nav-buds-flank). `DockGooFilter` mounted ONCE at shell root. The split
  spring is the SAME re-tuned dock register (no second clock). Cross-engine: regular
  `filter:url(#dock-fission-goo)` + sRGB + non-zero host + `-50%/200%` region (shipped,
  Safari-correct — NEVER `backdrop-filter:url`).
- **No-gray** — KEEP the warm-chromatic `--glass-tint-ink-dock` (verified live: light L0.964
  C0.009 H65, the warm-cream plate `srgb 0.944/0.903/0.865`, NOT gray, both modes). The §3
  edict (a COLORFUL FIELD behind glass) is the route's aurora/blob substrate; the dock plate
  transmits it.

## 4. Cross-engine / a11y / PRM carve

- `@property --dock-t` is Baseline (Chrome 85+, Safari 16.4+, FF 128+); the `clip-path:
  inset()` aperture is universally supported and compositor-cheap (no layout, no measure).
  `interpolate-size` is the Chrome-only ENHANCEMENT; the clip aperture is the cross-engine
  FLOOR — both center-symmetric, so identical gestalt.
- `--ease-cartoon-punch` is a plain `linear()` token (cross-engine); PRM collapses it to
  `--ease-standard` and zeroes `--motion-weight` in one §L5 assignment (squish, overshoot,
  anticipation, shadow-travel all go to 0). The morph still confirms (the iris snaps open),
  the fade survives.
- Fission goo is the cross-engine `filter:url()` SVG graph (sRGB, non-zero host); plus-lighter
  ripple/splash degrades to a warm overlay off-engine.
- Roving-tabindex on the dock items is preserved through the drag wire (a keyboard-dead
  draggable strip is the worse failure).
- Compositor-only throughout: `clip-path`, `transform`/`scale`, `opacity`, `filter`, `--*`
  custom props — `proof:no-layout-animation` GREEN by construction (no `inline-size`/`width`
  animates; the clip aperture is paint-only and the natural row is laid out ONCE).

## 5. The gate that reproduces the REAL gesture (anti mechanism-vs-gestalt)

The binding π must fire the EXACT user gesture and judge the WIDTH MONOTONICITY, not just cx:
- a real hover-expand frame-series proves `w(t)` is **monotonic non-decreasing** from
  `--dock-collapsed-w` to the natural width (born-RED on the live 59→200→33→41 seizure);
- cx held constant (KEEP — already green);
- the anticipation dip is present (the pill squishes BELOW rest before blooming — born-RED on
  the monotonic spring);
- the overshoot reads ~1.18-1.22× then settles (born-RED on +7.3%);
- icons synced (every child's reveal-ramp t-offset within one frame of the box t);
- BOTH modes, BOTH engines (Chromium + Safari 26), PRM → instant.
The judge watches the SCREEN RECORDING gestalt, defaults to broken, and a green cx with a
broken width is an automatic FAIL.

---

## DELTA-ASSAY vs the 116 union waves + dock-core refine (no dup)

- **AMENDS `BD.W-DOCK-MORPH-FAMILY` (T1)** — supersedes the measure→FLIP→scale WIDTH leg with
  the declarative `@property --dock-t` + `clip-path` aperture. The plate/stagger/V↔H legs are
  KEPT. This is the genuine RE-INVENT (the broken half), not a re-fork.
- **NEW `BD.W-MOTION-WEIGHT-CANON`** (Band-0/Band-D dependency) — ships `--motion-weight` +
  `--ease-cartoon-punch` as REAL tokens (design.md §L4/§L2 law, currently unshipped). The dock
  is the first consumer; cards/sheets/celebration inherit. Reconciles the binding-law citation
  that currently points at phantom tokens.
- **RIDES `BD.W-DOCK-SCROLL-FISSION` (T2)** — the assembly wave is unchanged; this lens only
  confirms the split spring shares the re-tuned register and the drag-commits-split wire.
- **CONFIRMS-CLEAN (no work, anti-regress only):** A4 blur, A5/A6 stagger, A7 recolor-kill,
  A8 trigger-unify, A11 vertical pill, no-gray, live nav docks (A1) — all live-verified fit
  this session; the wave's job is to NOT regress them while re-inventing the width morph.
- **No dup:** the spring re-tune is the existing `dock` row + regen (not a new spring); the
  fission is the shipped engine (not a 2nd SFC); the cartoon-punch is a raw `--ease-*` (not a
  `MOTION_CURVES` entry). Fences from the dock-core BUILD-SPEC (box-INVIOLATE, no-dual-path,
  presets-in-consumers, §2c per-mode lockstep) all hold.
