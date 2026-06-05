# AU.W9 - Control-pane + dark-ergonomics + lean folds + slides-supply

## 2. State

**Name**: W9 - Control-pane + dark-ergonomics + lean folds + slides-supply
**Opens after**: AU.W8b (W8b lands the modern-CSS/encapsulation folds; W9 is the lean-fold + publish-gated slides-supply wave). W9 is non-publish-blocking in itself, but it lands the slides-supply primitives the 3.3.0 publish (W10) carries downstream.
**Agents**: 4 parallel — the four lanes below are file-disjoint (see §4a) so they parallelize across sibling worktrees. The tally-gate authoring (AU.W9.G) serializes LAST (it reads every other unit's landed consumer evidence).
**Hard gate**: one NEW born-RED gate green (`proof:au-w9-consumers`) + bite-verified; the existing dock/components/strict-template/idiom gate matrix + `typecheck` + `test` + `build` stay green with no regression; the W1c registry already enumerates `proof:au-w9-consumers` (`design/AU.W1c-color-gates.md:77`) so no registry RESYNC is owed for THIS gate (resync owed ONLY if a W9 fold mints a NEW gate, which it does not); A-2 visually verified, recorded in `PROGRESS.md`.
**Status**: planned

**Type:** IMPL (lands after W8b; carries the publish-gated slides-supply for W10).
**Scope source:** `docs/tranches/AU/AU-AUGMENT.md` §3 (W9 row), §3.1 (Drawer `:native` FOLD-W9 chronic), §5.3 (defineModel/Readonly residue), §6.2 row 1 (`:user-invalid` REINSTATEMENT — RE-GROUNDED below, see §11), §7 (library-optimum map); `docs/tranches/AU/AU.md` §3 (W9 row), §4 disposition #17/#20/#21/#22/#30/#31/#32; `docs/tranches/AU/waves/AU-gate-fleet-augment.md` §7 (the `proof:au-w9-consumers` skeleton + registration). Baseline-grounded against `docs/tranches/AU/audit/AUGMENT/modern-web-guidance-crosswalk.md` §3.1. This file is the FULLY-formed, execute-without-re-deriving spec for W9.

**Precepts in force.** No legacy / no back-compat aliases (clean breaks). Gestalt transposition, not patch. KISS — fold complexity out. ≥2-consumer bar (J-inv-10, convergence not census) gates every new public surface XOR a correctness/hygiene tag — this IS the `proof:au-w9-consumers` discipline. Token-first — every visual axis stays a `var(--…)` token. The hardened agent git clause: agents never stage/commit/stash; the orchestrator owns the index.

## 2a. Goal criterion

This wave succeeds if the lean control-pane + dark-ergonomics folds that have ≥2 real consumers at HEAD land (each behind the machine-checked overfitting bar), the publish-gated slides-supply primitives the 3.3.0 publish needs ship, and every 1-consumer-no-correctness item is BOOKed with a named trigger rather than force-folded — all proven by `proof:au-w9-consumers` (every W9 fold ↦ ≥2 distinct consumers XOR a correctness/hygiene tag, every cited consumer resolving at HEAD). The reader's test: the W9-consumers tally JSON lists every folded item with its named evidence, the gate reddens on a 1-consumer untagged fold, and no item in the tally fails to resolve.

## 3. Scope

The candidate items, each RE-GROUNDED against HEAD + the four consumer repos (slides, speedtest, muster, words) before disposition. Each carries an explicit **FOLD** or **BOOK** verdict; a 1-consumer item with no correctness tag is BOOKed, not forced.

1. **A-1** `ConfiguratorLayer` inter-row divider-rule opt-in + **A-2** `ConfiguratorLayer` `label`/`sub` → the typography ladder (`#30`/`#31`).
2. **`useGlobalDark({ initialValue })`** + **`darkModeSyncScript()`** FOUC parse-time primitive (`#21`/`#22`).
3. **Drawer `:native` / `GlassNativeDrawer`** (`#32` — chronic AT→AU).
4. **Button `size="icon-sm"`** + **Select `size`** — ONE size-vocabulary pass (`#17`/`#20`, FOLD-IF).
5. **The `:user-invalid` Input reinstatement** (AU-AUGMENT §6.2 row 1 — RE-GROUNDED: ALREADY SHIPPED at HEAD; see §11).
6. **The publish-gated slides-supply**: Dialog `showClose` prop; the `/deck` lift; Card `surface="cartoon"` dark arm + Badge; `useCountup` + `v-reveal` (`FG.W-motion`). Each decided FOLD vs BOOK per the ≥2-consumer bar.
7. **The tally + gate**: `docs/tranches/AU/audit/W9-consumers.json` + `scripts/proof-au-w9-consumers.mjs` + registration (`package.json`/`gates.mjs`/`ci.yml`).

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **A FOLD candidate's ≥2-consumer evidence collapses on re-verification.** If a unit's named consumers do not resolve at HEAD (e.g. a slides path renamed, a muster `frontend/src` site removed), the item must MOVE from FOLD to BOOK in the tally — a tally edit that crosses the unit boundary into AU.W9.G's gate fixture. Halt and triumvirate; do not silently fold a 1-consumer item to make the gate pass.
- **The `useGlobalDark` `createGlobalState` singleton cannot accept `initialValue`** without breaking the single-shared-instance contract (`useGlobalDark.ts:15` — the state factory is memoized; a per-call `initialValue` argument has no place to land on a zero-arg `createGlobalState` closure). This is not local-edit-recoverable; the redress is to re-shape the API (a one-shot `configureGlobalDark({initialValue})` install OR BOOK `#21`) rather than force a broken signature.
- **Drawer `:native` (`#32`) requires a NEW `<dialog>`/native-drawer COMPONENT** rather than an additive prop on the shipped vaul-vue `<Drawer>`. The existing `Drawer mode="live-behind"` (muster `MobileInstrumentSheet.vue:54`) already covers the live-behind detented case; if `:native` means a separate `GlassNativeDrawer` surface with its own subpath, that is a component-scope expansion, not a W9 lean fold → BOOK with the named trigger, do not force it into W9.
- **Any tally entry would need a fabricated second consumer** to clear the bar. A fabricated consumer is a plan defect, not a local fix. Halt.

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/custom/configurator/ConfiguratorLayer.vue` | modify (A-1 divider opt-in + A-2 ladder) |
| `src/components/custom/configurator/ConfiguratorRow.vue` | modify (A-2 ladder, paired) |
| `src/components/custom/configurator/index.ts` | modify (export the A-1 prop type if added) |
| `src/styles/configurator.css` OR `src/styles/index.css` | modify (A-1 divider rule + cascade rung; see §5 AU.W9.A precondition) |
| `src/composables/dark/useGlobalDark.ts` | modify (`initialValue` shaping) |
| `src/composables/dark/darkModeSyncScript.ts` | create (the FOUC parse-time primitive) |
| `src/composables/dark/index.ts` | modify (export `darkModeSyncScript`) |
| `src/dark.ts` | modify (flat `/dark` subpath barrel re-export) |
| `src/components/ui/button/index.ts` | modify (`size="icon-sm"` CVA rung) |
| `src/components/ui/select/SelectTrigger.vue` | modify (`size` prop) OR `src/components/ui/select/index.ts` |
| `src/components/ui/dialog/DialogContent.vue` | modify (`showClose` prop) |
| `src/components/ui/dialog/index.ts` | modify (export `showClose` type if needed) |
| `src/styles/cards.css` | modify (Card `surface="cartoon"` dark arm — IF FOLD) |
| `src/composables/motion/useCountup.ts` | create (IF FOLD) |
| `src/composables/motion/vReveal.ts` | create (IF FOLD) |
| `src/composables/motion/index.ts` | modify (export `useCountup`/`vReveal` — IF FOLD) |
| `src/api/index.ts` | modify (publish new public types) |
| `docs/tranches/AU/audit/W9-consumers.json` | create (the tally) |
| `scripts/proof-au-w9-consumers.mjs` | create (the gate) |
| `scripts/gates.mjs` | modify (register `proof:au-w9-consumers`) |
| `package.json` | modify (scripts only — the gate command + any new subpath export) |
| `.github/workflows/ci.yml` | modify (the gate ci step) |
| `CLAUDE.md` | modify (Structure block — any new file lines) |
| `docs/tranches/AU/PROGRESS.md` | modify (record the wave + the FOLD/BOOK verdicts + A-2 visual verify) |
| component `__tests__/*` + `.test-d.ts` fixtures for new props/composables | create|modify |

Do NOT touch: `src/components/ui/input/Input.vue` / `src/composables/dom/useUserInvalidAria.ts` / `src/styles/glass.css` (the `:user-invalid` recipe is ALREADY SHIPPED at HEAD — KILL-as-shipped, no W9 edit; §11) · `src/styles/dock*.css` / `src/components/custom/dock/**` (W8/W8b own the dock) · any runtime JS color path · the `docs/precepts` submodule (USER-DOMAIN, inv-16′).

## 4a. Disjointness

No two agent units share a `modify` path except where noted as orchestrator-merged:

- **AU.W9.A** (control-pane A-1/A-2) owns `ConfiguratorLayer.vue` / `ConfiguratorRow.vue` / the configurator `index.ts` + the configurator CSS rung. Disjoint from all other lanes.
- **AU.W9.B** (dark-ergonomics) owns `useGlobalDark.ts` / `darkModeSyncScript.ts` (create) / `composables/dark/index.ts` / `src/dark.ts`. Disjoint.
- **AU.W9.C** (size-vocabulary + slides-supply props) owns `button/index.ts` / `select/SelectTrigger.vue` / `dialog/DialogContent.vue` / `dialog/index.ts` / `cards.css`. These are distinct UI-package files; none overlaps a configurator or dark file. Disjoint within itself by package (button / select / dialog / card are file-disjoint sub-tasks).
- **AU.W9.D** (motion supply — `useCountup`/`vReveal`, IF FOLD) owns `composables/motion/useCountup.ts` / `vReveal.ts` (create) + `composables/motion/index.ts`. Disjoint.
- **`src/api/index.ts`** is touched by A, B, C, D (each publishes its new public type). This is append-only to disjoint regions (different export rows); the orchestrator integrates all four at close in one commit to avoid an index race — OR each lane writes its row in its own worktree and the orchestrator resolves the trivial append-merge.
- **AU.W9.G** (the tally + gate) owns `W9-consumers.json` / `proof-au-w9-consumers.mjs` / `gates.mjs` / `ci.yml` + the `package.json` gate-script row. It SERIALIZES LAST — the tally must reflect the ACTUAL landed FOLD/BOOK set from A/B/C/D (a fold that BOOKed mid-wave must not appear as a FOLD in the tally).

Net: four parallel implementation lanes — **(A) control-pane**, **(B) dark-ergonomics**, **(C) size+slides-supply props**, **(D) motion supply** — then **(G) tally+gate** serialized last. `gates.mjs`/`package.json`/`ci.yml`/`api/index.ts` registration is orchestrator-integrated at close.

## 4b. Worktree Plan

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| Lane A — control-pane (AU.W9.A) | `/Users/mkbabb/Programming/glass-ui-w9-a` | owns `ConfiguratorLayer.vue`, `ConfiguratorRow.vue`, configurator `index.ts` + CSS rung |
| Lane B — dark-ergonomics (AU.W9.B) | `/Users/mkbabb/Programming/glass-ui-w9-b` | owns `useGlobalDark.ts`, `darkModeSyncScript.ts` (create), `composables/dark/index.ts`, `src/dark.ts` |
| Lane C — size + slides-supply props (AU.W9.C) | `/Users/mkbabb/Programming/glass-ui-w9-c` | owns `button/index.ts`, `select/SelectTrigger.vue`, `dialog/DialogContent.vue`, `cards.css` + their `index.ts`/tests |
| Lane D — motion supply (AU.W9.D) | `/Users/mkbabb/Programming/glass-ui-w9-d` | owns `composables/motion/useCountup.ts` + `vReveal.ts` (create) + `composables/motion/index.ts` — ONLY if FOLD verdict holds (else lane is empty) |

No `CARGO_TARGET_DIR` (Node/Vite repo, not Rust). Each lane runs `npm run typecheck`/`npm run test`/`npm run build` against its own worktree checkout. The orchestrator runs `git worktree list` + `git worktree add` for the lanes before dispatch, owns the `api/index.ts`/`gates.mjs`/`package.json`/`ci.yml`/`CLAUDE.md`/`PROGRESS.md` integration, and dispatches AU.W9.G against the integrated tree AFTER A/B/C/D land (so the tally reflects the real fold set). All lanes branch from the same clean checkout with W8b already committed.

## 5. Agent Units

### AU.W9.A Control-pane A-1 divider + A-2 label ladder — FOLD

- Goal: `ConfiguratorLayer` gains an opt-in inter-row divider rule (A-1) and its `label`/`sub` header binds the semantic typography ladder utilities at the root (A-2), so every pane title in every consumer restyles in lockstep without per-consumer override.
- Mechanism (grounded against HEAD):
  - **A-2 (label ladder).** `ConfiguratorLayer.vue:118` currently hard-codes `class="text-sm font-semibold text-foreground"` on the `<span>{{ label }}</span>` and `:121` `class="truncate text-micro font-mono text-muted-foreground/70"` on `<span v-if="sub">`. Lift the label to a semantic ladder utility — `text-subheading` or `text-label` (`typography.css:287`/the admin-label rung `:351`) — so the pane title reads off the root ladder, not an ad-hoc `text-sm`. Mirror on `ConfiguratorRow.vue:78` (its `<Label class="truncate text-sm font-medium text-foreground">`) so row + section titles share one ladder rung. The `sub` token-reference stays `text-micro font-mono` (already a ladder rung). **A-2 RESTYLES every pane title** → paired-π visual verification (record before/after in `PROGRESS.md`).
  - **A-1 (divider opt-in).** `ConfiguratorLayer.vue:100` already carries `border-b border-border/40 last:border-b-0` on the layer root (a section-boundary hairline). A-1 adds an INTER-ROW divider — an opt-in `dividers?: boolean` prop that, when set, renders a hairline between sibling `ConfiguratorRow`s inside the body (`:150` `configurator-layer-body space-y-2` → add a `[&>*+*]:border-t [&>*+*]:border-border/30` arm gated by the prop, or a `.configurator-layer-body--divided` class). KISS — no new component; one prop, one conditional class.
  - **Precondition (named, per AU.md #30):** the `index.css` budget rebase. If A-1's divider rule is authored in a NEW `src/styles/configurator.css` rung, the `npm run profile:budget` bundle-budget gate must be rebased to admit the new CSS rung. PREFER expressing A-1 as a Tailwind arbitrary/conditional class in the SFC (zero new CSS rung, zero budget rebase) — this dissolves the precondition. Only mint a `configurator.css` rung if the divider needs cascade-ordered specificity the SFC cannot express.
- Files: `ConfiguratorLayer.vue`, `ConfiguratorRow.vue`, `configurator/index.ts` (export the `dividers` prop type if it becomes a public type), optionally `src/styles/configurator.css` + `src/styles/index.css` (only if a CSS rung is minted; else none).
- Sub-gate: no new gate beyond the tally. `proof:au-w9-consumers` carries the A-1 + A-2 entries (consumers: slides configurator pane usage + the glass-ui demo `demo/stories/primitives/configurator.vue` + `demo/stories/blob.vue`); `npm run typecheck` green; `proof:design-idiom-localization` (W8b) stays green (no `text-[var]`/`shadow-[var]` wrap introduced); A-2 paired-π visual verify recorded in `PROGRESS.md`; `npm run profile:budget` green (rebased only if a CSS rung was minted).

### AU.W9.B Dark-ergonomics — `useGlobalDark({initialValue})` + `darkModeSyncScript()` — FOLD

- Goal: `useGlobalDark` accepts an `initialValue` so a consumer can seed the first-paint theme, and a new parse-time `darkModeSyncScript()` primitive emits the inline `<head>` script string that sets the `.dark` class + `color-scheme` BEFORE first paint (the FOUC eliminator), so a `light-dark()`-consuming app does not flash the wrong theme.
- Mechanism (grounded against HEAD):
  - **`initialValue` (#21).** `useGlobalDark.ts:15` is `createGlobalState(() => { const isDark = useDark({ disableTransition: false }); … })` — a memoized zero-arg factory. `useDark` itself takes an `initialValue`. The clean shape: thread an `initialValue?: BasicColorSchema` through to `useDark({ initialValue, disableTransition: false })`. **CAUTION (triumvirate trigger §3a):** `createGlobalState` memoizes the factory — a per-CALL `initialValue` argument has nowhere to land on the singleton. The KISS shape is a module-level `configureGlobalDark({ initialValue })` that MUST be called before the first `useGlobalDark()` (sets a module ref the factory reads), OR accept that `initialValue` is a one-shot seed honored only on first construction. Decide in-lane; if neither is clean, BOOK `#21` and keep only `darkModeSyncScript()` (which alone clears the ≥2 bar via #22's named consumers).
  - **`darkModeSyncScript()` (#22).** Create `src/composables/dark/darkModeSyncScript.ts` — a PURE function returning the inline script STRING (no DOM side-effect; the consumer injects it into their `index.html` `<head>` or SSR head). The script reads `localStorage` + `prefers-color-scheme`, toggles `document.documentElement.classList` + `style.colorScheme`, mirroring the runtime contract `useGlobalDark.ts:50-56` sets so the parse-time and runtime paths agree. vueuse-free by construction (a string emitter — no `@vueuse/core`), so it CAN ride the root barrel if desired; but it homes on `/dark` beside `useGlobalDark` per the existing `installDarkModeSync` precedent (`installDarkModeSync.ts` header — relocated to `composables/dark/` at AP.W3).
  - Export both from `composables/dark/index.ts` + the flat `/dark` subpath (`src/dark.ts`). Publish the public type in `src/api/index.ts`.
- Files: `useGlobalDark.ts`, `darkModeSyncScript.ts` (create), `composables/dark/index.ts`, `src/dark.ts`, `src/api/index.ts`, a `darkModeSyncScript` unit test (the emitted string contains the classList + colorScheme toggle).
- Sub-gate: no new gate beyond the tally. `proof:au-w9-consumers` carries the entry (consumers: speedtest `composables/useAppProviders.ts` + `layouts/PublicDashboardLayout.vue` dark wiring; words `frontend/src/stores/ui/ui-state.ts` + `frontend/src/styles/ios-pwa.css` `color-scheme`). `proof:vueuse-free-root` stays green (`darkModeSyncScript` is vueuse-free; `useGlobalDark` stays on `/dark`, not the root barrel); `npm run typecheck` + the unit test green.

### AU.W9.C Size-vocabulary + slides-supply props — FOLD (size, showClose) / verdict-gated (Card dark arm)

- Goal: ONE size-vocabulary pass adds Button `size="icon-sm"` + Select `size`; Dialog gains a `showClose` prop; Card's `surface="cartoon"` gains its missing dark arm (IF FOLD). Each is an additive, isomorphic, four-state-preserving change.
- Mechanism (grounded against HEAD):
  - **Button `size="icon-sm"` (#17) — FOLD.** `button/index.ts:36-41` has `default`/`xs`/`sm`/`lg`/`icon` but NO `icon-sm`. Add `'icon-sm': 'h-7 w-7 p-0'` (mirroring `icon` `h-10 w-10` at the `sm` height `h-9`→`h-7` register; pick the value to match the existing `xs` height `h-7`). Four-state contract inherited from the base recipe. **Consumer note (RE-GROUNDED):** the speedtest grep hits for `icon-sm` are `size-icon-sm` (a CSS icon-SIZING utility on a `<Maximize2>`/`<SlidersHorizontal>` glyph, e.g. `DashboardMapControls.vue:36`), NOT the Button `size="icon-sm"` prop — so this is a NAMED-FORWARD ≥2: the demand is an icon-only compact dock/toolbar button (slides dock icon buttons + speedtest map controls), but neither cites the prop literally at HEAD. Tally it with the consumer-CONTEXTS (the compact icon-button sites) + a `hygiene` tag (size-vocabulary completeness) so it clears the bar honestly; if the lane cannot name ≥2 context sites, BOOK it.
  - **Select `size` (#20) — FOLD (pairs with #17).** `SelectTrigger.vue:36` hard-codes `h-10`. Add a `size?: "sm" | "default"` prop → `h-9`/`h-10`. **Consumer (RE-GROUNDED):** speedtest `AdminDataSourceToggle.vue:101,132` binds `size="sm"` on a control — the demand is real. Tally with the speedtest site + the glass-ui demo Select story.
  - **Dialog `showClose` (#6 slides-supply) — FOLD.** `DialogContent.vue:126-131` renders an UNCONDITIONAL `<DialogClose>` X button. Add `showClose?: boolean` (default `true`) and `v-if="showClose"` on the close button, so a consumer composing its own header (slides DeckGate — `slides/src/deck/DeckGate.vue`, the hand-composed access modal per AU-AUGMENT §7) can suppress the default X. **Consumer:** slides DeckGate (FG.W-dialog gap, AU-AUGMENT §7) + the glass-ui demo dialog story. Default `true` keeps every existing mount byte-identical (isomorphic).
  - **Card `surface="cartoon"` dark arm (#6 slides-supply) — verdict-gated.** Card ALREADY ships `surface="cartoon"` (`Card.vue` `CardSurface = "glass" | "cartoon"`; the `cartoon-surface` `@utility` at `cards.css:33`). RE-GROUNDED: the FOLD is NOT adding the surface (it exists) — it is adding a DARK ARM to `cartoon-surface` (the offset-stamp shadow + 2px border tuned for dark). Consumers: slides `til-briefing` cartoon-offset usage (`Slide05.vue:155` and siblings re-declare a cartoon shadow locally) + the AU-AUGMENT §7 "7 consumers, liftable" note. **FOLD-IF** the dark-arm tokens are a clean `:where(.dark)` rung over the existing `@utility`; if the lift would re-derive the whole cartoon recipe, BOOK with the named trigger (a 2nd repo wanting the dark cartoon).
- Files: `button/index.ts`, `select/SelectTrigger.vue` (+ `select/index.ts` if the size type is co-exported), `dialog/DialogContent.vue` (+ `dialog/index.ts`), `cards.css` (IF Card dark arm folds), `src/api/index.ts`, `card/__tests__/Card.test.ts` + a dialog `showClose` test.
- Sub-gate: no new gate beyond the tally. `proof:au-w9-consumers` carries each entry; `proof:strict-templates` (W3, `checkUnknownProps:true`) green (the new props are typed); `proof:design-idiom-localization` (W8b) green (no arbitrary wraps); `npm run typecheck` + `proof:components-css` + the unit suites green.

### AU.W9.D Motion supply — `useCountup` + `vReveal` (FG.W-motion) — verdict-gated FOLD

- Goal: a `useCountup` composable + a `v-reveal` directive lift the count-up + reveal motion slides forks locally in `useDeckNav`, so the deck consumes the published primitives rather than its own fork.
- Mechanism (grounded against HEAD): NEITHER exists in glass-ui `src/` at HEAD (grep = 0). slides forks both: `slides/src/deck/useDeckNav.ts:26,39,49,107,113,118` runs the count-up (one site, Slide07's gauge) + replays count-ups on slide-change; `slides/src/decks/til-briefing/SlideFooter.vue:8` inherits a `v-reveal` directive. AU-AUGMENT §7 marks `useCountup`+`v-reveal` as "FG.W-motion, AT-disjoint, can open now" and "forked in useDeckNav → lift". **The ≥2-consumer question:** at HEAD the ONLY real consumer is slides (one deck). `useCountup` has the slides count-up site + the glass-ui demo could add a story, but a demo-story-only second consumer is the overfitting-class. **Honest verdict: `useCountup` and `vReveal` each have ONE real consumer (slides) at HEAD.** Per the ≥2-consumer bar and the prompt's explicit instruction (a 1-consumer item with no correctness tag gets BOOK), these are **BOOK** unless the lane can name a real 2nd consumer (e.g. a speedtest/words metric count-up). If FOLD: home on `composables/motion/` (vueuse-free, root-barrel + `/motion-core`); if BOOK: record the named trigger (a 2nd real count-up/reveal consumer) in the tally as a BOOK row and in `PROGRESS.md`.
- Files (IF FOLD): `composables/motion/useCountup.ts` + `vReveal.ts` (create), `composables/motion/index.ts`, `src/api/index.ts`, unit tests. (IF BOOK: lane is empty; the BOOK rationale lands in `PROGRESS.md`.)
- Sub-gate: no new gate. IF FOLD: `proof:au-w9-consumers` carries the entries with ≥2 named consumers; `proof:vueuse-free-root` green; `npm run typecheck` + unit tests green. IF BOOK: nothing to gate; the tally does NOT list them as FOLD items (so `proof:au-w9-consumers` does not require their evidence).

### AU.W9.G The W9-consumers tally + `proof:au-w9-consumers` gate — SERIALIZES LAST

- Goal: a machine-readable tally enumerates every LANDED W9 fold with ≥2 distinct consumer contexts XOR a correctness/hygiene tag, every cited consumer resolving at HEAD; the born-RED gate reddens on a 1-consumer untagged fold.
- Mechanism (the `AU-gate-fleet-augment.md §7.4` skeleton, verbatim shape):
  - **Author `docs/tranches/AU/audit/W9-consumers.json`** — `{ items: [ { id, consumers: [...], tag? }, … ] }`. One entry per LANDED fold (A-1, A-2, `initialValue` if folded, `darkModeSyncScript`, `icon-sm`, Select `size`, `showClose`, Card dark arm if folded, `useCountup`/`vReveal` if folded). Each entry has `consumers.length >= 2` (distinct repo/file/demo-story contexts) XOR `tag: "correctness" | "hygiene"`. BOOKed items do NOT appear (only FOLDED items are tallied). Named-consumer evidence per §8 below.
  - **Author `scripts/proof-au-w9-consumers.mjs`** on the house template (`scripts/proof-dock-opacity-lockstep.mjs` shape — `cliPaths()`, comment-strip not needed for JSON, a pure exported `detectConsumers(tally, resolves)`, a byte-stable JSON artefact via `scripts/gate-output.mjs` `gateArtifactPath`/`writeGateArtifact`/`snapshotStamp`, a human summary, `process.exit(1)` on violation). The `detectConsumers` body is `AU-gate-fleet-augment.md §7.4`: for each item, assert `consumers.length >= 2 XOR tag ∈ {correctness, hygiene}`; for each named consumer, assert it RESOLVES at HEAD (reuse the resolution idiom from `proof:doc-consistency` — a file path / subpath export / demo-story exists). Cited cross-repo consumers (slides/speedtest/muster/words) resolve against their absolute paths (`/Users/mkbabb/Programming/<repo>/{src,frontend/src}`); a cross-repo path that does not exist FAILS the gate (this is the prompt's "cited consumers must resolve at HEAD").
  - **Born-RED bite-check** (`§7.3`): add a W9 item with a single consumer + no tag (or drop a real consumer so a 2-list becomes a 1-list) → BAR RED. Verify, then revert.
- Files: `docs/tranches/AU/audit/W9-consumers.json` (create), `scripts/proof-au-w9-consumers.mjs` (create), `scripts/gates.mjs` + `package.json` + `.github/workflows/ci.yml` (register, orchestrator-merged).
- Sub-gate: this IS the gate. Register per `§7.5`: `package.json` `"proof:au-w9-consumers": "node scripts/proof-au-w9-consumers.mjs"`; `gates.mjs` row `{ id: "proof:au-w9-consumers", cmd: "proof:au-w9-consumers", tags: ["local","ci"], note: "AU.W9 — each W9 fold names ≥2 distinct consumer contexts OR carries a correctness/hygiene tag (the overfitting bar), and every cited consumer resolves at HEAD. Bite: a 1-consumer untagged fold → RED" }` inserted after the `proof:dock-css-split` row (W8b lands that); `ci.yml` step after the W8b steps. Register ONLY after the tally is born-green (manifest==ci; `node scripts/gates.mjs --verify-ci` green). The W1c registry (`design/AU.W1c-color-gates.md:77`) ALREADY enumerates this gate, so NO registry resync is owed for it.

## 6. Hard Gate

W9 closes when every condition below is evidence-backed:

1. **AU.W9.A** — `ConfiguratorLayer`/`ConfiguratorRow` titles bind the semantic typography ladder (A-2); the A-1 inter-row divider opt-in lands (prop + conditional class, no CSS-rung budget breach unless rebased); A-2 paired-π visual verify recorded in `PROGRESS.md`; `proof:design-idiom-localization` + `npm run profile:budget` green.
2. **AU.W9.B** — `darkModeSyncScript()` emits the FOUC parse-time script string (vueuse-free); `useGlobalDark` accepts `initialValue` (or `#21` BOOKed with rationale if the singleton shape forbids it); both exported on `/dark`; `proof:vueuse-free-root` + `npm run typecheck` + the unit test green.
3. **AU.W9.C** — Button `size="icon-sm"` + Select `size` land (size-vocabulary pass); Dialog `showClose` (default `true`, isomorphic) lands; Card `surface="cartoon"` dark arm lands or is BOOKed; `proof:strict-templates` + `proof:components-css` + `Card.test.ts` + the dialog `showClose` test green.
4. **AU.W9.D** — `useCountup`/`vReveal` land IF a real ≥2-consumer set is named, ELSE BOOKed with the named trigger in `PROGRESS.md` + the tally (BOOK row, not FOLD); `proof:vueuse-free-root` green if folded.
5. **AU.W9.G** — `proof:au-w9-consumers` (`node scripts/proof-au-w9-consumers.mjs`) GREEN + bite-verified (add a 1-consumer untagged item → RED); the `W9-consumers.json` tally lists every LANDED fold with ≥2 distinct consumers XOR a correctness/hygiene tag; every cited consumer resolves at HEAD (cross-repo paths included). Registered in `package.json` + `gates.mjs` (`["local","ci"]`) + `ci.yml` only after the tally is born-green (manifest==ci; `--verify-ci` green).
6. **No regression.** The existing gate matrix stays GREEN through W9: `proof:dock-opacity-lockstep`, `proof:dock-motion-single-source`, `proof:dock-a11y-contract`, `proof:dock-vocabulary`, `proof:dock-css-split`, `proof:design-idiom-localization`, `proof:strict-templates`, `proof:peer-optional`, `proof:vueuse-free-root`, `proof:components-css`, `proof:phantom-classes`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run profile:budget`. `PROGRESS.md` records the wave with a green run id; no `src` edit regresses an existing gate.

**Born-RED gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:au-w9-consumers` | `scripts/proof-au-w9-consumers.mjs` | `["local","ci"]` | add a 1-consumer untagged W9 item (or drop a real consumer) → RED |

Follows the house gate template (`scripts/proof-dock-opacity-lockstep.mjs`): a pure exported detector (`detectConsumers`), a byte-stable JSON artefact via `scripts/gate-output.mjs`, a human summary, `process.exit(1)` on any violation. Registered in `package.json` scripts + `gates.mjs` manifest + `ci.yml` step ONLY after the tally is born-green (`verifyCi()` enforces manifest==ci). The W1c registry already carries the row, so `proof:au-w1-design` stays green without a resync.

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — after AU.W9.B and AU.W9.C land (new props/types), and at close.
- `npm run build` — after AU.W9.A (if a CSS rung is minted) and at close (confirm Lightning CSS + the subpath split absorb any new export).
- `npm run profile:budget` — after AU.W9.A (the A-1 `index.css` budget precondition) and at close.
- `npm run test` (vitest) — after AU.W9.B (the `darkModeSyncScript` test), AU.W9.C (the `Card.test.ts` + dialog `showClose` tests), AU.W9.D (if folded), and at close.
- `proof:au-w9-consumers` + the no-regression existing-gate matrix run after the tally lands and at close.
- `git diff --check` (whitespace/conflict-marker) on the DOCS-edited files (`CLAUDE.md`, `PROGRESS.md`, `W9-consumers.json`) at close.

No formatter is intentionally skipped; the gate fleet is the binding evidence for the folds.

## 8. Verification Artefacts

- `proof:au-w9-consumers` JSON artefact (byte-stable, via `scripts/gate-output.mjs`) — the gate output path under the repo gate-artefact dir.
- `docs/tranches/AU/audit/W9-consumers.json` — the tally itself, with the named consumer evidence per fold:
  - **A-1/A-2**: slides Configurator pane usage + `demo/stories/primitives/configurator.vue` + `demo/stories/blob.vue`.
  - **`darkModeSyncScript`**: speedtest `composables/useAppProviders.ts` + `layouts/PublicDashboardLayout.vue`; words `frontend/src/stores/ui/ui-state.ts` + `frontend/src/styles/ios-pwa.css` (`color-scheme`).
  - **`icon-sm`/Select `size`**: speedtest `AdminDataSourceToggle.vue` (`size="sm"`, compact controls) + the glass-ui demo Select/Button stories (+ `hygiene` tag for size-vocabulary completeness).
  - **`showClose`**: slides `deck/DeckGate.vue` (hand-composed access modal) + the glass-ui demo dialog story.
  - **Card cartoon dark arm** (if folded): slides `til-briefing/Slide05.vue` (cartoon-offset) + the AU-AUGMENT §7 "7 consumers" set.
- The FOLD/BOOK verdict table + the A-2 paired-π visual-verify notes — `docs/tranches/AU/PROGRESS.md`.
- The `:user-invalid` RE-GROUNDING (already-shipped → KILL-as-shipped, no edit) — `PROGRESS.md` (so W10's FINAL does not re-flag it).
- The green CI run id for the wave + the integration commit hashes (per §9) — `PROGRESS.md`.

## 9. Commit Plan

- **Lane A (control-pane) commit** — `feat(tranche-AU): W9 — ConfiguratorLayer A-1 divider opt-in + A-2 typography-ladder titles`. (Body: names the lifted ladder rungs + the divider prop + the paired-π verify.)
- **Lane B (dark-ergonomics) commit** — `feat(tranche-AU): W9 — darkModeSyncScript() FOUC primitive + useGlobalDark initialValue`. (Body: the parse-time script contract + the singleton-seed shape decision; or the `#21` BOOK rationale.)
- **Lane C (size + slides-supply) commit** — `feat(tranche-AU): W9 — Button size=icon-sm + Select size + Dialog showClose + Card cartoon dark arm`. (Body: enumerates the additive props, the isomorphic defaults, the four-state preservation; or the Card-dark-arm BOOK rationale.)
- **Lane D (motion supply) commit** (IF FOLD) — `feat(tranche-AU): W9 — useCountup + v-reveal motion primitives (FG.W-motion)`. (Body: the lifted slides forks + the named ≥2 consumers; ELSE no commit, BOOK recorded in the close commit.)
- **Orchestrator gate + tally commit** — `feat(tranche-AU): W9 — proof:au-w9-consumers tally + gate (born-RED, manifest==ci)`. (Body: the tally items + the gate registration rows + tags + the bite-check.)
- **Orchestrator integration + docs commit** — `docs(tranche-AU): W9 close — PROGRESS green run id + CLAUDE.md new-file lines + FOLD/BOOK verdicts + A-2 visual verify + the :user-invalid re-grounding`. (Body: status/close.)

## 10. Dependencies

- **Depends on**: AU.W8b (the modern-CSS/encapsulation folds; `proof:design-idiom-localization` + `proof:dock-css-split` green — W9's new props must not introduce an arbitrary-wrap that reddens the idiom gate, and `proof:strict-templates` from W3 must be live so the new props are checked). The `modern-web-guidance-crosswalk.md §3.1` Baseline decision (`:user-invalid` Widely 2023-11-02) — folded as the §11 re-grounding.
- **Blocks**: AU.W10 (the close + the 3.3.0 publish). W10's `proof:au-final` asserts the overfitting audit zero-orphans + the gate matrix green; W9's tally + the slides-supply primitives (`showClose`, the size vocabulary, Card dark arm, `useCountup`/`vReveal` if folded) are the publish-gated surface the 3.3.0 changeset carries downstream to slides + value.js K.W3.

## 11. Archaeology

Not a re-attempt of a prior failed wave. Two HEAD-grounding REVERSALS fold into the units (they CORRECT the AU.md/AU-AUGMENT sketches against HEAD — state them plainly, do not paper over):

1. **The `:user-invalid` "KILL→REINSTATE" is a FALSE premise at HEAD.** AU-AUGMENT §6.2 row 1 + the crosswalk §3.1 assert "AU.W3 KILL'd the `.input-pill :user-invalid` rung; reinstate it (Baseline 2023-11-02)." **At HEAD the rung is PRESENT and SHIPPED** — `src/styles/glass.css:256` (the AQ.W4 §W4.1 validity vocabulary: `.input-pill:where(:user-invalid, .user-invalid-fallback)` + the `:user-valid` rung + the `:user-invalid:focus-visible` destructive ring), AND the full `aria-invalid`↔`:user-invalid` JS bridge SHIPS as `src/composables/dom/useUserInvalidAria.ts` (AQ.W4 §W4.4, wired into `Input.vue`, exported on `/forms` + `/api`). The `accessible-error-announcement` recipe AU.W3 was thought to have killed is the recipe glass-ui ALREADY ships. **Disposition: KILL-as-shipped — NO glass-ui W9 edit.** The reinstatement the crosswalk describes is the SLIDES DeckGate's arm (F.W1, OUT per inv-16), not a glass-ui fold. The AU charter §5's own guard ("verified at AU.W3: if present, KILL-as-shipped") is the correct reading; the AU-AUGMENT §6.2 framing inherited the stale "W3 KILL'd it" claim. Record in `PROGRESS.md` so W10's FINAL does not re-mint it.
2. **The Drawer `:native` chronic (AT→AU) is partially DISCHARGED by `Drawer mode="live-behind"`.** AU.md #32 + AU-AUGMENT §3.1 cite muster + speedtest as FIRM ≥2 for a `:native`/`GlassNativeDrawer`. At HEAD muster ALREADY consumes `<Drawer mode="live-behind">` (`muster/frontend/src/components/shell/MobileInstrumentSheet.vue:54` + `App.vue:17`) — the live-behind detented bottom-sheet (the AN.W3 drawer mode). The chronic `:native` ask is for a NATIVE `<dialog>`-backed drawer, a SEPARATE component, NOT the additive prop W9's lean-fold scope admits. Speedtest's `<dialog`/native-drawer grep at HEAD = 0 (it uses dashboard map controls, not a native drawer). **Disposition: BOOK `#32` with the named trigger** (a 2nd real `GlassNativeDrawer` consumer beyond muster's live-behind, which is already served) — folding a new native-drawer COMPONENT is a component-scope expansion (triumvirate trigger §3a), not a W9 lean fold. The chronic is recorded as BOOK in the tally + `PROGRESS.md`, honoring the prompt's "1-consumer / no-2nd-real-consumer item gets BOOK with the named trigger, NOT a forced fold."

Both reversals were verified by direct file read at HEAD (the `glass.css:256` rung, the `useUserInvalidAria.ts` bridge, the muster `MobileInstrumentSheet.vue:54` live-behind mount). No silent paper-over; `proof:au-w9-consumers` enforces the BOOK-vs-FOLD honesty (a BOOKed item is not tallied as a FOLD, so its absent ≥2 evidence cannot false-green).
