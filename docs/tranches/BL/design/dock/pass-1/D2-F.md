# D2 · pass 1 · D2-F · discrete rungs, carried by the user agent

| field | value |
|---|---|
| seat | pass-1 research seat for family D2-F (statechart, never-scrolling overflow rung, View Transitions). Read: `PORTFOLIO.md` §0-2, the D2-F section and its §6 questions, `pass-1/W.md`, `pass-1/X.md`, `harness/HARNESS.md`. No other family section was read |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the brief named `5804d8cc`. The scratch worktree was cut at `2cffcbbb`, and the checkout read `da9cc649` at the end, all through docs-only commits. `git diff --quiet v10.0.1 2cffcbbb -- src` holds, so the probe starts from the 10.0.1 dock byte for byte |
| engines | Chromium 149.0.7827.55 headless and Playwright WebKit 26.5 headless (Playwright 1.61.1), Node 26.0.0. Every WebKit number is **Playwright WebKit**, and WebKit dock cells carry the harness `+shim` (HARNESS §4). Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-F-research/`, called `$S` below. Probes are in `$S/probes/`, harness runs in `$S/out/`, and the probe patch is `$S/d2f-probe.patch` (11 files, +399/−244). The worktree `$S/wt` was removed with `git worktree remove --force` before return |
| writes | this file only, in the checkout. One git write went beyond the brief's fence: a `git add -N` of the probe's two new files inside the scratch worktree, used to include them in the saved patch. It touched only that worktree's index, and the worktree has since been removed |

## 0 · The answers in one table

| # | question | answer | evidence |
|---|---|---|---|
| Q1 | a WebKit signal for element-scoped view transitions in 2026 | **None.** `Element.prototype.startViewTransition` is absent in Playwright WebKit 26.5, and `view-transition-scope` and `view-transition-group: contain` do not parse. WebKit standards-positions #611 is open with 0 comments and no labels, and has not been updated since 2026-02-04. None of the 46 WebKit bugs titled "view-transition" filed since 2025-06-01 is a scoped-transition implementation bug. The fallback, a document transition, swallows every click on the page in both engines, including a click on an unrelated button in the page's top-left corner. **F is BLOCKED under D-4** unless Safari runs with no morph at all, and that no-morph path fails E-2 | §1.1 |
| Q2 | what the lens paints during a scoped transition in Chromium 149 | **Nothing but the tint.** The group pseudo computes `backdrop-filter: blur(10px)` and animates it, but the pixels under the plate stay sharp and live: stripe sharpness 21.1-23.4 during the transition, against 0.54-0.97 at rest. The lens drops for the length of every morph and returns at `finished` | §1.2 |
| Q3 | a hover-leave during a running transition; retargeting | **No retarget.** A second `startViewTransition` captures the committed DOM, so the painted width jumps 179.2 → 400 px (+220.8 px) in one frame and then glides back. `skipTransition()` jumps −78.9 px to the end state with no motion. Reversing the running animations is position-continuous, but velocity flips from +1.21 to −1.22 px/ms in one frame, and it can only return to the origin rung | §1.3 |
| Q4 | which consumer docks would fold into a More seat | At 390, 768 and 1440 px, **none**: every composition fits. At 360 px the pitch rule misjudges both ways. keyframes' ChromeDock (8 seats, K = 7) would fold 2 seats for a 14 px overflow. chicago (5 label seats, K = 7) would fold nothing while its row overflows by 9 px, and with no scroller that row is cut. The owner has not ruled on a More seat over a scroller; it is an owner ask | §1.4 |
| Q5 | the size of one statechart replacing useDockState, useDockClickIntegrity and the hold counts | **5 rungs, 13 inputs, 23 table edges; 175 lines, of which 146 are code.** It replaces 461 code lines (useDockState 320 of 454, useDockClickIntegrity 141 of 269). The table is not the whole machine: three non-table mechanisms were needed to survive the transition (§1.5) | §1.5 |
| Q6 | a static rim seat filled by a scroll-driven animation, no JS, both engines | **Yes for `window`.** The fill reads 0 / 75 / 150 / 300 px at scroll 0 / ¼ / ½ / 1 in both engines, with 0 magenta pixels outside a 28 px stadium. An element source works the same way (`scroll-timeline` on the scroller plus `timeline-scope` on an ancestor), but the library cannot write that CSS onto a consumer's element without script | §1.6 |
| probe | the family on the real dock, harness W1-W5 | HEAD: W1 9/32, W2 0/10, W3 0/14, W4 4/16, W5 0/10. **Probe f6: W1 32/32, W2 10/10, W3 5/14, W4 16/16, W5 10/10.** W3's 9 red cells are the two content-change cells in both engines and all seven WebKit cells, where the morph lands in one frame | §3 |

## 1 · The research questions, measured

### 1.1 Q1 · the Safari cell

`$S/probes/q1-support.mjs`, output verbatim:

```
chromium 149.0.7827.55 {"elementSVT":"function","documentSVT":"function","activeVT":true,"transitionRoot":true,"waitUntil":true,"scope":true,"groupContain":true,"matchElement":true,"vtClass":true,"linearEasing":true,"scrollTimeline":true,"viewTimeline":true}
webkit 26.5 {"elementSVT":"undefined","documentSVT":"function","activeVT":true,"transitionRoot":false,"waitUntil":false,"scope":false,"groupContain":false,"matchElement":true,"vtClass":true,"linearEasing":true,"scrollTimeline":true,"viewTimeline":true}
```

`gh api repos/WebKit/standards-positions/issues/611` returns `{"comments":0,"created_at":"2026-02-04T20:38:23Z","labels":[],"state":"open","updated_at":"2026-02-04T20:38:23Z"}`.

A Bugzilla REST query (`short_desc=view-transition&creation_time=2025-06-01`) returns 46 bugs. None of them names a scope, an element-scoped transition or `Element.startViewTransition`. The closest is `waitUntil` test gardening (319066, 324250), and Playwright WebKit does not expose `waitUntil`.

The fallback is `$S/probes/q1-docclick.mjs`: a document transition on a dock, with a real click at +100 ms.

| engine | click on the dock's seat | click on an unrelated page button at the top-left corner |
|---|---|---|
| Chromium | `elementFromPoint` → `HTML`; the click lands on `HTML` | `HTML`; lands on `HTML` |
| Playwright WebKit | `HTML`; lands on `HTML` | `HTML`; lands on `HTML` |

**Verdict.** Safari has no scoped path in 2026. The document path makes every dock hover a page-wide input freeze of about 250 ms. The no-transition path, which the probe runs on WebKit, fails W3 continuity in all seven cells (§3). **F is BLOCKED under D-4**: its morph engine exists in one of the two engines.

### 1.2 Q2 · the lens during a scoped transition

`$S/probes/q2-lens.mjs` and `q2b-lens.mjs`. A plate with `backdrop-filter: blur(10px)` and a 15 % red tint sits over 8 px black and white stripes that move 1 px per frame. It is named `dock-plate` inside a scoped transition. Sharpness is the mean absolute luminance step along the plate's middle row: 0 is flat, and the bare stripes read about 32.

| cell | sharpness inside the plate | reading |
|---|---|---|
| Chromium, rest | 0.97 / 0.13 | blurred |
| Chromium, scoped transition, +700 ms of 3 s | 23.42 / 23.42, row signature `21,206,206,21,…`, changing between shots | **no blur**; live stripes under the tint |
| Chromium, scoped, the group computed style | `backdrop-filter: blur(10px)`, and animations on `::view-transition-group(dock-plate)`: `height, width, transform, backdropFilter` | the property is present, but the paint is not |
| Chromium, scoped, after `finished` | 0.54 | the blur returns |
| Chromium, document transition | 1.29 / 1.04 | blurred, over the frozen root snapshot |
| Playwright WebKit, rest | 27.47 | **the headless build paints no backdrop blur even at rest**, so WebKit's lens cell is not measurable here |

The answer is "nothing": for the whole morph the plate reads as a flat tint over a sharp, moving page. That matches the portfolio's risk 2, but it is a loss, not a freeze. In the probe the group paints the tint alone (`background: var(--dock-vt-plate-bg)`, §2), which is honest about it.

### 1.3 Q3 · interruption

`$S/probes/q3-retarget.mjs 420` (Chromium): a scoped transition from 102 to 400 px on the `--spring-dock` curve over 420 ms, interrupted at +100 ms. Rows are `ms:painted width`.

| mode | around the interrupt | largest step |
|---|---|---|
| none (and a click at +104 ms on the seat) | the click lands on `BODY` | 20.32 px |
| a new `startViewTransition` (the hover-leave) | `92.4:168.84 · 100.8:179.2 · 110:400 · 118.2:400 · 125.5:399.03 …` | **220.8 px**: the old image is the committed expanded DOM, not the painted mid-state |
| `skipTransition()` plus the collapse | `99.2:180.94 · 107.4:102` | 78.94 px; no motion to the new rung |
| `animation.reverse()` on every running animation, then commit the collapse at `finished` | `101.1:159.5 · 110.3:170.66 · 116.8:162.7` | continuous in position; velocity **+1.21 → −1.22 px/ms** in one frame |

A view transition cannot be retargeted to a third rung. The reverse trick reaches only the origin rung and turns around "as though it hit a wall" (W.md §10). Neither carries velocity, so D-1 fails on every interrupted morph.

The same measurement on the probe dock (§3) showed a second defect of the class. While a scoped transition runs, the dock loses `:hover`: the pseudo overlay owns hit testing. A chart that reads `:hover` sees a leave and flips back, so compact → expanded → compact looped for 1.5 s under a still pointer (`$S/probes/compactdbg.mjs` against build f4: three full cycles, 84-516, 581-983 and 1048-1466 ms).

### 1.4 Q4 · consumer docks at real widths

`$S/probes/q4/` is a scratch scene that copies the seat structure of three consumer docks (read-only reads; labels verbatim). chicago uses `TempApp.vue:43-47` and its ≤ 480 px short labels. fourier uses `AppDock.vue:43-48`, labels from 640 px. keyframes uses ChromeDock with 6 compact surface items. It is built on HEAD's dock. `DockTrigger` is stood in by a tab `DockControl` of the same text, because the triggers need their reka roots. The budget is the band's content box: chicago has 16 px of band padding, the others none. K = floor((budget + 8)/48).

| dock | 360 px | 390 px | 768 px | 1440 px |
|---|---|---|---|---|
| chicago (5 seats, label sum 239.3 px at ≤ 480) | run 313 in 304 (**overflows 9 px**), K 7: **no fold, row cut** | fits (313 / 313), K 7 | fits, K 15 | fits, K 29 |
| fourier AppDock (4 seats) | fits (307), K 7 | fits, K 8 | fits, K 16 | fits, K 30 |
| keyframes ChromeDock (8 seats) | run 350 in 336 (**overflows 14 px**), K 7: **folds 2** | fits (350 / 350), K 8 | fits, K 16 | fits, K 30 |

Both engines read the same to within 0.1 px (`measure.mjs`). value.js's four-layer dock and fourier's controls docks were not composed; their seat sets are view-dependent (X.md §1.1).

- **The pitch rule is wrong for label seats.** The chicago row holds 5 seats against K = 7 and still overflows. The rule must sum seat extents, which is measuring, and the charter's "K from P" does not survive label seats (1.2 Tabs are 40-147 px wide at P = 48).
- **All four consumers already shed labels by breakpoint so their rows never scroll** (X.md §1.2). A More seat would appear only on phones narrower than 390 px, and only for keyframes.
- The owner has no ruling on a More seat against a scroller: an **owner ask** (§6).

### 1.5 Q5 · the statechart

The probe's `useDockChart.ts` (§2) is the answer, in code:

| measure | value |
|---|---|
| rungs | `collapsed · compact · expanded · pinned · held` |
| inputs | `hover.fine · leave.idle · press.coarse · click.summary · focus.visible · focus.out · scroll.past · scroll.top · layer.open · layer.close · click.away · expand · collapse` |
| table edges | collapsed 6, compact 6, expanded 7, pinned 3, held 1 = **23** |
| file | 175 lines, 146 code (`grep -v` blank and `//` lines) |
| replaces | `useDockState.ts` 320 code / 454 lines, and `useDockClickIntegrity.ts` 141 / 269. Its two hold counts become `holds` and `grasps`, plus `heldFrom` so a hold returns to the rung it interrupted |
| O-59 / R4-01 as edges | **R4-01-05**: `click.away` has an edge from `expanded` and `pinned` with no morph gate (HEAD's `if (isTransitioning?.value) return`, `useDockState.ts:373`, is gone). **R4-01-06**: `held --layer.close-->` re-reads present state (`settle`: engaged → expanded, else back to `heldFrom`, else rest) and never schedules a leave. **R4-01-15 / UIA-F-80**: `hover.fine` only from `pointerType === "mouse"` under `(hover: hover)`; `press.coarse` pins, and its click is swallowed when the press began on a folded rung. **UIA-F-10/-11**: holds are per dock and `held` has no timer edge |
| what the table does not hold | (1) hover read from the last fine pointer position against the dock box, not `:hover`, which a running transition drops (§1.3); (2) pointer boundary events ignored while `data-rung-transition` is set; (3) `resync()` at `finished` to re-read engagement. Without all three, a hover-driven rung loops (§1.3) |

The machine is small. It is also not self-contained: its correctness depends on knowing that the transition layer steals hit testing.

### 1.6 Q6 · the rim fill, no JS

`$S/probes/q6-rim.mjs`: a 300×56 stadium dock (`overflow: clip`, radius 28 px) with a 4 px rim and `.fill { transform: scaleX(0→1); animation-timeline: scroll(root block) }`. The element variant uses `main { scroll-timeline: --src block }` and `body { timeline-scope: --src }`. Rows are the fill width in px, then magenta pixels outside the circle of radius 28.5.

| cell | scroll 0 | ¼ | ½ | 1 |
|---|---|---|---|---|
| Chromium, root | 0, 0 | 75, 0 | 150, 0 | 300, 0 |
| Chromium, element | 0, 0 | 75, 0 | 150, 0 | 300, 0 |
| Playwright WebKit, root | 0, 0 | 75, 0 | 150, 0 | 300, 0 |
| Playwright WebKit, element | 0, 0 | 75, 0 | 150, 0 | 300, 0 |

Yes on both engines. The catch is the O-55 contract: a getter or an element as the scroll source. `scroll(root)` covers `window`. For an element, CSS needs a named timeline on the consumer's scroller and a `timeline-scope` on a shared ancestor. The library can write both only by setting styles on elements it does not own, and a duplicate name fails quietly to the start value (W.md §1). The probe binds `window` only.

## 2 · The strongest form (what F must specify to work)

What the probe (§3) found F has to fix precisely. Each item was forced by a measured failure.

1. **The scope is not the dock.** A scope's own box is not interpolated: its pseudo tree is laid out in the scope's new box, with the group transform at identity throughout. With `dockEl.startViewTransition`, the centred dock's left edge jumped 669 → 475 px in one frame and then grew rightward only (`$S/probes/vtpaint.mjs`, build f1). The scope must be a stable ancestor. The probe uses `dockEl.parentElement`, a consumer-owned element, so the library calls `startViewTransition` on a box it does not own. Every hit test inside that box falls through for the duration (§5).
2. **The dock is one group that contains the others.** The dock gets `view-transition-name: dock-box; view-transition-group: contain`, and `::view-transition-group-children(dock-box) { overflow: clip; border-radius: 9999px }`, so seats and faces cannot paint outside the moving stadium.
3. **The plate is painted by its group, not its snapshot.** A snapshot of the plate at either endpoint cannot fill an interpolated box: `object-fit: none` leaves gaps, and `fill` stretches the corners into a lens. So `::view-transition-old/new(dock-plate)` are hidden, and `::view-transition-group(dock-plate)` paints `background` and `border-radius: 9999px`. The radius clamp gives the exact stadium of the interpolated box at every frame (W1 in-frame worst 0.388 px). The lens is absent during the morph (Q2).
4. **One owner per rung property.** Two CSS transitions on geometry ran inside the live new snapshot and made the extent settle about 100 ms after the transition ended: `.glass-dock { transition: all }` and run.css's `inline-size` on seats. F deletes them; the probe overrides them.
5. **Rungs are static.** The inactive face and inactive `DockLayer` faces are `display: none`, not absolute and hidden. That retires R2-02-06's live scroller.
6. **No scroll container.** `.dock-run { overflow: visible }`, no snap, and no cut-cap timeline. The seats beyond capacity get `[data-dock-folded]`, and a More seat (`.dock-icon-button.dock-more`, `aria-haspopup="menu"`) is appended in the run. The probe builds no menu (§6).
7. **Every visual state change is a rung change.** Face swaps route through the dock (`DockContext.transition(apply)`). DockCrossfade keeps a `shown` ref that lags the caller's `active` and is written only inside the transition. Consumer content changes (`v-if` seats, text) cannot be routed, because a transition must start before the DOM changes.
8. **The chart holds its inputs across a transition** (§1.5 items 1-3).
9. **PRM** commits with no transition (W4 0 intermediate frames). **No scoped API** (WebKit) commits with no transition and a `console.warn`: honest, but a one-frame morph.

```css
/* the load-bearing CSS of the probe (rungs.css, abridged) */
.glass-dock { view-transition-name: dock-box; view-transition-group: contain; }
.glass-dock > .dock-plate { view-transition-name: dock-plate; container-type: size; animation: none; }
.glass-dock :is(.dock-icon-button, .dock-tab-button, .dock-trigger) { view-transition-name: match-element; }
:has(> .glass-dock)::view-transition-group(*) { animation-duration: var(--spring-dock-duration); animation-timing-function: var(--spring-dock); }
:has(> .glass-dock)::view-transition-group-children(dock-box) { overflow: clip; border-radius: 9999px; }
:has(> .glass-dock)::view-transition-group(dock-plate) { background: var(--dock-vt-plate-bg); border-radius: 9999px; visibility: visible; }
:has(> .glass-dock)::view-transition-old(dock-plate), :has(> .glass-dock)::view-transition-new(dock-plate) { animation: none; opacity: 0; }
.glass-dock .dock-rim { position: absolute; inset-block-end: 4px; block-size: 3px; inset-inline: calc(0.6 * 50cqmin); }
.glass-dock .dock-rim-fill { animation: gl-dock-rim-x linear both; animation-timeline: scroll(root block); }
```

The rim inset `0.6 · 50cqmin` keeps a 4 px-deep rim inside the stadium for any radius up to 47.9 px: at x = 0.4r from the arc centre the silhouette sits 0.0835r above the bottom. The rim is a child of the plate, which is `container-type: size`. That costs the plate nothing, because it has no content (portfolio §2.2).

## 3 · The probe on the real dock

**What changed** (`$S/d2f-probe.patch`, 11 files, +399/−244):
- **Script.** `GlassDock.vue` drops `useDockState`, `useDockClickIntegrity`, `useDockExpandedSize` and `useDockMorphOrchestrator`, and gains the chart, `transition()`, capacity folding, the More seat and the rim seat.
- **New files.** `composables/useDockChart.ts` (new, 175 lines) and `styles/rungs.css` (new, 102 lines, imported last, with overrides in place of deletions).
- **Face swaps.** `DockCrossfade.vue` becomes a rung switch (−90 lines) and `dockContext.ts` gains `transition`.
- **Props.** `DockProps` gains `scrollSource`, `compactOnScroll` and `rim`.
- **Hover gating.** The hover `scale`/fill in `icon-button.css`, `tab-button.css`, `triggers.css` and `glass-capsule.css` (its 1.015 lift) moves under `@media (hover: hover)`.
- `vue-tsc --noEmit -p tsconfig.src.json` exits 0 with no output.

**The adapter** is `$S/adapter-f.mjs`, a copy of `adapter-head.mjs`:
- `morphing()` reads `[data-rung-transition]`.
- `posture()` knows `compact`, `rim()` returns the plate's `.dock-rim`, and `compact()` is true when the scene binds `compactOnScroll`.
- `config` binds `{scrollSource: "@window", compactOnScroll: true, rim: true}` and `{scrollSource: "@window", rim: true}`.
- **During a transition**, `extent()` reads `::view-transition-group(dock-box)`: its computed `width`, `height` and `transform`, offset by the scope's box. Checked against pixels by `vtpaint.mjs` (build f2): the painted magenta span and the adapter extent agree within 1 px at all 15 sampled frames of a first expand (e.g. painted 587-854 against 586.2-853.7 at +131 ms).
- **Also during a transition**, `paintingSeats()` clips each seat's rect to the extent. That holds by the `group-children` clip of item 2, and **was not verified in pixels for seats**. W3's faces check is therefore green by construction here, not by measurement.

**Witnesses** (`node harness/run.mjs --build $S/out/builds/<label> --adapter $S/adapter-f.mjs`):

| witness | HEAD (this seat's run) | probe f6 | what turned it |
|---|---|---|---|
| W1 corner | 9/32 | **32/32** | the radius clamp on the plate and its group; no cut cap. Chromium in-morph worst 0.388 px over 10-11 samples. **The WebKit morph cells pass vacuously: 1 distinct extent sampled, because the morph lands in one frame** |
| W2 run | 0/10 | **10/10** | no scroll container on any route (0/36, 0/72, 0/239, 0/210 frames in Chromium); ring cut 0/0 px (clipped 4.25 = free 4.25) |
| W3 morph | 0/14 | **5/14** | Chromium first expand: max step 26.81 px against a 40.9 bound (×0.66), window 249.8 ms against 260.1 allowed, travel 208.5 ms, dead landing, 0 two-owner frames. The warm pair ×0.65-0.66 and the swaps ×0.65 pass (windows 233-234 ms). **RED:** content add and remove in both engines (179.33 px in one frame, no window: F cannot see a consumer's DOM change before it happens), and all seven Playwright WebKit cells (one-frame steps of 387.72, 179.39 and 245.06 px) |
| W4 state | 4/16 | **16/16** | compact rung 214.13 → 191.69 px; the band enter 160 / exit 64 flipped once in 24 moves; hover, focus and top return to 214.13; PRM gives 0 intermediate frames; no hover latch after the `(hover: hover)` gate; a coarse tap pins with 0 clicks; the menu holds 5.5 s |
| W5 rim | 0/10 | **10/10** | 0 device pixels outside the silhouette in all five rungs, both engines (h·expanded ink 1508, h·collapsed 260, v·expanded 1340, v·collapsed 260, compact 1966 in Chromium) |

**Cost.**
- **Runtime.** One `startViewTransition` per rung change. One ResizeObserver on the parent and one MutationObserver on the run (capacity). One passive scroll listener and one document `pointermove` listener (the hover read).
- **Per-frame work.** None during a morph: the user agent animates the pseudo tree. The chart runs on events only.
- **What a real wave deletes** (the probe overrides instead): the morph orchestrator and endpoint measure (254 lines), the click-integrity guard (269), useDockState (454), the crossfade spring and reserve, run.css's scroll, snap, cap and `inline-size` sections, and morph.css/shape.css/layers.css's `[data-morphing]` halves. It also deletes `useDockRun`'s reach glide, which has no scroller to glide. That is consistent with the portfolio's estimate of about 1,500 lines; this seat did not re-count the CSS halves line by line.

## 4 · Public API and consumer impact

**API delta:**
- `GlassDock` gains `scrollSource` (element, `Window` or getter), `compactOnScroll` (`boolean | {enter, exit}`) and `rim`.
- The expose keeps `expanded`, `isPinned`, `isHeld`, `graspHeld`, `isTransitioning`, `expand`, `collapse`, `keepOpen` and `release`.
- `useDockState` (and its three exported types) and `useDockMorphOrchestrator` leave the `composables/index.ts` barrel. `useDockChart` / `DockRung` would replace them.
- `DockContext` gains `transition`.
- `DockCrossfade` loses its measured reserve and its spring, and becomes a rung switch.
- A new behaviour: overflow shows a More seat, not a scroller.
- A new root attribute: `data-rung` / `data-rung-transition`.

| consumer | what changes for it | evidence |
|---|---|---|
| value.js (on 7.0.0) | Mounts `DockCrossfade :active reserve="inline"` directly (`ActionBarLayer.vue:96`, read-only). The `reserve` prop and the peak reserve go, so the Tools crossfade becomes a dock rung change. Its own `0fr ↔ 1fr` seat transition (X.md X-11) would be a second owner of the width inside the snapshot, so it must retire with the cure. The repin already strands `:always-expanded`/`:show-rail` (X.md finding 8) | read |
| keyframes.js | `expand()` maps to `send("expand")` and its test mock's shape holds. Its ChromeDock at 360 px would fold 2 seats into More (§1.4). `backgroundCanvas` is untouched | §1.4 |
| fourier-analysis | AppDock fits at every width measured. CanvasControlsDock is anchored by `right` inside `overflow: hidden` ancestors (X.md M-6). **The scope would be `.controls-dock-anchor`, and a scope clips its pseudo tree to itself (`group-children(root)`)**, so the morph is correct only if the anchor's box contains both rungs. Not measured on its composition | read, inferred |
| chicago | Its three overrides retire: X-1 (the radius clamp is the rung), X-2 (no scroller), and X-3 stays an interface. At 360 px its row overflows by 9 px, and with no scroller and no fold (K = 7 > 5) the row is cut by the viewport. That is the worst case in the constellation. Its `nav.page-dock` is full-width with `pointer-events: none`, and as the scope it makes every tap across the full-width bottom strip fall through during a morph (§5) | §1.4 |

## 5 · Chrome and Playwright WebKit behaviour

| behaviour | Chromium 149 | Playwright WebKit 26.5 | Safari |
|---|---|---|---|
| rung morph | scoped transition on the parent; extent continuous (W3 5/7) | no scoped API: one-frame rung change (W3 0/7); `console.warn` | UNMEASURED (owner's safaridriver checkbox); no scoped API per BCD, #611 open |
| a click at +100 ms into a rung change on the probe (`$S/probes/clickguard.mjs`, compact → expanded) | `elementFromPoint` on seat t1 → `MAIN`, **the click lands on `MAIN`** (the page behind). A point at x = 200 px in the band, about 410 px left of the dock, also reads `MAIN` | t1 receives the click (there is no transition) | UNMEASURED |
| the lens during the morph | tint only, no blur (Q2) | backdrop blur not painted even at rest (headless) | UNMEASURED |
| `:hover` during the morph | dropped; the chart holds and resyncs (§1.3) | n/a | UNMEASURED |
| scroll-driven rim | fills, 0 px outside | fills, 0 px outside | UNMEASURED; scroll-driven animations ship in Safari 26.0 (W.md §1) |
| document-transition fallback | swallows every page click (§1.1) | swallows every page click | UNMEASURED |

**D2-F's own born-RED guard** is "a click at +100 ms into a morph reaches its target". It is **RED on the probe in Chromium** and green in WebKit only because WebKit has no morph. The family's own guard fails in the engine where its morph works.

## 6 · Weaknesses, as named counterexamples

1. **CX-Safari.** The morph engine does not exist in WebKit. Playwright WebKit W3: 0/7, with one-frame steps of 387.72 px on every posture change. A document fallback freezes the page (§1.1). BLOCK under D-4.
2. **CX-click-through.** A tap at +100 ms into any rung change lands on the page behind the dock, and so does a tap anywhere in the scope, which is the consumer's whole band (§5). The O-59 misroute class, worse than HEAD, where the click-integrity guard at least swallowed the click.
3. **CX-scope.** The scope must be a stable ancestor the library does not own (§2 item 1). A consumer whose parent box does not contain both rungs clips the morph. A parent that holds two docks gives them one scope, and a second dock's rung change skips the first's.
4. **CX-retarget.** A hover-leave mid-morph jumps +220.8 px, and `skipTransition` −78.9 px (Q3). No velocity survives an interruption (D-1).
5. **CX-lens.** The live blur is absent for every morph (Q2): sharpness 23 against 0.5-1 at rest.
6. **CX-content.** A consumer's content change on a live dock is a one-frame step of 179.33 px (W3 red, O-64 R-2). F can only see a change it causes, and X.md counts 11 such consumer sites (K-13).
7. **CX-pitch.** Capacity from the pitch token is wrong both ways:
   - the chicago row overflows by 9 px with no fold (§1.4);
   - on the harness rail (11 seats in 560 px) no seat folds, yet the last seat's box ends at 592 px against the plate's 576 px, **16 px outside the plate**. The vertical run's real pitch is 52.4 px against `--dock-pitch` 48 px (`$S/probes/railfold.mjs`);
   - W2 stays green, because it looks only for scroll containers and ring cuts.

   Without a scroller, an over-capacity run paints outside the glass.
8. **CX-More.** No menu was built. The More seat hides destinations (the portfolio's risk 4), and whether the owner prefers it to a scroller is unruled.
9. **CX-hover-steal.** The chart needs pointer-position hover, input freezing and a resync to survive its own transition (§1.5). A cure that depends on knowing how the transition layer handles hit testing is fragile across engine releases.
10. **CX-probe-override.** The probe needs `!important` on transitions and overrides rather than deletions, and `--dock-vt-plate-bg` is resolved by script at transition start. Specifically, the plate tint is read with `getComputedStyle` once per morph, so a veil change during the morph (O-62) is not tracked.

## 7 · Open gaps

- Real Safari: every cell. UNMEASURED (owner's safaridriver checkbox).
- Seat paint during a transition was not verified in pixels. W3's faces check is green through the adapter's clip, not through a capture.
- The More menu (roving, semantics, focus return) is unbuilt, and the owner's ruling on a More seat over a scroller is not asked yet.
- Capacity needs summed seat extents, not the pitch count. That is unbuilt, and it makes F measure geometry.
- The fourier CanvasControlsDock scope (`right`-anchored, inside clipping ancestors) and value.js's four-layer dock were not composed.
- The element scroll source for the compact rung and the rim: only `window` was bound. An element needs CSS written onto the consumer's scroller.
- The plate's 1.5 px border and grain during the morph are not painted by the group in the probe.
- No interruption continuity exists in the mechanism. A cure would need a script integrator, which is outside F's center.
