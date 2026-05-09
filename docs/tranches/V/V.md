# V — Foundation Polish + Structural Unions + Storybook Expansion

V is the **convergence-and-expansion** tranche between J close (`5bcf1ce`) and K reconciliation (`23ce73c` / v0.9.0). Where J's W7 strengthened audit returned clean against the I-converged substrate, V swept the long-tail residuals J FINAL flagged as cross-tranche debt — orphan tokens, near-bit-identical scrim declarations, parallel menu-item + popover-animation vocabularies, density-rail rungs, typography ladder migrations — and expanded the public storybook surface to canonical chassis primitives + 23 promoted composables + token-tour pages.

**Authored retroactively at K.WV (2026-05-09)** per K invariant 3 (no tranche-letter shadow execution). The work shipped through commit messages and release notes between 2026-05-06 (`d62a836`, first V commit) and 2026-05-08 (`23ce73c`, v0.9.0); this plan folder closes the precept loop without rewriting history.

## Prelude

V opens against J close `5bcf1ce`; closes at `23ce73c` (v0.9.0). 68 commits total (the 2026-05-08 reconciliation cited 67; recount via `git log 0666be6..23ce73c --oneline | wc -l` returns 68 — see proof). Five mid-tranche releases:

- `cc5f07b` — v0.8.3 (containerName + MetricPill + stacked MetricBadge)
- `1a685ad` — v0.8.4 (composable promotion: useTokenColor + useStagger + useAnimatedNumberMap)
- `39f5cc5` — v0.8.5 (drop manual `-webkit-backdrop-filter` + release.sh tightening)
- `6dbb189` — v0.8.6 (bundled patches per audit a/b/c/d)
- `23ce73c` — v0.9.0 (V close — chassis primitives + 23 composables + structural unions + foundation polish)

V also shadowed the K plan: K was authored at `0666be6` (2026-05-06) but never dispatched. The V cohort landed on the same master branch, against the same J-close substrate, without K's awareness. The 2026-05-08 reconciliation (`docs/tranches/K/audit/K-reconciliation-2026-05-08.md`) found 5/38 K hard-gate items absorbed by V.

## Thesis

V is foundation-polish + structural-unions + storybook-expansion. Three lanes operating in parallel:

1. **V.W2 — foundation polish**. Token excise (12 orphan tokens — `afb2b34`); duplicate `--leading` / `--tracking` retired in favor of `--type-*` canon (`c5e56a1`); cartoon-shadow dual-system collapse (`52cb1d8`); typography ladder migrations (Card + Label + Dialog + Sheet + Drawer titles); radii sweep (toggle/button/avatar/badge); icon-size token rungs (`--icon-{2xl,3xl,hero}`); `--z-behind: -10` for Aurora background tier; `--opacity-disabled` bridge + 12-component sweep; `<Notification>` + `<Sheet>` + `<Button.glass>` consume canonical grammars; `<MetricPill>` + `containerName` prop on `<GlassDock>`.

2. **V.W3 — structural unions**. Eleven canonical primitive collapses: `<Section>`, `<ModalOverlay>` (3 scrim declarations), `<LabeledField>` (4 wrappers), `menuItemVariants` CVA (9 menu/picker primitives), density-rail unification (GlassDock + DockGroup + MetricPill onto `data-density`), popover-animation grammar (HoverPopover + floating-panel), `.popover-content` utility, surface-tint tier aliases (`--surface-tint-{quiet,floating,modal}`), active-state vocabulary canon (BouncyToggle + UnderlineTabs), focus-ring `.glass-btn` unified onto box-shadow form, menu-item three-state contract (data-`disabled` selectors).

3. **V.W4 — storybook + composables expansion**. Five chassis primitives (`<StorySection>`, `<ShowcaseFrame>`, `<DockShowcaseFrame>`, `<TokenLadder>`, `<ToneSwatch>`); `useStoryDemo` canonical play/reset/status harness; 9 missing primitive entries; 24 composable storybook entries (the public surface documented for the first time); 3 token-tour foundation pages (Surface Tints / Overlays & Scrims / Chart & Chassis Palette); `<Toaster>` story; Badge variants demo; Toast story tone migration; storybook smoke-gate test (`6667370` — V.W4.T16).

The substrate is the same J converged. V refines, collapses, and exposes — without extending the design-language axes.

## Binding Invariants

V was dispatched (insofar as it was dispatched) without a written plan. The invariants below are derived retroactively from the commit log + release-note semantics:

1. **C–J precepts still bind** — KISS, no quick fixes, no workarounds, no legacy code, no silent deferrals, consumed substrate, evidence > claims. Inherited from J FINAL.

2. **Orphan-token excision is binary** — `afb2b34` excises 12 tokens with zero consumers (verified across `src/`, `demo/`, AND speedtest's `/Users/mkbabb/Programming/speedtest/src/`). No retain-with-rationale exceptions; if a token has no consumer at HEAD, it goes. (V.W2)

3. **Parallel-primitive collapse is the default** — 11+ structural unions land in V.W3. Where J converged the tokens, V collapses the primitives that consume them. No `_legacy` / `_old` / `-v1` survivors; clean breaks on every collapse.

4. **Storybook coverage is the canonical-consumption oracle** — V.W4 expands the public surface from "primitives shipped without story" to "every public primitive + composable has a story consuming canonical chassis primitives". The smoke-gate test (`6667370`) asserts manifest-vs-file integrity.

5. **Composable promotion requires consumer evidence** — v0.8.4 lifts `useTokenColor` + `useStagger` + `useAnimatedNumberMap` from speedtest (the consumer that authored them). v0.9.0 promotes 23 composables total; each ships with a storybook entry per V.W4.T9.

6. **Releases are bundled, not per-commit** — V ships 5 releases over ~3 weeks; each release groups a coherent cohort (v0.8.3 = MetricPill family; v0.8.4 = composable promotion; v0.8.5 = backdrop-filter dedup; v0.8.6 = audit a/b/c/d patch bundle; v0.9.0 = V close).

7. **Demo-private chrome is canonical-aware** — V.W4 chassis primitives (`<ShowcaseFrame>`, `<DockShowcaseFrame>`, `<StorySection>`, `<TokenLadder>`, `<ToneSwatch>`) live under `demo/stories/` not `src/`; they are demo-private chassis. Consumer migrations in V.W4 wire stories to these chassis without exposing them as library exports.

## Wave Schedule

| Wave | Title | Mode | Hard gate | Status |
|---|---|---|---|---|
| V.W2 | Foundation polish (v0.8.0 → v0.8.6) | sequential bundled cohort | 12 orphan tokens excised; duplicate type tokens retired; cartoon-shadow collapsed; typography ladder migrations; radii sweep; icon-size + z-behind tokens; opacity-disabled bridge + sweep; v0.8.3 / v0.8.4 / v0.8.5 / v0.8.6 releases tagged | closed @ `6dbb189` |
| V.W3 | Structural unions (v0.8.6 → v0.9.0) | sequential structural-union cohort | 11+ named collapses landed (Section, ModalOverlay, LabeledField, menuItemVariants, density-rail, popover-animation grammar, surface-tint aliases, active-state canon, popover-content utility, focus-ring glass-btn, menu-item three-state) | closed @ `7ed3b73` |
| V.W4 | Storybook + composables expansion (v0.9.0) | sequential storybook + composable cohort | 5 chassis primitives shipped; useStoryDemo + cleanup discipline; 9 missing primitive entries; 24 composable entries; 3 token-tour pages; smoke-gate test; v0.9.0 tagged | closed @ `23ce73c` |

V has no W0 (no formal dispatch precept update; that absence is the precept violation K invariant 3 codifies). V has no W1 (no formal preconditions wave; tokens land in V.W2 alongside their consumers). V has no W7 (no close ceremony; v0.9.0 ships without the 6-agent strengthened audit pattern J established). The K reconciliation (2026-05-08) substitutes for V's missing close.

## Absorbed-from-K-open ledger

Per the 2026-05-08 reconciliation, V incidentally absorbed 5/38 K hard-gate items (the K plan had been authored at `0666be6` but never dispatched; V landed on the same master branch):

| K wave | K gate | V commit | Disposition |
|---|---|---|---|
| W1.c | `<ConfiguratorLayer>` / `<ConfiguratorRow>` / `useConfiguratorState` ≥ 2 consumers OR retired | `fb38034` | ABSORBED — `demo/stories/primitives/configurator.vue` adds second consumer beyond `motion/metaballs.vue` |
| W2.a | `--{success,warning,info}-foreground` wired OR retired | `221d783` + `5dfe6fb` | ABSORBED — Notification + Badge consume |
| W2.c | `.overlay-scrim` @utility retired | `43bee82` | ABSORBED-WITH-RESIDUAL — `<ModalOverlay>` collapses 3 scrim declarations; raw @utility block dead-code at HEAD (formal-delete still pending in K W3) |
| W2.d | paper.css literal `hsl(48 …)` rungs migrated | (unattributed cleanup) | ABSORBED — `grep "hsl(" src/styles/paper.css` returns 0 hits at HEAD |
| W2.e | `<Tooltip>` consumes `rounded-tooltip` | (pre-K-open or unattributed) | ABSORBED — `TooltipContent.vue:27` uses `rounded-tooltip` at HEAD |

V also incidentally addressed 12 of K's 36 chronic-deferral substrate-without-consumer rows via `afb2b34` (orphan-token excise).

## Architectural transpositions executed

V landed 14 named architectural transpositions across W2 + W3 + W4:

### V.W2 cohort

1. **`<MetricPill>`** (`0601d62`, v0.8.3) — stacked taller-fatter pill primitive composing `<MetricBadge>` with stacked-pill defaults baked in; `density` knob lifted onto the pill.
2. **`containerName` prop on `<GlassDock>`** (`d62a836`, v0.8.3) — lifts container-query host onto the dock primitive.

### V.W3 cohort

3. **`<Section>`** (`d2247c8`) — sectioning primitive over the typography ladder; composes `text-heading` / `text-title` / `text-subheading` / `section-label`. Adds `.section-description` utility.
4. **`<ModalOverlay>`** (`43bee82`) — `_shared` SFC collapsing Dialog + DialogScroll + Sheet overlays onto a single SFC with `scrim × animate × layout` CVA-style props. Retires 3 near-bit-identical scrim declarations.
5. **`<LabeledField>`** (`05e1d44`) — parent SFC + `.labeled-field-label` utility; 4 sibling wrappers (LabeledInput, LabeledSelect, LabeledSlider, LabeledSwitch) compose internally.
6. **`menuItemVariants` CVA** (`6e6916e`) — shared `_shared` CVA collapsing 9 menu-family + picker-family items (DropdownMenu × 4, ContextMenu × 4, SelectItem, ComboboxItem, CommandItem).
7. **Density-rail unification** (`c3df06e`) — GlassDock + DockGroup + MetricPill migrate onto canonical `data-density="compact|comfortable|spacious|audacious"` attribute; retires `.density-{rung}` class form + MetricPill parallel vocabulary.
8. **Popover-animation grammar unification** (`7ed3b73`, `c0b8992`, `1841de5`) — HoverPopover + floating-panel + 2 W1 survivors collapse onto canonical `.popover-animate` + `.popover-content` utilities.
9. **Surface-tint tier aliases** (`44f2414`) — `--surface-tint-{quiet,floating,modal}` Theme bridges over the 9-rung surface-tint family.
10. **Active-state vocabulary canon** (`3e925e1`) — BouncyToggle + UnderlineTabs unified.
11. **Focus-ring `.glass-btn` unification** (`0187c7d`) — migrated to canonical box-shadow form.
12. **Menu-item three-state contract** (`2e01d68`) — explicit `data-[disabled]` selectors per menuItemVariants substrate.

### V.W4 cohort

13. **5 chassis primitives** (`227e1b0`, `deff97a`, `8136baf`, `60fd745`, `cfbcb48`) — `useStoryDemo`, `<StorySection>`, `<ShowcaseFrame>`, `<DockShowcaseFrame>`, `<TokenLadder>` + `<ToneSwatch>`. Demo-private; not exported from library.
14. **23 public composables documented** (`323d675`) — first storybook coverage for the composable surface; 24 entries land (23 V.W4-spec public + `useStoryDemo` from V.W4.T5).

## Composable promotions (v0.8.4)

`1a685ad` lifts three composables from speedtest into the library tier per the T-tranche audit-F architectural-gestalt §"Library gaps":

- **`useTokenColor`** (`a4959ef`) — read CSS custom property as ComputedRef + theme-aware fallback. Arguably supersedes `cssVar()` for reactive WAAPI-adjacent reads.
- **`useStagger`** (`4e28520`) — one-shot staggered reveal-flag array with cleanup-safe timer set.
- **`useAnimatedNumberMap`** (`16df6db`) — N-up `useAnimatedNumber` fan-out behind a Record-returning composable.

Subsequent V.W2 refinements: `useStagger` PRM brackets (`18aa1ca`), `useAnimatedNumber` clamp progress mode (`9d2b2ba`).

## Token expansion

V.W2 + V.W3 expand the design-token surface:

- **Icon-size rungs** — `--icon-2xl: 2rem` (`4cc8571`), `--icon-3xl: 2.5rem` (`a371fe7`), `--icon-hero: 3.5rem` (`4ebc597`).
- **`--z-behind: -10`** (`ee34655`) for Aurora background tier.
- **`--surface-tint-{quiet,floating,modal}`** tier aliases (`44f2414`).
- **`--opacity-disabled`** bridge + 12-component sweep (`a22f335`).
- **`.hairline-accent`** canonical token + utility (`b66891d`).
- **`--duration-shimmer`** offset documented (`4fb2102`).
- **Duplicate `--leading` / `--tracking` retired** in favor of `--type-*` canon (`c5e56a1`).
- **Theme bridges through `@theme`** for icon + z-behind tokens (`a6aac47`).

## Test + tooling

- **Resource hints + `.browserslistrc`** (`08ffbde`) — preconnect to `api.fontshare.com` + browserslist floor.
- **Storybook smoke-gate** (`6667370` — V.W4.T16) — vitest variant exercising every story import; replaces the originally-spec'd Playwright smoke. Catches manifest-vs-file drift.
- **`-webkit-backdrop-filter` dedup** (v0.8.5 — `39f5cc5`) — drops manual prefixed declarations; lets Lightning CSS / autoprefixer emit the legacy form via browserslist requirement.

## Cross-tranche debt + named-destination residuals

V did not absorb every J FINAL residual. Items deferred (and absorbed by K):

- **HEADLINE: audacious primary-CTA** — `Button variant="primary-audacious"` extraction explicitly J-deferred to K. Not landed in V. **Destination**: K W6.
- **Dispatch precept hardening** — J's 2 `git stash` violations + recurrent dispatch friction. V did not update `docs/precepts/`. **Destination**: K W0.
- **Bundle-budget gate** — I invariant 8 enforcement (`npm run profile:budget` script + GitHub workflow + BUDGETS table). Regressed during v0.8.0 consolidation; not restored in V. **Destination**: K W4.
- **Doc-drift catch-up** — CLAUDE.md / README.md / DESIGN.md drift larger at v0.9.0 than at K open (11 V-tranche primitives + 23 composables + 5 chassis demo primitives unmentioned). **Destination**: K W4.
- **Aurora chrome `useAuroraStudio` parallel implementation** — V adds a third `<ConfiguratorRow>` consumer (the primitive story at `fb38034`), reaching the ≥ 2 bar; aurora retains `useAuroraStudio` + `AuroraConfigDock.vue` per per-preset clone semantics. **Destination**: deferred to L if Option-A unification is ever desired.
- **Vocab.γ second-pass** — 19 raw `color-mix(--foreground)` sites + 5 demo `focus-visible:shadow-[var(--focus-ring-shadow)]` + 4 `transition-all` survivors remain at V close. **Destination**: K W3.
- **Mobile-viewport fitness** — story-pager dock 4px overflow at 375 + GlassCarouselPager mobile-wrap. **Destination**: K W5.
- **Slider-in-GlassDock story-fidelity** — J W5.C contract proven at API level; no demo binds the visual coupling. **Destination**: K W7.
- **`cssVar()` retire-or-wire decision** — V.W2 promotes `useTokenColor` (arguably supersedes for WAAPI-reactive use); `cssVar()` retains 1 consumer (BouncyToggle). **Destination**: K W3.
- **`.overlay-scrim` @utility formal-delete** — `<ModalOverlay>` collapse leaves the @utility block dead at HEAD; not formally removed. **Destination**: K W3.

## Brittleness window

**None opened during V.** Each release shipped green; v0.8.5's `-webkit-backdrop-filter` dedup landed without breaking the design-fidelity gate (Lightning CSS regenerates the legacy form via browserslist).

## Process observations (folded retrospectively into K)

V shipped 68 commits + 5 releases over ~3 weeks without:
- a `docs/tranches/V/` plan-folder structure (NO V.md, NO waves/, NO FINAL.md);
- a formal dispatch wave (every commit landed direct-to-master without orchestrator-side wave gating);
- a close ceremony (no 6-agent strengthened audit; no plan-vs-actual; no substrate-without-consumer audit beyond the implicit `afb2b34` orphan-token sweep).

The work itself is high-quality; the process is precept-violating per K invariant 3 (no tranche-letter shadow execution). K W0 codifies the precept update; K.WV (this document) closes the historical loop retroactively.

## Authority

V closes retroactively at `23ce73c`. The successor is K — already open since `0666be6` (2026-05-06), reconciled at 2026-05-08. K's `audit/K-reconciliation-2026-05-08.md` walks V's deltas; K W0 binds the no-shadow-execution precept; K's remaining waves absorb V's cross-tranche debt.

V is the precept the next tranche learns from.
