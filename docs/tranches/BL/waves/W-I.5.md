# W-I.5 · the retired dock facilities, decided (loop D2) · 11.0.0

| field | value |
|---|---|
| seat | formation fix seat 2 (`formation-audit/fix-2.md`, FA-21); the item and its gate move here from W-I.1 (§3.3 item 7, G20) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `183e021a` (fix-2's reading of G1); W-I.1's readings at its seat |
| ships in | 11.0.0 |
| loop | D2 dock. Q-9 is D2's question (`design/dock/REGISTRY.md:303`); this wave lands its ruling |
| families | F-16 split: #48 W-DOCK-FISSION, a disease row (OPEN at three closes, LEDGER:117) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| #48 W-DOCK-FISSION | fission, the V↔H morph and Siri read retired in code (`GlassDock.vue:19-20`, `:542-543`) and OPEN in BK; 130 lines in `src` still name fission or Siri. Decided here by D2's Q-9 |
| the zero-width morph window | goes with #48 (LEDGER:117) |

## 2 · The defect at HEAD

`git grep -niE 'fission|siri\b' -- src | wc -l` → **130** at `183e021a` (fix-2; W-I.1 read the same). The records disagree with the code: the facilities are retired in `GlassDock.vue` and open in the register.

## 3 · The ruling and the cure

D2's Q-9 has two options: (a) strike all three everywhere, records included; (b) revive the V↔H morph on D2-B′ and strike the rest (`design/dock/REGISTRY.md:303`). 9 of 9 consumer mounts are horizontal (K-1), so D2's stated default is (a). This wave lands D2's converged ruling:

- under (a): every `src` line naming fission or Siri goes (code, comments and types), and the #48 row reads RETIRE with the ruling quoted;
- under (b): the V↔H morph is built on the converged carrier with a witness row D2 adds, and fission and Siri go as under (a).

## 4 · Files it touches

`src/components/dock/**` (the 130 lines; the list is `git grep -nliE 'fission|siri\b' -- src`), `src/components/dock/README.md`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD |
|---|---|---|---|
| I5-G1 · retired facilities struck | `! git grep -qniE 'fission\|siri\b' -- src` | exit 0 | **exit 1**: 130 lines (fix-2) |
| I5-G2 · the V↔H morph (only under Q-9 (b)) | D2's witness row for the orientation morph, both engines | PASS | the witness does not exist at HEAD (RED by absence); under (a) the row is not written and the gate is recorded "retired with Q-9 (a)" |

## 6 · π and DELTA obligations

None under (a): no paint changes. Under (b), D2's orientation-morph filmstrip, both engines, under `.cache/evidence/W-I.5/`.

## 7 · MIGRATION rows

Any published name the sweep removes (a prop, type or class naming fission or Siri) gets a row: removed, no successor (Q-9 (a)).

## 8 · Ledger rows

Closes #48 (decided here by D2's Q-9).

## 9 · Gestalt passes (P-1)

- **Tranche fit:** the dock's records and code say the same thing.
- **Wave:** I5-G1 green (and I5-G2 under (b)).
- **Feature:** `git grep` for the three facilities returns what D2 ruled, and nothing else.
