# D5 · the engagement witness battery

| field | value |
|---|---|
| seat | the battery `REGISTRY.md` §2.1 names (E-1..E-9) with the harness rows of §2.3 (H-1..H-9) over the round-0 probe (`../r0/probe/`), after the D4 tile harness (`../../tile/harness/`). Built by the round-0 battery seat; H-1..H-9 landed by pass 1's R-H (`../pass-1/RH.md`); the pass-2 restatement (REGISTRY §P1-6 CK-01..CK-27, the witnesses §P1-9.2 hands to H2) landed by pass 2's H2 (`../pass-2/H2.md`, the row-by-row account) |
| model | `claude-opus-5-5`, asserted from own system identity |
| engines | Chromium 149.0.7827.55 (`chromium`) and Playwright WebKit 26.5, headless, from `glass-ui/node_modules/playwright` (Playwright 1.61). Touch input in WebKit drives the same WebKit build over its own inspector pipe (`wktouch.mjs`, H-4). **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell; this battery has no Safari target yet (D4's `safari.mjs` is the pattern when the checkbox is ticked) |
| results | not here. The self-test is `SELFTEST.md`; the HEAD reading is `../BASELINE.md` (P-3) |
| placement | `docs/tranches/BL/design/engagement/harness/` now; W-C.1 moves loop harnesses to `scripts/loops/engagement/` (`W-J.2.md:83`) |

## 1 · What it is

One scene app built against any worktree's library, one hand-made fixture page, and nine witness scripts that read either. Each witness prints PASS, FAIL, UNMEASURED or REPORT per cell with the measured numbers and the 1/5/15-minute load average, writes JSON with `--out`, and exits 0 on PASS, 1 on FAIL, 2 on a harness error or a hang, 3 when no gating cell could be read (UNMEASURED). Every read is one of: computed style and layout geometry sampled per animation frame; the running animations (`getAnimations`, their timing and keyframes); the CSSOM the page loaded; CDP performance counters (Chromium); the attributes on the live DOM; or, for E-7's static arm alone, the worktree's source tree (W-J.2 G2 is a source gate by design). No other witness reads source text.

| file | role |
|---|---|
| `build.mjs` | `node build.mjs <worktree> --label <l> --out <dir> [--decl <subpath>#<export>]`: `scenes/App.vue` bundled against the worktree's `src` through `@glass` (Vite, production compile) into `<out>/builds/<l>/`. It also writes the directory list (E-1's denominator), imports the declaration by name, and (pass 2) maps every value each directory's `index.ts` exports to that directory (`members.ts`), which the scene app's member walk reads (CK-01). Nothing is written into the worktree |
| `scenes/App.vue` | the library scene app: the index, the scenes, the DOM-contract tagger, `window.__e` |
| `fixtures.mjs` | the fixture page that satisfies every witness, and `FAULTS`, the planted violations (each names its witnesses and the cell that must fail, or `expect: "pass"` for a control) |
| `fixtures/e7/{clean,two-writers,spread,held-two}/` | E-7's static arm's source trees (CK-08: a writer per attribute; `spread` hides one in a `v-bind` object, `held-two` writes `data-held` outside the owner) |
| `lib.mjs` | serving (a build directory or the fixture), engines with relaunch, the page open and its mode cells, the touch page in both engines (`openTouchPage`, H-4), the in-page helpers, the lock, the witness wrapper (cells, JSON, verdict, watchdog, per-cell guard), the commit bar and the quiet read |
| `wktouch.mjs` | H-4: WebKit touch. Playwright's WebKit touchscreen sends `Input.dispatchTapEvent` only; the same build's protocol carries `Input.dispatchTouchEvent`. This module launches `pw.webkit.executablePath()` with `--inspector-pipe` and drives one page per context (navigate, evaluate, touch points, a mouse move). `Engine.kill()` kills it with the Playwright browser |
| `e1-census.mjs` .. `e9-prm.mjs`, `e10-continuity.mjs`, `e11-fail-loud.mjs` | the witnesses, one module each (E-10 and E-11 are pass 2's: CK-20 and CK-21) |
| `capture.mjs` | CK-25: the owner-glance frames per class exemplar, six states, both themes, fine and coarse, both engines, and a contact sheet per engine × pointer |
| `run.mjs` | the battery against one target: `--build <dir> --wt <worktree>` or `--fixture [--fault <id>]`, `--engines chromium,webkit`, `--only E-2,E-5`, and the pass-through `--commit-arms`, `--unowned` |
| `selftest.mjs` | H-1: every witness on the clean fixture (must exit 0) and on each fault aimed at it (must exit 1 with the planted cell failing, or 0 for a control), in both engines |
| `SELFTEST.md`, `logs/` | the self-test's reading (`logs/selftest.log`, `logs/selftest-e4.log`, the per-run JSON in `logs/selftest-json/`) |

### 1.1 Running it

```sh
H=docs/tranches/BL/design/engagement/harness
S=<scratch>
git worktree add --detach $S/wt <rev>
ln -s "$PWD/node_modules" $S/wt/node_modules
node $H/build.mjs $S/wt --label head --out $S/out
node $H/run.mjs --build $S/out/builds/head --wt $S/wt --out $S/out/runs/head      # both engines
node $H/selftest.mjs --out $S/out/selftest [--engines chromium,webkit] [--only E-6] [--faults e6-dim]
node $H/e2-commit.mjs --build $S/out/builds/head --engine webkit --scenes switch --themes dark   # one witness, narrowed
git worktree remove --force $S/wt
```

Per witness: `--engine webkit`, `--out <dir>`, `--deadline <s>` (default 1500), `--scenes a,b` (any witness, narrows the run to those scenes and says so in its header; `run.mjs` passes it through). E-2 also takes `--themes`. E-7 needs `--wt` for its static arm (UNMEASURED without it).

### 1.2 Serialization and crashes (H-3)

Every witness takes an exclusive lock (`$TMPDIR/bl-d5-engagement-harness.lock`, stale locks broken by pid), so one D5 harness browser runs at a time. **WebKit's navigation cap (pass 2):** every Playwright WebKit navigation asks macOS AppSSO first, and on 2026-10-07 the call stopped answering at about the 90th navigation of one process (`../../tile/pass-3/H3.md` §1.1, H3-1). `lib.mjs` retires the Playwright WebKit browser, and the raw touch driver's process, after `NAV_CAP` = 60 navigations (`D5_HARNESS_NAV_CAP` overrides it) and notes each retirement in the witness output. A WebKit page that closes is read as that class first (the cell is re-run on a fresh browser) before anyone calls it a defect. Other seats' browsers are not ours to stop: each run prints their count (`other headless processes: chromium n, webkit m`) and the load at start and end, and every cell line carries the load at its end.

Each cell runs inside `guard`: a timeout (45-90 s per cell), and when the engine closes or hangs (or a page never becomes ready within 60 s, or the raw WebKit driver loses its page) the browser is killed, relaunched, and the cell re-run once. The kill is bounded: 5 s for `close()`, then SIGKILL, so a crashed engine cannot stall the witness past its deadline (two HEAD witnesses hung for 1500 s before this, `../BASELINE.md` §0). A crash that does not reproduce prints `NOT-REPRODUCED` beside the re-run's reading; one that reproduces is a FAIL `ENGINE CLOSED, REPRODUCED 2/2`, and the witness moves on to its next cell on a fresh browser. This is the segment isolation D4's `t6-engagement.mjs:106-126` built for PF-1: at round 0 a WebKit crash on ToggleGroupItem or the accordion trigger took the rest of the run with it (`../r0/logs/r0.log:95,101-102`). One level up, `run.mjs` re-runs a witness process once when it ends in a HARNESS ERROR because its engine closed (D4 `tile/harness/run.mjs:26-39`).

E-2's commit and mount cells re-read a failure on janky frames twice; a failure that does not reproduce prints `NOT-REPRODUCED` and passes (the D4 T-6 rule, `tile/harness/HARNESS.md:135`). Janky is a median frame interval > 20 ms, or a starved film: under half its nominal frames, or one gap over 100 ms (`e2-commit.mjs starved`; at load 264-1000 an 800 ms film came back with 19 frames, `../pass-2/H2.md` §2.3). A failure on smooth frames is never re-read.

**Key dwell.** A commit key (E-2, E-8, E-9) is held 80 ms (`lib.mjs KEY_DWELL`), a hand's dwell. Playwright's default releases the key in the same task, and reka's `RadioGroupItem` checks on an arrow key's focus move only while the key is still down: the zero-dwell press read NOT DRIVEN on the Radio in Chromium at HEAD in 4 of 4 runs.

### 1.3 The DOM contract (scene app and fixture alike)

- `[data-scene]` on the scene root; `[data-sentinel="before" | "after"]`, focusable buttons around the scene.
- `data-e` is a token list: `~="target"` the element a gesture hits and a scale is read on; `~="body"` a travelling body (E-2's travel arm, E-9); `~="root"` and `~="thumb"` the slider's root and handle (E-3, E-4, E-7), or a drag surface's frame and the body it moves (E-4); `~="grip"` E-4's press point when it is not the thumb; `~="land"` the element E-4 reads once the thumb is gone (a drag ghost retired after its flight); `~="modal"` and `~="veil"` an open dialog and its scrim (E-7).
- E-4's index row may carry `axis` (`"x"` | `"y"`), `dir` (`1` | `-1`, the drag direction along the axis) and `input` (`"mouse"` | `"touch"`).
- `[data-engage-projection]`: a route that promotes a held control (D5-E) marks its projection; E-3 reads the larger of the root and the projection.
- Pass 2: `~="face"` the painted face CK-02 reads (arm ii's px, arm iii's light; default the target); `~="point"` a drag surface's visible value point (E-4 reads it before the thumb; the slider's is its range, with the row's `edge: "lead"`). Index rows may carry `keys` (a keyboard commit of several keys), `detents` (E-4's repeat landing), `fixed` (E-4's in-flow precondition), `veil` (the veil selector E-3, E-10 read beside `[data-engaged]`), `pair` (E-10's two roots for the hand-off) and `failLoud` (E-11's plants: `{ token, value, act: kbd | fling | commit, on? }`).
- `window.__e` (pass 2) also carries `state()` (the model the scene binds: CK-02's precondition), `members()` (the rendered member instances: `{ dir, root, els, handlers }`, CK-01; the scene app walks its component tree with `members.ts`, the fixture reads `[data-member]`) and, on the slider, `insertSibling()` (CK-20's re-render).
- `window.__e = { ready, kind, scene, index, commit(), mount(), dirs, decl, rungs, envelopes, sceneOfDir }`. `index` maps each scene to the witnesses it gates (`gates`), its keyboard commit key and its selectors; a witness runs on every scene whose `gates` name it, so a route or H-2 adds exemplars by adding scenes, not by editing witnesses.
- URL: `?scene=<id>&theme=light|dark`, `&on=1` (mount committed), `&defer=1` (mount on `__e.mount()`, H-8), `&phone=1` (the slider in a 16 px-gutter column), `&run=<k>` (E-4's repeat run index).

### 1.4 Mode cells

- `light`, `dark`: `.dark` on `html` plus `colorScheme`, verified.
- `coarse`: `hasTouch`, plus `isMobile` in Chromium, verified as `(hover: none)` and `(pointer: coarse)`. Measured: both engines apply it. A cell whose mode did not apply reads `MODE NOT APPLIED` and is UNMEASURED (E-2) or FAILs (E-3, E-5).
- `prm`: `reducedMotion: "reduce"`, verified.
- Held touch (`openTouchPage`, H-4), both engines. Chromium: `Input.synthesizeTapGesture` long-tap, the only CDP input that sets `:active` under touch (a raw CDP `touchStart` does not, `../PORTFOLIO.md` §1.3 item 8). WebKit: `Input.dispatchTouchEvent` touchStart … touchEnd through `wktouch.mjs`, which holds `:active` for the whole hold. Both set a sticky `:hover`, so every touch read separates the hover value from the press value. The WebKit touch page verifies `(hover: none)`, `(pointer: coarse)`, PRM and the theme like `openPage` does.
- Touch drag: Chromium `Input.dispatchTouchEvent` (scrolls and flings natively). WebKit: the touch events reach the DOM but **macOS WebKit has no touch scrolling**, so a scroll-snap surface cannot be driven there: E-4's touch cells are UNMEASURED in WebKit with that reason. Real Safari on iOS is the cell that would read it.
- Keyboard traversal in Playwright WebKit uses Option+Tab (its Tab skips buttons).

### 1.5 The scenes

| scene | library (at the build) | fixture | gates |
|---|---|---|---|
| `switch`, `checkbox`, `radio`, `tabs`, `toggle`, `chip`, `chipaction`, `accordion`, `button` | the round-0 exemplars plus the action Chip (CK-02's "Chip, both modes"), keys Space, Space, ArrowDown, ArrowRight, ArrowRight, Space, Space, Enter, Space; `face` on the control bit's `.control-bit__face` for switch, checkbox and radio | `pop` (a control that commits in light from its model), `travel` (a group whose body springs with an overshoot), `rest` (a control that rests scaled at 1.05 and commits around that settle) | E-2, E-8, E-9; E-5 on tabs, toggle, chip, accordion, button (and `press_switch`, `press_checkbox`), fixture `pop`; E-11 on switch (C-B's crest plant) |
| `slider` | `Slider` 360 px (phone: the full 358 px column); E-4 reads its value point (`.slider-range`, leading edge), presses its reka thumb; `insertSibling()` puts a 40 px block before it | a hand-made slider that grows ×1.06 while held (`data-held`) or keyboard-engaged (`data-kbd`: Tab focus or an acting key), shares one veil, and carries release velocity into a spring settle | E-3, E-4, E-7, E-9, E-10, E-11 |
| `slider2` | two `Slider`s (A, B) | two fixture sliders | E-10 (the hand-off) |
| `tabsdrag` | `SegmentedTabs`, its indicator dragged (the draggable pill, `useTabDragMorph.ts`) | — | E-4 (H-7) |
| `sheet` | `Dialog` + `SheetContent side="bottom" :detents="[0.25, 0.5, 0.75, 1]"`, open at 0.25; its `sheet-detent-handle` dragged up (axis y, dir −1); `detents`, `fixed: [role=dialog]` | `vsheet`: a bottom sheet sized by its rung (detents 0.25/0.45/0.75/1 of the viewport, open at 0.25), its grip dragged up; the release velocity picks the detent (faster than 50 px/s: the next one in its direction; a still release, its hand stopped 700 ms or more, reads 0) | E-4 (H-7) |
| `sortable` | `SortableList` of six rows; row a's handle dragged down (axis y). The thumb is the drag ghost (`.sortable-ghost`) while it flies, then the landed row (`land`) | — | E-4 (H-7) |
| `carousel` | `Carousel` (native `scroll-snap`, `scroll-snap-stop: always`), 600 px, four members; a touch drag left; `detents` | `strip`: a native scroll-snap strip, four cells | E-4 (H-7); WebKit UNMEASURED (no touch scrolling) |
| `s6` | the Switch at rest (the S6 subject is the glass track, the control bit, `W-H.3.md:46`) | a switch track breathing on `scale` 1 → 1.012, 4 s, retired under PRM | E-6 |
| `modal` | `Dialog` + `DialogContent` open (its `ModalOverlay veil`, `DialogContent.vue:194`) | a dialog whose scrim keys on `data-state="open"` | E-7 |
| `passive` | `Separator`, `Skeleton` | an `hr` (gamma) and a card (delta), both `static` | E-1 (static) |
| `presented` | `Dialog` + `DialogContent` open with a `Button` target inside (CK-19's "a Dialog with a target") | — | E-1 (presented) |
| `field` | `Input` | an input that answers hover | E-1 (field) |
| `ambient` | `Aurora` in a 420×240 frame (a pointer field: CK-19's "a pointer move changes paint") | a radial field that follows the pointer | E-1 (ambient) |
| `gallery` | `Card` (plain and `:selected="false"`), `Alert`, `Badge`, `Progress`, `StatusDot`, `PagerDots`, `Textarea`, a removable and a static `Chip`, each in an error boundary | — | E-1's census (CK-01's latch reads every member some scene renders) |

E-1's census visits every scene the index lists. `SCENE_OF_DIR` names the scene that exemplifies a directory; a route's declaration names its exemplars, and a route that adds one adds its scene and row.

## 2 · The witnesses

Bounds are `../PORTFOLIO.md` §1.1's unless a row says otherwise. Pass 2 restated E-1..E-5 and E-7 and added E-10 and E-11 (REGISTRY §P1-6; `../pass-2/H2.md` is the account); the CK row each witness carries is in §2.3.

| id | property | how the script decides | engines, modes |
|---|---|---|---|
| E-1 | **CK-01: the census reads adoption** | Reads the declaration from the built library (`build.mjs --decl`; shape `{ members: { dir: class }, classes: { class: { rung, reason?, exemplar? } }, modes?: { dir: [class…] } }`) and the directory list. Gating: the declaration exists; every directory is a member; no stray member; every class names a ladder rung or none with a reason. **Adoption, per directory rendered in any scene** (every scene in the index; `lib.mjs __census` over `__e.members()`): each instance's own elements compute `--rung-class` values that are non-empty and all declared for it (`members[dir]` or `modes[dir]`). **Single:** no element composes more than one `engage-*` class. **Static-inert:** a static member's root is not focusable, has no interactive role and no `on*` handler, and no element stamping `static` is live. **Adoption latch:** RED until every declared member is seen adopting in some scene. **Runtime per class, by its rung's input (CK-19):** press/engaged/modal: a press moves scale ≥ 0.01 or a press-only paint property; hover: hover changes paint; rest (ambient): a pointer move changes the pixels ≥ 0.5 levels and ≥ 2× the drift at rest. An absent target FAILS ("no target"), never throws. PRM (H-9): the same probe under reduce keeps a light answer | both; light, fine; PRM |
| E-2 | **CK-02: the commit, by one arm, on a commit that happened** | Filmed per frame for 800 ms (`lib.mjs __film`: target, body, face, the face's light, the light animations). **Precondition:** `__e.state()` changed across the commit, else FAIL NOT DRIVEN. **Arms** (`lib.mjs commitArms`): (i) a body travels ≥ 4 px and overshoots ≥ 0.5 px; (ii) the face's scale peak above its settle × the face's width > 0.8 px, with a bounce ≥ 0.002 below the settle; (iii) the face's luminance (`__light`: its layers composited on the colour behind it) rises ≥ 0.01 above both the edge's value and the committed rest, is back at rest (last 150 ms within 0.004), and a light animation on the face ran on an `ENGAGE_ENVELOPES` row's attack or release clock. **Admitted arms default to i, iii; `--commit-arms i,ii,iii` admits (ii) once the owner rules Q-5**; every line prints all three. Paths: Tab entry quiet (scale, body, light, state unchanged); keyboard (`key` or `keys`), programmatic, pointer, tap on a coarse pointer; mount committed (H-8: scale, body and light quiet) | both; light, dark; fine, coarse |
| E-3 | **CK-04: the held slider and the keyboard engagement's contract** | Desk: pointer-held ≥ ×1.03 sustained at 450 ms; keyboard-focused (Tab, 450 ms) ≥ ×1.03; **keyboard register** (no `[data-held]`, no `cursor: grabbing`, no squish below ×0.99 in height); **afterdrag** (drag and release, +600 ms: ×1 ± 0.002); **modifier** (Shift, Meta, Control, Alt alone: ×1 ± 0.002, no data-held); **unacted key** ("k": ×1 ± 0.002, no veil); **script focus** (`element.focus()` with no key event: ×1 ± 0.002, no veil). Phone (390×844, coarse): touch-held ≥ ×1.03 on the inline **or** block axis; inside the 16 px gutter. PRM (H-9): keyboard-focused and touch-held within ×1 ± 0.002 on both axes, and **the touch-held phone slider keeps a light leg** (≥ 1 paint property changes) | desk both; phone both (H-4); light, dark; PRM |
| E-4 | **CK-05: momentum on the visible body, without a teleport** | The fling-minus-still differential, read **in the page frame on the visible body** (`point`, else `thumb`, else `land`; `edge: "lead"` reads the leading edge) from the press to 2000 ms past the release. **Precondition: the body has effective opacity > 0 and a non-zero box on every frame, else FAIL INVISIBLE; a row's `fixed` element not computing `position: fixed` is UNMEASURED (in flow, §P1-7).** Fling: carry or settle ≥ 4 px further than still, both at rest; NOT DRIVEN under 20 px (WebKit touch: UNMEASURED). **Continuity:** the largest one-frame move on release ≤ the drive's largest × 1.5 + 2 px (a `platform` row, a native scroll-snap fling, is REPORT: CK-18 states it as the platform's). **Repeat** (`detents`): three fling runs land within 2 px. PRM (H-9): at rest, overshoot ≤ 0.5 px | both (touch surfaces: Chromium; WebKit UNMEASURED); light; PRM |
| E-5 | a held touch answers through a press rung, **and sustains (CK-06)** | Press: \|Δscale\| ≥ 0.01 or a press-only property (changed from rest to a value hover does not paint). **Sustain:** the same held touch read at +200 ms and +1200 ms; the press-only properties' distance from rest (RGBA distance, numeric difference, else 0/1) at +1200 ≥ 0.95× that at +200; normally and under PRM. PRM (H-9): ≥ 1 press-only property | both (H-4); light, dark; PRM |
| E-6 | the idle rung under the compositor-only bound | unchanged (H-5); CK-07 is closed only by the owner's words (Q-2) | both (layouts Chromium, REPORT in WebKit); light, dark; PRM |
| E-7 | **CK-08: one writer per engagement attribute** | Static, per attribute (`data-engaged`, `data-held`, `data-press`, `data-commit`): the source files that write it (a template attribute; `dataset.x =`, `delete …dataset.x`, `dataset["x"] =`; `set/toggle/removeAttribute`; **an object key `"data-x":`, the bag a `v-bind` spread or a render function writes through, X-6**); reads are not writes; ≤ 1, under `src/composables/motion/engage/`. `--unowned data-press,…` prints an attribute the route's charter does not own as REPORT. Runtime: a modal open with nothing held carries 0 `[data-engaged]`; a held slider carries ≥ 1; the same under PRM | static; runtime both; light; PRM |
| E-8 | one clock authority; no rung literal | unchanged | both; light; PRM |
| E-9 | the PRM arm | unchanged | both; light, dark; fine |
| E-10 | **CK-20: no one-frame discontinuity on an engagement path** | Filmed per frame; every one-frame step is read per nominal 16.7 ms frame (step × 16.7 / max(16.7, dt)), so a long frame under load does not inflate a spring into a snap. Own release (REPORT, the reference): Tab in, +600 ms, Tab out: the root's largest one-frame scale drop. **Escape release:** the same with Escape, ≤ the reference + 0.002 (NOT DRIVEN if the keyboard did not engage). **Re-render landing:** a pointer hold, `insertSibling()`, release: the root's largest one-frame move ≤ the same release without the insert + 1 px. **Hand-off drop** (`pair`): Tab A → B: A's largest drop ≤ the reference + 0.002 (NOT DRIVEN if A was not engaged). **Hand-off veil:** the veil never falls below 0.1× its level before the Tab (REPORT when the route veils no keyboard engagement) | both; light |
| E-11 | **CK-21: no silent degradation** | Per `failLoud` plant: the act (`kbd`, `fling`, `commit`) twice clean, then with the token set to the plant's value on the root. PASS when the planted run raised ≥ 1 `console.error`; FAIL when the read degraded with no error: a metric lies outside the clean reads' [min, max] by more than its epsilon, and does so again on the same side when a third clean run and a second planted run are taken (run-to-run noise is not a degradation, `../pass-2/H2.md` §2.3); UNMEASURED when nothing degraded and nothing was raised (the token is not read on that path). Plants: C-E's three (`--space-section`, `--scale-engage`, `--spring-dock-settle`) and C-B's crest (`--scale-commit-pop: 1`) | both; light |

### 2.1 The planted violations (`FAULTS`)

Round 0 and pass 1: E-1 `e1-undeclared`, `e1-norung`, `e1-dead`, control `e1-stale`; E-2 `e2-fade`, `e2-tabpop`, `e2-prog`, `e2-glide`, `e2-mountpop`, `e2-nocoarse`; E-3 `e3-still`, `e3-kbd`, `e3-gutter`, `e3-prmgrow`; E-4 `e4-drop`, `e4-hold`, `e4-vdrop`, `e4-stripstop` (Chromium), `e4-prmbounce`, control `e4-snap`; E-5 `e5-hover`; E-6 `e6-absent`, `e6-dim`, `e6-layout`, `e6-prm`, `e6-fast`, `e6-spin`, `e6-saw`; E-7 `e7-veil`, `e7-two`, `e7-prm`; E-8 `e8-drift`, `e8-literal`, `e8-prmliteral`, control `e8-units`; E-9 `e9-scale`, `e9-dark` (also E-1, E-5), `e9-glide`.

**Pass 2 (H2), one or more per new cell:** E-1 `e1-unadopted`, `e1-nullhost`, `e1-wrongclass` (adoption), `e1-double` (single), `e1-staticfocus` (static-inert), `e1-latch` (the latch), `e1-absent` (FAIL, not throw), `e1-fielddead`, `e1-ambientdead` (CK-19's probes). E-2 `e2-notdriven` (the precondition), `e2-fillonly`, `e2-literalflash` (arm iii), `e2-geompop` (arm ii unadmitted), `e2-smallpop` (arm ii admitted, 0.4 px), control `e2-bigpop` (arm ii admitted, 1.08 crest). E-3 `e3-tabhand`, `e3-latch`, `e3-modifier`, `e3-charkey`, `e3-scriptfocus`, `e3-prmdark`, control `e3-blockgrow`. E-4 `e4-ghostbody` (visible body), `e4-teleport` (continuity), `e4-flaky` (repeat), `e4-inflow` (must read UNMEASURED). E-5 `e5-decay` (sustain). E-7 `e7-spread`, `e7-held`. E-10 `e10-snap`, `e10-veildip`, `e10-escsnap`, `e10-rerender`. E-11 `e11-silent`, `e11-unread` (must read UNMEASURED), `e11-noise` (a token-free grow that varies run to run; must read UNMEASURED, and FAILs the superseded one-read rule). The fixture's light commit (an overlay rising on the control-engage envelope's attack and decaying on its release) replaced its geometric pop: under the default arms a geometric pop is `e2-geompop`'s plant. Each entry in `fixtures.mjs` says what it breaks and which printed cell must fail; `expect: "unmeasured"` must leave its cell UNMEASURED with nothing failing; `args` are passed to the witness.

### 2.2 Where each harness row lives (REGISTRY §2.3)

| row | where | state |
|---|---|---|
| H-1 | `selftest.mjs` over `fixtures.mjs`: the clean fixture passes every witness, each plant fails its planted cell, each control passes, each UNMEASURED plant reads UNMEASURED, both engines | landed; reading `SELFTEST.md` |
| H-2 | one exemplar scene per declared class: CK-19 (pass 2) | **landed** (`presented`, `field`, `ambient`, `gallery` with the round-0 scenes; E-1 probes each class by its rung's input) |
| H-3 | `lib.mjs` `guard` and `run.mjs` `runOne`; pass 2 adds the WebKit navigation cap (`NAV_CAP`) | landed |
| H-4 | `wktouch.mjs` + `lib.mjs` `openTouchPage` (pass 2: `holdAt` reads one hold at several times; `shot` snapshots a clip for CK-25) | landed (hold); scroll UNMEASURED with the reason |
| H-5 | E-6 | landed |
| H-6 | E-1 reads the declaration and the rendered element; no source text | landed |
| H-7 | E-4 scenes | landed |
| H-8 | E-2 `mount(committed)` (pass 2: light quiet too) | landed |
| H-9 | a PRM cell per witness | landed |

### 2.3 The pass-2 checklist rows, by witness cell (REGISTRY §P1-6)

| CK | cells |
|---|---|
| CK-01 | E-1 `declaration present`, `denominator declared`, `no stray member`, `class carries a rung`, `adoption <dir>`, `single`, `static-inert <dir>`, `adoption latch`, `runtime <class>` |
| CK-02 | E-2 every cell (the arms, the precondition, Tab entry, mount) |
| CK-03 | E-2 `mount(committed)`; the async arrival is not a harness cell yet (owed, §3) |
| CK-04 | E-3 every cell |
| CK-05 | E-4 every cell |
| CK-06 | E-5 `press`, `press-light(PRM)`, `sustain`, `sustain(PRM)` |
| CK-07 | E-6 (closed only by the owner's words) |
| CK-08 | E-7 `writers data-*` and the runtime cells |
| CK-09 | E-8 |
| CK-10 | E-9 and every witness's PRM cell |
| CK-19 | E-1 `runtime <class>` on the CK-19 scenes |
| CK-20 | E-10, and E-4 `release continuity` (the sortable and tabs teleports) |
| CK-21 | E-11 |
| CK-25 | `capture.mjs` (frames, not cells; read by a seat that did not build the route) |

CK-11..CK-18 and CK-22..CK-24, CK-26, CK-27 are the critics' reads on a build (a source grep, a cost count, a forced-colours read, the owner's words); the harness carries no cell for them beyond the ones named above.

## 3 · What is owed (not built here)

- **E-4's touch surfaces in WebKit**: macOS WebKit has no touch scrolling, so the Carousel (and the fixture's strip) cannot be flung there; UNMEASURED with that reason. Real Safari on a touch device is the cell.
- **CK-03's async arrival** (a model set in the mount's own task gives 0 commits, after first paint 1): not a harness cell; the scene app has no hook to set the model after first paint yet.
- **CK-13 (forced colours, reduced transparency)**: not a witness; the critic reads it under Chromium's forced-colours emulation.
- **FL-6**: "stops off-screen" for an idle rung is not read.
- **FL-7 / CK-17**: real Safari. No Safari target in this battery; every visual claim reads UNMEASURED (owner's safaridriver checkbox).
- **CK-02 arm (iii)'s light read is a computed composite**, not pixels: a light layer painted by a gradient (`background-image`) is not composited, so a route that commits in a gradient reads no rise there. CK-25's frames are the pixel read.
- A `dist` flavour (D4 H-9): the build is `src` through `@glass` only.

## 4 · Notes for the route seats

- A route builds its own worktree and passes it to `build.mjs`; a declaration elsewhere than `composables/motion#ENGAGE_DECLARATION` is named with `--decl`.
- A route that adds an exemplar adds a scene to `scenes/App.vue`'s `INDEX` (with `gates`) and, for E-1, a `SCENE_OF_DIR` row. A route that adds a drag surface adds an `INDEX` row gated `E-4` with `root`, `thumb` (and `grip`, `land`, `point`, `edge`, `axis`, `dir`, `input`, `detents`, `fixed` where they apply). A route whose engagement reads a token at runtime adds it to a row's `failLoud`.
- CK-02 admits arms i and iii until the owner rules Q-5; a run that admits arm ii (`--commit-arms i,ii,iii`) cites the ruling. Pass 2 films both arms on the same members for the glance (§P1-8).
- Harness runs are serialized by the lock. Record the load printed beside every timing.
- WebKit pointer cells on ToggleGroupItem and the accordion trigger close the page (PF-1 and its candidate extension, `../PORTFOLIO.md` §1.3 item 7). They fail loud per cell; the other cells of the run stay readable.
