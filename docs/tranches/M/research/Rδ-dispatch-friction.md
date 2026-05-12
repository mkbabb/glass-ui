# M Pre-research Lane Rδ — dispatch friction + cross-repo coordination protocol

**Lane**: Rδ (4 of 6 parallel pre-research agents).
**Date**: 2026-05-12.
**Mode**: READ-ONLY. CREATE this artefact only.
**Repo scope**: glass-ui primary; speedtest + precept submodule cross-repo READ-ONLY.
**Precept basis at read-time**: glass-ui submodule pin `b51047d` (L.W0 Lane II — 5 lessons + 3 SPEC + 1 dispatch field + 1 ORCHESTRATION; not pushed pending REAUDIT-stream reconciliation per `coordination/speedtest-Y.md` §8).

This lane catalogues dispatch / coordination friction at L close, proposes precept-update artefacts for M, and produces a concrete reconciliation strategy for the 15-commit precept-submodule divergence. Companion lanes Rα/Rβ/Rγ/Rε/Rζ run in parallel; cross-lane recommendations are surfaced in §G.

---

## §A — L flight process recap

L flight covers `b1b9036..3e4d472` (open through W8 close — at read-time HEAD is the W8 close commit; FINAL.md + L-residuals.md + ι integrity-sweep all on disk). 13 wave commits plus the open commit; one precept-submodule commit deferred-push; one speedtest cross-repo commit at the W1 SCC-trap-closure cycle.

### §A.1 — Documented incidents (canonically catalogued in L FINAL §4 + L-pre-close.md §6 + L-audit-ι §7)

| # | Incident | Wave | Class | Source artefact | ι disposition |
|---|---|---|---|---|---|
| 1 | Precept-submodule push divergence — local 6 commits diverged 15 from origin/main REAUDIT-stream | W0 | DEFERRED-PUSH (process residual) | `coordination/speedtest-Y.md` §8 | route to M.W0 |
| 2 | W1 Lane B self-disclosed `git checkout` for state-probe | W1.B | self-corrective precept boundary crossing | `audit/W1-B-api-discovery-layer-proof.md` §"Precept violation disclosure" | minor PRECEPT-INCIDENT; route to LESSONS-LEARNED candidate at M |
| 3 | F-ε-3 Configurator recursion (Lighthouse-only) | W6/W7 | runtime residual, non-process | per W6 + W7 proofs | route to M for harness investigation |
| 4 | No W3 Lane B-style harness reverts recurred | n/a | precept HELD | K W3 Lane B incident did not recur | clean — K precept holds |
| 5 | Cross-repo speedtest sweep dispatched orchestrator-side under explicit cross-repo-dispatch scope | W1 close | authorized cross-repo commit | `coordination/speedtest-Y.md` §3 + ORCHESTRATION.md Cross-repo commit policy clause | clean |

### §A.2 — Undocumented friction (surfaced fresh by this lane)

Reading the W0 reconciliation ledger, W1 lane proof docs, and the L ι sweep against the L.md open-commit Wave Model, three additional friction surfaces emerged that did NOT receive a formal entry in L FINAL.md but bear on M dispatch planning:

**(a) Worktree-isolation actual-behaviour drift (silent compliance).** W0's new `worktree_diff_verification` precept field requires the orchestrator to run `git -C <worktree-path> diff --stat` at lane close. L FINAL §4 asserts "Worktree-diff verification (new W0 precept) held across all worktree-isolated lane dispatches: every W1 + W2 lane reported `git status --short` at lane close." But the W1.B proof doc evidences the agent ran `git status` from inside the worktree (so its report-tree showed `M package.json`, etc.) — and the orchestrator integrated by reading the worktree's final state. The verification was THERE in the workflow but is not separately stamped in a "worktree-diff-verification ledger" artefact. The precept was honoured by audit, not by a structured ledger entry. Improvement: M.W0 dispatch templates should require a one-line ledger entry per worktree lane ("Lane X: worktree path Y, diff-stat agreed with claimed edits at <hash>") so the verification is GREP-able post-flight.

**(b) Agent prompt clarity around side-effect scripts.** W1 Lane B's `git checkout` was triggered by `npm run proof:package` rewriting `docs/tranches/F/audit/W1-package-proof.json` in place — an out-of-Lane-B-bounds file. The dispatch prompt did not warn the agent that `npm run proof:package` mutates this file. The agent reached for `git checkout` as the natural remediation. Lower-friction alternatives existed (use `--dry-run` flag if the script supports it; or simply leave the file dirty and report; or use `Edit` to restore the prior contents from a known-good HEAD inspection via `git show HEAD:<path>`) but were not surfaced in the prompt. This is **agent-prompt-ambiguity friction**, not agent failure.

**(c) Cross-repo dispatch boundary: Y orchestrator (also user) vs L orchestrator coordination.** The coordination doc §3 specifies writer-vs-reader bounds and §2 names Y.A3 as "reader-only + recommender-only" for glass-ui source. In practice during L flight, Y orchestrator (= user) committed 8 doc-only Y-tranche cherry-picks at speedtest while L flight was active. This is OUT-OF-SCOPE for L per coordination §5 (Y owns Y's own orchestration), and the speedtest reflog scan (L ι §6.B) classified them CLEAN. However, the same human acting as both Y and L orchestrator means the coordination doc's "two human orchestrators arbitrate" clause (§4 step 2) is a no-op. M-tranche should formalize the single-human-multi-orchestrator pattern — currently the precept's mental model implies two human stakeholders.

### §A.3 — L dispatch model recap

L peak-parallelism: 6 agents (W1 → batch with W2/W3/W4/W6 in parallel sub-waves). W1 dispatched 3 worktree-isolated lanes (Lane A root barrel curation; Lane B src/api/; Lane C subpath flatten). W2 dispatched 2 worktree-isolated lanes. W3 dispatched 2 lanes. W4/W6 dispatched single-lane direct orchestrator-side. W8 dispatched 7 parallel read-only audit lanes (α/β/γ/δ/ε/π/ι — strengthened pattern under K precept). All within precept ceiling of 10 (current local pin) but ABOVE the origin/main REAUDIT-stream ceiling of 6 (per `11a1b4c` 2026-04-30).

This is the **canonical disposition conflict** the M.W0 reconciliation must resolve. The 7-agent strengthened audit pattern (J → K → L; 3 tranches now) exceeds the REAUDIT 6-agent ceiling. See §F for proposed resolution.

---

## §B — Cross-repo coordination protocol — extension to constellation

L W0 introduced the `coordination/<peer-letter>.md` artefact class for ONE peer tranche (speedtest Y). M is the first tranche with potential MULTI-peer parallel tranches — the constellation includes glass-ui, speedtest, keyframes.js, value.js, fourier-analysis, fourier-animate, words, mkb-utils, vite-plugin-shebang, precepts, mathanim, bbnf-lang. At L close, speedtest Y is in-flight; speedtest Y.W3 is a CONDITIONAL cross-repo carve into keyframes.js; bbnf-lang has its own tranche history (AZ-I/II/III); precepts is a submodule with its own divergent stream. Per-peer coordination docs do not scale.

### §B.1 — Proposed constellation manifest (NEW artefact class)

Replace OR supplement the per-peer `coordination/<peer-letter>.md` with a canonical `docs/tranches/<LETTER>/coordination/CONSTELLATION.md` listing every repo in the constellation + its tranche state. Per-peer docs remain for cases where deep cross-repo writer-vs-reader contract is non-trivial; the constellation manifest is the lightweight default + escalation registry.

Proposed shape:

```markdown
# {LETTER} × Constellation Manifest

**Authored**: YYYY-MM-DD ({LETTER}.W0 — orchestrator).
**Precept basis**: `tranche/SPEC.md` §"Document Set" — constellation manifest clause landed at {LETTER}.W0.

## Repos in constellation

| Repo | HEAD at coord-time | In-flight tranche? | Letter | Shared touchpoints | Coordination doc? |
|---|---|---|---|---|---|
| glass-ui | <sha> | yes ({LETTER}) | {LETTER} | — | self |
| speedtest | <sha> | yes/no | <letter or n/a> | <surfaces> | `coordination/speedtest-<letter>.md` if non-trivial |
| keyframes.js | <sha> | no | — | <surfaces> | manifest-row only |
| value.js | <sha> | no | — | <surfaces> | manifest-row only |
| precepts (submodule) | <sha> | divergence state | — | LESSONS-LEARNED + SPEC + ORCHESTRATION + AGENT_DISPATCH_TEMPLATE | manifest-row + reconciliation note |
| ... | ... | ... | ... | ... | ... |

## Activity classification per repo

- WRITER — primary repo for this tranche; orchestrator commits + pushes here.
- READ-ONLY — peer repo; orchestrator may read, may NOT commit, may NOT push.
- AUTHORIZED-WRITE — peer repo where the user has explicitly authorized cross-repo writes for this tranche (e.g., a multi-repo refactor).
- ADDITIVE-ANNOTATION — peer repo where the orchestrator may commit additive disposition notes only (per ORCHESTRATION Cross-repo commit policy ADDITIVE mode).
- DEFERRED-PUSH — peer repo where commits land locally but push waits on reconciliation (e.g., precepts submodule at L close).

## Per-peer escalation registry

When a peer warrants a full `coordination/<peer-letter>.md` artefact, the manifest links it. Threshold: any peer where ≥ 1 of (a) the peer has an in-flight tranche, (b) the shared touchpoints include ≥ 2 surfaces, (c) the peer is a submodule with divergent history requires the full per-peer doc. Otherwise the manifest row suffices.
```

The constellation manifest is **cheap and uniform**: a single read-time scan of `git -C <each-repo> log --oneline -1` + `git -C <each-repo> status --porcelain` produces the data. The orchestrator emits the manifest at tranche open and refreshes at each wave boundary. The per-peer doc is reserved for cases of substantive coordination.

### §B.2 — Cross-repo commit policy extensions

ORCHESTRATION.md Cross-repo commit policy (L.W0 Lane II clause) enumerates ADDITIVE-annotation + AUTHORITY-TRANSFER modes. M should extend with:

- **DEFERRED-PUSH mode** — local commit lands; push waits on user-arbitrated reconciliation. Used when the peer's origin has diverged in a way that auto-rebase/merge is unsafe (force-push forbidden; semantic conflict possible). Documented in the originating FINAL.md cross-tranche-debt section AND in the constellation manifest as state `DEFERRED-PUSH`. The receiving tranche of the deferred commit may open M.W0 for reconciliation.

- **MULTI-WRITER mode (NEW)** — when ≥ 2 in-flight tranches across ≥ 2 repos plan to write the SAME surface (e.g., glass-ui v1.0 reka-ui trim + speedtest Y backend split that touches `Carousel*` from a different angle). The shared surface is named; the writer-of-record per file is named; the merging tranche (the one that closes second) absorbs the other's diff as a CHANGELOG note + visual-runtime probe across the join.

- **CONSTELLATION-SCAN mode (NEW)** — orchestrator-side read-only sweep across ≥ 3 peer repos (e.g., dead-code carve, library-version pin bump, shared-utility extraction). The dispatch prompt names the read-only scope; agents return per-repo grep results; orchestrator integrates only in the writer repo. Used for substrate-archaeology investigations.

### §B.3 — Precept-submodule reconciliation procedure (formalize the deferred-push pattern)

When force-push is forbidden on shared infra AND rebase has conflicts, the protocol is:

1. **Read both streams in full** (per the user's "analyze in full" memory). Don't plan from titles — read each commit body. Identify which clauses are semantically novel vs. which are stylistic.
2. **Classify clauses pairwise** — for each clause where streams disagree, mark NOVELLA-LOCAL (only local has it), NOVELLA-REMOTE (only remote has it), CONFLICT (both modify the same clause), or COMPLEMENTARY (both modify but composable).
3. **Sequence**: NOVELLA-REMOTE clauses cherry-pick onto local; NOVELLA-LOCAL clauses are already present; COMPLEMENTARY clauses cherry-pick with manual merge of the modified region; CONFLICT clauses route to user arbitration with a side-by-side diff.
4. **Verify clause-survival** — for each clause in both streams, the post-reconcile state must include it OR have a documented retirement rationale.
5. **Linearize OR merge** — preferred linearization: cherry-pick the local 6 tranche-stream commits onto an origin/main base (rewrites local SHAs but the local pin is not yet pushed, so no downstream impact). Alternative: 3-way merge with manual conflict resolution (preserves history but produces a merge commit).
6. **Coordinate with speedtest submodule** — speedtest's own precept-submodule pin may differ. The reconciliation must update BOTH parent repos' submodule pins in a single user-arbitrated batch (or speedtest accepts the new pin asynchronously).
7. **Push** — only after user-arbitration of any CONFLICT clauses AND verification of clause-survival.

Concretely for the 15-commit / 6-commit divergence, §F walks the actual content.

---

## §C — Precept-clause gap audit

This section walks the current state of `docs/precepts/instructions/{LESSONS-LEARNED.md, ORCHESTRATION.md, tranche/SPEC.md, tranche/AGENT_DISPATCH_TEMPLATE.md}` at submodule pin `b51047d`. For each L-flight incident NOT yet codified, propose precept extensions.

### §C.1 — `git checkout` not in explicit forbidden subset

The Hardened agent git clause in AGENT_DISPATCH_TEMPLATE.md `## Hardened agent git clause` enumerates the forbidden subset:

```
- `git add` / `git commit` / `git stash` / `git stash pop`
- `git checkout HEAD --` / `git checkout <branch>` / `git restore`
- `git reset` (any flag) / `git rm` / `git mv`
- `git rebase` / `git merge` / `git pull` / `git fetch` with mutation
- `git branch -D` / `git tag -d` / `git push`
```

`git checkout HEAD --` and `git checkout <branch>` ARE listed; however the W1 Lane B incident was `git checkout -- <path>` (path-mode, NOT branch-mode, NOT explicit HEAD), which is the syntactic form `git checkout <path>`. The literal regex match against the enumerated subset MAY NOT catch this for an agent reading defensively (the agent could read "git checkout HEAD --" as specifically requiring the HEAD ref, missing that plain `git checkout -- <path>` is equivalent). The W1.B agent self-disclosed because the K W8 LESSONS-LEARNED entry "Worktree Isolation Requires Relative Paths" mentions `git checkout` in passing, but the AGENT_DISPATCH_TEMPLATE.md enumeration is technically narrow.

**Gap**: explicit-forbidden subset does not include the bare `git checkout -- <path>` form.

**Severity**: P1 (the agent self-disclosed, no data lost; but precept ambiguity means future agents could navigate the same gap differently).

### §C.2 — Cross-repo agent dispatch authorization

ORCHESTRATION.md Cross-repo commit policy (L.W0 Lane II clause) binds ORCHESTRATOR cross-repo commits but does NOT explicitly bind AGENT cross-repo behaviour. The AGENT_DISPATCH_TEMPLATE.md Hardened agent git clause says "Read-only git permitted" but does not say which REPO. An agent dispatched into a worktree at `agent-<hash>/` (a peer repo's worktree) inherits the read-only clause but is the disposition matrix clear?

**Gap**: dispatch authorization matrix for cross-repo agent dispatches is implicit.

**Severity**: P1 (no L incident; but as the constellation expands, the gap becomes load-bearing).

### §C.3 — Worktree-isolation enforcement verification

The new W0 `worktree_diff_verification` field is excellent in principle; in practice the L flight evidence shows it was honoured by audit (W1.B + W2 lanes reported `git status --short` at close; orchestrator inspected the worktree state before integrating) but no structured ledger entry exists per lane. The verification IS auditable post-hoc (the ι lane walked the reflog cleanly), but a structured per-lane ledger would tighten the precept.

**Gap**: no structured ledger entry for the worktree-diff-verification step.

**Severity**: P2 (the audit-based verification worked; structured ledger is hardening).

### §C.4 — Single-human-multi-orchestrator pattern

The coordination doc model assumes a two-human stakeholder model (L orchestrator vs Y orchestrator). In reality the user is both. The §4 conflict resolution clause "L orchestrator and Y orchestrator (currently the same human via this conversation) reconcile" annotates the convergence but doesn't formalize it.

**Gap**: precept silence on single-human-multi-orchestrator pattern; the conflict-resolution clause is ambiguous when both orchestrators are the same human.

**Severity**: P2 (process-friction; no L incident).

### §C.5 — Side-effect scripts in agent dispatch prompts

W1 Lane B's `git checkout` was triggered by `npm run proof:package` rewriting an out-of-bounds file. The dispatch prompt did not warn the agent. The agent had no surfaced alternative to `git checkout`.

**Gap**: dispatch prompts do not enumerate side-effect scripts that may dirty out-of-bounds files.

**Severity**: P1 (root cause of W1.B `git checkout` incident).

### §C.6 — 6-agent vs 7-agent ceiling conflict

REAUDIT-stream's `11a1b4c` (origin/main 2026-04-30) tightens the parallel-agent ceiling to 6. Local tranche-stream's 7-agent strengthened audit pattern (J → K → L; α/β/γ/δ/ε/π/ι at W8) is 7 agents in parallel — exceeds the REAUDIT ceiling.

**Gap**: parallel-agent ceiling conflict between REAUDIT and tranche stream.

**Severity**: P0 (blocks precept-submodule reconciliation; load-bearing for every future close).

---

## §D — Dispatch model for M's hypothesized HEADLINE

This section is conditional on Rα/Rβ/Rγ inputs (read when ready) and per the task brief proposes a dispatch model for M's HEADLINE wave under three hypothesized HEADLINE shapes.

### §D.1 — If HEADLINE is constellation refactor (utilities carve-out)

If M.HEADLINE absorbs a shared-utility carve-out across the constellation (e.g., `cn()` deduplicator into a separate `@mkbabb/utils` package; OR keyframes.js dependency uplift via Y.W3 cross-repo carve), the dispatch model should be **per-repo lanes** rather than per-utility lanes:

- **Lane A (writer)** — primary repo where the carved-out package lives.
- **Lane B+ (consumers)** — one lane per consumer repo updating its dependency.
- **Lane Z (verification)** — orchestrator-side cross-repo build sweep verifies all consumers resolve the carved package.

Worktree-isolation: REQUIRED for Lane A; OPTIONAL for consumer lanes if their file bounds are disjoint. Constellation manifest declares each repo's role (WRITER / READ-ONLY / AUTHORIZED-WRITE).

### §D.2 — If HEADLINE is precept-submodule reconciliation

If M.HEADLINE is the precept-submodule REAUDIT-stream reconciliation, **this must be orchestrator-side** — no agent should rebase shared infra. The dispatch model is:

- **Step 1** (orchestrator solo) — read both streams in full per §B.3.1.
- **Step 2** (orchestrator solo) — emit a classification ledger per §B.3.2.
- **Step 3** (dispatch — research-only, read-only lanes) — 2 agents in parallel: Lane R-A reads REAUDIT 9 entries + classifies; Lane R-B reads tranche-stream 6 entries + classifies. Cross-check.
- **Step 4** (orchestrator solo) — user-arbitrate CONFLICT clauses.
- **Step 5** (orchestrator solo) — execute cherry-picks or merge; verify clause-survival.
- **Step 6** (orchestrator solo) — push.

Agents NEVER touch the submodule's index, branch, or push.

### §D.3 — If HEADLINE is consumer-repo standardization

If M.HEADLINE is consumer-repo standardization (e.g., bind every active glass-ui consumer to v1.0 + propagate a shared linting + check-set across the constellation), the dispatch model is:

- **Per-consumer lanes** in parallel (worktree-isolated per consumer repo).
- Constellation manifest declares each consumer's tranche state at M open.
- Each lane updates one consumer's pin + adds the canonical lint config + verifies the consumer's tests pass.
- Orchestrator integrates by walking each worktree's diff (cross-repo `worktree_diff_verification`).

Worktree-isolation: REQUIRED (≥ 2 parallel agents across distinct repos).

---

## §E — Precept-update proposals (specific)

Each proposal carries: source incident, proposed clause verbatim, landing target (file + section), severity.

### P1 — Add `git checkout` (bare path-mode) to explicit forbidden subset

**Source**: §C.1; L W1 Lane B self-disclosed `git checkout -- docs/tranches/F/audit/W1-package-proof.json`.

**Proposed clause (LESSONS-LEARNED entry verbatim)**:

```markdown
## 2026-05-12 - `git checkout <path>` Forbidden Even For Self-Correction

- **Source**: glass-ui tranche L W1 Lane B (self-reported in `audit/W1-B-api-discovery-layer-proof.md`). Surfaced by L ι sweep + M Rδ precept-clause gap audit.
- **Failure**: agent ran `git checkout -- <out-of-bounds-path>` once to revert a script side-effect (`npm run proof:package` rewrites a status JSON in place). The AGENT_DISPATCH_TEMPLATE.md forbidden subset enumerated `git checkout HEAD --` and `git checkout <branch>` but a defensive-reading agent could parse the bare `git checkout -- <path>` form as outside the literal enumeration. Self-corrective intent was honourable; precept boundary was technically crossed.
- **Rule**: ALL forms of `git checkout` are forbidden for agents, including the bare path-mode `git checkout -- <path>`. The forbidden subset enumeration is illustrative, not exhaustive — ALL working-tree-mutating subcommands are forbidden in any syntactic form. To revert a script-emitted out-of-bounds file, agents use `git show HEAD:<path>` to read the prior contents and re-emit via `Edit` — or report the dirty out-of-bounds file in their Return without remediation, letting the orchestrator decide.
- **Check**: AGENT_DISPATCH_TEMPLATE.md `## Hardened agent git clause` adds `git checkout <path>` to the explicit subset AND adds a "non-exhaustive enumeration" disclaimer. Dispatch prompts that invoke side-effect scripts (e.g., `npm run proof:package` rewrites a status JSON) explicitly warn the agent.
```

**Landing**: `docs/precepts/instructions/LESSONS-LEARNED.md` (append at chronological end); `docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md` `## Hardened agent git clause` forbidden subset enumeration extended.

**Severity**: P1.

### P2 — Constellation manifest artefact class

**Source**: §B.1; multi-peer parallel-tranche surface emerging at M.

**Proposed clause (SPEC.md Conditional list addition)**:

```markdown
- `coordination/CONSTELLATION.md` - required when the tranche operates against ≥ 3 peer repos in the constellation OR when ≥ 2 peer repos have in-flight tranches concurrently with this tranche. The manifest lists every constellation repo + its HEAD-at-coord-time + its in-flight tranche state + shared touchpoints + activity classification (WRITER / READ-ONLY / AUTHORIZED-WRITE / ADDITIVE-ANNOTATION / DEFERRED-PUSH). Per-peer `coordination/<peer-letter>.md` artefacts remain for cases of substantive writer-vs-reader contract; the constellation manifest is the lightweight default.
```

**Landing**: `docs/precepts/instructions/tranche/SPEC.md` `## Document Set` Conditional list.

**Severity**: P1.

### P3 — Cross-repo commit policy extensions (DEFERRED-PUSH, MULTI-WRITER, CONSTELLATION-SCAN modes)

**Source**: §B.2; L precept-submodule deferred-push pattern.

**Proposed clause (ORCHESTRATION.md Cross-repo commit policy extension)**:

```markdown
Cross-repo commits are permitted in five modes (the L.W0 ADDITIVE + AUTHORITY-TRANSFER plus three M.W0 extensions):

- ADDITIVE annotation: as previously defined.
- AUTHORITY-TRANSFER: as previously defined.
- DEFERRED-PUSH: local commit lands; push waits on user-arbitrated reconciliation. Used when the peer's origin has diverged in a way that auto-rebase/merge is unsafe (force-push forbidden; semantic conflict possible). The originating FINAL.md cross-tranche-debt section AND the constellation manifest mark the peer as `DEFERRED-PUSH`. The receiving tranche of the deferred commit opens a W0 reconciliation lane to push.
- MULTI-WRITER: ≥ 2 in-flight tranches across ≥ 2 repos plan to write the SAME surface. The shared surface is named in BOTH tranches' coordination docs; the writer-of-record per file is named; the second-closing tranche absorbs the first's diff as a CHANGELOG note + visual-runtime probe across the join.
- CONSTELLATION-SCAN: orchestrator-side read-only sweep across ≥ 3 peer repos (dead-code carve, library-version pin bump, shared-utility extraction). The dispatch prompt names the read-only scope; agents return per-repo grep results; orchestrator integrates only in the writer repo.
```

**Landing**: `docs/precepts/instructions/ORCHESTRATION.md` `### Cross-repo commit policy`.

**Severity**: P1.

### P4 — Worktree-diff-verification structured ledger

**Source**: §C.3; L FINAL §4 + L ι §1 verified by audit but no per-lane ledger.

**Proposed clause (AGENT_DISPATCH_TEMPLATE.md `## Worktree diff verification` extension)**:

```markdown
At wave close, the orchestrator runs `git -C <worktree-path> diff --stat` to verify the worktree's final state matches the agent's claimed edits BEFORE integrating to main. The verification is RECORDED in a structured ledger entry per worktree lane in the wave's audit folder OR in PROGRESS.md, of the form:

  | Lane | Worktree path | diff-stat ✓ | Integrated at SHA |
  |---|---|---|---|
  | A   | agent-XXX    | yes        | <orchestrator-commit-sha> |

Any divergence between the agent Return and the worktree diff is a HALT. The ledger is GREP-able post-flight (ι sweep walks it for any "no" or missing entries; missing entries are P0 unless explicitly waived in the wave-spec).
```

**Landing**: `docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md` `### Worktree diff verification` extended.

**Severity**: P2.

### P5 — Side-effect-script disclosure in dispatch prompts

**Source**: §C.5; W1.B incident root cause.

**Proposed clause (AGENT_DISPATCH_TEMPLATE.md skeleton addition)**:

```markdown
Side-effect scripts (binding non-negotiable):
- {list of npm-run / shell scripts that the agent will or may run AND which mutate out-of-bounds files}
- Remediation for each: {how to handle the dirty file without git mutation; e.g., "ignore + report" or "re-emit via Edit from `git show HEAD:<path>`"}

The orchestrator MUST enumerate side-effect scripts before dispatch. An agent that encounters an unenumerated side-effect halts + reports.
```

**Landing**: `docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md` `## Dispatch Contract` skeleton.

**Severity**: P1.

### P6 — Parallel-agent ceiling resolution (REAUDIT 6 vs tranche-stream 7)

**Source**: §C.6; REAUDIT-stream `11a1b4c` tightens to 6; tranche-stream 7-agent strengthened audit pattern.

**Proposed clause (LESSONS-LEARNED reconciliation entry)**:

```markdown
## 2026-05-12 - Parallel-Agent Ceiling Reconciliation

- **Source**: precept-submodule reconciliation at M.W0; REAUDIT-stream `11a1b4c` (2026-04-30) tightened to 6 agents; tranche-stream J/K/L close ceremony shipped a 7-agent strengthened audit (α/β/γ/δ/ε/π/ι) per K W0 + J W0 close-ceremony evolution.
- **Failure**: streams diverged on the parallel-agent ceiling; both have load-bearing rationale (REAUDIT cites cherry-pick/synthesis tractability; tranche cites the 7-lane post-close strengthened audit).
- **Rule**: the parallel-agent ceiling differs by wave class. For IMPLEMENTATION + RESEARCH waves, the ceiling is 6 (the REAUDIT bound holds: cherry-pick + synthesis tractability are the binding constraint). For READ-ONLY POST-CLOSE AUDIT waves, the ceiling is 7 (the strengthened pattern needs the ι lane on top of the 6-agent audit cohort; integration is trivial because audit lanes are read-only). The dispatch template enumerates the wave-class as part of the prompt.
- **Check**: ORCHESTRATION.md Wave Model + tranche/SPEC.md Waves both state the dual ceiling. The wave-spec declares wave-class (IMPLEMENTATION | RESEARCH | READ-ONLY-AUDIT) up front.
```

**Landing**: `docs/precepts/instructions/LESSONS-LEARNED.md` (append + cross-reference to ORCHESTRATION.md + SPEC.md updates). Also requires SPEC.md Waves + ORCHESTRATION.md Wave Model edits to state the dual ceiling.

**Severity**: P0 — blocks precept reconciliation; load-bearing for every future close ceremony.

### P7 — Single-human-multi-orchestrator pattern formalization

**Source**: §C.4; speedtest Y orchestrator = L orchestrator = user.

**Proposed clause (coordination doc shape addition)**:

```markdown
When the same human is orchestrator for ≥ 2 in-flight tranches (cross-repo, cross-stream, or cross-letter), the coordination doc states:
- "Orchestrator role: same human across L + Y. Conflict-resolution path §4 collapses to the human's discretion at the moment of arbitration."
- Each tranche maintains its own PROGRESS.md and FINAL.md; the human DOES NOT cross-cite mid-flight (avoids context bleed). Cross-citation happens at FINAL.md authoring time.
```

**Landing**: `docs/tranches/<LETTER>/coordination/<peer-letter>.md` template + `docs/precepts/instructions/tranche/SPEC.md` Document Set coordination clause extension.

**Severity**: P2.

---

## §F — REAUDIT-stream divergence reconciliation strategy

This is the most pressing process residual. The L W0 `coordination/speedtest-Y.md` §8 details the divergence: local 6 commits (tranche-stream G → K → L; 2026-05-05..2026-05-11) vs. origin/main 15 commits (REAUDIT-stream 2026-04-30 + STYLE.md 2026-05-01 + same-setup provide/inject lesson 2026-05-03). Share merge-base `458c2d1`.

### §F.1 — Read both streams

**Origin/main 15 commits (REAUDIT-stream + STYLE):**

| SHA | Date | Subject | Class |
|---|---|---|---|
| `26297c9` | 2026-05-03 | lessons: same-setup provide/inject is a no-op | LESSON |
| `93a24ea` | 2026-05-01 | docs(audits): import REAUDIT 2026-04-30 investigation artefacts | AUDIT-ARTEFACT |
| `2f38d82` | 2026-05-01 | feat(precepts): cross-reference STYLE.md and absorb 2026-05-01 lesson | CROSS-REF |
| `fc7761b` | 2026-05-01 | feat(precepts/style): introduce STYLE.md and calibration corpus | NOVELLA (STYLE.md) |
| `fd9fab9` | 2026-04-30 | docs(lessons-learned): add generated-size-budget rule from REAUDIT hardening | LESSON |
| `f2ff120` | 2026-04-30 | feat(precepts): absorb generic-orchestration memory items and codify hardening pass | ORCHESTRATION-EXT |
| `da0015b` | 2026-04-30 | feat(precepts/edicts): elevate named-wave rule to README and require sub-unit titles | NAMED-WAVE-RULE |
| `11a1b4c` | 2026-04-30 | refactor(precepts): tighten parallel-agent ceiling from 10 to 6 | CEILING-TIGHTEN (CONFLICT — see §F.2) |
| `5761ff5` | 2026-04-30 | docs(lessons-learned): add nine 2026-04-30 entries from REAUDIT | LESSON-x9 |
| `f3dd706` | 2026-04-30 | fix(tranche/spec): tighten scope-reveal absorb threshold | SPEC-EXT |
| `9cac72b` | 2026-04-30 | feat(tranche/wave-spec): add §3a triumvirate, §4a disjointness, §4b worktree plan | WAVE-SPEC-NEW |
| `46557e6` | 2026-04-30 | feat(orchestration/triumvirate): codify auto-triggers and required artefact paths | ORCHESTRATION-EXT |
| `79e8ddf` | 2026-04-30 | feat(tranche/dispatch-template): add HARD CAP, worktree pin, read-size, no-polling slots | DISPATCH-EXT |
| `e490e8e` | 2026-04-30 | docs(tranche): require named waves and lint cadence | NAMED-WAVE-RULE |
| `e9e441f` | 2026-04-30 | docs(instructions): codify commit discipline without subject caps | COMMIT-DISCIPLINE |

**Local tranche-stream 6 commits:**

| SHA | Date | Subject | Class |
|---|---|---|---|
| `b51047d` | 2026-05-11 | feat(instructions): 5 lessons + 3 SPEC clauses + 1 dispatch field + 1 ORCHESTRATION clause (L.W0) | TRANCHE-LESSON |
| `d4ada55` | 2026-05-09 | feat: 2 lessons-learned (worktree-relative-paths + stash-state-probe-loophole) — K.W8 | TRANCHE-LESSON |
| `fdc020c` | 2026-05-09 | feat: hardened agent git clause + worktree isolation + 4 lessons-learned (K.W0) | HARDENED-CLAUSE + 4 LESSONS |
| `6b8437a` | 2026-05-06 | feat(precepts): strengthened 6-agent close + visual-load-bearing-ness + 3 lessons (J.W0) | CLOSE-CEREMONY (CONFLICT — see §F.2) |
| `67c1412` | 2026-05-05 | feat: 6-agent post-close audit + bundle-budget non-negotiable + 3 lessons | CLOSE-CEREMONY (CONFLICT — see §F.2) |
| `cc57c91` | 2026-05-05 | feat(precepts): promote G's four lessons to binding precepts | G-LESSONS |

### §F.2 — Philosophical conflicts

| Conflict | Stream A position | Stream B position | Resolution path |
|---|---|---|---|
| Parallel-agent ceiling | REAUDIT (`11a1b4c`): 6 | tranche (`6b8437a` + `67c1412` + K W0 + L W8): 7 for read-only close audit, ≤ 6 for implementation | P6 dual-ceiling LESSON; codify wave-class distinction |
| Wave-spec triumvirate auto-triggers | REAUDIT (`46557e6` + `9cac72b`): codified triumvirate as named-required structure | tranche (ORCHESTRATION.md current): triumvirate is the "default recovery shape for non-environmental stalls" — narrative-tier | COMPLEMENTARY — REAUDIT codifies hard structure; tranche-stream's narrative-tier prose remains as motivation. Cherry-pick REAUDIT prose; preserve tranche-stream's "default recovery" framing |
| STYLE.md | REAUDIT (`fc7761b` + `2f38d82`): introduces STYLE.md + calibration corpus | tranche: absent | NOVELLA-REMOTE — adopt as-is into local; tranche-stream has no equivalent |
| Generated-size-budget rule | REAUDIT (`fd9fab9`): rule added | tranche: bundle-budget non-negotiable in `67c1412` | COMPLEMENTARY — generated-size-budget is broader than bundle-budget; both survive |
| Scope-reveal absorb threshold | REAUDIT (`f3dd706`): tightened | tranche: SPEC.md current Scope Reveal section | likely COMPLEMENTARY; cherry-pick REAUDIT's tightening |
| Named-wave rule | REAUDIT (`da0015b` + `e490e8e`): require sub-unit titles + lint cadence | tranche: no explicit equivalent | NOVELLA-REMOTE — adopt |
| Commit discipline | REAUDIT (`e9e441f`): no subject caps | tranche: current LESSONS-LEARNED + ORCHESTRATION have no equivalent | NOVELLA-REMOTE — adopt |
| 6-agent close audit pattern | tranche (`67c1412`): 6-agent post-close audit + 3 lessons | REAUDIT: absent (REAUDIT pre-dates J close pattern) | NOVELLA-LOCAL — preserve |
| Strengthened-7-agent close (visual-load-bearing-ness + ι) | tranche (`6b8437a` + L.W0 + L W8): codified | REAUDIT: absent | NOVELLA-LOCAL — preserve |
| Hardened agent git clause | tranche (`fdc020c`): codified | REAUDIT: absent | NOVELLA-LOCAL — preserve |
| Worktree-isolation + relative paths | tranche (`d4ada55`): two lessons | REAUDIT: absent (no worktree precept) | NOVELLA-LOCAL — preserve |
| Coordination doc class | tranche (`b51047d`): coordination/<peer-letter>.md SPEC clause | REAUDIT: absent | NOVELLA-LOCAL — preserve |
| Cross-repo commit policy | tranche (`b51047d`): ORCHESTRATION.md Cross-repo clause | REAUDIT: absent | NOVELLA-LOCAL — preserve |
| Subpath typing publication consumer-`tsc` probe | tranche (`b51047d`): LESSON | REAUDIT: absent | NOVELLA-LOCAL — preserve |
| DEGRADED close requires bound restoration | tranche (`b51047d`): SPEC.md + LESSON | REAUDIT: absent | NOVELLA-LOCAL — preserve |

### §F.3 — Reconciliation strategy choice

Four strategies were considered (per task brief §F.2):

- **(a) Merge with manual conflict resolution** — preserves both histories; produces a merge commit; preserves SHAs of both streams. Useful if SHAs are externally cited (they are — L FINAL.md cites `b51047d`). Cost: merge commits in submodule history.
- **(b) Rebase tranche-stream onto origin/main** — linearizes; rewrites local SHAs. Cost: every existing FINAL.md citation of `b51047d`/`d4ada55`/`fdc020c`/etc. is now stale; downstream parent-repo pins must update.
- **(c) Cherry-pick origin/main commits onto tranche-stream** — controlled integration; preserves local SHAs. Cost: rewrites origin SHAs (mirror of (b)); but since origin/main is the shared infra and L's local pin is not yet pushed, the local SHAs are the ones with downstream citations.
- **(d) Full re-baseline** — cherry-pick our 6 tranche commits onto an origin/main base; cleaner future. Rewrites local SHAs (downstream pins update once).

**Recommendation: (d) Full re-baseline.**

Rationale:
1. Local SHAs are NOT yet pushed (per coordination doc §8); no external systems depend on them.
2. FINAL.md citations are local docs we control; a single search-and-replace updates them post-reconciliation.
3. Origin/main SHAs are pushed + may be cited by speedtest's own submodule pin (verify joint reconciliation per §F.4 below); these MUST be preserved.
4. The re-baseline produces a clean linear history with the canonical origin-main precepts as foundation + tranche-stream as the leading edge — semantically correct.

Procedure:
1. Orchestrator-side fetch + verify origin/main HEAD (`26297c9`).
2. Reset local branch to origin/main HEAD (DESTRUCTIVE on local-only commits; safe because pin is local-only).
3. Cherry-pick the 6 tranche-stream commits in order (`cc57c91` → `67c1412` → `6b8437a` → `fdc020c` → `d4ada55` → `b51047d`).
4. At each cherry-pick, manually merge CONFLICT clauses per §F.2 table.
5. Per P6 LESSON, the 6-vs-7 ceiling lands as a dual-ceiling clause; cherry-pick `67c1412` + `6b8437a` ADAPTS its body to cite the dual ceiling instead of asserting unconditional 7.
6. Verify clause-survival per §F.5 below.
7. Update parent submodule pin in glass-ui to the new HEAD SHA.
8. Coordinate joint update with speedtest per §F.4.
9. Push only after user-arbitration.

### §F.4 — Coordination with speedtest

Speedtest's own precept-submodule pin may differ. The reconciliation MUST be a joint action:

1. Read speedtest's submodule pin: `git -C /Users/mkbabb/Programming/speedtest submodule status docs/precepts` (or equivalent). At read-time the L coordination doc §8 names this as "speedtest's own submodule pin may also point to a local-only SHA. Y orchestrator should verify + coordinate the precept-reconciliation as a joint action."
2. If speedtest pins a local-only SHA, joint reconciliation: speedtest absorbs the same re-baselined HEAD; speedtest's parent pin updates in the same batch.
3. If speedtest pins origin/main, speedtest's pin already trails ours; joint reconciliation is straight: speedtest can fast-forward to the new HEAD after our push.

The M.W0 reconciliation lane MUST publish a `coordination/precepts-RECONCILIATION.md` ledger detailing the joint action.

### §F.5 — Clause-survival verification

For each clause across both streams, the post-reconciliation submodule MUST include:

| Clause family | Origin survives? | Local survives? | Verification |
|---|---|---|---|
| REAUDIT 9 lessons (`5761ff5`) | yes | n/a | grep all 9 lesson titles |
| Generated-size-budget rule (`fd9fab9`) | yes | n/a | grep |
| STYLE.md + calibration corpus (`fc7761b`, `2f38d82`) | yes | n/a | file exists |
| Triumvirate auto-triggers (`46557e6`, `9cac72b`) | yes | n/a | grep |
| Named-wave rule (`da0015b`, `e490e8e`) | yes | n/a | grep |
| Commit discipline (`e9e441f`) | yes | n/a | grep |
| Parallel-agent ceiling dual (P6 reconcile) | adapted | adapted | grep both 6 + 7 + wave-class clause |
| Scope-reveal absorb threshold tightening (`f3dd706`) | yes | n/a | grep |
| G lessons (`cc57c91`) | n/a | yes | grep G LESSONS-LEARNED entries |
| 6-agent post-close audit (`67c1412`) | n/a | yes (as dual-ceiling clause) | grep |
| Visual-load-bearing-ness + 7-agent strengthened (`6b8437a`) | n/a | yes (as dual-ceiling clause) | grep |
| Hardened agent git clause + 4 lessons (`fdc020c`) | n/a | yes | grep + AGENT_DISPATCH_TEMPLATE.md `## Hardened agent git clause` section exists |
| K.W8 2 lessons (`d4ada55`) | n/a | yes | grep |
| L.W0 5 lessons + 3 SPEC + 1 dispatch field + 1 ORCHESTRATION (`b51047d`) | n/a | yes | grep all clauses |

The verification table is the M.W0 reconciliation lane's primary deliverable.

---

## §G — Recommendations to other lanes

### To Rε (architectural transpositions)

If Rε proposes architectural transpositions that span ≥ 2 repos in the constellation (e.g., shared-utility carve-out, `cn()` deduplicator into separate package, keyframes.js dependency uplift), Rε MUST factor in the dispatch model:

- Shared-utility carve-out is delicate cross-repo. Use the dispatch model in §D.1 (per-repo lanes; writer + consumer pattern). Constellation manifest declares each repo's role.
- Joint version-bump cycles MUST be coordinated via the constellation manifest. Each consumer lane updates its pin atomically; orchestrator verifies cross-repo build sweep before any push.
- Dispatch lanes for cross-repo refactors are WORKTREE-ISOLATED REQUIRED.
- The HEADLINE wave's hard gate cites the constellation manifest's post-state (every consumer is on the new version + builds clean).

### To Rα (silent miss)

If Rα surfaces a silent miss in cross-repo bound (e.g., a glass-ui API that one consumer adopted but another did not), the disposition is:
- The silent-miss surface must be enumerated in the constellation manifest at M open.
- The fix lands as a MULTI-WRITER mode per ORCHESTRATION.md cross-repo policy extension P3.

### To Rβ (chronic deferrals)

If Rβ surfaces a chronic deferral that crosses repos (e.g., reka-ui trim referenced by speedtest Y as "may overlap glass-ui v1.0 work"), the disposition is:
- The chronic deferral routes to the constellation manifest as a SHARED touchpoint.
- The owning tranche is named (the repo where the carve-out lives).
- The other tranche absorbs the touchpoint as a CHANGELOG note + read-only audit.

### To Rγ (doc drift)

If Rγ surfaces doc drift across repos (e.g., CLAUDE.md in glass-ui cites a speedtest pattern that no longer exists in speedtest), the disposition is:
- Doc drift fixes are ADDITIVE-annotation mode (per ORCHESTRATION.md cross-repo policy) — orchestrator commits a doc-only fix in the peer repo if authorized.
- Per the L coordination doc §3, cross-repo doc commits are "held until user-authorize" — the same disposition holds for M.

### To Rζ (verbatim directives)

If Rζ surfaces verbatim user directives that reference cross-repo touchpoints, Rζ MUST route the directive through the constellation manifest (per §B.1) — the manifest is the authoritative record of which repos are in scope.

---

## §H — Summary

**Friction incidents catalogued at L close**:

1. Precept-submodule push divergence (15-commit REAUDIT-stream + 6-commit tranche-stream from merge-base `458c2d1`).
2. W1 Lane B `git checkout -- <path>` self-disclosed precept boundary crossing.
3. Worktree-isolation actual-behaviour drift (verified by audit, not by structured ledger).
4. Agent prompt clarity around side-effect scripts (`npm run proof:package` rewrites status JSON).
5. Single-human-multi-orchestrator pattern (Y orchestrator = L orchestrator = user) — precept-silent.
6. 6-agent vs 7-agent parallel-agent ceiling conflict (REAUDIT vs tranche close-ceremony).
7. F-ε-3 Configurator recursion (runtime residual, not process — routed to M for harness investigation).
8. Cross-repo speedtest sweep authorized + clean (validates the L.W0 Cross-repo commit policy clause; not a friction, a validated pattern).

**Precept-update proposals**: 7 (P1 `git checkout` extension + P2 constellation manifest + P3 cross-repo modes + P4 worktree-diff ledger + P5 side-effect-script disclosure + P6 dual-agent-ceiling + P7 single-human-multi-orchestrator). Severity: 1 P0 (P6 dual-ceiling, blocks reconciliation) + 4 P1 + 2 P2.

**Reconciliation strategy recommendation**: Strategy (d) full re-baseline — cherry-pick local 6 tranche-stream commits onto origin/main HEAD as base. Adapts the 6-vs-7 ceiling commits (`67c1412` + `6b8437a`) to cite the dual-ceiling per P6. Verifies clause-survival per §F.5. Joint coordination with speedtest's own submodule pin per §F.4. Push after user-arbitration of CONFLICT clauses.

**Cross-repo dispatch-model proposal**: For M.HEADLINE, dispatch model depends on shape:
- Constellation refactor → per-repo lanes (§D.1).
- Precept-submodule reconciliation → orchestrator-solo with 2 read-only research lanes for stream classification (§D.2). Agents NEVER rebase shared infra.
- Consumer-repo standardization → per-consumer lanes (§D.3).

The constellation manifest artefact class (§B.1) is the load-bearing M.W0 deliverable across all three HEADLINE shapes.

---

## Authority

Read-only audit only. Sources:
- `docs/tranches/L/{FINAL.md, audit/L-pre-close.md, audit/L-audit-ι-integrity-sweep-reflog.md, audit/L-residuals.md, audit/W1-B-api-discovery-layer-proof.md, coordination/speedtest-Y.md, L.md, waves/W{0,1}.md}`.
- `docs/precepts/instructions/{LESSONS-LEARNED.md, ORCHESTRATION.md, tranche/SPEC.md, tranche/AGENT_DISPATCH_TEMPLATE.md}` at submodule pin `b51047d`.
- `git -C docs/precepts log` + `merge-base` + `log 458c2d1..origin/main` + `log 458c2d1..HEAD` + `show 11a1b4c --stat` (all read-only).
- `/Users/mkbabb/Programming/speedtest/docs/tranches/Y/Y.md` (cross-repo READ-ONLY, no commits).
- glass-ui constellation peer-repo `ls` reads (keyframes.js, value.js, words, mkb-utils) for constellation manifest context.

No mutating git operations performed. No file edits except CREATE of this artefact.
