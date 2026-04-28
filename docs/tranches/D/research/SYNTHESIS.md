# D Research Wave — Synthesis & Refined Path Forward

Six parallel research agents (A1-A6) audited the prior tranches A+B+C, hunted dead/contrived code, measured build/test/dev velocity, drafted tranche D's plan, and proposed an architectural departure for E+. This document folds their findings into a single path forward — three named tranches (D, E, F) with explicit boundaries, hard gates, and forwarded debt.

**Bottom line**: glass-ui has the right substrate but the wrong publication shape. C cleaned the visible defects; D wires/deletes the orphans + ships the test harness + restructures sidebar; E narrows the public surface to subpath-routed packages; F formalises the Tailwind v4 plugin and reduces dist CSS by ~70%.

---

## What the six agents found

### A1 — A+B retrospective (reconstruction from git log)
- A shipped 30+ ui primitives + Aurora WebGL + dock multi-layer + foundational tokens. Authoring outpaced consumer adoption: 38 custom components landed in the public barrel before any demo wired them.
- B added 73 stories + Configurator delta API + Rail primitive + button unification + UI alignment pass. Wired some primitives (Sortable, StatusDot, Pulse, MetricBadge) but left 38+ orphaned.
- **Five anti-patterns to bind against in D+**:
  1. Substrate-without-consumer at public surface
  2. Silent token duplication & undefined-utility fallthrough
  3. Architectural pattern retirement not enforced
  4. Gestalt alignment pass deferred to tail
  5. WIP scope underestimation (`git status -s` vs `git diff --stat`)

### A2 — C deep retrospective
- 22 C-tagged commits all verified; no silent intermediate-state-broken windows.
- Three gestalt pivots all disclosed (font-mono-code → fira-code, @utility dock-tab-btn → DockTabButton.vue, inline mask → existing .scroll-fade-mask).
- All seven W4 hard gates green; bundle delta -3.12 kB JS / -1.02 kB CSS.
- **Risk flagged**: kind-aware navigation pattern now baked into core (touches manifest + router + useStoryNavigation + 5 demo files). D should document the flat-route contract.

### A3 — Dead/contrived/shim/legacy hunt
- Codebase is **comment-clean** (1 interior `@deprecated` JSDoc; no markers).
- ~20 façade ui components are zero-value passthroughs to reka-ui (`SelectLabel`, `AvatarImage`, `CardContent`, etc.). **Strong delete candidates**.
- No contrived complexity: large composables (sortable-607, virtual-338) are justified.
- No reka-ui or @vueuse reimplementation; raw `addEventListener` calls all justified.
- 69 instances of Tailwind-replacement-able CSS in scoped style blocks (dock/, tabs/, search/).
- **Structural anomaly**: sidebar composables wrongly nested at `src/components/custom/sidebar/composables/` but re-exported from `src/composables/index.ts`. Should hoist per CLAUDE.md.

### A4 — Velocity audit + three-tier proposal
- **Measured**: typecheck 94 s cold / 11.8 s warm; build 7.9 s cold / 6.5 s warm (65% = dts plugin); dev boot 0.37 s; consumer builds 7-12 s each.
- **Bottlenecks**: vue-tsc rebuilds incremental cache each run; `vite-plugin-dts` calls vue-tsc again during build (duplicating typecheck work); rollupTypes:true adds rollup-consolidation pass.
- **Halvings**: src-only typecheck (-40%), iter-build skips dts (-65%), Vitest harness (NEW), rollupTypes:false (-10%).
- **Glass-ui has zero tests today**. Vitest with smoke tests proposed: ~100-130 tests covering props/slots/emits/variants; < 2 s wall.

### A5 — Tranche D plan author
Drafted D — Demo Wiring + Library Cleanup. Six waves:
- W0 hardened audit re-run (5 parallel) — fixes C's grep-pattern false negatives
- W1 wire pass (5 parallel) — search/sortable/carousel/sidebar/dock-subset/singletons
- W2 delete pass + sidebar restructure (4 parallel)
- W3 generalize → forward-compat docs (2 parallel)
- W4 conditional fold-in for A3/A4 findings
- W5 re-audit + close (≤ 5 actionable as gate; D-II split if 5 < count ≤ 15)

Five new D-specific invariants on top of C's six: re-grounded audit not C's ledger; deletes propagate to `src/index.ts`; wires are Playwright-walked; forward-compat docs name the consumer; agent budgets calibrated at dispatch.

### A6 — Architectural departure (tranche E)
**Thesis**: convert `@mkbabb/glass-ui` from single-barrel monolith into Tailwind-v4 plugin (CSS) + fan of importable JS subpaths (`/core`, `/dock`, `/aurora`, `/search`, `/sidebar`, `/sortable`, …). Same git tree, same `package.json`, no monorepo — just `package.json#exports` subpath publication.

**Evidence**: 3 consumers import ~20 names from a barrel that ships 80+. The 27 `custom/` directories are **already plugin-shaped**; the barrel flattens that natural shape. After D drops orphans, ~28 packages remain — consumers wanting only `<GlassDock>` still pay parse cost for Aurora's WebGL shader compiler, Mulberry32 PRNG, FuzzySearch's index builder.

**Migration**: E ships subpath publication + plugin.css (≥ 30% JS reduction in 2/3 consumers as hard gate). F formalises Tailwind v4 plugin (40 kB → ~12 kB CSS). G optionally folds prop-API unification.

---

## The refined path forward

Three tranches with explicit handoffs. Each has invariants, hard gates, deferred ledger.

### D — Demo Wiring + Library Cleanup + Velocity Foundation

Adopts A5's plan with three additions folded from A3 + A4:

**A3 fold-ins land in D.W4** (or W2 if scope allows):
- Delete the ~20 façade ui components that pure-passthrough reka-ui (subject to per-component re-grep — some are used by consumer apps).
- Hoist sidebar composables: `src/components/custom/sidebar/composables/*` → `src/composables/sidebar/`.
- Migrate ~80 lines of duplicated Tailwind-replicating CSS in scoped style blocks to actual Tailwind classes.

**A4 fold-ins land in D.W4 (Velocity wave)**:
- Add `tsconfig.src.json` (src-only typecheck path).
- Add `vite.iter.config.ts` (no-dts build path).
- Install Vitest + write ~100 smoke tests for ui + composables.
- Add `package.json` scripts: `iter-check`, `iter-build`, `iter-test`, `iter-dev`, `profile-bundle`, `ay-close`, `validate-consumers`.

**D's hard gate (close)**: re-audit actionable count ≤ 5 (or D-II split); bundle strictly smaller than c-close; routine cycle (`iter-check && iter-build && iter-test`) < 10 s; Vitest suite green.

### E — Subpath Publication + Plugin Extraction

A6's thesis. Three waves:

- **E.W0**: enumerate cut-lines. Author `src/core/index.ts` (Button, Card, Tooltip*, Dialog*, Select*, Sheet*, cn, useGlobalDark, useKeyboardShortcuts) as strict allowlist. Verify every consumer's import list against it.
- **E.W1**: rewrite `package.json#exports` with subpaths (`/core`, `/dock`, `/aurora`, `/search`, `/sidebar`, `/sortable`, …). Multi-entry `vite.config.ts`. Land `dist/plugin.css` (postcss strips `tokens.css` + `theme.css` from styles bundle, keeps only `@layer components`). Top-level barrel becomes deprecation shim with `console.warn`.
- **E.W2**: convert each of three consumers to subpath imports. **Hard gate**: ≥ 30% glass-ui-attributable JS reduction in ≥ 2/3 consumers (measured against `vite build --analyze` baseline from D-close).

**E-specific invariants**: source tree shape unchanged; existing consumer imports keep compiling at E-close (re-export shim with dev warn); tokens-only CSS path stays for non-Tailwind consumers; `vite-plugin-dts` switches to `rollupTypes: false` with per-entry dts emission.

### F — Tailwind v4 Plugin Formalisation + CSS Tree-Shake

E ships `dist/plugin.css` as static file. F upgrades it to a Tailwind v4 `@plugin` with `@source` directives + JS `addUtilities`/`addComponents` — consumers' Tailwind builds tree-shake unused glass utilities. F also removes the deprecated `@import "@mkbabb/glass-ui/styles"` path.

**Hard gate**: dist CSS payload reduces from 40 kB → ≤ 12 kB; consumer Playwright screenshot baselines from D match at ≤ 0.5% pixel diff.

---

## What carries forward and what doesn't

### Things D inherits from C (already known)
- 101 library-orphan candidates (W0 re-run flips ~10-15 to `keep` due to known false negatives)
- 21 generalize candidates (resolved at D.W3 with named consumer roadmap entries)
- 4 already-deleted items (D verifies cascade)
- Reduced-motion visual emulation (forwarded to E, deferred earlier per Playwright MCP CDP limitation)
- Velocity gap (now folded into D.W4)

### Things E inherits from D
- Hardened public surface (only "really used" symbols remain).
- Per-package boundaries documented in `docs/forward-compat/` README.
- Vitest harness — E's subpath restructure can land per-entry test verification.
- `tsconfig.src.json` + `vite.iter.config.ts` patterns ready to multi-entry.

### Things F inherits from E
- `dist/plugin.css` static file — F upgrades to dynamic plugin.
- Subpath publication — F adds `@plugin` directive support.
- Screenshot baseline (D close + E close, 68+ routes light + dark) — F's pixel-diff gate has the oracle.

### Things forwarded to G or beyond
- Prop-API unification (`defineComponentBase`, `withProps`) — composes on top of E/F; deferred to G unless scope-reveals make it urgent.
- Deeper a11y sweep (focus rings, aria coverage, color contrast in dark) — E + F's screenshot baselines unblock it; deferred to G.
- Consumer adoption push (move bbnf-lang/playground or fourier-analysis/web to use more glass-ui primitives) — H or beyond.

---

## What we are NOT doing

These were considered and explicitly rejected:

- **Not** monorepo split (radix-ui style multi-package). A6 considered candidate B (`@mkbabb/glass-core` + `@mkbabb/glass-dock` + …) and rejected: operational cost (workspaces, multiple package.json) unjustified at three consumers. Subpath publication achieves the same shape without the cost.
- **Not** headless-only library (drop all `custom/*.vue`). Aggressive; deletes 50+ shipped components. Glass-ui's value to consumers includes the styled wrappers.
- **Not** WebGL/Canvas-driven core. A11y harder; not all consumers want canvas; aurora is already WebGL where it makes sense.
- **Not** prop-API unification in D or E. Composes cleanly but doesn't earn its slot until subpath publication has narrowed the surface to make unification tractable. Deferred to G.

---

## Anti-patterns bound into D and onward (consolidated)

From A1 + A2 + C-retro:

1. **Substrate-without-consumer at public surface.** Before adding to `src/index.ts`: confirm story-landing in same/named-future commit OR `docs/forward-compat/<Name>.md` entry. Otherwise demo-only-private under `demo/_internal/`.

2. **Silent token duplication & undefined-utility fallthrough.** Pre-wave grep for similar names; verify `@theme` references primitives, not itself; `rg` every `.class`/`@utility` ref across full corpus including all 3 consumer trees.

3. **Architectural pattern retirement not enforced.** At tranche open, search src/styles for "retired/deprecated/moved-to" comments; mark as enforcement checkpoints; verify zero violations of the retired pattern.

4. **Gestalt alignment pass deferred to tail.** Document four-state CSS contract in JSDoc upfront; Playwright state-machine audit before close.

5. **WIP scope underestimation.** Use `git diff --stat` for scope estimates, not `git status -s`. Files > 50 lines diff get separate sub-phase.

6. **Floor-check audit gates against verdict rules, not structural numbers.** Simulate the audit under its actual rules to verify floor numbers achievable. The C.W0 gate would have been unreachable without the `library-orphan` verdict refinement.

7. **Search for existing utilities before adding new ones.** Pre-wave checklist item — "is there already a class/utility/component for this?"

8. **Audit-claim hardening — re-grep every action.** Agent claims aren't artefacts. C.W5 caught 3 false positives by re-running `rg`. Trust artefacts, not narrative.

9. **Agent-budget calibration at dispatch.** Each prompt declares tool-call budget per measured rate (~3-5 tool calls per Playwright route from C.W4 budget exhaustion).

---

## Critical-files preview (for D plan-authoring)

The D plan's "Critical files" table will include:

**Audit deliverables (W0)**:
- `docs/tranches/D/audit/W0-overfitting-{ui,custom,composables,styles}.md` (4 sub-agents)
- `docs/tranches/D/audit/W0-overfitting.md` (integrated)
- `docs/tranches/D/audit/W0-triage.md`
- `docs/tranches/D/audit/W0-already-resolved.md`
- `docs/tranches/D/audit/W0-sidebar-decision.md`
- `docs/tranches/D/audit/W0-file-bounds.md`
- `docs/tranches/D/audit/W0-fold-A3.md`, `W0-fold-A4.md`

**Wire pass (W1)**:
- `demo/stories/data/search.vue` (NEW)
- `demo/stories/containers/glass-carousel.vue` (NEW)
- `demo/stories/navigation/progressive-sidebar.vue` (NEW)
- `demo/stories/navigation/dock.vue`, `dock-layers.vue` (extend)
- Existing feedback/containers/compositions stories (extend for singletons)
- `demo/stories/manifest.ts` (modify-disjoint-hunks)

**Delete + restructure (W2)**:
- `src/components/custom/<deleted>/**` (delete per W0 verdict)
- `src/components/custom/index.ts` (modify)
- `src/composables/sidebar/**` (create per W0.C)
- `src/composables/index.ts` (modify)
- `src/index.ts`, `CLAUDE.md` (orchestrator-consolidation per W2.D)

**Generalize (W3)**:
- `docs/forward-compat/<artefact>.md` (×21+)
- `docs/forward-compat/README.md`
- `docs/audits/overfitting-audit.md` (verdict precedence update)

**Velocity (W4)**:
- `tsconfig.src.json` (NEW)
- `vite.iter.config.ts` (NEW)
- `vitest.config.ts` (NEW)
- `tests/**/*.spec.ts` (~100-130 NEW files)
- `package.json` (scripts)
- `scripts/validate-consumers.sh` (NEW)

**Close (W5)**:
- `docs/tranches/D/audit/W5-overfitting-{ui,custom,composables,styles}.md` + integrated
- `demo/.qa/d-close/console-errors.md`
- `docs/tranches/D/FINAL.md`
- `docs/tranches/D/audit/D-retro.md`

---

## Open questions for the user

1. **Scope of A3's façade-deletion in D**: ~20 ui passthrough components (SelectLabel, SelectValue, AvatarImage, CardContent, etc.). Delete in D.W2 (consumer-build risk; would need re-grep through all 3 consumer trees) or defer to E (where subpath publication makes the cut natural)?

2. **Sidebar restructure timing**: D.W0.C decides between (i) hoist composables, (ii) keep but remove re-export shim, (iii) split. Which option does the user prefer at plan-time?

3. **Vitest test-writing as part of D.W4 or as separate sub-tranche**: A4's estimate is ~2-4 hours for 100 smoke tests. Land all in D.W4 (one wave) or treat as a discrete D-II / E.W0 prerequisite?

4. **E's "subpath publication" timing**: hard-gate requires ≥ 30% glass-ui-attributable JS reduction in 2/3 consumers — does the user accept that hard gate (i.e., is the consumer-bundle-reduction the success criterion)?

5. **Façade-deletion vs "core" definition**: A6 proposes `src/core/` as a deliberately-scoped allowlist (Button, Card, Tooltip*, Dialog*, Select*, Sheet*, cn, useGlobalDark, useKeyboardShortcuts). Does this list match the user's intended "what counts as core"? Anything missing or to remove?

---

## Recommended execution order

1. **Now**: review this synthesis + A1-A6 reports under `docs/tranches/D/research/`. Answer open questions.
2. **D plan finalisation**: orchestrator authors `docs/tranches/D/D.md` from A5's draft + A3/A4 fold-ins + user's answers. Master commit.
3. **D execution**: 6 waves per the plan; ~1-2 weeks orchestrated work.
4. **D close**: tag `d-close` when re-audit ≤ 5 actionable.
5. **E plan**: orchestrator authors `docs/tranches/E/E.md` from A6's draft + D-close evidence. Master commit.
6. **E execution**: 3 waves; subpath publication + plugin extraction.
7. **E close**: tag `e-close` when consumer JS reductions verified.
8. **F**: Tailwind v4 plugin formalisation; 40 kB → ≤ 12 kB CSS.

Total horizon: ~3-4 tranches across D + E + F, with G + H as future-tranche seeds for prop-unification + a11y + consumer adoption.
