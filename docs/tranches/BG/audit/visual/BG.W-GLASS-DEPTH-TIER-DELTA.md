# BG.W-GLASS-DEPTH-TIER — dual-engine paint judge — **PASS**

**Non-authoring paint judge, 2026-07-05 (re-judge after the freeze-fix landed in `ce2a9253`).** Verdict:
**PASS — dual-engine (Chrome/ANGLE-Metal + WebKit/Metal), both modes.** The prior FAIL (the frozen `:root`
LERP dead-knob, judged 2026-07-05 on `841f3768`) is CLOSED: the deep LERP now resolves PER-ELEMENT and the
tier ladder PAINTS strictly-increasing — **content 14.05px < popover 15.1px < menu 16px** — on both engines,
both modes. The live `primary-audacious` CTA on `/display/buttons` now paints **backdrop-filter blur 14.05px**
at its content grade (0.35), NOT the frozen 16px menu-ceiling the prior judge caught. Thickness-by-prominence
(menu > popover > button material thickness) is REAL, not a dead knob.

## The fix under judgement

The deep LERP intermediates (`--glass-blur-deep-active-radius` / `--glass-saturate-deep-active` /
`--glass-blur-deep`) MOVED from the `:root` block (`tokens/glass-deep.css`) into the CONSUMING `.glass-deep`
rule (`glass/deep.css`). `--glass-depth` is a REGISTERED `@property` (`inherits: true; initial-value: 1`); a
`var()` reference to a registered custom property inside another custom property is eager-substituted with the
referenced property's COMPUTED value **at the declaring element** (CSS Properties & Values API). Declared at
`:root`, `--glass-depth` computed to its `initial-value` 1, so the LERP baked `calc(… * 1)` and inherited the
frozen depth-1 endpoint to every descendant (the prior FAIL). Declared on `.glass-deep` — the SAME element the
tier-map `:where()` rules set `--glass-depth` on — `var(--glass-depth)` now resolves to the element's LIVE
tier grade and the ladder drives. The ENDPOINTS + named GRADES stay at `:root` (literals, no registered-read,
safe). Confirmed byte-identical resolution on Chrome/ANGLE-Metal AND WebKit/Metal (spec behaviour).

## Method (proven C18 dual-engine harness — re-run on all 3 routes × 2 modes)

- Siblings tripwire: `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before + after).
- BUILT bytes: `npm run demo:dist:build` (exit 0) → `npm run demo:dist:serve` (vite preview `:5200`, HTTP 200).
- Chrome leg: real Chrome.app (149.0.7827.201) + CDP `:9477` → `?capture=<route>&mode=<m>`, poll
  `data-capture-ready`, `GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`
  (real Metal, NOT SwiftShader), `page.screenshot` @1440×900 dsf 2 → 2880×1800. + an in-page computed-DOM
  probe reading the REAL engine's resolution of the REAL shipped stylesheet (the painted truth for a CSS-token
  wave).
- Safari/WebKit leg: off-screen `wkshot-live` WKWebView (system WebKit/Metal, no TCC) → 2880×1800 PNGs; +
  a `playwright-webkit` computed-DOM probe (WebKit CSS-engine cross-check of the LERP resolution).
- Validation: `scripts/reflect-capture-verify.mjs` (`isRealPng` + IHDR dims + per-engine badge + body stats)
  over all 12 route PNGs.

## Capture artifacts — all 12 route PNGs on disk, 2880×1800, real content, per-engine badge

`docs/tranches/BG/audit/visual/pipeline-depth-tier/` (probe JSON alongside:
`chrome-probe.json` · `webkit-probe.json` · `png-validation.json`).

| PNG | engine | GPU (in-pixel badge) | mode | dims | isRealPng | badge meanL |
|---|---|---|---|---|---|---|
| `depth-tier-chrome-dropdown-light.png` | CHROME | ANGLE Metal Apple M5 Max | LIGHT | 2880×1800 | ✓ | 0.866 |
| `depth-tier-chrome-dropdown-dark.png`  | CHROME | ANGLE Metal Apple M5 Max | DARK  | 2880×1800 | ✓ | 0.237 |
| `depth-tier-chrome-popover-light.png`  | CHROME | ANGLE Metal Apple M5 Max | LIGHT | 2880×1800 | ✓ | 0.865 |
| `depth-tier-chrome-popover-dark.png`   | CHROME | ANGLE Metal Apple M5 Max | DARK  | 2880×1800 | ✓ | 0.238 |
| `depth-tier-chrome-buttons-light.png`  | CHROME | ANGLE Metal Apple M5 Max | LIGHT | 2880×1800 | ✓ | 0.846 |
| `depth-tier-chrome-buttons-dark.png`   | CHROME | ANGLE Metal Apple M5 Max | DARK  | 2880×1800 | ✓ | 0.294 |
| `depth-tier-safari-dropdown-light.png` | WEBKIT | Apple GPU | LIGHT | 2880×1800 | ✓ | 0.926 |
| `depth-tier-safari-dropdown-dark.png`  | WEBKIT | Apple GPU | DARK  | 2880×1800 | ✓ | 0.206 |
| `depth-tier-safari-popover-light.png`  | WEBKIT | Apple GPU | LIGHT | 2880×1800 | ✓ | 0.926 |
| `depth-tier-safari-popover-dark.png`   | WEBKIT | Apple GPU | DARK  | 2880×1800 | ✓ | 0.206 |
| `depth-tier-safari-buttons-light.png`  | WEBKIT | Apple GPU | LIGHT | 2880×1800 | ✓ | 0.906 |
| `depth-tier-safari-buttons-dark.png`   | WEBKIT | Apple GPU | DARK  | 2880×1800 | ✓ | 0.254 |

Badge decoded (eye): CHROME leg reads `ENGINE CHROME / GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max,
Unspecified Version) / VIEW 1440×900 @2x (2880×1800px) / MODE {LIGHT|DARK}`; Safari leg reads `ENGINE WEBKIT /
GPU Apple GPU / …`. Every route renders full content in both engines (the `/display/buttons` CTA over the
recessive blue field + glass/glass-wash chips + dock; the dropdown "Open menu" trigger; the popover "Form pod"
+ Placement buttons). Route-level pixel criteria PASS — recessive field (no conic banding / oversaturation),
calm grain, hero fits its envelope, warm-cream light + luminous-dark identities honoured.

## The dispositive computational readback (the painted truth) — identical Chrome ⇄ WebKit

**Tier-depth MAP (grade per base rung, `glass/deep.css` `:where()` rules) — CORRECT (by prominence):**
`.glass-overlay → --glass-depth 1 (menu)` · `.glass-floating → 0.7 (popover)` ·
`.glass-{card,resting,quiet,wash} → 0.35 (content)`. Named grade tokens (`:root`): content 0.35 < popover 0.7
< menu 1.

**Deep LERP → the painted blur/saturate — a STRICT MONOTONE LADDER (the FIX; was FLAT 16px in the prior FAIL):**

| grade (`.glass-floating.glass-deep`, `--glass-depth` = named grade) | Chrome blur | WebKit blur | Chrome sat (light/dark) | WebKit sat (light/dark) |
|---|---|---|---|---|
| floor (0)          | 13px    | 13px    | 1.6  | 1.6  |
| content (0.35)     | **14.05px** | **14.05px** | 1.67 / 1.462 | 1.67 / 1.462 |
| popover (0.7)      | **15.1px**  | **15.1px**  | 1.74 / 1.644 | 1.74 / 1.644 |
| menu (1)           | 16px    | 16px    | 1.8  | 1.8  |

Blur ladder is byte-identical across all four engine×mode combos (14.05 < 15.1 < 16). The saturate ladder is
strictly-increasing in both modes (dark rides the W-DARK-MATERIAL lower saturate companion — 1.462 < 1.644 <
1.8 — still monotone). The `--glass-depth` scalar is now LOAD-BEARING on the paint, not a dead knob.

**LIVE on-route confirmation — the exact prior defect, FIXED:** the one deep surface on `/display/buttons`
(the `primary-audacious` CTA, `btn-glass … glass-deep`, base rung `.glass-wash`) resolves `--glass-depth:
0.35` (content grade) and paints **backdrop-filter blur 14.05px / saturate 1.67 (light), 1.462 (dark)** on
BOTH engines — the criteria's ~14px content thickness, NOT the frozen 16px menu-ceiling. A deep button no
longer reads as thick as a deep menu.

## Fences — all HELD

- **Calm content default BYTE-UNCHANGED — PASS.** Non-deep tiers paint the calm W-GLASS-CAL ladder untouched:
  `.glass-wash` 1px · `.glass-quiet` 8px · `.glass-resting` 8px · `.glass-floating` 13px · `.glass-overlay`
  20px · `.glass-card` 8px (identical both engines). The tier map sets only the `--glass-depth` scalar, never
  a `--glass-blur-*` token, so a non-deep surface never reads the deep family. `proof:glass-cal` GREEN by
  construction.
- **`--glass-blur-*` NOT re-pointed by the tier map — PASS.** The `glass/deep.css` `:where()` tier rules set
  only `--glass-depth`; the blur re-point (`--glass-blur-floating: var(--glass-blur-deep)`,
  `.btn-glass.glass-deep → --glass-blur-btn: var(--glass-blur-deep)`) lives on the `.glass-deep` decoration,
  reached only by an explicit opt-in surface — and now the scalar it drives is live, so the fence's purpose
  (per-tier differentiation) is achieved.
- **One-deep-refractive-per-route budget — PASS.** `.glass-deep` count: buttons 1 · popover 0 · dropdown 0;
  `.glass-lens`/`.glass-refract` 0 on all routes; `main.children.length = 2` on all routes, both engines.

## Verdict

**PASS.** Every surface reads correct in BOTH engines (Chrome/ANGLE-Metal + WebKit/Metal) and BOTH modes; the
tier ladder paints strictly-increasing content 14.05px < popover 15.1px < menu 16px (thickness-by-prominence);
the live CTA paints its content grade (14.05px), not the frozen ceiling; every fence holds; all 12 capture
PNGs resolve on disk at 2880×1800 with per-engine in-pixel provenance badges. Cursor flips PAINT-PENDING →
DONE.
