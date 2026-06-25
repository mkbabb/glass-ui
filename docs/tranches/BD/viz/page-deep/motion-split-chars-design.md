# motion/split-chars — FRONTEND-DESIGN deep critique (Pass-E)

**Page**: `demo/stories/motion/split-chars.vue` · live `http://localhost:5173/motion/split-chars`
**Lens**: world-class frontend designer, the `frontend-design` skill bar (distinctive, production-grade, NO generic-AI aesthetics) applied to glass-ui's OWN language.
**North star**: `DESIGN.md` (§L1 six-layer Liquid Glass · §L2 spring physics · §L3 tap choreography · §L4 motion tiers · §L5 a11y brackets), `motion-canon.md` (P1–P7), `affordance-map.md` (the FIVE primitives), `design-idioms.md`.
**Captured**: `split-chars-full.png` (light), `split-chars-light2.png` (sticky-collapse mid-scroll), `split-chars-dark.png` (flip transient). Live computed-style readbacks inline.

---

## 0. The one-sentence verdict

This is the single most UNDER-DESIGNED page in the suite: a page about KINETIC TYPOGRAPHY whose own kinetics are a bare opacity fade, whose three demos sit naked in ONE thin `glass-wash` card over a constellation backdrop so faint it reads as paper, with a 53px violet word standing in for what should be the audacious-ladder hero of the entire motion band. It is correct, accessible, and inert. The brief — own glassy cards, a BIGGER stage, dock APIs, colorful aurora, a component series, standardized labels, tightened copy — is the cure, and every item is justified by a precept the page currently violates.

---

## 1. VISUAL HIERARCHY — the eye lands nowhere, then on the wrong thing

**The ladder is barely used on a page whose SUBJECT is the ladder.** Live readback: the `Fourier` hero is `53.28px` (`text-display-2`, mid-ladder) in Plus Jakarta Sans — NOT the Fraunces display voice (`--font-display`), NOT the audacious tier. DESIGN.md §Typography promulgates an eight-rung √φ ladder peaking at `--type-display-audacious` 352px (the fast.com peg) precisely for "the number/title to win the visual hierarchy." A page DEMONSTRATING per-glyph kinetic split is the canonical home for `text-display-mega`/`-hero`/`-audacious` — the word should be the loudest object on the screen, a giant Fraunces glyph-train that splits and reassembles. Instead it reads as a slightly-large violet subhead, smaller than it deserves and dwarfed by the empty card whitespace around it.

**The eye-path is flat.** Eyebrow (`SPLIT-CHARS`, mono caption) → `Per-glyph kinetic entrance` (h2, 20.4px) → blurb → `Fourier` (53px) → `Compose Refine Ship` (24px) → `a 👨‍👩‍👧 b` (20px) → Replay button. Every step is a near-equal mid-weight grey rung. There is no display-tier anchor, no focal contrast, no rhythm — the three demos read as a list, not a hierarchy. A world-class motion page stages ONE protagonist (the giant word) and subordinates the variations. Right now `Fourier` and `Compose Refine Ship` compete at adjacent weights.

**The chrome competes with the content.** `split-chars-light2.png` shows the `story-hero-shrink` sticky header collapsing into a large EMPTY card on scroll — a big blank glass slab occupying the top third while the actual demos are pushed below the fold. The page-chassis title machinery is louder than the page itself.

**Move**: hoist `Fourier` to `text-display-hero`/`-audacious` in the **Fraunces display voice**, make it the protagonist over a real backdrop, and demote the supporting splits (`by="word"`, `by="grapheme"`) to clearly-secondary specimen rungs. Use the ladder the page is ABOUT.

---

## 2. AFFORDANCE — one weak button, no other cues

The only interactive element is the `secondary` Replay button (bottom-left), reading as a flat pale pill — easily missed, and semantically buried as the LAST thing on the page when it is the page's primary verb. There is no visible "tap to replay," no "hover a glyph," no scrub control, no per-mode switcher. The grapheme/word/char distinction — the actual teaching content — is presented as three static literals with zero affordance to explore them. A viewer cannot tell the page is interactive at all beyond that one pill.

`affordance-map.md` names FIVE primitives (HOVER-LIFT, GLEAM-TRACK, PRESS-SQUISH, DRAG-MORPH, FOCUS-RING). This page exercises essentially ZERO of them on its content. The split glyphs are `aria-hidden` static spans — correct for AT, but they carry no pointer life, so the "kinetic" claim is invisible at rest.

**Move**: make the splitting itself the affordance — a prominent glass `primary-audacious` "Replay" CTA, a per-glyph HOVER-LIFT/GLEAM on the hero word (the glyphs are already individual `.char` spans — they are BEGGING for per-glyph pointer response), and a `<SegmentedTabs>` to switch split-unit live (char · word · grapheme) so the teaching is interactive.

---

## 3. ANIMATION AFFORDANCE — the cardinal failure: a kinetic-type page that is not kinetic

This is the heart of the critique. The entrance is, verbatim from `typography/utilities.css:155`:

```css
.char-stagger > .char {
  animation: fade-in var(--spring-smooth-duration) var(--spring-smooth, ease) backwards;
  animation-delay: calc(var(--char-index, 0) * 30ms);
}
```

A **bare opacity fade**, staggered 30ms/glyph. No transform. This directly violates **`motion-canon.md` P3 (fade COUPLED to transform)**: *"A bare opacity fade with no transform reads flat."* It also under-uses **P1** — a per-glyph entrance is a SPATIAL event (glyphs should rise/scale/blur-settle in) and should ride the coupled spring+blur the rest of the BD liquid-glass band ships (`useLiquidReveal`'s three-channel `transform`/`opacity`/`filter: blur(4px)→0` bloom, CLAUDE.md W-LIQUID-REVEAL). At the iOS-27 bar (DESIGN.md §L2/§L4 "Appeal"), letters should bloom into place — scale-from-0.9 + translateY + blur-settle on `--spring-snappy`, the light-bending materialization. Right now they just appear.

**Everything else on the page is dead at rest.** No hover state on any glyph, no ambient life, no press feedback beyond the one button's default. Compare the §L4 strong-tier mandate ("every primitive shipping motion must honor squash&stretch, slow-in/out, timing, exaggeration") — this page ships motion (the entrance) and honors none of the exaggeration/spring register; it is the EASE register at best.

**The backdrop is frozen.** The constellation (`pageBgClass: "constellation story-hero-bg"`) is a static-feeling near-invisible field. A motion page's backdrop should breathe.

**Move**: upgrade the entrance to the coupled spring+blur bloom (per-glyph `translateY`+`scale`+`filter` on `--spring-snappy-duration`, P3/P4 compliant); add per-glyph HOVER-LIFT + GLEAM; add a continuous subtle wave/jitter affordance the user can toggle (the page should SHOW what kinetic type can do, not just one fade). PRM-carve all of it (P6 — keep the fade, drop the transform), which the library's universal carve already provides.

---

## 4. POLISH + DISTINCTIVENESS — generic-AI-template territory

Honestly assessed against the `frontend-design` bar: this page would not pass the "does it look bespoke + premium, or generic-AI" test. It reads as a default storybook scaffold — a thin card, left-aligned text rows, a faint dotted background, one grey button. There is nothing that says "glass-ui, the iOS-27 liquid-glass system" except the violet word. None of the SIX-layer optical composite (§L1) is doing visible work: the body card is `glass-wash` (30% opacity, `blur(1px) saturate(1.05)` — live readback `cardBackdrop: "blur(1px) saturate(1.05)"`) over a flat cream field, so there is no backdrop for the glass to refract — the §L1 material reads as a faintly-tinted rectangle, the iOS-7-flat failure §L1 explicitly warns against. The grain, the catch-light, the rim (`border 0.04 alpha`) are all sub-perceptual.

DESIGN.md §L1: *"A primitive that omits one [layer] reads as iOS-7-flat."* This page omits FIVE of six in practice (no real backdrop → no refraction → no saturation read → rim/grain/catch-light invisible). The premium read is impossible without a backdrop worth refracting.

**Move**: this is exactly the user's "glass demos over COLORFUL aurora backgrounds" — swap the dead constellation for a live `<Aurora>` (or the richer procedural-suite member matched to the motion band's violet identity), so the glass cards finally have something to bend. Distinctiveness comes free once the six-layer composite has a real backdrop.

---

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY

- **Glass tier mis-pick (§L1 tier-selection rule).** The body uses `glass-wash` — the LOWEST tier, meant for "dock substrate, input chrome." A content card demoing a hero word should be `resting` (the canonical plate) at minimum, and the demo sub-cards `floating`. The ladder is monotone in weight; under-reaching collapses the surface to a veil. (The user's "each sub-section in its own glassy card" naturally fixes this — three `resting`/`floating` sub-cards over the aurora.)
- **Dark mode is not luminous-transmissive (CLAUDE.md W-DARK-MATERIAL).** The dark capture caught a flip transient (flat pale slab over black) — but the underlying issue stands: over a dead backdrop the dark register has no transmission to glow through. The dark arm's whole thesis ("dark glass glows where light passes") needs a live backdrop to exist.
- **Spring physics present but mis-registered (§L2).** The entrance rides `--spring-smooth` (sustained glide, ζ=1.0, zero overshoot) — but a per-glyph ARRIVAL is a §L2 "playful arrival" / "confident tap" case → `--spring-bouncy`/`--spring-snappy`. Smooth makes the letters seep in; snappy/bouncy makes them POP. The §L2 selection rule ("if the user's finger touched a pixel use a spring; default to snappy") points at snappy for a replayed entrance.
- **No glass-cannot-sample-glass risk yet** (single card), but once sub-cards land over aurora, honor the §L1 single-composition-container rule.

---

## 6. SPACING / RHYTHM — whitespace without proportion

The card carries the correct sqrt-φ pad ladder (live: `--card-pad-block: calc(inline*1.272)`, the W-CARD-PAD golden ladder) — that part is right. But the CONTENT inside is a flat `gap-8` flex column (`demo/.../split-chars.vue:32`), not a golden rhythm: the three demos are evenly spaced regardless of their visual weight, so the giant-word-vs-small-variation proportion never establishes. And the overall page wastes its real estate — `split-chars-light2.png` shows the demos crammed into the lower-left while the upper card and right half sit empty. The user's "main card area BIGGER (more screen space)" is the right instinct: the protagonist word needs to fill the stage, and the variations need a proportioned (φ-stepped) descent beneath it.

---

## 7. COLOR — the one-event rule is honored, but the page is colorless

The suffusion proportion (`AZ.W-SUFFUSE`, one color-event per surface) is correctly applied: `Fourier` carries the single `--motion-accent` violet (live `oklch(0.532 0.18 317.5)` light / `oklch(0.739 0.134 318.1)` dark), the rest is ink. That is the RIGHT discipline. But the result, over a cream-near-white field, is a page that is 95% greyscale with one violet word — it reads austere, not premium. The motion band's violet identity (`--viz-legendre`/`--motion-accent`) should suffuse the BACKDROP (a violet-keyed aurora), letting the cards stay ink-on-glass while the whole stage carries the motion-purple mood. That keeps one-event-per-surface (the cards stay neutral) while making the page feel alive and on-brand.

---

## 8. STRUCTURAL / BRIEF items

- **"each sub-section in its OWN glassy card."** Currently ALL three demos (char-hero, word-headline, grapheme) live in ONE `<StorySection>` inside ONE card. Split into three `resting`/`floating` glass sub-cards: (1) the hero `Fourier` protagonist, (2) `by="word"` headline, (3) `by="grapheme"` emoji-safety — each a labeled specimen card.
- **"leverage the dock APIs (contextual switching/animating)."** A floating dock pill exists (bottom-center, the demo nav chrome) but the PAGE does not use the dock as a teaching surface. Add a contextual dock that switches split-unit / replay / speed (the `DockLayerGroup` contextual-switch + morph APIs) so the page DEMONSTRATES the dock while controlling the kinetics — two birds.
- **"each page deftly uses a series of glass-ui components."** This page uses `StoryPage` + `StorySection` + `SplitChars` + one `Button`. That is thin. Add `<SegmentedTabs>` (split-unit), `<Card>`/sub-cards, a dock, a `<Slider>` (stagger speed), `<Aurora>` backdrop — a real composition.
- **"standardize the import-path label."** Live: the subpath chip reads `@mkbabb/glass-ui/motion-core` (manifest `"motion/split-chars": "@mkbabb/glass-ui/motion-core"`). Confirm this matches the canonical label format used across the suite and the actual export surface (SplitChars ships root barrel + `/motion-core` per README) — standardize the chip rendering so every page's chip is the same Fira-Code register, same truncation, same position.
- **"tighten superfluous language."** The blurb (`demo/.../split-chars.vue:30`) is two dense sentences re-stating the mechanism ("mints .char spans + --char-index... the shipped .char-stagger CSS staggers... a screen reader hears the word ONCE..."). It reads as implementation notes, not demo chrome. Cut to one crisp line: *"A word splits into per-glyph spans that stagger in — and stays one word to a screen reader."* The mechanism belongs in the README, not on the stage.

---

## 9. TOP DESIGN MOVES (ranked, concrete)

1. **Make the kinetics actually kinetic.** Upgrade `.char-stagger` (or a page-local hero variant) from the bare `fade-in` to the coupled spring+blur bloom — per-glyph `translateY(0.4em→0)` + `scale(0.9→1)` + `filter: blur(4px→0)` on `--spring-snappy` + `--spring-snappy-duration`, coupled opacity (`motion-canon.md` P1/P3/P4, `useLiquidReveal` register). PRM-carved. This is the page's reason to exist.
2. **Hoist the protagonist to the audacious ladder in the display voice.** `Fourier` → `text-display-hero`/`-audacious` in Fraunces, the loudest object on the screen, the per-glyph bloom as its entrance. Demote the two variations to clearly-secondary specimen cards beneath, φ-stepped.
3. **Live violet-keyed aurora backdrop + real glass cards.** Swap the dead constellation for a `<Aurora>` in the motion-purple identity; lift the body to `resting`, put the three demos in `floating` sub-cards so the §L1 six-layer composite finally refracts something (the "glass demos over COLORFUL aurora" brief = the §L1 premium read).
4. **Per-glyph pointer life.** HOVER-LIFT + GLEAM on the hero glyphs (they're already individual spans), a prominent `primary-audacious` Replay CTA, PRESS-SQUISH on it.
5. **Make the teaching interactive via a contextual dock + tabs.** A `<SegmentedTabs>`/dock switching char · word · grapheme live, a `<Slider>` for stagger speed — exercise the dock contextual-switch/morph APIs as the control surface, satisfying the "series of components" + "leverage dock APIs" brief at once.
6. **Tighten copy + standardize the chip; proportion the layout.** One-line blurb, canonical Fira-Code subpath chip, BIGGER protagonist filling the stage with a φ-stepped descent to the variations.

The throughline: a page whose subject is kinetic typography must itself be the most kinetic, most typographically-audacious, most glass-premium page in the suite. Today it is the most static. Every brief item is a precept-backed step from inert to exceptional.
