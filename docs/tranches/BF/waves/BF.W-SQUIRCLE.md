# BF.W-SQUIRCLE — the cross-engine squircle silhouette floor (the iOS continuous-corner superellipse, compositor-safe)

**Band 6 · Tier B-par · depends: W-SPIKE-DELETE (T2, spine clean) · pairs with W-CORNER-AA (T6, the corner-AA companion)**

## The defect / the ask

The Band-2 squircle-coverage MAJOR (DEFERRED-CENSUS **D23** — "the breadth bands … `LENS-PRISM`/`SQUIRCLE`"; carried forward from `BE.W-SQUIRCLE-COVERAGE`, **CRITICAL**, never built). The single most-visible iOS-27 SHAPE cue — the continuous-corner superellipse (`|x/w|⁴ + |y/h|⁴ = 1`, Apple's `n=4` squircle) — is encoded in glass-ui TWO disjoint places, **BOTH Chromium-only**, so **Safari paints a plain rounded-rect on every glass surface** (SEED §6 precept 6, Safari-first; the reference Control-Center clustered-controls read most-broken as squared rounded-rects):

1. **`corner-shape: superellipse(2)` rides behind `@supports (corner-shape: superellipse(2))`** (`src/styles/glass/squircle.css:38-56`) — Chrome 139+ ONLY. The HEAD coupling is OVERLAY-BAND-ONLY: `.glass-floating.rounded-dialog`, `.glass-floating.sheet-animate`, `.configurator`/`.floating-panel`, `.glass-hero` (`squircle.css:40-53`). The card / chip / dock-control families are NOT coupled at all (`theme/radius.css:105-106`: `--corner-shape-card: round; --corner-shape-pill: round`).
2. **The displacement-map squircle PROFILE** (`glass-refract.css:97`, the crossed-gradient bevel) rides behind `@supports (backdrop-filter: url(#…))` — Safari never enters.

`theme/radius.css:76-78` records the constraint VERBATIM: *"NEVER make corner-shape the contract — Safari/Firefox have no positive signal through 2026"* — so the un-gated `border-radius` round is the cross-engine CONTRACT, `corner-shape` is the Chromium PE TIER, and there is NO middle floor. **`clip-path` IS WebKit-supported** (Safari 26 ✓, FF ✓, Chrome ✓), so a `clip-path` superellipse path is the genuine cross-engine silhouette floor that lands the squircle SHAPE on Safari where every shadcn derivative paints round. This is the corner-SHAPE companion to **W-CORNER-AA**'s corner-AA fence (that wave kills the saturated square halo bleeding AROUND the rounded bloom plate; this wave makes the silhouette itself the iOS superellipse on every engine) — the two are file-line-disjoint (`liquid-morph.css`/fission halo-clip vs `squircle.css`/per-surface silhouette).

`scripts/proof-squircle-language.mjs` EXISTS but carries only the TOKEN-AXIS-EXISTS clause (the k-rungs are minted) — it has NO `clip-path` / cross-engine-floor clause and NO Safari pixel readback.

## The mechanism

The cross-engine FLOOR, ZERO change to the Chromium `corner-shape` enhancement, idiomatic onto the ONE `--corner-k-squircle` k-vocabulary — gestalt, compositor/paint-safe, no second k, no legacy:

1. **The `clip-path` superellipse floor (`src/styles/glass/squircle.css`, a new `@layer components` block).** Mint a per-surface `--squircle-clip-<surface>` register — a `clip-path: path(…)`/high-vertex `polygon()` approximating `|x/w|⁴ + |y/h|⁴ = 1` at the surface radius, GENERATED from the SAME `--corner-k-squircle` exponent (`theme/radius.css:90`, n=4), never a second k. Apply it on the card / chip / dock-control families AT/ABOVE the `--radius-xl` (12px) read threshold — the `squircle.css:6-19` rounded-vs-squircle POLICY keeps small pills round by construction (the superellipse is imperceptible at a stadium pill, visual cost without read). The clip paints the squircle silhouette on EVERY engine that supports `clip-path`; a non-supporting engine falls to the un-gated `border-radius` round CONTRACT (the better-tier-or-round discipline). `clip-path` is a PAINT-time clip (`proof:no-layout-animation` holds by construction — no layout property animates; static at rest, GPU-composited on Metal).

2. **WIDEN `corner-shape` from overlay-band-only to card / chip / dock-control** (the Chromium PE TIER). ADD those surfaces to the `@supports (corner-shape: superellipse(2))` block (`squircle.css:38`), each reading its OWN `var(--corner-shape-<surface>)` token (independently overridable; `--corner-shape-pill` stays `round` by policy). On Chromium the analytically-perfect superellipse renders; the clip-path is the same silhouette one engine down — the two LAYER (corner-shape crisp PE, clip-path cross-engine floor, border-radius universal round).

3. **The per-surface token home stays `theme/radius.css`.** `--corner-shape-card`/`-chip`/`-dock-control` re-point off `round` onto `superellipse(var(--corner-k-squircle))` for the AT/ABOVE-threshold surfaces; the small-control aliases (`--corner-shape-pill`, `--radius-control` stadium set) stay `round` — the ONE k-vocab drives both axes. A consumer who wants a round card re-points `--corner-shape-card: round` + drops the clip (presets-in-consumers — the library default IS the iOS squircle).

This is NOT a re-fork: it composes the EXISTING `--corner-k-squircle` k-primitive + the EXISTING `corner-shape` enhancement + the EXISTING `clip-path`-is-cross-engine fact; it mints NO second k, NO second shape vocabulary, NO mask. The `corner-shape` Chromium path is PRESERVED + WIDENED, the clip-path layered UNDER it.

## The gate — `proof:squircle-coverage` (born-RED → GREEN)

`scripts/proof-squircle-coverage.mjs`, `tags: ["local","ci","release"]` (the source-structure arm; the binding PAINT is the π below — and `release` rides the π-present check per W-PI-AUTHOR's D32 downgrade). `proof:squircle-language`'s TOKEN-AXIS-EXISTS stays GREEN, cross-asserted. All clauses are SOURCE facts; born-RED on HEAD:

- **C1 — the clip-path cross-engine floor is minted.** `--squircle-clip-<surface>` (a `clip-path: path()`/high-vertex `polygon()`) declared for card / chip / dock-control, derived from `--corner-k-squircle`. Born-RED: `grep -n 'clip-path' src/styles/glass/squircle.css` → exit 1 at HEAD.
- **C2 — the corner-shape WIDEN.** The `@supports (corner-shape: superellipse(2))` block carries card / chip / dock-control (each reading `var(--corner-shape-<surface>)`), beyond the overlay-band-only HEAD set. Born-RED at HEAD (only dialog/sheet/panel/hero present, `squircle.css:40-53`).
- **C3 — the policy fence holds.** Small-radius pills (< `--radius-xl`/12px) stay ROUND — NO clip-path/corner-shape on `--corner-shape-pill` / the `--radius-control` stadium set (the `squircle.css:6-19` policy). A clip-path on a stadium pill REDs (the imperceptible-cost defect); the threshold is the gate fact.
- **C4 — the better-tier-or-round contract.** Every squircle surface keeps its un-gated `border-radius` round contract underneath. A clip-path/corner-shape surface with NO `border-radius` fallback REDs (a non-supporting engine MUST paint round, never broken). The three-layer order (clip-path floor · corner-shape PE · border-radius contract) is asserted.
- **C5 — the k-vocab fence (ONE k).** The clip-path path is derived from `--corner-k-squircle` (n=4); NO second k-definition, NO hardcoded path that disagrees with the token. A path computed off a literal exponent that diverges from `--corner-k-squircle` REDs.
- **C6 — compositor/paint-safe.** No `clip-path` lives inside a `@keyframes`/`transition` reflow-set (`proof:no-layout-animation` cross-asserted GREEN — the squircle is a static shape, not an animation). The dock-morph k-animation (the calc()'d k against `--corner-k-squircle`) keeps its compositor-transform discipline.

**Self-test (`--self-test`, born-RED→GREEN, ≥4 bites):** (i) a clip-path on a sub-threshold pill REDs C3; (ii) a clip-path/corner-shape surface with NO border-radius fallback REDs C4 (the broken-on-Safari evasion); (iii) a hand-rolled clip-path path that diverges from `--corner-k-squircle` REDs C5; (iv) a `clip-path` inside a `@keyframes` step REDs C6. Each MUST flag; the fixed tree MUST be clean. Extend-vs-new: NEW gate; `proof:squircle-language`'s TOKEN-AXIS-EXISTS GREEN cross-asserted (not re-implemented).

**What REDs on the pre-fix tree:** C1 (no `clip-path` in `squircle.css` — `grep` exit 1), C2 (card/chip/dock-control absent from the `@supports` block) — born-RED by construction; GREEN only after the clip-path floor + the corner-shape widen land.

## The binding π — `tests-visual/squircle-coverage.spec.ts`

NET-NEW, auto-enrolled in the visual-π runner (`tests-visual/pi-runner-manifest.mjs`). The binding paint is a REAL **corner-pixel getImageData readback** proving the superellipse silhouette PAINTS where today Safari paints round.

- **Surfaces — a big `<Card>` (≥`--radius-xl`), a Maps-facet `<IconChip>`, and a dock-control plate (`.dock-icon-button`)** over a contrasting backdrop (`/display/buttons` + `/dock/overview`).
- **Measured assertions:** screenshot each surface's corner region, decode it (pngjs), sample the alpha boundary along the corner DIAGONAL, and assert the painted corner follows the **superellipse curve, NOT the circular arc** — the squircle's flatter-then-sharper profile extends measurably further into the corner than a `border-radius` quarter-circle at the SAME radius (the boundary-extent delta is the binding measure, not a string match). The grouped f_073-cluster arm: a fused multi-control squircle GROUP reads as ONE silhouette with concentric inner radii.
- **Both modes** (light/dark) on the **`webkit`** project (the binding Safari truth — the clip-path floor; enrollment via W-SAFARI-CAPTURE's computed-from-disk `testMatch` widen) AND **`chromium-headless-new`** (the corner-shape PE tier reads identical-or-crisper). **Born-RED on HEAD** (Safari corners are circular arcs today). NO source-green close.

## The gestalt row

**BF-roster surface: `squircle-silhouette`** (a new row, wired by W-GESTALT-WIRE into `bf-gestalt-roster.md`; `surface-paths: src/styles/glass/squircle.css, src/styles/theme/radius.css`). Verdict requirement: on a FRESH whole-page both-mode `:5199` capture (NEVER reducedMotion) — and the binding Safari corner-capture rides W-SAFARI-CAPTURE — the card/chip/dock-control corners read as the iOS continuous-corner SQUIRCLE (the flatter-then-sharper superellipse silhouette), not a shadcn rounded-rect, in both modes. The warm-cream identity is untouched (a SHAPE change, zero hue delta — `meanChroma` band unchanged from the surface's existing roster floor). Born-FAIL on the BE/HEAD tree (Safari paints round); GREEN at its OWN close; W-REFLECT re-confirms (never the first paint); surface-hash freshness floor binds.

## Fences

- **No-legacy / clean break.** A clean clip-path mint, no alias; the `corner-shape` Chromium path is PRESERVED + WIDENED, never replaced — clip-path is the cross-engine FLOOR layered UNDER it, not a swap. The WAVE-LIST's earlier wrong "`corner-shape` is the cross-engine mechanism" framing is CORRECTED (the `clip-path` floor is the real cross-engine silhouette).
- **No re-fork / idiomatic.** The ONE `--corner-k-squircle` k-vocab drives BOTH corner-shape AND the clip-path; no second k, no second shape vocabulary, no mask, no new primitive.
- **The policy fence (the specific anti-pattern this must NOT become):** a clip-path/corner-shape on a small stadium pill or a data card below the `--radius-xl` threshold — visual cost without read (C3 is the tooth). The superellipse lands ONLY where it reads (≥12px radius surfaces).
- **The better-tier-or-round contract is ABSOLUTE.** `border-radius` round is the universal floor; NOTHING paints broken on a non-supporting engine (C4 is the tooth — a clip-path/corner-shape with no border-radius fallback reds).
- **Compositor/paint-safe.** `clip-path` is a paint property — never a layout property; static at rest (PRM is a no-op on a shape floor). `proof:no-layout-animation` stays GREEN by construction (C6).
- **The warm-cream identity holds.** A shape change, zero hue/token touch. The GL-shader fence holds (the clip-path floor is CSS, the Safari edge-lens refinement is SVG `filter:` — never a shader edit).
- **Presets-in-consumers.** The default IS the iOS squircle (the library identity); a consumer who wants round re-points `--corner-shape-<surface>: round` + drops the clip — ONE token edit, no library change.

## Disposition links

Closes part of **D23** (the breadth bands — the `SQUIRCLE` cross-engine-floor Band-2 MAJOR → BUILD: the clip-path superellipse floor on card/chip/dock-control + the corner-shape widen + the Safari corner-pixel π). The LENS-PRISM Clear-lens chromatic-rim arm of D23 is its own wave (`BF.W-LENS-PRISM`); the album-art aurora arm is `W-AUR-*`. Pairs with **W-CORNER-AA** (D17 — the corner-AA halo-clip fence; file-line-disjoint — that wave clips the bloom-plate's saturated backdrop halo, this wave shapes the silhouette to the superellipse) and reads the SAME `--radius-card`/`--radius-xl` token register. Supersedes `BE.W-SQUIRCLE-COVERAGE` (never built; this is the BF-tree-paint-true re-land).
