# D5 pass 13 · C-E13-complete: cand13 scored, held-battery §3 driven, stopped by a guarded refusal (REGISTRY §P13-8.2, wave c3)

| field | value |
|---|---|
| status | **PARTIAL.** The whole Chromium list ran to its end (60 lines, four named batches C-1..C-4, 08:49-12:01). WebKit's WK-1 ran 45 of 68 stages (admitted 13:13:09 after a 71.8-min lock wait, ended 14:42:35 at its 80-min rule, guard exit 0). **WK-2 was REFUSED by `guarded` at 14:42:39: "kernel zone data.kalloc.1024 at 8.81M (panics near 20.8M; heavy and browser runs stop at 8M): reboot the Mac."** Every run stopped there; nothing of this seat is running. The 23 WebKit stages not run are `C-E13c/held-battery-wk` = **`C-E13c/held-wk.txt`**, to be run unchanged by the next completion. **Scored: 17 of 27 closed, 10 open.** Real Safari: UNMEASURED (owner's safaridriver checkbox) |
| model | `claude-opus-5-5`, asserted from own system identity |
| eligibility | I authored no D5 seat in passes 2-13 and was no critic in passes 3-12 |
| candidate | HEAD `81c0ec761` (docs only past `d94e413dd`: `git diff --stat d94e413dd HEAD -- src tests demo` prints nothing; `release/10.1.1`..`10.1.4` not ancestors, exit 1 each) + `pass-13/P-E13.patch` **`ffa64fc4054bf5368000f29bd3930b47743f115f`** (this seat's `shasum`). Src tree **`30f51077c3ec`**, the tree of record. Controls: cand12 `61f7b80ac552`, cand11 `6317ad295579`, cand8 `92f38f424df2`. Plants on cand13: `E13/plants.py` level `c2695a446247`, child `78b8012b6d4f`, stale `4c718c3e2542`, noown `b53b2aece8d1`, typedom `2a88db2387df`, reachzero `cf805029101d`; this seat's `plants13c.py` loop `54c2a1f8128e`. All built in one guarded call (`C-E13c/logs/builds.log`), each tree equal to H13-complete's and P-E13-complete's |
| harness | `f2cc94e3fa86…` in every stage log (H13-complete's). Scene app `9e34ffa5714e` (the harness's own) |
| gates | on cand13, one guarded call (`logs/gates.log`): build, typecheck, `demo:dist:build` exit 0; vitest 247 files, **2454 passed, 10 expected fail, 1 skipped**, exit 0 (P-E13 §3's figures) |
| engines | Chromium 149.0.7827.55, Playwright WebKit 26.5 (playwright 1.61.1), headless shell, no GPU arguments. **Playwright WebKit is not Safari** |
| rulings | INBOUND re-read at the start (mtime 05:38, last row O-131: Gregg pass 7; a grep of the row finds no D5, CK or engage cell). FORMATION-PROGRESS re-read to its 08:3x c2-done line. In force: O-103d (1)-(4) (E-2 run with `--commit-arms i,ii`), O-103f, Q-1 (c), Q-4 (b), O-118 (3), O-87. No ruling arrived during the seat |
| reading | REGISTRY.md in chunks: the pass-13 part (3223-3430), the pass-12 part (2969-3220) and the pass-11 part (2731-2967) in full, and §P1-6 (283-330). Also in full: `C-E13.md`, `C-E13/held-battery.txt`, `H13-complete.md`, `P-E13-complete.md`; `stage.ts` and `settle.ts` of cand13; P-E13.md §7; the E13c runners and `paint13.mjs`; the pass-12 critics' `run.sh` and lists. **Left unread:** round 0, passes 1-10 beyond §P1-6, O-87's own section (O-87 as the charter and the pass-13 part state it binds here), `C-A13.md`, `H13.md` and `P-E13.md` beyond §7. No finding below rests on an unread part |
| records | `pass-13/C-E13c/`: `NOTES.txt` (process, in order), `ce13c-probe.mjs` (held-battery §3), `run.sh`, `c-run.sh`, `c-queue.sh`, `wk-run.sh`, `wk-queue.sh`, `all.sh`, `builds.sh`, `gates.sh`, `plants13c.py`, `ck22-greps.sh`, lists `c1.txt`, `wk.txt`, the held list `held-wk.txt`; `logs/` (one log per stage, engine and argument hash; `c1.log`, `wk-queue.log`, `all.log`, `builds.log`, `gates.log`, `ck22-greps.txt`; `logs/dev/` the probe's development reads, not of record), `json/`, `frames/` (3.3 MB of PNG stills, no video) |

## 0 · In brief

1. **cand13 regresses from cand12 on six members of CK-20, read here in both engines on the built candidate, each with cand12 beside it in the same run** (§2). The cause the bytes predicted is confirmed by a plant: `plant-child` (cand13 hearing child lists only, as cand12 did) passes D1, D2 and D5 where cand13 fails. All six were read at a 1-minute load of 4.4-8.8, with the cand12 control passing at the same load, so none is a load effect.
   - **D1, a script-animated ancestor.** The held slider comes apart from its card by up to **72.00 px** (Chromium) and **80.00 px** (WebKit) under a page loop writing the card's `translate`; by 25.5 and 13.3 px under a scroll-linked parallax; by **27.04 px** under the Carousel's own mechanism (`--member-scale` written inline, `scale: var(--member-scale)`), in both engines. cand12 reads 0.00 px on every member.
   - **D2, an early page loop.** With any page loop writing one text node a frame, **a 40 px insert above the held slider never arrives: its paint moved 0.0 px by +358 ms (Chromium) and +718 ms (WebKit), 43 glides started where one is due.** In WebKit, a 600 ms CSS scale transition on the card also glides (42 glides; the root held still while its card scaled), a member H13-complete's F4 predicts. cand12 passes all four.
   - **D4, the chord step.** On the act's frame the held slider is up to **100.72 px** off its painted place (`perspective(400px) rotateX(40deg)`, host 150 px below the origin, a 200 px insert); 14 of 18 members over 0.5 px, identical in both engines to the hundredth. cand12 reads 0.00 px on all 18.
   - **D5, the host's own size change** (a scrubbed NumberField 9 → 10 in a left-aligned row, `field-sizing: content`): its fixed leading edge moves 4.48 px in paint and a glide runs, Chromium. cand12 and `plant-child` 0.00. **WebKit: the scrub drive did not engage on any build** (§4 item 3).
   - **D9, a card scaled about the held control during the hold** (CK-04's gutter clause): after a scroll the held box paints 16.1 px from the viewport's edges against a 25.0 px gutter as the card paints it, both engines; scaled before the hold it lands on 25.0. cand12 25.0 in both cases. The cause is §P13-2 row 13: `h.fx` cached past what invalidates it.
   - The **loupe under `rotate: 10deg`** paints 147.6 × 331.1 px over a 140 × 76 box (`--lens-sy` ×4.3571; cand12 ×1.0600), Chromium, this seat's run of `paint13.mjs`. Its WebKit read is held.
2. **Members that fail on cand12 as on cand13, both engines (not regressions):** D3, a released host on its exit clock glides an ancestor's scale transition when an unrelated node is appended (1 glide, every build including `plant-child`); D7, `--motion-tempo: 0` or `-1` runs the re-render glide and the release carry 210.0 ms with 0 errors while CSS's `--spring-dock-duration` computes 0s; D8, a context-relative gutter (`2em` on a 14 px host: the held box stops at 28.0 px against the page consumer's 33.2 px; `4cqi` in a 400 px container: 16.0 against 28.0).
3. **CK-21 in WebKit, a member new with the registered read:** a consumer's `transition-all` on the held slider's host makes every read refuse (one `console.error` on default tokens) and the slider loses its inline grow (×1.0000, `--stage-reach "1"`). Chromium ×1.0600 with 0 errors; cand12 ×1.0600 in both engines. On the Button commit path cand13 reads 0 engage errors in both engines (cand12 logs its pass-12 false error in WebKit).
4. **CK-09 opens, both engines, a regression from cand12:** E-8's mirror finds three orphan `--engage-*` tokens on `:root`, `--engage-read-time`, `--engage-read-number`, `--engage-read-length` (18/1 per engine). P-E13 registered its private read properties inside the namespace the mirror law keeps for the envelope rows (§P1-6 CK-09: "`--rung-*` and `--stage-*` stay outside `--engage-*`").
5. **What holds, both engines:** E-2 164/0 (arms i,ii); E-3 22/0; E-5 56/0; E-9 85/0 with H7's PRM plant 32 red; E-12 101/0/1 and 100/0/2; E-13 36/0; E-10 217/1 Chromium (the clamp-scroller cut, 21.85 px, reproduced from c2) and 213/0 WebKit; E-11 261/0/5 both; C-E12's value family 57/0 both; C-A12's 67/72 both (the five stated non-counterexamples); C-A12's `xf,kind,anchor` 48/0 and `errs` 9/0 both; P-E12's origin cells 22/0 both; the idle bar at cand8's in the same run (§2.4). CK-25's frames read flat and restrained where the stage is not involved, and below grade on the two paints of item 1 (§3).
6. **The fixed point is not reached.** CK-20, CK-21 and CK-22 stay open on measurements, and CK-04 and CK-09 open on this candidate where cand12 had them closed. On §P13-8.3's rule (P-E14 on P-E13, or on P-E12 if cand13 regresses on rows cand12 closed that P-E14 cannot cure in place), **this seat reads two such rows (CK-04, CK-09) and six CK-20 members that cand12 passes**, for c4 to rule the base.

## 1 · Per CK row, cand13

A row closes only on this seat's own measurement in both engines; a row whose WebKit cell is held stays open. Loads are 1-minute, at a stage's start and end, from its log.

| row | Chromium (load) | WebKit (load) | state | reading |
|---|---|---|---|---|
| CK-01 | E-1 93/1/2: latch 54/55 (`dock`); ambient ENGINE LIMIT (13.8-12.4) | E-1 93/3: latch 54/55; ambient 1.73 against 1.26 at rest (< 2×); PRM 0.00 (7.8-8.9) | **OPEN ◇** | D2's latch, D3's amplitude and lane, A's reduce leg (§P13-6) |
| CK-02 | E-2 164/0 (11.3-11.5) | 164/0 (8.9-8.7) | **CLOSED** | O-103d (1) arms |
| CK-03 | inside E-2 | inside E-2 | **CLOSED** | |
| CK-04 | E-3 22/0; **D9 FAIL** 16.1 px against 25.0 | E-3 22/0; **D9 FAIL** 16.1 against 25.0 | **OPEN** | the reach's gutter cap passed by 8.9 px under a card scaled during the hold; cand12 passes both engines; a regression (§2.1 D9) |
| CK-05 | E-4 18/0: slider carry 12.30-12.37 px at 1051-1054 px/s; tabs, Sheet, sortable carry | E-4 15/0/4 (the Carousel's standing engine fact, O-103d (4)) | **CLOSED** | velocity printed, never gated (F-5 (a)) |
| CK-06 | E-5 56/0 | 56/0 | **CLOSED** | |
| CK-07 | E-6: no idle rung (S6 RETIRED) | the same | **CLOSED** | by the ruling, no measurement owed |
| CK-08 | E-7 6/1 on the cand13 tree: `data-engaged` one writer (`stage.ts`); `data-held` `useEngage.ts` and `GlassDock.vue` | 6/1, the same | **CLOSED** | `GlassDock.vue` is D2's named clause, as `§P12-2`. Chromium's first E-7 read HEAD's tree (§4 item 2) and is not of record |
| **CK-09** | E-8 18/1: **mirror orphans `--engage-read-time`, `-number`, `-length`** (5.5-5.4) | 18/1, the same (3.7-3.8) | **OPEN** | P-E13's three `@property` registrations sit inside `--engage-*` and show on `:root`; pass 12 read E-8 19/0 on cand12. A regression |
| CK-10 | E-9 85/0; PRM plant 32 red | 85/0; 32 red | **CLOSED** | |
| CK-11, 13, 14 | E-12 101/0/1 | 100/0/2 (no layout counter; the composer census reads a tree) | **CLOSED** | standing UNMEASURED cells |
| CK-12 | static: `tokenOf` and `easingOf` read figures and set none; the `-1` initials are sentinels; crest 2/2 | static the same; WebKit crest **held** | **CLOSED** | a static census row; the WebKit crest read is in the held list and is not needed for the census |
| CK-15 | inside E-10 whole 217/1 (the one fail is the clamp cut) | 213/0 | **CLOSED** | no hand-off cell fails |
| CK-16 | idle, same run: cand8 119.9 / 120.3, cand13 119.8 / 120.3 rAF+RO per s; ca6 120.0 both; rest 0; loop stops at release 2/2, `plant-loop` 0/2 | cand8 59.9 / 60.4, cand13 59.9 / 59.9; ca6 run; loop 2/2, `plant-loop` 0/2 | **CLOSED** | O-103f (1) and (3) |
| CK-17 | — | — | **OPEN ◇** | D2 |
| CK-18 | E-4's four surfaces | E-4's driven surfaces | **CLOSED** | |
| CK-19 | — | — | **OPEN ◇** | D3 |
| **CK-20** | E-10 217/1 (clamp scroller 21.85 px); D1, D2, D3, D4, D5 FAIL; lens ×4.3571; carry 41.47 px | E-10 213/0; D1, D2 (incl. card-scale), D3, D4 FAIL; D5 not driven; exit-side round 1 passes, rounds 2-3 and cand11's held | **OPEN** | §2.1 |
| **CK-21** | E-11 261/0/5; D7, D8 FAIL | E-11 261/0/5; D6 slider, D7, D8 FAIL | **OPEN** | §2.2 |
| **CK-22** | — | — | **OPEN** | §2.3 |
| CK-23 | numstat **199 files +5989/−1653, `src` 154 +3425/−1359** (this seat's `git apply --numstat`); CPU per frame and forced work measured (§2.4) | no CPU instrument (CDP is Chromium's); `rec` held | **CLOSED** | the row is the numstat, priced; the WebKit `rec` read is in the held list |
| CK-24 | E-1 `static` cells | the same | **CLOSED** | |
| CK-25 | CAP 18/0; frames read (§3) | CAP **held** | **OPEN ◇ and D5's** | D3's ambient clause; D5's: two paints below grade (§3); WebKit frames held |
| CK-26 | static: CSS change over cand12 is three private `@property` registrations and comment lines; no lighting layer, blur token or radius (O-87) | engine-independent | **CLOSED** | |
| CK-27 | every plant red on its cells: level 12, child 12, stale 3, noown 1, typedom 13, reachzero 1, loop 2, PRM 32; each §3 member red on cand13 or on cand12 | level 12, child 12, stale 3, noown 1, typedom 56, loop 2, PRM 32; **reachzero held** | **OPEN** | one WebKit plant cell not run |

**Closed: 17 of 27 (CK-02, 03, 05, 06, 07, 08, 10, 11, 12, 13, 14, 15, 16, 18, 23, 24, 26). Open: 10.** Of the open, CK-01, 17, 19 are held by D2 or D3; CK-25 by D3's clause and by D5's own paints; CK-27 by one held WebKit cell; **CK-04, CK-09, CK-20, CK-21, CK-22 by counterexamples on these bytes.** cand12's last score of record was 20/27 (`§P12-4`), with CK-04 and CK-09 closed.

## 2 · The counterexamples, measured

### 2.1 · CK-20 and CK-04: `held-battery.txt` §3 on the built candidate (`ce13c-probe.mjs`)

The held control is the E-13 slider scene's root, keyboard-engaged (the sentinel, then Tab), so no pointer rides the card. A film is one rAF chain requested after the stage's own, each frame read in a message posted from it. "Glides" counts distinct non-CSS animations on the root whose keyframes carry `translate`. Records: `logs/cand13-ce13c-chromium-d07d6f.log` (load 5.5-6.3), `cand13-ce13c-webkit-1fe1f6.log` (8.3-6.6), `cand12-ce13c-chromium-73f0c1.log` (4.4-5.5), `cand12-ce13c-webkit-eab0ae.log` (6.6-8.8), `plant-child-ce13c-*`.

| member | cand13 Chromium | cand13 WebKit | cand12 C / W | plant-child C / W | regression |
|---|---|---|---|---|---|
| D1 rAF loop writes card `translate` 0 → 80 px over 500 ms, loop started before the hold | **FAIL** max 72.00 px, median 32.99, 54 glides | **FAIL** max 80.00, median 16.00 | 0.00 / 0.00 | 0.00 / pass | yes |
| D1 scroll listener writes `translate = 0.3·scrollY`, 30 scroll steps | **FAIL** 25.46 px, 30 glides | **FAIL** 13.33 px | 0.00 / 0.00 | pass / pass | yes |
| D1 `--member-scale` 1 → 0.85 over 200 ms inline, card `scale: var(--member-scale)` (the Carousel's mechanism on the scene's card) | **FAIL** 27.04 px, 25 glides | **FAIL** 27.04 px | 0.01 / 0.01 | pass / pass | yes |
| D1 inline `scale` the same | **FAIL** 27.04 px | **FAIL** 27.04 px | 0.01 / 0.01 | pass / pass | yes |
| D2 a page loop writing a text node every frame, then a 40 px insert above | **FAIL** 0.0 px moved by +358 ms, 43 glides | **FAIL** 0.0 px by +718 ms | pass (40.0 px, 1 glide, settles 208.2 ms) / pass | pass / pass | yes |
| D2 the same insert, no loop (control) | pass, 1 glide, settles 208.3 ms | pass | pass / pass | pass / pass | — |
| D2 the loop, and a 600 ms card scale 1 → 0.9 | pass, 0 glides | **FAIL** 42 glides, the root's paint moved 0.0 px with its card | pass / pass | pass / pass | yes (WebKit) |
| D3 released (Tab on), card scale 1 → 0.9, unrelated node appended at frame 5 | **FAIL** 1 glide; on the stage at both reads | **FAIL** 1 glide | FAIL / FAIL | FAIL / FAIL | no |
| D3 the same, no record (control) | pass | pass | pass / pass | pass / pass | — |
| D4 18 members: two maps × host −200, 0, 150 px from the origin × inserts 40, 120, 200 px | **14 FAIL**: 0.70-100.72 px on the act's frame | **14 FAIL**, identical to the hundredth | 18 × 0.00 / 18 × 0.00 | — | yes |
| D5 NumberField scrub 9 → 10, left-aligned row | **FAIL** leading edge 4.48 px in paint, 0.0 in layout, 1 glide | NOT DRIVEN (no build engaged) | 0.00 / not driven | 0.00 / not driven | yes (Chromium) |
| D5 the same, centred row | pass, 0 glides | NOT DRIVEN | pass / — | pass / — | — |
| D9 card scale 1 → 1.25 about the held root during the hold, then a scroll | **FAIL** 16.1 px from the edges, bound ≥ 24.0 (gutter 20.0 × frame 1.25 − 1), `--stage-reach "1.06"` | **FAIL** the same | pass 25.0, reach 1.03175 / pass | — | yes |
| D9 scaled before the hold (control) | pass 25.0 | pass 25.0 | pass / pass | — | — |

D4's figures, Chromium = WebKit: `perspective(400px) rotateX(40deg)`: host −200: 0.23 (pass), 3.02, 11.19; host 0: 0.70, 8.91, 33.22; host 150: 2.08, 26.05, **100.72** px for 40, 120, 200 px. `perspective(600px) rotateX(25deg)`: −200: 0.10 (pass), 1.32, 4.96; 0: 0.17 (pass), 2.21, 8.29; 150: 0.26 (pass), 3.42, 12.79. The four passes are the 40 px cells at the mild setting and one at the steep, which is H13's sampled member. C-A13 §2.1's arithmetic and C-E13 D4's model are now paint (CONFIRMED).

**Also CK-20, read here:**
- E-10 Chromium `scroll · clamp scroller · remove below · none`: **21.85 px** on the act's frame (load 6.3-8.2), as P-E13-complete §2.1. WebKit passes it (213/0, load 10.7-4.2).
- **The two predicted paints** (`paint13.mjs`, Chromium, load 24.2-26.8; the same run shows cand12 clean): the loupe under `rotate: 10deg` ×1.0541 × **×4.3571**; the held slider under a sine-written card `translate`, **max 41.47 px, median 17.63, 137 of 145 frames over 2 px**, cand12 0.00. These were read at a high load; P-E13-complete read the same two at 8.4-11.4 (36.79 / 38.69 px), and D1 reads the class at 4.4-8.8 in both engines, so the class is not load-only. WebKit's `paint` is held.
- **Exit-side, WebKit, below load 8:** `rr-cand13-ce11` round 1 passes (`none` 10.6, `zoom125` 13.3 against 15.1 and 18.6; load 7.9), `rr-cand13-ca11` round 1 passes (7.4, 9.3 against 15.1 + 4 and 18.6 + 4). Rounds 2, and cand11's control, are held. H13-complete and P-E13-complete read this cell failing in 5 of 5 rounds; one passing round does not refute that, and the cell stays open with them.

### 2.2 · CK-21

| member | Chromium | WebKit | cand12 C / W | reading |
|---|---|---|---|---|
| D6 a consumer's `transition-all` (150 ms) on the held slider's host, default tokens | pass: ×1.0600, 0 errors | **FAIL: one `[glass-ui] engage stage` error, inline ×1.0000, `--stage-reach "1"`** | pass / pass | H13-complete F7 on the library: a false error on default tokens, and the paint it chooses. New with the registered read |
| D6 the same on a Button, three pointer commits | 0 engage errors | 0 engage errors | 0 / **errors** (cand12's Typed OM false error) | the commit path's reads do not land on a transitioned element here. The pop is E-2's paint read; this cell's computed-scale read saw no scale channel on either build and grades errors only |
| D7 `--motion-tempo: 0` | **FAIL**: glide and carry 210.0 ms, 0 errors, CSS 0s | **FAIL**, the same | FAIL / FAIL | `motionTempo()` maps ≤ 0 to 1 (`motionTempo.ts:39-40`); not a regression (since P-A7) |
| D7 `--motion-tempo: -1` | **FAIL**, the same | **FAIL** | FAIL / FAIL | as above |
| D7 `--motion-tempo: 1` (control) | 210.0 = CSS 0.21s | the same | pass / pass | |
| D8 `--space-section: 2em`, host 14 px, page 16.6 px | **FAIL**: the held box stops 28.0 px from the edges; the consumer lays 33.2 (−5.22) | **FAIL** the same | FAIL / FAIL | the host's `shape-margin` resolves the token in the host's context, the page padding in its own |
| D8 `4cqi`, host in a 400 px container | **FAIL**: 16.0 against 28.0 (−12.00) | **FAIL** | FAIL / FAIL | as above |

The harness's CK-21 cells hold on cand13 in both engines: E-11 261/0/5 (Chromium load 8.2-8.1, WebKit 4.2-6.3), whose census reads 0 engage errors on default tokens in every scene; C-E12's value family 57/0; C-A12's `e11v` 67/72, its 5 fails the stated non-counterexamples `calc(infinity * 1s)` and `1e-3s` (`§P12-2`); C-A12's `errs` 9/0. They do not drive D6-D8 or §P13-2 row 9's `calc()` fragments (H13-complete F6, both engines, of record), so CK-21 stays open on those.

### 2.3 · CK-22, the sentences against measurements

| where | sentence | read false by |
|---|---|---|
| `stage.ts:50-52` | "a running animation (an ancestor's, the host's grow, the stage's own glides) moves both alike and is never glided" | D1 (a script animation, every frame, both engines), D2 (the stage's own glide re-glided every frame until it never lands), D2 card-scale WebKit (a CSS transition), D3 |
| `stage.ts:39-43` | "every transform … carried as they paint, never modelled", "one Newton step for a projective map" | D4: up to 100.72 px; the step is a chord step |
| `stage.ts:197` (`paintedScale`) | "The scale `el` paints at along each axis: its painted size over its layout size" | the loupe ×4.3571 on the y axis under `rotate: 10deg` |
| `settle.ts:15-16` | "the script takes exactly the forms the consumer's type takes, in every engine" | D6 WebKit (a transition empties the read); H13-complete F6 (the consumer's `calc()` fragments, both engines) |
| `engage-stage.css:13`, `:15-16` (patch 9237-9240) | "(stage.ts `writeGeometry`)"; "one whose inputs were unreadable, reads 0" | `writeGeometry` does not exist; `writeReach` writes `"1"` (`stage.ts:283`), read here as `--stage-reach "1"` in D6 WebKit |
| P-E13 §7, C-2 | "under every transform between the control and the page"; "An ancestor's running animation is never glided (`hg13 anim`)" | D4, the loupe; D1, D2, D3 |
| P-E13 §7, C-2 | "the stage writes one inline property on it, `--stage-reach`" | it also registers three `--engage-*` names that E-8 reads as orphans on `:root` (CK-09) |

**Consumer greps at this HEAD** (`ck22-greps.sh`, `logs/ck22-greps.txt`, grep only, each sibling's own tree): `--spring-dock:`, `--spring-*-settle:`, `--space-section:`, `shape-margin`, `--stage-*`, `--engage-read-*`: 0 in atlas, bbnf-buddy, chicago, keyframes.js, slides, speedtest, value.js, fourier-analysis, sci-report; gregg's hits are all built stylesheets under `gregg/.shots/` (copies of glass-ui's tokens). `--motion-tempo:` written by a consumer: 0 outside those bundles. `field-sizing`: value.js `AdminTagsPanel.vue:77,90` (an input bar, not a NumberField). The library-Dialog site reproduces: speedtest `SubnetAddDialog.vue`, a held control at `:19` inside `<DialogContent>` at `:3` (speedtest `e2d9444d`). No held control sits beside a `transition-all` in any sibling. Self-checks on cand13's src: MT 4, FS 9, SD 1, SS 6, GS 2, SM 4, ST 7, RD 5.

### 2.4 · CK-23 and CK-16, the cost

**CPU per frame held still** (C-E11's cost cell, Chromium CDP, cand8 / cand11 / cand12 / cand13 twice, interleaved, `logs/cost-bar-chromium.log`, **load 15.8-14.8**), script ms a frame for `none` / `zoom125` / `deep`:

| build | round 1 | round 2 |
|---|---|---|
| cand8 | 0.042 / 0.068 / 0.071 | 0.065 / 0.064 / 0.070 |
| cand11 | 0.113 / 0.157 / 0.214 | 0.108 / 0.127 / 0.207 |
| cand12 | 0.129 / 0.154 / 0.226 | 0.146 / 0.114 / 0.164 |
| cand13 | 0.145 / 0.101 / 0.100 | 0.108 / 0.085 / 0.089 |

At this load the spread is wider than P-E13-complete's; the order holds on `zoom125` and `deep` (cand13 below cand11 and cand12, 0.02-0.04 ms above cand8), and on `none` cand13 sits inside cand12's spread. At rest every build reads 0.009-0.030 ms. 0 layouts and 0 recalcs a second held still on every build.

**Forced work during a held drag** (D10, Chromium CDP, 60 pointer moves over about 1.2 s, two rounds each):

| build | layouts | style recalcs | layout ms | recalc ms | script ms |
|---|---:|---:|---:|---:|---:|
| cand8 | 362, 364 | 362, 364 | 38.3, 40.2 | 141.4, 147.7 | 12.0, 13.0 |
| cand11 | 362, 360 | 362, 361 | 29.6, 31.0 | 109.0, 112.9 | 13.7, 14.2 |
| cand12 | 360, 364 | 361, 364 | 34.2, 35.3 | 123.7, 125.8 | 15.8, 16.1 |
| cand13 | **468, 470** | **647, 650** | 37.0, 40.7 | 129.8, 141.8 | 16.5, 18.1 |

cand13 forces about 30 % more layouts and 79 % more style recalcs than every other build during a drag (the thumb's own style writes reaching `onMutation`, C-E13 CK-23 (i)). Their durations sit inside the builds' spread here. Load 5.5-6.6 (cand13 at 23.1 in its second run, the figures unchanged). The per-record cell (`rec13.mjs`, Chromium) reads as P-E13-complete §5: below the 0.5 µs floor per record on every build.

**Idle bar** (O-103f (1), same run): Chromium C-A9's cell cand8 119.9 / 120.3, cand13 119.8 / 120.3 rAF + RO per s, 0 layouts, 0 recalcs; C-A6's cell 120.0 both, 0 after Escape; WebKit 59.9 / 60.4 against 59.9 / 59.9.

## 3 · Gestalt (CK-25), from this seat's own frames

Frames: `C-E13c/frames/cap/cand13/cand13-chromium-{fine,coarse}.png` (CAP 18/0), `frames/ce13c/`, `frames/paint/`, `frames/h13still/`, `frames/glance/`. WebKit's CAP, glance and paint are held.

- **Where the stage is not involved the set reads at grade, as pass 12 left it.** Flat and restrained, as O-87 asks: one hairline ring on engagement, no glow, no stacked shadow, no added lighting layer. Button ×1.033 pressed and ×1.061 committed; Switch ×1.059 with its thumb's travel; accordion ×1.040; the presented Dialog ×1.052; the held slider ×1.060 in place with the loupe above its thumb. The dark Button's warm halo remains, and the ambient exemplar is static in every column (D3).
- **The held slider under a script-moved card** (`frames/ce13c/cand13-chromium-d1-raf-translate-act.png`, its card outlined): the card's outline has moved 19.2 px down and the slider still sits where it was, half out of its housing, crossing the outline's top edge. In WebKit the same still reads 38.1 px. That is a held object coming apart from what holds it, against D-1's weight and O-87's restraint. cand12's frame of the same scene keeps the slider in its card.
- **The loupe under a rotated card** (`frames/paint/cand13-chromium-lens-rotate10.png`): the tilted track carries a loupe drawn as an upright pill about four times its height, hung below the track and cut by the viewport, its readout a vertical band. That is a broken object, not a refinement.
- **The H13 stills** (`frames/h13still/`, `frames/glance/`): the rotated card, the anchoring insert and the Dialog insert each read 0.00 px on the mutation's frame. The pass-12 defects those stills recorded are cured as they paint.

CK-25 stays open: D3's ambient clause, the two frames above, and WebKit's held frames.

## 4 · Process and defects of the method

1. **Shared locks.** Every harness witness takes the harness's own browser lock (`lib.mjs` `acquireLock`, one D5 harness browser machine-wide), shared with the sibling critic C-A13c. The first held-battery stage waited 25 min for it and hit the witness deadline (1500 s, counted from before the lock), a harness-invocation reason: `run.sh` was replaced by rename to pass `--deadline 5400`, and the stage was re-read (`-d07d6f`, the read of record). The WebKit lock waited 71.8 min behind C-A13c (12:01:19 → 13:13:09).
2. **E-7's static arm reads the worktree's source.** The worktree stood at HEAD after the builds, so the first Chromium E-7 (4/3) read HEAD's tree. P-E13 was applied to the worktree (tree `30f51077c3ec`) for the rest of the run, E-7 was re-read (6/1), and WebKit's E-7 read cand13's tree.
3. **D5 in WebKit** did not engage the NumberField's scrub on any build (the value stayed 3 and no frame was engaged). It is the drive's limit, not a reading of the candidate, so D5's WebKit cell stays open.
4. **The probe changed once, by rename,** in its stills part only (the card outlined; numbers printed), after Chromium's D cells were read. Every D cell's code is the same in both engines (`NOTES.txt` 09:3x).
5. **The refusal.** WK-1 ran 45 stages and stopped at its 80-min rule. WK-2 was refused at admission with the kernel zone at 8.81M. The queue stopped on it and no run was retried. Per the charter: stop, record, return PARTIAL.
6. **Fences.** Writes in the checkout only under `docs/tranches/BL/design/engagement/` (this file and `pass-13/C-E13c/`). No source edit and no git write in the checkout. The worktree `.claude/worktrees/bl/D5/p13c/C-E13c/wt` was removed with `git worktree remove --force` and its parent by `rmdir`; scratch removed. Nothing under `~/.claude` was read; the guard was only executed. Sibling repos were read by `grep` over their own trees only. No find, fd, rg, du or tree walk over `/`, `~` or `/Users`. Every build, gate and browser run went through `guarded` (WebKit only inside `--exclusive webkit`), never `--light`, headless shell, no GPU arguments, one heavy run at a time, one browser per witness with a context per cell, pages, contexts and browsers closed in a `finally`.

## 5 · Held (the next completion runs `C-E13c/held-wk.txt` unchanged)

WebKit, 23 stages: `plant-reachzero-e11` (CK-27); the exit-side re-reads, cand13 round 2 (`ce11`, `ca11`) and cand11's control (CK-20); the pass-11 critics' paths (`ce11` ×3, `ca11` ×2); the older instruments (`ce9`, `ce9c lensfilm`, `ca9`, `crest`, `tip`); `rec`, `paint`; the stills (`h13still`, `glance`, `zglance`, `stills`, `ca12 still`); CAP (CK-25). With them in hand CK-27 can close; CK-20, 21, 22, 04, 09 cannot, on these bytes.

## 6 · For c4 and P-E14 (classes, no row added)

1. **§P13-7 item 3 is now paint, both engines:** a cure that glides records and leaves time alone glides an animation built from records (D1, the Carousel's own mechanism among them) and cannot finish a glide while any page loop writes (D2). `plant-child` confirms the mechanism: hearing attributes and text is what brings both in.
2. **WebKit's animation sample between rAF and a posted task** (H13-complete F4) turns a CSS transition into a record-heard move once a page loop writes every frame (D2 card-scale, WebKit only).
3. **A private name inside a public namespace:** the read's `@property` registrations sit in `--engage-*`, which E-8's mirror forbids (CK-09).
4. **A frame cached past what invalidates it** (D9) is a CK-04 counterexample in both engines, no longer PLAUSIBLE.
5. **Not regressions, still open:** D3 (the released host), D7 (`motionTempo()`'s ≤ 0 → 1), D8 (the context-relative gutter).
6. **The base:** cand13 regresses from cand12 on CK-04, CK-09 and on D1, D2, D4, D5 under CK-20, and cures pass 12's rotate, percent, Dialog, attribute-kind and anchoring members and its WebKit default-token error. §P13-8.3 leaves the base to c4.
