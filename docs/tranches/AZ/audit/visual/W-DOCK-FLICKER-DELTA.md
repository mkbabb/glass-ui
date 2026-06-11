<!-- surface-paths: src/styles/dock/morph.css,src/components/custom/dock/composables/useDockState.ts -->
<!-- surface-hash: 45fd496842beaae8c6bbabc9ea739292d78aa5622b0f22954fba739ca8fc4644 -->

# AZ.W-DOCK-FLICKER — DELTA: the collapse-onset scale pop + FLIP thrash, killed

The user reported "flashing AND flickering when at the edge" of a collapsing dock
(R3-3). The fleet's C2 grounding traced it to ONE paint-order mechanism, not a
state-machine thrash. This wave kills BOTH phenomena and binds the fix with a
born-RED gate (`proof:dock-no-scale-pop`) whose live arm replays the C2 capture
methodology with a REAL cursor (so CSS `:hover` genuinely engages — the
`.collapsed:hover` scale needs it; a synthetic `dispatchEvent` never sets `:hover`,
so the pop would never paint).

## Own-surface captures (the expanded collapsible dock — `/dock/overview`)

- `W-DOCK-FLICKER-dock-light.png` — the `data-testid="dock-capture"` glass dock,
  expanded, light (1134×268 @2×).
- `W-DOCK-FLICKER-dock-dark.png` — the same dock, dark.

Paired against the baseline `../ground/C2-collapse-onset-pop.png` (the captured flash).

## The mechanism (C2-2, confirmed at HEAD)

`.glass-dock.collapsed:hover { scale: var(--dock-collapsed-hover-scale) /* 1.1 */ }`
(morph.css) was UNGUARDED. The `.collapsed` class flips on SYNCHRONOUSLY when a
hovered dock begins collapsing, but the box is still painted at EXPANDED width for
the morph's leading frames (the `onSwap` pin + 1-rAF measure-defer in
`dockMorphContext.ts`). The +1.1 hover lift — designed for the 54px resting circle —
multiplied that transient ~535px box, painting a ±24-34px right-edge POP (the
"flashing"). And because the `@mouseenter`/`@mouseleave` listeners sit on the
MORPHING `.glass-dock` root with NO hysteresis (D5-7), the moving box edge
re-crossing the static cursor re-fired enter↔leave (the "flickering").

## The fix

1. **Scope the SCALE arm to `:not([data-morphing])`** (morph.css) — the +1.1 lift
   applies ONLY at rest (the box is the 54px circle then); during `[data-morphing]`
   the hover scale is inert. Mirrors the shipped `--dock-expand-t` `[data-morphing]`
   precedent (morph.css). The surface arms (bg/border/shadow) stay on the bare
   `:hover` (they don't multiply geometry, so a hovered collapse keeps its hover read
   without the pop).
2. **Hover HYSTERESIS in `useDockState`** — an INTENT-DWELL (60ms) on `onMouseEnter`
   (a sweeping-edge enter is canceled by the chasing leave before it commits the
   expand) + a MORPHING-EDGE-SWEEP geometry recheck on `onMouseLeave` (a leave whose
   pointer is still inside the box near a moving edge mid-morph is the edge sweeping,
   not a real exit — it does not collapse-thrash). At REST every leave is genuine and
   collapses; the recheck targets ONLY the FLIP-thrash window.

## The π binding DELTA — collapse-onset SCALE-POP trace (W3, the "flashing")

The W3 observable is the SCALE on the still-wide collapsing box (`e=0`, `mt<=0.5`),
read directly — frame-drop immune (a headless frame drop legitimately moves the
shrinking box a lot, which a raw inter-frame right-edge delta would false-flag, the
F2 wrong-observable trap inverted). The right-edge ±24-34px jump is its visible
consequence.

| frame | w | right | e | --dock-morph-t | scale | note |
|---|---|---|---|---|---|---|
| **BEFORE** (C2 baseline, `ground/C2-morph-flicker-trace.json`) | | | | | | |
| t=4139.1 | 487.0 | 924.5 | 1 | 0.000 | 1 | hovered, expanded |
| t=4149.1 | 535.7 | **948.8** | 0 | 0.000 | **1.1** | `.collapsed` on + `:hover` → scale 1.1 on the still-535px box → **+24.3px pop** |
| t=4192.2 | 535.7 | 948.8 | 0 | 0.000 | 1.1 | held (2 frames) |
| t=4194.8 | 467.3 | **914.7** | 0 | 0.046 | 1 | scale releases → **−34.1px snap-back** (the flash) |
| **AFTER** (this wave, `W-DOCK-FLICKER-after-trace-light.json`) | | | | | | |
| t=3209.3 | 487 | 1004.5 | 1 | 0.000 | 1 | hovered, expanded |
| t=3226.1 | 487 | 1004.5 | 0 | 0.000 | **1** | `.collapsed` on + `:hover` (`hov=1`) but scale GUARDED → **no inflation** |
| t=3267.5 | 467.1 | 994.6 | 0 | 0.046 | 1 | the box shrinks monotonically as `mt` advances |
| t=3297.9 | 326.3 | 924.2 | 0 | 0.371 | 1 | clean morph, no pop |

**BEFORE**: `sc=1.1` on the wide box at `mt=0` → the right edge pops +24.3px then
snaps back −34.1px. **AFTER**: `sc=1` across the entire onset (the guard holds even
though `:hover` is still true at the flip — `hov=1` at t=3226.1) → the right edge
settles monotonically, no ≥10px geometric pop.

Live readback (real-mouse, both modes):
- light: 114 early-collapse frames, **maxScaleOnWideBox = 1** (ceil 1.02), collapse reached.
- dark: 110 early-collapse frames, **maxScaleOnWideBox = 1**, collapse reached.

## The no-FLIP-THRASH record (W4, the "flickering")

A sustained cursor-at-collapsing-edge trace (the real cursor held at the settling
right edge across the collapse) shows the dock settling to ONE state:
- light: 146 frames, **1 expanded↔collapsed transition** (the single clean collapse; budget ≤2).
- dark: 149 frames, **1 transition**.

No enter/leave re-fire oscillation — the intent-dwell + edge-sweep recheck suppress
the moving-edge re-cross.

## Born-RED witness (the gate is load-bearing)

- **Source** (HEAD): W1 RED (bare `.collapsed:hover` scale, no `:not([data-morphing])`)
  + W2 RED (no `getBoundingClientRect` recheck, no intent dwell — pure timer).
- **Live** (HEAD `morph.css`, real-mouse replay): **W3 RED — the SCALE reached 1.1
  on the still-wide collapsing box** (max early-window right-edge jump 65.8px). The
  exact C2 pop, faithfully reproduced.
- **C2 baseline self-test** (every run): the committed 561-frame C2 trace is replayed
  through the W3 scale-pop detector and FLAGS scale 1.1 / 54.6px — the RED-witness
  inverse proves the detector bites.

Gate artefact: `W-DOCK-FLICKER-gate.json` (status `pass`; the device-free W1+W2
source arm + the C2 self-test + the live W3/W4 frame arm). After-traces:
`W-DOCK-FLICKER-after-trace-{light,dark}.json`.

The user's "flashing" (W3) and "flickering" (W4) are both resolved on the collapsible
docks where the defect lived (`/dock/overview`, `/dock/layers`). The always-expanded
shell docks (BottomDock, SidebarDock) short-circuit the hover state machine and were
never on this seam.
