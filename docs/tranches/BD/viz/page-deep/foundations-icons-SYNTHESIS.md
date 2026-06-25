# foundations/icons — Pass-E SYNTHESIS (binding per-page verdict)

**Route:** `/foundations/icons` · **SFC:** `demo/stories/foundations/icons.vue` · **Focal component:** `<IconChip>` (`@mkbabb/glass-ui/icon-chip`) · synthesized from the demo / design / component reports in this dir.

The three auditors agree this is a **structural twin of `/foundations/colors`** — one genuinely reference-class hero move (the IconChip "Pops" row: 13 chips 1:1 onto `--section-color-0..12`, full-chroma glyphs over color-mix backplates, blooming in on the 0.34s `--spring-snappy` clock) confined to the **top inch of the page**, sitting above three flat spec-sheet sections (an opaque Lucide token-grid + two unframed Sizing/Stroke clusters) over **no aurora field**, in **one** outer glass plate. It fails the BD mandate on the SAME four axes the colors page does (no aurora · no per-section glass cards · near-zero component composition · animation collapses below the fold). **No P0 render bug** (unlike colors — the icons hero entrance is healthy). The component itself (`<IconChip>`) is **architecturally sound** — the work is overwhelmingly DEMO-LAYOUT, plus two micro-tidies on the component.

The component auditor adds the one critical correction that reconciles a phantom conflict: **IconChip is the brand-overlay color-event chip (`color-mix(in srgb, --surface-tint`), DELIBERATELY NOT a glass tier** (recorded fence, `icon-chip.css:11-20` + CLAUDE.md AW.W26). So the DESIGN.md six-layer glass composite is **N/A by design** for the chip itself — the "glass over aurora" mandate is satisfied by the PAGE staging the chips over a live field (`ShowcaseFrame tier="field"`), never by making the chip glass (which the one-color-event rule forbids — no glass refraction UNDER the pop).

---

## What is RIGHT — do not regress (unanimous)

- **The IconChip "Pops" row is the corpus reference for the one-color-event idiom** — 13 chips 1:1 onto `--section-color-0..12`, `color-mix(… 25%, transparent)` backplate (measured `srgb 0.766 0.175 0.431 / 0.4`) under a full-chroma glyph (`oklch(0.552 0.192 359.8)`), `48×48`, `saturated bloom` engaged. Reads as bespoke glass-ui, not a Figma token-export. Do NOT flatten it.
- **The hero entrance is genuinely alive and on-clock** — `icon-chip-reveal` at 0.34s = `--spring-snappy-duration` (the ~7% confident-tap overshoot), staggered by `:reveal`, PRM-gated through `vReveal`, no demo-local `@keyframes`. The reference for how a pop arrives (W-MOTION-CANON P1/P3/P4/P5/P6). **No P0 bug here** (the colors-page frozen-rainbow defect does NOT recur — the icons entrance resolves terminal).
- **The monochrome discipline is on-doctrine** — the Lucide reference glyphs stay `--foreground` ink (no color event). Do NOT "fix" the reference grid by tinting it; the ONE color event is the Pops row.
- **The √φ ladder + section-heading rung are honest** — 86.1px `text-display` `<h1>`; all four `<h2>` resolve 20.35px / 600 `text-subheading` (AZ.W-HIERARCHY). No hand-rolled `text-sm font-semibold` stragglers.
- **IconChip's four-state contract is correctly N/A** — a decorative `<span>` mark, not an affordance atom; "missing active/disabled" is NOT a finding (it would be overfit substrate).

---

## RANKED changes (impact-ordered; reconciled across all 3 reports)

### R1 [P1 · HEADLINE] Glass demos over NOTHING — no aurora field, §L1 lensing inert
Unanimous #1. `canvas.length === 0`; background is `CATEGORY_DEFAULT_BG.foundations = "paper"` — a flat warm-paper wash. The body's real `glass-resting` plate (`blur(10px) saturate(1.05)`) **lenses nothing**; in dark mode it reads as the "charcoal slab on a dead void" W-DARK-MATERIAL was built to kill (`_cap-icons-dark.png`). The deepest irony: the page whose hero is literally a walk across the colorful section ramp has the LEAST color behind its glass. The `tier="field"` Pops frame already drops its opaque plate — it just has nothing behind it to refract.
**Resolution:** declare a colorful `<Aurora>` page background, **seeded from the `--section-color` ramp the Pops row walks** (thematically exact), ONE GL context per route, offscreen-paused. The single body plate AND every sub-section card (R2) then lens a real chromatic field — §L1 demonstrated, dark mode stops being a dead slab. The M8 GL-on-static-wash detector follows (flip the manifest `background` row off "paper").

### R2 [P1 · STRUCTURE] Each sub-section is NOT its own glassy card; main area too narrow
Unanimous, user-named verbatim. The four sub-sections (`Pops`, `Lucide reference`, `Sizing`, `Stroke width`) are bare `flex flex-col` gap-stacks inside ONE outer plate (`glassCards:1`); **two of them (Sizing/Stroke) have NO frame at all** (`icons.vue:170-203` naked, `_cap-icons-lower.png`). The article is bounded to the narrow `--story-page-max-inline` with dead paper gutters — the exact wasted space the user flags.
**Resolution:** promote each `StorySection` to its OWN glass specimen card lensing the R1 aurora, with the **Pops + Lucide-reference cards as the dominant bento spans** and Sizing/Stroke as supporting cards. **Critical constraint (design §2, glass-cannot-sample-glass §L1):** the inner cards and outer plate must share ONE composition container — inner specimens are `glass-quiet`/`veil` rungs composed inside a single outer filter context, OR the outer drops its own `backdrop-filter` and the children carry the tiers; NOT two stacked `backdrop-filter` plates. Widen `--story-page-max-inline` for this route; apply the BB.W-CARD-PAD √φ block-over-inline padding ladder to the inner cards (kills the ragged `gap-3`/`gap-8` tail rhythm).

### R3 [P1 · COMPONENTS] The page leverages almost no components — `<IconChip>` is the lone primitive
Unanimous. Body census: `dock:0 tabs:0 button:0 colorSwatch:0` (the `dock:2` is AppShell nav chrome). The Sizing/Stroke sections demo RAW lucide `<component :is>`, not even IconChip — **2 of 4 sections of the `icon-chip` page never touch IconChip.** The icon system has axes that BEG for interactive components.
**Resolution, in impact order:**
- (a) **Make Sizing + Stroke interactive** — a `<SegmentedTabs>` switching a single live preview glyph between `sm/md/lg` and `1/1.5/2px`, the glyph springing between sizes/strokes on `--spring-snappy` (it grows/thickens kinetically as you switch). Demonstrates the axis instead of listing three frozen specimens — the tabs mandate + real utility.
- (b) **A `<DockStack mode="facets">` family switcher** (Pops / Reference / Sizing / Stroke) with per-facet `--glass-accent` context hues (BE.W-DOCK-RAIL-REALIZE + BB.W-GLASS-ACCENT) — contextually switching which specimen card is in focus. The dock contextual-switching/animating headline made literal on the icon page + navigable.
- (c) **Re-render the Lucide reference grid as `<IconChip bare>` cells** (the `:bare` no-plate register) over the aurora — drop the opaque `bg-card/40` (which would OCCLUDE the R1 aurora, the BG-2 black-plate anti-pattern); each glyph inherits the hover-bloom + (R4) press for free, instead of a dead `<component :is>` in a `transition: transform` frame. The largest surface becomes a wall of living glass icon tiles, not a generic token-export.
- (d) Add `tone`, `bare`, `duotone` rows so the FULL IconChip API reads (the demo currently exercises only `icon/section/saturated/bloom/reveal`; `tone`/`bare`/`duotone`/`glyphSize` are never shown — `duotone` despite the SFC comment CLAIMING the page demos it).

### R4 [P1 · ANIMATION] Affordance collapses below the fold — alive at the top, inert everywhere else
Pops chips alive; Lucide frames half-dead (1px hover translate, **no `:active scale-press`** — they advertise an interaction they don't deliver, §L3); Sizing/Stroke **fully dead** (bare glyphs, no hover/press/entrance). On a page whose subject IS icons, the size/stroke axes are the least-alive thing in the system.
**Resolution (mostly free once R3 lands):** R3(c) routing the grid through `<IconChip bare>` delivers hover-bloom for free; add `:active scale(--scale-press)` (§L3) to any liftable frame (or route hover through `.glass-press`); R3(a)'s tabs-driven preview glyph springs between axes. **Component-side micro (A1, AUGMENT):** a bare `<IconChip>` (no `:bloom`) is COMPLETELY static on hover — a calm DEFAULT hover floor (sub-perceptual plate-lift/stroke-firm) should be the tier-root floor, with `:bloom` the louder opt-in, to meet the "HIGH animation for EVERY component" bar.

### R5 [P2 · LANGUAGE] Tighten visible copy (user-named)
The Pops `<p>` is a 4-line paragraph of internal proportion-doctrine in visible UI copy ("a surface gets ONE color event … a chip never exceeds icon scale, and body ink is never tinted"). That is a code comment, not visible copy.
**Resolution:** cut to one code-voiced line — `The color event — <IconChip :section> walks --section-color-0..12.` Demote the proportion rationale to the SFC comment (where it already lives). Fix the `manifest.ts:507` blurb "Lucide, 2px stroke, semantic sizes." to describe the chip color-event (the named import), not the lucide-stroke tour.

### R6 [P2 · IDENTITY] Standardize the path label — icons is the DRIFT, not colors
**Conflict resolved.** The design report wants route-form `/foundations/icons`; the demo report flags the rendered `@mkbabb/glass-ui/icon-chip` as PASS-but-inconsistent; the component report flags the SFC's deep relative import `../../../src/components/custom/icon-chip`. The peer `foundations-colors-SYNTHESIS` established the **binding convention: a demo-only foundations page documenting a SYSTEM (not one exported component) labels with the route-form** (`/foundations/colors`). The icons page documents the icon SYSTEM (lucide set + sizing + stroke + the chip) — `icon-chip` is one part — so it must standardize to **`/foundations/icons`** to match colors. The current `@mkbabb/glass-ui/icon-chip` subpath label is the drift the user named ("standardize the import-path label"). **Verdict: change the manifest subpath row off the component subpath onto the route-form.** (One rule across the foundations band; colors is already correct, icons is the outlier.)

### R7 [P3 · COMPONENT micro-tidies] Two src tidies on `<IconChip>` (architectural-transposition-for-elegance, zero behavior change)
- **I1 (PRUNE):** `revealArg = computed(() => undefined)` (`IconChip.vue:68`) is a dead always-`undefined` computed; inline `v-reveal="revealStep"` and drop it.
- **A2 (MODIFY):** `--icon-chip-bloom-scale` is read in CSS but never declared in `:root` (relies on inline fallback `1.06`); declare it in `:root` for token-first discoverability.

---

## Tranche actions (the binding dispositions)

| # | Change | Action | Wave |
|---|--------|--------|------|
| R1 | Aurora page background, ramp-seeded, one-GL/route | **AUGMENT** | `BD.W-TOKEN-TOUR-GLASS` Arm B — extend to `foundations/icons`; flip the manifest `background` row off "paper"; M8 detector follows (same disposition the colors-SYNTHESIS used) |
| R2 | Per-section glass cards + bento + wider main + √φ pad, ONE composition container | **AUGMENT** | `BD.W-TOKEN-TOUR-GLASS` — each `StorySection` → own glass card (glass-cannot-sample-glass), Pops+Reference dominant spans, `--story-page-max-inline` widen, BB.W-CARD-PAD |
| R3 | `<SegmentedTabs>` axis-switch + `<DockStack facets>` + `<IconChip bare>` grid + `tone`/`bare`/`duotone` rows | **NEW** (Band 16) | `BD.W-ICON-PAGE-COMPOSE` — mirrors the colors-page `BD.W-COLOR-PAGE-COMPOSE` net-new precedent; the dock/tabs/component composition is too large + too page-specific for the wrapper-fold charter. Real gate: ≥1 `<SegmentedTabs>`+`<DockStack mode="facets">`+`<IconChip bare>` present, Sizing/Stroke axis-interactive (live preview springs), per-facet `--glass-accent` from ramp, the FULL IconChip API (`tone`/`bare`/`duotone`) demoed, the stale "demonstrates duotone" SFC comment reconciled. Demo-private, zero src paint. |
| R4 | Below-fold press/hover affordance (page) + default calm hover floor (component) | **FOLD** + **AUGMENT** | page-side FOLD into R3 (`<IconChip bare>` press + tabs preview); component-side **A1 AUGMENT** into `BD.W-BC-COMPONENT-CANON`'s IconChip note (the default calm hover floor — a tiny tier-root register + the "IconChip is brand-overlay not glass" fence) |
| R5 | Tighten Pops copy + fix manifest blurb to chip color-event | **FOLD** | into R3 (the SFC is rewritten there); manifest blurb edit rides the R6 manifest touch |
| R6 | Path label → route-form `/foundations/icons` (icons is the drift) | **MODIFY** | `BD.W-PAGE-HEADER-FOLD`-adjacent manifest sweep — change the `manifest.ts:213` subpath row off `@mkbabb/glass-ui/icon-chip` onto the route-form (one convention across the foundations band; colors already correct) |
| R7 | `revealArg` dead computed (PRUNE) + `--icon-chip-bloom-scale` `:root` (MODIFY) | **PRUNE** / **MODIFY** | `BD.W-BC-COMPONENT-CANON`-adjacent IconChip src tidy (component-level, tiny — rides the A1 component touch in R4) |
| — | six-layer glass composite on the chip | **PRUNE** | no action — N/A by recorded design fence (brand-overlay `in srgb` chip, NOT a glass tier; one-color-event rule forbids glass under the pop). Record the fence in the A1 IconChip canon note, NOT as a defect. |
| — | IconChip four-state contract | **PRUNE** | no action — correctly N/A (non-interactive `<span>` mark) |

**Why R3 is NET-NEW, not an AUGMENT (mirrors the colors-page rationale):** `BD.W-TOKEN-TOUR-GLASS`'s explicit core fence is "specimen-swatch vs container-wrapper" + zero src paint; threading `<SegmentedTabs>`/`<DockStack>`/`<IconChip bare>` + the live axis-morph is a full component-composition rewrite of one demo SFC with its own ≥3-component gate — beyond the wrapper-fold charter. It is demo-private (zero src paint), so it sits cleanly as a Band-16 page-compose wave BESIDE `BD.W-COLOR-PAGE-COMPOSE`. R1/R2 stay on the token-tour wave because they are the glass-card/aurora work that wave already owns the gate for.

**Why R6 standardizes to route-form (not the subpath):** the colors-SYNTHESIS bound the convention — a foundations page documenting a SYSTEM uses route-form. Icons is the outlier; standardizing means changing icons, not colors. This is the opposite disposition from a component-PAGE (where the focal subpath IS the label), and the foundations band must be uniform.

---

## Convergence call

**~30% converged — needs SEVERAL more loops.** The three reports agree on a deep structural verdict identical to the colors page: one world-class hero row over an accurate-but-generic spec-sheet, failing FOUR mandate axes simultaneously (aurora · per-section cards · component composition · below-fold animation). Unlike colors, there is **no P0 render bug** to kill first — but R1–R3 are architectural transpositions (the page must be rebuilt to demonstrate the icon system it documents, not list it), so the loop count is the same. The component is sound; the work is demo-layout (R1/R2/R3 in two waves) + two micro-tidies (R7). Estimate **2–3 loops** to convergence: (1) R1/R2 glass-over-aurora + R3 composition (tabs/dock/bare-grid) + R6 label + R7 tidies; (2) live-π re-audit — the aurora-lens read, the dock facets contextual-switch, the `<IconChip bare>` hover/press in BOTH modes (the gestalt re-earn); (3) bento-rhythm + dark-mode tune + gestalt verify.
