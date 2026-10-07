# W-I.1 · W-DOCK-EXTENT: the dock's plate, run and state from D2's converged specification, on W-0.8's carrier (loop D2) · 11.0.0

| field | value |
|---|---|
| seat | band-I wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `8536f2cc` in a scratch worktree (the task named `f3ad78d0`; every commit since is under `docs/`). `git diff --stat v10.1.0 HEAD -- src` prints nothing, so every reading measures the published 10.1.0 bytes, and the dock is the 10.0.1 dock (10.1.0 changed the Configurator only). A second worktree carries HEAD + `design/dock/pass-2/floor.patch` (`git apply --check` clean, 38 files) to say which rows D2's floor already cures |
| kind | LOOP WAVE, owned by design loop D2 (`design/dock/`). It lands only from D2's converged specification and never before D2 meets its gate (§3.1). It builds nothing the loop has not converged on |
| ships in | 11.0.0 |
| families | F-18 (whole), F-16 split (the plate's corner, W1, and O-67's edge witness family, W7), F-71 (split: O-67 R-3, the badge seat). F-16's extent and morph, F-17 and F-29's O-84a split are W-0.8's in 10.2.0 by the owner's O-88 ruling (`audit/INBOUND.md:45`; fix-10): this wave lands the rest of D2's converged spec on that carrier and re-runs W-0.8's harness gates unshimmed. The dock hallmarks (#67, #90) are W-I.6's and the run box (C-8) W-I.7's |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| instruments | the D2 harness (`$H` = `scripts/loops/dock/harness/` at landing; W-C.1 §3 step 4 moves it from `docs/tranches/BL/design/dock/harness/`, where the HEAD readings were taken, and PLAN §5 orders this wave after W-C.1; H2: eight witnesses and the R6 probe, self-test 85/85 in both engines, `pass-2/H2.md` §4). The band-I probe (appendix A) and `demo-aria.mjs` (`W-I.2.md` appendix A) for the rows the harness does not read. They land under `scripts/probes/band-I/` with `npm run probe:band-I` |
| engines | Chromium 149 headless (screenshots). **Playwright WebKit** 26.5 headless (screencast frames for morph reads, PF-1); at HEAD every unshimmed WebKit dock page crashes, so HEAD's WebKit numbers are `+shim` (the harness's colour-only aid, L-4) beside a crashed unshimmed column. After this wave every WebKit cell is unshimmed. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** (OW-3; `safari.mjs` reports Safari 26.4's own refusal) |

## 1 · What it closes

**The O-88 split (fix-10).** The owner ruled the dock collapse system into 10.2.0 (`audit/INBOUND.md:45`). `W-0.8.md` §3.2 is the one record of which item of D2's converged spec lands in which wave, and `W-0.8.md` §1 lists the rows that close there (F-16's extent and morph rows, F-17, O-84, O-84a). The rows below are what this wave closes.

| id | what | source |
|---|---|---|
| F-18 | L03b-03, L01b-47, L05b-18; R2-01-10, R2-02-06, R2-03-01 (O-56 G-2 producer half), R2-03-04, R4-02-08, R7-02-02; the owner witness items 1-6 (the lens, short overflow, scroll-into-view under the tip, the hover-transition arming, the transform-overflow arming, the block-axis clip O-63) | `REGISTRY.md:389-418` |
| F-16 split: O-67's witness family, O-66 §2 | the side, vertical and canvas docks as a witness family (W7), and the witness scope's headed real-GPU cells (W8 headed) | `INBOUND-MAP.md:626,632` |
| O-85 DOCK-PRIORITY-OVERFLOW | a per-control priority with the lowest-priority controls folding into the dock's own More menu, container-driven (IN:41; ruled to this band with O-65 as a D2 question, CUR:80). D2 rules it against the scrolling run and the cap (§3.1 item 6) | `audit/INBOUND.md:41` |
| R56 scroll glide in the dock run, handed from W-B.15 | the dock run's scroll is native; D2 rules a glide or keeps native (§3.1 item 7); G26 | `W-B.15.md` |
| UIA-KF-052, UIA-F-132 | the DockControl tone seat and loading state (W-B.2 §3.5): D2 checklist items (§3.1 item 8) | LEDGER `UIA-KF-052`, `UIA-F-132` |
| W-0.8's cure | the cap rest (O-83) shipped in 10.2.0, kept or superseded here (§3.4) | `W-0.8.md` |
| F-71 split | O-67 R-3, the reserved badge seat (an API ask decided here as a dock seat) | `audit/INBOUND-MAP.md:631` |
| inbound, F-18 | O-56 G-2 (producer half); O-63; O-64 R-6; O-67 R-1, R-2; C-2 rows 2 and 3; UIA-V-159, UIA-V-399, UIA-V-618; A2-VA-L2-7, A2-KE-L2-16 | `INBOUND-MAP.md:310-322,537,549-552,565,590,629-630,678,682` |
| O-81 (1), (3) | DOCK-END-INSET and DOCK-MOBILE-SCALE-COARSE (D2 pass-3 checklist rows; (3) with F-29). O-81 (2) DOCK-FIRST-EXPAND is W-0.8's | `audit/INBOUND.md:35` |
| ledger | #47 GF-DOCK (the state attribute; the latch at `g-dock-lattice.test.ts:925`); N-8b (producer half), N-12, N-14 (N-7, N-8a and N-15 are W-0.8's; OW-7's rim glance is read from W-0.8's capture) | `ledger/census-register-a.md:54-55`, `census-register-b.md:57,75`, `census-carries-recap.md:82-98`, `ledger/CENSUS.md:226-231` |
| carried obligations (CUR) | the O-64 R-6 probe (CUR:32); O-66 §2 scope, whose headed GPU cells are read here (CUR:35); O-67 as a witness family (CUR:36); the hardened harness and the unshimmed WebKit result (CUR:38). O-65 as a witness (CUR:33) and the rim's owner-record conflict (CUR:43) are W-0.8's | `FORMATION-PROGRESS.md:32-43` |
| W-A.2's hand-off | the `g-dock-lattice.test.ts:925` latch's assertion, which W-A.2 moves to `tests/owed/g-dock-lattice.test.ts` with a fence; this wave brings it home (§3 item 1, G13) | W-A.2 §3 item 7 |

**Not closed here.** Every row `W-0.8.md` §1 closes (the collapse unit, 10.2.0). The dock's veil (C-2 row 1) is W-H.1's M-5 and W-H.2's; this wave reads the ink W-H.1 lands. F-19's member query, naming and selection semantic are W-I.2's (the floor's seat declaration cures three of its rows here, §2.3). F-77 outside the dock is W-I.3's. The dock composition facilities (R2-06-01) are W-I.4's. The disease rows D2 decides are each a wave of their own: #48's retired facilities (Q-9) W-I.5; #67's hallmarks, OWED-3 and #90's R-7 captures (OW-5) W-I.6; C-8's run box W-I.7 (fix-2, FA-21). O-83 (the cap ellipse) ships in W-0.8 in 10.2.0; §3.4 item 4 says what this wave does with it. O-84 and O-84a are W-0.8's too (fix-10).

## 2 · The defect at HEAD

### 2.1 · The mechanisms

- **The extent.** The collapse insets are `0px`, "a corner-safe no-op" (`src/components/dock/styles/dock.css:78-92`). The box is pinned to `--dock-expanded-px` and scaled on one axis (`shape.css:103-107`) while the layers counter-scale about their own centres (`:129-138`). The first flip's endpoint is measured from the inactive full layer, which `layers.css:233-236` lays `absolute; inset: 0`, so the fallback `chrome + fullSize` (`composables/dockMorphMeasure.ts:94`) writes the collapsed width. Endpoints are `offsetWidth`/`offsetHeight` integers (`dockMorphMeasure.ts:3-7`). The orchestrator watches only the outer face (`useDockMorph.ts:89-101`; its docblock at `:8-11` says face swaps do not resize the shell), so a content change or a layer swap lands in one frame. Settle fires on `SpringProgress.settled` (`useDockSpring.ts:108-115`), about 300 ms after the extent lands.
- **The plate.** `--dock-cap-rest: 50%` on the pill (`styles/run.css:468`), written by the `gl-dock-cap-*` keyframes on the `--dock-run` scroll timeline (`run.css:483-519`, `:557-598`) into single-value corner longhands, resolves per axis, so an overflowing run paints a lens or a D. The run is `overflow-x: auto` whenever its axis is capped (`run.css:160-164`), so a hover `scale(1.1)`, a width transition or a collapsed inactive layer makes it a live scroller and arms the cap; the same scroller clips the block axis (`overflow: auto hidden`, 4 px of padding), cutting rings, outlines and hover shadows (O-63).
- **Residue.** 37 state-class selectors (`.expanded`, `.collapsed`, `.pinned`, `.always-expanded`) across `dock.css`, `layers.css`, `morph.css`, `run.css`, `shape.css`, `shell.css`, and 0 `data-dock-state` in `src`; the latch `it.fails("no state class survives in the dock band …")` at `tests/components/custom/dock/g-dock-lattice.test.ts:925`. The owner-rejected safe-inset band-aid `--dock-control-safe-inset: calc(var(--dock-control-size) * 0.1)` (`density.css:142`, `:210`; 16 references in `src`) folded into `.glass-dock :is(.glass-capsule, .glass-capsule-hover) { background-clip: content-box }` (`src/styles/glass/glass-capsule.css:165-167`), which reaches every foreign capsule in a dock (O-56 G-2).
- **Compact and rim.** `useDockSearch.ts:7-9`: "the dock NEVER auto-collapses on a passive scroll". `GlassDock` declares six props, none a scroll source (the harness reads `[fitContent, backdropMode, shape, orientation, collapse, backgroundCanvas]`); 0 `ScrollProgressRim` in `src/components/dock`.
- **Two engines, two pointer models.** `useDockSpring` (13 references in `src`) runs beside the CSS rung; the mobile scale is re-declared only under `@media (pointer: coarse)` (`density.css:378`, `controls/touch-floor.css:24`), so a narrow fine-pointer window keeps the desktop scale (O-81 (3)).
- **Retired facilities, split records.** Fission, the V↔H morph and Siri read retired in code (`GlassDock.vue:19-20`, `:542-543`) and OPEN in BK (#48). The residue's count and its gate are W-I.5's (`W-I.5.md` §2, I5-G1), the one source of record.

### 2.2 · The harness at HEAD (H2, run here)

`node $H/build.mjs <wt> --out <out> --label head` then `node $H/run.mjs --build <out>/builds/head --out <out> --safari` (`out/run-head.log`, 18:04-18:35 local, load 38-58, adapter law L-1..L-5 PASS). Cells passing (UNMEASURED and RECORD excluded):

| witness | Chromium | Playwright WebKit +shim | Playwright WebKit unshimmed | Safari |
|---|---|---|---|---|
| W1 corner | **6/22** | **5/22** | **0/22** (22 crashed) | UNMEASURED (owner's safaridriver checkbox) |
| W2 run | **2/8** | **2/8** | **0/8** (8 crashed) | UNMEASURED |
| W3 morph | **2/19** | **1/19** | **0/19** (19 crashed) | UNMEASURED |
| W4 state | **2/13** | **2/13** | **0/8** (8 crashed) | UNMEASURED |
| W5 rim | **0/6** | **0/6** | **0/6** (6 crashed) | UNMEASURED |
| W6 collapsed form | **2/4** | **2/4** | **0/4** (4 crashed) | UNMEASURED |
| W7 edge | **6/18** (+2 RECORD) | **6/18** (+2 RECORD) | **0/20** (20 crashed) | UNMEASURED |
| W8 motion | **2/6** (+3 UNMEASURED consumer rows) | **1/6** | **0/6** (6 crashed) | UNMEASURED |
| R6 probe | 1/1 (+RECORD) | 1/1 (+RECORD) | **0/1** (1 crashed) | UNMEASURED |

This matches H2's baseline at `8141658d` (`pass-2/H2.md` §5) except in two Playwright WebKit cells. W8 reads 1/6 against 2/6: `content-add` failed `pacing` at load 50, a timing cell not re-run here. W1 reads 5/22 against 6/22: `fit·hovered-rest+shim` failed here at 14.009 px, the hovered plate painted as an ellipse. H2 recorded that cell RED in 2 of 3 runs; it is now RED in 3 of 4. It is C-2 row 2 (the hover transition arms the cap) read in Playwright WebKit.

What fails, per witness (Chromium unless named; WebKit agrees where it measures):

- **W1.** The rail's ends 19.8 px off the circle (`rail·rest`, `rail·scrolled-end`, `rail·focus-end`) and `sidebar·short-viewport` 16.5 px (N-12, the owner's lens); the collapsed rests 4.6 px (horizontal), 5.9 px (vertical); warm morph frames 5.6-11.4 px; the first expands paint 2 distinct extents over 387.66 px (`moves`, O-64 R-1); card corners 2.8 px.
- **W2.** Route 1 ring cut 2.5 px on the long runs (clipped 1.75 against a free 4.25, O-63 and N-14); route 1 vertical keyboard reach 10/11; routes 2, 3, 4 and 6 are scroll containers on runs that fit (route 2 up to 318 px of range over 72/72 frames; route 4, the hover scale, 111 frames with range and a 1.5 px ring cut: C-2 row 2's arming route and O-81 (1)).
- **W3.** 17 of 19 fail. First expand: one step ×8.12, 88.93 % of D off the spring (O-64 R-1). Every expand and collapse: window 541-602 ms against a 257.6-281.4 ms allowance on the pinned rung {0.30 s, ζ 0.88} (O-64 R-4). Content ±, lead ±, swaps: no window opens, one step of 70.3-244.98 px (O-64 R-2, R2-02-07, O-56 G-1). Warm expand: a 0.34 px sub-pixel reversal (O-64 R-3). Viewport resize 6.09 px with no window; ticking 9.58 px against 1.65; `wide` faces 18-22 px beyond the plate. `hidden-shown` passes.
- **W4.** The nine compact cells are absent (no scroll source; F-17). `coarse·no-hover-latch`: 1.5 s after a tap, scale 1 → 1.1, the veil fill and the `::before` still paint. `coarse·tap-pins`: the tap pins but fires the persistent Play (R4-01-15, UIA-F-80). `prm·posture-morph` and `coarse·menu-holds` pass.
- **W5.** All six absent: no dock rim. The consumer-composed `ScrollProgressRim` overlay paints 71-210 device px outside the plate (for the record).
- **W6.** Both rests pass (the collapsed form is one plate at HEAD); `form·expand` (×9.29, dead) and `form·collapse` fail `window` (542.5 ms).
- **W7.** Every side and canvas cell fails `gutter` (0 px, bound ≥ 8, O-67 R-2) and every side cell fails `badge` (no reserved seat, O-67 R-3). Edges are whole and match the top dock (×0.83-1.1) at DPR 1/2/3 in both themes.
- **W8.** `sharp` fails on expand (a seat at scale 0.842), collapse (`div.dock-persistent` at scale 1.041 on 65 of 66 frames) and form-expand; `compact` absent. Headless pacing passes in Chromium; Playwright WebKit `content-add` fails pacing (5 frames over 40 ms at load 50, a timing cell, NOT-REPRODUCED until re-run). 60 fps and the value.js, keyframes and fourier docks: UNMEASURED (headless; value.js is fenced).
- **R6.** `ring·static` passes: 0 ring pixels change over 1 s on a static page. Arms: A 0, B 3460, C 3496, D 0. With the backdrop filter off (C) the ring changes as much as with it on (B), so the moving thing is the stripe seen through the ring, not the plate re-sampling. **O-64 R-6's "the ring changes on a static page" is REFUTED on the headless glass-ui scene; the mechanism is not isolated; keyframes' headed gh-build cell is UNMEASURED.**
- **Unshimmed Playwright WebKit.** 94 of 94 cells crash (`page.goto: Page crashed`): the nested translucent `color-mix()` edge (PF-3).

### 2.3 · Rows the harness does not read (band-I probe and demo, run here)

| row | HEAD (Chromium) | HEAD + D2 floor |
|---|---|---|
| `I1/G2-FOREIGN-CAPSULE`: a `Button emphasis="secondary"` inside `GlassDock`, luma lift of its fill at the ends (6-12 % in from each end, at mid height) against the middle | **ratio 0.00** light (end 0.3, mid 63.2, ×10⁻³ L; `background-clip: content-box`, 16 px pad), **0.01** dark (end 0.4, mid 34.6); the same Button outside the dock 1.00 in both themes. UIA-V-618's "the dark footer renders correctly" does not hold for this Button in dark | **0.01** Chromium, **0.00** Playwright WebKit: the floor does not touch it |
| `D1/SUMMARY-NESTED` (demo): `role="button"` elements that contain a control | **3** (`/dock/overview`, `/dock/layers`, `/dock/vertical`; L08-16) | — |
| `I2/ARROW-SEPARATOR`, `I2/HOME-END-FOREIGN`, `I2/GROUP-TABSTOPS` (F-19's dock rows) | RED (Notifications ×4; Middle/Middle; 4 stops) | **PASS** in both engines: floor row 1 (`[data-dock-seat]` at any depth) cures them. They are W-I.2's hold lines |
| dock hover rungs (`hover-census.mjs`, `W-I.3.md` appendix A) under `src/components/dock/` | **6** unguarded paint-bearing rules | **0** |
| Playwright WebKit, the probe's dock scenes | `page.goto: Page crashed` (unshimmed) | mount, measured |

### 2.4 · Static readings (run here)

In the table cells below, `\|` is the Markdown escape for `|`: the command itself uses a bare `|`.

| read | HEAD |
|---|---|
| `git grep -nE 'dock-cap-(rest\|cut)\|gl-dock-cap-' -- src \| wc -l` | 31 |
| `git grep -nP '\.(expanded\|collapsed\|pinned\|always-expanded)\b' -- src/components/dock/styles` | 37 lines in 6 files |
| `git grep -n 'data-dock-state' -- src \| wc -l` | 0 |
| `grep -n 'it\.fails(' tests/components/custom/dock/g-dock-lattice.test.ts` | `:925` |
| `git grep -n -- '--dock-control-safe-inset' -- src \| wc -l` | 16 |
| `git grep -n 'useDockSpring' -- src \| wc -l` | 13 |
| `git grep -nE 'scroll-timeline\|animation-timeline' -- src/components/dock \| wc -l` | 7 |
| `git grep -n 'pointer: coarse' -- src/components/dock` | `controls/touch-floor.css:24`, `density.css:378`, `index.css:141` (comment) |
| `npx vitest run tests/components/custom/dock` | 15 files, 127 passed, 1 expected fail (the `:925` latch) |
| OWED-3 (#67): `node docs/tranches/IOS27-MICRO/prototypes/spine-conductor/check.mjs` | **87/87 gates PASS**. BK discharged OWED-3 by derivation at `612717e5` (`BK/EXECUTION-PROGRESS.md:5058-5064`); the census row that reads it as still owed (`ledger/census-register-b.md:57`) is stale. §3.3 item 8 |

On HEAD + D2's floor (run here): the cap and timeline lines in the dock fall to one, a comment at `run.css:30` that names the struck mechanism; the state-class lines are 35, the latch sits at `g-dock-lattice.test.ts:854`, and `--dock-control-safe-inset` and `useDockSpring` are unchanged. The floor does not carry the §3.4 residue, and the carrier's deletions are the route's.

### 2.5 · The collapsed summary and the Metric (W-0.8's rows; fix-10)

These readings are W-0.8's born-RED figures (`W-0.8.md` §2, G12 to G15). They stay printed here as the seat took them.

fix-2's probe (`formation-audit/fix-2.md` appendix P), at `183e021a`, reproduced by pass 2 at `6b75e0a7`:

- **The summary (O-84).** A collapsed dock whose `#collapsed` slot holds a 96 px track and a Metric (`1 ×`): the summary is 40 × 40 with `aspect-ratio: 1 / 1` and `min-width` 34 px; the content is 112 px wide and overruns the plate by 28 px. FAIL. Chromium only: Playwright WebKit crashes on GlassDock.
- **The metric (O-84a).** Three Metrics, `1 ×`, `12 ×`, `123 ×`. The value box is 37.33 px (3ch) at every length; the reading gap is 5.45 px (0.3em); the ink gap to the unit is 30.83, 18.89 and 6.95 px. 3 of 3 FAIL in Chromium and in Playwright WebKit.

## 3 · The cure

D2 owns the design. §3.2 and §3.3 are the one description of D2's converged specification: the floor every route shares and the carrier the loop converges on. Two waves land it. W-0.8 lands the collapse unit in 10.2.0 (the rim, the coarse press, the P4 machine, the endpoint model, the carrier and its rows 1 to 5, O-83's length and O-84a); **`W-0.8.md` §3.2 is the one record of the split**. This wave lands every other item at 11.0.0, on the tree W-0.8, W-F.1, W-F.2, W-F.5, W-E.7 and W-H.1 leave, with the F-18 residue the loop's checklist does not hold. It lands nothing D2 has not converged on.

### 3.1 · The entry gate

D2 meets the charter's convergence criterion (`CHARTER.md:82,86`): at least three full passes, zero enumerated open gaps, a fresh adversarial audit by seats that did not author the winning spec, two consecutive clean passes. D2's own gate is its §7.5 checklist (`design/dock/REGISTRY.md:397-399`): the five problems under H2 in both engines, floor rows 1-7, the winning route's §7.3 items and the gestalt read, with the carried D2 obligations (CUR:32-38, 43) as witnesses. **Not met at this seat.** D2 is in pass 2 (`wf_7d9571b8-23e`): H2 banked (`44099fdb`), the floor patch banked (`8f4d2dbe`), D2-G's lens block test banked with verdict PROCEED (`60ed5af7`), the B′ spec launched. No winner is declared until both routes are measured under the same H2 (`REGISTRY.md:399`).

**Obligations from this seat to D2** (the §7.5 checklist is frozen for pass 2, so these enter the pass-3 checklist; the loop adopts them or states a stronger row):

1. **The hallmarks** are W-I.6's (one witness each, or a RETIRE with the owner's words); D2 carries them as witnesses for that wave.
2. **O-84 with Q-10** (W-0.8's to land, `W-0.8.md` §3.1; fix-10). O-84 asks for a content-sized collapsed summary (drop `aspect-ratio: 1` and the fixed sizes, keep the min-size floor); the owner folded it into D2 with O-65 (`FORMATION-PROGRESS.md:78`). D2's floor keeps the summary a seat-row square with `aspect-ratio: 1` (`FLOOR.md` row 1, `morph.css:107`) under Q-10 default (a), which leaves O-84's overrun standing. D2 rules Q-10 with O-84's ask and fourier's falsifier (`web/e2e/f-w14v-pd.spec.ts`, green with O-84's rule injected, IN:38) as inputs, and W-0.8 lands the ruling. W-0.8's G12 and G14 are written for Q-10 (b), O-84's ask; under (a) both are recorded "retired with D2's ruling" and O-84 takes D2's words as its DECLINE (LEDGER O-84; fix-4, FC-05). No gate picks between (a) and (b).
3. **O-81 (1)-(3)** as checklist rows (INBOUND routes them to pass 3). (1) is W2 route 4 and the end inset; (2) is W3 `first-expand`, W-0.8's G5; (3) is the dock reading W-E.7's coarse-pointer type model instead of its own `(pointer: coarse)` media query.
4. **C-2 row 2 in Playwright WebKit.** `fit·hovered-rest` is RED in 3 of 4 runs (the hovered plate paints as an ellipse). H2 recorded it intermittent and unattributed. Under the floor the cap is struck, so the reading must go to 0 of N; the loop confirms over three runs.
5. **OWED-3** re-runs if the converged spec changes the dock rung (Q-4 or Q-5); W-I.6 holds it.
6. **O-85, priority folding.** A per-control priority whose lowest controls fold into the dock's own More menu, against the scrolling run and the cut cap (O-83, Q-1). D2 rules BUILD with a witness, or RETIRE with the owner's words (IN:41). `DockControl.vue` declares no priority at `be1969ea` (G24).
7. **R56, scroll glide** (W-B.15's FOLD): D2 rules a glide on the dock run, or keeps it native with the reason recorded (G26).
8. **The tone and loading seats** (UIA-KF-052, UIA-F-132): a DockControl `tone` for a primary or accent control, and a `loading` state that seats W-B.8's DotRing. D2 rules each; `DockControl.vue` declares neither at `183e021a` (G25).

### 3.2 · What lands, whatever route converges

These rows are D2's floor: built once, measured under H2 in both engines and both themes (`FLOOR.md` §1, §4), and applied under both routes. They are decided; the loop's routes differ only on the carrier.

1. **The corner.** One pad on every side (the cross-axis pad); `--dock-cross = seat + 2·pad`; the resting corner is `--dock-cross / 2` through one owner (`.glass-dock { border-radius: var(--radius-dock) }`); the card lerp is finite. **The cut cap is struck** (Q-1 default (a)): the `--dock-run` scroll timeline, the `gl-dock-cap-*` keyframes, `--dock-cap-rest` and `--dock-cap-cut`. Seats are declared with `data-dock-seat` on `DockControl` and the three `DockTrigger` branches, and every seat reader, the snap alignment and the compact rung read the declaration.
2. **The rim** as an opt-in plate child (`scroll.rim`), clipped by the plate's radius on both axes, its fill a `scale` from the inline start fed by the one scroll reader, its inks the house rim's (`.track-ground` and ScrollProgressRim's spectrum), decorative under the plate's `aria-hidden` (Q-8 (a)). The owner-record conflict (AY B.5 "must NOT be baked into the dock" against N-7 "integrated into the bottom of the dock") reads as an opt-in seat: absent unless the consumer passes it, and inside the plate when present. OW-7's glance is read from D2's capture (W-B.4).
3. **The hover gate and the coarse press.** Every paint-bearing `:hover` rung in the dock band inside `@media (hover: hover)`; the chart's hover input from a fine pointer only; a touch or pen press on a folded dock pins it and its click is swallowed, while a press on a persistent control keeps its tap.
4. **The P4 machine.** `DOCK_CHART`: four rungs (`collapsed`, `compact`, `hover`, `pinned`), eleven typed inputs, one edge table; position hysteresis (compact at 88 px, return at 40 px, re-arm 150 ms after engagement clears); one capture-phase scroll listener on `document`, refcounted, failing loud on a selector string, a literal `null` and a detached element; one grouped prop `scroll: { source, compact?, rim? }` (Q-3 (b)). `useDockSearch` loses its second scroll shrink.
5. **The endpoint model.** Both faces laid out at their own main-axis extent at all times (the inactive one out of flow at `max-content`), `.dock-layers` their one containing block, endpoints from `borderBoxSize` (fractional), a zero read is no layout, nothing published while morphing, the budget from the dock's own used size. The run is `overflow: visible` while its seats fit; `[data-overflowing]` comes from a layout sum through `display: contents`, never `scrollWidth`, and only then is the run a native snap scroller inside a paint gutter (`--dock-run-gutter: var(--dock-pad)`; Q-2 (a)).
6. **The crash-free edge.** The plate's edge lerps its ink inside one `color-mix()` with one translucent arm; `--glass-edge-floating: 5%`, `--glass-edge-dock: 8%`. Playwright WebKit mounts every scene unshimmed.
7. **The lattice gates as invariants** (`g-dock-lattice.test.ts`: G-DOCK-BUDGET without the six-member count, G-DOCK-RUN "no scroll timeline drives anything in the band", G-DOCK-REACH, G-DOCK-STATE over declared seats, G-DOCK-MORPH, G-DOCK-MATERIAL) and the four new suites (`useDockScrollSource`, `useDockState.chart`, `dockMorphMeasure`, `GlassDock.touch-gate`).

### 3.3 · What the converged route decides, and how it lands

The carrier (P3) is D2's to converge. Two routes are live (`REGISTRY.md:351-356`):

| route | the carrier this wave lands | what it deletes |
|---|---|---|
| D2-B′, the measured scene | one rAF body steps every lane (plate insets, seat translates) on the dock spring, carries velocity across a retarget, parks at rest; per-seat FLIP with leaving seats holding their painted offset (canon P5 amended for a leaf box, Q-6 (a)) | `useDockSpring`, the one-axis box `scale` and the counter-scale (`shape.css:103-138`), the `[data-morphing]` 540 ms window, `DockCrossfade`'s in-flow resize |
| D2-G, the sliding aperture | the plate at the reserved footprint inside two nested rounded `overflow: clip` doors that translate with counter-translated contents; seats FLIP by `translate` on the same solved spring; at each retarget the script solves the spring from (x, v) and hands WAAPI a new `linear()` (canon P5 held) | the same, plus the per-frame inset writes |

Whichever converges, the landing is the converged spec's patch (floor + carrier + the choreography the winning critique accepted), with no second recipe, and these rows hold:

1. **Every extent change of a mounted dock rides the one spring:** the first flip, warm expand and collapse, a content change, a lead insertion, a layer swap, a viewport resize and a seat's own size transition, each with one owner per property.
2. **Faces are inside the plate** at every frame and at rest, including a wide `#collapsed` (per the Q-10 ruling of §3.1 item 2); no double exposure; no seat steps more than the continuity bound.
3. **The window closes on the pinned clock** (Q-4 as ruled: the 2 % settle band, or a dock-only clock token). No dead tail after the extent lands.
4. **No scale or blur on a painting seat's chain in motion**, except the seat's own engagement scale.
5. **The collapsed form is one plate** that wraps face, track and count, a dismiss is a seat inside it, and collapsed and expanded share the one morph (O-65).
6. **Side, vertical and canvas docks** share the top dock's rim, radius and composite, with a gutter ≥ 8 px from the surface above and a **reserved badge seat** that shares 0 px with a glyph (O-67). The badge seat is a slot on `GlassDock` (`#badge`) placed by the dock, not an overlay the consumer positions (F-71's O-67 R-3, CURED as a dock seat under E-5: the owner's order relayed in O-67 names it, and the amber status dot it must not overlap is a consumer's).
7. **Q-9's ruling** (fission, the V↔H morph and Siri) is W-I.5's.
8. **OWED-3** and 9. **OW-5** (the three R-7 captures) are W-I.6's.

### 3.4 · The F-18 residue and the band-0 cures

These rows are not design questions and are not on D2's checklist; items 1, 2, 3 and 6 land in this wave's patch beside the converged spec, and items 4 (its 10.2.0 half) and 5 in W-0.8's (`W-0.8.md` §3.2). None contradicts D2's floor; O-84, which does, is §3.1 item 2's.

1. **One state attribute.** The dock root carries `data-dock-state="collapsed|compact|hover|pinned"` from `DOCK_CHART`'s rung, and every state selector in the band reads it; the state classes go (HEAD's four, and the `compact` class W-0.8 adds for the 10.x line, `W-0.8.md` §3.2). The `:925` assertion becomes a plain `it` in `g-dock-lattice.test.ts` (born RED on HEAD, green on landing), per its own docblock (`:914-923`). On this wave's base W-A.2 has already moved it to `tests/owed/g-dock-lattice.test.ts` with a fence beside the old site; this wave moves it home and deletes the owed file, its `vitest.config.ts` exclusion and the fence (W-A.2 §3 item 7, the one record of the hand-off; fix-9, FH-01).
2. **The safe-inset band-aid goes.** `--dock-control-safe-inset` (both density arms) and `.glass-dock :is(.glass-capsule, .glass-capsule-hover) { background-clip: content-box }` are deleted. The dock's own control recipes (`controls/icon-button.css`, `controls/tab-button.css`, `controls/triggers.css`) keep the paint inset they need on their own rules; a foreign capsule in a dock (a glass `Button`, a `Badge`, a `Chip`) paints its whole fill (O-56 G-2, N-8b producer half).
3. **The dock reads one pointer model.** The dock's `@media (pointer: coarse)` re-declares (`density.css:378`, `controls/touch-floor.css:24`) are replaced by the tokens W-E.7's coarse-pointer type model publishes, so the dock's density and hit slop follow the same model as every other control (O-81 (3); A2-KE-L2-6's compact seats in the coarse hit slop is W-E.7's row).
4. **Band 0's O-83** (`--dock-cap-rest` a measured length in 10.2.0, W-0.8): the cap it corrects is struck in 11.0.0 under Q-1 (a), so the band-0 length token is deleted with its keyframes, with a MIGRATION row. If the owner rules Q-1 (b) (keep the cap), the band-0 length is the cap's rest and this row changes to "kept".
5. **O-84a, the metric token** (W-0.8 lands it in 10.2.0, `W-0.8.md` §3.4; fix-10): `.metric__value` drops `min-inline-size: 3ch` and `overflow-wrap: anywhere`; `.metric__label` (`:42`) drops `overflow-wrap: anywhere` for `overflow-wrap: break-word`, which breaks only a word longer than its line. `tabular-nums lining-nums` (`:72`, `:100`) stay. O-84 itself lands per D2's Q-10 ruling (§3.1 item 2).
6. **The prose sweep** (PF-10): every comment that describes `--dock-morph-t`, the aperture as HEAD built it, the cut cap or the retired facilities is rewritten or deleted in each touched file.

## 4 · Files it touches

- `src/components/dock/` wholly: `GlassDock.vue`, `DockControl.vue`, `DockTrigger.vue`, `DockCrossfade.vue`, `DockLayerGroup.vue`, `constants.ts`, `index.ts`; `composables/{dockMorphMeasure,useDockClickIntegrity,useDockMorph,useDockRun,useDockSearch,useDockShellProps,useDockState}.ts` and `useDockScrollSource.ts` (W-0.8 has landed the carrier, deleted `useDockSpring.ts` and added `useDockScrollSource.ts` and `styles/scroll-rungs.css`; this wave edits what it left); `styles/{adaptive-legibility,crossfade,density,dock,index,layer-group,layers,morph,run,shape,shell}.css`, `styles/controls/{icon-button,tab-button,triggers,touch-floor}.css` and `styles/scroll-rungs.css` (the floor patch's 38 files, `FLOOR.md` header, plus the route's, less what W-0.8 landed).
- `src/styles/glass/glass-capsule.css:122,140-171`, `src/styles/glass/material.css:334`, `src/styles/tokens/glass.css:221-233`, `src/styles/tokens/sizing.css` (struck dock tokens).
- `tests/components/custom/dock/g-dock-lattice.test.ts` (re-authored; the `:925` assertion home as an `it`), `tests/owed/g-dock-lattice.test.ts` (deleted), `vitest.config.ts` (its exclusion removed), W-0.8's four suites kept green.
- the dock stories that used the struck tokens (the `:scroll` prop on `demo/stories/dock/dock-search.vue` and the demo shell's docks is W-0.8's).
- `scripts/probes/band-I/` (appendix A) and its npm script, with `hover-census.mjs` (its text is `W-I.3.md` appendix A), which lands here because G17 runs it and W-I.3 depends on this wave (PLAN §5).
- W-D.1's placement moves these paths if it lands first; D1's ledger re-plans them (PLAN §5 note).

## 5 · Acceptance gates

Setup, in a scratch worktree carrying the candidate `src`:

```sh
H=scripts/loops/dock/harness; OUT=.cache/evidence/W-I.1/dock-out
node $H/build.mjs <wt> --out $OUT --label i1
node $H/run.mjs --build $OUT/builds/i1 --out $OUT --adapter <the converged spec's adapter> --safari          # light
DOCK_HARNESS_THEME=dark node $H/run.mjs --build $OUT/builds/i1 --out $OUT-dark --adapter <…> --safari       # dark
node scripts/probes/band-I/build.mjs <wt> i1 && node scripts/probes/band-I/measure.mjs i1 --rows I1
node scripts/probes/band-I/demo-aria.mjs $OUT/builds/i1/demo
```

The adapter is the converged spec's, linted by `adapter-law.mjs` (L-1..L-5) and reviewed as a diff against `adapter-head.mjs` before the run (H-6). Every harness gate below must pass in both themes, in Chromium and in Playwright WebKit **unshimmed**, with timing cells re-run twice and a failure seen only above load 8 recorded NOT-REPRODUCED (the harness's load law).

**W-0.8's gates, read here unshimmed (fix-10).** W3, W4, W5, W6 and W8 are W-0.8's born-RED gates in Chromium and in Playwright WebKit `+shim` (`W-0.8.md` G5 to G9, 10.2.0). This wave's G3, G4, G5, G6 and G8 read the same witnesses in the unshimmed column only, which reads 0 of N at HEAD and at this wave's base (every page crashes until G9's edge lands). The former G16 (one motion engine) and G27 to G30 (the summary and the metric) are W-0.8's G10 and G12 to G15 and are not gates of this wave.

In the table cells below, `\|` is the Markdown escape for `|`: the command itself uses a bare `|`.

| id | gate | passes when | HEAD reading (run here) |
|---|---|---|---|
| G1 · W1 corner | `node $H/w1-corner.mjs --build $OUT/builds/i1 --engine chromium,webkit --no-webkit-shim` | exit 0, 22/22 per engine | **exit 1**: Chromium 6/22, WebKit +shim 5/22, unshimmed 0/22 (crashed) |
| G2 · W2 run | `node $H/w2-run.mjs …` (same flags) | exit 0, 8/8 per engine | **exit 1**: 2/8, 2/8, 0/8 |
| G3 · W3 morph, unshimmed | `node $H/w3-morph.mjs --build $OUT/builds/i1 --engine webkit --no-webkit-shim` | exit 0, 19/19 in Playwright WebKit unshimmed; the Chromium and `+shim` columns are W-0.8's gates and stay green in `run.mjs`'s full run (G9) | **exit 1**: 0/19 unshimmed, every cell crashed (`8536f2cc`) |
| G4 · W4 state, unshimmed | `node $H/w4-state.mjs --build $OUT/builds/i1 --engine webkit --no-webkit-shim` | exit 0, 13/13 in Playwright WebKit unshimmed; the Chromium and `+shim` columns are W-0.8's gates and stay green in `run.mjs`'s full run (G9) | **exit 1**: 0/8 (8 crashed; 13 cells once the compact cells exist) unshimmed, every cell crashed (`8536f2cc`) |
| G5 · W5 rim, unshimmed | `node $H/w5-rim.mjs --build $OUT/builds/i1 --engine webkit --no-webkit-shim` | exit 0, 6/6 in Playwright WebKit unshimmed; the Chromium and `+shim` columns are W-0.8's gates and stay green in `run.mjs`'s full run (G9) | **exit 1**: 0/6 unshimmed, every cell crashed (`8536f2cc`) |
| G6 · W6 collapsed form (O-65), unshimmed | `node $H/w6-collapsed-form.mjs --build $OUT/builds/i1 --engine webkit --no-webkit-shim` | exit 0, 4/4 in Playwright WebKit unshimmed; the Chromium and `+shim` columns are W-0.8's gates and stay green in `run.mjs`'s full run (G9) | **exit 1**: 0/4 unshimmed, every cell crashed (`8536f2cc`) |
| G7 · W7 edge, gutter, badge (O-67) | `node $H/w7-edge.mjs …` | exit 0, 18/18 per engine (the canvas-clipped kind stays RECORD, the containment family W-E.2). The first and last seats' ring rows are held here, not built: W-I.7 (C-8, its own wave) lands first and cures them (I7-G4; PLAN §5) | **exit 1**: 6/18, 6/18, 0/20 |
| G8 · W8 motion (O-66 §2, headless half), unshimmed | `node $H/w8-motion.mjs --build $OUT/builds/i1 --engine webkit --no-webkit-shim` | exit 0, 6/6 in Playwright WebKit unshimmed; the Chromium and `+shim` columns are W-0.8's gates and stay green in `run.mjs`'s full run (G9) | **exit 1**: 0/6 unshimmed, every cell crashed (`8536f2cc`) |
| G9 · the crash-free edge | `run.mjs`'s unshimmed column | 0 crashed of 94 cells | **94 of 94 crashed** |
| G10 · R6 hold line (O-64 R-6) | `node $H/r6-probe.mjs … --no-webkit-shim` | `ring·static` PASS in both engines unshimmed | Chromium PASS, WebKit +shim PASS, **WebKit unshimmed 0/1 (crashed)** |
| G11 · no cut cap (static) | `! git grep -nE 'dock-cap-(rest\|cut)\|dock-plate-cross-px\|gl-dock-cap-\|scroll-timeline\|animation-timeline' -- src/components/dock` | exit 0 (under Q-1 (a); the `dock-plate-cross-px` arm under any ruling, §7) | **exit 1**: 38 lines in `src/components/dock` (31 cap lines, 7 timeline lines; fix-4 re-ran it with the `dock-plate-cross-px` arm at `715912fa`: 38, the property is W-0.8's and absent at HEAD). A comment that names the struck mechanism also fails it (HEAD + floor: `run.css:30`), which is the prose sweep's row (§3.4 item 6) and E-10's no-tombstone rule |
| G12 · one state attribute | `npx vitest run tests/components/custom/dock/g-dock-lattice.test.ts` with `:925` as `it`, and `git grep -c 'data-dock-state' -- src/components/dock` ≥ 1 | the suite passes; the attribute exists | **RED**: the test body fails at HEAD (37 state-class lines, which is why it is latched `it.fails`); 0 `data-dock-state` |
| G13 · the latch is gone and home (static) | `test ! -e tests/owed/g-dock-lattice.test.ts && ! grep -q 'it\.fails(' tests/components/custom/dock/g-dock-lattice.test.ts` | exit 0 | **exit 1** at `96dc425e` (fix-9): the `it.fails` at `:925`. On the wave's base W-A.2's owed file exists, so the first clause holds it RED there; the old form (`! grep it.fails` alone) entered the wave green, since W-A.2 removes every `it.fails` (A2-G7) (fix-9, FH-01) |
| G14 · a foreign capsule paints whole (O-56 G-2) | `measure.mjs i1 --rows I1`, row `I1/G2-FOREIGN-CAPSULE` `where: dock` | end/mid ratio ≥ 0.6, both engines (the `out` control stays ≥ 0.6) | **FAIL**: 0.00 light, 0.01 dark (Chromium); WebKit crashed at HEAD, 0.00 on the floor |
| G15 · the band-aid token is gone (static) | `! git grep -n -- '--dock-control-safe-inset' -- src` | exit 0 | **exit 1**: 16 lines |
| G17 · the dock's hover rungs (static) | `out=$(node scripts/probes/band-I/hover-census.mjs . --list 2>&1); printf '%s\n' "$out" \| grep -q '^HOVER-CENSUS rules=' && ! printf '%s\n' "$out" \| grep -q 'src/components/dock/'` (fails closed: no census line, no pass) | exit 0 | **exit 1** (fix-3, `be1969ea`, with W-I.3 appendix A placed at the path; exit 1 also with the script absent; exit 0 once the six dock rules stop being unguarded `:hover`): 6 rules (`icon-button.css:112`, `tab-button.css:69,144`, `triggers.css:78`, `layer-group.css:275`, `morph.css:288`) |
| G18 · one pointer model (static, O-81 (3)) | `! git grep -n 'pointer: coarse' -- src/components/dock` | exit 0 | **exit 1**: `touch-floor.css:24`, `density.css:378`, `index.css:141` |
| G19 · the summary wraps no control (L08-16) | `demo-aria.mjs`, row `D1/SUMMARY-NESTED` | 0, every route mounted, both engines | **FAIL**: 3 (Chromium); WebKit mounted 0 of 8 routes |
| G24 · O-85, the priority seat | `grep -qE '^\s+priority\?:' src/components/dock/DockControl.vue` | exit 0 under D2's BUILD (with D2's fold witness wired beside it); under a RETIRE the row is recorded "retired with D2's ruling" and the owner's words, as I5-G2 | **exit 1** (fix-3, `be1969ea`: `DockControl.vue` declares no `priority`) |
| G26 · R56, the run glide | D2's run-glide witness row (a fling on an overflowing run, `scrollLeft` per frame against D2's converged curve), both engines | PASS under a glide ruling; under a native ruling the row is recorded "retired with D2's ruling" and its reason | the witness does not exist at HEAD (RED by absence) |
| G25 · the loading seat | `grep -qE '^\s+loading\?:' src/components/dock/DockControl.vue`, or D2's RETIRE quoted in LEDGER `UIA-F-132` | exit 0 | **exit 1** (fix-2) |
| G23 · the harness can fail | `node $H/selftest.mjs --engine all` | SELFTEST PASS (85/85 at H2), every plant FAIL in both engines | 85/85 at `44099fdb` (`pass-2/H2.md` §4). The band-I probe's control rows (`I1` `where: out` PASS, `I1` `where: dock` FAIL) show G14 can pass and fail on one page |

**Real GPU and consumer cells (O-66 §2).** W8's 60 fps verdict and the value.js, keyframes and fourier docks are UNMEASURED headless. The glass demo's cells run headed on a real GPU in W-A.4's GPU leg (`node $H/w8-motion.mjs … --headed`); each consumer's dock is judged in its own repin addendum, named in W-L.7's packets (value.js's tree is read-only to glass seats). Until then those cells are recorded UNMEASURED with the reason, never green.

## 6 · π and DELTA obligations

The morph filmstrip, the compact-and-rim strips and the collapsed-form shots are W-0.8's captures in Chromium and Playwright WebKit `+shim` (`W-0.8.md` §6); this wave re-captures them unshimmed and headed on the GPU leg, and the summary and metric captures are W-0.8's alone. Before = the H2 run of `8536f2cc` above (`out/runs/*-head/`, 2,653 PNGs and screencasts, both engines) and the band-I probe's `bi-head` shots; after = the same runs on the candidate, both themes. Captures under `.cache/evidence/W-I.1/`; the wave record inlines each PNG's path, sha256, command and the paired harness row, so a wiped scratch is re-derivable.

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| the morph filmstrip: first expand, warm pair, reversal at 35 %, a content change, a lead insertion, a layer swap, the anchor-end pair | light, dark | Chromium screenshots; Playwright WebKit screencast | per-frame strips, before (one-frame jumps, the 540 ms window) and after | W1 corner and W3 continuity, trajectory, window, seat rows per frame |
| the rests: pill, rail and its scrolled end, the short-viewport sidebar (N-12), a 40-seat horizontal dock (R7-02-02), a four-seat dock in a 240 px container, the rail at 1440×1100 with a 24 px root (R4-02-08) | light, dark | Chromium, Playwright WebKit | rest PNGs, before (the lens, the D) and after | W1 `corner` per cell |
| seat paint in the run: focused, selected and hovered seats on a long run and a fitting run (O-63, N-14) | light, dark | Chromium, Playwright WebKit | W2 route shots | W2 `ring` cut and `paint` |
| compact on scroll with the rim, horizontal and vertical, window and element source (O-55, N-7) | light, dark | Chromium, Playwright WebKit | W4 compact and W5 rim strips | W4 compact cells, W5 `inside`, `whole`, `fill` counts at 0, .25, .5, .75, 1 |
| the collapsed form (O-65) and the side, vertical and canvas docks at DPR 1/2/3 with the badge seat (O-67) | light, dark | Chromium, Playwright WebKit | W6 and W7 cell shots | W6 `wraps`, W7 `whole`, `gutter`, `badge` |
| a foreign `Button` in a dock (O-56 G-2) | light, dark | Chromium, Playwright WebKit | `g2-*-dock-on.png` / `-off.png` | `I1/G2-FOREIGN-CAPSULE` ratio |
| the demo shell's SidebarDock and BottomDock at 1440×720 and 390×844 | light, dark | Chromium, Playwright WebKit | route captures | W1 on the demo route; the owner's lens frame (`captures/owner-2026-09-23-dock/`) reproduced before, absent after |
| the dock motion at 60 fps, headed on a real GPU | light, dark | Chromium with `--use-angle=metal` (W-A.4) | screencast | W8 `sharp` and `pacing` headed |
| the progress rim for OW-7's glance | light | Chromium | the W5 `h·expanded` strip | owner glance (W-B.4) |
| value.js, keyframes, fourier docks; real Safari | both | — | UNMEASURED (fenced tree; OW-3) | — |

## 7 · MIGRATION rows (clean break, no alias)

The collapse unit's rows (`useDockSearch`'s scroll options, `scroll` and `scroll.rim`, the summary's `aspect-ratio`, `.metric__value`'s 3ch box, the cap's rest as a length) are `W-0.8.md` §7's, at 10.2.0.

| removed or changed | successor | wave |
|---|---|---|
| the cut cap: `--dock-cap-rest`, `--dock-cap-cut`, the `gl-dock-cap-*` keyframes, the `--dock-run` scroll timeline (and band 0's measured-length `--dock-cap-rest`, O-83) | none: the plate is a stadium at every rest (Q-1 (a)); an overflow cue, if ruled, goes on the content | this |
| `--dock-plate-cross-px`, the measured plate cross size `dockMorphMeasure` publishes from 10.2.0 (W-0.8 §3.1) | `--dock-cross` (`seat + 2·pad`, §3.2 item 1): one published name for the plate's cross size. It is removed whatever Q-1 rules, since its one reader is the cap rest and `--dock-cross` states the same size (fix-4, FC-09) | this |
| state classes `.expanded`, `.collapsed`, `.pinned`, `.always-expanded` on `.glass-dock`, and `.compact`, which W-0.8 adds for the 10.x line | `[data-dock-state="collapsed" \| "compact" \| "hover" \| "pinned"]`; a consumer selector re-points | this |
| `DockState` type values | the four chart rungs | this |
| `--dock-control-safe-inset` and the dock-scoped `background-clip: content-box` on every capsule | none; a foreign capsule in a dock paints whole | this |
| tokens `--dock-vertical-padding`, `--dock-collapsed-padding`, `--dock-collapsed-summary-min-size` (O-84 keeps it as the summary's floor; struck only if D2's Q-10 ruling keeps the floor's seat-row square), `--dock-search-shrink-*`, `--dock-plate-collapsed-border`, `--dock-plate-expanded-border` | `--dock-pad`, `--dock-cross`; the edge inks `--glass-edge-floating`, `--glass-edge-dock` and `--dock-plate-*-edge` | this |
| `--dock-padding-inline` padding a horizontal dock (a horizontal dock is 8 px narrower at the comfortable density) | one pad on every side, the cross-axis pad | this |
| the dock's own `(pointer: coarse)` density re-declare | W-E.7's coarse-pointer model tokens | this |
| `#badge` absent | a reserved badge seat slot | this (additive) |

Consumer overrides retire by an addendum in each consumer's own tranche (E-6), named in W-L.7's packets: chicago's `--dock-cap-rest: 9999px`, `.page-dock .dock-run { overflow: visible }` and the 0.62 veil floor (the last is W-H.1's M-5); chicago's `backdrop-mode="static"` workaround (C-2 row 3); keyframes' comments naming `--dock-collapsed-summary-min-size` (`ChromeDock.vue:526`, `TransportDock.vue:50`); the honest-RED DOCK-COLLAPSED-FORM and SIDE-DOCK-EDGE specs each consumer keeps until its repin.

## 8 · Dependencies and ledger rows

Its edges are PLAN §5's. Closes F-18, F-16's corner and edge split and F-71's O-67 R-3 (F-16's extent and morph, F-17, O-84, O-84a, UIA-F-105 and UIA-KF-215 close in W-0.8, `W-0.8.md` §8; fix-10); O-85 (per D2's ruling); R56 (with W-B.15); UIA-KF-052 and UIA-F-132 (per D2's ruling); the inbound rows in §1 that W-0.8 does not close (each on the G row that measures its surface, recorded per row by the LEDGER seat); O-81 (1) and (3); C-2 rows 2 and 3; O-64 R-6 (REFUTED on the static page, the answer carried by W-B.2's reply with the headed gh-build cell UNMEASURED); #47; N-8b (producer half), N-12, N-14; the carried D2 obligations CUR:32, 35, 36 and 38. The G14 row closes F-18's round-2 born-RED ("HEAD 17.0 vs 3.6"), re-measured here as a luma-lift ratio.

## Appendix A · the band-I probe (shared by W-I.1, W-I.2, W-I.3)

Scratch source, reproduced so a seat can replay it after a scratch wipe. `build.mjs <worktree> <label>` bundles `App.vue` against any worktree's `src` through the `@glass` alias (the CSS entry is the dock harness's `h.css` pattern). `measure.mjs <label> [--engines chromium,webkit] [--rows I1,I2,I3]` drives Chromium 149 (`--force-color-profile=srgb`) and Playwright WebKit 26.5 at 900×900, DPR 1, reduced motion, and exits 1 on any FAIL row. A page that crashes is a FAIL row (`MOUNT/<scene>`), never a skipped one. When it lands under `scripts/probes/band-I/`, the `node_modules` literal becomes the repository's own.

At HEAD, Chromium: `VERDICT head: 13 FAIL of 17 gated rows`. Playwright WebKit: `MOUNT/g2` and `MOUNT/keys` crash; the carousel and coarse rows measure.

`build.mjs`:

```js
import fs from "node:fs"; import path from "node:path"; import { pathToFileURL, fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
const wt = path.resolve(process.argv[2]); const label = process.argv[3] ?? "head"; const nm = path.join(wt, "node_modules");
const out = path.join(here, "..", "out", "bi-" + label); fs.mkdirSync(out, { recursive: true });
const vite = await import(pathToFileURL(path.join(nm, "vite/dist/node/index.js")).href);
const vue = (await import(pathToFileURL(path.join(nm, "@vitejs/plugin-vue/dist/index.mjs")).href)).default;
const tailwind = (await import(pathToFileURL(path.join(nm, "@tailwindcss/vite/dist/index.mjs")).href)).default;
const src = path.join(out, "src"); fs.rmSync(src, { recursive: true, force: true }); fs.mkdirSync(src, { recursive: true });
fs.writeFileSync(path.join(src, "index.html"), `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>band-I probe</title></head><body><div id="app"></div><script type="module" src="./main.ts"></script></body></html>`);
fs.writeFileSync(path.join(src, "main.ts"), `import "./h.css";\nimport { createApp } from "vue";\nimport App from "./App.vue";\nconst t = new URLSearchParams(location.search).get("theme"); if (t === "dark") document.documentElement.classList.add("dark");\ncreateApp(App).mount("#app");\n`);
fs.writeFileSync(path.join(src, "h.css"), `@import "${nm}/tailwindcss/index.css" source("./");\n@source "${wt}/src/components/**/*.vue";\n@source "${wt}/src/components/_shared/**/*.ts";\n@source "${wt}/src/components/**/index.ts";\n@import "${nm}/tw-animate-css/dist/tw-animate.css";\n@import "${wt}/src/styles/index.css";\nbody { min-height: 100vh; margin: 0; }\n`);
fs.copyFileSync(path.join(here, "app", "App.vue"), path.join(src, "App.vue"));
await vite.build({ configFile: false, root: src, base: "./", cacheDir: path.join(out, ".vite"), logLevel: "warn", plugins: [tailwind(), vue()],
  resolve: { alias: [{ find: "@glass", replacement: path.join(wt, "src") }, { find: /^vue$/, replacement: path.join(nm, "vue/dist/vue.runtime.esm-bundler.js") }] },
  build: { outDir: path.join(out, "dist"), emptyOutDir: true, reportCompressedSize: false, chunkSizeWarningLimit: 1e9 } });
console.log(path.join(out, "dist"));
```

`app/App.vue`:

```vue
<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { GlassDock, DockControl, DockSeparator } from "@glass/components/dock";
import { Button } from "@glass/components/button";
import { Carousel, CarouselContent, CarouselItem } from "@glass/components/carousel";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@glass/components/accordion";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@glass/components/select";
import { SegmentedTabs } from "@glass/components/tabs";
import { DarkModeToggle } from "@glass/components/dark-mode-toggle";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@glass/components/tooltip";
const q = new URLSearchParams(location.search);
const scene = q.get("scene") ?? "g2";
const foreign = q.get("foreign") !== "0"; const cActive = ref(0); const tg = ref("b"); const sel = ref("one"); const tab = ref("a");
onMounted(async () => { await nextTick(); await new Promise((r) => setTimeout(r, 400)); (window as any).__cActive = () => cActive.value; (window as any).__ready = true; });
</script>
<template>
  <main style="min-height:100vh;padding:32px;box-sizing:border-box">
    <template v-if="scene === 'g2'">
      <div style="padding-top:24px"><GlassDock aria-label="Probe dock" :collapse="false" fit-content data-t="dock">
        <DockControl shape="tab" :active="true">Home</DockControl>
        <Button emphasis="secondary" data-t="btn-dock">Log in now</Button>
      </GlassDock></div>
      <div style="padding:24px 12px"><Button emphasis="secondary" data-t="btn-out">Log in now</Button></div>
    </template>
    <template v-else-if="scene === 'keys'">
      <button data-t="before">before</button>
      <div style="padding-top:24px"><GlassDock aria-label="Run with separator" :collapse="false" fit-content data-t="dock-sep">
        <DockControl shape="tab">Search</DockControl><DockControl shape="tab">Notifications</DockControl>
        <DockSeparator /><DockControl shape="tab">Overview</DockControl><DockControl shape="tab">Activity</DockControl>
      </GlassDock></div>
      <div style="padding-top:24px"><GlassDock aria-label="Run with foreign nodes" :collapse="false" fit-content data-t="dock-foreign">
        <span style="display:none">x</span><DockControl shape="tab">First</DockControl><DockControl shape="tab">Middle</DockControl><DockControl shape="tab">Last</DockControl><span style="display:none">y</span>
      </GlassDock></div>
      <div style="padding-top:24px"><GlassDock aria-label="Grouped run" :collapse="false" fit-content data-t="dock-group">
        <div class="contents" role="group" aria-label="g1"><DockControl shape="tab">G1</DockControl><DockControl shape="tab">G2</DockControl><DockControl shape="tab">G3</DockControl></div>
        <div class="contents" role="group" aria-label="g2"><DockControl shape="tab">G4</DockControl><DockControl shape="tab">G5</DockControl></div>
      </GlassDock></div>
      <button data-t="after">after</button>
    </template>
    <template v-else-if="scene === 'carousel'">
      <div style="width:400px"><Carousel v-model:active="cActive" aria-label="probe carousel">
        <CarouselContent data-t="strip"><div v-if="foreign" data-t="foreign" style="width:0;height:0;flex:none"></div>
          <CarouselItem v-for="n in 3" :key="n" :index="n - 1" :data-t="`item-${n - 1}`"><div style="height:120px;display:grid;place-items:center;background:#ddd">Slide {{ n }}</div></CarouselItem>
        </CarouselContent></Carousel></div>
    </template>
    <template v-else-if="scene === 'hover'">
      <TooltipProvider :delay-duration="0">
      <div style="display:grid;grid-template-columns:repeat(2,300px);gap:28px;align-items:start">
        <div data-t="h-button"><Button emphasis="secondary">Secondary</Button></div>
        <div data-t="h-toggle"><ToggleGroup type="single" v-model="tg" aria-label="fmt"><ToggleGroupItem value="b">Bold</ToggleGroupItem><ToggleGroupItem value="i">Italic</ToggleGroupItem></ToggleGroup></div>
        <div data-t="h-accordion" style="width:280px"><Accordion type="single" collapsible><AccordionItem value="a"><AccordionTrigger>Section</AccordionTrigger><AccordionContent>Body</AccordionContent></AccordionItem></Accordion></div>
        <div data-t="h-select" style="width:220px"><Select v-model="sel"><SelectTrigger aria-label="pick"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="one">One</SelectItem><SelectItem value="two">Two</SelectItem></SelectContent></Select></div>
        <div data-t="h-underline" style="width:280px"><SegmentedTabs v-model="tab" variant="underline" :options="[{label:'Alpha',value:'a'},{label:'Beta',value:'b'}]" aria-label="u" /></div>
        <div data-t="h-darkmode"><DarkModeToggle /></div>
        <div data-t="h-fx-guarded"><button class="fx-guarded" style="width:120px;height:40px;background:#eee;border:0">guarded</button></div>
        <div data-t="h-fx-unguarded"><button class="fx-unguarded" style="width:120px;height:40px;background:#eee;border:0">unguarded</button></div>
        <div data-t="h-tooltip"><Tooltip><TooltipTrigger as-child><button data-t="tt-trigger" style="width:120px;height:40px">info</button></TooltipTrigger><TooltipContent>Tip text</TooltipContent></Tooltip></div>
      </div>
      </TooltipProvider>
      <div data-t="blank" style="height:200px"></div>
    </template>
  </main>
</template>
<style>
@media (hover: hover) { .fx-guarded:hover { background: #e11d48 !important; } }
.fx-unguarded:hover { background: #e11d48 !important; }
</style>
```

`measure.mjs` (`THEME=dark` opens every scene in dark; the colour maths are sRGB → OKLab, ΔE_OK the Euclidean distance, L the OKLab lightness):

```js
// band-I probe rows. node measure.mjs <label> [--engines chromium,webkit] [--rows I1,I2,I3]  exits 1 on any FAIL row
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import os from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
const NM = "<repo>/node_modules";
const { chromium, webkit } = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const { PNG } = (await import(pathToFileURL(path.join(NM, "pngjs/lib/png.js")).href)).default ?? await import(pathToFileURL(path.join(NM, "pngjs/lib/png.js")).href);
const label = process.argv[2] ?? "head"; const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const ENG = arg("--engines", "chromium,webkit").split(","); const ROWS = arg("--rows", "I1,I2,I3").split(",");
const dist = path.join(here, "..", "out", "bi-" + label, "dist"); const out = path.join(here, "..", "out", "bi-" + label, "shots"); fs.mkdirSync(out, { recursive: true });
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
const srv = http.createServer((q, s) => { const f = path.join(dist, decodeURIComponent(q.url.split("?")[0]).replace(/^\/$/, "/index.html")); if (!fs.existsSync(f)) { s.writeHead(404); return s.end(); } s.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" }); fs.createReadStream(f).pipe(s); });
await new Promise((r) => srv.listen(0, r)); const base = `http://127.0.0.1:${srv.address().port}/index.html`;
const png = (b) => PNG.sync.read(b); const px = (im, x, y) => { const i = (Math.max(0, Math.min(im.height - 1, y)) * im.width + Math.max(0, Math.min(im.width - 1, x))) * 4; return [im.data[i], im.data[i + 1], im.data[i + 2]]; };
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const oklab = ([r, g, b]) => { r = lin(r); g = lin(g); b = lin(b); const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b); return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; };
const dE = (a, b) => { const p = oklab(a), q = oklab(b); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); };
const L = (c) => oklab(c)[0];
const results = []; let fails = 0;
const row = (r) => { results.push(r); if (r.pass === false) fails++; console.log(`${r.pass === false ? "FAIL" : r.pass === true ? "PASS" : "RECORD"} ${r.gate} ${r.eng} ${JSON.stringify(Object.fromEntries(Object.entries(r).filter(([k]) => !["gate", "eng", "pass"].includes(k))))} load=${os.loadavg()[0].toFixed(1)}`); };
async function open(bt, scene, ctxOpts = {}) {
  try { return await open1(bt, scene, ctxOpts); } catch (e) { row({ gate: "MOUNT/" + scene.split("&")[0], eng: bt === chromium ? "chromium" : "webkit", crashed: String(e.message).split("\n")[0], pass: false }); return null; }
}
async function open1(bt, scene, ctxOpts = {}) {
  const b = await bt.launch(bt === chromium ? { args: ["--force-color-profile=srgb"] } : {});
  const ctx = await b.newContext({ viewport: { width: 900, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce", ...ctxOpts });
  const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => errs.push(String(e)));
  try { await page.goto(`${base}?scene=${scene}${process.env.THEME ? "&theme=" + process.env.THEME : ""}`); await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 }); await page.waitForTimeout(400); } catch (e) { await b.close(); throw e; }
  return { b, page, errs };
}
const box = async (page, sel) => { const r = await page.locator(sel).first().boundingBox(); return r && { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
for (const eng of ENG) { const bt = eng === "chromium" ? chromium : webkit;
  if (ROWS.includes("I1")) { // O-56 G-2 producer half: a foreign capsule inside the dock keeps its fill to its ends
    const o1 = await open(bt, "g2"); if (o1) { const { b, page } = o1;
    await page.addStyleTag({ content: `[data-t^="btn-"], [data-t^="btn-"] * { color: transparent !important; -webkit-text-fill-color: transparent !important }` }); await page.waitForTimeout(200);
    for (const which of ["out", "dock"]) { const sel = `[data-t="btn-${which}"]`; const r = await box(page, sel);
      const on = png(await page.screenshot({ path: path.join(out, `g2-${eng}-${which}-on.png`) }));
      await page.locator(sel).evaluate((el) => el.style.setProperty("visibility", "hidden", "important")); await page.waitForTimeout(150);
      const off = png(await page.screenshot({ path: path.join(out, `g2-${eng}-${which}-off.png`) }));
      await page.locator(sel).evaluate((el) => el.style.removeProperty("visibility"));
      const colDiff = (x) => { let s = 0, n = 0; for (let y = r.y + Math.round(r.h * 0.4); y <= r.y + Math.round(r.h * 0.6); y++) { s += Math.abs(L(px(on, x, y)) - L(px(off, x, y))); n++; } return s / n; };
      const mean = (x0, x1) => { let s = 0, n = 0; for (let x = Math.round(x0); x <= Math.round(x1); x++) { s += colDiff(x); n++; } return s / n; };
      const mid = mean(r.x + r.w * 0.4, r.x + r.w * 0.6), end = (mean(r.x + r.w * 0.06, r.x + r.w * 0.12) + mean(r.x + r.w * 0.88, r.x + r.w * 0.94)) / 2;
      const pad = await page.locator(sel).evaluate((el) => { const s = getComputedStyle(el); return `${s.backgroundClip} pad ${s.paddingLeft}`; });
      row({ gate: "I1/G2-FOREIGN-CAPSULE", eng, where: which, w: r.w, midDL: +(mid * 1000).toFixed(1), endDL: +(end * 1000).toFixed(1), ratio: +(end / (mid || 1)).toFixed(2), clip: pad, pass: end / (mid || 1) >= 0.6 }); }
    await b.close(); } }
  if (ROWS.includes("I2")) { // F-19
    { const o2 = await open(bt, "keys"); if (o2) { const { b, page } = o2;
      const tb = await page.evaluate(() => [...document.querySelectorAll('[role="toolbar"]')].map((t) => { const lb = t.getAttribute("aria-labelledby"); const name = (t.getAttribute("aria-label") || (lb ? lb.split(/\s+/).map((id) => document.getElementById(id)?.textContent ?? "").join(" ") : "")).trim(); return name; }));
      row({ gate: "I2/TOOLBAR-NAME", eng, toolbars: tb.length, unnamed: tb.filter((n) => !n).length, pass: tb.length > 0 && tb.every(Boolean) });
      const seq = async (dock, start, keys) => { await page.locator(`[data-t="${dock}"] button`, { hasText: start }).first().focus(); const seen = []; for (const k of keys) { await page.keyboard.press(k); await page.waitForTimeout(60); seen.push(await page.evaluate(() => document.activeElement?.textContent?.trim() ?? "")); } return seen; };
      const s1 = await seq("dock-sep", "Search", ["ArrowRight", "ArrowRight", "ArrowRight", "ArrowRight"]);
      row({ gate: "I2/ARROW-SEPARATOR", eng, visited: s1.join(">"), pass: ["Notifications", "Overview", "Activity"].every((x) => s1.includes(x)) });
      const h = await seq("dock-foreign", "Middle", ["Home"]); const e = await seq("dock-foreign", "Middle", ["End"]);
      row({ gate: "I2/HOME-END-FOREIGN", eng, home: h[0], end: e[0], pass: h[0] === "First" && e[0] === "Last" });
      await page.locator('[data-t="before"]').focus(); const stops = []; for (let i = 0; i < 14; i++) { await page.keyboard.press(eng === "webkit" ? "Alt+Tab" : "Tab"); const t = await page.evaluate(() => { const a = document.activeElement; return (a?.closest('[data-t="dock-group"]') ? "G:" : "") + (a?.textContent?.trim() ?? ""); }); stops.push(t); if (t === "after") break; }
      const gStops = stops.filter((s) => s.startsWith("G:")).length;
      row({ gate: "I2/GROUP-TABSTOPS", eng, groupedDockTabStops: gStops, pass: gStops === 1 });
      await b.close(); } }
    for (const fg of ["1", "0"]) { const o3 = await open(bt, "carousel&foreign=" + fg); if (!o3) continue; const { b, page } = o3;
      const x1 = await page.evaluate(() => { const s = document.querySelector('[data-t="strip"]'); const it = document.querySelector('[data-t="item-1"]'); s.scrollTo({ left: s.scrollLeft + it.getBoundingClientRect().left - s.getBoundingClientRect().left, behavior: "instant" }); return s.scrollLeft; }); await page.waitForTimeout(900);
      const act = await page.evaluate(() => window.__cActive());
      const cur = await page.evaluate(() => [...document.querySelectorAll('[data-t^="item-"]')].map((e) => `${e.dataset.t}:${e.getAttribute("aria-current") ?? e.dataset.state ?? ""}${e.hasAttribute("inert") ? ":inert" : ""}`).join(" "));
      const inView = await page.evaluate(() => { const s = document.querySelector('[data-t="strip"]').getBoundingClientRect(); return [...document.querySelectorAll('[data-t^="item-"]')].filter((e) => { const r = e.getBoundingClientRect(); return r.left >= s.left - 1 && r.right <= s.right + 1; }).map((e) => ({ t: e.dataset.t, state: e.dataset.state, inert: e.hasAttribute("inert") })); });
      const iv = inView[0] ?? {};
      row({ gate: fg === "1" ? "I2/CAROUSEL-FOREIGN" : "I2/CAROUSEL-CONTROL(no foreign child)", eng, scrollLeft: x1, active: act, inView: iv.t, inViewState: iv.state, inViewInert: iv.inert, members: cur, pass: act === 1 && iv.t === "item-1" && iv.state === "active" && !iv.inert }); await b.close(); }
  }
  if (ROWS.includes("I3")) { // F-77 at the coarse cell: a tap does not leave hover paint
    const CO = { hasTouch: true, isMobile: eng === "chromium" };
    for (const t of ["h-button", "h-toggle", "h-accordion", "h-select", "h-underline", "h-darkmode", "h-fx-guarded", "h-fx-unguarded", "tooltip"]) {
      const o = await open(bt, "hover", CO); if (!o) continue; const { b, page } = o;
      try {
        if (t === "h-button") row({ gate: "I3/CELL", eng, ...(await page.evaluate(() => ({ hover: matchMedia("(hover: hover)").matches, coarse: matchMedia("(pointer: coarse)").matches }))), pass: null });
        if (t === "tooltip") { const tg = await box(page, '[data-t="tt-trigger"]'); await page.touchscreen.tap(tg.x + tg.w / 2, tg.y + tg.h / 2); await page.waitForTimeout(900);
          const shown = await page.evaluate(() => [...document.querySelectorAll('[role="tooltip"], [data-slot="tooltip-content"]')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && getComputedStyle(e).visibility !== "hidden" && +getComputedStyle(e).opacity > 0.05; }).length);
          row({ gate: "I3/TOOLTIP-TAP", eng, tooltipsShown: shown, pass: shown === 0 }); }
        else {
          const r = await box(page, `[data-t="${t}"]`); const tgt = await box(page, `[data-t="${t}"] button, [data-t="${t}"] [role="tab"], [data-t="${t}"] [role="combobox"]`) ?? r;
          await page.touchscreen.tap(tgt.x + tgt.w / 2, tgt.y + tgt.h / 2); await page.waitForTimeout(250); await page.keyboard.press("Escape").catch(() => {}); await page.evaluate(() => document.activeElement?.blur?.()); await page.waitForTimeout(700);
          const A = png(await page.screenshot({ path: path.join(out, `hover-${eng}-${t}-latched.png`) }));
          const bl = await box(page, '[data-t="blank"]'); await page.touchscreen.tap(bl.x + 20, bl.y + 100); await page.waitForTimeout(250); await page.evaluate(() => document.activeElement?.blur?.()); await page.waitForTimeout(700);
          const B = png(await page.screenshot({ path: path.join(out, `hover-${eng}-${t}-released.png`) }));
          let n = 0, tot = 0; for (let y = r.y - 4; y < r.y + r.h + 4; y++) for (let x = r.x - 4; x < r.x + r.w + 4; x++) { tot++; if (dE(px(A, x, y), px(B, x, y)) > 0.02) n++; }
          row({ gate: "I3/COARSE-LATCH", eng, control: t, latchedPx: n, pct: +(100 * n / tot).toFixed(2), pass: n <= tot * 0.005 });
        }
      } catch (e) { row({ gate: "I3/COARSE-LATCH", eng, control: t, crashed: String(e.message).split("\n")[0], pass: false }); }
      await b.close().catch(() => {});
    }
  }
}
srv.close(); fs.writeFileSync(path.join(out, `rows-${ENG.join("+")}.json`), JSON.stringify(results, null, 1));
console.log(`VERDICT ${label}: ${fails} FAIL of ${results.filter((r) => r.pass !== null).length} gated rows`); process.exit(fails ? 1 : 0);
```

`hover-census.mjs` is `W-I.3.md` appendix A; `demo-aria.mjs` is `W-I.2.md` appendix A.
