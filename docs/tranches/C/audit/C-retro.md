# C — Retrospective

Lessons from tranche C (Operational Truth). Adapted from the bbnf-lang `audit/{LETTER}-retro.md` convention.

## What worked

### The bbnf-lang tranche format adapted cleanly

Six-wave plan with runtime-verifiable hard gates, parallel sub-agent dispatch on disjoint file bounds, FINAL.md + retro at close. The format scaled down naturally to glass-ui's smaller scope — no heavyweight multi-pass split, no benchmarking ceremony, but every other element transferred. Future tranches default to this format.

### Audit-first: the canned overfitting prompt paid off mid-W0

The plan called for "≥ 5 actionable overfitting candidates." With the canned prompt's auto-keep-on-public-surface rule, the first three sub-agents returned 100% keep — the gate would have closed trivially with zero actual signal. Refining the prompt mid-execution (added `library-orphan` verdict + verdict precedence) surfaced 101 candidates, ~70× the threshold. The lesson: hard-gate floor checks must consider what the audit *can return given its rules*, not just the structural thresholds. AW-I gate 9's "≤ 12000 lines" failed for the same reason. Floor-check the gate's resolvability, not just the number.

### Gestalt scope-reveals beat the plan three times

Three sub-phases pivoted mid-execution to gestalt approaches better than the original plan:

- **C.W1.C** — plan: add `@utility font-mono-code` + `@utility text-2xs`. Reveal: `fira-code` already existed identical; `text-micro` covered the single text-2xs site. Migrated 60+1 sites instead of shipping duplicate utilities. Net: -2 utility names from the codebase, +0 new declarations.
- **C.W2.A** — plan: add `@utility dock-tab-btn` to dock.css. Reveal: dock.css's own header documents that dock-button styling moved to self-contained Vue components — the CSS-utility approach was actively retired. Created `DockTabButton.vue` (sibling to DockIconButton) instead. Pattern matches the package's stated direction.
- **C.W3.B** — plan: inline `mask-image: linear-gradient(...)` on aurora preset row. Reveal: `.scroll-fade-mask` utility already shipped the equivalent declaration. Used the existing class.

Pattern: when the plan calls for a new abstraction, search for an existing one first. The W0 overfitting audit IS this discipline — running it before plan-authoring (or at least before each wave's dispatch) would have caught these as plan-time, not execution-time, scope-reveals.

### Bundling user WIP into wave commits worked

The aurora WIP that had accumulated in the working tree pre-C was bigger than the plan estimated (14 files + 2 untracked vs "5"). Rather than treating it as a blocker, attributed each WIP file to its appropriate sub-phase commit (StoryPage.vue's kind-discriminator at C.W1.B, the rest at C.W3.D in four logically-grouped commits). User work got canonical landing; my work didn't carry attribution noise; tranche stayed at master-clean at every wave boundary after the appropriate commit.

## What stretched the plan

### W3.D scope expansion was real, not just measurement noise

The plan said "5 modified files." Reality was 14 modified + 2 untracked + the aurora-as-flat-route navigation reform that touched 5 demo/ infrastructure files (manifest, router, useStoryNavigation, CategoryRail, StoryPage). The plan's static enumeration missed the navigation reform entirely — it wasn't visible from the original "git status -s" snapshot because the renames + content edits looked like pure aurora work. Lesson: when reviewing inherited WIP, `git diff --stat` is a better starting point than `git status -s`; it shows which files actually changed substantively, not just which files have *some* change.

### The library-orphan finding was the real surprise

W0 surfaced 101 candidates — 38 in src/components/custom/ alone are library primitives that glass-ui exports but nobody (including its own demo) currently uses. The dock package alone has 6 components in this state. This is a structural fact about the library: it has been built ahead of consumer adoption. The audit reframes that from "look at all this scaffolding" to "name the consumer roadmap entry per primitive, or delete." D inherits the triage.

### Plan's W1.D radius mapping was wrong before it dispatched

Plan said `--radius-input: var(--radius-md)` and `--radius-button: var(--radius-full)`. Neither exists. tokens.css uses `--radius` (0.625rem) for both, and `--radius-pill` for the badge/dock. W0.D caught it before W1 dispatched. Without the file-bounds audit, W1.D would have shipped broken radius mappings.

## Anti-patterns to bind into future tranches

1. **Floor-check audit gates against the audit's verdict rules, not just structural numbers.** The first three W0.A agents auto-kept 100% because the canned prompt's rules said so. The gate ("≥ 5 actionable") was technically reachable but only after a verdict-criteria refinement. Declare gate floors by analysing what the audit *can* return.

2. **Search for existing utilities before adding new ones.** Ran into this three times in C alone (font-mono-code, dock-tab-btn, scroll-fade-mask). A pre-wave grep for "is there already a class/utility that does this" should be a checklist item.

3. **`git diff --stat` over `git status -s` for WIP review.** Status shows what changed; stat shows how much. The latter signals "this is bigger than you think" before you commit to a 5-file estimate.

4. **Library-orphan candidates need explicit triage at every tranche close.** Otherwise they accumulate. Adding it as §Invariant 5 + canned-prompt-at-close binds the discipline into future tranches.

## What carries forward

- `docs/audits/overfitting-audit.md` is the durable substrate. Future tranches re-run it with the same canned prompt, just substituting `{SCOPE_PATHS}` and `{CONSUMER_PATHS}`.
- The `library-orphan` verdict + verdict-precedence ordering became part of the prompt — future audits inherit them automatically.
- §Invariant 5 binds the codebase to running the audit at every tranche close.
- D's plan starts with the 101-candidate ledger; W0 is essentially pre-staged for D.
