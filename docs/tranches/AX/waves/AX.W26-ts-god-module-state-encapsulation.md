# AX.W26 — TS god-module + state encapsulation

**Band** J · ENCAPSULATION · **Severity** major · **dependsOn** AX.W08, AX.W16, AX.W20 · **Charter**
AX.md §3 (the `### AX.W26` block, lines 1352-1375) + the §1 summary row (line 135) + the §2b band-J precept
row (line 222) + §4 note 10 (the composables/state + WebGL substrate layers are EXEMPLARY — AX.W26 is
SURGICAL, not a rebuild; lines 2044-2048) + §4 note 19 (the CSS gate-extension is W25a's; W26 owns the TS
arm; lines 2141-2151) · **Audit** `deep-audit-corpus.json` slice `god-modules` (index 25 — F4 the
useMetaballRenderer split, F5 the warn-band-fold-not-standalone discipline, plus the SLICE NOTES sequencing
clause) + slice `composables-state` (index 28 — F0 the dock derived-state→computed, F1 the GlassRenderer
detector-vs-filter split, F2 the sidebar re-base, F3 the speculative optional-context excision, F4 the
strict-guard `=== undefined` fix, F5 the keyboard-registry reactive-collection cleanup, plus the SLICE NOTES
"good shape — do NOT re-litigate the exemplary layer") · `constellation-analysis-corpus.json` (the
useMetaballRenderer consumer census — value.js's blob fork).

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `eaba94f` on the SOLE TS god-module violation the gate catches plus five
LATENT encapsulation traps, each re-proven LIVE against HEAD source (not trusted from the audit — the §0
cardinal "re-verify before acting" + §4 note 12 "verify against HEAD" discipline). The encapsulation gaps
are LATENT-by-construction: they do not crash today (the dock refs are kept coherent by hand, the strict
guard never sees a falsy `T`, the optional context is never injected) — the wave's job is to make the
divergence/trap STRUCTURALLY IMPOSSIBLE, so the RED witnesses are the SHAPE of the code, not a runtime
failure. This is the precept-valid born-RED for an encapsulation wave: the gate asserts the source SHAPE
(file-over-bound / hand-sync-helper present / speculative export present / falsy-coercion guard) the fix
provably eliminates.

- **RED witness 1 (the TS god-module — `useMetaballRenderer.ts` is 569 lines, the SOLE `proof:no-god-module`
  TS violation at HEAD).** `node scripts/proof-no-god-module.mjs` reports `status: FAIL` with exactly one
  `✗ OVER`: `src/components/custom/goo-blob/composables/useMetaballRenderer.ts is 569 lines (> 500)`. The
  bulk is a ~330-line `setup` closure whose nested `drawFrame` performs ~40 sequential `gl.uniform*` uploads
  inline (the W9 Blinn-Phong + W10 spring-pointer + W11 iridescence/palette/mood accretion), plus the
  program-build/uniform-locate block. The file was 351 lines at the AV.W13 split commit `0b27f01` (UNDER
  the bound) and the W9/W10/W11 goo-blob feature waves grew it to 569 with NO gate pressure (the gate is
  `['local']`-tagged and never ran in CI — the W25a fix). The per-frame upload logic has ZERO coupling to
  the WebGL lifecycle: it is a pure function of `(gl, location-cache, frame-state)` trapped inside a closure.
  *Falsifiable RED: `proof:no-god-module` (TS arm) FAILs on this file at HEAD. After: the file splits into
  `metaball-program.ts` (pure program-build leaf) + `uploadMetaballUniforms.ts` (pure per-frame upload), the
  renderer shrinks to a ~200-line lifecycle orchestrator, the gate's TS arm GREENS, the `useMetaballRenderer`
  return shape is byte-identical.*

- **RED witness 2 (the dock derived-state HAND-SYNC trap — `expanded`/`isPinned` are imperatively-mirrored
  writable refs, structurally desync-able).** `src/components/custom/dock/composables/useDockState.ts:84-85`
  declares `expanded`/`isPinned` as standalone mutable `ref`s, re-derived from the `state` machine on every
  transition via a `syncDerived()` helper (`:99`). At HEAD there are **19** `state.value = …` mutation sites
  but only **13** `syncDerived()` calls — the asymmetry itself is the latent bug: any mutation site that
  forgets the paired call silently desyncs `expanded`/`isPinned`/`onStateChange`. The doc-comment literally
  names them "derived ref" (`true` whenever `state !== "collapsed"`), and the sibling `isHeld` (added later)
  CORRECTLY uses `computed()` — proving the right pattern was already in-file. There is no single source of
  truth: `state` is the truth, but two of its projections are stored as independent writable cells the code
  keeps coherent by hand. *Falsifiable RED: `grep -c "syncDerived" useDockState.ts` ≠ `grep -c "state.value ="`
  (19 vs 13 — the hand-sync is present and incomplete); `expanded`/`isPinned` are `ref`-typed mutable cells.
  After: `syncDerived()` + the two writable refs are DELETED; `expanded`/`isPinned` are pure
  `computed(() => state.value !== "collapsed")` / `(() => state.value === "pinned")` derivations — divergence
  is structurally impossible; every mutation site is a bare `state.value = …` with zero bookkeeping.*

- **RED witness 3 (the strict-context guard COERCES falsy — `if (!ctx)` mis-fires on a legitimately-provided
  falsy `T`).** `src/composables/context/createContext.ts:64-66` guards with `const ctx = inject(KEY); if
  (!ctx) throw …`. This treats ANY falsy injected value (`false`/`0`/`''`) as "outside the provider." The 3
  current instantiations (DockContext / DockLayerGroupContext / UseSortableReturn) all carry object types, so
  it never mis-fires TODAY — but `createStrictContext` is the public canonical DI pair (AV.W14), and a future
  `createStrictContext<boolean>`/`<number>` would throw the "outside provider" error on a legitimately-provided
  `false`/`0`. Vue's `inject(KEY)` returns `undefined` EXACTLY when no provider exists, so the unambiguous
  sentinel is `=== undefined`, not the falsy coercion. *Falsifiable RED: the guard reads `if (!ctx)` (the
  falsy-coercion trap). After: `if (ctx === undefined)` — correct for every `T` including falsy-valued
  contexts, zero change to the 3 current call sites.*

- **RED witness 4 (a SPECULATIVE optional-context export with ZERO consumers — substrate-without-consumer).**
  `src/components/custom/dock/composables/dockLayerContext.ts:51-52` exports
  `useOptionalDockLayerGroupContext = ctx.useOptional`, documented "Befitting silent default; reserved for
  future consumers," and re-exports it from `dock/composables/index.ts:19`. `grep -rln
  useOptionalDockLayerGroupContext src/ demo/` returns ONLY the definition + the barrel + the dock README —
  ZERO functional consumers. The sibling `useOptionalDockContext` has 7 real consumers; `<DockLayer>` is
  MEANINGLESS outside `<DockLayerGroup>`, so strict-only is the correct intent (mirroring
  `sortable-list/context.ts:24-27`, which deliberately leaves the factory's `useOptional` unexported). The
  factory makes minting it free, so it leaked into the public dock barrel surface without a binary consumer.
  *Falsifiable RED: `useOptionalDockLayerGroupContext` is exported from `dockLayerContext.ts` + the dock
  barrel with zero functional consumers (L inv 8 / no-overfitting). After: the export is REMOVED from both
  (the factory still returns `useOptional`; it is simply not surfaced) — a dead public symbol gone, zero
  behaviour change.*

- **RED witness 5 (the sidebar sub-tree is an ISLAND — hand-rolls rAF/spring/listener-lifecycle the repo
  already ships).** `src/composables/sidebar/useSidebarFollow.ts` (247 lines) hand-rolls a raw
  `requestAnimationFrame` damped-scroll loop (`:81-130`, `nav.scrollTop += delta * damping` — a hand-rolled
  critically-damped approximation of the `useSpring` ODE the dock uses), DUPLICATES a 5-listener
  `addEventListener`/`removeEventListener` set across `bindSidebar` (add+remove) AND `onUnmounted` (remove
  again — a listener removed in two places is one rename from a leak), and rolls a bespoke `escapeSelector`
  (`:48`). `useScrollTracker.ts` (246 lines) independently hand-rolls its OWN rAF + scroll-listener
  lifecycle. The repo already ships `useSpring` (`src/composables/motion/useSpring.ts` — the same
  response/damping ODE), `useRAFLoop` (a full clock with pause/visibility/PRM/dispose), and the AV.W14 fold
  that re-based the motion composables onto these primitives DID NOT reach the sidebar sub-tree. *Falsifiable
  RED: `useSidebarFollow.ts` calls `requestAnimationFrame` directly (the hand-rolled damp) + binds 5
  listeners in two places (the duplicated cleanup); neither sidebar composable imports `useSpring`/`useRAFLoop`.
  After: the damped rAF is replaced by `useSpring`, the listener set is factored into ONE disposer, the
  bespoke `escapeSelector` drops to a shared `cssEscape`/platform `CSS.escape` — the sidebar stops being an
  island and composes the library's own clock/observer seams.*

- **RED witness 6 (the keyboard registry bolts a MANUAL version counter beside a non-reactive `Set`).**
  `src/composables/keyboard/useKeyboardShortcuts.ts:215-216` maintains `const shortcuts = new
  Set<RegisteredShortcut>()` PLUS a separate `const version = ref(0)` that every `registerShortcut`/cleanup
  manually bumps (`version.value++` at `:249,:253`) so the `labeled` computed re-runs — the computed reads
  `version.value;` (`:227`) as a FAKE dependency. A native `Set` mutation isn't tracked by Vue, so the author
  bolted reactivity on beside the data. The `version.value;` no-op read is fragile: a refactor that "cleans
  up" the unused read silently breaks invalidation. *Falsifiable RED: the `Set` + `version` ref pair + the
  `version.value;` fake-read are present (the bolted-on counter). After: a reactive collection (`shallowRef<Set>`
  + `triggerRef`, or `reactive(new Set())`) so the `labeled` computed depends on the collection directly — the
  `version` ref + the fake read both DISAPPEAR; behaviour-identical.*

The wave is RED at HEAD on all six witnesses (one hard `proof:no-god-module` FAIL + five latent
encapsulation traps); the HardGate drives the god-module gate GREEN and the five traps STRUCTURALLY-GONE.
Per §4 note 10 the composables/state layer is OTHERWISE EXEMPLARY (the AV.W14 DI factory pair, the
`useWebGLCanvas`/`createCanvasLifecycle` three-reason park, the `useSortable` 5-service orchestrator, the
ColorResolver DI) — this wave is SURGICAL (split one god-module + close five gaps), NOT a state-layer
rebuild. Per §4 note 12, NONE of the six is a publish-currency mirage — all are present at HEAD source.

---

## Goal

`useMetaballRenderer.ts` splits into a pure program-build leaf + a pure per-frame upload (the gate's TS arm
greens, the renderer is a ~200-line orchestrator), and the five latent encapsulation traps are closed at
their root — the dock `expanded`/`isPinned` become un-desync-able `computed()` derivations, the speculative
zero-consumer optional-context export is excised, the strict-guard coerces no falsy `T`, the sidebar sub-tree
re-bases onto the library's own `useSpring`/`useRAFLoop`/listener-disposer primitives, and the keyboard
registry's `Set`+manual-version-counter becomes one tracked reactive collection — leaving a green build,
vue-tsc, `proof:no-god-module`, and a live π-lane regression audit confirming the dock/sidebar/blob behave
identically post-split.

---

## Scope (the gestalt fix — no workaround, no legacy shim, no re-architecture)

The two slices share ONE meta-class: **a healthy state layer carrying a handful of localized
encapsulation gaps** — one god-module that regrew past the bound when the gate went blind, plus five places
where derived state, DI sentinels, primitive reuse, or reactivity were bolted on by hand instead of expressed
structurally. The gestalt fix is SURGICAL ENCAPSULATION (split-by-cohesion + derive-don't-mirror +
reuse-the-primitive + excise-the-speculative) — per §0 "DRY, KISS, no god modules, better encapsulation,
service boundaries" + §4 note 10's "do NOT re-litigate the exemplary layer." Six bounded moves, NONE a
rebuild:

**(1) SPLIT `useMetaballRenderer.ts` (569) into two cohesive colocated modules (slice 25 F4 — the TS
god-module).** Extract along the proven `aurora.frag` GLSL-partial + goo-blob `composables/` precedent (no
new abstraction — both splitters exist and are gate-locked):
- **`composables/metaball-program.ts`** — the PURE program-build leaf: compile/link/quad/uniform-location-cache
  (the current `:206-264` block), returning `{prog, vao, U, satLocs, trailLocs, paletteLocs}`.
- **`composables/uploadMetaballUniforms.ts`** — the PURE per-frame uniform-upload function `uploadUniforms(gl,
  locs, frameState)` (the ~170 lines of `gl.uniform*` calls, `:337-507`), taking the resolved
  color/params/pointer/satellites snapshot.
- The renderer SHRINKS to the lifecycle orchestrator (~200 lines): `resolveColor`/`resolveRimColor` caches,
  the `createWebGLCanvas` wiring, the tempo-integration clock, the `setup→{frame, shouldContinue, resize,
  teardown}` threading. **The `useMetaballRenderer` return (public shape) is UNCHANGED** — the `/goo-blob`
  subpath consumers (and value.js's fork) see zero surface delta.
- **COORDINATE with W08 + W16 (dependsOn):** W08 (blob core un-flood — POS_SCALE/uSmoothK) and W16 (blob
  integration/perf) REWRITE the renderer's per-frame regime. W26 must SPLIT the file AFTER those rewrites
  settle (slice 25 F4: "coordinate with §3 blob-perfection waves" so the split carves the FINAL upload model,
  not mid-churn debris — the same "split AS the churn settles" discipline §4 note 19 corrected for dock.css).

**(2) ENCAPSULATE the dock derived-state — `expanded`/`isPinned` → pure `computed()` (slice 28 F0).** DELETE
`syncDerived()` and the two writable refs. `expanded = computed(() => state.value !== "collapsed")`,
`isPinned = computed(() => state.value === "pinned")`. Fold the `getAlwaysExpanded()` clamp into the
`alwaysExpanded` watcher (already `immediate:true`); move the `onStateChange` side-effect onto a
`watch(state, (n,o)=>onStateChange?.(n,o))`. Every mutation site becomes a bare `state.value = …` with zero
bookkeeping. The return shape is API-compatible — `UseDockStateReturn` already types `expanded`/`isPinned`
as `Ref<boolean>` (`:33,:35`), and a `ComputedRef<boolean>` is assignable. Net: −1 helper, −13 call sites,
divergence STRUCTURALLY IMPOSSIBLE.
- **COORDINATE with the dock band (W01/W02/W03) — sequencing caveat.** The slice NOTES flag the useDockState
  fix as "load-bearing for the §1 dock-animation slice (the box-shrinks-before-items defect lives in
  `useLayerTransition`'s orchestration, but it reads `expanded`/`visualExpanded` off useDockState — a
  desynced derived ref would corrupt the morph clock)." W01 re-derives `useLayerTransition` from first
  principles; W26's `useDockState` computed-cleanup must compose with W01's morph driver, NOT fight it. **W26
  does NOT touch `useLayerTransition.ts`/`GlassDock.vue` (479/476 warn-band — the W01 dock rewrite owns those
  per slice 25 F5).** W26 owns ONLY the `useDockState.ts` derived-ref encapsulation. Sequence so the computed
  derivation lands on the W01-rebuilt morph core (W08/W16 are the charter dependsOn; the dock-band
  coordination is a disjointness contract — see Disjointness). **The `dock/composables/index.ts` barrel
  collision is REAL, not disjoint (HARDENING §G #17 correction):** W01/W02/W03 CO-EDIT that barrel (W01 ADDs
  `useLayerTransition`, W02 the morph-context helpers, W03 `useDockHold`); W26 DROPS the
  `useOptionalDockLayerGroupContext` re-export (`:19`) — so W26's barrel edit SERIALIZES strictly AFTER the
  dock band lands (not concurrent). The `useDockState` reader-relationship is to **`GlassDock.vue`** (the
  consumer that reads `expanded`/`visualExpanded` off `useDockState`), NOT to `useLayerTransition` — `GlassDock.vue`
  is the reader W26's computed-cleanup must not desync; W26 owns ONLY `useDockState.ts` (the §19.9 click /
  aria-expanded contract reads through it — W26 is the SOLE `useDockState` editor).

- **§19.8 idle-collapse + §19.9 click/aria — owned by W26 via `useDockState` (HARDENING §G #17 + §5.2).** The
  §19.8 "useIdle composable" is a charter FICTION — it is inline `scheduleCollapse` machinery in
  `useDockState.ts` with a 2000/2500ms delay DIVERGENCE (name it, do NOT invent a composable that does not
  exist). W26 RATIFIES the idle-collapse delay-model (reconcile the 2000-vs-2500ms divergence onto one token)
  as part of the `useDockState` computed-cleanup. The §19.9 click-driven layer switch + the dock-trigger
  `aria-expanded` contract read through `useDockState`'s `expanded` (the GlassDock aria contract: the root is
  presentational, `aria-expanded` belongs on the trigger child bound to the exposed `expanded`) — W26 VERIFIES
  the click/aria path composes with the computed `expanded`, the SOLE `useDockState` editor.

**(3) HARDEN the strict-context guard — `if (!ctx)` → `if (ctx === undefined)` (slice 28 F4).** A one-line
latent-trap excision in `createContext.ts:65` (type the inner `inject` result accordingly). Zero change to
the 3 current object-typed call sites; makes the canonical DI factory correct for EVERY `T` including
falsy-valued contexts. NOT a workaround — the audit names it "a latent-trap excision."

**(4) EXCISE the speculative `useOptionalDockLayerGroupContext` (slice 28 F3 — substrate-without-consumer).**
Stop exporting it from `dockLayerContext.ts:52` AND `dock/composables/index.ts:19` — leave the factory's
`useOptional` un-bound (the factory still RETURNS it; it is simply not surfaced), exactly as
`sortable-list/context.ts` does. `<DockLayer>` outside `<DockLayerGroup>` is meaningless, so strict-only is
the correct documented intent. Update the dock README line that references it. Zero behaviour change; removes
a dead public symbol (L inv 8 / no-overfitting).

**(5) RE-BASE the sidebar sub-tree onto the library's motion/dom primitives (slice 28 F2 — DRY).** Stop the
sidebar being an island:
- **`useSidebarFollow.ts`:** replace the hand-rolled damped rAF (`:81-130`) with `useSpring` (one source of
  truth for the approach curve — the same ODE the dock uses; `manualOverride` becomes a `spring.stop()`).
  Factor the duplicated 5-listener `addEventListener`/`removeEventListener` set (`:181-201` + the
  `onUnmounted` remove) into a SINGLE `bindListeners(el, map)` disposer (or a `useEventListener`-style helper)
  so the list lives in ONE place and cleanup is structural. Drop the bespoke `escapeSelector` (`:48`) for a
  shared `cssEscape` util / platform `CSS.escape` (SSR-guarded once).
- **`useScrollTracker.ts`:** fold its independent rAF + scroll-listener lifecycle onto `useRAFLoop` + the same
  listener disposer.
- Net: the sidebar composes the library's own clock/observer/DI seams (the §11.3 "pipeline orchestration /
  service boundary" intent) — NO new abstraction, REUSE the shipped primitives.

**(6) REPLACE the keyboard registry `Set`+version-counter with a tracked reactive collection (slice 28 F5 —
cosmetic).** Replace `new Set` + `version = ref(0)` + the `version.value;` fake-read + the manual
`version.value++` bumps with a reactive collection (`shallowRef<Set<…>>` + `triggerRef` on mutation, or
`reactive(new Set())`/`ref(new Map())`) so the `labeled` computed depends on the collection directly. The
`version` ref + the fake dependency read both disappear. Behaviour-identical; removes the bolted-on counter.

**(7) GlassRenderer detector-vs-filter SPLIT — COORDINATE-ONLY with W20 (slice 28 F1).** `useGlassRenderer.ts`
(257) bundles a pure reactive `detectTier()`/`tier` DETECTOR with a 90-line imperative DOM-mutating
`createGlassFilter`/`destroyGlassFilter` factory (hardcoded `rgba`, `(window as any).chrome` UA sniff) whose
SOLE consumer is GlassPanel — the component **W20 RETIRES**. **The imperative filter DIES WITH the GlassPanel
retire (W20 owns the deletion of the GlassPanel-dependent filter exports).** W26's contribution is the
FINAL DETECTOR-ONLY file shape: keep `useGlassRenderer.ts` as the pure reactive detector (the `tier` ref +
`detectTier()` only; replace the redundant `(window as any).chrome` sniff with the capability probe it
already `CSS.supports`-tests). **RATIFY-BEFORE-IMPL the W20↔W26 delete-vs-keep boundary** (see Disjointness +
Open Questions): the recommended path is W20 deletes the filter EXPORTS (so the build greens with GlassPanel
gone) and W26 finalizes the detector-only shape + the chrome-sniff cleanup. If W20 lands first, W26 just
tidies the detector; if W26's split predates W20's land, W26 carves the file along the boundary and W20
deletes the filter half. NEVER double-edit the file in one merge window.

**(8) The 17-file WARN BAND is NOT split standalone (slice 25 F5 — discipline, not a move).** The 301-500
warn-band files (`useLayerTransition` 479, `GlassDock.vue` 476, `BouncyToggle.vue` 491, `ContinuousMarkers.vue`
437, `aurora.frag.ts` 431, `color.ts` 390, …) are UNDER the bound — splitting them in isolation is
contrivance (§0 no-contrivance). The dock warn-band files split AS PART OF the W01 dock rewrite; the aurora
warn-band files ride W10-W14; the heavy-`<style>` Vue files (BouncyToggle, ContinuousMarkers) get their
scoped CSS evaluated in the W06/W18 storybook-cohesion pass. W26 FLAGS the warn band to the AX FINAL as the
standing watch-list once the gate scans CSS + runs in CI — it does NOT split them here.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | SHRINK to the ~200-line lifecycle orchestrator — extract the program-build + per-frame upload, keep the resolveColor/tempo-clock/setup-threading; public `useMetaballRenderer` return UNCHANGED (Move 1). |
| `src/components/custom/goo-blob/composables/metaball-program.ts` | **NEW** — the pure program-build leaf (compile/link/quad/uniform-location-cache) returning `{prog, vao, U, satLocs, trailLocs, paletteLocs}` (Move 1). |
| `src/components/custom/goo-blob/composables/uploadMetaballUniforms.ts` | **NEW** — the pure per-frame `uploadUniforms(gl, locs, frameState)` (~170 lines of `gl.uniform*`) (Move 1). |
| `src/components/custom/goo-blob/composables/index.ts` (if a composables barrel exists) | ADD the two new leaf re-exports IF the goo-blob composables barrel re-exports per-composable; the renderer's public surface (the `/goo-blob` subpath) is unchanged (Move 1). |
| `src/components/custom/dock/composables/useDockState.ts` | DELETE `syncDerived()` + the `expanded`/`isPinned` writable refs (`:84-85,:99`); make both `computed()`; fold the alwaysExpanded clamp + onStateChange onto watchers; strip the 13 `syncDerived()` calls (Move 2). |
| `src/composables/context/createContext.ts` | `if (!ctx)` → `if (ctx === undefined)` (`:65`); type the inner `inject` result (Move 3). |
| `src/components/custom/dock/composables/dockLayerContext.ts` | DELETE the `useOptionalDockLayerGroupContext` export (`:51-52`) + its "reserved" comment (Move 4). |
| `src/components/custom/dock/composables/index.ts` | DROP the `useOptionalDockLayerGroupContext` re-export (`:19`) (Move 4). |
| `src/components/custom/dock/README.md` | REMOVE the `useOptionalDockLayerGroupContext` reference (the dead-symbol doc trail) (Move 4). |
| `src/composables/sidebar/useSidebarFollow.ts` | REPLACE the hand-rolled damped rAF (`:81-130`) with `useSpring`; factor the duplicated 5-listener set (`:181-201` + onUnmounted) into ONE disposer; drop bespoke `escapeSelector` (`:48`) → `cssEscape`/`CSS.escape` (Move 5). |
| `src/composables/sidebar/useScrollTracker.ts` | FOLD the independent rAF + scroll-listener lifecycle onto `useRAFLoop` + the listener disposer (Move 5). |
| `src/utils/` (a small shared `cssEscape` leaf, IF none exists) | ADD a shared `cssEscape` util IF the sidebar re-base needs one and the repo has no platform-guard leaf (Move 5; KISS — prefer the platform `CSS.escape` SSR-guarded if a util is contrivance). |
| `src/composables/keyboard/useKeyboardShortcuts.ts` | REPLACE the `Set` + `version` ref + `version.value;` fake-read + manual `version.value++` bumps (`:215-216,:227,:249,:253`) with a tracked reactive collection (Move 6). |
| `src/composables/glass/useGlassRenderer.ts` | **COORDINATE-ONLY with W20.** Finalize the DETECTOR-ONLY shape (`detectTier()`/`tier`) + replace the `(window as any).chrome` sniff (`:23`) with the capability probe; the imperative filter (`:127,:147-235`) DELETION is W20's (it dies with GlassPanel). RATIFY the boundary (Move 7). |
| `src/composables/glass/index.ts` | (COORDINATE-ONLY) — the filter re-export drops are W20's; W26 confirms the detector re-export survives clean (Move 7). |
| `scripts/proof-no-god-module.mjs` | NO edit (W25a owns the gate's `.css`-extension + CI re-tag; W26 only DRIVES the TS arm GREEN). The W26 close VERIFIES the gate greens on the metaball split. |
| `docs/tranches/AX/audit/W26-ts-god-module-state.json` | **NEW** — the born-RED→GREEN audit artefact (the six witnesses + per-move disposition + the metaball-split line-count proof + the paired-π BEFORE/AFTER + DELTA for the dock/sidebar/blob behavioural regression + the W20/W08/W16 coordination record + the warn-band FINAL watch-list handoff). |

**OUT of bounds:** `src/components/custom/dock/composables/useLayerTransition.ts` (479) + `GlassDock.vue`
(476) (the **W01** dock rewrite owns the warn-band split of these — W26 touches ONLY `useDockState.ts`'s
derived-ref encapsulation, NOT the morph orchestrator); the imperative `createGlassFilter`/`destroyGlassFilter`/
`GlassFilterState` DELETION (the **W20** GlassPanel retire owns it — the filter dies with GlassPanel; W26
finalizes only the detector-only shape); `scripts/proof-no-god-module.mjs`'s `.css`-extension + CI re-tag
(the **W25a** gate-extension owns the collector change + tag-model — W26 just drives the TS arm GREEN); the
blob per-frame REGIME (uSmoothK/POS_SCALE re-derivation — **W08**/**W16** own the upload semantics; W26 only
SPLITS the file AFTER their rewrites settle, preserving behaviour); the aurora warn-band files (`aurora.frag.ts`
431, `color.ts` 390 — **W10-W14** own those); the heavy-`<style>` Vue warn-band files (`BouncyToggle.vue`
491, `ContinuousMarkers.vue` 437 — the **W06/W18** storybook-cohesion pass evaluates the scoped CSS); the CSS
god-module carves (tokens/dock/utilities/glass — **W25b**/**W06**); value.js's blob fork DELETION (a sibling
repo — the metaball-split preserves the public `useMetaballRenderer` shape so value.js's fork retires onto the
unchanged `/goo-blob` surface, routed via **W34/W35**, NOT a W26 sibling edit).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W25a (CSS god-module gate-extension + CI re-tag).** W25a OWNS `scripts/proof-no-god-module.mjs` (the
  `.css`-collector extension + the `['local','ci']` re-tag + the dist `@source` deadlink). W26 OWNS the TS
  SPLIT that makes the gate's TS arm green. **Disjoint by gate-vs-split:** W25a changes the GATE (it bites
  CSS + runs in CI); W26 changes the SOURCE (the metaball split). W26 does NOT edit the gate script. Sequence
  caveat: W25a's CI re-tag makes the gate BITE — W26's metaball split is what greens the TS arm under that
  re-tag (today the gate FAILs on `useMetaballRenderer` but exits-0 local-only; after W25a it would RED in CI
  until W26 splits). Coordinate so the gate-extension and the TS-split land in an order that yields a green
  intermediate (W25a's born-RED is the 4 CSS files; the TS arm is separately red on metaball until W26).
- **vs W25b (CSS monolith carves).** W25b carves tokens/utilities CSS along §-seams + relocates
  component-coupled recipes. **File-disjoint** — W25b touches `.css`; W26 touches `.ts`. ZERO shared files.
  Both are J-band god-module work but on orthogonal language arms (CSS vs TS).
- **vs W20 (primitive fix — GlassPanel retire + the `useGlassRenderer` filter).** The ACTIVE shared file:
  `src/composables/glass/useGlassRenderer.ts`. W20 RETIRES GlassPanel (the sole filter consumer) + deletes the
  GlassPanel-DEPENDENT filter EXPORTS (`createGlassFilter`/`destroyGlassFilter`/`GlassFilterState`) so the
  build greens with GlassPanel gone. W26 finalizes the DETECTOR-ONLY file shape (`detectTier()`/`tier`) + the
  `(window as any).chrome`→capability-probe cleanup + the file split along the service boundary. **Disjoint by
  sub-concern + sequence:** W26 dependsOn W20 (charter line 1353) — the filter "dies with" the GlassPanel
  retire, so W20's consumer-retire lands FIRST and W26 carves the detector-only remainder. **RATIFY the exact
  delete boundary at wave-open (Open Question 4)** so the file is not double-edited in one merge window. If
  W20 lands first (the dependsOn order), W26 just tidies the detector + chrome-sniff. The recommended split:
  W20 owns the FILTER deletion; W26 owns the DETECTOR shape.
- **vs W01/W02/W03 (the dock band — `useLayerTransition`/`GlassDock`/`useDockHold`).** W01 re-derives
  `useLayerTransition` from first principles (479→~130) and splits the dock warn-band files; W02 folds the
  inner layer-group onto the outer driver; W03 rebuilds keepDockOpen. **Disjoint by composable:** W26 touches
  ONLY `useDockState.ts` (the `expanded`/`isPinned` computed-derivation) + `dockLayerContext.ts` (the
  speculative-export excision) — NOT `useLayerTransition.ts`/`GlassDock.vue`/`useDockHold` (W01/W02/W03's).
  **Sequence caveat (slice 28 NOTES):** the `useDockState` derived-ref encapsulation is "load-bearing for the
  §1 dock-animation slice" — `useLayerTransition` reads `expanded`/`visualExpanded` off `useDockState`, so a
  desynced derived ref would corrupt W01's morph clock. W26's computed-cleanup must compose with the
  W01-rebuilt morph core: ideally `useDockState`'s computed derivation lands so W01 sits on a coherent state
  core. Coordinate the merge order (the charter dependsOn is W08/W16/W20, NOT W01 — so the dock-band
  coordination is a DISJOINTNESS contract on the shared `useDockState` reader-relationship, not a hard
  dependsOn; both edit different files, but W26 must land its `useDockState` cleanup compatibly with W01's
  consumption).
- **vs W08 (blob core un-flood) + W16 (blob integration/perf) — the dependsOn predecessors.** W08 re-derives
  the uSmoothK/POS_SCALE distance regime; W16 restores the pause/resume seam + demand-gate. Both REWRITE
  `useMetaballRenderer.ts`'s per-frame upload semantics. **W26 dependsOn both (charter line 1353) and SPLITS
  the file AFTER their rewrites settle** (slice 25 F4: "coordinate with §3 blob-perfection waves" — split the
  FINAL upload model, not mid-churn debris). **Disjoint by phase:** W08/W16 change the upload MATH (the
  regime); W26 carves the upload STRUCTURE (the program-build leaf + the upload function) without changing
  behaviour. The split must preserve W08/W16's regime byte-for-byte — `proof:blob-render` (W08/W16's
  regression-lock) GREEN before AND after the W26 split is the isomorphism proof.
- **vs W27a/W27b (legacy gate-hardening + commentary sweep).** W27a/W27b scrub tranche-letter commentary +
  promote the legacy gates. **File-disjoint by concern** — W27a/W27b touch COMMENTS + gate tags; W26 touches
  STRUCTURE (splits + derivations). If W26's metaball split or sidebar re-base writes new code, it MUST be
  tranche-letter-comment-free at authoring (the greenfield-no-meta mandate W27b enforces) — coordinate so W26's
  new files (`metaball-program.ts`/`uploadMetaballUniforms.ts`) carry design-WHY prose, never "split at AX.W26"
  archaeology.
- **vs W34/W35 (cross-repo).** value.js maintains a local goo-blob/metaball fork (constellation analysis); the
  W26 metaball split PRESERVES the public `useMetaballRenderer` shape, so value.js's fork can retire onto the
  unchanged `/goo-blob` surface — that adoption routes to W34 (idiom census) / W35 (consumer-migration DAG),
  NOT a W26 sibling edit. **W26 writes NO sibling source** — it carries the "split is shape-preserving, the
  fork can retire" NOTE.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤3 agents — file-disjoint arms).** Arm A (the metaball split — Move 1, the largest, gated on
  W08/W16): extract `metaball-program.ts` + `uploadMetaballUniforms.ts`, shrink the renderer to the lifecycle
  orchestrator, preserve the public `useMetaballRenderer` return; `proof:no-god-module` (TS) GREEN +
  `proof:blob-render` (W08/W16's lock) GREEN before+after. Arm B (the dock + DI encapsulation — Moves 2/3/4):
  `useDockState` derived refs → `computed()` + delete `syncDerived()`; `createContext` guard → `=== undefined`;
  excise `useOptionalDockLayerGroupContext` from `dockLayerContext.ts` + the barrel + the README; coordinate
  the `useDockState` reader-compat with W01. Arm C (the sidebar + keyboard re-base — Moves 5/6 + the W20-coord
  detector tidy 7): re-base `useSidebarFollow`/`useScrollTracker` onto `useSpring`/`useRAFLoop` + the listener
  disposer + `cssEscape`; replace the keyboard `Set`+version with a reactive collection; finalize the
  `useGlassRenderer` detector-only shape (coordinate the filter-delete boundary with W20). `vue-tsc` + `npm
  run build` at every interval (the build greens only when the metaball split is wired + the dock return shape
  is compatible).
- **Adversarially-verify (≤1 read-only lane).** Re-runs the six RED witnesses against the patched tree:
  asserts `proof:no-god-module` (TS) reports ZERO `✗ OVER` and the metaball file is < 400 lines + the two new
  leaves are pure (no Vue reactivity import in `metaball-program.ts`/`uploadMetaballUniforms.ts`); asserts
  `useDockState` has ZERO `syncDerived` references + `expanded`/`isPinned` are `computed` (not `ref`); asserts
  `createContext.ts` guards `=== undefined`; asserts `grep -rln useOptionalDockLayerGroupContext src/ demo/`
  returns ZERO (the README ref gone); asserts `useSidebarFollow`/`useScrollTracker` import `useSpring`/
  `useRAFLoop` + call `requestAnimationFrame` ZERO times directly + bind listeners in ONE place; asserts the
  keyboard registry has NO `version.value++` / no `version.value;` fake-read. ADVERSARIAL twists: (a) tries to
  "pass" the metaball split by MOVING the closure verbatim into a sub-file that still captures the lifecycle
  (confirms the two leaves are PURE functions of `(gl, locs, frameState)`, not closures over the renderer
  scope); (b) tries to "pass" the dock fix with `expanded` as a `computed` but `isPinned` left a `ref`
  (confirms BOTH derive); (c) confirms the metaball split is BEHAVIOUR-IDENTICAL — `proof:blob-render` /
  `useMetaballRenderer` return diff is empty (the isomorphism guard — a split that changes a frame is NOT a
  split); (d) confirms W26 did NOT over-reach into W20's filter delete / W01's `useLayerTransition` /
  W08/W16's upload regime (the do-not-double-edit guardrails).
- **Gate-author (≤1 agent — the TS-split driver + the isomorphism lock + re-baseline).** Confirms
  `proof:no-god-module` (TS arm, after W25a's CI re-tag) GREENS on the metaball split (born-RED at HEAD on the
  569-line file → GREEN); authors/confirms the metaball-split ISOMORPHISM assertion (the public
  `useMetaballRenderer` return shape diff is empty + `proof:blob-render` GREEN before+after — a behaviour-lock,
  not a line-count vanity); confirms `vue-tsc`/`npm run build` GREEN (the dangling-export + return-shape
  canaries); records the warn-band FINAL watch-list handoff. Confirms each assertion FAILS at `eaba94f` and
  PASSES on the patched tree.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 5: 3 implement +
1 verify + 1 gate.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):** the wave-agnostic authorization grant is AX.md §6.1 (work AROUND a roadblock with an idiomatic gestalt fix rather than stall; the §6.2 decision tree bounds halt-vs-work-around) — by reference, not restated. This wave's §3a auto-triggers (HALT the failing unit + dispatch the research→plan-augment→redress triumvirate, never stall): an out-of-FileBounds reveal into a sibling wave's territory — any need to touch `useLayerTransition.ts`/`GlassDock.vue` (the morph orchestrator is **W01**'s warn-band split; W26 touches ONLY `useDockState.ts`'s derived-ref encapsulation), DELETE the imperative `createGlassFilter`/`destroyGlassFilter` (that filter dies with GlassPanel under **W20**; W26 finalizes only the DETECTOR-only shape), re-derive the blob per-frame REGIME (uSmoothK/POS_SCALE → **W08**/**W16** own the upload semantics; W26 SPLITS the file preserving behaviour AFTER their rewrites settle), or extend the `.css`-collector/CI re-tag of `proof:no-god-module` (→ **W25a**) — is a scope-reveal → halt + triumvirate, do NOT absorb nor double-edit. Non-local hard-gate failure: if the metaball split does NOT keep `proof:blob-render` / the public `useMetaballRenderer` return-shape diff EMPTY (the isomorphism guard — a split that changes a frame is not a split), halt + triumvirate; if the `useDockState` derived-ref → `computed()` rebase reds a W01 reader-compat assertion non-locally (the morph orchestrator consumes the return shape), escalate to the W01-coordination boundary, NOT a hand-patched return shim. Third diagnostic-loop iteration: if the metaball `metaball-program.ts`/`uploadMetaballUniforms.ts` leaves cannot be made PURE functions of `(gl, locs, frameState)` after three extraction passes (a captured-lifecycle closure keeps re-appearing), dispatch research+plan+redress rather than a fourth move-the-closure attempt. §5.3 / RATIFY-BEFORE-IMPL reaching un-ratified: the metaball-split SEQUENCING vs W08/W16 (the merge order) or the W20↔W26 `useGlassRenderer` delete-vs-keep boundary (Move 7) reaching impl un-ratified → §6.2 Class-3 HALT-AND-RATIFY (do NOT unilaterally delete the imperative filter that W20 owns, nor split the metaball file before W08/W16's upload regime settles — coordinate the boundary).

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gates — born-RED→GREEN.**

1. **`proof:no-god-module` (TS arm) GREEN** — after the metaball split, NO `src/` `.ts`/`.vue` file exceeds
   500 lines (the renderer drops to ~200; `metaball-program.ts`/`uploadMetaballUniforms.ts` each sit well
   under the bound). **Born-RED** at HEAD: `node scripts/proof-no-god-module.mjs` reports the SOLE `✗ OVER` on
   `useMetaballRenderer.ts` (569). GREEN after the split. A build/measurement artefact (the gate reads the
   file tree — the precept-valid form). (W25a owns the gate's CI re-tag; W26 drives the TS arm to GREEN under
   it.)
2. **The metaball-split ISOMORPHISM lock GREEN** — `proof:blob-render` (W08/W16's regression-lock) GREEN
   BEFORE and AFTER the split (the split changes structure, not a frame), AND the `useMetaballRenderer` public
   return-shape diff is empty (a vue-tsc / .d.ts surface-stability check). **Born-RED** would be a split that
   alters a rendered frame or the return surface; GREEN proves the split is pure-structural. A
   runtime/build-diff artefact, NOT a line-count vanity gate.
3. **`vue-tsc --noEmit` GREEN** (the encapsulation canary): after `syncDerived` + the writable refs are
   deleted and `expanded`/`isPinned` become `computed`, the `UseDockStateReturn` typegraph still resolves (a
   `ComputedRef<boolean>` is assignable to the `Ref<boolean>` field); after the `useOptionalDockLayerGroupContext`
   export is removed, NO unresolved import survives; the new metaball leaves type-check. **Born-RED** if a
   return-shape mismatch or a dangling import survives; GREEN after the edits. A build artefact.
4. **`npm run build` GREEN** — the `/goo-blob` subpath chunk + the `/dock`/`/sidebar`/`/keyboard` chunks emit
   unchanged surfaces (the splits/re-bases are internal); the build greens only when every moved symbol is
   wired. A build/deletion artefact.
5. A **STRUCTURAL deletion/derivation PROOF** (valid artefact form, NOT a runtime grep): `grep -c "syncDerived"
   src/components/custom/dock/composables/useDockState.ts` → 0; `grep -c "useOptionalDockLayerGroupContext"
   src/ demo/` → 0; `grep -c "if (!ctx)" src/composables/context/createContext.ts` → 0 (the guard reads
   `=== undefined`); `grep -c "requestAnimationFrame" src/composables/sidebar/useSidebarFollow.ts
   src/composables/sidebar/useScrollTracker.ts` → 0 (the rAF is now `useSpring`/`useRAFLoop`); `grep -c
   "version.value" src/composables/keyboard/useKeyboardShortcuts.ts` → 0 (the counter is a reactive
   collection). These assert SOURCE SHAPE the fix provably eliminates (the precept-valid born-RED for an
   encapsulation wave — the shape IS the defect).

These are build / measurement / build-diff / structural-shape artefacts (the precept-valid forms per
SPEC.md §Hard Gates) — NOT grep-for-source-string-AS-runtime-behaviour gates (the shape-greps assert the
ENCAPSULATION STRUCTURE the fix eliminates, e.g. "`syncDerived` present" IS the hand-sync trap; the
`proof:blob-render` isomorphism lock is the RUNTIME guard that the split changed no frame).

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass, in **light AND dark** at **≥ 3 viewports** (375×667 / 1280×800 / 1440×900), on the
APPEARANCE/INTERACTION axis (NOT a headless proof alone) — the binding "behave IDENTICALLY post-split"
criterion the charter names (line 1374):

- **The blob renders IDENTICALLY post-metaball-split:** the goo-blob surface (body + orbit + satellites +
  smin merge band + lit warm-cream membrane) renders the SAME image after the program-build/upload extraction
  as before — a paired-π BEFORE/AFTER + DELTA capture of the blob region proves zero pixel regression (the
  split is pure-structural). The W08/W16-corrected un-flooded contained droplet is the reference — W26 must
  not re-flood it.
- **The dock collapse/expand reads IDENTICALLY post-computed-derivation:** the dock morphs (collapse ↔ expand,
  pane-switch, keepDockOpen hold) read the SAME after `expanded`/`isPinned` become `computed()` — the
  derivation is behaviour-equivalent to the hand-synced refs, and composes with the W01-rebuilt morph clock
  with no desync (the box does not lead/lag the content because of a stale derived ref). Live-audit a
  collapse-while-switching gesture.
- **The sidebar follow/scroll reads IDENTICALLY post-`useSpring`-rebase:** the sidebar's damped scroll-follow
  reads the SAME approach curve after the hand-rolled damp is replaced by `useSpring` (the same ODE) — the TOC
  follow tracks smoothly, no jump, no double-bound listener leak, no missed cleanup on unmount. Live-audit a
  long-document scroll-follow + a route-change unmount.

**The wave does NOT close on the headless gates alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`) is the binding close criterion. The
BEFORE/AFTER pair is the isomorphism proof: an encapsulation refactor's ONLY visual contract is "nothing
changed" — the DELTA must be EMPTY (the inverse of the visual waves, where the DELTA is the fix). A
non-empty DELTA on any of the three surfaces is a FAILED split (a refactor that changed behaviour is a bug,
not an encapsulation).

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the six RED witnesses against HEAD `eaba94f`
   live + source: `proof:no-god-module` FAILs on `useMetaballRenderer` (569); `useDockState` has 19
   `state.value =` / 13 `syncDerived()` (the incomplete hand-sync); `createContext` guards `if (!ctx)`;
   `useOptionalDockLayerGroupContext` has zero functional consumers; the sidebar hand-rolls rAF + double-binds
   listeners; the keyboard registry bolts a version counter. Record them in `audit/W26-…json` as the born-RED
   baseline. Per §4 note 12 confirm NONE is a publish-currency mirage (all six are HEAD-source). Capture the
   BEFORE-π for the three behavioural surfaces (blob / dock / sidebar).
2. **SPLIT `useMetaballRenderer` (Move 1) — gated on W08/W16.** AFTER the blob-perfection rewrites settle:
   extract `metaball-program.ts` + `uploadMetaballUniforms.ts`, shrink the renderer to the lifecycle
   orchestrator, preserve the public return. `proof:no-god-module` (TS) GREEN + `proof:blob-render` GREEN
   before+after (the isomorphism lock). `vue-tsc` + `npm run build`.
3. **ENCAPSULATE the dock + DI (Moves 2/3/4).** `useDockState` derived refs → `computed()` + delete
   `syncDerived()` (coordinate the reader-compat with W01); `createContext` guard → `=== undefined`; excise
   `useOptionalDockLayerGroupContext` from `dockLayerContext.ts` + the barrel + the README. `vue-tsc` + `npm
   run build`.
4. **RE-BASE the sidebar + keyboard + finalize the glass detector (Moves 5/6/7).** `useSidebarFollow`/
   `useScrollTracker` onto `useSpring`/`useRAFLoop` + the listener disposer + `cssEscape`; the keyboard `Set`+
   version → a reactive collection; finalize the `useGlassRenderer` detector-only shape + chrome-sniff cleanup
   (coordinate the filter-delete boundary with W20 — ratified at wave-open). `vue-tsc` + `npm run build`.
5. **Gates GREEN + the isomorphism close.** Confirm `proof:no-god-module` (TS) GREEN; run the metaball-split
   ISOMORPHISM lock (`proof:blob-render` + return-shape diff); run the structural shape-greps; run the
   VISUAL-TRUTH live audit (blob/dock/sidebar behave IDENTICALLY — the DELTA must be EMPTY); capture the
   paired-π BEFORE/AFTER + DELTA; flag the 17-file warn band to the AX FINAL watch-list; route the value.js
   blob-fork-can-retire NOTE to W34/W35; write `audit/W26-…json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W26-ts-god-module-state.json` — the born-RED→GREEN ledger: the six RED witnesses
  (the 569-line metaball god-module; the dock derived-ref hand-sync 19/13 asymmetry; the `if (!ctx)`
  falsy-coercion guard; the zero-consumer optional-context export; the sidebar hand-rolled rAF + double-bound
  listeners; the keyboard version counter), the per-move (1-7) disposition, the post-wave GREEN measurements
  (the metaball line-count drop + the two pure leaves, `syncDerived` gone + `computed` derivations, the
  `=== undefined` guard, the excised optional export, the `useSpring`/`useRAFLoop` re-base, the reactive
  keyboard collection), the W08/W16/W20/W01 coordination record, and the §4-note-12 verified-against-HEAD
  confirmation.
- The metaball-split ISOMORPHISM proof: `proof:blob-render` GREEN before AND after the split (the same
  rendered frame), the `useMetaballRenderer` public return-shape `.d.ts` diff is EMPTY (pure-structural), and
  `proof:no-god-module` (TS arm) flips FAIL→PASS on the file tree.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the blob region, the dock collapse/expand
  morph, the sidebar scroll-follow — at ≥ 3 viewports × light/dark. **The DELTA must be EMPTY** (an
  encapsulation wave's visual contract is "nothing changed" — the empty DELTA is the proof the refactor is
  behaviour-preserving; a non-empty DELTA is a FAILED split).
- A coordination NOTE annex (routed, NOT executed here): value.js's local goo-blob/metaball fork can retire
  onto the SHAPE-PRESERVED `/goo-blob` surface (routed to W34/W35); the W20 `useGlassRenderer` filter-delete
  boundary (ratified); the 17-file warn-band FINAL watch-list (once the gate scans CSS + runs in CI per W25a).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(encapsulation): W26 born-RED baseline — the 569-line metaball god-module + the dock hand-sync / falsy-guard / speculative-export / sidebar-island / keyboard-counter traps (AX.W26)`
2. `refactor(goo-blob): split useMetaballRenderer into metaball-program + uploadMetaballUniforms leaves — the renderer shrinks to a lifecycle orchestrator, public return unchanged, proof:no-god-module TS arm GREEN (AX.W26 M1)`
3. `refactor(dock): encapsulate the dock derived-state — expanded/isPinned become computed(), delete syncDerived; harden the strict-context guard to === undefined; excise the speculative useOptionalDockLayerGroupContext (AX.W26 M2/M3/M4)`
4. `refactor(state): re-base the sidebar onto useSpring/useRAFLoop + one listener disposer; replace the keyboard Set+version counter with a tracked reactive collection; finalize the glass detector-only shape (AX.W26 M5/M6/M7)`
5. `chore(AX.W26): proof:no-god-module TS arm GREEN + the metaball-split isomorphism lock + the empty-DELTA paired-π regression audit + the warn-band FINAL watch-list`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash
per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W08 (blob core un-flood) — the metaball-split predecessor (charter line 1353).** W08 re-derives the
  uSmoothK/POS_SCALE distance regime in `useMetaballRenderer.ts` (the un-flood + the §4-note-13 POS_SCALE
  disposition). W26 SPLITS the file AFTER W08's regime settles (slice 25 F4 — split the FINAL upload model,
  not mid-churn debris), so the extracted `uploadMetaballUniforms` carries W08's corrected upload math. The
  split must preserve W08's regime byte-for-byte (`proof:blob-render` GREEN before+after).
- **AX.W16 (blob integration/perf) — the metaball-split predecessor (charter line 1353).** W16 restores the
  pause/resume seam + the demand-gate quiescence + the shared-context multi-instance + the one var()-unwrap
  leaf in the renderer. W26 splits AFTER W16's integration settles, so the extracted leaves + the shrunk
  lifecycle orchestrator carry W16's restored seams. (Coordinate so the split does not re-introduce a per-frame
  var() unwrap W16 hoisted.)
- **AX.W20 (primitive fix — GlassPanel retire) — the `useGlassRenderer` filter predecessor (charter line
  1353).** The imperative `createGlassFilter`/`destroyGlassFilter` filter "dies with" the GlassPanel retire
  (slice 28 F1) — W20 deletes the GlassPanel-DEPENDENT filter exports so the build greens with GlassPanel
  gone; W26 finalizes the DETECTOR-ONLY file shape + the `(window as any).chrome`→capability-probe cleanup.
  W26 dependsOn W20 so the filter consumer is gone before W26 carves the detector remainder (RATIFY the exact
  boundary at wave-open — Open Question 4).
- **AX.W00 (π visual-runtime lane) — the close machinery (implicit band precondition).** The "behave
  IDENTICALLY post-split" criterion (charter line 1374) is the W00 π-lane EMPTY-DELTA regression audit (the
  blob/dock/sidebar BEFORE/AFTER must match). W26 cannot close on the structural gates alone — a green
  `proof:no-god-module` over a blob that re-flooded post-split would be exactly the AW cardinal failure (a
  green gate over a visually-changed surface).
- **AX.W25a (CSS god-module gate-extension + CI re-tag) — the gate-bites precondition (coordination, not a
  hard dependsOn).** W25a re-tags `proof:no-god-module` `['local','ci']` so it BITES in CI. W26's metaball
  split is what greens the TS arm under that re-tag (today the gate FAILs but exits-0 local-only). Coordinate
  the order so the gate-extension + the TS-split yield a green intermediate (W25a's born-RED is the 4 CSS
  files; the TS arm is separately red on metaball until W26 splits). NOT in the charter dependsOn (W26's
  charter deps are W08/W16/W20) — this is a same-band sequencing contract.
- **Coordination (disjointness, not blockers):** **AX.W01** consumes `useDockState`'s `expanded`/`visualExpanded`
  in the rebuilt `useLayerTransition` — W26's computed-derivation must compose with W01's morph clock (the
  load-bearing reader-relationship the slice NOTES flag). **AX.W25b** carves the CSS god-modules (file-disjoint
  — `.css` vs `.ts`). **AX.W34/W35** receive the value.js blob-fork-can-retire census (the split preserves the
  public shape).

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`0b27f01`** (AV.W13, the god-module decomposition) — `useMetaballRenderer.ts` was **351 lines** at this
  commit (UNDER the 500-line bound; the AV.W13 "largest now 475" claim was true for TS/Vue at the time). The
  W13 split landed real cohesive sub-modules (aurora.frag 819→348, useSortable, Progress.vue, runtime.ts,
  metaball.frag) — those are NOT re-litigated. The metaball REGROWTH is POST-W13.
- **`d14cd9a` and the W9/W10/W11 goo-blob feature waves** — grew `useMetaballRenderer.ts` from 351 → 569 by
  appending uniforms + their per-frame upload lines to the ONE `drawFrame` closure: W9 (Blinn-Phong spec +
  Fresnel rim), W10 (spring pointer/trail + squash-stretch), W11.a (iridescence + fake-SSS), W11.b (multi-stop
  palette), W11.c (mood-tempo integration). The regrowth shipped UNCHECKED because the gate was `['local']`-only
  and never ran in CI (the W25a fix) — the exact headless-green/structurally-broken gap §13 names, transposed
  to the gate-coverage axis.
- **AV.W14 (the DI factory pair + the motion/dom primitive fold)** — minted `createStrictContext`/
  `createOptionalContext` (the canonical DI pair, slice 28's "exemplary" verdict) AND re-based the motion
  composables onto `useRAFLoop`/`useIntersectionPause`/`useDocumentVisibility`. The fold DID NOT reach the
  sidebar sub-tree (the island, slice 28 F2) — W26 completes AV.W14's fold for sidebar. The strict-guard
  `if (!ctx)` falsy-coercion trap (slice 28 F4) was minted here; the speculative `useOptionalDockLayerGroupContext`
  (slice 28 F3) was exported here "for future consumers" — both are AV.W14 residue the wave closes.
- **J.W5.C (the `isHeld` lift)** — made `useDockState` reactive-derivation-aware; `isHeld` correctly uses
  `computed()`. But `expanded`/`isPinned` PREDATE that and were left as imperatively-mirrored refs (slice 28
  F0) — W26 brings them onto the `computed()` pattern J.W5.C proved in-file.
- **`sortable-list/context.ts`** (the precedent) — deliberately leaves the factory's `useOptional` UNEXPORTED
  ("strict-only, no useOptional shipped — invariant 25 per intent"). The dock-layer context is the ONE site
  that exported the optional shape speculatively; W26 aligns it to the sortable precedent.
- **value.js's local goo-blob/metaball fork** (constellation analysis) — the cross-repo consumer of the blob
  renderer; the W26 split PRESERVES the public `useMetaballRenderer` shape so the fork can retire onto the
  unchanged `/goo-blob` surface (routed to W34/W35).
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline: `proof:no-god-module` FAILs on
  the 569-line metaball file; `useDockState` carries the 19/13 hand-sync asymmetry; `createContext` guards
  `if (!ctx)`; `useOptionalDockLayerGroupContext` is exported with zero functional consumers; the sidebar
  hand-rolls rAF + double-binds listeners; the keyboard registry bolts a version counter. Per §4 note 12, all
  six are HEAD-source defects (NOT publish-currency mirages) — re-prove, then fix.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-J binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **no-god-modules + splits-use-directory-modules (precepts/glossary/meta-terms.md §Fold "the precepts forbid
  god modules regardless of fold pressure"; §0 "no god modules >500 lines split into cohesive sub-modules,
  colocate composables").** `useMetaballRenderer.ts` (569) is the SOLE TS god-module at HEAD — W26 splits it
  BY COHESION (the pure program-build leaf vs the pure per-frame upload vs the lifecycle orchestrator), the
  fold judged by "what does each module own?" not by line count, using the PROVEN house pattern (the
  aurora.frag GLSL-partial + the goo-blob `composables/` precedent — no new abstraction). MUST NOT split by
  arbitrary line-cut (move a verbatim closure into a sub-file that still captures the lifecycle scope — the
  adversarial-verify twist guards this); the two leaves must be PURE functions.
- **no-legacy-code / one-path (precepts/README.md §"No overfitting"; §0 "excise or fail explicitly").** The
  `syncDerived()` hand-sync helper is DELETED (one source of truth — `state` — with pure `computed()`
  projections, not two mirrored writable cells kept coherent by hand); the `version`-counter reactivity hack
  is REPLACED by a tracked reactive collection (the reactivity is intrinsic, not bolted on); the bespoke
  `escapeSelector`/hand-rolled rAF are REPLACED by the shipped primitives (one path — `useSpring`/`useRAFLoop`/
  `cssEscape`, not a sidebar-island re-roll). MUST NOT leave a `@deprecated` `syncDerived` shim or a
  dual-path "computed OR the old ref" toggle.
- **substrate-with-consumer / no-overfitting (precepts/README.md §"Substrate and consumer land together. A
  primitive that is not consumed is unfinished work." + §"No overfitting … needs a current consumer and
  evidence. Otherwise delete it.").** `useOptionalDockLayerGroupContext` is a substrate-without-consumer (zero
  functional consumers, minted "for future consumers") — the wave EXCISES it (the precept-valid disposition),
  aligning to the `sortable-list/context.ts` strict-only precedent. MUST NOT keep the speculative export "in
  case." The metaball split MUST NOT manufacture a new public seam (the two leaves are INTERNAL; the public
  `useMetaballRenderer` surface is unchanged).
- **typed-key + paired DI (AV.W14 — the createStrictContext/createOptionalContext factory; §2b band-J row).**
  The strict-guard `=== undefined` fix HARDENS the canonical DI factory so it is correct for EVERY `T`
  including falsy-valued contexts (the latent-trap excision) — without weakening the strict-throw contract.
  MUST NOT replace the strict throw with a silent default (the throw is the fail-explicit contract); the fix
  is the SENTINEL (`=== undefined` vs falsy coercion), not the throw behaviour.
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation (§0; the two are
  never collapsed).** The encapsulation traps are LIBRARY-INTERNAL correctness gaps (the desync-able derived
  refs, the falsy-coercion guard, the speculative export, the bolted-on counter) — each is fixed at root, not
  silently tolerated. The sidebar's `CSS.escape` SSR-guard + the glass detector's capability probe (replacing
  the `(window as any).chrome` UA sniff) are BEFITTING-SILENT browser-capability detection (feature-detected,
  not a library-internal failure). MUST NOT collapse the two.
- **Gates close on evidence (precepts/README.md line 13; precepts/glossary/meta-terms.md §Hard Gate;
  SPEC.md §Hard Gates lines 104-114 — build/test/runtime/diff/deletion, NOT "grep found a source string for
  runtime behaviour").** The gates are `proof:no-god-module` (a file-tree MEASUREMENT artefact), the
  metaball-split ISOMORPHISM lock (`proof:blob-render` RUNTIME + the `.d.ts` return-shape BUILD-DIFF), `vue-tsc`/
  `npm run build` BUILD canaries, and the structural shape-greps (which assert the ENCAPSULATION STRUCTURE the
  fix eliminates — `syncDerived` present IS the hand-sync trap, the precept-valid born-RED for an encapsulation
  wave). The close is the executed π-lane EMPTY-DELTA live audit (blob/dock/sidebar behave identically), never
  a headless proof alone — the cardinal AX precept.
- **documentation-is-part-of-the-change (precepts/README.md §"documentation is part of the change"; SPEC.md
  line 158).** The dock README `useOptionalDockLayerGroupContext` reference is REMOVED (the dead-symbol doc
  trail); the new metaball leaves carry design-WHY prose (NOT "split at AX.W26" archaeology — the
  greenfield-no-meta mandate W27b enforces, coordinated). MUST NOT leave a doc pointer at the excised export.
- **no-silent-deferrals (SPEC.md §"consumer will be wired later" is NOT a valid gate, line 109).** The value.js
  blob-fork-can-retire census is ROUTED to W34/W35 (named destination), the warn-band is ROUTED to the AX
  FINAL watch-list, the W20 filter-delete boundary is RATIFIED at wave-open — every deferred item carries a
  named destination, no "deferred to next tranche."

---

## Open questions / RATIFY-BEFORE-IMPL

1. **The metaball-split SEQUENCING vs W08/W16 (Move 1 — RATIFY-BEFORE-IMPL the merge order).** W26 dependsOn
   W08 (un-flood) + W16 (integration/perf), both of which REWRITE the renderer's per-frame regime. The split
   must carve the FINAL model (slice 25 F4), not mid-churn debris. **Recommendation: W26's metaball split
   lands AFTER W08+W16 settle**, with `proof:blob-render` GREEN before AND after the split as the isomorphism
   lock. RATIFY that the split preserves W08's POS_SCALE/uSmoothK regime (§4 note 13) + W16's hoisted
   var()-unwrap byte-for-byte — a split that re-floods or re-introduces a per-frame var() is a FAILED split.
2. **The W20↔W26 `useGlassRenderer` delete-vs-keep boundary (Move 7 — RATIFY-BEFORE-IMPL).** W20 RETIRES
   GlassPanel (the sole filter consumer) + deletes the GlassPanel-DEPENDENT filter EXPORTS so the build greens
   with GlassPanel gone; W26 finalizes the DETECTOR-ONLY file shape (`detectTier()`/`tier`) + the chrome-sniff
   cleanup. **Recommendation: W20 owns the FILTER deletion; W26 owns the DETECTOR shape** (W26 dependsOn W20,
   so W20's consumer-retire lands first and W26 carves the remainder). RATIFY the exact boundary at wave-open
   so the file is not double-edited in one merge window (if W20 lands first, W26 just tidies the detector +
   chrome sniff).
3. **The keyboard reactive-collection FORM (Move 6 — RATIFY the idiom).** The `Set`+version-counter can become
   either `shallowRef<Set<…>>` + `triggerRef` on mutation, OR `reactive(new Set())` / `ref(new Map())` keyed by
   the entry. **Recommendation: `shallowRef<Set>` + `triggerRef`** (the minimal, most-explicit invalidation —
   `reactive(new Set())` has deep-reactivity overhead the registry does not need). RATIFY the form so the
   `labeled` computed's dependency is unambiguous and the `version.value;` fake-read is provably gone.
4. **The `useDockState` computed-derivation reader-compat with W01 (Move 2 — RATIFY the dock-band sequencing).**
   The slice NOTES flag `useDockState` as "load-bearing for the §1 dock-animation slice" — W01's rebuilt
   `useLayerTransition` reads `expanded`/`visualExpanded` off `useDockState`. **Recommendation: W26's
   computed-cleanup must land COMPATIBLY with W01's consumption** (the `ComputedRef` is read-compatible with
   the `Ref`-typed field, so the morph clock reads the same value). RATIFY whether W26's `useDockState`
   cleanup lands before or after W01's morph rewrite — both edit DIFFERENT files (W26: `useDockState.ts`; W01:
   `useLayerTransition.ts`/`GlassDock.vue`), so they are file-disjoint, but the reader-relationship must be
   verified live (a desynced derived ref would corrupt W01's morph onset).
5. **The shared `cssEscape` util — NEW LEAF vs platform `CSS.escape` (Move 5 — RATIFY KISS).** The sidebar
   re-base drops the bespoke `escapeSelector`. **Recommendation: prefer the platform `CSS.escape` (SSR-guarded
   once)** over a new `src/utils/cssEscape.ts` leaf UNLESS a second consumer needs it (a new util for one
   consumer is the overfitting the wave is excising). RATIFY whether any other sidebar/tree composable needs
   the escape so the leaf-vs-platform call is made once (KISS — do not mint a util for a single SSR-guard).
