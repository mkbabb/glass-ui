# Apple Liquid Glass + Awwwards SOTA — the binding design-principle alignment (BD viz / fleet2)

**Lane** BD viz-research / fleet2 · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. WRITE-only.
**Grounded against** the iOS-26 HIG (Liquid Glass material docs + WWDC25 sessions 219/256/284/323), the iOS-27 / macOS-Tahoe-successor change set (MacRumors 2026-06-10), the Conor Luddy iOS-26 SwiftUI reference, the 2026 Awwwards/web-design reality-check corpus, and our existing CLAUDE.md glass canon (AX.W54 glass-first · W55 adaptive-legibility · W-LENSING · W-DARK-MATERIAL · BA.W-GLASS-CAL).

> Read alongside `media-analysis.md §C/§D` (the iOS-27 media deltas + the dock north-star), the two sibling fleet2 audits (`glass-ios27-every-element.md`, `glass-ios27-buttons-icons-controls.md`) which own the ELEMENT-BY-ELEMENT token-delta map, and `arch/no-fallback-policy.md` (the Safari-first GPU-backend fence). This doc owns the AUTHORITATIVE PRINCIPLE SET (the "what Apple actually says" distillation + citations) and the Awwwards SOTA layer the fleet2 audits do not cover; the siblings own the per-element residue ledger. They share one verdict and do not re-derive each other.

---

## 0. TL;DR — the binding alignment in seven principles

1. **Glass is a FUNCTIONAL LAYER above content, not a content surface.** It floats below the fingertips and carries the controls; content scrolls underneath. The library's glass-first MAXIMAL default (AX.W54) is RIGHT for chrome/controls but must NOT glass the content body — the hierarchy is the rule Apple makes load-bearing.
2. **Glass needs varied content BEHIND it or it reads as a flat tinted rectangle.** Over a single flat color the refraction has nothing to bend. This is the binding justification for the BD viz suite (every glass surface wants a live aurora/field behind it) AND the `tier="field"` showcase fix.
3. **Two material variants: REGULAR (default, fully adaptive, legible over anything) and CLEAR (max-transparency, media-only, REQUIRES a dimming layer).** Our `surface="glass|veil|opaque"` axis maps cleanly; CLEAR is the new register we owe (`W-CLEAR-VARIANT`) and it is gated on the dimming-scrim.
4. **Legibility is non-negotiable and adaptive.** Glass darkens over bright, the foreground ink lifts, and it respects Reduce Transparency / Increase Contrast. Our W55 adaptive seam + the `--glass-tint-*` bright-bucket already implement this — it is Apple-AFFIRMED, not a divergence.
5. **iOS-27 sharpens it: darker edge + brighter specular highlights, better content diffusion, a continuous transparency slider, scroll-edge floating bars, sharper refracted icons.** These map 1:1 onto existing token seams (no new compositing path).
6. **Motion is fluid morph + interactive bounce/shimmer/scale on a fast spring (~response 0.3, ζ 0.6, `.bouncy`).** Glass elements MERGE when near (the `GlassEffectContainer` model). Our `--spring-snappy`/`--spring-bouncy` + the goo-merge + `useLiquidReveal`/`useDragMorph` are the web transposition.
7. **Awwwards SOTA confirms RESTRAINT: glass survives in nav/modals/cards (not heroes), WebGL ships only "when the brand IS the experience," motion is choreographed not decorative.** Our suite IS a glass design system — the brand IS the experience — so the spend is justified, but the proportion fences (one-color-event, one-GL-per-route, calm-default) are the SOTA-correct discipline, not a limitation.

---

## 1. Apple Liquid Glass — the authoritative material principles (iOS-26 baseline)

### 1.1 What the material IS (HIG / WWDC25)

> "Liquid Glass is a translucent material that reflects and refracts its surroundings, while dynamically transforming to help bring greater focus to content." (Apple Newsroom, 2025-06-09)

The material's four real-time behaviors (WWDC25 "Meet Liquid Glass"):
- **Real-time light bending (LENSING / refraction)** — the backdrop bends at the edges, concentrating at the rim, thin through the interior.
- **Specular highlights that respond to device motion** — the rim catch-light tracks tilt (on web: the pointer — our `useSpecularPointer` + `--specular-angle`).
- **Adaptive shadows** — shadow increases over text, decreases over white backgrounds.
- **Interactive behaviors** — scales, bounces, shimmers on touch.

**Alignment:** our `.glass-lens` SVG-squircle displacement (`f(x)=⁴√(1-(1-x)⁴)`, Snell n₂=1.5) is the web lensing transposition (W-LENSING); `useSpecularPointer` is the motion-specular; W55's bright-bucket is the adaptive shadow/tint. We already implement all four — the gap is COVERAGE (not every surface carries them) and the iOS-27 refinements (§3).

### 1.2 The FUNCTIONAL-LAYER rule (the hierarchy Apple makes load-bearing)

> "Controls are crafted out of Liquid Glass and act as a distinct functional layer that sits above apps, giving way to content." (Apple Newsroom)
> "Apps made with Liquid Glass should show hierarchy between content and controls." (HIG)

The HIG is explicit: glass is the INTERACTIVE layer floating above content. Ignoring it "produces a confusing hierarchy: the user cannot tell what is interactive and what is content."

**Alignment + the ONE caution for our glass-first MAXIMAL default (AX.W54):** glass-first is correct for CHROME (dock, controls, overlays, cards-as-chrome) but the maximal default must NOT dissolve the content/control distinction — a glassed PARAGRAPH or a glassed data table is the anti-pattern. Our opaque allowlist (avatar/label/separator/skeleton/table/badge) is the right instinct; this principle says the allowlist should also keep the **reading-content body** opaque/calm (the W55 calm-content-tier floor at the 4% sub-perceptual strength already does this — Apple-AFFIRMED). The DOCK and the OVERLAY band are the true functional-glass layer; that is where the maximal liquid-glass spend belongs.

### 1.3 The two VARIANTS — REGULAR vs CLEAR

| | **Regular** (default) | **Clear** |
|---|---|---|
| Transparency | Medium | High (permanently more transparent than adaptive Regular) |
| Adaptivity | Full — adapts to ANY content, stays legible at any size/over anything | Limited — REQUIRES a dimming layer |
| When | Most UI, the versatile default | Media-rich backgrounds ONLY, where content is unharmed by dimming + foreground is bold |
| Foreground rule | adaptive ink | "almost always pure white" foreground to stay readable |
| Dimming | not required | REQUIRED — the WWDC pattern is `Color.black.opacity(0.3)` behind the glass; without it "legibility gets noticeably worse" |

**Alignment to our `surface="glass|veil|opaque"` axis:**
- `surface="glass"` (the 5-rung ladder) ≈ **REGULAR** — the adaptive default, W55-legible over anything. CORRECT, shipping.
- `surface="opaque"` (`--glass-level: 0`) is the solid escape — NOT a glass variant; the legibility floor.
- **CLEAR is the NEW register we owe (`W-CLEAR-VARIANT`).** It is a max-transparency tier (a `--glass-opacity-clear` BELOW wash, blur retained) that is GATED on a coupled dimming scrim. The binding rule the gate must enforce: **CLEAR never ships without its dimming layer.** This is the media/aurora-backed surface register (a glass card floating over the live metallic aurora — the Maps-card case, `media-analysis.md §C`). The dimming scrim is the `color-mix(in srgb, var(--background) N%, transparent)` house pattern (the A5-1 modal-scrim precedent, ~30% per Apple's 0.3). Foreground ink on CLEAR lifts to full `--foreground` / pure-white per Apple — our `contrast-color()` flip + the muted→foreground lockstep already do this.

### 1.4 The BACKGROUND requirement (the binding viz justification)

> "Liquid Glass refracts what is behind it. If what is behind it is a single solid color, the refraction has nothing to bend, and the result reads as a flat tinted rectangle. Either put glass over varied content (a gradient, an image, a video) or do not use glass at all." (LiquidGlass HIG synthesis)

**This is the single most load-bearing principle for the BD viz tranche.** Our own CLAUDE.md says the same ("the blur is imperceptible over a flat substrate — the rich per-page backgrounds that make glass POP land in the page-redesign"). Apple makes it a RULE: glass demands a living backdrop. Hence:
- Every glass-first surface wants the aurora/metallic-aurora/dot-flow field behind it (the BD viz suite is not decoration — it is the REFRACTION SUBSTRATE that makes the glass real).
- The `ShowcaseFrame tier="field"` fix (drop the opaque plate so glass floats over the page substrate) is Apple-correct, not a demo nicety.
- The `DockStage` shared offscreen-paused aurora behind dock demos is the correct pattern.
- A glass surface with NOTHING varied behind it should down-shift toward `veil`/`opaque` — glass over flat is a wasted GPU cost AND reads worse than a clean opaque plate (the SOTA restraint, §4).

### 1.5 GlassEffectContainer — the MERGE/morph model

> "Glass material reflects and refracts lights, picking colors from nearby content... glass can NOT sample other glass, so nearby glass elements in different containers result in inconsistent behavior." Use `GlassEffectContainer` to group; `glassEffectID` for fluid morphing; `.spacing` controls the morph threshold (elements within the distance blend + morph together).

**Alignment:** this is exactly our **goo-merge** (the metaball `smin` field — nearby glass plates merge into one amorphous mass) and the dock morph-bridge (`feGaussianBlur` + threshold goo). The Apple model says: (a) group glass so it samples ONE backdrop coherently (not glass-on-glass), and (b) near glass elements MERGE. Our W-DOCK-STACK / the now-playing-splits-from-the-tab-bar goo-split / the Maps-card-expand are the web transposition. The binding takeaway: **a cluster of glass controls should share ONE container/backdrop sample and merge at the seams**, never stack as independent glass-on-glass plates (which Apple explicitly warns reads wrong).

### 1.6 Corner radius — CONCENTRIC capsule-default

- **Capsule is the default control shape**; Circle for icon-only; RoundedRectangle(`.containerConcentric`, `.continuous`) for panels.
- **Concentric corners**: a nested glass element's radius automatically matches its container so the gaps stay uniform (the inner radius = outer radius − inset).

**Alignment:** our `--radius-*` named register (`-pill`/`-card`/`-control`/`-chip`/`-panel`) + the `.continuous`-equivalent superellipse squircle (W-SQUIRCLE) cover this. The CONCENTRIC rule is the one we under-implement: a nested chip inside a card should derive its radius from the card's radius minus the inset, not carry an independent literal. This is the `W-CORNER-CONCENTRIC` opportunity (a `calc(var(--parent-radius) - var(--inset))` token idiom). iOS-27 also wants FLATTER controls (less extreme squircle — §3).

### 1.7 Motion — fast bouncy spring + interactive feedback

- **Default morph between glass shapes**: `.bouncy` (`withAnimation(.bouncy)`, `.bouncy(duration: 0.4)`).
- **Gesture spring**: `spring(response: 0.3, dampingFraction: 0.6)`.
- **Interactive glass**: scales + bounces + shimmers on touch (the `.interactive()` modifier).

**Alignment:** our spring family is a DIRECT match — `--spring-snappy` (response 0.35, ζ 0.65, the iOS drag register) ≈ Apple's `spring(0.3, 0.6)`; `--spring-bouncy` ≈ `.bouncy`. The per-spring `--spring-<name>-duration` clock (BA.W-GLASS-CAL Unit 3) is the correct web idiom. The interactive scale/bounce/shimmer is our W-LIQUIDHOVER tier-root specular auto-arm + `useSpringPress` coupled press. **No new spring is owed** — the Apple values bracket ours (the W-GLASS-CAL spring fence holds; do NOT re-mint).

### 1.8 Legibility + accessibility (the non-negotiable floor)

- Glass darkens/frosts to keep foreground legible; ink lifts over busy.
- Respects **Reduce Transparency** (→ more frosted/opaque), **Increase Contrast**, **Reduce Bright Effects** (26.4+, minimizes highlight flashing), **Tinted mode** (26.1+, more opaque).

**Alignment:** our W55 bright-bucket darken + the muted→foreground lockstep + the `prefers-reduced-transparency`/`prefers-contrast: more` → `--glass-level` brackets are the 1:1 web mapping. Apple-AFFIRMED. The one addition iOS-27 surfaces: a CONTINUOUS user transparency control (§3) — a consumer `--glass-level`/`--glass-tint-strength` knob already grants this (presets-in-consumers).

---

## 2. The iOS-27 / macOS-Tahoe-successor refinements (the 2026-06 change set)

iOS-27 TUNES Liquid Glass (it is a refinement, not a redesign). The MacRumors 2026-06-10 change set + the media critique (`media-analysis.md §C ios27-a`), mapped to our token seams:

| iOS-27 change | Apple wording | Our seam (no new compositing path) |
|---|---|---|
| **Darker edge + brighter specular** | "darkened edge around Liquid Glass elements, along with brighter specular highlights" | lift `--glass-rim-top` α + ADD a bright bottom catch-light; the dark edge is a thin perimeter stroke (NOT the heavy grey the critique condemns — keep the L/R light) |
| **Better content diffusion** | "more effectively diffuses complex content, improving readability" | the blur/saturate companion already does this; verify the radius reads "diffused but legible" (the W-GLASS-CAL calm-blur dial is correct; the DEEP tier is the iOS-27 thick register) |
| **Continuous transparency slider** | "anywhere from ultra clear to fully tinted" | the consumer `--glass-level` (opacity) + `--glass-tint-strength` (tint) knobs ARE this axis — document the "ultra-clear↔fully-tinted" range as the consumer dial |
| **Scroll-edge floating bars** | "uniform toolbar across the top... keeping text legible while improving contrast" | the bright-bucket on the floating/overlay band already self-darkens; a scroll-driven top-bar lift is the `.scroll-cascade`/`::before` backplate idiom (W-SCROLL-CARD precedent) |
| **Sharper refracted icons** | "icons sharper and more defined, with new refraction features selectively applied" | the IconChip + the `<GlassControl>` disc carry selective refraction (the `.glass-lens` opt-in per-instance) |
| **Lighter INNER shadow on controls** (media critique) | "lighter drop-shadows INSIDE the glass buttons" | re-tune `--glass-under-shadow-*` α DOWN on control tiers (not card tiers) |
| **FLATTER tops/sides** (media critique) | "flatter tops and sides instead of such rounded squircles" | a per-register `--glass-superellipse-n` biased flatter on CONTROLS (distinct from the card register) |
| **Brighter upper/lower edges, light mode** (media critique) | "much brighter upper and lower edges in light mode" | the directional rim's bright top + the NEW bright bottom catch (the "believable-glass" bar) |
| **L/R edges less dark-grey** (media critique) | "edges on left and right aren't quite as dark grey" | drop the SIDE under-shadow; keep top/bottom directional rim |

These are owned by the sibling `glass-ios27-every-element.md` (the per-element residue ledger) + `glass-ios27-buttons-icons-controls.md`. This doc records them as the PRINCIPLE-level change set; the siblings carry the token-level execution.

**The "believable glass" bar (the critique's verdict):** "Edges are still too dark to trick my brain into believing they're glass." The single test for every glass surface after the iOS-27 tune: **does the edge highlight read as a light-catching glass rim, or as a dark-grey bevel?** The bright top+bottom catch-light is what makes it believable; the dark perimeter is what breaks it. This is a paint-first π-checkable verdict (the `proof:ba-gestalt` glass-band).

---

## 3. The metallic-aurora alignment (iOS-27 flow-field backgrounds → our new aurora medium)

The iOS-27 flow-field backgrounds (Apple Music auroras, `vid-aurora`) carry a SATIN/METALLIC sheen — a flowing-gradient field whose surface-normal catches light. This is the binding reference for the NEW aurora `medium: "metal"` / `"metal-gradient"` family (`media-analysis.md §A`, the W-AUR-METAL wave). Apple-design alignment:
- The metal flow IS a glass-adjacent material — anisotropic specular along the flow direction, the catch-light riding the flow gradient (the same specular language as the glass rim, applied to the FIELD).
- **Pure-metal** (gold/chrome/steel monochrome, sharp catch-lights in the crests) = the Apple-Music violet/red satin frames.
- **Gradient-metallic** (copper→bronze→gold + sparkle grain) = the warmer imperfection-rich register.
- These are NEW painterly mediums beside satin/oil/kuwahara — they ride the EXISTING aurora medium dispatch (the GL/WGSL shader, NOT a new substrate). The metal BRDF (anisotropic specular banding) is the shader addition; the OKLCh field + flow are unchanged.

The metallic aurora is the SOTA-current "iOS-27 flow-field background" — it is the refraction substrate (§1.4) AND a hero register in its own right.

---

## 4. Awwwards / 2026 SOTA — the RESTRAINT discipline (what actually ships)

The 2026 web-design reality-check (studiomeyer, Awwwards collections) is unanimous: the award-winning sites that SHIP (not just demo) follow a restraint discipline. The findings, aligned to our suite:

### 4.1 Glassmorphism — survives in CHROME, not heroes
- Glass "survived only in restrained form on navigation, modals, and feature cards" — exactly the FUNCTIONAL-LAYER rule (§1.2). Glass heroes failed.
- **`backdrop-filter: blur()` is expensive on Android — 15-30% FPS drops when overused.** This is the binding PERFORMANCE fence: glass is for the chrome layer (dock/overlays/controls), NOT every surface. Our W55 calm-content-tier floor (4% sub-perceptual, no full blur on plain content) is the SOTA-correct instinct. The DEEP tier (W-DEEP-GLASS) is OPT-IN per-route, not the default — correct.
- **Implication for the maximal default:** keep glass on the chrome/control/overlay layer where it is the functional surface; the content body stays calm. The proportion is the design, not a limitation.

### 4.2 WebGL/WebGPU — "when the brand IS the experience"
- The SOTA rule: ship heavy GPU "only when the brand is the experience" — creative agencies, fashion, art. A 800kB-2MB Spline scene "destroys Core Web Vitals."
- **Our case CLEARS this bar by construction: glass-ui IS a glass/generative design system — the brand IS the experience.** The viz suite is the product, not an embellishment. BUT the SOTA cost discipline still binds: ONE GL/compute context per route (our existing budget), offscreen-pause, PRM-freeze, the critical-CSS split, the lazy viz chunk. The BD GPU-only mandate + the perf-budget gate (`arch/perf-budget.md`) are the SOTA-correct execution.
- **Safari-first is the SOTA-correct backend stance** (`arch/no-fallback-policy.md`): WebGL2 as the co-equal GPU backend covers ~universal traffic; WebGPU-first where allowed. The "no Canvas2D/CSS-fallback" mandate is the clean-break version of the SOTA "GPU only when it's the brand."

### 4.3 Motion — choreographed, not decorative
- Kinetic typography "everywhere in portfolios, almost never in production" — it "fights screen readers, fights crawlers, adds layout shift." The lesson: motion must be COMPOSITOR-ONLY + a11y-safe + choreographed (entrances, transitions, section reveals), not decorative everywhere.
- **Alignment:** our W-SCROLL-MOTION (page-build/section-cascade/scroll-pinned on the native `scroll()`/`view()` substrate, NO Lenis/GSAP), the `proof:no-layout-animation` floor, the PRM-carve, the per-spring clocks — this IS the SOTA-correct choreography. The "no Lenis/GSAP" fence is the SOTA native-first identity (a 20-40KB JS runtime is the cost the award-winners pay and we refuse).

### 4.4 Dark mode + token systems — load-bearing infrastructure
- Dark-mode-default (82% of users) + token architecture + visual regression testing are "now standard, the essential foundation." Our W-DARK-MATERIAL luminous-transmissive dark register + the entire token-first axis + the `tests-visual/` π corpus + the `proof:*` gate fleet ARE this foundation. Apple/Awwwards-AFFIRMED.

### 4.5 The dock interaction SOTA (the hallmark)
- The Apple-Music dock north-star (`media-analysis.md §D`): the liquid-tab indicator animating between tabs, the now-playing mini-player as a `.tabViewBottomAccessory` ABOVE the tab bar, the player-bloom expand (mini→full), the goo-split. This IS the SOTA dock interaction — a glass functional layer with fluid morph + bloom-from-source.
- **Alignment:** our W-TABS-LIQUID (5-phase indicator), W-DOCK-NOWPLAYING-PILL (the accessory above the bar), W-FLIP-SPINE (the bloom-from-pill via `useLiquidReveal`/`ElementMorph`), W-DOCK-STACK (the gutter rail) are the web transposition. The dock IS our hallmark — the SOTA bar is the Apple-Music fluid-morph dock, and our morph/goo/bloom primitives are the means.

---

## 5. The alignment scorecard — where we ARE Apple-correct, and the gaps

| Apple/SOTA principle | Our state | Verdict / gap → wave |
|---|---|---|
| Glass = functional layer above content | glass-first MAXIMAL (AX.W54) + opaque allowlist | **CORRECT** — keep content body calm (W55 floor); spend the maximal glass on chrome/dock/overlay |
| Glass needs varied content behind | W55 ("blur imperceptible over flat") + DockStage + tier=field | **CORRECT in principle; gap = coverage** — every glass surface wants a live field → the BD viz suite IS the substrate (justified) |
| Regular variant (adaptive default) | `surface="glass"` 5-rung ladder | **SHIPPING** ✓ |
| Clear variant (max-transparent + dimming) | not yet a register | **GAP → `W-CLEAR-VARIANT`** (a `--glass-opacity-clear` tier GATED on a coupled dimming scrim; foreground lifts to full ink) |
| Real lensing/refraction | `.glass-lens` SVG-squircle (W-LENSING) | **SHIPPING** ✓ (Chromium-refined; cross-engine blur+tint floor for Safari) |
| Motion-specular | `useSpecularPointer` + `--specular-angle` | **SHIPPING** ✓ |
| Adaptive shadow/legibility | W55 bright-bucket + muted→fg lockstep | **SHIPPING + Apple-AFFIRMED** ✓ |
| Reduce-Transparency / Increase-Contrast | `prefers-reduced-transparency`/`prefers-contrast` → `--glass-level` | **SHIPPING** ✓ |
| Glass MERGE (GlassEffectContainer) | goo-merge (`smin`) + dock morph-bridge | **SHIPPING in viz; gap = the CONTROL-CLUSTER merge** → W-DOCK-STACK / goo-split |
| Concentric corners | `--radius-*` register + squircle | **GAP → `W-CORNER-CONCENTRIC`** (nested radius = parent − inset via `calc()`) |
| Fast bouncy spring | `--spring-snappy`/`-bouncy` (brackets Apple's 0.3/0.6) | **CORRECT — do NOT re-mint** (spring fence holds) |
| iOS-27 darker-edge + brighter-specular | directional rim at HEAD | **GAP → sibling token deltas** (D1-D9, `glass-ios27-*` docs) |
| iOS-27 flatter controls | uniform squircle at HEAD | **GAP → per-register `--glass-superellipse-n`** |
| Metallic flow-field background | satin/oil/kuwahara mediums | **GAP → `W-AUR-METAL`** (pure-metal + gradient-metallic mediums) |
| SOTA restraint (glass in chrome, GPU = brand) | proportion fences (one-color-event/one-GL-per-route/calm-default) | **CORRECT — the fences ARE the SOTA discipline** ✓ |
| Native scroll choreography (no Lenis/GSAP) | W-SCROLL-MOTION native `scroll()`/`view()` | **SHIPPING + SOTA-correct** ✓ |

**Net:** the library is ~80% Apple/SOTA-aligned ALREADY (the W55/W-LENSING/W-DARK-MATERIAL/spring/scroll-choreography spine is exactly right). The genuine gaps are: **CLEAR variant + dimming**, **concentric corners**, **the metallic aurora medium**, the **iOS-27 edge/specular/flatness token tune** (sibling-owned), and **coverage** (carrying the four glass behaviors onto every chrome surface + a live field behind the glass). None require a new compositing path or a new spring — they ride existing seams.

---

## 6. The binding design rules (drop-in for the roster + the gates)

1. **Glass is the FUNCTIONAL/CHROME layer; the content body stays calm.** The maximal-glass spend lands on dock/controls/overlays, NOT the reading content (the W55 4% calm-content floor is the floor; do not glass a paragraph/table).
2. **No glass without a varied backdrop.** A glass surface over flat color down-shifts to `veil`/`opaque`; the BD viz suite (aurora/metallic/dot-flow) is the refraction substrate the chrome demands. `tier="field"` + `DockStage` are the demo correct-patterns.
3. **REGULAR is the default; CLEAR requires its dimming layer.** `W-CLEAR-VARIANT` ships a max-transparent tier GATED on a coupled `color-mix(in srgb, var(--background) ~30%, transparent)` scrim + a full-ink/pure-white foreground; the gate reds a CLEAR surface with no scrim.
4. **Group glass; merge at seams; never glass-on-glass.** A control cluster shares ONE backdrop sample (one container) and merges (goo) at the seams — Apple explicitly warns independent glass-on-glass reads wrong.
5. **iOS-27 edge tune: bright top+bottom catch-light, light L/R, thin dark perimeter, lighter inner shadow on controls, flatter control squircle.** The "believable glass" π bar: the edge reads as a light-catching rim, not a dark-grey bevel.
6. **Motion = fast bouncy spring + interactive scale/bounce/shimmer + fluid morph.** Reuse `--spring-snappy`/`-bouncy` (brackets Apple's 0.3/0.6); compositor-only; PRM-carved. Do not re-mint a spring.
7. **SOTA restraint is the discipline, not a limit.** Glass-ui IS the brand-as-experience case that clears the WebGL/GPU bar — but ONE GL context per route, offscreen-pause, native-scroll choreography (no Lenis/GSAP), and the proportion fences are the SOTA-correct execution.
8. **Safari-first.** REGULAR `backdrop-filter: blur()` + cross-engine `box-shadow`/`clip-path` as the load-bearing floor; the Chromium-only `backdrop-filter: url()` chromatic-rim lens is a refinement OVER it (never the only path). WebGL2 is the co-equal GPU backend for Safari (the no-fallback fence).

---

## Sources

- [Apple — introduces a delightful and elegant new software design (Newsroom, 2025-06-09)](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- [Apple — Human Interface Guidelines (Materials / Liquid Glass)](https://developer.apple.com/design/human-interface-guidelines/materials)
- [Apple — Build a SwiftUI app with the new design (WWDC25 session 323)](https://developer.apple.com/videos/play/wwdc2025/323/)
- [Apple — Build a UIKit app with the new design (WWDC25 session 284)](https://developer.apple.com/videos/play/wwdc2025/284/)
- [MacRumors — How Liquid Glass Is Changing in iOS 27 (2026-06-10)](https://www.macrumors.com/2026/06/10/how-liquid-glass-is-changing-in-ios-27/)
- [Conor Luddy — iOS 26 Liquid Glass: Comprehensive Swift/SwiftUI Reference](https://www.conor.fyi/writing/liquid-glass-reference)
- [LiquidGlassReference (GitHub) — the regular/clear + GlassEffectContainer rules](https://github.com/conorluddy/LiquidGlassReference)
- [Blake Crosley — Liquid Glass in SwiftUI: Three Patterns From Shipping](https://blakecrosley.com/blog/liquid-glass-swiftui-patterns)
- [Studio Meyer — Web Design Trends 2026: What Actually Held Up After Six Months](https://studiomeyer.io/en/blog/webdesign-trends-2026-reality-check)
- [Awwwards — WebGL collection](https://www.awwwards.com/awwwards/collections/webgl/)
- [Liquid Glass — Wikipedia](https://en.wikipedia.org/wiki/Liquid_Glass)
