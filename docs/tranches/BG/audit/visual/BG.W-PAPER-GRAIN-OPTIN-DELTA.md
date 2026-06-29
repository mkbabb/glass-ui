# BG.W-PAPER-GRAIN-OPTIN — NON-AUTHORING dual-engine paint DELTA

**Wave:** BG.W-PAPER-GRAIN-OPTIN (cursor row 2.5, BG/WS1) · commit `3f200f1d`
**Verdict:** **PASS** (2026-06-29) — BUILT bytes on `:5200`, C18 `?capture=` harness, Chrome (CDP) + WebKit (off-screen WKWebView) × light + dark.
**Judge:** non-authoring (did not build the wave; verified the painted truth, not the builder's claim).

## What the wave does (under test)

1. RETIRES the universal `<PaperBackdrop class="fixed inset-0 -z-10">` shell mount from `demo/layout/AppShell.vue` — no full-page 0.22 grain plane rides over the whole page.
2. The recessive shell `<Aurora>` (BG.W-FIELD-AURORA, 2.2) is the page backdrop; grain is now **per-surface opt-in** (`paper-grain-overlay` / `<PaperBackdrop>`).
3. Sub-JND re-tune `--paper-grain-opacity` 0.22 → 0.21 (grain tokens stay intact).

## Criteria → painted truth

| Criterion | Result | Evidence |
|---|---|---|
| No universal grain wash over the page | **PASS** | DOM `universalGrainPlanes(.paper-underpaint.fixed full-viewport)` = **0** on all 4 routes, both engines. Objective: intro clean-field-region local std **0.011 (Chrome) / 0.0077 (Safari)** — smooth, no high-freq grain noise — vs an opt-in card-grain region std **0.145** (13× higher). Grain is CONTAINED to opt-in surfaces, ABSENT from the page background. |
| Opt-in surfaces read tactile-but-calm | **PASS** | `paper-grain-overlay` count: intro 11 · paper-glass 10 · math-paper 1 · aurora 0. `/compositions/math-paper` opt-in card paints the paper-grain + blueprint-grid reading tactile-but-calm with fully legible content (§3 eyebrow, headline, body, section rail) both engines. `/foundations/paper-glass` four glass-tier swatches each show the per-tier grain tooth, legible. |
| Recessive aurora is the clean field | **PASS** | `/substrates/aurora` field behind the hero is a smooth painterly gradient — std_L **0.021 (Chrome) / 0.011 (Safari)** = no conic/radial banding; mean HSL-sat **0.20** (recessive), maxima 0.61 (no oversaturation, no >0.9 vivid). Both modes. The vivid strip at page bottom is the studio's route-owned configurator-stage live preview (by-design, per W-ROUTE-TRANSITION DELTA-B), not a field leak. |
| Both modes | **PASS** | Light = warm-cream recessive field; dark = near-black luminous-dark recessive aurora (intro dark + aurora dark both correct, hero legible, fits envelope). `--paper-grain-opacity` resolves 0.21 (light) / 0.16 (dark arm). |
| Chrome + Safari | **PASS** | Engine badges decoded from pixels: **CHROME** GPU `ANGLE Metal Renderer Apple M5 Max` @1x · **WEBKIT** GPU `Apple GPU` @2x (2880×1800). Distinct real engines; structural parity. |
| Every capture PNG resolves on disk | **PASS** | 16/16 PNGs present (`pg-{chrome,safari}-{route}-{light,dark}.png`). |

## DOM probe (Chrome CDP, `pg-chrome-results.json`)

```
route                       grain(L/D)  univGrainPlanes  paperGrainOverlays  mainChildren  fieldCanvas
foundations/intro           .21 / .16   0                11                  3             1 (recessive shell field)
foundations/paper-glass     .21 / .16   0                10                  3             1
compositions/math-paper     .21 / .16   0                1                   3             1
substrates/aurora           .21 / .16   0                0                   3             2 (studio dual-instance, by-design)
```

`mainChildren=3` = the P4-F `<p sr-only aria-live>` scaffold child (reconciled in W-ROUTE-TRANSITION DELTA-A); the one-route-root invariant holds.

## Observation (not a defect of this wave)

The grain in WebKit renders slightly heavier than Chrome on the busy `glass-resting + paper-grain-overlay` section-preview cards (a cross-engine `mix-blend` characteristic of those specific cards). It reads tactile and legible in both engines and is NOT introduced by this wave — the wave only removed the universal mount and nudged 0.22→0.21. The canonical opt-in surfaces (math-paper, paper-glass swatches) read tactile-but-calm in both engines. No action.

## Capture artifacts

`docs/tranches/BG/audit/visual/route-transition-pipeline/`
- `pg-chrome-foundations-intro-{light,dark}.png` · `pg-safari-foundations-intro-{light,dark}.png`
- `pg-chrome-foundations-paper-glass-{light,dark}.png` · `pg-safari-foundations-paper-glass-{light,dark}.png`
- `pg-chrome-compositions-math-paper-{light,dark}.png` · `pg-safari-compositions-math-paper-{light,dark}.png`
- `pg-chrome-substrates-aurora-{light,dark}.png` · `pg-safari-substrates-aurora-{light,dark}.png`
- `pg-chrome-results.json` (DOM probe sidecar) · badge crops `badge-{chrome,safari}-*.png`

**Cursor:** PAINT-PENDING → **DONE**.
