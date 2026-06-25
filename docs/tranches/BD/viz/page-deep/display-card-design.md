# display/card — FRONTEND-DESIGN deep critique (Pass-E)

SFC: `demo/stories/display/card.vue` · live: `http://localhost:5173/display/card`
North star: `DESIGN.md` (iOS-26/27 Liquid Glass §L1–§L5) · `docs/precepts/{design-idioms,motion-canon,affordance-map}.md`
Captured: 1440×900, both aurora sections, all 10 StorySections, the floating shell dock.

---

## TL;DR

This is the *most important* primitive page in the library — the Card IS the protagonist surface (DESIGN.md §L1 "resting … the default a primitive reaches for"). It is currently a **competent spec-sheet, not a bespoke showcase**. The hero ladder is right and the veil-over-aurora moment is genuinely lovely, but the page is overwhelmingly **flat sections on a single giant outer plate**, two of ten sections touch glass-over-color, the aurora reads as a **flat peach wash (not a colorful high-frequency field)**, and **nothing animates beyond the page-build entrance** — there is zero hover/press/state life on the specimen cards themselves, which is a direct miss against the §L3/§L4 "tap-squish is universal / every primitive ships motion" mandate the page exists to teach. The user's seven asks are all real and all unmet.

---

## 1. VISUAL HIERARCHY — does the eye land right?

**Strong:** The `Card` masthead (`text-display`-ladder, sqrt-φ, ~96px) over the standardized `@mkbabb/glass-ui/card` import chip + one-line blurb is exactly the typography-forward opening DESIGN.md wants. Eye lands on the wordmark, drops to the chip, then the body. Good.

**The collapse below the fold:** every section is `StorySection heading=… → <p class="text-sm text-muted-foreground"> → specimen`. Ten times. The `heading` rung (text-subheading, 20.4px/600 — AZ.W-HIERARCHY) is correct, but because **every section is the identical eyebrow-paragraph-specimen sandwich on the same flat page substrate**, the eye has no landmark — it reads as a documentation scroll, not a designed page. The √φ ladder is used ONCE (the masthead) and never again; the body never reaches above `text-lg`. For *the type-forward library's own card page* this is the cardinal under-use of its own audacious ladder — there is no second display moment, no oversized numeral, no editorial pull-quote specimen.

**The single-plate problem (the user's #1 ask):** The whole `StoryPage` body is wrapped in ONE resting-tier outer card (visible as the warm-cream plate behind every section). Sub-sections are *hairline-delimited flat regions inside it*, NOT their own cards. So a page demonstrating the **5-rung tier ladder** fails to *use* the ladder structurally — the sections that teach `floating` and `overlay` are themselves rendered as un-elevated flat copy. Self-undermining.

## 2. AFFORDANCE — clear interactive cues?

- The two `Switch` toggles (shadow/grain) are clear and correct. Good — they're the one genuinely interactive teaching control.
- The `CodeBlock` copy affordance reads (the copy glyph top-right).
- **But the specimen cards offer NO affordance cues.** A reader cannot tell which cards are interactive (the `:pressable` opt-in, the cartoon hover-lift, the scroll-shrink host) without reading the prose. The cartoon cards *do* lift on hover but there is no rest-state hint that they will. The scroll-shrink + ScrollCard hosts have no visible scroll affordance until you're inside them (no edge-fade cue, no `<FadingScroll>` feather — ironic, since the library ships exactly that primitive).
- The `tabindex="0"` scroll regions are keyboard-reachable but give no focus-visible glass cue at rest.

## 3. ANIMATION AFFORDANCE — is every element ALIVE at the iOS-27 bar?

**This is the biggest miss.** Per `affordance-map.md` the closed 5-primitive set (HOVER-LIFT · GLEAM-TRACK · PRESS-SQUISH · DRAG-MORPH · FOCUS-RING) should make *every* interactive element answer the pointer. On this page:

- **Entrance:** the `.scroll-build`/`.scroll-cascade` page-build fires once on route-enter — present, correct, PRM-carved. ✓ (the one alive thing).
- **Hover:** only the cartoon cards lift. The 5 tier-matrix cards, the polymorphic card, the nested cards, the veil plates, the CardAction card — **static on hover**. No gleam-track (`v-specular`), no hover-lift, no tier-bg shift. The protagonist surface of the library demonstrates none of its own §L1 catch-light or §L3 tap response.
- **Press:** the specimen cards do not squish. DESIGN.md §L3 is explicit — "tap-squish is universal … Cards that opt into interactivity squish." This page never opts a single card into `:pressable`, so the canonical interactive-card behavior is *invisible on the card page*.
- **State:** the shadow/grain toggles re-render instantly with no morph — a glass surface gaining/losing its drop-shadow + grain should cross-fade (the §L1 layers animating in), not hard-cut.
- **No procedural life:** the aurora is the only motion-bearing primitive and it's a near-static wash.

Verdict: against the BD "HIGH animation affordance for EVERY component" bar and `feedback_liquid_weight_universal` (ALL motion must carry inertia/weight/bounce), the page is ~90% static.

## 4. POLISH + DISTINCTIVENESS — bespoke-premium or generic-AI-template?

**Leaning generic-template.** The tells: identical section rhythm × 10; flat muted-gray body paragraphs; specimen cards as plain titled boxes with prose filler ("Surface alpha ~0.30α. The tier prop is the only knob…"). The ONE distinctive, premium moment is the **veil hero plate over aurora** ("Legible over anything.") — that single composition looks like a real product. It proves the page CAN be bespoke; the other nine sections don't try. The cartoon-accent row (rose/amber/teal bordered cards) is the second-best moment but the accent is a 1px border only — under-committed.

The aurora itself is the polish-killer: rendered, it's a **uniform warm-peach gradient** with almost no spatial variation, so the tier-alpha steps it's meant to reveal (0.30→0.95) are **imperceptible** in capture — all five cards read nearly identical. The comment in the SFC says aurora is staged "so the tier steps become perceptible against busy color," but `DEFAULT_AURORA_CONFIG` here paints a calm warm field, defeating the stated purpose. This is the §L1 "concentrated light / high-frequency backdrop" requirement unmet — and the user's "COLORFUL aurora" ask verbatim.

## 5. iOS-27 / GLASS / PAPER NORTH-STAR FIDELITY

- **§L1 six-layer composite:** the cards DO compose the six layers (blur+saturate, tint, rim, catch-light, shadow, grain) — structurally faithful. But over the flat-peach aurora the **backdrop-blur and saturate channels do nothing visible** (nothing high-frequency behind to refract), so the surfaces read iOS-7-flat-tinted, not iOS-26-lensing. The material is right; the *stage* defeats it.
- **§L1 glass-cannot-sample-glass:** respected (single aurora container per matrix). ✓
- **§L2/§L3 spring physics:** unused on the specimens (no press, no hover spring).
- **Paper morphism:** absent entirely. The page is all-glass; DESIGN's "GLASS + PAPER both" and the `paper-grain`/blueprint-grid vocabulary (the `math-paper` gold standard) never appear — a missed register for the cartoon/scroll-list specimens which would sing on a paper substrate.
- **§L5 a11y brackets:** inherited via tokens (not a page concern), fine.

## 6. SPACING / RHYTHM (golden-ratio)

Card-internal padding rides the W-CARD-PAD √φ ladder (`--card-pad-inline/-block`) — correct and visible (headings clear the top edge by the sqrt-φ lift). **Inter-section rhythm is monotone** — every `StorySection gap="lg"` is the same vertical beat, so there's no φ-stepped cadence between a major section and its sub-examples. The two aurora frames are `p-6`/`p-10` islands that break rhythm pleasantly; everything else is flat-spaced.

## 7. COLOR — suffusion proportion

Disciplined to a fault. Body ink is untinted (the §W-SUFFUSE d1 floor — good), the cartoon row carries its 3-hue accent (rose/amber/teal off `--section-color-*`), the import chip is neutral. But the page spends its ONE-color-event budget *only* on the cartoon borders, and even there it's a hairline. The 13-stop `--section-color` ramp and the `<IconChip>` pop vehicle are absent. Result: the page is ~95% warm-cream monochrome — calm, but under the "deftly uses a series of glass-ui components" bar it reads under-vibrant. The aurora should be carrying the color event and isn't.

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Each sub-section in its OWN glassy card, ascending the ladder (user ask #1).** Drop the single outer plate. Render every `StorySection` as a discrete `<Card>` whose tier *matches what it teaches* — the floating section in a `floating` card, the overlay section in an `overlay` card — so the page *is* the ladder it documents. Stagger them on `.scroll-cascade` (already shipping). This alone fixes hierarchy + distinctiveness + self-demonstration at once.

2. **Make the aurora actually colorful + high-frequency (user ask #5, DESIGN §L1).** Replace `DEFAULT_AURORA_CONFIG` with a saturated multi-nuclei preset (or a `concentric`/`paper-grid` procedural from PROCEDURAL-SUITE.md) on the tier-matrix + veil + give a colorful field behind the *whole* page (one offscreen-paused GL context per route — DockStage's `<Aurora>` pattern). The tier-alpha steps only teach against busy color; the §L1 refraction only reads against high frequency.

3. **Animate every specimen to the iOS-27 bar (user ask: HIGH animation affordance; §L3/affordance-map).** Opt the demonstration cards into `:pressable` (press-squish), arm `v-specular` on the glass cards (gleam-track), add hover-lift to the tier cards. The card page must SHOW the card's four-state contract, not describe it. Cross-fade the shadow/grain toggles (§L1 layers morphing) instead of hard-cut.

4. **Leverage the dock APIs for contextual switching (user ask #3).** The tier ladder + the surface-axis (glass/veil/opaque/cartoon) + the scroll-card family are three *axes* — host them in a `<DockLayerGroup>`/`<DockStack mode="facets">` contextual switcher so the reader flips facets and the specimen morphs (the dock's contextual-switching/silhouette API is the exact idiom). One animated dock replaces three flat sections.

5. **Deploy a series of glass-ui components per the brief (user ask #4) + a second display moment.** Use `<SegmentedTabs>` to switch tier presets, a `<BorderProgress>` card to show progress-as-border, an oversized `text-display` numeral or `<IconChip>` pop as a second typographic landmark, and a paper-grain specimen for the GLASS+PAPER duality. The page should feel like a tour, not a table.

6. **Make the bigger main-card area (user ask #2).** Give the tier matrix + veil aurora frames substantially more viewport — full-bleed-within-content, 16:9-ish stages — so the glass-over-color hero reads at premium scale, not as a `p-6` thumbnail strip.

7. **Tighten superfluous language (user ask #7).** The blurbs editorialize ("field-for-field", "a latent a11y regression this recipe fixes", "exactly like shadow and grain"). Cut to one declarative line per section; let the live specimen + animation teach. The import chip is already standardized (`@mkbabb/glass-ui/card`) — keep that, prune the prose around it.

---

## VERDICT (5 lines)

1. Structurally honest, materially faithful (six-layer §L1 composite, √φ card padding, suffusion discipline) but reads as a competent spec-sheet, not the bespoke showcase the protagonist-surface page demands.
2. The user's #1 ask is the fix: each sub-section in its OWN tier-matched glassy card ascending the ladder — kill the single flat outer plate so the page IS the ladder it documents.
3. ~90% static against the iOS-27 / affordance-map bar — the card page demonstrates NONE of its own hover-lift/gleam-track/press-squish; opt specimens into `:pressable` + `v-specular` and the page comes alive.
4. The aurora is a flat peach wash, not the colorful high-frequency field §L1 refraction + the tier-alpha steps require — make it saturated/procedural and give it (and a bigger main stage) real viewport.
5. Best moment (the veil hero plate over aurora) proves the page can be premium; leverage the dock contextual-switcher + SegmentedTabs + a second display landmark + tightened prose to make the other nine sections match it.
