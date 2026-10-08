# D5 · pass 1 · C-A: the critique of family A's prototype

| field | value |
|---|---|
| seat | C-A, the adversarial critic for D5-A (`../REGISTRY.md` §3.1, "critique"). I wrote none of A's files |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `49db558e`. `P-A.patch` applied clean (`git apply --check`, then `apply`) in my own worktree at `scratchpad/D5/p1/cA/wt`, removed after. Measured size: 31 files, +514/−150; `src/` 25 files, +453/−84 (`git diff --shortstat` with the two new files intent-added). It matches `P-A.md` §0 |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | 1-minute load 15-127 across the battery (other seats' browsers). Each cell line in `C-A/logs/` carries its own load, and each JSON in `C-A/json/` carries its start and end load |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). O-87 binds the paint |
| artefacts | `C-A/logs/` (battery, E-9 re-runs, drift-all, forced, census and afterdrag, the unit plant, chip contrast), `C-A/json/` (the 18 witness JSONs), `C-A/drift-all.mjs`, `C-A/forced.mjs` (my probes), `C-A/sheets/` (HEAD-vs-proto contact sheets built from `P-A/captures/`) |

## 0 · Verdict

**ADVANCE. Convergence 9 / 31 = 29 %.**

A's mechanism works where it was built. Every number P-A reported that matters reproduced within a cell or two. The commit runs on one path for keyboard, programmatic, pointer and tap. The mount is quiet with no guard. The slider's after-drag latch is gone. Two shipped defects are cured: the chip no longer rests 7 % larger when selected, and the accordion no longer closes the WebKit page. Nothing here is a reason to retire the family.

The 22 open rows fall into three groups:

1. **The census proves classification, not adoption.** 44 of 55 declared members compose no recipe. 7 member roots in rendered scenes drift from their declaration in both engines. The unit census still passes 28/28 after a member's class is deleted. The `it.fails` latch it replaced did fail in that case.
2. **The commit contradicts the spring table's own law.** It runs a geometry bounce on `panel`, the row whose rider gives it one other job and says liveliness belongs to the light channel, never to a geometry bounce. The crest token is set by the witness's frame sampling, not by a design law. In the owner-glance frames the result cannot be seen on the bits or the button.
3. **The rows A hands to B, E or the owner** (E-3 keyboard and phone, E-4, E-6, E-7, FL-8) stay open by construction.

ADVANCE carries A into pass 2 with the gaps in §3 as its work list. Group 2 needs the agglomerator's ruling on E-2's form (SPECS X-3, risk 1) before any crest figure is final.

## 1 · Re-run numbers (mine, against `P-A.md`)

| gate | mine | P-A | note |
|---|---|---|---|
| `npm run build` | PASS, exit 0 (`scratch logs/build.log`, load 35.0) | PASS | |
| `npm run typecheck` | PASS, exit 0 (load 27.4) | PASS | |
| `vitest run` | 2319 passed, 3 failed, 9 expected fail, 1 skipped. The 3 failures are `boot-graph`'s build arm with no `dist-demo` in a fresh worktree. After `demo:dist:build`, `boot-graph` + `engage-ladder` pass 42/42 | 2321 / 1 fail | same cause |
| E-1 | 16/18 both engines; FAIL presented, ambient (no scene) | 16/18 | identical |
| E-2 | Chromium 94/108, WebKit 96/108. The migrated scenes read **166/168**: radio keyboard ArrowDown fails in **both** themes in Chromium (peak 1.000, load 34.7-35.2), not one. WebKit 84/84 | 95, 96; "167/168" | radio is X-5 (ArrowDown moves focus without selecting); deterministic, smooth frames (median 7.4-8.0 ms) |
| E-2 mount | 14/14 per engine on the migrated scenes | 14/14 | |
| E-3 | 8/12 both; keyboard-focused ×1.000, phone touch-held ×1.000 (load 72-83) | 8/12 | |
| X-1 afterdrag | drag release ×1.036 (Chromium) and ×1.026 (WebKit) at 50 ms, **×1.000 at 600 and 1500 ms**; click ×1.000 | ×1.047 / ×1.019 at 50 ms | S-8 cured, reproduced |
| E-4 | Chromium 5/10, WebKit 2/10 + 2 UNMEASURED; slider carry 0.00 px; sortable difference −6.92 px (Chromium), −4.38 px (WebKit); Sheet off-screen | 4/10, 2/10 | sortable within run-to-run spread |
| E-5 | Chromium 28/32, WebKit 26/30; every migrated scene passes; FAILs are tabs and toggle | same | |
| E-6 | absent (0 infinite animations at rest) | same | |
| E-7 | 3/4 both; static writer `src/components/slider/Slider.vue` | same | |
| E-8 | Chromium 19/19; WebKit 17/19 (toggle closes the page, PF-1) | same | |
| E-9 | Chromium **55/60**, WebKit 50/56 | 56/60, 50/56 | see below |
| P-A census | drift 12/12, single, static-inert PASS; 3 plants fail, both engines (load 35.8-41.1) | same | reproduced |

**E-9 Button under reduce squishes in Chromium too.** P-A puts this in WebKit only ("button 6/6 Chromium"). Mine: in the battery, `E-9 button press-spatial light` reads 0.030 (load 53.9). On re-run 1 it is 0.030 again (load 61.9). On re-run 2 it is 0.000 (load 56.0) (`C-A/logs/e9-button-rerun.log`). E-1's own PRM cell reads the same squish: `runtime pressed (button) PRM press-light · Δscale −0.030`, Chromium, load 36.3 (`C-A/json/E-1-chromium.json`). That makes 3 of 4 Chromium reads squishing under reduce, across loads 36-62. The loads match the passing read's, so load does not explain it. It is FL-8's (`useLiquidPress`'s reduce arm, B's primitive), present in both engines and intermittent in Chromium.

## 2 · The checklist (fixed rows: REGISTRY §2.1, §2.2, the A-facing §2.3 rows, §2.5, O-87, §3.3 items 2 and 4, the charter's failure modes)

The harness-owned rows H-1, H-3..H-7 and H-9 are R-H's, not A's, and are not scored here. H-2 and H-8 are scored because A must supply them.

| # | row | verdict | counterexample or evidence |
|---|---|---|---|
| 1 | E-1 census | **FAIL** | (a) presented and ambient have no scene. (b) `drift-all.mjs`, both engines (`C-A/logs/drift-all.log`, load 43-50): **7 rendered member roots compute `unclassed`** against their declared class: tabs (two roots, `chosen`), toggle-group item (`chosen`), dialog and sheet (`presented`), carousel (two roots, `dragged`). P-A's census picks 12 rows and never reads them. (c) `card` is declared `static` with no `modes` row, but `Card.vue:66-67` renders `role="option" tabindex="0"` when `selectable`. That is an interactive member in the static class, and no scene reaches it. SPECS §3.1 itself calls Card mode-split |
| 2 | E-2 commit bar | **FAIL** | 166/168 on the migrated scenes (radio ArrowDown, X-5). Tabs 8/12 (programmatic glide, mount glide 123.09 px) and toggle 4/12 (no commit; settles 1.015; WebKit closes the page), both engines |
| 3 | E-3 slider | **FAIL** | keyboard ×1.000 (struck, S-8), phone ×1.000 (Q-3 (c)); B's modality signal and E's stage |
| 4 | E-4 momentum | **FAIL** | slider carry 0.00 px both engines; B's |
| 5 | E-5 held touch | **FAIL** | tabs PRM press-only `[]`, toggle PRM press-only `[]` and closes WebKit. Every migrated scene passes |
| 6 | E-6 idle or its RETIRE | **FAIL** | absent; the RETIRE needs the owner's words (W-J.2 §3.2 item 5), which do not exist yet |
| 7 | E-7 one writer | **FAIL** | `Slider.vue` writes `data-engaged` outside `engage/`; the veil split is green (runtime modal 0 nodes) |
| 8 | E-8 one clock | PASS | Chromium 19/19. WebKit's 2 FAILs are toggle page closes (PF-1, unmigrated), not clock reads |
| 9 | E-9 PRM | **FAIL** | Button press-spatial 0.030 under reduce, Chromium 3/4 reads and WebKit (§1); tabs and toggle |
| 10 | FL-1 clean break | **FAIL** | `.tap-squish` and `.interactive-item` not retired (M-A8 unbuilt; still on the toggle page, `drift-all.log`). `.glass-capsule-hover` is still composed on Button, selectable Chip and action Chip (`engage-pressed+glass-capsule-hover`, both engines). Its hover lift and press snap are silenced by `scale: none` in a later layer, not removed (DV-5) |
| 11 | FL-2 no minted figure; tables read | **FAIL** | (a) `--scale-commit-pop: 1.02` is a new literal whose stated reason is the witness's frame sampling ("misses its own peak or trough in 9 of 37 commit cells", `scale-paper.css`, P-A's comment), not a ladder, envelope or spring row. `--scale-engage: 1.06` is new too and not in `ENGAGE_LADDER`. (b) The spring table says "Every row owns exactly ONE job; no job is owned twice", and its `panel` rider is "the fired deploy ... the extent morph". It also says "a celebration's liveliness belongs to the LIGHT channel (engageEnvelopes), never to a geometry bounce" (`springPresets.ts:50, 55-57, 100`). A puts every commit pop and the Switch thumb's travel on `panel`. The travel was `dock`'s job ("indicator glide"), and HEAD's switch comment rejected exactly this sub-pixel overshoot on a perceptible clock (deleted by the patch; the measured overshoot is 0.84 px). The suite stays green, so no gate polices the rider |
| 12 | FL-3 forced colors, reduced transparency | **FAIL** | `engage.css` and the new chip press layer state no `forced-colors` or `prefers-reduced-transparency` arm (grep: none). My forced-colors probe (`C-A/logs/forced.log`) shows the computed press property still changing under emulation in all 7 scenes. That is computed style, not paint, so it does not stand in for the stated arm the row asks for |
| 13 | FL-4 coarse: no hover latch, 44 px | PASS | disclosure hover moved under `(hover: hover)`; the chip's coarse tap settles 1.000 (E-2 tap cells); grow on a fine pointer only. The toggle's 1.015 latch is an unmigrated member |
| 14 | FL-5 singleton engaged rung | PASS | E-7 runtime held: 2 nodes, PRM pass, both engines |
| 15 | FL-6 rest-running bound | **FAIL (UNMEASURED)** | A edits Skeleton's resting loop (1.1 s → `--duration-xl`) and nothing measures it against W-F.6's 0 layouts/s or its off-screen stop |
| 16 | FL-7 real Safari | **OPEN** | UNMEASURED (owner's safaridriver checkbox). Every A light press is a `:active` rule, which iOS Safari gates on a `touchstart` listener (`RW.md` §4 (b)) |
| 17 | FL-8 velocity owners consume one rule | **FAIL** | untouched; B's. The Button's reduce squish (row 9) is its live symptom |
| 18 | H-2 an exemplar per declared class | **FAIL** | 7 of 9 classes have a scene; presented and ambient have none |
| 19 | H-8 mount case | PASS | 14/14 per engine, scale range 0.000, body 0.00 px |
| 20 | §2.5 gestalt, "iOS-27 grade or not" | **FAIL** | my read is below §4 |
| 21 | O-87 binding (adds no lighting layer) | PASS | the only new paint is a state-carrying press ink (chip) and one press fill (accordion, sortable row); the chip's 7 % resting scale is removed. Noted, not counted: the selectable chip keeps its `plus-lighter` radial `::after` flood (`glass-chip.css`), the glow O-87 names, on a member A rewrote |
| 22 | Q-1 in census-checkable form | PASS | `static` row, stamp, static-inert cell with a failing plant, both engines. The Card misclassification is counted under row 1 |
| 23 | cost and MIGRATION rows | PASS | +514/−150 measured; M-A1..M-A8 stated, with consumers from R-A's grep (not re-grepped here) |
| 24 | CF vacuous convergence | **FAIL** | E-1's four structural cells and the unit census are green over a table in which 44 of 55 declared members (`grep -rl engage-<class> src`: 11 member directories) compose nothing. Declaring a directory is scored as if the directory held the rung |
| 25 | CF self-citing spec | **FAIL** | the crest is fitted to the instrument: 1.0152 is "the bar's minimum", 1.02 is "the bar plus a sampling margin". The figure exists to pass E-2 and cites E-2 as its reason. P-A also changed its fork's Button and action-chip programmatic commit to `element.click()`. That is defensible (a stateless control has no model), but the author changed the instrument that scores its own route. The agglomerator should rule it into the shared app or out |
| 26 | CF gates that cannot fail | **FAIL** | plant: `engage-chosen` deleted from `Checkbox.vue`, then `vitest run tests/styles/engage-ladder.test.ts` → **28 passed** (`C-A/logs/plant-unit.log`, load 35.2). The deleted `it.fails` latch would have stayed RED. The new G-ENGAGE-RUNG describe can no longer fail on the claim its name makes ("every component directory carries a rung beyond hover"). Separately, E-2's ratio bar passes the checkbox at `peak 1.020 trough 0.997`, about 0.4 px on a 20 px face (X-3) |
| 27 | CF elegant-reduction trap | **FAIL** | one `sin(π·c)` pop for every class reduces the commit to a ratio the bar can read and the eye cannot. In the owner-glance frames, HEAD and proto are indistinguishable at crest for Switch, Checkbox, Button and the action Chip, in both themes and engines (`C-A/sheets/*.png`) |
| 28 | CF aliases | PASS | no alias minted; `--rung-*` avoids the `--engage-*` mirror |
| 29 | CF masked fallbacks | **FAIL** | `scale: none` on `engage-pressed`/`engage-chosen` silences `.glass-capsule-hover`'s `:hover` lift and `:active` snap where both still apply. A dead rule keeps running under a live one, which is what E-2 forbids. Retire the leg, or keep the capsule off the class |
| 30 | CF unverified gestalt | PASS | P-A made no gestalt claim and said so; this seat read the frames (§4) |
| 31 | CF consumer-less substrate | **FAIL** | `ENGAGE_DECLARATION` and `--rung-class` are new public surface (M-A7). Their only readers are `tests/styles/engage-ladder.test.ts` and the D5 harness: no `src/` file reads either one at runtime. The `presented` and `ambient` classes are declared with members (4 and 5) and have no recipe at all |

Rows passing: 8, 13, 14, 19, 21, 22, 23, 28, 30 = **9 of 31**.

## 3 · Open gaps, the pass-2 work list for A

1. **Adoption census (rows 1, 24, 26, 31).** Make the census read adoption, not declaration. Either a runtime drift cell over every scene the app renders (my `drift-all.mjs` is a sketch), or a unit cell that each declared member's root carries `engage-<class>`, read from the rendered component and not from bytes (H-6). Restore a latch that is RED until adoption is total. Fix `card` (a `modes` row or `chosen`).
2. **The commit's form against the spring table (rows 11, 25, 27).** Either a commit that rides light (the register's law; SPECS X-3; iOS's zero-velocity dead landing, `RW.md` §4 (a)), or a ruling that amends `panel`'s rider and names its second job. A crest chosen to clear an 8.3 ms sampler is not a design figure. Put the Switch thumb back on `dock`, or rule the 0.84 px overshoot in.
3. **Retire, don't override (rows 10, 29).** `.glass-capsule-hover`'s press snap and hover lift need D1 for the dock tabs (DV-5). Until then the capsule should leave the migrated members' class lists.
4. **H-2 (row 18).** Presented and ambient scenes. E-1 must fail, not throw, on an absent target (`P-A.md` §3).
5. **FL-3, FL-6 (rows 12, 15).** Stated forced-colors and reduced-transparency arms per recipe; Skeleton's loop measured.
6. **Carried, not A's (rows 3, 4, 6, 7, 9, 17):** B (velocity, writer, modality, `useLiquidPress` reduce), E (phone), the owner (Q-2 RETIRE).
7. **FL-7 (row 16):** UNMEASURED until the owner's checkbox.

## 4 · Gestalt read (REGISTRY §2.5)

Frames: `P-A/captures/`, set side by side in `C-A/sheets/{chromium,webkit}-{light,dark}.png` (HEAD row above proto row; rest, pressed, crest, committed).

- **Switch, Checkbox, Radio, Button, action Chip.** At every state, HEAD and proto cannot be told apart at 2x. The commit A adds is real in the trace (peak 1.020, 1.032 for the button) and absent in the frame. The bits get no visible acknowledgement beyond the state change itself.
- **Selectable Chip.** The cure is visible: the committed chip no longer swells. But the committed frame in light reads washed out. A crude pixel read (`C-A/logs/chip-contrast.log`) puts the label ink (150, 127, 106) against a near-white fill at about 3.6:1, the same at HEAD. The press is a flat darker fill, which reads as refined.
- **Accordion.** The press is a full-row 12 % stadium, a slab more than a deft acknowledgement (P-A says the same). In WebKit dark it is a calmer, flatter answer than HEAD's outlined ring, which is O-87's direction.
- **Dark Button** carries a warm bloom halo in both HEAD and proto. A did not add it. It is O-87's token wave, not this route's.
- **Missing:** the coarse capture set and the held and released states for anything but the slider. §2.5 asks for both.

Read: **not iOS-27 grade.** The route makes the library calmer (no resting swell, flatter presses) but not more alive. D-2 asks that every component display engagement, and the frames show the commit as nothing on five of seven members.

## 5 · Reproduce

```sh
E=docs/tranches/BL/design/engagement; H=$E/harness; P=$E/pass-1; S=<scratch>
git worktree add --detach $S/wt HEAD && ln -s "$PWD/node_modules" $S/wt/node_modules
git -C $S/wt apply "$PWD/$P/P-A.patch"
(cd $S/wt && npm run build && npm run typecheck && npx vitest run && npm run demo:dist:build)
node $H/build.mjs $S/wt --label final --out $S/out --app $P/P-A/scenes/App.vue
node $H/run.mjs --build $S/out/builds/final --wt $S/wt --out $S/out/runs/final --verbose
node $H/e9-prm.mjs --build $S/out/builds/final --scenes button            # twice
node $P/C-A/drift-all.mjs --build $S/out/builds/final [--engine webkit]
node $P/C-A/forced.mjs --build $S/out/builds/final
node $P/P-A/census.mjs --build $S/out/builds/final [--engine webkit]
node $P/syn/afterdrag.mjs --build $S/out/builds/final [--engine webkit]
# the unit plant: delete " engage-chosen" from src/components/checkbox/Checkbox.vue, then
(cd $S/wt && npx vitest run tests/styles/engage-ladder.test.ts)        # 28 passed; restore the file
git worktree remove --force $S/wt
```
