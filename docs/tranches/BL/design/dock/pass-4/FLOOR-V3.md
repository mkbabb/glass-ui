# FLOOR-V3 · the floor with rows N-6..N-8

D2 pass 4, seat FLOOR-V3 · model `claude-opus-5-5` (asserted from own system identity) · 2026-10-15/16.

| field | value |
|---|---|
| patch | `pass-4/floor-v3.patch`, sha256 `637d1625d7b39b5d…`, 51 files (39 `src/`, 2 `demo/`, 10 `tests/`), +2254 / −1535. It is the whole floor relative to HEAD: `pass-3/floor-v2.patch` (sha256 `deb90ecc…`, 50 files, +2251 / −1498) plus N-6 and N-7. N-8 adds no hunk (§1.3). N-5 is not built (§1.4) |
| base | `git apply --check` clean at `c39403f06` (checkout index) and at `ba7c38cec` (fresh worktree), the HEADs current during the seat. The first measurements ran at `349e1cdd5`; `git diff --stat 349e1cdd5 ba7c38cec -- src demo tests` is empty, so every reading below describes today's HEAD plus this patch |
| adapter | `pass-3/adapter-floor-v2.mjs`, unchanged. Floor v3 keeps the floor's DOM contract |
| harness | H4 (`pass-4/H4.md`), unchanged by this seat. The runner is `FV3-run.sh` (stages `main`, `rest`, `ctrl`, `dark`, `n8`) and `FV3-chain2.sh`; the digest is `FV3-cells.mjs` (H4-cells.mjs's verdict rule and row map, unchanged) → `FV3-records/cells-fv3.json`, `rows-fv3.md`, `counts-fv3.md`, the source of record for every cell below |
| engines | Chromium (headless) and **Playwright WebKit**, every WebKit cell unshimmed. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| load | 1-minute load average 9.8-46.5 across the cells of record (other seats' browsers). Every log opens and closes with `uptime`; every cell carries its own load (`counts-fv3.md`). Every red cell was re-run twice; a red that passed both re-runs reads NOT-REPRODUCED (1 cell of 786 did, on the H4 floor-v2 side) |
| records | `pass-4/FV3-records/`: `<stage>-<W>[-rerun<k>].log`, the witness JSON under `json/`, `n8-fv2.json`, `n8-fv3.json`, `PR-fv3.log`, `mutations-PR.log`, `build-*.log`, `build2-*.log`, `typecheck.log`, `typecheck2.log`, `vitest.log`, `delta-v2-v3.diff` |

Short names: **v2** is HEAD + `pass-3/floor-v2.patch`; **v3** is HEAD + `pass-4/floor-v3.patch`. "Before" for a row is v2 under H4. The H4 baseline read v2 on ST, W3, FM, R5, CF, L1 and PR (`H4-records/cells-h4.json`, light, load 9.4-99.5). It did not run W1, W2, W4-W8 or R6 on v2 (H4.md §4), so this seat ran that set on v2 as a control (`ctrl-*.log`, load 16.6-44.2). Dark was read on v3 only (`dark-*.log`, load 9.8-32.9). H4 holds no dark v2 reading.

---

## 0 · In brief

| row | status | what moves |
|---|---|---|
| N-6 the `DockProps` count in prose | **landed** | `GlassDock.vue:69` "SIX members" → "SEVEN" (`useDockShellProps` has 7). The stale "enumerates 14 members" in `density.css` reworded to the fact the paragraph needs. H4-8 `prose·count` FAIL → PASS |
| N-7 declared tokens have readers | **landed** | `--dock-morph-max-stretch` and its 19-line process paragraph struck (`density.css`). Two more declared-without-reader tokens the H4-8 gate found struck with it: `--dock-ring-reserve` (`index.css`; v2's N-4 removed its last reader in `run.css`) and `--dock-crossfade-peak` (`DockCrossfade.vue`, an inline write nothing reads). H4-8 `prose·readers` FAIL → PASS (76 properties declared or written in the band, 0 without a reader) |
| N-8 F-19 keyboard reach on the long vertical run | **holds without a hunk; the W2 cell's red is the witness's** | The product reaches 11/11 seats by Tab and arrows, every focused seat inside the port, Home → Seat 1, End → Seat 11, in both engines on v2 and v3 (`n8-fv2.log`, `n8-fv3.log`). W2 `route1·long-run-v` reads 10/11 because its key sequence can never land on Seat 1 in the `rail` scene (§1.3). The cure is in W2, not the floor |
| N-5 the card corner | **OWNER-BLOCKED (Q-12)** | not built. No ruling in `audit/INBOUND.md` or `FORMATION-PROGRESS.md`. New measurement: the card cells fail under **both** Q-12 branches (§1.4) |

Build, typecheck and units: lib and demo build exit 0. `vue-tsc` exits 0 on `src` and on the test config. Units: 245/245 files, 2359 passed, 10 expected fail, 1 skipped. Four planted mutations each turn the H4-8 gate red (§2).

Under H4, v3 moves exactly the rows its hunks address: **B3** (1/2 → 2/2) and N5's source half (0/2 → 2/2). Every other row reads the same on v2 and v3 in both engines, within the timing-borderline cells named in §3.2. This is the expected outcome: no hunk changes a read value at run time. Three tokens had no reader and two prose lines were wrong. The L1 census (computed paint on every dock element at rest and in flight, both themes) reads v3 identical to v2: 6/6 per engine.

## 1 · The rows

Line numbers are in the patched tree (HEAD + `floor-v3.patch`). The v2 → v3 increment is `FV3-records/delta-v2-v3.diff`: 5 files, +3 / −37 lines, all under `src/components/dock/`. Rows N-1..N-4 are unchanged from v2 and are documented in `pass-3/FLOOR-V2.md` §1. They are not restated here.

### 1.1 · N-6 · the `DockProps` count

| hunk | where | cost |
|---|---|---|
| "SIX members" → "SEVEN members" | `src/components/dock/GlassDock.vue:69` | 1 line |
| "`DockProps` (useDockShellProps.ts) enumerates 14 members and `containerName` is NOT among them" → "`DockProps` (useDockShellProps.ts) does not carry `containerName`". The paragraph's claim is the absence; the count was a second copy of a fact `useDockShellProps.ts` holds (P-3) | `src/components/dock/styles/density.css` (the container-name census block, ~:262) | 2 lines → 1 |

Gate: H4-8 `prose·count` (`harness/prose.mjs`) reads the member count from `useDockShellProps.ts` and every "<N> members" near a `DockProps` mention. On v2: FAIL, `GlassDock.vue:69 "SIX members"` (H4 `base-PR-fv2`). On v3: PASS, "DockProps has 7 member(s); 1 prose count(s) near it, 0 wrong" (`PR-fv3.log`, load 26.04).

### 1.2 · N-7 · every declared token has a reader

| hunk | where | why | cost |
|---|---|---|---|
| strike `--dock-morph-max-stretch: 1.14` and its process paragraph | `density.css`, the block that was `:66-84` in v2 | declared, zero readers. The paragraph defended keeping it on scope grounds; P3-7 N-7 makes the strike this row's | −19 lines |
| strike `--dock-ring-reserve` and its paragraph | `src/components/dock/styles/index.css` (~:230) | On HEAD, `run.css` read it (`padding-block` / `margin-block`). v2's N-4 replaced that with `--dock-run-gutter: var(--dock-pad)` and left the declaration with no reader. H4-8 `prose·readers` found it | −11 lines |
| `run.css`'s gutter prose names its two terms, not the struck token | `src/components/dock/styles/run.css:136-137` | the prose cited a token that no longer exists | 2 lines reworded |
| drop the `--dock-crossfade-peak` inline write | `src/components/dock/DockCrossfade.vue:101` | written beside the reserve property on every peak, read by nothing in `src/` or `demo/`. N-2's "nothing published without a reader" covers script writes | −3 lines |

Readers outside glass-ui (read-only `rg` over `~/Programming`, node_modules, dist, docs and vendored copies excluded): the only hits are vendored glass-ui builds under `hassio-config-design-lab/lab/*/assets` and `*/vendor`, plus one research note quoting the token (`lab/pass-11/research/r4-glass6-substrate.md:360`). None of them sets or reads a token. Per E-1 and the consumer-updates ruling, a vendored snapshot does not hold an API in place.

Gate: H4-8 `prose·readers`. v2: FAIL (`base-PR-fv2`). v3: PASS, 76 properties, 0 without a reader (`PR-fv3.log`). `prose·rows` holds on both (33 tokens, each with one row in `docs/design/tunable-anim.md`).

### 1.3 · N-8 · F-19's keyboard reach on the long vertical run

**No hunk. The seat model already meets F-19 on v2 and v3. The red cell is a witness defect.**

`FV3-n8-probe.mjs` reads W2's own `rail` scene (11 seats, Seat 3 `aria-current`, the run capped at 560 px against a 592 px demand), per engine. It presses only real keys: Tab (Option-Tab in Playwright WebKit, Safari's default) from a start button, ArrowUp until focus stops moving, ArrowDown until it stops, then Home and End. After each key it waits for the reach glide to settle and checks that the focused seat is inside the run's port (≤ 1 px slack, `useDockRun`'s own `occluded` rule).

| build | engine | Tab stop | keys reach | every focused seat inside the port | Home / End | W2's sequence misses | load |
|---|---|---|---|---|---|---|---|
| v2 | Chromium | Seat 3 | 11/11 | true | Seat 1 / Seat 11 | [1] | 26.77-26.9 |
| v2 | Playwright WebKit | Seat 3 | 11/11 | true | Seat 1 / Seat 11 | [1] | 26.9-29.07 |
| v3 | Chromium | Seat 3 | 11/11 | true | Seat 1 / Seat 11 | [1] | 9.04-9.57 |
| v3 | Playwright WebKit | Seat 3 | 11/11 | true | Seat 1 / Seat 11 | [1] | 11.68-11.63 |

The step trace is identical in both engines (`n8-fv3.json`): Tab → 3, ArrowUp → 2, 1, 1 (clamped), ArrowDown → 2 … 11, 11 (clamped), Home → 1, End → 11. The run overflows (592 px of seats in a 560 px cap), and every seat the keys focus, the clamped ends included, reads inside the port.

**Why W2 reads 10/11.** `harness/w2-run.mjs` `reach()` (lines 131-139):
1. It presses Tab n+6 times. The run is one roving-tabindex stop (`initialStops` = `[-1,-1,0,-1,…]`), which sits on the current seat, Seat 3. So Tab records only Seat 3.
2. It then calls `seats()[0].focus()` from script and presses ArrowDown n+2 times, recording after each key. Seat 1 is focused by `focus()`, not by a key, so it is never recorded. ArrowDown records Seats 2-11.

`long-run-h` passes because the `long` scene marks Seat 3 `pressed`, not `aria-current`. Its roving stop stays on Seat 1, so the Tab phase records Seat 1 (`fixtures.mjs:235`). The vertical cell fails on the scene's current-seat marking combined with the witness's key sequence. Reach by keyboard is not what fails.

**What W2 needs (H4's, not this seat's).** Either record the seat `focus()` lands on, or reach Seat 1 by a key (ArrowUp from the stop, or Home). The probe's sequence is that cure, measured: 11/11 in both engines. Until W2 is amended, N5's W2 cell and P2 stay red on every build, and no floor hunk can turn them green. This is placed in §5 for the agglomeration. It is not a new checklist row: it is the existing W2 cell's witness.

O-88's C5 (keyboard open and close with focus kept) lands on this seat model: one roving stop on the current seat, with arrows, Home and End clamping and gliding the port. C5 stays red on v3 for reasons outside the run: the collapsed dock has no disclosure that takes focus, and Escape does not collapse (`main-CF.log`, `c5·keyboard[disclosure,escape]`). That is the collapse facility's work, which the routes carry under O-88. It is not N-8.

### 1.4 · N-5 · the card corner

**OWNER-BLOCKED (Q-12).** Not built. The default holds: the floor's pill (27.93 px) → card lerp stays. Neither `audit/INBOUND.md` nor `FORMATION-PROGRESS.md` carries a Q-12 ruling (grep for Q-12 there finds only the D2 and D3 questions, unruled).

**New measurement for the owner and the routes.** H4-7's card rule reads every card cell against the rests' range [22.93, 28.93] px. The in-flight fitted radius falls outside that range by 5.5-8.9 px in the expanding cells. It dips toward 13.3-18.5 px on a 56 px-tall plate mid-expand (`rest-W1.log`, `dark-W1.log`, `ctrl-W1.log`):

| cell | engine | v2 (ctrl, light) | v3 light | v3 dark |
|---|---|---|---|---|
| `card·first-expand` | Chromium | r 14.93, outside by 8 px | r 17.43, outside by 5.5 px | r 17.18, outside by 5.75 px |
| `card·first-expand` | Playwright WebKit | r 13.29 | r 18.53 | r 15.53 |
| `card·warm-expand` | Chromium | r 15.93, outside by 7 px | r 14.05, outside by 8.88 px | r 14.05, outside by 8.88 px |
| `card·warm-expand` | Playwright WebKit | r 17.03 | r 17.28 | r 15.53 |
| `card·warm-collapse` | Chromium | r 22.55, outside by 0.38 px (OB in re-run 1, FAIL in re-run 2) | r 22.3, outside by 0.63 px | r 22.93, OB (re-runs: OB, FAIL) |
| `card·warm-collapse` | Playwright WebKit | worst corner 4.59 px (bound 2.5) | 4.52 px | 4.58 px |

Both Q-12 branches fail these cells. Branch (a), one radius in every frame, fails because the radius moves. Branch (b), every frame between the two rests, fails because the radius leaves that band by up to 8.9 px. So Q-12 alone does not close P1. The expanding card's corner needs a carrier hunk under either ruling, and N-5's content depends on the branch. H4-7's cure holds in one respect: no card cell reads OB in one engine and FAIL in the other in the same pass. It does not hold in another. Chromium `card·warm-collapse` is caught on one in-flight sample, and its verdict alternates OB/FAIL between re-runs on v2 and v3 alike. That is a sampling limit of the Chromium screenshot arm (1 sample in flight against WebKit's 117).

## 2 · Typecheck, units, build, mutations

| check | result | record |
|---|---|---|
| lib build (v3) | exit 0 | `build-lib.log` (load 15.86) |
| demo build (v3) | exit 0 | `build-demo.log` |
| harness builds `fv2`, `fv3` (`harness/build.mjs`, out inside the worktree) | exit 0 both, at `349e1cdd5` and again at `ba7c38cec` | `build-fv2.log`, `build-fv3.log`, `build2-fv2.log`, `build2-fv3.log` |
| `vue-tsc --noEmit` (src) | exit 0 at `349e1cdd5` and at `ba7c38cec` | `typecheck.log`, `typecheck2.log` |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 0 after the lib build (`typecheck.log`, 21:13). At `ba7c38cec` before the lib build it exits 2 on `tests/components/fourier-field/FourierField.smoke.test.ts:18-19` only (`@mkbabb/glass-ui/fourier-math`, the package's self-import, resolves through `dist/`). After the lib build: lib build exit 0, test-config `vue-tsc` exit 0 (01:10, load 18.43) | `typecheck.log`, `typecheck2.log` |
| vitest, all (`--maxWorkers=2`) | 245/245 files; 2359 passed, 10 expected fail, 1 skipped | `vitest.log` (load 15.15-15.86) |
| vitest, dock suites at `ba7c38cec` | 21/21 files; 167 passed, 1 expected fail | `typecheck2.log` (load 25.6) |
| planted mutations against H4-8 (`mutations-PR.log`, load 13.3) | `six` (restore "SIX members") → `prose·count` FAIL; `maxstretch` (restore the token) → `prose·readers` FAIL naming it; `ringreserve` → FAIL naming it; `peak` (restore the inline write) → FAIL naming it. 4/4 caught | `mutations-PR.log` |

Cost: v3 over v2 is +3 / −37 lines in `src/`, no new module, no new export, no runtime work added or removed. The three struck tokens were never read, so no frame paints differently (L1, §3).

## 3 · H4 on v3: the 36 rows

### 3.1 · Per row, before and after, per engine

Cells are pass/counted per engine from `FV3-records/rows-fv3.md`, Chromium · Playwright WebKit. "v2" is H4's floor-v2 reading where H4 ran it, otherwise this seat's v2 control. Light unless marked. OB = OWNER-BLOCKED, UM = UNMEASURED.

| # | witness | v2 light | v3 light | v3 dark | moved by v3 | note |
|---|---|---|---|---|---|---|
| P1 | W1 | 13/22 · 13/22 | 13/22 · 13/22 | 14/22 (OB 1) · 13/22 | no | `morph·*`/`vmorph·*` `corner` + the card cells (§1.4). W7 edge 20/20 · 20/20 on both builds |
| P2 | W2 | 7/8 · 7/8 | 7/8 · 7/8 | 7/8 · 7/8 | no | the one red is `route1·long-run-v[keyboard]`, the witness defect (§1.3) |
| P3 | W3, W6, W8 | W3 10/32 · 10/32 (UM 3); W6 2/4 · 2/4; W8 3/6 · 3/6 | the same | W3 10/32 · 10/32 | no | W3 `window` (Q-4 default), seat steps, `leaving`; W6 `window`/`faces`; W8 `sharp` on expand, collapse, form-expand |
| P4 | W4 | 12/13 · 12/13 | 12/13 · 12/13 | — | no | `compact·non-first-current` |
| P5 | W5, R6 | 6/6 · 6/6; 2/2 · 2/2 | the same | — | no | |
| F1 | W1 rests + W2 | 17/17 · 17/17 | 17/17 · 17/17 | 17/17 · 17/17 | no | |
| F2 | W5 | 6/6 · 6/6 | 6/6 · 6/6 | — | no | |
| F3 | W4 coarse, hover | 4/4 · 4/4 | 4/4 · 4/4 | — | no | |
| F4 | W4 compact | 7/8 · 7/8 | 7/8 · 7/8 | — | no | |
| F5 | W3 first-expand | 1/1 · 1/1 | 1/1 · 1/1 | 1/1 · 1/1 | no | |
| F6 | crash-free | 73/73 + ctrl 81/81, per engine | 154/154 · 154/154 | 79/79 · 79/79 | no | 0 crashed cells on any build |
| F7 | units, vue-tsc | 245/245 (FV2) | 245/245, `vue-tsc` 0 | — | no | §2 |
| N1 | W3 `anchor-end` | 2/2 · 2/2 | 2/2 · 2/2 | 2/2 · 2/2 | no | |
| N2 | W3 `stretch·lead-add` | 0/1 · 0/1 | 0/1 · 0/1 | 0/1 · 0/1 | no | `seatStep`, as in FV2 |
| N3 | W3 lattice, infanim, seat-transition | 3/3 · 2/3 | 2/3 · 3/3 | 2/3 · 3/3 | no | the `seat-transition[trajectory]` borderline swaps engine between runs (§3.2) |
| N4 | W7 | 20/20 · 20/20 | 20/20 · 20/20 | — | no | |
| R1 | W3 continuity, seats | 15/30 · 14/30 | 14/30 · 15/30 | 14/30 · 15/30 | no | the same `seat-transition` borderline |
| R2 | W3 leaving | 3/8 · 2/8 | 2/8 · 2/8 | 2/8 · 2/8 | no | Chromium `retarget·40` adds `vanish` on v3 (§3.2) |
| R3 | W3 reversal | 0/1 · 0/1 | 0/1 · 0/1 | 0/1 · 0/1 | no | Q-4 |
| R4 | ST five timings | 1/5 · 2/5 | 1/5 · 2/5 | 1/5 · 2/5 | no | `leap` |
| R5 | R5 hit sampler | 2/4 · 2/4 | 2/4 · 2/4 | — | no | `hit·warm-expand[seat,ghost,corner]`, `hit·warm-collapse[seat,corner]` |
| B1 | W3 `retarget·context` | 1/1 · 1/1 | 1/1 · 1/1 | 1/1 · 1/1 | no | |
| B2 | FM strips | 6/6 · 6/6 | 6/6 · 6/6 | 6/6 · 6/6 | no | H4-6's dark instrument holds (FM dark 6/6) |
| B3 | PR count, rows | 1/2 | **2/2** | — | **yes** | N-6 |
| N5 | PR count + readers; W2 `long-run-v` | 0/2; 0/1 · 0/1 | **2/2**; 0/1 · 0/1 | W2 0/1 · 0/1 | **yes** (source half) | W2 half: §1.3 |
| R6 | W3 splice | 33/33 · 33/33 | 33/33 · 33/33 | 33/33 · 33/33 | no | |
| R7 | W3 lanes | 33/33 · 33/33 | 33/33 · 33/33 | 33/33 · 33/33 | no | |
| R8 | W3 neighbour + ST nb | 1/7 · 1/7 (+1 NOT-REPRODUCED) | 2/7 · 1/7 | 1/7 · 2/7 | no | `stall·nb·2raf` flips between re-runs on both builds (§3.2); `neighbour·warm-*` red on both |
| C1 | CF | 0/1 · 0/1 | 0/1 · 0/1 | — | no | `c1·shape·h[square,summary]` |
| C2 | CF | 3/3 · 3/3 | 3/3 · 3/3 | — | no | |
| C3 | CF | 2/4 · 2/4 | 2/4 · 2/4 | — | no | `c3·scroll[collapses]`, `c7·coarse-tap[opens]` |
| C4 | CF | 1/1 · 1/1 | 1/1 · 1/1 | — | no | |
| C5 | CF | 0/1 · 0/1 | 0/1 · 0/1 | — | no | `[disclosure,escape]` (§1.3) |
| C6 | CF | 0/1 · 0/1 | 0/1 · 0/1 | — | no | `[menu]` |
| C7 | CF | 2/4 · 2/4 | 2/4 · 2/4 | — | no | `c2·morph·v[continuous]`, `c7·coarse-tap[opens]` |
| L1 | L1 census, light + dark | 6/6 · 6/6 (reference) | 6/6 · 6/6 | (in the light + dark cell) | no | v3 adds no paint over v2 |

**Count on the 36 rows** (a row passes when every engine and theme it was read in passes; OB rows open): v3 passes P5, F1, F2, F3, F5, F6, F7, N1, N4, B1, B2, B3, R6, R7, C2, C4, L1 = **17/36**. v2 passes the same set minus B3 = 16/36. On the first 24 (pass 3's rows), v3 passes 12/24 and v2 11/24. N5 does not pass on v3 because its W2 half is the witness defect. With W2 amended per §1.3 (the probe's sequence: 11/11 in both engines on v3), N5 reads PASS, and so do P2's W2 cells (7/8 → 8/8).

### 3.2 · Cells that differ v2 → v3, and why none is v3's

The v2 → v3 increment changes no value any CSS rule or script reads (§1.2: the three tokens had zero readers; the two prose hunks are comments). Every cell that differs is one of these, each seen on both builds:

| cell | v2 | v3 | reading |
|---|---|---|---|
| W3 `seat-transition[trajectory]` | Chromium P, Playwright WebKit F | Chromium F, Playwright WebKit P | the 4.2 px trajectory tolerance borderline recorded in FLOOR-V2 §1.3 (4.33 px vs 4.2, then 3.73 / 3.48). It moves N3 and R1 by one cell in opposite engines on the two builds |
| W3 `retarget·40` (Chromium) | `seatOverlap` | `seatOverlap`, `vanish` | the 40 ms arm is the earliest retarget; `vanish` already fails at 80 and 120 ms on v2. It moves R2 Chromium 3/8 → 2/8. Load at the v2 cell was 62.98, at the v3 cell 23.95 |
| ST `stall·nb·2raf` | Chromium FAIL (re-runs F, F); WebKit NOT-REPRODUCED (P, P) | Chromium PASS (P, F); WebKit FAIL (P, F) | re-runs disagree on both builds and in both engines. It moves R8 by one cell either way |

None is NOT-REPRODUCED under the seat's rule on v3, because each failed at least one re-run. All three are carried to the routes as recorded flakes of the floor, not as v3 regressions.

## 4 · The fences, as kept

- Every build and run used the seat worktree `.claude/worktrees/bl/D2/p4/floor3/wt` (detached at HEAD, `node_modules` symlinked; the checkout has no `tests-visual/node_modules`). Build output and the vite cache stayed inside it (`.fv3out/`, `dist/`). It is removed at the seat's close.
- Writes to the checkout: only under `docs/tranches/BL/design/dock/pass-4/` (`floor-v3.patch`, `FLOOR-V3.md`, `FV3-*.mjs`, `FV3-*.sh`, `FV3-records/`). No git write other than `worktree add` and `worktree remove`.
- Every browser run went through `~/.claude/guard/guarded`, one heavy run at a time. WebKit runs took the BL WebKit lock (`(BL WebKit lock taken after …)` in the logs). Sibling repos were only grepped (§1.2).

## 5 · Open, placed

| item | owner | placed in |
|---|---|---|
| W2 `reach()` never presses a key that lands on Seat 1 when the current seat is not the first (`rail` scene). Amend: record the `focus()` landing, or reach Seat 1 by ArrowUp/Home. Self-test: a planted run that clamps ArrowUp short of Seat 1 must still fail | H4 (harness) | N5, P2 (existing rows) |
| N-5 is blocked on Q-12, and Q-12 alone no longer closes P1: the expanding card's radius leaves the rest band by 5.5-8.9 px in both engines and themes (§1.4) | owner (Q-12); then a carrier hunk | P1 |
| Chromium `card·warm-collapse` is read on one in-flight sample, and its OB/FAIL verdict alternates between re-runs | H4-7 (harness) | P1 |
| three timing-borderline cells (§3.2) | the routes' critics, read as floor flakes | N3, R1, R2, R8 |
| C5's disclosure and Escape | the routes (O-88) | C5 |
| every real-Safari cell | **UNMEASURED (owner's safaridriver checkbox)** | all rows |
