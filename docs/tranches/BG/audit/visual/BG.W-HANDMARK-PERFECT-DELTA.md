# BG.W-HANDMARK-PERFECT — dual-engine paint close (DELTA)

**Role:** NON-AUTHORING PAINT JUDGE (did not build; verifies painted truth against criteria).
**Date:** 2026-07-10. **Route:** `/motion/handmark`. **Surface:** hand-voice / paper marks.
**Verdict: PASS — dual-engine (Chrome + Safari), BOTH modes. The marks read HAND-made, aspect-correct, the hull-guard fallback is intact, over the paper-grain register. Every capture PNG resolves on disk.**

## Method (the proven C18 `?capture=` harness on BUILT bytes)

1. `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before + after).
2. `npm run demo:dist:build` (vite → `dist-demo/`, ~1s) → BUILT bytes.
3. Serve BUILT bytes on `:5200` (`vite preview`, NOT `:5199` dev).
4. **Chrome leg** — real on-screen Chrome.app (real Metal GPU) via `chromium.connectOverCDP(:9334)`; per mode `?capture=/motion/handmark&mode=<light|dark>`, poll `data-capture-ready`, full-page `screenshot`. `GL_RENDERER` probe = `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, …)` — real Metal, not SwiftShader.
5. **Safari/WebKit leg** — `/tmp/wkshot-live` (system `WebKit.framework`/Metal, off-screen `WKWebView`, no TCC; the documented `-o /tmp/wkshot-live` compile target), polls `data-capture-ready` @4500ms → snapshot. Badge GPU = `Apple GPU`.
6. Validate: reuse the single decoder leaf `scripts/reflect-capture-verify.mjs` (`isRealPng`/`pngDimensions` + body-variance + magenta-fiducial/ink badge) + a live DOM geometry probe of every HandMark SVG overlay + scroll-band captures of the lower voices.

## The 4 primary captures (all PASS)

| PNG | Engine | GPU (in-pixel badge) | Dims | Mode | isRealPng | body σ(lum) | body mean(lum) | magenta fiducial | verdict |
|---|---|---|---|---|---|---|---|---|---|
| `BG.W-HANDMARK-PERFECT-paint/chrome-handmark-light.png` | CHROME | ANGLE Metal Renderer: Apple M5 Max | 1440×900 @1x | LIGHT | true | 40.4 | 217.2 | 2604 | PASS |
| `BG.W-HANDMARK-PERFECT-paint/chrome-handmark-dark.png` | CHROME | ANGLE Metal Renderer: Apple M5 Max | 1440×900 @1x | DARK | true | 44.4 | 52.4 | 2604 | PASS |
| `BG.W-HANDMARK-PERFECT-paint/safari-handmark-light.png` | WEBKIT | Apple GPU | 2880×1800 @2x | LIGHT | true | 50.9 | 221.2 | 6432 | PASS |
| `BG.W-HANDMARK-PERFECT-paint/safari-handmark-dark.png` | WEBKIT | Apple GPU | 2880×1800 @2x | DARK | true | 51.3 | 54.0 | 6432 | PASS |

- **Real GPU, two distinguishable engines.** Chrome ANGLE-Metal vs WebKit Apple-GPU — different badge, GPU string, font metrics, DPR (@1x vs @2x). Not a re-shot Chromium.
- **Mode-distinct.** LIGHT mean L≈217–221 (warm-cream); DARK mean L≈52–54 (luminous-dark register). In-pixel `MODE` badge matches.
- **Readiness POLLED (`data-capture-ready`), never a fixed sleep.** Chrome ready @~3.7–4.1s; WebKit @4500ms.

## Computational geometry probe — all 16 HandMark SVG overlays (Chrome, engine-agnostic DOM)

Every mark: `anyEmptyD=false`, `visible=true`. Aspect-correct viewBox (A2): every `viewBox` is `0 0 100 <H>` with **H proportional/computed** (never a hardcoded `24`).

| datum | brush/shape | viewBox H | paths | fill | stroke-w | d-lens | visible |
|---|---|---|---|---|---|---|---|
| pays in | pen/underline | 38.80 | 1 | none | 6 | [1034] | ✓ |
| future | boil | 48.17 | 1 | currentColor | 0 | [350] | ✓ |
| here | boil | 61.23 | 1 | currentColor | 0 | [350] | ✓ |
| really matters | highlighter/highlight | 20.52 | 1 | #ffd84a | 0 | [142] | ✓ |
| drawn | pen/draw-on | 44.89 | 1 | none | 6 | [1038] | ✓ |
| pen | pen | 73.24 | 1 | none | 6 | [1023] | ✓ |
| boil | boil | 79.40 | 1 | currentColor | 0 | [350] | ✓ |
| pencil | pencil | 47.11 | 1 | none | 3 | [1245] | ✓ |
| crayon | crayon (hull) | 40.83 | 2 | #cc4422 | 0 | [219,219] | ✓ |
| marker | marker (hull) | 39.35 | 1 | #2a8c5a | 0 | [231] | ✓ |
| ringed | ring/circle | 40 | 1 | none | 5 | [1475] | ✓ |
| **a** | **marker/box (tiny)** | **40** | **4** | **#2a8c5a** | **0** | **[85,111,88,110]** | **✓** |
| **it** | **crayon/bracket (tiny)** | **40** | **6** | **#cc4422** | **0** | **[59,59,111,111,64,64]** | **✓** |
| default | boil | 41.02 | 1 | currentColor | 0 | [350] | ✓ |
| bolder (:amplitude 1.8) | boil | 44.19 | 1 | currentColor | 0 | [350] | ✓ |
| tinted | pen (motion-accent) | 50.43 | 1 | none | 6 | [1028] | ✓ |

- **A3 hull se-guard INTACT (the key criterion).** The tiny-datum box-mode marks `"a"` (box/marker, box `w:9 h:22`) and `"it"` (bracket/crayon, box `w:12 h:26`) fall back to a stroked multi-path body (4 / 6 non-empty paths), rect 48×122 / 42×122, **visible** — never the empty perfect-freehand `d` collapse-and-vanish. Confirmed computationally AND visually (green band over `a`, red band over `it`) in BOTH modes.
- **A2 aspect-correct viewBox.** Proportional heights across the set (`vbH = VB_W / boxAspect`).
- **W5 voices differ.** pen (stroke-6/fill-none) · pencil (stroke-3 fine tooth) · crayon (2-path fill, waxy) · marker (1-path fill, juicy hull) · boil (currentColor fill) — measurably distinct geometry.
- **Amplitude knob.** `default` vbH 41.02 vs `bolder` (:amplitude 1.8) vbH 44.19 — larger excursion; painted visibly bolder.

## Visual gestalt (Chrome full page both modes + Safari top both modes + scroll bands)

- **Pen underline (masthead).** "Who **pays in** gets connected" — a wobbled, slightly-bowing hand line under "pays in"; reads HAND-made, not a ruler line. Both engines, both modes.
- **Boil morphology.** "The **future** is **here**" — two distinct boil underlines (seeds 3/17), irregular period wobble. Hand-made.
- **Highlighter (C-1 five deltas live).** "really matters" — a low-seated yellow hull ribbon BEHIND the word that **multiplies over the page text** (the black glyphs composite THROUGH it, not occluded). Strong yellow over the warm-cream (light); correctly DIM over the dark page (`mix-blend-mode: multiply` × dark ≈ dark — honest blend physics, exactly the "not isolated off the page" intent, NOT a defect and NOT a masking fallback).
- **Brush continuum.** pen (clean) · boil (procedural) · pencil (fine grainy tooth) · crayon (waxy red grain) · marker (juicy green hull) — visibly distinct voices, "never everything-renders-pen."
- **Ring.** "A **ringed** word" — a hand-scribbled red loop overshooting around the word (a hand circle, not a snapped ellipse).
- **Box-mode hull se-guard.** "box **a** datum · bracket **it** tight" — visible green/red bands over the 1-char datums in both modes. Never a vanish.
- **Amplitude.** default vs bolder — bolder line visibly thicker.
- **Color prop.** "A **tinted** mark" — the underline paints the motion-accent purple (`--viz-legendre`), an explicit color prop winning over currentColor.
- **Paper-grain register.** Warm-cream (light) / luminous-dark warm-brown (dark) — calm, not a dead charcoal void.

## Device-free gate corroboration (GREEN)

- `proof:handmark-audit` — PASS (A1 spacing-CV median 0.549 ≥ 0.30 · sinusoid 0.000 < floor — detector bites · A2 aspect-correct viewBox · A3 hull se-guard).
- `proof:handmark` — PASS (W1–W7; W7 aspect-correct viewBox + hull se-guard + amplitude knob).
- `proof:paper` — PASS (one warm raster tooth PRIMARY, feTurbulence demoted).

## Fences honored

- Operated ONLY under `/Users/mkbabb/Programming/glass-ui`. Wrote PNGs + this DELTA under `docs/tranches/BG/audit/visual/` + one cursor row in `EXECUTION-PROGRESS.md`. No `src/`/`demo/`/`styles/`/`scripts/` edited to "fix" a defect. No sibling under `~/Programming` touched. `verify-siblings-intact --quiet` exit 0 before AND after. Throwaway Chrome + profile killed on completion; the pre-existing `:5200` preview left as found.

**All surfaces in BOTH engines + BOTH modes read correct; all 14 capture PNGs resolve on disk. → DONE.**
