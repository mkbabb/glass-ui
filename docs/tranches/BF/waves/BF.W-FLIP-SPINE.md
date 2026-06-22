# BF.W-FLIP-SPINE — ONE shared FLIP-inversion rAF runner; fold the 5-way re-fork onto it

**Band 1 · Tier T1 · depends: W-FOLD-LEDGER**

## The defect / the ask

The audit's CHRONIC #1 (DEFERRED-CENSUS **D1**, `chronic ✓`; SEED §1 **R16** "no legacy / idiomatic / gestalt"): three BE leaves each re-implement the EXACT FLIP-inversion rAF loop the shipped `useLiquidReveal` already owns. Read the three sites side by side:

- `src/composables/motion/useLiquidReveal.ts:120-259` — the SHIPPED spine: `springTimingFunction({response, dampingFraction})` (`:134`), `durationMs = response * 4 * 1000` (`:138`), the `const step = (ts) => { eased = easing.fn(t); inv = 1 - eased; morph.apply(el, inv); opacity = eased; filter = blur(blurStart*inv); raf = requestAnimationFrame(step) }` loop (`:214-236`), the `prefersReducedMotion()` synchronous snap (`:186-190`), the `clearTransform`/`cancelRaf` cleanup.
- `src/composables/motion/useBloomUp.ts:249-507` — re-spells the WHOLE loop (`:266` springTimingFunction, `:270` `response*4*1000`, `:431-462` the `step`, `:400-406` the PRM snap) and adds ONLY one genuinely-new thing: the 4th `{fieldHue, field, fieldStrength}` ambient-color channel on the destination FIELD (`:339-351`, `:446-449`) + the `source!=dest` rect (`:371-382`) + `autoPrime`/`prime()` (`:298-334`, `:489-497`).
- `src/components/custom/dock/composables/useDockContextSilhouette.ts:367-498` — re-spells it again (`:368` springTimingFunction, `:369` `response*4*1000`, `:469-489` the `step` running `flips[].morph.apply(f.el, 1-eased)`).
- `src/composables/motion/useCelebrationBurst.ts:129-261` — re-spells it a third time (`:138` springTimingFunction, `:142` `response*4*1000`, `:229-255` the petal `step`).

Four copies of one mechanism. The SEED §2.1 thesis is binding: "NO fifth rAF runner. The SOTA direction is wiring the rich substrate, not duplicating it." The fold is: mint ONE runner (`useElementBloom`), make `useLiquidReveal` + `useBloomUp` thin consumers of it, re-point the silhouette + burst loops onto it, and gate-forbid a fifth re-spell.

## The mechanism

Mint **`src/composables/motion/useElementBloom.ts`** — the ONE shared FLIP-inversion rAF runner that every bloom/morph/burst loop in the library plays through. It owns the loop the four sites each re-spell; nothing else. Idiomatic by construction: it composes the SAME kf `ElementMorph` + `springTimingFunction` substrate (NO new spring family, NO new physics core — the W-GLASS-CAL fence), reads the SAME `springPreset(name)` row (`springPresets.ts` — the single vocabulary source), and is keyframes-bearing so it ships on `@mkbabb/glass-ui/motion`, NEVER the vueuse-free root barrel (the SCC-trap discipline `useLiquidReveal`/`useBloomUp` already carry).

**The runner's shape (`runBloom(opts): BloomHandle`).** A single `play(channelsFn)` over a `{response, dampingFraction}` spring:
- Resolves `easing = springTimingFunction(preset row)` + `durationMs = response * 4 * 1000` ONCE (the shipped `response*4` analytic settle horizon — never re-derived per-site).
- Drives ONE `requestAnimationFrame` step: `t = clamp01((ts-startTs)/durationMs)`, `eased = easing.fn(t)`, `inv = 1 - eased`, then calls a **pluggable channel writer** `write({eased, inv, t})` the caller supplies. The runner owns the clock + the rAF + the cleanup; the caller owns WHAT each frame paints.
- The CANONICAL channel set (the writers the runner ships as helpers, each opt-in): **transform** (ALWAYS — `morph.apply(el, inv)`, the FLIP inversion 1→0), **opacity** (`eased`), **filter-blur** (`blur(blurStart*inv)`), **onSettle** (fired once on the terminal frame AND on the PRM/SSR snap — the `settle()` hand-off), and the **PRM-snap** policy (under `prefers-reduced-motion: reduce`, seat the channels at their endpoint in ONE synchronous step — zero transform/blur frames, the fade survives — then `onSettle`; the `respectReducedMotion` default-true mirror).
- Exposes `cancel()` (the `cancelRaf` + clear) and a `blooming` ref — the `reset`/`conceal` seam the consumers expose.

**The folds (no dual path):**

1. **`useLiquidReveal` → thin consumer.** Its `reveal()`/`conceal()` re-express as: build `ElementMorph(settled, trigger)`, call `runBloom().play(channels={transform, opacity, filterBlur})`. The PUBLIC API (`reveal`/`conceal`/`UseLiquidRevealOptions`) is BYTE-IDENTICAL — consumers are untouched. The hand-rolled `step`/`startTs`/`raf` (`:213-244`) DELETE.

2. **`useBloomUp` FOLDS ONTO `useLiquidReveal` (D1's headline).** `useBloomUp` is NOT a sibling of `useLiquidReveal` — it is `useLiquidReveal` PLUS three additive things. Per the SEED §1 R1 owner-note and the census D1 destination ("`useBloomUp`→`useLiquidReveal`"), the move is: ADD to `useLiquidReveal` the additive 4th **`{fieldHue, field, fieldStrength}` ambient-color channel** (a writer on a DIFFERENT element — the `[data-glass-field]` ancestor — so the surface stays compositor-only; `useBloomUp.ts:339-351`+`:446-449` is the body, re-homed verbatim), the **`source != dest` rect** (`useLiquidReveal` already takes a `trigger` ref and a `surface` ref — the source≠dest case is just `bloom(sourceRef)` measuring a foreign source rect, which the FLIP already supports), and **`autoPrime`/`prime()`** (the no-mount-flash seam, `useBloomUp.ts:298-334`+`:489-497`, re-homed as an opt-in option on `useLiquidReveal`). After the fold, `useBloomUp.ts` is DELETED (clean break, no alias); its one real consumer-facing entry point becomes `useLiquidReveal(dest, { trigger: source, fieldHue, field, fieldStrength, autoPrime })`. The `useBloomUp` export line in `src/composables/motion/index.ts:61` is removed; the manifest/demo references re-point to `useLiquidReveal`.

3. **`useDockContextSilhouette` re-points onto the spine.** Its `step` loop (`:469-489`) calls `runBloom().play()` with a custom channel writer that runs `flips[].morph.apply(f.el, 1-eased)` + `writeFuse(fuseFrom + (fuseTo-fuseFrom)*eased)`. The `DOCK_SPRING`/`springPreset("dock")` selection (`:367`), the `ElementMorph` builds (`:435`/`:448`), the `registerFissionPiece` detach (`:455-465`), and the PRM seat (`:406`) STAY — only the rAF clock + the `step`/`durationMs`/`startTs` plumbing (`:368-369`, `:469-497`) fold onto the runner. The silhouette is a dock-band file; it imports the runner from `../../../../composables/motion/useElementBloom` (the same relative reach it already uses for `springPresets`).

4. **`useCelebrationBurst` re-points onto the spine.** Its petal `step` (`:229-255`) calls `runBloom().play()` with a per-petal channel writer (`transform: translate(dx*eased, dy*eased) scale(1-0.4*eased)` + `opacity: 1-eased` + `filter: blur(2*eased)`). The seeded-petal spawn (`:201-226`), the overlay DOM lifecycle (`:190-198`, `teardown`), the `fireSettleCascade` (`:109-115`), and the PRM cascade-only snap (`:169-173`) STAY — only the clock + `step`/`durationMs`/`startTs` (`:138-147`, `:228-255`) fold.

Compositor-only is preserved at every site (the runner only ever drives transform/opacity/filter + the field's registered `@property` customs — never a layout property; `proof:no-layout-animation` stays GREEN). PRM-safe is centralized: the runner owns the ONE `prefersReducedMotion()` snap policy, so a consumer cannot forget it.

## The gate — `proof:flip-spine` (born-RED → GREEN)

`scripts/proof-flip-spine.mjs`, `tags: ["local","ci","release"]` (a source-structure gate; the binding PAINT is the π below — this gate proves the CONSOLIDATION, not the pixels).

- **C1 — the spine exists ONCE.** `src/composables/motion/useElementBloom.ts` exists, exports `useElementBloom`/`runBloom` (or the named runner), composes `springTimingFunction` + `ElementMorph` from `@mkbabb/keyframes.js`, reads `springPreset` from `springPresets.ts`, and is published on the `/motion` barrel (NOT the root barrel — the keyframes-bearing SCC fence; a root-barrel re-export REDs).
- **C2 — `useBloomUp` is GONE (the fold landed).** `src/composables/motion/useBloomUp.ts` is DEFINITION-ABSENT; `export * from "./useBloomUp"` is absent from `index.ts`; the ambient-4th-channel `{fieldHue, field, fieldStrength}` options + `autoPrime` are present on `useLiquidReveal`'s option type (the additive channel survived the fold — a fold that DROPPED the field-warm would RED). A surviving `useBloomUp.ts` OR a `useLiquidReveal` missing the 4th channel both RED.
- **C3 — the DUPLICATION BITE (the load-bearing clause).** Scan `src/**/*.ts` for the FLIP-loop signature — a `requestAnimationFrame`-driven `step` that BOTH samples `springTimingFunction(...).fn(...)`/`easing.fn(...)` AND computes `durationMs = response * 4 * 1000` (or `1 - eased` over an `ElementMorph.apply`) INLINE, OUTSIDE `useElementBloom.ts`. The ONLY sanctioned site is `useElementBloom.ts`; any other file carrying the inline `springTimingFunction(...)` + `response * 4 * 1000` + a self-driven `requestAnimationFrame(step)` triad REDs as a fifth re-spell. `useLiquidReveal`/`useDockContextSilhouette`/`useCelebrationBurst` after the fold call the runner and carry NO inline `response * 4 * 1000` — they pass through the bite.
- **C4 — the four consumers compose, not fork.** `useLiquidReveal`, `useDockContextSilhouette`, `useCelebrationBurst` each IMPORT and CALL the runner (a real call expression, not a dead import) AND carry no inline `durationMs = response * 4 * 1000`. A severed import (fig-leaf delegation over a live duplicate) REDs — the `proof:webgl-substrate-single` clause-e composition-plus-fork precedent.
- **C5 — one spring family.** No new `SPRING_PRESETS` row, no hand `(response, dampingFraction)` literal in any of the four sites or the runner (all read `springPreset(name)`/`DOCK_SPRING`). A hardcoded `{ response: 0.3, dampingFraction: 0.6 }` REDs (the W-GLASS-CAL fence).

**Self-test (`--self-test`, born-RED→GREEN, ≥5 bites):** (1) a synthetic `useFooBloom.ts` re-spelling the `springTimingFunction` + `response*4*1000` + `requestAnimationFrame(step)` triad → C3 RED; (2) a surviving `useBloomUp.ts` stub → C2 RED; (3) `useLiquidReveal` option type with the `fieldHue` channel deleted → C2 RED; (4) a consumer that imports the runner but never calls it (dead import over a live inline loop) → C4 RED; (5) a hand `{response:0.3,dampingFraction:0.6}` in a consumer → C5 RED. Each MUST flag; the folded tree MUST be clean.

**What REDs on the pre-fix tree:** C2 (`useBloomUp.ts` exists), C3 (four files carry the inline FLIP triad), C4 (no runner to compose) — born-RED by construction; the gate is GREEN only after the runner lands and all four sites fold.

## The binding π — `tests-visual/flip-spine.spec.ts`

The painted-truth readback that the fold is BEHAVIOR-PRESERVING — a consolidation that changed the pixels is a regression, not a fold. Both modes (light/dark) + the **webkit** project (per SEED §6 precept 6; the runner drives `ElementMorph` transforms which must read identical cross-engine).

- **Surface — `/dock/liquid-playground` (the bloom) + a `useLiquidReveal` overlay (Dialog/Popover).** Capture the bloom frame-series: trigger a `useLiquidReveal`/`useBloomUp`-folded open, sample 3 in-flight frames + the settled frame.
- **Measured assertions:** (a) the in-flight frames carry a NON-identity `transform: matrix(...)` (the FLIP is running — not a flat cut); (b) the settled frame has identity transform + `opacity: 1` + `filter: none`/`blur(0)` (the runner cleared the inline channels — no stale transform pinned); (c) the **4th channel survives** — on a `fieldHue`-bearing bloom, the `[data-glass-field]` ancestor's `--glass-ambient-strength` resolves `> 0%` AND `≤ 8%` mid-bloom (the bounded warm survived the fold) and returns to `0%` after `reset`; (d) the celebration burst paints ≥1 `.glass-celebration-petal` with a non-identity transform mid-burst (the petal loop reads the spine); (e) under `prefers-reduced-motion: reduce` the surface SNAPS — zero transform frames, opacity 1, the field hue landed instantly (the centralized PRM policy fires once for all four sites).

## The gestalt row

**Roster surface: `dock-bloom`** (the BF-roster row W-GESTALT-WIRE mints). Verdict requirement: on a FRESH whole-page both-mode `:5199` capture (NEVER reducedMotion), the dock pill blooms into its sheet/player as ONE continuous liquid layer — scale+fade+decongest read as a single coalescing material (the four-channel coupling), the field warms toward the source hue sub-perceptually, and the close is no-overshoot. PASS iff the bloom reads identical to (or better than) the pre-fold capture — the consolidation is invisible to the eye. Rides `W-REFLECT` for the final flip; the surface-hash freshness floor binds.

## Fences

- **No-legacy / clean break.** `useBloomUp.ts` is DELETED, not aliased — there is no `export { useLiquidReveal as useBloomUp }` shim and no dual entry point. One bloom primitive (`useLiquidReveal`), one runner (`useElementBloom`), one spring family.
- **The anti-pattern this must not become:** a "shared runner" that the consumers IMPORT but a stray site still re-spells the loop beside (the fig-leaf fold). C3+C4 are the binding teeth — a dead import over a live inline loop REDs.
- **Compositor-only.** The runner writes transform/opacity/filter + the field's registered `@property` customs ONLY; it CANNOT write a layout property (it has no API for one). `proof:no-layout-animation` stays GREEN.
- **Presets-in-consumers.** The runner reads `springPreset(name)`; an album hue / demo value enters via the consumer's `fieldHue` arg, never a library token (the `--glass-ambient-hue` is written by the consumer's call, not baked).
- **D28 stays DEFERRED-with-trigger.** Folding `useLayerTransition` ≈ `dockMorphContext` onto the shared driver is OUT of scope (it breaks the live `/dock` `useLayer` path); D28's re-entry trigger ("once `W-FLIP-SPINE`'s shared driver lands") is now MET — the runner exists — but the fold itself is a separate future wave (the census F-row, not this one).

## Disposition links

Closes **D1** (the 5-way rAF re-fork → BUILD: one `useElementBloom` runner, `useBloomUp`→`useLiquidReveal`, silhouette + burst re-pointed). ENABLES **D28**'s trigger (the shared driver now exists; the `useLayerTransition`/`dockMorphContext` fold re-enters as its own future wave). The runner is the substrate `W-DOCK-INTEGRATE`/`W-SILHOUETTE-REALIZE`/`W-JUBILANCE-WIRE` compose downstream — they wire the (already-consolidated) engines into shipped SFCs.
