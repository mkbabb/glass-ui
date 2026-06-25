# Pass-E deep audit — foundations/paper-glass

**Page:** `demo/stories/foundations/paper-glass.vue` (manifest `foundations/paper-glass` → `/foundations/paper-glass`, `hero: true`, `heroScale: "hero"`, `background: "paper"`).

**The "component" under test is NOT a Vue SFC — it is the CSS glass-tier system + paper-grain utility.** The page tours the five-rung `.glass-{wash,quiet,resting,floating,overlay}` ladder + `paper-grain-overlay` over a colour field. Real source read in full:
- `src/styles/glass/ladder.css` — the five-rung surface ladder (opacity/blur/border/under-shadow/grain `::after` + the W55 adaptive-legibility bucket + the continuous observer-driven tint clamp).
- `src/styles/glass/material.css` — the unified `.glass-material` six-layer composite: the moving-specular `::before` catch-light + the angle-keyed edge glint + the per-instance `--glass-accent` chromatic rim/core + `plus-lighter` HDR-clamped blend + the four-state interaction-light lockstep.
- `src/styles/glass/deep.css` + `tokens/glass-deep.css` — the opt-in `.glass-deep` maximal-iOS-27 tier (16px / saturate 1.5, `--glass-depth` lerp).
- `src/styles/glass/reveal.css` — the `.glass-reveal` liquid-enter recipe (spring-clocked coupled channels).
- `src/styles/paper.css` — the `paper-grain-overlay` `@utility` (`::after` SVG-turbulence grain).
- `demo/stories/{StoryPage,StoryHeader}.vue` — the chassis (entrance `.scroll-build`/`.scroll-cascade`, the `subpath` import-path chip).

---

## (1) ANIMATION affordance

**The COMPONENT (the glass system) is EXCELLENT — high affordance, idiomatic.** The four-state contract is fully present in `material.css`: rest (`--glass-specular-intensity-rest: 0` → a clean unwired plate attaches ZERO interpolation tracks), hover (`:hover::before` lifts `--specular-intensity` to `-hover` 0.1), active (`:active::before` → `-active` 0.16), selected (`[aria-pressed]`/`[aria-current]` holds the gleam lit). The position-track interpolates `--specular-x/y` on `--ease-standard` per the §6 register (motion-canon P1 position-tracked → bezier). The `.glass-reveal` enter is the spring-clocked SPATIAL(scale)/EFFECTS(opacity+blur) split (P1/P2/P3). PRM-carved everywhere (grain transition → `none`, reveal → fade-keeps/transform-drops). **No dead/janky animation IN the component.**

**The PAGE under-uses the affordance (the real finding):**
- **F1 — the tier tiles have NO entrance choreography.** The first grid (lines 115-138) is a bare `<div>` OUTSIDE any `.scroll-cascade` register — it does not ride the StoryPage `.scroll-build`/`.scroll-cascade` stagger. The tiles pop in flat. The glass-tour subsections should each build in on `view()` (the cascade the chassis already ships).
- **F2 — the tiles never demonstrate the catch-light/press.** They are static plates; a tour of the glass MATERIAL renders zero hover-gleam interaction, so the page shows the ladder's OPACITY axis but not its six-layer LIT behaviour (which is the marquee).

## (2) PROCEDURAL VIZ

**N/A — no procedural viz on this page (the manifest `background: "paper"` is the static paper-grain wash, GL-FREE by design).** The one-GL-per-route budget is correctly respected; the page must NOT stage an `<Aurora>` (M8 detector reds GL on a static-wash route). The user's "glass demos over COLORFUL aurora backgrounds" ask is satisfied IN-BUDGET by the in-region colour FIELD already present (lines 149-161: the `--viz-fourier`/`--viz-chebyshev` gradient + tint-grid), NOT a second GL context.

## (3) PERFORMANCE

**Component is compositor-clean.** All six layers paint on compositor-safe channels (background/opacity/filter/box-shadow + `--*` customs) — zero layout property animates (`proof:no-layout-animation` GREEN by construction). The grain engage is opacity-only on a ~120ms clock (the always-present `background-image` longhand kills the decode-and-pop). **One real structural finding:**
- **F3 — `paper-grain-overlay` + `.glass-*` is a `::after` PSEUDO COLLISION.** Every page tile composes `glass-wash paper-grain-overlay` (line 33 + 123). BOTH `ladder.css` (`.glass-wash::after` grain, `mix-blend-mode: overlay`) AND `paper.css` (`paper-grain-overlay::after`, same blend) claim the SAME `::after` on the SAME element. They do not stack — one wins (the `@utility` rule, by source-order/specificity), the other's grain layer is silently clobbered. The page double-declares grain it can only paint once. Idiomatically the glass rung ALREADY carries grain (`ladder.css §grain`), so `paper-grain-overlay` on a `.glass-*` tile is redundant-and-conflicting.

## (4) SAFARI compatibility

**Component is Safari-safe by construction.** `ladder.css §O-2a` documents the build-time `-webkit-backdrop-filter:` prefix pass (`vite.style-assets.ts`) injected into shipped `dist/` so Safari ≤17 paints the blur instead of dropping the unprefixed rule (`proof:webkit-backdrop`). `material.css` uses `plus-lighter` (Safari 16.4+) with a documented graceful low-alpha-overlay degrade (no `screen` fallback). `mask-image` is Baseline-2023; a gap engine keeps the in-paint falloff. **No Safari finding.**

## (5) IDIOMATIC / no-legacy

**Component is exemplary** (token-substitution model `.glass-opaque`/`.glass-deep`, ONE specular source, the `--glass-edge-light` WHOLE-LAYER vs COLOR fence recorded, the adaptive-tint single oklab seam). **Page-level non-idiomatic patterns:**
- **F4 — the import-path label is ABSENT (user's "standardize the import-path label" ask).** The StoryHeader `subpath` chip is `v-if="subpath"` and the paper-glass manifest row (manifest.ts:500-509) omits `subpath` — so the page renders NO `@mkbabb/glass-ui/<…>` chip while peer pages do. The glass ladder ships via the CSS bundle, so the canonical label is `@mkbabb/glass-ui/styles`.
- **F5 — superfluous language (user's "tighten" ask).** Three verbose inline comment blocks (lines 7-9, 19-21) editorialize ("read translucent over the warm-cream grain the page is about", "rather than five identical white rectangles"); the `role` descriptor strings ("the field reads almost clean through it") are prose, not the tight token-tour register. Tighten to the spec voice.
- **F6 — the page demos the OPACITY ladder ONLY, not the BC liquid-glass band.** `grep glass-deep|glass-lens|--glass-refract|--glass-accent` over `foundations/*.vue` = ZERO. The foundations glass home shows neither the deep tier, the `.glass-lens` squircle refraction, nor the `--glass-accent` chromatic rim — the newest shipped registers are undemoed on their natural home page.

## (6) The glass six-layer composite

**PRESENT and complete in the component** (DESIGN.md binding): (1) backdrop blur+saturate (`--glass-blur-*` carrying the saturate companion), (2) surface tint (`color-mix(in oklab, <rung>, --glass-tint-source)` adaptive), (3) edge rim (`--glass-material-rim` / `--glass-border-accent`), (4) inner catch-light (`::before` moving specular + edge glint), (5) drop shadow (`--glass-under-shadow-*` + `--glass-shadow-*`), (6) grain (`::after` SVG turbulence). **The PAGE renders 5 of 6 statically** — the inner catch-light (layer 4) only fires on interaction the static tiles never receive (ties to F2).

---

## Findings → BD tranche mapping

| # | Finding | Disposition | Wave |
|---|---------|-------------|------|
| F6 | BC glass-band (deep/lens/accent) undemoed on foundations | **AUGMENT** | `BD.W-TOKEN-TOUR-GLASS` Arm B — already MANDATES adding the deep-glass/`.glass-lens`/`--glass-accent` specimen to `paper-glass.vue` via `ShowcaseFrame tier="field"`, GL-free (M12-3). This is the wave's exact target. |
| F1/F2 | tiles lack entrance + interaction affordance; main card area should be bigger; each subsection its own glassy card | **AUGMENT** | `BD.W-TOKEN-TOUR-GLASS` Arm B (the new glass-band section) + fold the existing tier grid into per-subsection `<ShowcaseFrame>`/glassy cards riding `.scroll-cascade`. The user's "each sub-section its own glassy card · main card bigger" maps here. |
| F4 | import-path label absent | **MODIFY** | `BD.W-PAGE-HEADER-FOLD` (the page-identity header/chip fold) — add `subpath: "@mkbabb/glass-ui/styles"` to the manifest row so the StoryHeader chip renders, standardizing with peer pages. |
| F5 | superfluous prose comments + role strings | **MODIFY** | `BD.W-PAGE-OFFTOKEN-SWEEP` band-4 first-half cleanup (or fold into TOKEN-TOUR-GLASS Arm B's page rewrite) — tighten the comment/role copy to the spec voice. |
| F3 | `paper-grain-overlay` × `.glass-*` `::after` collision (redundant grain) | **PRUNE** | NEW micro-finding for `BD.W-TOKEN-TOUR-GLASS` Arm B — drop `paper-grain-overlay` from the `.glass-*` tiles (the rung's own grain already paints; the utility is for FLAT surfaces only, per its standalone tile at line 205). Keep `paper-grain-overlay` only on the non-glass `bg-card` standalone tile. |

**No `src/` paint owed** — every finding is demo-page-level; the glass-tier COMPONENT is architecturally sound, idiomatic, Safari-safe, compositor-clean, and carries the full six-layer composite + four-state spring-physics affordance.
