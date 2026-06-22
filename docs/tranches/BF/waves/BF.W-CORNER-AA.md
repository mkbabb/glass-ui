# BF.W-CORNER-AA — re-establish + LOCK corner/edge AA under the new bloom architecture

**Band 3 · Tier T6 · depends: W-DOCK-INTEGRATE (T4) · W-FLIP-SPINE (T1, the one bloom runner) · W-SPIKE-DELETE (T2, the liquid CSS relocate)**

## The defect / the ask

The user's verbatim ask (SEED §1 **R8** "Aliasing around the corners"; DEFERRED-CENSUS **D17**, `chronic ✓`) — NOT ADDRESSED at HEAD, and a once-shipped fix REGRESSED.

The fix existed: commit `b538dec7` ("fix corner aliasing — clip-path clips the plate's backdrop-filter saturate halo") added `clip-path: inset(0 round calc(2rem - 0.25rem * var(--t)))` to the old `.liquid-dock:is([data-mode="expand"],[data-mode="player"])` plate + gated the search-bar field tint/hairline behind `[data-open="true"]`. Its commit body records the ROOT CAUSE precisely: *"the ::before glass plate is card-size (352×368) with backdrop-filter saturate(1.4); at REST the box is the small pill, the plate overhangs, and `overflow:hidden` does NOT clip a backdrop-filter, so the saturated aurora bled a SQUARE halo around the rounded pill."*

That fix **does NOT survive HEAD**. A grep over the liquid CSS confirms it (`grep -n clip-path src/styles/glass/liquid-morph.css` → ZERO hits; the only `clip-path` in the dock band is `shape.css`/`fission-bridge.css`/`morph-bridge.css`). The WF-2/WF-5 re-architecture replaced the `[data-mode]` box with a `.liquid-pill` rest button + SEPARATE bloomed `.liquid-sheet`/`.liquid-player` overlays + a `.liquid-island-host` fission host — and the clip-path AA fence was dropped on the floor. Reading the HEAD CSS, the halo CLASS is live in three places:

1. **The bloom-in-flight backdrop halo (the prime regression).** `.liquid-sheet`/`.liquid-player` (`src/styles/glass/liquid-morph.css:229-265`) carry `backdrop-filter: var(--glass-blur-floating)` (which includes the `saturate()` companion) on a `border-radius: var(--radius-card)` plate, guarded ONLY by `overflow: hidden` (`:259`) — and `overflow: hidden` does NOT clip a backdrop-filter. During the bloom, `useBloomUp` writes an inline `transform: translate()+scale()` (`useBloomUp.ts:38` — the SPATIAL channel) so the rounded plate is rendered SCALED; the scaled-up saturated backdrop halo over the live aurora squares the corners in-flight (the exact b538dec7 class, now on the bloomed overlay instead of the old box).
2. **The rest-pill corners.** `.liquid-pill` (`:42-80`) carries `backdrop-filter` directly on a `border-radius: 2rem` button — backdrop-filter clips to the element's OWN border-radius, so the rest pill is structurally OK, but the AA fence must RECORD this (the gate asserts the resting pill's corners read clean, so a future re-architecture that re-introduces an overhanging card-size `::before` plate reds).
3. **The goo-neck edges.** The `fission-bridge.css` neck (`:319` `clip-path: inset(var(--neck-inset) 0 var(--neck-inset) 0 round 999px)`) is already clip-path-AA'd by construction, BUT the `.dock-fission-piece` plates fly OUTSIDE the host box (the b538dec7 note: *"NOT applied in split/union — the goo pieces must fly OUTSIDE the box"*) — so the AA fence must NOT clip the pieces (an over-eager box clip-path would amputate the flying goo halves). The fence is two-sided: clip the bloomed-sheet backdrop halo, NEVER clip the fission pieces.

No AA π exists (the binding paint readback the user's screenshot defect demands). This wave re-establishes the clip-path AA fence under the new architecture, records the explicit AA fence as a gate, and captures the fresh both-mode edge-AA truth.

## The mechanism

Re-establish the clip-path-clips-backdrop-filter fence on the NEW surfaces, idiomatically (compositor/paint-only — `clip-path` is a paint property, never layout; `proof:no-layout-animation` stays GREEN by construction), with the two-sided fence the architecture demands:

1. **Clip the bloomed sheet/player backdrop halo to the box radius.** Add `clip-path: inset(0 round var(--radius-card, 1.5rem))` to `.liquid-sheet, .liquid-player` (`liquid-morph.css:229`), matching the plate's own `border-radius`. `clip-path` DOES clip a backdrop-filter (the b538dec7 mechanism), so the saturated aurora halo cannot bleed a square around the rounded bloomed plate — at rest AND mid-bloom (the clip travels with the element's painted box under the `useBloomUp` transform; the rounded silhouette holds through the scale). This is the direct transposition of the lost fix onto the surface that now carries the halo. The `overflow: hidden` STAYS (it clips the scrolling content; clip-path clips the backdrop) — they are complementary, not a dual path.

2. **Record the rest-pill corner cleanliness (the structural keep).** `.liquid-pill`'s `backdrop-filter` on its own `border-radius: 2rem` already self-clips; the gate asserts no overhanging card-size `::before`/plate re-introduces the halo on the rest pill (the anti-regression record — the b538dec7 root cause must stay dead).

3. **The fission pieces are NEVER box-clipped (the two-sided fence).** The clip-path is scoped to `.liquid-sheet`/`.liquid-player` ONLY — NOT the `.liquid-island-host`/`.dock-fission-piece` (whose halves fly outside the box; the `fission-bridge.css` neck owns its OWN `clip-path: inset(... round 999px)` per-piece AA at `:319`). The gate's anti-evasion bite: a box-level clip-path on the fission host reds (it would amputate the flying goo pieces — the b538dec7 `splitClip:none` invariant).

4. **The search-bar tint gating survives.** Where a bloomed sheet hosts a search field (the `.liquid-sheet` Places bar), the field tint + hairline are gated to the OPEN state (the b538dec7 arm 2 — at rest the bar IS the rounded pill, so a square tint bleeds over the rounded corners). The CSS gate is re-pointed to the new `data-open`/`--hidden` state the playground writes.

This is NOT a re-fork — it composes the EXISTING `--radius-card` token + the EXISTING `clip-path`-clips-backdrop mechanism the dock band already uses (`fission-bridge.css`/`morph-bridge.css`/`shape.css` all clip-path). The fence is a paint property on the shipped liquid plates, born under the W-DOCK-INTEGRATE-shipped `<DockNowPlaying>` register (its bloomed expanded card carries the same fence — the AA fence is library-owned, not demo-local).

## The gate — `proof:corner-aa` (born-RED → GREEN)

`scripts/proof-corner-aa.mjs`, `tags: ["local","ci","release"]` (the source-structure arm; the binding PAINT is the π below). All clauses are SOURCE facts over the shipped liquid CSS — the regression that lost the fix is a SOURCE-absent clip-path, so the gate catches it deterministically.

- **C1 — the bloomed plate clips its backdrop halo.** `.liquid-sheet`/`.liquid-player` (and `<DockNowPlaying>`'s bloomed expanded card register) carry a `clip-path: inset(0 round <radius>)` whose `<radius>` matches the plate's `border-radius` token. A backdrop-filter-bearing rounded bloom plate with NO clip-path REDs (the b538dec7-lost-fix regression class, born-RED on HEAD).
- **C2 — the rest pill has no overhanging card-size plate.** `.liquid-pill` carries its `backdrop-filter` on its OWN border-radius (self-clipping); no card-size `::before` overhangs it. A re-introduced overhanging filtered plate on the rest pill REDs (the root-cause record).
- **C3 — the fission pieces are NOT box-clipped (the two-sided fence).** No `clip-path` on the `.liquid-island-host`/`.dock-fission-piece` box that would clip the flying halves (the `splitClip:none` invariant); the neck's own per-piece `clip-path: inset(... round 999px)` (`fission-bridge.css:319`) STAYS. A box-level clip-path on the fission host REDs (the over-clip bite — it amputates the goo).
- **C4 — the bloom transform travels with the clip (in-flight AA).** The clip-path is on the SAME element `useBloomUp` writes its inline `transform`/`filter` to (the plate, not an ancestor), so the rounded silhouette holds through the scaled bloom. The gate asserts the clip-path and the bloom-target are the same element (no ancestor-clip-vs-scaled-child mismatch).
- **C5 — the search-bar tint is OPEN-gated.** A search-field tint/hairline inside a bloomed sheet is gated to the open state (`[data-open]`/`:not(.liquid-pill--hidden)`), never painted at rest (the b538dec7 arm-2 record — a square tint over the rounded resting bar reds).
- **C6 — the AA fence is recorded.** The CSS carries the explicit AA-fence comment (clip-path-clips-backdrop, scoped-to-bloom-not-fission) so a future re-architecture cites it (the no-silent-drop record — this fix was lost ONCE; the recorded fence is the tripwire).

**Self-test (`--self-test`, born-RED→GREEN, ≥5 bites):** (1) strip the `clip-path` off `.liquid-sheet` → C1 RED; (2) add an overhanging card-size filtered `::before` on `.liquid-pill` → C2 RED; (3) add a box-level `clip-path: inset(0)` on `.liquid-island-host` → C3 RED; (4) move the clip-path onto an ANCESTOR of the bloom-target → C4 RED; (5) un-gate the search-bar tint (paint at rest) → C5 RED. Each MUST flag; the fixed tree MUST be clean.

**What REDs on the pre-fix tree:** C1 (no `clip-path` on `.liquid-sheet`/`.liquid-player` at HEAD — the regression), C6 (no recorded AA fence) — born-RED by construction; GREEN only after the clip-path AA fence lands + is recorded.

## The binding π — `tests-visual/corner-aa.spec.ts`

The painted-truth edge-AA readback the user's screenshot defect demands — a FRESH capture proving the corners read clean. Both modes (light/dark) over the live aurora (the saturate-halo backdrop that surfaced the defect) + the **webkit** project (SEED §6 precept 6 — the WebKit `backdrop-filter` + `clip-path` path; the webkit enrollment routes through W-SAFARI-CAPTURE's computed-from-disk `testMatch` widen).

- **Surface — `/dock/liquid-playground` (and `/dock/dock-nowplaying`).** The rest pill, then a bloom-open of the Places sheet / player card, over `<DockStage>`'s live aurora (the worst-case saturated bright backdrop).
- **Measured assertions:** (a) at REST, a getImageData scan of the pill's bounding rect's four CORNER cells reads the page/aurora backdrop (NOT a saturated square halo) — the corner pixels OUTSIDE the rounded silhouette but INSIDE the bounding box match the un-plated backdrop within an AA band, never the saturated plate fill (the square-halo defect is the measurable failure); (b) at the bloom MIDPOINT (`useBloomUp` pinned at t≈0.5, scaled) the SAME corner-cell scan still reads backdrop-not-halo (the in-flight clip travels — the C4 assert painted); (c) the rounded silhouette is genuinely ANTI-ALIASED (an edge-transition scan across the corner arc reads a graded alpha ramp over ≥2px, not a hard jaggy step) in both modes; (d) the fission split is UN-clipped — a `media → split` carve flies the `.dock-fission-piece` halves OUTSIDE the host bounding box (the pieces' centroids exceed the box edges; the box clip-path would have amputated them — proving C3 paints correctly); (e) the search-bar at rest reads transparent-rounded (no square tint over the resting pill corners — C5 painted).

## The gestalt row

**BF-roster surface: `dock-corner-aa`** (the BF-roster row, wired by W-GESTALT-WIRE). Verdict requirement: on a FRESH whole-page both-mode `:5199` capture (NEVER reducedMotion), over the live aurora, the liquid dock's corners read as CLEAN rounded glass — no square saturated halo bleeding around the rounded pill/sheet at rest OR mid-bloom; the edges are smoothly anti-aliased; the fission halves fly free (un-amputated). PASS iff the corner aliasing the user screenshotted is GONE in both modes. Born-FAIL on the BE/HEAD tree (the fix is lost — the halo is back); flips PASS at W-REFLECT; surface-hash freshness floor binds.

## Fences

- **No-legacy / clean break.** The fix is re-established on the NEW surfaces ONLY — no `[data-mode]` block survives (the old architecture is gone; the clip-path lands on `.liquid-sheet`/`.liquid-player` + the `<DockNowPlaying>` bloom card, not the retired `.liquid-dock` box). ONE AA fence, recorded.
- **No re-fork / idiomatic.** The wave composes the EXISTING `--radius-card` token + the EXISTING `clip-path`-clips-backdrop mechanism the dock band already uses (`fission-bridge.css`/`shape.css`/`morph-bridge.css`); it mints NO new AA primitive, NO mask, NO second blur layer.
- **The two-sided fence (the specific anti-pattern this must NOT become):** an over-eager BOX clip-path on the fission host that amputates the flying goo halves (C3 is the tooth — the `splitClip:none` invariant the b538dec7 commit verified). The clip is scoped to the bloomed sheet/player; the fission pieces keep their per-piece neck clip ONLY.
- **Compositor/paint-only.** `clip-path` is a paint property — never a layout property; the in-flight clip travels with the `useBloomUp` compositor transform. `proof:no-layout-animation` stays GREEN by construction (no animated reflow-set property is introduced).
- **Presets-in-consumers.** The plate radius reads the library `--radius-card` token; a consumer retuning the card radius re-resolves the clip automatically (the clip matches `border-radius` via the same token).

## Disposition links

Closes **D17** (Corner aliasing R8 — the `clip-path:inset(0 round)` halo-clip fix does NOT survive HEAD; no AA π → BUILD: re-establish the fence on the new bloom architecture + record it + author the AA π). Closes **R8** ("Aliasing around the corners", NOT ADDRESSED → ADDRESSED, paint-verified both modes). Related to W-DOCK-INTEGRATE (T4 — the AA fence rides the shipped `<DockNowPlaying>` bloom card, so it is library-owned not demo-local) and W-FISSION-FILAMENT (T7 — the fission-piece neck AA the two-sided fence preserves).
