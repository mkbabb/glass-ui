# D2-B′ critique, pass 9: B2 holds, the retarget splice opens P3 and R6

| field | value |
|---|---|
| seat | D2 pass 9, fresh adversarial CRITIC of D2-B′ (§P8-7.4). Authored nothing in D2 and was no earlier D2 critic · model `claude-opus-5-5`, asserted from own system identity · one entry, 2026-10-30 12:15 → 18:40 |
| base | HEAD `9efc5784a`. Builds in the seat worktree: `bp8` = HEAD + `pass-6/floor-v5.patch` (`cba6bdc2…`) + `pass-9/D2-Bp-p9.patch` (**`dd5d9f5f59391b39957ebcc6d733dd3eb120067515bdb2c3f3d9e500a2038ec4`**, re-hashed, equal to the re-measure's); `bp7` = floor v5 + `pass-7/D2-Bp-proto.patch` (`184a9715…`); `fv5`; `fv3` (L1's reference); `bp8ref` = floor v5 + `b1ea7d86…` (scene and demo builds identical to `bp8`, `cmp-harness-builds.txt`). No floor v6, no merge into the base |
| built bytes | this seat's F7 tree hashes to the re-measure's manifests: `dist` `d31bc087…`, `dist-demo` `ae3f61a8…`. Boot graph 503,629 B against 503,808 B, **margin 179 B** (`F7-bp8/boot-graph.txt`) |
| harness | H8 unchanged. The per-file list equals `pass-8/H8-records/harness.sha256` line for line at this seat's start and end; hash **`9d12810bc24d91d2…`** |
| owner rulings | O-103: Q-4 (c), Q-12 (b), Q-18 (a), Q-15 (a). **The ruled digest is the score of record**, default beside it. O-87, O-88 bind |
| engines | Chromium (Playwright's default headless shell, no GPU args) and **Playwright WebKit**, unshimmed. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| records | `pass-9/D2-Bp-crit-records/seat-2/`. The files directly under `D2-Bp-crit-records/` are the partial records of the seat lost at the 2026-10-30 restart. They are no score; this seat reused its scripts (`seat-2/scripts/`, paths changed) and cites its reads once, as corroboration only (§2) |

Load is the 1-minute load average. "C" is Chromium, "W" Playwright WebKit, "·l / ·d" light / dark. `R` below is `seat-2/`.

---

## 0 · Verdict

| digest | 38 rows | first 36 | first 24 | open |
|---|---:|---:|---:|---|
| **ruled (O-103), B2 read on the strips too: the score of record** | **36/38** | **34/36** | **23/24** | **P3, R6** (C·d, W3 `retarget·80` [splice]) |
| default | 35/38 | 33/36 | 22/24 | P1 (OB), P3, R6 |

**Pass 9 is not clean on this seat's battery.** One cell reads FAIL under H6-7's rule: W3 `retarget·80`, C·d, check `splice`. Main FAIL at load 9.93, re-run 1 FAIL at 9.66, re-run 2 PASS at 9.21. A re-run reproduced it, at the lowest loads of the seat's battery, so neither the rule nor "a red seen only under load" reads it NOT-REPRODUCED. Under §P8-7.4 the count returns to 0 and pass 10 is a build pass with the list held fixed. That ruling is the agglomeration's; this seat only reports what the digest reads and may not rule a row PASS against its own instrument.

**The splice is not the handoff's** (§2). In an alternating A/B over all four columns, bp8 reads it in 3 of 96 reads and bp7 in 2 of 96. It is a pre-existing class, read as NOT-REPRODUCED in the H8 baseline and the re-measure, and this is a battery where it reproduced inside a slot.

The patch's own claim holds:
- **B2 PASS ×4.** H8-1 reads 0 hole runs over 1 frame in every column, and no strip read here shows an empty tile. The probe reads bp8 0 of 72 runs with an empty display frame, bp7 24 of 72.
- **The far-side case does not show the empty frame.** No demo route reaches it, and a true far-side built for the attack reads no hole at the exchange (§3).

Three smaller corrections to the record: "no harness geometry reaches it" is wrong by one scene hook (§3); "0 hole frames" no longer holds in W·d (§4); R2's WebKit margin read a new low of 0.053 at load 13 (§5).

---

## 1 · How this seat ran

| step | start → end | load (start / cells) |
|---|---|---|
| builds `fv3`, `fv5`, `bp7`, `bp8ref`, `bp8`; `bp8i` (instrumented) | 12:16 → 12:18 | 18.9-21.5 |
| far-side instrument, Chromium | 12:18 → 12:32 | 19.04 → 9.28 |
| PR (`--light`), F7 | 12:32 → 12:34 | 10.41 / 10.67 |
| battery C·l | 12:34 → 12:44 | admitted 10.38; cells 6.87-15.18 |
| battery C·d | 12:44 → 12:54 | admitted 7.39; cells 6.28-11.12 |
| battery W·l | 12:54 → 13:06 | admitted 10.13; cells 10.11-23.06 |
| battery W·d | 13:07 → 13:42 | admitted 19.52; cells 12.92-28.59 |
| `fmlow` light | queued 13:43; deferred at 15.90, 17.56, 17.06; a later queue **admitted at 12.44**, 18:20 | cells 8.46-12.33 |
| `fmlow` dark | deferred at 17.19, 15.73; **admitted at 10.62**, 15:45 | cells 9.88-16.5 |
| probe (`slotink-crit.mjs`, unchanged) | 15:45 → 17:17 | admissions 16.81, 12.75, 10.47, 10.08; **W·d lock wait 84 min** |
| cost, six rounds, each run started at ≤ 15 | 17:17 → 17:48 | cells 6.03-15.42 |
| attack extras, one Chromium slot and one `--exclusive webkit` slot | 17:49 → 18:16 | 4.7-14.5 |
| constructed far-side, Chromium then WebKit | 18:17 → 18:24 | 7.5-17.8 |

- Every run went through `guarded`, browser runs never `--light`, WebKit under `--exclusive webkit`, queued and never cancelled. No lock wait passed 90 min (longest 84). No zone refusal. No slot split. No slot ran a cell above 31, so no slot needed a re-read.
- **Two lapses, recorded.** (1) This seat stopped its first extras script (`extras2.sh`) in its first Chromium step, before any WebKit queue, and replaced it with `extras3.sh`, to merge seven lock queues into one. (2) The constructed far-side's first Chromium read (17:57-17:59) ran while the WebKit extras slot sat queued, and that slot was admitted at 17:59:20, so the two may have overlapped by under a minute. Neither run enters a row. The 128 px build read at that time missed the centre by 2 px, so it was discarded for the 132 px build (§3).
- **Scratch harness copy.** The constructed scene lives in a copy of the harness inside the seat worktree (`scripts/fs-scene.py`). The landed harness was not edited.

**Red cells** (each re-run twice in its slot):

| cell | column | main | re-run 1 | re-run 2 | digest |
|---|---|---|---|---|---:|
| W3 `retarget·80` [splice 1 frame at 191.6 ms: s1\|s4 at 9.6 / 9.55 px, one advance 10.86 px] | C·d | FAIL (9.93) | FAIL (9.66) | PASS (9.21) | **FAIL** (P3, R6) |
| ST `stall·2raf` [leap 225.5 px against 192.71] | W·l | FAIL (12.17) | PASS (11.73) | PASS (11.51) | NOT-REPRODUCED (R4) |
| FM `film·first-expand` ["no trigger marker", not measured] | W·l | PASS | PASS | FAIL (13.32) | PASS by H7-3 (one failing re-run of a PASS main) |

---

## 2 · The open rows: W3 `retarget·80` [splice]

**The read** (`R/battery/bp8-dark-W3-chromium{,-rerun1,-rerun2}.log`). Two painting units face each other with cut edges at a gap under one advance less 0.5 px (10.36 px here). It lasts one display frame. The two red reads are nearly the same trajectory: the same first splice time, gaps within 0.05 px, seat 1's ink `0.87 → 0.52 → 0.34` held for fifteen frames, retarget on frame 10. The passing re-run lands on frame 11 and takes another path (`0.87 → 0.81` held). So at that retarget phase the splice repeats; it is not noise within a phase.

**The digest:** `P3 dark C: FAIL 41/42`, `R6 dark C: FAIL 39/40` (`R/digest/rows-p9crit-ruled.md`). W·d, C·l and W·l read PASS on both rows.

**Is it load?** No. 9.66-9.93 sits at the bottom of this seat's battery range, and the A/B below reads it at 7-9.

**Is it the patch's?** No. W3 `retarget·40/80/120` alone, bp8 and bp7 alternating, 8 rounds, both themes, both engines (`R/extras/summary.txt`; 192 reads at 6.35-10.6):

| engine | bp8 | bp7 | reads with a splice |
|---|---:|---:|---|
| Chromium | 1/48 | 0/48 | bp8 d `retarget·120` 8.34 px (8.6) |
| Playwright WebKit | 2/48 | 2/48 | bp8 l `retarget·80` 10.19 and 10.05 px (8.97, 8.39); bp7 d `retarget·120` 7.44 px (8.66), l `retarget·120` 8.71 px (9.31) |
| total | **3/96** | **2/96** | |

The handoff's heir is armed in these sequences, so an effect was possible, but 3 against 2 cannot separate the builds.

**History of the class.**

| battery | cell | reads | digest |
|---|---|---|---|
| H8 baseline (bp7) | Playwright WebKit `retarget·80`, `retarget·120` | single reds | NOT-REPRODUCED |
| re-measure, pass 9 | C·l `retarget·40`, `retarget·80` | FAIL at 19.98, 20.22; re-runs PASS | NOT-REPRODUCED |
| lost seat, pass 9 (partial, no score) | W·l `retarget·80` | FAIL 18.34, FAIL 20.22, PASS 22.69 | it stopped before a digest; same pattern as below |
| **this seat** | C·d `retarget·80` | FAIL 9.93, FAIL 9.66, PASS 9.21 | **FAIL** |

- A/B rate about 2.6 % per read, at three cells per column-theme, means most batteries see no red or a lone one. A reproduction needs the same phase twice, and within a slot the phase repeats. Two of this pass's three batteries reproduced it.
- A class read in H8-1's form would not rescue the row: two reads at one key in one column reads FAIL there too. H8's column rule reads holes; `splice` keeps H6-7's per-check rule, and this pass makes no harness revision.

**Pointer for pass 10, nothing more.** The class is the retarget path, shared with bp7: a unit already moving keeps only `1.25` seams of room (`partial` in `arm()`), and a splice is a gap inside one advance. This seat built no cure.

---

## 3 · The far-side case

**The gate.** `const h = de > 0 ? undefined : heir` in `arm()`. A far-side geometry needs a leaving unit wider than its heir by at least two gaps and a pixel, centred on it within `TOUCH_PX` (0.5 px), with another non-leaving unit overlapping its far part. A same-size heir cannot have one: the next seat starts past the leaving unit's end.

**Reach, by instrument** (`bp8i`, one console line in `arm()`; `R/extras/fs/farside-chromium.{log,json}`, 19.04 → 9.28):

| where | armed exchanges read | gated |
|---|---|---:|
| harness scenes, every sequence (`morph` × 7 query variants, `vmorph` × 2, `form`, `swap` × 2) | all logged | **2: `vmorph` `lead-remove`, `vmorph?wide=1` `lead-remove`** |
| demo: `/dock/overview`, `/controls`, `/layers`, `/vertical`, `/dock-search`, `/sections`, `/overflow`, `/cta-receive`, `/feedback/progress`, `/display/dark-mode-toggle`, every dock hovered open and shut, layer tabs pressed | 17 armed, 3 with a heir | **0** |

**So §P8-2's "no harness geometry reaches it" is wrong by one scene hook.** The `vmorph` hook reaches it. No witness drives it: W3's `lead-remove` runs on `morph` only. There the heir is not arriving at all: it is the hidden collapsed face ("Play"), and the far-side unit is seat "1" sliding up (`ds 16, de 16, w 40`).

**No empty frame on it** (`R/extras/vl/`, `slotink-axis.mjs`: the critic's probe with the axis following the scene; bp8 and bp7, 3 runs, both engines and themes, 4.7-11.8): longest empty run 0 and `minInk` 1 in all 48 runs. Equal on both builds, as the gate makes it by construction.

**A true far-side, built to attack it** (scratch `swap?fs=1`, not landed, not a demo geometry): a 132 px tab centred on the middle of three 40 px icons. `to-three` reads `heir "D", ds 40, de 40, gated true` in both engines (`R/extras/fs2/check-*.log`). The probe, 3 runs per build, both themes (Chromium 13.2-17.8, WebKit 7.5-8):
- the exchange slot D falls to 0.25-0.38 at its lowest (bp8 0.27-0.38, bp7 0.25-0.36) and never empties;
- the only hole the probe flags is slot C on the frame at the trigger (+0 to +8 ms, longest 1), before C has begun its reveal, on both builds, with no leaving ink credited to that slot. It is the `wide` attribution limit, not the exchange.

**Reading.** §P8-8's "pass 7's empty frame returns there by construction" overstates: on the one true far-side this seat could build, the wide leaving unit's own ink covers the place and no empty frame appears. One construction does not cover every width.

**Consumers, from code (none run; value.js fenced, other siblings read-only).** The collapsed face is the producer's one-glyph summary, necked to a circle (`morph.css`, `.dock-layer--summary`): keyframes `ChromeDock`, fourier `CanvasControlsDock` and `EditorControlsDock`, value.js's seal, and fourier's `AnimationControls` readout, whose own comment states the 40 px square. So first-expand and collapse cannot reach it. What can is a layer swap whose wide seat lands by chance within 0.5 px of the centre of a narrower seat, with a neighbour overlapping it: `value.js/demo/shell/dock/Dock.vue` (four `DockLayer`s), `ActionBarLayer.vue` (`DockCrossfade`), fourier `EditorControlsDock`. Text widths are font metrics, so source cannot settle it. **UNMEASURED; no row.**

---

## 4 · B2: read on the strips and through H8-1

| column | reads | hole frames | runs over 1 | `stub` reads | H8-1 | load |
|---|---:|---:|---:|---:|---|---|
| C·l | 18 | 0 | 0 | 0 | **PASS** | 8.35-10.11 |
| C·d | 18 | 0 | 0 | 0 | **PASS** | 7.45-8.76 |
| W·l (battery + `fmlow`) | 36 (one not measured) | 0 | 0 | 0 | **PASS** | 8.46-15.67 |
| W·d (battery + `fmlow`) | 36 | **2** | 0 | 0 | **PASS** | 9.88-18.79 |

- **The two W·d hole frames** (`R/fm-reads.txt`): `first-expand` main, slot 2 at ink 0.074, +80 ms, load 18.79; re-run 2, 0.083, +120 ms, load 15.89. One cast frame each, inside the bound. Pass 8 read 0 of 108 and the re-measure 0 of 126, so "0 hole frames" is not a property of the build; "no run over one frame" is. Both reads fall at load above 15; the `fmlow` reads (9.88-16.5) read none.
- **The strips, by eye** (`R/filmstrips/`, 107 strips; the one not-measured read has none):

| strip | reading |
|---|---|
| W·d `first-expand` main, re-run 1, re-run 2 | "H P 2 3 \| Play" → "H 1(very faint) 2 3 \| Play Settings" → "H 1 2 3". P is gone and 1 barely inked for one 40 ms tile in all three. No tile without any ink at the slot, though main and re-run 2 sit under H7-1's 0.1 line |
| W·l `warm-expand` re-run 1 | "H P 2" held two tiles → "H P 2 3" → "H 1(fading in) 2 3" → "H 1 2 3" |
| W·l `warm-collapse` main | "H 1 2 3 \| Play Settings" → "H 1 2 3 \| Play" held two tiles → "H P(partly) 2 3" |
| W·d `warm-collapse` re-run 1 | "H 1 2 3 \|" → "H P 2" → "H P 2(cut at the edge)" |
| W·l `first-expand` `fmlow` r1 | "H P 2 3 \| Pl" held two tiles → "H P(fading) 2 3" → "H 1 2 3". The hold has ink |
| C·d `first-expand` main | "H P 2 3" → "H P(fading) 2 3 \| Play Settings" → "H 1 2 3". No faint tile |
| W·d `swap-short` main | "C Tools…" → "C ools…" → "C(fading) B(ghost) ls Bru" → "A B". Soft partials under the ramp, the §P6-2 class |

**B2 on the strips: PASS in all four columns.** Weakest tile: W·d `first-expand`, under the 0.1 line for one tile in 2 of 3 reads. That is within H7-1's bound of one frame, so this seat does not read it as a hole in the run. It is worth the owner's eye beside the §P6-6 glance.

**The WebKit paint hold:** still present (three strips above), each hold showing a tile with ink. Harmless, as pass 8 placed it.

**The `content-add` stub across columns: 0 stub reads in every column**, battery and `fmlow` (`R/fm-reads.txt`), and 0 of 40 in a dedicated A/B (`film·content-add`, bp8 and bp7 × 5 × 2 themes × 2 engines, 7.3-14.5). No slot in any column has two stub reads, so §P8-7.1's re-cut condition does not fire. It did not appear in this seat at all.

**The display-frame probe** (`R/si/summary.txt`): bp8 **0 of 72** runs with an empty frame, bp7 **24 of 72**, in the same guarded runs at 10.3-17.2. bp8's lowest `minInk` at the exchange is 0.212 (W·l `first-expand`, 12.1), inside the re-measure's 0.199-0.475 and pass 8's 0.275-0.499. bp7 reads 0.000-0.061.

Paint and DOM disagree by a little in W·d: the DOM read never falls under 0.212 while the cast twice reads 0.07-0.08. This seat did not chase why (video scale, shift up to 10.81 px on that frame, or the WebKit paint lag). The digest reads the cast.

---

## 5 · R2's WebKit margin, under a moderate load

Bound 0.5; `scripts/r2sum.sh`, every W3 cell, main and re-runs.

| read | C·l | C·d | W·l | W·d |
|---|---:|---:|---:|---:|
| this battery (worst, cell, seat, load) | **0.119** `swap-short`, 3, 9.73 | **0.128** `warm-collapse`, 2, 6.28 | **0.057** `warm-expand`, 8, 12.2 | **0.053** `swap-short`, 3, 13 |
| W3 whole, twice per theme, no load gate (`R/extras/w3/`) | — | — | 0.089 (7.5), 0.075 (9.01), both `first-expand` seat 8 | 0.101 (6.19), 0.116 (11.26) |
| pass 8 / re-measure | 0.122 / 0.118 | 0.131 / 0.104 | 0.088 / 0.100 | 0.075 / 0.102 |

**R2 PASS ×4, and 0.053 is the thinnest any seat has read on B′.** Margins in WebKit run thinner at 12-13 than at 6-11, on a small sample, and pass 8's prototype went over the bound at 38-46. Seat 8 at `first-expand` / `warm-expand` is the heir's own cut. No row opens.

---

## 6 · The 38 rows (ruled; default beside it)

From `R/digest/{table,rows,counts}-p9crit[-ruled].md`: **671 cells**. Ruled: 645 PASS, **1 FAIL**, 1 NOT-REPRODUCED, 12 UNMEASURED (W8 `consumer·*`: the value.js fence and headed real-GPU runs, as every pass), 12 RECORD. Default: 611 PASS, 34 OWNER-BLOCKED, 1 FAIL, 1 NR, 12 UM, 12 RECORD. P = PASS.

| row | C·l | C·d | W·l | W·d | ruled | default | note |
|---|---|---|---|---|---|---|---|
| P1 | 42/42 | 42/42 | 42/42 | 42/42 | PASS | OWNER-BLOCKED (Q-12) | |
| P2, P4, P5 | P | P | P | P | PASS ×3 | PASS ×3 | |
| **P3** | 42/42 | **41/42** | 42/42 | 42/42 | **FAIL** | **FAIL** | C·d `retarget·80` [splice]; 34 OB cells read PASS on Q-4 (c) |
| F1-F5 | P | P | P | P | PASS ×5 | PASS ×5 | |
| F6 | 163/163 | 151/151 | 169/169 | 157/157 | PASS | PASS | 0 crashes; no WebKit page close |
| F7 | source 13/13 | | | | PASS | PASS | 232 files, 2,241 tests, 0 failing (10.67) |
| N1-N5 | P | P | P | P | PASS ×5 | PASS ×5 | N5 with PR 4/4 |
| R1 | 32/32 | 30/30 | 32/32 | 30/30 | PASS | PASS | |
| R2 | 33/33 | 33/33 | 33/33 | 33/33 | PASS | PASS | margins §5 |
| R3, R5, R7 | P | P | P | P | PASS ×3 | PASS ×3 | |
| R4 | 5/5 | 5/5 | 5/5, NR 1 | 5/5 | PASS | PASS | NR = `stall·2raf` [leap] |
| **R6** | 40/40 | **39/40** | 46/46 | 46/46 | **FAIL** | **FAIL** | the same cell |
| R8 | 9/9 | 7/7 | 9/9 | 7/7 | PASS | PASS | none UNMEASURED: §7 |
| B1, B3 | P | P | P | P | PASS ×2 | PASS ×2 | PR 6/6 |
| B2 | 40/40 | 40/40 | 46/46 | 46/46 | PASS | PASS | §4 |
| C1-C9 | P | P | P | P | PASS ×9 | PASS ×9 | C8, C9 ×4 |
| L1 | 6/6 | | 6/6 | | PASS | PASS | against `fv3` |

**Counts: ruled 36/38, 34/36, 23/24. Default 35/38, 33/36, 22/24.** Every row verdict is the H8 digest's. The strip read agrees with it on B2. The probes, A/B and instrument enter no row, and none was used to turn a red.

Arm set identical to pass 8's by construction: `theme` slots per engine and theme, FM's six B2 cells × 3, `fmlow` per WebKit theme, F7, PR, L1 against `fv3`.

---

## 7 · The rest of the attack

**The header against the code.**
- The new clause states `de > 0 ? undefined : heir` correctly. **Obligation 4's one clause is met.**
- The header still says "Where a unit comes in on the very place a unit leaves". `arm()` takes as heir any unit that is not leaving (`if (o === m || o.exit) continue`), with no test that it is coming in or painting. Seen: `vmorph` `lead-remove` (the hidden collapsed face) and the constructed `to-one` (the hidden summary), both gated off by a far-side unit. If the far side is empty and the heir hidden, the leaving unit would take the close-on-the-middle path with no unit taking the gift. No instrumented sequence reached that; it would be a different wipe, not an empty slot. An `o.enter` test is a code change, so it is for the build pass. Recorded.
- "Every frame of the exchange shows one of the two on that place": true on the DOM read (0.212 and up), and near but under 0.1 in two W·d cast frames (§4).
- **Harness id in `src/`:** `src/components/dock/composables/useDockContent.ts`, "(W3 \`ticking\`: …", which PR's regex misses, as the re-measure said. Also seven "REGISTRY …" citations in added lines that `prose·citations` does not count (patch lines 1018, 1028, 1811, 3878, 3980, 4715, 4793). PR reads 6/6, so N5 and B3 stand on the witness; obligation 4's "no harness id in `src/`" is literally short by that one. Recorded for the landing.

**The 4×20 expand trigger frame** (`R/cost/rows.txt`; bp8 → bp7 → fv5, six rounds, each started ≤ 15; frames over 25 ms / worst ms (load)):

| row | bp8 r1-r6 | bp7 r1-r6 | fv5 |
|---|---|---|---|
| **4× expand, 20 seats** | 0/23.6 (13.18) · 0/24.6 (7.49) · 1/41.1 (6.33) · 0/23.8 (10.22) · 1/28.4 (7.38) · 1/29.5 (9.54) | 1/29.3 (10.02) · 0/20.7 (8.02) · 1/32.2 (8.73) · 1/28.4 (8.87) · 1/27.2 (10.2) · 1/36.7 (14.34) | 0 ×6, 11.3-16.2 |
| 4× expand, 40 seats | 5 of 6 | 6 of 6 | 2 of 6 |
| 4× lead, 20 seats | 0 of 6 | 2 of 6 | 0 |
| 4× lead, 40 seats | 6 of 6 | 5 of 6 | 0 |
| **sum over the four rows** | **14** | **18** | 2 |
| main-thread ms per frame, 4×20 expand | 0.716-1.137 | 0.927-1.221 | 1.505-2.034 |

**The lean does not hold.** This session reads bp8 3 of 6, bp7 5 of 6. Over all sessions (two in pass 8, the re-measure, this seat): **bp8 9 of 18, bp7 7 of 18**. Pass 8's 4 of 6 against 1 of 6 was noise at the threshold. Obligation 3's cost clause reads as met on the read of more samples; Q-15 (a) holds; not a row.

**The WebKit ST `stall·nb·*` UNMEASURED of the re-measure did not recur.** All ten cells read measured and PASS here (video scale 1.002). The re-measure's 5 px and 0.982 scale, 20 of 20 in its session, is the cast's state in that session (the class H6-4 names), not the build: the bytes are equal.

**Boot graph:** 179 B of margin, unchanged. The landing's F7 owns it.

---

## 8 · Defect classes seen, for placing (no row minted)

| class | where | note |
|---|---|---|
| **W3 `retarget·*` [splice], reproduced in a slot, C·d** | §2 | **opens P3, R6.** Not the patch's (bp8 3/96, bp7 2/96), not load (9.66-9.93). The class the H8 baseline and the re-measure saw only as NOT-REPRODUCED |
| §P8-2 "no harness geometry reaches it" | §3 | `vmorph` `lead-remove` reaches the gate; no witness drives it; no empty frame |
| §P8-8 "pass 7's empty frame returns by construction" | §3 | not on the one true far-side built here |
| the heir can be a hidden unit | §7 | `arm()` has no `o.enter` test; recorded for the build pass |
| W·d `first-expand` single hole frames, 0.074 and 0.083 | §4 | inside H7-1's bound; both at load above 15; the DOM probe never reads under 0.212 |
| R2 WebKit margin 0.053 | §5 | the thinnest on B′; inside the bound |
| `W3 \`ticking\`` and REGISTRY citations in `src/` | §7 | missed by PR; landing |
| ST `stall·2raf` [leap] W·l, FM "no trigger marker" W·l | §1 | NOT-REPRODUCED / one unmeasured re-run |
| `fmlow` deferrals: 3 in light, 2 in dark | §1 | H8-2 working; light took a fourth queue |
| 4×20 expand trigger frame | §7 | closed as noise: bp8 9/18, bp7 7/18 |
| real Safari | every report | **UNMEASURED (owner's safaridriver checkbox)**; O-103: not granted |

---

## 9 · Fences, as kept

- **Worktree:** `.claude/worktrees/bl/D2/p9/Bp-crit/wt`, detached at HEAD; `node_modules` a directory of per-package symlinks; no `tests-visual/node_modules` exists to link. Builds and outputs under the seat directory. Instrumentation went into the worktree's copy only, restored and `cmp`-checked equal each time (`build-bp8i.log`, `extras/fs/build*.log`).
- **Git writes:** `worktree add` and `worktree remove --force` only.
- **Writes to the checkout:** this file and `D2-Bp-crit-records/seat-2/`. The lost seat's records were left as committed. No source edit. Nothing under `~/.claude` was read (the guard was invoked, never read). Sibling repos were read, none built or run.
- **Machine law:** as §1, with its two lapses. No headed, GPU-arg or real-Safari run; no browser MCP; one browser per run, a fresh context per cell.
- **Harness at the end:** equal to `pass-8/H8-records/harness.sha256`, `9d12810b…`.
