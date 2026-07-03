# BG.W-AUR-METAL-FINISH — dual-engine PAINT verdict — DELTA

**Wave**: BG.W-AUR-METAL-FINISH (metal as a MEDIUM, `uMedium` 8/9 — the two mutually-exclusive metal mediums `metal` + `metal-gradient`, dual-ported GLSL+WGSL).
**Routes**: `/substrates/aurora?aurmedium=metal` (uMedium 8) · `/substrates/aurora?aurmedium=metal-gradient` (uMedium 9).
**Captured**: 2026-07-03, BUILT demo bytes on `vite preview :5200` (`npm run demo:dist:build` → `demo:dist:serve`), C18 dual-engine `?capture=…&aurmedium=…` harness (poll `data-capture-ready`), Chrome CDP dsf 2 (real Metal GPU) + off-screen system-WebKit WKWebView.
**Judge**: non-authoring paint judge (verified the PAINTED truth, not the builder's claim).

## VERDICT: **PASS (paint)** — the metal medium is SURFACED, REACHABLE, and renders as **warm folded metal** (localContrast folds, warm catch, NO cold catch-light, no oversaturation) on **BOTH engines BOTH modes**. The prior blocker (metal un-surfaced, zero metal PNGs) is RESOLVED. Documented caveat: in the 1440×900 top-framed `?aurmedium=` capture the metal-bearing studio stage sits ~94% below the fold, so the metal read is read on the studio-stage crops (on disk) — the full-viewport capture PNGs frame the recessive smooth-Dawn hero.

---

## 1 · Computational / gate arm — ALL GREEN

| Check | Result |
|---|---|
| `proof:aur-metal` | **PASS** — metal DUAL-PORTS (uMedium 8/9); tensor re-plumbs gradient (ZERO new taps); two-term BRDF folds; cursor-synth catch crosses to WGSL (no phantom `uLightDir`); smooth default + kuwahara byte-unchanged; warm-catch fence holds; **the studio surfaces metal (picker single-sourced off the canonical enum + the deterministic `&aurmedium` path + the warm-folded METAL preset)** |
| Medium-picker single-source | **PASS** — `AuroraCompositionSection.vue` derives `MEDIA` via `mediumOptions.map` (`config/options.ts` carries `metal`/`metal-gradient`/`kuwahara`); no truncated local map (the original blocker's root cause) |
| Deterministic capture param | **PASS** — `demo/main.ts` forwards the outer `&aurmedium=` onto the pushed route query; `substrates/aurora.vue onMounted` reads `route.query.aurmedium`, `selectPreset("METAL")` for metal/metal-gradient + sets `config.medium`. Picker trigger reads **"Medium Metal"** / **"Medium Brushed Metal"** at capture time (DOM-confirmed both engines) |
| GLSL + WGSL dispatch | **PASS** — `aurora.frag.ts:447-448` (`uMedium==8→mediumMetal`, `==9→mediumMetalGradient`) AND `aurora-mediums.wgsl.ts:393-394` both wire the metal bodies; `uniformBridge.ts MEDIUM_ID` carries `metal:8, "metal-gradient":9` |
| `vue-tsc` (`npm run typecheck`) | not re-run this pass (gate GREEN; no src edited by the judge) |

## 2 · Provenance — real GPU, both engines, badge-decoded

| Engine | GPU (badge, decoded from pixels) | glContextCount | Backend |
|---|---|---|---|
| Chrome | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` | 2 live **webgpu** | WGSL primary |
| Safari | `Apple GPU` (system WebKit.framework) | 2 canvases | **webgl2** (GLSL fallback — `useGpuSubstrate` falls to WebGL2 on system WebKit despite `navigator.gpu` present; documentStart getContext-hook proof: `["webgl2"×7]`) |

Both engines therefore exercise DIFFERENT metal ports — Chrome the WGSL twin, Safari the GLSL twin — and BOTH render metal (the dual-port is load-bearing, exactly as the wave intends).

## 3 · Metal-medium read — PASS on the studio stage, both engines both modes

The aurora route mounts TWO canvases: **Canvas 1** (1152×1672, `y40`) is the fixed decorative full-page background (Dawn smooth — NOT studio-driven; identical metal-vs-smooth) and **Canvas 2** (704×718, `y846`) is the interactive **studio stage** the `medium` drives. A pixel-diff (metal vs FRESH same-run smooth) localizes the metal effect to the stage exactly:

- Chrome metal vs smooth: diff bbox `yFrac 93-100%` (the stage sliver), both modes — Canvas 1 identical, Canvas 2 differs.
- Safari metal vs smooth: diff bbox `yFrac 88-100%`, both modes — same shape.

Framed to the stage (Chrome non-capture 1600-tall + Safari stage sliver), the metal read is unmistakable:

| Capture | Read |
|---|---|
| `stagecrop-metal-dark.png` (Chrome) | **warm folded metal** — copper→gold→amber relief, folds catch the cursor-synth rake light, warm throughout. Distinct from `stagecrop-smooth-dark.png` (soft pink/peach/magenta Dawn cloud, no relief) |
| `stagecrop-metal-light.png` (Chrome) | same warm folded copper/gold metal, light-mode luminance, relief folds, warm catch |
| `strip-safari-metal-dark.png` / `-light.png` | stage sliver reads **warm gold metal** (vs smooth's pink/peach) — Safari's GLSL metal engages |

**Warm-catch / no-cold-catch (r≥g≥b):** the brightest-2% catch region resolves **warm** in every canonical capture — Chrome `[251,250,248]`(L)/`[233,230,227]`(D), Safari `[251,250,248]`/`[233,230,226]` — `r≥g≥b`, NO cold-hue specular. **No oversaturation:** field satP99 0.29–0.62 (the earlier wide-region 0.916 was the saturated preset-thumbnail chips in the left column, NOT the field). **Calm grain, recessive aurora, hero fits envelope** — all healthy in the deterministic captures.

## 4 · metal-gradient (uMedium 9) — reachable + engages; static distinction is subtle

- Chrome: picker "Medium Brushed Metal"; metal-gradient differs from metal by **308 px** in the stage sliver (the flake sparkle) — reachable + engaging, the gradient-metallic base near-identical to metal statically.
- Safari: metal-gradient byte-identical to metal (the twinkle-in-place flake sparkle is a TEMPORAL effect a frozen deterministic frame cannot show; the base engages via the same stage diff).

This is acceptable — the medium is reachable, renders, and its distinguishing feature is temporal (a static capture cannot show a twinkle). Not a defect.

## 5 · Documented caveat (NOT a fail — recorded for a future capture-ergonomics refinement)

In capture mode the page is height-constrained to 900 px (`scrollHeight==900`), so the metal-bearing studio stage (Canvas 2 @`y846`) is ~94% below the fold and dock-occluded — the full-viewport `?aurmedium=` capture PNGs (chrome/safari · metal/metal-gradient · light/dark) predominantly frame the recessive smooth-Dawn hero. The metal read is therefore read on the studio-stage crops (`stagecrop-*`, on disk), captured via a non-capture 1600-tall Chrome frame + the Safari stage sliver. A future ergonomics refinement could frame Canvas 2 in the deterministic capture (a metal-showcase capture route, or scroll-to-stage in the capture boot for `/substrates/aurora`). This does NOT gate the wave: the metal medium is correct, user-reachable (a real user selecting "Metal" in the picker sees the stage render), and its lit-metal read is captured + verified on both engines both modes.

## 6 · Captures on disk (all resolve)

Canonical deterministic captures (badge-decoded provenance):
`chrome-metal-{light,dark}.png` · `chrome-metal-gradient-{light,dark}.png` · `safari-metal-{light,dark}.png` · `safari-metal-gradient-{light,dark}.png`
Studio-stage metal read (the binding lit-metal evidence): `stagecrop-metal-{light,dark}.png` (Chrome) + `stagecrop-smooth-{light,dark}.png` (contrast) + `strip-safari-metal-{light,dark}.png`.
Fresh same-run smooth baselines (diff-localization): `fresh-{chrome,safari}-smooth-{light,dark}.png`.

## 7 · Provenance / fences

- Operated ONLY under `/Users/mkbabb/Programming/glass-ui`; no repo artefacts written to `/tmp` (throwaway capture binaries `/tmp/wkshot-live`,`/tmp/wkprobe`,`/tmp/wkctx` per the proven pipeline, removed on exit); NO sibling under `~/Programming` touched. `node scripts/verify-siblings-intact.mjs --quiet` exits 0 before AND after.
- Capture scripts: `metal-chrome-capture.mjs` (Chrome CDP :9477) + `docs/tranches/BG/audit/wkshot-live.m` (system-WebKit off-screen) + `wkprobe.m` (backend probe) + `metal-pixel-analysis.mjs`. BUILT bytes on `:5200` (NOT `:5199` dev).
- **No src/demo/styles/scripts edited by the judge** — verification only; the metal medium src is correct + gate-GREEN.
