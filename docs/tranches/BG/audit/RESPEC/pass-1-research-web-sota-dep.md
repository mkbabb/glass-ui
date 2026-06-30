# PASS 1 — WEB-SOTA + DEP-CURRENCY research (the re-spec lens)

**Agent:** WEB-SOTA RESEARCH · **Pass:** 1 (baseline truth) · **Date:** 2026-06-30 · **Branch:** `tranche/BG` · HEAD `9dfe285c`
**Lens:** (a) where does the planned BG/BH 5.0.0 spec LAG or MISALIGN vs current (2026) web SOTA for liquid-glass / iOS-26-27 transmissive material, dock/Siri morph, WebGPU-first viz, native scroll choreography? (b) Dep currency — keyframes.js 5.x · value.js 1.x · reka-ui 2.x · Tailwind v4.1 · Vue 3.5 — any new primitive the re-spec should adopt?
**Fence honored:** read-mostly; wrote ONLY here. `verify-siblings-intact --quiet` → exit 0. No path outside `/Users/mkbabb/Programming/glass-ui` touched.

> NOTE on the identity guardrail (per the lens brief): SOTA is a *check*, not a *mandate*. Where a web idea
> collides with warm-everywhere / no-gray / W-DARK-MATERIAL luminous-dark, I FLAG the tension and record the
> defensible divergence — I do not recommend importing the web idea over the house identity.

---

## 0 · Installed dep baseline (the currency snapshot — verified on disk)

| dep | peer range | installed | SOTA-latest (2026) | verdict |
|---|---|---|---|---|
| vue | `^3.5` | **3.5.34** | 3.5.x stable; 3.6/Vapor still experimental opt-in | CURRENT — Vapor irrelevant to a component lib |
| reka-ui | `^2.0` (dev `^2.9`) | **2.9.7** | 2.9.x (latest 2.x) | CURRENT |
| @vueuse/core | `^14.0` | **14.3.0** | 14.x | CURRENT |
| tailwindcss | `^4.0` (dev `^4.3.1`) | **4.3.1** | 4.1 shipped text-shadow/mask utils; 4.3.x current | CURRENT (4.1 features available, partly un-adopted — §4) |
| @mkbabb/keyframes.js | `^5.0.0` (dev `^5.1.0`) | **5.1.0** | 5.1.0 | CURRENT — **booked helpers now SHIPPED (§3)** |
| @mkbabb/value.js | `^1.0.0` | **1.2.0** | 1.2.0 | CURRENT — **rich color surface, booked CONSUME re-pointable (§3)** |
| class-variance-authority | `^0.7` | 0.7.1 | 0.7.x | CURRENT |
| embla-carousel-vue | `^8.0` | 8.6.0 | 8.x | CURRENT |
| @lucide/vue | `^1.16.0` | 1.20.0 | 1.x | CURRENT |
| perfect-freehand | `^1.2.3` optionalPeer | **NOT installed** (vendored `handmark/freehand.ts`) | n/a | **DEAD PEER — WS9 correctly drops it (§3)** |
| tooling | — | vite `^8` · typescript `^6` · vitest `^4` · vue-tsc `^3.3` | bleeding-edge | AHEAD of curve — no lag |

**Bottom line on dep currency:** the tree is on the *leading* edge across the board (vite 8 / TS 6 / vitest 4 are notably ahead). There is NO version-lag risk. The dep-currency work for 5.0.0 is the opposite of upgrading: it is **firing the now-satisfiable booked CONSUMEs** (§3) and **pruning the one dead peer**.

---

## 1 · Liquid Glass / iOS-26-27 transmissive material — SOTA vs the WS3/WS8 spec

### 1a. The web's 2026 "Liquid Glass" technique (the viral CSS-SVG approach)
The de-facto open-source replication of Apple's iOS-26 Liquid Glass is **SVG `<feDisplacementMap>` refraction + chromatic aberration**, applied either as `backdrop-filter: url(#filter)` or `filter: url(#filter)`. The load-bearing browser fact, unchanged in 2026:

- **`backdrop-filter: url()` (SVG filter on the backdrop) works ONLY in Chromium.** Safari and Firefox silently fall back to a plain blur — the refraction never paints. ([kube.io](https://kube.io/blog/liquid-glass-css-svg/), [LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/))
- **`filter: url()` (SVG filter on the element itself) refracts cross-browser** but distorts the element's OWN pixels, not the live backdrop — a different effect.

**Verdict — the WS8 spec is AHEAD of, not behind, the popular technique.** `BG.W-GLASS-REFRACT-WEBGL` builds a **WebGL2 (`glass-refract.glsl.ts`) + WGSL (`glassShader.wgsl`) dual-stack** refraction with anisotropic flow-aligned specular and rim chromatic dispersion (0.02–0.03) — a cross-browser path that does NOT depend on the Chromium-only `backdrop-filter:url()`. The crude SVG-displacement squircle profile already present (`#glass-refract` in W-LENSING) is the Tier-1 floor; the shader is the higher-fidelity tier. This is the correct architecture for a Safari-first house. **The risk is not the design — it is execution: the spec's own ★★★ C-SAFARI capture is the single likeliest miss (§risks).**

### 1b. iOS 26 → iOS 27 evolution (the platform reference moved — June 2026)
iOS 27 (current, WWDC 2026) **refined** Liquid Glass in direct response to iOS-26 legibility complaints ([Tom's Guide](https://www.tomsguide.com/phones/iphones/ios-27-has-a-bunch-of-changes-including-a-refined-liquid-glass-design-but-how-much-has-changed-from-ios-26), [Cult of Mac](https://www.cultofmac.com/news/liquid-glass-changes-ios-27-macos-27), [AppleInsider](https://appleinsider.com/articles/26/06/08/ios-27-gets-better-liquid-glass-and-more-responsiveness)):

1. **A continuous transparency-STRENGTH slider** replaced the binary clear/tinted toggle — system-wide control over glass strength.
2. **MORE diffusion + MORE depth/separation for readability** — Apple *increased* the blur/diffusion of complex backdrops and added separation, because iOS-26 glass was too transparent to read.
3. Separate Liquid-Glass *layers* on icons for sharper definition.

**Two alignments + one tension for the spec:**
- ✅ **Continuous strength knob** — glass-ui's `--glass-level` (opacity+blur scalar) + `--glass-depth` (opt-in deep tier) + the a11y brackets (`prefers-reduced-transparency`→0, `prefers-contrast: more`→0.3) ARE the iOS-27 slider analogue, and predate it. Strong alignment; no change needed.
- ✅ **Readability-over-transparency** — the spec's whole adaptive stack (bright-bucket darken, `--on-glass-muted` three-rung family, W-DARK-MATERIAL luminous-dark, contrast-color refinement) is the SAME priority iOS-27 just validated. The 5.0.0 direction is on the right side of the platform.
- ⚠️ **TENSION — `BG.W-GLASS-BLUR-PEER` dials blur DOWN (calm 8px resting) while iOS-27 dialed diffusion UP.** These reconcile (glass-ui carries legibility via warm-tint-darken + on-glass-fg, NOT via heavy blur, and keeps `--glass-depth` opt-in for surfaces that WANT the iOS-heavy diffusion) — but the spec should keep the `--glass-depth` deep tier *robust and easy to reach*, because the platform reference now leans heavier. Record the divergence as deliberate; do not let "iOS-27 has more blur" reopen the calm-default the user explicitly asked for ("a hair too much").

### 1c. The warm-cream identity vs SOTA — the fence to hold
`contrast-color()` reached **Baseline 2026 (April)** — Chrome 147, Firefox 146, Safari 26, all passing WPT ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/contrast-color), [Smashing May 2026](https://www.smashingmagazine.com/2026/05/building-self-correcting-color-systems-contrast-color/)). The SOTA narrative ("self-correcting color systems with contrast-color()") pushes `contrast-color()` as the AUTO-INK. **`contrast-color()` returns BLACK or WHITE only** — it CANNOT be the warm-amber primary ink without breaking warm-everywhere. glass-ui already anchors the `@supports` flip on the SURFACE (`contrast-color(var(--card))`), not the ink — the correct fence. **Action: keep the surface-anchor fence; the now-Baseline status means the refinement lands universally (the `@supports` gate is no longer Chromium/Safari-only), but it must stay a *refinement over* the warm declarative floor, never the primary ink.** The CLAUDE.md note "Chrome 147+/Safari 26+" is now stale (Firefox 146 added it; it's Baseline) — minor doc-currency, mooted by BH's CLAUDE.md delete.

---

## 2 · WebGPU-first viz + dock/Siri morph — SOTA vs WS5/WS6

### 2a. WebGPU is now FULL Baseline (Jan 2026) — but the WS5 de-migration is still right
WebGPU shipped Baseline across all major engines: Chrome/Edge 113+, Safari 26 (macOS Tahoe/iOS 26), Firefox 141 (Windows) / **145 (macOS Apple Silicon)** ([web.dev](https://web.dev/blog/webgpu-supported-major-browsers), [webgpu.com](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/)). The CLAUDE.md note ("Chrome/Edge 113+, Safari 26+, Firefox 141+") is essentially current.

**This does NOT undermine `BG.W-VIZ-DEMIGRATE` / `BG.W-VIZ-SUBSTRATE-DELETE`** (de-migrate fourier-field + constellation off WebGPU onto Canvas2D; delete concentric + paper-grid WGSL; KEEP aurora + dot-flow). That is a **KISS/perf verdict** ("the viz didn't earn the WGSL+parity-table complexity"), not a support-gap verdict — baseline-everywhere doesn't make a needless second substrate worth maintaining. **And the WebGL2 fallback retention is STILL warranted**: WebGPU on **Linux Firefox is not yet shipped**, and pre-A12 iPhones lack it. The spec's "WebGL2 = graceful path for the ~5-10% tail" holds. KEEP both calls.

### 2b. Dock + Siri morph — the references are Apple's Dynamic Island / Siri glow
The WS6 Siri band (glass island on a √φ `--siri-island-t` scalar, warm prismatic waveform, "Search or Ask" pill composing the existing `useDockSearch`) is squarely the iOS Dynamic-Island / Siri-orb reference, and the gating discipline (`useDockSpring` from WS2 is a HARD precondition; ONE spring family, ZERO new `SpringProgress`) is sound. The `BG.W-SIRI-WAVEFORM` being WebGL2-only (one GLSL pass, no WGSL) is fine — a single fullscreen lens-flare pass does not need compute. **No SOTA lag.** The `useDockSpring` factory (5 SpringProgress sites → 1) is the right consolidation given keyframes 5.1.0 (§3).

### 2c. Same-document View Transitions are now Baseline (incl. Firefox) — promote the deferred enhancement
Same-document VT reached **Baseline Newly Available (Oct 2025)**: Chrome 111+, **Firefox 144+** (the Firefox gap closed), Safari 18+ ([web.dev](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available)). Cross-document VT: Chrome 126+ / Safari 18.2+ / Firefox NOT yet.

The WS1 `BG.W-ROUTE-TRANSITION` correctly **collapses the 4-mechanism route pile to a bare keyed atomic swap** and deletes 2 no-op `startViewTransition` calls — the atomic-floor-first pattern is SOTA-correct (never *depend* on VT). `BG.W-VT-ROUTE-ENHANCE` (currently **DEFERRED/optional**) re-adds `navigate()` behind `supportsRouteTransitions()` as additive over the floor. **AMEND: given same-doc VT is now Baseline including Firefox 144, the enhancement is broadly viable (was Chromium+Safari only when the spec was written) — consider PROMOTING `BG.W-VT-ROUTE-ENHANCE` from optional to a real (still-additive, PRM-gated) wave for the liquid-weight route morph the user keeps asking for.** Same applies to the goo-morph state transitions (pager/deck dots) the liquid-weight memory calls for — same-doc VT can power some natively now. Flag, don't force: the atomic floor is the binding contract; VT stays a progressive layer.

---

## 3 · Booked cross-repo CONSUMEs are now SATISFIABLE (the concrete dep-currency action for 5.0.0)

This is the highest-value dep-currency finding. The spec carries several `// CONSUME(...)` / "BOOKED" markers for sibling helpers that had not shipped. **They have now shipped — the consume-and-delete can fire at the 5.0.0 cut:**

| booked consume | spec home | status in installed dep | action for 5.0.0 |
|---|---|---|---|
| kf `DragOptions.snap` (native fling-to-snap) | `useDragMorph.ts` (W-DRAG-MORPH) | **SHIPPED in keyframes 5.1.0** (`DragOptions.snap` present in dist `.d.ts`); the source comments already say "kf 5.1.0 `DragOptions.snap`" | **FIRE** — drop the interim hand-rolled `reset`+`decayRest`+`spring.target` snap-projection; wire the native `snap` option |
| kf `Oscillator` (loop playback / idle breathe) | EasingPicker `loop` seam; `useVizChoreography` idle-loop | **SHIPPED in keyframes 5.1.0** (`Oscillator` exported); source already notes "the booked republish HAS LANDED" | **READY** — ≥2 consumers (EasingPicker loop + viz idle) → the ≥2-bar can be met; compose it where the loop seams are |
| value.js `oklchSpectrum` (OKLCH shorter-hue spectrum walk) | BorderProgress `spectrum-walk.ts` (`// CONSUME(value.js 0.13.0 oklchSpectrum)`) | **NO literal `oklchSpectrum`** in value.js 1.2.0, BUT the capability ships as `sampleColorRamp` / `sampleColorRampAt` / `mixColorsN` + `interpolateHue("shorter")` + `gamutMapOKLab` | **AMEND the marker** — the booked NAME is stale; re-point the consume to the actual shipped helper (`sampleColorRamp`/`interpolateHue`) or keep the local walk and update the marker. Do NOT leave a dangling `0.13.0 oklchSpectrum` book in a 1.2.0 world |
| hand-rolled `wcagLuminance` (WS4 `W-AMBIENT-HISTOGRAM-LEAF` carve) | `useGlassBackdropLuminance` leaf | value.js 1.2.0 ships **`wcagRelativeLuminance` + `wcagContrastRatio` + `contrastColor`** | **EVALUATE** — `proof:single-color-core` wants ONE color math source; the carve could CONSUME value.js's wcag helpers instead of hand-rolling. Flag for the WS4 carve |
| perfect-freehand optionalPeer | `package.json` (still listed `^1.2.3`) | **NOT installed**; handmark uses vendored `freehand.ts` | **FIRE** — `BG.W-PAPER-CROSSREPO-ASKS` (WS9) drops the dead peer. Confirmed dead on disk; if WS9 slips, a stale peer ships in 5.0.0 |

**value.js 1.2.0 is a RICH surface** the spec under-consumes: `deltaEOK`/`DELTA_E_OK_JND` (the gpu-substrate parity ΔE bar — already aligned), `sampleColorRamp`, `gamutMapOKLab`, `srgbToOKLab`, `oklabToLinearSRGB`, `contrastColor`, `wcagContrastRatio`, the full easing catalogue (`CSSCubicBezier`/`steppedEase`/`bezierPresets`/`parseSpring`/`lowerSpringEasing`), and **`parseCSSStylesheet`/`extractKeyframes`/`ScrollTimelineDescriptor`/`ViewTimelineDescriptor`** (value.js can parse scroll/view-timeline CSS — potentially useful to the gate machinery that scans scroll-driven recipes). The 5.0.0 cut should re-audit which hand-rolled color/CSS-parse helpers can fold onto value.js 1.2.0.

---

## 4 · Tailwind v4.1 — adoption is MOSTLY a non-gap (token-first is already more SOTA)

Tailwind v4.1 (shipped; tree is on 4.3.1) added `text-shadow-*`, `mask-*` (edge/radial/conic/linear), colored `drop-shadow-*`, `overflow-wrap`, and `user-valid`/`user-invalid`/`noscript`/`inverted-colors`/`pointer-*` variants ([Tailwind blog](https://tailwindcss.com/blog/tailwindcss-v4-1)). Cross-checked against the tree:

- **`text-shadow` — already token-first.** `theme/literals.css` FORBIDS raw `text-shadow:` literals; everything reads `--text-shadow-depth`/`--text-shadow-engraved`. The v4.1 `text-shadow-*` utilities are an *alternative*, not an upgrade — the single-knob retint is arguably better. **Non-gap.**
- **`mask-*` — partial at best.** BorderProgress + Progress-sectioned hand-roll `mask-composite: exclude/xor` for the border-band conic ring. The v4.1 `mask-conic-*`/`mask-radial-*` utilities express mask GRADIENTS but do NOT cover `mask-composite` border-band compositing — so they cannot DRY the BorderProgress trick. `BG.W-TAILWIND4-IDIOM` (WS10-3) should **explicitly record "evaluated, not applicable"** rather than silently skip, so the next audit doesn't re-flag it.
- **colored `drop-shadow-*`** — metal-glow / completion-seal use tokenized `filter: drop-shadow(... --metal-glow-*)`. Token-first wins; non-gap.
- **`user-invalid` variant** — 29 raw `:user-invalid` sites in CSS (token-first `.input-pill` recipe). The v4.1 variant is for utility-class authoring; the house CSS recipe is fine. Non-gap.

**Verdict: glass-ui's token-first / `@theme`+`@utility` discipline is *ahead* of utility-class idiom; v4.1's new utilities do not represent a real lag.** The one action: `W-TAILWIND4-IDIOM` should annotate the v4.1 mask/text-shadow evaluation as a recorded no-op so it isn't mistaken for an un-done modernization.

---

## 5 · Native scroll choreography — the @supports + JS-fallback dual-path is SOTA-correct

CSS scroll-driven animations (`scroll()`/`view()`/`timeline-scope`): Chrome 115+ full, Safari 26 **full**, **Firefox STILL partial behind a flag** (not Baseline) ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations), [caniuse](https://caniuse.com/mdn-css_properties_animation-timeline_scroll)). The WS1 `BG.W-SCROLL-PROGRESS-RAIL` + WS11 scroll-choreography use `@supports (animation-timeline: …)` primary + a JS `useScrollProgress` fallback — **the correct dual-path** given Firefox is flagged-off (the `@supports` gate returns false for Firefox → JS path covers it). Two notes:
- Firefox (when the flag IS on) requires a non-zero `animation-duration` (e.g. `1ms`) or the scroll animation doesn't apply — a known gotcha. Low risk since Firefox is flagged-off by default, but if the spec wants the flagged-Firefox path to work, the recipes need a `1ms` duration.
- `timeline-scope` (the WS11 `.scroll-pin` keystone) works in Chromium + Safari 26 but NOT Firefox — the `@supports` probe for `timeline-scope` + the static-non-pinned fallback the spec already specifies is the right call. KEEP.

---

## 6 · reka-ui 2.9 — the WS7 date/calendar BUILD is well-supported

reka-ui ships stable `Calendar`, `RangeCalendar`, `DateField`, `DateRangeField`, `DatePicker`, `DateRangePicker`, `TimeField`, and **`Stepper`** primitives ([reka-ui.com](https://reka-ui.com/docs/components/calendar)). The WS7 Band-4 `BG.W-DATE-CALENDAR` ("reka-ui BUILD") is a sound choice on a current primitive. **Bonus:** reka's `Stepper` (linear/non-linear, keyboard-nav) is available if a multi-step flow surfaces — and `NumberField` (already reka) is where the spec mints `--opacity-disabled-strong` for the increment/decrement steppers. No lag; the reka-2.x surface fully covers the planned BUILDs.

---

## 7 · Triage summary (keep / amend / restart — my lens)

**LANDED bands (SOTA/dep soundness — code-verification is other agents' lenses):**
- WS1 `ROUTE-TRANSITION` (atomic swap + VT no-op delete) — **keep-verified** from a SOTA stance; atomic-floor-first is correct.
- WS1 `FIELD-AURORA` (recessive warm shell aurora, 1-GL-per-route) — **keep-verified**; aligns with iOS-27 recessive-field + budget.
- WS1 `SCROLL-PROGRESS-RAIL` (native scroll() + JS fallback) — **keep-verified**; dual-path correct given Firefox-flagged.
- WS3 `GLASS-BLUR-PEER` (calm 8px) — **amend (watch)**: defensible warm-tint legibility path, but iOS-27 moved toward MORE diffusion — keep `--glass-depth` deep tier robust.

**PENDING bands (the bulk):**
- WS8 glass-deep (WebGL2+WGSL refraction dual-stack, backdrop-sample FBO) — **keep**, SOTA-AHEAD of the Chromium-only CSS-SVG approach; the WGSL Tier-2 is now fully baseline-viable.
- WS5 viz de-migrate + WGSL-substrate-delete — **keep**; KISS verdict unaffected by WebGPU-baseline; WebGL2 fallback still needed (Linux Firefox).
- WS6 Siri (island + waveform + dock-search pill) — **keep**; Dynamic-Island/Siri-orb references, sound `useDockSpring` gating.
- WS1 `VT-ROUTE-ENHANCE` (deferred) — **amend**: same-doc VT now Baseline incl Firefox 144 → consider promoting from optional to a real additive PRM-gated wave (liquid-weight route morph).
- WS10 `TAILWIND4-IDIOM` — **amend**: explicitly record the v4.1 mask/text-shadow evaluation as a no-op (token-first already wins) so it isn't re-flagged.
- BorderProgress/EasingPicker/useDragMorph booked CONSUMEs — **amend**: fire the now-shipped kf `snap` + `Oscillator`; re-point the stale value.js `oklchSpectrum` marker to `sampleColorRamp`; drop the dead perfect-freehand peer.
- WS7 `DATE-CALENDAR` (reka BUILD) — **keep**; well-supported on reka 2.9.

---

## 8 · Risks at the 5.0.0 cut (my lens)

1. **★★★ C-SAFARI refraction capture (HIGH).** SOTA confirms the Safari `backdrop-filter:url()` SVG-refraction gap is REAL and UNCHANGED in 2026 — so the WS8 WebGL2/WGSL shader path is NECESSARY, not optional. If WS8 slips to a CSS-SVG path under time pressure, Safari breaks. The spec's own ★★★ Metal-Safari.app capture is the single likeliest miss; my research raises its priority — it is not gold-plating, it is the only cross-browser refraction proof.
2. **Safari `-webkit-backdrop-filter` var()-flat-paint bug (MEDIUM).** Confirmed real (MDN #25914). `BG.W-SAFARI-BLUR-LITERAL`'s resolved-literal emission is the correct fix (build-proven 88%). If the literal-px drifts from the unprefixed arm, Safari blur silently mis-paints — the value-correctness gate arm is load-bearing.
3. **Booked-CONSUME staleness (MEDIUM).** The 5.0.0 cut claims a "consume-and-delete cadence." kf `snap`/`Oscillator` shipped, value.js `oklchSpectrum` is name-stale — if the cut does NOT fire/repoint these, the cadence claim is false at tag and the no-silent-drop ledger should catch it. A 1.2.0-world `0.13.0 oklchSpectrum` book is a visible staleness smell.
4. **Identity erosion via now-Baseline contrast-color() (IDENTITY).** With `contrast-color()` Baseline 2026 and the SOTA narrative pushing it as auto-ink, a future agent could swap warm ink for black/white auto-ink and silently break warm-everywhere. The surface-anchor fence (flip the SURFACE, never the ink) must hold and be gate-guarded.
5. **iOS-27 blur divergence (LOW-MEDIUM).** The platform reference increased diffusion; glass-ui's calm-blur default diverges deliberately. Risk is a future "match iOS-27" reopening the user's settled calm-default. Record the divergence as deliberate now.
6. **Scroll-driven Firefox gap (LOW).** Acceptable via @supports + JS fallback; risk only if a scroll recipe ships without the JS path.
7. **Dead perfect-freehand peer (LOW).** Still listed at HEAD; WS9 drops it — if WS9 slips, a stale dead peer ships.

---

## 9 · One-line verdict
The 5.0.0 spec is **SOTA-sound and dep-current** — notably *ahead* of the popular Chromium-only CSS-SVG liquid-glass technique (the WebGL2/WGSL refraction is the correct cross-browser bet) and validated by iOS-27's own readability-over-transparency turn. The concrete pass-1 actions are (a) **fire the now-shipped booked consumes** (kf `snap`/`Oscillator`, repoint value.js spectrum, drop perfect-freehand), (b) **promote the deferred VT route-enhance** now that same-doc VT is Baseline incl Firefox, and (c) **hold the warm-cream fence** against now-Baseline `contrast-color()` auto-ink — while treating the ★★★ C-SAFARI shader capture as the gating risk, not gold-plating.
