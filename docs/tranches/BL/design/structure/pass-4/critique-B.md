# D1-B pass 4 · critique

Seat: fresh adversarial critic, model claude-opus-5-5, asserted from the seat's own identity. Authored nothing in passes 2-4. Checklist: REGISTRY §P3-9, 27 items, frozen. Every number comes from a command this seat ran; outputs are in `critique-B/results/RESULTS.md`.

**Verdict: ADVANCE, not converged.** 24 of 27 closed (88.9%). Open: S-14, B-01, B-10. Nothing that entered pass 4 closed was re-opened. The route claimed S-14 CLOSED; this seat refutes it with two live counterexamples on the replayed tree.

## 1 · Order of work

1. Read REGISTRY §P2-6.4, §P2-6.5, §P3-8, §P3-9 and RULINGS.md. Wrote the battery under `critique-B/battery/` (plants, probes, command probes, the cascade reorder plant) and hashed it (`BATTERY-HASH.txt`: `35de4803…`) before opening `pass-4/B-kit/` or `B-proto.md`.
2. One amendment after the hash and before any verdict: a hard `find("Sheet.vue")` threw before the first plant ran. The fix makes that lookup optional and changes no plant (amended hash `08a0ec97…`). Two plants that could not issue as written on this tree were re-issued in `tools/extra-plants.mjs` (see §5).
3. Replayed the chain from committed bytes only: a pristine HEAD worktree supplied the kit and floor, and a second fresh HEAD worktree took the replay.

## 2 · Replay: the digest is confirmed

`replay.mjs --twice` from the base `35f7b831…`: 51 steps, each applied twice without a change, final code digest **`6618df1f7d2f5a0c657e4b1d14f61203e83e5b8164463abdb479f0432ca8685c` over 1,437 files, MATCH**. A rerun prints "the chain is applied" (0.7 s). A tree cut with the floor rows alone reads `a974a609…`, the chain's S1 digest, so the cascade and browser base below is the chain's own floor base.

Gate on the replayed tree: `FAIL B0 444 · FAIL B2 67 · FAIL B6 62`; the other 15 clauses are 0. This equals B-proto.

## 3 · The door ruling, measured (§P3-4, B-12)

**Battery catches.** The §P3-8.4 plants that §P3-4 asked the battery to put to the doors:

| plant | caught by |
|---|---|
| K-INT: unit file reads a kernel module's interior past its door | B1 |
| K-INT-T: the same, type-only | B1 |
| N-INT: `dock/search` reads `dock/legibility`'s interior file | B1 |
| T-CYC: type-only cycle chip ↔ badge through doors | B4 |
| T-CYC-N: type-only cycle between two nested dock modules | B4 |
| K-DOOR-L: legal, through the kernel door | clean |

All 5 plants are caught, and the legal control is clean. G's law has no kernel door and no module-grain cycle clause, so these are catches the doors buy. §P3-4's re-trigger condition for G ("if they buy nothing") does not fire.

**Cost** on the replayed tree, counting door files in the sealed zones:

| class | doors | bytes |
|---|---:|---:|
| kernel | 54 | 68,973 |
| unit roots | 71 | 35,995 |
| nested | 24 | 7,902 |
| aggregators | 3 | 23,446 |
| scripts | 5 | 2,351 |
| **total** | **157** | **138,667** |

The same measure on pass 3's tree was 158 doors and 141,307 B. The package bytes of the doors come from B's `pack-diff.json`, which this seat did not re-measure: door declarations +2,175 B, CSS doors +397 B.

B-proto §4's "35 avoidable doors" uses the eponym rule alone. It is not the class set §P3-4 measured (77), so the two numbers are not comparable.

## 4 · Checklist

| item | verdict | measurement (this seat) |
|---|---|---|
| S-01 | CLOSED | kit and floor committed at `648e075d`; replay from committed bytes MATCH |
| S-02 | CLOSED | B8 0, B9 0; K-REEX (a kernel door re-exports a unit) caught by B8/B9/B11 |
| S-03 | CLOSED | P3-R3: the only kind slot over 12 is `dock/__tests__` 16, the route's reported counterexample (`isSlot("tests/styles")` is false, so that dir is R-5's, under B-01). SLOT-13 and SLOT-501 caught. P3-R5: 69 keys, `./aurora-config` present. P3-R6: `isTeleportedTarget.ts` in `dock/composables/`. P3-R9/P4-R3: both arms measured, (a) exit 1 `2930810 > 2919057`, (b) exit 0 CLEAN |
| S-04..S-08 | CLOSED | build 0, demo build 0, typecheck 0; SELF (B0) and WALK (B0) caught |
| S-09 | CLOSED | `--twice` MATCH, rerun a no-op; the gate leaves the tree unchanged |
| S-10 | CLOSED | FD-5 runs inside every engine step of the replay, and no step refused. FD-4: the reorder plant (accent-tone after the glass-chip sheet) reads RED under the route's own listing: `RISK ./styles [--accent-band-strength] .accent-tone × .glass-chip`. The migration itself: unlisted RED at 610, listed GREEN (1,818 pairs, 0 risks) |
| S-11 | CLOSED | vitest 240 files. The only standing reds are seal B0/B2/B6; the other failures are 5 s timeouts at load ~60 and the fixed-sleep menu test, 72/72 at 60 s |
| S-12 | CLOSED | the F-10 seat on base and migrated trees, chip band plus π floor: 37 tests each, 22 passed on both, 0 new failures; `zz-chip-band` passes on both |
| S-13 | CLOSED | not re-opened |
| **S-14** | **OPEN** | The §P3-8.4 forms are caught (MASK-RET, MASK-RETN, MASK-CATCH, MASK-CATCH-D → B17), and `vite.utility-emit.ts` has 0 guards. But the tree still holds both kinds in shapes B17 does not see, and the gate reads 0 for them. See below |
| **B-01** | **OPEN** | B0 444, B2 67, B6 62. Same-dir cycles are counted: F-CYC and F-CYC-T give B4 |
| B-02 | CLOSED | K-REEX, D-DUAL caught (B9) |
| B-03 | CLOSED | SELF caught (B0) |
| B-04 | CLOSED | T-OUT and T-WRONG caught (B16); T-OWN-L clean |
| B-05 | CLOSED | X-SCR (a scripts lib file read by one other module) gives B10 |
| B-06 | CLOSED | B13 0, not re-opened |
| B-07 | CLOSED | `tests/utils`, `demo/misc` and `tests-visual/v2` each give B15; X-FOREIGN (`slider/useChipGlow.ts`) gives B15; 0 placeholder names in five zones; `slider/useDockHold.ts` is pin-reviewed with a reason (B15's stated exception) |
| B-08 | CLOSED | `src/styles/glass/accent-tone.css` at its HEAD rung; cascade value-identical on the chip band (no accent-tone divergence; the reorder plant shows the judge would see one); chip-paint specs and the readback spec run, 0 new failures |
| B-09 | CLOSED | G-RULE and TH-RULE give B14 |
| **B-10** | **OPEN** | B-S11: 56 files over 500 lines, none split and no per-file counterexample. B-S16: `tests-visual` 177. B-S12: B0 444. B-S14: B2 67. B-S10 and B-S15 are done |
| B-11 | CLOSED | `--pin` and `--no-pin` are refused as unknown options; one path, `records/seal-pin.json` |
| B-12 | CLOSED | §3 |
| B-13 | CLOSED | not re-opened |

**Count: 27 items, 24 closed, 3 open.** Convergence 24/27 = 0.889. Of the route's 7 claimed closures, this seat confirms 6 and refutes S-14.

### S-14's counterexamples

Both are replayable plants in `tools/extra-plants.mjs`, and both shapes are live on the tree (and were already at HEAD).

- **X-TERN-LIT, MISSED.** `existsSync(<literal>) ? readFileSync(<literal>) : ""`. The live instance is `scripts/profile-bundle.mjs:292`: `return existsSync(target) ? … readFileSync(target) … : m;`. A missing sibling sheet leaves the `@import` text in place, and the byte budget silently measures a shorter draw. This is a silent return on a missing file.
- **X-FNVAL-D, MISSED.** `const c = () => import(<public entry>); c().catch(() => undefined)`. The live instance is `demo/router.ts:117`: `comps.map((c) => c().catch(() => undefined))`. This swallows the load of live route targets.

LAW §10 declares both shapes as limits ("a ternary", "a load passed through a function value"). Declaring a limit does not meet an item that reads "the gate catches a silent return on a missing file and a swallowed load of a live target". The edict's "no masking fallbacks" is still violated on the tree.

Three more variants (X-TERN, X-TRYREAD, X-ELSE with a parameter path; X-THEN2, X-FNVAL reaching past a door) read as caught, but only incidentally, through B0 or B1. None of them is a B17 catch, and the literal-path or through-the-door forms fall through.

**What closes S-14:** B17 reads the ternary, the positive-guard `if (existsSync) return read; return x`, and the `try { read } catch { return … }` forms, and follows a loader bound to a name. The two live sites are cured at their cause.

## 5 · Outside the checklist

These are logged for the next registry. None re-opens convergence: none maps to a listed item beyond S-14, which is already open.

1. B15's placeholder set misses digit-suffixed placeholders without a dash (`tests/helpers2`). The item names `utils`, `v2` and `misc`, and those are caught.
2. `authored/listed-reorders.json` lists by entry (`./styles`) with a reason, not by the pair or rung reviewed. A later risk-free reorder anywhere in `./styles` would pass under S4b's listing. FD-4 still refuses any risky pair, as the plant shows.
3. P4-R4 remains unruled: the build still writes `dist/styles/theme.css` as the 28-byte `@import "./theme/index.css";`, the shape the edict's "no shims" reads against. The registry already tracks this as owed to the owner.
4. The replay needs the kit's floor inside a glass-ui tree: a `git archive` copy refuses (`floor: no @mkbabb/glass-ui package.json above …`). B-proto §1's recipe runs from the checkout, which works. A non-author running from an extracted copy must use a worktree.
5. Vitest under load reds 4 tests at the 5 s timeout, plus `menu/contract.test.ts`, which depends on a fixed 30 ms sleep. `npm test` is not deterministic at load ~60.
6. Battery defects, disclosed in `results/RESULTS.md` §8:
   - the Sheet.vue lookup;
   - PH-foreign collided with a real reviewed file;
   - SCR did not issue;
   - two probe mis-classifications (`tests/styles` read as a slot, `_shared` read as doorless).

## 6 · Files

- `critique-B/battery/` (hashed): `ITEMS.md`, `plants.mjs`, `probes.mjs`, `reorder.mjs`, `run-plants.mjs`, `tree-probes.sh`.
- `critique-B/BATTERY-HASH.txt`.
- `critique-B/tools/`: `adapter.mjs`, `extra-plants.mjs`.
- `critique-B/results/RESULTS.md`.

To re-run the battery on a replayed tree `W`:

```sh
node critique-B/battery/run-plants.mjs --root W --adapter critique-B/tools/adapter.mjs
```

For the extra plants, copy `tools/extra-plants.mjs` over `plants.mjs` in a scratch copy of the battery and run the same command.
