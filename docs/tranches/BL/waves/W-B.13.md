# W-B.13 · Trusted Publisher, then one auth path: the `NPM_TOKEN` secret and the `release.yml` env pair deleted · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree; `npm view` and `gh secret list` read at seat time |
| ships in | 11.0.0 (the first OIDC publish is the 10.2.0 or 11.0.0 tag, whichever follows the owner act) |
| families | F-13, the C-1 and C-3 split (member L04-F17) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| ruler | the owner for OW-1 and OW-2 (acts on npmjs.com and GitHub); seat for the `release.yml` edit |

## 1 · What it closes

| id | item |
|---|---|
| C-1, OW-1 | enable the npm Trusted Publisher for `@mkbabb/glass-ui` |
| C-3, OW-2 | delete the `NPM_TOKEN` secret after the first OIDC publish; the paired `release.yml:65-66` `env:` edit is glass-ui's |
| E-1's dual auth path | the publish step keeps two auth paths until then (`census-carries-recap.md:28`) |

Rotation is waived by the owner ("No rotation necessary", `CHARTER.md:9`; C-2 and N-4 are closed ANSWERED/DECLINE in the ledger).

## 2 · The defect at HEAD

- **Published by a user token.** `npm view @mkbabb/glass-ui@10.1.0 _npmUser` → `mkbabb <mike7400@gmail.com>`, not the GitHub Actions OIDC identity. The tarball carries SLSA provenance (`dist.attestations.provenance.predicateType` → `https://slsa.dev/provenance/v1`) because `--provenance` works with a token too; provenance is not the question, the credential is.
- **Two auth paths in the workflow.** `.github/workflows/release.yml:64-66`: `npm publish --ignore-scripts --access public --provenance` with `env: NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}`; `id-token: write` at `:31`; npm ≥ 11.5.1 at `:61-62`. npm tries OIDC first and falls back to the token (`:17-18`).
- **The secret exists.** `gh secret list` → `NPM_TOKEN	2026-09-17T20:26:20Z`.
- **A transitional paragraph.** `release.yml:13-20` ("[2026-09-22 · BK register wave N-5] TRUSTED PUBLISHING …") describes the interim state and carries a dated bracket (E-10).

## 3 · The cure

1. **Step 0, the owner act (OW-1).** npmjs.com → `@mkbabb/glass-ui` → Settings → Trusted Publisher → GitHub Actions: user `mkbabb`, repository `glass-ui`, workflow `release.yml`, environment blank → Set up connection. Recorded in the owner docket with the date.
2. **Step 1, the first OIDC publish.** The next tag publishes through `release.yml` unchanged. The wave reads `npm view @mkbabb/glass-ui@<that version> _npmUser` and requires the GitHub Actions identity. If it still reads `mkbabb`, the token was used: stop, fix the connection, do not delete anything.
3. **Step 2, one path.** In one commit: `release.yml` drops the `env:` pair at `:65-66` and the paragraph at `:13-20` (the file's remaining header is W-C.2's). Then the owner deletes the `NPM_TOKEN` secret (OW-2), or authorizes the seat to run `gh secret delete NPM_TOKEN`. The order is fixed: the secret goes after the edit lands, so no tag runs with the env line reading a missing secret.
4. If OW-1 has not happened by W-L.8, this wave's terminal is "step 0 not done: OW-1", every gate below RED as measured, and nothing is re-booked (PLAN §1).

## 4 · Files it touches

`.github/workflows/release.yml`; `docs/tranches/BL/LEDGER.md` (C-1, C-3, OW-1, OW-2).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B13-G1 · OIDC publisher of record | `V=$(node -p 'require("./package.json").version'); test "$(npm view @mkbabb/glass-ui@$V _npmUser.name)" = "GitHub Actions"` | exit 0 | **exit 1**: `mkbabb` for 10.1.0 |
| B13-G2 · no token env in the workflow | `! grep -n NODE_AUTH_TOKEN .github/workflows/release.yml` | exit 0 | **exit 1**: `:18` (prose) and `:66` |
| B13-G3 · no secret | `! gh secret list \| grep NPM_TOKEN` | exit 0 | **exit 1**: `NPM_TOKEN 2026-09-17T20:26:20Z` |
| B13-G4 · no interim paragraph | `! grep -ni 'TRUSTED PUBLISHING' .github/workflows/release.yml` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 3 lines in 1 file, first `release.yml:13`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1**: `:13` |
| B13-G5 · ordering | B13-G2 passes on a commit whose tag published with B13-G1 green before B13-G3 is run | the ledger row cites both commits and the `npm view` reading | — |

B13-G2 and B13-G4 can pass by editing the file alone; B13-G1 is the gate that proves the path works, and the ordering in §3 is what keeps the next cut from breaking.

## 6 · π and DELTA obligations

None: no visual surface.

## 7 · MIGRATION rows

None: the published package is unchanged.

## 8 · Ledger rows

C-1, C-3, OW-1, OW-2; E-1's token-beside-OIDC item (`CENSUS.md:167`).
