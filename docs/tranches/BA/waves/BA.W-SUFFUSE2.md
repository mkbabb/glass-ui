# BA.W-SUFFUSE2 — the color identity spread within proportion (the per-category event map)

**Name**: W-SUFFUSE2 - category color identity + the display-ladder grade + the motion violet
**Opens after**: BA Batch 6 open (depends Batch 1 W-DARK-MATERIAL landed per BA invariant 5; depends Batch 5 W-ICON-CHIP landed — the `<IconChip>` pop vehicle ships first, EXECUTION-DAG §6); runs ‖ W-STAGE ‖ W-DEMO-AFFORDANCES ‖ W-FOURIER-STUDIO ‖ W-ANIMATE (Batch 6, disjoint file bounds — the story-BODY files this wave writes are NOT the chassis files W-STAGE owns nor the affordance/fourier files the siblings own)
**Agents**: 2 parallel (the per-category eyebrow/accent/pop spread across the four under-spent bands ‖ the motion-band single-violet pass + the proof:suffuse ledger enrollment + the gate)
**Hard gate**: `proof:suffuse2` (born-RED) — three falsifiable SOURCE witnesses (each enrolled category carries its ONE `--section-color-N` identity on eyebrow+accent-rail+one focal pop; the content-page chrome `<h1>` resolves one rung above the section `<h2>`; every motion-band page reads `--motion-accent` with NO surviving `--viz-fourier`/`--demo-hue` warm-red on a motion surface) + the `proof:suffuse` d1/d2/d3 LEDGER extended to the newly enrolled surfaces + the π getComputedStyle readback in BOTH modes + the `proof:ba-gestalt` verdict (BA invariant 4)
**Status**: SPEC

## Goal criterion

The house's color identity reads on EVERY enrolled category, not just the icons
reference: each category carries its ONE deliberate section-color event (eyebrow +
accent rail + one focal pop, within the one-color-event budget), the content-page
title dominates its page (the display ladder grades instead of cliffing from hero to
caption), and the motion band sings its single coherent violet — so a user walking
the demo reads a designed system suffused with proportioned color, never a monochrome
run punctuated by one colorful page.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the fleet's hierarchy/suffusion + icon-pops + fd-motion root-cause
anchors, not a blind re-diagnose (BA invariant 3 — re-opened ≠ rebuilt-blind). Before
touching a byte, the impl agent re-greps each anchor below at HEAD and confirms the
mechanisms still hold; if any cite has drifted (a paste already collapsed by W-ICON-CHIP,
the StoryPage rung already lifted by a sibling, a motion surface already de-redded), the
agent records the drift in PROGRESS and re-locates the mechanism — it does NOT re-invent
the diagnosis.

Grounding findings: **HS-2 [S1]** (`hierarchy-suffusion.md:64-93` — the display register is
binary hero=68px/content=26px, the content `<h1>` `text-heading` only 6px above the section
`<h2>`); **HS-4 [S2]** (`hierarchy-suffusion.md:122-144` — the 13-stop ramp paints in exactly
two places, every other content surface monochrome); **POP-1** (`icon-pops.md:24-31,73` — the
pop is RARE not suffused; the page-by-page pop map at `icon-pops.md:37-56` assigns each surface
its ONE event-vehicle); **FD-MOTION-VIOLET** (`fd-feedback-motion-compositions.md:144-185` — the
motion band reads as dim control panels; the violet is present but under-spent and NOT carried
across the band — reveal/underline/typewriter use neutral or `--viz-fourier` red); **FD-COMP-STANDARD**
(`fd-feedback-motion-compositions.md:240-246` — the compositions band is the BAR the weaker bands
are brought up to: a backdrop, a coherent color event, a glass chassis).
Captures: `audit/fleet/hs-*.png` (`hs-icons-dark.png`, `hs-paperglass-hero-dark.png`,
`hs-foundations-frontdoor-dark.png`), `audit/fleet/icon-pops-evidence/{icons-ref-light-pops.png,
forms-inputs-dark-flat.png, empty-states-dark.png}`, `audit/fleet/fd-motion-springs-dark.png`,
`audit/fleet/curve-picker-dark-full.png`.

The mechanism (confirmed at HEAD this authoring — every cite re-read this session):

1. **The 13-stop `--section-color-*` ramp is near-dead substrate (HS-4).** The ramp
   (`tokens/light-dark.css`, 13 stops confirmed `grep -c 'section-color-'` = 13, dual light/dark
   arms per the icon-pops lane) paints at full chroma in exactly TWO places: the icons-reference
   Pops row (`icons.vue:124-164`) and the `.section-label--tinted` eyebrow (`typography.css:501`,
   default `--section-color-7`). Every other content surface is monochrome warm-ink. The
   one-color-event rule (AZ.W-SUFFUSE) is being read as "zero events on most surfaces" rather than
   "ONE deliberate event per surface" — the visual-load-bearing invariant is met only by the single
   reference + the eyebrow. A source census (icon-pops.md): the chip recipe lives on 4 surfaces;
   ~60 of ~90 stories carry ZERO color events; ALL of `forms/*` (13 stories), ALL of `containers/*`
   (16 stories), most of `display/*`/`feedback/*` are monochrome.

2. **The content-page chrome `<h1>` does not dominate the section `<h2>` (HS-2).** `StoryPage.vue:56`
   renders the content-page chrome title as `<h1 class="text-heading">` — `text-heading` = `1.618rem`
   (25.9px, φ; `typography.css:136`). The section `<h2>` is `text-subheading` (20.4px). The title
   sits only ~6px / one weight-step above its sections — it does not dominate. CLAUDE.md's own
   StorySection note warns `text-heading` "duplicates the page title" — yet the page title IS
   `text-heading`, so the chassis collapses the two registers it warns against conflating. The next
   rung up is `text-title` = `2.058rem` (32.9px, φ^(3/2); `typography.css:137`), then
   `text-display-1` (`typography.css:138`, clamp to φ^2). **`StoryPage.vue` is W-STAGE's file bound**
   (EXECUTION-DAG §6 single-writer); this wave declares the exact rung as a literal-diff block
   W-STAGE applies on its behalf (Scope 5 + the §literal-diff block).

3. **The motion band reads dim + incoherent (FD-MOTION-VIOLET).** `--motion-accent` (`demo/demo.css:101`
   = `var(--viz-legendre)`, the violet `--section-color-7` twin, minted DEMO-LOCAL — the ppmycota
   purple HARD fence) fires on springs (the spring chip + playground dot, `springs.vue:243,279`) and
   curve-gallery (`curve-gallery.vue:228,240`) — and pops nicely. BUT the band is NOT coherent: the
   motion-violet is NOT carried across every motion page; `reveal`/`underline`/`typewriter` use
   neutral or `--viz-fourier` red (the fd-motion lane: "only springs + curve-gallery read
   `--motion-accent`"). The `proof:suffuse` LEDGER (`scripts/proof-suffuse.mjs:103`) already enrolls
   five motion surfaces on `--motion-accent`, but the spread is under-realized across the band's
   page set, and the springs page spends the violet too thinly (one small chip in a sea of grey —
   the one-color-event budget ALLOWS one family hue used GENEROUSLY).

4. **The `<IconChip>` pop vehicle ships (W-ICON-CHIP, Batch 5).** The pop primitive
   (`src/components/custom/icon-chip/IconChip.vue`, `@mkbabb/glass-ui` root barrel + `./icon-chip`
   subpath) owns the `color-mix(in oklab, var(--section-color-N) 25%, transparent)` backplate + the
   chip≤glyph ratio + the `duotone`/`bloom`/`reveal` axes. W-ICON-CHIP explicitly DEFERS the
   page-by-page SPREAD to THIS wave (`BA.W-ICON-CHIP.md:221-224` Do-NOT-touch: "the page-by-page pop
   SPREAD (forms eyebrows, the 16-story Containers category, the metric-demo `--chart-*` wiring) is
   W-SUFFUSE2's bound; this wave SHIPS the vehicle and collapses the EXISTING four pastes only").
   This wave consumes `<IconChip>` as the pop vehicle — NEVER an inline `color-mix(… section-color …)`
   re-paste (the W-ICON-CHIP W4 complete-consolidation floor must stay GREEN; a new inline paste here
   would re-break it).

RE-GROUND command set (run all; confirm each mechanism):

```
sed -n '64,93p'   docs/tranches/BA/audit/fleet/hierarchy-suffusion.md   # HS-2 the binary display register
sed -n '37,56p'   docs/tranches/BA/audit/fleet/icon-pops.md             # the page-by-page pop map (the binding assignment)
sed -n '56,56p'   demo/stories/StoryPage.vue                            # the content h1 text-heading rung (HS-2; W-STAGE diff target)
sed -n '136,138p' src/styles/typography.css                             # the rung values: heading 25.9 / title 32.9 / display-1 φ^2
sed -n '488,503p' src/styles/typography.css                            # .section-label--tinted (--section-label-accent default --section-color-7)
sed -n '1,30p'    demo/stories/compositions/math-paper.vue              # the border-l-[3px] section-accent rail GOLD STANDARD (sectionAccent var(--section-color-3))
sed -n '270,300p' demo/stories/compositions/settings.vue               # the working eyebrow precedent (--section-label-accent override)
grep -rn 'IconChip' src/components/custom/icon-chip                     # the W-ICON-CHIP vehicle (MUST exist — Batch 5 landed)
grep -rn 'viz-fourier\|demo-hue' demo/stories/motion                   # the warm-red survivors on the motion band (MUST drop)
sed -n '95,200p'  scripts/proof-suffuse.mjs                            # the LEDGER this wave ENROLLS the new surfaces into
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | HS-4 the ramp is near-dead | `tokens/light-dark.css` (13-stop ramp); `typography.css:501` (the sole eyebrow consumer); `icons.vue:124-164` (the sole full-chroma consumer) | the categorical jewel-tone ramp paints in TWO places; ~60/90 stories carry ZERO color events |
| 2 | HS-4 forms/containers monochrome | `demo/stories/forms/*` (13 stories), `demo/stories/containers/*` (16 stories) — all zero color events | the largest flat blocks; the under-spent category the pop map (`icon-pops.md:43`) names highest-leverage |
| 3 | HS-2 the thin title rung [S1] | `demo/stories/StoryPage.vue:56` (`<h1 class="text-heading">`, 25.9px); `typography.css:136-138` (heading/title/display-1 rungs) | the content title (26px) does not dominate the section `<h2>` (20px); the next rung is `text-title` 32.9px |
| 4 | FD-MOTION-VIOLET band incoherence | `motion/underline.vue:102` (carries violet); `motion/typewriter.vue:53` (carries); `motion/scroll-vt.vue` (carries); `motion/reveal.vue`, `motion/countup.vue`, `motion/animated-digit.vue` (neutral/red — NOT enrolled) | the violet is NOT carried across every motion page; `--viz-fourier` red survives on some motion surfaces |
| 5 | the eyebrow register precedent | `typography.css:493-503` (`.section-label--tinted` reads `--section-label-accent`); `settings.vue:279` (the per-page `--section-color-7` override) | the ONE-coherent-eyebrow knob already exists; this wave routes EACH category's `--section-color-N` through it per the map |
| 6 | the section-accent rail GOLD STANDARD | `math-paper.vue:5` (`sectionAccent = var(--section-color-3)`), `:19` (`border-l-[3px] pl-6`) | the calm-content rail idiom AZ.W-SUFFUSE + CLAUDE.md name as the model; the per-category identity reuses it |
| 7 | the pop vehicle (Batch 5) | `src/components/custom/icon-chip/IconChip.vue` (W-ICON-CHIP); `BA.W-ICON-CHIP.md:221-224` (the SPREAD deferred to this wave) | `<IconChip :section/:tone>` is the ONE focal-pop vehicle; NO inline `color-mix(… section-color …)` re-paste |
| 8 | the proof:suffuse LEDGER | `scripts/proof-suffuse.mjs:103` (the per-surface LEDGER), the d1/d2/d3 predicates | the one-event rule is machine-checked against a CLOSED ledger; a new-popped surface NOT enrolled passes vacuously (the under-enrollment guard) |

## The per-category identity map (the binding assignment — `icon-pops.md:37-56` + the section-color ramp)

Each enrolled CATEGORY gets its ONE `--section-color-N` identity, routed through THREE
register sites per page (the math-paper gold standard): (a) the **eyebrow** via
`.section-label--tinted` keyed off `--section-label-accent: var(--section-color-N)`;
(b) the **section-accent rail** (`border-l-[3px]` reading the same `--section-color-N`) on
the page's lead section; (c) **ONE focal pop** via `<IconChip :section="N">` on the page's
natural color axis (a section eyebrow glyph, a demo-card header glyph). The category→stop
assignment is a STABLE map (the icon-pops lane's "icons=rose, forms=teal, motion=violet"
read), recorded as gate facts so a future agent cannot smuggle a fourth hue onto an enrolled
page. The legitimately-monochrome surfaces STAY flat (the proportion fence).

| category (manifest id) | section-color stop | the ONE focal-pop vehicle | notes |
|---|---|---|---|
| `forms` (the 13 zero-event stories) | a cool stop (teal-class) | a section-eyebrow `<IconChip>` per section head; field controls stay ink | body-ink-untinted floor; the destructive-red error stays the FUNCTIONAL event (not a brand pop — they don't compete) |
| `containers` (the 16 zero-event stories — highest leverage) | a stable per-category stop | a leading glyph-chip on each demo CARD header (the empty-states model) | the richest under-spent block; ONE event per card |
| `data` (`table`/`data-table`) | a ledger stop | a section-color column-header glyph chip OR the grid underlay as the ONE event | a grid page may legitimately make the grid its ONE event, not a chip |
| `display` (`badge`) | the tone axis | surface the section-color tone as a documented variant axis | a pop that's also a teaching moment; `status-dot`/`pulse` STAY the thin-dot register (do not chip-ify) |
| `motion` (the band) | `--motion-accent` (the violet `--section-color-7` twin) | the violet as ONE generous event across EVERY motion page | Agent-unit 2 owns this; demo-local, the ppmycota HARD fence |
| `navigation` (`tabs`/`header-ribbon`/`carousel`) | a nav stop | a single section-accent on the active indicator (one event) | |
| MONOCHROME-LEGITIMATE (`icons` GRID, `typography` ladder, the curve TABLE, the substrate live-field pages) | — | STAY FLAT | reference surfaces; the icons Pops block is that page's ONE event; the field-behind-glass is the substrate pages' ONE event |
| MODEL (UNTOUCHED): `compositions/{hero,math-paper,auth-shell,empty-states,settings}` | already correct | — | the bar the weak bands are brought up to (FD-COMP-STANDARD) |

The category→stop literal map is recorded in `scripts/proof-suffuse2.mjs` as gate facts
(the W1 witness reads it). The impl agent picks the exact stop per category from the ramp's
13 jewel-tones, respecting the icon-pops lane's read (cool for forms, the existing violet
for motion, the warm `--tier-featured` gold reserved for a featured/recommended surface);
the choice is recorded in the DELTA + the gate map and is the BINDING per-page identity.

## Scope

1. **Route each enrolled category's `--section-color-N` identity through the three register
   sites** (the per-category map above): the eyebrow (`.section-label--tinted` keyed off a
   per-page `--section-label-accent: var(--section-color-N)` override, the `settings.vue:279`
   precedent), the section-accent rail (`border-l-[3px]` reading the same stop, the
   `math-paper.vue:19` gold standard), and ONE focal `<IconChip :section="N">` pop. The forms
   band (13 stories) + the containers band (16 stories) are the highest-leverage spread; the
   field controls + body copy STAY ink (the body-ink-untinted d1 floor).
2. **The focal pop is `<IconChip>` (W-ICON-CHIP), NEVER an inline re-paste.** Every focal pop
   composes `<IconChip :section="N" :icon="…">` from the landed Batch-5 primitive — no surface
   re-introduces an inline `color-mix(in srgb, var(--section-color-${…}) 25%, transparent)`
   (the W-ICON-CHIP W4 complete-consolidation floor stays GREEN). Where a category earns a
   richer pop, the `duotone`/`reveal` axes are used in proportion (one event, never a second hue).
3. **The motion band reads ONE coherent generous violet event per page** (Agent-unit 2). Every
   `/motion/*` page reads `--motion-accent` (the demo-local violet `--viz-legendre` twin) across
   its color channels — the under-enrolled pages (`reveal`, `countup`, `animated-digit`, and any
   page still on neutral/`--viz-fourier`) re-point onto `--motion-accent`; NO `--viz-fourier`/
   `--demo-hue` warm-red survives on a motion surface across the fill/stroke/background/color
   channels. The springs page spends the violet HARDER within proportion (the one-color-event
   budget allows one family hue used generously — the stage frame / slider tracks / overshoot
   meter may read it, NOT a second hue). The motion-violet stays DEMO-LOCAL — the ppmycota purple
   HARD fence (it NEVER enters library tokens; `--motion-accent` lives at `demo/demo.css:101`).
4. **The compositions MODEL surfaces stay UNTOUCHED** (`hero`/`math-paper`/`auth-shell`/
   `empty-states`/`settings`) — they are the bar (FD-COMP-STANDARD), already the one-color-event
   idiom done right; this wave brings the weak bands UP to them, never re-touches them. The
   monochrome-legitimate surfaces (icons GRID, typography ladder, curve TABLE, substrate live-field
   pages) STAY FLAT — adding color there violates proportion.
5. **The content-page chrome `<h1>` lifts ONE rung above the section register** (HS-2). Declare
   the literal-diff block lifting `StoryPage.vue:56` from `text-heading` (25.9px) to `text-title`
   (32.9px — the next √φ rung; the section `<h2>` stays `text-subheading` 20.4px) so the page title
   DOMINATES on every content page, the display ladder GRADES instead of cliffing. **`StoryPage.vue`
   is W-STAGE's file bound** (single-writer, EXECUTION-DAG §6) — this wave authors the literal-diff
   block (the §literal-diff block below), W-STAGE applies it verbatim. This wave's own gate asserts
   the rung is `text-title` at the source W-STAGE landed AND the π readback measures the content
   `<h1>` resolving above the section `<h2>` — the verification stays this wave's even though the
   edit lands via W-STAGE.
6. **Extend the `proof:suffuse` LEDGER to the newly enrolled surfaces** (the abstraction's gate
   dividend; modify-carve `scripts/proof-suffuse.mjs`). Each newly-popped category page is ENROLLED
   in the LEDGER with its ONE `{event-token, element-selector}` (the under-enrollment guard — a
   surface that gains a pop but is not enrolled passes the d3 count vacuously). The d1 body-ink
   floor holds (the pop tints ONLY the eyebrow + the chip glyph, never a sibling `<p>`/value/unit);
   the d2 chip≤glyph proportion is structural (enforced in `<IconChip>` per W-ICON-CHIP); the d3
   one-event count holds against the closed ledger. `proof:suffuse` stays GREEN post-spread.

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if a category's natural color axis cannot
  carry its event-vehicle within the one-color-event rule WITHOUT touching a MODEL composition or
  a monochrome-legitimate reference surface (e.g. the forms band needs a chip on a field control,
  which would tint the control register) — that is a scope-reveal; triumvirate (research the
  proportion-safe vehicle + plan-augment the map + redress), do NOT widen onto a fenced surface.
- **Hard-gate failures not local-edit-recoverable**: if the π readback shows the spread reads as a
  RAINBOW on a page (a second tinted event family slipped onto an enrolled surface — the d3 break)
  OR a category's chosen stop is illegible against its dark-arm backdrop after the W-DARK-MATERIAL
  substrate (the chip/eyebrow drops below contrast) — that is a register-design miss; triumvirate,
  do not loop on stop values.
- **The StoryPage literal-diff conflict**: if the h1-rung literal-diff block (Scope 5), applied by
  W-STAGE, conflicts with W-STAGE's own chassis edits OR W-ANIMATE's entrance-hook diff on the same
  line — that is a coordination scope-reveal (the W-STAGE §Triumvirate already names it); triumvirate
  to reconcile the three diffs into one, do NOT fork the chassis file or drop a sibling's block.
- **Diagnostic loop halt**: if after enrolling a surface the `proof:suffuse` d3 count still fails
  and three iterations have not isolated which channel carries the second event (a `bg-`/`fill`/
  `stroke` channel-swap the count must catch), halt and triumvirate (the full-paint-channel count
  is the suspect — the AZ.W-SUFFUSE channel-swap evasion class).

## File Bounds

| File | Access |
|---|---|
| `demo/stories/forms/*.vue` (the 13 forms stories — section eyebrows + ONE focal `<IconChip>` per page) | modify |
| `demo/stories/containers/*.vue` (the 16 containers stories — leading demo-card glyph-chip per page) | modify |
| `demo/stories/data/table.vue`, `demo/stories/data/data-table.vue` (the ledger column-header pop or grid-as-event) | modify |
| `demo/stories/display/badge.vue` (surface the section-color tone variant axis) | modify |
| `demo/stories/navigation/{tabs,header-ribbon,carousel}.vue` (the active-indicator section-accent) | modify |
| `demo/stories/motion/{reveal,countup,animated-digit}.vue` + any motion page on neutral/`--viz-fourier` (the violet re-point) | modify |
| `demo/stories/motion/springs.vue` (spend the violet harder within proportion) | modify |
| `scripts/proof-suffuse.mjs` | modify-carve (enroll the newly-popped surfaces in the LEDGER; the d-checks unchanged in shape) |
| `scripts/proof-suffuse2.mjs` | create (the born-RED gate — the per-category map + the h1-rung + the motion de-red witnesses) |
| `package.json` | modify (register `proof:suffuse2` + add to `proof:all`/parity) |
| `scripts/gates.mjs` | modify (register the gate row) |
| `tests-visual/suffuse2.spec.ts` | create (the π getComputedStyle readback — the binding visual truth) |
| `CLAUDE.md` | modify (record the per-category identity map in the Suffusion register section) |

**The StoryPage h1-rung literal-diff block** (Scope 5) is authored HERE (the §literal-diff
block) and applied by W-STAGE on this wave's behalf — `demo/stories/StoryPage.vue` is W-STAGE's
file bound, NOT this wave's modify list. The π verification of the rung stays this wave's gate.

Do NOT touch:
- **`demo/stories/StoryPage.vue` / `StoryHero.vue` / `StorySection.vue` / `ShowcaseFrame.vue` /
  `story-hero.css` / `demo/stories/manifest.ts`** — the story CHASSIS files are W-STAGE's single-writer
  bound (EXECUTION-DAG §6). This wave's h1-rung change is a literal-diff block W-STAGE applies; this
  wave never writes a chassis file.
- **`demo/stories/foundations/icons.vue` / `compositions/empty-states.vue` / `compositions/auth-shell.vue`
  / `src/components/custom/metric-cell/MetricCell.vue`** — the FOUR existing chip-paste sites are
  W-ICON-CHIP's bound (Batch 5, landed); this wave consumes the primitive on NEW surfaces, never
  re-touches the collapsed pastes.
- **`src/components/custom/icon-chip/*` / `src/styles/icon-chip.css`** — the `<IconChip>` primitive is
  W-ICON-CHIP's bound; this wave CONSUMES it, never edits it. A new richness axis the spread wants is
  a W-ICON-CHIP scope-reveal, not a fork here.
- **The compositions MODEL surfaces** (`hero`/`math-paper`/`auth-shell`/`empty-states`/`settings`) —
  the bar (FD-COMP-STANDARD), UNTOUCHED. `settings.vue` already composes the eyebrow accent (the
  precedent this wave reads, never re-edits).
- **`demo/stories/motion/curve-gallery.vue`** — its curve-family PICKER re-conception is
  W-DEMO-AFFORDANCES's bound (the chip-rack, EXECUTION-DAG §6); this wave's motion-violet pass reads
  the page's accent but does NOT re-conceive the picker (coordinate: if the violet re-point on
  curve-gallery touches the same lines W-DEMO-AFFORDANCES rewrites, defer to its picker rebuild —
  it already carries the violet at `:228,240`).
- **`demo/stories/motion/scroll-vt.vue` / `typewriter.vue` / `underline.vue`** already carry
  `--motion-accent` (RE-GREP confirms); touch only if a survivor red remains.
- **`src/styles/tokens/light-dark.css` / `dark-arm.css` / `typography.css`** — the `--section-color-N`
  ramp + `.section-label--tinted` register + the type rungs are W-DARK-MATERIAL's / the library's
  bound; READ, never re-tuned. The h1 rung is a per-call class swap (`text-heading`→`text-title`),
  NOT a ladder-value edit.
- The standing fences: the GL shader internals (aurora.frag/metaball.frag); ppmycota purple NEVER
  enters library tokens (the motion-violet `--motion-accent` stays demo-local at `demo/demo.css`);
  the slides `docs/tranches/M/` docs are foreign.

### Disjointness

Two agent units, PARALLEL, with disjoint modify sets:
- **W-SUFFUSE2.1** writes the four UNDER-SPENT bands (`forms/*`, `containers/*`, `data/{table,data-table}`,
  `display/badge`, `navigation/{tabs,header-ribbon,carousel}`) + authors the h1-rung literal-diff
  block (no file write — a markdown block W-STAGE applies).
- **W-SUFFUSE2.2** writes the `motion/*` band (the single-violet pass + springs-harder) + the gate
  surfaces (`scripts/proof-suffuse2.mjs` create, `proof-suffuse.mjs` modify-carve, `package.json`,
  `gates.mjs`, `tests-visual/suffuse2.spec.ts`, `CLAUDE.md`).

The two sets are path-disjoint (unit 1 = the non-motion bands; unit 2 = the motion band + the
gate/ledger/docs). No file is written by both. Across Batch 6: W-STAGE owns the chassis files +
manifest (this wave reads, never writes — the h1-rung is a literal diff W-STAGE applies);
W-DEMO-AFFORDANCES owns `curve-gallery.vue` + `toaster.vue` + the hand-rolled-plate stories +
`src/styles/glass/surfaces.css` (this wave does not write them); W-FOURIER-STUDIO owns
`fourier-field.vue` + the fourier-field component (disjoint); W-ANIMATE owns `AppShell.vue` + the
data-attribute wiring (its chassis-hook is a literal diff W-STAGE applies, not a write here). No
Batch-6 sibling writes any path this wave writes.

## Agent Units

### BA.W-SUFFUSE2.1 the per-category color identity across the four under-spent bands + the h1-rung diff

- Goal: each enrolled non-motion category (forms, containers, data, display, navigation) reads its
  ONE `--section-color-N` identity on eyebrow + section-accent rail + one focal `<IconChip>` pop, the
  body ink untouched, the chip the ONE event per surface; and the content-page chrome `<h1>` lifts one
  √φ rung above the section register.
- Mechanism: per the per-category map, on each enrolled page set a per-page `--section-label-accent:
  var(--section-color-N)` (the eyebrow tint, the `settings.vue:279` precedent) + a `border-l-[3px]`
  section-accent rail reading the same stop (the `math-paper.vue:19` gold standard) + ONE focal
  `<IconChip :section="N" :icon="…">` (the W-ICON-CHIP vehicle — NO inline re-paste). The forms band's
  field controls + body copy stay ink (d1). The containers band gets a leading demo-card glyph-chip
  (the empty-states recipe applied via the primitive). Author the StoryPage h1-rung literal-diff block
  (`text-heading`→`text-title`) for W-STAGE to apply. Monochrome-legitimate surfaces stay flat; MODEL
  compositions untouched.
- Files: `demo/stories/forms/*.vue`, `demo/stories/containers/*.vue`, `demo/stories/data/{table,data-table}.vue`,
  `demo/stories/display/badge.vue`, `demo/stories/navigation/{tabs,header-ribbon,carousel}.vue` (the
  h1-rung diff is a markdown block, no file write).
- Sub-gate: the gate's W1 witness — each enrolled non-motion category carries its `--section-color-N`
  on eyebrow + accent-rail + one `<IconChip :section="N">` (source-asserted against the per-category
  map), NO inline `color-mix(… section-color …)` re-paste survives (the W-ICON-CHIP W4 floor holds),
  AND the π readback shows the category's eyebrow + rail + chip resolving to the SAME stop in BOTH
  modes; the W2 h1-rung witness — the literal-diff block is authored + the rung is `text-title`.

### BA.W-SUFFUSE2.2 the motion-band single-violet pass + the proof:suffuse ledger enrollment + the gate

- Goal: every `/motion/*` page reads ONE coherent generous `--motion-accent` violet event with NO
  surviving warm-red on a motion surface, the springs page spends the violet harder within proportion,
  and `proof:suffuse` + the new `proof:suffuse2` gate hold against the enrolled surfaces.
- Mechanism: re-point the under-enrolled motion pages (`reveal`, `countup`, `animated-digit`, any
  survivor) onto `--motion-accent`; remove every `--viz-fourier`/`--demo-hue` warm-red on a motion
  surface across fill/stroke/background/color channels; spend the violet harder on springs (stage frame
  / slider tracks / overshoot meter, one family hue, NOT a second). Carve `proof-suffuse.mjs` to ENROLL
  the newly-popped surfaces in the LEDGER (the under-enrollment guard); author `proof-suffuse2.mjs` (the
  per-category-map + h1-rung + motion-de-red witnesses) + `tests-visual/suffuse2.spec.ts` (the π
  readback) + register in `package.json`/`gates.mjs`; record the map in `CLAUDE.md`.
- Files: `demo/stories/motion/{reveal,countup,animated-digit,springs}.vue` + any survivor-red motion page,
  `scripts/proof-suffuse.mjs` (modify-carve), `scripts/proof-suffuse2.mjs` (create), `package.json`,
  `scripts/gates.mjs`, `tests-visual/suffuse2.spec.ts` (create), `CLAUDE.md`.
- Sub-gate: the gate's W3 witness — every `/motion/*` page references `--motion-accent` AND the negative
  predicate `grep -rn 'viz-fourier\|demo-hue' demo/stories/motion` returns ZERO on a paint channel
  (source-asserted) AND the π readback shows the band reading ONE coherent violet in BOTH modes;
  `proof:suffuse` GREEN against the extended LEDGER; the motion-violet stays demo-local (no
  `--motion-accent` value reaches `src/styles/`).

## The StoryPage h1-rung literal-diff block (authored here, applied by W-STAGE — EXECUTION-DAG §6)

This wave OWNS the rung decision; `demo/stories/StoryPage.vue` is W-STAGE's single-writer file
bound. The block below is the verbatim edit W-STAGE applies on this wave's behalf (the AZ
literal-markdown-block triumvirate idiom). The content-page chrome `<h1>` lifts from `text-heading`
(25.9px, φ — only 6px above the section `<h2>`) to `text-title` (32.9px, φ^(3/2) — the next √φ rung,
so the page title DOMINATES and the display ladder grades instead of cliffing). The section `<h2>`
stays `text-subheading` (20.4px); the D1-4 double-`<h1>` suppression (`variant === 'page'` guard) is
PRESERVED.

```diff
--- a/demo/stories/StoryPage.vue
+++ b/demo/stories/StoryPage.vue
@@ the chrome <h1> on a content (variant="page") page — HS-2: lift one √φ rung
-                <h1 v-if="title && variant === 'page'" class="text-heading">
+                <!-- HS-2 (BA.W-SUFFUSE2): the content-page title lifts ONE √φ rung
+                     (text-heading 25.9px → text-title 32.9px) so it DOMINATES the
+                     section <h2> (text-subheading 20.4px) — the display ladder
+                     GRADES instead of cliffing. The D1-4 double-<h1> suppression
+                     (the variant==='page' guard) is preserved. -->
+                <h1 v-if="title && variant === 'page'" class="text-title">
                     {{ title }}
                 </h1>
```

## Hard Gate

`proof:suffuse2` (born-RED at HEAD, driven GREEN by the wave) — falsifiable SOURCE witnesses (the
comment-strip + pure-detector house pattern, mirroring `proof-suffuse.mjs`/`proof-dock-unify.mjs`),
each red at HEAD pre-wave:

1. **W1 — each enrolled category carries its ONE section-color identity on three sites.** For every
   category on the per-category map (recorded as gate facts), the enrolled page set carries (a) a
   per-page `--section-label-accent: var(--section-color-N)` eyebrow override, (b) a `border-l-[3px]`
   section-accent rail reading the same `--section-color-N`, and (c) at least one `<IconChip :section="N">`
   focal pop — all on the SAME stop. RED at HEAD: the forms/containers/data/display/navigation bands carry
   ZERO color events (`grep section-color` on those story dirs returns the eyebrow-only/empty set).
   **Bite-tightening (anti-evasion):** the assert is POSITIVE per-category — the eyebrow accent, the rail,
   and the chip all reference the category's MAPPED stop (a page that tints the eyebrow but not the rail,
   or uses a different stop per site, FAILS — the identity must be coherent, not a single sprinkle); AND
   no inline `color-mix(in srgb, var(--section-color-${…}) 25%, transparent)` paste survives outside
   `icon-chip/` (the W-ICON-CHIP W4 floor — the focal pop is the primitive, never a re-paste).
2. **W2 — the content-page chrome `<h1>` is one rung above the section register.** The StoryPage chrome
   `<h1>` (the `variant === 'page'` arm) resolves to `text-title` (32.9px) — strictly ABOVE the section
   `<h2>` `text-subheading` (20.4px). RED at HEAD: `StoryPage.vue:56` is `text-heading` (25.9px). The
   source half asserts the rung class is `text-title` (the W-STAGE-applied literal diff); the assert names
   the rung as the next √φ step, NOT merely "≠ text-heading" (a regress to `text-subheading` is also ≠
   `text-heading` but moves the WRONG way — the bite is the POSITIVE `text-title`/`text-display-1` step).
   The π half (W4) is the binding floor — the rendered `<h1>` font-size resolves above the `<h2>`.
3. **W3 — the motion band reads ONE coherent violet, no warm-red survivor.** Every `/motion/*` page
   references `--motion-accent` (the demo-local violet) AND the negative predicate — no `--viz-fourier`/
   `--demo-hue` warm-red on a motion-page paint channel (`color:`/`background[-color]:`/`fill:`/`stroke:`
   or the Tailwind arbitrary forms) — holds. RED at HEAD: `reveal`/`countup`/`animated-digit` carry no
   `--motion-accent` (neutral/red). **Bite-tightening:** the negative predicate counts ALL paint channels
   (not only `color:`/`stroke-`), so a channel-swapped red (a `bg-[var(--viz-fourier)]`) is caught; AND
   the motion-violet stays demo-local — the assert confirms NO `--motion-accent` literal reaches
   `src/styles/` (the ppmycota HARD fence, BA scope fence).
4. **The proof:suffuse LEDGER is extended + holds.** `proof:suffuse` (d1 body-ink-untinted, d2 chip≤glyph,
   d3 ≤1 event family per surface) is GREEN against the EXTENDED LEDGER — every newly-popped category page
   is ENROLLED (the under-enrollment guard: a surface with a pop but not in the ledger fails d3 vacuously,
   so the carve must enroll each). RED at HEAD: the new surfaces are unenrolled (the d3 count would pass
   vacuously OR a re-paste would break d2). The assert: the LEDGER's enrolled count ≥ the per-category map's
   enrolled-page count, and `proof:suffuse` exits 0.
5. **The π binding readback** (the cardinal-lesson DELTA, captured own-surface): a live capture at `:5199`
   in BOTH modes across a representative enrolled page per band (a forms page, a containers page, a data
   page, a motion page) with a paired π `getComputedStyle` readback proving (a) the page's eyebrow + rail +
   chip resolve to the SAME `--section-color-N` (the POSITIVE per-category token test, not a `≠`-string),
   (b) the content `<h1>` font-size resolves strictly above the section `<h2>` (the rung grade), (c) the
   motion band reads ONE coherent `--motion-accent` violet with no warm-red, and (d) NO page reads as a
   rainbow (≤1 tinted event family per surface — the d3 proportion at render). Captured to
   `docs/tranches/BA/audit/visual/W-SUFFUSE2-DELTA.md` with before/after frames against the
   `hs-icons-dark.png` / `forms-inputs-dark-flat.png` / `fd-motion-springs-dark.png` baselines. **The π
   half is the binding visual truth — if the source half passes but a live page reads monochrome
   (the identity did not take) or rainbow (a second event slipped in), the wave does NOT close.**

W1-W4 are the device-free CI half (`proof:suffuse2` + `proof:suffuse`); the π readback is the binding
visual truth (a source-green/visually-broken gap is the exact AZ/P-1 failure class).

**THE GESTALT BAR (BA invariant 4 — the P-1 close-class fix).** Per-mechanism greens alone do NOT close
this visual wave. The enrolled band pages are captured WHOLE-PAGE, BOTH modes, over their real backdrop
(the W-STAGE substrate, the W-DARK-MATERIAL register), and judged as a gestalt ("does the storybook read
as a colored SYSTEM — icons=rose, forms=teal, motion=violet — within proportion, no rainbow, body ink
clean?") — recorded against `proof:ba-gestalt` (W-GESTALT-GATE's roster). A wave whose `proof:suffuse2`
passes but whose pages read monochrome or rainbow closes `complete_with_misses`, not `complete`. The
binding gestalt verdict is re-confirmed at W-REFLECT2.

## Format And Lint Cadence

`npm run typecheck` after the story-body edits (the `<IconChip>` imports resolve);
`node scripts/proof-suffuse2.mjs` born-RED before the source edits (proof it fails at HEAD), GREEN at
close; `npm run proof:suffuse` GREEN after the LEDGER carve (the d1/d2/d3 hold against the extended
ledger); `npm run proof:gate-script-parity` after the package.json/gates.mjs registration; `git diff
--check` before close.

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-SUFFUSE2-DELTA.md` — before/after frames per band (a forms / containers
  / data / motion page) in BOTH modes + the paired π readback (the per-category eyebrow+rail+chip stop
  identity, the h1-vs-h2 font-size grade, the motion-band single-violet, the ≤1-event-family d3) against
  the `hs-icons-dark.png` / `forms-inputs-dark-flat.png` / `fd-motion-springs-dark.png` baselines.
- The `proof:suffuse2` JSON artefact (born-RED log + GREEN-at-close log).
- The `proof:suffuse` GREEN log post-LEDGER-carve (the d1/d2/d3 against the extended ledger).
- The gate-script-parity output post-registration.

## Commit Plan

- impl commit (unit 1): `feat(demo): per-category section-color identity — eyebrow+accent-rail+IconChip pop across forms/containers/data/display/navigation (BA.W-SUFFUSE2)` — names the per-category map + the three register sites + the `<IconChip>` vehicle in the body.
- impl commit (unit 2): `feat(demo): the motion band reads ONE coherent --motion-accent violet — under-enrolled pages re-pointed, warm-red retired, springs spent harder (BA.W-SUFFUSE2)` — names the de-red + the demo-local fence in the body.
- coordination note: the StoryPage h1-rung literal-diff block is applied by W-STAGE (named as applied-on-behalf in W-STAGE's coordination commit).
- gate commit: `test(suffuse): proof:suffuse2 born-RED→GREEN + the suffuse LEDGER extension + parity registration`.
- doc/status commit: the CLAUDE.md per-category identity map (the Suffusion register section) + the DELTA doc + PROGRESS row.

## Dependencies

- **Depends on**: **W-ICON-CHIP** (Batch 5, landed — EXECUTION-DAG §6) — the `<IconChip>` primitive is the
  focal-pop vehicle; this wave consumes it and never re-introduces an inline `color-mix(… section-color …)`
  paste (the W-ICON-CHIP W4 complete-consolidation floor stays GREEN). **W-DARK-MATERIAL** (Batch 1,
  landed — BA invariant 5) — the `--section-color-N` dual light/dark arms are the substrate the eyebrow +
  rail + chip read (the pop is mode-robust by construction); this wave READS those arms, never re-tunes
  them. **W-STAGE** (parallel sibling, the chassis single-writer) — applies this wave's h1-rung
  literal-diff block on `StoryPage.vue` (scope 5; the AZ literal-markdown idiom, EXECUTION-DAG §6). The
  per-category backgrounds W-STAGE stages are the real backdrop the gestalt capture judges over.
- **Blocks**: **W-REFLECT2** (Batch 7) — the gestalt reflection re-walks the enrolled band pages and
  re-confirms the per-category identity verdict; **W-CLOSE** (Batch 7) — the `proof:suffuse2` + extended
  `proof:suffuse` battery green on a clean runner is a close precondition.

## Named successors

- **The data/table grid-as-event vs column-chip decision** — if the π readback shows a column-header
  glyph chip competes with the grid underlay (two events on the ledger page), the data tables fall back to
  the grid-as-the-ONE-event arm (the icon-pops map names both — `icon-pops.md:47`); the chosen arm is
  recorded in the DELTA, and a residual table-pop is a named carry to W-REFLECT2, not a forced second event.
- **The richer-pop axes (duotone/bloom/reveal) per category** — this wave uses `<IconChip>`'s axes in
  proportion where a category earns a richer pop; a category whose richer-axis demand exceeds the
  primitive's shipped axes (a net-new axis) is a W-ICON-CHIP scope-reveal (a successor primitive edit),
  NOT a fork here — booked to a successor, never inline-pasted.

## Archaeology

Prior attempt: AZ.W-SUFFUSE enrolled the HIGH-LEVERAGE pop subset (the motion category onto
`--motion-accent`, the settings eyebrows de-noised onto `.section-label--tinted`, the metric glyphs) and
explicitly NAMED the library-wide breadth to a W60-class successor (the D4-2 "~104/121 routes flat" scope
limit). The icon-pops + hierarchy-suffusion lanes are that successor's under-spent half: the ramp paints
in two places, ~60/90 stories carry zero events, and the content-page title does not dominate. The new
guardrails over W-SUFFUSE: (1) the focal pop is now a COMPONENT (`<IconChip>`, W-ICON-CHIP) so the
one-event rule is structurally easy and a re-paste cannot drift the recipe per surface; (2) the per-category
identity is a MAP recorded as gate facts (a future agent cannot smuggle a fourth hue onto an enrolled page);
(3) the LEDGER under-enrollment guard (a newly-popped surface NOT enrolled fails d3) closes the
"vacuous-pass" class W-SUFFUSE's narrow enrollment left open; (4) the gestalt bar (BA invariant 4) judges
the storybook AS a colored system, not a per-mechanism green — the AZ source-green/visually-broken gap may
not recur.
