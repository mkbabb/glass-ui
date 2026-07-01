# C7 — the PLAN-LEVEL meta-critique

**Lens:** is the 151-row BG plan + ~43-row BH plan ITSELF the over-contrivance the user names?
**Verdict:** **Yes — decisively, and quantitatively.** The plan machine has become the product. The
tranche has generated **6.7 MB of planning/audit markdown across 164 audit files + a 3,576-line
plan-machine** to steward a source delta that, at HEAD, totals **957 insertions / 876 deletions across
32 files (~1,833 LOC net churn)**. Of **138 commits since v4.2.0, only 14 touch `src/` (10%)**; the other
124 are ledgers, rosters, gate scripts, fold-json, and audit prose. The plan enumerates **~194 wave rows**
(≈110 BG + ≈43 BH interleave + Stage-0) and mints **~85 NEW `proof:*` gates on top of the 360** the user
already named as ceremony — a near **1:1 gate-per-wave** ratio. **26 of 151 rows are DONE (17%) after THREE
full audit passes.** The five named critique axes are not just present in the *built* work; they are
structural properties of the *plan* itself: over-contrivance (194 waves, 85 gates), poor encapsulation
(one concern fragmented across 2–3 workstreams), lacking elegance (gate-as-separate-wave, ledger-as-wave,
verify-only ceremony waves). The binding disciplines that actually caught bugs are a *small subset* of this
apparatus — paint-decoupled dual-engine verify, batch-3, the disposition machine — and they can be
preserved while the wave count is roughly **halved** and the net gate count driven **negative**.

This lens sets the frame the fold will use. It is complementary to `A-gate-system.md` (which diagnosed gate
*soundness* — RC1-RC4, the paint-decoupling) — this diagnoses gate + wave *proliferation*: the plan mints
85 more of exactly the gates A-gate-system found prove paperwork, and fragments the work into 194 rows.

---

## The numbers (verified on disk, 2026-07-01)

| Measure | Value | Source |
|---|---|---:|
| Wave rows in cursor | ~153 (110 BG + 43 BH) | `EXECUTION-PROGRESS.md` seq 0.1–19.2 |
| Rows DONE / PENDING | 44 DONE · 130 PENDING (26 real product DONE) | status-column tally |
| Commits since v4.2.0 | **138** | `git log v4.2.0..HEAD` |
| …that touch `src/` | **14 (10%)** | `git log … -- src/` |
| Total `src/` churn to date | **32 files, +957 / −876 (~1,833 LOC)** | `git diff --shortstat v4.2.0..HEAD -- src/` |
| Planning/audit markdown | **6.7 MB** across **164 audit `.md`** + 51 BH `.md` | `find docs/tranches/B{G,H} -name '*.md'` |
| Plan-machine docs | **3,576 lines** across 6 execution docs + engine | `wc -l execution/*.md *.wf.js` |
| NEW `proof:*` gates the plan mints | **~85** (43 born-RED) atop 360 existing | grep `bg-build-map.md` |
| `tests-visual` π specs referenced | 9 | grep build-map |

The single most damning ratio: **6.7 MB of prose : ~1,833 LOC of source**, and **90% of commits are
non-source**. Three audit passes (RESPEC → RESPEC-COHERENCE → RESPEC-GESTALT) plus SYNTHESIS-PASS-1, BD
Pass-E (118 pages), and the BH 3-pass research (51 docs, 20 prototypes) have produced a corpus that dwarfs
the artifact it governs. This is the over-contrivance, at the altitude the user actually asked about.

---

## Findings (severity-ranked, file:line)

### F1 — CRITICAL · Wave granularity is the disease: the overhead floor makes a one-token deletion cost a full wave

The per-wave ceremony is fixed — spec block in `bg-build-map.md` + a device-free `proof:*` gate + a
self-test bite + a doc-fold + (for `[P]`) a π spec + a dual-engine capture. That floor is justified for a
real surface change. It is **grotesque overhead for the mechanical carves that dominate the plan.**

WS4 (batch 10, `EXECUTION-PROGRESS.md:181–205`) is a **25-wave workstream** — 16% of the whole tranche in
one bucket — and ~14 of its rows are single-file/single-token mechanical carves each carrying the full
ceremony:

- `10.19 BG.W-CHIP-ALIAS-KILL` — "alias delete + MIGRATION (atomic)"
- `10.20 BG.W-DEAD-TOKEN-SWEEP` — delete dead tokens, gated by `proof:squircle-language` negative guard
- `10.22 BG.W-MANIFEST-COLOCATE` — "4 string-maps → s() row"
- `10.8 BG.W-SPRING-REGISTER-TIDY`, `10.9 SCROLL-READER-UNIFY`, `10.13 AMBIENT-HISTOGRAM-LEAF`,
  `10.16 TIMELINE-ENCAPSULATE`, `10.17 SFC-CSS-PARTIAL-SWEEP`, `10.18 UNIFORM-LAYOUT-BUILDER`,
  `10.5 DEAD-COMPOSABLE-CUT`, `10.11 COLOCATION-GATE-STRUCTURAL`, `10.12 CANVAS-LIFECYCLE-LEAVES` …

Each is `[H]` headless, sub-day, and its diff is measured in tens of lines — while its *spec+gate+self-test
+doc-fold* is measured in hundreds. The ceremony is **5–10× the change.** Stage-0 (batch 0,
`:61–67`) is the same pathology at the top: all **7** ground-freeze waves (`PAINT-IS-THE-GATE`,
`GESTALT-ROSTER-RE-POINT`, `SHIP-DISCIPLINE`, `DEFERRED-LEDGER`, `BE-BF-LEDGER`, `DISPOSITION-RESTAMP`,
`CLOSEFIX-9SITE`) ship **no product surface** — they are plan-about-the-plan, and every one mints a
`proof:*` gate. The first entire batch of the tranche paints nothing.

**Root cause:** the plan treats "a unit of work" and "a unit of ceremony" as the same object. A dead-token
sweep is a *clause* on an encapsulation family, not a wave.

### F2 — CRITICAL · Gate-as-separate-wave reproduces, on the device-free axis, the exact feature/verification decoupling the tranche's paint thesis exists to cure

WS7's close-machine (batch 12, `:233–244`) contains **six waves whose entire deliverable is authoring a
`proof:*` gate** for features built *four or more batches earlier*:

- `12.4 BG.W-GATE-ROUTING-LIVE` → gates `BG.W-ROUTE-TRANSITION` (built WS1, batch 2)
- `12.5 BG.W-GATE-FIELD-AURORA` → gates `BG.W-FIELD-AURORA` (built WS1, batch 2)
- `12.6 BG.W-GATE-PREVIEWS-RENDER` → gates previews (WS4/WS6)
- `12.7 BG.W-GATE-UNIFORM-BLUR` → gates the WS3 blur unify (batch 3)
- `12.8 BG.W-SAFARI-PARITY-GATE` → gates WS3/WS8 glass
- `12.3 BG.W-DEAD-GATE-SWEEP`, `10.11 COLOCATION-GATE-STRUCTURAL`, `15.5 DESHADCN-GATE` — more gate-only waves

A feature ships in WS1 and its *device-free gate is authored in a different workstream, in a batch that runs
~10 batches later.* The whole thesis of this tranche (`EXECUTION-PLAN.md:16` "a device-free proof reads
SOURCE; it cannot read PAINT … every paint-gated wave closes against the §1 AND") is that verification must
travel *with* the feature. The plan then **violates that thesis on the source axis** by shipping features
whose device-free regression net doesn't exist until WS7. During the WS1→WS7 window the built feature has
*no gate at all* — precisely the "green-lie / never-blocked" window A-gate-system RC2 diagnoses.

Compounding it: the plan mints **~85 new gates** (`bg-build-map.md`, `proof:` grep) — near **1:1 with
waves** — directly inflating the 360-gate ceremony the user named as over-contrivance. BH batch 1 is the
purest case: 10 waves, **10 gates** (`proof:git-hygiene`, `-external-payload`, `-peer-conformance`,
`-drag-morph`, `-alias-codemod`, `-subpath-classify`, `-colocation`, `-design-docs-files`,
`-consumer-evidence-live`, `-core-prompts`; `EXECUTION-PROGRESS.md:73–84`) for a scratch-sweep + payload
trim + peer bump + snap excise + codemod + three file-moves + a prompts doc.

**Root cause:** gates are per-*wave*, not per-*family*. The correct object is one long-lived
`proof:glass` / `proof:dock` / `proof:viz` / `proof:encapsulation` that *grows a clause* as each wave lands,
authored inside that wave. Net gate count should FALL (fold `DEAD-GATE-SWEEP` first), not rise past 445.

### F3 — MAJOR · Audit-to-build inversion: three full audit passes before wave 0.7 is built

`SEED-CONTEXT.md` states it plainly: RESPEC (correctness) → RESPEC-COHERENCE (wiring) → RESPEC-GESTALT
(quality) — **three complete 32-agent audit passes** plus SYNTHESIS-PASS-1, BD Pass-E (118-page deep
audit), and the BH research (SYNTHESIS-PASS-1/2/3 + 8 lanes + 20 prototypes). The disk shows **164 audit
`.md` in BG alone**, **51 in BH**, **6.7 MB total** — and **17% of waves DONE.** The audit apparatus
(`FOLD-LEDGER.json` 50 KB, `DIRECTIVE-LEDGER.md` 40 KB, `FINAL.md` 93 KB, `CONVERGENCE-PROTOCOL.md`,
`DISPOSITION-RESTAMP`) is itself a multi-wave workstream. The meta-work has crowded out the work: after
three passes the tranche's genuine feature deltas are ~8 WS1/WS3 waves (`git log … -- src/` — WS1 route/
field/scroll/paper/accent, WS3 cartoon-ink/blur-peer/idiom-factor) plus the 3 live-defect hot-fixes.

The user's instruction "this is NOT an implementation phase, tranche-DEV only" is being honored to a fault:
the tranche has become *permanently* pre-implementation. Each audit pass folds into a new plan version; no
pass has been declared the last.

### F4 — MAJOR · Concern fragmentation across workstreams: the plan commits the anti-gestalt sin it audits others for

The workstream boundaries are **sequencing buckets, not gestalt families.** One design concern is scattered
across 2–3 workstreams, batches apart:

- **De-shadcn** is `10.23 DESHADCN-SWEEP (W0)` in **WS4** (batch 10) *plus* all of **WS10**
  (`15.1–15.5`, batch 15) — same concern, two workstreams, **six batches apart**, one arm of which
  (`15.5 DESHADCN-GATE`) is itself a gate-only wave (`EXECUTION-PROGRESS.md:203, 273–277`).
- **Glass** is **WS3** (11 waves, batch 3) *plus* **WS8** glass-deep (5 waves, batch 13) *plus* scattered
  reaches in WS6 (`GLASS-BLUR-ENGAGE`) and WS2 (dock legibility).
- **Paper** is `2.5 PAPER-GRAIN-OPTIN` in **WS1** *plus* all of **WS9** (batch 14).
- **Dock** is **WS2** (11) *plus* WS6 `SIRI-DOCK-INTEGRATION` *plus* WS5 `GOODOT`.

A reader cannot see "the glass story" or "the de-shadcn story" as one designed arc; they see N locally-scoped
patches distributed across a linear schedule — the exact "N locally-correct patches, not ONE designed
product" failure the RESPEC-GESTALT mandate names as critique axis #2. The plan's own topology is
anti-gestalt.

### F5 — MAJOR · BH interleave over-ceremony: 43 rows, including pure verify-only waves with no deliverable

BH (`EXECUTION-PLAN.md:§B rows 1–28`) is 43 rows to accomplish: excise legacy payloads, reshape exports
(drop `/api`, 203-symbol re-home), move demo files, extract precepts, delete CLAUDE.md. Three of those rows
are **"verify-only, ZERO carve"** waves that merely assert a *prior* wave happened:

- `B2.5 W-dock-leaf-verify (verify-only, ZERO carve)` (`:62`)
- `B2.4c W-leaf-verify-ws5 (verify blob/goo-dot leaves)` (`:65`)
- `B2.4b W-leaf-verify-ws4 (verify canvas/tabs/luma leaves)` (`:71`)

A verify-only wave is ceremony with no artifact — the assertion belongs *inside* the carve wave's gate, not
as its own row consuming a build slot, a status cell, and a resume-frontier entry. Likewise the B4 file-moves
are split into **four rows** (`B4a-archive · B4b-skeleton · B4c-files · B4d-files`, `:66`) for what is one
mechanical relocation, and B2.x is fragmented across `B2.0 / B2.1-mech / B2.1-swap / B2.2 / B2.3 / B2.4a /
B2.4b / B2.4c / B2.5 / B2.6` — ten rows for one export-reshape family.

### F6 — MINOR-MAJOR · DAG serialization exceeds real dependency: most of the 26-batch order is scheduling theater

The stated core chain `WS1→WS3→WS2→WS5→WS6→WS4→WS7`, then `WS8→WS9→WS10→WS11→WS12`
(`EXECUTION-PLAN.md:§B`) has only a handful of **real** HARD edges: WS6 siri HARD-depends on WS2
`useDockSpring` (`:15`); WS2 dock depends on WS3's blur peer (`:10`); WS4 scroll-shrink depends on WS1
(`:17`); WS12 depends on all (`:25`). The rest is *imposed linear order over independent surfaces*: WS8
glass-deep, WS9 paper-deep, WS10 de-shadcn, WS11 storybook are largely orthogonal, yet chained
`WS8→WS9→WS10→WS11` with no dependency justification in the depends-on column beyond "shell/contain host"
soft reaches. Serializing four independent families into a linear "deep-morphism" chain adds ~4 batch
boundaries of latency and status-tracking for zero correctness gain. (The BH interleave — [C]/[WSn]/[WS12]
— *is* justified; the collision census is real. The critique is the intra-BG linearization.)

---

## FOLD CANDIDATES — the consolidated plan shape

**Target:** BG ~110 → **~50 waves**; BH ~43 → **~14**; net new gates **negative** (fold `DEAD-GATE-SWEEP`
first, mint family gates that absorb the per-wave gates). Preserve the three disciplines that actually caught
bugs: **paint-decoupled dual-engine per-wave verify** (keep per-wave — it is the ONE thing that caught the
real defects), **batch-3 concurrency**, **the deferral/disposition machine** (keep the *ledger*, not 7 waves
about it).

### FC1 · merge-waves — collapse WS4's mechanical carves into ~3 family waves with ONE growing gate each
`kind: merge-waves`. The **gestalt transposition:** a mechanical cut/carve/colocation is a *clause on a
family invariant*, not a wave. Merge WS4's ~14 `[H]` carves into three family waves — `BG.W-DEAD-SWEEP`
(CHIP-ALIAS-KILL + DEAD-TOKEN-SWEEP + DEAD-COMPOSABLE-CUT + SPIKE/JUBILANCE deletes), `BG.W-COLOCATE`
(MANIFEST-COLOCATE + CANVAS/TIMELINE/AMBIENT/UNIFORM/SCROLL-READER leaves + COLOCATION-GATE-STRUCTURAL),
`BG.W-SPRING-TIDY` (SPRING-REGISTER + PRESS-MOUNT + FLIP-ONE) — each closing against ONE `proof:encapsulation`
/ `proof:no-dead` / `proof:motion-registers` gate that *grows a row per merged concern*. **25 → ~8.**

### FC2 · amend-wave + plan-doc-edit — kill the gate-as-wave convention; gates are born WITH their feature
`kind: amend-wave`. Delete WS7 rows `12.3 DEAD-GATE-SWEEP`(keep as a cut), `12.4 GATE-ROUTING-LIVE`,
`12.5 GATE-FIELD-AURORA`, `12.6 GATE-PREVIEWS-RENDER`, `12.7 GATE-UNIFORM-BLUR`, `12.8 SAFARI-PARITY-GATE`,
`10.11 COLOCATION-GATE-STRUCTURAL`, `15.5 DESHADCN-GATE` **as standalone waves** and fold each gate's
authoring INTO the feature wave that mints it (GATE-ROUTING-LIVE → WS1 ROUTE-TRANSITION; GATE-FIELD-AURORA →
WS1 FIELD-AURORA; GATE-UNIFORM-BLUR → WS3; SAFARI-PARITY → WS3/WS8). **The transposition:** a wave is not
DONE until its own regression net exists — no feature ships gate-less into a WS7-window. WS7 shrinks to the
genuine close cuts + `BG.W-CUT`. Convention amendment in `EXECUTION-PLAN.md §C`: "every wave authors its own
device-free gate clause; there are no gate-only waves." **~8 waves removed.**

### FC3 · plan-doc-edit — adopt gate-per-FAMILY; drive the net gate count negative
`kind: plan-doc-edit`. Replace the ~85 planned per-wave gates with **~12 long-lived family gates**
(`proof:glass`, `proof:dock`, `proof:viz`, `proof:paper`, `proof:motion`, `proof:route`, `proof:encapsulation`,
`proof:demo`, `proof:de-shadcn`, `proof:a11y`, `proof:close`, `proof:ba-gestalt`), each accreting a clause +
self-test bite per landed wave. Run `DEAD-GATE-SWEEP` FIRST so the tranche *reduces* the 360 (fold redundant
source-scan gates into their family), landing the tranche net-negative on gate count. Directly answers the
user's "360 ceremony gates" over-contrivance.

### FC4 · merge-waves + plan-doc-edit — reorganize the DAG around ~7 gestalt FAMILIES, not sequencing buckets
`kind: merge-waves`. Dissolve the WS1–WS12 numbering into families: **Field/Route**, **Glass** (WS3+WS8
unified — one glass arc, calm→deep as clauses), **Dock** (WS2+siri-dock), **Viz** (WS5+goodot), **Paper**
(WS1-grain+WS9), **De-shadcn/Tailwind-v4** (WS4-W0+WS10 unified — ONE concern, ONE workstream),
**Encapsulation/Demo** (WS4-carves+WS11), **Coherence** (WS12 capstone). Real HARD edges only
(Dock←Glass-blur, Siri←Dock-spring, Coherence←all); everything else parallelizes under batch-3. Fixes the
concern-fragmentation of F4 and removes ~4 batches of theater latency (F6).

### FC5 · prune-wave + merge-waves — collapse BH to ~14 rows
`kind: prune-wave`. Delete the three verify-only waves (`B2.5`, `B2.4c`, `B2.4b`) — fold the assertion into
the carve wave's gate clause. Merge `B4a–B4d` into one `B4-files` relocation wave; merge the `B2.x`
export-reshape ten-row fan into `B2-regen` (mechanism+swap) + `B2-reshape` (api-fold+relocate+styles). Keep
`B4f CLAUDE.md-delete` as the sanctioned absolute-last act. **43 → ~14.**

### FC6 · plan-doc-edit + defer-honest — freeze the audit machine; declare RESPEC-GESTALT the LAST pass
`kind: defer-honest`. The fold of this audit produces ONE consolidated plan; **no pass-2 audit runs before
build resumes.** Add to `EXECUTION-PLAN.md §E` a standing rule: an audit:build commit ratio ceiling (e.g. no
new audit pass while `git log … -- src/` since the last cut is < N feature commits). The disposition machine
stays as a *ledger read at cut*, not a Stage-0 wave-set — collapse Stage-0's 7 rows to **2** (one
`PAINT-GATE-GROUND-FREEZE` + one `LEDGERS` that folds DEFERRED/BE-BF/DISPOSITION into a single doc). The
apparatus that caught bugs (dual-engine paint verify, batch-3) is *retained verbatim*; the apparatus that
generated 6.7 MB of prose about itself is frozen.

### FC7 · plan-doc-edit — define the per-wave overhead FLOOR (the anti-granularity invariant)
`kind: plan-doc-edit`. Codify in `EXECUTION-PLAN.md §C`: **a change earns a wave row only if it (a) alters
≥1 shipped component/surface's paint OR (b) advances a NAMED gestalt axis OR (c) is a genuine cross-file
mechanism.** Sub-threshold changes (one token, one alias, one file colocation, one verify-assert) are
*clauses on a family wave*, never rows. This is the single structural rule that prevents the 194-row
regrowth and makes the wave count track *design surface*, not *task list*.

---

## What to PRESERVE (do not fold away — these caught the bugs)

- **Paint-decoupled dual-engine per-wave verify** (`real-paint-protocol.md §1` — device-free GREEN AND
  on-disk 4-PNG dual-engine capture AND non-authoring gestalt verdict). This is the ONE discipline that
  actually killed the headless-green/visually-broken disease across BB/BC/BD. Keep it per-wave, verbatim.
  C-SAFARI ★★★ stays the non-skippable item.
- **Batch-3 concurrency + null-guarded agent results + literal `const PASS`** — the hard-won process floor.
- **The disposition/deferral ledger** as a *read-at-cut artifact* (not a 7-wave Stage-0 workstream).
- **The BH interleave collision census** ([C]/[WSn]/[WS12]) — the cross-tranche collision analysis is real;
  only the intra-BG linearization (F6) is theater.

**Bottom line for the fold:** target **~50 BG + ~14 BH waves**, **net-negative gate count**, DAG
reorganized into ~7 gestalt families with real edges only, an explicit overhead floor and audit-freeze rule.
The plan should be roughly half its current size and the fold itself should be the demonstration that "fewer,
sharper primitives" applies to *waves and gates*, not only to components.
