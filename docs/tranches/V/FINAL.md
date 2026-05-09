# V — FINAL

**Tranche**: V — Foundation Polish + Structural Unions + Storybook Expansion.
**Opened**: 2026-05-06 (against J close `5bcf1ce`; first V commit `d62a836` 2026-05-06 20:45 EDT).
**Closed**: 2026-05-08 (`23ce73c` v0.9.0 release; 2026-05-08 01:51 EDT).
**Authored retroactively at**: K.WV — 2026-05-09.
**Authority**: V closes retroactively per K invariant 3 (no tranche-letter shadow execution). The work shipped in master between K open (`0666be6`) and HEAD (`23ce73c`); the documentation below closes the precept loop.

## Thesis

V is the foundation-polish + structural-unions + storybook-expansion tranche. Where J converged the substrate (post-I) via vocab.γ + α + β preconditions, V's V.W2 swept the long-tail residuals (orphan tokens, duplicate type tokens, cartoon-shadow dual-system, popover-class shadow-md double-stack, status-color foreground unwiring, opacity-disabled bridge), V.W3 collapsed parallel primitives onto canonical chassis (Section, ModalOverlay, LabeledField, menuItemVariants, density-rail, popover-animation grammar, surface-tint tier aliases, active-state canon), and V.W4 expanded the public storybook surface to 24 composable entries + 9 missing primitive entries + 5 demo-private chassis primitives + 3 token-tour pages.

V did NOT extend the design-language axes; it converged + exposed.

## Wave-by-wave commit chain

| Wave | Hashes | Status | Close evidence |
|---|---|---|---|
| V.W2 | `d62a836` → `6dbb189` (23 commits, 4 releases: v0.8.3 → v0.8.4 → v0.8.5 → v0.8.6) | closed @ `6dbb189` | v0.8.6 release commit; npm test 288/288 at v0.8.4 + audit-bundled patches at v0.8.6 |
| V.W3 | `2e01d68` → `7ed3b73` (26 commits, no mid-wave release) | closed @ `7ed3b73` | popover-animation grammar unification — last V.W3-flavor commit before V.W4 chassis primitives begin landing |
| V.W4 | `227e1b0` → `23ce73c` (14 commits, v0.9.0 release) | closed @ `23ce73c` | v0.9.0 release commit; npm test 311/311; speedtest npm run test:run:client 304/304; the v0.9.0 release notes name V.W2 / V.W3 / V.W4 explicitly |

Total cohort: 68 commits between K open `0666be6` (exclusive) and HEAD `23ce73c` (inclusive). The 2026-05-08 reconciliation cited 67 commits; recount via `git log 0666be6..23ce73c --oneline | wc -l` returns 68. The discrepancy is +1 (likely an off-by-one in the original count); the substantive cohort is unchanged.

## Substrate convergence stats

- **Orphan tokens excised**: 12 (`afb2b34`) — `--duration-{linger,popup-swap,shimmer-slow}`, `--easing-accent`, `--shadow-cartoon-color-hover{,-soft}` (light + dark mirrors), `--motion-slide-{sm,md,lg}`, `--popover-offset`. Verified zero-consumer across `src/`, `demo/`, AND `/Users/mkbabb/Programming/speedtest/src/` + `/server/`.
- **Tokens added**: `--icon-{2xl,3xl,hero}`, `--z-behind`, `--surface-tint-{quiet,floating,modal}`, `--opacity-disabled`, `.hairline-accent` (token + utility), `--metric-badge-min-height-stacked`, `--metric-badge-padding-block-stacked`. `--duration-shimmer` documented in-place (preserves runtime).
- **Duplicate tokens retired**: `--leading` / `--tracking` retired in favor of `--type-*` canon (`c5e56a1`).
- **Primitives collapsed**: 11+ canonical primitive collapses (V.W3) — `<ModalOverlay>` (3 scrims), `menuItemVariants` (9 menu/picker items), `<LabeledField>` (4 wrappers), density-rail (3 cluster-shells), popover-animation grammar (4 popover surfaces), surface-tint aliases, active-state canon (BouncyToggle + UnderlineTabs), focus-ring `.glass-btn` unification, menu-item three-state contract, `.popover-content` utility, `<Section>` sectioning primitive.
- **Composables promoted** (v0.8.4): `useTokenColor` + `useStagger` + `useAnimatedNumberMap`. Plus `useStagger` PRM brackets (`18aa1ca`) + `useAnimatedNumber` clamp progress mode (`9d2b2ba`).
- **Public composables documented in storybook** (v0.9.0): 23 composables (24 entries including `useStoryDemo`). First storybook coverage of the composable surface.
- **Chassis primitives shipped** (V.W4): 5 demo-private — `<StorySection>`, `<ShowcaseFrame>`, `<DockShowcaseFrame>`, `<TokenLadder>`, `<ToneSwatch>`.
- **Storybook entries added**: 9 missing primitive entries + 24 composable entries + 3 token-tour pages + `<Toaster>` + Badge variants demo = 38 storybook surface additions.
- **Test count delta**: 269/269 at J close → 311/311 at v0.9.0 (+42 tests over V cohort: +7 v0.8.3 + +12 v0.8.4 + +13 audit-cohort + +10 V.W4 storybook + storybook-smoke).

## Architectural transpositions executed (catalog)

V.W2 cohort:
1. `<MetricPill>` (`0601d62`, v0.8.3) — stacked-pill primitive composing `<MetricBadge>`.
2. `containerName` prop on `<GlassDock>` (`d62a836`, v0.8.3) — lifts container-query host onto dock primitive.

V.W3 cohort:
3. `<Section>` (`d2247c8`) — sectioning landmark over typography ladder. New `.section-description` utility.
4. `<ModalOverlay>` (`43bee82`) — `_shared` SFC over Dialog + DialogScroll + Sheet overlays; `scrim × animate × layout` CVA-style props.
5. `<LabeledField>` (`05e1d44`) — parent SFC + `.labeled-field-label` utility; 4 sibling wrappers compose.
6. `menuItemVariants` CVA (`6e6916e`) — collapses 9 menu-family + picker-family items.
7. Density-rail unification (`c3df06e`) — GlassDock + DockGroup + MetricPill onto `data-density`.
8. Popover-animation grammar (`7ed3b73`, `c0b8992`, `1841de5`) — HoverPopover + floating-panel + 2 W1 survivors onto canonical `.popover-animate` + `.popover-content`.
9. Surface-tint tier aliases (`44f2414`).
10. Active-state vocabulary canon (`3e925e1`) — BouncyToggle + UnderlineTabs.
11. Focus-ring `.glass-btn` unification (`0187c7d`) — box-shadow form.
12. Menu-item three-state contract (`2e01d68`) — explicit `data-[disabled]` selectors.

V.W4 cohort:
13. 5 chassis primitives (`227e1b0`, `deff97a`, `8136baf`, `60fd745`, `cfbcb48`).
14. 23 public composables documented (`323d675`).

## Cross-tranche debt absorbed

V incidentally absorbed 5/38 K hard-gate items (the K plan was authored at `0666be6` 2026-05-06; V landed on the same master branch without K dispatch):

- K W1.c (`<ConfiguratorLayer>` second consumer) — ABSORBED at `fb38034`.
- K W2.a (`--{success,warning,info}-foreground` wired) — ABSORBED at `221d783` + `5dfe6fb`.
- K W2.c (`.overlay-scrim` retired) — ABSORBED-WITH-RESIDUAL at `43bee82` (formal-delete deferred to K W3).
- K W2.d (paper.css literal hsl rungs) — ABSORBED via unattributed cleanup.
- K W2.e (`<Tooltip>` rounded-tooltip) — ABSORBED pre-V or via unattributed cleanup.

Plus 12 of K's 36 chronic-deferral substrate-without-consumer rows absorbed via `afb2b34` orphan-token excise.

## Cross-tranche debt + named-destination residuals

V did NOT absorb every J FINAL residual. Items deferred:

- **HEADLINE: audacious primary-CTA** (`Button variant="primary-audacious"`) — explicitly J-deferred. Not landed in V. **Destination**: K W6.
- **Dispatch precept hardening** — V did not update `docs/precepts/`; the V-tranche-itself existence is the precept-violation V.W0 should have addressed. **Destination**: K W0 (binds the no-shadow-execution clause).
- **Bundle-budget gate** — `npm run profile:budget` script + GitHub workflow + BUDGETS table; not restored in V. **Destination**: K W4.
- **Doc-drift catch-up** — CLAUDE.md / README.md / DESIGN.md drift LARGER at HEAD than at K open (11 V-tranche primitives + 23 composables + 5 chassis demo primitives unmentioned). **Destination**: K W4.
- **Aurora chrome `useAuroraStudio` parallel implementation** — V adds third `<ConfiguratorRow>` consumer (the primitive story at `fb38034`); aurora retains `useAuroraStudio` parallel chrome with per-preset clone semantics. **Destination**: deferred to L if Option-A unification is ever desired.
- **Vocab.γ second-pass** — 19 raw `color-mix(--foreground)` sites + 5 demo `focus-visible:shadow-[var(--focus-ring-shadow)]` + 4 `transition-all` survivors remain at V close. **Destination**: K W3.
- **Mobile-viewport fitness** — story-pager dock 4px overflow at 375 + GlassCarouselPager mobile-wrap. **Destination**: K W5.
- **Slider-in-GlassDock story-fidelity** — J W5.C contract proven at API; no demo binds visual coupling. **Destination**: K W7.
- **`cssVar()` retire-or-wire decision** — `useTokenColor` (V-promoted) arguably supersedes for WAAPI-reactive use; cssVar() retains 1 consumer (BouncyToggle). **Destination**: K W3 / K W8.
- **`.overlay-scrim` @utility formal-delete** — `<ModalOverlay>` collapse leaves @utility block dead at HEAD. **Destination**: K W3.

## Process observations

V shipped 68 commits + 5 releases over ~3 weeks **without**:

1. A `docs/tranches/V/` plan-folder structure. NO V.md, NO `waves/V.W{2,3,4}.md`, NO FINAL.md existed at v0.9.0 release time.
2. A formal dispatch wave. Every commit landed direct-to-master without orchestrator-side wave gating, agent-isolation worktrees, or hardened-agent-git clauses.
3. A close ceremony. No 6-agent strengthened post-close audit pattern (which J had codified in `docs/precepts/instructions/tranche/SPEC.md`); no plan-vs-actual audit; no substrate-without-consumer audit beyond the implicit `afb2b34` orphan-token sweep; no doc-drift audit; no idiomatic-gestalt audit; no performance audit; no visual-runtime probe.
4. A V-numbering convention applied at commit-message granularity until the very end. Only `6667370` (V.W4.T16 smoke gate) and `23ce73c` (v0.9.0 release notes) reference V.W2 / V.W3 / V.W4 explicitly. The intermediate commits don't cite V at all — they cite tranche-T audit cohorts (e.g., "T audit F", "audit a/b/c/d") or feature names.

The work itself is high-quality (68 commits over 2.5 days; 5 releases; 311/311 tests passing; 11 architectural transpositions; 23 composables documented). The **process** is precept-violating per K invariant 3 (no tranche-letter shadow execution).

This pattern recurrence — J had 2 `git stash` violations under "as recovery mechanism" loophole; V had a whole-tranche shadow-execution — drove K W0 to codify both:

- Hardened agent git clause (binding non-negotiable; the 2 J `stash` violations).
- No-shadow-execution clause (every cohort of work ≥ 1 release ships under a plan-folder structure; the V tranche existence is the canonical precedent for the binding).

## Authority

V closes retroactively at HEAD `23ce73c`. The successor is **K** — already open since `0666be6` (2026-05-06), reconciled at 2026-05-08, currently executing waves W0..W8 + WV (this document) + WP + WS.

V's deltas are walked by `docs/tranches/K/audit/K-reconciliation-2026-05-08.md`. K invariant 3 (no tranche-letter shadow execution) is the binding precept that V's existence motivated; K invariant 4 (mandatory reconciliation at stale-baseline open) is the procedural addition. V is the precept the next tranche learns from.

`npm run typecheck` green at HEAD; `npm run build` green at HEAD; `npm run test` 311/311 at HEAD. The K reconciliation walks every V deliverable.

V is the converge-and-expose tranche. K is the converge-the-precept tranche.
