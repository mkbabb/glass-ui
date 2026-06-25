# dock/cta-receive — FRONTEND-DESIGN critique (Pass-E, design lens)

**Page**: `demo/stories/dock/cta-receive.vue` · live `http://localhost:5173/dock/cta-receive`
**Lens**: the frontend-design skill bar (distinctive · production-grade · AVOID generic-AI) applied to glass-ui's own language (DESIGN.md §L1–§L5, motion-canon P1–P7, affordance-map).
**Captured**: 1440×900 light, full-page + after-click viewport, computed-style + console probes (`_cap/cta-receive-{light,after}.png`).

This page exists to teach the library's most cinematic single move — `useDockCtaReceive`, the **iOS bloom-from-source INVERSE**: an external CTA flies, reshapes, congests into glass, and is *received* by a dock control that lights up. It is the W-DOCKMORPH-CTA headline (the §L2 spring + §L1 lensing made narrative). And on the live page **that move does not run at all** — it throws a `TypeError` on mount and again on click. The page about the library's most alive interaction is, right now, **completely dead**, and even were it fixed, it is staged as a 693-character prose wall over a flat peach wash with one transparent tile. This is the lowest-functioning page in the dock band.

---

## 1. The verdict up front

The seam (`useDockCtaReceive`) is real, shipped, and architecturally correct — compositor-only, PRM-seated, composing the one kf `ElementMorph` substrate `useLiquidReveal` activates. But the DEMO is broken and under-staged on every axis the brief names:

- **P0 — the interaction is broken at runtime (the page teaches nothing).** `setPending()` throws `target.setAttribute is not a function` on mount; `receive()` throws `el.getBoundingClientRect is not a function` on click. The `ref="targetEl"`/`ref="ctaEl"` resolve to the *Vue component proxy* of `<DockIconButton>`/`<Button>`, not their host DOM element — the binding-no-op class the project's own MEMORY warns about ("stale reka/component bindings silently no-op; only e2e catches"). The seat is never armed, the ghost never shows, the morph never plays, the dock control never lights. **Nothing on this page does the thing it documents.**
- **No card-per-section.** One transparent `.dock-stage-tile` (`bg: rgba(0,0,0,0)`, a `1px oklab(…/0.3)` hairline, `blur: none`) holds the whole demo; `glassyEls` over the stage = 2 (the dock + the CTA's own `glass-deep` button). The user's "each sub-section in its OWN glassy card" is unmet — there is only ONE section and it has no glass host.
- **The aurora is monochrome.** `DockStage` renders the calm `DEFAULT_AURORA_CONFIG` at `opacityCeiling 0.42` — a single flat warm-peach hue. §L1: glass "bends and concentrates light"; over a one-hue field the lens has nothing to refract, so the dock reads as a tinted grey pill, not a lensing layer. The brief's "glass demos over COLORFUL aurora backgrounds" is unmet.
- **The main area is NOT bigger.** The tile measures 1006×209px inside a 1357px article — a thin 209px-tall band with a small CTA and a small dock floating in vast empty padding (`p-10` + `gap-8`). The user asked for MORE room and a BIGGER main card; the page gives a stubby letterbox.
- **The body is a 693-char prose wall.** The single `<p>` narrates `setPending()`, `[data-cta-pending]`, "congests into the glass", `transition: opacity`, `ElementMorph`, "compositor-only; reduced-motion snaps…" — changelog prose where the DEMO should *show*. The brief's "tighten superfluous language" is squarely unmet.

The import-path label IS already standardized (`@mkbabb/glass-ui/dock`, the 90-page canonical convention) — the one axis that passes.

---

## 2. VISUAL HIERARCHY — correct chrome, no body composition

**What works.** The `CTA → Dock Morph` H1 resolves to **86px Plus Jakarta Sans / 600** (`--type-display-4`) — the audacious √φ ladder lands for the hero. The eyebrow (`Dock · CTA → Dock Morph`) + the Fira-Code `@mkbabb/glass-ui/dock` chip is the correct three-rung StoryHeader cluster (W-HIERARCHY2). The lone `<h2>` resolves to 20.4px `text-subheading`. The scaffolding is standardized.

**What fails.** After the H1 the page is **100% body and caption** — one 20.4px heading, one 14px 693-char paragraph, one mono-caption footer. There is no protagonist, no focal mark, no second register. DESIGN.md's "TYPOGRAPHY-forward / kinetically typographic" identity dies at the title. The page teaches a *state transition* — CTA → received — and that state is never made TYPOGRAPHIC. A `text-display-mega` (177px) poster word, or the received-state's own label rendered huge as the morph's anchor, would give the eye the focal it is denied. The library ships the rung for exactly this; the page never reaches past `--type-display-4`.

**The eye lands on the prose wall, then nothing.** The reading path is: huge title → grey wall → small CTA → small dock. The CTA (the *primary interactive cue*) is the smallest, lowest-contrast thing in the frame (150×40px, a near-transparent `glass-wash` pill at `oklab(…/0.328)` over peach). The thing you are meant to click is the hardest thing to find.

---

## 3. STAGING / GLASS FIDELITY — the lens has nothing to refract, and there's no card

The single highest-leverage failure, shared with `dock/overview` and `dock/layers`. DESIGN.md §L1: the six-layer composite reads as iOS-26-liquid **only over content worth refracting**; §L5's worst-case-contrast rule assumes a *kinetic, varied* backdrop.

- **Monochrome field.** `DEFAULT_AURORA_CONFIG` is one warm-peach wash. The dock measures `bg color(srgb 0.864 0.852 0.836 / 0.328)`, `blur(9px)` — a correct dock plate, but over a flat hue it composites to a grey-cream pill. The morph (a glass element flying INTO glass) is the most §L1-pure thing the library does — "glass cannot sample glass" made into a *feature* — and it is staged over a field that refracts nothing, killing the read.
- **No glass card.** The tile is `bg: transparent` with `blur: none`. The user's "each sub-section in its own glassy card" means literally a `.glass-resting`/`.glass-floating` plate with the six-layer composite. There is none. The "main card" the brief asks to make BIGGER does not exist to enlarge.
- **The CTA's `glass-deep` is wasted.** The CTA button carries `glass-wash btn-glass glass-deep` (the W-DEEP-GLASS opt-in maximal register) — a genuinely premium surface — but at 40px over peach with no varied backdrop behind it, the deep refraction is invisible. The richest glass primitive on the page is spent where it cannot be seen.

---

## 4. ANIMATION AFFORDANCE — the headline move is the page, and it is broken

This page's entire reason to exist is ONE animation: the source-rect bloom INVERSE. At the iOS-27 bar it should be the most alive thing in the storybook — a CTA that *physically flies and congests into the dock*. Instead:

- **It throws and never plays** (§1 P0). The `useDockCtaReceive` leaf is correct; the demo's `ref` plumbing is wrong. This is not a polish gap — it is a total functional failure of the page's thesis.
- **Even the fallback acknowledgement is thin.** The received-state CSS (`.cta-receive-target--lit`) is a `scale(1.06)` + `box-shadow 0 0 0 2px --dock-selected-accent` on the snappy clock — a tasteful nudge, but it never fires (the `received` ref never flips because `onReceived` never runs). And a 6% scale + a 2px ring is *underspent* for "the dock control owns the spot now" — the moment a CTA congests into glass deserves a specular bloom, a brief gleam-sweep, the W-AX-METAL-GLOW catch-light, or the dock-CTA-seat reveal the source code references but the demo can't reach.
- **Nothing else breathes.** No entrance (the StoryHeader gravity-rise exists as a chassis primitive — W-HIERARCHY2 — but the demo content does not stagger in); the CTA has the library hover/press register via `btn-glass` (good, four-state contract met) but at rest the page is dead. The "seat armed" caption (`v-if="pending"`) never shows because `pending` is stuck (setPending threw).

Per motion-canon: P2 (enter-bouncy), P3 (fade-coupled-to-transform), P5 (compositor-only), P6 (PRM-keeps-fade) — the *leaf* honors all of these; the *page* exercises none of them because the binding is broken.

---

## 5. POLISH / DISTINCTIVENESS — generic-AI-template, not bespoke

Strip the title and this reads as a default starter: one centered button, one centered pill, a paragraph of explanatory text, a flat gradient. The frontend-design skill's central bar — *does it look bespoke + premium, or generic?* — fails. The library OWNS the vocabulary to make this the most cinematic page in the storybook (a real flying-glass morph, a deep-glass CTA, a live dock, the aurora field) and spends none of it as composition. The peach monochrome + transparent tile + prose wall is the canonical AI-demo aesthetic the skill exists to avoid.

---

## 6. SPACING / RHYTHM + COLOR — empty letterbox, zero suffusion

- **Rhythm.** `p-10` + `gap-8` in a 209px-tall tile = a CTA and a dock floating in dead space with no golden-ratio relationship (DESIGN.md's √φ cadence is for the type ladder *and* the spatial rhythm; here there is no ladder of spacing, just one big gap). The card-padding ladder (W-CARD-PAD, the sqrt-φ block-over-inline) never applies because there is no card.
- **Color suffusion.** Zero. The one-color-event rule (W-SUFFUSE) wants ONE deliberate accent per surface — the page has no section accent, no `<IconChip>` pop, no eyebrow tint, no protagonist hue. It is grey-cream end to end. The received-state `--dock-selected-accent` is the only color event and it never paints.

---

## 7. TOP DESIGN MOVES (ranked, concrete)

1. **FIX THE BINDING (P0, non-negotiable).** Resolve the host element from the component refs — either `targetRef.value?.$el` / `ctaRef.value?.$el`, or have `DockIconButton`/`Button` expose their root via `defineExpose({ el })`, or wrap the CTA/target in a plain `<div ref>` the leaf measures. Add `onInitError` to the DockStage aurora (the console warns). Until this lands, the page is a 404 of its own thesis. Sweep the dock band for the same `useTemplateRef`-on-component class.
2. **Stage the morph as a HERO, twice the size, over a COLORFUL field.** Make the tile a real `.glass-floating` card, 2× taller, spanning the wider main column; replace `DEFAULT_AURORA_CONFIG` with a multi-hue aurora preset (the W-PAGE-BACKGROUND systemic) so the flying glass refracts a *varied* field — the §L1 "lens bends light" read. The CTA flying into the dock over a live colorful aurora is a genuinely award-winning frame; build it.
3. **Make the received moment a real bloom.** On `onReceived`, fire a specular sweep + W-AX-METAL-GLOW catch-light on the target control (gold = earned, the receive is a *win*), plus the dock-CTA-seat reveal the code references — not a 6% scale + 2px ring. Couple a `--type-display-mega` typographic mark that flips from the CTA's label to "Received" / the control's name (the state made load-bearing + typographic).
4. **Split into glassy sub-cards + add a state-narrative.** Three glass cards: (a) the live morph hero, (b) a "drives the seat manually" card (the `clearPending()` path, currently a stray ghost button), (c) a "reduced-motion" card showing the deterministic snap. Each its own `.glass-resting` plate — the brief's card-per-section, and a real composition instead of one tile.
5. **Cut the 693-char wall to ~40.** "Click *Add to dock* — the CTA flies into the starred control and congests into glass." Let the DEMO show `setPending`/`ElementMorph`/compositor-only; move the API prose to a collapsible `<Code>` block or a caption. Add the StoryHeader gravity-rise entrance so the page is alive before the user touches anything.

---

## 8. WHAT'S GOOD (keep)

- The `useDockCtaReceive` LEAF is architecturally excellent — compositor-only, PRM-seated, one kf `ElementMorph` substrate shared with `useLiquidReveal`, no `dockMorphContext` edit (the consuming-seam discipline). The fix is entirely in the DEMO.
- The import-path label is standardized (`@mkbabb/glass-ui/dock`).
- The H1 uses the audacious ladder (`--type-display-4`, 86px).
- The CTA's four-state contract (`btn-glass` hover/press/aria-pressed) is correct.
- The PRM carve on `.cta-receive-target--lit` is present and correct.
