# AY.W-ASSAY — the 06-10 assay LEDGER

Lane **W-ASSAY**. The user's 06-10 directive: encapsulation + composables/useX
consistency + state management; verify the >500 carve held (cohesion, not
mechanical); colocation (verify W-COLOCATE, fix gaps, KISS); deeply-nested /
brittle SELECTORS (CSS + reactivity); the 4-point STYLING AUDIT; the
design-idiom LOCALIZATION. Every style change perfectly isomorphic.

Executed on `tranche/AY` (post-Batch-4 carved tree). Per finding:
**FIXED here** / **ROUTED to a wave** / **BEFITTING-KEPT** (with why).

---

## A. The >500 carve held (VERIFY — cohesion, not mechanical)

**VERDICT: HELD.** `proof:no-god-module` PASSES — 584 files scanned, hard
limit 500. Spot-read the carved sub-module shapes; the splits are
COHESIVE-per-concern, not mechanical line-chops:

- **aurora/composables/** — `runtime.ts` / `uniformBridge.ts` / `useAurora.ts`
  / `cursorModel.ts` / `frameLoop.ts` / `glSetup.ts` / `atoms.ts` / `color.ts`:
  each is a single render-concern leaf (GL setup vs uniform bridge vs frame loop
  vs cursor model). Cohesive. `constants/{budget,presets,renderMode,shaders/}`
  — per-concern constant homes.
- **constellation/** — `constellationField.ts` (the field model) /
  `constellationDraw.ts` (the painter) / `constellationInteraction.ts` (the
  pointer/warp) + `composables/{createConstellationField,useConstellationPointer}`.
  The draw vs field vs interaction split is the natural concern boundary.
- **goo-blob/composables/** — `useMetaballRenderer` (orchestrator) /
  `uploadBlobUniforms` (the pure per-frame upload leaf) / `buildMetaballProgram`
  (one-time program build) / `useBlobMood` / `useBlobPointer` /
  `useBlobSatellites` (the three behaviour systems) / `easing`. Each a single
  cohesive system. `shaders/` per-stage GLSL.
- **fourier-field/** — `math.ts` / `presets.ts` + the SFC. Cohesive.

**Two over-bound CENTRAL sheets — BEFITTING-KEPT** (ratchet-grandfathered by
W-CSS1, re-judged here):
- `dock-controls.css` (621) — ONE cohesion domain: the five dock CONTROL
  families share a cross-cutting four-state `:where()` comma-group (l.37-40) +
  the `@media (pointer: coarse)` touch floor. A carve would FRAGMENT the shared
  four-state contract — mechanical-not-cohesive. KEEP.
- `theme.css` (530) — ONE `@theme`/`@theme inline` bridge with a
  cascade-order-LOAD-BEARING sequence (leading plain `@theme` radius primitives
  → `@theme inline` var-bridges → trailing plain `@theme` literals, documented
  in the file header + CLAUDE.md). Splitting the `@theme` blocks risks the
  bridge ordering. KEEP.

---

## B. Encapsulation + composables/useX consistency + state management (VERIFY)

**VERDICT: CONSISTENT.** The `use*` prefix is reserved for actual Vue
composables (reactive state + lifecycle hooks); pure leaves/factories carry
plain or `create*` names — the idiomatic Vue split:
- `use*` (57 files) — `useAurora`, `useBlobMood`, `useDockMorphWindow`, …
- `create*` — `createConstellationField`, `createStrictContext` (DI factories).
- plain leaves — `curves`/`springPresets`/`procedural-color.glsl` (pure data),
  `dragController`/`ghostRenderer`/`dropResolver` (the W-GOD1 sortable carve —
  pure controllers), `dockContext`/`dockMorphContext` (DI context modules),
  `compile`/`glSetup`/`frameLoop` (pure WebGL helpers).

No watch-on-watch (0 sites — see §D). State management reads clean.

---

## C. Colocation (VERIFY W-COLOCATE; fix gaps; KISS, no contrivance)

W-COLOCATE landed the feature-dir convention (composables/ + shaders/ + README)
across goo-blob/dock/tabs/constellation and authored `proof:colocation`
(`scripts/proof-colocation.mjs`) — but the gate is NOT registered in
gates.mjs/package.json (the orchestrator-reconcile is pending), and its
**constants-extraction arm is incomplete**. Re-judged each flagged const
through the KISS / no-contrivance lens:

### FIXED here — `goo-blob/constants.ts` (the cross-module shape budget + a DRY defect)

The gate flagged `MAX_SATS`/`TRAIL_N`/`MAX_BLOB_STOPS`/`POS_SCALE`/`UNIFORM_NAMES`.
These are GENUINELY cross-module + a DRY defect:
- `TRAIL_N = 15` was DEFINED TWICE — `uploadBlobUniforms.ts:16` AND
  `useBlobPointer.ts:5` (both with comments saying they "mirror" each other).
- `MAX_SATS`/`TRAIL_N`/`MAX_BLOB_STOPS`/`UNIFORM_NAMES` are imported by
  `buildMetaballProgram.ts` from `uploadBlobUniforms.ts`, AND mirror the GLSL
  `#define`/fixed-array lengths in `metaball.frag.ts` + `metaball-uniforms.glsl.ts`.
  They are the compile-time shape CONTRACT the JS uploader, the program builder,
  the pointer trail, and the shader all read.

**Fix (isomorphic, KISS):** minted `src/components/custom/goo-blob/constants.ts`
with the five shape-budget constants + the derived `UniformName` type;
`uploadBlobUniforms.ts` + `useBlobPointer.ts` import from `../constants` and
RE-EXPORT the same names (the prior `./uploadBlobUniforms`/`./useBlobPointer`
import sites + the package barrel resolve byte-identically). De-dupes the
duplicate `TRAIL_N`. Values unchanged. `dist/goo-blob.js` is byte-for-byte the
same 56.78 kB (pure structural move). `proof:blob-render` 6/6 +
`proof:blob-color-equivalence` 11/11 + typecheck GREEN.

### BEFITTING-KEPT — the single-module tuning consts (the gate over-fits here)

The gate ALSO flags every other module-scope const. These are single-composable
tuning tables coupled to ONE composable's logic — extracting them to a shared
`constants.ts` would HARM cohesion (split a composable's tuning from its body),
the "no contrivance" anti-pattern. KEPT colocated:
- `useBlobMood.ts` — `MOOD_AVA`/`MOOD_TARGETS`/`TRANSITION_MS`/`IDLE_SLEEP_MS`
  (the mood-model config tables — the mood machine IS these tables).
- `useBlobPointer.ts` — `PULSE_OMEGA`/`PULSE_ZETA`/`REST_EPS` (the click-impulse
  spring tuning — coupled to the symplectic-Euler integrator).
- `useBlobSatellites.ts` — `BASE_OPACITY`/`ORBIT_BLEND_MS`/`MERGE_STAGGER_MS`
  (the satellite timing — coupled to the orbit logic).
- `dock/composables/dockContext.ts` etc. — `DOCK_CONTEXT_KEY` /
  `DOCK_LAYER_GROUP_KEY` / `DOCK_MORPH_KEY` are `InjectionKey`s (DI keys, NOT
  magic numbers); they belong WITH their `createStrictContext` factory.
  `DOCK_SPRING` / `RESIZE_MORPH_PROPS` are single-module config.

### ROUTED — `proof:colocation` over-fit + registration

The gate's "every module-scope const → constants.ts" clause is too broad — it
flags DI InjectionKeys and single-module config tables. ROUTED to W-COLOCATE
(orchestrator): (a) narrow the const-extraction clause to CROSS-MODULE /
GLSL-mirrored shape budgets (the goo-blob case it now passes), exempting
InjectionKeys + single-consumer config tables; (b) register `proof:colocation`
in gates.mjs + package.json once narrowed. The dirs-present check
(constants✓/composables✓/readme✓) is GREEN for goo-blob after this lane's fix.

---

## D. Deeply-nested / brittle SELECTORS — CSS + reactivity (SWEEP)

**VERDICT: CLEAN.**
- **`:deep()`** — 7 occurrences, ALL in COMMENTS ("retires the prior `:deep()`
  reach", "without a `:deep()` reach"). ZERO actual `:deep()` selector use.
- **Deep descendant chains** — one 4-level chain
  (`.instrument-chassis .instrument-dial .dial-divider .bezel-line`) — a clear
  component part-hierarchy scoped to the chassis's own DOM. BEFITTING-KEPT.
- **watch-on-watch** — 0 genuine nested-watch sites (AST-walked every
  `watch(`/`watchEffect(` callback body). Clean reactivity.

---

## E. The 4-point STYLING AUDIT (SWEEP)

1. **Non-idiomatic Tailwind** — 5 arbitrary-`px` sites, all BEFITTING one-off
   layout bounds (`min-w-[300px]`/`max-w-[500px]` notification, `w-[1px]`/`h-[1px]`
   hairline separator, `max-w-[420px]` toast, `max-h-[300px]` dropdown cap). No
   token-ladder gap. The var-in-arbitrary shorthand (`h-(--x)`) is W-CSS1's
   landed conversion — VERIFIED still applied.
2. **Monolithic/global that should be component-scoped** (VERIFY W-CSS1) — 31
   scoped SFC `<style>` vs 3 unscoped. The 3 unscoped (SortableList drag-ghost,
   Continuous/GlassTimeline `.timeline-popover`) are DELIBERATE + DOCUMENTED:
   they style PORTALED/teleported content scoped CSS cannot reach. BEFITTING.
   The central-CSS carve (tokens/glass/utilities → cohesion partials) HELD —
   the W-CSS1 no-delta proof stands; the cascade is byte-identical.
3. **Deprecated/archaic CSS** — 0 `float`, 0 clearfix. All `-webkit-` prefixes
   are legitimate (`::-webkit-scrollbar` — no standard equivalent; Lightning-CSS
   webkit companions, documented). `!important` (28) is all
   `prefers-reduced-motion` / `forced-colors` overrides — the two universally
   correct `!important` cases. CLEAN.
4. **Fragile rules** — 0 deeply-nested `calc()` chains. `min`/`max` sites are
   sane fluid caps (`min(80vw,64rem)` dock ceiling, `max(1rem,1em)` iOS-zoom
   guard, `min(54rem,100%)` readable-measure). Viewport units are the fluid-type
   `clamp(rem, rem+vw, rem)` idiom (rem floors) + sheet/dock caps — BEFITTING.
   z-index: global layering routes through `--z-*` tokens (6 sites); the
   hardcoded `z-index: 0/1/2/10` are WITHIN-component local stacking contexts
   (correct — routing those through the global ladder would couple local paint
   to global layering). BEFITTING.

---

## F. The design-idiom LOCALIZATION (VERIFY)

**VERDICT: LOCALIZED + GREEN.** `proof:design-idiom-localization` PASS (0
text-[var]/shadow-[var] wraps, 1 allowlisted). `proof:tailwind-v4-idiom` PASS
(0 theme() calls, 0 reg-wrap, dock+chassis @container contexts present, scale
families bridged). The idiom HOME (`docs/precepts/design-idioms.md`, cited by
CONTRIBUTING.md + index.css + CLAUDE.md) is in place — W-COLOCATE delivered it.

---

## FIXED-here change set (small, surgical, isomorphic)

| file | change |
|------|--------|
| `src/components/custom/goo-blob/constants.ts` | CREATE — the cross-module shape budget (`MAX_SATS`/`TRAIL_N`/`MAX_BLOB_STOPS`/`POS_SCALE`/`UNIFORM_NAMES` + `UniformName`) |
| `src/components/custom/goo-blob/composables/uploadBlobUniforms.ts` | import from `../constants`; re-export the budget (byte-identical import sites) |
| `src/components/custom/goo-blob/composables/useBlobPointer.ts` | import `TRAIL_N` from `../constants` (DE-DUPES the duplicate const); re-export |
| `tests/components/ui/button/Button.test.ts` | W-CSS1 follow-on: assert the `h-(--control-h-sm)` shorthand (was the retired `h-[var(...)]` form) |
| `tests/public-surface.spec.ts` | W-CSS1 follow-on: read tokens/glass/utilities.css via `readMonolith()` (carved-monolith reader) |
| `tests/components/custom/instrument-chassis/InstrumentChassis.spine-variant.test.ts` | W-CSS1 follow-on: read tokens.css via `readMonolith()` |
| `tests/components/custom/instrument-chassis/InstrumentChassis.phase-canon.test.ts` | W-CSS1 follow-on: read tokens.css via `readMonolith()` |

**The W-CSS1 follow-on test class.** W-CSS1 carved tokens/glass/utilities.css
into thin `@import` roots over cohesion partials and repointed the GATES to
`readMonolith()` — but MISSED the UNIT TESTS that `readFileSync` the monolith
directly + one stale `[var(--x)]` assertion vs the landed `(--x)` shorthand.
Result: 11 tests RED at HEAD across 4 files. FIXED isomorphically by repointing
to the SAME `readMonolith()` reader (the resolved cascade is byte-identical per
the W-CSS1 no-delta proof) + correcting the shorthand assertion. 14 → 3 fails.

---

## ROUTED (out of W-ASSAY scope)

- **`tests/components/custom/aurora/mediums-extraction.test.ts` (3 RED)** →
  **W-AUR-PAINTERLY / aurora lane.** The OIL StrokeProfile in
  `mediums.glsl.ts` was retuned (`streakFreq 240→340`, `streakAmp 0.09→0.14`) —
  an INTENTIONAL aurora value change that left this value-PRESERVATION test
  stale. Not a CSS-carve / colocation / selector / styling-audit issue; the
  aurora lane owns the GLSL values + their preservation test. NOT touched here
  (an ASSAY lane must not rewrite aurora's intended paint values).
- **`proof:dock-css-carve` (RED)** → **dock lane.** The `GlassDock.vue.d.ts`
  emits no `variant: "rail" | "instrument-strip"` discriminated-union branch
  (the union narrowed to `Record<string, any>` under withDefaults). Pre-existing
  at HEAD, persists after a fresh `npm run build`. A dock-dts-narrowing concern,
  not W-ASSAY.
- **`proof:colocation` registration + clause-narrowing** → **W-COLOCATE**
  (see §C ROUTED).

---

## Close state

- **Typecheck**: GREEN (both `vue-tsc --noEmit` arms).
- **Build**: GREEN (~590ms vite + dts; `dist/goo-blob.js` byte-identical).
- **ASSAY-adjacent gate fleet**: GREEN — `no-god-module`, `blob-render` (6/6),
  `blob-color-equivalence` (11/11), `tailwind-v4-idiom`, `design-idiom-localization`,
  `glass-cohesion`, `glass-level` (6/6), `shadow-contract`,
  `composable-return-types`, `webgl-substrate-single`, `single-color-core`,
  `verify-export-types` (public-surface no-delta).
- **Test suite**: 926/929 pass; the residual 3 are the ROUTED aurora
  mediums-extraction drift (W-AUR-PAINTERLY).
