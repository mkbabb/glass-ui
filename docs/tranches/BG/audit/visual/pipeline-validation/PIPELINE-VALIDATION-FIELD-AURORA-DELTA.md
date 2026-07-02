# Capture-pipeline validation — BG.W-GATE-FIELD-AURORA route (`/substrates/aurora`)

> **Role:** dual-engine capture-pipeline VALIDATION (the C-SAFARI keystone) by a non-authoring
> validator. **Purpose:** PROVE the `?capture=` dual-engine harness works end-to-end on the
> canonical field-aurora surface — the live-WebGL aurora route (the D2 metallic-vs-aurora surface),
> a stronger exercise than the static-token routes prior runs used. **Date:** 2026-07-02.
> **Scope:** pipeline proof ONLY — this is NOT a gestalt verdict flip (no roster row is touched);
> it certifies the CAPTURE MECHANISM, not the wave's design. **Fence:** zero `src/`/`demo/`/`styles/`
> edits; PNGs + this DELTA under `docs/tranches/BG/audit/visual/pipeline-validation/`.

## Verdict: BOTH engines PASS

| leg | engine badge (in-pixel) | GPU | dims | content | ready |
|---|---|---|---|---|---|
| **Chrome** (CDP, real Chrome.app 149) | `ENGINE CHROME` | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` — REAL Metal GPU, not SwiftShader | 2880×1800 (1440×900 @2x) | FULL route: `SUBSTRATES · AURORA` eyebrow, `@mkbabb/glass-ui` copy, both nav docks, live aurora field | `data-capture-ready` polled |
| **Safari/WebKit** (off-screen WKWebView, system WebKit.framework/Metal, no TCC) | `ENGINE WEBKIT` | `Apple GPU` — real Metal | 2880×1800 | FULL route, IDENTICAL layout | `data-capture-ready` @4500ms |

Both modes (light + dark) captured on BOTH engines → **4 PNGs**, all real content, all dimension-correct,
all carrying the in-pixel engine badge (the SOLE provenance source; magenta `#ff00ff` locator frame).

## Evidence on disk (this dir)

| png | engine | mode | dims | bytes |
|---|---|---|---|---|
| `gate-field-aurora-chrome-light-desktop-full.png` | CHROME (ANGLE Metal M5 Max) | light | 2880×1800 | 2.83 MB |
| `gate-field-aurora-chrome-dark-desktop-full.png` | CHROME | dark | 2880×1800 | 2.68 MB |
| `gate-field-aurora-safari-light-desktop-full.png` | WEBKIT (Apple GPU) | light | 2880×1800 | 4.08 MB |
| `gate-field-aurora-safari-dark-desktop-full.png` | WEBKIT | dark | 2880×1800 | 4.07 MB |

Badge + content crops (visual provenance) under `crops/`. All four badge crops decode ENGINE · GPU · VIEW
`1440×900 @2x (2880×1800px)` · MODE cleanly. Blank-WebKit shell (the 3-tranche chronic, ~173 KB) does NOT
reproduce — every WebKit PNG is >4 MB full content.

## Objective decoder readback (`reflect-capture-verify.mjs pngRegionStats`, aurora field probe `x=0.20 y=0.20 w=0.60 h=0.50`)

| capture | meanL | meanChroma | note |
|---|---|---|---|
| chrome-light | 0.799 | 0.0466 | warm field, > 0.02 chroma floor |
| chrome-dark  | 0.512 | 0.0513 | luminous dark, not a flat void |
| safari-light | 0.838 | 0.0409 | warm field |
| safari-dark  | 0.440 | 0.0456 | luminous dark |

Chroma ≥ 0.041 on all four → real warm-translucent aurora content, not a grey/blank slab. Chrome↔Safari
agree closely (light Δchroma 0.006, dark Δchroma 0.006) → dual-engine parity. (These stats corroborate the
CAPTURE fidelity; the gestalt PASS/FAIL for the surface is the owning wave's non-authoring close, not this run.)

## The WORKING method (exact commands — reproducible)

```bash
# 0 · siblings tripwire (before + after) — exit 0
node scripts/verify-siblings-intact.mjs --quiet

# 1 · build + serve the BUILT demo dist on :5200 (NOT :5199 dev — that bare-shells WebKit)
npm run demo:dist:build
npm run demo:dist:serve            # vite preview :5200 (background)

# 2 · Safari/WebKit leg — off-screen WKWebView (system WebKit.framework, Metal, NO TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc \
  docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
/tmp/wkshot-live "http://localhost:5200/?capture=/substrates/aurora&mode=light" \
  docs/tranches/BG/audit/visual/pipeline-validation/gate-field-aurora-safari-light-desktop-full.png light 15000
/tmp/wkshot-live "http://localhost:5200/?capture=/substrates/aurora&mode=dark" \
  docs/tranches/BG/audit/visual/pipeline-validation/gate-field-aurora-safari-dark-desktop-full.png  dark  15000

# 3 · Chrome leg — real Chrome.app + CDP (real Metal GPU) over the SAME ?capture= route
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9456 --user-data-dir="$PWD/.cache/chrome-capture-profile" \
  --no-first-run --no-default-browser-check --enable-unsafe-webgpu about:blank &
node docs/tranches/BG/audit/visual/pipeline-validation/chrome-capture-aurora.mjs
#   playwright chromium.connectOverCDP → newContext({colorScheme, deviceScaleFactor:2})
#   → goto ?capture= → waitForFunction(data-capture-ready) → GL_RENDERER probe → screenshot
```

Readiness is `document.documentElement.hasAttribute('data-capture-ready')` (poll, never a fixed sleep).
The in-pixel badge (`demo/capture/engine-badge.ts`) is the SOLE provenance — the gate/eye decode it FROM the
pixels; no forgeable JSON sidecar.

## Conclusion

The dual-engine `?capture=` pipeline is PROVEN end-to-end on the canonical field-aurora route. The C-SAFARI
chronic (the blank off-screen WKWebView that missed four prior tranches) does NOT reproduce — WebKit renders
full content with a distinct in-pixel engine badge. Fan-out is unblocked at the harness level.
