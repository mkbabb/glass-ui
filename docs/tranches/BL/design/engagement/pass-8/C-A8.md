# D5 · pass 8 · C-A8: critic of the candidate A+E (HEAD + P-E8.patch)

| field | value |
|---|---|
| seat | C-A8, one of pass 8's two fresh critics (`§P7-8.3` wave 3). I authored no D5 seat in passes 2-8 and was not a critic in passes 3-7 |
| model | `claude-opus-5-5`, asserted from my own system identity |
| verdict | **ADVANCE, not converged, not clean. 21 of 27 rows closed (78 %).** Open: CK-01, 17, 19 and 25 (held by D2 or D3), and **CK-20 and CK-22 (D5 can build)**. P-E8 builds the place-paint invariant on every cell H8 reads, in both engines, and the pass-7 construction fails those cells. Off H8's cells the invariant breaks on four paths. Two of them are the library's own. A Slider in the library's **Dialog**, keyboard-engaged and then dismissed, paints at full opacity over the fading plate and drops onto it in one frame (step 0.73-0.90, both engines). In **WebKit, the keyboard path under a `FadingScroll` feather** paints 0.58 of its place (4 reads; the focus-ring hypothesis is refuted). Also: a one-frame body trail on every Chromium scroll, and a re-render glide that starts 20 % short under a scaled ancestor. **This is not the fixed point** |
| candidate | HEAD `10f5a67e5` + `pass-8/P-E8.patch`. HEAD is docs only past P-E8's base: `git diff --stat v10.1.0 HEAD -- src` is empty, and `release/10.1.1`, `10.1.2` and `10.1.3` are not ancestors. sha1s checked: `P-E8.patch` `5dc4d930…`, `P-E8-inplace-loupe.patch` `fdccd7f4…`, `E8/probe-loop-variant.patch` `a6060049…`, `pass-7/P-A7.patch` `e6e42ba3…`, `pass-7/P-E7.patch` `a6c82db1…`. `git apply --check` is clean; 198 files |
| rulings | INBOUND re-read at start (mtime 2026-10-29 11:46). Its last row is O-112, which belongs to W-G, not D5. The last D5 row is still O-103d. FORMATION-PROGRESS read to "D5 p8 H8 banked … P-E8 running" and the 10.1.3 fix-7 line. Nothing arrived mid-pass. Q-1 (c), Q-4 (b) and F-5 (a) apply as defaults |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5 (playwright 1.61.1), headless shell, imported from `glass-ui/node_modules/playwright`, no GPU arguments. **Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox)** on every row; each Safari cell is read against this seat's guarded WebKit run |
| harness | H8's harness, unedited (`fb6f3cda`), on the harness's own scene app (`310d45686fce`). Builds come from my worktree `.claude/worktrees/bl/D5/p8/C-A8/wt`, now removed. My own cells are in one file, `C-A8/probe/ca8-probe.mjs`. All of them run on the harness's own app except `dlg`, which needs a Slider inside the library's Dialog. That cell runs on a probe fork, `C-A8/probe/App-dlg.vue`, which is the harness app plus one `<Slider>` in the `presented` Dialog, and every header names the fork |
| WebKit | **One** `guarded --exclusive webkit --timeout 90` acquisition. Queued 13:51 (the guard process start time; §6 explains why the chain log's header reads 14:19). Admitted 14:58:25, a 67-minute wait, under 90. Released 15:47:28, exit 0. All 33 queued stages ran to their end, plus two `feather-re` re-reads and the `trailstill` instrument check. NAV_CAP 60 was in force; no page closed outside it |
| load | Chromium 12:09-13:51 at 1-minute loads 6-37 (other seats' batteries). WebKit 14:58-15:47 at 4.5-11. Every stage log opens and closes with the 1/5/15-minute load, and every cell line carries its own |
| records | `C-A8/`: runners (`builds.sh`, `stages.sh`, `stages-extra.sh`, `chain-chromium.sh`, `chain-webkit.sh`, `ck22-greps.sh`, `static.sh`), the probe and its fork (`probe/`), `logs/` (one per stage and engine), `json/`, `glance/` (`cand8/` CAP sheets and 432 frames; `loupe/{cand8,plant-cand7,probe}/`; `probe/`: the ancestor, Dialog, feather and trailstill stills) |

## 0 · In brief, A's rows first

1. **CK-12 closes on my reads.** The crest is the register's row in paint. I grade it against the row itself, read separately from the crest the face resolves:
   - the Button (a stateless command) peaks at ×1.0600 in Chromium and ×1.0599 in WebKit, against `--scale-engage` = 1.0600;
   - the selectable Chip peaks at ×1.0400 and ×1.0399, against 2 − `--scale-press` = 1.0400;
   - the `crest` plant (A7's pass-6 figures) reads ×1.0200 on both faces and **fails 2/2 per engine** (`logs/crest-*-chromium.log`, `logs/plant-crest-webkit-ca8.log`).

   E8 mints no figure. `--held-scale-x/-y` are the grow, published once. The loupe's `1px solid var(--glass-border-floating)` is the library's floating hairline idiom (`utilities/components.css:21`), and the window's `calc(var(--loupe-ring) - 1px)` follows from that border.
2. **CK-22 stays open, on two counts.**
   - **(a) Stale rows outside the supersede list.** P-E8 §6 "supersedes every per-pass row" and lists sources from pass 2 onward. Pass 1's MIGRATION rows are neither listed nor retired by name: `pass-1/P-A.md` §7 M-A1..M-A8, `pass-1/P-B.md` §7 and `pass-1/P-E.md` §7 rows 1-6. Nor is the pass-2 floor's `pass-2/F5.md` "Migration" list. P-E2 §4 says only that "the A2 rows stand beneath these"; it never retired pass 1. Three of these rows contradict the candidate:
     - `P-E.md` §7 row 3 says an engaged Slider "escapes ancestor clipping, stacking and `overflow`" and "recedes the world behind the veil";
     - row 5 says `/motion` "gains `engageStage`, `flingStage`, `releaseStage`, `useEngageStage`";
     - `P-A.md` M-A5 says the slider grows "only while `[data-held]` on a fine pointer, no longer on … keyboard focus", which contradicts C-7.

     This is the stale-row class that held CK-22 open in pass 7, one pass further back.
   - **(b) C-2's consumer sentence promises more than the bytes hold.** It reads: "a scroller or card that clips, rounds, fades or scales it at rest does the same while it is engaged". That is false for an ancestor's opacity (the Dialog's own fade, item 4), for an ancestor `clip-path`, and for rotation.

   **What holds:**
   - My copy of P-E8's grep script reproduces `E8/logs/ck22-greps.txt` line for line at HEAD `10f5a67e5`. The only difference is value.js's HEAD (`e38be1ea4` → `b3d5d73f0`, a live session; grep only).
   - M-20 is restated on the right population (C-28). I checked each mount: atlas `<GlassAurora>` at `Aurora.vue:150` inside a `.aurora { pointer-events: none }` wrapper (`:170`; the property inherits); speedtest `App.vue:48` with `pointer-events-none` at `:51`; keyframes.js `HeroAurora.vue:25` with it at `:27`.
   - The only `Aurora` imports from glass-ui in the nine siblings are atlas's two (`Atmosphere.vue:65` is its own wrapper, `Aurora.vue:67`).
   - Every named retirement is in §6.2: P-E2 §4 rows 1, 2 and 4, E-M7's `"every"`, E-M8's `true`, M-24.

   **A records defect, not a row's:** `E8/ck22-greps.sh` computes its VX and HS summary columns with `n -- '<pattern>'`, which passes `--` as the pattern, so those columns print 0 whatever the tree holds. The table's figures still hold. My own grep finds atlas's 2 `--veil-x/-y` writes and 0 readers, and 0 `--held-scale-*`/`--stage-*` hits in any sibling (`logs/ck22-greps-columns.txt`).
3. **CK-25 from my own frames** (§3, CK-25):
   - **A's items read as pass 7 left them.** The committed Button reads ×1.059 (light) and ×1.056 (dark) in the coarse CAP set, against pressed ×1.032. The Switch commits and the accordion's ×1.039 pop are there.
   - **The lens is no longer a knob, in both engines.** The fill ends on a straight cut at the window's centre (`e8-probe tip` spread 0.00 px, 4/4 per engine; the pass-7 construction 3.73-3.87 px in Chromium and 3.60-3.64 px in WebKit, 4/4 FAIL). The band is ×1.600 = k max.
   - **At a scroller's top edge the loupe paints whole:** 81 of 81 rows at the edge and mid-box, 4/4 per engine. The pass-7 construction reads 3 / 5 of 81 at the edge and 48 of 81 mid-box.
   - **The housing.** Its hairline is there but faint in both themes. In my edge frame the paragraph behind the card shows through the housing and across the magnified band (`glance/loupe/cand8/e13-chromium-clipstale-edge-fine-loupe-whole.png`). That is legible but busy: glass over text, not yet a lens's own clear field.
   - CK-25 stays open only on D3's static ambient exemplar.
4. **CK-20: the invariant holds on H8's cells and breaks off them.**
   - **H8's clip family is green and its plants are red, in both engines.**
     - E-10 is **58/0/0 per engine** on the candidate. Feather ratio of ratios: Chromium 1.02 / 0.95, WebKit **0.58** / 0.98. Radius 0 / 0 px². Scale 0.0 px at ×1.060. Film 0 px².
     - The pass-7 construction fails 7 of 14 in Chromium and 6 of 14 in WebKit (feather 1.38-1.39 / 1.16; radius 221 / 200 and 201 / 184 px²; scale 52.2 / 48.9 and 28.7 / 28.7 px; the wheel film in Chromium only).
     - My `nomask` plant (the candidate with its masks not written) fails both feather cells at 1.38-1.39 / 1.16 in both engines, so the cell sees the candidate's mask.
   - **Counterexamples off H8's cells, each reproduced:**
     - **The library's Dialog, dismissed under a keyboard-engaged Slider** (`dlg`). The released host stays promoted on its exit clock while the plate fades, paints at opacity 1 over it, then drops to the plate's opacity in one frame. Escape, 40 ms, Escape:
       - Chromium: mismatch 0.69 at +177 ms, step 0.73 at +188 ms;
       - WebKit: 0.72 at +186 ms, step 0.78 at +198 ms.

       A click on the scrim:
       - Chromium: 0.86 / 0.90;
       - WebKit: 0.87 / 0.90.

       The Chromium smoke run read 0.68 / 0.73 and 0.89 / 0.91. The probe reads 0.00 / 0.00 on all four. A one-frame drop of 0.73-0.90 in opacity on an engagement's release is a D-1 discontinuity on the library's own path. The Dialog plate writes `opacity: 1 − p` from its `present` spring (`DialogContent.vue:121-127`).
     - **WebKit keyboard feather ×0.58** (P-E8 §0 item 3). E-10 reads it three times (0.58, 0.58, 0.58) and my two-sided cell once more (0.584). My cell reads 0.584 again with the focus ring suppressed, so **the focus-ring hypothesis is refuted**. Chromium reads 1.02 and the WebKit touch path 0.98. The probe reads 0.991 and the `nomask` plant 1.391. At the keyboard promotion the control under a `FadingScroll` loses 42 % of its visibility in one frame, which is a CK-20 discontinuity in WebKit. H8's cell is one-sided (≤ 1.10), so it passes this.
     - **The scroll trail in Chromium** (`trail`, video). Per frame I take the thumb's ink centroid minus a marker's in the same scroller, over 14 wheel ticks of 3 px.
       - The promoted body trails its place by **2.7-3.0 px on 9 of 9 engaged films**: wheel over the control, wheel elsewhere in the scroller, and page scroll. The offset holds through the drive and returns to ≤ 0.3 px when the scroll stops.
       - Released films read ≤ 0.2 px.
       - On the same drives the pass-7 construction reads ≤ 0.5 px (anchored, its body moved with the scroll) and the probe ≤ 0.5 px.

       So the anchor deletion moved the body onto the stage's resize step, one compositor frame behind its place. That breaks "in the same frame its place moves". H8's film cell cannot see it, because clip and body move together and nothing escapes above the card. The 8 px-tick drive does not separate the builds (2.2-11.1 px candidate, 2.3-2.5 pass-7, 3.0-3.2 probe; released 0): it is reported, not graded. **WebKit: UNMEASURED by this instrument.** The pass-7 construction reads the same persistent 13.3-13.6 px there, and `trailstill` puts the host's centre on its footprint's to 0.00 px on the main thread for both builds. The paint read is confounded in WebKit, not the body (§5 item 4).
     - **The re-render glide under a scaled ancestor** (`glidescale`). A 40 px block is inserted before the control's row while it is keyboard-promoted inside a `scale: 0.8` scroller. The body moves 5.25 px (Chromium) and 5.42 px (WebKit) in the insertion's frame, against 1.64 / 1.52 px for the same insertion unscaled. Cause, from `stage.ts`: `glide()` animates `translate` with `composite: "add"` after the host's inline `transform: scale(0.8)`, so the offset is scaled by 0.8 and the glide starts 20 % short of the place last painted. The probe reads 1.43 / 1.22.
     - **Ancestor kinds P-E8 names as uncarried (§8 gap 2)**, measured (bound 0.90..1.10):

       | ancestor | Chromium | WebKit |
       |---|---|---|
       | opacity 0.5 (the Dialog's fade) | ×1.966 | ×1.984 |
       | `clip-path: inset(0 50% 0 0)` | ×1.475 | ×1.472 |
       | `rotate: 4deg` | ×2.202 | ×2.554 |

       Under rotation the host carries `matrix(1.0015, 0, 0, 2.2462, 0, 0)`. The painted scale is read from the rotated bounding box, so the control is drawn unrotated and 2.25× tall (`glance/probe/cand8-chromium-ancestor-rotate-engaged.png`). The probe reads 1.010 / 1.004 / 1.030 in Chromium and 1.001 / 1.016 / 1.118 in WebKit.
5. **CK-27 closes.** Every new cell has a plant that fails it, in both engines (Chromium / WebKit):
   - `plant-cand7`: E-10 7 / 6 of 14, E-13 `loupe whole` 4/4, `tip` 4/4;
   - `loupe6`: E-13 `k max` 4/4;
   - `chipfaint`: E-12 chip 2/2 (NO ANSWER, 0.0 % of pixels);
   - `prmY`: E-9 28 / 28;
   - H7's PRM plant: E-9 32 / 32;
   - `nomask`: feather 2/2;
   - `crest`: 2/2.

   Two of H8's cells are blind to the defects above. The feather cell bounds only overpaint, so 0.58 passes. The film cell reads only paint escaping above the card, so a body that trails its place inside the card passes. Both go to §5. The row's text ("each new cell with a plant that fails it") is met.
6. **The reduce legs.** E-9 is **85/0 per engine**. `prmY` fails 28 cells and H7's PRM plant 32, per engine. The loupe drops its grow transform under reduce (`slider/styles.css`, the reduce block).

   **The ambient reduce leg is not built.** WebKit's E-1 reads 0.00 levels under reduce, and 1.72 levels against 1.25 at rest without it. Chromium is an engine limit (the `css` substrate). This waits on D3's lane.

## 1 · Builds and static cells

| what | result | record |
|---|---|---|
| 10 harness builds: `cand8`, `probe`, `dlg-cand8`, `dlg-probe`, `plant-cand7`, `plant-loupe6`, `plant-chipfaint`, `plant-crest`, `plant-prmY`, `plant-nomask` | exit 0 each. After every revert the tree hash read back as the candidate's (`3fc6f0dcf47f`, tracked diff plus untracked files) | `logs/builds.log`, `logs/build-*.log` |
| CK-23 (`git apply --numstat`) | **198 files +5375/−1644; src 153 +3380/−1355**, P-E8's figure to the line. The probe over the candidate: 3 files +59/−481 | `logs/numstat.txt` |
| P-1 / E-1 deletions (P-E8's `static.sh`, re-run) | **candidate: DELETED.** `position-visibility` 0, `@property --veil-x/-y` 0, `var(--veil-x\|y)` readers 0, the stage's anchor pin 0, the pass-7 deletion names 0. **The pass-7 candidate (the plant): PRESENT**, at 2 / 2 / 16 / 11 | `logs/static-deletion.txt` |
| CK-22 greps | reproduce P-E8's line for line (only value.js's HEAD differs) | `logs/ck22-greps.txt`, `logs/ck22-greps-columns.txt` |

I did not re-run build, typecheck, the full vitest or `demo:dist:build`. P-E8 ran them green (P-E8 §2). I state it; I do not score it.

## 2 · Battery of record, both engines

Chromium ran one stage per `guarded` call (`logs/chain-chromium.log`). WebKit ran inside the one acquisition (`logs/chain-webkit.log`). Loads are the 1-minute load at stage start. P/F/U = pass / fail / unmeasured.

| witness | Chromium P/F/U · load | WebKit P/F/U · load | every fail, whose |
|---|---|---|---|
| E-1 | 93/1/2 · 32.9 | 93/3/0 · 5.2 | `dock` latch 54/55 (D2). Ambient: Chromium UNMEASURED (engine limit); WebKit 1.72 vs 1.25 at rest (D3's amplitude), reduce 0.00 (the lean lane, D3) |
| E-2 `--commit-arms i,ii` | **164/0/0** · 34.3 | **164/0/0** · 4.5 | — |
| E-3 | **22/0/0** · 28.0 | **22/0/0** · 7.0 | — |
| E-4 | **18/0/0** · 36.9 | 15/0/4 · 6.4 | WebKit's 4: the Carousel engine fact (O-103d (4)). Velocity printed on every slider read. Slider carry: Chromium 11.20-12.35 px at 880-1050 px/s, at load 36.9-24.2; WebKit 12.53-13.64 px at 1333-1429 px/s. Sortable 21.07 px at 931 px/s / 30.28 px at 1333 px/s. Tabs drag 37.31 / 41.72 px. Sheet 250 px, 8 of 8 landing on −35 |
| E-5 | **56/0/0** · 22.1 | **56/0/0** · 6.6 | — |
| E-6 | 4/2/8 · 28.1 | 2/2/8 · 6.1 | `s6 present`: S6 RETIRED (O-103d (2)) |
| E-7 | 6/1/0 · 25.0 | 6/1/0 · 5.9 | `data-held` in `GlassDock.vue` (D2's named clause) |
| E-8 | **19/0/0** · 34.8 | **19/0/0** · 5.7 | — |
| E-9 | **85/0/0** · 23.6 | **85/0/0** · 6.4 | — |
| E-9 `--prm-plant` | 40/32 · 19.6 | 40/32 · 7.0 | H7's plant, red as it must be |
| E-10 | **58/0/0** · 10.0 | **58/0/0** · 7.1 | — (on its cells; §0 item 4 for the paths it does not read) |
| E-10 feather re-reads | — | 2/0 and 2/0 · 7.8, 8.9 | keyboard ×0.58 both times, touch ×0.98 |
| E-11 | 11/0/5 · 12.0 | 11/0/5 · 5.7 | the five UNMEASURED: a token not read on that control's commit path (A's shape; H8 §5) |
| E-12 | **102/0/0** · 11.1 | 101/0/1 · 7.1 | WebKit `rest layouts`: no counter (engine fact). Chip answers 50.8 / 51.1 % (Chromium), 50.9-51.5 / 47.0-48.3 % (WebKit) of pixels ≥ 4 levels. The slider's wheel and consumer-anchor cells pass |
| E-13 | **8/0/0** · 8.8 | **8/0/0** · 11.0 | — |
| CAP | 18/0 · 11.7 | 18/0 · 6.0 | the glance set |
| `e8-probe tip` | **4/0** · 12.1 | **4/0** · 9.4 | — |
| `ca6-probe idle` | REPORT: 120.3 rAF and RO callbacks/s engaged, on- and off-screen; 0 layouts, 0 recalcs; 0 at rest and after Escape | REPORT: 98.0/s; no layout counter | stated, not bounded (§P6-7 item 11) |
| `ca8-probe` (cand8) | 4 pass, 8 fail · 8.1 | 2 pass, 10 fail · 5.2 | §0 items 1 and 4 |
| `ca8-probe dlg` (fork) | 0/2 · 8.0 | 0/2 · 9.6 | §0 item 4 |

## 3 · The rows

Real Safari is UNMEASURED (owner's safaridriver checkbox) on every row. ◇ marks a row that cannot close inside D5.

| CK | Chromium | WebKit | status |
|---|---|---|---|
| 01 | latch 54/55; ambient engine limit | latch 54/55; ambient 1.72 vs 1.25; reduce 0.00 | **OPEN** ◇. Closed by D2's `dock` adoption (or a dock scene with D2's leave), D3's amplitude, and D3's lean lane, with A's reduce write on that lane |
| 02 | E-2 164/0; E-9 85/0; `prmY` 28 FAIL | same | **CLOSED** |
| 03 | E-2's mount and arrival cells within 164/0 | same | **CLOSED** |
| 04 | E-3 22/0 (keyboard ×1.060; `data-held` 0; no `grabbing`) | 22/0 | **CLOSED** |
| 05 | E-4 18/0, velocity printed on every read, loads 24-37 | 15/0/4 (Carousel engine fact) | **CLOSED** on F-5 (a): every slider read carries ≥ 11.20 px at ≥ 880 px/s |
| 06 | E-5 56/0 | 56/0 | **CLOSED** |
| 07 | S6 RETIRED (owner's words, O-103d (2)) | same | **CLOSED** |
| 08 | E-7 6/1: `GlassDock.vue` `data-held`, D2's named clause | same | **CLOSED** (the charter names the attribute it does not own) |
| 09 | E-8 19/0 | 19/0 | **CLOSED** |
| 10 | E-9 85/0; H7's PRM plant 32 FAIL | same | **CLOSED** |
| 11 | E-12 102/0 | 101/0/1 | **CLOSED** |
| 12 | crest in paint ×1.0600 / ×1.0400 against the register rows; `crest` plant 2/2 FAIL | ×1.0599 / ×1.0399; plant 2/2 FAIL | **CLOSED** |
| 13 | E-12's forced-colours cells (the `fc` cells, two per scene, 68 lines) within 102/0. My battery has no reduced-transparency cell: neither engine's Playwright emulates it. That is the engine's limit as the row states it, the same reading as passes 6-7 | the same `fc` cells within 101/0/1 | **CLOSED** |
| 14 | E-12 coarse cells (44 px slop) and E-3's phone arms | same | **CLOSED** |
| 15 | E-10 singleton fwd 119 / rev 123 frames, max 1 engaged; hand-off drop 0.0070 against 0.0080 | max 1; drop 0.0085 / 0.0097 against 0.0098 | **CLOSED** |
| 16 | rest 0; engaged 120.3/s, 0 layouts | rest 0; 98.0/s | **CLOSED** by its letter (the idle loop is stated, not bounded) |
| 17 | — | — | **OPEN** ◇. D2: the dock's `:active` presses name their `touchstart` listener or move to the door's mark |
| 18 | E-4 slider, sortable, Sheet and tabs on `RELEASE_RULE`; the Sheet lands 8 of 8 | same | **CLOSED** |
| 19 | the ambient exemplar static (engine limit) | 1.72 vs 1.25, not 2× | **OPEN** ◇. D3's amplitude and the lean's own lane |
| 20 | H8's 14 cells green, the pass-7 construction 7 FAIL. **Counterexamples:** Dialog dismissal (step 0.73 / 0.90); scroll trail 2.7-3.0 px on 9 of 9 films (pass-7 and probe ≤ 0.5); glide under scale 5.25 px against 1.64; ancestor opacity / `clip-path` / rotate ×1.97 / ×1.48 / ×2.20 | H8's 14 green, the pass-7 construction 6 FAIL. **Counterexamples:** keyboard feather ×0.58 (4 reads); Dialog dismissal (step 0.78 / 0.90); glide 5.42 against 1.52; ancestors ×1.98 / ×1.47 / ×2.55; trail UNMEASURED (instrument) | **OPEN**. D5 can build. §0 item 4 |
| 21 | E-11 11/0/5; crest inputs loud (H8's E-11 cells) | 11/0/5 | **CLOSED** |
| 22 | one table, M-20 on the mounts, greps reproduced; **pass-1 and pass-2-floor rows not retired; C-2 overclaims** | — | **OPEN**. D5 can build. §0 item 2 |
| 23 | 198 files +5375/−1644, src 153 +3380/−1355 | — | **CLOSED** |
| 24 | E-1's `static` cells within 93/1/2 | within 93/3/0 | **CLOSED** |
| 25 | lens, edge and tip cells green (8/0, 4/0); the frames below | same | **OPEN** ◇. D5's lens items close. D3's ambient exemplar holds the row |
| 26 | no lighting layer; the loupe's change is a deletion (the fill radius), an existing hairline token, a popover; no blur token touched | same | **CLOSED** |
| 27 | every new cell's plant red (§0 item 5) | same | **CLOSED**, with two cell blind spots recorded (§5 items 1-2) |

**21 of 27 closed (78 %). Not a clean pass.** It equals pass 7's ruled 21/27, but on different rows. CK-25's buildable items closed, and CK-25 is now held only by D3. CK-20 and CK-22 carry new counterexamples: four paths that break the invariant, and a stale-row set one pass further back than pass 7 looked.

### CK-25, the gestalt from my frames

- **The coarse and fine CAP sheets** (`glance/cand8/cand8-{chromium,webkit}-{fine,coarse}.png`) read coherent and flat, as O-87 asks:
  - the press as a slight darkening and squish (×1.032), the commit as a pop (Button ×1.059, Switch ×1.059 with the thumb's travel, accordion ×1.039);
  - the held slider at ×1.060 with its loupe;
  - the sortable lift as a soft shadowed row.
- **The light theme is better than iOS-27 grade in restraint and about at grade in legibility.**
- **The dark theme's weak points are still the 10.2.0 token wave's:** the Button's warm halo, and the near-black loupe housing, where the dark fill reads dim.
- **The loupe at k max** (`glance/loupe/cand8/e13-*-slider-*-loupe.png`). The magnified fill ends on a clean vertical cut at the centre, which reads as a value on a ruler, not a knob. The ends dissolve. The housing's hairline is present, but so faint that the lens edge reads mainly from the plate's own tone.
- **At the scroller's edge** (`…clipstale-edge-*-loupe-whole.png` against `glance/loupe/plant-cand7/…`) the pass-7 sliver is gone and the lens sits whole above the card's line. The paragraph behind shows through the housing and across the magnified track; I read that as busy, not broken.
- **Not iOS-27 grade, and D5's:** none on the cells I captured. The Dialog dismissal and the rotated ancestor are CK-20's paint defects, filmed rather than captured. Their stills are in `glance/probe/` (`cand8-chromium-ancestor-{opacity,rotate}-engaged.png` against `-released.png`: a full-strength or unrotated, 2.25× tall slider over its half-faded or tilted card).
- **Not D5's:** the static ambient exemplar (D3), and the dark halo and housing (W-0.1).

## 4 · The `inplace-loupe` probe, read beside the candidate (for Q-3′, not scored)

| cell | probe · Chromium | probe · WebKit | candidate · Chromium / WebKit |
|---|---|---|---|
| E-10 whole | 42/16/0: the 16 stale-place cells fail (keyboard and pointer; P-E8 §7.1's cause) | 42/16/0 | 58/0 / 58/0 |
| E-10 clip family, hand-off, singleton, Escape | all pass | all pass | all pass |
| E-13 (k max ×4, loupe whole ×4) | **8/0** | **8/0** | 8/0 / 8/0 |
| `e8-probe tip` | **4/0** | **4/0** | 4/0 / 4/0 |
| E-3 | **22/0** | **22/0** | 22/0 / 22/0 |
| idle loop, engaged | **0.0 rAF and RO/s**, on- and off-screen | **0.0/s** | 120.3 / 98.0 per s |
| my `dlg` (Dialog dismissal) | **0.00 / 0.00** both drives | **0.00 / 0.00** | step 0.73 / 0.90 · 0.78 / 0.90 |
| my feather, two-sided, keyboard | 0.999 | **0.991** | 1.022 / **0.584** |
| my ancestors: opacity, `clip-path`, rotate | 1.010 / 1.004 / 1.030 | 1.001 / 1.016 / **1.118** | ×1.97-2.55 everywhere |
| my `glidescale` | 1.43 against 1.85 | 1.22 against 1.52 | 5.25 / 5.42 |
| my `trail` (3 px ticks) | ≤ 0.5 px on all 9 films | −1.4..−0.3 px (one drive 0 of 3 over 1 px, two drives 1-2 of 3 just over) | 2.7-3.0 / instrument confounded |
| CK-23 | E's src 422 lines smaller (3 files +59/−481) | — | — |

**My reading for Q-3′.** The probe is its place, so every path the candidate must reproduce by script it gets by construction:
- the Dialog's fade;
- WebKit's feather;
- `clip-path`;
- the scroll, with no trail;
- the glide under scale.

Its one red set is P-E8 §7.1's: 16 stale-place cells that fail because it drops the frame read. P-E8 shows the frame read restores them (`probe-loop-variant.patch`, 58/0 per engine, at the candidate's idle cost). I did not re-run that variant.

Its one reading outside my bound is WebKit's rotate cell, ×1.118. An in-place grow inside a rotated card paints a little more, but it is still rotated with its card.

The candidate's stacking advantage (rising over a later positioned sibling) is real, and no cell reads it.

## 5 · Next-pass defect classes (recorded; no row added; the score does not change)

1. **A one-sided bound on a two-sided invariant.** H8's feather cell bounds only overpaint (≤ 1.10 × the unfeathered ratio). "Paints exactly what its place would paint" is two-sided, and WebKit's keyboard path reads 0.58 and passes. → H8: 0.90..1.10, with `nomask` (overpaint) and a plant that under-masks as its plants.
2. **A film that reads escape, not place.** H8's film cell counts paint above the card. A body that trails its place inside the card, with clip and body moving together, passes it. → H8: a place film (the body against a marker in the same scroller, as `ca8-probe trail` does), whose plant is a place written one frame late. Chromium only, until an instrument separates WebKit's promoted paint (item 4).
3. **A construction that reproduces the world by script meets the world's next property.** P-E7 read one kind of clip, and P-E8 reads clip, radius, mask, translate and scale. Each pass's construction meets the next ancestor property it does not carry: opacity (the library's own Dialog fade), `clip-path`, rotation, its own glide's composition with the inline scale, and the compositor's scroll clock. This is the sixth pass whose promotion meets a place counterexample. → Q-3′ (§4); E's part.
4. **A paint instrument confounded in one engine.** In WebKit my `trail` film and `trailstill` still read a promoted body 13.3-13.6 px (film) and 9.3 / 19.4 px (still) off its released self. They read the same on the pass-7 construction, and the main thread puts the host's centre on its footprint's to 0.00 px. I score no WebKit trail cell. → any seat filming a top-layer body in WebKit: read the main thread beside the paint, and require a plant that the instrument separates.
5. **A grep column that cannot count.** `E8/ck22-greps.sh` passes `--` as the pattern for its VX and HS columns, so they print 0 whatever the tree holds. The table's figures survive on the script's full-line section and on my own grep. → whoever carries the script into pass 9.
6. **The supersede list stops at pass 2.** Pass 1's MIGRATION rows and the pass-2 floor's list were never retired by any later pass (CK-22 above). → E's consolidated table: start the list at pass 1.
7. **Process.** Two WebKit chains were briefly queued for this seat. A waiter I had already started fired at 13:51, and a second launch at 14:19 truncated the shared chain log before I stopped it, about a minute later (§6). Only one ran; no stage ran twice.

## 6 · Process

- **Machine law.**
  - Every build and browser run went through `~/.claude/guard/guarded`, never `--light`.
  - WebKit ran only inside the one `--exclusive webkit` acquisition (67-minute wait, 49-minute hold, exit 0).
  - One heavy run at a time: the WebKit chain waited on the Chromium chain's end, and the crest re-runs finished before the WebKit chain was admitted.
  - One browser per run with a fresh context per cell (the harness's lib), every page, context and browser closed in a `finally`; no GPU arguments. Films took no mid-film screenshot; the trail films' videos were decoded and their temp directories removed in the cell.
  - No guard refusal; the kernel zone never gated a run.
- **What changed mid-seat, each before any read of record that cites it.**
  - The `glidescale` cell first graded an absolute 1 px. My smoke run showed the unscaled control itself moving 1.6-2.2 px in the insertion's frame (one frame of a lawful glide), so the scaled cell is graded against its own build's unscaled control + 1 px (`logs/smoke-1-chromium.log`).
  - The `crest` cell first graded against the face's own `--rung-crest`, so the `crest` plant passed it (`logs/plant-crest-chromium-ca8.log`, superseded). It now grades against the register rows. It was re-run on the candidate and the plant in Chromium (`logs/crest-*-chromium.log`, of record) and run that way in WebKit.
  - The `trailstill` cell was added during the WebKit acquisition, after the WebKit film read a persistent offset. It ran inside the same acquisition through `stages-extra.sh` (§5 item 4).
- **The chain log.** I launched the WebKit chain twice by mistake. My first waiter started it at 13:51 (guard pid 3714). A second launch at 14:19 truncated `logs/chain-webkit.log` before I stopped it, about a minute later, and its guard process left the queue. The run of record is the 13:51 one. Its log header line reads 14:19 because of the truncation; every stage log is its own file and is unaffected.
- **Fences.**
  - No tracked file in the checkout was edited, and there was no git write in the checkout beyond `git worktree add` and `git worktree remove --force` of my own worktree. `git status` shows no tracked change.
  - Checkout writes are only `pass-8/C-A8.md` and `pass-8/C-A8/`.
  - Sibling repositories were read by grep only; nothing was built or run in any sibling, and value.js was only grepped.
  - Nothing under `~/.claude` was read; `guarded` was only executed. Two tool outputs were saved by the tool under `~/.claude` and not opened; I re-read their sources in chunks.
- **Cleanup.** The worktree is removed (`git worktree remove --force`, exit 0, absent from `git worktree list`), and `.claude/worktrees/bl/D5/p8/C-A8/` is removed. No C-A8 process is left running. The builds lived only in the worktree; logs, json and frames are under `pass-8/C-A8/`.
