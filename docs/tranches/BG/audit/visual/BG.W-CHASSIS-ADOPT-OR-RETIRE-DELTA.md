# BG.W-CHASSIS-ADOPT-OR-RETIRE — dual-engine paint DELTA

**Verdict: FAIL → PENDING (fix owed; src SHAs preserved).**
**Judge: non-authoring PAINT JUDGE** (did NOT build the wave; verified the PAINTED truth against the verbatim criterion).
**Date: 2026-07-03**

## Method (the proven C18 pipeline)

- BUILT bytes: `npm run demo:dist:build` → served on `:5200` (`vite preview`, BUILT dist-demo, NOT the `:5199` dev server).
- Per route+mode: `http://localhost:5200/?capture=<route>&mode=<light|dark>`, polled `document.documentElement[data-capture-ready]` before snapshot.
- **CHROME leg** (real GPU): non-headless Chrome 149 over CDP `:9456`, playwright-core `connectOverCDP`. `GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` — real Metal, NOT SwiftShader.
- **SAFARI/WebKit leg**: off-screen `WKWebView` via `/tmp/wkshot-live` (compiled from `docs/tranches/BG/audit/wkshot-live.m`), system `WebKit.framework`/Metal. Badge: `ENGINE WEBKIT · GPU Apple GPU`.
- Routes: `/foundations/intro`, `/substrates/aurora`, `/substrates/glass-material`, `/substrates/paper-grid`, `/substrates/dot-flow-field` (the route slug for `/substrates/dotflow`).
- 5 routes × 2 modes × 2 engines = **20 captures, all resolve on disk** under `BG.W-CHASSIS-ADOPT-OR-RETIRE-paint/`.

## Source-side disposition (verified, PASS)

- **RETIRE realized (D1):** `demo/stories/_chassis/` dir ABSENT · `DemoFrame.vue` ABSENT · `StorySectionHeader.vue` ABSENT · `demo-frame.css` ABSENT · no `demo-frame` `@import` in `demo/**/*.css`. ✓
- **ADOPT realized (D2):** `StoryHeader.vue` PRESENT, live-imported by `StoryPage.vue` + `StoryHero.vue`. `VizStudio.vue` PRESENT, live-imported by `aurora.vue`. ✓
- **Clean delete (D3):** the only surviving `DemoFrame`/`StorySectionHeader` mentions are comment-only provenance prose (StoryPage.vue lines 100/147 inside `<!-- -->`; StoryHeader.vue lines 5-6 in `//`). ✓
- **`proof:demo` GREEN** on the integrated tree (D1/D2/D3/D4 all `true`, 5 self-test bites OK). ✓

The disposition FLIP is correct. The FAIL is a **PAINT** finding on the adopted VizStudio anatomy, not a source-disposition defect.

## Computed-DOM checks (per route, Chrome)

| route | cluster | eyebrow | subpath | blurb | h1 | inlineHdr | dupEyebrow | reads |
|---|---|---|---|---|---|---|---|---|
| /foundations/intro | 1 | 1 | 1 | 1 | 1 | **0** | false | CLEAN (22 IconChip pops = category cards, correct) |
| /substrates/aurora | 1 | 1 | 1 | 1 | 1 | **1** ✗ | false | **DOUBLE-HEADER** |
| /substrates/glass-material | 1 | 1 | 1 | 1 | 1 | **0** | false | CLEAN |
| /substrates/paper-grid | 1 | 1 | 1 | 1 | 1 | **0** | false | CLEAN |
| /substrates/dot-flow-field | 1 | 1 | 1 | 1 | 1 | **0** | false | CLEAN |

The StoryHeader cluster renders exactly ONCE on every route (cluster=1, eyebrow=1, h1=1) — the unified-header ADOPT is real. The lone `inlineHdr=1` is **aurora only**.

## The defect (dual-engine, both modes — 4/4 aurora captures)

`/substrates/aurora` paints TWO competing display-scale identity headers stacked vertically:

1. **StoryHeader cluster** (VizStudio → StoryPage chassis): eyebrow `SUBSTRATES · AURORA` → subpath chip `@mkbabb/glass-ui/aurora` → giant display `<h1>` **"Aurora"** → blurb.
2. **VizStudio `#masthead` inline `<header>`** (`aurora.vue:143-153`): a SECOND eyebrow `SUBSTRATES · AURORA STUDIO` → a purple `text-display-3` **"Aurora Studio"** title.

This is the exact reading-order restatement the verbatim paint criterion forbids:
> Pass = … the surviving StoryHeader unified header cluster (IconChip/eyebrow/accent **rendered ONCE, 0 inline `<header>`**) …

The aurora page carries an inline `<header>` (criterion violation) AND restates the page identity a second time at display scale (a focal double-`<h1>`-analogue inversion — "Aurora" black/light + "Aurora Studio" purple). The gestalt is TWO titles, not "one designed anatomy."

Engine/mode invariance:
- Chrome LIGHT: double-header present. `chrome__substrates_aurora_light.png`
- Chrome DARK: double-header present. `chrome__substrates_aurora_dark.png`
- Safari LIGHT: double-header present. `safari_substrates_aurora_light.png`
- Safari DARK: double-header present. `safari_substrates_aurora_dark.png`

Substrate paint quality on aurora is otherwise FINE (recessive/calm field, no conic banding, no oversaturation) — the defect is purely the header anatomy double-render.

## defectLocalization

- **File:** `demo/stories/substrates/aurora.vue`, lines **141-153** (the `<template #masthead>` slot → inline `<header class="flex flex-col gap-1">` with a duplicate `.section-label` eyebrow + a `text-display-3` "Aurora Studio" title).
- **Root cause:** VizStudio adopts `StoryPage`, which already renders the ONE StoryHeader unified cluster (eyebrow + subpath + display `<h1>` + blurb). The aurora studio ALSO fills VizStudio's `#masthead` slot with a second `<header>` restating the same identity ("Aurora" → "Aurora Studio") at display scale. The adopt landed the chassis; the aurora consumer still double-authors its own masthead header (a BB.W-SUFFUSE3 masthead pattern that now COLLIDES with the adopted StoryHeader cluster).
- **Scope:** aurora is the ONLY adopted-VizStudio route in the wave's capture set; the other 4 routes ride plain StoryPage and read CLEAN in both engines/modes.

## mustFix[]

1. **Remove the double identity on `/substrates/aurora`.** Either (a) drop the inline `<header>` masthead from `aurora.vue`'s `#masthead` slot so the StoryHeader unified cluster is the ONLY identity header (the criterion's "0 inline `<header>` / rendered ONCE"), OR (b) if a studio masthead is intended, VizStudio must NOT also render the StoryHeader display `<h1>` for the same page — one display-scale title per page, not two. The painted result must read as ONE header cluster with the identity rendered ONCE.
2. **Re-verify** the aurora route in BOTH engines + BOTH modes after the fix: `inlineHdr` must go to `0` and only ONE display-scale title (`"Aurora"`) may paint above the studio stage. The other 4 routes are already GREEN — do not regress them.

## Capture inventory (all resolve on disk)

Directory: `docs/tranches/BG/audit/visual/BG.W-CHASSIS-ADOPT-OR-RETIRE-paint/`

- `chrome__foundations_intro_{light,dark}.png` · `safari_foundations_intro_{light,dark}.png`
- `chrome__substrates_aurora_{light,dark}.png` · `safari_substrates_aurora_{light,dark}.png` ← **defect**
- `chrome__substrates_glass-material_{light,dark}.png` · `safari_substrates_glass-material_{light,dark}.png`
- `chrome__substrates_paper-grid_{light,dark}.png` · `safari_substrates_paper-grid_{light,dark}.png`
- `chrome__substrates_dot-flow-field_{light,dark}.png` · `safari_substrates_dot-flow-field_{light,dark}.png`

20/20 PNGs on disk. Chrome GPU: ANGLE Metal (Apple M5 Max). Safari GPU: Apple GPU (system WebKit).

## Disposition

FAIL → the wave's cursor row flips PAINT-PENDING → PENDING with this DELTA. src SHAs preserved (no `src/` edit — the fix is a `demo/stories/substrates/aurora.vue` masthead change owed to a build-FIX agent). The PENDING-with-DELTA state routes the wave to a build-fix agent (its STEP 0.4).
