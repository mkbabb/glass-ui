# Findings and handoff — resume the active Claude session truthfully

> **Superseded for resumption by**
> `FINAL-FINDINGS-AND-HANDOFF.md`. This file remains a literal pass-1 receipt;
> do not discard its hashes or historical findings. The final handoff adds the
> closed consumer/page universe, hotfix ledger, corrected v2 import graph, and
> third-Sol adjudication.

**Audit date:** 2026-07-28, America/New_York
**Target session:** `f7246310-06bc-4dbe-ba5d-5b9bbe793e21`
**Repository pin inspected:** `d844bef6` plus the live dirty worktree
**Purpose:** let the existing Claude Code lead resume its stage-2 work with refreshed evidence,
without erasing provenance, promoting incomplete arms, or reopening months of settled research

## Read this first

The stage-2 fold is **not complete**.

- Workflow: `wf_95c36395-9fa`
- Journal: two `started` records, zero `result` records
- Arms: both historical Claude arms hit the session limit before returning
- Writer: did not run
- Critic: did not run
- Seal: did not run
- Canonical `TERMINAL-ROSTER.md` and `BK/EXECUTION-PROGRESS.md`: mutually consistent pre-fold
  state, now stale because later input banks exist
- Three post-fold-looking files: partial, untracked arm evidence only

Do not hand-merge an arm, call formulation closed, start a BK source wave, or advance row #90 until
a GPT Sol x-high adjudication and GPT Luna x-high mechanical verification produce a complete
result/writer/critic/seal chain and one atomic canonical patch.

The active lead should resume its **context and responsibility**, not the obsolete Fable/Opus launch
map embedded in the historical workflow script.

## 1. What this audit actually covered

The archaeology pass mechanically swept and manually adjudicated:

- all 26 Claude Code transcripts in the glass-ui project store;
- the 128 newest Codex transcripts containing the exact glass-ui CWD;
- 154 combined session transcripts, above the requested 100-session floor;
- the 160 newest tranche/wave text, JSON, and workflow files, above the requested 100-artifact
  floor;
- git history, active workflow journals, the current component/export/demo tree, and live sibling
  consumers;
- independent frontend audits by GPT Sol x-high and GPT Terra x-high, followed by a distinct final
  GPT Sol x-high adjudication;
- internal Browser inspection at 1280×720 and 390×844 across the home, Buttons, Inputs, Dialog,
  Dock, Motion Tempo, and Aurora routes;
- type, package, governed-invariant, and test verification.

Durable reports:

1. `../2026-07-28-session-archaeology/HISTORY-ARCHAEOLOGY-TERRA.md`
2. `../2026-07-28-frontend-apotheosis/FRONTEND-AUDIT-SOL.md`
3. `../2026-07-28-frontend-apotheosis/FRONTEND-AUDIT-TERRA.md`
4. `../2026-07-28-frontend-apotheosis/INTERNAL-BROWSER-EVIDENCE.md`
5. `../2026-07-28-frontend-apotheosis/FRONTEND-APOTHEOSIS-SOL.md`
6. `../../../BK/AUDIT-REFRESH-2026-07-28.md`

## 2. Exact active-session state

Authoritative transcript:

`/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21.jsonl`

Workflow journal:

`/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_95c36395-9fa/journal.jsonl`

Journal census:

| artifact | lines / bytes | SHA-256 |
|---|---:|---|
| `journal.jsonl` | 2 / 250 | `172ca85576f63d120841454f549b2450ef00776b927b5e9704a2c696699bcae5` |
| historical arm log `agent-aa8cddeb84f8c7551.jsonl` | 86 / 779,194 | `8e48dcffa7ae550f390b641c8de94db16758ab9640d91302773ac021515ee2b8` |
| historical arm log `agent-aec828bdb56027b40.jsonl` | 104 / 726,264 | `6890341d0083c942326f2d4a1a055494c66757c50c1b4a67886abd686e386828` |

Partial worktree candidates:

| file | lines / bytes | SHA-256 |
|---|---:|---|
| `STAGE2-FOLD.arm-fable.md` | 169 / 17,025 | `4f730eb8b229d408c30f78ea99dd712366174d3c6f24043838dd8eb7fd244a5f` |
| `TERMINAL-ROSTER.stage2-arm-opus.md` | 461 / 113,795 | `580ecc63bc8c1c02a23046ef9228f2fb3ce6f60e894610e2308a3928ec2cf608` |
| `TERMINAL-ROSTER.stage2.arm-fable.md` | 343 / 79,264 | `44b4b06157c942876ffafe2595bb895a116c1ad59a49185fc61229287dd1de29` |

The candidate files disagree materially. One says all three row-#90 halves fired; another preserves
an EXEMPLARS-CODEX delta debt. Neither completed the workflow result boundary. Their names and
polished language do not make either canonical.

## 3. Progress salvaged from the session wall

The proposed W-DESIGN-CANON body and emitter were temporary scratchpad bytes. This audit copied the
exact files, without promoting them, to:

`salvage/W-DESIGN-CANON-APOTHEOSIS/`

| file | lines / bytes | SHA-256 |
|---|---:|---|
| `DESIGN.md` | 907 / 58,233 | `d625484bf564edf6c8507b06231c9f226a0214fd5de1260aa795190fb9fdf77a` |
| `regen-design-canon.mjs` | 288 / 14,714 | `8cd8377e8b9331f21921f47ce4d10446cc982e827fdcb7a51749395a249b523b` |

`node salvage/W-DESIGN-CANON-APOTHEOSIS/regen-design-canon.mjs --check` is GREEN against the
current tree.

This is durable candidate evidence, not the root design canon. W-DESIGN-CANON still needs the
anti-contrivance Sol edits in §6 below and a sealed landing.

## 4. The large historical lesson

The project has learned to produce unusually strong research, but it has repeatedly confused
research closure with product closure.

- From 2026-07-23 through this audit: 29 tranche-doc commits, zero `src/` commits.
- The 2026-07-20–22 period did land real reductions and frontend changes; the later BK corpus mostly
  formulated the next system.
- “Dock” and “wake/resume” were repeated more than 100 times in the prior archaeology without
  equivalent source acceptance.
- The clean-break/no-legacy law has often been respected.
- The shadcn declaration/tombstone cleanup was mistaken for full idiom removal.
- Consumer censuses were corrected, then later summaries reintroduced narrower universes and stale
  zero-consumer claims.
- Session durability preserved scripts and output, but not an atomic accepted-state transition.

The cure is not an eighth Ecoute. It is one sealed state, a small number of file-owning source cuts,
and status counters that distinguish formulated, sealed, landed, and verified.

## 5. Hard corrections for the stage-2 seal

### 5.1 Model roles

Prospectively:

- GPT Sol x-high = design, synthesis, adjudication, orchestration, critique, challenge, paint taste.
- GPT Luna x-high = bounded mechanical extraction, tests, manifests, codemods, and canonical
  application from a written contract.

Historical Fable/Opus receipts retain their real provenance. Do not rewrite them.

This audit could call GPT Sol x-high, but GPT Luna was unavailable. GPT Terra x-high served as the
explicitly disclosed closest available independent challenger; Terra is not Luna. Therefore this
audit does not claim a Luna seat or a sealed row #90.

Because the current `stage2.wf.js` journal has zero results, an unchanged `resumeFromRunId` would
renew the obsolete model-bearing arm phases rather than replay successful results. Do not do that
after the owner supersession. Use the durable script, logs, candidates, and banks as the input
contract, but route the remaining adjudication/writer/critic/seal through a GPT-capable Sol/Luna
orchestrator. If Luna is still unavailable, stop before canonical mutation.

### 5.2 Carousel and consumer truth

Strike “carousel, the one clean 8/8 zero.”

`words/frontend` imports six Carousel symbols from `@mkbabb/glass-ui/carousel` while pinned to
`^3.0.0`. The truthful disposition is:

> Carousel DELETE-with-relay — words named; partially stale old-major consumer.

This is not a KEEP veto. It is a migration obligation. The earlier 11-repository band had already
recorded it; the later eight-repository summary regressed.

Replace every remembered fixed universe with a generated manifest/alias universe and a whole-repo
walk. Complete the minimum relay table:

- InstrumentChassis → speedtest + muster;
- CompletionSeal → atlas + sci-report;
- PaperBackdrop → atlas + speedtest;
- AnimatedDigit → fourier-analysis + speedtest;
- HeaderRibbon → keyframes.js;
- Carousel → words;
- WatercolorDot relocation → value.js.

Audit-time migration evidence:

- speedtest: `@mkbabb/glass-ui ^4.0.1`, 56 source files, 51 distinct glass-ui source specifiers;
  12 are absent from the current v7 map;
- words/frontend: `^3.0.0`, 86 source files, 21 distinct source specifiers; three are absent from
  the current v7 map.

Old-major drift is expected, but it makes an explicit v8 migration and publish matrix mandatory.

### 5.3 Demo count truth

The reproducible current count is:

- 11 categories;
- 87 manifest stories;
- 100 derived routes = root + 11 category landings + 87 story routes + 404;
- 124 raw Vue files in `demo/stories`, including four `.tile.vue` files.

Strike 99/112, 90/103, and 124-as-route-count. Do not answer the tile coverage gate by writing
87–120 miniature components. Use a family specimen, an honest frozen still, or no preview.

### 5.4 Stage-2 state transition

The Sol writer must adjudicate every delta in the existing stage-2 brief plus this audit's
corrections. The Luna verifier then proves:

- every required input has an explicit disposition;
- exactly 90 roster IDs and the expected cursor reconciliation;
- exactly 60 gate seats;
- row #18 says Carousel DELETE-with-relay to words;
- row #58 carries the four scoped demo detectors above;
- row #64 carries the finite shadcn ledger;
- row #76 uses the generated consumer universe and complete relay table;
- row #78 points to the adjudicated, durable design-canon bytes;
- no unbanked section is cited as landed;
- no deferred design clause lacks owner and trigger;
- the roster, BK cursor, BK port, and any moved ASK quotation change in one patch;
- the seal result is present in the journal before row #90 advances.

## 6. Frontend terminal judgment

The final Sol report is the frontend authority for this audit:

`../2026-07-28-frontend-apotheosis/FRONTEND-APOTHEOSIS-SOL.md`

### Keep

Keep the behavioral core: controls/forms, overlays, Search, Tabs, Table/DataTable, semantic feedback,
and the tested accessibility machinery. Keep Surface/Card thin. Keep Dock and Aurora as signature
surfaces, while cutting duplicate engines and configurator-first staging.

### Fold

- Drawer user job → Dialog detents;
- Accordion/Collapsible → one disclosure substrate, distinct public jobs only where needed;
- ToggleGroup/Tabs/Dock → shared selection/roving machinery below components;
- mirror/class-only part SFCs → owning compound components or exact direct exports;
- Card/overlay/menu/table/select implementation leaves → owner-private unless consumer composition
  requires a public part.

The first dependency-spine repair is concrete:
`src/composables/motion/morph/useSelectionGroup.ts` imports upward from
`src/components/tabs/composables/useTabRovingFocus.ts`. Move the roving machine below both consumers
before reshaping Tabs, ToggleGroup, or Dock.

### Delete or relocate with relay

Metric, InstrumentChassis, AnimatedDigit, PaperBackdrop, HeaderRibbon, CompletionSeal,
WatercolorDot, and Carousel, subject to the generated execution-time census and receiving
migrations. Delete exports, types, peers, tests, docs, demos, and consumers atomically.

### Earn back

Blob, FourierField, Constellation, Handmark, Typewriter, SortableList, public Configurator, and Deck
need a fresh current-contract consumer or a primitive job that the core cannot express.

- Typewriter also needs seeded determinism and opt-in typo simulation.
- SortableList needs keyboard/live-region reorder and PRM.
- Configurator defaults to demo-private.
- Deck remains RE-HEAR because Atlas consumes a headless stage/detent job unlike visual Carousel.

Visual distinction earns demo prominence, not permanent public-package cost.

### Shadcn abrogation

Do not delete Reka or Tailwind merely to win a string count. Remove the shadcn catalogue as the
component ontology:

1. owner-scoped meaningful part anatomy;
2. mirror/forwarder topology;
3. stock Alert/Badge/Toast/Dialog/Drawer/Table/DataTable/Select/Command/menu recipes;
4. raw variant/class dialects;
5. public shell leaves not justified by composition;
6. inherited vocabulary, ghost exports, and parity promises;
7. unjustified Reka imports.

Track default visual recipe, topology, token/utility vocabulary, and public API boundary
independently. Declaration-cleared is not idiom-cleared.

### Design canon edits before landing

Preserve the proposed one-law home, emitted constants, `--check`, fail-explicit OWED rows, and the
Golden Glass lineage. Amend:

1. “bare component” → bare material-bearing chrome;
2. universal five-state ladder → applicable states plus explicit omissions;
3. document singleton → active promoted engagement singleton;
4. universal delay/rebound/squash/exit numerology → defeasible recipes;
5. shared Focus Veil → local until two real consumers;
6. section numbering;
7. generic Card metal/cartoon/grid axes;
8. any claim that research constants are already shipped.

Breath of Life reduces to immediate, truthful applicable feedback without decorative idle loops.
Movement of Momentum reduces to one interruptible spatial owner, curve-owned chromatic change,
non-overshooting exits, and a static PRM terminal.

## 7. Internal Browser result

The demo is not globally clipped or unreachable.

- Desktop and mobile dedicated main scrollers reach their endpoints.
- The mobile endpoint is not occluded by the fixed dock in the audited home posture.
- Inputs have no measured horizontal overflow and expose distinct semantic states.
- Dialog focus, role, scrim, and autofocus work in the sampled route.
- Motion Tempo is the clearest current one-clock workbench story.

The real defects are hierarchy and density:

- duplicate identity-title previews;
- cards inside cards for control-state comparisons;
- hallmark components subordinate to large prose slabs;
- low-chroma brown surfaces with weak material hierarchy;
- selected “Buttons” label captured as “But” on the narrow dock;
- explanatory/configurator surfaces competing with Aurora and Dock.

Target one quiet warm workbench around one active transmissive specimen. Use previous/current/next
plus an on-demand story chooser, not all 87 stories as permanent tabs.

Acceptance must cover Golden Glass, Breath, Momentum, and workbench accessibility across material
state, interruption, PRM/transparency, 1280×720, 390×844, keyboard/coarse input, and
Chromium/WebKit/device cells.

## 8. Verification result at handoff

Read-only checks run by this audit:

| check | result |
|---|---|
| `npm run iter-check` | PASS |
| `npm run verify:package` | PASS — 205 targets, 483 declarations, 114 CSS files, 67 strict consumer imports |
| full `npm run iter-test` | 2,610/2,614 assertions passed; four reported failures |
| isolated timeout rerun | PASS — 18/18 |
| salvaged canon `--check` | PASS |

The four full-suite failures reduce to:

1. one real governed public-surface mismatch repeated in the `unit` and `chip-listener` projects:
   the dirty root barrel exports `armGlassRefract` and `supportsBackdropRefract`, while
   `rootRuntimeExports` still omits them;
2. two 5-second timeouts caused by the large concurrent suite:
   `router-field-ownership` and the refract export/build test both pass when rerun alone
   (roughly 2.4s and 2.9s).

Do not call HEAD/test GREEN until the exact root public-surface contract is reconciled and the full
suite is rerun. Do not “fix” the timeouts by widening them without first controlling suite
contention.

## 9. Applied audit amendments

This audit intentionally did not edit product source, package files, tests, the canonical roster,
or the BK cursor.

It did:

- preserve the exact temporary design-canon bytes under `salvage/`;
- add the history, independent frontend, Browser, and final Sol reports;
- add `docs/tranches/BK/AUDIT-REFRESH-2026-07-28.md`;
- amend `docs/tranches/BK/PLAN.md` with the prospective Sol/Luna map, atomic journal-to-canon
  state law, and file-owning-cut rule;
- amend the `WORKFLOWS.md` stage-2 row to say IN-FLIGHT/WALL with two starts/zero results.

The 90-row registry remains unchanged pending the proper seal.

## 10. Exact resume sequence

1. Read this file, the final frontend Sol report, and `BK/AUDIT-REFRESH-2026-07-28.md`.
2. Re-run `git status --short`; preserve every pre-existing dirty/staged file.
3. Re-census the stage-2 journal and hashes. If any result or candidate changed after this audit,
   compare by key/hash; do not assume the newer file is authoritative.
4. Read the complete historical arm logs and three candidates as provenance.
5. Do **not** use the unchanged Fable/Opus continuation after the prospective model supersession.
   Route the remaining fold writer/adjudicator to GPT Sol x-high and the mechanical verifier/applier
   to GPT Luna x-high. If unavailable, stop before canonical mutation.
6. Require the Sol writer to rule every original stage-2 delta and every §5 correction above.
7. Require Luna to prove counts, gate budget, pointers, relay universe, and no orphan debt.
8. Apply one canonical patch to TR + BK cursor + BK port + moved ASK quote; record result keys and
   seal in the journal; commit that sealed documentation before claiming formulation closed.
9. Re-run the roster/cursor/gate/state verifiers and full test/type/package baseline.
10. Begin only source cut 1 (“Seal + truth substrate”) from the final frontend apotheosis. Re-census
    after it. Do not fan 90 registry rows into 90 branches.

## Stop conditions

- no source execution before stage-2 seal;
- no canonical hand edit from one partial arm;
- no relabelled model provenance;
- no old-model renewal after the current supersession;
- no deletion from a remembered repo count or `src/`-only grep;
- no shared abstraction before two real consumers with the same semantic job;
- no new Ecoute unless a named falsifier invalidates a sealed row;
- no formulated/banked language used as a synonym for landed/verified;
- no Golden Glass/Breath/Momentum close without the captured matrix.

The work is ready to resume. It is not ready to be called closed.
