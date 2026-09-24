# BL ledger census

Seat: ledger merge. Model `claude-opus-5-5` (asserted from system identity). Read at `2b52d814`. `git diff --stat v10.0.1 HEAD -- src demo tests package.json` is empty, so every HEAD figure is the published 10.0.1 bytes. Date 2026-09-23.

This is the one census BL's formation disposes from. It merges three seat files and cites the inbound map:

- `ledger/census-register-a.md` (seat a): BK register rows #3 to #52, 34 rows.
- `ledger/census-register-b.md` (seat b): BK register rows #53 to #90, 33 rows.
- `ledger/census-carries-recap.md` (seat c): BK `FINAL.md` §7's named carries (C-1 to C-18, split into 20 rows) and the 48 prompt-recap rows of `audit/PROMPT-RECAP-SEED.md` (E-, D-, P-, N-).
- `audit/INBOUND-MAP.md`: the 346 external witness rows, cited and counted here, not copied (§6).

All three seat files are on disk, so no inline copies were needed. A row id names its seat: `#3`–`#52` is seat a, `#53`–`#90` is seat b, and every `C-`, `E-`, `D-`, `P-` and `N-` row is seat c. Each row's cite, HEAD measurement and note stay in its seat file. This file carries the row's word and route, plus the merge's re-checks (§7).

Coverage: the 67 carried rows are exactly the BK census's 49 PARTIAL, 14 OPEN, 3 BLOCKED and 1 OWNER-GATED rows (`BK/execution/2026-09-17-status-census/CENSUS.md`). None is missing and none is counted twice. The 21 SEALED rows and the two retired rows (#36, #37) are not carried.

## 1. Totals

### By HEAD word

| set | rows | LANDED | PARTIAL | OPEN | BLOCKED | OWNER-GATED | RETIRED |
|---|---|---|---|---|---|---|---|
| BK register carries (seats a, b) | 67 | 5 | 44 | 15 | 2 | 1 | 0 |
| FINAL §7 named carries (seat c) | 20 | 0 | 1 | 8 | 4 | 3 | 4 |
| prompt recap (seat c) | 48 | 9 | 15 | 21 | 1 | 0 | 2 |
| **all** | **135** | **14** | **60** | **44** | **7** | **4** | **6** |

Word changes from the BK records: on the 67 carried rows, #30, #55, #57, #74 and #89 move from PARTIAL to LANDED, and #25 moves from BLOCKED to OPEN (§7 R-6), so the census's PARTIAL 49, OPEN 14 and BLOCKED 3 become 44, 15 and 2. Seat c's corrections: C-2 is retired by the owner's waiver (`CHARTER.md:9`), C-14 and C-15 retire under BK's own unsourced-smell rule, C-8 moves from OPEN to PARTIAL, C-16's flake has a second signature, and C-17 drifts five rows, not one.

### By route

Each row has one route: the family or disposition that holds its remainder. Items a row hands to other families are in §2's item columns, not counted here.

| route class | rows |
|---|---|
| a registered family (43 families; F-30 counts twice, as F-30a and F-30b) | 106 |
| a registry gap (§5: GAP-1 1, GAP-2 2) | 3 |
| STANDING-LAW (§3) | 11 |
| ANSWERED-BY-HEAD | 5 |
| ANSWERED | 4 |
| DECLINE | 3 |
| OWNER (§4) | 3 |
| **all** | **135** |

Family routes by count:

| rows | families |
|---|---|
| 8 | F-07, F-13 |
| 5 | F-31, F-48, F-71 |
| 4 | F-01, F-18, F-21, F-34, F-47, F-68 |
| 3 | F-14, F-16, F-43, F-62, F-63 |
| 2 | F-06, F-08, F-12, F-33, F-53, F-54, F-55, F-64 |
| 1 | F-10, F-17, F-24, F-28, F-30a, F-30b, F-32, F-37, F-39, F-40, F-41, F-44, F-45, F-46, F-58, F-59, F-61, F-66, F-67, F-70 |

Merge rulings on routes. #27 is written "F-09 + GAP-2" in seat a. F-09 retires the latch form and holds no remainder, so the row counts under GAP-2. #7 counts under GAP-1 and #64 under F-62, taking the first route the seat wrote. #23 is F-30a and N-9 is F-30b, as the seats' notes state.

63 of the 79 families hold at least one census row, either its remainder or an item. The 16 that hold none have only registry members and, for six of them, inbound rows: F-03, F-05, F-20, F-35, F-38, F-49, F-52, F-57, F-69, F-72, F-73, F-74, F-75, F-76, F-77, F-79.

## 2. Per family

Columns: the registry's disposition and wave (`audit/REGISTRY.md` §1 index and wave-shape lines); the carried rows whose remainder the family holds; the carried rows that hand it one item; the same two columns for the carries and recap rows; the seat files the entries come from. Row ids only. The item each row hands over is named in its seat file's note.

| family | band | disposition and wave | carried: remainder | carried: item | carries and recap: remainder | carries and recap: item | seats |
|---|---|---|---|---|---|---|---|
| F-01 | A | BUILD W-REGISTER-COLLAPSE | #31 #65 | #8 #17 #23 #26 #29 #38 #76 | E-8 P-3 | — | a,b,c |
| F-02 | A | FOLD into W-REGISTER-COLLAPSE | — | #65 | — | C-6 E-1 E-4 | b,c |
| F-03 | A | FOLD into W-REGISTER-COLLAPSE | — | — | — | — | — |
| F-04 | A | BUILD W-VISUAL-CI | — | #66 #85 | — | — | b |
| F-05 | A | BUILD (precondition of W-VISUAL-CI) | — | — | — | — | — |
| F-06 | A | RETIRE the #10 sink; each BUILD wave ships its π and DELTA | #10 | #26 | P-2 | — | a,c |
| F-07 | A | BUILD W-SAFARI-BAND | #6 #28 #41 #46 #87 #88 | #10 #24 #31 #33 #38 #39 #84 #90 | C-10 D-4 | — | a,b,c |
| F-08 | A | BUILD (one GPU-backed leg) | #53 | — | C-16 | — | b,c |
| F-09 | A | RETIRE the latch form; each subject folds as a born-RED | — | #17 #27 #58 #59 #77 | — | E-2 E-3 | a,b,c |
| F-10 | A | BUILD W-PAYLOAD-INVARIANT | #85 | — | — | — | b |
| F-11 | B | FOLD into LEDGER formation | — | #66 | — | — | b |
| F-12 | B | FOLD into LEDGER formation and the close checklist | — | — | C-17 P-6 | — | c |
| F-13 | B | BUILD, the W-DECIDE band | #44 #45 #51 | #28 #46 #49 #78 | C-4 C-5 C-6 C-7 N-2 | C-1 C-3 | a,b,c |
| F-14 | B | BUILD W-RECAP-CARRY (+ three decide rows) | #24 #71 | — | N-3 | — | a,b,c |
| F-15 | B | FOLD into W-DECIDE as owner-glance rows | — | — | — | N-7 | c |
| F-16 | C | BUILD W-DOCK-EXTENT (design loop D2) | #48 | #47 | N-8a N-15 | D-1 | a,c |
| F-17 | C | BUILD (opt-in scroll compact; D2) | — | — | N-7 | — | c |
| F-18 | C | BUILD in W-DOCK-EXTENT (D2) | #47 | — | N-8b N-12 N-14 | — | a,c |
| F-19 | C | BUILD W-DOCK-KEYBOARD | — | #31 | — | — | a |
| F-20 | C | BUILD (one demo-shell pass) | — | — | — | — | — |
| F-21 | D | BUILD W-SURFACE-GEOMETRY | #84 #86 | — | C-8 N-11a | — | b,c |
| F-22 | D | BUILD (small) | — | #89 | — | — | b |
| F-23 | D | BUILD W-INK-COMPOSITE (design loop D3) | — | #10 #31 #80 #83 | — | C-5 N-13 | a,b,c |
| F-24 | D | BUILD, W-INK-COMPOSITE dark half | #80 | #49 #81 | — | — | a,b |
| F-25 | D | BUILD W-STILL-OKLCH | — | #58 | — | — | b |
| F-26 | D | BUILD in W-CHIP | — | #43 | — | — | a |
| F-27 | D | BUILD in W-CHIP | — | #43 | — | — | a |
| F-28 | D | BUILD W-CHIP | #43 | — | — | — | a |
| F-29 | D | BUILD W-DENSITY-DECIDE | — | #59 | — | — | b |
| F-30a | D | BUILD (the 12 px rung re-seat) | #23 | — | — | — | a |
| F-30b | D | BUILD after the primitive ruling (design loop D4) | — | #84 | N-9 | — | b,c |
| F-31 | D | BUILD W-FROST-II (design loop D3) | #25 #33 #38 #82 | #41 #56 | N-13 | — | a,b,c |
| F-32 | D | BUILD, W-SURFACE-GEOMETRY sheet half | #39 | — | — | — | a |
| F-33 | D | BUILD W-CEL-CONTAINER | #59 | #49 #52 | C-13c | — | a,b,c |
| F-34 | D | BUILD W-DEMO-REMAINDER | #18 #52 #56 #58 | #53 | — | — | a,b |
| F-35 | D | BUILD | — | — | — | — | — |
| F-36 | D | BUILD (small) | — | — | — | D-1 | c |
| F-77 | D | BUILD W-HOVER-GUARD | — | — | — | — | — |
| F-37 | E | BUILD W-COMMAND | #81 | — | — | — | b |
| F-38 | E | BUILD W-FOCUS-LIFECYCLE | — | — | — | — | — |
| F-39 | E | BUILD (one ring register) | #83 | — | — | — | b |
| F-40 | E | BUILD | — | #81 | C-9 | — | b,c |
| F-41 | E | BUILD W-TOAST | #34 | #31 #33 | — | — | a |
| F-42 | E | BUILD (one a11y sweep) | — | #31 #49 #58 | — | N-11c | a,b,c |
| F-43 | E | BUILD W-ROUTE-POPSTATE, W-ARRIVAL | #29 #32 | #51 #71 #90 | N-8d | — | a,b,c |
| F-75 | E | BUILD in W-INK-COMPOSITE | — | — | — | — | — |
| F-44 | F | BUILD W-SPRING-ONE | — | #26 #53 | D-1 | — | a,b,c |
| F-45 | F | BUILD | #3 | — | — | — | a |
| F-46 | F | BUILD | #73 | #26 #77 | — | — | a,b |
| F-73 | F | BUILD W-THEME-SWAP | — | — | — | — | — |
| F-74 | F | BUILD W-SHEET-BLEED | — | — | — | — | — |
| F-76 | F | BUILD W-EXTENT-OWNED | — | — | — | — | — |
| F-78 | F | BUILD W-INTERRUPT | — | #32 #71 | — | D-1 | a,b,c |
| F-79 | F | BUILD W-DIRECTION | — | — | — | — | — |
| F-47 | G | BUILD W-ONE-ENGINE | #54 | #45 #49 #50 | C-13a C-13b E-2 | E-1 N-8e | a,b,c |
| F-48 | G | BUILD W-BLOB-GREENFIELD, W-AURORA-GREENFIELD | #49 #50 | #45 | C-11 C-12 N-8c | N-8e | a,c |
| F-49 | G | BUILD | — | — | — | — | — |
| F-50 | G | BUILD | — | #49 #60 | — | N-8c | a,b,c |
| F-51 | G | BUILD | — | #49 #60 | — | — | a,b |
| F-52 | G | BUILD | — | — | — | — | — |
| F-53 | G | BUILD W-PERF (decide rows) | #60 #69 | #39 | — | — | a,b |
| F-54 | G | FOLD into the dock and motion design portfolio | #67 | #90 | D-2 | — | b,c |
| F-55 | H | BUILD W-COLOCATION (design loop D1) | #62 | — | N-1 | — | b,c |
| F-56 | H | FOLD into W-COLOCATION | — | #56 | — | — | b |
| F-57 | H | FOLD into W-COLOCATION | — | — | — | — | — |
| F-58 | H | FOLD into W-COLOCATION | — | — | E-1 | — | c |
| F-59 | H | FOLD into W-COLOCATION | #21 | — | — | — | a |
| F-60 | H | BUILD W-PERIPHERY | — | — | — | N-1 | c |
| F-61 | H | BUILD (small) | #63 | — | — | — | b |
| F-62 | I | BUILD W-DEMETA-II | #17 #64 | #55 | E-10 | E-3 E-9 | a,b,c |
| F-63 | I | BUILD W-DOC-TRUTH | #26 #61 #78 | #7 #29 #31 #38 #51 #76 #90 | — | — | a,b |
| F-64 | I | BUILD W-TOKEN-HYGIENE | #20 | #47 #64 #82 #85 | E-4 | E-2 | a,b,c |
| F-65 | I | BUILD W-DARK-ONE-ARM | — | #86 | — | — | b |
| F-66 | J | FOLD into the P-6 audit | — | #21 #41 #50 #53 #58 | E-7 | — | a,b,c |
| F-67 | J | BUILD W-ROOT-CLOSURE, W-PEER-TRUTH | #8 | #26 #81 | — | — | a,b |
| F-68 | J | BUILD W-LANDING | #66 #76 | #18 #51 #53 #55 #59 #88 | E-6 N-6 | — | a,b,c |
| F-69 | J | BUILD W-DRAG-MORPH-SETTLE | — | — | — | — | — |
| F-70 | J | BUILD (type-surface wave) | — | — | E-11 | N-8b | c |
| F-71 | J | BUILD W-MAIL-INTAKE | — | #76 | N-8e N-10b N-10c N-11b N-11c | N-8c | b,c |
| F-72 | J | FOLD (re-trigger: value.js ≥ 4.1.0) | — | — | — | — | — |

Rows that no family holds, or that close without one:

| route | carried: remainder | carried: item | carries and recap: remainder | carries and recap: item | seats | where it goes |
|---|---|---|---|---|---|---|
| GAP-1 | #7 | #39 | — | — | a | §5 |
| GAP-2 (= seat b's GAP-B1) | #27 #77 | — | — | D-2 | a,b,c | §5 |
| GAP-B2 | — | #64 | — | — | b | §5 (two halves) |
| GAP-C1 | — | — | — | D-3 | c | §5 |
| GAP-C2 | — | — | — | N-11b | c | §5 (held in part, §7 R-9) |
| STANDING-LAW | — | — | E-3 E-5 E-9 E-12 E-13 D-3 P-1 P-4 P-5 P-7 P-8 | — | c | §3 |
| ANSWERED-BY-HEAD | #30 #55 #57 #74 #89 | — | — | — | a,b | closes in the ledger. #55's residue goes to F-62 and F-68 and #89's to F-22 (item columns above) |
| ANSWERED | — | — | C-18 N-4 N-5 N-10a | — | c | closes in the ledger |
| DECLINE | — | — | C-2 C-14 C-15 | — | c | closes with the rationale in seat c |
| OWNER | #90 | — | C-1 C-3 | — | b,c | §4 |

## 3. Standing laws and their enforcement

"Enforcement" is what can catch a violation at HEAD: a gate (an executable that goes red) or a named review step. Where neither exists, the cell reads **no enforcement**, and that is a formation gap. The HEAD word is seat c's.

| law | HEAD | enforcement at HEAD | remainder held by | class |
|---|---|---|---|---|
| E-1 no backwards compatibility | PARTIAL | gate: the NO-SHIM arm, `tests/gates/overfit-structure.test.ts:354-389`. It misses one symbol behind two barrels (F-02's narrowness) | F-58 (W-COLOCATION); dual engine arms F-47; token beside OIDC F-13 | partial |
| E-2 no masking fallbacks | OPEN | **no enforcement**: the only arm is the latch `gl-excise.test.ts:112` (`it.fails`), which F-09 retires | F-47 W-ONE-ENGINE; literal `var()` fallbacks F-64 | none |
| E-3 gestalt over patches | PARTIAL | review step: the design loop's CRITIQUE pass, which covers design seats only. No gate. Nothing covers implemented waves | residue F-62 (tombstones), F-09 (latches) | partial |
| E-4 Tailwind-first | PARTIAL | gates: `token-hygiene.test.ts:152`, `type-hygiene.test.ts:178`, over `src` only | F-64; demo spelling F-02 | partial |
| E-5 presets live in consumers | LANDED | **no enforcement**. Holds by inspection only | — | none |
| E-6 consumers update, the API does not wait | PARTIAL | review step: outbound letters at each break (FIN §6). No gate | F-68 W-LANDING | partial |
| E-7 overfitting law | PARTIAL | gate: EXPORT-REACH, `overfit-structure.test.ts:229`, which checks the letter only. The spirit is P-6's close audit, which did not run at 10.0.0 | F-66 into P-6 | partial |
| E-8 gates abrogation (40-60 invariants) | OPEN | **no enforcement of the law**: `scripts/gate-register.mjs` and `gate-register.test.ts:172-174` pin seat counts, the thing the law abrogates. The 50-entry roster is not on disk (REG §6.8) | F-01 W-REGISTER-COLLAPSE | none |
| E-9 CLAUDE.md never recreated | LANDED | **no enforcement**: no test asserts absence | two script comments, F-62 | none |
| E-10 greenfield artefacts carry no past | OPEN | **no enforcement** at HEAD (279 provenance lines in 121 `src` files) | F-62 W-DEMETA-II "plus one invariant" | none |
| E-11 binding verification | PARTIAL | typecheck: `tsconfig.json:22` `checkUnknownProps`. Fallthrough and emits are untyped | F-70 (a `strictTemplates` consumer fixture) | partial |
| E-12 no `:global(.dark)` in scoped blocks | LANDED | gate: `trap-gates.test.ts:176`, bite `:237` | — | enforced |
| E-13 no inset shadow inside `light-dark()` | LANDED | gate: `trap-gates.test.ts:166`, bite `:188` | — | enforced |
| D-1 liquid weight universal | OPEN | gate: `spring-authority.test.ts`, which does not see the hand-rolled loops | F-44 W-SPRING-ONE; F-36, F-16, F-78 | partial |
| D-2 breath of life | PARTIAL | **no enforcement**: `engage-ladder.test.ts:134` is a latch, which F-09 retires | F-54 (hallmarks); the engaged rung is GAP-2 | none |
| D-3 eight laws, cartoon-technicolor, proportion, iOS-27 canon | PARTIAL | review step: the design loops' standing-law list (`design/material/PORTFOLIO.md:33`) carries cartoon-technicolor and proportion only. The eight laws have no text | GAP-C1 | partial |
| D-4 Chrome and Safari | BLOCKED | none until W-SAFARI-BAND's step 0 can pass. It is blocked on the owner's checkbox (§4 OW-3) | F-07 | blocked |
| P-1 execution discipline | PARTIAL | **no enforcement**: no templated review records the tranche-fit, wave and feature passes for an implemented wave | — | none |
| P-2 live-verify needs a captured DELTA | OPEN | **no enforcement**: F-06's law (each BUILD wave ships its paired π and DELTA) is not yet written into any wave, and the visual suite is unwired (F-04) | F-06; F-04 | none |
| P-3 one source of record, finite checklist, critics never mint | PARTIAL | registry: one family per finding, script-checked (REG:58). The finite checklist is F-01's roster, not yet a tracked file | F-01 | partial |
| P-4 tranche format | PARTIAL | review step: the close checklist (FIN §10 form). No gate. BL's PLAN and LEDGER are pending | F-12 (close checklist) | partial |
| P-5 analyze in full | LANDED | review step: seat charters ("each read in full") | — | enforced |
| P-6 overfitting audit at close | OPEN | **no enforcement**: it did not run at the 10.0.0 close | F-12 (a close checklist item with an artefact) | none |
| P-7 never park or move sibling repos | LANDED | review step: seat fences | — | enforced |
| P-8 browser seats are singletons | LANDED | review step: seat charters (one browser seat in sequence) | — | enforced |
| N-1 colocation grand edict | OPEN | **no enforcement** at HEAD. Design loop D1 is producing the placement seal | F-55 W-COLOCATION; F-56 to F-59 fold in; F-60 periphery | none |
| N-2 every chronic decided | OPEN | **no enforcement** at HEAD. This census feeds the W-DECIDE band | F-13 | none |
| N-3 recap all prompts, no silent drops | PARTIAL | review step: this census traces the seed. The recap detector is unbound (F-14's mechanism) | F-14 W-RECAP-CARRY | partial |
| N-6 (with N-9's and N-10c's routing clauses) changes at the root, communicated | PARTIAL | review step: letters land under `BK/coordination/`. BL has no inbox dir and no live relay | F-68 W-LANDING; F-71 W-MAIL-INTAKE | partial |
| CH-1 Opus 5.5 for all seats, no Fable, every spawn declares its model (`CHARTER.md:1-5`) | — | review step: each seat asserts its model id in its header. Nothing reads the runtime model id independently | — | partial |
| CH-2 every partial, banked or abandoned item gets a terminal disposition (charter "Partial progress") | — | review step: this census. `LEDGER.md` is pending | F-11, F-12 (LEDGER formation) | partial |
| CH-3 two consecutive clean passes (registry and design loops) | — | review step: the registry's stability section (REG §8.7: not stable) and each design loop's AGGLOMERATE step | — | enforced |

N-4 is a waiver, not a law. N-5, N-7 to N-15 are asks and are routed in §2.

Tally over the 32 laws: 6 enforced, 14 partial, 11 with no enforcement, 1 blocked.

The 11 formation gaps, each with the smallest act that would enforce the law:

- E-2: W-ONE-ENGINE's born-RED and F-64's literal-fallback detector replace the latch.
- E-5: one line in F-01's roster, or a ruling that review alone suffices, since no violation exists at HEAD.
- E-8: F-01's roster rendered to a tracked file.
- E-9: one absence invariant in F-01's roster.
- E-10: F-62's invariant.
- D-2: GAP-2's fold (§5).
- P-1: PLAN's wave template records the three gestalt passes.
- P-2: the same template carries F-06's π and DELTA obligation.
- P-6: F-12's close checklist item.
- N-1: D1's placement seal lands as a gate.
- N-2: W-DECIDE rows, each with a named ruler.

## 4. Owner items

Only the owner can do these. Seats and the registry name them. Each cites its source rows.

- **OW-1 Trusted Publisher** (C-1; F-13 lists it as an owner act, not built). On npmjs.com: `@mkbabb/glass-ui` → Settings → Trusted Publisher → GitHub Actions, user `mkbabb`, repository `glass-ui`, workflow `release.yml`, environment blank (`release.yml:15-17`). 10.0.0 and 10.0.1 were both published by the user account, not an OIDC identity.
- **OW-2 Delete the `NPM_TOKEN` secret after the first OIDC publish** (C-3; gated on OW-1). The waiver covers rotation, not deletion. The paired glass-ui edit, dropping `release.yml:65-66`'s `env:` pair, rides F-13's Trusted Publisher row.
- **OW-3 Safari remote automation**: two checkboxes (REG §6.7). Safari ▸ Settings ▸ Developer ▸ Allow Remote Automation, and in the simulator Settings ▸ Safari ▸ Advanced ▸ Remote Automation. The operative pref, `~/Library/WebDriver/com.apple.Safari.plist`, reads `AllowRemoteAutomation => false`, unchanged since 2026-09-17 18:51:49 (§7 R-2). This unblocks #6, C-10 and D-4, and F-07's owed-cell roster: #10's device runs, #24 RT-24B, #28 RT-28C, #31 RT-31E, #33 cells 8-9, #38 P15, #39's pair, #41 π-41, #46, #84's Safari column, #87, #88 π10, #90's Safari cells, R2-01's 34-cell battery, and round 4's reversal and RTL cells.
- **OW-4 π-SCROLL: keep or kill** the 0.36 px ink lag under the 1.5 px cap (C-7). It is owner-reserved with no default, and F-13 seats the ruler and a default.
- **OW-5 The three R-7 captures** (#90, consumed by #67): the Siri waveform, the loupe close-up with the L-3 device cell, and the ChatGPT dock motion. Supply them, or rule them unneeded. No BL document names them yet.
- **OW-6 The Σwidth denominator** for GF-TIMELINE (#46; "one OWNER ruling owed, pinned by T-PART-2", EP:6704). Seat a routes it to F-13.
- **OW-7 F-15 owner glances** (the W-DECIDE band, one capture per row):
  - N-7 and O-55 R-2 (the rim in the dock edge) against AY B.5 ("must NOT be baked into the dock"). The registry proposes an opt-in dock seat.
  - The cartoon under-stamp (UIA-KF-069, UIA-F-138, UIA-V-200, -349, -367, -660, per INBOUND-MAP) against the cartoon register.
  - R2-06-08: one aurora per category against "a different custom aurora per page", and "header text 2× smaller", never executed.
- **OW-8 The W-FROST-II glance** (F-31; O-62 and N-13): a light frost at every level against the light veil's dark-ink-by-design token (`tokens/glass.css:29-34`), together with F48's blur ladder, each with a paired π. Design loop D3 is working this subject.
- **OW-9 An owner quote for any RETIRE of an owner ask** (F-14's wave shape). This is needed only if a decide row rules RETIRE. The rows are W-DOCK-COMPOSE-DECIDE (R2-06-01), W-GLASS-REGISTER-DECIDE (R2-06-02, including #24's RT-24C/D and #71's RT-71A), W-COLOR-SOURCE-DECIDE (R2-06-03), and R3-01-16's scroll-glide rows.
- **OW-10 (an option, not an ask)**: close the registry's family set on the evidence so far (REG §8.7), instead of more rounds beyond the 32-seat budget. The formation cursor records round 5 as a deliberate overrun. No seat asked for this ruling. It is listed so the choice is visible.

Not owner items, but formation must name a ruler for each: the F-13 decide rows that name no ruler yet. These are C-4 (V-A95), C-5 and C-6 (#51's colour windows), #28 RT-28D/E, #44, #45, and #78's OWED-1.

## 5. Registry gaps

These are rows no registered family's mechanism holds, merged across the three seats and re-checked against `REGISTRY.md` at HEAD. `REGISTRY.md` has 0 hits for "backdrop root", `Math.random`, "PRNG", "shadcn" and "eight laws". Each gap gets the smallest registry change that would hold it. The registry seat decides whether a change is a widening or a mint, and a mint counts toward the stability law (the formation cursor's carried obligation).

- **GAP-1: a backdrop root above a nested lens leaves it nothing to sample** (seat a).
  - Rows: #7's remainder (the `filter: brightness()` on the lens carrier, `src/components/dock/styles/controls/icon-button.css:89-92`) and #39's RT-39G.
  - Evidence: RT-39G was observed in paint on the sheet halo (BK row 39, `RECORD.md` §11) and generalized library-wide. The library writes the law only for grasp carriers (`src/styles/glass/grasp.css:27-40`). There it names `contain: paint` (`material.css:104-109`) and the grain pseudo's `mix-blend-mode` as formers, and leaves ancestor formers to "the ancestor surface's duty". The `plus-lighter` specular pseudo is at `material.css:247`.
  - Smallest change: F-31 (Frost and the field well) gains one clause and two members. The clause: "or a backdrop root between the lens and its backdrop (a blend-mode pseudo, `filter`, `contain: paint`) leaves the blur inert". The members are #7's merit call and RT-39G. W-FROST-II's frost detector gains a nested-lens arm: a lens mounted inside a `.glass-*` plate has no backdrop-root former between it and what it samples. Mounts are discovered as `glass-subtlety.test.ts`'s carrier arm does, with its scope widened from host formers to ancestor formers. F-21's containment row cures only the `contain: paint` half, so F-31 is the smaller single home.
- **GAP-2: the engaged rung** (seat a's GAP-2, seat b's GAP-B1, and D-2 in seat c: one gap, found three times).
  - Rows: #27's remainder (T1 GROW and the slider exemplar, `BI.W-ENGAGE-AFFORD.md:115`), #77's remainder (the census arm `tests/styles/engage-ladder.test.ts:134`), and D-2 in part.
  - Why no family holds it: F-09 folds each latch subject "to its family" and names none. F-77 holds only the hover-guard half of the same test file. F-54 holds four iOS-27 micro hallmarks.
  - Smallest change: F-54's mechanism widens from "four micro hallmarks never built" to "the engagement register never built: the iOS-27 hallmarks and the engaged rung beyond hover (D-2)", with #27 and #77 as members. F-09's disposition names F-54 as the fold target of `engage-ladder.test.ts:134`. Because the rung spans every component directory, F-54's FOLD into the dock and motion portfolio needs a component-wide design home. Seat c already routes D-2 to F-54.
- **GAP-B2a: randomness has no single source** (seat b, re-counted in §7 R-8).
  - Row: #64 (TR:214 rules the typewriter's one change: its 20 `Math.random` sites move to `src/composables/glass/procedural/prng.ts`).
  - The other sites: two executable `Math.random` defaults in the constellation (`constellationField.ts:127`, `useConstellation.ts:113`) and one in the aurora (`useCursorInteraction.ts:119`).
  - Smallest change: F-65 (Twin sources of record) gains one member, randomness sourced twice (the seeded PRNG and ambient `Math.random`). Its wave shape gains "one randomness source".
- **GAP-B2b: the IDIOM-CLEARED column of the eight-family shadcn ledger** (seat b).
  - Row: #64. The column covers the default visual recipe, wrapper topology, utility vocabulary and public boundary (TR:214). Its DECLARATION column is F-62's, and the shadcn-default `--radius` root is F-64's.
  - Smallest change: F-13 gains one decide row. Either draw the column, whose rows then route by mechanism (utility vocabulary to F-64, wrapper topology to F-58, public boundary to F-66), or retire it on the ground that those families' invariants cover it.
- **GAP-C1: the eight laws have no text of record** (seat c).
  - Row: D-3. "Eight laws" has 0 hits in `docs/canon`, `docs/design`, `docs/precepts`, `DESIGN.md` and `README.md`. It appears only in tranche records (BJ formation, BD greenfield, BL).
  - Smallest change: F-14 gains D-3 as a member. Its existing clause ("the seed gains the missing standing edicts") extends to "each edict the seed names has one text of record under `docs/canon/`, or a ruling that an existing canon document answers it". The design loops' standing-law lists then cite that text.
- **GAP-C2: an enabled control's value reads as disabled** (seat c). Re-check (§7 R-9): **held in part**.
  - Row: N-11b (O-61 R-2).
  - The spectrum variant's range is transparent by design (`src/components/slider/styles.css:246-256`), and its thumb is the only value mark. F-24's round-3 correction already requires "a slider fill end ≥ 3:1 from its track or a value mark at rest" and names only the scrubber (R3-02-13).
  - Smallest change: F-24's slider clause names both variants, and O-61 R-2 joins F-24's born-RED set. The fill-hook API stays an F-71 decide row, as INBOUND-MAP places it.
- **Conditional, not a gap today.** If F-13 rules C-6 BUILD rather than RETIRE, an authored OKLCH value outside the display gamut has no family. F-23's composite-derived band (seat c, C-5) is the nearest home.

## 6. Inbound rows

The 346 external witness rows (O-59 290, O-60 33, O-53 to O-58, O-61 to O-63 and C-2 23) are placed row by row in `audit/INBOUND-MAP.md`. They are not copied here. By status: FAMILY 273, CURED-AT-HEAD 47, CONSUMER-SIDE 20, NOT-REPRODUCED 6, NEW 0. The merge re-counted INBOUND-MAP's row tables, which give the same 346 and the same per-family figures as its own table.

| rows | families |
|---|---|
| 52 | F-68 (2 FAMILY, 47 CURED-AT-HEAD, 3 CONSUMER-SIDE) |
| 42 | F-29 |
| 35 | F-71 (32 FAMILY, 3 CONSUMER-SIDE) |
| 19 | F-24 |
| 18 | F-30b |
| 17 | F-22 |
| 16 | F-16, F-63 |
| 12 | F-31 |
| 10 | F-40 |
| 7 | F-21, F-39, F-70 |
| 6 | F-15, F-18, F-42, F-47 |
| 5 | F-23 |
| 4 | F-30a, F-50 |
| 3 | F-38, F-41, F-48, F-77 |
| 2 | F-17, F-44 |
| 1 | F-26, F-32, F-33, F-34, F-37, F-43, F-49, F-51, F-52, F-64, F-65, F-67, F-73, F-76, F-78 |
| 20 | `—`, no carrier (14 CONSUMER-SIDE, 6 NOT-REPRODUCED) |

Every row outside F-68, F-71 and `—` is FAMILY. 41 families receive at least one inbound row. O-64's six rows landed after the map was drawn and are placed provisionally, not counted (INBOUND-MAP "Landed during round 4"): F-16 4, F-43 1, F-18 1.

## 7. Re-checks

These are rows where two seats disagree, or where a seat's figure bears on another seat's row, all re-measured at `2b52d814`.

- **R-1 fourier's pin (seat b #66 and #76 against seat c E-6).** Seat b is right. `fourier-analysis/web/package.json:19` pins `10.0.1` exact, from commit `3c688d1` (2026-09-23, "repin @mkbabb/glass-ui ^8.0.0 -> 10.0.1 exact"), and its lock resolves 10.0.1. Seat c's "`^8.0.0` ×3" are three agent worktrees (`fourier-analysis/.worktrees/{f3b,f3d,f3e}/web/package.json:19`), not the consumer. Two of six consumers are on 10.0.1 (keyframes.js `package.json:78`, lock 10.0.1; fourier-analysis). value.js is on `^7.0.0` (`:89`, lock 7.0.0), atlas on `^6.0.0` (`:121`) with devDependency `6.0.0` (`:144`), slides on `3.13.0` (`:30`) and speedtest on `^4.0.1` (`:93`).
- **R-2 the Safari pref (seat a #6 against seat c C-10).** Both readings are true, of different files. The container plist (`~/Library/Containers/com.apple.Safari/…/com.apple.Safari.plist`) has no `AllowRemoteAutomation` key. The WebDriver plist that `safaridriver` reads has `AllowRemoteAutomation => false`, mtime 2026-09-17 18:51:49. The block stands (OW-3).
- **R-3 aurora GLSL modules (seat a #49 "13" against seat c C-13a "11").** Seat c is right. `src/components/aurora/constants/shaders/` holds 14 files: 3 WGSL (`aurora.wgsl.ts`, `aurora-image.wgsl.ts`, `aurora-mediums.wgsl.ts`) and 11 GLSL (`aurora.frag.ts`, `aurora.vert.ts`, `aurora-image.frag.ts` and eight `*.glsl.ts`).
- **R-4 latch count (seat a 5, seat b 6, seat c 10).** They agree. There are 10 `it.fails(` calls in `tests/`: `comment-ratio:209`, `radius-role-canon:458`, `engage-ladder:134`, `g-dock-lattice:925`, `gl-excise:112`, `story-preview-card:487,556` and `layout-canon:371,390,403`. The two seat sets share `engage-ladder:134`.
- **R-5 composables count (seat b #62 "108 `.ts` files" against seat c N-1 "108 files").** 108 `.ts` files and 109 files in all. Seat b's figure is exact.
- **R-6 #25 BLOCKED → OPEN (seat a) against #27 PARTIAL (seat a) and #82 PARTIAL (seat b).** OPEN stands. TR:175's ride clause keys the three authorities #25 rides: #22's rung, #27's ladder and #82's register. The ridden parts landed: `4b1a9733` (the #22 cut), `e221f8ca` (`src/composables/motion/engage/engageLadder.ts`) and `7df2ec26` (the field register). What #27 and #82 still owe is either #25's own subject (G-F2's opaque fill, `control.css:73-81`) or rides on #25 (#27's suffusion).
- **R-7 the engaged rung (seats a, b, c).** All three agree no family holds it. Merged as GAP-2. #27's route moves from F-09 to GAP-2 (§1).
- **R-8 `Math.random` (seat b #64).** The typewriter has 20 sites, confirmed. For the constellation, seat b counts five: those are the five lines in code files, of which 2 execute and 3 are comments. The aurora adds 1 site that seat b did not count (`useCursorInteraction.ts:119`). The README's 2 lines are prose.
- **R-9 GAP-C2 (seat c against INBOUND-MAP).** INBOUND-MAP puts O-61 R-2 in F-71 as a letter row. Seat c says no family's mechanism holds the cure. F-24's round-3 invariant already covers a slider's value channel at rest, and the spectrum variant is simply not named. Recorded in §5 as held in part.
- **R-10 F-68's evidence (seats b and c agree).** It is stale: see §8.

## 8. For the next registry pass

These are corrections found by the census. The registry is not edited here.

- F-68's mechanism and evidence read "value.js and keyframes.js install 7.0.0, fourier 8.0.0" and "keyframes.js `package.json:78` `7.0.0`". At HEAD, keyframes.js and fourier pin 10.0.1 exact (R-1), and value.js is at `package.json:89`, not `:88`. §6.5's O-56 R-5 note that "fourier's `^8` needs an explicit repin" is answered by `3c688d1`.
- F-08 gains a datum from seat c's C-16: the CI capture death now also fails as a blank droplet ("blob coverage 0.000", run 35810620398), not only as `Protocol error (Page.captureScreenshot)`.
- The formation cursor's carried registry fold (GAP-1, GAP-2/B1, GAP-B2, GAP-C1, GAP-C2) should read §5 here. GAP-B2 splits into two halves with different homes, and GAP-C2 is held in part.
- `audit/round-5/R5-01.md` (9 findings, 2 seat-NEW on print) is on disk and not yet folded into the registry. It adds no ledger rows.
