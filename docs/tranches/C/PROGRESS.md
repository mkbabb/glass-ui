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
- W1: planned
- W2: planned
- W3: planned (scope expanded — see open log)
- W4: planned
- W5: planned

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
