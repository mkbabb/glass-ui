# O11 Lane e — value.js consumer deep-audit (O round 2; substrate post-N close, pre-O implementation)

7-axis bidirectional consumer audit, third pass for value.js. Target: `/Users/mkbabb/Programming/value.js/` (user WIP branch `w.w2.1-value-js-prebuild`).

## Scope

- **Target**: value.js, WIP branch `w.w2.1-value-js-prebuild`
- **Glass-ui reference**: post-N close (`docs/tranches/N/FINAL.md` CLEAN @ v1.1.4); O planning at HEAD
- **Audit date**: 2026-05-14
- **Mode**: O angle — local-fork disposition + header-ribbon ≥ 2-consumer cross-walk + 27-drift recategorization
- **Cross-repo policy**: READ-ONLY (`docs/tranches/O/dispatch/AGENT.md` hardened agent git clause; cross-repo paths use absolute per K W8 LL #1)

## § State delta vs N11/e N4-rerun

- `git log c0cc349..HEAD` → **0 commits** since N4-rerun (`2026-05-12`). WIP branch frozen at M.W1 Lane B close.
- Working-tree: identical to N4-rerun observation — 4 modified library-internal files (`plugins/vite-source-export.ts`, `src/index.ts`, `src/parsing/units.ts`, `src/units/normalize.ts`) + 5 untracked `src/parsing` and `src/units` modules. **Zero demo-surface drift**.
- 0 commits since M.W1 means substrate-side N invariants 22 (audit-verdict spot-verification) + 23 (wire-before-retire) apply unchanged.

## § 3 local forks — O-round disposition

### Fork 1 — `useClipboard` / `copyToClipboard` (`demo/@/composables/useClipboard.ts`, 28 LoC)

**value.js sites (recount):** 20 files contain `copyToClipboard|useClipboard` (vs N11/e's 14 + N4-rerun's 16) — the third count is the canonical one; the N11/e + N4-rerun figures undercounted by missing `useColorModel.ts`, `useSwatchActions.ts`, and similar composable internal call-sites.

```
demo/@/composables/useClipboard.ts                          (definition)
demo/@/composables/palette/usePaletteActions.ts             (caller)
demo/@/components/custom/dock/layers/SlugEditLayer.vue
demo/@/components/custom/gradient/GradientVisualizer.vue
demo/@/components/custom/gradient/GradientCodeEditor.vue
demo/@/components/custom/color-picker/ColorPicker.vue
demo/@/components/custom/color-picker/controls/ColorInput.vue
demo/@/components/custom/color-picker/composables/useColorModel.ts
demo/@/components/custom/palette-browser/PaletteCard.vue
demo/@/components/custom/palette-browser/PaletteDialog.vue
demo/@/components/custom/palette-browser/PaletteSlugBar.vue
demo/@/components/custom/palette-browser/composables/useSwatchActions.ts
demo/@/components/custom/panes/{GeneratePane,MixPane,BlobPane,AuroraPane}.vue
demo/@/components/custom/mix/MixResultDisplay.vue
demo/@/components/custom/generate/GenerateControls.vue
demo/color-picker/App.vue
demo/CLAUDE.md                                              (doc reference)
```

**Cross-consumer evidence:**

| Repo | Path | Shape |
|---|---|---|
| value.js | `demo/@/composables/useClipboard.ts` | async + execCommand fallback; returns boolean |
| fourier-analysis | `web/src/composables/useMorphConfig.ts:90` | inline; one-shot promise; no fallback; no boolean return |

fourier-analysis re-implements the same surface inline (verified at `rg -n "copyToClipboard|useClipboard" /Users/mkbabb/Programming/fourier-analysis/`); the value.js fork carries the more robust execCommand fallback shape.

**Disposition: PROMOTE to glass-ui** — clears ≥ 2-consumer bar (value.js 20 sites + fourier-analysis 1 site = 2 consumer repos). Canonical home: `@mkbabb/glass-ui/utils` (or `@mkbabb/glass-ui/clipboard` flat subpath if utility surface remains thin). value.js fork shape (async + execCommand fallback + boolean return) is the recommended canonical shape; fourier-analysis converges on import after promotion. Surface ships as utility (function, not composable) — no Vue reactivity needed for the fire-and-forget clipboard call shape both consumers use.

Tranche absorption: O.W* "consumer-substrate lifts" wave (TBD; recommend cohorting with usePopupMutex + useLayerTransition if those clear the bar at constellation level).

### Fork 2 — `usePopupMutex` (`demo/@/components/custom/dock/composables/usePopupMutex.ts`, 85 LoC)

**value.js sites:** 1 (Dock.vue) — unchanged since N11/e.

**Cross-consumer evidence:** zero. Cross-walked across `keyframes.js/`, `fourier-analysis/`, `bbnf-buddy/`, `words/` — no matches.

**Disposition: DEFER / hold as value.js-internal** — fails ≥ 2-consumer bar. The dock-popup-mutex pattern is a generic concern (any dock with mutually-exclusive popovers needs it), but only value.js' dock chrome currently surfaces the need. Hold under J invariant 10 / L invariant 8 conservation gate; revisit if a second consumer surfaces. Wire-before-retire posture (N invariant 23 / O AGENT.md §"Wire-before-retire") DOES NOT apply: this is consumer-local fork code, not under-wired glass-ui substrate.

### Fork 3 — `useLayerTransition` (`demo/@/components/custom/dock/composables/useLayerTransition.ts`, 123 LoC)

**value.js sites:** 1 (ActionBarLayer.vue) — unchanged since N11/e.

**Critical divergence from upstream**: value.js fork exposes a `layerProps(id)` convenience returning `{ class, inert }` — upstream glass-ui useLayerTransition (`src/components/custom/dock/composables/useLayerTransition.ts`) exposes only `currentLayer` / `leavingLayer` / `onTransitionEnd`. The fork is a deliberate API extension for template ergonomics, NOT a stale duplicate.

**Cross-consumer evidence:** zero. No other consumer carries a fork of useLayerTransition; keyframes.js / fourier-analysis / bbnf-buddy / words all have no matches.

**Disposition: PROMOTE the `layerProps()` convenience UPSTREAM into glass-ui useLayerTransition**, then DELETE the local fork — the upstream substrate is the canonical home for this primitive (it already lives in `src/components/custom/dock/composables/`), the fork's only justification is the missing convenience helper, and adding `layerProps()` to upstream takes ~10 LoC. This is NOT a ≥ 2-consumer promotion (the fork has 1 consumer); it is an idiomatic-API consolidation that absorbs an existing fork into existing substrate. Per O directive O5 (DRY) + O9 (better encapsulation) — the fork persists only because upstream is missing a small ergonomic helper; the gestalt fix is to add the helper upstream.

Tranche absorption: O.W* substrate-API wave (small upstream addition + value.js fork retirement) — paired with the value.js dispatch that removes the fork file once upstream ships.

## § Header-ribbon orphan — ≥ 2-consumer cross-walk verification

**value.js HEAD state:** `demo/@/components/custom/header-ribbon/HeaderRibbon.vue` (155 LoC) + `index.ts` STILL PRESENT, 0 in-repo consumers (only `index.ts` re-exports itself).

**Cross-repo evidence — POSITIVE:**

```
/Users/mkbabb/Programming/keyframes.js/demo/@/components/custom/editor-shell/EditorShell.vue:
    10:    <HeaderRibbon ref="headerRibbonRef" position="right">
    24:    </HeaderRibbon>
    70: import { HeaderRibbon } from "@components/custom/header-ribbon";
    106: const headerRibbonRef = ref<InstanceType<typeof HeaderRibbon> | null>(null);
```

keyframes.js carries its OWN copy at `demo/@/components/custom/header-ribbon/HeaderRibbon.vue` (152 LoC) — actively wired into EditorShell.vue with 4 references.

**Implementation drift between the two forks** (verified via `diff`):

| Axis | value.js (155 LoC) | keyframes.js (152 LoC) |
|---|---|---|
| z-index | `z-dock` (Tailwind class) | `z-[var(--z-dock)]` (arbitrary-value) |
| Hover-tracking | `isMouseOver` ref guards collapse scheduling | Absent |
| max-width | `--header-max-width: 500px` custom CSS var | inline `30rem` |
| Transition shape | unified base + side-specific overrides | side-specific transition triples |

**Disposition: DUAL — value.js retire (in-repo orphan) + glass-ui PROMOTE (cross-repo 2-consumer signal).**

1. The 2-consumer bar IS cleared at constellation level (value.js authored copy + keyframes.js authored copy = 2 consumer repos with the same primitive). Per L invariant 8 ("substrate-without-consumer is binary") + J invariant 10 (≥ 2 consumers required for library promotion), this PROMOTES.
2. Reconcile the drift: the value.js shape (hover-tracking + custom max-width var) is the more capable variant; canonical upstream HeaderRibbon should adopt it.
3. AFTER glass-ui ships HeaderRibbon at a flat subpath `@mkbabb/glass-ui/header-ribbon` (mirrored on `dock-group` / `glyph-face` precedent), retire both consumer copies in a follow-up sweep.
4. value.js' in-repo 0-consumer orphan finding from N11/e + N4-rerun is REVERSED at O — the orphan was a false negative because the audit only cross-walked the value.js repo, not the constellation.

**Wave attribution:** O.W* substrate-lift (paired with the local-fork PROMOTE batch above).

## § 27-drift recategorization (intentional vs accidental at O re-audit)

Per N11/e + N4-rerun, all 27 drift findings were classed "intentional overrides documented in DESIGN.md." O round re-categorization:

| Axis | Pattern | N classification | O re-categorization |
|---|---|---|---|
| 1 — Tokens | `--shadow-card` heavier cartoon offset | intentional | **INTENTIONAL** — load-bearing aesthetic identity per `feedback_presets_in_consumer` |
| 1 — Tokens | `--glass-opacity-subtle: 0.75` | intentional | **INTENTIONAL** — hero-blob readability |
| 1 — Tokens | `--select-font: var(--font-mono)` | intentional | **INTENTIONAL** — numeric-display alignment |
| 1 — Tokens | 11 layout-specific tokens (`--dock-h`, `--content-max-h`, ...) | intentional | **INTENTIONAL** — demo-scope extension; correct token-first per J invariant 1 |
| 1 — Tokens | Dark popover `hsl(224 50% 10%)` | intentional | **INTENTIONAL** — warmer override; verified non-bleed |
| 2 — Utility | `.palette-tab` + `.palette-tab-content` + `.touch-gate-target` + `.pane-scroll-fade` | clean | **INTENTIONAL** — canonical token consumption |
| 3 — Interactive | ~5 custom buttons miss `:focus-visible` | minor drift | **ACCIDENTAL minor** — fold into O.W* a11y polish wave (low-priority) |
| 3 — Interactive | 9 `:disabled` sites correct | n/a | n/a |
| 4 — Variant | `.featured-badge :deep(svg)` | clean | **INTENTIONAL** |
| 5 — Motion | 7 domain @keyframes | clean | **INTENTIONAL** — zero canon-duplication |
| 5 — Motion | ~70% prefers-reduced-motion coverage | demo-scope acceptable | **ACCIDENTAL minor** — fold into a11y polish wave |
| 6 — Typography | Markdown `line-height: 1.65` (vs `--leading-prose: 1.618`) | minor | **ACCIDENTAL trivial** — single-line fix; trivial-absorb wave |
| 7 — Accessibility | No `@supports (backdrop-filter)` guards | demo-scope acceptable | **INTENTIONAL** — demo scope; document only |

**Tally:** 24 INTENTIONAL + 3 ACCIDENTAL (focus-visible ~5 sites, reduced-motion ~30% gap, Markdown line-height). All 3 ACCIDENTAL findings are demo-scope value.js-internal — orchestrator does NOT mutate value.js WIP branch per O AGENT.md §"Cross-repo dispatch authorization"; surfacing them here for a future value.js-side dispatch.

## § N-wire regression check (post-N close)

- **N6 storybook mobile**: no value.js demo regression.
- **N7 dock blur**: inherited via subpath; no override.
- **N8 dock collapse**: inherited; no override.
- **N9 typography**: 0 value.js-authored `text-[Xrem]` literals (3 inherited shadcn-vue calendar literals out of scope).

**Verdict:** zero N-substrate regression.

## § Inline opacity-modifier audit (M.W1 Lane B promise)

`bg-[var(--color-*)]/N` pattern: **0 instances** at HEAD. Confirmed clean.

## § Dead-barrel audit

`dock/`, `goo-blob/`, `watercolor-dot/`, `palette-browser/` barrels — all clean. M.W1 Lane B cleanup holds at O.

## § Glass-ui surface gaps revealed (≥ 2 consumer signal at constellation level)

| Gap | value.js sites | Cross-consumer evidence | Disposition at O |
|---|---|---|---|
| `useClipboard`/`copyToClipboard` | 20 | fourier-analysis (1 site, inline) | **PROMOTE** — clears bar |
| `HeaderRibbon` | 0 in-repo + 4 keyframes.js EditorShell | keyframes.js (own copy, drifted) | **PROMOTE** — clears bar (constellation-level) |
| `useLayerTransition` `layerProps()` helper | 1 | NONE (single consumer) | **API-LIFT** — add helper upstream; retire fork; not a ≥ 2-consumer promotion |
| `usePopupMutex` | 1 | NONE | **DEFER** — fails bar |
| `.tab-content-crossfade` utility | 1 | NONE | **DEFER** — fails bar |

## § Spot-verification evidence (N invariant 22 / O AGENT.md §)

Every PROMOTE / API-LIFT / DEFER verdict above is anchored on:
- `rg -l "<symbol>" /Users/mkbabb/Programming/<consumer>/` (absolute cross-repo paths per O AGENT.md §"Repo-relative paths in worktrees")
- `git log c0cc349..HEAD` (0 commits) verifying state freeze
- `diff` of HeaderRibbon files between value.js + keyframes.js
- Direct file Read of useLayerTransition fork vs upstream

No verdict is speculative.

## Closing tally (delta vs N4-rerun)

| Metric | N11/e | N4-rerun | O11/e | Δ vs N4 |
|---|---|---|---|---|
| Drift findings | 27 | 27 | 27 (24 intentional + 3 accidental) | 0 (categorization refined) |
| Single-consumer overfitting candidates (value.js-internal) | 1 (header-ribbon) | 1 | 0 — cross-walk reverses | -1 |
| Local forks | 3 (all load-bearing) | 3 (all load-bearing) | 3 (1 PROMOTE + 1 API-LIFT + 1 DEFER) | 0 (dispositions firmed) |
| Constellation-level promotion candidates | 4 (deferred) | 4 (deferred) | 2 (PROMOTE) + 1 (API-LIFT) | -- |
| Glass-ui gaps cleared by O cross-walk | — | — | 2 (clipboard + header-ribbon) | -- |
| Commits since M close | — | 0 | 0 | 0 |
| useClipboard site recount | 14 | 16 | 20 | refined |

## Verdict

value.js post-N substrate: **stable at M close + actionable promotion signals at O**. Zero new drift, zero N-substrate regression, zero post-M commits — WIP branch unchanged. The O cross-repo cross-walk REVERSES two prior N findings:

1. **header-ribbon orphan finding** — N11/e + N4-rerun classified as value.js-internal 0-consumer. O cross-walk finds keyframes.js carries an actively-wired copy with implementation drift. Constellation-level ≥ 2-consumer bar IS cleared. Disposition: PROMOTE to glass-ui canonical subpath.
2. **useClipboard fork disposition** — N11/e flagged as load-bearing but pending cross-consumer evidence. O finds fourier-analysis carries inline implementation of the same surface. Bar cleared. Disposition: PROMOTE to glass-ui utils.

`useLayerTransition` fork: API-LIFT the `layerProps()` helper upstream; retire the fork (single-consumer, but the substrate exists upstream and the fork is a thin ergonomic delta).

`usePopupMutex` fork + `.tab-content-crossfade` utility: HOLD as value.js-internal, fails bar.

Per cross-repo READ-ONLY policy, no orchestrator action against value.js WIP branch; surface 3 ACCIDENTAL drift findings for future value.js-side dispatch.

## § Open questions for orchestrator

1. **HeaderRibbon promotion shape** — the value.js fork has hover-tracking + custom max-width var; keyframes.js fork lacks both. Canonical upstream shape SHOULD adopt the more-capable value.js variant. Confirm at O.W* substrate-lift wave authoring.
2. **useClipboard surface** — utility (function) or composable (Vue-reactive)? Recommend utility per both consumers' actual usage shape. Confirm at wave authoring.
3. **useLayerTransition `layerProps()` API-lift** — confirm adding a non-breaking method to upstream substrate is acceptable (or whether the new method requires a v1.2 / v2.0 bump per L invariant 4 "no backwards compat" reading).
4. **3 ACCIDENTAL value.js drift findings** — orchestrator surfaces in value.js-side cross-tranche-debt? Cross-repo READ-ONLY policy blocks direct action; confirm escalation path.

## § Worktree diff verification

This lane is read-only — no diff. Cross-repo absolute paths used per O AGENT.md §"Repo-relative paths in worktrees" (cross-repo READ-only operations may use absolute paths).
