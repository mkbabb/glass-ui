# π BATTERY — BAND α (dock + search) · 11 CELLS · ALL DRAINED

**Seat:** singleton browser seat, `claude-opus-5` (asserted from own subagent transcript
`agent-a2bf4eb7eff446498.jsonl`, `model: claude-opus-5`; assertion &&-gated the chain).
**Session:** 2026-08-28. **Directory name kept** (`2026-08-25-pi-band/`) — it is the band's
identity, cited in ⊕⁷⁹. Dates live inside the records, not in the path.

**Sources of record read in full before any capture:**
`2026-08-10-lanealpha-unit5/PI-QUEUE.md` (10 cells) ·
`2026-08-10-lanealpha-unit6/PI-QUEUE.md` (π-SEARCH-ROUTE) ·
`2026-08-10-lanealpha-unit7/PI-QUEUE.md` — **verified: unit 7 adds ZERO cells**, as its
§1 states; its §3 `π-VIRTUAL-ANCHOR` is named-for-T1, explicitly NOT enqueued, and is
**not** drained here. Total owed **11**, total drained **11**.

**Environment.** Dev server REUSED, not started by this seat: `localhost:5400`,
port-guarded before first capture (`curl` → `200`, `<title>glass-ui Feature Demo</title>`;
all six target routes `/dock`, `/dock/overview`, `/dock/layers`, `/dock/overflow`,
`/dock/controls`, `/data/search` → `200`). **Not killed at band end** — this seat did not
start it. Browser: the `chrome-devtools` MCP daemon, driven through the
`chrome-devtools-mcp:chrome-devtools-cli` skill (the MCP tool schemas are not registered in
this session; the CLI is the same server over its socket — no hand-rolled script was used).
Daemon inherited live from the predecessor: `pid=20473`, `version=1.2.0`,
`args=[--no-headless --isolated …]`. ONE browser context throughout.

**Observation discipline.** Screenshot + `getComputedStyle` only. `getContext()` was never
called on any canvas. Screenshots are dpr-scaled; every crop scales the CSS box by the
live `devicePixelRatio` before cropping. Scroll/state reads carry ≥500ms settle where a
scroll or a class flip precedes the read.

---

## WALL RECOVERY — predecessor census, ADOPT-OR-SUPERSEDE per file

The predecessor band died at a session wall on 2026-08-25 leaving 18 files and **no**
`PI-BATTERY` record. Each was censused against its own filename + content before use.
Every adopted file carries its capture conditions **inside** it (`url`, `vw`/`vh`, `dpr`,
`coarse`, `dark`/`htmlClass`), which is what made adoption verifiable rather than assumed.

| file(s) | conditions verifiable from content? | disposition |
|---|---|---|
| `pi-CUT-card-dock9-393-coarse-dark.json`, `pi-CUT-40px-pixel-scan.json`, `pi-CUT-scan-off{0,86,171}.json` + 3 PNGs + corner montage | YES — `dpr:3`, offsets, `settled` vs `requested`, full token + `plateAnim` record | **ADOPTED** 2026-08-28 |
| `pi-RUN-overview-393-coarse-dark.json`, `pi-RUN-overflow-393-coarse-dark.json`, `pi-RUN-interior-rest-393-coarse-dark.json` + PNG | YES — `url`, `vw:393`, `dpr:3`, `coarse:true`, `dark:true`, `htmlClass:"dark"` | **ADOPTED** 2026-08-28 |
| `pi-REACH-horizontal-dock9-393-coarse-dark.json`, `pi-REACH-vertical-dock3-393-coarse-dark.json` | YES — per-phase rows, `wheelCrossAxis` block | **ADOPTED** (wheel arm) — drag arm was **absent**, captured fresh below |
| `pi-PROPORTION-1440-fine-dark.json`, `pi-PROPORTION-393-coarse-dark.json` | YES — full header | **ADOPTED as corroboration**, but **SUPERSEDED as the measurement**: both read `runPaintedGap` off elements marked `isDirectChild:false`, so the number was not a flex-gap read. Fresh layout-box measurements taken (`*-FRESH`, `pi-PROPORTION-lattice-*`). The predecessor's `6px` finding is **confirmed** by the fresh work and given its root cause. |
| `00-dock-overview-1440-light.png` | partial — no paired-π, unlabelled crop | **SUPERSEDED** by the dated per-cell captures below |

Nothing was deleted. No gate file touched, no source byte touched.

---

## VERDICTS

| cell | verdict |
|---|---|
| π-RUN | **CAPTURED-GREEN** (adopted) |
| π-CUT | **CAPTURED-GREEN** (adopted) |
| π-REACH | **CAPTURED-GREEN** horizontal + drag · **DEFECT-ROUTED** vertical |
| π-MATERIAL | **DEFECT-ROUTED** ×2 · forced-colors sub-arm **BLOCKED** |
| π-PROPORTION | **DEFECT-ROUTED** |
| π-MORPH | **CAPTURED-GREEN** (one observation recorded against a stated criterion) |
| π-HOVER-HANDOFF | **CAPTURED-GREEN** |
| π-DEFAULT-POSTURE | **CAPTURED-GREEN** |
| π-SEAT | **CAPTURED-GREEN** — dark arm photometered, the standing debt discharged |
| π-TAP | **CAPTURED-GREEN** · genuine-touch sub-arm **BLOCKED** |
| π-SEARCH-ROUTE | paint **CAPTURED-GREEN** · a11y walk **DEFECT-ROUTED** |

---

## THE ONE ROOT CAUSE BEHIND THREE CELLS

π-PROPORTION, π-RUN's vertical arm and π-REACH's vertical arm are **one defect**, found
by measurement and then traced to two lines of CSS.

**Detectors, verbatim.**

`src/components/dock/styles/run.css:193` (selector at `:159`, specificity **(0,2,0)**):
```css
.glass-dock .dock-run { … gap: var(--dock-run-gap); }
```
`src/components/dock/styles/shell-regions.css:66-71`, specificity **(0,3,0)**:
```css
.glass-dock.vertical .dock-layer {
    flex-direction: column;
    align-items: stretch;
    gap: var(--dock-layer-gap, 0.375rem);
    min-width: 0;
}
```
The run element is `class="dock-layer dock-layer--full dock-run"` — it is **both**. On a
vertical dock the (0,3,0) rule wins, so the run paints `--dock-layer-gap` (6px) while
`--dock-pitch` is computed from `--dock-run-gap` (8px).

`run.css:191-192` states the failure condition in its own words:
> *"A pitch whose gap term is not the gap the box actually paints is a pitch that is
> quietly wrong."*

**Measured** (`pi-PROPORTION-lattice-layout-overflow-1440-light.json`, layout boxes —
`offsetLeft/offsetTop/offsetWidth`, walking through `display:contents` wrappers so the
true flex items are measured):

| dock | orientation | `--dock-pitch` | run computed `gap` | painted step | painted gaps |
|---|---|---|---|---|---|
| i=0 | **vertical** | `48px` | **6px** | **46** | `[6,6,6,6,6,6]` |
| i=2 | horizontal | `48px` | 8px | **48** | `[8,8,…]` |

Seat is 40px in both. The horizontal lattice is **exact**; the vertical lattice is **2px
short per seat**, cumulative **24px** over the 12-seat sidebar run.

Orientation, not the demo chassis: `pi-PROPORTION-layers-1440-light-FRESH.json` shows
run `gap: 6px` on **every** vertical dock including the two library ones
(`glass-dock vertical shape-rounded`, i=3 and i=5) and `8px` on **every** horizontal dock,
with `--dock-run-gap: 0.5rem` resolving on all eight.

**`--dock-layer-gap` was correctly seen NOT to move** with the retune — it reads
`calc(0.375rem * 1)` = 6px on all eight docks, which is the queue's stated requirement.

**Corroboration in the adopted files.** `pi-REACH-vertical-dock3-393-coarse-dark.json`
records `seatOff` `19, 69, 119, 169, 219` — a step of **50 = 44 + 6** at the coarse seat,
against the declared `P: 52`. The predecessor measured the drift without naming it.

**Second-order effect, π-REACH vertical.** In that same file every row reads
`settled: 0` — the vertical run never scrolled at all, and seats 3/4/5 report
`fullyVisible: false` with `delta` −130/−146/−146. Recorded as observed; that dock is
`collapsed` (`glass-dock vertical shape-pill collapsed`), which may itself explain the
absent scroll, so the anchor failure is reported **as a measurement, not a diagnosis**.

**Note for the owner, not a prescription.** `run.css` already uses the
`.glass-dock.vertical .dock-run` (0,3,0) selector shape at `:401` (for
`scroll-timeline: --dock-run block`). The specificity rung that would out-rank
`shell-regions.css:66` therefore already exists in the same file, applied to the same
element, for the same orientation split. Verified `run.css:398`'s second
`.glass-dock .dock-run` block sets **only** `scroll-timeline`, so it does not participate
in the gap cascade and the analysis above is complete.

**Owner:** BK #47 **W9** (the `--dock-run-gap` 6→8 retune — it landed in the token and on
horizontal runs, and never reached vertical runs). Cross-references W3 (lattice).

---

## π-MATERIAL — DEFECT-ROUTED ×2

**Detector, verbatim** — `src/components/dock/styles/index.css:271-277`:
```css
.dock-icon-button:focus-visible,
.dock-tab-button:focus-visible,
.dock-select-trigger:focus-visible,
.dock-dropdown-trigger:focus-visible {
    outline: var(--dock-ring-width) solid var(--dock-ring-color);
    outline-offset: var(--dock-ring-offset);
}
```
and `layer-group.css:313-316` for the switcher tab; register at `index.css:227-229`:
```css
--dock-ring-width:  var(--focus-ring-width);
--dock-ring-offset: var(--focus-ring-width);
--dock-ring-color:  color-mix(in srgb, var(--focus-ring-color) 48%, transparent);
```

**The re-point itself LANDED on all five families, both themes.** Measured
`outline: 2px solid … / 0.48, outline-offset: 2px`, `box-shadow: none`:
light `color(srgb 0.11 0.098 0.09 / 0.48)`, dark `color(srgb 0.73 0.718 0.67 / 0.48)`
(`pi-MATERIAL-overview-1440-{light,dark}.json`, `pi-MATERIAL-switchertab-layers-1440-dark.json`).
That is 2px / 2px offset / accent at 48%, exactly as the queue states.

### D1 — the ring is CLIPPED AWAY by the run port, both orientations

`pi-MATERIAL-ringclip-census-overview-1440-{light,dark}.json`: **63 of 67** dock controls
on `/dock/overview` have the ring clipped, identically in light and dark (it is geometry).

The ring's outer extent is offset + width = **4px** beyond the control box. The run is a
scroll port whose cross-axis extent equals the seat's exactly, so the whole 4px is cut:

- **vertical** run — `overflow: hidden / auto` → clipped `left:4, right:4`
- **horizontal** run — `overflow: auto / hidden` → clipped `top:4, bottom:4`
  (measured `escapeTop: 4, escapeBottom: 4` on `.glass-dock`[9]'s run seat)
- **switcher tab** — a milder instance, `left: 1.98, top: 2.02`

The visual delta is unambiguous — three captures, same route, same viewport, same theme:

| capture | what it shows |
|---|---|
| `pi-MATERIAL-ringclip-CONTROL-unclipped-1440-light.png` | a seat in `.dock-persistent` (outside the port): **one complete, continuous ring** |
| `pi-MATERIAL-ringclip-VERTICALRUN-clipped-1440-light.png` | vertical run seat: ring survives as **two disconnected arcs**, top and bottom only |
| `pi-MATERIAL-ringclip-HORIZONTALRUN-clipped-1440-light.png` | horizontal run seat: **two arcs**, left and right only |

This precedes the queue's contrast question rather than answering it: the ring is not
fully painted, so "must clear contrast over the dock's own frosted plate" cannot be
evaluated at a run-resident seat. `pi-MATERIAL-ring-contrast-iconbutton-1440-light.json`
is kept **as evidence of exactly that**, with its own note (it reads cr≈1.002 because the
sampled band lies on the clipped edges).

Not a regression introduced by W8 — a `box-shadow` ring is clipped by an ancestor scroll
port too. But the move to `outline` did not cure it, and `outline` is likewise clipped.

**Owner:** BK #47 **W8 MATERIAL** (the ring re-point) with **W3 LATTICE** (the port
that clips it) — the cure has to be agreed between them.

### D2 — three concentric rings on the library menu trigger

`pi-MATERIAL-dropdown-doublering-1440-light.json`. A `.dock-dropdown-trigger` that is
**also** a `.menu__trigger` paints, at one `:focus-visible`:

1. `outline: 2px solid accent/0.48 @ 2px offset` — dock register, `index.css:275`
2. `box-shadow` stop 1: `accent/0.30 0 0 0 2px` — `glass/overlay-plate.css:120`
3. `box-shadow` stop 2: `accent/0.15 0 0 8px 0` — same rule, the halo

Resting `box-shadow` on that element is `none`, so all three stops are focus paint, not
elevation. The plain `.dock-dropdown-trigger` and `.dock-select-trigger` are clean
(`outline` only, `box-shadow: none`) — the paired captures
`pi-MATERIAL-dropdown-doublering-menutrigger-1440-light.png` vs
`pi-MATERIAL-dropdown-CONTROL-plain-1440-light.png` show the doubled ring against the
single one. Persists in dark.

`a11y-overrides.css:117` (comment at `:114-116`) already **names** `.menu__trigger` as carrying "an INHERENT
box-shadow ring (glass/overlay-plate.css), not an opted-in utility" — the collision was
known for the forced-colors arm and never reconciled with the dock's outline ring. W8's
own comment claims the one-property collision was "cured at `[data-ring-yield]` and the
switcher tab"; this is a **third** site.

**Owner:** BK #47 **W8 MATERIAL**.

### BLOCKED — the forced-colors sub-arm

`(forced-colors: active)` cannot be emulated from this seat. The `chrome-devtools`
surface exposes `emulate` with only `networkConditions · cpuThrottlingRate · geolocation
· userAgent · colorScheme · viewport · extraHttpHeaders`; there is no forced-colors
option and **no raw CDP passthrough** in the CLI's full command list, so
`Emulation.setEmulatedMedia` is unreachable. Playwright MCP is not registered in this
session and a hand-rolled Playwright script is barred by the seat's own law. Probed and
recorded: `matchMedia('(forced-colors: active)').matches === false` in every capture.
**Not substituted, not inferred.** The `@media (forced-colors: active)` block at
`a11y-overrides.css:107-124` is present on disk and is a static fact a unit test can
assert; what stays owed is the live paint.

---

## π-SEARCH-ROUTE — paint green, a11y walk DEFECT-ROUTED

**Paint half — CAPTURED-GREEN.** `/data/search`, 1440×900 dpr2, both themes
(`pi-SEARCH-ROUTE-field-1440-{light,dark}.{json,png}`). The hand-composed `.input-bar`:

| | light | dark |
|---|---|---|
| plate bg | `color(srgb 0.20397 0.148263 0.0829736 / 0.18)` | `color(srgb 0.0927547 0.0503523 0.00879371 / 0.22)` |
| backdrop | `blur(20px) saturate(1.5)` | `blur(20px) saturate(1.5)` |
| radius | `9999px` | `9999px` |
| field ink | `rgb(28, 25, 23)` | `rgb(233, 230, 226)` |
| glyph ink | `rgb(112, 89, 66)` | `rgb(195, 185, 172)` |
| placeholder | `rgb(112, 89, 66)` | `rgb(195, 185, 172)` |

The plate reads translucent (α .18/.22 over a live backdrop-filter). **The glyph rides the
field type exactly** — glyph ink ≡ placeholder ink in both arms. The bar itself is the
control rung at `radius: 9999px`; note for the owner that `.input-pill` renders **0 times**
on this route and the bar has exactly two children (`svg`, `input.input-bar-field`), so
"the pill is the control rung" is satisfied by the bar's own pill geometry rather than by
an `.input-pill` element.

**a11y walk — DEFECT-ROUTED.** The queue's detector: *"ArrowDown moves `aria-selected`
across the ranked cards and `aria-activedescendant` follows."* Measured over five states
(`pi-SEARCH-ROUTE-arrowdown-walk-1440-dark.json`, query `"dock"`, 12 result rows):

| ArrowDown | `aria-activedescendant` | its `aria-selected` | its `role` | `[aria-selected]` in doc | `[role=option]` in doc |
|---|---|---|---|---|---|
| 0 | `search-result-search-row-005` | `null` | `null` | **0** | **0** |
| 1 | `search-result-search-row-004` | `null` | `null` | **0** | **0** |
| 2 | `search-result-search-row-049` | `null` | `null` | **0** | **0** |
| 3 | `search-result-search-row-093` | `null` | `null` | **0** | **0** |
| 4 | `search-result-search-row-137` | `null` | `null` | **0** | **0** |

**Half the detector holds:** `aria-activedescendant` follows ArrowDown correctly.
**Half is falsified:** `aria-selected` never moves because it **does not exist anywhere in
the document**, at any step.

Supporting wiring (`pi-SEARCH-ROUTE-aria-wiring-1440-dark.json`):
- the activedescendant target **exists** and **is** inside the `[role=listbox]` — but it is
  a plain `<div class="glass-resting card border-l-4">` with `role: null`, `aria-selected: null`
- the `[role=listbox]` is `<div class="grid gap-4 md:grid-cols-2">`, `id: ""` (empty), with
  **0** `[role=option]` descendants — a listbox whose required owned element is absent
- the input carries **no** `role="combobox"`, **no** `aria-controls`, **no** `aria-expanded`,
  **no** `aria-autocomplete`

An `aria-activedescendant` pointing at a non-option inside a listbox with no options does
not resolve to anything an AT can announce as the selected item.

**Owner:** BK #42 **W-SEARCH** (unit 6 — the route that rebuilt the field and owes the walk).

---

## CAPTURED-GREEN cells

### π-DEFAULT-POSTURE — light AND dark
`pi-DEFAULT-POSTURE-*`. An unprop'd `<GlassDock>` mounts **collapsed** at every bare
in-fence site, identically in both arms:

| site | route | measured |
|---|---|---|
| `dock-capture` | `/dock/overview` | `collapsed`, box 56×56 |
| `dock-tap-capture` | `/dock/overview` | `collapsed`, box 56×56 |
| DockBackgroundToggle tile (`<GlassDock class="relative z-10">`, `overview.vue:625`) | `/dock/overview` | `collapsed`, box 56×56, painting the `#collapsed` Pause glyph |
| `dock-nested-collapsible` | `/dock/layers` | `collapsed`, box 56×56 |
| the re-pointed landing tile (`overview.tile.vue:19`, `:collapse="false"`) | `/dock` | `expanded pinned always-expanded`, box 208×56 — the re-point is present and effective |

### π-SEAT — the dark arm photometered for the first time
`pi-SEAT-{rest,hover,press}-overview-1440-{light,dark}.json` + hover-well and open-seat PNGs.
Real hover (mouse moved by the driver, `:hover` verified true at read time); press driven
through `useLiquidPress`'s `pointerdown` and sampled per rAF.

| channel | light | dark |
|---|---|---|
| rest bg / ink | transparent / `srgb 0 0 0 / 0.8` | transparent / `srgb 1 1 1 / 0.8` |
| hover bg | `srgb 0.20397 0.148263 0.0829736 / **0.14**` | `srgb 0.0927547 0.0503523 0.00879371 / **0.18**` |
| hover ink | `rgb(28, 25, 23)` | `rgb(233, 230, 226)` |
| hover scale | `1.1` | `1.1` |
| hover specular `::before` opacity | **0.14** | **0.11** |
| open (`aria-current`) bg | `… / **0.18**` | `… / **0.22**` |
| open ink | `rgb(28, 25, 23)` | `rgb(233, 230, 226)` |
| open specular `::before` opacity | **0.16** | **0.12** |

The ladder is consistent across arms — open α = hover α + 0.04 in both — and the **dark
specular ceilings sit BELOW the light ones** (0.11/0.12 vs 0.14/0.16), which is the correct
anti-blowout direction on a dark plate. Specular gradient:
`radial-gradient(22% 22%, oklch(0.947126 0.0136975 84.4089 / 0.5) 0%, transparent 70%)`.

Press spring, both arms identically: `--dock-press-t` ramps 0 → **0.974** over ~117ms and
releases to ~0.03 over ~110ms; peak scale is an anisotropic squish **`0.9891 0.9338`**.
Limitation recorded: a scripted `PointerEvent` drives the JS `--dock-press-t` leg (which is
what the CSS reads) but does not set the UA `:active` state, so `.dock-icon-button:active::before`
(`material.css:343`) is not exercised by this capture.

### π-MORPH
`pi-MORPH-trace-dockcapture-1440-light.json` (505 rAF frames), `pi-MORPH-collapse-*.json` (721 frames).

- **No `+125px` single-frame jump.** Max single-frame width delta on expand = **32.08px**;
  on collapse ≈ 30px. The morph is transform-driven (`scale` runs `0.111776 1` → `1 1`
  while layout width holds), monotonic, deltas rising then decaying — a spring profile.
- **No ~350ms hold past settle.** Expand settles 620.5 → 870.3ms (≈250ms) and holds flat;
  collapse animates 4986.8 → 5236.6ms (≈250ms).
- The **3611ms** gap between pointer-out (t=1370.3) and collapse start (t=4981.3) is **not**
  a hold past settle — it is `DOCK_COLLAPSE_DELAY_MS = 3600` (`src/components/dock/constants.ts:61`),
  the documented "patient-dwell collapse delay" (`useDockState.ts:98`), honored to 11ms of
  rAF quantization.

**One observation recorded against a stated criterion.** The criterion is *"collapsed
non-survivors occupy no layout"*. Measured while collapsed
(`pi-MORPH-nonsurvivors-collapsed-1440-light.json`): the dock's **outer** box is correctly
56 — nothing leaks to the page. But inside the port the non-survivors **are** laid out:
`dock-capture` run `scrollWidth: 477` behind a 56px port with 2 kids at 40×40; `dock-tap-capture`
run `scrollWidth: 232` with 5 kids at 40×40. All are `display: flex`, `visibility: hidden` —
which removes them from paint, the a11y tree and tab order, but **not** from layout. The
transform-driven morph needs a full-width layout target to scale from, so this may be the
architecture rather than a defect. **Recorded as observed; the disposition is the owner's.**

### π-HOVER-HANDOFF
`pi-HOVER-HANDOFF-dockcapture-1440-light.json` — an **extract**, not a second capture: the
same rAF trace answers this cell and π-MORPH, and the extract exists so the record is
discoverable under its own cell name. Its `_note` says so.
The collapsed hover pre-scale is **DELETED**, decisively:
- the set of distinct dock widths across the entire collapsed phase is exactly **{56}**
- **zero** frames land in 57–70px — the window where the old `56 → 61.6` excursion lived
- `scale` is `none` for the whole collapsed phase; no snap-back frame exists
- the hover **does** register while collapsed, and **`box-shadow` alone** carries it:
  `color(srgb 0.11 0.098 0.09 / 0.12)` → `/ 0.14` at the hover frame (t=545.9)
- the handoff reads as ONE motion: shadow lifts at 545.9, class flips at 613.8 (the ~60ms
  `HOVER_INTENT_MS` sweep-past dwell), then a single monotonic ramp to settle

### π-TAP
`pi-TAP-tapcapture-393-coarse-dark.json`, 393×852 dpr3, `pointer: coarse`, `ontouchstart`
present, `maxTouchPoints: 1`, dark. Trusted `pointerdown` t=1762.7 → `pointerup` 1766.7 →
`click` **1767.0**, all `isTrusted: true`; `dock-tap-capture` flips collapsed → expanded at
**t=1776.2** (9.2ms later) and animates 60 → 247. The contract holds on a **real clock** —
which is precisely what the cell says a `vi.useFakeTimers()` unit test cannot witness:
listener attach sits ~1.7s before the click, so Vue's `e._vts <= invoker.attached` guard
cannot misread it as a pre-attach replay.
**Sub-arm BLOCKED:** no `touchstart`/`touchend` fired — the CLI's `click` dispatches a
pointer/mouse sequence even under touch emulation, and no tap primitive is exposed. The
genuine touch→compat-click timing therefore stays owed; the click-path contract is green.

### π-REACH
Wheel arm **adopted**; **drag arm captured fresh** (`pi-REACH-drag-crossaxis-dock9-393-coarse-dark.json`)
— the queue requires "no cross-axis travel by wheel **AND** drag" and the predecessor
banked only wheel. A vertical drag originating on the horizontal run of `.glass-dock`[9]
at 393 coarse dark:

- **cross-axis travel (`scrollTop`): 0**
- **window travel: `{x: 0, y: 0}`** — no scroll chaining; `overscroll-behavior: contain` holds
- main-axis `scrollLeft` 0 → **171**, the run's max — the gesture is absorbed by the inline
  scroller and lands on a detent
- block-axis scroll range is structurally **0** (`scrollHeight 44 === clientHeight 44`),
  `touch-action: pan-x`

Horizontal reach adopted green. Vertical arm routed with the gap defect above.

### π-RUN
Adopted from `pi-RUN-interior-rest-393-coarse-dark.json` (393×852 dpr3, coarse, dark),
horizontal dock, P = 52:
- interior rest `settled: 78`, **`modP: 26` ≡ P/2** ✓
- **leading peek `18` = P/2 − gap = 26 − 8** ✓
- rendered seat 44 === `--dock-touch-target` `2.75rem` = 44 ✓ (cross-read from
  `pi-PROPORTION-393-coarse-dark.json`: `seatPx 44`, `touchTargetPx 44`)
- capacity at 393: **5 of 9** seats fully visible in a 289px port ✓

### π-CUT
Adopted whole — the predecessor's capture is complete and its conditions are legible.
`pi-CUT-card-dock9-393-coarse-dark.json` + the three offset PNGs + `pi-CUT-40px-pixel-scan.json`
+ `pi-CUT-corner-montage-lead-trail-x3.png`.

- **The ≥500ms settle law is visible in the data**: each row records `requested` separately
  from `settled` (86 → 78, 171 → 171), which is the discipline the queue mandates.
- cap radii flip correctly across the three offsets:
  `ss/se` = `24/10` at 0 → `10/10` at 78 → `10/24` at 171
- **rAF frame-time histogram, cap-live vs cap-inert**, 178 frames each:

| | mean | p50 | p90 | p95 | p99 | max | >16.7ms | >33ms |
|---|---|---|---|---|---|---|---|---|
| cap-live | 16.666 | 16.7 | 18.1 | 18.5 | 19.3 | 20.0 | 59 | **0** |
| cap-inert | 16.668 | 16.7 | 18.2 | 18.6 | 20.1 | 20.8 | 71 | **0** |

The animated corner costs **nothing measurable** — Δmean 0.002ms, cap-live has *fewer*
over-budget frames than cap-inert, and neither drops a frame. **The contingency is not
triggered**; per the queue it would be ROUTED rather than executed in any case.

---

## SUMMARY FOR THE DRIVER

**Three defects to route, one root cause shared by three cells:**

1. **W9 · vertical run gap** — `.glass-dock.vertical .dock-layer` (0,3,0) beats
   `.glass-dock .dock-run` (0,2,0); vertical runs paint 6px against a P computed on 8px.
   2px/seat, 24px cumulative. Explains π-PROPORTION, π-RUN's vertical arm, π-REACH's vertical arm.
2. **W8 · focus ring clipped by the run port** — 63/67 controls, both orientations, both
   themes; the ring paints as two disconnected arcs. Needs W8 + W3 jointly.
3. **W8 · triple ring** on `.dock-dropdown-trigger.menu__trigger` — dock outline plus
   `overlay-plate.css`'s two-stop shadow ring; a third site of the "one-property collision".
4. **#42 W-SEARCH · the combobox is not a combobox** — `aria-activedescendant` follows
   ArrowDown, but `aria-selected` and `role=option` are absent from the document entirely.

**Two sub-arms BLOCKED, both on tool surface, neither substituted:**
forced-colors live paint (no emulation seam, no CDP passthrough, Playwright MCP absent);
genuine touch→compat-click (no tap primitive).

**No Safari cell was attempted.** Unit 5's PI-QUEUE already carries every Safari cell as
**BLOCKED → BAND-BUILD** behind the ~249 build-emitted `@supports color-mix` guards. This
seat neither cured nor self-certified around that, and ran Chromium only, per the queue
header. The two narrow-Safari cells (`/dock/layers`, `/dock/overflow` @430×848) stay owed.

**Exit codes.** Every capture command returned 0. No non-zero exit was suppressed. The
`chrome-devtools` CLI prints an `Update available: 1.2.0 -> 1.8.0` banner and a
`localStorage is not available` `ExperimentalWarning` on stderr on every invocation; both
are noise from the inherited daemon, neither is an error, and the daemon was deliberately
**not** upgraded mid-band.
