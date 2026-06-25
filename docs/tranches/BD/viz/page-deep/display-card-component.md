# display/card — COMPONENT deep audit (Card family)

**Page:** `demo/stories/display/card.vue` → imports `@mkbabb/glass-ui/card`
**Real src under audit:** `src/components/ui/card/{Card,CardHeader,ScrollCard,ScrollCardHeader,CardTitle,CardDescription,CardContent,CardFooter,CardAction}.vue` + `src/composables/motion/useLiquidPress.ts` + `src/composables/glass/vSpecular.ts` + the glass material recipe `src/styles/glass/{material,ladder,rim}.css`.
**North star:** DESIGN.md §Glass Surfaces / §Card flat-offset shadows · motion-canon P1–P6 · affordance-map five-primitive set.

---

## What the component IS (verified by reading)

`<Card>` (Card.vue, 405L) is a reka `Primitive` wrapper exposing FIVE orthogonal axes — `tier` (7-rung glass ladder wash→overlay + opaque + deep), `surface` (glass·cartoon·veil), `shadow`, `grain`, `grid`, `specular` (off·subtle·full), `pressable`, plus the BC selection-card axis (`variant="selection"` + `selected`/`metal`/`dataHue`). The golden sqrt-φ/φ padding ladder (`--card-pad-inline` anchor → block/section-gap/footer/title-gap via calc) is minted on the root. `ScrollCard`/`ScrollCardHeader` are the first-class scroll-shrink family; `CardHeader shrink` runs a compositor-safe 3-lane scroll choreography (translateY/scale/opacity, NEVER layout props).

This is an architecturally STRONG, idiomatic primitive — the axes are token-first, the press/specular are single-sourced, no dual paths. The findings are about animation COMPLETENESS and demo composition, not rot.

---

## 1 · ANIMATION — the central gap

**FINDING A1 (HIGH) — a default `<Card>` is animation-DEAD.** The four-state contract + entrance/exit per motion-canon does NOT hold for the common content-card case:
- **No entrance.** Card.vue references ZERO entrance primitive — no `vReveal`, no `.scroll-cascade`, no `animate-in`. A grid of cards (the page's tier-matrix, the cartoon row) appears with a hard pop. The library SHIPS the entrance vocabulary (`vReveal` `[data-reveal]`, `.scroll-cascade` view()-timeline build) but Card consumes none of it — the user's "HIGH animation affordance for EVERY component" bar is unmet at the protagonist plate.
- **No hover-lift on the glass surface.** `glass/material.css:215-221` wakes ONLY the specular `::before` on `:hover`/`:active`, and the gleam is gated behind the opt-in `specular` prop (default `off`). A plain `<Card>` over the aurora has no scale/translate/elevation response — the iOS "card breathes on hover" affordance lives ONLY on `surface="cartoon"` (the Memphis lift) and `:pressable` (the press). The default content card is inert.
- **Press is correct + complete** (`useLiquidPress`: interruptible spring, reciprocal X/Y squish, `--card-press-t` coupled brightness, PRM-instant, compositor-only) — but default-OFF, so the page demos none of it (no `:pressable` card anywhere in card.vue).

**FINDING A2 (MED) — the scroll-shrink choreography is exemplary** (CardHeader.vue): compositor-safe transform/opacity, `:slotted()` precise targeting, PRM outer-gate, `--card-scroll` named timeline. No jank. This is the model the rest of the family should reach toward. KEEP.

**FINDING A3 (LOW) — specular `full` rung is well-tuned** (AX.W52 derived DOWN to 0.04/0.18/0.26, contained gleam not white-screen). Wire-or-omit is clean.

---

## 2 · PROCEDURAL VIZ — N/A in component; demo-only

Card has no procedural viz. The DEMO mounts `<Aurora :config="DEFAULT_AURORA_CONFIG">` twice (tier matrix + veil section) as the backdrop the glass reads through — correct per DESIGN (glass POPS over a colorful field). **FINDING V1 (LOW):** two live Aurora GL contexts on ONE route violates the one-GL-context-per-route budget (BA.W-STAGE). Should be ONE shared offscreen-paused `<DockStage>`-style backdrop, or `DEFAULT_AURORA_CONFIG` is not the COLORFUL preset the user wants (it is the calm default).

---

## 3 · PERFORMANCE — clean

Compositor-only throughout (press = scale + custom prop; shrink = transform/opacity; specular = `::before` translate). `proof:no-layout-animation` locks the shrink lanes. No layout thrash. ScrollCard's grain defaults OFF (the `::after`-vs-overflow-repaint conflict, correctly avoided). No offscreen-pause needed (no rAF in Card itself; the press spring parks on settle). PASS.

---

## 4 · SAFARI — one real gap

The six-layer composite uses `backdrop-filter` (Safari OK), the `--glass-edge-light` whole-layer rim (OK), grain `::after` (OK). **FINDING S1 (MED):** `surface="veil"`'s `--veil-feather` radial mask + the `.glass-lens` refraction (`backdrop-filter: url(#glass-refract)`) are Chromium-only (WebKit bug 245510) — Card itself does not apply `.glass-lens`, but a `deep`-tier hero CARD that a consumer pairs with `:liquid` degrades to blur+tint on Safari. Documented degrade floor, acceptable, but the page never surfaces it. The base glass tiers are fully Safari-compatible.

---

## 5 · IDIOMATIC / no-legacy — strong, two nits

- **CLEAN:** press single-sourced, specular single-position-write (vSpecular wraps `createSpecularWriter`), `--card-spacing` retired clean (no alias), surface-axis routed through shared resolver.
- **FINDING I1 (LOW):** `useStalePropWarning("Card", ["flush"])` — a dev-warn shim for a never-existed prop. Acceptable invariant-31 hygiene, not legacy.
- **FINDING I2 (LOW):** the `surfaceClass('veil').replace(/^glass-\w+\s+/, '')` regex strip (Card.vue:378) to drop the resolver's base-tier prefix is a mild smell — the resolver could expose a `decorationOnly` flavor. Transpose, don't patch.

---

## 6 · GLASS SIX-LAYER COMPOSITE — PRESENT + complete

All six layers verified in `glass/material.css` + `ladder.css` + `rim.css`: (1) backdrop blur+saturate per tier · (2) surface tint (`--glass-bg-{tier}` + W55 adaptive) · (3) edge rim (`--glass-edge-light` whole-shadow-layer) · (4) inner catch-light (`.glass-material::before` specular core) · (5) drop shadow (`--shadow-card`/`--glass-shadow-{tier}`) · (6) grain (`::after` `--paper-clean-texture`). glass-cannot-sample-glass holds (no nested backdrop-filter on inner cards in the demo's nested pattern — `:shadow=false` only). PASS — this is the reference implementation.

---

## DEMO-side findings (the user's seven asks)

- **D1 (HIGH) — sub-sections NOT each in their own glassy card.** The page is flat `<StorySection>` blocks with raw `<p class="text-sm text-muted-foreground">` intros; the user wants each sub-section in its OWN glassy card. Wrap each `StorySection` body in a `<Card tier="quiet">` / `<ShowcaseFrame>`.
- **D2 (HIGH) — main card area too small.** Cards render in a `gap-6 p-6` grid; the user wants the main demo area BIGGER (more screen space). Enlarge the protagonist tier-matrix + give the veil hero plate more bleed.
- **D3 (HIGH) — dock APIs unused.** Zero `<GlassDock>`/`<DockStack>`/contextual-switching on the page. The user wants the dock's contextual-switching/animating leveraged (e.g. a dock to switch tier/surface/specular live).
- **D4 (MED) — aurora is the calm DEFAULT, not colorful.** `DEFAULT_AURORA_CONFIG` over a COLORFUL preset; and 2 GL contexts (V1).
- **D5 (LOW) — import label IS standardized** (`@mkbabb/glass-ui/card` in the CodeBlock) but the page's OWN import is the deep relative `../../../src/...` path — fine for demo, but the displayed label is correct. KEEP.
- **D6 (LOW) — superfluous language.** The intros over-explain the seam internals ("the class merge happens at the single cn(...) seam in Card.vue") — tighten to the affordance, not the implementation.

---

## BD-tranche mapping (FOLD/MODIFY/AUGMENT/PRUNE)

| # | Finding | Disposition | Wave |
|---|---------|-------------|------|
| A1-entrance | Card has no entrance/hover animation | **AUGMENT** — add `vReveal`/`.scroll-cascade` consumption + an opt-in glass hover-lift affordance on the base tier (the affordance-map hover-lift primitive, default-on for content cards) | NEW `BD.W-CARD-AFFORDANCE` (cite affordance-map.md; sibling to the goo-morph/cta-receive Pass-E fixes) |
| A2 | scroll-shrink exemplary | **KEEP** | — (model for the family) |
| V1/D4 | 2 GL contexts + calm preset | **MODIFY** | `BD.W-DATA-BAND-GLASS` precedent (tier=field over ONE shared colorful field); apply the DockStage one-context idiom |
| S1 | veil/lens Safari degrade | **KEEP** (documented floor) | `BD.W-GLASS-LENS-CHROMA` (the deep/lens band owns the Safari note) |
| I2 | veil regex-strip smell | **MODIFY** — resolver `decorationOnly` flavor | fold into `BD.W-FORMS-CARD-FOLD` surface-axis cleanup |
| D1/D2/D3 | sections-as-cards + bigger area + dock APIs | **AUGMENT** (demo-private, zero src paint) | NEW `BD.W-CARD-PAGE-COMPOSE` under Band 4/5 demo-modernization (the FORMS-CARD-FOLD / DATA-BAND-GLASS sibling for display/card) |
| D6 | superfluous language | **MODIFY** | same `BD.W-CARD-PAGE-COMPOSE` |
| 6-layer | composite present | **KEEP** | — |
