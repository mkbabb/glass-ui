# 10.1.5 — critique, round 10 (adversarial)

Critic: claude-opus-5-5, fresh context. Branch `release/10.1.5` at `3ecae2175` (fix round 9:
`a81516114`, `956b1889a`, `c0cb5e685`, `3be8e0bca`, the rebinds `9fffeee9c`/`4f5fd4a85`, the
witness commits and the records `58f4c0436`/`3ecae2175`). I read every commit over `v10.1.4`,
`critique-9.md`, `fix-9.md`, every `inbound-*.md` (O-193 included) and every orchestrator note,
and fix 9's `src` diff against `51af0f9b5` (`dockMorphMeasure.ts` `capture`/`publishYield`, the
`:where(.dock-layers) > .dock-run` scoping in `run.css`).

Every run went through `guarded`: Chromium (`chromium-headless-new`) and Playwright WebKit 2287
(`--exclusive webkit`) as browser runs, g7 heavy. The guard warned the zone leak ARMED on every
admission (by the owner's order it does not hold runs) and refused none. The machine was busy:
my first g7 waited 25 min in the heavy queue, so I stopped that waiter by its PID and ran the
browser chains first.

## Probes

- **The branch's own spec**, `release-10-1-5.spec.ts` (94 cells), both engines.
- **g6** release-10-1-4 and release-10-1-3, both engines. **g7** on the committed tip.
- **Round 10's own cells**, `tests-visual/release-10-1-5-critic-10.spec.ts` on a new harness
  `tests-visual/release-10-1-5/critic-10{,-v1014}.{html,ts}` (the v1014 arm imports the
  `v10.1.4` tree under `release-10-1-5/v1014/`, verified byte-equal to the tag for `run.css`,
  `dockMorphMeasure.ts`, `GlassDock.vue` and the tokens). Rows bank to
  `critic-10/probe/<arm>/<project>/`.
  - **c10a** O-193: daraksha's geometry, a fit-content `collapse=false` dock of four DockControl
    seats (text tabs, and `shape="icon"`), the first current, beside a second plate of two
    controls and a DarkModeToggle; 390 and 1440, light and dark, default and static backdrop;
    rest, then each of the seven controls hovered, read at +150 and +700 ms.
  - **c10b** fix 9's endpoint band: the fit edge `E` found by a 1 px sweep at rest, then a host
    change of 1, 2, 3 and 4 px across it mid-expand (at 110 and 300 ms), both directions; a host
    that narrows the dock 1 px a frame through the expand; the vertical form across the stage's
    fit edge.
  - **c10c** O-187's cure on other shapes: a nested group holding the current seat, a nested
    group in a vertical dock, RTL, 390 and 320 coarse; rest and each seat hovered.
  - **c10d** a nested group holding the current seat: a screenshot and a hit test per seat.
- **Critique 9's cells re-run on the tip** (`critic-10b.spec.ts`, output `critic-10/c9cells/`):
  c9a (N1 fit band), c9b/c9c, c9d, c9e (P1/P2), c9f (P4, 32 first expands per engine).
- **Critique 1's sweep re-run on the tip** (`critic-10c.spec.ts`, output `critic-10/c1cells/`):
  the dock at 320/390/430/844/1440, fine and coarse, at rest, each seat hovered, pressed, each
  seat keyboard-focused, focus+hover on the trailing seat, fit=0; overflow, collapse, vertical
  and the three shapes; type and menu at 390 and 1280; the Slider's rungs, min/mid/max, step
  edges, disabled, RTL, vertical and inverted, and a drag to each end.
- Drivers: `scripts/all-critic-10.sh`, `scripts/chain-critic-10.sh`,
  `scripts/gates-critic-10.sh`; judges `critic-10/judge-c10.py`, `judge-c1.py`, `judge-c1b.py`.
  Config `tests-visual/release-10-1-5-critic-10.config.ts`. Run log `critic-10/runs.txt`.

| run | engine | result |
|---|---|---|
| `release-10-1-5.spec.ts` | Chromium / WebKit 2287 | 94/94 / 94/94 |
| g6 release-10-1-4 | Chromium / WebKit | 23/23 / 15 + 8 skips (`page.pdf`) |
| g6 release-10-1-3 | Chromium / WebKit | 60/60 / 58 + 2 skips (CDP swipe); D-1 green in both |
| c10 cells, branch and v10.1.4 | Chromium / WebKit | 5/5 and 5/5 / 6/6 and 6/6, all banked |
| critique 9's cells on the tip | Chromium / WebKit | 12/12 / 12/12 |
| critique 1's sweep on the tip | Chromium / WebKit | 7/7 / 7/7 |
| g7 (`critic-10/g7/`) | node | typecheck 0, build 0, demo:dist:build 0, vitest 247/247 files (2397 passed, 10 expected fail, 1 skip), verify:package terminal CLEAN at 10.1.5 (ratchet datum 2953525 holds) |

## Verdict

Fix 9's cures hold where they were aimed. P1 and P2 are cured in both engines: c9e's clamps
(eight seats to 220 px, four seats to 200 px, the vertical stage into the yield band, at 110 and
300 ms, both pointers) step S1 0 px at the settle (vertical 0.02 px). N1 holds (c9a: settle
≤ 0.02 px, collapse start 0 px, the flag the layout's truth in every row). O-186, O-187's three
gates and O-193 are GREEN on the branch at 1440 and 390 in both engines and RED on v10.1.4.
The D-1 cell is green in both engines. g6 is GREEN in both engines. g7 is GREEN. The posture sweep, the Slider,
the type floor and the menu gap read as critique 9 read them.

The branch is **not ready to tag**:
- **Q2** (medium, both engines, introduced by `956b1889a`): a consumer's nested `.dock-run`
  group that holds the current seat is still sized as the run's open seat (136 px), but it is no
  longer a scroll container, so its tabs paint over the dock's own seats; the run then scrolls
  112 px while `data-run-fits` says it fits. v10.1.4 kept the tabs inside the group.
- **Q1** (low-medium, both engines, introduced by `3be8e0bca`): fix 9's 2 px endpoint band holds
  a real host change of 1 or 2 px. When that change crosses the fit edge mid-expand, every seat
  steps 9 to 11 px and the plate 2 px on the frame the morph settles: P1's gate, failed inside the
  band. v10.1.4 steps ≤ 0.09 px.
- **P4** (critique 9, low, WebKit only) reproduced again: 1 of 32 layered first expands rested at
  the narrow layer's 160 px, flagged as fitting, on a run that hides 375 px. Fix 9 left it open.

## Defects (reproduced)

### Q2: a nested group holding the current seat paints its tabs over the dock's seats (introduced by the O-187 cure; medium; both engines)

The O-187 cure (`956b1889a`) scoped every run rule to `.glass-dock :where(.dock-layers) >
.dock-run`, so a consumer's nested `<div class="dock-run">` is no longer a scroll container. The
open-seat arm kept its `:has()` form: `.glass-dock :where(.dock-layers) > .dock-run >
:has([aria-current]:not([aria-current="false"]))` sets `inline-size: var(--dock-open-seat)` on
any child of the run that CONTAINS the current seat. A consumer group of tabs is such a child, so
it is sized as one open seat, and its tabs now overflow it visibly.

- **c10c / c10d, scene `seats&nest=1&current=1`** (tabs Overview, Methods, Results in the nested
  group, Overview current, then two icon seats): the group computes `inline-size: 136px` with
  `overflow: visible` and its tabs span 355 px (Chromium) / 360 px (WebKit). Methods' layout box
  overlaps both icon seats by 40 px. The run reads `sw 366 > cw 254` (WebKit 371/254) with
  `data-run-fits` set and the corners `28px` round, so the run hides Results (its centre hits
  nothing) behind a plate that says nothing is hidden. Coarse 390 (`tab:Data,tab:Notes,icon,icon`,
  Data current): the group is 148 px, Notes overlaps the first icon by 17.4 px (WebKit 19.7).
- **Paint:** `critic-10/probe/branch/webkit/c10d-1440.png` shows "Methods" drawn through both
  icons; `c10d-390.png` shows "Notes" drawn through the first icon. The v10.1.4 arm
  (`critic-10/probe/v1014/webkit/c10d-*.png`) draws the current tab in its pill and the icons
  clear, the other tabs scrolled inside the 136 px group.
- **Also on the branch:** `current=2` (Methods current) reads the same, `current=4` (an icon seat
  current, outside the group) does not. RTL reads the same, mirrored. The vertical nested group
  is not affected (the vertical arm sizes `block-size`).
- Fix 9's record noted the open-seat arm sizing the group and set it aside because "Gregg's
  measurements show his group is not sized that way". A tab group whose page is one of its tabs
  is the ordinary shape of the case O-187 reports, and once the group stopped clipping, the arm
  makes it a paint collision rather than a hidden scroll.
- **Cure direction:** the open seat is a seat, so the `:has()` arm names one: it matches only a
  child that is itself one declared seat or seat wrapper (the reserve's seat walk already reads
  `DOCK_SEAT_ATTR`), never a consumer group of several seats. Then a nested group is plain
  consumer markup on every rule, which is what the O-187 brief asks. **Gate:** c10c/c10d at 1440
  and 390, both engines: with the current seat inside a nested group, no two seats' boxes
  intersect, `sw == cw` on a fitting run, and every tab's centre hits that tab.

### Q1: the endpoint band holds a real 1-2 px host change, so a change across the fit edge steps 9-11 px at the settle (introduced by fix 9's final form; low-medium; both engines)

`capture` now keeps the rest endpoint through a morph while a fresh reading is within
`ENDPOINT_BAND_PX` (2) of it, and the yield is re-read from the rest port only past the band. The
band cannot tell WebKit's zoom rounding from a host that really moves the dock by 1 or 2 px. When
that move crosses the fit edge, `data-run-fits` and the reserve change at `release`, on the settle
frame, which is P1 again.

- **c10b horizontal** (`tab:Home,icon,icon,icon`, `collapse="closed"`; the fit edge `E` is
  242 px Chromium fine, 244 WebKit fine, 249/251 coarse): rest at `E`, `expand()`, the dock's
  `max-inline-size` set to `E-1` or `E-2` at 110 or 300 ms. S1 (net of scroll) steps **10 px**
  (coarse 9 px) between the last morph frame and the settle, both engines, both clamp times, and
  the trailing corners cut on that frame. The other direction (`E-1 → E+1`, `E-2 → E`) steps
  10.41-10.95 px (coarse 9.41-9.91) and the plate's own width steps **2 px** at the settle, since
  the morph ran to the held endpoint. A 3 or 4 px change (`E → E-3`, `E+2 → E-2`) escapes the band
  and steps 0 px, as fix 9 intends.
- **c10b vertical** (six icon seats; the stage's fit edge 314 fine, 338 coarse): `Ev → Ev-1`,
  `Ev-2` steps 7.02 px; `Ev-1 → Ev+1` 6.48 px; a 2 px change inside the band (`Ev+6 → Ev+4`)
  steps 0.98 px (the yield's room moves at the settle). Both engines.
- **v10.1.4** steps 0.05 px (fine) and 0.09 px (coarse) horizontally and 0.02 px vertically in
  every one of those cells (`critic-10/probe/v1014/*/c10b-*.json`). It has no yield and no band.
- A host that narrows the dock 1 px a frame through the expand (W to W-24) steps 0 px: the
  cumulative change leaves the band after two frames and the flag moves mid-morph.
- It needs a host change of 1-2 px within 2 px of the fit edge during an expand, so it is
  narrower than P1, but it is P1's failure through the band's door and it fails P1's own gate
  ("no S1 step over 0.5 px between the last morph frame and the settle").
- **Cure direction:** key the hold on the cause, not the size. A morph keeps its endpoint across
  the root's own re-reads (the zoom wobble is the box the morph moves), and re-reads on any change
  to what constrains the dock (the host box the observer already watches, the dock's own computed
  `max-inline-size`/`inline-size`, a window resize), whatever its size. Or keep the band for the
  morph target alone and read the flag from the rest port on every morph frame, so a crossing of
  the fit edge lands mid-morph. **Gate:** c10b's band cells in both engines with S1 ≤ 0.5 px at
  the settle; `p1`, `n1` and the D-1 cell stay GREEN.

### P4 (critique 9, still open): a layered first expand in WebKit can rest at the narrow layer's width (low; WebKit only)

- **c9f on the tip** (`critic-10/c9cells/branch/webkit/c9f-fine.json`, 390, repeat 0): the plate
  rests at **160 px** (`--dock-expanded-px: 160px`), `cw 156`, `sw 531`, `data-run-fits` set and
  `28px` on all four corners. The flag flipped to fitting at 60 ms, mid-morph. 1 of 32 in WebKit
  (16 fine, 16 coarse); 0 of 32 in Chromium.
- With fix 9 a mid-morph reading past the band also publishes the flag from the rest port, so the
  wrong endpoint now writes the wrong flag on the frame it is read. Fix 9's record left P4
  unattributed and uncured. Critique 9's cure direction stands (read the endpoint and the flag
  from the active layer's declared seats, and re-read when the active layer's box changes).

### Q3: the iOS no-zoom floor does not bind the Input, Textarea and NumberField (pre-existing; low; both engines; scope ruling)

- **critique 1's type cell on the tip** (`critic-10/c1cells/*/type-coarse.json`): at 390 on a
  coarse pointer the `.input-bar` field is 16 px (r6 cured, ratio to the subtitle 1.128), but the
  library's `Input` (`input[data-witness="pill"]`, class `field-control`) is **14 px**, in both
  engines. iOS Safari zooms the page when a field under 16 px takes focus.
- `src/components/_shared/field/control.css:122` sets `.field-control`'s `font-size:
  var(--type-small)`, and the field floor `--field-text-floor` is read only by `.input-pill` and
  `.input-bar-field`. The file is unchanged since v10.1.4, so this is not a regression. But the
  10.1.5 CHANGELOG says "the iOS no-zoom floor binds text fields", and the token's own docblock
  says the law binds FIELDS. `field-control` is every line or block text field the library ships.
- **Cure direction** (if the owner rules it in): `.field-control` reads
  `max(var(--type-small), var(--field-text-floor))`, no new token. Otherwise the CHANGELOG names
  the two recipes the floor binds.

## Recorded, not 10.1.5 defects

- **O-193's 390 tab cell overflows** at 390: four labelled tabs need 444 px beside the control
  plate, so the dock caps at 374 px and the run hides seats. The cut corner there is the design
  (r1: the cut fires on a run that hides something). The icon-shape dock fits at 390 and is GREEN.
- **WebKit's re-scroll after a port shrink** (critique 9's P3) shows again in c9e (`sl 128`, `sl 69`
  at the settle); S1 net of scroll steps 0. Pre-existing at v10.1.4.
- **The CHANGELOG** still describes only the first implement round and O-182. Critique 8 left the
  rewrite to the close seat. When it is rewritten it must also tell consumers that a `.dock-run`
  nested among the seats is now plain markup (O-187), since Gregg's reset rule depends on it.
- **The Slider held at max** draws its fill 7 px past the track (278.97 vs 272, the grab's
  `scale`), clipped by the track's `overflow: hidden`. The same as critique 1 read it.

## What held (refutation attempts that failed)

- **P1/P2** (c9e, both engines, both pointers, both clamp times): S1 steps 0 px at the settle
  horizontally and 0.02 px vertically. The flag flips mid-morph on the frame the clamp lands.
- **N1** (c9a, both engines): across the fit band 308 to 356, settle ≤ 0.02 px, collapse start
  0 px, the flag the layout's truth at rest in every row.
- **O-186/O-187** (the branch's q1-q3 and c10c, both engines): at 1440 and 390 the static
  fit-content dock under hover on every control keeps one corner of half its cross extent, no
  `%`, and `sw == cw`; exactly one element names `--dock-run`, the active full pane; the nested
  group's hovered tabs keep their whole 1.1 ink. RTL, vertical and 320 coarse nested groups hold
  the same (except Q2's current-seat shape).
- **O-193** (c10a): the branch keeps every read on both plates at one length of half the cross
  extent, no `%` and `sw == cw`, at 1440 for text tabs and icons, light and dark, default and
  static backdrop, under hover on each of the seven controls, in both engines; at 390 for the icon
  shape and the control plate. v10.1.4 is RED in both engines: hovering the trailing seat S4
  computes `50% calc(45.8333% + 1.33333px) …` (Chromium) / `calc(47.916667% + 0.666667px) 50% …`
  (WebKit) with the run 2-5 px over its port, and every rest corner is `9999px`.
- **The posture sweep** (critique 1's cells, both engines): at 320/390/430/844/1440, fine and
  coarse, at rest, hovered, pressed, keyboard-focused and focus+hover, the pill rests at half its
  cross extent with `sw == cw`, the collapsed plate is a circle, no radius carries `%`, and no
  focused seat's ring is cut by more than 0.5 px. The rounded and card shapes keep their own radii.
- **Slider** (both engines): the thumb is 8/16/24 px at the sm/md/lg rungs at min, mid and max,
  and the fill is one thumb at min and the whole track at max; step edges, RTL, vertical,
  inverted and a drag to each end the same; disabled dims thumb and fill together (0.5).
- **Type** (both engines): `.input-bar` 16 px at 390 coarse (1.128 × the subtitle), 14 px at 390
  fine, 16 px at 1280; menu items 16 px coarse, sm buttons 13.71 px (the 6/7 rung).
- **Menu gap** (both engines, fine and coarse): icon, checkbox, radio and submenu-trigger items
  4 px icon-to-label, the `--icon-label-gap` token; text-only items carry the 4 px column gap
  with nothing to separate.
- **g6** in both engines and the D-1 cell (fix 9's endpoint hold): green.

## Not measured

- Real Safari: safaridriver is not enabled. Every WebKit cell is Playwright WebKit 2287.
- The O-182 halo, M1-M4 and the round-7 inbound rows were read through the branch spec's own
  witnesses (m1-m5, n1, the m3 rows; 94/94 in both engines), not re-probed cell by cell.
- A touch drag on the Slider (Playwright's touchscreen has no move).
