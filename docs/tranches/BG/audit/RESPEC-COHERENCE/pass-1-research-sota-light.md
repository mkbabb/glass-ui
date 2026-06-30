# BG COHERENCE AUDIT — PASS 1 · LENS = SOTA-LIGHT

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `4c761b64` · **Lens:** SOTA-LIGHT (flag MAJOR shifts only).
**Prior SOTA baseline:** this session's `BG.W-GLASS-REFRACT-WEBGL` (`uChromatic` chroma fence + WebGPU-first viz direction).
**Verdict (one line):** NO SOTA shift CONTRADICTS or BLOCKS the BG/BH plan. The material deltas are all CONFIRMATORY / POSITIVE — they DE-RISK C-SAFARI (the dominant cut-risk) — plus one low-severity doc-freshness note and a few WS10 idiomatic-Tailwind awareness notes. The §1.5 identity/SOTA fences HOLD.

---

## 0. Repo version baseline (read off `package.json` this pass)

The prompt names "Tailwind v4.1 / Vue 3.5" as the baseline — **STALE vs disk.** The repo devDeps are already AHEAD:

| Dep | Repo (devDep) | Peer floor | Web-checkable? |
|---|---|---|---|
| `tailwindcss` | `^4.3.1` | `^4.0` | yes — see §3 |
| `vue` | `^3.5.34` | `^3.5` | yes — no 3.6 stable |
| `reka-ui` | `^2.9` | `^2.0` | yes — no material delta |
| `@vueuse/core` | `^14.3.0` | `^14.0` | n/a |
| `vite` | `^8` | — | n/a |
| `vitest` | `^4.1.9` | — | n/a |
| `typescript` | `^6.0.3` | — | n/a |
| `@lucide/vue` | `^1.20.0` | `^1.16.0` | n/a |
| `@mkbabb/keyframes.js` | `^5.1.0` | `^5.0.0` | **NO** — @mkbabb-private, not SOTA-web-checkable |
| `@mkbabb/value.js` | `^1.0.0` (plan bumps peer → `^1.1.1`) | `^1.0.0` | **NO** — @mkbabb-private |

**keyframes.js 5.x / value.js 1.x are @mkbabb-owned private packages — invisible to web search and OUT OF SCOPE for a SOTA lens.** The plan's internal CONSUMEs (kf 5.1.0 `DragOptions.snap`/`Oscillator`; value `^1.1.1` floor for `wcagContrastRatio`) are verifiable only against the published npm tarballs / sibling source, not the web. The `^1.1.1` floor decision (admits npm-latest, avoids the `^1.2.0` peer-conformance red) was already corrected in the AMENDED plan §1.4 — no SOTA input changes it.

---

## 1. C-SAFARI (the dominant cut-risk) — material deltas, ALL positive

The plan's single biggest execution risk (D-CSAFARI ★★★, the 4-tranche chronic). Three deltas, every one DE-RISKS it:

### Δ-1 (MATERIAL, positive) — Safari 26.5 fixed WebGL shader compilation NaN/∞ handling
> "Safari 26.5 includes a fix for WebGL shader compilation to properly handle NaN and infinity values" + new WebGL2 extensions (`EXT_disjoint_timer_query`, `EXT_disjoint_timer_query_webgl2`, `WEBGL_clip_cull_distance`, `EXT_polygon_offset_clamp`, `GPUExternalTexture`).

- The baseline "WebKit 26" in the seed is the **.0**; there are now **.2 / .4 / .5** patch trains shipped. **26.5** specifically hardened WebGL **shader-compile** robustness — the EXACT risk class the plan's renderability fallback ladder (full → drapery-dropped → flat-blur) is built around.
- Directly relevant to the FULL refraction shader (the 2nd `curlFBM` drapery + displacement math): any NaN/∞ intermediate that previously could fail-compile on WebGL-via-Metal is now handled. Reduces the WORST-CASE probability of the renderability fallback firing.
- `EXT_disjoint_timer_query_webgl2` now in Safari 26.5 = GPU-side timing is available on-device — a precision aid for D-G1's "the WebKit compile-time measure" (the C18 harness currently times JS-side; the GPU timer is now an option, not a requirement).
- **Does NOT obviate the fallback ladder.** The "[simple glsl function] kills Safari + WebGL via Metal dead" fragility class (surfaced in search) remains real; the conservative full→drapery-dropped→flat-blur ladder stays correctly motivated. This is a probability reduction, not a removal of the gate. **No plan edit owed; record as a positive build-phase signal for `BG.W-SAFARI-PARITY-GATE`.**

### Δ-2 (MATERIAL, positive) — Safari 26.2 added GPUTexture depth-stencil + resolve attachments in WebGPU render passes
> Safari 26.2: "support for using GPUTexture objects as depth-stencil attachments in rendering operations and resolve attachments in WebGPU render passes."

- This is the exact FBO-handoff machinery the WGSL **Tier-2 FBO-first-pass** needs on `Safari.app navigator.gpu` (D-G1 deferral). The plan asserts "the GPU floor is REAL (FBO handoff renders FRAMEBUFFER_COMPLETE on M5 Metal)" for WebGL2; Safari 26.2 now provides the WebGPU twin (resolve attachments). **De-risks the WGSL Tier-2 path further.** No plan edit owed.

### Δ-3 (CONFIRMATORY) — WebGPU is enabled-by-DEFAULT (no flag) on all Apple platforms; Apple's stance is WebGPU-first
> Safari 26.0 (Sept 2025) ships WebGPU enabled by default on macOS/iOS/iPadOS/visionOS. "WebGPU supersedes WebGL on macOS, iOS, iPadOS, and visionOS and is preferred for new sites and web apps."

- CONFIRMS the plan's WebGPU-first viz direction + the WGSL Tier-2 dual-stack. There is **no flag-gating caveat** to worry about — the WGSL Tier-2 path is shippable to stock Safari 26 users. The WebGL2 Tier-1 floor stays correct for the ~5-10% tail (Linux Firefox, pre-A12 iPhones). The §1.5 "WebGL2+WGSL dual-stack" fence is SOTA-aligned with Apple's own preference.

---

## 2. contrast-color() — low-severity doc-freshness note

### Δ-4 (LOW — doc freshness only) — contrast-color() reached Baseline Newly Available April 2026, cross-engine incl. Firefox 146
> Chrome 147 / Firefox 146 / Safari 26.0 all ship it and all pass WPT (tie-break, color-space conversion, syntax parse identical across engines). Baseline Newly Available since April 2026; Baseline Widely Available not until **2028-10-10**.

- The adaptive-glass legibility leans on `@supports (color: contrast-color(white))` progressive enhancement, and CLAUDE.md names the support window as **"Chrome 147+/Safari 26+"** — it OMITS **Firefox 146**, which now also ships it.
- **Severity LOW, NOT a blocker.** The `@supports`-gated floor remains the correct model: Baseline Widely Available is 2028, so the declarative bucket + native-refinement two-layer design is still mandatory. The only delta is that the native-refinement layer now reaches a THIRD engine (Firefox), strengthening the existing approach. The cross-engine WPT-pass also removes a latent risk that the tie-break differs per engine (it does not).
- **Suggested (optional) doc-freshen:** if W-DOC-FRESHEN / the BH canon-home pass touches the adaptive-glass `contrast-color()` note, widen "Chrome 147+/Safari 26+" → "Chrome 147+/Firefox 146+/Safari 26+ (Baseline Newly Available Apr 2026)". Not owed by any current BG wave; record only.

---

## 3. Tailwind v4.2/v4.3 — WS10 idiomatic-Tailwind awareness notes (no blocker)

The repo is ALREADY on `^4.3.1`, so v4.2/v4.3 are adopted at the version level — these are NOT "since the last SOTA check" surprises that break anything. They are **awareness notes for the planned WS10 `de-shadcn / idiomatic Tailwind v4` wave** (and adjacent WS9/WS3 surfaces):

- **`@container-size` (height container queries).** v4.3 adds size containers so container queries can key on HEIGHT, not just inline-size. RELEVANT to: `InstrumentChassis`'s `@container chassis (...)` blocks (currently inline-size-only) + the `BB.W-DESKTOP-RESERVE` wide-axis chassis reserve. A cleaner idiom MAY exist, but the current `min-block-size` static-reserve is compositor-safe and `proof:no-layout-animation`-clean — do NOT chase a refactor that re-introduces a height container-query if it complicates the CLS≈0 reserve. **Note for WS10, not an edit.**
- **`scrollbar-*` utilities** (`scrollbar-thin/none/auto`, `scrollbar-width`). Adjacent to FadingScroll + the `.scroll-gutter-stable` (`scrollbar-gutter: stable`) discipline. FadingScroll is an EDGE-FADE primitive, not scrollbar styling — these utilities do NOT supersede it. `scrollbar-gutter: stable` is a distinct CSS property the new utilities do not cover. **No fold owed; note only that WS10 may express raw scrollbar styling via the new utilities where any survive.**
- **stacked & compound `@variant` support; `font-features-*`; `zoom-*`/`tab-*`.** General idiomatic-v4 surface WS10 may consume. The `font-features-*` low-level OpenType control is adjacent to the `font-optical-sizing: auto` display-ladder taper (BB.W-DISPLAY-TRACKING) — could express the optical-sizing intent more idiomatically, but the current token-bridge form works. **Note only.**
- **New neutral palettes (mauve / olive / mist / taupe).** NOT RELEVANT — glass-ui's warm-no-gray identity + presets-in-consumers means consumers author their own warm ladder; the library never adopts a Tailwind neutral palette. **Explicitly out of scope; do not adopt.**
- **First-class webpack plugin.** Build-tooling only; glass-ui is Vite/Rolldown. **Irrelevant.**

---

## 4. Vue / reka-ui — no material delta

- **Vue:** repo on `^3.5.34`; no Vue 3.6 stable release surfaced. No SOTA delta.
- **reka-ui:** repo on `^2.9`; the only surfaced change (`ConfigProvider.useId` now precedes Vue's native `useId` on Vue 3.5+ to avoid SSR hydration mismatch) is SSR-specific and glass-ui ships no SSR consumer. No material delta. **Reminder (project-memory `feedback_glass_ui_binding_verification`):** reka-ui prop/emit binding drift (`:pressed`/`v-model:search-term`/`tag=`) silently no-ops and only e2e catches it — this is a STANDING version-bump sweep discipline, NOT a SOTA delta, but the `^2.9` floor + the planned cut should run the binding sweep regardless (already a known friction class, not new).

---

## 5. Net assessment

**No SOTA shift since the last check breaks, contradicts, or re-prioritizes the BG/BH plan.** The four material/relevant deltas:

1. Safari 26.5 WebGL shader-compile NaN/∞ fix + new WebGL2 extensions → **de-risks C-SAFARI full-shader renderability** (the dominant cut-risk).
2. Safari 26.2 WebGPU depth-stencil/resolve attachments → **de-risks the WGSL Tier-2 FBO path**.
3. WebGPU enabled-by-default + Apple's WebGPU-first stance → **confirms the WGSL Tier-2 / WebGPU-first viz direction**.
4. contrast-color() Baseline (Apr 2026, +Firefox 146) → **low-severity doc-freshen** of the support-window note; the `@supports` floor stays mandatory.

The plan's §1.5 identity/SOTA fences — WebGL2+WGSL dual-stack, CSS-SVG `feDisplacementMap` dead on Safari/Firefox, calm-blur divergence, `contrast-color(var(--card))` flips the surface not the ink, K2 chroma fence keyed on `uChromatic` — all HOLD and are SOTA-aligned. **The dominant cut-risk (C-SAFARI) is, if anything, slightly LESS risky than at the last SOTA check, but the conservative fallback ladder stays correctly motivated and should NOT be relaxed on the strength of these patch-train improvements alone (the on-device dual-engine Metal capture remains the binding net — the cardinal-lesson split holds).**

---

## Sources
- [WebKit Features for Safari 26.5](https://webkit.org/blog/17938/webkit-features-for-safari-26-5/) — WebGL shader-compile NaN/∞ fix; new WebGL2 extensions
- [WebKit Features for Safari 26.2](https://webkit.org/blog/17640/webkit-features-for-safari-26-2/) — GPUTexture depth-stencil + resolve attachments in WebGPU render passes
- [WebKit Features in Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/) — WebGPU enabled by default; contrast-color() introduced
- [GPUWeb Implementation Status](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status) — Safari WebGPU shipping
- [Web platform features explorer — contrast-color()](https://web-platform-dx.github.io/web-features-explorer/features/contrast-color/) — Baseline Newly Available Apr 2026, Chrome 147 / Firefox 146 / Safari 26.0
- [Tailwind CSS v4.3 — Scrollbars, new colors, and more](https://tailwindcss.com/blog/tailwindcss-v4-3) — @container-size, scrollbar-*, stacked/compound @variant, font-features-*, neutral palettes
- [reka-ui releases](https://github.com/unovue/reka-ui/releases) — ConfigProvider.useId precedence (SSR-only, n/a)
