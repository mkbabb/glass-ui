# D2-B′ critique, pass 10: 38/38 on the ruled digest; the retarget splice reads 0 on bp10 in 2,000+ reads

| field | value |
|---|---|
| seat | D2 pass 10, fresh adversarial CRITIC of D2-B′ (REGISTRY §P9-7.4). Authored nothing in D2 and was no earlier D2 critic · model `claude-opus-5-5`, asserted from own system identity · one entry, 2026-10-30 22:18 → 2026-10-31 05:00 |
| base | HEAD `ebbf5bc75` (`git diff --name-only 387c11285 HEAD -- src demo tests package.json docs/design` empty). Builds in the seat worktree: `bp10` = HEAD + `pass-6/floor-v5.patch` (`cba6bdc2…`) + **`pass-10/D2-Bp-proto.patch`, re-hashed `09aa6b3bf44eb041078308517c9ef3fa603527cff8815a38fac743c7136da331`**, equal to the builder's; `bp8` = HEAD + floor v5 + `pass-9/D2-Bp-p9.patch` (`dd5d9f5f…`); `fv3` = HEAD + `pass-4/floor-v3.patch` (L1). Attack builds, never landed: `bp10i` (the builder's `instrument.py` trace), and `bp10fs`, `bp8fs`, `bp10fsi` through a scratch harness copy (the pass-9 critic's `fs-scene.py`). `fv5` was not built: this seat ran no cost reading (§7.4 does not ask one) |
| built bytes | the demo's scene chunk `useDockScene-CA6dYrPn.js` 21,433 B on bp10 and `useDockScene-hY1v177J.js` 21,325 B on bp8, the names and sizes the builder records. Boot graph **503,737 B against 503,808 B, margin 71 B** (`F7/boot-graph.txt`) |
| harness | H8 unchanged. The per-file list equals `pass-8/H8-records/harness.sha256` (42 OK) at start (`harness-check-start.txt`) and at end (`harness-check-end.txt`); list hash **`9d12810bc24d91d2…`**, printed by every chain stage (`chain.log`) |
| owner rulings | `audit/INBOUND.md` re-read to its last row (O-116) and `FORMATION-PROGRESS.md` to its last line at start: no ruling touches D2's 38 rows, none arrived mid-pass. O-103 (Q-4 (c), Q-12 (b), Q-18 (a), Q-15 (a)): **the ruled digest is the score of record**, default beside it. O-87, O-88 bind. W-0.8 §10's held cells are outside the 38 and were not read |
| engines | Chromium (Playwright's default headless shell, no GPU args) and **Playwright WebKit**, unshimmed. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| records | `pass-10/D2-Bp-crit-records/`: `battery/` (every slot log, re-runs, `json/`, `slots.log`), `digest/`, `filmstrips/` (strips kept per reading), `fm-reads.txt`, `r2-margins.txt`, `F7/`, `PR/`, `ab/`, `sweep/`, `ph/`, `si/`, `vl/`, `fs/`, `heir/`, `r2/`, `revstub/`, `smoke/`, `chain.log`, `apply.log`, `scripts/`. No video |

Load is the 1-minute load average. "C" is Chromium, "W" Playwright WebKit, "·l / ·d" light / dark. `R` below is `pass-10/D2-Bp-crit-records/`.

---

## 0 · Verdict

| digest | 38 rows | first 36 | first 24 | open |
|---|---:|---:|---:|---|
| **ruled (O-103), B2 read on the strips too: the score of record** | **38/38** | **36/36** | **24/24** | — |
| default | 36/38 | 34/36 | 22/24 | P1, P3 (OWNER-BLOCKED, Q-12 / Q-4) |

**On this seat's battery pass 10 is clean, and neither §P9-7.1 rule fires.** 671 cells. Ruled: 644 PASS, 0 FAIL in any row, 2 NOT-REPRODUCED, 12 UNMEASURED (W8 `consumer·*`, as every pass), 12 RECORD, and 1 FAIL outside the 38 (CASES `case·rotated` [jerk] W·l, which no row reads: §1). Default: 606 PASS, 38 OWNER-BLOCKED, the same 2 NR and the same out-of-list FAIL.

The cure holds against the class it was built for:
- **The pass-level read (§P9-7.1): 0 splice reads at every `retarget` cell in every column of this seat's A/B.** bp10 **0 of 96**, bp8 **2 of 96** (W·l and W·d `retarget·80`, frame 9, 10.22 and 10.24 px), at 8.48-15.72.
- **Every phase:** 0 splices in 1,536 bp10 swap reads (offsets 42-198 ms at 4 ms, 44-100 ms at 1 ms, a retarget of a retarget at five delays), against 15 in 104 bp8 control reads in the same slots.
- B2 holds: H8-1 PASS ×4, 0 hole frames in 108 FM reads, the display-frame probe 0 of 72 on both builds, and no empty tile in any strip this seat read.

Three things for the agglomeration, none a row (§5):
1. **The new header overstates the law.** It says "any two cut edges that face each other keep [the seam]". The code skips any pair whose two units both leave (`(u.m.exit && w.m.exit) … continue`). Read in this seat: the `vmorph` collapse puts two leaving icons' cut edges 9.53-10.35 px apart (bound 10.36) in 117 of 184 bp10 reads and 21 of 24 bp8 reads, and no H8 witness drives that scene. Either the header names the exemption, or the law covers it.
2. **Stub reads off the battery's phases** (8 single reads in 2,744 bp10 phase reads, one frame each): beside the W·d `retarget·40` [stub] NR in the battery. Read against bp8 at the reversal phases, bp10 1 of 48 and bp8 2 of 48 (§4.3): a shared single-frame class of the base, not the cure's.
3. **`(Q-18 (a))`, a REGISTRY ruling id, is still in an added line of `useDockScene.ts`**, outside the seven obligation 5 named. PR's regexes miss it, as they missed the seven.

---

## 1 · How this seat ran

| step | start → end | load (admission / cells) |
|---|---|---|
| builds `fv3`, `bp8`, `bp10`, `bp10i`; `bp8fs`, `bp10fs`, `bp10fsi` | 22:21 → 22:22; fs builds re-run 22:22 → 22:23 (the scratch copy's relative paths, §7) | 8.48-10.24 |
| smoke reads of `phase2.mjs` (C·l, bp10 / bp8 / fv3) | 22:23 → 22:28 | 7.26-11.42 |
| PR (`--light`), F7 | 22:30 → 22:31 | 8.02 / 9.12 |
| battery C·l | 22:31 → 22:41 | admitted 8.95; cells 6.5-9.25 |
| battery C·d | 22:41 → 22:51 | admitted 7.31; cells 6.95-11.25 |
| battery W·l | queued 22:51:24 at 9.92; **WebKit lock admitted 00:25:52 at 14.23 (wait 94.5 min, over 90: waited out, not cancelled)**; → 00:37 | cells 9.96-20.8 (with `fmlow`) |
| battery W·d | 00:37:10, lock at once, 11.47; → 00:49 | cells 7.62-16.84 (with `fmlow`) |
| `fmlow` light | try 1 DEFERRED at 16.03; try 2 **admitted at 15.00** (bound 15) | FM 13.83-15.0 |
| `fmlow` dark | try 1 **admitted at 14.94** | FM 8.32-14.97 |
| readings `rd` (A/B, sweep, probes), one slot per column | C·l 00:54 (14.45) · C·d 01:08 (12.02) · W·l 01:25 (14.58, lock at once) · W·d 01:42 (12.68, lock at once) → 01:54 | 7.38-17.35 |
| phase reads `ph`, one slot per column | C·l 01:54 (13.13) · C·d 02:23 (9.65) · W·l queued 02:51, **lock admitted 03:34 at 4.21** (43 min) · W·d 04:03 (6.65, at once) → 04:33 | 3.45-24.24 |
| heir probes, Chromium then one `--exclusive webkit` slot | → 04:35 | 7.53-10.35 |
| R2 W3 whole in Playwright WebKit, queued at load 10-15 | 04:36 → 04:46, four slots, each queued at 10.06-13.66, the lock at once | cells 7.92-17.51 |
| reversal stub A/B (`revstub/`) | 04:46 → 04:51, one Chromium slot (12.47) | 7.89-12.73 |

- Every run went through `guarded`; browser runs never `--light` (`--light` only for PR, which launches no browser); Playwright WebKit under `--exclusive webkit`, queued and never cancelled. One heavy run at a time: the chain is serial, and the seat ran nothing while a WebKit slot sat queued. No zone refusal. No WebKit page close (each witness and probe opens one browser and a fresh context per cell; the landed `launch()` retires the WebKit browser every 60 loads, logged twice in `rd`).
- **No slot read a cell above 31, so no slot was re-read.** The highest cell is 20.8 (W·l FM, the slot admitted at 14.23 and climbing). Each slot started at ≤ 20 and was read again at lock admission (W·l 14.23, W·d 11.47; `fmlow` per H8-2).
- One WebKit lock wait passed 90 min (W·l battery, 94.5 min). It was waited out, as the brief requires; the slot ran whole after it.
- One reading this seat queued and then withdrew before it started: a CASES `case·rotated` A/B, dropped once the digest showed that no row reads that cell (§1, red cells). It never reached a guard or a lock.

**Red cells** (each re-run twice in its slot, by the battery):

| cell | column | main | re-run 1 | re-run 2 | digest |
|---|---|---|---|---|---|
| CASES `case·rotated` [jerk 8.17 vs control 5.99 +1] | W·l | FAIL (13.01) | PASS (13.65) | FAIL (13.36) | **FAIL, outside the 38**: R7 reads that cell for `lanes` only, and REGISTRY §P5-8 to §P8-8 place `case·rotated` [jerk] outside the list. bp8 read it FAIL at 7.31 in pass 8 and 17.39 at 45 in the pass-8 proto |
| CASES `case·rotated` [jerk 6.42 vs 5.09 +1] | C·l | FAIL (7.94) | PASS (8.84) | PASS (8.53) | NOT-REPRODUCED, outside the 38 |
| W3 `retarget·40` [stub: "B" painted 89 % by a hard edge at 793.3 px, +42 ms] | W·d | FAIL (16.39) | PASS (14.34) | PASS (13.79) | NOT-REPRODUCED (P3, R6, B2) |
| FM `film·content-add` re-run 2 [stub: "s" 17 % at 994.1 px, +60.3 ms] | C·d | PASS (8.13) | PASS (8.69) | FAIL (7.93) | PASS by H7-3 (one failing re-run of a PASS main); one stub read in the column |

---

## 2 · The class the cure is for: the retarget splice

### 2.1 · The A/B (§P9-7.3 item 7, §P9-7.1)

W3 `retarget·40/80/120` alone, bp10 and bp8 alternating, 8 rounds, both themes and engines, each read started at load ≤ 11 after a wait of at most 180 s (`R/ab/`; summed by the builder's `absum.py`, `R/summary.txt`):

| engine | bp10 | bp8 | bp8 reads with a splice | load |
|---|---:|---:|---|---|
| Chromium | **0/48** | 0/48 | — | 8.5-12.67 |
| Playwright WebKit | **0/48** | **2/48** | W·l `retarget·80` r1, frame 9, 10.22 px (10.54); W·d `retarget·80` r7, frame 9, 10.24 px (10.96) | 8.48-15.72 |
| total | **0/96** | **2/96** | | |

**§P9-7.1's pass-level read does not fire: 0 splice reads at every `retarget` cell in every column on bp10.** 0 sliver reads on either build. Over the builder's and this seat's A/Bs: **bp10 0 of 192**, the §P9-7.3 target. bp8 reads 3 of 192 over both seats, 2.6 % against pass 9's critic, inside the class's rate.

### 2.2 · Every retarget phase, and a retarget of a retarget

The builder's `sweep.mjs` (W3's `retarget·N` cell with N swept; the landed `lib.mjs` reads), on bp10, per column (`R/sweep/`):

| sweep | reads per column | bp10 splice / sliver / blank / stub | load |
|---|---:|---|---|
| offsets the builder did not read: 42-198 ms at 4 ms, 4 runs | 160 | **0 / 0 / 0 / 2** (W·l +198 r3 at 8.99, W·d +94 r3 at 12.61) | 7.38-17.35 |
| the window at 1 ms: 44-100 ms, 2 runs | 114 | **0 / 0 / 0 / 0** | 3.88-16.85 |
| **a retarget of a retarget**: `long`, then `mid` at N, then `short` at N + D; N 40-120 at 8 ms, D ∈ {8, 16, 32, 48, 64}, 2 runs | 110 | **0 / 0 / 0 / 3** (C·d D 8 +56 at 8.76, D 16 +112 at 6.79; C·l D 64 +112 at 22.1) | 3.55-24.24 |
| **bp8 control** in the same slots: 44-92 ms at 4 ms, 2 runs; D 32 at 1 run | 26 + 11 | **15 / 1 / 0 / 0** (C·l 4 + 1 sliver, C·d 6, W·l 1, W·d 4; all `s1\|s4`, 7.36-10.33 px, retarget frame 7-11); D 32: 0 | 3.82-22.25 |

So on bp10: **0 splices in 1,536 swap reads** (640 + 456 + 440), with the instrument reading bp8's class in 15 of 104 control reads in the same slots. With the builder's 656, bp10 reads 0 in 2,192. The cure's window is the builder's 48-84 ms; at 1 ms steps there is no phase inside it where bp10 splices.

A retarget of a retarget reads no splice and no blank on bp10. bp8 reads 0 of 44 at D 32 too, so this seat did not find a double retarget that reaches the class on either build.

### 2.3 · Reversal and lead-remove phases beside it

`scripts/phase2.mjs` (this seat's; the landed `spliceRow`, `blankRow`, `stubRow`), bp10, 2 runs per point, per column (`R/ph/`):

| phase | scene | per column | bp10 splice / sliver / blank / stub (×4 columns) |
|---|---|---:|---|
| `rev-c`: expanded → collapse, expand at 5-95 % of the travel (W3 `reversal` is 35 %) | morph | 40 | 0 / 0 / 0 / **3** (C·d 0.85 r1 and 0.25 r2, "n" 63-70 % at 888 px, 6.1-6.5; W·d 0.05 r2 at 4.84) |
| `rev-e`: collapsed → expand, collapse at 5-95 % | morph | 40 | 0 / 0 / 0 / 0 |
| `lead-rm`: lead-remove, re-added 0-200 ms later | morph | 34 | 0 / 0 / 0 / 0 |
| `lead-ad`: lead-add, removed 0-200 ms later | morph | 34 | 0 / 0 / 0 / 0 |
| `rev-e`, `lead-rm`, `lead-ad` | vmorph | 40, 34, 34 | 0 / 0 / 0 / 0 |
| `rev-c` | vmorph | 40 | **97** / 0 / 0 / 0: the collapse's own splice, before the retarget (§5.1) |

Every reversal and lead phase on the horizontal scene reads no splice and no blank. The vertical collapse's red is not a retarget's: §5.1.

---

## 3 · B2: read on the strips and through H8-1

| column | FM reads | hole frames | runs over 1 | stub reads | H8-1 | load |
|---|---:|---:|---:|---:|---|---|
| C·l | 18 | 0 | 0 | 0 | **PASS** | 6.64-8.08 |
| C·d | 18 | 0 | 0 | 1 (`content-add` re-run 2, above) | **PASS** | 7.44-8.8 |
| W·l (battery + `fmlow`) | 36 | 0 | 0 | 0 | **PASS** | 13.83-20.8 |
| W·d (battery + `fmlow`) | 36 | 0 | 0 | 0 | **PASS** | 8.32-16.87 |

(`R/fm-reads.txt`, the pass-9 critic's `fmsum.mjs`; `film·hole·column` in `R/digest/`.) **0 hole frames in 108 reads,** including W·d `first-expand` at 8.32-16.87.

**The display-frame probe** (`R/si/`, the pass-8 critic's `slotink-crit.mjs` unchanged, bp10 and bp8 alternating, 3 runs per engine and theme; summed by the builder's `sisum.mjs`): **bp10 0 of 72 runs with an empty frame, bp8 0 of 72**, at 7.93-17.22. Lowest `minInk` at the exchange: bp10 0.251 (W·l `first-expand`, 8.25), bp8 0.218 (W·d `warm-expand`, 13.67).

**The strips, by eye** (`R/filmstrips/`; this seat read every `first-expand` and `swap-short` strip of all four columns, and `content-add`, `warm-collapse` beside them):

| strip | reading |
|---|---|
| **W·d `first-expand` main** | "H P" → "H P" (the WebKit paint hold, inked) → "H P 2 3 \| F" ×2 → "H P 2 3 \| Play Setting" → "H 1 2 3 \| Play Settings Squar". P is held until 1 has ink; no tile without ink at the slot |
| **W·d `first-expand` re-run 1** | "H P 2" ×2 → "H P 2 3 \| Play S" → **"H 1(faint) 2 3 \| Play Settings Sq"** for one 40 ms tile → "H 1 2 3". Faint, not empty: the pass-9 weakest tile, unchanged in kind |
| W·d `first-expand` re-run 2 | "H P 2 3" → "H P 2 3 \| Play Settings" → "H 1 2 3". Clean |
| C·l `first-expand` main | "H P" → "H P 2" → "H P 2 3 \| Play" → "H P 2 3 \| Play Setting" → "H 1 2 3 …". No faint tile |
| C·d `swap-short`, W·d `swap-short` | "C Tools Brushes Layers D" → "C ɔols Brushes Layers" → "C ɔols Brushes" → "A ı ꜱ B" / "A B Ɛ" (one tile of soft partials) → "A B". The §P6-2 class under the one-advance ramp; no hard cut inside the plate |
| C·d `content-add` re-run 2 (the stub read) | "Bru", "Brushes ar", "Brushes and lay" at the opening plate's edge for three tiles. The flagged "s" at 994 px sits at that edge's advance; by eye, the plate's edge taking the glyphs, the §P8-2 finding-4 class |
| W·l `warm-collapse` main | "H 1 2 3 \| Play Settings Square" → "… Sett" → "H 1 2 3 \|" → "H P 2" ×2 → "H P". The hold shows ink |

**B2 on the strips: PASS in all four columns.** Nothing read here differs in kind from pass 9; W·d `first-expand`'s faint "1" for one tile remains the weakest tile, inside H7-1's bound. The WebKit two-tile paint hold is present, each held tile with ink.

**`stub` per column (§P8-7.1's rule):** FM 0 / 1 / 0 / 0 in C·l / C·d / W·l / W·d; W3 0 / 0 / 0 / 1 (W·d `retarget·40`, NR). No column holds two stub reads at one slot. The rule does not fire.

---

## 4 · The rest of the attack

### 4.1 · R2's WebKit margin at load 10-15

Bound 0.5; the pass-9 critic's `r2sum.sh`, every W3 cell, main and re-runs (`R/r2-margins.txt`):

| read | C·l | C·d | W·l | W·d |
|---|---:|---:|---:|---:|
| this battery (worst, cell, seat, load) | **0.121** `warm-expand`, 8, 8.05 | **0.112** `swap-long`, 1, 8.28 | **0.088** `warm-expand`, 8, **12.42** | **0.102** `swap-short`, 3, **14.99** |
| W3 whole, Playwright WebKit, queued at load 10-15 (`R/r2/`) | — | — | 0.100 `swap-long`, 1 (9.49) · 0.115 `warm-expand`, 8 (12.79) | 0.095 `retarget·80`, 1 (8.22) · **0.088** `swap-short`, 3 (11.25) |
| builder (bp10) | 0.122 | 0.129 | 0.112 (7.43) | 0.102 (9.76) |
| pass-9 critic (bp8) | 0.119 | 0.128 | 0.057 (12.2) | 0.053 (13) |

This battery's WebKit W3 ran at 12.4-14.6 (main and re-runs), so the battery itself is the load-10-15 read the builder lacked. The four extra W3 runs read one red of their own, off the battery: W·l r1 `warm-expand` [window, lanes] (window 261 ms against 259.6, 9.97); the other W·l run passed it, and the battery's W·l `warm-expand` passed. It is this seat's instrument, so it turns no row, and it is recorded in §5.2. **R2 PASS ×4.** At the load where pass 9's critic read bp8 at 0.053-0.057, bp10 reads 0.088-0.102. The cure never sets back a leaving unit (it is `g = w.m.exit ? u : w`, and two leaving units are skipped), so it cannot spend this margin, and none is spent. The thin seat is still seat 8 on the heir's own cut at `warm-expand`.

### 4.2 · The heir, on `vmorph` `lead-remove` and on a constructed far side

**The instrument** (`R/heir/`; the builder's `heirprobe.mjs` on `bp10i`, and `scripts/fsheir.mjs`, the same probe on `bp10fsi` with the far-side sequences; both engines, 7.53-10.35):

| sequence | Chromium | Playwright WebKit |
|---|---|---|
| `vmorph` `lead-remove`, and its `wide` form | armed 1, **tied 0** | armed 1, **tied 0** |
| constructed far side `fs-to-three` (132 px tab → three 40 px icons) | armed 1: `WideTabF→D`, enter, **gated (de 40)** | the same |
| constructed `fs-to-one` (three icons → the tab) | armed 3: `D→WideTabF`, enter, **taken (de 0)** | the same |
| the 16 harness sequences | every tied unit arriving and taken; `swap-short` tied 1 (`C→A`), as the builder read | the same |

So `o.enter` holds: on both scenes that reach the gate, no hidden unit takes a gift, and on the constructed far side the heir is the arriving unit, gated where it should be (far side) and taken where it should be (same place, `de 0`).

**Paint** (`R/vl/`, `R/fs/`; the pass-9 critic's `slotink-axis.mjs`, bp10 and bp8 alternating, 3 runs per engine and theme):
- `vlead-remove` and `lead-remove`: longest empty run 0, `minInk` 1, in all 24 runs on each build (7.69-15).
- `fs-to-one`: no hole, 12 of 12 runs per build.
- `fs-to-three`: one flagged frame in every run on both builds, slot C at the trigger (−1.5 to +9 ms), before C begins its reveal. That is the pass-9 critic's `wide` attribution limit, equal on both builds, not the exchange.

**Reading.** The heir test lands as the header now states it, costs no row, and changes no paint on the far side or on `vmorph` `lead-remove`.

### 4.3 · The reversal stub (a reading; enters no row)

Three single stub reads in 160 bp10 `rev-c` reads: C·d at 0.85 r1 and 0.25 r2 ("n" in a tab, painted 63-70 % by a hard edge at 888-888.3 px, at 6.13-6.53), and W·d at 0.05 r2 (4.84). W3's own `reversal` cell (0.35) read PASS in all 4 battery columns. Read against bp8 at the phases around both (0.2, 0.25, 0.3, 0.8, 0.85, 0.9), Chromium, both themes, 4 runs per phase, alternating (`R/revstub/`, 7.89-12.73): **bp10 1 of 48, bp8 2 of 48** (bp10 C·l 0.2 at 10.83; bp8 C·l 0.25 at 8.49 and 0.85 at 11.23), 0 splices and 0 blanks on either. The reversal stub is a shared single-frame class of the base, not the cure's, at the rate of the battery's other lone stub reads. Not a row: no battery reversal cell read it.

### 4.4 · The header and the prose against the code

- **"Any two cut edges that face each other keep [the seam]"** (header, "The seam."). The pass's own comment adds "a unit going out is never held by it", and the code skips every pair of two leaving units: `(u.m.exit && w.m.exit) || … continue`. The builder's report states the exemption ("Two leaving units are left as they are: their fronts are the exchange's"); the header does not. §5.1 reads where that pair occurs.
- **The heir clause** is what `arm()` tests (`Math.abs(end) <= TOUCH_PX && o.enter`). Obligation 4 is met.
- **Obligation 5, by grep** (`grep -rnE 'H[0-9]+-[0-9]+|retarget·|W3 \`|ticking|harness|REGISTRY|§P[0-9]|\b(PF|S)-[0-9]+|Q-[0-9]+ \('` over `src/components/dock`, `src/styles`): `W3 \`ticking\`` is gone, and so are the seven REGISTRY citations. In the patch's added lines (`grep -nE '^\+.*\b(Q-[0-9]+|O-[0-9]+|F-[0-9]+|…)'`) one REGISTRY ruling id is left in B′'s own file: **`useDockScene.ts` "lands the episode in this frame (Q-18 (a))"** (patch line 3083), the same ruling the builder struck from `useDockBody.ts` as "§P4-6 Q-18 (a)". Also in added lines: `useDockBody.ts` "(O-64 R-3)", `controls.css` "(O-67)", `morph.css` "F-77", and test titles naming "O-91 C8" and "Q-18 (a)". Owner-ruling ids are not REGISTRY citations, so this seat lists them without ruling on them. The floor-v5 tags the builder listed (`layers.css:151`, `run.css:17`, `GlassDock.vue`, `constants.ts` …) are present as it says, in floor v5's lines.
- **PR 6/6** (`R/PR/PR.json`, 8.02): `prose·harness` 0, `prose·citations` 0, `prose·readers` 65 / 0 without a reader. N5 and B3 stand on the witness, as in pass 9.

### 4.5 · F7

**F7 13/13** (`R/F7/F7.json`, 9.12): typecheck, lib and demo builds, units 232 files / 2,241 tests / 0 failing, all ten gates, boot-graph build arm 3/3. **Margin 71 B**, equal to the builder's, down 108 B from bp8's 179 B: the scene chunk's +108 B. No raise and no split.

---

## 5 · Defect classes seen, for placing (no row minted)

### 5.1 · Two leaving units' cut edges inside one advance: the `vmorph` collapse

`phase2.mjs` on `vmorph` (the vertical morph scene), a plain collapse and the collapse before each `rev-c` retarget:

| build | reads | reads with a splice | units, gap | load |
|---|---:|---:|---|---|
| bp10 | 184 (160 `rev-c` incl. 8 plain, 24 plain) | **117** (97 + 20) | always `s2\|s3`, 9.53-10.35 px (bound 10.36), first splice 47-61 ms, **before the retarget in every read** | 3.45-16.59 |
| bp8 | 24 plain (+ 10 `rev-c` and 3 plain in `smoke/`) | 21 (+ 7 + 3) | `s2\|s3`, the same range | 6.06-9.44 |
| fv3 | 3 plain (`smoke/`) | 0 | — | 7.96-8.37 |

The frame (`R/ph/bp10-chromium-light-vmorph-rev-c.json`, 0.25 r1, 49 ms): seat 2 ("1") box y 397.79-437.79 paints 398.39-437.19, cut 0.6 px at both ends (the handoff closing it on its middle); seat 3 ("2") box 445.79-485.79 paints from 446.99, cut 1.2 px at its start. Both are leaving units. Their boxes stand 8 px apart, so any cut on both faces reads under one advance (10.86 − 0.5).

- **What it is.** B′'s own scene, read by the H4-1 splice law, on both bp8 and bp10. The cure leaves it because it skips a pair of two leaving units. The edges are cut 0.6-1.2 px inside 40 px icon boxes with a centred glyph, so no strip would show a false glyph; the law reads the cut edges, not the ink.
- **Why no row.** No H8 witness drives `vmorph` collapse with `spliceRow` (W3's morph sequences run on `morph`; `vmorph` appears only in W3's `vagree` screenshots and W1). A critic may not add rows. The horizontal `morph` collapse reads 0 splices in 160 `rev-c` reads.
- **For the agglomeration.** Either the header states what the code does (two leaving units keep no seam between them; their fronts are the exchange's), or the law covers a leaving pair. Which is right on the motion is the agglomeration's to rule; this seat only reads that the header and the code disagree, and where.

### 5.2 · The table

| class | where | note |
|---|---|---|
| the retarget splice (P3, R6 in pass 9) | §2 | **0 on bp10** in 96 A/B reads and 1,536 phase reads; bp8 2/96 and 15/104 in the same slots |
| header "any two cut edges … keep it" vs the leaving-pair exemption; `vmorph` collapse `s2\|s3` | §4.4, §5.1 | unwitnessed scene, bp8 and bp10 alike; header or law, the agglomeration's |
| `(Q-18 (a))` in an added line of `useDockScene.ts` | §4.4 | missed by PR; the builder's grep did not catch it |
| stub single reads off the battery's phases | §2.2, §2.3, §4.3 | 8 in 2,744 bp10 phase reads; at the reversal phases bp10 1/48, bp8 2/48 |
| W3 `retarget·40` [stub] W·d | §1 | NOT-REPRODUCED (16.39; re-runs 14.34, 13.79) |
| FM `content-add` [stub] C·d re-run 2 | §1, §3 | one read; the opening plate's edge by eye |
| CASES `case·rotated` [jerk] W·l FAIL, C·l NR | §1 | outside the 38, as passes 5-9 place it |
| R2 WebKit margin | §4.1 | 0.088 / 0.102 at 12.4-15, up from bp8's 0.057 / 0.053 |
| W·d `first-expand` faint "1" for one tile | §3 | as pass 9's weakest tile; inside H7-1's bound; the owner's glance |
| the WebKit two-tile paint hold | §3 | present, inked, harmless |
| boot-graph margin 71 B | §4.5 | the landing's F7 starts here |
| W3 `warm-expand` [window, lanes] W·l in one of two extra W3 runs (window 261 ms vs 259.6, 9.97) | §4.1 | off the battery; the battery's cell and the other extra run passed; this seat's instrument turns no row |
| a WebKit lock wait of 94.5 min | §1 | waited out |
| real Safari | every report | **UNMEASURED (owner's safaridriver checkbox)**; O-103: not granted |

---

## 6 · The 38 rows (ruled; default beside it)

From `R/digest/{table,rows,counts}-p10crit[-ruled].md` (`node harness/cells.mjs --build bp10=R --f7 bp10=R/F7/F7.json --pr bp10=R/PR/PR.json --tag p10crit [--ruled]`). P = PASS.

| row | C·l | C·d | W·l | W·d | ruled | default | note |
|---|---|---|---|---|---|---|---|
| P1 | 42/42 | 42/42 | 42/42 | 42/42 | PASS | OWNER-BLOCKED (Q-12) | |
| P2, P4, P5 | P | P | P | P | PASS ×3 | PASS ×3 | |
| P3 | 42/42 | 42/42 | 42/42 | 42/42, NR 1 | **PASS** | OWNER-BLOCKED (Q-4) | NR = W·d `retarget·40` [stub] |
| F1-F5 | P | P | P | P | PASS ×5 | PASS ×5 | |
| F6 | 163/163 | 151/151 | 169/169 | 157/157 | PASS | PASS | 0 crashes |
| F7 | source 13/13 | | | | PASS | PASS | 232 files, 2,241 tests (9.12) |
| N1-N5 | P | P | P | P | PASS ×5 | PASS ×5 | N5 with PR 4/4 |
| R1 | 32/32 | 30/30 | 32/32 | 30/30 | PASS | PASS | |
| R2 | 33/33 | 33/33 | 33/33 | 33/33 | PASS | PASS | margins §4.1 |
| R3 | 1/1 | 1/1 | 1/1 | 1/1 | PASS | PASS | |
| R4 | 5/5 | 5/5 | 5/5 | 5/5 | PASS | PASS | |
| R5 | 4/4 | 4/4 | 4/4 | 4/4 | PASS | PASS | |
| **R6** | 40/40 | 40/40 | 46/46 | 46/46, NR 1 | **PASS** | **PASS** | pass 9's open row; FM stub 0/1/0/0 |
| R7 | 35/35 | 33/33 | 35/35 | 33/33 | PASS | PASS | CASES `case·rotated` [jerk] not read by the row (`lanes` only) |
| R8 | 9/9 | 7/7 | 9/9 | 7/7 | PASS | PASS | none UNMEASURED |
| B1, B3 | P | P | P | P | PASS ×2 | PASS ×2 | PR 6/6 |
| B2 | 40/40 | 40/40 | 46/46 | 46/46, NR 1 | **PASS** | PASS | H8-1 and the strips, §3 |
| C1-C9 | P | P | P | P | PASS ×9 | PASS ×9 | |
| L1 | 6/6 | | 6/6 | | PASS | PASS | against `fv3` (7.56-20.22) |

**Counts: ruled 38/38, 36/36, 24/24. Default 36/38, 34/36, 22/24.** Every row verdict is the H8 digest's; this seat's instruments turned no row either way. Arm set as §P9-7.4: `theme` slots per engine and theme, FM's six B2 cells × 3, `fmlow` per WebKit theme, F7, PR, L1 against `fv3`.

**§P9-7.5's clean test, on this seat's reading:** 0 open rows of 38 on the ruled digest; B2 PASS on the strips; §P9-7.1's pass-level read does not fire (0 splice reads at any `retarget` cell of this seat's A/B); §P8-7.1's stub rule does not fire. Whether pass 10 counts 1 of 2 is the agglomeration's ruling.

---

## 7 · Fences, as kept

- **Worktree:** `.claude/worktrees/bl/D2/p10/Bp-crit/wt`, detached at `ebbf5bc75`. `node_modules` began as one symlink to the checkout's for the builds; before F7 it was replaced by a directory of per-package symlinks (so vitest's and vite's caches land in the tree, F7's own requirement). Checked at the end: no file under the checkout's `node_modules` (depth 2) is newer than this seat's start. The directory `.vite-temp` there changed mtime at 04:00, while this seat ran only Playwright probes and no vite, so that is another seat's. No `tests-visual/node_modules` exists in the checkout to link. Builds, vite caches and outputs under `Bp-crit/out/`. The instrumented trees were patched in the worktree copy for the build only and restored, `cmp`-checked equal (`apply.log`).
- **Scratch harness copy** (`Bp-crit/hfs/`, the pass-9 critic's `fs-scene.py`): its `lib.mjs` resolves the repo and the driver's `webkit-lock.mjs` by a path relative to its own depth, so in the copy only both were made absolute (`scripts/build-fs.sh`); the first fs builds failed on that and were rebuilt. The landed harness was not edited.
- **Git writes:** `worktree add` and `worktree remove --force` only. `git apply` ran only in the seat worktree.
- **Writes to the checkout:** this file and `pass-10/D2-Bp-crit-records/`. No source edit. Nothing under `~/.claude` was read; the guard was invoked, never read. Sibling repos were not read, built or run.
- **Machine law:** as §1. No headed, GPU-arg or real-Safari run; no browser MCP; one browser per run, a fresh context per cell, every page, context and browser closed in `finally`.
- **At the end:** the harness equals `pass-8/H8-records/harness.sha256` (`harness-check-end.txt`). The worktree is removed and `.claude/worktrees/bl/D2/p10/Bp-crit/` deleted.
