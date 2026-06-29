# Style Audit — Slice C: `src/styles/` (the cascade)

**Date:** 2026-06-03
**Slice:** `/Users/mkbabb/Programming/glass-ui/src/styles/` — tokens.css, theme.css, typography.css, glass.css, dock.css, utilities.css + the rest of the 21-file cascade.
**Mode:** bidirectional self-audit (glass-ui IS the canon, so drift surfaces as internal-incoherence + proposed library fixes, not consumer drift).

## Preamble

This slice is the source-of-record for every visual axis, so most of the 7 axes (interactive consistency, overlay/motion vocab, a11y resilience) are exemplary here by construction — `glass.css`, `transitions.css`, and `utilities.css` are the reference implementations the other slices are measured against. The cascade is overwhelmingly token-disciplined: zero `transition: all`, zero stray `cubic-bezier()` (the one hit is a doc comment in drawer.css:30), zero raw hex outside SVG data-URIs, zero raw `color-mix(... var(--foreground) N%)` literals (all migrated to `--surface-tint-*`). The "duplicate" `@keyframes sparkle-sweep` / `scrim-breath` are intentional PRM-bracketed pairs (animations.css:165, 254), not drift.

The real findings cluster on the two things the brief flagged as mattering most: **radius-namespace coherence** and **token double-mints / @apply-vs-token hygiene**. The headline is a four-way disagreement about the radius scale across tokens.css, theme.css, DESIGN.md, and the radii story.

---

## Drift by axis

### Axis 1 — Token alignment

| # | Site(s) | Drift | Canonical fix (verified) |
|---|---------|-------|--------------------------|
| 1.1 | `theme.css:212-219` vs `tokens.css:290-297` | **Radius primitives double-minted.** theme.css re-declares `--radius`, `--radius-xs:4px`, `--radius-sm:4px`, `--radius-md:6px`, `--radius-xl:12px`, `--radius-2xl:1rem`, `--radius-pill` as raw literals instead of `var()`-referencing tokens.css. Two independent copies of the same scale. A consumer overriding `--radius-md` at `:root` is shadowed by the un-`var()`'d `@theme` literal — the override silently no-ops for `rounded-md`. Note theme.css *does* `var()` the semantic aliases (`--radius-card: var(--radius-2xl)` line 222) — so the inconsistency is internal to the same block. | `@theme` should read `--radius-md: var(--radius-md-base)` style, OR (cleaner) collapse: tokens.css owns primitives, theme.css references them. The semantic-alias half already does this correctly; the primitive half doesn't. |
| 1.2 | `tokens.css:291` + `theme.css:213` | **`--radius-xs` (4px) === `--radius-sm` (4px) — a collapsed/fictional rung.** Two named rungs, identical value. `--radius-xs` has **zero consumers** anywhere in `src/` or the cascade (only the radii demo story references `rounded-xs`). DESIGN.md's radius table (line 308-321) does not list `--radius-xs` at all — it jumps `--radius` → `--radius-sm`. The xs rung is an orphan double-mint. | Either delete `--radius-xs` (no src consumers; per overfitting-audit ≥2-sites rule it fails), or give it a distinct value (the story claims "2px" — see 6.2). |
| 1.3 | `tokens.css:293` (`--radius-md:6px`) | **`--radius-md` orphan rung.** Zero consumers in `src/components/` (no `rounded-md`, no `var(--radius-md)` in any SFC). Only appears in `cn.test.ts` fixtures + demo stories. A minted rung the library itself never spends. | Flag for the overfitting audit — keep only if a component family adopts it, else fold into the sm/lg neighbours. |
| 1.4 | `dock.css:954`, `utilities.css:732`, `utilities.css:858` | **Hand-rolled under-shadow hairline `0 0.5px 0 0 rgb(0 0 0 / 0.06)`** instead of the token. This literal is byte-identical to the *dark-mode* `--hairline-under-shadow` (`tokens.css:1495`) but NOT the light-mode one (`/ 0.04`, tokens.css:675) — so these three sites paint a fixed 0.06 alpha that does not track the light/dark token split. tokens.css:786-787 explicitly named `dock.css` + `instrument-chassis.css` as sites that "retire to" the §AL-W10 SLIM rungs; the retirement never landed (and the count grew from 3 to 5). | Mint a `--hairline-under-shadow` that resolves 0.04→0.06 across modes (it already does!) and reference it. The light/dark divergence is the bug the literal hides. |
| 1.5 | `dock.css:271`, `instrument-chassis.css:56` | **Hand-rolled INSET under-shadow `inset 0 -0.5px 0 0 rgb(0 0 0 / 0.06)`.** No exact token exists — the closest, `--glass-under-shadow-spine` (tokens.css:797), is non-inset `0 1px 0 0 oklch(...)`. This is a genuine missing rung (the *inset bottom-edge* engraved hairline, distinct from the *outset* under-shadow). 2 sites = qualifies. | See GLASS-UI GAP G1 — mint `--hairline-engraved-inset`. |

### Axis 2 — Utility / @apply hygiene

| # | Site(s) | Drift | Canonical fix |
|---|---------|-------|---------------|
| 2.1 | `utilities.css:353` (`.kbd`), `dock.css:593` | **`.kbd` and dock-layer-tab consume `--radius-sm`** — fine in isolation, but because `--radius-sm` is one half of the 1.2 double-mint (=`--radius-xs`), any future rung-splitting of xs/sm silently changes both. Low severity; record it as a dependent of 1.2. | Resolve 1.2 first; these consumers are correct once the rung is real. |
| 2.2 | cascade-wide | **Clean.** `@apply` usage is layout-only (`flex`, `items-center`, `flex-shrink-0`) in `.glass-btn`/`.btn-pill`/dock — exactly the sanctioned use. No Tailwind-soup recipes that should be a `.glass-*`/`.interactive-item` class. No `@layer components` redefining a lib component class from outside its home file. | — (no action) |

### Axis 3 — Interactive consistency
Reference-clean. `.glass-btn` (glass.css:132), `.interactive-item` (utilities.css:156), `.btn-interactive` (utilities.css:953), `.tap-squish` (utilities.css:199) all bind `--scale-hover`/`--scale-press`/`--opacity-disabled`/`--focus-ring-shadow` and gate press under PRM. No drift.

### Axis 4 — Variant orthogonality + rooting
N/A to the CSS cascade (no CVA, no `:deep()` here). The token tiering (glass 5-rung × dock/chassis opacity primitives) is orthogonal and composable.

### Axis 5 — Overlay + motion vocab
Reference-clean. z-scale (tokens.css §3), per-tier glass shadows, the `.popover-animate`/`.slide-in-from-side`/`.sheet-animate` family, and the PRM-bracketed keyframe pairs are the canon. The shimmer fast/slow naming offset is documented (theme.css:329-340), not drift.

### Axis 6 — Typographic / structural

| # | Site(s) | Drift | Canonical fix |
|---|---------|-------|---------------|
| 6.1 | `DESIGN.md:308` vs `tokens.css:290` | **DESIGN.md radius table is stale/wrong.** It lists `--radius` as `0.5rem / "8 px"`; the actual token is `0.625rem` (=10px) (tokens.css:290, theme.css:212). Every semantic alias derived from `--radius` (`--radius-lg`, `--radius-input`, `--radius-button` — all "8 px" in the doc) is therefore mis-documented by 2px. | Regenerate the DESIGN.md radius table from tokens.css (10px base). |
| 6.2 | `demo/stories/foundations/radii.vue:6` | **The radii story documents `rounded-xs` as "2px"** while the token resolves to 4px (=`--radius-sm`). The story renders two visually-identical 4px swatches labelled "xs (2px)" and "sm (4px)" — a self-contradicting tour of the scale. | Tie off with 1.2: either delete xs, or actually make it 2px (then story + token agree). |
| 6.3 | typography.css | **Clean.** Display utilities all carry `font-variation-settings: var(--font-display-variation-settings)` (= WONK 1, SOFT 0, typography.css:98). The CM-serif body cascade (line 142) and `.section-label`/`.text-mono-*` are canon. | — |

### Axis 7 — A11y resilience
Reference-clean. glass.css carries the full `prefers-reduced-transparency` (line 295), `prefers-contrast` (314), and `@supports not (backdrop-filter)` (326) fallback set. `color-mix` recipes bake `var(--foreground)`/`var(--card)` (mode-tracking sources), not light-mode literals. utilities.css:1011 restores focus rings under `forced-colors`. No drift.

---

## GLASS-UI GAPS (legitimate missing substrate)

- **G1 — Inset engraved-hairline token.** `inset 0 -0.5px 0 0 rgb(0 0 0 / 0.06)` is hand-rolled at 2 sites (`dock.css:271`, `instrument-chassis.css:56`) — the engraved bottom-edge inner stroke that reads as a recessed panel lip. No token covers the *inset* form (`--glass-under-shadow-spine` is outset/non-inset). **Placement:** tokens.css §8 glass-decorative block, beside `--hairline-under-shadow`. Propose `--hairline-engraved-inset: inset 0 -0.5px 0 0 rgb(0 0 0 / 0.06)` with a `.dark` mirror, consumed by both sites. Qualifies (2 sites).

- **G2 — A `06`-alpha outset under-shadow rung, or fix the existing one's value.** The dark-mode `--hairline-under-shadow` is already `/ 0.06` (tokens.css:1495) and 3 sites (`dock.css:954`, `utilities.css:732`, `utilities.css:858`) hand-roll exactly that — but they want the *constant* 0.06 in BOTH modes, which is why they bypass the token (whose light value is 0.04). Either (a) accept the light/dark split and reference the token (cosmetically the literals are slightly wrong in light mode), or (b) mint `--hairline-under-shadow-firm: 0 0.5px 0 0 rgb(0 0 0 / 0.06)` (mode-constant) for the 3 sites that deliberately want it. **Placement:** tokens.css §8. The literals were already earmarked for retirement at tokens.css:786 and never migrated — this gap is the unfinished §AL-W10 SLIM landing.

- **G3 — `--radius` documentation generator.** Three sources (tokens.css, DESIGN.md, radii.vue) independently restate the radius scale and all three disagree (10px vs 8px vs 2px-xs). This is a tooling gap: the radius table + story should derive from `getComputedStyle` of the live tokens, not hand-maintained literals. **Placement:** a `profile:tokens`-style probe, or a generated `DESIGN.md` radius section.

---

## UNION CANDIDATES

- **U1 — Single radius source-of-truth.** The primitive radius rungs are minted twice (tokens.css:290-297 + theme.css:212-219) with the semantic-alias half already correctly `var()`-bridged in BOTH files. **Canonical form:** theme.css's primitive block should `var()`-reference tokens.css (matching how it already handles `--radius-card`/`-panel`/etc.), so there is exactly one literal per rung. Today a `:root` override of `--radius-md` no-ops because the `@theme` literal wins for the `rounded-md` utility — the union closes that trap.

- **U2 — Collapse the xs/sm radius rungs.** `--radius-xs` and `--radius-sm` are both 4px with xs unused. Canonical: one 4px rung (`--radius-sm`); either delete xs or re-value it to 2px so the story's "2px" claim becomes true and the rung earns its name. Pick based on whether any consumer wants 2px corners (none in `src/` today).

---

## Tally

**Drift rows:** 8 (2 token double-mint/orphan, 2 hand-rolled hairline clusters [5 literal sites], 1 @apply-dependent, 3 doc/value mismatches) · **Top gap:** G1 inset engraved-hairline token (2 sites, no covering rung) · **Unions:** 2 (single radius source-of-truth; collapse xs/sm).
