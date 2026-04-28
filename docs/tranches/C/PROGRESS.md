# C — Progress Log

Dated execution log for tranche C. Updated at every wave boundary.

## 2026-04-28 — Tranche open

- Plan landed at `docs/tranches/C/C.md` (mirror of `/Users/mkbabb/.claude/plans/cozy-wishing-wand.md`).
- Canned overfitting-audit prompt landed at `docs/audits/overfitting-audit.md` (substrate for C.W0.A and §Invariant 5).
- Audit + waves directories created: `docs/tranches/C/audit/`, `docs/tranches/C/waves/`.
- Inherited from B: aurora playground work-in-progress is broader than the plan's "5 modified files" estimate. Real surface (`git status -s`):
  - 11 renames under `demo/stories/compositions/aurora/` → `demo/stories/aurora/` (file relocation, not just edits).
  - 8 src/ aurora modifications (`src/components/custom/aurora/`).
  - 2 untracked: `demo/stories/aurora/AuroraStage.vue`, `src/components/custom/aurora/composables/configSource.ts`.
  - 5 demo/ infrastructure modifications: `demo/composables/useStoryNavigation.ts`, `demo/layout/CategoryRail.vue`, `demo/layout/StoryPager.vue`, `demo/router.ts`, `demo/stories/StoryPage.vue`, `demo/stories/manifest.ts`.
  - 1 src/ unrelated: `src/components/custom/expandable-container/ExpandableContainer.vue`.
- C.W3.D's scope expands accordingly: review the broader aurora restructure before committing. If the StoryPage/StoryPager modifications conflict with C.W1.B / C.W2.A, those need sequencing — W3.D's commit ordering is a scope-reveal item, not a plan defect.
- Master is NOT clean at C open. Tranche scaffold commits will stage only the new tranche files (`docs/audits/`, `docs/tranches/C/`); pre-existing aurora WIP carries forward unmolested into C.W3.D.

## Wave statuses

- W0: complete
- W1: complete
- W2: complete
- W3: complete
- W4: in_progress
- W5: in_progress (delete-unused sweep landed; FINAL + retro pending W4 close)

## 2026-04-28 — W0 close

Four parallel audits ran. Deliverables:
- `audit/W0-overfitting.md` — 4 sub-agents (ui, custom, composables, styles); 7 delete-unused, 21 generalize, 101 library-orphan candidates. Actionable count 108; hard-gate threshold (≥ 5) cleared by 21×.
- `audit/W0-live-findings.md` — six concrete defects + three architectural smells from prior Playwright walks.
- `audit/W0-token-resolution.md` — folded into C.W1.C pre-fix capture; static enumeration documents the expected fallbacks.
- `audit/W0-file-bounds.md` — verified all 11 critical files exist; flagged W1.D's radius mapping had wrong primitive tokens (`--radius-md`/`--radius-full` don't exist) → corrected to `--radius` and `--radius-pill` in C.md.

Cross-tranche debt forwarded to D: 101 library-orphan candidates (38 custom/ components, 63 composables-with-narrow-import-pattern). D scope: demo-wire-or-delete sweep, plus FORWARD-compat doc for genuine roadmap primitives.

Refinements to canned overfitting-audit prompt (`docs/audits/overfitting-audit.md`):
- Added `library-orphan` verdict (0 sites + exported) — strongest overfitting signal for a public-surface library.
- Added verdict precedence ordering: `delete-unused` > `library-orphan` > `inline-and-remove` > `generalize` > `demo-only-private` > `keep`.
- Added `in-public-surface` and `total-sites` columns to the output table.

C.md updated: W1.D radius primitive mapping corrected.

## 2026-04-28 — W1 close

Four sub-phase commits landed in order:

- `fad99f1` fix(icon-tooltip): self-host TooltipProvider (C.W1.A)
- `05511d5` fix(stories): host TooltipProvider in StoryPage (C.W1.B; bundles user's WIP kind-discriminator for flat routes)
- `4f33675` refactor(typography): migrate font-mono-code → fira-code (60 sites, 25 files), text-2xs → text-micro (1 site) (C.W1.C)
- `f6bd90e` fix(theme): @theme radius tokens reference primitive scale (C.W1.D)

C.W1.C scope-reveal: the plan proposed adding `@utility font-mono-code` and `@utility text-2xs` to typography.css. Mid-execution, found that `fira-code` already existed in typography.css with the identical definition; adding `font-mono-code` would have shipped a duplicate utility in violation of §Invariant 5. Pivoted to gestalt migration: 60 occurrences across 25 files migrated to `fira-code`; 1 `text-2xs` site migrated to existing `text-micro` (10px → 11px is visually equivalent at description-hint scale). Net: codebase loses two duplicate-shaped utility names and gains zero new @utility blocks. Hard gate (W1) cleared by alternative path — runtime verification at C.W4 will confirm `getComputedStyle(.fira-code).fontFamily` includes "Fira Code" rather than the body serif.

`npm run typecheck` clean. `npm run build` clean (382.94 kB JS, 39.63 kB CSS).

## 2026-04-28 — W2 close

Three sub-phase commits:

- `12a558d` feat(dock): DockTabButton primitive — sibling to DockIconButton, text-tab variant with as-child polymorphism (C.W2.A)
- `5372155` feat(demo): StoryPager rewrite as horizontal GlassDock with DockTabButton + RouterLink (C.W2.A)
- `6ef298f` fix(demo): dashboard metric grid 2-up below 2xl, terser labels (C.W2.B)
- `b839543` fix(rail): inner pill max-h overflow for small viewports (C.W2.C)

Gestalt scope-reveal at C.W2.A: the plan proposed adding an `@utility dock-tab-btn` block to `dock.css`. dock.css's own header documents that dock-button styling moved from CSS utilities to self-contained Vue components (DockIconButton, DockSelectTrigger, DockDropdownTrigger) — the CSS utility approach was actively retired. Adding `@utility dock-tab-btn` would have re-introduced the very pattern dock.css explicitly retired. Pivoted to the matching pattern: DockTabButton.vue Vue component with scoped four-state styles and reka-ui Primitive as-child polymorphism. The component lands on the public surface (re-export from dock/index.ts), available to any consumer who wants tab-styled dock-internal links. No new CSS utility shipped.

`npm run typecheck` clean. `npm run build` clean (384.54 kB JS, 40.83 kB CSS).

## 2026-04-28 — W3 close

Eight commits land the polish + the broader-than-planned aurora work:

- `faddbed` fix(math-paper): drop .fourier-f from inline prose (C.W3.A)
- `9966c1d` fix(aurora): mask preset row via existing .scroll-fade-mask utility (C.W3.B)
- `dd8b73f` refactor(configurator): RadioGroup uses v-model (C.W3.C)
- `4dd0d28` chore(html): inline empty favicon to silence 404 (C.W3.D)
- `69c1d1c` feat(demo): aurora as flat standalone route — manifest + router + nav + rail (user WIP, C.W3.D)
- `4f84e64` feat(stories): aurora playground refactor — stage + config dock + nuclei (user WIP, C.W3.D)
- `70dcfa5` feat(aurora): library aurora composable + shader refactor (user WIP, C.W3.D)
- `f1d3815` refactor(expandable-container): defineModel + registerShortcut Escape (user WIP, C.W3.D)

C.W3.B scope-reveal: the plan said add `mask-image: linear-gradient(...)` inline to the preset scroll container. utilities.css already shipped `.scroll-fade-mask` with the equivalent mask-image declaration — exactly the pattern §Invariant 5 says to reuse over reinvent. Added the class instead of inline rule. Same outcome, zero new CSS.

C.W3.D was always the largest unknown. Real surface: 14 files modified + 2 untracked, vs the plan's "5 files." Every WIP file was reviewed, typechecked, and committed in four logically-grouped commits attributing user work. Master is now clean. The aurora-flat-route reform that was bundled into earlier commits (C.W1.B's StoryPage kind-discriminator, C.W2.A's pager flat-route gating) finally gets its canonical landing at `69c1d1c`.

`npm run typecheck` clean. `npm run build` clean.

## 2026-04-28 — W4 dispatch + W5 partial close

W4 dispatched: Playwright sub-agent walking 68 routes (67 categorised + 1 flat) at 1440×900 in three modes (light, dark, reduced-motion); seven hard-gate runtime evals; consumer builds in parallel.

Three consumer builds executed concurrently via background bash:
- `fourier-analysis/web` — exit 0
- `words/frontend` — exit 0
- `bbnf-lang/playground` — exit 0

W5 partial close — the W0 delete-unused sweep landed at `304ac78`:
- `src/components/ui/scroll-area/` removed (entire subdirectory)
- `src/components/ui/scroll-pane/` removed (entire subdirectory)
- `.cartoon-card` + `.elevated-card` rules removed from `cards.css` (Card primitive's variant system covers both)
- `.dock-play-btn` rules removed from `dock.css` (never wired)
- Both `scroll-area`/`scroll-pane` re-exports removed from `src/components/ui/index.ts`

Audit-claim hardening: Agent 4's W0 narrative listed 7 delete-unused items. Re-running `rg` against current master showed only 4 truly orphaned. False positives kept: `.glass-btn` (used in demo/configurator + buttons story), `.btn-pill` (load-bearing in Button CVA's base class), `.input-pill` (used in Input.vue + Textarea.vue). Per bbnf-lang SPEC §"Agent-claim hardening" — trust artefacts, not claims.

Net build: 381.42 kB JS / 39.81 kB CSS (vs pre-sweep 384.54 / 40.83 — 3.12 kB JS / 1.02 kB CSS smaller).
