# D2 · pass 1 · D2-A · the total lattice (closed-form CSS)

| | |
|---|---|
| seat | pass-1 research, family D2-A only |
| model | `claude-opus-5-5` (asserted) |
| tree | HEAD named `5804d8cc`. The probe worktree was cut at `f57a3c1f`; the checkout reads `5b536c72` at write time. `git diff --stat 5804d8cc f57a3c1f -- src` and `git diff --stat f57a3c1f 5b536c72 -- src` both print nothing, so `src/` is identical across all three |
| engines | Chromium 149.0.7827.55 headless; Playwright WebKit 26.5 headless. Real Safari: UNMEASURED (owner's safaridriver checkbox), every cell |
| scratch | `R` = `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-A-research/r2`. Probe worktree `…/D2-A-research/wt` (removed before return; its diff is saved at `$R/proto/d2a-tracked.diff`, its two new files at `$R/proto/new/`) |
| harness | `docs/tranches/BL/design/dock/harness/` (read and run, not edited). HEAD adapter `adapter-head.mjs`; probe adapter `$R/proto/adapter-d2a.mjs` |

Every number below comes from a command in §8. WebKit numbers are Playwright WebKit.

## 0 · Findings in one table

| # | finding | evidence |
|---|---|---|
| 1 | The probe turns **58 of 82** witness cells green against HEAD's **13** (W1 26/32, W2 6/10, W3 6/14, W4 10/16, W5 10/10). With the cut cap retargeted to the rest cap (one token line), W1 reads 32/32 and the total is **64/82** | §3.2 |
| 2 | The posture morph passes W3 in both engines, including the first expand: travel 385.73 px, largest step ×0.65–0.66 of bound, 0 px faces out, dead landing, window **207–223 ms** against the 210 ms clock. HEAD: a 387.66 px one-frame first expand, windows 544–561 ms, faces out 147–158 px, a 0.28–0.34 px ring | §3.2 W3 |
| 3 | The aperture must not be a wrapper. A `clip-path` on an **ancestor** of the plate is the plate's backdrop root: Chromium blurs nothing (stripe contrast 250 vs 0). The plate's **own** `clip-path` keeps the blur (0). So the one closed form is stamped on three boxes: the plate's clip, the controls row's clip and glide, and the elevation layer's insets | Q-BR |
| 4 | Only the collapsed extent needs a closed form. The expanded end is the in-flow box (`50%` of it), so posture morphs need no seat lattice at all. `pitches` is needed only where a closed form must name a face's width (a layer swap). The charter's "every label seat in a morphing face declares k" shrinks to value.js's two swap-face triggers, and only if the swap goes closed-form | Q3, §2 |
| 5 | Q1: the charter's arm ranges reach both ends of a 24 px sub-pitch overflow (corner 28 → 16 at each end) in Chromium and Playwright WebKit; HEAD's ranges stop at 22 px. That success is also W1's counterexample: the cut cap is not a stadium, and W1 fails 6 cells at ~6.0 px | Q1, C-5 |
| 6 | Q2: Playwright WebKit counts a flex scroller's inline-end padding exactly as Chromium does (208/208, and 214/214 with a 7 px gutter under ring + shadow + first-seat scale + snap) | Q2 |
| 7 | Q4: `sibling-count()` cannot replace the `:has()` count rungs. It reports an element's own sibling count; an ancestor cannot read it (inheritance flows down). The `:has()` rung on the ancestor works in both engines | Q4 |
| 8 | Q5: a named timeline on an inner scroller resolves only with `timeline-scope` on `:root` (0.5/0 in both engines). Without scope, and for unbound names, the engines split: Chromium paints the **end** keyframe (1), WebKit paints nothing (−1). Two docks may share one name; two binders writing one property clobber each other | Q5 |
| 9 | A failed binding compacts the dock. With `var(--dock-page, none)` and the binding removed, both engines paint `--dock-c` = 1 at scroll 0 (extent 206.13 → 56.03) | C-7 |
| 10 | Q6: the gate composes with the ramp in both engines (values identical to 3 decimals). It is not free: in Chromium the ramp costs a style recalc per scroll step (30 per 30 steps, ~2.6 ms) and 60 paints; an opacity control costs ~1.1 ms and 0 paints. WebKit per-frame cost is UNMEASURED | Q6 |
| 11 | Q7: dock seats reach 6.25 px on the cross axis (hover + focus), 8.25 (Chromium) / 8.75 (WebKit) on the inline axis (tab). A consumer glass `Button` reaches 10.75 / 11.25 px. The cross gutter (6.4 px) fits inside the 8 px block padding; the consumer button does not | Q7 |
| 12 | The aperture symmetric about the box centre fails K-11: a right-anchored collapsed dock paints **83 px** from its anchor edge (HEAD 0). A trailing `#persistent-end` seat is counted in the collapsed extent but painted outside it (HEAD inside) | C-10, C-11 |
| 13 | Still one frame: a content-width change on a live dock (179.33 px) and a layer swap (244.98 px). The main-axis gutter spills 3.19 px past the plate | C-2, C-3 |
| 14 | Compaction mapped to position has no memory: 24 posture flips in 24 moves of ±4 px around the midpoint | C-4 |
| 15 | A mid-flight reversal does not carry velocity: 1 held frame, then a restart (Chromium +2.5 → −0.6..−0.9 px/ms); a mid-engage release parks the gate for the 150 ms delay (0.505 / 0.514) | C-13, C-18 |

## 1 · The seven questions

### Q1 · `animation-range: 0 min(var(--dock-pitch), 50%)` on a named, scoped timeline

**Answer.** Resolves and paints in Chromium 149 and Playwright WebKit 26.5, identically. A 24 px sub-pitch overflow reaches both ends: the inline-start corner runs 28 → 16 px over the first 12 px of scroll and the inline-end corner 16 → 28 px over the last 12. HEAD's ranges on the same scroller stop mid-way (22 px at each end, never cut). `CSS.supports` for the `min()` start, the `max()` end and `timeline-scope` is true in both. Real Safari 26.4: UNMEASURED (owner's safaridriver checkbox).

Command: `node $R/probes/run.mjs q1` (page `pages/q1.html`, pixel read `q1.mjs`); rows = scroll offset / range : inline-start radius, inline-end radius (painted r = round, c = cut). Output, both engines byte-identical:

```
A  (charter) 0/24:28,16(rc) 6/24:22,16(rc) 12/24:16,16(cc) 18/24:16,22(cr) 24/24:16,28(cr)
H  (HEAD)    0/24:28,22(rr) 6/24:26.5,23.5(rr) 12/24:25,25(rr) 18/24:23.5,26.5(rr) 24/24:22,28(rr)
AL (charter, 224 px range) 0:28,16  24:22,16  48:16,16 … 160:16,16
V  (charter, vertical, block-start pair) 0:28,28  6:22,22  12:16,16 … 24:16,16
VH (HEAD, vertical) 0:28,28 … 24:22,22
```

### Q2 · Does WebKit count a flex scroller's inline-end padding?

**Answer.** Yes, as Chromium does. The gutter (padding plus an equal negative margin) absorbs a `scale: 1.1` edge seat with range 0 and an inactive timeline, on both axes. A translated seat (no gutter) still makes range.

Command: `node $R/probes/run.mjs q2`. `scroll` = scrollWidth/clientWidth; identical in both engines:

| case | scroll | range | timeline active |
|---|---|---|---|
| no gutter, last seat `scale 1.1` | 202/200 | 2 | true |
| 4 px inline padding, `scale 1.1` | 208/208 | 0 | false |
| 4 px, `scale 1.2` | 208/208 | 0 | false |
| 7 px gutter, ring + shadow + `scale 1.1` | 214/214 | 0 | false |
| 7 px gutter, first seat scaled | 214/214 | 0 | false |
| 7 px gutter + snap | 214/214 | 0 | false |
| no gutter, `translate 4px` | 204/200 | 4 | true |
| column, no gutter / 7 px gutter | 202/200 / 214/214 | 2 / 0 | true / false |

### Q3 · Consumer label seats in morphing faces

**Census correction.** A grep of the four trees finds **12** label-seat sites in 9 files, not 13: value.js `DockViewSelect.vue:66`, `menus/MobileMenuDropdown.vue:40`; keyframes `MbabbMenu.vue:15`, `ChromeDock.vue:405`, `TransportDock.vue:91`; fourier `AnimationControls.vue:195`, `gallery/UserSlugBar.vue:170,193`, `AppDock.vue:76,122`; chicago `TempApp.vue:297` (a `v-for` of three tabs), `:310`.

**In a morphing face:** value.js ×2 (faces of a `DockLayerGroup` swap), keyframes ×3 (ChromeDock `collapse="closed"`, TransportDock `collapse="open"`), fourier ×1 (AnimationControls). AppDock and chicago are `:collapse="false"`.

**Which need `pitches`.** Under the charter, all six. Under the strongest form (§2, S-3), none of them for posture morphs, because the aperture's expanded end is the in-flow box. Only value.js's two need `pitches`, and only if the layer swap is given a closed form (C-3).

**Paint change if declared.** Command: `node $R/x/q37.mjs` on `$R/x/seats-head/dist` (glass-ui's own font, P = 48, seat 40, run gap 8). Width → k and added padding (k·P − gap − width):

| label | tab px → k (+px) | trigger px → k (+px) |
|---|---|---|
| Home | 70 → 2 (+18) | 84 → 2 (+4) |
| Palettes | 86 → 2 (+2) | 103 → 3 (+33) |
| Browse | 81 → 2 (+7) | 97 → 3 (+39) |
| Extract | 78 → 2 (+10) | 93 → 3 (+43) |
| Atmosphere | 117 → 3 (+19) | 137 → 4 (+47) |
| Audit Log | 97 → 3 (+39) | 115 → 3 (+21) |
| Cube / Amiga / Square | 65 / 73 / 80 → 2 | 79 → 2 (+9) / 87 → 2 (+1) / 95 → 3 (+41) |
| Easing / Spring / Sequence | 77 / 74 / 102 | 92 → 3 (+44) / 88 → 2 (+0) / 120 → 3 (+16) |
| @mbabb | 94 → 3 (+42) | 112 → 3 (+24) |
| icon-only dropdown trigger | — | 32 → 1 (+8) |

A quantized trigger grows by up to 47 px (Atmosphere). Consumer glyphs (24/20 px icons inside triggers) are not in these widths.

### Q4 · `sibling-count()` versus `:has()` count rungs

**Answer.** `sibling-count()` does not replace the rungs. Both engines support it, and both give the same result. A container with 4 siblings of its own and 2 children reads `sibling-count()` = 4 on itself and 2 on each child. An ancestor cannot read a child's custom property, since inheritance flows down. A `:has(> :nth-child(2))` rung on the ancestor gives 2, and the aperture width computed from it reads 144 px. `sibling-index()` counts separators as seats (1, 2, 3).

Command: `node $R/probes/run.mjs q4` → `{"containerOwnCount":"4","childSeesCount":["2","2"],"ancestorSeesChildProp":"(unset: inheritance flows down only)","hasRungOnAncestor":"2","apertureE":"144px","sepIndex":["1","2","3"]}` in both.

So the rung table is a finite second fact (P-3 risk 2 stands). The probe bounds it at 3 per persistent region.

### Q5 · A named scroll timeline with `timeline-scope` on `:root`

Command: `node $R/probes/run.mjs q5`. `--c` is a registered number, initial −1, keyframed 0 → 1 over 0–200 px; values at scroll 100 / 0:

| case | Chromium | Playwright WebKit |
|---|---|---|
| root, named on `html`, with or without scope | 0.5 / 0 | 0.5 / 0 |
| root, anonymous `scroll(root block)` | 0.5 / 0 | 0.5 / 0 |
| inner scroller, no scope | **1 / 1** | **−1 / −1** |
| inner scroller, `timeline-scope` on `:root` | 0.5 / 0 | 0.5 / 0 |
| inner, bound late (value before binding) | 1 → 0.5 / 0 | −1 → 0.5 / 0 |
| two docks, one shared name | 0.5, 0.5 | 0.5, 0.5 |
| two binders `setProperty` one scroller's `scroll-timeline` | −1, 0.5 | −1, 0.5 |
| two names as a list on one scroller | 0.5, 0.5 | 0.5, 0.5 |
| two binders overwrite `:root` `timeline-scope` | 1, 0.5 | −1, 0.5 |
| duplicate name on two scrollers | 0 | 0 |
| unbound name | 1 | −1 |
| scroller with no overflow | −1 | −1 |
| fresh element, `animation-timeline: none` | 1 (0 animations listed) | −1 |
| fresh element, `var(--unset, none)` | 1 | −1 |

**Answer.** Both scroller kinds resolve on both engines when the name is scoped on `:root`. Two docks sharing one scroller must share one name, and the binder must refcount it. A binder that writes the property replaces what another wrote. Every unresolved case splits the engines: Chromium paints the end keyframe, WebKit paints nothing. On the live dock the split closes the wrong way (C-7): with the binding removed, both engines paint the end keyframe.

### Q6 · The asymmetric-delay gate over the scroll-driven ramp

Command: `node $R/probes/run.mjs q6` (page `pages/q6.html`, variant A: `--dock-c = scroll × gate`, gate transition 210 ms linear with a 150 ms delay that engagement zeroes). `[ms, gate, c]` samples:

| | Chromium | Playwright WebKit |
|---|---|---|
| ramp alone, top / mid / past | c 0 / 0.5 / 1 | 0 / 0.5 / 1 |
| engage (past the ramp) | 1 → 0.692 (63) → 0.417 (121) → 0.133 (181) → 0 (243) | 1 → 0.71 → 0.414 → 0.119 → 0 (246) |
| release | 0 until 129, 0.17 (184), 0.452 (244), 0.872 (332), 1 (420) | 0 until 130, 0.152 (181), 0.443, 0.881, 1 (426) |
| engage, release at 100 ms | 0.682 (65), **0.505 held 126–246**, 0.884 (332), 1 | 0.714, **0.514 held 121–245**, 0.914, 1 |

**Composes:** yes, in both. **Main-thread cost:** `node $R/probes/q6trace.mjs` (Chromium, 30 wheel steps of 10 px, 3 reps, CrRendererMain events):

| variant | UpdateLayoutTree | style ms | Layout | Paint |
|---|---|---|---|---|
| no animation | 0 | 0 | 0 | 0 |
| B · opacity on the timeline | 30 | 0.93–1.22 | 0 | 0 |
| C · `clip-path` keyframed on the timeline | 30 | 0.85–1.25 | 0 | 60 |
| A · the charter (registered ramp × gate → `clip-path`) | 30 | 2.55–2.64 | 0 | 60 |

So in Chromium the charter's compaction costs one style recalc and two paints per scroll step on the main thread. **WebKit per-frame cost: UNMEASURED.** `node $R/probes/q6block.mjs` blocks the page 2.5 s and wheels 300 px; Playwright's `mouse.wheel` does not return within 1.5 s in either engine (`"err":"wheel >1.5s"`), so compositor progress under a blocked main thread cannot be observed from this seat. Real Safari: UNMEASURED.

### Q7 · Paint reach of every seat state, and the gutter

Command: `node $R/x/q37.mjs` on `$R/x/seats-head/dist` (HEAD seats, clips lifted, DSF 2). Reach past the seat box, cross / inline, px:

| seat | hover | focus | hover + focus | press |
|---|---|---|---|---|
| icon (Chromium) | 1.75 / 1.75 | 3.75 / 3.75 | 6.25 / 6.25 | 2.25 / 3.75 |
| icon (WebKit) | 1.75 / 2.75 | 3.75 / 4.75 | 6.25 / 7.25 | 2.25 / 4.25 |
| tab (Chromium / WebKit) | 1.75 / 3.75 · 1.75 / 4.25 | 3.75 / 3.75 · 3.75 / 4.25 | **6.25 / 8.25 · 6.25 / 8.75** | 3.25 / 2.25 · 2.75 / 2.75 |
| select trigger | 0 / 0 | 3.75 / 3.75 (WebKit 4.75 / 3.75) | same as focus | 0 |
| icon dropdown trigger | 0 | 3.75 / 3.75 | 3.75 / 3.75 | 0 |
| consumer glass `Button` (X-13) | **10.75 / 2.25** (WebKit 11.25) | 8.25 / 3.75 | 10.75 / 5.75 | 6.25 / 4.75 |

Active variants read the same as their inactive seats. **The gutter.** `--dock-paint-reach` = (1.1 − 1)·40/2 + (2 + 2)·1.1 = **6.4 px** (cross); with the 136 px open seat, **11.2 px** (main). The cross gutter covers every glass-ui seat (6.25) and fits inside the 8 px block padding. The main gutter covers the tab (8.75) but is wider than the 8 px pad, so the run's box ends 3.2 px outside the plate (C-3, measured 3.19). The consumer button's 10.75–11.25 px exceeds both the gutter and the pad (C-15).

### Q-BR · the backdrop root (asked by the charter's `.dock-aperture` wrapper)

Command: `node $R/probes/qbr.mjs`. Stripe contrast behind a `backdrop-filter: blur()` plate (255 = unblurred, 0 = blurred):

| case | Chromium | Playwright WebKit |
|---|---|---|
| no ancestor clip | 0 | 250 |
| `clip-path` on an ancestor | **250** | 250 |
| `clip-path` on the plate itself | 0 | 250 |
| `overflow: clip` on an ancestor | 0 | 250 |

Chromium: an ancestor `clip-path` kills the blur. Headless Playwright WebKit renders no backdrop blur at all, so the WebKit column says nothing about the question. Real Safari: UNMEASURED.

## 2 · The strongest form

What the probe taught, as decisions. S-1 to S-5 and S-9 to S-10 are probed. S-6 to S-8 are derived and not probed.

- **S-1 · One scalar, owned by CSS.** `--dock-extent-t` is a registered number, transitioned on `var(--spring-dock-duration) var(--spring-dock)`. The script's only write is the posture class. `[data-morphing]` runs from the flip to that property's `transitionend`. The script measures nothing and writes no scalar.
- **S-2 · One closed form, three boxes.** `a = clamp(0, min(t, 1 − c), 1)`; the aperture inset δ = (1 − a)(50% − E_c/2). It is stamped on the plate's own `clip-path`, on the controls row (a glide `translate` of (1 − a)(50% + pad − E_c/2) of the row's own box, plus a clip in that box), and on the elevation layer's `inset`. There is no wrapper, because a wrapper would be the backdrop root (Q-BR).
- **S-3 · Only the collapsed extent is closed-form.** E_c = max(cross, n_c·seat + (n_c − 1)·layer-gap + 2·pad), with n_c from `:has()` rungs (Q4). The expanded end is the in-flow box, so posture morphs need no Σk. The lattice survives only where a face's width must be named without layout: the layer swap.
- **S-4 · Concentric pad.** pad = (cross − seat)/2 on every side; corner = cross/2. `--dock-cap-rest` is deleted, with no alias (E-1). W1's lens is gone: every morph frame reads a stadium within 0.137 px.
- **S-5 · Gutter no wider than pad, on both axes.** `--dock-paint-reach` ≤ pad is an invariant the stylesheet can state. The probe broke it on the main axis (11.2 > 8) and the harness caught it (3.19 px). Either the main-axis pad grows to the main reach, or the open seat's reach is carried by the seat.
- **S-6 · Anchor input.** Derived, not probed. `s ∈ {0, 0.5, 1}` for start, centre and end; left inset (1 − a)·s·(100% − E_c), right inset (1 − a)(1 − s)(100% − E_c); the row glide is the left inset. The trailing persistent region takes `position: relative; inset-inline-start: −(1 − a)·(100% − (n_ps + n_pe)·seat − gaps − seat)`, in row percentages, so it lands beside the summary (C-11).
- **S-7 · The row clip carries the corner.** The probe's row clip is a plain `inset()`, and at compact a seat capsule shows a square edge beyond the plate's round cap (`$R/proto/cap/d2a-chromium-compact-900.png`). The row clip needs `round` at the corner plus pad.
- **S-8 · The binder fails loud.** The compaction animation applies only under an attribute the binder sets after it binds. `compactOnScroll` with an unresolved source raises a dev error, and the dock stays full, never compact (E-2). The binder appends to the consumer's `scroll-timeline` / `timeline-scope` lists instead of replacing them (Q5: lists resolve in both engines).
- **S-9 · Engagement.** `:focus-within`, `[data-held]` and `[data-kept-open]` (the holds, K-7), with `(hover: hover) :hover`, zero the gate at once. Release waits 150 ms. PRM sets both transition durations to 0 (W4 prm cells: 0 intermediate frames).
- **S-10 · The rim.** A child of the plate, inset by the corner, clipped by the plate's own aperture; the fill rides the page timeline. W5 10/10, 0 ink outside the silhouette.
- **S-11 · The cut cap is a ruling, not a mechanism.** The charter's ranges make the cut reachable (Q1), and W1 rejects the cut (C-5). One token line decides it.

Load-bearing CSS, from the probe (`$R/proto/new/aperture.css`, 267 lines):

```css
.glass-dock:is(.horizontal, .vertical) {
    --dock-pad: var(--dock-padding-block);
    --dock-cross: calc(var(--dock-seat) + 2 * var(--dock-pad));
    --dock-corner: calc(var(--dock-cross) / 2);
    --dock-extent-c: max(var(--dock-cross), calc(var(--dock-n-c) * var(--dock-seat)
        + max(0, var(--dock-n-c) - 1) * var(--dock-layer-gap) + 2 * var(--dock-pad)));
    --dock-extent-t: 1;
    --dock-c: calc(var(--dock-c-scroll) * var(--dock-c-gate));
    --dock-a: clamp(0, min(var(--dock-extent-t), 1 - var(--dock-c)), 1);
    --dock-inset: calc((1 - var(--dock-a)) * (50% - var(--dock-extent-c) / 2));
    transition: --dock-extent-t var(--spring-dock-duration) var(--spring-dock),
                --dock-c-gate var(--spring-dock-duration) var(--spring-dock) 150ms;
}
.glass-dock.collapsed { --dock-extent-t: 0; }
.glass-dock.horizontal .dock-plate { clip-path: inset(0 var(--dock-inset) round var(--dock-corner)); }
.glass-dock.horizontal > .dock-controls {
    --dock-shift: calc((1 - var(--dock-a)) * (50% + var(--dock-pad) - var(--dock-extent-c) / 2));
    translate: var(--dock-shift) 0;
    clip-path: inset(calc(-1 * var(--dock-pad)) calc(2 * var(--dock-shift) - var(--dock-pad))
                     calc(-1 * var(--dock-pad)) calc(-1 * var(--dock-pad)));
}
.glass-dock.horizontal .dock-shadow { inset: 0 var(--dock-inset); }
.glass-dock[data-compact-on-scroll] { animation: gl-dock-compact linear both;
    animation-timeline: var(--dock-page, none); animation-range: 0 var(--dock-compact-distance, 200px); }
```

## 3 · The probe

### 3.1 What changed (own worktree only)

- **Tracked:** 8 files, +65 / −151 (`git -C wt diff --stat`).
  - `shape.css`: the `[data-morphing]` box scale and counter-scale cut.
  - `layers.css`: the `--dock-live` size blend and the vertical `--dock-expanded-px` reserve cut (31 lines), plus the is-leaving `1 − --dock-morph-t` rule.
  - `morph.css`: the `--dock-expand-t` rungs cut.
  - `index.css`: imports `aperture.css`.
  - `useDockMorph.ts`: rewritten with no spring; it stamps `data-morphing` and the leaving layer, and settles on `transitionend`.
  - `GlassDock.vue`: `useDockExpandedSize` replaced by the binder; adds a `.dock-shadow` layer, an optional rim, and root attributes `data-kept-open`, `data-compact-on-scroll`, `data-rim`.
  - `useDockShellProps.ts`: three props.
  - `DockControl.vue`: `pitches`.
- **New:** `styles/aperture.css` (267 lines), `composables/useDockScrollTimeline.ts` (49 lines).
- **Dead after the probe, not deleted:** `dockMorphMeasure.ts` (142 lines; comments are its only remaining references).
- **Stale readers, not rewired:** `crossfade.css:122,130` still clip DockCrossfade content by `--dock-morph-t`, which nothing writes now. Its registration has initial value 0, so crossfade content under a morphing dock would be fully clipped for the window. Found by reading; not measured (C-16).
- Builds: `node harness/build.mjs <wt> --out $R/out --label d2a` and `--label head` (a clean HEAD worktree state).

### 3.2 Witnesses, HEAD against the probe

Command per witness: `node harness/run.mjs --build $R/out/builds/<label> [--adapter $R/proto/adapter-d2a.mjs] --only Wn --out $R/out/runs/Wn-<label>`. The probe adapter differs from HEAD's in three ways:
- it binds `scrollSource: window`, `compactOnScroll` and `progressRim`;
- it resolves `calc()` insets (lib's `insetOf` reads them as 0);
- it reads posture "compact" when `--dock-c` ≥ 0.5.

| witness | HEAD (Ch / WK) | D2-A (Ch / WK) | what turned green | what stayed red |
|---|---|---|---|---|
| W1 corner | 9/32 | **26/32** (13 / 13) | every morph frame, collapsed rest, fit, hovered fit, vertical: worst ≤ 0.137 px (HEAD 4.6–11.8 px, lens and squash) | rail rest, rail scrolled-end, sidebar short viewport, both engines: worst 6.0 px (WK 5.94), the cut cap (C-5) |
| W1, cut retargeted | — | **32/32** | adapter `$R/proto/adapter-d2a-nocut.mjs` injects `--dock-cap-cut: var(--dock-cap-rest)`; rail and sidebar read mean r 32 | — |
| W2 run | 0/10 | **6/10** | route 1 h/v ring cut 0.5/0.5 (Ch, at the bound), 0/0 (WK); HEAD 2.5/2.5. Route 2 hidden face: 0/81 and 0/59 frames with a scroller (HEAD 81/81, range 318) | routes 3 and 4: the fitting active run is still a scroll container in 249/249, 230/230 frames (WK 195/195, 172/172), with range 0 in every frame (HEAD route 4 range 2 px, ring cut 1.5) (C-1) |
| W3 morph | 0/14 | **6/14** | first-expand, warm-collapse, warm-expand, both engines (finding 2) | content-add / remove: 179.33 px in one frame, no window (C-2). Swap long / short: 244.98 px in one frame; swap-short faces out 3.19 px (C-3) |
| W4 state | 4/16 | **10/16** | compacts 206.13 → 56.03 px; engagement hover / leave / focus / blur / top: 206.13 / 56.03 / 206.13 / 56.03 / 206.13; PRM compact 0 frames; PRM posture 0 frames; menu holds | no-threshold-bounce: 24 flips (C-4). Coarse no-hover-latch and tap-pins: floor row 3, not prototyped (same as HEAD) |
| W5 rim | 0/10 | **10/10** | rim ink 1128 (Ch) / 1116 (WK) expanded, 268–318 collapsed, 265–296 compact, 0 px outside the silhouette in every cell | — |

### 3.3 Cost

**Main thread across one expand** (Chromium; `node $R/proto/trace.mjs <build> <adapter> <label>`: hover to expand, then 1.2 s with no in-page polling; 3 reps; count / summed ms on CrRendererMain):

| | FunctionCall | FireAnimationFrame | UpdateLayoutTree | Layout | Paint | PrePaint |
|---|---|---|---|---|---|---|
| HEAD | 304–309 / 26.1–29.5 | 235–238 / 27.7–30.9 | 119–122 / 109–114 | 66–70 / 4.3–4.6 | 266–276 / 16.5–17.2 | 334–342 / 5.4–5.9 |
| D2-A | 176–182 / 9.4–12.2 | 156–162 / 10.5–13.3 | 75–77 / 45.9–50.7 | 28–29 / 1.2–1.4 | 106–110 / 5.5–6.3 | 213–222 / 2.7–3.1 |

Per expand, the probe does less than half HEAD's style work. It is not compositor-only: every frame recalculates style (~0.6 ms per recalc), repaints the clipped plate and row, and lays out the elevation layer, whose insets move (C-14).

**Reversal** (`node $R/proto/extra.mjs`: a warm expand, Escape at ~90 ms, velocities in px/ms; 3 reps):

| | before | first frame after | peak return | return time |
|---|---|---|---|---|
| D2-A Chromium | +2.47–2.65 | −0.62 to −0.90 (one held frame) | −3.19 to −3.21 | 127–137 ms |
| D2-A WebKit | +2.81–2.88 | −2.62, −1.03, **0** | −3.03 to −3.21 | 123–173 ms |
| HEAD Chromium | +1.98–2.19 | −0.81 to −0.98 | −2.41 to −2.50 | 253–259 ms |

Neither carries its outward velocity through the reversal (C-13).

## 4 · Public API and consumer impact

**Props and attributes, as probed.**
- **GlassDock props:**
  - `scrollSource?: HTMLElement | Window | (() => HTMLElement | Window | null) | null`: an element or a getter, never a selector (K-4). The getter is resolved inside GlassDock. The first probe build passed it through `toValue` unresolved, the binding never happened, and the dock painted compact at rest (C-7).
  - `compactOnScroll?: boolean`.
  - `progressRim?: boolean`: the rim is the dock's own child, not a slot, so no consumer paint lands outside the aperture.
- **DockControl prop:** `pitches?: number`, with host `inline-size: calc(k·P − gap)`.
- **Root attributes:** `data-morphing` (flip to `transitionend`, 207–223 ms), `data-kept-open`, `data-compact-on-scroll`, `data-rim`.
- **Tokens:** `--dock-compact-distance` (default 200 px). `--dock-cap-rest` is deleted (S-4). `--dock-morph-t`, `--dock-expanded-px` and `--dock-live` go.
- **Derived, not probed:** `anchor?: "start" | "center" | "end"` (S-6).

**value.js** (M-1, M-2).
- K-15 stops mattering, because nothing is measured under the 1.03 ancestor scale.
- A-1 (the mount veil) has nothing left to hide: W3 first-expand passes.
- X-8 can read `--dock-cross` (56 px, a closed form) instead of re-deriving it.
- K-8, the four-face swap: still one frame (C-3). `DockViewSelect` and `MobileMenuDropdown` would declare `pitches` only if the swap goes closed-form; that is +4 to +47 px per trigger (Q3).
- X-11 and X-12 are not retired, because content changes are still one frame (C-2).
- K-10: `.glass-dock.collapsed` and `[data-morphing]` survive, with a shorter window.

**keyframes** (M-3, M-4), against O-64:
- R-1 (first-morph stale endpoint): cured in the harness scene; no endpoint exists to go stale.
- R-3 (sub-pixel ring): cured; dead landing, 0 reversals.
- R-4 (a window twice its travel): 207–223 ms against a 210 ms clock.
- R-2 (a scene switch changes width in one frame): not cured (C-2).
- R-5 (two owners of `::before` opacity) and R-6 (plate resample): not touched by this family, not measured.
- K-18: no document View Transition is used.
- K-5: M-4's collapsed face, wider than the circle, is clipped to E_c. That makes the circle the contract, and the content moves to `#persistent` by addendum.
- The three label seats need no `pitches` (S-3).

**fourier** (M-5 to M-8):
- M-6, right-anchored: fails as written. The collapsed plate paints 83 px from its anchor (C-10) until S-6 lands.
- M-7's text badge in `#persistent` is counted as one 40 px seat (C-12).
- M-8, X-4: the width is set only on `.expanded`, so the in-flow box itself changes at the class flip, in one frame. Setting the width unconditionally lets the aperture carry it. That is a one-line addendum, not the K-3 cap input, which D2-A does not provide.
- K-21 / K-37: compaction changes no layout. The root box stays 487.66 px while the painted extent runs 101.93 → 487.66, so `<main>`'s scroll range cannot feed back.
- K-34, the `<main>` source: the binder names it and scopes it on `:root` (Q5, 0.5/0 in both engines).
- K-16: plate, rim and faces paint inside the dock box.

**chicago** (M-9):
- X-1 (`--dock-cap-rest: 9999px`) is deleted with the token. W1's lens cells pass.
- X-2 (`.dock-run { overflow: visible }`) is unnecessary for range: 0 range under hover, focus and press, and the tab's 8.25–8.75 px reach sits inside the 11.2 px main gutter.
- K-35: a compact rung on a `:collapse="false"` dock with no `#collapsed` shows the first seat ("Photos") cut by a 56 px circle (C-9).

## 5 · Engines

- **Chromium 149 and Playwright WebKit 26.5** agree on every resolved case:
  - Q1, Q2, Q4, Q6 values and W1–W5 verdicts;
  - the Q5 resolved rows;
  - the probe's geometry to ≤ 0.06 px (collapsed 101.93 / 101.94, expanded 487.66 / 487.72).
- **They split on every unresolved timeline:** unscoped inner names, unbound names, `none` on a fresh element. Chromium paints the end keyframe; WebKit paints nothing.
- **The live dock:** removing the binding paints the end keyframe in both (C-7).
- **WebKit crash shim:** WebKit needs the harness `+shim` (nested translucent `color-mix`). The probe adds no new shim.
- **Not measurable in Playwright WebKit:** backdrop blur (Q-BR) and per-frame compositor cost (Q6).
- **Real Safari 26.4:** UNMEASURED (owner's safaridriver checkbox), every cell. That includes Q1's paint, Q5's resolution, whether Q6 is threaded, and the backdrop-root rule.

## 6 · Counterexamples

| id | counterexample | measured |
|---|---|---|
| C-1 | **A fitting run is still a scroll container.** The gutter holds the range at 0, but W2 routes 3/4 want no container at all. Pure CSS cannot compare Σk against the available width: container-query values take no `var()`, and `scroll-state()` is Chrome-only | 249/249, 230/230 frames (Ch); 195/195, 172/172 (WK) |
| C-2 | **Content change on a live dock.** The in-flow box changes before any scalar can move, and the old extent is gone | 179.33 px in one frame, both directions, both engines |
| C-3 | **Layer swap.** E_active needs the face's own width. Without per-face Σk it has no closed form, and with it every label seat in the face is quantized (Q3). Also the main gutter exceeds the pad | 244.98 px in one frame; swap-short faces out 3.19 px |
| C-4 | **No position memory.** `c` is a function of scroll offset; K-39's hysteresis is not expressible across engines | 24 flips in 24 moves of ±4 px at the midpoint |
| C-5 | **The cut cap is not a stadium.** Q1's success is W1's failure | 6 cells, worst 6.0 px (Ch) / 5.94 (WK); 32/32 with the cut retargeted |
| C-6 | **An ancestor aperture is the backdrop root.** Rules out the charter's `.dock-aperture` wrapper | stripe contrast 250 vs 0 (Chromium) |
| C-7 | **A failed binding compacts the dock.** `var(--dock-page, none)` falls to the end keyframe on the live dock in both engines | c 0 → 1, extent 206.13 → 56.03 at scroll 0 |
| C-8 | **The binder writes on consumer-owned elements.** A consumer's own `timeline-scope` on `html`, or its own `scroll-timeline`, is overwritten | Q5 clobber rows: d1 = 1 (Ch) / −1 (WK) |
| C-9 | **K-35: compact without a collapsed face.** The first seat is cut by the circle, and the row's clip, which has no `round`, shows a square capsule edge past the cap | `$R/proto/cap/d2a-chromium-compact-900.png` |
| C-10 | **K-11: right anchor.** The aperture is symmetric about the box centre | collapsed plate 1008–1109 in a root spanning 925–1192: 83 px gap (HEAD: 0, plate 1096–1192) |
| C-11 | **Trailing persistent region.** It is counted in E_c, but the glide brings the row start, not its end, into the window | centred dock: `#persistent` seat inside, `#persistent-end` seat at 776–816 against plate 526–674 (HEAD: both inside, 529–671) |
| C-12 | **Non-seat persistent content** (fourier M-7's badge) counts as one 40 px seat | read, not measured |
| C-13 | **Reversal restarts the curve.** A transition retargets from the current value with zero velocity: one held frame, no inertia (D-1) | Chromium +2.5 → −0.6..−0.9 px/ms; WebKit one rep 0 |
| C-14 | **Main-thread motion.** Style every frame; paint of the clipped plate and row; layout of the elevation layer's moving insets | 75–77 recalcs / 46–51 ms per expand; Q6 A 30 recalcs + 60 paints per 30 scroll steps |
| C-15 | **Consumer paint reach exceeds the gutter** (K-33). The gutter can state a maximum as a consumer contract; it cannot enforce it | glass `Button` 10.75 / 11.25 px against 6.4 |
| C-16 | **Stale scalar readers.** `crossfade.css:122,130` read `--dock-morph-t` (initial 0) and would clip DockCrossfade content to nothing while `data-morphing` is set | read, not measured |
| C-17 | **K-5.** Collapsed faces wider than the circle (keyframes M-4, fourier M-8) are clipped to E_c | read, not measured on those compositions |
| C-18 | **Mid-engage release.** The gate holds its current value for the whole 150 ms delay, then starts a fresh transition | 0.505 (Ch) / 0.514 (WK) held 120 ms+ |

## 7 · Open gaps

- **Real Safari 26.4, every cell:** UNMEASURED (owner's safaridriver checkbox).
- **WebKit per-frame cost:** the main-thread cost of the scroll ramp and of the posture transition in WebKit is UNMEASURED; Playwright's wheel waits on the main thread.
- **Backdrop blur in WebKit:** headless Playwright WebKit paints none. The backdrop-root rule is Chromium-only evidence.
- **Designs this seat did not build:**
  - a closed-form layer swap (C-3), or any morph for content changes (C-2): neither has a design inside this family;
  - the anchor input (S-6) and the trailing-region offset: derived, not probed;
  - the row clip `round` (S-7) and binder-fails-loud (S-8): not probed;
  - floor row 3 (coarse no-hover-latch, tap-pins): not prototyped.
- **The cut cap (C-5)** needs a ruling on W1's bound at a genuine overflow edge.
- **Consumer compositions** (M-4 / M-8 wide collapsed faces, M-7 badge, X-4 unconditional width) were read, not measured on their served pages.
- **Stale scalar readers** (`crossfade.css`, C-16): not rewired or measured.

## 8 · Probe index

| what | command | output |
|---|---|---|
| Q1, Q2, Q4, Q5, Q6 pages | `node $R/probes/run.mjs q1\|q2\|q4\|q5\|q6` | `$R/probes/out/q*.json` |
| Q1 paint | `node $R/probes/q1.mjs` | in `q1.json` (`paint`) |
| Q6 trace / blocked main thread | `node $R/probes/q6trace.mjs`, `node $R/probes/q6block.mjs` | `q6trace.json`, stdout |
| backdrop root | `node $R/probes/qbr.mjs` | stdout, `qbr-*.png` |
| Q3 / Q7 seats | `node $R/x/buildx.mjs <wt> $R/x/SeatsApp.vue $R/x/seats-head`; `node $R/x/q37.mjs` | `$R/x/q37-head.json` |
| anchor / both regions | `node $R/x/buildx.mjs <wt> $R/x/AnchorApp.vue $R/x/anchor-{d2a,head}`; `node $R/x/anchor.mjs $R/x/anchor-<l>/dist <l>` | stdout (§6 C-10, C-11) |
| builds | `node harness/build.mjs <wt> --out $R/out --label head\|d2a` | `$R/out/builds/{head,d2a}` |
| witnesses | `node harness/run.mjs --build … [--adapter $R/proto/adapter-d2a.mjs] --only Wn --out $R/out/runs/Wn-<label>` | `$R/out/runs/W*-{head,d2a}/W*.json` |
| W1, cut retargeted | `… --adapter $R/proto/adapter-d2a-nocut.mjs --only W1` | `$R/out/runs/W1-d2a-nocut/` |
| smoke, reversal, trace, unbound | `node $R/proto/{smoke,extra,trace,unbound}.mjs <build> <adapter> [label]` | `$R/proto/extra-*.json`, `$R/proto/cap/*.png`, stdout |
| the probe itself | tracked diff and new files | `$R/proto/d2a-tracked.diff`, `$R/proto/new/{aperture.css,useDockScrollTimeline.ts}`, `$R/proto/patch.py` |
