# D5 · pass 13 · C-A13-complete: cand13 scored as built; held at the zone gate before WK-2

| field | value |
|---|---|
| seat | C-A13-complete, wave c3 of the pass-13 completion (REGISTRY §P13-8.2), continuing C-A13's critique. A fresh Opus seat: I authored no D5 seat in passes 2-13 and was no critic in passes 3-12 |
| model | `claude-opus-5-5`, asserted from own system identity |
| status | **PARTIAL.** The Chromium battery ran to its end (three named batches C-1..C-3, 45 stages) and the first WebKit acquisition ran to its end (WK-1, 17 stages, 61 min). **At 13:13:09, as WK-2 was queued, `guarded` REFUSED:** "kernel zone data.kalloc.1024 at 8.47M (panics near 20.8M; heavy and browser runs stop at 8M): reboot the Mac" (`C-A13c/logs/all.log`). WK-2, the planned WK-3 contingency and the gates were refused at admission (exit 75); no stage of them started. Under the task's rule I stopped every run and return the held list as a runnable file: **`C-A13c/held-wk2.txt`** (29 WebKit stages, then `gates.sh`). **The owner should be told the zone count is 8.47M and the guard asks for a reboot.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| candidate | HEAD `81c0ec761` (docs only past `d94e413dd`: `git diff --stat d94e413dd HEAD -- src tests demo` prints nothing; `release/10.1.1`..`10.1.4` not ancestors, exit 1 each) + `pass-13/P-E13.patch` **`ffa64fc4054bf5368000f29bd3930b47743f115f`** (my `shasum`) → src tree **`30f51077c3ec`**, the tree of record. References built beside it in one guarded call (`C-A13c/builds.sh`, `logs/builds.log`, every build exit 0, tree read back after each): `head` `da39a3ee5e6b`, `cand12` `61f7b80ac552`, `cand11` `6317ad295579`, `cand8` `92f38f424df2`, and the six `E13/plants.py` plants on cand13 (`level` `c2695a446247`, `child` `78b8012b6d4f`, `stale` `4c718c3e2542`, `noown` `b53b2aece8d1`, `typedom` `2a88db2387df`, `reachzero` `cf805029101d`), each equal to P-E13-complete's |
| harness | `f2cc94e3fa86…` (H13-complete's) in every stage log header and footer; scene app `9e34ffa5714e`. No harness byte changed by this seat |
| engines | Chromium 149.0.7827.55, Playwright WebKit 26.5 (playwright 1.61.1), headless shell, no GPU arguments. Playwright WebKit is not Safari |
| rulings | INBOUND re-read at start (mtime 2026-11-04 05:38, last row O-131); FORMATION-PROGRESS to its 08:3x "c3 running" line. O-122..O-131 name no CK cell (`grep` of the rows). In force: O-103d (1)-(4), O-103f, Q-1 (c), Q-4 (b), O-118 (3), O-87. No ruling arrived mid-seat |
| read | REGISTRY.md in chunks: the pass-13 part (3223-3430), the pass-12 part (2969-3221), **the pass-11 part (2731-2968) in full** (C-A13's gap closes here), §P1-6 (283-330), round 0 §0-§3 and O-87 (1-140). In full: `pass-13/C-A13.md`, `H13-complete.md`, `P-E13-complete.md`. From the applied candidate: `stage.ts` 1-80 and `paintedScale` / `placeLens` (198-226), `settle.ts` 1-25, `engage-stage.css` 8-18, the CSS lines P-E13 adds over P-E12 (a line diff of the two patches). **Left unread:** passes 1-10 beyond §P1-6 and O-87; `C-E13.md` and `H13.md`, `P-E13.md` in full (their findings are taken from §P13-2/§P13-4); CHARTER.md's design-loop section beyond what the registry cites. No row below rests on an unread part |
| records | `pass-13/C-A13c/`: `ca13c-probe.mjs` (my §2 members on the built candidate), `builds.sh`, `run.sh`, `c-batch.sh`, `wk-run.sh`, `all.sh`, `gates.sh`, `ck22.sh`, lists `c1.txt`, `wk1.txt`, `wk2.txt`, **`held-wk2.txt`**; `logs/` (one log per stage, engine and argument hash; `c.log`, `wk-queue.log`, `all.log`, `builds.log`, `ck22.log`, `dev/` the probe's three Chromium dry runs), `json/`, `frames/` (`ca13c/` 24 lens stills, `cap/cand13/` the Chromium CAP sheets, `glance/`, `loupe/cand13/`) |

## 0 · In brief

1. **Closed on cand13, both engines, by my own replay: 17 of 27** (CK-02, 03, 04, 05, 06, 07, 08, 10, 11, 12, 13, 14, 15, 18, 23, 24, 26). **Open: 10** (CK-01, 17, 19 ◇ D2/D3; CK-25 ◇ D3 and D5's lens; CK-20, 21, 22 with counterexamples on the built candidate; **CK-09 reopened** by a new cand13 counterexample; CK-16 and CK-27 with their WebKit cells held by the zone refusal). cand12's 20/27 is not comparable cell for cell: it closed CK-09, 16 and 27, and CK-25 was ◇ only.
2. **Every C-A13 §2 member reproduces as paint on the built candidate, in both engines** (`ca13c-probe.mjs`, §2). The members fail on cand13 and pass on cand12 or HEAD, so each cell separates:
   - the perspective sweep: 0.17 px at H13's member, then **1.49-57.27 px** on the act's frame;
   - a record-started animation: **40.00 px** against the author's entrance;
   - shadow, `field-sizing` and `<link>` moves: one-frame cuts of **56, 80 and 40 px**;
   - the loupe under `rotate: 10deg`: **`--lens-sy` 4.3571** against 1.0600, and it flips below the track;
   - the host's own resize: the fixed left edge thrown **40.0 px** (42.40 measured, less the grow's 2.40);
   - the consumer's `calc()` fragments refused loud while the consumer computes them;
   - `--motion-tempo: 0` / `-1`: a 210 ms glide where CSS runs 0 s, silent;
   - **WebKit only:** a `transition: all` or `transition-property: all` host raising a false `--scale-engage is unreadable` on default tokens.
3. **Three findings are new to this seat**, and each is a regression from cand12:
   - **(a) Perspective.** cand12 passes all six perspective members at **0.00 px** in both engines, where cand13 fails five (§2.1). The chord-step residue is a **regression on this member set**. REGISTRY §P13-2 row 3 said "no", reading cand12's 1.20-3.92 px from other setups.
   - **(b) E-8's mirror FAILS on cand13 in both engines.** `:root` carries three orphan `--engage-*` tokens, `--engage-read-time`, `-number` and `-length`: the private read names sit in the engagement token namespace the mirror holds (CK-09; pass 12 read E-8 19/0).
   - **(c) The commit hosts carry `style=""` from load.** Button, Switch and Checkbox carry an empty `style` attribute on cand13 in both engines, where cand12 and HEAD carry none or a real one. This is §P13-7 item 10's residue, now read on the DOM (CK-22 MIGRATION).
4. **What holds on cand13, both engines:**
   - E-2 164/0 (arms i,ii); E-3 22/0; E-13 36/0; E-5 56/0; E-9 85/0, with the PRM plant red 32 per engine; E-12 101/0/1 and 100/0/2; E-4 18/0 and 15/0/4 (WebKit Carousel UNMEASURED, the engine fact);
   - E-11 **261/0/5 per engine**, the census **31/31 per engine**, reachin 4/4;
   - E-10 217/1 Chromium (the clamp-scroller cut, **21.85 px**, as P-E13-complete) and **213/0 WebKit**.
   - In Chromium, every pass-12 and pass-11 critic path holds except stated readings and stated non-counterexamples (§3). Their WebKit replays are held.
5. **The idle bar beside cand8 in the same run** (O-103f (1)), Chromium: cand8 120.4 and 120.3 rAF + RO per s, against cand13 119.9 and 119.9, with 0 layouts/s and 0 recalcs/s at rest and engaged. At the bar. **WebKit: held.**
6. **The gestalt (CK-25), from my own frames.**
   - The CAP sheet (Chromium, fine) reads as pass 12's: flat, restrained, one edge, no glow, no added lighting layer (O-87). The ambient exemplar is static (D3), and the dark Button's warm halo remains.
   - **The loupe under a rotated card is a broken object in both engines.** `frames/ca13c/cand13-chromium-lens-rotate10deg.png`: a tall pill hung *below* the tilted track, its readout a narrow column. cand12's still (`cand12-chromium-lens-rotate10deg.png`) shows the intact pill above the track.

## 1 · Per CK row, cand13

"Closed" means my own replay in both engines on these bytes. Loads are 1-minute loads at the stage's start and end. Logs are `C-A13c/logs/<stage>-<engine>.log`.

| row | Chromium (load) | WebKit (load) | state |
|---|---|---|---|
| CK-01 | E-1 93/1/2: latch 54/55 (`dock`); ambient ENGINE LIMIT (SwiftShader) (8.2-8.1) | E-1 93/3: latch 54/55; ambient 1.72 against 1.25 at rest; reduce leg 0.00 (10.1-8.4) | **OPEN ◇** D2 (latch, F-17), D3 (amplitude, F-16; then A's reduce leg) |
| CK-02 | E-2 `--commit-arms i,ii` **164/0** (4.7-4.4) | **164/0** (5.7-7.0) | **CLOSED** |
| CK-03 | inside E-2 (mount, arrival) | inside E-2 | **CLOSED** |
| CK-04 | E-3 **22/0** (6.3-6.8) | **22/0** (7.0-7.5) | **CLOSED** (the reach's refusals are CK-21's) |
| CK-05 | E-4 **18/0**: slider carry 12.08-12.35 px at 1006 px/s, five reads (8.2-25.0) | **15/0/4**: carry 13.19-13.51 px at 1270 px/s; Carousel UNMEASURED (no touch scrolling, the engine fact, O-103d (4)) (8.4-7.5) | **CLOSED** |
| CK-06 | E-5 **56/0** (16.1-6.2) | **56/0** (7.5-5.3) | **CLOSED** |
| CK-07 | E-6 4/2/8: the two fails are `s6 present` (0 idle animations), the RETIRED S6 | 2/2/8, the same | **CLOSED** (S6 RETIRED, owner) |
| CK-08 | E-7 6/1: `data-held` 2 writers (`GlassDock.vue`, D2's named clause; `useEngage.ts`) | 6/1, the same | **CLOSED** with D2's named clause, as pass 12 |
| **CK-09** | E-8 **18/1**: `mirror · orphans [--engage-read-time, --engage-read-number, --engage-read-length]` (6.5-5.7) | **18/1**, the same (5.9-7.0) | **OPEN, new on cand13.** E-8's rule (`e8-clock.mjs:5,104`) is that `:root` carries no orphan `--engage-*`. P-E13's three registered private reads compute on every element, `:root` included, inside the namespace the mirror holds. cand12 read 19/0 at pass 12. Every literal cell passes |
| CK-10 | E-9 **85/0**; PRM plant **32 red** (5.7-13.4) | **85/0**; plant **32 red** (7.0-6.8) | **CLOSED** |
| CK-11, 13, 14 | E-12 **101/0/1** (the composer census needs `--wt`, as pass 12) | **100/0/2** | **CLOSED** |
| CK-12 | E-8's literal cells all pass; `tokenOf`/`easingOf` set no figure (static) | the same | **CLOSED** |
| CK-15 | E-10 hand-off drop 0.0069 against own release 0.0077; singleton max 1 | inside E-10 **213/0** | **CLOSED** |
| CK-16 | idle beside cand8: 119.9 / 119.9 against 120.4 / 120.3 rAF + RO per s, 0 layouts, 0 recalcs; loop stops at release (`cand13-loop` 2/0) | **held** (`cand8-ca9idle`, `cand13-ca9idle`, `cand13-loop` in `held-wk2.txt`) | **OPEN, WebKit held.** Closes when the held WebKit idle and loop cells read at the bar |
| CK-17 | — | — | **OPEN ◇** D2 (the dock's `:active` presses); Real Safari UNMEASURED |
| CK-18 | E-4 `RELEASE_RULE` on its four surfaces | the same, the Carousel the engine's | **CLOSED** |
| CK-19 | — | — | **OPEN ◇** D3 |
| **CK-20** | E-10 **217/1** (the clamp-scroller cut, 21.85 px, 8.4-10.3); my members §2.1-§2.5 | E-10 **213/0** (8.9-5.7); my members, the same verdicts | **OPEN, counterexamples in paint, both engines** (§2). The WebKit exit-side re-reads are held |
| **CK-21** | E-11 **261/0/5**, census 31/31; my `tok` cells | E-11 **261/0/5**, census 31/31 (9.3-8.9); my `tok` and `trans` cells | **OPEN** (§2.6, §2.7) |
| **CK-22** | — | — | **OPEN** (§4) |
| CK-23 | numstat reproduced from the applied tree: **199 files +5989/−1653; `src` 154 files +3425/−1359** (tracked 179 +1922/−1653, src 142 +1428/−1359; untracked 20 files 4067 lines, src 12 files 1997). CPU per frame, C-E11's cell, cand8 / cand11 / cand12 / cand13 twice, interleaved, held still (none / zoom125 / deep, ms of script a frame): round 1 (load 21.3-11.0) 0.083/0.102/0.100 · 0.060/0.059/0.089 · 0.069/0.079/0.115 · **0.076/0.079/0.074**; round 2 (load 10.0-12.7) 0.048/0.039/0.062 · 0.119/0.111/0.155 · 0.106/0.108/0.130 · **0.109/0.133/0.144**. 0 layouts/s, 0 recalcs/s in every window. Under this load the builds do not separate: cand13 lies inside the spread of cand11 and cand12 | WebKit has no CPU instrument (CDP is Chromium only), stated | **CLOSED** (cost measured; it does not separate from cand11/cand12 at this load) |
| CK-24 | E-1 `static` cells pass | pass | **CLOSED** |
| CK-25 | CAP 18/0 and the sheets (`frames/cap/cand13/cand13-chromium-{fine,coarse}.png`); the lens stills (§2.4) | CAP, tip and glance **held**; the lens stills are of record (`cand13-webkit-lens-*.png`) | **OPEN ◇** D3 (ambient static), and **D5's**: the loupe under rotation is a broken object in both engines |
| CK-26 | the CSS over P-E12 is three private `@property` registrations and their comment (line diff of the patches): no lighting layer, no blur token, no radius; the CAP frames add none | the same bytes | **CLOSED** |
| CK-27 | the six plants red on their cells: `level` 46/12, `child` 6/12, `stale` 0/3, `noown` 1/1, `typedom` 100/13, `reachzero` 3/1; PRM plant 32; each of my cells has a reference build that reads the other verdict (§2) | the PRM plant 32 red; **the six plants held** | **OPEN, WebKit held.** Closes when the held WebKit plant stages read red on their cells |

**Closed: 17 of 27.**

## 2 · C-A13's §2 members, driven on the built candidate (`ca13c-probe.mjs`)

Each cell runs on the harness's own scene app, on its E-10 drive: the loupe row, C the root's parent, G C's parent; a fine hold, +900 ms; filmed per frame in a task posted from rAF; the act on frame 8. Each runs on cand13, cand12 and HEAD in both engines. Loads: Chromium 10.3-13.5 (cand13), 12.5-8.3 (cand12), 9.2-8.4 (HEAD); WebKit 8.8-10.3, 10.1-8.0, 8.0-9.3. Both engines agree on every graded verdict except where marked. No cell was seen only under load: every figure was read twice, Chromium and WebKit, and in Chromium a third time in the dry run (`logs/dev/probe-dev1-chromium.log`, load 14.0-13.8), to the decimal.

### 2.1 · The perspective sweep (CK-20; §P13-2 row 3)

C carries `perspective(P) rotateX(θ)` about `50% 0`; on frame 8 an M px block is inserted as C's first child. The figure is the root's distance on the act's frame from where it was painted (bound ≤ 0.5).

| P / θ / M | cand13 (both engines) | cand12 Chromium / WebKit | HEAD |
|---|---:|---:|---:|
| 600 / 25 / 40 | **0.17 ✓** | 0.00 ✓ / 0.00 ✓ | 37.85 ✗ |
| 600 / 25 / 160 | **4.75 ✗** | 0.00 ✓ / ✓ | 165.93 ✗ |
| 300 / 45 / 40 | **1.49 ✗** | 0.00 ✓ / ✓ | 32.90 ✗ |
| 300 / 45 / 160 | **39.73 ✗** (step 41.1 / 38.9 px against 27.9) | 0.00 ✓ / ✓ | 193.93 ✗ |
| 200 / 60 / 40 | **3.68 ✗** | 0.00 ✓ / ✓ | 26.89 ✗ |
| 200 / 60 / 120 | **57.27 ✗** | 0.00 ✓ / ✓ | 145.86 ✗ |

The figures are identical in both engines. cand12's layout model passes this placement (the block inside the tilted card) at 0.00 px, so on these members **cand13's chord step is a regression from cand12**. REGISTRY §P13-2 row 3 read cand12's perspective error (1.20-3.92 px) from other setups. The plant is HEAD, which fails all six; the passing reference is cand12.

### 2.2 · An animation the record starts (CK-20; row 4)

On frame 8 a class is added to C, or to G, that starts `@keyframes { from { translate: 0 -40px } }` over 600 ms. The animated box moves −40.00 px on the act's frame. On **cand13 the root's offset from its own animating card moves 40.00 px**, and a 210 ms translate glide runs on the root for 12 of 12 frames, both cards and both engines: the entrance is glided against. cand12 and HEAD read 0.00 px with no glide, both engines (PASS, the reference).

### 2.3 · Moves with no record, each beside its record-carried twin (CK-20; row 5)

The grade is the largest move over any 16.7 ms against the painted move × the glide row's peak + 1 px.

| member | cand13 Chromium | cand13 WebKit | twin on cand13 | cand12 | HEAD |
|---|---|---|---|---|---|
| shadow root's div 20 → 76 px | **56.00 px on the act's frame, no glide ✗** | 56.00 on the act's frame ✗ | light-DOM style write: 0.00, glide 210 ms ✓ (both) | ✗ both, twin ✗ (cand12 heard child lists only) | ✗ both |
| `field-sizing: content` textarea, `value` set (1 → 5 lines) | **80.00 px cut ✗** | 80.00 ✗ | text-node write: 0.00, glide ✓ (both) | ✗, twin ✓ | ✗ |
| `<link rel=stylesheet>` (a blob URL) giving a block 40 px | **40.00 px cut** on the frame the sheet applies ✗ | 0.00 on the act's frame, then a 40.0 px step at +32 ms ✗ | `<style>` element: 0.00, glide ✓ (both) | ✗ | ✗ |

The record grammar cannot carry these moves, as C-A13 §2.3 read library-free. Each is a one-frame cut of the held host on the built candidate, in both engines.

### 2.4 · The loupe under a rotated or skewed card (CK-20, CK-25; row 2)

| card | cand13 (both engines) | cand12 (both engines) |
|---|---|---|
| none | `--lens-sx/sy` 1.0600 / 1.0600, lens 148.4 × 80.6 above the track | the same |
| `rotate: 10deg` | **1.0541 / 4.3571 ✗**: painted 147.6 × 331.1; top 233.5 against the track's bottom 233.5, **hung below** | 1.0600 / 1.0600 ✓, above |
| `rotate: 10deg; scale: 0.8` (origin 0 0) | **0.8433 / 3.4857 ✗** against 0.8480 | 0.8480 / 0.8480 ✓ |
| `skewX(15deg)` | 1.0758 / 1.0600 (REPORT) | 1.0600 / 1.0974 (REPORT) |

The bounding-box ratio also feeds `room` (`stage.ts:224`, `room = t.top − lens.offsetHeight · s.y`), so the side decision turns the lens under. Stills: `frames/ca13c/{cand13,cand12}-{chromium,webkit}-lens-*.png`. The cand13 rotate still in Chromium shows a pill about four times its height, hung under the tilted track, with its readout cropped in a column. That is a broken object (O-87, D-1).

### 2.5 · The host's own size change (C-A13 §5 item 8, C-E13 D5; row 8)

C's width goes 300 → 380 px by a style record, and the root follows it (318.0 → 402.8 px grown). On **cand13 the root's painted left edge, fixed in layout, jumps 42.40 px on the act's frame** while its centre holds 0.00, then glides back (both engines). cand12 reads 2.40 px and HEAD 0.00. As printed, the cell's bound (≤ 0.5) leaves out the centre-origin grow's own share of the resize: (84.8 − 80) / 2 = 2.40 px, cand12's whole figure. **Graded with that share: cand13 throws the edge 40.0 px ✗; cand12 ✓; HEAD ✓.** The correction is stated here, on reading, and no number changes. The probe's bound should carry the share in any re-run. **Row 8 is no longer PLAUSIBLE: it is paint, both engines, a regression from cand12.**

### 2.6 · The consumer's grammar, and the tempo (CK-21; rows 9, 11)

Each token is planted on `<html>` before any page script; then a hold and the outside insert. The consumer is the library's own expression, computed on a probe.

| token: form | consumer | cand13 (both engines) | cand12 Chromium / WebKit | HEAD |
|---|---|---|---|---|
| `--spring-dock-settle: 0.1s + 110ms`, `105ms * 2`, `2 * 105ms` | 0.21s | **refused loud** ("`--spring-dock-settle` is unreadable … paints nothing") ✗ | refused ✗ / refused ✗ | silent, instant ✗ |
| `--spring-dock-settle: calc(0.1s + 110ms)` | 0.21s | taken, glide 210 ms ✓ | ✓ / **refused ✗** (pass 12's Typed OM) | ✗ |
| `--scale-engage: 1 + 0.06`, `2 * 0.53` | scale 1.06 | **refused loud** ("does not grow along its inline axis") ✗ | ✗ / ✗ | ✓ (no reader) |
| `--scale-engage: calc(1 + 0.06)` | 1.06 | taken ✓ | ✓ / **✗** | ✓ |
| `--motion-tempo: 0`, `-1` | `transition-duration` 0s | **glide 210 ms, 0 errors ✗**: script and stylesheet disagree on the clock, silently (E-2) | ✗ / ✗ | ✓ (instant) |
| `--motion-tempo: 2` | 0.42s | 420 ms ✓ | ✓ | ✗ (no glide) |

H13-complete F6 reads row 9 in both engines on a fresh element, and the built candidate agrees. Row 11 is read here in paint: `motionTempo()` maps ≤ 0 to 1 (`motionTempo.ts:38-40`, REGISTRY §P13-2 row 11).

### 2.7 · A transition on the element read (CK-21; row 10, H13-complete F7)

The rule is set on the held root (the element `tokenOf` reads); then a hold and the outside insert.

| rule on the root | Chromium cand13 | WebKit cand13 | cand12, both |
|---|---|---|---|
| none | 0 errors, glide 210 ✓ | ✓ | ✓ |
| `transition-duration: 210ms` | ✓ | ✓ (*) | ✓ |
| `transition: all 300ms linear` | ✓ | **2 engage errors on default tokens** ("`--scale-engage` is unreadable on the host; the held control does not grow along its inline axis") ✗ | ✓ |
| `transition-property: all; transition-duration: 150ms` (Tailwind `transition-all`) | ✓ | **2 errors ✗** | ✓ |

(*) H13-complete F7 read a bare `transition-duration` emptying the registered read, library-free. On the built root it does not: the root's own computed `transition-property` is the library's list, not `all`, so the bare duration starts no transition on the read property. The `all` forms do. **On the built candidate in WebKit, a consumer's `transition-all` on a held control is a false error on default tokens, and the reach is refused.** No sibling consumer puts `transition-all` on a member host's tag (`C-A13c/ck22.sh` and a per-tag grep: 0 lines; multi-line tags are not caught, a stated limit). The member is latent, and it is still a counterexample to "zero engage errors on default tokens in every scene".

### 2.8 · The `style=""` residue (CK-22, CK-23; §P13-7 item 10)

| host | cand13 (both engines) | cand12 | HEAD |
|---|---|---|---|
| Button, Switch, Checkbox at load | **`style=""` from load**, before any press | no `style` attribute (Button gains `--mouse-x/y` on press) | Button a real style, Switch and Checkbox none |
| the held slider root | has reka's style before; nothing added after release | the same | the same |

The mount-time token read leaves an empty `style` attribute on every commit host. A consumer's `:not([style])`, a DOM snapshot or an SSR hydration diff sees it. No sibling consumer at HEAD uses `[style]` or `:not([style])` in a selector (`ck22.log`, NS 0 everywhere), so it is latent, and it is a MIGRATION row P-E13 does not carry.

## 3 · Every path either pass-12 critic and either pass-11 critic found

**Chromium**, on cand13 (`c1.txt`, batches C-1 08:44-10:05, C-2 10:05-11:34, C-3 11:34-11:52; loads 4.0-25.0):

| path | stage | result |
|---|---|---|
| rotate, skew, perspective, percent translate, the Dialog; attr and text re-renders; anchoring | E-10 whole; `cand13-ca12 --only xf,kind,anchor,errs` **57/0**; `cand13-ce12` **27/1**; `cand13-origin` **22/0** | E-10's one fail is the clamp-scroller cut (21.85 px). `ce12`'s one fail is `anchor · scroller · none`, 40.00 px with no glide: pass 12 ruled it a reading, not a counterexample (Chromium anchors the box and the page; it fails on cand12 and cand11 alike, `pass-12/C-E12/logs`) |
| the math settles, the value families, the census | E-11 whole 261/0/5; `cand13-e11v` **67/5**; `cand13-vals` **57/0** | `e11v`'s 5 fails are `calc(infinity * 1s)` and `1e-3s` on the travel paths, the stated non-counterexamples (§P12-2; pass 12 read 67/72) |
| the refused reach input | E-11 reachin 4/4; `reachzero` plant red | holds |
| pass 11's: list easing, settle unit, host glide under scale, zoom family, reverse, release, exit-side, re-render across the line, press at the line, re-press, wheel, stacking frame, Dialog lens, anc kinds | `cand13-ca11` **43/0** and **14/0**; `cand13-ce11` **72/0/1**, **22/0**, **8/0/1**; `cand13-ce9` **6/0**; `cand13-ce9c` (REPORT only); `cand13-ca9` **8/0**; `cand13-tip` **4/0** | holds |
| CAP, glance | CAP **18/0**; `glance-cand13` 3 stills | REPORT |

**WebKit:** the same paths on cand13, the exit-side re-reads below load 8 (cand13 beside cand11) and the plants are **held** (`held-wk2.txt`). E-10 whole (213/0) and E-11 whole (261/0/5) did run in WebKit, inside WK-1. They carry H13's members of each of these families, so the families are read in WebKit at H13's enumeration, not at the pass-12 and pass-11 critics' own cells.

## 4 · CK-22: the claims against the bytes and the cells

| claim | where | reading |
|---|---|---|
| "every transform … (translate, rotate, scale, skew, any matrix, perspective, a percent or origin …) … carried as they paint, never modelled"; "one Newton step for a projective map" | `stage.ts:38-43` | false in paint for five of six perspective members (§2.1) |
| "the lens's correction and travel and the reach's room are painted lengths over its axis lengths" | `stage.ts:43-44` | the lens's scale is the bounding box over the layout box (`paintedScale`, `stage.ts:198-201`), ×4.36 under rotation (§2.4) |
| "a running animation (an ancestor's …) moves both alike and is never glided" | `stage.ts:50-52` | false for an animation the record starts (§2.2) |
| "So the script takes exactly the forms the consumer's type takes, in every engine" | `settle.ts:13-14`, and `utilities/engage.css`'s new comment ("in every engine") | the consumer is a `calc()` fragment (§2.6); WebKit's `transition: all` (§2.7) |
| "(stage.ts `writeGeometry`)"; "reads 0" | `engage-stage.css:12`, `:15` | `writeGeometry` is not in `src` (`grep -rn`: only this comment); `writeReach` writes `"1"` (`stage.ts:283`) |
| the derivation's no-record list (CSSOM, font swap, image decode, pseudo-class restyle) stated as "not glided" | `stage.ts:58-60` | holds as a statement, and omits shadow trees, `field-sizing` IDL state and `<link>` loads, each a cut in paint (§2.3) |
| no MIGRATION row for the `style=""` residue, nor for the three private names on `:root` | — | §2.8; CK-09's orphans |

**The consumer greps** (`C-A13c/ck22.sh` at glass-ui HEAD `81c0ec761`, each sibling read-only):
- `--engage-read-` 0 in every sibling.
- No `--scale-engage` or `--motion-tempo` write in any sibling's source. gregg's and sci-report's hits are bundled glass CSS under `.shots/` and `dist-*/`.
- `field-sizing-content` once, in value.js `demo/palettes/admin/panels/AdminTagsPanel.vue:90`, an input bar beside no held control.
- No `[style]` selector.
- **No Slider or NumberField file uses `transition-all`.**

## 5 · Next-pass defect classes (no CK row added)

| # | class | source | row |
|---|---|---|---|
| 1 | **A registered private name inside the public token namespace.** `--engage-read-*` computes on `:root`, so E-8's mirror reads three orphans. A private read belongs outside `--engage-*`, as `--stage-*` and `--rung-*` do | §1 CK-09 | CK-09 |
| 2 | **A cure that regresses a member set the previous build carried.** cand12 lands every perspective member at 0.00 px; cand13's engine-asked map with one chord step does not. The derivation replaced a model that passed these members without driving them | §2.1 | CK-20, CK-27 |
| 3 | **A mount-time read with a DOM side effect.** The token read's inline write and removal leave `style=""` on every commit host from load | §2.8 | CK-22 |
| 4 | **A cell's bound stated without a size-dependent share** (this seat's `hostsize`: the grow's own edge travel). Recorded so the next instrument carries it | §2.5 | instruments |
| 5 | **Process.** The harness lock (`os.tmpdir()/bl-d5-engagement-harness.lock`) serialises the two c3 critics' witnesses, so lock waits reached 1281.8 s on one stage (`cand13-E-1-chromium.log`). Chromium took three named batches instead of two. WK-1 waited 20 min for the WebKit lock. The zone gate refused at 8.47M between WK-1 and WK-2; the held list is a file | logs | records |

## 6 · Process

- **Machine law.** Every build, browser run and dry run went through `~/.claude/guard/guarded`; never `--light`.
  - Chromium ran in named batches C-1..C-3, `--timeout 90`, with no stage started after 80 minutes (C-1 stopped at 81 min with 35 left, C-2 at 88 min with 4 left, each recorded in `logs/c.log`).
  - WebKit was planned before the start as WK-1, WK-2 and a WK-3 contingency, each `--exclusive webkit --timeout 90`. WK-1 was queued 11:52:19, admitted 12:12:34 (a 20-minute lock wait) and ran 17 stages to 13:13:05, guard exit 0. WK-2 was refused at admission.
  - The WebKit browser retires at 60 navigations (harness `NAV_CAP`, H3-1); no log prints an engine close.
  - Headless shell, no GPU arguments, no browser MCP. One browser per battery, a fresh context per cell, closed in a `finally`. One heavy run at a time.
- **The zone.** Every `guarded` call printed the ARMED warning (inuse 30389) and admitted the run until 13:13:09. Then it REFUSED at kalloc.1024 8.47M. Per the task, nothing further was started. `ps` shows no process of this seat.
- **What ran outside the lists:**
  - three Chromium dry runs of my probe (cand13 whole; then the residue cells on cand13 and cand12; then on cand13, cand12 and HEAD), each in its own guarded call, logs under `logs/dev/`;
  - the read-only sibling greps (`ck22.sh`, one repo at a time, never a walk of `~` or `/`);
  - the numstat and the patch line diff.
- **Fences.** No edit to tracked source in the checkout and no git write there. The only checkout writes are this file and `pass-13/C-A13c/`. The worktree `.claude/worktrees/bl/D5/p13c/C-A13c/wt` (with `node_modules` symlinked; the checkout has no `tests-visual/node_modules`) was removed at close by `git worktree remove --force`, and its parent `p13c/C-A13c` by `rmdir`. `git worktree list` names no C-A13c entry, `p13c/` holds only C-E13c's, and `git status --short src tests demo` prints nothing. Nothing under `~/.claude` was read: the guard was only executed, and its refusal text is quoted from my own log.
- **Not run (held):** WK-2's 29 stages (the six plants, the idle bar and the loop, the exit-side re-reads, the pass-12 and pass-11 critic paths, `e11v`/`vals`, `ce9`/`ce9c`, tip, CAP, glance), and the gates (build, typecheck, `demo:dist:build`, vitest). P-E13's gate figures stay unreproduced by this seat.

## 7 · Open, and for c4

1. **Run `C-A13c/held-wk2.txt` unchanged after the owner's reboot.** WK-2 first, the gates after it. Builds are reproducible by `builds.sh`, and the trees are of record. With it, CK-16 and CK-27 can close and CK-25's WebKit frames land; CK-20's WebKit exit-side and the critics' WebKit paths are read.
2. **On the present record the fixed point is not reached, and pass 14 is a build pass.** CK-20, CK-21 and CK-22 hold counterexamples in paint in both engines on the built candidate. CK-09 is newly open on cand13. The perspective members, the record-started animation, the lens under rotation, the host's resize, the `style=""` residue and CK-09 are **regressions from cand12**. That bears on c4's ruling of P-E14's base (§P13-8.3: "on P-E12, if the completion reads a cand13 regression on rows cand12 closed that P-E14 cannot cure in place").
3. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.
