# W-B.3 · W-RECAP-CARRY: every owner ask carried to a BL wave or declined in the owner's words; D-3's text of record · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree; docs-only since `f3ad78d0` |
| ships in | 11.0.0 (records and one script) |
| families | F-14, the carry and D-3 split (`audit/REGISTRY.md:322-340`). The subject decide rows are other waves': R2-06-01 → W-I.4, R2-06-02 → W-H.3, R2-06-03 → W-B.14, R3-01-16 → W-B.15 |
| depends on | W-B.1 |
| dependants | W-B.14, W-B.15, W-H.3, W-I.4 (their rows are carried here first); every design loop (its standing-law list cites D-3's text) |

## 1 · What it closes

| id | what |
|---|---|
| L05b-01 | 89 of 261 BI recap rows routed only into declined or abrogated governance P-waves, then treated as terminal |
| L05b-02 | four older corpora never carried past BI; the recap detector `G-ROW-HOMED` is declared with `"binding":"none"` |
| L05b-06 | BD-union §B and BI WS2 asks with zero BJ/BK rows (four of them cured or retired at HEAD, R2-06-07) |
| L05b-16, L05a-14 | the seed omits standing asks (writing style, devtools-MCP, DesignSync, critics-default-wrong, modern web guidance) and the BK-era owner corpora (`BJ/addenda/2026-07-24-refinement/EXEC-STATE.md` THE OWNER SITTING 1-12, `ECOUTE.md` O-1..O-8) |
| L05b-19 | "many more examples" (said three times) retired by deleting its subject (`98b52613`), no row |
| R2-06-05 | motion outside the dock: a coverage statement, every measured row already placed; closes on the carry |
| R2-06-07 | the four cured or retired asks leave the open list with their cites |
| GAP-C1 (D-3) | "the eight laws" have no text of record |

## 2 · The defect at HEAD

- **No carry file and no detector.** `test -f docs/tranches/BL/ledger/RECAP.md` exits 1; `node scripts/tranche/verify-recap.mjs` → `Cannot find module`. The census traced only the seed's 48 rows (`census-carries-recap.md`); the corpora the seed lists (`PROMPT-RECAP-SEED.md:5-8`) are not traced row by row: BI `ledgers/PROMPT-RECAP.md` (633 lines, 261 rows), BJ `FEEDBACK-LEDGER.md` (50 F + 17 A rows), BC `PROMPT-LEDGER.md` (100 H + 20 O rows), BD `union/PROMPT-RECAP.md` (78 R rows), AY `audit/PROMPT-CORPUS.md` (B.* sections), `IOS27-MICRO/CHARTER.md`.
- **D-3 has no text.** "eight laws" has 0 hits in `docs/canon`, `docs/design`, `DESIGN.md`, `README.md` (census GAP-C1). What does exist: `DESIGN.md:27-202`, "Seven precepts compose the language", §L1 Liquid Glass, §L2 Spring Physics, §L3 Tap Choreography, §L4 Motion Tiers (with the "Liquid Weight is Universal" law and Disney's twelve principles, `:113-138`), §L5 Accessibility brackets, §L6 Aristotelian Proportion, §L7 The Cross-Engine Floor. BD's design-language-edicts wave wrote these into DESIGN.md (`BD/greenfield/design-language-edicts/CORRECTIONS-APPLIED.md:6,22`).
- **The loops cite no text.** `grep -q 'DESIGN.md §L' docs/tranches/BL/design/<d>/PORTFOLIO.md` fails for all four loops (structure first); their standing-law lists carry D-3 as "cartoon-technicolor and aristotelian proportion" only (`design/material/PORTFOLIO.md:33`). The seed's D-3 line cites no document (`PROMPT-RECAP-SEED.md:28`).
- **The seed lacks the standing asks.** `grep -ciE 'writing style|devtools|DesignSync|modern-web' docs/tranches/BL/audit/PROMPT-RECAP-SEED.md` → **0**.

## 3 · The cure

1. **`docs/tranches/BL/ledger/RECAP.md`**: one row per owner ask in every corpus the seed names plus the two L05a-14 adds, `| corpus | row id | owner words (short quote) | HEAD | terminal | BL wave or DECLINE | owner quote for a DECLINE or RETIRE |`. The 89 laundered BI rows (L05b-01's probe list) are re-routed by subject: a governance P-wave is never a terminal for an ask whose subject is a component, a motion or a surface. An ask whose subject is cured cites the file and line (R2-06-07's four).
2. **`scripts/tranche/verify-recap.mjs <tranche-dir>`**: reads each corpus's row ids from its own table (the id patterns are listed in the script, one per corpus), exits 1 when an id has no RECAP row, when a terminal names a wave missing from `waves/INDEX.md`, or when a DECLINE or RETIRE carries no owner quote and no owner-docket row. It replaces the unbound `G-ROW-HOMED` seat (the register itself goes in W-A.2). Planted bite: delete one BD R row from RECAP.md → exit 1 naming it.
3. **L05b-19, "many more examples"**: BUILD, folded into W-E.10 (the demo remainder: specimens and a size ladder, 10 of 80 cards at HEAD), rebuilt on the shipped API. The deletion at `98b52613` removed a playground on a retired API; the owner's ask stands.
4. **D-3's text of record, ruled.** D-3 is answered by `DESIGN.md` "Liquid Glass design language": the seven precepts §L1-§L7 and the one universal law §L4 states ("Liquid Weight is Universal", `DESIGN.md:113`, with the twelve principles as its taxonomy). That is the eight: seven precepts and one law over them. The BD edicts wave encoded them there. The seed's D-3 line and each loop's standing-law list cite `DESIGN.md §L1-§L7` by section. The ruling goes to the owner docket (OW-7's glance list gains one line: "the eight laws are DESIGN.md §L1-§L7 plus Liquid Weight is Universal"), default standing unless the owner names a different eight; a different answer is written into DESIGN.md as its own section in this wave's successor record, and the citations follow it. W-C.3's doc-truth invariants keep DESIGN.md's token cites true (W-B.11).
5. **The seed gains** the standing asks L05b-16 names, each with its source line: writing style (plain, no editorializing), browser work through the devtools and Playwright MCPs, design through DesignSync under Opus seats while Fable is withheld (`CHARTER.md:3-5`, which answers L05a-21), critics default to "wrong until measured", modern web guidance (E-2's target engines). The charter's Fable routing (`CHARTER.md:40,70,88`) is recorded as superseded by the owner's words at `CHARTER.md:3-5` in one seed line.

## 4 · Files it touches

- New: `docs/tranches/BL/ledger/RECAP.md`, `scripts/tranche/verify-recap.mjs`.
- Edited: `docs/tranches/BL/audit/PROMPT-RECAP-SEED.md`, the standing-law lines of `docs/tranches/BL/design/{structure,dock,material,tile}/PORTFOLIO.md` (one citation each; no loop decision is touched), `docs/tranches/BL/LEDGER.md`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B3-G1 · the carry exists | `test -f docs/tranches/BL/ledger/RECAP.md` | exit 0 | **exit 1** |
| B3-G2 · every ask carried | `node scripts/tranche/verify-recap.mjs docs/tranches/BL` | exit 0 | **exit 1**: `Cannot find module …/verify-recap.mjs` |
| B3-G3 · the detector bites | B3-G2 on a copy with one BD `R` row removed, and on a copy with one DECLINE's quote blanked | exit 1 each | absent |
| B3-G4 · the loops cite D-3's text | `for d in structure dock material tile; do grep -q 'DESIGN.md §L' docs/tranches/BL/design/$d/PORTFOLIO.md \|\| exit 1; done` | exit 0 | **exit 1**: `no text-of-record cite: structure` |
| B3-G5 · the seed cites it | `grep -n 'D-3' docs/tranches/BL/audit/PROMPT-RECAP-SEED.md \| grep -q 'DESIGN.md'` | exit 0 | **exit 1** |
| B3-G6 · the seed carries the standing asks | `test "$(grep -ciE 'writing style\|devtools\|DesignSync\|modern-web' docs/tranches/BL/audit/PROMPT-RECAP-SEED.md)" -ge 4` | exit 0 | **exit 1**: 0 |

## 6 · π and DELTA obligations

None. Records only.

## 7 · MIGRATION rows

None.

## 8 · Ledger rows

- N-3 (recap all prompts) closes here; D-3 closes on §3.4 with the owner docket line; GAP-C1 closes.
- #24 and #71 carry their subject rows (RT-24C/D, RT-71A) to W-H.3 through this file; their terminal is W-H.3's.
- F-14's members in §1 close; R2-06-01/-02/-03 and R3-01-16 close in W-I.4, W-H.3, W-B.14 and W-B.15.
