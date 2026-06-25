# Pass-E component deep-audit — `motion/reveal`

**Page:** `demo/stories/motion/reveal.vue` · label `@mkbabb/glass-ui/motion-core`
**Underlying src:** `src/composables/motion/vReveal.ts` (28 L) + `src/composables/motion/useLiquidReveal.ts` (259 L), composing `springPresets.ts` + kf `ElementMorph`/`springTimingFunction` + `src/styles/glass/reveal.css` (`.glass-reveal`).
No procedural-viz on this page (it is the motion-vocabulary band, not the substrate band — PROCEDURAL-SUITE N/A here).

---

## Findings

### A · ANIMATION affordance — STRONG, with one substrate-split gap

- **`useLiquidReveal` is the model bloom-from-source primitive.** Three coupled channels on ONE spring sample — `transform: translate()+scale()` (SPATIAL, spring overshoot interior) + `opacity 0→1` (EFFECTS, no-overshoot) + `filter: blur(4px)→0` (the iOS light-bending decongest) — exactly the W-MOTION-CANON P1/P3 SPATIAL/EFFECTS split and P5 compositor-only. FLIP inversion (`ElementMorph(settled→trigger)` driven 1→0, `transform-origin` at the trigger) is the correct architecture: it activates the dormant kf `ElementMorph` + `springTimingFunction` (the J-inv-10 substrate-without-consumer state the module header calls out) rather than re-forking an rAF spring. No second engine. **No finding — this is canon-grade.**
- **`vReveal` is a pure DOM-hook writer** (`data-reveal` + `--d`), keyframes-free + vueuse-free, root-barrel safe — correct by the icon-chip/vReveal precedent. The entrance CSS is consumer-owned by design (the demo's `<style scoped>` `reveal-rise`/`reveal-fade` is that documented pattern, NOT a fork). **No finding.**
- **GAP (MINOR, the four-state-contract lens):** `vReveal` is *entrance-only* — it never writes an exit/conceal hook, and its sibling imperative reader `useStaggerReveal` already owns the `view()`-timeline-native vs IO-fallback single-writer path. The directive and the composable are two readers of the SAME stagger-reveal concern with no shared core. This is not a defect on this page, but it is the dual-reader shape the BD canon-sweep should record.

### B · the GLASS six-layer composite — PRESENT via tier, with the decongest caveat handled

- The bloomed surface is `glass-floating glass-reveal` — it carries the full six-layer composite from the `glass-floating` tier (backdrop blur+saturate · surface tint · edge rim · inner catch-light · drop shadow · grain). **Correct.**
- The decongest deliberately rides `filter: blur` (the surface's OWN pixels) NOT `backdrop-filter`, so the resting `glass-floating` plate blur is never clobbered (DESIGN.md glass-cannot-sample-glass-adjacent concern, handled). The CSS recipe (`reveal.css`) documents the same fence. **No finding — this is the right call.**

### C · PERFORMANCE — compositor-only, but missing a `will-change` hint + no IO-gate

- Compositor-only confirmed: the leaf writes ONLY `transform`/`opacity`/`filter`, NEVER a layout property (the A'-3 lesson; `proof:no-layout-animation` floor holds). `clearTransform` nulls the inline transform at settle so no stale transform pins. **Good.**
- **MINOR:** no `will-change: transform, filter, opacity` is set on the morph frames. On Safari a per-frame `filter: blur()` animation without a compositor-layer hint can fall to the CPU raster path (the blur is the single most expensive channel here). A scoped `will-change` set at `reveal()` and cleared at settle would lift the blur to the GPU layer.
- `useLiquidReveal` is a one-shot open (not a steady loop) so offscreen-pause is N/A. **No finding there.**

### D · SAFARI compatibility — one real risk on the `filter: blur` channel

- `ElementMorph` writes `transform` (broadly safe). `opacity`/`filter` are safe. **The risk is the `filter: blur()` per-frame interp under Safari without the layer hint (see C).** Also: the demo's `.glass-reveal` CSS uses `transition-behavior: allow-discrete` + `@starting-style`-adjacent `display`/`overlay` transitions — but the JS leaf bypasses that recipe entirely (it drives the rAF morph), so the discrete-transition Safari support matrix does not bite the JS path. The CSS recipe path (reka portaled overlays) is the one to spot-check on Safari 17.x, but that is `reveal.css`'s surface, not this page's JS demo.
- `springTimingFunction` returns a sampled `{fn,css}` — the JS leaf uses `.fn` (a pure callable), engine-agnostic. **Safe.**

### E · IDIOMATIC / no-legacy — ONE real defect: the import-path label is WRONG

- **MAJOR (the standardize-import-path ask, verified on disk):** the page declares its label `@mkbabb/glass-ui/motion-core`, but `useLiquidReveal` is kf `ElementMorph`-BEARING and is exported on `/motion` ONLY — it is NOT on the `motion-core` barrel (`src/motion-core.ts` → `./composables/motion/core`, and `core/index.ts` exports `vReveal` + `useStaggerReveal` + `useLiquidFlex` but NOT `useLiquidReveal`). The page demos TWO primitives from TWO different subpaths: `vReveal` (`/motion-core`, keyframes-free) AND `useLiquidReveal` (`/motion`, keyframes-bearing). A single `/motion-core` label is a half-truth that would mislead a consumer into a non-resolving import. The label must be split/corrected to name BOTH surfaces (or the page split so each section names its real subpath).
- **MINOR (superfluous language):** the page's two `<StorySection>` blurbs + the `<style>` comment carry the verbose tranche-archaeology voice ("the W-LIQUID-REVEAL FLAGSHIP", "NO demo-local re-implementation", "NOT a fork of a sibling-wave pop-entrance"). Tighten to the user-facing what-it-does.
- **MINOR (the bigger-card / glassy-subsection ask):** the two sections render as bare `<StorySection>` flex columns — they are NOT each wrapped in their own glassy card, and the page hosts no aurora backdrop (the `useLiquidReveal` bloom demos over the flat page, not over a colorful aurora — the glass plate has nothing rich behind it to bloom over). This is the user's "each sub-section in its own glassy card · demos over colorful aurora · main card bigger" ask, unmet on this page.
- No dead code, no dual-path in the src primitives themselves (the `vReveal`/`useStaggerReveal` two-reader shape in F is a canon-record item, not a live dual-path).

---

## Disposition map (cite BD waves)

| # | Finding | Action | BD wave |
|---|---------|--------|---------|
| E-1 | Import label `/motion-core` is wrong for `useLiquidReveal` (it's `/motion`-only) | **MODIFY** the page label to name BOTH subpaths (the standardize-import-path ask) | `BD.W-HOMEMAP-RESYNC` (import-label/home-map sync) — extend its label-accuracy clause to this page; OR fold into `BD.W-PAGE-HEADER-FOLD`'s page-modernization sweep |
| E-2 | Each sub-section in its own glassy card · main card bigger · bloom over colorful aurora | **AUGMENT** the demo page (zero src paint) — wrap each `<StorySection>` in a glass card, enlarge the bloom stage, stage it over an offscreen-paused `<Aurora>` (the `<DockStage>` one-GL-per-route precedent) | `BD.W-BC-COMPONENT-CANON` sibling page-modernization, or a new Band-4 demo-page wave (the `BD.W-PAGE-HEADER-FOLD` Band-4 family) |
| E-3 | Superfluous tranche-voice in blurbs/comments | **MODIFY** — tighten to user-facing copy | `BD.W-PAGE-OFFTOKEN-SWEEP` / `BD.W-PAGE-HEADER-FOLD` (demo-page first-half modernization) |
| C/D | No `will-change` on the `filter: blur` morph frames (Safari GPU-layer hint) | **MODIFY** `useLiquidReveal` — set scoped `will-change: transform, filter, opacity` at `reveal()`, clear at settle | NEW micro-wave under Band 5 (motion/perf), beside `BD.W-BLOB-MOTION-TUNE`; no existing wave owns it |
| F | `vReveal` (directive) + `useStaggerReveal` (composable) are two readers of stagger-reveal with no shared core; `vReveal` has no exit hook | **AUGMENT (record + optionally unify)** — canon-note the two-reader split; a shared `reveal-hook` core is a candidate fold | `BD.W-BC-COMPONENT-CANON` (add the missing per-register canon for the reveal family) |
| A/B | Bloom architecture + six-layer composite + decongest fence | **KEEP** — canon-grade, no change | — |

**Net:** the src primitives are sound (no PRUNE, no legacy). The actionable defects are demo-page-level (E-1 import label = the headline MAJOR; E-2/E-3 the glassy-card/aurora/tighten asks) plus one src MINOR (the Safari `will-change` blur hint).
