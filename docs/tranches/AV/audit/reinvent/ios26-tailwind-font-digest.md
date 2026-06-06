# iOS-26 Liquid Glass + modern-Tailwind + font-fix synthesis (gap-fill)

KEY: glass-ui is already most of the way to Liquid Glass (the 5-rung ladder, under-shadow=thickness, --glass-specular, --glass-curvature-overlay, @property regs, PRM/contrast). The evolution is a TOKEN-EDIT, warm-cream identity safe. Gaps: pointer-anchored moving specular (@property, Baseline 2024-07-09), saturate/brightness on lower rungs, edge-light token, no-glass-on-glass discipline. SVG feDisplacementMap refraction is Chromium-only -> progressive-enhancement garnish only.

The facts check out: the serif token does point at non-shipping Computer Modern Serif, the glass ladder is wired as the briefs describe, and the AV wave files exist with the named structure. I have what I need to write the synthesis.

Below is the deliverable.

---

# glass-ui AV — the iOS-26 design-evolution + modern-Tailwind synthesis

Three productions, drawn from the nine lane briefs. Every external claim is dated; every glass-ui mapping is `file:line`. No implementation here — this is the design spec the AV waves execute against. The governing constraint throughout: **the warm-cream identity is the brand, so every iOS-26 adopt is a token edit or an additive fold, never a hue swap and never a clone.** Apple's "tint adapts to content" maps onto *our* cream tinting, not iOS blue.

---

## (1) THE iOS-26 DESIGN-EVOLUTION WAVE — Liquid Glass on the web, the tasteful subset

### What Liquid Glass actually is

Liquid Glass is the translucent material Apple shipped across iOS/iPadOS/macOS Tahoe 26, announced 2025-06-09 ([Apple Newsroom](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)). Its load-bearing behaviors, from "Meet Liquid Glass" (WWDC25 session 219, 2025-06-09):

- **Lensing, not scatter** — it "bends, shapes, and concentrates light in real time" rather than scattering it like 2014-era frosted glass.
- **Geometry-aware specular highlights** that move as the device/element moves, "defining its silhouette."
- **Illuminate-from-within on touch** — the glow starts under the fingertip and spreads through the element.
- **Content-adaptive shadow + tint** — shadow opacity rises over text, drops over solid light; tint is brightness-mapped, not a flat fill.
- **Glass is the navigation layer only** — "best reserved for the navigation layer that floats above the content"; no glass-on-glass.
- **Two non-mixable variants** — Regular (adaptive, legible over anything) vs Clear (permanently transparent, needs a dimming layer).
- **Accessibility built in** — Reduced Transparency frosts it, Increased Contrast borders it, Reduced Motion disables elastic behavior.

### Where glass-ui already lands the model (credit first)

glass-ui is most of the way there. The 5-rung ladder (`glass.css:20-70`) is the depth axis; the under-shadow rungs (`tokens.css:796-799`) are already the literal "0.5px dark hairline reading as glass thickness" from the talk, and the in-tree comment at `glass.css:24-34` already cites it. `--glass-specular` (`tokens.css:685`) is the catch-light, swapped in on dock hover. The z-index registry (`tokens.css:271-287`) already encodes Apple's content→navigation→overlay tiering. `prefers-reduced-transparency` (`glass.css:295-311`) and `prefers-contrast: more` (`glass.css:313-322`) already implement Apple's Reduced-Transparency / Increased-Contrast contract. Three `@property` registrations (`tokens.css:1593-1609`) set the precedent for typed, interpolatable tokens.

### The fold ledger — material

| Fold | What | Baseline-dated technique | Lands | Gate |
|---|---|---|---|---|
| **M1 · per-rung saturate/brightness** | Add `saturate(1.05–1.1)` + small `brightness()` to wash+quiet (today bare blur, `tokens.css:609-611`); resting+ already saturate | `backdrop-filter` chained filters, mature/cross-browser | W1 (token fold adjacent to aurora-fix) | visual-regression snapshot per rung |
| **M2 · pointer-anchored "illuminate from within"** | `@property`-registered stops + masked `radial-gradient` driven by pointer-tracked `--mouse-x/--mouse-y`; opt-in on dock controls, Button glass variants, Card hover | `@property` Baseline 2024-07-09; CSS masks Baseline 2023-12-07; `var()` fallback + `prefers-reduced-motion` guard mandatory | new W3 fold | reduced-motion snapshot shows static; `@property` fallback paints |
| **M3 · `--glass-edge-light`** | Full-perimeter rim token distinct from the top-only `--glass-highlight`; generalizes `--glass-specular` to all four edges via inset ring / border-image | pure token + rung wiring | W4 (supply) | rung-wiring snapshot |
| **M4 · content-aware under-shadow** | `[data-over-content]` / `.glass-over-text` modifier swapping to a heavier under-shadow rung (Apple raises shadow opacity over text) | reuses `--glass-under-shadow-*` (`tokens.css:796`); attribute-driven, no JS | W4 | over-text snapshot |
| **M5 · `.clear` posture + dimming underlay** | Fourth dock/glass posture for animated/aurora backdrops: drop translucency further AND require a scrim. Extends `--dock-fg-on-aurora` (`tokens.css:633`); mints `--glass-clear-*` + a dimming token bound to `--overlay-scrim-*` (`tokens.css:143-145`) | encode "Clear needs dimming" so a consumer can't pick Clear without the legibility layer | W2 (aurora arm) | contrast assert over aurora backdrop |
| **M6 · forced-colors fallbacks** | `@media (forced-colors: active)` system-color (`CanvasText`/`ButtonText`/`Highlight`) `outline`/`border` fallbacks for the glass+dock ladder | the one real **correctness** gap the corpus found — `grep src/styles` returns zero `forced-colors`; the whole glass identity (`box-shadow`+`backdrop-filter`+`background-image`) is stripped in Windows High Contrast and print, so borders/separators/state silently vanish | W7 (G-lane) | HCM render assert |
| **M7 · `mask-image` UI soft-edge fade** | Add the `-webkit-mask-image` companion + `@supports (not (mask-image…)) and (not (-webkit-mask-image…))` fallback to the dock scroll-fade + paper-grain (`tokens.css:820-829`) | `mask-image` Baseline 2023-12-07 | W7 (dock pass) | older-Safari fallback assert |

**DEFER (material):** true SVG `feDisplacementMap` refraction — `backdrop-filter: url(#svg)` is Chromium-only (WebKit bug [#245510](https://bugs.webkit.org/show_bug.cgi?id=245510), Firefox not shipping), resize-expensive; trigger = it reaches Baseline, then land as a `@supports`-gated garnish over the blur base, never the substrate. Light/dark per-element auto-flip from sampled luminance — needs canvas/`color()` probing that CSS lacks; trigger = a consumer floats glass over arbitrary photo/video. "Materialize via lensing" — same SVG-filter dependency as refraction; `@starting-style` is the cross-browser stand-in today.

### The control refinements

The direct user ask — "controls flex on touch," "the rounded continuous slider knob."

| Fold | What | Source | Lands |
|---|---|---|---|
| **C1 · `liquid` Slider variant (HEADLINE)** | One continuous rounded glass track+knob — the knob reads as a glass *lens integrated into the track*, not the current bordered disc floating above it (`Slider.vue:191-204`). Track + range share the capsule radius; knob scales + lifts a specular halo on `:active`/drag, wired to the existing `--scale-press-btn` + the `data-held` halo (`Slider.vue:285-289`) | WWDC356 mirrored-proportions; slider transform-on-interaction | W1 |
| **C2 · Slider `neutralValue` + `ticks`** | Fill origin (range paints *from* neutral, not from 0) + optional tick config; both prop/token-only, map onto reka-ui `SliderRoot` | iOS `TrackConfiguration` (Ashish Kakkad 2025-06; Apple `SliderTick` docs) | W1 |
| **C3 · `glass-prominent` Button + glass-gated shimmer** | Opaque-primary glass variant pairing the existing `glass`/`glass-wash` secondary (`button/index.ts:29-34`); keep press-scale, add the specular shimmer the `btn-audacious` recipe already tools, gated to glass variants | LiquidGlassReference (`.glass`/`.glassProminent`); Donny Wals (`.interactive()` grow+shimmer) | W3 |
| **C4 · Switch glass material + ToggleGroup sliding pill** | Give Switch a glass variant + size axis so it mirrors the slider's proportions (`switch/Switch.vue:29`); replace ToggleGroup's flat `bg-accent` (`toggle/index.ts:24`) with a FLIP'd sliding glass-pill active indicator | WWDC356 mirrored proportions; segmented transform-on-interaction | W4 |

**DEFER (controls):** touch-point illumination *radiating to neighbors* (`GlassEffectContainer` merge) — faithful reproduction needs the WebGL substrate (`useWebGLCanvas`, in tree per AU); trigger = a second consumer wants grouped-glass blending beyond the dock. Slider momentum/stretching physics — reka `SliderRoot` has no momentum model; this is a keyframes.js spring integration, larger than a variant. Tab-bar scroll-shrink on the dock as a control feature — see D-model A3 below.

### The depth / floating-plane model

Apple's strongest, cheapest guidance: hierarchy through depth, glass in the middle band only.

| Fold | What | Source | Lands |
|---|---|---|---|
| **D1 · name the three layer bands** | Doc block + optional `--z-band-content`/`--z-band-nav`/`--z-band-overlay` aliases over the existing ranges (`tokens.css:266-287`), stating glass surfaces live in the nav band only. ≥2 consumers already (dock, floating-panel, header-ribbon) | finding "no glass-on-glass"; LiquidGlassReference 3-tier stack | W5 |
| **D2 · one reusable contextual-elevation recipe** | The card focus-lift (`glass.css:104-128`) and dock held/open-lift (`dock.css:332-348`) are two copies of one idea; extract one tokenized "elevate-one-rung-on-interaction" contract (focus-visible + data-held + data-state=open). 2-consumer-gated, satisfied | Apple adaptive-elevation | W3 |
| **D3 · scroll-driven nav-plane shrink** | Apple's "tab bars shrink on scroll-down, expand on scroll-up" onto the dock's collapse machinery + the native scroll-driven substrate (`scroll-driven.css`, `--scroll-*` at `tokens.css:1252-1254`); `@supports`-gated, degrades cleanly | Apple Newsroom 2025-06-09 | W3 (folds the SOTA scroll/PRM bridge) |
| **D4 · concentricity tokens** | Two helpers: capsule rule (`border-radius` = half resolved height — the `9999px` pill already approximates it, keep as fallback) + `--radius-concentric: calc(var(--radius-parent) - var(--inset))` for nested glass. Generalizes the hand-rolled `calc(--radius-card - 0.5px)` at `dock.css:287`. **The single most reusable iOS-26 rule, currently zero representation** (`tokens.css:292-311` are fixed values) | WWDC356 concentric math: capsule = half-height, concentric = parent-radius-minus-padding | W2 (structural) + W5 (doc) |
| **D5 · "no glass-on-glass" discipline** | Documented rule in `dock/README.md` + `glass.css` header; optionally a lint note | WWDC219; the highest-leverage, near-zero-cost rule | W5 |

**DEFER (depth):** real lensing/refraction (D1 in brief 3 = M-defer above). Cross-control touch glow (= C-defer above; candidate W8 constellation-primitive if a 2nd consumer appears). Per-surface adaptive opacity from sampled backdrop luminance — glass-ui's adaptivity is media-query-driven, not content-sampled; trigger = a reported contrast bite over a static light photo that M5's clear-posture doesn't cover.

### The color refinements

The cited risk (NN/g, [Liquid Glass Is Cracked](https://www.nngroup.com/articles/liquid-glass/); Infinum 2025) is that vibrancy kills contrast — measured surfaces as low as 1.5:1 against the 4.5:1 bar. Every color adopt below preserves the WCAG-annotated floors inline at `tokens.css:332/339`.

| Fold | What | Baseline-dated technique | Lands |
|---|---|---|---|
| **K1 · re-author core palette in OKLCh** | Move `--neutral-*` + jewel/semantic tokens from `hsl()` to `oklch()` (`tokens.css:327-475` + the `.dark`/`light-dark()` mirrors). L-uniformity replaces the hand-tuned L-cadence comments ("8 L / 12 L / 25 L", `tokens.css:319-341`). The runtime already speaks OKLCh (`src/composables/color/index.ts`) | Tailwind v4 default is OKLCh ([v4 blog](https://tailwindcss.com/blog/tailwindcss-v4), 2025-01-22); convert with even-lightness rungs | W2 (color fold) |
| **K2 · P3 wide-gamut, `@supports`-gated** | A `@supports (color: color(display-p3 …))` arm mirroring the existing `light-dark()` block (`tokens.css:1322`), upgrading saturated tokens (`--section-color-*`, semantics, `--accent-*`); sRGB `hsl()` as the floor | `color(display-p3 …)` + `@media (color-gamut: p3)` cross-browser as of 2025 ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut)); same shape as glass-ui's `light-dark()` `@supports` block | W2 |
| **K3 · backdrop-adaptive glass foreground flip** | Generalize `--dock-fg-on-aurora` (`tokens.css:633`, today static `var(--foreground)`) into a `light-dark()` token that flips glyph color against backdrop luminance — **small adaptive surfaces only** (dock buttons, pills); Apple explicitly exempts menus/sidebars from flipping. CSS-first; runtime OKLCh core can later compute the flip from sampled L | WWDC219 light↔dark flip | W2 |
| **K4 · `color-mix` space `in srgb` → `in oklab`** | On hue-bearing derivations (dock phase-tint, blob/aurora token seeds) — kills the sRGB grey dead-zone on cross-hue mixes, free P3 reach | `color-mix` Baseline WA 2025-11-09; modern-web-guidance caution: mix toward white/black in `oklab`, never adjust the `oklch` L channel directly | W3 (shared with SOTA-crosswalk B4) |

**DEFER (color):** brightness-mapped tonal-range tinting (the full "colored glass" model) — a per-pixel tone range from backdrop luminance is a shader/`backdrop-filter`-composited effect, not a token; trigger = the aurora/goo-blob `useWebGLCanvas` substrate is the proven host (the OKLCh core already returns linear-light, the correct space for it). **Binding guardrail:** do not land *any* opacity-lowering tint wave without shipping the `prefers-reduced-transparency`/`prefers-contrast` floor alongside it — that is Apple's own mitigation and glass-ui's AA floors (`tokens.css:332/339`) must survive on busy backdrops.

### The typography refinements

Apple's iOS-26 type story is spacing/weight/case, not a new family — SF Pro stays ([Engadget WWDC 2025 recap](https://www.engadget.com/big-tech/wwdc-2025-ios-26-new-liquid-glass-design-and-everything-else-apple-announced-171718769.html), 2025-06-09). glass-ui keeps its √φ/φ identity; these are idiom mappings, not a ratio swap.

| Fold | What | Source | Lands |
|---|---|---|---|
| **T1 · size-aware tracking curve (highest-value type fold)** | Replace the uniform `--type-tracking-tight` on every display rung with a curve keyed to rung size — tight (~−0.025em) through the title band, *relaxing back toward 0* by `display-3`+, mirroring SF's re-widening above ~32pt. Per-rung `--type-tracking-display-{n}` or a `clamp()`-driven value. Today every display rung is uniformly over-tightened | SF tracking is a size-dependent curve (codershigh HIG tables; learnui.design, both accessed 2026-06-06): 17pt = −0.43px, re-widening positive at the 20pt Display threshold | W5 |
| **T2 · sentence-case label variant** | `.text-admin-label` (`typography.css:351`), `.section-label` (`454`), `.text-mono-caption` (`378`) hard-`uppercase`; iOS 26 abandoned all-caps for sentence-case + a slight weight bump. Offer an additive sentence-case-with-weight variant — no break to the caps registers | iOS 26 removed system-wide all-caps ([designblog 2025](https://designblog.com/apples-tiny-typography-change-in-ios-26-that-nobodys-talking-about/)) | W5 |
| **T3 · optical-sizing + 20px crossover** | Add `font-optical-sizing: auto` to `text-title`/`text-heading` (`typography.css:270-285`, currently only the `text-display-*` set carries it); document `--type-subheading` (20.4px, `typography.css:108`) as the Text→Display register boundary | SF switches Text→Display optical master at 20pt ([Wikipedia: SF typeface](https://en.wikipedia.org/wiki/San_Francisco_(sans-serif_typeface))) | W5 |
| **T4 · text-never-on-glass precept** | Encode the iOS-26 rule that type rides a solid legibility layer over glass, not raw material — a documented glass-ladder/typography precept + (where applicable) a default backing on text-bearing glass tiers | "Text always remains on solid layers" ([createwithswift](https://www.createwithswift.com/liquid-glass-redefining-design-through-hierarchy-harmony-and-consistency/); median.co, accessed 2026-06-06) | W5/precept |

**DEFER (typography):** a full iOS-style 1.1–1.25-ratio fixed ramp replacing √φ/φ — the φ-ladder *is* glass-ui's identity; a consumer wanting iOS metrics builds a preset. Dynamic-Type fluid rescale of the whole ladder; boxier-numeral / SF-Compact-Rounded register; SF Pro adoption itself (SF is not OFL; brand canon is Plus Jakarta). All trigger on an explicit consumer requirement, not this tranche.

---

## (2) THE MODERN-TAILWIND WAVE — v4 idiom cohesion

glass-ui is not a v3 relic: it already runs `@layer components`, `@utility` recipes, `@container style(--density:…)` with a documented `[data-density]` `:where()` fallback (`utilities.css:475-517`), `color-mix()` shadows, `field-sizing`, `content-visibility`, scroll-timeline, `@starting-style`, the reduced-transparency/contrast/forced-colors-* media brackets, and `light-dark()`+oklch for chart-label tokens (`tokens.css:1377-1380`). The dark variant is correctly authored: `@variant dark (&:where(.dark, .dark *))` (`theme.css:381`). The remaining work is idiom *cohesion*, not invention.

### The fold ledger — Tailwind

| Fold | What | Source | Lands | Gate |
|---|---|---|---|---|
| **TW1 · `@theme inline` migration (largest win)** | `theme.css:5` opens a plain `@theme`; ~86 `--color-x: var(--token)` var-references (`theme.css:57-202`) + the radius/shadow/blur/ease/duration bridges (`227-377`) each mint a *second* global variable (`--color-primary` AND `--primary`), doubling the override surface. `@theme inline` substitutes the referenced value into the generated utilities and mints no second variable — the `tokens.css` token stays the single override point | [tailwindlabs #18560](https://github.com/tailwindlabs/tailwindcss/discussions/18560) + [#18471](https://github.com/tailwindlabs/tailwindcss/discussions/18471), accessed 2026-06-06 | W5 (theme-inline fold) | override-point assert: one var per token resolves |
| **TW2 · oklch palette migration** | The section (13-stop), rainbow, viz, and semantic-accent ramps from `hsl()` → `oklch()` with even-lightness rungs; keep `hsl()` only where hand-tuned + gamut-irrelevant. **Shares K1 above** — one conversion serves both lanes | HSL L is perceptually uneven; v4 default is oklch ([Evil Martians](https://evilmartians.com/chronicles/better-dynamic-themes-in-tailwind-with-oklch-color-magic)) | W2 | perceptual-L assert across ramp |
| **TW3 · container queries for components** | Dock label/density (`dock.css:154-164`), overflow rail (`dock.css:887`), typography (`typography.css:447`), instrument-chassis (`instrument-chassis.css:292`) key off viewport `@media` where they should read their own box. Add `@container` context on the dock/chassis root, swap `@media` → `@sm`/`@lg`/`@max-*`. Makes them portable into sidebars — exactly what the dock convergence needs | container queries built into v4 ([launch post](https://tailwindcss.com/blog/tailwindcss-v4), 2025-01-22; [SitePoint 2025](https://www.sitepoint.com/tailwind-css-v4-container-queries-modern-layouts/)) | W5 (container-query fold) | narrow-host render assert |
| **TW4 · Tier-1 registered-token lifts** | ~14 SFC sites still wrap a raw `var()` where the named utility already resolves: `TabsIndicator.vue:18` `duration-[var(--duration-normal)]`→`duration-normal` + `ease-[var(--spring-snappy)]`→`ease-spring-snappy`; `DialogContent.vue:80`; `CarouselDots.vue:62,71,72` (`bg-[var(--muted-medium)]`→`bg-muted-medium`); `HeaderRibbon.vue:4` `z-[var(--z-dock)]`→`z-dock`; `DarkModeToggle.vue:40,84` (`rounded-pill`, `fill-foreground`); `NumberFieldDecrement/Increment.vue:28` `size-[var(--icon-sm)]`→`size-icon-sm` (intent already documented at `theme.css:264`); `ComboboxAnchor.vue:19` `w-[200px]`→`w-popover` (a literal W8b miss — the sibling `ComboboxList` was lifted, the Anchor left behind). Only possible new bridge: `--ease-standard`, one line | bare-`var()`-wrap is drift; the named utility is the idiom ([v4 transition docs](https://tailwindcss.com/docs/transition-timing-function), accessed 2026-06-06) | W5 (rides the theme-inline wave) | extended gate, below |
| **TW5 · bare `[--var]` → paren shorthand** | v3's `bg-[--brand]` → v4's `bg-(--brand)` (auto-wraps `var()`): `TabsIndicator.vue:18` `h-[--reka-tabs-indicator-size]`→`h-(--reka-…)`, plus `ComboboxList.vue:24`, `SelectContent.vue:55` | [v4 upgrade guide](https://tailwindcss.com/docs/upgrade-guide), accessed 2026-06-06 | W5 | extended gate |
| **TW6 · `theme()`-function deprecation kill** | The only two deprecated-function sites in the whole tree: `Progress.vue:181` `bg-[var(--progress-track,theme(colors.secondary.DEFAULT))]` + `:194` `[background:var(--progress-fill,theme(colors.primary.DEFAULT))]`. Replace `theme(colors.x)` → `var(--color-x)`, or author a `--progress-track`/`--progress-fill` token defaulting to the semantic | `theme()` "not considered idiomatic usage of v4.0" ([tailwindlabs #16116](https://github.com/tailwindlabs/tailwindcss/discussions/16116), accessed 2026-06-06) | W5 | extended gate flags `theme(colors.…)` |
| **TW7 · single-source masks** | Drop the manual `-webkit-mask-image` lines (`utilities.css:262-280`), mirror the glass-ladder's single-source + Lightning-CSS-prefix approach (`glass.css:11-19`). (Note: this is the *consistency* cut; M7's added `-webkit-` companion is the *older-Safari fallback* case — they don't conflict, M7 is `@supports`-gated where M7's fallback is actually needed) | consistency with the deliberate glass-ladder choice | W5 (utility-consistency fold) | — |
| **TW8 · extend `proof:design-idiom-localization.mjs`** | The W8b gate flags only `text-[var]`/`shadow-[var]`. Add (a) a `theme(colors.…)` detector (TW6, zero false positives, 2 sites), (b) a `\b[a-z-]+-\[var\(--(z\|radius\|duration\|ease)\b` detector for registered-namespace vars with a bridge (catches TW4). **Keep OFF the flag list:** compound `transition-[…]` lists (sanctioned single-site per [v4 transition-property docs](https://tailwindcss.com/docs/transition-property)) and the slider `[--slider-track-height:…]` *declarations* (the only way to set a `--var` in a class — declare-vs-consume distinction) | W8b's "new born-RED gate green" pattern | W6 (gates-close) | the gate itself, born RED then green |

**DEFER (Tailwind):** Tier-3 fixed-px → token lifts (Notification/Toaster widths, the `max-h-[300px]` pair across `ComboboxViewport.vue:19`+`CommandList.vue:22`, FuzzySearch dialog geometry, Separator hairline) — these need token authoring *first*; trigger = a token is authored, lands in W4. The `max-h-[300px]` pair clears the ≥2-site bar so it's the safest entry (`--popover-max-h`); the FuzzySearch `!`-important geometry is single-site → KEEP+record per J-inv-10 unless a 2nd consumer appears. Generalize `light-dark()` across the whole palette (replace the `.dark{}` block, `tokens.css:1420`) — trigger = *after* the oklch migration lands, since `light-dark()` pairs are cleanest as oklch pairs; sequencing before forces a double rewrite. Broader `@container style()` density adoption — trigger = a 2nd density consumer (keep the Firefox `[data-*]` `:where()` fallback mandatory; style queries still not in Firefox). `@property`-typed token registration beyond `--ripple-radius` — stays narrow; registering *color* tokens snapshots the resolved value and breaks `light-dark()` re-resolution (already documented at `theme.css:76-79`). Invoker Commands API (`command`/`commandfor`, Baseline 2025-12-12) — too new, reka-ui owns these primitives' JS; trigger = a reka-free native `<dialog>`/`[popover]` consumer + the Baseline ages ≥2 quarters. Anchor positioning — status held by web-features; KEEP-BOOK.

---

## (3) THE FONT FIX — the face-canon correction

The brand canon is **Fraunces (display) + Plus Jakarta Sans (body) + Fira Code (mono)** per CLAUDE.md, but the source disagrees with itself. Diagnosis confirmed against HEAD.

### What actually ships (verified)

Three OFL families have on-disk woff2 + `@font-face` rules in `src/styles/fonts.css`: **Plus Jakarta Sans** (`fonts.css:80-106`, variable wght 200–800), **Fira Code** (`fonts.css:118-143`, wght 300–700), **Fraunces** (`fonts.css:158-168`, wght 100–900 carrying the `opsz`/`SOFT`/`WONK` axes; `proof:font-axes` fails closed on a wght-only substitution). Each has a Capsize-calibrated `"… Fallback"` companion (`typography.css:34-82`).

**Faces that do NOT ship:** Computer Modern Serif, Latin Modern Roman, CMU Serif, General Sans, Inter, JetBrains Mono. No woff2, no `@font-face` — where referenced they silently fall through to Georgia / system-ui.

### The bug — two arms

**Library arm (the one genuine library-side correctness gap).** `tokens.css:44` sets `--font-stack-serif: "Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif` — **none of the first three ship**, so every `.text-body`/prose surface bound to `--font-serif` silently paints **Georgia**. The file headers still narrate "Computer Modern body" (`typography.css:2-7`) — stale narration of a face that was never shipped. The display token is fine: `tokens.css:43` → Fraunces, which ships. The sans token (`tokens.css:45`, Helvetica Neue → system) is honest about being a system stack; the serif token is not.

**Demo arm (the proximate cause of "none of the fonts are correct").**
- `demo/configurator/preset-editor/defaults.ts:12-48` — `FONT_OPTIONS` (the Select the user sees) lists 7 options, 4 naming non-shipping faces: `Computer Modern Serif`, `General Sans`, `Inter`, `JetBrains Mono` (plus an off-canon `Fraunces` entry predating the AM-W7-η cleanup). Picking any paints a system fallback.
- `defaults.ts:50-65` — `DEFAULT_CONFIG.font` sets `serif`/`sans` → `"Computer Modern Serif"` (→ Georgia), so the demo *baseline* serif/sans is Georgia masquerading as CM Serif. `store.ts:41-71` writes these as inline styles on `<html>`, **overriding** the library's good `@theme` values the moment any font is touched or any config is persisted.
- `demo/presets/neutral.css:43-46` — hard-sets `--font-serif`/`--font-sans`/`--font-display` to `"Inter"` (not shipped) and `--font-mono` to `"JetBrains Mono"` (not shipped → Fira Code).
- `demo/fonts.ts:16-52` — a *second, already-correct* font table (Plus Jakarta / Fira Code / system per AM-W7-η) with **no consumers** (grep finds only its own definition). Dead code that documents the right target while the live `defaults.ts` table points at retired faces. The two tables disagree.

The faces *load fine* (`demo/demo.css:30-101` `@font-face`-declares Plus Jakarta + Fira Code correctly) — the defect is purely that the demo's font-*config tables* point the CSS variables at families those rules never declare.

### iOS-26 context for the type decision

iOS-26 Liquid Glass pairs best with light, airy sans-serifs; the legibility advice for type over glass is to *increase weight* (Regular→Medium/Bold) + add letter-spacing, not swap families ([Apple Newsroom 2025-06](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/); [Pimp My Type 2025-08-12](https://pimpmytype.com/liquid-glass/)). This argues *for* keeping Plus Jakarta as the brand body under the iOS-26 idiom and *against* reintroducing Computer Modern / Fraunces ornament as a body default.

### The fold ledger — font (all → AV, low-risk config folds)

| # | Fix | File | 
|---|---|---|
| **F1 (most visible)** | Rewrite `FONT_OPTIONS` to the shipped-only canon — Plus Jakarta Sans (+ Fallback), Fira Code (+ Fallback), Fraunces (+ axes), plus honest `System UI` / `ui-monospace`. Delete Computer Modern Serif, General Sans, Inter, JetBrains Mono | `defaults.ts:12-48` |
| **F2** | Fix `DEFAULT_CONFIG.font` so `serif`/`sans`/`display`/`mono` baselines reference only shipped families (or fall through to the library `@theme` defaults rather than re-asserting CM Serif) | `defaults.ts:50-65` |
| **F3 (only genuine library gap)** | Repoint `--font-stack-serif` off the never-shipped Computer Modern Serif — either ship a serif body face or resolve to a shipped face / honest system serif; correct the stale "Computer Modern body" narration | `tokens.css:44`, `typography.css:2-7` |
| **F4** | Reconcile the duplicate tables — make `demo/fonts.ts`'s correct `FONTS`/`applyFont` the single source the configurator consumes, or delete it. Don't ship two disagreeing tables | `demo/fonts.ts` |
| **F5** | Fix the alternate preset's Inter/JetBrains references → shipped faces or honest system stacks | `demo/presets/neutral.css:43-46` |

**DEFER (font):** migrate the Capsize manual `size-adjust`/`ascent-override`/`descent-override` triple → `font-size-adjust: from-font` (Baseline 2024-07-25; [modern-web-guidance `visually-stable-font-fallbacks`](https://www.npmjs.com/package/modern-web-guidance)) — orthogonal modernization, trigger = a CLS regression or fallback-metric audit. Adding an SF-Pro-style rounded display register or a dedicated body serif face — new payload + brand call; trigger = an explicit iOS-26 brand-type decision, not the font-fix.

---

## HEADLINES

1. **iOS-26 design-evolution wave** — adopt the *portable* Liquid Glass subset (pointer-anchored illuminate-from-within, per-rung saturate/brightness, edge-light + content-aware shadow tokens, the `liquid` continuous-knob slider, concentricity tokens, the three-band floating-plane model, OKLCh+P3 color, size-aware tracking) while keeping the warm-cream identity. Defer everything gated on Chromium-only SVG-displacement or a WebGL host. **Tasteful, not a clone.**
2. **Modern-Tailwind wave** — close the v4 idiom: `@theme inline` (kills ~200 double-emitted globals — the largest correctness-of-shape win), oklch palette ramps, container queries for the dock/chassis so they're portable, the ~14 registered-token lifts + 2 `theme()`-function kills, all hardened by an extended `proof:design-idiom-localization` gate.
3. **Font fix** — correct the demo `FONT_OPTIONS`/`DEFAULT_CONFIG` off four retired faces, repoint the library `--font-stack-serif` off the never-shipped Computer Modern Serif (the one true library gap), and collapse the two disagreeing demo font tables to one.

## THE 5 HIGHEST-VALUE iOS-26 ADOPTS

1. **Pointer-anchored "illuminate from within" specular** (`@property` + masked radial, reduced-motion-guarded) — the single most recognizably-Liquid-Glass behavior that is fully portable and Baseline today (`@property` 2024-07-09, masks 2023-12-07). New W3 fold, opt-in on dock controls + Button glass + Card hover.
2. **The `liquid` Slider variant — one continuous rounded glass track+knob** — the direct user ask; the current bordered-disc thumb (`Slider.vue:191-204`) is the visible gap. W1 headline.
3. **Concentricity tokens** (capsule = half-height; concentric = `calc(parent − inset)`) — the single most reusable iOS-26 rule, currently zero representation (`tokens.css:292-311` are fixed values); upgrades the `9999px` pill hack into the actual system rule and benefits every nested glass surface. W2/W5.
4. **OKLCh core-palette re-authoring + `@supports`-gated P3** — unlocks perceptual-even ramps, P3 reach, and runtime/token convergence (the runtime already speaks OKLCh); lowest risk because the `@supports`/`.dark` fallback floor already exists. Serves both the color lane and Tailwind TW2. W2.
5. **`forced-colors` + the `.clear`/dimming + reduced-transparency floor triad** — the correctness/legibility guardrails: forced-colors is the one real correctness gap (zero `@media (forced-colors: active)` in `src/styles`, the whole glass identity strips in Windows High Contrast), and the `.clear`-needs-dimming + reduced-transparency floor are what keep the adaptive-tint work from repeating iOS-26's documented contrast failures (NN/g, surfaces as low as 1.5:1). W2 + W7.
