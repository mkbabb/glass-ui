# Dock-from-first-principles + slider-unification synthesis (20-agent)

ROOT CAUSE: the W8b.1 @supports(interpolate-size) native arm (dock.css:400-409, width: calc-size(auto,size) on Chrome 129+) fights the FLIP SpringProgress driver (both drive width) -> the dock freezes. The syntactic gates missed it.

I have everything. The note that `LabeledSlider` has no `variant` passthrough confirms it hardcodes `standard` — and the `data-held` rule at line 285 IS unscoped (applies to all variants including standard), correcting one audit finding. I now have the complete, source-grounded picture to synthesize.

---

# DOCK + SLIDER CONVERGENCE — SYNTHESIS

## PART 1 — THE DOCK ROOT CAUSE, THE LAYERING MODEL, THE WORKING BASELINE

### 1.1 The actual root cause (confirmed in source, not speculated)

The 15 lanes circle the truth but most misname it. The real defect is a **dual-driver race introduced by AU.W8b.1**, and it is provable from two files:

**The native CSS arm fights the JS FLIP driver over the same property.** `dock.css:400-409`:

```css
@supports (interpolate-size: allow-keywords) {
    .dock-layers { interpolate-size: allow-keywords; }
    .glass-dock.expanded > .dock-layers,
    .dock-layer-group .dock-layer-item-host.is-active {
        width: calc-size(auto, size);
    }
}
```

On Chrome 129+ this does two things: (a) `interpolate-size: allow-keywords` is **inherited** and opts the whole subtree into `auto ↔ length` width interpolation, and (b) `width: calc-size(auto, size)` declares the active layer's resolved width as `auto`. The base rule `dock.css:385` already declares `transition: width var(--dock-motion-resize)`. So the moment GlassDock toggles `.expanded` (`GlassDock.vue:368`), **the browser natively animates `.dock-layers` width** from the old computed value to the new intrinsic width, on its own clock.

Simultaneously, the FLIP fallback in `useLayerTransition.ts:203-257` runs on **every** engine (its only fork is `NATIVE_VT` for `startViewTransition` and a PRM check — neither of which detects `interpolate-size`). It does this:

- `:212` `el.style.transition = "none"` — kills the CSS transition
- `:213` `clearDim(el)` — removes the inline width so it can measure `auto`
- `:217` re-pins to `fromSize`
- `:244-257` per-frame `setDim(el, '${w}px')` from a `SpringProgress` clock

Here is the kill: setting `width: calc-size(auto, size)` in CSS plus an inline `width: <Npx>` from the spring means **two independent declarations target `width` every frame**. The inline style wins the cascade, but `interpolate-size` has already armed native interpolation, and the `transition: none` written inline at `:212` is itself a property the native arm interacts with unpredictably. The net visible result the user reports — a **frozen/jerky dock** — is the two drivers stepping on each other: the spring writes a pixel value, the native `calc-size` machinery re-resolves `auto`, the transition is alternately suppressed and re-armed. Neither completes.

**Why the gates are green while it's broken.** `proof:dock-motion-single-source` (`proof-dock-motion-single-source.mjs`) regex-scans `useLayerTransition.ts` to confirm `leavingLayer.value`/`currentLayer.value`/`setDim` all sit inside one `requestAnimationFrame` body. `proof:dock-opacity-lockstep` confirms both `.dock-layer` opacity and the container width name `--dock-motion-resize`. Both assertions are **true of the source** and **irrelevant to runtime** — neither parses CSS `@supports`, neither mounts a browser, neither observes a single painted frame. They prove *intent*, not *motion*. This is the gate-gap every dock lane independently rediscovered.

A secondary, same-class defect: the `@supports (transition-behavior: allow-discrete)` arm (`dock.css:510-547`) is a **third** independent opacity/visibility driver that overlaps the hand-rolled `visibility 0s linear` fallback (`:461`) and the spring's settle. Three opacity authorities, no single owner.

### 1.2 The first-principles layering model (the gestalt, not a patch)

The dock has accreted **three motion strategies × two stacks × two opacity authorities** with no single owner. Don't add a fourth detection branch. Collapse the whole thing to **one authority per concern**, chosen at construction, never overlapping:

**Principle 1 — One size-morph driver per swap, never two.** A swap runs *either* the native browser morph *or* the JS FLIP — never both touching `width`. The fork must be a true XOR: when the native arm is live, the JS driver must not write inline `width` at all.

**Principle 2 — The native arm is the primary path on engines that support it.** `interpolate-size` + `calc-size` + View-Transitions are the SOTA path: the browser owns size + crossfade with zero `getBoundingClientRect`, zero rAF, zero spring. When `CSS.supports('interpolate-size: allow-keywords')` is true, glass-ui writes the `.expanded` class and the destination `width: calc-size(auto, size)` and **gets out of the way**. The spring driver is never constructed.

**Principle 3 — The FLIP+spring is the fallback for engines without native size interpolation (Firefox, Safari), and on those engines the `@supports` arm is dormant by definition** — so there is no conflict to detect. The fallback owns `width` inline; CSS owns `opacity` on the sibling pane. No `calc-size` exists to fight it.

**Principle 4 — One opacity authority.** Pick per path: native discrete-visibility (`@supports allow-discrete`) when the native size arm is live; the hand-rolled `visibility 0s linear` fallback otherwise. They are mutually exclusive `@supports` arms keyed off the *same* capability tier as the size driver, so opacity and size always agree on which world they're in.

**Principle 5 — One layer-transition primitive, two scopes, never duplicated logic.** `useLayerTransition` is already shared by the outer GlassDock pair and the inner DockLayerGroup pair — keep that. The fix is that the *driver selection* lives in one place, so both scopes inherit the XOR.

The decisive simplification (and the recommended fold): **gate the JS FLIP driver behind `CSS.supports('interpolate-size: allow-keywords') === false`.** One line of feature detection at the top of the FLIP branch turns the dual-driver race into a clean XOR. On Chrome 129+, the native arm runs alone (it already works — that's what the CSS was *for*); on Firefox/Safari, the spring runs alone with no `calc-size` present. The `interpolate-size` arm stops being a "fold-in addition" and becomes the *primary driver*, with FLIP demoted to the genuine fallback it was always documented to be.

### 1.3 The working-baseline reference

The provenance is in git: the dock animated correctly at **`e8380d7`** (the genesis commit) and stayed correct through **`9e3c92c`** ("axis-aware useDockTransition and useLayerTransition"). That baseline (`useDockTransition.ts`, since superseded) used **one driver only** — a single fade→swap→`width` CSS-transition sequence on `transitionSize.value`, no spring, no `calc-size`, no native arm. It animated because nothing competed for `width`.

The regression entered at **`6dd0d14`** (AU.W8 — SpringProgress LIGHT driver) and was *armed* at **`2a4a50f`** (AU.W8b — the `interpolate-size`/`calc-size` native arm). W8 added the spring; W8b added the native CSS morph; **neither made them mutually exclusive**. `d58de1d` hardened the PRM fast-path but never re-validated the native-arm × spring interaction. So the working reference is conceptual, not a commit to revert to: **`e8380d7`'s "one driver owns the morph" invariant**, re-expressed on the modern (VT + interpolate-size primary, FLIP fallback) architecture. We keep the SOTA native path AU.W8b built — we just make it the *sole* driver on its engines, which is the one thing W8b forgot to do.

---

## PART 2 — DOCK-REBUILD WAVE SPEC

**Scope:** Re-architect dock layer motion to a strict one-driver-per-swap XOR. Keep the native View-Transitions + `interpolate-size` path as primary; demote FLIP+spring to a feature-detected fallback that never coexists with the native arm. Add the perceptual gate the syntactic gates could not be.

**Out of scope:** retiring `SpringProgress` (it's the load-bearing fallback driver for FF/Safari); the dock-vocabulary README; touch-gate.

### Units

**AV.DOCK.W0 — the driver XOR (the headline fix).**
- In `useLayerTransition.ts`, add one construction-time capability flag: `const NATIVE_SIZE = typeof CSS !== "undefined" && CSS.supports("interpolate-size: allow-keywords")`.
- The swap forks three ways, strictly exclusive: (1) `NATIVE_VT` → `startViewTransition` (browser owns morph + crossfade); (2) `NATIVE_SIZE && !NATIVE_VT` → write the class swap only, let the CSS `calc-size` + `transition: width` morph natively, **construct no spring, write no inline width**; (3) else → the FLIP+spring fallback verbatim.
- The PRM fast-path stays ahead of all three.
- Net: the spring is constructed only when *neither* native path can run. On Chrome 129+ the native arm runs alone; the race is gone.

**AV.DOCK.W1 — one opacity authority.**
- Verify the `@supports (transition-behavior: allow-discrete)` arm (`dock.css:510-547`) and the hand-rolled `visibility 0s linear` fallback (`:457-493`) are genuinely mutually exclusive at runtime (they are `@supports`-gated, but the active-layer `transition` *shorthand* at `:480` resets `transition-behavior` — confirm the re-assert at `:537` actually wins by source order on every target). No new CSS unless the audit finds the shorthand still shadows the native arm.

**AV.DOCK.W2 — nested-stack coordination.**
- Confirm the outer (GlassDock) and inner (DockLayerGroup) `useLayerTransition` instances both inherit the W0 XOR, so a compound gesture (expand → switch layer) never has one stack on native and the other on spring. Single capability flag, read once per instance, same value across instances on a given engine — verify, don't rebuild.

**AV.DOCK.W3 — wrap-mode height.**
- `overflow="wrap"` forces multi-row; the FLIP fallback animates only `dim` (width XOR height). For wrap docks the destination is intrinsic on *both* axes. On the native path this is free (`calc-size` morphs the real box). On the fallback path, document the limitation or extend the measure to capture both axes — but only on the fallback engines, and only for wrap mode.

**AV.DOCK.W4 — dock-with-slider revalidation.**
- The `keepOpen`/`release` token chain (`useDockState` ↔ `Slider.vue`) is correct in source. Re-run it against the W0 fix: with the native arm no longer frozen, confirm the slider drag holds the dock open AND `data-held` toggles lockstep on both dock and slider (the `data-held` rule at `Slider.vue:285` is *unscoped*, so standard variant already responds — verify live).

### AV.DOCK.W5 — THE PERCEPTUAL GATE (`proof:dock-motion-live`)

This is what the static gates couldn't be. A Playwright fixture (the Playwright MCP/`@playwright` is available in this environment) that mounts the real dock page and **measures painted frames**:

1. Navigate to `/navigation/dock`. Locate the collapsed `.dock-layers`; record `boundingBox().width = W0` and the child `.dock-layer--full` `opacity = O0` via `getComputedStyle`.
2. Trigger expand (hover/click).
3. Poll on `requestAnimationFrame` (inside `browser_evaluate`): sample `.dock-layers` width and active-layer opacity every frame into two timelines until both settle (Δ < 0.5px width, < 0.01 opacity over 3 consecutive frames).
4. **Assert behavior, not structure:**
   - width morphs `W0 → W1` **monotonically over ≥3 frames** (catches "frozen": a single-frame snap or zero-delta timeline FAILS — this is exactly the current live bug);
   - opacity morphs `O0 → O1` monotonically;
   - the two **settle within ±1 frame** (±16.7ms) of each other (the real lockstep proof);
   - total morph duration ≈ `--duration-normal` ± tolerance (catches spring/CSS curve drift).
5. Repeat for collapse, for the DockLayerGroup inner pair, and for the dock-with-slider drag-hold.
6. Emit a timeline JSON artifact (`width-keyframe-times`, `opacity-keyframe-times`, `frame-difference`, `settle-delta-ms`). **Born RED** on current HEAD (the frozen dock fails the monotonic-≥3-frames assert); GREEN only after W0 lands.

The static `proof:dock-motion-single-source` / `proof:dock-opacity-lockstep` are **demoted to "structure" tier** — kept as cheap pre-checks, no longer the source of truth for motion correctness.

---

## PART 3 — SLIDER-UNIFICATION WAVE SPEC

**Scope:** Collapse the 6-variant slider sprawl to **two canonical surfaces** — `standard` (the iOS continuous rounded knob) and `spectrum` (thin tall-track scrub bar). Remove the four overfit variants, port their consumers, lock the cardinality with a gate.

**The two survivors (first-principles, KISS):**

- **`standard`** — the iOS knob. A fully-rounded circular thumb (`border-radius: 50%`, `width == height` from one size token) sitting *continuous inside* a pill-rounded track as one visual unit. Four-state contract: idle (muted, no shadow), hover (light halo via `box-shadow`), focus-visible (ring), held (denser halo via the already-unscoped `[data-held]` rule at `Slider.vue:285`). Covers forms, dock integration, config scrubbing — every general slider. This is the new default and the canonical dock-with-slider surface.
- **`spectrum`** — the thin-bar scrubber. Tall muted track + thin vertical bar thumb, grab-on-hover affordance. Covers timeline/audio/video scrubbing. **Absorbs `glass-scrubber` and `timeline`** (both are tall-track + thin/disc-thumb scrub designs differing only in tint) via the existing `--slider-scrub-*` / `--slider-track-bg` CSS-var override block — consumers retint, they don't fork a variant.

### Variant removal ledger

| Variant | Real consumers (src + demo, grep-confirmed) | Disposition |
|---|---|---|
| `standard` | LabeledSlider (hardcoded), dock-with-slider, forms | **KEEP** — becomes the rounded-knob canon |
| `spectrum` | 1 demo | **KEEP** — becomes the scrub canon |
| `timeline` | IconTooltip (1 real), 1 demo | **REMOVE** → port to `spectrum` + tint vars |
| `glass-scrubber` | 4 (glass-scrubber story, manifest) | **REMOVE** → fold into `spectrum` via `--slider-scrub-*` |
| `glass-pill` | 2 demo only | **REMOVE** → `standard` + halo already in base |
| `glass-cartoon` | 1 demo only (+ self-refs) | **REMOVE** — zero production consumers, delete without deprecation |

### Consumer port ledger

- **`LabeledSlider.vue`** — currently no `variant` passthrough (hardcodes `standard`). Stays `standard`; no change needed → reaches all 4 aurora config layers (TextureLayer/NucleiLayer/FlowLayer/CompositionLayer) and the configurator for free.
- **`IconTooltip.vue`** — the one real `timeline` consumer (it's in a doc comment, verify the live binding) → repoint to `spectrum`.
- **`demo/stories/primitives/slider.vue`** — the variant matrix shrinks from 6 columns to 2 (standard × {sm,md,lg}, spectrum × {sm,md,lg}); drop the `timeline`/`glass-pill`/`glass-cartoon` cells.
- **`demo/stories/sliders/glass-scrubber.vue`** — repoint to `spectrum`; keep the `--slider-scrub-*` tint demonstration as a "spectrum, retinted" example.
- **`demo/stories/manifest.ts`** — update the slider/scrubber story routes.
- No `src/` runtime consumer outside `LabeledSlider` and `IconTooltip` → the fold is low-blast-radius.

### Cleanup

Delete the four removed variants' scoped `[data-variant=...]` CSS blocks from `Slider.vue` (lines ~233-249 timeline, ~251-295 glass-pill, ~297-320 glass-cartoon, ~322-382 glass-scrubber — fold the scrub recipe's geometry into `spectrum`). Trim the `sliderVariants` CVA (`index.ts:34-41`) to two keys. Keep the size axis (`sm`/`md`/`lg`) untouched. Keep the unscoped `[data-held]` halo (it's the dock-integration contract).

### THE GATE — `proof:slider-two-only`

House-style ESM `.mjs` (comment-strip, pure export, JSON artifact):
1. Parse `sliderVariants` in `index.ts`; **assert the variant keyset is exactly `['standard', 'spectrum']`** — fails on any 3rd member (kills speculative re-add, the substrate-with-consumer precept).
2. Scan `Slider.vue` scoped CSS: **no orphan `[data-variant="..."]` selector** for a variant absent from the keyset.
3. Assert the `standard` knob recipe is present: circular thumb (`border-radius` resolving to pill/50% on a `width == height` thumb) — the rounded-iOS-knob contract codified, not just named.

---

## THE TWO WAVE HEADLINES

**WAVE AV.DOCK — One driver owns the morph: the `interpolate-size` native arm becomes the sole Chrome-129+ size driver (FLIP+spring demoted to a feature-detected Firefox/Safari fallback), ending the dual-driver freeze — proven by `proof:dock-motion-live`, the born-RED Playwright frame-parity gate that measures painted width+opacity settling in ±1 frame where the syntactic gates only read source.**

**WAVE AV.SLIDER — Six slider variants collapse to two: `standard` (the iOS continuous rounded knob) + `spectrum` (the thin-bar scrubber that absorbs timeline/glass-scrubber via `--slider-scrub-*` tint vars); glass-pill/glass-cartoon/timeline deleted, consumers ported, cardinality frozen by `proof:slider-two-only`.**
