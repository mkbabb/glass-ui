# Pass-E SYNTHESIS — `substrates/fourier-field` (the binding per-page verdict)

**Page:** `demo/stories/substrates/fourier-field.vue` → hand-rolled studio (`<ShowcaseFrame tier="quiet">` + ONE `<Configurator>` + `<GlassTimeline scrubber>` + `<DockBackgroundToggle>`).
**Import label:** `@mkbabb/glass-ui/fourier-field` — **ALREADY STANDARDIZED + live-confirmed** (`fourier-field.vue:278`; the COMPLIANT exemplar of the whole substrates band — aurora/blob are NOT standardized, this page is).
**Component:** `src/components/custom/fourier-field/` — WebGPU-first dual-substrate (compute→fragment WGSL primary, WebGL2 SDF fallback), NOT Canvas2D.
**Synthesizes:** `substrates-fourier-field-{demo,design,component}.md`.

---

## Verdict in one breath

The fourier-field COMPONENT is HEALTHY and converged — the demo+design lenses agree the only component-level owed item is a DOC re-stamp (the stale PROCEDURAL-SUITE row). The DEMO PAGE carries the EXACT systemic substrates-band defect set the aurora/blob/constellation SYNTHESES already named — one-card monolith, inverted hierarchy, no live colorful backdrop, no dock-API contextual switching, inert chrome/checkbox controls — and every one of them FOLDS into a Band-16 chassis wave that ALREADY EXISTS (authored against the aurora reference). This page is the **un-converted twin of the already-solved aurora page**, with two distinguishing facts: (1) the import label is already compliant (zero work owed there), and (2) the demo lens saw the field PAINTING LIVE on the BF tree while the design lens saw a 300×150 stuck buffer — a CONFLICT resolved below. The page needs the chassis-migration loop, then ONE live-verify loop. **ZERO net-new waves owed.**

---

## The CONFLICT — does the field paint? (resolved)

The single divergence across the three lenses:

- **demo lens §0:** the field IS alive — direct viewport screenshot shows the warm-amber Fourier curve, rotating epicycles, comet head, pink chain arm all animating; status `N 4/16 playing`; the all-black pixel SAMPLE was a WebGPU→2D `drawImage` cross-context readback artifact (not a dead viz).
- **design lens §0:** the field does NOT paint — a flat gray slab (near-black void in dark); the canvas backing store measured **300×150** (the unsized HTML default) stretched over a 622×521 display box.
- **component lens §3:** the component is compositor-clean, DPR consumer-owned + budget-capped via `resolveBudgetDpr()`, offscreen-park inherited — **the source is clean; resize is the consumer/chassis's seam to fire** (`useGpuSubstrate` "consumer owns its DPR policy").

**Resolution:** the SOURCE is clean (component lens), so the 300×150 buffer is a DEMO-EDGE resize failure — the chassis never fired the resize-to-box on this hand-rolled studio surface (the same class blob's SYNTHESIS resolved: the broken-sticky/hand-rolled-studio surface starves the substrate's box resolution). The two captures are NOT contradictory — they are two surfaces/timings (the design capture caught the pre-resize 300×150 buffer; the demo capture caught it after a scroll/resize settled). The fix is the SAME for both readings: route the page onto `<VizStudio>` (which owns the rounded-field clip + the resolved `#stage` box), so the substrate gets a real box from frame 0. This is **expected to fix the stuck buffer as a side-effect of the chassis migration** — a hypothesis that takes ONE live re-verify after the fold lands (do NOT pre-mint a renderer ResizeObserver arm; the blob/constellation precedent). The conservative escalation (a one-line renderer resize arm folded into `W-VIZ-PARITY-METAL`) fires ONLY IF the buffer is still stuck post-migration.

---

## Reconciled findings (deduped across the 3 lenses, ranked by impact)

The design lens (§0–§7) and the demo lens (§1–§7 + BUG-1/2/3) describe the SAME page; the component lens confirms every layout finding is DEMO-side (the FourierField src is sound). Reconciled and impact-ranked:

| Rank | Finding (merged) | demo | design | component |
|---|---|---|---|---|
| **1** | **The protagonist may not paint (300×150 stuck buffer)** — the substrate never resizes to the stage box on the hand-rolled studio surface; source is clean, so this is a demo-edge resize failure expected to clear on the chassis migration. **The one blocker to live-verify.** | §0 (alive after scroll) | §0 (P0, dead slab) | §3 (source clean, resize is chassis seam) |
| **2** | **DOUBLE HEADER (duplicate title + eyebrow + blurb)** — the SFC hand-rolls a `<header>` (`:277-294`) that DUPLICATES StoryPage's `StoryHeader` hero → TWO "Fourier Field" titles + TWO blurbs, live-confirmed; the giant hero buries the studio below the fold. The exact D1-4 double-`<h1>` defect, bypassed by hand-rolling. | BUG-1 (HIGH) | §1 + §6 | — |
| **3** | **One-card monolith — sub-sections are NOT each in their own glass card** — ONE `<Configurator>` holds the stage + ONE scroll column; the four axis groups (Spectrum · Epicycles · Comet · Color) are flush hairline-divided `ConfiguratorLayer`s, read as one control wall. The user's headline ask, unmet. | §4 (struct) | §2 + move 4 | — |
| **4** | **Hierarchy inverted / header 2× too large** — the `text-display-hero`/`-mega` ink wordmark eats ~70vh and pushes the studio below the fold; the user asked for a BIGGER main card. Demote the masthead to `text-display-3`, promote the stage to the dominant hero. | §1 (struct) | §1 + move 2 | — |
| **5** | **No live colorful backdrop — glass with nothing to refract** — the substrate-studio special case: the viz IS the color event, but the configurator/status-pill/transport glass float over a FLAT dark page, so the six-layer composite is barely exercised (W54 "blur imperceptible over flat substrate"). The iOS-27 north-star miss. | §3 (partial) | §3 + move 3 | §6 (confirms: the field IS the candidate live backdrop) |
| **6** | **Zero dock-API contextual switching** — the only dock-family component is `<DockBackgroundToggle>` as a bare pause button; preset switching is `<Configurator>` chips, not a dock contextual switch / `DockLayerGroup` / `DockStack mode="facets"`. The "leverage the dock APIs" directive UNMET. | §2 (struct) | §2A + §5 + move 4 | — |
| 7 | **Inert controls + raw native checkboxes** — two configurator toggles are raw `<input type="checkbox" accent-[var(--viz-fourier)]>` (`:398-403,428-433`), NOT `<Switch>`/`<ToggleChip>` (a generic-AI tell + a dogfood miss); the `LabeledSlider`/`LabeledSelect` rows have no entrance, no hover-lift; the preset strip clips off the right edge (no `<FadingScroll>`). | §2 (checkbox) | §4 + §5 + move 5/6 | §1 (component entrance gap is chassis-owned) |
| 8 | **Demo re-forks palette/`resolveCss` + the whole configurator** — the field's own `getPalette`/`refreshPalette` derivation is bypassed; each of the 5 viz re-forks its configurator (the DRY miss). | (implicit) | — | §5 (DRY note) + table F3 |
| 9 | **No mount/entrance animation on the field** — no `.scroll-build`/spring-mount bloom; the field POPS in at full opacity (chassis-owned — the component exposes no reveal seam to cooperate). | — | §4 | §1 (MINOR, chassis-owned) |
| 10 | **PAPER register absent** — no paper-grain/blueprint-grid/`paper-ink-mark` anywhere, apt for a "math paper" Fourier teaching surface. | §3 (absent) | (implicit) | — |
| 11 | **Superfluous copy** — the SFC `<header>` blurb (`:285-293`) is a 5-8 line redundant wall (`WATCH`/`SCRUB`/`No Canvas2D` shouting + implementation trivia) duplicating the tighter manifest blurb; tighten to two sentences. | §6 | §1 + §7 | — |
| F1 | **PROCEDURAL-SUITE.md fourier row is STALE** — `:75` still says "Canvas2D / DO NOT MIGRATE / fourier-studio.vue", all FALSE post-BC.W-VIZ-FOURIER; contradicts gpu-parity-table.md:121. The W-FOURIER-GPU "booked" successor already FIRED at BC. | — | — | §2 (the load-bearing component finding) |
| BUG-2 | **Harmonics-N slider fill overflows its track** at low N (purple fill protrudes left of the rail) — a `LabeledSlider` min=1 rounding-at-low-N render issue. | BUG-2 (MED) | — | — |
| BUG-3 | **`<Transition>` non-element-root Vue warn** (fragment/comment root inside `fade-slide`) — benign but noisy. | BUG-3 (LOW) | — | — |
| ✓ | **Import label standardized** — `@mkbabb/glass-ui/fourier-field` live-confirmed (`:278`); this page is the COMPLIANT model. **No action** (propagate the pattern to aurora/blob — their job, not this page's). | §5 | §1 (keep) | — |
| ✓ | **Component is HEALTHY** — WGSL-primary dual-substrate, shared color chunk, one `head_t` clock, pointer-SCRUB + velocity-continuous flick-momentum, PRM-freeze, offscreen-park, budget-DPR, warm-identity fenced, math single-source. | §0 | §5 (premium craft) | §1–§5 (all PASS/scoped) |

### Conflicts resolved

- **The paint conflict (rank 1)** — resolved above: source-clean + design-saw-300×150 + demo-saw-alive ⇒ a demo-edge resize failure expected to clear on the `<VizStudio>` migration; ONE live re-verify gates it; the renderer-resize escalation is evidence-gated, not pre-minted.
- **No other conflicts** — the lenses agree on every layout defect; the design lens adds the hierarchy-inversion + backdrop framing, the demo lens adds the double-header root-cause + the raw-checkbox census + the two render bugs, the component lens confirms the layout findings are DEMO-side and that the field is the candidate live backdrop (the substrate-studio "the viz IS the color" framing).
- **Component lens "no new wave" vs demo/design "big refactor needed"** — NOT a conflict: they scope different layers. The component (`src/components/custom/fourier-field/`) needs only the F1 doc re-stamp; the demo PAGE is where findings 2–11 live, all zero-or-near-zero `src/` paint.

---

## Tranche actions (per finding — FOLD / MODIFY / AUGMENT / PRUNE / NEW)

Every Band-16 chassis wave below ALREADY EXISTS on the roster (`union/waves/`) — authored against the aurora reference. This page does NOT get a bespoke redesign wave; it gets RE-ENROLLED into the existing folds + RE-AUDITED after they land.

| # | Finding | Action | Target wave |
|---|---|---|---|
| 1 | Protagonist 300×150 stuck buffer | **MODIFY (live-verify rider)** | **BD.W-CONFIG-GALLERY-DOCK** — enroll fourier-field's `#stage` in the chassis-migration resize assertion (the resolved `#stage` box is the expected fix). The evidence-gated escalation (a renderer ResizeObserver arm) folds into **BD.W-VIZ-PARITY-METAL** ONLY IF the buffer is still stuck post-migration — do NOT pre-mint. |
| 2 | Double header (duplicate title/eyebrow/blurb) | **FOLD** | **BD.W-PAGE-CHASSIS** (§2 the SYSTEMIC duplicate hand-rolled in-card `<header>` fold — fourier-field is one of the 36; delete the SFC `<header>` `:277-294`) + **BD.W-STICKY-TITLE-CONDENSE** (the ONE condensing title). The violet `--motion-accent` masthead intent moves into VizStudio's `#masthead` slot. |
| 3 | One-card monolith → per-section glass cards | **FOLD** | **BD.W-CONFIG-GALLERY-DOCK** (the gallery-larger/up-top/scrollable/dock-collapse chassis) + **BD.W-STORY-PAGE-STANDARD** (the glassy-sub-card invariant). Option A (the strongest): a `DockStack mode="facets"` rail (Spectrum · Epicycles · Comet · Color, each a `--glass-accent` context card switched on `--spring-dock`) — the most distinctive move, teaches the dock system while teaching Fourier. |
| 4 | Hierarchy inverted / header 2× too large / bigger stage | **FOLD** | **BD.W-HEADER-SCALE** (the heroScale rung halve — fourier rides the substrates 244.8px→`text-display-3` demote) + **BD.W-PAGE-CHASSIS** §hierarchy. The stage promotes to the dominant `min(78vh,720px)` hero via the VizStudio default. |
| 5 | No live colorful backdrop | **FOLD** | **BD.W-PAGE-BACKGROUND** — seat the studio over a contained offscreen-paused `<Aurora>` (warm-to-violet, echoing `--viz-legendre`/`--motion-accent`); ONE GL context per route (the aurora behind, the Fourier field the protagonist on top). The field is also the candidate per-category live backdrop for the substrates band. |
| 6 | Zero dock-API contextual switching | **FOLD** | **BD.W-CONFIG-GALLERY-DOCK** (the gallery-in-a-`<GlassDock>` collapse-hub + the dock-facet section switch) + **BD.W-STORY-PAGE-STANDARD** §drive-the-APIs. |
| 7 | Inert controls + raw native checkboxes + clipping preset strip | **FOLD** | **BD.W-STORY-PAGE-STANDARD** (dogfood `<Switch>`/`<ToggleChip>` for showEpicycles/rainbowChain; `<FadingScroll axis="x">`/`<SegmentedTabs>` for the preset strip) + **BD.W-LIQUID-ENTRANCE-GENERAL** (the `.scroll-cascade` build-in + `transition-control` hover-lift on the control rows). |
| 8 | Demo re-forks palette/`resolveCss`/configurator | **FOLD** | **BD.W-CONFIG-GALLERY-DOCK** (the wave names "blob/concentric/fourier-field/paper-grid each RE-FORK their configurator" — route fourier-field through `<VizStudio>`, DRY the 5-viz configurator; the field's own `refreshPalette` stops being bypassed). |
| 9 | No mount/entrance animation on the field | **AUGMENT** | **BD.W-PAGE-BACKGROUND** (the per-category live-field staging) + **BD.W-LIQUID-ENTRANCE-GENERAL** — thread `.scroll-build`/page-build over the staged field (chassis-owned; the field is a fixed inset:0 host). |
| 10 | PAPER register absent | **AUGMENT** | **BD.W-PAPER-MORPHISM** — a captioned `paper-grain-overlay` / blueprint-grid notes register on the math-Fourier surface (the math-paper gold standard); a taxonomy addition, not a new wave. |
| 11 | Superfluous copy | **FOLD** | **BD.W-PAGE-CHASSIS** §copy-discipline / the W-CONFIG-GALLERY-DOCK copy fold — delete the SFC `<header>` blurb (`:285-293`, dies WITH the duplicate header in #2); the manifest blurb (already tight) is the ONE editorial line; drop the `WATCH`/`SCRUB`/`No Canvas2D` shouting. |
| F1 | PROCEDURAL-SUITE.md fourier row STALE | **MODIFY** | **BD.W-HOMEMAP-RESYNC / W-PRECEPT-CANON** (the doc-resync owner) — re-stamp `:75` to `WebGPU (compute+fragment WGSL) / WebGL2 SDF fallback / MIGRATED at BC.W-VIZ-FOURIER`; move W-FOURIER-GPU to "FIRED at BC"; reconcile against gpu-parity-table.md:121. The constellation SYNTHESIS routes the analogous stale row here — co-land them. |
| BUG-2 | Harmonics-N slider fill overflows track at low N | **MODIFY** | **BD.W-CONFIG-GALLERY-DOCK** (a rider on the configurator migration — the `LabeledSlider` min=1 low-N fill-clamp render fix, verified at N=4) OR a `LabeledSlider`-local fix if it reproduces library-wide. A genuine render bug — verify scope on the chassis fold. |
| BUG-3 | `<Transition>` non-element-root warn | **FOLD** | **BD.W-PAGE-CHASSIS** root-element discipline (the chassis-wide non-element-root note the aurora SYNTHESIS already routes there) — dies on the chassis migration when the hand-rolled fragment root is replaced by VizStudio's single-element slots. |
| ✓ | Import label standardized | **PRUNE (nothing)** | No action — already compliant; propagate to aurora/blob (their waves, not this page's). |
| ✓ | Component KEEP set | **PRUNE (nothing)** | No PRUNE this page — every component asset is load-bearing; the only "cut" is the demo SFC `<header>` + its blurb (routed in #2/#11). |

### NEW waves: ZERO

Unlike aurora (which surfaced the genuine NEW `W-PRESET-THUMB-FALLBACK` / `W-PRESET-RENDER` bug), fourier-field surfaces **no net-new wave**. Every finding folds onto an existing Band-16 chassis wave or the F1 doc-resync. The preset-thumbnail bug is aurora's territory (fourier inherits the fix when it routes through `<VizStudio>`, per W-CONFIG-GALLERY-DOCK + W-PRESET-RENDER). This is the convergence proof: ZERO new waves owed.

---

## Convergence call

**~55% now → ~90% after Loop 1 → CONVERGED after the Loop-2 live-verify.** CLOSE — but not as close as blob (~70%), because of the unverified paint blocker (rank 1); ahead of constellation (~25%, two hard blockers + a migration zombie).

- **Component layer: converged (~90%).** No new wave; the only owed item is the F1 PROCEDURAL-SUITE doc re-stamp (a one-line resync co-landing with constellation's). The WGSL parity tail rides the existing band-3 waves. This layer does not need another audit loop.
- **Demo/design layer: ~45%.** All structural defects open, but ALL FOLD into existing Band-16 chassis waves authored against the aurora reference — so this page does NOT get a bespoke redesign; it gets the chassis migration + a re-audit. The distinguishing facts vs siblings: the import label is ALREADY compliant (zero work there), and the paint blocker is unverified (a hypothesis, not a confirmed bug).
- **Loop plan:** **Loop 1** = execute the chassis folds (W-CONFIG-GALLERY-DOCK route-through-VizStudio + dock-facet rail, W-PAGE-CHASSIS double-header delete + copy tighten, W-HEADER-SCALE demote, W-PAGE-BACKGROUND contained-aurora, W-STORY-PAGE-STANDARD glass sub-cards + dogfood Switch, W-LIQUID-ENTRANCE-GENERAL entrance, W-PAPER-MORPHISM notes register) + the F1 doc re-stamp — converges the page structurally. **Loop 2 (verify-only)** = live-confirm the field PAINTS over the contained aurora (the rank-1 blocker), the six-layer glass composite reads, the entrances fire, the dock-facet switch animates on `--spring-dock`, BUG-2 cleared. IF the buffer is still stuck → the single evidence-gated escalation (the renderer ResizeObserver arm on W-VIZ-PARITY-METAL). Otherwise CONVERGED. Fourier-field is a strong chassis exemplar (already-standardized label, healthy component) — a clean Loop-1 lands it near-final.
