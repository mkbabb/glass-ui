# D1 pass 3 · critique-G: the fresh adversarial critic of route D1-G

| field | value |
|---|---|
| seat | CRITIC, route D1-G (eponymous closures). Authored nothing in pass 2 or pass 3 |
| model | `claude-opus-5-5`, asserted from the seat's own identity |
| cut | worktree at `b602a59b` (`<scratch>/D1/p3b/crit-G/wt`); the checkout's HEAD had moved to `edc74712`, so the kit and floor were read from `git archive b602a59b`, never from the working checkout |
| battery | written and hashed before reading `pass-3/G-kit/`, `G-proto.md` or `xj-BonG.md`: `critique-G/battery/` (BATTERY.md, probes.mjs, plants.mjs), sha256 `68be47ff701f8b7b3fdcaa6daf8bb7c914c5cb04d2bc517f87d94422d0756e18` (`critique-G/BATTERY-HASH.txt`) |
| tools written after the hash | `critique-G/tools/`: `gate-counts.mjs`, `fd2-both.mjs`, `fd2-witness.mjs`, `s05-units.mjs`, `literal-law.mjs`, `plants-transcribed.mjs` (each disclosed in §3) |
| results | `critique-G/results/` (29 files). Every number below is in one of them |

Paths: `P` = `docs/tranches/BL/design/structure/pass-3`, `K` = `P/G-kit`, `C` = `P/critique-G`, `T` = the replayed tree.

**Verdict: BLOCK is not warranted, CONVERGED is not reached. 13 of 25 items CLOSED, 12 OPEN, convergence 52%. Verdict ADVANCE.** The replay is exact and the gate is real (26 of 31 intended plants bite), but the chain's "FD-2 +0 at every step" holds only under a unit function G wrote for itself (L0.3). Under the floor's R-2 units the migrated tree's static module SCC grows from 14 to 91 members, and the S-18 move FD-2 was built to stop adds 0 pairs under G's reading against 129 under R-2's.

---

## 1 · Replay (STEP 2)

Command, run as a non-author against committed artifacts only (`replay.sh`'s two steps, with the kit and floor taken from `git archive b602a59b` into scratch rather than from the checkout's working tree):

```sh
git worktree add --detach <scratch>/crit-G/wt b602a59b            # + both node_modules symlinks
node <archive>/…/floor/rows/apply.mjs --root <wt>                 # 8 floor rows
node <archive>/…/pass-3/G-kit/tools/replay.mjs --root <wt> --twice
node <archive>/…/pass-3/G-kit/tools/replay.mjs --root <wt>        # whole-chain rerun
```

`C/results/replay-1.log`, `replay-2.log`:

- base code digest `f0019420f925151f5983dd1c43a5bd56dfa367efa19ac79712de5af56e991a8c` = `SEQUENCE.base`;
- all 28 steps reach their recorded digests; every second application is a no-op (304 moves in 8 lists, 19 rows, 1 land step; `refused` appears 0 times);
- **final code digest `b26243ef15a498507db269e4621e6271b3f99f66b36c2d39ff5fc5e1d37eb7c6` over 1,360 files: MATCH** with G-proto and xj-BonG (1,145 s);
- rerun: `the chain is applied; nothing to write` (5.9 s).

**Digest confirmed.** The kit is committed at the cut: 100 files tracked under `K/`, 0 untracked under `P/` (`probes S-01`).

## 2 · The route's gate on the replayed tree

`node scripts/structure/eponym/eponym.mjs --root .` (`C/results/gate.log`), exit 1:

`E0 0 · E1 1 · E1K 0 · E2 0 · E3 0 · E3N 0 · E3P 0 · E4 64 · E5 0 · E6 18 · E7 0 · B1 0 · B8 0 · B12 0 · B14 0 · A1 0 · S1 0 · S2 0`

Identical to `K/results/gate.log`. The route's own 16 plants all bite on my replay (`C/results/route-plants.json`).

## 3 · Battery (STEP 3)

Plants were judged by clause counts (`C/tools/gate-counts.mjs`), because the gate's verbose output carries an edge total and line counts that shift with any edit. The first verbose run (`C/results/plants.json`) scored several plants on those shifting lines; the count run (`C/results/plants-counts.json`) is the scored one. Tree digest before and after both runs: `33a91b37…` = `33a91b37…`.

| plant | item | verdict | clauses that rose |
|---|---|---|---|
| K-S06 self-name import in `Chip.vue` | S-06 | CAUGHT | E0 0→1 |
| K-S07 computed read in a scripts file | S-07 | CAUGHT | graph census 501→502, new row `computed-read`, base `src/components` |
| K-P18 `Badge.vue` → dock-private `useDockSpring` | G-04 | CAUGHT | E1 1→2, B1 0→1 |
| K-P20 `GlassDockLegacy.ts` alias on the dock door | G-04 | CAUGHT | B12 0→1, A1 0→1 |
| **K-P21** `import("./DockSeparator.vue").catch(() => null)` (a live target) | G-04 | **MISSED** | none |
| K-B8 (typo, see below) / **K-B8t** kernel type-imports `Badge.vue` | G-04 | CAUGHT | B8 0→1, B1 0→1 |
| K-B12 non-door relay | G-04 | CAUGHT | B12 0→1 |
| K-B14 value statement in `badge/index.ts` | G-04 | CAUGHT | B14 0→1 |
| K-P19 `dock/utils/utils.ts` | G-05 | CAUGHT | E2, E3N, E3P 0→2 |
| K-P19b `chip/misc/misc.ts` | G-05 | CAUGHT | E2, E3N, E3P 0→2 |
| K-P28 `scripts/foo-helper.mjs`, one bin | G-06 | CAUGHT | S1 0→2 |
| K-B35 (premise gone) / **K-B35t** a bin's private helper in `scripts/structure/` | G-06 | CAUGHT | S1 0→2 |
| **K-B38t** a helper two bins share, inside `scripts/structure/lib/` | G-06 | **MISSED** | none |
| K-B10 card sheet `@import`s sheet's private sheet | G-07 | CAUGHT | E1 1→2, B1 0→1 |
| **K-B28** a card sheet copy in `src/styles/`, imported by the aggregator | G-07 | **MISSED** | none (premise contestable: placement by readers puts an aggregator-read sheet in `src/styles/`) |
| K-B14g `import.meta.glob` out of the deck door | G-07 | CAUGHT | B1 0→8, B14 0→1 |
| **K-B22** `<style scoped src="./badge.carve.css">` inside badge | G-07 | **MISSED** | none |
| K-P07a `dock/registry.ts`, 3 SFCs in an object literal | G-08 | CLEAN (negative control holds) | none |
| K-E4 13 peers under a barrel / **K-E4t** 13 direct peers | G-02 | CAUGHT | E4 64→65 (and E2 in K-E4) |
| K-E5 self-name re-publish / K-E5b relative re-publish | G-02 | CAUGHT | E0 0→1 / E5 0→4 |
| K-E6 `demo/App.vue` past a door | G-02 | CAUGHT | E6 18→19 |
| K-E7 a Badge test in chip's slot | G-02 | CAUGHT | E7 0→1 |
| K-G03a `sheet/detents` renamed `content` | G-03 | CAUGHT | E2, E3 0→1, E3N 0→2 |
| K-G03b an unpinned `badge/tone/` module | G-03 | CAUGHT | E2, E3N 0→1 |
| K-L1 a legal colocated Badge test | control | CLEAN | none |
| K-P21b `.catch(() => import(<live file>))` | G-04 | caught only incidentally | E2 0→1: the added import changes dominance (`DockControl.vue would head dock/control`); no clause reads the fallback |

**Score.** 26 of 31 intended bites (84%); both negative controls clean.

**Disclosures (F-9).**
- **K-B8** was spelled `Badge.vue.vue`, so E0 caught an unresolved import rather than B8. **K-B8t** respells it.
- **K-E4** nested its peers under a barrel, so E2 bit first. **K-E4t** plants 13 direct peers.
- **K-B35**'s bin `comment-census.mjs` left `scripts/` by L6.0. **K-B35t** and **K-B38t** are transcriptions onto the bins that exist (`profile-bundle.mjs`, `verify-export-types.mjs`).
- **K-S07** was re-judged on the graph's census (`--json`), which the battery named as its criterion.
- All six are in `C/tools/plants-transcribed.mjs`, written after the hash. `C/results/plants-transcribed.json` holds their results.

**Structural probes** (`C/results/probes-post.json`). Four probe failures are my probes' own defects, not the route's, and I record them as such:
- **G-01.** The keyword probe missed 5 of the 9 pass-2 §8 choices. Reading LAW.md, all 9 are there: the sibling-stem rename is L1.3 `rename`, the eponymy pin L2.2, hook-only slotting L2.6, relay cures L4.3, auto-hold L1.4.
- **G-06.** The top-level-bin probe read only `package.json` and CI. `flatten-subpath-types` and `gen-component-styles` are read by `vite.style-assets.ts`, and `regen-spring-tokens` from `tests/` and `src/`. They are bins under L6.1.
- **S-04.** The probe demanded 0 `move` rows from the floor CLI. It reads 16. G's stage 1 differs by rules it states: L1.1 "a test is no reader" (for example, `aurora.wgsl.ts`'s only aurora-root reader is `aurora/__tests__/uniform-packing.test.ts`), the L1.2 kernel hold, the L1.3 landings and the L1.6 holds.
- **S-05.** The probe's first list lacked the `{moves: […]}` wrapper. It was re-run as `C/results/k-s05.json`.

## 4 · Checklist (REGISTRY §P2-7): 25 items

### Shared

| item | status | command → output |
|---|---|---|
| S-01 | **CLOSED** | `probes S-01`: `G-kit tracked 100; pass-2/kit tracked 84; xj docs tracked 2/2; untracked under pass-3 0`. Replay from `git archive b602a59b`: MATCH (§1) |
| S-02 | **CLOSED** | `probes S-02`: all 7 hooks under `src/composables/` (`dom/useClipboard.ts`, `dom/useDragVelocity.ts`, `motion/core/{useRAFLoop,useYieldToMain}.ts`, `motion/scroll/{useScrollChrome,useScrollProgress}.ts`, `motion/pointer/useRoutePointer.ts`); gate E1K 0 |
| S-03 | **OPEN** | The rulings are all present (`probes S-03`: 8/8, `./aurora-config` exported, `accent-tone.css` at `src/styles/`). **P3-R9's consequence is not ruled.** P3-R9 says "any ceiling change is its own ruled row". `npm run verify:package` exits 1 with `G-BUNDLE-RATCHET … shrink 2912236 < 2916129`, and no row rules the rebind (`C/results/verify-package.log`) |
| S-04 | **CLOSED** | The landed `lib/placement.mjs` carries `anchor` (23 occurrences). `placement.mjs --root T`: anchored 37. The gate reports 40 anchored. The 16 floor-CLI `move` rows are explained by L1.1-L1.6 (§3) |
| S-05 | **OPEN** | See §5.1. G's FD-2 is +0 at every step only under L0.3, G's own unit function. Under R-2's `dirUnits` the tree's static SCC grows from 4 SCCs / 14 members to 1 / 91. The S-18 move (`useScrollChrome.ts` → `dock/`) adds **0** pairs under L0.3 and **129** under R-2 with tests split off (`C/results/k-s05-units.txt`). It is refused on G's path only by an undeclared scan delta, not by FD-2 (`k-s05-g.txt`) |
| S-06 | **CLOSED** | K-S06: E0 0→1, `self-name-in-src [import-side-effect]` |
| S-07 | **CLOSED** | K-S07: census 501→502, `{kind: computed-read, spec: src/components/<computed>, base: src/components}` |
| S-08 | **CLOSED** | `entries.mjs check` 0 (byte-equal); `dist/styles/theme.css` present; 0 `refused` in the replay log |
| S-09 | **CLOSED** | `--twice` no-op at every step; rerun "nothing to write" (§1) |
| S-10 | **OPEN** | FD-3: `accent-tone.css` → `src/styles/`. FD-4: `cascade.mjs verify` against my pre-replay dist is GREEN (1,964 / 4 / 4 / 365 rules). **FD-5 fails:** `classify.mjs --base <pre-replay> --root T --moves <all 8 lists>` exits 1, with 111 files outside `docs/` UNCLASSIFIED (90 "text differs beyond its references", 14 added, 6 removed, `MIGRATION.md`), for example `demo/shell/AppShell.vue` and `demo/chassis/hero/aurora-hero.ts` (`C/results/classify-nondocs.log`). The kit has no FD-5 manifest naming its 19 rows' files, so the floor's classifier cannot certify the migration |
| S-11 | **CLOSED** | `scripts/structure/` landed; 0 files outside `docs/` name the docs floor. vitest: 2,345 tests, 17 failed. None is FD-6-class: 3 boot-graph (run before the demo build; 14/14 after it), 3 eponym (E1/E4/E6), 9 gate-register (R-1 sequencing), and 2 5-s timeouts (`glass-subtlety`, `atoms`) that pass alone, 60/60 (`C/results/vitest-summary.json`, `vitest-rerun2.log`) |
| S-12 | see §6 | browser seat on T |
| S-13 | **CLOSED** | `probes S-13`: `xj-BonG.md` (RED, 14 of 17) and `xj-GonB.md` are both tracked at the cut and verdict-bearing |

### D1-G

| item | status | command → output |
|---|---|---|
| G-01 | **OPEN** | **A literal reading of LAW.md does not give the gate's verdict.** L4.2 says "`src` reads no consumer zone", with no exemption. The gate's B8 loop opens with `if (!reach(e) \|\| L.isTest(e.from)) continue` (`eponym.mjs`, B8), and no LAW text states that exemption. `C/tools/literal-law.mjs` finds **32 B8 lines** the literal law adds, for example `src/composables/motion/spring/__tests__/springs-story.test.ts:5 → demo/stories/motion/springs.vue` and `src/components/aurora/__tests__/aurora-stage-affordance.test.ts:7-10 → demo/stories/substrates/aurora/…` (`C/results/literal-law.txt`). LAW.md's own header says "A rule the code runs that is not written here is a defect". The 9 pass-2 §8 choices are all written (§3) |
| G-02 | **OPEN** | Wired: `tests/gates/eponym.test.ts` has one `it` per clause. RED under `npm test`: E1 1 (the FD-8 hold on `isTeleportedTarget.ts`), E4 64 and E6 18. The plants K-E4t, K-E5b, K-E6 and K-E7 each bite |
| G-03 | **CLOSED** | `probes G-03`: `sheet/detents`, `fourier-field/renderer` and `aurora/config` present; no stage-named dirs. Pin `K/eponym/names.json` `modules`. K-G03a (E3, E3N) and K-G03b (E3N) bite |
| G-04 | **OPEN** | B1, B12 and B14 bite (K-P18, K-P20, K-B12, K-B14). The kernel arm of B8 bites (K-B8t). Two counterexamples: (1) **B8's consumer-zone arm is not taken over for tests.** 32 lines by L4.2, 12 by B's own test arm (xj-BonG B8), 0 by G's gate. (2) **K-P21:** a masking fallback onto a live file (`.catch(() => null)`) raises no clause. Only the missing-target form is caught (E0), which is G-crit gap 12's class unchanged |
| G-05 | **CLOSED** | K-P19 and K-P19b: E3P 0→2 each |
| G-06 | **OPEN** | P28 (K-P28, S1) and B-35 (K-B35t, S1) bite. **B-38 is missed (K-B38t).** A helper that `profile-bundle.mjs` and `verify-export-types.mjs` both read, placed inside `scripts/structure/lib/`, raises nothing. L6.1 places only single-bin files, and no L6 rule sends a multi-bin file to `scripts/lib/` (SPECS-v2 §4.8's rule) |
| G-07 | **OPEN** | Caught: B-10 (K-B10) and B-14 (K-B14g). **Missed: K-B22**, a `<style src>` carve inside one unit, which R-5 bans. The route's B-22 plant crosses a unit, so B1 catches the crossing, not the carve. Also missed: K-B28. Not built: the R-7 channel collapse. Unanswered: B-30 (route-conceded, G-proto §G-07) |
| G-08 | **CLOSED** | K-P07a CLEAN. The route's P07a finds `src/components/dock/registry.ts (3 registrations)` |
| G-09 | **OPEN** | No churn tool or result is committed (G-proto §G-09: "Not run") |
| G-10 | **OPEN** | `probes G-10`: `menu` (5 files, 3 dirs), `styles/glass` (6, 6) and `styles/tokens` (1, 6) are carved. Over 12: `tests-visual` 176, `demo/stories/{containers,foundations}` 13, `tests/components` 13, `tests/demo` 13 and `tests/gates` 14. Slots over 12: `dock/__tests__` 17 and `tests/styles` 23 |
| G-11 | **OPEN** | G-S6 names the R-5 file splits. 56 files over 500 lines remain (for example `aurora/config/presets.ts` 552, `dock/GlassDock.vue` 546, `configurator/styles.css` 551). G-S8 leaves E6 at 18. G-S7 (72 `__tests__/` dirs) and G-S9 ran |
| G-12 | **OPEN** | See §5.2. G's answer is "FD-2 counts them" through L0.3. L0.3 makes a door its own node, so a parent↔child cycle closed through the parent's door is never counted. With R-2 units and tests split off, the tree holds **4 new** parent↔child pairs: `menu↔menu/items`, `menu↔menu/sub`, `sheet↔sheet/detents` and `toast↔toast/toaster` (base: 3, final: 5; `C/results/fd2-*.json`). Each is witnessed, for example `menu/index.ts:58 -[reexport]-> menu/sub/DropdownMenuSub.vue` and `menu/sub/DropdownMenuSub.vue:3 -[import]-> menu/context.ts` (`witness-nesting.txt`). No ruling says a door-closed nesting cycle is intra-unit. Max `src` dir depth is 6 below `src/` (`components/aurora/runtime/webgl/palette/__tests__`) |

## 5 · The two mechanism findings

### 5.1 FD-2 is judged in a unit function the route wrote (S-05, G-12)

`C/tools/fd2-both.mjs` computes the static module SCCs over `src` + `demo` under three unit functions (`C/results/fd2-base-copy.json`, `fd2-wt.json`):

| tree | R-2 `dirUnits` (the floor's FD-2, P3-F2) | G L0.3 `gUnits` | R-2 with tests split off |
|---|---|---|---|
| base (`f0019420…`) | 4 SCCs, 14 members, 26 pairs | 6, 13, 8 | 4, 14, 26 |
| G final (`b26243ef…`) | **1 SCC, 91 members, 4,095 pairs** | 1, 2, 1 | 5, 16, 27 |

- **The 91-member SCC.** It closes through colocated tests that read `demo/`. Under R-2 a test is a member of its slot's unit, and the witness is `motion/spring/__tests__/springs-story.test.ts:5 → demo/stories/motion/springs.vue → src/index.ts` (`witness-src-accordion.txt`). This is also the B8 exemption of G-01/G-04: a test in `src` reading `demo` is what L4.2 forbids.
- **With tests split off,** the floor's reading still grows (26 → 27 pairs, net). The new pairs are the 4 door-closed nesting pairs of G-12.
- **The S-18 move.** Replanted on the final tree (`useScrollChrome.ts → dock/`), it adds 129 pairs under R-2 with tests split. It adds 0 under G's L0.3, because a kernel door re-exporting a component file is its own node there. It also adds 0 under literal R-2, because the SCC is already saturated. So on G's tree neither reading of FD-2 stops the defect FD-2 was built for. G's E1K clause would catch that move, but E1K is not FD-2.

L0.3 may be the right reading: a door publishes and reads nothing (R-2), and a test is read by nothing. It is still an unruled change to the floor's FD-2, and G's "+0 at every step" rests on it. A ruling on the FD-2 unit function (doors and tests as nodes, or not) is owed.

### 5.2 The literal law and the gate differ on tests (G-01, G-04)

The gate exempts every test from B8. LAW L4.2 exempts none, and B's own B8 test arm allows harness reads but "never a consumer zone" (xj-BonG §3). There are 32 literal lines, 12 of them in B's reading: 11 read `demo/`, 1 reads `scripts/`. That makes three readings, and only the unwritten one gives 0.

## 6 · Browser seat (S-12)

`node scripts/structure/browser.mjs --root T --moved <the 8 frozen lists> --out … --wait 7200` was queued on the machine lock, which critique-B's seat held (pid 52708, started 02:43Z). Its result is in §6.1 below when it ran, or is recorded as not executed.

### 6.1 Result

(pending: filled on completion)

## 7 · Re-opened

No item was closed by a critic in an earlier pass: every §P2-7 item was open at pass 2. G-proto (pass 3, the author's own report) claimed several items CLOSED, and this critique re-opens them:

- **G-01.** The literal-reading counterexample, 32 B8 lines.
- **G-04.** The B8 test exemption, and the P21 class onto a live file.
- **G-06.** B-38 missed.
- **G-11.** 56 files over 500 lines against G-S6's R-5 splits, and E6 18.
- **G-12.** L0.3 does not count door-closed nesting cycles; 4 new pairs.
- **S-05.** FD-2's +0 holds only under L0.3.
- **S-10.** FD-5 UNCLASSIFIED 111.

## 8 · Outside the checklist

1. **Global-zone aggregators sit beside the dirs they aggregate:** `src/styles/{glass,tokens,typography,utilities,theme}.css` beside `glass/`, `tokens/`, `typography/`, `utilities/` and `theme/`. The same holds for `aurora/config.ts` beside `aurora/config/`, which G-proto discloses. SPECS-v2 §4.3 moved `glass.css → glass/index.css` and `tokens.css → tokens/index.css`, and L2.9 exempts the global zone from stage 2. This maps to G-07 and S-08 (CSS doors), which are already open or closed on other grounds, so it adds no item.
2. **E1 counts a hold that the floor cannot carry.** `isTeleportedTarget.ts` is held by FD-8. The gate then stays RED until the floor gets a glob-delta arm. This is shared with B.
3. **The two timeout failures** (`glass-subtlety`, `atoms`) appear under full-suite load only. This is an environment class, not a route defect.

## 9 · Convergence

- **Closed (13):** S-01, S-02, S-04, S-06, S-07, S-08, S-09, S-11, S-13, G-03, G-05, G-08, and S-12 if §6.1 records an executed run.
- **Open (12):** S-03, S-05, S-10, G-01, G-02, G-04, G-06, G-07, G-09, G-10, G-11, G-12.

**Convergence = 13 / 25 = 52%.** Verdict **ADVANCE**, not CONVERGED: 12 items are open and 7 author-claimed closures are re-opened. No gap needs a new primitive. Two need rulings (the FD-2 unit function, §5.1; P3-R9's rebind row). The rest are law text, clauses or authored work: the B8 test arm, a live-target fallback clause, the shared-helper rule for `scripts/lib`, a within-unit `<style src>` clause, an FD-5 manifest, the R-5 splits, the churn replay, and the peer-set carves for `tests-visual` and `tests/*`.

## 10 · Fences

- **Checkout writes:** only `P/critique-G.md` and `P/critique-G/{battery,tools,results}/…`, plus `BATTERY-HASH.txt`, all made with the Write tool or with `cp` into `results/`.
- **Git:** `worktree add` and `worktree remove --force` only.
- **Scratch:** a `git archive` extraction of `b602a59b`, and a pre-replay copy of the tree for the FD-2 base and FD-5 baseline. The copy was given a throwaway `git init` in scratch so the floor's `openTree` could list it; that is a separate repository.
- **Not touched:** no sibling repo was read or built, and nothing under `~/.claude` was read.
