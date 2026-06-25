# Pass-E Page Deep-Audit — foundations/overlays-scrims

- **Route:** `/foundations/overlays-scrims`
- **SFC:** `demo/stories/foundations/overlays-scrims.vue` (123 lines)
- **Manifest row:** `demo/stories/manifest.ts:516` (under `foundations`, blurb "Three scrim weights + ModalOverlay + motion / lift offsets.")
- **Background:** none declared → inherits `CATEGORY_DEFAULT_BG.foundations = "paper"` (`manifest.ts:182`)
- **Live spot-check:** desktop + dark mode, http://localhost:5173/foundations/overlays-scrims

## Verdict at a glance

This is one of the thinnest, most spec-sheet-flat pages in the storybook. It demos
THREE foundation token families (scrims, motion offsets, ModalOverlay) but exercises
ZERO live glass-ui components, has a DEAD token ladder, a section that is pure prose
with no demo, and renders glass-relevant content over a flat paper wash — never a live
aurora. It violates nearly every BD north-star bar.

---

## (1) DEMO CONGRUENCE — does it show components at their BEST + full API?

**FAIL — broadly.**

- **`<ModalOverlay>` is NEVER MOUNTED.** The page is literally titled around `ModalOverlay`,
  yet the component is never rendered. The "ModalOverlay primitive" section
  (`overlays-scrims.vue:80-83`) is a bare `<StorySection>` with a blurb and NO slot
  content — pure prose ("One `<ModalOverlay>` SFC backs the dialog, sheet, and confirm
  scrims… Compose `<ModalOverlay tier='strong' />` for the destructive variant"). The
  scrim cells (`:52-62`) hand-roll a `<div class="scrim-overlay" :class="row.cls" />`
  painting a `bg-[var(--overlay-scrim-*)]` token directly — they do NOT instantiate the
  real `ModalOverlay` SFC. So the page that exists to demo the overlay primitive shows
  the token color of its scrim, never the primitive itself, never its `tier` API, never
  an enter/exit animation, never a real backdrop-blur composite.

- **No `<Dialog>` / `<Sheet>` / `<Popover>` / `<ConfirmDialog>` in action.** The scrim is
  the BACKDROP of a modal. The single most congruent demo — open a real Dialog/Sheet over
  the live page so the scrim dims a REAL backdrop and the panel springs in — is entirely
  absent. There is no clickable "open dialog" affordance anywhere. The `--motion-slide-*`
  / `--lift-*` / `--popover-offset` tokens (`:34-42`) literally DRIVE those enter/exit
  transitions, and the demo never shows one firing.

- **The contextual-switching / dock APIs are not leveraged at all** (the BD ask: "leverage
  the dock APIs (contextual switching/animating)"). A natural fit here: a `<DockStack>` or
  tabbed dock switching between scrim-weight / motion / overlay registers, or a dock that
  triggers each overlay variant. None present.

## (2) COMPONENT ABILITY — deft series of glass-ui components, or thin/flat?

**FAIL — the page composes ZERO library components.** It uses only demo-chassis primitives
(`StoryPage`, `StorySection`, `ShowcaseFrame`, `TokenLadder`) plus hand-rolled `<div>`s.
Not a single `@mkbabb/glass-ui` runtime component is mounted. For a page in the band that
is supposed to "deftly use a series of glass-ui components (docks / procedural-anims /
cards / tabs / buttons)", this is the floor: it is a static token color-chart + a dead
numeric list + a paragraph.

## (3) GLASS SUFFUSION — live colorful field, or flat?

**FAIL.** The page background is the foundations-default flat `paper` wash — no aurora, no
procedural field. The scrim cells DO paint over a local vivid gradient (`.scrim-stage`,
`:105-115`, radial `--section-color-0/-7` + `linear-gradient(--section-color-3,-10)`),
which is the right instinct for the scrim contrast — BUT:
  - it is a STATIC CSS gradient, not a live animated aurora;
  - the scrim is a flat `<div>` dim, not a GLASS surface over the field, so the six-layer
    Liquid-Glass composite (blur+saturate · tint · rim · catch-light · shadow · grain) is
    never demonstrated. A scrim/overlay page is the canonical place to show a glass PANEL
    floating over a live field while the scrim dims everything behind it.
  - No PAPER morphism specimen either, despite foundations being the paper band.
The "glass demos over COLORFUL aurora" bar is unmet.

## (4) STRUCTURE — own glassy cards? main card big enough?

**FAIL on the "own card per sub-section" bar; PARTIAL on size.**

- All three sub-sections live INSIDE the single shared `StoryPage` body card
  (`.story-sections`, delimited only by hairline rules — `StoryPage.vue:166-177`). They are
  NOT each in their OWN glassy card. The BD ask ("each sub-section in its OWN glassy card")
  is unmet — it is one card with `<hr>`-style seams.
- Card area: the article is 1152px (`--story-page-max-inline`), the body card fills it.
  Adequate width, but the content is so sparse (a 3-cell color row + 7 dead text rows + a
  paragraph) that the "BIGGER main card, more screen space" intent reads as wasted space,
  not generous space — there is little content to fill a bigger area. Bigger only helps once
  the sub-sections become real interactive demos.

## (5) PATH-LABEL standardization

**PASS.** The chrome header renders the Fira-Code subpath chip `/foundations/overlays-scrims`
(verified live, top-left under the eyebrow), resolved from `manifest.ts:215`
(`"foundations/overlays-scrims": "/foundations/overlays-scrims"`). Correct route-path form
for a non-import foundations page. No standardization defect.

## (6) LANGUAGE — superfluous prose to tighten?

- `overlays-scrims.vue:49` scrim blurb is long and over-explains the staging rationale
  ("…so each dim reads as the backdrop-darkening it is — not over a same-tone plate where the
  dim has nothing to dim"). The "not over a same-tone plate…" clause is internal-rationale
  leakage; tighten to the user-facing fact.
- `:82` ModalOverlay blurb mixes prose + a code recipe; once a live overlay is mounted the
  prose recipe is redundant.
- Header comment block `:1-9` and the `.scrim-stage` comment `:102-104` are fine (dev docs).

## (7) BUGS

- **DEAD TOKEN LADDER (the headline bug).** `overlays-scrims.vue:34-42` declares every
  `motionOffsets` row with `cls: ""`, and the ladder is given a FIXED
  `sample-class="size-3 rounded-full bg-primary"` (`:73`). `TokenLadder.vue:50` applies
  `row.cls` (empty) + the shared `sampleClass` to the sample cell — so all SEVEN rows render
  the IDENTICAL purple dot (confirmed live). The actual offset VALUE (`--motion-slide-sm/md/lg`,
  `--lift-sm/md/lg`, `--popover-offset`) is NEVER visualized — no bar length, no translate, no
  lift. The ladder demonstrates nothing; it is a styled text list of token names. (`TokenLadder`
  was built for typography/radii/shadows where `cls` carries the visual; here it is mis-applied
  with an empty `cls`, defeating its purpose.)
- **No-op "ModalOverlay primitive" section** — a `<StorySection>` with blurb and empty default
  slot (`:80-83`): renders a heading + paragraph and nothing else (a dead section).
- No console errors observed; the page is not broken, it is under-built.

---

## Recommended rebuild shape (north-star aligned)

1. Put each sub-section in its OWN glass card (`<Card surface="glass">` / `ShowcaseFrame`
   tier="field") floating over a LIVE `<Aurora>` (or `<DockStage>`-style shared offscreen-paused
   field), so the scrim-over-live-backdrop reads.
2. Make the scrim tour INTERACTIVE: mount real `<ModalOverlay tier="subtle|default|strong">`
   (or a real `<Dialog>`/`<Sheet>`/`<ConfirmDialog>`) over the live field with an "open" button,
   so the dim animates in and dims a real backdrop — exercising the actual primitive + its `tier`
   API + the enter/exit spring.
3. Replace the dead motion ladder with a LIVE motion specimen: animate a chip by each
   `--motion-slide-*` / `--lift-*` value (a play button replaying the slide-in / hover-lift), or
   bind each row's `cls` to a real translate/lift utility so the offset is VISIBLE.
4. Leverage a dock (contextual switching) to flip between scrim-weight / motion / overlay registers.
5. Compose a SERIES: card + tabs/dock + buttons (the open triggers) + a procedural field backdrop.
6. Tighten the two blurbs once the demos are live.
