# D1 pass 4, step 1: route B's chain rebased on HEAD's code

Model: claude-opus-5-5, asserted from the seat's own identity. This is REGISTRY §P3-8.2 step 1.
Route B's chain (`pass-3/B-kit`) was re-derived on HEAD's code (glass-ui 10.1.0) and recorded as
`pass-4/B-kit`. Every number below comes from a command this seat ran. Each rests on a file under
`pass-4/B-kit/results/rebase/`.

## In brief

- **Base.** HEAD `19bf6569` (docs-only after `d8bda2a9`, 10.1.0). Its code digest is
  `35f7b831fe810aac…` over 1,327 files. Pass 3's base was `99839631`, digest `5080bcad…`.
- **Chain.** 45 steps, pass 3's 44 plus one new row, **S1c**.
- **Final code digest:**
  `472cf49336969d4f72142e1bf9b9aed8f79a9c49800c03ef6d500c81c0fd16b0` over 1,434 files.
  - Replayed from the committed-path kit on two fresh HEAD worktrees, each with `--twice`
    (172.9 s and 196.6 s). Every step matched, and every second application was a no-op.
  - Both runs ended `chain final MATCH`, and a third run reported `the chain is applied` (0.2 s).
  - The derivation tree held the same digest.
- **Changes against pass 3.** 42 of the 44 shared steps are byte-identical in their frozen
  move lists or row ops (`results/rebase/rebase-diff.txt`). Two differ, S12 and S13, and in each
  only a pin changes, because of the one name 10.1.0 added. S1c is new.
- **Toolchain, on the migrated tree:** GREEN except `verify:package`.
  - GREEN: `vite build`, both `vue-tsc` programs, `demo:dist:build`, `entries` PASS,
    `surface` 0 differences, `gates.mjs` F-1/F-3/F-4/F-9 PASS.
  - `verify:package` is RED: 2,926,602 > 2,919,057.
- **Gate:** 14 of 17 GREEN, with B0 450, B2 71 and **B6 62**. Pass 3 had B6 61; the new line is
  `Configurator.vue` at 508 lines.
- **Tests.** `vitest run` gives 240 files, 239 passed; 2,329 tests, 3 failed. The 3 failures
  are exactly the RED clauses.

## 1 · What changed on the base

`git diff 99839631 HEAD` outside `docs/` touches 12 files:

- the configurator code: `Configurator.vue`, `ConfiguratorLayer.vue`, `index.ts` and
  `styles.css`;
- two existing tests under `tests/components/custom/configurator/`;
- the demo story `demo/stories/containers/configurator.vue`;
- `src/index.ts` (it re-exports `type ConfiguratorLayout`);
- `CHANGELOG.md`, `package.json`, `package-lock.json` and `.bundle-ratchet`
  (2,916,129 → 2,919,057).

No file was added, removed or renamed, so each configurator file meets the same law in the same
place it had in pass 3.

## 2 · How the chain was re-derived

The kit was copied, and each step was re-run with the tool that derives it, in pass 3's order.
`derive/chain.sh` records the commands:

- **Computed steps re-run their tool on the tree as it stands:** placement, carve, CSS doors, JS
  doors, splits, colocation, test doors, consumer entries, the surface pin and the gate pin.
- **Authored steps re-run their authored input:** through `derive/edits.mjs` or
  `derive/apply-moves.mjs`.

Nothing was edited by hand. What this seat added to the kit:

| file | why |
|---|---|
| `derive/chain.sh` | The derivation record: one command per step, in order. Pass 3 had none, and a seat before the outage lost its scratch driver. |
| `derive/reland.mjs` + `authored/gate-lands/S13,S25,S27,S31.json` | `land-gate.mjs` lands the kit's current gate text (pass 3's S31 text) at the post-S19 paths. S13 landed an earlier text at `scripts/structure/seal.mjs`, and S15 reads that S13 gate. The gate text at each land is therefore authored input: the exact-text ops pass 3's row made to the gate files, without the pin, plus the pin's reviewed half as it stood then (S13: one hold; S25 on: the `resolve.mjs` hold added). The pin's computed half (modules, doors) is recomputed on this tree. |
| `derive/base-repin.mjs` + `authored/base-surface.json` | **S1c** (§3). |
| `tools/rebase-diff.mjs` | Compares each step with pass 3's step of the same id. |
| `lib/sequence.mjs`, `replay.mjs` | Only the chain's note and the usage path now say pass 4. |
| `results/rebase/` | The evidence. Pass 3's `results/verification.md` is removed from this kit; it described pass 3's tree. |

## 3 · The new step, S1c

The floor's surface pin (`floor/records/surface-pin.json`, which fd11 lands at
`scripts/structure/records/`) was recorded on 10.0.1 code.

On HEAD with the floor rows applied, `surface.mjs check` gives 2 differences:
`. types: + ConfiguratorLayout` and `./configurator types: + ConfiguratorLayout`. `gates.mjs`
F-9 FAILs on them before any route move. S12's `repin.mjs` refuses all growth, so without a base
row the chain stops at S12.

S1c re-pins the floor base to its own surface:

- It admits only growth that `authored/base-surface.json` ties to a release commit
  (`9065d924`, O-75).
- It stops on any loss or on any other growth.
- It changes only the pin record.

**S1c belongs to the floor.** When the floor re-records its pin on the moved base, S1c leaves the
chain. That is an open gap for the P4-F seat (§6).

## 4 · Steps whose output changed against pass 3

The per-step digests all differ, because the base moved. What matters is the frozen output
(`results/rebase/rebase-diff.txt`).

| step | pass 3 → pass 4 | why |
|---|---|---|
| S1c | — → new row, 1 file | §3 |
| S12 | surface-pin row, ops differ | The losses are the same 60, each named by a MIGRATION row, with 0 growth. The pinned text differs because the base pin now holds `ConfiguratorLayout`. The migrated surface is 583 runtime and 1,241 type names (pass 3: 1,239), and the +2 is that one name on two entries. |
| S13 | seal pin: 1,232 → 1,233 door names | `src/components/configurator/index.ts` carries `ConfiguratorLayout`. Modules (130) and reviewed names (2) are identical, and the gate text is identical. |
| S25, S27, S31 | same ops | Their pin hunks apply unchanged. The totals inherit the one name: 1,288 / 1,288 / 1,287, against pass 3's 1,287 / 1,287 / 1,286. |

Every other step is **SAME**:

- **Placement:** S2 3 passes, 19/2/1 moves.
- **Carve:** S3, 85 moves.
- **CSS:** S4a 63 moves, S4b, S4c 42+2 files.
- **Doors:** S5-1 200 files, S5-2 1.
- **One-door:** S8, 20 files.
- **Colocation:** S15 71 moves with 55 stays, S24 59 moves, S26 23 moves, 0 stays.
- **Consumer entries:** S29, 103 edits and 52 residue lines.

Why the configurator changes moved nothing:

- The two changed configurator tests were already homed by pass 3's S15 (to
  `src/components/configurator/__tests__/`).
- Every re-derived row that touches an edited file came out with the same ops, and each hunk
  matches exactly once on the 10.1.0 text (the rows applied, and `--twice` held).
- S29's consumer reading of the story is unchanged: the same 103 edits and 52 residue lines.

## 5 · The migrated tree

| check | result | pass 3 |
|---|---|---|
| code digest | `472cf493…16b0`, 1,434 files | `62878b7f…51e1cc`, 1,434 |
| seal | B0 450, B2 71, **B6 62**, all else 0 (pin: 135 modules) | B0 450, B2 71, B6 61 |
| B6's new line | `src/components/configurator/Configurator.vue: 508 lines > 500` (10.1.0 added 48 lines). `styles.css` is at 591 lines. | — |
| F-1 | 7,619 edges, 0 violations | 7,617 |
| cascade (`verify` against a floor-base snapshot) | `./styles` 1,970 = 1,970 rules, class reorder, first divergence at rule 141 (`.accent-tone`, the S4b rung); `./styles/fonts`, `./styles/theme` and `./styles.css` identical | 1,964 = 1,964, same divergence |
| `vitest run` | 3 failed of 2,329 (seal B0, B2, B6) | 3 failed of 2,323 |
| floor base (HEAD + S1) `verify:package` | shrink: 2,913,546 < 2,919,057 (−5,511, the floor row §P3-5 names) | 2,910,618 < 2,916,129 |
| migrated `verify:package` | increase: 2,926,602 > 2,919,057 | 2,923,674 > 2,916,129 |
| **route B's package row** | **+13,056 B over the floor base** | +13,056 B |

The ratchet rows in §P3-5, re-measured on the pass-4 base, are:

- floor: −5,511 B;
- route B: +13,056 B.

Both are unchanged from pass 3, and both remain owed to P4-R3.

## 6 · Open gaps

1. **S1c is floor work in the route's chain.** The floor's surface pin predates 10.1.0. Every
   route's chain needs S1c until the floor re-records its pin, and when it does, S1c leaves B's
   chain.
2. **The chain depends on the floor rows as committed now.** `replay.mjs` runs
   `floor/rows/apply.mjs` from the checkout. P4-F1..F7 will change the floor rows, including
   P4-F1, which takes S21 out of the chain. After that, this chain's S1 digest no longer matches,
   and step 4 must re-derive from the floor's new cut (`derive/chain.sh` does it in about 6
   minutes).
3. **B6 grew by one file.** `Configurator.vue` (508 lines) joins R-5's list. It is B-S11's work
   (B-10).
4. **F-10 browser pair not re-run on the rebased tree.** The cascade's only reorder is pass 3's
   S4b rung, which is also B-08's open item.
5. **The 3 RED clauses and every open item in §P3-9 are unchanged.** This step re-records the
   chain; it closes nothing.
6. **Nothing is committed.** The kit is written under `pass-4/B-kit/` untracked. §P3-8.2 asks
   that it be committed before any seat judges it. The replay above ran from the checkout paths
   the commit will hold.

## 7 · Replay command

```
git -C <checkout> worktree add --detach <wt> HEAD
ln -s <checkout>/node_modules <wt>/node_modules
ln -s <checkout>/tests-visual/node_modules <wt>/tests-visual/node_modules
node <checkout>/docs/tranches/BL/design/structure/pass-4/B-kit/replay.mjs --root <wt> --twice
```

The expected result is `472cf49336969d4f72142e1bf9b9aed8f79a9c49800c03ef6d500c81c0fd16b0` over
1,434 files, 45 steps.
