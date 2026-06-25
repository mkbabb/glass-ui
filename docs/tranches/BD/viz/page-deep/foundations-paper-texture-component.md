# Pass-E deep audit — foundations/paper-texture component

**Page:** `demo/stories/foundations/paper-texture.vue`
**Import label (standardize):** `@mkbabb/glass-ui/paper-backdrop`
**Underlying src:** `src/components/custom/paper-backdrop/PaperBackdrop.vue` (44 L) + the CSS recipe `src/styles/paper.css` (`@utility paper-underpaint` / `paper-grain-overlay`) + the texture tokens `src/styles/tokens/scale-paper.css §` (`--paper-clean-texture`, `--paper-aged-texture`).

`PaperBackdrop` is a pure STATIC decorative primitive — a single `<div class="paper-underpaint" aria-hidden>` whose only props are `opacity` and `frequency` ("clean" | "aged"). No reactive state, no renderer, no four-state contract, no procedural viz. The grain layer it paints IS DESIGN.md's 6th optical layer (the micro-texture that keeps glass from reading as flat plastic). So the audit lens is: a backdrop primitive correctly has NO animation/spring — but it MUST honestly read PAPER over a colorful field, its cascade tokens must be LIVE not dead, and its positioning must compose with a contained host.

---

## 1 · ANIMATION affordance

**Correctly motion-free** — a backdrop grain is the §6-calm reference register; it neither lifts, presses, nor squishes (the `aria-hidden` decorative floor). No four-state contract is owed (it is not interactive). No janky/dead animation IN the primitive.

**MISSING (the gestalt gap, not a bug):** the demo presents the texture as a flat spec-sheet (5 `StorySection`s of static swatches + a raw `<input type=range>`), with ZERO entrance choreography. Per the BD demo-modernization mandate every page should "deftly use a series of glass-ui components" with HIGH animation affordance — the swatches should arrive on `.scroll-cascade` (the W-SCROLL-MOTION view()-timeline build) and the frequency comparison should cross-fade clean↔aged on a spring rather than mounting two static panels. This is a DEMO-PAGE finding (zero src paint), the BD Band-4 charter.

## 2 · PROCEDURAL VIZ

None — the texture is a static `feTurbulence` SVG data-URI, not a GPU pass. Correct: a paper grain is not a procedural-suite member (no aurora/blob/fourier). The `prefers-reduced-motion` guard in `paper.css:62` (`animation: none`) is a defensive no-op (there is no animation) — harmless but documents intent.

## 3 · PERFORMANCE

Compositor-friendly: a fixed/absolute `background-image` + `mix-blend-mode`, no layout property, no rAF, no offscreen concern. The 60×60 tile repeats cheaply. **One real cost:** `mix-blend-mode: multiply`/`soft-light`/`overlay` forces a separate compositing layer and (on the `::after` overlay form) an `isolation: isolate` stacking context — acceptable for a backdrop, but the demo stacks 8 instances on one route (2 frequency + 3 retint + opacity + layered + composition), each its own blended layer. No thrash, but the blend-layer count is the only watch-item.

## 4 · SAFARI compatibility

`feTurbulence` data-URI, `mix-blend-mode`, `background-size`/`repeat` are all Safari-stable. **`prefers-reduced-transparency: reduce` → `opacity: 0`** (paper.css:55) is DESIGN.md §L5-aligned (grain → 0 in the transparency fallback) and Safari-honored. No `@supports`-gated feature, no Chromium-only path. Safari-clean.

## 5 · IDIOMATIC / no-legacy — THE REAL FINDINGS

**(a) DEAD TOKEN — `--paper-underpaint-color` is documented but NEVER read (the highest-severity finding).** The SFC docstring (`PaperBackdrop.vue:5-11`) and the demo's entire "`--paper-* cascade retint`" section (`paper-texture.vue:47-70` + the `.scope-warm/cool/bone { --paper-underpaint-color: … }` style block) advertise overriding `--paper-underpaint-color` to retint the underpaint. But `paper.css` `@utility paper-underpaint` paints ONLY `background-image` (the turbulence) — it sets NO `background-color` and reads `--paper-underpaint-color` NOWHERE in `src/`. So the warm/cool/bone swatches paint BYTE-IDENTICAL grain — the retint section silently no-ops (the documented-token-that-never-paints class, the §A5-1 `hsl()`-double-wrap lineage). FIX: add `background-color: var(--paper-underpaint-color, transparent)` to the `paper-underpaint` utility (+ the dark arm) so the cascade the docstring promises is real, OR retire the token + demo section (clean break). The token must either PAINT or DIE.

**(b) `position: fixed` vs contained-host mismatch.** `paper-underpaint` is `position: fixed; inset: 0; z-index: -1` — authored as the app-root fullscreen underpaint. But EVERY demo usage wraps it in a contained `overflow-hidden rounded-card` host expecting it to fill THAT box. A `fixed` child ignores the host's clip-box for positioning (it pins to viewport, the `overflow-hidden` only clips the paint) — it works by accident here because `inset:0` + viewport-fill + clip happens to cover the card, but it is NON-IDIOMATIC and breaks if the card scrolls or is offset. The primitive conflates two registers (app-root underpaint vs in-card grain). IDIOMATIC FIX: the SFC should default `position: absolute` (fill the positioned host) with an explicit `fixed`/`fullscreen` opt-in prop — the `paper-grain-overlay` `::after` register is the already-correct contained form the SFC should compose, not the `fixed` underpaint.

**(c) `frequency` is "advisory only" + the opacity baked into the texture token.** `frequency="aged"` swaps `backgroundImage` to `var(--paper-aged-texture)` — but the two texture tokens bake DIFFERENT opacity INTO the SVG `<rect opacity>` (clean 0.04, aged 0.06), so the `opacity` prop and the texture's baked alpha are two uncoordinated alpha axes (a consumer setting `:opacity` over `aged` multiplies an already-darker grain). The docstring even flags `frequency` "(advisory only)". Architecturally the frequency should be a real register (a `--paper-texture` indirection the SFC sets), not an inline `backgroundImage` paste that bypasses `paper-underpaint`'s OWN `background-image`. Also: the SFC's inline `var(--paper-aged-texture)` and the utility's hardcoded inline data-URI are TWO copies of the clean turbulence (the utility hardcodes 60px-tile baseFrequency-0.65; the token is a 200px-tile variant) — a latent dual-source.

**(d) glass six-layer + colorful-aurora posture (the user ask).** The page demos grain over `bg-card`/paper-toned panels — NOT over a colorful aurora field. Per the user's binding ask ("glass demos over COLORFUL aurora backgrounds") + DESIGN.md's "grain is the 6th layer OF a glass composite," the `layered composition` section (`:114`) should show the grain as the FINISHING layer atop a real `.glass-floating` tier over an `<Aurora>` field — proving the six-layer stack — rather than as a standalone texture on an opaque card. The retint swatches should sit in their OWN glassy cards (the user's "each sub-section in its own glassy card"). The main card area is small (`h-44`/`h-56`/`h-40` fixed panels) — the user wants it BIGGER.

## 6 · GLASS SIX-LAYER composite

The primitive supplies LAYER 6 (grain) ONLY — correct, it is the grain primitive. But the DEMO never shows it composing with layers 1-5 (backdrop blur, surface tint, edge rim, inner catch-light, drop shadow). It reads as an isolated texture, not as the finishing micro-texture OF a liquid-glass surface. The page should demonstrate the full stack at least once.

---

## FOLD/MODIFY/AUGMENT/PRUNE → BD tranche

- **MODIFY (src, NEW micro-wave owed) — finding (a):** the dead `--paper-underpaint-color` is a SRC bug; BD Band-4 is explicitly "zero src paint," so NO existing wave covers it. Owe a tiny src wave **`BD.W-PAPER-UNDERPAINT-LIVE`** (or fold into a src-hygiene wave): paint `background-color: var(--paper-underpaint-color, transparent)` in `paper.css` (+ dark arm) so the cascade the docstring + demo promise is real; gate the token live. Sibling-class to the `--paper-clean-texture` dual-source cleanup (c).
- **MODIFY (src) — finding (b) + (c):** the `position:fixed` register-conflation + the advisory `frequency` are src architectural-transposition items — the SFC should default `absolute` + compose the `paper-grain-overlay` contained form, and `frequency` should be a real `--paper-texture` indirection (one texture source, opacity decoupled from baked alpha). Owe **`BD.W-PAPER-BACKDROP-CONTAIN`** (src).
- **AUGMENT (demo, fold into `BD.W-TOKEN-TOUR-GLASS` Arm B):** the foundations glass-band demo is ALREADY chartered for `paper-glass.vue`; EXTEND it to `paper-texture.vue` — each sub-section in its own `<ShowcaseFrame tier="field">` glassy card, the `layered composition` section showing grain as the 6th layer over a `.glass-floating` tier over `<Aurora>` (respecting the one-GL-per-route budget — ONE shared offscreen-paused aurora via `<DockStage>`-style staging), the main canvas BIGGER.
- **AUGMENT (demo) — animation affordance:** wire the swatches onto `.scroll-cascade` (W-SCROLL-MOTION) entrance + a spring clean↔aged cross-fade. Fold into `BD.W-TOKEN-TOUR-GLASS` Arm A or a demo-design wave.
- **MODIFY (demo) — import label:** standardize the demo import to `@mkbabb/glass-ui/paper-backdrop` (currently the deep relative `../../../src/components/custom/paper-backdrop` — `:13`), per the user's "standardize the import-path label" ask. Fold into the page-modernization wave.
- **PRUNE (demo) — tighten language:** the three SFC/demo docstrings restate "the cascade is the canonical way to retint" three times; tighten per the user's superfluous-language ask + DESIGN writing-style.

---

## VERDICT (5 lines)

1. `PaperBackdrop` is correctly motion-free (a decorative `aria-hidden` grain = DESIGN.md's 6th layer); it owes NO four-state/spring contract, and it is compositor-clean + Safari-stable.
2. HIGHEST finding — `--paper-underpaint-color` is documented by the SFC + the entire demo retint section yet read NOWHERE in `paper.css`, so the warm/cool/bone swatches paint identical grain (a dead-token silent no-op); the token must paint or die → owe a SRC micro-wave.
3. The `position:fixed` app-root register is conflated with the contained in-card usage (works by accident), and `frequency` is "advisory only" with opacity baked into two uncoordinated alpha axes + a dual texture source → SRC architectural-transposition (`BD.W-PAPER-BACKDROP-CONTAIN`).
4. The demo never shows grain composing the full six-layer glass stack over a COLORFUL aurora field, the cards are small + opaque, and there is zero entrance animation → AUGMENT into `BD.W-TOKEN-TOUR-GLASS` (glassy per-section cards + bigger canvas + scroll-cascade + spring cross-fade).
5. Standardize the import label to `@mkbabb/glass-ui/paper-backdrop` + tighten the thrice-repeated cascade docstrings (no new viz wave owed — this is a static-grain primitive, not a procedural-suite member).
