# D5 pass 5 · C-A5 · critic of the candidate A+E (`P-E5-noveil-coarse.patch`), with `P-A5-geom.patch` beside it

| field | value |
|---|---|
| seat | C-A5, the fresh adversarial critic of D5 pass 5 (REGISTRY §P4-8.3 wave 3). I authored no D5 seat in passes 2-5 and was not a pass-3 or pass-4 critic |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `c65696c08` (docs only over `78fc8f3b8`). Worktrees `.claude/worktrees/bl/D5/p5/C-A5/{wt,wt-geom,wt-plant}` at HEAD, `node_modules` symlinked, all three removed with `git worktree remove --force` at the end, and `…/p5/C-A5/` deleted |
| builds | **cand** = HEAD + `P-E5-noveil-coarse.patch` (sha1 `bd973aeb…`, matches P-E5 §2); **geom** = HEAD + `P-A5-geom.patch` (`181caeaf…`); **plant** = cand + `C-A5/plant.sh` (ten plants, `C-A5/plant-over-candidate.diff.txt`); **ca5app-cand** = cand with this seat's probe app `C-A5/probe/ca5-App.vue`. Scene app sha1 `7c8bcdaafb44` (the harness's own) on cand, geom and plant |
| composition, checked | with temporary indexes: cand = `P-A5-light` + exactly E's 23 files (+1636/−317), and every F5″ file is in the change set (P-E5's claim reproduces) |
| engines | Chromium 149 and Playwright WebKit 26.5, headless shell; the GPU arm (`--gpu metal`, H5's named witness) for E-1 ambient only. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| owner state | `../../../audit/INBOUND.md` (mtime 2026-10-21 01:50) and `../../../FORMATION-PROGRESS.md` (to its 02:00 line) read at the seat's start. O-103 says "D5's own Q-5 and Q-2 … stay on their registry defaults"; no ruling on Q-3, the engine-limit clauses, O-74c G-1 or the checkbox for D5. Every owner-gated row below is **OPEN ON ITS DEFAULT** (Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a)) |
| runs | Chromium: one `guarded --timeout 90` call per witness, probe or capture, 02:04-03:05. WebKit: **one** `guarded --exclusive webkit --timeout 90` acquisition, queued 03:05:50, admitted 03:05:51 (no wait), released 04:10:25, guarded exit 0; no stage skipped, no page close, no AppSSO stall, no zone refusal. Gates: 04:10-04:16. Load 5.5-22.5 (1-min) across every run; each log opens and closes with its 1/5/15-min load |
| records | `C-A5/run-ca5.sh` (stages), `C-A5/chain.sh`, `C-A5/plant.sh`, `C-A5/plant-over-candidate.diff.txt`, `C-A5/cells.mjs` (a JSON cell reader), `C-A5/probe/{ca5-probe.mjs,ca5-capsule.mjs,ca5-App.vue}`, `C-A5/logs/` (`chain.txt` is the run of record; `wk-admission.log`), `C-A5/json/{cand,geom,geom-arms,plant,plant-n,cand-gpu}/`, `C-A5/glance/` (sheets per engine × pointer, 480 frames) |

## 0 · In brief

**Score on the candidate: 11 of 27 rows closed (41 %).** Closed: CK-03, 04, 08, 09, 13, 15, 21, 22, 23, 24, 26. Open: CK-01, 02, 05, 06, 07, 10, 11, 12, 14, 16, 17, 18, 19, 20, 25, 27. **Pass 5 is not clean, and the loop has not reached its fixed point.** Eight rows still hold counterexamples that building can remove (§3).

1. **A new CK-20 counterexample on the candidate's own arm: the observed place cannot see an inward move.** `stage.ts watchPlace` cuts the IntersectionObserver's root margin to the box and waits for the ratio to leave 1. A layout move whose new rect lies inside the old one keeps the ratio at 1, so nothing reports. The next unrelated mutation then glides the control from its stale place. On the fine-pointer in-place hold (Q-3 (c), the default), the slider's wrapper goes from 360 to 300 px with a +60 px left margin (left edge in, right edge kept). The append that follows plays a **63.6 px one-frame jump** at +84..+94 ms, bound ≤ 4. Reads: Chromium 3/3 (smoke 02:03, chain 02:57, r2 04:09, loads 8-17); WebKit 1/1 (04:00, load 7.3). WebKit also fails the centred shrink (360 → 240, +60) at 63.6 px, which Chromium passes. The control (the same +60 px move at full width, leaving the old rect) passes in both engines. The promoted keyboard path passes every case, because its footprint keeps a fixed pixel width and cannot shrink. H5's `stale place` cells drive only outward moves, so they cannot see this (`C-A5/logs/ca5-probe-cand-*.log`).
2. **The capsule's hover lift and press snap were never retired. A library toggle still rides them, and a coarse tap latches.** `glass/glass-capsule.css:124-131` keeps `.glass-capsule-hover:hover { scale: 1.015 }` (not under `(hover: hover)`) and `:not([data-press-armed]):active { scale: var(--scale-press-sm) }`. The Configurator's preset chip, an `aria-pressed` toggle (`Configurator.vue:430`), composes it. `utilities/engage.css:14-16` states that the hover lift and press snap "that used to ride … `.glass-capsule-hover` are retired at their source". They are not. Measured on the candidate in both engines and both themes (`ca5-capsule`): hover ×1.015, `:active` press ×0.97, and **a coarse tap that stays at ×1.015 at +900 ms with `:hover` true**. WebKit reports `(hover: none)` and `(pointer: coarse)` as well. 12/12 FAIL. This is a counterexample to CK-11, CK-14 and CK-27. No scene renders the preset strip (the gallery's Configurator has no `presets`), so no witness could see it.
3. **A's light arm cannot be seen on light faces in paint, as P-A5's trade-off says.** E-2 Chromium 131/33 (23 DISAGREES), WebKit 137/27 (14 DISAGREES). The Switch, Checkbox, toggle and Chip light faces paint **0.0000** above their committed rest: the face falls from about 0.79 to 0.40, and the light is absorbed in the fall. The accordion's light face reads 0.0000, normal and under reduce. CK-02 stays OPEN ON DEFAULT (Q-5). On the geom arm, E-2 arms i-iii read **164/164 in both engines**.
4. **A's rebound cure holds in WebKit and still fails in Chromium.** WebKit E-10 28/0 (load 6.5). Chromium E-10 26/2 (load 12.2): switch light and accordion dark reversed at +60 give **1 pulse** (frozen 3 ms and 20 ms, under the 60 ms bound). C-A4's `ca4-probe` reads 1 pulse on the switch light at +60 in WebKit too, but its own pass rule does not grade pulses. The single commit's onset is +7..+17 ms and its peak +51..+62 ms, inside `ACKNOWLEDGE_WINDOW_MS`. The 120 ms delay replanted (Q5) fails in both engines (0 pulses at +60, 115-118 ms frozen at +200), so the cell bites.
5. **The commit-light release (480 ms) was fitted to the witness.** Its row comment says: "Three clocks (360 ms) left the dark toggle at 0.0076 in paint, under the 0.01 bound." Four is chosen because three fails the instrument. CK-12 asks for a reason that is not the witness's (§2 CK-12).
6. **What P-E5 cured holds.** H5's stale place, its control and its resize twin read 0.0 px per frame in both engines. The layout-only landing and the re-render landing pass. The hand-off drop passed this seat's one read in each engine (P-E5's 5/14 Chromium fails were not seen here: NOT-REPRODUCED on one read, so it stays P-E5's record). The slider's press is on `[data-held]` (coarse pressed frames show the squish). **But the slider carry failed again in Chromium: 2.72 px** against 4, at load 10.5. WebKit read 7.08 px. That is the F-5 bimodality, now seen by every pass-5 seat.

## 1 · What I ran

### 1.1 The candidate (`cand`), the full battery in both engines

| witness | Chromium (1-min load at start) | WebKit (load) | the open cells |
|---|---|---|---|
| E-1 | 92/2/2U (10.2) | 92/4 (9.0) | latch 54/55 `dock` (D2); `presented (sheet) PRM press-light` no target (O-74c G-1); Aurora: Chromium headless ENGINE LIMIT (U), WebKit **FAIL 1.18 vs 1.13**, its PRM arm 0.00/0.00 |
| E-1 GPU arm (`--gpu metal`, "ANGLE Metal Renderer: Apple M5 Max") | ambient **FAIL 1.18 vs 1.14** (7.7); the latch and Sheet lines in that log come from the `--scenes ambient` filter | — | CK-19 on hardware |
| E-2 | 131/33, 23 DISAGREES (9.4) | 137/27, 14 DISAGREES (9.8) | light faces 0.0000 in paint (switch, checkbox, toggle, chip light); accordion light 0.0000; chipaction dark 0.0039-0.0087; accordion dark 0.0000-0.0099; radio light tap 0.0089; Chromium button dark pointer and programmatic |
| E-3 | 22/0 (6.8) | 22/0 (9.5) | — |
| E-4 | 13/1/4U (9.8): **slider carry 2.72 px FAIL** | 11/0/8U (12.1): slider carry 7.08 px, tabs 39.96, sortable 27.40 | Sheet UNMEASURED (in flow, O-74c); WebKit Carousel UNMEASURED (no touch scrolling) |
| E-5 | 54/2 (12.3) | 54/2 (12.7) | the Button gleam `::before` NOT LANDED by +200, both themes |
| E-6 | 4/2/8U (22.2) | 2/2/8U (9.0) | `s6 present` 0 animations (Q-2 (b) default) |
| E-7 | 6/1 (15.4) | 6/1 (8.6) | `data-held` second writer `GlassDock.vue` (D2's, the row's named clause) |
| E-8 | 19/0 (14.5) | 19/0 (9.6) | — |
| E-9 | 73/5 (13.2) | 77/1 (6.4) | Chromium: switch light 0.0067, checkbox light 0.0098, toggle light 0.0098, chipaction dark 0.0061, accordion light 0.0000. WebKit: accordion light 0.0067 |
| E-10 | 26/2 (12.2) | **28/0** (6.5) | Chromium rebound +60 switch light and accordion dark, 1 pulse |
| E-11 | 3/0/1U (18.9) | 3/0/1U (7.5) | U: `--scale-commit-pop` is not read on the light arm (no degradation, no error) |
| E-12 | 65/0 (16.8) | 64/0/1U (7.4) | WebKit `rest layouts` UNMEASURED (no counter) |
| CAP | ladder light/dark PASS (accordion deepens over its hover) | ladder light/dark PASS | — |

### 1.2 The geom arm (Q-5 arm ii), on the rows it moves

| witness | Chromium (load) | WebKit (load) | reading |
|---|---|---|---|
| E-2 arms i, ii, iii | **164/0** (14.3) | **164/0** (6.4) | CK-02 closes under arm ii in both engines |
| E-2 default arms | 98/66 (14.6) | 89/75 (6.9) | expected: the default arms do not grade the pop |
| E-9 | 73/5 (13.4): switch light 0.0043, toggle dark 0.0068, chipaction dark 0.0061, accordion light 0.0000, dark 0.0071 | 77/1 (7.4): accordion light 0.0000 | CK-10 stays open under arm ii; the accordion's near-white face is Q-5 (2) on either arm |
| E-10 | 12/0/16U (12.1) | 12/0/16U (7.4) | the 16 rebound cells UNMEASURED: the geom single commit lights no seat |
| E-5 | 54/2 (21.1) | 54/2 (6.0) | the Button gleam, as cand |

The geom build carries A alone (no E), so its CK-04, CK-15 and CK-20 cells are not the composition's. P-E4's merge note stands: E merges onto geom if Q-5 is ruled toward arm ii.

### 1.3 Plants (`plant.sh`, applied only in `wt-plant`; each must fail its cell)

| plant | row | cell | Chromium (load) | WebKit (load) |
|---|---|---|---|---|
| Q1 Switch loses `engage-chosen` | CK-01 | E-1 adoption + latch | **FAIL**: NOT ADOPTED, latch 53/55 (5.9) | **FAIL**, the same (12.1) |
| Q2 every Card `role=option tabindex=0` | CK-01, CK-24 | E-1 static-inert | **FAIL** card + surface | **FAIL** |
| Q3 Checkbox loses its door | CK-03 | E-2 `arrival·own`, `ownflush` | **FAIL** 4/4 (6.1) | **FAIL** 4/4 (10.4) |
| Q4 forced colours reach the dock triggers | CK-14, CK-13 | E-12 fcslop + fc-reach | **FAIL** 3 (5.5) | **FAIL** 3 (12.8) |
| Q5 the 120 ms delay back on the control-bit light | CK-20 × CK-12 | E-10 rebound | **FAIL** 4/4: 0 pulses at +60, 115-118 ms frozen at +200 (8.2) | **FAIL** 4/4 (8.4) |
| Q6 Button `--rung-light: transparent` | CK-02 | E-2 button arm iii | **FAIL** 8/8 | **FAIL** 8/8 |
| Q7 disclosed press at 50 % of its hover | CK-25 | CAP ladder | **FAIL** light and dark | **FAIL** light; dark passes (the press 0.025 against 0.05 lands lighter by less than the bound there) |
| Q8 the tabs' reduce light never paints | CK-10 | E-9 tabs commit-light | **FAIL** 2/2 at 0.0000 (8.7) | **FAIL** 2/2 (7.0) |
| Q9 a second `data-press` writer | CK-08 | E-7 static | **FAIL** 2 writer files | **FAIL** |
| Q10 a minted 77 ms transition on the Chip | CK-09 | E-8 literal | **FAIL** `opacity@77ms` (6.5) | **FAIL** (9.9) |

Every plant failed its planted cell in both engines. Q7's dark theme passed in WebKit, and its light theme failed there.

### 1.4 Probes

| probe | row | Chromium (load) | WebKit (load) |
|---|---|---|---|
| `ca5-probe` **inset place · pointer** (in place, rect inside the old) | CK-20 | **FAIL 63.6 px** at +84..+88 ms, 3/3 reads (8.2-17) | **FAIL 63.6 px** at +94 ms (7.3) |
| `ca5-probe` shrink place · pointer (centred) | CK-20 | PASS 3/3 (centre unchanged) | **FAIL 63.6 px** at +89 ms (7.3) |
| `ca5-probe` translate place · keyboard/pointer (control), shrink/inset · keyboard, shrink reach | CK-20, CK-22 | PASS (footprint fixed at 360 px; `--stage-w` 360 px) | PASS |
| `ca5-probe` fail-loud `--engage-commit-light-{attack,release}` | CK-21 | PASS: 1 error each planted, 0 clean | PASS |
| `ca5-capsule` (Configurator preset chip) hover, press, coarse tap | CK-11, CK-14 | **FAIL 6/6**: hover ×1.015, `:active` ×0.97, tap latch ×1.015 with `:hover` true (17.4) | **FAIL 6/6**, the same; coarse mode true (16.4) |
| `ca4-probe --only rebound,cardpress` (C-A4's, unedited) | CK-20, CK-17 | 11/0; card press first visible at +50 ms 3/3 | 11/0; card press +25 ms 3/3; switch light +60 reads 1 pulse (not graded by that probe) |

### 1.5 Gates and cost

Gates on cand (`A5/gates.sh`, under guarded, 04:10-04:16): build, typecheck and `demo:dist:build` exit 0; vitest **245 files, 2405 passed, 10 expected fail, 1 skipped**, `--maxWorkers=2`. Cost: cand **182 files +4616/−1498** (src 143 files +3005/−1237, tests 27 files +1560/−242); geom **172 files +3153/−1292**. Both match P-E5 §2 and P-A5 to the line.

## 2 · Per row (CK-01..CK-27), the candidate

**CLOSED** = closed by my own replayed measurement in both engines, with a plant that fails where the row names one. **OPEN ON DEFAULT** = owner-gated; the row names the ruling that closes it.

| row | Chromium | WebKit | verdict |
|---|---|---|---|
| CK-01 | 92/2/2U; latch 54/55 `dock`; Sheet PRM no target; Aurora U (headless), **FAIL 1.18/1.14 on the GPU arm** | 92/4; Aurora **FAIL 1.18/1.13** | **OPEN.** `dock` is D2's fence and the Sheet is O-74c G-1's. The ambient cell is a buildable counterexample on hardware in both engines (CK-19). Q1 and Q2 fail |
| CK-02 | arm iii fails on the light faces in paint (0.0000) | same | **OPEN ON DEFAULT (Q-5).** Closes under arm ii (164/164 both engines), or by the owner restating the light's bound for near-white and darkening faces |
| CK-03 | mount and arrival cells pass; Q3 FAIL 4/4 | same; Q3 FAIL 4/4 | **CLOSED.** The late arrival commits once; its light failing in paint is CK-02's |
| CK-04 | E-3 22/0 | 22/0 | **CLOSED** |
| CK-05 | slider carry **2.72 px FAIL** (load 10.5); tabs and sortable pass | 7.08 px; Sheet U; Carousel U | **OPEN.** F-5 (the carry margin) is a ruling owed, and the Chromium read fails it at low load. The Sheet waits on O-74c G-1, and the WebKit Carousel on an engine-limit clause |
| CK-06 | Button sustain NOT LANDED by +200 (gleam `::before`) | same | **OPEN** (A's gleam rides `:active`; buildable) |
| CK-07 | no idle rung | same | **OPEN ON DEFAULT (Q-2):** the owner's line naming S6 RETIRE |
| CK-08 | E-7 6/1, the fail `GlassDock.vue` (D2, named clause); Q9 FAIL | same | **CLOSED** (named clause) |
| CK-09 | E-8 19/0; Q10 FAIL | same | **CLOSED** |
| CK-10 | E-9 73/5 (switch 0.0067, checkbox 0.0098, toggle 0.0098 light; chipaction dark 0.0061; accordion light 0.0000); Q8 FAIL | 77/1 (accordion light 0.0067); Q8 FAIL | **OPEN.** The accordion face is Q-5 (2) on either arm. The other four faces fail the paint read in Chromium, and under arm ii as well (geom E-9 73/5) |
| CK-11 | `.glass-capsule-hover` lift ×1.015 and `:active` snap ×0.97 live on the Configurator preset chip | same | **OPEN** (§0 item 2). Retire both at `glass-capsule.css:124-136`, or take the chip off the class. The dock's own use is D2's |
| CK-12 | commit-light `releaseMs: 480`, "four of the fill's clocks", chosen because three "left the dark toggle at 0.0076 in paint, under the 0.01 bound" (`engageEnvelopes.ts`, the row's comment) | (static) | **OPEN.** The figure is a row in the table, but the reason the row states for its size is the witness's bound. A reason of its own (a perceptual decay or the fill clock alone) closes it. E's `--loupe-ring` (0.3 × the track height) is loupe geometry, not an engagement figure, and I rule it outside CK-12, as P-E5 did |
| CK-13 | E-12 forced-colours cells pass; Q4 FAIL; noveil shows no veil | same; PRT the engine's limit | **CLOSED** |
| CK-14 | E-12 65/0 (slop, 44 px floor); **capsule coarse tap latch ×1.015** | 64/0/1U; **latch ×1.015**, coarse mode true | **OPEN** (§0 item 2) |
| CK-15 | hand-off singleton fwd/rev, max 1 per frame | same | **CLOSED** |
| CK-16 | rest layouts 0.0/s; off-screen paused | off-screen PASS; layouts UNMEASURED (no counter) | **OPEN ON DEFAULT** (the engine-limit clause, §P4-6) |
| CK-17 | — | — | **OPEN.** Safari: UNMEASURED (owner's safaridriver checkbox; O-103's "not granted" is under D4's rulings, and whether CK-17 takes it is the agglomeration's). Naming half, buildable: `sortable-list/styles.css:141,197`, `dialog/styles.css:136`, `button/styles.css:296` and `glass/material.css:269-279` press on `:active` and name no `touchstart` listener |
| CK-18 | slider, sortable and tabs on the release rule (E-4 cells) | same | **OPEN ON DEFAULT (O-74c G-1):** the Sheet |
| CK-19 | ambient FAIL on hardware 1.18/1.14 | FAIL 1.18/1.13 | **OPEN** (buildable: an ambient exemplar that answers the pointer) |
| CK-20 | **inset place 63.6 px** (3/3); rebound +60 1 pulse (switch light, accordion dark); H5 stale cells 0.0 px; landings pass | **inset place 63.6 px, centred shrink 63.6 px**; E-10 28/0 | **OPEN** (§0 items 1 and 4) |
| CK-21 | E-11 3/0/1U; commit-light clocks fail loud | same | **CLOSED** |
| CK-22 | E-12 wheel and anchor cells pass; consumer greps re-run (below) | same | **CLOSED.** Greps over every sibling with `@mkbabb/glass-ui` in its package.json (read only; value.js by grep only): nothing selects `.card[role="option"]:active`, the Button's quiet/text `:active`, `.disclosure-group-trigger:hover`, `--engage-control-engage-*`, `.glass-slider…:active`, `.glass-loupe*`, `glass-capsule-hover`, `configurator-preset-chip` or the arm constants |
| CK-23 | 182 files +4616/−1498 | — | **CLOSED** (reproduced to the line) |
| CK-24 | static cells pass; Q2 FAIL | same | **CLOSED** |
| CK-25 | §4 | §4 | **OPEN: not iOS-27 grade** |
| CK-26 | no `plus-lighter`, radial, shadow or blur line among A5's and E5's added lines (`grep -c` 0 and 0); the Chip's flood is gone (`glass-chip.css:42`); on noveil the veil is never created | same | **CLOSED** |
| CK-27 | `engage.css:14-16` states the capsule's lift and snap are "retired at their source", and passes 2-4 closed CK-11 on that statement; both are live in paint (§0 item 2). Every new H5 cell and every plant here fails as it should | same | **OPEN** (self-citing spec: a source claim with no cell, contradicted in paint) |

## 3 · Is this the fixed point?

**No.** The rows open only on owner or D2 inputs are CK-02 (Q-5), CK-07 (Q-2), CK-16 (the engine-limit clause) and CK-18 (O-74c G-1). CK-01 and CK-05 are mixed, and so are CK-10 (the accordion's Q-5 (2)) and CK-17 (Safari), but each still has a buildable cell. Eight rows still hold counterexamples that building can remove: **CK-06** (the Button gleam on `:active`), **CK-11** and **CK-14** (the capsule on the preset chip), **CK-12** (the commit-light figure's reason), **CK-19** (the ambient exemplar on hardware), **CK-20** (the inward-move stale place; the Chromium +60 rebound), **CK-25** and **CK-27**. CK-10 has four buildable faces, CK-17 its naming half, and CK-01 the ambient cell.

## 4 · CK-25 · the gestalt (read from my own frames)

Sheets: `C-A5/glance/ca5-cand-{chromium,webkit}-{fine,coarse}.png`; frames: `C-A5/glance/frames/ca5-cand-<engine>-<pointer>-<theme>-<scene>-<state>.png`.

**Verdict: not iOS-27 grade.** The world stays crisp under every promotion, and the flatter, quieter plate agrees with O-87. But the frames a person sees most still fail.

- **The held loupe is still a split capsule, not glass.** `frames/ca5-cand-chromium-fine-light-slider-held.png` and `…-coarse-light-slider-held.png`: a grey-rimmed pill whose left half is a flat orange round bead and whose right half is flat grey, divided by a hard dark 1 px seam at the mark. There is no magnification of anything legible, no refraction and no edge light. The rim P-E5 added reads as a border, not as a lens. WebKit's frames are the same (`ca5-cand-webkit-*-slider-held.png`).
- **The commit is unseen on the light faces.** At the committed instant (+90 ms) the light Switch is a flat charcoal pill with no light over it (`ca5-cand-chromium-fine-light-switch-committed.png`), and the paint read agrees: 0.0000 above rest. On the Button the committed frame cannot be told from rest (×1.001; `…-fine-light-button-committed.png`).
- **The coarse Switch press is invisible.** `…-coarse-light-switch-pressed.png` and `…-held.png` match `…-rest.png` at the sheet's scale, in both engines.
- **The disclosure's ladder is now right.** The press deepens over the hover (CAP ladder PASS in both engines, accordion L 0.8556 → 0.76-0.77). The committed accordion frame (`…-fine-light-accordion-committed.png`) shows the row's hover wash and the chevron caught mid-turn, a glyph that reads as "r". The wash is state-bearing (the pointer is still there), and it no longer reads as a slab.
- **Kept:** the dark Button's warm halo (`…-fine-dark-button-committed.png`) is still HEAD's, for the 10.2.0 token wave or D3. It is in view and not scored to D5.
- **What reads well:** the fine-pointer in-place grow (×1.060, no veil, `…-fine-light-slider-engaged.png`) and the sortable lift (`…-fine-light-sortable-held.png`) are deft and quiet. The ambient field in WebKit is the real WebGL ground, and in Chromium headless the CSS ground.

## 5 · Next-pass defect classes (recorded; no row added, score unchanged)

1. **A ratio-1 cut sees only outward moves.** Any observer keyed on leaving a box misses a box that moves or shrinks inside it. The witness class is the stale-place cells, which drive only growth and translation (§0 item 1). Scored at CK-20.
2. **A source comment that closes a row.** The capsule's retirement lived in `engage.css`'s header and was never driven, so three passes closed CK-11 on prose (§0 item 2). Scored at CK-11, CK-14 and CK-27.
3. **A figure sized by the instrument** (§0 item 5). Scored at CK-12.
4. **The centred shrink splits the engines:** Chromium does not glide it and WebKit glides 63.6 px. Measured, not explained.

## 6 · Fences and the machine

- No tracked source in the checkout was edited, and no git write ran there beyond `git worktree add` and `git worktree remove --force`. `git add -N` ran only inside my own worktrees, for the numstat. My only writes in the checkout are `pass-5/C-A5.md` and `pass-5/C-A5/`.
- The `git status` modifications under `docs/tranches/BL/design/dock/harness/` are another seat's, untouched.
- No `~/.claude` file was read; the guard ran as a binary. Siblings were read by grep only; value.js was neither built nor run.
- Every build, test and browser run went through `guarded`, none with `--light`, one heavy run at a time. WebKit ran in one `--exclusive webkit` acquisition. The headless shell was used throughout; GPU arguments ran only on the named CK-19 witness. One browser per run with a context per cell, closed in `finally`; vitest `--maxWorkers=2`.
- **Process note:** `run-ca5.sh` gained an `extra` stage while the chain's Chromium phase was running. The new file was written beside the old and swapped in with `mv`, so the running process kept the old inode and only the later `wk-inner` call read the new file. No parse error.
- Nothing is left running. The worktrees and `.claude/worktrees/bl/D5/p5/C-A5/` are removed.
