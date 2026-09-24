# D2 · pass 1 · SPECS · one spec per family

| field | value |
|---|---|
| seat | D2 pass 1, SYNTHESIS. It writes one spec per family from the six research reports. It does not merge the routes, because they are still incompatible, and it does not rank them |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the brief named `5804d8cc`, and the checkout read `71f2ba45` at write time. `git diff --quiet 5804d8cc HEAD -- src` and `git diff --quiet v10.0.1 HEAD -- src` both hold, so every reading below is of the v10.0.1 dock |
| inputs, read in full | `PORTFOLIO.md`; `harness/HARNESS.md`; `pass-1/W.md` (platform); `pass-1/X.md` (constellation); `pass-1/D2-A.md` … `D2-F.md` (the six research seats) |
| writes | this file only. No measurement was re-run here. Every number is cited to the report that measured it |

## 0 · How to read a spec

- **Problems** P1-P5 are `PORTFOLIO.md` §0: P1 the plate's shape, P2 the run and its paint, P3 the extent morph, P4 the state inputs, P5 the progress rim.
- **Witnesses** W1-W5 are the harness witnesses (`HARNESS.md` §5), one per problem. W-1..W-13 are the round-0 readings (`PORTFOLIO.md` §1.1). K-*, X-*, A-* and M-* rows are `X.md`.
- **Cell counts** are "passing / total" over both engines. HEAD reads W1 9/32, W2 0/10, W3 0/14, W4 4/16, W5 0/10 (`HARNESS.md` header). The D2-C and D2-E seats read W1 10/32 on their own HEAD runs.
- **Engines.** "Chromium" is headless Chromium 149.0.7827.55. "Playwright WebKit" is the Playwright 1.61.1 build that reports 26.5. It is not Safari, and its dock cells carry the harness `+shim` (`HARNESS.md` §4). **Every real-Safari cell in every family is UNMEASURED (owner's safaridriver checkbox).** No seat ran a shipping Chrome build either. Every "Chrome" statement below is headless Chromium 149.
- **Status tags** on each mechanism line:
  - **[probed]** means the research seat built it on the real dock source and ran the harness over it;
  - **[scratch]** means it was measured on a scratch page, not on the dock;
  - **[specified]** means the seat derived it and did not build it;
  - **[none]** means the family has no mechanism for that row.
- **The spring.** "The dock spring" is `springPreset("dock")`: response 0.30 s, ζ 0.88, settle band 0.02. Its clock is 210 ms: `--spring-dock-duration` resolves to it (`HARNESS.md` §3), and so does `--spring-dock-settle: 0.21s` (`scheme-spring.css:104`, W §10).
- **The floor** (`PORTFOLIO.md` §2.5, rows 1-7) binds every family. Each spec says where it implements a floor row and where it leaves one unbuilt.

---

## D2-A · the total lattice (closed-form CSS)

**Center.** Every moving length is a closed form of tokens and one scalar that CSS owns. The script measures nothing and writes only the posture class. Source of record: `D2-A.md` §2 (S-1..S-11); the probe's `aperture.css` (267 lines) and `useDockScrollTimeline.ts` (49 lines) are in scratch at `…/D2-A-research/r2/proto/new/`.

### A.1 · Mechanism

**P1 · the corner**
- **[probed]** The pad is concentric: `--dock-pad: var(--dock-padding-block)` on every side. From it, `--dock-cross: calc(var(--dock-seat) + 2 * var(--dock-pad))` and `--dock-corner: calc(var(--dock-cross) / 2)`. The plate's corner is `--dock-corner` in every rung and orientation (S-4). `--dock-cap-rest` is deleted, with no alias.
- **[probed]** The clip sits on the plate's **own** `clip-path`, never on a wrapper. A `clip-path` on an ancestor of the plate is its backdrop root, and Chromium then blurs nothing: stripe contrast 250 against 0 (Q-BR, C-6).
- **The cut cap is a ruling, not a mechanism (S-11, C-5).** Either outcome is one token line.
  - **Keep the cut:** the arm ranges are `0 min(var(--dock-pitch), 50%)` and `calc(100% - min(var(--dock-pitch), 50%)) 100%`. Q1 shows they reach both ends of a 24 px sub-pitch overflow in both engines (corner 28 → 16 px). W1 then fails 6 cells at 6.0 px (Chromium) / 5.94 px (Playwright WebKit).
  - **Drop the cut:** `--dock-cap-cut: var(--dock-cap-rest)`, which gives W1 32/32.
- **[none]** The pill↔card lerp (W-2) was not probed. The portfolio's cure is to start the lerp from `--dock-corner`, a finite length (`PORTFOLIO.md` §2.2).

**P2 · the run**
- **[probed]** The active run stays a native snap scroller (`overflow-x: auto`) with a paint gutter, laid as padding plus an equal negative margin on both axes, with scroll padding compensating.
  - `--dock-paint-reach` = (s_hover − 1)·seat/2 + (ring width + offset)·s_hover = (1.1 − 1)·40/2 + (2 + 2)·1.1 = **6.4 px** (cross axis, Q7).
  - Measured reach of glass-ui's seats: 6.25 px cross (hover + focus), and 8.25 px (Chromium) / 8.75 px (Playwright WebKit) inline on a tab (Q7).
- **[probed]** Inactive faces are `overflow: clip`, never scrollers. The scroll timeline is named only on the active run (route 2 closed: 0/81 and 0/59 frames with a scroller).
- **[specified]** Invariant S-5: `--dock-paint-reach` ≤ pad on both axes. The probe broke it on the main axis, where the 136 px open seat reaches 11.2 px against an 8 px pad, and the harness caught it (3.19 px outside the plate, C-3). S-5 names two cures and picks neither: grow the main-axis pad to the main reach, or carry the open seat's reach on the seat.
- Snap targets come from floor row 1 (`[data-dock-seat]` at any depth).
- **What CSS cannot do (C-1).** A fitting active run is still a scroll container, with range 0. Pure CSS cannot compare Σk against the available width: container-query values take no `var()`, and `scroll-state()` is Chrome-only.

**P3 · the morph (the carrier, and one closed form on three boxes)**
- **[probed] The carrier (S-1).** `--dock-extent-t` is a registered `<number>`, 1 by default and 0 on `.collapsed`, transitioned on `var(--spring-dock-duration) var(--spring-dock)`. The script's only write is the posture class. `[data-morphing]` runs from the flip to that property's `transitionend` (207-223 ms measured).
- **[probed] The collapsed extent is the only closed form (S-3).**
  - E_c = max(cross, n_c·seat + max(0, n_c − 1)·layer-gap + 2·pad).
  - n_c comes from `:has()` count rungs on the ancestor, for example `.glass-dock:has(.dock-persistent > :nth-child(2)) { --n-persist: 2 }`. The probe bounds the table at 3 per persistent region.
  - `sibling-count()` cannot replace the rungs, because an ancestor cannot read a child's count (Q4, W §11).
  - The expanded end is the in-flow box itself (its `50%`), so posture morphs need no seat lattice. The root keeps the expanded footprint in layout at every posture (the portfolio's known risk 3).
- **[probed] One aperture, three boxes (S-2).** With a = clamp(0, min(t, 1 − c), 1), the inset is δ = (1 − a)(50% − E_c/2). It is stamped on:
  1. the plate: `clip-path: inset(0 δ round var(--dock-corner))`;
  2. the controls row: `translate: (1 − a)(50% + pad − E_c/2)` (the glide), plus `clip-path: inset(−pad, 2·shift − pad, −pad, −pad)`;
  3. the elevation layer: `.dock-shadow { inset: 0 δ }`.
- **[specified]** The row clip needs `round` at corner + pad. The probe's plain `inset()` shows a square capsule edge beyond the plate's round cap at compact (S-7, C-9).
- **[specified] The anchor input (S-6).** s ∈ {0, 0.5, 1} for start, centre and end.
  - Left inset: (1 − a)·s·(100% − E_c). Right inset: (1 − a)(1 − s)(100% − E_c). The row glide is the left inset.
  - The trailing persistent region takes `position: relative; inset-inline-start: −(1 − a)·(100% − (n_ps + n_pe)·seat − gaps − seat)`, in row percentages.
  - Without S-6, a right-anchored collapsed plate paints 83 px from its anchor (C-10), and a `#persistent-end` seat is counted in E_c but painted outside it (C-11).
- **[none]** A content change on a live dock (C-2) and a layer swap (C-3) have no mechanism in this family. The in-flow box changes before any scalar can move. A closed-form swap would need per-face Σk, which quantizes every label seat in the face (Q3: triggers grow by up to +47 px).
- **Reversal.** A CSS transition retargets from the current value at zero velocity (C-13).

**P4 · state**
- **[probed] The ramp.** `--dock-c-scroll` is driven by `animation: gl-dock-compact linear both; animation-timeline: var(--dock-page, none); animation-range: 0 var(--dock-compact-distance, 200px)` on `.glass-dock[data-compact-on-scroll]`.
- **[probed] The gate.** `--dock-c-gate` is a registered number, 1 by default, with `transition: --dock-c-gate var(--spring-dock-duration) var(--spring-dock) 150ms`.
  - It goes to 0 with `transition-delay: 0s` on `:is(:focus-within, [data-held], [data-kept-open])`, and on `:hover` under `@media (hover: hover)` (S-9).
  - The compaction is `--dock-c = scroll × gate`, and the compact rung is the collapsed aperture reached by scroll, through t_eff = min(t, 1 − c).
- **[probed] The binder.** `useDockScrollTimeline` resolves the getter inside GlassDock.
  - `window` binds the root timeline. An element gets a `scroll-timeline` name, plus `timeline-scope` on `:root` (Q5: 0.5/0 in both engines).
  - The first probe passed the getter unresolved: the binding never happened, and the dock painted compact at rest (C-7).
- **[specified] The binder fails loud (S-8).** The compaction animation applies only under an attribute the binder sets after it binds. `compactOnScroll` with an unresolved source raises a dev error, and the dock stays full. The binder appends to the consumer's `scroll-timeline` and `timeline-scope` lists instead of replacing them, and refcounts a scroller that two docks share (Q5, C-8).
- **Hysteresis numbers.** There is none on position: 24 flips in 24 moves of ±4 px (C-4). The gate's release waits 150 ms. A release mid-engage holds the gate's current value for the whole delay: 0.505 (Chromium) / 0.514 (Playwright WebKit), held 120 ms or more (C-18).
- **PRM.** Both transition durations are 0: 0 intermediate frames on compaction and on posture.
- **[none]** Floor row 3 (the coarse hover latch, tap-pins) was not prototyped.
- **K-35.** On a `:collapse="false"` dock with no `#collapsed`, the compact aperture cuts the first seat (C-9).

**P5 · the rim**
- **[probed]** A child of the plate, inset by the corner, clipped by the plate's own aperture. The fill rides the page timeline. It is enabled by the `progressRim` prop, not a slot, so no consumer paint lands outside the aperture.

### A.2 · Public API delta and consumer migration

- **GlassDock gains** (probed):
  - `scrollSource?: HTMLElement | Window | (() => HTMLElement | Window | null) | null`, never a selector (K-4);
  - `compactOnScroll?: boolean`;
  - `progressRim?: boolean`.
- **Derived, not probed:** `anchor?: "start" | "center" | "end"` (S-6).
- **DockControl:** the probe added `pitches?: number` (host `inline-size: calc(k·P − gap)`). Under S-3 it is needed only if the layer swap goes closed-form, and no closed-form swap was designed (C-3).
- **Root attributes:** `data-morphing` (from the flip to `transitionend`), `data-kept-open`, `data-compact-on-scroll`, `data-rim`.
- **Tokens:**
  - `--dock-compact-distance` is new (default 200 px);
  - `--dock-cap-rest` is deleted with no alias;
  - `--dock-morph-t`, `--dock-expanded-px` and `--dock-live` go.
- **Deleted in the landing wave** (dead in the probe, not yet deleted):
  - `dockMorphMeasure.ts`;
  - the box scale and counter-scale;
  - the size blend and the vertical reserve.
- **Also owed:** the stale readers at `crossfade.css:122,130` must be rewired (C-16).

| consumer | migration it implies (`D2-A.md` §4) |
|---|---|
| chicago | Delete X-1 (the token is gone). X-2 is no longer needed for range: 0 range under hover, focus and press, and the tab's 8.25-8.75 px reach sits inside the 11.2 px main gutter. K-35: compact on its `:collapse="false"` dock cuts "Photos" by the circle (C-9) |
| value.js | K-15 stops mattering, because nothing is measured under the 1.03 ancestor scale. A-1 has nothing to hide. X-8 can read `--dock-cross`. K-8 (the four-face swap) is still one frame (C-3). X-11 and X-12 do not retire (C-2). K-10: `.glass-dock.collapsed` and `[data-morphing]` survive |
| keyframes.js | O-64 R-1 and R-3 are cured, and R-4 reads 207-223 ms. R-2 (a scene-switch width change) is not cured (C-2). K-18: no View Transition is used. K-5: M-4's wide collapsed face is clipped to E_c, so the circle is the contract, and its content moves to `#persistent` by addendum. Its three label seats need no `pitches` (S-3) |
| fourier-analysis | M-6 (right-anchored) fails until S-6 lands (C-10). M-7's badge counts as one 40 px seat (C-12). M-8/X-4: set the width unconditionally, a one-line addendum; the K-3 cap input is not provided. K-21/K-37: compaction changes no layout (the root stays 487.66 px). K-34: the binder names `<main>` |
| tests | the 21 files across tests, tests-visual and demo that name the morph or cap internals re-point (`PORTFOLIO.md` §1.3) |

### A.3 · Witnesses

| witness | HEAD | D2-A probe | green | RED, and why |
|---|---|---|---|---|
| W1 | 9/32 | **26/32**; **32/32** with the cut retargeted | every morph frame, the collapsed rest, fit, hovered fit and vertical: worst ≤ 0.137 px (HEAD 4.6-11.8 px) | rail rest, rail scrolled end and the short-viewport sidebar, both engines: the cut cap, 6.0 / 5.94 px (C-5). An owner ruling decides it |
| W2 | 0/10 | **6/10** | route 1 h/v ring cut 0.5/0.5 px (Chromium, at the bound), 0/0 (Playwright WebKit); route 2: 0 scroller frames | routes 3 and 4: the fitting active run is a scroll container in 249/249 and 230/230 frames (Chromium; 195/195 and 172/172 in Playwright WebKit), with range 0 in every frame (C-1) |
| W3 | 0/14 | **6/14** | first expand (D 385.73 px, largest step ×0.65-0.66, faces 0 px, dead landing, window 207-223 ms), warm collapse, warm expand; both engines | content add/remove: 179.33 px in one frame (C-2). Swap long/short: 244.98 px in one frame, and swap-short faces 3.19 px out (C-3) |
| W4 | 4/16 | **10/16** | compacts 206.13 → 56.03 px; hover, leave, focus, blur and top read 206.13 / 56.03 / 206.13 / 56.03 / 206.13; PRM on compaction and on posture; the menu holds | no-bounce: 24 flips (C-4). Coarse latch and tap-pins: floor row 3 not prototyped |
| W5 | 0/10 | **10/10** | rim ink 1128 (Chromium) / 1116 (Playwright WebKit) expanded, 268-318 collapsed, 265-296 compact, 0 px outside | none |

- **Family witness** (no measured geometry): not run as a witness. `dockMorphMeasure.ts` is dead in the probe, and the `pitches` refusal plus its dev warning were not built.
- **Cost** (Chromium, one expand):
  - 75-77 recalcs / 45.9-50.7 ms of style, against HEAD's 119-122 / 109-114 ms.
  - It is not compositor-only: style is recalculated every frame, the clipped plate and row repaint, and the elevation layer relays out (C-14).
  - Compaction costs 30 recalcs and 60 paints per 30 scroll steps (Q6).

### A.4 · Chrome and WebKit behaviour

- **Where they agree:** Q1, Q2, Q4, Q6 values, the resolved Q5 rows and every W1-W5 verdict. The probe's geometry agrees to ≤ 0.06 px.
- **Where they split:** on every unresolved timeline (an unscoped inner name, an unbound name, `none` on a fresh element), Chromium paints the end keyframe and Playwright WebKit paints nothing. On the live dock, a removed binding paints the end keyframe in both (C-7).
- **Not measurable in Playwright WebKit:** backdrop blur (so the backdrop-root rule is Chromium evidence only) and per-frame compositor cost.
- **Engine-only defect:** Playwright WebKit kills the web process when a script reads `Animation.rangeEnd` on a `min(48px, 50%)` range end (W §1). Paint is unaffected.
- **Reversal velocity after Escape:** Chromium goes +2.5 → −0.6..−0.9 px/ms; Playwright WebKit goes −2.62, −1.03, then 0 in one rep (§3.3).

### A.5 · Open gaps (verbatim, `D2-A.md` §7)

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

---

## D2-B · the measured scene (one script-owned model, FLIP with honest endpoints)

**Center.** One composable, `useDockScene`, reads layout at the mutation and writes the inversion before paint. The spring carries a lerp between two rects that layout produced. Source of record: `D2-B.md` §2 (items 1-10). The prototype is `$R/d2b-prototype.patch` (532 lines) plus `$R/prototype-new/` (`useDockScene.ts` 468 lines, `useDockScroll.ts` 70, `scene.css` 80), with `$R = …/D2-B-research`.

### B.1 · Mechanism

**P1 · the corner**
- **[probed]** The plate is the aperture ("box mode"). Its rounded box is the stadium, and because `inset` moves the box itself, the border, rim light, drop shadow, radius and rim all follow it (item 3). W1 reads 32/32 on every sampled morph frame. The collapsed shadow becomes a plate token, `--dock-plate-shadow`, in place of a root `box-shadow`.
- **[none]** The pill↔card lerp (W-2) was not prototyped: the root still lerps `9999px → card` (C-13).
- The report does not state the cut cap's disposition. The rail cells pass W1 at both scroll ends, so the prototype paints no cut there.

**P2 · the run**
- **[probed] The flag.** `overflowing` = Σ seat border boxes (ResizeObserver `borderBoxSize`) + gaps + run padding + dock chrome > budget + 0.01, where budget = min(max-inline-size, the parent's content box). It is written as `data-overflowing` on the run. It never reads `scrollWidth`.
- **The flag needs no hysteresis (Q2).** It matches layout truth at every 1/32 px step across ±2 px, in both engines at DSF 1 and 2 (0/129 wrong). Its inputs do not move when the run becomes a scroller (0/129 feedback). The 0.01 px epsilon only absorbs float noise.
- **[probed]** A fitting run is `.dock-run:not([data-overflowing]) { overflow: visible; scroll-snap-type: none; }`, so it is not a scroll container. An overflowing run gets the paint gutter (padding plus an equal negative margin), and the footprint does not move.
- **[specified] C-1 fix.** Sum the run's flex items **through `display: contents`**, not `run.children`. As prototyped, a `display: contents` group blinds the flag: on the long scene it reads false with 328 px of overflowing content, in both engines.
- **Known residual (C-8).** A seat whose own layout size animates across the budget, such as route 3's `inline-size` transition, can re-flip the flag. Unmeasured.

**P3 · the morph**
- **[probed] Layout follows posture (B'', item 1).** The active face is in flow. Inactive and leaving faces are `position: absolute; inset-block: 0; inset-inline-start: 0; inline-size: max-content`. The dock's size is always the current posture's layout, so no reserve is kept.
- **[probed] Invert at the mutation (item 2).**
  - A `MutationObserver` on the root watches `childList`, `subtree`, `characterData` and the attributes `class`, `hidden`, `aria-current` and `data-active`. It runs `check()` in the mutation's microtask.
  - `check()` calls `updateOverflow()`, reads the root rect once, and records rest on its first delivery, so there is no mount morph. On any later change it calls `retarget(now)`.
  - A `ResizeObserver` is the backstop for font swaps, container and viewport resizes, and inline-style width changes.
  - An RO-only build failed W3 content-add with one 179.33 px frame (×15.25 of the bound). The microtask inversion cured it.
- **[probed] `retarget(next)`.**
  - `from` = `painted()` (safe mid-flight) and `to` = next.
  - Regions are classified as lerp, hold or none. In-flow regions (persistent, layers) lerp by `translate` a·(1 − s). A leaving face holds a constant a. An entering face writes nothing and rides its parent, as does a child of a holding parent.
  - `write(from)` happens before paint.
  - The spring is `playTo(0, 1, { inheritVelocityScale: oldTravel / newTravel, onFrame })` on the dock spring.
- **[probed] The per-frame writes are plain properties (item 7):** plate `inset`, region `translate`, and `.dock-layers` `clip-path: inset(… round …)` between the persistent regions with a 3 px margin, during the morph only. No layout is read per frame: box sizes and the ancestor scale kx, ky are cached at the retarget.
- **[probed] The dead landing (item 5).** s = clamp(v, −0.5, 1). The morph lands when every edge and every lerping region is within 0.5 px. Then inline styles and `data-morphing` clear in that frame. The spring's 0.3 % overshoot (1.15 px at D 387.66) is never shown.
- **[probed] Posture versus content (item 6).** `[data-posture-morph]` gates the leaving-face fade and the stagger, with a reversal complement c0 = 1 − c. Content changes and swaps carry only `data-morphing`.
- **[specified] The next cut.** Write the leaving face's `opacity` directly, and drop the last inherited scalar (`--dock-morph-t` on posture flips). Inferred saving: about 0.2 ms per frame in Chromium and 1.5-1.9 ms in Playwright WebKit.
- **Anchoring (Q4).** It belongs to the consumer's layout (`justify-content` or `margin-inline`). The anchored point drifts 0 px in centre, start and end cells (Playwright WebKit ≤ 0.008 px), and faces never overlap the persistent region (0 px in 0 frames).
- **The layer swap.** DockCrossfade faces follow the same layout rule and retarget. W3 swap cells pass.

**P4 · state**
- **[probed] `useDockScroll`** (70 lines) sits on `createScrollReader`, the rAF-coalesced core of `useScrollTrigger`. Hysteresis goes on the per-frame reader, not on `scrollend`: in Playwright WebKit `scrollend` fires once per gesture, 677-700 ms after the crossing (Q5).
- **The numbers.** Enter at y ≥ 88 and leave at y ≤ 40 (T 64, band 48). This is pure position hysteresis: 24 moves of ±4 px around the enter point flip the posture once. The charter's "downward run of at least δ" is not needed.
- **[probed] The engagement gate:** fine-pointer hover ∪ focus-within ∪ any hold. It expands at once and re-arms 150 ms after it closes.
- **[probed] The compact rung** is a composition with no new DOM: the current seat (`[data-active]`, an `aria-current` other than `false`, or any ancestor of one), plus the persistent region, plus the rim. Every other run child gets `.glass-dock.compact .dock-run > :not(<current>):not(:has(<current>)) { display: none }`. Layout reports the new extent, and the scene morphs to it. It works without `#collapsed` (K-35).
- **[specified]** The compact selector must read `[data-dock-seat]` at any depth (floor row 1). As written it reads direct children, so docks with one wrapper around every seat do not compact (C-7). Seats that leave go `display: none` in one frame; they should be held and clipped, or faded (C-4). Neither fix was prototyped.
- **[probed] PRM:** 0 intermediate frames on compact and on posture.
- **[probed] Floor row 3.** The hover paint of icon and tab seats, and `.glass-capsule-hover:hover`, sit under `@media (hover: hover)`. The `.glass-capsule-hover` rule changes every capsule-hover consumer, not only dock seats (C-12). A coarse tap pins with 0 clicks and no latch.
- **[probed] `useScrollChrome`** retires from the dock, where it is a dead writer, and stays for StoryPage (Q6).

**P5 · the rim**
- **[probed]** A child of the plate, so the plate's rounded box clips it in every rung. It reads the same scroll reader. It is enabled by the `rim` prop, not a slot. It has no accessible semantics, because it sits in the `aria-hidden` plate (C-11, an owner call).

### B.2 · Public API delta and consumer migration

- **GlassDock gains:**
  - `scrollSource?: HTMLElement | Window | (() => HTMLElement | Window | null) | null`;
  - `compactOnScroll?: boolean`;
  - `rim?: boolean`.
- **New facts:** `.compact` on the root (a posture class, K-10); `data-overflowing` on the run; `data-morphing` keeps its role as the settle signal; `data-posture-morph` is internal.
- **Unchanged:** DockControl, and every expose (`expanded`, `isPinned`, `isHeld`, `expand()`, `collapse()`, `keepOpen()`, `release()`).
- **Removed (E-1):**
  - `useDockMorphOrchestrator` and `useDockExpandedSize`, both internal;
  - the `--dock-expanded-px`, `--dock-live`, `--dock-size-scale` and `--dock-t` machinery;
  - the scale and counter-scale;
  - `useDockSearch`'s `collapseOnScroll`, `scrollContainer` and `chromeRef`;
  - `useDockMorph.ts` (112 lines) and `dockMorphMeasure.ts` (142), which are dead in the prototype and deleted in the wave.
- The grep over value.js, keyframes.js, fourier-analysis and chicago finds 0 readers of any retired name.

| consumer | migration it implies (`D2-B.md` §4) |
|---|---|
| value.js | Nothing it reads changes. A-1: the first RO delivery records rest with no morph, so the veil has nothing to hide. K-15: the ancestor scale is divided out at the retarget; a rotate is not handled (C-6). X-8 stays, because the cross extent is not published |
| keyframes.js | A-2's font wait retires: no endpoint is taken against a fallback face (Q1). It uses no compact rung (K-34) |
| fourier-analysis | X-4/K-14: a consumer width on `.expanded` becomes the endpoint. A synthetic `width: min(900px, …)` lands on 900 px with no one-frame jump (HEAD: one 858 px frame). K-11: 0 px drift, mechanism measured on the scene but not on M-6 itself. K-34: `scrollSource` takes `<main>`. K-21: compact leaves the block extent at 56 → 56 px |
| chicago | X-1 and X-2 retire: W1 and W2 are green on the C-2 composition without either. W-3t is fixed by the floor gate. Compact through `scrollSource: window`. C-5: compact changes the inline footprint by −111.75 px on the test composition, which does not matter for a floating dock |
| tests | the 21 files that name the morph internals re-point (`PORTFOLIO.md` §1.3) |

### B.3 · Witnesses

| witness | HEAD | D2-B prototype | reading |
|---|---|---|---|
| W1 | 9/32 | **32/32** | worst 0.137 px (Chromium) and 0.048 px (Playwright WebKit), on every sampled morph frame too |
| W2 | 0/10 | **10/10** | cut 0/0 (clipped 4.25 = free 4.25; hover 4.35 = 4.35). Fitting runs are scroll containers in 0/77, 0/281, 0/230 frames (Chromium) and 0/59, 0/197, 0/176 (Playwright WebKit) |
| W3 | 0/14 | **14/14** | windows 227-264 ms against allowances of 253-285 ms; largest step ×0.64-0.66; faces ≤ 0.14 px out; dead landings, 0 reversals, 0 two-owner frames. First expand: D 387.66 px, window 242.1 ms. Three runs gave 14/14 each, with margins of 8.4, 10.4 and **2.4 ms** (C-2) |
| W4 | 4/16 | **16/16** | compact 214.13 → 101.59 px; enter 88, exit 40, 1 flip; PRM 0 frames; a coarse tap pins with 0 clicks and no latch |
| W5 | 0/10 | **10/10** | rim ink 1444 / 196 / 1264 / 198 / 752 device px, 0 outside (Chromium); 1442 / 194 / 1266 / 198 / 748 (Playwright WebKit) |

- **Nothing is left RED on the harness.** Named residuals the harness does not see: C-1 (`display: contents` groups), C-4 (compact pops), C-5 (inline footprint), C-6 (ancestor rotate), C-7 (compact selector depth), C-8 (an animated seat size re-flips the flag), C-9 (one forced layout per mutation batch), C-10 (during a collapse the larger plate absorbs clicks for about 250 ms), C-11 (rim semantics), C-12 (the capsule-hover edit reaches outside the dock) and C-13 (pill↔card).
- **Family witness** (the endpoint precedes the flip): green by the same evidence. The model equals layout truth at expand in 16/16 Chromium cells, and W3 first-expand and content cells pass.
- **Cost** (Chromium warm expand):
  - 46-47 recalcs / 42-47 ms of style, against HEAD's 74-76 / 97-113 ms;
  - layout 34 events / 1.5-1.7 ms;
  - script 10.7-11.7 ms.
  - Per write: six `inherits: false` registered px properties cost 66-70 µs (Chromium) / 84-138 µs (Playwright WebKit). HEAD's inherited scalar costs 311-425 µs / 1814-1992 µs (Q3).

### B.4 · Chrome and WebKit behaviour

- **Fonts before the first expand.** Chromium's RO re-delivers the face extent in the same frame as a font swap. Playwright WebKit holds first render until the swap font lands. Neither paints a frame whose endpoint came from a fallback face (Q1).
- **Where they agree:** the flag against truth (0/129 in both), anchored drift (0 against ≤ 0.008 px) and every W1-W5 verdict.
- **`scrollend`:** one per synthetic wheel in headless Chromium, one per gesture with a 677-700 ms lag in Playwright WebKit (Q5).
- **The consumer-width morph** (K-14): the worst early step is ×1.38-2.65 of the bound in Chromium and ×0.78-1.01 in Playwright WebKit. The cause is the spring's fixed first-frame dt (C-3, shared fact S-14).

### B.5 · Open gaps (verbatim, `D2-B.md` §7)

1. Real Safari: every cell is UNMEASURED (owner's safaridriver checkbox).
2. The direct `opacity` write that drops the last inherited scalar (§2 item 7): its cost is inferred from Q3 V3 and V4, not prototyped.
3. Paint and raster cost in Playwright WebKit: traced only in Chromium.
4. Consumer compositions not run on the prototype: M-4 and M-8's wide `#collapsed`, value.js's ancestor rotate, keyframes' View Transitions (K-18), fourier's real AnimationControls (only a synthetic 900 px rule was run), M-6 itself.
5. C-1's fix (flex items through `display: contents`) and C-7's selector fix, not prototyped.
6. The compact rung was measured horizontal only, and not at 390 px phone width (K-40).
7. The spring's first-frame dt (C-3) belongs to the spring. W3 has thin margins until it is fixed there.
8. `useDockSearch`'s scroll options and the dead `useDockMorph.ts` / `dockMorphMeasure.ts` are still in the prototype tree.
9. The sub-pixel first-frame reversal in Q4 expands (≤ 0.098 px): cause not isolated.

---

## D2-C · the physical dock (one integrator, a transform track, no scroll container)

**Center.** One body, `useDockBody`, steps every moving quantity on one `requestAnimationFrame`. No element in the dock is a scroll container. Source of record: `D2-C.md` §4 (items 1-11). The probe source did not survive (the worktree was removed). The builds under `…/D2-C-research/out3/builds/` and the scripts under `mine/` do.

### C.1 · Mechanism

**P1 · the corner**
- **[probed]** The plate is resized, never scaled: its two main-axis insets come from e. Its corner is `border-radius` at cross/2, a stadium in every rung (item 4).
- **No cut cap.** W1 requires a circle of cross/2 at the scrolled ends too. The cue for hidden seats would be content-level, an end fade on the run masked with its cross-axis ring reserve inside the mask box. It was not built.
- **[probed] The squish (item 11).** A cross-axis swell σ = 0.04 · min(1, |v_e| / 3000 px/s), applied as an inset, never as a thinning and never as a scale.
  - A thinning plate uncovered the seats by 1.11 px (C-7).
  - Peak on a 56 px dock: 58.22 px, in both engines. The swell paints σ·cross/2 ≈ 1.1 px outside the layout box on each cross side, and the root stays transform-free.
  - Resizing keeps the corner within 0.14 px up to 10 %. A scale reads 0.35 px of error at 4 % (Q4).

**P2 · the run and the track**
- **[probed] The run** is `overflow-x: clip; overflow-y: visible` (`overflow-y: clip` on a vertical dock), plus a main-axis ring reserve (padding and an equal negative margin). That computes `clip/visible` in both engines, and every programmatic scroll leaves it at 0 (Q6).
- **[probed] The track.** `.dock-track` wraps the default slot and carries the seats, with `translate: calc(-1 * var(--dock-s))`.
  - s_max = the track's layout length − the port's content length.
  - Lattice rests are each seat's start in the track's own coordinates, minus P/2, plus both ends.
  - The probe read seats as the track's children. Floor row 1 supersedes that (item 5).
- **[probed] The gesture (item 6).**
  - Pointer events on the run with `touch-action: pan-y` (`pan-x` on a vertical dock).
  - Capture only after a 6 px slop on the dominant axis. Suppress the click only after a captured drag.
  - Hold s 1:1 under the finger. Past the ends, the rubber band is f(x) = (1 − 1/(x·0.55/d + 1))·d.
  - Release velocity comes from the samples in the 100 ms before `pointerup`, including the up event, and is zero when there are none.
  - Project the release with `decayRest` (k = −ln(0.998)·1000 ≈ 2.0 /s, UIKit's documented `DecelerationRate.normal`; cited, not measured) and fling to the nearest rest, keeping the velocity. A press on a moving track catches it where it is.
  - The keyframes `Draggable` cannot be the gesture: `setPointerCapture` on `pointerdown` retargets every seat tap to the port (§3.7, C-9).
  - The pause defect: velocity averaged over moves that ended 150 ms before the lift flung the track 108-156 px (C-10). The 100 ms window above is the fix; it was specified, not re-measured.
- **[probed] The wheel (item 7).**
  - Take the main-axis delta only when it dominates the cross delta.
  - Pixel mode maps 1:1, line mode maps 1 line to 1 pitch, and page mode maps to one port length.
  - The deltas accumulate a target on the track lane, which lands on the lattice after 90 ms idle.
  - `preventDefault` applies whenever s_max > 0, ends included (where the track overpulls), and never on a dock that fits.
- **[probed] Reach (item 8).** `focusin`, click and roving retarget s to the seat's anchor and announce it. Nothing else moves the track: `scrollIntoView()` and `focus({preventScroll: true})` are no-ops on it (C-1, C-2).

**P3 · the morph**
- **[probed] The body (item 1).** A fixed set of lanes, allocated once: extent e (px), track s (px), compaction c (0-1), the rim follower r (0-1) and the face crossfade (0-1).
  - Each lane is a keyframes `SpringProgress` advanced by `tickDt` from one `requestAnimationFrame`. The spring's own `.play()` loop is never started, and the body parks when every lane has seated.
  - Lane API: `to(target)` retargets from the current (value, velocity); `hold(value)` follows a drag and writes synchronously; `fling(value, v, target)` releases.
  - `provideDockBody()` shares one body per dock through inject. A standalone DockCrossfade mints its own, and `bodyEpisode()` gives DockCrossfade its 0→1 handle on a body lane.
  - `useDockSpring.ts`, `useDockMorph.ts` and `dockMorphMeasure.ts` are deleted.
- **[probed] Seating (item 2).** The extent lane seats when |Δ| ≤ 0.5 px or on the frame it would cross its target. Overshoot below the settle band is undesigned, so it is seated. The track lane keeps its overshoot, because a flick's bounce is designed.
- **[probed] The extent (item 3).** One lane, retargeted by every change of the natural extent: posture, content, face swap and compaction.
  - **Endpoints.** The target is the root's natural box in the target DOM, read after the DOM changed and before paint. A `flush: "post"` watcher covers posture. A ResizeObserver on boxes the hold cannot resize (the track, the summary's children, the persistent regions) covers content.
  - **The hold.** While moving, the root holds a layout box of max(from, to), so nothing relayouts per frame. `morph.css` root padding reads a class constant, `--dock-pad-t` (0 or 1), not the morphing `--dock-expand-t`.
  - **Per-frame writes, px custom properties only:**
    - the plate's two main-axis insets;
    - one translate per region: persistent regions lerp between their page positions in the from and to layouts, an entering face sits at its target, and a leaving face stays where it was;
    - the faces' main-axis-only aperture `clip-path`, while moving only.
  - **Anchoring.** Edges lerp in page coordinates, so the dock morphs about whatever edge its layout anchors. Only window scroll is corrected for (C-8).
  - **The window.** One attribute, `data-morphing`, spans every extent episode. The posture fade CSS is keyed on the posture classes. The probe used `data-dock-moving` plus `data-morphing`; the one-attribute form was specified, not built.
- **[probed] PRM.** Every lane is built with `respectReducedMotion: true`, so a retarget seats in its first frame (W4 PRM cells).
- **The clock ruling (§2.3, C-4).** The spring reaches 0.5 px at 245 ms (D 100) to 262 ms (D 600), against a 210 ms clock. Two options, one to be taken:
  1. The dock register's clock becomes its 0.5 px horizon for the largest travel, `--spring-dock-settle: 0.26s` for D ≤ 600. It is one token for the CSS `linear()` horizon and for the body's seat. It was measured with the token change alone (windows 257.6-268 ms against allowances of 302.8-319.3 ms), without regenerating the `linear()` curve. The token belongs to the motion register, so it is routed as an ask.
  2. Seat at the 2 % band and ship the terminal snap: 8.53 px after 2.75 px on the first expand, and 4.68 after 1.41 on a content add.

**P4 · state**
- **[probed] Compaction (item 9).**
  - The input is `scrollSource`, a getter or an element.
  - The target c* flips to 1 above T + h, and to 0 below T − h or at offset 0. The probe used T = 120, h = 40, and measured enter 161 px, exit 76 px, 1 flip in 24 moves of ±4 px.
  - The c lane rides the dock register, so the dead band is the hysteresis.
- **[probed] The engagement gate.** Hover from a fine pointer, or focus within, holds c at 0. Holds (K-7) are not named in the report's gate.
- **[probed] The paint.** The plate resizes about its centre by k = 1 − 0.16c, and the regions scale about the dock's centre: 214.13 → 179.88 px. The posture reads `compact`.
- **[none]** Floor row 3 (the coarse hover latch, tap-pins) was not built.

**P5 · the rim**
- **[probed]** A child of the plate, which is `overflow: clip` while it holds one, so the plate's own radius clips it in every rung. Its fill is the r lane (response 0.2, ζ 1) following the source's scroll progress, in the same loop.

### C.2 · Public API delta and consumer migration

- **GlassDock gains:** `scrollSource`; `compactOnScroll` (boolean, or `{threshold, band}`); `rim` (boolean; a `#rim` slot is the stated alternative if consumers want to style the fill); and the posture class `compact`.
- **Keeps:** the `expanded`, `isTransitioning`, `expand()`, `collapse()`, `keepOpen()` and `release()` exposes, with `data-morphing` as the settle signal.
- **Changes shape:** consumer seats become children of `.dock-track`, one level deeper, and the run stops being a native scroller.
- **Loses:** nothing public. `useDockMorphOrchestrator` was on the internal barrel.
- **Tests:** three test files import deleted modules (`GlassDock.motion-parity.test.ts`, `g-dock-lattice.test.ts`, `dockMorphMeasure.test.ts`), and they, with the 21 files that name the internals, are rewritten.
- **Ask to the motion register:** the dock clock token (C.1 P3, option 1).

| consumer | migration it implies (`D2-C.md` §5) |
|---|---|
| chicago | Delete X-2: it would un-clip the main axis and is a stale override. X-1 is deleted with the token and the cut cap. Its `window` source binds to `scrollSource` |
| value.js | A-8's wait on `[data-morphing]` works. A-1: the infinite scroll-timeline animation that veiled "forever on WebKit-mobile" is gone. X-11's CSS width transition retargets the extent lane every frame: two owners (C-5) |
| keyframes.js | A-2 retires: endpoints are re-read in flow at every retarget. M-A (the transport's collapsed face) **still paints outside the plate at rest**, because faces are clipped only while moving (C-6). `expand()` is unchanged, and its jsdom setup already shims RO |
| fourier-analysis | X-4 becomes part of the natural target, so the 102 → 960 px expand would morph. M-6 would morph about its right edge. Both by mechanism only, with no scene built |

### C.3 · Witnesses

| witness | HEAD (`991067c8`) | D2-C probe | at `--spring-dock-settle: 0.26s` | RED, and why |
|---|---|---|---|---|
| W1 | 10/32 | **32/32** (worst 0.137 px, squish on) | not re-run | none |
| W2 | 0/10 | **10/10** (0 scroll-container frames on every route; ring cut 0/0) | not re-run | none |
| W3 | 0/14 | **3/14** | **14/14** | at the shipped clock, the window alone, 1-6 ms over (for example 258.3 > 253.3 ms). Every other check passes: steps ×0.65-0.66, faces ≤ 0.14 px, dead landings, 0 owners. O-64 R-1, R-2, R-3 and R-5 cured |
| W4 | 4/16 | **12/16** | not re-run | coarse latch and tap-pins, ×2 each: floor row 3 not built |
| W5 | 0/10 | **10/10** (0 device px outside in all five rungs) | not re-run | none |

- **Family witness: GREEN.** 0 elements with `auto`, `scroll` or `hidden` overflow across 9 scenes, in both engines. A flick rests on the lattice (328). A 120 px overpull shows −55.38 px, then returns to 0 in 254 ms (Chromium) / 259 ms (Playwright WebKit).
- **One edit after the harness run:** the live region's `overflow: hidden` became `clip`, and W1-W5 were not re-run after it.
- **Loop accounting.** The body runs 0 frames at rest, and 30 (Chromium) / 17 (Playwright WebKit) on a first expand. The page still requests 240 / 120 frames per 2 s at idle, from `useGlassBackdropLuminance`, at HEAD and in the probe alike (C-11, shared fact S-22).
- **Named residuals outside the harness:** C-1 (AT cursor), C-2 (consumer `scrollIntoView`), C-3 (iOS momentum parity), C-5 (CSS size transitions on seats), C-6 (faces unclipped at rest) and C-8 (a non-window scroller mid-morph).

### C.4 · Chrome and WebKit behaviour

- **Where they agree:** W1, W2 and W5 pass every cell; the compact and PRM cells of W4 pass; the family witness reads 0; and the gesture, reach, wheel and clip readings match.
- **Where the input differs:** headless Chromium delivers `deltaX` 50 for a 100 px wheel at DSF 2, and Playwright WebKit cannot synthesize a touch move.
- **Frame cadence** is the one engine difference in motion: about 8.5 ms (Chromium) against about 17 ms (Playwright WebKit). The first probe's velocity-gated seat overshot 1.13 px with 1 reversal in WebKit. The crossing seat removed it in both engines.
- **The touch gesture** was measured in Chromium emulation only. The body owns the horizontal gesture (1 down, 10 moves, 0 cancels) and lands 182 ms after it, where HEAD's native fling landed after 496 ms.
- **The page pan.** A vertical pan starting on the dock goes to the page (524 px). At HEAD it does not (0 px), because `touch-action: pan-x` claims it. A vertical wheel over the dock scrolls the page (+100 px); at HEAD it does not (Chromium).
- iOS Safari, VoiceOver and TalkBack: UNMEASURED.

### C.5 · Open gaps (verbatim, `D2-C.md` §8)

- iOS Safari, real Safari 26.4, VoiceOver and TalkBack: every cell UNMEASURED.
- The register clock (§2.3) is an ask to the motion canon. The probe measured only the token change, not a regenerated `linear()` curve.
- No content-level cue for hidden seats was built: the cut cap is gone and nothing replaces it.
- Floor row 3 (the coarse hover latch, tap-pins) was not built, and W4 fails those four cells.
- fourier's M-C and M-6, and value.js's X-11 under the body, are unmeasured.
- Per-frame cost was not profiled. W3's strips ran continuous 8.5 ms frames in Chromium.
- The unit tests that import the deleted modules were not rewritten or run.
- A V↔H morph on a two-dimensional extent was not attempted.

---

## D2-D · the drawn silhouette (the plate is one parametric path)

**Center.** One `shape()` command template, written once, is the plate's clip, hit region, edge, shadow source and rim track. Source of record: `D2-D.md` §8 (items 1-7) and §7.1. The prototype diff is `…/D2-D-research/prototype.diff` (733 lines; 12 files, +373 / −135).

### D.1 · Mechanism

**P1 · the corner**
- **[probed] The template (§1).** Nine commands with four corner radii and box edges x0, x1, y0, y1:
  ```
  shape(from calc(x0 + tl) y0,
    hline to calc(x1 - tr),  arc to x1 calc(y0 + tr) of tr cw,
    vline to calc(y1 - br),  arc to calc(x1 - br) y1 of br cw,
    hline to calc(x0 + bl),  arc to x0 calc(y1 - bl) of bl cw,
    vline to calc(y0 + tl),  arc to calc(x0 + tl) y0 of tl cw,  close)
  ```
  - Horizontal: tl = bl = r_s and tr = br = r_e. Vertical: tl = tr = r_s and bl = br = r_e.
  - Each corner is r·(1 − κ) + cut·κ, with r = clamp(0, rest, cross/2). The clamp closes W-2's negative overshoot.
  - rest is set per shape: pill 9999 px, rounded `--radius-card`, card the lerp on `--dock-expand-t`. cut = min(`--dock-cap-cut`, r).
  - A zero-length `hline` (vertical pill, 64 wide, r 32) is legal, so the command list stays identical in every rung and orientation.
  - Radius error: 0.08-0.12 px (Chromium), 0.01-0.03 px (Playwright WebKit).
- **[probed] One path text, one resolution rule (item 1).**
  - The path is `--dock-sil`, and its complement is `--dock-sil-outside` (`evenodd`: a big rect plus S). Both are declared once, in one rule whose selector lists every consumer: `.dock-plate`, `.dock-edge`, `.dock-shadow` and its fill, and `.glass-dock[data-morphing] > .dock-controls`.
  - Unregistered custom properties substitute `var()` on the declaring element, so each consumer resolves the same text against its own `--dock-i` (inset).
  - The radii resolve on `.glass-dock` (κ = 0, read by the aperture) and on `.dock-frame` (κ live).
- **[probed] cross.** `arc … of` needs a length, and `cq` units need a size container that no intrinsically sized dock box can be. So cross is the layout cross extent, measured once per resize. The probe wrote `--dock-cross-px` from `dockMorphMeasure.ts`.
- **[probed] κ.** κ_s and κ_e are registered `<number>`s with `inherits: true`, animated on `.dock-frame` by the existing `--dock-run` timeline over `0 min(pitch, 50%)` and `calc(100% − min(pitch, 50%)) 100%`.
- **What W1 does to κ.** W1 as written forbids the cut cap: every rest must be cross/2. With κ live, W1 reads 12/32; with κ disabled (`d-nokappa`), 28/32 (§7.2).
- **[probed] The edge.** `.dock-edge` fills everything outside S inset by 1.5 px. The plate's own clip bounds it. The plate's `border` is struck.
- **[probed] The shadow.** A sibling `.dock-shadow` carries `filter: drop-shadow(0 0 calc(6px + 4px·t) …)` over a fill clipped to S, and its own clip keeps only what lies outside S. The box `box-shadow` is struck.
- **[specified] One elevation fact.** A σ token from which `--shadow-dock`'s `box-shadow` form derives (item 6). `drop-shadow` takes a standard deviation, which is half the `box-shadow` blur (Q3). The token was not designed.

**P2 · the run**
- **[none]** D has no run mechanism. The portfolio names D2-A's gutter as its sub-choice. The prototype left the run at HEAD, and W2 reads 0/10.
- κ arms whenever the run is a scroll container, including the hidden layer (route 2) and a hover scale (route 4). So D shapes the lens exactly without removing it from docks that fit (C-2).

**P3 · the morph**
- **[probed] The extent.** `--dock-e` is `100%` at rest, and `var(--dock-live)` (HEAD's spring px blend) while `[data-morphing]`. The probe centres it: x0 = 50% − e/2.
- **[specified] The anchor (item 3).** x0 = anchor-edge + (box − e)·a, with a ∈ {0, ½, 1} from the consumer's anchoring. The probe hard-codes ½, which fails K-11.
- **The endpoints are a sub-choice**, D2-A's or D2-B's (item 2). The prototype kept HEAD's, so W-6 and W-13 read as at HEAD.
- **[probed] The faces.** `.dock-controls` becomes a real flex box whose border box is the dock box, with the root's padding moved onto it. It takes `clip-path: var(--dock-sil)` and `justify-content: center` only while morphing, so nothing clips a seat at rest.
- **Struck:** the box `scale` morph and the counter-scaled faces, `--dock-size-scale`, the four `gl-dock-cap-*` keyframes, the plate's `inset()` clip, the `--dock-t` alias, `[data-reserve]` and the PRM `--dock-t` pin.
- **[none] The layout rule during the morph (item 4, C-1).** Rung content has to be laid out about the silhouette, not across the reserved box. Without that rule, a warm collapse clips the incoming face to nothing and shows it at settle. The family is not finished without it, and no design exists for it.
- **[probed] The hit region (item 5).**
  - The root is `pointer-events: none`, and only the plate and seats are `auto`, so the hit region is the silhouette ∪ the seats.
  - The prototype sets the active layer and the persistent groups to `none` and re-enables their descendants.
  - A consumer wrapper inside a seat slot is `auto` again and absorbs the corner (C-5).

**P4 · state**
- **[none]** Borrowed: the state composable (`PORTFOLIO.md` §3, D2-B's). Not built, and W4 reads 4/16 as at HEAD.

**P5 · the rim**
- **[probed]** An SVG `path` (`svg.dock-rim` inside `.dock-plate`, holding a track and a fill). Its geometry is written as an **attribute**, because the CSS `d` property is `path()`-only in Chromium and absent in Playwright WebKit (§1).
  - `useDockRim.ts` (75 lines) writes it from the dock box on a ResizeObserver.
  - Progress comes from a scroll listener on the source, written as `--dock-progress`.
- **[probed] The sub-path (item 7).** The leading half of the silhouette, never the loop: from 9 o'clock round the bottom to 3 o'clock. Stroke 3 px with round caps, centre line inset 4.5 px, `pathLength="1"`, `stroke-dasharray: 1 1`, `stroke-dashoffset: 1 − p`. The fill's leading end lands within 0.5 px of the arc-length target in both engines (Q5).
- **[specified]** The sub-path must read the frame's resolved radii, or it drifts under κ. Today the plate's clip masks the drift, so W5 cannot see it.
- The track's contrast is untuned: at 10 % it falls below the harness ink threshold, and at 18 % it reads as an inner groove line (C-10).

**The DOM.** `.dock-frame > (.dock-shadow > i, .dock-plate > (.dock-edge, svg.dock-rim > track + fill))`.

### D.2 · Public API delta and consumer migration

- **GlassDock gains** `progressSource?: HTMLElement | Window | (() => HTMLElement | Window | null)`, never a selector. It renders the rim. A compact rung is not part of D.
- **Tokens:** `--dock-cap-rest` is struck with no alias, and `--dock-cap-cut` stays as the cut radius. `--dock-sil-rest` is new, per shape. The κ properties are internal.
- **DOM:**
  - `.dock-plate` stays the veil element (floor row 6) but moves one level down, under `.dock-frame`;
  - `.dock-controls` becomes a box;
  - `[data-reserve]` is struck;
  - the root is `pointer-events: none`.
- **No successor:** `--shadow-dock-override` has none in the prototype.

| consumer | migration it implies (`D2-D.md` §10) |
|---|---|
| chicago | X-1 dies with the token. X-2 does **not** retire, because D leaves the run to another sub-choice. The X-3 veil overrides still bind |
| value.js | `useContrastSafeColor.ts:152` is unchanged. `useDockArrival.ts` screens out the two ScrollTimeline-driven animations, now on `.dock-frame`, the same class as today. X-12 and X-8 are untouched |
| keyframes.js | `expand()` and `--dock-layer-gap` are unaffected. M-A's wide `#collapsed` is clipped by the silhouette during and after a collapse, which forces K-5 toward "the circle is the contract" |
| fourier-analysis | CanvasControlsDock (K-11) fails until the anchor parameter lands. X-4 is a second extent owner that e does not see |
| all | CSS that styles `.glass-dock`'s `box-shadow` (`--shadow-dock-override`) or its padding re-points: the shadow lives on `.dock-shadow` and the padding on `.dock-controls` |
| tests | the 21 files re-point (`PORTFOLIO.md` §1.3) |

### D.3 · Witnesses

| witness | HEAD | D2-D prototype | green | RED, and why |
|---|---|---|---|---|
| W1 | 9/32 | **12/32**; **28/32** with κ disabled | rest and morph frames are exact stadiums once κ is not armed | with κ live: the rails by design (mean r 34.3 against 32), collapsed morph docks by route 2 (4.6-6.0 px), and WebKit's hovered fit by route 4 (4.59 px). With κ off: 4 Chromium warm-morph cells at 6.265 / 6.975 px, which appear only when the probe paint sets `backdrop-filter: none` (C-4) |
| W2 | 0/10 | 0/10 | none | D owns no run mechanism |
| W3 | 0/14 | 0/14 | **faces out 0 px in all 14 cells** (HEAD 147-158 px); warm steps ×0.66 | first expand is one 387.66 px step; window 542-550 ms against a 210 ms clock; 0.34 / 0.28 px ring; content and swap steps of 179.33 / 244.98 px with no window. These rows belong to the endpoint and carrier sub-choices D borrows |
| W4 | 4/16 | 4/16 | none | the state composable is borrowed and was not built |
| W5 | 0/10 | **8/10** | every horizontal and vertical rung, expanded and collapsed, both engines: 0 px outside, 888-2,158 device px of ink | the two compact cells: no compact rung |

- **Family witness: GREEN on the prototype** (§7.4). Presses in the corner outside the arc (+1.5 and +4 px) and in the mid-collapse reserved footprint reach the page in both engines; HEAD's reach the dock box. Pill, rounded and card rests fit within 0.08-0.12 px (Chromium) / 0.01-0.03 px (Playwright WebKit).
- **C-1:** the prototype turns "faces outside the plate" into "faces invisible inside the plate" (§7.3).

### D.4 · Chrome and WebKit behaviour

| behaviour | Chromium 149 | Playwright WebKit |
|---|---|---|
| the template parses and paints, all rungs | yes, ≤ 0.122 px | yes, ≤ 0.032 px |
| parameter interpolation (rAF, WAAPI, keyframes, scroll timeline) | yes | yes. Under a screenshot, CSS transitions paint their end value, which is an instrument artefact |
| animated clip over `backdrop-filter` | main thread | main thread |
| `clip-path` hit testing | exact | exact |
| `drop-shadow` = `box-shadow` blur / 2 | yes | yes |
| `border: 1.5px` at DSF 2 | 1 CSS px, so the drawn 1.5 px edge is heavier than today's Chrome dock (C-8) | 1.5 CSS px |
| CSS `d` property | `path()` only | none |
| `pathLength` dash position | ±0.5 px | ±0.5 px |
| the in-dock corner defect without a backdrop filter | 6.25 px (C-4) | not seen |
| GlassDock mount | fine | crashes without the shim (the nested `color-mix()` moved to `.dock-edge`) |

- **The V↔H morph** as a path reads as inflate-then-deflate. At t = 0.5 the plate is 232 × 308, 3.2× the pill's area. So D does not revive V↔H (Q6, C-9).
- **The grasp register** drops the plate's clip while a carrier is live, and under D the clip is the silhouette itself. The two cannot both own the plate's clip (C-6).

### D.5 · Open gaps (verbatim, `D2-D.md` §12)

- Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox), including whether Safari 26.4 keeps a scroll-driven registered number that feeds `clip-path` off the main thread.
- C-1 is not solved in the prototype. D needs the layout-about-the-silhouette rule, or an endpoint sub-choice that lays content out at the live extent, before W-7's "no face outside the plate" means "every face visible inside it".
- C-4 is not isolated to a minimal page. Its trigger inside the dock DOM is unknown beyond "no backdrop filter on the plate, path changing per frame".
- The anchor parameter (K-11) and the rim's κ-aware sub-path were specified, not built.
- The track contrast and the "second border" reading (Q5) are judged by eye from captures, not by any test.
- W3's endpoint, window, ring and content rows, and W2 and W4, belong to sub-choices D borrows; the prototype leaves them at HEAD's readings.
- The σ elevation token and a successor for `--shadow-dock-override` were not designed.

---

## D2-E · the anchored projection (paint lives outside the port)

**Center.** Seats paint glyphs only. All state paint is a projection anchored to its seat, and the plate is an anchored projection of the dock box, so the platform's anchor solver is the geometry engine. Source of record: `D2-E.md` §2 (items 1-10) and §3. The probe patch is `…/D2-E-research/d2e-probe.patch` (4 files, +174 / −20), with adapter `adapter-e.mjs`.

### E.1 · Mechanism

**P1 · the corner**
- **[probed]** `border-radius: 9999px` on a pill plate, and the cut-cap timeline on the plate is struck (item 8). The plate is the only owner of the corner, so the cap question moves to the rim or to the scroll affordance. No such affordance is designed.
- **[probed]** No box `scale` squashes the corner, because the plate animates its insets.

**P2 · the run (the family's center)**
- **[probed] Seats are glyph boxes (item 1).**
  - Inside a dock run, every seat (`DockControl` of either shape, `DockTrigger`, and any `[data-dock-seat]`) is `position: static; isolation: isolate`.
  - A seat has no `background`, `box-shadow`, `backdrop-filter`, `outline`, `scale`, `filter` or inline press transform of its own.
  - Each seat declares `anchor-name: --dock-seat; anchor-scope: --dock-seat`.
  - Outside a dock the same seat is `position: relative` (Q3).
- **[probed] One projection per seat (item 2).**
  - The seat's `::after` is `content: ""; position: absolute; position-anchor: --dock-seat;` with all four insets `anchor(…)`, `z-index: -1` and `pointer-events: none`. With the seat static, its containing block is outside the run: the port does not clip it, and it adds nothing to the run's scrollable overflow.
  - It carries the whole state register:
    - the hover fill and lift (`scale: var(--scale-hover-dock)`), under `@media (hover: hover)` only;
    - the selected fill and rim (`--dock-control-active-bg`, `--glass-rim-top`, `--glass-rim-bottom`, `--glass-shadow-capsule`);
    - the press fill, plus a press `scale: calc(1 − var(--dock-press-t, 0) · 0.04)` read from the inherited `--dock-press-t`, which `useLiquidPress` already writes;
    - the focus ring, as its `outline` + `outline-offset`.
  - The specular `::before` is re-anchored the same way.
  - The landing form must paint `background` (an image), not `background-color`, so fourier's rainbow knob works (X-6). The probe used `background-color`.
- **[probed] The run scrolls only when its seats exceed its box (item 6).**
  - `.dock-run` is `overflow: clip; min-inline-size: 0`. It becomes `overflow-x: auto` only on the active face and only under `[data-overflowing]`.
  - The bit is written by one ResizeObserver over the run and its seats, reading `scrollWidth − clientWidth > 0.5` (or the block-axis pair).
  - Because no seat paints past its box or transforms, the native reading equals "the seats genuinely exceed" in this family. It is a binary read, not a geometry read.
- **[scratch] The dock clips its main axis (item 7).** `overflow-x: clip` (`overflow-y` on a vertical dock). That clip is not a scroll container, so the ring's cross-axis reach stays whole, and a scrolled-out seat's projection is cut at the dock edge in both engines (Q6 K). Measured on a scratch page, not on the dock.
- **[scratch] One glide projection for single-select (item 3).** An element in the plate layer carries `position-anchor: --dock-selected`. The one selected seat of a single-select group (`role=radiogroup|tablist`, or the dock's `aria-current`) names `--dock-selected`. Its insets transition on the dock spring: the eyeglass tab (Q1 case A). Multi-select pressed state paints per seat, so "selected" has two geometry paths (C-3).
- **[specified] Triggers (C-8).** `DockTrigger`'s `::after` is its 44 px hit slop (`controls/touch-floor.css:42-60`). Converting it moves the hit slop into the seat box, the trigger's box becomes the hit cell (X-5's ask), and the painted footprint grows on dense rungs. The probe converted icon and tab seats only.

**P3 · the morph**
- **[probed] The plate is an anchored projection of the dock box (item 4).**
  - The dock is `position: static; isolation: isolate; anchor-name: --dock-box; anchor-scope: --dock-box, --dock-selected`.
  - The plate is `position: absolute; position-anchor: --dock-box; position-visibility: always`. All four insets are `anchor(…)`, each transitioned on `var(--spring-dock-duration) var(--spring-dock)`, and `transition: none` under PRM.
  - Its containing block is the host's nearest positioned ancestor, which does not move with the morph. So a layout change of the dock box, whether posture, content, a face swap or the first expand, changes the anchored insets and fires the transition (Q1 case D).
- **[probed] The containing-block law.** Nothing on the dock may form a containing block for positioned descendants: no `transform`, `will-change: transform`, `filter`, `contain` or `container-type`. HEAD violates it at `shell.css:150-173` (`contain: layout style`) and `shell.css:425` (`will-change: transform` on the vertical dock), and `scroll-chrome.css:76` would too. A single `will-change: transform` turned the plate into a 2×2 px box (Finding 7, C-5). `position: fixed` is refused, because it lags on page scroll (Finding 8).
- **[probed] `position-visibility: always`** on the plate is required: the initial value `anchors-visible` hid the plate whenever its anchor was `visibility: hidden`.
- **[probed] The window (item 5).** It is the plate's own transition: `transitionrun` opens it, and `transitionend` or `transitioncancel` closes it, counted per property on the plate. The probe's attribute is `[data-plate-moving]`.
- **Deleted, not bypassed:** the script spring, `--dock-morph-t`, the box `scale`, the counter-scaled faces, the footprint hold, `useDockSpring`, `dockMorphMeasure.ts`, and the `[data-morphing]` blocks of `layers.css`, `shape.css`, `morph.css` and `crossfade.css`.
- **[none] The faces.** The faces jump with layout. No primitive clips in-flow faces to an anchored box: `clip-path`, `mask-position`, `translate` and `border-radius` reject `anchor()` and `anchor-size()` in both engines (Q2). Both remaining routes are refused inside the family:
  - a positioned clipper plus an in-flow reserve is a dual render or a measurement;
  - opacity coupling hides the mechanism (E-2).
- **Canon P5.** The plate's inset transition animates a layout box: 41-42 layouts / 25-31 ms over a first expand (Chromium). The family takes the amendment reading, "a box whose geometry is read by nothing may animate its insets", and needs the owner's ruling (C-9).
- **Reversal.** A CSS transition reversal turns −0.42 px/ms into +0.305 (Chromium) / +0.314 (Playwright WebKit) in one frame (C-4).

**P4 · state**
- **[none]** The compact rung and the posture inputs are the shared composable's (item 10). This family's one contribution is structural: the hover paint is gated under `(hover: hover)` on the projection, so a coarse tap cannot latch paint.

**P5 · the rim**
- **[specified]** A child of the plate, clipped by the plate's rounding with `overflow: clip` (item 9). Not probed: no rim prop was added.

### E.2 · Public API delta and consumer migration

- **Props:** none added for P1-P3. The rim and the compact rung come with the shared composable's API.
- **Behavioural contract changes (clean breaks):**
  - `DockControl` paints its state on its own `::after`.
  - Inside a dock a seat is `position: static`, so a consumer child positioned against its seat resolves against the dock's host.
  - The dock is `position: static`, and may not carry a containing-block-forming property.
  - `useScrollChrome`'s recipe (`will-change: transform` + `transform: scale()` on the root) is incompatible and retires.
  - The capsule's second `backdrop-filter` on selected seats is removed, a visual change the veil seat (O-62) must accept or re-rule.
- **Deleted:** as listed in E.1 P3, plus the state paint in `icon-button.css`, `tab-button.css`, `triggers.css` and `controls.css`. About −600 / +250 lines (estimate).

| consumer | migration it implies (`D2-E.md` §5) |
|---|---|
| value.js | `--dock-control-hover-bg` / `--dock-control-press-bg` keep their names and now paint the projection. X-13's `.action-icon:hover { transform: scale(1.2) }` is the consumer's reach contract (K-33). X-11 is still a second owner of width: the plate follows it, but at the consumer's pace. The 5 hostless DockControl workbench sites need no change |
| keyframes.js | `scale-on-hover` on the TransportDock glass `Button` stays a transform in the port unless the Button is stamped `[data-dock-seat]`. ChromeDock's `DockTrigger`s follow the trigger conversion. `useMenubarMeasure` is unaffected |
| fourier-analysis | the rainbow knob needs `background`. `.view-dot` (X-14) would fly to the host corner, so it re-anchors with `position-anchor: --dock-seat` (marked addendum). The canvas docks under `overflow: hidden` ancestors stay within the silhouette except for the hover lift and ring |
| chicago | X-1 and X-2 retire. X-3 is the interface |

### E.3 · Witnesses

| witness | HEAD (this seat's run) | D2-E probe `e4` | green | RED, and why |
|---|---|---|---|---|
| W1 | 10/32 | **32/32** | every rest and sampled morph frame, worst 0.137 px (Chromium) / 0.01-0.046 px (Playwright WebKit), including the short-viewport sidebar and both rail ends | none |
| W2 | 0/10 | **10/10** | routes 2-4: 0 frames with a scroll container and 0 with range; ring cut 0/0 on the long run and under hover-scale | none |
| W3 | 0/14 | **6/14** | the 6 shrinking transitions. On all 14 cells: steps ×0.65-0.66, dead landing with 0 reversals (O-64 R-3), window 207.3-218 ms against the 210 ms clock (R-4), 0 owners (R-5). Content add morphs: 179.33 px over 208.4 ms (R-2). First expand continuous 102 → 489.66 px (R-1) | the 8 growing transitions fail on **faces only**: 181.83 / 181.86 px on the expands, 77.67 / 77.7 on content add, 110.48 / 110.53 on swap long (Chromium / Playwright WebKit). No primitive clips in-flow faces to an anchored box (Q2) |
| W4 | 4/16 | **6/16** | the coarse no-hover-latch cell turns green in both engines | compact ×4 per engine (the shared composable, absent); tap-pins ×1 per engine (the Play click fires, `useDockState`). The latch green is read on the seat; no pseudo was read after a coarse tap |
| W5 | 0/10 | 0/10 | none | not probed: no rim prop |

- **Family witness** (the port paints nothing past a seat box): not run as a separate witness. W2 route 4 reads 0 range frames, and the ring cut is 0/0.
- **Cost** (Chromium first expand): 41-42 layouts / 24.94-30.76 ms, 42-43 recalcs / 17.68-21.01 ms, task 95.1-110.1 ms, against HEAD's 65-66 / 3.48-3.84, 116-118 / 83.81-94.08 and 149.1-163.9 ms.
- **Hover churn** (Q4): the per-seat projections cost 307 layouts / 35.17 ms per 240-move sweep, against HEAD's 79 / 5.05. Frame p50 8.3 ms and p95 ≤ 10.1 ms in every mode; Playwright WebKit p95 18-19 ms.

### E.4 · Chrome and WebKit behaviour

- **Where they agree:** every harness verdict, cell for cell.
- **Where the platform rows split:**
  - **`position-visibility`:** Chromium hides a scrolled-out seat's projection. Playwright WebKit paints it outside the port, on the page beside the dock. The main-axis dock clip closes that in both engines (Q6, C-6).
  - **The keyword:** Chromium parses `anchors-visible` only; Safari 27 renamed it `anchor-visible` and keeps the old spelling for now.
  - **Scroll compensation:** a scroller between the plate's containing block and the dock shows the plate one frame late in Chromium (C-2). A `position: fixed` plate transitions on every page scroll in Playwright WebKit (100 → 58.5 px at 150 ms).
  - **`position-anchor: normal`** parses in Playwright WebKit only.
- **Transitioned anchors:** both engines resolve `anchor()` into the transitioned value in every case that moves the anchor (Q1: midpoints at 0.50-0.54 of travel at half the clock).

### E.5 · Open gaps (verbatim, `D2-E.md` §7)

- Real Safari 26 / 27: every row, including `anchor-scope`, anchored-inset transitions, the scroll-compensation timing, and `position-visibility`. UNMEASURED (owner's safaridriver checkbox).
- W5 (the rim as a plate child) was not probed. It needs a rim prop or slot on the plate.
- The glide projection, the main-axis dock clip and the trigger conversion were specified and measured on scratch pages (`q.mjs` A, `q6.mjs` K), not on the real dock.
- The coarse-tap hover-latch green is read on the seat only. A pseudo read after a coarse tap was not taken on the real dock.
- Compositor lag of anchored projections during the press `scale` spring is not observable headless (W.md §13).
- The fourier `.view-dot` re-anchor, the rainbow knob as `background` (not `-color`), and value.js X-11 retirement are consumer addenda, not measured at the consumers.
- The mid-morph reversal (C-4) has no witness in the harness.

---

## D2-F · discrete rungs, carried by the user agent

**Center.** A statechart over typed inputs picks among static rungs, and View Transitions draw every in-between. No rung scrolls. Source of record: `D2-F.md` §2 (items 1-9) and §1.5. The probe patch is `…/D2-F-research/d2f-probe.patch` (11 files, +399 / −244), with adapter `adapter-f.mjs`.

**Standing verdict from the research:** **BLOCKED under D-4** (Q1). Element-scoped view transitions do not exist in WebKit: Playwright WebKit lacks `Element.prototype.startViewTransition`, WebKit standards position #611 is open with 0 comments, and no implementation bug exists. The document fallback swallows every click on the page in both engines. The spec below is the strongest form as measured, stated for completeness. It is not a recommendation.

### F.1 · Mechanism

**P1 · the corner**
- **[probed]** Each rung's plate is `border-radius: 9999px`, so the radius clamp gives the stadium. There is no cut cap.
- **[probed] During a morph the plate is painted by its group, not its snapshot (item 3).**
  - `::view-transition-old(dock-plate)` and `::view-transition-new(dock-plate)` are hidden (`animation: none; opacity: 0`).
  - `::view-transition-group(dock-plate)` paints `background: var(--dock-vt-plate-bg)` and `border-radius: 9999px`.
  - `object-fit: none` leaves gaps, and `fill` stretches the corners into a lens.
  - W1 in-frame worst: 0.388 px (Chromium).
  - `--dock-vt-plate-bg` is resolved by script with `getComputedStyle` once per morph (C-10). The 1.5 px border and the grain are not painted by the group.

**P2 · the run**
- **[probed] No scroll container (item 6).** `.dock-run { overflow: visible }`, with no snap and no cut-cap timeline.
  - Seats beyond capacity get `[data-dock-folded]`.
  - A More seat is appended in the run: `.dock-icon-button.dock-more`, `aria-haspopup="menu"`.
  - Capacity is fed by one ResizeObserver on the parent and one MutationObserver on the run.
- **[specified] Capacity must sum seat extents (C-7).** K = floor((budget + gap)/P) is wrong both ways:
  - chicago overflows by 9 px at 360 px with no fold;
  - the harness rail's last seat ends 16 px outside the plate, because the vertical run's real pitch is 52.4 px against 48;
  - keyframes' ChromeDock folds 2 seats for a 14 px overflow.

  Summing seat extents makes F measure geometry. It is unbuilt.
- **[none]** No menu was built behind the More seat (C-8).

**P3 · the morph**
- **[probed] The scope is a stable ancestor (item 1).** `dockEl.parentElement.startViewTransition(apply)`. A scope's own box is not interpolated: with `dockEl.startViewTransition` the centred dock's left edge jumped 669 → 475 px. The scope is therefore a consumer-owned element, and every hit test inside it falls through for the duration.
- **[probed] The dock is one group containing the others (item 2):**
  ```css
  .glass-dock { view-transition-name: dock-box; view-transition-group: contain; }
  .glass-dock > .dock-plate { view-transition-name: dock-plate; container-type: size; animation: none; }
  .glass-dock :is(.dock-icon-button, .dock-tab-button, .dock-trigger) { view-transition-name: match-element; }
  :has(> .glass-dock)::view-transition-group(*) { animation-duration: var(--spring-dock-duration);
      animation-timing-function: var(--spring-dock); }
  :has(> .glass-dock)::view-transition-group-children(dock-box) { overflow: clip; border-radius: 9999px; }
  ```
- **[probed] One owner per rung property (item 4).** `.glass-dock { transition: all }` and run.css's `inline-size` seat transition are deleted. They ran inside the live new snapshot and settled the extent about 100 ms late.
- **[probed] Rungs are static (item 5).** Inactive faces and inactive `DockLayer` faces are `display: none`, which retires R2-02-06's live scroller.
- **[probed] Every visual state change is a rung change (item 7).** Face swaps route through `DockContext.transition(apply)`. DockCrossfade keeps a `shown` ref that lags the caller's `active` and is written only inside the transition.
- **[none] Content changes.** A consumer's `v-if` seats or text cannot be routed, because a transition must start before the DOM changes.
- **[probed] PRM (item 9)** commits with no transition. With no scoped API (WebKit), the change commits with no transition plus a `console.warn`: honest, and a one-frame morph.
- **Retargeting (Q3).** Not possible.
  - A second `startViewTransition` captures the committed DOM and jumps +220.8 px.
  - `skipTransition()` jumps −78.9 px.
  - Reversing the running animations is position-continuous, but velocity goes +1.21 → −1.22 px/ms in one frame, and it can only return to the origin rung.
- **The lens (Q2).** During a scoped transition Chromium paints the tint only, with no blur. Sharpness is 21.1-23.4 during the morph against 0.54-0.97 at rest.

**P4 · state (the statechart)**
- **[probed]** `useDockChart.ts`: 175 lines, 146 of them code. It replaces `useDockState` (320 code lines) and `useDockClickIntegrity` (141).
  - **Rungs:** `collapsed · compact · expanded · pinned · held`.
  - **Inputs:** `hover.fine · leave.idle · press.coarse · click.summary · focus.visible · focus.out · scroll.past · scroll.top · layer.open · layer.close · click.away · expand · collapse`.
  - **Table edges:** collapsed 6, compact 6, expanded 7, pinned 3, held 1, for 23 in all. The full table is in the probe patch. The rows the report names:
    - `hover.fine` comes only from `pointerType === "mouse"` under `(hover: hover)`;
    - `press.coarse` pins, and its click is swallowed when the press began on a folded rung (R4-01-15, UIA-F-80);
    - `click.away` has an edge from `expanded` and `pinned` with no morph gate (R4-01-05; HEAD's `if (isTransitioning?.value) return` at `useDockState.ts:373` is gone);
    - `held --layer.close-->` re-reads present state: engaged → expanded, else back to `heldFrom`, else rest. It never schedules a leave (R4-01-06).
  - **Holds:** per dock, as `holds` and `grasps` plus `heldFrom`. `held` has no timer edge (UIA-F-10, -11).
  - **Compaction:** `compactOnScroll: boolean | {enter, exit}`. Probed band: enter 160, exit 64.
- **[probed] Three mechanisms outside the table**, all needed because the transition layer steals hit testing:
  1. hover is read from the last fine pointer position against the dock box, not from `:hover`;
  2. pointer boundary events are ignored while `data-rung-transition` is set;
  3. `resync()` re-reads engagement at `finished`.

  Without them, a hover-driven rung looped compact → expanded → compact three times in 1.5 s under a still pointer.
- **[probed] Floor row 3.** The hover `scale` and fill in `icon-button.css`, `tab-button.css`, `triggers.css` and `glass-capsule.css` (its 1.015 lift) move under `@media (hover: hover)`.

**P5 · the rim**
- **[probed]** A static seat inside the plate, which is `container-type: size` (free for a contentless plate):
  ```css
  .glass-dock .dock-rim { position: absolute; inset-block-end: 4px; block-size: 3px; inset-inline: calc(0.6 * 50cqmin); }
  .glass-dock .dock-rim-fill { animation: gl-dock-rim-x linear both; animation-timeline: scroll(root block); }
  ```
  - The `0.6 · 50cqmin` inset keeps a 4 px-deep rim inside the stadium for any radius up to 47.9 px.
  - There is no JavaScript on the fill.
- **[scratch]** An element source works on a scratch page (`scroll-timeline` on the scroller plus `timeline-scope` on an ancestor). The library can write that only onto elements it does not own. The probe binds `window` only.

### F.2 · Public API delta and consumer migration

- **GlassDock gains** `scrollSource` (an element, `Window` or a getter), `compactOnScroll` (`boolean | {enter, exit}`) and `rim`.
- **The expose keeps** `expanded`, `isPinned`, `isHeld`, `graspHeld`, `isTransitioning`, `expand`, `collapse`, `keepOpen` and `release`.
- **Leave the barrel:** `useDockState` (with its three exported types) and `useDockMorphOrchestrator`. `useDockChart` / `DockRung` would replace them.
- **`DockContext` gains** `transition`.
- **`DockCrossfade`** loses its measured reserve and its spring, and becomes a rung switch.
- **New behaviour:** overflow shows a More seat instead of a scroller. The owner has not ruled on a More seat over a scroller, so that is an owner ask.
- **New root attributes:** `data-rung` and `data-rung-transition`.
- **Deleted in a real wave** (the probe overrides with `!important` instead): the morph orchestrator and endpoint measure (254 lines), the click-integrity guard (269), `useDockState` (454), the crossfade spring and reserve, run.css's scroll, snap, cap and `inline-size` sections, the `[data-morphing]` halves of morph.css, shape.css and layers.css, and `useDockRun`'s reach glide. About 1,500 lines, the portfolio's estimate; not re-counted.

| consumer | migration it implies (`D2-F.md` §4) |
|---|---|
| value.js | Mounts `DockCrossfade :active reserve="inline"` (`ActionBarLayer.vue:96`). The `reserve` prop goes, and the Tools crossfade becomes a dock rung change. X-11 must retire with the cure |
| keyframes.js | `expand()` maps to `send("expand")`, and its test mock's shape holds. ChromeDock folds 2 seats at 360 px. K-18: keyframes owns document View Transitions for scene switches |
| fourier-analysis | AppDock fits at every width measured. For CanvasControlsDock the scope would be `.controls-dock-anchor`, and a scope clips its pseudo tree to itself. Inferred, not measured |
| chicago | X-1 and X-2 retire, and X-3 is the interface. At 360 px its row overflows by 9 px with no fold, so the row is cut. Its full-width `nav.page-dock` as the scope makes every tap across the bottom strip fall through during a morph |

### F.3 · Witnesses

| witness | HEAD | D2-F probe f6 | green | RED, and why |
|---|---|---|---|---|
| W1 | 9/32 | **32/32** | the radius clamp on the plate and its group; Chromium in-morph worst 0.388 px | none. **The Playwright WebKit morph cells pass vacuously**: 1 distinct extent was sampled, because the morph lands in one frame |
| W2 | 0/10 | **10/10** | no scroll container on any route (0/36, 0/72, 0/239, 0/210 frames, Chromium); ring cut 0/0 | none. W2 cannot see C-7 (a seat 16 px outside the plate with no scroller) |
| W3 | 0/14 | **5/14** | Chromium first expand (step 26.81 px against a 40.9 px bound, window 249.8 ms against 260.1 allowed, dead landing), the warm pair and the swaps | content add/remove in both engines (179.33 px in one frame, no window: F cannot see a consumer's change before it happens); all seven Playwright WebKit cells (one-frame steps of 387.72, 179.39 and 245.06 px: no scoped API). The Chromium faces check is green through the adapter's clip, **not verified in pixels** |
| W4 | 4/16 | **16/16** | compact 214.13 → 191.69 px; band enter 160 / exit 64, 1 flip; engagement returns to 214.13; PRM 0 frames; no latch; a coarse tap pins with 0 clicks; the menu holds 5.5 s | none |
| W5 | 0/10 | **10/10** | 0 device px outside in all five rungs, both engines (Chromium ink: h·expanded 1508, h·collapsed 260, v·expanded 1340, v·collapsed 260, compact 1966) | none |

- **Family guard** (a click at +100 ms into a morph reaches its target): **RED in Chromium**. The click lands on `MAIN`, the page behind, and so does a point about 410 px left of the dock inside the band. It is green in Playwright WebKit only because WebKit has no morph (§5).
- **Cost:** no per-frame script during a morph (the user agent animates the pseudo tree), and one `startViewTransition` per rung change.

### F.4 · Chrome and WebKit behaviour

| behaviour | Chromium 149 | Playwright WebKit |
|---|---|---|
| rung morph | scoped transition on the parent; extent continuous (W3 5/7) | no scoped API: a one-frame rung change (W3 0/7), plus `console.warn` |
| a click at +100 ms into a rung change | lands on `MAIN`, the page behind | received by the seat (there is no transition) |
| the lens during the morph | tint only, no blur | no backdrop blur even at rest (headless) |
| `:hover` during the morph | dropped; the chart holds and resyncs | n/a |
| scroll-driven rim | fills, 0 px outside | fills, 0 px outside |
| document-transition fallback | swallows every page click | swallows every page click |

### F.5 · Open gaps (verbatim, `D2-F.md` §7)

- Real Safari: every cell. UNMEASURED (owner's safaridriver checkbox).
- Seat paint during a transition was not verified in pixels. W3's faces check is green through the adapter's clip, not through a capture.
- The More menu (roving, semantics, focus return) is unbuilt, and the owner's ruling on a More seat over a scroller is not asked yet.
- Capacity needs summed seat extents, not the pitch count. That is unbuilt, and it makes F measure geometry.
- The fourier CanvasControlsDock scope (`right`-anchored, inside clipping ancestors) and value.js's four-layer dock were not composed.
- The element scroll source for the compact rung and the rim: only `window` was bound. An element needs CSS written onto the consumer's scroller.
- The plate's 1.5 px border and grain during the morph are not painted by the group in the probe.
- No interruption continuity exists in the mechanism. A cure would need a script integrator, which is outside F's center.

---

## Witness totals, side by side (a table of record, not a ranking)

| witness | HEAD | D2-A | D2-B | D2-C | D2-D | D2-E | D2-F |
|---|---|---|---|---|---|---|---|
| W1 corner | 9/32 | 26/32 (32 with the cut dropped) | 32/32 | 32/32 | 12/32 (28 with κ off) | 32/32 | 32/32 (WebKit morph cells vacuous) |
| W2 run | 0/10 | 6/10 | 10/10 | 10/10 | 0/10 | 10/10 | 10/10 |
| W3 morph | 0/14 | 6/14 | 14/14 | 3/14 (14/14 at a 0.26 s clock) | 0/14 (faces 0 px in all 14) | 6/14 | 5/14 |
| W4 state | 4/16 | 10/16 | 16/16 | 12/16 | 4/16 | 6/16 | 16/16 |
| W5 rim | 0/10 | 10/10 | 10/10 | 10/10 | 8/10 | 0/10 (not probed) | 10/10 |

Each cell is the family's own report (§3 in A, B, C and F; §7.2 in D; §4 in E). The HEAD column is `HARNESS.md`. A family's missing cells are either borrowed sub-choices it did not build (D2-D's W2 and W4, D2-E's W4 and W5) or rows its center cannot reach, as named in each spec's §3.

---

## Shared facts (every family inherits these)

Measured facts, each cited to the report that measured it. Readings are Chromium 149 and Playwright WebKit unless one engine is named. Real Safari is UNMEASURED (owner's safaridriver checkbox) for every row.

**The tree and the instruments**
- **S-1 · The dock under test.** `src/` is byte-identical to v10.0.1 from `5804d8cc` through `71f2ba45` (this seat's `git diff --quiet`). Every consumer on 10.0.1 runs HEAD's dock byte for byte (X header).
- **S-2 · The WebKit crash.** Playwright WebKit crashes on every GlassDock mount at HEAD. The trigger is a property whose value nests two translucent `color-mix()` arms, which is what the plate border resolves to. Every WebKit dock cell carries the `+shim`, which pins the border colour to one arm. Whether shipping Safari crashes is unmeasured (`HARNESS.md` §4; reproduced 6/6 in X; it moves to `.dock-edge` under D2-D).
- **S-3 · No headless WebKit blur.** Headless Playwright WebKit paints no backdrop blur, even at rest. Every lens and backdrop-root reading is Chromium evidence only (`D2-A.md` Q-BR; `D2-F.md` Q2).
- **S-4 · Headless timing.** Headless rAF intervals are irregular: frames of 6-9 ms and stalls of 20-38 ms were seen (`HARNESS.md` §8). Chromium ran at about 8.5 ms frames and Playwright WebKit at about 17 ms (`D2-C.md` §6). W3 margins are thin on every family that passes it: 2.4-10.4 ms in D2-B, and 1-6 ms over in D2-C at the shipped clock (`D2-B.md` §3, `D2-C.md` §2.2).

**Scroll ports and paint**
- **S-5 · A scroll container clips its padding box on both axes.** No scroll container paints past its padding box on either axis, in either engine, and under the current spec the clip edge can only shrink. `overflow-clip-margin` needs two-axis `clip`, is Chromium-only, and is not a scroller. The ED's single-axis scroll container (`auto/clip`) computes `auto/hidden` in both engines (W §4, P02).
- **S-6 · A one-axis clip is not a scroller.** `overflow-x: clip; overflow-y: visible` computes `clip/visible` in both engines. It paints the cross axis, and `scrollLeft`, `scrollBy`, `scrollTo`, `scrollIntoView` and `focus()` all leave it at 0 (W P02; `D2-C.md` Q6).
- **S-7 · What grows the scroll range.** Transforms grow the scroll range; outlines and box-shadows do not. Inline end padding absorbs a transform that stays inside it, identically in both engines: 208/208 with `scale: 1.1` or `1.2` and 4 px of padding, and 214/214 with a 7 px gutter under ring + shadow + snap (W P03; `D2-A.md` Q2).
- **S-8 · The native overflow bit misjudges.** `scrollWidth > clientWidth` misses 25 (Chromium) and 64 (Playwright WebKit) of 64 overflowing steps within 1 px of the budget. A layout sum of seat border boxes matches truth at 129/129 steps and needs no hysteresis (`D2-B.md` Q2). It is a valid overflow reading only where no seat paints or transforms past its box (`D2-E.md` item 6).
- **S-9 · Seat paint reach at HEAD.** Glass-ui seats reach 6.25 px on the cross axis (hover + focus) and 8.25 (Chromium) / 8.75 (Playwright WebKit) inline (tab). A consumer glass `Button` reaches 10.75 / 11.25 px. The block pad is 8 px (`D2-A.md` Q7). Consumers also paint outside seat boxes: `scale-on-hover` 1.08, an icon `scale(1.2)` and `.view-dot` at −3 px (X K-33).

**The corner**
- **S-10 · The HEAD corner.** The rail's plate is a lens (mean r 21.9 against 32, worst 19.8 px), the collapsed morph plate is squashed by `scale` (4.6 px), and the warm morph frames read 4.7-11.8 px off circular (`HARNESS.md` §5 W1). The card lerp `calc(9999px + (24px − 9999px)·t)` reads `0px` at t = 1.0029 (`PORTFOLIO.md` W-2).
- **S-11 · Exact stadium radii.** `50cqmin` on a child or pseudo of a size container gives 28 / 32 / 20 px on 200×56 / 64×560 / 300×40, in both engines. On the container's own box it resolves to the `svmin` fallback, 300 px (W P09).
- **S-12 · No continuous-curvature corner on WebKit.** `corner-shape` and `superellipse()` are Chrome 139 only, and Playwright WebKit has none. The stadium stands on `border-radius` (W §7, P08).
- **S-13 · The cut cap fails W1.** W1 as written requires a circle of cross/2 at every rest, scrolled ends included. Every family that kept the cut failed those cells: D2-A 6 cells at 6.0 / 5.94 px (C-5), and D2-D rails at mean r 34.3 against 32 (§7.2). D2-B, D2-C, D2-E and D2-F carry no cut and pass. An owner ruling on the cap, or on W1's bound at a genuine overflow edge, is owed (`D2-A.md` §7).

**Springs and motion carriers**
- **S-14 · The dock spring.** (0.30 s, ζ 0.88) is within 2 % of any travel at 215 ms, and within 0.5 px only at 245 ms (D 100) to 262 ms (D 600). Its undesigned overshoot is 0.3 % of D (1.15 px at 387 px) (`D2-C.md` §8, computed). The clock is 210 ms (`HARNESS.md` §3). keyframes' `RAFPlayback.drive` takes 16.667 ms as the first frame's dt regardless of elapsed time (`D2-B.md` C-3).
- **S-15 · CSS `linear()` springs.** A retarget drops velocity by 70-75 % (0.814 → 0.206 px/ms in Chromium, 0.819 → 0.249 in Playwright WebKit). A reversal takes 292-296 ms of a 600 ms clock. `--spring-dock`'s truncated tail (last stop `0.97317 97.959%`) steps 5.16 px (Chromium) / 5.92 px (Playwright WebKit) in the last frame of a 300 px run (W §10, P10).
- **S-16 · Every CSS or user-agent carrier reverses into a wall.** D2-A: +2.5 → −0.6..−0.9 px/ms (C-13). D2-E: −0.42 → +0.305 / +0.314 px/ms (Q1 E). D2-F: +1.21 → −1.22 px/ms, and a new view transition jumps +220.8 px (Q3). Only a script integrator carries velocity across a retarget (W §10; `D2-C.md` §4).
- **S-17 · Animated clips run on the main thread.** Every clip-path animation runs on the main thread in both engines, including HEAD's `inset()`, `shape()` and a registered property feeding a clip: a 1.2 s block freezes the plate for 1,160-1,200 ms. Transforms keep moving (`D2-D.md` Q2).
- **S-18 · Inherited scalars are expensive.** An inherited registered scalar restyles the subtree: HEAD's `--dock-morph-t` on the root touches 29 elements and costs 311-425 µs (Chromium) / 1,814-1,992 µs (Playwright WebKit) per write. Six `inherits: false` properties cost 66-70 / 84-138 µs, and plain properties 59-68 / 34-49 µs (`D2-B.md` Q3).

**Endpoints**
- **S-19 · Where endpoints come from.** A face that is in flow, or out of flow at `inline-size: max-content`, gives ResizeObserver its intrinsic extent before the first expand, font swaps included. HEAD's `position: absolute; inset: 0` gives the containing block instead: 44 px against a truth of 391.094 px. That is the W-6 source (`D2-B.md` Q1).
- **S-20 · The HEAD morph.** The first expand holds, then jumps 387.66 px in one frame. Warm faces sit 147-158 px out. The window is 545-552 ms against a 210 ms clock. A content change is 179.33 px in one frame and a swap 244.98 px, with no window. O-64 R-1..R-4 are reproduced and R-5 is not (`HARNESS.md` §5 W3).

**Scroll input for P4 and P5**
- **S-21 · Scroll-driven animations.**
  - Scroll-driven animations resolve identically in both engines: ramps, length ranges and the `min(48px, 50%)` cap range.
  - A name on an inner scroller needs `timeline-scope` on `:root`.
  - Two readers can share one timeline. A duplicate name goes inactive (the start value), and an unresolved name splits the engines: Chromium shows the end keyframe, WebKit nothing. None of these fails loud.
  - Two binders that write one property clobber each other.
  - Progress is a function of offset alone, so it cannot carry hysteresis (W §1; `D2-A.md` Q5).
- **S-22 · Position hysteresis on WebKit needs script.** `timeline-trigger` (Chrome 146) and `scroll-state()` (Chrome 133/144) are Chrome-only. Playwright WebKit plays a triggered animation to its end state at load, and `scrolled` flips on 1 px with no threshold. Cross-engine position hysteresis is script (W §2, §3).
- **S-23 · `scrollend` cannot be the trigger.** `scrollend` ships in both engines (Chrome 114, Safari 26.2). Playwright WebKit fires it once per wheel gesture, 677-700 ms after a threshold crossing, so it can stop a machine but cannot trigger one (`D2-B.md` Q5; W §11).
- **S-24 · The reference and the platform model.**
  - The floridify reference is a gate times a ramp: `window` source, T 50/100 px, saturation at 2T, and a 150 ms gate release. It has no position hysteresis, and it rests shrunk at the top of the page (X §5).
  - iOS documents minimize-on-scroll-down with no threshold. Third parties measured restoration only at the scroll edge, and a UIKit reveal of about 200 ms (W §9).
- **S-25 · HEAD's `useScrollChrome` on the dock is a dead writer.** It writes `--chrome-collapse-t: 1` on the dock root and nothing reads it. StoryPage's header is its only live reader (`D2-B.md` Q6).

**Platform primitives the families lean on**
- **S-26 · Anchor positioning.** `anchor()` insets transition in both engines whenever the anchor moves, including by layout. `anchor()` and `anchor-size()` are rejected in `clip-path`, `mask-position`, `translate` and `border-radius`. `position-visibility` splits: Chromium hides a scrolled-out anchor's projection and Playwright WebKit paints it (W §5, P06; `D2-E.md` Q1, Q2, Q6).
- **S-27 · View Transitions.** A document transition swallows every click on the page in both engines. Element-scoped transitions are Chrome 147 only, and a click inside the scope falls through to the page behind. A second transition started mid-flight jumps 133-135 px. There is no WebKit position, bug or ship for the scoped kind (W §6, P07; `D2-F.md` Q1).
- **S-28 · Backdrop roots and hit testing.** A `clip-path` on an ancestor of a `backdrop-filter` plate is its backdrop root, and Chromium blurs nothing (stripe contrast 250 against 0). The plate's own clip keeps the blur (`D2-A.md` Q-BR). `clip-path` removes the clipped area from hit testing in both engines, but only when the box and every rectangular wrapper under it are `pointer-events: none` (`D2-D.md` Q4).
- **S-29 · Rim clips.** A rim is clipped by the plate radius in both engines when the clip covers both axes (`overflow: clip` or `clip-path: inset(… round …)`), `backdrop-filter` included. A one-axis `overflow-x: clip` rounds in WebKit and leaks in Chromium, so a rim must not depend on it (W P14).

**Pointer modality and idle frames**
- **S-30 · Coarse taps latch `:hover`.** After a coarse tap, `:hover` stays latched in both engines' coarse emulation. Only a `(hover: hover)` gate on the paint keeps a tapped seat from latching `scale: 1.1` and its tint (`HARNESS.md` §5 W4). Floor row 3 binds every family: D2-B, D2-E (structurally) and D2-F built it, and D2-A, D2-C and D2-D did not.
- **S-31 · The page is never idle.** `useGlassBackdropLuminance`'s `useRAFLoop` requests every frame: 240 per 2 s (Chromium) and 120 (Playwright WebKit), at HEAD and in every probe. The R3b idle budget cannot close for a `backdropMode: "live"` dock until the veil and ink interface changes (O-62, F-23) (`D2-C.md` Q3).
- **S-32 · keyframes' `Draggable` cannot drive a seat track.** It calls `setPointerCapture` on `pointerdown`, which retargets every seat tap's click to the port (`D2-C.md` §3.7).

**The constellation**
- **S-33 · The mounts.** Nine `GlassDock` mounts across four consumers, all horizontal. Six of nine put their seats below the run's direct children (four behind one wrapper, two in `display: contents` groups), so floor row 1 is required. One mount is right-anchored (M-6) (X §1).
- **S-34 · Content changes and wide collapsed faces.**
  - Content changes on live docks are routine at 11 sites and land in one frame at HEAD: 290 → 104, +37.36 and +28.0 px, and keyframes' 16.79 px (X M-E, K-13).
  - Two consumers author a collapsed face wider than the 40 px summary. It paints 16.98 px (Chromium) / 20.16 px (Playwright WebKit) outside the plate, and fourier's readout overlaps its own persistent Play by 22.23 px (X M-A, M-B).
- **S-35 · Rows that fit.**
  - Every consumer row fits at 390, 768 and 1440 px. At 360 px, chicago's row overflows by 9 px and keyframes' ChromeDock by 14 px (`D2-F.md` Q4).
  - All four consumers shed labels by breakpoint so their rows never scroll (X §1.2).
  - A fitting run at HEAD overflows by up to 2 px under hover scale. In Playwright WebKit a horizontal wheel then scrolls it 2 px (chicago's "labels slide"), and chicago's overrides mask it (X M-H).
- **S-36 · value.js's struck props.** On a HEAD dock, value.js's 7.0.0 props fall through: `:always-expanded="true"` mounts the dock collapsed, 16 px wide, with both buttons hidden and inert (X M-G).
