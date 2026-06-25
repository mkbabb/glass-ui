# Pass-E META-STORYBOOK deep audit — `substrates/concentric`

- **Page**: `substrates/concentric`
- **Import (canonical)**: `@mkbabb/glass-ui/concentric`
- **SFC**: `demo/stories/substrates/concentric.vue`
- **Component**: `src/components/custom/concentric/` (Concentric.vue + composables + shaders + constants.ts + README)
- **Live**: http://localhost:5173/substrates/concentric (spot-checked, Chrome/WebGPU)
- **North star**: DESIGN.md (iOS-26/27 Liquid Glass), PROCEDURAL-SUITE.md (the concentric spec), the dock/morph APIs, the VizStudio chassis (BC.W-VIZ-CONFIGURATOR-SUITE)

---

## VERDICT SUMMARY

The page is **thin + flat + currently DEAD on screen**. It hand-rolls a raw `<Configurator>` instead of adopting the canonical `VizStudio` chassis that `aurora.vue` already exemplifies — so it carries a duplicate-heading/blurb defect, a too-small stage, zero §7 suite gallery, and composes NO second-class glass-ui components (no dock/tabs/buttons/cards beyond the one configurator panel). On top of the authoring gaps, the **live viz renders nothing** (0 painted pixels) — a substrate-level WebGPU dead-stage that also hits the sibling `dot-flow-field`, so the page certifies green in device-free gates while showing an empty box.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**Partial on the config surface; FAILS on the live paint.**

- The configurator DOES exercise a broad slice of `ConcentricConfig`: `centers.length` (1–4 families), `baseWavelength`, `beatDetune`, `axisRatio.b`, `renderMode` (traveling-rings · static-contour · both), `lineWidth`, `lineSoftness`, `contourLevels`, `speed`, `interactive`, the teal preset toggle, `paused`. That is a genuine API tour (concentric.vue:129–262).
- **BUG (live): the stage paints NOTHING.** `concentric.vue:119` mounts `<Concentric>` into the stage; the canvas exists (`data-testid=concentric-canvas`, WebGPU context acquired, buffer resized to 1346×1254 DPR) but **every pixel is 0** (transparent) — confirmed by pixel readback in BOTH the default warm-cream preset AND the teal-on-navy preset (a navy field with bright teal rings would be unmistakable; still 0 nonzero px). No `onInitError`, no GL/WGPU console error — a SILENT dead stage. The sibling WebGPU-first `dot-flow-field` is ALSO blank (300×150, 0 px), so this is a **shared WebGPU-substrate dead-stage** (the `armAsync`/draw path no-ops or never wakes in this Chrome, and the WebGL2 fallback is not engaging), NOT a concentric-only fault — but the user SEES concentric as a dead demo regardless.
- The "Drag the cursor (interactive on) → a transient ripple-source follows it" interaction (the headline affordance, blurb concentric.vue:114) cannot be demonstrated while the field paints nothing.
- **Missing API the demo never surfaces**: the per-stop palette is themed only via the binary teal Switch — there is no per-stop `<ColorSwatch>` editor (aurora's studio has the per-stop OKLCh editor; concentric exposes a two-state Switch, the exact "two-state Switch" anti-pattern VizStudio's header comment condemns, VizStudio.vue:6). No reset affordance, no preset thumbnails.

## (2) COMPONENT ABILITY — a deft SERIES of glass-ui components, or thin/flat?

**FLAT.** Component inventory of the whole page:
```
Concentric ×1, Configurator ×1, ConfiguratorLayer ×3, ConfiguratorRow ×12,
LabeledSlider ×8, LabeledSelect ×1, LabeledSwitch ×3, StoryPage ×1, StorySection ×1
```
- ZERO dock components (no `GlassDock`/`DockLayerGroup`/`DockStage`/`DockStack`), ZERO `SegmentedTabs`, ZERO `<Button>`, ZERO `<Card>` (beyond the implicit Configurator panel), ZERO `ExpandableContainer`, ZERO `CompletionSeal`/`BorderProgress`. The page is ONE configurator panel with a slot. This is precisely the "thin/flat" the user condemns and the "deftly uses a SERIES of glass-ui components (docks/procedural-anims/cards/tabs/buttons)" mandate it fails.
- **The dock-API ask is entirely unmet**: the user explicitly asks the pages to "leverage the dock APIs (contextual switching/animating)". The render-mode axis (traveling-rings · static-contour · both) and the family-count axis are *natural dock-contextual-switch candidates* — a `DockLayerGroup`/`DockStack` rail to switch render registers, or a dock to pivot ring-family presets, would demonstrate the dock contextual-switch/morph APIs over the live field. None is present.
- **No §7 suite gallery.** Aurora flows a hint `<aside>` + the masthead + the per-axis layered config BELOW the frame; concentric has only a single trailing `<p>` PRM note (concentric.vue:267–273). No multi-state walk of the render modes / family counts / ellipsoid tilts as discrete specimen cards.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**FAILS the spirit AND the letter.**
- The stage is the procedural field ITSELF (the rings), not a glass surface floating OVER a colorful aurora — so there is no glass morphism to read on this page at all (no glass card sampling the field behind it). The user's "glass demos over COLORFUL aurora backgrounds" intent is unmet: the only glass here is the configurator panel, which floats over the flat warm-cream page, not over a colorful field.
- The DEFAULT is warm-cream rings over a transparent/cream page — even if it painted, the default register is **cream-on-cream, near-invisible** (the blurb concedes "the page reads through the troughs"). The colorful register (teal-on-navy) is hidden behind a default-OFF Switch, so the page's FIRST IMPRESSION (and the gestalt-roster capture) is the least-colorful, currently-blank state. A colorful field should be the LEAD, not an opt-in.
- **No PAPER morphism** where it would be apt (e.g. a Fira-Code math panel showing the `f(p,t) = Σ sin(...)` sum-of-sinusoids the blurb describes — the math-paper idiom would be a strong companion specimen for a Fourier viz, and is entirely absent).

## (4) STRUCTURE — own glassy card per sub-section? main card BIG enough?

**FAILS both.**
- **Not one card per sub-section.** The three control groups (Ring families · Lines · Motion & theme) are `<ConfiguratorLayer>` sections inside ONE configurator panel (hairline `dividers`), not three separate glassy cards. The user asks "each sub-section in its OWN glassy card" — here they are flat divider-separated rows in a single panel.
- **Main card is TOO SMALL / collision-bound.** `concentric.vue:116` hard-codes `class="h-[min(78vh,720px)]"` on a RAW `<Configurator>`. Live, the stage measured **673×627** while the controls column eats ~720px of the right. Worse, the sticky shrink-on-scroll hero (`Concentric` h1 + `@mkbabb/glass-ui/concentric` chip) **OVERLAPS the stage** on scroll (screenshot: the giant "Concentric" wordmark and the subpath chip paint ON TOP of the configurator). The user asks the main card area be BIGGER (more screen space) — instead it is a fixed mid-size frame fighting the hero for vertical space.
- **VizStudio non-adoption is the root cause.** `aurora.vue` composes the canonical `VizStudio` chassis (BC.W-VIZ-CONFIGURATOR-SUITE — StoryPage + `<Configurator asideSide="right">` + rounded clip + height envelope + masthead, VizStudio.vue:1–60). `concentric.vue` re-forks the raw `<Configurator class="h-[...] shadow-cartoon">` by hand (concentric.vue:116) — the exact per-viz re-fork VizStudio exists to kill. Adopting VizStudio is the architectural fix for the structure, the duplicate-heading, and the layout-contract drift in one move.

## (5) PATH-LABEL standardization

**OK at the chassis level; not authored in the SFC.** The `@mkbabb/glass-ui/concentric` Fira-Code subpath chip renders correctly (manifest.ts:227 `"substrates/concentric": "@mkbabb/glass-ui/concentric"`, painted by StoryPage:56) — confirmed live. But the SFC imports use deep RELATIVE paths (`../../../src/components/custom/concentric`, concentric.vue:11–24), which is the demo-internal norm (siblings do the same), so no action needed on the label itself. The chip is correct and standardized.

## (6) LANGUAGE — superfluous prose to tighten

**Heavily over-written + DUPLICATED.**
- **Duplicate descriptor.** StoryPage renders the manifest blurb (manifest.ts:657, a full paragraph) under the hero `<h1>`. Then `StorySection blurb=` (concentric.vue:114) repeats a NEAR-IDENTICAL paragraph ("Thin bright ELLIPTICAL ring-lines spread from two-to-four sources…"). Live, the page shows the SAME content TWICE and "Concentric" as a heading TWICE (the hero h1 + the StorySection heading concentric.vue:112). Tighten: drop the StorySection blurb (or reduce to a one-line section label) — the manifest blurb is the single descriptor home.
- **SHOUTY caps + grandiloquence** throughout the blurb: "Thin bright ELLIPTICAL", "they BEAT", "the SAME deep-water dispersion", "WebGPU-FIRST". The all-caps emphasis is the over-punctuation the writing-style memo condemns. Trim to plain prose.
- The trailing PRM `<p>` (concentric.vue:267–273) restates the axis-ratio mechanism a third time. One PRM note is fine; the ellipsoid-norm re-explanation is redundant.

## (7) BUGS

1. **DEAD STAGE (live, severity HIGH).** `<Concentric>` paints 0 pixels in both presets — silent WebGPU dead-stage shared with `dot-flow-field` (substrate root cause: WGPU `armAsync`/draw no-op + no WebGL2 fallback engaging in this env). The demo reads as an empty gray box. (Caveat: this is a substrate bug surfaced ON this page, not authored in concentric.vue; but it makes the page a dead demo as seen.)
2. **Hero overlaps the stage on scroll.** The sticky shrink-hero (`Concentric` h1 + subpath chip) z-paints over the configurator stage (screenshot at scrollY≈1150). The raw-Configurator layout doesn't reserve the hero band the way VizStudio's envelope does.
3. **Double "Concentric" heading + double blurb** (see §6) — a structure/language bug from passing `heading`+`blurb` to StorySection while StoryPage already paints them.
4. **Vue warn (cosmetic)**: `Component inside <Transition> renders non-element root node` from `<StoryPage>`/`TooltipProvider` under the route `<Transition name="fade-slide">` — non-fatal but logged on every nav.

---

## RECOMMENDED FIXES (architectural, no workarounds)

1. **Adopt `VizStudio`** (kill the raw-Configurator fork) — `<VizStudio heading="Concentric" label=... blurb=... height-class="h-[min(82vh,860px)]">` with `#stage` = `<Concentric>` and `#controls` = the three ConfiguratorLayers. Resolves the structure (rounded chassis + right-controls contract), the height envelope, and the hero-overlap in one move. Bump the height envelope so the main card is BIGGER per the user ask.
2. **Lead with COLOR.** Default the stage to a colorful register (or make the teal/aurora-themed field the default lead, warm-cream the opt-out), so the first impression and the gestalt capture are vivid — and add a real glass card floating OVER the field to demonstrate glass-cannot-sample-glass morphism (the page's stated subject is a procedural field; pair it with a glass specimen so the morphism reads).
3. **Compose a SERIES of components + the dock APIs.** Add a `DockStack`/`DockLayerGroup` rail to contextually switch render-mode registers (traveling-rings/static-contour/both) or ring-family presets over the live field — demonstrating the dock contextual-switch/morph the user explicitly asks for; add a §7 suite gallery of discrete specimen cards (each render mode / family count its OWN glassy card), and a per-stop `<ColorSwatch>` palette editor (retire the two-state Switch).
4. **Fix the WebGPU dead-stage** (substrate, cross-page) — ensure `armAsync` paints a first frame and the WebGL2 fallback engages when WebGPU draws nothing; this is the binding blocker for the whole procedural-suite demo band.
5. **De-duplicate + tighten prose** — drop the StorySection blurb, downcase the SHOUTY emphasis, collapse the triple ellipsoid-norm explanation to one.
