# TERMINAL RECONCILIATION LEDGER — 44 tranches

**Provenance.** `wf_6b459be5-e21`, 17 seats, all Opus 5, 2.25M subagent tokens, 2026-07-25. Eight
sweeps over all 44 tranches, 166 candidate rows, every row adversarially verified against the live
corpus and disk before reporting. 166 → 52 real → **43 distinct gaps** (114 refuted, 69%).

This closes the cross-tranche reconciliation question: what survived is HERE; what is absent from this
ledger was verified covered, stale, or never a defect. Cite rows by number.

---

# TERMINAL RECONCILIATION LEDGER
**glass-ui · 44 tranches · HEAD 0371836d · 2026-07-25**
Eight sweeps, 166 candidate rows, every row adversarially verified against `docs/tranches/BJ/addenda/2026-07-24-refinement/` (19 files, ~9.2k lines) and `docs/tranches/BJ/waves/BAND-*.md` (10 files) before reporting.

---

## 1 · THE HEADLINE NUMBERS

**166 candidates raised · 52 survived verification · 114 refuted (69%).**

| Verdict | Count | Meaning |
|---|---:|---|
| REAL-GAP | 52 | No landed commit, no owning wave, no retire-with-rationale |
| ALREADY-COVERED | 62 | Owned in the live corpus, often in the same words the sweep used |
| STALE | 30 | The finding names code that is fixed, deleted, or was never as described |
| NOT-A-DEFECT | 19 | Absence of an audit, a process preference, or a refuted premise |
| UNVERIFIABLE | 3 | Needs a browser seat or a re-derivation before it can be called |

After cross-sweep dedupe (jubilance appears twice, the fallback-literal class three times, the blob orphan three times, the 16 blank decisions twice), **52 raw gaps consolidate to 43 distinct items.**

**By tranche:**

| Tranche | Raised | Real | Refuted | State |
|---|---:|---:|---:|---|
| BJ (live) | 33 | 12 | 21 | Self-aware: the corpus names most of its own gaps but does not roster them |
| BD | 18 | 5 | 13 | Content reconciled at **BG**, not BJ — the pointer, not the work, is lost |
| BG | 18 | 7 | 11 | **The carrier.** Never closed; 66 wave names in zero commits |
| components (cross) | 34 | 7 | 27 | 5 of 5 spot-checked BD residuals came back covered or stale |
| feedback (cross) | 25 | 8 | 17 | ECOUTE is right that rows were dropped and wrong about *which* |
| BE/BF/BB/AV (mid) | 16 | 4 | 12 | BF is 31 specs and **one** commit; AV executed and is absolved |
| C…Q (early, 25 tranches) | 13 | 2 | 11 | Reconciled by attrition — the code the findings named is gone |
| invariants (cross) | 9 | 7 | 2 | The famous rules hold; the unswept clauses of the no-fallback edict do not |

**By severity (consolidated, 43):** S0 — 4 · S1 — 17 · S2 — 16 · S3 — 6.

**Calibration.** The fear was ~40% justified. The BD premise is **half wrong in a way that matters**: BD's audit content *was* consumed, one hop upstream at `docs/tranches/BG/audit/RESPEC-COHERENCE/pass-2-research-page-wave-coverage.md:36` ("the BD PASS-E corpus + the 58 per-page-deep audits are REUSABLE, not re-derivable") and routed through `BG/audit/RESPEC-GESTALT/DEFERRAL-LEDGER.md` §D. BJ inherited BG's dispositions without BG's citation back to the evidence. Of 221 `src/`|`demo/` paths cited across BD page-deep, **88 (40%) resolve at HEAD, 68 (31%) survive a rename, 65 (29%) name deleted code**; of 28 findings verified by reading source, **12 FIXED · 9 MOOT · 7 still describe HEAD**. The point-bug layer is 75% spent. The systemic layer is 71% path-resolvable and still bites.

**Two things are worse than feared.** (a) `docs/tranches/BJ/addenda/` is **untracked in git** — every ruling this ledger treats as authority, including both 2026-07-25 owner rulings, exists only on this disk. (b) `npm test` is RED at HEAD and `release.yml:48` runs it immediately before `npm publish --provenance` at `:50`.

---

## 2 · S0/S1 GAPS — LIVE AT HEAD, OWNED BY NOBODY

Ranked by consequence. Every row DISK- or GIT-verified at 0371836d.

### S0 — blocks the cut or destroys the record

| # | Item | Source | Component | Route |
|---|---|---|---|---|
| **1** | **The whole 2026-07-24 refinement corpus is untracked.** `git status` → `?? docs/tranches/BJ/addenda/`. The 33→6 ASK reduction, ECOUTE's 76-row reconciliation, the 8 terminal specs, and both 07-25 owner rulings that release 23 parked items are recoverable only from this working tree. **GIT-FACT** | `git status --porcelain` | tranche | **`git add` it, today.** Highest consequence-to-effort ratio in the set |
| **2** | **HEAD is RED on `tests/public-surface.spec.ts:483`** (`surface.root.exact`). `44621bb4` widened the public root with `armGlassRefract` + `supportsBackdropRefract`; the governed expectation list was never updated. Confirmed by running the suite; confirmed absent by grep. **DISK-FACT** | EXEC-STATE.md:160-166 | public surface | Two lines. Blocks 8.0.0 outright. Meta-finding: that commit was adjudicated by four named exact-byte critics and three follow-ons, and none ran the suite |
| **3** | **WebKit renderer SIGABRT on the published 7.0.0 bytes.** Atlas delta-reduced 688 color-mix sites to four `.dock-plate` declarations; `src/components/dock/styles/morph.css:125-144` carries an `in srgb` mix whose **both** endpoints are themselves `in oklab` mixes, with `calc(var(--dock-expand-t) * 100%)`. `.ips` faulting thread: `WebCore::Style::Color::resolvedColor → toStyleColor(ColorMix) → applyValueBackgroundColor`. Two-level sibling `border-color` at `:139-144` does **not** crash. BJ's EXEC-STATE:84-90 reached the opposite verdict from **demo routes at dock rest**, where the source comment itself says both inner mixes are no-ops, and removed `W-WEBKIT-CRASH` from Band 0 as a harness defect. `SIGABRT`, `resolvedColor`, `morph.css:125` → **zero hits** corpus-wide. **DISK-FACT** | coordination/atlas-outbound-2026-07-24-q-audit-relay.md §0 (arrived 07-25 01:08) | dock | **Mint the row. Both cells are true; published-bytes crash logs win on consequence.** Do not let the harness re-scope stand unqualified |
| **4** | **A12 blob greenfield — drafted, never rostered, and its gates are born-GREEN.** `grep -ci blob WAVES.md` → **0**. 6,028 LOC byte-unchanged since the complaint (`git diff --stat 2a949abe HEAD -- src/components/blob` empty). ECOUTE.md:186-194 drafts `W-BLOB` under "§3 NEW WAVES REQUIRED" and calls it "the largest single silent drop in the corpus" — but a draft is not a roster entry, and `G-BLOB-METABALL` asserts RED because "no metaball field function exists": **false**, `src/components/blob/shaders/metaball.wgsl.ts` ships `sceneDistG:156`, `sminG:117`, `softShadow2D:241` (the cartoon cast A12 names). Same defect at `G-GOO-MORPH` (ECOUTE:223) — PagerDots.vue:26-124 already ships the three-mass worm. **DISK-FACT** | ECOUTE.md:57,115,186-194 | blob | Roster `W-BLOB` into WAVES.md and **re-author both gates against what A12 names** (cartoon cast, lighting, mood distinctness, interactivity) — as written they pass on arrival |

### S1 — live defects and structural losses

| # | Item | Source | Component | Route |
|---|---|---|---|---|
| 5 | **`supportsBackdropRefract` detector lifecycle.** `armed = true` set **before** the throwing probe with no try/catch; negative branch does not `removeAttribute` (stale root `on` survives); module-global `armed` starves every second Document. The 37-line cure sits **uncommitted in the worktree**; HEAD does not carry it. No owning wave. **DISK-FACT** (`git show HEAD:…`) | BAND-MATERIAL.md:1265 §CLOSE III | glass | ~6 lines. Released by ruling 1 (was NEEDS-LUNA). Land it |
| 6 | **The execution cursor is now the thing doing the parking.** `EXECUTION-PROGRESS.md:246-263` §PARKED (last commit `f04f05d8`, 07-21) still parks ~20 waves — REDUCTION W3/W4/W5/W7, STORY W1, FM W4/W5, GF-DOCK slices, DOC-TRUTH family-J — on ASK rows that `ASK.md:123-151` closed **by quoting the owner's own words**, and still records "ASK-20 remains an owner authority conflict" which `ASK.md:142` dissolved. **GIT-FACT** | EXECUTION-PROGRESS.md vs refinement ASK.md | tranche | One reconciliation pass over two registers |
| 7 | **Owner ask A16 is falsified on disk.** `grep -c 'DECISION: ____' docs/tranches/BI/addenda/JUDGMENT-ROSTER.md` → **16**, literally blank. PLAN.md:25 self-ratifies rows 2/3/4/9/10 at the 7.0.0 tag; rows 1/11-16 are "LIVE BJ inputs (family I)" — and `BAND-DOC-TRUTH T40` records that family I "names a wave no charter carries" and proposes **to reword the sentence**. `Q051` appears zero times in the refinement corpus. **DISK-FACT** | BI/addenda/JUDGMENT-ROSTER.md + PLAN.md:25 | tranche | Resolve or retire as one batch. A doc-truth reword closes the sentence and leaves 16 owner questions unanswered — the exact failure A16 forbids |
| 8 | **A sibling repo is building against a lever we struck.** `formation/G1-OUTBOUND-DRAFT.md:243` tells atlas G-3 (backdrop-attenuation primitive) is "scheduled" against BAND-MATERIAL W2; `waves/BAND-MATERIAL.md:1405-1406,1422` records the freeze **STRUCK the second attenuation/opacity axis**. G-1 is the softer twin: the disposition concedes "the coarse-only cure does not reach fine pointers" then routes to BAND-A11Y W2(F), which `BAND-A11Y.md:47,197` scopes as the **coarse**-floor restore. `--size-icon-btn: 2.5rem` (40px) live at `sizing.css:143`. **DISK-FACT** | atlas relay §A | a11y/material | One terminal line each plus a corrected G1 draft. Cheapest high-value action in the ledger |
| 9 | **The story-page sub-type taxonomy, dropped twice.** `DemoStage`·`DemoSpecimen`·`DemoInteraction`·`DemoMatrix`·`DemoComposition` — an explicit user directive, the mechanism for conformity-with-natural-variation across 118 pages. BG found it flattened out of `W-STORY-PAGE-API` and minted an AMEND with a named gate (`DEFERRAL-LEDGER.md:93`); at HEAD the same grep returns **0** in `src/`, `demo/`, and the entire live corpus. The chassis half **is** landed (`demo/chassis/page/StoryPage.vue`, 103 story SFCs compose it) — only the vocabulary is missing. **DISK-FACT** | BD PASS-E §refined directives #2 | demo chassis | Cheapest large gestalt win in the set |
| 10 | **The shared text-field well is a partial glass composite.** `src/components/_shared/field/field-control.css` carries `backdrop-filter` + `--glass-rim-top/bottom` and **zero** `::before`/`::after`/grain; `grep vSpecular\|useSpringPress src/components/{input,textarea,number-field,select}` → **0**. Named independently by 5 of 12 BD forms pages, collapsed there into one seam with five consumers. **DISK-FACT** | BD forms-GESTALT §1 REMAINS#1 | input · textarea · number-field · select · labeled-field | **Verifier disagreement, stated honestly:** the *class* is gated by `W-ENGAGE-LADDER`'s `G-ENGAGE-RUNG` (WAVES.md:631, library-wide, born-RED) and BAND-MATERIAL OPEN-2d/J6 names the Select-vs-Button contrast — but **no wave names this seam**, and BAND-MATERIAL's eight waves are radius/blur/halo/track/proportion/type/css-closure/refract. One edit, five consumers |
| 11 | **The no-masking-fallback edict's stale-literal clause was never swept past the dock.** 283 literal `var()` fallbacks over 108 tokens; **120 numerically divergent** from the shipped definition. The edict's own row M4 survives byte-identical at `src/components/drawer/styles.css:80` (`--spring-snappy, ease` — a non-spring curve substituted for a spring; `0.4s` against a real settle ≈0.34s). Sibling clause: 54 dead `@property` fallbacks over 22 registered scalars. Enforcement is gone — `scripts/proof-no-masking-fallback.mjs` absent at HEAD. **DISK-FACT** | BG NO-MASKING-FALLBACK-EDICT.md §1.1 | library-wide | One wave, `W-FALLBACK-LITERAL-SWEEP`. Full evidence in §5 |
| 12 | **BG never closed.** Its own cursor froze at frontier `0.7 BG.W-DOCK-BLUR-RETIRE-CARVE` with a 34-row ledger against ~119 waves; `FINAL.md` self-describes as "the develop-ready plan, NOT an implementation". **66 of 119 wave names appear in zero commits AND zero files under `docs/tranches/BJ/`.** The 135-row machine-locked `FOLD-LEDGER.md` — authored to guarantee "NO silent drop" for the AX/BE/BF inheritance — is referenced nowhere in the live corpus. BI's own taxonomy indicts exactly this ("superseded/no-FINAL tranche orphan", naming BG "never cut-ready"). **GIT-FACT** | BG execution/EXECUTION-PROGRESS.md + FINAL.md | tranche | **A join against HEAD, not a re-run.** At least 3 of the 66 landed under other SHAs; ~14 are gate waves moot under abrogation. Honest residue ~8 clusters |
| 13 | **Jubilance — an owner ask erased by a dead-code sweep.** BE built `useHaptic` + `useCelebrationBurst`; they took zero call sites; BG deleted them at `79f4641c` with `jubilance.css` under a rationale that never references the ask. **7 of the 135 fold-ledger rows route to `BG.W-JUBILANCE-DECIDE`** (D9, D13, D21, D31, BE.W-CELEBRATE-BURST, BF.W-JUBILANCE-WIRE, BE.W-HAPTIC-COUPLE). `grep -ril jubilan docs/tranches/BJ/` → **0 files**; `haptic` → **0**. **GIT-FACT** | BG FOLD-LEDGER + BF SEED.md:34 (R18) | motion/feedback | **Scoped honestly:** breathing is owned (`BJ.W-IDLE-BREATH`), recoil is owned (MOTION-CANON:196). **Genuinely unowned: haptics and ripple/splash.** MOTION-CANON:84 is the ratifying falsifier for the geometry half — 6 rows convert to RETIRE-with-rationale, `BE.W-HAPTIC-COUPLE` needs its own line. The corpus proves it knows this class: `W-DOCK-FISSION` is literally titled "restore what was wrongly retired" for a composable deleted the same way [2026-08-05 · BK #28 W-FEEDBACK-MOTION, the routed decide row, DECIDED: **ripple/splash REFUSED**, haptics **RELAYED to the consumer layer**. Grounds, on the record and each with its detector: (1) MOTION-CANON §4 PRESS already owns the press answer — `--scale-press` on `--spring-press` plus the `press-drain` envelope (55/120ms) — so a ripple is a SECOND authority over one fact, the class §26 spent a row collapsing; (2) an expanding ink circle from the touch point is Material Design's signature, and borrowing a competitor's signature is the identical objection §9.7 sustains against the halftone — sustained here for the identical reason; (3) the typed `--ripple-radius` had ALREADY died with the disco recipe family and took zero consumers with it, a death `tokens/property-regs.css` records in its own prose, so "genuinely unowned" was true of the ROUTE and never of a live artifact; (4) haptics are not a design channel this library can honour — `navigator.vibrate` is absent on iOS Safari, the primary target, so shipping it would be a facility that silently does nothing on the platform the whole IOS27 corpus is drawn from, which is the no-masking-fallback class. The refusal is LOCKED, not merely recorded: `tests/styles/feedback-motion.test.ts` §"#28's two refusals" holds both detectors at 0, and it is stated there as a KEEP-DEAD lock rather than as born-RED, because both already read 0 at HEAD.] |
| 14 | **The 78 binding owner findings have no disposition ledger.** `BI/audit/USER-FINDINGS-2026-07-11.md` is headed "every row MUST receive a terminal disposition — silent drops are forbidden". 11 UF ids appear anywhere in BJ; **exactly one (UF-K1) survives into the live corpus.** **Heavily discounted:** ≥15 rows verified discharged by commit (UF-A3 `ae750c9d`, A4/A5 `ff69acd9`, A6 `5a6187f7`, A8/A9 `809b6ff5`, B2 `ac71691f`, E5 `693e3878`, E6/E7 `46a778c1`, I1 `9b8071d9`+`8c6f605a`, J5 `f24577c7`). **GIT-FACT** | BI/audit/USER-FINDINGS-2026-07-11.md | tranche | **The gap is the missing ledger, not 67 live rows.** One reconciliation pass; absorbs the expandable-container "first principles" residual |
| 15 | **The a11y posture statement was written and lost with its branch.** The longest chronic carry in the corpus (C→D→E→F→G→H→I, 5 tranches) closed on "a brief `## Accessibility Posture` section LANDS in DESIGN.md". DESIGN.md at HEAD has 25 `##` headings and no such section. `git log --all -S "Accessibility Posture" -- DESIGN.md` returns **one** commit, `987fc415` — **not an ancestor of HEAD**, contained in no branch. Sibling I commits `950d1f4e`/`73c40fa4` likewise unreachable. The 21/21 chronic-closure claim is 20/21. **GIT-FACT refuting a DOC-CLAIM** | I/FINAL.md:57 + I/audit/W3-chronic-deferral-assessments.md §4 | docs | Land the posture statement — BAND-A11Y's five waves are exactly the material it summarizes. Cheapest correct close for a 5-tranche carry |
| 16 | **The page-audit roster nobody adopted.** `BG/audit/reflect/bg-page-audit-roster.md` (64 lines) states in its own header: "The user commissioned the 118-page deep audit; only dock/forms/foundations/substrates GESTALT'd. The seven categories below — display · containers · data · feedback · navigation · compositions · motion — never converged", born-RED, all 11 verdicts FAIL. `grep -rn 'bg-page-audit-roster' docs/tranches/BJ/` → **0 files**. **DISK-FACT** | BG audit/reflect | coverage | **Adopt it as the build-order index for the 54.** It is the exact map of which components have no audit material |
| 17 | **Six weeks of owner verdicts entered BJ unattributed.** `grep -rn 'USER-AUDIT-2026-06-10\|USER-FEEDBACK-2026-06-23' docs/tranches/BJ` → **zero hits, tranche-wide.** AY B10/B18/B20 ("blob LARGELY BROKEN — REBUILD FROM FIRST PRINCIPLES"; van-Gogh aurora "looks NOTHING like van Gogh brush strokes"; "the user's judgment OVERRIDES gate-green") and BD 06-23 batch1/2/3 (~40 verbatim rows) reappear as BJ A12/A13/F10 **as if new**. Consequence is not cosmetic: the un-carried words *are* the target — W-AURORA is gated on medium-distinctness with no citation of the van-Gogh verdict, and W-BLOB has no target at all. **GIT-FACT** | AY/audit/USER-AUDIT-2026-06-10.md · BD/viz/refine/USER-FEEDBACK-2026-06-23*.md | tranche | Cite the provenance in the ledger and in each wave. This is the systemic row behind #4, #13 and #21 |
| 18 | **Two uncovered owner design orders.** batch2-B5 "Cards should be as WIDE as the HERO TITLE text — the fonts should align" — `W-STORY-PROPORTION`'s three gates (G-ONE-NAME / G-COLUMN-WIDTH ≥60% / G-MOBILE-FIT) contain no card↔hero-title alignment invariant. batch3-D4 "our buttons should all be more GLASSY by default, like our tabs facility, and have better HOVER states" — `W-FROST` repairs `.segmented-tabs`/`.glass-track-well` (both compute `backdrop-filter: none`, lead-measured) but **nothing re-points Button onto the repaired tabs grammar**. **DISK-FACT** | BD USER-FEEDBACK batch2/batch3 | card · button | Route B5 to W-STORY-PROPORTION, D4 to W-FROST alongside O-2 |
| 19 | **ECOUTE's coverage-gap table is wrong in both directions.** It is measured against `WAVES.md` alone. **False gaps (would re-do landed work):** F11 and F29 are not merely owned — they are **landed in source** at `34681df9`, which ships `src/components/configurator/styles.css:112-122` carrying a literal `F11` header and rewrites `springs.vue` (+315) so the Configurator count goes 0→13, which was F29's whole complaint. Yet ECOUTE:119 says F11 "appears nowhere" and `G-ROW-HOMED` books both RED. Also false: F13 (BAND-FEEDBACK-MOTION Δ-F13-1, "MINTED HERE"), F23 (BAND-FOLD §7 U-2), the A11Y and DOC-TRUTH families (whole band files). **True gaps it names:** 11 rows at §1a. **GIT-FACT** | ECOUTE.md:119-130 | tranche | Strike the false rows **before** minting `W-ORPHAN-ROWS`; reporting false gaps costs the same credibility as missing real ones |
| 20 | **Phantom wave owners.** `COMPONENT-WAVES-TERMINAL.md` §8 assigns 21 orphans and closes "Nothing is left unowned." `W-HAIRLINE` (:1295, minted "NEW ROW") and `W-SLIDER-TRANSPORT` (:1285, "NEW ROW") appear in **none** of WAVES.md's 32 headings. `W-TIMELINE` is forbidden from deleting `ScrubberTimeline.vue` until `W-SLIDER-TRANSPORT` exists (:1108,:1162) — **a phantom row is a hard blocker on a rostered wave.** Separately `REGISTRY.md` cites `W-A11Y`, `W-DOC-TRUTH`, `W-PERF` as owners for 22 findings; none has a WAVES.md heading (though the *substance* is in `BAND-A11Y.md`'s five waves, `BAND-DOC-TRUTH.md:38`, `BAND-PERF.md`). **DISK-FACT** | COMPONENT-WAVES-TERMINAL.md §8 + ECOUTE.md:130 | tranche | Roster the two real phantoms; **re-point** the three name-mismatches. This reproduces verbatim the false closing sentence the same corpus convicts WAVES.md of |
| 21 | **DESIGN.md §L6's φ-derivation is arithmetically false.** `DESIGN.md:423` derives the radius ladder from base 4: `md ≈ base·√φ`, `lg ≈ base·φ` (10px), `xl ≈ base·φ·√φ` (12px), `2xl ≈ base·φ²` (16px). Against `radius.css:62-67` the products are **5.09 / 6.47 / 8.24 / 10.47**. The `lg` claim is 6.47 asserted as 10 — 55% off, not a rounding, and `≈` cannot carry it. The shipped ladder 4/4/6/10/12/16 has step ratios 1.0/1.5/1.667/1.2/1.333 — no single generator, φ or otherwise. This is the file BD's GOLDEN declares **BINDING LAW** and every greenfield lane consumes. `W-DOC-TRUTH`'s gate asserts only "no shipped doc names an absent symbol" — a false derivation quotes no absent symbol and passes it. **DISK-FACT** | BD greenfield/design-language-edicts/GOLDEN.md:11 → DESIGN.md:423 | radius ladder | Re-author §L6 **after** PROPORTION lands, so the doc states the settled series rather than a second one |

---

## 3 · THE COMPONENT-AUDIT FOLD

`COMPONENT-WAVES-TERMINAL.md:13` states it: **"Tier-1 set (8 of 62): timeline · handmark · aurora · tabs · alert · dock · toast · slider. The remaining 54 components are OWED — one workflow each."** Verified: 8 `## W-` headings; `ls src/components` = 65 dirs (62 governed + `_shared` + 2 non-component).

**Before speccing anything: 8 of the 54 are ruled DELETE or DEMOTE in the live corpus.** Doing design work on these is a wasted lane.

| Component | Ruling | Citation |
|---|---|---|
| carousel | DELETE-with-relay | ASK.md:132 (ASK-6), ECOUTE:290 |
| deck | DELETE — zero usage sites in src/ or demo/ | ASK.md:132, ECOUTE:96 |
| animated-digit | DELETE — trivial recipe, 92 LOC, 0 src consumers | ECOUTE:313, REDUCTION:169 |
| paper-backdrop | DELETE — 18-line SFC whose body is one `<div>` | DAG-RULINGS:155, GRAPH-RULINGS:427 |
| header-ribbon | DELETE | ECOUTE:318 |
| completion-seal | DELETE-with-relay | ECOUTE:39, WAVES:323 |
| instrument-chassis | **CONTRADICTED** — DELETE in REGISTRY C-1/ECOUTE, KEEP-THIN in GRAPH-RULINGS:445 | see §5 |
| tags-input | DEMOTE — the one component in 62 with **no consumer of any kind** | COMPONENT-WAVES-TERMINAL:1262,1288 |
| fourier-field · watercolor-dot | DEMOTE / RELOCATE (ASK-9, R-2) | ECOUTE:277, ASK.md:45-59 |

### 3a · Warm starts — material exists, read it first

BD page-deep quartets are **3 independent Opus lenses + a reconciling SYNTHESIS per page**, 231 files over 59 pages. BD greenfield families are 400-500 line GOLDENs with live-measured OKLab diagnoses. **Standing caveat for both: inherit the DIAGNOSES, re-derive every LINE NUMBER** — `src/styles/cards.css` is deleted, `src/components/ui/textarea/` moved, `useConstellation.ts` flattened. 29% of cited paths name code that no longer exists.

| Component(s) | Material | Where |
|---|---|---|
| **card** | 904 lines first-principles + measured diagnosis (plate composites to gray over a flat page; 4%-α border vanishes cream-on-cream; resting box-shadow computes `none`; `.paper-field` count = 0 across 53 glass surfaces). Diagnosis is explicitly **not** re-tint — give it a field, an edge, a material floor | `BD/greenfield/cards/{GOLDEN,DELTA-ASSAY,WAVE-AMENDMENT}.md` + `BD/viz/page-deep/display-card-*.md`. `W-REDUCE-CARD` is a **prop diet only** ("No radius/blur retune (MATERIAL)") — the material half is unowned |
| **button** | 962 lines across 3 docs + a 9-row ranked defect table + **the capsule-shadow census is already on disk**, 89 lines, consumer × radius-class × verdict | `BD/greenfield/buttons/` + `BD/viz/page-deep/display-buttons-SYNTHESIS.md` D1-D9 + **`BI/audit/W-SHADOW-GRAMMAR-census.md`** (landed `809b6ff5`) |
| **configurator** | **343 citations across 133 files** — the densest uncovered component — plus 8 banked comparison captures. 5 of 6 owner geometry rows already landed (`ae750c9d`, `ff69acd9`, `6950cfd4`, `92e00ff7`); **one residual: UF-J1 "replicate the color-picker sliders 1:1 from value.js"**, zero hits corpus-wide | `J/audit/W4-A-*`, `AS/audit/W7/W1-A3-*`, `BD/greenfield/configurator-presentation/`, `BI/audit/visual/W-CONFIG-*.png` |
| **select · combobox** | Quartet, 106-line synthesis with a 7-row ranked change table. GAP-1 (chevron desync) **FIXED** at `SelectTrigger.vue:92`; GAP-2 is row 10's shared seam; GAP-3 (`size` two-write portal) open | `BD/viz/page-deep/forms-select-*.md` |
| **input · textarea · number-field** | Quartets ×3 + the forms-GESTALT collapse into **one** seam | `BD/viz/page-deep/forms-{inputs,textarea,number-field}-*.md` + `forms-GESTALT.md` §1 |
| **checkbox · switch · radio-group** | Quartet + AW's **per-atom four-state + press-spring matrix**. ECOUTE §4.2 already rules the triad: "ONE IMPLEMENTATION, THREE SEMANTIC SHELLS" → extract `useBinaryControl` + one `.control-bit` register | `BD/viz/page-deep/forms-checks-*.md` + `AW/audit/W25-primitive-affordance.md:1-30` |
| **toggle-group** | Quartet, 109-line synthesis (3rd-largest in the forms band). The swatch P0 is dead (codemod re-authored the page); UF-A1 rounding landed at `92e00ff7` | `BD/viz/page-deep/forms-toggle-*.md` |
| **easing (curve-gallery)** | **The largest single Pass-E synthesis in the corpus, 125 lines** — and 2 strict citations anywhere else, i.e. all of its material is in one uncited place | `BD/viz/page-deep/motion-curve-gallery-*.md` |
| **blob** | 3 machine-readable AW datasets (droplet/interaction/mood) + greenfield family + quartet + `GF-BLOB-CRIT2.md`. Ships `useMetaballRenderer`, `useBlobMood`, `useBlobSatellites`, `blobSimulation` | `AW/audit/W{9,10,11}-blob-*.json` + `BD/greenfield/goo-blob/` + `BJ/formation/greenfields/` |
| **surface / glass-material** | 298-line design pass + 2 greenfield families. Token side owned by `W-GLASS-DEDUP`/`W-BLUR-LADDER`; Surface.vue's own tier API is not | `BI/design/glass/PASS-1.md` + `BD/greenfield/{glass-material,glass-atoms}/` |
| **constellation** | Quartet + a landed dedupe census. Both UF-E5 halves shipped at `693e3878` (dedup + the **interactive-background standard**, live at `Constellation.vue:68`) — the census is the artifact of a wave that already ran | `BI/audit/W-CONSTELLATION-DEDUPE-census.md` |
| **typewriter · split-chars** | Two quartets against 2 citations elsewhere | `BD/viz/page-deep/motion-{typewriter,split-chars}-*.md` |
| **separator · badge · label** | Quartets. Badge's UF-A6 landed at `5a6187f7`; Label's `peer-disabled` residual **does not exist** (grep 0 at HEAD); separator is ruled KEEP correct-as-is | `BD/viz/page-deep/display-{separator,badge}-*.md`, `forms-label-*.md` |
| **chip** | Two quartets; dual-path **resolved** at `ac71691f` (one `Chip.vue`, `useAccentTone` at :11/:49). Residual = row 10's seam | — |
| **progress · expandable-container · data-table** | High citation volume but **hardening/census-shaped, not design passes**. Progress's concrete rows are owned (F22/F24 → W-FEEDBACK-MOTION); DataTable is owner-ruled **KEEP and THIN** (ASK-8) | `AW/audit/cogency-audit-full.md`, `BI/FORMATION/SEMANTIC-OPERABILITY-CENSUS.md` |

### 3b · ZERO design material — these cost the most

**13 components with no per-component design audit anywhere in 44 tranches.** What exists is overfitting censuses (`D/audit/W0-overfitting-*.md`), public-contract audits (`BI/FORMATION/*`), or perf/a11y cohort proofs (`K/audit/WP-*`) — none is a design pass. Price these at ~2× the others.

`search` · `table` · `avatar` · `collapsible` · `infinite-scroll` · `scroll-progress-rim` · `metric` · `labeled-field` · `tags-input` · `sortable-list` · `skeleton` · `status-dot` · `fading-scroll`

Partial offsets so they are not double-priced: `scroll-progress-rim` is fully owned by `W-PROGRESS-RIM-REPLACE` (**landed** `19ea4ce1`); `sortable-list` has a live a11y finding (`useSortable.ts:116-123`, `G-KEY-SCOPE`); `skeleton` rides F24; `status-dot` rides the `./pulse` fold; `tags-input` and `metric` are queued for demote/delete pending owner marks. **Net truly cold: 8.** Batch the four trivial ones (avatar, status-dot, skeleton, table) as one pass.

### 3c · The five categories never audited at all

Pass-E stopped at 58-59 of 118 pages. **Containers 14 · data 11 · feedback 7 · navigation 5 · compositions 6 = 43 demo pages**, plus 6-7 of 10 display pages. The motion and display category GESTALTs never ran (no such files on disk).

**The one seed that exists:** `BD/viz/page-audit/` — 12 category files, 1,338 lines, live-measured, and it **does** cover all five (containers 125 · data 71 · feedback 89 · navigation 47 · compositions 70). **Caveat that must ride it:** the `ddc20dc4` story codemod rewrote the tree those lines describe. Its lead containers finding ("13 of 14 stories hand-roll their own header cluster") no longer reproduces — `grep -rl 'class="flex items-center gap-4 pl-5"' demo/stories/` → 0 — and `--story-header-rule` no longer exists. **Read it cheap; re-measure before pricing.**

Do **not** re-run Pass-E. Its own record shows ~29 agents per category converging at 30-45%.

---

## 4 · THE FEEDBACK LEDGER, TRUED

`BJ/FEEDBACK-LEDGER.md` = 50 F-rows + A01-A17 + CFR-01 = **68 rows**; ECOUTE reconciles 76 owner rows across all sources and measures **1 of 76 closed at HEAD**. That number is wrong in both directions and this section is the correction.

**Lead with the silent drops.**

### ORPHAN — no wave, no commit, no retire (11 rows, ECOUTE §1a, minus 2 it got wrong)

| Row | Subject | True state |
|---|---|---|
| **A12** | blob greenfield | Drafted `W-BLOB` in ECOUTE §3, **absent from every roster**; both gates born-GREEN. §2 row 4 |
| **A14** | — | No owner |
| **A16** | "NOTHING dropped from BI" | Falsified: 16 blank DECISION rows. §2 row 7 |
| **A04** (parallelization half) | — | No owner |
| **F13** (design half) | — | ECOUTE calls it orphan; **refuted** — `BAND-FEEDBACK-MOTION.md:290` Δ-F13-1 states "MINTED HERE, on the interaction half", responsive half at G-RSP-1/3 |
| **F23** (enlarged-view/gradient half) | slider | Third-consumer condition at BAND-FOLD §7 U-2 → W-TIMELINE; the enlarged-view clause routes to R-4, **parked** |
| **F25** | confirm-dialog fold | **The archetype.** ASK-3 ruled "FOLD into /containers/dialog"; `W-DELETE`'s scope list (WAVES:323-330) does not include the file; `demo/stories/feedback/confirm-dialog.vue` present at HEAD with only codemod hunks |
| **F33** (goo-morph half) | pager-dots | Dot half closed by **RATIFICATION** (`01310c9c`, 266-line test, 9 changed lines) against an owner who had already rejected that worm on 06-23 ("far too fast, far too small, goo far too subtle"). ECOUTE re-opens it and names it the exemplar for the missing Law 6 |
| **F11 · F29** | configurator | **ECOUTE IS WRONG — both are LANDED in source at `34681df9`.** See §2 row 19 |

### TOUCHED-NOT-OWNED — a diff exists and it is not a fix (6 rows)

The class the corpus itself names: "A row marked *touched* by a global codemod is not fixed" (REFINEMENT.md:272 — which re-opens F43/F45/F46 on that ground and **stops there**).

| Row | The diff it acquired | Why it is not a fix |
|---|---|---|
| F12 (tags-input radius) | colocation path + a placeholder colour | BJ's own cursor records `--radius-field` absent, TagsInput computes 0px, **test passes** |
| F15 (infinite-scroll radius) | an `aria-live` region | Not a radius change |
| F17 (search radius) | 7+/240− = the FuzzySearch removal | Radius never measured |
| F45 (gate-pattern) | one word: `text-sm`→`text-small` | Codemod |
| F43 · F46 | codemod | Already re-opened by REFINEMENT §6 — **extend the same sentence to F12/F15/F17** |

All six are owned by `W-RADIUS-ROLE` (WAVES:544 lists them by id) whose `G-RADIUS-ROLE` is a **resolved-value** assertion, not a diff. Fix is one word in REFINEMENT §6.

### LANDED — verified in source at HEAD (≥5 F-rows, contradicting ECOUTE's "1 of 76")

| Row | SHA | Evidence |
|---|---|---|
| F20 toast→dialog parity | `937aa510` | `Toast.vue:80 data-reveal="overlay"`; ECOUTE:62 marks it **FALSELY-OPEN**, "π-verify; do not re-open" |
| F21 scroll-progress rim | `19ea4ce1` | 163+/92−; ECOUTE:63 same |
| F11 configurator grouping | `34681df9` | `styles.css:112-122` carries a literal `F11` header |
| F29 configurator in springs | `34681df9` | `springs.vue` +315; Configurator refs 0→13 |
| F41 npm-install string | `75c19ead` | G-COPY-5 at BAND-STORY:257 |

Plus, from the BI ledger, ≥15 UF rows discharged by named commit (§2 row 14).

### OWNED — named wave, born-RED gate (the bulk, ~40 rows)

F01/F02/F46→`W-PREVIEW-CARD`+`W-BOOT-SHELL`+BAND-PERF · F03/F04/F50→ASK R-6 · F08+A13→`W-AURORA-MEDIUM` (root cause pinned: `aurora-mediums.wgsl.ts:399` renders oil, vangogh, oil-pastel and kuwahara through **one function**) · F09/F12/F15/F17/F19/F45/CFR-01→`W-RADIUS-ROLE` · F10/F14/F31→`W-STORY-PROPORTION` · F16→`W-TIMELINE` · F18+CFR-01→ASK R-1 · F22/F24→`W-FEEDBACK-MOTION` · F26/F30/F32/F44→`W-DELETE`/`W-DAG-REDUCE` · F28/F48→`W-FROST` (F48's headline shipped as **prose with zero value change** — all five blur radii byte-identical base→HEAD) · A01/A11→`W-ENGAGE-LADDER` (parked on R-4) · A17→BAND-PERF · K-1…K-9→BAND-A11Y's five waves · L-family→`W-DOC-TRUTHUP`.

### RETIRED — with a stated falsifier (4, two of them contested)

`F26` inline-into-single-consumer branch (CHRONIC-ADJUDICATION R14, routed to ASK-2) · `F33`-dots by ratification **[contested — ECOUTE re-opens]** · `F09` shape RULED-NO-CHANGE via `G-CFG-4` "container radius stays card grammar" **[contested — the owner named a shape and the wave ruled the shape correct]** · `transient` spring register (deleted for cause; `W-SPRING-RETUNE`'s proposed revival uses `orb-drop`'s exact numbers — pre-caught at ECOUTE:370).

### Counts

| State | Count | Note |
|---|---:|---|
| LANDED (source-verified) | ≥5 F + ≥15 UF | ECOUTE undercounts by ≥4 on the F-lane alone |
| OWNED (wave + gate) | ~40 | Includes 6 ECOUTE wrongly lists as gaps |
| TOUCHED-NOT-OWNED | 6 | All ride `W-RADIUS-ROLE`; one sentence closes the class |
| ORPHAN | 9 (not 11) | F11 and F29 struck from the orphan list |
| RETIRED | 4 | 2 contested |
| UNFALSIFIABLE (no definition of done) | 8 | F03/F04/F10/F14/F28/F31/F33/F50 — one owner nod converts all eight |

---

## 5 · VIOLATED INVARIANTS — file:line, live at HEAD

### The no-masking-fallback law (BG edict §1.1/§1.2) — clauses 3 and 4 never swept

| Site | Shipped truth | What the fallback paints |
|---|---|---|
| `src/components/drawer/styles.css:80` | settle ≈0.34s, a spring curve | `var(--spring-snappy-duration, 0.4s) var(--spring-snappy, ease)` — **the edict's own row M4, verbatim bytes**, owned by F5.R2, never landed. `ease` is not a spring |
| `src/styles/glass/material.css:360,362` | `--duration-fast: 0.2s`, `--duration-normal: 0.3s` (`scheme-motion.css:100-101`) | `150ms` (25% stale), `240ms` (20% stale) |
| `src/components/dock/styles/controls/icon-button.css:141` | `--opacity-disabled: 0.5` | `0.4` |
| `src/components/dock/styles/layers.css:242` | `--dock-stagger-window-size: 0.4` | `0.55` — and `shell.css:83-88` **explicitly rejects 0.55** ("would push the last child to 0.95 of the morph"). This fallback paints a value the design refutes |
| `src/styles/animations.css:164` | `--glass-reveal-enter-scale: 0.97` | `0.94` |
| `--ease-out, ease-out` ×13 · `--spring-snappy, ease` ×3 | springs | non-spring curves |

**Scale:** 283 literal fallbacks over 108 tokens, **120 divergent**; 453 numeric-literal fallbacks over 212 tokens if unfiltered. Enforcement removed: `scripts/proof-no-masking-fallback.mjs` absent.

**Dead `@property` fallbacks (54 sites, 22 registered scalars):** `src/styles/glass/liquid-enter.css:129,130,131,138,139,140,178,183` — `--motion-weight` ×11 duplicating `initial-value: 0.618` at `property-regs.css:329`, on the library's headline cartoon scalar. `src/components/drawer/DrawerContent.vue:167,170,172,174` — `--glass-drawer-t` ×4, **the edict referent**, re-authored under a comment (:161-165) whose fail-loud argument rests on dead bytes.

**Legacy ladders with no committed device set (edict §1.2 — "absent that record it is a hedge and it dies"):** `src/styles/utilities/metal.css:176` (`mask-composite`, Safari 15.4+) · `src/styles/utilities/base.css:98` (`scrollbar-color`, "the SOLE fallback for older WebKit/Blink") · `src/styles/tokens/shadow.css:151` (`oklch(from …)`, "On a legacy engine") · `src/components/_shared/field/field-surfaces.css:198` (`oklch()`, Safari 15.4+). Each pleads "NOT a masking fallback"; none names a device. **Leave alone:** `tabs/styles/segmented.css:285` (position-anchor) and `pager-dots/PagerDots.vue:550` (`filter: url()`) are genuine cross-engine gaps, edict §1.3.

### Binding-doc contradictions

| Invariant | Breach |
|---|---|
| **DESIGN.md:423 §L6** — "Nothing dimensional is arbitrary" | 4·φ = **6.47** asserted as 10. All four products false. §2 row 21 |
| **DESIGN.md:421** — `--radius-button` "Documented public exception; **never silently repointed or retired**" | `PROPORTION.md:166,231` strikes it by name among 17 of 25 radius names, citing "1 consumer, on expandable-container/styles.css:30, not a button". Live at `theme/radius.css:87`, `tokens/manifest.ts:37`, `expandable-container/styles.css:30`. **No document adjudicates** |
| **DESIGN.md:220-250 (Q-coh-4)** — "No new tokens may be assigned inside utilities.css or a secondary feature file"; tokens.css "is the single place consumers override" | `src/components/drawer/styles.css:83-91` mints **7** `:root` tokens self-labelled "overridable per-consumer"; `src/components/configurator/styles.css:23` mints `--configurator-pad-inline` on `:root` with a comment explicitly inviting consumer override. **8 tokens outside the cascade the rule names as the override surface.** No gate enforces the rule (`tests/gates/token-hygiene.test.ts` governs radius/blur literals only) |
| **Owner ruling 2026-07-21** — "Instrument Chassis is to be deprecated and removed totally" | `REGISTRY.md:155` C-1 and `ECOUTE.md:89,318` route to `W-DELETE`; `GRAPH-RULINGS.md:445` rules **KEEP-THIN** on evidence that is itself wrong ("absent from ./styles.css" — it is imported at `src/styles/index.css:206`). Ships at `src/components/instrument-chassis/*` + `package.json:392-394,142-143` |

### Instrument and release

| Site | Breach |
|---|---|
| `demo/capture/capture.css:29-38` | `animation: none !important; transition: none !important` on `html[data-capture] *`. **The sanctioned capture harness cannot photograph motion** — while `COMPONENT-WAVES.md:81` requires "before/after frame-series … mid-drag at t≈0.5 and t=1.0" and `BAND-FEEDBACK-MOTION.md:280` mints an idle-animation **presence** gate via `getAnimations()`. This is the instrument behind every "live-verified" motion claim in the repo |
| `tests/public-surface.spec.ts:483` | RED. `release.yml:48` → `:50` |
| `src/components/dock/styles/morph.css:125-144` | 4-level nested `color-mix`; atlas `.ips` SIGABRT on published bytes |
| `src/composables/glass/supportsBackdropRefract.ts` | `armed = true` before a throwing probe; no negative `removeAttribute` |
| `src/styles/typography/utilities.css:89-97` | `@utility fourier-f` sets font-family/style/size/leading/valign/weight and **no `color`**, while `demo/stories/foundations/typography.vue:140` captions it "viz-fourier **red**". One of only two findings the Pass-E prompt itself named — its survival is a fair proxy for how the corpus was consumed |
| `package.json:503` + `gen-component-styles.mjs` | `build:watch` omits the exported `component-styles.css`; GRAPH-RULINGS B-02 books the MEMBERS derivation as PROVEN/S0 |

### Verified HONORED — never re-sweep these (mechanical, not doc-claim)

`light-dark()` + `inset` co-occurrence in any box-shadow: **0** (6 sites carry the trap as a warning comment) · `:global(` in `src/**/*.vue`: **0** · tests under `src/`: **0** · orphan modules across src+demo+tests+scripts: **0** · engine sniffs (`userAgent|navigator.vendor|isSafari|isChrome|window.chrome`): **0**, `useGlassRenderer` definition-absent · PRM bracket on every live `@keyframes`: complete.

---

## 6 · ASKS RELEASED

**Ruling 1 — Sol/Luna dissolved, every seat is Opus 5 (EXEC-STATE.md:27-41). Releases 10.**

| Released | Was blocked by |
|---|---|
| The **tranche-wide Opus byte-lane HALT** — literally HEAD (`0371836d`) | Steers 21-34: 34 files, 1,730 lines, 32 of them containing zero `src/` references. This is why nothing has landed since 07-22 |
| P-EX1 acceptance | "two fresh Sol x-high critics" — struck at :38-40, replaced by the house rule |
| W8 I-2/I-3 detector redress | NEEDS-LUNA — §2 row 5, ~6 lines |
| W4 typed-seam remainder | Luna route; producer cut landed `abb1eba2` |
| MATERIAL W7 / K4 tags-input | Luna seat — now **moot**, tags-input is demoted |
| A11Y I-13 | Luna route — its 7 parts map 1:1 onto BAND-A11Y's five existing waves |
| W6 namespace reset | Luna route — **needs re-derivation before scheduling**; its only substantive source is in the ARCHIVE corpus and names no testable file |
| GATES W1/W2 | Sol-frozen roster — the substance is `W-GATE-TRUTH` (WAVES:257) carrying `G-GATE-BUDGET` "gate count ∈ [40,60]", the user-mandated abrogation, born-RED at 1,095 cases |
| C3 LUNA-* design packets | Harvest as input; the corpus is ARCHIVE per :35-36 |
| model-law RED across **53 files**, Luna routing across **107** | Seat filled **zero times in all of git**. Declare void once in the cursor — **do not sweep 136 files** |

**Ruling 2 — greenfielding is tranche-development work, now (EXEC-STATE.md:42-47). Releases 13.**

Five lanes: `GF-DOCK`, `GF-AURORA`, `GF-BLOB`, `GF-HANDMARK`, `GF-TIMELINE`. Eight ASK-gated slices: **ASK-14/16/32** (dock fission fork, +N tray, lens rollout — closed twice, also by "the dock API is contrived and should be replaced"), **ASK-20** (aurora crayon scope — the authority conflict **dissolves**: the four mediums are identical because of the renderer collapse, not a preset surplus), **ASK-28** (DUSK/DAWN — harden-not-delete, re-judge after the medium fix; the confusability may *be* the same defect), **ASK-29/30/31** (blob identity → live R-5; thinking mood ADOPTED; grab-and-fling SHIP opt-in).

`GF-TIMELINE` is minted in **one line** and has no spec anywhere — either charter it or rule that `W-TIMELINE`'s terminal spec **is** the lane and strike the mint.

**Still genuinely needs the owner — six rows plus three:**

| Ask | Why only the owner |
|---|---|
| **R-4 · idle engagement** | Rank breath-of-life ("every component always displays engagement", at rest) against the suffusion-matrix idle law ("idle — material only; no light event on a static surface"). **Both are canon.** The only genuinely unresolvable row. HARD-BLOCKS FM W5 `BJ.W-IDLE-BREATH`, PERF OPEN-P5(b), STORY W5. Recommendation on record: material at rest, engagement on interaction |
| **R-6 · eight unfalsifiable rows** | F03/F04/F10/F14/F28/F31/F33/F50 have no definition of done two readers would agree on, so each has been "worked" repeatedly and never closed. **One nod converts all eight across five waves — the highest-leverage single reply available** |
| **R-1 · metric family** | The owner contradicting the owner six days apart: F18 (07-17) "remove"; CFR-01 (07-23) prescribes `MetricCell appearance="dashboard"` — an API that does not exist at HEAD (`grep MetricBadge src demo` → 0). Silence advances DELETE, which costs a live consumer |
| **R-2 · WatercolorDot** | 509 LOC, one external consumer, fails ≥2. On the landing page it is not even mounted — a decorative span with a flat `oklch` fill and `filter: url()`. Relocate, or make it a real procedural-suite member |
| **R-3 · Alert identity** | Status-tinted glass vs neutral glass + status ink. The A11Y W3-C contrast gate table is **data-driven on the answer** and cannot pin until it lands |
| **R-5 · blob default identity** | Taste, and the 07-25 WebGPU-only ruling raises the stakes |
| **Q051 rows 11/12/13** + 3 paint-taste rows | The residue of the 16 blanks after six self-ratified at the 7.0.0 tag |
| **The WebKit verdict** | Adjudication, not taste: two audits, opposite conclusions, different sample routes |
| **atlas OF-26.2** | Open a producer row or decline it explicitly. Atlas will not close its W-PERF against an assumption with no producer behind it |

---

## 7 · WHAT IS GENUINELY RECONCILED — bound the future work

**Never re-sweep these.**

| Tranche(s) | Status | Evidence |
|---|---|---|
| **C · D · D-II · E · F · H · I · J · K · L · M · N · O · P · Q · AM · AN · AO · AP · AQ · AR · AS** (22) | **Reconciled by attrition.** Every candidate refuted on disk: AQ's DockIconButton coarse floor **fixed** (`touch-floor.css:24-30`); AS's four AT-forwards 2 fixed / 1 moot / 1 owned; F's five accepted P3 residuals all name symbols that do not exist; H's three residuals dead (its repair recipe's three primitives are absent); C-8 blob double-rAF gone by restructure; AN's role contracts hold (`StatusDot.vue:39-41`, `SortableHandle.vue`) | 25 FINAL.md read; ~40 symbols checked individually |
| | **Two exceptions carried forward:** the a11y posture statement (§2 row 15) and 8 Q-coh-4 tokens (§5) | |
| **J's owner feedback** | 18 findings, each booked to a wave, spot-checks hold. **The early feedback WAS folded** | `J/findings.md` + `J/FINAL.md` |
| **AV** | **Executed, not parked.** 18 wave specs, 11 in PROGRESS, **19 landing commits**. Its one KEEP-BOOK (GlassNativeDrawer) correctly unbuilt for want of a 2nd consumer, terminally retired by Z-3 | `git --grep='AV\.W'` |
| **AW · AX** | AW's FOLD roster carried into AX and landed (W19/W20/W21); AX's 27-item §4 checklist — W60/W61/W62/W63 all have landing commits | `AX/PROGRESS.md` §4 |
| **BB** | Technical content landed via BC/BG/BI even though BB itself was abandoned: metal-shimmer, glass-accent, kuwahara, paper-grid, swraster, PROCEDURAL-SUITE.md, border-progress (built `533d94f5`, retired by named wave `99e4e611`), display-tracking (`c426ed0b` + banked DELTA). **One exception: `<Concentric>`** | 14 landing commits |
| **BH** | **The cleanest tranche in the repo.** 91% DISK-verified: `_shared/axes.ts` grammar ships; `src/subpaths` + `api` + `types` + `utils` all gone; CLAUDE.md and components.json deleted; `regen-exports.mjs`, MIGRATION.md, CHANGELOG.md present. The residual 9% was the [WS12] gate band, **moot under the abrogation mandate.** Only residue: no FINAL ceremony | `ls src/` + PLAN.md §1-§4 |
| **BI's chronic tail** | **Genuinely reconciled.** All 47 TAIL-EXCAVATION chronic rows and all 8 promotion rows (A1 A2 C1 D1 D2 E1 F1 G1) carry terminal dispositions in `addenda/DISPOSITIONS.md`. **G1 — "the single most load-bearing promotion", the SRC restructure that re-inherited three times — is DONE and confirmed on disk.** BI's only forward residue is the Q002/Q003 pointer, and BJ minted `formation/NATIVE-PENDING-ROSTER.md` for it with its own discharge lane and witness rule | `BI/addenda/DISPOSITIONS.md` + src tree |
| **Process archaeology, AT→BC** | The live corpus's TA2-*/TA3-*/N-*/Z-* families trace every recurrence with terminal dispositions. **Process chatter is not the gap** | ROUND-1-FINDINGS §TRANCHE ARCHAEOLOGY II/III |
| **Six calibration invariants** | Mechanically verified HONORED, §5 | — |

**NOT closed: BD (content dispositioned at BG, pointer lost) · BE · BF (31 specs, one commit) · BG (never closed at all).**

---

## 8 · THE BUILD ORDER

Ordered by dependency and by consequence-per-hour. Phases 0-2 are days; phase 5 is the tranche.

### Phase 0 · Mechanical, no design, do today
1. **`git add docs/tranches/BJ/addenda/`.** Every ruling below cites it and none of it is in git.
2. **Fix `tests/public-surface.spec.ts:483`** — two names. Unblocks any cut.
3. **Land the worktree `supportsBackdropRefract` fix.** Already written.
4. **Reconcile `EXECUTION-PROGRESS.md` §PARKED against `ASK.md:123-151`.** 27 rows closed; ~20 waves un-parked; the ASK-20 conflict struck.
5. **Void model-law once in the cursor.** Do not touch the 136 files — that sweep is the doc-inflation disease ECOUTE §2 diagnoses.

### Phase 1 · The owner's sitting — one page, six marks
R-6 first (8 rows terminal in one line), then R-4 (unblocks three waves and is the only genuinely undecidable axis), then R-1, R-2, R-3, R-5, then Q051 rows 11/12/13 + the three paint-taste rows. **Everything in phases 3-5 that touches motion or identity queues behind R-4.**

### Phase 2 · S0 adjudication
6. **WebKit.** Reproduce atlas's 5-rung ladder locally against `morph.css:125-144`; restore a Band-0 row; do not let "harness defect" stand unqualified. Both cells are true — theirs is on published bytes.
7. **Roster `W-BLOB`** with re-authored gates against what A12 names.
8. **Reply to atlas** in one letter: G-3's lever is struck (correct the outbound draft), G-1's fine-pointer half is unowned, OF-26.2 opened or declined.

### Phase 3 · Accounting closure — this is what makes loss impossible
9. **`BJ.W-BG-CLOSE-RECONCILE`.** A **join**, not a re-run: walk the 66 orphan names and the 135 FOLD-LEDGER rows against HEAD, stamp each LANDED-UNDER-OTHER-NAME / MOOT-BY-ABROGATION / LIVE, emit the `BG/FINAL.md` that never existed. Absorbs: jubilance (7 rows → 6 RETIRE citing MOTION-CANON:84, 1 line for HAPTIC-COUPLE), `W-DATE-CALENDAR`/`W-CHART-FAMILY` (two RETIRE lines under the ≥2-consumer bar), `--glass-fill-tint` (one ruling sentence: sanctioned per-instance hue axis, or residue), D-2/D-3 recorded-not-fixed, `<Concentric>` (one RETIRE line beside ASK-23), the three JSDoc phantom-viz lines.
10. **The UF disposition ledger.** 78 rows → LANDED (≥15, by SHA) / OWNED / RETIRED. One pass, not 54 workflows. Absorbs the expandable-container "first principles" ask (UF-J5's second half, which R-6's rule would class UNFALSIFIABLE).
11. **Phantom-wave repair.** Roster `W-HAIRLINE` and `W-SLIDER-TRANSPORT` (the latter **blocks `W-TIMELINE`'s ScrubberTimeline deletion**); re-point REGISTRY's `W-A11Y`/`W-DOC-TRUTH`/`W-PERF` columns at the real band wave ids; **strike ECOUTE's six false gaps before minting `W-ORPHAN-ROWS`**; correct WAVES.md's false closing sentence.
12. **Provenance.** Cite `AY/audit/USER-AUDIT-2026-06-10.md` and `BD/viz/refine/USER-FEEDBACK-2026-06-23*.md` in the feedback ledger and in W-AURORA/W-BLOB, so the age of each ask is visible and the target is the owner's words rather than ours.
13. **A tranche that touches `src/` owes a FINAL before the next tag.** One clause on `W-PROCESS-CURE` (which already ships `G-STAMP-EMITTED`, script-generated stamps naming reachable SHAs). By BI's own count this is the meta-cause of ~5 tranches of scatter — cheaper than the sweep it prevents.

### Phase 4 · Single-seam src waves, highest leverage per edit
14. **`W-FALLBACK-LITERAL-SWEEP`** — 120 divergent literals + 54 dead `@property` fallbacks + 4 undocumented legacy arms. One detector (`--duration-*`/`--opacity-*` paired with a value, `var(--x, lit)` where `x` is same-cascade or registered) finds all of it. Restore the proof script or fold it into the ≤60-gate budget.
15. **`W-FIELD-WELL`** — the one `.field-control` seam, five consumers, one edit. Carry as clauses: the number-field value motion (**not** via AnimatedDigit, which is ruled DELETE — use the engagement register), and the story-page sub-type vocabulary as thin compositions over the shipped `StoryPage.vue` chassis.
16. **Doc truth, as one wave, sequenced after PROPORTION lands** — DESIGN.md §L6 re-derivation (or strike the φ claim), the `--radius-button` adjudication (PROPORTION wins, then strike :421 + `manifest.ts:37` in the same cut), Q-coh-4 restated for the partial-cascade architecture or struck (8 tokens, 2 files), the `## Accessibility Posture` section, the `fourier-f` colour, the `instrument-chassis` KEEP-THIN-vs-DELETE ruling.
17. **The capture harness needs a running-animation mode** — or the corpus stops booking frame-series gates. Precondition for every motion π in phases 5 and beyond, and for `W-BLOB`, `W-DOCK`, `W-FEEDBACK-MOTION`.

### Phase 5 · The 54
18. **Delete first.** Ten components are ruled DELETE/DEMOTE. Executing those rulings removes ~10 lanes before a single spec is written.
19. **Adopt `BG/audit/reflect/bg-page-audit-roster.md` as the index.** Batch by audit-availability, not alphabetically: (a) ~24 warm starts with BD quartets or greenfield GOLDENs — one pass each, read the quartet first; (b) 8 truly cold, priced 2×, four of them batchable as one trivial pass; (c) the five never-audited categories (43 pages), seeded from `BD/viz/page-audit/` **after re-measuring** against the post-`ddc20dc4` tree.
20. **Standing prelude for every component workflow** — three lines, no wave of its own: read the BD page-deep quartet and greenfield GOLDEN for **diagnoses only, never line numbers**; inherit that component's UF rows verbatim as born-RED acceptance; check the DAG/GRAPH ruling first so you do not spec a component queued for deletion.
21. **Before pricing any of it, get one owner sentence defining "consumer."** Five runs produced four incompatible answers over an ~11k-LOC zero-consumer spread (45-70%). `COMPONENT-WAVES-TERMINAL.md:1262` already collapses most of it by measurement — 34 of 42 have ≥1 external project, exactly one component in 62 has no consumer of any kind, and nine read as zero-consumer only for want of an exports entry, which is a fix and not a deletion.

**Coverage honesty.** Not read exhaustively: BD's 116 `union/waves/*.md` and 355 greenfield brainstorm/challenge docs (sampled by citation count and user-directive provenance); the 134 `BI/FORMATION/waves/BI.W-P*.md`; BG's 12 converge workstream bodies and its RESPEC-COHERENCE/RESPEC-GESTALT interiors; IOS27-MICRO passes 1-4; the 192-file 2026-07-21 convergent-hardening addendum (ruled ARCHIVE, read for findings not authority); per-wave specs inside AU/AY/AZ/BA/BC beyond their close records. Those would raise the row count, not the shape. **Unswept and needing a browser seat:** AY B13/B16/B19 (glass-material on black, hero constellation invisible, aurora preview black bar), dock corner AA (U-09), F19 alert read, F22 loop easing, D-2/D-3. Schedule one browser seat to fold-or-retire each with a stated falsifier — the pattern in §2 row 17 says they will otherwise resurface as "new" a third time.