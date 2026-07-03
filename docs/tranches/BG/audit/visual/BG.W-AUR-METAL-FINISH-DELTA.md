# BG.W-AUR-METAL-FINISH — dual-engine PAINT verdict — DELTA

**Wave**: BG.W-AUR-METAL-FINISH (metal as a MEDIUM, `uMedium` 8/9 — the two mutually-exclusive metal mediums `metal` + `metal-gradient`, dual-ported GLSL+WGSL).
**Route**: `/substrates/aurora`.
**Captured**: 2026-07-03, BUILT demo bytes on `vite preview :5200` (`npm run demo:dist:build` → `demo:dist:serve`), C18 dual-engine `?capture=` harness (poll `data-capture-ready`), deviceScaleFactor 2.
**Judge**: non-authoring paint judge (verified the PAINTED truth, not the builder's claim).

## VERDICT: **FAIL (paint)** — the metal medium is UN-SURFACED in the running demo; its lit-metal read cannot be observed. Route-health + all computational/gate arms PASS. Fix is a bounded DEMO-SURFACING edit; **metal src SHAs preserved** (gate GREEN).

---

## 1 · Computational / gate arm — ALL GREEN

| Check | Result |
|---|---|
| `proof:aur-metal` | **PASS** — metal DUAL-PORTS as the mutually-exclusive medium (`uMedium` 8/9); the tensor re-plumbs its gradient (ZERO new taps); the two-term BRDF FOLDS; the cursor-synth catch crosses to WGSL (no phantom `uLightDir`); the smooth default + kuwahara byte-unchanged; the warm-catch fence holds |
| `proof:aur-metal` 5-bite self-test | **PASS** (in-gate) — M3 planted-`uLightDir`-read reds · M2 streak-only-body reds · M5 cold-catch-literal reds · M1 no-metal-slot reds · M1 frag-only-metal reds |
| `vue-tsc` (`npm run typecheck`) | **PASS** — exit 0, clean |
| Sibling `proof:aur-kuwahara` | **PASS** — booking DECIDED (BUILD); single-pass kuwahara (`uMedium==7`) opt-in default-unchanged; `aurora.wgsl` byte-untouched |
| Sibling `proof:aurora-tensor-field` | **PASS** — 8 tests; uniform threaded shader/names/bridge/map; bestOil strokeOrient swap |
| Sibling `proof:aurora-oilpastel-medium` | **PASS** — `dist/aurora.js` budget inside (gzip 57409/58500) |
| Sibling `proof:composable-return-types` | **PASS** — recompose-hash green |

## 2 · Live route-health arm — PASS (4 captures on disk, real GPU both engines)

The `/substrates/aurora` route renders the DEFAULT `OPENAI_DAWN` **smooth** preset (the studio lead). All four captures read healthy — hero fits its envelope, recessive warm-cream (light) / luminous-dark warm-amber (dark) field, **no conic banding, no oversaturation, calm grain**, motion-purple "Aurora Studio" masthead.

| Engine | Mode | Badge (decoded from pixels) | Capture |
|---|---|---|---|
| Chrome | light | `CHROME · ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` | `BG.W-AUR-METAL-FINISH-assets/chrome-aurora-light.png` |
| Chrome | dark | `CHROME · ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` | `BG.W-AUR-METAL-FINISH-assets/chrome-aurora-dark.png` |
| Safari | light | `WEBKIT · Apple GPU` | `BG.W-AUR-METAL-FINISH-assets/safari-aurora-light.png` |
| Safari | dark | `WEBKIT · Apple GPU` | `BG.W-AUR-METAL-FINISH-assets/safari-aurora-dark.png` |

Computed DOM (Chrome, both modes): `data-capture-ready` set · `glContextCount` = 2 live **webgpu** contexts (the stage `<Aurora>` + the preset-thumbnail baker — the aurora studio's pre-existing footprint, NOT introduced by this wave) · 2 canvases · hero `<h1>` present and within envelope · body text length nominal. Chrome uses **WebGPU** (the WGSL metal path is the one Chrome would exercise — "cursor-raked-WGSL").

## 3 · Metal-medium live arm — **UNVERIFIABLE (the blocker)**

The wave's headline visual criterion — "the metal medium reads as lit metal: localContrast folds, cursor-raked highlight, NO cold catch-light, BOTH modes, dual-engine (aurora metal cards)" — **cannot be captured, because the built metal medium is not reachable anywhere in the running demo.**

**Definitive evidence (Chrome CDP enumeration of the studio Medium picker):**

```
mediumOptions enumerated: ["Smooth","Watercolor","Pastel","Oil","Crayon","Van Gogh","Oil Pastel"]
```

(The picker's enumerated set — NO "Metal", NO "Brushed Metal", NO "Kuwahara".)

There is **no path** to render the metal medium:
- **No picker entry** — `demo/stories/aurora/sections/AuroraCompositionSection.vue` uses a LOCAL `MEDIA` record (`Smooth · Watercolor · Pastel · Oil · Crayon · Van Gogh · Oil Pastel`) that stops at oil-pastel.
- **No preset** — `demo/stories/aurora/presets.ts` has no `medium:"metal"`/`"metal-gradient"` preset (VANGOGH is the only medium-forcing preset; the default is smooth Dawn).
- **No capture param** — `demo/main.ts` `bootCaptureMode` `router.push(route)` carries no medium override, and the story reads no `route.query.medium`.
- The Metal-bearing `mediumOptions` (`demo/stories/aurora/config/options.ts`, which DOES list `Metal`/`Brushed Metal`/`Kuwahara`) is consumed **only for preset LABEL derivation** in `presets.ts` (`MEDIUM_LABEL` map) — never wired into a rendered picker.

Consequence: neither Chrome interaction (no picker entry to click) nor off-screen Safari (no interaction, no preset/param) can render metal. Zero metal-medium PNGs exist. Per the paint bar ("PASS only when every surface in BOTH engines + BOTH modes reads correct AND every capture PNG RESOLVES ON DISK"), the metal surface cannot be read → a PASS would certify "reads as lit metal" with no observation. This is the same class the prior `W-AUR-KUWAHARA-DELTA` flagged (kuwahara opt-in, un-surfaced, deferred) and `RESEARCH.md §275` records ("every committed aurora screenshot is the SMOOTH preset").

## 4 · defectLocalization

- **Primary**: `demo/stories/aurora/sections/AuroraCompositionSection.vue` — the local `MEDIA: Record<string, AuroraMedium>` (≈ lines 25–33) offers 7 mediums; missing `metal` (uMedium 8), `metal-gradient` (uMedium 9), and `kuwahara` (uMedium 7). The studio can never reach the metal medium the wave built.
- **Secondary (deterministic dual-engine capture)**: no non-interactive surfacing path for the off-screen Safari engine — `demo/stories/aurora/presets.ts` has no metal preset; `demo/main.ts` capture boot passes no medium override.

## 5 · mustFix (for the build-fix agent — DEMO SURFACING only; metal src is correct + gate-GREEN)

1. **Surface the built metal medium in the studio picker.** Add `Metal → "metal"`, `Brushed Metal → "metal-gradient"` (and `Kuwahara → "kuwahara"`) to the medium picker in `AuroraCompositionSection.vue`. Prefer sourcing the picker directly off the canonical `mediumOptions` in `demo/stories/aurora/config/options.ts` (single-source) so the studio UI can no longer drift behind the shipped medium enum.
2. **Add a deterministic non-interactive path so BOTH engines render metal for capture.** Add a `medium:"metal"` (warm-folded-metal) preset to `demo/stories/aurora/presets.ts` + `PRESET_KEYS` (mirroring the VANGOGH medium-forcing preset) — a preset lets the C18 `?capture=/substrates/aurora` harness render metal deterministically in Chrome AND off-screen Safari with no interaction. (Alternatively/additionally, a `?...&aurmedium=metal` capture-param path read by the aurora story.)
3. **Re-run the dual-engine paint** (Chrome+Safari, both modes) over the metal render and verify the criteria: localContrast FOLDS (recessive→lit metal, height-field relight) · cursor-raked highlight (WGSL cursor-synth catch, anisotropic streak along the edge-tangent) · NO cold catch-light (warm catch `r≥g≥b`, no cold-hue specular). Also verify `metal-gradient` (uMedium 9, the twinkle-in-place flake sparkle).

## 6 · Provenance / fences

- Operated ONLY under `/Users/mkbabb/Programming/glass-ui`; no `/tmp` artefacts committed; no sibling under `~/Programming` touched. `node scripts/verify-siblings-intact.mjs --quiet` exits 0.
- Capture scripts: `BG.W-AUR-METAL-FINISH-chrome-capture.mjs` (Chrome CDP :9466) + `docs/tranches/BG/audit/wkshot-live.m` (Safari off-screen WKWebView). BUILT bytes on `:5200` (NOT `:5199` dev).
- **No src/demo/styles/scripts edited to "fix" the defect** — recorded only (build-fix agent's job).
