# Pass-E COMPONENT deep audit — `foundations/intro`

**Route:** `/foundations/intro` (manifest `s("foundations","intro", …, { background:{kind:"aurora", palette:"rose-indigo-amber"}, hero:true })`)
**Demo SFC:** `demo/stories/foundations/intro.vue` (hand-authored `text-display-mega` hero + a category-index bento grid).
**Demo chassis (private, NOT library):** `StoryPage.vue` → `StoryHero.vue` (renders the live substrate) · `SectionPreviewCard.vue` (the bento card).

## The REAL src components this page demos

| Component | Path | Role on this page |
|---|---|---|
| **`<Aurora>`** | `src/components/custom/aurora/{Aurora.vue, composables/useAurora.ts}` | The live WebGL2 procedural substrate behind the glass cards (the `rose-indigo-amber` palette wash). |
| **`<IconChip>`** | `src/components/custom/icon-chip/{IconChip.vue, types.ts}` + `src/styles/icon-chip.css` | The per-category section-hue POP (`reveal bloom`), one per bento card (11 live instances). |
| `.glass-resting` (the card rung) | `src/styles/glass/{ladder.css, material.css}` | The six-layer glass composite the `SectionPreviewCard` rides; not a SFC but the load-bearing glass surface. |

Live verification (`:5173`, real Chrome): aurora substrate `webgl` + canvas **armed** at the `opacityCeiling=0.6` ceiling; IconChip carries `.icon-chip--reveal`+`.icon-chip--bloom`+`[data-reveal]`; hero resolves `177.4px` (`text-display-mega`, the D0 of the ladder); **11** preview cards. Screenshot at `_cap-foundations-intro.png`.

---

## AUDIT — the COMPONENTS (not the demo)

### (1) ANIMATION affordance

- **IconChip — HIGH, idiomatic.** Entrance is the `icon-chip-reveal` keyframe on the **per-spring clock** (`--spring-snappy-duration`/`--spring-snappy` linear() string, ~+7% overshoot) with **coupled** opacity (W-MOTION-CANON P3), staggered by `--d × --icon-chip-reveal-step`; hover-bloom GROW rides `--spring-smooth` (enter) and the no-overshoot `--ease-out` (leave, P2 exit-no-overshoot); PRM drops the transform/snaps to endpoint, keeps the fade (P6). Compositor-only (transform/opacity/box-shadow). **No dead/janky animation in the component.** ✔
- **Aurora — HIGH.** Lazy-arm (deferred WebGL init past first paint) + CSS-gradient placeholder cross-fade (pure CSS transition, no rAF choreography); the painterly fbm/OKLCh drift IS the animation. ✔
- **Four-state contract:** IconChip is non-interactive (decorative chip), so the four-state contract is N/A by design — it carries hover-bloom as its sole interactive register, correctly opt-in.

### (2) PROCEDURAL VIZ — Aurora vs PROCEDURAL-SUITE spec

- Adheres. Suite verdict **MIGRATED** (WGSL primary `aurora.wgsl.ts` + byte-untouched `aurora.frag.ts` WebGL2 fallback). `useGpuSubstrate`/`useWebGLCanvas` over the ONE `createCanvasLifecycle` leaf. **GPU-only/Safari bar met** (WebGL2 fallback covers the ~5-10% tail; WGSL gated to Baseline). ✔

### (3) PERFORMANCE

- **Offscreen-pause:** YES — `useAurora` composes `useIntersectionPause` as the single visibility owner + `content-visibility:auto` + `contentvisibilityautostatechange` park + `document.hidden`. `.aurora-root` carries `contain: content` + `contain-intrinsic-size: auto 600px` (the zero-height-collapse guard). ✔
- **Software-raster guard:** YES — `resolveRenderMode` universal SwiftShader/llvmpipe guard → `css` substrate, the luminance-faithful `auroraFallbackGround` (BB.W-AURORA-SWRASTER). ✔
- **Compositor-only / no layout-thrash:** IconChip animates transform/opacity/box-shadow only; SectionPreviewCard hover is `transform` only. No layout property animated. ✔
- **One-GL-per-route budget:** held (intro mounts exactly ONE live Aurora; the bento previews are inert glyph stills, `pointer-events:none`+`inert`). ✔

### (4) SAFARI compatibility

- Aurora: `-webkit-backdrop-filter` covered by the glass ladder; WebGL2 fallback path is the Safari floor; `aurora-canvas` cross-fade is plain CSS. ✔
- IconChip: `color-mix(in srgb …)` + `mask`-free; lucide-`fill` override via CSS-wins-over-presentation-attr (Safari-safe). ✔

### (5) IDIOMATIC / no-legacy

- **FINDING I1 (component, MINOR — dead indirection).** `IconChip.vue:68` `const revealArg = computed<string|undefined>(() => undefined)` — a computed that is *unconditionally* `undefined`, threaded as `v-reveal:[revealArg]`. IconChip never uses the `fade` vReveal arg, so this is a constant masquerading as reactive state. Transpose: drop the computed, write `v-reveal="revealStep"` (the plain non-fade arg is the directive default). Non-functional, cleanup-only.
- IconChip recipe otherwise exemplary: ONE owned recipe (the four `:style` pastes collapsed), token-first axes (`--icon-chip-plate-strength`/`-glyph-ratio`), `in srgb` brand-overlay fence recorded. No dual-path, no workaround. ✔

### (6) GLASS SIX-LAYER composite (`.glass-resting`)

Live-probed on a `.section-preview-card`: (1) backdrop **`blur(10px) saturate(1.05)`** ✔ · (2) surface tint `oklab(… /0.72)` ✔ · (3) edge rim `--glass-border-quiet` border ✔ · (4) inner catch-light `::before` (content present) ✔ · (5) drop shadow `--shadow-card` = `0 4px 16px …/8%` ✔ · (6) grain `::after` + `paper-grain-overlay` ✔. **All six present — glass+paper morphism both.**

---

## DEMO-side findings (zero-src, for the user's page-redesign asks)

These are NOT component bugs — they are the chassis the user's BD asks target:

- **FINDING D1 (chassis, MODERATE — shadow-register mismatch).** `SectionPreviewCard.vue:112` hover = `box-shadow: var(--shadow-card-hover, var(--shadow-cartoon-hover))`. **`--shadow-card-hover` is NEVER defined library-wide** (verified: 0 declarations), so the fallback **always** fires — a card whose REST shadow is the soft `--shadow-md` flips to a Memphis **cartoon offset-stamp** (`4px 4px 0`) on hover. Incoherent register flip. Fix: either mint `--shadow-card-hover` (a soft elevated lift) in `tokens/shadow.css`, or point the fallback at an elevated soft shadow, not the cartoon stamp.
- **D2 (the user's literal asks):** the bento cards are 8 identical boxes over a **desaturated** aurora (the user wants "COLORFUL aurora backgrounds" — the `rose-indigo-amber` at `opacityCeiling=0.6` reads pastel-washed); "each sub-section in its OWN glassy card" + "main card area BIGGER" + "leverage the dock APIs (contextual switching)" + "tighten superfluous language" + "standardize the import-path label" (the Fira-Code subpath chip is present but only on a subset).

---

## FOLD/MODIFY/AUGMENT/PRUNE → BD tranche mapping

| Finding | Disposition | BD wave |
|---|---|---|
| I1 — `revealArg` dead `()=>undefined` indirection | **PRUNE** (component cleanup) | **AUGMENT `BD.W-BC-COMPONENT-CANON`** (component-idiom sweep) — add IconChip `revealArg` removal to the dead-indirection bite. |
| D1 — `--shadow-card-hover` undefined → cartoon-stamp hover-flip | **MODIFY** (chassis shadow register) | **AUGMENT `BD.W-PAGE-OFFTOKEN-SWEEP`** OR a new `BD.W-CARD-SHADOW-HOVER-FOLD` rider — mint `--shadow-card-hover` soft-elevated token; demo `SectionPreviewCard` reads it. |
| D2 — front-door colorful-aurora + bigger main card + dock-API contextual-switch + import-label standardize + language-tighten | **MODIFY/AUGMENT** (the user's page-redesign) | **AUGMENT `BD.W-PAGE-HEADER-FOLD`** (header/identity fold already in-band) + book a `BD.W-FRONTDOOR-BENTO` sibling for the bigger-card + dock-API + aurora-saturation asks. The import-path chip (`section-preview-card-subpath`) standardizes onto the same chassis. |
| Aurora spec/perf/Safari, IconChip animation/six-layer | **FOLD (no-op)** — already compliant | none — record as audited-clean; the components are NOT a defect surface. |

---

## 5-LINE VERDICT

1. **Components audit CLEAN:** `<Aurora>` (offscreen-pause + SwiftShader guard + WGSL-primary/WebGL2-fallback, suite-spec MIGRATED) and `<IconChip>` (per-spring reveal+bloom, compositor-only, PRM-correct, one-owned-recipe) both meet the animation/perf/Safari/six-layer bars — live-verified armed + all six glass layers present.
2. **Only component nit (I1, MINOR):** `IconChip.vue:68` `revealArg` is a `()=>undefined` constant faking reactivity → PRUNE into `BD.W-BC-COMPONENT-CANON`.
3. **Real defect is chassis-side (D1, MODERATE):** `SectionPreviewCard` hover falls to the undefined `--shadow-card-hover` → a soft-shadow card flips to a **cartoon offset-stamp** on hover (register mismatch) → MODIFY via a `--shadow-card-hover` mint.
4. **The user's page asks (D2)** — colorful aurora, bigger main card, dock-API contextual switching, standardized import-label, tightened prose — are demo-redesign scope → AUGMENT `BD.W-PAGE-HEADER-FOLD` + book `BD.W-FRONTDOOR-BENTO`.
5. **No procedural-viz/Safari/GPU/legacy-dual-path defects in the underlying library components** — the substrate + chip are exemplary; the gap is the demo composition the BD page-band already owns.
