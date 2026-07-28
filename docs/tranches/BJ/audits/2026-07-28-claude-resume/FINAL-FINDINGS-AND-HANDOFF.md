# Final findings and handoff — resume the active Claude session, do not restart it

**Audit date:** 2026-07-28, America/New_York  
**Target Claude session:** `f7246310-06bc-4dbe-ba5d-5b9bbe793e21`  
**Workflow:** `wf_95c36395-9fa`  
**Repository authority:** `d844bef6f25f72cf7d7132643f502076e9dd2b4c`
plus the preserved live dirty worktree  
**Disposition:** archaeology and formation audit complete; stage-2 and BK
execution remain unsealed

## Terminal status

Claude should resume the exact stage-2 responsibility it held. It must not
re-run discovery, promote a partial arm, or begin a BK source wave.

Nothing has advanced in the target session since the wall:

- HEAD is still `d844bef6`, `docs(BJ/refinement): stage-2 delta fold
  launched`;
- the target transcript still ends at the 2026-07-28 15:57:13Z session-limit
  response;
- the workflow journal still has two `started` rows and zero `result` rows;
- neither arm crossed the workflow result boundary;
- no writer, critic, canonical applier, or seal ran;
- the canonical terminal roster and BK cursor remain pre-fold;
- the three polished stage-2-looking files remain mutually inconsistent,
  untracked candidates;
- BK has been formulated, not implemented.

The old pass-1 handoff remains a receipt for hashes, salvage, and detailed
history. This document supersedes it for resumption because it adds the closed
consumer/page universe, corrected graph, third-Sol adjudication, hotfix ledger,
and cross-repository contracts.

## What the audit closed

### Archaeology

- 26 Claude Code transcripts;
- the 128 newest Codex transcripts with the exact Glass UI CWD;
- 154 combined sessions, above the requested 100-session floor;
- the 160 newest tranche/wave/workflow artifacts, above the requested
  100-artifact floor;
- Git history, live workflow journals, partial arm logs, candidates, source,
  export map, tests, demo, and sibling-repository ledgers.

The recurring mistake is now evidenced, not rhetorical: the project produces
strong research but repeatedly calls a banked formulation “done.” From July 23
through the pass-1 audit, 29 tranche-document commits and zero `src/` commits
landed. More Ecoute documents will not repair an unsealed state transition.

### Frontend and consumer universe

The generated dependency boundary contains fifteen required Git roots, six
typed subpaths, five package scopes, three separately named operational mirrors,
and one zero-edge negative control. Exact module edges and broader textual
migration references are now separate measures.

The internal Browser covered:

- twelve logical application roots;
- 145 unique pages;
- seven additional canonical Keyframes mirror verifications;
- 152 navigated route instances;
- desktop 1440 × 900 and mobile 390 × 844;
- **304 route/viewport cells**.

The Glass workbench's own two-perspective-plus-adjudicator frontend audit also
remains valid. The consumer pass widens its evidence; it does not replace it.

### Import topology

The complete `src/` + `demo/` inventory has:

| Measure | Corrected v2 count |
| --- | ---: |
| Nodes | 890 |
| Internal edges | 2,308 |
| External edges | 623 |
| Repository-boundary edges | 1 |
| Unresolved imports/globs | 0 |
| Leaf modules | 112 |
| File SCC cycles | 10 |
| Cross-module edge pairs | 518 |
| Module SCC cycles | 3 |
| Isolated nodes | 34 |
| Tests under product roots | 0 |
| Module-prefix candidates | 146 |

Graph receipt:
`1f8124e4c3e1a87a5bcc79c8b6ce89b0c8862a044017d63ce6197057ee1581ed`.

The pass-1 generator omitted nineteen Vue external-block references and 107
Vite glob-expanded story edges. It is preserved under `IMPORT-DAG-PASS1*`;
its 2,182-edge/nine-cycle count is no longer authoritative.

Two fresh GPT Sol x-high challengers assumed the graph was wrong. Both
dispositioned every one of the 112 recorded modules and every pass-1 cycle.
The corrected graph then exposed a tenth giant manifest/story cycle and three
module SCCs. The third GPT Sol x-high adjudicator ruled the corrected v2
substrate with 112/112 unique modules, C01–C10, M01–M03, all 73 challenger
disagreements exactly once, and zero terminal `INVESTIGATE` rows. The graph
JSON, not prose, is the every-node/every-edge authority.

## Architecture ruling

The binding terminal topology is an iterative direction, not permission to
create a diagram's directories before a cluster earns them.

### Dependency direction

```text
types/tokens/contracts
        ↓
internal context · fields · selection · interaction · motion · rendering core
        ↓
forms · overlays · feedback · navigation · data display · material
        ↓
signature features (Dock, Aurora, Blob, Constellation, Handmark)
        ↓
demo workbench and consumer applications
```

An implementation imports its local leaves directly. A leaf barrel aggregates
outward only. No implementation imports its own barrel, no primitive imports a
signature feature, and no renderer depends on a generic component shelf.

Immediate inversions to cut:

- motion selection imports Tabs roving focus;
- Slider, Select, Popover, Dropdown, and Tooltip reach into Dock;
- renderer families converge through the oversized generic glass composable;
- demo route metadata, StoryPage/navigation, the manifest, and globbed story
  components form one giant SCC.

### Goldilocks module law

- One module has one user-recognizable responsibility and one owner.
- Split Aurora, Dock, Blob, motion, glass renderers, token/style registries,
  and the demo manifest only at independently changing contract/runtime/
  renderer/state seams.
- Dissolve `_shared` and implementation-kind buckets into semantic owners.
- Merge stock part wrappers, one-file chassis shelves, and class-only anatomy
  into their owner.
- Colocate feature-private helpers, styles, stories, presets, shaders, and
  fixtures.
- Inside a module, filenames name the remaining role: `option.ts`,
  `config.ts`, `root.vue`, `styles.css`; they do not repeat the containing
  module name.
- Keep tests outside product roots. After source topology stabilizes, move
  them to `tests/<source-relative-path>/<behavior>.spec.ts`; integration,
  route, architecture, and packed-package tests retain explicit separate
  owners.

### Clean-break law

There are no aliases, forwarding components, migration shims, old-path
re-exports, dual root/subpath paths, source-resolution fallbacks, swallowed
errors, mock-data fallbacks, or retired demo-route redirects. Source,
declaration, export, test, demo, peer, and named consumer migration changes
land in the same cut.

Consumer count records blast radius. It does not prove that a component or
subpath deserves to survive.

### Terminal semantic dispositions

The third pass supersedes pass-1's appealing but underproved deletion list.
These authored jobs survive, though most move or lose their current package
shape:

- DataTable;
- Deck;
- Carousel;
- InstrumentChassis;
- Avatar;
- Separator;
- Easing;
- Constellation;
- Fourier visualizer;
- WatercolorDot, renamed WatercolorSwatch.

Carousel's Embla item-scrolling job is distinct from Deck's full-viewport
headless paging and Navigation's pagination indicator. InstrumentChassis owns
stage/inspector/action layout contracts. WatercolorSwatch owns a deterministic
organic SVG/PRM mark rather than value.js color math or Blob's GPU field.

Confirmed folds/deletions include Badge → Chip, AnimatedDigit + Typewriter →
motion/text, native Table wrapper deletion, ExpandableContainer → Dialog,
Accordion + Collapsible → Disclosure, Label/labeled wrappers → Forms/Field,
PaperBackdrop → Surface/theme decoration, generic Keyboard/Reactive deletion,
and retirement of shadcn-shaped part/story topology.

### Canonical public surface

The current 72-key map is replaced by one fail-closed owner manifest. Runtime
root `"."` disappears because there is no unique install-only root contract.
Every symbol has exactly one path:

```text
./button
./surface
./chip
./avatar
./watercolor-swatch
./forms
./disclosure
./dialog
./drawer
./menu
./command
./popover
./tooltip
./feedback
./data
./search
./sortable-list
./navigation
./carousel
./dock
./configurator
./motion
./motion/easing
./motion/text
./renderers/aurora
./renderers/blob
./renderers/constellation
./renderers/fourier
./handmark
./theme
./styles
./fonts/*
```

There is no public `./axes`, `./blob-config`, `./canvas`, `./color`, `./dom`,
`./fourier-math`, `./keyboard`, `./motion-core`, `./reactive`, `./sidebar`,
individual form-control path, individual feedback path, or deep
implementation path. This is an ownership/loading plan; it does not authorize
empty façade barrels.

`TooltipProvider` is the sole surviving public provider. It lives only at
`./tooltip` and wraps the nearest real group of tooltip-bearing controls. It
owns dwell/sibling-delay policy only: no Dock policy, no per-trigger provider,
and no omnibus Glass app provider.

Reduced motion has one private lower producer under Motion. Features do not
read the media query independently. The canonical public loading path is
`./motion`, never `./motion-core`.

### Shadcn abrogation

Abrogation removes shadcn as ontology, anatomy, paint, class/variant dialect,
and compatibility promise while retaining earned Reka focus, keyboard, and
ARIA behavior. Close the finite eight-family ledger:

1. Alert;
2. Badge;
3. Toast;
4. Dialog + Drawer;
5. Table + DataTable;
6. Select + Command + menu rows;
7. Card + Surface;
8. mirror/forwarder shells and raw variant/class dialects.

Each family separately proves visual recipe, topology, token/utility
vocabulary, and public boundary. A deleted comment or zero `shadcn` string
does not prove idiom removal.

## Design ruling

Do not re-author the design canon from nothing. The exact 907-line candidate
and 288-line emitter are salvaged under
`salvage/W-DESIGN-CANON-APOTHEOSIS/`; `--check` passes. Sol must amend and seal
them:

- Golden Glass governs material-bearing chrome, not every component.
- Breath of Life is immediate truthful feedback in applicable states, not a
  decorative idle loop or universal five-state ceremony.
- Movement of Momentum is one interruptible spatial owner, curve-owned
  chromatic change, non-overshooting exits, and a static reduced-motion
  terminal.
- Exact timing ranks, rebound count, squash, and exit ratios are defeasible
  recipes.
- Focus Veil remains local until two real semantic consumers earn it.
- Card loses metal/cartoon/grid combinatorics.
- Research constants are never described as shipped.

The workbench target remains one quiet warm instrument around one active,
transmissive specimen. Remove nested cards, identity-only preview duplication,
configurator-first staging, and permanent story strips. Preserve the successful
clarity seen in Motion Tempo, SCI's product-specific composition, and both
slide applications.

## Consumer findings that change execution

### BBNF

- Delete the leaked
  `/docs/tranches/AZ-I/audit/AUDIT-6-ARCHITECTURE` product route; no redirect.
- Repair the seven other measured mobile code/table/tab overflows.
- SK-V25 remains unexecuted against a very large dirty tree.

### Keyframes

- The working mirror's application-root `TooltipProvider` hotfix restores all
  seven routes; it was added by the active value audit and landed by the
  Keyframes owner as `8281638c`.
- The clean canonical root already had the provider. Its missing install was
  repaired without tracked changes.
- Repair custom timing-function `serializeEasing`/`AnimationOptionError`.
- Close DialogContent Description/`aria-describedby` warnings.
- Reconcile the giant working tree against the clean canonical V authority.

### SCI/Atlas

Keep two migration lines explicit:

1. legacy dashboards: Atlas 4 / Glass 6 / Keyframes 5.3.5 / value 3.1;
2. active SCI/Atlas: Atlas 7 / Glass 7 / Keyframes 6 / value 4.

Atlas 7 production has 73 Glass edges / 44 files / 29 subpaths; active SCI has
30/19/12; pinned legacy SCI has 26/17/11. The Glass ledger's Atlas 74/45 adds
one named unit-test import and otherwise agrees exactly.

Atlas's local `useReducedMotion` retires after Glass exposes the direct
producer. Remove Atlas's universal transition clamp through
`W-MOTION-CORE`/`W-REPROOF`; no wrapper or second clamp. Also:

- give `/bead` a visible truthful page title;
- repair `/sci`'s zero summary and failed figure through the data/registry/
  render owner, then re-proof mobile occupancy;
- remove the stray literal `</content>`;
- stop JavaScript-importing card JSON from `public/`.

The pinned legacy SCI line was independently navigated across all thirteen
routes at both viewports. It has no horizontal overflow, unnamed controls, or
Vite overlay, but `/sci` renders three failed figures on desktop and four on
mobile; `/bead` and the 404 lack H1 ownership. This is not a functionally green
legacy line.

The active SCI feedback session had banked 36 families and 1,013 charges
before its own session wall, with demand-shell tail, VFT
botanical/taxonomy, and VFT story/home still partial. The Atlas audit receiver
has now incorporated this Glass contract into its canonical pass-2 handoff;
its v3 corpus reports 19/41 fold-ready, 78 queued, and four debts, with no
Atlas/SCI product source change.

### value.js

Do not edit value.js from this Glass session.

- The V megatranche remains active in its own Codex task.
- Its closeout landed `94ad2e71` (explicit feature/unfeature transport with
  root test/demo coverage) and `fe8785e5` (complete handoff, archaeology,
  Glass/Atlas coordination, and G0–G7 program).
- Admin still uses local shadcn Button/Badge forwarders.
- Every desktop Admin route forces a `My Palettes` companion pane.
- `dev:web-only` cannot prove palette CRUD; the value owner must run the full
  stack.
- Glass owes direct provider, motion, public-export, and migration contracts.
- The receiving task banked this Glass 112/112 contract without disposing the
  older O-series asks. Its remaining terminal blockers include 117 missing
  canonical component reports, three absent censuses, incomplete graph
  authority, Admin stale/soft-delete state, and unreachable CRUD surfaces.

### Fourier, Muster, Words, Speedtest, and slides

- Fourier M.W1 is dirty/partial; W2–W13 remain planned. It is pinned to Glass
  4 / Keyframes 4.3 / value 0.13, uses repetitive Card route frames, and needs
  its full API stack.
- Muster K remains partial and needs the root full stack. Put `data-test` on a
  concrete Dialog owner instead of a Teleport fragment.
- Words A's ledger is stale against July source changes and needs its full
  stack before CRUD sign-off.
- Speedtest AX is closed, but the package remains on Glass 4.0.1. Prove or
  merge its four visually identical variants and isolate its ResizeObserver
  loop.
- Slides N is authored, not shown implemented. Slides K W1–W4 is also
  unimplemented despite a strong current UI; source still has eleven slide
  modules rather than the planned seven.

## Audit hotfixes and boundaries

Audit-only fixes:

- Keyframes working root provider: source hotfix owned by the value audit;
- canonical Keyframes dependency install: no tracked change;
- Slides K dependency install: no tracked change;
- SCI fresh dev process: no source change.

The Browser audit is complete and finalized. All nine audit-only servers were
stopped. User-owned Value, Fourier, Keyframes, and prior SCI processes were not
stopped or mutated.

The visual audit is not a functional close for value, Fourier, Muster, or
Words. Their backend 502/CORS boundaries remain red. No mock or fallback was
added.

## Verification at handoff

| Check | Result |
| --- | --- |
| Consumer and DAG generator syntax | PASS |
| Corrected v2 deterministic rerun | PASS; receipt unchanged at `1f812…81ed` |
| Corrected graph completeness | PASS; 890 nodes, 2,308 internal edges, zero unresolved imports/globs |
| Third-Sol coverage | PASS; 112/112 unique modules, 73/73 disagreements, C01–C10, M01–M03, zero `INVESTIGATE` |
| `npm run iter-check` | PASS |
| `npm run verify:package` | PASS; 205 targets, 483 declarations, 114 CSS files, 67 strict consumer imports |
| `npm run verify:governed` | PASS; 48 active, 5 reserved, worst case 53/60 |
| `git diff --check` | PASS |
| targeted public-surface test | Expected RED: 80 pass / 1 fail; exact mismatch remains `armGlassRefract` + `supportsBackdropRefract` |

The full suite was not repeated after documentation-only audit changes. Its
prior receipt remains 2,610/2,614, with the two contention timeouts green in
isolation and the governed public mismatch reproduced above.

## Before implementation may begin

Exactly five gates remain:

1. **Stage-2 state gate:** GPT Sol x-high adjudication/writer and GPT Luna
   x-high mechanical verifier/applier produce journaled results, critic, seal,
   and one atomic roster + cursor + port + moved-ASK patch. Historical
   Fable/Opus logs remain literal provenance.
2. **Public-surface gate:** reconcile the dirty root exports
   `armGlassRefract` and `supportsBackdropRefract` with the governed
   `rootRuntimeExports`; do not automatically choose expansion over deletion.
3. **Graph-instrument gate:** accept the corrected v2 counts and third-Sol
   rulings, then land graph schema v3 with Vue/TS/CSS AST edge kinds, explicit
   owner manifest, package/build/test projections, and separate runtime/load/
   ownership SCCs. Preserve pass 1 and v2 receipts.
4. **Migration gate:** bank the exact final public-family replacement table
   with Atlas/SCI, value, Keyframes, and all named older-major consumers.
5. **Baseline gate:** rerun full test/type/package/governed-invariant gates
   after the sealed documentation/public-surface patch. The prior full suite
   was 2,610/2,614; isolated timeout tests passed, while the public-surface
   mismatch remained real.

No new tranche is needed to close these gates.

## Exact Claude resume sequence

1. Read this file first, then the corrected graph summary, third-Sol
   adjudication, consumer page/tranche/hotfix ledgers, and BK audit refresh.
2. Run `git status --short` and preserve every pre-existing dirty/staged file.
3. Recheck target transcript, journal census, workflow candidates, and HEAD.
   Compare by journal key and hash if anything changed; timestamp alone does
   not establish authority.
4. Read both historical arm logs and all three candidates as provenance. Do
   not hand-merge one.
5. Do not renew the obsolete Fable/Opus model phases. Route prospective
   architecture/writer/adjudicator work to GPT Sol x-high and bounded
   census/application/verification to GPT Luna x-high. If Luna is unavailable,
   stop before canonical mutation.
6. Require explicit dispositions for every original stage-2 delta plus this
   audit's corrected universe, graph, design, hotfix, and cross-repo inputs.
7. Prove exactly ninety roster IDs, sixty gate seats, the corrected Carousel
   keep/regroup + Words migration, full generated consumer boundary, finite shadcn ledger, corrected
   design-canon bytes, no orphan debt, and one canonical patch.
8. Record every phase result and seal in the durable journal before advancing
   row #90. Commit the sealed documentation state.
9. Reconcile the public surface and rerun full gates.
10. Begin BK cut 0/1 only: truth substrate/graph v3, then
    dependency-spine/SCC repair. Regenerate the graph after each cluster cut
    and repeat the two-challenger/one-
    adjudicator loop. Do not create ninety branches.

## Durable artifact map

- Session archaeology:
  `../2026-07-28-session-archaeology/HISTORY-ARCHAEOLOGY-TERRA.md`
- Frontend challenge/agglomeration:
  `../2026-07-28-frontend-apotheosis/`
- Consumer machine ledger:
  `../2026-07-28-consumer-constellation/CONSUMER-LEDGER.json`
- Page report and evidence:
  `../2026-07-28-consumer-constellation/CONSUMER-PAGE-AUDIT.md`
  and the four colocated JSON captures
- Tranche/wave status:
  `../2026-07-28-consumer-constellation/CONSUMER-TRANCHE-WAVE-AUDIT.md`
- Hotfixes:
  `../2026-07-28-consumer-constellation/HOTFIX-LEDGER.md`
- Corrected graph:
  `../2026-07-28-library-dag/IMPORT-DAG-V2.json`
- Two challenges and adjudication:
  `../2026-07-28-library-dag/CHALLENGE-A-SOL.md`,
  `CHALLENGE-B-SOL.md`, and `ADJUDICATION-SOL.md`
- Atlas inbound:
  `../../coordination/sci-atlas-inbound-2026-07-28-pass2.md`
- value outbound:
  `../../coordination/valuejs-outbound-2026-07-28-dag-consumer-contract.md`
- Execution addendum:
  `../../../BK/AUDIT-REFRESH-2026-07-28.md`

## Stop conditions

- no source execution before the five gates;
- no canonical mutation from a partial arm;
- no historical provenance relabelling;
- no new Ecoute without a named falsifier of a sealed row;
- no deletion from consumer count alone;
- no shared abstraction without a common semantic job;
- no compatibility path or masking fallback;
- no source/test move in the same topology batch;
- no “banked,” “formulated,” or “rendered” used as “landed,” “functional,” or
  “verified”;
- no Golden Glass, Breath of Life, or Movement of Momentum close without its
  captured Browser and reduced-motion evidence.

The audit is ready. Stage 2 is not sealed, and product execution has not begun.
