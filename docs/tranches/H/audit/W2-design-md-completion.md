# W2 — DESIGN.md Drift Completion (proof)

**Wave**: H.W2 (single-lane docs-only).
**Mode**: surgical edits to `/DESIGN.md` per `audit/W0-design-md-drift.md` rows 1–57, with post-W1 token-retirement adjustments folded in.
**File touched**: `DESIGN.md` only.
**Date**: 2026-05-05.

## Disposition by row

Per-row resolution against the canon at HEAD (post-H.W1).

| # | Section | Disposition |
|---|---|---|
| 1 | `--z-hovercard 60 → 120` | **verified** — main z-index table fixed in G pass-2 (DESIGN.md:114). No further edit. |
| 2 | `--z-tooltip 60 → 120` | **verified** — main table fixed in G pass-2 (DESIGN.md:115). |
| 3 | `--z-popover 70 → 130` | **verified** — main table fixed in G pass-2 (DESIGN.md:116). |
| 4 | `--z-modal 80 → 140` | **verified** — main table fixed in G pass-2 (DESIGN.md:117). |
| 5 | `--z-fullscreen 90 → 150` | **verified** — main table fixed in G pass-2 (DESIGN.md:118). |
| 6 | `--z-toast 100 → 160` | **verified** — main table fixed in G pass-2 (DESIGN.md:119). |
| 7 | `--z-toggle 999` row | **verified** — row added in G pass-2 (DESIGN.md:120). |
| 8 | Overlays table z-index drift (DESIGN.md ≈ 564–570) | **edit applied** — Z-index column updated to canon 120/130/140/150 in the duplicated Overlays table. |
| 9 | `--radius 0.5rem → 0.625rem` | **verified** — pixel column already canon 10 px in G pass-2. |
| 10 | `--radius-lg` pixel column 8 → 10 | **verified** — G pass-2. |
| 11 | `--radius-input` 8 → 10 | **verified** — G pass-2. |
| 12 | `--radius-button` 8 → 10 | **verified** — G pass-2. |
| 13 | `--radius-xs` row | **verified** — row exists in DESIGN.md:131. |
| 14 | Elevation rgba → color-mix | **verified** — G pass-2 already wrote the color-mix recipes (DESIGN.md ≈ 155–162). |
| 15 | Cartoon shadow rgba → color-mix | **edit applied** — `--shadow-cartoon-{sm,md,lg}` block rewritten with `color-mix(in srgb, var(--shadow-color) N%, transparent)` recipes; preamble notes the recipe. |
| 16 | `--shadow-card` repoint to `var(--shadow-cartoon)` | **edit applied** — Card flat-offset block rewritten. |
| 17 | `--shadow-card-hover` non-existent | **edit applied** — row dropped; replacement note explains consumers use `--shadow-cartoon-hover` directly. |
| 18 | `--shadow-dock` color-mix | **edit applied** — recipe rewritten with `color-mix` percentages (18% / 10%). |
| 19 | `--shadow-dock-collapsed` color-mix | **edit applied** — recipe rewritten with `color-mix` percentages (14% / 10%). |
| 20 | `--glass-shadow-subtle` already correct | **verified** — claim matches canon. |
| 21 | Subtle Light opacity 30 → 82 | **edit applied** — Glass Surfaces table updated. |
| 22 | Subtle Dark opacity 42 → 90 | **edit applied** — same table row. |
| 23 | Subtle blur 4px → 1px | **edit applied** — same table; preamble explains v0.4 + v0.5.1 halvings. |
| 24 | Default blur 8px → 3px, drop saturate | **edit applied** — table row + saturate clarification in preamble. |
| 25 | Medium blur 12px → 3px | **edit applied** — table row. |
| 26 | Elevated blur 16px → 4px | **edit applied** — table row. |
| 27 | Grain opacity 3.5% (matched) | **verified**. |
| 28 | Dock blur 2px → 1px | **edit applied** — Dock-specific blur paragraph updated. |
| 29 | `.text-display-5` weight 300 → 400 | **edit applied** — typography class table rewritten with `400` across all five display rungs + the audacious mega/ultra additions. |
| 30 | `.text-display-{4,3,2,1}` weight 350 → 400 | **edit applied** — same edit as 29. |
| 31 | `.text-mono-caption` size matches | **verified**. |
| 32 | `.text-mono-micro` row missing | **edit applied** — added row (mono, `--type-micro`, 1.25, 0.025em). |
| 33 | `.text-admin-label` row missing | **edit applied** — added row (mono, `--type-admin-label` 10 px, 500 weight, caps, uppercase). |
| 34 | `.text-math` / `.text-math-body` rows missing | **edit applied** — both rows added. |
| 35 | `.text-pane-title` row missing | **edit applied** — row added with the responsive `clamp()` size + ≥ 640 px breakpoint note. |
| 36 | `.text-engraved` row missing | **edit applied** — row added in class table (separate from the existing kinetic-utilities bullet). |
| 37 | `--tracking-snug` row missing | **edit applied** — added to letter-spacing table; also added `--tracking-tightest`. |
| 38 | `--font-brand-sans` (editorial) | **n/a** — already documented in body + table (DESIGN.md:319). |
| 39 | `.dock-label` phantom utility | **edit applied** — both references removed: the Typography section paragraph (DESIGN.md ~344) and the dock utilities bullet (DESIGN.md ~511). Verified zero `.dock-label` rules in `src/`. |
| 40 | `.icon-{xs..xl}` claim | **edit applied** — extended to canonical `.icon-{xs,sm,md,lg,xl,2xl,3xl,mega}` per `utilities.css:194–201`; the Layout & Sizing section's icons subsection re-claims the full set. |
| 41 | `--animation-slide-*` → `--motion-slide-*` | **edit applied** — Animation offsets block renamed. |
| 42 | `--stack-overlap-*` consumer-defined | **edit applied** — Stacking overlaps block reframed as consumer-defined; canon does not declare. |
| 43 | `--color-divider-*` are JS constants | **edit applied** — Divider colors block reworked to show JS imports from `@mkbabb/glass-ui/tokens`; CSS-token claim retracted. |
| 44 | `--color-status-*` retract | **edit applied** — Status block rewritten to use `--success` / `--warning` / `--info` / `--muted-foreground`. |
| 45 | `--color-gold` framed as primitive | **edit applied** — Gold block names `--gold` as primitive, `--color-gold` as `@theme` alias. |
| 46 | Rainbow regular sweep claim | **edit applied** — Rainbow block lists irregular per-hue values from `tokens.css:518–532`. |
| 47 | `--shimmer-blue-*` (declared in W1; retired in H.W1) | **edit applied** — block dropped from main Color Palette section; the Tranche-G shimmer-family table now lists 3 utilities (gold/vivid/pastel) with a parenthetical noting H.W1 retirement of `--shimmer-blue-*` + `.text-shimmer-blue`. Retired-tokens list extended. |
| 48 | `--heatmap-*` non-canonical | **edit applied** — Heatmap block dropped entirely. |
| 49 | Section accents (`--accent-pink`, `--accent-red`, `--shadow:`) | **edit applied** — added an "Accent / section / shadow primitives" subsection under Color Palette documenting all three as canon and noting `--section-heading` retirement. |
| 50 | `.glass-btn` 15% → full-opacity foreground color (and 20% border, NOT 15%) | **edit applied** — `.glass-btn` Hover bullet rewritten: 20% border, full-opacity foreground color. |
| 51 | `.glass-btn` Disabled 50% → 0.35 literal | **edit applied** — Disabled bullet rewritten with the literal 0.35 + note that this is intentionally heavier than `--opacity-disabled`. |
| 52 | `.glass-btn` Focus uses outline, not box-shadow | **edit applied** — Focus-visible bullet rewritten with `outline` + `outline-offset`. |
| 53 | `.glass-pill` verify-row | **verified absent → bullet dropped**. Searched `glass.css`: no `.glass-pill` rule exists (only `.glass-card`, `.glass-cartoon`, `.glass-btn`, `.btn-pill`, `.input-pill`). The Convenience-shorthands list now drops the `.glass-pill` bullet and adds a one-line note that pill geometry composes via `.btn-pill` + a glass tier. |
| 54 | `pop` transition timings verify-row | **edit applied**. Read `transitions.css:54–63`: `.pop-enter-active` declares opacity transition at `--duration-fast` `--ease-out` AND transform transition at `--duration-slow` `--spring-bouncy`. `.pop-leave-active` declares both at `--duration-fast` `--ease-out`. DESIGN.md's prior single-cell "200 ms `--spring-bouncy`" claim was incomplete; updated to "opacity 200 ms `--ease-out` + transform 450 ms `--spring-bouncy`" for enter, "200 ms `--ease-out`" for leave. |
| 55 | `.btn-pill` "all 200ms" | **edit applied** — base-class bullet rewritten with the explicit per-property list at `--duration-fast` `--ease-standard` covering background-color, border-color, box-shadow, color, opacity, transform. |
| 56 | Tabs subcomponents verify-row | **verified present**. `ls src/components/custom/tabs/` returns `BouncyTabs.vue`, `BouncyToggle.vue`, `UnderlineTabs.vue`, `index.ts`. All three components named in DESIGN.md exist; no edit needed. |
| 57 | Runtime Tokens block forward-deferred | **edit applied** — main Runtime Tokens section now lists the actual exports (`chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm`, `NAMED_EASING_BEZIER`) including the full `NAMED_EASING_BEZIER` map. The Tranche-G additions runtime-tokens table updated to reflect H.W1 retirements (`chartNeutrals`, `vizColorsHex`, `spectrumColor`, `goldenShimmer` removed; only `NAMED_EASING_BEZIER` survives from G's additions). |

## Post-W1 token-retirement adjustments

H.W1 retired several tokens. DESIGN.md sections that previously documented them have been edited to reflect the literal-inlined values:

| Retired in H.W1 | DESIGN.md section affected | Edit |
|---|---|---|
| `--paper-bg-{1..4}`, `--paper-shadow-{1..4}`, `--paper-border-{1..4}` (12 tokens) | Tranche G additions → Paper tier | Replaced the per-token table with a per-tier (background / border / shadow) table whose values come from `paper.css` literals. |
| `--cartoon-accent-mix` | Tranche G additions → Cartoon-shadow accent | Removed the row; preamble notes the literal `15%` light / `18%` dark inlined into `--shadow-cartoon-accent`. |
| `--type-formula` | Tranche G additions → Display-mega/ultra + Mathematical axis | Removed the row from both tables; notes that math typography sizes off `--type-subheading`. |
| `--shimmer-blue-{dark,mid,light}` (3) and `.text-shimmer-blue` | Tranche G additions → Shimmer family + main Color Palette → Blue shimmer | Dropped the Color-Palette block entirely; trimmed the Shimmer-family table from 4 utilities to 3; added retirement notes. |
| Per-rung Fraunces axes for display-3 / -4 / -5 / -mega / -ultra (5 tokens) | Typography class table + Tranche G additions → Display-mega/ultra | Class table now shows literal axes (`"WONK" 1, "SOFT" X, "wdth" Y`) for those rungs; display-1 + display-2 keep their token references. The per-rung table was rebuilt to show literal values for all rungs. |
| `chartNeutrals`, `vizColorsHex`, `spectrumColor`, `goldenShimmer` | Tranche G additions → Runtime tokens + main Runtime Tokens block | Both blocks updated; only `NAMED_EASING_BEZIER` remains from G's runtime additions. |

## Verification artefacts

- `wc -l DESIGN.md` post-edit: ~1170 lines (was 1092 at HEAD entry; was 916 at G FINAL.md).
- `git diff --stat DESIGN.md`: `+188 -106`.
- `grep` confirms zero remaining references to `.dock-label`, `--animation-slide-*`, `rgba(0,0,0`, `--shadow-card-hover` (outside intentional retirement-doc text).
- Verify-row reads: `transitions.css:54–63` (pop), `glass.css` (no `.glass-pill`), `src/components/custom/tabs/` (all three components present).

## Hard gate

(a) every drift row from `audit/W0-design-md-drift.md` resolved (edit applied, verified, or n/a) — **57 / 57**.
(b) verify-rows 53, 54, 56 read against current source — **done**, recorded above.
(c) `.dock-label` phantom utility absent — **confirmed**.
(d) `--accent-pink` / `--accent-red` / `--shadow:` / `.depth-text` documented as canon — **confirmed** in the new "Accent / section / shadow primitives" subsection.
(e) typecheck — pre-existing failure in `demo/stories/primitives/slider-glass-track.vue` (missing `_slider_dock_bridge.vue` import) is unrelated to DESIGN.md docs-only edits and outside this lane's bounds; this is W3 work-in-progress state.
(f) orchestrator commits W2 close — pending orchestrator action.

## Counts

- Drift rows resolved: **57 / 57**
  - Edit applied: 38
  - Verified — already correct (G pass-2): 13
  - Verified — and corrected: 3 (rows 53, 54, 56)
  - n/a — editorial / already canon: 3
- Post-W1 token-retirement DESIGN.md sections rewritten: **6**
  - Paper tier · Cartoon-shadow accent · Display-mega/ultra · Shimmer family · Mathematical axis · Runtime tokens (×2)
- Phantom-utility purges: **3** (`.dock-label` × 2 sites, `.glass-pill` × 1, `--shadow-card-hover` × 1).
- Token-name corrections: `--motion-slide-*`, `--stack-overlap-*`, `--color-divider-*`, `--color-status-*`, `--gold` vs `--color-gold`.
