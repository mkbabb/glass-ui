# BD.W-SQUIRCLE — the cross-engine squircle silhouette FLOOR (clip-path), with corner-shape as the Chromium PE OVER a border-radius floor (the phantom RESOLVED)

**Band 7 · depends: — (pairs with W-CORNER-AA at T3/T6, file-line-disjoint) · canonical source for `BF.W-SQUIRCLE` · `BE.W-SQUIRCLE-COVERAGE`**

## The phantom RESOLVED (the load-bearing Pass-D / critique decision)

The WAVE-LIST + the fleet2 doc named "W-SQUIRCLE (Band 7)" as a Safari-first corner-SHAPE delta ("flatter buttons = a higher superellipse exponent"). **Pass-D (`passd-glass.md §c`) + the critique (`critique/glass-ios27.md §4`) RESOLVE the phantom at source — verified on disk:**

1. **`corner-shape: superellipse(n)` is Chromium-ONLY** — `glass/squircle.css:38-56` states it verbatim ("`@supports (corner-shape: superellipse(2))` … Chrome 139+, no FF/Safari 2026"). So the iOS-27 squircle CANNOT be a `corner-shape` on the Safari-first reference engine — `corner-shape` is the Chromium PROGRESSIVE-ENHANCEMENT TIER, NEVER the Safari-first delta.
2. **`border-radius` round is the un-gated cross-engine CONTRACT** — `theme/radius.css:76-78` records it VERBATIM: *"NEVER make corner-shape the contract — Safari/Firefox have no positive signal through 2026."*
3. **AX.W56 already BARRED the squircle from buttons/cards/pills** — `squircle.css:6-19`: *"Cards, glass buttons, and pills stay ROUND … Do NOT re-add a squircle rule to the card/button/pill surfaces — they are round by policy."* So "flatter button" is NOT a higher superellipse exponent — it is a separate `border-radius` REDUCTION axis (the W-CORNER-AA / GLASS-IOS27 "flatter"=`border-radius`-reduction delta, file-line-disjoint from this shape wave).

**There is NO middle FLOOR today**: `corner-shape` is the Chromium PE tier, `border-radius` round is the universal contract, and Safari paints a plain rounded-rect on EVERY glass surface (the reference Control-Center clustered-controls read most-broken as squared rounded-rects). **`clip-path` IS WebKit-supported** (Safari 26 ✓, FF ✓, Chrome ✓), so a `clip-path` superellipse path is the genuine cross-engine silhouette FLOOR that lands the squircle SHAPE on Safari where every shadcn derivative paints round. This wave ships THAT floor — the superellipse-OVER-a-border-radius-floor architecture (clip-path floor · corner-shape PE · border-radius contract), NEVER `corner-shape` as the Safari-first delta. This is the corner-SHAPE companion to W-CORNER-AA's corner-AA fence (W-CORNER-AA kills the saturated square HALO bleeding AROUND the rounded plate; this makes the silhouette ITSELF the iOS superellipse on every engine) — the two are file-line-disjoint.

## The defect / the ask

The Band-2 squircle-coverage MAJOR (`BE.W-SQUIRCLE-COVERAGE`, CRITICAL, never built). The continuous-corner superellipse (`|x/w|⁴ + |y/h|⁴ = 1`, Apple's n=4 squircle) is encoded in glass-ui TWO disjoint Chromium-only places:
1. `corner-shape: superellipse(2)` behind `@supports (corner-shape: superellipse(2))` (`squircle.css:38-56`) — Chrome 139+ only, OVERLAY-BAND-ONLY (`.glass-floating.rounded-dialog`, `.glass-floating.sheet-animate`, `.configurator`/`.floating-panel`, `.glass-hero` — `squircle.css:40-53`); the card/chip/dock-control families are NOT coupled (`theme/radius.css:105-106`: `--corner-shape-card: round; --corner-shape-pill: round`).
2. The displacement-map squircle PROFILE (`glass-refract.css:97`) behind `@supports (backdrop-filter: url(#…))` — Safari never enters.

`scripts/proof-squircle-language.mjs` EXISTS but carries only the TOKEN-AXIS-EXISTS clause (the k-rungs are minted) — NO `clip-path`/cross-engine-floor clause, NO Safari pixel readback.

## The mechanism

The cross-engine FLOOR, ZERO change to the Chromium `corner-shape` enhancement, idiomatic onto the ONE `--corner-k-squircle` k-vocabulary — gestalt, compositor/paint-safe, no second k, no legacy:

1. **The `clip-path` superellipse floor (`src/styles/glass/squircle.css`, a new `@layer components` block).** Mint a per-surface `--squircle-clip-<surface>` register — a `clip-path: path(…)`/high-vertex `polygon()` approximating `|x/w|⁴ + |y/h|⁴ = 1` at the surface radius, GENERATED from the SAME `--corner-k-squircle` exponent (`theme/radius.css:90`, n=4), never a second k. Apply it on the card/chip/dock-control families AT/ABOVE the `--radius-xl` (12px) read threshold — the `squircle.css:6-19` rounded-vs-squircle POLICY keeps small pills round by construction (the superellipse is imperceptible at a stadium pill — visual cost without read). The clip paints the squircle silhouette on EVERY engine that supports `clip-path`; a non-supporting engine falls to the un-gated `border-radius` round CONTRACT (the better-tier-or-round discipline). `clip-path` is a PAINT-time clip (`proof:no-layout-animation` holds by construction — no layout property animates; static at rest, GPU-composited on Metal).
2. **WIDEN `corner-shape` from overlay-band-only to card/chip/dock-control** (the Chromium PE TIER). ADD those surfaces to the `@supports (corner-shape: superellipse(2))` block (`squircle.css:38`), each reading its OWN `var(--corner-shape-<surface>)` token (independently overridable; `--corner-shape-pill` stays `round` by policy). On Chromium the analytically-perfect superellipse renders; the clip-path is the same silhouette one engine down — the two LAYER (corner-shape crisp PE · clip-path cross-engine floor · border-radius universal round).
3. **The per-surface token home stays `theme/radius.css`.** `--corner-shape-card`/`-chip`/`-dock-control` re-point off `round` onto `superellipse(var(--corner-k-squircle))` for the AT/ABOVE-threshold surfaces; the small-control aliases (`--corner-shape-pill`, the `--radius-control` stadium set) stay `round` — the ONE k-vocab drives both axes. A consumer who wants a round card re-points `--corner-shape-card: round` + drops the clip (presets-in-consumers — the library default IS the iOS squircle).

This is NOT a re-fork: it composes the EXISTING `--corner-k-squircle` k-primitive + the EXISTING `corner-shape` enhancement + the EXISTING `clip-path`-is-cross-engine fact; it mints NO second k, NO second shape vocabulary, NO mask. The `corner-shape` Chromium path is PRESERVED + WIDENED, the clip-path layered UNDER it.

## The gate — `proof:squircle-coverage` (NEW; born-RED → GREEN)

`scripts/proof-squircle-coverage.mjs`, `tags: ["local","ci","release"]` (the source-structure arm; the binding PAINT is the π — `release` rides the π-present check per W-PI-AUTHOR's D32 downgrade). `proof:squircle-language`'s TOKEN-AXIS-EXISTS stays GREEN, cross-asserted. All clauses SOURCE facts; born-RED on HEAD:

- **C1 — the clip-path cross-engine floor is minted.** `--squircle-clip-<surface>` (a `clip-path: path()`/high-vertex `polygon()`) declared for card/chip/dock-control, derived from `--corner-k-squircle`. Born-RED: `grep -n 'clip-path' src/styles/glass/squircle.css` → exit 1 at HEAD.
- **C2 — the corner-shape WIDEN (the PE TIER OVER the floor).** The `@supports (corner-shape: superellipse(2))` block carries card/chip/dock-control (each reading `var(--corner-shape-<surface>)`), beyond the overlay-band-only HEAD set. Born-RED at HEAD (only dialog/sheet/panel/hero present, `squircle.css:40-53`). **The PHANTOM-RESOLVED clause:** the gate asserts `corner-shape` is INSIDE its `@supports` block (NEVER un-gated), so it can NEVER be the cross-engine contract — a `corner-shape` declaration OUTSIDE the `@supports` block (the phantom Safari-first-corner-shape framing) REDs.
- **C3 — the policy fence holds (the superellipse lands ONLY where it reads).** Small-radius pills (< `--radius-xl`/12px) stay ROUND — NO clip-path/corner-shape on `--corner-shape-pill`/the `--radius-control` stadium set (the `squircle.css:6-19` policy). A clip-path on a stadium pill REDs (the imperceptible-cost defect); the threshold is the gate fact.
- **C4 — the better-tier-or-round contract (the FLOOR is border-radius, ABSOLUTE).** Every squircle surface keeps its un-gated `border-radius` round contract underneath. A clip-path/corner-shape surface with NO `border-radius` fallback REDs (a non-supporting engine MUST paint round, never broken). The three-layer order (clip-path floor · corner-shape PE · border-radius contract) is asserted as the gate fact — the superellipse-OVER-a-border-radius-floor architecture is the recorded invariant.
- **C5 — the k-vocab fence (ONE k).** The clip-path path is derived from `--corner-k-squircle` (n=4); NO second k-definition, NO hardcoded path that disagrees with the token. A path computed off a literal exponent that diverges from `--corner-k-squircle` REDs.
- **C6 — compositor/paint-safe.** No `clip-path` lives inside a `@keyframes`/`transition` reflow-set (`proof:no-layout-animation` cross-asserted GREEN — the squircle is a static shape). The dock-morph k-animation (the calc()'d k against `--corner-k-squircle`) keeps its compositor-transform discipline.

**Self-test bites (`--self-test`, ≥5 bites, each MUST red):** (i) a clip-path on a sub-threshold pill → C3; (ii) a clip-path/corner-shape surface with NO border-radius fallback → C4 (the broken-on-Safari evasion); (iii) a hand-rolled clip-path path that diverges from `--corner-k-squircle` → C5; (iv) a `clip-path` inside a `@keyframes` step → C6; (v) a `corner-shape` declaration OUTSIDE the `@supports` block (the phantom Safari-first framing) → C2 (the phantom-resolved bite). Extend-vs-new: NEW gate; `proof:squircle-language`'s TOKEN-AXIS-EXISTS GREEN cross-asserted (not re-implemented).

**What REDs on the pre-fix tree:** C1 (no `clip-path` in `squircle.css` — `grep` exit 1), C2 (card/chip/dock-control absent from the `@supports` block) — born-RED by construction; GREEN only after the clip-path floor + the corner-shape widen land.

## The binding π — `tests-visual/squircle-coverage.spec.ts` (NET-NEW, auto-enrolled)

The binding paint is a REAL **corner-pixel getImageData readback** proving the superellipse silhouette PAINTS where today Safari paints round. NO source-green close.

- **Surfaces — a big `<Card>` (≥`--radius-xl`), a Maps-facet `<IconChip>`, and a dock-control plate (`.dock-icon-button`)** over a contrasting backdrop (`/display/buttons` + `/dock/overview`).
- **Measured assertions:** screenshot each surface's corner region, decode it (pngjs), sample the alpha boundary along the corner DIAGONAL, and assert the painted corner follows the **superellipse curve, NOT the circular arc** — the squircle's flatter-then-sharper profile extends measurably further into the corner than a `border-radius` quarter-circle at the SAME radius (the boundary-extent delta is the binding measure, NOT a string match). The grouped multi-control arm: a fused multi-control squircle GROUP reads as ONE silhouette with concentric inner radii.
- **Both modes** (light/dark) on the **`webkit`** project (the binding Safari truth — the clip-path floor; enrollment via W-SAFARI-CAPTURE's computed-from-disk `testMatch` widen) AND **`chromium-headless-new`** (the corner-shape PE tier reads identical-or-crisper). **Born-RED on HEAD** (Safari corners are circular arcs today). The binding real-Safari-26-Metal corner-capture rides W-REFLECT (fresh pixels).

## The gestalt row

**BD-union-roster surface: `squircle-silhouette`** (wired by W-GESTALT-WIRE; `surface-paths: src/styles/glass/squircle.css, src/styles/theme/radius.css`). Verdict requirement: on a FRESH whole-page both-mode `:5199` capture (NEVER reducedMotion) — and the binding Safari corner-capture rides W-SAFARI-CAPTURE — the card/chip/dock-control corners read as the iOS continuous-corner SQUIRCLE (the flatter-then-sharper superellipse silhouette), NOT a shadcn rounded-rect, in both modes, on BOTH engines. The warm-cream identity is untouched (a SHAPE change, zero hue delta — `meanChroma` band unchanged). Born-FAIL on the HEAD tree (Safari paints round); GREEN at its OWN close; W-REFLECT re-confirms (never the first paint); surface-hash freshness floor binds.

## Fences

- **No-legacy / clean break.** A clean clip-path mint, no alias; the `corner-shape` Chromium path is PRESERVED + WIDENED, never replaced — clip-path is the cross-engine FLOOR layered UNDER it, not a swap.
- **The phantom-resolved framing is the RECORD (binding).** `corner-shape` is the Chromium PROGRESSIVE-ENHANCEMENT tier OVER a `border-radius` floor — NEVER the Safari-first delta (the WAVE-LIST's earlier "`corner-shape` is the cross-engine mechanism" framing is CORRECTED; the `clip-path` floor is the real cross-engine silhouette). C2's phantom bite locks it.
- **No re-fork / idiomatic.** The ONE `--corner-k-squircle` k-vocab drives BOTH corner-shape AND the clip-path; no second k, no second shape vocabulary, no mask, no new primitive.
- **The policy fence (the specific anti-pattern this must NOT become):** a clip-path/corner-shape on a small stadium pill or a data card below the `--radius-xl` threshold — visual cost without read (C3 is the tooth). The superellipse lands ONLY where it reads (≥12px radius surfaces).
- **The better-tier-or-round contract is ABSOLUTE.** `border-radius` round is the universal floor; NOTHING paints broken on a non-supporting engine (C4 is the tooth — a clip-path/corner-shape with no border-radius fallback reds).
- **"Flatter" is a DIFFERENT axis** — the iOS-27 "flatter button" delta is a `border-radius` REDUCTION (W-CORNER-AA / GLASS-IOS27, file-line-disjoint), NOT a higher superellipse exponent; this wave is the SHAPE (superellipse silhouette), not the radius magnitude.

## Disposition links

- **Canonical source for `BF.W-SQUIRCLE` + `BE.W-SQUIRCLE-COVERAGE`** (the pool specs); the cross-engine SHAPE floor.
- **RESOLVES the W-SQUIRCLE phantom** (EXECUTION-DAG §172, UNIFIED-ROSTER §136) — the V-mint "W-SQUIRCLE" was CUT as a phantom ("flatter"=`border-radius` reduction, not superellipse); THIS wave is the real squircle SHAPE floor (clip-path cross-engine + corner-shape PE), distinct from the radius-reduction "flatter" delta that folds into W-CORNER-AA.
- **Pairs with W-CORNER-AA** (the corner-AA companion, file-line-disjoint) — W-CORNER-AA clips the backdrop-filter HALO to the radius (the saturated square halo bleeding AROUND the plate); this clips the SILHOUETTE to the superellipse (the shape itself). The two are different clips on different concerns.
- **CONSUMES the shipped `--corner-k-squircle` k-primitive** (`theme/radius.css:90`) + the EXISTING `corner-shape` enhancement (`squircle.css:38`) + the `clip-path`-is-cross-engine fact — zero new k, zero new shape vocabulary.
- **Read by the Maps card** (W-MAPS-CARD composes the squircle silhouette on its clustered controls — the f_073-cluster fused-group arm).
