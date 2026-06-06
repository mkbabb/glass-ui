# AV — Progress

## W4 — shadow-contract + Drawer-native(gated) + Card-cartoon + configurator docs

**Status:** DEV-COMPLETE, green. Single-checkout solo execution of the three lanes (A shadow-contract + configurator docs / B Drawer-native CONDITIONAL / C Card-cartoon dark-arm). Two NEW gates green + bite-verified; the Drawer-native lane is formally KEEP-BOOKed (muster UNMET). `typecheck` + `build` both green; no regression. Non-publish-blocking supply IMPL.

### Lane A — shadow-cartoon-lg override contract + proof:shadow-contract (born-GREEN lock)

`--shadow-cartoon-{sm,md,lg}` ships canonical at HEAD; W4 does NOT re-author the value — it DOCUMENTS the consumer-overridable contract + LOCKS the chain. The canonical chain (verified against HEAD; the spec's :563/:568 line refs are pre-W14 drift, the gate matches by TOKEN not line): `tokens.css` raw value (`--shadow-cartoon-lg: -6px 4px 1px color-mix(in srgb, var(--shadow-color) 12%, transparent), …`) + the `--cartoon-shadow-lg` alias → `theme.css` `@theme` bridge (`--shadow-cartoon-lg: var(--cartoon-shadow-lg)`) → `utilities.css` `.shadow-cartoon-lg { box-shadow: var(--shadow-cartoon-lg) }` → `cards.css` `cartoon-surface` hover consumer.

- **`CLAUDE.md`** — new "Cartoon-shadow override contract" subsection under Conventions: glass-ui ships the tokens as its OWN identity; a consumer retints by OVERRIDING the `:root` token (re-resolves every utility + `cartoon-surface` site, zero library edit), NOT by re-declaring a dead local orphan off the cascade (the f-w6-idiom anti-pattern). Names the `.dark` legitimacy (the `--shadow-color: var(--foreground)` flip makes it token-adaptive by construction).
- **`scripts/proof-shadow-contract.mjs`** (NEW, `["local","ci","release"]`) — three asserts: CHAIN-INTACT (4 links), OVERRIDE-RESOLVES (the utility + `cartoon-surface` read `var(--shadow-cartoon-lg)` not a literal — the bite), DARK-ARM-ALLOWED (the `--shadow-color`→`--foreground` indirection is the adaptive seam; the `.dark` re-resolution is allowlisted, not a false-RED). Born-GREEN (the chain ships at HEAD — a contract LOCK, not a born-RED fold). Bite-verified: hardcode the `.shadow-cartoon-lg` utility box-shadow to a literal → RED; delete the `@theme` bridge → RED. Both files byte-restored after each bite. Tally: `docs/tranches/AV/audit/W4-shadow-contract.json`.

**Configurator documentation folds (DOC-ONLY; props already ship at HEAD — no new prop).** `CLAUDE.md` gains a Configurator-contract section naming: the `ConfiguratorLayer` `dividers` prop (per-section hairline; rounding owned at the container-root clip so flush sections keep straight dividers); the `ConfiguratorRow` four-rung density cascade (`mobile`/`compact`/`comfortable`/`spacious`, local-prop-over-inject, the `@container style(--density)` companion); the `useConfiguratorState` `cloneMode` semantics (`commit-on-write` default vs `per-preset`); the per-preset rationale (aurora's preset-as-named-baseline shape preserves slider edits — and hand-authors `DockLayerGroup`+`DockLayer` chrome by DESIGN, not a gap; blob uses commit-on-write). JSDoc: `ConfiguratorLayer.vue` (`dividers` + container-root-clip) and `ConfiguratorRow.vue` (density cascade) already carry complete doc comments at HEAD — verified, no extension needed; `useConfiguratorState.ts` gained an additive "Per-preset rationale" JSDoc block naming the aurora-vs-blob split + the DockLayerGroup design choice. `proof:doc-consistency` stays GREEN (no new `custom/<dir>` citation, no new dep).

### Lane B — GlassNativeDrawer: KEEP-BOOK (muster UNMET)

The native-`<dialog>`-backed bottom-sheet surface is **formally KEEP-BOOKed** — NO file created, NO gate registered. The muster is `mode="live-behind"` FIRM (the vaul-vue drawer, a DISTINCT surface, does NOT count as a native consumer) + a 2nd native consumer. At HEAD the native `<dialog>` family (`GlassDialogNative`) has exactly ONE consumer — `demo/stories/containers/native-top-layer.vue` — so the 2nd-native muster does NOT clear. Shipping `GlassNativeDrawer` now would be substrate-without-consumer (J inv 10). The vaul-vue `mode="live-behind"` drawer is UNCHANGED.

**GlassNativeDrawer KEEP-BOOK — trigger:** a 2nd repo/story needing a native-`<dialog>` bottom sheet distinct from the vaul-vue `mode='live-behind'` path. At HEAD only the live-behind surface musters; the native surface is substrate-without-consumer. The `dialog-native/` family (`GlassDialogNative`) already exists as the compose target if the muster ever clears.

### Lane C — Card surface="cartoon" dark-arm token-adaptive + proof:card-cartoon-consumers

The cartoon dark arm is **token-adaptive BY CONSTRUCTION** — the `cartoon-surface` `@utility` reads ONLY `var(--shadow-cartoon-md)` (rest) + `var(--shadow-cartoon-lg)` (hover), and those tokens ride `color-mix(in srgb, var(--shadow-color) N%, transparent)` where `--shadow-color: var(--foreground)` flips light→dark. **No light literal leaks into the dark arm; no `cards.css` / `tokens.css` edit needed** (audit confirmed token-only; light-arm paint byte-identical to HEAD because nothing changed). `Card.vue`'s `surface === 'cartoon' && 'cartoon-surface'` path carries no inline shadow — no-op, recorded.

- **`tests/components/ui/card/Card.test.ts`** (the W14-relocated path; the spec's `src/.../__tests__/` ref is pre-W14 drift) — ADDED a dark-arm assertion: under a `.dark` ancestor the rendered card keeps the `cartoon-surface` class unchanged (the dark shadow re-resolves via the token chain, not a class swap). 16/16 green (was 15).
- **`scripts/proof-card-cartoon-consumers.mjs`** (NEW, `["local","ci"]`) — the J-inv-10 ≥2-consumer muster (mirrors `proof-au-w9-consumers.mjs`): 2 DISTINCT resolving consumer contexts (`demo/stories/primitives/card.vue` + `tests/components/ui/card/Card.test.ts`). Bite-verified: drop a consumer to <2 → RED. Tally: `docs/tranches/AV/audit/W4-cartoon-consumers.json`.

**Live browser-verify (Playwright @ :5173, `/primitives/card`):** the `.cartoon-surface` card carries the class in BOTH modes; the computed `box-shadow` FLIPS light↔dark — `oklab(0.927 …)`/light-arm vs `color(srgb 0.91 0.906 0.89 …)`/dark-arm (`shadowFlips: true`) — proving the offset stamp re-tints with the scheme through the `--shadow-color`→`--foreground` token chain (this demo drives dark via `color-scheme` + the `light-dark()` `--foreground` arm; the shadow re-resolves either way). The class is identical in both modes — the dark adaptivity is a CSS-token concern, not a class swap.

### Gate registration (manifest==ci)

Both gates registered in `package.json` + `gates.mjs` + `ci.yml`. `npm run gates:verify-ci` GREEN (manifest==ci, 57 gates). The Drawer-native gate is NOT registered (the fold is BOOKed — a born-RED gate against an un-folded file would violate manifest==ci).

| gate | tags | bite |
|---|---|---|
| `proof:shadow-contract` | `["local","ci","release"]` | hardcode `.shadow-cartoon-lg` utility to a literal → RED; delete `@theme` bridge → RED |
| `proof:card-cartoon-consumers` | `["local","ci"]` | drop a consumer to <2 → RED |

### Verification

- `npm run typecheck` — **GREEN** (`vue-tsc --noEmit`; the configurator JSDoc edit does not perturb the typed surface).
- `npm run build` — **GREEN** (both arms; exit 0; the flatten-subpath-types arm completes).
- `npm run proof:shadow-contract` — **GREEN** + bite-verified. `npm run proof:card-cartoon-consumers` — **GREEN** + bite-verified.
- `npm run proof:doc-consistency` — **GREEN** (CLAUDE.md edits add no dangling `custom/<dir>` / dep citation).
- No-regression spot matrix — `proof:theme`, `proof:components-css`, `proof:tailwind-v4-idiom`, `proof:liquid-glass-tokens` all GREEN; the Card unit suite 16/16 green.

## W5 — the L-Rε hygiene transpositions (KISS, public API byte-unchanged)

**Status:** DEV-COMPLETE, green. Single-checkout solo execution of the five lanes (A subpath-collapse / B composable-restructure / C dock-factory / D types-ownership / E goo-blob easing). Two NEW born-RED gates (`proof:subpath-enumeration` + `proof:no-orphan-composable`) green + bite-verified; `typecheck` + `build` both green; the public surface is BYTE-UNCHANGED. Non-publish-blocking REFACTOR.

### What landed (five lanes)

**Lane A — subpath-barrel collapse + vite batch-resolve.** The 58 TRIVIAL one-line subpath barrels (each `export * from "./components/<…>"` or `"./composables/<…>"`) moved from `src/<name>.ts` → `src/subpaths/<name>.ts` (relative paths undeepened `./` → `../`). `vite.library.ts` replaced its 58 hand-listed `resolve(rootDir, "src/<name>.ts")` entries with a programmatic glob over `src/subpaths/*.ts`, MERGED with the 11 explicit curated entries (index/api/tokens/forms/dark/keyboard/carousel/motion/motion-core/sidebar/infinite-scroll). The merged `libraryEntries()` key set is name-for-name identical to HEAD (69 entries; `vite.library.ts` −63 lines). The 10 multi-line curated barrels + `api/index.ts` STAY at `src/` top level (SCC-aware curation, not a mirror line). Clean break — no re-export shim at the old `src/<name>.ts` path; the 40 demo + test call sites that imported via `../src/<name>` repointed to `../src/subpaths/<name>`.

**dts-flatten seam.** The dts emit mirrors the SOURCE tree (`tsconfig.build.json` `rootDir: src` + `include: src/`), so the moved barrels' declarations landed at `dist/subpaths/<name>.d.ts` — but `package.json` `types`/`typesVersions` publishes the FLAT `dist/<name>.d.ts`. New `scripts/flatten-subpath-types.mjs` (chained into `emit-types`) moves each `dist/subpaths/<name>.d.ts` → `dist/<name>.d.ts` and undeepens its single re-export (`from "../…"` → `from "./…"`), restoring the byte-identical flat publication. The 68-file dist `.d.ts` set is identical to HEAD.

**Lane B — composable sub-tree structure-lock.** `platform/` NOT extracted: `isMac` is SINGLE-CONSUMER (used only inside `composables/keyboard/useKeyboardShortcuts.ts`); J inv 10 forbids a one-consumer sub-tree. `proof:no-orphan-composable` locks the structure (10 named sub-trees incl. `context/` from AV.W14; only `index.ts` loose). 0 source lines changed.

**Lane C — dock-factory: SUPERSEDED by AV.W14.** The dock DI boilerplate already collapsed onto the canonical `createStrictContext<T>()` (`src/composables/context/createContext.ts`) at AV.W14 — byte-for-byte the `{KEY, provide, use, useOptional}` quadruple W5 specified, with the −30-40 LOC already realized across `dockContext.ts` + `dockLayerContext.ts`. PROGRESS.md W14 Lane A records this explicitly ("it subsumes the planned dock factory"). Creating a parallel `createDockContext.ts` would duplicate the abstraction + violate `proof:di-consistency`; the spec's `__tests__/createDockContext.test-d.ts` is also moot under `proof:no-test-in-src` (the dock context type fixture lives at `tests/components/custom/dock/dockLayerContext.readonly.test-d.ts`). BOOKed — KISS + no-duplication. 0 source lines changed.

**Lane D — types-ownership audit (verdicts).** `src/composables/sidebar/types.ts` — CANONICAL (AI.W5-δ relocation; `/sidebar` subpath `src/sidebar.ts` barrels from `composables/sidebar`). `src/components/custom/infinite-scroll/composables/types.ts` — CANONICAL (co-located with the `useInfiniteScroll` composable-of-record). Both no-op; no hoist. 0 source lines changed.

**Lane E — goo-blob easing-module fold (D7).** The three hand-rolled quadratic helpers — `easeInOut` (`useBlobMood.ts:97`) + `easeIn`/`easeOut` (`useBlobSatellites.ts:18-24`) — extracted VERBATIM into `src/components/custom/goo-blob/composables/easing.ts` and re-imported. The distinct cubic smoothstep (`useBlobSatellites.ts` `bt*bt*(3-2*bt)`) stays inline (KISS, not one of the three quadratics). PRIVATE to `/goo-blob` (not re-exported from `goo-blob/index.ts`, not on `/api`). Runtime byte-identical — `proof:blob-color-equivalence` 8/8 green; the `dist/goo-blob.js` chunk CONTENT changes (de-dup) but the export SURFACE is unchanged.

**Deferred — `useReducedMotionToggle()` hoist.** DEFERRED to AV.W7 G1's `useWebGLCanvas` substrate-level lift (the PRIMARY freeze home). W5 does not speculatively hoist a composable W7 G1 would subsume.

### Public-surface byte-stability (CARDINAL invariant)

- The 67 named publication chunks (`dist/<subpath>.js`) byte-identical name set; all chunk basenames (content-hash stripped) identical — only the shared-leaf content-hash suffixes changed (the expected cascade from Lane E's goo-blob content change). The 68-file dist `.d.ts` set identical.
- `npm run verify-export-types` GREEN. `npm run proof:package` GREEN. `package.json` exports byte-unchanged (the `import` keys point at `dist/<name>.js`, unaffected by the source move).

### Gates

- `proof:subpath-enumeration` (NEW, `["local","ci","release"]`) — exports↔dist↔libraryEntries surface-invariance (ENUM-COMPLETE + NO-ORPHAN-CHUNK + BATCH-EQUIV). Born-RED → GREEN; bite-verified (drop `dist/dock.js`/`src/subpaths/dock.ts` while leaving `./dock` export → RED).
- `proof:no-orphan-composable` (NEW, `["local","ci"]`) — composables sub-tree structure-lock. GREEN at HEAD; bite-verified (loose `useFoo.ts` → RED).
- Registered in `package.json` + `gates.mjs` + `ci.yml`; `node scripts/gates.mjs --verify-ci` GREEN (manifest==ci, 54 gates).
- No-regression: `proof:di-consistency`, `proof:no-test-in-src`, `proof:vueuse-free-root`, `proof:blob-value-free`, `proof:no-value-default`, `proof:doc-consistency` — all GREEN. `proof:resolution` RED is sibling-only (value.js + bbnf-lang pre-existing cross-repo state, staged-green per contract-v2; zero glass-ui files implicated) — NOT a W5 regression.
- `npm run typecheck` GREEN. `npm run build` GREEN. The goo-blob unit suite GREEN (8/8); the 3 rewritten-import test files GREEN (273/273).

### LOC delta

Recorded in `docs/tranches/AV/audit/W5-loc-delta.json`. Dominant: 58 barrels moved (0 net LOC — relocated + paths undeepened); `vite.library.ts` −63; goo-blob net ~+16 (one 24-line module incl. doc comment, −10 inline call-site lines, +2 import lines). Lanes B/C/D: 0 source lines.

## W7 — SOTA perf: offscreen-pause + containment + on-demand will-change + budget caps

**Status:** DEV-COMPLETE, green. Single-checkout solo execution of the three lanes (A substrate / B css-budget / C dock-motion). The NEW born-RED gate `proof:offscreen-pause` is green + bite-verified; `typecheck` + `build` both green; the existing gate matrix shows no regression. Non-publish-blocking.

### What landed (the perf folds)

**Lane A — substrate offscreen-park (F1/F4) + the G1 PRM-freeze lift.** `useWebGLCanvas.ts` now gates its EXISTING `shouldContinue()`/`armed`/`isRunning()` machinery on the VISIBILITY + reduced-motion state (the gestalt — it adds the CONDITION to the park seam, never a parallel loop):

- **F1 content-visibility park.** A `contentvisibilityautostatechange` listener binds to the canvas's host (`canvas.parentElement`) at `arm()`. On `event.skipped === true` (the host is content-skipped — scrolled offscreen / display-locked) → `suspend("off-screen")`; on `false` → `resume("off-screen")`. The host carries `content-visibility:auto` (Lane B). The `ContentVisibilityAutoStateChangeEvent` interface declares the one un-typed `skipped` field.
- **F4 tab + IO.** The tab-visibility owner parks on `document.hidden` (kept; now also seeds `tab-hidden` if constructed in a backgrounded tab). The IntersectionObserver `rootMargin:200px` fallback is the consumer's `useIntersectionPause` off-screen seam — aurora already wired it via `useAurora`; goo-blob NOW wires it in `useMetaballRenderer` (`pauseWhenHidden:false` so the substrate stays the sole `tab-hidden` writer). All three (F1, tab, IO) drive the SAME `off-screen`/`tab-hidden` reasons — ORed park conditions on one `isRunning()` set.
- **G1 PRM-freeze lift + LIVE re-monitor.** The reduced-motion freeze is LIFTED out of the two consumers (which read `matchMedia` ONCE at init and never re-monitored) into the substrate, which installs a `matchMedia("(prefers-reduced-motion: reduce)")` `change` listener driving a `reducedMotion` ref. The `tick()` reschedule gate (`!reducedMotion && hooks.shouldContinue()`) draws ONE static frame then parks under reduce — it gates the RESCHEDULE, NOT the suspend set, so an on-screen reduced surface never blanks (the §3a ordering caveat). On un-reduce the loop re-arms from a fresh clock (no jump). The handle exposes `readonly reducedMotion` — aurora reads it for its frozen-t; goo-blob dropped its init-once `prefersReducedMotion` and its `shouldContinue` is now motion-only. `respectReducedMotion` option defaults `true` for live / `false` for capture. Every future AV surface on the substrate inherits the frozen-one-static-frame guarantee + the live re-monitor for free.

**Lane B — containment + blur-budget + budget tokens (F2/F6).**

- **F2 contain.** `Aurora.vue` `.aurora-root` → `contain: content` + `content-visibility:auto` + `contain-intrinsic-size:auto none` (full paint/layout containment — the aurora canvas does not overflow). `GooBlob.vue` `.goo-blob-wrapper` → `contain: layout style` (NO paint — the 160% canvas satellites intentionally overflow; paint containment would clip them on-screen) + `content-visibility:auto` (which applies its own containment ONLY while skipped/offscreen-invisible, so on-screen overflow is preserved) + `contain-intrinsic-size:auto none`.
- **F2 blur clamp.** `--glass-blur-overlay-radius` clamped **24px → 15px** (the ONE out-of-band token; the wash/quiet/resting 1/10/12 are in-band, floating 16px is the design ceiling at the band edge — LEFT). The richer 24px is RESTORED via a `@media (min-resolution: 2dppx)` `:root` arm (the cost is amortised by the denser backing store). Token-only override; every overlay surface inherits it.
- **F6 DPR-max + budget caps.** New `aurora/constants/budget.ts`: `AV_DPR_MAX = 2` (the formerly-magic `Math.min(dpr, 2)` literal in BOTH aurora + goo-blob `resize()` — now `resolveBudgetDpr()`), plus the budget caps `AV_MAX_BLOBS = 3`, `AV_MAX_COLORS = 4`, `AV_LOOP_DURATION_{MIN,MAX}_S = 8/15`, and a `clampBudget()` helper. Pure-numeric, value.js-free (goo-blob cross-imports it without breaking `proof:blob-value-free`).

**Lane C — on-demand will-change (F3) + inheritance-bomb guard (F5) + the G2 pause toggle.**

- **F3 will-change lifecycle.** `useLayerTransition.ts` sets `will-change:<dim>` (`width`/`height` per axis) on the morphing `.dock-layer-stack` ONLY for the gesture's duration — just before `spring.play()`, cleared to `auto` on the spring SETTLE callback (after the final paint, so it never races the last frame / flashes) AND on the cleanup-timer + `transitionend` + the `< 0.5px` no-op early-return. NEVER standing. (The standing `will-change:transform` on `GooBlob.vue:139` is a DIFFERENT surface — always-animating ambient WebGL canvas, where a standing hint is defensible; recorded as the deliberate distinction.)
- **F5 inheritance-bomb guard (convention + browser-verify).** The dock driver animates ONLY the element's own `width`/`height` (the spring's pixel value) + pane opacity (a class-driven CSS transition on the SEPARATE `.dock-layer-item-host`). NO inherited custom property (`--phase-color`/`--shadow-color`) is TWEENED per frame — they are SET on discrete state change. Recorded as a binding convention in the composable header.
- **G2 WCAG-2.2.2 Level-A pause/play toggle.** New `DockBackgroundToggle.vue` (exported from `@mkbabb/glass-ui/dock`): a thin `v-model:paused` `<DockIconButton>` host reflecting state via `aria-pressed` + a Pause↔Play glyph + label swap, available to ALL users (NOT gated behind reduced-motion). KISS — it binds the EXISTING renderer seam: the consumer wires `update:paused` → the renderer's `pause()`/`resume()` (goo-blob already exposes both; no parallel pause path added). 4 a11y unit tests (the rendered aria contract + the renderer-binding wiring).

### Verification

- **`proof:offscreen-pause`** (born-RED): GREEN + bite-verified — strip `contentvisibilityautostatechange` from the substrate → RED (the headline bite). Registered `["local","ci"]` in `package.json` + `gates.mjs` + `ci.yml`; `gates:verify-ci` GREEN (manifest==ci, 52 gates). Artefact: `.cache/gates/AV-offscreen-pause.json`. The gate is a SEAM assertion (reads the visibility/PRM state statically — not a flaky headless-frame gate, per the §3a redress clause).
- **Live (Playwright @ :5173):**
  - **F1 offscreen-park** — instrumenting global rAF over 300ms windows on the goo-blob story (5 blob loops): **running 252 → content-skipped 144 → un-skipped 252**. The ~108-frame drop is the 5 substrate loops parking on the synthetic `contentvisibilityautostatechange{skipped:true}`, resuming on `{skipped:false}`. The RAF parks when content-hidden and re-arms.
  - **G1 reduced-motion live re-monitor** — `page.emulateMedia({reducedMotion})` toggled AT RUNTIME (firing the substrate's real `MediaQueryList` change listener): **full 259 → reduce 144 → full 259**. goo-blob (NOT just aurora) freezes/wakes — proving the substrate seam re-monitors and the consumers inherit it. The on-screen reduced surface draws one static frame (never blanks).
  - **F2/F6 host attrs** — `.goo-blob-wrapper`: `contain:layout style`, `content-visibility:auto`, `contain-intrinsic-size:auto none`; canvas backing store 882×882 at `dpr=2` (the `AV_DPR_MAX` clamp holds on a 2× display). The clamped `--glass-blur-overlay-radius:15px` + the `@media (min-resolution:2dppx){:root{…:24px}}` restore both verified in `dist/styles/tokens.css`.
  - **F3 will-change** — at IDLE, EVERY dock-layer element reads `will-change:auto` with no inline hint (the never-standing rule, observed across all `.glass-dock`/`.dock-layer-*` on the dock-layers story). The set-during-morph lives in the FLIP fallback path (Chromium takes the native View-Transitions path, which owns the morph itself — the lifecycle correctly applies only where the JS spring drives size).
  - **G2 toggle** — 4 unit tests green (aria-pressed reflects paused, glyph/label swap, click emits the v-model, the canonical consumer wiring drives `renderer.pause()`/`resume()`). The Level-A conformance evidence.
- **No-regression matrix** — `proof:aurora-space-gamma`, `proof:blob-space-gamma`, `proof:shader-shared-source`, `proof:webgl-substrate-single`, `proof:blob-value-free`, `proof:motion-value-free`, `proof:dock-opacity-lockstep`, `proof:dock-motion-parity`, `proof:dock-motion-single-source`, `proof:dock-a11y-contract`, `proof:dock-css-split`, `proof:dock-vocabulary`, `proof:vt-names`, `proof:vueuse-free-root`, `proof:design-idiom-localization`, `proof:tailwind-v4-idiom`, `proof:liquid-glass-tokens`, `proof:theme`, `proof:components-css`, `proof:di-consistency`, `proof:no-god-module`, `proof:fail-explicit`, `proof:strict-templates` — all GREEN. `proof:resolution` RED is sibling-only (value.js/bbnf-lang cross-repo state, staged-green per contract-v2); glass-ui exports resolve.
- **`npm run typecheck`** — GREEN. **`npm run build`** — GREEN (both arms; the clamped blur band emits in `dist/styles/tokens.css`). **`npm run test`** — GREEN (696/696, +5 from W7: 4 G2 a11y + 1 public-surface DockBackgroundToggle).

### DEFER register (KISS — adopt only the crosswalk's ADOPT marks)

- **OffscreenCanvas + Worker** — DEFER. Trigger: a profiled LoAF `duration`/`blockingDuration` regression that traces to the aurora/blob RAF (main-thread contention). Worker-message plumbing for no win until the thread is actually contended.
- **F7 — LoAF `PerformanceObserver` frame-budget gate** — DEFER (as a GATE). The ≤16.7ms-tick technique is sound but a deterministic assertion needs a stable headless-RAF harness CI does not provide (the `proof:webgl-golden` keep-book class). Trigger: a stable headless frame-timing runner lands. `proof:offscreen-pause` is the shippable substitute.
- **WebGPU render path** — DEFER. WebGL2 stays the substrate; `navigator.gpu`-detection enhancement only (Limited, not Baseline).

## W8 — useCanvas2D + Constellation primitive (the SOTA D1+E1 headline) — **GATED-NOT-LANDED**

**Status:** GATED-NOT-LANDED (CONDITIONAL authoring; the §3.5 GATE branch taken). NO `src/` artefact created, NO gate registered, NO `package.json`/`vite.library.ts`/`CLAUDE.md` structure edit. `typecheck` + `build` baseline-green and untouched (no delta — the wave wrote only this KEEP-BOOK record). The SOTA crosswalk RESOLVED the technique question; the wave gates on the MUSTER, not the technique.

### The §3.5 LAND-vs-GATE verdict (taken at HEAD)

The visual-load-bearing precept (J inv 10) requires **≥2 DISTINCT resolving-at-HEAD consumers** before the `useCanvas2D` substrate + the `Constellation` primitive may ship. The muster taken at HEAD:

| candidate consumer | resolves at HEAD? | counts? |
|---|---|---|
| **Slides til-briefing constellation** (`/Users/mkbabb/Programming/slides/src/decks/til-briefing/constellation.ts`, 488 lines) | **NO — cross-repo PENDING.** It runs its OWN `requestAnimationFrame` (`:457,460`) today; the **slides G.W2 swap** (constellation RAF-park → `useRAFLoop`/`useIntersectionPause` + reduced-motion seam) is the PREP that makes it a glass-ui-substrate consumer. That swap is a SLIDES G-tranche deliverable gated on the glass-ui 3.3.0 publish hinge E1 — it resolves at HEAD only AFTER the slides fork lands. | **NO** (per the `proof:au-w9-consumers` resolve-at-HEAD rule — a pending cross-repo adoption does not count) |
| **A glass-ui demo story** (`demo/stories/.../constellation.vue`) | YES if authored | would be **consumer #1** |
| **A 2nd genuine in-repo glass-ui Canvas2D surface** | **NO — none exists at HEAD.** Grep confirms zero Canvas2D *animation* surface in `src/`/`demo/` (`useGlassRenderer.ts`'s two `getContext("2d")` calls are a STATIC blur-mask helper, not an animated constellation-class consumer; `scripts/constellation.mjs` is the cross-repo SIBLING-REPO membership table — an unrelated sense of "constellation"). | **NO** |

**Verdict: only ONE resolving-at-HEAD consumer can be mustered (the demo story alone). → GATED-NOT-LANDED.**

Manufacturing a SECOND speculative demo route purely to clear the count is the §3a over-fit trap, called out verbatim in the wave spec: "forcing a second SPECULATIVE demo route to clear the count is overfitting (a demo built only to satisfy the gate is not a genuine consumer context). The redress is to GATE-NOT-LAND (per §3.5), a scope decision, not a local edit." A demo built only to satisfy the gate is not a genuine consumer context — so I did NOT author one. No `src/` file, no demo story, no subpath, no gate.

### KEEP-BOOK record

**`useCanvas2D` + `Constellation` GATED — trigger:** the slides **G.W2** constellation-RAF-park swap lands (making the slides til-briefing constellation a resolving glass-ui-substrate consumer) OR a second in-repo glass-ui Canvas2D surface musters. At HEAD the demo story is the SOLE resolving consumer; the substrate is substrate-without-2nd-consumer (J inv 10). The SOTA D1/E1 RESOLVES the prior `useCanvas2D` BOOK (AV.md §3.3) to ADOPT-gated — **the gate is the MUSTER, not the technique.** Canvas2D IS the correct substrate (E1, below the WebGL crossover); the constellation IS the named headline procedural deliverable (D1); the D2 draw discipline (polyline batching, NO `shadowBlur` / pre-rendered glow sprite, floored coords, never `getImageData`) is the authored spec — all settled. Only the 2nd-consumer count is open.

**When the trigger clears (the LAND path, fully specified — execute without re-deriving):**

- `src/composables/glass/canvas2d/useCanvas2D.ts` (+ `canvas2d/index.ts` + the `glass/index.ts` re-export) — the Canvas2D lifecycle substrate SIBLING to `useWebGLCanvas` (do NOT fork or touch the WebGL substrate): acquire `getContext("2d", { willReadFrequently: false })` (the E4 guardrail — any pixel readback is isolated to a separate `willReadFrequently` canvas off the animation path), DPR-aware `ResizeObserver` sizing clamped via the AV.W7 F6 `resolveBudgetDpr()`/`AV_DPR_MAX=2` idiom, the RAF arm COMPOSED from `useRAFLoop` (the shared clock — never re-roll `requestAnimationFrame`) gated by `useIntersectionPause({ rootMargin: "200px" })` (the offscreen/tab park — the SAME discipline AV.W7 lands on the WebGL substrate), plus the reduced-motion one-static-frame seam (the G1 floor for Canvas2D too).
- `src/components/custom/constellation/` (`Constellation.vue` + `composables/useConstellation.ts` + `index.ts`) — the proximity-graph node lattice ON `useCanvas2D`: nodes `(x,y,vx,vy,r)` drift on constant velocity (or fbm/domain-warp drift IFF the AV.W2 shared-noise leaf is available), bounce off bounds, joined by a distance-falloff hairline within `link` px; a SPATIAL-BIN grid (uniform-grid / spatial-hash) for the O(n) neighbor query; an OPTIONAL Verlet settle (opt-in `settle` prop, off by default). The GENERIC lattice ships WITHOUT the slides red ANOMALY skin — the anomaly is a consumer overlay/slot (the slides-side `drawAnomaly` FOLD-G extract), never baked into the primitive. Tokens (`count`/`link`/`speed`/node-color/line-color) consumer-overridable via the `readVar` idiom.
- `src/constellation.ts` subpath barrel + the `vite.library.ts` `constellation` entry + the `./constellation` `package.json` export (subpath-only — a Canvas2D background is not a root-barrel cherry-pick; mirrors `/aurora`, `/goo-blob`).
- `demo/stories/.../constellation.vue` (the in-repo resolving consumer) + `manifest.ts` route.
- `scripts/proof-canvas2d-substrate-consumer.mjs` (the consumer-tally gate, house template `proof-au-w9-consumers.mjs`: injected path-resolver, BOOK-exclusion, byte-stable JSON via `gate-output.mjs`, pure `detectConsumers` detector, `process.exit(1)` on any <2 or unresolved) + register in `package.json` + `gates.mjs` + `ci.yml` — **ONLY when the wave LANDS** (manifest==ci forbids a born-RED gate against an un-landed substrate; that is why no gate is registered now).
- `CLAUDE.md` Structure-block lines (the `canvas2d/` sub-tree + the `constellation/` custom dir + the `/constellation` subpath).

### SOTA §3.3-BOOK resolution recorded

The prior **AV.md §3.3** `useCanvas2D` KEEP-BOOK ("a 2nd Canvas2D consumer; Canvas2D ≠ the WebGL substrate; single-consumer slides-local") is RESOLVED by the SOTA crosswalk D1/E1 to **FOLD-AV-IFF-muster** — already recorded at `AV.md:261` ("RESOLVED by the SOTA crosswalk (D1/E1) → FOLD-AV AV.W8 (ADOPT-gated)"). The BOOK moved from "technique unproven" to "ADOPT-gated-on-muster." This wave confirms the muster is UNMET at HEAD (1 resolving consumer) and re-books with the slides G.W2 swap named as the 2nd-consumer trigger. The `AV.md:270` `KEEP-BOOK-G` ledger line (`useCanvas2D` 2nd-consumer gate) stands.

### Verification (GATED case — no build/typecheck delta)

- `npm run typecheck` — **GREEN** (baseline; the wave wrote only this `PROGRESS.md` KEEP-BOOK record — zero `src/` delta).
- `npm run build` — **GREEN** (baseline; no `vite.library.ts`/`package.json` entry added — `dist/constellation.js` is correctly ABSENT until the LAND path executes).
- `proof:canvas2d-substrate-consumer` — **NOT registered** (the GATED branch per §6.3: a born-RED gate against an un-landed substrate violates manifest==ci). No `gates.mjs`/`package.json`/`ci.yml` edit. The existing gate matrix (`proof:webgl-substrate-single` — the WebGL substrate is UNCHANGED; `proof:vueuse-free-root`; `proof:package`; `proof:subpath-enumeration`) stays GREEN by construction (zero surface change).
- The draw-discipline + O(n) spatial-bin verifies are SPEC-level (the LAND-path mechanism above), not runtime — no draw loop exists to grep at HEAD (the GATED case ships no `src/` file).

## W14 — DI + service-boundaries + pipeline-orchestration + hygiene

**Status:** DEV-COMPLETE, green. All five lanes landed in one checkout (single-agent execution); the four NEW gates are born-RED → green + bite-verified; the public surface is byte-unchanged.

### What landed (five lanes)

**Lane A — canonical DI factory pair.** `src/composables/context/createContext.ts` ships `createStrictContext<T>(label, outsideError)` (provide + strict-throw `use` + a befitting-silent `useOptional` over the SAME key) and `createOptionalContext<T>(label)` (provide + silent `use`). The SIX hand-rolled context triplets collapse onto it; each call site keeps only its `interface` + label + (strict) error message. W5's dock-only `createDockContext<T>()` did NOT land at HEAD, so Lane A authored the canonical pair directly (it subsumes the planned dock factory). The named export surface of every context module is byte-identical (`provideDockContext`/`useDockContext`/`useOptionalDockContext`, `TOGGLE_GROUP_KEY`, `SORTABLE_CONTEXT`, …) — the helpers are now thin re-binds of the factory's returned methods. `proof:di-consistency` green + bite-verified.

#### DI strict-vs-optional matrix

| context module | shape | rationale |
|---|---|---|
| `dock/composables/dockContext.ts` | strict + optional | strict for descendants; `useOptionalDockContext` for `<Slider>`/popovers that may sit outside a dock (one key, two `use` shapes) |
| `dock/composables/dockLayerContext.ts` | strict + optional | strict for `<DockLayer>`; optional reserved |
| `ui/toggle-group/toggleGroupContext.ts` | optional | `<ToggleGroupItem>` can render bare — optional-only (no strict counterpart minted) |
| `custom/sortable-list/context.ts` | strict | `<SortableItem>` outside a `<SortableList>` is meaningless — strict-only, no `useOptional` exported (invariant 25 "per intent") |
| `custom/glyph-face/keys.ts` | optional | `<DiscoGlyph>` standing alone is first-class — optional-only |
| `custom/configurator/density.ts` | optional | `<ConfiguratorRow>` falls through to undefined density — optional-only |
| `custom/goo-blob/types.ts` (`BLOB_CONFIG_KEY`) | di-default (NOT minted) | bare external-provide key read via `inject(KEY, null)`; not a strict-or-optional triplet — carries a `// di-default:` sentinel, allowlisted (KISS, no forced ceremony) |

**The `ColorResolver` service-boundary exemplar (KEEP + document).** The `/color` leaf's injected `ColorResolver` (`defaultBlobColorResolver` + the goo-blob required-prop loud-throw, DEC-AT-2) is the reference explicit-DI pattern — no code change. See the render-loop note below.

**Lane B — nested-import hoist ledger.** At HEAD the runtime nested-`import()` count is ZERO (no true dynamic-import nesting). The one type-position finding — `useSidebarState.ts:46` `import("vue").ComputedRef<…>` — is hoisted to a top-level `import type { ComputedRef } from "vue"`. `proof:no-nested-import` is a STRUCTURE-LOCK keeping the count zero, exempting any line carrying a `// lazy-boundary:` sentinel (the keyframes `loadAnimationEngine()` HEAVY-tier seam shape — not present at HEAD, named for when the lazy split lands). Green + bite-verified (nested `await import` without sentinel → RED; with it → green; type-position → RED).

#### Hoist ledger

| finding | verdict | note |
|---|---|---|
| `useSidebarState.ts:46` `import("vue").ComputedRef<string \| null>` | HOIST | normalized to top-level `import type { ComputedRef }` |
| keyframes `loadAnimationEngine()` HEAVY-tier `await import()` | KEEP-ALLOWLIST | the befitting value.js-free lazy split (the heavy-surface lazy seam); not present as a runtime nested import at HEAD — the sentinel allowlist is ready for when it lands |
| (all other `src/` function bodies) | n/a | zero runtime nested imports at HEAD |

**Lane C — test-in-src relocation.** All 60 `*.test.ts` + 1 `*.test-d.ts` + the `metaball-color.glsl-port.ts` fixture relocated from 27 in-src `__tests__/` dirs to a top-level `tests/` tree mirroring `src/`. Relative imports route through `../…/src/<P>/…` (the `@/*` alias was retired in v0.8.2 — the repo uses relative imports; CLAUDE.md's stale `@/*` claim is corrected). The fixture rides with its tests. Two `instrument-chassis` tests' `__dirname`-relative `readFileSync` paths were re-rooted through `src/` (the only non-import filesystem reads). `vitest.config.ts` globs `tests/**` + `scripts/**` (the `src/**` patterns dropped). NO test logic changed. The full vitest suite is GREEN from `tests/` (71 files / 690 tests). `proof:no-test-in-src` green + bite-verified.

**Lane D — pipeline orchestration.** `proof:spring-tokens-synced` (`["local","ci","release"]`) guards the external build-pipeline mutation point: `regen-spring-tokens.mjs` mutates `tokens.css` in place but is NOT in `npm run build`, so a dev could ship a drifted `--spring-*` block. The gate imports the generator's now-exported pure `generateBlock()` (the generator's `main()` is guarded to run only when invoked directly) and diffs against the committed block. At HEAD the block is in sync (NO drift — no triumvirate needed). Green + bite-verified (drift one `--spring-*` value → RED; re-run generator + commit → green).

#### Render-loop service-boundary note (the three consistent seams)

The WebGL substrate render loop is orchestrated by THREE injected/composed seams — never an inline coupling:

- **SUBSTRATE** — `useWebGLCanvas` (`composables/glass/webgl/`) owns the RAF lifecycle + the `armed`/`shouldContinue` + the 3-reason suspend `Set` (`tab-hidden`/`off-screen`/`manual`). It is the ONE `visibilitychange` owner for the GPU surface; the aurora `runtime.ts` and the goo-blob `useMetaballRenderer.ts` COMPOSE it (they do not re-bootstrap WebGL2). The shared `compile.ts` (AV.W14) is the one error-checked program-build path both splice.
- **COLOR** — the injected `ColorResolver` (`/color`: `defaultBlobColorResolver`, the goo-blob required-prop loud-throw per DEC-AT-2). The shader runtime receives gamma-sRGB color from this boundary, never reaching into value.js itself (`proof:blob-value-free`). This is the Lane A injected-DI exemplar.
- **MOTION** — the keyframes LIGHT driver seam (`SpringProgress`, the `/motion`-core leaves). The dock layer transition and the spring tokens (`--spring-*`, Lane D's gate) read this curve; the engine stays the LIGHT tier (`proof:motion-value-free`).

Each boundary is an injected (color) or composed (substrate, motion) seam, so the orchestration is consistent. W2/W7 implement the behavior; W14 only names the seam shape (no code change).

**Lane E — library-internal DRY de-dup.**

- **PRNG single-source.** `mulberry32` + `hashString` (byte-identical across two dirs) extracted to `src/utils/prng.ts`. `goo-blob/composables/prng.ts` was deleted (its sole consumer `useBlobSatellites.ts` imports the shared leaf directly); `watercolor-dot/prng.ts` re-exports the core + keeps its local `randomRadii`/`radiiToCSS` border-radius helpers (single-component). The `proof:di-consistency` gate folds a `mulberry32`/`hashString`-defined-exactly-once assertion. Runtime byte-identical (the watercolor + goo-blob unit suites pass).
- **`useDocumentVisibility()` leaf — FOLDED (≥2 consumers).** `src/composables/dom/useDocumentVisibility.ts` is the single `visibilitychange → document.hidden` source; `useRAFLoop` + `useIntersectionPause` consume it (each drops its hand-rolled listener + dispose; the `watch` uses `flush: 'sync'` so the visibility reaction timing is identical to the prior inline listener). Imported DIRECTLY (not via the `dom/` barrel) so it stays OFF the public root surface (byte-stability). The substrate (`useWebGLCanvas`) keeps its OWN `tab-hidden` listener — its suspend-reason `Set` policy is AV.W7's offscreen-pause domain; scoping the leaf to the two motion composables avoids fragmenting that policy (the leaf is the substrate W7 binds, recorded).
- **WebGL compile/link — FOLDED (≥2 consumers).** `src/composables/glass/webgl/compile.ts` ships `compileShader(gl,type,src,label)` / `linkProgram(gl,vs,fs,label)`. The aurora `glSetup.ts` (`[Aurora]` label) and the goo-blob `useMetaballRenderer.ts` (`[GooBlob]` label) both dropped their byte-identical local copies (the `label` arg preserves each diagnostic prefix). Imported directly; off the public surface.

### LOC delta

DI factory + 6 migrations: **net +1** (+71/−70 — the factory pays for itself collapsing per-site boilerplate). De-dup: **net −46** (+65/−111). Hoist: **net 0** (+2/−2). Test relocation: 62 files moved from 27 in-src `__tests__/` dirs (−7721 src lines) to `tests/`. Full ledger: `docs/tranches/AV/audit/W14-loc-delta.json`.

### Public-surface byte-stability (CARDINAL invariant)

`proof:package` ✓ · `verify-export-types` ✓ · `proof:resolution` ✓ — the `package.json` exports set + all 69 published subpath entry files are byte-unchanged. The build emits 3 NEW INTERNAL shared-leaf chunks (`compile.js`, `createContext.js`, `prng.js`) from the Lane A/E extractions; none is a published subpath (the hashed-chunk renames are internal-graph churn from the source edits, not surface drift).

### Gates

Four NEW born-RED → green + bite-verified:

| gate | tags | bite |
|---|---|---|
| `proof:di-consistency` | `["local","ci"]` | re-inline a hand-rolled `inject()`+throw triplet → RED |
| `proof:no-nested-import` | `["local","ci"]` | nested `await import` without `// lazy-boundary:` sentinel → RED |
| `proof:no-test-in-src` | `["local","ci"]` | a `*.test.ts` back under `src/` → RED |
| `proof:spring-tokens-synced` | `["local","ci","release"]` | hand-edit one `--spring-*` value → RED |

All four registered in `package.json` + `gates.mjs` + `ci.yml`; `gates:verify-ci` green (51 ci gates aligned). No-regression matrix green (`proof:vueuse-free-root`, `proof:strict-templates`, `proof:doc-consistency`, `proof:components-css`, `proof:blob-value-free`, `proof:single-color-core`, `proof:webgl-substrate-single`, `proof:shader-shared-source`, `proof:fail-explicit`, `proof:no-god-module`, `proof:dock-a11y-contract`, `proof:blob-color-equivalence`); `typecheck` + `build` green.

**Not W14 (pre-existing working-tree state at wave open, left untouched):** `src/styles/typography.css` + `tests/stories.smoke.spec.ts` carried unrelated edits.

---

## W13 — god-module decomposition + carousel-progress fix

**Status:** DEV-COMPLETE, green.

### What landed (five disjoint trees + the born-RED gate)

The five named god-modules split into cohesive single-responsibility sub-modules.
No `src/` `.ts`/`.vue` file exceeds 500 lines; the largest is now 475
(`BouncyToggle.vue`, untouched).

**W13.a — aurora frag GLSL set (819 → 348).** `aurora.frag.ts` is now an assembler
that template-splices six partials into one source string: `composition.glsl.ts`
(60 — `samplePalette` LUT + `nucleiField` softmax + palette drift), `flow.glsl.ts`
(52 — `flowField` pattern dispatch + curl + cursor), `brush.glsl.ts` (234 — the
`StrokeHit`/`curvedStroke`/`paintOver`/`bestOil` swept-brushstroke primitive),
`mediums.glsl.ts` (232 — the four PEER mediums `watercolor`/`pastel`/`crayon`/`oil`
+ `sampleBase`; crayon stays a `main()`-level peer, NOT an oil sub-mode),
`tonemap.glsl.ts` (14 — `aces`). The noise/warp foundation (W2 `${FBM_ROT_GLSL}` +
`${OETF_GLSL}` splices), the color utils, and `main()` stay inline in the assembler
— `main()` is the assembly point + carries the mandatory `linearToSrgb()` OETF seam
the `proof:aurora-space-gamma` gate text-matches. A standalone `main.glsl.ts` was
NOT created: externalizing `main()` would move the gate-load-bearing OETF call out
of `aurora.frag.ts` and red the un-touchable `proof:aurora-space-gamma` gate — the
honest seam is main-as-assembler (the file is comfortably under 500 with main
inline). The emitted `FRAGMENT_SRC` is byte-identical to the prior hand-inlined
source (verified — splice boundaries fall on original line breaks).

**W13.b — sortable cohesive services (689 → 184 orchestrator).** `useSortable.ts`
is a thin orchestrator composing `dragController.ts` (196 — the
`beginDrag`/`onPointerMove`/`onPointerUp`/`endDrag` lifecycle + cross-list routing),
`dropResolver.ts` (76 — pure `resolveDropIndexIn`/`findForeignTarget` + the module
instance registry), `ghostRenderer.ts` (121 — `createGhost`/`updateGhost`/
`destroyGhost` + `resolveVisibleRadius` + `isNonZeroRadius`), `touchGate.ts` (65 —
`targetIsHandle` + `acquirePointerCapture`), `transitionTiming.ts` (80 — `flagsFor`
+ `computeDropClasses` + the drop-class constants), and `types.ts` (137 — the shared
contract). The public `useSortable`/`UseSortableReturn`/`SortableId` return shape is
byte-identical; `isNonZeroRadius` stays re-exported from `useSortable` (the D9 test
imports it there).

**W13.c — Progress variant SFCs + carousel-progress fix (649 → 121 dispatcher).**
`Progress.vue` is a thin dispatcher over `ProgressDefault.vue` (35),
`ProgressGradient.vue` (205 — lifecycle motion grammar + indeterminate + scoped
CSS), and `ProgressSectioned.vue` (262 — phase-bus cells + spring + scoped CSS),
with `useProgressGeometry.ts` (121) deriving per-cell width/start/end/state/fill +
the aria aggregate. The `disableCrescendo` opt-out prop was RETIRED (zero external
consumers; distinct variant composition replaces a post-hoc override). The
carousel-progress break is FIXED by an explicit prop-boundary contract: a non-zero
`modelValue` on `variant="sectioned"`, `segments` on a non-sectioned variant, and
`indeterminate` + `sectioned` each throw (dev) / `console.error` (prod) instead of
the prior silent `sectionedAggregateValue` override that ignored the consumer's
`modelValue`. The sectioned variant derives its own a11y value from the cells. The
demo sectioned story was corrected to drive the fill via `:active-progress` (not
`:model-value`).

**W13.d — aurora runtime seams (591 → 291 orchestrator).** `runtime.ts` is the
GL-lifecycle orchestrator composing `glSetup.ts` (138 — `compile`/`link` +
`createGlProgram` + `UNIFORM_NAMES` const + the location cache), `uniformBridge.ts`
(207 — the sealed `MEDIUM_ID`/`FLOW_ID`/`WARP_ID`/`STROKE_MODE_ID` `as const`
dispatch + `resolveMediumId`/`resolveStrokeModeId` + `createUniformBridge` with the
pre-allocated upload buffers + the `flipY` Y-origin boundary), `cursorModel.ts` (73
— the `CURSOR_*` constants + `CursorState` + `advanceCursor` + `cursorIsLive`,
exported once), and `frameLoop.ts` (67 — `drawFrame` + `needsAnimation` over a
`FrameLoopDeps` demand state).

**W13.e — metaball seam split (224 conflated → 177 assembler).**
`metaball.frag.ts` is an assembler splicing the W2 chunk + `sdf-body.glsl.ts` (19 —
`sdCircle`/`smin`), `watercolor-edges.glsl.ts` (49 — the FBM noise that displaces
the organic edge, two consts around the `${FBM_ROT_GLSL}` splice), and
`oklch-perturb.glsl.ts` (31 — `inGamut`/`gamutClampOklch`). `main()` + the per-pixel
OKLCh perturbation stay inline (the `proof:blob-space-gamma` gate text-matches the
OETF seam there). Emitted `METABALL_FRAGMENT_SRC` byte-identical.

**The gate.** `proof:no-god-module` (`scripts/proof-no-god-module.mjs`) scans `src/`
`.ts`/`.vue` (excl. `__tests__/`), warns at 300, bites at >500. Registered in
`package.json` + the `gates.mjs` manifest (tagged `local` — `proof:all` runs it;
W6 gates-close folds it into the ci aggregate).

### Verification

- `npm run typecheck` — green (`vue-tsc --noEmit`).
- `npm run build` — green (vite arm + the `vue-tsc` emit-types arm); dist inlines
  both shaders (`linearToSrgb` + `mediumCrayon` in `aurora.js`, `gamutClampOklch`
  in `goo-blob.js`).
- `npm run test` — 690/690 across 71 files (the sortable suite, the Progress suite
  rewritten for the new contract, the aurora/blob equivalence ports — all green).
- `npm run proof:no-god-module` — PASS (508 files scanned, largest 475).
- Character-equivalence — `FRAGMENT_SRC` + `METABALL_FRAGMENT_SRC` proven
  byte-identical to the pre-split hand-inlined originals via a scratch vitest
  compare (the splice boundaries land on original line breaks).
- Shader gates green — `proof:aurora-space-gamma`, `proof:blob-space-gamma`,
  `proof:shader-shared-source` all PASS (the OETF seam + chunk-single-source
  invariants held; the gate text-matches against `aurora.frag.ts`/`metaball.frag.ts`
  which keep `main()` inline).
- Live WebGL2 compile+link — Playwright on the demo (`localhost:5173`): the aurora
  canvas (`/substrates/aurora`) and all 5 goo-blob canvases (`/substrates/goo-blob`)
  report a live WebGL2 context with `gl.getError() === 0` — both shaders compile +
  link cleanly post-splice. (The `var(--primary)` `cssToOklch` console errors on the
  blob page pre-exist W13 — they are in `useMetaballRenderer.ts`/`color/index.ts`,
  untouched files, a demo passing an unresolvable CSS-custom-prop token to value.js;
  the SHADER itself links cleanly.)
- Carousel-progress fix manual verify — Playwright on `/feedback/progress`: the
  sectioned bar renders 4 cells with `aria-valuenow="64.5"` (the cell-derived
  aggregate), and the prop-boundary contract throws on each misuse —
  `modelValue`-on-sectioned, `segments`-on-gradient, `indeterminate`-on-sectioned —
  while the corrected `activeProgress`-driven wiring mounts cleanly.

## W16 — modern-Tailwind v4 cohesion

**Status:** DEV-COMPLETE, green.

### What landed

The bulk of TW1 (`@theme inline`), TW2 (oklch ramps), and most of the TW4/TW5/TW6
SFC lifts had already folded into the W15 commit (`8036370`). W16 closed the
remaining cohesion gaps + completed the migration + authored the idiom gate.

**Lane A — `@theme inline` + oklch.** (1) Completed the TW1 migration's ONE
escaped family: the radius scale was DOUBLE-declared (tokens.css §4 AND theme.css)
— the exact doubled override surface TW1 kills. Excised the tokens.css §4 twin;
theme.css is now the single radius source. The radius primitives + the semantic
aliases live in a LEADING plain `@theme` block, NOT `@theme inline`: the inline
form substitutes the resolved VALUE, so value-identical aliases (`--radius-card` +
`--radius-dialog` both → `--radius-2xl`) collapse and Tailwind v4 DROPS one
`rounded-*` utility when both candidates are scanned — a latent W15 regression
where `rounded-card` (used 75×) silently failed to mint once `rounded-dialog`
(confirm-dialog/dialog-native) was in source. Plain `@theme` mints each alias's
own var so siblings never collide. (2) Verified the oklch section/rainbow/viz/
semantic-accent ramps + `light-dark()` mirrors (landed at W15).

**Lane B — SFC lifts.** The one stray registered-namespace wrap the W15 sweep
left: `SelectTrigger.vue:47` `ease-[var(--ease-standard)]` → `ease-standard`
(the `--ease-standard` bridge resolves it). All other TW4/TW5/TW6 sites verified
already-lifted (the paren shorthand, the `theme()` kills, the single-source masks).

**Lane C — container queries + the idiom gate.** (1) Container-query swaps:
`instrument-chassis.css` now establishes a `chassis` inline-size container and the
dial reflow reads `@container chassis (max-width: 44.9375rem)` instead of
`@media (max-width: 720px)`; `typography.css` `.text-pane-title` reads an unnamed
`@container (min-width: 40rem)` instead of `@media (min-width: 640px)`. The dock
container context landed at W15. Viewport-/preference-semantic `@media` brackets
(the dock `--dock-overflow-bp` wrap trigger, `prefers-reduced-motion`) KEPT.
(2) `proof:tailwind-v4-idiom` (born RED → green), extending
`proof:design-idiom-localization` with the four asserts: (a) no `theme(colors.…)`
function sites; (b) no registered-namespace var-wrap where the bridge mints the
utility (allowlisted sanctioned sites); (c) the dock/chassis `@container` context;
(d) `@theme` scale completeness (duration/ease-spring/glass-blur fully bridged,
named-shadow bridge-integrity; the shimmer-tempo + `--spring-dock` choreography
constants on a justified holdout). Born-RED verified by bite-tests.

### Gates reconciled (W15 left RED)

- **`proof:theme`** — the `cssAssertions` encoded the pre-inline expectation
  (`border-radius: var(--radius-card)`, `font-size: var(--text-display-1)`, …);
  the W15 `@theme inline` migration left it RED (substitution emits the tokens.css
  source token, not the namespace var). Updated the assertions to the substituted
  values + the radius restructure fixed the `rounded-card` MISSING-utility failure.
- **`proof:components-css`** — the W15 TW5 paren-shorthand lift surfaced 5 reka-ui
  runtime props (`--reka-{combobox-content-transform-origin,select-trigger-*,tabs-indicator-*}`)
  as bare `var()` in `components.css`; added them to the documented `RUNTIME_PROPS`
  allowlist (siblings of `--reka-popover-trigger-width`).
- **`profile:budget`** — the W15 iOS-26 token surface pushed `dist/styles/index.css`
  over the ceiling (459887/455000 at HEAD, before W16). Re-based to 474000/118000
  with the documented ~3% close headroom (the third conscious lift).

Lift tally: `docs/tranches/AV/audit/W16-tailwind-idiom.json`.

## W15 — iOS-26 Liquid Glass design-evolution

**Status:** DEV-COMPLETE, green.

### What landed (all three lanes)

**Lane A — material token folds.** Over the warm-cream identity (HELD — no hue swap,
no clone): (1) the `quiet` rung gained `saturate(1.05) brightness(1.02)` so the lower
ladder reads with the same saturation life as `resting`+ (M1); the
`prefers-reduced-transparency: reduce` bracket already maps `--glass-blur-quiet: none`,
so the whole chain drops with the blur. (2) `--glass-edge-light{,-dark}` minted — a
full-perimeter `inset 0 0 0 0.75px` rim (alpha 0.18/0.10) distinct from the top-only
`--glass-highlight`, wired onto `.glass-floating` (glass.css) + `.glass-dock` (dock.css)
as the catch-light that "defines the silhouette" (M3); the `-dark` companion remaps
inside `.dark`. (3) The content-aware under-shadow modifier `.glass-over-text` /
`[data-over-content]` swaps a text-bearing glass surface one rung heavier
(quiet→default, resting→vivid) and lightens over solid-light (M4) — reuses the existing
`--glass-under-shadow-*` rungs, no new shadow value (`vivid` sufficient over text). (4)
The three `@property --specular-x`/`--specular-y` (`<percentage>`) + `--specular-intensity`
(`<number>`) regs landed in tokens.css §11b alongside the existing three. The no-glass-on-
glass discipline + the spring cross-ref drafted into the glass.css header.

**Lane B — the pointer-anchored MOVING specular (HEADLINE).** New
`src/styles/glass-specular-track.css` (index.css cascade rung 4a): a `.glass-specular-track`
`::before` paints a `radial-gradient(circle at var(--specular-x) var(--specular-y), …)`
over a `mask-image` so the catch-light rides the surface, `mix-blend-mode: screen`. The
consumer writes pointer position as `--mouse-x/--mouse-y` (unregistered → inherits to the
pseudo); the pseudo maps them onto the typed `--specular-*` props. Intensity drives the
layer `opacity` (NOT a `calc()` in the stop alpha — a registered-`@property` `var()` nested
in `calc()` in an `hsl()` alpha in a gradient computes to 0 in Chromium; the layer-opacity
model is correct AND cleaner). Guards: `prefers-reduced-motion: reduce` pins the catch-light
static-centred (50%) + `transition: none`; a `var(--specular-x, 50%)` floor paints a centred
catch-light without the typed-property animation; `prefers-reduced-transparency: reduce`
drops it. The `feDisplacementMap` refraction garnish ships `@supports (backdrop-filter:
url(…))`-gated PE-only over the blur base — no `url(#…)` declaration leaks the substrate.
Three consumers opt in: `DockIconButton.vue` (`.glass-specular-track` + the `@pointermove`
`--mouse-x/--mouse-y` write seam), the Button `glass`/`glass-wash` variants
(`button/index.ts`), and `surface=glass` cards (`Card.vue`).

**Lane C — the no-glass-on-glass discipline doc.** `dock/README.md` carries the three
layer bands (content → navigation → overlay, per the `--z-*` registry), the no-glass-on-
glass rung-pairing rule, and the material↔spring duality cross-ref to AV.W9 (dock motion /
velocity continuity) + AV.W11 (slider) for the momentum-gated press squish.

### Gate + verification

- `proof:liquid-glass-tokens` (NEW, born RED → **GREEN**) — registered in `package.json`,
  `gates.mjs` (local+ci), `ci.yml`. Asserts the rim wiring, the quiet-rung saturate parity,
  the content-aware modifier, the three `@property` regs, the reduced-motion static paint +
  centred var() fallback, the saturate-drops-with-blur under reduced-transparency, the
  `@supports`-gated refraction garnish (no substrate leak), and the AA floors at
  tokens.css:332/341.
- `npm run typecheck` — **GREEN**. `npm run build` — **GREEN** (both arms).
- `npm run gates:verify-ci` — **GREEN** (manifest==ci, 43 gates).
- **Playwright live-verify** (http://localhost:5175): the moving specular tracks a real
  pointer-move (`circle at 72% 28%` follows the cursor, hover lifts opacity 0.35→0.6); under
  emulated `prefers-reduced-motion: reduce` the off-centre pointer write is ignored and the
  catch-light pins static-centred (`circle` 50%/50%, `transition: none`, still paints at
  0.35); the `--glass-edge-light` rim + the quiet-rung `saturate(1.05) brightness(1.02)` are
  live in the cascade. Screenshots under `docs/tranches/AV/audit/W15-*.png`.

Token tally: `docs/tranches/AV/audit/W15-liquid-glass.json`.

Green run id: local — recorded above (CI run id to be stamped by the orchestrator at
integration).

## W3 — motion-composables lift + keyframes orchestration-tier adoption

**Status:** DEV-COMPLETE, green.

### What landed (the green subset)

**Lane A — `useCountup` lift (D3, ADOPT).** `src/composables/motion/useCountup.ts`
created — the editorial `[data-countup]` DOM-walker, RE-EXPRESSED on the keyframes LIGHT
`NumericAnimation` engine (the hand-rolled `requestAnimationFrame(tick)` linear loop is
gone). The engine owns the rAF loop + easing + segment lookup; the composable owns the
DOM walk, the per-frame `textContent` write, the `prefers-reduced-motion`/`skip` snap,
and the teardown. **The unmount-mid-tween leak is FIXED** — every live tween is tracked
in a `Map<HTMLElement, NumericAnimation>`; `cancel()` (also `onScopeDispose`) stops every
in-flight animation. `settle()` cancels then snaps. The `data-countup`/`-dur`/`-delay`
DOM contract + `runActive`/`settle` surface are preserved (the delay is honoured by
deferring `.play()` with a cancellable timer wrapping `.stop()`). value.js-FREE: the
easing is a callable (`easeFn`), forwarded as the engine's `timingFunction` — never a
string name (a name would dynamic-import value.js's registry). Ships on `/motion`
(keyframes-bearing — NOT root, NOT `/motion-core`); `Countup`/`UseCountupOptions` promoted
to `/api`.

**Lane B — `vReveal` lift (ADOPT).** `src/composables/motion/vReveal.ts` created — the
`[data-reveal]`/`--d` entrance directive, `vue` type-only (`ObjectDirective`), so
dependency-free and root-barrel safe per the `useViewTransition` precedent. The slides
`v-reveal="N"`/`v-reveal:fade="N"` surface is preserved; the slides-deck-specific doc
comment was de-slidesed (the glass-ui docstring documents the contract the consumer's CSS
reads, no "ported from slides"). Ships on `/motion-core` + the root barrel.

**Lane C — D1 stagger() adoption: BOOKed.** The installed keyframes (peer
`^2.2.0 || ^3.0.0`, resolved 2.2.0 at HEAD) does **NOT export `stagger`** on its LIGHT
barrel (verified: `Object.keys` + `keyframes.d.ts` grep — only `ElementMorph`,
`NumericAnimation`, `SpringProgress`). The E.W10 LIGHT orchestration tier
(`stagger`/`flip`/`flipShared`) the spec presumed is not present. Combined with the
CONDITIONAL D1 gate (adopt IFF a non-linear `from`/`ease` distribution consumer appears —
none at HEAD), the §3.3 default holds: **BOOK**. The two hand-rolled linear ramps
(`useStagger.ts:123-137` `initialDelayMs + idx*delayMs`; `useStaggerReveal.ts:65-68`
`staggerMs*idx`) are KEPT byte-identical. **Trigger to revisit:** keyframes ships
`stagger()` on its LIGHT barrel AND a non-linear `from`/`ease` distribution consumer
appears (the keyframes-bearing relocation of the two leaves from `/motion-core` to
`/motion` is not worth a behavior-identical linear ramp).

**Lane D — D2 flip() FLIP-mechanics adoption: DEFERRED (cannot adopt at HEAD).** Same
root cause: keyframes 2.2.0 does **NOT export `flip`/`flipShared`** (only `ElementMorph`,
a shared-element morph primitive — NOT the read/invert FLIP-batching seam the dock +
carousel mechanics need). Per §3a Triumvirate Dispatch, a LIGHT `flip()` API that does
not exist / does not expose the needed batching seam is a DOCS-bounds-breaking expansion
against READ-ONLY keyframes (inv-16). Rather than halt the whole wave, the largest correct
green subset landed (A/B/C2) and D2 is DEFERRED. The two hand-rolled FLIP sequences
(`useLayerTransition.ts` dock; `useGlassCarousel.ts` carousel) are UNTOUCHED — each keeps
its driver (dock `SpringProgress`, carousel CSS-transition + `transitionend`) and its
correct mechanics. **Trigger to revisit:** keyframes publishes `flip()`/`flipShared()` on
its value.js-free LIGHT barrel with a read/invert batching seam that accepts a
CSS-`transition-duration`-parsed duration (carousel) and a per-frame `SpringProgress`
value (dock) WITHOUT a keyframes edit.

**useIdleSchedule (§4): KEEP-BOOK (the spec's lean default).** `useCountup.runActive` is
invoked imperatively on slide-activate — already past first-paint — so it does not need a
post-first-paint idle-defer. The single aurora consumer does not clear the J-inv-10 ≥2
bar, so `scheduleAfterFirstPaint` stays inline in `useAurora.ts` (untouched). **Trigger to
extract:** a 2nd library primitive needs post-first-paint idle deferral.

**C2 — `linear()`-spring token-coverage sweep (ADOPT).** The three surviving
`--ease-apple-spring` consumer sites converged onto `--spring-bouncy` (the apple-spring's
+27.5% overshoot maps to the bouncy `linear()` stop-set, peak ~1.20): `cards.css:41` (the
cartoon-surface `translate`), `animations.css:334` (the top-layer
`transition-timing-function`), `tokens.css:1261` (`--vt-ease`), plus the
`view-transition.css:39` `var(--vt-ease, …)` fallback (re-pointed at `--spring-bouncy`).
`--ease-apple-spring` survives as a token DEFINITION only (`tokens.css:181`/`theme.css:320`
+ the `--motion-…` seed) — zero spring-flavored consumers (grep evidence). The D6 slides
`--spring-deck` → `var(--spring-smooth)` pin is recorded as a G.W0 deliverable (the
canonical `--spring-smooth` it aliases is the glass-ui side of the single-source contract).

**§5 native-scroll bridge: DEFER (KEEP-BOOK).** glass-ui already runs the
native-scroll-first contract hand-rolled + hardened (`supportsCssTimeline.ts`'s
garbage-value negative probe; the inert-on-native dual-path-single-writer rule).
keyframes' `createNativeTimeline` is the opposite shape (a JS timeline OBJECT to drive an
animation, vs glass-ui's "detect native → go inert → let CSS own it"). `supportsCssTimeline.ts`
+ `scroll-driven.css` UNTOUCHED. **Trigger:** a consumer needs a reactive JS scroll value
ON a supporting engine driving a non-CSS-expressible animation.

**AV.W3.6 Baseline CSS-motion folds (typed/active VT, `@starting-style`/`allow-discrete`
dock/popover/tooltip extension, `color-mix(in oklch)` dock phase-tint): NOT landed in
W3** — they ride AV.W5/W7 (the styles/dock hygiene + perf arms). W3's styles touch is the
C2 spring-token convergence only (the cleanest token-touch home, per the spec's "fold
where the token-touch is cleanest"). The C3 dock velocity-continuity seam is already wired
at HEAD (`useLayerTransition.ts:202-223` AV.W9.2 re-seats the live `SpringProgress` from
`(value, velocity)` on a retarget) — recorded, not re-edited (the §4 Do-NOT-touch spring
block).

### §3 grep result (recorded)

`grep -rn "stagger|Sequence|setTimeout.*cascade" src/` → exactly two hand-rolled linear
ramps (`useStagger.ts:123-137`, `useStaggerReveal.ts:65-68`), both KEPT (D1 BOOK). FLIP:
two hand-rolled measure/pin/invert sequences (`useLayerTransition.ts`,
`useGlassCarousel.ts`), both KEPT (D2 DEFER — no `flip()` export). `Sequence`/`drag`/`decay`
— no hand-roll in `src/`, SKIP.

### Gate matrix

- `proof:motion-composables-consumer` (NEW, born-RED) — **GREEN**. 2 items, 4 consumer
  paths checked (each composable: demo route + test, both resolve at HEAD); 2 pending
  cross-repo slides forks listed, NOT counted. Bite-verified: drop a consumer → the item
  falls under 2 resolving consumers → RED.
- `proof:motion-value-free` (NEW) — **GREEN**. 6 guarded files
  (`useCountup`/`vReveal`/`useStagger`/`useStaggerReveal`/`useLayerTransition`/`useGlassCarousel`):
  zero `@mkbabb/value.js` imports, zero `loadAnimationEngine`/`animate`/`CSSKeyframesAnimation`
  HEAVY edges.
- `proof:vueuse-free-root` — **GREEN** (`vReveal` is dependency-free; `useCountup` is OFF
  the root). `proof:consumers:static` — **GREEN** (`vReveal` added to the targeted
  root-surface allowlist alongside the View-Transition trio). `proof:strict-templates` —
  **GREEN**.
- `proof:dock-motion-parity` / `proof:dock-motion-single-source` — **GREEN** (the
  `DOCK_SPRING` driver is untouched; D2 deferred).
- New motion `__tests__/` — **GREEN** (`useCountup.test.ts` 5/5, `vReveal.test.ts` 5/5):
  the `[data-countup]` settle, the reduced-motion snap, the `cancel()`/scope-dispose leak
  fix, the `skip()` short-circuit; the `v-reveal`/`v-reveal:fade` hooks + `updated`
  re-apply.
- `node scripts/gates.mjs --verify-ci` — **GREEN** (manifest==ci, 42 gates; both new gates
  registered in `package.json`, `gates.mjs`, `ci.yml`).
- `npm run typecheck` — **GREEN**. `npm run build` — **GREEN** (both arms).

Green run id: local — recorded above (CI run id to be stamped by the orchestrator at
integration).

## W2 — blob-converge (aurora↔blob shared-GLSL convergence)

**Status:** DEV-COMPLETE, green.

### What landed

The shared procedural-color/noise GLSL chunk
`src/composables/glass/webgl/shaders/procedural-color.glsl.ts` is created as the
SINGLE GPU-side source of the math both shaders need:

- `OETF_GLSL` — the sRGB OETF + inverse (`srgbToLinearCh`/`srgbToLinear`/
  `linearToSrgbCh`/`linearToSrgb`), VERBATIM from the blob's former local block. THE
  HEADLINE: there is now exactly ONE OETF; aurora's (AV.W1-copied) and the blob's can
  never again diverge — the root cause of the AV.W1 too-dark defect is structurally
  eliminated.
- `OKLCH_MATRICES_GLSL` — the four Ottosson `mat3` literals (`LINEAR_SRGB_TO_LMS`,
  `LMS_TO_OKLAB`, `OKLAB_TO_LMS`, `LMS_TO_LINEAR_SRGB`) + the four space-conversion
  fns (`srgbToOklab`/`oklabToLinearSrgb`/`oklabToOklch`/`oklchToOklab`), VERBATIM
  (value.js EXACT constants, transposed for GLSL column-major). The blob splices it;
  aurora does NOT (no in-shader OKLCh path — KISS).
- `FBM_ROT_GLSL` — the byte-identical `const mat2 FBM_ROT = mat2(0.8, 0.6, -0.6, 0.8);`
  rotation constant. BOTH shaders splice it.

Both `.frag.ts` modules splice the chunk via JS template-literal interpolation
(`${OETF_GLSL}` / `${OKLCH_MATRICES_GLSL}` / `${FBM_ROT_GLSL}`) at module load — NO
`#include` preprocessor, NO new bundler step (the SOTA-crosswalk-ratified KISS choice).
The chunk is imported with a relative specifier (`../../../../composables/glass/webgl/shaders/procedural-color.glsl`)
matching the repo's relative-import convention (the `@/` alias in CLAUDE.md has no
tsconfig `paths` entry and is unused elsewhere in `src/`; using it would be a born-RED
import). The renderer consumers (`useMetaballRenderer.ts`, `runtime.ts`) are UNTOUCHED
— the `.frag.ts` modules still export the same assembled `*_SRC` string.

### `hash21`/noise-helper route decision (§3a)

**Route: `hash21` + value-noise + the `fbm` LOOP scoped OUT of the chunk** (each shader
keeps its own). The two HEAD hashes legitimately DIVERGE — aurora uses a 2D
`fract(p*vec2(123.34,456.21))` hash, the blob uses a 3D `p3 = fract(vec3(p.xyx)*0.1031)`
hash — and the `fbm` loop shapes differ (aurora 2.02 lacunarity + uniform-driven
octaves vs the blob 2.0 + param octaves). Reconciling them would re-bless BOTH shaders'
noise fields for no gain — the over-abstraction the wave forbids. Per §3a the OETF +
matrices + FBM_ROT are the MANDATORY convergence; the noise helpers are extract-if-clean
and they are NOT cleanly KISS, so only the byte-identical `FBM_ROT` CONSTANT converges
(each `fbm` loop references it but stays local). NO snapshot re-bless was needed — the
emitted GLSL is character-equivalent modulo the splice boundary.

### A7 shared-noise leaf — DEFER (crosswalk-consistent)

No simplex/`snoise` basis was minted (substrate-without-consumer per J inv 10). The
named trigger: **AV.W8 constellation** landing needing the same fbm/domain-warp basis is
the third consumer that clears the ≥2-distinct-consumer bar; at that point the
value-noise/simplex sub-source folds into THIS chunk (its named landing site).

### Character-equivalence

The assembled `METABALL_FRAGMENT_SRC` and aurora `FRAGMENT_SRC` carry the EXACT spliced
OETF/matrix/FBM_ROT blocks (verified by evaluating the template literals and asserting
each block is `includes`-present byte-for-byte, no unresolved `${`, aurora carries NO
OKLCh matrices, each shader's local `fbm` loop is preserved and references `FBM_ROT`).
The splice boundary is the only diff vs a hand-inlined shader. `dist/useWebGLCanvas-*.js`
carries the inlined OETF (`1.055`), the matrices (`0.4122214708`), and `FBM_ROT` — fully
inlined; no separate `procedural-color` chunk is emitted.

### Live WebGL2 compile+link verify

Both shaders compile + link on a LIVE WebGL2 context (headless Chromium 1.58.0 via
Playwright; a real `canvas.getContext('webgl2')`): a harness embedding the assembled
fragment + vertex strings compiled both shaders and linked both programs —
`{ webgl2: true, metaball: { ok: true }, aurora: { ok: true }, pass: true }`. The only
console error was a benign `favicon.ico` 404 (no shader/GL error). This is the binding
evidence that the spliced GLSL is syntactically valid (a name-collision or broken splice
would fail `gl.linkProgram`).

### `/color` leaf no-op confirmation (§3.6 / DEC-AT-7)

The CPU-side color-resolution path was ALREADY converged at the `/color` leaf at HEAD —
aurora's `oklchToLinear` palette bake and the blob's `oklchToGammaRgb` resolver both
source value.js's Ottosson core through the one leaf. No forced shared resolver was
invented (aurora bakes a PALETTE of stops, the blob resolves a SINGLE base color —
different signatures, legitimately). W2's convergence is the GPU-side GLSL math; the
CPU-side leaf convergence is a landed no-op. `src/composables/color/index.ts` was NOT
touched.

### Gate matrix

- `proof:shader-shared-source` (NEW, born-RED) — **GREEN**. Chunk single-source: OETF
  4/4, matrices 4/4, FBM_ROT 1/1; both frags local-defs 0/0/0; both splice the chunk.
  Bite-verified: re-inline a local `vec3 linearToSrgb` into aurora.frag.ts → RED;
  re-inline a `mat3 LINEAR_SRGB_TO_LMS` literal into metaball.frag.ts → RED.
- `proof:blob-color-equivalence` (8-assert 1e-6) — **GREEN** (8/8; matrices moved homes,
  byte-identical).
- `proof:blob-space-gamma` — **GREEN**.
- `proof:aurora-space-gamma` (AV.W1) — **GREEN** (aurora's OETF now sourced from the
  chunk; the call still precedes `fragColor`).
- `proof:blob-value-free` — **GREEN** (the chunk is GLSL string, value.js-free; the lone
  `value.js` dist substring is a provenance COMMENT, `@mkbabb/value.js` count = 0).
- `proof:webgl-substrate-single` — **GREEN**.
- `node scripts/gates.mjs --verify-ci` — **GREEN** (manifest==ci, 40 gates; the new gate
  is registered in `package.json`, `gates.mjs`, and `ci.yml`).
- `npm run typecheck` — **GREEN**.
- `npm run build` — **GREEN** (both arms; dist carries both assembled shaders inlined).

Green run id: local — recorded above (CI run id to be stamped by the orchestrator at
integration).

## W10 — storybook re-invention + prune + font-canon (DEV-COMPLETE)

The demo storybook collapsed to the coherent 11-category IA (§1 tree); the two
genuine src orphans retired; the four other removal directives BOOKed with their
real-consumer evidence (not cut); the demo + library font tables reduced to the
shipped canon. Three new gates born-RED at HEAD, green at close.

### Lane A — storybook re-invention + demo-route prunes + IA gates

- Rewrote `demo/stories/manifest.ts` to the 11-category IA: **Foundations ·
  Substrates · Primitives · Containers · Navigation · Data · Feedback · Motion ·
  Tools · Compositions · Composables(reference)**. Substrates sits 2nd (Droplet)
  carrying aurora + goo-blob (converted from FLAT_STORIES) + glass-panel (moved
  from Primitives). Dropped the `blob` flat story (demo-only canvas-2D).
- Recategorized: configurator → Compositions; hover-popover + expandable-container
  → Containers; alert → Feedback; command → Tools (new); glass-carousel →
  Navigation; paper-backdrop → Foundations; native-top-layer → Containers;
  form-validation/labeled-field/icon-tooltip → Compositions. Merged bouncy-tabs
  into the tabs story as a variant section. Dissolved the `custom`/`dock`/
  `utilities`/`sliders` single-story bins (token-ladder → `foundations/dock-active-tokens`,
  scale-on-hover → `foundations/css-utilities`). Composables collapsed below-fold
  (`reference: true` → CategoryRail divider).
- Retired `FLAT_STORIES`/`FlatStory`/`findFlatStory`/`goToFlat` — every story is a
  category row now. `router.ts`, `useStoryNavigation.ts`, `CategoryRail.vue`,
  `StoryPager.vue`, `StoryPage.vue` updated; `tests/stories.smoke.spec.ts`
  flat-story arm removed.
- DELETED demo-route orphans: `custom/header-ribbon.vue` (component stays shipped),
  `motion/stagger.vue` + `motion/scroll-type.vue` (composable dups),
  `composables/use-story-demo.vue` (demo-private), `blob.vue`, `sliders/spectrum.vue`.
- `proof:storybook-ia` (NEW, born-RED → **GREEN**) — manifest matches the §1 tree
  exactly (11 categories in order, per-category story-id set, no MissingStory).
  Bite-verified: reorder a category / add-drop a story id / point a row at a
  nonexistent .vue → RED.
- `proof:no-orphan-demo-route` (NEW, born-RED → **GREEN**) — 122 story files ↔ 122
  manifest rows, bidirectional. Bite-verified: orphan file / dangling row → RED.
- `docs/tranches/AV/audit/W10-fix-routes.md` — the four FIX-ROUTE items
  (native-top-layer, card toggles, carousel progress, glass-panel quality) routed
  to their owning waves; only native-top-layer's row relocated here.

### Lane B — src-orphan removal + push-back BOOK

- RETIRED **metric-cell** + **metric-stack** (0 external consumers): deleted the
  two `src/components/custom/<dir>/` + `src/<name>.ts` barrels + the `package.json`
  `./metric-cell`/`./metric-stack` exports + typesVersions rows + the `api/index.ts`
  re-export blocks (`MetricCellAppearance`/`MetricCellProps`/`MetricStackProps`/
  `MetricRowProps`) + the `vite.library.ts` entries + the orphaned `--metric-row-*`
  §17 token family. Re-authored the `MetricBadge.vue:157` + `AnimatedDigit.vue`
  comments (referenced dir gone; tokens unchanged) + the `src/index.ts` +
  `api/index.ts` excluded-package narration + the CLAUDE.md custom-dir tree (36 → 34)
  + the `/api` symbol tally (68 = 65 types + 3 constants). All glass-ui exports
  resolve to existing dist files; `npm run test` 689/689 green.
- **MIGRATION.md** — the two 0-consumer retirement notes (no alias, no-back-compat).
- BOOK — honest push-back (`docs/tranches/AV/audit/W10-prune-pushback.md`):
  instrument-chassis (GlassDock `instrument-strip` + test + 2 demo + root barrel),
  instrument-rail (InstrumentChassis composes it + root barrel), glyph-face/disco-glyph
  (provide/inject silhouette cooperation + 4 demo + root barrel) — all REAL
  consumers, **NOT cut**; named migrations recorded for the user to decide.
  metric-badge ↔ metric-pill recorded as a composition (MetricPill composes
  MetricBadge), **not a dedup** — keep both.
- The slider story already shipped the 2-variant shape (AV.W11 CVA cull landed);
  `primitives/slider.vue` carries standard + spectrum; `proof:slider-two-only` GREEN.

### Lane C — font-canon fix

- `demo/configurator/preset-editor/defaults.ts` — `FONT_OPTIONS` + `DEFAULT_CONFIG.font`
  rewritten to the shipped canon only (Plus Jakarta Sans + Fira Code + Fraunces +
  honest system stacks). DELETED `cm-serif`, `general-sans`, `inter`, `jetbrains-mono`.
- Deleted the duplicate `demo/fonts.ts` (0 consumers — single source is the
  configurator table). `demo/presets/neutral.css` repointed off Inter/JetBrains to
  honest system stacks + Fira Code.
- Library: `--font-stack-serif` repointed off the non-shipped Computer Modern →
  `"Fraunces", Georgia, "Times New Roman", serif` (Fraunces ships + carries the
  serif register — mechanical, not a new-face brand call). Stale "Computer Modern
  body" narration in `typography.css` corrected. `--font-stack-display` confirmed
  wired to the shipped Fraunces face.
- `proof:font-canon` (NEW, born-RED → **GREEN**) — every named font reference in the
  demo tables + presets + library `--font-stack-*` tokens resolves to a shipped
  `@font-face` (parsed from fonts.css + demo.css + typography.css) or a generic/
  system keyword. Bite-verified: re-add Computer Modern → RED. `proof:font-axes`
  stays GREEN (Fraunces wght/opsz/SOFT/WONK untouched).

### Verification

- `proof:storybook-ia` + `proof:no-orphan-demo-route` + `proof:font-canon` — all
  born-RED at HEAD, **GREEN** at close (bite-verified). Registered `["local","ci"]`
  in `package.json` + `gates.mjs` + `ci.yml`; `node scripts/gates.mjs --verify-ci`
  GREEN (manifest==ci, 47 gates).
- No-regression: `proof:font-axes`, `proof:slider-two-only`, `proof:doc-consistency`,
  `proof:theme`, `proof:components-css`, `proof:tailwind-v4-idiom`,
  `proof:liquid-glass-tokens`, `proof:vueuse-free-root`, `proof:no-legacy-commentary`
  — all GREEN. `proof:resolution` RED is sibling-only (value.js + bbnf-lang
  pre-existing cross-repo state, staged-green per contract-v2); glass-ui exports
  resolve cleanly.
- `npm run typecheck` — **GREEN**. `npm run build` — **GREEN** (2449 modules, both
  arms). `npm run test` — **GREEN** (689/689).
- Live (Playwright @ :5175): sidebar reads the 11-category IA in order (Substrates
  2nd, Composables-reference below-fold); aurora/goo-blob/glass-panel + all
  relocated routes render (no MissingStory); fonts resolve to Plus Jakarta Sans /
  Fraunces / Fira Code (loaded); the configurator font picker offers only the
  shipped canon. Screenshot: `docs/tranches/AV/audit/W10-storybook-ia-sidebar.png`.
  Zero console errors on hard navigation (the goo-blob `var(--primary)` resolver
  parse error is pre-existing goo-blob substrate behavior, BOOKed to the
  iOS-26/goo-blob wave — not a W10 regression).

BOOKs: `W10-prune-pushback.md` (honest push-back), `W10-fix-routes.md` (the four
FIX-ROUTEs). Green run id: local — recorded above (CI run id stamped by the
orchestrator at integration).
