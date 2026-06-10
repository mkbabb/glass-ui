# AZ.W-HIERARCHY — a canonical section-heading rung + the Configurator hierarchy vocabulary the studios inherit

- **Tranche:** AZ (glass-ui)
- **Track:** Band G — design
- **Type:** impl (demo-chassis hierarchy + a Configurator section/label/rhythm vocabulary)
- **Depends on:** W-GATES (Batch 0 — `proof:all` runnable). Runs Batch 4, parallel with W-MORPH-SHOWCASE ‖ W-SUFFUSE ‖ W-METRIC-UNIFY.
- **Status:** SPEC

---

## §0 RE-GROUND (mandatory step-0 before any edit)

This wave starts from the fleet's D1 hierarchy set (D1-1 through D1-10) + D6-3 (the Configurator
column lacks hierarchy/proportion), NOT a fresh diagnosis. The root cause is NAMED: there is no
canonical section-heading rung — section `<h2>`s are hand-rolled per page across three incompatible
patterns (the canonical `text-subheading`, a BELOW-body `text-sm font-semibold text-muted-foreground`
caption, and a `text-heading` that DUPLICATES the page title), so the eye lands on demo content
before the labels that organize it. The `text-subheading` token + the `<StorySection>` chassis
ALREADY exist (CLAUDE.md says stories should compose them); several pages bypass both. RE-GREP every
cite at HEAD — the digest may compress and line numbers drift across the Batch-4 siblings:

1. `grep -rn 'text-sm font-semibold text-muted-foreground\|text-subheading\|text-heading' demo/stories/dock/overview.vue demo/stories/dock/layers.vue demo/stories/navigation/tabs.vue` —
   confirm the three incompatible section-`<h2>` patterns coexist (the systematic root D1-1/D1-3).
2. `grep -n 'text-heading\|variant' demo/stories/StoryPage.vue` — confirm `StoryPage.vue:41` renders
   the page `<h1>` as `text-heading` for ALL variants including the hero-flagged rows (the `variant`
   computed at `:29-30` reads `story.hero` but the title rung never upgrades — D1-4 root + couples
   D2-1, owned by W-SUFFUSE).
3. `grep -n 'section-label\|label\|slot' demo/stories/StorySection.vue` — confirm `StorySection`
   renders its label via `.section-label` (the mono-caption rung) and has NO heading-`<h2>` register
   today (the chassis the canonical rung lands in).
4. `grep -n 'text-subheading\|text-title\|type-subheading\|type-heading\|type-title' src/styles/typography.css` —
   confirm the canonical ladder `text-heading`(φ, 25.9px/700) → `text-title`(φ^3/2, 32.9px) →
   `text-subheading`(√φ, 20.4px/600) and that `.section-label` is the mono-caption (`--type-caption`).
5. `grep -n 'text-small font-semibold\|label\|ConfiguratorLayer' src/components/custom/configurator/ConfiguratorLayer.vue` —
   confirm the section label renders flat at `text-small font-semibold text-foreground` (no
   register differentiation — D6-3).
6. RE-CONFIRM the SCOPE FENCE holds: D1-7 (the dark slider-range bars dominating Settings) and D1-8
   (the per-section eyebrow hue cycle) are NAMED to W-SUFFUSE (the color-event / register suffusion),
   NOT this wave — this wave is the STRUCTURAL hierarchy (heading rungs + Configurator vocabulary),
   not the color/weight suffusion of individual surfaces.

If any cite has moved, the scope-reveal trigger fires — re-derive the edit-site table.

---

## Goal criterion

A reader paging through the storybook lands on the STRUCTURE before the content: every section
heading reads at ONE canonical rung (a `<StorySection>`-driven `text-subheading` register), the
intra-category jump (14px→20.4px page to page within Dock) is gone, no page carries two competing
equal-weight titles, and the Configurator controls column reads with deliberate hierarchy —
section weight, a label register, control rhythm — so the studios (blob, aurora) that compose the
Configurator inherit a hierarchy vocabulary rather than a flat undifferentiated stack. The
incongruence set (a child `<h3>` larger than its parent `<h2>`, a non-bold `<h3>` that reads as
body, a skipped heading level) is resolved at the chassis, not patched per page.

## Completion criterion

The born-RED gate `proof:hierarchy` (G1) flips GREEN, AND the Configurator hierarchy lands proven
by a captured DELTA (`proof:live-verified-ledger`). Specifically:

1. `npm run proof:hierarchy` (born-RED, NEW — the source/structure arm) asserts: (a) NO demo story
   `<section>` carries a hand-rolled section `<h2>` using `text-sm font-semibold text-muted-foreground`
   or a bare `text-heading` that duplicates the page title — the canonical `<StorySection>` label
   register (or `text-subheading`) is the ONLY section-heading rung in the enrolled story set;
   (b) `StorySection` exposes the canonical heading register (a `text-subheading`-keyed `<h2>` slot
   /register, not only the mono `.section-label` caption); (c) `ConfiguratorLayer` renders its label
   at a deliberate section register (the minted `--configurator-section-size`/`-weight` on a
   `.configurator-section-label`, not the flat `text-small font-semibold`) + the preset row consumes
   the minted `--configurator-preset-row-weight` (the three NAMED vocabulary tokens — NOT the
   already-shipped density ladder, which would pass vacuously).
2. The π DELTA arm (`tests-visual/hierarchy.spec.ts`, NEW) — a `getComputedStyle` readback across
   the worst-offender routes (`/dock/overview`, `/dock/layers`, `/navigation/tabs`, `/display/card`,
   `/data/data-table`) proves: every section `<h2>` resolves to the SAME canonical font-size
   (`--type-subheading`, 20.4px) NOT 14px and NOT 25.9px; no child `<h3>` resolves LARGER than its
   parent `<h2>`; the Configurator section label resolves above the control-row body rung; AND the
   Configurator preset row's resolved block-padding resolves ABOVE a body `ConfiguratorRow`'s (the
   D6-3 "preset row tight" defect-alive guard — the resolved spacing must increase, not just the
   `--configurator-preset-row-weight` token be present).
3. `vue-tsc --noEmit` + `npm run build` green; the existing demo render is unbroken (no story errors
   in the live console over the enrolled routes).

The π in-situ readback (G1.2) is the binding hierarchy truth; the source arm ratifies shape only. This
split is DELIBERATE and evasion-resistant: the source arm's `text-sm font-semibold text-muted-foreground`
string-allowlist is a brittle exact-match (an implementer could re-roll a fourth off-canon class —
`text-[14px] font-medium …` — and green the source arm while the same below-body caption defect lives),
so the source arm is NOT the truth — it ratifies the `<StorySection>` register exists + the known three
patterns are gone. The π `getComputedStyle` arm reads the RESOLVED font-size (20.4px NOT 14/25.9), which
no class re-roll can evade, and it walks EVERY route the Scope migrates (the G2 route list = the demo
File Bounds set), so a bypass on any migrated page fails π. The implementer must NOT treat a green source
arm as done; G2 is the binding close.

---

## The defect (file:line-grounded — RE-GREP at HEAD per §0)

| id | surface | mechanism | evidence (file:line at digest time) |
|---|---|---|---|
| D1-1 (S2) | systematic root | NO canonical section-heading rung — section `<h2>`s are hand-rolled across three incompatible patterns: `text-subheading` (20.4px/600, canonical), `text-sm font-semibold text-muted-foreground` (14px/600, BELOW body — reads as a caption not a heading), `text-heading` (25.9px/700, IDENTICAL to the page title). The `<StorySection>` chassis + `text-subheading` token already exist; several pages bypass both. | `demo/stories/dock/overview.vue:90` (`text-sm font-semibold text-muted-foreground`) vs `demo/stories/dock/layers.vue:59` (`text-subheading`) vs `demo/stories/navigation/tabs.vue:88`; canonical tokens `src/styles/typography.css:271-285`; `ground/D1-nav-tabs-full.png` |
| D1-2 (S2) | /navigation/tabs | INVERTED heading scale: section `<h2>` labels render 14px/600 muted-gray, but a demo panel `<h3>` 'Profile' renders 16px/500 — the child `<h3>` is visually LARGER + darker than its parent `<h2>`; the eye lands on demo content before structure. | `ground/D1-nav-tabs-full.png` (h2 fs=14/600, h3 'Profile' fs=16/500); `demo/stories/navigation/tabs.vue:88,112,136,160` |
| D1-3 (S2) | Dock category | SAME-CATEGORY inconsistency: `/dock/overview` section h2s are 14px/600, `/dock/layers` section h2s are 20.4px/600 — paging within Dock the scale jumps 14px→20.4px page to page. | `ground/D1-dock-overview-full.png` vs `ground/D1-dock-layers-full.png`; `demo/stories/dock/overview.vue:90` vs `demo/stories/dock/layers.vue:59` |
| D1-4 (S3) | /foundations/intro | TWO `<h1>` compete: page-chrome 'Intro' (text-heading 25.9px) + hero card title (text-display-4 86px) — a duplicate top-level heading in the document outline; the chrome `<h1>` is correct on content pages but on a HERO page it duplicates the hero's own `<h1>`. | `demo/stories/StoryPage.vue:41` (chrome `<h1 text-heading>`) + `demo/stories/foundations/intro.vue:58` (hero `<h1 text-display-4>`); `ground/D1-foundations-intro.png` |
| D1-5 (S3) | /data/data-table | Competing/redundant titles: page-chrome eyebrow 'DATA · DATA TABLE' + page `<h1>` 'Data Table' (25.9px/700), then INSIDE the card a SECOND eyebrow 'DATA TABLE' (dup) + card `<h2>` 'Repositories' (25.9px/700, IDENTICAL size+weight to the page `<h1>`); no clear primary + a large dead void below. | `ground/D1-data-datatable-full.png` (h1 + h2 both fs=25.9/700) |
| D1-9 (S3) | /display/card | Skips a heading level + uses non-bold 'headings': page `<h1>` (25.9px/700) jumps straight to `<h3>` (18px) with no `<h2>`, AND most `<h3>`s are fw=400 (regular, NOT bold) so they don't register as headings; a few sibling `<h3>`s are fw=600 — mixed-weight at the same level + a skipped h1→h3. | `ground/D1-display-card-full.png` (h3 fs=18/400 'wash'/'quiet'/'resting' vs h3 fs=18/600 'Rose §0'; no h2) |
| D1-10 (S3) | /navigation/tabs | Default-variant demo wastes horizontal space — the 3-tab tablist floats centered in a full-width gray container ~80% empty; the empty container is heavier than its content (a balance/focal incongruence). | `ground/D1-nav-tabs-full.png` (Default demo full-width gray bar, centered 3-tab group) |
| D6-3 (S3) | Configurator column | The Configurator controls column lacks hierarchy + proportion — section labels read flat + undifferentiated (Field/Medium/Spread/Bloom/Grain), slider tracks small/cramped, the preset row tight. `ConfiguratorLayer` renders its label at `text-small font-semibold text-foreground` — no register differentiation. | `ground/D6-configurator.png`; `src/components/custom/configurator/ConfiguratorLayer.vue:118` (`text-small font-semibold`) |

**SCOPE FENCE (named to siblings, not this wave — each names a CLAIMING wave-arm, not a bare
destination):** D1-6 (the switcher-rail inverted hierarchy) → W-DOCK-RAIL; D1-7 (the heavy dark
slider-range bars dominating Settings as the page's darkest focal points — a focal-hierarchy defect,
NOT a render bug) → **W-SUFFUSE Arm D4** (the `settings.vue` calm-composition idiom; the slider fill
weight is re-scaled DOWN to the calm register there, since settings is the enrolled D4 surface where
the three censor-bars live); D1-8 (the per-section eyebrow hue cycle reading as arbitrary noise at
10px with no legend/system) → **W-SUFFUSE Arm D3** (the `.section-label--tinted` abstraction at D3-7
is the SAME four `settings.vue` eyebrow sites — D3-7 must resolve D1-8's "reads as noise" complaint,
not merely relocate the multi-hue cycle into a class); D2-1 (the timid `text-heading` page title that
never upgrades on a hero) → W-SUFFUSE Arm D2 (the audacious-type display register). The receiving wave
must CITE the inbound id by number — a fence to "W-SUFFUSE" that the destination spec does not enroll
by id is a handoff hole (the receiving spec's defect table or scope must carry D1-7 / D1-8 explicitly).
This wave is the STRUCTURAL heading-rung canon + the Configurator hierarchy vocabulary ONLY.

---

## The Configurator hierarchy vocabulary (D6-3 — the studios inherit it)

The Configurator is the controls chassis the blob + aurora studios compose; R3-8/R3-10 both demand
"design-hierarchy structuring" of those studios (C6-10: the blob studio is "a flat undifferentiated
stack"). The elegant gestalt is to land the hierarchy ONCE in the Configurator primitive so every
studio inherits it, NOT to hand-tune each studio. The vocabulary is three registers — stated below as
the EXACT named tokens/classes the wave MINTS (the studios re-read these by name, and `proof:hierarchy`
asserts each by name; adjectives alone are not the contract):

1. **Section weight** — `ConfiguratorLayer` lifts its label off the current flat
   `text-small font-semibold text-foreground` (`ConfiguratorLayer.vue:118`) onto a NEW
   `.configurator-section-label` class keyed off a minted `--configurator-section-size`
   (`= var(--type-subheading)`, the 20.4px section rung) + `--configurator-section-weight` (`600`), so a
   section reads as a section, not a row. These two tokens are NEW (they do not exist at HEAD — the gate
   asserts `--configurator-section-size`/`--configurator-section-weight` are declared, NOT the
   already-shipped `--configurator-row-gap-*` density ladder, which proves nothing because it predates
   this wave).
2. **Label register** — a primary/secondary distinction expressed as TWO classes: the section label
   (`.configurator-section-label`, register 1 above) vs the ROW label (`ConfiguratorRow`'s existing
   `<Label>`, the secondary rung — left at the shipped body size). The token-name sub-label (the mono
   `--token` reference, `ConfiguratorRow.vue` monospaced span) stays the tertiary mono-caption rung. The
   gate asserts the section label's computed size resolves ABOVE the row label's (the π readback), not a
   string match — so re-rolling a different class name cannot evade it.
3. **Control rhythm** — the row gap/padding cadence reads primary(interaction)→secondary
   (mood/palette)→tertiary(geometry). The levers ALREADY SHIP — the `dividers` prop + the
   `--configurator-row-gap-{mobile,compact,comfortable,spacious}` / `--configurator-row-py-{…}` density
   ladder (`ConfiguratorRow.vue:122-139`). This wave does NOT re-mint them; it WIRES a DEFAULT rhythm by
   minting `--configurator-preset-row-weight` (the preset row's primary-affordance lift) so the preset
   row reads as the primary affordance (C6-10), fixing the D6-3 "the preset row is tight" defect. **The
   token's binding SEMANTIC is the preset row's SPATIAL rhythm — its block-padding / gap / border
   emphasis on `.configurator-presets` (`Configurator.vue:215`, the `px-3 py-2 border-b` preset picker
   row), NOT a font-weight.** D6-3's defect is the preset row being spatially cramped, so a
   `--configurator-preset-row-weight: 600` consumed as a font-weight would green a token-presence assert
   while the "tight" defect lives — the token MUST drive the preset row's padding/gap (a heavier spatial
   cadence than a body `ConfiguratorRow`). The gate asserts `--configurator-preset-row-weight` exists +
   is consumed by `.configurator-presets`'s padding/gap (NOT a font-weight slot) — NOT "the rhythm
   tokens exist" (the density ladder already exists and would pass that assertion vacuously) — AND the π
   readback (G2) proves the preset row's RESOLVED block-padding resolves ABOVE a body `ConfiguratorRow`'s
   (the defect-alive guard: the resolved spacing must actually increase, not merely the token be present).
   D6-3's third sub-defect — "slider tracks small/cramped" — is governed by the SAME control-rhythm
   axis: the `ConfiguratorRow` body cadence (the density-ladder default the studios resolve through),
   not a separate slider-sizing token. This wave's lever is the row rhythm DEFAULT (the studios pick a
   non-`compact` density default so the control rows — sliders included — breathe); a dedicated
   slider-track-size knob, if the row-rhythm default does not relieve the cramping, is NAMED to
   W-BLOB-STUDIO/the aurora studio's own configurator-refinement scope (R3-10/C6-10), not silently
   dropped here.

The studios (W-BLOB-STUDIO, the aurora studio) CONSUME this vocabulary — they do not re-author it.
This wave lands the vocabulary + proves it on the EXISTING aurora-configurator demo specimen; the
blob studio's adoption is W-BLOB-STUDIO's scope (it cites this wave's vocabulary as its dependency).

---

## Scope (numbered — concrete change/deletion only)

1. In `demo/stories/StorySection.vue`, add the canonical section-heading register: a
   `text-subheading`-keyed `<h2>` (the semantic section heading, distinct from the mono
   `.section-label` caption which stays the eyebrow), so a story composes ONE `<StorySection>` and
   gets the canonical heading rung — closing the D1-1 three-pattern divergence at the chassis.
2. Migrate the bypassing stories onto the `<StorySection>` heading register: `demo/stories/dock/overview.vue`
   (the `text-sm font-semibold text-muted-foreground` h2s → the canonical rung), `demo/stories/navigation/tabs.vue`
   (same), and any enrolled page using `text-heading` for a section h2 (the page-title duplication →
   the canonical `text-subheading` rung). The enrolled set is the worst-offender routes the gate reads.
3. Fix the D1-2 inverted scale: on `/navigation/tabs` the demo panel `<h3>` 'Profile' (16px/500)
   must read SMALLER than its parent section `<h2>` (the canonical 20.4px) — re-rung the demo
   panel's internal heading so the child never outweighs the parent.
4. Fix the D1-4 double-`<h1>`: on the hero-flagged `/foundations/intro` the page-chrome `<h1>`
   ('Intro') is suppressed/demoted (a hero page's `<h1>` is its hero title, not the chrome title) —
   the chassis `StoryPage` renders the chrome heading only on `variant="page"`, not `variant="hero"`
   (the hero owns the document `<h1>`). This is the STRUCTURAL fix; the hero TITLE display-register
   upgrade (text-display-3/4) is W-SUFFUSE's D2-1.
5. Fix the D1-5 duplicate titles on `/data/data-table`: the in-card eyebrow 'DATA TABLE' (a dup of
   the chrome eyebrow) is removed, and the card `<h2>` 'Repositories' demotes off the page-`<h1>`
   25.9px/700 to the canonical `text-subheading` section rung — one clear primary.
6. Fix the D1-9 skipped/non-bold headings on `/display/card`: the `<h3>`s gain a consistent weight
   (the canonical heading weight, not the mixed fw=400/600) and the skipped h1→h3 level is closed
   (a `<StorySection>` `<h2>` organizes the tier rows).
7. Fix the D1-10 wasted-space balance on `/navigation/tabs` Default demo: the full-width empty gray
   container is sized to its content (a `max-w` / left-aligned register) so the tab group is not
   adrift in a heavier empty bar.
8. Land the Configurator hierarchy vocabulary in `src/components/custom/configurator/ConfiguratorLayer.vue`
   (the section-header register) + `src/components/custom/configurator/ConfiguratorRow.vue` (the
   primary/secondary label register + the rhythm tokens) + the section tokens in the configurator
   CSS — proven on the existing aurora-configurator demo specimen (`demo/stories/compositions/configurator.vue`).
9. Author `scripts/proof-hierarchy.mjs` (the born-RED source gate, G1) + register it in
   `scripts/gates.mjs` (local+ci) + `ci.yml`.
10. Author `tests-visual/hierarchy.spec.ts` (the π DELTA arm, G2).
11. Update `CLAUDE.md` (the demo storybook chassis section — the canonical section-heading rung on
    `<StorySection>` + the Configurator hierarchy vocabulary the studios inherit).

## §3a Triumvirate Dispatch

- **File-bounds expansion**: if the canonical heading rung cannot be expressed on `<StorySection>`
  alone (a structural reveal that a meaningful fraction of stories use a section pattern the chassis
  cannot absorb without re-authoring each page's body markup), the scope-reveal trigger fires —
  research the true bypass surface, augment the enrolled set, redress. The enrolled story set is the
  WAVE BOUND; expanding it library-wide (all ~110 stories) is a successor, not this wave's scope.
- **Hard-gate failure** not local-recoverable: if the π readback finds a section heading that
  resolves OFF the canonical rung AFTER the `<StorySection>` migration (a third heading pattern the
  D1 lane missed), triumvirate — do not re-rung blindly.
- **Diagnostic loop**: three iterations where the Configurator section register does not visually
  differentiate from the row body without isolating WHY (a cascade-order/density-cascade interaction)
  → triumvirate.

## File Bounds

| File | Access |
|---|---|
| `demo/stories/StorySection.vue` | modify (add the canonical section-heading register) |
| `demo/stories/StoryPage.vue` | modify (hero-variant chrome-`<h1>` suppression — D1-4 structural) |
| `demo/stories/dock/overview.vue` | modify (section-h2 onto the canonical rung) |
| `demo/stories/navigation/tabs.vue` | modify (D1-2 inverted scale + D1-10 balance + canonical h2) |
| `demo/stories/data/data-table.vue` | modify (D1-5 duplicate titles) |
| `demo/stories/display/card.vue` | modify (D1-9 skipped/non-bold headings) |
| `src/components/custom/configurator/ConfiguratorLayer.vue` | modify (section-header register) |
| `src/components/custom/configurator/ConfiguratorRow.vue` | modify (label register + rhythm) |
| `src/styles/` (the configurator section CSS / tokens) | modify (the section-register tokens) |
| `demo/stories/compositions/configurator.vue` | modify (the vocabulary-proof specimen) |
| `scripts/proof-hierarchy.mjs` | create |
| `scripts/gates.mjs` / `ci.yml` | modify (gate rows) |
| `tests-visual/hierarchy.spec.ts` | create |
| `CLAUDE.md` | modify (chassis section + Configurator vocabulary) |

**Do NOT touch:** the typography token ladder itself (`src/styles/typography.css` rung VALUES —
the rungs are correct; this wave WIRES them, it does not re-tune them), the dock switcher-rail
hierarchy (`D1-6` → W-DOCK-RAIL), the settings slider-range fill (`D1-7` → W-SUFFUSE Arm D4 §8, the
settings-local `--slider-range-bg` override) + the settings eyebrow hue cycle (`D1-8` → W-SUFFUSE Arm
D3), the page title
DISPLAY-register upgrade (`D2-1` text-display-3/4 → W-SUFFUSE; this wave only does the D1-4
STRUCTURAL double-`<h1>` suppression, not the hero title's audacious-type uplift), the blob studio
configurator (W-BLOB-STUDIO consumes this wave's vocabulary).

### §4a Disjointness

Two natural agent units — the DEMO hierarchy (stories + `StorySection`/`StoryPage`) and the
CONFIGURATOR vocabulary (the configurator primitives + the proof specimen). They touch DISJOINT
files (no shared `modify` path). Cross-wave: shares `ci.yml`/`gates.mjs` with the Batch-4 siblings
(W-SUFFUSE, W-METRIC-UNIFY) — sequence the gate-row registrations into the Batch-4 re-byte-lock,
not a parallel write. W-SUFFUSE touches `StoryPage.vue` for the hero TITLE display register — this
wave touches `StoryPage.vue` for the hero CHROME-`<h1>` suppression; the two edits are on DIFFERENT
lines (the chrome `<h1 v-if>` condition vs the hero title rung) but on the SAME FILE, so sequence
W-HIERARCHY's `StoryPage.vue` edit BEFORE W-SUFFUSE's within Batch 4 (the disjoint-line rule does
not license a parallel write to one file).

## §5 Agent Units

### AZ.W-HIERARCHY.1 The canonical section-heading rung + the demo incongruence fixes

- **Goal:** every enrolled story section heading reads at ONE canonical rung (the `<StorySection>`
  register), and the D1 incongruence set (inverted scale, double-`<h1>`, duplicate titles,
  skipped/non-bold headings, wasted balance) is resolved at the chassis.
- **Mechanism:** add the canonical heading register to `<StorySection>`; migrate the bypassing
  stories; suppress the hero chrome-`<h1>`; demote the duplicate in-card titles; consistent-weight
  the `/display/card` `<h3>`s; size the wasted Default-tabs container.
- **Files:** the demo subset of the File Bounds table.
- **Sub-gate:** `proof:hierarchy` source arm GREEN (no off-canon section heading in the enrolled
  set) + the π readback proving uniform section-h2 size + no child > parent.

### AZ.W-HIERARCHY.2 The Configurator hierarchy vocabulary

- **Goal:** the Configurator controls column reads with deliberate hierarchy (section weight, label
  register, control rhythm) so the studios inherit a vocabulary, not a flat stack.
- **Mechanism:** mint `--configurator-section-size`/`--configurator-section-weight` (the section
  register, on `.configurator-section-label`) + the `ConfiguratorRow` primary/secondary label
  distinction + mint `--configurator-preset-row-weight` (the preset-row primary-affordance lift) —
  NOT the already-shipped `--configurator-row-gap-*` density ladder; proven on the aurora-configurator
  specimen.
- **Files:** the configurator + CSS + specimen subset of the File Bounds table.
- **Sub-gate:** `proof:hierarchy` Configurator-vocabulary asserts GREEN (the three named tokens
  declared + `--configurator-preset-row-weight` on the spatial padding/gap slot, not a font-weight) +
  the π readback proving the section label resolves above the control-row body rung AND the preset
  row's resolved block-padding resolves above a body `ConfiguratorRow`'s (the D6-3 cramped-row guard).

## §6 Hard Gate

1. **G1 — `npm run proof:hierarchy` (born-RED, source arm).** Parses the enrolled demo stories +
   the configurator primitives: (a) NO enrolled story `<section>` carries a `text-sm font-semibold
   text-muted-foreground` or page-title-duplicating `text-heading` section `<h2>`; (b) `StorySection`
   exposes the canonical `text-subheading`-keyed heading register; (c) the Configurator vocabulary's
   THREE NAMED tokens are declared and consumed: `--configurator-section-size` + `--configurator-section-weight`
   (the section register, on a `.configurator-section-label` the `ConfiguratorLayer` label composes —
   no longer the flat `text-small font-semibold`) + `--configurator-preset-row-weight` (the preset-row
   primary-affordance lift, consumed by `.configurator-presets`'s block-padding/gap — the SPATIAL
   rhythm slot, NOT a font-weight; D6-3's defect is the cramped preset row, so a font-weight
   consumption would green the assert while the "tight" defect lives). The gate asserts these THREE
   tokens by name + that `--configurator-preset-row-weight` lands on the padding/gap slot — NOT the
   already-shipped `--configurator-row-gap-*` density ladder (asserting that would pass
   vacuously since it predates this wave). Born-RED: FAILS on the pre-edit tree (the three section
   patterns are wired; the three vocabulary tokens do not exist) and passes after.
2. **G2 — `tests-visual/hierarchy.spec.ts` (π DELTA).** Live `:5199` readback across the
   worst-offender routes: every section `<h2>` resolves to `--type-subheading` (20.4px) NOT 14px/25.9px;
   no child `<h3>` resolves larger than its parent `<h2>`; the Configurator section label resolves
   above the control-row body rung; AND the Configurator preset row's resolved block-padding resolves
   above a body `ConfiguratorRow`'s (the D6-3 "preset row tight" defect-alive guard — `--configurator-preset-row-weight`
   drives the preset row's SPATIAL rhythm, not a font-weight). The captured paired-π + screenshots are
   the close DELTA artefact.
3. `vue-tsc --noEmit` + `npm run build` green; the enrolled routes render console-clean (no story
   errors over the load+settle window).

## §7 Format And Lint Cadence

`npm run typecheck` after each agent unit; `npm run build` to confirm the demo + `/styles` re-emit;
`git diff --check` for whitespace. Prettier on touched `.vue`/`.css`; ESLint on the configurator
SFCs. The π spec runs against a quiet `:5199` server (the W-GATES `:5199` convention).

## §8 Verification Artefacts

- `scripts/proof-hierarchy.mjs` output (born-RED→GREEN transcript).
- `tests-visual/hierarchy.spec.ts` paired-π JSON (the per-route section-h2 size readback +
  child-vs-parent check) + before/after screenshots of the worst-offender routes, saved under
  `docs/tranches/AZ/audit/visual/W-HIERARCHY-DELTA.md`.
- A before/after capture of the aurora-configurator specimen proving the section/label/rhythm
  hierarchy (the vocabulary the studios inherit).

## §9 Commit Plan

- Unit-1 commit: `fix(AZ): canonical section-heading rung on StorySection + resolve the D1
  incongruence set (W-HIERARCHY.1) — uniform text-subheading sections, no child>parent, no double-h1`.
  Body required (the enrolled story set + the structural double-`<h1>` suppression).
- Unit-2 commit: `feat(AZ): Configurator hierarchy vocabulary — section weight + label register +
  control rhythm (W-HIERARCHY.2); the studios inherit it`. Body required (the three registers +
  the studio-inheritance contract).
- Gate-row commit folds into the Batch-4 re-byte-lock.
- Doc/status commit at close (`CLAUDE.md`/PROGRESS).

## §10 Dependencies

- **Depends on:** W-GATES (`proof:all` runnable; the `:5199` convention).
- **Blocks:** W-BLOB-STUDIO + the aurora studio CONSUME the Configurator hierarchy vocabulary (they
  cite this wave as their hierarchy dependency — R3-8/R3-10/C6-10). W-SUFFUSE depends on this wave's
  `StoryPage.vue` chrome-`<h1>` edit landing first (the disjoint-line sequencing in §4a).

## §11 Archaeology

Prior attempt: the demo shipped a `<StorySection>` chassis (V.W4) + the `text-subheading` canonical
token + CLAUDE.md saying stories should compose them — but several pages bypassed both with
hand-rolled section `<h2>`s, so the canon existed on paper while the render stayed muddy. The new
guardrail is `proof:hierarchy` asserting the canonical rung is the ONLY section-heading register in
the enrolled set (a bypass re-introduction fails the gate), closing the "canon-on-paper /
muddy-in-render" gap the same way the glass-cohesion gate closed the glass-one-model gap.

## Successor for any deferral

The enrolled story set is the worst-offender subset (the routes the gate + π readback walk). The
LIBRARY-WIDE section-heading migration (all ~110 stories onto `<StorySection>`) is NAMED to a
W-CLOSE hygiene pass or a follow-on demo-chassis wave — NOT silently dropped; this wave proves the
mechanism + canon on the worst offenders, and the gate's enrolled-set assert prevents regression on
the migrated pages. If the Configurator vocabulary reveals a clean `ConfiguratorRow`↔`LabeledField`
chassis reconciliation (E2-4), that reconciliation is NAMED to W-METRIC-UNIFY (the labeled-row
reconcile), not folded here.
