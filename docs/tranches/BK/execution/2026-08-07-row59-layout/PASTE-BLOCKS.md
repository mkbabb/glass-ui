# Banked paste blocks — Row #59 W-LAYOUT

Both blocks are OUT of the executing seat's fence; the driver pastes them at the landing commit and
substitutes the real SHA for `<SHA>`.

**THE ⊕-INDEX IS DERIVED AT COMMIT TIME FROM THE CURSOR'S TAIL — NEVER BANKED AS A CONSTANT.** At
this seat the cursor's tail is **⊕⁵²** (#55, `EXECUTION-PROGRESS.md:1670`) while **#57 has already
LANDED at `a025d99f` with its own block banked at ⊕⁵³ and not yet pasted** — so `⊕⁵⁴` below is the
best-known value, not an authority. The driver re-reads the tail immediately before pasting and
re-indexes if a lane landed in between.

---

## A · `docs/tranches/BK/EXECUTION-PROGRESS.md` — append to the ledger

```
⊕⁵⁴ **#59 W-LAYOUT LANDS-IN-PART (2026-08-07, `<SHA>`).** The chassis spine, and the row's
own arithmetic falsified twice by the paint it ordered as step 0. **THE SHELL IS A GRID**:
`h-screen` + `flex` + the inner flex-column wrapper were three mechanisms describing one
two-by-two topology, and they are all three gone for `"rail main" / "rail dock"` at
**`100dvh`** — `vh` measures the LARGEST viewport, so with a dynamic mobile toolbar showing a
`100vh` shell is taller than the screen and the dock row falls off it. The dock is an in-flow
grid ROW now, which makes occlusion impossible by construction rather than by a reserved
spacer: `scroll-padding-block-start` **dies**, and across 92 routes at 390×844 the dock is
below the fold on **zero** of them and the shell is exactly `100dvh` on **all 92**.
`scroll-padding-inline-start` **SURVIVES, conditioned** — its doc-record ties it to the rail's
transient hover FAN, not the bottom dock, and the §9 fan-open probe is OWED, so deleting it
would be a guess dressed as a cut. **THE SEAT LAW REPLACES THE WIDTH-ONLY RAIL**: `@media
(width > 48rem) and (orientation: landscape)`, strict `>` (an inclusive arm handed exactly-768
a rail AND the mobile rungs in one frame), plus `and (height <= 30rem)` to shed the dock on
landscape phone. **THE FOUR MEASURES** land in a new 140-line `demo/chassis/layout.css`, each
carrying its derivation: `--measure-prose:66ch` · `--measure-cel:21rem` · `--measure-wide:34rem`
· `--article-max:96rem` = 2× the seat threshold. **THE CEL FIELD REPLACES flex-col**:
`repeat(auto-fit, minmax(min(var(--measure-cel),100%),1fr))`, row-major, no `dense` — and the
figure is **76 of 92 story pages were `display:flex`, i.e. 1-up at every width; 80 of 92 now
render more than one track**. `StorySection` gains the ONE new chassis API, `span?: "cel" |
"full"`, read by a DESCENDANT selector because `StoryBodyRenderer` renders under
`display:contents`. **THE LADDER IS ONE BLOCK**: six `--sp-*` rungs on `:root` (not on the
shell — Sheet/Dialog/Toaster portal outside it) with exactly one `@media (width <= 768px)` arm,
gate-asserted as the ONLY width-conditional spacing block in `demo/`, and `--sp-1` deliberately
absent from it. **K4 WAS WORSE THAN THE SPEC KNEW**: `--story-article-w` is declared NOWHERE on
disk, so the inline branch resolved to the initial value and every ordinary story had NO article
cap at all — and an inline style outranks any sheet, so the field's gap could never have
applied while the `:style` bindings were there. **TWO DEFECTS THE PAINT FOUND, NOT THE SPEC.**
(1) §4's binding census cell 852×393 was derived against an 88px rail; the rail on disk is a
75px dock plus its gutter = **99px**, so the field landed on **689px against the 692 two cels
need** and the cell fell silently to 1-up — three pixels. The rail's inline rung drops
`--sp-3`→`--sp-2`, the column becomes 91px, the field 697, and the cell is **2-up (2 × 338.56px)
measured**; 1440 is unaffected. (2) A size container carries `contain: inline-size`, so its
min-content contribution is **ZERO** — harmless in a definite grid track, fatal in a flex row,
where `flex-shrink` found the zero floor and **collapsed StorySection to 0px wide with its
heading intact and unpaintable** (`/data/search` measured `w:0, sw:70`, plus virtual-section and
infinite-scroll). Cured by ONE chassis declaration, `min-inline-size: min(var(--measure-cel),
100%)`, because the hazard belongs to the container contract and not to the three pages that
found it. **K18 IS NOT DECLARED AND THE OMISSION IS THE FINDING**: the wrap-arm's
`@container (inline-size >= 40rem)` has no inline-size container anywhere in either target
rail's ancestry (whole-repo census: 6 such containers, none in the studio chain), so it would
never match — a rule that never matches is a fallback hiding a dead primary, and it is ROUTED
with its subject. **KILLED**: `max-w-6xl` ×2 · both landing grid strings + `lg:gap-6` +
`sm:col-span-2`→`data-span` · the 5 chassis clamps (the 4 CatalogLanding clamps the spec lists
were ALREADY GONE — recorded, not claimed) · the off-series `PAD_CLASS`/gap maps, props kept ·
`responsive` on the family switcher, replaced by the mounted strip in the `<FadingScroll>` the
spec names (load-bearing: a 458px strip in a 350px phone column, measured at `/display/atoms`) ·
the sortable-list 2-up wrapper, absorbed · 2 story `@media` arms re-keyed ARM-INVERTED to
`@container` with their numerals unchanged, because the author had measured the ROW and the
query now measures the row instead of the window · 4 of the 7 raw-`vh` envelopes onto ONE
`--stage-block` (7, not the spec's 8 — `ScrollChoreography` is already gone) ·
`max-w-sm`/`max-w-2xl`/`max-w-prose` in `StoryBodyRenderer` onto the three measures, which is
also what keeps `--measure-wide` from being a 7th orphan token. `useBreakpoint` is NOT deleted —
the spec's own O-B11 re-rule routes it to LIB-SEAM. **PAINT, DELTA-CAPTURED AGAINST A LIVE
PRE-CUT TREE** (`git archive a025d99f` served on a second port, same sweep script, artefacts
banked): every §4 prediction confirmed — 768×1024 the cured B1 cell at **2 × 358px**, 2560
**exactly 4-up at 369px** (the spec's own number) with the frame symmetric at **38.1%** against
G3's ≤42% and prose immovable at 739.8px = 66ch, 1440 at **3 × 416px**. **Page-level horizontal
overflow: ZERO on all 92 routes at 1440**, and 3 at 390 versus 2 pre-cut — the one new route is
`/motion/deck`, whose file is #40's uncommitted lane in this tree and whose strip already
overflowed by 1186px at 1440 pre-cut. Nine sections were marked `full` from the measurement, not
from a rule. **π NOT CLAIMED** — these are Chromium-only structural reads; the §9 battery
(safari-app, the steer-12 occlusion trio on a real dynamic toolbar, fan-open, 2560
curve-gallery, home-indicator under `cover`, the owner sign-off) is owed to **#10**. **GATES:
zero minted, zero bound, zero moved** — receipt BYTE-IDENTICAL pre and post, `seats:60 active:48
reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1
rosterSha256:dc05df91 violations:1`, the one violation being #40's uncommitted
`pager-dots.contract.test.ts` deletion. The four LAYOUT seats stay ABSENT — C-13 is #9/#65's —
and `tests/styles/layout-canon.test.ts` (411 ln) sits under them as ordinary cases on the
`radius-role-canon` precedent: **23 ordinary cases + 3 `it.fails`, and born-RED was RUN not
asserted** — the file copied into a `git archive a025d99f` scratch tree gives **23 failed / 3
expected fail**, against 23 passed / 3 expected fail here. Verify: **vue-tsc 0** ·
`tests/styles tests/components tests/gates` **12 failed / 1408 passed / 5 expected fail — the
SAME 12 as the pre-edit baseline, every one foreign** · `tests/demo` + `public-surface`
**145 passed / 2 failed, #46's named foreign pair**. **28 files changed (+407/−232) + 2 new; no
foreign-dirty file touched.** Record:
`docs/tranches/BK/execution/2026-08-07-row59-layout/RECORD.md`. **ROUTED**: K7's story-level
triage (**73 hits / 33 files**, re-derived live at adjudication — this figure is re-derived at every paste, never carried; chassis and shell are at **0**, gate-asserted behind the one enumerated exemption `PresetEditor.vue`)
→ **#59's own remaining half, ORDERED not deferred — an arm-inverted `@container` re-key needs
the container this commit creates** · K10/K14 the studio fork and K15's last 3 `vh` envelopes →
**#59, behind the lanes holding `configurator.vue`/`blob.vue`/`fourier-field.vue` uncommitted**
(all three held RED by `it.fails`, so the residue list cannot quietly stop shrinking) · K18 →
#59 behind K10's container · K3b's fate → **#10**'s probe, then #47 if dirty · the §9 battery →
**#10** · §11 LIB-SEAM (`useTabResponsive`+Select in `src/`, segmented 640px, LabeledField
36rem, `useBreakpoint` cut + `public-surface.spec:217`) → **#76** · `/motion/deck` @390 →
**#40** · the four sub-100px in-cel density overflows → **#56**, its own listed hierarchy rows.

**Φ5 procession: next = re-scout.** #59 UNBLOCKS **#58** (`EXECUTION-DAG:69` dep `#59`) — but
#58 carries ASK g11 as a second gate, and **#73 rides #58's chassis**, so neither opens by this
landing alone. #21 stays gated on #17 (Φ4-UNSTARTED), #25 on its rides-clause, #22 is CURE-CUT
and never selectable, #42/#44/#45/#47/#48/#52 stay behind their DAG edges, #49/#50/#51/#53 are
ASK-gated, #56 stays behind "after lane cuts", #74 is inside #88's cut, and #79-#89 wait on
their lanes. **#32 · #33 · #34 · #35 · #40 · #71 STILL SIT UNCOMMITTED IN THIS WORKING TREE.**
The cursor alone cannot show a lane that has not committed (⊕⁴⁸), so the next scout re-derives
from the DAG **and** `git status`, never from this block's list.
```

---

## B · `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md` — row 59 append

Append inside row 59's last cell (before the closing `|`). **PIPE-COUNT LAW**: row 59 carries **6
structural pipes** at `TERMINAL-ROSTER.md:209` and must still carry 6 after the append — the block
below contains no raw `|` (the `span` union is written `\|`).

```
 ⊕⁵⁴ **LANDED-IN-PART 2026-08-07 (`<SHA>`; record `docs/tranches/BK/execution/2026-08-07-row59-layout/RECORD.md`).** The chassis spine. **SHELL GRID**: `h-screen` + flex + the inner wrapper all three deleted for `"rail main"/"rail dock"` at **`100dvh`**; the dock is an in-flow ROW, so `scroll-padding-block-start` dies and occlusion is impossible by construction — **dock below the fold on 0 of 92 routes @390, shell exactly `100dvh` on all 92**. `scroll-padding-inline-start` KEPT and CONDITIONED (its record ties it to the rail's transient fan; the §9 probe is owed). **SEAT LAW**: `(width > 48rem) and (orientation: landscape)`, strict `>`, `+ (height <= 30rem)` sheds the dock. **FOUR MEASURES** in a new `demo/chassis/layout.css` (140 ln), each with its derivation; `--article-max` = 2× the seat threshold. **CEL FIELD** replaces flex-col — **76 of 92 story pages were `display:flex` (1-up everywhere); 80 of 92 now render >1 track**; `StorySection` gains the one new API `span?: "cel" \| "full"`. **LADDER**: six `:root` rungs, ONE `@media (width <= 768px)` arm, gate-asserted as the only width-conditional spacing block in `demo/`. **K4 was worse than specified** — `--story-article-w` is declared nowhere on disk, so every ordinary story had NO article cap. **TWO DEFECTS THE PAINT FOUND**: §4's binding 852×393 cell was derived against an 88px rail against a real 99px one and fell to 1-up by **three pixels** (rail rung `--sp-3`→`--sp-2` → **2-up, 2 × 338.56px measured**); and `contain: inline-size` zeroes a container's min-content, which **collapsed StorySection to 0px in a flex row** (`/data/search` measured `w:0`) — cured by ONE chassis `min-inline-size: min(var(--measure-cel), 100%)`. **K18 NOT DECLARED, and that is the finding**: no inline-size container exists in either target rail's ancestry, so the wrap-arm could never match — routed with its subject. KILLED: `max-w-6xl` ×2 · both landing grids + `sm:col-span-2`→`data-span` · 5 chassis clamps (the 4 CatalogLanding ones were ALREADY GONE) · the off-series pad/gap maps, props kept · `responsive` on the family switcher → mounted strip in `<FadingScroll>` (load-bearing: 458px strip in a 350px column) · the sortable-list wrapper · 2 story medias ARM-INVERTED to `@container`, numerals unchanged · 4 of 7 raw-`vh` onto one `--stage-block` · three `max-w-*` literals onto the measures. **PAINT DELTA-CAPTURED against a live `git archive a025d99f` tree**: every §4 prediction confirmed — 768 the cured B1 cell, 2560 **exactly 4-up at 369px** with frame symmetric **38.1%** vs G3's 42%, 1440 3 × 416px; **zero page-level horizontal overflow on all 92 routes @1440**. π NOT CLAIMED — Chromium structural only; §9's battery owed to #10. **Gates seats +0, receipt byte-identical pre/post**; the 4 LAYOUT seats stay ABSENT (C-13 is #9/#65's) and `tests/styles/layout-canon.test.ts` sits under them, **23 cases + 3 `it.fails`, born-RED RUN not asserted (23 failed at the pre-cut bytes)**. Verify vue-tsc 0, suites at the pre-edit baseline (12 foreign failures), +23 passed +3 expected-fail row-own. ROUTED: K7's triage (**73 hits / 33 files** re-derived at adjudication; chassis+shell at 0 behind the one enumerated exemption) → #59's remaining half, ORDERED behind the container this cut creates · K10/K14 + K15's last 3 `vh` → #59 behind the lanes holding those files uncommitted, all three held RED by `it.fails` · §9 → #10 · §11 LIB-SEAM → #76 · `/motion/deck` @390 → #40 · four in-cel density overflows → #56.
```
