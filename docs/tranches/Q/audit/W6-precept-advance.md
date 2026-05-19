# Q.W6 — Precept submodule advance (proof doc)

**Wave**: Q.W6 close — Precept submodule advance.
**Status**: COMPLETED.
**Date**: 2026-05-18.
**Inputs**: Q.md §2 (invariants 30-33), W6.md "Precept submodule advance"
(lines 32-42), `docs/precepts/cross-repo-dev-resolution.md` (Q.W0 Lane B),
`docs/tranches/Q/audit/W0-Lane-B-dev-resolution-contract.md`,
`docs/precepts/instructions/{LESSONS-LEARNED,README,ORCHESTRATION}.md` +
`instructions/tranche/SPEC.md`.

---

## §1 — Charter

Per W6.md "Precept submodule advance" (lines 32-42) + Q.md §2:

1. Codify Q invariants 30-33 in the canonical invariant registry (the
   LESSONS-LEARNED ledger, where invariants 24-29 are registered).
2. Re-activate the π visual-runtime lane in `instructions/tranche/SPEC.md` —
   from "archived / opt-in" toward "binding canonical close-ceremony lane".
3. Add LESSONS-LEARNED entries for the Q-tranche process incidents.
4. Author this proof doc.

File bounds: `docs/precepts/instructions/LESSONS-LEARNED.md`,
`docs/precepts/instructions/tranche/SPEC.md`, this proof doc. No source
mutations. No mutating git (the orchestrator commits + pushes the submodule
and bumps the glass-ui pointer).

---

## §2 — Where invariants are canonically registered

The precept canon has no standalone invariant-registry file. Invariants are
registered as numbered items inside LESSONS-LEARNED entries:

- Invariants 24-27 — one entry, `2026-05-14 - Audit + DI + Test-Hygiene +
  Tooling-Stash Codified At Glass-UI O.W0`, four numbered `Invariant NN —`
  bullets under **Rule**.
- Invariant 28 — `2026-05-16 - Zero Deferral Codified At Glass-UI P.W6`.
- Invariant 29 — `2026-05-16 - AB+1 Retrospective Discipline Codified At
  Glass-UI P.W6`.

Q invariants 30-33 follow the 24-27 precedent: a single codification entry
(`2026-05-18 - Cross-Repo Dev-Resolution Contract + Component-Prop
Fail-Explicit + Corpus-Grep Gates Codified At Glass-UI Q.W6`) with four
numbered `Invariant NN —` bullets under **Rule**, plus the standing
cross-references (`tranche/SPEC.md §Close`, `instructions/README.md §Edicts`,
`docs/precepts/cross-repo-dev-resolution.md`).

---

## §3 — What was codified (invariants 30-33)

| # | Invariant | Canonical doc | Mechanical gate |
|---|---|---|---|
| 30 | Cross-repo dev-resolution contract — 4-key `exports` shape + explicit consumer `resolve.conditions` + zero `dist/` sibling aliases + widened `server.fs.allow` | `docs/precepts/cross-repo-dev-resolution.md` (Q.W0 Lane B; named canonical) | `scripts/proof-resolution-contract.mjs` (`npm run proof:resolution`) |
| 31 | Component props fail-explicit — primitives do not silently swallow unknown props; dev-warn → typed-reject. Extends O invariant 24 from composables to the component-prop surface | `instructions/README.md §"Edicts"` (fail-explicit edict, component-prop extension) | dev-mode warn at the `defineProps` boundary; typed-reject hardening once fleet is migrated |
| 32 | Phantom-class corpus-grep gate — RETIRED CSS classes land with a `.retired-classes.txt` entry + fleet-wide grep | LESSONS-LEARNED Q codification entry | `scripts/proof-phantom-classes.mjs` + `.retired-classes.txt` registry |
| 33 | Dead-code-removal corpus-grep gate — generalises 32 to ALL "cleanup"/"remove unused" commits; pre-deletion grep + grep-evidence commit-body line | LESSONS-LEARNED Q codification entry | `scripts/proof-phantom-classes.mjs --pre-deletion` |

Each invariant ships its mechanical gate the SAME tranche as its codification
— the discipline Q-chron-3 itself prescribes (see §5). Invariant 30's gate
shipped at Q.W0 Lane C; 32 + 33's gate at Q.W6 (after Q.W4 Lane F demonstrated
the manual sweep).

---

## §4 — π lane re-activation — contingency note

W6.md line 38 specifies the π lane retires "from 'archived/opt-in' to 'binding
canonical close-ceremony lane'". `instructions/tranche/SPEC.md §Close` gains a
new `### The π visual-runtime lane` sub-section recording this re-activation.

**Honesty constraint observed.** π's re-activation is codified as
**contingent**, not as a completed binding Playwright probe:

- The lane is **canonical-when-tooling-available** — its full binding form
  requires working browser automation (Playwright / Chrome MCP) capable of
  pixel-level capture.
- The Q.W6 π re-probe could NOT obtain pixel confirmation: the Chrome browser
  extension was disconnected for this session. The probe ran at the
  **build-verification floor** — surfaces build, typecheck, and the dev server
  boots without console errors.
- SPEC.md's new tooling-contingency clause records that a close running π at
  the floor is valid but its π verdict is explicitly provisional; full
  pixel-binding confirmation awaits a re-probe with working browser
  automation, inherited by the receiving tranche as a named close obligation.

The proof doc does NOT claim π ran as a binding Playwright lane this tranche.
It did not. SPEC.md records the Q.W6 floor-run and the contingency verbatim.

---

## §5 — LESSONS-LEARNED entries added

Five new entries appended to `instructions/LESSONS-LEARNED.md`, all dated
`2026-05-18`, matching the canonical `Source / Failure / Rule / Check` format:

1. **Cross-Repo Dev-Resolution Contract + Component-Prop Fail-Explicit +
   Corpus-Grep Gates Codified At Glass-UI Q.W6** — the invariant-30-33
   codification entry. Four numbered `Invariant NN —` bullets under **Rule**,
   following the 24-27 precedent.

2. **Codification Without A Gate Is Necessary-But-Not-Sufficient (Q-chron-3)**
   — the 4th K-invariant-3 recurrence (post-P shadow cohort landed 1-2 days
   after invariant 29 was codified) + the tooling-gate escalation. Rule: every
   new anti-pattern invariant ships its gate the SAME tranche as the
   codification. Itself the pattern observed at 5 datapoints by Q open.

3. **Cleanup Commit Deletes Load-Bearing Artefact (Q-chron-4)** — the
   `b0debec` / `17adae2` / `c7f7c96` pattern: a cleanup commit verdicts an
   artefact as dead by greping only its own repo while the artefact is
   load-bearing in a sibling consumer. Motivates invariant 33's pre-deletion
   grep + grep-evidence commit-body line.

4. **Iterative Playwright-Binding Audit Rounds For Large Regression Batches
   (Q Cosmetic Cohort)** — 4 audit rounds / ~21 agents; round-1's attribution
   overturned twice by deeper Playwright-bound probes. Rule: large
   user-reported regression batches are worked in iterative visual-runtime
   rounds; an attribution is provisional until a runtime probe confirms it.

5. **Cross-Repo Dirty-Tree Coordination Must Be Checked Up Front (Q)** — Q
   discovered 3 consumer repos (value.js, fourier-analysis, words) carried
   large uncommitted in-flight trees; Q's consumer fixes there had to be
   delivered as handoff patches, not orchestrator commits. Rule: a tranche
   planning a cross-repo sweep checks consumer tree-cleanliness up front in
   `coordination/CONSTELLATION.md`; a dirty consumer tree converts that repo's
   lane from an orchestrator-commit lane to a handoff-patch lane.

---

## §6 — Files touched in the precept submodule

| # | Path | Change |
|---|---|---|
| 1 | `instructions/LESSONS-LEARNED.md` | 5 new entries appended (the invariant-30-33 codification entry + 4 process-incident entries) |
| 2 | `instructions/tranche/SPEC.md` | New `### The π visual-runtime lane` sub-section in §Close — π re-activation as canonical-when-tooling-available + the tooling-contingency clause recording the Q.W6 build-verification-floor run |
| 3 | `cross-repo-dev-resolution.md` | (No change this wave — authored at Q.W0 Lane B; named canonical in the invariant-30 registry entry) |

This wave produces no source mutations and no mutating git operations. The
orchestrator commits + pushes the `docs/precepts/` submodule and bumps the
glass-ui submodule pointer per the Q.W6 close ceremony.

---

## §7 — Verdict

**Q.W6 precept advance: COMPLETE.**

Q invariants 30-33 are codified in the canonical LESSONS-LEARNED registry,
each naming its mechanical gate; the cross-repo dev-resolution contract
(`cross-repo-dev-resolution.md`) and `proof-resolution-contract.mjs` /
`proof-phantom-classes.mjs` are named as the canonical doc + gates.

The π visual-runtime lane is re-activated in `tranche/SPEC.md` as a canonical
close-ceremony lane — codified **contingently**: canonical-when-tooling-available,
with the Q.W6 close honestly recorded as having run π at the
build-verification floor due to Chrome extension unavailability. Full
pixel-binding π status awaits a re-probe with working browser automation.

Five LESSONS-LEARNED entries codify the Q-tranche process incidents: the
cross-repo dev-resolution desync, the Q-chron-3 codification-without-gate
escalation, the Q-chron-4 cleanup-commit-deletes-load-bearing-artefact
pattern, the audit-aug iterative-Playwright-round lesson, and the cross-repo
dirty-tree coordination lesson.
