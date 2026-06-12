# BA fleet — lane r10-fd-delta (R10-4: the FRONTEND-DESIGN pane DELTA)

A DELTA pass over the banked R8 design fleet (fd-foundations-substrates, fd-forms-display-
containers, fd-nav-dock-data, fd-feedback-motion-compositions, hierarchy-suffusion) — NOT a
redo. Live-walked :5210 BOTH modes at HEAD (v3.13.0, nothing landed since R8 — BA is
authored-pre-greenlight), route-frozen against the FD-FS-4 auto-nav. The job: surface NEW
incongruence classes the R8 lanes did not name + the 2-3 STRUCTURAL hierarchy moves +
cross-map every NEW find to the BA roster. Every claim is file:line- or π-anchored.
Captures: `fleet/r10-fd-*.png`.

---

## 1 — THE R8 BASELINE (still-open headlines — do NOT re-derive)

| id | one line |
|---|---|
| HS-1 / DARK-1 / FD-1 | dark `--bg` L6 vs `--card` L10 = 4-L gap; whole glass ladder composites to a 7-code-value near-black band — covered W-DARK-MATERIAL |
| HS-2 | display register is binary hero-68px / content-26px; no graded ladder, page-title↔section-heading only 6px apart — covered W-SUFFUSE2 |
| HS-3 | 38/136 routes declare a background; ~72% wear the flat default — covered W-STAGE |
| HS-4 | the 13-stop section-color ramp paints in 2 places only (icons grid + the tinted eyebrow) — covered W-SUFFUSE2 |
| FD-B (forms) | dark `--primary` = achromatic cream → every filled control (slider/switch/badge) a pale slab — covered W-DARK-MATERIAL §4 |
| FD-FS-4 | shell-dock `railContext` writable-computed auto-navigates off any page in ~1s — covered W-SHELL-HOLD |
| FD-DOCK-1 | flagship dock demos on flat `bg-card/40`; glass invisible without a rich substrate — covered W-STAGE |
| FD nav-tabs | R8 read: tabs "GOOD — crafted, comprehensive" (the read THIS lane overturns — §2) |
| X-1/X-2/X-3 (fb/motion/comp) | void backdrops + hand-rolled `bg-card/60` plates + unloved CTA register — W-STAGE / W-SURFACE-AXIS / W-DEMO-AFFORDANCES |

The R8 lanes own the dark register, the void backdrops, the disco CTAs, the tone-on-glass,
and the configurator/dock-staging defects. The DELTA below is what the live re-walk found
that they did NOT name.

---

## 2 — NEW FINDS (the delta — only what R8 missed)

### NF-1 [S2] — The two tab families render at OPPOSITE widths on one page (the R8 "tabs GOOD" overturn)

R8 `fd-nav-dock-data` graded `/navigation/tabs` "GOOD — crafted, comprehensive." Live π
(`browser_evaluate`, route `/navigation/tabs`, dark) shows a stark sibling-alignment break the
R8 read missed: the `ui/Tabs` tracks span the **full content column** while the equivalent
`SegmentedTabs` tracks are **content-width**:

| section | family | `[role]` track width | display/justify |
|---|---|---|---|
| Pill (inline highlight) | `ui/Tabs` | **1086px** (full column, mainW 1357) | flex / center |
| Underline | `ui/Tabs` | **1052px** (full column) | flex |
| Pill (variant="pill") | `SegmentedTabs` | **252px** (content) | grid |
| Underline (variant="underline") | `SegmentedTabs` | **414px** (content) | flex |
| Multi-select | `SegmentedTabs` | 287px (content) | grid |

So on ONE page "Daily / Weekly / Monthly" floats hard-left inside a vast empty 1086px gray
slab (the capture `r10-fd-tabs-page-dark.png`) while "Segmented" three rows below is a tight
content pill. This is the visual root of the "full-width dead bar" — a published-surface
alignment incongruence the R8 lane graded GOOD. It is a SECOND defect class on the same page
as the R10-2 oval-blob/vertical-panel (those are `ui/Tabs` indicator-plate bugs; this is the
`ui/Tabs` list-WIDTH default). **Covered-by: W-DEMO-AFFORDANCES §2 (the content-width-not-
full-column trigger convention) + the tabs-overhaul wave the R10-2 lane proposes** (the
`ui/Tabs` public surface retires → its full-width demo recipes die). NEW relative to fd-nav.

### NF-2 [S2] — The section-heading register is FRACTURED into two populations (the structural keystone)

R8 HS-2 named the hero/content DISPLAY cliff. It did NOT name that the storybook's SECTION-
heading register splits into two incompatible populations across sibling pages. Live π (h-tag
+ `getComputedStyle` census across 8 routes):

- **Population A — semantic `<h2 class="text-subheading">` (20.4px / 600):** `/forms/inputs`,
  `/forms/select`, `/navigation/tabs` — each section is a real 20px heading.
- **Population B — `<p class="section-label">`-only (Fira Code, 14.4px, uppercase mono
  eyebrow), ZERO `<h2>`:** `/forms/slider`, `/display/badge`, `/compositions/hero`,
  `/motion/springs` (live: slider has 9 `.section-label`, 0 `text-subheading`; badge 6
  `.section-label`, 0 h2; hero 4 `.section-label`, 0 h2).

Same Forms category, `/forms/inputs` opens its sections with a 20px h2 and `/forms/slider`
opens them with a 14px ALL-CAPS mono caption — a reader paging inputs→slider sees the section
rhythm change register AND drop 6px below body. The `<StorySection heading>` canonical
20.4px rung (the AZ.W-HIERARCHY register `proof:hierarchy` is supposed to enforce as the ONLY
section-heading register in the enrolled set) is consumed by Population A and BYPASSED by
Population B — the gate's enrolled set evidently does not cover slider/badge/hero. This is the
"canon-on-paper / muddy-in-render" gap the BA gestalt bar (inv-4) was minted to catch,
surfacing on the section rung. **NEW; covered-by NOTHING in the roster as a sweep** — W-SUFFUSE2
lifts the page-TITLE rung (HS-2) but does not reconcile the section-heading population split.
Candidate amendment (§4).

### NF-3 [S2] — A heading-rung INVERSION survives inside the tabs Vertical demo

Live π (`/navigation/tabs`): the Vertical demo panel renders its tab labels as
`<h3 class="mb-1 text-small font-semibold text-foreground">` — **16.4px, BELOW the 16px body
register's weight-peer and far below the 20px section h2.** This is the exact hand-rolled
`text-sm font-semibold` anti-pattern CLAUDE.md's StorySection note + `proof:hierarchy` forbid
("reads as a caption … a bypass re-introduction fails the gate") — alive on a published demo
panel, an `<h3>` that is visually a caption. The R8 hierarchy lane did not grep demo-panel
sub-headings. **NEW; same root as NF-2** (the section/sub-heading rung is un-gated on these
pages). Covered-by the same candidate amendment.

### NF-4 [S2] — Input vs Select base-register divergence (cross-control register incoherence)

R8 FD-B owns the achromatic-FILLED-state defect. It did NOT name that the two most common
form controls diverge at their REST register. Live π (dark):

- `/forms/inputs` `.input-pill`: `oklab(0.986 / 0.5)` — a near-WHITE translucent pill.
- `/forms/select` trigger: `glass-wash` = `oklab(0.636 …)` — a MID-luminance gray glass.

Geometry is coherent (both h:40, radius:9999px) — but the SURFACE register is not: a select
sitting next to an input reads as a different, grayer control family (capture
`r10-fd-select-dark.png` — the select pills are visibly lighter-gray slabs in the dark card).
This is the R10-5 "no gray" bar biting a control-family seam the R8 lanes did not measure.
**Covered-by: W-SURFACE-AXIS** (the shared surface grammar) — but the input↔select REST-tier
reconciliation is not explicitly named there; flag as a scope note (§4).

### NF-5 [S3] — The shell-rail facet strip DOUBLE-renders on every content page

R8 dock-rail-seat owns the orphan-seat (chips float detached from the dock seam). The live
re-walk found a compounding redundancy it did not record: on a NON-dock content page
(`/forms/select`, `/forms/slider`) the SAME facet set ("Text / Selection / Toggles") renders
in TWO strips at once — one detached-left of the SidebarDock (Y≈300-350) AND one above the
BottomDock (Y≈750), 12 chip nodes total for a 3-facet set (π `chipStripsByY: {300:4, 350:2,
750:6}`). The identical carousel appears twice on every page via both shell docks — the
visual redundancy SHELL-IA-N1 names abstractly, here measured concretely. **Covered-by:
W-DOCK-SECTIONS (SHELL-IA-N1 "the redesign decides whether one or two facet carousels
survive")** — confirm the decision lands as ONE strip, not two.

### NF-6 [S3] — The slider default range fill is dark-on-dark (a DELTA on FD-B's direction)

FD-B read the dark slider default as an achromatic CREAM bar (`--primary` L90). Live the
standard/range fill computes `oklab(0.216 / 0.88)` on the TRACK and a light cream FILL
(capture `r10-fd-slider-dark.png` shows the fill as a near-white bar). The defect SURVIVES
(achromatic, no chroma identity) but the read is worth re-stating precisely: the default range
is a low-chroma light bar with no brand identity, the spectrum variant sings — exactly the
W-DARK-MATERIAL §4 re-anchor target. **Covered-by W-DARK-MATERIAL §4** (no new wave); recorded
as a measurement refinement, not a new defect.

### NF-7 [S2] — The "Pill (inline highlight)" panel + tab-trigger radius rungs are incoherent

Adjacent to NF-1: live π (`/navigation/tabs`) the tab TRIGGER radii do not form a rung across
the families on one page — `ui/Tabs` segmented triggers `r:6px`, pill triggers `r:1.67e7px`
(pill), underline triggers `r:0`, while the `SegmentedTabs` track is `r:10px`. Four trigger-
radius values on one tab page with no governing rung. Compounds the "too many types"
taxonomy bloat the R10-2 lane owns. **Covered-by the tabs-overhaul wave** (ONE indicator
engine, ONE radius rung per surface-register). Recorded for the overhaul's radius contract.

---

## 3 — THE STRUCTURAL HIERARCHY MOVES (the user's standing ask — chassis-level, lift every pane at once)

Three chassis-level moves on what HEAD ships (StoryPage / StorySection / the √φ typography
rungs), each lifting EVERY pane rather than patching one:

### SM-1 — ONE canonical section rhythm (close the NF-2/NF-3 fracture at the chassis)

The fracture is that `<StorySection heading>` (the canonical 20.4px `text-subheading` h2,
AZ.W-HIERARCHY) is consumed by SOME pages (inputs/tabs/select) and BYPASSED by others
(slider/badge/hero/springs use `.section-label`-only; the tabs Vertical demo uses a rogue
`<h3 text-small>`). The structural move: make `<StorySection>` the MANDATORY section wrapper
across the enrolled story set, emitting the 20.4px h2 as the ONLY section-heading register and
the `.section-label` mono caption as the OPTIONAL eyebrow ABOVE it (the two are a PAIR —
eyebrow + heading — not alternatives). Then `proof:hierarchy`'s enrolled set widens to the
full story corpus so no page can ship a `.section-label`-only or `<h3 text-small>` section.
ONE chassis rule re-ranks the section rhythm on every page; anchors: `StorySection.vue` (the
heading slot), `proof:hierarchy` (the enrolled-set widen). This is the keystone — it is the
"how might we better structure proper design hierarchy" question answered at the chassis.

### SM-2 — A GRADED page-title display ladder keyed off page-role (extends HS-2/W-SUFFUSE2)

Measured three page-title rungs that do NOT form a system: front-door 86px (`text-display-4`)
/ hero-composition 86px / content-page 26px (`text-heading`). A reader sees 86 → 26 → 86 with
nothing between — a binary cliff, not a graded ladder. The structural move (W-SUFFUSE2 already
owns the content-page lift; make it a ROLE-keyed ladder, not a one-rung bump): `StoryPage`
resolves the chrome `<h1>` rung off the page's role — front-door → `text-display-4`,
category-landing → `text-display-1` (42px), content → `text-title` (33px) — so the page title
DOMINATES its section h2 (20px) on every page and the display register GRADES across the
storybook. ONE `StoryPage` edit re-ranks all 12 categories. Anchor: `StoryPage.vue:41`
(per AZ.W-HIERARCHY §0).

### SM-3 — ONE control-surface register family (close NF-4 at the token seam)

The input-vs-select REST divergence (`oklab(0.986/0.5)` near-white vs `glass-wash`
`oklab(0.636)` gray) is a control-FAMILY register incoherence, not a per-component bug. The
structural move rides W-SURFACE-AXIS: every form control (input, select trigger, combobox,
multi-select, number-field) reads the SAME glass REST tier from one `--control-surface-*`
token family (the `.input-pill` tier is the reference), so the control family reads as ONE
material — no select-is-grayer seam. This is the R10-5 "no gray" bar expressed token-first at
the control-family root rather than a per-control darken. Anchor: the `--control-h-md`/
`.input-pill`/`glass-wash` seam in `glass/surfaces.css` + the select-trigger CVA.

---

## 4 — CROSS-MAP: NEW finds → BA roster (covered-by / candidate-amendment)

| NEW find | sev | covered-by (wave) | uncovered? → candidate amendment |
|---|---|---|---|
| NF-1 tab-family width split | S2 | W-DEMO-AFFORDANCES §2 + the R10 tabs-overhaul wave | covered (the overhaul retires `ui/Tabs` full-width recipes) |
| NF-2 section-register fracture | S2 | — (W-SUFFUSE2 lifts only the page-TITLE rung) | **AMEND**: add SM-1 (the StorySection-mandatory section rhythm + `proof:hierarchy` enrolled-set widen) to W-SUFFUSE2 or W-DEMO-AFFORDANCES |
| NF-3 `<h3 text-small>` inversion | S2 | — | **AMEND**: same as NF-2 (the enrolled-set widen catches it) |
| NF-4 input↔select register | S2 | W-SURFACE-AXIS (grammar) | **SCOPE NOTE**: name the `--control-surface-*` REST-tier reconciliation (SM-3) explicitly in W-SURFACE-AXIS |
| NF-5 facet strip double-render | S3 | W-DOCK-SECTIONS (SHELL-IA-N1) | covered — confirm the decision is ONE strip |
| NF-6 slider dark range fill | S3 | W-DARK-MATERIAL §4 | covered (measurement refinement) |
| NF-7 tab-trigger radius rungs | S2 | the R10 tabs-overhaul wave | covered (ONE radius rung per register) |
| SM-1 canonical section rhythm | — | candidate W-SUFFUSE2 amendment (keystone) | **AMEND** |
| SM-2 graded title ladder | — | W-SUFFUSE2 (extend to role-keyed) | refine scope |
| SM-3 control-surface family | — | W-SURFACE-AXIS (extend) | scope note |

**The DELTA in one line:** R8 owns the dark register, the void backdrops, the disco, the
tone-on-glass, the dock staging. The re-walk adds ONE keystone the roster does not sweep — the
section-heading register is FRACTURED into `<h2 text-subheading>` pages and `.section-label`-
only pages (with a rogue `<h3 text-small>` survivor) — plus a tab-family width split, an
input↔select register seam, and a shell-rail double-render; the three structural moves (one
section rhythm, a graded title ladder, one control-surface family) lift every pane from the
chassis, not per-page.

Evidence: `r10-fd-tabs-page-dark.png` (the full-width tab slab + the Vertical occlusion),
`r10-fd-select-dark.png` (input↔select gray seam + the detached facet strip),
`r10-fd-slider-dark.png` (achromatic range + `.section-label`-only rhythm),
`r10-fd-badge-light.png` (`.section-label`-only + viz-pills sing),
`r10-fd-intro-frontdoor-dark.png` (the 86px display front-door).
