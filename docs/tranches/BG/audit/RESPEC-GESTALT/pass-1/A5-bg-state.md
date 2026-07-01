# A5 — BG current state, precise (RESPEC-GESTALT pass-1)

**Lens:** A5 — the authoritative what-is-built / what-remains / what-order census of the live BG+BH tranche.
**Date:** 2026-07-01 · **Branch:** `tranche/BG` · **HEAD:** `976dc890` · **Base:** `v4.2.0`, tree clean.

---

## Verdict

The BG cursor is HONEST and the DONE work is REAL. I verified 8 of the 26 DONE gate-runs green on disk, all
27 sampled gate scripts exist, every DONE [P] wave has its paint DELTA + capture-PNG dirs on disk, and the
`git log v4.2.0..HEAD -- src demo scripts` code-change set is a bijection with the DONE code-bearing rows — no
phantom deliverable, no green-lie. The claimed source deltas are on disk exactly as stated (`DEFAULT_PARALLAX=0`,
`.route-enter` present + `.scroll-build` retired, the `--glass-blur-dock` chain STILL present because its retiring
wave `0.7` is correctly PENDING). This is the cleanest cursor of the last-several tranches; the RESPEC/RESPEC-COHERENCE
audits already scrubbed it and it holds.

The state is: **~26 rows DONE (16 BG + 10 BH), ~2 PAINT-PENDING, ~116 PENDING** of ≈144 total. **Of the DONE work,
only ~9 waves touch `src/` shipped code** — the rest are ledgers, gates, doc-scaffolds, and BH structural plumbing
(alias codemod, peer bumps, evidence prune). The tranche has executed its Stage-0 ground-freeze + all BH [C]
concurrent-safe waves + WS1 (shell/routing/field, 7/7) + 3 WS3 rows + 1 WS4 row + the 3 LX live-fixes. **The
build frontier sits at `0.7 BG.W-CLOSEFIX-9SITE`** (the G4 carve that lands FIRST), then the ~10-stage core DAG
`WS3→WS2→WS5→WS6→WS4→WS7→WS8→WS9→WS10→WS11→WS12` remains almost entirely unbuilt (~110 waves).

Two real findings, both hygiene-not-correctness: **(1) 83 GB / 99 stale worktrees** under `.claude/worktrees/`
on stale HEADs (the exact stale-worktree-trap class MEMORY warns about — gitignored so no git pollution, but a
real resource sink and a re-seed-at-stale-base hazard); **(2) one status contradiction** — row `2.7
BG.W-VT-ROUTE-ENHANCE` is marked **DONE** while its own cell says **DEFERRED-NOT-BUILT** ("marked DONE to skip
the build frontier"). It is self-documented, but a DONE that means "not built, re-attempt at W-REFLECT3" is a
status-lie that inflates the DONE count and hides an open item — the precise close-machine disease this tranche
exists to kill, replicated in miniature.

---

## Findings (ranked)

### F1 (MAJOR — hygiene/resource) — 83 GB / 99 stale worktrees, all on stale HEADs
`git worktree list` shows **99 worktrees** under `.claude/worktrees/` totalling **83 GB** (`du -sh`), on stale
commits: `9dfe285c` (WS3 run-log), `31b128aa` (coherence Pass 2), `998136bb`, `eaf2c172` (BH coherence Pass 1) —
NONE on the current HEAD `976dc890`. They are gitignored (`.gitignore:22 .claude/worktrees/`) so no index
pollution, and each is a legit engine artifact. But: (a) 83 GB is a real disk sink; (b) they seed at stale
bases — the exact hazard [MEMORY: Workflow stale-worktree trap] flags ("worktree lanes can seed at a stale base;
mandate a step-0 reset to real HEAD"); the D3-dock live-fix DELTA already records a "122 commits behind" stale
worktree bite (`live-fixes/D3-dock-DELTA.md:5`). This is not a correctness defect but IS an execution-hygiene
defect the engine should sweep. **Downstream impact:** every future batch that re-uses a worktree risks the
stale-base re-bite; the disk pressure risks build failures mid-tranche.

### F2 (MINOR — status contradiction) — `2.7 BG.W-VT-ROUTE-ENHANCE` DONE-but-not-built
`EXECUTION-PROGRESS.md:98` — status **DONE**, cell text **"DEFERRED-NOT-BUILT … marked DONE to skip the build
frontier … left PENDING (explicitly optional). Re-attempt … at W-REFLECT3."** This is a genuine status/disk
contradiction: the wave is NOT built (no VT wiring beyond the pre-shipped `supportsRouteTransitions()`), yet it
counts toward DONE. The rationale (VT is additive polish with paint-only-verifiable downside risk) is sound as a
DEFER decision — but the DISPOSITION should be `DEFERRED` / `KEEP-BOOKED`, not `DONE`. A `DONE` that means
"un-built, re-attempt later" is the DONE-inflation disease in miniature. Also note `2.7`'s commit `ce93e336`
logs it as "DONE-deferred" — the log is honest, the cursor status cell is not.

### F3 (MINOR — doc drift, acceptable) — DONE-cell prose overstates two deltas
- `2.4 W-FIELD-ACCENT-RECONCILE` claims `warm-field.ts` collapsed to "~12-line adapter"; disk is **29 lines**
  (`demo/stories/warm-field.ts` — `wc -l` = 29). The fold IS real (dup table + `projectWarm`/`clampWarm`
  deleted), the count prose is stale. Harmless.
- Boot-count block (`EXECUTION-PROGRESS.md:343-344`) says `DONE: 2`; actual DONE rows = ~26. This is
  self-documented as "the frozen boot snapshot; current per-row status is the row authority" (line 351-352), so
  it is a KNOWN stale marker, not a lie — but a reader scanning the summary is mis-signalled. Fold: regenerate
  the boot-count line at each fold (or delete it — the row grep IS the authority).

### F4 (informational, NOT a defect) — the paint-decoupling is working as designed
Rows `3.1 CARTOON-INK-GAMUT` and `3.6 GLASS-BLUR-PEER` are **PAINT-PENDING**: committed (`3857b33`/`cd9ce46`),
device-free GREEN (`proof:no-gray` + `proof:glass-cal` both PASS on disk, verified), but no paint DELTA on disk
(`BG.W-CARTOON-INK-GAMUT-DELTA.md` ABSENT — correct). This is the §1-AND decoupling operating exactly as the
plan specifies (device-free GREEN → PAINT-PENDING; non-authoring verdict drained by the WS12 late-capture sweep).
No contradiction — recorded so the census is complete.

---

## The authoritative what-is-built / what-remains / what-order table

### DONE (verified on disk — 26 rows)

**PHASE 0 — Stage-0 ground-freeze (WS7, 6/7 DONE):**
| seq | wave | gate verified | evidence |
|-----|------|---------------|----------|
| 0.1 | PAINT-IS-THE-GATE | `proof:ba-gestalt` exists, born-RED by design | 7fa3156b; 18 born-RED PNGs on disk |
| 0.2 | GESTALT-ROSTER-RE-POINT | route-resolution arm | 84de6592; 10-surface roster .md |
| 0.3 | SHIP-DISCIPLINE-LIVE-PRECOND | `proof:ship-attestation` born-RED-by-design | 517548e5 |
| 0.4 | DEFERRED-LEDGER | `proof:bg-deferred-ledger` GREEN | 3fce612a |
| 0.5 | BE-BF-LEDGER | `proof:be-bf-ledger` GREEN | 6105ed6f |
| 0.6 | DISPOSITION-RESTAMP | `proof:disposition-live` GREEN | 002e9d32 |

**PHASE 1 — BH [C] concurrent-safe (10/10 DONE):** 1.1 git-hygiene · 1.2 external-payload · 1.3 value-destraddle ·
1.4 dragmorph-snap-excise · 1.5 alias-codemod (719 specifiers → `@glass/*`) · 1.6 subpath-classify (regen mech) ·
1.7 bh-carves (worm/bloomUp) · 1.8 archive-refresh · 1.9 B4b-skeleton · 1.10 design-docs-files · 1.11
evidence-prune · 1.12 core-prompts. (12 rows; all gate-verified — I ran `proof:git-hygiene`/`external-payload`/
`drag-morph` green.)

**PHASE 2 — WS1 shell/routing/field (7/7 DONE):**
| seq | wave | class | paint DELTA on disk |
|-----|------|-------|---------------------|
| 2.1 | ROUTE-TRANSITION (linchpin) | P | `BG.W-ROUTE-TRANSITION-DELTA.md` ✓ + route-transition-pipeline/ |
| 2.2 | FIELD-AURORA | P | `BG.W-FIELD-AURORA-DELTA.md` ✓ + BG.W-FIELD-AURORA-paint/ (18 PNGs) |
| 2.3 | SCROLL-PROGRESS-RAIL | P | `-DELTA.md` ✓ + scroll-progress-pipeline/ |
| 2.4 | FIELD-ACCENT-RECONCILE | H | device-free (`proof:field-accent-reconcile` GREEN, verified) |
| 2.5 | PAPER-GRAIN-OPTIN | P | `-DELTA.md` ✓ |
| 2.6 | HERO-FIT | P | `-DELTA.md` ✓ + hero-fit-pipeline/ (39 files) |
| 2.7 | VT-ROUTE-ENHANCE | P | **DONE-BUT-NOT-BUILT (F2)** |

**PHASE 3 — WS3 (2/12 real + 2 PAINT-PENDING):** 3.7 GLASS-IDIOM-FACTOR DONE (`proof:glass-idiom-factor` GREEN,
verified); 3.1 CARTOON-INK-GAMUT + 3.6 GLASS-BLUR-PEER PAINT-PENDING (device-free green, verified).

**PHASE 10 — WS4 (1 DONE early):** 10.25 CATEGORY-CARD-WARM DONE (`proof:category-card-warm` GREEN, verified;
12 paint PNGs + DELTA on disk) — a USER-REPORTED metallic-wash defect, jumped the queue.

**PHASE LX — live-fixes (3/3 DONE, dual-engine):** LX.1 CONSTELLATION-PARALLAX-OFF (`DEFAULT_PARALLAX=0`
verified on disk) · LX.2 PAPER-GRAIN-WARM-SUBSTRATE · LX.3 DOCK-COLLAPSE-DIR. All 3 have DELTAs +
capture dirs under `live-fixes/`.

### The git code-change census (bijection with DONE code-bearing rows — no phantom)
`git log v4.2.0..HEAD -- src demo scripts` yields exactly these wave-ids: BG.W-{PAINT-IS-THE-GATE,
GESTALT-ROSTER-RE-POINT, SHIP-DISCIPLINE, DEFERRED-LEDGER, BE-BF-LEDGER, DISPOSITION-RESTAMP, ROUTE-TRANSITION,
FIELD-AURORA, SCROLL-PROGRESS-RAIL, FIELD-ACCENT-RECONCILE, PAPER-GRAIN-OPTIN, HERO-FIT, GLASS-IDIOM-FACTOR,
CARTOON-INK-GAMUT, GLASS-BLUR-PEER, CATEGORY-CARD-WARM} + BH.{B0, B1, B2.0-alias, B2.1-mech, B2.4a, B4b-skeleton,
B4c-extract, B4d-prune, B6-core-prompts} + the 3 LX live-fixes. **Every code-change commit maps to a DONE/
PAINT-PENDING row; every DONE code-bearing row maps to a commit.** No phantom, no green-lie.

### WHAT REMAINS (~116 PENDING, in build order)
The frontier is `0.7 BG.W-CLOSEFIX-9SITE` (G4, lands FIRST). Then the core DAG per `EXECUTION-PLAN.md §B`:

`0.7 CLOSEFIX` → **WS3** (3.2–3.5, 3.8–3.12 = 9 rows) → **WS2 dock** (4.1–4.11 = 11) → **WS5 viz** (6.1–6.9 = 9) →
**WS6 siri** (8.1–8.4 = 4) → **WS4 components/demo** (10.1–10.24 = 23, minus the DONE 10.25) → **WS7 close-machine**
(12.1–12.12 = 12) → **WS8 glass-deep** (13.1–13.5 = 5, C-SAFARI ★★★) → **WS9 paper-deep** (14.0–14.5 = 6) →
**WS10 de-shadcn** (15.1–15.5 = 5) → **WS11 storybook** (16.1–16.4 = 4) → **WS12 coherence capstone** (17.1–17.6 =
6, the 480-capture verdict) → **BH [WS12]** (18.1–18.11 = 11 post-close acts incl. /api drop + 203 re-home +
`--ring` rename) → **19.1 BG.W-CUT** (5.0.0 tag, user-gated) → **19.2 B4f CLAUDE.md hard-delete** (absolute last).

Interleaved BH [WSn] verify-waves: 5.1/5.2 (after WS2), 7.1 (after WS5), 9.1 (after WS3), 11.1–11.6 (after WS4).

**Order-critical facts verified in the cursor:** (a) `0.7 CLOSEFIX` is re-homed from `12.0` and lands FIRST but
depends on `3.6 GLASS-BLUR-PEER` shipping `--dock-surface-blur` — a documented ordering subtlety (0.7 precond =
`[STAGE-0, 3.6]`, and 0.7 precedes `[3.5, 13.1, 14.1]`). (b) `12.4a GESTALT-CURSOR-PARITY` is the keystone — "as
wired the 5.0.0 tag cannot fire." (c) `12.5 GATE-FIELD-AURORA` opens a **BY-DESIGN WS7→WS12 red-window** on
`proof:peer-conformance` (the kf-floor-vs-`snap`-API clause lands at WS7 on `^5.0.0`, closes at `18.1
B2.1-swap`'s bump) — an expected, not-open red.

---

## Fold candidates

### FC1 (new-wave / engine-arm) — worktree GC as an engine step
Add a `sweepStaleWorktrees()` step to `bg-bh-execute.wf.js` (and a `verify-worktrees-fresh.mjs` tripwire beside
`verify-siblings-intact.mjs`): on boot, `git worktree prune` + delete any `.claude/worktrees/*` whose HEAD is not
an ancestor-or-equal of the current `tranche/BG` HEAD, and hard-cap total worktree disk. GESTALT approach: the
engine already mandates a step-0 reset-to-HEAD ([MEMORY: stale-worktree-trap]); make the reset DELETE the stale
tree instead of re-seeding on it, and make freshness a tripwire the batch-composer checks — the same
fail-closed shape as `verify-siblings-intact`. Kills F1 permanently. **Not a src wave** — an execution-doc +
engine edit, so it can land immediately without touching the build frontier.

### FC2 (plan-doc-edit) — retire the DONE-to-skip-frontier flag; give `2.7` an honest disposition
`2.7 BG.W-VT-ROUTE-ENHANCE` → status **DEFERRED** (or **KEEP-BOOKED**), with the honest trigger already in its
cell (re-attempt at W-REFLECT3 under live dual-engine paint, shell-Aurora `view-transition-name` exclusion). The
"marked DONE to skip the build frontier" pattern is forbidden going forward — a wave the engine should not
attempt is expressed by a DEFERRED status the frontier-sweep skips, NOT a false DONE. GESTALT: the frontier
predicate (`cursorFrontier()` = first non-DONE) is the reason someone reached for the DONE-hack; add a
`DEFERRED`/`BOOKED` status to the frontier's skip-set so honesty and frontier-progress stop being in tension.
This is the DONE-inflation disease the whole tranche exists to cure — fix it in its own cursor first.

### FC3 (plan-doc-edit) — auto-regenerate the boot-count + reconcile the `~12-line` prose
Delete or regenerate the stale `Boot counts. … DONE: 2` line at each fold (the row-grep is the authority; a hand
boot-count only ever drifts). Correct the `2.4` "~12-line adapter" prose to the disk truth (29 lines). Trivial,
folds into any WS7 close-machine doc-hygiene pass — candidate to MERGE into `12.3 DEAD-GATE-SWEEP`'s doc arm
rather than its own wave (no new ceremony).

### FC4 (defer-honest, NOT a fold) — the census confirms the DAG + build-order are KEEP
No re-plan is warranted from the state census: the DONE work is real, the order is coherent, the paint-decoupling
works. This lens's contribution to `AMENDED-GESTALT-PLAN.md` is the two honesty fixes (FC1/FC2) + the confirmation
that the ~110-wave frontier is intact and correctly ordered — a green light for the other lenses to attack the
QUALITY of the remaining plan (contrivance, granularity, encapsulation) rather than its correctness.
