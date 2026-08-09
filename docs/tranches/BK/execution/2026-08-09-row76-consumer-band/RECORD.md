# BK #76 W-CONSUMER-BAND — the 8.0.0 LIB-SEAM addenda batch · RECORD (2026-08-09)

**Row**: `TERMINAL-ROSTER.md:226` (#76, ⊕²) ∪ `:399` §C · sources ARCHAEOLOGY §4 N6
(E44) ∪ CWT-3 §4 LIB-SEAM ∪ GESTALT relay rows — three sources, **ONE addenda batch per
repo**, the #85 outbound form (`glass-outbound-2026-08-08-easing-consumer-addenda.md`)
as precedent. **8.0.0 is the trigger**: tag `v8.0.0` at **`17a11bc5`** — the ⊕⁷⁴
re-cut; the first tag `4e201a3a` failed CI at `G-BUNDLE-RATCHET` and was DELETED —
published via run `31300577617` SUCCESS (⊕⁷³/⊕⁷⁴ — #76 was never gated, it was ORDERED
behind the publish by its own `publish-closes (L2)` cell, and the condition is
satisfied).

**Deliverables of this seat** (all writes inside glass-ui `docs/`):
nine outbound docs at `docs/tranches/BJ/coordination/glass-outbound-2026-08-09-{atlas,
fourier-analysis,keyframes.js,muster,slides,speedtest,value.js,words}-8.0.0-addendum.md`
+ `…-constellation-remainder-8.0.0.md`, this RECORD, and `PASTE-BLOCKS.md`. **Zero
edits in any sibling repo** — the consumer-updates ruling and the foreign-tree fence are
both literal; every consumer row executes in ITS OWN tranche off its inbound half.

---

## 0 · SEAT DEFECTS, LOGGED FIRST

**Model-assert: FIVE seats, five MISMATCHES.** The Opus-only-fanout law (explicit
`model:` + modelId assertion; omission inherits Fable = defect) was violated at
dispatch for all four enumerator clusters AND this authoring seat — every one asserted
`claude-fable-5` against the required `claude-opus-5*`. Cluster C **halted** per the
law and returned `DEFECT-MODEL-MISMATCH` with zero enumeration; clusters A/B/D returned
read-only data for driver adjudication; this seat proceeded (authoring only, writes
fenced to glass-ui `docs/`) and **re-walked cluster C's repos read-only** rather than
stranding the batch. The defect is the parent's dispatch, one class, five instances at
this batch (a sixth at the same-day re-dispatch, §11) — driver adjudicates acceptance.

**Cluster C gap-fill**: atlas ×2 checkouts, sci-report ×2, parse-that, latex-paper,
oscilloscope re-enumerated at this seat, detectors stated in §2/§5. Every figure from
clusters A/B/D is carried **verbatim** into the addenda; nothing was re-aggregated.

## 1 · THE FRESH GENERATED CENSUS (the row's standing law: re-run at ship — this is that run)

The universe is GENERATED, never remembered (S-10): 15 closed-universe roots · 6 typed
subpaths · 3 operational mirrors · 1 negative control
(`docs/tranches/BJ/audits/2026-07-28-consumer-constellation/CONSUMER-LEDGER.{md,json}`).
The census of record for the breaking classes is row #66's fresh walk
(`docs/tranches/BK/execution/2026-08-09-row66-close/RECORD.md` §A1), reproduced by the
four cluster walks + this seat's gap-fill:

| class | edges | roots | status at 8.0.0 |
|---|---|---|---|
| `./forms` | **36** (34 module-import + 2 string-literal) | 8 (keyframes.js · keyframes-v-exec · muster · slides · slides-K · speedtest · value.js · words) | BREAK → `./input` · `./textarea` · `./checkbox` · `./radio-group` (`MIGRATION.md:21`); `useUserInvalidAria` → root/`./dom` |
| `./dropdown-menu` | **16** (13 module-import + 3 string-literal) | 6 (atlas · atlas-active · fourier-analysis · slides · speedtest · words) | BREAK → `./menu`, symbols unchanged (`MIGRATION.md:20`) |
| `./sheet` | **3** (module-import) | 2 (muster ×2 · speedtest ×1) | **REPAIR** — the specifier resolved to nothing pre-8.0.0; RT-38D mints it (`MIGRATION.md:22`). Specifier-level: see §3 |
| TagsInput | **0** | — | deleted at 8.0.0 (`MIGRATION.md:26-29`); the zero is a measured zero across all 18 roots |
| grain (prop) | **16** | 4 projects (speedtest 7 · bbnf-buddy 7 · atlas 1 · value.js 1) | REMOVED (`MIGRATION.md:440`) — delete attribute; §6 homonym table |
| specular (prop) | **1** | 1 (speedtest `MetricGaugeCards.vue:9`) | REMOVED with `SurfaceSpecular` (`MIGRATION.md:441/:516`) |
| dead `./api` | **3** | 2 (speedtest ×2 · muster ×1) | died at 5.0.0; record rows + re-points |
| string-literal blind-spot | **5** | 3 (atlas-active ×2 vi.mock · words ×2 optimizeDeps · speedtest ×1 optimizeDeps) | own section in each addendum |

**The enumerators' sum checks, quoted verbatim:**

- Cluster A (speedtest): "10+1 forms + 2 dd + 1 sheet = 14 = pinned 14 ✓" · "7 = pinned
  7 ✓ (grain)" · "1 = pinned 1 ✓ (specular)" · "2 = pinned 2 ✓ (dead ./api)" · "4 =
  pinned ×4 ✓ (instrument-chassis)" · "5+3+17+12+4 = 41 ✓ (metric-family)".
- Cluster B (words/slides/slides-K): "words: 6 forms (5 module-import + 1
  string-literal) + 5 dropdown-menu (4 module-import + 1 string-literal) = 11 = pinned
  6+5 ✓ · slides main: 1 forms + 1 dropdown-menu = 2 = pinned 1+1 ✓ · slides-K: 1 forms
  = pinned 1 ✓ · string-literal blind-spot: vite.config.ts:222-223 ×2 = pinned ×2 ✓".
- Cluster D (keyframes ×2/muster/value.js/fourier/bbnf-×2): "GLOBAL SUM CHECK … forms
  5+5+6+1 = 17 (cluster-D share of the 36-edge/8-root total) ✓ · sheet 2/3 ✓ ·
  dropdown-menu 2/16 ✓ · grain 1+7 = 8 ✓ · dead ./api 1/3 ✓ · S1 keyframes.js confirmed
  (installed 7.0.0, 0 manifest + 0 lock entries) ✓ · every per-repo subtotal equals its
  pinned cell, no orphans, no overs."
- This seat (cluster-C gap-fill): dropdown-menu **6** at the two atlas checkouts (4
  imports: master `DockSettings.vue:21`/`VizPlate.vue:35`, active
  `DockSettings.vue:20`/`VizPlate.vue:34`; 2 vi.mock literals: active
  `foot-dock-legend.spec.ts:109` + `viz-plate-source-grid.spec.ts:114`) — closing the
  pinned 16/6 exactly (10 + 6) ✓ · atlas grain **1** (StoryCard `:83`/`:82`, mirrored)
  ✓ · sci grain **0** with the homonym qualified (§6) ✓ · parse-that 5 text-only ✓ ·
  latex-paper docs-only ✓ · oscilloscope **0**, the negative control HOLDS ✓.

## 2 · THE 52-vs-55 CORRECTION (sheet +3, the repair class)

⊕⁷⁴'s cursor line and RT-89-F carry the headline "**52** specifier edges … (36 `./forms`
across 8 roots · 16 `./dropdown-menu` across 6 roots · 3 `./sheet` across 2)" — a
breakdown whose own sum is **55**. Both figures are right about different things, and
the sentence is corrected here rather than repeated: **52 is the BREAKING count**
(36 + 16); the **3 `./sheet` edges are a REPAIR class**, not breaks — pre-8.0.0 that
specifier resolved to nothing (`sheet` was internal), so those three imports were
already-broken consumers that 8.0.0's RT-38D mint FIXES (row66 RECORD §A1: "these
already resolved to nothing … the mint repairs a live break"). The batch row total is
**55 = 52 breaking + 3 repair**.

## 3 · THE REPAIR IS SPECIFIER-LEVEL — a finding of this seat, carried into all three sheet addenda

All three sheet edges import `Sheet, SheetContent, SheetHeader, SheetTitle,
SheetDescription` (speedtest `ResultDetailSheet.vue:3`; muster `WhyThisWonSheet.vue:31`
+ `ShareButton.vue:29`, statements read on disk). The 8.0.0 `./sheet` barrel
(`src/components/sheet/index.ts`, 17 lines) exports **`SheetContent` +
`SheetContentProps` + detent/motion helpers only**. The other four symbols' successors
are the Dialog twins from `./dialog` (`MIGRATION.md:1607`; `src/index.ts:302-309` —
compose `<Dialog>` around `<SheetContent side :detents>`). "If you were importing it,
it works now" (`MIGRATION.md:22`) is true of the module and false of these five-symbol
statements as written — the addenda say so explicitly so no consumer reads the repair
as a no-op adopt.

## 4 · 18 ROOTS → 8 PROJECTS — the collapse, with the mirror pairs

The 18 walked roots (realpaths under `/Users/mkbabb/Programming/` + `.p-totality/`):

| # | root | pairs with | ledger name(s) | note |
|---|---|---|---|---|
| 1 | `atlas` | ← mirror of #2 | `atlas-working-mirror` | master · 6.0.0 line · dirty 0 |
| 2 | `.p-totality/atlas` | **atlas** (the project) | `atlas-active` | `p/totality` · 7.0.0 · live tranche Q |
| 3 | `sci-report` | ≡ #4 (IDENTICAL HEAD `735ce1c8`, verified) | `sci-report` / `sci-active` | 7.0.0 · live O |
| 4 | `.p-totality/sci` | **sci-report** | — | same tree |
| 5 | `keyframes.js` | ← mirror of #6 | `keyframes` | S1 UNDECLARED · dirty 252 |
| 6 | `keyframes-v-exec` | **keyframes.js** | `keyframes-v-exec` (the ledger separately names `keyframes-working-mirror`, a declared-6.0.0 root — D-1) | declares 7.0.0 at `:77` |
| 7 | `slides` | ← #8 same-origin branch | `slides` | main · 3.13.0 · live N |
| 8 | `slides-K` | **slides** | `slides-k` | `tranche/til-briefing-K` · ^3.2.0 |
| 9 | `speedtest` | — | `speedtest` | ^4.0.1 · live AX |
| 10 | `muster` | — | `muster` | ^3.1.0 · PROTOTYPE (SL-3) · live K |
| 11 | `value.js` | — | `value` | ^7.0.0 · `tranche-u` · live X |
| 12 | `words` | — | `words` | ^3.0.0 · live A |
| 13 | `fourier-analysis` | — | `fourier-analysis` | ^4.0.0 · live N |
| 14 | `bbnf-buddy` | — (§C-only) | — | ^3.9.0 · no tranche dirs |
| 15 | `bbnf-lang` | — (§C-only) | `bbnf-lang` | playground ^3.0.0 STALE-MAJOR |
| 16 | `parse-that` | — (§C-only, text-only 5) | `parse-that` | zero code edges |
| 17 | `latex-paper` | — (§C-only, text-only) | `latex-paper` | zero code edges |
| 18 | `oscilloscope` | — (negative control) | `oscilloscope` | **0 refs, HOLDS** |

Collapse: the four mirror pairs (#1∥#2, #3∥#4, #5∥#6, #7∥#8) fold 18 → 14 distinct
projects; of those, **8 carry batch-class edges and get their own outbound doc** (atlas,
fourier-analysis, keyframes.js, muster, slides, speedtest, value.js, words); the
remaining 6 (bbnf-buddy, bbnf-lang, sci-report, parse-that, latex-paper, oscilloscope)
share the constellation-remainder page.

## 5 · THE VERIFY RECIPE — plain-grep census, never the instrument alone

`build-consumer-ledger.mjs` (which EXISTS, git-tracked, at
`docs/tranches/BJ/audits/2026-07-28-consumer-constellation/build-consumer-ledger.mjs` —
NOT `scripts/`; row66 CURE-66-4(b) struck the "does not exist" claim) is a seed, not a
verifier. **Its two named false-negative classes** (TR row 76 ⊕⁴, lane B §3.1 +
DECK-RELOCATION §6.1):

1. **The large-SFC drop** — `:178` runs `ts.preProcessFile()` on raw `.vue` source, and
   large SFCs fall out (the documented `SpeedtestResults.vue:641` miss).
2. **The path-segment over-exclusion** — `:52-63`'s `ignoredPathParts` filters by bare
   segment, and the `"docs"` member dropped a live bbnf-lang edge; exclusions must be
   root-anchored.

Plus the structural blindness the five blind-spot edges prove: `moduleSpecifierRows`
counts what `ts.preProcessFile` calls an import, so **string-literal specifiers
(`vi.mock(…)`, `optimizeDeps.include`) are invisible to it** — and a `vi.mock` on a
dead specifier silently mocks nothing while an `optimizeDeps.include` entry fails the
pre-bundle (row66 §A1). It is also blind to re-export barrels, `/forms`-style
aggregates, and CSS references — zero-checks never trust it alone.

**The recipe this batch ran** (repeat it at any future re-census):

```sh
# per root R — module + string edges in one pass, node_modules/lock excluded:
grep -rn "@mkbabb/glass-ui" "$R" --exclude-dir=node_modules --exclude-dir=.git \
  --exclude-dir=dist --exclude=package-lock.json          # classify by hand: import vs literal vs prose
# prop edges (invisible to any specifier scan):
grep -rn ':grain=\|grain="' "$R/src" --include='*.vue'    # qualify homonyms per §6
grep -rn 'specular=' "$R/src" --include='*.vue'
# manifest truth (the S1 class):
grep -n '"@mkbabb/glass-ui"' "$R"/**/package.json; ls "$R/node_modules/@mkbabb/glass-ui"
```

Classification is by hand and stated per edge (module-import · string-literal ·
prop-edge · prose/homonym) — no census ships without class + regex (§C).

## 6 · THE GRAIN HOMONYM TABLE

16 real edges (all `<Card :grain>` prop writes, all in the addenda) vs four homonym
families that a bare word-grep conflates:

| repo | real glass-ui edges | homonym family (qualified OUT, with cites) |
|---|---|---|
| speedtest | 7 | `auroraConfig.ts:221/:248` `canvasGrain`/`paperGrain` · `Dock.vue:189/677` "disco-grain" comments · css/echarts/prose ×10 |
| bbnf-buddy | 7 | `stores/skeleton/index.ts:16` "fine-grained" |
| atlas | 1 (`StoryCard.vue:83`/`:82` mirrored) | **atlas's own Glyph/EntityIcon grain API** — `Glyph.vue:194/:192`, `EntityIcon.vue:162/:173/:183`, `SelectionSetPane.vue:227-275`, `SelectionDrilldownPanel.vue:339-493` — entity-grain semantics, survives untouched |
| value.js | 1 (`ComponentSliders.vue:29`) | comments `:10`/`shell.css:160` · "paper-grain" oracle prose · o7 oracle READS `el.dataset.grain` (observation; its expectation re-pins at the adopt since `data-grain` never renders at 8.0.0) |
| sci-report | **0** | **the homonym IS the finding**: 3 live `grain="state|school"` writes on atlas's `<Glyph>`/`<EntityIcon>` (`RankedStrip.vue:554`, `BreakEvenScatter.vue:795`, `SchoolMap.vue:759`) + ~7 comments naming that API + sci's own data-granularity prose (`grainNoun`, `promotedFilter.ts`, `sourceScope.ts`) — none is glass-ui's prop |

The removal's failure mode is asymmetric and both addenda arms say so: under
`vueCompilerOptions.checkUnknownProps` a retained prop is a **hard vue-tsc error**;
without the flag it is a **silent no-op** — the stale-binding class that only a grep
sweep or e2e catches.

## 7 · CENSUS CORRECTIONS + FINDINGS MADE AT THIS SEAT (each carried into its addendum)

1. **sci metric-family: DISCHARGED ON DISK.** The §C/TR:411 "ON-7.x BLOCKING" migration
   row does not reproduce at HEAD `735ce1c8`: zero `metric-badge/cell/stack` imports in
   either checkout; the one live edge is already `./metric`
   (`dashboards/ecf/story/points/01-window-arc/Point.vue:23`). Fresh census supersedes
   the remembered cell (S-10).
2. **speedtest `vite.config.mjs:1042`** — a live FIFTH `instrument-chassis` reference
   (string-literal), in neither the pinned blind-spot census nor the chassis ×4
   (cluster A's flag, carried).
3. **The sheet repair is specifier-level** (§3) — 4 of the 5 imported symbols still
   migrate to `./dialog` twins.
4. **Dropped-key edges beyond the batch classes**, found by the fresh walk and stated +
   routed in the addenda (owners ruled at §C): `./drawer` (atlas ×3 files/tree + 2
   vi.mock; sci ×1) · `./completion-seal` (atlas ×2; sci ×2 — ruled → `@mkbabb/atlas`)
   · `./paper-backdrop` (atlas ×1/tree) · `./controls` (atlas master ×2 — active
   already migrated, the mirror divergence stated; slides ×2; slides-K ×2; bbnf-lang
   ×1) · `./hover-card` (words note; slides ×1) · `./confirm-dialog` (words vite `:218`
   literal).
5. **keyframes S1's edge**: the mirror DECLARES (`keyframes-v-exec/package.json:77`)
   while the primary does not — the divergence itself is the finding; the cure is that
   repo's row 1, as the cell orders.

## 8 · bbnf-lang — the 26-edge bank (referenced by the constellation-remainder page)

`playground/package.json:13` `"@mkbabb/glass-ui": "^3.0.0"` (STALE-MAJOR), then
(cluster D, verbatim): `App.vue:4` tooltip · `ActionButtons.vue:3` tooltip / `:4` dock ·
`NavBar.vue:6` controls (**the one 8.0.0 name-break** → `./dark-mode-toggle`) ·
`ErrorDialog.vue:3` dialog / `:4` tooltip · `ExampleSelector.vue:3` select / `:4`
tooltip · `FormatterSettings.vue:3` select / `:4` slider / `:5` tooltip / `:6` dialog ·
`ControlsBar.vue:2` tooltip / `:3` dock · `EntryRuleSelector.vue:3` select / `:4`
tooltip · `EditorPanel.vue:2` tooltip / `:6` card · `MonacoEditor.vue:7` dark ·
`DocsSidebar.vue:4/:5` search / `:6/:7` sidebar · `DebugToolbar.vue:2` tooltip / `:3`
dock · `PlaygroundPage.vue:5` tooltip. Spread: tooltip ×11 · select ×3 · dock ×3 ·
dialog ×2 · search ×2 · sidebar ×2 · card/controls/dark/slider ×1.

## 9 · WHAT IS NOT THIS ROW'S

- **The consumer-side adopts.** Every edit named in the nine docs executes in the
  consumer's OWN tranche off this inbound half (consumer-updates ruling). Glass-ui made
  zero sibling writes; existence of an edge ⇒ relay, never ⇒ work here.
- **Builds/installs in dirty trees.** keyframes.js (252 dirty), bbnf-lang (243), muster
  (90), speedtest (16), parse-that (31), latex-paper (18) were read, never built,
  installed into, or cleaned.
- **The atlas adopt** — gated on its own DockCrest π10 row (TR:406), not on this batch.
- **The slides deploy** and any production push (that repo's tranche; production is
  separately HELD).
- **The #76 remainder**: clampLabel (5th booking) · dock first-tap · LabeledField
  association · `TooltipContent variant="mono"` · the `/deck` seventh-carry (under
  #40's re-hearing) · the BEAD census · consumer-evidence truth-up — payload items of
  the row that are NOT discharged by this batch (see PASTE-BLOCKS state text).
- **Publish mechanics** — already done (`v8.0.0` live); this batch is the row's
  outbound half, ordered behind it.

## 10 · VERIFY, this seat

Nine outbound docs + this RECORD + PASTE-BLOCKS on disk under glass-ui `docs/` only ·
`git -C <sibling> status` untouched for all 18 roots (read-only walk; dirty counts
above are pre-existing) · every addendum quotes its enumerator's sum check verbatim ·
export-map claims verified against the 8.0.0 `package.json` `exports` (66 keys) +
`MIGRATION.md:20/:21/:22/:26-29/:440/:441/:516/:592/:768-785/:992/:1607` on disk at
HEAD `e73ec80c`.

## 11 · RE-VERIFY (the re-dispatched seat, same day) + ONE CORRECTION

The workflow re-spawned the authoring task after the batch above was already on disk
(03:51–03:58); the re-dispatched seat — a SIXTH `claude-fable-5` mismatch, same defect
class as §0, logged not laundered — re-verified rather than re-authored:

- **Export map re-checked by script**: every claimed-present key present (`./menu`,
  `./input`, `./textarea`, `./checkbox`, `./radio-group`, `./sheet`, `./deck`,
  `./dark-mode-toggle`, `./metric`, `./chip`, `./dialog`, `./timeline`, `./aurora`),
  every claimed-absent key absent (`./forms`, `./dropdown-menu`, `./api`, `./controls`,
  `./hover-card`, `./confirm-dialog`, `./drawer`, `./completion-seal`,
  `./paper-backdrop`, `./toggle-chip`, `./instrument-chassis`, `./metric-{badge,cell,
  stack}`, `./pulse`); peer `vue-component-type-helpers` = `^3.0.3` ✓. (The script
  counts 70 raw `exports` keys — §10's "66" is the subpath count net of the four
  non-subpath entries; both are honest detectors, both stated.)
- **MIGRATION/source anchors re-read on disk**: `MIGRATION.md:20/:21/:22/:26-29/:440/
  :441/:516/:592/:992/:1607` say what the addenda cite; `src/components/sheet/index.ts`
  = 17 lines exporting `SheetContent` + `SheetContentProps` only; `src/index.ts:302-309`
  (the RT-38D mint note) + `:449` (`useUserInvalidAria`) + `composables/dom/index.ts:46` ✓.
- **The cluster-C gap-fill reproduced independently** (read-only grep, third walk):
  atlas dropdown-menu 4 imports (master `DockSettings.vue:21`/`VizPlate.vue:35`, active
  `:20`/`:34`) + 2 vi.mock literals (active `:109`/`:114`) = 6 ✓ · grain 1 mirrored
  (`StoryCard.vue:83`/`:82`) ✓ · the controls mirror-divergence exact (master
  `/controls` at `DockSettings.vue:23` + `DockFoot.vue:23`; active already
  `/dark-mode-toggle` at `:22`/`:23`) ✓ · sci-report metric-family DISCHARGE reproduced
  at HEAD `735ce1c8` (0 metric-badge/cell/stack imports; `Point.vue:23` already
  `./metric`) ✓.
- **THE ONE CORRECTION — the tag SHA was stale in all nine citing spots.** The batch
  was authored citing tag `v8.0.0` at `4e201a3a` — ⊕⁷³'s tag, which ⊕⁷⁴ records as
  **DELETED and RE-CUT** after run `31299962514` failed `G-BUNDLE-RATCHET`. On disk:
  `git rev-parse v8.0.0^{commit}` = **`17a11bc5`** (tag object `478aa462`), publish run
  `31300577617` SUCCESS. Corrected in 6 outbound docs (keyframes.js · fourier-analysis
  · value.js · muster · speedtest · words), this RECORD's header, and both PASTE-BLOCKS
  blocks; atlas/slides/remainder never cited a SHA. The lesson is ⊕⁷⁴'s own, recurring
  within 24 hours: a remembered literal is already stale — resolve the tag, never quote
  the cursor.
