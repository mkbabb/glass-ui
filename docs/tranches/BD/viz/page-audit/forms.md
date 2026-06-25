# Page-audit — FORMS (12 pages)

Branch `prototype/liquid-dock`. Live spot-checked at `:5173` (isolated browser
context `formsaudit` — the shared tab was being hijacked by another session's
nav-loop; an isolated context survived long enough to read). Static read of all
12 `demo/stories/forms/*.vue` + the chassis SFCs (`StoryPage`/`StoryHero`/
`StorySection`).

Pages: inputs · textarea · checks (Checkbox·Radio·Switch) · slider ·
number-field · select · combobox · multi-select · toggle · toggle-chip ·
selectable-chip · label.

---

## (1) DRY — does the category use the shared chassis?

**MOSTLY yes, with ONE systemic per-category hand-roll.** Every page wraps in
`<StoryPage>` (zero header HAND-ROLL of the AUDACIOUS `<h1>` — the chassis owns
that, so W-HEADER-SCALE/W-PAGE-CHASSIS land for free). BUT:

- **11 of 12 pages hand-roll a SECONDARY in-card `<header>`** (the teal IconChip
  + `--section-color-3` borderLeft rail + `section-label--tinted` eyebrow +
  duplicate blurb). Only `selectable-chip.vue` omits it. This is the
  `BC.W-SUFFUSE-reconcile` forms-stop-3 identity header — but it DUPLICATES the
  descriptor the chassis already renders above the card (see defect §2-DUP).
  Verbatim pattern repeated 11×, e.g. `inputs.vue:24-42`, `slider.vue:40-58`,
  `select.vue:29-47`, `number-field.vue:27-45`. It is a copy-paste block, NOT a
  chassis primitive → a DRY miss + the duplicate-header redundancy in one.

- **The sectioning register is INCONSISTENT across the 12 pages** (the genuine
  per-page arm — see §3):

  | page | sectioning | `<h2>` heading? |
  |---|---|---|
  | inputs | `StorySection heading=` ×6 | YES (correct) |
  | textarea | `StorySection heading=` ×4 | YES (correct) |
  | checks | `StorySection heading=` ×3 | YES (correct) |
  | combobox | raw `<section>` ×1 | NO |
  | selectable-chip | `StorySection label=` ×3 | NO (eyebrow only) |
  | toggle-chip | `StorySection label=` ×3 | NO (eyebrow only) |
  | label | raw `<section><p class="section-label">` ×5 | NO (eyebrow only) |
  | slider | raw `<section><p class="section-label">` ×6 | NO (eyebrow only) |
  | toggle | raw `<section><p class="section-label">` ×5 | NO (eyebrow only) |
  | multi-select | raw `<section>` + `<Label>` ×4 | NO |
  | select | raw `<section>` + `<Label>` ×3 | NO |
  | number-field | raw `<section class="grid">` ×2 | NO — UNLABELED grids |

  Only 3 of 12 use the canonical `StorySection heading=` (`<h2>`/20.4px). The
  other 9 are eyebrow-caption-only or raw unlabeled `<section>` — the exact
  W-PAGE-CHASSIS "label→heading re-key" arm batch 1 flagged, present across most
  of the category.

---

## (2) The 6 shared-chassis defects — all CONFIRMED apply to forms

**W-HEADER-SCALE — CONFIRMED.** Live `getComputedStyle(.story-hero-title)` on
`/forms/inputs` = **109.664px** (`text-display-5`). The "Inputs"/"Slider" `<h1>`
fills the top viewport and buries the controls below the fold (screenshot-
confirmed both light `/forms/inputs` and dark `/forms/slider`). Same chassis
edit fixes all 12.

**W-PAGE-CHASSIS (header rule) — CONFIRMED.** `--story-header-rule` is `(unset)`
at `:root`; the chrome `<header>` computes `border-bottom: 0px`. No header→body
separator on any forms page. The in-BODY `.story-sections--delimited` hairlines
DO paint (visible between Default / With label / With error on inputs) — so the
inter-section seam works, only the header→body rule is missing.

**W-PAPER-MORPHISM — N/A by category, but relevant.** Forms maps to `grid`
(`manifest.ts:184`), NOT `paper`, so the paper-grain register is not expected
here. The grid blueprint wash IS the forms background by design
(`manifest.ts:166`). No paper-grain miss to fix on forms specifically (it is a
foundations/display/feedback concern). Flagging only so the chassis fix is not
mis-applied to forms.

**W-STICKY-TITLE-CONDENSE — CONFIRMED.** `.story-hero-shrink` is present on the
chassis header but has no backing/scrim bar — the same no-backing-bar occlusion
batch 1 measured. The forms-specific aggravator: the DUPLICATE in-card header
means there are TWO descriptor blocks that both want to be the title region (the
chassis title + the hand-rolled forms-stop-3 eyebrow) — the condense must
subsume cleanly given the duplication is removed (§2-DUP below).

**W-PAGE-BACKGROUND — CONFIRMED, and this is the category headline.** The form
controls ARE glass atoms. `.input-pill` reads a real `backdrop-filter:
blur(8px) saturate(1.35) brightness(1.16)` and `--control-surface-bg` (live-
measured) — the glass register IS wired correctly at the component. BUT forms →
`grid` → `StoryHero` resolves `cardTier: resting` (live-confirmed) over a flat
`grid-bg` (`position: fixed; inset: 0; z-index: -5`, live-confirmed) — there is
NOTHING LIVE behind the controls to blur, so the glass blur is IMPERCEPTIBLE and
every field reads as a flat cream/charcoal pill. This is the user's "ALL GLASS
DEMOS [should be] glass over a live field" ask verbatim: the input/select/
combobox/textarea/number-field glass material does NOT read on a flat grid. The
chassis fix (a per-category live field, or the `tier="field"` glass-over-live-
field pattern) should reach the forms band so the glass register actually
demonstrates glass. NOTE: the controls are correctly glassy; the defect is the
BACKDROP, not the control.

**W-PRESET-RENDER / W-DOTFLOW — N/A.** No WebGPU preview/configurator/viz on any
forms page (those are substrates/configurator concerns). Forms is unaffected.

---

## (2-DUP) Category-systemic: the DUPLICATE in-card header

Live `/forms/slider` (screenshot): the chassis renders "FORMS · SLIDER" +
"Slider" + blurb "Two recipes…" at the TOP; then INSIDE the card the hand-rolled
`<header>` repeats the teal IconChip + "FORMS · SLIDER" eyebrow + a SECOND blurb
("Range selection with keep-dock-open…"). The page descriptor appears TWICE. The
chassis eyebrow (`Forms · Slider`) and the hand-rolled eyebrow (`Forms · Slider`)
are byte-near-identical; only the blurbs differ. This is the same triple/double-
header redundancy batch 1 flagged for aurora — present on 11/12 forms pages.
FIX direction: drop the hand-rolled in-card `<header>` and route the forms-stop-3
color identity (the IconChip + `--section-color-3` rail) into the chassis (e.g. a
`section`/`accent` prop on `StoryPage`/`StoryHeader`) so the ONE color event
survives without a second descriptor block — KISS/DRY, ONE chassis edit removes
11 hand-rolls.

---

## (3) Category-specific per-page bugs (the genuinely-per-page arm)

**G-CONTROL-1 — combobox trigger is on the RETIRED `glass-wash` gray fork
(`combobox.vue:73`).** The trigger hand-rolls
`class="glass-wash focus-ring flex h-10 w-full ... rounded-full ..."`. Per
CLAUDE.md §BA.W-SURFACE-AXIS scope 7, the control family was UNIFIED onto
`--control-surface-*` precisely because "Select rode the `glass-wash` gray — the
no-gray control-family seam." This combobox trigger is the last surviving
`glass-wash` control in the band — it will NOT read as the unified glass control
material (input/select/multi-select all read `.control-surface`/`.input-pill`).
It should compose the `.control-surface` register (or a real `<ComboboxInput>`/
button styled off the shared seam), not the gray fork. Concrete no-gray /
material-consistency bug.

**G-SECTION-2 — number-field has ZERO section affordance
(`number-field.vue:47, 114`).** Both sections are bare `<section class="grid
grid-cols-1 ...">` — no `StorySection`, no heading, no eyebrow. The two groups
("steppers" vs "label-binding channels") are indistinguishable; the page reads as
one undifferentiated grid of steppers. Worst affordance case in the category.
Re-key to `StorySection heading=`.

**G-SECTION-3 — slider/toggle/label all use raw `<p class="section-label">`
eyebrows, no `<h2>` (`slider.vue:64,76,99,…`; `toggle.vue:52,65,84,…`;
`label.vue:46,56,66,…`).** Section titles read as 14px-caption eyebrows BELOW
body weight (live: "STANDARD" / "VIZ-FOURIER FILL" on slider are tiny uppercase
captions, not headings). Re-key each to `StorySection heading=`.

**G-SECTION-4 — selectable-chip / toggle-chip use `StorySection label=` not
`heading=` (`selectable-chip.vue:50`, `toggle-chip.vue:59`).** They DO use the
chassis but pick the eyebrow rung instead of the heading rung — a one-prop
re-key (`label=` → `heading=`).

**G-FRAME-5 — hand-rolled card blocks bypass `ShowcaseFrame`.** `multi-select.vue:97`
(`rounded-card border border-border bg-card p-5`) + `label.vue:67`
(`rounded-card border border-border bg-card p-4`) hand-roll the showcase chassis
triplet `ShowcaseFrame` was minted to collapse. Minor DRY; re-point to
`<ShowcaseFrame>` (selectable-chip/toggle-chip already do).

**G-CONTROL-6 — inputs "With error" hand-rolls the destructive ring inline
(`inputs.vue:76`).** The errored input uses
`class="border-destructive focus:border-destructive focus:shadow-[0_0_0_2px_…]"`
inline instead of the shipped `aria-invalid` → `--invalid-ring` register
(CLAUDE.md §W-INVALID-RING: "Every form-control surface reads `box-shadow:
var(--invalid-ring)`"). The `.input-pill` already paints the invalid ring off
`aria-invalid="true"` (which the markup also sets on line 75), so the inline
respell is redundant AND drifts from the token — it should rely on the
`aria-invalid` register, not a hand-rolled `shadow-[…]`. (This is exactly the
respell the `proof:input-invalid-aria` anti-evasion bite forbids in src/; it
lives in a demo here, but it mis-teaches the register.)

**No broken/mis-rendered controls found.** Every control RENDERS (sliders,
steppers, selects, checkboxes, switches, chips all paint and are interactive in
the live capture). The control-level glass register (`.input-pill` /
`.control-surface`) reads correctly at the component; its only failure is the
imperceptible-blur-over-flat-grid backdrop (W-PAGE-BACKGROUND, §2).

---

## Fix routing (most are ONE chassis edit)

- W-HEADER-SCALE → all 12, chassis.
- W-PAGE-CHASSIS rule → all 12, chassis.
- W-STICKY-TITLE-CONDENSE → all 12, chassis (depends on §2-DUP first).
- W-PAGE-BACKGROUND → forms band gets a live field / `tier="field"` so the glass
  controls read (the category headline).
- §2-DUP duplicate header → ONE chassis edit removes 11 hand-rolls (route the
  forms-stop-3 identity into the chassis).
- §3 per-page: G-CONTROL-1 (combobox glass-wash) + G-SECTION-2/3/4 (label→heading
  re-key, 9 pages) + G-FRAME-5 + G-CONTROL-6 — the genuinely-per-page arm.

---

## 5-LINE VERDICT
1. DRY HOLDS for the audacious header (chassis-owned, zero hand-roll) so W-HEADER-SCALE + W-PAGE-CHASSIS-rule land for free on all 12; BUT 11/12 pages hand-roll a SECONDARY in-card `<header>` that DUPLICATES the chassis descriptor (the teal forms-stop-3 IconChip block) — one chassis edit (route the color identity in) removes 11 hand-rolls AND kills the double-header.
2. All applicable chassis defects CONFIRMED: header 109.7px (live), `--story-header-rule` unset / `border-bottom:0px` (live), `.story-hero-shrink` no backing bar; W-PAPER-MORPHISM + W-PRESET-RENDER + W-DOTFLOW are N/A to forms (grid band, no viz/preview).
3. CATEGORY HEADLINE = W-PAGE-BACKGROUND: the form controls ARE glass atoms (`.input-pill` reads real `backdrop-filter: blur(8px)…` + `--control-surface-bg`, live-confirmed) but sit over a flat `grid-bg` (`fixed inset:0`, nothing behind to blur), so the glass register is IMPERCEPTIBLE — every field reads flat; the glass-over-live-field / `tier="field"` pattern must reach forms.
4. SECTIONING is inconsistent (only inputs/textarea/checks use `StorySection heading=`; 9 pages are eyebrow-caption-only or raw unlabeled `<section>`, number-field has ZERO affordance) — a per-page `label→heading` re-key (W-PAGE-CHASSIS section arm).
5. ONE real control bug: combobox trigger still on the retired `glass-wash` gray fork (`combobox.vue:73`) instead of the unified `.control-surface` register — plus inputs' inline destructive-ring respell (`inputs.vue:76`) that should ride the `--invalid-ring` `aria-invalid` register; no broken/mis-rendered controls otherwise (all paint + interact).
