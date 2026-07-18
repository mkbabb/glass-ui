# BJ redress dossier — F11 through F20 (Fable seat)

Per-row inventory / isolation / target / post-mortem / redress / status-check for feedback-ledger
rows **F11-F20**, the user's 2026-07-17 corpus. Every screenshot in range was read first-hand
(F11/F12/F15/F17 have PNGs; F13/F14/F16/F18/F19/F20 are URL-anchored, no screenshot). Correlations
are verified against live `src/` + `demo/` at HEAD (`package.json` 7.0.0, `git describe`
v6.0.0-62-g65c28be1), and reconciled against the formation corpus
(`ASSEMBLY-CROSSWALK.md`, `REGISTRY.md`, the band specs, the perfection docs, `CHRONIC-ADJUDICATION.md`,
`ADJUDICATION-1.md`). No `src/`/`demo/` byte is touched by this dossier.

Convention: file paths absolute-from-repo-root; `crosswalk` = `../ASSEMBLY-CROSSWALK.md`.

---

## F11 — no gap between grouped configurator items

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:23`): *"There should be no gap between items like
this."* Screenshot: `../../feedback/F11-item-gap.png`.

**ISOLATION (first-hand read).** The image shows three stacked full-bordered glass cards —
`Color · seed · harmony · palette`, `Composition · medium · zones`, `Motion · …` — each a
rounded rectangle with its own border and a right-edge chevron, separated by a visible ~8px vertical
gutter. They read as three DETACHED cards, not one continuous inset grouped list. The user's mark is
on that inter-card gutter: sibling sections inside one configurator should read as one grouped body
(iOS grouped-list grammar), with the gap reserved to BETWEEN groups.

**TARGET.**
- Demo site: `demo/stories/substrates/aurora/AuroraConfigDock.vue:267-296` — the eight
  `<ConfiguratorLayer label="Color|Composition|Motion|…">` sections (this is the exact "Aurora
  studio" stack the screenshot frames; the subtitles `seed · harmony · palette` / `medium · zones` /
  `drift · breath` match `:267/:274/:278` verbatim).
- Src fault (canon-level): `src/components/configurator/styles.css:25`
  (`--configurator-section-gap: 0.5rem`) applied at `:114-118`
  (`.configurator-layer + .configurator-layer { margin-block-start: var(--configurator-section-gap); }`).
  The section card itself is rendered by `src/components/configurator/ConfiguratorLayer.vue:132`
  (`.configurator-section-label`) with a concentric all-side card border (`styles.css:104-118`).

**POST-MORTEM.** Unenforced-proportion / deliberate-idiom-mismatch. The gap is not a bug in the
mechanical sense — it was authored on purpose (`styles.css:114` comment: "the inter-section card
breath … replacing the retired flush `border-b last:border-b-0` divider"). The team deliberately
moved FROM a flush hairline-divided list TO detached bordered cards with breath between them, and
that redesign chose the wrong iOS idiom: iOS groups sibling rows into ONE inset card and puts the
gap between GROUPS, not between rows. There is no proportion canon that says "rows inside a group are
flush," so the authored breath shipped uncontested.

**REDRESS.** Owned EXACTLY by `BJ.W-CONFIGURATOR-STD` gate **G-CFG-3** (BAND-STORY W3,
`../../waves/BAND-STORY.md:242,267`): "sibling rows within a group read as one INSET grouped-list (no
inter-row gap); the gap is BETWEEN groups only." The perfection fold pins the exact cure —
neutralize/re-scope the `.configurator-layer + .configurator-layer` margin at `styles.css:117` — under
the same G-CFG-3 owner (`../../waves/BAND-STORY.md:267`, "inter-ROW gap = 0 within a group; the gap is
BETWEEN groups"). F11 is additionally MARKED (not fixed) by `BJ.W-ARISTOTLE-PROPORTION`
(BAND-MATERIAL W5, `../../waves/BAND-MATERIAL.md:478-479`) as a proportion-roster entry that routes
to this same story owner. Coverage: **EXACT** — the cure targets the precise token+rule, on the
precise component, driving the precise screenshot.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:33`). **AGREE** — the fix is a single
role-scoped margin rule on the component the screenshot proves, with a dual owner (story fix + A10
mark) already reconciled.

---

## F12 — /data/tags-input container "not rounded"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:24`): *"`/data/tags-input` — these containers
aren't rounded."* Screenshot: `../../feedback/F12-tags-input-unrounded.png`.

**ISOLATION (first-hand read).** The image shows a `Skills` field: an outer full-width container
holding four pill chips (`Vue`, `TypeScript`, `Tailwind`, `reka-ui`, each with an ✕) plus an
`Add skill…` placeholder, over the caption `4 SKILLS · ENTER TO ADD, BACKSPACE TO REMOVE LAST`. The
CHIPS are correctly stadium-rounded; the user's complaint is the OUTER container, whose corners read
tight/near-square against the wide box — the "pill chips inside a near-rectangle container"
incoherence (`../VISUAL-GESTALT.md:11`).

**TARGET.**
- Demo site: `demo/stories/data/tags-input.vue:52` (`<Label for="skills-input">Skills</Label>` +
  the reka `TagsInputRoot`, prefilled at `:16`).
- Src: `src/components/tags-input/styles.css:8` — container `border-radius: var(--radius-field)`;
  `:61` — chips `border-radius: var(--radius-control)`. Token resolution (`src/styles/theme/radius.css`):
  `--radius-field` → `--radius-2xl` = `1rem`/16px (`:46,:21`); `--radius-control` → `--radius-pill`
  (`:66`).

**POST-MORTEM.** Screenshot-vs-disk DRIFT (an already-partly-cured defect), not a live fault. On
disk today the container is role-correct: `--radius-field` (16px) container + `--radius-control`
(pill) chips — exactly the role grammar the canon wants. The screenshot reads tighter than 16px,
which means either the PNG predates the `--radius-field` repoint, or 16px reads subtle on a very wide
short box. The underlying enforceability gap is real (there was no gate pinning the container to a
role token, so it COULD drift), but the current bytes are correct — the honest posture is verify,
then pin, not re-fix.

**REDRESS.** Owned by `BJ.W-RADIUS-ROLE` (BAND-MATERIAL W1) under **RULING 8**
(`ADJUDICATION-1.md:33` + `../../waves/BAND-MATERIAL.md:124-142`), converted by the lead amendment
(`../../waves/BAND-MATERIAL.md:667-669`) and crosswalk reconciliation item 5 (`crosswalk:227-229`)
from a born-RED fix to a **REGRESSION-GUARD**: `OPEN-1a` runs a live-π on `/data/tags-input`,
confirms role-correct, then the role assertions pin the container to `--radius-field` + chips to
`--radius-control` against re-drift. Coverage: **EXACT** — the plan-as-formed already anticipates the
drift and cures it precisely (guard, not spurious re-fix); no residue.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:34`, "MATERIAL W1 owns if live-π
reproduces"). **AGREE** — with the standing caveat, already recorded in the crosswalk, that the live-π
is the gate that decides fix-vs-guard; disk says guard.

---

## F13 — /data/sortable-list better design + horizontal space

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:25`): *"`/data/sortable-list` — Needs better design
and better horizontal use of space."* **URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** `demo/stories/data/sortable-list.vue` stacks its rows in
`flex flex-col gap-2` vertical columns (`:69,:109`) with `rounded-md` bordered item rows
(`:76,:117`), and its comparison block uses `grid grid-cols-1 gap-4 md:grid-cols-3` (`:143`). On a
wide desktop the single vertical stack leaves the right two-thirds of the column empty — the
"horizontal-waste" class. "Better design" additionally implicates the item-row treatment (a plain
`rounded-md` bordered strip with a `⋮⋮`/`GripVertical` handle) and the reorder affordance itself.

**TARGET.**
- Demo site: `demo/stories/data/sortable-list.vue:69,:109` (vertical `flex-col` stacks), `:143`
  (`grid-cols-1 md:grid-cols-3`), `:76,:117` (item-row `rounded-md` cards + drag handle).
- Src: `src/components/sortable-list/` (the reorder engine; not the fault — the fault is the demo
  composition + the drag-affordance expressiveness).

**POST-MORTEM.** Story-authorship gap: the page was hand-rolled with ad-hoc Tailwind
flex/grid rather than dogfooding a responsive shipped layout, so the wide-desktop column was never
laid out for horizontal use. Compounded by the absence of a responsive-audit discipline — no wave
existed to catch a page that crushes/wastes at a given viewport, so the flat vertical stack shipped
uncontested.

**REDRESS.** Horizontal-space + dogfooding owned EXACTLY by `BJ.W-RESPONSIVE-AUDIT` (BAND-STORY W6),
which names sortable-list as a born-RED anchor: **G-RSP-1** (`../../waves/BAND-STORY.md:466`,
`grep flex-col … → :69,:109`) and **G-RSP-3** (`:468`, the @1440px horizontal-waste class), with the
"dogfood a shipped component" fix mandate (`:451`). Residue: the ledger's "better DESIGN" is broader
than "better horizontal use" — the item-row visual treatment is caught by the A10 proportion roster
(`BJ.W-ARISTOTLE-PROPORTION`), but the **reorder/drag affordance expressiveness** (a sortable list
should visibly express grab/lift/drop under the breath-of-life edict) has NO named owner in the
sortable-list context. Coverage: **PARTIAL** — horizontal + dogfood EXACT; the drag-affordance half
of "better design" is the uncovered residue.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:35`, RESPONSIVE-AUDIT). **AGREE** on the
horizontal landing; the "better design" residue (drag affordance) is the appendable delta below —
not a status disagreement, a scope sliver.

---

## F14 — audit ALL pages: horizontal-desktop + mobile-first

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:26`): *"Audit ALL pages for optimized horizontal
usage on desktop + proper mobile-first affordances. Idiomatic gestalt approaches, no legacy, clean
breaks. Dogfood our own components to afford this."* **URL-anchored (all pages), no screenshot.**

**ISOLATION (from ledger + live code).** This is a cross-cutting standing audit, not a single defect.
The live evidence that it is warranted: the F13 sortable-list stack, the fixed non-fluid landing grid
(`SectionLanding.vue:33` / `CatalogLanding.vue:32` `grid-cols-1/2/3`, no masonry/fluid), and the ~23
bespoke-`<style>` route SFCs with fixed widths that do not reflow at 390px (census). No prior wave
governed per-page responsiveness, so breakages were only ever caught by eye.

**TARGET.** All 100 navigable routes (1 catalog home + 11 section landings + 88 story routes) — the
audit surface, not one file. Named born-RED anchors carried into the wave:
`demo/stories/data/sortable-list.vue` (F13), the landing grid (Wave-5 target), and the bespoke-CSS
SFCs enumerated at the two governing viewports (390px, ≥1440px).

**POST-MORTEM.** Absent discipline: the repo shipped 100 story routes with per-page ad-hoc layout and
no responsive-audit gate, so mobile-first + horizontal-desktop were never systematically enforced —
exactly the "no wave owns the cross-cutting concern" class the registry seed lens caught (F14 was one
of the 10 rows the gestalt seed omitted, `REGISTRY.md:7`).

**REDRESS.** Owned EXACTLY by `BJ.W-RESPONSIVE-AUDIT` as a FIRST-CLASS wave (BAND-STORY W6,
`../../waves/BAND-STORY.md:420-489`): a per-page audit table (`page → breakage@viewport → fix →
DELTA`), gates G-RSP-1/2/3, dogfood-over-bespoke fix mandate, Playwright @390px + @1440px captures
serialized against other browser seats. AMEND-2 corrects the scope to the **100 routes**, not the 128
file count (`:436-438`). Coverage: **EXACT** — the ask is a first-class wave with the same
evidence-first table discipline as the reduction ASK.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:36`). **AGREE** — the ask became its own wave
rather than being absorbed, which is the correct weight for an "audit ALL pages" order.

---

## F15 — /data/infinite-scroll reset button unrounded + grand rounding/typography audit

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:27`): *"`/data/infinite-scroll` reset button not
rounded. **Grand rounding/border-radius audit + typography audit.**"* Screenshot:
`../../feedback/F15-reset-button-unrounded.png`.

**ISOLATION (first-hand read).** The image shows the Infinite Scroll page header (`Infinite Scroll`
title + descriptor + `INFINITE SCROLL / Event feed` eyebrow) with a `Reset` button at the right. The
button is a near-rectangular pill with only a slight corner radius (reads ~6px) — under-rounded for a
control that the role grammar wants as a stadium/control-radius button. The screenshot also
incidentally exhibits the mono ALL-CAPS eyebrow idiom (`INFINITE SCROLL`) that the typography half of
the ask targets.

**TARGET.**
- Demo site: `demo/stories/data/infinite-scroll.vue:74` — `<button … class="interactive-item
  rounded-md border … px-3 py-1.5 text-small …">Reset</button>` (`rounded-md` = 6px, verified; the
  panel below at `:89` correctly uses `rounded-card`).
- Grand rounding: the canon at `src/styles/theme/radius.css` (role table) + the raw-literal sites
  `src/components/sortable-list/SortableList.vue:144` (`999px`) and
  `src/components/tabs/styles/segmented.css:169,:306` (raw rem).
- Grand typography: the unreset Tailwind ramp (`src/styles/theme/bridges.css`, `--text-*: initial`
  absent) + the 251 `text-sm`/`text-xs` sites + the mono-caption idiom (65/128 pages).

**POST-MORTEM.** Unenforced token canon on two axes. Radius: a rich role vocabulary exists
(`radius.css:31-95`) but nothing lints raw Tailwind radius utilities, so a demo author reached for
`rounded-md` instead of a control role class and it read near-square. Typography: the `@theme` bridge
only ADDS √φ rungs and never RESETS Tailwind's built-in ramp, so `text-sm`/`text-xs` silently bypass
the fluid scale — no lint could work until the ramp is cleared (`REGISTRY.md:235-240`). Both are the
"systems exist, are not enforceable" verdict of family F.

**REDRESS.** Three owners, all present:
- Reset button (born-RED, verified): `BJ.W-RADIUS-ROLE` §D F15 (`../../waves/BAND-MATERIAL.md:134`:
  "F15 reset RED at HEAD: infinite-scroll.vue:74 `rounded-md` … GREEN on the control role class").
- Grand rounding audit: the whole `BJ.W-RADIUS-ROLE` (role-table canon + raw-literal repoints) +
  `BAND-GATES` W3 `token-hygiene` lint born-RED against the raw sites.
- Grand typography audit: `BJ.W-TYPE-CODEMOD` (BAND-MATERIAL W6, the 251-site codemod + coupled
  default-ramp reset) + `BAND-GATES` W4 `type-hygiene` (born-RED) + the round-2 typography lens
  census. Crosswalk (`crosswalk:37`) routes typography to `BJ.W-TYPE-CODEMOD`/`BJ.W-RAMP-RESET`.
Coverage: **EXACT** — the point defect, the grand rounding audit, and the grand typography audit each
have a named owner with a born-RED anchor.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:37`). **AGREE** — the two "grand audit" halves
are not hand-waved; each is a real wave (RADIUS-ROLE + TYPE-CODEMOD) with enforcement in BAND-GATES.

---

## F16 — /data/timeline redesign from the ground up

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:28`): *"`/data/timeline` — Very poorly defined,
buggy, likely many facilities overfit. **Redesign from the ground up.**"* **URL-anchored, no
screenshot.**

**ISOLATION (from ledger + live code).** The timeline is a sprawling multi-variant family with no
single coherent identity: `src/components/timeline/` ships six SFCs — `GlassTimeline.vue`,
`ContinuousTimeline.vue`, `ScrubberTimeline.vue`, `SegmentedTimeline.vue`, plus the
`ContinuousRail.vue` + `ContinuousMarkers.vue` sub-parts (~1500 LOC). The demo
(`demo/stories/data/timeline.vue`) renders three of them (`GlassTimeline` scrubber `:5,:91`,
`TimelineSegmentedBody` `:14,:184`, `TimelineContinuousBody` `:15,:188`) with a bespoke event model.
The user's read — poorly defined, buggy, overfit — targets the whole family, not one line.

**TARGET.**
- Demo site: `demo/stories/data/timeline.vue:5,:14,:15` (the three rendered variants).
- Src: the `src/components/timeline/` family (all five variants + shared rail/markers). Consumer
  fact: single-EXTERNAL consumer (speedtest `PhaseTimeline.vue:49`) — fails the ≥2-consumer bar AND
  is a named ground-up target.

**POST-MORTEM.** Overfit accretion + single-consumer bloat: five timeline variants grew to serve one
external app's phase-progress needs, never converged to an opinionated default, and accumulated
overfit facilities (the "many facilities overfit" verdict). Patching it would preserve the disease;
the user ordered ground-up, so a prop-diet is the wrong instrument.

**REDRESS.** Owned by `BJ.W-REDUCE-TIMELINE` (BAND-REDUCTION W5) as a **STUB → design-loop**
(`../../waves/BAND-REDUCTION.md:432-476`): it records the F16 disposition (ground-up, not prop-diet)
and the single-external-consumer fact, then hands the actual redesign to the design-loop charter
(brainstorm-3 → golden → challenge-3 → delta → wave-amendment, Fable + DesignSync). The scope is
bound by **amendment A2** (perfection FABLE-DAG-REDUCTION §4, `../../waves/BAND-REDUCTION.md:524`):
"W5 timeline scope = ALL FIVE variants named (~1500 LOC family)" — so the redesign spans the whole
family, not just the demoed three. Coverage: **EXACT** — a ground-up order is correctly discharged as
a chartered design-loop stub (the honest disposition; a wave cannot pre-draw the golden), with the
five-variant scope explicitly bound.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:38`). **AGREE** — a "redesign from the ground
up" that landed as a design-loop stub with an explicit A2 five-variant scope is the correct weight;
the born-RED lives in the loop's captured baseline, not a premature gate here.

---

## F17 — /data/search input boxes "not rounded"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:29`): *"`/data/search` — input boxes are not
rounded."* Screenshot: `../../feedback/F17-search-inputs-unrounded.png`.

**ISOLATION (first-hand read).** The image shows the `Live search` section: a large translucent panel
with two stacked search inputs — `Search components, composables,` (with a magnifier glyph) and
`Jump to a component…` — above an empty dashed-border results well (`Start typing above to rank the
catalogue by fuzzy score.`). Both inputs read with modest, roughly-equal corner radius; the enclosing
panel is fairly sharp-cornered. The user's mark ("input boxes are not rounded") points at the two
inputs (the VISUAL-GESTALT seed read them as "two adjacent search inputs with different radii, one
sharp", `../VISUAL-GESTALT.md:12`).

**TARGET.**
- Demo site: `demo/stories/data/search.vue:499` (`placeholder="Search components, composables,
  tokens…"`), `:506` (`placeholder="Jump to a component…"`).
- Src: `src/components/_shared/field-control.css:34` (base `border-radius: var(--radius-pill)`),
  `:47,:52` (`--radius-field` for single-line/modal inputs) — the search inputs carry no own
  `border-radius`; they ride `field-control`.

**POST-MORTEM.** Same class as F12 — screenshot-vs-disk DRIFT under an unenforced radius canon. The
inputs inherit `field-control`'s role radius (pill base, `--radius-field` for the modal single-line
arm), so on disk they are role-coherent, not "sharp." The seed's "different radii, one sharp" read
was the pre-repoint state; the divergence was a demo composition riding the shared control before the
`field-control` role rules unified single-line inputs. No gate pinned it, so the divergence could
exist — but the current bytes are role-correct.

**REDRESS.** Owned by `BJ.W-RADIUS-ROLE` (BAND-MATERIAL W1) under **RULING 8**, converted to a
**REGRESSION-GUARD** by the same lead amendment as F12 (`../../waves/BAND-MATERIAL.md:113-115,667-669`;
`crosswalk:227-229`): `OPEN-1a` live-π confirms the two inputs read the `field-control` role radius,
then the assertion pins them against re-drift. Coverage: **EXACT** — the plan already treats F17 as a
verify-then-pin guard, precisely matching the disk reality.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:39`, "MATERIAL W1 owns if live-π reproduces").
**AGREE** — the conditional is honest and the disk resolves it to a guard.

---

## F18 — instrument-chassis + metric TO BE REMOVED

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:30`): *"`/data/instrument-chassis`, `/data/metric` —
To be REMOVED — 'what of our grand pruning of overfit and superfluous components?'"* **URL-anchored,
no screenshot.**

**ISOLATION (from ledger + live code).** The user names two components for removal on an
overfit/pruning premise. Live: `src/components/instrument-chassis/` and `src/components/metric/` both
PRESENT (`demo/stories/data/instrument-chassis.vue`, `demo/stories/data/metric.vue`). The premise
(overfit / superfluous) is FALSE on the consumer census: instrument-chassis is imported by
speedtest×4 (`App.vue:257`, `useRouteTransition.ts:34`, `ChartsView.vue:132`, `MapView.vue:53`) +
muster×5; `metric-badge` (folded to `/metric` at 490cc46e) is imported across the whole
fourier-analysis repo (7 files) + speedtest×2 + muster×2 + sci-report×2 — the MOST-shared component
in the census (`ASK-REDUCTION.md:33-38`). So this is not a defect to fix but a removal instinct that
the evidence contradicts.

**TARGET.**
- Demo sites: `demo/stories/data/instrument-chassis.vue`, `demo/stories/data/metric.vue`.
- Src: `src/components/instrument-chassis/`, `src/components/metric/` (metric-pill already deleted at
  490cc46e; metric-badge/cell/stack are the shared surface).

**POST-MORTEM.** The `recap:recap-carry-unexecuted` DISEASE (family C / UF-K1). The user has ordered
this removal THREE times (F18, Q051 R12/R16, now BJ F18) and every consumer census has ruled the
components SHARED library surface across 3-4 apps. The mechanism is not a code fault — it is the
tranche machinery re-booking a decision the evidence keeps refusing. The honest cure is a terminal
DECISION with the costed break stated, not a fourth silent re-book or a blind delete that breaks ~4
apps on the bump.

**REDRESS.** Owned by `BJ.W-REDUCE-CROSSREPO-GATED` (BAND-REDUCTION W4,
`../../waves/BAND-REDUCTION.md:360-429`) as an **ASK-gated relay**, surfaced to the user as
`ASK-REDUCTION §A1` (`docs/tranches/BJ/ASK-REDUCTION.md:25-51`): ratify SHARED-KEEP (recommended — DP-A
census stands, the removal instinct is the disease) OR overrule and accept the costed multi-repo
break. `CHRONIC-ADJUDICATION.md:50-54` (UF-K1 third-ask) makes it a terminal confrontation with both
outcomes presented honestly; whatever the user rules is recorded so a fourth ask cannot re-open it.
Coverage: **EXACT (as a user-gated decision)** — the plan correctly refuses to auto-fix and hands the
removal-vs-keep to the user with the corrected consumer truth; no code residue.

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:40`). **AGREE** — a thrice-asked removal that the
census contradicts is exactly an ASK row, not a LANDED fix; auto-deleting it would BE the disease.

---

## F19 — /feedback/alert not glassy, rounded, or idiomatic

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:31`): *"`/feedback/alert` — Not properly glassy,
rounded, or idiomatic/Apple-like."* **URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** The Alert is a flat card-ish box that is neither glassy nor
card-rounded. Verified on disk: `src/components/alert/index.ts:8` `BASE` uses **`rounded-lg`** (8px) —
under the card-role radius (`--radius-card` = 16px), so it reads under-rounded; and every tone in
`TONE` (`:11-18`) sets **`[backdrop-filter:var(--glass-blur-wash)]`** — the `wash` rung is 1px
(sub-perceptual per the blur ladder), so the alert is effectively NOT glassy. The border is a single
uniform `border` (no rim asymmetry). All three of the user's terms — not glassy (`blur-wash` 1px), not
rounded (`rounded-lg` 8px), not idiomatic (flat uniform border, no iOS rim/type grammar) — are
literally true on disk.

**TARGET.**
- Src fault: `src/components/alert/index.ts:8` (`BASE` `rounded-lg`) + `:11-18` (`TONE` all
  `[backdrop-filter:var(--glass-blur-wash)]`); consumed by `src/components/alert/Alert.vue:37`.
- Demo site: `demo/stories/feedback/alert.vue` (the tone specimens at `:42,:49,…`).

**POST-MORTEM.** Authorship gap under an unenforced material canon — the Alert was never wired to the
role tokens the rest of the glass family uses. `rounded-lg` is a raw Tailwind literal (not
`--radius-card`), and `--glass-blur-wash` (1px) is the wrong rung for a first-class surface (a card or
overlay wants `quiet`/`resting` 7px). Because no gate asserts an alert-specific paint (radius = card,
backdrop = role rung), it shipped as a plain bordered box while calling itself glass. It was also the
lone family-F "alert straggler" the crosswalk's first pass left un-waved (`crosswalk:41-42`).

**REDRESS.** Owned by `BJ.W-ALERT-IDIOM` (BAND-FEEDBACK-MOTION W4,
`../../waves/BAND-FEEDBACK-MOTION.md:72-82`), drafted at the ASSEMBLY orphan-cure: Alert consumes the
card-role radius from `BJ.W-RADIUS-ROLE` + the role blur rung from `BJ.W-BLUR-LADDER`, the codex law-3
rim treatment (bright top rim, quiet sides — not a uniform border), and the law-10 type ladder inside;
it runs AFTER Material W1/W2. Born-RED gate (a) — "radius equals the card-role token, backdrop carries
the role's blur rung — RED at HEAD where alert is neither" — matches the disk exactly (`rounded-lg` +
`blur-wash`). Coverage: **EXACT** — the wave's born-RED is verifiably true at HEAD and its cure
addresses all three complaint axes. `OPEN-FM-2` (status-tinted material vs neutral glass) is routed to
the BJ ASK as the one identity call.

**STATUS CHECK.** Crosswalk flag: **ORPHAN** in the primary table (`crosswalk:41`) → **LANDED** by the
lead reconciliation (`crosswalk:213-216`, `F19 → BJ.W-ALERT-IDIOM`). **AGREE with LANDED** — the band
file exists and owns it with a disk-true born-RED; the table flag is superseded by the reconciliation.

---

## F20 — /feedback/toast animation "awful"; should equal the refined dialog

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:32`): *"`/feedback/toast` — Animation is awful;
should be exactly like our refined dialog."* **URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** The toast's motion was the complaint. On disk it has ALREADY
been re-homed onto the shared `.glass-reveal` liquid-enter engine:
`src/components/toast/Toast.vue:82-103` composes `glass-reveal` with the **transient** register
(center-seed bloom, scale-from ~0.5, decongest-blur, gentle transient spring, MOTION-LADDER M5), and
`src/styles/transitions.css:89-110` documents that the old reka `slide-in-from-*-full`/`fade-out-80`
chain + the toast's own `transition-[opacity,transform]` are RETIRED. The dialog center content rides
the SAME engine but a DIFFERENT register: `src/components/dialog/DialogContent.vue:235`
(`glass-reveal`), `:458` (`data-reveal="overlay"`, scale-from 0.94, `src/styles/glass/reveal.css:57`),
or the JS `centerSpringActive` spring (`DialogContent.vue:100-117`). So the "awful slide" the user saw
is almost certainly already gone; what remains is a REGISTER divergence — toast `transient`
(scale-from-0.5) vs dialog `overlay`/center-spring (scale-from-0.94) — not a bespoke toast curve.

**TARGET.**
- Src fault (residual divergence): `src/components/toast/Toast.vue:82-103` (transient register) +
  `src/styles/transitions.css:89-110` (the toast contract) vs `src/components/dialog/DialogContent.vue:235,458,100-117`
  (the dialog register/spring).
- Demo site: `demo/stories/feedback/toast.vue`.

**POST-MORTEM.** Experiment-in-flight vs stale-baseline. The toast was mid-refinement: the team
already retired the reka slide-in and moved the toast onto the shared reveal engine, but chose the
`transient` register — deliberately gentler/smaller than the dialog's `overlay`. The user's "should be
exactly like our refined dialog" targets that remaining register gap, but the ledger verdict ("awful")
was written against the RETIRED slide-in state, so a wave that takes the verdict literally would author
a born-RED against a curve that no longer exists.

**REDRESS.** Owned by `BJ.W-TOAST-DIALOG-PARITY` (BAND-FEEDBACK-MOTION W1,
`../../waves/BAND-FEEDBACK-MOTION.md:30-41`): re-home Toast onto the dialog spring/transition contract
(shared `springPreset`, origin-anchored entry, staggered inner content, matched exit); born-RED gate
(a) asserts toast enter/exit resolve to the SAME spring tokens the dialog resolves. The charter is
right and the register divergence IS a real, testable born-RED. Residue: the gate's framing ("toast
carries its own curve") is stale against the disk — the toast already shares the reveal engine, so the
wave's real work is register PARITY, not a from-scratch re-home, and its π baseline must capture the
CURRENT transient toast, not the retired slide. Coverage: **PARTIAL** — the owner and cure are right;
the uncovered residue is baseline currency (the same screenshot-vs-disk drift MATERIAL W1 handled for
F12/F17 via OPEN-1a), plus `OPEN-FM-1` (does the register unify to the dialog's, or does the toast keep
a distinct-but-parity-tokened transient?) needs deciding against this disk reality.

**STATUS CHECK.** Crosswalk flag: **ORPHAN** in the primary table (`crosswalk:42`) → **LANDED** by the
lead reconciliation (`crosswalk:213-216`, `F20 → BJ.W-TOAST-DIALOG-PARITY`). **AGREE with LANDED**;
disagree only with the wave's born-RED FRAMING (not its ownership) — the toast no longer carries its
own curve, so W1 should convert gate (a) to a live-π-confirmed register-parity guard, per the delta
below.

---

## Coverage summary

| Row | ask (compressed) | terminal owner | coverage | delta count |
|-----|------------------|----------------|----------|-------------|
| F11 | configurator inter-item gap | `BJ.W-CONFIGURATOR-STD` G-CFG-3 (+ A10 mark) | **EXACT** | 0 |
| F12 | tags-input container radius | `BJ.W-RADIUS-ROLE` (RULING 8 → guard) | **EXACT** | 0 |
| F13 | sortable-list design + horizontal | `BJ.W-RESPONSIVE-AUDIT` G-RSP-1/3 | **PARTIAL** | 1 |
| F14 | audit ALL pages responsive | `BJ.W-RESPONSIVE-AUDIT` (first-class) | **EXACT** | 0 |
| F15 | reset unrounded + grand rounding/type | `BJ.W-RADIUS-ROLE` + `BJ.W-TYPE-CODEMOD` | **EXACT** | 0 |
| F16 | timeline ground-up redesign | `BJ.W-REDUCE-TIMELINE` (stub → design-loop, A2) | **EXACT** | 0 |
| F17 | search inputs radius | `BJ.W-RADIUS-ROLE` (RULING 8 → guard) | **EXACT** | 0 |
| F18 | instrument-chassis + metric REMOVE | `BJ.W-REDUCE-CROSSREPO-GATED` + ASK §A1 | **EXACT (decision)** | 0 |
| F19 | alert not glassy/rounded/idiomatic | `BJ.W-ALERT-IDIOM` (BAND-FEEDBACK-MOTION W4) | **EXACT** | 0 |
| F20 | toast animation ≡ refined dialog | `BJ.W-TOAST-DIALOG-PARITY` (BAND-FEEDBACK-MOTION W1) | **PARTIAL** | 1 |

**Totals: EXACT 8 / PARTIAL 2 / MISSING 0** (F18 counted as EXACT-decision). Delta count: **2**.

## Proposed deltas (appendable form)

**Δ-F13-1 (residue — sortable-list "better design").** In `BJ.W-RESPONSIVE-AUDIT` (BAND-STORY W6),
the sortable-list anchor (`../../waves/BAND-STORY.md:442-445`) covers horizontal-space + dogfooding
only; the ledger's "better DESIGN" also implicates the reorder/drag affordance (grab/lift/drop
expressiveness), which no wave owns in the sortable-list context. Append one cross-ref: route the
sortable-list drag affordance to `BI.W-ENGAGE-AFFORD`'s per-component scope (breath-of-life engagement
edict), OR name "dogfood a shipped sortable/reorder affordance" explicitly in the responsive-audit fix
mandate — so "better design" is not silently reduced to "better horizontal use." (Low-stakes scope
sliver, not a status disagreement.)

**Δ-F20-1 (residue — stale born-RED baseline).** In `BJ.W-TOAST-DIALOG-PARITY` (BAND-FEEDBACK-MOTION
W1) gate (a), the born-RED "toast carries its own curve" is stale: `Toast.vue:82-103` +
`transitions.css:89-110` already re-homed the toast onto the shared `.glass-reveal` engine (the reka
slide-in is RETIRED). Append a live-π/disk-drift precondition mirroring `BAND-MATERIAL` W1 `OPEN-1a`:
(1) capture the CURRENT transient-register toast as the baseline, not the retired slide; (2) reframe
the wave's work as register PARITY — transient (`scale-from ~0.5`) vs the dialog `overlay`
(scale-from 0.94, `reveal.css:57`) / `centerSpringActive` spring (`DialogContent.vue:100-117`); (3)
decide `OPEN-FM-1` against this disk reality (unify the toast onto the dialog register, or keep a
distinct-but-same-spring-token transient). Convert gate (a) from a from-scratch born-RED to a
verify-then-pin parity guard.
