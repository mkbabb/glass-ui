# D2 · pass 1 · D2-A · critique (the total lattice)

| field | value |
|---|---|
| seat | D2 pass 1, adversarial CRITIC for family D2-A. It did not author the spec, the research or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| tree | Worktree cut at the checkout's HEAD `a302c83a`; `D2-A-proto.patch` applied cleanly (`git apply --check`, then `git apply`). `node_modules` symlinked from the checkout. The checkout has no `tests-visual/node_modules`, so nothing was linked there. The worktree was removed with `git worktree remove --force` before return |
| engines | Chromium 149.0.7827.55 headless; Playwright WebKit 26.5 headless (Playwright's build, not Safari), every dock cell `+shim` (`HARNESS.md` §4). Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** |
| scratch | `K` = `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-A-crit`. Builds `$K/out/builds/{d2a,p-*}`, runs `$K/out/{base,plant-*}`, logs `$K/run-base.log` and `$K/plants/run-*.log`, probes `$K/probes/`, captures `$K/probes/shots/` |
| adapter | the prototype's own `adapter-d2a.mjs`, copied from `…/D2-A-proto/` and read line by line (§3.1) |
| verdict | **BLOCK**, convergence **52 %**. The family's centre (CSS owns every moving length; the script measures nothing) stalls on three problems whose primitives do not exist cross-engine. Six of its parts are sound and should be harvested (§8) |

## 1 · Before reading the family: what a dock design can hide

These were written from `PORTFOLIO.md` §0-2 and `HARNESS.md` alone, before the spec or the prototype was opened. §6 checks each one.

1. **Screenshot-sampled morph frames.** W1 samples 8-28 screenshots per transition. A squash that lives between samples, or an engine whose screenshot changes what it shoots, passes.
2. **The adapter is family-authored.** `plate()`, `posture()`, `compact()` and `rim()` are written by the family. A family can aim the witness at the one box that behaves.
3. **W3 cannot see weight.** Its continuity bound is 1.5·v̂max·D·dt + 0.5 px, and a dead landing passes. So an ease with no spring character, no inertia and no bounce also passes. D-1 is not a witness.
4. **Reversal is not a witness.** No witness retargets mid-flight, so a carrier that restarts at zero velocity passes.
5. **W5 checks where the ink lands, not whether the rim works.** "Paints something, 0 outside" passes a static track with a dead progress fill.
6. **W4's PRM cells jump the scroll.** A scroll-linked spatial change under reduced motion is never sampled in between.
7. **Silent closed-form limits.** A closed form built from tokens and a bounded rung table breaks without a sound on content the table does not cover: a fourth seat, or a cross axis taller than one seat.
8. **The scene never has two docks.** Timeline names, `timeline-scope` and shared scrollers can clobber each other across mounts.
9. **Dual owners.** The canon's "one engine, one clock" (P7) can be broken by a new carrier that lands beside an old one that survives.
10. **Aliases.** A deleted token kept alive under another name.
11. **Consumer-less surface:** new props or attributes that nothing reads.
12. **Rest states that are not rests.** A dock whose posture is a continuous function of scroll offset has no discrete rest, and W1 and W3 read rests only.

## 2 · Reproduction

`node harness/run.mjs --build $K/out/builds/d2a --adapter $K/adapter-d2a.mjs --out $K/out/base` (4 min 25 s):

| witness | Chromium | Playwright WebKit (+shim) | total | prototype's claim |
|---|---|---|---|---|
| W1 | 13/16 | 13/16 | 26/32 | 26/32 |
| W2 | 3/5 | 3/5 | 6/10 | 6/10 |
| W3 | 3/7 | 3/7 | 6/14 | 6/14 |
| W4 | 5/8 | 5/8 | 10/16 | 10/16 |
| W5 | 5/5 | 5/5 | 10/10 | 10/10 |
| **all** | 29/41 | 29/41 | **58/82** | 58/82 |

It reproduces cell for cell. W3 posture morphs: windows 214-218 ms against the 210 ms clock, step ×0.64-0.66, faces 0 px, dead landing. W1 rail and short-sidebar cells: 4.638-4.679 px (Chromium) and 4.643-4.644 px (Playwright WebKit), both from the cut cap.

**The no-cut arm in source.** The prototype measured 32/32 through an `!important` rule that the adapter injects. Here it goes in the stylesheet instead: `.glass-dock, .shape-rounded, .shape-card { --dock-cap-cut: var(--dock-corner) }`, build `p-w1nocut`. W1 reads **32/32**. The claim stands.

## 3 · Can the witnesses fail on this family? (planted violations)

Each plant is CSS appended to `aperture.css` in the worktree, built as its own label, and run through the named witness only. `aperture.css` was restored after every build (`cmp` against a saved copy). Plants live at `$K/plants/*.css`.

| witness | plant | expected | result, Chromium / Playwright WebKit | caught? |
|---|---|---|---|---|
| W1 | `w1mid`: `--dock-corner` bent by 32·t(1−t) px (8 px mid-morph, exact at both rests) | morph cells FAIL | Chromium: 6/6 morph cells FAIL, 2.99-3.22 px. **WebKit: 6/6 morph cells PASS**, "1 distinct extent sampled" | Chromium yes; **WebKit no** |
| W2 | `w2`: `--dock-paint-reach: 1px`, and the inactive run `overflow-x: auto` | route 1 cut, route 2 container | route 1 h/v cut 4.25/4.25 px in both; route 2 73/73 (36/36) container frames. W2 0/10 | yes |
| W3 | `w3face`: row clip removed | faces FAIL | faces out 329-352 px on all 6 posture cells, both engines. W3 0/14 | yes |
| W3 | `w3lin`: dock spring replaced by `linear` | D-1 would fail | **PASS 6/6**: step ×0.38, dead landing | **no: W3 cannot see weight** |
| W3 | `w3ease`: dock spring replaced by `ease-in-out` | D-1 would fail | **PASS 6/6**: step ×0.64-0.65 | **no** |
| W4 | `w4`: hover no longer zeroes the gate | engagement FAIL | hover reads 56 px instead of 206.13 / 206.16. W4 8/16 | yes |
| W4 | `w4` PRM half: `transition-duration: 0.21s !important` (unlayered) | PRM FAIL | still 0 s computed, so **the plant was invalid**: a global `* { transition-duration: 0s !important }` in `@layer components` (`src/styles/utilities/a11y-overrides.css:46-53`) wins | — |
| W4 | `w4prm`: the same, inside `@layer components` at higher specificity (computed 0.21 s, `$K/probes/prm.mjs`) | PRM FAIL | posture: **24 / 12 intermediate frames, FAIL**. `prm·compact` **still PASS**, 0 frames | posture yes; **compact no** |
| W5 | `w5out`: plate `overflow: visible`, rim inset −6/−5 px | outside FAIL | 696-1944 device px outside, 17.68 / 16.97 px deep. W5 0/10 | yes |
| W5 | `w5dead`: rim `animation: none` (the fill never moves) | a dead rim should fail | **PASS 10/10**, ink 1337/1338 and 185/186, identical to the live build | **no: masked by the track** |

Each witness catches a plant in both engines, except the W1 morph frames in Playwright WebKit. Four claimed-green cells cannot fail on this family:
- **W1 WebKit morph frames (6 cells).** They are vacuous, as the prototype's §4 said: Playwright WebKit's `page.screenshot()` completes a registered-property transition. The plant shows the cost. An 8 px mid-morph corner defect passes all six.
- **W3 posture cells (6 cells) on D-1.** A linear ramp and an ease-in-out both pass. The witness gates continuity, not weight.
- **W4 `prm·compact` (2 cells).** The witness jumps scroll 0 → 900 in one step. Stepped in 25 px increments under reduced motion, the plate scrubs 206.2 → 187.4 → 168.6 → 149.8 → 131 → 112.4 → 93.6 → 74.8 → 56 px, identically in both engines (`$K/probes/prmscroll.mjs`). Whether a scroll-scrubbed spatial change is allowed under PRM is a canon question (P6), and nobody has ruled on it. The cell cannot tell either way.
- **W5 (10 cells) on liveness.** The track added by the prototype's "Addition" row paints at every progress, so the fill could be dead and W5 would read the same ink.

## 4 · Counterexamples measured here

| # | counterexample | evidence | law |
|---|---|---|---|
| X-1 | **Two docks on one scroller: unmounting one compacts the other.** `useDockScrollTimeline` snapshots each inline list at bind time and restores the snapshot on dispose. Dock A binds, dock B binds (its snapshot includes A), A unmounts. `:root` `timeline-scope` and the scroller's `scroll-timeline-name` both go to `""`, so B's name is gone. B's ramp then reads `--c = 1` (fully compact) at scroll 0 and at 100, in **both** engines, while B's `bound` still reads `true`. S-8 asked for a refcount, and none was built | `$K/probes/binder.mjs` runs the worktree's own `useDockScrollTimeline.ts` (transpiled verbatim) under Vue's global build: `{"both":{"scopeRoot":"--dock-page-a, --dock-page-b",…,"b":"0"},"afterA":{"scopeRoot":"","scNames":"","b":"1","bBound":true}}` in Chromium and in Playwright WebKit | E-2: the primary dies silently and the dock paints the wrong rung |
| X-2 | **A fourth persistent seat cuts the summary without a sound.** The `:has()` rung table stops at 3. With 4 seats in `#persistent`, `--dock-n-ps` reads 3, the collapsed plate stays 194 px, and the summary "Play" paints **1.89 px** of its 40 (at 3 seats it paints 40). No dev warning | `$K/probes/rung.mjs` (Chromium; Playwright WebKit identical at the seat level) | E-2; P-3 (the table is a second fact about seat count) |
| X-3 | **Reversal hits a wall.** The collapse runs at −1.33 px/ms, holds one frame at 157.47 px, then moves at +1.02 px/ms. Playwright WebKit: −1.58 → +1.34 px/ms. There is no deceleration through zero | `$K/probes/reversal.mjs`, `rev-{chromium,webkit}.json` | D-1 |
| X-4 | **The landing snaps.** The last frame of the expand steps 472.69 → 481.66 px (+8.97 px in 8.1 ms, after 0.39 px/ms) in Chromium, and 472.16 → 481.72 px (+9.56 px) in Playwright WebKit. That is `--spring-dock`'s truncated `linear()` tail (S-15), which W3's step bound absorbs | same probe | D-1; W3 blind spot (§3) |
| X-5 | **No discrete compact rest.** Compaction is a pure function of offset. At scroll 100 the dock rests half-compact with a seat sliced by the cap ("Lots", `shots/compact-mid.png`), and it stays there as long as the reader does | `$K/probes/shots/compact-mid.png`; the stepped widths in §3 | D-2 (a rest that reads as a clip, not a posture); C-4 |
| X-6 | **The expand is a curtain, not a morph.** Mid-expand, "Play" and "Square" are sliced at the cap, "P" double-exposes over "1" for three frames, and the hover highlight hops 2 → 3 → Play as the row glides under a pointer that is not moving | `$K/probes/shots/film.png` (Chromium, 8 frames + rest) | D-1, D-2 |
| X-7 | **The scalar carries two meanings.** `--dock-expand-t: var(--dock-extent-t)` (`aperture.css:84`) keeps the old name alive as an alias. `morph.css:84` then redefines it as `calc(1 − var(--dock-extent-t))` under `[data-morphing] .dock-layer--summary`. One token name, two opposite meanings | source | E-1, P-3 |
| X-8 | **Two PRM sources of record.** The dock's own PRM block (`aperture.css:335-341`) is dead code: the global `*` rule in `@layer components` already zeroes it (§3, the invalid plant) | source + `$K/probes/prm.mjs` | P-3 |
| X-9 | **PRM cannot keep the fade.** The face opacities read the same scalar as the extent (`layers.css:102,105`: `opacity: var(--dock-extent-t)` / `calc(1 − …)`), so the spatial leg and the fade share one clock. Under PRM both snap. Canon P6 asks to drop the transform and keep the fade | source | canon P6 |
| X-10 | **Two motion engines remain.** Posture and compaction ride a CSS transition. `DockCrossfade` still rides `useDockSpring` writing `--dock-t` (`crossfade.css:72-76`), and HEAD's DockLayerGroup swap stays one frame (244.98 px) | source; W3 swap cells | canon P7 |
| X-11 | **A new ungated hover paint.** The patch adds `.glass-dock.collapsed:hover > .dock-plate { box-shadow: … }` (`aperture.css:166-168`) outside `@media (hover: hover)`. Floor row 3 says every paint-bearing `:hover` rung sits under it | source | floor row 3 (F-77) |
| X-12 | **The morph animates a layout box.** The prototype's deviation moves δ from the plate's `clip-path` (paint) to its `left`/`right` (layout), on top of the row's per-frame `translate` + `clip-path` restyle. S-17 already shows any clip animation runs on the main thread | source; `SPECS.md` A.3 cost (75-77 recalcs per expand) | canon P5 |
| X-13 | **Consumer-less surface.** `data-rim` has no reader anywhere in `src/` (grep). Rim presence is the `<span class="dock-rim">` itself | grep | P-1 |
| X-14 | **Stale records in comments.** Dozens of comments still describe the deleted `--dock-morph-t`, `dockMorphMeasure` and `--dock-expanded-px` (e.g. `layers.css:7-8,85-88`, `crossfade.css:13`, `dock.css:40`, `useDockSearch.ts:4,17-19,136`) | grep | E-1 hygiene |

## 5 · The prototype's claims, checked

| claim | status |
|---|---|
| 58/82, 64/82 with the cut dropped | **Holds** (§2), including the no-cut arm in source |
| W1 green on every morph frame | **Holds in Chromium** (the plant is caught). **Vacuous in Playwright WebKit** (the plant passes) |
| W3 green on the posture morph | **Holds** for continuity, faces, window and owners. It **says nothing about weight or bounce** (§3), and the real curve reverses into a wall and snaps its last 9 px (X-3, X-4) |
| W4 green on PRM | Posture: **holds** (a valid plant is caught). Compaction: **untested** (§3) |
| W5 green | **Holds for containment** (plant caught). **Does not show the rim works**: a dead fill passes 10/10 |
| "The binder … refcounts a scroller that two docks share" (S-8, spec) | **Not built.** The prototype's code snapshot-restores, and X-1 is the result |
| "A getter that resolves null logs console.error and leaves the dock full" | Holds for `null`. It **does not** hold for a binding that dies after bind (X-1): no log, and the dock goes full-compact |
| The deviation to plate insets "keeps the border, shadow and rim on the plate" | Holds visually (`crop-smoke-chromium-morph-mid.png`). Its cost is a layout-box animation (X-12) |

## 6 · The checklist

| item | answer, with evidence |
|---|---|
| **Vacuous convergence** | Present. 6 W1 WebKit morph cells pass on one sampled extent, and an 8 px planted defect passes them. W5's 10 cells pass with a dead fill. `prm·compact` passes on one scroll jump. So 18 of the 58 green cells prove less than they claim |
| **Spec-cites-itself circularity** | Partial. The adapter is the family's own. Its `extent()` reads the painted plate (independent, cross-checked against pixels at Δ ≤ 0.49 px). But `posture()` "compact" is the family's own `--dock-c-scroll × --dock-c-gate ≥ 0.5`, and the no-bounce cell's threshold is therefore the family's number, not the witness's. The 64/82 total was measured through an adapter-injected `!important`; §2 re-measured it in source |
| **Gates that cannot fail** | W3 on D-1 (§3: linear and ease-in-out pass), W1 WebKit morph frames, W5 on liveness, `prm·compact`. The prototype's unit gate "`useDockMorph.ts` contains no ResizeObserver…" is a source grep. It passes for any file that measures nothing, including one that does nothing |
| **Elegant-reduction trap** | Yes, three times. (1) "The expanded end is the in-flow box" reduces the morph to one scalar, then content changes and swaps (C-2, C-3) are "no mechanism": the in-flow box changes before any scalar can move. That is the hard half of P3. (2) "The cross is a token" gives the corner in closed form, then the nested switcher dock collapses to 56×108 and is not a stadium expanded (prototype §5). (3) "Compaction is scroll × gate" gives P4 in CSS, then hysteresis is impossible (C-4, S-21: progress is a function of offset) and there is no discrete rest (X-5) |
| **Legacy aliases, shims, dual paths** | `--dock-expand-t` aliased and inverted (X-7). Two PRM paths (X-8). Two motion engines (X-10). `data-held` and `data-kept-open` are two hold attributes that both zero the gate |
| **Masked fallbacks** | The rim track masks a dead fill (§3, W5). The binder's `bound` flag stays true after the binding dies (X-1). The rung table saturates at 3 without a warning (X-2) |
| **Unverified gestalt** | Checked against the prototype's captures and mine (`shots/film.png`, `shots/compact-mid.png`, `…/D2-A-proto/crop-smoke-chromium-morph-mid.png`, `cmp-nested.png`, `cmp-vertical-1440-dark.png`). The stadium is clean at every frame in Chromium, and the border and shadow follow the aperture: a real gain over HEAD's lens and squash. It does **not** read as one liquid dock, iOS-27 grade: the expand is a clip drawn back over a static row, with content sliced at the cap and a double-exposed glyph. It lands dead with a 9 px snap, reverses into a wall, and rests half-open under scroll. There is no bounce anywhere (ζ 0.88 and a truncated tail). Weight and bounce (D-1) are absent, and engagement (D-2) is confused by the hover highlight hopping under a still pointer |
| **Consumer-less substrate** | `data-rim` (X-13). `anchor` has one consumer (fourier M-6), and the demo's vertical "Starts compact" needs it but does not pass it (prototype §5). `DockControl pitches` (spec A.2) is correctly not built |

## 7 · Structural limits (why BLOCK, not BANK)

The spec states these itself. The critique finds no way round them inside the family's centre:

1. **C-1, a fitting run is a scroll container.** CSS cannot compare Σk against the budget: container-query values take no `var()`, and `scroll-state()` is Chrome-only (S-22). W2 routes 3-4 stay red, 4 cells.
2. **C-2 and C-3, content change and layer swap.** They need an interpolable intrinsic size. The platform primitive is `interpolate-size` / `calc-size()`, which is Chromium-only. Without it the family must either measure (leaving its centre) or quantize every label seat to the pitch lattice (Q3: up to +47 px per trigger). 8 W3 cells.
3. **C-4 and C-13, position hysteresis and velocity across a retarget.** Scroll progress is a function of offset (S-21); `timeline-trigger` is Chrome-only (S-22); every CSS carrier reverses into a wall (S-16, X-3). 2 W4 cells, plus D-1, which no witness gates.

The missing primitives, cross-engine interpolation to intrinsic size and velocity-carrying CSS transitions, are as hard as the problems themselves. The family is also dominated: `SPECS.md`'s totals table records D2-B at 82/82 from its own report. BANK would need the family to be sound, and X-1, X-2 and X-7 say it is not yet.

## 8 · What to harvest (sound, family-independent)

- **The concentric corner:** `--dock-cross` = seat + 2·pad, `--dock-corner` = cross/2, `--dock-cap-rest` deleted. The no-cut arm reaches W1 32/32 in source (§2).
- **The backdrop-root rule:** no clip on an ancestor of the plate (Q-BR, Chromium evidence).
- **The rim as a child of the plate**, clipped by the plate's own radius: 0 px outside, and the `w5out` plant is caught. It should keep the fill, drop the always-on track (or gate W5 on the fill moving), and read the same scroll source as the posture machine.
- **The paint-gutter arithmetic:** padding plus an equal negative margin, reach = (s − 1)·seat/2 + s·ring. The `w2` plant shows the witness depends on it. It is valid only where the run is a genuine scroller.
- **Inactive faces as `overflow: clip`:** route 2 goes to 0 container frames.
- **The binder's shape:** getter or element, never a selector, and fail-loud on `null`. It needs a refcount per scroller and per `:root` scope entry (X-1 is the regression test).

## 9 · Open gaps (convergence 52 %)

The percentage is the share of the gaps below that are closed. It is 100 only with zero open gaps. Of 25 rows audited in §3-§6, 13 are sound as built and 12 are open.

1. C-1: a fitting active run is a scroll container (W2 routes 3-4).
2. C-2: a content change is 179.33 px in one frame (W3).
3. C-3: a layer swap is 244.98 px in one frame (W3).
4. C-4 / X-5: no position hysteresis, 24 flips in 24 moves, and no discrete compact rest.
5. X-3 / C-13: reversal into a wall (D-1).
6. X-4: a 9 px last-frame snap from the truncated `linear()` tail (D-1).
7. X-1: two docks sharing a scroller; unmounting one compacts the other in both engines; `bound` stays true.
8. X-2: the three-rung `:has()` table saturates silently (4 persistent seats → summary 1.89 px).
9. X-7 / X-8 / X-10: the `--dock-expand-t` alias and its inversion, a dead second PRM path, a second motion engine (P7).
10. X-9: PRM cannot keep the fade (shared scalar).
11. X-11 and floor row 3: the coarse hover latch and tap-pins are unbuilt, plus a new ungated `:hover` paint.
12. The cut cap (C-5): an owner ruling. Also the nested switcher (a cross axis taller than a seat) has no design.

Outside the percentage: witness hardening, which belongs to the harness, not the family. W3 needs a weight/bounce and reversal cell. W5 needs a fill-moves cell. W1 needs a screencast sampler for Playwright WebKit. `prm·compact` needs a stepped scroll and a P6 ruling on scroll-scrubbed motion. Every real-Safari cell remains **UNMEASURED (owner's safaridriver checkbox)**.

## 10 · Commands

All under `$K`. `H` = `docs/tranches/BL/design/dock/harness`.

| what | command | output |
|---|---|---|
| worktree | `git worktree add $K/wt HEAD`; `git apply D2-A-proto.patch`; `ln -s …/node_modules` | clean apply |
| build | `node $H/build.mjs $K/wt --out $K/out --label d2a` | scene 945 ms, demo 2998 ms |
| witnesses | `node $H/run.mjs --build $K/out/builds/d2a --adapter $K/adapter-d2a.mjs --out $K/out/base` | `run-base.log`: 26/6/6/10/10 |
| plants | `plants/build-plant.sh <name>` (append, build `p-<name>`, restore), then `plants/runall.sh`; `w4prm` separately | `plants/run-*.log`, `plants/progress.log` |
| probes | `probes/binder.mjs <engine> <wt>`, `probes/rung.mjs <build> <adapter> <engine> <n>`, `probes/reversal.mjs <build> <adapter> <engine>`, `probes/prm.mjs`, `probes/prmscroll.mjs`, `probes/film.mjs` | §3, §4 |

Fence note: after the runs, `node_modules/.vite` (12:37:45) and an empty `node_modules/.vite-temp` (12:42:03) in the checkout carry mtimes during this seat's window. They match none of this seat's build times, this seat ran no vitest, and concurrent seats were live. They are not attributed here and were left untouched.
