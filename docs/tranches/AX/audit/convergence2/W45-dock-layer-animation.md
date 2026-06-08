# W45 — Dock layer animation: the one-clock crossfade (DK1/DK6/DK7 landed)

**Lane** AX.W45 DEV note · **Consumes** `R-dock-layer-anim.md §3.1/§3.2` (SOTA) +
`A-dock-layers-anim.md` (DK7 root cause) + `A-dock-collapse-timing.md` (DK1 root cause) ·
**Base** `c72d2ac`

The dock-layer animation was the headline DK-band lag. The SIZE morph was already SOTA (one
spring, FLIP, velocity-continuity on retarget — W01/W02). The lag was **opacity + visibility
running on a SECOND clock beside the spring** — the exact pathology W01/W02 excised for SIZE
but left for the crossfade. W45 finishes the single-scalar thesis for opacity.

## What landed (the one-clock crossfade)

### DK7 — the leaving pane fades on the scalar, not a CSS timer

The leaving pane used a fixed-duration `opacity var(--dock-motion-resize)` CSS transition
(0.3s × `--spring-dock` linear). The live `SpringProgress` settles its meaningful travel in
~0.18–0.25s (velocity-dependent; faster on an interrupted retarget). So the 0.3s opacity clock
LINGERED past the box settle — a ghost of the leaving pane sat over the settled box for ~0.1s
(the "laggy/delayed" read). The fix (the W01/W02 idiom extended):

```css
.glass-dock[data-morphing] .dock-layer.is-leaving,
.glass-dock[data-morphing] .dock-layer-item-host.is-leaving {
    opacity: calc(1 - var(--dock-morph-t));
}
```

The leaving opacity is now a pure FUNCTION of the same `--dock-morph-t` the box rides — an
interrupted/retargeted switch carries the crossfade WITH it (there is no second timer to drift).
The base `.dock-layer, .dock-layer-item-host` rule keeps ONLY the `visibility 0s linear
var(--duration-normal)` hold (the a11y-006 hit-test anchor — the leaving pane stays paintable +
untouchable through the fade, then flips hidden once the morph state clears on spring-settle).

### DK1 — the summary glyph reveals on the incoming-ness, front-loaded

The `--summary` pane is the INCOMING pane on collapse, but the shared stagger ramp reads the
box-directional `--dock-expand-t` (which runs 1→0 on collapse), so the collapsed glyph faded OUT
over the back half of the morph and popped in only at settle ("the shrunken icon does not appear
for a while"). The fix keys the summary pane's content reveal to the incoming-ness directly:

```css
.glass-dock[data-morphing] .dock-layer--summary {
    --dock-expand-t: var(--dock-morph-t);   /* 0→1 incoming reveal */
}
```

So the summary glyph ramps 0→1 as the box settles — appearing WITH the pill, no added delay. The
`--dock-expand-t` directional scalar stays the right driver for the box CHROME (bg/border/padding/
radius interpolate between the collapsed↔expanded endpoints); only the summary pane's CONTENT
reveal is decoupled onto the incoming scalar. The stagger WINDOW narrowed 0.55→0.4 (the last
detail child finishes at 0.80 of the morph, not 0.95 — the iOS front-loaded register). The
`#persistent` region front-loads the always-visible glyph structurally (it is never staggered).

### DK6 — layer switching is now first-class (one continuous spring)

Once the crossfade rides the scalar, the layer swap reads as ONE continuous spring — box +
entering-pane stagger + leaving-pane fade all on `--dock-morph-t` (the WWDC24 zoom shared-element
model: every axis on ONE spring). No second mechanism is needed; the clock fix unifies the swap
onto the spring the eye already tracks. The demo showcase (a first-class layer-switching section)
is a W06/W18 demo-IA deliverable — the library mechanism is complete here.

## What was NOT touched (the single-scalar discipline)

- `--spring-dock` (response 0.32, ζ 0.7, ~+4.6% overshoot) — the box-morph register is SOTA per
  R-dock-layer-anim §1.1/§2 (squarely between Apple's `.snappy` and the dock-magnify spring). NO
  retune.
- The `useLayerTransition` / `dockMorphContext` driver internals — the FLIP px-measurement, the
  velocity-continuity retarget, the per-target txId gating. The one-rAF measurement defer (root
  cause D in R-dock-layer-anim §2) is architecturally load-bearing (the shrink-wrap target only
  exists post-flush) and was left — the opacity-clock fix is the DOMINANT lag source per §3.1.
  The optional cached-source-measurement micro-tune (§3.4) is a deferred W01/W02 driver NOTE, not
  net-new.
- The dead `directionTypes` hint (a directional slide-from-left/right flourish) — left as a
  deferred driver NOTE per A-dock-layers-anim. The clock fix is the dominant DK7/DK6 remediation.

## Gate reconcile

`proof:dock-opacity-lockstep` asserted the OLD model (the base rule MUST carry `opacity
var(--dock-motion-resize)`) — that assertion WAS the DK7 second-clock bug, so the gate was
re-authored to a SAME-SCALAR match (the leaving pane fades on `calc(1 - --dock-morph-t)`; neither
base nor active carries an `opacity var(…)` CSS clock). `proof:dock-animation-live` (the
behavioral truth) stays GREEN — its leaving-child-opacity sampling now reads the scalar-driven
fade in lockstep (26 rising `--dock-morph-t` frames, 5 leaving-child moving frames, onset delta
0ms).

## Live arm (orchestrator-owned)

The π-lane verifies + tunes the magnitudes: DK1 (the collapsed glyph appears WITH the pill — rAF-
sample the summary glyph opacity vs `--dock-morph-t`, must ramp 0→1 not 1→0) + DK7 (a layer switch
+ a mid-flight re-toggle read smooth, no ghost). The clock is now ONE — if the switch still reads
slow after the live pass, the dials are the stagger window (0.4) and the spring response (0.32),
but there is no second timer to drift.
