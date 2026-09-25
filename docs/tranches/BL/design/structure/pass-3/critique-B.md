# D1 pass 3 · critique of D1-B (sealed modules, flat)

| field | value |
|---|---|
| seat | fresh adversarial critic for D1-B, seat 2. I authored nothing in pass 2 or pass 3. A seat-1 critic was stopped by the 23:15 outage and left untracked files beside mine; I did not read its battery or results, and I credit none of its numbers |
| model | `claude-opus-5-5`, asserted from my own system identity |
| base | worktree cut at `b602a59b` (every pass-3 artifact committed; src identical to 10.0.1) |
| battery | `critique-B/battery/seat-2/` (ITEMS.md, plants.json, probes.sh, run-plants.mjs), sha256 `94863738c63c2f8da3677bb1d7148a3fb815cbf7b3314ebb65bab7539a391b7b` in `critique-B/BATTERY-HASH.txt`, written before I opened `B-kit/`, `B-proto.md` or `xj-*.md` |
| written after the hash | `critique-B/tools/seat-2/`: `adapter.mjs` (maps the battery to the tree's `seal.mjs` and `move.mjs`), `probes-fixed.sh` (one-character bash fix), `extra-i32.mjs` (disclosed supplement), `scc.mjs`, `reorder.mjs`, `fd5-chain.mjs` |
| raw outputs | `critique-B/results/seat-2/RESULTS.md`, sections R1-R13. Every number below cites one |

## 1 · Replay and digest

The migration replays from committed artifacts, run by a non-author. **Confirmed.**

- `node <checkout>/…/B-kit/replay.mjs --root <wt> --twice`: every step applied twice with the second a no-op,
  361.1 s, **`62878b7f2591c37e9cd2151faef9b2d4cd9b21475517e6c227fb2f404651e1cc` over 1,434 files, chain final
  MATCH**. A rerun reports "the chain is applied" in 0.5 s (R1).
- I recomputed the digest in the shell from its definition, without the kit's code, and got the same value (R1).
- A third arm on a fresh worktree applied S1 alone (digest `f0019420…`, equal to SEQUENCE's S1), then resumed and
  reached the same final digest (R1).
- B-proto's digest is reproduced exactly. One procedural note: the kit must run from the checkout. A copy run from
  inside the worktree loses the floor at S1's fd11 row, as the kit's own usage line implies (R1).

## 2 · Items

26 items: S-01..S-13 and B-01..B-13 (REGISTRY §P2-7).

| item | verdict | measurement (RESULTS §) | counterexample, if open |
|---|---|---|---|
| S-01 artifacts committed | **CLOSED** | 114 kit files and B-proto tracked at b602a59b, 0 dirty, 0 changed since; pass-2 kit 84 files tracked (R7) | — |
| S-02 P3-R1 | **CLOSED** | ruled (a); the 7 hooks all under `src/composables/` (R7); `p3r1a.mjs` → 10 kernel entries, 285 names, 0 outside; plant P-B8 caught in B8 and B9 (R3) | — |
| S-03 P3-R2..R9 | **OPEN** | ruled. Measured arms: R4 holds (40 MIGRATION rows, 0 multi-door symbols, R2); R6 glob negated (R7); R7 both files global (R7) | **R3:** `dock/__tests__` holds 16 > 12 (R7). **R5:** no `./aurora-config` key, and B2 reads 71 (R2, R7). **R6:** `isTeleportedTarget.ts` held, not placed by its readers (R2). **R9:** `verify:package` +13,056 B over the base with no ruled row (R8) |
| S-04 FD-1 | **CLOSED** | `placement.mjs` anchor code (20 lines); seal meta anchored 38 (R2) | — |
| S-05 FD-2 as a stop | **CLOSED** | a hook move into dock is refused at preflight (105 added pairs, nothing written) (R5). The whole migration shrinks coupling: value SCCs 2/4 → 0/0, module SCC members 23 → 4 (R6) | — |
| S-06 src self-name | **CLOSED** | P-I6 → B0 `self-name-in-src` (R3) | — |
| S-07 computed-read census | **CLOSED** | opaque-`n` forms X-I32/b/c → B0 `computed-read` (R4). My hashed P-I32/b/c used a constant `n`, which F-1 folds into a resolved read; B16 homed them (R3) | — |
| S-08 F-2 rewrites, dist names, glass/theme moves | **CLOSED** | `glass/index.css` and `theme/index.css` exist, and the old sheets are gone; `dist/styles/theme.css` built; 0 empty dirs (R7, R8) | — (see outside finding O-2) |
| S-09 idempotent rows and chain | **CLOSED** | `--twice`, rerun no-op, and resume after S1 all MATCH (R1) | — |
| S-10 FD-3, FD-4, FD-5 | **OPEN** | FD-3: one `isSlot`, imported by bounds and placement. FD-4: cascade verify normalises; only a reorder class shows (R8) | **FD-5:** the floor's classifier rejects the floor engine's own rewrite. `tests/gates/token-hygiene.test.ts` is written by no row, yet reads `UNCLASSIFIED … text differs beyond its references` (the F-2 rewrite `join("src","styles","tokens.css")` → `join("src/styles/tokens/index.css")`) (R13). The chain never ran FD-5 per step |
| S-11 FD-6, 7, 10, 11 | **CLOSED** | 0 FD-6-class failures: the 6 non-seal failures were timeouts at load 156 and pass in isolation, 72/72 (R8). `tsconfig.build.json` absent; YAML tokens read (P-B13y against control P-B13c, R3); 0 floor paths under `docs/` read by code (R7); legal L3 CLEAN (R3) | — |
| S-12 π and Playwright executed | **OPEN** | my π floor through the seat: GREEN 3/3 (R10). The route ran 65 specs on both trees: 134 passed / 190 failed each, 0 new failures (B-proto §6) | The route's spec list leaves out every spec that reads chip paint (`css-critical`, `demo-design`, `glass-cal`, `page-chassis`, `storybook-meta`), and its `newFailures 0` misses a real chip paint change (R9, R10; see B-08). The run was executed, but it carries no signal on a band the chain moved, and 58% of its tests are red at base |
| S-13 merge test | **CLOSED** | `xj-GonB.md` and `xj-BonG.md` committed, each clause by clause, with results files (R7, commit listing) | — |
| B-01 every seal clause GREEN | **OPEN** | 14 of 17 at 0; 25 of 26 regression plants land in their intended clause (R3) | **B0 450, B2 71, B6 61** (R2). And **P-B4 MISSED:** a value cycle `chip/zzCycA.ts ↔ zzCycB.ts` produces no line, because the seal files same-directory file cycles under `meta.b4info` (2 on the tree), which LAW §8 does not state (R2, R3) |
| B-02 kernel shims 0 | **CLOSED** | B8 0, B9 0, 0 multi-door symbols; 40 MIGRATION rows, one per drop (R2) | — |
| B-03 I6 caught | **CLOSED** | P-I6 → B0 (R3) | — |
| B-04 R-3 catches I11, I12 | **CLOSED** | both → B16, the R-3 clause; L3 CLEAN (R3) | — |
| B-05 B10 judges scripts | **CLOSED** | P-I38 → B10 `scripts/zz-orphan-helper.mjs -> scripts/zzmod` (R3) | — |
| B-06 B13 reads YAML | **CLOSED** | P-B13y → B13; control without the YAML token has no B13 line (R3) | — |
| B-07 names | **CLOSED** | `utils`, `v2`, `misc`, `part-1`, `slider/useDockZz.ts` and a new `use.ts` → B15 (R3). `detents/use.ts` is now `useSheetDetents.ts`; `slider/useDockHold.ts` is a reviewed name in the pin, with its reason | — |
| B-08 `accent-tone.css` per P3-R2 | **OPEN** | the sheet stays in `chip/`, loaded through the chip CSS door, which `src/styles/index.css:209` imports (R7) | **Its rung changes paint.** Every Chip carries `glass-chip … accent-tone`. At base `.glass-chip` (rule 204) follows `.accent-tone` (142), so `--accent-band-strength: max(18%, calc(var(--chip-tint-floor) + 10%))` wins: 22% light, 25% dark. On the migrated tree `.accent-tone` (354) follows `.glass-chip` (203), so 18% wins. Both rules sit in one layer at (0,1,0) (R9). LAW §6's premise ("each writes selectors that no sheet between its two rungs targets") is false for this pair. Also, **the routes disagree:** G puts the sheet in `src/styles/`, and P3-R2 says "both routes must agree" |
| B-09 style kernel carved | **CLOSED** | `src/styles` dirs over 12: none; files over 500: none; glass/ and theme/ doors in the record (B7 0) (R2, R7) | — |
| B-10 B-S7..B-S16 | **OPEN** | S7 (B4 0), S8/S9 (B-02), S13 (77 slots), S15 (scripts modules, B7 0) hold | **S10** `./aurora-config` absent; **S11** 20 src files over 500 lines; **S12** B0 450; **S14** partial (B2 71; the manifest is still 1,098 lines; demo dirs 13, 13); **S15** 3 scripts over 500 lines; **S16** `tests-visual` holds 177 direct files (R7) |
| B-11 `npm test` refuses `--no-pin` | **CLOSED** | `npm test -- … --no-pin` → exit 1, `Unknown option --pin`; a missing pin throws "the gate has no off switch" (R11) | — |
| B-12 door cost against the alternative | **CLOSED** | xj-GonB §4, committed: 158 doors / 141,307 B, G's reading 81 / 95,142 B, battery 84 vs 83 of 89. My recount on the replayed tree matches: 158 files, 141,307 B (R7) | — |
| B-13 1,902 against 1,888 | **CLOSED** | `b13.mjs` reproduces the kit's 14 named lines exactly: B0 +13 (the gate's own file) and B11 +1 (`index.mjs` exports seal). My critic arm reads 1,888 because the checkout's code has moved 9 files since b602a59b (B1 ±8, B6 +2/+3) (R12) | — |

**Convergence: 20 closed / 26 = 76.9%.**

## 3 · Re-opened items

Against the route's own claims in B-proto §4:

- **S-12** (claimed met): the browser run cannot see a paint change the chain made (B-08's counterexample).
- **B-08** (claimed placed): the placement's rung changes chip paint, and it disagrees with G.

No earlier critique closed any item on the frozen checklist. The pass-2 critic scored B by a different formula
(§P2-0), and the seat-1 pass-3 critic left no report.

## 4 · Outside the checklist

- **O-1 · The B4 exemption is not in the law.** A file-level cycle between siblings in one directory goes to
  `meta.b4info`, not to B4 (P-B4; 2 such cycles on the tree). LAW §8 says "acyclic at every depth". This maps to
  B-01, which is already open, so it re-opens nothing new. Either the law states the exemption, or the clause counts
  them.
- **O-2 · A masking fallback survives the theme move.** `vite.utility-emit.ts:86` still returns silently when
  `src/styles/theme/index.css` is missing (R8). FLOOR-P3 gap 3 assigned this to a route row. The edict bans masking
  fallbacks, and no checklist item covers that clause, so **this re-opens convergence**. The next registry should add
  it as an item.
- **O-3 · The F-2/FD-5 mismatch** (S-10's counterexample) is a floor defect, shared by every route: critique-G reports
  FD-5 failing on G's tree too.
- **O-4 · `seal.mjs --pin <file>`** lets a CLI caller swap the reviewed pin. `npm test` cannot reach it (R11), so B-11
  holds. It is a second pin path all the same.
- **O-5 · `npm test` under load.** At load 131-156, six tests time out that pass in isolation (R8). This is not a tree
  defect, but a gate that "fails only the RED clauses" needs a quiet machine to show it.

## 5 · Verdict

**ADVANCE, not converged.** 6 of 26 items are open (S-03, S-10, S-12, B-01, B-08, B-10), two items re-opened, and one
outside finding (O-2) maps to an edict clause the checklist leaves out. None of the open items needs a missing
primitive:

- **B-01, B-10, S-03:** planned work the route itself lists (B-S10..S12, B-S14, B-S16, `./aurora-config`, the
  ratchet row, the slot bound).
- **S-10:** a floor fix.
- **B-08 and S-12** have one cure. Place `accent-tone.css` so the cascade keeps `.glass-chip` after it, or merge the
  two declarations, and agree the placement with G. Then run a browser spec that reads chip paint, which the route's
  list lacks.

The replay is exact and the coupling defect from pass 2 is cured (R6), so the route's core stands. The two-clean-passes
count starts from zero.

## 6 · Fences

- **Writes in the checkout:** only `critique-B/BATTERY-HASH.txt` (rewritten; seat 1's record kept verbatim inside it),
  `critique-B/battery/seat-2/*`, `critique-B/tools/seat-2/*`, `critique-B/results/seat-2/RESULTS.md` and this file,
  all through Write or Edit. One `sed -i` edit touched my own `tools/seat-2/reorder.mjs`.
- **Git:** worktree add and remove only, at the named scratch path, four times. It is removed at the end: `git worktree
  list` shows no crit-B entry, and `git status` shows no tracked change.
- **Other repos:** siblings read for one version check (`node_modules/@mkbabb/glass-ui/package.json`). Nothing was
  built or run there. `~/.claude` was not read.
