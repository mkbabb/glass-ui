# Pass-E component deep-audit — `foundations/surface-tints`

**Page:** `demo/stories/foundations/surface-tints.vue` (route `/foundations/surface-tints`)
**Import label (manifest SUBPATHS):** `/foundations/surface-tints` (a ROUTE label, not a package subpath — see §A Finding 7)
**Category bg (resolved):** `paper` (the `foundations` `CATEGORY_DEFAULT_BG` default; NO explicit override on the `s()` row — manifest `:507-513`)

## 0 · What this page actually demos — there is NO `src/` component

This is a **token-tour page**, not a component demo. The page renders raw `bg-[var(--surface-tint-N)]` swatch divs over a CSS checkerboard. There is **no underlying `src/components/` or `src/composables/` artefact** — the "component" under audit is:

1. **The token family** `--surface-tint-{4,6,8,10,12,15,18,22,25,35,40,70}` + the `@theme` tier aliases — defined in `src/styles/tokens/color-radius.css:149-164` (light) and `src/styles/tokens/dark-arm.css:340-351` (dark, BB.W-DARK-INK-WARM `oklch(from var(--foreground) 0.975 c h)` relative-color form). Each is `color-mix(in srgb, var(--foreground) N%, transparent)` — a foreground-over-transparent overlay (the AW.W26 in-srgb brand-overlay fence — DELIBERATE, NOT the glass-tint `in oklab` axis).
2. **The page chassis** it composes: `StoryPage.vue` → `StoryHero.vue` (the single glass `<Card tier>` host) → `StorySection.vue` (a bare `<section>`, NO card) + the `.scroll-cascade` entrance register (`src/styles/scroll-choreography.css`).

So the audit below covers (a) the chassis animation/glass affordance the page inherits and (b) the page's own composition against the user mandate + DESIGN.md.

---

## A · FINDINGS

### Finding 1 (BUG — dead var) — the tier-alias swatches reference UNDEFINED custom properties → render `transparent`
The "tier aliases" section paints `bg-[var(--surface-tint-quiet)]`, `bg-[var(--surface-tint-floating)]`, `bg-[var(--surface-tint-modal)]` (surface-tints.vue:35-37). **These bare custom properties are NOT defined anywhere in `src/`.** Verified: `grep -rn -- "--surface-tint-quiet:" src/` = 0 hits. Only the `@theme` BRIDGE vars exist — `--color-surface-tint-quiet/floating/modal` (`src/styles/theme/bridges.css:159-161`). A bare `var(--surface-tint-quiet)` resolves to the initial-value guaranteed-invalid → the three alias swatches paint **`transparent`** (invisible — the swatch is the bare checkerboard, demonstrating ZERO of the token it names). This is the identical defect-class the page's OWN docstring (`:5-12`) says it fixed for the numeric rungs (a tint imperceptible against its backing), re-occurring on the alias arm. **Disposition: AUGMENT BD.W-TOKEN-TOUR-GLASS** (it owns the foundations token-tour modernization but does NOT cite this file) — the fix is `bg-[var(--color-surface-tint-quiet)]` (read the bridge var) OR a swatch that resolves `--surface-tint-quiet → --surface-tint-6` if a bare alias is wanted as a first-class token. A born-RED M-clause asserting every swatch `var()` resolves to a non-`transparent` paint would lock it.

### Finding 2 (USER MANDATE — missing) — no per-sub-section glassy cards; the page is a flat 3-section stack in ONE card
User: "each sub-section in its OWN glassy card." The page renders 3 `<StorySection>` blocks (bare `<section>` — StorySection.vue:71 is `<section class="flex flex-col">` with no surface) flat-stacked inside StoryHero's SINGLE `<Card>`. There is no per-section glass plate. **Disposition: AUGMENT BD.W-TOKEN-TOUR-GLASS Arm A** — wrap each `<StorySection>` body in `<ShowcaseFrame tier="field">` (the BG-2 glass-over-field host that ships, ShowcaseFrame.vue:47,88) so each rung-grid floats on its own glassy plate. Note the specimen-KEEP fence (W-TOKEN-TOUR-GLASS §6): the swatch DIVS stay bare (they ARE the demo); only the SECTION wrapper gains the card — no over-fold.

### Finding 3 (USER MANDATE — conflict) — page is on a STATIC PAPER wash, not a COLORFUL AURORA
User: "glass demos over COLORFUL aurora backgrounds." This page resolves `background: paper` (category default). The glass swatches read against a flat warm-grain wash — no live colorful field. **This directly conflicts with `BD.W-TOKEN-TOUR-GLASS`'s load-bearing one-GL-per-route fence** (M8 reds a GL stage on a static-wash route; W-TOKEN-TOUR-GLASS §6 keeps the glass-band demo GL-FREE on purpose). **Disposition: MODIFY the manifest row → `background: "aurora"` (or `liquid-grid`) + reconcile W-TOKEN-TOUR-GLASS's M8 fence** so the elevated token-tour pages (the ones the user wants to read glass-over-color) are explicitly allowlisted off M8. This is a tranche-level decision: the one-GL-per-route BUDGET is real (perf), so the reconcile is "≤1 GL context per route, and surface-tints earns its aurora" — NOT a blanket M8 retire. The checkerboard reference field (`:107-121`) becomes redundant once a real colorful field backs the swatches (the aurora IS the contrast reference) — PRUNE `.tint-checker` if aurora lands.

### Finding 4 (USER MANDATE — missing) — zero dock / procedural-viz / tabs / button composition
User: "each page deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)." This page composes ZERO library components (only chassis primitives + raw divs). The 9-rung scale + the 3 aliases + the dark-parity note are three FLAT sections — a natural fit for `<SegmentedTabs>` (scale | aliases | dark-parity as panels) and a `<DockStack>`/`<GlassDock>` contextual switcher (the user's "leverage the dock APIs"). **Disposition: AUGMENT a NEW BD wave (no existing wave covers surface-tints)** — tab the three sections, host the rung grid on per-section `<ShowcaseFrame tier="field">`, and add a `<DockStack mode="facets">` rail switching scale↔alias↔dark contexts (the BE.W-DOCK-RAIL-REALIZE facet carousel, each facet carrying its `--glass-accent` hue). This is the "deftly uses a series of components" bar.

### Finding 5 (USER MANDATE) — main card area should be BIGGER
User: "the main card area BIGGER (more screen space)." The page is bounded by `--story-page-max-inline` (StoryPage.vue:87, was `max-w-6xl`). The dense `auto-fill minmax(8rem,1fr)` grid (`:91-95`) is already space-efficient, but the page sits inside the standard article width. **Disposition: MODIFY** — if surface-tints elevates to a hero/full-bleed register (Finding 3's aurora), the bleed-content float (StoryHero.vue:327, `.story-hero-bleed-content`) gives the swatches the full viewport over the field — the "bigger card area" the mandate wants. Tie to Finding 3.

### Finding 6 (LANGUAGE) — superfluous prose to tighten
The blurbs are verbose ("reads its alpha + warm-cream → cooler gradation against the checkerboard reference field below — NOT over a same-tone plate where the gradation vanishes" — `:45`). Per the writing-style memory (no grandiloquence, levity, em-dashes-without-spaces). **Disposition: MODIFY (trivial)** — tighten to one crisp clause per section. The in-code comments (`:88-90`, `:104-106`) are fine (design rationale), the user-facing blurbs are not.

### Finding 7 (STANDARDIZE) — the import-path label is a ROUTE, not a subpath
`SUBPATHS["foundations/surface-tints"] = "/foundations/surface-tints"` (manifest:214) — a route, correct for a token-tour page (no package subpath exists; the tokens ship in `/styles`). The user's "standardize the import-path label" is satisfied for THIS page IF the convention is "token pages show the route." Compare `foundations/icons` → `@mkbabb/glass-ui/icon-chip` (a real subpath). **Disposition: MODIFY (doc)** — the standardized label for a pure-CSS token page should be `@mkbabb/glass-ui/styles` (the tokens' real ship channel), not the route `/foundations/surface-tints` (which is a demo URL, not an import). Reconcile under BD.W-PAGE-CHASSIS subpath-chip convention.

---

## B · COMPONENT-AXIS audit (the chassis the page inherits)

**(1) ANIMATION affordance.** The ONLY entrance is `.scroll-cascade` — applied at TWO levels: StoryPage's section wrapper (`.scroll-cascade > *` builds each `<StorySection>`) AND the page's own `.tint-grid.scroll-cascade` (`:47,66`) builds each `.tint-cell`. Both ride `view(block)` timelines (compositor-only translateY+opacity, no-overshoot, PRM→terminal — motion-canon P1/P3/P6 compliant). **Weak spot:** in the dense `auto-fill` grid every cell is near-co-visible, so the per-swatch `view()` stagger reads near-simultaneous (the cascade's implicit-stagger mechanism assumes vertical flow, not a dense grid). The swatches have NO four-state contract / hover affordance / spring physics — they are static divs (correct for a token swatch, BUT the user wants "HIGH animation affordance for EVERY component"). A `:reveal`/`:bloom` spring entrance (the IconChip W-SUFFUSE3 precedent) on the swatches would lift it. **No dead/janky animation; the gap is MISSING affordance, not broken.**

**(2) PROCEDURAL VIZ.** None present (Finding 3 — the page is on a static paper wash). If aurora lands per Finding 3, it inherits the full PROCEDURAL-SUITE discipline for free (offscreen-pause, live-PRM one-static-frame-then-park, WGSL-first dual substrate, `v-model:paused`) via the shipped `<Aurora>`.

**(3) PERFORMANCE.** Pure CSS — no canvas, no rAF, no layout-thrash. The checkerboard is 4 stacked `linear-gradient` `background-image` layers (`:113-118`) — paint-only, cheap. The `.scroll-cascade` is compositor-only. **Clean.** (If aurora lands, the one-GL-per-route budget is the binding constraint — Finding 3.)

**(4) SAFARI.** The `.scroll-cascade` rides `@supports (animation-timeline: view())` (Safari 26+; older Safari → terminal static state, graceful). `color-mix(in srgb …)` is Safari 16.2+ (fine). The dark-arm `oklch(from var(--foreground) …)` relative-color (dark-arm.css:340) is Safari 16.4+ — fine for the dark swatches. **No Safari blocker.**

**(5) IDIOMATIC / no-legacy.** Finding 1 (dead var) is the one non-idiomatic defect. The raw `bg-[var(--surface-tint-N)]` bracket utilities are the documented specimen-swatch idiom (the box-style IS the demo — W-TOKEN-TOUR-GLASS specimen-KEEP). No dual-path, no workaround beyond the dead alias var. The page's own docstring documents its checkerboard rationale honestly.

**(6) GLASS SIX-LAYER composite.** ABSENT — the page composes zero glass tiers (Finding 2). The swatches are flat translucent fills over a CSS checkerboard; no backdrop-blur, no rim, no catch-light, no grain, no shadow. The single inherited glass surface is StoryHero's host `<Card tier="resting">` (the page-variant default, StoryHero.vue:253) — but the SECTIONS inside it are bare. Per-section `<ShowcaseFrame tier="field">` (Finding 2) brings the six-layer composite to each sub-section.

---

## C · DISPOSITION SUMMARY (mapped to BD waves)

| # | Finding | Disposition | Wave |
|---|---------|-------------|------|
| 1 | Dead alias vars → transparent swatches | AUGMENT (born-RED resolve-clause) | BD.W-TOKEN-TOUR-GLASS |
| 2 | No per-section glassy cards | AUGMENT (ShowcaseFrame tier=field per section) | BD.W-TOKEN-TOUR-GLASS Arm A |
| 3 | Static paper wash, not colorful aurora | MODIFY manifest bg + reconcile M8 fence | BD.W-TOKEN-TOUR-GLASS §6 + NEW |
| 4 | Zero dock/tabs/viz/button composition | AUGMENT (tabs + DockStack facets) | NEW BD wave (surface-tints unenrolled) |
| 5 | Main card area bigger | MODIFY (bleed register, tied to #3) | (with #3) |
| 6 | Superfluous blurb prose | MODIFY (trivial tighten) | BD.W-PAGE-OFFTOKEN-SWEEP-adjacent |
| 7 | Import label is a route, not subpath | MODIFY (→ `@mkbabb/glass-ui/styles`) | BD.W-PAGE-CHASSIS convention |

**The structural gap:** `surface-tints.vue` is in NO BD wave's enrolled set (verified: `grep -rln "surface-tints" docs/tranches/BD/waves/` = 0). `BD.W-TOKEN-TOUR-GLASS` modernizes motion/section/pulse/radii/shadows/paper-glass but skips surface-tints. This page needs an explicit enrollment.
