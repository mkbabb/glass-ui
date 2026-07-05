# BG.W-LIQUID-WEIGHT-DEFAULT — dual-engine paint-judge DELTA

**Verdict: PASS** (re-judgment of the prior paint-FAIL; both decisive defects CLOSED in paint).
**Judge:** non-authoring paint judge, 2026-07-05 (re-run after the F5.2 repair commit `d40b86e4`).
**Engines:** Chrome 149.0.7827.201 (CDP, real GPU **ANGLE Metal Renderer: Apple M5 Max**) + Safari/WebKit (off-screen `wkshot`, real **Apple GPU** @2x) + Playwright WebKit (computed-cascade leg).
**Bytes:** BUILT `demo:dist` on `vite preview :5200` (NOT `:5199` dev, which bare-shells WebKit).
**Modes:** light + dark, both engines.
**Routes:** `/navigation/tabs`, `/dock/overview`, `/containers/dialog`, `/dock/morph-showcase`, the named π spec `tests-visual/liquid-weight-default.spec.ts`.
**Siblings tripwire:** `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).

---

## The prior FAIL had TWO decisive defects — both re-verified CLOSED

### (A) PRM re-alias cascade — FIXED, both engines, both modes

Prior FAIL: under `prefers-reduced-motion: reduce`, `:root --transition-liquid-spatial` still resolved the `--spring-smooth` `linear()` (overshoot survives) because the PRM re-alias lived in `scheme-motion.css` (imported FIRST) and lost the source-order cascade to `scheme-spring.css`'s base default (imported LAST). The fix relocated the PRM re-alias into `scheme-spring.css:277` (after the base default at line 152); `scheme-motion.css:392-399` now carries only a pointer comment.

**Live paint evidence (BUILT `:5200`):**

- **Chromium — named π spec `tests-visual/liquid-weight-default.spec.ts`: 10/10 PASS** (both modes). DEFAULT spatial leg = spring `linear()`; `.motion-calm` opts out to `cubic-bezier()`; **PRM snaps to `cubic-bezier()` (vestibular floor)** — the exact 2 tests that FAILED in the prior judgment now PASS.
- **WebKit — direct serialization read (`wk-serial.mjs`), byte-identical to Chromium:**
  - `reduce=false`: `transition-property: background-color, border-color, box-shadow, color, opacity, scale`; the scale (6th) leg timing = **`linear(0 0%, 0.09979 …, 1.01113 18.367%, 1.01507 20.408%, 1.01416 22.449%, …)`** — the SPRING with its overshoot stops (>1.0).
  - `reduce=true`: the **scale leg is REMOVED** from the property list; every remaining leg = `cubic-bezier(0.4, 0, 0.2, 1)` — **NO `linear()` anywhere** (the vestibular floor).
  - Root token flips correctly in WebKit: `--transition-liquid-spatial` = `linear(…)` at default → `cubic-bezier(.4,0,.2,1)` under reduce, `matchMedia(reduce).matches=true`.

> Method note: an early nested-host injected probe (`prm-webkit.mjs`) returned `"ease"` for the tail in WebKit — a probe-timing artifact (stale read on a fresh navigation). The direct `wk-serial.mjs` read + the chromium spec are authoritative and agree perfectly. **(A) PASS.**

### (B) dock-hover-press ROUGH→MATCHES — FIXED + BUTTERY

Prior FAIL: `useLiquidPress`/`springPreset('press')`/`--dock-press-t` was ABSENT on `DockIconButton` (the press stayed the CSS `:active` no-overshoot floor — the §2.8 ROUGH state). The fix wires `useLiquidPress({squish:true, response:0.2, ζ:0.8, pressVar:'--dock-press-t', shrinkDepth:0.04, maxStretch:1.03})` on `@pointerdown/up/cancel/leave` (`DockIconButton.vue:134-164`); `dock-controls/icon-button.css:20-93` registers `@property --dock-press-t` and couples it to `--glass-btn-press-t` (specular) + `filter: brightness(1 − t·0.04)`.

**Live gesture instrumentation on real Metal Chrome (`gesture-press2.mjs`, warmed steady-state, 5/5 runs consistent):**

| metric | result | bar | verdict |
|---|---|---|---|
| answer latency | **0.65–0.81 frames** (10.9–13.5ms) | ≤2 frames | PASS (iOS answer-immediately) |
| `--dock-press-t` drive peak | **1.015** (0→1 with +1.5% overshoot) | +1-2% alive rebound | PASS |
| reciprocal squish (deepest axis) | **0.9314** | visible deform | PASS |
| DOCK_SPRING fence | press uses `springPreset('press')` `{0.2,0.8}`, distinct from `dock` `{0.68,0.64}` (byte-frozen in `dock/constants.ts`) | untouched | PASS (R6′ fence held) |

The +1.5% "alive rebound" lands in the **drive** (`--dock-press-t` peaks 1.015) which couples to the specular gleam + brightness darken; the inline `scale` release-rebound is intentionally omitted below the engage threshold (the calmer no-box-pop register). **(B) PASS.**

---

## The FOUR verdict rows (Fable storybook sweep)

| # | row | evidence | verdict |
|---|---|---|---|
| 1 | tabs-indicator-glide | stretch peak scaleX **~1.13** (aspect ~1.17, anti-taffy capped — NOT ≥1.30); glide **337ms** ≤0.45s; both modes (`gesture-tabs.mjs`) | **MATCHES** |
| 2 | dock-hover-press | ROUGH→MATCHES; ≤2-frame answer (0.65–0.81), +1.5% rebound, DOCK_SPRING untouched | **MATCHES** |
| 3 | dialog-glass-reveal | glass dialog materializes over the dim modal scrim, settled correct, both modes (W-OVERLAY-ENTER-PAINT prerequisite intact) | **MATCHES** |
| 4 | dock-collapse-expand | **worstGlyphAspect 1.0000** across 142 frames (zero glyph-aspect distortion any frame — W-DOCK-GLYPH-RIGID holds); buttery | **MATCHES** |

## §5 fence — NO sheet/bloom/drawer surface gains overshoot — HELD

Only FOUR sites read `var(--transition-liquid-spatial)`: `utilities/base.css:212,283` (`.interactive-item`, `.tap-squish` scale legs) + `utilities/btn.css:279,303` (`btn-interactive`, `btn-pill` scale legs) — the base interactive atoms that SHOULD carry weight. NO sheet/drawer/bloom/dialog panel reads it; drawer keeps its own `--ease-out`/`DRAWER_SNAP {0.4,0.82}`. The inversion is scoped; no overshoot leaked. **PASS.**

## NO-MASKING-FALLBACK rider (§6 M13) — HELD

`var(--stretch,1)` / `--dock-press-t: 0` identity-rest is HONEST and the writers are LIVE, not dead-pinned: `--stretch` measured peaking ~1.13 during the tab glide, `--dock-press-t` measured driving 0→1.015 during the press. No dead squish writer pinning through a gesture. **PASS.**

## BUTTERY arm (USER 07-05) — per-gesture frame-cadence

Over the CDP rAF frame-series (a frame-series, not a scalar — D10 fence respected):

| gesture window | fps | max inter-frame gap | long frames >50ms | gaps >33ms | BUTTERY |
|---|---|---|---|---|---|
| hover-press (steady-state) | **120.0** | **10.4ms** | 0 | 0 | ✔ |
| dock expand | ~120 | **11.6ms** | 0 | 0 | ✔ |
| dock collapse | ~120 | **10.3ms** | 0 | 0 | ✔ |

**Felt-smoothness call (non-authoring judge): BUTTERY.** Steady-state dock gestures lock 120fps (ProMotion), max gap 10-12ms (well under the 33ms bar), zero long frames.

**Observation (not a defect):** the very first cold press after a fresh page load incurs a one-time ~50-76ms frame (JIT compile of the spring path + first `@property --dock-press-t` style recalc) — it does NOT recur (every 2nd+ press is <1 frame) and is not an in-gesture reflow-storm / backdrop-filter re-raster / spring-tick layout read (the buttery arm's localized-producer class). Recorded per the honesty floor; it does not fail the steady-state cadence bar.

---

## Dual-engine settled provenance (16 PNGs, badges decoded, all on disk)

| route | Chrome (ANGLE Metal M5 Max) | Safari (Apple GPU @2x 2880×1800) |
|---|---|---|
| /navigation/tabs | `BG.W-LIQUID-WEIGHT-DEFAULT/lwd-tabs-chrome-{light,dark}.png` | `…/lwd-tabs-safari-{light,dark}.png` |
| /dock/overview | `…/lwd-dockoverview-chrome-{light,dark}.png` | `…/lwd-dockoverview-safari-{light,dark}.png` |
| /containers/dialog | `…/lwd-dialog-chrome-{light,dark}.png` | `…/lwd-dialog-safari-{light,dark}.png` |
| /dock/morph-showcase | `…/lwd-morph-chrome-{light,dark}.png` | `…/lwd-morph-safari-{light,dark}.png` |

Settled visuals correct both engines both modes: recessive warm aurora (no conic banding / oversaturation), grain calm, hero fits its envelope, glass reads as glass (dark = luminous warm-brown transmissive material). Engine badges decode (CHROME/Metal, WEBKIT/Apple GPU) — provenance established.

**Gesture captures:** `…/lwd-tabs-glide-{light,dark}.png`, `…/lwd-dialog-reveal-{light,dark}.png`, `…/lwd-dialog-open-{light,dark}.png`, `…/lwd-dock-expanded-light.png`.

**All 23 capture PNGs resolve on disk, non-zero.** Capture drivers (in `docs/tranches/BG/audit/visual/BG.W-LIQUID-WEIGHT-DEFAULT/`): `cap-chrome.mjs`, `prm-webkit.mjs`, `wk-serial.mjs`, `gesture-press2.mjs`, `gesture-tabs.mjs`, `gesture-collapse.mjs`, `gesture-dialog.mjs`.

---

## Conclusion

Both decisive defects (A PRM cascade, B dock-hover-press) are CLOSED in paint, dual-engine, both modes. All four verdict rows MATCH; the §5 fence + NO-MASKING rider hold; the BUTTERY cadence arm passes at steady-state; DOCK_SPRING `{0.68,0.64}` byte-frozen. **0 BORKED. PASS → DONE.**
