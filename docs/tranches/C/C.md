# C — Operational Truth

Tranche document for Phase 3 of the glass-ui storybook reform. Adapted to the bbnf-lang tranche spec (`/Users/mkbabb/Programming/bbnf-lang/docs/instructions/tranche/SPEC.md`) so the work runs on a structured, parallel, hard-gated wave schedule with disjoint file bounds, runtime-verifiable gates, and a closing ceremony. Tranche letters track the storybook's reform passes: A = Phase 1 build-out, B = Phase 2 Coherent Chrome, **C = Operational Truth**.

## Opening

Phase 1 (build-out, 73 SFCs, library tokens, Configurator, GlassDock, BouncyTabs) and Phase 2 (Coherent Chrome — neutral-scale, delta-based configurator, button unification, Rail primitive, slim AppShell, body cascade) shipped to master. Live use surfaced six concrete defects and three architectural smells. C closes them — TooltipProvider hosted in both library and demo, undefined Tailwind utilities (`font-mono-code`, `text-2xs`, `dock-tab-btn`) defined as `@utility` blocks, theme.css radius self-references resolved, dashboard metric grid responsive, StoryPager rebuilt as a real horizontal GlassDock, Rail robust at small viewports, math-paper glyph fixed, aurora preset overflow afforded, configurator preset binding direct, favicon shipped, uncommitted aurora user work landed — plus a reusable overfitting audit (canned prompt at `docs/audits/overfitting-audit.md`) that catches one-use components, classes, utilities, and composables across glass-ui and its three consumers (`fourier-analysis/web`, `words/frontend`, `bbnf-lang/playground`).

## Architectural thesis

A library component must work standalone — no "mount X above me" footnotes. A demo container hosts shared providers for content-internal usage. Tailwind v4 utilities exist only when declared as `@theme` tokens or `@utility` blocks; ambient class names that fall through to body cascade are bugs. `@theme` mappings reference primitive tokens, never themselves. The storybook's chrome (rail, pager, configurator) is composed from the library's own dock primitives, not parallel custom layouts. Overfitting — components, classes, utilities, composables that exist for exactly one consumer — is debt: either generalize to a public surface or inline at the call site.

## Invariants

1. **Library components are self-contained.** No component requires an ancestor provider mounted by the consumer.
2. **Tailwind-first.** Every utility class used in source has a matching `@theme` token or `@utility` block. No ambient classes silently fall through to body styles.
3. **`@theme` references primitives.** No self-referential `--x: var(--x)` mappings in the theme block.
4. **Storybook chrome is library composition.** Rail uses `Rail`; pager uses `GlassDock`; tabs wear `.dock-tab-btn`. `demo/layout/` does not re-implement glass primitives.
5. **No silent overfitting.** Every CSS class, component, composable, type interface in `src/` has ≥ 2 import sites, OR is exported in `src/index.ts` for consumer use, OR is documented as a private demo-only helper. The overfitting audit runs at every tranche close.
6. **Workspace green at every wave boundary.** `npm run typecheck` + `npm run build` clean; no console errors in a Playwright route walk.

## Wave schedule

| Wave | Title | Agents | Mode | Workspace at close | Hard gate (one-line) | Status |
|---|---|---|---|---|---|---|
| W0 | Audits — live + overfitting + token resolution | 4 | parallel | green | three audit docs landed; ≥ 5 overfitting candidates marked `inline-and-remove` or `delete-unused` | planned |
| W1 | Crash + utility-resolution fixes | 4 | parallel | green | settings + rail render; `font-mono-code`/`text-2xs` resolve; `rounded-card` maps to primitive | planned |
| W2 | Chrome reform — pager, dashboard, rail | 3 | parallel | green | StoryPager clamped 80vw with internal scroll; dashboard 2-up at xl, 4-up at 2xl; Rail scrolls at 1440×600 | planned |
| W3 | Polish + commit aurora user work | 4 | parallel | green | math-paper Sₙ inline; aurora preset masked; configurator preset direct; aurora work committed; favicon 200 | planned |
| W4 | QA sweep — dark + motion + consumer builds | 1 | sequential | green | 73×3 screenshots indexed; 3 consumer builds exit 0 | planned |
| W5 | Close ceremony | 0 (orchestrator) | n/a | green | FINAL.md + C-retro committed | planned |

Cherry-pick-then-dispatch: master clean before each wave opens. Worktrees pre-created per agent at sibling paths (`/Users/mkbabb/Programming/glass-ui-wt-c-w<N><tag>`). Sub-agents commit inside their worktrees; orchestrator integrates onto master at wave boundaries.

## Phases

### C.W0 — Audits (live + overfitting + token resolution)

Substrate exists for live audit + token resolution; overfitting is novel and produces the canned prompt for future tranches.

#### C.W0.A — Overfitting audit (glass-ui + 3 consumers)
- **Mechanism**: orchestrator first creates `docs/audits/overfitting-audit.md` with the canned prompt body (see §Overfitting-audit canned prompt below). Then dispatches one sub-agent per scope, fan-out across `src/components/ui/` (32 components), `src/components/custom/` (custom components + composables), `src/composables/` (18 composables), `src/styles/*.css` (every `@utility` and class). Each agent counts import / class-reference sites across glass-ui (`src/`, `demo/`) AND consumers (`../fourier-analysis/web`, `../words/frontend`, `../bbnf-lang/playground`) read-only.
- **Files touched**: create `docs/audits/overfitting-audit.md`; create `docs/tranches/C/audit/W0-overfitting.md`. No edits to library or consumer source.
- **Sub-gate**: `docs/tranches/C/audit/W0-overfitting.md` exists with a verdict table whose `verdict` column distribution shows ≥ 5 rows in `inline-and-remove` or `delete-unused` (a clean codebase of 200+ symbols with zero overfitting is implausible — < 5 means the audit was shallow).

#### C.W0.B — Live findings consolidation
- **Mechanism**: promote the §1–§9 enumeration that already exists in this conversation (Playwright-confirmed: TooltipProvider crash chain, dashboard 124px-vs-219px overflow, undefined Tailwind utilities, theme.css self-ref, math-paper glyph, aurora row clip, StoryPager edge-to-edge, favicon 404, deferred QA) into `docs/tranches/C/audit/W0-live-findings.md` with screenshot paths.
- **Files touched**: create `docs/tranches/C/audit/W0-live-findings.md`.
- **Sub-gate**: every defect cites a Playwright artefact path under `.playwright-mcp/` or a getComputedStyle eval result.

#### C.W0.C — Token-resolution audit
- **Mechanism**: Playwright walks every story route; for each unique class on `<*>`, calls `getComputedStyle(el)` and asserts `font-family`, `color`, `border-radius`, `font-size` are non-empty and not equal to body fallback values. Any class that resolves to body fallback is logged as a missing utility.
- **Files touched**: create `docs/tranches/C/audit/W0-token-resolution.md`.
- **Sub-gate**: report enumerates every undefined utility class (expect ≥ 2 — `font-mono-code`, `text-2xs`); zero false positives.

#### C.W0.D — Plan critical-files audit
- **Mechanism**: confirm every file in §Critical files exists, that the cited line numbers (e.g., `theme.css:191-197`) match the targeted code, and that no agent's allow-list overlaps with another's.
- **Files touched**: create `docs/tranches/C/audit/W0-file-bounds.md`.
- **Sub-gate**: zero overlapping allow-lists; every cited line range matches.

**Hard gate (W0)**: four audit docs landed under `docs/tranches/C/audit/`; canned prompt at `docs/audits/overfitting-audit.md`; overfitting verdicts table ≥ 50 rows; ≥ 5 candidates `inline-and-remove`/`delete-unused`. Verification: `ls docs/tranches/C/audit/ | wc -l` → 4; `wc -l docs/audits/overfitting-audit.md` non-zero.

### C.W1 — Crash + utility-resolution fixes (4 parallel)

#### C.W1.A — IconTooltip self-host TooltipProvider
- **Mechanism**: wrap existing `<Tooltip>` body in `<TooltipProvider :delay-duration="250">`. Library promise: standalone-correctness.
- **Files**: `src/components/custom/icon-tooltip/IconTooltip.vue` (modify).
- **Sub-gate**: Playwright at any IconTooltip-using route — no `TooltipProviderContext` console error; tooltip appears on hover within 250ms.
- **Commit**: `fix(icon-tooltip): self-host TooltipProvider so the component is standalone (C.W1.A)`.

#### C.W1.B — StoryPage host TooltipProvider
- **Mechanism**: wrap `<article>` body in `<TooltipProvider :delay-duration="250">`. Demo promise: bare `<Tooltip>` usage in stories (e.g. `navigation/rail.vue`) has a provider in scope.
- **Files**: `demo/stories/StoryPage.vue` (modify).
- **Sub-gate**: `/compositions/settings` and `/navigation/rail` render; `<main>.children.length > 0`; zero `TooltipProviderContext` console errors across all 73 routes.
- **Commit**: `fix(stories): host TooltipProvider in StoryPage for bare-Tooltip story usage (C.W1.B)`.

#### C.W1.C — Tailwind utilities (`font-mono-code` + `text-2xs`)
- **Mechanism**: add to `src/styles/typography.css`:
  ```css
  @utility font-mono-code {
      font-family: var(--font-mono);
      font-feature-settings: "calt", "liga";
  }
  @utility text-2xs {
      font-size: 0.625rem;
      line-height: 1;
  }
  ```
- **Files**: `src/styles/typography.css` (modify).
- **Sub-gate**: Playwright `getComputedStyle(document.querySelector('.font-mono-code')).fontFamily` includes "Fira Code"; `.text-2xs` resolves to `font-size: 10px`. Pre-fix run captured for diff.
- **Commit**: `fix(typography): @utility font-mono-code + text-2xs (C.W1.C)`.

#### C.W1.D — theme.css radius primitive references
- **Mechanism**: replace `theme.css:191-197` self-references with primitive mappings from `tokens.css`:
  ```css
  --radius-card:   var(--radius-2xl);
  --radius-panel:  var(--radius-xl);
  --radius-dialog: var(--radius-2xl);
  --radius-input:  var(--radius-md);
  --radius-button: var(--radius-full);
  --radius-badge:  var(--radius-full);
  --radius-dock:   var(--radius-2xl);
  ```
  Exact mappings verified against existing usage at audit time (W0.D).
- **Files**: `src/styles/theme.css:191-197` (modify).
- **Sub-gate**: `getComputedStyle(.rounded-card).borderRadius` resolves to a non-empty pixel value matching `--radius-2xl`'s computed value.
- **Commit**: `fix(theme): radius @theme tokens reference primitive scale (C.W1.D)`.

**Hard gate (W1)**: all four sub-gates close; `npm run typecheck` + `npm run build` clean; Playwright route walk over 73 stories produces zero `TooltipProviderContext` errors AND zero "undefined utility" fallthroughs flagged in W0.C.

### C.W2 — Chrome reform (3 parallel)

#### C.W2.A — StoryPager → horizontal GlassDock
- **Mechanism**: rewrite `demo/layout/StoryPager.vue`:
  - Replace `<BouncyTabs>` with `<GlassDock orientation="horizontal" always-expanded fit-content>`.
  - Inside: flex row of `<RouterLink class="dock-tab-btn" :aria-current="isActive ? 'page' : undefined">{{ story.title }}</RouterLink>`.
  - Outer `<nav>`: `flex justify-center`, no horizontal padding.
  - Container styles on the dock: `max-width: min(80vw, 56rem); overflow-x-auto; scrollbar-hidden`.
  - Add `@utility dock-tab-btn` to `src/styles/dock.css`:
    ```css
    @utility dock-tab-btn {
        display: inline-flex; align-items: center; gap: 0.25rem;
        padding-inline: 0.75rem; padding-block: 0.375rem;
        border-radius: 9999px;
        font-size: 0.875rem; line-height: 1;
        color: var(--muted-foreground);
        transition: background-color 150ms, color 150ms;
        white-space: nowrap;
        &:hover { background-color: color-mix(in oklch, var(--foreground) 8%, transparent); color: var(--foreground); }
        &[aria-current="page"] { background-color: color-mix(in oklch, var(--foreground) 10%, transparent); color: var(--foreground); }
        &:focus-visible { outline: none; box-shadow: var(--focus-ring-shadow); }
    }
    ```
- **Files**: `demo/layout/StoryPager.vue` (modify-carve), `src/styles/dock.css` (modify).
- **Sub-gate**: at viewport 1440×900 on `/primitives/buttons` (16 stories): pager element width ≤ 80vw; `overflow-x` is `auto`; `scrollWidth > clientWidth`; centred horizontally.
- **Commits**:
  - `feat(dock): @utility dock-tab-btn for text-tab use cases (C.W2.A)`
  - `feat(demo): StoryPager is a real horizontal GlassDock with toggle-pill tabs (C.W2.A)`

#### C.W2.B — Dashboard responsive metric grid
- **Mechanism**: in `demo/stories/compositions/dashboard.vue`:
  - Change metric grid `xl:grid-cols-4` → `grid-cols-2 2xl:grid-cols-4`.
  - Add `min-w-0` to each metric Card.
  - Replace verbose labels with terse forms: "Active", "Reqs/min", "p95", "Error rate".
  - Switch label class `tracking-wider` → `tracking-wide`.
- **Files**: `demo/stories/compositions/dashboard.vue` (modify).
- **Sub-gate**: at 1440×900, every metric card's `scrollWidth ≤ clientWidth + 1` (no overflow). At 1920+, layout switches to four-up.
- **Commit**: `fix(demo): dashboard metric grid drops to 2-col below 2xl (C.W2.B)`.

#### C.W2.C — Rail robustness
- **Mechanism**: in `src/components/custom/rail/Rail.vue`, the inner pill receives `max-h: calc(100vh - 2rem); overflow-y: auto;` plus `scrollbar-hidden` utility.
- **Files**: `src/components/custom/rail/Rail.vue` (modify).
- **Sub-gate**: at viewport 1440×600 (forced shrink), CategoryRail's inner pill has `scrollHeight > clientHeight` and is scrollable; full content reachable via scroll.
- **Commit**: `fix(rail): inner pill scrolls when content exceeds viewport (C.W2.C)`.

**Hard gate (W2)**: all three sub-gates close; Playwright sweep across `/primitives/*`, `/compositions/dashboard`, all category routes confirms no horizontal overflow on the pager and no metric-card overflow.

### C.W3 — Polish + commit aurora user work (4 parallel)

#### C.W3.A — math-paper glyph
- **Mechanism**: in `demo/stories/compositions/math-paper.vue:37-40`, drop the `.fourier-f` class from the inline-prose span; pick one source of size truth (the parent `style="font-size: 1.15em"` is enough). Render `Sₙ` as a tight inline run.
- **Files**: `demo/stories/compositions/math-paper.vue` (modify).
- **Sub-gate**: Playwright DOM check — Sₙ glyph + subscript share one `<span>`'s line box at default zoom; no orphan "S" on its own visual line.
- **Commit**: `fix(math-paper): drop .fourier-f from inline prose so Sₙ stays inline (C.W3.A)`.

#### C.W3.B — aurora preset row mask
- **Mechanism**: add `mask-image: linear-gradient(to right, black 0, black calc(100% - 4rem), transparent 100%)` to the preset scroll container in `demo/stories/compositions/aurora-playground.vue`.
- **Files**: `demo/stories/compositions/aurora-playground.vue` (modify).
- **Sub-gate**: Playwright screenshot — right edge of preset row shows fade-mask, not hard clip; left edge unmasked.
- **Commit**: `fix(aurora): mask preset row right edge for overflow affordance (C.W3.B)`.

#### C.W3.C — Configurator preset binding
- **Mechanism**: in `demo/configurator/Configurator.vue:150`, replace `@update:model-value="(v) => { if (v) presetModel = v as string; }"` with `@update:model-value="(v) => { if (v) cfg.setPreset(v as string); }"`.
- **Files**: `demo/configurator/Configurator.vue` (modify).
- **Sub-gate**: changing preset in the configurator updates `useStoryConfig` state and at least one DOM token within one tick (Playwright eval before/after).
- **Commit**: `refactor(configurator): preset binding calls setPreset directly (C.W3.C)`.

#### C.W3.D — Favicon + commit aurora user work
- **Mechanism**:
  1. Add `<link rel="icon" href="data:,">` to `index.html` (silences favicon 404 console noise).
  2. Review the 5 modified aurora files (`demo/stories/compositions/aurora-playground.vue`, `demo/stories/compositions/aurora/AuroraConfigDock.vue`, `demo/stories/compositions/aurora/Aurora.vue`, `demo/stories/compositions/aurora/composables/useAura.ts`, `demo/stories/compositions/aurora/composables/useCursorInteraction.ts`). If they typecheck and the playground renders, commit as user-work.
- **Files**: `index.html` (modify); `demo/stories/compositions/aurora-playground.vue` + 4 aurora-internal files (modify — committing existing user changes).
- **Sub-gate**: Playwright walk produces zero 404 console messages; `git status -s` empty for aurora paths after commit.
- **Commits**:
  - `chore(html): inline empty favicon to silence 404 (C.W3.D)`
  - `feat(stories): aurora playground refactor — user work (C.W3.D)`

**Hard gate (W3)**: all four sub-gates close; full Playwright route walk produces zero console errors.

### C.W4 — QA sweep (1 sequential)

#### C.W4.A — Dark + reduced-motion + consumer-build smoke
- **Mechanism**: Playwright walks 73 routes in:
  1. **light mode** — default.
  2. **dark mode** — `document.documentElement.classList.add('dark')`.
  3. **reduced-motion** — Playwright's `--emulate-media-prefers-reduced-motion=reduce` flag.
  Screenshots land at `demo/.qa/screenshots/{light,dark,reduced-motion}/<route>.png`. Console errors per route accumulate to `demo/.qa/console-errors.md`. Then run `npm run build` in `../fourier-analysis/web`, `../words/frontend`, `../bbnf-lang/playground` (read-only — those repos are NOT modified).
- **Files**: `demo/.qa/console-errors.md` (create), `demo/.qa/screenshots/**` (create — gitignored). Commit only the markdown index, not the PNGs.
- **Sub-gate**: 73 × 3 = 219 screenshots present locally; `demo/.qa/console-errors.md` exists; three consumer builds exit 0; the markdown surfaces any per-mode regressions for review.
- **Commit**: `chore(qa): C dark + motion + consumer-build sweep (C.W4.A)`.

**Hard gate (W4)**: sub-gate closes; consumer builds clean.

### C.W5 — Close ceremony (orchestrator)

- Compose `docs/tranches/C/FINAL.md`: per-wave commit hashes, hard-gate verification table with artefact paths, deferred-ledger (any items surfaced by W0.A overfitting that exceed C's scope land in D).
- Compose `docs/tranches/C/audit/C-retro.md`: lessons learned, anti-patterns to bind into future tranches.
- Tag `c-close` on master.

## Critical files

| File | Owning sub-phase | Access | Purpose |
|---|---|---|---|
| `docs/audits/overfitting-audit.md` | C.W0.A | create | reusable canned prompt |
| `docs/tranches/C/audit/W0-overfitting.md` | C.W0.A | create | overfitting verdict table |
| `docs/tranches/C/audit/W0-live-findings.md` | C.W0.B | create | live defect ledger |
| `docs/tranches/C/audit/W0-token-resolution.md` | C.W0.C | create | undefined-utility report |
| `docs/tranches/C/audit/W0-file-bounds.md` | C.W0.D | create | allow-list verification |
| `src/components/custom/icon-tooltip/IconTooltip.vue` | C.W1.A | modify | self-host TooltipProvider |
| `demo/stories/StoryPage.vue` | C.W1.B | modify | host TooltipProvider for story content |
| `src/styles/typography.css` | C.W1.C | modify | `@utility font-mono-code` + `text-2xs` |
| `src/styles/theme.css` | C.W1.D | modify | radius primitive references |
| `src/styles/dock.css` | C.W2.A | modify | `@utility dock-tab-btn` |
| `demo/layout/StoryPager.vue` | C.W2.A | modify-carve | rewrite as horizontal GlassDock |
| `demo/stories/compositions/dashboard.vue` | C.W2.B | modify | metric grid responsive |
| `src/components/custom/rail/Rail.vue` | C.W2.C | modify | inner pill overflow |
| `demo/stories/compositions/math-paper.vue` | C.W3.A | modify | drop `.fourier-f` from inline prose |
| `demo/stories/compositions/aurora-playground.vue` | C.W3.B + C.W3.D | modify | preset row mask + user-work commit |
| `demo/stories/compositions/aurora/**` | C.W3.D | modify | aurora user-work commit (4 files) |
| `demo/configurator/Configurator.vue` | C.W3.C | modify | preset binding cleanup |
| `index.html` | C.W3.D | modify | favicon link |
| `demo/.qa/console-errors.md` | C.W4.A | create | QA report index |
| `docs/tranches/C/FINAL.md` | C.W5 | create | close document |
| `docs/tranches/C/audit/C-retro.md` | C.W5 | create | retro |

Allow-list disjointness verified at C.W0.D. No two sub-phases share write access to the same file in the same wave; cross-wave overlap (`aurora-playground.vue` in W3.B and W3.D, `dock.css` in W2.A only) is sequenced — W3.D operates after W3.B closes.

## Hard gates summary

| Wave | Gate | Verification artefact |
|---|---|---|
| W0 | three audit docs landed; ≥ 5 overfitting candidates marked `inline-and-remove`/`delete-unused`; canned prompt exists | `ls docs/tranches/C/audit/`; `wc -l docs/audits/overfitting-audit.md`; verdict table column distribution |
| W1 | settings + rail render; `font-mono-code`/`text-2xs` resolve; `rounded-card` maps to primitive | Playwright eval: `getComputedStyle()`, `<main>.children.length`, console-error count |
| W2 | StoryPager clamped 80vw with internal scroll; dashboard 2-up at xl/4-up at 2xl; Rail scrolls at 1440×600 | Playwright DOM measurements at three viewport sizes |
| W3 | math-paper Sₙ inline; aurora preset masked; configurator preset directly wired; aurora work committed; favicon 200 | Playwright screenshots + DOM checks; `git status -s` empty |
| W4 | 73 × 3 screenshots indexed; 3 consumer builds clean | screenshot count; build exit codes |
| W5 | FINAL.md + C-retro committed; tag `c-close` | `git show c-close`; file existence |

Every gate closes on a runtime artefact (Playwright DOM eval, getComputedStyle, screenshot diff, build exit code, file existence). No grep-only gates per the inherited bbnf-lang SPEC §Runtime-evidence clause.

## Cross-tranche debt

**Inherited from B (Coherent Chrome)**: aurora playground 5-file modification (uncommitted user work). Carried forward and resolved in C.W3.D.

**Forwarded to D**: nothing planned at plan time. The overfitting audit (C.W0.A) produces a verdict ledger; if the verdicts surface a generalize-class refactor too large for C's scope (e.g., "every Labeled* field actually fits one shared abstraction"), it lands in D. Pre-declaring D's scope before W0.A's results is forbidden — re-plan with more agents at scope-reveal time.

## Escape clause

Workspace green at every wave boundary. No declared unworkability windows. Scope-reveal handling per bbnf-lang SPEC §Scope-reveal:

- If C.W2.A's StoryPager rewrite hits an unforeseen blocker (e.g. `GlassDock`'s horizontal orientation interacts badly with `<RouterLink>` active state under `aria-current`), Absorb-mode applies: split W2.A into W2.A.i (dock surface) + W2.A.ii (active-tab indicator), second sub-wave named in PROGRESS.md at scope-reveal time.
- If C.W0.A surfaces overfitting at a scale where verdicts can't realistically resolve in C (e.g. > 30 `inline-and-remove` items spanning 3+ subsystems), close C on the audit + W1 + W2 + W3 + W4 work, open D as the cleanup tranche. The audit ledger is the FINAL.md deferred entry, with named destination D.
- If a sub-agent enters a multi-cycle diagnostic loop (3+ iterations without commit, ~30 min wall time without forward motion), it halts, reports state including probe artefacts, and relinquishes. Orchestrator dispatches research + plan + redress triumvirate per bbnf-lang SPEC §Diagnostic-loop relinquish.

## Overfitting-audit canned prompt

Saved at `docs/audits/overfitting-audit.md` (created in C.W0.A). Reusable across tranches and consumers. Body:

````markdown
# Overfitting Audit — Sub-Agent Prompt

You are a research sub-agent for an overfitting audit. **Read-only** — do not edit any tracked file, do not commit.

## Task

Enumerate every component, composable, CSS class, `@utility`, type interface, and exported symbol within `{SCOPE_PATHS}`, then count its import / class-reference sites across `{CONSUMER_PATHS}`. Output a single markdown table with one row per artefact and a `verdict` column.

## Method

1. **Enumerate artefacts** within `{SCOPE_PATHS}`:
   - Vue components: every `*.vue` file's default export.
   - TS exports: `rg '^export (type|interface|function|const|class) ' {SCOPE_PATHS}` — each named export is one row.
   - CSS classes: for each `*.css` file, list `^\.[a-z]` selectors and `@utility <name>` blocks.
   - Composables: every `useXxx` exported from `src/composables/`.

2. **Count usage sites** for each artefact:
   - JS imports: `rg "from ['\"](\.{1,2}/)*<symbol-or-relative-path>['\"]" {CONSUMER_PATHS}` — count distinct files.
   - Class references in Vue/HTML: `rg 'class[Name]?="[^"]*\b<class>\b' {CONSUMER_PATHS}` and `:class`-bound forms. Count distinct files.
   - `@utility` references: `rg '\b<utility-name>\b' --type css --type vue --type ts {CONSUMER_PATHS}`. Count distinct files.
   - For each count, paste the exact `rg` invocation in the row's rationale field — counts unverifiable by re-running grep are rejected.

3. **Verdict** per artefact:
   - **keep** — ≥ 2 distinct usage sites, OR is in the library's public surface (e.g. exported from `src/index.ts`).
   - **inline-and-remove** — exactly 1 usage site within `{SCOPE_PATHS}`. Inline at the call site; remove the standalone artefact. Especially apt for unnamed "spacing helper" classes or single-use composables that don't earn their abstraction.
   - **generalize** — exactly 1 usage site, but the abstraction has semantic value worth preserving (e.g. an `@utility` with a meaningful name like `text-mono-caption`, even if used once today). Document the intended reuse path; don't inline.
   - **delete-unused** — 0 usage sites anywhere. Delete the artefact.
   - **demo-only-private** — 0 sites in `src/`, only used in `demo/`. Move under `demo/<area>/_internal/` if not already; document as private demo helper. Not a library candidate.

## Output format

```
| artefact | kind | def-site | sites-in-src | sites-in-demo | sites-in-consumers | verdict | rationale (with rg invocation) |
```

Demands:
- Every entry's site count cites the exact `rg` invocation in the rationale field.
- Zero generic claims ("seems unused"). Every verdict cites grep output.
- Idiomatic gestalt judgement on `generalize` vs `inline-and-remove`: one-shot anonymous helpers are inline-and-remove; one-shot semantic utilities are generalize.

## Substitutions

- `{SCOPE_PATHS}` — paths to audit (e.g., `src/components/ src/composables/ src/styles/`).
- `{CONSUMER_PATHS}` — where to count usage (e.g., `src/ demo/ ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/`).

## Forbidden

- Edits, commits, speculative claims, paraphrased grep output without showing the invocation.
- "Looks important, kept" — verdict requires runtime evidence (import count, not heuristic).
- Skipping consumers because they're slow to grep — read-only `rg` walks are cheap.

## Deliverable shape

Single markdown file: short prose preamble (≤ 200 words) explaining scope + method, then the table (table size unbounded — the table IS the deliverable). End with a **Verdict distribution** summary (count per verdict).
````

This prompt is the substrate for §Invariant 5 — running it at every tranche close keeps the codebase from accreting one-use artefacts.

## Directory layout (created during C)

```
docs/tranches/C/
├── C.md                           # this plan (committed at C.W0 open)
├── PROGRESS.md                    # dated wave log; updated at every boundary
├── FINAL.md                       # close document (W5)
└── audit/
    ├── W0-overfitting.md          # C.W0.A deliverable
    ├── W0-live-findings.md        # C.W0.B deliverable
    ├── W0-token-resolution.md     # C.W0.C deliverable
    ├── W0-file-bounds.md          # C.W0.D deliverable
    └── C-retro.md                 # post-close (W5)

docs/audits/
└── overfitting-audit.md           # canned reusable prompt (C.W0.A)

demo/.qa/
├── console-errors.md              # C.W4.A — committed
└── screenshots/                   # gitignored; only the markdown is committed
    ├── light/<route>.png
    ├── dark/<route>.png
    └── reduced-motion/<route>.png
```

## Verification (run end-to-end after C close)

- `npm run typecheck` + `npm run build` clean.
- 73-route Playwright walk in light + dark + reduced-motion: zero console errors, zero `TooltipProviderContext` errors.
- `/compositions/settings` and `/navigation/rail` render with non-empty `<main>`.
- `/compositions/dashboard` at 1440×900: every metric card content fits within its border (`scrollWidth ≤ clientWidth + 1`).
- `/primitives/buttons` (16 stories): pager dock pill width ≤ 80vw with internal horizontal scroll, centred.
- Rail at viewport 1440×600: inner pill `scrollHeight > clientHeight`, scrollable.
- `getComputedStyle(.font-mono-code).fontFamily` includes "Fira Code"; `.text-2xs` is `font-size: 10px`; `.rounded-card` resolves to a non-empty pixel value matching `--radius-2xl`.
- `git status -s` empty for `demo/stories/compositions/aurora**`.
- `npm run build` in fourier-analysis/web, words/frontend, bbnf-lang/playground all exit 0.
- `docs/tranches/C/audit/W0-overfitting.md` exists with verdict distribution showing ≥ 5 actionable rows.
- `docs/audits/overfitting-audit.md` exists as the reusable canned prompt.
- `git tag` includes `c-close`.

## Ground rules (inherited from bbnf-lang's tranche SPEC)

- **No workarounds.** Every fix is the root-cause fix (provider hosted at the right scope, utility defined in the cascade, primitive references in `@theme`).
- **No legacy code.** `IconTooltip` self-contained; no consumer footnotes. No deprecated re-exports. No backwards-compat shims.
- **No silent deferrals.** Items not addressed in C land in D explicitly with rationale.
- **No grep-only gates.** Every gate closes on Playwright DOM/style verification, build exit code, or file existence.
- **Tailwind-first.** New utilities are `@utility` blocks in existing CSS files. No raw rules outside the cascade.
- **No god modules.** `dock-tab-btn` lives in `dock.css` next to its sibling dock utilities, not in a fresh "tab" file.
- **Substrate-with-consumer.** Every `@utility` lands with a wired consumer in the same wave; no orphan declarations.
- **Frequent `/commit`.** One scope per sub-phase; commit immediately after typecheck+build pass.
- **Master clean before every wave dispatch.** Cherry-pick model: sub-agents commit in their worktrees; orchestrator integrates onto master at wave boundaries.
- **Indefatigability binds the orchestrator.** Sub-agents in 3+ iterations without progress halt, report, and relinquish; orchestrator dispatches research + plan + redress triumvirate.
- **Idiomatic, gestalt approach.** Architectural transpositions for elegance, simplicity, performance are mandatory. No quick fixes.

## Checklist — ready to dispatch C.W0

- [ ] `docs/tranches/C/C.md` on master (this plan).
- [ ] Worktrees pre-created: `glass-ui-wt-c-w0a`, `glass-ui-wt-c-w0b`, `glass-ui-wt-c-w0c`, `glass-ui-wt-c-w0d`.
- [ ] Sub-agent prompts drafted from `bbnf-lang/docs/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md`.
- [ ] Allow-lists verified disjoint within W0.
- [ ] Master clean (`git status --short` empty).
- [ ] Hard-gate phrasings runtime-verifiable (no grep-only gates).

## Checklist — ready to close C

- [ ] Every sub-phase landed with commit hash, or appears in FINAL's deferred ledger with destination tranche.
- [ ] Every invariant verified with artefact citation in FINAL.md.
- [ ] Every hard gate closed with evidence path.
- [ ] `npm run typecheck` + `npm run build` clean.
- [ ] 73-route Playwright sweep: zero console errors.
- [ ] Three consumer builds clean.
- [ ] `docs/tranches/C/FINAL.md` composed and committed.
- [ ] `docs/tranches/C/PROGRESS.md` has close entry with C HEAD commit hash.
- [ ] All C-specific worktrees removed.
- [ ] `git tag c-close` placed.
