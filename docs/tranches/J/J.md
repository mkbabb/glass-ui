# J — Gestalt Refinement + Vocabulary Convergence + Audit-Precept Hardening

J is the **gestalt-rewrite** tranche. Where I converged the substrate (steady state at HEAD `950d1f4` post-I), J refines it — collapsing duplicate authority paths, strengthening the audit lanes per R6's structural-failure findings, and shipping vocabulary convergence per R5's 32 drift rows.

The user's findings list (`findings.md`) plus R6's plan-vs-actual cross-walk show that **13 of 18 user findings were missed by I's 6-agent close ceremony** — concentrated in π (8 missed), δ (7), β (2), γ (1). The audit lanes are the next surface to harden.

## Prelude

J opens against I close `950d1f4`: build/typecheck/test green; FINAL.md present; precept submodule pinned at `67c1412` (6-agent close + bundle-budget non-negotiable). Six J-research deliverables under `docs/tranches/J/research/R{1..6}-*.md`; 14 Playwright screenshots under `research/screens/`. R6's audit-lane structural-failure analysis is load-bearing for J.W0's precept update.

## Thesis

**The substrate is converged but the audit lanes underspec what visual-shipping means.** π fired in I.W7 with 5 surfaces / 1 viewport / 0-console-error gate — and missed:
- a cornerstone animation defect (dock collapse jerks because `width: auto/fit-content` cannot CSS-interpolate from a fixed pixel value)
- a contrast violation (clearSearchCache 3.0:1 sub-AA-text)
- a viewport-conditional clip (vertical-rail at 500-tall)
- visual-load-bearing-ness gaps (slider-glass-track is invisible at rest)

R6 names three structural π/δ/β failures. J.W0 codifies the remediation as binding precept (next audit pattern is **6-agent + multi-viewport + per-story-consumption + visual-load-bearing-ness**). Then six waves clear the user findings via gestalt refactors, not patch-overs.

J adopts three architectural transpositions:
1. **DockPopover collapses onto Popover** with two thin extension props (`keepDockOpen`, `hoverOpenDelay`); 273 LOC + custom keyframes retire.
2. **Aurora + blob configurators converge to one `<Configurator>` primitive** + `useConfiguratorState<T>` composable; the duplicated configurator chrome retires.
3. **Story-page chassis lifts to `<StoryChassis>` (or `.story-page` utility)** — the 15× repeated `<CreamSurface><DisplayHero><FlourishDivider>` pattern from W4 lands as a single substrate.

Plus vocabulary convergence: 32 drift rows (R5) collapse to canonical utilities/tokens — `popover-animate`, `.focus-ring`, `rounded-panel`, `--scale-press*`, `--ease-apple-spring`, `--overlay-scrim`, `--surface-tint-*`, `--space-phi-{5,6}` (currently undefined but referenced 11×).

## Binding Invariants

1. **C-I precepts still bind**: KISS, no quick fixes, no workarounds, no legacy, no silent deferrals, consumed substrate, evidence over claims, no destructive git, post-close audit BEFORE FINAL, idiomatic gestalt > artefact preservation, per-wave commits, README documentation-of-source.

2. **Architectural transposition is the default.** Three named collapses (DockPopover→Popover, configurator-pair→Configurator, story-chassis-pattern→StoryChassis) are binding. No "wrap and rename" — refactor at the canonical root and retire the originals. Per `feedback_no_backwards_compat`: clean breaks, no aliases.

3. **Cornerstone failures get cornerstone treatment.** The top-dock collapse animation (R1+R6 cornerstone — `width: auto` non-interpolatable) gets a dedicated W3 lane: compose `useLayerTransition` for the outer collapsed↔expanded pair, unifying transitions on FLIP. Not patched.

4. **Vocabulary preconditions land first.** W1 ships every missing token + utility before any consumer wave fires. `--space-phi-{5,6}` undefined-but-referenced is a P0 visual bug today (runtime padding = 0px); it lands in W1 alongside the rest of vocab.γ.

5. **Audit-lane strengthening is binding precept.** R6's three structural-failure findings (π viewport stop-rule, δ never sampled per-story consumption, β counts files not visual load-bearing-ness) land in `docs/precepts/instructions/tranche/SPEC.md` close criteria as W0's submodule update.

6. **No new public components beyond the three named transpositions.** `<Configurator>`, `<StoryChassis>`, `<CarouselPager>` (R4) are the only additions. Everything else is collapse-and-retire.

7. **FuzzySearch is a gestalt rewrite, not polish.** R4 names a 600-line monolith re-implementing Popover/Dialog/Input/Button/Badge/Kbd. Target: ≤ 200 LOC composing canonical primitives.

8. **clearSearchCache rename is binary.** Old name retired; `clearCache` handler + "Clear cache" UI label + `<Button variant="destructive" size="sm">` is canonical. No backwards-compat alias. The `danger-subtle` Button variant retires (R4: 1 consumer, fails WCAG AA at 4.28:1; the canonical destructive variant subsumes its semantics).

9. **Speedtest aurora preset ships in demo, not library.** R2's literal preset object lands as the 12th `auroraPresets` entry in `demo/stories/aurora/presets.ts` — preset is consumer-territory per `feedback_presets_in_consumer`. Library ships the configurator + the preset *type*; consumers ship preset objects.

10. **Visual-load-bearing-ness is the new β bar.** Per R6: "is this consumer visually exercising the artefact's intent?" β audits in J close ceremony probe each sub-bar artefact's actual rendered state (not just consumer count) and flag artefacts that pass quantitatively but fail visually (e.g., slider-glass-track rail at 82% α near-cream over cream page = invisible at rest).

11. **Story-fidelity policy compounds with vocabulary convergence.** Stories are the oracle; if a story consumes a non-canonical recipe (e.g., `clearSearchCache` using `btn-pill` utility while `buttonVariants` exists), the story is wrong AND the canon needs the variant the story should consume. Both sides land in J.

12. **Configurator scroll-wrap + dock max-w/h overflow are the same canonical mechanism.** R1 + R2 both surface "content overflows host". W3 + W4 share the `.scroll-fade-y` + `.scrollbar-hidden` overflow-clip vocabulary; one canonical recipe, two consumers.

## Sub-tranches

J has no sub-tranches. The three architectural transpositions (W3, W4, W5) are independent; W6 is composition cleanup; W7 is the canonical close ceremony.

## Critical files

| Concern | Path |
|---|---|
| Tranche plan | `docs/tranches/J/J.md` (this file) |
| User findings (load-bearing) | `docs/tranches/J/findings.md` |
| Wave specs | `docs/tranches/J/waves/W{0..7}.md` |
| Research deliverables (load-bearing inputs) | `docs/tranches/J/research/R{1..6}-*.md` |
| Playwright screenshots | `docs/tranches/J/research/screens/*.png` |
| Audit reports | `docs/tranches/J/audit/W{N}-*.md` (created per wave) |
| Precept update target (W0) | `docs/precepts/instructions/tranche/SPEC.md` (close criteria) + `tranche/AGENT_DISPATCH_TEMPLATE.md` + `LESSONS-LEARNED.md` |
| Style-audit canon (re-run reference) | `docs/audits/style-audit.md` |

## Wave Schedule

| Wave | Title | Agents | Mode | Hard Gate | Status |
|---|---|---:|---|---|---|
| W0 | Reconciliation + audit-precept hardening | 2 | parallel: HEAD reconciliation + precept-submodule update | reconciliation ledger lists every research finding's wave attribution; SPEC.md close criteria adds π viewport-spread + δ per-story sweep + β visual-load-bearing clauses; AGENT_DISPATCH_TEMPLATE.md adds the visual-load-bearing-ness non-negotiable; LESSONS-LEARNED.md +3 entries (R6 structural-failure incidents); orchestrator commits W0 close | open |
| W1 | Token + utility preconditions (vocab.γ) | 1 | implementation in `src/styles/{tokens.css,theme.css,utilities.css}` | `--space-phi-{5,6}` defined; `--surface-tint-*` family shipped; `--overlay-scrim{,-strong,-subtle}` shipped; `--duration-sparkle` shipped; `--{success,warning,info}-foreground` shipped; `--radius-tooltip` shipped; `.sheet-animate` utility shipped; `text-shimmer-{vivid,pastel}` + `bg-rainbow-pastel` promoted from flourishes.vue; `cssVar()` composable utility shipped; typecheck + build green; `dist/glass-ui.css` audited for utility class output | pending W0 |
| W2 | Style vocab convergence (vocab.α + β) | 2 | parallel: overlay convergence + interactive reach-in | 7 overlay sites consume `popover-animate slide-in-from-side`; 16 CVAs consume `.focus-ring`; 8 overlays use `rounded-panel`; 5 modal scrims use `--overlay-scrim`; 10 hardcoded scales → `--scale-press*` / `--scale-hover*`; 3 cubic-beziers → `--ease-apple-spring`; 9 `color-mix(--muted)` recipes → `--muted-soft/medium`; ComboboxList drops duplicate backdrop-filter; Card pane variant disposition (consume `glass-subtle` OR DESIGN.md notes the bypass); rg confirms 0 raw repeats post-wave | pending W1 |
| W3 | Dock cornerstone + DockPopover gestalt | 3 | parallel: collapse animation + Popover collapse + overflow-scroll & blur reduction & dev-text scrub | dock collapse animates spring (≥ 280ms FLIP via `useLayerTransition` for outer pair; reduced-motion bracketed); `<DockPopover>` deleted; `<Popover>` ships `keepDockOpen` + `hoverOpenDelay` props; `pop-up-*`/`pop-down-*` keyframes retired; `--glass-blur-dock-radius` reduced to 0px; `saturate(1.0)`; `--dock-max-inline-size` token + overflow-scroll mask-fade; `INTERNAL_CATEGORY` dev-text gated behind localStorage opt-in; vertical-rail mask-fade renders below clip; Playwright probes confirm dock crossfade timing + reduced-motion fallback + overflow scroll | pending W1 |
| W4 | Configurator unification + aurora/blob | 3 | parallel: Configurator primitive + aurora refit + blob configurator buildout & speedtest preset | `<Configurator>` + `useConfiguratorState<T>` shipped at `src/components/custom/configurator/`; aurora studio refactors to consume; aurora `min-w-[320px]` overflow + BouncyToggle inline-grid clip + black bar fixed; blob page becomes proper configurator (7-axis layer split per R2.C); `<Aurora>` + `<Blob>` honor `prefers-reduced-transparency`; speedtest preset `auroraPresets.SPEEDTEST` lands in `demo/stories/aurora/presets.ts`; Playwright probes confirm zero clip/black-bar regressions | pending W1 |
| W5 | Form primitives + StoryChassis | 4 | parallel: Slider variants + NumberField rounded + drag-keep-open feedback + StoryChassis | `sliderVariants` extends with size axis (sm/md/lg) + variants (`glass-pill`, `glass-cartoon` per R3.C); NumberField uses `--radius-input` (pill); +/- buttons compose `<Button asChild>`; drag-keep-open visual feedback (thumb halo + dock pulse via `data-held`); `<StoryChassis>` (or `.story-page` utility) substrate published; ≥ 5 demo stories migrated as proof; Playwright probes confirm slider drag emits `data-held` + dock substrate responds | pending W3 |
| W6 | Data + composition refinement | 3 | parallel: Badge size axis + FuzzySearch rewrite + Carousel pager substrate | Badge gains size axis (sm/md/lg) reconciling row-text mismatch; FuzzySearch.vue collapses from ~600 LOC monolith to ≤ 200 LOC composing canonical primitives; clearSearchCache renamed to "Clear cache" + variant=destructive; `danger-subtle` Button variant retires (1 consumer, fails AA); `<CarouselPager>` + `<CarouselDots>` substrate primitives ship; basic-pager section in `navigation/carousel.vue` retires; status-cell badge alignment fix; orchestrator commits W6 close | pending W2 |
| W7 | Close ceremony + 6-agent post-close audit (strengthened pattern) | 1 (orchestrator) + 6 audit lanes | implementation: `audit/J-pre-close.md` + 6 audit deliverables + FINAL.md | per W0 strengthened pattern (π multi-viewport ≥ 3 + δ per-story consumption sweep + β visual-load-bearing-ness); FINAL.md authored AFTER findings absorbed; per-wave commits closed; tranche J closes clean | pending W3 + W4 + W5 + W6 |

Total wave count: 8. **Wave concurrency**:
- W0 → W1 (blocks all)
- W1 → W2, W3, W4 in parallel (file bounds disjoint: W2 = ui/ + styles/, W3 = custom/dock + dock.css + manifest, W4 = custom/{aurora,blob,configurator} + aurora.css + presets)
- W2 → W6 (W6 depends on the focus-ring / popover-animate vocabulary W2 ships)
- W3 → W5 (drag-keep-open feedback is dock-substrate-aware; depends on W3 cornerstone + dock blur reduction)
- W4, W5, W6 → W7 close

## Hard gates

A wave closes only when:
1. typecheck + build green
2. wave proof doc records every accepted finding's resolution + cites evidence
3. orchestrator commits the wave's diff (per H invariant 10) — never carry uncommitted state across waves
4. PROGRESS.md status table reflects the close
5. (when applicable) Playwright probe at ≥ 3 viewports confirms no regression
6. (when applicable) per-story consumption sweep confirms canonical-vocabulary adoption

Tranche J closes only when:
1. every wave closed per above
2. zero raw `popover-animate slide-in-from-side` slot-list duplicates remain (verified by rg)
3. zero raw `focus-visible:shadow-[var(--focus-ring-shadow)]` repeats remain (verified by rg)
4. zero raw `bg-black/{40,50,80}` overlay scrims remain (verified)
5. dock collapse animation timing samples (≥ 5 frames over the spring duration) confirm continuous interpolation, not binary jump
6. clearSearchCache button passes WCAG AA contrast (≥ 4.5:1)
7. FuzzySearch.vue ≤ 200 LOC + composes only canonical primitives
8. Aurora configurator at 1024×768 + 1440×900 + 375×667 viewports renders without clip/black-bar
9. **6-agent post-close audit (strengthened pattern) runs and returns clean** before FINAL.md is final
10. binding precept updates landed in `docs/precepts/`

## Cross-tranche debt + explicit deferrals

- **Audacious primary-CTA variant** (R5 gap row 8) — formally deferred to K. The disco-grain + sparkle-sweep + specular-highlight composite at `dock.css:659-744` is reusable as a `Button variant="primary-audacious"` but extracting it merits its own gestalt wave with a story.
- **Card pane variant glass-subtle bypass** (R5 axis 4 row) — DESIGN.md decision in W2: either consume `glass-subtle` (clean break) or document the bypass as canonical. W2 picks; no forward defer.
- **Paper rung literal hsl in paper.css** (R5 axis 1 row) — minor rung-aliasing fix; either both rip out together with dark-mode mirrors or both stay. W2 decides; no defer.
- **`<Tooltip>` rounded-lg vs other overlays' rounded-xl** (R5 axis 4 row) — W1 ships `--radius-tooltip` semantic; W2 consumes.
- **WAAPI `cssVar()` composable utility** — W1 ships; consumers in BouncyToggle (W2) consume immediately.
- **Drag-keep-open contract API extensibility** (R5 gap row 9) — current consumers: Slider, DockPopover (post W3 collapse: just Slider). 1 consumer is below the bar; W5 ships `<NumberField keep-dock-open>` consumer (per R3.D drag visual feedback) to validate the API surface, OR formally documents the API as Slider-only.
- **`prefers-reduced-motion` runtime gate for WAAPI consumers** (R5 axis 7) — W2 absorbs into vocab.β BouncyToggle migration.

## Brittleness window

**None planned.** J opens against a green tree; every wave closes green.

If W6's FuzzySearch gestalt rewrite breaks the design-fidelity gate momentarily, declare a `breaking_changes_during_wave: yes` window in the W6 wave-spec with restoration in W7 close ceremony per `tranche/SPEC.md` Brittleness Window protocol.

## Out of scope (explicit)

- New design-language axes — J refines, doesn't extend.
- Audacious primary-CTA variant (deferred to K).
- Consumer-repo edits — J does not touch speedtest beyond reading aurora preset config.
- New public subpath — runtime additions stay under existing `@mkbabb/glass-ui/tokens` per G invariant 13.
- Plugin extraction — formally retired in I as permanent consumer-territory deferral; J does not revisit.
- Cross-tranche audit pattern beyond π/δ/β strengthening (other lanes were CLEAN in I.W7; no remediation needed).
