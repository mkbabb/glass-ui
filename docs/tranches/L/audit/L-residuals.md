# L Residuals — carry-forward to M

Post-W8 7-agent audit surface, with explicit M-tranche destination per L invariant 8 + 16. Items absorbed within W8 are NOT listed here (those are documented inline in the W8 close commit).

## P0 — none.

All Lane γ P0 items absorbed in W8 within-wave (wave-spec status lines W5/W7 + PROGRESS.md commit hashes + CHANGELOG.md v1.0 date + W7 section).

## P1 — none after W8 absorb.

7 Lane γ P1 items absorbed in W8:
- CHANGELOG.md v1.0 "unreleased" → "2026-05-11".
- CHANGELOG.md v1.0 added explicit `### BREAKING — Lane A (root-barrel curation)` enumeration.
- CHANGELOG.md v1.0 added explicit `### ADDED — Lane B (src/api/ discovery layer)` enumeration.
- CHANGELOG.md v1.0 added `### L.W7` section (keyframes lift + aurora unification + bug fix + Configurator-family second-consumer maturity).
- CLAUDE.md:73 useAuroraStudio reference updated to reflect W7 Lane B unification.
- DESIGN.md:770 useOffsetPagination removed from active composables table (retired W3 already documented at L 1020 + 1116).
- PROGRESS.md (TBD commit) placeholders → actual hashes (b75ebb2/d1de94b/fa6e6c7/aace84e/f481ba2/1c1788f/efb802a/ae4cad5/59b7b56).

## P2 — to M.

- **F-π-1** (β audit; chart-chassis-palette 375 overflow): `/foundations/chart-chassis-palette` overflows +38 px at 375. `TokenLadder layout="stacked"` 3-column grid cells lack `min-w-0` / `break-words`; long token labels exceed 54-px tracks. **Demo-side fix** in `demo/stories/foundations/chart-chassis-palette.vue` + possibly `demo/stories/foundations/token-ladder.vue` (chassis primitive).
- **F-π-2** (β audit; dashboard 375 + 1024 overflow): `/compositions/dashboard` overflows +134 px at 375 and +93 px at 1024. Dashboard 3-col grid children lack `min-w-0`; activity-feed `<span class="text-small flex-1">` lines force grid columns to max-content. **Demo-side fix** in `demo/stories/compositions/dashboard.vue`.
- **G4** (δ audit; composables/motion/index.ts barrel-style cosmetic): `motion/index.ts` uses explicit-named exports while sibling sub-tree barrels use `export *`. Cosmetic; doesn't break.
- **G14** (δ audit; ModalOverlay.vue:16 comment wording): describes `layout="edge"` as a "legacy alias" — actually a forward-reserved alias. Re-word as "reserved alias" OR drop the prop value (KISS).

## P3 — to M.

- **3 carry-forwards from α audit**:
  - `src/forms.ts` Textarea duplicate (re-exported via `./components/ui/textarea` AND via `./components/ui/combobox/Combobox.vue` indirect — verify; may be a stale comment).
  - `GlassPanelVariant` not yet promoted to `src/api/index.ts` (Lane B oversight; minor).
  - Aurora `-inset-6` 8px bloom (pre-L K-residual; cosmetic non-blocker at /aurora 375).
- **G1-G3 + G5-G13 + G15-G19** from δ audit (per-story consumption sweep cosmetic findings): see `docs/tranches/L/audit/L-audit-δ-idiomatic-gestalt-per-story.md` for full enumeration.

## M-tranche bound process-failures + LESSONS-LEARNED candidates

- **W1 Lane B accidental `git checkout`** (self-reported in W1-B proof; net worktree-state matched intended delta; non-blocking): the hardened-git-clause precept was VIOLATED in a corrective, self-disclosed manner. Open question for M: does the LESSONS-LEARNED entry need extension to enumerate self-corrective vs. recovery-loophole git mutations? Currently the entry covers `stash` + `reset` + `restore` but NOT `checkout` explicitly. Recommend M-tranche W0 precept-update to add `checkout` to the explicit forbidden subset. Coordinate with the precept-submodule push reconciliation (next item).

- **Precept submodule push reconciliation** (W0 deferred per `coordination/speedtest-Y.md` §8): origin/main diverged 15 commits with REAUDIT-stream work; force-push forbidden on shared infra. M-tranche W0 should:
  - Read both streams' diffs.
  - Identify philosophical conflicts (REAUDIT-stream's parallel-agent ceiling 10→6 may contradict our 7-agent strengthened audit pattern).
  - Integrate via merge OR rebase.
  - Verify no clause is lost.
  - Push.

## M-tranche substrate / API items

- **F-ε-3** (ε audit; Configurator recursion warning at /motion/metaballs under Lighthouse): W7's `toRaw` clone hardening absorbed the aurora `cyclePreset` `DataCloneError` but does NOT touch the metaballs render path. The recursion is load-timing-dependent (Playwright doesn't reproduce; Lighthouse does). Best-practices=96 (1 audit failing); not a v1.0 release blocker. Route to M-tranche for further investigation (likely a Configurator watcher-graph or computed-side effect; needs methodical reproduction harness).

## Cross-tranche debt items kept as PERMANENT-DEFER (no M absorption)

- **Vue runtime `uses-passive-event-listeners`** (W6 P2-3): Vue `@vue/runtime-dom` upstream; not glass-ui scope.
- **Cache-ttl `uses-long-cache-ttl`** (W6 P2-4): production hosting layer; consumer-side.

## 5 documented-narrowing entries (β audit; not residuals — narrowing rationale)

The following are SINGLE-consumer surfaces with documented rationale (not P0/P1 substrate-without-consumer findings):

- `src/api/` aggregator subpath itself has 0 direct importers — pure-additive discovery aggregator per W1-B proof.
- `cloneMode: "per-preset"` has 1 consumer (aurora) — second consumer would warrant β re-evaluation at M.
- `src/keyboard.ts` subpath: 1 consumer-side keyboard-shortcuts story; speedtest re-link supplies the second consumer.
- `src/carousel.ts` subpath: 1 cross-repo speedtest consumer + 1 demo; ok.
- `composables/sortable` sub-tree: 1 consumer at HEAD (SortableList component). Re-evaluate at M.

## Summary

- **W8 absorbed**: 2 P0 + 7 P1 doc-only items (within-wave; per W8 spec §C).
- **M-bound**: 4 P2 + 12+ P3 cosmetic.
- **PERMANENT-DEFER**: 2 (Vue + cache-ttl; not glass-ui scope).
- **Documented narrowing**: 5 (single-consumer surfaces with explicit rationale).
- **L invariant 8 substrate-without-consumer binary**: HELD at HEAD `59b7b56` per β + ι sweeps.
- **L invariant 4 no-legacy-aliases**: HELD per δ gestalt fidelity table.
- **L invariant 16 MIGRATION.md binding deliverable**: SHIPPED (430 LOC / 17 breaks; γ symmetry verified post-absorb).
