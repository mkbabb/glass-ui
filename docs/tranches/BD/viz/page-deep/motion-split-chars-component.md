# Pass-E COMPONENT deep audit — motion/split-chars

**Page:** `motion/split-chars` · label `@mkbabb/glass-ui/motion-core`
**Real src under audit (NOT the demo):**
- `src/components/custom/split-chars/SplitChars.vue` (101 L) — the component face
- `src/composables/motion/useCharStagger.ts` (174 L) — the producer (the split + the customs + the a11y label)
- `src/styles/typography/utilities.css:155-159` — the `.char-stagger > .char` motion recipe (the ANIMATION lives HERE)
- `@keyframes fade-in` (`src/styles/animations.css:53-62`) — the per-glyph entrance keyframe
- the PRM carve (`src/styles/utilities/a11y-overrides.css:6-31`)

Provenance: BC.W-SPLIT-CHARS (the FOURIER-INBOUND #6 fold). Engine-FREE vue-only leaf on `/motion-core` + root barrel (the `vReveal` precedent). No procedural-viz, no GL, no GPU substrate — this is a structural DOM-split + a CSS-keyframe entrance.

---

## 1 · ANIMATION — high affordance? four-state? spring? entrance/exit?

**What ships:** a SINGLE entrance. `.char-stagger > .char { animation: fade-in var(--spring-smooth-duration) var(--spring-smooth) backwards; animation-delay: calc(var(--char-index) * 30ms) }`. Each glyph fades+rises 6px on the per-spring `--spring-smooth` clock, staggered 30ms/index. The split itself is structural DOM (no animation engine, no rAF).

Findings:

- **F1 (MODIFY) — the entrance plays ONCE on mount and is then DEAD.** A CSS `animation` with no replay seam fires at mount and never again; the demo only re-plays by force-remounting the whole subtree (`:key="playKey"`). There is NO component-level `replay()` / no `play` prop / no IntersectionObserver view-trigger. The Pass-E directive ("HIGH animation affordance for EVERY component") is unmet: the kinetic word should (a) expose an imperative `replay()` via `defineExpose` (re-running `split()` already re-mounts the spans → re-fires `backwards`, the cheap correct path the demo's remount hack proves), and (b) optionally arm on scroll-into-view (the `view()`/IntersectionObserver entrance the scroll-choreography register already owns) so a below-the-fold hero animates when reached, not silently-already-done. This is the single biggest component gap.

- **F2 (MODIFY) — the entrance violates motion-canon P3/P1 nuance.** `fade-in` couples opacity (EFFECTS) WITH `translateY` (SPATIAL) onto ONE `--spring-smooth` curve. P3 (fade-coupled-to-transform) is honored in spirit (both legs move together), BUT P1 says the EFFECTS opacity leg should ride a shorter `--ease` while the SPATIAL transform rides the spring clock — here both ride the spring `linear()` on the spring duration, so the fade carries the spring's micro-overshoot tail (a fade should not overshoot past 1). The iOS-27 bar (W-LIQUID-ENTRANCE-GENERAL) is a **squish**, not a flat 6px rise: a per-glyph `scale` from a volume-preserving squished start (≈0.88) + the fade, the "light-bending materialization" — the current `translateY(6px)` is the pre-liquid register. There is also NO `filter: blur()` decongestion leg (the `.glass-reveal` bloom signature). The glyph entrance is the textbook W-LIQUID-ENTRANCE-GENERAL consumer.

- **F3 (AUGMENT) — no exit, no hover, no four-state.** The component is intrinsically an entrance-only display primitive (a kinetic word is not an interactive control — the four-state contract does not strictly bind). BUT the affordance ceiling is higher: a `direction` axis (forward / reverse / center-out — the `--char-total` is ALREADY written for exactly this and is currently UNUSED by the recipe, a latent dead custom) + an opt-in continuous register (a typewriter-adjacent hover-shimmer, PRM-gated) would lift it to the "alive" bar. `--char-total` being written but never read by any shipped CSS is a **latent-dead-custom** smell (the README advertises "length-proportional / center-out / reverse stagger" that no recipe delivers).

## 2 · PROCEDURAL VIZ
N/A — no aurora/blob/fourier/GL. The PROCEDURAL-SUITE bar does not apply. (The page DEMOS a procedural-adjacent kinetic word; the component is pure DOM+CSS.)

## 3 · PERFORMANCE — compositor-only? offscreen-pause? thrash?

- **Compositor-only: PASS.** `fade-in` animates only `opacity` + `transform: translateY` — both compositor channels, zero layout property (`proof:no-layout-animation` holds). `display: inline-block` on `.char` is a one-time static layout, not animated.
- **F4 (note, low) — no offscreen-pause, but it does not need one.** A CSS keyframe is a one-shot finite animation (not a perpetual rAF loop), so the `useWebGLCanvas` offscreen-park discipline is irrelevant. The one perf concern is the SPLIT cost: `replaceChildren` on a long word forces a synchronous layout, and `split()` runs on EVERY `text`/`by` change via the watcher. For a hero word (≤ ~20 glyphs) this is negligible; a consumer splitting a paragraph would pay N-span layout cost — the README should cap the intended scope (hero/headline, not body copy). No thrash at the demo's scale.
- **F5 (note) — the `flush: "post"` watcher + the immediate split is correct** (the DOM exists before mutate). The function-ref `setRoot` unwrap of the reka `Primitive` `$el` is the idiomatic capture (no `:deep`, no querySelector). Clean.

## 4 · SAFARI compatibility — PASS (one caveat)

- `Intl.Segmenter` grapheme path is guarded (Safari 14.1+) with a `[...text]` code-point fallback — correct, no surrogate tearing. **PASS.**
- `@property`-free, CSS-var `animation-delay` calc — Safari-safe. **PASS.**
- `backwards` fill + the PRM `animation-duration: 0.01ms` snap → terminal = `to` state (opacity 1, translateY 0): the text paints in place under reduce on WebKit. **PASS.**
- **Caveat (ties to F2):** when W-LIQUID-ENTRANCE-GENERAL adds the `filter: blur()` decongestion leg, the Safari `filter`-on-text repaint cost must be measured (WebKit rasterizes filtered text per-frame) — the wave's explicit Safari π gate covers this; flagged so the glyph entrance is enrolled in that capture.

## 5 · IDIOMATIC / no-legacy

- **PASS overall** — engine-free, named-export, single-writer (the composable OWNS the host text; the template seeds `initialText` ONCE and the watcher is the sole re-writer — the documented anti-fight-the-DOM discipline). No dual-path, no workaround, no dead code in the .vue/.ts.
- **F6 (MODIFY) — the import-path label is NON-standard.** The demo (`split-chars.vue:14`) imports from the **deep relative path** `../../../src/components/custom/split-chars` and the page label is `@mkbabb/glass-ui/motion-core`, BUT `<SplitChars>` is a COMPONENT exported from the root barrel + `/motion-core` — the canonical label per the Pass-E path-standardization directive is `@mkbabb/glass-ui` (root) or `@mkbabb/glass-ui/motion-core`. The README header says "root barrel + `/motion-core`". The page should label ONE canonical public import, not the demo's internal relative wire. (Cross-cutting Pass-E finding #1: 28 pages use local labels, this is one.)
- **F7 (note) — `--char-total` advertised-but-unread** (see F3): the README promises stagger MODES the recipe never reads — either deliver them (a `direction` axis reading `--char-total`) or trim the README claim (tighten-superfluous-language, the user's explicit ask).

## 6 · The glass SIX-LAYER composite — ABSENT (and that is the design gap)

SplitChars renders bare `<span>`s with NO glass surface — it is text, not a plated surface, so the six-layer composite (backdrop blur+saturate · tint · rim · catch-light · shadow · grain) does not bind to the component itself. **But the Pass-E design ask is structural:** the kinetic word should live in its OWN glassy card over a colorful aurora field, and the demo currently renders bare spans on a flat StorySection with no live backdrop. The component is correct to stay surface-free (a display primitive); the GLASS suffusion is the DEMO/page layer's job → folds to W-PAGE-BACKGROUND + W-STORY-PAGE-STANDARD (each sub-section its own glassy card over aurora), NOT a SplitChars edit.

---

## Tranche mapping (FOLD / MODIFY / AUGMENT / PRUNE)

| # | Finding | Action | Wave |
|---|---------|--------|------|
| F1 | entrance plays once, no replay/view-trigger seam | **AUGMENT** | **W-LIQUID-ENTRANCE-GENERAL** [NEW] — add the `replay()` `defineExpose` + opt-in IntersectionObserver/`view()` arm to the kinetic-entrance family (SplitChars is consumer-#1) |
| F2 | flat 6px rise, no squish/blur, opacity rides spring not ease | **MODIFY** | **W-LIQUID-ENTRANCE-GENERAL** [NEW] — re-express `fade-in` (or a `char-liquid-in` sibling) as the ≈0.88 volume-preserving squish + coupled fade + `filter` blur-settle; split the EFFECTS opacity onto the shorter `--ease` per P1; Safari π |
| F3/F7 | `--char-total` written but unread; README over-promises modes | **AUGMENT** | **W-LIQUID-ENTRANCE-GENERAL** [NEW] — a `direction: forward\|reverse\|center-out` axis that READS `--char-total` (discharge the latent-dead custom), OR trim the README claim |
| F4/F5 | split cost on long text; scope unbounded in docs | **MODIFY** (doc) | **W-PRECEPTS-README-FRESHEN** — cap the intended scope (hero/headline, not body copy) in the README |
| F6 | non-standard import-path label | **MODIFY** (demo) | **W-STORY-PAGE-STANDARD** [NEW] — standardize the page label to `@mkbabb/glass-ui/motion-core`; demo imports the public barrel, not the relative `../../../src` |
| §6 | bare spans, no glassy card / no aurora field | **FOLD** (demo, zero src) | **W-STORY-PAGE-STANDARD** + **W-PAGE-BACKGROUND** — each sub-demo (hero word / multi-word / grapheme) in its OWN glassy card over a colorful aurora; main card BIGGER |

Net: the COMPONENT is small, clean, idiomatic, Safari-safe, PRM-safe, compositor-only — there is NO prune and NO legacy to transpose. The gap is entirely **animation FIDELITY/affordance** (F1–F3, the entrance is a flat one-shot below the iOS-27 liquid bar) + the **demo glass/path** layer (F6/§6). Both already have a NEW BD wave (W-LIQUID-ENTRANCE-GENERAL · W-STORY-PAGE-STANDARD) drafted in PASS-E.md but NOT yet filed to `waves/` — this audit's concrete asks (replay seam, the squish recipe, the `--char-total` direction axis, the EFFECTS/SPATIAL leg split) should be enrolled into them when authored.
