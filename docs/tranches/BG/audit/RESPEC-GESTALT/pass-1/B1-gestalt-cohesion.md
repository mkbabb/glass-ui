# B1 — GESTALT COHESION of the shipped product (RESPEC-GESTALT pass-1)

**Lens:** does the demo/product read as ONE designed system, or N locally-correct patches?
**Date:** 2026-07-01 · branch `tranche/BG` · HEAD `976dc890`. Evidence verified on disk; `file:line` cited.
Fence honored: READ-ONLY, no src/demo/scripts edits, this is the only file written.

## Verdict

The storybook does NOT read as one designed system, and the incoherence is structural, not cosmetic.
The prior BD synthesis already nailed the diagnosis — "the COMPONENTS are architecturally sound (~90%);
the DEMOS are spec-sheets (~22%)" (`docs/tranches/BD/viz/page-deep/TRANCHE-GESTALT-META.md:6`) — and BD/BG
*designed a cure* (the DemoFrame box-model inversion, the mandatory colorful field, the unified StoryHeader
cluster). The cure was **built but not adopted**: the unifying chassis (`DemoFrame`) is consumed by **zero**
story pages, the double-header the plan claims to have "killed by construction" is alive on 36 pages, the
demo-staging field chosen to make glass read is a **cold blue** (`h=240`) that clashes with the entire
warm-everywhere / luminous-dark identity, and the specimen-host register is a free-for-all of four different
box treatments including 52 raw opaque `bg-card` slabs. The pieces are individually plausible; assembled, a
designer sees three competing header idioms, two page anatomies, a warm product with cold-blue demo plates,
and a 350-line "conformity by construction" chassis that renders on no page. Every one of these is a SYSTEM
defect (a missing/false chassis contract), not a per-page defect — which is exactly the user's charge:
"mis-consideration of gestalt cohesion … over contrivance … poor encapsulation."

The findings below are ranked; each carries painted and/or code evidence.

---

## Findings

### F1 — [CRITICAL · SYSTEM] The demo-staging field is COLD BLUE, at war with the warm/luminous-dark identity

The BD cure for "gray glass is invisible over a flat field" was "stage glass over a COLORFUL field"
(`TRANCHE-GESTALT-META.md:27-29`, W-PAGE-BACKGROUND). The colorful field actually chosen is **cold blue**:

- `DockStage.vue:38` defaults `config: () => PRESETS.OPENAI_SKY`.
- `demo/stories/aurora/presets.ts` OPENAI_SKY palette: `{ L: 0.55, C: 0.12, h: 240 }` — "Blue volumetric,
  GPT-4.5 feel" (`presets.ts:36-40`). Hue 240 is pure cerulean — the coldest possible register.
- `display/buttons.vue:68-96` stages the glass CTAs over a colorful aurora field for the same reason.

**Painted evidence** (both modes, so it is not a one-off):
- `docs/tranches/BG/audit/reflect/dock-overview-dark-desktop-full.png` (CURRENT BG capture): the shell field
  behind the chrome is a correct warm-ember luminous-dark; the DockStage card below it is a jarring saturated
  **cold blue**. Two color registers in one viewport.
- `docs/tranches/BD/_verify/p4-buttons-light.png`: the "Launch sequence" CTA sits on a flat saturated blue
  slab amid a warm-cream page.

This is a top-tier "missing obvious issue": the product's entire identity is warm-amber / no-gray /
luminous-dark (CLAUDE.md §"warm-chroma floor", §"dark register as a luminous transmissive material"), and the
demo layer — the thing a designer or adopter actually looks at — stages its glass over cold blue. The cure
introduced a NEW incoherence co-equal with the one it fixed. **Note the unaddressed deferral**: BD's own
second-eyes challenge (`TRANCHE-GESTALT-META.md:28-29` #3) asked whether the glass-first-MAXIMAL default is
over-reached — whether a default control should carry a defined rim/fill so it reads over ANY backdrop,
reserving full-transmissive glass for surfaces that HAVE a colorful backdrop. That question was flagged and
never taken; instead the plan doubled down on "add a colorful field" with an off-brand hue.

### F2 — [CRITICAL · SYSTEM] Two page-body anatomies + a dead unifying chassis (`DemoFrame`)

There are two entirely different content-body models depending only on `hero: true`:

- **Content page** (`variant="page"`, 141 pages) — `StoryPage.vue:164-171` renders `<section class="story-cels">`
  over the global `[data-paper-field]`, and its comments (`StoryPage.vue:145-163`) + `DemoFrame.vue:1-37`
  describe the "box-model inversion": free glassy cels (`<DemoFrame variant="stage|specimen|interaction|
  matrix|composition">`) floating over the field, with a `.cartoon-cast` cel-slam entrance.
- **Hero page** (`variant="hero"`, 15 pages) — `StoryPage.vue:178-236` renders `<StoryHero>` (a monolith glass
  card over a per-page LIVE substrate) with `.scroll-cascade` view-timeline + `<StorySection>` blocks +
  `.story-sections--delimited` hairlines.

Different section register (DemoFrame cels vs StorySection blocks), different entrance mechanism (`.route-enter`
+ `--i` cel-slam vs `.scroll-cascade` view-timeline), different delimiter model (cels-are-delimiters vs
hairlines). But the real defect: **`DemoFrame` is consumed by ZERO pages.**

- `DemoFrame.vue:19-25` claims "CONFORMITY BY CONSTRUCTION: a page CANNOT render a flat opaque box off the
  allowlist — it composes a `<DemoFrame variant>`."
- `grep -rl DemoFrame demo/stories/*/*.vue` → **0 pages**. The only references are `StoryPage.vue`,
  `DemoFrame.vue` itself, and `demo-frame.css` (verified: `grep -rl "story-cel\|demo-frame\|DemoFrame"
  demo/stories/*/*.vue` = 1, which is the chassis file).
- The cel-slam entrance CSS targets `.story-cels > .demo-frame.story-cel:nth-of-type(N)`
  (`_chassis/demo-frame.css:225-228`) — a selector that never matches, so no cel-slam fires on real pages.

What pages actually use: `<StorySection>` directly (97 files), `ShowcaseFrame` (33 files), raw `glass-card`
divs, and raw opaque `bg-card` boxes. ~44 content pages don't even use StorySection (raw `<section>`). So the
`.story-cels` slot is filled with the OLD spec-sheet patchwork the DemoFrame model was built to replace. The
central architectural cure of the last tranche (a whole 114-line SFC + ~230-line CSS + a five-variant preset
system + the box-model-inversion prose in three files) is **dead code**, and every page remains the spec-sheet
the audit condemned. This is the sharpest instance of "over contrivance" (build a ceremony chassis) colliding
with "mis-consideration of gestalt cohesion" (it delivers none of the cohesion it advertises).

### F3 — [MAJOR · SYSTEM] The double-header lives on 36 pages; the eyebrow is duplicated verbatim

`StoryPage.vue:119-143` unconditionally renders a chrome `<header>` on every content page: eyebrow
(`Category · Story`) + subpath chip + the audacious `.story-hero-title` + blurb. Then 36 pages ALSO hand-roll a
second inline `<header>`:

- `feedback/toast.vue:103-121`, `data/table.vue:52-70`, `containers/dialog.vue:42-60`,
  `navigation/tabs.vue:88-105`, `display/badge.vue:46-64`, `forms/inputs.vue:24-35` — all render the identical
  structure: `<header class="flex items-center gap-4 pl-5">` with `<IconChip :section>` +
  `section-label--tinted text-admin-label` eyebrow + a `text-small text-muted-foreground` blurb, and the
  **verbatim** copy-pasted inline style `borderLeft: '3px solid color-mix(in srgb, var(--section-label-accent)
  55%, transparent)'`.
- Verified counts: 36 pages carry the `borderLeft:` copy-paste; 37 carry the `section-label--tinted
  text-admin-label` eyebrow.

The eyebrow TEXT is duplicated: the chrome header shows "Feedback · Toasts" (from `StoryPage.vue:40-44`) and the
page header shows "Feedback · Toasts" again. **Painted proof**: `p4-buttons-light.png` shows "DISPLAY · BUTTONS"
twice — chrome header and card header. `DemoFrame.vue:35-37` claims "the double-header dies by construction";
`StoryPage.vue:118` claims "the D1-4 double-`<h1>` suppression." Both are false on disk: the eyebrow/blurb
descriptor is shown twice on 36 pages, and the identity header is a 36× copy-paste, not a chassis contract.
This is textbook "poor encapsulation" — a per-instance hand-roll of what is obviously one component.

### F4 — [MAJOR · SYSTEM] The page-header register is not one idiom — 3+ variants + no-header pages

Sampling the page opening across categories (all under the same chrome header) yields at least four idioms:

- **IconChip identity header** — `forms/inputs.vue:24`, feedback/data/containers/navigation/display (36 pages).
- **Bespoke display masthead** — `motion/springs.vue:157-162`: `<header class="flex flex-col gap-1">` with a
  `text-display-3` title in `var(--motion-accent)` violet — a THIRD header shape, hand-rolled.
- **No header at all** — `foundations/typography.vue:50-52` (straight to content), `display/buttons.vue:52-59`
  (a focal CTA section leads).

Only 36/141 content pages (26%) carry the section-color identity header. So whether a page announces itself with
the IconChip identity, a violet masthead, or nothing at all is ad hoc. A reader paging through the storybook
sees no consistent page-open register — the exact "N locally-correct patches" failure. The category identity
(motion=violet, feedback=stop-8, etc.) is real and good; its DELIVERY has no single home.

### F5 — [MAJOR] Raw opaque `bg-card` slabs (52 sites) violate glass-first in the demos

`grep` finds 52 raw opaque plates inside pages — e.g. `data/data-table.vue:193`, `data/avatar.vue:81,117`,
`data/infinite-scroll.vue:89` all paint `rounded-card border border-border bg-card shadow-cartoon` (a fully
opaque slab), and `containers/dialog.vue:122` paints `bg-card p-6`. These occlude the warm field entirely — the
"flat opaque box off the allowlist" that `DemoFrame.vue:19-20` swears is "structurally impossible." Against the
glass-first-maximal canon (AX.W54) and the field-behind-everything model, these read as gray-on-cream dead
plates. The specimen host must be a field-aware chassis; instead half the data/containers pages fall back to
opaque slabs. (This is the same root as F2 — the absence of an enforced specimen-host contract.)

### F6 — [MINOR] The `ShowcaseFrame` tier is scattered — no standard specimen register

`ShowcaseFrame` is still the live specimen host (33 files), but its `tier` is used as: `field` ×19, `quiet` ×18,
`resting` ×5, `wash` ×7, plus one-offs. There is no rule for which specimen gets which tier, so identical
specimen kinds across pages read at different opacities/registers. Minor on its own, but it compounds F2/F5:
three specimen hosts coexist (DemoFrame [dead], ShowcaseFrame [scattered tiers], raw slabs) where the system
needs one.

---

## Fold candidates (SYSTEM-level transpositions, not per-page patches)

### FC1 — new/merge · `W-PAGE-ANATOMY-UNIFY` — ONE page anatomy, decide DemoFrame adopt-or-retire

The bifurcation (hero vs content body) and the dead DemoFrame are the root of F2/F5/F6. The gestalt transposition
is to collapse to ONE page anatomy with ONE specimen-host contract. Two honest branches — the tranche must PICK,
not keep both:
- **(a) ADOPT DemoFrame**: a real migration wave that rewrites the ~141 content pages onto `<DemoFrame variant>`
  cels, retires ShowcaseFrame + the raw slabs, and unifies the hero path onto the same cel register (the hero
  card becomes a `stage` cel over the live substrate). This is a large, Fable-authored visual wave.
- **(b) RETIRE DemoFrame**: delete `DemoFrame.vue` + `demo-frame.css` (~350 dead lines) and the `.story-cels`
  content-path prose, and standardize on `StorySection` + `ShowcaseFrame` with ONE enforced `tier` contract.
  Cheaper, honest, kills the ceremony; the box-model-inversion ambition is dropped as unbuilt.
- Fable arm: the choice IS a gestalt decision — route to a Fable instance via DesignSync (card-based review of
  one cel anatomy across 4-5 representative pages) before committing the migration.

### FC2 — amend · `W-STORY-IDENTITY-HEADER` — the section identity is a CHASSIS prop, not a 36× copy-paste

Fold the F3/F4 hand-rolled headers into ONE contract. Add `:section` (stop index) + `:icon` (+ optional
`:accent` for the motion-violet case) to `StoryHeader`/`StoryPage`, so the chassis renders the IconChip +
tinted eyebrow + accent rail ONCE, in the ONE header, keyed off the manifest row's category. Delete the 36
inline `<header>` blocks + the verbatim `borderLeft` copy-paste + the duplicate eyebrow. The motion masthead
becomes `:accent="var(--motion-accent)"`, not a fork. This closes F3 (double-header + double-eyebrow) and F4
(3+ idioms) with one encapsulation. Corrects `DemoFrame.vue:35-37` / `StoryPage.vue:118` which falsely claim
this is already done.

### FC3 — new · `W-WARM-STAGE-FIELD` — retire the cold-blue staging default; take BD §3's glass-first question

For F1: retire `PRESETS.OPENAI_SKY` as the DockStage / glass-demo staging default and stage over the SHELL
field's own warm palette (`shellAuroraConfig` in `AppShell.vue:242-245` already computes the warm/luminous-dark
field — glass reads over warm-colorful just as well as blue). Then take the deferred BD §3 #3 architectural
question head-on: should the DEFAULT control carry a defined rim/fill (so it reads over ANY backdrop) with
full-transmissive glass reserved for surfaces that HAVE a colorful backdrop? This is the "architectural
transposition for elegance" the user invites — it would let demos stop hand-staging colorful fields to make
glass visible. Fable + DesignSync (this is a whole-product color/register decision, not a mechanical edit).

### FC4 — prune · retire `DemoFrame` + `demo-frame.css` IF FC1 picks branch (b)

If the unify wave standardizes on StorySection/ShowcaseFrame, `DemoFrame.vue` + `_chassis/demo-frame.css` are
~350 lines of dead chassis + a five-variant preset system rendering on no page — a clean-break prune per the
no-legacy precept.

### FC5 — plan-doc-edit · correct the false "by construction" claims

`DemoFrame.vue:19-25` ("a page CANNOT render a flat opaque box … CONFORMITY BY CONSTRUCTION"), `DemoFrame.vue:35-37`
("the double-header dies by construction"), and `StoryPage.vue:118` ("the D1-4 double-`<h1>` suppression") all
contradict disk (F2/F3/F5). Per the seed's evidence discipline ("a doc that contradicts disk is itself a
finding"), these comments should be corrected or removed when the owning waves land — they currently mislead any
agent reading the chassis into believing the cohesion is enforced when it is not.

---

## Cross-reference to prior corpus (deltas, not re-derivation)

- Builds on `TRANCHE-GESTALT-META.md` (BD synthesis): confirms the "demos are spec-sheets ~22%" diagnosis and
  reports the DELTA — the designed cure (DemoFrame box-model inversion, mandatory field, unified header) was
  BUILT but NOT ADOPTED, so the systemic remains open. F1 further reports the cure's colorful-field choice is
  off-identity (cold blue), and F1 revives BD §3 #3 (glass-first re-examination) as a still-unaddressed
  deferral to fold.
- The gate-lens corpus (`RESPEC/pass-1-proto-P-FIELD-AA.md:D1`) independently found the field-AA gate's
  `.dock-label` selector is fictional (rendered by no SFC) — corroborating over-contrivance in the gate machine;
  out of this lens's scope but consistent with the same disease.
