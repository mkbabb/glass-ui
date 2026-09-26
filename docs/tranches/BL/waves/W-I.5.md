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
| #48 W-DOCK-FISSION | fission, the V↔H morph and Siri read retired in code (`GlassDock.vue:19-20`, `:542-543`; `dock/index.ts:105-111` records them DEFINITION-ABSENT) and OPEN in BK; 16 lines in the dock and its motion token still name fission or Siri. Decided here by D2's Q-9 |
| the zero-width morph window | goes with #48 (LEDGER:117) |

## 2 · The defect at HEAD

`git grep -niE 'fission|siri([^a-z]|$)' -- src/components/dock src/styles/tokens/scroll-tokens.css | wc -l` → **16** at `be1969ea` (fix-3): `GlassDock.vue` 3, `dock/composables/index.ts` 3, `dock/index.ts` 6, `dock/styles/index.css` 2, `dock/styles/shape.css` 1, `tokens/scroll-tokens.css:91` 1 (the dock-morph register's comment). The records disagree with the code: the facilities are retired in `GlassDock.vue` and open in the register.

The subject is the dock's. The other 117 lines in `src` that name fission are not this wave's: the blob's satellite fission (107 lines, `blob/**`, including the published `fissioning?: boolean` at `blob/types.ts:44`) is W-G.5's greenfield physics, and DotRing's fission scalar (9 lines, `DotRing.vue`, `dot-ring.css`, and `property-regs.css:256`) is its own animation vocabulary under W-B.8's export decision. This wave neither touches nor gates them. (`siri\b` is not used: this `git grep -E` does not honour `\b` and matches 0 lines; `siri([^a-z]|$)` matches the 7 Siri lines.)

## 3 · The ruling and the cure

D2's Q-9 has two options: (a) strike all three everywhere, records included; (b) revive the V↔H morph on D2-B′ and strike the rest (`design/dock/REGISTRY.md:303`). 9 of 9 consumer mounts are horizontal (K-1), so D2's stated default is (a). This wave lands D2's converged ruling:

- under (a): every `src` line naming fission or Siri goes (code, comments and types), and the #48 row reads RETIRE with the ruling quoted;
- under (b): the V↔H morph is built on the converged carrier with a witness row D2 adds, and fission and Siri go as under (a).

## 4 · Files it touches

`src/components/dock/**` and `src/styles/tokens/scroll-tokens.css` (the 16 lines; the list is `git grep -nliE 'fission|siri([^a-z]|$)' -- src/components/dock src/styles/tokens/scroll-tokens.css`), `src/components/dock/README.md`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD |
|---|---|---|---|
| I5-G1 · retired facilities struck | `! git grep -qniE 'fission\|siri([^a-z]\|$)' -- src/components/dock src/styles/tokens/scroll-tokens.css` | exit 0 | **exit 1**: 16 lines (fix-3, `be1969ea`) |
| I5-G2 · the V↔H morph (only under Q-9 (b)) | D2's witness row for the orientation morph, both engines | PASS | the witness does not exist at HEAD (RED by absence); under (a) the row is not written and the gate is recorded "retired with Q-9 (a)" |

## 6 · π and DELTA obligations

None under (a): no paint changes. Under (b), D2's orientation-morph filmstrip, both engines, under `.cache/evidence/W-I.5/`.

## 7 · MIGRATION rows

The dock's fission and Siri surfaces are already absent from the published dock surface (`dock/index.ts:105-111`), so under (a) the sweep removes comments only and adds no MIGRATION row. The blob's `fissioning?` type is outside the gate's paths and is not removed here. Under (b) the revived V↔H morph is additive: its published names are listed as additions in the 11.0.0 section, with no removal row.

## 8 · Ledger rows

Closes #48 (decided here by D2's Q-9).

## 9 · Gestalt passes (P-1)

- **Tranche fit:** the dock's records and code say the same thing.
- **Wave:** I5-G1 green (and I5-G2 under (b)).
- **Feature:** `git grep` for the three facilities returns what D2 ruled, and nothing else.
