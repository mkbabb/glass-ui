# D2 · pass 2 · FLOOR: the floor patch both routes apply

| field | value |
|---|---|
| seat | D2 pass 2, floor patch. Builds REGISTRY §3.2 "The floor patch" rows 1-7 once, on the real source, as the one patch D2-B′ and D2-G both apply, with §3.3's banked sub-choices where they apply and §5's pass-2 defaults |
| model | `claude-opus-5-5`, asserted from own system identity |
| patch | `floor.patch` (this directory), sha256 `de432032f18918a1…`. 38 files: 34 modified (+1139 / −1436), 4 new (423 lines). Source and demo: +1056 / −1066. `git apply --check` is clean at `04929544` and at the checkout's HEAD when this file was written (`b37a37c3`; `src/` between them differs only in `src/components/configurator/*` and `src/index.ts`) |
| provenance | An earlier run of this seat wrote a draft patch and stopped during its H2 W3 run, leaving no FLOOR.md. This seat reviewed that draft row by row against §3.2, kept it, and changed it where the review or H2 found a defect (§2). Every number below comes from this seat's runs |
| worktree | `git worktree add` at `04929544` in scratch, `node_modules` symlinked, every build and cache inside the worktree or scratch; removed before return. A second worktree at `04929544` (unpatched) ran the HEAD side of the unit comparison. Both worktrees' indexes took `git add -N` / `git reset` on the four new files to emit the patch; no other git write |
| engines | Chromium headless; **Playwright WebKit** headless (the Playwright 1.61.1 build), **unshimmed in every cell**: the floor adapter carries no `webkitShim` because row 6 removes the crash. Real Safari: **UNMEASURED (owner's safaridriver checkbox)**, with Safari 26.4's own refusal recorded in the run log |
| records (source of record) | `FLOOR-records/`: `floor-cells.json` (every floor cell, light and dark, with the W8 re-runs, verdict, failed checks, load, summary), `run-floor-light.log`, `run-floor-dark.log`, `compare-light.json`, `compare-dark.json` (joined to `H2-records/head-cells.json`), `build-floor.json`, `build-lib.log`, `typecheck.log`, `vitest-full.log`, `vitest-rerun-floor.log`, `vitest-rerun-head.log`, `vitest-menu-floor.log`, `vitest-menu-head.log`, `collapse-probe-v2-build.log`, `collapse-probe-floor.log` |
| tools written | `floor-vs-head.mjs` (joins a floor run to the H2 baseline per witness, engine and cell), `floor-collapse-probe.mjs` (per-frame collapse log plus face boxes at both rests), `adapter-floor.mjs` (the probe contract on the floor). Harness changes in place: `../harness/lib.mjs` and `../harness/HARNESS.md` gain `DOCK_HARNESS_THEME` (§4); `../harness/scenes.mjs` resolves the `"@source"` token at any depth, so it binds inside the grouped `scroll` prop (the earlier draft's change, kept) |
| load | 1-minute load average beside every cell in the records. Other seats ran headless browsers throughout: 45-95 through the light run, 46-256 through the dark run, 166-222 during the W8 re-runs |

---

## 0 · In brief

- All seven rows are built. The patch removes more source than it adds: the W5 cut cap, the per-posture padding lerp, `useScrollChrome` in the dock, and the `inset: 0` inactive faces all go.
- H2 on HEAD + floor, against the H2 HEAD baseline, counted cells passing (both themes identical except two W8 `pacing` cells, §4.3):

| witness | Chromium floor | Chromium HEAD | Playwright WebKit floor (unshimmed) | Playwright WebKit HEAD +shim | Playwright WebKit HEAD unshimmed |
|---|---|---|---|---|---|
| W1 corner | **13/22** | 6/22 | **13/22** | 6/22 | 0/22, all crashed |
| W2 run | **7/8** | 2/8 | **7/8** | 2/8 | 0/8 |
| W3 morph | 3/19 | 2/19 | 2/19 | 1/19 | 0/19 |
| W4 state | **12/13** | 2/13 | **12/13** | 2/13 | 0/8 |
| W5 rim | **6/6** | 0/6 | **6/6** | 0/6 | 0/6 |
| W6 collapsed form | 2/4 | 2/4 | 2/4 | 2/4 | 0/4 |
| W7 edge | 6/18 (+2 RECORD) | 6/18 | 6/18 (+2 RECORD) | 6/18 | 0/20 |
| W8 motion | 3/6 (+3 UNMEASURED) | 2/6 | 2/6 | 2/6 | 0/6 |
| R6 probe | 1/1 (+RECORD) | 1/1 | 1/1 (+RECORD) | 1/1 | 0/1 |

- **Unshimmed Playwright WebKit mounts every scene.** HEAD crashed on all 94 unshimmed cells; the floor crashed on 0 of 200 WebKit cells across both themes (`floor-cells.json`, `verdict` never CRASHED).
- **O-64 at the floor.** R-1 (the first-morph endpoint) is cured in both engines: the first expand is continuous (step ×0.66, trajectory within 1.04 % of D in Chromium, 0.3 % in Playwright WebKit), against HEAD's single frame (×9.37). R-3 (the sub-pixel ring on the warm expand, 0.34 px at HEAD) is gone: `landing` passes. R-2 (content changes), R-4 (the window, ~540-560 ms against a 257-300 ms allowance) and R-5 (owners, already 0 at HEAD on this scene) are the carrier's, and the routes own the carrier (§5).
- **What stays RED is the carrier (P3), not the floor**: morph-frame corners, the window, seat choreography, content and swap changes, `sharp`. The floor keeps HEAD's scale carrier on purpose, so the routes differ only where they compete (REGISTRY §7.1).
- The earlier draft **regressed the collapse** (a whole-travel single step in W3 and W6); this seat found and cured it (§2 item 4).

---

## 1 · The rows

File:line references are to the patched tree (`04929544` + `floor.patch`).

### Row 1 · F-1's corner, and floor row 1 (seats declared at any depth)

| what | where |
|---|---|
| One pad on every side, the cross-axis pad, in both postures: `--dock-pad`, `--dock-cross = seat + 2·pad`, `padding: var(--dock-pad)` (horizontal pads by `--dock-padding-block`, vertical by `--dock-padding-inline`: each is its cross axis) | `src/components/dock/styles/shell.css:231-233`, `:383-384` |
| The padding no longer morphs: the per-posture `--dock-pad-collapsed` lerp and its `--dock-collapsed-padding` handle are struck (the concentric law puts an end seat's centre on the end cap's centre only when main pad = cross pad) | `morph.css:78` |
| The finite card lerp: `calc(var(--dock-cross) / 2 + (card − cross/2) · clamp(0, t, 1))`, horizontal and vertical (W-2's 9999 px clamp and its negative overshoot are gone) | `shell.css:457`, `:483` |
| The collapsed summary is a seat-row square (`min-inline-size` / `min-block-size: --dock-layer-height`, `aspect-ratio: 1`); `--dock-collapsed-summary-min-size` (0.85 ×) is struck | `morph.css:107`; `src/styles/tokens/sizing.css` (deletion), `density.css` (deletion) |
| One resting corner owner: `.glass-dock { border-radius: var(--radius-dock) }`, the plate inherits | `shape.css:60` |
| **The cut cap is struck** (Q-1 default (a)): the scroll-timeline radius animation on the plate, its keyframes and its prose | `run.css:29` (the record), the struck block of `run.css` |
| Seats are declared: `data-dock-seat` on DockControl and on all three DockTrigger branches | `DockControl.vue:173`, `DockTrigger.vue:58,74,79` |
| Every seat reader finds seats by `[data-dock-seat]` at any depth (not nested in another seat), never `run.children` | `useDockRun.ts:71` (`seatsOf`) |
| The compact rung, the snap alignment and the overflow cells read the same declaration | `scroll-rungs.css:15-22`; `run.css:185` |

Measured: every W1 rest cell passes in both engines and both themes, including the rail's scrolled end (`rail·scrolled-end`, `rail·focus-end`: r 32, worst 0.137 px Chromium / 0.011 px Playwright WebKit), the collapsed rests that HEAD failed (`morph·collapsed-rest` 101.98 × 56, r 28, 0.137 / 0.027 px; `vmorph·collapsed-rest` 64 × 116, r 32; `card·collapsed-rest` r 27.93 fitted, 0.114 / 0.058 px), and the hovered rest (0.137 / 0.492 px). W2 `route6·depth` (seats at depth and in a `display: contents` group) reaches 4/4 by pointer, keyboard and AT in both engines.

### Row 2 · F-2's rim as a plate child, fed by the one scroll source

| what | where |
|---|---|
| An opt-in `span.dock-rim.track-ground` as the plate's first child (`scroll.rim`); decorative under the plate's `aria-hidden` (Q-8 default (a)) | `GlassDock.vue:408` |
| `inset: 0; border-radius: inherit; overflow: clip` on the plate: every rim pixel is inside the silhouette in every rung and orientation | `scroll-rungs.css:39-47` |
| Track and fill are the rim's two pseudos on the trailing edge (block-end horizontal, inline-end vertical); the fill is `scale: var(--dock-rim-t) 1` from the inline start (`:dir(rtl)` flips the origin) | `scroll-rungs.css:49-85` |
| **The inks are the house rim's** (P-3): the track is `--track-well-recess` from `.track-ground` (derived from the plate's own `--background`), the fill is ScrollProgressRim's spectrum | `scroll-rungs.css:59`, `:63` |
| The one reader writes `--dock-rim-t` straight onto the element (no re-render per scroll event) | `GlassDock.vue:174-180` |

**The owner-record conflict** (carried obligation, FORMATION-PROGRESS line 43). AY B.5 ruled the rim "must NOT be baked into the dock"; N-7 (2026-09-23, relayed in O-55) asks it "integrated into the bottom of the dock ... properly clip and account for rounding". The newer words govern. The floor reads them as an **opt-in dock seat**: the rim exists only when the consumer passes `scroll.rim`, so it is not baked into every dock, and when present it is part of the plate and clipped by its radius. The code comment at `GlassDock.vue:398-407` cites both records. The rim stays OW-7's owner glance (`ledger/CENSUS.md` §4).

Measured: W5 6/6 in both engines and both themes (HEAD 0/6, absent). Chromium light: `h·expanded` 1348 device px of rim ink, 0 outside, the clip keeps 75 % with the clip lifted and 0 px beyond the plate box; the fill counts at progress 0/.25/.5/.75/1 are 0/234/684/1134/1368. `h·collapsed` 196 px, 0 outside, kept 30 %. `v·expanded` 1360 px, 0 outside. `h·expanded·el-source` (an element source) reads the same as the window. `h·compact` 655 px, 0 outside, kept 59 %.

### Row 3 · F-3's floor row 3 (the hover gate and the coarse press)

| what | where |
|---|---|
| Every paint-bearing `:hover` rung in the band sits under `@media (hover: hover)`: icon, tab and secondary-tier hover, the trigger family, the collapsed-dock hover shadow, the layer-switcher tab, the capsule lift (`glass-capsule-hover`, a library law per C-12) and the control specular gleam | `controls/icon-button.css:112`, `controls/tab-button.css:69,146`, `controls/triggers.css:78`, `morph.css:202`, `layer-group.css:275`, `src/styles/glass/glass-capsule.css:122`, `src/styles/glass/material.css:334` |
| The chart's hover input comes only from a fine pointer (`matchMedia("(hover: hover)")`); a pointer's focus is not engagement (C CX-2) | `useDockState.ts:266`, `:209` |
| A touch or pen press that begins on a folded dock (collapsed or compact), outside `.dock-persistent`, sends `press.coarse` (pins) and its click is swallowed; a press on a persistent control keeps its tap (O-32 A-2) | `useDockClickIntegrity.ts:87`, `:233` |

Measured: W4 `coarse·no-hover-latch` (1.5 s after a tap the seat, its pseudos and its descendants' pseudos are back at rest) and `coarse·tap-pins` (collapsed → pinned at +0.7 s and +5.5 s, 0 clicks fired) pass in both engines, both themes. HEAD failed both.

### Row 4 · F-4's P4 machine over one scroll reader

| what | where |
|---|---|
| `DOCK_CHART`: four rungs (`collapsed · compact · hover · pinned`), eleven typed inputs, one edge table; every posture change goes through `send()` | `useDockState.ts:134`, `:227` |
| Position hysteresis: compact at 88 px, return at 40 px (a 48 px band); re-arm 150 ms after engagement clears (the reference gate's shrink delay) | `constants.ts:81-89`; `useDockState.ts:317` |
| The three known defects fixed: the getter is resolved through `toValue` at each event (C CX-3); a pointer's focus is not engagement (C CX-2); the binder is refcounted (A X-1) | `useDockScrollSource.ts:35`, `:64-75` |
| The binder: one capture-phase `scroll` listener on `document`, added with the first subscriber, removed with the last. It fails loud on a selector string, a literal `null`, and an element source that has left the document | `useDockScrollSource.ts:43-49`, `:95-98` |
| One grouped prop, `scroll: { source, compact?, rim? }` (Q-3 option (b)): `DockProps` goes from 6 members to **7** | `useDockShellProps.ts:42`, `:122` |
| The compact rung: every declared seat that is not current leaves (`aria-current`, `data-active`, `aria-selected="true"`), and so do the separators. How they leave is the route's (§7.3 B′ item 7) | `scroll-rungs.css:15-24` |
| `useDockSearch` loses its second scroll-driven shrink (`collapseOnScroll`, `scrollContainer`, `chromeRef`, which composed `useScrollChrome` as a transform on the dock root); the demo moves to `:scroll` | `useDockSearch.ts:72`; `demo/stories/dock/dock-search.vue:178` |

Measured: W4 12/13 in both engines and themes (HEAD 2/13): `compacts` (206.13 → 93.59 px), `seat-scale` (ratio 1), `engagement-expands` (hover, focus and scroll-to-top each return 206.13 px), `no-threshold-bounce` (24 moves of ±4 px around the enter threshold flip the posture once), `late-getter` (a source mounted 600 ms late binds, 0 page errors), `shared-scroller` (the other dock unmounts and this one keeps reading), `press-then-scroll` (compact), `prm·compact` (0 frames strictly between rungs). The one red cell is `compact·non-first-current` (a seat steps 18.79 px against 2.36 in one frame when its siblings leave), which is the route's.

### Row 5 · F-5's endpoint model

| what | where |
|---|---|
| Both faces are laid out at their own main-axis extent at all times: the active one in flow, the inactive one out of flow at `max-content` on the main axis, pinned to the start edge and stretched on the cross axis only | `layers.css:252` and the vertical twin; `crossfade.css:37`, `:52` |
| **`.dock-layers` is the faces' one containing block** (`position: relative`), at rest and mid-morph alike (§2 item 4) | `layers.css:53` |
| Endpoints are `chrome + face`, every term a `borderBoxSize` read from ResizeObserver entries. A zero read is no layout. Nothing is read or published while the morph window is open. The expanded endpoint is capped by the budget (the parent's content box and the root's own `max-*-size`) | `dockMorphMeasure.ts:41`, `:67`, `:82`, `:102` |
| One trigger per fact: the endpoint ResizeObserver (endpoints) and the overflow ResizeObserver (the run's `[data-overflowing]`) observe different facts; the MutationObserver in `useDockRun` serves the roving tab stop only | `dockMorphMeasure.ts:102`; `useDockRun.ts:374`, `:399` |
| The run is `overflow: visible` while its seats fit. `[data-overflowing]` comes from a layout sum of the flex items' border boxes (through `display: contents`), their margins and the gaps, against the run's own content box, never `scrollWidth`. Only then is the run a native snap scroller inside a paint gutter (padding plus the equal negative margin, `--dock-run-gutter: var(--dock-pad)`) (Q-2 default (a); §3.3's paint-gutter sub-choice) | `useDockRun.ts:309`, `:331`; `run.css:138`, `:159-170` |

Measured: W3 `first-expand` is continuous (Chromium step ×0.66, trajectory 3.95 px, 1.04 % of D; Playwright WebKit ×0.66, 1.12 px) where HEAD jumped 387.66 px in one frame (×9.37). The endpoints are posture-invariant (`collapse-probe-floor.log`: horizontal 102 / 481.66 px at both rests, vertical 116 / 281 px at both). W2 routes 2, 3, 4 and 6 hold 0 scroll-container frames on runs that fit (HEAD: route 2 73/73 frames with up to 318 px of range). Route 1 scrolls where the seats exceed the budget (680 px against 360) with a ring cut of 0/0 against a free reach of 4.25 px (HEAD cut 2.5 px). Route 5 (a consumer width on the root) paints 0 px of plate outside the root and 0 px of face ink beyond the plate. W3 `hidden-shown` holds: the dock appears at its rest (0 px from it).

### Row 6 · PF-3's crash-free edge

| what | where |
|---|---|
| The plate edge lerps its **ink** inside one `color-mix()` with one translucent arm: `color-mix(in srgb, var(--foreground) calc(collapsed + (expanded − collapsed)·t), transparent)` | `dock.css:130-147` |
| The two inks as tokens, `--glass-edge-floating: 5%` and `--glass-edge-dock: 8%`; the floating and dock hairlines compose from them; the dock's endpoints re-point to `--dock-plate-*-edge` | `src/styles/tokens/glass.css:221-233`; `shell.css:145-147`; `adaptive-legibility.css`, `morph.css` (the held-plate endpoint) |

Measured: 0 crashed cells across 200 unshimmed Playwright WebKit cells in both themes (HEAD: 94 of 94 crashed). W7's edges are whole and the same as the top dock (×1) in both engines, both themes, at DPR 1, 2 and 3 (`top·dark·dpr2` edge median 10/255 Chromium, 11/255 Playwright WebKit).

### Row 7 · the `g-dock-lattice` gates re-authored as invariants

`tests/components/custom/dock/g-dock-lattice.test.ts` asserts what the floor must keep, not how HEAD built it:
- G-DOCK-BUDGET: exactly one flexing member (the run); persistent regions counted; no rule consumes the inline consumer cap; the scroll inputs are one grouped member whose source is never a string. HEAD's six-member count is not asserted: the count is the owner's (Q-3).
- G-DOCK-RUN: a fitting run is not a scroll container and every scroll declaration is conditional on `[data-overflowing]`; no proximity snap; **no scroll timeline drives anything in the band** (the cut cap cannot return); no edge fade on either axis.
- G-DOCK-REACH and G-DOCK-STATE as before, over declared seats.
- G-DOCK-MORPH: the first expand's endpoint exists before the flip and is not the collapsed box; the endpoint model has one ResizeObserver and reads border boxes only; no collapsed hover pre-scale.
- G-DOCK-MATERIAL: the overflowing run carries its gutter in `content-box` with padding and the equal negative margin, one owner of the run's box model, and the gutter is `var(--dock-pad)`; the corner is static at rest and the card lerp is finite.

New suites: `useDockScrollSource.test.ts` (6: element source, refcount, late getter, three fail-loud cases), `useDockState.chart.test.ts` (7: the chart's edges, hysteresis, re-arm, the `(hover: hover)` gate), `dockMorphMeasure.test.ts` (6: including "publishes nothing off a morphing root"), `GlassDock.touch-gate.test.ts` (the coarse press pins and swallows; a persistent control keeps its tap).

---

## 2 · What this seat changed in the earlier draft, and why

1. **`safeMatches` struck** (`useDockState.ts`). It caught an exception from `el.matches(":focus-visible")` and returned `true`, "for jsdom". The unit environment is happy-dom, which matches `:focus-visible` without throwing (checked: `true` on a focused button), so the catch could only hide a failure (E-2).
2. **The run gutter reads the one pad** (`run.css:138`): `var(--dock-pad)`, not `var(--dock-padding-block, 0.375rem)`. The old value carried a second fallback for the same fact (P-3), and on a vertical dock it was the wrong pad (8 px against a 12 px pad).
3. **The rim's inks are the house rim's** (`scroll-rungs.css:59,63`, `GlassDock.vue:408`). The draft invented a 10 % / 55 % foreground pair. Its track fell under W5's 26/255 ink floor, so at progress 0 the rim read 0 px of ink and W5 went 0/12 while its fill tracked correctly. Composing `.track-ground` and ScrollProgressRim's spectrum turned W5 12/12 with no witness change.
4. **The collapse regression, cured at its two roots.** The draft turned HEAD's continuous warm collapse into a single whole-travel step: W3 `warm-collapse` failed continuity, trajectory and terminal (89.9 % of D off the spring), and W6 `form·collapse` moved 142.19 px in one step. `floor-collapse-probe.mjs` found the cause (`collapse-probe-v2-build.log`):
   - mid-collapse `--dock-collapsed-px` read 481.66 px, equal to the expanded endpoint. The root holds the expanded footprint while morphing, the in-flow summary stretches to fill it, and the draft froze only the chrome, not the face sizes. **Fix:** publish nothing while `[data-morphing]` is set (`dockMorphMeasure.ts:82`).
   - even at the expanded rest the collapsed endpoint read 118 px against a 102 px collapsed rest (vertical: 140 against 116). The inactive summary resolved its insets against the root's padding box (56 or 64 px on the cross axis) at rest, and against `.dock-layers` mid-morph (its `scale` makes it a containing block), and `aspect-ratio: 1` turned the 56 px stretch into a 56 px width. **Fix:** `.dock-layers { position: relative }` (`layers.css:53`), one containing block in both states.

   After both fixes: warm collapse step ×0.66, trajectory 2.75 px (0.73 % of D) in Chromium and 2.97 px in Playwright WebKit; W6 `form·collapse` fails `window` only, as at HEAD; endpoints are equal at both rests in both orientations (`collapse-probe-floor.log`). A unit test pins the first cause: it feeds a stretched summary read while morphing and requires nothing to be published. The draft's code gives a 240 px collapsed endpoint there, not 60.
5. **The adapter binds the rim on the compact scene** (`adapter-floor.mjs` `compactProps`), so W5 `h·compact` measures the rim on the compact rung instead of reporting it absent. The adapter still holds L-1..L-5 (`adapter-law.mjs`, 36 changed lines against `adapter-head.mjs`).

---

## 3 · Typecheck, unit, build

| check | floor (`04929544` + patch) | record |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | `typecheck.log` |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 0 (after the library build, which the `/fourier-math` subpath import resolves through) | `typecheck.log` |
| library build (`vite build`) | exit 0, 15.3 s at load 185 | `build-lib.log` |
| demo dist build | exit 0 | — |
| dock suites (`tests/components/custom/dock`) | 17 files, 142 passed, 1 expected fail | — |
| full suite (`vitest run`) | 241 files: 2327 passed, 10 expected fail, 1 skipped, **1 failed**: `glass-subtlety` "moves REAL INK…" timed out at 5000 ms at load ~170 | `vitest-full.log` |
| the five files that failed in an earlier full run at load 50-66 (six timeouts, the menu contract, boot-graph), re-run alone | floor 90/91, HEAD 88/91. The floor's one failure is the DropdownMenu focus-restore contract, which then passed 12/12 twice (`vitest-menu-floor.log`) and passes on HEAD (`vitest-menu-head.log`). HEAD's three are `boot-graph`, which needs a built `dist-demo` and passed 14/14 on the floor after the demo build | `vitest-rerun-floor.log`, `vitest-rerun-head.log` |

No unit failure reproduces on the floor that does not also flake on HEAD or depend on a build artefact.

---

## 4 · H2 on HEAD + floor

`node ../harness/run.mjs --build <floor build> --adapter adapter-floor.mjs --out <out> --safari`, light (no scheme forced, Playwright renders light) and again with `DOCK_HARNESS_THEME=dark`. `floor-vs-head.mjs` joins each run to `H2-records/head-cells.json` (run `baseline`).

### 4.1 · The theme knob (harness change)

H2's witnesses opened every scene in the default scheme except W7, which carries its own light/dark matrix. `lib.mjs` `openScene` now takes its default theme from `DOCK_HARNESS_THEME` (asserted after load, as before), and W7's per-cell themes still win. `HARNESS.md` §1 documents it. With the knob unset every witness behaves exactly as H2 recorded it.

### 4.2 · Per witness and engine, light and dark

Counted cells passing (UNMEASURED and RECORD excluded). The HEAD columns are H2's baseline, which ran in the default scheme only.

| witness | Chromium light | Chromium dark | Chromium HEAD | Playwright WebKit light | Playwright WebKit dark | Playwright WebKit HEAD +shim / unshimmed | Safari |
|---|---|---|---|---|---|---|---|
| W1 | 13/22 | 13/22 | 6/22 | 13/22 | 13/22 | 6/22 / 0/22 | UNMEASURED (owner's safaridriver checkbox) |
| W2 | 7/8 | 7/8 | 2/8 | 7/8 | 7/8 | 2/8 / 0/8 | UNMEASURED (…) |
| W3 | 3/19 | 3/19 | 2/19 | 2/19 | 2/19 | 1/19 / 0/19 | UNMEASURED (…) |
| W4 | 12/13 | 12/13 | 2/13 | 12/13 | 12/13 | 2/13 / 0/8 | UNMEASURED (…) |
| W5 | 6/6 | 6/6 | 0/6 | 6/6 | 6/6 | 0/6 / 0/6 | UNMEASURED (…) |
| W6 | 2/4 | 2/4 | 2/4 | 2/4 | 2/4 | 2/4 / 0/4 | UNMEASURED (…) |
| W7 | 6/18 | 6/18 | 6/18 | 6/18 | 6/18 | 6/18 / 0/20 | UNMEASURED (…) |
| W8 | 3/6 | 3/6 | 2/6 | 2/6 | 2/6 | 2/6 / 0/6 | UNMEASURED (…) |
| R6 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 / 0/1 | UNMEASURED (…) |
| load | 49-95 | 48-214 | 27-265 | 46-79 | 46-256 | — | — |

### 4.3 · Timing cells, re-run

Light and dark agree cell for cell except W8 Playwright WebKit `pacing`: `swap` failed in light (load 47) and passed in dark; `content-add` passed in light and failed in dark (load 133). Two re-runs per theme at load 166-222 (`floor-cells.json`, runs `rerun1`, `rerun2`): `swap` passed 2 of 4 and `content-add` passed 2 of 4. Neither reproduces consistently, and every failure came at a load above 8, so both are **NOT-REPRODUCED** under the load law. `sharp` failed on all six runs (expand, collapse, form-expand), as it does at HEAD: it is the carrier's counter-scale (§5). The W3 `window` failures sit at 541-609 ms on every run at every load, against a 257-300 ms allowance, and are not load artefacts.

### 4.4 · What changed against HEAD, by cell

Cells that went RED → GREEN in both engines and both themes:
- W1: `morph·collapsed-rest`, `vmorph·collapsed-rest`, `card·collapsed-rest`, `rail·rest`, `rail·scrolled-end`, `rail·focus-end`, `sidebar·short-viewport` (rests, rail ends). The first expands pass `moves` now (HEAD: 2 distinct extents); they still fail on `corner`, so the cell verdict does not change.
- W2: routes 1-h, 2, 3, 4 and 6 (ring cut 0; no scroll container on runs that fit).
- W3: `first-expand` continuity, trajectory, terminal; `warm-expand` and `anchor-end·warm-expand` landing (no sub-pixel ring); `wide·collapsed-rest` faces (18 px at HEAD, 0 now, both engines).
- W4: the nine compact cells, `coarse·no-hover-latch`, `coarse·tap-pins`.
- W5: all six.
- W6: `form·expand` continuity, trajectory, terminal (it now fails `window` only).
- W8: `compact` (absent at HEAD).

One cell went GREEN → RED against HEAD: W8 Playwright WebKit `swap` in light, on `pacing`, which is NOT-REPRODUCED (§4.3). None did in Chromium, and none did in dark. Inside cells that fail at HEAD and on the floor alike, Playwright WebKit W3 `warm-collapse` and `warm-expand` read `faces` (30 px of face ink beyond the plate in the screencast), which HEAD's failed lists for the same two cells also carry. The per-cell join is `compare-light.json` / `compare-dark.json`, field `changed`.

---

## 5 · What stays RED, and whose it is

| cells | why | owner |
|---|---|---|
| W1 morph-frame `corner` (horizontal 4.3-6.1 px, vertical 3.6-6.1 px), card `card` spread in flight | HEAD's carrier scales the root on one axis (`shape.css` `--dock-size-scale`), which squashes the corner mid-morph | the routes' P3 carrier (B′ plate insets, G's aperture) |
| W3 `window` (541-609 ms), `seatStep`, `seatOverlap`, `faces` in flight, content ±, lead ±, swaps, reversal, anchor, `viewport-resize` (6.09 px, no window), `ticking`, `seat-transition` (no window) | the carrier: the window rides `--duration-panel`; content changes open no morph; seats are not inverted | routes, §7.3 B′ items 1, 3, 4, 6 and G items 3-4 |
| W4 `compact·non-first-current` (a seat steps 18.79 px in one frame) | seats leave the compact rung in one frame (`display: none`) | routes, §7.3 B′ item 7 |
| W6 `form·expand` / `form·collapse` `window` (and `faces` in Playwright WebKit) | the carrier's window | routes |
| W8 `sharp` on expand, collapse and form-expand (`div.dock-persistent` at scale 3.99 on the expand's in-flight frames, 1.04 on collapse) | the carrier's counter-scale of the persistent regions. At HEAD the first expand jumped and showed no in-flight frames; the floor's continuous first expand exposes them | routes |
| W2 `route1·long-run-v` `keyboard` (Seat 1 unreachable by Tab + arrows, 10/11) | identical at HEAD; keyboard seat resolution beyond the snap lattice is F-19's interface, outside D2 | F-19 / D1 |
| W7 `gutter` (0 px, bound ≥ 8) and `badge` on side and canvas docks | O-67 asks for a gutter and a reserved badge seat; no floor row builds either | the routes' O-67 obligation |

---

## 6 · The §5 defaults, as built

| question | default applied | where it shows |
|---|---|---|
| Q-1 the cut cap | (a) struck; no plate-level cue. **The cue gap is recorded:** an overflowing run has no truncation cue at the plate; a cue, if ruled, goes on the content (option (c)) | `run.css:29`; G-DOCK-RUN "no scroll timeline" |
| Q-2 genuine overflow | (a) a native snap scroller inside a paint gutter, only under `[data-overflowing]` | `run.css:159-170` |
| Q-3 the prop budget | (b) one grouped member. The count is **7** (`fitContent`, `backdropMode`, `shape`, `orientation`, `collapse`, `backgroundCanvas`, `scroll`); G-DOCK-BUDGET no longer asserts six | `useDockShellProps.ts:122` |
| Q-4 the landing clock | not the floor's: the carrier is unchanged; W3 reports the window against the pinned rung | — |
| Q-5 bounce | (a) ζ 0.88, unchanged | — |
| Q-6 canon P5 | not the floor's (the routes' carrier) | — |
| Q-7 hit against paint | not built at the floor; the routes own the plate's in-motion geometry | — |
| Q-8 rim semantics | (a) decorative, under the plate's `aria-hidden` | `GlassDock.vue:398-408` |
| Q-9 retired facilities | untouched | — |
| Q-10 the collapsed face | (a) the summary is a seat-row square; wide collapsed content is a consumer addendum | `morph.css:107` |

---

## 7 · Consumer impact (for the landing packets)

- **chicago** `src/style.css:131` sets `--dock-cap-rest: 9999px`. The token no longer exists, so the override is dead and retires by E-6 addendum. Its `.page-dock .dock-run { overflow: visible }` override also becomes redundant: a fitting run is `overflow: visible` now.
- **keyframes.js** `ChromeDock.vue:526` and `TransportDock.vue:50` name `--dock-collapsed-summary-min-size` in comments only.
- **`--dock-padding-inline` no longer pads a horizontal dock**: each dock pads every side with its cross-axis pad. No consumer sets either `--dock-padding-*` token (grep of value.js, keyframes.js, fourier-analysis and chicago sources). A horizontal dock at the comfortable density is 8 px narrower (inline pad 12 → 8 px per side); its height is unchanged at 56 px.
- **`useDockSearch`** loses `collapseOnScroll`, `scrollContainer`, `chromeRef` and `scrollChrome`; no consumer uses them.
- **`--dock-vertical-padding`**, `--dock-collapsed-padding`, `--dock-collapsed-summary-min-size`, `--dock-search-shrink-*` and `--dock-plate-{collapsed,expanded}-border` are struck with no alias (E-1).

---

## 8 · Open gaps

1. Real Safari: every cell **UNMEASURED (owner's safaridriver checkbox)**, including whether shipping Safari mounts the dock without the nested `color-mix()` (row 6) and the `:dir(rtl)` rim origin.
2. The overflow cue (Q-1): an overflowing run has none.
3. The W3 face and seat rows, the window, content changes and `sharp` are the carrier's and stay RED until a route lands (§5).
4. The earlier full unit run at load 50-66 lost six tests to 5 s timeouts; at load ~170 the v3 full run lost one. Each passes alone on both trees. The full suite has not run at low load in this session.
5. W7 `gutter` and `badge` (O-67) and W2's vertical keyboard reach (F-19) are unchanged from HEAD.
6. `budgetOf` in the endpoint model caps at the parent's content box and the root's `max-*-size`, not at a consumer `width` on the root. The run's overflow flag does read the run's own used size (W2 route 5 green); the endpoint cap is a route-level concern if a route's carrier reads it.
