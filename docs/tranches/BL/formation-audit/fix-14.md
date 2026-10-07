# BL — formation fix, seat 14

| field | value |
|---|---|
| seat | formation fix seat 14, before audit pass 14. Answers `formation-audit/pass-13.md` (FM-01 to FM-05) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `f9cf010e` (pass 13 banked). The plan and `src` this seat edited and probed are that commit's |
| where probes ran | a worktree at `f9cf010e` (`.claude/worktrees/bl/formation/fix-14/wt`, `node_modules` and `tests-visual/node_modules` symlinked). No build, no browser. A partial directory at that path (its `.git` naming an admin entry that did not exist) was removed, `git worktree prune` dropped stale admin entries, and the worktree was re-added. Every plant was undone: the sweep restores each file it plants or cures, and `git status --short` in the worktree read 0 lines after every run. One manual probe restored `src` in the worktree with `git checkout -- src` before this seat switched to restoring from `git show HEAD:<path>`; that was inside the worktree, not the checkout. The worktree is removed before return |
| machine | no timing cell was read. The Playwright and chrome-devtools MCP servers failed to connect. Real Safari is UNMEASURED (OW-3) |
| writes | `PLAN.md` (one note), `waves/W-0.12.md`, `W-H.6.md`, `W-E.9.md`, `W-E.3.md`, `W-C.5.md`, `W-E.11.md`, `W-0.7.md`, `W-E.4.md`, `W-E.8.md`; under `formation-audit/sweeps/`: `hold-line-claim.py` (three new arms, a survival check, the SPEC table, widened entries) and a `# ===== fix-14` section appended to every `.out`; this file. `LEDGER.md` needed no change (below). The plan has no `MIGRATION.md` |
| fences | nothing under `design/` read, run or written; no git write in the checkout; no sibling repo touched; every sweep ran with `PYTHONDONTWRITEBYTECODE=1`, and `sweeps/` holds no `__pycache__` |

## Result

| finding | class | sweep | before (plan at `f9cf010e`) | after |
|---|---|---|---|---|
| FM-01, FM-02, FM-03 | a static gate passes on a spelling of the defect its pass cell or spec names | `hold-line-claim.py`, CLAIMS widened, NOUN arm new | **exit 1**, open 33: NARROW 28 (G1 6, E3-G9 7, E9-G7 9, H6-G3 6) | **exit 0**, open 0 |
| FM-04 | a static gate fails on the cure its own spec writes | `hold-line-claim.py`, C plants (WIDE on the cure form) and the cure-op survival check, both new | same run: CURE 1 (C5-G7), WIDE 2 (E11-G6, H6-G3) | same run |
| FM-05 | the sweep's plants are the seat's guesses, never the spec's cure, so a gate that forbids the cure passes the sweep | `hold-line-claim.py`, NOSPEC, NOCURE and NOUN arms | same run: NOSPEC 2 (E4-G19, E8-G4: §3 did not state their cure) | same run |

Full before and after: `formation-audit/sweeps/hold-line-claim.out`, section `# ===== fix-14`. The before run reads the plan at `f9cf010e` through `BL_ROOT=<worktree>/docs/tranches/BL`, with the extended sweep. Summary lines:

- before: `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 437, open 33`, exit 1;
- after: `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 442, open 0`, exit 0.

Other sweeps, after: `reshape-order.py` 0 (rows 83), `borrowed-red.py` 0 (rows 1), `inbound-fold.py` 0 (ids 37), `release-gates.py` 0 (waves 102, band-0 loop gates {D2, D3}), `chronic-decided.py` 0 (members 51, ledger rows 825), `ledger-terminal.py` 0 (825 rows), `hold-line-scope.py` 0 (2), `fl6-plate-reads.py <checkout>` 0 (reads 27), `fail-open-gates.py <worktree>` 0 (gate rows 730, fail-open rows run 124, was 123: E3-G9's two spans became one longer one), `plan_dag.py` and `gates.py` 0. Every table in the nine edited wave specs has a constant column count.

## The class, and the sweep

**Class.** A static gate that forbids something must (a) fail on every form of the defect its pass cell or its spec names, and (b) pass on the cure its spec writes, written as the spec writes it. Fix-13's sweep tested (a) only against the spellings its seat listed, and never tested (b): the cured base was the gate's own hits deleted.

**What the sweep now does** (`formation-audit/sweeps/hold-line-claim.py`, docstring `:1-60`):
- **SPEC** (`:620`) gives every one of the 65 S entries a quote of its cure from its wave spec, outside §5. A quote may also come from another wave, as `"W-x.n: …"`.
  - The cure form is a `C` plant. It is planted on the cured base and must pass (WIDE otherwise).
  - Or the entry is marked `deletion`, when the cure writes nothing in the gate's files. The cured base, which must pass, is then the cure.
- **NOSPEC** fires when the quote is missing or is not in the spec.
- **NOCURE** fires when an S entry has neither a `C` plant nor a `deletion` mark.
- **NOUN** (`nouns`, `:1043`) fires on any class, custom property or dotted or called name that is named in backticks in the gate's title, its pass cell or the spec quote and carried by no plant. This is how the sweep reaches spellings no seat listed: the spec's own nouns become plants.
- **The survival check** (`cure`, `:981-1013`) fires CURE when the gate's own searches strip text that a cure op wrote. That text is the spec's cure.

**Instances it listed.** All 33 are at the sweep's before run above. One more was found while writing SPEC's quotes and is cured below (W-0.7 G2). It contradicts in the spec's prose, which no plant can read.

## FM-01 · W-0.12 G1 passed `.dock-layer`, `.dock-layers > *` and a state-set custom property

**Cure.** `waves/W-0.12.md:41`, G1's awk:
- The subject test is `\.dock-layer(s|--…)?`, so it also matches the base class `.dock-layer`. Both layers carry it (`GlassDock.vue:464,478`).
- It also matches any last compound directly under `.dock-layers >`.
- A custom property set by a dock-state rule without the morph gate is recorded, and so is any custom property that reads it, closed to a fixed point at END. An ungated layer rule whose sizing value reads such a property fails.

The pass cell names all three. The HEAD cell records:
- **At HEAD:** exit 1, with one rule, `layers.css:349` (the same live defect).
- **On the cured base** (`:348` gated, which reads exit 0), each of these exits 1:
  - `.dock-layer { width: 0 }`;
  - `.dock-layer.is-active`;
  - `.dock-layers > *`;
  - `.dock-layers > .dock-layer`;
  - `--x` set under `.collapsed` and read by `.dock-layer--full { width: var(--x) }`;
  - the same read through `--y: calc(var(--x) * 2)`.
- **Exit 0** for a gated read on either side.

Sweep entry: `hold-line-claim.py:168`, six new red plants, with §3 item 1's gated rule as its `C` plant.

## FM-02 · H6-G3 passed a second radius under a `--glass-blur-` name

**Cure.** `waves/W-H.6.md:66` now has three spans.
- **Span 1.** The exemption is the five rung radii `--glass-blur-{wash,quiet,resting,floating,overlay}-radius` and `--glass-level`, each read with no fallback.
- **Span 2.** Unchanged.
- **Span 3 (new).** It fails any declaration of a `--glass-blur-*-radius` token or of `--glass-level` in the six seat files. The tokens' one source is `src/styles/tokens/glass.css:69-73`.

**Also cured, same class as FM-04.** Fix-13's first span failed §3 item 1's own form, `calc(var(--glass-blur-resting-radius) * var(--glass-level) * -2)`, on the `--glass-level` read. Fix-13's span exited 1 on it in the worktree. The widened spans exit 0 on it.

**HEAD.** All three spans exit 0 (the hold line). The one prose hit of span 3, `surfaces-pager.css:31`, is a comment, and span 3 reads only declarations that follow `{`, `;` or a line start.

**Bite.** Each of these exits 1:
- `--glass-blur-pad: 32px` read as `calc(var(--glass-blur-pad) * -1)`;
- `--glass-blur-resting-radius: 32px` re-declared beside its read;
- `var(--glass-blur-resting-radius, 32px)`;
- `var(--glass-blur-tier-radius)`;
- `var(--glass-blur-resting)`;
- `--glass-level: 4`;
- a multi-line, upper-case `--GLASS-BLUR-quiet-radius`.

Sweep entry: `:479`.

## FM-03 · E9-G7 and E3-G9 passed the defect their specs name

**E9-G7** (`waves/W-E.9.md:69`). The gate is now one `rg -niU` over both files.
- It fails any `@media` whose query names `width`, `inline-size` or `aspect-ratio`, in any syntax, unit, case or line split.
- It also fails `matchMedia`, `useMediaQuery`, `useBreakpoints`, `useWindowSize`, `innerWidth`, `visualViewport`, `screen.width` and `documentElement.clientWidth`.
- **HEAD:** exit 1 (`useTabResponsive.ts:13`, `LabeledField.vue:127`).
- **Red on the cured base:** `width < 36rem`, `width <= 36rem`, `max-inline-size`, `576px`, a split upper-case query, `useWindowSize`, `visualViewport.width`, `screen.width` and `documentElement.clientWidth`.
- **Green:** §3 item 5's `@container field (max-width: 36rem)` and item 4's `ResizeObserver` on the strip.

**E3-G9** (`waves/W-E.3.md:69`). The gate is now one chain.
- In `src/components/sheet`, any `min-block-size` or `min-height` that is not `0` or `var(--touch-target)` fails. So do any `min-h-*` utility but `min-h-0` and any `minHeight` or `minBlockSize` write.
- In `use.ts`, any viewport read but `visualViewport` fails. That read is §3 item 3's span.
- **HEAD:** exit 1 (`styles.css:531`, `use.ts:85`).
- **Red on the cured base:** `var(--sheet-floor)`, `min-height: calc(…)`, `max(…)`, an upper-case split declaration, `min-h-[50vh]`, `el.style.minHeight` and `documentElement.clientHeight`.
- **Green:** HEAD's `0` and `var(--touch-target)` floors, and §3 item 3's `visualViewport.height` span with the `--sheet-floor` publish.

Sweep entries: `:414` (E9-G7) and `:367` (E3-G9).

## FM-04 · C5-G7 forbade the one read W-C.5 prescribes

**Cure.** `waves/W-C.5.md:82` now reads:

`! rg -n 'Math\.random|getRandomValues|randomUUID' src -g '!**/procedural/prng.ts' && ! rg -n 'Math\.random|randomUUID' src/composables/glass/procedural/prng.ts && test "$(rg -c 'getRandomValues' src/composables/glass/procedural/prng.ts)" = 1`

**Readings in the worktree:**
- **HEAD:** exit 1. The first clause lists 28 lines in 10 files.
- **On the cure:** those lines stripped and `freshSeed()` appended to `prng.ts`, the form of §3 item 7. Exit 0.
- **Red on that tree:**
  - a second `getRandomValues` read in `prng.ts`: exit 1;
  - `Math.random` in `prng.ts` and `randomUUID` elsewhere: both red in the sweep.

Sweep entry `:329`: the cure op writes `freshSeed()`, and the survival check holds it.

**The class, swept.** The new arms listed every gate that forbids its own spec's cure:
- C5-G7, as CURE: its own search stripped the cure op's `freshSeed()`.
- **E11-G6, as WIDE.** `waves/W-E.11.md:67` counted every `font-family: …Plus Jakarta Sans Fallback…` line `-le 1`, so §3 item 4's four platform faces failed it.
  - Fix-13's span exits 1 on them in the worktree.
  - It is now `test -z` over the names declared twice, compared without quotes, spaces or case.
  - HEAD: exit 1 (four faces share one name).
  - On the cured base: the four named faces exit 0, and a duplicate name in either quote or case exits 1.
  - Sweep entry `:348`.
- H6-G3, as WIDE: under FM-02.

Found by reading while quoting, not by a plant:
- **W-0.7 §3 item 2** (`waves/W-0.7.md:57`) told each CHANGELOG bullet to "name its inbound row: O-62 …". G2 forbids `O-[0-9]+` in that section, and the same item's last sentence holds E-10.
- E-10 is the source of record. The item now says each bullet speaks in the record's own words, and that the wave record maps bullets to inbound rows.
- The O-id list stays in the spec, so `inbound-fold.py` still reads it (exit 0, ids 37).

## FM-05 · the CLAIMS entries were narrower than the class

**Cure.** The arms above.
- NOUN made the sweep require the plants pass 13 named: `.dock-layer--full`, `--sheet-floor`, `--glass-blur-<rung>-radius` and `--glass-level`. Its first run on the fixed plan also caught this seat's own E9-G7 pass cell, which names `screen.width` and `documentElement.clientWidth`; both were added as plants.
- NOSPEC found two gates whose spec never stated the cure they hold. The fix states each in §3:
  - `waves/W-E.4.md:67` item 11. `--z-toggle` takes a rung of the z scale. The content seam passes one side offset, read from a token in `tokens/offsets.css`. That is E4-G19's claim (UIA-V-676, UIA-F-219, `audit/INBOUND-MAP.md:270-271`).
  - `waves/W-E.8.md:55` item 5. Metric reads `--radius-ctx` (UIA-F-149, `INBOUND-MAP.md:458`), and §4 now lists `src/components/metric/styles.css`.
  - Neither is new scope. Each LEDGER row already points at these gates (`LEDGER.md:692,693,835`), so the ledger is unchanged.
- The 65 SPEC entries, by kind:
  - 49 carry a `C` plant: the spec's form, quoted, planted and passing.
  - 16 are marked `deletion` with the quote that says so: A4-G8, A6-G6, B1-G3, B13-G4, B15-G3, C1-G1/G2/G4/G5, G1-G3, G3-G7/G8, J1 G11/G12, G-L3-9, and G-L8-14 (quoted from W-C.1 §3 item 4).

## Notes outside the checklist

- **Pass 13's note on `PLAN.md:392`** is cured. W-0.12 is named among the band-0 waves that read D2's harness at its `docs/` path.
- **C5-G7's prose hits** (`constellation/README.md:43,144`) still fail closed, as pass 13 noted. The cure strips them.
- **The mechanical reach of the class.** The arms read static gates only, 137 rows. A measured gate that forbids its own cure would need a browser, and none ran at this seat.

## Open

- Real Safari: UNMEASURED (OW-3).
- `hold-line-scope.py` still does not cover born-RED gates, for fix-13's reason.
- W-0.12's per-frame strip still has no formation reading (no browser).
