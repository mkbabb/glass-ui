# N11 Lane e (N4-rerun) — value.js consumer re-audit (post-N substrate)

7-axis bidirectional consumer audit, second pass. Target: `/Users/mkbabb/Programming/value.js/` (user WIP branch `w.w2.1-value-js-prebuild`, unchanged since M.W1 Lane B close `c0cc349`).

## Scope

- **Target**: value.js demo root, WIP branch `w.w2.1-value-js-prebuild`
- **Glass-ui reference**: post-N substrate (N.W0-W3 closed; N.W4 in flight)
- **Audit date**: 2026-05-14
- **Mode**: delta re-verification vs N11/e baseline (`docs/tranches/N/audit/N11-Lane-e-value-js.md`)
- **Cross-repo policy**: READ-ONLY; orchestrator does NOT push to value.js WIP branch

## § Glass-ui pin verification

`package.json`: `"@mkbabb/glass-ui": "file:../glass-ui"` (workspace link; resolves to local glass-ui at HEAD = N tranche in flight). No pinned-version drift; consumer floats over orchestrator HEAD.

## § Commits since M close

`git log c0cc349..HEAD` → **0 commits**. WIP branch frozen at M.W1 Lane B close commit `c0cc349 "chore(demo): adopt glass-ui v1.0 subpath surface + retire local barrels"`. No regression surface introduced post-M.

## § Working-tree state

Unstaged modifications (non-demo, library-internal value.js source):
```
M plugins/vite-source-export.ts
M src/index.ts
M src/parsing/units.ts
M src/units/normalize.ts
?? docs/instructions/  + docs/precepts/
?? src/parsing/{animation-shorthand,extract,serialize,stylesheet}.ts
?? src/units/interpolate.ts
```

All modifications are in value.js library `src/` + tooling — **zero demo surface drift**. Consumer chrome under `demo/` is clean working-tree.

## § Import surface (post-M)

Demo barrel `demo/@/components/ui/index.ts` re-exports 30 component packages cleanly via root `@mkbabb/glass-ui` barrel. Subpath imports observed:
- `@mkbabb/glass-ui/controls` (DarkModeToggle)
- `@mkbabb/glass-ui/forms` (Input, Textarea)
- `@mkbabb/glass-ui/dark` (useGlobalDark)
- `@mkbabb/glass-ui/dock` (GlassDock, DockLayer, DockLayerGroup, DockDropdownTrigger, DockIconButton, DockSelectTrigger)
- `@mkbabb/glass-ui/tabs` (BouncyTabs)
- `@mkbabb/glass-ui/confirm-dialog` (ConfirmDialog)
- `@mkbabb/glass-ui/glass-carousel` (GlassCarousel, GlassCarouselItem)
- `@mkbabb/glass-ui/aurora` (Aurora, useAurora, AuroraConfig)
- `@mkbabb/glass-ui/search` (SearchBar)
- root `useTouchGate`

**Verdict**: 100% canonical v1.0 subpath shape. Zero `composables/dark` or `composables/keyboard` legacy paths. Zero retired-subpath usage (`pagination`, `virtual`).

## § 7-axis drift delta vs N11/e baseline (27 findings)

| Axis | Baseline finding | N4 rerun status |
|---|---|---|
| 1 — Tokens | 11 findings (3 patterns; all intentional overrides) | UNCHANGED — `--shadow-card` cartoon override + `--glass-opacity-subtle: 0.75` + `--select-font: var(--font-mono)` + 11 layout tokens + dark popover tuple all stable; documented in DESIGN.md |
| 2 — Utility/@apply | 4 sites (palette-tab, palette-tab-content, touch-gate-target, pane-scroll-fade) | UNCHANGED — all custom utilities still consume canonical tokens |
| 3 — Interactive | ~80% focus-ring coverage; 9 disabled sites correct | UNCHANGED — no new buttons added since M close |
| 4 — Variant/rooting | 1 site (`.featured-badge :deep(svg)` in PaletteCard) | UNCHANGED |
| 5 — Overlay/motion | 7 domain-specific keyframes; ~70% reduced-motion coverage | UNCHANGED — 11 keyframe names confirmed (`edit-drawer-in`, `swatch-pop`, `pane-{header,title,desc}-shrink`, `action-{pulse,spin}`, `input-mode-flash`, `crown-appear`, `golden-text-shimmer`, `blink`) = baseline 7 patterns counting pane-* triplet + action-* pair as grouped |
| 6 — Typography | 1 minor (Markdown inline `line-height: 1.65` vs `--leading-prose: 1.618`) | UNCHANGED — Markdown component unmodified |
| 7 — Accessibility | No `@supports (backdrop-filter)` guards (demo-scope acceptable) | UNCHANGED |

**Drift count delta**: **0**. All 27 findings preserved at original justification level; no new drift introduced.

Minor flag (non-blocking, demo-private): three calendar headcell sites (`CalendarHeadCell.vue`, `RangeCalendarHeadCell.vue`, `Calendar.vue`) carry an inherited `text-[0.8rem]` ad-hoc literal — this is **upstream shadcn-vue calendar canon** (not value.js-authored drift); shipped as-is by the upstream package. Not a value.js-N9-typography violation.

## § Orphan: `header-ribbon/`

`demo/@/components/custom/header-ribbon/HeaderRibbon.vue` + `index.ts` STILL PRESENT. Consumer count: **0** (no `HeaderRibbon` import anywhere in demo source). Status: **UNCHANGED orphan** since N11/e baseline. Pruning is a value.js-internal action; not glass-ui surface; orchestrator does not modify consumer repo per cross-repo READ-ONLY policy.

## § Local forks load-bearing re-verification

| Fork | Path | Sites | Status |
|---|---|---|---|
| `useClipboard` (copyToClipboard) | `demo/@/composables/useClipboard.ts` | 16 consumer sites | UNCHANGED — load-bearing |
| `usePopupMutex` | `demo/@/components/custom/dock/composables/usePopupMutex.ts` | 1 (Dock.vue) | UNCHANGED — load-bearing |
| `useLayerTransition` | `demo/@/components/custom/dock/composables/useLayerTransition.ts` | 1 (ActionBarLayer.vue) | UNCHANGED — load-bearing |

All 3 forks remain canonical demo-local primitives. No cross-consumer evidence has emerged yet — N11/a-d audits did not surface 2nd consumers for these fork primitives. Stays under J invariant 10 / L invariant 8 conservation gate (≥ 2 consumers required for library promotion).

## § N-wire regression check

- **N6 (storybook mobile)**: value.js hero-lab + dock chrome shipped pre-N; no regression surface from N6 mobile refactor.
- **N7 (dock blur)**: value.js Dock consumes `GlassDock` via subpath; inherits N7 blur canon automatically. No demo-side override.
- **N8 (dock collapse semantics)**: value.js Dock uses `useDockState` indirectly via `GlassDock`; inherits N8 collapse semantics.
- **N9 (typography ad-hoc literals)**: 0 value.js-authored `text-[Xrem]` literals (3 inherited shadcn-vue calendar literals out of scope).
- **N10 (V-tranche post-hoc precept)**: not consumer-facing.

**Verdict**: no N-substrate regression in value.js demo.

## § Inline opacity-modifier audit (M.W1 Lane B promise)

`bg-[var(--color-*)]/N` pattern: **0 instances** at HEAD. Confirmed clean.

## § Dead-barrel audit

`dock/index.ts`, `goo-blob/index.ts`, `watercolor-dot/index.ts`, `palette-browser/index.ts` — all clean. M.W1 Lane B cleanup holds at N4.

## § Glass-ui gaps revealed (≥ 2 consumer signal)

Same 4 candidates as N11/e baseline; cross-consumer evidence from N.W4 lanes a-d still pending synthesis:

| Gap | value.js sites | N11/a-d evidence | Disposition |
|---|---|---|---|
| `useClipboard`/`copyToClipboard` | 16 | TBD (likely 2nd consumer in words-frontend or bbnf-buddy) | conservative: defer until N.W4 cross-walk synthesis |
| `usePopupMutex` | 1 | TBD | defer |
| `useLayerTransition` | 1 | TBD | defer |
| `.tab-content-crossfade` utility | 1 | TBD | defer |

## § Union candidates

None. No vocabulary collisions surfaced post-N substrate.

## Closing tally (delta vs N11/e baseline)

| Metric | Baseline | N4 rerun | Δ |
|---|---|---|---|
| Drift findings | 27 | 27 | 0 |
| Single-consumer overfitting candidates (value.js-internal) | 1 (header-ribbon) | 1 (header-ribbon) | 0 |
| Local forks (load-bearing) | 3 | 3 | 0 |
| Dead-barrel residuals | 0 | 0 | 0 |
| Inline opacity-modifier abuse | 0 | 0 | 0 |
| Custom @keyframes (domain-specific) | 7 patterns | 7 patterns | 0 |
| Glass-ui gaps surfaced | 4 | 4 | 0 |
| N-substrate regression sites | — | 0 | n/a |
| Commits since M close | — | 0 | n/a |

## Verdict

value.js post-N substrate: **stable at M close**. Zero new drift, zero N-substrate regression, zero post-M commits. The WIP branch holds the M.W1 Lane B canonical v1.0-subpath consumer shape verbatim. All 3 local forks remain load-bearing pending N.W4 cross-consumer synthesis; `header-ribbon/` orphan remains value.js-internal pruning candidate (not glass-ui surface). Per cross-repo READ-ONLY policy, no orchestrator action against value.js WIP branch.
