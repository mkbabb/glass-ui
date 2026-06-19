# BC — the fourier-analysis-M cross-repo-inbound intake

> fourier-analysis tranche **M** delivered the consolidated, deduplicated cross-repo-inbound list
> (its `ADOPTION-ASKS.md §11-§12`). fourier NEVER writes glass-ui (the foreign-tree fence) — each
> carries a no-legacy fourier interim with kill-date = the 4.1.0 ship. **BC decides build/meet/retire**
> per the ≥2-consumer bar (build a primitive ONLY with ≥2 grounded binary consumers; else BOOK with
> the named evidence; the apply-the-bar discipline is binding — no contrivance).

## Tier 1 — the two α asks that fix fourier's live critique (highest value)

| # | ask | BC disposition |
|---|---|---|
| **1** | **Overlay-band bright-signal gating** (→ darkened dropdown). The overlay band self-darkens UNCONDITIONALLY (`ladder.css:200-204`) while the content tiers gate the AA darken behind `@container style(--glass-backdrop:light)` (`:216-219`). Extend the same bright-signal gating to the overlay band — floor `--glass-tint-strength` unconditionally, full AA only under a declared/sampled light backdrop (backdrop-detecting, NOT a blanket revert, so dark siblings keep the lift). A one-block transposition on the same oklab axis. | **BUILD — RECONCILE into the BC adaptive-glass wave** (`BC.W-GLASS-LEGIBILITY-MEASURED` / the adaptive-glass band). A real source change, on the existing seam, no new register. Sequences fourier M.W5 to pure adoption. |
| **2** | **Rounded glass focus-ring + a real Input/SearchField** (→ square/offset search). 4.0 ships only Tailwind `outline` utilities that square the corner + offset past it. Ask: an Input/SearchField consuming `--radius-input` + a radius-following `box-shadow` focus-ring (`border-radius:inherit`, contrast-target = the composited glass fill), promoted as a standalone `.focus-ring` utility. | **BUILD/VERIFY — RECONCILE into `BC.W-CONTROL-CUSTOM` + `BC.W-SEARCH-CUSTOM`.** glass-ui HAS `ui/input` + the `--focus-ring-shadow`/`--invalid-ring` register; the ask is the radius-FOLLOWING ring (`border-radius:inherit`) + the composited-fill contrast target. Verify the `.input-pill` focus ring follows radius; the SearchField is W-SEARCH-CUSTOM. |

## Tier 2 — design-system primitives (net-new; apply the ≥2-consumer bar)

| # | ask | consumers (fourier's claim) | BC disposition |
|---|---|---|---|
| **3** | **accent-tone / SelectableChip** — a contrast-floored 3-channel tonal accent (`--accent-fill` idle ~6-8% + active band / -edge / -ink) from one `--tone` via value.js `safeAccentColor`; the IDLE/resting state floored ≥3:1 (not just hover/active). fourier re-derives this ~57×. | fourier + value.js palette chips + speedtest tone badges | **BUILD (≥2 met)** → `BC.W-ACCENT-TONE` (the 3-channel tonal register + `<SelectableChip>` if the chip generalizes; the idle-floor is the load-bearing new behavior). Token-first; composes value.js `safeAccentColor`. |
| **4** | **AtomDiff viewer** — a 3-tone (added/removed/changed) keyed-row renderer over the canonical `atomdiff` shape. | fourier /diff + value.js palette diffs + speedtest run-compares | **DECIDE (agent applies the bar)** — the `atomdiff` shape is a value.js type (app-specific); a GENERIC keyed-3-tone-diff-rows primitive MAY generalize. Lean **BOOK** with the ≥2-evidence unless the grammar is genuinely generic → then a thin `<DiffRows>` primitive. Record the verdict + the consumer-evidence. |
| **5** | **convergence-reveal motion preset** — the "partial-sum settle" curve (spring + orchestration, PRM-collapse-to-terminal). The brand signature. | fourier viz + equation | **BUILD-small** → a `MOTION_CURVES` preset (composes kf spring; cheap, no new engine). Fold into the motion-curves table / `BC.W-MOTION-ONE-CLOCK`. |
| **6** | **SplitChars / useCharStagger** — per-glyph split with `--char-index` + an accessible full-text label (the JS partner to the shipped `.char-stagger` CSS). | every hero hand-rolls it | **BUILD (≥2 by construction — every hero)** → `useCharStagger` + `<SplitChars>` on `/motion-core` (the a11y full-text label is load-bearing). |
| **7** | **canvas-anchored-overlay** — anchor the top-layer popover to a canvas-relative point via a synthetic `getBoundingClientRect` (coefficient/curve hovers over `<canvas>` — no DOM anchor). | fourier only (named) | **BOOK** (1 named binary consumer — the ≥2-bar unmet). Record the evidence + the booked-promotion trigger; fourier ships its own interim. |
| **8** | **scroll-reveal=once** — an opt-in `once` latch on the `[data-scroll-reveal]` `view()` CSS recipe (it re-fires on every re-entry — wrong for virtualized/teleporting scrollers; `useStaggerReveal` already honors `once`, the gap is the CSS recipe). | virtualized/teleporting scrollers | **BUILD-small** (cheap CSS recipe gap) → fold into the scroll-driven recipe / `BC.W-SCROLL-TRIGGER`. |

## Tier 3 — refinements within existing components

| # | ask | BC disposition |
|---|---|---|
| **9** | **ConfiguratorLayer trailing/actions slot** — a right-aligned header slot inside a `@click.stop` boundary (aligns a panel-wide reset to the title AND retires fourier's `CollapsibleSection.vue`). | **BUILD-small** → fold into a Configurator wave (additive slot). |
| **10** | **DockIconButton `active?` prop** — stamps `aria-pressed`/`data-active` + a default visible selected register. Re-verify at BC — glass-ui already keys `--dock-active-*`, so this may be ergonomic sugar + a sane default; STRIKE if it already ships. | **VERIFY** → if the prop is absent, add it (small, into a dock wave); if `--dock-active-*` + a selected register already paint, record STRUCK. |
| **11** | **Configurator `stage-mobile-height` + `aside-width` prop** — (a) `.configurator-stage` resolves to a nonzero flex height in the mobile column; (b) expose `:aside-min/max-width` / `--configurator-aside-*`. Retires fourier's last inv-30 breaches (the `grid-template-columns` overrides + the `:deep(.configurator-stage)` patch that defeat `asideSide`). | **BUILD** → fold into a Configurator wave (the mobile-height fix + the aside-width token/prop). |

## Tier 4 — process + upstream rebaseline

| # | ask | BC disposition |
|---|---|---|
| **12** | **tier-staleness-gate** — a `proof:consumer-staleness` / PostCSS lint that WARNS on retired tier-class strings after a major bump (the mechanism gap: `glass-subtle` + the `.cartoon-card` shim silently rendered zero glass for an era with no diagnostic). | **DECIDE** — a producer-side gate that helps CONSUMERS. Lean **BUILD-as-gate** (a small `proof:*` + a documented consumer lint recipe) or **BOOK** to a process wave. Record. |
| **13** | **`--viz-amber` rebaseline** — fold the contrast rebaseline (3.54→4.6:1) upstream via `safeAccentColor` so all consumers inherit; fourier's `:root` override deletes on adopt. | **BUILD-small** (a token rebaseline; W-NO-GRAY-adjacent). Fold into the glass/color band. |

## Already shipped at 4.0 — do NOT re-build (struck by fourier)
`dividers` (A-1), `.configurator-section-label` (A-2), `asideSide` (A-3), `useSpecularTracking` (the former `useSpecular` ask).

## Consume-contracts (already in BC scope — CONFIRM they land at 4.1.0)
fourier depends on but doesn't re-ask: **`W-ON-GLASS-FG`** (muted-fg contrast-target = the composited glass fill — sequences M.W5's glass migration so text doesn't whisper-collapse), **`W-LIQUIDHOVER`** (specular auto-arm), **`W-PAPER-GRID-TEXTURE`**, **`W-BORDER-PROGRESS`**, **`W-SCROLL-CARD`**, + value.js `sampleColorRamp` (0.13). → BC confirms each ships at the cut.

## Priority (fourier's most-wanted)
Tier 1 (#1 overlay-band gating + #2 rounded focus-ring) are the two of fourier's eight live findings it CANNOT fix on its own (an override would need `!important` to beat glass-ui's `:where()` tint — forbidden). **If BC lands just those two, fourier's darkened-dropdown + square-search resolve at the source for every consumer, and M.W5 becomes pure adoption.** Do them first.
