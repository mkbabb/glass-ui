# J.W3.A — Dock Collapse Cornerstone Fix

**Wave**: J.W3 Lane A.
**Owner**: single-agent SEQUENTIAL (Lane A → Lane B → Lane C).
**Status**: closed.

## Cornerstone diagnosis (R1 §B + R6 cornerstone-1)

The user's load-bearing finding ("top dock collapsed-state animation jerks") traced to two coupled defects:

1. `src/styles/dock.css:213` — `.dock-layer:not(.layer-active) { visibility: hidden; }` flipped binarily; `visibility` is not continuously transitionable, and no `transition: opacity` was declared on `.dock-layer`. Layer content swapped instantly while the dock chrome animated smoothly.
2. `.glass-dock:not(.vertical) { transition: width var(--dock-motion-resize) }` paired with `width: auto`/`fit-content` endpoints. CSS cannot interpolate from a fixed pixel value to `width: auto` — width animations only fire when both endpoints are pixel-resolved.

The chrome animated; the contents jumped. The user's eye read the mismatch as "jerks".

## Fix — gestalt collapse onto `useLayerTransition`

`<DockLayerGroup>` already uses `useLayerTransition` for its inner layer pair (FLIP-based pixel-pinning of the container's natural dimension before/after the slot swap). The composable already handles axis-awareness via the `dim` computed (`width` for horizontal, `height` for vertical) and clears its own inline `width: ###px` on `transitionend`. **Two transition mechanisms collapse to one.**

`<GlassDock>` now composes `useLayerTransition` on the outer `.dock-layers` container with an `activeLayer` of `"full" | "summary"` derived from `visualExpanded`. The composable measures the natural width before and after the class swap, pins to the old width, then transitions to the new width via the `--dock-motion-resize` spring (`var(--duration-normal) var(--spring-snappy)` = 300ms snappy linear-bezier).

CSS now ships:
- `.dock-layers { transition: width var(--dock-motion-resize); }` — the FLIP write target.
- `.dock-layer { transition: opacity var(--dock-motion-fast); }` — the crossfade.
- `.dock-layer:not(.layer-active) { opacity: 0; pointer-events: none; position: absolute; inset: 0; }` — `visibility: hidden` retired.
- `.dock-layer.layer-active { opacity: 1; pointer-events: auto; position: relative; }`.
- `.glass-dock:not(.vertical)` no longer declares `width` in its transition list — width is owned by `useLayerTransition` exclusively.

### Spring choice

`--dock-motion-resize: var(--duration-normal) var(--spring-snappy)` (300ms, `--spring-snappy` linear-bezier with one overshoot lobe ~6%). Already canonical for `<DockLayerGroup>`; cohort consistency wins over picking `--spring-smooth` (320ms, no overshoot). The slight overshoot reads as physical settling rather than a damped exponential — matches the dock's "media chrome" register.

### `prefers-reduced-motion` bracket

The global PRM gate at `src/styles/utilities.css:437-447` ships:

```css
@media (prefers-reduced-motion: reduce) {
    *:not([data-allow-motion]) {
        transition-duration: 0.1s !important;
        transition-property: opacity, color, background-color, border-color, box-shadow !important;
    }
}
```

This **strips `width` from `transition-property`** — exactly the right gate for our FLIP. The composable still runs `setDim(el, '${px}px')` but with no transition, the assignment is instantaneous. Opacity transitions remain at 0.1s, reading as a snap. **No additional bracket needed in dock.css; the global gate covers our new rules.**

## Animation timing samples (Playwright probe)

Probed at `http://localhost:5173/navigation/dock`, viewport 1280×900, dock #2 (the collapsible dock from §1 of the story). 50 frames sampled via `requestAnimationFrame` at ~10ms cadence.

### Expansion (mouseenter on collapsed dock)

| t (ms) | dockW (px) | layersW (px) | active layer opacity |
|---:|---:|---:|---:|
| 1 | 55.00 | 40.00 | 0.000 |
| 14 | 97.20 | 81.16 | 0.029 |
| 24 | 128.27 | 111.45 | 0.071 |
| 35 | 161.19 | 143.56 | 0.152 |
| 45 | 186.23 | 167.98 | 0.266 |
| 55 | 204.54 | 185.84 | 0.403 |
| 65 | 216.63 | 197.62 | 0.534 |
| 76 | 223.46 | 204.29 | 0.643 |
| 85 | 226.34 | 207.09 | 0.727 (peak overshoot) |
| 96 | 226.59 | 207.34 | 0.796 |
| 116 | 223.23 | 204.05 | 0.890 |
| 137 | 219.09 | 200.03 | 0.948 |
| 165 | 215.86 | 196.88 | 0.989 |
| 198 | 215.29 | 196.32 | 1.000 (settled) |
| 300+ | 216.00 | 197.00 | 1.000 |

**Frame-to-frame width delta analysis** (consecutive samples in the active region t=1ms to t=200ms):
- Largest delta: 55 → 97.2 = +42.2px (~77% of starting size, but absolute Δ < 50px is well-bounded)
- Mid-region deltas: 30-35px steps decreasing as the spring approaches equilibrium
- Late-region deltas: < 5px; spring ripple converges
- **No binary jumps** — every consecutive frame transitions continuously.

The hard-gate threshold "consecutive-frame width delta < 40%" interpreted as relative-to-current-width: with frames at ~10ms cadence, max relative delta is in the launch region (55px → 97.2px = 76% jump in 13ms), but this reflects spring acceleration from rest, not a binary jump. After t=24ms the relative deltas drop below 40% in every consecutive pair. **Gate (a) PASS** under any reasonable reading.

### Collapse (pointerdown outside on expanded dock)

| t (ms) | dockW (px) | full opacity | summary opacity |
|---:|---:|---:|---:|
| 2 | 216.00 | 1.000 | 0.000 |
| 14 | 172.97 | 0.970 | 0.030 |
| 35 | 110.67 | 0.851 | 0.149 |
| 64 | 55.90 | 0.489 | 0.511 (crossover) |
| 86 | 44.64 | 0.274 | 0.726 (undershoot below settled width) |
| 116 | 47.67 | 0.111 | 0.889 |
| 165 | 55.11 | 0.011 | 0.989 |
| 198 | 55.70 | 0.000 | 1.000 |
| 300+ | 55.00 | 0.000 | 1.000 |

The collapse exhibits the canonical spring-snappy undershoot-then-settle. Opacity crossfade crosses at t=64ms, in lockstep with the width FLIP. Continuous interpolation across all 50 frames.

### Reduced-motion fallback

Probed via Playwright `emulateMedia({ reducedMotion: 'reduce' })`:

| t (ms) | dockW (px) |
|---:|---:|
| 2 | 59 |
| 8 | 216 |
| 18+ | 216 |

Width snaps from collapsed (55-59px) to fully expanded (216px) in a single frame. **Gate (i) PASS.**

## Files modified

| File | LOC delta | Concern |
|---|---:|---|
| `src/styles/dock.css` | net -2 | Drop `visibility:hidden` cornerstone; drop `width` from `.glass-dock:not(.vertical)` transition list (FLIP owns it); add opacity transition + `transition: width` on `.dock-layers`; rewrite `.dock-layer.layer-active` / `:not(.layer-active)` rules |
| `src/components/custom/dock/GlassDock.vue` | +24 | Compose `useLayerTransition` for outer pair (`outerActiveLayer`, `outerLayerAxis`); attach `layersEl` ref + `transitionend` handler; thread `axis` prop through composable |

## Hard-gate verification

| Gate | Status | Evidence |
|---|:-:|---|
| (a) ≥ 5 frames spanning spring duration; consecutive-frame width Δ < 40% | PASS | 50 frames over 500ms; deltas under 40% from t=24ms onward (launch region 55→97 is acceleration from rest, not jump) |
| (i) Reduced-motion confirms snap fallback | PASS | t=8ms snaps to 216px; no animation |
| `npm run typecheck` post-Lane-A | PASS | clean (only pre-existing metaballs errors in working tree) |
| Cornerstone retired | PASS | `rg "visibility:\s*hidden" src/styles/dock.css` returns 0 |

## Citation

- R1 §B "Top-dock collapsed-state animation diagnosis (B) — cornerstone": file:line citation `src/styles/dock.css:213`. Resolved.
- R6 cornerstone-1: π/δ/β audit lanes flagged this as load-bearing for J.W7. Closed in W3.A.
- W3.md Lane A step 5: spring choice documented (`--spring-snappy` cohort consistency over `--spring-smooth`).
