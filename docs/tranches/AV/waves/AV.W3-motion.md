# AV.W3 - Motion-composables + keyframes orchestration-tier

## 2. State

**Name**: W3 - motion-composables lift (useCountup + v-reveal) + keyframes E.W10 orchestration-tier adoption
**Opens after**: nothing in-tranche — **AT-disjoint, opens NOW** (the AUDIT-DIGEST DEFERRED-FOLD LEDGER `FOLD-AV` line: "useCountup/v-reveal … AT-disjoint, open now"). Independent of the aurora-fix headline and W0/W1/W2.
**Agents**: 3 parallel-ish lanes — **(A) countup** (keyframes-bearing, `/motion`), **(B) reveal** (keyframes-FREE, `/motion-core`), **(C) keyframes-adoption** (the `useStagger*` delay-math fold). A and B are file-disjoint and parallel; C touches the two `useStagger*` leaves B does NOT (B creates the directive only), so A∥B∥C — but the orchestrator integrates the `index.ts`/`api/index.ts`/`package.json`/gate registration at close.
**Hard gate**: one NEW born-RED gate green (`proof:motion-composables-consumer`); the existing motion-surface gate matrix stays green with no regression (`proof:vueuse-free-root`, `proof:consumers:static`, `proof:strict-templates`, `typecheck`, `build`).
**Status**: planned

**Type:** IMPL (non-publish-blocking; AT-disjoint — lands before the 3.3.0 publish hinge E1).
**Scope source:** `docs/tranches/AV/audit/AUDIT-DIGEST.md` — Stream A (`FOLD-AV` ledger: useCountup/v-reveal ≥2; useIdleSchedule if 2nd consumer; the `scheduleAfterFirstPaint` transpose target L74-107), Stream C (the E.W10 LIGHT orchestration tier `stagger`/`flip`/`Sequence` adopt; the E.W9 native ScrollTimeline/ViewTimeline bridge; "Highest-value AV fold: adopt the keyframes LIGHT orchestration tier into glass-ui's motion composables … deletes any hand-rolled stagger/sequence"). This file is the execute-without-re-deriving spec.

**Precepts in force.** No legacy / no back-compat aliases (clean breaks — both new symbols ship on their canonical subpath only, no root-barrel alias for the keyframes-bearing one). Gestalt transposition, not patch — `useCountup` is RE-EXPRESSED on the engine, not pasted with its hand-rolled rAF intact. KISS — adopt the keyframes tier ONLY where a real hand-roll exists to replace (no speculative `stagger`/`flip`/`Sequence` adoption); the grep below governs. value.js-FREE keyframes seam — the lift consumes the LIGHT surface (`NumericAnimation`/`SpringProgress`/`stagger` — all value.js-free), NEVER `loadAnimationEngine`/`animate`/`CSSKeyframesAnimation`; `proof:vueuse-free-root` + the keyframes light-barrel discipline guard it.

## 2a. Goal criterion

This wave succeeds if (1) the slides-editorial `useCountup` count-up animator and the `v-reveal` entrance directive are canonical glass-ui motion composables — `useCountup` consuming the keyframes LIGHT `NumericAnimation` engine (exactly as the sibling `useNumericTransition` does) on the keyframes-bearing `/motion` subpath, `v-reveal` a dependency-free DOM directive on the keyframes-FREE `/motion-core` subpath; (2) each new symbol has **≥2 real consumer sites beyond test** (the slides DeckNav fork that adopts the lifted composable + a glass-ui demo route), machine-proven by the born-RED `proof:motion-composables-consumer` gate; (3) the `useStagger`/`useStaggerReveal` delay-distribution math is folded onto keyframes' `stagger()` generator **where—and only where—a genuine hand-roll exists** (see §3 grep); (4) the keyframes seam stays value.js-FREE. The reader's test: dropping either the slides consumer or the demo consumer of a new composable reddens the gate; the keyframes-bearing surface stays off the root barrel.

## 3. Scope

1. **Lift `useCountup`** (`/Users/mkbabb/Programming/slides/src/deck/useCountup.ts`) into `src/composables/motion/useCountup.ts` as a canonical composable, RE-EXPRESSED on the keyframes LIGHT `NumericAnimation` engine (replacing its hand-rolled `requestAnimationFrame(tick)` linear-progress loop). Ships on `/motion` (keyframes-bearing — NOT root barrel, NOT `/motion-core`).
2. **Lift `v-reveal`** (`/Users/mkbabb/Programming/slides/src/deck/reveal.ts`) into `src/composables/motion/vReveal.ts` as a canonical Vue `Directive` (dependency-free — `vue` type-only). Ships on `/motion-core` (keyframes-FREE + vueuse-FREE → root-barrel-safe; re-export from root per the `useViewTransition` precedent).
3. **Audit-then-adopt the keyframes E.W10 LIGHT `stagger()` generator** into `useStagger`/`useStaggerReveal` — fold the delay-DISTRIBUTION math onto the one solver ONLY where a real hand-roll exists (the grep in this section governs; KISS, no speculative adoption). `flip`/`flipShared`/`Sequence` are NOT adopted at HEAD (no hand-roll to replace — see §3 grep result).
4. **Extract `scheduleAfterFirstPaint`** (`useAurora.ts:74-107`) → a reusable `useIdleSchedule(task, timeout)` (two-rAF + `setTimeout(0)` Safari fallback + cancel) **IF a 2nd consumer exists**; the candidate 2nd consumer is `useCountup.runActive` (post-paint deferral of the count-up arm). Extract-and-share if it fits cleanly; else extract-and-keep-private in `aurora/` with the trigger named (KEEP-BOOK).
5. **Consider the E.W9 native ScrollTimeline/ViewTimeline bridge** (`createNativeTimeline`/`ScrollTimeline` on the keyframes timeline barrel) for `useScrollProgress` + the `scroll-driven.css` recipe — **adopt-or-defer with the trigger** (§3 decides).

### §3 keyframes-tier adoption — the hand-rolled-stagger grep (governs KISS)

`grep -rn "stagger|Sequence|setTimeout.*cascade" src/` resolves to exactly **two hand-rolls**, both `setTimeout`-cascade reveal drivers:

- **`useStagger.ts:123-137`** — a `for (i…) setTimeout(…, initialDelayMs + idx*delayMs)` LINEAR ramp. The delay distribution is a pure linear `idx*delayMs` — keyframes' `stagger(count, { each: delayMs })` is precisely this distribution (and adds `from: "center"/"edges"/eased` for free).
- **`useStaggerReveal.ts:65-68`** — a `setTimeout(…, staggerMs*idx)` LINEAR ramp inside the IntersectionObserver callback. Same linear distribution.

**The honest fold (NARROW, documented):** keyframes' `stagger()` is a pure delay-DISTRIBUTION GENERATOR — `(i, total) => delayMs` — **not a timer scheduler**. It does NOT run the cascade; the Vue composable still owns the `setTimeout`/IntersectionObserver machinery + the reactive `revealed[]` writes + the `onScopeDispose` timer-teardown (those are Vue-reactive concerns keyframes does not touch). So the adoption REPLACES the inline `idx*delayMs` / `staggerMs*idx` arithmetic with `const delay = stagger(itemCount, { each: delayMs }); … setTimeout(reveal, delay(idx, itemCount))` — one solver owns the distribution math, the composable keeps the scheduling. Net win: (a) one distribution solver instead of two ad-hoc ramps; (b) `useStagger` gains `from`/`ease` reshaping for free (linear stays the default — behavior-identical at HEAD); (c) deletes the float-drift hand-roll. This is a REAL fold, not speculative — both sites have a literal `idx*delay` hand-roll the generator subsumes.

**NOT adopted (no hand-roll → speculative-skip per KISS):**
- `flip`/`flipShared` — glass-ui's FLIP lives in `useLayerTransition.ts` (dock) and is keyframes-`ElementMorph`/AnimationGroup-driven ALREADY (AU.W8 seam); there is no hand-rolled FLIP to replace. SKIP (no fold).
- `Sequence` — grep finds NO hand-rolled master-clock sequencer in `src/` (the typewriter/dock sequencing is state-machine/`SpringProgress`-driven, not a hand-rolled timeline). SKIP (no fold).
- `drag`/`decay` — no hand-rolled drag-inertia in `src/` motion. SKIP.

### §5 E.W9 native-scroll bridge — adopt-or-DEFER decision

**DEFER (KEEP-BOOK).** glass-ui ALREADY runs the native-scroll-first contract HAND-ROLLED and correct: `supportsCssTimeline.ts` is a HARDENED `CSS.supports` probe (the garbage-value negative-probe filters lying happy-dom/jsdom shims — a discipline keyframes' `createNativeTimeline` does not replicate), and `useScrollProgress`/`useStaggerReveal` already go inert (zero listeners) on a supporting engine, ceding to the `scroll-driven.css` `.scroll-progress`/`[data-scroll-reveal]` compositor recipes (AQ.W5). keyframes `createNativeTimeline` constructs a JS `ScrollTimeline` OBJECT to DRIVE an animation — a different shape from glass-ui's "detect native → go inert, let CSS own it" dual-path-single-writer rule. Adopting it would ADD a JS timeline object on exactly the engine where glass-ui's whole point is to attach nothing. **Trigger to revisit:** a glass-ui consumer needs a reactive JS scroll value ON a supporting engine (the case `useScrollProgress`'s own docstring calls "opted into the wrong tool") AND wants keyframes to drive a non-CSS-expressible animation off it. No such consumer at HEAD → DEFER, record the trigger in `PROGRESS.md`.

## 4. File Bounds

| File | Access |
|---|---|
| `src/composables/motion/useCountup.ts` | create |
| `src/composables/motion/vReveal.ts` | create |
| `src/composables/motion/useStagger.ts` | modify (adopt `stagger()` distribution) |
| `src/composables/motion/useStaggerReveal.ts` | modify (adopt `stagger()` distribution) |
| `src/composables/motion/useIdleSchedule.ts` | create (IFF §4 2nd-consumer holds) |
| `src/components/custom/aurora/composables/useAurora.ts` | modify (replace inline `scheduleAfterFirstPaint` with `useIdleSchedule` import) — IFF extract-and-share |
| `src/composables/motion/index.ts` | modify (export `useCountup` + `useIdleSchedule` — keyframes-bearing `/motion`) |
| `src/composables/motion/core/index.ts` | modify (export `vReveal` — keyframes-FREE `/motion-core`) |
| `src/index.ts` | modify (re-export `vReveal` on the root barrel per the `useViewTransition` root-safe precedent; `useCountup` stays OFF root — keyframes-bearing) |
| `src/api/index.ts` | modify (promote `Countup` type + `useIdleSchedule` return type if exported-public) |
| `src/composables/motion/__tests__/useCountup.test.ts` | create |
| `src/composables/motion/__tests__/vReveal.test.ts` | create |
| `src/composables/motion/__tests__/useStagger.test.ts` | modify (assert distribution unchanged post-`stagger()` adoption) |
| `src/composables/motion/__tests__/useIdleSchedule.test.ts` | create (IFF extracted) |
| `demo/stories/motion/countup.vue` | create (the glass-ui demo consumer #2 — the count-up demo route) |
| `demo/stories/motion/reveal.vue` | create (the glass-ui demo consumer #2 — the v-reveal demo route) |
| `demo/stories/manifest.ts` | modify (register the two demo routes) |
| `scripts/proof-motion-composables-consumer.mjs` | create |
| `scripts/gates.mjs` | modify (register the gate) |
| `package.json` | modify (scripts only — the gate entry) |
| `CLAUDE.md` | modify (motion sub-tree line — name `useCountup`/`vReveal`/`useIdleSchedule`) |
| `docs/tranches/AV/PROGRESS.md` | modify (close record + the §5 DEFER trigger + the useIdleSchedule decision) |

Do NOT touch: `src/composables/glass/useLayerTransition.ts` (the dock FLIP — AU.W8-owned; §3 confirms NO flip fold here) · `src/composables/motion/supportsCssTimeline.ts` (the hardened native-scroll probe — §5 DEFER keeps it as-is) · `src/styles/scroll-driven.css` (the native CSS recipe — §5 DEFER) · any value.js path · `/Users/mkbabb/Programming/keyframes.js/**` (READ-ONLY upstream) · `/Users/mkbabb/Programming/slides/**` (the slides DeckNav fork that ADOPTS the lifted composable is a G-tranche cross-repo deliverable — this wave does NOT edit slides; it ships the library surface the fork consumes; see §10).

## 4a. Disjointness

- **Lane A (countup)** owns `useCountup.ts` + its test + `demo/stories/motion/countup.vue` + (if extracted) `useIdleSchedule.ts`/`useAurora.ts`/its test. Touches `index.ts` (the keyframes-bearing barrel) + `api/index.ts`.
- **Lane B (reveal)** owns `vReveal.ts` + its test + `demo/stories/motion/reveal.vue`. Touches `core/index.ts` (the keyframes-FREE barrel) + `src/index.ts` (root re-export).
- **Lane C (keyframes-adoption)** owns `useStagger.ts` + `useStaggerReveal.ts` + the `useStagger.test.ts` distribution assertion. Touches NEITHER barrel (those leaves are already exported).
- `index.ts`/`core/index.ts`/`src/index.ts`/`api/index.ts`/`manifest.ts`/`gates.mjs`/`package.json` registration edits are append-only to disjoint regions; the orchestrator integrates them at close in one commit to avoid an index race. The gate (`proof:motion-composables-consumer`) is registered ONLY after all three lanes land (manifest==ci — a born-RED gate must not register against an un-lifted file).

## 5. Agent Units

### AV.W3.1 useCountup lift (engine-driven)

- Goal: `useCountup` is a canonical `/motion` composable whose tween rides the keyframes LIGHT `NumericAnimation` engine, with the slides public surface (`runActive`/`settle`, the `[data-countup]`/`-dur`/`-delay` DOM contract, the `prefers-reduced-motion`/`skip` snap) preserved byte-for-byte so the slides DeckNav fork swaps the import with no call-site change.
- Mechanism:
  - **`src/composables/motion/useCountup.ts` (create)** — port the slides shape (the `Countup` interface, `runActive`/`settle`, the `data-countup`/`-dur`/`-delay` attribute reads, the `reduceMotion()` + `skip` snap). REPLACE the hand-rolled `requestAnimationFrame(tick)` linear-progress loop (`useCountup.ts:40-53`) with a per-element `new NumericAnimation({ from: 0, to: target, duration: dur, delay, easingFn })` driving `el.textContent = String(Math.round(value))` per frame (the engine owns the rAF loop + the binary-search segment lookup + the easing, exactly as `useNumericTransition.ts:9,33-34` already consumes it). Keep the `easeFn` opt as the consumer-supplied easing (forward as the engine's `easing`/`easingFn` — value.js-free callable, NOT a string name).
  - **Per-frame teardown** — track each per-element animation handle; `onScopeDispose`/an explicit `cancel()` stops every in-flight tween (the slides version leaks the rAF on unmount mid-tween — the lift FIXES this; record the hygiene gain). `settle()` stays the snap-to-end path (still-capture); it cancels any running tween then writes the end value.
  - **Idle deferral (§4 coupling)** — `runActive` defers its arm to post-paint via `useIdleSchedule` IF AV.W3.4 extracts it (else inline the same two-rAF deferral). This is the candidate 2nd consumer of `useIdleSchedule`.
  - value.js-FREE: `NumericAnimation` is a LIGHT engine (`@mkbabb/keyframes.js` static barrel — value.js-free). Import `{ NumericAnimation }` + `import type { NumericAnimationOptions }`. No `loadAnimationEngine`, no `animate`.
- Files: `src/composables/motion/useCountup.ts` (create), `src/composables/motion/index.ts` (export — `/motion`), `src/api/index.ts` (promote `Countup`), `src/composables/motion/__tests__/useCountup.test.ts` (create), `demo/stories/motion/countup.vue` (create), `demo/stories/manifest.ts` (register).
- Sub-gate: `proof:motion-composables-consumer` tallies `useCountup` at ≥2 (slides DeckNav fork + `demo/stories/motion/countup.vue`); `proof:vueuse-free-root` confirms `useCountup` is NOT on the root barrel (keyframes-bearing); the `useCountup.test.ts` asserts (a) a `[data-countup="42"]` settles to `"42"`, (b) `prefers-reduced-motion` snaps without a tween, (c) `cancel()`/unmount stops an in-flight tween (the leak fix); `typecheck` green.

### AV.W3.2 v-reveal lift (dependency-free directive)

- Goal: `vReveal` is a canonical dependency-free `/motion-core` (and root-barrel) Vue directive setting the `[data-reveal]` hook + the `--d` stagger-step custom property the consumer's CSS keyframes read, with the slides `v-reveal="N"` / `v-reveal:fade="N"` arg+value surface preserved.
- Mechanism:
  - **`src/composables/motion/vReveal.ts` (create)** — port the slides directive (`reveal.ts`): `mounted`/`updated` both call `apply(el, binding)` which sets `data-reveal` to `binding.arg === "fade" ? "fade" : ""` and `el.style.setProperty("--d", String(binding.value ?? 0))`. Export as `const vReveal: Directive<HTMLElement, number>`. Rename the slides-local `reveal` symbol to `vReveal` (the glass-ui directive-export convention — no `reveal` alias). `vue` is type-only (`import type { Directive, DirectiveBinding }`) — zero runtime dep → root-barrel-safe.
  - **De-slides the doc comment** — the slides comment references `deck.css §7` + `main.ts` global registration + `[data-state="active"]` gating (slides-editorial). The glass-ui docstring documents the CONTRACT (`[data-reveal]` hook + `--d` step) the consumer's own CSS reads, with no slides-deck specifics (greenfield-no-meta — no "ported from slides").
- Files: `src/composables/motion/vReveal.ts` (create), `src/composables/motion/core/index.ts` (export — `/motion-core`), `src/index.ts` (root re-export — root-safe per `useViewTransition`), `src/composables/motion/__tests__/vReveal.test.ts` (create), `demo/stories/motion/reveal.vue` (create), `demo/stories/manifest.ts` (register).
- Sub-gate: `proof:motion-composables-consumer` tallies `vReveal` at ≥2 (slides DeckNav fork + `demo/stories/motion/reveal.vue`); the `vReveal.test.ts` asserts (a) `v-reveal="3"` sets `data-reveal=""` + `--d:3`, (b) `v-reveal:fade="6"` sets `data-reveal="fade"` + `--d:6`, (c) `updated` re-applies on value change; `proof:vueuse-free-root` confirms it IS root-barrel-safe (dependency-free).

### AV.W3.3 keyframes stagger() distribution adoption

- Goal: the two hand-rolled linear stagger ramps (`useStagger`/`useStaggerReveal`) delegate their delay-DISTRIBUTION math to keyframes' LIGHT `stagger()` generator — one distribution solver, behavior-identical at the default linear ramp, with `from`/`ease` reshaping available for free.
- Mechanism (the NARROW fold per §3):
  - **`useStagger.ts:123-137`** — replace the inline `initialDelayMs + idx*delayMs` with `const delay = stagger(itemCount, { each: delayMs });` (constructed once in `start()`), then `setTimeout(reveal, initialDelayMs + delay(idx, itemCount))`. The `for`-loop + the reactive `revealed.value` slice-write + the `timers` `Set` + `onScopeDispose(clearAll)` STAY (Vue-reactive + teardown concerns keyframes does not own). `delayMs` default 80 (the `--motion-stagger-default` token) is preserved as `each`. EXPOSE an optional `from?: StaggerOrigin`/`ease?` pass-through on `UseStaggerOptions` ONLY if a demo consumer uses it (else KISS — keep the linear default, do not add unused options).
  - **`useStaggerReveal.ts:65-68`** — replace `staggerMs*idx` with a `stagger(targets.value.length, { each: staggerMs })` distribution; the IntersectionObserver callback uses `delay(idx, total)`. Same teardown/reactive machinery stays.
  - value.js-FREE: `stagger` is a LIGHT-barrel export (`./internal/leaves` clamp only; `toEasing` value.js-free). `import { stagger }` + `import type { StaggerOrigin, StaggerFn }`. Since these leaves now statically reach `@mkbabb/keyframes.js`, **confirm `/motion-core`'s keyframes-FREE contract** — `stagger` IS on the keyframes barrel, so `useStagger`/`useStaggerReveal` BECOME keyframes-bearing and must MOVE from `/motion-core` to `/motion`. **This is a subpath relocation — re-ground against the `proof:motion-core-free` discipline; if the relocation breaks a `/motion-core` consumer, that is a triumvirate trigger (the fold crosses a subpath boundary).** ALTERNATIVELY (KISS escape): if `stagger`'s linear distribution is a one-line `idx*each`, the fold's net value is marginal and the subpath churn is real — BOOK §3.3 with the trigger "a non-linear `from`/`ease` distribution consumer appears" and keep the two hand-rolls. **The unit author decides at HEAD: adopt IFF a demo/consumer actually wants `from`/`ease`; else BOOK (the keyframes-bearing relocation is not worth a behavior-identical linear ramp).**
- Files: `src/composables/motion/useStagger.ts`, `src/composables/motion/useStaggerReveal.ts`, `src/composables/motion/__tests__/useStagger.test.ts`, AND (if adopted) `src/composables/motion/index.ts`/`core/index.ts`/`package.json` for the subpath relocation.
- Sub-gate: no new gate. The `useStagger.test.ts` asserts the default-linear distribution is UNCHANGED post-adoption (the `idx*delayMs` ramp byte-equals `delay(idx)`); `proof:motion-core-free` (or `proof:vueuse-free-root`'s sibling) stays green for whichever barrel the leaves land on; `typecheck` green. **If BOOKed:** the §3.3 BOOK rationale + trigger recorded in `PROGRESS.md`, the two hand-rolls KEPT, the gate is `useCountup`+`vReveal`-only.

### AV.W3.4 useIdleSchedule extract (2nd-consumer-gated)

- Goal: `scheduleAfterFirstPaint` (aurora-inline) becomes a reusable `useIdleSchedule(task, timeout)` IFF a 2nd genuine consumer exists; the candidate is `useCountup.runActive`'s post-paint deferral.
- Mechanism:
  - **Decision (taken at HEAD):** the 2nd-consumer test is whether `useCountup.runActive` ACTUALLY wants a post-paint idle-deferral (the count-up arm should not compete with the slide-transition paint). If yes → **extract-and-share**: create `src/composables/motion/useIdleSchedule.ts` lifting `useAurora.ts:74-107` VERBATIM (the `requestIdleCallback` + `{timeout}` primary, the two-rAF + `setTimeout(0)` Safari fallback, the cancel return, the SSR `typeof window === "undefined"` guard) as `export function useIdleSchedule(task: () => void, timeout = 2000): () => void`; replace the aurora inline with the import; `useCountup` consumes it. If NO (the count-up arm fires on a `runActive()` call, not a mount, so it is already past first-paint) → **extract-and-keep-private**: leave `scheduleAfterFirstPaint` in `useAurora.ts`, record the trigger "a 2nd library primitive needs post-first-paint idle deferral" in `PROGRESS.md` (KEEP-BOOK per the digest's "useIdleSchedule (if 2nd consumer)").
  - **Lean recommendation:** `useCountup` is invoked imperatively (`runActive()` on slide-activate), which is ALREADY post-first-paint — so the honest read is **extract-and-keep-private** unless the count-up demo route surfaces a real first-mount-defer need. The unit author confirms against the demo; default to KEEP-BOOK (no speculative extract — the digest gates it on "if 2nd consumer", and a single aurora consumer does not clear the J-inv-10 ≥2 bar).
  - value.js-FREE + vueuse-FREE + keyframes-FREE (pure `window.requestIdleCallback`/rAF/`setTimeout`) → if extracted, ships on `/motion-core` (root-safe).
- Files: `src/composables/motion/useIdleSchedule.ts` (create — IFF share), `src/components/custom/aurora/composables/useAurora.ts` (modify — IFF share), `src/composables/motion/core/index.ts` (export — IFF share), the test (IFF share), `docs/tranches/AV/PROGRESS.md` (the decision + trigger ALWAYS).
- Sub-gate: IFF extracted, `proof:motion-composables-consumer` tallies `useIdleSchedule` at ≥2 (aurora + useCountup); IFF kept-private, the KEEP-BOOK trigger is recorded and the gate does NOT tally it (a BOOKed item is not a consumer claim — mirrors `proof:au-w9-consumers`'s BOOK-exclusion rule).

## 6. Hard Gate

W3 closes when every condition is evidence-backed:

1. **AV.W3.1** — `useCountup` rides `NumericAnimation` (no hand-rolled `requestAnimationFrame(tick)` loop survives); ships on `/motion` (NOT root, NOT `/motion-core`); the slides `runActive`/`settle`/DOM-contract surface is preserved; the unmount-mid-tween leak is fixed; `useCountup.test.ts` green; `Countup` promoted to `/api`.
2. **AV.W3.2** — `vReveal` is a dependency-free `Directive`; ships on `/motion-core` + the root barrel; the `v-reveal="N"`/`v-reveal:fade="N"` surface is preserved; `vReveal.test.ts` green.
3. **AV.W3.3** — EITHER the two `useStagger*` ramps delegate to `stagger()` with the default-linear distribution proven unchanged + the keyframes-bearing subpath relocation re-grounded green, OR §3.3 is formally BOOKed (linear-only → not worth the relocation) with the trigger in `PROGRESS.md`. The §3 grep result (two real hand-rolls; flip/Sequence/drag SKIP — no hand-roll) is recorded.
4. **AV.W3.4** — `useIdleSchedule` is extracted-and-shared (≥2: aurora + useCountup) with the aurora inline replaced, OR extract-and-kept-private with the trigger recorded (the default — imperatively-invoked `runActive` is already post-paint). The decision + rationale in `PROGRESS.md`.
5. **§5 native-scroll bridge** — DEFERRED (KEEP-BOOK) with the trigger ("a consumer needs a reactive JS scroll value on a supporting engine driving a non-CSS animation") recorded; `supportsCssTimeline.ts`/`scroll-driven.css` untouched.
6. **Gate** — `proof:motion-composables-consumer` (NEW, born-RED) GREEN + bite-verified: each NEW composable maps to ≥2 distinct consumer contexts (the slides DeckNav fork — cross-repo absolute path — + the glass-ui demo route — in-repo relative); every cited path RESOLVES at HEAD; BOOKed items (a kept-private `useIdleSchedule`) are NOT tallied. **Bite: drop the `demo/stories/motion/countup.vue` consumer (or the slides fork path) → RED.**
7. **value.js-FREE seam** — `proof:vueuse-free-root` GREEN; the keyframes imports are LIGHT-only (`NumericAnimation`/`stagger` — no `loadAnimationEngine`/`animate`/`CSSKeyframesAnimation`); `useCountup`/(relocated `useStagger*`) are OFF the root barrel; `vReveal` IS on it (dependency-free).
8. **No regression** — `proof:consumers:static`, `proof:strict-templates`, `typecheck`, `build` GREEN; `PROGRESS.md` records the wave with a green run id.

**Born-RED gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:motion-composables-consumer` | `scripts/proof-motion-composables-consumer.mjs` | `["local","ci"]` | drop `demo/stories/motion/countup.vue` (or the slides fork path) from the tally → RED |

Follows the house template (`scripts/proof-au-w9-consumers.mjs` — the closest sibling: a per-composable consumer tally with an injected path-resolver, BOOK-exclusion, a byte-stable JSON artefact via `scripts/gate-output.mjs`, a pure exported `detectConsumers(tally, resolves)` detector, `process.exit(1)` on any <2 or unresolved). The tally artefact: `docs/tranches/AV/audit/W3-motion-consumers.json`. In-repo consumer strings relative to the glass-ui root; the slides DeckNav fork is an absolute `/Users/mkbabb/Programming/slides/...` path (resolves at HEAD only after the G-tranche fork lands — see §10 Dependencies: the gate's slides arm is the cross-repo coupling, so the gate ships with the slides path AND the demo path, and the demo path alone clears ≥2 only if a SECOND in-repo consumer exists; if the slides fork is not yet landed, the demo route + a second in-repo story/route must supply the ≥2 — the unit author ensures two RESOLVING-at-HEAD consumers per composable, not one resolving + one pending).

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — after AV.W3.1 (the `NumericAnimation` consumption) and AV.W3.3 (the `stagger()` adoption / relocation), and at close.
- `npm run build` — after the barrel/subpath edits (confirm `/motion` carries `useCountup`, `/motion-core` carries `vReveal`, and — if §3.3 adopts — the relocated `useStagger*`), and at close.
- `proof:motion-composables-consumer` + the no-regression matrix (`proof:vueuse-free-root`, `proof:consumers:static`, `proof:strict-templates`) after their fold completes and at close.
- The motion `__tests__/` suites after AV.W3.1/.2/.3.
- `git diff --check` on the DOCS-edited files (`CLAUDE.md`, `PROGRESS.md`) at close.

## 8. Verification Artefacts

- `proof:motion-composables-consumer` JSON artefact (`docs/tranches/AV/audit/W3-motion-consumers.json`, byte-stable via `scripts/gate-output.mjs`).
- The §3 grep result (the two hand-rolled stagger ramps; flip/Sequence/drag SKIP) — recorded in `PROGRESS.md`.
- The §3.3 adopt-or-BOOK decision + the §4 useIdleSchedule extract-or-keep-private decision + the §5 native-scroll DEFER trigger — `PROGRESS.md`.
- The motion `__tests__/` green runs.
- The green CI run id for the wave + the integration commit hashes (§9) — `PROGRESS.md`.

## 9. Commit Plan

- **Lane A (countup)** — `feat(tranche-AV): W3 — lift useCountup onto the keyframes NumericAnimation engine (/motion)` (body: the engine-drive replacement + the unmount-leak fix + the demo route + the /api Countup promotion).
- **Lane B (reveal)** — `feat(tranche-AV): W3 — lift v-reveal as a dependency-free /motion-core directive` (body: the directive surface + the root-barrel re-export + the demo route).
- **Lane C (keyframes-adoption)** — `refactor(tranche-AV): W3 — adopt keyframes stagger() distribution in useStagger/useStaggerReveal` OR `docs(tranche-AV): W3 — BOOK keyframes stagger() adoption (linear-only; relocation not warranted)` (body: the §3 grep result + the adopt-or-BOOK rationale + the subpath relocation if adopted).
- **(optional) useIdleSchedule** — `refactor(tranche-AV): W3 — extract useIdleSchedule from useAurora (/motion-core)` (IFF extract-and-share; else folded into the PROGRESS close record as KEEP-BOOK).
- **Orchestrator gate-registration** — `chore(tranche-AV): W3 — register proof:motion-composables-consumer (born-RED, manifest==ci)`.
- **Orchestrator integration + docs** — `docs(tranche-AV): W3 close — PROGRESS green run id + CLAUDE.md motion-tree lines + barrels + decisions`.

## 10. Dependencies

- **Depends on**: nothing in-tranche — **AT-disjoint, opens NOW** (the digest `FOLD-AV` ledger). Consumes the keyframes E.W10 LIGHT orchestration tier (`stagger` — published on the value.js-free static barrel, `@mkbabb/keyframes.js` ^2.2.0||^3.0.0, already a glass-ui peer) and the LIGHT `NumericAnimation` engine (already consumed by `useNumericTransition`). No keyframes publish needed (the LIGHT tier ships in 3.0.0 per the digest Stream C).
- **Cross-repo (the ≥2 slides consumer)**: the slides **DeckNav fork** that swaps its local `useCountup`/`reveal` for the glass-ui `/motion`+`/motion-core` imports is a **G-tranche cross-repo deliverable** gated on the glass-ui 3.3.0 publish hinge E1 (the digest: "AV.W0-W1 are AT-disjoint, open before the publish"; the consumer ADOPTION lands post-publish in slides G.W1). **This wave ships the LIBRARY surface + the IN-REPO demo consumers; the gate's ≥2 must be cleared by TWO resolving-at-HEAD consumers per composable** (the demo route + a second in-repo story/route), NOT one in-repo + one pending-slides-fork — the slides absolute path is added to the tally as the EVENTUAL consumer but does not count toward ≥2 until it resolves (mirrors `proof:au-w9-consumers`'s "every cited consumer resolves at HEAD" rule). The unit author ensures each composable has two HEAD-resolving in-repo consumers (e.g. `demo/stories/motion/countup.vue` + a second demo route, or the existing `demo/stories/composables/use-stagger*.vue` for the relocated `useStagger*`).
- **Blocks**: nothing publish-blocking (non-publish-blocking IMPL); the slides G.W1 fork ADOPTION depends on this surface shipping in 3.3.0.

## 11. Archaeology

Not a re-attempt of a prior failed wave. The lift is a clean transposition from slides-editorial code into the library motion sub-tree. Three HEAD-grounding notes:

1. **`useCountup` is NEW to glass-ui** — glass-ui's existing count-up analog is `AnimatedDigit`/`useAnimatedNumber` (a per-DIGIT reel + a reactive formatted number), a DIFFERENT shape from `useCountup`'s "walk `[data-countup]` DOM elements + tween textContent" editorial pattern. The two coexist (no overlap-retire); the lift adds the DOM-walking editorial path the digit-reel does not cover.
2. **The `stagger()` fold is NARROW by design** — keyframes' `stagger()` is a delay-DISTRIBUTION generator, not a scheduler; the §3 grep found exactly two hand-rolled LINEAR ramps and zero hand-rolled flip/Sequence/drag, so the adoption is bounded to the distribution math (KISS — no speculative flip/Sequence adoption). If the linear-only distribution makes the keyframes-bearing subpath relocation not worth it, §3.3 BOOKs with a named trigger (a non-linear consumer).
3. **The §5 native-scroll bridge is DEFERRED, not skipped** — glass-ui already runs the native-scroll-first contract hand-rolled and HARDENED (`supportsCssTimeline.ts`'s garbage-value negative probe), with the inert-on-native dual-path-single-writer rule; keyframes' `createNativeTimeline` is a different shape (a JS timeline OBJECT to drive an animation, vs glass-ui's "detect → go inert → let CSS own it"). The trigger to revisit is recorded.

## SOTA crosswalk (folded)

Binding authority: `docs/tranches/AV/audit/SOTA-crosswalk.md`. W3 owns the §2.C spring-coverage rows + the Baseline-dated CSS-motion folds (the §1 crosswalk table). Each carries its Baseline date + an adopt/defer verdict per the crosswalk's marking.

### C2 — `linear()`-spring token-coverage sweep (ADOPT; convergence-only)

§2.C C2: every spring-flavored transition reads a `--spring-*` token; the surviving hand-rolled `--ease-apple-spring` cubic-beziers are the convergence DEBT. [SOTA §2.C C2, cit. B5 §2] Confirmed against HEAD — the `--ease-apple-spring` cubic-bezier survives at three sites: `cards.css:41` (the cartoon-surface `translate` transition), `animations.css:334` (the top-layer grammar `transition-timing-function`), and `tokens.css:1261` (`--vt-ease: var(--ease-apple-spring)`).

- **Baseline:** `linear()` physics easing is **WA — newly-avail 2023-12-11; crosses Widely-Available 2026-06-11** (Chrome/Edge 113, FF 112, Safari 17.2). [SOTA §1, cit. B5/B14] AV lands the week `linear()` becomes Baseline-WA — so the cubic-bezier debt is now **pure convergence, not risk**: the `--spring-*` `linear()` tokens already ship as the canonical spring primitive (`springLinearStops()` regen, C1 ✓ shipped). The fold demotes the cubic-bezier to a fallback-only role.
- **The fold (ADOPT):** converge the three `--ease-apple-spring` sites onto the equivalent `--spring-*` token (the apple-spring's +27.5% overshoot maps to the `--spring-bouncy`/`--spring-snappy` tier — pick the closest `linear()` stop-set; the `tokens.css:1270` comment already documents the VT-vs-FLIP fork). `--vt-ease` re-points at the `--spring-*` token. KEEP `--ease-apple-spring` as a token DEFINITION only if a `@supports not (transition-timing-function: linear(0,1))` fallback arm wants it — else delete it (no-legacy clean break).
- **Scope note:** this is a CSS-token convergence (styles only), adjacent to W3's motion-composable lift but in a different file set (`cards.css`/`animations.css`/`tokens.css`). It rides the AV.W5 hygiene-transposition idiom OR lands as a small W3 styles arm — the unit author folds it where the token-touch is cleanest; record the chosen home. The `proof:` evidence is a grep: zero `--ease-apple-spring` consumers outside its (optional) fallback definition.

### C3 — dock velocity-continuity (ADOPT; the dock-lag-adjacent fold)

§2.C C3: hand interrupted/mid-flight dock gestures to the live `SpringProgress` solver so a retarget re-seats from the CURRENT `(value, velocity)` — Apple's core spring argument — vs the STATIC `--spring-dock`. [SOTA §2.C C3, cit. B5 §3 / B7 §7; also §3.4 headline ADOPT] Confirmed against HEAD: `useLayerTransition.ts:237` constructs a `new SpringProgress({…})` per resize but the dock width-morph MIRRORS the static `--spring-dock` PRESETS (`:7-13` comment) — an interrupted gesture re-constructs the spring from the preset, NOT from the live in-flight `(value, velocity)`.

- **The fold (ADOPT):** on an interrupted/retargeted dock resize, re-seat the live `SpringProgress` from its current value + velocity (the solver already tracks both) instead of re-constructing from the static preset. This is the highest-leverage *interaction*-motion win and the **dock-lag-adjacent fold** — the live solver already exists and re-seats correctly; the work is wiring the retarget path to read the in-flight state.
- **Boundary (C4, ADOPT-as-invariant):** ambient WebGL (aurora/blob) stays on cheap static curves; the live solver is reserved for interactive surfaces (dock). [SOTA §2.C C4] Record as a convention so a future surface does not put the live solver on an ambient background.
- **Cross-wave note:** C3 touches `useLayerTransition.ts` (dock motion) — the §4 Do-NOT-touch list of THIS wave excludes the dock FLIP (AU.W8-owned). C3 is therefore a **named dock-motion fold recorded here for the dock-motion arm**, not a W3 src edit on the motion-composable leaves. The on-demand `will-change` lifecycle (F3) on the same composable is the AV.W7 perf deliverable; C3's velocity-continuity is the spring-correctness half. Both land in the dock-motion file; W3 records the seam, AV.W7 owns the perf half.

### Baseline-dated CSS-motion folds (the §1 crosswalk table)

Each row: the Baseline date + the adopt/defer verdict, grounded against the live grammar (`animations.css` §TOP-LAYER `.glass-top-layer`, `view-transition.css`, `dock-controls.css`).

- **`@starting-style` + `transition-behavior: allow-discrete` → dock/popover/tooltip enter-leave.** Baseline **NA — 2024-08-06** (Chrome 117, Safari 17.5, FF 129). [SOTA §1] **ADOPT** — the `.glass-top-layer` entry/exit grammar already uses it (AQ.W5); EXTEND to dock-layer + popover + tooltip enter-leave incl. `display:none`. `allow-discrete` goes on a SEPARATE `transition-behavior` declaration, NEVER in the `transition` shorthand (the AU.W8b.1 corpus rule). This composes with — does not replace — the FLIP fallback. **Adjacent to W3, lands in the styles/dock arm; recorded here.**
- **Same-document View Transitions + `view-transition-class`.** Baseline **NA — 2025-10-14** (FF 144 crossed it; Chrome 111, Safari 18). [SOTA §1] **ADOPT** — `useViewTransition` already in tree (AQ.W5); WIDEN to dock layer/tab + configurator-preset swaps.
- **Typed/active VT (`types` + `:active-view-transition-type()`).** Baseline **NA — 2026-01-13** (FF 147; Chrome 125, Safari 18.2). [SOTA §1] **ADOPT (layered)** — directional dock-layer slides as a SECOND PE tier above base VT; replaces hand-rolled FLIP-direction branching. Layered ON the same-doc VT widening above.
- **`color-mix(in oklch …)` for dock phase-tint tiers.** Baseline **WA — 2025-11-09** (Safari 16.2, Chrome 111, FF 113). [SOTA §1; §2.B B4] **ADOPT** — derive the dock hover/active/halo phase-tint tiers off one OKLCh seed via `color-mix(in oklch …)` (the perceptual upgrade of the in-house `color-mix(in srgb …)` pattern); the `--phase-color` crossfade mixes in oklch so CPU + GPU share one space. **Lands in `dock-controls.css`; recorded here as the §2.B B4 dock color fold.**

**Deferred against this wave (Baseline-gated, trigger named):**
- **`interpolate-size: allow-keywords` / `calc-size()`** — **Limited, Chromium 129 only** (no Safari/FF). [SOTA §1] **DEFER** — would let the dock animate to true `height:auto`; trigger is 2-of-3 engines. Keep the FLIP/`dim`-axis logic (the AU.W8b.1 `@supports`-gated arm is the correct current posture).
- **Scroll-driven `scroll()`/`view()`** — **Limited, NOT Baseline** (FF flag-gated). [SOTA §1] **DEFER** — the §5 native-scroll-bridge DEFER stands; `scroll-driven.css`'s `@supports`-primary-over-JS-fallback posture is correct. Trigger to sole-path: FF unflips the flag.
- **C5 — Apple `duration/bounce` two-knob parameterization** — **DEFER** (trigger: AV surfaces spring tuning to consumers/configurator). [SOTA §2.C C5]
