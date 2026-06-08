# AX.W01 — paired-π DELTA: dock single-scalar morph

**Wave** AX.W01 · **Base** `9f7b58c` · **Headline** one spring, one clock, the whole box.

This is the muster paired-π protocol (per AX.W00 CONVERGE fold d): the BEFORE (HEAD
lead/lag desync), the AFTER (co-temporal single-clock), and the DELTA. The
CODE-level BEFORE/AFTER is recorded here by the implement unit; the **live pixel
captures** (the ≥5-frame morph at ≥3 viewports, the fourier two-dock co-mount) are
the **orchestrator's** to run on the real device (a headless lane false-resolves the
very desync the wave exists to catch).

---

## BEFORE — the HEAD desync (the born-RED state)

At HEAD `9f7b58c` the dock morph runs on **three clocks**:

1. **Root CSS-transition** (`dock.css:326-340`) — `.glass-dock:not(.vertical)`
   transitions padding/transform/scale/border-radius on `--dock-motion-resize` AND
   background/border-color on `--dock-motion-standard` (a DIFFERENT duration + curve).
   Fires **synchronously** at the `visualExpanded` class flip.
2. **Inner `.dock-layers` width spring** (`useLayerTransition.ts:340,344,360`) — the
   FLIP fallback defers the layer-ref-swap + width-set through `nextTick →
   requestAnimationFrame → void offsetWidth`, pushing the inner width spring **one
   frame (~16ms) behind** the synchronous root transition.
3. **View-Transitions fork** (`useLayerTransition.ts:108,262-288`) — on the default
   Chrome engine `NATIVE_VT=true`; the FLIP path is dead, the morph runs as a VT
   crossfade of `.dock-layers` ONLY while the root box morphs on its own CSS clock.

**Observable defect:** the box chrome (padding/radius) leads the inner content by ~1
frame ("the box shrinks first, items lag"). The π-lane (`tests-visual/
dock-animation-live.spec.ts`) samples the dock-ROOT box geometry (bounding width +
`padding-inline` + `border-radius`) AND a representative child's opacity on ONE rAF
timeline and asserts onset lead/lag ≤ 1 frame — this **FAILS at HEAD** (the root box
leads). The no-harness path is **fail-CLOSED** (AX.W00), so it no longer false-greens.

**Live BEFORE capture (orchestrator):** `proof:dock-animation-live` live arm against
HEAD `9f7b58c` with the dev server up → expect RED (box-vs-child lead/lag > 1 frame).
Screenshot set: the ≥5-frame collapse↔expand morph at 3 viewports showing the box
ahead of its content.

---

## AFTER — the single-clock morph (the GREEN state)

ONE `SpringProgress` drives a normalized scalar `--dock-morph-t` (0→1) written
once/frame to the `.glass-dock` root. EVERY axis is a pure `calc()`/interpolation off
it:

- **box size** — `.dock-layers`/`.dock-layer-stack` `inline-size`/`block-size` =
  `calc(--dock-morph-from + (--dock-morph-to − --dock-morph-from) * --dock-morph-t)`
  (the FLIP from→to px measured ONCE per swap; the scalar interpolates), gated on the
  root `[data-morphing]`.
- **root chrome** — padding / background / border-color / shape-card radius
  interpolate off `--dock-expand-t` (the directional expanded-ness derived in CSS from
  `--dock-morph-t` + the synchronously-set `.expanded`/`.collapsed` class). NO root CSS
  transition on the morph props.
- **child stagger** — the active pane's children ramp opacity + rise off
  `--dock-expand-t` per-child onsets (gated on `[data-morphing]`).

Because all axes read ONE scalar written ONE place ONE time per frame, the box chrome
and the content are **co-temporal by construction** (lead/lag ≡ 0 frames). The VT
collapse fork is retired; the live ODE runs on every engine; velocity-continuity
(re-base on re-toggle) survives.

**Live AFTER capture (orchestrator):** `proof:dock-animation-live` live arm with the
dev server up → expect GREEN (box-vs-child lead/lag ≤ 1 frame; box rises ≥ 3 frames;
child opacity moves ≥ 3 frames). Screenshot set: the ≥5-frame morph at 3 viewports
showing box + children moving in lockstep.

---

## DELTA

| Axis | BEFORE (HEAD) | AFTER (W01) |
|---|---|---|
| Clocks | 3 (root CSS-transition ×2 curves + inner rAF spring + VT fork) | **1** (one SpringProgress scalar) |
| Box-vs-content lead/lag | ~1 frame (box leads) | **0 frames** (co-temporal) |
| Default-engine path | VT crossfade (rasterized pixels) | live spring (interruptible, retargetable) |
| `useLayerTransition.ts` | 479 lines | **218** (109 code) |
| Per-engine personality | yes (VT vs FLIP fork) | **none** (one path) |
| Route-morph `view-transition-name` | on `.dock-layers` (collapse mechanism) | on the dock **ROOT** (route-morph seam, preserved) |

---

## Live verify the ORCHESTRATOR must run (the visual-truth close)

The wave does NOT close on the numeric gates. The binding close criterion is an
EXECUTED live Playwright + frontend-design audit on the real device:

1. **`proof:dock-animation-live` (live arm).** Dev server up (`npm run dev`, vite
   :5173) → `npm run proof:dock-animation-live`. The deterministic-drive arm (forced
   FLIP via removed `startViewTransition` + real `page.hover`) samples the dock-root
   box geometry vs a representative child opacity on ONE rAF timeline and asserts
   lead/lag ≤ 1 frame on the DEFAULT engine. Born-RED at HEAD → GREEN after W01.
2. **frontend-design screenshot-diff** across the collapse↔expand morph (≥ 5 frames
   spanning the named duration, ≥ 3 viewports) confirming the box-chrome and the
   children move IN-STEP, no box-leads-content lag.
3. **frontend-design read** that the morph "reads as ONE continuous iOS spring" —
   overshoot, settle, interruptible retarget — identical on the DEFAULT engine, not a
   capability-gated second personality.
4. **fourier two-co-mounted-docks fixture** (CanvasControlsDock + EditorControlsDock)
   renders BOTH route-morphs with NO `view-transition-name` collision dropping a
   snapshot. (The `glass-dock-${useId()}` mint is app-scoped → distinct names; verify
   on the live π-lane.)

The numeric gates alone do NOT close the wave — only the executed live audit does.

---

## Pixel evidence

_Pending the orchestrator's live captures. Drop the BEFORE/AFTER ≥5-frame morph sets
+ the fourier two-dock co-mount render under the W00 visual-test workspace evidence
dir and reference the commit hashes in PROGRESS.md._
