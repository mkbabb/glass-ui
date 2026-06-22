# BF.W-DEEP-GLASS-WIRE — compose the shipped `--glass-depth`/`.glass-deep` onto the HERO liquid surfaces

**Band 4 · Tier T7 · depends: W-DOCK-INTEGRATE (T4, the `<DockNowPlaying>` hero surface) · W-FLIP-SPINE (T1, the one bloom runner) · W-CORNER-AA (sibling T6, the bloom-plate clip fence) · W-SPIKE-DELETE (T2, the liquid CSS relocate)**

## The defect / the ask

A breadth-fidelity gap (SEED §4 Band 4 "iOS-27 FIDELITY — the look"; the DEFERRED-CENSUS does not give it a D-row of its own — it is the breadth-fidelity gap the §4 roster names: *"W-DEEP-GLASS-WIRE — compose the shipped `--glass-depth`/`.glass-deep` onto the hero liquid surfaces (the sheet/player/CTA); the one-deep-register-per-route budget."*).

The library SHIPS the deep-glass tier but the liquid hero surfaces never reach it. Read the three shipped pieces:

- **The token family** — `src/styles/tokens/glass-deep.css`: a SEPARATE `--glass-blur-deep-*` family at the Apple iOS-27 deep register (radius `16px` in the [14,20] band, STRICTLY deeper than the calm `floating` 13px; saturate `1.5`, the low end of the 1.5–1.8 band). The calm content default is BYTE-UNTOUCHED — the deep family is minted ALONGSIDE the calm ladder, which never reads it (`proof:glass-cal` B1-B3 GREEN by construction).
- **The depth scalar** — `src/styles/tokens/property-regs.css:245`: `@property --glass-depth { syntax: "<number>"; inherits: true; initial-value: 1; }` — the `--glass-level` twin, a typed inheriting scalar a host dials on any ancestor to LERP the deep blur+saturate between the calm-floating endpoint (depth 0) and the Apple-deep endpoint (depth 1).
- **The decoration** — `src/styles/glass/deep.css`: `.glass-deep { --glass-blur-floating: var(--glass-blur-deep); }` — a TOKEN-SUBSTITUTION decoration ON a base `.glass-floating` rung (the `.glass-opaque` precedent — it re-points the floating-rung blur token locally so the base rule paints the deep blur; NO competing `backdrop-filter`, NO base edit, NO parallel recipe). The `deep` CardTier rung already maps `'glass-floating glass-deep'` (`Card.vue:354-355`).

So the deep tier is a fully-shipped, idiomatic, opt-in register — and the liquid hero surfaces (the ones that WANT the thick refractive liquid glass) ride the bare calm `glass-floating` tier instead. Reading `liquid-morph.css:229-265`, the bloomed `.liquid-sheet`/`.liquid-player` plates compose `backdrop-filter: var(--glass-blur-floating)` at the CALM `floating` register — they are the hero "more glass" surfaces (the bloom-to-fullscreen sheet, the now-playing player, the CTA) but read at the same calm blur as a plain content card. The maximal-iOS-27 deep refraction the hero deserves is unreached.

## The mechanism

Compose the shipped deep tier onto the HERO liquid surfaces — a TOKEN-SUBSTITUTION decoration on the base rung, no re-fork, the one-deep-register-per-route budget:

1. **Add `.glass-deep` to the hero liquid plates.** The bloomed `.liquid-sheet`/`.liquid-player` (the bloom-to-fullscreen sheet + the now-playing player) + the `<DockNowPlaying>` expanded fullscreen card (the W-DOCK-INTEGRATE hero register) + the hero CTA compose the `.glass-deep` decoration on their base `glass-floating` rung — so the base `.glass-floating` rule's `backdrop-filter: var(--glass-blur-floating)` resolves to the deep `blur(16px) saturate(1.5)` (the `.glass-deep` token re-point). This is the EXACT `.glass-opaque` mechanism, inverted toward MORE glass: a decoration class on the base rung, NOT a parallel recipe. For an SFC that resolves its tier via the CardTier map, the `deep` rung (`'glass-floating glass-deep'`) is the same composition (`Card.vue:354`).

2. **The one-deep-refractive-register-per-route BUDGET (the proportion fence).** The deep tier is OPT-IN and the budget is ONE deep refractive register per route (the W-LENSING discipline — the deep glass is for the hero surface that WANTS the thick refraction, never the bare content default). On a liquid route, the HERO surface (the bloomed sheet/player/expanded card) is the ONE deep register; the rest pill + content tiers + sibling controls STAY calm. The wave records the budget as a gate fact (the deep-register roster per route) so a future agent cannot deep-glass every plate (the over-spend the calm default exists to prevent).

3. **The a11y brackets + the W55 tint + the corner-AA fence reach the deep plate for FREE.** Because the deep blur COMPOSES `var(--glass-level)` (`glass-deep.css` derivation), `prefers-reduced-transparency: reduce` (`--glass-level: 0` → blur(0)) and `prefers-contrast: more` (0.3) reach the deep plate through the ONE level path (no hardcoded `blur(16px)` bypass). The W55 bright-bucket darken reaches it by construction (`.glass-deep` composes WITH `.glass-floating`, already in the W55 material group). The W-CORNER-AA clip-path fence (sibling T6) clips the deep plate's deeper saturate halo the SAME way (the deeper saturate makes the AA fence MORE load-bearing — a deeper backdrop halo is a louder square halo without the clip; the two waves compose).

This is NOT a re-fork — it COMPOSES the shipped `.glass-deep`/`--glass-depth`/`--glass-blur-deep-*` family. The wave mints NO new deep token, NO second blur recipe, NO competing `backdrop-filter` — it adds the shipped decoration class to the hero surfaces. `glass-deep.css`/`glass-deep.css`-tokens/`property-regs.css` are BYTE-UNTOUCHED (this WIRES the tier, never re-tunes it). The depth is dial-able per hero scope via `--glass-depth` (a consumer who wants a half-deep hero sets `--glass-depth: 0.5` on the surface — the cascading-scalar idiom).

## The gate — `proof:deep-glass-wire` (born-RED → GREEN)

`scripts/proof-deep-glass-wire.mjs`, `tags: ["local","ci","release"]` (the source-structure arm; the binding PAINT is the π below).

- **C1 — the hero liquid surfaces COMPOSE `.glass-deep`.** The bloomed `.liquid-sheet`/`.liquid-player` + the `<DockNowPlaying>` expanded card + the hero CTA carry `.glass-deep` (or the `deep` CardTier rung) on their base `glass-floating` rung — a real class/rung composition, NOT a markdown keyword. A hero liquid plate on the bare calm `glass-floating` tier REDs (born-RED on HEAD — the hero rides the calm register).
- **C2 — token-substitution decoration, NO re-fork.** The deep read is the shipped `.glass-deep` token re-point (`--glass-blur-floating: var(--glass-blur-deep)`); the SFC/CSS declares NO competing `backdrop-filter: blur(16px)`/`saturate(1.5)` literal, NO parallel deep recipe. A hand-rolled `backdrop-filter: blur(16px)` on a hero plate (bypassing the shipped tier) REDs (the no-re-fork bite).
- **C3 — the deep tokens are byte-fenced.** The wave edits ZERO of `tokens/glass-deep.css`/`glass/deep.css`/`property-regs.css` `--glass-depth` reg (the shipped deep tier is OFF-LIMITS — this WIRES it, never re-tunes it). A diff touching the deep token values or the `--glass-depth` registration REDs.
- **C4 — the one-deep-register-per-route budget.** A per-route roster records exactly ONE deep refractive register per liquid route (the hero surface); the rest pill + content tiers + sibling controls are NOT `.glass-deep`. A second deep-glass surface on the same route (off the roster) REDs (the over-spend bite — the proportion fence).
- **C5 — the a11y/level path intact.** The deep plate composes `var(--glass-level)` (it does not pin a hardcoded `blur(16px)` that bypasses the a11y bracket); the gate asserts the deep blur routes through the shipped `--glass-blur-deep` (which composes `--glass-level`) — a hero plate with a level-bypassing literal blur REDs.

**Self-test (`--self-test`, born-RED→GREEN, ≥4 bites):** (1) revert a hero plate to the bare `glass-floating` tier → C1 RED; (2) plant a hand-rolled `backdrop-filter: blur(16px) saturate(1.5)` on a hero plate → C2 RED; (3) edit `--glass-blur-deep-radius` → C3 RED; (4) add `.glass-deep` to a second non-hero surface on the same route → C4 RED. Each MUST flag; the wired tree MUST be clean.

**What REDs on the pre-fix tree:** C1 (the hero liquid surfaces ride the bare calm `glass-floating` tier — no `.glass-deep`), C4 (no per-route deep roster recorded) — born-RED by construction; GREEN only after the deep decoration lands on the hero surfaces + the budget roster.

## The binding π — `tests-visual/deep-glass-wire.spec.ts`

The painted-truth readback that the hero liquid surface reads as the thick refractive deep glass — the deeper blur is MEASURABLE vs the calm tier. Both modes (light/dark) over the live aurora (the deep blur's structure-through-the-plate read needs a textured backdrop) + the **webkit** project (the `backdrop-filter` deep radius reads cross-engine; the webkit enrollment routes through W-SAFARI-CAPTURE).

- **Surface — `/dock/dock-nowplaying` (the hero bloom card/player)** over `<DockStage>`'s live aurora, at `:5199`.
- **Measured assertions:** (a) the hero plate's resolved `backdrop-filter` reads the DEEP register — a getComputedStyle read resolves `blur(16px)` (the deep radius, STRICTLY > the calm floating 13px) + the deep `saturate(1.5)` (vs the calm 1.18); (b) a backdrop-structure scan THROUGH the hero plate reads MORE diffusion than a sibling calm content plate over the SAME aurora region (the deep blur paints — the "more glass" read is measurable, not just a token resolve); (c) the deep plate's corner halo is CLIPPED (the W-CORNER-AA fence holds on the deeper saturate — no square halo despite the louder saturate); (d) ONE deep register per route — a sibling content plate over the same backdrop reads the CALM blur (the budget paints — not every plate is deep); (e) under `prefers-reduced-transparency: reduce` the deep plate collapses to blur(0)/solid (the `--glass-level: 0` path reaches the deep plate — the a11y bracket).

## The gestalt row

**BF-roster surface: `dock-deep-glass`** (the BF-roster row, wired by W-GESTALT-WIRE). Verdict requirement: on a FRESH whole-page both-mode `:5199` capture (NEVER reducedMotion), over the live aurora, the HERO liquid surface (the bloomed player/sheet/expanded card) reads as the THICK refractive iOS-27 deep glass — visibly deeper/more-concentrated than the calm content tiers around it, the aurora structure diffused richly through the plate, while the rest pill + content stay calm (the budget reads as deliberate proportion, not every-plate-deep). PASS iff the hero reads maximal-iOS-27-deep AND the one-deep-per-route budget reads as proportion. Born-FAIL on the BE/HEAD tree (the hero rides the calm tier — no deep read); flips PASS at W-REFLECT; surface-hash freshness floor binds.

## Fences

- **No-legacy / clean break.** ONE deep tier — the shipped `.glass-deep`/`--glass-blur-deep-*` family; the wave composes it, mints no second deep recipe, no alias. The hero plate's deep read IS the token re-point (no parallel `backdrop-filter`).
- **No re-fork / idiomatic.** The wave COMPOSES `.glass-deep` (the token-substitution decoration), `--glass-depth` (the per-scope depth dial), the `deep` CardTier rung. It re-implements NONE — C2 is the tooth (a hand-rolled deep blur literal reds), C3 byte-fences the deep tokens.
- **The specific anti-pattern this must NOT become:** deep-glass EVERY plate (the over-spend — the calm default exists because deep-everything is too much; C4's one-deep-per-route budget is the tooth). The deep tier is the HERO surface's register; the content tiers STAY calm (the W-GLASS-CAL calm default is BYTE-UNTOUCHED — `proof:glass-cal` B1-B3 GREEN by construction, the deep family is separate).
- **Compositor/paint-only.** The deep tier deepens the `backdrop-filter` diffusion (a paint property) — never a layout property; the deep blur scales `--glass-level` so the a11y brackets reach it. `proof:no-layout-animation` GREEN by construction.
- **Presets-in-consumers.** The library's `.glass-deep` 16px/1.5 IS its deep identity; a consumer who wants a half-deep hero dials `--glass-depth: 0.5` on the surface (the cascading scalar). No consumer hue/value enters the deep tokens.

## Disposition links

Closes the Band-4 breadth-fidelity gap (SEED §4 — *"compose the shipped `--glass-depth`/`.glass-deep` onto the hero liquid surfaces; the one-deep-register-per-route budget"*). Composes the W-DOCK-INTEGRATE hero `<DockNowPlaying>` register (T4 — the deep tier rides the shipped hero surface, library-owned). Composes with W-CORNER-AA (sibling T6 — the deeper saturate makes the clip-path AA fence more load-bearing; the two waves reinforce the hero plate's edge truth). The full Apple `saturate(1.8)/blur(20px)` push stays BOOKED to a successor (the `proof:glass-legibility` L4 budget clearance — the 16px-stay is the budget-clearing honest landing; this wave does NOT chase the 20px ceiling).
