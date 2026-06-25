# BD.W-SILHOUETTE-REALIZE — DECIDE the dead `useDockContextSilhouette`: WIRE it onto `<DockNowPlaying>` (+ the D9 generality fold) — not green dead code under a release-gate

**Band 2 · Tier T2 (the wiring node the dock-organism chain sits on — sequenced AFTER `BF.W-DOCK-INTEGRATE` mints the `<DockNowPlaying>` host SFC, BEFORE `BD.W-DOCK-CONSTELLATION` paints the resting `bar+pill` it CONSUMES, BEFORE `BD.W-DOCK-LINK-API`'s `silhouette()` verb delegates to it) · depends: `BF.W-DOCK-INTEGRATE` (the `<DockNowPlaying>` SFC shell — the wiring HOST; the dock root ref + the `#persistent` slot the silhouette reads/writes) · `BE.W-DOCK-FISSION` (the `registerPiece` registrar the descriptor's DETACH leg drives; the `DockSplitContext`→`DockSplitSignature` map this wave demotes) · composes (does NOT re-fork) the SHIPPED `useDockContextSilhouette` engine at HEAD**

> **Ownership fence.** This wave OWNS the descriptor state-machine WIRING + the `setSilhouette` call-sites + the `--silhouette-fuse-t`→`--dock-silhouette-fuse-t` RENAME + the D9 `DockSplitContext` enum-demotion + the `proof:dock-context` C1 gate-amendment. `BD.W-DOCK-CONSTELLATION` CONSUMES the wired `bar+pill` resting paint (never re-calls `setSilhouette`). `BD.W-DOCK-LINK-API` READS the renamed `--dock-silhouette-fuse-t` scalar + DELEGATES its `silhouette()` verb to this wave's wired handle (never re-mints either). The rename + demotion are THIS wave's sole authority.

---

## The defect / the decision

`useDockContextSilhouette.ts` (551L) is the iOS-27 context→silhouette state machine — the declarative `DockSilhouetteDescriptor[]` engine that DIFFs slots by `controlId`, FLIPs survivors rect→rect via the SHIPPED `ElementMorph`+`springTimingFunction`, detaches from-only controls, blooms to-only controls, and melds the now-playing pill DOWN into the tab-bar via `--silhouette-fuse-t`. The Pass-D first-principles audit (`critique/passd-dock.md` §a, `PASSD-FOLD.md` Batch-3) traced it **DEAD at HEAD**:

- **13 `export` symbols, 0 barrel exports, 0 runtime call-sites.** `grep -rn "useDockContextSilhouette" src/ demo/` (excl. the def + the unit test) returns ONLY `demo/stories/dock/examples/AppSwitcher.vue:3` — and that is a *comment* that REJECTS it (`"the silhouette engine is the context-SWITCH state machine — overkill for a single pill→grid morph, so the honest reuse is the bloom"`, AppSwitcher composes `useBloomUp` instead). Nothing CONSTRUCTS the composable.
- **`proof:dock-context` is `["local","ci","release"]` and greens against a composable with zero call-sites** (`gates.mjs:269`). A release-tagged gate that proves the SOURCE SHAPE of code nothing runs is the exact systemic false-green class Pass-D was opened to find — on the dock HALLMARK surface. **Confirmed against the source:** `proof-dock-context.mjs:80-203` is a pure `detectDockContext({silhouetteText})` regex scan of the ONE file's text; its C1 string-matches the four `DockSilhouetteKind` literals (`:90-94`), its self-test bites (`:211-288`) DELETE tokens from a synthetic baseline — **no clause constructs the composable, resolves a call-site, or measures a paint.**

**The two-path bar (J-inv-10, the dead-primitive rule).** A primitive ships IFF ≥2 real consumers, ELSE it is RETIRED-with-rationale. It is FORBIDDEN to ship dead code under a release-gate (the false-green). This wave DECIDES the engine on the EVIDENCE — WIRE or RETIRE, never re-book, never re-green the dead def.

### The decision: **WIRE** (the dead-primitive bar is MET by a real downstream consumer chain)

The AppSwitcher rejection is the WRONG reuse-test (a single pill→grid bloom is `useBloomUp`'s job by construction — a 2-node FLIP, not an N-context state machine). The silhouette engine's REAL consumer is the dock-as-organism context switch, and that chain is GENUINE + already specced downstream:

1. **`BF.W-DOCK-INTEGRATE` / `BD.W-DOCK-NOWPLAYING-PILL`** build `<DockNowPlaying>.vue` — the dock SFC whose home·now-playing·search islands ARE the silhouette's slots. This is the wiring HOST (`UNIFIED-ROSTER.md:39` names W-SILHOUETTE-REALIZE the OWNER of "the descriptor state-machine + fuse-meld + `setSilhouette` wiring").
2. **`BD.W-DOCK-CONSTELLATION`** (`:13,21`) paints its ENTIRE resting steady-state as "the resting `bar+pill` silhouette of the SHIPPED `useDockContextSilhouette` orchestrator" — it CONSUMES the wired silhouette (reads the slots, paints `.dock-constellation-pill`/`.dock-satellite` onto them), and its C4 explicitly FORBIDS re-calling `setSilhouette` (the single-writer fence). A consumer that paints onto a state machine's output is a real consumer — and it can't exist until this wave wires the producer.
3. **`BD.W-DOCK-LINK-API`** (`:24,61,81`) — the `silhouette(toId)` verb DELEGATES to "the dock's `useDockContextSilhouette().setSilhouette()` (the shipped orchestrator W-SILHOUETTE-REALIZE wires)"; its π asserts `link.silhouette('media')` drives the SAME `--dock-silhouette-fuse-t` scalar this wave mints. The facade is a downstream reader of the wiring this wave owns.

So the engine has a real, specced, multi-consumer need the moment it is WIRED. RETIRE would orphan three downstream waves + delete the one honest iOS-27 context-silhouette engine in the dock band. **WIRE.**

But the wire is NOT a no-op import — Pass-D `passd-dock.md` §c traced three blast-radius problems the wiring MUST close in the SAME wave or the release-tagged gate stays red:

- **(c) THE D9 enum-demotion is a PUBLISHED-API break that stick-REDs the gate.** `proof:dock-context` C1 (`proof-dock-context.mjs:90-94`) asserts the four literal `DockSilhouetteKind` members are present in the source. The D9 generality fold (`dock-hub-generality.md:75` H2) DEMOTES the app-feature enum to a `vector`-keyed SHAPE so a public verb is never typed over a closed app-name union. The instant the silhouette `kind` becomes consumer-DATA (not a frozen 4-literal type), C1's `fourKinds` goes false → **C1 reds and STAYS red, release-tagged.** AND `DockSplitContext = "search"|"media"|"nav"` (`useDockFission.ts:56`) is PUBLISHED from `index.ts:122` + `composables/index.ts:65`, is the `Record<DockSplitContext, …>` key (`useDockFission.ts:91-92`), and rides 2 LIVE demo call-sites (`liquid-playground.vue:180` + `DynamicIslandCall.vue:29`, both `DOCK_SPLIT_SIGNATURES.media`). The demotion is a published-API clean break NO union wave models — it owes a MIGRATION row + an `api`/`subpath-enumeration` resync + the gate amendment, all in THIS wave.
- **The `--silhouette-fuse-t` RENAME.** The engine writes `--silhouette-fuse-t` (`useDockContextSilhouette.ts:327`) — the ONE dock scalar breaking the `--dock-*` convention. `UNIFIED-ROSTER.md:39` + `BD.W-DOCK-LINK-API.md:44` name this wave the SOLE owner of the rename to `--dock-silhouette-fuse-t` (clean break, no alias). **At HEAD this scalar is read by ZERO CSS** (`grep -rn "silhouette-fuse-t" src/styles/` → empty; only the composable's own `setProperty`) — so the wiring MUST also mint the CSS that READS it (the `bar+pill` meld), or the fuse scalar is written into the void and the headline fusion never paints.
- **The `cancelRaf`+`clearFlips` interrupt snap (`:344-345`)** hard-clears transforms on every re-entrant `setSilhouette` — a mid-flight re-trigger (the INTERACTIVE path) flashes the box. The wiring MUST re-seat velocity-continuously from the live FLIP state, not snap (the iOS interruptible contract), and the π MUST drive the interactive interrupt (an auto-loop never interrupts itself — `passd-dock.md` §b).

---

## The mechanism

ONE wiring host + ONE rename + ONE enum-demotion + ONE interrupt fix + ONE CSS meld reader. Every leg COMPOSES the shipped engine — this wave re-forks NOTHING (the engine's `ElementMorph`/`springTimingFunction`/`DOCK_SPRING`/slot-diff are byte-untouched except the rename + the interrupt re-seat).

### 1. WIRE the engine into `<DockNowPlaying>` (the dead def gets its first real call-site)

`<DockNowPlaying>.vue`'s `<script setup>` (minted by `BF.W-DOCK-INTEGRATE`) constructs `useDockContextSilhouette` keyed off the dock root ref, with the three-island descriptor map as DATA:

```ts
const dockRoot = ref<HTMLElement | null>(null);        // the .glass-dock root (fuse-scalar target)
const slotRefs = ref<Record<string, HTMLElement>>({}); // home · pill · search control els
const silhouette = useDockContextSilhouette({
    silhouettes: NOWPLAYING_SILHOUETTES,               // the DATA map (below) — bar | bar+pill | split | search
    initial: "bar+pill",                               // the resting steady-state (the constellation's silhouette)
    orientation,                                       // the dim-idiom source (vertical falls out)
    dockRoot,
    resolveControl: (id) => slotRefs.value[id] ?? null,
    registerFissionPiece: dockFission.registerPiece,   // the DETACH leg → useDockFission (BE.W-DOCK-FISSION)
});
// context → setSilhouette (one writer; the single call-site the gate asserts).
watch(() => props.context, (c) => c && silhouette.setSilhouette(c));
defineExpose({ silhouette });                          // the handle BD.W-DOCK-LINK-API takes as an EXPLICIT option
```

`NOWPLAYING_SILHOUETTES` (in `constants.ts` — the colocated DATA home, the `DockSectionDescriptor` precedent) ships ≥1 `bar+pill` descriptor WITH a `fuse: true` slot (the now-playing pill melds into the bar) + the `bar`/`split`/`search` descriptors the home·search islands re-flow through. This is DATA, not a code path (`proof:dock-context` C1's declarative discipline, preserved post-demotion).

The `GlassDock` `:silhouettes`/`:context` pass-through (`BD.W-DOCK-LINK-API` §2) is the GENERIC plain-dock host; `<DockNowPlaying>` is the FLAGSHIP wired surface. Either way the engine is CONSTRUCTED — the dead def gets its first runtime call-site.

### 2. The D9 enum-demotion — `DockSplitContext` app-enum → a `vector`-keyed SHAPE (the published-API clean break)

`DockSplitContext = "search"|"media"|"nav"` is the app-feature overfit (`dock-hub-generality.md` 2a). The PUBLIC verb must take the `DockSplitSignature` SHAPE, never the app NAME:

- **`DockSplitContext` (the TYPE identity) RETIRES** — the public verbs (`split`, the fission `registerPiece` spec) take `DockSplitSignature` (`{vector, neckHold, staggerRank, squishPeak}`, already shipped at `useDockFission.ts:16-39`). A consumer wanting a radial burst that is not "search" passes the SHAPE, never lies with an app-name.
- **`DOCK_SPLIT_SIGNATURES` (the VALUE) SURVIVES as a `Record<string, DockSplitSignature>`** preset-in-consumer convenience — `.media`/`.search`/`.nav` stay reachable VALUES (the 2 live demo call-sites `DOCK_SPLIT_SIGNATURES.media` keep working byte-identically), but they are PRESETS, not the type's identity. The record key widens from the closed union to `string` (or a `DockSplitPresetName` alias that is NOT a required verb-parameter type).
- **`DockSilhouetteKind`** likewise demotes from the closed `"bar"|"bar+pill"|"split"|"search"` union to OPEN consumer-DATA (`string` on the descriptor's `kind`); the four NAMES survive as the shipped `NOWPLAYING_SILHOUETTES` descriptor data + a `DOCK_SILHOUETTE_KINDS` exported preset-array, never a frozen type a public verb requires.
- **The published-API MIGRATION row** (`docs/tranches/BD/MIGRATION.md` + the disposition-register): `DockSplitContext` is REMOVED from `index.ts:122` + `composables/index.ts:65`; consumers re-point a `DockSplitContext` type-annotation to `DockSplitSignature` (the SHAPE) or `keyof typeof DOCK_SPLIT_SIGNATURES` (the preset-name). `proof:subpath-enumeration` + the `/dock` `api` surface re-sync; the registry-consumer probe runs (inv-11 — a published type removed names its successor in the cut notes, never a silent prune).

### 3. The `--silhouette-fuse-t` → `--dock-silhouette-fuse-t` RENAME + the CSS meld READER (the headline fusion paints)

- The composable's `writeFuse` (`:325-328`) re-points `setProperty("--silhouette-fuse-t", …)` → `setProperty("--dock-silhouette-fuse-t", …)` (clean break, no alias — a surviving `--silhouette-fuse-t` literal anywhere in `src/` REDs). The `--dock-*` convention is restored; this is the ONE scalar the rename touches.
- **Mint the CSS that READS it** (`src/styles/dock/silhouette.css`, new) — the `bar+pill` pill→tabbar meld: the now-playing pill's `clip-path` + `translateY` driven off `var(--dock-silhouette-fuse-t)` so its bottom edge MELDS into the bar crown (the engine's headline, `useDockContextSilhouette.ts:18-22`). Compositor-only (`clip-path`/`transform`/`--*` — `proof:no-layout-animation` holds). At rest (`--dock-silhouette-fuse-t` at its `initial-value` / unwritten) the pill paints byte-identical to a pill-above-bar (the no-op floor); the meld engages only when the engine drives the scalar.
- The `@property --dock-silhouette-fuse-t <number>` registration (`tokens/property-regs.css`, `inherits: false`, `initial-value: 0`) so the scalar INTERPOLATES + has a safe rest value (the `--dock-morph-t`/`--border-progress-fill` registered-property precedent).

### 4. The interrupt re-seat — velocity-continuous, not `cancelRaf`+snap (the flash vector closed)

`setSilhouette`'s re-entrant guard (`:343-347`) currently `cancelRaf(); clearFlips()` — an instant transform clear that flashes the box on a mid-flight re-trigger. The fix: a re-trigger MID-FLIGHT re-targets the LIVE `ElementMorph` progress (the survivor FLIPs re-seat from their current `1-eased` delta toward the new `to`-rect, the fuse scalar re-targets from its current value) — the iOS interruptible contract the `useSpringPress`/`useDragMorph` siblings already speak (velocity-continuous re-seat, NOT a CSS-transition restart). `clearFlips` stays the DISPOSE path (scope-dispose + a genuine same-target no-op), never the interrupt path. PRM still seats synchronously (`:407` branch, kept).

### 5. The `proof:dock-context` C1 gate AMENDMENT (the precept-inversion, recorded — not silent)

The released gate cannot both assert the deleted 4-literal type AND wire the demotion. C1 is RE-POINTED in the SAME wave (`passd-dock.md` §c, the load-bearing fix): from "the four literal kinds present in the source" → **"the engine is CONSTRUCTED at a real runtime call-site AND ≥1 preset descriptor of each WIRED kind ships as DATA"**. The amendment converts the gate from a dead-type-literal regex into a live-wiring assertion (below). This is a recorded precept-inversion (a release-gate clause re-pointed because the generality story requires it), carried in the disposition-register + the cut notes — never a silent edit.

---

## The gate — `proof:dock-context` (AMENDED in place — the dead-type regex → a live-wiring + runtime-eval assertion)

`scripts/proof-dock-context.mjs`, `tags: ["local","ci","release"]` (kept; the release tag is now EARNED — it proves live wiring, not dead source shape). The gate is RE-AUTHORED so NO clause is a dead-type-literal presence-regex. The keystone amendment: **C1 resolves a runtime CALL-SITE + dynamically imports the descriptor DATA + the diff core and EVALUATES it** (the spike-1 numeric-harness discipline applied to the slot-diff oracle — `spikes/RESULTS.md` Spike 1: a regex greens a coefficient-flip, a real eval catches it). It is NOT cloned from the old C3-style name-presence shape.

- **C1 — the engine is WIRED at a real runtime call-site (replaces the dead 4-literal regex; the false-green killer).** The gate resolves ≥1 NON-test, NON-def `useDockContextSilhouette(` CALL-EXPRESSION in `src/` (`<DockNowPlaying>.vue`'s `<script setup>`) — a call-expression AST/scan, NEVER a markdown keyword (`BD.W-DOCK-LINK-API` C6 phantom-evidence discipline). A composable with the OLD zero-call-site state REDs (born-RED by construction at HEAD). **The slot-diff is EVALUATED, not name-checked:** the gate dynamically `import()`s `diffSilhouetteSlots` (the exported PURE core, `useDockContextSilhouette.ts:539`) + the shipped `NOWPLAYING_SILHOUETTES` descriptor DATA, runs the diff over the wired `bar`→`bar+pill` descriptor pair, and asserts the classification is CORRECT (the surviving `pill`/`home` controlIds in `survivors`, a from-only control in `detaches`, a to-only in `bloomIns`) — a perturbed descriptor (a controlId typo'd so a survivor mis-classes as a detach) REDs. This is the runtime-eval oracle the Pass-D gate-truth finding demands, on the silhouette axis.
- **C2 — the WIRED kinds ship as DATA (replaces the closed-union literal assert; the D9-demotion reconcile).** The gate imports `NOWPLAYING_SILHOUETTES` + `DOCK_SILHOUETTE_KINDS` and asserts ≥1 descriptor of each wired kind (`bar`, `bar+pill`, `split`, `search`) ships as a DATA preset — NOT that `DockSilhouetteKind` is a closed 4-literal TYPE (the demotion makes `kind` open consumer-data; a frozen `"bar"|"bar+pill"|"split"|"search"` union on the public descriptor REDs the demotion). So the four NAMES survive as proven-shipped DATA while the public TYPE is open — the generality fold + the wiring proven together.
- **C3 — the `bar+pill` FUSION is wired AND its `--dock-silhouette-fuse-t` reader paints.** The `bar+pill` `NOWPLAYING_SILHOUETTES` descriptor carries a `fuse: true` slot AND `writeFuse` writes `--dock-silhouette-fuse-t` (the renamed scalar) AND `src/styles/dock/silhouette.css` READS `var(--dock-silhouette-fuse-t)` in a `clip-path`/`transform` meld rule (a fuse scalar written into the void — no CSS reader — REDs; a `bar+pill` with no `fuse` slot REDs). The rename fence: a surviving `--silhouette-fuse-t` literal in `src/` (the old name, no `--dock-` prefix) REDs.
- **C4 — PRM synchronous seat (kept, re-asserted post-rename).** The `prefersReducedMotion()` branch (`:407`) seats at the target in one step (writes the renamed fuse endpoint, seats detaches). Unchanged mechanism, the scalar name follows the rename.
- **C5 — ONE `DOCK_SPRING`, no fork + orientation-derived slots (kept, byte-fence).** The engine reads `DOCK_SPRING` (`constants.ts:84`, byte-untouched), `slotToRect` derives geometry off `orientation` (the dim-idiom, vertical by construction), no hardcoded `inline-size`/`block-size` literal. A bespoke `(response, ζ)` minted in the file REDs.
- **C6 — the interrupt re-seats velocity-continuous, not `cancelRaf`+snap (the flash vector closed).** The re-entrant `setSilhouette` path re-targets the LIVE FLIP (a `clearFlips()` on the INTERRUPT path — instant transform clear — REDs; `clearFlips` survives ONLY on the scope-dispose path). The detector scans `setSilhouette`'s re-entrant branch for the snap-clear; the π (below) is the binding interactive-interrupt readback.
- **C7 — the D9 published-API demotion is RECONCILED (the clean-break + migration floor).** `DockSplitContext` (the closed TYPE) is GONE from `index.ts` + `composables/index.ts` (a surviving `export … DockSplitContext` from a barrel REDs), `DOCK_SPLIT_SIGNATURES` survives as an exported VALUE (`Record<string, …>`, the 2 demo `.media` call-sites still resolve — the gate import-checks `DOCK_SPLIT_SIGNATURES.media` is a live value), AND a `MIGRATION.md` `DockSplitContext` row + a disposition-register entry exist (the published-prune-names-its-successor floor; a silent type removal with no migration line REDs). `proof:subpath-enumeration`/`api` stay GREEN by the resync.

**Self-test bites (each planted defect MUST red — re-authored off the dead-source baseline onto a WIRED baseline; spike-1 calibration: each bite moves the assertion past its bar, proven):** (a) the engine with ZERO `src/` call-site (the HEAD dead state) → C1 RED (the dead-code bite — the load-bearing one the old gate FAILED to carry); (a2) a `diffSilhouetteSlots` fed a descriptor with a typo'd survivor controlId so the diff mis-classes → C1 RED (the runtime-eval bite — a name-presence regex would MISS this, a real eval catches it); (b) a `bar+pill` descriptor missing from `NOWPLAYING_SILHOUETTES` → C2 RED (the wired-kind-as-data bite); (b2) a public descriptor whose `kind` is re-frozen to a closed 4-literal union → C2 RED (the un-demoted bite); (c) a fuse scalar written but no `silhouette.css` reader → C3 RED (the void-write bite); (c2) a surviving `--silhouette-fuse-t` (un-renamed) literal → C3 RED (the rename bite); (d) a no-PRM-branch → C4 RED; (e) a bespoke `new SpringProgress` / inline `(response, ζ)` → C5 RED; (f) a `clearFlips()` on the interrupt path → C6 RED (the flash bite); (g) a surviving `export … DockSplitContext` barrel line → C7 RED (the un-demoted-published-type bite); (g2) a `DockSplitContext` type removal with NO `MIGRATION.md` row → C7 RED (the silent-prune bite).

**What reds on the pre-fix (HEAD) tree:** C1 (zero `src/` call-site — the dead def), C2 (`NOWPLAYING_SILHOUETTES` DATA absent), C3 (the renamed scalar + `silhouette.css` reader absent; the engine writes the OLD `--silhouette-fuse-t` into the void), C6 (the interrupt snap-clears), C7 (`DockSplitContext` still published as a closed type) — born-RED by construction; GREEN only after the wiring + the rename + the demotion + the interrupt fix + the gate amendment land. (The OLD C1's `fourKinds` literal-match — which greened the dead code — is GONE; it cannot co-exist with the demotion, the precept-inversion this wave records.)

---

## The binding π — `tests-visual/dock-context.spec.ts` (the painted truth, no source-green close)

The W-GESTALT-ROSTER `dock-context` row. Both modes (light + dark) AND the webkit project (`ElementMorph` writes `transform`/`clip-path` on OWN pixels, never `backdrop-filter: url()` — the meld paints on Safari). Over a live backdrop, served at `:5199`, NEVER `reducedMotion` (the live morph arm — except the explicit PRM single-paint arm).

- **Surface:** `demo/stories/dock/dock-nowplaying.vue` (the wired `<DockNowPlaying>` composing `useDockContextSilhouette`).
- **THE bar→bar+pill FUSION (the headline paint):** `silhouette.setSilhouette('bar+pill')` and capture the frame-series — assert the now-playing pill's measured `clip-path`/`translateY` DRIVES off `--dock-silhouette-fuse-t` 0→1 so the pill DOCKS DOWN and its bottom edge MELDS into the bar (the final frame reads as ONE continuous glass plate, not a pill floating above a separate bar — a luminance scan across the pill↔bar seam shows NO gap band at fuse=1).
- **THE surviving-control FLIP:** assert a control present in BOTH `from` and `to` GLIDES rect→rect (the `ElementMorph` compositor delta — a `transform` matrix that interpolates, never a teleport / `display:none` swap). A control present-in-`from`-only DETACHES (drives `useDockFission` — `--dock-split-t` non-zero); present-in-`to`-only BLOOMS in.
- **THE INTERACTIVE INTERRUPT (the flash vector — `passd-dock.md` §b):** mid-flight (at ~40% of a `setSilhouette` transition) fire a SECOND `setSilhouette` to a different context and assert the box does NOT flash — the FLIP re-seats velocity-continuous from its live delta (the transform matrix is continuous across the interrupt, no one-frame snap-to-empty). An auto-loop NEVER exercises this; the π drives the interactive re-press.
- **THE LINK delegation (cross-wave seam):** `link.silhouette('media')` (the `BD.W-DOCK-LINK-API` facade) drives the SAME `--dock-silhouette-fuse-t` this wave's engine writes (the facade delegates to the wired handle, never a second scalar — the single-writer proof).
- **PRM single-paint:** under `prefers-reduced-motion: reduce`, `setSilhouette` SEATS the target in one step (the fuse scalar jumps to its endpoint, survivors at their `to`-rect, detaches seated) — one static frame, zero FLIP frames.

---

## The gestalt row

**Union-roster surface: `dock-context` (the dock context-silhouette as a wired organism).** A FRESH whole-page both-mode `:5199` capture, NEVER `reducedMotion`, surface-hash freshness floor. The gestalt judgement: switching the dock's context RESHAPES its silhouette as ONE continuous glass organism — the now-playing pill DOCKS DOWN and MELDS into the bar (not a pill teleporting above it), surviving controls GLIDE to their new slots, and a mid-flight re-switch flows continuously (no flash). Born-FAIL on HEAD (the engine is dead — nothing reshapes; the demo has no wired silhouette surface); GREEN at this wave's close; W-REFLECT re-confirms on fresh pixels, never the first paint. Wired into the roster by `W-GESTALT-WIRE`.

---

## Fences

- **No green dead code under a release-gate (the J-inv-10 floor — the wave's reason to exist).** The decision is WIRE (not RETIRE) because the consumer chain is real (CONSTELLATION + LINK-API + NOWPLAYING-PILL); the gate now proves the LIVE WIRING (C1 a runtime call-site + a slot-diff EVAL), not the dead source shape. A future regression that severs the wiring (deletes the `<DockNowPlaying>` `useDockContextSilhouette(` call) re-REDs C1 — the dead-code state can never re-green.
- **No re-fork / idiomatic.** The engine's `ElementMorph`/`springTimingFunction`/`DOCK_SPRING`/`slotToRect`/`diffSilhouetteSlots` are byte-untouched except (i) the `--silhouette-fuse-t`→`--dock-silhouette-fuse-t` rename and (ii) the interrupt re-seat (`cancelRaf`+`clearFlips`→velocity-continuous re-target). No second silhouette/spring/rAF engine.
- **Clean break, no alias.** `--silhouette-fuse-t` is GONE (the `--dock-*` convention restored); `DockSplitContext` (the closed TYPE) is GONE (the app-enum demoted to a `vector`-keyed SHAPE); the four kind/context NAMES survive ONLY as DATA presets (`NOWPLAYING_SILHOUETTES`/`DOCK_SPLIT_SIGNATURES`), never as a required verb-parameter type. The MIGRATION row + disposition-register entry are the published-prune floor.
- **The SILHOUETTE-vs-CONSTELLATION ownership split (binding both directions).** THIS wave owns the `setSilhouette` WIRING + the rename + the demotion + the C1 amendment. `BD.W-DOCK-CONSTELLATION` CONSUMES the wired `bar+pill` resting paint (its C4 FORBIDS a second `setSilhouette` call-site). `BD.W-DOCK-LINK-API` READS the renamed scalar + DELEGATES its `silhouette()` verb (never re-mints). A duplicate `setSilhouette('bar+pill')` writer in a CONSUMER REDs its own gate.
- **Presets-in-consumers.** The `NOWPLAYING_SILHOUETTES` descriptor (the app's specific island layout) is the consumer's DATA; the engine + the diff + the fuse-meld CSS + the `--dock-silhouette-fuse-t` scalar are the library's identity. At rest (no `setSilhouette` driven) the dock paints byte-identical to a static pill-above-bar (the no-op floor).
- **The anti-pattern this must NOT become:** WIRING that imports the engine but never CONSTRUCTS it at a runtime call-site (C1 kills it — a re-greened dead def); a demotion that leaves `DockSplitContext` published (C7 kills it); a fuse scalar renamed but written into the void with no CSS reader (C3 kills it); an interrupt that keeps the `cancelRaf`+`clearFlips` snap (C6 kills it — the flash vector); a gate clause that re-checks the deleted 4-literal type instead of the wired call-site (the precept-inversion this wave records to PREVENT).

---

## Disposition links

- **`PASSD-FOLD.md` Batch-3 / `critique/passd-dock.md` §a** (the dead `useDockContextSilhouette` — 13 exports, 0 call-sites, gate-greened) → DECIDED-WIRE. CLOSED.
- **`critique/passd-dock.md` §c / `dock-hub-generality.md` H2** (the D9 enum-demotion stick-REDs C1; `DockSplitContext` published-API break + Record-key + 2 demo call-sites) → the gate amendment + the published-API migration carried IN-WAVE. CLOSED.
- **`critique/passd-dock.md` §b** (the `cancelRaf`+`clearFlips` interrupt snap is a flash vector) → the velocity-continuous re-seat + the interactive-interrupt π. CLOSED.
- **`UNIFIED-ROSTER.md:39`** (W-SILHOUETTE-REALIZE: DECIDE-don't-rebook, wire OR retire, OWNS the state-machine + fuse-meld + rename) → WIRE, the rename + demotion owned here. CLOSED. (Roster names the path `BF.W-SILHOUETTE-REALIZE.md`; this spec lands at `BD.W-SILHOUETTE-REALIZE.md` per the Pass-D author task — the union-prefixed home; the roster row re-points at close.)
- **PROVIDES** the wired `bar+pill` resting silhouette `BD.W-DOCK-CONSTELLATION` CONSUMES (`:13,21`); the wired `setSilhouette` handle + the `--dock-silhouette-fuse-t` scalar `BD.W-DOCK-LINK-API`'s `silhouette()` verb DELEGATES to + READS (`:24,44,61`).
- **DEPENDS on / COMPOSES** `BF.W-DOCK-INTEGRATE` (the `<DockNowPlaying>` host SFC — the wiring home), `BE.W-DOCK-FISSION` (the `registerPiece` registrar the DETACH leg drives + the `DOCK_SPLIT_SIGNATURES` map this wave demotes).
- **AMENDS** `proof:dock-context` C1 (the dead-type-literal regex → the live-wiring + slot-diff-eval assertion) — the recorded precept-inversion, in the disposition-register + the cut notes, never silent.
