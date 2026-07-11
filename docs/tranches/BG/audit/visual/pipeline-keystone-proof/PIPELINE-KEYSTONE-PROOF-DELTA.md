# Dual-engine capture pipeline — INDEPENDENT KEYSTONE PROOF (C-SAFARI, pre-fanout)

**Verdict: PASS on BOTH engines, BOTH modes.** The C18 `?capture=` harness (commit d4ae4577) drives
real Chrome.app (CDP, Metal M5 Max) AND real system WebKit.framework (off-screen WKWebView, Metal, NO
Screen-Recording TCC) end-to-end on a real route. This is an INDEPENDENT re-run by a non-authoring
validator — the pipeline is proven working before any wave fan-out. Nothing under `src/`/`demo/`/`styles/`
was edited (defect-recording only, per real-paint-protocol §3).

Target wave: **`BG.W-SHELL-MORPH-PAINT-REPAIR` (F3.R3) → route `/dock/morph-showcase`** (the in-place
V↔H liquid-glass dock-morph surface over the warm field). Built at HEAD; demo served from BUILT bytes
(`npm run demo:dist:build` → `npm run demo:dist:serve` on :5200 — NOT :5199 dev, which bare-shells
WebKit). Validated 2026-07-05. `verify-siblings-intact --quiet` exit 0 before AND after.

## The 4-PNG floor (all real content, dimension-correct, engine-badged, real GPU)

| PNG | Engine badge | GPU badge | View | Mode | Dims | Real content |
|---|---|---|---|---|---|---|
| shell-morph-chrome-light-desktop-full.png | CHROME | ANGLE Metal Renderer: Apple M5 Max | 1440×900 @1x | LIGHT | 1440×900 | ✓ morph hero + demo card + `T=0.000` + vertical dock + shell docks |
| shell-morph-chrome-dark-desktop-full.png | CHROME | ANGLE Metal Renderer: Apple M5 Max | 1440×900 @1x | DARK | 1440×900 | ✓ luminous-dark register, same anatomy |
| shell-morph-safari-light-desktop-full.png | WEBKIT | Apple GPU | 1440×900 @2x | LIGHT | 2880×1800 | ✓ morph route, retina 2× |
| shell-morph-safari-dark-desktop-full.png | WEBKIT | Apple GPU | 1440×900 @2x | DARK | 2880×1800 | ✓ luminous-dark register, retina 2× |

- **Real GPU proven** — Chrome `GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max,
  Unspecified Version)`, NOT SwiftShader/llvmpipe/ANGLE Software. WebKit runs system Metal (`Apple GPU`).
- **Engine provenance is in-pixel** — the magenta `#ff00ff`-bordered top-left badge encodes
  ENGINE/GPU/VIEW/MODE; the two engines are pixel-distinguishable (CHROME vs WEBKIT) and the two modes
  are pixel-distinguishable (LIGHT vs DARK). No forgeable JSON sidecar.
- **Deterministic readiness** — both legs POLL `document.documentElement[data-capture-ready]` (Chrome
  `waitForFunction`; wkshot `data-capture-ready after 4500ms`), never a fixed sleep.
- **Real route content decoded (non-blank)** — visually decoded on all four to the audacious "Vertical
  ↔ Horizontal Morph" display hero + blurb, the demo card over the warm field with the "Morph to
  horizontal" glass button + `T = 0.000` scalar readout, the settled vertical glass dock, and both
  shell docks (SidebarDock icon rail + BottomDock nav strip). A bare-shell WebKit would show none of it.

## The WORKING method (exact commands — do NOT re-derive)

```bash
# 0. tripwire
node scripts/verify-siblings-intact.mjs --quiet    # exit 0

# 1. build + serve BUILT bytes on :5200 (NOT :5199 dev — that bare-shells WebKit)
npm run demo:dist:build
npm run demo:dist:serve            # vite preview :5200  (backgrounded; killed on completion)

# 2. Safari/WebKit leg — off-screen WKWebView (system WebKit.framework/Metal, no TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o docs/tranches/BG/audit/.wkshot-bin   # gitignored, in-repo
docs/tranches/BG/audit/.wkshot-bin \
  "http://localhost:5200/?capture=/dock/morph-showcase&mode=light" out-light.png light 20000
docs/tranches/BG/audit/.wkshot-bin \
  "http://localhost:5200/?capture=/dock/morph-showcase&mode=dark"  out-dark.png  dark  20000
#   → 2880×1800 retina PNGs, FULL content + WEBKIT badge; polls data-capture-ready first

# 3. Chrome leg — real Chrome.app over CDP (real Metal GPU)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9477 \
  --user-data-dir="$PWD/node_modules/.cache/chrome-capture-profile" \  # gitignored, in-repo (NOT /tmp)
  --no-first-run --no-default-browser-check about:blank
#   then playwright connectOverCDP("http://localhost:9477"), goto
#   http://localhost:5200/?capture=/dock/morph-showcase&mode=<m>, waitForFunction data-capture-ready,
#   record GL_RENDERER off a throwaway webgl2 ctx, page.screenshot @1x.
#   (driver: docs/tranches/BG/audit/visual/pipeline-keystone-proof/chrome-leg.mjs)

# 4. teardown — kill the serve + throwaway Chrome, re-run the tripwire
lsof -ti :5200 | xargs kill ; lsof -ti :9477 | xargs kill
node scripts/verify-siblings-intact.mjs --quiet    # exit 0
```

FENCE NOTES: the compiled harness binary lives at the gitignored `docs/tranches/BG/audit/.wkshot-bin`
and the Chrome throwaway profile under the gitignored `node_modules/.cache/` — everything UNDER the
glass-ui repo, NEVER `/tmp`, NEVER a sibling. The `demo:dist:serve` + throwaway Chrome are killed on
completion (ports 5200/9477 confirmed down).

## Defect-recording (NOT a pipeline blocker — for the wave's own build-fix agent)

The pipeline captured the surface faithfully; the surface itself carries a live-π concern the wave-level
DELTA (`BG.W-SHELL-MORPH-PAINT-REPAIR-DELTA.md`) already tracks (verdict FAIL — settled-horizontal
endpoint + naked content re-margin). Additionally observed in the DARK captures: the demo-card body
paragraph ("Press the button and watch the dock flow…") reads very low-contrast over the warm-tinted
`glass-floating` plate (the on-glass-muted register collapses against the aurora-warmed card in dark).
Recorded here for the build-fix agent; this validator does not edit source.

## Conclusion

The dual-engine capture pipeline works END-TO-END. Both legs produce fresh, real, dimension-correct,
engine-badged, real-GPU whole-route captures in both modes. **chromeOk = true · safariOk = true.**
Fan-out is unblocked at the pipeline level. The C-SAFARI 3-wave chronic is dischargeable via THIS method
(system WebKit.framework/Metal, off-screen, no Screen-Recording TCC).
