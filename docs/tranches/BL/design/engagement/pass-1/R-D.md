# D5 · pass 1 · R-D: the material carries it

| field | value |
|---|---|
| seat | R-D, research seat for family D5-D (`REGISTRY.md` §3.1). Read: `PORTFOLIO.md` shared sections, D5-D's charter (`:307-346`) and §6 D5-D (`:423-428`), `REGISTRY.md`, `BASELINE.md`, `harness/HARNESS.md`, `pass-1/RH.md`. The other families' pass-1 files were not read |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | built at `dd203cd2`; the checkout moved to `8becaac7` through docs-only commits (`git diff --stat dd203cd2 HEAD -- src` empty). `R-D.patch` applies clean at `8becaac7` (`git apply --check`) |
| worktree | `scratchpad/D5/p1/rD/wt`, node_modules symlinked, removed after the run (`git worktree list` shows none) |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | 1-minute load 20-30 for the battery (`R-D/runs/cells.log`, every cell carries its own), 40-66 for the PF-1 bisect, 99-167 during the captures. No cell below is called a defect on a read taken only under load |
| artefacts | `R-D.patch` (the prototype); `R-D/runs/` (battery JSON, `proto.log`, `cells.log`, `e1.log`); `R-D/substrate-census.{mjs,log}`; `R-D/tapfilm.{mjs,log}`; `R-D/kbdprobe.{mjs,log}`; `R-D/veilprobe.{mjs,log}`; `R-D/pf1-bisect.log`; `R-D/capture.{mjs,log}`, `R-D/captures/` (contact sheets, held-slider viewports, `frames/`) |

## 0 · In brief

1. **The prototype runs.** It covers the trio and one passive atom: the control-bit substrate (Switch, Checkbox, Radio), the disclosure substrate (Accordion trigger), the slider's held rung, and Separator and Skeleton declared `static`. Across E-2, E-5, E-7, E-8 and E-9 on the trio's scenes it scores **Chromium 101 of 103 gating cells and WebKit 103 of 103**. The two Chromium FAILs are a keyboard race in reka's RadioGroup that HEAD shows too (§2, E-2), not a prototype defect.
2. **D's commit is a transition of a registered phase, so it is mount-safe by construction.** `--commit-t` moves 0↔1 on the panel spring, and `transform: scale(1 + amp·sin(π·t))` reads it as one swell and one dip. Keyboard, programmatic, pointer and touch-tap commits take one path. A component mounted committed pops nothing: 0.000 scale range in all 8 mount cells per engine, 16 in all (H-8, §3).
3. **What D cannot do, measured:** E-4 is 0.00 px on the slider in both engines (no release velocity reaches CSS). E-3's phone arm stays ×1.000, by design: a 358 px track has no gutter to grow into, so that arm goes to D5-E. Stateless components (Button, action Chip) get no commit. E-6 stays RED under Q-2's default.
4. **PF-1 is localized to one token.** Playwright WebKit closes the page on pointer entry over the accordion trigger and the ToggleGroupItem. The trigger is `--control-surface-bg-hover`, the hover paint both share. Re-pointing it stops both crashes (§5 item 5, `pf1-bisect.log`). Consolidating substrates found this; it was not a goal.
5. **The substrate map needs about ten classes, not six.** 18 of 55 directories reference no shared recipe and 14 reference more than one (§5 item 1). Consolidating them onto substrates is most of D's real cost.

## 1 · The prototype (`R-D.patch`, 15 files, +197 −26)

| piece | file | what it does |
|---|---|---|
| the commit leg | `styles/glass/commit.css` (new, 30 lines) | `@property --commit-t` (`<number>`, not inherited); `:is(.control-bit, .disclosure-trigger) { transform: scale(calc(1 + var(--commit-amp, 0) * sin(var(--commit-t) * 180deg))) }`; under reduce, `--commit-amp: 0`. Declared once (P-3) |
| control-bit substrate | `styles/glass/control-bit.css` | host owns one transition: `--commit-t var(--spring-panel-duration) var(--spring-panel)`; `--commit-amp: calc(1 - var(--scale-press))` (0.04, the press mirrored: no figure minted); `--commit-t: 1` on checked/indeterminate. The press is the face fill already in the register (`:active .control-bit__face`, `--fill-selected`), not a host scale |
| shells drop `.tap-squish` | `Switch.vue`, `Checkbox.vue`, `RadioGroupItem.vue` | one substrate per component (D's consolidation). Clean break; no alias |
| disclosure substrate | `_shared/disclosure/disclosure.css` | `--commit-amp: calc(1 - var(--scale-press-sm))` (0.03); `--commit-t: 1` on `[data-state="open"]`; hover guarded by `(hover: hover)` (FL-4) and repainted on the one-ink `--fill-hover`; a press-only light answer on `--fill-selected` on the press-drain attack clock; `--commit-t` in its transition list |
| the held rung in place | `slider/styles.css`, `tokens/scale-paper.css` | `@media (pointer: fine) and (prefers-reduced-motion: no-preference) { .glass-slider:is([data-held], :has(:focus-visible)) { scale: var(--scale-engaged) } }` on the dock spring (the ladder's engaged row, `engageLadder.ts:183-193`). `--scale-engaged: 1.06` is a new row in the scale table (T1 GROW's figure, `BI.W-ENGAGE-AFFORD.md:115-130`). This is the one figure the prototype adds; FL-2 has to rule on it |
| one writer | `composables/motion/engage/useGraspEngaged.ts` (new) | `toggleAttribute("data-engaged", held)` on the slider's teleported carriers (veil, loupe). `Slider.vue` drops its two `:data-engaged` bindings |
| the veil split | `dialog/ModalOverlay.vue`, `glass/focus-veil.css` | the modal veil loses `data-engaged`; the veil paints on `:is(.glass-focus-veil[data-engaged], [data-state="open"] > .glass-focus-veil)` |
| the census | `composables/motion/engage/engageSubstrates.ts` (new), `motion/index.ts` | `ENGAGE_DECLARATION`: 55 members onto 10 classes (control-bit 3, capsule 10, field 5, disclosure 3, row 4, track 1, drag 4, plate 6, overlay 4, static 15) |

The passive atom is a declaration only: Separator and Skeleton are `static` with a reason (Q-1 default (c)). D found no plate on either atom for the pointer field to answer.

## 2 · Every E-witness on the prototype (REGISTRY §3.3 item 1)

Scenes: E-2/E-5/E-8/E-9 on `switch, checkbox, radio, accordion, press_switch, press_checkbox, slider`. E-1/E-3/E-4/E-6/E-7 on their own scenes. Source: `R-D/runs/cells.log` (every cell, its load) and `R-D/runs/e1.log`.

| witness | Chromium | Playwright WebKit | reading | HEAD (BASELINE) | row for D |
|---|---|---|---|---|---|
| E-1 | 11 PASS · 5 FAIL, then HARNESS ERROR at the overlay class | same | declaration present, 55/55 declared, no stray, every class carries a rung or a reason: PASS. Runtime PASS (with the PRM cell) on control-bit (switch, press-only `child0 bg`), disclosure (accordion, `background-color`) and track (slider, Δscale 0.060). capsule (chip) presses (Δscale −0.051) but **its PRM light FAILs**: the HEAD chip defect, which this pass did not cure. field, row, drag and plate FAIL `no harness scene` (H-2). The overlay exemplar (dialog → `modal` scene, which has no `target`) throws in `e1-census.mjs:53`: a harness defect, routed to R-H | RED (no declaration) | **RED until H-2**: the declaration side is GREEN; the runtime cells need scenes per substrate, and the capsule needs its PRM light leg (D's to build) |
| E-2 | 46/48 | **48/48** | switch, checkbox and radio peak 1.040, trough 0.995, settle 1.000 on keyboard, programmatic, pointer and tap; accordion 1.030 / 0.996 / 1.000; Tab entry 0.000; mount 0.000 (H-8). The 2 FAILs are `radio keyboard(ArrowDown)` light and dark: peak = trough = 1.000 because **the arrow moved focus without selecting**. HEAD does the same (`kbdprobe.log`: 3 of 4 harness-order reads end `checked \| unchecked*`) | RED (58 of 64 per engine) | GREEN on the state-bearing trio. **RED by construction on stateless components** (Button, action Chip: no `[data-state]`), carried by B's model edge or a Q-5 ruling. Tabs, ToggleGroupItem, Chip and Button were not re-read (capsule not prototyped) |
| E-3 | 10/12 | 10/12 | desk pointer-held and keyboard-focused 360.0 → 381.6 px (×1.060), light and dark, both engines; PRM ×1.000; phone gutter PASS (vacuous: nothing grows on coarse); **phone touch-held ×1.000 FAIL** | RED | desk GREEN; phone RED **by D's design**, carried by D5-E (promotion; Q-3 default (c)) |
| E-4 | FAIL (slider carry 0.00, settle 0.00) | FAIL (same) | the PRM cell passes (nothing moves) | RED | **RED by construction**, carried by B's velocity rule (§5 item 4) |
| E-5 | 12/12 | 12/12 | accordion: touch-changed `[background-color]`, hover-changed `[background-color]`, press-only `[background-color]` (the values differ); PRM light holds. The bits answer through the face fill | RED (accordion leaked hover) | GREEN on the trio |
| E-6 | FAIL (0 idle animations) | FAIL | D adds no idle rung: Q-2's default (b) retires S6. Skeleton's existing breathe (`skeleton-breathe 1.1s`) is a loading signal and not the S6 subject | RED (absent) | RED; a RETIRE needs the owner's words (W-J.2 §3.2 item 5) |
| E-7 | 4/4 | 4/4 | 1 writer, `engage/useGraspEngaged.ts`; slider held 2 nodes (PRM 2); modal open 0 nodes. `veilprobe.log`: the modal veil still paints, opacity 1 in both engines, keyed on its parent's `data-state="open"` | RED (2 writers) | GREEN |
| E-8 | 9/9 | 9/9 | `--commit-t@450ms` reads the panel clock token; the accordion press attack reads `@55ms` (press-drain); minted `[]`; PRM arms 0 ms | GREEN hold line | holds |
| E-9 | 30/30 | 30/30 | under reduce: press-spatial 0.000, press-light present, commit-spatial 0 frames in flight on all trio scenes | RED (accordion press-light) | GREEN on the trio |

**A harness note for R-H:** E-7's static detector reads `.ts` only for `dataset` and `set/toggle/removeAttribute`. A writer that spreads `{ "data-engaged": … }` through `v-bind` would show 0 writers and pass vacuously. The prototype's writer uses `toggleAttribute`, which the detector does count.

## 3 · The mount case (H-8) on D's mechanism

A CSS transition needs a before-change style, and a freshly inserted element has none, so a host inserted already checked or open computes `--commit-t: 1` with no transition. Measured: mount(committed) 0.000 scale range in 8 of 8 cells per engine (switch, checkbox, radio, accordion × light, dark; the `&on=1&defer=1` path). The state-keyed *animation* the D charter first sketched (`PORTFOLIO.md:316`) would have popped on mount. That is why the prototype uses a registered phase rather than keyframes.

The first prototype cut also exposed a nearer case, the touch tap (`tapfilm.log`). Chromium commits a tap at about 18 ms while `:active` holds until about 170 ms, so a 0.96 host press multiplied by the 1.04 swell peaked at 1.004 (E-2 tap FAIL, peak 1.005, trough 0.971, load 66.5). The press and the commit cannot share the host's scale on touch. The second cut moves the bit's press onto the face fill. The register had already derived that a 20 px bit sits below the scale channel's legible floor (`control-bit.css` ENGAGEMENT D8).

## 4 · Q-1 in a form the census can check (REGISTRY §3.3 item 2)

D's own answer is (b): plates answer the pointer field through the REST rung. On the trio's passive atom that answer cannot be checked yet, because E-1's runtime cell is a *press* (`e1-census.mjs:50-55`) and a REST rung's answer is to the pointer field, not to a press. So the prototype declares:

```ts
static: { rung: null, reason: "no plate and no input: a mark, a loading stand-in, a status glyph or an ambient field; nothing is pressed, so nothing is engaged" }
// separator, skeleton, status-dot, badge, label, typewriter, fading-scroll, infinite-scroll, aurora, blob,
// constellation, fourier-field, handmark, progress, scroll-progress-rim
```

E-1 reads this (`class carries a rung` PASS, 15 static members). For the six `plate` members, the census needs a new cell that moves the pointer over the exemplar and requires a paint change (the moving specular, `material.css:255-284`), and a `card` scene for it to run on. That is H-2's row, not something this seat could check. Until the cell exists, (b) is not checkable and the passive atoms stand on default (c).

## 5 · Family D's §6 questions

**1. The substrate map** (`substrate-census.log`, comments stripped, file references only, so a lower bound on composition):

| recipe | directories |
|---|---|
| control-bit | checkbox radio-group switch (3) |
| capsule (`glass-capsule`/`glass-chip`) | button chip configurator dock select slider tabs toggle-group (8) |
| field (`field-control`/`glass-control-edge`) | input labeled-field number-field select textarea toggle-group (6) |
| disclosure | accordion collapsible (2) |
| track-well | progress scroll-progress-rim slider timeline (4) |
| overlay (`_shared/overlay`, surface resolve) | command dialog dock menu popover select sheet surface toast tooltip (10) |
| plate rungs | alert avatar card configurator data-table dock easing metric music-staff select sheet slider sortable-list tabs (14) |
| press recipes beside them | tap-squish 8, useLiquidPress 4, interactive-item 1, grasp 2, specular-track 3 |
| **no shared recipe** | aurora badge blob carousel constellation deck expandable-container fading-scroll fourier-field handmark infinite-scroll label pager-dots separator skeleton status-dot table typewriter (18) |
| **more than one recipe** | 14 directories |

The minimum cover of the interactive directories is ten classes (§1), not "about six". The extra four (field, row, drag, overlay) are surfaces the charter folded into "plate" but whose rungs differ (hover, press, engaged, modal). Directories that paint their own interactive surface and would have to move onto a substrate: carousel, deck, expandable-container, pager-dots, table, data-table rows, timeline and dark-mode-toggle (`useLiquidPress` only), blob (hover paint).

**2. Commit without state.** D gives Button and the action Chip no commit. CSS cannot see a model change that writes no attribute, so they are `pressed`, with the release as their acknowledgement. HEAD's Button reading stands (E-2 FAIL: the release settles on the hover lift, 1.015, `BASELINE.md` §2). That leaves E-2 RED for stateless components under D. It closes either with B's model edge (an attribute written per commit) or with a Q-5 ruling that a stateless control's commit is its release.

**3. Character inside a shared substrate.** Measured in part. One `commit.css` rule serves two substrates, and each substrate tunes it through `--commit-amp` alone: control-bit 0.04 (peak 1.040), disclosure 0.03 (peak 1.030), and no component states a rung. The Chip's flood and the tabs' glide were not prototyped. The tabs' glide is a script body (`useSelectionIndicator`), not a substrate, so it sits outside D's mechanism either way.

**4. Momentum.** D serves none. The surfaces it cannot serve are the slider (0.00 px, both engines, this run), the tabs drag, the Sheet detents, the sortable list and the dock run. The Carousel and the Deck already pass through the platform's scroll-snap (`BASELINE.md` §0.1). **D merges with B for E-4**, and the four local velocity owners (PORTFOLIO §1.3 item 1) become consumers of B's rule (FL-8).

**5. The PF-1 link: yes, and it localizes to one token.** E-2 WebKit, light, pointer and coarse tap (`pf1-bisect.log`):

| build | accordion pointer | accordion tap | ToggleGroupItem pointer | ToggleGroupItem tap | load |
|---|---|---|---|---|---|
| HEAD | ENGINE CLOSED 2/2 | ENGINE CLOSED 2/2 | ENGINE CLOSED 2/2 | ENGINE CLOSED 2/2 | 23.7-35.5 |
| prototype with the accordion hover put back on `--control-surface-bg-hover` | ENGINE CLOSED 2/2 | read (hover guarded off under coarse) | ENGINE CLOSED 2/2 | ENGINE CLOSED 2/2 | 39.7-50.4 |
| prototype (accordion hover on `--fill-hover`) | read, PASS | read, PASS | ENGINE CLOSED 2/2 | ENGINE CLOSED 2/2 | 40.3-45.9 |
| prototype with the token itself re-pointed to `color-mix(in oklab, var(--foreground) 5%, transparent)` | — | — | read (FAIL on the bar, peak 1.015, no crash) | read | 60.0-66.2 |

Painting `--control-surface-bg-hover` on hover closes Playwright WebKit. Its value is `color-mix(in oklab, var(--glass-plate-quiet), var(--glass-plate-resting) 35%)`, and each operand is a `color-mix(in srgb, oklch(from var(--glass-veil-ink) …) …, var(--card))` (`tokens/glass.css:166-167,257`). The suspect is a relative-colour `oklch(from …)` nested two mixes deep and transitioned. That suspicion is a reading of the value, not a further bisect. The crash is PF-1's owner's (`tile/REGISTRY.md:214`). Real Safari: UNMEASURED.

## 6 · Cost on the trio, and MIGRATION rows (REGISTRY §3.3 item 4)

Measured by `git diff --numstat` in the worktree: **15 files, +197 −26**. On the trio and atom alone: control-bit + commit + 3 shells (6 files, ~+60), disclosure (1 file, +41 −4), slider + token + writer + veil split (6 files, ~+40), declaration and barrel (2 files, +63). The declaration is the largest single piece and grows with every substrate.

Unit gates this breaks (worktree `npx vitest run` over 10 affected files: 103 pass, 3 fail, at load 113-120):
- `tests/components/control-bit/binary-triad.test.ts`: "no transition targets a host" and "seats every member on the host" both encode the borrowed `.tap-squish` press. D replaces that ruling; the gate is rewritten, not aliased.
- `tests/styles/focus-veil.test.ts:237`: expects `data-engaged` to equal `"true"`; the one writer stamps presence (`""`). The gate reads presence.

| MIGRATION row (consumer-facing) | consumers today (read-only grep of value.js, keyframes.js, fourier-analysis, chicago, speedtest, slides, atlas, sci-report) |
|---|---|
| Switch, Checkbox and RadioGroupItem no longer compose `.tap-squish`; their press is the face's fill, not a 0.96 squish; their commit swells 1.04 on the panel spring | no consumer reads `control-bit` or relies on the shells' class list (0 hits) |
| The modal's focus veil no longer carries `data-engaged`; it paints on its overlay's `data-state="open"` | 0 authored reads of `data-engaged` or `.glass-focus-veil` (also PORTFOLIO §1.5) |
| The disclosure trigger's hover reads `--fill-hover` and only under `(hover: hover)`; a press paints `--fill-selected`; open and close swell 1.03 | 0 hits for `disclosure-trigger` |
| New: `ENGAGE_DECLARATION`, `useGraspEngaged` (`/motion`), `--scale-engaged`, `--commit-t` | additive |

## 7 · Paint (REGISTRY §3.3 item 5; §2.5's glance read is for seats that did not build this)

`R-D/captures/sheet-{proto,head}-{chromium,webkit}-{light,dark}.png`. Each sheet holds the accordion (rest, hover, pressed, commit-swell at about 70 ms, committed), the passive atoms (rest, pointer over), the slider (rest, held, released, keyboard-focused) and the switch (rest, hover, pressed, commit-swell, committed). The held-slider full viewports are `*-slider-2held-viewport.png`; the single frames are under `frames/`. The prototype is complete in both engines and both themes. **HEAD WebKit is partial**: the accordion hover closed the page (light) and then hung the capture for about 30 min (dark), so HEAD WebKit dark has no slider or passive frames and HEAD WebKit light has no accordion past rest. That hang is PF-1 at HEAD (`capture.log`).

What the author's eye flags for the critic, with no verdict:
- The accordion row swells by 3 % of 320 px, about 9.6 px, on open and close. The O-87 ruling ("flatter, deft") may read that as too much on a full-width row.
- The prototype's accordion hover is a neutral 5 % ink. HEAD's hover is the warm control-surface rung, which `tokens/glass.css:250-253` calls "the no-gray choice". The PF-1 cure costs that warmth unless the warm rung is re-derived without the nested relative colour.
- The switch lost its squish. Its press is now a fill change only, so D-1's weight on press rests on the commit swell alone.
- The slider's 1.06 in-place grow scales the track under a held pointer, so the value under the finger shifts by (x − centre)·(1 − 1/1.06). This is **UNMEASURED**; a promotion (D5-E) would not have it.
- No lighting layer was added (O-87): no shadow, glow or gleam. The swell is geometry and the press is one ink step.

Real Safari: **UNMEASURED (owner's safaridriver checkbox)** for every frame.

## 8 · Open, for the agglomerator

1. E-1's runtime arm needs an exemplar scene per substrate: input, menu, sortable-list and card (H-2). It also needs a pointer-field cell before Q-1 (b) can be checked, and the overlay class's scene should fail instead of throwing.
2. The capsule substrate's PRM light leg (the chip's press under reduce: press-only `[]`, both engines) is D's next piece. Tabs, ToggleGroupItem, Chip and Button must then be re-read on E-2.
3. Candidate harness row: E-2's radio keyboard cell can read a commit that never happened, because the ArrowDown moves focus without selecting (`kbdprobe.log`, HEAD 3 of 4). The witness should assert that the state changed before it grades the bar.
4. `--scale-engaged: 1.06` is the one figure the prototype adds (FL-2).
5. Seams for cross-pollination (REGISTRY §3.4): E-4 and stateless commits point to B; E-3's phone arm points to E; `commit.css`'s registered phase is close to C's `--commit` impulse.

## 9 · Reproduce

```sh
H=docs/tranches/BL/design/engagement/harness; R=docs/tranches/BL/design/engagement/pass-1/R-D; S=<scratch>
git worktree add --detach $S/wt HEAD && ln -s "$PWD/node_modules" $S/wt/node_modules
git -C $S/wt apply "$PWD/docs/tranches/BL/design/engagement/pass-1/R-D.patch"
node $H/build.mjs $S/wt --label proto --out $S/out
node $H/run.mjs --build $S/out/builds/proto --wt $S/wt --out $S/runs/a --verbose --only E-2,E-5,E-8,E-9 --scenes switch,checkbox,radio,accordion,press_switch,press_checkbox,slider
node $H/run.mjs --build $S/out/builds/proto --wt $S/wt --out $S/runs/b --verbose --only E-1,E-3,E-4,E-6,E-7 --scenes slider,s6,modal,switch,accordion,passive
node $H/e1-census.mjs --build $S/out/builds/proto [--engine webkit]
node $R/substrate-census.mjs .
node $R/kbdprobe.mjs $S/out/builds/proto chromium; node $R/veilprobe.mjs $S/out/builds/proto webkit
node $R/capture.mjs $S/out/builds/proto proto $S/cap/proto webkit
git worktree remove --force $S/wt
```
