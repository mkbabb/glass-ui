# D5 · pass 2 · P-E2: route E on F5 plus A's table

| field | value |
|---|---|
| seat | P-E2, the route-E prototype of D5 pass 2 (REGISTRY §P1-9.2 wave 2). This is the untested seam: E's engaged stage built on A's census, not on B's door |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `8af2de6f7` at close (`ba7c38cec` when the worktree was cut). `git diff --stat ba7c38cec 8af2de6f7 -- src tests` prints nothing |
| base | HEAD + `pass-2/P-A2-light.patch`, which carries F5 whole and A's table with its adoption stamps (the light commit, Q-5 (a), the default arm). F5 alone carries the table but not the stamps: its census latch stays RED until A adopts (`F5.md` item 6), so "E-1 green on A's table" needs A2's stamps under it |
| patches | `pass-2/P-E2-veil.patch` and `pass-2/P-E2-noveil.patch`, each the whole tree against HEAD (F5 + A2-light + E2). Both pass `git apply --check` at `8af2de6f7`. They differ in one line, `KEYBOARD_VEIL` in `src/composables/motion/engage/stage.ts` (Q-3's keyboard arm) |
| worktrees | `.claude/worktrees/bl/D5/p2/E2/wt` (veil) and `wtn` (noveil), `node_modules` symlinked. Both removed with `git worktree remove --force` before return |
| engines | Chromium and Playwright WebKit, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| load | 1-minute load 9-57 over the session (one spike to 138 at 02:04, during which the guard held every run). Every cell line in `E2/logs/` carries its own load |
| fences | no tracked-source edit in the checkout; no git write in it; writes only under `docs/tranches/BL/design/engagement/`. Every browser and test run through `~/.claude/guard/guarded`; WebKit runs with `--exclusive webkit`; batteries, probes and captures as heavy runs (no `--light`, per the 2026-10-15 machine notice in `FORMATION-PROGRESS.md`) |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c) with both keyboard arms built, Q-4 (b), Q-5 (a). O-87 binds the paint |
| earlier attempt | a first P-E2 session on 2026-10-15 lost its worktree on a session restart before it cut a patch. Its logs, JSON and shots are kept as `E2/run1-lost/` and superseded. Its probe (`E2/probe/probe.mjs`, `probe/App.vue`) is reused unchanged |

## 0 · In brief

1. **E pairs with A's census.** On A's own scene app the census reads 89/94 per engine. That is exactly P-A2's r3 reading (`P-A2.md` §6), so the stage does not disturb the table. The latch is 54/55 (only `dock`, D2's). The four other fails are inherited: the census counts reka's Label handler (an H2 false positive), the Sheet loses its target under reduce, and the Aurora is unreadable headless. The stage adds one member to the latch's proof, the NumberField, by rendering its scrub through `engage-held`.
2. **The hand-off hands over.** Tab A → B: A's largest one-frame drop is 0.0081 (Chromium) and 0.0088 (WebKit), against its own release's 0.0081 and 0.0107. The veil stays at 1.00 through the hand-off in both engines. A stays in the top layer until its exit has run (177 ms in Chromium), then leaves; the pool glides to B on the `dock` row (E-10 4/4 per engine; `logs/handoff-film-veil-chromium.log`).
3. **The keyboard contract holds, including the two pass-1 counterexamples.** A printable key whose handler focuses the slider by script engages nothing, and a script `focus()` engages nothing. Inside a Dialog, one Escape releases the slider and the Dialog stays open; the second Escape closes it. Both engines, both arms (E-3 22/22 per engine and arm; probe `keyfocus` and `dialog escape`).
4. **Fail loud.** All three of C-E's plants raise a `console.error` in both engines and both arms (E-11 3/3). The registered reach's initial value is 0, so it cannot pass for an answer.
5. **Two clients, so the stage is not consumer-less.** The NumberField scrub is the second client. The stage exports only what its one caller, the door, imports.
6. **Q-3's keyboard arm, both built.** `veil`: a Tab promotes, grows and frosts the world. `noveil`: a Tab promotes and grows, and the world stays crisp. The hand raises the veil in both. Frames: `E2/glance/{veil,noveil}-*` and `E2/shots/{veil,noveil}-*`.

## 1 · Patches and what was built

| patch | files vs HEAD | +/− vs HEAD | `git apply --check` at `8af2de6f7` |
|---|---|---|---|
| `pass-2/P-E2-veil.patch` | 167 | +2691 / −1401 | OK |
| `pass-2/P-E2-noveil.patch` | 167 | +2691 / −1401 | OK |

E2's own delta over HEAD + P-A2-light is in `E2/numstat-delta-over-A2.txt`: **20 files, +967/−273 (src 16 files +668/−230; tests 4 files +299/−43)**. The test line counts there predate one 2-line edit to `engage-stage.test.ts` (the arm-aware veil assertion).

| piece | what | where |
|---|---|---|
| the stage | E's promote-in-place (`popover="manual"`, footprint, anchor pin, one veil, singleton), rebuilt on the F5 door and A's held recipe. The grow is A's `engage-held` recipe on the registered `--rung-grow`, not a second scale rule: the stage computes only the inline reach | `engage/stage.ts` (304 lines), `styles/glass/engage-stage.css` (73) |
| hand-off with inertia (CK-20) | a second engagement *leaves* the first rather than hiding it. The outgoing control springs home on its own exit clock while still promoted, and is hidden when its finite animations finish. The veil drops only at the end of the task, if nothing has taken the engagement (`queueMicrotask`), so a Tab's focusout→focusin never writes its attribute. Its centre is registered and transitions on the `dock` row while engaged | `stage.ts` `leave`, `releaseStage`; `focus-veil.css` "THE HAND-OFF" |
| the footprint under a re-render (CK-20) | one `MutationObserver` on `body`, alive only while something is on the stage. Each mutation re-seats any footprint a node was inserted after, then glides the control from its old page-frame place on the `dock` row (`translate`, composite add). The landing on release glides the same way if the in-flow place differs from the footprint | `stage.ts` `onMutation`, `hide`, `glide` |
| fail loud (CK-21) | `settle.ts` holds the one voice (`loud`) and the row clock; the stage reads back `--scale-engage` and `--stage-reach` on every engagement. `--stage-reach`'s registered initial value is 0 | `engage/settle.ts` (58), `stage.ts` `readBack`, `engage-stage.css` |
| the keyboard (CK-04, CK-22) | `focusin` engages only while Tab is down, so a printable key's script focus and a bare script focus do not. An Escape that disengages calls `preventDefault`, and reka's `DismissableLayer` honours it, so one Escape is one act | `useEngage.ts` hand section |
| Q-3's split | `KEYBOARD_VEIL`: the door asks the stage for the veil on `isHeld ∨ (KEYBOARD_VEIL ∧ keyed)`. The veil popover is open beneath every promoted control (opacity 0 when not wanted), so top-layer order never needs a re-show | `stage.ts`, `useEngage.ts` |
| the second client (CK-27) | the NumberField scrub: a press that travels past the hand's slop takes the value, one step per slop (`HOLD_SLOP_PX` = 8, moved out of the sortable list's `ACTIVATION_SLOP_PX` so the two share one figure). The field is promoted while the hand is down, and the release fling stretches it with its trailing edge held. A press that does not travel stays reka's click | `number-field/NumberFieldInput.vue`, `number-field/styles.css`, `hold.ts`, `sortable-list/{drag,motion}.ts` |
| the release | a host on the stage takes the fling (`flingStage`, the pass-1 stretch on `settleFrames`); anything else keeps F5's fill carry | `useEngage.ts` drag part |
| `--scale-engage` on the ladder (CK-12) | the engaged row gains `scale: 1.06`, with BI.W-ENGAGE-AFFORD's T1 GROW as its reason. `--scale-engage` in `scale-paper.css` is its mirror, and a unit test holds the two equal | `engageLadder.ts`, `tokens/scale-paper.css` |
| the Slider | teleported veil and loupe, veil-centre code, scroll re-take, inline z-raise and `data-focus-veil` all deleted. The loupe is the host's child (`[data-engaged] > .glass-loupe`, with a starting style) | `slider/Slider.vue` (+28/−114), `slider/styles.css` |
| tests | `engage-stage.test.ts` (11 cases, each with the input that must not do the thing); `focus-veil.test.ts` re-pointed to the stage; popover stubs in `tests/setup.ts`; `engage-stage.css` added to the orphan-CSS gate's named layer exceptions, on the slider lane's grounds | tests |

Unit plants (`E2/logs/unit-plants.log`) each fail the case written for them:
- snap the hand-off (hide at once): the hand-off case fails;
- drop the veil at once: the hand-off case fails;
- accept any key down on focus: the printable-key case fails;
- drop the Escape's `preventDefault`: the Escape case fails;
- skip the re-seat: the re-seat case fails.

The fail-loud cases plant the reach at its initial value 0 and an empty `--scale-engage`; the clean case with readable values stays silent.

## 2 · Gates

| gate | result | log |
|---|---|---|
| `npm run build` | exit 0 | `logs/gates-veil-final.log` |
| `npm run demo:dist:build` | exit 0 | same |
| `npm run typecheck` (both projects) | exit 0 | same |
| `vitest run --maxWorkers=2` | **241/241 files**: 2338 passed, 10 expected fail, 1 skipped. Load 20.8 to 23.4 | same |
| noveil tree | build exit 0, typecheck exit 0, motion and veil tests 87/87 after the arm-aware edit | `logs/gates-noveil.log` |

One gate failure along the way was cured: `gate:G-OVERFIT` EXPORT-REACH flagged `engageStage` and `releaseStage` as exports with no reader (`logs/gates-veil.log`). Both are now module-private (CK-27).

## 3 · Readings per CK row (Chromium · WebKit, with load)

Battery: H2's `run.mjs`, unmodified, on the harness's own scene app (`out/builds/{veil,noveil}`). The census is read again on P-A2's scene app (`A2/scenes/App.vue`, the gallery widened and the stateless programmatic commit routed through the component), which is A's reading of record. Logs: `logs/battery-{veil,noveil}-{chromium,webkit}.log` and `logs/battery-veil-a2app-{chromium,webkit}.log` (two Chromium reads: `-c1` and the chain's). JSON: `E2/json/`. Probe: `logs/probe-*.log`.

| CK | applicable to E2 | veil · Chromium | veil · WebKit | noveil | reading |
|---|---|---|---|---|---|
| CK-01 E-1 | **must prove** | harness app 52/56 · A2 app **89/94** twice (load 18-26) | harness app 52/56 · A2 app **89/94** (load 24-27) | not re-read (the arm changes no stamp) | A2 app: latch 54/55 (`dock` unproven, D2's); fails `static-inert label` (reka's handler, an H2 rule fault), `presented (sheet) PRM press-light` (no target under reduce), `ambient (aurora)` ×2 (headless). Identical to `P-A2.md` r3, so the stage did not disturb the census. On the harness's own app the latch reads 25/55, because that app renders 30 fewer members |
| CK-02 E-2 | A's (scored on the composition) | harness app 81/108 · A2 app 92/108 and 91/108 | harness app 81/108 · A2 app 91/108 | — | A2-light's commit arm, unchanged by E (P-A2's 92/108 · 91/108). Fails are Q-5 (a)'s near-white faces (switch, radio, accordion light; radio dark). On the harness app the stateless programmatic cells also fail, because `clicks++` never reaches the component (P-A2's fork note) |
| CK-03 | A's | — | — | — | not E's. The tabs mount glide is cured by A2 |
| CK-04 E-3 | **must prove** | **22/22** (load 11) | **22/22** (load 23) | **22/22 · 22/22** (Chromium twice at load 19-37; WebKit at 35-36) | desk pointer-held and keyboard ×1.060 in both themes. Keyboard register: `[data-held]` 0, no `grabbing`, no squish. Afterdrag ×1.000. Modifier, unacted `k` and script `focus()` all ×1.000 with veil 0. Phone 358.0 × 24.0 → 358.0 × 25.4 (block ×1.060) inside the 16..374 gutter. PRM ×1.000 with the light leg. Probe, both engines: `keyfocus` ("k" focusing by script: engaged false, promoted false, ×1.000) and `keyfocus then acting key` PASS. This includes CK-04's four plants and C-E r33's two counterexamples |
| CK-05 E-4 | **must prove** (slider's value point) | slider carry **6.36 px**, continuity 3.9 px (bound 67.0), PRM 0.00 (load 10) | slider carry **7.34 px**, continuity 4.1 px (bound 67.6), PRM 0.00 (load 18) | — | value point (`.slider-range`'s leading edge, page frame), body opacity 1.000. Other surfaces are F5's: `sortable release continuity` 75.3 · 79.9 px against 62.0, and `tabsdrag release PRM` NOT DRIVEN. The Sheet is UNMEASURED (in flow, §P1-7); the Carousel is UNMEASURED in WebKit. The NumberField (probe, fling minus still on its leading edge) carries 5.12, 4.94, 4.48 px (Chromium veil, load 29.3, 18.7, 38.2), 2.65 and 4.52 px (Chromium noveil, load 30.8, 22.2), 6.44 px (WebKit veil, 19.0) and 6.20 px (WebKit noveil, 29.2), against a bound of 4. The one 2.65 px read is NOT-REPRODUCED in 6 other reads |
| CK-06 E-5 | shared | 56/56 | 56/56 | — | |
| CK-07 E-6 | owner's | RED by construction (Q-2) | same | — | |
| CK-08 E-7 | **E's writer** | `data-engaged`: **1 writer, `engage/stage.ts`** | same | same | the remaining fails are `data-held` in `GlassDock.vue` (D2) and `data-press` in `PagerDots.vue` (A2's open gap 7), as on P-A2 |
| CK-09 E-8 | shared | 19/19 | 19/19 | — | the stage reads the `dock` row and its settle; the veil reads the shipped durations; no rung literal |
| CK-10 E-9 | shared | 60/60 | 60/60 | — | |
| CK-11 | A's | — | — | — | A2's retirement stands. E adds no press recipe |
| CK-12 | **E's figure** | — | — | — | `--scale-engage` is now a row on the ladder (`engageRung("engaged").scale = 1.06`), mirrored by the token and held equal by a test. The reach is derived from the gutter rung, and the fling cap from the reach. No new figure was minted. `HOLD_SLOP_PX` (8) is the sortable list's existing figure, moved to one place |
| CK-13 FL-3 | stage, veil | static read only: the veil keeps `display: none` under `prefers-reduced-transparency` and `forced-colors` (`focus-veil.css`, unchanged arm); the promoted control keeps its own forced-colors arms | — | — | **UNMEASURED in a browser by this seat** |
| CK-14 FL-4 | yes | the stage grows, never shrinks: the 44 px floor holds. Coarse capture: the slider rests at ×1.000 after release; no hover latch on the stage | — | — | E-3 phone cells above |
| CK-15 FL-5 | yes | the singleton by construction (`current`); in the hand-off film there is one engaged control in every frame, and the outgoing one is CK-20's | — | — | |
| CK-16 FL-6 | yes | nothing runs at rest: the observer and the scroll listener exist only while something is on the stage | — | — | static read |
| CK-17 FL-7 | yes | — | — | — | real Safari UNMEASURED (owner's safaridriver checkbox) for every claim here |
| CK-18 FL-8 | shared | the stage's fling consumes the one release rule (`useDragVelocity` on `RELEASE_RULE`, `settleFrames` on `dock`); no fifth velocity owner | — | — | |
| CK-19 | A's | E-1 runtime classes pass except A2's known fails | same | — | |
| CK-20 E-10 | **must prove** | **4/4** (load 12) | **4/4** (load 24-25) | **3/3 · 3/3** (hand-off veil REPORTs: no keyboard veil, by design) | see §3.1 |
| CK-21 E-11 | **must prove** | **3 pass**, 1 UNMEASURED (load 12-14) | **3 pass**, 1 UNMEASURED (load 24-27) | 3 pass, 1 UNMEASURED · same | see §3.2 |
| CK-22 MIGRATION | yes | §4 | | | |
| CK-23 cost | yes | §1 and §5 | | | |
| CK-24 | A's | Q-1 (c) as A2 stamps it | | | |
| CK-25 | yes | §6 | | | |
| CK-26 O-87 | **must hold** | the veil reads `var(--glass-focus-veil-blur)` → `--glass-blur-floating-radius` and `var(--glass-saturate)` (`focus-veil.css`), not `blur(20px) saturate(1.5)` restated. The stage adds no lighting layer: geometry and the one veil, both carrying state | | | the token's value is still 20 px until O-87's 10.2.0 token wave lands; the veil follows it with no edit |
| CK-27 | **must prove** (two clients) | the stage has two clients (Slider, NumberField). It exports `useEngageStage`, `flingStage` and `KEYBOARD_VEIL`, each read by the door; nothing goes through `/motion`. G-OVERFIT EXPORT-REACH green | | | the gates the stage adds can fail: §1's unit plants and the E-10/E-11 plants in H2's self-test |

### 3.1 · CK-20 in detail (E-10 cells and the probe)

| cell | veil · Chromium (load 12) | veil · WebKit (load 24-25) | noveil · Chromium (load 37-47) | bound |
|---|---|---|---|---|
| own release (Tab out) | ×1.060 → ×1.000, step 0.0081 | step 0.0107 | step 0.0076 | reference |
| Escape release | 0.0077 | 0.0098 | 0.0077 | ≤ own + 0.002 |
| hand-off drop (Tab A → B) | **0.0081** | **0.0088** | **0.0072** | ≤ A's own + 0.002 |
| hand-off veil | **1.00 → min 1.00 → 1.00** | **1.00 / 1.00 / 1.00** | REPORT: no keyboard veil | ≥ 0.1 × before |
| re-render landing (harness: a block inserted before the wrapper) | 1.2 px (1.2 without) | 1.8 px (1.7 without) | 1.2 px (1.9 without) | ≤ without + 1 px |

The pass-1 counterexample (C-E r32: a 0.060 one-frame drop, the veil at 0.00) is gone in both engines.

The probe's `between landing` cell inserts a keyed node *between* the footprint and the held slider, which is pass 1's `rerender-probe.md` case. The footprint is re-seated in every read. The release's largest one-frame move is 1.4 to 2.2 px against 1.4 to 2.3 px without the insert, in every read. During the hold, the control glides to its new slot with a largest one-frame move of 3.8 to 5.4 px, instead of the 40 px jump. Reads: Chromium at load 18-42 (5 reads across both arms), WebKit at 20 and 28.

The hand-off film (`logs/handoff-film-veil-chromium.log`, load 10.8): A stays `:popover-open` through its exit and is hidden at 177 ms, when its `--rung-grow` transition ends. B grows in parallel, and the veil reads 1.00 in every frame. After it lands, A is part of the world under the veil. That is why `shots/veil-*-keyboard-handoff-90ms.png`, taken after screenshot latency, shows A frosted.

### 3.2 · CK-21 in detail (E-11)

| plant (C-E's three, on the slider root) | clean | planted | console.error | verdict, both engines and both arms |
|---|---|---|---|---|
| `--space-section: nonsense` (kbd) | ×1.060 | **×0 inline** (the reach is the registered 0) | `engage stage: --stage-reach (from --space-section, …)` | **fails loud** |
| `--scale-engage: nonsense` (kbd) | ×1.060 | ×1.000 | `engage stage: --scale-engage` | **fails loud** |
| `--spring-dock-settle: nonsense` (fling) | 283.9-284.5 px | 280.0-281.0 px | `engage: --spring-dock-settle` | **fails loud** |
| C-B's `--scale-commit-pop: 1` on the switch | — | — | — | UNMEASURED: A2-light's commit is the light arm, which does not read this token (A's row) |

The first plant fails loud in paint as well as in the console: an unreadable gutter collapses the promoted control's inline scale to 0 while it is engaged. That is not a masking fallback (E-2), but it is the harshest paint a broken stylesheet can produce. Whether the paint should clamp at ×1 while the error speaks is an open gap (§7), not settled by this seat.

### 3.3 · The probe (CK-04, CK-05, CK-22, CK-27)

`E2/probe/probe.mjs` on the probe app (`E2/probe/App.vue`). It is not a grading scene; it covers the paths H2 has no scene for.

| cell | veil · Chromium | veil · WebKit | noveil · Chromium | noveil · WebKit |
|---|---|---|---|---|
| totals | **9/9** three times (load 29-31, 18-22, 38-41) | **9/9** (load 18-21) | 8/9 (load 30.6-31.3; the fail is the carry read above, NOT-REPRODUCED), then **9/9** (load 21-22) | **9/9** (load 26-29) |
| numfield click (4 px: no promotion, field focused, value kept) | PASS | PASS | PASS | PASS |
| numfield scrub (60 px: promoted, engaged, ×1.060, veil 1.00, 50 → 57 = trunc(60/8)) | PASS | PASS | PASS | PASS |
| numfield value kept (fling and still keep the chosen value; off the stage; no footprint) | PASS | PASS | PASS | PASS |
| numfield PRM (×1.000, veil 1.00, promoted) | PASS | PASS | PASS | PASS |
| dialog escape (first Escape: disengaged, Dialog open; second: closed) | PASS | PASS | PASS (veil 0.00, by design) | PASS |
| keyfocus / then an acting key | PASS / PASS | PASS / PASS | PASS / PASS | PASS / PASS |

## 4 · MIGRATION (CK-22)

Consumer sites, by grep over each sibling's own tree (read-only; `node_modules`, `dist`, `docs`, `.claude`, `.worktrees`, `.git` and `bench` excluded). The A2 rows (`P-A2.md` §4) stand beneath these.

| sibling | `<Slider>` | `<NumberField>` | names an engagement attribute, the veil or the loupe |
|---|---|---|---|
| value.js | 6 sites in 5 files | 1 | 0 files |
| fourier-analysis | 5 in 2 | 1 | 0 |
| keyframes.js | 5 in 3 | 1 | 0 |
| speedtest | 2 in 1 | 6 | 0 |
| atlas | 2 in 1 | 0 | 0 |
| sci-report | 5 in 4 | 0 | 0 |
| chicago, slides | 0 | 0 | 0 |

Rows (every consumer-visible path):
1. **An engaged Slider or a scrubbing NumberField is in the top layer.** This covers the hand, Tab, and an acting key. While engaged it carries `popover="manual"` and `data-engage-stage`. It escapes ancestor clipping, stacking and `overflow`, and has an `.engage-footprint` previous sibling, so a consumer's `:first-child`, `+` or `~` around it can change for the duration. Its inline size is pinned to the footprint (`anchor-size`).
2. **Keyboard engagement** (Tab into a slider, or an arrow, Page or Home/End key on it): promoted and grown ×1.06. **`veil` arm:** the world frosts. **`noveil` arm:** it does not. A script `focus()` and a printable key's script focus engage nothing.
3. **Escape inside a Dialog.** One Escape on an engaged slider releases it and is spent there (`preventDefault`): the Dialog closes on the next Escape. A consumer that listens for Escape on `window` sees `defaultPrevented` on that first one.
4. **`data-engaged` is written by the stage alone**, on the control and on the stage's one veil (a `<body>` child popover). The door's `engagedOn` option is deleted, with no alias.
5. **The Slider writes no `data-focus-veil`, no inline `z-index`, and no `--loupe-left`/`--loupe-top`.** Its veil and loupe are no longer teleported; the loupe is the host's child.
6. **NumberField: a press that travels 8 px or more scrubs the value.** It goes one step per 8 px, and the field is promoted while the hand is down. Dragging inside the field no longer selects text. Speedtest's 6 NumberField sites and the three others are the readers; a consumer that wants drag-select back has no switch (a clean break, stated).
7. **`ACTIVATION_SLOP_PX` is now `HOLD_SLOP_PX`** in `composables/motion/engage/hold.ts`. It was internal to the sortable list, so no consumer reads it.
8. **`--scale-engage` is the ladder's engaged row's mirror.** A consumer override of the token now diverges from `engageRung("engaged").scale`. Overrides should be set on the ladder and token together.
9. **`gate:orphan-CSS-partial`'s named exceptions gain `src/styles/glass/engage-stage.css`.**

## 5 · Cost (CK-23), against §P1-3

| | files | +/− |
|---|---|---|
| E2 over HEAD + P-A2-light (`E2/numstat-delta-over-A2.txt`) | 20 | +967/−273 |
| ↳ src | 16 | +668/−230 |
| ↳ tests | 4 | +299/−43 |
| the whole route (F5 + A2-light + E2) against HEAD | 167 | +2691/−1401 |

**Fixed cost:**
- the stage, 304 lines;
- the stage CSS, 73;
- the settle voice, 58;
- the door's net change, +97/−75: the scrub, the stage call and the key rule, against the moved clock code and the deleted `engagedOn`.

**Per client:**
- the Slider netted −86 (+28/−114), its teleports deleted;
- the NumberField +28: an 11-line `useEngage` call and an 11-line cursor rule.

Pass 1's E delta was src +410/−145 over P-B for one client. This one is +668/−230 for two clients on A's table, and it includes the re-seat, the landing glide, the hand-off and the fail-loud read-back that pass 1 lacked.

## 6 · The owner-glance set (CK-25)

`capture.mjs` (H2's) into `E2/glance/`:
- **veil:** every class exemplar × rest/pressed/held/engaged/committed/released × light/dark × fine/coarse, both engines. Sheets: `veil-{chromium,webkit}-{fine,coarse}.png`, 18 rows each, with no row unread (WebKit: 0 `ENGINE CLOSED`, since F5 cures PF-1).
- **noveil:** the held class only (the slider, the one exemplar the split changes), the same states, themes and pointers. Sheets: `noveil-chromium-{fine,coarse}.png`. The WebKit noveil capture never ran: it was stopped after 75 minutes queued for the machine-wide WebKit lock (`logs/capture-noveil-webkit.log`). The WebKit noveil frames on record are the probe's shots (`shots/noveil-webkit-*`: keyboard engaged, the hand-off, pointer held, the Dialog's slider, the NumberField scrub).
- Frames are in `glance/frames/`. Each frame's measured scale is in `{veil,noveil}-index.json`.

From the logs (Chromium at load 20-40, WebKit at 14-23):
- The slider's fine row reads rest ×1.000, pressed ×1.038-1.042, held ×1.060, engaged ×1.060, committed ×1.007-1.010, released ×1.000 in both arms.
- The coarse slider row reads pressed ×1.029-1.034, held and engaged ×1.060, released ×1.000.
- WebKit veil: fine pressed ×1.047-1.048 and coarse pressed ×1.046-1.047; held, engaged ×1.060; committed ×1.007-1.010; released ×1.000. Playwright WebKit paints no `backdrop-filter` (pass-1 `P-E.md` §8), so its veil frames show the dim without the blur.
- The engaged frames differ by the veil alone: `glance/frames/veil-chromium-fine-light-slider-engaged.png` frosts the "before/after" text; `noveil-…-engaged.png` leaves it crisp.

Probe shots in `E2/shots/{veil,noveil}-{chromium,webkit}-*`: keyboard engaged, the hand-off, pointer held, the Dialog's slider, the NumberField mid-scrub.

The judgement ("iOS-27 grade or not") belongs to a seat that did not build this route. Real Safari: UNMEASURED.

**Capture status at close:** veil Chromium and WebKit complete, noveil Chromium complete, noveil WebKit not run (above). Logs: `logs/capture-{veil,noveil}-{chromium,webkit}.log`.

## 7 · Open gaps

1. **Q-3 is the owner's.** Both keyboard arms are built and read: the gates, E-3, E-10, E-11 and the probe are green in both engines, and the frames are in place. The `veil` arm frosts the world at every Tab into a slider (C-E r27's complaint); the `noveil` arm keeps it crisp. Also undecided by the owner is the pointer split: Q-3 (c) reads "in place on fine, promotion on coarse". This route promotes on every pointer, and A2 grows in place on fine. The two arms are now on one table, so the comparison is the owner's glance.
2. **The reach's loud paint.** An unreadable `--space-section` collapses the engaged control's inline scale to 0 while the console speaks (§3.2). The no-masking law is met. Whether the paint should hold ×1 is for the critic and the owner.
3. **The noveil arm keeps an invisible veil open.** The veil popover is open (opacity 0, `backdrop-filter` set) beneath every promoted control, so the top-layer order never needs a re-show. That is a cost on the keyboard path the `noveil` arm exists to cheapen. Measuring its compositor cost is next-pass work.
4. **The NumberField carry is near its bound.** The 2.65 px read was at load 30.8, NOT-REPRODUCED in 6 other reads (4.48-6.44 px). Its cap is 6 % of a 220 px field, 13.2 px soft-limited. Whether a field's scrub should carry a fling at all is a Q-4 (b) reach question (a number field is not on Q-4's surface list).
5. **During a hold, a re-render that moves the footprint glides the control** (3.8-5.1 px per frame) instead of jumping. A move that comes from a layout change with no DOM mutation (a font load, a sibling's resize) is not observed, so the control jumps with its anchor.
6. **Inherited, not E's:** `dock` latch and `GlassDock.vue`'s `data-held` (D2); `PagerDots.vue`'s `data-press`; the census's Label false positive (H2); the Sheet's target under reduce and its in-flow position (§P1-7); headless Aurora; F5's sortable ghost and tabs PRM; Q-5's light arm on near-white faces.
7. **The noveil WebKit capture sheet is owed** (the lock queue, §6); the probe's WebKit noveil shots stand in for it.
8. **CK-13 is not browser-read by this seat** (forced colors, reduced transparency on the stage and veil). The arm is the shipped one, unchanged.
9. **Real Safari** for every row (CK-17), and VoiceOver on a promoted control.
10. **Process:** twice this session two of this seat's heavy runs overlapped. A Chromium chain started while the WebKit chain was queued for the lock, and the lock then cleared. Every run went through the guard; no reading in this file depends on the overlap.
