# Read-only constellation truth

## Fence

The constellation is evidence, not a write surface. Perfected BI may read these
repositories, run non-mutating import/build probes when their existing state permits,
and author asks inside glass-ui. It must not edit, stash, clean, reset, commit, merge,
or otherwise normalize a sibling. Dirty state belongs to that repository's active
owner. A consumer migration becomes complete only through an explicit handshake in
that repository.

The tracked-source scanner below uses each sibling's `git ls-files`, parses actual
static/dynamic import or require specifiers, and excludes docs, lockfiles, build
output, node_modules, and untracked worktrees. That is deliberately different from
searching prose for package names.

## Current snapshot at formation close

The component-member demand scanner was rerun on 2026-07-14 against the exact
tracked HEADs below. Its figures are `tracked files / Glass import clauses / named
bindings`; they include direct runtime and demo packages where those are part of the
repository, and remain descriptive rather than a retention threshold.

| Repository | Branch / HEAD | Worktree | Declared constellation versions observed | Tracked Glass demand | Latest tranche truth / immediate hold |
| --- | --- | --- | --- | --- | --- |
| `value.js` | `tranche-u` / `e29f8d1` | dirty: 2 tracked deletions, 2 untracked evidence paths | Glass `file:../glass-ui`; Keyframes `file:../keyframes.js` | **93 / 126 / 222**; demo-only causal class | U closed `complete_with_misses`; V is owner-paused after pass 4 at 78%, clean-pass clock 0/2. Do not overwrite either deleted CLAUDE file or the untracked evidence. |
| `keyframes.js` | `tranche-u-impl` / `f794def9` | clean | no root Glass field; value.js `^3.1.0`; demo imports Glass | **62 / 76 / 159**; demo-only causal class | U implementation substantially landed, but `FINAL-U.md` is a draft: owner-golden, Glass 5.x consume, 5.3.0 publish, and deploy remain open. |
| `atlas` | `master` / `767314a` (`v1.0.32`) | clean | Glass `4.2.0`; Keyframes `^5.1.0`; value.js `^1.2.0` | **42 / 61 / 102**; 78 causal runtime bindings in 25 files | Tranche O source hardening is landed and tagged. BI still owes clean-break migration, including canonical `HandMark` in place of the `InkMark` alias. |
| `fourier-analysis` | `m/w1-bump-migration` / `cd26c65` | dirty: 27 paths | Glass `^4.0.0`; Keyframes `^4.3.0`; value.js `^0.13.0` in the in-flight package | **56 / 96 / 158**; 134 causal runtime bindings in 48 files | M.W1 is executed-partial and uncommitted; W2-W13 remain planned. Its BB/4.1-era prose is archaeology, not a current BI release base. No external patch may overlay the dirty migration. |
| `sci-report` | `feat/tranche-k-arc` / `3983199b` | dirty: current data/audit output plus untracked P planv4 | app Glass `>=4.2.0`; Keyframes `^5`; value.js `^1.2.0` | **30 / 38 / 52**; 45 causal runtime bindings in 18 files | P reached deep formulation convergence (R15 and plan-v4), not source execution. Every P.W wave and external execution/publication/deploy prerequisite remains RED. |
| `muster` | `master` / `6be5082` | dirty: large visual/axe evidence tree | Glass `^3.1.0`; value.js `^0.10.0` | **34 / 91 / 141**; 104 causal runtime bindings in 22 files | No recent terminal hardening; protected evidence worktree and several retired subpaths, including an unnecessary outer `DrawerPortal`, require an owner packet. |
| `bbnf-buddy` | `master` / `b218922` | clean | Glass `^3.9.0`; Keyframes `^2.1.1`; value.js `^0.10.0` | **34 / 51 / 115**; 93 causal runtime bindings in 28 files | Clean but constellation-stale; no current tranche close proves the BI breaking surface. |
| `slides` | `main` / `b538506` | clean | Glass `3.13.0`; Keyframes `^3.0.0` | **15 / 17 / 35**; 19 causal runtime bindings in 8 files | Tranche N landed real mobile/PRM hardening, but production/publish remained held and the Glass line is now several clean breaks behind. |
| `speedtest` | `master` / `ce17d019` | clean | Glass `^4.0.1`; Keyframes `^4.3.0`; value.js `^0.13.0` | **83 / 154 / 243**; 169 causal runtime bindings in 35 files | AX is an eight-pass, highly audited plan, not implementation: all waves remain planned and neither Gate-2a nor Gate-2b was issued. Its 2026-07-10 Glass-5.0 baseline is stale and must be re-derived. |

Package fields alone are not truth: several monorepos declare dependencies below the
root, use local Vite aliases, or import glass only in an app/demo package. The source
graph above is the binding migration input.

## Maturity is not one scalar

The latest tranche records require four separate judgments:

1. **Landed source hardening:** Atlas qualifies; portions of value.js U and
   keyframes U qualify, although neither owner/release tail is terminal.
2. **Formation hardening:** sci-report P and speedtest AX qualify strongly, but
   neither has source-execution credit. P is explicitly BORN RED; AX explicitly
   awaits Gate-2a.
3. **Active implementation:** Fourier M.W1 and keyframes U are in this class. Their
   dirty/current branches are evidence of work in flight, never a package handshake.
4. **Constellation currency:** no consumer qualifies for the eventual BI package
   merely because an earlier tranche was excellent. Every owner must resolve the
   final packed export map and return runtime evidence at its accepted commit.

This prevents “hardened” from laundering plan quality into shipped bytes, or a clean
worktree into current dependency compatibility.

## Retired-subpath break matrix

| Retired 5.0-era name | Current consumers in tracked source | Required clean-break destination |
| --- | --- | --- |
| `api` | muster, speedtest | Import each symbol from its owned public entry; regenerate MIGRATION from syntax-level symbol mapping. |
| `confirm-dialog` | value.js, muster | Compose/consume the canonical dialog confirmation contract; no alias export. |
| `context-menu` | speedtest | Consume the canonical dropdown/menu primitive with context-trigger semantics, or own a local product composition. |
| `glass-panel` | atlas, sci-report | Move to `surface`/`card` according to semantic role; do not resurrect `GlassPanel`. |
| `hover-card` | fourier-analysis, slides, speedtest | Choose `popover` for interactive content or `tooltip` for terse description; no ambiguous replacement wrapper. |
| `hover-popover` | atlas, fourier-analysis | Consume controlled `popover`; preserve open-state semantics explicitly. |
| `scrolling-text` | speedtest | Use the canonical text/motion primitive selected by its actual behavior; do not re-export the retired name. |
| `sheet` | muster, speedtest | Use `drawer` with side/bottom contract as appropriate. |
| `toggle-chip` | value.js, keyframes.js, muster, bbnf-buddy, speedtest | Use `chip` selection mode; no compatibility alias. |

The current `MIGRATION.md` is contradictory: its headline claims only `./api` was
dropped and a 96/96 surface was preserved, while later sections describe multiple
removals. It must be generated from the final entry graph and this consumer symbol
map. A prose-maintained migration list is no longer authoritative.

## Repository-specific handshake packets

### value.js

- Respect the U/V split: U's implementation and close ledger do not complete V's
  structural campaign. V resumes at pass 5 only by owner motion and still owes
  committed apply codemods, scope/fork closure, a measured performance limb, and
  two consecutive clean passes.
- Wait for the owner to disposition the two deleted CLAUDE files and untracked π
  corpus; do not infer deletion intent from the otherwise compatible global policy.
- Provide one migration packet for `confirm-dialog` and `toggle-chip`, plus final
  package tarball digest and generated symbol mapping.
- Re-run the 84-file import scan against the owner's accepted commit. Local
  `file:../glass-ui` makes accidental source coupling especially likely; require a
  packed-tarball build before acceptance.

### keyframes.js

- Preserve its current clean branch and deep motion integration. Its U close is not
  terminal until owner-golden sequence frames, the Glass consume, 5.3.0
  tag/publication, and deploy are evidenced.
- Packet maps `toggle-chip`→`chip` and `icon-tooltip`→`tooltip` as clean breaks, and
  preserves the public `header-ribbon` entry: tracked
  `demo/components/instrument/shell/EditorShell.vue` imports `HeaderRibbon` directly
  from `@mkbabb/glass-ui/header-ribbon`, so BI.W-P114 owns its public hardening and
  the keyframes owner validates that exact packed import rather than re-homing it.
- This consumer is the deepest test of keyframes/motion isomorphism; acceptance runs
  against the packed glass artifact, not a source alias.

### atlas

- Treat `v1.0.32` as the current hardened producer base, not as proof against the
  eventual BI tarball. Do not race or rewrite it from Glass.
- Packet separates `glass-panel` sites by semantics: chart/masthead content becomes
  Card/Surface, while atmosphere staging remains consumer composition.
- `hover-popover` becomes controlled Popover. Preserve its Easter-egg interaction,
  not the retired component name.
- Atlas is also embedded/referenced through sci-report and slides; deduplicate the
  migration proof at the union boundary rather than claiming three independent
  successes over one shared code lineage.

### fourier-analysis

- Its 27-path dirty M.W1 migration already touches equation, morph, and paper UI;
  no external patch may be overlaid. The current package bump is still the partial
  4.0/4.3/0.13 transaction, not the old promised BB 4.1 terminal state.
- Packet distinguishes two `hover-card` sites and two `hover-popover` imports by
  behavior, includes the final metric-family mapping, and names the packaged version.
- Owner returns a commit plus build/test evidence after reconciling its live branch.

### sci-report

- Treat nested atlas files, app files, and dashboards as one import union. Prototype
  and historical evidence paths do not receive production migration credit.
- Preserve the distinction between plan-v4 convergence and execution: the P ACK in
  this formation is FORMULATION_ONLY, and P.W0 plus every external prerequisite
  remains RED.
- Packet maps `glass-panel`, metric family, and styles import; owner decides whether
  nested prototype files remain executable subjects or archival evidence.
- Do not write into the active P-refinement paths or generated audit directories.

### muster

- Its 89 dirty visual artifacts are protected. No cleanup command is permitted.
- Packet covers four retired entries and the metric-family fold. The `sheet` sites
  choose Drawer orientation explicitly; `api` maps per symbol.
- Because this consumer uses 30 subpaths and product-grade instrument chrome, it is a
  release-blocking handshake if constellation acceptance remains in BI scope.

### bbnf-buddy

- Clean worktree but old `^3.9.0` range. Packet covers `toggle-chip`, final Dock/Tabs
  contracts, and package-major migration notes.
- Require editor keyboard and dock interaction evidence; a build-only acceptance is
  insufficient for its interaction-heavy surface.

### slides

- Packet maps `hover-card` by interaction contract and validates Dock, FourierField,
  and Constellation under slide transitions.
- Its atlas consumption is not a reason to mutate atlas here. Slides returns its own
  import/build/π evidence; the shared atlas lineage is recorded once in the union.

### speedtest

- Widest and most release-sensitive consumer: the current member-demand scan sees
  83 tracked files, 154 clauses, and 243 named bindings, including six retired
  subpath families.
- Treat AX pass-8 as a high-quality implementation specification only. Gate-2a/2b
  never opened, zero source/server execution landed, and W0 must freshly derive the
  final Glass/Keyframes/value package set rather than presuming the stale 5.0.0
  baseline.
- Packet includes symbol-level `api` moves, `context-menu` semantics, `sheet`→Drawer,
  `hover-card`→Popover/Tooltip, `scrolling-text` disposition, `toggle-chip`→Chip, and
  the metric-family fold.
- Acceptance includes packed-tarball resolution, TypeScript/build/tests, admin and
  survey keyboard/touch states, and representative painted routes. No foreign edit
  is made by glass-ui.

## Slides → sci-report/atlas union rule

The three repositories overlap through atlas-derived code and references. Perfected
BI records three consumer handshakes but one lineage family:

```text
glass-ui package
  -> atlas direct app
  -> sci-report app + nested atlas/report surfaces
  -> slides presentation surfaces that also consume atlas concepts
```

A direct atlas acceptance does not prove sci-report or slides, and a nested copied
prototype does not prove atlas. Conversely, the same atlas file must not be counted
as three distinct external consumers for substrate-retention decisions. The
constellation gate deduplicates by repository object identity and tracked path hash.

## Local execution subjects

Perfected BI creates no foreign wave. Its local constellation subjects are:

1. generate the final symbol/subpath migration map from the entry graph;
2. emit nine owner-specific packets under `docs/coordination/` with the exact package
   tarball digest and required commands;
3. run read-only stale-import probes;
4. record returned owner commit/evidence in the disk cursor;
5. block the tag while any in-scope handshake is nonterminal.

If the product owner decides constellation adoption is outside this release promise,
that decision must be made before implementation and the release claim must say
“library artifact only.” It cannot be discovered at close and called user-domain.

## No-write verifier

At launch the cursor records each sibling's branch, HEAD, porcelain digest, and
tracked-tree digest. After every read-only probe it verifies they are unchanged by
the BI process. A sibling may change through its own active owner; that invalidates
the snapshot and requires a re-scan, not a rollback. Any BI-originated foreign diff
is an immediate tranche block.
