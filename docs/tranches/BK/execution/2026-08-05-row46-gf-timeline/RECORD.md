# BK #46 · GF-TIMELINE — the 5→1 collapse

**modelId: `claude-opus-5[1m]`** (asserted by prefix `claude-opus-5`) — scout + implement seat.
**Date:** 2026-08-07. **Base HEAD at open:** `253b0f17` (the prompt's `4917a042` was stale by 12
commits; re-derived from disk, per ⊕⁴⁸'s standing instruction that the cursor alone cannot show a
lane that has not committed).

**Spec of record:** `TERMINAL-ROSTER.md:196` (TR#46) → `GREENFIELD-TERMINAL.md:20-226`. TR wins on
divergence; every divergence is named in **§6** below. [CURE 2026-08-07 · C5: this read "§5",
which is the paint section — the divergences have always been §6.]

**Cured 2026-08-07** against `CURE-ORDER-46.md` (Φ5 quartet adjudication, driver-ratified).
See **§9 · CURE** for the mechanisms and the born-RED evidence. Figures in §3, §5 and §8 are
restated to the CURED bytes where the cure moved them; every restatement is marked.

---

## 1 · SELECTION + GROUNDS

Next canonical UNSTARTED Φ5 row in TR order after ⊕⁴⁹ (#41 W-SORTABLE landed `757872be`). The
rows TR-ordered ahead of it were walked and each is skipped with its gate NAMED:

| row | disposition | ground |
|---|---|---|
| #21 W-DAG-REDUCE | SKIP — gated | dep `#17` hard (`EXECUTION-DAG:21`); #17 is itself Φ4-UNSTARTED |
| #22 W-FROST | SKIP — IN-FLIGHT | `CODE-COMMITTED → CURE-CUT` at ⊕³⁰; never selectable |
| #25 W-FIELD-WELL | SKIP — gated | its own rides-clause: #82's `field-control.css` cut (C-13k), #27's ladder, #22's rung. TR#25: *"a wave cannot be verified before what it rides"* |
| #32 · #33 · #34 · #35 | SKIP — IN-FLIGHT IN THIS TREE | ruled selectable at ⊕⁴⁷ but their bytes SIT UNCOMMITTED here: `src/components/tabs/*` + `morph/eyeglass.ts` + `tests/gates/tabs-seam.test.ts` (#32/#71), `src/components/alert/*` + `feedback-tone.css` + `tests/gates/feedback-tint-seam.test.ts` (#33/#34), `src/components/slider/*` + `slider/styles.css` (#35) |
| #40 W-PAGER | SKIP — IN-FLIGHT IN THIS TREE | `deck/` + `carousel/` + `pager-dots/` uncommitted, incl. 6 file deletions and 12 additions |
| #42 W-SEARCH | SKIP — gated | `#47` GF-DOCK aperture seam (`EXECUTION-DAG:42`); #47 UNSTARTED |
| #43 W-CHIP | SKIP — not Φ5 | Φ6 |
| #44 W-TAGS-FIELD | SKIP — gated | TR#44: the LAND sequences behind #43's cut (one owner per file per cut) |
| #45 W-CONSTELLATION | SKIP — gated | after `#52` (`EXECUTION-DAG:45`); #52 UNSTARTED |
| **#46 GF-TIMELINE** | **SELECTED** | `EXECUTION-DAG:46` blockers **none** — *"(ungated; #37 retired)"*; cursor `:1512` restates it: *"#46 ungated"*. TR#46 mints **0 gates**. No ASK gate, no owner gate |

---

## 2 · THE WORK ORDER — TR#46 CELL, VERBATIM

> | 46 | GF-TIMELINE | GREENFIELD-TERMINAL:20-226 | Φ5 | 0 gates; 10 unit cases; speedtest X5.
> **Σwidth RULED** (RATIFICATION §1.5); T-PART-2 the pin, `valueText` scope note. The GESTALT
> one-line re-mint struck—the banked terminal IS the lane; three `will-change: width` sites →
> `useAnisotropicExtent` clip-path. ⊕⁴ the scrubber+segmented variant trim lands HERE
> (DECK-RELOCATION PART II §3/§7): **~705 LOC, zero binary consumers anywhere** (the sole consumer
> binds `variant="continuous"`, speedtest `PhaseTimeline.vue:36-37`) — cut at this lane's
> greenfield **with the G-RELAY whole-repo walk at the cut**; timeline itself is general vocabulary
> and STAYS |

Riders carried in from the cursor:

- ⊕³¹ (BK#68 L-4): *"the two integers are #46's `geometry.ts` constants, never tokens"* — DONE
  (`HUE_OFFSET` / `HUE_STRIDE` / `HUE_STOPS`).
- ⊕⁴⁹ (#41's seal): the `.sr-only` route — *"whichever lands first mints and this wave consumes"*.
  **N/A by subtraction**: this design uses **zero** `.sr-only`, and the family's two local
  definitions died with their files. The library-wide gap stays #31/W-A11Y's.

---

## 3 · PER-ITEM LEDGER

### DELETED (6 SFCs, 1,948 lines) — G-RELAY walk at the cut

| file | ln | relay walk |
|---|---|---|
| `GlassTimeline.vue` | 234 | dispatcher; 4 importers, all rewritten (2 demo, 1 demo-substrate, 3 tests) |
| `ScrubberTimeline.vue` | 413 | sole `role=slider` timeline; its job is `<Slider>`'s |
| `SegmentedTimeline.vue` | 298 | zero binary consumers repo-wide |
| `ContinuousTimeline.vue` | 349 | owned the `<Popover>` portal-CSS contract — the family's ONE cross-component DAG edge, gone with it |
| `ContinuousRail.vue` | 214 | private child |
| `ContinuousMarkers.vue` | 440 | private child; carried one of the family's two local `.sr-only` definitions |

Walk result: **0 dangling importers** repo-wide (`GlassTimeline|ScrubberTimeline|SegmentedTimeline|
ContinuousTimeline|ContinuousRail|ContinuousMarkers` → the only surviving occurrences are inside
dated strike brackets and corrected comments, listed under "comments corrected ON the text").

### BUILT

| file | ln (total / code) | what |
|---|---|---|
| `Timeline.vue` | 739 / 477 | the one SFC; ONE `<style scoped>`, **zero** non-scoped blocks |
| `geometry.ts` | 156 / 84 | `layout()` · `fillFor()` · `aggregate()` · `accentFor()` + the monotone clamp |
| `types.ts` | 60 / 15 | `Timeline{Props,Segment,SegmentState}` |
| `index.ts` | 6 / 6 | `Timeline` + 3 types |
| `README.md` | 35 | rewritten (the shipped one documented an `:items` prop that never existed) |

**LOC:** 2,282 → **996 total / 582 code**. Code lands INSIDE the spec's 540-640 band; total is
~176 over its 730-820 band, all of it comment mass at the house density. Stated, not rounded away.

[CURE 2026-08-07 · nits + cure delta: `Timeline.vue` read `690 / 463` (the file is **689** lines
pre-cure, not 690 — the 932 total was computed off the true 689, so the row was the wrong figure,
not the sum); `types.ts` read `49 / 14`; `README.md` read `32`. The rest of the delta is the cure
itself: +50 in `Timeline.vue` (the coarse arm, the `data-crossing` bind, the release doc-block, the
`aria-label` binding, the guarded `onMarkLeave`), +11 in `types.ts` (`label`), +3 in the README.
Pre-cure the figures were **932 total / 567 code**.]

### THE EIGHT RULINGS, EXECUTED

- **A — the one idle loop lives in the track.** `.tl__span[data-state="active"] > .tl__fill::after`
  (determinate) and `.tl__span[data-indeterminate]::after` (indeterminate): one keyframe, two
  presentations. Host is the track — `role=progressbar`, `aria-hidden` spans, `pointer-events:
  none` — a non-interactive reporting substrate on MOTION-CANON REST's own legal-host list. The
  marks carry **zero** loops (G5). **Measured in paint: exactly ONE running `tl-*` animation while
  a span is active, and it is on the flow.**
- **B — the A10 authored groove.** `background: oklch(from var(--card) calc(l - 0.04) c h)` over
  the composed `.glass-track-well`, plus one top-only inset ink edge at the `--ink-edge` rung.
  **Measured: groove-vs-card ΔRGB 22.52 light / 17.32 dark** against the bare-wash baseline of
  4.58 — 0/2 hosts below the ≥12 bar.
- **C — INDETERMINATE.** `active` + no `progress` → `fillFor()` returns `null`, no fill node
  renders, no cap renders, the flow traverses the full span. **The falsifier was RUN, both ways:**
  with the flow on, the span differs; with it off, `activeBg === pendingBg === rgba(0,0,0,0)` and
  every other static channel is identical — the two are pixel-identical. The loop is load-bearing.
- **D — CLAMP, never sort.** `at: [0.5, 0.3]` → `[0.5, 0.5]` + a DEV warn, author order held, the
  offender rendered zero-width.
- **E — three doors.** `defineExpose({ value })` + the `#detail` scope + `--timeline-value`, all
  measured equal in one mounted case.
- **F — the coarse density CONTRACT, no mechanism.** Stated in the README and DESIGN.md; zero
  runtime machinery. [CURE 2026-08-07 · C2: still true — "mechanism" here means JS, and there is
  none. The cure adds ONE scoped `@media (pointer: coarse)` arm, which is the coarse TARGET floor
  (WCAG 2.5.5), a different obligation from the density contract F speaks to.]
- **G — zero gates.** The obligations ship as **10 unit cases**, each with its stated mutation. The
  register receipt is byte-identical (§4).
- **H — 20 fine / 12 mobile marks**, decoupled from the track knob.

### THE PARTITION — one correction found by its own test

The interior-omitted-run divisor was wrong on first cut: `[0.2, ·, ·, 0.8]` gave `[0.2, 0.5, 0.8,
0.8]`, crushing the anchored successor to zero width. The interval `[prev, ceiling]` is shared by
the omitted run **and** by the pinned span that closes it, so the divisor counts it —
`count + (anchored ? 1 : 0)`. It now lands on four equal 0.2 spans, which is what *"equal shares of
the axis remaining after pinned neighbours"* actually says. Caught by T-PART-3 before any paint.

### MOTION — one spring, three expressions, one cap

- Everything that travels rides `springPreset("dock")`, **read by name**. Disk today is
  `{response 0.30, ζ 0.88}` — the spec verified `{0.35, 0.82}` at its seat, and #26 W-SPRING-RETUNE
  retuned it on 2026-08-05. Binding by name is exactly why that costs this row nothing.
- ONE `useSpring` on the aggregate; its `onValue` drives the flex per frame and detects mark
  crossings; per-span `--tl-f` is distributed from the springing front in axis order and capped by
  each span's own effective progress, so the travel is smooth and the rest state is exact.
- ONE cap for the meniscus stretch, the mark swell and the hover scale: `--scale-hover`, read from
  the live cascade per frame (**measured live: 1.08**). Both arms' minted `1.12` stays struck.
- [CURE 2026-08-07 · C1] ~~`squish(0)` on settle, watched off `isSettled` — the PRM path's only
  exit.~~ **FALSIFIED AS WRITTEN AND CURED.** The watch was on the flag's EDGE, and the PRM path
  never moves that flag — so there was no exit at all. It is now watched on the settled STATE:
  `watch([travel.value, travel.isSettled], …)`, the travelling value being the source that always
  moves on the snap path. See §9 · C1.
- Fill travels on `translateX` inside TWO clip boxes. **`will-change: width` → 0 repo-wide in this
  directory**; `will-change: transform` gated to `[data-advancing]`.

### TOKENS — 14 declared + 2 phantom → ONE

`scale-paper.css` §16 is now a single row: `--timeline-track-h: var(--space-body)`. Deleted:
`-continuous-height` (renamed, clean break), `-dot-size`, `-dot-size-touch`, `-touch-target`,
`-segment-flex`, `-dot-{fill,blur,ring,tint-current,tint-completed,check-color}`,
`-continuous-seam-{opacity,color}`, `-segment-default-gradient`, plus the phantoms
`-segment-default-gradient-color` and `-detail-min-height`, plus `--cel-accent`,
`--continuous-fill-opacity`, `--timeline-press-t`, `--flex-vel` and the whole √φ ladder.

### BREAKAGE, BOOKED BY LINE

- `./timeline` subpath SURVIVES; `GlassTimeline` → `Timeline`; `TimelineSegmentGradient` deleted.
- `tests/public-surface.spec.ts:286` → `"Timeline"`.
- Demo `/data/timeline`: the two variant bodies (295 + 237) deleted, the scrubber headline, the
  6-tick overlay, the callout and the roving event list shed; the transport is now
  `<Slider :marks>`. 723 → 260 lines (−463).
- `demo/stories/substrates/fourier-field.vue`: the scrubber → `<Slider :model-value="[scrubT]"
  :min :max :step aria-label @update:model-value="v => onScrub(v?.[0] ?? 0)">`. **The array binding
  and the unwrap are the silent-no-op stale-binding class** — written out, with the reason beside
  them.
- Tests: 4 files retired (516 ln) → 2 files (426 ln) + one re-homed case on `Slider`.
- Comments corrected ON the text (the #18 discipline): `motion/core/index.ts:58` ·
  `springPresets.ts:128` · `dock/index.ts:46` · `dark-arm.css:314` · `rim.css:41` ·
  `track-well.css` (Timeline booked as consumer **#3** by name) · `spring-authority.test.ts:240`.
- `DESIGN.md`: the component's own `## Timeline Primitive` section rewritten and the two worked
  examples that named it struck-in-place with dated brackets. The library-wide sweep is #61's.

---

## 4 · VERIFY GATE — verbatim

```
$ npx vue-tsc --noEmit
vue-tsc exit: 0

$ npx vitest run tests/styles tests/components tests/gates
 ❯ tests/styles/stacked-url-filter.test.ts (2 tests | 1 failed) 27ms
 ❯ tests/gates/gate-register.test.ts (20 tests | 3 failed) 202ms
 ❯ tests/components/pager-dots/morph.test.ts (4 tests | 1 failed) 52ms
 ❯ tests/components/pager-dots/contract.test.ts (9 tests | 4 failed) 104ms
 ❯ tests/components/carousel/contract.test.ts (4 tests | 1 failed) 59ms
 ❯ tests/gates/overfit-structure.test.ts (10 tests | 1 failed) 63ms
 Test Files  6 failed | 149 passed (155)
      Tests  11 failed | 1380 passed | 2 expected fail (1393)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
  DRIFT (routed to #65) reka.tags-input.value-binding — tests/components/ui/reka-binding-idiom.test.ts
  VIOLATION active pager.tabs.panel-linkage: sourcePath missing — tests/components/pager-dots.contract.test.ts
```

**RECEIPT BYTE-IDENTICAL PRE + POST.** The pre-cut receipt taken before the first byte moved is the
same string, `violations:1` included. This row minted, bound, armed and moved **nothing** in the
register — `seats:60 … bound:8 … unbound:50 … rosterSha256:dc05df91`. The stated house target of
`violations:0` is **not reachable at this HEAD and is not this row's to reach**: the one violation
is the #40 W-PAGER lane's uncommitted deletion of `tests/components/pager-dots.contract.test.ts`,
which the register's `sourcePath` still points at. Recorded, not papered over.

**ALL 11 FAILURES ARE THE FOREIGN UNCOMMITTED LANES', PROVEN BY PROVENANCE, NOT ASSERTED:**

| failure | proof it is not this row's |
|---|---|
| `gate-register` ×3 | every message names `tests/components/pager-dots.contract.test.ts`; `git ls-tree HEAD` finds it AT HEAD, `ls` does not find it on disk — a foreign deletion |
| `overfit-structure` ×1 | offenders are `useLeadTrail.ts :: LEAD_TRAIL_TAU_E_S` + `:: trailOffset`; `git ls-tree HEAD` does not find the file — a foreign addition |
| `stacked-url-filter` ×1 | the case's own title: *"BORN-RED on PagerDots.vue:493, **#40 W-PAGER owns the flip**"* — it is an `it.fails` that now passes because the foreign lane cured it |
| `pager-dots` ×5, `carousel` ×1 | subjects are `pager-dots/` and `carousel/`, both uncommitted foreign directories |

**One failure WAS mechanically mine and is CURED, not excused:** `boot-graph`'s build-freshness arm
(*"the dist-demo it measures is NEWER than every source it is built from"*) reds on any source
edit. `npm run demo:dist:build` — **not** `npm run build`, which is blocked repo-wide by RT-39D,
the #40/#71 lane's uncommitted `package.json`/`package-lock.json` mismatch — rebuilt it, and the
arm is green in the run above.

---

## 5 · PAINT — the banked Chromium DELTA

Captures in this directory, all `/data/timeline` at 1280-wide, dev server on 5411:

| file | what it shows |
|---|---|
| `pi46-dark-1280.png` | full page, dark: three ordinal hues, the recessed groove, checks on completed marks, a hollow ring on active, the trailing open axis |
| `pi46-light-1280.png` | light: the same plate, pending-mark perimeters reading |
| `pi46-indeterminate-light.png` | the indeterminate state mid-sweep — **no fill, no cap, the specular band traversing the full span** |

Canvas-resolved photometry (the binding methodology — `getComputedStyle` returns `oklch`, and
regex-parsing it as RGB produced a live false 13/13 failure at spec time; every colour here
resolved through a 2D canvas paint):

| claim | measured | baseline |
|---|---|---|
| the recess reads | groove-vs-card ΔRGB **22.52 L / 17.32 D**; `box-shadow` inset resolves non-zero | bare wash 4.58; `border: 0px none` |
| the bar reads | **LIGHT** filled-vs-empty ΔRGB min **208.36**, adjacent-span min **133.16**; **DARK** **223.24** / **112.33** | 19.10 L / 5.83 D; adjacent undefined |
| the clip holds | all 5 spans compute `overflow: hidden` | escape measured in both engines |
| zero backdrop-filter | `.tl__track` computes `none`; the property appears nowhere in the directory's live bytes | the `.timeline-rail` veil was LIVE in Safari |
| the loop is lawful | exactly ONE running `tl-*` animation, on `.tl__fill::after`; marks never animate at rest | 0 live animations at HEAD |
| indeterminate reads | flow ON → the span differs; flow OFF → `activeBg === pendingBg === rgba(0,0,0,0)`, pixel-identical | the state did not exist |
| coarse target | mark box **24×24**, painted disc **20×20**, `elementFromPoint` at each of 5 centres returns that mark | painted 14, hit 40 (TL-13) |
| one tab stop | `tabindex` = `[-1,-1,0,-1,-1]`, seeded on `current` | 7 focusables |
| the cap is the token | `--scale-hover` reads **1.08** live off the root | both arms minted 1.12 |
| console | **zero errors, zero warnings** on the route | — |

[CURE 2026-08-07 · C5 nit: the two ΔRGB figures on "the bar reads" were unlabelled and are the
LIGHT-mode pair; the dark pair (223.24 / 112.33) is the adjudication's own re-measurement and is
carried here on its authority, not re-taken this seat. The row above it was already mode-labelled.]

**ONE DEFECT FOUND IN PAINT AND CURED IN THE SAME CUT.** The mark perimeter first composed
`--cartoon-ink` at the `--ink-perimeter` rung. That ink is CLAMPED dark in both modes — correct
under a recess (a groove is shadowed at the top either way) and **wrong on a mark**: on a dark
card a near-black perimeter left the pending marks with no boundary at all, visible in
`pi46-dark-1280.png`'s first capture. The perimeter and the current-mark indicator now compose
`--foreground` at the same named rungs, exactly as `color-radius.css` §1.2 writes the composition.
Verified in both modes after the cure.

**NOT DONE, and it is another row's:** §10's full π battery — the real-`safari-app` cells, the
390×844 coarse cells, the void-gated 437-node capture, the `plus-lighter`/`contrast-color()`
Safari rows, the `/substrates/fourier-field` before/after AX-tree row. That is **#10 π-SUITE**'s
protocol and needs the serialized browser seat. What is banked here is an honest Chromium DELTA,
labelled as one. (The browser-seat singleton bit once mid-run: a capture landed on another agent's
`containers/sheet` tab and was re-taken after an explicit `select_page`. Recorded because it is the
standing hazard, not a one-off.)

---

## 6 · DIVERGENCES FROM THE SPEC — each with its ground

1. **`--timeline-track-h: var(--space-body)`, not the literal `0.75rem`.** Same 12px at fine —
   `--space-body` IS 0.75rem — and the mobile 8px rung arrives for free from `sizing.css` §1.1,
   the ONE width-conditional spacing declaration `src/styles` is permitted. §4's law column asks
   for exactly this (*"space rung; mobile one-rung law"*); declaring the literal would have needed
   a second media query in a token file that LAYOUT §5 forbids one in. Mark diameter rides
   `--space-family` (20 → 12) for the identical reason.
2. **`--motion-beat` NOT minted.** §6's LEAD/LAG rank arithmetic wants a 16.67 ms quantum that is
   not on disk, and `useRouteTransition.ts:23` refuses to mint it *"for one consumer"* by name.
   The `#detail` entry carries the same intent without the mint: a signed one-rung `--space-atom`
   nudge on `--spring-dock-duration`, direction-aware off the travel.
3. **ONE `useLiquidPress` instance, index-switched.** One pointer presses one mark, so N instances
   would be N springs idling for one gesture. The style binds only on the mark holding the press.
4. **Track + marks share one grid cell** rather than sitting in an `.tl__axis` wrapper. The DOM the
   spec requires — siblings, marks outside the well's clip, axe closure by construction — with
   zero extra elements.
5. **T-CLIP-1 / T-FLEX-1 / T-FLEX-2 are source asserts** where a mounted assert would prove
   nothing: happy-dom applies no stylesheet, and the flex instance is SFC-internal. The house
   precedent is `focus-visible.test.ts` (*"a mounted assert here would prove nothing that the bytes
   do not already say"*). Each still names its biting mutation, and T-FLEX-1 additionally pins
   `NO_TOKEN_CAP` in LOCKSTEP with `--scale-hover`'s declared value read out of
   `scale-paper.css` — the `DEFAULT_INDICATOR_MAX_STRETCH` idiom, so the constant and the token
   cannot fork.
6. **`TimelineProps` is exported.** The spec's snippet left it a bare `interface`; a consumer
   typing a wrapper needs it.
7. **The travel is `translateX` inside two `overflow: hidden` boxes, NOT
   `useAnisotropicExtent`'s `clip-path`.** [ADDED 2026-08-07 · C5 — this divergence went unnamed
   in the first cut and is the one TR clause the lane did not execute as written.] TR#46 says the
   three `will-change: width` sites go *"→ `useAnisotropicExtent` clip-path"*. The `will-change:
   width` half is DONE and measured — **0 repo-wide in this directory**. The composable half is
   **unexecutable as the clause is written**: `NOVELTIES.md:46` mints `useAnisotropicExtent`
   **ONCE at #67 W-2** and rules *"#46 and row 11 consume, never re-mint"*, and #67 W-2 has not
   run — the composable is **0 on disk** (re-verified this seat: `grep -rn useAnisotropicExtent
   src/` returns nothing but doc prose). A lane forbidden to mint it and offered nothing to
   consume can only reach the SAME geometry by its own means, which is what the two clip boxes
   are: the extent is clipped, never sized, so the compositor property is `transform` either way.
   `NOVELTIES.md:46`'s own further clause — *"P5 precedes W-2's design (clip-path:inset() over a
   glass body — §8's unprofiled cliff)"* — also puts an unrun probe in front of the clip-path
   construction, so adopting it here would have jumped a gate as well as a mint.
   **ROUTED:** whether `<Timeline>` should adopt the composable once it exists is **#67 W-2's
   consumer walk**, named there by row number — not a follow-on this lane owes. If W-2 lands and
   the walk adopts, the two `overflow: hidden` declarations are the whole diff.

---

## 7 · ROUTED (nothing dropped silently)

| what | where | ground |
|---|---|---|
| the full π battery incl. real-Safari cells | **#10 π-SUITE** | §10's protocol + the serialized browser seat |
| speedtest's six consumer edits (§8) | **speedtest's own tranche, marked addendum** | consumer-updates ruling |
| the liquid grabbed-thumb transport; `thumbAlignment: "contain"` is hardcoded at `Slider.vue:50`, not a prop | **#37 — RETIRED-UNBUILT** | fourier-field rides a plain Slider meanwhile: a real, stated, temporary motion regression on ONE route. It is **not** a masking fallback — the Slider works in paint and commands the head correctly |
| `Progress.vue:138`'s `var(--primary)` fill (the same TL-1 disease); the ordinal law as a reusable `--liquid-fill-tint` default | **W-SLIDER-PROGRESS** | standing |
| library-wide `.sr-only` (9 sites) | **#31 / W-A11Y** | this lane consumes none; the family's 2 local definitions died here |
| `requiredCaseIdentity` SHA re-pin | **C-9 batch at band close** | untouched — the receipt is byte-identical |
| DESIGN.md's library-wide doc sweep; `foundations/intro.vue:25`'s *"timelines"* blurb | **#61 W-DOC-TRUTH** | only this component's own sections were corrected here |
| the aggregate denominator (owned-axis Σwidth, so a 94%-scoped process reads 100% at completion) | **one OWNER ruling owed** | pinned by T-PART-2 as the spec directs; owner-reversible in one word |
| whether `<Timeline>` adopts `useAnisotropicExtent` for the fill extent (§6.7) | **#67 W-2's consumer walk** | `NOVELTIES.md:46` mints it ONCE at W-2 and names #46 a CONSUMER — *"never re-mint"*; it is 0 on disk and W-2 has not run [ADDED 2026-08-07 · C5] |

---

## 8 · DIFF STAT (this row's paths only — the tree also carries four foreign lanes)

[RESTATED 2026-08-07 · CURE. Pre-cure this block read `31 files changed, 573 insertions(+), 3617
deletions(-)`, `DESIGN.md | 209`, `README.md | 32`, `types.ts | 79`, and the untracked
`Timeline.vue 690` / `timeline.contract.test.ts 259`. The cure adds three files to the row's
paths — `CHANGELOG.md`, `MIGRATION.md` and `tokens/color-radius.css` — and moves the five above.]

```
 CHANGELOG.md                                       |  13 +
 DESIGN.md                                          | 211 +++++-----
 MIGRATION.md                                       |  67 +++-
 demo/stories/data/search.vue                       |   6 +-
 demo/stories/data/timeline.vue                     | 353 ++++++++++-------
 .../data/timeline/TimelineContinuousBody.vue       | 295 --------------
 .../data/timeline/TimelineSegmentedBody.vue        | 237 -----------
 demo/stories/manifest.ts                           |   2 +-
 demo/stories/substrates/fourier-field.vue          |  20 +-
 src/components/dock/index.ts                       |   5 +-
 src/components/timeline/ContinuousMarkers.vue      | 440 ---------------------
 src/components/timeline/ContinuousRail.vue         | 214 ----------
 src/components/timeline/ContinuousTimeline.vue     | 349 ----------------
 src/components/timeline/GlassTimeline.vue          | 234 -----------
 src/components/timeline/README.md                  |  35 +-
 src/components/timeline/ScrubberTimeline.vue       | 413 -------------------
 src/components/timeline/SegmentedTimeline.vue      | 298 --------------
 src/components/timeline/geometry.ts                | 338 ++++++----------
 src/components/timeline/index.ts                   |   4 +-
 src/components/timeline/types.ts                   |  86 ++--
 src/composables/motion/core/index.ts               |   3 +-
 src/composables/motion/spring/springPresets.ts     |   4 +-
 src/styles/glass/rim.css                           |   2 +-
 src/styles/glass/track-well.css                    |   5 +-
 src/styles/tokens/color-radius.css                 |   2 +-
 src/styles/tokens/dark-arm.css                     |   2 +-
 src/styles/tokens/scale-paper.css                  |  97 ++---
 .../custom/timeline/aria-valuenow.test.ts          |  58 ---
 .../timeline/continuous-stitched-gradient.test.ts  | 123 ------
 .../timeline/continuous-structural-split.test.ts   | 288 --------------
 .../custom/timeline/timeline-event-choices.test.ts |  47 ---
 tests/components/slider.contract.test.ts           |  27 ++
 tests/public-surface.spec.ts                       |   2 +-
 tests/styles/spring-authority.test.ts              |   4 +-
 34 files changed, 666 insertions(+), 3618 deletions(-)

untracked adds:
 src/components/timeline/Timeline.vue                       739
 tests/components/custom/timeline/timeline.contract.test.ts 410
 tests/components/custom/timeline/timeline.partition.test.ts 167
```

`scale-paper.css` carries **two** hunks: `@@ -29,30 +29,22 @@` is the FOREIGN #32/#71 eyeglass
lane's, already on disk at open; `@@ -286,64 +278,25 @@` (§16 TIMELINE) is this row's. Named so the
driver does not attribute the first to #46 at commit time. **The cure seat did not touch that file
at all** — the §16 hunk is byte-unchanged from the producer cut.

---

## 9 · CURE — 2026-08-07

**modelId: `claude-opus-5[1m]`** (asserted by prefix `claude-opus-5`) — cure seat, separate from the
producer seat above. Order of record: `CURE-ORDER-46.md` (the Φ5 quartet adjudicator's residue,
driver-ratified verbatim). Nothing under its "What stands" was re-opened. `useSpring.ts` was
**NOT** edited — C1's caution held; the whole cure is consumer-side.

### C1 (HIGH) — the PRM settle release, structurally dead → LIVE

**Mechanism of the defect.** `useSpring.ts:107` seeds `isSettled` **true** (`initialVelocity === 0`)
and `:137` re-assigns it from `spring.value.settled` inside the ONE subscription. Under
`prefers-reduced-motion` the engine snaps inside the target setter, so that subscription fires with
`settled` already `true`: the flag goes **true-over-true** and never changes. The release watched
the flag's *edge* (`watch(() => travel.isSettled.value, …)`), so it never ran — while the *same*
subscription's `onValue` had already called `flex.drive(v)` (stretching the meniscus off the |Δt|)
and set `crossing`. The cap parked stretched and `data-crossing` latched, which is verbatim the
failure the SFC's own comment at `:81-83` declares the release MANDATORY to prevent.

**The cure.** Watch the settled **STATE**, not the flag's edge:
`watch([travel.value, travel.isSettled], ([, settled]) => { if (!settled) return; flex.squish(0);
crossing.value = null; }, { immediate: true })`. The travelling value ALWAYS moves on the PRM path,
so it is the source that makes the release reachable there. The sprung path is behaviour-preserving:
every frame runs the callback and returns at the guard exactly as before, and the settling frame
releases exactly as before — it simply no longer depends on a flag transition that one path never
performs.

**Born-RED → GREEN, both halves, against the pre-cure bytes.** The behavioural case
(`T-FLEX-2 › a re-target under prefers-reduced-motion leaves NO stretch and NO crossing`) was
written and run BEFORE `Timeline.vue` was touched. It mounts with the active span at
`progress: 0`, re-targets to `progress: 1` under a stubbed `matches: true` media query, and reads
the live bytes off the DOM:

```
PRE-CURE (unmodified Timeline.vue):
  AssertionError: expected 1.0451919642276981 to be 1          ← the meniscus parked stretched
  AssertionError: expected [ DOMWrapper{…} ] to have a length of +0 but got 1   ← data-crossing latched
POST-CURE:
  Test Files  2 passed (2)   Tests  37 passed (37)
```

`1.04519…` is the predicted value, not a coincidence: `1 + tanh(0.4 · 1.6) · (1.08 − 1)` for the
0.3 → 0.7 aggregate step at the `NO_TOKEN_CAP` floor. The old case at `:109-117` asserted only
source text (`/isSettled[\s\S]{0,200}?flex\.squish\(0\)/`) — it passed on the broken code and is
**deleted**, replaced by the behavioural case plus one structural twin that pins the watch SHAPE
(`watch([travel.value, travel.isSettled]…`), so the edge form cannot come back silently.

### C2 (MEDIUM) — the coarse 44px floor, dead → declared where it bites

**Mechanism.** `utilities/responsive.css:4` is a bare `[data-control-target]` — **(0,1,0)**. Vue
suffixes every scoped selector with `[data-v-*]`, so `.tl__mark` ships as **(0,2,0)** and wins on
`min-block-size`/`min-inline-size`, the exact two properties the shared rule sets. The attribute
was a census marker declaring intent that the cascade then discarded; the comments at `:416-418`
and `:532-535` asserted a floor that never painted.

**The cure.** 24px is NOT the intent — WCAG 2.5.5 is, as both comments say — so the floor is
re-declared at the component's own specificity in one scoped `@media (pointer: coarse)` arm reading
the SAME `--touch-target` token, on `.tl__mark` (both axes) and on `.tl__marks` (the row must
reserve the inflated box, or a 44px mark overhangs a 24px list by 10px on both edges). One value,
two declaration sites, no second number typed. This is the `slider/styles.css:85-94` precedent
verbatim — the same component-level coarse arm for the same reason. `data-control-target` STAYS: it
is the library-wide census marker, and the comment now states truly what it does and does not
deliver.

**Proved in emitted-CSS/unit terms** (no browser this seat — #39's live seat owns it, and the
390×844-coarse PAINT cell rides #10 π-SUITE): new `T-TARGET-1`, two cases — one reads
`responsive.css` and pins the shared rule as a bare attribute selector while pinning the SFC's fine
1.5rem floor (the two facts whose conjunction IS the defect); the other extracts the SFC's
`@media (pointer: coarse)` body with a brace-balanced scan and asserts both mark axes and the list
reservation read `var(--touch-target)`, and that no `2.75rem` literal appears. Born-RED:
`src/components/timeline/Timeline.vue declares a (pointer: coarse) arm: expected null not to be
null`.

### C3 (MEDIUM) — `role="progressbar"` with no accessible name

**Mechanism.** The track owns no text content and `TimelineProps` offered no name, so axe
`aria-progressbar-name` (serious) fired on every instance. The demo's `aria-label="Release
timeline"` was a **fallthrough attribute**: it landed on the ROOT, which is `role="group"`, and left
the bar itself nameless — the defect and its disguise in one line.

**The cure.** `TimelineProps.label?: string` → `:aria-label="props.label"` on the track. The demo
site swaps its fallthrough `aria-label` for the prop; the README documents it. No name is invented
when it is omitted — an invented name is a lie, and the mounted case asserts that too.

**Born-RED → GREEN:** `the reporting axis › label names the progressbar itself, not the surrounding
group`, written before `types.ts` was touched —
`AssertionError: expected undefined to be 'Release timeline'` → GREEN. The case also asserts the
group does NOT carry the name (so re-routing it to the root reds) and that a bare mount leaves
`aria-label` undefined.

### C4 (MEDIUM) — the 8.0.0 breaks, unbooked → booked

`MIGRATION.md` §8.0.0 gains a full timeline entry on the `abb1eba2` precedent: the
`GlassTimeline` → `Timeline` runtime rename (subpath `./timeline` survives), the note that the
other five SFCs were never exported so the export delta is one rename, and five classification
tables — exports (`TimelineSegmentGradient` removed, `TimelineProps` added), props (`variant`,
`modelValue`, `currentSegmentKey`, `ariaLabel`, `disablePopover` removed; `current` added; **`label`
REPURPOSED** from the scrubber's tooltip caret to the bar's accessible name — same spelling,
different job, called out because a silent semantic swap is worse than a rename), emits/slots
(`click`→`select`, `hoverEnd` folded into `hover(null)`, `#popoverContent` gone), the
`TimelineSegment` shape (`gradient`/`weight` out, `at`/`accent` in, `state` now optional,
`progress`-omitted-on-active now INDETERMINATE where the old primitive fabricated 0.5), and the
14-removed / 1-added token table. `MIGRATION.md:564`'s inventory row is marked
`removed 8.0.0`. `CHANGELOG.md` §8.0.0 gains the matching `### Changed` block pointing at it.
Every figure is read off the diff, not remembered: the 14 removed token names are the
`scale-paper.css` §16 hunk's own deleted lines.

### C5 (LOW) — the record's own gaps

§6 gains **divergence #7** (translateX + two `overflow: hidden` boxes vs TR#46's
`useAnisotropicExtent` clip-path clause), grounded on `NOVELTIES.md:46` — minted ONCE at #67 W-2,
*"#46 and row 11 consume, never re-mint"*, **0 on disk re-verified this seat** — so the clause is
unexecutable as written; the adoption question is ROUTED to #67 W-2's consumer walk and booked in
§7. `RECORD.md:9`'s "named in §5" self-reference is corrected to §6 with a dated bracket.

### Low riders

| rider | disposition |
|---|---|
| `onMarkLeave` emitted `hover: null` outside its guard | CURED — the emit moved INSIDE the guard beside the assignment. A leave from a mark that no longer owns the hover (a `blur` racing the neighbour's `pointerenter`) no longer nulls a live hover |
| write-only `data-crossing` (`:317`) | CURED by **binding**, not deleting: `.tl__mark[data-crossing] .tl__disc { will-change: transform }` gates the compositor hint to exactly the crossing window — the same shape as `[data-advancing]` on the fill, and the attribute is now load-bearing. Deleting it would also have deleted C1's own falsifier |
| comment arithmetic `:494-495` — `0.05 + 0.12 = 0.16` | CURED → `0.17`. 0.16 is `--ink-edge`; `--fill-hover` 0.05 + `--fill-selected` 0.12 = 0.17, both read off `color-radius.css:139,149-150` |
| the same false `= 0.16` at `color-radius.css:122` | **FIXED, not routed** — one figure, one file, clean at HEAD in this tree; routing a typo to #61 would have left a false derivation in the token register for a whole band |
| `DESIGN.md:248` stale `--timeline-dot-fill`/`--timeline-dot-stroke` forward reference | CURED — dated strike in place, in the file's own `[2026-08-07 · BK #46] ~~…~~` idiom. Both names are struck for DIFFERENT reasons and both are stated: `-dot-fill` shipped and dies at 8.0.0; `-dot-stroke` never reached disk. The RULE the reference illustrated stands and is restated without them |
| record nits | CURED — `ContinuousMarkers` 436 → **440** (the 1,948 sum was already right, so the row was the wrong figure, not the total); `Timeline.vue` 690 → **689** pre-cure, now 739; §5's two ΔRGB figures labelled LIGHT with the adjudication's DARK pair beside them |

### VERIFY — post-cure, verbatim

```
$ npx vue-tsc --noEmit
vue-tsc exit: 0

$ npx vitest run tests/components/custom/timeline      (run 1 of 2)
 Test Files  2 passed (2)
      Tests  37 passed (37)

$ npx vitest run tests/components/custom/timeline      (run 2 of 2)
 Test Files  2 passed (2)
      Tests  37 passed (37)

$ npx vitest run tests/styles tests/gates tests/public-surface.spec.ts
 Test Files  5 failed | 26 passed (31)
      Tests  8 failed | 523 passed | 2 expected fail (533)

$ npx vitest run tests/components
 Test Files  3 failed | 122 passed (125)
      Tests  6 failed | 944 passed (950)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
```

The row's own suites go **33/33 → 37/37**: one source-text case deleted, five behavioural/emitted-CSS
cases added (C1 behavioural + C1 watch-shape + T-TARGET-1 ×2 + C3 accessible name).

**The register receipt is STILL byte-identical** — `rosterSha256:dc05df91`, `violations:1`,
`bound:8`, `unbound:50`, character for character with §4's. The cure minted, bound, armed and moved
nothing in the register.

**The 14 failures, each by provenance:**

| failure | proof it is not this row's |
|---|---|
| `gate-register` ×3, `overfit-structure` ×1, `stacked-url-filter` ×1, `pager-dots` ×5, `carousel` ×1 | unchanged from §4 — same 11 messages, same foreign subjects (`pager-dots/`, `carousel/`, `useLeadTrail.ts`), same proofs |
| `public-surface` › *keeps package and lock root metadata in exact agreement* | the lock root carries `embla-carousel` + `embla-carousel-vue`; the on-disk `package.json` does not. `git diff package.json` shows the pair deleted from all three blocks (`peerDependencies`, `peerDependenciesMeta`, `devDependencies`) while `git status` reports `package-lock.json` UNMODIFIED — **RT-39D itself**, the #40/#71 lane's uncommitted mismatch that §4 already names as the reason `npm run build` cannot run here |
| `public-surface` › *ships exactly the style closure plus the three generated members* | the six source partials `dist` lacks are `components/carousel/styles.css` and `components/deck/styles/{index,stage,turn,reveal,capture}.css`. `git ls-tree HEAD` finds NONE of them; `ls` finds all six — foreign additions from the same lane, not yet built into `dist`. Neither file is in this row's paths |
| `boot-graph` › *the dist-demo it measures is NEWER than every source it is built from* | **mechanically this seat's, and deliberately left RED.** The arm reds on any source edit; §4 cured it with `npm run demo:dist:build`. The cure order's own driver notes reserve that rebuild for the driver, immediately before commit (*"never `npm run build`"* — RT-39D). Running it here would only be re-invalidated by the driver's own re-run. **DRIVER ACTION: `npm run demo:dist:build` before staging, and this arm greens** |

§4's sentence *"the arm is green in the run above"* was true of the producer cut's run and is NOT
true at this seat's HEAD; it is superseded by the row above, not silently left standing.

### NOT DONE — unchanged from §5

The full π battery still belongs to **#10 π-SUITE**: the real-`safari-app` cells, the 390×844
coarse cells (which is where C2's fix gets its PAINT confirmation), the void-gated capture, the
`plus-lighter`/`contrast-color()` Safari rows. No browser was driven this seat — #39's live sheet
seat holds the singleton, and the three banked Chromium PNGs in this directory are the producer
cut's, un-retaken. The C2 and C1 fixes are proved in emitted-CSS and behavioural terms only, and
this record claims nothing more for them.
