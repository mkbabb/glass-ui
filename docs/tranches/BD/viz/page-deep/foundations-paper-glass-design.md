# foundations/paper-glass — FRONTEND-DESIGN deep critique (Pass-E)

**Page:** `demo/stories/foundations/paper-glass.vue` · live `http://localhost:5173/foundations/paper-glass`
**Lens:** frontend-design skill (distinctive, production-grade, AVOID generic-AI aesthetics) × this project's iOS-26/27 Liquid-Glass + paper north star.
**Verdict in one line:** the page that is literally titled *Paper & Glass* fails to render either as a material — the "vivid colour field" washes to near-monochrome gray, every tier card is a flat gray slab, and the lower half is a generic bordered spec-sheet. It is the canonical "documentary diagram of glass" instead of "a thing made of glass."

---

## 0. What the page is supposed to be

This is the FOUNDATION page for the entire design system's signature material. Per **DESIGN.md** it must demonstrate the *six-layer optical composite* (backdrop blur+saturate · surface tint · edge rim · inner catch-light · drop shadow · grain), the *seven glass tiers*, *glass-cannot-sample-glass*, and *paper morphism*. It is the page a designer opens to BELIEVE in the system. Right now it under-sells the system it is the proof of.

---

## 1. VISUAL HIERARCHY — the eye lands wrong twice

**The hero eats the fold.** The `text-display` `<h1>` "Paper & Glass" renders at ~86px and consumes the ENTIRE first viewport — at 1440×900 you scroll a full screen before reaching a single glass tile. The audacious √φ ladder (CLAUDE.md *audacious-type uplift*) is present, but a foundations/specimen page is the WRONG place to spend `heroScale: "4"`; the type ladder should be *demonstrated within the cards*, not blown up as a poster that delays the actual content. **Move:** drop the hero to `heroScale: "2"` (or render it as a tight `<StoryHeader>` cluster) and give the reclaimed vertical to a BIGGER hero glass-tiers card (the user's explicit ask: "main card area BIGGER").

**The blurb is a throwaway.** "Four glass tiers, paper grain, blend modes." is set at `text-small` muted — it is invisible next to the 86px title, and it *undersells*. (It also says "four" while the page ships FIVE tiers — wash/quiet/resting/floating/overlay. Factual drift.) This is the *superfluous-language* the user flagged: tighten to one declarative line that actually sells the composite, e.g. "Five translucent tiers. Real backdrop refraction. Warm-cream grain."

**The two body grids fight for the same rung.** The top "tier tiles" grid (4-up) and the "Glass tiers over colour" `<StorySection>` (3-up) are nearly identical card grids with no hierarchy between them — the eye cannot tell which is the canonical demonstration. They should be ONE escalating story (small swatches → the big hero demonstration), not two peer grids.

## 2. AFFORDANCE — everything reads inert

Per **docs/precepts/affordance-map.md** every surface should telegraph its interaction. Here NOTHING is interactive: the tier tiles are static `<div>`s, the "over colour" cards are static, the token readout is static. For a page whose entire subject is a *physically reactive material* (the spec's *spring physics* + *inner catch-light that tracks the pointer*), the total absence of hover/press is the single biggest miss. The `vSpecular` tier-root auto-arm (CLAUDE.md *W-LIQUIDHOVER*) and `useLiquidReveal` exist in this very library and are not used on the page that should be their showcase.

## 3. ANIMATION AFFORDANCE — far below the iOS-27 bar

**Entrance:** the page rides `.scroll-build`/`.scroll-cascade` (CLAUDE.md *W-SCROLL-MOTION*) for chrome — but the demonstration cards themselves do not stagger-in as a deliberate beat, and during programmatic scroll the smooth-scroll register produced a visible **repaint ghost** of the giant hero bleeding over the lower content (a jank artifact worth a perf look on Safari).

**Hover / press / state:** ZERO. Against **motion-canon.md** P1 (spring-iff-spatial) / P3 (fade-coupled-to-transform), a Liquid-Glass tier card MUST:
- lift on hover with the pointer-tracked **inner catch-light** (`vSpecular`) — the sixth optical layer, currently dead;
- press with the coupled `useSpringPress` + `useLiquidFlex` reciprocal squish (CLAUDE.md *W-PRESS-UNIFY*);
- bloom-in via `useLiquidReveal` on first paint (the *iOS-27 bloom-from-source*, CLAUDE.md *W-LIQUID-REVEAL*).

None of these — the marquee primitives the library SHIPS — appear on the page that exists to sell them. This is the defining gap.

## 4. POLISH + DISTINCTIVENESS — currently generic-AI-template

- **The "Live token values" section is a spec-sheet** — 5 identical `border bg-card/60 rounded-panel` boxes of `opacity · 0.30 / blur · blur(calc(1px * 1))`. This is exactly the *flat bordered-card grid* the frontend-design skill names as the AI tell. It also LEAKS implementation (`blur(calc(1px * 1))`) — raw `calc()` strings are not a designed readout. **Move:** make this a live, animated **tier ladder visualization** — a single stacked specimen where each rung's opacity/blur is shown BY the surface itself (a real glass plate at that value over the live field), with the number as a quiet caption. Show, don't tabulate.
- **The accent dots** (`h-3 w-3 rounded-full`) are the only color on the whole page and they're decorative confetti with no meaning — `--viz-fourier` (red) on two cards, `--viz-chebyshev` (blue) on one, no legend. Either make them load-bearing (a per-tier identity) or cut them (*one-color-event* proportion, CLAUDE.md *W-SUFFUSE*).
- **The `bg-card/60` opaque plates** under the token readout are the BG-2 black-plate anti-pattern (CLAUDE.md *W-STAGE* `tier="field"`) — opaque slabs on a glass page.

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY — the core failure

**The colour field is not vivid.** The "Glass tiers over colour" card builds its field from `color-mix(... var(--viz-fourier) 24%, transparent)` + `var(--viz-chebyshev) 25%` corner radials over `--background`. At 24–25% over a warm-cream page, behind a `--surface-tint-8` grid at `opacity-45`, the result is **near-monochrome gray** (confirmed live). DESIGN.md's whole point — *glass over a saturated backdrop reveals the six-layer composite* — collapses because there is nothing saturated behind the glass. The user's ask is literal: **"glass demos over COLORFUL aurora backgrounds."** A flat CSS gradient at 24% is not it.

**The cards don't read as glass.** Because the field is gray AND the cards are content-tier glass (calm self-engage floor only), the tier tiles read as five near-identical gray rectangles — the exact failure the SFC comment swears it avoids ("rather than five identical white rectangles"). The *backdrop refraction*, *edge rim*, and *catch-light* (DESIGN.md layers 1/3/4) are imperceptible because there is no structured colour behind them to bend.

**Paper is asserted, not felt.** `paper-grain-overlay` is on the tiles, but over a gray field at this scale the SVG-turbulence grain is invisible. The GLASS+PAPER duality the page promises never visually resolves.

## 6. SPACING / RHYTHM — competent but flat

`gap-6` / `gap-4` grids and `p-5` cards are fine, but there is no φ-derived cadence (the **W-CARD-PAD** sqrt-φ block-over-inline ladder is not used; `p-5` is uniform). The hero→body transition is a hard cut with no breathing section gap. The page is rhythmically *even* where the system's identity is *golden-proportioned*.

## 7. IMPORT-PATH LABEL — present but inconsistent with the ask

The subpath chip `/foundations/paper-glass` renders (good — the user wants it standardized), but it shows the ROUTE, not the component import path. For a foundations page demonstrating `.glass-*` CSS classes there is no single import; standardize the chip to name the *stylesheet entry* (`@mkbabb/glass-ui/styles`) so the convention matches component pages that show `@mkbabb/glass-ui/<name>`.

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Put a REAL colourful aurora behind the glass.** Replace the 24% CSS gradient with a live `<Aurora>` (vivid preset) as the section backdrop, offscreen-paused via `<DockStage>`/`useIntersectionPause` (one GL context per route — the budget is met by staging). NOW the six-layer composite, the refraction, the rim, and the grain all read. This single move fixes §5 wholesale and answers the user's headline ask. (DESIGN.md six-layer composite; CLAUDE.md *W-STAGE* / *DockStage* / one-GL-per-route.)

2. **Make each sub-section its OWN glassy card and grow the hero demo.** Per the user: wrap the tier-ladder demonstration in ONE big `glass-floating` hero card over the aurora (the "main card area BIGGER"), the standalone-grain demo in a second glassy card, the token readout in a third — each a `surface="glass"` plate, not bordered `bg-card` boxes. Kill the duplicate 4-up/3-up redundancy: one escalating sequence.

3. **Wire the dock APIs for contextual switching.** Per the user's "leverage the dock APIs": add a `<DockStack mode="facets">` (CLAUDE.md *W-DOCK-RAIL-REALIZE*) whose facets switch the displayed tier (wash→quiet→resting→floating→overlay), each facet carrying its tier's accent via `--glass-accent` (CLAUDE.md *W-GLASS-ACCENT*), morphing the hero card's tier live. This turns a static ladder into an *interactive material explorer* and demonstrates the dock contextual-switching the page is meant to teach.

4. **Bring every card ALIVE to the iOS-27 bar.** Tier cards: `vSpecular` catch-light on hover + `useLiquidReveal` bloom-in entrance + `useSpringPress` squish on press (motion-canon P1/P3; CLAUDE.md *W-LIQUIDHOVER* / *W-LIQUID-REVEAL* / *W-PRESS-UNIFY*). The page becomes the marquee for the library's own motion primitives.

5. **Re-design the token readout as a living ladder, not a table.** A single vertical stack of FIVE real glass plates (one per tier at its true opacity/blur over the aurora), each labelled with its number as a quiet mono caption — the value is *shown by the material*, the figure annotates. Add a `<SegmentedTabs>` to toggle light/dark so the dark transmissive register (CLAUDE.md *W-DARK-MATERIAL*) is demonstrated too.

6. **Tighten copy + fix the "four"→"five" drift + standardize labels.** One declarative blurb; mono `.section-label` eyebrows; the subpath chip naming `@mkbabb/glass-ui/styles`; drop the meaningless accent confetti or make it load-bearing.

7. **Restore golden rhythm.** Use the **W-CARD-PAD** sqrt-φ block-over-inline padding on the hero card; add a real section gap between hero and body; let the type ladder breathe inside the cards instead of as a poster.
