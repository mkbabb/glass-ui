# BJ redress dossier — F11 through F20 (unioned canon)

verified-model: claude-fable-5 (REFABLE RU-13 true run, 2026-07-18)
union-provenance: twice-unioned — the prior pass (and its fable-5 self-stamp) was begat under the claude-opus-4-8 settings override the census incident exposed; this is the true-Fable run: a fresh ANEW pass at HEAD (ced045d1) re-proved every claim against primary sources, overturned the prior F16 isolation layer (the facade truth), sharpened F12/F15, and ratified the rest. Verdict sidecar: `../refable/REFABLE-RU-13-F11-F20.md`.

Per-row inventory / isolation / target / post-mortem / redress / status for feedback-ledger rows
**F11-F20**, the user's 2026-07-17 corpus. Screenshots F11/F12/F15/F17 read first-hand from
`../../feedback/`; F13/F14/F16/F18/F19/F20 are URL-anchored. Correlations verified against `src/` +
`demo/` at HEAD and reconciled against the bands as amended by `JUDGE.md` (J1-J11 applied per
`APPLYLOG.md`). Claims only live paint can settle are marked **LIVE-DEFER** — the demo server is not
assumed up. No `src/`/`demo/` byte is touched by this dossier.

Convention: paths repo-root-relative; `crosswalk` = `../ASSEMBLY-CROSSWALK.md`.

---

## F11 — no gap between grouped configurator items

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:23`): *"There should be no gap between items like
this."* Screenshot: `../../feedback/F11-item-gap.png`.

**ISOLATION (first-hand read).** Three stacked full-bordered glass cards — `Color · seed · harmony ·
palette`, `Composition · medium · zones`, `Motion · …` — each a rounded rectangle with its own border
and right-edge chevron, separated by a visible ~8px gutter. They read as detached cards, not one
continuous inset grouped list. The sub-labels match `AuroraConfigDock.vue:267/:274/:278` verbatim —
the correlation is definitive.

**TARGET.**
- Demo site: `demo/stories/substrates/aurora/AuroraConfigDock.vue:267-296` — the seven
  `<ConfiguratorLayer>` sections of the Aurora studio column.
- Src fault (canon-level): `src/components/configurator/styles.css:25`
  (`--configurator-section-gap: 0.5rem`) applied at `:117-119`
  (`.configurator-layer + .configurator-layer { margin-block-start: … }`); the per-section CARD
  border + concentric radius at `:92-112`, rendered by
  `src/components/configurator/ConfiguratorLayer.vue:88-107`.

**POST-MORTEM.** Deliberate-idiom-mismatch, and dated: the card+gap treatment landed 2026-07-13 at
BI B1 (`ff69acd9`, "configurator sections read as concentric CARDS … inter-section gap") — the
styles.css comment confirms it replaced "the retired flush `border-b last:border-b-0` divider." The
user's screenshot was captured against exactly this treatment four days later: the Law-2 card grammar
was minted from internal reasoning and shipped user-unvalidated; the user saw the result and rejected
the gap. iOS groups sibling sections into ONE inset card with hairline seams and reserves the gap for
BETWEEN groups.

**REDRESS.** Owned EXACTLY by `BJ.W-CONFIGURATOR-STD` gate **G-CFG-3** (BAND-STORY W3,
`../../waves/BAND-STORY.md:242,267`): inter-row gap = 0 within a group; the gap is BETWEEN groups
only; DELTA shows one inset grouped list. The cure targets the precise rule (`styles.css:117`).
Additionally MARKED by `BJ.W-ARISTOTLE-PROPORTION` (BAND-MATERIAL W5, `:507`) as a proportion-roster
entry routing to the same story owner. Note the tension is with BI B1's Law-2 premise itself, not
with any BJ band — the BJ formation already sides with the user. Coverage: **EXACT**.

**STATUS.** Crosswalk **LANDED** (`crosswalk:33`). Verdict vs opus: **RATIFIED** — correlation,
fault, owner all re-proven; the BI-B1 provenance (user rejected the seen design, not a stale paint)
is the union's addition.

---

## F12 — /data/tags-input container "not rounded"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:24`): *"`/data/tags-input` — these containers
aren't rounded."* Screenshot: `../../feedback/F12-tags-input-unrounded.png`.

**ISOLATION (first-hand read).** A `Skills` field: an outer full-width container holding four
stadium chips (`Vue`, `TypeScript`, `Tailwind`, `reka-ui`, each with ✕) plus `Add skill…`, over the
`4 SKILLS · ENTER TO ADD…` caption. The chips are correctly pill-rounded; the outer container's
corners read square — the "pill chips inside a near-rectangle container" incoherence
(`../VISUAL-GESTALT.md:10-11`).

**TARGET.**
- Demo site: `demo/stories/data/tags-input.vue:51-59` (bare `<TagsInput>` in a veil Surface — no
  demo-side radius override).
- Src: `src/components/tags-input/styles.css:8` — container `border-radius: var(--radius-field)` →
  `--radius-2xl` = 1rem (`theme/radius.css:46,:21`). The chip stadium comes from the `Chip`
  component (`TagsInputItem.vue:23` renders `<Chip>`; `styles.css:61` is the DELETE button's
  `--radius-control`, not the chip — the prior dossier misattributed that line).

**POST-MORTEM.** Screenshot-vs-disk drift, now pinned tighter: `git show 490cc46e` proves
`border-radius: var(--radius-field)` was in the v7.0.0 cut ITSELF (the file is untouched since). The
feedback is post-7.0.0-order, so the square corners in the PNG cannot come from the cut's source —
the running demo at capture time was a stale pre-BI process, or a cascade defect existed only in
paint. The true-run pass narrows this further: at v6.0.0 the root wore `rounded-input` (10px) via a
raw utility string (`TagsInput.vue` at the tag), so BOTH endpoints of the plausible serve range
paint rounded (10px → 16px) — a stale serve alone cannot produce 0px; square paint requires a
var-resolution or paint-only failure (the oklab/paint-arm defect class). Either way the
enforceability gap is real: no gate pinned the container to a role token.

**REDRESS.** Owned by `BJ.W-RADIUS-ROLE` (BAND-MATERIAL W1) under **RULING 8**
(`ADJUDICATION-1.md` item 8) as converted by the lead amendment (`../../waves/BAND-MATERIAL.md:698-700`)
to a **REGRESSION-GUARD**: `OPEN-1a` runs a live-π on `/data/tags-input`, then the role assertions
pin container `--radius-field` + chip stadium against re-drift. Whether current paint agrees with
source is **LIVE-DEFER** — the guard's live-π is exactly the right instrument. Coverage: **EXACT**.

**STATUS.** Crosswalk **LANDED** (`crosswalk:34`). Verdict vs opus: **RATIFIED with corrections** —
guard posture re-proven; corrected the `:61` chip misattribution and replaced "either the PNG
predates the repoint or 16px reads subtle" with the cut-level git proof (the repoint predates the
feedback; only a stale-served demo or a paint-only defect explains the PNG).

---

## F13 — /data/sortable-list better design + horizontal space

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:25`): *"Needs better design and better horizontal
use of space."* URL-anchored, no screenshot.

**ISOLATION.** `demo/stories/data/sortable-list.vue` stacks rows in `flex flex-col gap-2` single
columns (`:69,:109`) with `rounded-md` bordered item rows (`:76,:117`); only the cross-list section
uses `md:grid-cols-3` (`:143`). On wide desktop the single-list sections leave most of the column
empty. "Better design" additionally implicates the item-row treatment (plain `rounded-md` strips —
below the radius role canon — with `⋮⋮`/`GripVertical` handles) and the reorder affordance itself.

**TARGET.**
- Demo site: `demo/stories/data/sortable-list.vue:69,:109` (vertical stacks), `:76,:117` (row
  treatment), `:143` (the one grid).
- Src: `src/components/sortable-list/` — the engine is not the fault; note `SortableList.vue:144`
  carries a raw `999px` literal (a BAND-MATERIAL W1 repoint site).

**POST-MORTEM.** Story-authorship gap: hand-rolled ad-hoc Tailwind layout, no responsive-audit
discipline existed to catch wide-desktop waste, so the flat stack shipped uncontested.

**REDRESS.** Horizontal + dogfooding owned by `BJ.W-RESPONSIVE-AUDIT` (BAND-STORY W6), with
sortable-list as a named born-RED anchor (**G-RSP-1** `:466`, **G-RSP-3** `:468`, dogfood mandate
`:450-451`); item-row treatment caught by the A10 proportion roster. **OPEN RESIDUE: the
drag-affordance half of "better design" (grab/lift/drop expressiveness under the breath-of-life
edict) is UNOWNED at HEAD** — the prior dossier proposed Δ-F13-1, CRIT1/CRIT2 confirmed it
disk-true, but JUDGE.md rules on neither it nor any equivalent (absent from J1-J11) and APPLYLOG
carries no application. JUDGE.md's "zero floating notes remain" is falsified by this omission; the
lead must rule (natural homes: the A01 engagement-audit scope or `BJ.W-IDLE-BREATH`'s interaction
half, or an explicit clause in the W6 fix mandate). Coverage: **PARTIAL** until ruled.

**STATUS.** Crosswalk **LANDED** (`crosswalk:35`) for the horizontal half. Verdict vs opus:
**RATIFIED, gap escalated** — the opus delta was right and then fell through the judge pass; the
union converts it from "appendable proposal" to a named JUDGE omission. REFABLE-2: the omission
independently re-verified — J1-J11 carry no F13 ruling and APPLYLOG carries no F13 row; the
escalation stands.

---

## F14 — audit ALL pages: horizontal-desktop + mobile-first

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:26`): audit ALL pages for horizontal usage +
mobile-first affordances; idiomatic gestalt, no legacy, clean breaks; dogfood our own components.
URL-anchored (all pages).

**ISOLATION.** Cross-cutting standing audit, not a single defect. Warrant verified at HEAD: the F13
stack; the fixed landing grids (`demo/chassis/landing/SectionLanding.vue:33`,
`CatalogLanding.vue:32` — `grid-cols-1/2/3`, no fluid/masonry); the bespoke-`<style>` route SFCs
with fixed widths. No prior wave governed per-page responsiveness.

**TARGET.** All 100 navigable routes (AMEND scope 128→100, `ADJUDICATION-1.md` item 9;
`BAND-STORY.md:436-438`), audited at 390px + ≥1440px.

**POST-MORTEM.** Absent discipline — 100 routes shipped with per-page ad-hoc layout and no
responsive gate; F14 was one of the 10 rows the gestalt seed omitted (`REGISTRY.md:7`).

**REDRESS.** Owned EXACTLY by `BJ.W-RESPONSIVE-AUDIT` as a first-class wave (BAND-STORY W6,
`:420-489`): per-page audit table (page → breakage@viewport → fix → DELTA), gates G-RSP-1/2/3,
dogfood-over-bespoke mandate, Playwright captures at both viewports serialized against other browser
seats (the browser-seat singleton rule). The audit table does not exist at HEAD — G-RSP-1 born-RED
stands. Execution is inherently live-browser work: **LIVE-DEFER** by construction. Coverage:
**EXACT**.

**STATUS.** Crosswalk **LANDED** (`crosswalk:36`). Verdict vs opus: **RATIFIED** — all anchors
re-verified.

---

## F15 — /data/infinite-scroll reset button unrounded + grand rounding/typography audit

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:27`): reset button not rounded; **grand
rounding/border-radius audit + typography audit.** Screenshot:
`../../feedback/F15-reset-button-unrounded.png`.

**ISOLATION (first-hand read).** The page header with a `Reset` button at right — a
near-rectangular control with ~6px corners, under-rounded for the control role. The mono ALL-CAPS
eyebrow (`INFINITE SCROLL`) incidentally exhibits the typography half's target idiom.

**TARGET.**
- Demo site: `demo/stories/data/infinite-scroll.vue:72-78` — a RAW `<button>` with
  `rounded-md border … text-small` (verified at HEAD; the panel at `:89` correctly uses
  `rounded-card`). Double fault: wrong radius AND not the library `<Button>` — the page hand-rolls a
  control the library ships, against F14's own dogfood mandate.
- Grand rounding: the role canon at `src/styles/theme/radius.css` + the raw-literal sites
  `SortableList.vue:144` (`999px`), `tabs/styles/segmented.css:169,:306` (raw rem) — all verified.
- Grand typography: the unreset Tailwind ramp + the `text-sm`/`text-xs` sites (band count 251; the
  true-run word-boundary re-count at HEAD is **234** post-demeta — naive greps inflate on
  `text-small`; re-count at wave time) + the mono-caption idiom.

**POST-MORTEM.** Unenforced token canon on two axes: a rich radius role vocabulary exists but
nothing lints raw radius utilities; the `@theme` bridge adds √φ rungs without resetting Tailwind's
built-in ramp, so `text-sm`/`text-xs` silently bypass the fluid scale.

**REDRESS.** Three owners, all verified present:
- Reset button: `BJ.W-RADIUS-ROLE` §D F15 (`BAND-MATERIAL.md:109-110,:138` — "RED at HEAD …
  verified; GREEN on the control role class"). The union sharpens the fix: swap to the library
  `<Button>` (size sm), not merely a role class on the raw element — the dogfood defect dies with
  the radius defect.
- Grand rounding: the whole `BJ.W-RADIUS-ROLE` + `BAND-GATES` W3 `token-hygiene` born-RED.
- Grand typography: `BJ.W-TYPE-CODEMOD` (BAND-MATERIAL W6, RULING 2/OPEN-B) + `BAND-GATES` W4
  `type-hygiene`.
Coverage: **EXACT**.

**STATUS.** Crosswalk **LANDED** (`crosswalk:37`). Verdict vs opus: **RATIFIED** — union adds the
dogfood-Button sharpening.

---

## F16 — /data/timeline redesign from the ground up

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:28`): *"Very poorly defined, buggy, likely many
facilities overfit. Redesign from the ground up."* URL-anchored, no screenshot.

**ISOLATION (re-corrected — the facade truth).** `src/components/timeline/` ships six SFCs +
geometry (~2,250 lines). `index.ts` exports ONLY `GlassTimeline` + types — TRUE — but the prior
pass's "four of five variants are in-repo dead code / unconsumed by any `src/`/`demo/` file" claim
is FALSE and struck: `GlassTimeline.vue:2-4` is a mode FACADE that imports and delegates to
`ScrubberTimeline` / `SegmentedTimeline` / `ContinuousTimeline`, and `ContinuousTimeline.vue:3-4`
composes `ContinuousRail` + `ContinuousMarkers`. All five variant SFCs are LIVE internals of the
one exported surface; the demo (`timeline.vue:5` + both body SFCs, `GlassTimeline` imports only)
exercises three registers THROUGH the facade. What does re-prove: `README.md` §Exports lists
Continuous/Rail/Markers/Scrubber/Segmented as exports — false at HEAD, a real doc-truth violation
(still unnamed in `BAND-DOC-TRUTH` — lead routing owed); the tests import `GlassTimeline` only
(`continuous-structural-split.test.ts:4`; `ContinuousMarkers` appears in a comment at `:226`, not
an import). The "buggy" verdicts at `/data/timeline` are paint/interaction claims: **LIVE-DEFER**
(the design-loop's captured RED baseline owns them).

**TARGET.**
- Demo site: `demo/stories/data/timeline.vue` + the two body SFCs (all GlassTimeline modes).
- Src: the whole `src/components/timeline/` family. External consumer: speedtest
  `PhaseTimeline.vue:49` imports `GlassTimeline` (continuous register) — ONE external consumer,
  single-external, below the ≥2 bar (`MeterColumn.vue` references it in comments only).

**POST-MORTEM (re-corrected).** Not dead-variant accretion — FACADE-MODE OVERFIT: one exported
component whose variant axis fans into four internal SFCs plus a geometry module (~2,250 lines) to
serve one demo page and one external consumer register. The five-peer internal surface was
authored ahead of any consumer demand, and the README documents an export surface that never
shipped. Patching the mode axis preserves the disease; the user ordered ground-up.

**REDRESS.** Owned by `BJ.W-REDUCE-TIMELINE` (BAND-REDUCTION W5) as a **STUB → design-loop**
(`:435-478`): disposition recorded (ground-up, not prop-diet), scope bound by amendment A2 to ALL
FIVE variants (`:527`) — the A2 all-five binding holds under the facade truth too (the internals
die or survive WITH the facade). Design-loop seed corrected: start from the facade's
consumer-proven contract (the continuous register speedtest renders + the demo's three registers),
NOT from the prior pass's false one-live-four-dead partition. C-C (JUDGE.md) already sequences the
track-well register adoption. Coverage: **EXACT**.

**STATUS.** Crosswalk **LANDED** (`crosswalk:38`). REFABLE-2 verdict: owner/coverage/A2-scope
RATIFIED; the prior pass's isolation + post-mortem "correction" **OVERTURNED** (its
dead-code/unconsumed/sole-test-reference claims are false at HEAD — `GlassTimeline.vue:2-4`
delegates); the README doc-truth fact and the single-external fact RATIFIED.

---

## F17 — /data/search input boxes "not rounded"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:29`): *"`/data/search` — input boxes are not
rounded."* Screenshot: `../../feedback/F17-search-inputs-unrounded.png`.

**ISOLATION (first-hand read, corrected).** The `Live search` section: two stacked inputs —
`Search components, composables,` (magnifier, VISIBLY ROUNDED ~1rem) and `Jump to a component…`
(VISIBLY SQUARE) — over a dashed results well. The two inputs do NOT read "roughly equal" (the
prior dossier's read); they differ exactly as the seed recorded: "two adjacent search inputs with
different radii, one sharp" (`../VISUAL-GESTALT.md:12`).

**TARGET (corrected — the prior dossier's mechanism is false).** The search components do NOT ride
`field-control`; they ride `.input-bar`:
- `src/components/search/SearchBar.vue:4` — `cn('input-bar', …, searchFieldVariants({variant}))`;
  `.input-bar` carries `border-radius: var(--radius-2xl)` (`styles/utilities/components.css:12-16`)
  → the ROUNDED first input.
- `src/components/search/FuzzySearch.vue:126-127` — same `input-bar` + variant classes; the demo
  (`demo/stories/data/search.vue:502-508`) passes `variant="floating"`.
- `src/components/search/searchVariants.ts:8-11` — `floating` (and `bare`) =
  `"border-none bg-transparent p-0 rounded-none"`. No `.fuzzy-search--floating` rule exists
  anywhere in `src/` to re-provide chrome. `rounded-none` is a Tailwind utility (@layer utilities)
  and beats `.input-bar`'s @layer components radius unconditionally → the SQUARE second input IS
  the disk state at HEAD, statically derivable, no screenshot drift required.

**POST-MORTEM (corrected).** Not screenshot-vs-disk drift — a variant-authorship fault: the
`floating` variant strips the field chrome (presumably expecting a wrapper to re-provide it) and no
wrapper chrome was ever authored. The defect shipped because the variant's visual contract was
never stated, let alone gated.

**REDRESS (posture corrected).** Owner unchanged — `BJ.W-RADIUS-ROLE` (BAND-MATERIAL W1) via
RULING 8's own conditional ("owns the remediation if the live-π reproduces") — but the posture
flips from REGRESSION-GUARD back to **BORN-RED FIX**: the live-π WILL reproduce (final paint
confirmation **LIVE-DEFER**, the CSS is unconditional). The fix: either the `floating` variant
gains its own rounded chrome (a `.fuzzy-search--floating .input-bar` rule or a variant class that
keeps `--radius-field`/`--radius-2xl`), or the collapsed floating field stops stripping
`border-radius` (drop `rounded-none` from the variant), or the demo drops `variant="floating"` —
decided against the variant's intended design, then pinned by the role assertion. **FLIP recorded**:
the "F12/F17 already role-correct on disk" premise (RULING 8 as amended, `BAND-MATERIAL.md:117-119`
"the search component has no own border-radius (rides field-control pill)", `:698-700` lead
amendment, `crosswalk:227-229` item 5, `PLAN.md:187`) is FALSE for F17 on every clause — see the
sidecar; the lead re-judges. Coverage: **EXACT once re-postured** (the owner and the live-π
instrument are already right; only the expected outcome and the fix-shape were wrong).

**STATUS.** Crosswalk **LANDED** (`crosswalk:39`) — ownership stands. Verdict vs opus:
**OVERTURNED** (mechanism, disk-state, screenshot read, and guard posture all corrected by fresh
evidence). REFABLE-2: the flip independently re-derived from source with no reference to the prior
text — `search.vue:503` `variant="floating"`; `searchVariants.ts:10` `rounded-none` (a utilities-
layer class that beats `.input-bar`'s components-layer `--radius-2xl` unconditionally); zero
`.fuzzy-search--floating` chrome rules in `src/` — the OVERTURN stands; the lead re-judge remains
owed.

---

## F18 — instrument-chassis + metric TO BE REMOVED

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:30`): *"To be REMOVED — 'what of our grand pruning
of overfit and superfluous components?'"* URL-anchored, no screenshot.

**ISOLATION.** Both PRESENT at HEAD: `src/components/instrument-chassis/`, `src/components/metric/`
(Metric/MetricCell/MetricRow/MetricStack; the granular `./metric-badge`/`./metric-cell`/
`./metric-stack` subpaths and the `MetricBadge` symbol were removed at `490cc46e`), package exports
`./instrument-chassis` + `./metric` live. In-repo consumers: their own demo stories only. The
removal premise fails on the external census: instrument-chassis = speedtest×4 + muster×5;
metric-badge consumers span fourier-analysis (7 files) + speedtest + muster + sci-report — the
most-shared component in the census (`ASK-REDUCTION.md:25-51`, verified).

**POST-MORTEM.** The `recap:recap-carry-unexecuted` disease (UF-K1): thrice-ordered removal (F18,
Q051 R12/R16, BJ F18) vs a census that keeps ruling SHARED. The fault is tranche machinery
re-booking a refused decision, not a code defect.

**REDRESS.** Owned by `BJ.W-REDUCE-CROSSREPO-GATED` (BAND-REDUCTION W4, `:363-431`) as an
**ASK-gated relay** surfaced as `ASK-REDUCTION §A1`: ratify SHARED-KEEP or overrule with the costed
multi-repo break table; either ruling is recorded terminally so a fourth ask cannot re-open it.
Consistent with the consumer-updates ruling (consumers never preserve an obsolete surface — if the
user overrules, the by-name asks relay to each consumer's own tranche). Coverage: **EXACT (as a
user-gated decision)**.

**STATUS.** Crosswalk **ASK** (`crosswalk:40`). Verdict vs opus: **RATIFIED** — with the
metric-surface naming made precise (the prior text's "metric-pill deleted" / "metric-badge folded"
wobble replaced by the verified subpath+symbol facts).

---

## F19 — /feedback/alert not glassy, rounded, or idiomatic

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:31`): *"Not properly glassy, rounded, or
idiomatic/Apple-like."* URL-anchored, no screenshot.

**ISOLATION.** Verified on disk at HEAD: `src/components/alert/index.ts:8` `BASE` wears
`rounded-lg` — which resolves to `--radius-lg: var(--radius)` = **10px** (not Tailwind's stock 8px;
the prior dossier's number corrected) — under the 16px card role; every `TONE` arm (`:11-18`) rides
`[backdrop-filter:var(--glass-blur-wash)]` where `--glass-blur-wash-radius` = **1px**
(`tokens/glass.css:86`, verified) — glass in name only; the border is uniform, no law-3 rim
asymmetry. All three complaint axes are disk-true. How severe 10px + 1px READ on the page is
**LIVE-DEFER**; the token facts are not.

**TARGET.**
- Src fault: `src/components/alert/index.ts:8` (`rounded-lg`) + `:11-18` (wash-rung backdrop);
  consumed at `Alert.vue:37`.
- Demo site: `demo/stories/feedback/alert.vue`.

**POST-MORTEM.** Authorship gap under an unenforced material canon — Alert was wired to a raw
Tailwind radius literal and the weakest blur rung while the BA feedback-tone fold (6f77ab12)
modernized only its TONE color path; no alert-specific paint gate existed.

**REDRESS.** Owned by `BJ.W-ALERT-IDIOM` (BAND-FEEDBACK-MOTION W4, `:86-96`): card-role radius from
`BJ.W-RADIUS-ROLE`, role blur rung from `BJ.W-BLUR-LADDER`, law-3 rim treatment, law-10 type
ladder; sequenced AFTER Material W1/W2. One wording note against the wave's born-RED (a) "alert is
neither": the radius half is cleanly RED; the backdrop half should be phrased as "wrong rung (wash,
1px)" rather than absent — Alert HAS a backdrop-filter; the gate should assert the ROLE rung, which
it does. Coverage: **EXACT**.

**STATUS.** Crosswalk ORPHAN → **LANDED** by reconciliation (`crosswalk:213-216`). Verdict vs opus:
**RATIFIED with corrections** (radius value 10px; "neither" phrasing sharpened).

---

## F20 — /feedback/toast animation "awful"; should equal the refined dialog

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:32`): *"Animation is awful; should be exactly like
our refined dialog."* URL-anchored, no screenshot.

**ISOLATION.** On disk at HEAD the toast ALREADY rides the shared engine:
`src/components/toast/Toast.vue:80` sets `data-reveal="transient"` on `glass-reveal` (`:91-103`);
the reka `slide-in-from-*-full`/`fade-out-80` chain is RETIRED (`styles/transitions.css:87-112`,
landed at BI B7 `ef3ea646`, inside v7.0.0). The dialog rides the SAME engine on a different
register: `DialogContent.vue:235` (`glass-reveal`), `:458` (`data-reveal="overlay"`, scale-from
0.94 per `glass/reveal.css`), or the JS center spring. The "awful" the user saw was most plausibly
the retired slide-in (a stale-served demo, the F12 provenance class) — the residue at HEAD is a
REGISTER divergence (transient scale-from-0.5, 100ms exit vs overlay scale-from-0.94), not a
bespoke toast curve. Whether the current transient bloom satisfies "exactly like our refined
dialog" is a paint judgment: **LIVE-DEFER**.

**TARGET.**
- Src (residual divergence): `Toast.vue:80-103` + `transitions.css:87-112` vs
  `DialogContent.vue:235,:458` + the center spring.
- Demo site: `demo/stories/feedback/toast.vue`.

**POST-MORTEM.** Experiment-in-flight vs stale baseline: the retirement of the slide-in landed in
the same cut the feedback straddled; the verdict was written against motion that no longer ships.

**REDRESS — CLOSED TO EXACT.** Owned by `BJ.W-TOAST-DIALOG-PARITY` (BAND-FEEDBACK-MOTION W1). The
prior dossier's Δ-F20-1 (stale born-RED framing) was ADOPTED as **J4** and APPLIED: W1 gate (a) at
HEAD is the live-π REGISTER-PARITY guard with π baseline = the CURRENT transient toast
(`BAND-FEEDBACK-MOTION.md:41-47`, verified). The remaining design call — unify the toast onto the
dialog register vs keep a parity-tokened transient (`OPEN-FM-1`) — is the wave's to decide against
live paint. Coverage: **EXACT** (the PARTIAL verdict is superseded by the applied ruling).

**STATUS.** Crosswalk ORPHAN → **LANDED** (`crosswalk:213-216`). Verdict vs opus: **RATIFIED,
status advanced** — the opus analysis was correct and its own delta has since landed (J4); the
union records the closure.

---

## Coverage summary

| Row | ask (compressed) | terminal owner | coverage | verdict vs opus |
|-----|------------------|----------------|----------|-----------------|
| F11 | configurator inter-item gap | `BJ.W-CONFIGURATOR-STD` G-CFG-3 (+ A10 mark) | **EXACT** | RATIFIED (+BI-B1 provenance) |
| F12 | tags-input container radius | `BJ.W-RADIUS-ROLE` (RULING 8 → guard) | **EXACT** · LIVE-DEFER paint | RATIFIED (2 corrections) |
| F13 | sortable-list design + horizontal | `BJ.W-RESPONSIVE-AUDIT` G-RSP-1/3 | **PARTIAL** — drag-affordance residue UNRULED | RATIFIED, gap escalated |
| F14 | audit ALL pages responsive | `BJ.W-RESPONSIVE-AUDIT` (first-class) | **EXACT** · LIVE-DEFER execution | RATIFIED |
| F15 | reset unrounded + grand rounding/type | `BJ.W-RADIUS-ROLE` + `BJ.W-TYPE-CODEMOD` | **EXACT** | RATIFIED (+dogfood Button) |
| F16 | timeline ground-up redesign | `BJ.W-REDUCE-TIMELINE` (stub → design-loop, A2) | **EXACT** | owner RATIFIED; prior "correction" OVERTURNED (facade truth) |
| F17 | search inputs radius | `BJ.W-RADIUS-ROLE` — **born-RED FIX, not guard** | **EXACT once re-postured** · FLIP v RULING 8 | **OVERTURNED** |
| F18 | instrument-chassis + metric REMOVE | `BJ.W-REDUCE-CROSSREPO-GATED` + ASK §A1 | **EXACT (decision)** | RATIFIED |
| F19 | alert not glassy/rounded/idiomatic | `BJ.W-ALERT-IDIOM` (FEEDBACK-MOTION W4) | **EXACT** | RATIFIED (2 corrections) |
| F20 | toast animation ≡ refined dialog | `BJ.W-TOAST-DIALOG-PARITY` (J4 applied) | **EXACT** | RATIFIED, status advanced |

**Totals: EXACT 9 / PARTIAL 1 / MISSING 0.** Open items for the lead: the F17 FLIP (RULING 8's
disk-premise false — posture reverts to fix), the F13 Δ-F13-1 judge-omission (unruled residue),
and the F16 timeline-README doc-truth routing (README §Exports lists five never-shipped exports;
unnamed in `BAND-DOC-TRUTH`). All detailed in `../refable/REFABLE-RU-13-F11-F20.md`.
