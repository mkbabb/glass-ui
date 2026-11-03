# D2 · pass 12 · D2-B′ build (`bp12`)

| field | value |
|---|---|
| seat | D2 pass-12 BUILDER of D2-B′ (REGISTRY §P11-7.3). Authored nothing in D2 passes 10 or 11 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | built on `967a86972`. HEAD moved to `c18f8ad2d` during the seat, docs only: none of the 485 paths it changed is in the patch or in floor v5 |
| spec | REGISTRY §P11-7 (from line 3079), items 1-6 |
| patch | `pass-12/D2-Bp-p12.patch`, sha256 **`5318a3dcefdb9ca86337b780ff35784a82291f9108953098b950905e8696cff7`**, 62 files, +2,518 / −2,411, over HEAD + floor v5 (`cba6bdc2…`). It differs from `pass-11/D2-Bp-p11.patch` (`b5d5c9db…`) only in `src/components/dock/composables/useDockScene.ts`. `mkpatch.sh` applied it to a plain HEAD + fv5 copy and found that tree equal to the worktree's. At the end `git apply -R --check` was clean in the worktree |
| harness | H8 as landed, unchanged. 42 files OK against `pass-8/H8-records/harness.sha256`, list hash `9d12810bc24d91d2`, at the start (`harness-check-start.txt`) and at the end (`harness-check-end.txt`) |
| engines | every WebKit number is **Playwright WebKit**, unshimmed. Real Safari is **UNMEASURED (owner's safaridriver checkbox)** |
| rows | **this seat scores no row.** The digest's tables are kept in `D2-Bp-build-records/digest/` for the critic |
| stop | **the guard reported ZONE-ARMED** (armed 20:28:52, seen 21:09). Every run was stopped. What ran and what did not is in §7 |

Records: `pass-12/D2-Bp-build-records/` (strips and JSON, no video). Short names: `bp10` = HEAD + fv5 + p11 (`b5d5c9db…`); `bp8` = HEAD + fv5 + `pass-9/D2-Bp-p9.patch` (`dd5d9f5f…`); `fv3` = HEAD + `pass-4/floor-v3.patch`; `fv5` = HEAD + floor v5; `bp12` = HEAD + fv5 + p12. Suffixes mark diagnosis builds that never land: `t` (lane trace: `lanetrace.py`), `c` (`t` + every check()'s take records: `checktrace.py`), `u` (unit state: `lanetrace.py --units`), `i` (the pass-10 heir probe). `bp12v1*` is an earlier bp12 draft, superseded (§2.3).

---

## 0 · In brief

1. **The window tail is a second episode, not a late lane.** The trace answers item 1's three questions (§1). The episode lands, and the flag closes on its landing frame. Then the check that the episode's own end sets off (the content-remove clone leaving the DOM) opens a second window. That window carries one lane of about 0.47 px on the `Settings` cell, and it paints that translate. The cell was hovered at the trigger (its own `scale` 1.1 about its centre), so the left-edge fraction read −4.8 px (Chromium −3.825), outside the rounding. The model therefore fell back to the whole-px offset. At the end check the cell is unhovered, and the fraction is read. In Playwright WebKit that fraction is exactly 0.5 (230.5 against 231), and its reach is just over `LAND_PX`, so a window opens. In Chromium the cell sits at 230.484, the reach is under `LAND_PX`, and the check seats without opening one. Neither the step time nor the order of box delivery is involved.
2. **The cure is a law, and no constant moved.** The sub-pixel read takes the painted **centre** in place of the left edge. A box's own scale or rotate about its centre does not move its centre, so a box that has not moved reads the same place at every check, and an episode's end cannot start another. On the content-remove A/B, bp12 reads **0 late in 32** in all four columns, with gaps of 0 or one in-band frame. The model read (chk) gives bp12c 0 late in 16 against bp10c 3 late in 16. Rule (c) does not fire on any read taken (§2.1, §5).
3. **B2: the scene did write both units to almost no ink at the place, and the cure makes that frame impossible.** Every cast hole frame (seat 2 at +120 ms) pairs with the scene's gift frame at +131-135 ms. On that frame P paints nothing, and "1" takes only the gift, about 2 px, under its own seam ramp. Its ink at the place is 0.036-0.083. In the cure, a unit closing on its heir keeps full ink to its middle, and the arriving unit takes the gift at full ink, with its ramp beyond it. On the WebKit A/B, bp12u's least ink at the place is 0.417-0.669, always on a pre-cut frame. bp10u's is 0.035-0.437, with 1-2 reads per column under 0.1, and those are gift frames. FM `film·warm-expand` / `first-expand`: bp12 0 hole reads in 32, bp10 2 in 32 (§3).
4. **Held:** the splice is 0 of 96 on the A/B. The heir holds in both engines. No ink is short at the leaving pair (24 frozen reads). **Two thin readings for the critic.**
   - **R2's W·l margin read 0.024** in the battery: `warm-expand`, seat 8, load 10.76. That is thinner than any bp10 read so far (0.028), and on another seat than pass 11's thin seat. On the A/B, bp12's seat-8 `warm-expand` drop reads 0.443-0.476 against bp10's 0.430-0.454. Whether the heir's held ink spends the margin is not settled at this sample (§4.4).
   - **The boot graph's margin is 21 B** (71 B at bp10). The cure costs 50 B gzip in the scene chunk, and no offsetting bytes were found (§4.5).
5. **CASES `case·rotated` / `·control` read FAIL in W·l, 3 of 3 [snap 0.63-0.64 px].** The diagnosis shows the base's landing step, independent of the cure: bp10c 8 of 12 against bp12c 6 of 12 at host rotate(0deg). The cells sit outside the 38; R7 reads only their `lanes` check. The class is placed for the agglomeration, not cured (§6).
6. **Not done, because of the zone stop:**
   - the two re-runs of three A/B reds: bp12 W·l `content-remove` [trajectory], and `retarget·40` / `retarget·120` [stub];
   - the re-read of the W·l battery slot, whose cells ran up to 33.37 (§7).

---

## 1 · The cause of the window tail (item 1)

**Instrument.** `lanetrace.py` adds the pass-10 `instrument.py` fields to the scene and the body. Per frame it records the rAF timestamp, every lane's `moving`, `landed`, value and velocity, the extent's painted box (`Pr`), and the frame on which `setWindow` writes. `lanes.mjs` drives W3's own morph and swap sequences under W3's own strip log, and reads each cell's open, land and close with `lib.mjs analyseMorph`, unchanged. `checktrace.py` adds, at every check(), each mover's model position before and after, the whole-px offsets, the left-edge fraction, `:hover`, the computed scale, `offsetLeft` and the painted width (`lanes2.mjs` keeps them). The builds ran bp10t and bp8t alternating: 8 rounds per Playwright WebKit theme (slot admitted 14:34:13 after a 63-min lock wait, loads 5.83-11.0), and 3 rounds per Chromium theme. Per-read detail: `trace/trsum-webkit-detail.txt`.

**Content-remove gaps (ms from landing to close; late means over 2F + 0.5 on the read's F):**

| column | bp10t | late | bp8t | late |
|---|---|---:|---|---:|
| W·d | 32, 16, 34, 48, 34, 0, 0, 30 | 1 | 0, 16, 0, 35, 16, 33, 32, 33 | 1 |
| W·l | 0, 35, 51, 0, 16, 31, 0, 30 | 2 | 33, 0, 0, 34, 34, 33, 50, 0 | 1 |
| C·l, C·d | 0 ×6 | 0 | 0 ×6 | 0 |

In 19 of the 32 WebKit reads the flag closes and then opens again. The other non-zero reads are 16 ms: the extent's one in-band frame before its seat.

**The three questions.**
1. *Which lane still moves.* In every late read no lane is moving on the landing frame, and the scene writes the flag down on it (`wins`: open false at the landing). One or two frames later a second window opens on the check that the content observer fires when the leaving clone leaves the DOM. It carries a single lane: `Settings@2.lx` at 0.469-0.484 px, already in band (`landed`) on its first step. It seats on the next frame and the window closes. The 48-51 ms reads add the extent's own in-band frame before its seat.
2. *Whether those frames paint motion.* Yes. The witness reads a 0.47-0.48 px translate written on `Settings`, then cleared (`paint 6:tr 0.47`). So the second window is not a flag held over still frames. It is a real sub-pixel move the scene made because its model of a box that never moved changed.
3. *Why Chromium lands it on the extent's frame.* It does not; Chromium never opens the second window. `checktrace` at the trigger: `Settings` is under the pointer, `scale` 1.1 about its centre (the seat's engagement), so its painted left edge sits 4.8 px (Chromium 3.825 px) left of layout. The fraction is outside `OFFSET_ROUNDING_PX`, so it is rejected, and the model takes the whole-px offset. At the end check the pointer has left (the cell moved under it), the fraction is accepted, and the model moves to the exact place:

| engine | offsetLeft | exact place | model at trigger → end check | reach at the end check | result |
|---|---:|---:|---|---:|---|
| Playwright WebKit | 231 | 230.5 | 231 → 230.5 | 0.5 + float noise > `LAND_PX` | a window opens, 0.47-0.48 px painted |
| Chromium | 230 | 230.484 | 230 → 230.484 | 0.484 ≤ `LAND_PX` | seats quietly, nothing written |

The step time is not involved: the late reads' frame intervals are 14-19 ms like the clean ones. The delivery order is not involved either: the second window opens on a separate check, after the first has closed.

**Siblings** (`content-add`, `lead-*`, `swap-*`, `warm-*`, the same trace and rounds; `trace/trsum-webkit.txt`): every gap is 0 or one frame (13-19 ms), and no read is late. The one-frame reads are the extent's in-band frame followed by its seat. No sibling read opens a second window. `lead-*` reads one frame in every round in both builds. That frame is the in-band step of the extent and its movers (`edge.l` 0.29-0.33 px, then seated), which paints motion inside the window.

---

## 2 · The cures (items 2, 3, 5)

All three edits are in `useDockScene.ts`. `LAND_PX`, `SEAM_SLACK_PX`, `TOUCH_PX`, `REVEAL_GAIN`, `OFFSET_ROUNDING_PX` and every bound are unchanged.

### 2.1 · The window: painted centres

```ts
const fine = (el: HTMLElement, frame: HTMLElement, at: V, s: Size, edge: boolean): V => {
    const a = rectOf(el); const f = rectOf(frame); const w = movers.get(el)?.wrote;
    const fx = ((a.left + a.right) / 2 - f.left) / sx - s.w / 2 - (w?.x ?? 0) - (edge ? frame.clientLeft : 0) - at.x;
    const fy = ((a.top + a.bottom) / 2 - f.top) / sy - s.h / 2 - (w?.y ?? 0) - (edge ? frame.clientTop : 0) - at.y;
```

`take()` reads `sizeOf(el)` before `fine()`. The law: a box's model place is its laid-out place, read from the painted centre less half its layout size. Its own scale or rotate about its centre moves the corners and not the centre, so an engaged seat reads where it is laid out. A box that has not moved then reads the same place at every check, and the end of an episode never starts another. This is not a flag closed early: the second window is gone because the scene no longer moves a box that has not moved, and nothing that moves is left outside a window. On bp12c in WebKit the hovered read gives 230.511, inside the rounding. The end check's reach is 0.011, and no lane opens. On bp12c in Chromium the cell reads 230.484 at every check.

### 2.2 · B2: the gift at full ink

The leaving unit going to an heir has its seam ramps rise to full by its middle. Before, they ran over `m.seam` from each cut edge, and that dimmed the middle of a narrow unit:

```ts
const q = Math.min(m.seam, (a1 - a0) / 2);
const k = (m.exit?.heir && q) || m.seam;
const at = [a0, a0 + q, a1 - q, a1];
const alpha = (x: number): number => clamp01(Math.min(cs ? (x - a0) / k : 1, ce ? (a1 - x) / k : 1));
```

The arriving unit's reveal limiter now takes the gift together with its own seam ramp beyond it. On the frame it is given the place, it paints that place at full ink:

```ts
cs = Math.max(cs, Math.min(r.s - (…), g0 - m.seam - box.lo));
ce = Math.max(ce, Math.min(r.e - (…), box.hi - g1 - m.seam));
```

The `|| m.seam` keeps the divisor non-zero on a span of 0 (an early draft wrote a NaN alpha there).

### 2.3 · The draft that did not cure B2

The first bp12 (`bp12v1`) changed only the pre-cut ramps. In fmtrace it still read a cast hole frame: W·d `warm-expand`, 1 read, scene ink 0.036 on the gift frame. Its records stay in `fmt/` and `chk/` as `bp12v1*`. Its F7 and PR reads are in `F7/first-read/` and `PR/first-read/` (F7 13/13, PR 6/6, boot margin 35 B). The final bp12 is the tree in §2.1-§2.2. Every battery and A/B reading below is of that tree (built 17:05; scene chunk 21,483 B).

### 2.4 · Prose

- **The header.**
  - "The model" says painted centres, and that a box's own scale about its centre moves the model not at all.
  - "The handoff" says the leaving unit's ramps rise to full by its middle, and the arriving unit takes the given part "at full ink (its own seam ramp falls beyond that part, where nothing paints)".
  - "The window" adds: "An episode lands once: the check its own end sets off (a clone leaving the DOM) reads every box that has not moved where the model has it, so it opens no second window."
- **The limiter's comment** says "its seam ramp beyond it, so the place paints at full ink and is never left to no unit".
- **The sub-pixel comment** is rewritten for centres.
- **The facing-pair comment** (item 5) now states the exemption as the header does: "Two cut edges that face each other keep the seam, whatever cut them, unless both units are going out: their fronts are the exchange's. …".
- **No ids.** A sweep of the 43 added lines finds no REGISTRY or harness id. `N-1`, `N-2`, `N-3` and the test-side harness reference stay for the landing's sweep; the cure rewrote none of their lines.

---

## 3 · The B2 paint hole (item 3)

**Instrument.** `fmtrace.mjs` runs `film·warm-expand` and `film·first-expand` with the FM cast (`lib.mjs holePaint`, as FM reads it). Beside the cast it records the scene's per-frame state for the slot's leaving and arriving units: opacity, clip, mask stops, the reveal limiter, the gift and the exit path. From these it computes each unit's ink-weighted painted share at the place, using the mask's alpha over a canvas column profile of the glyph.

**Before the cure** (10 rounds per WebKit theme per build, `fmt/fmtsum.txt`):

| build | W·d warm-expand: cast hole reads / scene reads < 0.1 / least ink | W·d first-expand | W·l warm-expand | W·l first-expand |
|---|---|---|---|---|
| bp10u | 2 / 2 / 0.042 | 0 / 0 / 0.217 | 0 / 0 / 0.101 | 0 / 3 / 0.045 |
| bp8u | 0 / 1 / 0.059 | 0 / 1 / 0.086 | 0 / 1 / 0.044 | 0 / 2 / 0.048 |

The pairing: each cast hole frame (seat 2, +120 ms, ink 0) is the scene's frame at +131-135 ms, the **gift** frame. On it the leaving P is cut below its seam and paints nothing. The arriving "1" takes only the gift, about 2 px, so its own start ramp runs across its glyph. Its ink-weighted share at the place is 0.036-0.083. So the scene does write both units to almost no ink there, while the DOM's per-rAF read sees a unit "present". It is the gift frame in every under-0.1 read but one (bp10u W·l `first-expand`, a pre-cut frame at 0.373, which is not under 0.1).

**fmx** (`film.mjs` as landed, bp10 against bp8 alternating, 10 rounds per WebKit theme; `fmx/fmxsum.txt`): bp8 W·d `warm-expand` r5 has a hole at seat 2, ink 0, at +120 ms, a run of 2 frames, load 7.62. Every other read is 0: bp10 0 of 40, bp8 1 of 40.

**After the cure** (the A/B in the att slots, bp12u against bp10u alternating, 8 rounds per WebKit theme; `sum/fmt12sum.txt`):

| column | bp12u least place ink per cell (range of 8) | bp12u frames < 0.1 | bp10u least | bp10u reads < 0.1 | load |
|---|---|---:|---|---:|---|
| W·l warm-expand | 0.475-0.669, all pre-cut | 0 | 0.078-0.437 | 1 | 10.09-24.41 |
| W·l first-expand | 0.551-0.661, all pre-cut | 0 | 0.144-0.399 | 0 | 10.09-24.41 |
| W·d warm-expand | 0.474-0.660, all pre-cut | 0 | 0.035-0.381 | 1 | 7.0-15.6 |
| W·d first-expand | 0.417-0.621, all pre-cut | 0 | 0.053-0.455 | 2 | 7.0-15.6 |

On bp12u the least-ink frame moves from the gift frame to a frame before the cut, where P still paints. The FM A/B (`film.mjs`, 8 rounds, `sum/fmabsum.txt`): bp12 has 0 hole reads in 32, bp10 has 2 in 32 (W·l `first-expand` r4, seat 2, ink 0.062, +120 ms, load 27.93; W·l `warm-expand` r2, seat 2, 0.042, +120 ms, 16.63). The display-frame probe (3 rounds, all four columns, `sum/sisum.txt`) reads 0 of 72 runs with an empty frame on both builds; lowest minInk is bp12 0.396 (W·d `swap-long`), bp10 0.153 (W·l `first-expand`).

**The strips, by eye.** Every bp12 WebKit `warm-expand` and `first-expand` strip, battery, fmlow and FM A/B alike, shows "P" at full ink in slot 2 and then "1", with no empty tile. The one hole the battery's FM reads (W·d fmlow r3 `warm-collapse`, slot 5, one frame, ink 0.071, +0 ms, load 10.17) is another slot and cell. On the strip, the first collapse tile shows the far seat ("Square") cut away by the closing plate. That is the class pass 11's re-measure read at the same cell (ink 0.085). It is one read, NOT-REPRODUCED under H8-1. The row is not turned either way.

---

## 4 · What is held (item 4)

### 4.1 · The retarget splice

A/B, bp12 and bp10 alternating, 8 rounds, `retarget·40/80/120` (`sum/absum.txt`):

| column | bp12 splice / sliver | bp10 splice / sliver | other reds | load |
|---|---|---|---|---|
| C·l | 0/24, 0/24 | 0/24, 0/24 | none | 5.98-10.62 |
| C·d | 0/24, 0/24 | 0/24, 0/24 | none | 8.4-11.63 |
| W·l | 0/24, 0/24 | 0/24, 0/24 | bp10 `retarget·120` r3 [stub] at 9.42 | 8.1-14.14 |
| W·d | 0/24, 0/24 | 0/24, 0/24 | none | 7.81-10.29 |

**bp12: 0 of 96. Rule (a) does not fire.**

**Stubs on the R2 A/B (W3 whole, §4.4).** bp12 W·l r1 reads one stub frame each at `retarget·40` (48 ms, load 6.71) and `retarget·120` (51 ms, 6.34). Both are the same glyph: "r" of a tab button, 21 % painted at opacity 1, hard edge 0.25 px wide at x ≈ 794. bp10 W·d r2 reads the same signature at `retarget·120` (50 ms, 794.3 px, 12.51). Rule (b) is a battery rule, and the battery reads 0 stub in every column. Both reds were owed two re-runs, and **neither was taken (zone stop, §7)**. The critic should read this slot, because two reads at one slot came in one W3 run.

### 4.2 · The heir

`heirprobe.mjs` on bp12i, light, both engines (`heir/`): `o.enter` is taken on every tied cell: `first-expand`, `warm-collapse`, `warm-expand`, `swap-long`, `swap-short`, `vfirst-expand`, `end-first-expand`, `three-long`, `three-mid`. The untied cells are unchanged: `content-add`, `lead-*`, `vlead-*`, `wide-first-expand`. Loads 8.03-10.01 (Chromium) and 6.83-8.6 (Playwright WebKit).

### 4.3 · The leaving-pair exemption: `vmorph` collapse on the frozen frame

`frz.mjs` (the pass-11 critic's), bp12, T 42-62 ms by 4, one run per column, 24 reads (`frz/`). The `s2|s3` splice frame is frozen in C·l 4, C·d 4, W·d 1 and W·l 0 of 6. On every read, "1" and "2" paint their whole rest extent at opacity 1, with 0 px of ink short on either glyph.

### 4.4 · R2's WebKit margin, per column with the seat

| reading | C·l | C·d | W·l | W·d |
|---|---|---|---|---|
| battery (bound 0.5), `sum/r2-battery.txt` | 0.125 (`swap-long`, seat 1, 12.53) | 0.128 (`warm-expand`, seat 8, 7.89) | **0.024** (`warm-expand`, seat 8, +217 ms, 10.76) | 0.040 (`swap-short`, seat 3, 9.02) |
| A/B bp12, worst of 2 W3 runs | — | — | 0.027 (`warm-expand`, seat 8, 8.83) | 0.028 (`swap-short`, seat 3, 11.07) |
| A/B bp10, worst of 2 W3 runs | — | — | 0.020 (`swap-long`, seat 1, 10.03) | 0.034 (`retarget·80`, seat 1, 7.52) |

Seat 8 `warm-expand`, the W·l battery's thin seat, reads bp12 0.443, 0.447, 0.456, 0.473 (A/B) and 0.476 (battery), against bp10 0.430, 0.447 and 0.454 (`sum/r2-ab.txt`). The A/B's worst read does not separate the builds: the thinnest WebKit read on the A/B is bp10's, 0.020. But the battery's W·l 0.024 is the thinnest bp12 read. It sits on seat 8, not on pass 11's seat 1, and seat 8's drop reads a little higher on bp12 in 5 reads against 3. The heir cure (§2.2) holds the leaving unit's middle at full ink to its last frame, and that could raise a leaving unit's last-frame drop. Whether it does at seat 8 is not settled at this sample. It is the critic's to read at load 10-15.

### 4.5 · The boot graph and cost

- **Boot graph** (`F7/boot-graph.txt`, the pass-10 `bootsize.py`): 64 files, 503,787 B against the 503,808 ceiling, **margin 21 B**. At bp10 it was 503,737 B, margin 71 B. The scene chunk is 21,483 B (bp10 21,433). The ceiling is not raised. The cure's 50 B are not offset elsewhere in the scene: the margin stays positive, but 50 of its 71 B are spent.
- **F7** 13/13 at 14.58, and **PR** 6/6 at 8.61, on the final tree (`F7/`, `PR/`; the v1 reads are in `first-read/`).
- **Cost** (Chromium, `D2-Bp-probes.mjs pcost,plead`, 3 rounds, `--cpu-cores 0`, each started at load ≤ 15; `sum/costtab.txt`): frames over 25 ms on the four 4× rows are bp12 14, bp10 16, fv5 2. Per-row detail with loads 8.79-24.85 is in the table.

---

## 5 · The battery under H8 (item 6)

One battery, all four columns, on the §P10-7.3 item-2 arm set. Each engine and theme ran as one guarded slot. `battery.sh` (as landed, `NOGUARD=1` inside the slot) ran every witness, re-ran red cells twice, and ran FM's six B2 cells three times. `fmlow` ran once per WebKit theme. F7, PR and L1 ran against fv3.

| column | slot start (bound 20) | admitted (WebKit lock) | battery + fmlow ended | cells (load) |
|---|---|---|---|---|
| C·l | 17:23:55 at 14.63 | 17:24:11 at 13.56 | 17:35:06 | 6.37-20.58 |
| C·d | 17:50:28 at 8.11 | 17:50:28 at 8.11 | 17:59:52 | 6.05-11.6 |
| W·l | 18:18:31 at 9.01 | 18:18:31 at 9.01 (no wait) | 18:31:17; fmlow admitted 18:33:18 at 12.36 | 8.83-**33.37** |
| W·d | 19:59:26 at 7.97 | 20:04:52 at 10.23 (5.4 min) | 20:15:42; fmlow admitted 20:17:12 at 13.14 | 6.14-14.28 |

**W·l ran cells above 31** (CF to 33.37; L1 to 28.16 and FM to 26.87 are under it). By §7.3 item 6 that slot is to be re-read and both readings kept. **The re-read was not run: the zone stop came first** (§7).

**Cells not PASS** (the digest's own read, default and `--ruled`, `digest/`):
- CASES `case·rotated`: C·l FAIL [jerk 6.28 against control 4.18 + 1; re-run 1 FAIL 6.68; re-run 2 PASS], at 8.15-9.36.
- CASES `case·rotated` and `case·rotated·control`: W·l FAIL [snap 0.63-0.64 px] in the main run and both re-runs, at 10.65-12.71 (§6).
- W3 `reversal`: C·l main FAIL [window 275 ms after the retarget, against 257.3]. Both re-runs read it OWNER-BLOCKED, and the digest reads NOT-REPRODUCED.
- UNMEASURED: W8 `consumer·*` (12, as every pass), ST's 5 per WebKit column (markers), and F6's 22 that follow from them.

The FM battery (`sum/fmsum.txt`) reads hole frames: C·l 0 in 18 reads, C·d 0 in 18, W·l 0 in 36, W·d 1 in 36 (the W·d fmlow r3 `warm-collapse` frame of §3). Every column reads 0 stub. 671 cells.

**Content-remove A/B** (rule (c); W3 as landed, bp12 and bp10 alternating, 8 rounds, each read started at load ≤ 11 after a wait of at most 180 s for Chromium and 60 s for Playwright WebKit; `sum/crsum.txt`). Every gap, in ms from the extent's landing to the flag's close:

| column | bp12 gaps | bp12 late | bp12 verdicts | bp10 gaps | bp10 late | load bp12 / bp10 |
|---|---|---:|---|---|---:|---|
| C·l | 0, 0, 0, 0, 0, 0, 0, 0 | 0 | PASS ×8 | 0 ×8 | 0 | 6.81-10.1 / 6.7-10.01 |
| C·d | 0, 0, 0, 0, 0, 0, 0, 6.6 | 0 | PASS ×8 | 0 ×8 | 0 | 6.08-11.52 / 5.15-10.19 |
| W·l | 13, 0, 0, 15, 0, 0, 0, 16 | 0 | PASS ×7, r8 FAIL [trajectory] | 34, 0, 0, 32, 34, 0, 33, 33 | 0 | 7.58-16.27 / 6.52-12.97 |
| W·d | 0, 16, 0, 0, 0, 0, 0, 0 | 0 | PASS ×8 | 35, 0, 0, 33, 0, 34, 0, 0 | 1 (r1 FAIL [window]) | 7.72-11.43 / 7.34-14.76 |

**No bp12 read is late, so rule (c) does not fire on any read taken.** Every non-zero bp12 gap is one in-band frame. bp10's W·l reads of 32-34 ms are the second window of §1; the witness reads them OWNER-BLOCKED on the window allowance. The bp12 W·l r8 FAIL is [trajectory], not the window: 36.81 px off the rung's analytic spring at +95 ms, with a window allowance of 325.2 ms, which includes a stall of about 77 ms. It ran at load 8.69. **Its two re-runs were not taken (zone stop).** The model read (chk12, `lanes2.mjs`, bp12c and bp10c alternating, 4 rounds per column; `sum/chk12sum.txt`): content-remove late bp12c 0 of 16; bp10c 3 of 16 (W·l 70 and 34 ms, W·d 43 ms).

The other A/Bs are in §3 (FM) and §4 (retarget, display-frame, R2, cost, boot). The A/B slots: C·l and C·d inside their battery slots (17:35-17:50, 17:59-18:18). W·l queued 18:51:53 at 16.27 and was admitted 18:57:36 at 20.21, ending 19:59:22. W·d ran inside its slot to 20:57:08. **Reads that started above 11**, because the per-read wait ran out:
- in the FM A/B, W·l bp12 to 24.76 and bp10 to 27.93, and W·d to 19.45;
- in fmt12 W·l, to 24.41;
- in the content-remove A/B, W·l bp12 to 16.27 and W·d bp10 to 14.76.

Each read's load is in its log.

---

## 6 · CASES `case·rotated`: the base's landing step (placed, not cured)

The W·l battery read `case·rotated·control` (rotate 0deg) and `case·rotated` (2deg) FAIL 3 of 3 [snap]: "largest one-frame seat move after the window closed 0.63-0.64 px (bound 0.5)". Pass 11's bp10 battery read these cells 0.16 and 0.1. `rotdiag.mjs` drives the probe's own sequence and recorder (pass-4 `cases.mjs`) on bp12c and bp10c, beside the scene's lane trace (`rot/`).

- **The move is the collapse's last spring step, and it falls on the frame the flag closes.** The plate's lanes stand at −0.635 px (velocity 50.9 px/s) on the frame before. On one path the step lands in band at −0.002 without crossing. The flag stays up, and the next frame seats at 0 and closes. On the other path the step crosses the target inside the band. `useDockBody`'s `step()` then seats at once (`!designed && inBand && after * before <= 0`), and the window closes on that same frame. The probe counts that step as a move after the close. Which path a read takes depends on the frame's `dt`.
- **It is the base's.** The A/B at host rotate(0deg), 4 rounds of 3 runs alternating, loads 10.17-19.65: snap over 0.5 in bp10c 8 of 12 and bp12c 6 of 12 (0.635-0.795 px). The first diagnosis read bp12c 3 of 4 and bp10c 2 of 4, host 0 and none. The cure does not touch the lane landing: fine() only moves a model place by under 0.5 px, and here every model place is exact.
- **Placement.** The cells are outside the 38 (R7 takes their `lanes` check only, which passes). Whether a landing step painted on the frame the flag closes satisfies W-8 ("the window closes on the frame the last painted motion lands") is the agglomeration's question. This seat moved no landing law: a crossing lane that seated one frame later would add a frame to every window.

---

## 7 · Fences, incidents, lock waits, and the zone stop

**Fences.** No tracked source in the checkout was edited, and no git write was made beyond `git worktree add` and `git worktree remove`. Builds and edits were in `.claude/worktrees/bl/D2/p12/Bp-build/wt` only. Nothing under `~/.claude` was read: ZONE-ARMED is known only from the guard's own message. Every build, browser and digest run went through `guarded`. Browser runs were never `--light`, and Playwright WebKit ran under `--exclusive webkit`. Headless only, one browser per run with a fresh context per cell, closed in `finally`; playwright from glass-ui's node_modules. Processes were stopped by PID only. G's seats did not run. **Incidents, in order:**
1. **A tracked file overwritten, and restored.** The first `mkpatch.sh` run wrote `pass-10/D2-Bp-proto.patch` (a sed on its output path had failed). It was restored at once with `git show HEAD:<path> > <path>`: sha back to `09aa6b3b…`, and `git status` clean for that directory. The path is fixed.
2. **A scratch copy inside the checkout.** A second `mkpatch.sh` run put its HEAD + fv5 copy under `.claude/worktrees`, inside the repo, and `git apply` there skipped every path silently. The scratch moved to the session scratchpad, outside any repository. The main checkout was verified unmodified.
3. **A Chromium smoke run while a WebKit slot was queued.** At 13:55 a Chromium `fmtrace` smoke ran while the trace slot waited for the WebKit lock, before the seat lock existed. Then `seatlock.sh` was added. The 14:49 Chromium trace + chk run held that lock while slot 2 was queued, not admitted.
4. **The first chain stopped by PID at 17:24**, 3 min in, because `BAT` was not exported into the slot (`bat` wrote nothing; `cr` r1 was partial; both kept in `aborted-17-20/`). The export was fixed and the chain restarted at 17:23:55.
5. **An admitted Playwright WebKit slot ended at 18:38.** After the W·l CASES reds I stopped the chain's parent by PID, so it would queue no later slot while I read them. The guard then killed the admitted W·l slot ("caller died") during its `cr` sub-step. Its battery and fmlow had already ended with exit 0 and are kept. The partial `cr` and the slot log are in `aborted-18-38/`. This cancelled an admitted WebKit slot, against the letter of §7.5. The diagnosis then showed the class is the base's, so bp12 stood, and W·l's A/B and readings ran in their own slot from 18:51.
6. **The zone stop.** The guard reported "the kernel zone leak is ARMED" (armed 20:28:52; seen at 21:09 in the re-run slot's queue message). The queued re-run slot was withdrawn by PID before admission (21:19), and nothing of mine runs now. **Ran while armed, unknowingly, before 21:09:** the W·d slot's sub-steps from 20:28 (the end of `cr`, then `chk`, `fmt`, `si`, `frz`, `ab`, `fmab`, `r2`, admitted at 20:04:52), cost (20:57-21:08, whose logs carry the warning), and, after 21:09, the digest (two `--light` runs at about 21:20). **Not run:**
   - the two re-runs of bp12 W·l `content-remove` [trajectory], `retarget·40` [stub] and `retarget·120` [stub] (`scripts/rerun.sh`, ready);
   - the re-read of the W·l battery slot (cells to 33.37).

   The owner decides on the reboot.

**Lock waits** (Playwright WebKit, all waited out, none cancelled before admission):

| slot | queued | admitted | wait |
|---|---|---|---:|
| trace (bp10t/bp8t) | 13:31:33 | 14:34:13 | 63 min |
| slot 2 (chk, fmx, fmt) | 14:48:45 | 16:31:06 | **102 min, over 90, waited out** |
| W·l battery | 18:18:31 | 18:18:31 | 0 |
| rotdiag ×2 | 18:41, 18:48 | within minutes | < 5 min |
| W·l A/B and readings | 18:51:53 | 18:57:36 | 5.7 min |
| W·d battery, A/B and readings | 19:59:26 | 20:04:52 | 5.4 min |
| re-runs | 21:09 | — | withdrawn at 21:19 (zone) |

**Cleanup.** `git worktree remove --force` removed the worktree. The deletion of `.claude/worktrees/bl/D2/p12/Bp-build/` was refused by the permission check and is left to the owner. That directory holds about 1.4 GB: the builds under `out/`, the run outputs and the helper copies, and nothing of record. Nothing of this seat is running.

**Real Safari** is UNMEASURED (owner's safaridriver checkbox) in every cell.

---

## 8 · Open for the critic

- The two re-runs owed on bp12 W·l: `content-remove` [trajectory] and `retarget·40` / `retarget·120` [stub, one slot, one W3 run]. Also the W·l battery slot re-read for cells above 31.
- R2 W·l 0.024 on seat 8 `warm-expand`: does the heir's held middle raise the leaving unit's last drop?
- The boot graph at 21 B.
- The CASES landing step (§6): a question of W-8's reading, the base's.
- The second-window class on every cell where a hovered box can be taken by a check. The cure removes the cause in the model. A box transformed by something other than its own centred scale (an ancestor, a non-centred origin) still reads through the rounding fallback, as before.
