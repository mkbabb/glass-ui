# K Residuals — Carry-forward to L

Items K does not absorb at close, with named L-tranche destinations.

## P1 — viewport / contrast

### R1 — StoryPager dock-tab inner overflow at 375 viewport

- **Source**: K W8 π-1 finding (re-verified at HEAD via Playwright probe).
- **State at HEAD**: `dock-tab-button` siblings inside StoryPager (e.g., "Cartoon Card" + "Glass Panel" tabs at `/primitives/dock-group`) overflow viewport by 59-158 px each. Body scrollWidth = 399 vs viewport 375 (24 px effective overflow after clipping).
- **Distinction from W5**: K W5 fixed the OUTER `.story-pager-dock` container sizing (max-width: min(100%, 56rem)) — that gate holds. The inner-tab horizontal-row overflow is a different layout concern: the prev/next sibling tabs lay out without `overflow-x: auto` or label truncation, so they extend past the dock container at small viewports.
- **Recommended fix**: add `overflow-x: auto` to the StoryPager's inner tab-row container OR truncate sibling labels with ellipsis below `--breakpoint-md`.
- **Destination**: L tranche (mobile-viewport polish lane).

## P2 — doc enumeration

### R2 — CLAUDE.md / README.md subpath enumeration

- **Source**: K W8 γ findings D3 + D4.
- **State at HEAD**: CLAUDE.md "Subpath surface" section does not name `/forms`, `/composables/dark`, `/composables/keyboard` explicitly (DESIGN.md does); README.md "29 active subpaths" line undercounts (actual count is 36 after WS subpath split).
- **Recommended fix**: enumerate the 3 WS subpaths in CLAUDE.md + correct the README.md count to 36.
- **Destination**: L tranche (doc cohort) — small, but K W8's absorption budget is spent on the higher-impact γ D1+D2+D5 fixes.

### R3 — Wave-spec status lines stale

- **Source**: K W8 γ T1 advisory.
- **State at HEAD**: 12 wave-spec files (`waves/W{0,1,3,4,5,6,7,8}.md` + `W-V.md` + `W-P.md` + `W-S.md`) carry `Status: open` / `Status: pending` / `Status: retired` lines reflecting planning state, not closed state. PROGRESS.md is canonical.
- **Recommended fix**: bump each wave-spec status line to "CLOSED `<commit-hash>`" matching PROGRESS.md.
- **Destination**: L tranche (housekeeping) OR optional W8-cleanup-pass before final K commit.

## P2 — substrate residuals

### R4 — `--surface-tint-{35,40,40,70}` rung gaps

- **Source**: K W3 Lane A proof.
- **State at HEAD**: 4 sites use percentages that don't match existing `--surface-tint-N` rungs:
  - `src/components/ui/slider/Slider.vue:163` — 40%
  - `src/components/custom/timeline/GlassTimeline.vue:172` — 40%
  - `src/components/custom/tabs/UnderlineTabs.vue:110` — 70%
  - `src/styles/glass.css:220` — 35%
- **Recommended fix**: define `--surface-tint-{35,40,70}` rungs in tokens.css (theme.css bridge auto-flows), or migrate the 4 sites to closest existing rungs (22%, 25%, etc.) with documented intent.
- **Destination**: L tranche.

## Cross-tranche debt (K plan declared; persists at K close)

These were already declared in K.md "Cross-tranche debt" — listed here for FINAL.md ledger:

- **WS Phase 2** (root-barrel removal of vueuse-bearing symbols → breaking change → v1.0). Phase 1 shipped at v0.9.3; the SCC trap stays open until Phase 2.
- **3 unused public composables** (Rε B5: useRAFLoop, useIntersectionPause, useDarkModeSync) — L cross-repo audit.
- **`useOffsetPagination` / `useVirtualSection*` / `useWindowedStore`** (Rε B6) — L cross-repo audit.
- **P-tranche second-consumer fidelity** (Rε B9: DiscoGlyph / DockGroup / InstrumentChassis each 1-consumer at HEAD) — L cross-repo audit.
- **Pulse + Typewriter keyframes lift** to `animations.css` (Rε B1) — cohesion gain; defer.
- **Aurora chrome unification** under `useConfiguratorState` — Option-B retain documented; defer to L if Option-A unification is pursued.
- **Production demo build** — Lighthouse-deferred; L decides whether to ship a static demo deploy or formally retire demo as deploy target.
- **`robots.txt`** (Lighthouse P2-2) — L (publicly-deployed-demo prerequisite).
- **Vue runtime `uses-passive-event-listeners`** (Lighthouse P2-3) — Vue upstream; not glass-ui scope.
- **Production hosting `uses-long-cache-ttl`** (Lighthouse P2-4) — L (prod hosting).
- **`<DockShowcaseFrame>` second-consumer audit** — L.
- **Speedtest W3.b.1 LANDED annotation** — gated on v1.0 / Phase 2; speedtest's disposition stays ACCEPT-AS-PHASE-1-LANDED-TRAP-DEFERRED until then.

## Process-evolution notes

K W8 ι integrity-sweep filed two LESSONS-LEARNED entries to `docs/precepts/instructions/LESSONS-LEARNED.md` (precept submodule commit `d4ada55`):

- **2026-05-09 - Worktree Isolation Requires Relative Paths** — K W6 worktree anomaly (absolute paths circumvented isolation).
- **2026-05-09 - `git stash` Forbidden Even For State-Probe** — K W3 Lane A stash recurrence; explicit no-state-probe-loophole closure.

Both are precept-evolution opportunities, not gate failures. K invariants 6 + 7 hold at K close (with documented PARTIAL annotations).
