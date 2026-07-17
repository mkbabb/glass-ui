# BJ Band — COLOCATION (registry family H · edict A07)

**Status:** DRAFT — for the Fable two-challenge pass. Every unsettled judgment is an
`OPEN:` marker below; resolve before execution.
**Mode:** TRANCHE-DEVELOPMENT. This band writes ONLY this doc; no source moves until execution.
**Family:** H — structure/colocation (A07). Verdict: *canon describes a dead layout; the
colocation edict is ~70% realized and needs the residual moves + a rewritten precept + one
enforcement gate.*
**Census truth sources:**
- `../formation/round-2/colocation-census-edict-a07-src-and-demo-structure-vs-the-co.md` (the 7-move migration shape — 8 findings)
- `../formation/round-2b-confirm/colocation-census-edict-a07.md` (confirmation pass — 9 findings)
- `../formation/round-1/dead-code-and-dual-paths.md` (the 5 dead barrels — finding [minor] dead-aggregation-barrel)

## Band framing — READ FIRST (honest gate posture)

Colocation is a **pure structural refactor**. The shipped bytes must not change. So the gate
posture here is deliberately NOT the born-RED-visual-defect posture of the greenfield bands:

- **Almost every gate in this band is refactor-safety, GREEN before and after** — `typecheck`,
  the root/subpath **public-surface lock** (`tests/public-surface.spec.ts`), the full **vitest**
  suite, and a **byte-identity floor** on the shipped `dist/glass-ui.css` (colocation must not
  perturb one emitted rule or cascade rung). These prove the move was *inert*, not that a defect
  was *fixed*. Say this plainly in every wave; do not dress a refactor-safety gate as born-RED.
- **The ONE born-RED class is the dead aggregation barrels.** Five `index.ts` barrels are
  unreachable dead code at HEAD — the reach probe reds on them TODAY (§ Wave 1, gate G-BARREL-REACH).
  That is the single lawful RED→GREEN differential this band carries.
- **The π/DELTA obligation is INVERTED.** No visual claim is made, so no paint DELTA is owed. The
  affirmative obligation is a **null-DELTA / byte-identity proof**: `dist/glass-ui.css` is
  byte-identical (modulo deterministic `@import`-inlining order that is itself asserted unchanged)
  across the wave boundary. Any move that cannot meet byte-identity (e.g. an accent-tone cascade
  rung shift) must instead prove the reordered rung is equivalent under the documented cascade
  invariant, with a named before/after computed-style probe on the one affected selector family.

## Scope of the band (in / out)

**In:** the residual A07 colocation violations that are library-internal (no public-API break) —
`glass/wave/`, `glass/textureUpload.ts`, `styles/glass/accent-tone.css`, `handmark/` loose
helpers, the `_shared/` 21-entry carve, the 5 dead barrels; the `design-idioms` §3/§7 rewrite to
the shipped truth; the demo demotion of `composables/sidebar/` (Wave 2, carries an export-map
OPEN); and one enforcement gate (Wave 3).

**Out (cross-band — do NOT move blind here):**
- `fourier-field/presets.ts` (dead-obsolete config) and `useStagger` (unbacked external-consumer
  claim) — these are `dead-code-and-dual-paths.md` findings but the REGISTRY files them under
  **family C** (surface-reduction). Retire them THERE; this band only touches the *barrel* half.
- `glass/{backdropLuminanceSample,backdropSampleMath,useGlassBackdropLuminance}.ts` (dock-only
  cluster) and `motion/morph/useDockCtaReceive.ts` (dock-only, public `/motion`) — round-2 relays
  BOTH as **A05 pruning questions**, not blind colocations (the demo `glass-material` story
  showcases the backdrop cluster AS a reusable glass primitive; `/motion` is a published barrel).
  They belong to **family C's QUESTIONS-IN-REDUCTION ask** with a user kill/keep/colocate ruling.
  `OPEN:` if family C declines them, re-file as a Wave-4 colocation tail here.
- `useAccentTone` the composable — DELIBERATELY parked in `/color` behind the value.js quarantine
  (`src/composables/color/index.ts:4-9` header: "the thin value.js-backed leaf … imports value.js
  and no Glass component"). Only its CSS moves (Wave 1). Record the composable as a §9
  deliberate-keep; do NOT force-colocate it into chip.
- The `src/styles/` root grouping nicety (scroll-*.css → `scroll/`, glass-refract/specular →
  `glass/`) — round-2b classes it a `[note]` "grouping nicety, not a true colocation break." Not
  worth a wave; omit unless the Fable pass elevates it.

---

## Wave 1 — BJ.W-COLO-1 · library-internal colocation moves + dead-barrel purge + precept rewrite

**Status:** DRAFT
**Terminal owner:** glass-ui orchestrator
**Depends on:** none (all moves are off-public-barrel; zero export-map impact)

### Mission

Land the four library-internal A07 moves that carry ZERO public-API impact, carve the one
over-long flat dir, delete the five dead barrels, and rewrite `design-idioms` §3/§7 from the
central-partial fiction to the shipped colocate-plus-`@import` truth — in one structural wave, so
the doc never drifts from the tree it describes.

### Exact scope

**Move A — `glass/wave/` → `liquid-grid/` (single consumer, INTERNAL barrel).**
- Source: `src/composables/glass/wave/{waveField.ts, waveField.glsl.ts, waveField.wgsl.ts, index.ts}`.
  `wave/index.ts:1-3` self-describes as "INTERNAL — off the public glass barrel"; the `/glass`
  barrel (`src/composables/glass/index.ts`) does NOT re-export it (round-2 finding
  single-consumer-composable-marooned, round-2b single-component-leaf-in-global-composables).
- Consumers (exactly 3, all liquid-grid, all import the LEAF not the barrel):
  `src/components/liquid-grid/composables/liquidGrid.ts:43`,
  `src/components/liquid-grid/shaders/liquid-grid.glsl.ts:16`,
  `src/components/liquid-grid/shaders/liquid-grid.wgsl.ts:25`.
- Action: `git mv` the three leaf files into `liquid-grid/` (`OPEN:` shape — round-2 offers
  `liquid-grid/composables/wave/` vs round-2b offers `liquid-grid/wave/` vs "fold `.glsl/.wgsl`
  under `liquid-grid/shaders/` and `waveField.ts` under `liquid-grid/composables/`". Recommend the
  fold-into-existing-subtrees option: it needs no new dir and matches the aurora/blob idiom.).
  **DROP** `wave/index.ts` — it is a dead barrel (see Purge D); the consumers already bypass it,
  so the move and the barrel-delete are the SAME action. Rewrite the 3 import paths.

**Move B — `glass/textureUpload.ts` → `aurora/composables/` (single consumer).**
- Source: `src/composables/glass/textureUpload.ts` (8.7 KB). Not exported by `/glass` or `/canvas`
  (round-2 finding, round-2b [minor]).
- Consumers (exactly 3, all aurora): `aurora/composables/auroraImageSource.ts:24`,
  `aurora/composables/wgpuSetup.ts:41`, `aurora/constants/presets.ts:35`.
- Action: `git mv src/composables/glass/textureUpload.ts src/components/aurora/composables/textureUpload.ts`;
  rewrite the 3 `../../../composables/glass/textureUpload` paths to the colocated `./` / `../` form.

**Move C — `styles/glass/accent-tone.css` → `chip/styles.css` (chip-private register).**
- Source: `src/styles/glass/accent-tone.css` (2.6 KB), currently `@import`ed at
  `src/styles/glass.css:63` (rung documented at `glass.css:55-60`). Its `.glass-accent-tone`
  family is driven by `useAccentTone`, whose only appliers are `chip/Chip.vue` +
  `chip/chipVariants.ts` (round-2 finding component-style-marooned; round-2b confirms).
- Action: move the CSS to `src/components/chip/styles.css` (or a new `chip/styles/` if chip already
  has a styles dir — verify at execution) and re-`@import` it from `src/styles/index.css` at chip's
  cascade rung; REMOVE the `glass.css:63` import. **The composable does NOT move** (value.js
  quarantine — see band Scope-out).
- **Cascade-invariant obligation:** the `@import` POSITION, not the file location, is the cascade
  order (this is exactly the truth §7 must be rewritten to — see the precept task). The re-homed
  `@import` must land at a rung where `.glass-accent-tone` resolves identically. If byte-identity of
  `dist/glass-ui.css` cannot be met (rung shift), prove equivalence with a before/after
  `getComputedStyle` probe on the `.glass-accent-tone` idle/active/edge/ink arms.

**Move D — normalize `handmark/` loose helpers → `handmark/composables/`.**
- Source: `src/components/handmark/` has `composables/useHandMark.ts` alongside SIX loose root
  helpers (`brush.ts, freehand.ts, geometry.ts, ink.ts, noise.ts, texture.ts`) plus `constants.ts,
  types.ts` (round-2 finding internal-colocation-inconsistency). Contrast blob/ (all helpers under
  `composables/`) and aurora/ (17 under `composables/`).
- Action: move the six helpers into `handmark/composables/`; keep `constants.ts`/`types.ts` at
  root per convention. Rewrite `HandMark.vue` + `composables/useHandMark.ts` imports.
- `OPEN:` round-2 offers a `handmark/ink/` rendering-sub-family leaf as an alternative to a flat
  `composables/`. Pick the flat `composables/` unless the six form an obvious render pipeline the
  Fable pass wants named — KISS favors flat.

**Carve E — `_shared/` (21 flat entries) → cohesion submodules.**
- Source: `src/components/_shared/` = 21 flat entries (verified count) mixing `.vue/.ts/.css`
  across ≥5 cohesion families with one `index.ts` barrel (round-2 finding oversized-flat-dir,
  round-2b [major] long-flat-dir-no-submodule-carve).
- Carve (round-2b's family split, reconciled with round-2):
  - `_shared/field/` — `fieldControl.ts, valueDomain.ts, control-size.ts, field-control.css, field-surfaces.css`
  - `_shared/menu/` — `menu.css, menuRowClass.ts`
  - `_shared/feedback/` — `FeedbackMark.vue, feedback.ts, feedback-tone.css`
  - `_shared/disclosure/` — `disclosure.css, disclosure-context.ts`
  - `_shared/surface/` — `resolveSurfaceClass.ts, primitive.ts`
  - `_shared/motion/` — `useMotionAxis.ts, interaction.ts, selection.ts`
  - **KEEP at `_shared/` root** (thin core barrel + genuine primitives): `index.ts, class-names.ts,
    floating.ts, axes.ts`.
- **Barrel stability:** keep `_shared/index.ts` re-exporting the moved symbols so NO consumer
  import path outside `_shared/` changes (round-2b: "keep the `_shared/index.ts` barrel stable so
  consumers are unaffected"). Only intra-`_shared` relative paths + the moved-`.css` `@import`
  lines change.
- **`.css` `@import` path updates (cascade POSITION preserved, only the path segment changes):**
  `src/styles/index.css:186` `_shared/feedback-tone.css` → `_shared/feedback/feedback-tone.css`;
  `:203` `_shared/menu.css` → `_shared/menu/menu.css`; `:218` `_shared/field-surfaces.css` →
  `_shared/field/field-surfaces.css`. The ledger comments at `index.css:98,142,153` reference the
  same paths — update them too (family-J doc-truth adjacency).
- **`OPEN: axes.ts is a public export, not a straggler.** `subpath-policy.mjs` CURATED maps
  `axes: "src/components/_shared/axes.ts"` (the `/axes` types-only discovery subpath). round-2
  proposed `axes.ts → _shared/surface/`, round-2b `→ _shared/motion/` — EITHER move breaks the
  CURATED source path + `package.json` `/axes` export + `public-surface` lock. RECOMMENDATION: keep
  `axes.ts` at `_shared/` root (it is a genuine multi-family public leaf, NOT a single-consumer
  straggler) and drop it from the carve list. If the Fable pass insists on moving it, the move
  MUST update `subpath-policy.mjs` CURATED + re-run the surface lock — reclassify it into Wave 2's
  export-map-break class, not this inert wave.

**Precept F — rewrite `design-idioms` §3 + §7 to the shipped truth.**
- `docs/precepts/design-idioms.md:82-135` (§3 `@utility` home-map) points at
  `src/styles/{feedback-tone,menu,cards,dock-controls,instrument-chassis}.css` +
  `src/styles/utilities/animate.css` — ALL SIX GONE (verified: moved to `_shared/*` and
  `<component>/styles.css`). `:218-238` (§7) states "a per-component style lives in a CENTRAL
  partial … NOT in the component's feature-dir" — the INVERSE of the ~15 feature-dir styles
  `@import`ed at `index.css:181-247` (round-2 finding dead-idiom-doctrine, round-2b [major]
  dead-doc-layout, family H member `canon:canon-describes-dead-file-layout`).
- Rewrite to: per-component styles colocate as `<component>/styles.css` (or `<component>/styles/`
  with submodules), `@import`ed from `index.css` at the correct rung — the **`@import` POSITION is
  the cascade order**, so colocation and cascade-safety are NOT in tension. Shared registers a ≥2
  component families compose (or one needing a fixed cascade seat) stay CENTRAL/in `_shared/`
  (`glass-chip.css`, `surfaces-pager.css`, `glass-capsule.css`, `feedback-tone.css`, `menu.css`).
  Delete or repoint the six stale §3 home-map rows to their moved paths.
- `OPEN: single-owner arbitration.` `canon:canon-describes-dead-file-layout` is a member of BOTH
  family H (here) AND family J (doc-truth sweep). ONE wave must own the §3/§7 edit or the two
  bands collide on the same file. RECOMMENDATION: own it HERE (the moves change the truth in the
  same wave; the doc must not lag), and have family J's sweep cite this wave as the §3/§7 owner
  rather than re-editing.

**Purge D — delete the 5 dead aggregation barrels (the born-RED class).**
- Dead barrels (`dead-code-and-dual-paths.md` finding dead-aggregation-barrel; verified zero
  barrel-path importers at HEAD):
  1. `src/composables/index.ts` — unreachable; `src/index.ts` imports `./composables/reactive|dom|glass`
     DIRECTLY, never `./composables`, contradicting this barrel's own `:1-6` header ("so the root
     barrel can pick the vueuse-free leaves"). DELETE (or, if a Fable challenge argues the header
     documents intent, at minimum correct the false header — but no-legacy favors delete).
  2. `src/composables/glass/wave/index.ts` — subsumed by Move A (dropped with the wave move).
  3. `src/composables/glass/webgpu/index.ts` — aurora/blob/fourier import `webgpu/rendererStatus`
     directly; leaves stay, barrel deletes.
  4. `src/components/sortable-list/composables/index.ts` — `SortableList.vue:3` imports
     `./composables/useSortable` directly.
  5. `src/components/typewriter/composables/index.ts` — `TypewriterText.vue:47` imports
     `./composables/useTypewriter` directly.

### Acceptance gates

| gate | posture | probe |
| --- | --- | --- |
| **G-BARREL-REACH** | **BORN RED** | A reach/overfitting scan over `src/**/composables/index.ts` + `src/composables/index.ts` reds on the 5 zero-importer barrels TODAY (grep confirms 0 barrel-path importers for barrels 2-5; `src/index.ts` bypasses barrel 1). RED at wave-open → GREEN after Purge D. This is the band's ONE lawful RED→GREEN differential. |
| G-TYPECHECK | refactor-safety (green↔green) | `npm run typecheck` — all rewritten import paths resolve. |
| G-SURFACE-LOCK | refactor-safety (green↔green) | `tests/public-surface.spec.ts` root+subpath surface UNCHANGED (Moves A–E touch nothing exported; if axes.ts is moved despite the OPEN, this gate reds and the move is misfiled → Wave 2). |
| G-VITEST | refactor-safety (green↔green) | full `npm test` green (behavioral contracts unmoved). |
| G-CSS-BYTE-IDENTITY | inert-move proof (null-DELTA) | `dist/glass-ui.css` byte-identical across the wave for Moves D/E; for Move C, byte-identical OR the rung-equivalence computed-style probe (below) passes. |

### π / DELTA obligation (INVERTED — null-DELTA)

No visual change is claimed, so no paint DELTA is owed. The affirmative proof is byte-identity of
the shipped `dist/glass-ui.css`. The ONE selector family that can shift under a re-`@import`
(Move C, `.glass-accent-tone` idle/active/edge/ink) carries a before/after `getComputedStyle`
probe on a live `<Chip>` in Safari-current + Chrome-current IF byte-identity is not met; equal
computed values within 0 px / exact-string for color = PASS. `git mv` (not delete+create)
everywhere so provenance survives review.

### KISS / parsimony notes

- Fewest moves, gestalt not patchwork: Move A folds the wave-move and its dead-barrel-delete into
  ONE action; the `_shared/` carve keeps the barrel stable so the blast radius is intra-dir + 3
  `@import` lines, not every consumer.
- No aliases, no shims, no legacy re-exports (no-backwards-compat edict). A deleted barrel is
  deleted, not stubbed.
- Do NOT invent new dirs where an existing subtree fits (Move A folds into `liquid-grid/shaders`
  + `composables`; Move D into `handmark/composables`).

### Non-goals

- No public-API change (that is Wave 2). No prop/emit/export edits.
- No visual retune, no token change, no cascade-order change (only `@import` PATH segments move;
  POSITIONS are preserved).
- No touch to the family-C reduction items or the A05 pruning-question clusters.

---

## Wave 2 — BJ.W-COLO-2 · demote `composables/sidebar/` to demo + drop the `./sidebar` export

**Status:** DRAFT — carries the band's ONE public-API break; gated on `OPEN:` rulings.
**Terminal owner:** glass-ui orchestrator
**Depends on:** Wave 1 (clean tree) + the family-B sibling-import census (precondition below).

### Mission

Move the demo-shell TOC/nav machinery out of the shipped library into `demo/`, matching
`demo/composables/virtual/`, and drop the published `./sidebar` subpath — a clean break the
no-backwards-compat edict favors, but a genuine export-map break that MUST ride a major or earn an
explicit user ruling.

### Evidence

- `src/composables/sidebar/` = 9 files (`index, types, useClickDelegate, useLazyLoader, useScrollTo,
  useScrollTracker, useSidebarFollow, useSidebarState, useTreeIndex`). There is NO
  `src/components/sidebar` (round-2 finding demo-concern-living-in-library-src; round-2b [minor]
  demo-shell-machinery-in-shipped-src).
- **Real consumers are demo-only** — verified: `demo/composables/virtual/virtualSectionLayout.ts:12`
  (type import), `demo/stories/navigation/toc-tracking.vue:22`, `demo/stories/dock/dock-search.vue:22`.
- **RECONCILIATION (resolve a census disagreement):** round-2b's [minor] caveat claims a lone src
  reach — `dock/composables/useDockSearch.ts` importing `useScrollTo`. **This is STALE.**
  `useDockSearch.ts` imports from `../../search/composables` (`:53`) and
  `../../../composables/motion/scroll/useScrollChrome` (`:57`); its `useScrollTo` mentions at
  `:30,:102` are COMMENTS, not imports. The only `useScrollTo`-from-sidebar consumer is the DEMO
  story `dock-search.vue:22`. → **zero library consumers** (round-2 primary was right). The
  demotion is clean; no src helper must be minted for a phantom dock reach.
- Published surface: `package.json` `"./sidebar"` export (`:262-264`) + `typesVersions` `sidebar`
  (`:40-41`); `subpath-policy.mjs` classes it CURATED (`:103`) with source
  `sidebar: "src/composables/sidebar/index.ts"` (`:134`); `tests/public-surface.spec.ts:34` imports
  it and `:250-255` locks 4 named exports (`useScrollTracker, useSidebarFollow, useTreeIndex,
  buildTreeIndex`). Vite entry is derived from `subpath-policy` via `libraryEntries()`.

### Exact scope (contingent on the OPEN ruling below)

- `git mv src/composables/sidebar/* demo/composables/sidebar/` (matching `demo/composables/virtual/`).
- Rewrite the 3 demo import sites from `@glass/composables/sidebar[...]` to the demo-local path.
- Drop `./sidebar`: remove the `package.json` export (`:262-264`) + `typesVersions` row
  (`:40-41`); remove `sidebar` from `subpath-policy.mjs` `COMPOSABLE_CLASS` (`:103`) + `CURATED`
  (`:134`); remove the `sidebar` import + 4 surface rows from `public-surface.spec.ts` (`:34,
  :250-255`). No alias, no re-export (clean break).

### The blocking OPEN + its precondition

- **`OPEN: this is an export-map break — it rides a major or needs an explicit user ruling.`** The
  REGISTRY records the user's 2026-07-17 order "First, publish 7.0.0" (Decision-0 CUT-NOW), and
  7.0.0 IS a major. RECOMMENDATION: ride 7.0.0 (active major + no-backwards-compat + the
  demo-shell-machinery evidence all point one way). BUT if 7.0.0's surface is already frozen at
  tag, defer to 8.0.0 with an explicit user ruling — do NOT slip a surface break into a frozen
  cut. **The drafter cannot settle whether the 7.0.0 window is still open; the user must.**
- **PRECONDITION — sibling-import census (the header-ribbon lesson).** In-repo probes are
  structurally blind to undeclared consumers: family B proved `header-ribbon` (a round-1 "prime
  delete") is imported by keyframes.js `EditorShell.vue:116` — an UNDECLARED glass-ui consumer.
  Before dropping `./sidebar`, run the family-B constellation sibling-import census for
  `glass-ui/sidebar` across all sibling repos. A zero-consumer result is required; a hit converts
  this wave into a family-B consumer-relay, not a silent drop.

### Acceptance gates

| gate | posture | probe |
| --- | --- | --- |
| G-SURFACE-DELTA | INTENTIONAL surface change | `public-surface.spec.ts` reflects `/sidebar` REMOVED (the lock is edited in-wave; the diff IS the record). This is NOT born-RED — it is an intended, ruling-gated break. |
| G-ENTRY-CONSISTENCY | refactor-safety | `subpath-policy.mjs`'s three derived views (export map, `libraryEntries()`, fidelity check) agree post-drop; `npm run build` emits no `dist/sidebar.js` and no `./sidebar` key. |
| G-DEMO-TYPECHECK | refactor-safety | demo typecheck green with the 3 rewritten import paths. |
| G-SIBLING-CENSUS | precondition | family-B census returns zero undeclared `glass-ui/sidebar` consumers. |

### π / DELTA obligation

None — no rendered surface changes (the sidebar composables are headless; the demo stories render
identically from the moved path). Byte-identity of `dist/glass-ui.css` holds (CSS untouched).

### KISS / parsimony notes

Clean break, no alias. The move mirrors an existing conforming pattern (`demo/composables/virtual/`)
rather than inventing structure. `useSidebarState.ts` has zero consumers anywhere (round-2b) —
`OPEN:` whether it rides the move or is deleted outright as dead; recommend delete (no-legacy).

### Non-goals

- No behavior change to the composables (headless logic byte-preserved through the move).
- No new public API to "replace" `./sidebar` (it was never a real external contract; do not mint a
  successor).

---

## Wave 3 — BJ.W-COLO-3 · colocation-hygiene enforcement gate

**Status:** DRAFT — contingent on family-A gate budget (`OPEN:` below).
**Terminal owner:** glass-ui orchestrator
**Depends on:** Wave 1 + Wave 2 (the invariant it codifies must already hold, else it reds on
un-migrated debt).

### Mission

Codify the A07 invariant so it cannot silently rot again: a single-consumer composable sitting in
a GLOBAL `src/composables/**` dir (not colocated in its one component, not on a public barrel) is a
hygiene failure. Prefer folding into the existing reach audit over minting a new gate.

### Exact scope (ONE of two forms — the OPEN decides)

**Form A (RECOMMENDED — fold, zero new gate budget):** extend the existing overfitting reach audit
(`docs/audits/overfitting-audit.md`, the ≥2-site / library-orphan rule) with a colocation clause:
a `src/composables/<subtree>/` leaf whose importers are ALL within ONE `src/components/<x>/` AND
which is not re-exported by any public subpath (per `subpath-policy.mjs`) = FAIL, "colocate into
`<x>/`." Reuses the reach machinery; spends no gate from family A's tight ~45-55 keep-list.

**Form B (only if family A wants a standalone static gate):** a new
`proof:colocation-hygiene` in `scripts/` asserting the same predicate, wired into the vitest gate
surface. This SPENDS a gate slot — justify it against `gate-soundness.md`'s overshoot verdict
(~1032 → 45-55) before adding.

Either form must WHITELIST the legitimate module-level composables the census cleared so it does
not false-fail: `composables/color/` (3 consumers — aurora/blob/fourier-field),
`composables/glass/procedural/` (7 consumers), and the CURATED public barrels
(`dark, keyboard, motion, motion-core, sidebar`-if-kept). The predicate keys on
single-consumer-AND-not-public, exactly the wave/textureUpload profile.

### Gate posture — NOT born-RED (honest)

By the time this wave lands, Waves 1–2 have already cured every violation the gate would catch
(`wave`, `textureUpload` colocated; `sidebar` demoted). So the gate is **GREEN at introduction** —
it is a *regression fence*, not a RED→GREEN differential. Do NOT dress it as born-RED.
- `OPEN: if a born-RED differential is desired for this gate, sequence it BEFORE Wave 1` — then it
  reds on `glass/wave/`, `glass/textureUpload.ts`, and (pre-demotion) `composables/sidebar/`, and
  the moves turn it green. The drafter's recommendation is the reverse (gate LAST, as a fence),
  because the born-RED budget for this band is already spent honestly by G-BARREL-REACH.
- `OPEN: the backdrop-luminance + useDockCtaReceive clusters` are single-consumer-in-global TODAY
  but are family-C A05 pruning questions, not this band's moves. If they are still un-migrated when
  this gate lands, the gate WILL red on them. Either (a) exempt them via an evidence-doc allowlist
  pending the family-C ruling, or (b) block this wave until family C rules. Recommend (a) with a
  dated allowlist entry so the debt is visible, not hidden.

### The controlling OPEN

**`OPEN: new gate vs fold — family A owns the final call.`** `gate-soundness.md` mandates the
collapse to ~45-55 invariant gates and its keep-list does not name a colocation gate; family A's
own wave-candidate (3) lists NEW hygiene gates (token-hygiene, orphan-CSS-partial,
prop-granularity) but NOT colocation. So this gate is a *budget request* to family A. Default to
Form A (fold) unless family A explicitly grants a slot. If family A declines both, this wave
collapses to a documentation-only addendum in `overfitting-audit.md` (the manual audit already
runs at tranche close per the overfitting-audit MEMORY edict).

### Acceptance gates

| gate | posture | probe |
| --- | --- | --- |
| G-HYGIENE-GREEN | regression-fence | the gate PASSES on the post-Wave-2 tree (all colocation debt cured) and FAILS on a synthetic single-consumer-in-global fixture (the mutation-bite that proves it can fail). |
| G-NO-FALSE-FAIL | correctness | the gate does NOT flag `color/`, `glass/procedural/`, or the CURATED barrels. |
| G-BUDGET | family-A concurrence | Form B only: the added gate is inside family A's ratified ~45-55 keep-set. |

### π / DELTA obligation

None (tooling/gate wave, no rendered surface).

### KISS / parsimony notes

Fold over invent (Form A). One predicate, one allowlist. The mutation-bite (a synthetic
single-consumer leaf) is the honest liveness proof the gate ruling wants — a gate that cannot fail
is theater (`gate:vacuous-no-assertion`).

### Non-goals

- No re-litigating the family-A collapse here; this wave only asks for ONE slot or a fold.
- No enforcement of the A05 pruning-question clusters (family C owns their disposition).

---

## Band roll-up — born-RED ledger + open questions

**Born-RED gates (the ONE lawful RED→GREEN differential in this band):**
- **G-BARREL-REACH** (Wave 1) — the reach/overfitting scan reds on 5 zero-importer barrels at HEAD
  (`src/composables/index.ts`, `glass/wave/index.ts`, `glass/webgpu/index.ts`,
  `sortable-list/composables/index.ts`, `typewriter/composables/index.ts`); GREEN after Purge D.

**Everything else is refactor-safety / inert-move proof** (typecheck, public-surface lock, vitest,
`dist/glass-ui.css` byte-identity) — GREEN before and after. Stated honestly per the band framing;
no refactor gate is dressed as born-RED.

**OPEN markers for the Fable two-challenge pass:**
1. Move A dir shape — `liquid-grid/wave/` vs `liquid-grid/{composables,shaders}/` fold (rec: fold).
2. Move D shape — `handmark/composables/` flat vs a `handmark/ink/` render leaf (rec: flat).
3. Carve E — `axes.ts` is the `/axes` public entry; keep it at `_shared/` root (rec) or accept the
   export-map touch (then it belongs in Wave 2's break class, not the inert wave).
4. Precept F — single-owner arbitration of §3/§7 between family H (here) and family J (rec: own here).
5. Wave 2 — the `./sidebar` drop is an export-map break: ride 7.0.0 (rec, if the window is open) or
   defer to 8.0.0 by explicit user ruling; the drafter cannot settle the window state.
6. Wave 2 — `useSidebarState.ts` (zero consumers) rides the move or is deleted (rec: delete).
7. Wave 2 precondition — the family-B sibling-import census must clear `glass-ui/sidebar` before
   the drop (the header-ribbon undeclared-consumer lesson).
8. Wave 3 — fold into `overfitting-audit` (Form A, rec) vs a new `proof:colocation-hygiene` gate
   (Form B); family A owns the budget call.
9. Wave 3 — the backdrop-luminance + `useDockCtaReceive` clusters (family-C A05 questions) will red
   the hygiene gate if un-migrated; allowlist-with-date (rec) vs block-on-family-C.
10. Cross-band boundary — `fourier-field/presets.ts` + `useStagger` are dead-code findings but
    family C's to retire; confirm C claims them so they are not double-owned or dropped.

**Lead adjudication (2026-07-17, perfection pass): the Fable colocation amendments 1-12
(`../formation/perfection/FABLE-COLOCATION.md` §4) are ADOPTED-BINDING on this band; the doc's §1
principles become the band's canon text and its §2 target tree + §3 migration delta are the
band's execution reference.** Headlines: Move A superseded (glass/wave/ DELETES with liquid-grid);
accent-tone re-homes to chip/ but keeps its glass-band @import rung (cascade position ≠ file
location); handmark helpers go flat to composables/; the _shared carve tightens to
field/feedback/menu/disclosure with the cross-cutting vocabulary flat at root; the barrel-
stability premise is struck (true blast radius ~25 leaf rewrites + 5 @imports, stated honestly);
axes.ts KEEP-root (surface lock untouched); /sidebar drops ride 8.0.0 and carry the 4-file
test-mirror tail; Purge D = exactly four barrels; the test-mirror's dead ui/custom taxonomy
flattens as low-priority hygiene; dockContext re-home is CONDITIONAL on the reduction band's
cycle resolution — this band does not move it.
