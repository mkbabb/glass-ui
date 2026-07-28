# History archaeology — session, tranche, and edict audit

**Audit time:** 2026-07-28, America/New_York
**Repository state inspected:** `d844bef6` (`docs(BJ/refinement): stage-2 delta fold launched`) plus the dirty working tree present at audit time.
**Scope:** read-only audit of Claude/Codex history, the current active Claude session, tranche/wave records, git history, and the current component/style tree. This report is the only file authored by this audit.

## Executive finding

The next tranche is substantially formulated, but it is **not implementation-ready until the stage-2 delta fold is actually sealed**. The active Claude session hit its limit while its two fold arms were writing non-canonical candidate material. The canonical roster and BK cursor agree on their pre-fold state, but are stale: they still describe NOVELTIES and DESIGN-NOW as pending even though both banks now exist. The workflow journal records two `started` entries and **zero results**; the untracked arm candidates contain proposed post-fold state, but have not reached writer/critic/seal and therefore have no canonical authority.

Do not let a closure sentence advance state. Resume and seal the existing fold first; only then amend the canonical roster/cursor/port together. BK remains a formulation and execution plan, not a landed source refactor: git has **0 commits touching `src/` since 2026-07-23**, alongside **29 commits touching tranche docs** in that period.

## Method and reproducibility

This is intentionally a two-level audit: corpus-wide mechanical coverage catches repetition and drift; manual, evidence-backed reading adjudicates only the current state and high-leverage contradictions.

| Corpus | Exact sample | What was done |
|---|---:|---|
| Claude Code, glass-ui project | all **26** project JSONL transcripts, **16** over 100 KB (project store is 6.8 GB) | Full-text thematic scan; active session deeply read for user messages, tool history, workflow state, and final wall event. |
| Codex | **128** newest of **1,040** transcripts containing the exact glass-ui CWD | Full-text thematic scan. Selection was ordered by filesystem mtime, not hand-picked; endpoint files are `~/.codex/sessions/2026/07/28/rollout-2026-07-28T12-57-29-019fa9a8-f333-7051-b0c4-7e63ae3bbb37.jsonl` and `~/.codex/archived_sessions/rollout-2026-07-22T05-21-18-019f8921-2416-7ec2-b582-4613116e9a39.jsonl`. |
| Combined session coverage | **154** transcripts | Exceeds the requested 100-session floor. Counts below are phrase-presence per sampled file, not a claim that every match is an independent user message; subagent prompts deliberately repeat standing instructions. |
| Tranche/wave records | **160** newest text/JSON/JS files under `docs/tranches/` | Read/swept against the active BJ/BK records. The on-disk corpus contains 5,271 such files and 1,145 wave-ish paths (`*/waves/*`, or name contains wave/tranche). |
| Source and history truth | current tree + git | Cross-checked current component counts, imports, git history, commit contents, canonical BK cursor, and the Claude workflow journal. |

Selection commands, runnable from repository root:

```sh
# Codex 128 (the relevance filter is exact CWD presence)
rg -l -m 1 --fixed-strings '/Users/mkbabb/Programming/glass-ui' \
  /Users/mkbabb/.codex/archived_sessions /Users/mkbabb/.codex/sessions \
  | xargs stat -f '%m %N' | sort -nr | head -n 128 | sed 's/^[0-9][0-9]* //'

# Claude project corpus
find /Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui \
  -maxdepth 1 -type f -name '*.jsonl'

# Recent tranche sample
find docs/tranches -type f \( -name '*.md' -o -name '*.json' -o -name '*.js' \) \
  -exec stat -f '%m %N' {} + | sort -nr | head -n 160 | sed 's/^[0-9][0-9]* //'
```

### Mechanical recurrence indicators

| Theme | Codex 128 | Tranche 160 | Interpretation |
|---|---:|---:|---|
| pruning/deletion/overfit | 128 | 114 | The library's repeated central mandate, not a new finding. |
| KISS | 110 | 40 | Broadly reiterated; it must be attached to measurable reductions, not more prose. |
| colocation | 112 | 69 | Repeatedly specified, mostly future BK work. |
| Breath of Life | 97 | 72 | Strong design identity, but its census wave is not yet executed. |
| Movement of Momentum | 76 | 36 | Strong motion identity; implementation still waits on the spring/engagement lanes. |
| Ecoute | 81 | 47 | The iteration mechanism itself has become a visible source of churn. |
| durability/session wall/no-incomplete-work | 98 | 29 | Correctly recognized as a chronic risk; row #90 demonstrates that artifact survival alone does not complete a state transition. |
| no legacy/clean break/no masking fallback | 81 | 43 | A genuine, largely respected design constraint; preserve it. |
| shadcn | 37 | 25 | The textual clean-up is not equivalent to idiom/component abrogation. |
| consumer truth/dependency | 127 | 24 | Nearly ubiquitous session concern, but the executable consumer band remains unstarted. |
| GOLDEN GLASS | 10 | 11 | Important but comparatively under-defined; it needs one landed canon and one acceptance matrix. |

## Current active Claude session: exact handoff state

**Authoritative session:** `/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21.jsonl`.

- Began 2026-07-24 17:31; its final entry is the session-limit event at **2026-07-28 15:57:13 EDT**.
- Its recent, committed documentation banks are real: `8bb4656d` (EXEMPLARS-CODEX), `a6761399` (validation cures), `99706211` (BK cut), `05cc171f` (DESIGN-NOW), `a0fb0407` (CURES), `ef0307b2` (capture addendum), and `d844bef6` (stage-2 workflow launch).
- The current operation is `wf_95c36395-9fa`, scripted durably at `docs/tranches/BJ/addenda/2026-07-24-refinement/wf/stage2.wf.js` and intended to fold DESIGN-NOW, EXPERIMENTS/capture, CURES, PROCEDURAL-APOTHEOSES, VALIDATION, and ASK data into the Terminal Roster and BK cursor/port.
- The workflow journal at `~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_95c36395-9fa/journal.jsonl` contains **2 `started` entries, 0 `result` entries**. No writer, critic, or seal result is recorded.
- Both arm transcripts terminate in the same session-limit message. Three generated candidates are untracked in the worktree:
  - `docs/tranches/BJ/addenda/2026-07-24-refinement/STAGE2-FOLD.arm-fable.md`
  - `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.stage2.arm-fable.md`
  - `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.stage2-arm-opus.md`

### The primary state gap

| Record | State it asserts | Evidence-backed reading |
|---|---|---|
| `TERMINAL-ROSTER.md`, row #90 | codex half due; NOVELTIES and DESIGN-NOW still pending | Canonical and internally consistent at its `8bb4656d` pin, but stale after the later bank commits. |
| `docs/tranches/BK/EXECUTION-PROGRESS.md`, #90 | `UNSTARTED — codex half DUE` | Same pre-fold state as the roster; it needs the same sealed transition, not a hand edit. |
| `wf_95c36395-9fa/journal.jsonl` | two arm starts only | Authoritative workflow evidence: no result, no adjudication, no canonical write, no seal. |
| three untracked arm files | candidate amendments, including post-fold state | Useful evidence only. They must not be treated as the plan of record or silently copied into it. |

The candidates propose post-fold changes such as seating W-OVERLAY and changing its phase. Those are **not** a present canonical phase inconsistency: both current canonical files consistently retain #89 at Φ6, unbuilt, and dependent on the stage-2 bank. The seal must adjudicate whether the candidate's change survives and then apply it once across all canonical surfaces.

### Resume protocol — do this before any BK execution

1. Preserve the three arm candidates and the two agent logs as evidence; do not hand-merge either arm.
2. Resume `wf_95c36395-9fa` using the durable script and `resumeFromRunId`. The resumed run must consume both historical arms, re-read the current canonical files, then run a GPT Sol xhigh adjudicator/writer, GPT Luna xhigh mechanical critic/applier, and final GPT Sol xhigh seal in order.
3. Require the seal to make one atomic, reviewable canonical patch to exactly the roster, `BK/EXECUTION-PROGRESS.md`, `BK/PORT.md`, and the quote in `BK/ASK.md` if its cited owner surface moved. It must prove 90 IDs/87 cursor rows, exactly 60 gate seats, and explicit disposition for each delta (a)–(e).
4. Record workflow results in the journal and commit the sealed documentation before declaring formulation closed. Only then may row #90 become `CLOSED` or its equivalent.
5. The resume should route all cognitive adjudication/design work to **GPT Sol xhigh** and bounded mechanical/census work to **GPT Luna xhigh**, per the current owner instruction. Do not claim either historical Claude arm used those models; retain their actual provenance.

## What the history says, reconciled against disk

### Accepted and materially landed before BK

- The 2026-07-20–22 BJ period contains **28 source commits**. Examples include real component/style work and reductions: `85089b3b` (DeckPager/goo clone removal), `bda718ac` (reduction deletes/pulse merge), `7d0c77ac` (colocation carve), `f04f05d`/`a77ae9f` (prop-diet plus stale-census correction), `31c01d2`/`dc566e3` (radius and blur work), and `b0f2818` (paint-cure verification).
- The clean-break law has real traction: the archaeology records zero masking fallbacks over the measured PROPORTION categories, and the current plan still forbids aliases, migration shims, dual paths, and silent fallback mechanisms.
- Formerly open work was actually banked rather than merely described in several late July commits: validation material, captured experiments, CURES, terminal specs, the BK charter, and workflow scripts all have committed evidence above.
- The process has learned to preserve input material: scripts live under `addenda/.../wf`, journals are retained, and `WORKFLOWS.md` has a ledger. That is a meaningful improvement over prior wall losses.

### Accepted in design, but not implemented

- **GOLDEN GLASS / design canon:** `GESTALT.md` identifies the need for a single canon; DESIGN-NOW says the body/emitter was produced and checked, but it remains scratchpad-resident and BK #78 is `UNSTARTED`. It is a landable candidate, not a landed source of truth.
- **Breath of Life and Movement of Momentum:** the terminal roster routes their implementation through #26–#30 and #77. BK #77's 62-row momentum census is `UNSTARTED`; claims of system-wide suffusion must therefore remain future-facing.
- **Shadcn abrogation:** the archive's statement that the style half is “discharged” only covers text/tombstones. Its own GESTALT audit finds 49 reka mirror shells (1,724 LOC), 19 class-only forwarders (307 LOC), 174 SFCs, and a shadcn-shaped radius/token/component vocabulary. Current source corroborates the scale: **174 Vue SFCs**, **57,657 component LOC**, **81 files importing reka-ui**, and **177 `data-slot` lines in 93 component files**. BK #64 (the shadcn-abrogation prelude) is explicitly `UNSTARTED`.
- **Pruning and colocation:** the terminal design has a credible target (62 components → 55, 54 if deck falls; 174 SFCs → roughly 116), but it is a plan. Use it as an execution queue, never as a completed-library claim.
- **Consumer truth:** BK #76 is the designated cross-repo consumer band and is `UNSTARTED`. Past consumer evidence is useful triage, not permission to remove or retain an API without a fresh whole-repo census and a marked consumer addendum.

### Rejected, retired, or correctly narrowed

- Do not preserve an obsolete API solely because a consumer exists. The terminal plan's consumer rule is correct: update the consumer through its own marked addendum; a library row closes only after publication, not after a local commit.
- Deck is **not** an automatic deletion: its original no-usage claim was refuted by Atlas usage and it was re-heard. Keep the `RE-HEAR` disposition until a fresh consumer walk decides it.
- Avoid creating generic shared machinery merely because surfaces look similar. The existing rulings correctly preserve distinct ARIA/state machines where role semantics differ (for example the control-bit triad) while pursuing shared registers and colocation.
- Do not reopen full design lanes during BK execution. New evidence should amend a named row; an unbounded re-design pass is a formulation regression unless a named falsifier invalidates the terminal spec.

## The recurrent failures to stop repeating

1. **Repetition was mistaken for progress.** `ARCHAEOLOGY.md` records the dock at at least 101 repetitions and the wake edict at at least 123, with no equivalent source acceptance. A repeated owner sentence must update a single registry row, not mint another narrative or wave.
2. **Document closure outpaced source closure.** The history now has extensive, high-quality formulation documents but no `src/` commits after 2026-07-22. Every status surface needs a clear `FORMULATED`, `LANDED`, and `VERIFIED` dimension; “banked” alone is ambiguous.
3. **One-source law was declared before state transitions were mechanically enforced.** Row #90's canonical plan predates its newly banked inputs, while generated candidates may leap ahead; pointers alone do not make the reconciliation atomic.
4. **The shadcn census used a too-narrow definition of done.** Textual mention removal/tombstones should be reported as `DECLARATION CLEARED`; semantic boundaries, wrapper topology, default visual grammar, and token vocabulary must remain a separate `IDIOM CLEARED` measurement.
5. **Session durability stopped at artifact preservation.** Input and arm output survived, but a wall still left canonical truth ahead of journal truth. Durability must include an atomic state transition after a result is accepted.

## Amend, prune, and add

### Amend the tranche/cursor rules

- Give each row three independently checkable fields: `spec_state` (draft/banked/sealed), `code_state` (unstarted/in-flight/landed/verified), and `evidence_state` (owed/captured/adjudicated). Never infer one from another.
- Make `WORKFLOWS.md`/journal outcome authoritative for active workflow state. The roster can advance only in the commit that records the sealed outcome and cites the journal result key.
- Add a machine-checkable invariant for row #90-style seams: no canonical state may advance from `IN-FLIGHT`/`DUE` to `SEALED`/`CLOSED` unless the referenced journal has a result for every required phase and the advancing commit cites the seal result.
- Translate future model-role language once at the plan boundary: **GPT Sol xhigh** for synthesis, design, adjudication, and orchestration; **GPT Luna xhigh** for bounded mechanical extraction, tests, and document/manifest work. Preserve historical Fable/Opus names only as provenance, not as an instruction to new seats.

### Prune authority and contrivance

- Prune the authority of unsealed arm files. Keep them as provenance, then either commit under an explicit `evidence/` designation or remove them from the operative tree after their delta dispositions are represented in the sealed canonical commit. Do not leave similarly named candidates next to the source of record indefinitely.
- Prune status-copy prose. BK's cursor should contain pointers and status only; the roster should contain current row truth; banks hold grounds. Any third restatement is a drift surface.
- Prune “discharged” claims that only mean an audit found a residue. The full shadcn abrogation requirement is not satisfied by comment/tombstone accounting.
- Continue the component purge only on fresh import/consumer proof. The current shell/mirror counts make the priority real, but shared functionality, keyboard contracts, and public exports decide the cut—not resemblance.

### Add the small controls that make this session-durable

- A `tranche-state` verifier should join: canonical row state, workflow journal result count, git commit containing the landed file, source diff since the row's pin, and required browser evidence. It should fail on any impossible combination.
- Add an execution dashboard with just four counters: `formulated`, `sealed-spec`, `source-landed`, `browser-verified`. This replaces rhetorical close language with an observable burn-down.
- Establish one de-shadcn scorecard with four columns: default visual residue, wrapper topology, token/utility residue, and public API boundary. Count tombstone comments separately and never roll them into clearance.
- Tie GOLDEN GLASS to a minimum acceptance matrix: warm-cream identity, frost transmission, role radius, lead/lag/momentum, PRM, and WebKit/device verdict. The canon is not complete until its emitted checks and implementation consumers are committed.
- Make the first BK source batch deliberately small: resolve Φ0 only (#1–#5 plus the stage-2/cursor seal), prove it on source/test/browser evidence, then re-census. This prevents the 90-row plan from becoming another all-at-once contrivance.

## Resumable handoff

Start a fresh session by reading these in order:

1. This report.
2. `docs/tranches/BK/PLAN.md` §§1–6 and `docs/tranches/BK/EXECUTION-PROGRESS.md`.
3. `docs/tranches/BJ/addenda/2026-07-24-refinement/EXEC-STATE.md` and `WORKFLOWS.md`.
4. `docs/tranches/BJ/addenda/2026-07-24-refinement/wf/stage2.wf.js` and the `wf_95c36395-9fa` journal.
5. The three untracked stage-2 arm files as **non-authoritative evidence**.

Then resume the stage-2 workflow. Do not commence a BK source wave, amend the roster by hand, or call the formulation complete until its result/writer/critic/seal chain is recorded and committed. Once sealed, make the source-of-truth reconciliation the first commit; then begin BK Φ0 with fresh rather than inherited claims.

## Evidence index

- Active transcript: `/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21.jsonl`.
- Active workflow journal: `/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_95c36395-9fa/journal.jsonl`.
- Durable workflow script: `docs/tranches/BJ/addenda/2026-07-24-refinement/wf/stage2.wf.js`.
- Canonical pre-fold state: `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md` row #90; `docs/tranches/BK/EXECUTION-PROGRESS.md` rows #90 and #89. Proposed post-fold changes exist only in the three untracked arm candidates.
- Component/topology finding: `docs/tranches/BJ/addenda/2026-07-24-refinement/GESTALT.md` §§1–3, cross-checked with `find src/components -name '*.vue'`, `rg reka-ui src/components`, and `rg data-slot src/components`.
- Repetition / implementation matrix: `docs/tranches/BJ/addenda/2026-07-24-refinement/ARCHAEOLOGY.md` §§2 and 5.
- BK formation cut: `99706211818faccb89d4941cf69281b6479e4366`.
- Current fold launch: `d844bef6f25f72cf7d7132643f502076e9dd2b4c`.
- Banked design/capture/cure evidence: `05cc171fd056262ce81edade106d6d3a861f8cba`, `ef0307b2606a24db150e00114660f4bdda72082c`, and `a0fb0407c54c096a6ecf70cd34250d7d4ea2872f`.
- Source/document split: `git log --since='2026-07-23' -- src` produced 0 commits; the same query for `docs/tranches` produced 29.

**Audit verdict:** retain the hard-won formulation and its evidence, but treat the live fold as in-flight and BK source execution as not yet started. The fastest route to less friction is not another Ecoute: seal one truthful state, reduce sources of status, then let source, consumers, and browser evidence determine each subsequent transition.
