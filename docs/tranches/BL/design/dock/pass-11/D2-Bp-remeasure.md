# D2-B′ re-measure, pass 11: prose edits proven byte-equal, battery run, readings stopped by the zone gate

| field | value |
|---|---|
| seat | D2 pass 11 (the confirmation pass), the RE-MEASURE seat for D2-B′ (REGISTRY §P10-7.3). Authored nothing in D2's passes 9 and 10 · model `claude-opus-5-5`, asserted from own system identity · one entry, 2026-10-31 04:58 → 06:20 |
| HEAD | `93a03923d`. `git diff --name-only 387c11285 HEAD -- src demo tests package.json docs/design` is empty, so the tree under every pass-10 reading is today's |
| inputs read | REGISTRY's "D2 · pass 10 · REGISTRY" part (§P10-0..§P10-8) in full; `pass-10/D2-Bp-proto.md` in full; `pass-10/D2-Bp-critique.md` §5 and its headings; the pass-10 critic's and builder's scripts; `pass-9/D2-Bp-remeasure.md` and its scripts (the seat's template); `audit/INBOUND.md` through O-117 and `FORMATION-PROGRESS.md` to its last line at the start. No ruling touches D2's 38 rows; none arrived during the pass |
| builds (seat worktree, every build guarded) | `bp10` = HEAD + `pass-6/floor-v5.patch` (`cba6bdc2…`) + **`pass-11/D2-Bp-p11.patch`** (§1); `bp10ref` = floor v5 + `pass-10/D2-Bp-proto.patch` (**`09aa6b3b…`, re-hashed equal**), built only for step 1's proof; `bp8` = floor v5 + `pass-9/D2-Bp-p9.patch` (`dd5d9f5f…`); `fv5` = floor v5; `fv3` = HEAD + `pass-4/floor-v3.patch` (`637d1625…`, L1's reference). Every patch applied clean (`records/apply.log`) |
| harness | H8 as landed. The per-file sha256 list of `harness/` equals `pass-8/H8-records/harness.sha256` line for line **at the start and at the end** (`records/harness-at-start.sha256`, `harness-at-end.sha256`, 42 files), list hash **`9d12810bc24d91d2…`**, printed by every chain stage (`records/chain.log`). Adapter `pass-3/adapter-floor-v2.mjs` |
| owner rulings | O-103 (Q-4 (c), Q-12 (b), Q-18 (a), Q-15 (a)); O-87, O-88 bind. This seat scores no row |
| engines | Chromium (Playwright's default headless shell, no GPU launch args) and **Playwright WebKit**, unshimmed. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| **status** | **STOPPED at the kernel zone gate.** Steps 1 and 2 ran to their end. Step 3's browser readings (the retarget A/B, `vmorph` collapse in paint, the display-frame probe) and the cost runs did **not** run: at 06:02 the guard refused the first readings slot, `[guarded] waiting for headroom (kernel zone data.kalloc.1024 at 18.0M (panics near 20.8M): reboot the Mac)` (`records/slot-rd-chromium-light.log`). The task's law says stop every run and return. The seat stopped its chain while the slot was still queued, before any cell ran (`chain.log` 06:02 and the STOPPED line). **The owner should reboot the Mac before any further heavy run** |

Load is the 1-minute load average beside every timing. "C" is Chromium, "W" Playwright WebKit, "·l / ·d" light / dark. Records: `pass-11/D2-Bp-remeasure-records/`.

---

## 0 · In brief

- **Step 1 held: the built bytes are equal.** Both prose edits are in, and nothing else changed (§1). `dist/` (841 files) and `dist-demo/` (346 files) built from the pass-11 tree are byte-identical to the `09aa6b3b` tree's own build: `cmp` over all 1,187 files, 0 differ. The harness's scene build (3 files) and demo build (346 files) are identical too. F7 13/13, PR 6/6. **The pass stays a confirmation pass.** New patch: **`pass-11/D2-Bp-p11.patch`, sha256 `b5d5c9db632f4e97baed2f3e3d906568e122f6a9c0d3f141d5f4ff067ea97aa5`**. `git apply --check` is clean on HEAD + floor v5.
- **Step 2, the battery, ran whole: one battery of all four columns under H8, with `fmlow` in both WebKit themes.** The digests (no row scored here; for the critic):

| digest | 38 rows | first 36 | first 24 | OWNER-BLOCKED rows | cells: PASS / FAIL / NR / OB / UM / RECORD |
|---|---:|---:|---:|---|---|
| ruled (O-103), `p11rm-ruled` | 38/38 | 36/36 | 24/24 | — | 645 / 1 / 1 / 0 / 12 / 12 (671) |
| default, `p11rm` | 36/38 | 34/36 | 22/24 | P1, P3 | 609 / 1 / 1 / 36 / 12 / 12 (671) |

  The one FAIL and the one NR are CASES `case·rotated` [jerk], outside the 38 (§2.2). No cell of the 38 read red in any column.
- **Neither §P10-7.1 rule fires on what ran.** The battery's W3 `retarget·40/80/120` read 12 of 12 PASS, with 0 splice and 0 stub frames. FM reads 0 stub in all 108 B2 reads, and W3 reads 0 stub in every column. **But rule (a) is read on the A/B, and the A/B did not run.** So this seat cannot say that rule (a) holds for pass 11.
- **B2:** 108 FM reads of the six B2 cells over the four columns and both `fmlow` stages. There is **1 hole frame in 1 read** (W·d `fmlow` r3 `warm-collapse`, slot 5, one frame at +40 ms, ink 0.085, load 12.77) and **0 runs over 1 frame**. H8-1's `film·hole·column` reads PASS ×4.
- **Readings beside the rows that ran:**
  - R2's margin is C·l 0.127, C·d 0.127, W·l 0.101 and **W·d 0.062**. W·d's margin is the thinnest bp10 has read, at load 8.67 (§3.2).
  - The boot graph is 503,737 B against 503,808 B, **margin 71 B**.
- **Readings that did not run** (the zone gate):
  - the retarget A/B;
  - `vmorph` collapse in paint, beyond one smoke run (§3.4);
  - the display-frame probe;
  - cost.
- **For the critic, outside the two edits:**
  - The facing-pair pass's own comment in `useDockScene.ts` still says "whichever way each unit goes", but the code exempts two leaving units.
  - B′'s added lines carry the floor-v2 REGISTRY row ids `N-2` (×4) and `N-3` (×3). They are not in §P10-2's list (§4).

---

## 1 · Step 1: the two prose edits, and the byte-identical proof

**The edits** (`records/scripts/edit-p11.py`, comments only; `records/edit-p11.diff`):

```
@@ -43,7 +43,8 @@   (the header's "The seam." paragraph)
 // (`1ch`) of the wider of the two, and any two cut edges that face each other keep it too,
-// the unit coming in giving way. Two faces never meet inside a glyph run, so no frame paints
+// the unit coming in giving way. Two units going out keep no seam between them: their
+// fronts are the exchange's. Two faces never meet inside a glyph run, so no frame paints
@@ -1287,7 +1288,7 @@  (the episode's trigger, reduced motion)
-        // opens, and the write below lands the episode in this frame (Q-18 (a)).
+        // opens, and the write below lands the episode in this frame.
```

The first edit states what the code does: the facing-pair pass skips `(u.m.exit && w.m.exit)`. The second strips the ruling id and leaves the comment's law alone.

**The proof** (`records/cmp/cmp.txt`; `scripts/build.sh`, `step1.sh`):

| check | result |
|---|---|
| `bp10ref` tree (09aa6b3b): `npx vite build` + `npm run demo:dist:build`, kept outside the tree | exit 0 (`build-bp10ref-dist.log`, load 9.25-9.45) |
| the two edits applied; F7 on that tree rebuilds `dist/` and `dist-demo/` | lib and demo built (F7 13/13) |
| `diff -rq` + per-file `cmp`, `dist/` | **IDENTICAL, 841 files** |
| the same, `dist-demo/` | **IDENTICAL, 346 files** (1,187 files, 0 differ) |
| manifest sha256 (sorted per-file list) | `dist` `5eb1363a…` both; `dist-demo` `c70843bd…` both |
| harness `build.mjs` outputs, `bp10` against `bp10ref` | `scene/` IDENTICAL (3 files), `demo/` IDENTICAL (346 files) |
| F7 (`F7-bp10/F7.json`, load 6.88-12.3) | **13/13**: typecheck, both builds, units, all ten gates |
| boot graph (`F7-bp10/boot-graph.txt`; the bp10ref tree's own in `boot-graph-bp10ref.txt`) | 64 files, **503,737 B against 503,808 B, margin 71 B** both; `useDockScene-CA6dYrPn.js` 21,433 B, the same content-hashed chunk as pass 10 |
| PR (`PR-bp10/PR.json`, `--light`, load 7.21) | **6/6** |

**The patch** (`scripts/mkpatch.sh`, `records/patch.log`, `records/p10-p11-patch.diff`). It is made with `git diff --no-index` between a `git archive HEAD` + floor v5 tree and the seat tree. Git discovery is fenced at the scratch directory, and no object is written.
- 62 files, +2,504 / −2,411.
- `git apply --check` is clean on HEAD `93a03923d` + floor v5. Applied, the tree equals the seat tree.
- Against `09aa6b3b` it differs in the new file's blob id and hunk length, the header's one line made two, and the Q-18 line. Nothing else changes.
- **sha256 `b5d5c9db632f4e97baed2f3e3d906568e122f6a9c0d3f141d5f4ff067ea97aa5`.**

**The built bytes did not change, so the pass stays a confirmation pass** (§P10-7.3 item 1). Every reading below is of `bp10` built from this patch, whose built output is `09aa6b3b`'s.

---

## 2 · Step 2: the battery

`records/scripts/chain.sh` `bat` + `fmlow`. One `theme` slot per engine and theme (H6-10). Red cells were re-run twice in the slot, and FM's six B2 cells ran three times each. Then `fmlow` ran per WebKit theme (H8-2). F7 and PR are from step 1, and L1 ran against `fv3`. Every slot ran under the guard, never `--light`, and WebKit ran under `--exclusive webkit`.

### 2.1 · Slots, admission and load

| slot | driver start (load) | admitted (load) | cells' load, re-runs included | cells > 31 |
|---|---|---|---|---:|
| C · light | 05:05:33 (7.68) | at once (7.68) | 5.89-8.96 | 0 |
| C · dark | 05:15:50 (6.05) | at once (6.05) | 5.96-10.55 | 0 |
| W · light | 05:25:15 (6.40) | **05:37 at 9.15** (WebKit lock, 12 min) | 4.90-12.49 | 0 |
| W · dark | 05:48:45 (5.59) | 05:48 at 5.59 (lock at once) | 5.46-12.15 | 0 |
| `fmlow` light | queued 05:59:24 at 12.63 | **admitted at 12.63**, try 1 (bound 15) | FM 4.9-12.77 (column) | 0 |
| `fmlow` dark | queued 06:00:55 at 10.59 | **admitted at 10.59**, try 1 | FM 8.43-14.43 (column) | 0 |

`battery/slots.log`, `battery/loads.txt` (`pass-9` `loads.sh`), `fmlow-*/admit.json`. No cell ran above 31, so no slot is re-read. There was no slot split, no WebKit page close (each witness opens one browser and a fresh context per cell, under the 60-load restart, H3-1), and no deferral.

### 2.2 · Red cells, each re-run twice in its slot

| cell | column | main | re-run 1 | re-run 2 | digest |
|---|---|---|---|---|---|
| CASES `case·rotated` [jerk] (6.96 vs control 5.67 +1) | C·l | FAIL (7.46) | FAIL (8.15) | PASS (7.73) | **FAIL**, outside the 38 |
| CASES `case·rotated` [jerk] (11.23 vs 9.96 +1) | W·l | FAIL (5.68) | PASS (5.86) | PASS (5.95) | NOT-REPRODUCED, outside the 38 |

No cell of the 38 read red in any column. That is the class §P5-8 to §P10-8 place outside the list, and pass 10's critic read the same (FAIL W·l, NR C·l). FM's six B2 cells re-ran twice on every FM run, as H7-3 places them.

### 2.3 · The 38 rows (no row scored here)

`digest/table-p11rm-ruled.md`, `rows-p11rm-ruled.md`, `counts-p11rm-ruled.md` (`node harness/cells.mjs --build bp10=R --f7 bp10=R/F7-bp10/F7.json --pr bp10=R/PR-bp10/PR.json --tag p11rm [--ruled]`).
- Every one of the 38 reads PASS on the ruled digest. The default digest reads P1 and P3 OWNER-BLOCKED, with 36 OB cells. O-103's branches read all 36 PASS.
- UM 12 = W8 `consumer·*` (value.js fence, headed real-GPU), as every pass. RECORD 12 = R6 ×4, W7 ×8.
- **ST measured in all four columns** (10/10 each, WebKit at 10.26-12.49 and 5.46-10.96). Pass 9's WebKit cast offset did not recur.

---

## 3 · Step 3: the readings beside the rows

### 3.1 · B2: the FM reads, and `stub` per column

`fm-reads.txt` (`pass-9` `fmsum.mjs`, every FM read with hole, worst run, stub slot, offset and edge, and load):

| column | reads | hole frames | runs over 1 | `stub` reads (slot, offset, plate edge) | load |
|---|---:|---:|---:|---|---|
| C·l | 18 | 0 | 0 | 0 | 6.10-8.37 |
| C·d | 18 | 0 | 0 | 0 | 6.31-7.24 |
| W·l (battery + `fmlow`) | 36 | 0 | 0 | 0 | 4.90-12.77 |
| W·d (battery + `fmlow`) | 36 | **1** | 0 | 0 | 8.43-14.43 |

- **The one hole frame:** W·d `fmlow` r3 `warm-collapse` (PASS), slot 5, one frame at +40 ms, ink 0.085, sides 1.03 / 0.92, load 12.77.
  - The strip (`filmstrips/webkit-dark/fmlow-dark_rerun2_strip-webkit-warm-collapse.png`) shows, by eye: "H 1 2 3 | Play Settings Square" → the same → "… Play Settings" → "H 1 2 3 |" → "H P 2" → "H P". The slot shows P or 1 on every tile, and no tile is empty inside the plate.
  - The one-frame read at +40 ms falls where the closing edge takes the trailing labels.
  - It is one frame and one read, so H8-1 reads it as no run (PASS). It is the same class as pass 9's single W·d hole frames (0.074, 0.083), which pass 10 did not read.
- **`stub` per column:** FM 0 / 0 / 0 / 0. W3 0 / 0 / 0 / 0: no W3 cell read red, and the battery's 12 `retarget·*` main reads show 0 stub frames in 31-53 judged frames each. No column holds a stub read at all, so §P8-7.1's rule (b) does not fire on this battery.
- **Strips:** `filmstrips/` holds all 108 bp10 strips. By eye, C·l `first-expand` main reads: "H P" → "H P 2 3" → "H P 2 3 | Play Se" → "H P(fading) 2 3 | Play Settings" → "H 1 2 3 | Play Settings Square" → rest. The slot holds P until 1 has ink. B2's strip ruling is the critic's.

### 3.2 · R2's margin, per column (bound 0.5)

`r2-margins.txt` (`pass-9` `r2sum.sh`, every W3 cell, main and re-runs):

| column | worst drop | cell, seat, offset | load | margin |
|---|---:|---|---|---:|
| C·l | 0.373 | `warm-expand`, seat 8, +216.3 ms | 7.27 | **0.127** |
| C·d | 0.373 | `warm-expand`, seat 8, +208.9 ms | 6.75 | **0.127** |
| W·l | 0.399 | `warm-collapse`, seat 2, +3725 ms | 10.52 | **0.101** |
| W·d | **0.438** | `warm-expand`, seat 8 (the heir's cut), +205 ms | 8.67 | **0.062** |

Pass 10 read W·d at 0.102 (builder) and 0.088-0.102 (critic, load 10-15) on bp10, and pass 9's critic read 0.053 on bp8. **This W·d read, 0.062 at load 8.67, is the thinnest bp10 has shown.** It sits at the heir's own cut (seat 8, `warm-expand`), where the critic's 0.088 sat. The row holds (R2 33/33 in every column). The registry said the cure cannot spend this margin "by construction". On the battery here, the WebKit margin on bp10 reaches near bp8's range. This seat ran the battery W3 only, not the critic's four extra W3 runs.

### 3.3 · The retarget A/B, the display-frame probe, cost: NOT RUN

The `rd` slots (A/B, probe, `vmorph` strips) and the cost runs were the chain's next stages. The guard refused the first of them on the kernel zone count (18.0M against its 13M gate; `slot-rd-chromium-light.log`), and the seat stopped the chain before admission, as the machine law requires. `ab/`, `si/` and `cost/` are empty. **So this seat has no A/B reading for rule (a), no probe reading, and no cost reading for pass 11.**

### 3.4 · `vmorph` collapse in paint: one smoke run only

Before the chain, one guarded Chromium light smoke run of the strip script (`scripts/vmstrip.mjs`, bp10, load 9.64) read:
- `spliceRow` 1 frame, `s2|s3` gap 9.81 px at 50 ms;
- sliver 0;
- stub 0 (the glyph law found no glyph cut hard inside the plate on any frame).

Its strips lived in the seat scratch and were not kept, so it is **not a reading of record**. It only checks the instrument. By eye on its zoom tiles (marker frame, then about 40, 80 and 120 ms in):
- At about 40 ms, "1" and "2" were whole, with no visible cut.
- At about 80 ms, "3" was taken by the closing plate edge.
- At about 120 ms, "1" showed as a faint fragment (the handoff closing it on its middle as P arrives).

The paint reading §P10-7.3 asks for (both engines and themes, three runs each) **did not run**. The script and its summariser (`scripts/vmsum.mjs`) are in the records for the critic or a re-run after the reboot.

### 3.5 · Boot graph

**503,737 B against 503,808 B, margin 71 B** (§1). This equals pass 10, because `dist-demo/` is byte-identical.

---

## 4 · Prose, read by grep

`records/grep-added.txt` (`scripts/grep-added.py` over every added `src/` line of `D2-Bp-p11.patch`, 2,226 lines).
- **Harness ids** (W1-W8, H-rows, `retarget·`, `ticking`, `film·`, "harness") **in B′'s added lines: 0.** PR 6/6.
- **REGISTRY ids left in B′'s added lines, `src/components/dock`:**
  - the three §P10-2 names for the landing's sweep: `useDockBody.ts` "(O-64 R-3)", `controls.css` "(O-67)", `morph.css` "F-77";
  - **not in §P10-2's list:** the floor-v2 REGISTRY row ids `N-2` and `N-3`, with seven hits:
    - `GlassDock.vue` "[D2 floor v2 · N-2]";
    - `useDockRun.ts` "[N-2]";
    - `useDockScene.ts` "(useDockContent, N-2)", "(dockSizeHandoff, N-3)", "(N-2)", "(N-3)" ×2.

  These came in through `pass-9/D2-Bp-p9.patch` (the same lines are there) and through floor v5's own N-2 tags. They belong to the class of floor v5's REGISTRY tags, but they sit in B′'s lines. This seat edits nothing beyond the two edits. **For the landing's one grep sweep (§P10-5), and for the agglomeration.**
- **The header against the code after the edit.** The header paragraph now states the leaving-pair exemption. The facing-pair pass's own comment (`useDockScene.ts`, the block before `const live = units`) still reads "Two cut edges that face each other keep the seam, whatever cut them and **whichever way each unit goes**". The code skips a pair whose two units both leave. That comment's next sentence ("a unit going out is never held by it") is true, but its first sentence overstates as the header did. §P10-7.3 allowed two edits, so this seat leaves it. It goes to the critic (§P10-7.4 "the header against the code after the prose edit").

---

## 5 · For the critic and the agglomeration (recorded; no row minted, none scored)

| item | reading | where |
|---|---|---|
| **kernel zone gate** | `data.kalloc.1024` at **18.0M** (gate 13M, panics near 20.8M); the guard refused the readings slot at 06:02; chain stopped before admission; **the owner should reboot before the critic's heavy runs** | header; §3.3 |
| step 1 | byte-identical (1,187 files, 0 differ; harness scene/demo identical); F7 13/13; PR 6/6; patch `b5d5c9db…` | §1 |
| battery | ruled 38/38, 36/36, 24/24; default 36/38 (P1, P3 OB); no cell of the 38 red | §2 |
| §P10-7.1 rule (a) | **unread for pass 11 by this seat** (A/B not run); the battery's 12 `retarget·*` main reads 0 splice | §3.3 |
| §P10-7.1 rule (b) | 0 stub reads in any column (FM, W3) | §3.1 |
| W·d R2 margin **0.062** (load 8.67, `warm-expand` seat 8) | thinnest on bp10; pass 10 read 0.088-0.102 | §3.2 |
| W·d `fmlow` single hole frame (0.085, slot 5, +40 ms, load 12.77) | one frame, no run; pass 9's class | §3.1 |
| CASES `case·rotated` [jerk] C·l FAIL, W·l NR | outside the 38 | §2.2 |
| `vmorph` collapse in paint | **not read** (one smoke run, not of record: splice `s2\|s3` 9.81 px at 50 ms, stub 0) | §3.4 |
| the facing-pair pass's own comment ("whichever way each unit goes") | still overstates against `(u.m.exit && w.m.exit)` | §4 |
| `N-2` ×4, `N-3` ×3 in B′'s added lines | not in §P10-2's list; the landing's sweep | §4 |
| WebKit lock wait | 12 min (W·l), others at once | §2.1 |
| real Safari | **UNMEASURED (owner's safaridriver checkbox)**; O-103: not granted | — |

---

## 6 · Fences, as kept

- **Worktree:** `.claude/worktrees/bl/D2/p11/Bp-remeasure/wt`, detached at `93a03923d`. Its `node_modules` was a directory of per-package symlinks to the checkout's (`.vite`, `.vite-temp`, `.cache` not linked), so the vite caches stayed in the worktree. The checkout has no `tests-visual/node_modules` to link. Builds, F7's `dist/` and `dist-demo/`, harness outputs and the reference copies went under the worktree or `…/Bp-remeasure/out`. The patch check ran in `…/Bp-remeasure/chk` with `GIT_CEILING_DIRECTORIES` set to it, so no git discovered the checkout there and no object was written.
- **Git writes:** `git worktree add` and `git worktree remove --force` only.
- **Writes to the checkout:** `pass-11/D2-Bp-p11.patch`, this file, and `pass-11/D2-Bp-remeasure-records/`. No source edit in the checkout.
- **Machine law:**
  - Every build, test and browser run went through `~/.claude/guard/guarded`, one heavy run at a time. Browser runs were never `--light`, and every Playwright WebKit run ran under `--exclusive webkit`. The digest and PR (no browser) ran under `--light`.
  - There was no headed, GPU-arg or real-Safari run and no browser MCP.
  - **The guard refused on the kernel zone count, and the seat stopped every run of its own.** No process of this seat remains; the two chains still listed by `ps` are D5's `engagement/pass-11` seats, not this seat's.
  - Nothing under `~/.claude` was read; the guard's refusal is quoted from this seat's own slot log. Sibling repos were untouched, and value.js was not built or run.
- **Harness at the end:** equal to `pass-8/H8-records/harness.sha256` line for line, hash `9d12810b…` (`harness-at-end.sha256`).
- **Cleanup:** `git worktree remove --force` on the seat worktree (`git worktree list` shows no `p11/Bp-remeasure` entry), then `rm -rf .claude/worktrees/bl/D2/p11/Bp-remeasure/`. The directory is gone. The empty parent `.claude/worktrees/bl/D2/p11/` remains; removing it was refused by the permission system.
