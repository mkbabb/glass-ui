# LANE α — UNIT 8 (π-CURE · R1–R4) · π QUEUE

**ENQUEUE ONLY.** No browser was opened by this seat. Nothing below is claimed; every
cell is owed. Captures ENQUEUE to the singleton browser seat — a second concurrent
browser owner hijacks the first's tab, and a `getContext()` on a live canvas steals the
context and fakes a black fallback, so these are screenshot + computed-style observations
only.

Chromium 149 @1440×900 · 393×852 dpr3 coarse. Real Safari 26.4 via
`scripts/safari-probe.mjs` (`pkill -f safaridriver` first) @1440×848 · 430×848 — never
Playwright-WebKit under a Safari label; they give OPPOSITE results on this repo.

**Every cell is a DELTA cell.** Each names the exact arm from
`docs/tranches/BK/execution/2026-08-25-pi-band/PI-CENSUS.md` §3 that routed it, so the
re-capture is a paired before/after against a banked artifact rather than a fresh
opinion. The predecessor artifacts live in
`docs/tranches/BK/execution/2026-08-25-pi-band/alpha-dock-search/`.

---

## §1 · THE FOUR CELLS

### π-RERUN-R1 — the vertical run gap

**Route** R1 · **owner** #47 W9, x-ref W3 · **cure** `shell-regions.css` gap strike.

**Predecessor arm** — two artifacts, each cited for its own figures [2026-08-28 ·
driver, the adjudicated CURE 1+2: the prior text fused these under one name and a
nonexistent `-1440-dark.json` member]:
`pi-PROPORTION-lattice-layout-overflow-1440-light.json` — the vertical dock at `i=0`:
declared `P_token 48px`, `run_computed_gap` **6px**, painted step **46**, seat offsets
`0,46,92,138…`; the horizontal lattice exact at 48/48.
`pi-REACH-vertical-dock3-393-coarse-dark.json` (figure also at
`PI-BATTERY-alpha-dock-search.md:118`) — seat offsets `19,69,119,169,219`, step
**50 = 44+6** at the coarse 44px seat, against a declared **P = 52**.

**MUST SHOW** — same route, same viewport, both themes, BOTH library vertical docks
(`/dock/overview`'s `demo-sidebar-dock` and the second vertical instance the census
found):

1. painted vertical step **=== `--dock-pitch`**, read from `getComputedStyle`, not
   assumed — the census's own failure mode was a declared P nobody compared to the paint;
2. the cumulative 12-seat column length equal to `11 × P + seat` — the 24px shortfall
   gone as an ARITHMETIC identity, not eyeballed;
3. the horizontal lattice **still** exact at 48/48 — the strike must not have moved it;
4. **non-run layers unmoved**: a `.dock-layer` that is NOT `.dock-run` (a summary pane,
   a `.dock-layer-group` track) paints the same gap it painted before. This is the
   strike's whole risk — it deleted a (0,3,0) rule and left a (0,1,0) one carrying the
   identical declaration. Byte-identical paint is the claim; this arm is what falsifies
   it.

### π-RERUN-R2 — the focus ring the run port was cutting off

**Route** R2 · **owner** #47 W8 MATERIAL + W3 LATTICE · **cure** `--dock-ring-reserve`
+ the cross-axis padding/negative-margin pair on both run rules.

**Predecessor arm** — `pi-MATERIAL-ringclip-census-overview-1440-{light,dark}.json`:
`total 67`, `clippedCount 63`, every clipper `dock-layer dock-layer--full dock-run`,
every cut **4px**. Re-run the census script **unchanged** so the two numbers are
comparable.

**MUST SHOW**:

1. `clippedCount` on the **cross** axis → **0**. The stored 20-row sample splits 12
   cross-only · 3 scroll-only · 5 both, so a truthful post-cure total is **not 0** — the
   report must break the count out BY AXIS, because a bare `clippedCount` cannot
   distinguish the cure from the residual;
2. the **scroll-axis** residual reported as a number and not silently folded away: a
   seat flush against a scroll extremity still loses its outward 4px, this is a scroller
   property rather than R2, and §2.2 of the RECORD refuses to cure it;
3. **the lattice is byte-unchanged** — this is the cure's central claim and its central
   risk. Paired before/after of: seat offsets, `--dock-pitch`, the run's **margin-box**
   rect, the dock's outer rect, and the snap rest positions at `scrollLeft/Top: 0` and at
   one interior rest. The negative margin is supposed to hand every pixel of the padding
   back to the parent; if it does not, this cure moved the dock;
4. the reserve paints where it was said to — the 4px lands **inside**
   `--dock-padding-block`, over the dock's own frosted plate, not over the page;
5. both orientations, because the pair ROTATES: vertical reserves inline, horizontal
   reserves block, and the base pair is zeroed on the vertical rule. A vertical dock
   whose snap positions shifted means the zeroing did not take;
6. light AND dark — the defect was geometry and read identically in both, so the cure
   must too;
7. **the scroll timeline still runs**: `.dock-plate`'s cut caps are driven by
   `scroll-timeline: --dock-run`. Padding on a scroll container is exactly the kind of
   thing that perturbs a progress timeline. Capture the leading/trailing cap at rest,
   mid-scroll and flush-at-end.

### π-RERUN-R3 — the triple ring on the dock dropdown trigger

**Route** R3 · **owner** #47 W8 MATERIAL · **cure** `overlay-plate.css:120` re-pointed
from `box-shadow` + `outline: none` onto `outline`.

**Predecessor arm** — `pi-MATERIAL-dropdown-doublering-1440-light.json`, which measured
three concentric rings at one `:focus-visible` on
`.dock-dropdown-trigger.menu__trigger`, against a clean plain `.dock-dropdown-trigger`
in the paired capture.

**MUST SHOW**:

1. **exactly one ring** on the compound trigger, keyboard-focused (`:focus-visible`, so
   drive it with Tab — a pointer-opened menu must paint no keyboard ring, and a click
   that paints one is its own defect);
2. the surviving ring is the **DOCK's** (2px/2px, `--dock-ring-color`), not the house
   one — the cascade argument in `overlay-plate.css:145-152` says the later dock rule
   takes the outline channel, and this is where that is either true or not;
3. a **standalone** `.menu__trigger` outside any dock still paints a ring, and it is the
   house `--ink-perimeter` 0.48 form. The cure must not have traded three rings for zero
   somewhere else;
4. the plain `.dock-dropdown-trigger` (no `menu__trigger`) is **unchanged** from its
   banked clean capture;
5. resting `box-shadow` still `none` — the shadow removal took nothing else with it;
6. both themes.

### π-RERUN-R4 — the combobox that is now a combobox

**Route** R4 · **owner** #42 W-SEARCH · **cure** `demo/stories/data/search.vue`.

**Predecessor arm** — `pi-SEARCH-ROUTE-aria-wiring-1440-dark.json`: the 5-step ArrowDown
walk with `aria-selected` and `role=option` at **0 document-wide** on every step and an
empty listbox `id`.

The unit arm already proves the semantics from the rendered DOM
(`search-contracts.test.ts`, born RED at §3 of the RECORD, 7 passed). **This cell exists
for the two halves jsdom cannot see** — and it must not re-litigate the three the unit
arm owns:

1. **the same 5-step walk on a live engine**, re-running the census script unchanged:
   `role=option` count **12** at every step, exactly one `aria-selected=true`, and the
   `aria-activedescendant` resolving to a node that IS that option;
2. **the selected row is VISIBLE.** `.card[role="option"][data-selected="true"]` sets
   `--card-fill: --fill-selected` (0.12) — a paint that was dead on this route before the
   cure, and that the unit arm cannot see. Photometer the active row against its
   neighbours, both themes: an announced selection with no non-ARIA indication is the
   defect this cure would otherwise have half-fixed;
3. **the 12 tab stops, captured rather than argued about.** Tab from the field and record
   where focus lands, 13 presses. The RECORD (§2.4) adopts them as `Card`'s option
   contract and routes the question to the Card owner; this is the artifact that
   disposition is judged on;
4. dark AND light — the predecessor arm was dark-only.

---

## §2 · WHAT IS NOT ENQUEUED, AND WHY

**No cell for the R1 strike's effect on `.dock-layer-group` tracks.** It is inside
π-RERUN-R1 clause 4 rather than a peer cell — the same capture answers it, and splitting
it would mint a cell to look thorough.

**No forced-colors cell for R3**, even though the R3 cure's stated benefit is that an
outline survives WHC where a `box-shadow` ring vanishes. The forced-colors sub-arm is
already recorded **BLOCKED** in the census (§4.2: no forced-colors seam in `emulate`, no
CDP passthrough, hand-rolled scripts barred). Enqueuing it again would carry an
obligation no seat can drain and would double-count a block already on the books. It
stays owed where it already is.

**No Safari cells.** `lanealpha-unit5/PI-QUEUE.md:49-51` already carries every α Safari
cell as BLOCKED → BAND-BUILD behind the ~249 build-emitted `@supports color-mix` guards.
Unchanged by this unit and not re-minted here.

---

## §3 · THE α QUEUE AFTER THIS UNIT

| origin | cells | state |
|---|---|---|
| unit 5 | π-RUN · π-CUT · π-REACH · π-MATERIAL · π-PROPORTION · π-MORPH · π-HOVER-HANDOFF · π-DEFAULT-POSTURE · π-SEAT · π-TAP | **DRAINED** at the π band (7 green · 4 defect-routed → R1–R4) |
| unit 6 | π-SEARCH-ROUTE | **DRAINED** (paint green · a11y walk → R4) |
| unit 7 | — (zero cells) | — |
| **unit 8** | **π-RERUN-R1 · π-RERUN-R2 · π-RERUN-R3 · π-RERUN-R4** | **OWED — 4 cells, 0 claimed** |

The four routes the band found are cured in code and **unproven in paint**. That is the
honest state of this unit: `vue-tsc` 0, the battery's only RED foreign, the R4 semantics
proved born-RED → green off the rendered DOM, and four cells owed to the singleton seat.
A captured DELTA artifact is the only thing that closes them — never a commit message.
