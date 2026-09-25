# W-B.11 · The design canon decided: RETIRE the salvaged body and emitter; the canon is derived (W-C.3) · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree |
| ships in | 11.0.0 |
| families | F-13, the #78 split (OWED-1, OWED-2) |
| depends on | W-B.1 |
| dependants | W-C.3 (builds the derivation and its invariants), W-C.1 (retires the tooling left under `docs/`), W-H.1/W-H.2 (the material section is written from D3's converged ladder) |
| ruler | seat |

## 1 · What it closes

#78 W-DESIGN-CANON (`census-register-b.md:64`), BLOCKED since BK: OWED-1 (the §1 re-author) and OWED-2 (the emitter's shipped form), both "above an implement seat" (BK EP:6669).

## 2 · The defect at HEAD

- **The salvage describes a material the tree no longer has.** The 907-line body and 288-line emitter sit at `docs/tranches/BJ/audits/2026-07-28-claude-resume/salvage/W-DESIGN-CANON-APOTHEOSIS/{DESIGN.md,regen-design-canon.mjs}`. BK's seat ran the emitter: 4 of 6 blocks emit, 2 throw on retired tokens (`--glass-opacity-wash`, `--glass-saturate-floating` absent from `src/styles/tokens/glass.css`); per-rung α became `--glass-veil-{rung}` off a base and step, saturate collapsed to one token, and §1.1's prose indicts defects the tree no longer has (EP:6669). `git grep -c` confirms both tokens 0 in `src`.
- **The shipped docs cite tokens that do not exist.** At this seat, the custom-property names cited in each doc against every `--name:` declaration in `src`: `DESIGN.md` cites 324, **105** resolve to no declaration (among them `--glass-highlight`, `--glass-shadow`, `--spring-smooth`, `--spring-snappy`, `--spring-bouncy`, `--spring-gentle`); `docs/canon/glass-system.md` 11 of 24 (`--glass-bg`, `--glass-blur`, `--glass-opacity`, `--glass-opacity-dock` …); `docs/canon/motion-system.md` 6 of 8; `README.md` 19 of 41. The scan uses declarations in `src` only; a name that the build emits from TS would read unresolved here, and W-C.3's invariant runs over the built CSS to exclude that case. `--spring-smooth` is truly gone (0 hits in `src`), and KFA-168 shows a consumer hit it.
- **Tooling under `docs/`.** `git ls-files docs | grep -c regen-design-canon.mjs` → 1.

## 3 · The cure

1. **RETIRE OWED-1 and OWED-2.** The salvaged body is not re-authored and the emitter is not shipped. Ground: both encode a schema whose columns have no sources (BK's measurement), and a hand-authored canon of that size is the drift F-63 names.
2. **The canon is derived.** W-C.3 builds its two invariants (every symbol and subpath a doc names exists; every token a doc names is declared in the built CSS) over README, DESIGN.md, `docs/canon/`, component READMEs and JSDoc, and deletes or rewrites every stale cite. Token tables in DESIGN.md are generated from the token sources (F-65's "TS tables generate CSS") rather than typed. DESIGN.md's material section is rewritten once, from D3's converged ladder, in W-H.1/W-H.2.
3. The salvage directory is a BJ record and stays; its `.mjs` leaves `docs/` under W-C.1's rule (frozen record scripts retire, with an invariant against new ones).

## 4 · Files it touches

`docs/tranches/BL/LEDGER.md` (#78, OWED-1, OWED-2). The derivation is W-C.3's; the script's removal W-C.1's.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B11-G1 · decision recorded | `node scripts/tranche/verify-ledger.mjs docs/tranches/BL --rows #78,OWED-1,OWED-2` | exit 0, RETIRE with ground, W-C.3 named | **exit 1** (absent) |
| B11-G2 · no dead token cite in the docs (built in W-C.3) | W-C.3's token-existence invariant over `DESIGN.md`, `docs/canon/*.md`, `README.md`, component READMEs, against the built CSS | 0 unresolved | **105** unresolved in `DESIGN.md` alone by the `src` scan above |
| B11-G3 · no tooling under `docs/` (built in W-C.1) | `test "$(git ls-files docs \| grep -cE '\.(mjs\|js\|ts\|py)$')" -eq 0` | exit 0 | **exit 1**: 724 tracked script files under `docs/`, `regen-design-canon.mjs` among them |

B11-G2 and B11-G3 are born RED here and bound to W-C.3 and W-C.1; this wave closes on B11-G1.

## 6 · π and DELTA obligations

None: a records decision.

## 7 · MIGRATION rows

None.

## 8 · Ledger rows

#78 (RETIRE the re-author and the emitter; FOLD the canon into W-C.3); the #90 residue "the canon LAND to #78" (`census-register-b.md`, #90 note) closes with it.
