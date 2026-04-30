# D.W0.A.4 - Hardened Overfitting Audit: `src/styles/`

Scope: `src/styles/` definitions, counted against `src/`, `demo/`, `../fourier-analysis/web/src/`, `../words/frontend/src/`, and `../bbnf-lang/playground/src/`.

Missing consumer dirs: none. All five roots existed during the run:

```sh
find src demo ../fourier-analysis/web/src ../words/frontend/src ../bbnf-lang/playground/src -maxdepth 0 -type d -print
```

`docs/precepts/instructions/{README.md,ORCHESTRATION.md,tranche/SPEC.md}` were requested in the dispatch but are absent in this worktree; `docs/instructions/README.md`, `CLAUDE.md`, `docs/tranches/D/D.md`, `docs/tranches/D/waves/W0.md`, `docs/audits/overfitting-audit.md`, and `docs/tranches/C/audit/W0-overfitting.md` were read.

## Reproducible Commands

Inventory counts were produced from CSS definitions only:

```sh
node <<'NODE'
const fs = require('fs');
const path = require('path');
const files = [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (p.endsWith('.css')) files.push(p);
  }
}
walk('src/styles');
files.sort();
const classes = new Set();
const utilities = new Set();
const keyframes = new Set();
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of text.matchAll(/@utility\s+([A-Za-z0-9_-]+)/g)) utilities.add(m[1]);
  for (const m of text.matchAll(/@keyframes\s+([A-Za-z0-9_-]+)/g)) keyframes.add(m[1]);
  for (const m of text.matchAll(/([^{}@][^{}]*)\{/g)) {
    const selector = m[1];
    const trimmed = selector.trim();
    if (selector.includes(':root') || trimmed.startsWith('from') || trimmed.startsWith('to') || /^\d+%/.test(trimmed)) continue;
    for (const cm of selector.matchAll(/\.(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/g)) classes.add(cm[1]);
  }
}
console.log({ styleFiles: files.length, classes: classes.size, utilities: utilities.size, keyframes: keyframes.size, total: classes.size + utilities.size + keyframes.size });
NODE
```

Per-artefact class and `@utility` site counts use this template. It excludes definitions under `src/styles/` so CSS selectors do not self-count:

```sh
rg -l --glob '!src/styles/**' '(^|[^A-Za-z0-9_-])<name>([^A-Za-z0-9_-]|$)' \
  src demo ../fourier-analysis/web/src ../words/frontend/src ../bbnf-lang/playground/src | sort | wc -l
```

Keyframe usage counts use animation references, not bare `@keyframes` definitions:

```sh
rg -n 'animation(-name)?\s*:[^;{}]*<name>|@keyframes\s+<name>' \
  src/styles src demo ../fourier-analysis/web/src ../words/frontend/src ../bbnf-lang/playground/src
```

C.W5 already-deleted rows were checked with:

```sh
rg -n '^\s*\.cartoon-card|^\s*\.elevated-card|^\s*\.dock-play-btn' src/styles --glob '*.css'
rg -l --glob '!src/styles/**' '(^|[^A-Za-z0-9_-])cartoon-card([^A-Za-z0-9_-]|$)' src demo ../fourier-analysis/web/src ../words/frontend/src ../bbnf-lang/playground/src | sort | wc -l
rg -l --glob '!src/styles/**' '(^|[^A-Za-z0-9_-])elevated-card([^A-Za-z0-9_-]|$)' src demo ../fourier-analysis/web/src ../words/frontend/src ../bbnf-lang/playground/src | sort | wc -l
rg -l --glob '!src/styles/**' '(^|[^A-Za-z0-9_-])dock-play-btn([^A-Za-z0-9_-]|$)' src demo ../fourier-analysis/web/src ../words/frontend/src ../bbnf-lang/playground/src | sort | wc -l
```

## Inventory Counts

| kind | definition count | current-consumer evidence | zero current sites |
|---|---:|---:|---:|
| CSS class selectors | 171 | 75 | 96 |
| `@utility` blocks | 24 | 24 | 0 |
| `@keyframes` blocks | 22 | 16 | 6 |
| **Total current inventory** | **217** | **115** | **102** |

Package public-surface check: `package.json` exports `./styles` as `./src/styles/index.css` and `./styles/*` as `./src/styles/*`, so zero-site style definitions are public style-surface orphans, not private dead code by default.

## Verdict Distribution

Current inventory only:

| verdict | count | rationale |
|---|---:|---|
| current-consumer evidence | 115 | At least one current site in `src/`, `demo/`, or one of the three external consumer roots. |
| library-orphan | 102 | Present in the public `./styles` surface but no current consumer site found by the cited `rg` template. |
| inline-and-remove | 0 | One-site rows were kept as current-consumer evidence because style utilities are public through `./styles`; consumer migration is not in D.W0.A.4. |
| delete-unused | 0 | No current in-inventory style row was demoted below public-surface orphan status. |

C.W5 already-deleted style rows, outside current inventory:

| artefact | C.W5 state | current sites | verdict | evidence |
|---|---|---:|---|---|
| `.cartoon-card` | definition absent | 15 | current-consumer evidence, already-deleted | `rg -l --glob '!src/styles/**' '(^|[^A-Za-z0-9_-])cartoon-card([^A-Za-z0-9_-]|$)' ...` finds only `../fourier-analysis/web/src` files. |
| `.elevated-card` | definition absent | 0 | delete-unused, already-deleted | same command template with `elevated-card` returns `0`. |
| `.dock-play-btn` | definition absent | 0 | delete-unused, already-deleted | same command template with `dock-play-btn` returns `0`. |

Non-style C.W5 deletions (`ScrollArea`, `ScrollPane`) are out of scope for this `src/styles/` audit.

## C.W5 False-Positive Recheck

The three C.W0 style rows rejected during C.W5 hardening still have current consumers:

| artefact | current sites | verdict | evidence |
|---|---:|---|---|
| `.glass-btn` | 8 | current-consumer evidence | `demo/configurator/Configurator.vue`, `demo/stories/primitives/buttons.vue`, and 6 Fourier files. |
| `.btn-pill` | 1 | current-consumer evidence | `src/components/ui/button/index.ts`. |
| `.input-pill` | 3 | current-consumer evidence | `src/components/ui/input/Input.vue`, `src/components/ui/textarea/Textarea.vue`, `demo/stories/primitives/inputs.vue`. |

## Library-Orphan Rows

These 102 current definitions have zero current sites by the cited template and remain D triage candidates.

| kind | count | artefacts |
|---|---:|---|
| CSS classes | 96 | `.badge-enter-active`, `.badge-leave-active`, `.bg-paper-aged`, `.bg-paper-clean`, `.btn-interactive`, `.card-hover`, `.card-hover-interactive`, `.checkbox-glass`, `.dashed-well`, `.dialog-scale-enter-active`, `.dialog-scale-enter-from`, `.dialog-scale-leave-active`, `.dialog-scale-leave-to`, `.divider-v`, `.dock-in`, `.dock-inset`, `.dock-label`, `.dropdown-enter-active`, `.dropdown-enter-from`, `.dropdown-leave-active`, `.dropdown-leave-to`, `.expand-fade-enter-active`, `.expand-fade-enter-from`, `.expand-fade-leave-active`, `.expand-fade-leave-to`, `.fade-slide-enter-active`, `.fade-slide-enter-from`, `.fade-slide-leave-active`, `.fade-slide-leave-to`, `.floating-panel-item`, `.glass-pill`, `.gold-shimmer-subtle`, `.gold-shimmer-text`, `.heatmap-1`, `.heatmap-2`, `.heatmap-3`, `.heatmap-4`, `.heatmap-5`, `.heatmap-6`, `.heatmap-7`, `.heatmap-8`, `.heatmap-9`, `.heatmap-10`, `.hover-shadow-lift`, `.icon-xs`, `.icon-sm`, `.icon-md`, `.icon-lg`, `.icon-xl`, `.input-focus`, `.metric-swap-enter-active`, `.metric-swap-enter-from`, `.metric-swap-leave-active`, `.metric-swap-leave-to`, `.pane-dir-enter-active`, `.pane-dir-enter-from`, `.pane-dir-leave-active`, `.pane-dir-leave-to`, `.pane-left-enter-active`, `.pane-left-enter-from`, `.pane-left-leave-active`, `.pane-left-leave-to`, `.pane-right-enter-active`, `.pane-right-enter-from`, `.pane-right-leave-active`, `.pane-right-leave-to`, `.pane-scroll-fade`, `.pane-slide-enter-active`, `.pane-slide-enter-from`, `.pane-slide-leave-active`, `.pane-slide-leave-to`, `.pane-swap-enter-active`, `.pane-swap-enter-from`, `.pane-swap-leave-active`, `.pane-swap-leave-to`, `.paper-texture-aged`, `.proportional-nums`, `.rainbow-border`, `.rainbow-pastel`, `.rainbow-text`, `.rainbow-vivid`, `.scroll-reveal`, `.scroll-reveal-reverse`, `.scroll-weight-reveal`, `.sort-button-active`, `.stagger-children`, `.status-dot--active`, `.status-dot--idle`, `.status-dot--paused`, `.text-breathe`, `.text-glass-legible`, `.text-hover-spread`, `.text-pane-description`, `.text-wonk-hover`, `.touch-gate-active`, `.touch-gate-target` |
| `@utility` blocks | 0 | none |
| `@keyframes` blocks | 6 | `card-menu-in`, `dialog-in`, `dialog-out`, `dialog-out-to-drawer`, `dialog-in-from-drawer`, `rainbow-hue` |

## Current-Consumer Evidence Summary

All 24 `@utility` blocks have at least one current use. Single-site utilities are still retained as current-consumer evidence in this audit because they are public style API: `paper-underpaint`, `text-body`, `text-math`, `text-math-body`, `text-mono-micro`, and `text-mono-small`.

Notable one-site class/keyframe rows:

| artefact | kind | current site | verdict |
|---|---|---|---|
| `.btn-pill` | class | `src/components/ui/button/index.ts` | current-consumer evidence |
| `.input-bar` | class | `src/components/custom/search/SearchBar.vue` | current-consumer evidence |
| `.input-bar-field` | class | `src/components/custom/search/SearchBar.vue` | current-consumer evidence |
| `.dock-layer-grid` | class | `src/components/custom/dock/composables/useLayerTransition.ts` | current-consumer evidence |
| `.dock-layer-item` | class | `src/components/custom/dock/composables/useLayerTransition.ts` | current-consumer evidence |
| `.paper-texture` | class | `../fourier-analysis/web/src/App.vue` | current-consumer evidence |
| `.shake-error` | class | `../words/frontend/src/components/custom/search/components/SearchBarShell.vue` | current-consumer evidence |
| `@keyframes collapsible-open` | keyframe | `../fourier-analysis/web/src/components/ui/CollapsibleSection.vue` | current-consumer evidence |
| `@keyframes collapsible-close` | keyframe | `../fourier-analysis/web/src/components/ui/CollapsibleSection.vue` | current-consumer evidence |
| `@keyframes floating-panel-in` | keyframe | `src/styles/floating-panel.css` | current-consumer evidence |
| `@keyframes weight-breathe` | keyframe | `src/styles/typography.css` | current-consumer evidence |
| `@keyframes weight-reveal` | keyframe | `src/styles/typography.css` | current-consumer evidence |

## Deltas From C.W0/C.W5

| prior row | C.W0/C.W5 state | D.W0.A.4 result |
|---|---|---|
| `.glass-btn` | C.W0 listed as delete-unused; C.W5 kept after re-grep | Still current-consumer evidence, 8 sites. |
| `.btn-pill` | C.W0 listed as delete-unused; C.W5 kept after re-grep | Still current-consumer evidence, 1 source site. |
| `.input-pill` | C.W0 listed as delete-unused; C.W5 kept after re-grep | Still current-consumer evidence, 3 sites. |
| `.cartoon-card` | C.W5 deleted | Definition is absent, but current Fourier consumer references remain in 15 files. This is not a new style delete target; it is a deleted-definition/current-consumer mismatch for orchestrator triage. |
| `.elevated-card` | C.W5 deleted | Definition absent, 0 current sites. |
| `.dock-play-btn` | C.W5 deleted | Definition absent, 0 current sites. |

## Decision

No `src/styles/` edits are proposed by D.W0.A.4. The current source inventory has 102 public style-surface library orphans and 115 rows with current-consumer evidence. The only C.W5 mismatch is `.cartoon-card`: it is already deleted from `src/styles`, but `../fourier-analysis/web/src` still references it.
