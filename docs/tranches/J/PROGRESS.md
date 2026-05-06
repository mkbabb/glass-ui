# J — Progress Log

## 2026-05-06 — Tranche open

J opens against I close `950d1f4` (FINAL.md present; precept submodule pinned at `67c1412`; canonical 6-agent close + bundle-budget non-negotiable; CI lint.yml binding).

The tranche opens on the user's findings list (`findings.md`) — 18 net-new issues raised post-I close — combined with R6's plan-vs-actual cross-walk identifying that 13 of 18 user findings were missed by I's 6-agent close ceremony (concentrated in π / δ / β audit lanes).

J reads the 6 research deliverables under `docs/tranches/J/research/R{1..6}-*.md` as the load-bearing input — there is no open design space, no new research wave, no challenge wave. The work is mechanical convergence + cornerstone refactor + audit-precept hardening.

J thesis: substrate is converged but audit lanes underspec what visual-shipping means. W0 codifies the strengthened 6-agent pattern (multi-viewport π + per-story consumption δ + visual-load-bearing-ness β); W1 ships the missing token + utility canon; W2-W6 land consumer migrations + three architectural transpositions (DockPopover→Popover; aurora+blob → Configurator; story-chassis → StoryChassis); W7 closes via the strengthened pattern.

Wrote initial `J.md`, `findings.md`, `waves/W{0..7}.md`, this `PROGRESS.md`.

## 2026-05-06 — Branch consolidation onto master

J planning was authored on sibling branch `o-w2_7-instrument-chassis` (HEAD `118824d`). Master had diverged via a separate v0.7.x → v0.8.0 release path that retired the `subtle/default/medium/elevated` glass-tier ladder in favor of `wash/quiet/resting/floating + overlay`, retired Card variant API, lifted ScrollPane/CartoonCard as sibling primitives, and shipped HoverPopover. To run J from master, the H/I/J planning + audit + research artefacts were checked out from `o-w2_7-instrument-chassis` and committed onto master (`5baceb5`, 94 files / 15,212 insertions, purely additive under `docs/tranches/`). Branches `release/0.7.x`, `release/0.8.x`, `o-w2_7-instrument-chassis` deleted; preserved as `backup/*` tags.

J wave specs reference the pre-v0.8.0 substrate; W0 reconciliation + amendments below remap to v0.8.0 reality.

## 2026-05-06 — W0 close

W0 ran two parallel lanes:

- **Lane I — reconciliation audit** (read-only): walked R1–R6 + 18 user findings + every wave-spec invariant against master HEAD. Output: `audit/W0-reconciliation.md` (~131 dispositions: 78 WIRE / 9 REMAP / 17 RETIRE / 9 RESEARCH-AGAIN / 18 DEFERRED). 10 §F amendments to wave specs identified.
- **Lane II — precept submodule update**: updated `docs/precepts/instructions/{tranche/SPEC.md, tranche/AGENT_DISPATCH_TEMPLATE.md, LESSONS-LEARNED.md}` with strengthened audit clauses (≥ 3 viewports / animation-timing samples / contrast probes / per-story consumption sweep / visual-load-bearing-ness β bar) + 3 new lessons (R6 structural-failure incidents). Submodule advanced `67c1412 → 6b8437a`.

W0 amendments applied to wave specs by orchestrator at close:

- **W1.intro + W1.4** — `--space-phi-{5,6}` re-framed as preemptive substrate; flourishes shimmer/rainbow conditioned on consumer survey.
- **W2.A** — added Step 0 absorbing the v0.8.0 token-cleanup miss (27 stale `--glass-{bg,blur,border,shadow}-{subtle,default,medium,elevated}` references at HEAD); row 4 ladder rename (`elevated` → `floating`); row 7 (Card pane disposition) DROPPED.
- **W3.B** — Lane B pivots to extending `<HoverPopover>` (not `<Popover>`) with `keepDockOpen`; HoverPopover already provides hover semantics.
- **W3.C** — step 3 (INTERNAL_CATEGORY localStorage gate) DROPPED; manifest.ts dev-text already retired.
- **W4.A** — `<Configurator>` name reclaimed; existing `demo/configurator/Configurator.vue` (token-editor) renames to `PresetEditor.vue` as Lane A's step 0.
- **W5.A** — re-cast as "build `sliderVariants` CVA from scratch" (no CVA at HEAD).
- **W5.D** — chassis-pattern grep added as step 0 (R3's cited story files don't exist at HEAD).

## 2026-05-06 — W1 close

W1 (vocab.γ) shipped substrate-only:

- **25 new tokens** in `src/styles/tokens.css` (light + 6 dark mirrors): `--space-phi-{5,6}`, `--surface-tint-{4,6,8,10,12,15,18,22,25}`, `--overlay-scrim{,-strong,-subtle}`, `--duration-sparkle`, `--{success,warning,info}-foreground`, `--radius-tooltip`, `--muted-{soft,medium}`. Organized into existing §1/§4/§5/§6/§8/§10 sections.
- **21 `@theme` bridges** in `src/styles/theme.css` (each new token → Tailwind v4 utility).
- **2 `@utility` blocks** in `src/styles/utilities.css`: `sheet-animate` + `overlay-scrim`.
- **`cssVar()` composable** at `src/composables/utils/cssVar.ts` + barrel; re-exported through `src/composables/index.ts` and `src/index.ts`.

Conditional dispositions:
- **W1.4 deferred entirely** — `demo/stories/foundations/flourishes.vue` doesn't exist at HEAD; zero `text-shimmer|bg-rainbow|text-rainbow` consumers; per `feedback_overfitting_audit` substrate-without-consumer guard.
- **W1.6 N/A** — `paper.css` already contains zero `hsl(48 …)` literals; W1.md prescription was stale planning-branch drift.

Pre-flight grep confirmed all 25 tokens absent at HEAD (zero collision); `--duration-panel` already exists (no W1.3 dep needed).

Hard-gate verification: `npm run typecheck` green; `npm run build` green (18.93s); `npm run test` green (270 tests pass, 18 files); `npm run profile:bundle` ran and updated docs/tranches/F/audit/*.json snapshots (no `profile:budget` script — `profile:bundle` is the canonical name in `package.json`).

Token value choices for orchestrator review (documented in proof doc): `--success-foreground` / `--info-foreground` light = `var(--neutral-0)`, dark = `hsl(48 10% 96%)`; `--warning-foreground` = `hsl(24 10% 10%)` in both modes (warning amber stays dark-on-amber).

W1 incidence: agent briefly ran `git stash` to verify a pre-existing failure mode (a precept violation per LESSONS-LEARNED 2026-05-04 "Never Use Git Stash As Agent Recovery"). Agent recovered surgically via Edit tool; no work lost. Reinforcement noted; will absorb at J close (FINAL.md or LESSONS-LEARNED reinforcement entry if pattern re-appears).

## 2026-05-06 — W2 close

W2 (vocab.α + β) ran two parallel lanes against the W1 substrate.

**Lane A — overlay convergence**: 23 files migrated. Step 0 absorbed v0.8.0 token-cleanup miss (19/21 stale `--glass-{bg,blur,border,shadow}-{subtle,default,medium,elevated}` references retired in Lane A's bounds; Lane A also caught 9 additional refs in `hover-popover.css` + `instrument-chassis.css` that W0 §F item 1 missed). 9 overlays consume `popover-animate slide-in-from-side`; 8 overlays use semantic radius (`rounded-panel/dialog/card/tooltip`); 5 modal scrims use `bg-overlay-scrim{,-strong,-subtle}`; ComboboxList composes `glass-floating` (single class, dropping inline tokens + duplicate backdrop-filter); Sheet uses `.sheet-animate`; Drawer/Sheet reconciled to `--z-modal`. Step 7 (Card pane variant disposition) DROPPED per W0 §F item 4. Proof: `audit/W2-A-overlay-proof.md`.

**Lane B — interactive reach-in**: 28 files migrated. focus-ring 16→0 (all CVAs consume `.focus-ring`); scale(0.9N) 3→0 (excl. FuzzySearch — W6.B owns); `--ease-apple-spring` consumed at 3 sites (UnderlineTabs CSS + BouncyToggle WAAPI via `cssVar()` + `prefers-reduced-motion` early-out); `--muted-medium` consumed at 4 sites; `--surface-tint-N` consumed at 13 sites; transition-all → named property lists at 7 sites; Skeleton keyframe deduplicated onto `shimmer-sweep`. Step 7 (`.section-label` Configurator migration) DEFERRED per dispatch coordination — W4.A renames the file to `PresetEditor.vue`. FuzzySearch sites SKIPPED per W6.B coordination (4 muted + 2 scale + 1 foreground-85% sites). Proof: `audit/W2-B-interactive-proof.md`.

**SR-1 absorbed by orchestrator** (W0 §F item 1 residual — Lane A flagged 3 stale token references surviving in cross-lane file bounds): `src/components/ui/button/index.ts:26` (`glass` button variant — 7 stale token refs migrated to wash/quiet/resting/floating); `src/components/ui/slider/Slider.vue:111-112` (timeline variant scoped CSS — `--glass-blur-subtle` ×2 → `--glass-blur-wash`). Mechanical token-name remap; consumes the existing v0.8.0 token canon.

**Sub-tranche K candidates flagged by Lane B** (out-of-scope for J):
- `--muted-40` rung (ProgressiveSidebar:209) — gap in `--muted-{soft,medium}` family
- `--surface-tint-{40,70,85}` rungs — gap in `--surface-tint-N` family
- `--text-tint-N` family — analog to surface-tint but for foreground tonality

These are deferred to a future tranche per the substrate-without-consumer guard.

Hard-gate verification: typecheck green; build green (19.65s); test 270/270 pass; rg confirms 0 raw `bg-black/{40,50,80}` + 0 stale glass-{bg,blur,border,shadow}-{subtle,default,medium,elevated} + 0 raw `focus-visible:shadow-[var(--focus-ring-shadow)]` repeats.

## 2026-05-06 — W3 close

W3 (dock cornerstone + DockPopover gestalt) ran as a single agent across 3 sequenced lanes (Lane A → B → C share `src/styles/dock.css`).

**Lane A — collapse animation cornerstone**: composed `useLayerTransition` (canonical for `<DockLayerGroup>` inner pair) onto `<GlassDock>`'s outer collapsed↔expanded pair. The composable measures natural width before/after slot swap and animates between fixed pixel values via `--dock-motion-resize` (300ms `--spring-snappy`). Replaced `visibility: hidden` (binary, non-transitionable) with `opacity: 0` + `transition: opacity var(--dock-motion-fast)`. Width transition lives on `.dock-layers` only; `.glass-dock:not(.vertical)` no longer declares width in its transition list. Global PRM gate strips width from transition-property → instant snap when reduced-motion is set.

**Lane B — DockPopover collapse onto HoverPopover** (W0 amendment §F item 3): retired `<DockPopover>` (256 LOC). `<HoverPopover>` (v0.7.0) gains `keepDockOpen` extension prop wiring `dockKeepOpen` / `dockRelease` injects + `data-glass-dock-portal` / `data-glass-dock-owner` markers. `GlassDock` provides `glassDockId`. Retired the `.dock-popover` substrate + `pop-up-*`/`pop-down-*` keyframes (~70 LOC), `--dock-motion-popover-*` aliases, `DockPopoverRegistration` interface + `registerPopover`/`closeOtherPopovers` from `dockContext` (HoverCard's pointer-leave timer handles cluster transit natively). 3 demo consumers migrated in `demo/stories/navigation/dock.vue`.

**Lane C — overflow scroll + blur reduction**: `--glass-blur-dock-radius` 1px → 0px; dropped `saturate(1.025)`. Added `--dock-max-inline-size: min(80vw, 64rem)` + `--dock-max-block-size: min(80vh, 48rem)`. Applied `max-inline-size` to root + `max-block-size` to vertical rails. Added `.glass-dock.expanded:not(.dock-wrap) > .dock-layers { overflow-x: auto; mask-image: linear-gradient(...); scrollbar-width: thin }`. Vertical-rail `scrollbar-width: none` → `thin` + mask-fade-y. Step 3 (INTERNAL_CATEGORY gate) DROPPED per W0 amendment §F item 5.

Hard-gate verification (Playwright via MCP): 50 frames over 500ms confirm continuous interpolation; 3 viewports (375×667, 1024×768, 1440×900) confirm overflow scroll without clip; reduced-motion probe confirms instant snap (t=8ms).

Proof docs: `audit/W3-A-collapse-proof.md`, `audit/W3-B-popover-proof.md`, `audit/W3-C-overflow-blur-proof.md`.

## 2026-05-06 — W4 close

W4 (Configurator unification + aurora/blob refinement) ran 3 parallel lanes (disjoint bounds).

**Lane A — `<Configurator>` primitive + demo PresetEditor rename**: per W0 amendment §F item 2, the demo's existing `Configurator.vue` (token-editor) renamed to `PresetEditor.vue` (+ ConfiguratorField → PresetEditorField, useConfigurator → usePresetEditor); 1 consumer (`demo/layout/AppShell.vue`) updated. New public primitive at `src/components/custom/configurator/`: `<Configurator>` (host with stage/presets/controls/footer slots; `presets`/`activePreset`/`layers`/`activeLayer`/`scrollMode` props; `select-preset`/`select-layer`/`reset` emits) + `<ConfiguratorLayer>` (collapsible section) + `<ConfiguratorRow>` (labeled control row composing `<LabeledField>`) + `useConfiguratorState<T>` (generic preset-state composable). Per-package subpath at `@mkbabb/glass-ui/configurator`; entry added to `vite.library.ts`. Composes `glass-floating` (PRT-lift via existing @media block).

**Lane B — Aurora chrome refit + clip/black-bar fixes**: aurora studio now consumes `<Configurator>` from Lane A (slots: stage + controls; `scroll-mode="never"` cedes scroll to AuroraConfigDock's sticky-tabs structure). `<BouncyToggle>` ships `overflow?: "none" | "scroll" | "auto"` prop; `"scroll"` switches from inline-grid to flex + `.scroll-fade-mask` + `.scrollbar-hidden`. AuroraConfigDock's BouncyTabs consumes `overflow="scroll"` (was inline-grid 1fr-shrink truncating "Nuclei"). PaletteLayer's `min-w-[320px]` clip absorbed via configurator scroll-fade-y on layer body. `PresetPickerRow` `bg-muted` → `bg-transparent` + `<Skeleton variant="shimmer">` placeholder during cold-load. PRT honor canonical via `glass-floating`. Playwright probes at 3 viewports captured to `audit/screens/w4-b-aurora-{1024x768,1440x900,375x667}.png` (PNG ignored by gitignore — proof doc cites paths).

**Lane C — Metaballs configurator + speedtest preset**: scope-reveal — "blob" was renamed to "metaballs" before master diverged from J planning baseline. `demo/stories/motion/metaballs.vue` refactored from static specimens to full `<Configurator>` consumption with 7 layers (6 metaballs axes + Output) and 3 presets. `useMetaballs` gains `prefers-reduced-motion` + `prefers-reduced-transparency` gates. `auroraPresets.SPEEDTEST` added as 12th aurora preset using live `../speedtest/src/config/auroraConfig.ts` source (matches R2 §D byte-for-byte; reactive light/dark + idle/running alpha fork stays in speedtest per `feedback_presets_in_consumer`). R2 7-axis ↔ metaballs API mapping documented in proof doc (noise channel folds into Motion since metaballs uses deterministic phi/√2/√3 oscillation; 7th layer surfaces `bgAlpha` as Output).

Hard-gate verification: typecheck green; build green (17.70s); 269/269 tests pass (-1 vs W2 baseline = DockPopover variant test removed in W3.B).

Proof docs: `audit/W4-A-configurator-primitive-proof.md`, `audit/W4-B-aurora-refit-proof.md`, `audit/W4-C-blob-preset-proof.md`.

## 2026-05-06 — Process incident

W4.A agent ran `git stash --keep-index --include-untracked` followed by `git stash pop` as a state-inspection probe — a violation of LESSONS-LEARNED 2026-05-04 "Never Use Git Stash As Agent Recovery". The stash captured parallel-lane unstaged work alongside its own; the pop failed mid-application on `useMetaballs.ts` conflict. Recovered surgically via `git checkout stash@{0} -- <my-files>`. Net data impact: zero — `MetaballCanvas.vue` was overwritten by partial pop with content equal to its pre-stash on-disk state. Stash@{0} dropped at orchestrator close (was redundant snapshot of working tree). Logged to W4.A proof doc; J FINAL.md will absorb as a reinforcement note.

W3 Lane B agent reports a separate "external rollback between tool calls" — likely the parallel W4 agents' partial writes intersected with W3's dock work; recovered via Edit tool surgically (no git stash use). No precept violation.

## 2026-05-06 — W5 close

W5 (form primitives + StoryChassis) ran 3 parallel agents (Lane A+C sequenced; Lane B; Lane D).

**Lane A — `sliderVariants` CVA built from scratch** (W0 amendment §F item 7): no `sliderVariants` CVA existed at HEAD; built fresh with 5 variants × 3 sizes:
- Variants: `standard | spectrum | timeline | glass-pill | glass-cartoon`
- Sizes: `sm` (4px/12px) | `md` (6px/16px) | `lg` (12px/24px)
- `Slider.vue` consumes `cn(sliderVariants({ variant, size }))`; emits `data-variant` + `data-size` on root for scoped-CSS substrate recipes.
- `glass-pill` ships hover halo via `--surface-tint-12`, denser gradient range, `--scale-press-btn` active scale.
- Bespoke `:focus-visible { outline: none }` strip retired — `.focus-ring` composes from CVA base.
- Story migrated to a 5×3 matrix demo.

**Lane C — Drag-keep-open visual feedback** (R6 cornerstone-3 contract WIRE):
- `useDockState` lifts `keepOpenCount` to a reactive ref, derives `isHeld: ComputedRef<boolean>`, provides `dockHeld` alongside the existing `dockKeepOpen`/`dockRelease` callable pair.
- `<GlassDock>` binds `:data-held` on root; `dock.css` `.glass-dock[data-held]` lifts background to `--glass-bg-floating` + quiets border.
- `Slider.vue` injects `dockHeld`, acquires/releases the keep-open token across pointerdown → window pointerup/pointercancel; reflects `data-held` on root for halo intensification. New `keepDockOpen` prop (default `true`).
- This proves the W3 dock-keep-open API surface beyond DockPopover (now a 2-consumer mature substrate).

**Lane B — NumberField pill radius + Button-as-child** (R3 §B + §F):
- NumberField default `border-radius`: `rounded-md` → `rounded-input` (10px via `--radius-input`).
- `<NumberFieldIncrement>` + `<NumberFieldDecrement>` compose `<Button asChild variant="ghost" size="icon">` — inherits canonical four-state Button contract (focus-visible, hover, active-press, disabled).
- I.W3.β provide/inject contract preserved (Tabs precedent); reka-ui primitive's `asChild` merges props/handlers/aria onto Button child.
- Scope reveal: no cartoon variant CVA at HEAD (W5.md prescription was stale); single-axis number-field at HEAD.

**Lane D — `<StoryChassis>` substrate — DEFERRED** (W0 amendment §F item 8):
- Step 0 chassis-pattern re-survey at HEAD: **count = 0**.
- R3-cited primitives `<CreamSurface>`, `<DisplayHero>`, `<FlourishDivider>` don't exist at HEAD (`rg -l` returns 0 hits in `src/`+`demo/`) — substrate Lane D was meant to compose is gone.
- Existing chassis abstraction is `<StoryPage>` (78/90 stories already migrated upstream).
- Lane D defers per substrate-without-consumer guard. Audit notes a separate finding: 8 stories use raw `rounded-card border bg-card shadow-cartoon` inline tiles where `<CartoonCard>` is the canonical substrate (forwarded to W7 audit lane β or K-tranche convergence).

Hard-gate verification: `npm run typecheck` green; `npm run build` green; `npm run test` 269/269.

Proof docs: `audit/W5-A-slider-cva-proof.md`, `audit/W5-B-numberfield-proof.md`, `audit/W5-C-drag-keep-open-proof.md`, `audit/W5-D-story-chassis-{survey,proof}.md`.

## 2026-05-06 — W6 close

W6 (data + composition refinement) ran 3 parallel agents (Lane A; Lane B+C.1 combined — same demo/stories/data/search.vue territory; Lane C.2).

**Lane A — Badge size axis + tone reconcile** (R4 §A):
- `badgeVariants` gains size axis: `sm` (text-xs) | `md` default (text-sm) | `lg` (text-base) — reconciles the row-text vs status-cell baseline drift.
- Status-cell badge in `demo/stories/data/table.vue` consumes `size="md"` — visual baseline matches `text-sm` row text (finding 15).
- Tone reconcile: **Option B** (DESIGN.md). `badgeToneVariants` does not exist in canon (R4 cited a non-existent CVA); the section-tone tint recipe (`bg-section-N/15 text-section-N border-section-N/30`) documented in DESIGN.md `## Badges § Section-tone recipe` as the canonical table-cell composition.

**Lane B — FuzzySearch gestalt rewrite** (R4 §B; J invariant 7):
- `src/components/custom/search/FuzzySearch.vue` collapsed **600 → 158 LOC** (-73.7%, well under ≤200 ceiling).
- Composes canonical primitives: `<Popover>` + `<PopoverContent portal={false}>` for inline result list; `<Dialog>` + `<DialogContent variant="opaque">` for modal mode; `<Button variant="ghost" size="icon">` for actions; `<Badge variant="secondary">` for type chips; `.input-bar` chrome; `.kbd` for footer hints; `.interactive-item` for result-row hover/focus.
- Dropped 330-line `<style scoped>` block — every recipe now lives in canonical utilities.
- Public API preserved (consumer-facing props/events/emits unchanged). Highlight test updated with `attachTo: document.body` + `flushPromises()` for reka-ui pipeline flush.

**Lane C.1 — clearSearchCache rename + danger-subtle Button retire** (R4 §C; J invariant 8):
- `danger-subtle` Button variant retired (1 consumer, 4.28:1 light / 3.1:1 dark — fails WCAG AA). Subsumed by `destructive` (4.52:1 light / 8.72:1 dark — clears AA, AAA in dark).
- Demo's clearCache button: `variant="destructive" size="sm"` + `<Trash2>` icon + label "Clear cache".
- Lib export `clearSearchCache` PRESERVED per R4 §C invariant (3 external consumer trees depend on the lib name); consumer aliases via `import { clearSearchCache as clearCache }`.
- All consumer-visible identifiers renamed (handler, label, aria, ledger column, last-helper string, row label).
- `demo/stories/primitives/buttons.vue` dropped `danger-subtle` from `coreVariants` array.

**Lane C.2 — CarouselPager substrate** (R4 §D; J invariant 6 — `<CarouselPager>` is the 3rd named new component):
- 3 new substrate primitives at `src/components/ui/carousel/`:
  - `<CarouselPager>` (94 LOC) — chevron prev/next + slide counter via `<Button variant="ghost" size="icon">`; `useCarousel()` integration; orientation-aware icons.
  - `<CarouselDots>` (78 LOC) — one `role=tab` button per snap; active dot lifts via `--scale-hover` + `bg-foreground`; inactive `bg-[var(--muted-medium)]`; orientation-aware.
  - `<GlassCarouselPager>` (127 LOC) — audacious variant with cartoon-shadow counter pill + outline-variant chevrons; `#trailing` slot for sibling toggles; loop-aware boundary semantics.
- Basic pager in `demo/stories/navigation/carousel.vue` retired; consumes `<CarouselPager>` + `<CarouselDots>`.
- Audacious pager in `demo/stories/containers/glass-carousel.vue:127-157` retired; consumes `<GlassCarouselPager>`.

Hard-gate verification: `npm run typecheck` green; `npm run build` green; `npm run test` 269/269 (FuzzySearch test passes post-rewrite with attachTo+flushPromises).

Proof docs: `audit/W6-A-badge-proof.md`, `audit/W6-B-fuzzy-search-proof.md`, `audit/W6-C1-clearcache-proof.md`, `audit/W6-C2-carousel-pager-proof.md`.

## 2026-05-06 — W7 close ceremony

W7 ran the strengthened 6-agent post-close audit (α/β/γ/δ/ε/π) per W0 precept update — first tranche to use the strengthened pattern.

**Audit summary** (each lane wrote `audit/J-audit-{α,β,γ,δ,ε,π}-*.md`):

- **α plan-vs-actual**: 12/12 J invariants satisfied (5 MET, 7 MET-WITH-AMENDMENT per W0 §F); 9/10 close criteria met (the 10th is the audit itself, by definition); 0 MISSED, 0 OUT-OF-SPEC. Top P1 findings: 2 git-stash violations during W1 + W4.A; W2 per-story consumption sweep deferred (W7 δ ran it); 3 historical-context recovery-diary hits (γ adjudicated).
- **β substrate-without-consumer + visual-load-bearing-ness**: 11 sub-bar rows; **1 P0 visual REGRESSION** — `<CarouselPager>` runtime mount error at `/navigation/carousel` (`useCarousel must be used within a <Carousel />`); `<CarouselDots>` collateral; `<GlassCarouselPager>` not-probed. Plus 1 P1 — `.overlay-scrim` @utility shadowed by canonical `bg-overlay-scrim` Tailwind utility (0 consumers reach the @utility definition).
- **γ doc-drift**: DESIGN 7 + CLAUDE 11 + README 7 drift items; wave-spec status lines stale; recovery-diary scrub strict violation (3 hits in src/).
- **δ idiomatic gestalt + per-story consumption sweep**: 14 bypass findings (2 MEDIUM, 12 LOW, 0 HIGH); top concerns: `dock.css:763` hardcodes `600ms` (W1 token bypass); `demo/configurator/PresetEditor*.vue` re-assemble focus-ring + scale recipes inline; `cssVar()` 1 consumer (≤ ≥ 2 bar); `--{success,warning,info}-foreground` 0 consumers (substrate-without-immediate-consumer).
- **ε performance**: bundle delta **−37,861 B raw / −6,199 B gzip (-8.33% / -5.19%)** vs pre-J baseline (FuzzySearch rewrite + W2 vocab consolidation + DockPopover retire); 269/269 tests; build 17.59s; **P1 — bundle-budget gate dropped during v0.8.0 consolidation** (would PASS at current numbers; needs re-land for I invariant 8 enforcement); P2 — configurator subpath missing from `typesVersions["*"]`; ay-close + stress-harness reappearance flagged.
- **π visual-runtime (multi-viewport)**: 27 screenshots across 11 stories × 3 viewports; dock collapse 20-frame sample confirms continuous interpolation (no jerk); HoverPopover open ~250ms; clearCache button **6.55 : 1** contrast (was 3.0 pre-J — finding 17 verified); Slider thumb **16.5 : 1**; Badge variants AAA in dark. **P0** — same `/navigation/carousel` blank render as β. **P1** — top story-pager dock at 375 viewport overflows by 4px (truncates label). **P2** — GlassCarousel audacious pager chevrons at x=1050 unreachable on mobile.

**W7 absorbs** (orchestrator-direct edits within close commit):

1. **P0 carousel demo bug** (β + π): `demo/stories/navigation/carousel.vue:114-116` — moved `<CarouselPager>` inside its `<Carousel>` parent (was outside, causing the `useCarousel must be used within a <Carousel />` injection error).
2. **Recovery-diary scrub** (γ + α): cleaned 3 historical-context hits — `src/index.ts:5,12` (dropped `(O.W2.7)` + `(J.W4.A)` annotations), `src/styles/tokens.css:339-342` (rewrote blur-token history comment without tranche citations), `src/styles/tokens.css:370-376` (rewrote dock-opacity history comment without tranche citations). Final scrub: zero hits in src/ + demo/.
3. **dock.css token consumption** (δ): `src/styles/dock.css:763` — `600ms` → `var(--duration-sparkle)`.
4. **PresetEditor raw-recipe convergence** (δ): `demo/configurator/PresetEditor.vue:118` + `demo/configurator/PresetEditorField.vue:35` — replaced raw `focus-visible:shadow-[var(--focus-ring-shadow)]` + `active:scale-[0.97]` with canonical `.focus-ring` + `--scale-press-btn` consumption.
5. **Wave-spec status lines** (γ): `docs/tranches/J/waves/W{0..7}.md` — every `**Status**` line updated to `closed @ <commit>` (W7 → `in-progress`).
6. **J.md Wave Schedule status column** (γ): every row's status updated to closed-with-commit.
7. **DESIGN.md drift**: removed `danger-subtle` from Button variant table + semantic-variant doc; removed `DockPopover` from dock components table + catalog; added `Configurator` family to catalog; expanded Slider section with size axis + glass-pill / glass-cartoon variants + keepDockOpen prop documentation; added retirement note.
8. **package.json**: added `./configurator` subpath to exports + typesVersions.

**Residuals carried forward** (not absorbed in W7; named destinations):

- **CLAUDE.md major refresh** — file-tree section + subpath section + Design Axes section need J-state alignment (11 drift items per γ). Defer to a doc-only commit (CLAUDE.md is documentation of structure, not gating).
- **README.md drift** — 7 drift items; defer.
- **Bundle-budget gate re-land** — I invariant 8 enforcement; `npm run profile:budget` script + GitHub workflow job + BUDGETS table. Should land as a follow-up commit before next tranche (would PASS at current numbers per ε).
- **5 demo stories raw `focus-visible:shadow-[var(--focus-ring-shadow)]`** — vocab.γ residue; sub-tranche K candidate.
- **3 demo `--surface-tint` bypasses** — vocab.γ residue; K candidate.
- **`motion/stagger.vue:59` `transition-all` survivor** — single site; K residue.
- **`--{success,warning,info}-foreground` 0 consumers** — W1 substrate-without-immediate-consumer; either wire (Notification.vue refit) or formally retire in K.
- **`cssVar()` ≥ 2 bar** — 1 consumer (BouncyToggle); add second consumer in K (e.g., other WAAPI sites) or retire.
- **`.overlay-scrim` @utility** — shadowed by canonical Tailwind utility; retire in K.
- **Top story-pager dock 4px overflow at 375 viewport** — π P1; mobile-viewport refinement; K candidate.
- **GlassCarousel audacious pager chevrons unreachable on mobile** — π P2; K candidate.
- **Stress harness retire decision** — ε P2; either restore (per I.W6) or formally retire.
- **`ay-close` reappearance** — ε P2; cross-ref with v0.8.0 consolidation history.
- **Audacious primary-CTA variant** — formally deferred to K per J.md cross-tranche debt section.

**Process incidents (precept reinforcement candidates)**:

Two `git stash` violations during J despite the LESSONS-LEARNED 2026-05-04 binding rule. Both agents recovered surgically with no data loss; net impact zero. Worth a precept reinforcement entry — pattern recurrence suggests dispatch-template clause needs sharper teeth (e.g., "If you find yourself reaching for `git stash`, halt and report instead").

## Status

| Wave | Status |
|---|---|
| W0 | closed @ d8239f2 |
| W1 | closed @ c6b7df0 |
| W2 | closed @ e563d7a |
| W3 | closed @ deba31d |
| W4 | closed @ 499326a |
| W5 | closed @ 3a4371d |
| W6 | closed @ 76525e1 |
| W7 | closed @ commit (this commit) — strengthened 6-agent audit ran; findings absorbed; FINAL.md authored |
