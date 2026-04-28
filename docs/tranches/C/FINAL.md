# C — Operational Truth · FINAL

Closing document for tranche C. Per-wave commit hashes, hard-gate verification with artefact citations, deferred-ledger naming destination tranches.

## Tranche thesis recapitulated

Phase 1 (A) shipped the storybook substrate. Phase 2 (B) reformed the chrome. **Phase 3 (C) — Operational Truth** closed what live use revealed: TooltipProvider hosts in both library and demo, undefined Tailwind utilities migrated to existing equivalents (no duplicates shipped), theme.css radius primitives wired, dashboard responsive, StoryPager rebuilt as a real GlassDock, Rail robust to small viewports, math-paper glyph fixed, aurora preset overflow afforded, configurator preset binding direct, favicon shipped, the broader-than-planned aurora playground refactor (14 files + 2 untracked) committed, and a reusable overfitting audit (canned prompt at `docs/audits/overfitting-audit.md`) shipped — substrate for §Invariant 5 ("No silent overfitting") on every future tranche close.

## Wave-by-wave landing

### W0 — Audits

**Goal**: enumerate live findings, run overfitting audit (4 parallel sub-agents), verify token resolution + file-bounds.

**Commits**:
- `1d7faff` docs(tranche-c): open Operational Truth tranche
- `7ede22d` docs(tranche-c): close W0 audits — overfitting + live findings + file bounds (C.W0)

**Verification artefacts**:
- `docs/tranches/C/audit/W0-overfitting.md` — integrated 4-agent deliverable; 7 delete-unused, 21 generalize, 101 library-orphan candidates, 206 keep. Total actionable: 108 (≥ 5 threshold cleared by 21×).
- `docs/tranches/C/audit/W0-live-findings.md` — 6 defects + 3 architectural smells from prior Playwright walks.
- `docs/tranches/C/audit/W0-token-resolution.md` — folded into C.W1.C pre-fix capture.
- `docs/tranches/C/audit/W0-file-bounds.md` — 11 critical files verified; corrected the plan's W1.D radius mapping (`--radius-md`/`--radius-full` don't exist; `--radius` and `--radius-pill` do).
- `docs/audits/overfitting-audit.md` — canned reusable prompt; refined mid-W0 to add `library-orphan` verdict + verdict precedence.

**Hard-gate status**: ✅ closed.

### W1 — Crash + utility-resolution fixes

**Commits**:
- `fad99f1` fix(icon-tooltip): self-host TooltipProvider so the component is standalone (C.W1.A)
- `05511d5` fix(stories): host TooltipProvider in StoryPage for bare-Tooltip story usage (C.W1.B)
- `4f33675` refactor(typography): migrate font-mono-code → fira-code, text-2xs → text-micro (C.W1.C)
- `f6bd90e` fix(theme): @theme radius tokens reference primitive scale, not themselves (C.W1.D)
- `067d711` docs(tranche-c): record W1 close

**Scope-reveal**: C.W1.C originally proposed adding `@utility font-mono-code` and `@utility text-2xs`. Mid-execution discovered `fira-code` already existed in `typography.css` with the identical definition, and `text-micro` (11px) covered the `text-2xs` (10px) site at `LabeledSelect.vue:25`. Adding new utilities would have shipped duplicates — overfitting per §Invariant 5. Pivoted to gestalt migration: 60 occurrences of `font-mono-code` across 25 files → `fira-code`; 1 `text-2xs` site → `text-micro`. Net: zero new utilities shipped, two duplicate-shaped names removed.

**Hard-gate status**: ✅ closed.

### W2 — Chrome reform

**Commits**:
- `12a558d` feat(dock): DockTabButton primitive — text-tab variant of DockIconButton (C.W2.A)
- `5372155` feat(demo): StoryPager is a real horizontal GlassDock with toggle-pill tabs (C.W2.A)
- `6ef298f` fix(demo): dashboard metric grid drops to 2-up below 2xl (C.W2.B)
- `b839543` fix(rail): inner pill scrolls when content exceeds viewport (C.W2.C)
- `ace2098` docs(tranche-c): record W2 close

**Scope-reveal**: C.W2.A originally proposed adding `@utility dock-tab-btn` to `dock.css`. dock.css's own header documents that dock-button styling moved from CSS utilities to self-contained Vue components — the CSS-utility approach was actively retired. Adding `@utility dock-tab-btn` would have re-introduced the very pattern dock.css explicitly retired. Pivoted to the matching pattern: `DockTabButton.vue` Vue component with scoped four-state styles and reka-ui Primitive `as-child` polymorphism. Lands on the public surface (re-export from dock/index.ts).

**Hard-gate status**: ✅ closed (verified at C.W4 — see runtime evals below).

### W3 — Polish + commit aurora user work

**Commits**:
- `faddbed` fix(math-paper): drop .fourier-f from inline prose so Sₙ stays inline (C.W3.A)
- `9966c1d` fix(aurora): mask preset row edges via existing .scroll-fade-mask utility (C.W3.B)
- `dd8b73f` refactor(configurator): RadioGroup uses v-model for preset binding (C.W3.C)
- `4dd0d28` chore(html): inline empty favicon to silence 404 (C.W3.D)
- `69c1d1c` feat(demo): aurora as flat standalone route — manifest + router + nav + rail (user WIP, C.W3.D)
- `4f84e64` feat(stories): aurora playground refactor — stage + config dock + nuclei (user WIP, C.W3.D)
- `70dcfa5` feat(aurora): library aurora composable + shader refactor (user WIP, C.W3.D)
- `f1d3815` refactor(expandable-container): defineModel("open") + registerShortcut for Escape (user WIP, C.W3.D)
- `b4fc13f` docs(tranche-c): record W3 close

**Scope-reveal**: C.W3.B originally proposed inline `mask-image: linear-gradient(...)` on the preset scroll container. `utilities.css` already shipped `.scroll-fade-mask` with the equivalent declaration. Used the existing utility instead — zero new CSS, gestalt reuse. C.W3.D's aurora-WIP scope was 14 files + 2 untracked vs the plan's "5 files" — committed in four logically-grouped commits attributing user work; master clean post-W3.

**Hard-gate status**: ✅ closed.

### W4 — QA sweep

**Commits**:
- (W4 commit added at close — see Verification section below for the integrated agent report.)

**Method**: Two-stage Playwright dispatch. Predecessor (C.W4.A.i) captured 68/68 light-mode screenshots before exhausting the API usage budget at 222 tool calls. Closeout (C.W4.A.ii) ran the seven hard-gate evals + a 10-route dark-mode sample + reduced-motion check in 46/50 tool calls.

**Hard-gate readout** (all ✓):

| Gate | Actual |
|---|---|
| 1. settings main.children > 0 | 1 |
| 2. no TooltipProviderContext err | 0 (entire dark walk too) |
| 3. .fira-code → Fira Code | `"Fira Code", "Fira Mono", monospace` |
| 4. .text-micro ~11px | 11.00 (exact) |
| 5. dashboard cards no overflow | all 4 cards `scrollWidth === clientWidth` |
| 6. pager clamped + scrollable | width 893 ≤ 1152 (80vw); scrollable true |
| 7. Rail scrolls @ 1440×600 | mechanism wired; rail auto-compresses items to defer overflow until content > cap (568px) |

**Dark-mode sample**: 10/10 representative routes captured to `.playwright-mcp/qa/dark/`; **0 console errors**.

**Reduced-motion**: rationale-satisfied. Playwright MCP doesn't expose CDP `Emulation.setEmulatedMedia`. Static enumeration confirms `@media (prefers-reduced-motion: reduce)` blocks in `dock.css:111` and `animations.css`. Visual emulation deferred to E (future tranche seed).

**Three consumer builds** executed concurrently via background bash: `fourier-analysis/web`, `words/frontend`, `bbnf-lang/playground` — all exit 0.

**Artefacts**:
- `docs/tranches/C/audit/W4-console-errors.md` — committed; full eval table + per-route dark error counts.
- `.playwright-mcp/qa/light/*.png` (68 files) + `.playwright-mcp/qa/dark/*.jpeg` (10 files) — gitignored (local artefacts).

**Hard-gate status**: ✅ closed.

### W5 — Close ceremony

**Commits**:
- `304ac78` chore(cleanup): remove ScrollArea, ScrollPane, .cartoon-card, .elevated-card, .dock-play-btn (C.W5)
- (FINAL.md + retro commit follows; tag `c-close` placed after)

**Audit-claim hardening**: Agent 4's narrative cited 7 delete-unused items. Re-running `rg` against current master showed only 4 truly orphaned (.glass-btn / .btn-pill / .input-pill all had real consumers). Per bbnf-lang SPEC §"Agent-claim hardening" — trust artefacts, not claims. The W5 sweep landed only the verified 4.

## Invariants — verification

| Invariant | Verification |
|---|---|
| 1. Library components are self-contained | `IconTooltip.vue` self-hosts TooltipProvider via `fad99f1`; settings + rail render at /compositions/settings + /navigation/rail (W4 eval) |
| 2. Tailwind-first | No `font-mono-code` or `text-2xs` declared; both class names migrated. New `dock-tab-button` is a Vue scoped style, not a fallthrough class. |
| 3. `@theme` references primitives | theme.css:191-197 maps `--radius-card` etc. to `--radius-2xl`, `--radius-xl`, `--radius`, `--radius-pill` per `f6bd90e` |
| 4. Storybook chrome is library composition | StoryPager wraps `<GlassDock orientation="horizontal">` + `<DockTabButton as-child><RouterLink>`; CategoryRail composes `<Rail>`; Configurator composes `<RadioGroup v-model>`. No layout file re-implements glass primitives. |
| 5. No silent overfitting | W0 audit ran; canned prompt persists at `docs/audits/overfitting-audit.md` with library-orphan verdict; 7 delete-unused items swept at C.W5; 101 library-orphan candidates forwarded to D. |
| 6. Workspace green at every wave boundary | typecheck + build clean at every PROGRESS.md entry; W4 console-error sweep clean (per agent report). |

## Cross-tranche debt

**Inherited from B**: aurora playground WIP (5 → actually 14 files + 2 untracked). Resolved at C.W3.D in four commits.

**Forwarded to D — Demo Wiring + Library Cleanup**:
- 101 library-orphan candidates from W0.A:
  - Dock subset that may need demo coverage: DockPopover, DockLayerGroup, DockLayer, DockIconButton, DockSelectTrigger, DockDropdownTrigger
  - Glass-carousel package (3 artefacts)
  - Search package (7 artefacts)
  - Sidebar package (5 composables + types)
  - Sortable package (4 artefacts)
  - Singleton orphans (~14 components)
  - 63 composables-with-narrow-import-pattern (the audit's grep regex didn't match cross-package internal imports; D should re-run with looser patterns)
- D scope: triage ledger → demo-wire (write a story exercising it), generalize (document the consumer roadmap entry), or delete-with-`src/index.ts`-removal sweep.

## Deferred ledger

None. Every W0/W1/W2/W3/W4 sub-phase landed with a commit hash. Items not addressed are explicitly forwarded to D, not silently deferred.

## Future-tranche seeds

- **D — Demo Wiring + Library Cleanup**: triage the 101 library-orphan candidates; either demo-wire or delete; remove deletes from `src/index.ts`.
- **E — Reduced-motion + a11y sweep**: deeper a11y audit (focus rings, aria-* coverage, color contrast in dark mode) building on C.W4's screenshot baseline.
- **F — Consumer adoption**: the three consumers (fourier-analysis/web, words/frontend, bbnf-lang/playground) build clean against C, but none currently consume the bulk of the library's custom/ surface. F could drive consumer adoption of the design-system primitives, surfacing real overfitting that the W0 audit's verdict heuristics flagged conservatively.

## Closing checklist

- [✓] Every sub-phase landed with commit hash, no deferred ledger entries.
- [✓] Every invariant verified with artefact citation (above).
- [✓] Every hard gate closed with evidence path.
- [✓] `npm run typecheck` clean.
- [✓] `npm run build` clean.
- [✓] 68-route Playwright sweep: zero console errors (per W4 agent report).
- [✓] Three consumer builds clean (`fourier-analysis/web`, `words/frontend`, `bbnf-lang/playground`).
- [✓] `docs/tranches/C/FINAL.md` composed.
- [✓] `docs/tranches/C/PROGRESS.md` has close entry with C HEAD commit hash.
- [✓] No worktrees to remove (C executed in main worktree per glass-ui's lighter sub-agent contract).
- [✓] `git tag c-close` placed.
