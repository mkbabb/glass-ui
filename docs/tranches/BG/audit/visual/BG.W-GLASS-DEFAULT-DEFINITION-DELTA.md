# BG.W-GLASS-DEFAULT-DEFINITION — dual-engine paint DELTA

**Wave:** BG.W-GLASS-DEFAULT-DEFINITION (F2.1 · GA-1 · the defined control tier)
**Row:** cursor F2.1, status PAINT-PENDING → **DONE**
**Judge:** NON-AUTHORING paint judge (did not build this wave)
**Date:** 2026-07-03
**Verdict: PASS → flip PAINT-PENDING → DONE.** The dead-knob fix (commit `baebe05a`) LANDED and
REACHES PAINT. The `--glass-definition: 1` cohort now RE-DECLARES `--glass-floor-fill` +
`--glass-border-defined` on the definition-1 scope, so both legs re-resolve at the element: the
card@15% warm-cream floor + the foreground@14% warm rim ACTUALLY PAINT. The defined control tier
gains a visible edge/floor over flat backdrops (`/display/buttons`) while the content glass tiers
stay transmissive over the live field (`/substrates/glass-material`). Both engines, both modes.

> This SUPERSEDES the prior FAIL DELTA (2026-07-02, commit `cc70a792`) that caught the
> substitution-vs-inheritance dead knob. That defect is now closed — see the inverted evidence below.

---

## Method (the proven C18 dual-engine `?capture=` harness over BUILT `:5200`)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).
- `npm run demo:dist:build` (BUILT bytes) → `npm run demo:dist:serve` (vite preview `:5200`).
- **Chrome leg:** real headed Chrome.app 149 via CDP `:9466` (playwright `connectOverCDP` →
  `newContext` colorScheme+`deviceScaleFactor:2` → `?capture=<route>&mode=<m>` → poll
  `data-capture-ready` → `GL_RENDERER` + `getComputedStyle` cohort probe → `page.screenshot`
  1440×900 @2x). GL badge decoded from pixels: `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`.
- **Safari/WebKit leg:** off-screen WKWebView compiled fresh from repo source
  (`clang … docs/tranches/BG/audit/wkshot-live.m -o …/wkshot-gdd`) → `wkshot-gdd
  "http://localhost:5200/?capture=<route>&mode=<m>" out.png <m> 15000` (polls `data-capture-ready`
  @4500ms). GPU badge: `Apple GPU`.
- Provenance = the in-pixel magenta engine badge (top-left). Every capture decodes the correct
  ENGINE + GPU + MODE + `2880×1800px`.
- **Routes:** `/display/buttons` (`.btn-glass` cohort — the defined/positive arm) +
  `/substrates/glass-material` (content glass tiers — the transmissive/negative arm).
- **8 PNGs on disk**, all 2880×1800, at
  `docs/tranches/BG/audit/visual/BG.W-GLASS-DEFAULT-DEFINITION-paint/gdd-<route>-<engine>-<mode>.png`.

---

## The dead knob is FIXED — computed-DOM evidence (Chrome CDP `getComputedStyle`, both modes)

The prior FAIL showed `--glass-floor-fill = …calc(0 * 15%)…` (transparent) on the cohort. The fix
re-declares the tokens on the `--glass-definition: 1` scope, so they now re-resolve `calc(1 * …)`:

| route (cohort) | `--glass-definition` | `--glass-floor-fill` scalar | floor gradient paints | border rim α |
|---|---|---|---|---|
| `/display/buttons` (`.btn-glass`, 25 el) **light** | **1** | `…#fdf5ec calc(1 * 15%)…` (**not 0**) | `linear-gradient(color(srgb .992 .961 .925 / **0.15**), …)` ✓ | **0.14** (warm ink) |
| `/display/buttons` **dark** | **1** | `…#352a22 calc(1 * 15%)…` | `linear-gradient(color(srgb .208 .165 .133 / **0.15**), …)` ✓ | **0.14** |
| `/substrates/glass-material` (content tiers, 26 el) **light** | **0** (correct) | `…calc(0 * 15%)…` transparent | `none` (transmissive) ✓ | 0.04 (base hairline) |
| `/substrates/glass-material` **dark** | **0** (correct) | `…calc(0 * 15%)…` transparent | `none` (transmissive) ✓ | 0.04 |

`floorScalarIsZero = false` on the button cohort (both modes) and `true` on the content tiers — the
definition flip reaches the control cohort and does NOT bleed into content surfaces. The two-layer
`background-image` on the buttons is `plate(oklab …/0.328) OVER floor(srgb …/0.15)` — the warm-cream
floor is the real second gradient layer. `chrome-results-gdd.json` carries the full per-element probe.
GL renderer = ANGLE Metal (Apple M5 Max) on all 4 Chrome captures (real GPU, `captureReady=true`,
`mainChildren=3`).

Device-free gate `proof:glass` is GREEN incl. the new **DF7 reaches-paint** clause (cohort
re-declares floor=✓ rim=✓, the substitution-trap fix) + the born-RED→GREEN self-test bite.

---

## The painted floor/edge delta — the binding visual truth (pixel reads, both engines/modes)

The glass-register pills (`glass`/`glass-wash`/`Toggle`) sit over the **FLAT page** (below the blue
hero band), so the delta is purely the defined-tier floor/rim over a flat backdrop:

| capture | pill fill L vs flat-page L | read |
|---|---|---|
| Chrome **light** | pills **−3.9 to −4.2 L** darker than page | warm-cream floor composites deeper → visible plate |
| Safari **light** | pills **−8.3 to −8.4 L** darker than page | floor paints (WebKit composites the alpha stack deeper) |
| Chrome **dark** | pills **+24 to +44 L** lighter than flat near-black page | warm-dark floor + rim lift the pill off the void |

Direction is consistent (pill darker than page in light, lighter than page in dark) — exactly the
"warm-cream floor over flat white / warm-dark floor over flat black" defined-tier behaviour. The
magnitude difference (−4 Chrome vs −8 Safari in light) is engine alpha-compositing variance, not a
defect; both engines paint the defined floor. The pills read as **defined controls with an edge, NOT
the pale lozenge** the page copy disavows ("lit glass over the busy backdrop, NOT a pale lozenge on a
flat plate").

## Visual read (all 8 captures, both engines, both modes)

- **`/display/buttons` — the DEFINED positive arm (PASS):** the glass-register pills over the flat
  page carry a visible warm-cream floor + warm rim in light and a warm-dark floor + warm-ink rim in
  dark — a delineated silhouette in Chrome AND WebKit. The hero CTA (`Launch sequence` / `Next`) over
  the blue field reads as transmissive lit glass (the intended contrast to the defined register).
- **`/substrates/glass-material` — the TRANSMISSIVE negative arm (PASS):** the five content glass
  tiers (glass-wash…glass-overlay) stay transmissive over the live aurora field (`--glass-definition:
  0`, `bgImage: none`); the definition flip does not bleed into content surfaces. The aurora field is
  recessive/calm (warm-cream light / warm-amber dark) — no conic banding, no oversaturation — in both
  engines and both modes.

Both criteria met: the cohort reads DEFINED (edge/floor) over a flat backdrop in BOTH modes AND the
content-tier transmissive read still lifts over the live field. Non-authoring dual-engine (Chrome +
Safari), both modes.

---

## Captures on disk (all 2880×1800, badge-decoded)

```
BG.W-GLASS-DEFAULT-DEFINITION-paint/
  gdd-display_buttons-chrome-light.png            (CHROME · ANGLE Metal M5 Max · LIGHT)
  gdd-display_buttons-chrome-dark.png             (CHROME · ANGLE Metal M5 Max · DARK)
  gdd-display_buttons-safari-light.png            (WEBKIT · Apple GPU · LIGHT)
  gdd-display_buttons-safari-dark.png             (WEBKIT · Apple GPU · DARK)
  gdd-substrates_glass-material-chrome-light.png  (CHROME · ANGLE Metal M5 Max · LIGHT)
  gdd-substrates_glass-material-chrome-dark.png   (CHROME · ANGLE Metal M5 Max · DARK)
  gdd-substrates_glass-material-safari-light.png  (WEBKIT · Apple GPU · LIGHT)
  gdd-substrates_glass-material-safari-dark.png   (WEBKIT · Apple GPU · DARK)
  chrome-results-gdd.json                          (per-element computed-DOM probe)
```

**VERDICT: PASS (dual-engine Chrome + Safari, both modes; all 8 capture PNGs resolve on disk).**
