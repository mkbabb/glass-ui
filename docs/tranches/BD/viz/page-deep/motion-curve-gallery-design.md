# motion/curve-gallery — FRONTEND-DESIGN deep critique (Pass-E)

**Route:** `/motion/curve-gallery` · **SFC:** `demo/stories/motion/curve-gallery.vue` · **Subpath:** `@mkbabb/glass-ui/easing`
**Captured:** light + dark, 1440×900, the full page (header → picker → active family → card grid → Custom editor → doctrine tables).
**Lens:** frontend-design skill (distinctive, production-grade, AVOID generic-AI aesthetics) applied through this project's iOS-26/27 Liquid-Glass + paper north star (DESIGN.md §L1–§L5, motion-canon, design-idioms, affordance-map).

---

## TL;DR

This is the most *content-rich* page in the motion band and, paradoxically, one of the most visually inert. The page has a genuinely beautiful asset — the THICK `--motion-accent` violet curve plotted from the REAL value.js twin — and then mounts ~6 of them per screen on **flat near-opaque plates over a flat cream/charcoal void**, with **two raw HTML `<table>`s** at the bottom that read like a spec sheet, not a glass design system. It violates the page's own stated intent: the manifest declares `background: "grid"` (a blueprint wash) explicitly to dodge the one-GL-per-route budget, so the user's literal ask — *"glass demos over COLORFUL aurora backgrounds"* — is unmet **by manifest decision**, not by accident. Nothing here is *wrong* (the IA is correct, the twin-source discipline is exemplary, the picker is structurally sound); it is **under-designed**. It reads as a competent documentation grid, not a bespoke iOS-27 motion gallery. Below: every gap, mapped to a precept, with the top moves.

---

## 1. VISUAL HIERARCHY — does the eye land right?

**The double-title collision is the headline defect.** The page paints "Curve Gallery" **twice, stacked, ~120px apart**: once as the chrome `<header>` `text-display-*` (the StoryPage hero, near-black ink) and again as a local `<header>` at `text-display-3` in `--motion-accent` violet (curve-gallery.vue lines 197–205). The eye lands on a title, scrolls a hair, and lands on the *same word again in a different color*. This is a self-inflicted hierarchy break — the SFC hand-rolls a second masthead that duplicates what `StoryPage`/`StoryHeader` already render. The W-HIERARCHY2 cluster (eyebrow→title→blurb, ONE ordered unit) exists precisely to prevent this; the SFC ignores it and re-mints the title.
- **Move:** DELETE the local `<header>` (lines 197–205). Let `StoryPage` own the one masthead. If the violet-title-event is wanted, it belongs as a `heroTitle` color hook in the chassis, not a second `<h1>`-shaped span. One title. (motion-canon: ONE color event per surface; design-idioms: the masthead is a chassis affordance, not per-page craft.)

**After the title, the eye has no focal anchor.** Below the picker, every curve card is the **same size, same weight, same plate**. There is no protagonist — no "this is the curve you should look at first." The √φ audacious ladder (DESIGN.md §Typography — `text-display-mega`/`-hero`/`-audacious`, 177–352px) is the project's signature and is **completely absent** from a page whose entire subject is *shape*. A curve gallery is the ideal home for ONE giant hero plot: a single `display`-scale featured curve (the active family's "hero" easing) rendered large, with the rest as a supporting grid. Right now the page is typographically **timid** — the largest type is the duplicated title; the cards top out at `text-sm`.
- **Move:** Promote ONE card per family to a HERO plot (2× the grid cell, the curve at `text-display`-band stroke weight, the name in `text-subheading`). The grid becomes hero + supporting — the fast.com-peg activation DESIGN.md §Audacious-display calls for, applied to *motion* instead of a number.

**The doctrine tables invert the hierarchy.** The "Easing doctrine" + "House Material cores" sections at the bottom are the **densest, most-bordered, most-saturated** elements on the page (a `--surface-tint-10` table header bar, hard borders, full-width). They out-shout the actual curve gallery above them. A reference legend should be recessive, not the visual climax.

---

## 2. AFFORDANCE — are interactive cues clear?

**Mixed. The picker is good; the cards lie.** The chip-rack picker (the dock-style "selected reads as glass" register) is the strongest affordance on the page — the active chip lifts to `--glass-bg-floating`, hover to `--glass-bg-resting`, focus ring present. That is correct and idiomatic (it borrows `--dock-control-active-bg`, exactly what the user asked for re: "leverage the dock APIs"). **But it stops at borrowing a token** — it is a hand-rolled `<button>` rack in scoped CSS, NOT the actual `<SegmentedTabs>` or a `<DockStack mode="facets">`. The user explicitly wants the page to *"deftly use a series of glass-ui components (docks/tabs/buttons)"*; here the picker re-implements a tab strip the library already ships.

**The curve cards are `<button>`s but read as static plots.** Each card is `class="glass-card ... hover:scale-[1.01]"` with a `@click="play(row)"` — the entire card is the play target. The only affordance cue is a tiny `size-3` `<Play>` glyph that "quiets at rest, lifts on card hover." At rest, a 12px muted glyph against a code label is **not** a discoverable "press me to animate" signal — a first-time user reads these as static SVG thumbnails (the exact R8 defect the comments claim to have fixed). The press target is the whole card but nothing says so.
- **Move:** Make the card's *activatability* unmistakable: a persistent (not hover-only) play affordance, a subtle rest-state shimmer on the dot track, or — far better — **auto-play the active family's dots on family-switch** so the page is *alive on arrival* and the click becomes a *replay*, not a *discover*. (affordance-map: a control's primary action must be legible at rest.)

**The "Play family" button is orphaned.** It sits alone on its own row above the grid (`StoryPlayButton`), disconnected from the cards it drives. Good that it exists; poor that it's a lone control floating in whitespace with no visual tie to its targets.

---

## 3. ANIMATION AFFORDANCE — is every element ALIVE at the iOS-27 bar?

**This is the biggest miss against the north star.** DESIGN.md §L2/§L3 and motion-canon demand entrance, hover, press, and state motion on *every* component. Here:

- **Entrance:** The page rides `.scroll-cascade` from StoryPage (inherited, fine) — but the cards themselves have NO staggered entrance of their own, and crucially **the dots do not animate on arrival**. A motion gallery that is *static until you click each card individually* fails its own thesis. The curves should *draw on* (the keyframes ghost-curve `stroke-dashoffset` idiom — the EasingPicker already does this) and the dots should run a once-through demo loop on family-switch.
- **Hover:** Cards have `hover:scale-[1.01]` — a 1% lift is **sub-perceptual**, below the DESIGN.md §Interactive `--scale-hover` (1.08) rung. It reads as no hover at all. And it's a bare Tailwind `transition-transform`, not a spring (motion-canon P1: transform hover → `--spring-smooth`, never a linear bezier).
- **Press:** No press-squish on the cards. DESIGN.md §L3 is absolute — *"No primitive may ship a press-feedback that is NOT squish-press… tap-squish is universal."* These cards are buttons with zero `--scale-press`. They click but don't *squish*.
- **State:** When a dot finishes its run it just stops at the settled X. No settle-glow, no trail, no echo of the overshoot it just performed. The single most teachable moment in a curve gallery — *the spring overshooting past 1 then settling* — passes with no emphasis.

**The plots themselves are dead geometry.** The violet curve is drawn once and never moves. For a page about *motion*, the curves should breathe: draw-on entrance, and ideally a faint travelling highlight-dot riding the curve *in sync with* the track-dot below it (the keyframes "ghost dot on the curve" idiom), so the user sees the abstract shape AND the concrete translation simultaneously. That single move would make the page distinctive.

---

## 4. POLISH + DISTINCTIVENESS — bespoke-premium or generic-AI-template?

**Currently: competent-but-generic.** The honest read of the captures: rounded cards in a 2-col grid, a pill-chip filter row, two bordered tables. Strip the violet stroke and this is indistinguishable from a thousand Tailwind dashboard templates. The generic-AI tells are all present:
- **Uniform card grid with no rhythm** — every cell identical, no bento, no scale variation, no protagonist.
- **Flat plates over a flat background** — the glass is barely glass (see §6); over the inert cream/charcoal page the six-layer composite has nothing to refract, so the surfaces read as plain `bg-card`, not Liquid Glass.
- **Raw `<table>` elements** — the single most "I generated this" artifact on the page. A glass design system rendering its OWN doctrine as an unstyled HTML table is a missed opportunity bordering on self-contradiction.

**What's already distinctive (keep + amplify):** the THICK non-scaling 3px violet stroke over a real 0/1 coordinate frame with the overshoot band; the twin-source rigor (every plot is the REAL value.js evaluator, no fake hint-SVG); the dock-register chip rack. These are the seeds of a bespoke page — they're just buried under a documentation layout.

---

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY

**§L1 six-layer composite — FAILING in practice.** `.glass-card` composes the tier recipe correctly in CSS, but DESIGN.md §L1 is explicit that *"a primitive that omits one [layer] reads as iOS-7-flat"* and §L5 that the refraction is only real over a backdrop with content to bend. Over the `grid` wash there is **almost nothing to refract** — the captures show flat plates. The blur/saturate layers are doing no perceptual work. This is the *"glass is imperceptible over a flat substrate"* case AX.W54 itself names.
- The user's ask is the fix verbatim: **demos over COLORFUL aurora**. The manifest's `background: "grid"` was chosen to spend the one-GL budget on `springs` instead — but a curve GALLERY is exactly where a live aurora earns its context: the moving backdrop *demonstrates* what the curves drive. (PROCEDURAL-SUITE: aurora is offscreen-paused by construction; one GL context per route is affordable here if `springs` yields it or a `<DockStage>`-style shared single backdrop is used.)

**§L2 spring fidelity — present in DATA, absent in CHROME.** The page *teaches* `--spring-snappy`/`-bouncy` beautifully (the dots overshoot the twin), but the page's own UI motion uses **none** of them — the chips transition on `--ease-standard` (correct per motion-canon for surface bg), but the cards use a linear `transition-transform`, not a spring. The page that documents springs should itself move on springs (its transform legs, per P1).

**Paper register — entirely unused.** This is a GLASS-and-PAPER system and the page is all (weak) glass, no paper. The doctrine legend is the perfect paper surface — a `paper-grain-overlay` + `border-l-[3px]` section-accent rail + Fira-Code mono (the math-paper gold standard in design-idioms) would make the doctrine read as an *engraved reference card*, not an HTML table, and would give the page the glass/paper duality the north star demands.

---

## 6. SPACING / RHYTHM — golden-ratio discipline

Inherited StorySection rhythm is fine (the √φ section gaps, the tokenized `--story-page-section-gap`). **Inside the cards, the rhythm is flat** — uniform `p-4`, `gap-4` grid, no φ-derived block-vs-inline split (W-CARD-PAD's sqrt-φ ladder is shipped and unused here). The card internals stack label → jsName → note → plot → dot-track at even spacing; the plot (the protagonist) gets no extra breathing room over the metadata. The picker `mb-5`, the active-family heading `mb-5`, the play row `mb-4` — these are ad-hoc `mb-N` values, not the card-pad ladder. Minor, but it's the difference between "spaced" and "composed."

---

## 7. COLOR — suffusion proportion

**Correct restraint, under-exploited.** The page honors the one-color-event rule (motion-PURPLE `--motion-accent` is the single hue; body ink stays neutral) — good. But it spends its ONE event timidly: a thin stroke + a 12px dot. Meanwhile the page is monochrome-violet-on-cream everywhere else, which over 12 families reads *flat*. The 13-stop `--section-color` ramp and the `--viz-*` palette (the project's vibrant assets) are nowhere. A curve gallery could let **each FAMILY carry a faceted accent** (the Springs family violet, Bounce a warm hue, Steps a cool one) via the per-instance `--glass-accent` chromatic-rim axis (W-GLASS-ACCENT) on the active card — ONE color event per card, distinct per family, still proportioned. That's the difference between "purple page" and "a gallery where each family has identity." The dark-mode capture especially shows how monochrome-on-void reads as drab.

---

## TOP DESIGN MOVES (ranked, concrete, precept-named)

1. **Kill the double title.** Delete the local `<header>` (lines 197–205); the StoryPage masthead is the one title. (W-HIERARCHY2 — ONE ordered cluster.)
2. **Each sub-section in its OWN glass card + a BIGGER main card area** (the user's literal ask). Wrap the picker+grid in one large `surface="glass"` card that dominates the viewport, and put the doctrine + house-cores each in their OWN glass card — RETIRE the raw `<table>`s for `.glass-quiet` reference cards with `paper-grain-overlay` + the mono register. (§L1 seven-tier ladder; design-idioms math-paper; the GLASS+PAPER duality.)
3. **Put it over a COLORFUL live aurora.** Flip the manifest `background: "grid"` → a shared single `<Aurora>` backdrop (DockStage pattern, offscreen-paused), so the glass actually refracts and the moving field demonstrates the motion the curves drive. (§L1/§L5; AX.W54 "glass POPs over a rich backdrop"; PROCEDURAL-SUITE one-GL-per-route — afford it here.)
4. **Make every card ALIVE at the iOS-27 bar.** Auto-play the active family's dots + draw-on the curves on family-switch (keyframes ghost-curve `stroke-dashoffset`); a travelling highlight-dot ON the curve synced to the track-dot; `--scale-hover` (1.08) hover on `--spring-smooth`; `--scale-press` squish on click; a settle-glow when a spring overshoots-then-rests. (§L2/§L3; motion-canon P1/P2/P3.)
5. **Promote a HERO plot per family + faceted color + the audacious ladder.** One `display`-band featured curve per family with a per-family `--glass-accent` rim hue; the rest a supporting grid. Replace the duplicated `text-display-3` title-event with this protagonist. (§Audacious-display activation; W-GLASS-ACCENT per-instance hue; motion-canon one-event-per-surface — now one-per-card.)

Supporting: leverage the actual library `<SegmentedTabs>`/`<DockStack mode="facets">` for the picker instead of the hand-rolled chip rack (the "deftly use glass-ui components" ask); apply the W-CARD-PAD sqrt-φ internal padding ladder; standardize the subpath label (already `@mkbabb/glass-ui/easing` in the chassis chip — drop the SFC's redundant masthead copy so it isn't competing). Tighten the SFC's heavy inline comment prose (it documents R7/R8 history in the live file).

---

## 5-LINE VERDICT

1. The page has a world-class ASSET (the thick value.js-twin violet curve over a real 0/1 frame) trapped in a generic-AI documentation LAYOUT — flat plates, a uniform grid, and two raw HTML tables.
2. It violates its own north star: glass that can't refract over a flat `grid` wash (manifest decision, not accident — the user's "over COLORFUL aurora" ask is the fix), springs taught in the data but absent from the chrome, and zero §L3 press-squish on the curve cards.
3. Hierarchy breaks twice — a duplicated "Curve Gallery" title (delete the local header), and a uniform protagonist-less grid that wastes the audacious √φ ladder a motion gallery is built to flaunt.
4. Animation affordance is the steepest gap: the page about MOTION is static until clicked card-by-card — auto-play on family-switch, draw-on curves, hero plots, faceted per-family `--glass-accent`, and a real spring on hover/press would make it distinctive and alive.
5. The bones are right (correct IA, twin-source rigor, dock-register chip seed); the work is to TRANSPOSE it from a spec sheet into a bespoke gallery — bigger main card, each sub-section its own glass+paper card, over a live colorful aurora, with iOS-27 motion on every element.
