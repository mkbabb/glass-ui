# BK Row #59 — W-LAYOUT · execution record

**modelId: `claude-opus-5[1m]`** (SCOUT+IMPLEMENT seat) · base HEAD `a025d99f` · 2026-08-07

Spec of record: **TR §A row 59** → `docs/tranches/BJ/addenda/2026-07-24-refinement/LAYOUT.md`
(`b1e9fa31`). TR wins on divergence. TR cell verbatim:

> `| 59 | W-LAYOUT | LAYOUT.md (`b1e9fa31`); `viewport-fit=cover` first (absent from `index.html:9`—every `env(safe-area-*)` inert today; the first fix is one character) | Φ5/6 | LIB-SEAM batch §11; 4 seats (G2 → arm of G1); §9 probes step 0 |`

State: **LANDED-IN-PART.** The chassis spine is on disk and paint-verified across 92 routes at
five viewports. The residue is enumerated in §ROUTED with the row that owns each byte, and three
of the four residue classes are held RED by `it.fails` cases so the list cannot quietly stop
shrinking.

---

## §SELECTION — why this row

Walked TR §A in roster order over the Φ5 band, from the cursor's own table plus
`EXECUTION-DAG-2026-08-03.md` and a live `git status` (⊕⁴⁸: the cursor alone cannot show a lane
that has not committed).

| row | disposition |
|---|---|
| #21 | SKIP — gated hard on #17 (`EXECUTION-DAG:32`), and #17 is Φ4-UNSTARTED |
| #22 | SKIP — CURE-CUT, never selectable (⊕³⁰) |
| #25 | SKIP — rides-clause: #82's `field-control.css` cut (C-13k), #27's ladder, #22's rung |
| #32 #33 #34 #35 #40 #71 | SKIP — IN-FLIGHT, bytes uncommitted in this shared tree |
| #42 | SKIP — #47 aperture seam · #44 — behind #43's cut · #45 — #52 · #52 — #35 |
| #47 | SKIP — behind #72 + the #7 fence · #48 — behind #47 W7 |
| #49 #50 #51 #53 | SKIP — ASK-gated (g3+g7 · g1 · atlas-ACK+g12 · g4) |
| #55 #57 | LANDED (`62305f4a`, `a025d99f`) |
| #56 | SKIP — TR#56's own gate cell reads **"after lane cuts"**, and the component lanes are the six uncommitted ones above |
| #58 | SKIP — TR#58: "after #59" + ASK g11 |
| **#59** | **SELECTED** — UNSTARTED, `EXECUTION-DAG:70` hard blockers **"none"**, and it is the lowest such id in TR order |

---

## §BORN-RED

The gate executable is `tests/styles/layout-canon.test.ts` (411 ln, 23 ordinary cases + 3
`it.fails`). Born-RED was run, not asserted: `git archive a025d99f` extracted to a scratch tree
with `node_modules` symlinked, the test file copied in, `npx vitest run` from that root.

```
PRE-CUT  (a025d99f):  Tests  23 failed | 3 expected fail (26)
POST-CUT (this cut):  Tests  23 passed | 3 expected fail (26)
```

**Every one of the 23 ordinary cases is born-RED**, including the two arithmetic cases (they read
`--article-max` / `--measure-cel` / `--sp-*` from a sheet that does not exist pre-cut). The 3
`it.fails` are RED in BOTH runs by construction — they are the routed residue, not the row's work.

The module-level `read()` is guarded so a missing sheet reports as a missing LAW per case rather
than as a module-load ENOENT that yields "0 tests"; the guard is what makes the born-RED run
legible and it is commented as such in the file.

---

## §PER-ITEM LEDGER

Line references are to the bytes at `a025d99f`. LAYOUT.md's own line cites had drifted (the spec
predates six landed Φ5 rows); every one was re-derived on disk before it was cut.

### The spine

| # | item | trace |
|---|---|---|
| K20 | `viewport-fit=cover` — **the TR cell's "first"** | `index.html:9`. Every `env(safe-area-inset-*)` in the demo computed 0 before this; the safe-area idiom below is live only because of it |
| K1 | shell grid | `AppShell.vue`: `h-screen` + `flex` + the `:288` flex-column wrapper **all three deleted**; `dock-nav.css` `.demo-app-shell` gains `display:grid` · `auto minmax(0,1fr)` / `minmax(0,1fr) auto` · areas `"rail main"/"rail dock"` · `block-size:100dvh` · `overflow:clip`. `100vh` measures the LARGEST viewport — with a dynamic mobile toolbar showing, the dock row falls off the screen for as long as the toolbar is up |
| — | seat law | `@media (width > 48rem) and (orientation: landscape)` seats the rail; the base arm is `display:none`. STRICT `>` — an inclusive `>=` handed exactly-768px a rail AND the mobile rungs in one frame. `.demo-shell-category-menu` re-keys to the same arm |
| K19 | dock sheds short-wide | `… and (height <= 30rem) { .demo-bottom-dock { display: none } }` |
| K2 | 3 pad props + the 30rem arm + the 48rem pad half | `--demo-shell-content-pad-block/-inline` + `--demo-shell-dock-pad-inline` **deleted**; the `@media (min-width: 30rem)` block **deleted whole**; the 48rem block survives ONLY as the seat swap, with the orientation term. `--demo-nav-bottom-inset` now reads `--sp-3`, so the spec's "narrow-short tightens one rung" arrives from the LADDER instead of a second media block |
| K3a | `scroll-padding-block-start` | **deleted**. Nothing overlaps the content under the grid: the dock is a row, the rail is a column |
| K3b | `scroll-padding-inline-start` | **KEPT, conditioned.** Its doc-record ties it to the rail's transient hover FAN, and the §9 fan-open probe that would retire it is OWED. Deleting it on the assumption the probe is clean would be a guess dressed as a cut |
| — | the four measures | `demo/chassis/layout.css` (NEW, 140 ln): `--measure-prose:66ch` · `--measure-cel:21rem` · `--measure-wide:34rem` · `--article-max:96rem`, each with its derivation in the sheet |
| — | article law | `.story-article,.optical-bench { max-inline-size: var(--article-max); margin-inline: auto }` + `.story-article :where(p) { max-inline-size: var(--measure-prose); text-wrap: pretty }` |
| K4 | `--story-article-w` branch + BOTH inline `:style` bindings + the `--story-page-section-gap` chain | `StoryPage.vue`. **The branch was worse than the spec knew**: `--story-article-w` is declared NOWHERE on disk (`rg` → 1 hit, the consumer), so on every ordinary story the inline cap resolved to the initial value and the article had NO cap at all. And an inline style outranks any sheet, so the field's own gap could never have applied while the `:style` gap bindings were there |
| — | cel field | `.story-cels,.story-sections,.story-field { display:grid; grid-template-columns: repeat(auto-fit, minmax(min(var(--measure-cel),100%),1fr)); gap: var(--sp-5) var(--sp-4); align-items:start }`. Row-major, no `dense` |
| — | `span` API | `StorySection` gains `span?: "cel" \| "full"` → `:data-span`; the rule is a DESCENDANT selector because `StoryBodyRenderer` renders under `display:contents` (grid ITEMS that are not grid CHILDREN) |
| — | container contract | `.story-section { container: cel / inline-size }` (scoped) |
| K5 | `max-w-6xl` ×2 | `CatalogLanding.vue:16`, `SectionLanding.vue:24` → the article law; both articles now carry `.optical-bench` |
| K6 | landing grid strings + `lg:gap-6` + `sm:col-span-2` | `grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6` ×2 → `.story-field`; `SectionPreviewCard.vue:32`'s `lead && 'sm:col-span-2'` → `:data-span="lead ? 'full' : null"` (a 2-track span on a 1-track grid is the overflow G1's mutation restores) |
| K8 | 5 chassis clamps | `story-hero.css` `:6` (gap) · `:53` ×2 (bleed pad) · `:73` (title margin) · `:124` (cluster margin) → rungs. **The 4 CatalogLanding clamps the spec lists are ALREADY GONE at HEAD** — the file is 39 lines and carries none; recorded, not claimed |
| K9 | off-series PAD_CLASS / gap | `ShowcaseFrame` `p-0/p-3/p-4/p-5/p-6/p-10` → `p-0` + `--sp-2…--sp-6`; `StorySection` `gap-2/gap-3/gap-6` → `--sp-2/--sp-3/--sp-5`. Props kept (R5). `gap-6` = 1.5rem was on none of the six rungs, and being static it never transposed |
| K11 | `useTabResponsive` consumption + Select arm | `FamilyTabs.vue`: `responsive` **deleted**, strip stays mounted inside `<FadingScroll axis="x">` — the spec's own replacement, and it is load-bearing (§PAINT) |
| K13 | story media ×2, arm-inverted | `status-dot.vue` `@media (max-width:36rem)` → base-narrow + `@container (inline-size > 36rem)`; `avatar.vue` `@media (max-width:42rem)` → base-narrow + `@container (inline-size > 42rem)`. **Numerals unchanged** — the author measured the ROW; the query now measures the row instead of the window |
| K15 | 8 raw-`vh` envelopes | 7 on disk, not 8 (`ScrollChoreography` is gone at HEAD). **4 cut**: `VizStudio` default `h-[min(86vh,880px)]` → `story-stage`, `aurora.vue:125` override deleted, `springs.vue:383` `h-[min(64vh,520px)]`, `NotFound.vue:14` `min-h-[60vh]`. 3 ROUTED (below) |
| K17 | sortable-list 2-up wrapper | `<div class="grid items-start gap-6 md:grid-cols-2">` **deleted**; its two sections are cel-field items and pack 2-up on their own |
| K12 | `useBreakpoint` | **NOT deleted** — the spec's own §6 re-rule (O-B11) routes it to the LIB-SEAM batch with consumer addenda. Untouched |
| K16 | 546px child | STRUCK by the spec (no referent). Confirmed absent |
| K18 | wrap-arm | **NOT declared, and the omission is the finding.** Whole-repo census: `container-type: inline-size` ×6, none in the studio chain, so `@container (inline-size >= 40rem)` would never match on either target rail. A rule that never matches is a fallback hiding a dead primary. ROUTED with its subject (kill #10/#14's container) |

### Beyond the kill list — measured, not planned

| item | trace |
|---|---|
| `SIZE_MAX_W` re-mapped | `StoryBodyRenderer.vue`: `max-w-sm`/`max-w-2xl`/`max-w-prose` (24rem / 42rem / 65ch) → `--measure-cel` / `--measure-wide` / `--measure-prose`. Three more literal widths in a demo whose only legal widths are the four; 42rem in particular had no law behind it. This is also what gives `--measure-wide` a consumer instead of being a 7th orphan token |
| `NotFound` card | `max-w-sm` → `max-w-(--measure-cel)` |
| **the rail gutter** | `--sp-3` → `--sp-2` inline. **§4's binding census cell was falsified on the live paint**: the spec derived 852×393 against an 88px rail; the rail on disk is a 75px dock plus its gutter = 99px, so the field landed on **689px against the 692px** two cels need and the cell silently fell to 1-up — three pixels. At `--sp-2` the column is 91px and the field is 697. 1440 unaffected (3-up either way) |
| **the sliver floor** | `.story-section { min-inline-size: min(var(--measure-cel), 100%) }`. A size container carries `contain: inline-size`, so its min-content contribution is ZERO; in a grid track that is harmless, in a FLEX row `flex-shrink` finds the zero floor and **collapses the section to 0px wide with its heading intact and unpaintable** — measured at `/data/search` (`w:0, sw:70`), `/data/virtual-section`, `/data/infinite-scroll`. One chassis declaration, not three `flex-1` patches, because the hazard belongs to the container contract |
| 10 sections marked `full` | Measured-crushed at 1440, each pinning its own field: typography ×2 (155px, 24px over) · colors (11) · shadows (17) · icons (18) · tabs (23) · sortable-list kanban · infinite-scroll (81) · search (70) · virtual-section (94). Hand-marked from the measurement, no invented rule |
| `FamilyTabs` scroll port | Killing `responsive` left a 458px strip in a 350px phone column (`/display/atoms`, 88px over). `<FadingScroll axis="x">` + `inline-size: fit-content` — the strip is the RIGHT control; what it needed was room to scroll, not a different control |

---

## §PAINT — 92 routes × 5 viewports, Chromium, DELTA against a live pre-cut tree

Both trees served simultaneously (`:5599` this cut, `:5598` a `git archive a025d99f` checkout) and
swept by the same script. Artefacts in the seat's scratchpad
(`route-sweep-1440{,-PRECUT,-v2,-v3}.json`, `route-sweep-390{,-PRECUT,-v2}.json`).

**Census cells** (`/data/sortable-list`, live `getComputedStyle` + `getBoundingClientRect`):

| viewport | rail | dock | field | tracks | doc/main overflow |
|---|---|---|---|---|---|
| 1440×900 | ON 91px | in-flow [832,900] | 1288 | **3 × 416px** | 0 / 0 |
| 2560×1200 | ON | in-flow | article capped **1536px = 96rem** | **4 × 369px** | 0 / 0 |
| 768×1024 portrait | OFF | ON | 728 | **2 × 358px** | 0 / 0 |
| 852×393 landscape | ON 91px | **hidden** | 697 | **2 × 338.56px** | 0 / 0 |
| 390×844 | OFF | in-flow [770,844] | 350 | 1 × 350px | 0 / 0 |

Every §4 prediction the spec makes is confirmed on the paint: 768 is the cured B1 cell, 852×393 is
2-up (after the rail-gutter cure above), 2560 is **exactly** 4-up at **369px** — the spec's own
number — with the frame symmetric at **38.1%** against G3's ≤42% ceiling and prose immovable at
739.8px = 66ch.

**Whole-demo sweep, 92 routes:**

| figure | pre-cut | this cut |
|---|---|---|
| story pages rendering as `display: flex` (1-up everywhere) | **76 / 92** | 0 |
| routes rendering >1 cel track @1440 | — | **80 / 92** |
| page-level horizontal overflow @1440 (`doc` or `main`) | 0 | **0** |
| collapsed (0-width) sections @1440 | — | **0** |
| shell block-size ≠ `100dvh` @390 | 0 | **0** |
| dock pushed below the fold @390 | 0 | **0** |
| routes with a page-level overflow @390 | 2 | **3** |
| routes with any inner (sub-item) overflow @1440 | 27 | **28** |

The regressions are named rather than rounded off. Beside the one NEW @390 route, the two
PRE-EXISTING @390 overflows both grew under this cut, +4px each (ladder-step-consistent):
`/motion/curve-gallery` **164 → 168** and `/compositions/settings` **13 → 17** [BK #59
adjudication 2026-08-07, challenger B's D3 — figures from the banked sweep artefacts]. @390
the one new route is **`/motion/deck`
(42px)**, whose `deck.vue` + `deck/` rebuild is #40's uncommitted lane in this tree (its
`deck-strip` already overflowed by 1186px at 1440 pre-cut) — routed, not touched. @1440 the four
new inner-overflow routes (`/foundations/colors` 61 · `/foundations/css-utilities` 8 ·
`/forms/inputs` 34 · `/motion/springs` 74) are long unbreakable strings inside a narrower cel;
that is information density, which TR#56 already owns by name (`/forms/inputs` ">3,000 px of
per-state cards" is its own listed hierarchy row). Three routes CLEARED
(`/containers/configurator`, `/foundations/intro`, `/substrates/fourier-field`).

**π NOT CLAIMED.** These are Chromium-only structural measurements taken with the row's own
instruments; the §9 battery (safari-app cells, the steer-12 occlusion trio on a real dynamic
toolbar, the fan-open transient, the 2560 curve-gallery cell, home-indicator under `cover`) is
owed to **#10**, which owns the protocol and the browser seat.

---

## §GATES

**Zero minted, zero bound, zero moved.** The register receipt is BYTE-IDENTICAL pre and post:

```
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
```

The one violation is #40's uncommitted `pager-dots.contract.test.ts` deletion — recorded, foreign,
not this row's to reach. The four LAYOUT seats (`G1 no-H-overflow` +G2 +`viewport-fit` arms ·
`G-MEASURE-LAW` · `G6` · `G-FORK-CENSUS`) stay **ABSENT/unbound**: C-13 wiring is #9/#65's, and an
unwired gate is ABSENT, never GREEN. This file is their executable, sitting under the existing
seats as ordinary cases — the `radius-role-canon` / `proportion-register` precedent.

---

## §VERIFY

```
npx vue-tsc --noEmit                                   → exit 0
npx vitest run tests/styles tests/components tests/gates
    → Test Files  7 failed | 148 passed (155)
      Tests  12 failed | 1408 passed | 5 expected fail (1425)
npx vitest run tests/demo tests/public-surface.spec.ts
    → Tests  2 failed | 145 passed (147)
node scripts/gate-register.mjs                         → byte-identical (above)
```

Pre-edit baseline was **12 failed / 1385 passed / 2 expected fail**; the same 12 failures, every
one foreign (#40 pager/carousel ×6 · gate-register ×3 and overfit-structure ×1, both driven by the
uncommitted foreign files · boot-graph dist-freshness ×1 · the #7/#40 born-RED stacked-url-filter
case). +23 passed and +3 expected-fail are this row's. `tests/demo` + `public-surface` unchanged at
145/2 — ~~the two are #46's named foreign pair~~ [BK #59 adjudication 2026-08-07, challenger
B's D5: the two are the Row-8 falsifiers (`package`/lock root-metadata agreement + the
built-artifact style closure), driven by the foreign-dirty `package.json` (#40's) and a stale
`dist`; foreign holds, the #46 label did not].

---

## §ROUTED

| what | owner |
|---|---|
| K7 story-level per-site triage — **73 hits / 33 files** [re-derived live by the detector at adjudication 2026-08-07; the drafted 75/35 no longer reproduced — foreign lanes move `demo/stories/`, so this figure is re-derived at every paste, never carried], comment-stripped, `demo/stories` only (the chassis and shell are at **0**, gate-asserted behind the gate's one enumerated exemption, `demo/shell/configurator/PresetEditor.vue` — the single live offender, named at `layout-canon.test.ts:359`) | **#59's own remaining half**, and it is ORDERED not deferred: an arm-inverted `@container` re-key needs the container, and `StorySection`'s `container: cel / inline-size` is a byte THIS commit creates. Held RED by `it.fails` |
| K10/K14 the studio fork — `matchMedia("(max-width: 720px)")` → container-set `--configurator-size` | **#59 kill #10**, behind the lane holding `containers/configurator.vue` uncommitted. Held RED by `it.fails` |
| K15 the 3 remaining `vh` envelopes — `blob.vue:466` · `fourier-field.vue:322` · `configurator.vue:173` | **#59 kill #15**, behind those lanes' commits. Held RED by `it.fails` |
| K18 the wrap-arm + its inline-size container | **#59 kill #18**, behind K10/K14's container |
| K3b's fate — the fan-open probe decides it | **#10** (probe) → **#47 GF-DOCK** if dirty |
| §9's full π battery — safari-app cells, steer-12 occlusion trio, fan-open transient, 2560 curve-gallery, home-indicator under `cover`, the owner before/after sign-off | **#10 π-SUITE** |
| §11 LIB-SEAM batch — `useTabResponsive`+Select retirement in `src/`, `segmented` 640px, `LabeledField` 36rem, `useBreakpoint` surface cut + consumer addenda + `public-surface.spec:217` | **#76 W-CONSUMER-BAND** (one marked addendum per repo at ship-time) |
| `/motion/deck` @390 overflow (42px) | **#40 W-PAGER**, whose lane holds the file |
| the four sub-100px in-cel density overflows (`colors` · `css-utilities` · `inputs` · `springs`) | **#56 W-DEMO-TRUTH** — its own listed hierarchy rows |
| `Tabs.responsive` removal absorption | **slides tranche** |
| `.story-nested-body` (`StoryPage.vue:42`) has NO CSS rule anywhere in the repo (same at base — not a regression): family-member stories receive neither the cel field nor `[data-span="full"]` (both descendant-scoped to `.story-article`/`.optical-bench`) — a structural hole in "the cel field reaches every story" for the ~5 family pages' members [BK #59 adjudication 2026-08-07, challenger B's observation] | **#58's chassis** |

---

## §DIFF

28 files changed, 407 insertions, 232 deletions, plus two new files:
`demo/chassis/layout.css` (140 ln) and `tests/styles/layout-canon.test.ts` (411 ln).
No foreign-dirty file was touched — every path above was clean at `a025d99f`.
