# Whole-census reconciliation pass 1 — source / denominator / ownership — C59

Date: 2026-07-22 EDT

Phase: **formation-only source reconciliation**

Execution authority: **none**

## Verdict

**PASS-1 SOURCE CENSUS CONVERGED WITH CORRECTIONS / 174 VUE LEAVES +
`_shared` + DECK SEATED EXACTLY ONCE / 99-SCREEN AND 396-RAW-CELL
DENOMINATORS RECONCILED / PUBLIC-REACH MATRIX HAS EIGHT CORRECTABLE FALSE
SUBPATH CLAIMS / OWNERSHIP CONFLICTS BOUNDED FOR C61 / PRODUCT, PACKAGE,
BROWSER-DEPTH, CONSUMER, AND ACCEPTANCE RED.**

This pass independently reproduces the source and route cardinalities behind
C48. It finds no missing or duplicate Vue basename, no manifest row without a
flat SFC, and no unowned zero-Vue adjacent family. It does find that C48's
`root + /x` notation overstates eight package subpaths, that CompletionSeal is
the sole immediate component family without a committed direct component test,
and that Alert and Badge retain live component→own-barrel value cycles.

Instrument Chassis remains owner-final **REMOVE TOTALLY**. Confirm remains an
owner-final story **FOLD** into Dialog. Neither is relitigated. C57 supersedes
only C55's assay-B onset wording; the A `+120 ms`, B `+900 ms`, and verified PRM
`+120 ms` HandMark text-paint divergences remain binding under GF-HANDMARK.

No product, source, test, gate, generated output, package, lock, consumer,
repin, route, evidence, release, or acceptance byte is authorized or credited.

## 1. Frozen authority

| Input | Lines | SHA-256 |
|---|---:|---|
| `WHOLE-LEAF-COVERAGE-RECONCILIATION-C48.md` | 398 | `1224ffc6a494fc3c6595cae4a98f71256fd050648bed862f401c73f3707c6a3e` |
| `UNIVERSAL-REMAINDER-BROWSER-COHORT-C48.md` | 373 | `8cd62073e036c573036a5f343c20f9cbe75d1b47afd8ee921d85006d2246600c` |
| `OVERFIT-PORTFOLIO-ASSAY-C48.md` | 491 | `ce382a90659ca7a9aa85f99f1fde1e45c0b8178aa94bf0467c4f33916d4f0482` |
| `OVERFIT-PORTFOLIO-SYSTEMS-ONTOLOGY-CRITIC-C52.md` | 572 | `306381a0ef46fdf49bd7dfb0f8ff9897e2f70a2014a2f933d05dcc243cc60018` |
| `WHOLE-LEAF-CRITIC-2-MOTION-MATERIAL-BREATH-OF-LIFE-C52.md` | 478 | `f44f7c3a53f1a95bea9119abe590fdf44a9ad49cc09dd03cbd5a00607d301dcd` |
| `UNIVERSAL-CRITIC-3-INTERACTION-A11Y-PACKAGE-C52.md` | 489 | `1968f8b85fe1ec2e96bb278b4fe92e4e2acabeb0614b1ad7c2cee0135778426f` |
| `MOTION-TEMPO-MOBILE-LIFECYCLE-RECEIPT-C53.md` | 84 | `bdfe59d6178355f8ef164d489f29670e1c348396c3293c6a8ef62ca39db7869e` |
| `DOCK-MOBILE-MORPH-RASTER-RECEIPT-C56.md` | 83 | `0eedb6cf4ea8231e6cd12604ff475df77cac4ec5c241a837a6a87d5f12a803d2` |
| `HANDMARK-FRAME-ORDER-CORRECTION-PRM-REDRESS-C57.md` | 68 | `e080b3cb1bdbdb270e999148f41aca19d18b181ac1f00411792c27819ad7675b` |
| `COMPLETION-SEAL-MOBILE-STORY-REACH-RECEIPT-C58.md` | 64 | `1bed93dc32a8939d3a5859dce3ac1d4463306836c0bfd24d250a9a398d97e885` |
| `HOME-AURORA-RESTORATION-OWNER-RECEIPT-C60.md` | 68 | `12e991902dc14366aa70bcabc8402b86a5f5ff93ba72a10a427c441c976415fe` |
| `OVERFIT-SUBTRACTION-OWNER-RULING-C45.md` | 67 | `ef7abd0d52af58b91ef2310a9b969b6dd958dae2a55e39f60bfff9c50ef2ff5f` |
| `DOCK-STRUCTURAL-APOTHEOSIS-ADJUDICATION-C37.md` | 464 | `4d043019dde760a8a6f068783db84901c2fd4a09ebde45c358be8dca9c67bd6b` |
| `BREADTH-APOTHEOSIS-ADJUDICATION-C40.md` | 389 | `1fe1eb1ba64ef7e5897a9b6fbaaf9d61d85fc9b0d5c48b615246076aa768042a` |
| `LIVING-APOTHEOSIS-ADJUDICATION-C41.md` | 442 | `4b87cf02cc7a1b22f33fc904e5f0b6850fe9c167e0f6fe638ca09baac69ef15b` |
| `DATA-FEEDBACK-APOTHEOSIS-ADJUDICATION-C46.md` | 281 | `8a46a588d3bfd4c2ec2dbb8119ff2d521f8207defac4a1fa794e7425009430a4` |

The correct committed source cursor is Glass HEAD
`0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
`97b386172a899ef43b686ffbe43263395b3a7744`. Critic 2 C52 prints a different
tree (`97b38608…`) in its front matter. That value does not resolve to the
controlling tree and is treated as a receipt transcription defect; C59 uses the
tree repeated by C37/C40/C41/C46/C48 and independently confirmed by Git.

The worktree is materially dirty. `src/components/**`,
`demo/stories/manifest.ts`, `demo/router.ts`, and
`scripts/lib/subpath-policy.mjs` are clean at the source cursor. `package.json`
and 17 component-test paths are dirty and receive no committed-candidate credit.

## 2. Exact component census

### 2.1 Cardinality and set equality

Read-only filesystem enumeration produces:

- 63 immediate directories under `src/components`;
- 61 directories containing Vue leaves;
- 174 `.vue` files;
- 174 unique Vue basenames;
- zero duplicate basenames;
- `_shared` with 0 Vue leaves and 19 adjacent source files;
- `deck` with 0 Vue leaves and 5 adjacent source files; and
- an `index.ts` in all 63 immediate directories.

The second-column leaf names in C48's lossless matrix were extracted and sorted
against the actual source basenames. The result is exact:

```text
document leaves       174
actual leaves         174
document duplicates     0
actual duplicates       0
actual-only              0
document-only            0
```

Family counts independently reproduce C48:

| Families | Vue leaves |
|---|---:|
| accordion 4; alert 3; animated-digit 1; aurora 1; avatar 3; badge 1; blob 1; button 1; card 7; carousel 4 | 26 |
| checkbox 1; chip 1; collapsible 3; command 9; completion-seal 1; configurator 3; constellation 1; dark-mode-toggle 1; data-table 1 | 21 |
| dialog 9; dock 8; drawer 7; dropdown-menu 14; easing 2; expandable-container 1; fading-scroll 1; fourier-field 1 | 43 |
| handmark 1; header-ribbon 1; infinite-scroll 1; input 1; instrument-chassis 1; label 1; labeled-field 5; metric 4; number-field 5 | 20 |
| pager-dots 1; paper-backdrop 1; popover 3; progress 1; radio-group 2; scroll-progress-rim 1; search 1; select 10; separator 1 | 21 |
| skeleton 1; slider 1; sortable-list 3; status-dot 1; surface 1; switch 1; table 8; tabs 1; tags-input 5; textarea 1 | 23 |
| timeline 6; toast 6; toggle-group 2; tooltip 4; typewriter 1; watercolor-dot 1 | 20 |
| **Total** | **174** |

`_shared` and Deck are therefore adjacent owners, not missing leaves and not a
175th/176th Vue numerator. `_shared` owns cross-family axes, class/primitive,
interaction, selection, floating, motion, contexts, and styles. Deck owns a
headless state/keyboard contract and has an exact committed contract test plus
Atlas receivers. Both must remain first-class in dependency analysis.

### 2.2 Adjunct and test seating

Every immediate family has a local barrel. Source-adjacent styles, types,
constants, composables, contexts, shaders, and READMEs remain within the family
or the named `_shared` dependency. No family-level source orphan was found.

The committed component-test census contains 127 test files. A family/path and
symbol search finds a committed test anchor for every immediate family except
`completion-seal`. C58 confirms that gap and routes it to the existing
CompletionSeal lifecycle/status owner. The canonical story is not a substitute:
its fixed four-column/non-wrapping mobile composition clips the fourth seal and
replay row, while the primitive itself remains the adjudicated finite-motion
reference.

Seventeen current component-test paths are dirty. They may contain useful draft
detectors, but they cannot close this frozen pass. Tests that stub StoryPage,
StorySection, StoryPlayButton, or other chassis helpers likewise do not prove the
helper contract they replace.

### 2.3 Live graph conflicts

Two exact component-to-own-barrel value cycles remain:

- `Alert.vue` imports `alertVariants` from `./`, whose barrel re-exports
  `Alert.vue`; and
- `Badge.vue` imports `badgeVariants` from `./`, whose barrel re-exports
  `Badge.vue`.

C40 already binds the Alert fix to a defining leaf with unchanged public
surface. Badge needs the same import-direction principle, not another registry.
The larger Drawer, Constellation, Aurora, Tabs, shared-selection/interaction,
and accent-solve SCC debts remain dependency inputs; route/test reach does not
discharge them.

## 3. Route and raw-rest denominator

### 3.1 Source-truth routes

The clean manifest contains 11 category rows and 87 story rows:

| Category | Stories |
|---|---:|
| Foundations | 12 |
| Substrates | 6 |
| Forms | 7 |
| Display | 5 |
| Containers | 14 |
| Navigation | 5 |
| Dock | 8 |
| Data | 10 |
| Feedback | 6 |
| Motion | 8 |
| Compositions | 6 |
| **Total** | **87** |

`demo/router.ts` derives one route for each story, one landing for each category,
and Home. Therefore `87 + 11 + 1 = 99` reachable screens before the semantic
404. `/forms/select` has no manifest row and remains a truthful 404, not a
missing 100th screen.

All 87 parsed `s(category,id,…)` rows have a matching flat
`demo/stories/<category>/<id>.vue`. There are 99 flat non-tile SFCs. The other
12 are exact nested members, each with a real receiver:

```text
data/avatar                    -> display/atoms
display/dark-mode-toggle       -> display/atoms
display/separator              -> display/atoms
display/status-dot             -> display/atoms
feedback/toaster               -> feedback/toast
forms/label                    -> forms/inputs
forms/select                   -> forms/inputs
forms/textarea                 -> forms/inputs
foundations/paper-texture      -> foundations/paper-glass
motion/animated-digit          -> motion/text-motion
motion/countup                 -> motion/text-motion
motion/typewriter              -> motion/text-motion
```

They are nested story modules, not route orphans. The flat glob also sees four
`.tile.vue` files, but only the separate tile loader owns them. This validates
C52's warning: future example fixtures must live outside the flat glob or prove
module/route/bundle exclusion.

### 3.2 The 396-cell partition

The corrected raw-rest partition is arithmetically lossless:

| Cohort | Screens | A/B × desktop/mobile cells |
|---|---:|---:|
| universal remainder C48 | 64 | 256 |
| Dock C32/C37 | 9 | 36 |
| Tabs/Slider/Alert/Card C35/C40 | 4 | 16 |
| living substrate/overlay/motion C38/C41 | 8 | 32 |
| Data/remaining Feedback C43/C46 | 14 | 56 |
| **Total** | **99** | **396** |

The remainder table contains 65 ledger rows: 64 reachable screens plus the
historical `/forms/select` 404. For the 64 reachable rows, this pass verified
all 256 cells: 246 local files exist and match their full recorded SHA-256; ten
Assay-A category-mobile cells intentionally point to the immutable C47 aggregate
receipt; mismatches are zero. The four cohort partitions supply the other 140
cells and sum exactly to the 35 non-remainder screens.

This is **raw rest reach only**. It does not prove focus, action, capture,
interruption, PRM, native-DPR motion, dark/forced colors, actual Safari,
VoiceOver, package identity, or consumer behavior. C53, C56, C57, C58, and C60
are negative depth receipts layered on that breadth, not contradictions of the
denominator.

Any authorized route subtraction must branch forward from 99/396. C47's 93/372
remains immutable historical arithmetic. If every currently proposed cut were
later adjudicated, the possible branch is 89 screens, or 88 if Virtual Section
also leaves; those numbers are not authorized while the composition and virtual
branches remain open.

## 4. Export and package reach reconciliation

The clean fail-closed policy at
`scripts/lib/subpath-policy.mjs` SHA-256
`fb3ae494423d21e567f790c0e1d6d46996158148ea98f9059ee33f7c9ba19809`
reproduces:

```text
component directories  63
PUBLISH                 50
INTERNAL                13
current export keys     72
JS subpaths             66
symbol failures          0
collisions/adds/drops     0
exact reproduction     true
```

That validates policy-to-current-manifest consistency. It also proves eight
C48 public-reach labels false. C48 defines `root + /x` as root **and package
subpath**, but these are root-only INTERNAL families:

| Family | C48 false claim | Current truthful reach |
|---|---|---|
| Accordion | `./accordion` | root only |
| Alert | `./alert` | root only |
| Avatar | `./avatar` | root only |
| Checkbox | `./checkbox` | root only |
| RadioGroup | `./radio-group` | root only |
| TagsInput | `./tags-input` | root only |
| Skeleton | `./skeleton` | root only |
| Table | `./table` | root only |

The correction is documentation/denominator truth, not permission to publish
eight new subpaths. Carousel and Infinite Scroll are explicitly INTERNAL in the
component tier but have curated subpaths; Input and Textarea are intentionally
reached through `/forms`. Those are not additional errors.

`package.json` current dirty SHA-256 is
`44de86637c98b7b6310cd6614fa77f59b2517b42097945295806b00f88a5b914`;
committed HEAD's package SHA-256 is
`3a0618a72dc56c18589546b84960140d42fe6c548757499e4e967ede743b8e61`.
The current exact-reproduction result is useful formation evidence, not an
immutable package candidate. Stories resolve `@glass` to source. No source
alias, mutable `dist`, or dirty manifest proves installed reach.

Instrument Chassis still appears in source, root/subpath policy, package
exports/typesVersions, tests, story, and local dist. That is expected born-RED
state before its authorized atomic removal, not an ownership conflict or
retention signal.

## 5. External consumer reconciliation

The C48 exact external anchors resolve in the named Atlas, SCI, value.js,
keyframes.js, Muster, and Fourier Analysis worktrees. Representative direct
source edges independently re-resolve:

- Atlas Aurora, Constellation, Deck, Dock, Drawer, Slider, Surface/Card, and
  Expandable receivers;
- value.js Blob/Aurora/WatercolorDot/Dock/Search and ConfiguratorRow receivers;
- keyframes Dock, StatusDot, Dialog, Slider, Easing, Aurora, and Metric receivers;
- Muster's Configurator, ConfiguratorLayer, and ConfiguratorRow workstation;
- Fourier Analysis's Configurator/Layer/Row visualization tree; and
- SCI's named dashboard/filter/metric/completion receivers.

This is source reachability, not current-package acceptance. Atlas and SCI
declare/install Glass 6, value.js declares `^7.0.0`, and keyframes has an
extraneous undeclared 7.0.0; frozen inspection found different runtime bytes
under the same 7.0.0 label. Exact current public API survival therefore requires
one uniquely versioned tarball, clean installs, declarations/styles/subpaths,
served chunks, and authorized consumer builds. A source receiver can justify a
semantic job while still failing delivery proof.

Private consumer reaches remain RED cleanup, not producer asks: Atlas/SCI
StatusDot and Metric internals, HandMark `.hm__svg`, value.js SegmentedTabs
classes, and governed Dock reaches may not create compatibility aliases or
new public effects.

## 6. Owner-held decisions and conflict resolutions for C61

### 6.1 Terminal decisions — carry without debate

1. **Instrument Chassis — REMOVE TOTALLY.** Delete source, type, style, README,
   barrels, root/subpath/package reach, generated output, tests, story/route,
   docs, tokens, and exact consumer edges atomically. No renamed or inlined
   sleeve.
2. **Confirm Dialog route — FOLD into Dialog.** Preserve useful decision/busy
   evidence in the canonical Dialog owner. No `ConfirmDialog` producer, alias,
   route, or second reveal engine.
3. **Dock C37, breadth C40, living C41, and data/feedback C46 architectures are
   controlling.** New evidence deepens their detectors; it does not mint rows or
   reopen their target mechanisms.
4. **HandMark — GF-HANDMARK only.** C57 retracts assay-B onset clipping, not the
   defect. Preserve A `+120 ms`, B `+900 ms`, and PRM `+120 ms` paint divergence;
   one decorative mark plane, no second renderer/text copy/generic scrubber.
5. **CompletionSeal — KEEP.** C58 is a story composition failure plus a direct
   lifecycle-test gap. Fix responsive story reach under the existing primitive;
   do not replace the renderer.
6. **Home — restore existing Aurora.** C60 proves Home deliberately replaced it
   with paper, a hand-coded meniscus, WatercolorDot, and duplicate identity
   tiles. Fold those route-local layers and restore the existing Aurora/StoryHero
   lifecycle; no Home shader or per-card context.

### 6.2 Open branches C61 must decide or preserve as HOLD

| Conflict | Reconciled C59 boundary |
|---|---|
| eight false subpath labels | Correct the matrix to root-only; do not auto-publish. |
| compositions category/six pages | C48 proposes removal, but only Confirm is terminal. Require exact per-page producer migration or intentional-rejection rows before a route cut. |
| Story Chassis route | Survival/removal remains conditional. Contributor guidance must exist and derive from the actual STORY registry before deletion. |
| STORY W1 versus direct wrappers | STORY W1 owns manifest/page types/wrapper variants. VizStudio studio role and page-root FamilyTabs must not become parallel direct front doors. |
| shared demo chassis keeps | Import counts prove blast radius, not contract. StoryPage, StorySection, ShowcaseFrame, FamilyTabs, and shell navigation need direct isomorphic tests or explicit gap receipts. |
| DataTable | ASK-8 branch first: KEEP/THIN or REMOVE/FOLD before further implementation investment. |
| Virtual Section | Named deterministic demo benchmark or remove from gallery. If Dock Search still needs the coherent engine, do not paste 535 lines into a story or public-export it. |
| Configurator diet | KEEP current public component; HOLD any prop/slot/event cut until exact external/package census and separate adjudication. |
| EasingConfigurator | FOLD-OR-JUSTIFY against EasingPicker; no copied playback clock. |
| AnimatedDigit, PagerDots, FourierField | Foundation survival remains conditional on distinct job, lower total complexity, direct proof, and no parallel engine. A rest story alone is insufficient. |
| TokenLadder | Keep repeated renderer but thin unreceived demo-only axes if the frozen prop-grain census remains zero. |
| Blob / Constellation route specimens | One persistent renderer/context/clock each. Blob plain becomes a mode/preset; Constellation must count the hero and remove extra canvases, globals, polling, and keyed remounts. |
| Tempo / StoryPlayButton | One Springs transaction: reversible root tempo setting, next natural spring construction, no keyed remount, inline public Button, real receiver test. |
| examples colocation | One rendered/raw file identity outside the flat story glob; prove route/module/bundle exclusion. |

### 6.3 Source-order conflicts

The dependency order needed by C61 is:

1. correct the eight public-reach rows, freeze 174+adjacent owners, and record
   current dirty/package/test exclusions;
2. reconcile STORY W1, route producer ledgers, and the forward branch from
   99/396 before deleting any route;
3. execute terminal Instrument/Confirm cuts only under their existing atomic
   owners;
4. land nearest source graph/test corrections—Alert/Badge cycles,
   CompletionSeal direct test, chassis helper tests—without changing public
   ontology;
5. serialize same-file folds (Tempo + StoryPlayButton in Springs) and existing
   Expandable→VizStudio→Configurator ownership;
6. execute one-renderer Blob/Constellation and Home-Aurora consumer corrections;
7. resolve ASK-8, Virtual, and foundation-only survival branches; then
8. build/pack once, install exact authorized consumers, run interaction/PRM/
   Safari/VoiceOver depth, and obtain independent close.

## 7. Load-bearing falsifiers

| ID | Mutation | Detector that must fail |
|---|---|---|
| C59-R01 | add, omit, or duplicate any Vue basename relative to the frozen 174 list | actual↔document sorted set equality fails |
| C59-R02 | ignore `_shared` or Deck because either has zero Vue leaves | adjacent-owner/barrel/test/export graph fails |
| C59-R03 | assert any of the eight absent subpaths or publish one by reflex | policy/package/public-reach comparison fails |
| C59-R04 | add a manifest row without a flat SFC, or treat a nested member/tile as a route | manifest/SFC/route bijection and nested-owner ledger fail |
| C59-R05 | count `/forms/select` as reachable | manifest-derived 99-screen denominator and semantic-404 check fail |
| C59-R06 | remove a route without branching 99/396 and preserving historical cells | route/evidence migration fails; C47 and C48 receipts remain immutable |
| C59-R07 | promote 396/396 raw rest to interaction/package/AT acceptance | evidence-capability check rejects the claim |
| C59-R08 | restore Alert or Badge own-barrel value cycles | SCC/import-direction detector fails |
| C59-R09 | claim CompletionSeal direct coverage from its story or preserve its clipped grid | direct-test and four-shape/mobile-reach detector fail |
| C59-R10 | use C55 to call assay-B onset clipped, or ignore the PRM `+120 ms` failure | C57 exact-frame chronology check fails |
| C59-R11 | rescue Instrument Chassis through a renamed/inlined/exported sleeve | atomic source→pack→install→serve→consumer absence gate fails |
| C59-R12 | restore the separate Confirm route or a second reveal owner | story uniqueness and Dialog-owner test fail |
| C59-R13 | repair Home with a Home-only shader, retain meniscus/dot over Aurora, or add card contexts | C60 Aurora-owner/single-context detector fails |
| C59-R14 | accept source aliases, dirty package/tests, stale consumers, or same-version divergent installs | immutable artifact/lock/runtime identity gate fails |
| C59-R15 | promote an internal overlay/timeline/select leaf merely to test it | public-boundary and parent-reach tests fail |
| C59-R16 | copy a private consumer selector/effect into public compatibility API | consume-unmodified census and deletion mutation fail |

## 8. Pass-1 conclusion

The universal source denominator is now coherent at its claimed grain:

- 174/174 Vue leaves match source exactly once;
- `_shared` and Deck are explicitly seated adjacent owners;
- 63/63 immediate families have barrels;
- 87 manifest stories + 11 landings + Home = 99 screens;
- the 12 extra flat SFCs are named nested members, not routes or orphans;
- the five Browser cohorts partition 99 screens / 396 raw-rest cells exactly;
- the 64-screen remainder's 246 file hashes and ten C47 pointers reconcile with
  zero mismatch; and
- the fail-closed export policy reproduces its current manifest exactly.

The corrections are equally exact: eight public-subpath claims are false,
CompletionSeal lacks a committed direct test, Alert/Badge retain own-barrel
cycles, dirty package/test bytes receive no credit, and installed consumers do
not yet name one immutable artifact. C57 and C60 add owner-specific forward
truth without new architecture.

**C59 therefore closes source/denominator enumeration for C61, not component
apotheosis.** C61 must adjudicate the bounded conflicts above while carrying
terminal removal/fold decisions and existing cohort architectures unchanged.
Product, package, Browser-depth, consumer, accessibility, release, and
acceptance remain RED.
