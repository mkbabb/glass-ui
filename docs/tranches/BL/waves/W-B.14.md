# W-B.14 · The source-derived colour registers decided: RETIRE under E-5, the owner's words asked for · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree |
| ships in | 11.0.0 |
| families | F-14, the R2-06-03 split (W-COLOR-SOURCE-DECIDE, `audit/REGISTRY.md:329,340`) |
| depends on | W-B.1, W-B.3 (the rows are carried in `RECAP.md` first) |
| dependants | — |
| ruler | the owner (OW-9: these are owner asks, and a RETIRE quotes the owner); seat recommendation RETIRE |

## 1 · What it closes

R2-06-03's seven owner asks (`audit/round-2/R2-06.md:52`): BDU R36 the album-art-reactive aurora (`deriveAuroraPalette(img)`), BDU R39 the Pantone glass colour card over a live aurora, BDU R40 the colour-protagonist register (`<AuroraProtagonist :seed>`, the date → seed ritual), BDU R41 the seed → palette morph, BD2 A6 the metal medium absorbing the album hue, BD2 A45 the dock live-tracking the album-art field, BDC CP-5 the transmissive hue-bleed deep dock.

## 2 · The defect at HEAD

- Seven owner asks with no terminal since BD (`BD/union/PROMPT-RECAP.md:76,79-81` read "NOT"). None is built: `git grep -nE 'ColorCard|AuroraProtagonist|deriveAuroraPalette' -- src` prints nothing; `auroraImageSource.ts:1-17` dissolves a photo and derives no palette; the dock sampler is luminance only (`GlassDock.vue:22-29`).
- No consumer names any of them: none of the 442 inbound rows (`INBOUND-MAP.md`) and none of the uncarried letters W-B.2 lists asks for an image palette, a colour card, a protagonist or hue tracking.

## 3 · The cure

1. **Recommendation: RETIRE the seven.** Ground: E-5 (the library's own tokens evolve in `src/styles/`; a colour source that re-themes a page from content is a consumer composition over `deriveAurora` and the palette tokens, which ship), and E-7 (an artefact with no second site and no reader). BD2 A45 and BDC CP-5 touch the dock's material, which D3 (the live luma, M-5) and D2 converge on: a RETIRE here does not constrain those loops, which build what their gates need.
2. **The owner is asked once** (OW-9, in the owner docket, one question listing the seven with their BD sources): "None of these has a consumer. Retire them, or name the ones to build?" The answer is quoted verbatim into each ledger row. A BUILD answer names W-G.4 (the aurora greenfield) as the wave for R36, R39-R41 and A6, and W-I.1 for A45 and CP-5, each with a born-RED e2e.
3. On silence at W-L.8: each row's terminal is "RETIRE recommended, OW-9 not answered", listed in FINAL.md, never re-booked (PLAN §1).

## 4 · Files it touches

`docs/tranches/BL/LEDGER.md` (seven rows, OW-9); `docs/tranches/BL/ledger/RECAP.md` (their carry rows cite this wave).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B14-G1 · each ask terminal with the owner's word or the docket row | `node scripts/tranche/verify-ledger.mjs docs/tranches/BL --rows BDU-R36,BDU-R39,BDU-R40,BDU-R41,BD2-A6,BD2-A45,BDC-CP-5,OW-9` | exit 0 (a RETIRE with no quote fails unless OW-9 is on the docket) | **exit 1** (absent) |
| B14-G2 · carried in the recap | `node scripts/tranche/verify-recap.mjs docs/tranches/BL` (the seven ids present, terminal W-B.14) | exit 0 | **exit 1** (absent) |
| B14-G3 · a RETIRE without a quote is caught | B14-G1 on a ledger copy with OW-9's docket row removed | exit 1 | — |

The seven subjects have no code at HEAD, so no code gate can be RED for a RETIRE; the gates are the record and its checker, and B14-G3 shows the checker refuses a silent retire.

## 6 · π and DELTA obligations

None for a RETIRE. A BUILD answer puts the captures in W-G.4 or W-I.1.

## 7 · MIGRATION rows

None.

## 8 · Ledger rows

R2-06-03's seven rows; OW-9 (this subset).
