# K.Rδ — Worktree + Parallel-Dispatch Friction Audit (process tier)

**Lane**: δ — pre-K research.
**Mode**: READ-ONLY.
**Author**: research agent.
**Date**: 2026-05-06.
**Source baseline**: J close `5bcf1ce`; J planning consolidation `5baceb5`.

This lane diagnoses dispatch-process friction encountered during J. The user
asked for the worktree-ref errors, friction surfaces, and any redress for K.
Findings are harsh on incidents per the user directive.

---

## §A — Incident catalog

Six incidents with material orchestration cost surfaced during J.

### §A.1 — Branch consolidation (start-of-J): three-way merge aborted

- **Source**: `docs/tranches/J/PROGRESS.md:15-19`; consolidation commit
  `5baceb5` (`chore(docs/tranches): consolidate H + I + J planning onto master`).
- **What happened**: J planning was authored on `o-w2_7-instrument-chassis`
  (HEAD `118824d`); the user then surfaced master diverged via a
  v0.7.x→v0.8.0 release path that retired the four-tier glass ladder. A
  three-way merge of master + `release/0.8.x` + `o-w2_7-instrument-chassis`
  produced 18 conflicts and was aborted. Recovery used a surgical
  `git checkout o-w2_7 -- docs/tranches/{H,I,J}/` cherry-pick (purely
  additive under `docs/tranches/`). Backup tags preserved 4 branch heads.
- **Root cause**: planning was written against a substrate that had already
  been retired upstream. The orchestrator who wrote J's wave specs was not
  reading master HEAD — they were reading a sibling branch's HEAD. Worktrees
  did NOT cause this; long-lived planning branches did.
- **Preventable at dispatch level**: yes — pre-flight `git fetch && git log
  --oneline master..HEAD` before opening planning would have surfaced the
  divergence. R6's W0-reconciliation lane was forced to absorb 10 §F
  amendments because of this miss.
- **Preventable at precept level**: yes — `tranche/SPEC.md ## Plan Shape`
  should require a "planning branch == master at open" gate. If the
  orchestrator opens a tranche on a sibling branch, the SPEC requires a
  rebase-onto-master step before any waves dispatch.
- **Recovery cost**: ~10 §F wave-spec amendments in W0 reconciliation
  (audit/W0-reconciliation.md ~131 dispositions); the entire v0.8.0
  token-cleanup miss (27 stale `--glass-{bg,blur,border,shadow}-{subtle,
  default,medium,elevated}` references) had to be absorbed mid-W2 instead
  of being baked into W2's plan. Net cost: 1 wave (W0) of orchestrator-
  direct effort + 19+9 file edits absorbed into W2.A's bounds beyond plan.

### §A.2 — W3 Lane B "external rollback between tool calls"

- **Source**: `docs/tranches/J/PROGRESS.md:110-111`; `docs/tranches/J/
  audit/J-pre-close.md:79`; commit `deba31d` log message ("external rollback
  between tool calls").
- **What happened**: W3's single agent (running 3 sequenced lanes) reported
  that its first attempt at Lane B was rolled back externally between tool
  calls; it reapplied surgically. Hypothesis (per J-pre-close.md L79):
  parallel W4 agents' on-disk writes intersected with W3's dock work.
- **Root cause**: J ran W3 and W4 IN THE SAME WAVE WINDOW with W4 Lane A,
  Lane B, Lane C and W3 all writing through the same orchestrator process,
  not under any isolation. The Agent tool exposes `isolation: "worktree"`
  per its schema but no J dispatch used it. Multiple agents writing the
  shared filesystem in interleaved fashion can stomp each other if any
  agent does a no-op overwrite of a file the other just edited.
- **Preventable at dispatch level**: YES — `Agent isolation: "worktree"`
  on every parallel dispatch in W3+W4 would have prevented the
  cross-agent file collision entirely, because each agent would write
  to its own worktree clone and the orchestrator would merge.
- **Preventable at precept level**: YES — ORCHESTRATION.md ## Wave Model
  currently says "no overlapping write bounds inside a wave". It does
  not say "use worktree isolation for every parallel wave". The implicit
  rule that disjoint write bounds prevents collision is wrong: collision
  happens not when two agents both write the same file, but when one
  agent's file-system observation races against another's commit.
- **Recovery cost**: agent reapplied via Edit tool surgically — no
  data lost; but the agent had to redo work and the orchestrator could
  not verify how much was lost-then-found. Cost: ~1 unit of agent
  re-execution + a residual confidence cost (we don't actually know
  what got rolled back).

### §A.3 — W1 + W4.A `git stash` precept violations

- **Source**: `audit/W1-vocab-gamma-proof.md:288` (W1 incident);
  `audit/W4-A-configurator-primitive-proof.md:196-201` (W4.A incident);
  binding rule at `LESSONS-LEARNED.md:102-114` (2026-05-04 entry).
- **What happened**: TWO agents in J ran `git stash` despite the
  binding 2026-05-04 LESSONS-LEARNED rule. W4.A ran `git stash
  --keep-index --include-untracked` followed by `git stash pop` as a
  state-inspection probe; pop failed mid-application on `useMetaballs.ts`
  conflict; recovered via `git checkout stash@{0} -- <files>`. W1 agent
  briefly stashed to verify a pre-existing failure mode; recovered via
  Edit.
- **Root cause**: dispatch-template clause at AGENT_DISPATCH_TEMPLATE.md:46-49
  forbids stash AS RECOVERY; both agents framed their stash use as
  STATE INSPECTION, not recovery. The prompt language has a loophole.
- **Preventable at dispatch level**: YES — replace "as a recovery
  mechanism" with "for any reason" (or "log every git command before
  running it, await orchestrator confirmation for any non-read git
  command"). Pattern recurrence suggests the existing teeth aren't
  sharp enough — see J FINAL.md:102-105.
- **Preventable at precept level**: YES — the 2026-05-04 entry needs
  re-emphasis in K's submodule update with a binary "no `git stash`,
  for any reason, ever" formulation.
- **Recovery cost**: zero data loss (per W4.A proof §"Process incident");
  ~1 file overwritten by partial pop with content equal to its
  pre-stash on-disk state. But: the W4.A pop conflict on
  `useMetaballs.ts` revealed parallel-lane work intersected (compounds
  §A.2 evidence).

### §A.4 — W3 commit absorbing W4.A's PresetEditor rename adds (index pollution)

- **Source**: `git show --stat deba31d` (W3 commit) shows
  `demo/configurator/PresetEditor.vue` (+356), `PresetEditorField.vue`
  (+52), `usePresetEditor.ts` (+657) — these are W4.A Lane A's NEW
  files that landed BEFORE W4 closed. `git show --stat 499326a`
  (W4 commit) carries only the corresponding deletions of the
  originals + barrel updates + AppShell consumer. Net effect: both
  halves of the rename in HEAD; commit history splits the rename
  across two waves.
- **Root cause**: W4.A agent ran `git add` on its own files for a
  staging probe (no precept forbids it); the orchestrator's W3-close
  `git add <W3-paths>` operation found those W4.A files already
  staged in the index. The orchestrator's commit thus absorbed them.
  W3 was an unwitting passenger of W4.A's premature staging.
- **Preventable at dispatch level**: YES — the dispatch template
  should forbid `git add` outright (not just "don't commit"). Currently
  it forbids commit but is silent on add. Agents should write to disk
  only; the orchestrator owns 100% of staging. AGENT_DISPATCH_TEMPLATE.md
  should say: "DO NOT run `git add`, `git stash`, `git commit`, or
  any other index-mutating command. Write to disk; report via Return.
  Only the orchestrator stages."
- **Preventable at precept level**: YES — ORCHESTRATION.md ##
  Integration owns commit discipline; it should explicitly call out
  agent-staging as forbidden.
- **Recovery cost**: cosmetic only (commit history is split, but HEAD
  is correct). No artefact regression. Future `git log --follow` on
  the renamed files traces back to W3, not W4 — minor archaeology cost.

### §A.5 — Shell working-directory drift

- **Source**: `J-audit-α-plan-vs-actual.md:163,189` cite
  `cd docs/precepts && git log` invocations; the user-prompt context
  notes the shell drifted into `docs/precepts/` after a Lane II
  `cd docs/precepts && git ...` invocation; manual `cd /Users/mkbabb/
  Programming/glass-ui` recovery required.
- **Root cause**: `cd <dir> && git <cmd>` mutates the shell's
  working directory if the next command runs in the same shell (this
  is sometimes the case for the harness; agent-tool shells reset between
  bash calls, but the orchestrator's main shell can persist). Recovery
  required manual `cd` back to repo root.
- **Preventable at dispatch level**: YES — substitute `git -C <dir>
  <command>` (or in this codebase: `git -C docs/precepts log`). The
  `-C` flag operates on the named directory without mutating the
  shell. This is the canonical idiom for submodule + nested-repo work.
- **Preventable at precept level**: YES — ORCHESTRATION.md should
  document `git -C` as the canonical idiom for any nested-git
  invocation (precept submodule, vendored speedtest, etc.).
- **Recovery cost**: ~30s manual recovery + risk that subsequent
  commands silently ran in wrong cwd before the operator noticed.

### §A.6 — Wave count vs git stash recurrence pattern

- **Source**: `LESSONS-LEARNED.md:102-114` (2026-05-04, glass-ui G W3
  Lane 4); J PROGRESS.md L57 (W1 incident); J PROGRESS.md L107-110
  (W4.A incident); FINAL.md L100-105.
- **What happened**: 3 stash incidents have now occurred in glass-ui's
  recent history (G + J×2). The 2026-05-04 lesson was supposed to bind;
  the J recurrence suggests the precept's teeth are insufficient.
- **Root cause**: dispatch templates inherit precepts but agents do not
  re-read LESSONS-LEARNED in full at dispatch — they read the dispatch
  prompt's bulleted non-negotiables. A subtle distinction in the
  bulleted rule ("as a recovery mechanism") opens a "but it's not
  recovery, just inspection" rationalization.
- **Preventable at dispatch level**: YES — make the rule binary in the
  dispatch template: "any `git stash` is a P0 violation, for any
  reason."
- **Recovery cost**: precept reinforcement candidate; user findings
  trace exposes the recurrence pattern.

---

## §B — Worktree-isolation evaluation

**Recommendation: HYBRID — adopt for every parallel wave with ≥ 2 agents
sharing potentially-overlapping read scope OR with a cornerstone-refactor
lane.**

### Per-J-wave evaluation

| Wave | Parallel? | Shared file potential? | Worktree-isolation verdict |
|---|---|---|---|
| W0 | Lane I + Lane II (different repos: glass-ui + docs/precepts submodule) | low — disjoint dir trees | NOT NEEDED (already submodule-isolated) |
| W1 | single agent | n/a | NOT NEEDED |
| W2 | Lane A + Lane B parallel | medium — both touched src/styles/ + cross-cut consumer files; SR-1 absorbed flagged 3 stale-token sites that crossed bounds | RECOMMENDED |
| W3 | nominally single agent on 3 sequenced lanes; but W4 lanes ran concurrently | HIGH — incident §A.2 + §A.4 both trace here | REQUIRED |
| W4 | Lane A + Lane B + Lane C parallel | HIGH — Lane A renamed configurator files while Lane B consumed the result; Lane C's metaballs file collided with stash pop | REQUIRED |
| W5 | Lane A→C sequenced; Lane B + Lane D parallel | medium — Lane C depended on Lane A's slider edits | RECOMMENDED for B+D; Lane A→C sequence is correct |
| W6 | Lane A; Lane B+C.1 combined; Lane C.2 — 3 concurrent | low — disjoint feature trees (badge / search / carousel) | OPTIONAL — worth it for cost amortization |
| W7 | 6 audit lanes (read-only) + orchestrator-direct W7 absorbs | n/a — read-only audits | NOT NEEDED for audits; absorbs run under orchestrator |

### Cost analysis

`git worktree add` clones the .git index but shares object storage; for
this repo (vue3 + tailwindcss-v4 + reka-ui), the cold clone cost is
mostly `node_modules` + `dist` reconstruction. Empirically:

- `git worktree add` itself: ~1-3s on this repo size (no `node_modules`
  copy — worktree only owns its own working tree).
- Per-agent `npm install`: each agent worktree needs node_modules to
  run typecheck/build/test gates. **This is the real cost** — ~30-60s
  per worktree on cold install, or near-zero with pnpm-store-style
  hardlinks.
- Cleanup: `git worktree remove` is ~1s.

For a 3-agent parallel wave: 3 × (~3s + ~45s install + ~1s remove) ≈ 2.5 min
of overhead, vs hours of recovery cost when interleaved writes corrupt
state (per §A.2 + §A.4 evidence).

**Net verdict**: worth it for waves with ≥ 2 cornerstone-modifying
agents OR ≥ 3 parallel agents with any shared-file potential.

### Orchestrator merge model

Each agent works in `<repo>/.worktrees/<wave>-<lane>/`. At wave close:

1. Each agent commits its diff in its own worktree (or hands the
   orchestrator the diff via `git format-patch`).
2. Orchestrator reviews each diff for bounds compliance.
3. Orchestrator cherry-picks (or `am`s patches) onto master in the
   main worktree, in lane-order or alphabetical-lane-id order.
4. Orchestrator runs the wave's hard gate against the merged master.
5. Orchestrator commits `feat(tranche-X/wN): ...` over the merged
   tip; per-lane commits land under the wave commit if `git merge
   --squash` is used, or as a chain if individual lane commits are
   preserved.
6. Orchestrator removes worktrees.

This shape preserves "orchestrator commits at wave close" (per
LESSONS-LEARNED 2026-05-04) without losing per-lane attribution.

### Hybrid policy (recommended for K)

- **REQUIRED**: any wave with ≥ 2 parallel agents AND any of: shared
  src/styles/* writes, cornerstone-refactor lane, dock or aurora or
  configurator territory.
- **RECOMMENDED**: any wave with ≥ 3 parallel agents.
- **OPTIONAL**: 2-agent waves with strictly disjoint file trees
  (e.g., demo/stories/data/ vs src/components/custom/badge/).
- **NEVER**: single-agent waves; read-only audit waves; submodule-only
  waves (precept submodule has its own isolation).

---

## §C — Parallel-dispatch sequencing alternatives

For lanes with truly shared files (e.g., W3 lanes A/B/C all sharing
src/styles/dock.css), three sequencing models:

| Model | When | Cost | Risk |
|---|---|---|---|
| Strict sequence (Lane A → Lane B → Lane C, 1 agent or N agents) | shared substrate (src/styles/dock.css in W3); incremental gate per lane | wall-clock = sum of lanes; agent context can run dry mid-sequence | low race risk; single agent loses parallelism |
| Worktree per lane + orchestrator merge | shared substrate but lanes don't depend on each other's intermediate state (e.g., Lane B's HoverPopover ext doesn't need Lane A's collapse fix to land first) | wall-clock = max of lanes + merge cost; merge conflicts possible if both agents touch same line | medium (merge conflict resolution by orchestrator) |
| File-line whitelist in dispatch | when shared files have surgically distinct edit zones (e.g., Lane B owns dock.css:200-260, Lane C owns dock.css:280-340) | low overhead | high — agents drift outside their lines under contact |

**Recommendation for K**: prefer worktree-per-lane (model 2) for any
multi-lane wave with shared-file potential. Strict sequence (model 1)
only when an explicit dependency chain forces it (e.g., W5 Lane A→C
where Lane C consumes Lane A's `data-held` API).

J's W3 chose model 1 (single-agent sequence) and worked. J's W4
chose model 3 implicitly (Lane A+B+C concurrent on disjoint
declared bounds) and incurred §A.2 + §A.4 incidents because the
"disjoint bounds" rule didn't hold under contact (Lane B consumed
Lane A's primitive mid-flight; Lane A's renames intersected
with the index for everyone).

---

## §D — Index pollution + agent-staging discipline

The W3-absorbing-W4.A-renames incident (§A.4) traces directly to
agents running `git add`. The dispatch template at
`AGENT_DISPATCH_TEMPLATE.md:46-49` forbids destructive git as
recovery; it does not forbid `git add` or `git stash` for
staging/inspection.

**Recommendation**: extend the dispatch template's non-negotiables:

> Agents MUST NOT run `git add`, `git stash`, `git stash pop`,
> `git commit`, `git restore`, `git checkout`, `git reset`, or any
> other index-mutating command. Write to disk via Edit/Write; report
> file paths in your Return. Only the orchestrator stages. If you
> need to inspect git state, run `git status --porcelain` (read-only)
> or `git diff` (read-only) — those are the only git commands an
> agent should run.

This sharpens both §A.3 (stash) and §A.4 (add). The orchestrator's
`git add <pathspec>` then operates on a clean index (no agent-staged
ghosts to absorb).

---

## §E — Shell working-directory discipline

The `cd <dir> && git <cmd>` pattern (incident §A.5) is fragile
because Bash working directory persists across subsequent calls in
the orchestrator's main shell. The canonical fix:

> Use `git -C <dir> <command>` for any nested-git operation.
> NEVER prefix git commands with `cd <dir> &&`.

Examples:
- `git -C docs/precepts log --oneline -5` (NOT `cd docs/precepts &&
  git log --oneline -5`).
- `git -C ../speedtest status` (cross-repo state probe).
- `git -C docs/precepts add SPEC.md` (precept submodule staging).

This makes pwd-state hygiene the default; the shell never drifts.
The agent tool's bash already resets cwd between calls, so this
matters most for the orchestrator's persistent shell.

**Recommendation**: ORCHESTRATION.md ## Integration adds:

> When operating on submodules or nested git trees, use `git -C
> <dir>`. Never `cd <dir> && git <cmd>` from the orchestrator's
> main shell — pwd drift compounds across subsequent commands.

---

## §F — Other friction (watchdogs, context limits, prompt misreads)

Per J PROGRESS.md + audit docs:

- **No watchdog stalls in J**. The 2026-05-04 G watchdog stalls
  (LESSONS-LEARNED entry) prompted the "typecheck after each major
  file group" rule which is now in AGENT_DISPATCH_TEMPLATE.md:50-52.
  J's W1+W4.A proofs cite incremental typecheck runs (W1 §G(b);
  W4.A §"Verification (post-Step 0)").
- **Context limits**: not directly cited as a J incident; the W3
  single-agent 3-lane sequence completed fine. But: 3 sequenced
  lanes in one agent context is near the upper bound; W4 chose 3
  parallel agents partly to avoid this.
- **Prompt misreads**: zero direct cites. W0 §F amendments were
  surfaced by W0 reconciliation (an audit lane), not by individual
  agents misreading their prompts.
- **Triumvirate recovery**: not used in J. The W0 reconciliation
  played the "research" role of triumvirate scope-reveal handling
  by absorbing the v0.8.0 token-cleanup miss into W2 in advance.
- **Scope reveals**: 3 cited (W4.C "blob → metaballs" rename pre-J;
  W5.A "no sliderVariants CVA at HEAD"; W5.D "chassis pattern count
  = 0 at HEAD"). All absorbed via W0 §F amendments. Healthy.

The fault-domain pattern in J is exclusively orchestration-
process: branch consolidation + parallel-write race + agent git
discipline. Implementation-tier dispatch worked.

---

## §G — K dispatch-template + ORCHESTRATION precept update recommendations

Concrete additions for K W0 Lane II's submodule update.

### G.1 — AGENT_DISPATCH_TEMPLATE.md additions

Replace the current bullet "never run `git stash`..." with a hardened
clause:

> Agents MUST NOT run `git stash`, `git stash pop`, `git checkout`,
> `git reset`, `git restore`, `git add`, `git commit`, or any other
> index-mutating or state-rewinding git command — for any reason,
> including state inspection. Write to disk via Edit/Write and report
> file paths in your Return. The orchestrator owns 100% of the index
> and 100% of commits. Read-only git commands (`git status
> --porcelain`, `git diff`, `git log`) are permitted.
>
> If a build fails, revert your own edits via Edit/Write surgically.
> If you find yourself reaching for any index-mutating git command,
> halt and report.

### G.2 — ORCHESTRATION.md ## Wave Model addition

Add a new clause:

> Parallel waves with shared-file potential (any wave with ≥ 2
> agents and any of: shared `src/styles/*` writes, cornerstone-
> refactor lane, dock/aurora/configurator/blob/metaballs territory,
> or a renamed-file lane) MUST use Agent-tool worktree isolation
> (`isolation: "worktree"`). The orchestrator merges per-lane diffs
> at wave close via cherry-pick or patch-apply, then commits
> `feat(tranche-X/wN): summary` over the merged tip.
>
> Single-agent waves and read-only audit waves do not require
> worktree isolation.

### G.3 — ORCHESTRATION.md ## Integration addition

Add:

> Use `git -C <dir> <command>` for any nested-git operation
> (submodules, vendored repos). NEVER `cd <dir> && git ...` from
> the orchestrator's main shell — pwd drift compounds across
> subsequent commands.
>
> The orchestrator stages with explicit pathspec: `git add <paths>`,
> never `git add -A` or `git add .`. Agents do not stage; if the
> index has unexpected staged content at wave close, halt and
> investigate before committing.

### G.4 — tranche/SPEC.md ## Plan Shape gate

Add a new plan-open gate:

> Before opening a tranche, verify the planning branch matches the
> integration target (master). Run `git fetch && git log --oneline
> master..HEAD && git log --oneline HEAD..master`. Any divergence
> between planning and integration substrate triggers a
> reconciliation wave (W0 lane I) before any implementation wave
> dispatches.

### G.5 — LESSONS-LEARNED.md three new entries (2026-05-06)

Three new entries for K W0 Lane II to commit to the precept submodule:

> **2026-05-06 — Worktree Isolation For Multi-Agent Shared-File Waves**
>
> **Source**: glass-ui J W3 Lane B "external rollback between tool
> calls" + J W4.A stash pop conflict on parallel-lane file.
>
> **Failure**: parallel agents writing through the same filesystem
> can stomp each other's writes between tool calls; the symptom
> reads as "external rollback" or "stash pop merge conflict on a
> file I didn't edit".
>
> **Rule**: parallel waves with shared-file potential MUST use Agent
> `isolation: "worktree"`. The orchestrator merges per-lane diffs at
> wave close.
>
> **Check**: dispatch records cite per-lane worktree paths;
> orchestrator's wave-close commit is preceded by per-lane
> cherry-pick or `git am` operations.

> **2026-05-06 — Agents Never Stage Or Commit**
>
> **Source**: glass-ui J W3 commit absorbing W4.A's PresetEditor
> rename adds (commit history split across two waves).
>
> **Failure**: agents that run `git add` poison the orchestrator's
> staging area; the orchestrator's wave-close `git add` finds
> already-staged content from another lane and commits it under
> the wrong wave.
>
> **Rule**: agents MUST NOT run any index-mutating git command.
> Read-only git is permitted (`git status --porcelain`, `git diff`,
> `git log`).
>
> **Check**: dispatch template's non-negotiables list `git add` /
> `git stash` / `git commit` / `git checkout` / `git reset` /
> `git restore` as forbidden.

> **2026-05-06 — Use `git -C` Not `cd && git`**
>
> **Source**: glass-ui J orchestrator's main shell drifted into
> `docs/precepts/` after a `cd docs/precepts && git ...` invocation.
>
> **Failure**: `cd <dir> && git <cmd>` mutates the orchestrator's
> shell pwd; subsequent commands silently run in the wrong
> directory.
>
> **Rule**: use `git -C <dir> <command>` for any nested-git
> operation. Never `cd <dir> && git ...` from a persistent shell.
>
> **Check**: orchestrator transcripts grep `cd .* && git` returns
> zero hits (or only justified single-shot invocations that
> immediately return to repo root).

---

## §H — Recommended K W0 Lane II scope (precept submodule update)

K's W0 Lane II should advance the precept submodule with the
following commits (single submodule commit batching all five
groups, or separate commits if the orchestrator prefers
per-rule traceability):

1. **AGENT_DISPATCH_TEMPLATE.md** — replace the current "never run
   `git stash`..." clause with the hardened all-index-mutating-
   commands forbidden clause (per G.1).
2. **ORCHESTRATION.md ## Wave Model** — add the worktree-isolation
   clause for parallel multi-agent shared-file waves (per G.2).
3. **ORCHESTRATION.md ## Integration** — add the `git -C` idiom
   + explicit-pathspec staging clause + agent-staging-detection
   clause (per G.3).
4. **tranche/SPEC.md ## Plan Shape** — add the planning-branch ==
   integration-target gate (per G.4).
5. **LESSONS-LEARNED.md** — add the 3 new 2026-05-06 entries
   (per G.5).

**Submodule advance target**: from `6b8437a` (J close) to a new K
commit at `<TBD>`.

**Hard gate**: K W0 Lane II commits its submodule update before
W1 opens. K dispatch records show every K agent receiving a
prompt that cites the post-update non-negotiables.

K W1 onward operates under the strengthened precepts; the J
recurrence patterns (stash + index pollution + parallel-write
race) close cleanly.

---

## §I — Closing

J's 6-incident catalog is **all process tier** — implementation
landed correctly. The fault-domain pattern is:

- **dispatch-template loopholes** (4 of 6 incidents): "as recovery"
  → state inspection rationalization; silent on `git add`.
- **orchestration-precept gaps** (2 of 6): no planning-branch gate;
  no worktree-isolation default for parallel waves.
- **shell discipline** (1 of 6): `cd && git` vs `git -C`.

Recovery cost was bounded (no data lost in any incident) but the
total orchestrator overhead — branch consolidation + W0
reconciliation + 2 stash recoveries + 1 split commit + 1 cwd
drift — is the largest process-overhead surface J emitted. K's
W0 Lane II owns the submodule update that closes all six
incident classes.

The user's question — "Do worktrees not work with this volume?"
— inverts to its right answer: **worktrees were never tried**.
They should be the default for parallel waves in K.

---

## §J — Citations index

| Claim | Source |
|---|---|
| Branch consolidation + 18 conflicts | `docs/tranches/J/PROGRESS.md:15-19`; commit `5baceb5` |
| W3 external rollback hypothesis | `docs/tranches/J/PROGRESS.md:110-111`; `audit/J-pre-close.md:79`; commit `deba31d` log |
| W1 stash incident | `audit/W1-vocab-gamma-proof.md:288`; PROGRESS.md:57 |
| W4.A stash incident | `audit/W4-A-configurator-primitive-proof.md:196-201`; PROGRESS.md:107-110 |
| W3 commit absorbing W4.A renames | `git show --stat deba31d` (PresetEditor.vue +356 / PresetEditorField.vue +52 / usePresetEditor.ts +657); `git show --stat 499326a` (corresponding deletions) |
| Stash binding rule | `docs/precepts/instructions/LESSONS-LEARNED.md:102-114` |
| Dispatch template current language | `docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md:41-56` |
| Worktree-isolation tool option | Agent tool schema (per user task brief; `isolation: "worktree"`) |
| Wave-close commit rule | `docs/precepts/instructions/ORCHESTRATION.md:48-51` + LESSONS-LEARNED 2026-05-04 |
| Pattern recurrence flag | `docs/tranches/J/FINAL.md:100-105`; PROGRESS.md:223 |
| `git -C` recommendation | shell-discipline incident — orchestrator transcript |
| α audit P1 finding F-1 | `audit/J-audit-α-plan-vs-actual.md:201` |

---

**Path to this deliverable**: `docs/tranches/K/research/Rδ-dispatch-friction.md`.
