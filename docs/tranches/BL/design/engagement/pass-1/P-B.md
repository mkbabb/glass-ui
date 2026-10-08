# D5 · pass 1 · P-B: family B's prototype (one engage primitive)

| field | value |
|---|---|
| seat | P-B, the prototype seat for D5-B (`SPECS.md` §4, §6 "P-B") |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree at `525dfd07`. `P-B.patch` re-checked at `5631b287`: `git apply --check` clean; `git diff --stat v10.1.0 HEAD -- src` prints nothing at both, so `src/` is the 10.1.0 bytes |
| prototype | `P-B.patch`: 18 files, +579/−119 (src 15 files +567/−112; tests 3 files +12/−5). Built from `R-B.patch` in a scratch worktree, removed after. **It runs** |
| harness | `../harness/` unchanged. P-B's scene-app fork (`P-B/scenes/App.vue`, built with `build.mjs --app`): one line, the Button's programmatic commit is `element.click()`. Probes: `P-B/pb-probe.mjs` (census, commit edges, crest, keyboard modality, captures), `P-B/sheet-film.mjs` (the Sheet's grip per frame). `syn/afterdrag.mjs` reused unchanged. The sequence: `P-B/battery.sh` |
| a local fix, not D5's | `P-B/sheet-position-local.patch` (1 rule): the detented Sheet paints in flow at HEAD (`RH.md` §3 item 1), so its E-4 cell is unreadable. The fix is applied only for the two builds that read the Sheet's E-4 (`pbs`, `heads`) and is **not** in `P-B.patch`. The Sheet's owner owns it |
| engines | Chromium 149.0.7827.55, Playwright WebKit 26.5, headless. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | final battery 18:15-18:35: 1-minute load 20.5-51.7, most cells 21-36 (`P-B/logs/battery-chromium.log`, `battery-webkit.log`; every cell line carries its own load, each JSON in `P-B/json/` its start and end). No verdict below rests on a reading taken only under load |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). O-87 binds the paint: the prototype adds no glow, gleam, shadow layer or idle loop |

## 0 · In brief

1. **The spec runs on the trio, the passive atom and the Button.** E-2 on Switch, accordion trigger and Button: **36/36 per engine** (Tab entry, keyboard, programmatic, pointer, coarse tap, mount; light and dark). HEAD's Button at the same load: 4/12 per engine, every commit cell FAIL (`battery-*.log:60-69`). E-5, E-7, E-8 and E-9 are green on every adopted scene in both engines. The accordion's WebKit pointer and tap cells now read (S-10's re-point; R-B could not read them).
2. **The commit is the phase form at crest 1.02.** The `panel` row's step response read as a phase c, mapped `1 + (crest − 1)·sin(π·c)`, played as WAAPI keyframes. Measured: peak ×1.0199-1.0200 at 89-101 ms, trough ×0.9974 at 280-293 ms, rest ×1.0000, both engines (`pb-probe` crest rows). That is 0.88 px on the 44 px switch, 1.49 px on the 75 px Button and 6.4 px on the 320 px row, against R-B's 3.5 px and 26 px. The crest is one token, `--scale-commit-pop: 1.02`, the same name and value P-A ships (DV-1's sampling margin).
3. **The stateless edge works.** The Button's commit is its activation: the door returns `commit()`, the Button's click handler calls it after its own disabled guard. One edge per activation on every path, both engines.
4. **The keyboard engaged signal closes S-8 on B's side.** The door writes `data-held="key"` when focus did not arrive from a pointer, and `""` while the hand is down. After a pointer drag (reka focuses the thumb by script, `:focus-visible` true) `data-held` is absent at 50, 600 and 1500 ms; a key press after the drag engages. Both engines, 9/9 cells (`pb-probe` modality). With a probe-only look rule the signal reads ×1.06 exactly where E-3's keyboard arm wants it and nowhere else.
5. **The release rule now serves four surfaces, and cures a second shipped defect.** Slider and sortable list as in R-B. **The Sheet**, with the local position fix: HEAD lands a still release on the same far detent as a fling (both settle 255 px, both engines: the last-move delta projects a stale velocity, R-B F-5, now measured); with the rule the still release settles 5 px and the fling 255 px (E-4 PASS both engines).
6. **Two deviations from the spec, each measured** (§2.1): the Switch presses in light only (a `.tap-squish` release ate the crest on a coarse tap, peak 1.000); and under reduce the commit writes nothing and schedules nothing (the shipped EasingPicker contract forbids any frame request under reduce, and nothing reads the edge).
7. **What B does not carry, unchanged**: E-1 in the harness's static shape (B's census is a mount registry), E-3's look (paint, Q-3: A's recipe or E's stage), E-6 (Q-2 RETIRE).

## 1 · Gates run

| gate | result | evidence |
|---|---|---|
| `npm run build` | PASS, exit 0. No roster binding needed: B adds no utility | `P-B/logs/build.log`, `final-checks.log` (18:13:32-18:13:45, load 31.7-33.5) |
| `npm run typecheck` (both projects) | PASS, exit 0 | `typecheck.log`, `final-checks.log` (18:14:10) |
| `vitest run` (full suite, after `demo:dist:build` for boot-graph) | **239/239 files, 2319 passed, 10 expected fail, 1 skipped, exit 0** | `P-B/logs/vitest.log`, `final-checks.log` (18:14:37, load 35.7) |
| earlier runs, kept as evidence | first full run: 5 files failed. `glass-subtlety` (a source gate reading `data-held` off the Slider template; now reads the door's `heldOn` too, plant-checked: re-pointing `heldOn` fails it), `easing.contract` 6 (the door's arming frame leaked a timer past unmount and requested a frame under reduce; both fixed in the door, §2.1 DV-2), `boot-graph` 3 (no `dist-demo` in a fresh worktree), two browser suites with a 10 s hook timeout at load 102 (pass on re-run). A second run had one `menu/contract` failure that passed 2/2 alone: NOT-REPRODUCED (`vitest-rerun.log`) | `logs/vitest-rerun.log` |
| tests migrated | `binary-triad` (the Switch no longer composes `.tap-squish`), `glass-subtlety` (the hold may be handed to the door), `focus-veil` (R-B's line: presence, not `"true"`) | in the patch |

## 2 · What was built, against `SPECS.md` §4.1

| piece | built | where |
|---|---|---|
| the door | R-B's door, extended: press options through the door, `commit: "state" \| "call" \| getter`, the returned `commit()`, the keyboard modality on the hand, one crest per element (a commit during a crest restarts it, never sums), the arming frame cancelled at unmount | `composables/motion/engage/useEngage.ts` (304 lines) |
| the hand | `useDockHold`, still imported from `components/dock/` (the move to `engage/` is not built; §6 gap 2) | as R-B |
| the press | `press: true \| { var, depth, squish, disabled }` passed to `useLiquidPress`; the door writes every key of `pressStyle` on the host and removes the ones that leave, drops `scale` under reduce, binds `pointerenter` too. The Button's eight template bindings and its `:style` go | `useEngage.ts`, `Button.vue` |
| the commit edge | `"state"`: the `data-state` observer (R-B). `"call"`: the adopter calls `commit()`; armed at once (a command has no model to land at mount) | `useEngage.ts` |
| the crest | phase form, `stepFrames("panel", ms)` (48 samples on the row's own `--spring-panel-settle` clock) mapped `1 + (crest − 1)·sin(π·c)`, `transform` with `composite: "add"`. Crest read from `--scale-commit-pop` on the host. An unreadable token or clock logs one `console.error` and paints nothing (loud, not fatal: it runs inside an activation handler) | `useEngage.ts`, `engage/release.ts` `stepFrames`, `tokens/scale-paper.css` |
| the stateless edge | Button: `commit: "call"`; `activate(event)` guards, then `engage.commit()` | `Button.vue` |
| the keyboard signal | on the hand part: `pointerdown` marks the focus as pointed; `focusin` with no pointer marks it keyed; any non-Tab key keys it; `focusout` leaving the host clears both. `data-held` is `"key"` while keyed, `""` while the hand is down; `data-engaged` (veil, loupe) stays the hand's alone | `useEngage.ts` |
| the release rule | R-B's sampler (windowed on `ACKNOWLEDGE_WINDOW_MS`, the release a sample) on slider and sortable; **the Sheet**: the sampler replaces its last-move delta, and the settle's row is seeded with the release velocity (`seatSpring(leg, t, v)`) | `sheet/detents/use.ts` |
| the veil split | R-B's (`ModalOverlay.vue`, `focus-veil.css`) | unchanged |
| S-10 | the disclosure trigger's hover under `(hover: hover)` on `--fill-hover`, off `--control-surface-bg-hover` (the PF-1 token); the press light leg on `[data-press]` at `--fill-selected`. Identical to P-A's hover rule | `_shared/disclosure/disclosure.css` |
| passive | Separator `exempt` (R-B) | unchanged |
| not built | the hand's move to `engage/`; `useLiquidPress` callers other than Button (DockControl, DarkModeToggle, Timeline) through the door; Checkbox, Radio, Chip, ToggleGroupItem, Tabs; the tabs drag on the rule (keyframes.js `Draggable`, stated as a fifth owner, `R-B.md` F-6); a coarse capture set | §6 |

### 2.1 Deviations from the spec, each with its reading

| id | spec | built | why (measured) |
|---|---|---|---|
| DV-1 | the Switch's press stays `.tap-squish` (`R-B.md` §2) | the Switch presses in light only: the bit's face fill on `:active` (`control-bit.css`, unchanged rule) | with `.tap-squish` and the 1.02 crest, Chromium's coarse tap read **peak 1.000, trough 0.968-0.969, FAIL** light and dark (`logs/battery-superseded-chromium.log`, the first battery, load 35). The squish's release spring and the crest multiply and the pop vanishes. R-B's 8 % crest had the headroom; a deft crest does not. This is P-A's DV-2 measured on B's mechanism. After: 8/8 Switch tap cells PASS (peak 1.020 trough 0.997), E-5 `press_switch` 4/4 per engine |
| DV-2 | under reduce "the edge stays for the light leg" (`useEngage.ts:91-96` in R-B) | under reduce `fireCommit` returns: no edge, no frame | the edge's removal needed a `requestAnimationFrame`, and `easing.contract`'s "stays idle under initial PRM" asserts no frame is requested at all (the EasingPicker composes Button). No CSS reads `data-commit` (grep over `src/**/*.css`: 0). Under reduce the state's own paint is the light answer; E-9 commit-spatial 24/24 per engine |

## 3 · Every E-witness, both engines (final battery)

Per-scene tallies are pass/fail. "HEAD" is `../BASELINE.md` unless a same-load control is cited.

| witness | Chromium | Playwright WebKit | B's row | carried by |
|---|---|---|---|---|
| E-1 | FAIL 0/3 | FAIL 0/3 | **RED by shape**: no static `ENGAGE_DECLARATION`. The mount registry reads 5 of 7 probed directories (§4) | an adapter from the registry to `{members, classes}` over 55 exemplar scenes, or A's table |
| E-2 (switch, accordion, button) | **PASS 36/36** (`battery-chromium.log`) | **PASS 36/36** (`battery-webkit.log`) | §3.1. HEAD Button, same run: 4/12 per engine (Tab entry and mount only; keyboard and programmatic peak 1.000, pointer and tap settle on the 1.015 hover lift with no bounce, `:60-69`) | — |
| E-3 | FAIL 6/12 | FAIL 6/12 | ×1.000 pointer-held, keyboard-focused, touch-held; gutter and the PRM cells PASS. B writes the signals (`data-held` `""` and `"key"`, `[data-engaged]` 2 while held); it paints no look | the look: A's in-place recipe (fine) or E's stage. B's keyboard signal is the input either needs (§3.2) |
| X-1 (afterdrag) | ×1.000 at 50, 600, 1500 ms after a drag | same | vacuous for B alone (no look). The meaningful read is §3.2: the signal clears after a drag | — |
| E-4 (slider, sortable) | **PASS 4/4**: slider fling carry 12.12 px, still 0.00; sortable fling carry 10.74 px, still 0.00; PRM at rest, no overshoot | **PASS 4/4**: slider 14.96 px; sortable 16.38 px | as R-B. Largest one-frame jump on the sortable fling 67.4 / 80.7 px: the ghost's teleport (`RH.md` §3 item 2), untouched | the teleport: X-9's owner |
| E-4 (Sheet, local position fix) | **PASS 2/2**: fling settles 255.00 px, still 5.00 px (difference 250.00); PRM at rest | **PASS 2/2**: same figures | HEAD with the same local fix, same run: **FAIL**, fling and still both settle 255.00 px, both engines. Filmed (`sheet-film`): the grip moves continuously after release (largest post-release step 23 px at a 23 ms frame); the 33-40 px one-frame moves are the harness's 40 px drag steps | the position defect: the Sheet's owner |
| E-4 (tabs drag, Carousel) | not run | not run | unchanged code: tabs drag is keyframes.js `Draggable` (a fifth owner, stated); the Carousel is the platform's | — |
| E-5 (accordion, press_switch, button) | **PASS 12/12** | **PASS 12/12** | accordion: Δscale −0.030, press-only `[background-color]`, also under PRM (HEAD: `press-only []`). Button: Δscale 0.028, `::before opacity` | — |
| E-6 | FAIL (present 0) | FAIL | absent by B's own row | owner (Q-2 (b), S6 RETIRE with the owner's words) |
| E-7 | **PASS 4/4** | **PASS 4/4** | 1 writer, `engage/useEngage.ts`; modal open 0 `[data-engaged]`; slider held 2, PRM 2 | — |
| E-8 (switch, accordion, button) | **PASS 7/7** | **PASS 7/7** | every press and commit animation reads a clock token (the crest runs on `--spring-panel-settle`) | — |
| E-9 (switch, accordion, slider, button) | **PASS 24/24** | **PASS 24/24** | **the Button's WebKit press-spatial is cured** (HEAD 0.030 under reduce, `../BASELINE.md` §2 E-9): the door drops the press's `scale` under reduce | — |

Not run: E-2 and E-5 on Checkbox, RadioGroup, SegmentedTabs, ToggleGroupItem and Chip (not adopted; their HEAD readings stand). Real Safari: UNMEASURED in every row; `RW.md` §4 (b) stands as an FL-7 cell (on iOS Safari `:active` needs a `touchstart` listener; the door binds `pointerdown`, which iOS Safari dispatches, but the Switch's light press is a `:active` rule).

### 3.1 E-2 per scene (both engines, light and dark)

| scene | keyboard | programmatic | pointer | coarse tap | Tab entry, mount |
|---|---|---|---|---|---|
| Switch | peak 1.020 trough 0.997 | 1.020 / 0.997 | 1.020 / 0.997 | 1.020 / 0.997 | quiet |
| accordion trigger | 1.017-1.020 / 0.997 | 1.020 / 0.997 | 1.018-1.019 / 0.997 | 1.020 / 0.997 | quiet |
| Button | 1.020 / 0.997 | 1.020 / 0.997 | 1.032-1.034 / 1.012, settles 1.015 | 1.034 / 1.012, settles 1.015 | quiet |

The margins are thin and stated: the bar asks pop ≥ 0.015 and bounce ≥ 0.002; the accordion's keyboard cell read 1.017 in WebKit and the trough 0.997 everywhere, so the bounce clears by 0.001. The Button's pointer and tap commits ride on top of the capsule's hover lift (1.015) and settle there: B does not retire `.glass-capsule-hover`'s lift (P-A's DV-5 reasons apply: retiring it reaches D1's dock).

### 3.2 The keyboard engaged signal (`pb-probe` modality, both engines identical)

| step | `data-held` | thumb `:focus-visible` | probe look (`scale`) | `[data-engaged]` |
|---|---|---|---|---|
| Tab into the slider | `"key"` | true | 1.06 | 0 |
| ArrowRight | `"key"` | true | 1.06 | 0 |
| Tab out | absent | false | none | 0 |
| pointer down, held 300 ms | `""` | false | 1.06 | 2 |
| 50 / 600 / 1500 ms after a drag and release | absent | **true** | none | 0 |
| ArrowLeft after the drag | `"key"` | true | 1.06 | 0 |
| click elsewhere | absent | false | none | 0 |

HEAD, same probe: `data-held` absent on keyboard entry, `"true"` while held (`battery-*.log:258-265`). The look rule is injected by the probe (`.glass-slider[data-held] { scale: 1.06 }`), not source: it shows that an in-place recipe keyed on the signal would pass E-3's keyboard arm and not stick after a drag (S-8, X-1).

## 4 · Q-1 (passive), census-checkable

Default (c), declared at the door: `useEngage(() => null, { component, exempt: "<reason>" })`. `pb-probe` census, both engines:

| directory | row |
|---|---|
| switch | parts [commit] |
| accordion | parts [press, commit] |
| slider | parts [hold, drag] |
| button | parts [press, commit] |
| separator | exempt: "a rule between regions: nothing presses it and it reports no state" |
| skeleton, dialog | no row (not adopted): FAIL, as they should |

HEAD reads no row for any of the seven. The exemption list stays spread across the passive files and is visible only by running the census (`SPECS.md` §4.3).

## 5 · The mount case (H-8)

| case | reading |
|---|---|
| E-2 `mount(committed)` | **PASS** 6/6 per engine (switch, accordion, button; light, dark): scale range 0.000, body moved 0.00 px. An initial `data-state` is not a mutation; a command mounts with nothing to commit |
| model set in the mount's own task | 0 edges, switch and accordion, both engines (the door arms one frame after mount) |
| model set two frames after mount (async arrival) | 1 edge, both engines: it pops (S-9, family-independent, X-4) |
| a command activated in the mount's own task | 1 edge (`commits button`): a stateless control's activation is a commit whenever it happens; there is no model to land |

## 6 · Cost, and the gaps it leaves

`git diff --numstat` in the worktree:

| part | files | lines |
|---|---|---|
| the door + the rule (`useEngage.ts`, `release.ts`) | 2 new | 304 + 118 |
| crest token | 1 | +7 |
| members: Switch, accordion trigger, Slider, Separator, Button | 5 | +70 / −58 (the Button's 8 bindings and `:style` go) |
| substrates: disclosure (S-10 + press leg), veil split | 3 | +30 / −6 |
| surfaces on the rule: sortable (sampler moved), Sheet, `useDragVelocity` | 4 | +38 / −49 |
| tests | 3 | +12 / −5 |

Per adopter: one import, one call, one template `ref` where the host is a reka root; 6-12 lines. The door grew by 73 lines over R-B's for press options, the stateless edge, the keyboard signal and the crest bookkeeping. Extrapolated (not measured): about 25 interactive adopters at 6-12 lines and about 30 passive adopters at 4-6 lines, 300-450 lines across about 55 files, plus 55 census scenes (H-2).

## 7 · MIGRATION rows

Consumer reads: a read-only grep of the sibling source trees (value.js, fourier-analysis/web, chicago, keyframes.js, speedtest, slides, sci-report) for `data-held`, `data-commit`, `data-press` and `--glass-btn-press-t`, docs and bench corpora excluded.

| row | what changes | consumers |
|---|---|---|
| M-B1 | `data-engaged` is present-empty, not `"true"` (R-B) | none authored |
| M-B2 | the modal veil keys on `[data-state="open"]`; `ModalOverlay` drops `data-engaged` (R-B; identical to P-A's M-A6) | none |
| M-B3 | `useDragVelocity` gains `onRelease` (additive) | 0 consumer reads |
| M-B4 | `VelocitySampler` moves to `engage/release.ts` (internal) | none |
| M-B7 | **`data-held` gains a value**: `"key"` while the keyboard drives a held control, `""` while the hand is down (HEAD: `"true"`, hand only). A `[data-held]` reader now also matches keyboard engagement | **value.js** `demo/picker/controls/ComponentSliders/ComponentSliders.vue:392,394` (`.channel-slider[data-held]` sets `cursor: grabbing`; it would show on keyboard focus: narrow to `[data-held=""]` in value.js's own tranche). fourier-analysis `FourierTimeline.vue:293` names the reach in a comment only (its `DT-1` deleted it) |
| M-B8 | the Switch no longer composes `.tap-squish`; it presses in light (identical to P-A's M-A1 for the Switch) | none found asserting it |
| M-B9 | the Button binds no handlers or `:style` in its template; the door writes `scale`, `--glass-btn-press-t` and `--flex-vel` on the host natively. A commit crest (`transform`, composite add) plays on activation | a consumer overriding the Button's inline style or `transform` (none found) |
| M-B10 | new token `--scale-commit-pop: 1.02` (same name and value as P-A's) | additive |
| M-B11 | the disclosure trigger's hover moves under `(hover: hover)` onto `--fill-hover`; a pressed trigger paints `--fill-selected` (S-10; P-A's hover rule) | every accordion and collapsible consumer, paint only |
| M-B5 | not built: `useEngage` replacing `useLiquidPress` publicly | value.js ×1, speedtest ×2, keyframes.js (`R-B.md` F-7); `useLiquidPress` stays a public leaf |

`useEngage` is not exported. Exporting it is a pass-2 decision.

## 8 · Owner-glance captures (REGISTRY §2.5)

`P-B/captures/{pb,head}-{chromium,webkit}-{light,dark}-{switch,accordion,button}-{1-rest,2-pressed,3-crest,4-committed}.png` and `slider-{1-rest,2-held,3-release-carry,4-settled}.png`, at 2×, plus one contact sheet per build, engine and theme (`sheet-{pb,head}-{engine}-{theme}.png`): 130 files. The crest frame is 90 ms after a programmatic commit (c ≈ 0.5). HEAD's WebKit accordion is missing (its pointer closes the page, `ENGINE CLOSED, REPRODUCED 2/2`, `battery-webkit.log:289,291`); the prototype's is taken by pointer. Fine pointer only: the coarse set is not captured.

What the author sees, for the seats that judge (not a verdict):
- **Switch**: the press is the track's face greying (light), no squish; the crest is under a pixel and reads as the thumb landing rather than as a pop. That is the register O-87 asks for; whether it reads at all on a phone is X-3's question.
- **Accordion**: the pressed frame is a full-row `--fill-selected` stadium. It reads close to a selected state, and with the press spring's 3 % shrink on a 320 px row it is the heaviest frame of the set (P-A saw the same). A quieter press ink is the obvious refinement; no lighter fill token exists to name.
- **Button**: HEAD's press squish unchanged, then a ×1.02 crest. On a pointer the crest sits on the capsule's hover lift, so the committed frame is 1.5 % larger than rest until the pointer leaves.
- **Slider**: held shows the veil and the loupe (unchanged); the release-carry frame 40 ms after a fling shows the thumb ahead of its value, the settle returns it. No grow (B paints none).
- No lighting layer is added: the crest is geometry, the presses are existing fill tokens and the existing gleam drive.

## 9 · Open, for the critic and the agglomerator

1. **E-1's shape**: B's census needs an adapter or a registry-reading witness, and 55 exemplar scenes. Unchanged from R-B.
2. **The hand still lives in `components/dock/`** (`useDockHold`): the layering inversion `SPECS.md` §4.1 names is not cured here.
3. **The door at 304 lines** is past R-B's 231. The press options are a pass-through of four fields, not a rename to one `--press-t`; the god-module risk (`SPECS.md` §4.7 item 1) is held, not retired.
4. **The commit's margins are thin** (§3.1): bounce clears by 0.001; the accordion's keyboard peak read 1.017. A continuous read or a light-channel commit (X-3) would make the bar less brittle than a bigger crest would.
5. **No-JS floor** (`SPECS.md` §4.7 item 2): the Switch now has no geometric press without JS either way (its press is a CSS fill), and there is no commit before hydration. Stated, not cured.
6. **The capsule's hover lift** stays under the Button's commit (§3.1); retiring it needs D1.
7. **Not built**: the other `useLiquidPress` callers through the door; Checkbox, Radio, Chip, ToggleGroupItem, Tabs; the tabs drag on the rule; the coarse capture set; real Safari (UNMEASURED).
8. **For the Sheet's owner**: with its position fixed, HEAD's detent release throws a still release to the far detent (fling and still both 255 px, both engines). The rule in this patch cures that independently of the position fix.

## 10 · Reproduce

```sh
E=docs/tranches/BL/design/engagement; H=$E/harness; P=$E/pass-1; S=<scratch>
git worktree add --detach $S/wt HEAD && ln -s "$PWD/node_modules" $S/wt/node_modules
git worktree add --detach $S/wth HEAD && ln -s "$PWD/node_modules" $S/wth/node_modules
git -C $S/wt apply "$PWD/$P/P-B.patch"
(cd $S/wt && npm run build && npm run typecheck && npm run demo:dist:build && npx vitest run)
for t in wt:pb wth:head; do node $H/build.mjs $S/${t%%:*} --label ${t##*:} --out $S/out --app $P/P-B/scenes/App.vue; done
git -C $S/wt apply "$PWD/$P/P-B/sheet-position-local.patch"; git -C $S/wth apply "$PWD/$P/P-B/sheet-position-local.patch"
node $H/build.mjs $S/wt --label pbs --out $S/out --app $P/P-B/scenes/App.vue
node $H/build.mjs $S/wth --label heads --out $S/out --app $P/P-B/scenes/App.vue
zsh $P/P-B/battery.sh $S chromium > battery-chromium.log; zsh $P/P-B/battery.sh $S webkit > battery-webkit.log
git worktree remove --force $S/wt; git worktree remove --force $S/wth
```

`battery.sh` writes JSON into `P-B/json/` and captures into `P-B/captures/`; it expects the prototype worktree at `$S/wt` for E-7's static arm.
