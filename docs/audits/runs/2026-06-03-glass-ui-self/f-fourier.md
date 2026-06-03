# glass-ui self-audit — slice F: fourier-analysis/web (consumer)

**Slice:** `/Users/mkbabb/Programming/fourier-analysis/web/src` (132 source files; `@mkbabb/glass-ui ^3.1.0`)
**Date:** 2026-06-03 · **Mode:** read-only · **Bidirectional:** consumer DRIFT + GLASS-UI GAPS

## Preamble

This consumer is **already heavily converged**. A prior style tranche (the `A.W3.d` / `A.W2.*` / `D.W4.*` annotations throughout) discharged the easy classes: there is **no `transition: all`**, **no hand-rolled `cubic-bezier`** (every easing reads a `--ease-*`/`--spring-*` token), every spatial animation is bracketed by `prefers-reduced-motion`, and `<Slider>`/`<Configurator>`/`<GlassDock>`/`<MetricBadge>` etc. are consumed at the CVA root with per-instance retint hooks (`--track-color`, `--btn-hover-color`, `--slider-scrub-*`, `--pill-c`). Despite a `tailwind-merge` devDep in `package.json`, **no `cn()`/`twMerge` class-soup site exists** — the components forward to glass-ui primitives directly.

What remains is the **hard residue**: (a) two custom glass surfaces and a hand-rolled "audacious" play button that the canon ladder/`btn-audacious` should absorb, (b) interaction `transform: scale()` literals that should read `--scale-hover`/`--scale-press`, (c) a cluster of patterns the consumer's OWN comments already flag as "filed upstream / CONSTELLATION carry candidate" — these are the real GLASS-UI GAPS the P9/configurator/dock AS work should now satisfy. The single highest-leverage gap is the **token→hex→reactive bridge** (`lib/colors.ts`): glass-ui ships `useTokenColor` but not the canvas-facing hex variant this consumer is forced to hand-roll, complete with a `MutationObserver` re-resolve that duplicates `useTokenColor`'s `useGlobalDark` seam.

---

## Drift by axis

### Axis 1 — Token alignment

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 1 | `EditorControlsDock.vue:179-184`, `CanvasControlsDock.vue:106` (2 files) | `.dock-separator` redefined locally as `height:1.5rem; background:color-mix(--foreground 20%)` — shadows the **density-responsive** canon separator. Used as a `<span class="dock-separator">` *inside* `<GlassDock>`, so the lib rule already applies. | Delete the local block; canon `dock.css:524` ships `height:var(--dock-separator-height)` + `background:var(--surface-tint-15)`. The literal `--foreground 20%` is the `--surface-tint` family (tokens.css:410-417) hand-mixed. |
| 2 | `lib/colors.ts:13` (`STATIC.golden:"#f0b632"`), `:14-17` (`STATIC.rainbow` 6-hex array) | Raw hex duplicating shipped tokens. `--gold` (tokens.css:1015), `--rainbow-{red..violet}` (tokens.css:1026+). The file ALREADY resolves the `--viz-*`/`--section-color-*` family via `cssVarToHex`; these two are the un-tokenised holdouts. | Resolve `--gold`/`--rainbow-*` through the same `cssVarToHex` path instead of literal hex. (Canvas use → see Gap 1 for the reactive-hex bridge.) |
| 3 | `AnimationControls.vue:149-156,181` | `.play-btn` glass surface built from raw `rgba(255,255,255,.25/.15/.05/.2)` border/gradient/inset-shadow + `color:#fff` literals. | The glass ladder paints from `--glass-*` tokens + `--surface-tint-*`; white-on-glass insets are the `.glass-floating`/`.glass-btn` recipe (glass.css). See axis-3 #1 + Union A. |
| 4 | `EasingPicker.vue:49` | `--easing-accent: hsl(248 88% 71%)` defined inline; consumer comment (`:44`) says *"Filed upstream as a carry."* | Token GAP — see Gap 4. |
| 5 | `PaperSearch.vue:114`, `:261-262` | `box-shadow: 0 4px 16px rgba(0,0,0,0.1)` — raw black-alpha instead of the `--shadow-color`/cartoon recipe. | Shadows compose `color-mix(in srgb, var(--shadow-color) N%, transparent)` over `--shadow-color:var(--foreground)` (tokens.css §7 / CLAUDE.md). Use `.shadow-cartoon-*` (utilities.css:621) or a `--shadow-color` mix. |

*Legitimate (not flagged):* hex/rgba inside `<canvas>`/SVG paint contexts (`BasisCanvas`, `ConvergencePlot`, `FrequencyGraph`, `HarmonicLevelGrid`, `FourierShapeExtractor`, `DarkModeToggle` morph colors, `ImageUpload` rainbow-slide keyframe) — these are imperative pixel paint, not CSS styling, and many already read `VIZ_COLORS` (token-derived).

### Axis 2 — Utility / @apply hygiene

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 6 | `style.css:118-123` (`@utility cartoon-card` shim) | The `.cartoon-card` dead-class resurrection — consumer re-binds the retired class at 14 sites. Self-documented as a "fourier-local KISS stop-gap" pending re-publish. | GAP — see Gap 3. Not consumer drift to fix locally; a lib decision (re-ship or migrate the 14 sites to `cartoon-surface`). |
| 7 | `style.css:140-150` (`.gallery-card:focus-visible` etc.) | Four focus-ring selectors hand-declared at the global layer because scoped-style hashes block the canon `.focus-ring`. Consumer comment (`:135`) calls it "the only pre-W4 conformant pattern". | The canon `.focus-ring:focus-visible` (utilities.css:140) is the recipe; it can't reach scoped-class hooks. GAP — see Gap 5 (a slot-class or `:focus-visible` data-hook on the lib's interactive primitives would remove the need). |

### Axis 3 — Interactive consistency

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 8 | `AnimationControls.vue:181` (`scale(1.08)` hover) `:182` (`scale(0.93)` active); `GalleryCard.vue:210,216,261,264`; `admin-overlay-btn` `:283,287` (`scale(1.1)`/`scale(0.95)`); `FullscreenViewer.vue:201,205`; `PaperView.vue:611,615`; `AppHeader.vue:287` — **≈12 hover/active sites** | Bespoke `transform: scale(<literal>)` for hover/press instead of the scale tokens. The literals even MATCH the tokens (`1.08`=`--scale-hover`, `0.96`≈`--scale-press`). | `--scale-hover` (1.08), `--scale-press` (0.96), `--scale-press-btn` (0.97), `--scale-hover-dock`/`--scale-press-dock` (tokens.css:980-990). For Button-rooted hooks (`.like-btn`, `.admin-overlay-btn`), the four-state contract is already on `buttonVariants` — the press-scale shouldn't be re-declared at all. |
| 9 | `AnimationControls.vue:144-186` | `.play-btn` reimplements the **entire** primary-audacious interaction: glass plate + rainbow `::before` drift + scale-press + focus-ring, all hand-rolled (raw rgba, `scale(1.08)/0.93)`, `outline: 2px solid rgba(255,255,255,.6)`). | `<Button variant="primary-audacious">` composes `@utility btn-audacious` (utilities.css:700) — disco-grain + sparkle-sweep + specular backplate. The play-btn's rainbow-drift is a near-clone of `btn-audacious`'s sparkle layer. See Union A. |

*Note:* hit areas are compliant — `DockIconButton` carries the `--size-icon-btn` coarse-pointer floor (the consumer relies on it, doesn't override it).

### Axis 4 — Variant orthogonality + rooting

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 10 | `VisualizationView.vue:344` | `:deep(.configurator-stage){ flex:1 1 0%; min-height:0 }` — reaches into the glass-ui-owned `configurator-stage` class (Configurator.vue:194) to force flex-fill in a responsive flex-column layout the lib's grid doesn't anticipate. | GAP — see Gap 2. A `:deep()` against a lib internal = a missing prop/slot-class. The Configurator stage needs a `stageClass`/fill prop so the mobile single-column layout doesn't need to pierce the boundary. |

*Legitimate (not flagged):* the remaining 18 `:deep()` sites target **KaTeX** output (`.katex`, `.katex-display`, `mark`) or the slice's **own** scoped classes (`.canvas-container`, `.editor-shell`, `.eq-coeff`, `.like-btn svg`) — neither is a reka-ui/glass-ui internal.

### Axis 5 — Overlay + motion vocab

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 11 | `EquationView.vue:444-447` | `.pop-enter-active`/`.pop-leave-active`/`.pop-enter-from`/`.pop-leave-to` **redefined** — name-collides with the canon `.pop` Vue Transition (transitions.css:63). Whichever load order wins, this shadows or duplicates the lib class. | Use the shipped `.pop` transition; drop the local block (or rename if a distinct curve is truly needed). |
| 12 | `VisualizationView.vue:426-428` (`.expand-pop`), `AppHeader.vue:279-289` (`.share-pop`) | Distinct names but duplicate the `.pop` recipe (opacity+scale, `--ease-apple-spring`). | Parameterise the canon `.pop` (or accept as deliberate one-offs — the `scale(0.3)` expand is a bigger throw than `.pop`'s default). Lower severity than #11 (no name collision). |
| 13 | `AnimationControls.vue`, `UserSlugBar.vue:167`, `EquationResult.vue:99`, `ConvergenceTimeline.vue:144` (4 files) | `.icon-swap-enter/leave` (opacity + `scale(0.7/0.8)`) — the icon-toggle crossfade duplicated verbatim across 4 files. | GAP — see Gap 6. No canon equivalent; `transitions.css` ships `.fade`/`.pop`/`.dropdown` but no icon-swap. |
| 14 | `GalleryCard.vue:297-303` (`like-bounce`), `style.css:97-105` (`tab-slide-in`) | Local `@keyframes` flagged by the consumer's own comments as "CONSTELLATION carry candidate" (`GalleryCard.vue:294`) and "local carry pending glass-ui's Tabs primitive" (`style.css:91`). | GAPs — see Gap 6 (like-bounce → a `like`/heart-pop recipe) and Gap 7 (tab-panel entry on `UnderlineTabs`). |

### Axis 6 — Typographic / structural

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 15 | `EquationModeToggle.vue:69,76` (16px/11px), `FunctionInput.vue:258` (12px) | `font-size:<px>` literals in **UI** scoped styles, bypassing the typography ladder. | `.text-{base,sm,mono-*,section-label}` / the √φ scale (typography.css). |

*Legitimate (not flagged):* `font-size:<px>` on chart-axis / canvas-tick labels (`ConvergencePlot:391`, `FrequencyGraph:225`, `ConvergenceLegend:90`, `ConvergenceTimeline:98`) — these size SVG/canvas text where the rem ladder doesn't apply; `font-size:inherit` (`BasisSelector`, `SliderControl`) — explicitly deferring to the cascade. Display headings use the brand `--font-sans` fork (Computer Modern Serif, `style.css:15`) per the consumer's identity — that is a deliberate brand remap, not drift.

### Axis 7 — A11y resilience

| # | Site(s) | Drift | Canonical |
|---|---------|-------|-----------|
| 16 | `ConvergenceTimeline.vue:110-112`, `AnimationControls.vue:151` (`.play-btn`) | Custom glass (`color-mix(--background 60%)` + `backdrop-filter:blur(8px)`; and the play-btn's `blur(12px) saturate(1.4)`) with **no** `@supports not (backdrop-filter)` / `prefers-reduced-transparency` / `prefers-contrast` fallback. The canon ladder ships all three (glass.css:295,314,326). | These REimplement glass → they inherit the obligation. Either adopt `.glass-quiet`/`.glass-resting` (which carry the fallbacks) or replicate the three `@media`/`@supports` guards. The `AppHeader.vue:54` pattern (`supports-[backdrop-filter]:bg-background/60`) is the correct minimal form and should be the template. |

*Note:* no `color-mix` site was found baking a light-mode fg into a dark-unwindable value — every mix reads `var(--foreground)`/`var(--background)`/`--viz-*`, all `light-dark()`-resolved upstream. The `style.css:128-138` `--viz-amber` light-darken (axe contrast carry) is correct and dark-mode-safe (separate `.dark` arm).

---

## GLASS-UI GAPS

Patterns the slice needs that glass-ui doesn't expose. Several are pre-flagged by the consumer's own "filed upstream" comments.

**Gap 1 (HEADLINE) — reactive token→hex bridge for canvas consumers.** `lib/colors.ts` is a 110-line hand-rolled `cssVarToHex` (hsl/rgb/bare-triplet→hex) + a `reactive VIZ_COLORS` map + `hexToRgba`/`hexToRgb` + `App.vue:11-13` wiring a `MutationObserver` to re-resolve on dark toggle. glass-ui ships `useTokenColor` (composables/dom) which gives the **reactive ref + dark re-resolve via `useGlobalDark`** — but returns the raw `hsl(...)` string, not the **hex** every `<canvas>`/`ctx.strokeStyle` consumer needs. **Sites:** `BasisCanvas.vue:127,172,257` (`ctx.strokeStyle = VIZ_COLORS.*`), `FrequencyGraph`, `ConvergencePlot`, `HarmonicLevelGrid` (canvas paint); `App.vue:13` (MutationObserver duplicating the `useGlobalDark` seam). **Placement:** extend `useTokenColor` with a `format: "hex" | "rgb"` option (or ship a `useTokenColorHex` sibling) in `composables/dom/`, and co-export `hslToHex`/`hexToRgba` as pure utils. This retires `lib/colors.ts`'s resolver, its reactive map, AND the `App.vue` MutationObserver in one move. Canvas-token-paint is the single most-repeated consumer need.

**Gap 2 — Configurator stage fill / responsive single-column.** `VisualizationView.vue:344` pierces `:deep(.configurator-stage){flex:1 1 0%;min-height:0}` because the desktop grid track gives the stage height but the mobile flex-column collapses it to 0 (consumer comment `:338-343` documents the canvas rendering at ~4px). The Configurator's mobile/narrow layout needs a first-class fill mode. **Placement:** a `stageClass` slot-class prop, or a `fill`/`responsive` prop on `<Configurator>` that sets the stage `flex:1;min-height:0` at narrow widths. This is squarely **P9/configurator AS work**.

**Gap 3 — `.cartoon-card` recipe (or migration).** `style.css:106-123` resurrects the retired `.cartoon-card` (removed at glass-ui C.W5) because the consumer binds it at **14 sites / 13 files** (one file 5×). `cartoon-surface` survives decoration-only but the bordered-card composite (2px border + offset-stamp shadow + hover-lift over `--border`/`--card`) was the actual consumed shape. **Placement:** either re-ship a `.glass-card`-family `cartoon-card` composite in `cards.css`, or publish the canonical migration (the shim body IS the recipe). 14 sites is well over the ≥2-consumer threshold.

**Gap 4 — `--easing-accent` viz token.** `EasingPicker.vue:49` defines `--easing-accent: hsl(248 88% 71%)` inline; comment `:44` says "Filed upstream as a carry." It's a periwinkle/indigo viz-easing accent that doesn't map onto the existing `--viz-*`/`--section-color-*` family. **Placement:** add to the viz palette in `tokens.css` (near `--viz-legendre` hsl(286…) which is the nearest hue) if ≥2 consumers want it; else confirm the consumer maps it onto `--viz-legendre`/`--section-color-1` (purple, hsl(272 44% 47%)) and drops the local token.

**Gap 5 — `:focus-visible` reach into scoped-class hooks.** `style.css:135-145` hand-declares focus rings for `.sidebar-link`/`.floating-toc-item`/`.callout-btn`/`.gallery-card` at the global layer because the canon `.focus-ring` can't penetrate Vue's scoped-style data-attr hash on a consumer-authored class. **Placement:** this is structural — the canon `.focus-ring` is correct for lib primitives; the gap is that consumer link/card affordances built on `<a>`/`<div>` have no lib primitive to root on. A lightweight `.interactive-item`/`.focus-ring` documented as **global-layer-safe** (it is) closes most of this; the real fix is the consumer rooting these on a lib `<Button variant="link">`/card primitive.

**Gap 6 — `icon-swap` Vue Transition + `like-bounce` heart-pop.** `.icon-swap-enter/leave` (opacity + scale crossfade for icon toggles) is duplicated in **4 files**; `like-bounce` (heart scale 1→1.3→1, `--ease-apple-spring`) is a one-off the consumer flags as a "CONSTELLATION carry candidate." **Placement:** ship `.icon-swap` alongside `.fade`/`.pop`/`.dropdown` in `transitions.css`, and a `@keyframes like-pop`/`.heart-pop` in `animations.css` (the `pulse-dot-bounce` keyframe at animations.css:177 is the nearest shipped relative — a generic `pop-bounce` could serve both).

**Gap 7 — Tab-panel entry animation on `UnderlineTabs`.** `style.css:91-114` carries a `tab-slide-in` (translateX(8px)→0, reduced-motion-guarded) targeting `[data-state="active"][role="tabpanel"]`, flagged "local carry pending glass-ui's Tabs primitive shipping this." **Sites:** `EquationView`, `VisualizationView`, `GalleryView`. **Placement:** `UnderlineTabs`/`Tabs` content should ship its own panel-entry transition (the data-attr the consumer targets is the upstream primitive's own).

**Gap 8 — Labeled-slider with per-instance track retint + inline numeric.** `ui/SliderControl.vue` (label + subtitle + editable numeric input + `--track-color` retint over `<Slider variant="glass-scrubber">`) is the consumer's own chassis where glass-ui ships `/labeled-field` (`LabeledSlider`). `LabeledField`/`LabeledSlider` is imported **nowhere** in the slice. **Placement:** verify whether `LabeledSlider` exposes the `--track-color` per-instance retint + an inline editable numeric value; if not, those are the additions that would let the consumer retire `SliderControl`. **Configurator/AS-adjacent.**

---

## UNION CANDIDATES

**Union A — audacious glass action button (play-btn ↔ `btn-audacious`).** `AnimationControls.vue:144-186` (`.play-btn`: glass plate + rainbow-drift `::before` + scale-press + specular `::after`) and glass-ui's `@utility btn-audacious` (utilities.css:700) / `primary-audacious` variant are the **same gesture** — a high-emphasis action button with a sparkle/rainbow sweep over a glass backplate. The consumer's rainbow-drift even animates a 7-stop hsl gradient (`AnimationControls.vue:164`) that mirrors the `--rainbow-*` family `rainbow-vivid` paints. **Canonical:** `<Button variant="primary-audacious">` with a `rainbow` accent override; if the always-on rainbow-drift (vs. on-hover sparkle) is the distinguishing axis, add a `--btn-audacious-drift` mode rather than re-authoring the whole surface. Retires the largest single bespoke-glass block in the slice.

**Union B — token→hex resolver (`cssVarToHex` ↔ `useTokenColor`).** Both forms resolve a CSS custom property to a usable value with dark-mode re-resolution; the consumer's adds hsl/rgb→hex conversion for canvas. **Canonical:** `useTokenColor` gains a `format` option + co-exported `hslToHex`/`hexToRgba` (see Gap 1). This is the highest-impact union — it deletes `lib/colors.ts`'s resolver + reactive map + the `App.vue` MutationObserver.

**Union C — `.pop` Vue Transition (consumer `.pop`/`.expand-pop`/`.share-pop` ↔ canon `.pop`).** Three consumer pop variants (one a name-collision, two renamed clones) vs. the shipped `transitions.css` `.pop`. **Canonical:** the canon `.pop`; if a larger-throw variant is genuinely needed, add `.pop-lg` (scale(0.3) entry) to `transitions.css` rather than three per-file redefinitions.

---

## Tally

**16 drift rows** (≈30 sites; heaviest: 12 bespoke `scale()` literals, 4 `.icon-swap` dupes, 2 `.dock-separator` redefs) · **8 GLASS-UI GAPS** (headline: reactive token→hex bridge retiring `lib/colors.ts` + the `App.vue` MutationObserver) · **3 UNION CANDIDATES** (audacious play-btn → `btn-audacious`; `cssVarToHex` → `useTokenColor` hex mode; `.pop` family) · consumer is otherwise **strongly converged** — no `transition:all`, no hand-rolled bezier, no `cn()` soup, primitives rooted at the CVA, reduced-motion guards present.
