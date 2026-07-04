# BH.W-MOTION-AXIS — dual-engine paint DELTA

**Wave:** `BH.W-MOTION-AXIS` (collapse the 7-boolean motion scatter → the single `Motion` axis `full|reduced|off`)
**Route set:** `/display/card` · `/navigation/tabs` · `/forms/slider` · `/containers/dialog`
**Judge:** non-authoring paint judge (did NOT build; verified painted truth against criteria)
**Date:** 2026-07-03
**Verdict:** **PASS**

---

## Provenance (badges decoded on-disk)

| Engine | GL_RENDERER / GPU | Viewport | Modes |
|--------|-------------------|----------|-------|
| Chrome (CDP) | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` | 1440×900 @2x (2880×1800px) | light · dark |
| Safari (WebKit, off-screen `/tmp/wkshot-live`) | `Apple GPU` | 1440×900 @2x (2880×1800px) | light · dark |

Top-left engine badge decoded on every capture: `ENGINE CHROME`/`WEBKIT`, `GPU …`, `VIEW 1440×900 @2x`, `MODE LIGHT`/`DARK`. Provenance verified per-PNG.

---

## Device-free gate

`proof:encapsulation` — `motion-axis` arm **GREEN** (exit 0):

```
motion-axis : GREEN (bool-props=0, motion-typed-missing=0, data-motion-missing=0,
              weight-off=true, PRM-clamp=true, kept-missing=0)
self-test   : OK — 55 synthetic sabotages handled (incl. motion-axis M1×2+M1-fence×2+M2+M3+M4+M5+M6+M-fence)
status: PASS
```

The seven-boolean scatter (`draggable`/`pressable`/`spring`/`liquidDrag`) is collapsed onto the ONE `motion` axis in SOURCE: props gone (M1), each of the 6 carriers declares `motion?: Motion` (M2) + binds `:data-motion` (M3), the resolver writes `--motion-weight: 0` on `off` (M4), PRM clamps a prop DOWN never up (M5), the kept gesture CONTRACTS (`keepDockOpen`/`dragDismiss`/`responsive`) survive as distinct props (M6).

---

## Computed DOM checks (CDP, real Chrome, both modes) — 12/12 PASS

The painted-truth predicates transcribed from `tests-visual/motion-axis.spec.ts`:

| # | Check | light | dark | Detail |
|---|-------|-------|------|--------|
| a | tab drag armed at **full** (default) | PASS | PASS | `.segmented-indicator` present, `.glass-drag-grabbable`=true, count=4 |
| b | tab drag **unbinds under PRM** (reduced) | PASS | PASS | `.glass-drag-grabbable`=false, PRM=true, strip still operable |
| c | slider **full register** — `--motion-weight` live | PASS | PASS | `.slider-range` present (×11), `--motion-weight`=0.618 (NOT 0) |
| d | card press **derives from interactivity** | PASS | PASS | 19 cards, 19 static, 0 spuriously `data-pressable` |
| e | dialog route paints + envelope fits | PASS | PASS | `main` children=2, triggers=42, horizontal overflow=0 |
| f | slider **functional under PRM** (motion off ≠ meaning off) | PASS | PASS | `.slider-range` present, PRM=true |

**The three-rung sweep verified:**
- **full** (default) — physics armed; tab drag grabbable; `--motion-weight` live (0.618); zero-delta no-op floor (no `data-motion` attr at full, by design — the resolver writes nothing at `full`).
- **reduced** (PRM) — JS gesture enrichment unbinds (drag drops `.glass-drag-grabbable`); the surface stays painted + operable (the same visual state `motion="reduced"` produces by construction).
- **off** — the `--motion-weight: 0` off-write mechanism is the M4 gate fact (the live scalar `useLiquidPress`/`useMorphField`/`useLiquidFlex` already read); the FUNCTIONAL interaction stays (click selects, drag-handle still dismisses).

**Capture-harness note (not a defect):** an initial dark-reduced run showed `grabbable=true PRM=false` — traced to the harness applying the `.dark` class via a **post-mount** runtime toggle (`?mode=dark` / `evaluate(classList.toggle)`), which does not re-run the resolver's `computed` (the resolver reads `matchMedia().matches` as a non-reactive snapshot at mount). Setting PRM + colorScheme on the **context before navigation** (the fresh-mount path) makes the reduced-unbind deterministic and correct in BOTH modes across 3 trials each (`grabbable=false PRM=true`, 3/3 light + 3/3 dark). The BUILT behavior — a component mounting under PRM=reduce — correctly unbinds the drag in both modes; the flicker was a test-sequencing artifact of a late class-toggle, not a build defect.

---

## Visual gestalt (pixel reads, both engines, both modes)

Every surface reads correct — recessive warm-cream/near-black aurora (no conic banding, no oversaturation), calm grain, hero fits its envelope, no horizontal overflow:

- **Card** (Chrome light · Safari dark) — the 5-tier glass ladder (wash/quiet/resting) reads as translucent glass; dark register is luminous-transmissive (L4 page, warm-amber plates); toggles show the dark legendre-violet `--primary`.
- **Tabs** (Chrome light · Chrome reduced-dark) — pill glass-quiet track + glass-floating selected indicator; drag gestalt documented; under reduced the strip stays painted + operable.
- **Slider** (Chrome light · Safari dark) — Volume/Balance/Range fills + the spectrum gradient track (red→violet→blue OKLCH shorter-hue walk, no chroma trough); `--motion-weight` carrier live.
- **Dialog** (Safari light) — glass trigger pills + the destructive red Delete button (correct saturated destructive register); confirm-dialog card.

---

## On-disk captures (all 20 resolve, valid PNG magic)

```
BH.W-MOTION-AXIS-assets/
  chrome-card-{light,dark}.png            safari-card-{light,dark}.png
  chrome-tabs-{light,dark}.png            safari-tabs-{light,dark}.png
  chrome-slider-{light,dark}.png          safari-slider-{light,dark}.png
  chrome-dialog-{light,dark}.png          safari-dialog-{light,dark}.png
  chrome-tabs-reduced-{light,dark}.png    (the PRM-degrade paint)
  chrome-slider-reduced-{light,dark}.png  (the PRM functional-survives paint)
```

Full paths under `docs/tranches/BG/audit/visual/BH.W-MOTION-AXIS-assets/`. Supporting harness + result JSON: `BH.W-MOTION-AXIS-chrome-capture.mjs`, `BH.W-MOTION-AXIS-checks.mjs`, `BH.W-MOTION-AXIS-probe.mjs`, `BH.W-MOTION-AXIS-assets/{chrome-results,motion-checks}.json`.

---

## Verdict

**PASS.** The collapsed 7-boolean motion scatter reads correctly on the single Motion axis across Card/Tab/Slider/Dialog in BOTH engines (Chrome ANGLE-Metal M5 Max + Safari WebKit Apple GPU) and BOTH modes: full paints coherently (physics armed, `--motion-weight` live), reduced degrades cleanly (JS enrichment unbinds, surface operable — the PRM=reduced clamp), and the off-rung `--motion-weight: 0` mechanism is source-locked (M4). `proof:encapsulation` motion-axis GREEN device-free; all 20 dual-engine capture PNGs resolve on disk. Fable non-authoring gestalt PASS.
