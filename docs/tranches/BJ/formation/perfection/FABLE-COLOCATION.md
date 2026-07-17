# BJ perfection — FABLE-COLOCATION (family H · edict A07)

**Seat:** Fable perfection — *where everything lives* (the reduction seat owns *which components
survive*; the seam between us is stated in §6). **Mode:** TRANCHE-DEVELOPMENT — this file is the
only artefact; nothing in `src/` moves.
**Purpose:** elevate the round-2 mechanical census into a perfected structural design — the target
tree that GENERATES itself, the migration delta that never passes through a broken import, the ≤8
principles that become the band's canon, and the perfection check of what the census could not see
because it only read directory listings, not import closures or the test tree.

**Evidence base walked in full:** the real `src/` (68 component dirs + `src/composables/**` +
`src/styles/**`), `demo/` (`stories/` `chassis/` `shell/` `composables/`), `tests/` (the parallel
mirror), `package.json` exports, `scripts/lib/subpath-policy.mjs`, `src/styles/index.css` +
`src/styles/glass.css` cascades, and every consumer grep cited inline. Grounded against
`BAND-COLOCATION.md`, the round-1/round-2/round-2b digests, `REGISTRY.md` family H,
`CHRONIC-ADJUDICATION.md`, and `ADJUDICATION-1.md`.

---

## 0. Standing rulings this design obeys (contradicting none)

1. **`liquid-grid` DELETE wins** — `ADJUDICATION-1.md:9-13` ruling 1: zero consumers anywhere;
   `BAND-REDUCTION W3` owns the component + `/liquid-grid` export + story deletion. This is
   DECIDED, not pending. **Consequence for us (§4 Amendment 1):** `glass/wave/` is consumed ONLY by
   `liquid-grid` (verified — the sole importers are three `liquid-grid` files), so when liquid-grid
   dies the wave leaf is orphaned dead code. BAND-COLOCATION's Move A "fold `glass/wave/` INTO
   liquid-grid" is superseded — you cannot fold into a deleted host. The perfected action is
   **DELETE `glass/wave/`**, sequenced after (or with) the liquid-grid deletion.
2. **`./sidebar` drop rides the BJ major (8.0.0), not 7.0.0** — `ADJUDICATION-1.md:17-19` ruling 3:
   the 7.0.0 window is CLOSED; the drop rides the BJ cut's own major after the family-B sibling
   census clears. BAND-COLOCATION Wave 2 OPEN-5 is thereby SETTLED (§4 Amendment 8).
3. **`proof:no-test-in-src` (AV.W14)** — `vitest.config.ts`: "all tests live under the top-level
   `tests/` tree (mirrors `src/`); none remain in `src/`." Tests are DELIBERATELY a parallel mirror,
   gate-backed. The recursive edict is satisfied for tests by the mirror being *internally*
   cohesion-partitioned — **not** by colocating `*.test.ts` into `src/`. Any test-tree amendment
   below stays inside `tests/` (§5 finding P4).
4. **No-backwards-compat / presets-in-consumers / direct-leaf-import house style** — the five dead
   barrels are deleted, not stubbed; a moved leaf's consumers are rewritten, not aliased.

---

## 1. The principles, distilled (≤8 — the band's canon text)

These GENERATE the target tree; a future addition self-places by walking them in order.

1. **Own-or-share, decided by real consumers.** An artefact colocates in the ONE component that
   consumes it; it lives in a shared home (`_shared/` for TS, a central `src/styles/*` register for
   CSS, a module-level `src/composables/<domain>/` for logic) ONLY when ≥2 genuine consumers reach
   it. "Genuine" = an actual `import`, proven by grep, not a name that merely *sounds* shared.
   (`glass/textureUpload.ts` = aurora-only → colocate; `glass/procedural/` = 7 components → stays
   shared; `color/` = aurora+blob+fourier → stays shared.)
2. **The component is the unit; its subtrees are fixed and named.** A component dir is
   `<name>/<Name>.vue + index.ts + README.md?` at root, with `composables/`, `constants[.ts|/]`,
   `shaders/`, `styles[.css|/]` beside it as the load demands. Helpers live under `composables/`,
   never loose at the component root (the aurora/blob/dock gold standard; the handmark violation).
3. **`@import` POSITION is the cascade order — file LOCATION is not.** A per-component stylesheet
   colocates as `<component>/styles.css` (or `<component>/styles/`) and is `@import`ed from
   `src/styles/index.css` at its correct rung. Colocation and cascade-safety are never in tension
   (proven by the ~15 feature-dir styles already `@import`ed at `index.css:181-229`). Refutes
   `design-idioms` §7's central-partial doctrine outright.
4. **Every styles partial sits inside an `@import` closure — no orphans.** A `src/**/*.css` reached
   by nothing in the `index.css`/`glass.css` closure is dead in `dist` even though its classes are
   emitted onto live elements. Placement is incomplete until the `@import` line exists at the right
   rung. (The `glass-chip.css`/`glass-atom.css` shipping defect is precisely this failure — §5 P1.)
5. **Public source paths are load-bearing; a move that touches one is not inert.** `subpath-policy.mjs`
   (`CURATED`/`COMPOSABLE_SUBPATHS`) pins exact source paths for the export surface (`axes` →
   `_shared/axes.ts`, `canvas` → `glass/canvas2d/index.ts`, `fourier-math` →
   `fourier-field/math.ts`, `sidebar` → `composables/sidebar/index.ts`). Moving such a file is an
   export-map edit that re-runs the surface lock — it belongs in the ruling-gated wave, never the
   inert one. Everything else moves silently.
6. **Barrels earn their existence by being imported.** The house style is DIRECT-LEAF import. A
   barrel with zero importers is dead code to delete; a barrel that re-exports one symbol while
   consumers bypass it to the leaves is not a stability shim to lean on. Do not add a re-export
   barrel to "absorb" a move — that recreates the dead-barrel disease the band is curing.
7. **Long, mixed-concern dirs carve by COHESION, keeping high-fan-in vocabulary flat.** Break a dir
   only where a genuine feature cluster exists (`field/` `feedback/` `menu/` `disclosure/`). Pure
   cross-cutting vocabulary and primitives (`class-names`, `axes`, `primitive`, `selection`,
   `interaction`, `floating`) stay flat at the root — carving them buys churn, not cohesion, and
   may break a public source path. Cohesion ÷ churn is the test, not raw file count.
8. **Demo/app concerns live in `demo/`; the library ships only what a consumer composes.** A
   composable with no owning component and only demo consumers is demo-shell machinery, not a
   published surface (`composables/sidebar/` → `demo/composables/sidebar/`, matching the conforming
   `demo/composables/virtual/`). Its tests follow it into `tests/demo/`.

---

## 2. The perfected target tree

The tree is shown at the resolution that matters — the canonical shape (2a), then the dirs that
CHANGE (2b–2f). The ~40 already-conforming components (`avatar/ button/ card/ drawer/ tabs/ dock/
aurora/ blob/ …` per round-2b) keep their shape verbatim and are not redrawn.

### 2a. The generative component shape (canon — Principle 2)

```
src/components/<name>/
  <Name>.vue            ← the SFC (scoped CSS stays inline; the build folds it into dist)
  index.ts              ← the public barrel (feeds subpath-policy PUBLISH/INTERNAL/CURATED)
  README.md             ← design intent (optional; DESIGN.md for the god-modules)
  constants.ts | constants/   ← config/presets/types when it grows past one file
  composables/          ← ALL logic helpers (never loose at root)
  shaders/              ← *.glsl.ts / *.wgsl.ts (procedural components)
  styles.css | styles/  ← component-private CSS, @imported from index.css at its rung
```

### 2b. `src/composables/**` — after the residue is colocated/deleted

```
src/composables/
  color/                 KEEP  (PUBLISH /color — aurora+blob+fourier; the model shared leaf)
  context/               KEEP  (INTERNAL — DI factory)
  dark/                  KEEP  (CURATED /dark)
  dom/                   KEEP  (PUBLISH /dom)
  keyboard/              KEEP  (CURATED /keyboard)
  motion/                KEEP  (CURATED /motion, /motion-core)
    morph/useDockCtaReceive.ts   ⟂ CONDITIONAL — family-C A05 question (see §6); NOT moved here
  reactive/              KEEP  (PUBLISH /reactive)
  glass/                 KEEP  (INTERNAL substrate) — residue resolved:
    canvas2d/            KEEP  (→ /canvas public)
    procedural/          KEEP  (7 consumers — genuine shared)
    webgl/  webgpu/      KEEP  (multi-consumer substrate)   webgpu/index.ts ✗ DELETED (dead barrel)
    specular*, vSpecular, ambientHueHistogram   KEEP (multi-consumer)
    backdropLuminanceSample.ts, backdropSampleMath.ts,
      useGlassBackdropLuminance.ts             ⟂ CONDITIONAL — dock-only cluster, family-C (§6)
    textureUpload.ts     ✗ MOVES → components/aurora/composables/  (aurora-only)
    wave/                ✗ DELETED with liquid-grid (ruling 1) — NOT moved
  index.ts               ✗ DELETED (dead root barrel; src/index.ts imports the leaves directly)
  sidebar/               ✗ DEMOTED → demo/composables/sidebar/  (8.0.0 wave; ruling 3)
```

### 2c. `src/components/_shared/` — the perfected carve (tighter than the census)

```
src/components/_shared/
  index.ts               KEEP  (barrel — re-exports controlSizeClass only, today; see P2)
  class-names.ts         KEEP root  (168 importers — cross-cutting primitive)
  primitive.ts           KEEP root  (52 importers — AsTag/Dir vocabulary; NOT surface/)
  axes.ts                KEEP root  (28 importers + the /axes PUBLIC source — MUST NOT move)
  selection.ts           KEEP root  (23 importers — SelectionValue/CheckedState vocabulary)
  floating.ts            KEEP root  (10 importers — FloatingSide/Align vocabulary)
  interaction.ts         KEEP root  (8 — PointerDownOutside* vocabulary; imports selection)
  useMotionAxis.ts       KEEP root  (7 — no cohesive motion cluster to justify a dir)
  resolveSurfaceClass.ts KEEP root  (6 — 1-fn surface resolver over axes; pairs with the grammar)
  control-size.ts        KEEP root  (the barrel's one live export)
  field/                 CARVE  fieldControl.ts · valueDomain.ts · field-control.css · field-surfaces.css
  feedback/              CARVE  FeedbackMark.vue · feedback.ts · feedback-tone.css
  menu/                  CARVE  menuRowClass.ts · menu.css
  disclosure/            CARVE  disclosure-context.ts · disclosure.css
```

*(Fan-in counts are LEAF-PATH imports, not barrel imports — the only valid basis, since
`_shared/index.ts` re-exports one symbol. Counts here are src+demo+tests grep; the DAG seat's
src-only counts — class-names 133, primitive 50, axes 27, selection 20 — agree directionally. Both
seats concur: `primitive` and `selection` must NOT relocate.)*

Root drops 21 → 13 entries (under the ~15 threshold), all genuine cross-cutting vocabulary; only
four LOW-fan-in cohesive feature clusters carve. The census's `surface/` and `motion/` submodules
are DROPPED (§4 Amendment 5): they bundled the 52-fan-in `primitive.ts`, the public `axes.ts`, and
23-fan-in `selection.ts` into weak groupings — 121 rewrites and a broken `/axes` source path for no
cohesion. This carve is ~25 TS rewrites + 5 css `@import` path edits.

### 2d. `chip/`, `aurora/`, `handmark/` — the colocation targets

```
src/components/chip/
  Chip.vue · index.ts · chipVariants.ts · README.md
  accent-tone.css        ← MOVED from styles/glass/accent-tone.css (chip-private; useAccentTone
                            stays in /color — the value.js quarantine, §4 Amendment 3)
  (glass-chip.css stays CENTRAL — 2 consumers chip+combobox; its MISSING @import is family G/A, §6)

src/components/aurora/composables/
  textureUpload.ts       ← MOVED from composables/glass/textureUpload.ts  (rewrite 3 aurora imports)

src/components/handmark/
  HandMark.vue · index.ts · README.md · constants.ts · types.ts        (constants/types stay root)
  composables/
    useHandMark.ts       (existing)
    brush.ts freehand.ts geometry.ts ink.ts noise.ts texture.ts   ← MOVED from handmark/ root
```

### 2e. `src/styles/**` — unchanged except the accent-tone rung (Principle 4 seam noted)

`styles/glass/accent-tone.css` leaves for `chip/accent-tone.css`; its `@import` re-homes from
`glass.css:63` to `index.css` at a rung that reproduces `.glass-accent-tone`'s glass-band cascade
position (§4 Amendment 3). `glass-chip.css` + `glass-atom.css` remain in `styles/glass/` as shared
registers — their closure fix is family G/A's born-RED wave, not this band (§6). The
`glass-refract.css`/`glass-specular-track.css` root-vs-`glass/` and `scroll-*.css` grouping niceties
stay OUT (round-2b `[note]`; agree with the draft — module-level cascade files, no per-component
ownership at stake).

### 2f. `demo/` + `tests/` placement

```
demo/composables/
  virtual/               (existing — the conforming demo-local model)
  sidebar/               ← MOVED from src/composables/sidebar/ (8 files; useSidebarState.ts DELETED
                            as dead — zero consumers anywhere, verified)
tests/
  demo/
    sidebar/             ← MOVED from tests/composables/sidebar/ (4 files follow their subject; §5 P4)
  components/
    <name>/              ← FLATTENED from components/{ui,custom}/<name>/ (P4 — the mirror's dead
                            ui/custom taxonomy; src/components is flat)   [optional hygiene wave]
```

---

## 3. The migration delta (current → target)

Sequenced so the tree never passes through a broken import state. Each row: from → to, the rewrite
count, and any export-map edit. Waves 1a–1e are byte-inert (off-public); Wave 2 is the one
ruling-gated surface break.

| # | from | to | rewrites | export-map edit |
|---|------|----|----------|-----------------|
| **1a** | `composables/glass/textureUpload.ts` | `components/aurora/composables/textureUpload.ts` | 3 aurora imports (`../../../composables/glass/textureUpload` → `./`/`../`) | none (off-public) |
| **1b** | `components/handmark/{brush,freehand,geometry,ink,noise,texture}.ts` | `components/handmark/composables/` | HandMark.vue + useHandMark.ts imports (intra-dir) | none |
| **1c** | `styles/glass/accent-tone.css` | `components/chip/accent-tone.css` | move `@import` from `glass.css:63` → `index.css` at the glass-band rung (Amendment 3) | none (CSS, not a JS subpath) |
| **1d** | `_shared/{fieldControl,valueDomain}.ts`+`field-*.css`; `{FeedbackMark.vue,feedback.ts,feedback-tone.css}`; `{menuRowClass.ts,menu.css}`; `{disclosure-context.ts,disclosure.css}` | `_shared/{field,feedback,menu,disclosure}/` | ~25 direct-leaf TS imports + 5 `index.css` `@import` path segments (`:186,:203,:218` + ledger `:98,:142,:153`) | none (`axes.ts`/`primitive.ts` stay root → `/axes` intact) |
| **1e** | delete `composables/index.ts`, `glass/webgpu/index.ts`, `sortable-list/composables/index.ts`, `typewriter/composables/index.ts` (4 dead barrels) | — | 0 (already bypassed by direct-leaf imports) | none |
| **1f** | `composables/glass/wave/` (4 files incl. `index.ts` — the 5th dead barrel) | **DELETE** (with/after `BAND-REDUCTION W3` deletes liquid-grid; ruling 1) | 0 after liquid-grid is gone (its 3 importers deleted first) | none (wave never exported; `/liquid-grid` drop is BAND-REDUCTION's) |
| **2** | `composables/sidebar/*` (9 files; `useSidebarState.ts` DELETED as dead) | `demo/composables/sidebar/` | 3 demo import sites; 4 `tests/composables/sidebar/*` → `tests/demo/sidebar/` (rewrite `@glass/composables/sidebar` → demo path); `public-surface.spec.ts:34,:250-255` rows removed | **DROP `./sidebar`:** `package.json` exports `:262-264` + typesVersions `:40-41`; `subpath-policy.mjs` `COMPOSABLE_CLASS.sidebar` + `CURATED.sidebar`. Rides 8.0.0. |
| **2-opt** | `tests/components/{ui,custom}/<name>/` | `tests/components/<name>/` | dir moves only; tests import via `@glass` (absolute) so subjects don't break; check intra-test relative helpers | none (tests don't ship) |

**Sequencing law.** Within Wave 1, order is free EXCEPT 1f: liquid-grid's three wave-importers
(`liquid-grid/composables/liquidGrid.ts:43`, `shaders/liquid-grid.glsl.ts:16`,
`shaders/liquid-grid.wgsl.ts:25`) must be deleted by BAND-REDUCTION W3 BEFORE the wave leaf is
removed, else typecheck reds mid-flight. Wave 2 runs last, after the family-B sibling census clears
`glass-ui/sidebar` (the header-ribbon undeclared-consumer lesson) and inside the 8.0.0 cut.

**Export-map consequences (complete).** Exactly TWO, and this band owns only the second:
- `/liquid-grid` drops — owned by `BAND-REDUCTION W3` (ruling 1); we only note the seam.
- `/sidebar` drops — the sole export-map edit this band owns (Wave 2, 8.0.0). `axes.ts` staying at
  `_shared/` root keeps `/axes` and the surface lock UNTOUCHED — the deliberate reason the carve
  does not move it.

---

## 4. Numbered amendments to BAND-COLOCATION (appendable verbatim)

> **Amendment 1 (Move A — SUPERSEDED by ruling).** `ADJUDICATION-1.md` ruling 1 DELETEs
> `liquid-grid` (zero consumers; `BAND-REDUCTION W3`). `glass/wave/`'s only importers are three
> liquid-grid files, so the "fold `glass/wave/` into liquid-grid" action is void — there is no host
> to fold into. Replace Move A with: **DELETE `src/composables/glass/wave/` (all 4 files),
> sequenced after BAND-REDUCTION W3 removes the three liquid-grid importers.** The wave leaf and its
> dead `index.ts` barrel die together. If liquid-grid unexpectedly survives, fall back to the
> fold-into-`liquid-grid/{composables,shaders}` shape. Move A's OPEN dir-shape question is moot.

> **Amendment 2 (Move A dir-shape OPEN — CLOSED).** Consequent to Amendment 1, BAND-COLOCATION
> OPEN-1 (`liquid-grid/wave/` vs the fold) is struck.

> **Amendment 3 (Move C — cascade rung corrected).** `accent-tone.css` currently `@import`s at
> `glass.css:63`, INSIDE the glass material band (between `grain-overlay.css:58` and `rim.css:64`).
> Its `.glass-accent-tone` register decorates the glass surface and must keep that early rung. So
> the re-home is `chip/accent-tone.css` `@import`ed from `index.css` DIRECTLY AFTER the glass band
> (near `:180`), NOT at chip's late component rung (`:181+`) — placing it late shifts its cascade
> position and fails byte-identity / the computed-style invariant. File location = chip; `@import`
> position = glass band (Principle 3 in action). Keep the `useAccentTone`-stays-in-`/color` §9
> deliberate-keep as drafted.

> **Amendment 4 (Move D — `handmark/ink/` OPEN CLOSED to flat).** The six helpers
> (`brush,freehand,geometry,ink,noise,texture`) go flat into `handmark/composables/` matching
> aurora (17)/blob (13). No `ink/` render sub-family — the six do not form a closed pipeline that
> earns a named dir; KISS + the house pattern favor flat.

> **Amendment 5 (Carve E — the census OVER-CARVED; tighten to 4 submodules).** Round-2's
> `_shared/surface/` and `_shared/motion/` submodules are REJECTED. They bundle high-fan-in
> cross-cutting vocabulary that must stay flat at root: `primitive.ts` (52 importers),
> `selection.ts` (23), `interaction.ts` (8), `useMotionAxis.ts` (7), `resolveSurfaceClass.ts` (6),
> and — critically — `axes.ts` (28 + the PUBLIC `/axes` source). Carving them costs ~96 extra
> rewrites and breaks the `/axes` source path for zero cohesion gain. **Perfected carve: only
> `field/` `feedback/` `menu/` `disclosure/`** (the four genuine, low-fan-in feature clusters);
> everything else — `index.ts class-names.ts primitive.ts axes.ts selection.ts floating.ts
> interaction.ts control-size.ts useMotionAxis.ts resolveSurfaceClass.ts` — stays flat at
> `_shared/` root (13 entries, under threshold, all vocabulary/primitive).

> **Amendment 6 (Carve E — the "barrel stays stable" premise is FALSE; state the true blast
> radius).** BAND-COLOCATION claims keeping `_shared/index.ts` re-exporting the moved symbols means
> "NO consumer import path outside `_shared/` changes … blast radius is intra-dir + 3 `@import`
> lines." `_shared/index.ts` re-exports ONLY `controlSizeClass` (verified) — every real consumer
> imports leaves DIRECTLY (`_shared/class-names` ×168, `_shared/primitive` ×52, `_shared/selection`
> ×23, `_shared/fieldControl` ×5, …). The true blast radius of the carve is **~25 direct-leaf TS
> import rewrites + 5 `.css` `@import` path edits**, not 3 lines. Do NOT expand the barrel to
> re-export everything to fake stability — that manufactures exactly the dead-aggregation barrel the
> band is deleting (Principle 6). Rewrite the leaf paths; state the count honestly in the wave.

> **Amendment 7 (Carve E — `axes.ts` OPEN CLOSED to KEEP-root).** `subpath-policy.mjs` `CURATED`
> pins `axes: "src/components/_shared/axes.ts"` (the `/axes` public source). Amendment 5 already
> keeps it at root, so BAND-COLOCATION OPEN-3 resolves to KEEP — no export-map touch, surface lock
> untouched. The alternative (move + patch CURATED + re-run the lock) is rejected.

> **Amendment 8 (Wave 2 — `./sidebar` window CLOSED; rides 8.0.0).** `ADJUDICATION-1.md` ruling 3:
> the 7.0.0 window is frozen; the drop rides the BJ cut's own major (8.0.0) after the family-B
> sibling census clears. BAND-COLOCATION OPEN-5 is settled — remove the "ride 7.0.0 vs defer"
> fork.

> **Amendment 9 (Wave 2 — the sidebar demotion has a TEST-MIRROR tail the census missed).** Four
> tests import the sidebar composables via `@glass/composables/sidebar*`
> (`tests/composables/sidebar/{useScrollTo,useScrollTracker,useLazyLoader,useTreeIndex}.test.ts`)
> plus `public-surface.spec.ts:34,:250-255`. When sidebar demotes to `demo/composables/sidebar/`,
> these four tests MUST move to `tests/demo/sidebar/` and rewrite their import to the demo path
> (they cannot reach it via `@glass` = `src/` once it leaves `src/`), and the `public-surface`
> sidebar rows are removed with the export. Add these to Wave 2 scope; they are byte-inert but
> compile-load-bearing.

> **Amendment 10 (Purge D — 4 barrels, not 5, at this band's hand).** `glass/wave/index.ts` is the
> 5th barrel but it dies via Amendment 1 (with liquid-grid), not as a standalone purge. Purge D
> deletes exactly four: `composables/index.ts`, `glass/webgpu/index.ts`,
> `sortable-list/composables/index.ts`, `typewriter/composables/index.ts`. G-BARREL-REACH still reds
> on five at HEAD — the fifth just greens via the reduction wave, not this move. State the split.

> **Amendment 11 (new — optional Wave BJ.W-COLO-4: flatten the test mirror's dead `ui/custom`
> taxonomy).** `tests/components/{ui,custom,_shared}/<name>/` mirrors a `ui`-vs-`custom` split
> `src/components/` (flat) ABANDONED — the same "canon describes a dead layout" disease inside the
> test tree (Principle 7 applied recursively; `proof:no-test-in-src` keeps it inside `tests/`).
> Flatten to `tests/components/<name>/`. Byte-inert, tests import via the absolute `@glass` alias so
> subjects don't break; verify intra-test relative helpers before the dir moves. LOW priority — a
> hygiene tail, not a shipped-surface concern; fold into Wave 3's hygiene fence or defer to BK.

> **Amendment 12 (new — `dockContext.ts` re-home CONDITIONAL, not a colocation-band move).**
> `dock/composables/dockContext.ts` is a 5-consumer cross-family context (dock + dropdown-menu +
> popover + select + slider) mis-homed inside `dock/`; its perfected home is shared. But re-homing
> is entangled with the real `dock ⇄ dropdown-menu` 2-cycle (`FABLE-DAG-REDUCTION.md` A1), which the
> REDUCTION band owns. This band does NOT move `dockContext` — record the target (a shared context
> leaf under `_shared/` or `composables/context/`) as CONDITIONAL on the reduction band's cycle
> resolution, and colocate it only after the cycle is broken. §6 states the seam.

---

## 5. Perfection check — what the census missed (walking the real tree, not listings)

The round-1/2/2b census read directory listings and `src`/`demo` only. Walking import closures and
the `tests/` tree surfaces five classes it could not see.

- **P1 — orphaned styles partials outside their closure (the chip-CSS failure, CONFIRMED live).**
  `src/styles/glass/glass-chip.css` + `glass-atom.css` are `@import`ed by NOTHING —
  `glass.css` imports 18 `glass/*` partials (`material,ladder,accent-tone,rim,surfaces,capsule,…`)
  but not these two; `index.css` doesn't either (the only textual hit is a comment at
  `dock/styles/shape.css:170`). Their classes ship onto live `<Chip>`/`<Badge glass>` elements with
  ZERO paint (R3a live-proven, `REGISTRY:284-290`). The census flagged `accent-tone.css` placement
  but not this closure gap because a listing shows the file present — only walking the `@import`
  graph shows it unreachable. **Owner:** family G/A born-RED wave (`REGISTRY:147`), NOT this band —
  but Principle 4 exists to prevent its recurrence, and family A's `orphan-CSS-partial` gate
  (`REGISTRY:44`) is the enforcement. Seam stated in §6.

- **P2 — the `_shared/index.ts` barrel is near-dead (1 symbol) and the carve's blast radius is
  ~8× the drafted estimate.** Detailed in Amendments 5/6. A listing shows a barrel; only grepping
  its exports vs its importers shows it re-exports `controlSizeClass` alone while 300+ imports reach
  the leaves directly. This falsifies the census's "barrel keeps consumers stable" assumption
  wholesale.

- **P3 — the test mirror encodes a dead `ui/custom` taxonomy** (`tests/components/ui/*` vs
  `custom/*`) that `src/components/` (flat) no longer has. Same disease the band cures in
  `design-idioms` §3/§7, replicated one tree over. Amendment 11.

- **P4 — the sidebar demotion's four-file test tail** (`tests/composables/sidebar/*`) — Amendment 9.
  The census counted the 9 src files and 3 demo consumers; it never walked `tests/`, so the demotion
  as drafted would leave four tests importing a path that no longer exists in `src/`.

- **P5 — two loose docs at directory roots** (minor, non-blocking): `src/components/PROCEDURAL-SUITE.md`
  sits among the 68 component dirs (a components-index doc — defensible, but note it), and the
  `README.md`/`DESIGN.md` distribution is uneven (aurora has both; ~30 components have neither).
  Not a colocation break — colocated docs are correct; flagged only for the doc-truth sweep's
  awareness.

**What the census got RIGHT (confirmed, not re-litigated):** the ~70% realization, dock/aurora/blob
as gold standard, `color/` + `glass/procedural/` as genuine shared leaves, the demo tree conforming,
`design-idioms` §3/§7 describing a dead layout, and no global `src/types`/`src/constants`/`src/utils`
(verified — `src/` root is `components composables fonts forms.ts html-attributes.d.ts index.ts
styles`). Those stand.

---

## 6. Seam with the reduction seat (which survives) — do not double-own

- **`glass/wave/` fate is downstream of `liquid-grid`'s deletion** (reduction owns; ruling 1). We
  DELETE the leaf, sequenced after their W3. Marked conditional only in the KISS sense — the ruling
  is decided, so it is a hard sequence, not a live fork.
- **`useDockCtaReceive.ts` (`/motion` public) + the backdrop-luminance 3-file cluster (dock-only)**
  are single-consumer-in-global TODAY but are **family-C A05 pruning questions**, not our moves
  (`BAND-COLOCATION` Scope-out; round-2b `[minor]`). Their placement (colocate into `dock/` vs earn
  a 2nd consumer vs stay public) is CONDITIONAL on the family-C ruling. If family C declines both,
  re-file as a Wave-1 colocation tail here. The hygiene gate (Wave 3) must allowlist-with-date them
  until family C rules (BAND-COLOCATION OPEN-9) so it does not red on un-migrated A05 debt.
- **`glass-chip.css`/`glass-atom.css` closure fix (P1) is family G/A's born-RED wave**, not ours —
  but our Principle 4 is its canon and family A's `orphan-CSS-partial` gate is its fence. We place
  the chip-PRIVATE `accent-tone.css` (Move C); the 2-consumer shared registers stay central and
  family G re-adds their missing `@import`.
- **`/liquid-grid` + `/header-ribbon` + the metric/completion-seal/DataTable export drops** are all
  reduction/family-C surface calls. We touch exactly ONE export key: `/sidebar` (Wave 2, 8.0.0).
- **`dockContext.ts` is mis-homed inside `dock/` — a 4-family fan-in — CONDITIONAL on the reduction
  band's cycle resolution.** `src/components/dock/composables/dockContext.ts` is imported by FOUR
  other families (`dropdown-menu`, `popover`, `select`, `slider`) plus dock itself — five consumers,
  yet buried in `dock/composables/`. Per Principle 1 (≥2 genuine consumers → shared home) its
  perfected placement is a SHARED context leaf (`_shared/` or `composables/context/`), not inside a
  single component. But re-homing it is entangled with the real **`dock ⇄ dropdown-menu` 2-cycle**
  (`dock/DockTrigger.vue:11` imports `dropdown-menu/DropdownMenuTrigger.vue`, while dropdown-menu
  imports `dockContext` back from dock) — surfaced by the DAG seat (`FABLE-DAG-REDUCTION.md` A1). The
  cycle break + dockContext re-home is the REDUCTION band's call; our placement is CONDITIONAL on it
  (Amendment 12). Do not move dockContext in this band — mark the target-if-broken and defer.
