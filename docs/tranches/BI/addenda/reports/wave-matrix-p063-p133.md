# Perfected-BI wave-status matrix — BI.W-P063 .. BI.W-P133

Auditor: execution-archaeology (read-only). Repo: `/Users/mkbabb/Programming/glass-ui`, branch `tranche/BI`.
Formation base `26c5ae68`; HEAD `e5b3a209` (69 commits from base). Working tree = one uncommitted
transaction (~695 M / 155 D / 105 ??), a 7.0.0-prep restructure (CHANGELOG `## 7.0.0 (unreleased)`,
`package.json` version still `6.0.0`).

## Method + global facts (apply to every row below)

- **Receipt protocol abandoned after P001.** The only git-tracked receipt is
  `docs/tranches/BI/evidence/BI.W-P001/receipt.json`. `git ls-files docs/tranches/BI/evidence/**`
  returns exactly that one file. No P002..P133 has a receipt. So **no wave in this range is
  DONE-PROTOCOL.**
- **No per-wave browser π evidence exists** for any P063..P124 (all `browser` π) nor for the browser
  contract waves (P128/P130/P132). `docs/tranches/BI/evidence/` contains only `BI.W-P001/`.
  `tests-visual/` holds a large pre-existing Playwright suite (dates Jun–Jul) but it is **not
  wave-tagged π evidence** and cannot be mapped to a specific apotheosis transaction. Every
  browser-π wave below therefore carries the skipped obligation "browser π receipt (absent)".
- **Two structural layers.** (1) *Committed* (`26c5ae68..HEAD`, published as npm 5.0.0 @15:02Z and
  6.0.0 @21:37Z on 2026-07-15): the apotheosis work that landed did so as ~66 broad Conventional
  commits, not per-wave. The single commit touching the widest set is `9a8761f0`
  (`refactor(structure/ms4): flatten component families…`) — a **structural relocation**, not an
  apotheosis. (2) *In-flight* (working tree): a late consolidation/privatization/colocation +
  contract-cleanup transaction that also **rewrites the P125–P133 spec Status lines** from the
  committed `PLANNED` to `DECLINED/SUPERSEDED/DONE-PRUNED`.
- **The entire contract/governance band P125–P133 is committed as `Status: PLANNED` at HEAD**
  (verified per-file). The `DECLINED/SUPERSEDED/IN PROGRESS/DONE-PRUNED` statuses are **uncommitted
  worktree edits**. Published 6.0.0 shipped these waves unbuilt.

**Status vocabulary used here**
- `LANDED-CONVENTIONAL` — the wave's substance is visible in committed conventional commits (SHAs cited); π still absent.
- `PARTIAL` — only the MS4 flatten `9a8761f0` (or an equivalent structural commit) touched it; no dedicated apotheosis pass committed; colocation often now in-flight; π absent.
- `IN-FLIGHT` — the wave's *defining* action (consolidate / privatize / rename / re-home / residual delete) sits **uncommitted** in the working tree and was **absent from published 6.0.0**.
- `PLANNED@release / <x>-IN-FLIGHT` — committed HEAD spec = PLANNED (unbuilt at release); worktree performs a de-scope + residual action.

---

## Component-apotheosis band (P063–P124) — all `browser` π

| id | status | evidence | skipped obligations | notes |
| --- | --- | --- | --- | --- |
| P063 Surface | PARTIAL | committed: `9a8761f0` (flatten only). worktree: `M surface/`, `?? demo/stories/display/surface.vue` | dedicated material/elevation apotheosis; browser π | "semantic material/elevation primitive" not evidenced beyond relocation; colocation in-flight |
| P064 Section privatization | LANDED-CONVENTIONAL | `90c9efe1` (privatize section + control semantics); `9a8761f0` | browser π | privatization committed |
| P065 Button | LANDED-CONVENTIONAL | `8fec6dd2`,`90c9efe1`,`51a89932`,`9a8761f0`; `?? button/styles.css` | browser π | good coverage; CSS colocation in-flight |
| P066 Label | PARTIAL | `9a8761f0`; `?? tests/components/label.contract.test.ts` | apotheosis pass; π | flatten only |
| P067 Input | PARTIAL | `9a8761f0`; `?? input/types.ts` | apotheosis pass; π | flatten only; types colocation in-flight |
| P068 Textarea | PARTIAL | `9a8761f0`; `?? textarea/types.ts` | apotheosis pass; π | flatten only |
| P069 Separator | LANDED-CONVENTIONAL (thin) | `90c9efe1`,`9a8761f0` | π | touched by control-semantics commit only |
| P070 Skeleton | PARTIAL | `9a8761f0` (sole commit) | apotheosis pass; π | flatten only |
| P071 Avatar | LANDED-CONVENTIONAL (thin) | `680f9b6e`,`9a8761f0`; `?? avatar/styles.css` | π | native-contract touch; colocation in-flight |
| P072 Badge | PARTIAL | `9a8761f0`; worktree `M badge/`, `?? badge.contract.test.ts` | apotheosis pass; π | flatten only |
| P073 Alert | PARTIAL | `9a8761f0` (sole commit) | apotheosis pass; π | flatten only |
| **P074 Toast consolidation** | **IN-FLIGHT** | HEAD ships `notification` **publicly** (`src/index.ts:109 export * ./components/notification`; pkg export `./notification`). toast committed only via `9a8761f0`. worktree: `D notification/` (2 files) | delete Notification's parallel TransitionGroup engine (the wave's core); π | **6.0.0 shipped BOTH Toast AND Notification public** — consolidation not done at release; only now in-flight |
| P075 Progress | LANDED-CONVENTIONAL | `298bbbdd`,`c0577fba`,`8a20f76b`,`9a8761f0` | π | |
| P076 Pulse | LANDED-CONVENTIONAL (thin) | `8a20f76b`,`9a8761f0` | π | dispose-lifecycle touch |
| P077 StatusDot | PARTIAL | `9a8761f0` (sole commit) | apotheosis pass; π | flatten only |
| P078 AnimatedDigit | PARTIAL | `9a8761f0` (sole commit) | apotheosis pass; π | flatten only |
| **P079 SplitChars** | **IN-FLIGHT** | HEAD ships `split-chars` **publicly** (`src/index.ts:167 export * ./components/split-chars`; pkg export). committed only `9a8761f0`. worktree: `D split-chars/` (3 files) | fold/re-home + π | 6.0.0 shipped SplitChars public; fold in-flight |
| P080 Typewriter | LANDED-CONVENTIONAL | `7de57d2e`,`bed0a122`,`9a8761f0` | π | |
| **P081 ColorSwatch privatization** | **IN-FLIGHT** | HEAD ships `color-swatch` public (pkg export `./color-swatch:437`). committed `680f9b6e`,`9a8761f0`. worktree: `D color-swatch/` (3), `?? demo/stories/substrates/aurora/config/ColorSwatch.vue` | make configurator-private (the wave's core); π | 6.0.0 shipped ColorSwatch public; privatization in-flight |
| **P082 DarkModeToggle clean rename** | **IN-FLIGHT** | HEAD ships `controls/DarkModeToggle` public (pkg export `./controls:453`). committed `3aa53062` (truthful toggle command). worktree: `D controls/` (4), `?? dark-mode-toggle/` | rename `controls`→`dark-mode-toggle` + π | partial truthful-command work committed; the rename itself in-flight |
| P083 StackedIcons retirement | LANDED-CONVENTIONAL | `e5164e51` (retire the false stacked-icons abstraction) | device-free π (row is device-free) | retirement committed cleanly |
| P084 PaperBackdrop | PARTIAL | `9a8761f0`; worktree `M paper-backdrop/` | apotheosis pass; π | flatten only; colocation in-flight |
| P085 BorderProgress retirement | LANDED-CONVENTIONAL | `border-progress` **absent at HEAD** (`git ls-tree HEAD src/components/border-progress` empty); superseded by `698c2b1d` (scroll-progress-rim extraction) | device-free π | retired; a leftover empty `border-progress/composables` dir remains on disk (untracked) |
| P086 Checkbox | PARTIAL | `9a8761f0` (sole commit) | apotheosis pass; π | flatten only |
| P087 RadioGroup | PARTIAL | `9a8761f0` (sole commit) | apotheosis pass; π | flatten only |
| P088 Switch | PARTIAL | `9a8761f0` (sole commit) | apotheosis pass; π | flatten only |
| P089 Toggle | PARTIAL → IN-FLIGHT | committed `9a8761f0`. worktree `D toggle/` (2) | apotheosis / fold; π | Toggle being removed in worktree (folding onto ToggleGroup's shared contract, cf. P090) |
| P090 ToggleGroup | LANDED-CONVENTIONAL (thin) | `afe62240`,`9a8761f0`; `?? toggle-group/toggleVariants.ts` | π | constrained-layout touch; variants colocation in-flight |
| **P091 Chip consolidation** | **IN-FLIGHT** | HEAD ships `icon-chip` **publicly** as a second concept (`src/index.ts:159 export * ./components/icon-chip`; pkg export `./icon-chip:489`). chip committed only `9a8761f0`; icon-chip `4bf29831`. worktree: `D icon-chip/` (5), `M chip/`, `?? demo chip.vue` | fold IconChip into Chip as slot/size form (wave core); π | 6.0.0 shipped IconChip as separate public concept; fold in-flight |
| P092 Tabs | LANDED-CONVENTIONAL | `ce48a727`,`535be914`,`680f9b6e`,`4bf29831`,`9a8761f0`; worktree `M tabs/` (8) | π | good coverage; refinement in-flight |
| P093 Slider | LANDED-CONVENTIONAL (thin) | `298bbbdd`,`9a8761f0`; `?? slider/types.ts` | π | checkpoint-marks touch |
| P094 NumberField | PARTIAL | `9a8761f0`; worktree `M number-field/`, `?? context.ts`,`?? styles.css` | apotheosis pass; π | flatten only; colocation in-flight |
| P095 Select | LANDED-CONVENTIONAL | `c0577fba`,`bed0a122`,`9a8761f0` | π | |
| P096 Combobox | LANDED-CONVENTIONAL (thin) | `c0577fba`,`9a8761f0` | π | retire-internal touch |
| P097 TagsInput | PARTIAL | `9a8761f0`; worktree `M tags-input/`, `?? context.ts`,`?? styles.css` | apotheosis pass; π | flatten only; colocation in-flight |
| P098 LabeledField | LANDED-CONVENTIONAL | `ab261cf7`,`23648370`,`9a8761f0`; `?? labeled-field/types.ts` | π | validation-owner + native-input typing |
| P099 Search | LANDED-CONVENTIONAL | `73b852cd`,`ae5bbb1e`,`680f9b6e`,`9a8761f0` | π | |
| **P100 FocusScope privatization** | **IN-FLIGHT** | HEAD ships `focus-scope` **publicly** (root barrel `components/index.ts`; pkg export `./focus-scope:365`). committed `9a8761f0` only. worktree: `D focus-scope/` (2) | make private overlay substrate (wave core); π | 6.0.0 shipped FocusScope public; privatization in-flight |
| P101 Collapsible | PARTIAL | `9a8761f0`; worktree `M collapsible/`, `?? _shared/disclosure-context.ts`,`?? _shared/disclosure.css` | apotheosis pass; π | flatten only; disclosure colocation in-flight |
| P102 Accordion | PARTIAL | `9a8761f0`; worktree `M accordion/` (4) | apotheosis pass; π | flatten only |
| P103 Popover | LANDED-CONVENTIONAL (thin) | `aa34d832`,`9a8761f0` | π | elevation/backdrop touch |
| P104 Tooltip consolidation | IN-FLIGHT | HEAD ships `icon-tooltip` public (pkg export `./icon-tooltip:493`). tooltip committed `bed0a122`,`9a8761f0`. worktree: `D icon-tooltip/` (3) | fold IconTooltip into Tooltip (wave core); π | 6.0.0 shipped IconTooltip separate; fold in-flight |
| P105 DropdownMenu | LANDED-CONVENTIONAL | `062a2b12` (retire portal owners),`535be914`,`9a8761f0`; context-menu folded onto `trigger="context"` (`components/index.ts` note) | π | |
| P106 Dialog | LANDED-CONVENTIONAL | `c0577fba`,`aa34d832`,`4bf29831`,`9a8761f0` | π | |
| P107 Drawer | LANDED-CONVENTIONAL | `062a2b12`,`8cd3966c`,`c0577fba`,`8e052be8` | π | detent ownership committed |
| P108 Command | LANDED-CONVENTIONAL (thin) | `4a1456ca`,`9a8761f0`; worktree `M command/` (10), `?? dialogContext.ts` | π | dialog-member scenario; refactor in-flight |
| P109 Card | LANDED-CONVENTIONAL | `8fec6dd2`,`8a20f76b`,`aa34d832`,`b7b25f51`; worktree `M card/` (10) | π | well-covered; refinement in-flight |
| P110 ExpandableContainer | LANDED-CONVENTIONAL (thin) | `bed0a122`,`9a8761f0`; worktree `M expandable-container/` | π | motion-prefs touch |
| P111 FadingScroll | LANDED-CONVENTIONAL (thin) | `51a89932`,`9a8761f0`; worktree `M fading-scroll/` | π | harden-control touch |
| P112 InfiniteScroll | LANDED-CONVENTIONAL (thin) | `680f9b6e`,`bba7b51d`,`9a8761f0` | π | native-contract touch |
| **P113 SpaView re-home** | **IN-FLIGHT** | HEAD ships `spa-view` public (pkg export `./spa-view:545`). committed `9a8761f0` only. worktree: `D spa-view/` (3) | bounded-KeepAlive re-home (wave core); π | 6.0.0 shipped SpaView public; re-home in-flight |
| P114 HeaderRibbon | LANDED-CONVENTIONAL (thin) | `ae5bbb1e`,`bed0a122`,`9a8761f0`; worktree `M header-ribbon/`, `?? styles.css` | π | align-interaction touch |
| P115 Table | LANDED-CONVENTIONAL | `4cdabdd1`,`e5b3a209`,`9a8761f0` | π | data-table commits touch native table |
| P116 DataTable | LANDED-CONVENTIONAL | `cf40296e`,`e552fbbb`,`4cdabdd1`,`e5b3a209(HEAD)` | π | well-covered; actively maintained |
| **P117 Metric consolidation** | **IN-FLIGHT** | HEAD ships `metric-badge`,`metric-cell`,`metric-stack` as **separate public** concepts (root barrel exports metric-cell/metric-stack; pkg exports `./metric-badge:509`,`./metric-cell:513`,`./metric-stack:517`). committed `metric/` only `ea3c002c`(ms2). worktree: `D metric-badge/`,`D metric-cell/`,`D metric-stack/`; `?? metric/{Metric,MetricCell,MetricRow,MetricStack}.vue`,`coalesce-metric.ts` | consolidate the metric family into one owner (wave core); π | **6.0.0 shipped 3+ separate metric concepts public**; unification only now in-flight |
| P118 PagerDots | LANDED-CONVENTIONAL (thin) | `cf40296e`,`9a8761f0`; worktree `M pager-dots/`, `?? demo pager-dots.vue` | π | operable-identity touch |
| P119 Carousel | LANDED-CONVENTIONAL | `c0577fba`,`51a89932`,`bed0a122`,`9a8761f0`; worktree `M carousel/` (5) | π | |
| P120 Timeline | PARTIAL | `9a8761f0` (sole commit) | apotheosis pass; π | flatten only |
| P121 Deck | LANDED-CONVENTIONAL (thin) | `101dd196` (retire inert motion facility),`9a8761f0`; worktree `?? demo/stories/motion/deck/` | π | |
| P122 InstrumentChassis | LANDED-CONVENTIONAL (thin) | `b7b25f51`,`4bf29831`,`9a8761f0`; `?? types.ts` | π | token-excision + CSS colocation |
| P123 CompletionSeal re-home | LANDED-CONVENTIONAL (thin) | `bed0a122`,`4bf29831`,`9a8761f0`; public via pkg export `./completion-seal`; component present; worktree `M completion-seal/` | π | seam intact (also required live by P133) |
| P124 Easing | LANDED-CONVENTIONAL | `a5f91fd5`,`8499abc2`,`535be914`,`bed0a122`; worktree `M easing/` | π | operable authoring/preview committed |

**Band tally (P063–P124, 62 waves):** DONE-PROTOCOL 0 · LANDED-CONVENTIONAL 31 (incl. 3 clean
retirements P083/P085 + context-menu fold) · PARTIAL 20 (flatten-only) · IN-FLIGHT 8
(P074, P079, P081, P082, P091, P100, P104, P113, P117 — the consolidation/privatization/re-home set;
P089 straddles). Per-wave browser π receipts: **0 / 62**.

---

## Contract / build / governance band (P125–P133)

All committed `Status: PLANNED` at HEAD (verified per file). Worktree edits de-scope + do residuals.

| id | status | evidence | skipped obligations | notes |
| --- | --- | --- | --- | --- |
| **P125 value.js pinned-consumer** (device-free) | PLANNED@release / SUPERSEDED-IN-FLIGHT | HEAD spec PLANNED; worktree spec `M …P125.md` → "SUPERSEDED". No pinned-worktree fixture built | device-free co-land fixture (dissolved by design) | Protection deliberately relocated to immutable package boundaries → the value.js peer correctness now rides **P127**. Not a per-se skip, but see P127 risk. |
| **P126 retirement facts** (device-free) | PLANNED@release / IN-FLIGHT | HEAD PLANNED; worktree "DECLINED". `D .retired-classes.txt`, `M MIGRATION.md` (uncommitted) | device-free | Residual delete in-flight; **published 6.0.0 still shipped `.retired-classes.txt`** |
| **P127 dependency/peer/lockfile singularity** (device-free) | PLANNED@release / IN-FLIGHT (RISK) | HEAD PLANNED; worktree "IN PROGRESS". `D components.json` (uncommitted). `package.json` peer bump in worktree: value.js `^3.1.0`→`^4.0.0`, keyframes.js `^5.2.0`→`^6.0.0`; **installed producers are value.js 3.1.0 / keyframes.js 5.3.4** (`node_modules/@mkbabb/*/package.json`); lock still resolves 3.1.0/5.3.4 | device-free dependency contract + isolated-consumer resolution; CVA/clsx/tw-animate removal | **CONSUMER-BREAK RISK.** P127's own spec (worktree copy) says value 4 / keyframes 6 "remain nonexistent inputs" and re-deadlines the cut to **value.js V.W33**; yet the worktree already declares those peers. If committed and published as glass-ui 7, every consumer faces **unsatisfiable peers** on unpublished producers. Verify producer publication before any release. |
| **P128 build-project graph** (browser) | PLANNED@release / DECLINED-IN-FLIGHT | HEAD PLANNED; worktree "DECLINED" (no build target). `M vite.library.ts` in worktree | none (no-op by design) | build configs stay explicit; nothing built |
| **P129 documentation facts** (device-free) | PLANNED@release / IN-FLIGHT | HEAD PLANNED; worktree "DECLINED". `M README.md`,`M DESIGN.md`,`M MIGRATION.md`,`M CHANGELOG.md` (uncommitted) | device-free | Present-tense doc corrections in-flight; **6.0.0 docs not regenerated** |
| **P130 profiling ownership** (browser) | PLANNED@release / IN-FLIGHT | HEAD PLANNED; worktree "DONE — PRUNED". `D scripts/read-blob-shaders.mjs`,`D read-css-monoliths.mjs`,`D read-dock-css.mjs`,`D scripts/verification/*` (uncommitted) | browser π | Archaeology-script deletions in-flight, uncommitted; **shipped in 6.0.0** |
| **P131 ROOT authority apparatus** (device-free) | PLANNED@release / DECLINED-IN-FLIGHT | HEAD PLANNED; worktree "DECLINED" | device-free (no-op) | Governance machinery not built (by design); no residual code action |
| **P132 refraction runtime** (browser) | PLANNED@release / IN-FLIGHT | HEAD PLANNED; worktree "DECLINED — ORPHANS PRUNED". `D src/composables/glass/webgl/shaders/glass-refract.glsl.ts`,`D …/webgpu/glassShader.wgsl`; `.glass-lens` CSS kept (`M src/styles/glass-refract.css`) | browser π | No `RefractionRoot`/frame-graph product built (by design); orphan-shader deletions in-flight |
| **P133 Atlas closure** (device-free) | PLANNED@release / SUPERSEDED-IN-FLIGHT | HEAD PLANNED; worktree "SUPERSEDED". Consumer seams **verified INTACT**: `CompletionSeal` public via pkg export `./completion-seal` (`package.json:441-443`) with component present (`src/components/completion-seal/{CompletionSeal.vue,index.ts}`, props/shape defined `CompletionSeal.vue:82,84`); `DataTable` public (`src/index.ts:93`), actively maintained through HEAD `e5b3a209` | device-free closure matrix/verifier (dissolved) | No allocation matrix / verifier built; the two seams Atlas depends on are preserved |

---

## Cross-cutting findings

1. **Release-forbidden-until-terminal contract violated.** EXECUTION-READINESS (lines 106–110) forbids
   release until all 134 rows terminal, π green on the candidate tree, nine owner ACKs, independent
   audit, and two clean convergence passes. npm **5.0.0 and 6.0.0 were published** (release commits
   `319cd711`, `b5216887`) while P125–P133 = PLANNED and the receipt protocol was dead after P001.
2. **False-consolidation shipped in 6.0.0.** The published surface still exports the very duplicates the
   consolidation waves were meant to remove: Notification (P074), IconChip (P091), IconTooltip (P104),
   metric-badge/cell/stack (P117), plus the not-yet-privatized ColorSwatch (P081), FocusScope (P100),
   SpaView (P113), SplitChars (P079), and controls/DarkModeToggle (P082). All corrections are
   **uncommitted** in the current transaction.
3. **In-flight peer bump to unpublished producers (P127).** The largest live consumer hazard; see row.
4. **Spec-status rewriting.** The in-flight transaction edits the committed `PLANNED` status of
   P120–P133 spec files to `DECLINED/SUPERSEDED/DONE-PRUNED`, retroactively rationalizing the
   de-scope. Treat those statuses as proposals, not committed authority.
5. **Zero per-wave π across the whole range.** 62 browser-π component waves + 3 browser contract waves,
   0 receipts. `tests-visual/` is a general suite, not wave-bound evidence.
