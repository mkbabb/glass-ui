# D2 · pass 14 · D2-B′ fresh critique (`bp13`): STOPPED by the guard's zone refusal at 22:30:33; no score

| field | value |
|---|---|
| seat | D2 pass-14 FRESH CRITIC of D2-B′ (REGISTRY §P13-7.4). It authored nothing in D2 and was no earlier D2 critic |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree detached at **`392ff1e3c`** (§P13-7.2), whatever master holds (the checkout's HEAD was `0778c4090`). Arms staged with `git apply --check`, then `git apply`, with no commit (`apply.log`) |
| patches | re-hashed at the start (`patches-sha256-start.txt`) and the end (`harness-check-end.txt`), all equal: `pass-13/D2-Bp-p13.patch` **`bb7cb08da92677aa6e4e2c753ce9f901b17f4ddb2051d2f4162ef43e97648121`**, `pass-12/D2-Bp-p12.patch` `5318a3dc…`, `pass-6/floor-v5.patch` `cba6bdc2…`, `pass-4/floor-v3.patch` `637d1625…`. p13 over fv5: 64 paths |
| harness | H8 as landed: 42 files OK against `pass-8/H8-records/harness.sha256` (list hash `9d12810b…`) at the start (15:38:53, `harness-check-start.txt`), at every chain step's start (`chain.log`) and at the end (22:32:51, `harness-check-end.txt`). No bound re-read |
| rulings read | `audit/INBOUND.md` to O-196 and `FORMATION-PROGRESS.md` to its last line (2026-11-09 13:10). O-192 to O-196 arrived since the re-measure read to O-191. None touches the 38: O-193 is a 10.1.5 witness cell, O-194 and O-196 are 11.1.0 lanes L5 and L2, O-195 is the cluster design loop toward W-I.8, and O-192 is W-0.13. Nothing arrived mid-pass |
| engines | Chromium (Playwright's default headless shell, no GPU args) and **Playwright WebKit**, unshimmed. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| zone | The guard printed its ZONE-ARMED warning (inuse 29,715, kext=nfs) on every run and admitted them until **22:30:33, when it REFUSED**: "`[guarded] REFUSED: kernel zone data.kalloc.1024 at 8.22M (panics near 20.8M; heavy and browser runs stop at 8M): reboot the Mac`" (`q/slot-webkit-dark.log`, `battery-reread/chain-bp13-webkit.log`). Under §P13-7.5 that is the stop. The readings admitted before it are of record |
| records | `pass-14/D2-Bp-crit-records/` (17 MB, no video): `apply.log`, `build-*.log`, `build-slot.log`, `F7/`, `PR/`, `same.txt`, `rerun/`, `battery/`, `battery-first-light/`, `battery-first-dark/`, `battery-reread/`, `filmstrips/`, `digest-partial/`, `sum/`, `static/`, `q/` (the queues, written and unrun), `scripts/`, `attempt1/`, `chain.log`, `run.out` |

Load is the 1-minute load average. `R` is `pass-14/D2-Bp-crit-records/`. `RM` is `pass-14/D2-Bp-remeasure.md`; `CR` is `pass-13/D2-Bp-critique.md`; `BU` is `pass-13/D2-Bp-build.md`.

---

## 0 · Verdict: no score

**This seat is incomplete (complete=false), and it scores no row of the 38.** The guard refused on the kernel zone count (8.22M) before the W·d column of the battery and before any of the A/Bs and attacks of §P13-7.3 item 3 and §P13-7.4. No row is ruled, no digest of four columns exists, and rules (a), (c) and (d) were not read on this seat's A/Bs. Under §P13-7.5 item 1, a completion seat finishes the rest. **Pass 14 is not scored here, and is neither clean nor unclean on this seat's reading.**

What did run, and found no defect:

| step | result |
|---|---|
| same build (§P13-7.3 item 1, re-proved) | **SAME** (`R/same.txt`): hashes equal; 11 builds exit 0; scene chunk **bp13 21,473 B**, bp12 21,483 B; boot graph **503,777 B of 503,808, margin 31 B** (64 files); **F7 13/13** (cells at 17.23); **PR 6/6** |
| the re-measure's owed re-runs | **12 reads, all ruled PASS** (§1.1) |
| battery C·l, C·d (two readings each) and W·l (one reading) | **0 FAIL, 0 NOT-REPRODUCED** on both digests in every column read; every OWNER-BLOCKED cell PASS on its ruled branch; **0 stub, 0 splice in every W3 read**; FM 7/7 in every reading. **Every one of these readings ran above load 31** (§2) |
| static reads (§P13-7.4: the header and comments, the centre law's boundary) | the edge law reads as stated; the boundary holds (§3) |

None of this turns a row. The battery readings are of record as readings, but they cover three of four columns, each ran above 31 and owes a re-read at lower load, and the W·l re-read was the refused run.

---

## 1 · How this seat ran

| step | start → end | load |
|---|---|---|
| harness start, patch hashes, `git worktree add --detach … 392ff1e3c`, `node_modules` and `tests-visual/node_modules` linked | 15:38:53 → 15:41 | 6.43; disk 121 GB free |
| **attempt 1 of the builds** (`R/attempt1/`): one guarded slot per build | 15:42:32 → stopped 17:00 | fv3 queued **58 min** in the guard for its slot (5 heavy runs machine-wide), then built in 4 s; fv5 queued 20 min more. This seat stopped its own chain by process group (`kill -TERM -67306`), reversed fv5 with `git apply -R` (worktree clean, 0 dirty paths) and moved the logs to `attempt1/` |
| **builds** in ONE guarded heavy slot (`build.sh` → `build-inner.sh`, the first build.sh's body unchanged) | queued 17:01:21, admitted 17:48:34 (47 min) → 17:49:11 | 20.35 at admission; disk 86 GB; 11 builds exit 0 in 37 s |
| a false stop | 17:49:16 | the chain's refusal match read the guard's ZONE-ARMED warning ("only a REFUSED line stops a run") as a refusal and stopped. Nothing had been refused: `build-slot.log` holds only the warning. The match was narrowed to `^[guarded] REFUSED` and the chain resumed at 17:49:36 with the builds of record (`SKIPBUILD`); noted in `apply.log` and `chain.log` |
| PR (`--light`, no browser), F7, `same` | 17:49:36 → 18:14:46 | F7 gate 19.17 after 332 s; **SAME** |
| `rr`: owed re-runs, Chromium (C·d) | gate 18:18:46 (10.99), admitted 18:49:50 (31 min) → 19:07:06 | each read started at ≤ 11 (10.02-10.97) |
| battery C·l (`theme` slot) | 19:07:11 (10.32) → 19:52:38 | cells to **57.32**: re-read |
| C·l re-read | 19:56:09 (17.90) → 20:29:28 | cells to **37.46** |
| battery C·d | gate 20:47:30 (18.51, waited 1,082 s) → 21:01:02 | cells to **48.92**: re-read |
| C·d re-read | 21:08:06 (18.78) → 21:18:23 | cells to **32.59** |
| WebKit slot W·l (`--exclusive webkit`): owed re-runs, battery, `fmlow`, read queue | queued 21:18:23 (8.47), admitted at once → 22:27:32 | re-runs 8.47-10.99 at their starts; battery cells to **47.20**; `fmlow` **deferred** at admission (20.79 > 15, `battery/json/bp13-webkit/fmlow-light/admit.json`); the read queue's first line (`rev-bp13-r1`, gate 11) waited 30 min and the slot released (exit 75), **0 queue reads** |
| W·l re-read | 22:30:33 | **REFUSED** (zone 8.22M) |
| WebKit slot W·d | 22:30:33 | **REFUSED** |
| run | 22:30:33 | `STOPPED at 'wk' (exit 5)` |
| partial digests (`cells.mjs`, guarded `--light`, no browser), harness end | 22:31 → 22:32:51 | the guard admitted these light runs; 42 OK |

- **Machine law.** One heavy run at a time (`seat.lock`). Every build, browser run and digest went through `guarded`, and no browser run was `--light`. Playwright WebKit ran under `--exclusive webkit`, queued and never cancelled. No admitted slot was ended by stopping its parent. The only processes this seat stopped were its own, by process group: attempt 1's chain (pgid 67306, waiting in the guard's queue before any build of fv5 ran) and a relaunch (pgid 36295) stopped at once for a script syntax error, before any step ran. Disk was read before every build and battery step: 121 GB at the start, 48-86 GB during the seat (other seats were writing), never under 15.
- **Load.** Other seats (D5 pass 15, 10.1.5, 11.1.0, the cluster design loop) ran browsers throughout. The 1-minute load ran 8-83 during this seat. Every battery slot started at ≤ 20, as the rule asks, but every one ran above 31 inside.
- **WebKit page closes:** none recorded. Every witness opens one browser and a fresh context per cell, under the landed `launch()`'s 60-load restart (H3-1).

### 1.1 · The re-measure's owed re-runs (`R/rerun/`, `R/sum/rerun.txt`)

The re-measure left five single reds of its A/Bs with no re-read (RM §5). Each cell was re-run twice on bp13 and bp12, alternating, each read started at ≤ 11:

| cell (the red it re-reads) | column | bp13 | bp12 | start loads |
|---|---|---|---|---|
| `reversal` (bp12 `rev` r2, r5: the 886.9 px stub) | C·d | 2/2 ruled PASS, stub 0 | 2/2 ruled PASS, **stub 0** | 10.02-10.97 |
| `swap-short` (bp12 `nb` r5, `r2` r2: [blank]) | W·l | 2/2 PASS | 2/2 PASS | 8.47-10.99 |
| `first-expand` (bp13 `fe` r5: [lanes]) | W·l | 2/2 PASS | 2/2 PASS | 10.46-10.94 |
| `swap-short` (bp13 `nb` r4: [blank]), `first-expand` (bp13 W·d battery main: [lanes]) | W·d | **not run (refused)** | not run | — |

**12 reads, all ruled PASS.** bp12's C·d stub and both [blank] reds are NOT-REPRODUCED in these reads, and bp13 W·l `first-expand` [lanes] is NOT-REPRODUCED. The W·d pair is owed to the completion seat.

---

## 2 · The battery, as far as it ran (H8; `R/digest-partial/`, `R/sum/battery-w3.txt`)

`battery/json/bp13-chromium/main` and `rest` were overwritten with the C·l re-read when the C·d slot copied its tree. That copy step reads the whole build directory, and the re-read had left its output there. The first C·l and C·d readings were therefore saved from the seat's scratch into `battery-first-light/` and `battery-first-dark/` before teardown, and the digests below read them there. The `.log` files under `battery/` are the first readings throughout.

| reading | columns | cells | default: PASS / FAIL / NR / OB / UM / RECORD | ruled | cell loads |
|---|---|---:|---|---|---|
| **first** (`*-partial-first*`) | C·l, C·d, W·l | 506 | 453 / **0** / **0** / 29 / 14 / 10 | 482 PASS, 0 FAIL ("29 OWNER-BLOCKED cell(s) read on Q-4 (c) / Q-12 (b): 29 PASS, 0 not") | C·l to 57.32, C·d to 48.92, W·l to 47.20 |
| **Chromium re-read** (`*-partial-creread*`) | C·l, C·d | 339 | **0** FAIL, **0** NR | 327 PASS ("23 … 23 PASS, 0 not") | C·l to 37.46, C·d to 32.59 |
| W·d | — | — | **not run (refused)** | — | — |

- **W3, every battery read** (five: C·l first and re-read, C·d first and re-read, W·l first): **0 stub frames, 0 splice frames.** Every red W3 cell is OWNER-BLOCKED on **[window] alone**, with Q-4 (c) PASS (`R/sum/battery-w3.txt`): `first-expand`, `warm-collapse`, `warm-expand`, `reversal`, `swap-short`, `anchor-end·warm-expand` and `anchor-end·warm-collapse`, in the sets each reading lists. Rule (b) does not fire on what ran. That is a reading of three columns, not the rule's verdict.
- **R2 worst, battery** (vanish, bound 0.5): C·l 0.375 (`swap-short` 3 first; `swap-long` 2 re-read), C·d 0.391 (`swap-long` 2) / 0.388 (`first-expand` 8), **W·l 0.451** (`swap-long` seat 2, margin 0.049). That matches CR's thinnest bp13 read (0.451, W·l `swap-long`, seat 1 there).
- **FM** 7/7 PASS in every reading, including its two re-runs. The hole column is clean in each. W·l FM carries 1 RECORD, as every pass. **B2 is not read on the strips here**: W·d never ran and `fmlow` was deferred (§1). The strips that ran are in `filmstrips/` and were not read by eye.
- **L1** 6/6 per engine read (C·l, W·l). **CASES** 6/6 (C·l, W·l). F6 shows 0 crashes in the three columns.

**No row is scored from this.** The battery is three columns of four. Every column ran above 31, and each was re-read once at most (C·l and C·d still above 31; W·l refused). The digest of record must be a full four-column reading by the completion seat.

---

## 3 · Static reads on bp13 (`R/static/static-bp13.txt`)

### 3.1 · The edge law against the code (`writeClip`, `useDockScene.ts` 533-577 on bp13)

- `ds = v0 − max(box.lo, P.lo)` and `de = min(box.hi, P.hi) − v1` are each edge's depth from the nearer of the plate's and the box's own edge, as the header says. `ramp(d, x) = d > 0.01 ? f + (1 − f)·x / k : 1` with `f = clamp01(1 − d / TOUCH_PX)`. The mask is skipped only when both depths are ≤ 0.01. At depth ≥ `TOUCH_PX`, `f = 0` and the ramp is pass 12's exactly. The clip is still written at `v0` / `v1`, so no edge moves in place or time (no timing mask, E-2), and `TOUCH_PX` is the existing 0.5. That agrees with CR §2 and BU §3.
- **The depth crossing the touch** (the v1 draft's failure, BU §3.2) is continuous here. `f` is continuous in `d` at `d = TOUCH_PX` (both sides 0) and on (0.01, 0.5). The clip's place does not depend on `d` at all, so a depth crossing the touch on consecutive frames cannot step the clip. The only discontinuity is CR's 2 % step at `d = 0.01`, which the agglomeration ruled the `whole` test's own tolerance (§P13-2). This seat read that range only statically. The `er` attack (the builder's `revtrace.mjs` on `bp13x`, built and ready) was refused before it ran.
- **A reading, not a defect: "the only hard edge across a glyph is the plate's."** At a depth `d` under a touch, the clip edge at `v0` is still a step from 0 to `f = 1 − d / 0.5` in the glyph's ink, `d` px inside the plate's edge. At d = 0.05 that is a 0.9 step 0.05 px in; at d = 0.25, a 0.5 step. The header's sentence is true in the limit the stub law reads (H8 judges an edge only more than `CUT_PX` = 0.5 px in), and the step's height falls to 0 as its depth reaches the touch. That is the law the agglomeration ruled. It is recorded here only so the sentence's scope is on file: it describes the stub law's resolution, and below a touch it is not a literal statement about sub-pixel ink. No prose edit is asked (§P13-7.3 item 1).
- `k = (m.exit?.heir && q) || m.seam`; `m.seam` comes from `--dock-seam` (one glyph advance, `useDockScene.ts` 139, 472). A seam of 0 would make `x / k` NaN, but that is pass 12's division unchanged, and `--dock-seam: 1ch` is never 0 on a laid-out box. Not this patch's.
- The header paragraph ("The seam edge is a ramp", lines 71-78) and `writeClip`'s comment state the law once each. The comment names the paragraph, and no added line carries a REGISTRY or harness id. "The handoff", "The window" and the facing-pair comment are unchanged, as is the code they describe (`inPlate` is four copies of `[max(a, P.lo), min(b, P.hi)]`).

### 3.2 · The centre law's boundary

`grep` over `src/components/dock` on bp13 for `scale` / `rotate` / `transform` declarations finds four kinds. There are seat-level scales: `icon-button.css` 32/117/130/179, `tab-button.css` 53/73/80, `triggers.css` 29/92 (identity bases, hover, press, `--dock-active-scale`). There is the select trigger's chevron `rotate` (`triggers.css` 160/165, a child glyph inside one seat). There is the rim pseudo-element's `scale: var(--dock-rim-t) 1` / `1 var(--dock-rim-t)` (`scroll-rungs.css` 78/97, frames no unit). And there is a centring `translate` in `touch-floor.css` 51. **No box framing dock units carries a scale or rotate of its own.** The boundary holds, as CR §3.6 read it.

---

## 4 · What did not run (owed to the completion seat)

Every item below is unread on this seat. None is a "0".

| item (§P13-7.4) | state |
|---|---|
| owed re-runs, W·d: `swap-short` ×2, `first-expand` ×2 per build | not run (`q/rerun-webkit-dark.q`) |
| battery W·d, `fmlow` W·d | not run |
| `fmlow` W·l | deferred at admission (20.79 > 15); the `fmlow` step never ran |
| re-reads of C·l, C·d and W·l at lower load | C·l and C·d re-read once, still above 31 (37.46, 32.59); W·l re-read refused |
| **A/Bs of §7.3 item 3, rule (d)'s included**: `rev` (16 / 8 rounds), `ab` (rules (a), (b)), `cr` (rule (c)), `nb`, `fl` (the [lanes] class at A/B rate, RM §4), `fmab`, `swp`, `si`, `r2`, `r2y` | **0 reads** (`q/{chromium,webkit}-{light,dark}.q`, 144 / 136 / 194 / 186 lines; `q/webkit-light.done` is empty) |
| attacks: `pe`, `revst`, `rtrev`, `er` (the edge law's range on `bp13x`), `lanes`, `fs`, `heir`, `frz`, `edge`, `cases` | 0 reads |
| the 794 px sibling on `swrev --then 0`; the window late and early in Playwright WebKit; R2 at 10-15 against bp12 | 0 reads |
| B2 strips by eye, four columns, with the `warm-collapse` slot-5 frame | not done (W·d never ran) |
| cost | not run |
| the four-column digest, default and ruled | not possible on three columns |
| real Safari | **UNMEASURED (owner's safaridriver checkbox)** |

**For the completion seat.** The queues in `R/q/` and the scripts in `R/scripts/` are written and ready. They name this seat's worktree paths (`.claude/worktrees/bl/D2/p14/Bp-crit/{wt,out,hfs}`), which this seat removed. Re-create the worktree there at `392ff1e3c` and run `scripts/build.sh` (one guarded slot, 37 s of build), or rewrite the paths. Then run the chain from step `wk` with `WKT=dark` for the W·d column, then `fmlow`, `q`, `cost`, `digest` and `hend`. Re-read C·l, C·d and W·l at a lower load. Build the four-column digest from `battery-first-light/`, `battery-first-dark/`, `battery/json/bp13-webkit` and the new W·d, or from whichever readings ran ≤ 31. Two lessons from this seat:
- **Builds go in one guarded slot.** Per-build slots queued about 1 h each under this load.
- **The battery's json copy overwrites a re-read's sibling theme.** Read the first readings from `battery-first-*` here, or copy them aside before a re-read.

---

## 5 · Classes seen, for placing (no row minted)

| class | where | note |
|---|---|---|
| the guard's zone refusal at 8.22M (22:30:33) | header, §1 | the stop under §P13-7.5; the completion seat resumes after the owner's reboot |
| the refusal match reading the ZONE-ARMED warning text ("only a REFUSED line stops a run") as a refusal | §1 | this seat's own script, cured by matching `^[guarded] REFUSED`; it cost 20 s, and nothing was refused then |
| per-build guarded slots queued ~1 h each (5 heavy runs machine-wide) | §1, `attempt1/` | builds now run in one slot |
| the battery's json copy overwriting the C·l re-read's sibling theme in `battery/json` | §2 | the first readings preserved in `battery-first-*`; a harness-runner behaviour, not a witness change |
| every battery slot started at ≤ 20 and ran above 31 (to 57.32) | §1, §2 | other seats' browser runs; each owes a lower-load re-read |
| W3 battery reds [window] alone, OWNER-BLOCKED, Q-4 (c) PASS | §2 | the base's, as every pass |
| R2 W·l `swap-long` seat 2 at 0.451 (margin 0.049) | §2 | equals CR's thinnest bp13 read; no row |
| the edge law's sentence "the only hard edge across a glyph is the plate's" holds at the stub law's resolution; below a touch, a 0-to-(1 − d / touch) step sits d px in | §3.1 | a statement of scope, not a defect; no prose edit |
| disk falling from 121 to 48 GB during the seat (others' writes; this seat's scratch was 160 MB) | §1 | never under 15; the driver's to watch |

---

## 6 · Fences, as kept

- **Worktree:** `.claude/worktrees/bl/D2/p14/Bp-crit/wt`, detached at `392ff1e3c`, with `node_modules` and `tests-visual/node_modules` linked from the checkout. Builds, caches and outputs went under `Bp-crit/out/`, and the scratch harness copy under `Bp-crit/hfs/`. **Git writes:** `git worktree add` and `git worktree remove --force` only. `git apply` (and `git apply -R` for attempt 1's fv5) ran only in the worktree, with no commit. At the end the worktree entry was removed and `.claude/worktrees/bl/D2/p14/Bp-crit/` deleted.
- **Writes to the checkout:** this file and `pass-14/D2-Bp-crit-records/` only. No tracked source was edited. Nothing under `~/.claude` was read: the guard was invoked, never read, and its warning and refusal texts are quoted from this seat's own logs. Sibling repos were neither read nor run. No `find`, `du` or similar over `/`, `~` or `/Users`.
- **Processes:** the run ended `STOPPED at 'wk' (exit 5)` at 22:30:33. No process of this seat remains.
