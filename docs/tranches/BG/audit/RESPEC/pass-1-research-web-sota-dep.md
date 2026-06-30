# PASS 1 — WEB-SOTA + DEP-CURRENCY research (the re-spec lens)

**Agent:** WEB-SOTA RESEARCH · **Pass:** 1 (baseline truth) · **Date:** 2026-06-30 · **Branch:** `tranche/BG` · HEAD `9dfe285c`
**Lens:** (a) where does the planned BG/BH 5.0.0 spec LAG or MISALIGN vs current (2026) web SOTA for liquid-glass / iOS-26-27 transmissive material, dock/Siri morph, WebGPU-first viz, native scroll choreography? (b) Dep currency — keyframes.js 5.x · value.js 1.x · reka-ui 2.x · Tailwind v4.1 · Vue 3.5 — any new primitive the re-spec should adopt?
**Fence honored:** read-mostly; wrote ONLY here. `verify-siblings-intact --quiet` → exit 0. No path outside `/Users/mkbabb/Programming/glass-ui` touched.

> NOTE on the identity guardrail (per the lens brief): SOTA is a *check*, not a *mandate*. Where a web idea
> collides with warm-everywhere / no-gray / W-DARK-MATERIAL luminous-dark, I FLAG the tension and record the
> defensible divergence — I do not recommend importing the web idea over the house identity.

> **PASS-1 STANCE:** an earlier draft of this file existed (same lens, same date). This is the BASELINE-TRUTH
> re-verification: every dep-currency claim was re-checked against `node_modules/` on disk (not report faith), the
> booked-CONSUME markers were re-read in live source, and every time-sensitive platform fact was re-searched at
> 2026-06-30. **Three findings CORRECT the earlier draft** (flagged §C): (1) the BorderProgress `oklchSpectrum`
> CONSUME is ALREADY DISCHARGED on disk — not a stale marker to repoint; (2) WebGPU is NOT clean Baseline
> (Firefox stable still default-off; Linux gap across all engines) — strengthens the WebGL2-keep, makes the CLAUDE.md
> "full Baseline" note optimistic; (3) iOS-27 REMOVED the gyroscopic specular and added a darkened-edge + brighter
> *static* specular as its depth device — a new platform-reference detail with bearing on WS6/WS8 motion-specular.

---

## 0 · Installed dep baseline (the currency snapshot — RE-VERIFIED on disk this pass)

Each row re-checked via `node_modules/<pkg>/package.json` `version` (not the peer range, not report faith).

| dep | peer range | dev range | **installed (on disk)** | SOTA-latest (2026) | verdict |
|---|---|---|---|---|---|
| vue | `^3.5` | `^3.5.34` | **3.5.34** | 3.5.x stable; 3.6/Vapor still experimental opt-in | CURRENT — Vapor irrelevant to a component lib |
| reka-ui | `^2.0` | `^2.9` | **2.9.7** | 2.9.x (latest 2.x) | CURRENT |
| @vueuse/core | `^14.0` | `^14.3.0` | **14.3.0** | 14.x | CURRENT |
| tailwindcss | `^4.0` | `^4.3.1` | **4.3.1** | 4.1 shipped text-shadow/mask utils; 4.3.x current | CURRENT (4.1 features available, partly un-adopted — §4) |
| @mkbabb/keyframes.js | `^5.0.0` | `^5.1.0` | **5.1.0** (deps value.js `^1.2.0`) | 5.1.0 | CURRENT — **booked helpers SHIPPED + verified in dist (§3)** |
| @mkbabb/value.js | `^1.0.0` | `^1.0.0` | **1.2.0** (transitive via kf) | 1.2.0 | CURRENT — **rich color surface; floor `^1.0.0` lags installed 1.2.0 (§3)** |
| class-variance-authority | `^0.7` | `^0.7.1` | **0.7.1** | 0.7.x | CURRENT |
| embla-carousel-vue | `^8.0` | `^8.6.0` | **8.6.0** | 8.x | CURRENT |
| @lucide/vue | `^1.16.0` | `^1.20.0` | **1.20.0** | 1.x | CURRENT |
| @mkbabb/pencil-boil | `^0.4.1` optionalPeer | `^0.4.1` | **0.4.1** | 0.4.x | CURRENT |
| perfect-freehand | `^1.2.3` optionalPeer | — | **ABSENT** (vendored `handmark/freehand.ts`) | n/a | **DEAD PEER — WS9 drops it (§3); confirmed absent on disk** |
| tooling | — | — | **vite 8.0.13 · typescript 6.0.3 · vitest 4.1.9 · vue-tsc 3.3.5 · vue-router 4.6.4** | bleeding-edge | AHEAD of curve — no lag |

**Bottom line on dep currency:** the tree is on the *leading* edge across the board (vite 8 / TS 6 / vitest 4 are notably ahead). There is NO version-lag risk anywhere. The dep-currency work for 5.0.0 is the OPPOSITE of upgrading — it is:
1. **firing the now-satisfiable booked CONSUMEs** (kf `snap` + `Oscillator`; the value.js wcag/spectrum surface — §3);
2. **bumping the value.js peer floor `^1.0.0` → `^1.2.0`** to match the WCAG/spectrum import the spec wants (the installed-vs-floor gap; the P6 lens flags the same);
3. **pruning the one dead peer** (perfect-freehand, confirmed absent — WS9).

---

## 1 · Liquid Glass / iOS-26-27 transmissive material — SOTA vs the WS3/WS8 spec

### 1a. The web's 2026 "Liquid Glass" technique (the viral CSS-SVG approach) — gap UNCHANGED, confirmed at 2026-06-30
The de-facto open-source replication of Apple's iOS-26 Liquid Glass is still **SVG `<feDisplacementMap>` refraction + chromatic aberration**, applied as `backdrop-filter: url(#filter)` or `filter: url(#filter)`. Re-searched today, the load-bearing browser fact is UNCHANGED:

- **`backdrop-filter: url()` (SVG filter on the backdrop) works ONLY in Chromium.** Safari & Firefox silently degrade to plain `backdrop-filter: blur()` — the refraction never paints. ([kube.io](https://kube.io/blog/liquid-glass-css-svg/), [LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/), [DesignFast](https://designfast.io/liquid-glass))
- `<feDisplacementMap>` is 8-bit-channel-bound (displacement clamped −128..127px); the popular libs (`nikdelvin/liquid-glass`, `naughtyduk/liquidGL`) all carry the Chromium-only caveat. The recommended perf isolation is `contain: strict` / `contain: paint` — which glass-ui already uses on glass surfaces.

**Verdict — the WS8 spec is AHEAD of, not behind, the popular technique, and the on-disk artifacts prove the architecture is real, not aspirational.** I verified on disk: `src/styles/glass-refract.css` (the Tier-0 CSS floor) + `src/composables/glass/webgpu/glassShader.wgsl` (the WGSL Tier-2) exist, and `docs/tranches/BG/audit/glass-field-shaders.json` carries the Tier-1 GLSL source-of-truth. `BG.W-GLASS-REFRACT-WEBGL` / WS8 builds a **WebGL2 (`glass-refract.glsl.ts`, the Safari-15 floor) + WGSL (`glassShader.wgsl`, the Tier-2 refine) dual-stack** that does NOT depend on the Chromium-only `backdrop-filter:url()`. This is the correct cross-browser architecture for a Safari-first house. **The risk is not the design — it is the execution: the ★★★ C-SAFARI committed real-Metal capture is the single likeliest miss (§8).**

### 1b. iOS 26 → iOS 27 evolution (the platform reference moved — re-confirmed June 2026, with a NEW detail)
iOS 27 (WWDC 2026) **refined** Liquid Glass in direct response to iOS-26 legibility complaints ([MacRumors 06-10](https://www.macrumors.com/2026/06/10/how-liquid-glass-is-changing-in-ios-27/), [Tom's Guide](https://www.tomsguide.com/phones/iphones/ios-27-has-a-bunch-of-changes-including-a-refined-liquid-glass-design-but-how-much-has-changed-from-ios-26), [Tech Times WWDC-2026](https://www.techtimes.com/articles/317975/20260608/apple-liquid-glass-ios-27-wwdc-2026-brings-refinements-developers-must-adopt-today.htm)):

1. **A continuous transparency-STRENGTH slider** (Settings) — ultra-clear → fully-tinted, system-wide.
2. **MORE diffusion of complex backdrops for readability** — Apple *increased* the blur/diffusion.
3. **A DARKENED EDGE around Liquid-Glass elements + BRIGHTER specular highlights** as the depth/separation device. ← **NEW DETAIL the earlier draft missed.**
4. **Sharper icons with selectively-applied refraction** (separate Liquid-Glass icon layers).
5. **★ The gyroscopic (device-motion) specular highlight from iOS-26 was REMOVED in the first iOS-27 developer beta** ([MacRumors](https://www.macrumors.com/2026/06/10/how-liquid-glass-is-changing-in-ios-27/)). Apple replaced the motion-reactive gleam with the darkened-edge + brighter *static* specular.

**Alignments + tensions for the spec:**
- ✅ **Continuous strength knob** — glass-ui's `--glass-level` + `--glass-depth` opt-in + the a11y brackets (`prefers-reduced-transparency`→0, `prefers-contrast: more`→0.3) ARE the iOS-27 slider analogue, and predate it. Strong alignment; no change.
- ✅ **Readability-over-transparency** — the whole adaptive stack (bright-bucket darken, `--on-glass-muted` three-rung, W-DARK-MATERIAL, contrast-color refinement) is the SAME priority iOS-27 just validated. The 5.0.0 direction is on the right side of the platform.
- ✅ **Darkened-edge + brighter specular depth device maps onto EXISTING tokens.** I verified on disk: `--glass-edge-light`/`--glass-edge-light-dark`/`--glass-edge-dispersion` (`glass-fx.css:84,141,305`) + `--glass-specular`/`--glass-specular-dark`/`--glass-specular-size` (`glass-fx.css:69-70,315`) already exist. The iOS-27 "darkened edge + brighter specular" is reachable as a TOKEN RETUNE on these knobs — no new mechanism. WS3/WS8 should record this alignment so the existing edge/specular tokens are the iOS-27 depth device, not a new fork.
- ⚠️ **TENSION — `BG.W-GLASS-BLUR-PEER` dials blur DOWN (calm 8px resting) while iOS-27 dialed diffusion UP.** These reconcile: glass-ui carries legibility via warm-tint-darken + on-glass-fg, NOT via heavy blur, and keeps `--glass-depth` opt-in for surfaces that WANT the iOS-heavy diffusion. **Action: keep the `--glass-depth` deep tier ROBUST and easy to reach** (the platform reference now leans heavier), and record the calm-blur default as a DELIBERATE divergence (the user's "a hair too much"). Do not let "iOS-27 has more blur" reopen the settled calm-default.
- ⚠️ **TENSION (NEW) — iOS-27 dropped device-motion specular.** glass-ui's `useSpecularPointer` / W-LENSING motion-reactive EDGE glint is a POINTER-tracked specular (not gyroscope), which is the right web analogue and still SOTA for a desktop+pointer surface. BUT the spec should note Apple's own turn TOWARD static brighter specular: the pointer-glint is a desktop affordance (keep it), while the *default at-rest* glass should carry the brighter STATIC specular iOS-27 added. The W-LIQUIDHOVER tier-root auto-arm already makes the pointer-glint default-on for interactive glass — fine; just ensure the at-rest static specular is also lifted (the iOS-27 brighter-specular signal). FLAG, don't force.

### 1c. The warm-cream identity vs SOTA — the fence to hold (`contrast-color()` now Baseline)
`contrast-color()` reached **Baseline Newly Available, April 2026** — Chrome 147, Firefox 146, Safari 26.0 ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/contrast-color), [Smashing May-2026 "self-correcting color systems"](https://www.smashingmagazine.com/2026/05/building-self-correcting-color-systems-contrast-color/), [una.im](https://una.im/contrast-color)). Re-confirmed today: **`contrast-color()` returns BLACK or WHITE only** (ties → white). It CANNOT be the warm-amber primary ink without breaking warm-everywhere. glass-ui already anchors the `@supports` flip on the SURFACE (`contrast-color(var(--card))`), not the ink — the correct fence.

**Action: keep the surface-anchor fence; gate-guard it.** The now-Baseline status means the refinement lands universally (the `@supports` gate is no longer Chromium/Safari-only — Firefox 146 added it) — but it must stay a *refinement over* the warm declarative floor, never the primary ink. **The Smashing "self-correcting color systems with contrast-color()" SOTA narrative is real and current — it actively pushes contrast-color as auto-ink — so the identity-erosion risk (a future agent swapping warm ink for black/white auto-ink) is GENUINE and the fence must be machine-guarded** (§8 risk 4). The CLAUDE.md note "Chrome 147+/Safari 26+" is now stale (it's Baseline incl. Firefox 146) — minor doc-currency, mooted by BH's CLAUDE.md delete.

---

## 2 · WebGPU-first viz + dock/Siri morph — SOTA vs WS5/WS6

### 2a. WebGPU is "critical mass" but NOT clean Baseline (CORRECTION) — the WS5 de-migration is STILL right (now MORE so)
Re-searched today: WebGPU is at ~84.68% global support / "critical mass," but **NOT clean Baseline**:
- Chrome/Edge 113+ ✓ stable (desktop + Android 12+).
- Safari 26 ✓ default-on (macOS Tahoe 26 / iOS 26 / iPadOS 26 / visionOS 26).
- **Firefox: 147 enabled WebGPU on Windows + ARM64 macOS (Jan 2026), but it remains DEFAULT-OFF on stable as of mid-2026** (Mozilla citing fingerprinting + driver-stability blockers); **Linux is the gap across ALL engines** (Firefox Nightly-only, Chrome driver-specific rollout). ([web.dev](https://web.dev/blog/webgpu-supported-major-browsers), [gpuweb wiki](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status), [webgpu.com critical-mass](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/), [caniuse webgpu](https://caniuse.com/webgpu))

**CORRECTION to the CLAUDE.md note + the earlier draft:** the CLAUDE.md claim "WebGPU full Baseline … Firefox 141+ (Windows) / 145 (macOS)" and the earlier-draft "WebGPU is now FULL Baseline (Jan 2026)" are **OPTIMISTIC** — WebGPU is critical-mass, not clean Baseline (Firefox stable default-off + Linux gap). This does NOT undermine `BG.W-VIZ-DEMIGRATE` / `BG.W-VIZ-SUBSTRATE-DELETE` (de-migrate fourier-field + constellation off WebGPU onto Canvas2D; delete concentric + paper-grid WGSL; KEEP aurora + dot-flow) — that is a **KISS/perf verdict** ("the viz didn't earn the WGSL+parity-table complexity"), unaffected by support level. **And the correction STRENGTHENS the WebGL2-fallback retention**: the "WebGL2 = graceful path for the ~5-10% tail" is now MORE warranted (Firefox-stable + Linux are a bigger tail than "full Baseline" implied). KEEP both calls. The CLAUDE.md note is stale (mooted by BH delete); any WS5/WS12 doc should state "critical-mass, NOT clean Baseline — WebGL2 fallback load-bearing."

### 2b. Dock + Siri morph — the references are Apple's Dynamic Island / Siri-in-the-Island
Re-confirmed: **Siri is moving INTO the Dynamic Island with a Liquid-Glass look in iOS 27** ([AndroidHeadlines](https://www.androidheadlines.com/2026/05/apple-siri-redesign-ios-27-features-images.html), [MacRumors icons](https://www.macrumors.com/2026/06/16/ios-27-revamps-app-icons/)). Liquid Glass "refracts wallpaper hues, animates specular highlights, and morphs UI chrome in real time." The WS6 Siri band (glass island on a √φ `--siri-island-t` scalar, warm prismatic waveform, "Search or Ask" pill composing the existing `useDockSearch`) is squarely this reference, and the gating discipline (`useDockSpring` from WS2 a HARD precondition; ONE spring family, ZERO new `SpringProgress`) is sound. `BG.W-SIRI-WAVEFORM` being WebGL2-only (one GLSL fullscreen pass, no WGSL/compute) is fine — a single lens-flare pass needs no compute. **No SOTA lag.** The `useDockSpring` factory (5 SpringProgress sites → 1) is the right consolidation given kf 5.1.0.
- ⚠️ **One note from §1b:** the Siri/Island morph specular should ride the iOS-27 darkened-edge + brighter-*static*-specular model (Apple dropped gyroscopic motion-specular). The pointer-tracked glint is fine as a desktop affordance, but the at-rest island should read with the brighter static specular, not depend on motion.

### 2c. Same-document View Transitions are now Baseline (incl. Firefox 144) — promote the deferred enhancement
Re-confirmed today: same-doc VT reached **Baseline Newly Available (Oct 2025)** — Chrome 111+, **Firefox 144+** (the FF gap closed), Safari 18+ ([web.dev](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available), [MDN ViewTransition](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition)). Cross-document VT: Chromium 126+ / Safari 18.2+ / **Firefox NOT yet** — but glass-ui is a SAME-DOC SPA (vue-router), so cross-doc is irrelevant.

The WS1 `BG.W-ROUTE-TRANSITION` correctly **collapses the 4-mechanism route pile to a bare keyed atomic swap** + deletes 2 no-op `startViewTransition` calls — the atomic-floor-first pattern is SOTA-correct (never *depend* on VT). `BG.W-VT-ROUTE-ENHANCE` (currently **DEFERRED/optional**) re-adds `navigate()` behind `supportsRouteTransitions()` as additive over the floor.
**AMEND: same-doc VT is now Baseline INCLUDING Firefox 144 → the enhancement is broadly viable (it was Chromium+Safari only when the spec was written). PROMOTE `BG.W-VT-ROUTE-ENHANCE` from optional to a real (still-additive, PRM-gated) wave at W-REFLECT3 — the liquid-weight route morph the user keeps asking for.** The atomic floor stays the binding contract; VT is a progressive layer. (Same applies to the goo-morph pager/deck-dot state transitions the liquid-weight memory calls for — same-doc VT can power some natively now. Flag, don't force.)

---

## 3 · Booked cross-repo CONSUMEs — RE-VERIFIED on disk (the concrete dep-currency action for 5.0.0)

This is the highest-value dep-currency finding. I re-read the dist `.d.ts` AND the live source markers (not report faith):

| booked consume | spec home | **status RE-VERIFIED on disk** | action for 5.0.0 |
|---|---|---|---|
| kf `DragOptions.snap` (native fling-to-snap) | `useDragMorph.ts` (W-DRAG-MORPH) | **SHIPPED + VERIFIED** — `keyframes.d.ts:1129` `snap?: number[]` IS present in the `DragOptions` interface, doc'd "On release, the spring's projected resting point (via `decayRest`) selects the nearest target." | **FIRE** — drop the interim hand-rolled `reset`+`decayRest`+`spring.target` snap-projection; wire the native `snap` option |
| kf `Oscillator` (loop playback / idle breathe) | EasingPicker `loop` seam; `useVizChoreography` idle-loop | **SHIPPED + VERIFIED** — `keyframes.d.ts:2189` `export declare class Oscillator` + `OscillatorConfig` (`:2232`) | **READY** — ≥2 consumers (EasingPicker loop + viz idle) → compose where the loop seams are |
| value.js `oklchSpectrum` (OKLCH shorter-hue spectrum walk) | BorderProgress `spectrum-walk.ts` | **★ ALREADY DISCHARGED (CORRECTION).** `spectrum-walk.ts:22` imports `sampleColorRamp` from `@mkbabb/value.js`; `:90` calls `sampleColorRamp(stopToColor(a), stopToColor(b), segCount, { space:"oklch", hueMethod:"shorter" })`. The README (`border-progress/README.md:37`) states the `0.13.0 oklchSpectrum` interim "is DISCHARGED — the walk re-points onto the published helper." **NO live dangling `// CONSUME(...0.13.0...)` marker exists in any `.ts`/`.vue` source** (verified: the only `0.13.0` source hit is an unrelated `metaball.frag.ts:77` shader frequency-ratio comment). | **NO ACTION — already done.** The earlier draft's "amend the stale marker" is moot. The 5.0.0 cut should NOT claim this as an outstanding consume. |
| hand-rolled wcag luminance (WS4 `W-AMBIENT-HISTOGRAM-LEAF` carve) | `useGlassBackdropLuminance` leaf | value.js 1.2.0 ships **`wcagRelativeLuminance` + `wcagContrastRatio` + `contrastColor`** (verified in dist). Hand-rolled luminance EXISTS on disk: `backdropSampleMath.ts:16` (`0.2126·linearize(r)+0.7152·…`) + `auroraFallbackGround.ts:87-88` (`relativeLuminance`, re-exported via `aurora/index.ts:77`). | **EVALUATE (the live actionable color-core fold).** `proof:single-color-core` wants ONE color math source; the `backdropSampleMath` luminance could CONSUME value.js `wcagRelativeLuminance`. **CAVEAT:** the aurora `auroraFallbackGround` luminance is in a LINEAR-light context (no sRGB-EOTF), distinct from WCAG's gamma-decode — they are NOT the same formula; do NOT blindly fold the aurora one. Fold the `backdropSampleMath` one (the WCAG-context sampler) if it linearizes the same way; flag for the WS4 carve. |
| perfect-freehand optionalPeer | `package.json` (still listed `^1.2.3`) | **CONFIRMED ABSENT on disk** (`node_modules/perfect-freehand` does not exist); handmark uses vendored `freehand.ts` | **FIRE** — WS9 drops the dead peer. If WS9 slips, a stale dead peer ships in 5.0.0 |

**value.js 1.2.0 is a RICH surface** the spec under-consumes (all VERIFIED present in dist this pass): `deltaEOK` (the gpu-substrate parity ΔE bar — already aligned), `sampleColorRamp`, `mixColorsN`, `gamutMapOKLab`, `srgbToOKLab`, `oklabToLinearSRGB`, `contrastColor`, `wcagContrastRatio`, `wcagRelativeLuminance`, the easing catalogue (`steppedEase`/`bezierPresets`/`parseSpring`/`interpolateHue`). **The concrete 5.0.0 action is the peer-floor bump `^1.0.0` → `^1.2.0`** so the WCAG/spectrum import the spec wants is contractually available (the installed tree is already 1.2.0 transitively via kf, but the peer FLOOR lags — a consumer pinning `^1.0.0` would not get the helpers). The 5.0.0 cut should re-audit which hand-rolled color helpers fold onto value.js 1.2.0 (the `backdropSampleMath` luminance is the clearest candidate).

---

## 4 · Tailwind v4.1 — adoption is MOSTLY a non-gap (token-first is already more SOTA)

Tailwind v4.1 (shipped; tree on 4.3.1) added `text-shadow-*`, `mask-*` (edge/radial/conic/linear), colored `drop-shadow-*`, `overflow-wrap`, and `user-valid`/`user-invalid`/`noscript`/`inverted-colors`/`pointer-*` variants ([Tailwind blog](https://tailwindcss.com/blog/tailwindcss-v4-1)). Cross-checked against the tree:

- **`text-shadow` — already token-first.** `theme/literals.css` FORBIDS raw `text-shadow:` literals; everything reads `--text-shadow-depth`/`--text-shadow-engraved`. The v4.1 `text-shadow-*` utilities are an *alternative*, not an upgrade. **Non-gap.**
- **`mask-*` — partial at best.** BorderProgress + Progress-sectioned hand-roll `mask-composite: exclude/xor` for the border-band conic ring. The v4.1 `mask-conic-*`/`mask-radial-*` utilities express mask GRADIENTS but do NOT cover `mask-composite` border-band compositing — so they cannot DRY the BorderProgress trick. `BG.W-TAILWIND4-IDIOM` (WS10-3) should **explicitly record "evaluated, not applicable"** so the next audit doesn't re-flag it.
- **colored `drop-shadow-*`** — metal-glow / completion-seal use tokenized `filter: drop-shadow(... --metal-glow-*)`. Token-first wins; non-gap.
- **`user-invalid` variant** — 29 raw `:user-invalid` sites in CSS (token-first `.input-pill` recipe). The v4.1 variant is utility-class authoring; the house CSS recipe is fine. Non-gap.

**Verdict: glass-ui's token-first / `@theme`+`@utility` discipline is *ahead* of utility-class idiom; v4.1's new utilities do not represent a real lag.** The one action: `W-TAILWIND4-IDIOM` annotates the v4.1 mask/text-shadow evaluation as a recorded no-op so it isn't mistaken for un-done modernization.

---

## 5 · Native scroll choreography — the @supports + JS-fallback dual-path is SOTA-correct (Firefox STILL flagged)

Re-confirmed today: CSS scroll-driven animations (`scroll()`/`view()`/`timeline-scope`): Chrome 115+ full, Safari 26 **full**, **Firefox STILL partial behind `layout.css.scroll-driven-animations.enabled` (NOT Baseline as of March 2026; Nightly default-on only)** ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations), [caniuse animation-timeline](https://caniuse.com/mdn-css_properties_animation-timeline_scroll)). The WS1 `BG.W-SCROLL-PROGRESS-RAIL` + WS11 scroll-choreography use `@supports (animation-timeline: …)` primary + a JS `useScrollProgress` fallback — **the correct dual-path** (the `@supports` gate returns false for stable Firefox → JS path covers it). Two notes:
- Firefox (when the flag IS on) requires a non-zero `animation-duration` (e.g. `1ms`) or the scroll animation doesn't apply — re-confirmed gotcha. Low risk since stable Firefox is flagged-off; only matters if the spec wants the flagged-Firefox path to work (then recipes need `1ms`).
- `timeline-scope` (the WS11 `.scroll-pin` keystone) works in Chromium + Safari 26 but NOT Firefox — the `@supports` probe + static-non-pinned fallback the spec specifies is the right call. KEEP.

---

## 6 · reka-ui 2.9 — the WS7 date/calendar BUILD is well-supported

reka-ui ships stable `Calendar`, `RangeCalendar`, `DateField`, `DateRangeField`, `DatePicker`, `DateRangePicker`, `TimeField`, and **`Stepper`** primitives ([reka-ui.com](https://reka-ui.com/docs/components/calendar)). The WS7 Band-4 `BG.W-DATE-CALENDAR` ("reka-ui BUILD") is sound on a current primitive (installed 2.9.7). **Bonus:** reka's `Stepper` (linear/non-linear, keyboard-nav) is available if a multi-step flow surfaces; `NumberField` (already reka) is where the spec mints `--opacity-disabled-strong` for the steppers. No lag; the reka-2.x surface fully covers the planned BUILDs.

---

## 7 · Triage summary (keep / amend / restart — my lens, grounded on the re-verified disk truth)

**LANDED bands (SOTA/dep soundness — code-verification is other agents' lenses):**
- WS1 `ROUTE-TRANSITION` (atomic swap + VT no-op delete) — **keep-verified**; atomic-floor-first is SOTA-correct.
- WS1 `FIELD-AURORA` (recessive warm shell aurora, 1-GL-per-route) — **keep-verified**; aligns with iOS-27 recessive-field + budget.
- WS1 `SCROLL-PROGRESS-RAIL` (native scroll() + JS fallback) — **keep-verified**; dual-path correct given Firefox-flagged.
- WS3 `GLASS-BLUR-PEER` (calm 8px) — **amend (watch)**: defensible warm-tint legibility path, but iOS-27 moved toward MORE diffusion + darkened-edge + brighter specular — keep `--glass-depth` deep tier robust; record the calm-blur divergence as deliberate.

**PENDING bands (the bulk):**
- WS8 glass-deep (WebGL2+WGSL refraction dual-stack, in-shader field-refraction, two-pass-in-one-context) — **keep**, SOTA-AHEAD of the Chromium-only CSS-SVG approach; prototype-proven on real M5 Max Metal; the K2 chroma fence (refraction = DEPTH/luminance not hue; metal read via anisotropic OPTICS, NOT `saturate`) aligns EXACTLY with the iOS-27 luminance-only specular finding. The C-SAFARI committed capture is the chronic risk, not the design.
- WS5 viz de-migrate + WGSL-substrate-delete — **keep**; KISS verdict unaffected by WebGPU support level; WebGL2 fallback NOW MORE warranted (Firefox-stable default-off + Linux gap — NOT clean Baseline).
- WS6 Siri (island + waveform + dock-search pill) — **keep**; Siri-in-the-Island/Dynamic-Island references confirmed; sound `useDockSpring` gating. Note: ride the iOS-27 brighter-STATIC-specular model (Apple dropped gyroscopic motion-specular).
- WS1 `VT-ROUTE-ENHANCE` (deferred) — **amend**: same-doc VT now Baseline incl Firefox 144 → PROMOTE from optional to a real additive PRM-gated wave (liquid-weight route morph).
- WS10 `TAILWIND4-IDIOM` — **amend**: explicitly record the v4.1 mask/text-shadow evaluation as a no-op (token-first already wins).
- BorderProgress/EasingPicker/useDragMorph booked CONSUMEs — **amend**: FIRE the now-shipped kf `snap` + `Oscillator`; bump value.js floor `^1.0.0`→`^1.2.0`; drop the dead perfect-freehand peer. **NOTE: the BorderProgress `oklchSpectrum` consume is ALREADY DISCHARGED — do not re-list it.**
- WS4 `W-AMBIENT-HISTOGRAM-LEAF` luminance — **amend/evaluate**: fold `backdropSampleMath` luminance onto value.js `wcagRelativeLuminance` (NOT the aurora linear-light one — different formula).
- WS7 `DATE-CALENDAR` (reka BUILD) — **keep**; well-supported on reka 2.9.7.

**RESTART: none.** No SOTA finding warrants a restart of any band.

---

## 8 · Risks at the 5.0.0 cut (my lens)

1. **★★★ C-SAFARI refraction capture (HIGH).** SOTA RE-confirms the Safari `backdrop-filter:url()` SVG-refraction gap is REAL and UNCHANGED in 2026 — so the WS8 WebGL2/WGSL shader path is NECESSARY, not optional. The WS8 spec itself flags this as a **3-wave chronic miss** (BE.W-LENS-SAFARI / BE.W-SAFARI-CAPTURE / BF.W-SAFARI-CAPTURE each specced a real-WebKit decode, NONE landed). The committed real-Metal-Safari gestalt capture by a non-authoring agent (R2) + the Tier-2 `array<vec4f,8>` JS uniform-writer wiring (R9 — "compiles ≠ is the Tier-2 rung") are the unproven residual. My research raises its priority: it is not gold-plating, it is the ONLY cross-browser refraction proof. If WS8 slips to a CSS-SVG path under time pressure, Safari breaks.
2. **Safari `-webkit-backdrop-filter` var()-flat-paint bug (MEDIUM).** Confirmed real (MDN #25914 lineage). `BG.W-SAFARI-BLUR-LITERAL`'s resolved-literal emission is the correct fix. If the literal-px drifts from the unprefixed arm, Safari blur silently mis-paints — the value-correctness gate arm is load-bearing.
3. **Booked-CONSUME staleness (MEDIUM, now LOWER).** kf `snap`/`Oscillator` shipped + verified; perfect-freehand confirmed dead; value.js `oklchSpectrum` is ALREADY DISCHARGED (correction — lower risk than the earlier draft implied). The remaining live action is FIRE the snap/Oscillator + bump the value.js floor + drop perfect-freehand. If the cut does NOT do these, the "consume-and-delete cadence" claim is false at tag and the no-silent-drop ledger should catch it. A `^1.0.0` value.js floor in a 1.2.0-import world is a visible staleness smell.
4. **Identity erosion via now-Baseline `contrast-color()` (IDENTITY, HIGH-SALIENCE).** With `contrast-color()` Baseline 2026 (Chrome 147 / FF 146 / Safari 26) and the live Smashing "self-correcting color systems" SOTA narrative actively pushing it as auto-ink, a future agent could swap warm-amber ink for black/white auto-ink and silently break warm-everywhere. The surface-anchor fence (flip the SURFACE, never the ink) must hold and be GATE-GUARDED.
5. **iOS-27 specular/blur divergence (LOW-MEDIUM).** The platform increased diffusion + darkened-edge + brighter-static-specular AND dropped gyroscopic motion-specular; glass-ui's calm-blur + pointer-glint diverge deliberately. Risk is a future "match iOS-27" reopening the user's settled calm-default. Record both divergences (calm-blur; pointer-glint-over-gyro) as deliberate NOW. Also: make sure the AT-REST static specular is the brighter iOS-27 register, not motion-dependent.
6. **WebGPU not-clean-Baseline (LOW, doc-currency).** CLAUDE.md "full Baseline / FF 141+" is optimistic (FF stable default-off + Linux gap). Mooted by BH CLAUDE.md delete, but any WS5/WS12 doc inheriting the claim should say "critical-mass, NOT clean Baseline — WebGL2 fallback load-bearing."
7. **Scroll-driven Firefox gap (LOW).** Acceptable via @supports + JS fallback; risk only if a scroll recipe ships without the JS path.
8. **Dead perfect-freehand peer (LOW).** Still listed at HEAD; WS9 drops it — if WS9 slips, a stale dead peer ships.

---

## 9 · One-line verdict
The 5.0.0 spec is **SOTA-sound and dep-current** — notably *ahead* of the popular Chromium-only CSS-SVG liquid-glass technique (the WebGL2/WGSL refraction is the correct cross-browser bet, prototype-proven on real Metal), validated by iOS-27's readability-over-transparency turn, and its K2 chroma fence (metal = luminance-only OPTICS, never `saturate`) aligns precisely with iOS-27's luminance-only specular. The concrete pass-1 dep-currency actions are now NARROWER than the earlier draft: (a) **fire the now-shipped kf `snap`/`Oscillator`** + **bump value.js floor `^1.0.0`→`^1.2.0`** + **drop the dead perfect-freehand peer** (the `oklchSpectrum` consume is ALREADY discharged — do not re-list); (b) **promote the deferred VT route-enhance** now same-doc VT is Baseline incl Firefox; (c) **hold the warm-cream fence** against now-Baseline `contrast-color()` auto-ink — while treating the ★★★ C-SAFARI committed capture (the 3-wave chronic) as THE gating execution risk, not gold-plating. WebGPU is critical-mass not clean-Baseline → the WebGL2-fallback keep is MORE warranted, not less.

---

### Appendix — disk verifications performed this pass (the baseline-truth ledger)
- `verify-siblings-intact --quiet` → exit 0.
- Installed versions read from `node_modules/<pkg>/package.json`: vue 3.5.34, reka-ui 2.9.7, @vueuse/core 14.3.0, tailwindcss 4.3.1, **keyframes.js 5.1.0** (deps value.js ^1.2.0), **value.js 1.2.0**, cva 0.7.1, embla 8.6.0, @lucide/vue 1.20.0, @mkbabb/pencil-boil 0.4.1, **perfect-freehand ABSENT**, vite 8.0.13, TS 6.0.3, vitest 4.1.9, vue-tsc 3.3.5.
- kf dist `.d.ts`: `DragOptions.snap?: number[]` @1129 ✓ · `class Oscillator` @2189 + `OscillatorConfig` @2232 ✓ · `class Draggable`/`class SpringProgress`/`springTimingFunction` present ✓.
- value.js dist `.d.ts` exports VERIFIED present: `sampleColorRamp`, `mixColorsN`, `interpolateHue`, `gamutMapOKLab`, `wcagRelativeLuminance`, `wcagContrastRatio`, `contrastColor`, `deltaEOK`, `srgbToOKLab`, `oklabToLinearSRGB`, `parseSpring`, `steppedEase`, `bezierPresets`. No literal `oklchSpectrum` (the capability ships as `sampleColorRamp`+`interpolateHue("shorter")`).
- Source markers: `spectrum-walk.ts:22` imports `sampleColorRamp` from value.js + `:90` calls it (CONSUME DISCHARGED); `border-progress/README.md:37` confirms discharge; NO live `0.13.0`/`oklchSpectrum` marker in any `.ts`/`.vue` (only an unrelated `metaball.frag.ts:77` shader-frequency comment).
- Hand-rolled luminance on disk: `backdropSampleMath.ts:16` + `auroraFallbackGround.ts:87-88` (the WS4 value.js-fold candidates; aurora one is linear-light, NOT WCAG-formula).
- Glass tokens for the iOS-27 edge/specular depth device: `--glass-edge-light`/`-light-dark`/`-dispersion` + `--glass-specular`/`-dark`/`-size` present in `glass-fx.css` + `dark-arm.css`.
- WS8 artifacts on disk: `src/styles/glass-refract.css`, `src/composables/glass/webgpu/glassShader.wgsl`, `docs/tranches/BG/audit/glass-field-shaders.json`, the pass3-converged spec (K2 chroma fence + Tier-1 WebGL2/Tier-2 WGSL ladder + M5 M6 Metal evidence).
