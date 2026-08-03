# Candidate freeze manifest

This manifest and `CHALLENGES.md` are append-only audit metadata, excluded from the normative digest.
The retained tar is the reconstructable byte snapshot; auditors do not need the moving working tree.

## Candidate 1

- Glass HEAD: `562db5c7429373220a4f1ec4e67470d65fcdbd91`
- Normative digest: `2b3f15c74839f9585800fa721dca47b3eaf26e973460a5722f4616561c52d9f1`
- Archive: `snapshots/candidate-1-normative.tar`
- Archive SHA-256: `e1aeaf597d5e3a1996c5a93925d2b8de2e3e22c1f28d30e5ed65fb990da73f14`
- Archive format: uncompressed `ustar`; twelve paths in the canonical order below.

### Per-file hashes and canonical order

| SHA-256 | path |
| --- | --- |
| `fbe365951618db0c67d4625dd518645b14ade34a33b9eeddbec3e69ef6af4ee5` | `docs/tranches/BJ/ASK.md` |
| `9a415f0159228feedb993644a79e87007557c25b8a2e8ec3292ddb535f12b5d0` | `docs/tranches/BJ/PLAN.md` |
| `effee5694efc3d6bf391ca040751a3894ee59e77b6b207b9fd80459d4aa68622` | `docs/tranches/BJ/EXECUTION-PROGRESS.md` |
| `8123daa4ce53721d7865ac12557313a253914348f26d668f85373f5d368bbe4c` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GOAL.md` |
| `a6e897f7eda1d5970dba6e79d19144f699439746abdf8982573844841146f034` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/INVENTORY.md` |
| `576b885a57b2acaf6105e4b5bcf5f90de1d3caa7c084a8e6843e5dd0a9780ff1` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REGISTRY.md` |
| `e1a2096442116a38b0d0be1b3cc8377e81c6800110606ec9869adf508aa970b2` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/VISUAL-HARDENING.md` |
| `e5294d811d486558a587b0589566f4583c1274c3ffe988398850496ef3dd7931` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATES.md` |
| `2ba7c0d8ab6780d653351074cecc8b8e354b6a49c6d683f512e685d72292242f` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/COORDINATION.md` |
| `73d06f6e5e56ef78bd2ebd33179ad0f6aed1811823c11689e80cb1a02ce2fd2a` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REJECTIONS.md` |
| `b1d2d334ae2afa231f000c929b5a7ee11d9e7dbbe436f0fe807df09791560831` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/RESEARCH.md` |
| `1a4d4d58abcd22b6253cc2c3986721df97597baa29dac149eb5c0f1e7b66191b` | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/ROW-CHALLENGE-MATRIX.md` |

### Digest recipe

From the repository root, run this exact ordered command against either the working files or files
extracted from the retained archive:

```sh
shasum -a 256 \
  docs/tranches/BJ/ASK.md \
  docs/tranches/BJ/PLAN.md \
  docs/tranches/BJ/EXECUTION-PROGRESS.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GOAL.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/INVENTORY.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REGISTRY.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/VISUAL-HARDENING.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATES.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/COORDINATION.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REJECTIONS.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/RESEARCH.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/ROW-CHALLENGE-MATRIX.md \
  | shasum -a 256
```

The `shasum` output lines—including their single-space separator and relative paths—are the bytes
fed into the outer SHA-256. No newline normalization is performed.

## Candidate 2 planned recipe — NOT FROZEN

Candidate 2 has no normative digest, archive, archive hash, or per-file hashes yet. This section
defines the exact future recipe; it does not confer candidate or release acceptance. The canonical
order is:

1. `docs/tranches/BJ/ASK.md`
2. `docs/tranches/BJ/PLAN.md`
3. `docs/tranches/BJ/EXECUTION-PROGRESS.md`
4. `docs/tranches/BJ/waves/BAND-REDUCTION.md`
5. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GOAL.md`
6. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/INVENTORY.md`
7. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REGISTRY.md`
8. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/VISUAL-HARDENING.md`
9. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATES.md`
10. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/COORDINATION.md`
11. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REJECTIONS.md`
12. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/RESEARCH.md`
13. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/ROW-CHALLENGE-MATRIX.md`
14. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/EXEMPLAR-RECONCILIATION.md`
15. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/EXEMPLAR-CRIT-ADJUDICATION-C2.md`
16. `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/IMPLEMENTATION-ASKS-C2.md`

`FREEZE-MANIFEST.md`, `CHALLENGES.md`, critic reports, browser reports, Claude reconciliation and
receipt reports, untouched-wave reports, W6 moving-critic reports, and other audit metadata remain
outside the normative bytes. Before a freeze, record the exact Glass HEAD, tree identity, porcelain
status hash, tracked diff hash, and sorted untracked-file hash. A dirty tree is not made clean by
hashing it; these receipts only make the input reproducible and must accompany the candidate ruling.

Run the following state-receipt recipe only after every repository/audit writer has quiesced and the
sixteen normative files have received their final write. The receipt directory is outside the
repository. `FREEZE-MANIFEST.md` and the not-yet-declared archive are excluded to avoid a
self-reference. Status bytes use Git's native porcelain-v1 order in the C locale; they are not sorted.
Working-tree and cached binary diffs are independent receipts. The untracked path list is C-locale
sorted, and the content manifest hashes those paths in that exact order.

```sh
freeze_receipt_dir="$(mktemp -d)"

git rev-parse HEAD > "$freeze_receipt_dir/HEAD"
git rev-parse 'HEAD^{tree}' > "$freeze_receipt_dir/HEAD.tree"

LC_ALL=C git -c core.quotePath=true status \
  --porcelain=v1 --untracked-files=all --no-renames -- \
  . \
  ':(exclude)docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/FREEZE-MANIFEST.md' \
  ':(exclude)docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/snapshots/candidate-2-normative.tar' \
  > "$freeze_receipt_dir/status.porcelain-v1"

git diff --binary --full-index --no-ext-diff --no-textconv -- \
  . \
  ':(exclude)docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/FREEZE-MANIFEST.md' \
  ':(exclude)docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/snapshots/candidate-2-normative.tar' \
  > "$freeze_receipt_dir/worktree.patch"

git diff --cached --binary --full-index --no-ext-diff --no-textconv -- \
  . \
  ':(exclude)docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/FREEZE-MANIFEST.md' \
  ':(exclude)docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/snapshots/candidate-2-normative.tar' \
  > "$freeze_receipt_dir/index.patch"

git ls-files --others --exclude-standard -- \
  . \
  ':(exclude)docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/FREEZE-MANIFEST.md' \
  ':(exclude)docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/snapshots/candidate-2-normative.tar' \
  | LC_ALL=C sort \
  > "$freeze_receipt_dir/untracked.paths"

while IFS= read -r freeze_untracked_path; do
  shasum -a 256 "$freeze_untracked_path"
done < "$freeze_receipt_dir/untracked.paths" \
  > "$freeze_receipt_dir/untracked.content-manifest"

wc -l \
  "$freeze_receipt_dir/status.porcelain-v1" \
  "$freeze_receipt_dir/untracked.paths"

shasum -a 256 \
  "$freeze_receipt_dir/HEAD" \
  "$freeze_receipt_dir/HEAD.tree" \
  "$freeze_receipt_dir/status.porcelain-v1" \
  "$freeze_receipt_dir/worktree.patch" \
  "$freeze_receipt_dir/index.patch" \
  "$freeze_receipt_dir/untracked.paths" \
  "$freeze_receipt_dir/untracked.content-manifest"
```

Copy the two counts, HEAD/tree values, and all seven hashes into the Candidate-2 declaration. If any
repository byte changes after this recipe—including audit metadata—discard every receipt and rerun it;
the manifest itself may then record the receipts because it is excluded from their input.

From the repository root, the future normative digest must be computed with this exact ordered
command:

```sh
shasum -a 256 \
  docs/tranches/BJ/ASK.md \
  docs/tranches/BJ/PLAN.md \
  docs/tranches/BJ/EXECUTION-PROGRESS.md \
  docs/tranches/BJ/waves/BAND-REDUCTION.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GOAL.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/INVENTORY.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REGISTRY.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/VISUAL-HARDENING.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATES.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/COORDINATION.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REJECTIONS.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/RESEARCH.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/ROW-CHALLENGE-MATRIX.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/EXEMPLAR-RECONCILIATION.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/EXEMPLAR-CRIT-ADJUDICATION-C2.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/IMPLEMENTATION-ASKS-C2.md \
  | shasum -a 256
```

The retained archive must be created in the same order and without compression:

```sh
tar --format ustar -cf \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/snapshots/candidate-2-normative.tar \
  docs/tranches/BJ/ASK.md \
  docs/tranches/BJ/PLAN.md \
  docs/tranches/BJ/EXECUTION-PROGRESS.md \
  docs/tranches/BJ/waves/BAND-REDUCTION.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GOAL.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/INVENTORY.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REGISTRY.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/VISUAL-HARDENING.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATES.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/COORDINATION.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REJECTIONS.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/RESEARCH.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/ROW-CHALLENGE-MATRIX.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/EXEMPLAR-RECONCILIATION.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/EXEMPLAR-CRIT-ADJUDICATION-C2.md \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/IMPLEMENTATION-ASKS-C2.md

shasum -a 256 \
  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/snapshots/candidate-2-normative.tar
```

Before declaring the freeze, list the archive and extract it into a fresh temporary directory; verify
all sixteen paths, their order, their per-file hashes, the outer normative digest, and the archive
hash against the manifest. Any normative edit after those receipts invalidates the candidate and
requires a complete re-freeze.
