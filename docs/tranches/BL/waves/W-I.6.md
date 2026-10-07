# W-I.6 · the dock hallmarks, OWED-3 and the R-7 captures (loop D2) · 11.0.0

| field | value |
|---|---|
| seat | formation fix seat 2 (`formation-audit/fix-2.md`, FA-02, FA-21); the items and gates move here from W-I.1 (§3.1 item 1, §3.3 items 8 and 9, G21, G22) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `183e021a` (fix-2's readings of G1 and G4); W-I.1's readings at its seat |
| ships in | 11.0.0 |
| loop | D2 dock. The hallmark witnesses are D2's (W-I.1 §3.1 item 1's obligation) |
| families | F-54 split: #67a (hallmarks 1, 2 and 5, and OWED-3) and #67d, #90a and #90d (the R-7 captures, device fps and loupe L-3), disease rows (open at three closes, LEDGER `#67a`, `#67d`, `#90a`, `#90d`). F-13's members L01b-67 (the OWED-3 ruling and the R-7 footage) and L04-F15 (the R-7 ask) are decided here |
| owner row | OW-5, the three R-7 captures |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| #46b, #67c W-2 `useAnisotropicExtent`, from W-B.10 | hallmark 1's candidate mechanism. D2 converges the mechanism; I6-G1/I6-G2's hallmark-1 test measures the stretch in paint, and no symbol of that name is owed (`W-B.10.md` §3 item 2) |
| #67a, L05b-14, R2-04-17 | hallmark 1 (dock-to-card squish: the plate's cross-axis stretch while the extent moves, proportional to \|v_e\|, on the plate, never the root), hallmark 2 (a bounded magnetic overpull that returns) and hallmark 5 (the stagger, PARTIAL at `layers.css:238-257`) on the dock. Hallmark 6 is W-J.2's |
| OWED-3 | the dock spring's derivation (`springPreset("dock")` = {0.30, ζ 0.88}, `springPresets.ts:84-86`); discharged at `612717e5`, re-held here on the landed rung |
| #67d, #90a, OW-5 | the three R-7 captures (the Siri waveform, the loupe close-up with the L-3 device cell, the ChatGPT dock motion) |
| #90d | device fps and loupe L-3, with #67 |

## 2 · The state at HEAD

- **Hallmarks.** No witness exists: `git grep -qniw overpull -- src tests` exits 1 and `test -f tests-visual/wired/dock-hallmarks.spec.ts` exits 1 (fix-2, `183e021a`). The stagger exists (`layers.css:238-257`); D2's E and F families deleted it with nothing in its place (`design/dock/REGISTRY.md:222-223`, F-8, F-9).
- **OWED-3.** `node docs/tranches/IOS27-MICRO/prototypes/spine-conductor/check.mjs` → 87/87 PASS at HEAD (W-I.1 §2.2). Not a defect: a hold line. W-C.1 moves the check to `scripts/loops/dock/owed-3/`, where I6-G3 runs it.
- **R-7.** OW-5 reads `pending` (LEDGER `OW-5`). With Q-9 (a) the Siri capture has no consumer, and the loupe belongs to no dock facility.

## 3 · The ruling and the cure

1. **Each hallmark: a witness or an owner RETIRE.** D2 adds one witness per hallmark to its battery (the plate stretch against |v_e|; an overpull bounded and returning; the stagger's per-seat offsets). The wave lands the converged carrier's hallmarks with those witnesses wired as `tests-visual/wired/dock-hallmarks.spec.ts`, one test per hallmark ruled BUILD. A hallmark ruled RETIRE carries the owner's words in its ledger row, and its test is not written. The stagger does not regress without a quoted RETIRE.
2. **OWED-3.** If the converged rung stays {0.30, ζ 0.88}, OWED-3 holds on BK's derivation with `check.mjs` 87/87 re-run at the landing commit. If D2 changes the rung, the four C2 rows are re-derived on the new pair and must read 87/87 before landing.
3. **OW-5.** The seat recommends "ruled unneeded" for the Siri and loupe captures and asks the owner once, in W-B.4's docket, whether the ChatGPT dock motion capture is still wanted as a reference for D2's gestalt read. The owner's answer is quoted in the ledger rows.

## 4 · Files it touches

The converged carrier's hallmark code in `src/components/dock/` (per D2's spec), `tests-visual/wired/dock-hallmarks.spec.ts` (new), the D2 battery rows it wires.

## 5 · Acceptance gates

| id | gate | passes when | HEAD |
|---|---|---|---|
| I6-G1 · the hallmark witnesses exist | `test -f tests-visual/wired/dock-hallmarks.spec.ts` | exit 0 (one test per hallmark ruled BUILD) | **exit 1** (fix-2) |
| I6-G2 · the hallmarks pass | `npx playwright test -c tests-visual wired/dock-hallmarks`, both engines | 0 failed | the spec does not exist (RED by absence with I6-G1) |
| I6-G3 · OWED-3 (hold line) | `node scripts/loops/dock/owed-3/check.mjs` on the landed rung (W-C.1 §3 step 4 moves it there from `docs/tranches/IOS27-MICRO/prototypes/spine-conductor/`; this wave lands after W-C.1 through W-I.1, PLAN §5) | 87/87 PASS | 87/87 at HEAD at its `docs/` path (W-I.1 §2.2). Bite: a rung pair off the derivation (the C2 rows) |
| I6-G4 · OW-5 ruled | `! grep -qE '^\\| OW-5 \\|.*\\| pending \\|' docs/tranches/BL/LEDGER.md` | exit 0 | **exit 1** (LEDGER `OW-5`, fix-2) |

## 6 · π and DELTA obligations

A filmstrip per hallmark ruled BUILD (expand, collapse, an overpull at the run's end, the stagger), light and dark, Chromium; Playwright WebKit crashes on GlassDock at HEAD (recorded); real Safari UNMEASURED (OW-3). The device cells (fps, loupe L-3) run on W-A.4's GPU leg. Captures under `.cache/evidence/W-I.6/`.

## 7 · MIGRATION rows

None expected; a hallmark adds motion, not a surface.

## 8 · Ledger rows

Closes #67a (per hallmark: BUILD with its witness, or RETIRE quoted), OWED-3 (held), #67d, #90a and #90d (per OW-5).

## 9 · Gestalt passes (P-1)

- **Tranche fit:** the hallmarks ride the one dock spring (W-F.1) and the converged carrier; W-J.2's engagement register composes them, not duplicates them.
- **Wave:** I6-G1..G4 green in one run.
- **Feature:** expand and collapse a dock with a fling: the plate squishes with the motion, the run overpulls and returns, the seats arrive in order.
