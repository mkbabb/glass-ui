# W-B.7 · The tags field decided: RETIRE, and its tombstones leave `src` · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree |
| ships in | 11.0.0 |
| families | F-13, the #44 split (`audit/REGISTRY.md:312-320`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| ruler | seat. The row is a tranche-authored successor, not an owner ask (below) |

## 1 · What it closes

#44 W-TAGS-FIELD (`census-register-a.md:51`): OPEN since BJ, UNSTARTED through BK.

## 2 · The defect at HEAD

- **A successor with no consumer.** The legacy `TagsInput` was deleted at `a8a6f66b` (8.0.0) under ASK g5's ratified default, "zero consumers" (`BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:194`). #44 was the tranche's own plan to author a clean-break successor on #43's chip grammar (`COMPONENT-WAVES-TERMINAL-2.md:914`). No owner line asks for it. Sibling grep (read-only) finds no tags-field consumer; the only "tags" rows inbound are value.js's own tag popover (UIA-V-34 anchor, UIA-V-287 edge), which are overlay rows (W-L.1, W-E.4), not a field.
- **Tombstones.** `git grep -ciE 'tags-input|TagsInput' -- src` totals **8** lines: `src/index.ts:343`, `styles/glass/control-edge.css:37`, `styles/theme/radius.css:68,70,88,90,92`, `styles/theme/bridges.css:335`, each narrating the deletion.

## 3 · The cure

1. **RETIRE #44.** Ground: E-7 (an artefact needs two sites or an export with a reader) and F-66's mechanism (published surface with no consumer); the chip grammar it would sit on is W-E.6's and stands alone. Re-trigger: an inbound consumer ask for a tags field, ruled through W-B.2's rule.
2. The eight tombstone lines go: each file keeps its present-tense rule and loses the narration (E-10). The test-comment residue in `tests/gates/gate-register.test.ts` leaves with that file in W-A.2; `radius-role-canon.test.ts:246,262` loses its tags clause here.

## 4 · Files it touches

`src/index.ts`, `src/styles/glass/control-edge.css`, `src/styles/theme/radius.css`, `src/styles/theme/bridges.css` (comments only); `tests/styles/radius-role-canon.test.ts` (comments); `docs/tranches/BL/LEDGER.md`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B7-G1 · no tags residue in `src` | `test "$(git grep -ciE 'tags-input\|TagsInput' -- src \| awk -F: '{s+=$2} END {print s+0}')" -eq 0` | exit 0 | **exit 1**: 8 |

#44's terminal (RETIRE) is LEDGER:109; B7-G1 enacts it.

B7-G1 could pass by deleting comments without the decision; B7-G2 holds the decision.

## 6 · π and DELTA obligations

None: comments only, no paint changes.

## 7 · MIGRATION rows

None: nothing published is removed (TagsInput's removal is already in MIGRATION §8.0.0).

## 8 · Ledger rows

#44 RETIRE.
