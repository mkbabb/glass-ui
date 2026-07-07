# BG.W-CHASSIS-ADOPT-OR-RETIRE — dual-engine paint DELTA

**Verdict: PASS (dual-engine Chrome + Safari, both modes). The prior FAIL double-header is EXCISED.**
**Judge: non-authoring PAINT JUDGE** (did NOT build the wave; verified the PAINTED truth against the verbatim criterion — never the builder's claim).
**Date: 2026-07-07** · re-judge of the 2026-07-03 FAIL after the this-commit fix landed (aurora `#masthead` + VizStudio `<slot name="masthead">` excised at the chassis root).

## Method (the proven C18 dual-engine pipeline)

- (0) `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before and after).
- (1) BUILT bytes: `npm run demo:dist:build` (rolldown vite, `dist-demo/`, exit 0) → served on a preview server. **Isolation:** a concurrent paint-judge agent held the default `:5200`/`:9333` pair (its Chrome profile `chrome-profile-judge` collided with mine and the shared `:5200` server flapped `ERR_CONNECTION_REFUSED`), so this judge ran on a **fully isolated pair — preview `:5233` + Chrome CDP `:9347`** with its own ephemeral profile. Served bytes are byte-identical to `:5200` (same `dist-demo` build); the port is not load-bearing on the painted truth.
- Per route+mode: `http://localhost:5233/?capture=<route>&mode=<light|dark>`, polled `document.documentElement[data-capture-ready]` (≤15s, never a fixed sleep) before snapshot.
- **CHROME leg** (real GPU): on-screen Chrome 149 over CDP, playwright `connectOverCDP`. `GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` on every capture — real Metal, **NOT SwiftShader**.
- **SAFARI/WebKit leg**: off-screen `WKWebView` via the repo-compiled `capture-pipeline-keystone/.wkshot-live-bin` (system `WebKit.framework`/Metal, no Screen-Recording TCC). Badge: `ENGINE WEBKIT · GPU Apple GPU`, 2880×1800 retina-2×. WebKit renders REAL route content off the built dist (spot-checked glass-material + aurora both modes — not a bare shell).
- (3) teardown: killed the isolated preview server + Chrome; siblings re-checked exit 0.

### Route-set reconciliation (F7 IA-redesign slug change)

The prior (2026-07-03) DELTA captured `/foundations/intro`, `/substrates/aurora`, `/substrates/glass-material`, `/substrates/paper-grid`, `/substrates/dot-flow-field`. The **sibling F7 wave `BG.W-DEMO-IA-REDESIGN` (commit d49a9189, "family collapse → ~94 pages") RETIRED the `/substrates/paper-grid` slug** — it now renders the `404 "Lost in the lattice"` page (the current substrate viz set is aurora/blob/constellation/fourier-field/glass-material/glass-panel/dot-flow-field/concentric/liquid-grid/dot-matrix; `paper-grid` is gone from `LANDING_SUBPATHS`). The dead slug is **replaced by `/substrates/constellation`** (a live `headerTags=0` clean route) to preserve the "aurora + 4 clean routes" capture set exactly. The 404 paper-grid captures + supplementary `/foundations/typography` captures remain on disk (labelled below); they are NOT part of the canonical 20.

## Source-side disposition (verified, PASS) + `proof:demo` gate

- **RETIRE realized (D1):** `demo/stories/_chassis/` ABSENT · `DemoFrame.vue` ABSENT · `StorySectionHeader.vue` ABSENT · `demo-frame.css` ABSENT (0 matching files on disk). ✓
- **ADOPT realized (D2):** `StoryHeader.vue` PRESENT, live-imported by `StoryPage.vue` + `StoryHero.vue`. `VizStudio.vue` PRESENT, live-imported by `aurora.vue` (the ONLY VizStudio adopter — confirmed by grep). ✓
- **The this-commit fix (D7 — the FAIL's cure):** `aurora.vue` has NO live `<template #masthead>` (the "Aurora Studio" `text-display-3` inline `<header>` is EXCISED; only a `<!-- -->` provenance comment remains at lines 139-143). `VizStudio.vue` has NO `<slot name="masthead">` — the seam is removed at the chassis ROOT (comment at 106-114), so no viz can re-author its identity. Both `#masthead` grep hits are pure HTML comments. ✓
- **`proof:demo` PASS** on the integrated tree: D1-D7 + T1-T4 + E1-E3 all `true`; **D7 unified-header-single-source `mastheadFills: []`**; 19 self-test bites handled (incl. D7×3 seam-at-root + double-authored-consumer + comment-strip distinguishing). ✓

## Computed-DOM checks (per route — the DEFECT-vs-CLEAN discriminator)

The load-bearing discriminator is **`.story-header-cluster` count = 1**, **exactly ONE display `<h1>`**, **zero "Studio" restatement titles** — NOT a raw `<header>`-tag count (a StoryPage content page legitimately wraps its SINGLE cluster in a semantic `<header>`; that is the unified header, not a competing one — see the `headerTags` note below).

| route | cluster | display h1 | h1 text | headerTags (in `<main>`) | studioTitles | reads |
|---|---|---|---|---|---|---|
| /substrates/**aurora** (the wave route) | **1** | **1** | **["Aurora"]** | **0** ✓ (was **1** = the excised `#masthead`) | **[]** ✓ (was "Aurora Studio") | **CLEAN — double-header FIXED** |
| /foundations/intro | 1 | 1 | ["ℱ glass-ui"] | 0 | [] | CLEAN (category IconChip pops = cards, correct) |
| /substrates/glass-material | 1 | 1 | ["Glass Material"] | 0 | [] | CLEAN |
| /substrates/dot-flow-field | 1 | 1 | ["Dot Flow Field"] | 0 | [] | CLEAN |
| /substrates/constellation | 1 | 1 | ["Constellation"] | 0 | [] | CLEAN (replaces IA-retired paper-grid) |

`headerTags` = raw `<header>` elements inside `<main>`. On the 5 canonical routes it is **0** — the StoryHeader cluster renders as a `<div>` on hero/viz pages, so the OLD aurora `inlineHdr=1` was literally counting the competing `#masthead` `<header>`; post-fix it is `0`. (Content-variant foundations pages — typography/colors/glass-panel — wrap their SINGLE cluster in a semantic `<header>` (`headerTags=1`) with one display h1 and zero studio titles; that is the unified header itself, NOT a defect. The captured `/foundations/typography` supplementary shows this variant is clean by the cluster/one-h1/no-studio discriminator.)

## The fix, verified in PAINT (aurora — engine + mode invariant, 4/4)

Where the FAIL painted TWO competing display-scale identities stacked vertically (StoryHeader display `<h1>` "Aurora" **PLUS** a second inline `<header>` `#masthead` restating "SUBSTRATES · AURORA STUDIO" + a purple `text-display-3` "Aurora Studio"), the fixed tree paints **ONE identity cluster**: eyebrow `SUBSTRATES · AURORA` → subpath chip `@mkbabb/glass-ui/aurora` → giant display `<h1>` **"Aurora"** → blurb → the normal StoryPage body section (a subheading-scale `<h2>` "Aurora" describing the component — NOT a display-scale competing title, NOT purple, NOT "Aurora Studio"). The purple "Aurora Studio" masthead is GONE in all four captures.

- Chrome LIGHT: single "Aurora" identity, no masthead. `chrome__substrates_aurora_light.png`
- Chrome DARK: single "Aurora" identity, no masthead. `chrome__substrates_aurora_dark.png`
- Safari LIGHT: single "Aurora" identity, no masthead. `safari_substrates_aurora_light.png`
- Safari DARK: single "Aurora" identity, no masthead. `safari_substrates_aurora_dark.png`

Substrate paint quality on aurora reads correct in every capture: **recessive/calm warm-cream→pink field, no conic banding, no oversaturation, grain calm**; the presets panel + dock read; the hero display "Aurora" fits its envelope.

## No-regression on the 4 clean routes (both engines, both modes)

Each renders exactly ONE unified StoryHeader cluster (eyebrow → subpath chip → display `<h1>` → blurb → body section), `headerTags=0`, `studioTitles=[]`, no competing masthead. Verified: Chrome visual (all 4) + DOM (all 4) + Safari real-content render (glass-material spot-check + aurora both modes). Dark mode reads correctly on every route (warm-dark transmissive substrate on aurora, dark lattice on constellation, blueprint-grid wash on dot-flow-field, category grid on intro).

## Capture inventory — CANONICAL 20/20 resolve on disk

Directory: `docs/tranches/BG/audit/visual/BG.W-CHASSIS-ADOPT-OR-RETIRE-paint/`

- `chrome__substrates_aurora_{light,dark}.png` · `safari_substrates_aurora_{light,dark}.png` ← **the fix**
- `chrome__foundations_intro_{light,dark}.png` · `safari_foundations_intro_{light,dark}.png`
- `chrome__substrates_glass-material_{light,dark}.png` · `safari_substrates_glass-material_{light,dark}.png`
- `chrome__substrates_dot-flow-field_{light,dark}.png` · `safari_substrates_dot-flow-field_{light,dark}.png`
- `chrome__substrates_constellation_{light,dark}.png` · `safari_substrates_constellation_{light,dark}.png`

**20/20 canonical PNGs on disk** (each > 50 KB, real content). Chrome GPU: ANGLE Metal (Apple M5 Max). Safari GPU: Apple GPU (system WebKit, 2880×1800 retina).

Supplementary on disk (NOT part of the canonical 20, documented for provenance): `chrome__substrates_paper-grid_{light,dark}.png` + `safari_substrates_paper-grid_{light,dark}.png` (the F7-IA-retired slug — 404 "Lost in the lattice"); `chrome__foundations_typography_{light,dark}.png` + `safari_foundations_typography_{light,dark}.png` (the `<header>`-wrapped single-cluster variant — clean by the discriminator, headerTags=1).

## Disposition

**PASS.** The verbatim paint criterion — "the StoryHeader display `<h1>` identity is rendered ONCE, 0 inline `<header>`" — is MET on `/substrates/aurora` (the ONLY adopted-VizStudio route) in BOTH engines + BOTH modes: `inlineHdr` went `1 → 0`, one display-scale title ("Aurora") paints, the purple "Aurora Studio" double-header is EXCISED. The 4 clean StoryHeader/chassis routes read single-header no-regression. `proof:demo` GREEN with D7 `mastheadFills: []`. Every canonical capture resolves on disk. Cursor flips PAINT-PENDING → DONE.
