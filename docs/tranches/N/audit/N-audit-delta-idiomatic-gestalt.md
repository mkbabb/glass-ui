# N — audit δ (delta — idiomatic gestalt)

Lane: idiomatic-gestalt cross-walk of N's substrate additions against the
existing glass-ui register. READ-ONLY. Tranche tip: `ffc02a9`.

Method: read the 6 wire / contract artefacts under audit, cross-walk each
against the canonical-pattern citations in the proof docs AND the adjacent
in-tree primitives the new shapes are siblings of (Card.tier, GlassDock.density,
GlassDock's own `useTouchGate` consumer site).

## 1. Contract-tier per-artefact gestalt verdict

### 1.1 `src/components/ui/section/Section.vue` — `backdrop?: "none" | "paper"` (W0 Lane A3)

Sibling prop shapes considered:

| Primitive | Axis | Default | Type export | `data-*` attr | CSS rule key |
|---|---|---|---|---|---|
| `<Card tier>` | `CardTier` (5-rung) | `"resting"` | `CardTier` exported from barrel | `:data-tier` | `.glass-${tier}` class compose |
| `<GlassDock density>` | `DockDensity` (4-rung) | `"comfortable"` | NOT exported (local to SFC) | `:data-density` | `.glass-dock[data-density="…"]` |
| `<Section backdrop>` | inline `"none" \| "paper"` (binary) | `"none"` | NOT exported (inline literal) | NONE | conditional `relative isolate` class via `cn()` |

Verdict: **CONSISTENT WITH GlassDock PRECEDENT, MINOR DRIFT VS CARD**.

- Default `"none"` preserving prior visual matches the J-invariant additive-by-default contract (the v0.9 → v1.0 break-glass clause does not apply here — no consumer migration cost).
- The inline string-union type instead of an exported `SectionBackdrop` symbol matches `DockDensity` (also local to its SFC) and is the lighter idiom for a 2-element discriminant. If the union grows to ≥ 3 rungs the type should be lifted out and exported from the package barrel (Card's `CardTier` precedent).
- Absence of `:data-backdrop` attribute is defensible because `backdrop` does not key any CSS rule — its only effects are a `v-if PaperBackdrop` branch + a class toggle (`relative isolate`). Card.tier and GlassDock.density both NEED the attribute because CSS rules pivot on them. Section.backdrop currently does not.
- Composition idiom — composing `<PaperBackdrop>` inline rather than re-rolling the `paper-underpaint` utility — is canonical (Section is a sectioning landmark, PaperBackdrop is the substrate primitive; substrate composes, doesn't get re-implemented).

The `!absolute inset-0` important-prefix on `<PaperBackdrop>` is the load-bearing override (PaperBackdrop's underlying `@utility paper-underpaint` declares `position: fixed`). This is consistent with the broader pattern of "substrate primitives default to their hero use-site geometry; consumer-scoped use needs explicit override" (Aurora ships `position: fixed` similarly).

### 1.2 `src/components/custom/configurator/Configurator.vue` — `density?: ConfiguratorDensity` (W2 Lane A)

Sibling: `<GlassDock density>` (canonical sibling — same axis name, same 4-rung shape).

| Knob | GlassDock | Configurator |
|---|---|---|
| Type | `DockDensity = "compact" \| "comfortable" \| "spacious" \| "audacious"` | `ConfiguratorDensity = "mobile" \| "compact" \| "comfortable" \| "spacious"` |
| Default | `"comfortable"` | `"comfortable"` |
| Type export | local to SFC | `density.ts` shim + re-exported from `@mkbabb/glass-ui/configurator` |
| `data-*` attr | `:data-density` on root | `:data-density` on each `<ConfiguratorRow>` |
| Cascade | self-only (dock root consumes its own value) | provide/inject (`CONFIGURATOR_DENSITY_KEY`) to descendant `<ConfiguratorRow>` |
| Token namespace | `--dock-density-{rung}-{prop}` | `--configurator-row-{prop}-{rung}` |

Verdict: **CONSISTENT, with deliberate divergence well-justified**.

- The 4-rung values differ (`audacious` vs `mobile`) — sensible: GlassDock has no mobile use-case (it's a floating chrome strip, not a settings panel); Configurator's mobile rung is the headline N.W2 driver. No naming collision because the rungs are scoped per-component (no cross-substrate cascade).
- Type-export divergence (Configurator exports `ConfiguratorDensity` + `CONFIGURATOR_DENSITY_KEY`, GlassDock does not export `DockDensity`) is justified: Configurator's provide/inject cascade REQUIRES a stable `InjectionKey` for descendants to inject against; that key MUST be co-locatable in a non-SFC module so `<script setup>` constraints don't break. The Configurator's `density.ts` shim is the canonical place. GlassDock has no descendant-cascade need.
- The provide-as-ComputedRef shape (`provide(CONFIGURATOR_DENSITY_KEY, computed(() => props.density))`) is the canonical Vue reactive-bridge pattern and matches how `<DockLayerGroup>` provides its active-layer state to `<DockLayer>` children (which also uses `computed` wrappers around prop refs).
- Prop-wins-over-inject precedence in `<ConfiguratorRow>` mirrors the CSS-cascade-of-DI idiom used elsewhere (e.g., `<DockLayer inert>` receives parent state but can override).
- Token namespace `--configurator-row-{gap,py}-{rung}` follows the `--{component}-{prop}-{rung}` convention used in `dock.css` (`--dock-density-{rung}-{prop}`) and `tokens.css §10` (MetricBadge: `--metric-badge-{prop}`). The exact ordering (`{prop}-{rung}` vs `{rung}-{prop}`) varies across the codebase but is internally consistent within each substrate cluster.

### 1.3 `src/components/custom/configurator/ConfiguratorRow.vue` — density consumer + scoped CSS

Verdict: **CLEAN**.

- Inject-then-prop-override pattern matches the canonical Vue 3.5 DI cascade idiom.
- Scoped CSS keying off `[data-density="…"]` mirrors `glass-dock[data-density="…"]` in `dock.css`. The choice of scoped `<style>` (vs lifting rules into `tokens.css` or a new `configurator-row.css`) is defensible because the rules are bound to this single SFC and don't need cross-substrate composition.
- Token-first invariant respected: every value (`gap`, `padding-block`) reads from a `tokens.css` custom property, not a hardcoded literal in the SFC.
- The `"comfortable"` rung emits a CSS rule even though it duplicates the prior Tailwind `gap-1.5 py-2` recipe (proof acknowledges this explicitly). This is correct: an explicit `density="comfortable"` consumer should still get token-driven values whether or not Tailwind's `gap-1.5` is purged from a downstream build.
- The pre-N.W2 visual is bit-for-bit preserved when no `density` prop is set anywhere AND no `<Configurator>` ancestor provides it: `resolvedDensity` is `undefined`, no `data-density` attribute is emitted, the row falls through to its baked `gap-1.5 py-2` Tailwind utilities. Excellent additive-by-default discipline.

### 1.4 `src/components/custom/configurator/density.ts` — module-export shape

Verdict: **CLEAN**.

- Two exports — the type alias `ConfiguratorDensity` + the `InjectionKey` constant `CONFIGURATOR_DENSITY_KEY`. Both are correctly co-exported from the package barrel (`src/components/custom/configurator/index.ts`).
- Co-locating the InjectionKey in a non-SFC module is the canonical Vue 3.5 workaround for `<script setup>`'s "no top-level type exports from SFCs" rule. Matches the pattern used in `src/components/custom/sidebar/types.ts` (component-owned types pulled out of the SFC).
- The `InjectionKey<ComputedRef<ConfiguratorDensity>>` typing is precise and gives descendants strict type-safety on `inject()`.
- Doc comment is honest about the fallback semantics ("NO `data-density` attribute is emitted, so the pre-N.W2 visual is bit-for-bit preserved").

### 1.5 `src/components/ui/slider/Slider.vue` — `useTouchGate` wire (W0 Lane A1)

Canonical-pattern citation: `src/components/custom/dock/GlassDock.vue:85, 194-220, 222-226`.

Cross-walk:

| Step | GlassDock | Slider | Match |
|---|---|---|---|
| Instantiate | `const touchGate = useTouchGate(props.collapseDelay)` (2000ms via prop) | `const touchGate = useTouchGate()` (3000ms default) | divergent delay (flagged in proof OQ#1) |
| Root-element capture | `const dockEl = useTemplateRef<HTMLElement>("dockEl")` | `const sliderRootRef = useTemplateRef<{ $el: HTMLElement } \| HTMLElement \| null>('sliderRootRef')` | divergent — Slider needs `$el` unwrap because SliderRoot is a component, not a bare element |
| `handleTouchStart` return-value handling | swallow tap with `event.preventDefault() + stopPropagation()` when `false` | identical | match |
| `handleScrollCheck` on `touchmove` | direct call | direct call | match |
| `handleTouchEnd` on `touchend` | direct call | direct call | match |
| `watch(touchGate.isActive, …)` side effect | calls `collapse()` when inactive AND dock is expanded unpinned | calls `acquire()` / `release()` to bridge into the dock keep-open token path | functionally divergent — same idiom, different consumer role |
| Eligibility predicate | `shouldGateTouch()` short-circuit (orientation + alwaysExpanded filter) | none | divergence rationale: Slider has no analog filter — every slider on touch is gate-eligible |

Verdict: **CLEAN**.

- The idiom is mirrored beat-for-beat. Divergences are all consumer-role driven and explicitly justified in the proof.
- The `$el` unwrap pattern (line 91-96) is the correct Vue 3.5 + reka-ui idiom for resolving a compound primitive's underlying DOM element. Defensible dual-branch shape with `instanceof HTMLElement` fall-through.
- The `acquire()` / `release()` bridge — flipping into the existing dock keep-open token path on `watch(touchGate.isActive)` — is an elegant double-binding that means touch-gesture activity AND pointer-drag activity both produce the same observable side-effect (dock observes the gesture as held). This composes cleanly with the existing pre-N pointerdown path.
- The deactivate-delay choice (3000ms default vs GlassDock's 2000ms) is flagged in the proof as an open question. My read: 3000ms is correct for a discrete control like a slider where the user may pause mid-gesture; 2000ms is correct for a dock where the gesture-active window is bounded by the dock's own collapse timer.

## 2. Story-tier per-story gestalt verdict

### 2.1 `demo/stories/compositions/hero.vue` — `<MetaballCanvas>` + `<TypewriterText>` wire (W0 A2 + A4)

Canonical primitives consumed:
- `MetaballCanvas` + `isWebGLSupported` from `src/components/custom/metaballs` — same import path as `demo/stories/motion/metaballs.vue`.
- `TypewriterText` from `src/components/custom/typewriter` — same import path as `demo/stories/motion/typewriter.vue`.

Verdict: **MINOR — one acknowledged idiom gap**.

- Both primitives consumed via the canonical package path, no raw recipe re-roll.
- `MetaballConfig` typed import — uses the public type surface.
- `prefersReducedMotion` gate composed inline as a synchronous SSR-safe `matchMedia` probe. This idiom is the third instance in `demo/` per the proof, and the proof correctly flags it as a candidate for a demo-private `useReducedMotion` composable (parallel to `useStoryDemo`).
- `isWebGLSupported()` is the canonical M.W2 Lane A escape hatch — proper consumer pattern (sync gate, not the now-removed reactive `isSupported` ref).
- The two-segment TypewriterText + static italic-f composition is a thoughtful gestalt choice over the rejected alternatives (single TypewriterText with words-prop, etc.) — preserves the signature glyph as a deliberate anchor rather than a typed character.
- **Idiom gap (acknowledged in proof, OQ#1)**: the `.hero-frame :deep(canvas) { position: absolute }` override exists only because `MetaballCanvas` ships with hardcoded `position: fixed; inset: 0` baked into its template. This is NOT a canonical pattern — every consumer-scoped (non-viewport-pinned) MetaballCanvas use will need this `:deep()` override. The proof correctly flags this as a follow-up: lift `position` to a `MetaballCanvas` prop so consumers don't reach into private template detail.
- **Style-discipline note**: The proof says "static hex is correct here" for the metaball colors because the WebGL composable resolves colors at init via canvas getImageData and CSS vars would resolve once and miss theme transitions. This is consistent with the rationale in `demo/stories/motion/metaballs.vue`. Acceptable for this story; the theme-toggle gap is flagged in the proof's OQ#3.

### 2.2 `demo/stories/primitives/configurator-mobile.vue` — `<Configurator density="mobile">` proof-of-concept (W2 Lane A)

Verdict: **CLEAN**.

- Composes `<Configurator density="mobile">` + `<ConfiguratorLayer>` + `<ConfiguratorRow>` via the canonical primitives. NO raw CSS hacks; NO direct token writes; NO bypass of the new density axis.
- Side-by-side `lg:grid-cols-2` layout of `density="mobile"` vs `density="comfortable"` is the canonical A/B-comparison shape for axis-tour stories. Renders the same content at both rungs — exactly what an axis-tour story should do.
- Wraps each Configurator in a `<ShowcaseFrame pad="md" tier="quiet">` — uses the V.W4 demo-storybook chassis primitive, no raw recipe re-roll. Matches the V.W4 migration discipline.
- `<StorySection label="…" blurb="…">` for the section label — canonical V.W4 chassis.
- `<StoryPage>` root — canonical demo page wrapper.
- All LabeledField wrappers (`LabeledSelect` / `LabeledSlider` / `LabeledSwitch`) consumed from the public package surface.
- `scroll-mode="never"` set on both Configurators — correct: the proof story doesn't need overflow scrolling because the content fits naturally.

### 2.3 `demo/stories/primitives/section.vue` — `<Section backdrop="paper">` story extension (W0 Lane A3)

Verdict: **CLEAN**.

- The new `<StorySection label='backdrop="paper" · scoped paper-grain substrate' blurb="…">` block at the bottom of the existing story extends the canonical Section axis-tour without re-rolling the chassis.
- The wrapping `<div class="rounded-card border border-border overflow-hidden">` is a rounded-card host container — same shape as the existing tone/gap matrix sections in the same file. Matches the surrounding story's recipe vocabulary.
- `<Section backdrop="paper" title="…" description="…" class="p-6">` composes the canonical primitive with the new prop; no raw `<PaperBackdrop>` reach-around.
- The blurb explicitly notes the default `backdrop="none"` (purely additive behavior), which honestly documents the wire's posture.
- Placement at the END of the story file is consistent with the rest of the axis-tour ordering (default → tone matrix → gap matrix → header-slot → backdrop) — natural narrative arc.

## 3. Findings

### F-δ-1 — `<Section backdrop>` lacks `:data-backdrop` attribute (MINOR; not a blocker)

Card emits `:data-tier`, GlassDock emits `:data-density`, ConfiguratorRow emits `:data-density`. Section emits NO `:data-backdrop` attribute despite carrying an analogous discriminant prop.

Disposition: **acceptable at N close**. The attribute is not load-bearing today (no CSS rule keys off it; the prop's effect is structural — a `v-if` branch + class toggle). If a future tranche adds a `backdrop="glass"` or `backdrop="metaballs"` rung that needs a CSS-rule pivot, the attribute SHOULD be added at that point. Flag for future-shape awareness only.

### F-δ-2 — `<MetaballCanvas>` `position: fixed` consumer-scope gap (MINOR; acknowledged in proof)

The hero composition needs a `:deep(canvas) { position: absolute }` override because `MetaballCanvas` ships its canvas with hardcoded `position: fixed; inset: 0` baked into the template (canonical hero-use-site of `demo/stories/motion/metaballs.vue` is viewport-pinned).

This forces every consumer-scoped MetaballCanvas use to break encapsulation via `:deep()`. Already flagged in the W0 A2/A4 proof's OQ#1.

Disposition: **acceptable at N.W0 close**; track for an O-or-later follow-up that lifts `position` to a `MetaballCanvas` prop (e.g., `position?: "fixed" | "absolute"` defaulting to `"fixed"`). Once lifted, the hero composition's scoped `:deep()` block becomes a one-line prop set.

### F-δ-3 — `<Section>` backdrop type not exported (MINOR; mixed precedent)

Section's `backdrop?: "none" | "paper"` is an inline string union; no `SectionBackdrop` type is exported from `@mkbabb/glass-ui/section`. Card exports `CardTier`; GlassDock does NOT export `DockDensity`. Mixed precedent — Section follows the GlassDock pattern.

Disposition: **acceptable at N close**. For a 2-element discriminant, inline is the lighter idiom. If the union grows to ≥ 3 rungs (e.g., `"glass"`, `"metaballs"`), lift it and export per Card's `CardTier` precedent.

### F-δ-4 — `useTouchGate` deactivate-delay divergence between consumers (INFO; not a finding)

GlassDock instantiates with `useTouchGate(props.collapseDelay)` (2000ms default), Slider with `useTouchGate()` (3000ms default). Proof flags this as OQ#1.

Disposition: **NOT a finding**. The divergence is consumer-role driven (dock has its own collapse timer the gate stays loosely coupled to; slider has no own timer). 3000ms is appropriate for the discrete-control window. Recommend ratifying the slider's default in the W close.

## 4. Verdict

**CLEAN** with three MINOR notes (F-δ-1, F-δ-2, F-δ-3), all defensible at N close and tracked for future-shape awareness.

The substrate additions feel cohesive with the existing glass-ui register:

- Section.backdrop follows the additive-by-default contract and composes the PaperBackdrop primitive rather than re-rolling its substrate. Mild divergence from Card.tier (no `data-backdrop` attr, no exported type) but matches the lighter GlassDock-density precedent.
- Configurator.density mirrors GlassDock.density's axis shape (4 rungs, `"comfortable"` default, `data-density` attribute) while adding the provide/inject cascade that GlassDock didn't need. The `density.ts` shim is the canonical Vue 3.5 InjectionKey co-location pattern.
- ConfiguratorRow consumes density via inject-then-prop-override — canonical CSS-cascade-of-DI idiom. Scoped CSS keying off `[data-density="…"]` mirrors `glass-dock[data-density="…"]` in `dock.css`.
- Slider's useTouchGate wire mirrors GlassDock's consumer pattern beat-for-beat, with consumer-role divergences in the `watch(isActive)` side effect (bridges into the existing dock keep-open token path rather than calling `collapse()`).
- All three N demo stories (hero.vue, configurator-mobile.vue, section.vue) compose the canonical primitives via the public package surface — NO raw recipe re-rolls, NO bypass of the new axes.

No blockers. Proceed to next gate.
