# forms/selectable-chip — FRONTEND-DESIGN deep critique (Pass-E)

**Surface:** `demo/stories/forms/selectable-chip.vue` · live `http://localhost:5173/forms/selectable-chip`
**North star:** DESIGN.md (iOS-26/27 Liquid Glass — six-layer optical composite · 7 tiers · spring physics) · design-idioms.md · motion-canon.md · affordance-map.md
**Captured state:** flat `#e7e4df`-class gray page, faint grid; ONE giant ShowcaseFrame-in-card stack holding BOTH sections; 6 tag chips (~18px) + 3 filter chips; no aurora, no canvas (`hasCanvas:false`), `heroBg: transparent`.

---

## VERDICT IN ONE LINE
A correct *contrast-spec demo* wearing the body of a *design showcase* — the chips paint the right oklab tones but the page is a flat gray spreadsheet that violates nearly every BD north-star clause (no aurora, no glass card-per-section, undersized canvas, dead chrome, generic-template rhythm). It reads as a unit test with a title, not a world-class component page.

---

## 1. VISUAL HIERARCHY — does the eye land right? (FAIL on landing, PASS on title)

- **The `text-display-4` "Selectable Chip" H1 is the one genuinely-premium move** — the audacious √φ ladder (DESIGN.md typography-forward) lands hard, and the Fira-Code subpath chip `@mkbabb/glass-ui/selectable-chip` directly under it is the standardized import-label the user asked for (already correct here — keep this as the template). Good.
- **Then the eye falls off a cliff.** Below the hero, the page is a flat-gray scroll of mono-caption eyebrows + muted blurb paragraphs + a giant beige box. The CHIPS — the actual subject — are tiny (`16.4px` / `text-small`), low-contrast, and sit lost inside an over-large empty `ShowcaseFrame pad="lg"`. The protagonist of the page is smaller and quieter than the blurb text above it. **Inversion of importance** (motion-canon/affordance: the interactive subject must out-present its own documentation).
- **The blurb is a wall of backtick-code prose** (`--accent-fill ≥3:1`, `--accent-band`, `--accent-edge`...). This is implementation-register language bleeding into the design surface — it reads as a changelog, not a demo caption. The user's "tighten superfluous language" maps here verbatim: the blurb should be ONE plain sentence ("Tap to select. Each tag carries its own tonal identity."), with the token-spec moved to a `<ShowcaseFrame caption>` mono footer or removed.
- **Two sections, ONE card.** The whole body is a single `StoryHero` glass plate with two `StorySection`s stacked inside, divided only by a hairline. The user's explicit bar — *"each sub-section in its OWN glassy card"* — is unmet. There is no per-section gestalt; the page is one undifferentiated column.

## 2. AFFORDANCE — clear interactive cues? (WEAK)

- A selectable chip's entire job is to telegraph *"tap me, I toggle."* At rest the idle chips are a faint tonal fill with a `text-muted-foreground` label — they read as **static color swatches, not buttons.** Nothing says "pressable": no glass tier, no rim catch-light, no shadow lift, no cursor-grab affordance beyond the bare `cursor-pointer`.
- The **selected vs idle delta is too subtle to parse at a glance.** Active = bolder band + `font-medium` + rim; but over a flat gray plate with 6 already-tinted chips, "which are on?" requires study. The iOS-27 selected register (CLAUDE.md W-REGISTER-IOS "selected reads as glass", the `--glass-bg-floating` lift) is NOT used — the chips never reach the glass tier the rest of the library speaks.
- The single-tone filter row is **indistinguishable in affordance from the tag row** — same chip shape, same flat plate. A user cannot tell the exclusive-radio row from the multi-toggle row without reading the eyebrow. Affordance-map says role must be *visible*, not captioned.
- `selected: recent` is rendered as raw `text-mono-caption` debug output bolted under the second frame — a dev-console artifact on a design surface. Either make it a live glassy status pill or cut it.

## 3. ANIMATION AFFORDANCE — is every element ALIVE at the iOS-27 bar? (NEAR-DEAD)

- **Entrance:** the page rides `.scroll-cascade` / `.scroll-build` at the chassis level, so the SECTIONS fade-rise — but the **chips themselves have no staggered entrance.** Six tonal chips are the perfect candidate for an `icon-chip-reveal`-style spring-clocked stagger (scale 0.85→1 on `--spring-snappy`, coupled opacity, per-chip `--char-index`-style delay). They currently pop in as a block. DEAD on entrance.
- **Hover/press:** the CVA gives `hover:scale-(--scale-hover-btn) active:scale-(--scale-press-btn)` on `--spring-smooth` — this is the ONE alive thing, and it's good (the §6 lift/settle register, the W-MOTION-CANON SPATIAL-on-spring rule honored). But it's a bare scale; no specular gleam follows the pointer (W-LIQUIDHOVER `vSpecular` tier-root auto-arm is NOT armed on the chip), no rim glint, no `--glass-accent` per-instance chromatic rim (BB.W-GLASS-ACCENT) — which is *exactly* the seam designed for "a chip whose surface glows with that datum's hue."
- **State transition:** selecting a chip cross-fades bg/border/color on `--duration-fast`/`--ease-standard` (correct register) — but there is no *bloom*, no liquid-reveal, no satisfying "click into place" overshoot. iOS-27 selection should feel like the tone *floods* into the chip. Currently it's a flat color swap.
- **No procedural motion anywhere.** The user's bar — *"each page deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)"* + *"glass demos over COLORFUL aurora backgrounds"* — means this page should breathe over a live aurora. It is bone-static over flat gray (`hasCanvas:false`).

## 4. POLISH + DISTINCTIVENESS — bespoke-premium or generic-AI-template? (GENERIC)

This is the page's central failure. Strip the one audacious H1 and you have **the canonical generic-AI layout**: centered column, gray background, faint grid, a big rounded box with some pills in it, mono labels, muted helper text. It could be any component library's docs site. NONE of the glass-ui identity is present in the body:

- No six-layer glass composite (DESIGN.md): no backdrop blur+saturate, no surface tint plate, no edge rim, no inner catch-light, no drop shadow, no grain — on ANY body surface. The `ShowcaseFrame` is `bg-card` opaque (`tier` left default), so even the frame is a flat beige box, not glass.
- No paper morphism (the second half of the GLASS + PAPER mandate) — no paper-grain, no blueprint grid at readable strength, no ink-rail section accent. The faint grid that IS there is sub-perceptual and decorative-only.
- No dock. The user explicitly asked to *leverage the dock APIs (contextual switching/animating)*. The only docks on screen are the global nav chrome (left rail `ℱ` + bottom dock) — the PAGE itself composes zero dock surfaces, when a "filter row" is the textbook case for a contextual dock or a `DockStack mode="facets"` carousel with per-facet `--glass-accent` hues.

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY (LOW)

| North-star clause | Status |
|---|---|
| Six-layer optical composite (DESIGN.md) | ❌ absent on every body surface |
| Glass-over-COLORFUL-aurora (BD user bar) | ❌ flat gray, no canvas |
| 7 glass tiers used | ❌ none — `bg-card` opaque atom host only |
| Spring physics motion | ⚠️ hover/press only; entrance + state dead |
| GLASS + PAPER both | ❌ neither expressed in body |
| Dock APIs leveraged | ❌ zero page-level dock composition |
| Each sub-section own glassy card | ❌ one shared card |
| Main card area BIGGER | ❌ over-large empty frame, tiny chips |

## 6. SPACING / RHYTHM — golden-ratio? (MIXED)

- The chassis carries the tokenized `--story-page-section-gap` + `--card-pad-*` √φ ladder (BB.W-CARD-PAD), so the macro rhythm is library-correct. Good.
- But INSIDE the frame: `ShowcaseFrame pad="lg"` (p-6) wrapping a single `gap-2` flex-wrap row leaves a vast empty plate around six tiny chips — the negative space is unproportioned, not golden. The frame is sized for a rich demo and holds a sparse one. Either fill it (bigger chips, more chips, a live backdrop) or shrink the frame.
- Chip internal padding (`px-3 py-1`) is fine at `md`, but the `lg` filter row (`px-4 py-1.5`) is still small for a "size=lg" claim — it doesn't read as a deliberately larger control.

## 7. COLOR — suffusion proportion? (OVER-EVENT, correct hues)

- The tones are the right library identity: `--section-color-{0,2,4,6,7,10}` walked across the chips, resolving warm oklab fills — this is the brand ramp, not a demo hue. Correct.
- BUT this **violates the one-color-event-per-surface rule** (W-SUFFUSE): six fully-saturated distinct tonal chips in one row IS six color events competing. The reference idiom is ONE deliberate color event per surface. Here the rainbow-of-tags is the *point* of the component, so it's defensible — but it needs a CALM frame around it (a neutral glass plate, an ink-quiet caption) to keep proportion. Over flat gray with backtick-prose blurbs, the chips fight the page instead of being its one pop.

---

## TOP DESIGN MOVES (ranked — to make this exceptional)

1. **Put the page over a COLORFUL contained aurora, `ShowcaseFrame tier="field"`.** Flip the forms-category `grid` default to a contained `<Aurora>` HERO for this route (one-GL-per-route budget, the DockStage/`useIntersectionPause` offscreen-pause seam keeps it cheap), and host the chips on `tier="field"` so the glass plates float DIRECTLY over the live color (BG-2 black-plate kill). This single move converts the page from generic-template to glass-ui. The chips' tonal fills will *sing* over a warm aurora instead of dying on gray.

2. **Each section in its OWN glass card (the user's literal bar).** Split the two `StorySection`s into two discrete `glass-floating` (or `tier="quiet"`) cards with the six-layer composite — backdrop blur+saturate, edge rim, catch-light, grain — so the page reads as two deliberate glassy panels over the aurora, not one undifferentiated column. Honor BB.W-CARD-PAD √φ padding per card.

3. **Arm the iOS-27 liquid affordance on the chip primitive.** (a) `vSpecular` tier-root auto-arm (W-LIQUIDHOVER) so a chip gleams pointer-following on hover. (b) Bind each chip's `--glass-accent`/`--glass-accent-strength` to its `:tone` (BB.W-GLASS-ACCENT) so the rim+catch-light glow that datum's hue — the seam *designed for exactly this*. (c) Lift the SELECTED chip onto the `--glass-bg-floating` "selected reads as glass" tier (W-REGISTER-IOS) so on/off is unmistakable and glassy.

4. **Make the chips ALIVE on entrance + selection.** Spring-clocked staggered reveal (`--spring-snappy`, scale 0.85→1 + coupled opacity, per-chip delay — the `icon-chip-reveal` register) so the tonal row *assembles itself*. On select, a tone-flood bloom (the W-LIQUID-REVEAL `.glass-reveal` register) instead of a flat color swap — the iOS-27 "click into place" overshoot.

5. **Leverage a dock for the filter row.** Re-cast the single-tone exclusive filter ("Recent / Popular / Trending") as a `<DockStack mode="facets">` context carousel or a `<SegmentedTabs variant="pill">` glass indicator that GLIDES + SQUISHES (W-TABS) — a contextual-switching surface, not three more flat pills. This satisfies *"leverage the dock APIs"* and *"a series of glass-ui components"* (chips + dock/tabs + glass cards + aurora on one page).

6. **Make the canvas BIGGER, the chips BIGGER, the prose SMALLER.** Bump chip size up a rung (the protagonist should out-present its docs). Replace the backtick-spec blurb with ONE plain sentence; move token names to a `ShowcaseFrame caption` mono footer. Kill the raw `selected: recent` debug line or promote it to a live glassy status pill.

7. **Add the PAPER register for contrast.** Give one card a paper-grain + ink-rail section accent (the `math-paper.vue` gold-standard idiom) so the page expresses GLASS + PAPER both, per the BD mandate — the glass aurora card beside a calm paper card is the bespoke gestalt.

---

## CLOSING — what good looks like
The exceptional version: two distinct glass cards floating over a warm contained aurora; tag chips that bloom in on a spring stagger and gleam their own hue on hover (`--glass-accent`), lifting onto the floating-glass tier when selected; the filter row re-cast as a gliding glass `SegmentedTabs`/`DockStack` facet carousel; one plain sentence of caption; the audacious H1 + standardized Fira-Code import chip kept exactly as-is. Glass, paper, dock, aurora, tabs, the tonal chips — *a series of glass-ui components deftly composed*, every element alive at the iOS-27 bar. Today's page has the right title and the right oklab math wrapped around a generic gray docs template; the work is to give it the glass-ui body its head already promises.
