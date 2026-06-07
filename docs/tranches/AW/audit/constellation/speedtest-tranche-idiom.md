# speedtest-tranche-idiom — next tranche is AV; tree is CLEAN (not ×157); house format fully captured; NO reconcile-wave demanded

Lane verdict: speedtest's tranche house-style is mature and stable (G..AU, Greek-disjoint
waves, two-gate posture, SEED+SUM register, DDR ledger). The HEAD tree is **clean (0 dirty)**
— the "historically ×157-dirty" expectation is REFUTED at HEAD today. The next tranche letter
is **AV**. The only reconcile-shaped precondition is the 38-worktree GC (already routed to a
W-CLOSE prune), not an inv-16′ tree-reconcile wave. Below is a precise authoring template.

## Findings

1. **Latest tranche is AU; it is PLAN-ONLY and never dispatched.** `docs/tranches/AU/` contains
   exactly one file — `AU.md` (15,748 bytes, authored 2026-06-04). No `PROGRESS.md`, no `STATUS.md`,
   no `audit/`, no `design/` subdir (`ls docs/tranches/AU/` → `AU.md` only). The HEAD commit IS the
   AU plan commit: `bdeefcc7 docs(tranche-AU): 6-agent deep-audit synthesis + AU tranche plan`, and
   `git log bdeefcc7..HEAD` is empty — zero commits after the plan. AU.md:6-9 self-declares posture
   "tranche-development — this document is the PLAN. Implementation needs a separate Gate-2 go." So
   AU is awaiting Gate-1/Gate-2 and has banked nothing.

2. **Next letter = AV (verified, two ways).** (a) The Greek-letter ordering of `docs/tranches/`
   ends at AU. (b) AU.md §9 (`AU.md:182-186`) explicitly names the successor: "**AV** — seeded at
   AU-W-CLOSE." There is NO `AU-SEED.md` yet (SEED files are authored AT the predecessor's W-CLOSE;
   AU never closed) — confirmed by `ls docs/tranches/ | grep SEED` → only `AO-SEED.md AP-SEED.md
   AQ-SEED.md AR-SEED.md`. **AV authoring will need its own seed authored fresh** (there is no
   handoff seed waiting), OR AV opens by adopting AU.md's §9 successor note as its de-facto seed.

3. **The tree is CLEAN at HEAD — the ×157-dirty premise is stale.** `git status --porcelain
   --untracked-files=all` → **0 lines**. Branch `master`, ahead of `origin/master` by **23 commits**
   (the SUM-1 push freeze — `git status -sb` → `[ahead 23]`). The dirt the brief expected lives
   ELSEWHERE: **38 detached `.claude/worktrees/agent-*` dirs, ~45 GB** (`du -sh .claude/worktrees`).
   That is the D15 worktree-prune carry (AR-SEED.md:37-38; AT.md:75 routes it to W-CLOSE via a
   salvage-gated `close-prune.sh`), NOT main-tree dirty. **Categorization of the "dirt": neither src
   nor docs nor generated in the main tree — it is git-plumbing detritus (stale agent worktrees) +
   1 stale stash** (`stash@{0}: WIP on worktree-agent-…` referencing glass-ui N.W0, long dead).

4. **Consequence for inv-16′: a reconcile WAVE is NOT demanded.** The inv-16′ "tree reconciled
   first" precedent exists (`AT/PROGRESS.md:45` — AT's constellation arm restored stray-deleted
   `tests-e2e/`+`.browserslistrc`, reverted a corrupted evidence file, gitignored 54 capture-PNGs,
   committed persisted-evidence debt). But that reconcile ALREADY RAN in AT and the main tree is
   clean now. So AV opens against a clean base — its only reconcile-shaped precondition is the
   worktree GC, which is housekeeping, not a wave-blocker. Honest negative: **AV does NOT need a
   front-loaded reconcile wave** the way the brief hypothesized.

5. **glass-ui pin is `^3.1.0` — STALE vs the constellation's 3.3.0/3.4.0 reality.** `package.json:88`
   `"@mkbabb/glass-ui": "^3.1.0"`, `package.json:89` `"@mkbabb/keyframes.js": "^2.2.0"`. (No
   `@mkbabb/value.js` direct dep — confirmed; value.js is transitive via keyframes per AT.md:101.)
   Note the package root is **`/Users/mkbabb/Programming/speedtest/package.json` (repo root)** — the
   brief's `frontend/package.json` path is WRONG; there is no `frontend/` dir, only `./package.json`
   + `./server/package.json`. The AU plan (AU.md:8, AU-W0) already scopes a 3.1.0→3.1.1 + keyframes
   2.2.0→3.0.0 reconcile; an AV authored TODAY must re-baseline to **3.4.0** (the dock-collapse-fix
   publish) since speedtest mounts `GlassDock` — and per the constellation rule, MUST NOT stop at
   ^3.3.0 (the broken-dock release).

6. **The house wave-spec format is fully regular (template in Wave-forming input).** Every recent
   plan (AT.md, AU.md) opens with a bolded date/posture/base preamble, then numbered §§: §0 Thesis,
   §1 Binding question (italic, one sentence), §2 Goal criterion, §3 the transposition spine / completion
   criterion, §4 wave sequence (a `| Wave | Disposition | Contents |` table), §5 deferred census, §6
   cross-repo perimeter, §7/§8 Gates, §9 Successor. Waves are named `<LETTER>-W0`, `<LETTER>-W1` (DEV),
   then `<LETTER>-R1..Rn` (IMPL rounds), `<LETTER>-W-RATCHET`, `<LETTER>-W-CLOSE`. Sub-lanes use Greek
   (α β γ δ ε ζ) and MUST be "H2-disjoint" (non-overlapping MODIFY file bounds for parallel agents).

7. **Disposition vocabulary is fixed and load-bearing.** Waves carry a **Disposition** column with a
   tiny closed vocabulary: **DEV** (docs/decisions/baseline-reconcile only — no `src/` touch) vs
   **IMPL** (touches `src/`). A literal `───── | ───── | DEV/IMPL boundary — needs Gate-2` separator
   row sits in the table between the last DEV wave and the first IMPL wave (AT.md:69, AU.md:104). The
   two-gate model is canonical: **Gate-1** = plan ratification; **Gate-2** = a separate explicit
   implementation-go before R1 dispatches (AT.md:110-111, AU.md:164-165).

8. **The deferred-census taxonomy (§5) is a fixed 4-class + CHRONIC schema.** AU.md:118-147 codifies
   the M6 taxonomy: **Class-A** (cross-repo-publish → routed + consumer stopgap), **Class-B**
   (deploy-gated → author-now, effect-on-GO), **Class-C** (upstream-blocked → carry verbatim),
   **Class-D** (scope → pulled in), plus **CHRONIC** rows (the G-AP-D-CRED-CONSOLIDATE 5-tranche
   terminal). DDR codes (`DDR-AS-RC-1..5`) are append-only decision-reversal stamps carried verbatim
   across tranches (AT.md:85-93). The whole class system is what a wave-writer slots each carry into.

9. **The SEED-file convention.** A `<LETTER>-SEED.md` is authored at the predecessor's W-CLOSE and
   lives at `docs/tranches/<LETTER>-SEED.md` (sibling to the tranche DIR, not inside it). Standard
   shape: `# <LETTER> — seed (from <PRED> close, <date>)`, then `§0` the lead/headline carry (often a
   cross-repo R0-glass HANDOFF), `§1` standing user-frozen (SUM rows), `§2` in-repo carries (small,
   foldable), `§3` process (bound into ORCHESTRATION), `§4` worktree hygiene. (AO-SEED.md, AP-SEED.md,
   AQ-SEED.md, AR-SEED.md all conform.) **AV-SEED does not exist** and must be authored — either at
   AU-W-CLOSE (if AU runs first) or as AV's own opening if AV supersedes AU.

10. **SUM register is a separate verbatim-resistant channel.** `docs/tranches/MANDATES.md` holds
    Standing User Mandates (currently only **SUM-1 production deploy freeze**, FROZEN since AB
    2026-05-13). A SUM is explicitly "NOT a `*-CARRY-*` backlog row — never counted, aged, or ranked
    as a chronic" (MANDATES.md:3). A wave plan references SUM-1 in its §7/§8 Gates and §6 cross-repo
    perimeter but must never re-frame it as latency. The CRED-CONSOLIDATE chronic (3 orphan cred
    files) is the one terminal chronic, adjudicated at every W-CLOSE.

11. **Gate idiom / completion criterion is a concrete green-bar checklist.** AT.md:39-41 (§3 Completion
    criterion) is the template: `vue-tsc 0 · vitest green (≥541) · build 0 · boundaries clean ·
    test:smoke:charts running · the §8/§9 witness battery + AFTER numbers persisted on the throttled
    dark edge · overfitting audit CLEAN · the next R-CONSUME recorded · the successor seed authored ·
    tags <pred>-close + <this>-close`. Speedtest carries its own `ci:gate` + `check:boundary`
    (`scripts/check-glass-ui-boundary.mjs`, package.json:17) + `test:smoke:charts` preview-build gate.
    The W-RATCHET wave is where real-throttled-edge evidence (CLS via Lighthouse-JSON settled-trace or
    multi-trial median, never a single buffered-observer shot — AT.md:74,180) is persisted.

12. **Subdir convention for the active tranche.** A live tranche dir grows `audit/` (deep-audit
    synthesis + constellation-adoption fold; AT has `constellation-adoption-2026-06-02.md` +
    `grand-audit-fold-2026-06-03.md`) and `design/` (per-lane design docs; AT has 4 `WC-design-*.md`).
    AU has none yet (plan-only). A `PROGRESS.md` (running ledger with a Wave|Disposition|Concern|Status
    table) is authored once a tranche dispatches.

## Wave-forming input (lift-ready for the AV wave-spec writer)

- **Tranche letter: AV.** Dir: `docs/tranches/AV/`. Plan file: `docs/tranches/AV/AV.md`. Optional
  `docs/tranches/AV-SEED.md` (author if AU closes first; else fold AU.md §9 as the seed).
- **Mandatory preamble block** (copy AU.md:1-9 shape): `# Tranche AV — wave plan ("<thesis tag>")`,
  then bolded `**Successor to AU**` / `**Posture:** tranche-development` / `**Base:** speedtest
  <verified-SHA>; glass-ui ^3.4.0 (verify at dispatch per baseline-drift); keyframes.js <pin>` /
  `SUM-1 deploy/push freeze HELD`.
- **Section skeleton** (lift verbatim): §0 Thesis · §1 Binding question (one italic sentence) · §2
  Goal criterion · §3 transposition spine OR completion criterion · §4 Wave sequence table · §5
  deferred + chronic census (4-class + CHRONIC) · §6 cross-repo perimeter · §7 Gates · §8 quality
  posture carried · §9 Successor.
- **Wave-sequence table columns**: `| Wave | Disposition | Contents |`. Rows: `AV-W0` (DEV —
  baseline reconcile to glass-ui 3.4.0 + ledger), the `───── | ───── | DEV/IMPL boundary — needs
  Gate-2` separator, then `AV-R1..Rn` (IMPL, ≤5 Greek-disjoint lanes each), `AV-W-RATCHET` (real-edge
  re-witness), `AV-W-CLOSE` (FINAL + AW-SEED + worktree prune + tags). End §4 with a "Critical path:
  …" sentence.
- **Gate sketch**: §7 Gates = `Gate-1 ratification (awaiting user) · Gate-2 implementation-go
  (separate explicit signal before AV-R1) · SUM-1 deploy/push freeze HELD · DEC-9 ci:gate-green is
  the freeze-lift precondition`. Completion gate = the AT.md:39-41 green-bar checklist above + tags
  `av-close` (+ any inherited `au-close`/`as-close`/`ar-close` if AU's debt rolls forward).
- **AV's most likely scope (from AU.md §9 + AU.md:129-137 Class-A) is the AS-GU R-CONSUME tail**: as
  glass-ui publishes the DDR-AS-RC-2 bundle members, speedtest consumes + reverts the AT/AU consumer
  stopgaps. **The AW glass-ui surfaces map directly onto this tail** — when glass-ui ships AW.W4-8
  aurora (deriveAurora front-door, full in-shader OKLCh) and AW.W9-11 blob, those satisfy the long-
  standing `deriveAurora`/OKLab-LUT ask (AU.md:130-132); AW.W16 `.glass-progress-rail` over <Progress>
  and AW.W17 Constellation are net-new candidate adoptions. **The dock-collapse fix (AW.W1 → 3.4.0)
  is the gating publish: speedtest mounts GlassDock and is the live VT consumer via the dock
  (AT.md:53), so AV's W0 reconcile MUST land on 3.4.0, never ^3.3.0.**
- **Sequencing edges**: AV-W0 (DEV, reconcile to 3.4.0) → [Gate-2] → AV-R-CONSUME lanes (gated per
  glass-ui publish; revert stopgaps via an H10-style checklist) ∥ any in-repo Class-D residue → AV-W-
  RATCHET (real dark+light throttled edge, persisted) → AV-W-CLOSE (AW-SEED + the 38-worktree
  `close-prune.sh` + the CRED-CONSOLIDATE terminal yes/no). The cross-repo asks are surfaced to the
  fourier hub `ADOPTION-ASKS.md` (speedtest authors ask CONTENT; the hub WRITE is the maintainer's,
  per inv-16/inv-26 — AU.md:149-160).

## Anti-findings (verified FINE / already done)

- **No tree-reconcile wave needed.** Main tree clean (0 dirty, `--untracked-files=all`); the AT
  constellation arm already did the inv-16′ reconcile (AT/PROGRESS.md:45). AV opens on a clean base.
- **House format is regular and complete** — AT.md + AU.md share an identical §-skeleton, wave-naming,
  disposition vocabulary, and gate idiom. A wave-writer needs no format invention, only the AV scope.
- **The SUM register is correctly isolated** (MANDATES.md) — SUM-1 is not aged as a chronic; that
  discipline is intact and must be preserved in AV.
- **The DDR ledger + deferred census carry forward cleanly** across AS→AT→AU; the taxonomy is stable.
- **keyframes.js / value.js dep posture is honest** — keyframes `^2.2.0` (AU-W0 assesses the 3.0.0
  major), no direct value.js dep (transitive). No hidden dep drift in the main tree.

## Summary
speedtest's next tranche is **AV** (verified: dir order ends at AU; AU.md §9 names AV as successor;
no AU-SEED exists because AU never closed). AU is **plan-only** — `AU.md` is the HEAD commit
`bdeefcc7` with zero impl commits after it, awaiting Gate-1/Gate-2. The HEAD main tree is **CLEAN
(0 dirty)** — the "×157-dirty" premise is REFUTED; the real detritus is 38 stale `.claude/worktrees/
agent-*` dirs (~45 GB) routed to a W-CLOSE `close-prune.sh`, plus 23 commits ahead of origin under
the SUM-1 push freeze. So **no inv-16′ reconcile-WAVE is demanded** — AV opens on a clean base; the
only reconcile-shaped item is worktree GC (housekeeping, not a blocker). The house wave-spec format
is fully captured: bolded preamble → §0-§9 skeleton → `| Wave | Disposition | Contents |` table with
DEV/IMPL boundary row → Greek-disjoint R-lanes → W-RATCHET → W-CLOSE; two-gate posture (Gate-1 plan,
Gate-2 impl-go); 4-class+CHRONIC deferred census + verbatim DDR ledger; SUM register isolated in
MANDATES.md; SEED files at `docs/tranches/<L>-SEED.md`. The glass-ui pin is **stale at `^3.1.0`**
(package.json:88, at repo root — NOT frontend/) — AV-W0 must re-baseline to **3.4.0** (the AW.W1
dock-collapse-fix publish), never ^3.3.0, since speedtest mounts GlassDock. AV's likely spine is the
AS-GU R-CONSUME tail (revert stopgaps as glass-ui ships deriveAurora/blob/progress-rail).

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/constellation/speedtest-tranche-idiom.md
