# critique-B · pass 4 · results

Seat claude-opus-5-5, 2026-09-25/26. Every line below is the output of a command this seat ran. Trees: `wt` = fresh linked worktree at HEAD `648e075d` replayed by the committed kit; `wt2` = fresh worktree at HEAD with only the floor rows (S1) applied, the floor base. The kit was run from a third pristine worktree at HEAD (`kitwt`), so the chain read only committed bytes.

## 1 · Replay (STEP 2)

```
node <kitwt>/docs/tranches/BL/design/structure/pass-4/B-kit/replay.mjs --root <wt> --twice
replay: from the base (digest 35f7b831fe810aac…)
  S1 [floor-rows] floor rows · again: floor rows → a974a609c0791460…
  … 51 steps, each applied twice with the digest unchanged …
  S37 [row] row 2 written, 0 applied · again: row 0 written, 2 applied → 6618df1f7d2f5a0c…
replay done in 668.8 s; code digest 6618df1f7d2f5a0c657e4b1d14f61203e83e5b8164463abdb479f0432ca8685c over 1437 files; chain final MATCH
node … replay.mjs --root <wt>
replay: the chain is applied (digest 6618df1f7d2f5a0c…)   (0.7 s)
```
`wt2` after `floor/rows/apply.mjs`: code digest `a974a609c0791460806f0fe9b210e4a681aa3c44f3d1098b16b32fc1dfb8004e` = the chain's S1 digest.
After every battery run the code digest of `wt` was re-read: `6618df1f…` (every plant restored).

A first launch from a `git archive` copy of the kit refused (`floor: no @mkbabb/glass-ui package.json above …`): the kit's floor must sit inside a glass-ui tree. Not a defect of the chain; noted for the next non-author.

## 2 · Gate on the replayed tree

```
node scripts/structure/seal/seal.mjs   → exit 1
FAIL B0 444 · PASS B1 0 · FAIL B2 67 · PASS B3 0 · PASS B4 0 · PASS B5 0 · FAIL B6 62 · PASS B7..B17 0
```

## 3 · Toolchain on the replayed tree

| command | result |
|---|---|
| `npm run build` | 0 |
| `npm run demo:dist:build` | 0 |
| `npm run typecheck` (both programs) | 0 |
| `npx vitest run` | 240 files; 2,312 passed, 8 failed, 10 expected fail, 1 skipped. Failures: seal B0/B2/B6; 4 × "Test timed out in 5000ms" (atoms fuzz, glass-subtlety ×3) and `menu/contract.test.ts` |
| `npx vitest run --testTimeout=60000` on the three non-gate files | 3 files, 72/72 passed |
| `npm run verify:package`, datum 2,919,057 (HEAD) | exit 1: `G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2930810 > 2919057` |
| `npm run verify:package`, datum 2,930,810 (in the worktree only, restored after) | exit 0, `"terminal":"CLEAN"` |

## 4 · Cascade (floor base `wt2` against migrated `wt`)

```
cascade.mjs snapshot --dist <wt2>/dist --out snap-base
cascade.mjs verify --baseline snap-base --dist <wt>/dist                       → exit 1, RED: an unlisted reorder, ./styles firstDivergence 610
cascade.mjs verify … --reorders B-kit/authored/listed-reorders.json            → exit 0, GREEN: judged {moved 18, swappedPairs 1818, risks 0, covered 0}
./styles/fonts, ./styles/theme, ./styles.css: identical
```

Reorder plant (`battery/reorder.mjs`: `@import "./accent-tone.css"` moved after `@import "./shapes/index.css"` in `src/styles/glass/index.css`), rebuilt, verified against a snapshot of the migrated dist with the route's listing:
```
exit 1 · ./styles class reorder, firstDivergence 141, judged {moved 1, swappedPairs 112, risks 1, covered 0}
RED: 1 swapped pair(s) can change a value and no band spec that reads it ran
RISK ./styles [--accent-band-strength] .accent-tone × .glass-chip (0,1,0; co-occur in src/components/chip/chipVariants.ts)
```

## 5 · Browser (F-10 seat, chromium-headless-new)

Specs: css-critical, demo-design, glass-cal, page-chassis, storybook-meta, zz-chip-band (copied from `pass-4/plants/`), plus the π floor `substrate-paints-color` the seat adds.

| tree | tests | passed | failed | verdict | new failures |
|---|---:|---:|---:|---|---|
| `wt2` floor base | 37 | 22 | 15 | RED (no base report) | — |
| `wt` migrated, `--base-report` base | 37 | 22 | 15 | GREEN | [] |

`zz-chip-band.spec.ts` (computed `--accent-band-strength` on a Chip) passes on both trees. The 15 failures are identical on both and equal the floor seat's F48 base (37 tests, 22 passed).

## 6 · Battery and extra plants

The hashed battery (amendment 1) through `tools/adapter.mjs`:

```
BASE {"B0":444,"B1":0,"B2":67,"B3":0,"B4":0,"B5":0,"B6":62,"B7":0,…,"B17":0}
CAUGHT  K-INT      unit file reads a kernel interior past its door          B1
CAUGHT  K-INT-T    same, type-only                                          B1
CLEAN   K-DOOR-L   legal: through the kernel door
CAUGHT  N-INT      dock/search reads dock/legibility's interior file        B1
CAUGHT  T-CYC-N    type-only cycle search <-> legibility through doors      B4
CAUGHT  T-CYC      type-only cycle chip <-> badge through doors             B4
CAUGHT  V-CYC      value cycle chip <-> badge                               B4
CAUGHT  F-CYC      same-dir value cycle                                     B4
CAUGHT  F-CYC-T    same-dir type-only cycle                                 B4
CAUGHT  MASK-RET   if (!existsSync(p)) return;                              B17
CAUGHT  MASK-RETN  if (!existsSync(p)) { return null; }                     B17
CAUGHT  MASK-CATCH import(live).catch(() => null) in src                    B17
CAUGHT  MASK-CATCH-D import("@mkbabb/glass-ui/chip").catch(() => null) in demo  B17
CAUGHT  MASK-TRY   try { readFileSync(p) } catch { return null }            B0 only (computed read of p)
CAUGHT  PH-tests / PH-demo / PH-visual / PH-src / PH-file                   B15
MISSED  PH-tests-helpers  tests/helpers2                                    (not in B15's set)
MISSED  PH-foreign  slider/useDockHold.ts   INVALID: collides with a real file the pin reviews; re-issued as X-FOREIGN
CAUGHT  SELF (B0) · WALK (B0) · T-OUT (B16) · T-WRONG (B16) · CLEAN T-OWN-L
CAUGHT  K-REEX (B8,B9,B11) · G-RULE (B14) · TH-RULE (B14) · D-CODE (B11,B14) · D-DUAL (B9)
UNNAMED B-13F  13 files in chip: B6 names the dir, not a file (caught in substance)
CAUGHT  B-501 (B6) · SLOT-13 (B6,B16) · SLOT-501 (B6) · CLEAN LOCAL-L
(SCR did not issue: it looked for minify-css.mjs; re-issued as X-SCR)
```

`tools/extra-plants.mjs` (written after the hash):

```
CAUGHT  X-FOREIGN   slider/useChipGlow.ts                                   B15
CAUGHT  X-SCR       scripts/structure/lib file read only by scripts/minify  B10 (+B1)
CAUGHT  X-TRYAWAIT  try { await import(live) } catch { return null }        B17
CAUGHT  X-TERN, X-TRYREAD, X-ELSE   incidental only: B0 (computed read of a parameter path)
CAUGHT  X-THEN2, X-FNVAL            incidental only: B1 (the plant reached past chip's door)
MISSED  X-TERN-LIT  existsSync("package.json") ? readFileSync("package.json") : ""
MISSED  X-FNVAL-D   const c = () => import("@mkbabb/glass-ui/chip"); c().catch(() => undefined)
```

The two MISSED shapes are live on the replayed tree, and both were already at HEAD:
- `scripts/profile-bundle.mjs:292` `return existsSync(target) ? \`\n${readFileSync(target, "utf-8")}\n\` : m;` (HEAD line 293);
- `demo/router.ts:117` `await Promise.all(comps.map((c) => c().catch(() => undefined)));` (HEAD line 117).

## 7 · Probes

`battery/probes.mjs` on `wt` (full lines in the run; summary):
- 12-bound dirs over 12: `demo/stories/containers` 13, `demo/stories/foundations` 13, `tests/demo` 17, `tests-visual` 177 (+ `tests/styles` 23, which the probe filed under slots by name; the gate's `isSlot("tests/styles")` is false, so it is an R-5 dir, not a P3-R3 slot).
- Kind slots over 12: `src/components/dock/__tests__` 16 (the route's reported P3-R3 counterexample).
- Files over 500 lines: 56 (13 inside slots).
- `accent-tone.css` at `src/styles/glass/accent-tone.css`; `safari-probe.mjs` at `tests-visual/paint/safari-probe.mjs`; `isTeleportedTarget.ts` at `src/components/dock/composables/`.
- `vite.utility-emit.ts`: 0 missing-file guards.
- Placeholder names in all five zones: 0.
- Export keys 69 (`./aurora-config` present), typesVersions 63.
- `dist/styles/theme.css` after the build: 28 B, `@import "./theme/index.css";` (P4-R4 arm (b), still unruled).
- Doors (index.ts / index.css under src; the probe missed scripts' `index.mjs`, added by hand from `wc -c`): kernel 54 / 68,973 B; unit roots 71 / 35,995 B; nested 24 / 7,902 B; aggregators 3 / 23,446 B; scripts 5 / 2,351 B (1 index.ts + 4 index.mjs). Sealed-zone total 157 doors, 138,667 B. One-statement doors 38 (probe count, index.ts/css only).
- `tree-probes.sh`: `--pin` refused (`seal: unknown option --pin (the pin has one path, scripts/structure/records/seal-pin.json)`), `--no-pin` refused the same way, the gate leaves the tree unchanged.

## 8 · Battery defects (disclosed)

1. `find("Sheet.vue")` threw before any plant ran. Amendment 1 made the candidate list optional; no plant's text changed. Hash after amendment: `08a0ec976df4c3dc3546531b19725067135ad37b80948477a9243ab65f64a926` (plants.mjs `fcdbbc8a…`).
2. PH-foreign's target is a real, pin-reviewed file; re-issued as X-FOREIGN.
3. SCR did not issue (file renamed on the tree); re-issued as X-SCR.
4. `probes.mjs` classes `tests/styles` as a slot by name and `src/components/_shared` as doorless (it is a container); both corrected in reading, above.
