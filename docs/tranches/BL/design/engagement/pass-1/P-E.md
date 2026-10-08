# D5 · pass 1 · P-E: family E's prototype (the engaged stage, on B's door)

| field | value |
|---|---|
| seat | P-E, the prototype seat for D5-E (`SPECS.md` §5, §6 "P-E") |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `809f1b7c`; `src/` is the 10.1.0 bytes. `P-E.patch` passes `git apply --check` at `809f1b7c` |
| prototype | **It runs.** `P-E.patch` is the whole tree against HEAD: 26 files, +1099/−267 (src 20 files +939/−221). It contains `P-B.patch` unchanged plus E's delta, which is also kept alone as `P-E/P-E-delta-over-P-B.patch` (13 files, +559/−187; src 9 files +410/−145; it applies on HEAD + `P-B.patch`). Built in a scratch worktree, removed after |
| base | **P-B's tree, not P-A's.** SPECS §6 says "on top of P-A's or P-B's tree, whichever lands first", and P-A landed first (`f05d8555` before `525dfd07`). But the three things the same row asks P-E to add are B's parts: the release velocity, the keyboard modality signal and the one writer. P-A has none of them (`P-A.md` §0 item 4), so building on it would have meant porting B into A first, which is the agglomerator's merge, not a prototype. The stage itself is independent of the census family (E-1 stays the census family's either way) |
| harness | `../harness/` unchanged. Scene app: P-B's fork (`P-B/scenes/App.vue`, `build.mjs --app`), so P-B's readings and these are on the same page. Probes: `P-E/pe-probe.mjs` (new: keyboard arm, modifier keys, the visible fling, PRM, captures); `R-E/glance.mjs` + `R-E/build-glance.mjs` and `syn/afterdrag.mjs` reused unchanged. Sequence: `P-E/battery.sh` |
| controls | a second worktree at HEAD + `P-B.patch` (`pb`), built and read in the same runs at the same load, for every cell the stage changes (E-3, E-4 slider, the probe, the glance set) |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | 1-minute load 33-87 over the session. Final battery: Chromium 19:24-19:29 at 67-87, WebKit 19:29-19:35 at 44-79 (`P-E/logs/battery-*.log`, every cell line carries its own). Glance after it at 36-62 (`glance-*.log`). No verdict below rests on a reading taken only under load; no cell in the final runs failed on janky frames |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). O-87 binds the paint: the route adds no lighting layer |

## 0 · In brief

1. **The stage runs on P-B's door with the spec's three adds, and E-3's desk arm is whole.** Pointer-held ×1.060 and keyboard-focused ×1.060, both themes, both engines (E-3 10/12 per engine; P-B at the same load 6/12). E-7 4/4, E-2 36/36, E-5 12/12, E-8 7/7, E-9 24/24 per engine on the adopted scenes.
2. **The keyboard arm closes S-8 and both of C-B's keyboard defects.** Engagement is now `isEngaged` (hand down, or the keyboard driving), handed to the stage, which writes `data-engaged`. `data-held` stays the hand's alone, so a Tab paints no squish and no `grabbing` cursor: range ×1.000 × 1.000, `cursor: grab` (P-B at the same load: ×1.020 × 0.940, `grabbing`). Shift, Meta, Control and Alt alone engage nothing after a drag; Escape disengages; an acting key re-engages. After a pointer drag the slider is at ×1.000 by 600 ms with `:focus-visible` true (afterdrag, both engines).
3. **The release carries the hand, visibly.** The stage stretches the promoted control toward the fling on the `dock` row's impulse response, trailing edge fixed, soft-limited to the reach its grow is allowed. The visible leading edge in the page frame goes 8.13 px (Chromium) and 10.69 px (WebKit) further on a fling than on a still release; the value does not move (62 → 62); the control is at rest and leaves the top layer at 223-235 ms. Under reduce: 0.00 px. This is the visible carry C-B found missing in P-B (B's thumb carry moved an invisible body).
4. **E-4's slider cell reads FAIL, and that is the truth in its frame.** E-4 reads the thumb in the root's own frame. A stretch of the whole control moves nothing in that frame, and the thumb is invisible. P-B's PASS there is the vacuous one C-B measured. The page-frame read above is the honest cell; candidate row X-11 (§8).
5. **The Switch is not a client** (S-5). Its held state is P-B's: no promotion, no veil, 44 × 44 px held 450 ms, veil 0 through a 90 ms tap. Its commit is P-B's crest, 36/36.
6. **Two defects found and cured during the build**, each read before and after: (a) a press that focused nothing (the thumb is not focused on a press without a move; `activeElement` BODY) left the next Tab read as pointer focus, so E-3's keyboard arm read ×1.000 (`logs/battery-chromium-run1.log`, E-3 pe); the pointer mark now lives as long as the hand. (b) The stage's registered reach was first named `--engage-reach`, which E-8 read as an orphan in the envelope mirror's namespace (`run1`, E-8 mirror FAIL); renamed `--stage-*`, E-8 7/7.
7. **What stays RED, with its owner:** E-1 (no declaration: B's census is a mount registry; the census family's), E-6 (no idle rung; Q-2 RETIRE), E-3's phone arm (infeasible as written, X-2; block ×1.058), E-4 slider (the frame, X-11).

## 1 · Gates run

| gate | result | evidence |
|---|---|---|
| `npm run build` | PASS, exit 0 | `P-E/logs/build-first.log`; final `P-E/logs/final-checks.log` (19:37, load 35.5) |
| `npm run typecheck` (both projects) | PASS, exit 0 | `typecheck-first.log` (19:07, load 74-73); `final-checks.log` |
| `vitest run` (full, after `demo:dist:build`) | 239/240 files; 2322 passed, 1 failed, 10 expected fail, 1 skipped. The failure is `menu/contract` "restores focus on execute", the case P-B and C-B saw: alone 3/3 PASS on P-E and 2/2 on the P-B control (load 58-64): **NOT-REPRODUCED** | `final-checks.log` |
| first full run, kept | 2 failed: the same `menu/contract` case, and `gate:orphan-CSS-partial` "every top-level style rule … sits inside an @layer": the stage's pin and grow are unlayered on purpose (R-E's design). The gate allows named exceptions with grounds (the slider lane is one). P-E adds `glass/engage-stage.css` with its grounds (`tests/gates/orphan-css-partial.test.ts`) | `vitest-first.log` |
| new unit test | `tests/composables/motion/engageStage.keyboard.test.ts`, 4 cases: keyboard focus promotes and writes no hand, Escape releases; pointer focus and modifiers (Shift, Meta, Control, Alt, Tab) do not engage, ArrowRight does; a press that focused nothing leaves the next keyboard arrival keyed; focus leaving disengages. Planted: a modifier-accepting key rule fails case 2; writing `data-held` from the engagement fails cases 1 and 2. Restored, 4/4 | run in the worktree (19:12) |
| tests migrated | `focus-veil.test.ts` (R-E's: the slider is promoted in place over the one stage veil; the consumer row moves to `engageStage.ts`), `tests/setup.ts` (happy-dom has no popover API: R-E's stubs) | in the patch |

## 2 · What was built, against `SPECS.md` §5.1 and §6

| piece | built | where |
|---|---|---|
| the stage | R-E's: promote in place (`popover="manual"`, `showPopover()`, no DOM move), the footprint and anchor pin, the gutter-capped grow on `--spring-dock`, the one stage veil, the singleton, the one writer of `data-engaged`, release on the transitions' end. Two changes: the exit now waits on **every finite animation** on the host, its subtree and the veil (it waited on `scale` and the veil's `opacity` only), so the fling and the loupe's exit finish in the top layer; and the inline cap is a registered `<number>`, `--stage-reach`, so script can read the same figure | `composables/motion/engage/engageStage.ts` (211 lines), `styles/glass/engage-stage.css` (86) |
| clients | the Slider only. The Switch is P-B's (`useEngage` commit only): S-5 | `components/slider/Slider.vue` |
| the keyboard engagement | the door's modality signal, re-cut. `isEngaged = isHeld ∨ keyed` is returned to the adopter and handed to the stage. `keyed`: focus that did not arrive from a pointer, or a key the control acts on (`/^(.|Arrow\w+|Page(Up|Down)|Home|End|Enter)$/`); Escape and leaving clear it. The door writes `data-held` for the hand only (`""` or absent; the `"key"` value is gone) | `composables/motion/engage/useEngage.ts` |
| the writer | the stage alone. The door's `engagedOn` option is deleted (it wrote the veil's and loupe's `data-engaged` in P-B); the loupe shows on `[data-engaged] > .glass-loupe` | `useEngage.ts`, `slider/styles.css` |
| the release | the door's drag part takes `carry: "travel" \| "stage"`. The slider passes `body: getRootEl, carry: "stage"`: the release velocity goes to `flingStage(host, axis, v)`, which plays `translate(t/2) scaleX(1 + t/W)` (the leading edge travels `t`, the trailing edge holds) from `impulseFrames("dock", v, ms)` on the row's own settle clock (`rowClockMs`), with `t = cap·tanh(d/cap)` and `cap = (reach − 1)·W`. No figure is minted: the row, its clock and the reach are existing records. Under reduce nothing plays | `engageStage.ts` `flingStage`, `useEngage.ts` |
| the phone read | the area/block-size read beside E-3's arm as written: the glance set reads the phone slider's box held 450 ms | `R-E/glance.mjs` (unchanged), `P-E/logs/glance-pe.log` |

## 3 · Its row on every witness (REGISTRY §3.3 item 1)

Final run, `P-E/logs/battery-{chromium,webkit}.log`, cells in `P-E/json/pe-*/`. Scenes as P-B's battery (E-2, E-5, E-8, E-9 narrowed to the adopted scenes, E-8 also the slider). Control `pb` read in the same run.

| witness | Chromium | Playwright WebKit | reading | RED's owner |
|---|---|---|---|---|
| E-1 | FAIL 0/3 | FAIL 0/3 | no declaration in the build (B's census is a mount registry) | the census family |
| E-2 (switch, accordion, button) | **PASS 36/36** | **PASS 36/36** | P-B's commit, unchanged by the stage; the Switch is not promoted, so its crest is not masked (S-5 resolved) | — |
| E-3 | FAIL 10/2 | FAIL 10/2 | desk pointer-held ×1.060 and **keyboard-focused ×1.060**, light and dark; phone gutter 16.0..374.0 PASS; all four PRM cells PASS. RED: phone touch-held ×1.000 inline (block ×1.058, §4). `pb` at the same load: 6/12 per engine (pointer-held and keyboard ×1.000) | phone arm: X-2 (the bound) |
| E-4 (slider, sortable) | FAIL 3/1 | FAIL 3/1 | slider carry 0.00 px in the root frame (the stretch moves nothing there); slider PRM PASS (moved 79.2 px); sortable carry 7.92 px (Chromium), 9.07 px (WebKit), PRM PASS; sortable's largest one-frame jump is the ghost teleport (X-9). `pb` slider PASS (C-B: the invisible thumb) | X-11, §0 item 4 |
| E-4 visible (P-E probe, page frame) | **PASS** differential 8.13 px | **PASS** 10.69 px | fling 18.93 / 21.49 px of leading edge past the footprint, still 10.80 px (the ×1.06 grow on 360 px); value unchanged; at rest; PRM 0.00 px. `pb`: 0.00 / 0.00 (FAIL) | — |
| E-5 (accordion, press_switch, button) | PASS 12/12 | PASS 12/12 | P-B's | — |
| E-6 | FAIL 4/2, 8 UNMEASURED | FAIL 2/2, 8 UNMEASURED | no idle rung | Q-2 RETIRE (owner's words) |
| **E-7** | **PASS 4/4** | **PASS 4/4** | one writer, `engageStage.ts`; held 2 nodes (the control and the veil), held PRM 2, the open modal 0 | — |
| E-8 (switch, accordion, button, slider) | PASS 7/7 | PASS 7/7 | the grow on `--spring-dock`, the fling on the dock row's settle clock (210 ms = `--spring-dock-settle`), the veil on the shipped `--duration-*` clocks; no orphan after the rename (§0 item 6) | — |
| E-9 (switch, accordion, slider, button) | PASS 24/24 | PASS 24/24 | under reduce the grow and the stretch retire, the veil stays | — |

P-E probe (`pe-probe.mjs`), both engines, final run: kbd 10/10 (Tab, ArrowRight, Escape, re-engage, Tab out; light and dark), modifier 4/4, fling differential PASS, fling PRM PASS: **16/16 per engine**. The same probe on `pb`: 5/16 per engine (Tab paints the hand: range ×1.020 × 0.940, `grabbing`; every modifier writes `data-held="key"`; fling 0.00 px).

After-drag (`syn/afterdrag.mjs`), both engines: drag release ×1.040 at 50 ms (the exit in flight), **×1.000 at 600 and 1500 ms** with `thumb:focus-visible true`; click release ×1.000 throughout.

## 4 · E-3's phone arm, and the area read beside it

The arm as written is infeasible on the library scene (`R-E.md` §2, SPECS X-2): ×1.03 of 358 px is 368.7 px, past the gutter. P-E reads the area beside it on the glance page (390×844 coarse, held 450 ms; Chromium a long-tap, WebKit a mouse hold in a coarse context): rest 358 × 24 → held 358 × 25.4, **inline ×1.000, block ×1.058**, box 16..374, in both engines and themes (`glance-pe.log`, "phone slider"). Area ×1.058. P-B: 358 × 24 → 358 × 24. Under X-2's restatement (area or block ≥ ×1.03 inside the gutter) the prototype passes. The thickening is 1.4 px; on the phone the veil carries the engagement and the geometry hardly does (owner question, §9).

The fling on a full-width phone control: the reach is 1 inline (no room past the gutter), so `flingStage` plays nothing there. That follows from the code; it was not read in a browser.

## 5 · Q-1 (passive components), census-checkable (item 2)

(c) by construction, as `SPECS.md` §5.3. Static: the stage's clients are the files that call `useEngageStage` (now `components/slider/Slider.vue` only). Runtime, glance page, held 450 ms: Separator and Skeleton `{engaged: 0, stage: 0}` in both engines and themes; the Switch, no longer a client, `popover false, engaged 0, footprint false` (`glance-pe.log`).

## 6 · The mount case, H-8 (item 3)

The stage engages on the edge of `isEngaged` (`watch`, never `immediate`). E-2 `mount(committed)` PASS on switch, accordion and button, light and dark, both engines (inside E-2's 36/36). A control that mounts already focused by script does not engage either: nothing focuses at mount, and `focusin` is the edge. A control unmounted while engaged leaves no footprint or veil (`focus-veil.test.ts`, render test).

## 7 · Cost on the trio and the MIGRATION rows (item 4)

E's delta over P-B, `git diff --cached --numstat` in the worktree:

| file | + | − | role |
|---|---|---|---|
| `components/slider/Slider.vue` | 28 | 111 | both teleports, the veil-centre code, the scroll re-take and the inline z-raise deleted; `useEngageStage(getRootEl, isEngaged, …)`; the release body is the root with `carry: "stage"`; the loupe is the root's child |
| `components/slider/styles.css` | 16 | 6 | R-E's: the loupe hangs host-relative and shows on the engaged host |
| `components/switch/Switch.vue`, `accordion/AccordionTrigger.vue`, `separator/Separator.vue` | 0 | 0 | not clients (P-B's lines unchanged) |
| `composables/motion/engage/engageStage.ts` | 211 | 0 | the stage, `flingStage`, the finite-animation exit |
| `composables/motion/engage/useEngage.ts` | 46 | 24 | `isEngaged`; the acting-key rule; the pointer mark lives with the hand; `data-held` hand-only; `engagedOn` deleted; `carry: "stage"` |
| `styles/glass/engage-stage.css` | 86 | 0 | the UA popover box neutralized in `@layer base`; the pin unlayered at (0,2,0); `--stage-reach` registered; the grow; PRM |
| `styles/glass/focus-veil.css`, `styles/glass.css`, `styles/tokens/scale-paper.css`, `composables/motion/index.ts` | 23 | 4 | the veil's in-clock keyed on the stage veil and the modal overlay; the import; `--scale-engage: 1.06`; the exports |
| tests (4 files) | 149 | 42 | §1 |
| **src total** | **410** | **145** | 9 files. R-E alone was +317/−116 |

The whole route (P-B + E) against HEAD: 26 files +1099/−267, src 20 files +939/−221.

**MIGRATION rows** (consumer census as `R-E.md` §5: no authored consumer reads `glass-focus-veil`, `data-engaged`, `glass-loupe`, `data-focus-veil` or `--loupe-left/top`; P-B's rows stand as `P-B.md` states them, except row 2 here, which supersedes P-B's `data-held="key"`):

1. `data-engaged` means **engaged** (the hand down, or the keyboard driving the control), and only the stage writes it: on the engaged control and on the stage veil. The modal's veil keys on its overlay's `data-state="open"`.
2. `data-held` means the hand and only the hand. P-B's `data-held="key"` value is removed with no alias; a keyboard engagement is `[data-engaged]` on the control.
3. An engaged Slider is in the top layer, **including on keyboard focus**: Tab into a slider promotes it, grows it ×1.06 and recedes the world behind the veil until Escape or focus leaves. While engaged it carries `popover="manual"` and `data-engage-stage`, escapes ancestor clipping, stacking and `overflow`, and has an `.engage-footprint` previous sibling (a consumer's `:first-child`, `+` or `~` around a Slider can change for the duration). While promoted its `transition` is the stage's (`scale`), not the slider lane's `color` transition.
4. The Slider writes no `data-focus-veil` and no inline `z-index`; the loupe is the root's child; `--loupe-left` and `--loupe-top` are gone.
5. `/motion` gains `engageStage`, `flingStage`, `releaseStage`, `useEngageStage`; `useEngage` returns `isEngaged`; its `engagedOn` option is deleted; its `drag` option gains `carry`. Tokens: `--scale-engage: 1.06` (FL-2 asks whether it belongs on the ladder's engaged row); the registered `--stage-reach` and the inline `--stage-room`/`--stage-w` on a promoted host.
6. `gate:orphan-CSS-partial`'s named exceptions gain `src/styles/glass/engage-stage.css`.

## 8 · Paint: the owner-glance set (item 5)

Read by this seat, not judged (REGISTRY §2.5: the iOS-27 verdict is for seats that did not build the route).

- `P-E/glance/{pe,pb}-{chromium,webkit}-{light,dark}-…` (84 PNGs, R-E's set on both trees): desk rest, slider held, released +120 ms, keyboard-focused, switch held and committed, accordion pressed/focused and open, phone rest, phone slider held, phone two fingers (Chromium). Against R-E's HEAD frames: `R-E/shots/head-*`.
- `P-E/shots/{pe,pb}-{chromium,webkit}-{light,dark}-slider-{keyboard-engaged,fling-48ms,fling-settled}.png` (24 PNGs, 2×).

What the frames and numbers show:
- Held (desk): ×1.06 over the veil with the loupe riding above; the drag drives through the promotion (40 → 52 for +60 px). Released +120 ms: scale 1.023 and veil 0.29 (Chromium light), 1.014 and 0.11 (WebKit light); top-layer exit by about 230 ms.
- Keyboard-focused: the same promoted, grown slider over the frosted world, no loupe, no squish, `grab` cursor. P-B's frame: the slider at rest size, no veil, its range squished.
- Fling +48 ms: the control stretched toward the fling while it settles from the grow; at WebKit +48 ms the loupe's exit is still visible as a small tab above the value point (the exit now finishes in the top layer).
- Switch held: rest size, no veil. A 90 ms tap: veil 0 throughout.
- WebKit frames show no blur anywhere (headless Playwright WebKit paints no `backdrop-filter`, `R-E.md` §1 Q-3). Real Safari: UNMEASURED.
- O-87: no lighting layer added; the veil is the shipped recipe at the shipped tokens; the grow and the stretch are geometry carrying state (held, released at a velocity).

## 9 · Floor rows (REGISTRY §2.2)

| row | state |
|---|---|
| FL-1 | clean break: `data-held="key"` and `engagedOn` removed, no alias; the teleported veil and loupe gone, not kept beside the stage |
| FL-2 | the grow reads `--scale-engage`; the stretch reads the dock row, its settle clock and the grow's own reach; E-8 7/7 both engines. Open: whether `--scale-engage` belongs on `ENGAGE_LADDER`'s engaged row |
| FL-3 | the veil keeps its removal under reduced transparency and forced colors (unchanged); not read in a browser: UNMEASURED |
| FL-4 | coarse: the stage engages on the hold, never on hover; the 44 px floor holds (the stage grows, never shrinks) |
| FL-5 | singleton: Q-5 read again, Chromium, two raw touch points: one control on the stage at a time, nothing left after release (`glance-pe.log`, Q-5). WebKit UNMEASURED (one touch point) |
| FL-6 | nothing runs at rest |
| FL-7 | real Safari UNMEASURED in every visual claim |
| FL-8 | the stage's settle is a consumer of B's one release rule (`VelocitySampler`, `impulseFrames`, `rowClockMs`); no fifth velocity owner |

## 10 · Open gaps (for the critic and the agglomerator)

1. **X-11 (candidate row): E-4's slider cell reads the wrong body in the wrong frame.** The thumb is invisible and the root frame cancels any carry of the whole control. Proposal: the slider's E-4 body is its visible leading edge in the page frame, with the still release as the differential (as `pe-probe.mjs` reads it). Until the harness owner rules, the slider cell is FAIL here and the page-frame cell PASS.
2. **Keyboard engagement frosts the world.** Tab into a slider promotes it over the veil until Escape or blur. That is the spec's "B's signal writes the hold that engages the stage", and E-3's keyboard arm asks for the grow; whether a keyboard user tabbing through a form should see the world recede at each slider is an owner glance (Q-3 extended). The veil could stay the hand's while the grow is shared; that is a one-line split in the stage, not built.
3. E-3's phone arm: X-2 still needs the harness owner. Block ×1.058 is 1.4 px on a 24 px track (Q-2's figure question stands).
4. The footprint under a parent re-render (R-E §8 item 5), now measured (`P-E/rerender-probe.md`): Vue inserts and moves anchor on the host, so a sibling inserted during a hold lands between footprint and host, and a keyed move carries the host away from its footprint. The control stays pinned in place during the hold (it does not jump under the finger); on release it lands in its new slot in one frame. A D-1 gap on a rare path; not cured.
5. While promoted the host's own `transition` list is replaced by the stage's (`scale`): the slider lane's `color` transition does not run during a hold. Harmless on the slider; a client with a richer transition list would lose it.
6. The fling's magnitude is the sampler's: the harness drive (3 moves of 40 px at 16 ms) yields a stretch of about 6-11 px on 360 px. Whether that reads at a glance is for the gestalt seats.
7. E-1 and E-6 belong to the census family and Q-2. Real Safari for every row; VoiceOver for the promoted control (R-E Q-4); a two-finger scrub that drives reka.

## 11 · Artefacts and reproduce

| path (under `pass-1/`) | what |
|---|---|
| `P-E.patch` | the route against HEAD (P-B + E) |
| `P-E/P-E-delta-over-P-B.patch` | E's delta alone, on HEAD + `P-B.patch` |
| `P-E/battery.sh`, `P-E/pe-probe.mjs` | the sequence and the probe |
| `P-E/logs/battery-{chromium,webkit}.log`, `P-E/json/{pe,pb}-{chromium,webkit}/` | the scored run |
| `P-E/logs/battery-chromium-run1.log`, `battery-webkit-run1-aborted.log` | the first run (before the two cures of §0 item 6), kept as their evidence; the WebKit run was stopped after E-7 |
| `P-E/logs/glance-{pe,pb}.log`, `P-E/glance/`, `P-E/shots/` | the owner-glance set and its numbers |
| `P-E/logs/{build,typecheck,vitest}-first.log`, `final-checks.log` | §1 |
| `P-E/rerender-probe.md` | §10 item 4 |

```sh
E=docs/tranches/BL/design/engagement; P=$E/pass-1; S=<scratch>
git worktree add --detach $S/wt HEAD && ln -s "$PWD/node_modules" $S/wt/node_modules && git -C $S/wt apply "$PWD/$P/P-E.patch"
git worktree add --detach $S/wtb HEAD && ln -s "$PWD/node_modules" $S/wtb/node_modules && git -C $S/wtb apply "$PWD/$P/P-B.patch"
for l in pe:wt pb:wtb; do node $E/harness/build.mjs $S/${l#*:} --label ${l%%:*} --app $P/P-B/scenes/App.vue --out $S/out; node $P/R-E/build-glance.mjs $S/${l#*:} --label ${l%%:*} --out $S/out; done
zsh $P/P-E/battery.sh $S chromium; zsh $P/P-E/battery.sh $S webkit
for l in pe pb; do node $P/R-E/glance.mjs --build $S/out/glance/$l --label $l --shots $P/P-E/glance; done
git worktree remove --force $S/wt; git worktree remove --force $S/wtb
```
