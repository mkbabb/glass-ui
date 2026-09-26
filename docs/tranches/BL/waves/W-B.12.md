# W-B.12 · The shadcn IDIOM-CLEARED column decided: RETIRE, because three roster invariants hold it · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree |
| ships in | 11.0.0 |
| families | F-13, the GAP-B2b split (`audit/REGISTRY.md:320`, `ledger/CENSUS.md:254-256`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| ruler | seat |

## 1 · What it closes

#64's IDIOM-CLEARED column (`census-register-b.md:54`; TR:214): the default visual recipe, the wrapper topology, the utility vocabulary and the public boundary of an eight-family shadcn ledger that was never drawn; and L01b-64's `data-slot` count (240 lines).

## 2 · The defect at HEAD

- The ledger was never drawn and no family held the column (GAP-B2b).
- The idiom's traces are measurable: `git grep -ci shadcn -- src` totals **27** lines (for example `styles/theme/radius.css:97-104`, the shadcn-default `--radius` root); `tests/gates/roster.json` does not exist yet (`test -f` exits 1), so the invariants that would hold each clause are not bound.

## 3 · The cure

1. **RETIRE the column.** Each of its four clauses is a mechanism an existing invariant holds, so a parallel ledger would be the duplicated derived data P-3 forbids:
   - the default visual recipe and the utility vocabulary → F-64, W-C.4, roster G-13 (LADDER-EMITTED) and the token-hygiene detector (literal fallbacks, phantom and duplicate tokens, the shadcn-default `--radius` ladder);
   - the wrapper topology → F-58, W-D.1, roster G-42 (COLOCATED) with the one-symbol-one-door seal;
   - the public boundary → F-66, W-L.6's P-6 census, roster G-01 (SURFACE-EXACT);
   - `data-slot`: the attribute is the library's styling hook (251 `data-slot` lines in `src` at this seat), not a residue; it stays, and W-L.2's state-vocabulary witness covers attributes the recipes read.
2. The DECLARATION column (the 27 shadcn provenance lines) is W-C.2's E-10 sweep.

## 4 · Files it touches

`docs/tranches/BL/LEDGER.md` only.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B12-G2 · the three holders exist | `node -e 'const r=require("./tests/gates/roster.json");for (const id of ["G-13","G-42","G-01"]) if(!r.find(e=>e.id===id)) process.exit(1)'` | exit 0 | **exit 1**: `roster.json` absent (W-A.2 creates it) |
| B12-G3 · the declaration residue (built in W-C.2) | `test "$(git grep -ci shadcn -- src \| awk -F: '{s+=$2} END {print s+0}')" -eq 0` | exit 0 | **exit 1**: 27 |

The IDIOM-CLEARED column's terminal is LEDGER:163 (`#64b`). B12-G2 and B12-G3 enact it.

## 6 · π and DELTA obligations

None.

## 7 · MIGRATION rows

None.

## 8 · Ledger rows

GAP-B2b (RETIRE); #64's idiom half. #64's randomness half is W-C.5's (GAP-B2a).
