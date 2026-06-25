# substrates/blob — FRONTEND-DESIGN deep critique (Pass-E)

**Page:** `demo/stories/substrates/blob.vue` · live `http://localhost:5173/substrates/blob`
**Lens:** world-class frontend-design critique against DESIGN.md (iOS-26/27 Liquid Glass), the
design-idioms / motion-canon / affordance-map precepts, PROCEDURAL-SUITE.md, and the user's
BD north-star bars. Captured at 1440×900 desktop, light mode, live Chrome (devtools-mcp).

---

## VERDICT FIRST — this page is currently BROKEN, not merely under-designed

Before any taste argument: three load-bearing defects make this page fail its own premise. A
critique of hierarchy/spacing/color is moot until the hero actually paints. These are P0.

1. **The hero GooBlob does not render.** The "living lit GL bead" the entire IA is built around
   (the SFC header comment: "LEAD with the LIVING lit GL bead … satellites visibly cycling on
   mount") paints **nothing**. Live readback: the `.goo-blob-canvas` drawing buffer is stuck at
   the default **300×150** (the CSS box is 768×768) and `gl.readPixels` at center returns
   `[0,0,0,0]` (transparent black) across three consecutive frames. The full-page screenshot
   shows the stage as a **flat gray rectangle**. The STAGE-1 plain-blob card below it is **empty
   cream**. The page's reason to exist — a procedural metaball you tune live — is invisible. No
   console WebGL error; this reads as a substrate sizing/ResizeObserver failure (likely entangled
   with the broken sticky header overlapping the stage, see #2). **Nothing else matters until this
   paints.** (PROCEDURAL-SUITE: the GooBlob is the rank-2 viz; it must read as the lit cream
   droplet with orbiting satellites, the metaball orbit→merge→absorb→emerge show.)

2. **TWO page titles fight, and the sticky one is broken.** The StoryPage chassis renders an
   `<h1>` **"GooBlob"** (`position: sticky; top: 38px`) AND the SFC renders its own `<header>`
   with a violet `text-display-3` **"Blob Studio"**. Two titles, two eyebrows ("SUBSTRATES ·
   GOOBLOB" + "SUBSTRATES · BLOB STUDIO"), two descriptors. Worse: the sticky "GooBlob" never
   collapses — it stays **194px tall** and scrolls down the page as a **black mass overlapping the
   WatercolorDot swatches, the blurb copy, and the Configurator** (captured mid-page, the word
   "GooBlob" sitting on top of body text). This violates the chassis's own `.story-hero-shrink`
   iOS-27 large-title-collapse contract (StoryPage.vue) and the W-HIERARCHY2 "ONE ordered cluster,
   descriptor shown ONCE" rule. The SFC should NOT hand-roll a second `<header>` — it duplicates
   what the chassis already provides, and on a hero page the chassis suppresses its chrome header,
   so the SFC's manual one is the redundant fork.

3. **No background. The page is dead-flat cream.** Live DOM check: the only canvases are the two
   `goo-blob-canvas` — there is **no aurora/constellation background canvas**, and the scroller
   background is `rgba(0,0,0,0)` over a flat cream page. The user's explicit BD bar — *"glass demos
   over COLORFUL aurora backgrounds"* — is entirely unmet. The substrate-category manifest default
   is `aurora` (CLAUDE.md §W-STAGE `CATEGORY_DEFAULT_BG`), but this route paints flat. A glass demo
   page with no kinetic backdrop has nothing for the glass to refract — DESIGN.md §L1: *"glass
   blur is imperceptible over a flat substrate (nothing behind to blur)."* The whole point of a
   **substrate** showcase is the live field; this page shows the field's absence.

---

## VISUAL HIERARCHY — the eye lands on the wrong thing, twice

- **The display ladder is mis-applied, not absent.** The chassis "GooBlob" title is a true
  `text-display-4`-scale audacious word (good — DESIGN.md §Typography √φ ladder), but it's the
  WRONG word: it reads "GooBlob" (the dist subpath identity) while the SFC insists the page is
  "Blob Studio." Pick ONE name. The audacious ladder is the page's strongest asset and it's
  squandered on a naming collision.
- **The eye lands on a gray void.** With the hero not painting, the largest on-screen object below
  the title is a flat gray rectangle (the dead stage). The visual climax of the page is an error
  state. Even fixed, the current IA buries the climax: the user must scroll past a full-viewport
  title + blurb before the bead appears.
- **The studio's internal hierarchy is sound on paper** (Interaction → Mood+palette → Surface →
  Geometry, `dividers` on each layer, the AZ.W-HIERARCHY section-weight register) — but it's
  drowned because the Configurator chrome sits in a single `quiet`-tier ShowcaseFrame that is
  visually **larger and louder than the stage it's meant to support**. The controls out-shout the
  subject. The user's bar — *"the main card area BIGGER (more screen space)"* — is the fix: the
  stage should dominate, the controls should be a slim rail.

## AFFORDANCE — adequate, undistinguished

- The preset row (Calm/Excited/Shy chips with `sub` descriptors, glass-quiet active pill) is a
  genuinely nice affordance and the best-designed element on the page — clear selected state,
  readable secondary text, `tap-squish focus-ring`. Keep it; promote it.
- The "Poke" button and the live mood/attraction readout pill are good micro-affordances but they
  float as plain `bg-card/70 backdrop-blur-sm` lozenges — they are NOT the library's own glass
  primitives. A demo page for glass-ui should compose `<Button>` and a glass pill, not hand-roll
  `border bg-card/70 px-3 py-1`. This is the "demo doesn't dogfood" smell.
- The Pause-seam section is a flat `ShowcaseFrame` with a `DockBackgroundToggle` and a text label —
  functional, zero design intent, reads like a unit-test fixture.

## ANIMATION AFFORDANCE — far below the iOS-27 bar

The user's bar is *"HIGH animation affordance for EVERY component … is every element ALIVE?"* Here:
- The hero (the one element that SHOULD be maximally alive — pointer-lean, click-impulse, mood
  arc, satellite orbit) is **frozen/blank**. The single most kinetic primitive in the library is
  dead on its own showcase page. Catastrophic for the brand.
- The static sections (plain-blob, WatercolorDot grid, ghost grid, pause) have **no entrance
  choreography of their own** beyond the chassis `.scroll-cascade` fade — and the WatercolorDots,
  while organically shaped, are not visibly animating their `animate` morph in the capture.
- **Nothing presses, lifts, or springs at the iOS-27 bar.** DESIGN.md §L3 (universal tap-squish)
  and §L2 (spring physics) are unspent. The preset chips have `tap-squish` but the showcase frames,
  the dot swatches, and the section cards are inert plates.

## POLISH + DISTINCTIVENESS — generic, with a broken centerpiece

- Strip the defects and what remains is a **vertical stack of flat cream cards on flat cream** —
  the canonical generic-AI layout the frontend-design skill exists to avoid. There is no bespoke
  composition, no asymmetry, no editorial moment, no depth stack. Every section is the same
  `StorySection` + `ShowcaseFrame` rectangle at the same width with the same gap.
- The WatercolorDot swatches are the one distinctive, premium-feeling element — the organic
  seeded silhouettes with the solid/ghost pairing read genuinely crafted. Everything around them
  is template.
- The violet "Blob Studio" title is an off-brand color event: `--motion-accent` violet is the
  **/motion** family's identity (W-SUFFUSE3), not the substrates band's. Substrates should carry
  the warm-aurora register, not borrow motion's purple. This is a suffusion-proportion violation
  (one wrong color event on the masthead).

## iOS-26/27 / GLASS / PAPER NORTH-STAR FIDELITY

- **§L1 six-layer composite: unexercised.** No glass surface on this page demonstrates the
  backdrop-blur + tint + rim + catch-light + shadow + grain stack over a live backdrop — because
  there is no live backdrop. The ShowcaseFrames are `quiet`/`resting` opaque-ish plates over cream.
- **Glass-cannot-sample-glass / monotone Z-stack:** N/A here (no aurora), but the page misses the
  chance to demonstrate the correct Aurora→Card composition the rest of the library teaches.
- **Paper morphism: absent.** The user wants GLASS *and* PAPER both. No paper-grain, no blueprint
  grid, no `.paper-ink-mark` rail. The page is neither glassy nor papery — it's blank.
- **Dock APIs: unused as designed.** The user's bar — *"leverage the dock APIs (contextual
  switching/animating) … each page deftly uses a series of glass-ui components (docks/procedural-
  anims/cards/tabs/buttons)."* This page uses ONE dock primitive (`DockBackgroundToggle`) as a
  bare pause checkbox. It does not use `<DockLayerGroup>` contextual switching, `<DockStack>` facet
  rails, the morph APIs, tabs, or the glass `<Button>` register. The Configurator IS a strong
  component composition, but the dock-system mandate is unmet.

## SPACING / RHYTHM — uniform, not golden

- Every section is the same width, same `--story-page-section-gap`, same `ShowcaseFrame pad`. There
  is no φ-derived size contrast between the hero and the supporting registers — the W-CARD-PAD
  golden ladder exists in the library but the page composes flat uniform blocks. The hero stage and
  a 4-up dot grid get the same visual weight; they should be φ² apart.
- The `min(70vh,560px)` Configurator height is reasonable but the stage-vs-controls split inside it
  is ~50/50; the bead deserves the dominant share (the "bigger main card" bar).

## COLOR — the suffusion proportion is violated at the masthead

- Two color events compete: the warm GooBlob title (ink) and the violet "Blob Studio" (motion
  purple). Per the one-color-event rule (W-SUFFUSE), a surface gets ONE deliberate color event.
  The substrates band's event should be the **warm-aurora field**, and the live bead's own
  warm-cream/coral body (capped at the comet chroma ceiling) is the natural focal color — both
  currently invisible. The page's actual dominant color is undifferentiated cream + a black title.

---

## TOP DESIGN MOVES — to make this page exceptional

Ordered: fix the floor (P0), then transpose to the BD north star.

1. **Make the hero paint (P0).** Resolve the GooBlob 300×150 stuck-buffer / non-render. This is the
   precondition for every other move. Verify the lit cream droplet + orbiting satellites + the
   orbit→merge→absorb→emerge metaball show read live (PROCEDURAL-SUITE).

2. **Kill the double title (P0).** Delete the SFC's hand-rolled `<header>`/"Blob Studio" violet
   masthead. Let the StoryPage chassis own the ONE audacious title + ONE eyebrow + the shrinking
   sticky (W-HIERARCHY2). Fix the `.story-hero-shrink` collapse so the sticky title shrinks to a
   slim bar instead of overlapping content as a black mass. Standardize the name to ONE (the
   subpath chip already shows `@mkbabb/glass-ui/goo-blob` — match the title to it).

3. **Put the demo over a COLORFUL aurora (P0 / user bar).** Restore the substrates-category aurora
   backdrop (one shared, offscreen-paused `<Aurora>` — the `<DockStage>` precedent). Float the
   studio glass + the supporting cards OVER it so the §L1 six-layer composite is finally
   demonstrated — the glass refracts a live warm field. This single move converts the page from
   "flat cream stack" to "liquid-glass showcase," and it's what a substrates page is FOR.

4. **Bigger stage, slim control rail (user bar).** Re-proportion the Configurator: give the bead
   the dominant φ² share of the frame, demote the controls to a slim glass rail (or a
   `<DockLayerGroup>`/`<DockStack>` contextual switcher so a user flips Interaction ↔ Mood ↔
   Geometry control-banks instead of scrolling a long stacked accordion). This satisfies BOTH the
   "main card bigger" AND the "leverage dock APIs (contextual switching/animating)" bars at once —
   the controls become a dock-rail of facets, each animating in.

5. **Each sub-section in its OWN glassy card (user bar).** The plain-blob, WatercolorDot grid,
   ghost grid, and pause seam should each be a distinct glass-tier card (`resting`/`quiet`) over
   the aurora — not flat cream ShowcaseFrames. Give them φ-stepped sizes (hero ≫ plain-blob >
   dot-grid) so the rhythm is golden, not uniform (W-CARD-PAD).

6. **Dogfood the library's own interactives.** Replace the hand-rolled `bg-card/70` Poke button and
   readout lozenge with the real `<Button variant="glass">` (gleam + spring-press, §L3) and a
   glass pill. Every interactive element gets the four-state contract for free, and the page proves
   the library instead of bypassing it.

7. **Animate every element to the iOS-27 bar.** Entrance: stagger the sub-cards on the
   `.scroll-cascade` spring clock. Hover: glass-lift + specular on the cards. Press: tap-squish
   universal. State: the pause toggle should visibly freeze/resume the bead with a spring, the
   preset switch should morph the bead's mood with a §L2 `bouncy` arrival. Make the WatercolorDots
   visibly boil/morph at rest (their `animate` prop) so the static register reads ALIVE.

8. **Restore the warm color event; drop the motion violet.** The masthead/eyebrow accent for a
   substrates page is the warm-aurora register, and the focal color is the bead's own warm body —
   never /motion's purple. One color event, warm, on the field.

9. **Tighten the prose (user bar).** The blurbs are dense internal-jargon paragraphs ("the inv-16
   dog-food," "useConfiguratorState (per-preset clones)," "the {valence, arousal} affect model").
   A showcase page speaks to a designer-consumer, not the gate. Cut to one crisp sentence per
   section. The subpath chip is already standardized (`@mkbabb/glass-ui/goo-blob`) — good; keep
   that, lose the rest of the implementation-diary tone.

---

### One-paragraph transposition (the gestalt target)

A single colorful warm aurora fills the route. The audacious chassis title (ONE name) collapses to
a slim sticky on scroll. Below it, a dominant glass studio card floats over the live field: the lit
cream metaball orbiting its satellites fills the φ² hero share, a slim **dock-rail of control
facets** (Interaction · Mood · Geometry) animates the control-banks in via contextual switching, and
the preset chips morph the bead's mood with a bouncy spring. Three φ-stepped supporting glass cards
follow — the plain-blob floor, the WatercolorDot register (boiling at rest), the pause seam — each
its own refractive plate over the warm field, each alive on entrance/hover/press. The page becomes
a liquid-glass instrument over a living field, not a flat cream stack with a dead rectangle in it.
