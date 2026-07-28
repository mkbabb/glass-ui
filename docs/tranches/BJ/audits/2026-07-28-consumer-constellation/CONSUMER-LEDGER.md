# Glass UI consumer constellation ledger

Observed: 2026-07-28T18:25:26.886Z

Receipt: `6dc4411819c7258a3aeb494aec005c059603aef5efe91c3966606464ec45e16a`

## Scope correction

The migration universe and the visual-app universe are different sets. The
closed dependency universe is the value.js V-next bound of fifteen Git roots
plus six typed repository subpaths. The live visual audit covers twelve
logical application surfaces. Atlas is additionally a pure library relay. The current
`sci`, `atlas`, and `keyframes.js` working mirrors are recorded because they host
live work, but they do not silently replace the closed-universe authorities.
`oscilloscope` has no current Glass import or manifest edge and is a negative
control, not an application consumer.

## Root ledger

| Root | Scope | HEAD | Glass manifest declarations | Import files | Import edges | Text files/refs | Worktree |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| `atlas-active` | `closed-universe` | `6dd96b919a` | devDependencies: 7.0.0<br>peerDependencies: ^7.0.0 | 45 | 74 | 56/96 | 0 tracked / 0 untracked |
| `bbnf-buddy` | `closed-universe` | `b218922042` | dependencies: ^3.9.0 | 34 | 52 | 36/61 | 0 tracked / 0 untracked |
| `bbnf-lang` | `closed-universe` | `af15f63e0d` | dependencies: ^3.0.0 | 13 | 23 | 13/23 | 204 tracked / 38 untracked |
| `fourier-analysis` | `closed-universe` | `cd26c6533a` | dependencies: ^4.0.0 | 53 | 97 | 57/104 | 27 tracked / 1 untracked |
| `glass-ui` | `closed-universe` | `d844bef6f2` | — | 1 | 2 | 36/91 | 37 tracked / 67 untracked |
| `keyframes` | `closed-universe` | `81a5699073` | devDependencies: 7.0.0 | 41 | 78 | 42/82 | 0 tracked / 0 untracked |
| `latex-paper` | `closed-universe` | `c140473998` | — | 0 | 0 | 0/0 | 0 tracked / 18 untracked |
| `muster` | `closed-universe` | `87ee926d38` | dependencies: ^3.1.0 | 31 | 94 | 35/104 | 87 tracked / 3 untracked |
| `parse-that` | `closed-universe` | `ef10d5b782` | — | 0 | 0 | 0/0 | 14 tracked / 17 untracked |
| `sci-report` | `closed-universe` | `da1e3763f5` | dependencies: 6.0.0 | 19 | 31 | 20/32 | 339 tracked / 55 untracked |
| `slides` | `closed-universe` | `b538506a5b` | dependencies: 3.13.0 | 10 | 18 | 17/27 | 0 tracked / 0 untracked |
| `slides-k` | `closed-universe` | `5b546be482` | dependencies: ^3.2.0 | 5 | 11 | 11/18 | 0 tracked / 0 untracked |
| `speedtest` | `closed-universe` | `7212e7332b` | dependencies: ^4.0.1 | 64 | 163 | 84/262 | 0 tracked / 0 untracked |
| `value` | `closed-universe` | `fe8785e5fa` | dependencies: ^7.0.0 | 80 | 121 | 86/134 | 48 tracked / 173 untracked |
| `words` | `closed-universe` | `26b16ffd36` | dependencies: ^3.0.0 | 84 | 138 | 88/161 | 17 tracked / 6 untracked |
| `sci-active` | `operational-mirror` | `0ff0395b3e` | dependencies: 7.0.0 | 19 | 30 | 20/31 | 2 tracked / 11 untracked |
| `atlas-working-mirror` | `operational-mirror` | `1e2b911bef` | devDependencies: 6.0.0<br>peerDependencies: ^6.0.0 | 45 | 70 | 53/82 | 0 tracked / 0 untracked |
| `keyframes-working-mirror` | `operational-mirror` | `8281638c0a` | — | 41 | 78 | 42/82 | 226 tracked / 26 untracked |
| `oscilloscope-negative-control` | `negative-control` | `a44bc004a7` | — | 0 | 0 | 0/0 | 9 tracked / 0 untracked |

Atlas's production census supplied by the active Atlas pass is 44 files / 73
edges / 29 subpaths. This ledger intentionally includes tests and therefore
adds `tests/unit/oklch-stop-bridge.spec.ts` as one file and one import edge:
45/74. The measures agree exactly after that scope distinction.

Active SCI agrees directly at 19 files / 30 edges / 12 subpaths. Pinned legacy
SCI's production census is 17/26/11; the ledger's 19/31 adds only the
two-file, five-edge `scratch/bidsheet` prototype. The measures again agree
after separating product and scratch.

## Typed subpaths bound by the closed universe

| Path ID | Owning root | Canonical path |
| --- | --- | --- |
| `bbnf-lang/playground` | `bbnf-lang` | `/Users/mkbabb/Programming/bbnf-lang/playground` |
| `fourier-analysis/api` | `fourier-analysis` | `/Users/mkbabb/Programming/fourier-analysis/api` |
| `fourier-analysis/web` | `fourier-analysis` | `/Users/mkbabb/Programming/fourier-analysis/web` |
| `muster/frontend` | `muster` | `/Users/mkbabb/Programming/muster/frontend` |
| `sci-report/atlas` | `sci-report` | `/Users/mkbabb/Programming/sci-report/atlas` |
| `words/frontend` | `words` | `/Users/mkbabb/Programming/words/frontend` |

## Direct module specifiers

| Root | Specifier counts |
| --- | --- |
| `atlas-active` | `@mkbabb/glass-ui` (1)<br>`@mkbabb/glass-ui/aurora` (5)<br>`@mkbabb/glass-ui/button` (8)<br>`@mkbabb/glass-ui/card` (4)<br>`@mkbabb/glass-ui/collapsible` (2)<br>`@mkbabb/glass-ui/completion-seal` (2)<br>`@mkbabb/glass-ui/constellation` (2)<br>`@mkbabb/glass-ui/dark` (2)<br>`@mkbabb/glass-ui/dark-mode-toggle` (2)<br>`@mkbabb/glass-ui/data-table` (1)<br>`@mkbabb/glass-ui/deck` (2)<br>`@mkbabb/glass-ui/dock` (7)<br>`@mkbabb/glass-ui/drawer` (3)<br>`@mkbabb/glass-ui/dropdown-menu` (2)<br>`@mkbabb/glass-ui/expandable-container` (1)<br>`@mkbabb/glass-ui/fading-scroll` (1)<br>`@mkbabb/glass-ui/handmark` (3)<br>`@mkbabb/glass-ui/labeled-field` (2)<br>`@mkbabb/glass-ui/paper-backdrop` (1)<br>`@mkbabb/glass-ui/popover` (2)<br>`@mkbabb/glass-ui/scroll-progress-rim` (1)<br>`@mkbabb/glass-ui/select` (3)<br>`@mkbabb/glass-ui/slider` (1)<br>`@mkbabb/glass-ui/status-dot` (2)<br>`@mkbabb/glass-ui/styles` (1)<br>`@mkbabb/glass-ui/surface` (4)<br>`@mkbabb/glass-ui/switch` (3)<br>`@mkbabb/glass-ui/toggle-group` (5)<br>`@mkbabb/glass-ui/typewriter` (1) |
| `bbnf-buddy` | `@mkbabb/glass-ui` (29)<br>`@mkbabb/glass-ui/controls` (1)<br>`@mkbabb/glass-ui/dark` (3)<br>`@mkbabb/glass-ui/dock` (12)<br>`@mkbabb/glass-ui/sortable-list` (3)<br>`@mkbabb/glass-ui/styles` (1)<br>`@mkbabb/glass-ui/tabs` (1)<br>`@mkbabb/glass-ui/toggle-chip` (2) |
| `bbnf-lang` | `@mkbabb/glass-ui/card` (1)<br>`@mkbabb/glass-ui/controls` (1)<br>`@mkbabb/glass-ui/dark` (1)<br>`@mkbabb/glass-ui/dialog` (2)<br>`@mkbabb/glass-ui/dock` (3)<br>`@mkbabb/glass-ui/select` (3)<br>`@mkbabb/glass-ui/slider` (1)<br>`@mkbabb/glass-ui/styles` (1)<br>`@mkbabb/glass-ui/tooltip` (10) |
| `fourier-analysis` | `@mkbabb/glass-ui` (7)<br>`@mkbabb/glass-ui/animated-digit` (1)<br>`@mkbabb/glass-ui/badge` (2)<br>`@mkbabb/glass-ui/button` (35)<br>`@mkbabb/glass-ui/collapsible` (2)<br>`@mkbabb/glass-ui/configurator` (4)<br>`@mkbabb/glass-ui/dark` (1)<br>`@mkbabb/glass-ui/dialog` (5)<br>`@mkbabb/glass-ui/dock` (3)<br>`@mkbabb/glass-ui/dropdown-menu` (2)<br>`@mkbabb/glass-ui/hover-card` (2)<br>`@mkbabb/glass-ui/hover-popover` (2)<br>`@mkbabb/glass-ui/infinite-scroll` (1)<br>`@mkbabb/glass-ui/metric-badge` (7)<br>`@mkbabb/glass-ui/select` (5)<br>`@mkbabb/glass-ui/sidebar` (2)<br>`@mkbabb/glass-ui/slider` (7)<br>`@mkbabb/glass-ui/styles` (1)<br>`@mkbabb/glass-ui/switch` (1)<br>`@mkbabb/glass-ui/tabs` (3)<br>`@mkbabb/glass-ui/toast` (2)<br>`@mkbabb/glass-ui/tooltip` (2) |
| `glass-ui` | `@mkbabb/glass-ui/fourier-math` (2) |
| `keyframes` | `@mkbabb/glass-ui` (31)<br>`@mkbabb/glass-ui/aurora` (1)<br>`@mkbabb/glass-ui/chip` (2)<br>`@mkbabb/glass-ui/dark` (3)<br>`@mkbabb/glass-ui/dark-mode-toggle` (3)<br>`@mkbabb/glass-ui/dock` (5)<br>`@mkbabb/glass-ui/drawer` (1)<br>`@mkbabb/glass-ui/easing` (2)<br>`@mkbabb/glass-ui/fading-scroll` (1)<br>`@mkbabb/glass-ui/forms` (5)<br>`@mkbabb/glass-ui/header-ribbon` (1)<br>`@mkbabb/glass-ui/keyboard` (3)<br>`@mkbabb/glass-ui/labeled-field` (4)<br>`@mkbabb/glass-ui/metric` (1)<br>`@mkbabb/glass-ui/motion-core` (1)<br>`@mkbabb/glass-ui/status-dot` (2)<br>`@mkbabb/glass-ui/styles` (1)<br>`@mkbabb/glass-ui/styles/fonts` (1)<br>`@mkbabb/glass-ui/tabs` (3)<br>`@mkbabb/glass-ui/toggle-group` (1)<br>`@mkbabb/glass-ui/tooltip` (6) |
| `muster` | `@mkbabb/glass-ui` (1)<br>`@mkbabb/glass-ui/api` (1)<br>`@mkbabb/glass-ui/aurora` (1)<br>`@mkbabb/glass-ui/badge` (6)<br>`@mkbabb/glass-ui/button` (14)<br>`@mkbabb/glass-ui/collapsible` (1)<br>`@mkbabb/glass-ui/command` (1)<br>`@mkbabb/glass-ui/configurator` (7)<br>`@mkbabb/glass-ui/confirm-dialog` (1)<br>`@mkbabb/glass-ui/controls` (1)<br>`@mkbabb/glass-ui/dialog` (2)<br>`@mkbabb/glass-ui/dock` (1)<br>`@mkbabb/glass-ui/forms` (6)<br>`@mkbabb/glass-ui/instrument-chassis` (6)<br>`@mkbabb/glass-ui/keyboard` (1)<br>`@mkbabb/glass-ui/label` (4)<br>`@mkbabb/glass-ui/metric-badge` (2)<br>`@mkbabb/glass-ui/metric-cell` (1)<br>`@mkbabb/glass-ui/metric-stack` (2)<br>`@mkbabb/glass-ui/motion` (5)<br>`@mkbabb/glass-ui/motion-core` (2)<br>`@mkbabb/glass-ui/number-field` (5)<br>`@mkbabb/glass-ui/popover` (2)<br>`@mkbabb/glass-ui/progress` (4)<br>`@mkbabb/glass-ui/pulse` (1)<br>`@mkbabb/glass-ui/sheet` (2)<br>`@mkbabb/glass-ui/slider` (2)<br>`@mkbabb/glass-ui/sortable-list` (1)<br>`@mkbabb/glass-ui/status-dot` (6)<br>`@mkbabb/glass-ui/styles` (1)<br>`@mkbabb/glass-ui/switch` (1)<br>`@mkbabb/glass-ui/tabs` (1)<br>`@mkbabb/glass-ui/toggle-chip` (2) |
| `sci-report` | `@mkbabb/glass-ui` (1)<br>`@mkbabb/glass-ui/badge` (3)<br>`@mkbabb/glass-ui/button` (4)<br>`@mkbabb/glass-ui/card` (1)<br>`@mkbabb/glass-ui/completion-seal` (2)<br>`@mkbabb/glass-ui/controls` (1)<br>`@mkbabb/glass-ui/drawer` (1)<br>`@mkbabb/glass-ui/metric-badge` (2)<br>`@mkbabb/glass-ui/metric-cell` (1)<br>`@mkbabb/glass-ui/slider` (3)<br>`@mkbabb/glass-ui/styles` (1)<br>`@mkbabb/glass-ui/styles/fonts` (1)<br>`@mkbabb/glass-ui/surface` (3)<br>`@mkbabb/glass-ui/toggle-group` (7) |
| `slides` | `@mkbabb/glass-ui/button` (2)<br>`@mkbabb/glass-ui/color` (2)<br>`@mkbabb/glass-ui/constellation` (1)<br>`@mkbabb/glass-ui/controls` (2)<br>`@mkbabb/glass-ui/dialog` (1)<br>`@mkbabb/glass-ui/dock` (2)<br>`@mkbabb/glass-ui/dropdown-menu` (1)<br>`@mkbabb/glass-ui/forms` (1)<br>`@mkbabb/glass-ui/fourier-field` (2)<br>`@mkbabb/glass-ui/hover-card` (1)<br>`@mkbabb/glass-ui/status-dot` (1)<br>`@mkbabb/glass-ui/styles` (1)<br>`@mkbabb/glass-ui/toggle-group` (1) |
| `slides-k` | `@mkbabb/glass-ui/button` (2)<br>`@mkbabb/glass-ui/controls` (2)<br>`@mkbabb/glass-ui/dialog` (1)<br>`@mkbabb/glass-ui/dock` (2)<br>`@mkbabb/glass-ui/forms` (1)<br>`@mkbabb/glass-ui/popover` (1)<br>`@mkbabb/glass-ui/separator` (1)<br>`@mkbabb/glass-ui/styles` (1) |
| `speedtest` | `@mkbabb/glass-ui` (12)<br>`@mkbabb/glass-ui/animated-digit` (1)<br>`@mkbabb/glass-ui/api` (1)<br>`@mkbabb/glass-ui/aurora` (3)<br>`@mkbabb/glass-ui/badge` (1)<br>`@mkbabb/glass-ui/button` (17)<br>`@mkbabb/glass-ui/card` (12)<br>`@mkbabb/glass-ui/collapsible` (1)<br>`@mkbabb/glass-ui/command` (1)<br>`@mkbabb/glass-ui/context-menu` (2)<br>`@mkbabb/glass-ui/controls` (1)<br>`@mkbabb/glass-ui/dark` (4)<br>`@mkbabb/glass-ui/data-table` (3)<br>`@mkbabb/glass-ui/dialog` (4)<br>`@mkbabb/glass-ui/dock` (3)<br>`@mkbabb/glass-ui/dom` (11)<br>`@mkbabb/glass-ui/drawer` (1)<br>`@mkbabb/glass-ui/dropdown-menu` (2)<br>`@mkbabb/glass-ui/expandable-container` (2)<br>`@mkbabb/glass-ui/fading-scroll` (1)<br>`@mkbabb/glass-ui/forms` (10)<br>`@mkbabb/glass-ui/hover-card` (1)<br>`@mkbabb/glass-ui/icon-tooltip` (2)<br>`@mkbabb/glass-ui/infinite-scroll` (2)<br>`@mkbabb/glass-ui/instrument-chassis` (4)<br>`@mkbabb/glass-ui/keyboard` (1)<br>`@mkbabb/glass-ui/label` (5)<br>`@mkbabb/glass-ui/labeled-field` (1)<br>`@mkbabb/glass-ui/metric-badge` (1)<br>`@mkbabb/glass-ui/metric-cell` (2)<br>`@mkbabb/glass-ui/metric-stack` (1)<br>`@mkbabb/glass-ui/motion` (5)<br>`@mkbabb/glass-ui/motion-core` (9)<br>`@mkbabb/glass-ui/paper-backdrop` (1)<br>`@mkbabb/glass-ui/popover` (2)<br>`@mkbabb/glass-ui/progress` (1)<br>`@mkbabb/glass-ui/pulse` (3)<br>`@mkbabb/glass-ui/reactive` (3)<br>`@mkbabb/glass-ui/scrolling-text` (2)<br>`@mkbabb/glass-ui/select` (3)<br>`@mkbabb/glass-ui/separator` (5)<br>`@mkbabb/glass-ui/sheet` (1)<br>`@mkbabb/glass-ui/slider` (1)<br>`@mkbabb/glass-ui/styles` (1)<br>`@mkbabb/glass-ui/tabs` (6)<br>`@mkbabb/glass-ui/timeline` (1)<br>`@mkbabb/glass-ui/toast` (2)<br>`@mkbabb/glass-ui/toggle-chip` (1)<br>`@mkbabb/glass-ui/toggle-group` (1)<br>`@mkbabb/glass-ui/tokens` (1)<br>`@mkbabb/glass-ui/tooltip` (1) |
| `value` | `@mkbabb/glass-ui` (37)<br>`@mkbabb/glass-ui/aurora` (9)<br>`@mkbabb/glass-ui/blob` (5)<br>`@mkbabb/glass-ui/chip` (1)<br>`@mkbabb/glass-ui/color` (4)<br>`@mkbabb/glass-ui/configurator` (1)<br>`@mkbabb/glass-ui/dark` (9)<br>`@mkbabb/glass-ui/dialog` (2)<br>`@mkbabb/glass-ui/dock` (15)<br>`@mkbabb/glass-ui/dom` (8)<br>`@mkbabb/glass-ui/easing` (5)<br>`@mkbabb/glass-ui/fading-scroll` (1)<br>`@mkbabb/glass-ui/forms` (1)<br>`@mkbabb/glass-ui/motion` (1)<br>`@mkbabb/glass-ui/motion-core` (2)<br>`@mkbabb/glass-ui/search` (4)<br>`@mkbabb/glass-ui/styles` (1)<br>`@mkbabb/glass-ui/styles.css` (1)<br>`@mkbabb/glass-ui/tabs` (3)<br>`@mkbabb/glass-ui/watercolor-dot` (11) |
| `words` | `@mkbabb/glass-ui` (21)<br>`@mkbabb/glass-ui/badge` (7)<br>`@mkbabb/glass-ui/button` (29)<br>`@mkbabb/glass-ui/card` (8)<br>`@mkbabb/glass-ui/carousel` (2)<br>`@mkbabb/glass-ui/confirm-dialog` (5)<br>`@mkbabb/glass-ui/controls` (1)<br>`@mkbabb/glass-ui/dark` (2)<br>`@mkbabb/glass-ui/dialog` (4)<br>`@mkbabb/glass-ui/dock` (2)<br>`@mkbabb/glass-ui/dropdown-menu` (4)<br>`@mkbabb/glass-ui/forms` (5)<br>`@mkbabb/glass-ui/hover-card` (13)<br>`@mkbabb/glass-ui/label` (1)<br>`@mkbabb/glass-ui/popover` (5)<br>`@mkbabb/glass-ui/select` (1)<br>`@mkbabb/glass-ui/sidebar` (4)<br>`@mkbabb/glass-ui/styles` (1)<br>`@mkbabb/glass-ui/tabs` (2)<br>`@mkbabb/glass-ui/toast` (11)<br>`@mkbabb/glass-ui/tooltip` (9)<br>`@mkbabb/glass-ui/typewriter` (1) |
| `sci-active` | `@mkbabb/glass-ui/badge` (2)<br>`@mkbabb/glass-ui/button` (7)<br>`@mkbabb/glass-ui/card` (1)<br>`@mkbabb/glass-ui/completion-seal` (2)<br>`@mkbabb/glass-ui/dark-mode-toggle` (1)<br>`@mkbabb/glass-ui/drawer` (1)<br>`@mkbabb/glass-ui/metric` (1)<br>`@mkbabb/glass-ui/motion-core` (1)<br>`@mkbabb/glass-ui/slider` (4)<br>`@mkbabb/glass-ui/surface` (2)<br>`@mkbabb/glass-ui/tabs` (2)<br>`@mkbabb/glass-ui/toggle-group` (6) |
| `atlas-working-mirror` | `@mkbabb/glass-ui` (1)<br>`@mkbabb/glass-ui/aurora` (4)<br>`@mkbabb/glass-ui/badge` (1)<br>`@mkbabb/glass-ui/button` (6)<br>`@mkbabb/glass-ui/card` (4)<br>`@mkbabb/glass-ui/collapsible` (2)<br>`@mkbabb/glass-ui/completion-seal` (2)<br>`@mkbabb/glass-ui/constellation` (2)<br>`@mkbabb/glass-ui/controls` (2)<br>`@mkbabb/glass-ui/dark` (2)<br>`@mkbabb/glass-ui/data-table` (1)<br>`@mkbabb/glass-ui/deck` (2)<br>`@mkbabb/glass-ui/dock` (6)<br>`@mkbabb/glass-ui/drawer` (3)<br>`@mkbabb/glass-ui/dropdown-menu` (2)<br>`@mkbabb/glass-ui/expandable-container` (1)<br>`@mkbabb/glass-ui/fading-scroll` (2)<br>`@mkbabb/glass-ui/handmark` (3)<br>`@mkbabb/glass-ui/labeled-field` (2)<br>`@mkbabb/glass-ui/paper-backdrop` (1)<br>`@mkbabb/glass-ui/popover` (2)<br>`@mkbabb/glass-ui/scroll-progress-rim` (1)<br>`@mkbabb/glass-ui/select` (3)<br>`@mkbabb/glass-ui/slider` (1)<br>`@mkbabb/glass-ui/status-dot` (2)<br>`@mkbabb/glass-ui/styles` (1)<br>`@mkbabb/glass-ui/surface` (3)<br>`@mkbabb/glass-ui/switch` (3)<br>`@mkbabb/glass-ui/toggle-group` (4)<br>`@mkbabb/glass-ui/typewriter` (1) |
| `keyframes-working-mirror` | `@mkbabb/glass-ui` (31)<br>`@mkbabb/glass-ui/aurora` (1)<br>`@mkbabb/glass-ui/chip` (2)<br>`@mkbabb/glass-ui/dark` (3)<br>`@mkbabb/glass-ui/dark-mode-toggle` (3)<br>`@mkbabb/glass-ui/dock` (5)<br>`@mkbabb/glass-ui/drawer` (1)<br>`@mkbabb/glass-ui/easing` (2)<br>`@mkbabb/glass-ui/fading-scroll` (1)<br>`@mkbabb/glass-ui/forms` (5)<br>`@mkbabb/glass-ui/header-ribbon` (1)<br>`@mkbabb/glass-ui/keyboard` (3)<br>`@mkbabb/glass-ui/labeled-field` (4)<br>`@mkbabb/glass-ui/metric` (1)<br>`@mkbabb/glass-ui/motion-core` (1)<br>`@mkbabb/glass-ui/status-dot` (2)<br>`@mkbabb/glass-ui/styles` (1)<br>`@mkbabb/glass-ui/styles/fonts` (1)<br>`@mkbabb/glass-ui/tabs` (3)<br>`@mkbabb/glass-ui/toggle-group` (1)<br>`@mkbabb/glass-ui/tooltip` (6) |

## Interpretation law

- A zero direct source count does not prove vacuity; transitive and manifest
  edges remain part of the closed universe.
- Direct module edges and textual references are separate measures. A string
  in a public-surface test remains migration evidence but is not an import.
- A non-zero consumer count does not prove that a Glass sector deserves to
  survive. Worth requires a coherent responsibility and a superior library
  home.
- Export cuts are clean breaks. Consumers migrate once to the adjudicated
  subpath; there are no aliases, dual paths, migration shims, or masking
  fallbacks.
- `CONSUMER-LEDGER.json` retains every file and occurrence behind these
  aggregates.
