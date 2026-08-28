# BK π BAND — FRESH CENSUS

**Seat model:** `claude-opus-5`, derived from this seat's own subagent transcript
`/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_e9e29b07-16b/agent-aa9e9d408005725d2.jsonl`
(first user message = this census order; `grep -o '"model":"[^"]*"' | sort -u` → `claude-opus-5`).
The assertion `&&`-gated every command below.

**Repo state at census:** HEAD `207bf174`. `git status --porcelain` → the single untracked
line `docs/tranches/BK/execution/2026-08-25-pi-band/` plus the four foreign-lane modifications
already present at session open. **This seat wrote exactly one file: this one.** No source byte,
no gate file, no capture, no browser, nothing staged/committed/stashed/checked out.

**Census basis:** the batteries on disk, not the seats' returned prose. Where the two diverge
the disk wins and the divergence is printed (§5).

---

## 1 · ARTIFACT DIRECTORIES — claimed vs on disk

| directory | entries | `.md` | `.json` | `.png` | `.ndjson` | `.log` | size | claim | verdict |
|---|---|---|---|---|---|---|---|---|---|
| `alpha-dock-search/` | **74** | 1 | 46 | 27 | 0 | 0 | 15M | "74 artifacts, `PI-BATTERY-alpha-dock-search.md` written" | **CONFIRMED** — 73 capture artifacts + 1 battery = 74 files; the battery counts itself |
| `beta-temp-path/` | **5** | 1 | 2 | 2 | 0 | 0 | 56K | 5 files named individually | **CONFIRMED** — all five named files present, byte-for-byte the names given |
| `gamma-aurora-blob/` | **43** | 1 | 8 | 22 | 8 | 4 | 35M | "43 files, 35 MB banked" | **CONFIRMED** — and its own §9 enumeration (8 contact sheets · 4 g3 pair sheets · 8 `.ndjson` · 2 engine-witness · 2 shipped-route JSON + 2 PNG · 3 γ0 PNG + 2 γ0 JSON · 2 V-A95 PNG + 1 JSON · 2 π-CONTAIN PNG · 1 π-PARITY PNG · 1 motion-strip JSON · 4 run logs · this record) sums to **43** exactly |
| `gamma-handmark/` | **33** | 1 | 11 | 21 | 0 | 0 | 57M | "11 paired-π JSON and 17 PNG" | **JSON CONFIRMED · PNG UNDERSTATED BY 4** — disk holds **21** PNG (20 `pi-*` + `g3-aurora-precondition-unmet-1440-dark.png`), not 17 |
| `delta-config-fourier-scroll-story/` | **91** | **0** | 59 | 32 | 0 | 0 | 34M | *(band report: `null`)* | **NO `PI-BATTERY` EXISTS.** `ls *.md` → no matches. 91 artifacts banked, **zero verdicts written** |

**Cited-artifact existence.** Every artifact filename cited literally inside the four batteries
was tested for existence, plus every brace-expansion (`{wgpu,gl}-{dark,light}`) and glob:

| battery | literal cites tested | missing | brace/glob cites | missing |
|---|---|---|---|---|
| `alpha-dock-search` | 28 | **0** | all | **0** |
| `beta-temp-path` | 4 | **0** | all | **0** |
| `gamma-aurora-blob` | 7 | **0** | all | **0** |
| `gamma-handmark` | 25 | **0** | all | **0** |

**64 literal cites, 0 missing.** No battery cites an artifact it did not bank.

**α's wall-recovery arithmetic checks.** `ls -la alpha-dock-search/` shows exactly **18** files
dated Aug 25 — the predecessor set. α's §WALL RECOVERY dispositions 15 ADOPTED + 2 π-PROPORTION
files SUPERSEDED-as-measurement + `00-dock-overview-1440-light.png` SUPERSEDED = **18**. Nothing
deleted; the directory name kept.

**δ's 91 files map cleanly to cells** — every one carries a `pi-d{unit}[p{n}]-` prefix and the
per-prefix counts sum to 91 exactly:

```
pi-d1:2  pi-d2:3  pi-d3:2  pi-d4:2
pi-d2p1:4  p2:1  p3:3  p4:4  p5:1  p6:1  p7:2  p8:2      (18)
pi-d3p1:3  p2:2  p3:1  p4:12  p5:0  p6:15  p7:1  p8:2    (36)
pi-d4p1:4  p2:1  p3:8  p4:2  p5:2  p6:1  p7:1  p8:9      (28)
                                                    total 91
```

**`pi-d3p5` is 0.** δ3-π-5 is the one cell in the whole band with neither an artifact nor a verdict.

---

## 2 · THE CELL LEDGER — every queue cell across the sources of record

**Roster of record, re-read on disk at this seat, not adopted from a census:**

| lane | source of record | cells |
|---|---|---|
| α | `lanealpha-unit5/PI-QUEUE.md` §4 | 10 |
| α | `lanealpha-unit6/PI-QUEUE.md` | 1 |
| α | `lanealpha-unit7/PI-QUEUE.md` §1 | **0** — "THIS UNIT ADDS ZERO CELLS"; §4 states *"Total owed: 11. Total claimed by any α seat: 0"* |
| β | `lanebeta-unit1/PI-QUEUE.md` §2 | 2 |
| β | `lanebeta-unit2/` | **0** — `grep -c "π" RECORD.md` → **0**, same for `PASTE-BLOCKS.md` |
| β | `lanebeta-unit3/` §4 | **0** — *"β2 enqueues NOTHING"* |
| γ | `lanegamma-unit5/RECORD.md` §7 (roster row **#51**) | 10 handmark |
| γ | `lanegamma-unit1/RECORD.md` §3.2 (roster row **#49**) | π-ARCHIVE + its named V-A95 rider π-REVERSE-DRAG |
| γ | `lanegamma-unit3/RECORD.md` §3 (roster row **#50**) | the ten-cell π-BLOB battery, π-W1 a *member* not a peer |
| γ | `lanegamma-unit4/RECORD.md` §5 | π-CEILING |
| γ | `lanegamma-unit2/RECORD.md` §A7 / `:202` / `:520` | **π-FIELD** — see §4 |
| δ | `lanedelta-unit1/RECORD.md` §7 | 4 (δ-π-1…4) |
| δ | `lanedelta-unit2/RECORD.md` §7 | 8 (δ2-π-1…8) |
| δ | `lanedelta-unit3/RECORD.md` §8 | 8 (δ4-π-1…8) |
| δ | `lanedelta-unit4/RECORD.md` §8 | 8 (δ3-π-1…8) |

`π-VIRTUAL-ANCHOR` (unit-7 §3) is **excluded with grounds, not dropped** — that section names it
*"FUTURE — owed by T1, not by this unit"* and *"Named for the builder, deliberately NOT enqueued."*

### 2.1 · LANE α — 11 cells · `PI-BATTERY-alpha-dock-search.md`

| # | cell | verdict | figure of record |
|---|---|---|---|
| 1 | π-RUN | **CAPTURED-GREEN** (adopted) | predecessor files carry `url`/`vw:393`/`dpr:3`/`coarse:true`/`dark:true`/`htmlClass:"dark"` — conditions verifiable from the artifact itself |
| 2 | π-CUT | **CAPTURED-GREEN** (adopted) | cap-live vs cap-inert mean **16.666 / 16.668** ms, **0** frames over 33ms either arm — the contingency is not triggered |
| 3 | π-REACH | **DEFECT-ROUTED** (vertical) · horizontal + drag **CAPTURED-GREEN** | `seatOff 19,69,119,169,219` = step **50 = 44+6** against declared **P=52** |
| 4 | π-MATERIAL | **DEFECT-ROUTED ×2** · forced-colors sub-arm **BLOCKED** | re-point landed on all five families both themes (2px/2px/48%, `box-shadow: none`); **63 of 67** controls have the ring clipped away by the run port |
| 5 | π-PROPORTION | **DEFECT-ROUTED** | `i=0` vertical: declared `48px`, gap **6px**, painted **46**, `[6,6,6,6,6,6]` — **2px short per seat**, cumulative **24px** over the 12-seat sidebar run; horizontal exact 48/48 |
| 6 | π-MORPH | **CAPTURED-GREEN** (one observation recorded against a stated criterion) | the **3611ms** pre-collapse gap is `DOCK_COLLAPSE_DELAY_MS = 3600` honoured to 11ms, not the "~350ms hold" defect. Observation: collapsed non-survivors keep `scrollWidth` 477/232 inside the port; outer box correctly 56 |
| 7 | π-HOVER-HANDOFF | **CAPTURED-GREEN** | — |
| 8 | π-DEFAULT-POSTURE | **CAPTURED-GREEN** | five in-fence sites, light AND dark |
| 9 | π-SEAT | **CAPTURED-GREEN** | dark arm photometered — the standing debt discharged |
| 10 | π-TAP | **CAPTURED-GREEN** · genuine-touch sub-arm **BLOCKED** | — |
| 11 | π-SEARCH-ROUTE | **DEFECT-ROUTED** (a11y walk) · paint **CAPTURED-GREEN** | glyph ink ≡ placeholder ink both arms; `aria-selected` and `role=option` count **0 in the entire document** at every one of 5 ArrowDown steps |

**α: 7 CAPTURED-GREEN · 4 DEFECT-ROUTED · 0 BLOCKED-whole · 0 DROPPED.**

### 2.2 · LANE β — 2 cells · `PI-BATTERY-beta-temp-path.md`

| # | cell | verdict | detectors (verbatim) |
|---|---|---|---|
| 12 | π-β0-LIGHT | **CAPTURED-GREEN** | `classList.contains("dark") → false` · `style.colorScheme → "light"` · `backgroundColor → "rgb(255, 255, 255)"` under emulated platform **dark** and storage `"dark"` |
| 13 | π-β0-DARK | **CAPTURED-GREEN** | `classList.contains("dark") → true` · `style.colorScheme → "dark"` · `backgroundColor → "rgb(0, 0, 0)"` under emulated platform **light** and storage `"light"` |

Specimen derived not transcribed: **402 B**, `sha256-T/HYS7zqh/wi4E0o0R4IStRZF6TYhOjMFduJeli2HpI=`,
byte-compared against `PI-QUEUE.md`'s paste block → **MATCH: True**; the DEFAULT emission
**300 B / `sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=`** reproduces ⊕⁷⁶'s CSP-digest figure.

**β's divergence claim is CONFIRMED on disk.** The dispatch names two β records; only
`lanebeta-unit1/` carries π content. The cell *count* (2) is right, its attribution to two
records is not. Both cells are β0's.

**β: 2 CAPTURED-GREEN · 0 DEFECT-ROUTED · 0 BLOCKED · 0 DROPPED.**

### 2.3 · LANE γ / handmark — 10 cells (row #51) · `PI-BATTERY-gamma-handmark.md`

| # | cell | verdict | figure of record |
|---|---|---|---|
| 14 | π-BAND | **DEFECT-ROUTED** (#51) | arms *select* correctly in Chromium and real Safari 26.4; the band **paints 0 of 144,400 device px** for the cell's own specimen, both themes. Dark arm **L 0.480–0.493** against `[0.42,0.48]`; `oklch(0.86 0.16 270)` gamut-maps to **C 0.071 < 0.08** |
| 15 | π-RING | **DEFECT-ROUTED** (#51) | reservation **does** push a real neighbour; the ring is never painted — two independent causes |
| 16 | π-MOBILE | **DEFECT-ROUTED** (#51) | no bridging (PASS), but **two** chisels per line rect, not one |
| 17 | π-DRAW | **DEFECT-ROUTED** (#51) | `T = 140 + 0.55·L` and the per-rect clocks **exact**; `stroke-dashoffset` ratio **−23.000** on every guide, both engines, `playState: finished`; the story's own Replay erases the mark |
| 18 | π-PEN | **CAPTURED-GREEN** | painted `w(48.7157)/w(18.608)` = **1.9615** light / **2.2018** dark, both inside `2.06 ±10%` |
| 19 | π-HOVER | **CAPTURED-GREEN** | real hover re-inks on `--spring-press` |
| 20 | π-TOUCH | **CAPTURED-GREEN** | real coarse pointer (`(hover:none)` / `(pointer:coarse)` true), tap re-inks, paired untapped control in the same frame |
| 21 | π-SCROLL | **DEFECT-ROUTED** (#51) · **KILL CRITERION NOT TRIGGERED** | 41 rAF samples over a 0→163px scroll all read `matrix(1,0,0,1,0,0)`; amplitude **0.00 px ≤ 1.5 px**, satisfied only because the mechanism is inert. Detachment not observed ⇒ the DELETION criterion is not triggered; disposition is the owner's |
| 22 | π-GALLERY | **DEFECT-ROUTED** (#51) | five sections present; at rest four show no mark at all |
| 23 | π-LADDER | **CAPTURED-GREEN** | three rungs = `--type-body × {1, 1.618, 2.618}` exactly |

**γ/handmark: 4 CAPTURED-GREEN · 6 DEFECT-ROUTED · 0 BLOCKED · 0 DROPPED.**

### 2.4 · LANE γ / aurora + blob — 13 cells (rows #49/#50) · `PI-BATTERY-gamma-aurora-blob.md`

The battery states its cell count both ways: *"the order names π-ARCHIVE · π-W1 · the ten-cell
π-BLOB battery · π-CEILING, and notes π-W1 is a member of π-BLOB, not a peer. Measured: 1 + 10 + 1
= 12 cells, plus π-REVERSE-DRAG which row #49 carries as a named V-A95 rider on π-ARCHIVE and which
is drained separately below — 13 verdicts."* Confirmed against `unit3/RECORD.md` §3 (ten rows) and
`unit4/RECORD.md` §5.

| # | cell | verdict | figure of record |
|---|---|---|---|
| 24 | π-ARCHIVE | **CAPTURED-GREEN** + 2 defects routed → #49 | 108 beacon-gated captures (10 mediums × 2 engines × 2 themes + 17 presets × 2 × 2); **10 mediums on disk, not the order's 8**; clause (a) discharged in all 40; clause (c) live: `webgpu · apple · metal-3` vs `webgl2 · ANGLE (…Apple M5 Max)` |
| — | π-ARCHIVE / γ0 watch (sub-arm) | **DEFECT-ROUTED** → #49 | 1440×900: shell **558px = --stage-block** exactly, grid `310.062px 245.938px`, ribbon **55.6%**, controls port **188/2662 = 7.06%**, 190 of 199 leaf nodes below the clip. 390×844: rows `266.875px 288px 0px`, controls **0px**, port **0/2462 = 0.0000** |
| 25 | π-REVERSE-DRAG (V-A95) | **CAPTURED-GREEN** | ring delta `{+31.325%, −24.396%}` = pointer-implied `{+31.325%, −24.396%}` exactly, zero cross-talk, run twice — non-reproductions **5 and 6** |
| 26 | π-W1 | **CAPTURED-GREEN** (before-half; **pair stays OPEN**) | gate `4 passed \| 1 expected fail`, REAL_EXIT=0; register re-derived **53 lines / 11 files**, identical; three live-code lines at `useMetaballRenderer.ts:13/193/194`. Fence holds, zero GLSL deletable-claimed |
| 27 | π-CEILING | **CAPTURED-GREEN** (all 3 arms, exits 0/0/0) + 1 prose refutation → #50 | green `coverage 0.156 / paintedShare 0.280`; flood plant ran on a device for the first time and bites the MAX at **0.997** |
| 28 | π-CONTAIN | **CAPTURED-GREEN** | contained at both viewports, backing 1:1, WebGPU ready |
| 29 | π-PARITY | **CAPTURED-GREEN** | one paint, WebGPU, BC-09 corroborated; liveness **0.00283–0.00779** over 8 frames |
| 30 | π-SEPARATE | **BLOCKED — SUBJECT NOT BUILT** | grounds in §3 |
| 31 | π-FISSION (+ g1 window) | **BLOCKED — SUBJECT NOT BUILT** | grounds in §3 |
| 32 | π-CALM | **BLOCKED — SUBJECT NOT BUILT** | grounds in §3 |
| 33 | π-CHAOS | **BLOCKED — SUBJECT NOT BUILT** | grounds in §3 |
| 34 | π-DEPTH | **BLOCKED — SUBJECT NOT BUILT** | grounds in §3 |
| 35 | π-SETTLE | **BLOCKED — SUBJECT NOT BUILT** | grounds in §3 |
| 36 | π-PERF | **BLOCKED — SUBJECT NOT BUILT** | grounds in §3 |

**ASK g3 is RECORDED, NOT DECIDED** and is therefore not a drop: §1.5 banks
`pi-ARCHIVE-g3-DUSK-DAWN-adjacent-{wgpu,gl}-{dark,light}.png`, DUSK left / DAWN right, same frame,
same arm; measured wgpu/dark DUSK `[234.68, 151.24, 131.16]` vs DAWN, *"not confusable at a glance
on this evidence"*. The handmark seat's own π-GALLERY §refuses g3 with grounds and routes it to
row 49 — and row 49's seat then recorded it. **No gap between the two γ seats.**

**γ/aurora+blob: 6 CAPTURED-GREEN · 1 DEFECT-ROUTED (γ0 watch sub-arm) · 7 BLOCKED · 0 DROPPED.**

### 2.5 · LANE δ — 28 cells · **NO BATTERY EXISTS**

| # | cell | source | subject | artifacts on disk | verdict |
|---|---|---|---|---|---|
| 37 | δ-π-1 | unit1 §7 | `/substrates/blob` @1440 · two grid tracks, shell `clientWidth ≥ 1024` | 2 (`pi-d1-CONFIG-tracks-*`) | **DROPPED** |
| 38 | δ-π-2 | unit1 §7 | expand → `data-state=expanded`, `backdropFilter === "none"`, WGPU still paints | 3 (`pi-d2-EXPAND-wgpu-*`) | **DROPPED** |
| 39 | δ-π-3 | unit1 §7 | `/foundations/typography` @1440 · three `[data-span=full]` sections | 2 (`pi-d3-TYPO-fullspan-*`) | **DROPPED** |
| 40 | δ-π-4 | unit1 §7 | `/substrates/blob` @390 · one track, seam + split agreeing | 2 (`pi-d4-CONFIG-stacked-390-*`) | **DROPPED** |
| 41 | δ2-π-1 | unit2 §7 | fourier boot + ℱ, both themes · mark:ink ∈ [1.5,3.0]:1, no white specular cluster | 4 | **DROPPED** |
| 42 | δ2-π-2 | unit2 §7 | N ∈ {1, 8, 16, 61} · fit-fixed-under-N | 1 | **DROPPED** |
| 43 | δ2-π-3 | unit2 §7 | dark · ring:ground ≥3.0:1, zero pixels in OKLab hue 80–120° | 3 | **DROPPED** |
| 44 | δ2-π-4 | unit2 §7 | interactive · role census, `aria-valuenow` walk, t=0 vs t=3s | 4 | **DROPPED** |
| 45 | δ2-π-5 | unit2 §7 | flick sweep · zero negative `headT` deltas, ≤0.5 turns | 1 | **DROPPED** |
| 46 | δ2-π-6 | unit2 §7 | ring law, 4 cells · CPU predicate vs shader agree | 1 | **DROPPED** |
| 47 | δ2-π-7 | unit2 §7 | story mobile 390×844 · no horizontal overflow | 2 | **DROPPED** |
| 48 | δ2-π-8 | unit2 §7 | no-WebGPU host · zero canvas pixels, no second renderer | 2 | **DROPPED** |
| 49 | δ3-π-1 | unit4 §8 | `/` mega title, fit-cap bounds it at 390 | 3 | **DROPPED** |
| 50 | δ3-π-2 | unit4 §8 | `/` card 1 full-span + `content-visibility`, zero overflow | 2 | **DROPPED** |
| 51 | δ3-π-3 | unit4 §8 | `/` first paint CDP · no layout shift attributable to card 1 | 1 | **DROPPED** |
| 52 | δ3-π-4 | unit4 §8 | three landings · no empty well, no doubled title, DELTA vs `git archive 8a96868d` | 12 | **DROPPED** |
| 53 | **δ3-π-5** | unit4 §8 | `/display` + `/substrates` @1440 · four authored tiles + six stills paint, **0 GL contexts on any landing** | **0** | **DROPPED — AND NEVER CAPTURED** |
| 54 | δ3-π-6 | unit4 §8 | `/navigation/toc-tracking` · ToC track ≤ min(21rem, 30%), AA on tracked headings | 15 | **DROPPED** |
| 55 | δ3-π-7 | unit4 §8 | page name appears EXACTLY once in the a11y tree | 1 | **DROPPED** |
| 56 | δ3-π-8 | unit4 §8 | `/` @852×393 landscape · hero does not eat the fold | 2 | **DROPPED** |
| 57 | δ4-π-1 | unit3 §8 | ordinary story route · light AND dark · 1440×900 + 390×844 | 4 | **DROPPED** |
| 58 | δ4-π-2 | unit3 §8 | scroll-stop snap @1440 | 1 | **DROPPED** |
| 59 | δ4-π-3 | unit3 §8 | legibility under the collapsed chrome, both themes | 8 | **DROPPED** |
| 60 | δ4-π-4 | unit3 §8 | PRM reduce @1440 | 2 | **DROPPED** |
| 61 | δ4-π-5 | unit3 §8 | G1 arm · 390×844 + 852×393 landscape | 2 | **DROPPED** |
| 62 | δ4-π-6 | unit3 §8 | compositor-only · CDP trace across a 600px scroll burst | 1 | **DROPPED** |
| 63 | δ4-π-7 | unit3 §8 | hero routes + a category landing | 1 | **DROPPED** |
| 64 | δ4-π-8 | unit3 §8 | DELTA capture · rest and full collapse | 9 | **DROPPED** |

**δ: 0 CAPTURED-GREEN · 0 DEFECT-ROUTED · 0 BLOCKED · 28 DROPPED.**

**Grounds, read from the seat's own transcript, not inferred.** The δ seat is
`agent-ae40862efa6f03f16.jsonl` (411 lines, 1.5 MB). Its first user message carries this band's
order verbatim — *"YOUR BAND: the δ queue — 28 cells (4 + 8 + 8 + 8) per the ⊕⁷⁸ census
correction"* — and its **terminal record** is
`{"model":"<synthetic>", "content":[{"type":"text","text":"API Error: Connection closed
mid-response. The response above may be incomplete."}]}` at `2026-08-28T17:02:08.495Z`. Last
artifact mtime is **12:43** local. **The seat captured the band and died before writing a verdict.**
The 91 artifacts are real, banked, and unadjudicated. **This is not a refusal, not a block, and
not a green — it is a drop, and it is the one this census exists to catch.**

---

## 3 · DEFECT-ROUTE TABLE — owner per defect

**12 findings across 3 bands. None was fixed, tuned or adjudicated in any capture seat.**

| # | defect | evidence site | cells it takes down | **owner** |
|---|---|---|---|---|
| R1 | Vertical run gap: `shell-regions.css:66` `.glass-dock.vertical .dock-layer` **(0,3,0)** beats `run.css:159` `.glass-dock .dock-run` **(0,2,0)**, and the run element is both. Vertical runs paint `--dock-layer-gap` **6px** while `--dock-pitch` computes on `--dock-run-gap` **8px**. **2px/seat, 24px cumulative.** Both library `glass-dock vertical` docks show it; `--dock-layer-gap` correctly did *not* move | `run.css:159/191-192` · `shell-regions.css:66-71` | π-PROPORTION · π-RUN (vertical) · π-REACH (vertical) | **BK #47 W9**, x-ref **W3** |
| R2 | Focus ring clipped away by the run port: vertical `overflow-x:hidden` cuts left+right 4px, horizontal `overflow-y:hidden` cuts top+bottom 4px. **63 of 67** controls. Clip precedes contrast, so the cell's contrast question is unanswerable at a run seat | `pi-MATERIAL-ringclip-census-overview-1440-{light,dark}.json` | π-MATERIAL | **BK #47 W8 MATERIAL + W3 LATTICE, jointly** |
| R3 | Triple ring on `.dock-dropdown-trigger.menu__trigger` — dock outline plus `overlay-plate.css:120`'s two shadow stops; resting shadow is `none`. A **third** site of the collision W8 claimed cured at two | `pi-MATERIAL-dropdown-doublering-1440-light.json` | π-MATERIAL | **BK #47 W8 MATERIAL** |
| R4 | The combobox is not a combobox: `aria-activedescendant` follows ArrowDown across all 5 steps, but `aria-selected` and `role=option` count **0 in the entire document** at every step, and `[role=listbox]` has an empty `id` with zero owned options | `pi-SEARCH-ROUTE-aria-wiring-1440-dark.json` | π-SEARCH-ROUTE (a11y walk) | **BK #42 W-SEARCH** |
| R5 | γ-π-1 easing terminal stop: `stops.push(i === 0 \|\| i === samples ? \`${i}\` : …)` emits the loop **index** as the terminal `linear()` stop → `… 0.999 95.833%, 24 100%)`; easing(1)=24 ⇒ dashoffset settles at **−23 × dasharray** ⇒ the guide lies wholly in the dash gap ⇒ empty mask. `minJerk` is exported with **zero test references** repo-wide | `src/components/handmark/stroke.ts:86` | π-BAND · π-RING · π-MOBILE · π-DRAW · π-GALLERY | **BK #51 GF-HANDMARK** |
| R6 | γ-π-2 mask window collapse: the `-100%/300%` `userSpaceOnUse` window is a percentage of a `.hm-mark` box resolving **0px** (Chromium: strike, circle, wrapped highlight; Safari: wrapped highlight) or 9.05px. Independent of R5 — with dashoffset forced to 0 the ring still paints nothing. `G-HM-LAYER 2` reads `ringAxes()` geometry, never the rendered window | `src/components/handmark/HandMark.vue:294-301` + `:335-343` | π-BAND (hue 78) · π-RING · π-MOBILE | **BK #51 GF-HANDMARK** |
| R7 | γ-π-3 wrapper double-rect: `Range.getClientRects()` through a `<del>`/`<mark>` wrapper returns the wrapper box **and** its text box ⇒ **two chisels per line rect**. Both handmark gates stub `Range.prototype.getClientRects` | `src/components/handmark/HandMark.vue:101-114` | π-MOBILE | **BK #51 GF-HANDMARK** |
| R8 | γ-π-4 scroll listener target: ink-lag listens on `window` while the demo scrolls `main.demo-main-scroller`; `hm-mark--settling` never applied | `src/components/handmark/HandMark.vue:256` | π-SCROLL | **BK #51 GF-HANDMARK** |
| R9 | The WGSL primary does **not** reproduce the GL arm's stroke cascade. VANGOGH uniq **14 936 → 107 204 (7.2×)**, OILPASTEL_SUNSET **9 438 → 97 955 (10.4×)**, OIL_IMPASTO **5.8×**, plus hue/exposure disagreement. Smooth/crayon/metal track within a few RGB units. Deleting the GL arm destroys paint the primary does not reproduce | §1.3 · `pi-ARCHIVE-presets-*.png` · `pi-ARCHIVE-paired-pre-*.ndjson` | π-ARCHIVE | **BK #49 GF-AURORA** |
| R10 | `?aurmedium=` collapses: **7 of 10** mediums paint identically on the primary because `DEP_MIN` was not taken; only crayon/metal/metal-gradient separate. Combobox correct, paint unmoved | §1.4 · `pi-ARCHIVE-mediums-*.png` | π-ARCHIVE | **BK #49 GF-AURORA** |
| R11 | γ0 watch: the studio's controls column is portholed to **7.06%** at 1440×900 and **starved to 0px** at 390×844 — the entire configurator unreachable on mobile, the presets ribbon holding **55.6%** of the `--stage-block` envelope. Prop honoured (plain div, `overflow-y: visible` — no stale binding) | §2 · `pi-ARCHIVE-g0watch-*` | π-ARCHIVE / γ0 watch | **BK #49 GF-AURORA** |
| R12 | `paintableShareOfInterior = 0.557`, refuting unit-4 §3's derived **1.000**. The instrument is unaffected — that is what the denominator bought — the prose is wrong | §5 · `pi-CEILING-arm*-run.log` | π-CEILING | **BK #50** |

**Owner totals: #47 → 3 · #42 → 1 · #51 → 4 · #49 → 3 · #50 → 1.**

Two adjacent findings were **routed and explicitly not claimed**, and are carried here so they do
not evaporate: the sticky story header paints over the underline card's content at scrollTop 257
→ **δ `demo/chassis`**; and `/substrates/aurora` shows `data-aurora-settled` null with a
**300×150 canvas backing store against an 830×246 CSS box** → **#49 / π-ARCHIVE**.

---

## 4 · BLOCKED TABLE — grounds per block

### 4.1 · Whole cells — 7, all one band, all one ground class

**Ground: SUBJECT NOT BUILT.** Owner **#50 W2–W6**, refused with grounds by the γ seat.
Measured, not asserted: `lambda` / `quench` / `chaosLambda` / `0.3381` = **0 hits**; all 9 `drive`
and 3 `depth` hits are prose. `G-SEPARATION`'s latch and `G-CHAOS`'s λ need W2–W6 to exist.

| cell | the cell asks for | what is on disk |
|---|---|---|
| π-SEPARATE | 30 s strip @2 fps, **drive 0.90**, ≥1 frame n≥2 | no `drive` axis |
| π-FISSION (+ the **g1** window) | latched episode 9×1.4 s, bonded→free→re-bonded | `fissionAmp` exists (default **0**, the calm floor) but is **not reachable from `BlobStudioCfg`** — the studio exposes attraction / clickImpulse / responsiveness / mood / seed / harmony / orbitRadius only |
| π-CALM | **drive 0.30**, 5×3 s, n=1 every frame | no `drive` axis |
| π-CHAOS | twin-seed 60 s overlay + numeric **λ** | no λ anywhere |
| π-DEPTH | **depth 1 vs 2** paired, same seed/t | no depth axis |
| π-SETTLE | **quench** pair, freeze-exact | no quench axis |
| π-PERF | sim ≤0.5 ms/frame at **13 bodies** | **`MAX_SATS = 4`** — the component cannot reach 13 |

### 4.2 · Sub-arms blocked inside cells that otherwise drained — 4, none substituted

| sub-arm | parent cell | grounds |
|---|---|---|
| forced-colors live paint | α π-MATERIAL | no forced-colors seam in `emulate`, no CDP passthrough, Playwright MCP unregistered in this session, hand-rolled scripts barred. **Not substituted.** The forced-colors channel is precisely what the old shadow ring lost, so the cell's own headline question stays open |
| genuine touch → compat-click | α π-TAP | no tap primitive on the tool surface; the CLI's `click` dispatches a mouse chain. **Not substituted** |
| Safari cells (all) | α, whole band | **Pre-existing**, not new: `lanealpha-unit5/PI-QUEUE.md:49-51` already carries every Safari cell as **BLOCKED → BAND-BUILD** behind the ~249 build-emitted `@supports color-mix` guards. The seat neither cured nor self-certified around it. The two narrow-Safari cells `/dock/layers` and `/dock/overflow` @430×848 **stay owed** |
| π-W1 after-half | γ π-W1 | the before-half is banked (blob paints WebGPU, BC-09 corroborated); the after-half is uncapturable until **#50 W1** lands. **π-W1 stays OPEN as a pair** — its CAPTURED-GREEN is the fence receipt, not the pair |

One further limit is stated by its own seat rather than hidden: π-REVERSE-DRAG used synthetic
`PointerEvent`s into the app's own host (rings are `pointer-events-none`), and the vision arm was
declined rather than restart the shared daemon.

---

## 5 · DIVERGENCES BETWEEN THE BAND REPORTS AND THE DISK

Nine, each read on disk. **None changes a verdict; all are count or citation drift, and D1/D2/D8
are the load-bearing ones.**

| # | divergence | disk |
|---|---|---|
| **D1** | δ band report is `null` and **no `PI-BATTERY` exists** in `delta-config-fourier-scroll-story/` | `ls *.md` → no matches. 91 artifacts, 28 cells, **0 verdicts** |
| **D2** | δ3-π-5 has **zero artifacts** as well as zero verdict — the only cell in the band with neither | `ls pi-d3p5-*` → 0 |
| **D3** | γ-handmark report claims "17 PNG" | **21** on disk (20 `pi-*` + 1 `g3-*`). Understated by 4 |
| **D4** | γ-aurora-blob battery `:26` cites `alpha-dock-search/` as holding **"75 files"** | **74** |
| **D5** | γ-aurora-blob battery summary line reads *"Defects routed: **3**"*; its own §10 table lists **4** rows and its band report says 4 | the §10 table is right; the summary line is one short |
| **D6** | γ-handmark battery reads *"**Three** root defects carry all **seven** REDs"*; its ROUTING table lists **four** root defects (γ-π-1…γ-π-4) and its verdict table shows **six** DEFECT-ROUTED cells | table wins: 4 root defects, 6 routed cells |
| **D7** | α battery §SUMMARY header reads *"**Three** defects to route"*; the numbered list beneath it has **four** | list wins: 4 |
| **D8** | **π-FIELD** (`lanegamma-unit2/RECORD.md:202` and `:520` — *"their ratification is routed to π-FIELD"*, *"The drift floor's CUT is π-FIELD's"*) appears in a source of record, was **not in the ⊕⁷⁹ dispatch enumeration**, and `grep -c 'π-FIELD'` across all four batteries returns **0/0/0/0** | **never dispatched, never drained** |
| **D9** | α report's "74 artifacts" counts the battery itself | 73 capture artifacts + 1 battery |

**On D8.** Unlike `π-VIRTUAL-ANCHOR`, which unit 7 marks *"deliberately NOT enqueued"*, unit 2
never marks π-FIELD as named-not-enqueued — it routes two live obligations *to* it. It is an owed
cell with no queue-table row, and it fell between the dispatch and the bands. It is counted as a
drop here rather than waved through on the technicality that no one dispatched it.

---

## 6 · COVERAGE

**65 cells across the sources of record** — α 11 · β 2 · γ 23 (10 handmark + 12 aurora/blob +
π-REVERSE-DRAG rider) · δ 28 · π-FIELD 1.

```
19 CAPTURED-GREEN  /  10 DEFECT-ROUTED  /  7 BLOCKED  /  29 DROPPED
```

| lane | cells | captured | routed | blocked | dropped |
|---|---|---|---|---|---|
| α dock+search | 11 | 7 | 4 | 0 | 0 |
| β temp-path | 2 | 2 | 0 | 0 | 0 |
| γ handmark | 10 | 4 | 6 | 0 | 0 |
| γ aurora+blob | 13 | 6 | 1 | 7 | 0 |
| δ config/fourier/scroll/story | 28 | 0 | 0 | 0 | **28** |
| γ π-FIELD (never dispatched) | 1 | 0 | 0 | 0 | **1** |
| **TOTAL** | **65** | **19** | **10** | **7** | **29** |

**Verdict counts cross-checked against artifact counts.** 246 artifacts banded across five
directories (74 + 5 + 43 + 33 + 91), of which **155 back 36 adjudicated cells** and **91 back 27
unadjudicated δ cells**. The 36 adjudicated cells carry 36 verdicts; the ratio of verdicts to
banking directories is 4-of-5. **The whole coverage gap is one seat's death, and it is contiguous:
lane δ, all 28 cells, 91 artifacts already on disk.**

**What the band is, honestly stated.** 36 of 65 cells hold a verdict. Of those 36, **19 drained
green, 10 found defects and routed them to five named owners, and 7 refused with grounds against a
subject that does not exist yet.** 29 hold no verdict: 28 because the seat that captured them died
mid-response with the pixels already banked, and 1 because it was never dispatched.

**The δ 28 do not need re-capturing — they need adjudicating.** Every artifact is on disk with its
paired-π JSON; what is missing is the read. That is a cheaper debt than the count suggests, and
naming it that way is the point of this file.

---

## 7 · FENCE

Read-only on the repo but for this one file. No source, test, gate or package byte. No capture,
no browser, no dev server, no `getContext()`. Nothing staged, committed, stashed or checked out.
No band directory was modified, no artifact deleted, no battery edited — **the D3–D7 count drifts
are reported here, not corrected in another seat's record.** Every figure above is either lifted
verbatim from a battery on disk or measured at this seat with the command shown.

---

## RECONCILIATION — driver, 2026-08-28 (the drops cured)

The 29 DROPPED above are now zero. The post-mortem δ adjudication seat wrote
`PI-BATTERY-delta-config-fourier-scroll-story.md` from the dead seat's 91 banked
artifacts (16 CAPTURED-GREEN · 7 DEFECT-ROUTED · 4 INSUFFICIENT-EVIDENCE · 1 owed),
the singleton browser seat then captured the owed δ3-π-5 (44 artifacts, verdict
appended as that battery's §8 — DEFECT-ROUTED on the RECORD's wording, the ladder's
own claim GREEN 0/24) and the dropped π-FIELD (79 artifacts + PI-FIELD-VERDICT.md,
RECORDED-NOT-DECIDED for #49 — the decisive datum: /display and /substrates run
byte-identical shell drift and differ 12× in paint motion, so a drift-unit threshold
cannot transfer between two routes of the same field).

**The reconciled coverage line: 35 CAPTURED-GREEN · 18 DEFECT-ROUTED · 4
INSUFFICIENT-EVIDENCE · 7 BLOCKED (#50 W2-W6 subject unbuilt) · 1 RECORDED-NOT-DECIDED
(π-FIELD) · 0 DROPPED = 65.**

New routes from the two recovery seats, dispositioned: **D1** (#53 WGSL const PI —
cure quartet in flight at this writing) · **D2** (#73/#58 dark wash — same quartet) ·
**D3** (ToC 4.04:1 — driver-ruled chassis, same quartet) · **D4** (the δ3-π-5 record
wording — CURED IN PLACE this commit, dated bracket at lanedelta-unit4/RECORD.md) ·
**D5** (double WebGL probe per landing — #49 intake) · **D6** (frozen stills
theme-invariant, cream slabs on dark — #58 W-PREVIEW-CARD, δ follow-up unit) ·
**F1/F2** (aurora-hero.ts WCAG-static + composited-L claims REFUTED — STRUCK in place
this commit, both theme arms; pause-control question OPEN at #49) · **F3** (preset
shortcuts hijack focused sliders — #49 intake) · **F4** (studio stage arms only
in-view — capture precondition, #49) · **F5** (focal field theme-invariant to 5
decimals — #49 intake).

The cure quartets' π-RERUN cells (R1-R8 · D1-D3) drain at the re-capture seat; those
verdicts amend the per-band batteries, not this census.
