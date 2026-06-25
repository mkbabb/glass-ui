# foundations/motion — FRONTEND-DESIGN deep critique (Pass-E)

**Page:** `demo/stories/foundations/motion.vue` · live `http://localhost:5173/foundations/motion`
**Captures:** `motion-light.png` (hero), `motion-cards2.png` (the 6-card grid)
**Lens:** the frontend-design skill (distinctive, production-grade, AVOID generic-AI) applied to glass-ui's own iOS-26/27 + paper/glass language (DESIGN.md §L1–L5, motion-canon P1–P7, affordance-map's 5 primitives, PROCEDURAL-SUITE).

---

## The one-line indictment

This is the page where the motion system LIVES, and it is the most MOTIONLESS, least-glassy page in the library. It is a spec-sheet — a bordered HTML `<table>` + six flat opaque `bg-card` boxes with a purple `hello` chip — rendered with near-zero of the very vocabulary it documents. A page about §L2 spring physics that does not spring, about §L1 six-layer glass that ships zero glass tiers, about the affordance-map's five primitives that demonstrates none of them on its own chrome. The content is honest and well-written; the DESIGN is a placeholder. By the frontend-design bar it reads as a generic-AI documentation template (table + card grid + accent buttons), the exact aesthetic the skill exists to refuse.

---

## 1. Visual hierarchy — the eye lands, then starves

- **Hero is correct and is the page's only good design move.** `Motion` renders at `text-display-3` (86px Plus Jakarta), the audacious √φ ladder doing its job; the mono `/foundations/motion` eyebrow + the blurb cluster read in order. This is the StoryHeader GRAVITY cluster (W-HIERARCHY2) working. Keep it.
- **Then the hierarchy flatlines.** Below the hero everything is ONE visual weight: a 14px table and six identical 14px-titled cards. There is no second focal beat, no "hero specimen," no scale contrast. The audacious ladder (`text-display-mega`/`-hero`/`-audacious`) is the house's signature weapon and it appears EXACTLY ONCE on the whole page. DESIGN.md calls the library "kinetically typographic" — this page is typographically inert past the masthead.
- **The `<table>` is a foreign body.** A raw `<table class="w-full text-sm">` with `bg-[var(--surface-tint-1)]` header and `border-border/40` rows is a spreadsheet, not a design-system specimen. It is the single most generic-AI element on the page. The easing DOCTRINE — the heart of motion-canon P1 (spatial-spring vs effects-bezier) — deserves to be a designed artifact (a two-lane visual split, each row a live mini-demonstration of its own curve), not tabular data.
- **Card-title rung is too quiet.** `<code class="fira-code text-small">` for the transition NAME means the card's identity reads at body weight (14px). Per AZ.W-HIERARCHY the card should carry a `text-subheading` (20.4px/600) title rung so a card reads as a card, not a row.

## 2. Affordance — weak, and self-contradictory for a MOTION page

- **The only interactive cue is the `Toggle` `<Button variant="secondary">`.** It is a real four-state component (good), but it is small, bottom-right, and visually subordinate to the static `hello` chip it drives. On the page whose entire subject is "what does interaction feel like," the interaction handle is an afterthought.
- **The cards themselves give no affordance.** They are `bg-card` plates with `shadow-cartoon` — they do not lift, do not gleam, do not respond to the pointer. A first-time viewer cannot tell the card is the demonstration surface vs. a static panel. Per the affordance-map, EVERY interactive-adjacent surface should answer the pointer; these answer nothing.
- **No keyboard/focus story is visible.** FOCUS-RING (affordance-map primitive #5, the non-negotiable a11y floor) is present on the Button but the page never showcases it — ironic on a foundations page.

## 3. Animation affordance — the cardinal failure

This is a MOTION page at the iOS-27 bar; measured against §L4 (every primitive ships strong-tier motion) and motion-canon P7 ("everything is the same liquid"), it scores near zero on its own chrome:

- **Zero entrance choreography.** The page does NOT compose `.scroll-build` / `.scroll-cascade` (W-SCROLL-MOTION). Cards do not build in on a `view()` timeline; the table does not assemble. The page that teaches enter-grammar has no enter-grammar. Compare: the user mandate "HIGH animation affordance for EVERY component."
- **Zero hover/press life on the chrome.** No HOVER-LIFT (#1), no GLEAM-TRACK (#2), no PRESS-SQUISH (#3) on the cards or the chip. The `hello` chip is a dead `bg-[var(--motion-accent)]` rectangle until you click Toggle.
- **The transitions DO fire on toggle — and that's the whole demo.** The 6 `<Transition>` class-sets (fade/fade-slide/pop/dialog-scale/dropdown/tab-fade) are real and correct, but they only animate on an explicit click, on a `hello` placeholder, inside a tiny 112px well. The single most important thing this page could do — make the user FEEL the difference between `--spring-bouncy` and `--ease-out` — is buried behind a manual toggle on a featureless purple box.
- **The biggest miss: the page ignores the procedural suite entirely.** The user's brief says "each page deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)" and "glass demos over COLORFUL aurora backgrounds." This page has NO aurora (it inherits `foundations → paper`, a static wash — confirmed in `manifest.ts:182`), NO dock, NO tabs, NO procedural viz. A motion page is the NATURAL home for a live spring-driven viz (a `<FourierField>` reconstructing, a blob morphing on `--spring-bouncy`) as the hero specimen — the suite is RIGHT THERE in `/fourier-field`, `/goo-blob`.

## 4. Polish + distinctiveness — generic-AI template

- **The composite is "table + 3-col card grid + accent button."** That is the canonical generic-AI documentation layout. Nothing here is bespoke. There is no detail that says "a world-class designer touched this": no edge rim, no catch-light, no grain, no spring overshoot, no curve made visible.
- **`shadow-cartoon` on a flat `bg-card`** is the Memphis-sticker offset — fine as the library's identity, but here it is the ONLY decorative move, and it's applied uniformly to six identical boxes, so it reads as repetition, not rhythm.
- **The `hello` chip with `text-white`** is an outright register violation: `bg-[var(--motion-accent)]` + `text-white` is a saturated opaque slab with a hard white label — the exact thing W-NO-GRAY/W-FEEDBACK-TONE and the glass-first canon (AX.W54) retired everywhere else. White-on-violet is not the warm-ink identity. On the FOUNDATIONS motion page this is doubly wrong because it models bad practice.

## 5. North-star fidelity (iOS-26/27 · paper · glass)

- **§L1 Liquid Glass: 0/7 tiers used.** Not one `.glass-*` surface on the page. The cards should be glass tiles (`resting`/`quiet`) over a live colorful backdrop so the six-layer composite (blur+saturate · tint · rim · catch-light · shadow · grain) is VISIBLE — that IS the demo. Right now glass is documented in prose elsewhere and absent here.
- **§L2 Spring physics: documented, never felt.** The doctrine table NAMES `--spring-bouncy`/`--spring-snappy` but the page never plots, never paces, never lets you compare them side-by-side at a perceptible scale. The Curve Gallery (rightly) owns the plots — but this page deliberately ships NOTHING kinetic in their place (the de-dup left a vacuum, not a different demonstration).
- **§L3 Tap choreography: absent on the page's own controls** beyond the stock Button.
- **Paper morphism: thin.** The page inherits a paper wash but does nothing editorial with it — no `.paper-ink-mark` rail, no fira-code math block, no `math-paper.vue` gold-standard treatment. It's paper-by-default, not paper-by-design.
- **§L5 a11y brackets: inherited, not showcased** (acceptable, but a foundations page could demonstrate the PRM keep-fade/drop-transform behavior live — motion-canon P6).

## 6. Spacing / rhythm / color

- **Spacing is competent but flat.** `gap-6` grid, `p-5` cards, `gap-4` interior — uniform, no golden-ratio block-over-inline (W-CARD-PAD's sqrt-φ ladder is unused; the cards are hand-rolled divs, not `<Card>`, so they miss the whole `--card-pad-*` φ-system). The main card area is also CRAMPED relative to the viewport — the user's explicit ask ("the main card area BIGGER, more screen space") bites here: the content column is narrow and the hero eats the top third.
- **Color: the suffusion proportion is roughly held but the ONE event is the WRONG one.** `--motion-accent` (legendre-violet, correct family per W-SUFFUSE) is the page's single color event — good discipline. But it lands as a flat fill on six `hello` slabs, not as a single deliberate focal pop. The motion-PURPLE identity should appear as a curve stroke / a viz / a masthead accent (the `motion.vue` reference idiom), not six repeated white-on-violet rectangles.

---

## TOP design moves (ranked — to make this page exceptional)

1. **Re-stage the whole page over a LIVE colorful backdrop and make the cards GLASS.** Wrap the grid in a `<DockStage>`-style ONE-aurora composition (or a `<FourierField>`/blob the motion page earns thematically), drop each transition demo into a `glass-resting`/`quiet` tile, and let the six-layer composite (§L1) read THROUGH the demo. This single move converts the page from spec-sheet to specimen and satisfies "glass demos over colorful aurora" + "main card area bigger" at once. Fixes §L1 0/7.
2. **Each sub-section in its OWN glassy card (the user's literal ask), and use real `<Card>`** (not hand-rolled `bg-card` divs) so the W-CARD-PAD sqrt-φ padding ladder, the `surface` axis, and `:pressable` HOVER-LIFT come for free. Promote the card title to `text-subheading`.
3. **Make the doctrine table a LIVE two-lane spatial/effects split (motion-canon P1).** Kill the `<table>`. Render two columns — SPATIAL (springs) vs EFFECTS (beziers) — each row a card whose own mini-element animates on hover with its named curve, so the doctrine is DEMONSTRATED, not tabulated. This is the bespoke, distinctive move the page is missing.
4. **Auto-play the transitions on entrance + on hover, not only on manual Toggle.** Compose `.scroll-cascade` so the six tiles build in (each on its own `view()` timeline), and re-fire each card's `<Transition>` on hover so the user FEELS bouncy-vs-snappy-vs-ease-out without clicking. Add HOVER-LIFT + GLEAM-TRACK + PRESS-SQUISH to the tiles (affordance-map #1/#2/#3). This is the iOS-27 "every element alive" bar.
5. **Add a HERO motion specimen + leverage the dock APIs.** Above the grid, place ONE large focal demonstration — a spring-driven `<FourierField>` or blob the page can morph V↔H, contextually switched by a small `<GlassDock>`/`DockStack` that changes which spring register drives it (the user's "leverage the dock APIs / contextual switching"). Use the audacious ladder (`text-display-mega`) on a live readout (e.g. the spring's response value tweening). This gives the page its second focal beat and a reason to exist beyond the table.
6. **Fix the register violations + tighten copy.** Replace `bg-[var(--motion-accent)] text-white` chips with a glass-tinted accent surface reading warm-ink (or `--glass-accent` rim, per W-GLASS-ACCENT). Standardize the import-path label (the eyebrow) to the canonical `@mkbabb/glass-ui/...` form. Tighten the blurbs (drop "the plainest tool in the box" / "menus, hints, floaters" telegraph-prose to one crisp clause each, per the writing-style precept).

---

## VERDICT (5 lines)

1. The page that teaches glass-ui's motion system is its least animated, least glassy surface — a spec-sheet (`<table>` + six flat `bg-card` boxes + a buried Toggle), the exact generic-AI documentation template the frontend-design skill refuses.
2. North-star fidelity is failing: §L1 ships 0/7 glass tiers, §L2 springs are documented-but-never-felt, the affordance-map's five primitives appear on none of the page's own chrome, and the procedural suite + dock APIs are entirely unused.
3. The hero (audacious `text-display-3` cluster) is the only strong move; below it hierarchy flatlines to one body-weight register and the audacious ladder is wasted, while `text-white` on `bg-[--motion-accent]` is an outright warm-ink register violation.
4. Top moves: re-stage over a LIVE colorful backdrop with GLASS tiles, make the doctrine a live spatial-vs-effects demonstration (not a table), auto-animate on entrance+hover with HOVER-LIFT/GLEAM/PRESS, add a dock-switched hero spring specimen, and enlarge the main card area.
5. Net: honest content, placeholder design — a 3/10 on the bespoke-premium axis that should be the showcase page; the fixes are pure transposition of vocabulary the library already ships.
