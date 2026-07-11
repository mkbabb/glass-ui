# Dual-engine capture pipeline — END-TO-END VALIDATION (BG.W-DISCLOSURE-ROTATE route)

**Verdict: PIPELINE PROVEN. chromeOk=true · safariOk=true.** Both real engines capture full route
content over the served BUILT bytes, in both modes, with the in-pixel engine badge proving which
engine produced which bytes. This is the C-SAFARI keystone discharged at the pipeline level — the
prerequisite the fan-out depends on.

Non-authoring validation: this agent did NOT build BG.W-DISCLOSURE-ROTATE; it exercised the C18
harness end-to-end on that wave's route.

## Route

`/containers/accordion` — the disclosure surface BG.W-DISCLOSURE-ROTATE folds the chevron-rotate
register onto (Accordion + Select + Configurator carets). The captured content shows the chevron
disclosure carets (up-chevron on the open item, down-chevron on collapsed items) over the warm-cream
(light) / luminous-dark (dark) route field.

## The working method (exact commands — reproducible)

```bash
# 0 · siblings tripwire (before + after)
node scripts/verify-siblings-intact.mjs --quiet        # exit 0

# 1 · build the demo dist (BUILT bytes, not :5199 dev which bare-shells WebKit)
npm run demo:dist:build

# 2 · serve on :5200
npm run demo:dist:serve                                 # vite preview --port 5200

# 3 · Safari / WebKit leg — off-screen WKWebView (system WebKit.framework/Metal, NO TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
/tmp/wkshot-live "http://localhost:5200/?capture=/containers/accordion&mode=light" \
  docs/tranches/BG/audit/visual/pipeline-validate/disclosure-safari-light-desktop-full.png light 15000
/tmp/wkshot-live "http://localhost:5200/?capture=/containers/accordion&mode=dark" \
  docs/tranches/BG/audit/visual/pipeline-validate/disclosure-safari-dark-desktop-full.png  dark  15000
#   → polls document.documentElement[data-capture-ready] before takeSnapshotWithConfiguration

# 4 · Chrome leg — real on-screen Chrome.app + CDP (real Metal GPU)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9333 --user-data-dir=/tmp/chrome-cdp-disclosure \
  --no-first-run --no-default-browser-check --use-angle=metal about:blank &
node docs/tranches/BG/audit/visual/pipeline-validate/chrome-capture-disclosure.mjs
#   connectOverCDP → navigate ?capture=…&mode=<m> → poll data-capture-ready → page.screenshot
```

## Evidence — the 4-PNG floor (all on disk, all real content)

| PNG | Engine badge | GPU (badge) | View | Mode | Dim | Bytes |
|---|---|---|---|---|---|---|
| disclosure-chrome-light-desktop-full.png | CHROME | ANGLE Metal Renderer: Apple M5 Max | 1440×900 @1x | LIGHT | 1440×900 | 842 KB |
| disclosure-chrome-dark-desktop-full.png  | CHROME | ANGLE Metal Renderer: Apple M5 Max | 1440×900 @1x | DARK  | 1440×900 | 1.31 MB |
| disclosure-safari-light-desktop-full.png | WEBKIT | Apple GPU | 1440×900 @2x | LIGHT | 2880×1800 | 2.38 MB |
| disclosure-safari-dark-desktop-full.png  | WEBKIT | Apple GPU | 1440×900 @2x | DARK  | 2880×1800 | 2.67 MB |

- **Chrome GL_RENDERER = `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`** —
  independently read off a throwaway WebGL2 ctx. Proves REAL Metal GPU, NOT SwiftShader/llvmpipe/ANGLE
  Software. `data-capture-ready` landed at ~3.76 s (polled, never a fixed sleep).
- **Safari engine = WEBKIT / Apple GPU** — bare WKWebView (no `Version/` UA token → WEBKIT badge, as
  the harness documents; a real Safari.app would badge SAFARI). System WebKit.framework on Metal.
- Each PNG carries the deterministic in-pixel engine badge (magenta `#ff00ff` bordered top-left panel:
  ENGINE / GPU / VIEW / MODE) — the SOLE provenance channel; the gate decodes the badge from pixels.
- Every capture is real route content (the "Accordion" title, CONTAINERS·ACCORDION eyebrow, the four
  disclosure rows with chevron carets, the shell dock) — NOT a blank `<main>` / bare WebKit shell.

## Confirmations

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0, before AND after.
- The `demo:dist:serve` (:5200) and Chrome CDP (:9333) processes were killed on completion.
- FENCE respected: only PNGs + this DELTA written under `docs/tranches/BG/audit/visual/`; the
  `/tmp/wkshot-live` binary + `/tmp/chrome-cdp-disclosure` profile are ephemeral build artifacts (the
  documented method); zero edits to src/demo/styles/scripts; zero sibling touched.
