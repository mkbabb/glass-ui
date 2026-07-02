# BG.W-GLASS-BLUR-PEER — DELTA (dual-engine paint judgement)

**Verdict: PASS** — non-authoring dual-engine paint. The 8px-peer-locked glass blur
register (the 5-rung glass ladder + the dock `--dock-surface-blur`) reads correct on
BOTH engines (Chrome/Metal + Safari/WebKit) in BOTH modes.

- Wave: `BG.W-GLASS-BLUR-PEER` (the UNIFY seed) · class F2 UNIFY-seed · commit `cd9ce46`
  (live-π sync `353eac5d`), verified at HEAD `c4ee7d6b`.
- Judge role: NON-AUTHORING paint judge (did not build; judged painted truth against criteria).
- Method: the proven C18 pipeline — `demo:dist:build` + `demo:dist:serve` on `:5200`
  (BUILT bytes), `?capture=<route>&mode=<m>` boot, poll `data-capture-ready`.
  - Chrome leg: CDP `connectOverCDP(:9456)` to real `Chrome.app` (non-headless),
    `newContext({viewport:1440×900, deviceScaleFactor:2, colorScheme})`, GL_RENDERER probe
    + computed-blur DOM probe + `page.screenshot`.
    Provenance: **ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)**.
  - Safari leg: off-screen `WKWebView` via `/tmp/wkshot-live` (system WebKit.framework/Metal,
    no TCC). Provenance: **WEBKIT / Apple GPU** (badge-decoded).
- Engine badge decoded top-left on every PNG for provenance (ENGINE / GPU / VIEW / MODE).

## Routes captured

1. `/foundations/paper-glass` — the 5-rung glass ladder (wash · quiet · resting · floating · overlay).
2. `/dock/overview` — the GlassDock walkthrough over the DockStage field (`--dock-surface-blur`).

## Capture inventory (all resolve on disk, 2880×1800 = 1440×900 @2x)

| slug | engine | mode | png |
|------|--------|------|-----|
| glass ladder | Chrome | light | `BG.W-GLASS-BLUR-PEER-paint/glass-ladder-chrome-light-desktop.png` |
| glass ladder | Chrome | dark  | `BG.W-GLASS-BLUR-PEER-paint/glass-ladder-chrome-dark-desktop.png` |
| glass ladder | Safari | light | `BG.W-GLASS-BLUR-PEER-paint/glass-ladder-safari-light-desktop.png` |
| glass ladder | Safari | dark  | `BG.W-GLASS-BLUR-PEER-paint/glass-ladder-safari-dark-desktop.png` |
| dock overview | Chrome | light | `BG.W-GLASS-BLUR-PEER-paint/dock-chrome-light-desktop.png` |
| dock overview | Chrome | dark  | `BG.W-GLASS-BLUR-PEER-paint/dock-chrome-dark-desktop.png` |
| dock overview | Safari | light | `BG.W-GLASS-BLUR-PEER-paint/dock-safari-light-desktop.png` |
| dock overview | Safari | dark  | `BG.W-GLASS-BLUR-PEER-paint/dock-safari-dark-desktop.png` |

Chrome probe JSON: `BG.W-GLASS-BLUR-PEER-paint/chrome-results.json`.
Capture scripts: `BG.W-GLASS-BLUR-PEER-DELTA-chrome-capture.mjs` (Chrome leg) + `/tmp/wkshot-live` (Safari leg, from `docs/tranches/BG/audit/wkshot-live.m`).

## Computed-DOM truth (Chrome getComputedStyle, both modes)

The 8px-peer-lock resolves exactly at the primitive level (`--glass-level: 1`):

| tier | radius primitive | composed backdrop-filter (light) | composed (dark) |
|------|------------------|----------------------------------|-----------------|
| wash     | `1px`  | `blur(1px) saturate(1.4)`                   | `blur(1px) saturate(1.35) brightness(1.18)` |
| **quiet**   | **`8px`** | `blur(8px) saturate(1.4) brightness(1.02)` | `blur(8px) saturate(1.35) brightness(1.16)` |
| **resting** | **`8px`** | `blur(8px) saturate(1.4)`                | `blur(8px) saturate(1.3) brightness(1.14)`  |
| floating | `13px` | `blur(13px) saturate(1.6)`                  | `blur(13px) saturate(1.28) brightness(1.1)` |
| overlay  | `20px`* | (20px @2dppx restore arm)                  | (@2dppx restore arm) |

\* overlay radius base is 13px; the `@media (min-resolution: 2dppx)` restore arm (light-dark.css)
lifts it to 20px at the capture's `deviceScaleFactor: 2` — documented, expected.

**The PEER**: `quiet` and `resting` both resolve **8px** — the unified material.
**The DOCK**: every painted `.glass-dock` surface (vertical rail + all horizontal pills)
resolves `backdrop-filter: blur(8px) …`, i.e. `--dock-surface-blur: var(--glass-blur-resting)`
paints the unified 8px resting material. Confirmed on 11–12 live painted glass surfaces per route.

## Painted-truth judgement

- **5-rung glass ladder (both engines, both modes).** The paper-grain backdrop reads THROUGH
  the plate at every tier: wash is crispest (structure fully legible), quiet/resting soften it a
  hair (8px — the peer), floating is the most diffuse (13px). quiet and resting read as one blur
  register distinguished only by tint/opacity — the intended peer-lock. Every tier reads
  unmistakably as frosted glass; none collapses to an opaque slab. The criteria's "backdrop
  structure reads a hair more through the plate while still unmistakably glass" is SATISFIED —
  8px lets the grain structure read through the lower ladder while the plates stay unambiguously glass.
- **Dark register (both engines).** The luminous transmissive dark material: the warm-cream glass
  glows where the paper grain passes; tier progression preserved. No occluded/dead-void plate.
- **Dock (both engines, both modes).** The dock pills (collapsible circle, media-transport pill,
  bottom nav) frost the DockStage field behind them at the unified 8px — the field reads through
  softly, the pill is unmistakably glass. Dark dock carries the luminosity lift; no over-blur, no
  loss of the backdrop.
- **Cross-engine parity.** Chrome/Metal and Safari/WebKit render the same tier progression, the
  same peer-lock, the same dock frosting. Safari renders the underlying paper grain a touch crisper
  (WebKit `paper-grain-overlay`); no register divergence.
- **Ambient roster checks.** Grain calm (no disco pop); the "Paper & Glass" display hero fits its
  envelope; the DockStage field is a recessive calm wash (no conic banding, no oversaturation).

## Gate/paint pointer (verbatim from cursor)

`cd9ce46` (live-π sync `353eac5d`) · `proof:glass-cal` 8px-peer-lock GREEN.
`--dock-surface-blur` on disk (0.7's + 3.5's input). Paint owed at its own close — now PAID.

## Fable PASS (non-authoring)

Filed: dual-engine paint judgement PASS. All 8 capture PNGs resolve on disk; the computed 8px
peer-lock + the dock `blur(8px)` peer verified in the DOM; the painted glass reads correct in
both modes on both engines. No defects.
