# D5 · the engagement witness battery (round 0, R-H's rows)

| field | value |
|---|---|
| seat | D5 round-0 battery seat. Builds the battery `REGISTRY.md` §2.1 names (E-1..E-9) with the harness rows of §2.3 (H-1..H-9) over the round-0 probe (`../r0/probe/`), after the D4 tile harness (`../../tile/harness/`) |
| model | `claude-opus-5-5`, asserted from own system identity |
| engines | Chromium 149.0.7827.55 (`chromium`) and Playwright WebKit 26.5, headless, from `glass-ui/node_modules/playwright` (Playwright 1.61). **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell; this battery has no Safari target yet (D4's `safari.mjs` is the pattern when the checkbox is ticked) |
| results | not here. The self-test is `SELFTEST.md`; the HEAD reading is `../BASELINE.md` (P-3) |
| placement | `docs/tranches/BL/design/engagement/harness/` now; W-C.1 moves loop harnesses to `scripts/loops/engagement/` (`W-J.2.md:83`) |

## 1 · What it is

One scene app built against any worktree's library, one hand-made fixture page, and nine witness scripts that read either. Each witness prints PASS, FAIL, UNMEASURED or REPORT per cell with the measured numbers and the 1/5/15-minute load average, writes JSON with `--out`, and exits 0 on PASS, 1 on FAIL, 2 on a harness error or a hang, 3 when no gating cell could be read (UNMEASURED). Every read is one of: computed style and layout geometry sampled per animation frame; the running animations (`getAnimations`, their timing and keyframes); the CSSOM the page loaded; CDP performance counters (Chromium); the attributes on the live DOM; or, for E-7's static arm alone, the worktree's source tree (W-J.2 G2 is a source gate by design). No other witness reads source text.

| file | role |
|---|---|
| `build.mjs` | `node build.mjs <worktree> --label <l> --out <dir> [--decl <subpath>#<export>]`: `scenes/App.vue` bundled against the worktree's `src` through `@glass` (Vite, production compile) into `<out>/builds/<l>/`. It also writes the directory list (E-1's denominator) and imports the declaration by name. Nothing is written into the worktree |
| `scenes/App.vue` | the library scene app: the index, the scenes, the DOM-contract tagger, `window.__e` |
| `fixtures.mjs` | the fixture page that satisfies every witness, and `FAULTS`, the planted violations (each names its witnesses and the cell that must fail, or `expect: "pass"` for a control) |
| `fixtures/e7/{clean,two-writers}/` | E-7's static arm's two source trees |
| `lib.mjs` | serving (a build directory or the fixture), engines with relaunch, the page open and its mode cells, the in-page helpers, the lock, the witness wrapper (cells, JSON, verdict, watchdog, per-cell guard), the commit bar and the quiet read |
| `e1-census.mjs` .. `e9-prm.mjs` | the witnesses, one module each |
| `run.mjs` | the battery against one target: `--build <dir> --wt <worktree>` or `--fixture [--fault <id>]`, `--engines chromium,webkit`, `--only E-2,E-5` |
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

Per witness: `--engine webkit`, `--out <dir>`, `--deadline <s>` (default 1500). E-2 also takes `--scenes` and `--themes`. E-7 needs `--wt` for its static arm (UNMEASURED without it).

### 1.2 Serialization and crashes (H-3)

Every witness takes an exclusive lock (`$TMPDIR/bl-d5-engagement-harness.lock`, stale locks broken by pid), so one D5 harness browser runs at a time. Other seats' browsers are not ours to stop: each run prints their count (`other headless processes: chromium n, webkit m`) and the load at start and end, and every cell line carries the load at its end.

Each cell runs inside `guard`: a timeout (45-90 s per cell), and when the engine closes or hangs the browser is killed, relaunched, and the cell re-run once. A crash that does not reproduce prints `NOT-REPRODUCED` beside the re-run's reading; one that reproduces is a FAIL `ENGINE CLOSED, REPRODUCED 2/2`, and the witness moves on to its next cell on a fresh browser. This is the segment isolation D4's `t6-engagement.mjs:106-126` built for PF-1: at round 0 a WebKit crash on ToggleGroupItem or the accordion trigger took the rest of the run with it (`../r0/logs/r0.log:95,101-102`). One level up, `run.mjs` re-runs a witness process once when it ends in a HARNESS ERROR because its engine closed (D4 `tile/harness/run.mjs:26-39`).

E-2's commit cells re-read a failure on janky frames (median frame interval > 20 ms) twice; a failure that does not reproduce prints `NOT-REPRODUCED` and passes (the D4 T-6 rule, `tile/harness/HARNESS.md:135`). A failure on smooth frames is never re-read.

### 1.3 The DOM contract (scene app and fixture alike)

- `[data-scene]` on the scene root; `[data-sentinel="before" | "after"]`, focusable buttons around the scene.
- `data-e` is a token list: `~="target"` the element a gesture hits and a scale is read on; `~="body"` a travelling body (E-2's travel arm, E-9); `~="root"` and `~="thumb"` the slider's root and handle (E-3, E-4, E-7), or a drag surface's frame and handle (E-4); `~="modal"` and `~="veil"` an open dialog and its scrim (E-7).
- `[data-engage-projection]`: a route that promotes a held control (D5-E) marks its projection; E-3 reads the larger of the root and the projection.
- `window.__e = { ready, kind, scene, index, commit(), mount(), dirs, decl, rungs, envelopes, sceneOfDir }`. `index` maps each scene to the witnesses it gates (`gates`), its keyboard commit key and its selectors; a witness runs on every scene whose `gates` name it, so a route or H-2 adds exemplars by adding scenes, not by editing witnesses.
- URL: `?scene=<id>&theme=light|dark`, `&on=1` (mount committed), `&defer=1` (mount on `__e.mount()`, H-8), `&phone=1` (the slider in a 16 px-gutter column).

### 1.4 Mode cells

- `light`, `dark`: `.dark` on `html` plus `colorScheme`, verified.
- `coarse`: `hasTouch`, plus `isMobile` in Chromium, verified as `(hover: none)` and `(pointer: coarse)`. Measured: both engines apply it. A cell whose mode did not apply reads `MODE NOT APPLIED` and is UNMEASURED (E-2) or FAILs (E-3, E-5).
- `prm`: `reducedMotion: "reduce"`, verified.
- Held touch: Chromium's `Input.synthesizeTapGesture` long-tap is the only headless input that sets `:active` under touch (a raw CDP `touchStart` does not, `../PORTFOLIO.md` §1.3 item 8), and it sets a sticky `:hover` too, so every touch read subtracts hover. **Playwright WebKit has no held-touch input** (its touchscreen taps only; H-4): E-5 and E-3's phone arm are UNMEASURED there, with that reason, until a route supplies one or real Safari is enabled.
- Keyboard traversal in Playwright WebKit uses Option+Tab (its Tab skips buttons).

### 1.5 The scenes

| scene | library (at the build) | fixture | gates |
|---|---|---|---|
| `switch`, `checkbox`, `radio`, `tabs`, `toggle`, `chip`, `accordion`, `button` | the eight round-0 exemplars (`../r0/probe/App.vue`), keys Space, Space, ArrowDown, ArrowRight, ArrowRight, Space, Enter, Space | `pop` (a control that pops from its model), `travel` (a group whose body springs with an overshoot), `rest` (a control that rests scaled at 1.05 and pops around that settle) | E-2, E-8, E-9; E-5 on tabs, toggle, chip, accordion, button (and `press_switch`, `press_checkbox`), fixture `pop` |
| `slider` | `Slider` 360 px (phone: the full 358 px column) | a hand-made slider that grows ×1.06 while held or keyboard-focused, and carries release velocity into a spring settle | E-3, E-4, E-7, E-9 |
| `tabsdrag` | `SegmentedTabs`, its indicator dragged (the draggable pill, `useTabDragMorph.ts`) | — | E-4 (H-7) |
| `s6` | the Switch at rest (the S6 subject is the glass track, the control bit, `W-H.3.md:46`) | a switch track breathing on `scale` 1 → 1.012, 4 s, retired under PRM | E-6 |
| `modal` | `Dialog` + `DialogContent` open (its `ModalOverlay veil`, `DialogContent.vue:194`) | a dialog whose scrim keys on `data-state="open"` | E-7 |
| `passive` | `Separator`, `Skeleton` | an `hr` | E-1's static exemplars (no gate) |

H-2 (one exemplar per declared class) waits for a family to declare classes: the round-0 exemplars are the interactive atoms at hand. E-1's runtime arm already reads the exemplar a declaration names, through `sceneOfDir`.

## 2 · The witnesses

Bounds are `../PORTFOLIO.md` §1.1's unless a row says otherwise; changes from round 0 are in bold.

| id | property | how the script decides | engines, modes |
|---|---|---|---|
| E-1 | the census over a declared denominator | **Reads the declaration from the built library (`build.mjs --decl`, default `composables/motion#ENGAGE_DECLARATION`; shape `{ members: { dir: class }, classes: { class: { rung, reason?, exemplar? } } }`) and the directory list the build wrote. Gating: the declaration exists; every directory is a member; no stray member; every class names a ladder rung (read from the built `ENGAGE_LADDER`) or none with a reason; per class with a rung, its exemplar's scene answers a press (Δscale ≥ 0.01 or a press-only paint change). No byte detector (H-6)** | both; light, fine |
| E-2 | the commit bar, generalized | D4's H-4 bar per frame for 800 ms. Gating per scene and theme: Tab entry quiet; commit by keyboard, programmatic (focus parked after), pointer, **tap on a coarse pointer, and the mount case: mounted already committed, nothing pops (H-8)** | both; light, dark; fine, coarse |
| E-3 | the slider exemplar | W-J.2's slider probe bound (×1.03 sustained at 450 ms), pointer-held and keyboard-focused. **Phone arm (390×844, coarse, the full-width column): touch-held ×1.03, and the engaged box inside the 16 px gutter (`../PORTFOLIO.md` §2.4)** | desk both; phone Chromium (WebKit UNMEASURED, H-4); light, dark |
| E-4 | momentum | **A differential: the same drag released as a fling and after a 250 ms stop; the thumb's forward carry past the release and its settle, in the root's own frame, read every frame for 2000 ms; both releases must be at rest (the last 200 ms move < 0.5 px); PASS when the fling carries or settles ≥ 4 px further. A surface that snaps is not credited for the snap. The largest one-frame jump is printed, not gated. Scenes: the slider and the tabs' draggable indicator (H-7, two of the five surfaces)**. The window was 700 ms until the battery seat's HEAD run, which read the SegmentedTabs indicator mid-jump and passed WebKit on a timing accident (`../BASELINE.md` §3 E-4); the fault `e4-hold` plants that shape | both; light, fine |
| E-5 | a held touch answers through a press rung | the round-0 `e5.mjs` read: |Δscale| ≥ 0.01 or a press-only property under a long-tap, hover subtracted | Chromium; WebKit UNMEASURED (H-4); light, dark |
| E-6 | the idle rung under the compositor-only bound | **Breathing defined (H-5): present (≥ 1 running infinite animation on the subject at rest); channel (compositor channels only, and opacity only on a pseudo-element: opacity on the element dims its ink); amplitude (scale 0.004..0.03, a light layer's opacity ≥ 0.05); period (2400..8000 ms); 0 layouts/s over 3 s (Chromium); PRM (no spatial idle leg). The round-0 plant (`opacity: .9`, 4 s, on the host) now FAILs `channel`** | both (layouts Chromium, REPORT in WebKit); light, dark |
| E-7 | one writer of `data-engaged` | **Static: the source files that write the attribute (template attribute, `dataset.engaged`, `set/toggle/removeAttribute`), comments and style blocks stripped; ≤ 1 and under `src/composables/motion/engage/` (reads `.ts` too, so a writer cannot hide in a composable). Runtime: a modal open with nothing held carries 0 `[data-engaged]`; a held slider carries ≥ 1** | static; runtime both; light |
| E-8 | one clock authority; no rung literal | **Runtime: the built `ENGAGE_ENVELOPES` rows equal the computed `--engage-*` tokens on `:root`, with no orphan; and per scene, every animation and transition that runs during a press and a keyboard commit has a duration some clock token resolves to (each CSSOM custom property resolved on the scene as a `transition-duration`)** | both; light |
| E-9 | the PRM arm | **Under reduced motion, per scene and theme: press-spatial (scale range < 0.002 while pressed), press-light (≥ 1 press-only paint change), commit-spatial (the target's scale and the body in flight on ≤ 1 frame: a state change lands, it does not glide or pop)** | both; light, dark; fine |

### 2.1 The planted violations (`FAULTS`)

E-1: `e1-undeclared`, `e1-norung`, `e1-dead`, control `e1-stale`. E-2: `e2-fade`, `e2-tabpop`, `e2-prog`, `e2-glide`, `e2-mountpop`, `e2-nocoarse`; the fixture's `travel` (a body with an overshoot and no pop) and `rest` (a resting scale) scenes are the D4 controls `t6-body` and `t6-rest`, carried in the clean run. E-3: `e3-still`, `e3-kbd`, `e3-gutter` (Chromium). E-4: `e4-drop`, `e4-hold`, control `e4-snap`. E-5: `e5-hover` (Chromium). E-6: `e6-absent`, `e6-dim` (the round-0 plant), `e6-layout`, `e6-prm`, `e6-fast`. E-7: `e7-veil`, `e7-two`. E-8: `e8-drift`, `e8-literal`, control `e8-units`. E-9: `e9-scale`, `e9-dark`, `e9-glide`. Each entry in `fixtures.mjs` says what it breaks and which printed cell must fail.

## 3 · What is owed (not built here)

- **H-2**: E-2's scenes are the round-0 atoms, not one exemplar per declared class; they grow when a family declares its classes.
- **H-4**: a held touch in Playwright WebKit. None found: Playwright's WebKit touchscreen only taps. E-5 and E-3's phone arm stay UNMEASURED there.
- **H-7**: E-4 reads two of the five surfaces the row names (the slider, the tabs drag). The Sheet detents, the sortable list and one scroll-snap surface (Carousel or Deck) are owed as scenes; each needs a drag handle tagged `thumb` and its frame tagged `root`.
- **FL-6**: "stops off-screen" for an idle rung is not read.
- **FL-7**: real Safari. No Safari target in this battery; every visual claim reads UNMEASURED (owner's safaridriver checkbox).
- A `dist` flavour (D4 H-9): the build is `src` through `@glass` only.

## 4 · Notes for the route seats

- A route builds its own worktree and passes it to `build.mjs`; a declaration elsewhere than `composables/motion#ENGAGE_DECLARATION` is named with `--decl`.
- A route that adds an exemplar adds a scene to `scenes/App.vue`'s `INDEX` (with `gates`) and, for E-1, a `SCENE_OF_DIR` row.
- Harness runs are serialized by the lock. Record the load printed beside every timing.
- WebKit pointer cells on ToggleGroupItem and the accordion trigger close the page (PF-1 and its candidate extension, `../PORTFOLIO.md` §1.3 item 7). They fail loud per cell; the other cells of the run stay readable.
