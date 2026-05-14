# O.W0 Lane B — Precept submodule canonicalize (invariants 24-27 + 2026-05-14 LL entry)

**Status**: landed.
**Lane mode**: orchestrator-solo (per M.W0 Lane II precedent — no agent dispatch for precept-submodule writes).
**Precept submodule advance**: `b8af314` → `46ee7e9` (3 files / +50 -2; pushed to origin/main).
**Glass-ui submodule-pointer bump**: pending W0 close commit.

## § Disposition

Per W0 Lane B file bounds (`docs/precepts/instructions/**`; orchestrator-solo).

| Invariant | Codification site | Verdict | Evidence |
|---|---|---|---|
| **24 — Fail-explicit on library-internal contract violations** | `instructions/README.md §"Edicts"` (new edict) + `instructions/tranche/SPEC.md §"Hard Gates"` (cross-reference in invalid-gate list) | LANDED | Both files edited at precept `46ee7e9`. Edict prose distinguishes library-internal failure modes (throw) from browser-API degradation (befitting silent fallback). |
| **25 — Typed-key + helper-pair DI canonical shape** | `instructions/README.md §"Code Discipline"` (new sub-section) | LANDED | Reference shape cited: `src/components/custom/configurator/density.ts:25` (`CONFIGURATOR_DENSITY_KEY: InjectionKey<ComputedRef<ConfiguratorDensity>>`). The typed-key half is canonical at N.W2; the paired-helper half lands at O.W2 dock canonicalization. |
| **26 — Test-file relocation outside src/** | `instructions/README.md §"Code Discipline"` (new sub-section) | LANDED | Codified as hygiene-only; canonical test-tree shape (`tests/` vs `src/<pkg>/__tests__/`) deferred to O.W1 Lane E execution per W1.md. |
| **27 — Tooling-side stash enforcement** | `instructions/tranche/SPEC.md §"Close"` ι sub-section (extended) | LANDED | Codifies `scripts/audit-stash-list.mjs` (or equivalent shell command) as the ι-lane fail-closed step. Cross-references the five-recurrence LL ledger (2026-05-04 / -06 / -09 / -12 / -14). |

LL entry: `2026-05-14 - Audit + DI + Test-Hygiene + Tooling-Stash Codified At Glass-UI O.W0` — inserted before the existing `2026-05-13 - Audit Verdicts Require Spot-Verification` entry, preserving reverse-chronological recency-first ordering at the top of the file. Documents the four invariants' origin in the O round-1 backend audit + the close-time check for each.

## § File changes summary

Precept submodule (3 files):

- `instructions/README.md`: +28 −0. One new edict (fail-explicit) appended to `§"Edicts"`; two new sub-sections (typed-key DI + test-files-outside-src) appended to `§"Code Discipline"`.
- `instructions/tranche/SPEC.md`: +9 −2. Invalid-gate list gains the silent-warn-in-library-owned-code entry (fail-explicit cross-ref); ι sub-section appended with tooling-side stash enforcement clause.
- `instructions/LESSONS-LEARNED.md`: +15 −0. One LL entry inserted in reverse-chronological position.

## § Verification

```
$ git -C docs/precepts diff --stat b8af314..46ee7e9
 instructions/LESSONS-LEARNED.md | 15 +++++++++++++++
 instructions/README.md          | 28 ++++++++++++++++++++++++++++
 instructions/tranche/SPEC.md    |  9 +++++++--
 3 files changed, 50 insertions(+), 2 deletions(-)

$ git -C docs/precepts log --oneline -2
46ee7e9 feat(precepts): codify fail-explicit + typed-key DI + test-hygiene + tooling-stash invariants (glass-ui O.W0)
b8af314 feat(spec+style): canonicalize bidirectional audit + spot-verification gate + wire-before-retire (glass-ui N.W0 Lane B)

$ git -C docs/precepts push origin main
To github.com:mkbabb/precepts.git
   b8af314..46ee7e9  main -> main
```

Cross-reference walk:

- `instructions/README.md §"Edicts"` "Fail-explicit" entry cites `instructions/tranche/SPEC.md §"Hard Gates"` for close-time enforcement.
- `instructions/tranche/SPEC.md §"Hard Gates"` invalid-gate list cites `instructions/README.md §"Edicts"` "Fail-explicit on library-internal contract violations".
- Both cite `LESSONS-LEARNED 2026-05-14 - Audit + DI + Test-Hygiene + Tooling-Stash` for origin.
- `instructions/README.md §"Code Discipline"` "Typed-key + helper-pair DI" cites `src/components/custom/configurator/density.ts` for the canonical typed-key half.
- `instructions/tranche/SPEC.md §"Close"` ι sub-section "Tooling-side stash enforcement" cites the five LL recurrence dates.

## § Open questions for orchestrator

None. Lane B closed clean. Glass-ui submodule pointer bump (`git add docs/precepts`) folded into the W0 close commit per W0.md §"Required artifacts" (W0 close commit hash).

## § Worktree diff verification

This lane is orchestrator-solo per M.W0 Lane II precedent — no worktree. Edits landed directly in `docs/precepts/` (the submodule's working tree on `main`), committed at precept `46ee7e9`, pushed to origin.

The glass-ui main tree's `docs/precepts` gitlink will bump from `b8af314` → `46ee7e9` as part of the W0 close commit.
