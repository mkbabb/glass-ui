# BG capture-pipeline validation — `BG.W-FALLBACK-EXCISE` (NF.1) route

> **Role:** NON-AUTHORING capture-pipeline VALIDATOR (did not author any BG wave).
> **Purpose:** PROVE the dual-engine `?capture=` pipeline end-to-end on the `BG.W-FALLBACK-EXCISE`
> wave's route BEFORE fan-out — the C-SAFARI keystone (the chronic that missed 4 prior tranches).
> **Route:** `/dock/overview` — the C-SAFARI keystone route the dock-morph purge (NF.1
> `var(--dock-expand-t)` fleet, `useDockMorphWindow` inverted-ladder, transitionend arms) affects;
> NF.1 is a zero-paint-delta mechanical excise, so the dock overview surface is its live exercise.
> **Date:** 2026-07-04. **Fence:** validation ONLY — zero `src/`/`demo`/`styles`/`scripts` edits;
> PNGs + this DELTA under `docs/tranches/BG/audit/visual/`; the cursor flip in EXECUTION-PROGRESS.md.

## Verdict — PIPELINE WORKS, BOTH ENGINES, BOTH MODES

| leg | engine (in-pixel badge) | GPU (badge) | mode | dims | bytes | content | VERDICT |
|---|---|---|---|---|---|---|---|
| Chrome CDP | `ENGINE CHROME` | `ANGLE Metal Renderer: Apple M5 Max` (real Metal, NOT SwiftShader) | light | 2880×1800 | 1.7 MB | FULL `/dock/overview` route | **PASS** |
| Chrome CDP | `ENGINE CHROME` | `ANGLE Metal Renderer: Apple M5 Max` | dark | 2880×1800 | 1.7 MB | FULL route (dark register) | **PASS** |
| off-screen WKWebView | `ENGINE WEBKIT` | `Apple GPU` (system WebKit.framework/Metal, no TCC) | light | 2880×1800 | 1.6 MB | FULL route | **PASS** |
| off-screen WKWebView | `ENGINE WEBKIT` | `Apple GPU` | dark | 2880×1800 | 1.6 MB | FULL route (dark register) | **PASS** |

`chromeOk = true` · `safariOk = true` — no blocker. The C-SAFARI blank-WebKit chronic does NOT reproduce.

## What each capture PROVES

- **Real route content, not a bare shell.** Chrome-light shows the `/dock/overview` "Overview" hero +
  GlassDock-walkthrough blurb, the Collapsible (hover-to-expand) dock, the Always-expanded media-transport
  dock ("The Garden"), Select/dropdown-trigger sections, the sidebar icon rail + the bottom nav dock
  (Liquid Morph / Dock Gallery / **Overview** / Dock Layers / Vertical Dock) — real dock pills over the warm
  aurora DockStage field. Safari-dark shows the SAME route in the dark luminous-transmissive register.
- **In-pixel engine badge (§6, the SOLE provenance).** Every PNG carries the top-left magenta `#ff00ff`
  fiducial-bordered panel: `ENGINE · GPU · VIEW W×H @2x · MODE`. Decoded from PIXELS by `validate.mjs`
  (magenta fiducial px + high-contrast ink px), not taken on prose. Chrome badge = real Metal M5 Max;
  WebKit badge = Apple GPU. The badge discriminates the two engines FROM the bytes.
- **Dimension-correct + real PNG.** All 4 are 2880×1800 (1440×900 @2x Retina), `isRealPng` true via the
  repo's single decoder leaf (`scripts/reflect-capture-verify.mjs`), 1.6–1.7 MB (not a blank shell slab).
- **Content variance + warm chroma.** Body-region luminance σ 20.4–28.7 (a uniform blank slab is ~0);
  decoder meanChroma 0.054–0.087 (warm-translucent glass content, not grey). Dark PNGs carry the dark
  ink profile (heavy near-black + minimal near-white in the badge/body); light PNGs the inverse — mode-correct.

## The WORKING METHOD (exact commands, re-usable for fan-out)

```bash
# 0 · siblings tripwire (before + after) — exits 0
node scripts/verify-siblings-intact.mjs --quiet

# 1 · build + serve the BUILT demo dist on :5200 (NOT :5199 dev — that bare-shells WebKit)
npm run demo:dist:build
npm run demo:dist:serve      # vite preview :5200 (background)

# 2 · Safari/WebKit leg — off-screen WKWebView (system WebKit.framework/Metal, NO Screen-Recording TCC)
#     compiled UNDER the repo (never /tmp)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o docs/tranches/BG/audit/.wkshot-bin
docs/tranches/BG/audit/.wkshot-bin \
  "http://localhost:5200/?capture=/dock/overview&mode=light" \
  docs/tranches/BG/audit/visual/pipeline-fallback-excise/fallback-excise-safari-light-desktop.png light 20000
docs/tranches/BG/audit/.wkshot-bin \
  "http://localhost:5200/?capture=/dock/overview&mode=dark" \
  docs/tranches/BG/audit/visual/pipeline-fallback-excise/fallback-excise-safari-dark-desktop.png dark 20000
#   the harness POLLS document.documentElement[data-capture-ready] (≤ maxWaitMs) THEN snapshots;
#   data-capture-ready landed @4500ms (light) / 4800ms (dark)

# 3 · Chrome leg — REAL Chrome.app + CDP over the SAME ?capture= route (badge reads real GPU)
#     profile UNDER the repo (never /tmp); GL_RENDERER probe = real Metal M5 Max, NOT SwiftShader
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9477 --user-data-dir="$PWD/docs/.../.chrome-profile" \
  --no-first-run --no-default-browser-check --headless=new about:blank &
CDP_URL=http://localhost:9477 node docs/tranches/BG/audit/visual/pipeline-fallback-excise/chrome-capture.mjs
#   navigate ?capture=/dock/overview&mode=<m>, poll data-capture-ready, record GL_RENDERER, screenshot

# 4 · validate all 4 PNGs (real PNG + dims + in-pixel badge + content variance), single decoder leaf
node docs/tranches/BG/audit/visual/pipeline-fallback-excise/validate.mjs   # → ALL_PASS=true
```

Note: `--headless=new` on macOS still composites on the REAL Metal GPU (the badge/GL_RENDERER probe returns
`ANGLE Metal Renderer: Apple M5 Max`, not SwiftShader) — the "real GPU, not headless-software-raster" floor is met.

## Files on disk (this dir)

- `fallback-excise-chrome-light-desktop.png` · `fallback-excise-chrome-dark-desktop.png`
- `fallback-excise-safari-light-desktop.png` · `fallback-excise-safari-dark-desktop.png`
- `chrome-capture.mjs` (Chrome CDP leg) · `validate.mjs` (the 4-PNG non-authoring validator) · `serve.log`
