# D — Progress Log

Dated execution log for tranche D — Substrate-with-Consumer. Updated at every wave boundary per bbnf-lang SPEC §"Wave status updates at every boundary".

## 2026-04-29 — Tranche open

- Plan landed at `docs/tranches/D/D.md` (commit `9d6d156`); E.md folded F into a single tranche at commit `311c3ed`.
- Research wave artefacts at `docs/tranches/D/research/` (7 files; 6 parallel research agents A1-A6 dispatched 2026-04-28).
- Per-wave specs at `docs/tranches/D/waves/W{0..5}.md`.
- Sub-agent dispatch boilerplate at `docs/tranches/D/dispatch/AGENT.md`.
- Handoff document at `docs/tranches/D/HANDOFF.md` — orchestrator entry point.

## State at handoff

- `c-close` tag at commit `2b31920`.
- Master clean; typecheck + build clean.
- 5 D-tagged tasks tracked (W0 → W5) with sequential `blockedBy` chain.

## Wave statuses

- W0: complete
- W1: complete
- W2: complete
- W3: complete
- W4: planned (unblocked by W3; open next)
- W5: planned (blocked-by W4)

## Cross-tranche debt entering D

Per `docs/tranches/C/FINAL.md` and SYNTHESIS:

- 101 library-orphan candidates from C.W0.A (W0.A re-run expected to flip ~10-15 to `keep` due to known false negatives — sortable-list, timeline, infinite-scroll, plus composable re-export-chain hits).
- 21 current-consumer evidence candidates (typography + utilities; resolved at W3).
- 4 already-deleted items (D.W0/W2.E verifies cascade through `src/index.ts`).
- ~20 façade ui passthrough wrappers from A3 hunt (W0.C enumerates; W2.B deletes per re-grep).
- Sidebar composables wrongly nested at `src/components/custom/sidebar/composables/` (W0.D plans hoist; W2.C executes).
- Velocity gap (W4 ships Vitest + tsconfig.src + vite.iter + three-tier scripts).
- Reduced-motion CDP gap (forwarded to E.W4.B with direct Playwright).
- Kind-aware navigation pattern docs (carried to W3 current-consumer evidence as `flat-route-contract.md`).

## Wave-close entries

(Populated as waves close. See bbnf-lang SPEC §"Wave verification ledger" for required content per close.)

### W0 close (2026-04-30)

Commits:

- `f76c1b8` — D.W0.A.1 hardened `src/components/ui/` audit.
- `ca49a1a` — D.W0.A.2 hardened `src/components/custom/` audit.
- `db91793` — D.W0.A.3 hardened `src/composables/` audit; normalized by `b120e23` after current-master scope reveal.
- `492b9a4` — D.W0.A.4 hardened `src/styles/` audit.
- `d512ac3` — D.W0.C/D/E façade list, sidebar hoist plan, and file-bounds audit.
- `b120e23` — integrated W0 audit, C-forwarded triage, and already-resolved ledger.

Artefacts:

- `docs/tranches/D/audit/W0-overfitting-{ui,custom,composables,styles}.md`
- `docs/tranches/D/audit/W0-overfitting.md`
- `docs/tranches/D/audit/W0-triage.md`
- `docs/tranches/D/audit/W0-already-resolved.md`
- `docs/tranches/D/audit/W0-facade-list.md`
- `docs/tranches/D/audit/W0-sidebar-plan.md`
- `docs/tranches/D/audit/W0-file-bounds.md`

Gate evidence:

- 10 W0 audit/planning docs exist under `docs/tranches/D/audit/`.
- C-forwarded arithmetic closed: `W0-already-resolved.md` 36 rows + `W0-triage.md` 65 rows = 101.
- W0 triage action distribution: `wire` 12, `keep-current` 21, `delete` 32.
- Façade verdicts assigned: 29 `keep-as-wired-facade`, 39 `delete`.
- Sidebar decision recorded as hoist to `src/composables/sidebar/`.
- W1/W2 file-bounds intersection remains empty.
- `git diff --check` and `git diff --cached --check` passed for the W0 integration commit.
- `npm run typecheck` passed on 2026-04-30.
- `npm run build` passed on 2026-04-30; output `dist/glass-ui.js 378.58 kB`, `dist/glass-ui.css 39.81 kB`.

Scope reveal:

- `6104ebb` landed on `master` while W0 agents were running and deleted `useWatercolorBlob`, `useClipboard`/`copyToClipboard`, and `useCharSplit`.
- The composables audit was re-grounded on current `master`; deleted rows moved to `W0-already-resolved.md`.
- `hashString`, `mulberry32`, `radiiToCSS`, and `randomRadii` changed to W2 delete candidates because their only source consumer disappeared.
- W1/W2 wave specs were amended at W0 close so dispatch uses the binding W0 ledger: W1 wires the 12 `wire` rows; W2 absorbs the 32 composable delete rows plus the 39 façade deletions and style recheck.

### W1 close (2026-04-30)

Commits:

- `974a49c` — D.W1.A search story for `FuzzySearch`, `buildIndex`, and `clearSearchCache`.
- `5a52be2` — D.W1.B `GlassCarousel` story plus sortable handle/context coverage.
- `5bc8f38` — D.W1.C `GlassPanel`, `MetaballCanvas`, and `useMetaballs` story coverage.
- `527f2c3` — D.W1.D dock select/dropdown trigger coverage.
- `2db79b1` — D.W1.E ToggleChip route verification affordances.

Artefacts:

- `demo/stories/data/search.vue`
- `demo/stories/containers/glass-carousel.vue`
- `demo/stories/motion/metaballs.vue`
- `docs/tranches/D/audit/W1-playwright-evals.md`

Gate evidence:

- All 12 W0 `wire` rows now have story consumers: `FuzzySearch`, `buildIndex`, `clearSearchCache`, `GlassCarousel`, `GlassCarouselItem`, `useGlassCarousel`, `GlassPanel`, `MetaballCanvas`, `useMetaballs`, `DockDropdownTrigger`, `DockSelectTrigger`, `ToggleChip`.
- Manifest row delta: 3 new routes (`data/search`, `containers/glass-carousel`, `motion/metaballs`).
- Focused browser checks passed for search, carousel, sortable context, glass panel, metaballs, ToggleChip, dock layers, and dock trigger routes.
- Full manifest route walk: 71/71 routes rendered with no story fallback and zero captured console errors.
- `npm run typecheck` passed on 2026-04-30.
- `npm run build` passed on 2026-04-30; output `dist/glass-ui.js 378.58 kB`, `dist/glass-ui.css 39.81 kB`.

Notes:

- D.W1.C scope had an accidental main-checkout edit from a worker. The orchestrator validated, committed, and closed it as `5bc8f38`; the worker was stopped before committing its partial worktree copy.

### W2 close (2026-04-30)

Commits:

- `0b66855` — D.W2.C sidebar composables hoisted to `src/composables/sidebar/`.
- `0f4e3d1` — D.W2.B zero-consumer ui façade deletes.
- `b0debec` — D.W2.D zero-site style-surface deletes.
- `698d022` — D.W2.A orphan composable export deletes.
- `a9291f6` — D.W2.A scope reveal restore for `useAnimatedNumber` speedtest consumers.
- `8ec807b` — D.W2.A scope reveal restore for `useDarkModeSync` speedtest consumer.
- `42db7bc` — D.W2.E public-surface count reconciliation in `CLAUDE.md`.

Artefacts:

- `docs/tranches/D/audit/W2-verification.md`
- `src/composables/sidebar/`
- `CLAUDE.md`

Gate evidence:

- `npm run typecheck` passed on 2026-04-30.
- `npm run build` passed on 2026-04-30; output `dist/glass-ui.js 369.04 kB` (`370036` bytes), `dist/glass-ui.css 39.81 kB` (`39809` bytes).
- Bundle delta: `c-close` `381.42 kB` → `d.W2` `369.04 kB` (`-12.38 kB`).
- Star re-export resolution check passed for `src/index.ts`, `src/components/index.ts`, `src/components/custom/index.ts`, `src/components/ui/index.ts`, and `src/composables/index.ts`.
- Sidebar old directory absent; stale import grep for `src/components/custom/sidebar/composables` was empty across `src/` and `demo/`.
- Actual-deleted symbol check: 33/33 absent from `dist/index.d.ts`.
- Consumer builds passed for `fourier-analysis/web`, `words/frontend`, and `bbnf-lang/playground`; additional speedtest build passed because W2.A surfaced current speedtest consumers.
- In-app browser manifest route walk: 71/71 routes rendered with no story fallback and zero new console errors.

Scope reveal:

- W2.B deleted 5 façade components and flipped 34 W0.C delete rows to keep-current after fresh consumer/source grep.
- W2.A restored `useAnimatedNumber`, `AnimatedNumber`, `UseAnimatedNumberOptions`, and `useDarkModeSync` after current speedtest grep surfaced live imports.
- W2.C required one demo import split: `ProgressiveSidebar` stays under `@/components/custom/sidebar`; `useSidebarState` comes from `@/composables/sidebar`.

### W3 close (2026-04-30)

Commits:

- `52194f2` — D.W3.B consumer-evidence README and overfitting-audit verdict-precedence binding.
- `fad212a` — D.W3.A 24 per-artefact current-consumer evidence docs.

Artefacts:

- `docs/consumer-evidence/README.md`
- `docs/consumer-evidence/*.md`
- `docs/tranches/D/audit/W3-verification.md`
- `docs/audits/overfitting-audit.md`

Gate evidence:

- Evidence docs excluding README: 24.
- README rows: 24; README links: 24; missing README links: 0.
- Per-doc `Proof` commands: 24/24 passed.
- Canned overfitting prompt references `docs/consumer-evidence/` and requires stale evidence to fall back to normal verdict precedence.
- `npm run typecheck` passed on 2026-04-30.
- `npm run build` passed on 2026-04-30; output `dist/glass-ui.js 370.04 kB`, `dist/glass-ui.css 39.81 kB`.

Scope notes:

- `useLeaveTimer` did not receive W3 evidence because W2 deleted its only consumer cascade.
- `isMac` was normalized from the stale W0 external-consumer claim to current source-consumer proof in `src/composables/useKeyboardShortcuts.ts`.

### W4 close (open)
### W5 close (open)
