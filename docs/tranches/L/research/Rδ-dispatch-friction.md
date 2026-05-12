# L.Rδ — Dispatch Friction + Cross-Repo Coordination Audit (process tier)

**Lane**: δ — pre-L research.
**Mode**: READ-ONLY.
**Author**: research agent.
**Date**: 2026-05-11.
**Source baseline**: K close `35cae2c` (v0.9.3 tagged + pushed); precept submodule `d4ada55` (6 K-tranche LESSONS-LEARNED entries: 4 K W0 + 2 K W8).
**Cross-repo baseline**: speedtest master `5dcc2505` (X close); 6 active Y-prefixed research worktrees including `y-a3-glass-ui`.

This lane succeeds K.Rδ. K.Rδ catalogued 6 J-tranche incidents and proposed 5 precept-update groups, all of which K W0 + K W8 landed. This Rδ walks K's 3 documented process incidents, names 4 net-new friction findings surfaced at K close (1 closed, 3 open), proposes a cross-repo coordination protocol with speedtest's parallel Y tranche, and proposes a dispatch model for L W2's modularization sweep.

---

## §A — K dispatch-friction recap

K W8 catalogued 3 process incidents per `audit/K-pre-close.md §"Process incidents"` + `audit/K-audit-ι-integrity-sweep.md §6`.

### §A.1 — W3 Lane A `git stash` violation (third recurrence)

- **Source**: `K-audit-ι §F4`; `K-pre-close.md` L91; LESSONS-LEARNED entry 2026-05-09 #2.
- **What happened**: K W3 Lane A agent ran `git stash --keep-index` once during Step 5 verification to probe whether a typecheck error was self-introduced vs. parallel-lane in-flight. Stash captured Lane A + Lane B + W5 + W7 in-progress edits (26-file snapshot). Agent recovered by re-applying via Edit; orchestrator dropped `stash@{0}` post-W3.A.
- **Recurrence chain**: G W3 Lane 4 (recovery context, 2026-05-04) → J W1 + J W4.A (state-probe loophole, 2026-05-06) → K W3 Lane A (state-probe loophole re-opened, 2026-05-09). Three precept revisions; three recurrences.
- **K W8 close**: LESSONS-LEARNED #2 (2026-05-09) added with explicit "no state-probe loophole" enumeration. AGENT_DISPATCH_TEMPLATE.md §"Hardened agent git clause" now lists `git stash` + `git stash pop` in the binding forbidden subset.
- **Status at L open**: CLOSED — precept hardened. Read-only alternatives enumerated (`git show HEAD:<path>`, `git log -p <path>`, `git diff --no-index a b`).
- **Open question for L W0**: is the *prose* enough? The pattern has resisted 3 precept revisions. **§G.1 proposes a structural enforcement** (orchestrator pre-close audit: ι lane grep for `stash@{` reflog entries against the tranche commit window).

### §A.2 — W3 Lane B mid-run revert (harness-level)

- **Source**: `K-pre-close.md` L92.
- **What happened**: K W3 Lane B's files were reverted then re-applied mid-run; final on-disk state confirmed. Distinct from J's identically-named "external rollback between tool calls" incident (J PROGRESS.md L110-111) — K W3.B's harness-level revert was observed, recovered, and documented; J's was inferred.
- **Root cause hypothesis (unconfirmed)**: harness or shell state perturbed file-system between Edit calls; agent re-applied. Not parallel-lane interleave (W3.B ran sequentially under K's parallel-discipline-by-default).
- **K W8 close**: documented but NOT precept-codified. No LESSONS-LEARNED entry exists for this class.
- **Status at L open**: **OPEN** — precept silence. The recovery worked, but the failure-mode is undiagnosed; recurrence is undefended.
- **Open question for L W0**: should the precept enumerate harness-revert as a known failure-mode + require agents to commit a re-application trace in their Return? **§G.2 proposes the redress.**

### §A.3 — W6 worktree-isolation absolute-path anomaly

- **Source**: `K-audit-ι §F3`; LESSONS-LEARNED entry 2026-05-09 #1; ORCHESTRATION.md §"Worktree Isolation".
- **What happened**: K W6 (HEADLINE audacious-CTA extraction) dispatched Lane A + Lane B at `Agent isolation: "worktree"`. Both agents received absolute-path edit targets (`/Users/mkbabb/Programming/glass-ui/src/...`). The Agent tool created isolated worktrees; the agents' Edit calls resolved the absolute paths to the orchestrator's main tree, circumventing isolation. The orchestrator integrated by inspecting the main tree's dirty state — an unintended fallback that worked.
- **Root cause**: dispatch-template AGENT_DISPATCH_TEMPLATE.md cited "Worktree: {ABSOLUTE_WORKTREE_PATH}" but did not require agent prompts to express edit targets as relative paths. Absolute-path leak was the loophole.
- **K W8 close**: LESSONS-LEARNED #1 (2026-05-09) added: "Worktree Isolation Requires Relative Paths" — dispatch templates must express edit targets as repo-relative; orchestrator must validate worktree final state via `git -C <worktree-path> diff --stat` before integrating.
- **Status at L open**: CLOSED — precept hardened. The Check clause names the orchestrator's verification step.
- **Open question for L W0**: is the verification step enforced *programmatically* or only documented? **§G.3 proposes a dispatch-template field** (`worktree_diff_verification: required` / `optional`) that the orchestrator's close ceremony grep-checks.

### §A — Verdict

K closed 2 of 3 incidents at the precept tier; 1 (W3 Lane B harness revert) is documented-only without LESSONS-LEARNED codification. The 3-precept-revision recurrence of `git stash` raises a structural question: are prose-level rules sufficient, or do agents need an out-of-band enforcement (pre-close ι-lane reflog scan)?

L W0 should:
1. Add LESSONS-LEARNED for W3.B-class harness reverts (§G.2).
2. Promote ι-lane reflog scan to a SPEC-mandated close-ceremony step (§G.1).
3. Add `worktree_diff_verification` field to dispatch template (§G.3).

---

## §B — NEW friction surfaced post-K-close

Four findings, each with material implications for L W0's precept update and L wave dispatch.

### §B.1 — Cross-repo annotation push asymmetry

- **Source**: `K-pre-close.md §"Cross-repo deliverable"` L29-30; speedtest commit `6f412d89` (annotation); speedtest commit `30dd5ca1` (X.W3 re-probe).
- **What happened**: K orchestrator committed speedtest's `docs/tranches/W/artefacts/W3/b1/disposition.md` annotation at speedtest commit `6f412d89` (LANDED-VIA-EXT-K.WS annotation). The orchestrator did NOT push speedtest-side. Speedtest's X tranche later landed its X.W3.c re-probe at `30dd5ca1` directly on speedtest master, pushing both commits to origin in the X workflow.
- **What the K precept actually permitted**: ambiguous. ORCHESTRATION.md §"Integration" + AGENT_DISPATCH_TEMPLATE.md §"Hardened agent git clause" bind the *agent's* git behaviour. The orchestrator's cross-repo commit policy is not codified. K orchestrator made a judgment call: commit on speedtest's behalf (annotating an in-place disposition); defer push to the speedtest tranche.
- **Risk surfaced**: the asymmetric model works when (a) the receiving tranche is in-flight and (b) the annotation is small + additive. It fails open if (a) the receiving repo's tranche pushes a divergent change first, or (b) the annotation is non-trivial enough that the receiving tranche's audit lane wouldn't recognize it.
- **Status at L open**: **OPEN** — precept silence. K's pattern worked because X was in flight; if X had been closed at K's commit time, the unpushed annotation would have been an orphan local commit on speedtest until the next tranche.
- **§G.4 proposes a cross-repo commit policy** for L W0: orchestrator MAY commit cross-repo annotations only when (a) the receiving repo has an in-flight tranche AND (b) the annotation is purely additive (e.g., disposition note). Otherwise, document a handoff in the originating repo's FINAL.md cross-tranche-debt section and let the receiving repo's next tranche author it.

### §B.2 — Speedtest Y tranche parallel-with-L (cross-repo race surface)

- **Source**: 6 speedtest `y-*` worktrees at `/Users/mkbabb/Programming/speedtest/.claude/worktrees/`; speedtest X.FINAL.md §"4 net deferrals to Y"; X.FINAL.md L60 ("DEFERRED-TO-Y" for keyframes.js carve).
- **What's there**: 6 active Y branches at speedtest master HEAD (`y.a1` … `y.a6` from `git branch --list "y.*"`), each materialized as a worktree:
  - `y-a1-retrospective` — Y planning retrospective lane.
  - `y-a2-live-probe` — live-deploy verification lane.
  - `y-a3-glass-ui` — speedtest's glass-ui-side research lane (the one this Rδ cites).
  - `y-a4-backend` — server / worker scope.
  - `y-a5-perf` — perf scope.
  - `y-a6-modularization` — speedtest's modularization audit (named-parallel with L's user directive).
- **What `y-a3-glass-ui` is**: a research worktree at speedtest master HEAD (X close `5dcc2505`) on branch `y.a3`; **no Y plan docs landed yet** in either speedtest main tree or the worktree. The worktree carries no Y-prefixed `docs/tranches/Y/` folder — Y is still in planning. The worktree's purpose is inferred from name + X.FINAL: it is speedtest's glass-ui-side research lane.
- **Likely Y.A3 scope (inferred from X.FINAL "4 net deferrals to Y")**:
  - **reka-ui trim** — "reka-ui surface (popover/tabs/Switch) carries weight that's transitively pulled into the entry chunk; trim requires a careful surface review + **may overlap glass-ui v1.0 work**" (X.FINAL.md §"4 net deferrals to Y" row 2). **This is a confirmed cross-repo dispatch surface.**
  - **Glass-ui v1.0 / L coordination** — speedtest will need a glass-ui-side decision on WS Phase 2 (root-barrel removal of vueuse-bearing symbols) + reka-ui trim before its eager-critical-path target ≤ 150 KB can close.
  - **NOT** keyframes.js carve (that's speedtest's keyframes.js own tranche).
  - **NOT** App.abandon flake (purely speedtest-internal).
  - **NOT** auto-deploy hook precept (purely speedtest-internal).
- **Cross-repo race surface**:
  - **High risk**: if speedtest Y.A3 dispatches a glass-ui-side commit (analogous to speedtest W2 → glass-ui v0.9.1 dispatch) while L W1+ is in flight, two writers contend the same files (`src/index.ts` barrel, `src/forms.ts`, `src/composables/{dark,keyboard}.ts`, package.json exports, vite.library.ts).
  - **Medium risk**: speedtest Y.A3 finishes its glass-ui-side audit before L W1; the audit recommends a change that L's plan didn't anticipate. L absorbs via W0 reconciliation (per K invariant 4) but adds wave scope.
  - **Low risk**: speedtest Y.A3 runs purely as read-only audit against glass-ui v0.9.3; produces recommendations; L's L.md absorbs at next tranche open. No race.
- **Status at L open**: **OPEN** — precept silence. K's precept binds intra-repo coordination; nothing binds cross-repo parallel-tranche coordination.
- **§G.5 proposes a cross-repo coordination protocol** for L W0: speedtest-side audit-only is fine; speedtest-side commit into glass-ui requires L's explicit acceptance + bounds.

### §B.3 — WS DEGRADED-as-documented disposition

- **Source**: `K.FINAL.md §"WS"` L25; `audit/K-audit-ι §1` row "v0.9.3 ships additive subpath"; CHANGELOG.md v0.9.3 "KNOWN LIMITATION" disclosure.
- **What happened**: K W-S shipped v0.9.3 with Phase 1 only (additive subpath split: `/forms`, `/composables/dark`, `/composables/keyboard`). The SCC trap stayed open per Phase 1 alone (the root barrel still re-exports vueuse-bearing symbols; Rollup walks them as before). Phase 2 (root-barrel removal — breaking change) deferred to L / v1.0. K close accepted WS as DEGRADED-but-documented per CHANGELOG honest-disclosure.
- **Was DEGRADED-as-close a valid close per precept?** Examining `tranche/SPEC.md §"Close"`:
  - Close criterion: "every planned item landed, **was retired, or has a named destination**".
  - WS Phase 2 has a named destination: L / v1.0.
  - Hence the close is *precept-valid*.
- **Was the WS spec itself sound?** WS was scoped as Phase 1 alone explicitly per K plan. The spec did NOT require Phase 2. Hence the close meets its own spec.
- **The deeper question**: should a wave that knowingly produces a **DEGRADED** runtime outcome (SCC trap stays open at v0.9.3 — speedtest's X.W3.c later confirmed it byte-for-byte) close GREEN with a CHANGELOG note, or should the *spec author* have required Phase 2 wholesale (breaking change accepted) since L is the v1.0 cohort?
- **Trade-off analysis**:
  - **WS-as-it-shipped**: separates v0.9.3 (additive, consumable now) from v1.0 (breaking, consumed later). Lets consumers migrate to subpaths under v0.9.x in preparation. Two release cycles.
  - **WS-Phase-2-wholesale**: one release, breaking. Consumers either migrate or pin. Cleaner; closes the SCC trap at K close.
  - **Why K chose Phase-1-only**: per K.FINAL §"Architectural transpositions" #6 — additive split was sufficient signal that "subpath surface exists"; breaking change deferred to deliberate v1.0 cohort.
- **Verdict**: **K's choice was sound** under "no quick solutions, no workarounds" interpreted *prospectively* (Phase 1 is not a workaround; it's a Phase 1). But the precept-level question is whether wave-specs should disallow knowingly-DEGRADED outcomes when the deferred phase is within the same tranche cohort (L = v1.0 cohort).
- **Status at L open**: **PRECEPT-LEVEL OPEN** — `tranche/SPEC.md §"Hard Gates"` enumerates "disabled feature flag with no restoration wave" as invalid but does not address knowingly-DEGRADED runtime outcomes with named-but-deferred restoration in a successor tranche.
- **§G.6 proposes a SPEC clarification**: a wave that ships a knowingly-DEGRADED runtime outcome MUST cite the restoration wave + restoration tranche in its close, AND the receiving tranche MUST treat the deferral as a hard-gate inheritance (not optional).

### §B.4 — Subpath typing-publication gap

- **Source**: L findings.md L37 "vue-tsc broken resolution at `dist/composables/{dark,keyboard}.d.ts`"; speedtest X.W3.c `migrations.md §"Glass-ui v0.9.3 typing publication gap"`.
- **What happened**: K.WS shipped `dist/forms.{js,d.ts}` + `dist/composables/{dark,keyboard}.{js,d.ts}` per Phase 1. The `forms.d.ts` resolves cleanly. The two composables d.ts files do `export * from '../src/composables/<name>'` — a path that resolves to glass-ui's pre-build src tree, not the dist tree. vue-tsc in a *consumer project* sees `'../src/composables/dark'` as a path outside the published package and cannot resolve it. Speedtest's 5 consumer files (App.vue:100 + 4 others) attempted to migrate to subpaths, hit the typing failure, reverted to root-barrel imports. The runtime ESM resolution worked (`node -e 'import("@mkbabb/glass-ui/composables/dark")'` returned the expected exports). The typing-publication step was broken.
- **What K.WS's hard gate did + didn't catch**:
  - `dist subpath emission` gate in K-pre-close.md §"Build/Test/Budget gates" verified that `dist/forms.{js,d.ts}` + `dist/composables/{dark,keyboard}.{js,d.ts}` all emit. PASS.
  - The gate did NOT verify that the emitted `.d.ts` files **resolve correctly from a consumer's `tsc`** — only that the files exist.
  - K's release smoke-test was insufficient: file-existence ≠ semantic-correctness.
- **Why it shipped**: K invariant 12 (bundle-budget) + the dist subpath emission gate were the only WS hardgates; both passed. The typing-resolution failure surfaced only at speedtest's X.W3.c re-link probe (cross-repo evidence).
- **Status at L open**: **OPEN** — typing-publication gap is a v0.9.3 defect carried to L. Filed in K cross-tranche debt as "Glass-ui v0.9.3 typing publication gap (composables/dark.d.ts + composables/keyboard.d.ts): routed to glass-ui K follow-on or v0.9.4" (per disposition.md L107).
- **§G.7 proposes a precept update**: `scripts/release.sh` (or release hard-gate enumeration) MUST include a subpath typing-publication probe — `node -e 'import("@mkbabb/glass-ui/<subpath>")'` for runtime + `tsc --traceResolution` (or a temp consumer project's `vue-tsc`) for typing. The latter is the gap K's gate had.

---

## §C — Speedtest Y-A3 coordination protocol proposal

### §C.1 — What is known

- Speedtest's Y tranche has 6 research worktrees at speedtest master HEAD (X close).
- `y-a3-glass-ui` is the glass-ui-side research lane; branch `y.a3`; **no Y plan docs landed**.
- Speedtest X.FINAL named 4 deferrals to Y; one of them (reka-ui trim) "**may overlap glass-ui v1.0 work**" (X.FINAL row 2).
- Speedtest X.W3.c documented the typing-publication gap and routed it to glass-ui (per disposition.md L107).
- Speedtest is OPENING Y in parallel with our L (both at 2026-05-11).
- Cross-repo dispatch precedent: speedtest W2 → glass-ui v0.9.1 (ScrollingText + Section + freshness gate); speedtest later landed v0.9.2 (cn() replacement); both AHEAD of K dispatch per K.FINAL §"Cross-repo coordination".

### §C.2 — What is unknown (and therefore presumed)

- Whether speedtest Y.A3 will (a) read-only audit glass-ui v0.9.3, (b) commit into glass-ui directly (precedent: speedtest W2 → v0.9.1), or (c) gate on L's v1.0 release.
- Whether speedtest Y.A6 (modularization audit) will touch any glass-ui surface (likely speedtest-internal only, but the name overlap with L's modularization directive is striking).
- Whether speedtest Y has a `Y.md` plan in a separate worktree (e.g., `y-a1-retrospective`) that the y-a3 worktree mirrors. **Not verified**; speedtest main tree has no `docs/tranches/Y/`; worktrees carry no plan folders.

### §C.3 — Proposed coordination protocol

L W0 commits a `docs/tranches/L/coordination/speedtest-Y.md` (new artefact class) that:

1. **Identifies L's authoritative cross-repo points of contact**:
   - L W0 owns the v1.0 cohort decision (WS Phase 2; root-barrel removal of vueuse-bearing symbols; reka-ui trim if absorbed).
   - L W2 (modularization sweep) owns any src/ reorganization (potentially `src/api/`).
   - L wave-close orchestrator owns cross-repo commits per §G.4.

2. **Enumerates L's bound + speedtest Y's bound**:
   - L MAY: write glass-ui-side any file; commit + push to glass-ui origin; tag v1.0.
   - L MUST NOT: write speedtest files except per §G.4 cross-repo annotation policy (additive only, on in-flight speedtest tranche).
   - Speedtest Y MAY: read glass-ui files (any version); audit + report findings; propose changes via L cross-tranche debt absorption.
   - Speedtest Y MUST NOT: write glass-ui files while L is in flight without L's explicit acceptance (precept §G.5 binds).

3. **Race-protection mechanism**:
   - Before any cross-repo commit, the orchestrator runs `git -C <other-repo> log --oneline HEAD~5..HEAD` and `git -C <other-repo> status` to detect in-flight changes.
   - If the other repo has uncommitted work or recent commits in the contention zone, the orchestrator HALTS + reports + requests user-arbitration.
   - Successful cross-repo commits cite the other repo's HEAD at commit time in the commit message (per K W-S precedent).

4. **Conflict resolution**:
   - If speedtest Y commits glass-ui changes while L is in flight, L's next reconciliation lane absorbs the changes per K invariant 4 (mandatory reconciliation when opening against a baseline ≥ 1 release stale — same logic for "≥ 1 cross-repo commit unabsorbed").

5. **Specific Y.A3 likely-overlap surface**:
   - **WS Phase 2 / root-barrel removal**: L's primary cohort. Y.A3 audit may inform the exact symbol-set to remove. L W0 should reach out (via this coordination doc) to consume Y.A3's audit if it lands before L W2.
   - **reka-ui trim**: declared by X.FINAL as "may overlap glass-ui v1.0". If Y.A3 recommends a reka-ui trim, L can absorb in W2's modularization sweep. **Reka-ui surfaces in src/components/ui/** — the trim is a glass-ui-side change.
   - **Typing-publication gap (§B.4)**: closed-by-L (release-script hardening per §G.7). Y.A3 is an *observer* of this work, not a co-author.

### §C.4 — Headline

**Speedtest Y.A3 is a likely-reader, possibly-recommender, ideally-NOT-writer of glass-ui-side surfaces during L flight.** L W0's coordination doc explicitly invites Y.A3's audit findings via additive cross-tranche-debt entries; explicitly forbids Y.A3 commits into glass-ui without L acceptance.

---

## §D — Modularization-sweep dispatch model proposal

L user directive: "Check for likely needs to be better modularized into sub-modules, and ensure cohesion with our other modules, potentially having an api dir, etc."

If L W2 executes a modularization sweep, the dispatch friction surface is high. Below: the dispatch model.

### §D.1 — What modularization implies

- Re-organize `src/` (currently `components/ui/` + `components/custom/` + `composables/` + `styles/` + `utils/`).
- Possibly introduce `src/api/` (public-surface dir, analogous to React's `react/jsx-runtime`).
- Possibly collapse + retire sub-module boundaries (e.g., promote `composables/glass/` to top-level; demote `components/custom/animation/` if internal-only).
- Re-shape `src/index.ts` barrel — affects EVERY consumer.
- Re-shape package.json `exports` map — affects subpath resolution + consumer TS.
- Re-shape `vite.library.ts` libraryEntries — affects what builds.
- Re-shape `tsconfig.json` paths — affects internal resolution.

### §D.2 — Dispatch friction surfaces

| Surface | Friction | Mitigation |
|---|---|---|
| **Multi-agent rename collision** | Two agents both rename `src/components/custom/foo/Foo.vue` → different targets; the orchestrator's merge step can't reconcile | Worktree isolation REQUIRED; per-agent file bounds enforced; lane sequencing not parallelism for any shared-rename file |
| **Import-graph rewrite** | Every internal `from "@/components/..."` re-targets; demo/ + dist/ + speedtest all break under shadow refactor | Single agent owns the rewrite (no parallelism); typecheck after each module group; commit + tag at each module-group close |
| **Breaking-change cohort** | Every consumer break is intentional (v1.0); CHANGELOG must enumerate; speedtest re-link required | L close ceremony coordinates with speedtest Y.A3 (per §C.3); v1.0 tagged after coordination doc absorbs Y.A3 audit (if any) |
| **`src/index.ts` barrel race** | Multiple agents need to add/remove exports; line-level merge conflict almost certain | One agent owns the barrel; other agents return "barrel deltas" in their Return; orchestrator applies deltas serially |
| **Subpath-resolution drift** | Any subpath added/removed without `package.json` `exports` update silently breaks consumers | Hard gate: post-W2 subpath emission probe + typing probe (per §G.7) on every published subpath |
| **Demo consumer drift** | Every modularization rename has 30+ demo-story consumers; sweep must walk demo/ exhaustively | demo/ rewrite is part of the wave bounds; no separate demo-rewrite pass |
| **Speedtest race** | Speedtest Y.A3 audit may recommend conflicting module shape | Coordination doc per §C.3; Y.A3 audit consumed before W2 dispatch |

### §D.3 — Proposed L W2 dispatch model

**Mode**: HYBRID — worktree-isolated parallel agents per sub-module, with one orchestrator-direct integration lane.

**Phase 1: planning (W1 or W0+)**
- ι-style audit lane reads current `src/` shape; produces module-boundary recommendation; cites exposed cross-module dependencies + circular imports + sub-bar consumers.
- Output: `docs/tranches/L/research/Rε-modularization-map.md` (NEW, not this Rδ's responsibility).

**Phase 2: dispatch (W2 wave window)**
- One agent per sub-module rename, worktree-isolated (REQUIRED per §A.3 + ORCHESTRATION.md §"Worktree Isolation"). 3-5 agents max.
- Each agent's bounds: own files only + return list of internal-import changes needed in `src/index.ts` + foreign files.
- NO agent touches `src/index.ts` directly. NO agent touches `package.json`. NO agent touches `vite.library.ts`. NO agent touches demo/.

**Phase 3: integration (orchestrator-direct, post-wave)**
- Orchestrator reads each agent's worktree (`git -C <worktree-path> diff --stat`).
- Orchestrator applies each agent's file-renames to main tree via Read/Edit/Write.
- Orchestrator applies the agents' barrel deltas to `src/index.ts` serially.
- Orchestrator updates `package.json` exports + `vite.library.ts` libraryEntries + `tsconfig.json` paths.
- Orchestrator runs `npm run typecheck` + `npm run build` + subpath publication probe (§G.7).
- Orchestrator updates demo/ to consume new imports (mechanical sweep).
- Orchestrator commits `feat(tranche-L/w2): modularization sweep — <module-summary>`.

**Phase 4: speedtest re-link (cross-repo, post-tag)**
- v1.0 tagged + pushed.
- Coordination with speedtest Y.A3 per §C.3 — they consume via `file:../glass-ui` symlink re-build + their X.W3.c-style re-probe.
- L's FINAL.md cites speedtest Y.A3's re-probe result (if landed) OR routes the re-probe to a future tranche if Y is in flight.

### §D.4 — Headline

**Worktree-isolated parallel for renames; orchestrator-direct integration for barrel + package.json + exports + demo/ + speedtest re-link.** Single owner per integration point; no parallel writers to the barrel or to exports.

---

## §E — L W0 precept-update proposal summary

Six new precept-tier updates surfaced by §A + §B. Grouped + sequenced.

| # | Section | Update target | Class |
|---|---|---|:---:|
| 1 | §G.1 | `tranche/SPEC.md §"Close"` — promote ι-lane reflog scan as a SPEC-mandated close-ceremony step | SPEC clause |
| 2 | §G.2 | `LESSONS-LEARNED.md` — new entry for harness-revert class (W3 Lane B-style) | LESSONS-LEARNED #1 |
| 3 | §G.3 | `AGENT_DISPATCH_TEMPLATE.md` — add `worktree_diff_verification: required/optional` field | TEMPLATE field |
| 4 | §G.4 | `ORCHESTRATION.md §"Integration"` — cross-repo commit policy | ORCHESTRATION clause |
| 5 | §G.5 | New `coordination/` artefact class + `tranche/SPEC.md` clause | SPEC clause + artefact class |
| 6 | §G.6 | `tranche/SPEC.md §"Hard Gates"` — DEGRADED runtime outcome must cite restoration wave + tranche | SPEC clause |
| 7 | §G.7 | `LESSONS-LEARNED.md` — new entry for subpath typing-publication gap | LESSONS-LEARNED #2 |

**Net new LESSONS-LEARNED entries**: 2 (W3 Lane B harness revert; subpath typing-publication gap).
**Net new SPEC clauses**: 3 (ι reflog scan; coordination artefact; DEGRADED restoration binding).
**Net new TEMPLATE fields**: 1 (worktree diff verification).
**Net new ORCHESTRATION clause**: 1 (cross-repo commit policy).

---

## §F — Cross-repo handoff protocol proposal

(Per L user task brief §B last bullet.)

**Class**: PROCESS PROTOCOL — not a LESSONS-LEARNED entry; lives in ORCHESTRATION.md §"Integration" + new `coordination/` artefact class.

### §F.1 — Three cross-repo states

1. **READ-ONLY observer** (default): one repo reads another; no commits cross. No protocol needed beyond `git -C <other-repo> <cmd>`.

2. **ADDITIVE annotation** (K W-S → speedtest disposition precedent): one repo commits into another a strictly-additive note/disposition annotation. Permitted only when (a) the receiving repo has an in-flight tranche AND (b) the annotation is purely additive (no source-of-truth conflict) AND (c) the receiving tranche's audit lane will see the annotation.

3. **AUTHORITY-TRANSFER** (speedtest W2 → glass-ui v0.9.1 precedent): one repo commits source changes into another. Permitted only when (a) the receiving repo's tranche has explicitly accepted the bounds AND (b) the receiving repo's orchestrator is the integration point. The "Hardened agent git clause" (binding) explicitly forbids agents from cross-repo commits; the orchestrator-direct authority-transfer must be documented in BOTH tranches' FINAL.md.

### §F.2 — Handoff sequencing

For ADDITIVE annotations (mode 2):
1. Originating orchestrator drafts annotation locally.
2. Originating orchestrator verifies receiving repo's tranche is in-flight: `git -C <other> log --oneline | head -3` + `git -C <other> status --porcelain | head -5`.
3. If clean and in-flight: commit annotation; cite receiving repo's HEAD in commit message.
4. Do NOT push the receiving repo's commit. Push is the receiving tranche's responsibility.
5. Document handoff in originating FINAL.md cross-tranche-debt section.

For AUTHORITY-TRANSFER (mode 3):
1. Both tranches' open documents the bounds (originating + receiving).
2. Originating orchestrator commits + pushes to a release tag.
3. Receiving orchestrator re-links + runs an X.W3.c-style re-probe.
4. Both FINAL.md citing the exchange.

### §F.3 — Detection mechanism for the orchestrator

Before any cross-repo commit, the orchestrator runs (read-only):
```
git -C <other-repo> log --oneline HEAD~10..HEAD
git -C <other-repo> status --porcelain
git -C <other-repo> branch --show-current
```
If the other repo has uncommitted work in the contention zone OR is on a non-master branch unexpectedly: HALT + report to user.

---

## §G — Detailed precept-update proposals

### §G.1 — ι reflog scan as SPEC-mandated close-ceremony step

**Target**: `docs/precepts/instructions/tranche/SPEC.md §"Close"`.

**Current**: lists "post-close audit (6 agents: plan-vs-actual + substrate-without-consumer + doc-drift + idiomatic-gestalt + performance + visual-runtime)".

**Proposed addition** (K's ι lane gets formal status; expanded with reflog scan):

> - The `ι` integrity-sweep lane (named-but-not-landed P0 audit + reflog scan for forbidden git operations) is one of the close-ceremony lanes (promoting K's ad-hoc ι to a 7-agent SPEC standard).
> - The reflog scan walks `git reflog --since=<tranche-open-date>` for stash entries; any entry surfaced is a precept violation requiring named-incident absorb. Walks `git log --diff-filter=A --since=<tranche-open-date> -- 'docs/precepts/'` for unexpected precept changes; any unexpected change is a HALT.

**Rationale**: stash recurrence after 3 precept revisions argues for out-of-band enforcement. ι's reflog scan is the structural redress.

### §G.2 — Harness-revert LESSONS-LEARNED entry

**Target**: `docs/precepts/instructions/LESSONS-LEARNED.md`.

**Proposed entry** (dated 2026-05-11 — L W0 open):

```markdown
## 2026-05-11 - Harness-Level Revert Between Agent Tool Calls

- **Source**: glass-ui K W3 Lane B (mid-run revert + re-application;
  observed by agent's own incident report; per K-pre-close.md §"Process
  incidents").
- **Failure**: agent's Edit tool writes were observed reverted between
  tool calls (distinct from J's "external rollback between tool calls"
  hypothesis which was inferred; K W3.B's revert was directly observed).
  Recovery via re-application worked; root-cause undetermined (harness
  state? shell perturbation? parallel-lane stomp despite single-lane
  declared bounds?).
- **Rule**: agents that observe their own writes reverted MUST (a) NOT
  re-apply silently — re-application leaves no trace; (b) instead, halt
  and report the symptom with the affected file list; (c) the orchestrator
  decides whether to redispatch or absorb directly. Re-application by
  the agent is a hidden-recovery anti-pattern that obscures the failure
  mode.
- **Check**: agent prompts include "on observed harness revert, halt
  + report; do not silently re-apply" as a non-negotiable. Orchestrator
  pre-close audit walks agent Return docs for "re-applied" / "re-edited"
  language and verifies orchestrator was notified at the time.
```

### §G.3 — `worktree_diff_verification` template field

**Target**: `docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md`.

**Proposed addition** to the template skeleton:

```
Isolation: <none | worktree>
Worktree path: {ABSOLUTE_WORKTREE_PATH}  # only if isolation: worktree
Worktree diff verification: required  # orchestrator validates worktree's final state before integrating
```

Plus to §"Hardened agent git clause":

> When `Isolation: worktree`, agent prompts MUST express edit targets
> as repo-relative paths. The orchestrator's wave-close integration
> step runs `git -C <worktree-path> diff --stat` to verify the
> worktree's final state matches the agent's claimed edits before
> applying to main. Any divergence is a HALT.

### §G.4 — Cross-repo commit policy

**Target**: `docs/precepts/instructions/ORCHESTRATION.md §"Integration"`.

**Proposed addition** (after the existing "At every wave close, the orchestrator commits..." paragraph):

> Cross-repo commits (orchestrator commits into a repo other than the
> tranche's primary repo) are permitted only as ADDITIVE annotations
> (e.g., disposition notes; cross-tranche-debt routing acknowledgments).
> Permitted when (a) the receiving repo has an in-flight tranche, AND
> (b) the annotation is purely additive (no source-of-truth conflict),
> AND (c) the receiving tranche's audit lane will see the annotation.
>
> Cross-repo source-change commits (AUTHORITY-TRANSFER, e.g.,
> speedtest W2 → glass-ui v0.9.1) require BOTH tranches' open docs
> to declare bounds; the orchestrator-direct authority-transfer is
> documented in BOTH FINAL.md files.
>
> Cross-repo commits do NOT push the receiving repo. Push is the
> receiving tranche's responsibility.

### §G.5 — coordination/ artefact + SPEC clause

**Target**: `docs/precepts/instructions/tranche/SPEC.md §"Document Set"`.

**Proposed addition** to Conditional list:

> - `coordination/<other-repo>.md` — required when the tranche has a
>   confirmed cross-repo race surface (parallel-tranche, shared
>   surface, or deferred-cross-repo-handoff). The coordination doc
>   names: the other repo's tranche letter, the other repo's HEAD at
>   coordination time, the surfaces both tranches may write, and the
>   conflict-resolution protocol (per ORCHESTRATION.md §"Cross-repo
>   commit policy").

### §G.6 — DEGRADED runtime outcome SPEC clause

**Target**: `docs/precepts/instructions/tranche/SPEC.md §"Hard Gates"`.

**Proposed addition** (after the "Invalid hard gates" list):

> ### DEGRADED runtime outcomes
>
> A wave that ships a knowingly-DEGRADED runtime outcome (e.g., a
> measurement gate where the post-wave runtime fails to meet the
> pre-wave target by design, because the structural fix is split
> across phases) MUST:
>
> - declare the DEGRADED status in the wave-spec status line;
> - cite the restoration wave AND restoration tranche by name (e.g.,
>   "Phase 2 → L tranche / v1.0");
> - emit a CHANGELOG honest-disclosure entry under "KNOWN LIMITATION";
> - the receiving tranche's open docs MUST inherit the deferral as a
>   hard-gate (not optional cross-tranche debt).
>
> Knowingly-DEGRADED outcomes WITHOUT a named restoration tranche are
> equivalent to "disabled feature flag with no restoration wave" — an
> invalid hard gate.

### §G.7 — Subpath typing-publication gap LESSONS-LEARNED

**Target**: `docs/precepts/instructions/LESSONS-LEARNED.md`.

**Proposed entry**:

```markdown
## 2026-05-11 - Subpath Typing Publication Requires Consumer-Side `tsc` Probe

- **Source**: glass-ui K W-S v0.9.3 (additive subpath split); speedtest
  X.W3.c re-probe surfaced broken vue-tsc resolution at
  `dist/composables/{dark,keyboard}.d.ts` (export path
  `'../src/composables/...'` resolves outside the published package).
- **Failure**: K's WS hard-gate "dist subpath emission" verified that
  the `.d.ts` files exist but did NOT verify they resolve correctly
  from a consumer's `tsc`. Runtime ESM resolution passed; typing
  resolution failed silently. Speedtest's 5 consumer files attempted
  subpath migration, hit the typing failure, reverted to root-barrel
  imports. The gap escaped K close.
- **Rule**: any wave that publishes a new subpath in `package.json`
  `exports` MUST emit a runtime probe (`node -e
  'import("@<pkg>/<subpath>")'`) AND a typing probe (`tsc
  --traceResolution`, OR a temp consumer project's `vue-tsc` run
  against the published subpath). File-existence checks are
  insufficient.
- **Check**: `scripts/release.sh` (or equivalent release hard-gate
  enumeration) runs both probes per published subpath; release halts
  on either failure. The subpath-publication hard-gate is
  emit-AND-resolve, not just emit.
```

---

## §H — Closing

K's 3 documented process incidents close as: 2 precept-hardened (stash; worktree-isolation absolute-path); 1 documented-only (W3 Lane B harness revert; §G.2 closes).

Four net-new friction findings:
- §B.1 cross-repo annotation push asymmetry → §G.4 cross-repo commit policy.
- §B.2 speedtest Y parallel-with-L → §G.5 coordination artefact + §C protocol.
- §B.3 WS DEGRADED-as-close (precept-valid, but raised SPEC question) → §G.6 DEGRADED clause.
- §B.4 subpath typing-publication gap → §G.7 LESSONS-LEARNED.

Speedtest Y.A3 is a likely-reader, possibly-recommender, ideally-NOT-writer of glass-ui surfaces during L. The coordination doc at L W0 makes the bounds explicit.

L W2's modularization sweep dispatches worktree-isolated parallel agents for sub-module renames + orchestrator-direct integration for barrel + package.json + exports + demo/ + speedtest re-link. Single owner per integration point; no parallel writers to the barrel.

L W0 precept-update proposals: 2 new LESSONS-LEARNED entries; 3 new SPEC clauses; 1 new TEMPLATE field; 1 new ORCHESTRATION clause. **Total: 7 precept-update proposals.**

The J→K trajectory (6 incidents → 3 precept-update commits → 3 K incidents → 2 K precept-update commits → 4 new L findings) shows precept evolution working; the J anti-pattern of "loophole-then-recurrence" partially recurred at K (stash third time), suggesting some classes of failure resist prose enforcement and need structural redress (§G.1's ι reflog scan).

---

## §I — Citations index

| Claim | Source |
|---|---|
| K close commit + 3 incidents | `docs/tranches/K/FINAL.md` + `docs/tranches/K/audit/K-pre-close.md` §"Process incidents" |
| ι integrity-sweep findings | `docs/tranches/K/audit/K-audit-ι-integrity-sweep.md` §6 (F1–F4) |
| K W8 LESSONS-LEARNED additions | `docs/precepts/instructions/LESSONS-LEARNED.md` 2026-05-09 entries #1 + #2 |
| K WS DEGRADED close | `docs/tranches/K/FINAL.md` L25 + L52 |
| K cross-repo annotation | `docs/tranches/K/audit/K-pre-close.md` L29-30 (speedtest `6f412d89`) |
| Speedtest X.W3.c re-probe + typing gap | `/Users/mkbabb/Programming/speedtest/docs/tranches/W/artefacts/W3/b1/disposition.md` §"2026-05-09 — X.W3.c re-probe" |
| Speedtest Y branches | `git -C /Users/mkbabb/Programming/speedtest branch --list "y.*"` returns 6 |
| Speedtest Y worktrees | `ls /Users/mkbabb/Programming/speedtest/.claude/worktrees/y-*` returns 6 |
| Speedtest X.FINAL 4 deferrals to Y | `/Users/mkbabb/Programming/speedtest/docs/tranches/X/FINAL.md` §"4 net deferrals to Y" |
| reka-ui trim may overlap glass-ui v1.0 | speedtest X.FINAL.md row 2 of "4 net deferrals to Y" |
| Hardened agent git clause | `docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md` §"Hardened agent git clause" |
| Worktree Isolation precept | `docs/precepts/instructions/ORCHESTRATION.md` §"Worktree Isolation" |
| tranche/SPEC.md close criteria | `docs/precepts/instructions/tranche/SPEC.md` §"Close" + §"Hard Gates" |
| K Rδ precedent | `docs/tranches/K/research/Rδ-dispatch-friction.md` (mimic structure) |
| L findings.md L open directives | `docs/tranches/L/findings.md` L37 (subpath typing gap), L29 (modularization directive) |
| dist/composables/dark.d.ts broken re-export | `dist/composables/dark.d.ts` content: `export * from '../src/composables/dark'` |

---

**Path to this deliverable**: `docs/tranches/L/research/Rδ-dispatch-friction.md`.
