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
- W2: planned (unblocked by W1; open next)
- W3: planned (blocked-by W2)
- W4: planned (blocked-by W3)
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

### W2 close (open)
### W3 close (open)
### W4 close (open)
### W5 close (open)
