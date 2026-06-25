# foundations/colors — Pass-E SYNTHESIS (binding per-page verdict)

**Route:** `/foundations/colors` · **SFC:** `demo/stories/foundations/colors.vue` · synthesized from the demo / design / component reports in this dir.

The three auditors agree almost perfectly — this is a **competent monochrome-disciplined spec-sheet** that fails the BD mandate on four axes (no aurora field · no per-section glass cards · zero library components · near-zero animation affordance), plus one **P0 render bug** (the focal rainbow is frozen half-faded). The conflicts are minor and resolved below. The work is overwhelmingly a single existing wave (`BD.W-TOKEN-TOUR-GLASS`) with one fold-enrollment (`BD.W-PAGE-HEADER-FOLD`) and ONE net-new gate.

---

## What is RIGHT — do not regress (unanimous)

- **Monochrome discipline is on-doctrine** — the core-role grid stays documentary-flat, the rainbow leads as the focal moment (W-DEMO-DESIGN, one-color-event proportion). Do NOT tint the role grid.
- **The viz-basis display-glyph tiles** (`ℱ/T/P/A/G` at `text-display-2` ≈53px, italic `WONK 1/SOFT 0`, hue-inked, 3px accent bar) are the page's one genuinely bespoke move — the bar the rest of the page must rise to.
- **The path label `/foundations/colors` is the correct convention** — a demo-only foundations page with no single exported component. All three reports flag it PASS. **Do NOT "fix" it to a `@mkbabb/...` subpath.** (Standardization here = it already matches its kind.)
- **The √φ ladder + dark register are honest** — 109.7px `text-display-4` `<h1>`, swatches dim correctly, `--primary` resolves legendre-violet, dividers survive as hairlines. No gray collapse.

---

## RANKED changes (impact-ordered; reconciled across all 3 reports)

### R1 [P0 · BUG] The focal rainbow never settles — frozen `opacity 0.40` + ±11.9px zig-zag
The 13-stop ramp is the page's hero asset and renders **permanently half-faded and mis-aligned** at rest. TWO compounding root causes, both confirmed:
- **(demo §7)** `.scroll-cascade--columns` is keyed to `animation-timeline: view(block)`; the rainbow is the FIRST body element, already fully in-view on a fresh top-scrolled page, so the `entry` progress sits stuck ≈40% and never reaches the terminal frame. An above-the-fold focal element must NOT ride a scroll-entry timeline.
- **(component F1)** the column-stagger is a `* 0` dead no-op (`scroll-choreography.css:190-197`) — the per-child `--col` index the page sets (`colors.vue:70`) is **declared but never read**, so the Codrops column cadence the comment promises does not exist.
**Resolution:** move the focal ramp off the scroll-entry `.scroll-cascade--columns` register onto the **mount-keyed `.scroll-build`** register (fires on route-mount, `scroll-choreography.css:52`) so it resolves terminal regardless of scroll position; AND repair the `* 0` so `--col` is load-bearing (drive `animation-delay` off `--col * --scroll-cascade-column-stagger`) — the ramp then assembles stop-by-stop as a chromatic wave (this also satisfies R5's "ramp as hero entrance"). This is a `src/styles/` touch — it lifts the wave off its strict zero-src-paint posture for this one register repair (call it out explicitly in the wave).

### R2 [P1 · HEADLINE] Glass demos over NOTHING — no aurora field, §L1 lensing inert
Unanimous #1 design gap. `canvas.length === 0`; background is `CATEGORY_DEFAULT_BG.foundations = "paper"` — a flat warm-paper wash. The body's real `glass-resting` plate (`blur(10px) saturate(1.05)`) **lenses nothing**, and in dark mode reads as the "charcoal slab on a dead void" W-DARK-MATERIAL was built to kill. A COLORS page is the single best aurora candidate — the field can seed from the `--section-color` ramp the page documents.
**Resolution:** declare a colorful `<Aurora>` page (or contained) background, ONE GL context per route, offscreen-paused. Respect the **M8 GL-on-static-wash detector** in the gate (the route's background row flips off "paper").

### R3 [P1 · STRUCTURE] Each sub-section is NOT its own glassy card; main area too narrow
Unanimous, user-named verbatim. The three sub-sections (`Section ramp`, `Viz basis`, `Core roles`) are bare transparent `<section>`s separated by hairlines inside ONE outer plate. `--story-page-max-inline` resolves 1152px on a 1440px viewport → ~288px dead margin.
**Resolution:** promote each `StorySection` to its OWN glass specimen card lensing the R2 aurora, with the **section-ramp card as the dominant bento span** (it is the focal artifact). **Critical constraint (design §2):** glass-cannot-sample-glass — the inner cards and outer plate must share ONE composition container (inner specimens are `glass-quiet`/`veil` rungs composed inside a single outer container, OR the outer drops its own filter and children carry it; NOT two stacked `backdrop-filter` plates). Widen `--story-page-max-inline` for this token-tour route so the ramp breathes. Apply the BB.W-CARD-PAD √φ ladder to the inner cards.

### R4 [P1 · COMPONENTS] Zero glass-ui components — the page omits its OWN `<ColorSwatch>`
Unanimous, the deepest irony: the color-foundations page hand-rolls dead `<div :style>` rectangles (`cursor:auto`, no interaction) while the system ships `<ColorSwatch>` (the proportioned chip + hex affordance built precisely to replace raw color slabs). `dock:0 tabs:0 button:0 color-swatch:0`. The `colors.vue:6` comment CLAIMS IconChip `:reveal` glyphs but the SFC uses bare `<div>` letters — the comment is **stale/false**.
**Resolution, in impact order:**
- (a) render every rainbow stop + role token as a real **`<ColorSwatch>`** (click-to-copy, hover-lit, four-state + `--scale-press` for free);
- (b) a **`<DockStack mode="facets">`** family switcher (Section ramp / Viz basis / Core roles / Surface tints) with per-facet `--glass-accent` context hues from the ramp (BE.W-DOCK-RAIL-REALIZE + BB.W-GLASS-ACCENT) — this single move satisfies the **dock contextual-switching/animating headline** AND makes the index navigable;
- (c) `<SegmentedTabs variant="pill">` to switch the ramp's read (hue / OKLCH / contrast-vs-paper) — the tabs mandate + genuine utility;
- (d) compose **`<IconChip>`** for the viz glyphs (make the stale comment TRUE).
**Conflict resolved:** design report wants `<ColorSwatch>` for swatches; component F6 floats `<SelectableChip>` for the viz glyphs. Verdict: `<ColorSwatch>` for the color stops/roles (it IS a color primitive), `<IconChip>` for the viz-basis glyphs (they are glyph+accent, not color inputs) — both reports' first choices, no real conflict.

### R5 [P1 · ANIMATION] Near-zero affordance — inert against the iOS-27 bar
Swatches are dead (`cursor:auto`, `transition:all` catch-all smell); viz glyphs `animationName:none`; core-role frames advertise liftability (1px hover translate) but deliver no `:active` `--scale-press` squish. The `.scroll-cascade` is the page's ONLY motion and it animates bare sections.
**Resolution:** R4(a) routing swatches through `<ColorSwatch>` delivers four-state + press for free; give the viz glyphs a spring-clocked draw/scale entrance (`--spring-snappy`, `--ease-out` no-overshoot for type, coupled opacity per P3); add `:active scale(--scale-press)` to liftable frames (or route the hover through `.glass-press` — component F4); the R1 stagger makes the ramp assemble as a chromatic wave. **Mostly free once R1+R4 land.**

### R6 [P2 · IDENTITY] colors is OUTSIDE the 36-file page-header fold
(component F3) The literal HOME of the section ramp carries the WEAKEST page-identity affordance — no accent-rail + `<IconChip :section>` cluster the 36 forms/data/etc pages get.
**Resolution:** enroll `foundations/colors` into the `StoryPageHeader` fold so it leads with the folded `:icon`/`:section`/`:eyebrow`/`:blurb` cluster (`:section=6` tomato or its own stop).

### R7 [P2 · LANGUAGE] Tighten visible copy (user-named)
The section-ramp `<p>` leaks internal rationale: "The brand's vibrant register; the role tokens below stay documentary-monochrome." Cut to one code-voiced line: `The chapter palette — --section-color-0..12, as bg-section-N.` The page eyebrow + StorySection eyebrow `Foundations · Color` duplicate the page title eyebrow — drop the first StorySection eyebrow. The stale IconChip claim at `colors.vue:6` reconciles once R4(d) lands (make it true) — do not leave it false.

---

## Tranche actions (the binding dispositions)

| # | Change | Action | Wave |
|---|--------|--------|------|
| R1 | Rainbow frozen: move focal ramp to `.scroll-build` + repair `* 0` stagger (`--col` load-bearing) | **MODIFY** | `BD.W-TOKEN-TOUR-GLASS` — add a P0 sub-clause; lift the strict-zero-src-paint posture for this ONE `scroll-choreography.css` register repair; gate bite: stagger token non-zero-multiplied + `--col` read |
| R2 | Aurora page background, ramp-seeded, one-GL/route | **AUGMENT** | `BD.W-TOKEN-TOUR-GLASS` Arm B — extend to `colors` (Arm B currently books `paper-glass.vue`); flip the manifest `background` row off "paper"; M8 detector follows |
| R3 | Per-section glass cards + bento + wider main + √φ pad | **AUGMENT** | `BD.W-TOKEN-TOUR-GLASS` — each `StorySection` → own glass card, ONE composition container (glass-cannot-sample-glass), section-ramp dominant span, `--story-page-max-inline` widen, BB.W-CARD-PAD |
| R4 | `<ColorSwatch>` + `<DockStack facets>` + `<SegmentedTabs>` + `<IconChip>` | **NEW** (Band 16) | `BD.W-COLOR-PAGE-COMPOSE` — the dock/tabs/component composition is too large + too page-specific to ride the generic token-tour wrapper fold; real gate: ≥1 `<ColorSwatch>`+`<DockStack mode="facets">`+`<SegmentedTabs>`+`<IconChip>` present, swatches interactive (four-state), per-facet `--glass-accent` from ramp, the stale `:6` comment reconciled |
| R5 | Entrance + press affordance | **FOLD** | into R4 (`<ColorSwatch>` press) + R1 (ramp stagger) + R4(d) (glyph entrance) — no standalone work |
| R6 | Enroll colors in page-identity header fold | **MODIFY** | `BD.W-PAGE-HEADER-FOLD` — add `foundations/colors` to the enrolled set (`:section=6`) |
| R7 | Tighten copy + reconcile stale comment | **FOLD** | into R4 (the SFC is rewritten there) |
| — | Path label `/foundations/colors` | **PRUNE** | no action — correct by convention; do NOT touch (all 3 reports PASS) |
| — | Safari/GL gating | **PRUNE** | no new wave — covered by `BD.W-DEEP-GLASS-20PX` / `BD.W-GLASS-LENS-CHROMA` fences IF R2/R3 adopt the lens |

**Why R4 is NET-NEW, not an AUGMENT:** `BD.W-TOKEN-TOUR-GLASS`'s explicit core fence is "specimen-swatch vs container-wrapper" + zero src paint; threading `<ColorSwatch>`/`<DockStack>`/`<SegmentedTabs>` is a full component-composition rewrite of one demo SFC with its own ≥4-component gate — beyond the wrapper-fold charter. It is demo-private (zero src paint) so it sits cleanly as a Band-16 page-compose wave. R1/R2/R3 stay on the token-tour wave because they are the glass-card/aurora/cascade work that wave already owns the gate for.

---

## Convergence call

**~35% converged — needs SEVERAL more loops.** The three reports agree on a deep structural verdict: this is a flat spec-sheet, not a bespoke glass-ui artifact, and it fails FOUR mandate axes simultaneously (aurora · per-section cards · component composition · animation) plus carries a P0 focal bug. None of these are polish — R1 is a render bug, R2–R4 are architectural transpositions (the page must be rebuilt to demonstrate the color system it documents). After R1–R7 land it will need a re-audit loop to verify the aurora-lens reads + the dock contextual-switch + the `<ColorSwatch>` four-state in BOTH modes (the live-π / gestalt re-earn). Estimate **2–3 loops** to convergence: (1) R1 bug-kill + R2/R3 glass-over-aurora + R4 composition; (2) live-π re-audit + bento-rhythm + dark-mode tune; (3) gestalt verify.
