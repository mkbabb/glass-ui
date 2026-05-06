# J — Post-close audit β: substrate-without-consumer + visual-load-bearing-ness

**Authored**: 2026-05-06.
**HEAD**: `76525e1` (W6 close).
**Mode**: READ-ONLY (write only on this audit doc).
**Lane**: β — re-runs the canonical overfitting audit *plus* the new W0-binding visual-load-bearing-ness probe (J.invariant 10; `docs/precepts/instructions/tranche/SPEC.md ## Close`).

## Method

1. Walked every J-shipped public surface (W3.B / W4.A / W5.A / W5.C / W6.A / W6.B / W6.C.1 / W6.C.2) and J-shipped token / utility (W1) with `rg` consumer counts across `src/ demo/`. Each row cites its rg invocation.
2. Ran a runtime visual probe via Playwright MCP against `http://localhost:5173` (dev server brought up in-session) at 1280×800. For each artefact, captured computed styles + screenshots. Where runtime probe failed (silent route mount errors) I document the fallback.
3. Classified each row VISIBLE / INVISIBLE-AT-REST / REGRESSION / NOT-PROBED.
4. Cited every claim — no paraphrased grep counts.

J's β bar is binding from W0: a sub-bar artefact passing the ≥ 2 quantitative bar but failing visual fidelity (invisible at rest, illegible at default tone, runtime mount failure) is a **P0 absorb candidate**, not a deferral.

---

## Quantitative pass — public-surface components

`rg` invocations are recorded next to each count. "consumers" = distinct files importing or using the artefact in `src/` + `demo/`. Self-referential index.ts barrels are excluded.

| # | Artefact | Wave | Consumer-count rg | Distinct consumer files | Verdict |
|---|---|---|---|---|---|
| 1 | `<Configurator>` + `<ConfiguratorLayer>` + `<ConfiguratorRow>` + `useConfiguratorState` | W4.A | `rg "<Configurator(\b\|Layer\|Row)\\b\|useConfiguratorState\\b" --type vue --type ts src/ demo/` | 2 (`demo/stories/aurora.vue`, `demo/stories/motion/metaballs.vue`) | KEEP — at the bar |
| 2 | `<HoverPopover>` `keepDockOpen` extension prop | W3.B | `rg "<HoverPopover\\b[^>]*keep-dock-open\|keepDockOpen" --type vue --type ts src/ demo/` | 3 (`demo/stories/navigation/dock.vue` × 3 instances; `<HoverPopover>` is the substrate; `<Slider>` ships its own `keepDockOpen` prop independently — separate consumer) | KEEP |
| 3 | `<CarouselPager>` | W6.C.2 | `rg "<CarouselPager\\b" --type vue src/ demo/` | 1 (`demo/stories/navigation/carousel.vue:70`) | **SUB-BAR** — only one consumer + see π regression below |
| 4 | `<CarouselDots>` | W6.C.2 | `rg "<CarouselDots\\b" --type vue src/ demo/` | 1 (`demo/stories/navigation/carousel.vue:69, 73`) | **SUB-BAR** — single consumer file |
| 5 | `<GlassCarouselPager>` | W6.C.2 | `rg "<GlassCarouselPager\\b" --type vue src/ demo/` | 1 (`demo/stories/containers/glass-carousel.vue`) | **SUB-BAR** — single consumer |
| 6 | `sliderVariants` CVA | W5.A | `rg "sliderVariants" --type ts --type vue src/ demo/` | 1 file consumes the CVA programmatically (`src/components/ui/slider/Slider.vue`); demo consumes via `<Slider variant=…>` (1 demo file with all 5 variants: `demo/stories/primitives/slider.vue`); 1 metaballs story consumes the default. The CVA is the substrate; consumers are `<Slider>` instances (25 total per `rg "<Slider\\b" --type vue \| wc -l`) | KEEP — substrate consumed everywhere through `<Slider>` |
| 7 | `<BouncyToggle>` `overflow` prop | W4.B | `rg "BouncyTabs[^>]*overflow=\|BouncyToggle[^>]*overflow=\|:overflow=" --type vue demo/` | 1 distinct consumer file at HEAD (`demo/stories/aurora/AuroraConfigDock.vue` — uses `overflow="scroll"`); BouncyTabs default `overflow: "none"` is the canonical default everywhere else | **SUB-BAR** for the non-default `"scroll"` value |
| 8 | `useDockState.isHeld` + `dockHeld` provide | W5.C | `rg "isHeld\\b\|dockHeld" --type ts --type vue src/ demo/` | 2 (`src/components/ui/slider/Slider.vue` injects `dockHeld`; `<GlassDock>` itself binds `data-held` + exposes `isHeld`. HoverPopover's `isHeld` is a private local — different symbol) | KEEP |
| 9 | `<Slider>` `keepDockOpen` prop (default `true`) | W5.C | `rg "<Slider\\b[^>]*keep-dock-open" demo/ src/ \| `rg "<Slider\\b" --type vue \| wc -l` (25 sliders consume the default) | 25 implicit consumers (default `true`); 0 explicit overrides | KEEP — default-on substrate; the 25 sliders all exercise the `dockKeepOpen`/`dockRelease` injection contract whenever inside a dock |
| 10 | `<Badge>` size axis | W6.A | `rg "Badge[^>]*size=" --type vue src/ demo/` | 4 (`demo/stories/data/table.vue` size="md"; `demo/stories/primitives/badge.vue` × 6 size axis demos; `<MetricBadge>` is a separate component; the 26 raw `<Badge>` usages without explicit size implicitly default to `md`) | KEEP — explicit size consumers ≥ 2 |

## Quantitative pass — tokens / utilities / composables

| # | Artefact | Wave | Consumer-count rg | Distinct sites | Verdict |
|---|---|---|---|---|---|
| 11 | `--space-phi-{5,6}` | W1 | `rg "var\\(--space-phi-5\\)\|var\\(--space-phi-6\\)" --type css --type vue --type ts src/ demo/` | 0 raw `var(...)` consumers; 2 `@theme` bridges in `src/styles/theme.css` | **SUB-BAR (substrate-only)** — 0 production consumers; lives only as Tailwind `--spacing-phi-{5,6}` bridges. R5 cited 11× usage at planning time — none survives in current src/demo. |
| 12 | `--surface-tint-{4..25}` family (9 rungs) | W1 | `rg "var\\(--surface-tint-[0-9]+\\)\|surface-tint-[0-9]+" --type css --type vue --type ts src/ demo/` | 13 distinct site lines (`GlassTimeline.vue` ×4, `GlassCarouselItem.vue` ×3, `button/index.ts` ×1, `ProgressiveSidebar.vue` ×1, `BouncyToggle.vue` ×1, `slider/Slider.vue` ×3 incl. all glass-pill rungs); 9 `@theme` bridges | KEEP — fully exercised |
| 13 | `--overlay-scrim{,-strong,-subtle}` | W1 | `rg "var\\(--overlay-scrim\|bg-overlay-scrim" --type css --type vue --type ts src/ demo/` | 5 (utility consumers: ConfirmDialog, SheetContent, DialogContent, DialogScrollContent, DrawerOverlay) | KEEP |
| 14 | `--duration-sparkle` | W1 | `rg "var\\(--duration-sparkle\\)\|duration-sparkle" --type css --type vue --type ts src/ demo/` | 0 production consumers; only the `@theme` bridge in `src/styles/theme.css` and the token def in `tokens.css` | **SUB-BAR** — 0 production consumers |
| 15 | `--{success,warning,info}-foreground` | W1 | `rg "var\\(--success-foreground\\)\|var\\(--warning-foreground\\)\|var\\(--info-foreground\\)\|text-success-foreground\|text-warning-foreground\|text-info-foreground" --type css --type vue --type ts src/ demo/` | 0 production consumers; only `@theme` bridges | **SUB-BAR** — preemptive substrate, no story consumes |
| 16 | `--radius-tooltip` | W1 | `rg "var\\(--radius-tooltip\\)\|rounded-tooltip" --type css --type vue --type ts src/ demo/` | 1 (`TooltipContent.vue` uses `rounded-tooltip`) | **SUB-BAR** — single consumer |
| 17 | `--muted-{soft,medium}` | W1 | `rg "var\\(--muted-soft\\)\|var\\(--muted-medium\\)\|muted-soft\|muted-medium" --type css --type vue --type ts src/ demo/` | 4 production sites (`ProgressiveSidebar.vue` ×2 of `--muted-medium`; `BouncyToggle.vue` ×1; `CarouselDots.vue` ×2; `Slider.vue` ×1). `--muted-soft` itself: 0 production consumers. | KEEP for `medium`, **SUB-BAR for `--muted-soft`** |
| 18 | `.sheet-animate` utility | W1 | `rg "\\bsheet-animate\\b" --type css --type vue --type ts src/ demo/` excluding utilities.css def | 3 (`SheetContent.vue`, `DialogContent.vue`, `DialogScrollContent.vue`) | KEEP |
| 19 | `.overlay-scrim` utility | W1 | `rg "\\boverlay-scrim\\b" --type css --type vue --type ts src/ demo/` (excl. token defs and `@theme`) | 0 references to the `@utility overlay-scrim` block; the consumer pattern uses Tailwind v4 `bg-overlay-scrim` (the color utility derived from the `--color-overlay-scrim` `@theme` bridge), not the named `@utility` | **SUB-BAR / DUPLICATE** — the `@utility overlay-scrim` block in `utilities.css` is not consumed; the equivalent `bg-overlay-scrim` Tailwind utility (from theme bridge) is the canonical path |
| 20 | `cssVar()` composable | W1 | `rg "\\bcssVar\\(" --type ts --type vue src/ demo/` | 1 (`src/components/custom/tabs/BouncyToggle.vue` × 3 calls) | **SUB-BAR** — 1 consumer file (W2.B's "consumers in BouncyToggle (W2) consume immediately" landed but no second consumer materialised; cross-tranche debt promised in J.cross-tranche-debt §6) |

---

## Visual pass — load-bearing-ness probe

Probed at 1280×800 against the dev server. Computed-style + screenshot evidence captured per row.

| # | Artefact | Story | Probed via | Visual classification | Evidence |
|---|---|---|---|---|---|
| V1 | `<Configurator>` aurora | `/aurora` | screenshot + DOM | **VISIBLE** | screenshot `aurora-configurator.png` shows preset-row carousel, stage with WebGL canvas, BouncyTabs row ("Medium / Palette / Flow / Texture / Comp / Nuclei"), `<ConfiguratorLayer>` collapsibles, Reset action — full primitive surface exercised |
| V2 | `<Configurator>` metaballs | `/motion/metaballs` | screenshot + DOM | **VISIBLE** | `metaballs-configurator.png`: 7 layers (Falloff / Count / Radius / Color / IsoLevel / Motion / Output), 3 presets (Sunset / Cool / Mono), full configurator pattern adopted |
| V3 | sliderVariants — standard / md | `/primitives/slider` | computed styles | **VISIBLE** but track at `0.06` α over cream is faint; thumb + range carry the signal. `trackBg=color(srgb 0.955 0.953 0.945 / 0.5)`; `rangeBg=color(srgb 0.11 0.098 0.09 / 0.25)`; `thumb=rgb(28,25,23)/16px` | matrix screenshot `slider-matrix.png` |
| V4 | sliderVariants — spectrum | same | computed styles | **VISIBLE** — `trackBg=rgb(232,231,227)` (solid) at 24px height, thin bar thumb. Strong differentiation. | same |
| V5 | sliderVariants — timeline | same | computed styles | **VISIBLE** — taller pill track (24px), backdrop-filter `blur(1px) saturate(1.05)`, range at `0.08` α; carries a glass-wash signature distinct from standard | same |
| V6 | **sliderVariants — glass-pill** (R4-NEW concern) | same | computed styles + screenshot | **VISIBLE** — track at `0.06` α with **explicit border** `1px solid 0.08α`, gradient range `0.15→0.25`, white thumb with halo `0.08α / 4-16-0`. Visually distinct from standard via gradient + halo + border. **R4-NEW "invisible glass-track at rest" concern is RESOLVED at md size.** | matrix `slider-matrix.png` |
| V7 | sliderVariants — glass-cartoon | same | computed styles | **VISIBLE** — solid white track + 2px `rgb(184,182,173)` border + cartoon shadow on thumb. Strongly differentiated. | same |
| V8 | sliderVariants — sm × all 5 variants | same | computed styles + screenshot | **VISIBLE** — sm sliders (4px-track / 12px-thumb) render cleanly across all 5 variants in the matrix; differentiation preserved at small size | same |
| V9 | sliderVariants — lg × all 5 | same | computed styles + screenshot | **VISIBLE** — lg sliders (12px / 24px) render correctly | same |
| V10 | drag-keep-open visual feedback | (no exercising story at HEAD) | source + computed styles | **VISIBLE** by design — `dock.css:215 .glass-dock[data-held] { background: var(--glass-bg-floating, var(--glass-bg-resting)); border-color: var(--glass-border-floating, var(--glass-border-resting)); transition: background var(--duration-fast) ... }`; Slider scoped CSS lifts thumb halo via `[data-held]` rule (verified via stylesheet enumeration: 2 `.glass-slider[data-held]` rules + 1 `.glass-dock[data-held]` rule live at runtime) — **but no demo story exercises the held state alongside an enclosing dock to confirm the visual coupling**; the W5.C proof doc cites Playwright probes that aren't a re-runnable story | **CAVEAT** — implementation present and CSS-rule-verified, but no live story binds a Slider inside a GlassDock to demonstrate the substrate response. Rendered isolation = unverifiable visual coupling. |
| V11 | `<HoverPopover keep-dock-open>` | `/navigation/dock` | DOM probe | **VISIBLE** — 6 `.glass-dock` instances render; HoverPopover keep-dock-open consumers wired via `data-glass-dock-portal` + `data-glass-dock-owner` markers (W3.B proof). Hover interaction not exercised in static probe. | live page probe |
| V12 | `<Badge size="md">` baseline (status cell) | `/data/table` | computed-style measure | **VISIBLE** — Badge text 14px (`text-sm`), line-height 20px, padding 4px/10px; baseline matches surrounding row text 14px. Finding 15 (status badge alignment) **resolved**. | DOM probe |
| V13 | `<CarouselPager>` + `<CarouselDots>` | `/navigation/carousel` | runtime mount | **REGRESSION — P0** | Story page **fails to mount**. Console: `[ERROR] Error: useCarousel must be used within a <Carousel />` at `CarouselPager.vue:16` setup. Body text reduced to nav-only sidebar (97 chars). 0 carousel root rendered, 0 pager rendered, 0 dots rendered. The W6.C.2 close commit (`76525e1`) ships a runtime-broken surface. Logs at `.playwright-mcp/console-2026-05-06T23-09-43-204Z.log` |
| V14 | `<GlassCarouselPager>` | `/containers/glass-carousel` | runtime mount | **NOT-PROBED** — the demo route appears to silently redirect away (probe lands on Foundations Intro). Likely the manifest entry exists but the story page is similarly broken or the route is shadowed. Same proximity-of-risk as V13 | nav probe |
| V15 | FuzzySearch (158 LOC) | `/data/search` | DOM + screenshot | **VISIBLE** — `search-fuzzy.png`: search inputs render, helper buttons (`buildIndex`, `searchIndex`, `fuzzyMatch`, `Clear cache`) render, helper-call ledger renders, results panel renders. 158 LOC verified via `wc -l`. | screenshot |
| V16 | clearCache button (variant=destructive sm) | same | computed-style contrast | **VISIBLE — clears AA** — button bg `rgb(219,36,36)` × fg `rgb(251,250,249)` = **4.70:1 contrast** (clears WCAG AA 4.5:1 floor). Page-bg-vs-button = 4.70:1 (clears 3:1 UI-graphics floor for the button substrate). Finding 17 resolved. | DOM probe |
| V17 | `--surface-tint-N` consumption — 13 sites | various | screenshot per surface | **VISIBLE at all 13 sites** — slider matrix uses `--surface-tint-{6,8,10,12,15,18,22,25}` rungs explicitly; aurora preset row uses `--surface-tint-6` via GlassCarouselItem; ProgressiveSidebar border at `--surface-tint-15`. None clobbered by surrounding styles in observed renders. | computed style across stories |
| V18 | `<Slider>` integration in metaballs configurator | `/motion/metaballs` | screenshot | **VISIBLE** — 6 sliders within ConfiguratorLayer collapsibles render as expected | metaballs screenshot |

---

## Sub-bar flags (consumer count below the ≥ 2 bar)

| Artefact | Count | Bar | Disposition |
|---|---|---|---|
| `<CarouselPager>` | 1 demo file | < 2 | DEFER-TO-K — substrate awaiting second consumer (the basic-pager pattern is one of two paths; GlassCarouselPager covers the audacious path) AND **broken at runtime — see V13 P0** |
| `<CarouselDots>` | 1 demo file | < 2 | DEFER-TO-K — same substrate-awaiting-second-consumer logic |
| `<GlassCarouselPager>` | 1 demo file | < 2 | DEFER-TO-K — see V14 |
| `<BouncyToggle overflow="scroll">` | 1 (AuroraConfigDock) | < 2 | DEFER-TO-K — substrate has 1 non-default consumer; default `"none"` is canonical |
| `--space-phi-{5,6}` | 0 production | < 2 | **ABSORB-IN-W7 or DEFER-TO-K** — W1 shipped these as preemptive substrate per planning; J close means we ship them with 0 consumers. Either retire or document as `library-orphan` per the canonical β verdict. The `@theme` Tailwind bridge means consumers can adopt without re-shipping the token, so retain them as part of the spacing axis (forward compatibility argument named in J.W1 amendment) |
| `--duration-sparkle` | 0 production | < 2 | DEFER-TO-K — preemptive substrate; same forward-compat argument |
| `--{success,warning,info}-foreground` | 0 production | < 2 | DEFER-TO-K — semantic-color foreground tokens with no current `<Badge variant="success">`-equivalent consumer; required if K introduces tone variants |
| `--radius-tooltip` | 1 (TooltipContent) | < 2 | KEEP-CURRENT — single canonical consumer; semantic value (`rounded-tooltip` is the named radius). R5's planning row is satisfied |
| `--muted-soft` | 0 production | < 2 | DEFER-TO-K — only `--muted-medium` exercised; `--muted-soft` is an unconsumed rung |
| `.overlay-scrim` `@utility` block | 0 | < 2 | **ABSORB-IN-W7 (DUPLICATE)** — `bg-overlay-scrim` Tailwind utility (from `@theme` color bridge) is the canonical path; the `@utility` block in `utilities.css` is shadowed and unconsumed. Per `feedback_no_backwards_compat` retire the duplicate |
| `cssVar()` composable | 1 (BouncyToggle ×3 calls) | < 2 | KEEP-CURRENT — second consumer roadmap item (`--prefers-reduced-motion` runtime gate at the API surface) is named in J.cross-tranche-debt; the abstraction earned its keep via WAAPI usage |

## Visual-load-bearing flags (the new W0-binding β bar)

| # | Artefact | Pass quantitative? | Visual outcome | Why |
|---|---|---|---|---|
| F1 | `<CarouselPager>` | yes (1 demo, but 0 with W6 promise of "2 in glass-carousel.vue") | **REGRESSION** | runtime mount error throws at `setup()`. Story body collapses to nav-only. Audit class: REGRESSION (was VISIBLE pre-W6.C.2 via `<CarouselPrevious>`/`<CarouselNext>` substrate). |
| F2 | `<CarouselDots>` | yes (1 demo) | **REGRESSION** | rendered alongside `<CarouselPager>` in the same `<Carousel>` block; the parent error halts the entire descendant tree. Indirectly invisible. |
| F3 | `<GlassCarouselPager>` | yes (1 demo) | **NOT-PROBED** | Route navigation appears to silently redirect; same proximity-of-risk as F1/F2 |
| F4 | drag-keep-open visual feedback (V10) | yes (2 consumers) | **CAVEAT — not visually demonstrable** | implementation + CSS rules confirmed live; but no demo story renders a `<Slider>` inside a `<GlassDock>` to exercise the cross-substrate halo + dock-bg lift. R6 cornerstone-3 contract is wired but not visually load-bearing in any story. |
| F5 | `--space-phi-{5,6}` | no (0 consumers) | **INVISIBLE-AT-REST** (no consumer to invisible-vs-visible) | Trivially: substrate without consumer cannot be load-bearing. |
| F6 | `--duration-sparkle` | no (0 consumers) | **INVISIBLE-AT-REST** | same |
| F7 | `--{success,warning,info}-foreground` | no (0 consumers) | **INVISIBLE-AT-REST** | same |
| F8 | `--muted-soft` | no (0 consumers) | **INVISIBLE-AT-REST** | same |
| F9 | `.overlay-scrim` `@utility` | no (0 consumers; duplicate path exists) | **INVISIBLE-AT-REST + DUPLICATE** | retire — canonical path is the Tailwind `bg-overlay-scrim` utility from `@theme` |

---

## Recommendations per finding

| Finding | Severity | Recommendation |
|---|---|---|
| F1 — `<CarouselPager>` runtime mount error | **P0** | **ABSORB-IN-W7**. The W6.C.2 close ceremony shipped a runtime-broken story page. Root cause: `useCarousel()` injection doesn't resolve in `<CarouselPager>` mounted as a child of `<Carousel>`'s default slot in `demo/stories/navigation/carousel.vue:70` (mounting position is correct; the `createInjectionState` from @vueuse/core is meant to provide here exactly as `<CarouselPrevious>` consumes). Likely a Vue setup-order race between embla-carousel-vue's onMounted callback and the inject side; needs investigation. The story-page `<Carousel>` component itself does not pre-emptively `provide` (delegated to `useProvideCarousel`). Fix path: confirm whether the issue is provider-key collision (`createInjectionState` shares one key per call site — both `<CarouselPager>` and `<CarouselPrevious>` import the same `useInjectCarousel`, so a provider miss should affect both, but `<CarouselPrevious>` story passes per W6.C.2 proof). Investigation MUST happen before FINAL.md. The audit cannot pass with a published primitive throwing at setup. |
| F2 — `<CarouselDots>` collateral regression | **P0** | **ABSORB-IN-W7** — fixes alongside F1 |
| F3 — `<GlassCarouselPager>` not-probed | P0 | **ABSORB-IN-W7** — re-probe with corrected route. May share the F1 root cause via `useCarousel()` or be independent. |
| F4 — drag-keep-open caveat | P1 | **DEFER-TO-K** — implementation is correct per W5.C proof; gap is *demo*, not library. K-tranche should add a story binding `<Slider>` inside `<GlassDock>` (e.g. media-transport dock) that visually proves the halo+dock-bg coupling. |
| F5–F8 — preemptive tokens with 0 consumers | P2 | **DEFER-TO-K** with named justification. Per `feedback_overfitting_audit` `library-orphan` triage: option (c) — "shipped for forward compatibility with a named consumer roadmap entry" — applies only with the K-tranche roadmap entry named. Without that entry by FINAL.md, retire under `feedback_no_backwards_compat` (no preemptive substrate without a named consumer). The W1 close doc justifies these as "vocabulary preconditions"; J FINAL must either name the K-tranche consumer entries or absorb-and-retire. |
| F9 — `.overlay-scrim` `@utility` duplicate | **P1** | **ABSORB-IN-W7** — retire the `@utility` block in `src/styles/utilities.css`. The Tailwind `bg-overlay-scrim` from the `@theme` color bridge is the canonical path. Per `feedback_no_backwards_compat`: zero duplicate path, zero migration shim. |
| `<CarouselPager/Dots/GlassCarouselPager>` sub-bar status | P2 | KEEP — they are the canonical pager substrate; ≥2 consumer expectation lands once the basic-pager pattern is consumed by a second story (cross-tranche debt). The runtime regression must be fixed first. |

## Summary distribution

- **VISIBLE**: 13 (V1–V9, V11–V12, V15–V18)
- **INVISIBLE-AT-REST** (substrate-with-no-consumer): 5 (F5, F6, F7, F8, F9)
- **REGRESSION**: 2 (F1, F2)
- **NOT-PROBED**: 1 (F3)
- **CAVEAT** (correct implementation, not visually demonstrable in any story): 1 (F4 / V10)

Sub-bar count: **11** rows below the ≥ 2 bar.
Visual-failure count: **3** (F1, F2 P0 regressions; F3 not-probed adjacent to same root cause).
P0 absorb candidates: **3** (F1, F2, F3 — same root cause; ≤ 1 fix point).
P1 absorb candidates: **1** (F9 — duplicate utility retire).

## Cross-references

- Pre-close ledger: `docs/tranches/J/audit/J-pre-close.md`
- W6.C.2 close proof: `docs/tranches/J/audit/W6-C2-carousel-pager-proof.md`
- W5.C close proof: `docs/tranches/J/audit/W5-C-drag-keep-open-proof.md`
- Console error log: `.playwright-mcp/console-2026-05-06T23-09-43-204Z.log` (CarouselPager mount failure)
- Visual screenshots: `aurora-configurator.png`, `metaballs-configurator.png`, `slider-matrix.png`, `search-fuzzy.png` (project-root .playwright-mcp output)
- Canonical β audit prompt: `docs/audits/overfitting-audit.md`
- W0-binding β strengthening: `docs/precepts/instructions/tranche/SPEC.md ## Close` paragraph 3
- J.invariant 10: `docs/tranches/J/J.md` ## Binding Invariants row 10
