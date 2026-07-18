# similarity-matrix — per-role-family redundancy heatmaps

Within-family similarity across the four component-grain metrics (api · dom · style · anim). Cells blank below threshold; `—` is self. Generated @ commit `c12beecb50d491c77e77cd8db393bdeb001ee2cb`.

## `control` (9)

### api_similarity

| | button | checkbox | chip | dark-mode-toggle | number-field | radio-group | slider | switch | toggle-group |
|---|---|---|---|---|---|---|---|---|---|
| button | — |  |  |  |  |  |  |  |  |
| checkbox |  | — |  |  |  |  |  |  |  |
| chip |  |  | — |  |  |  |  |  |  |
| dark-mode-toggle |  |  |  | — |  |  |  |  |  |
| number-field |  |  |  |  | — |  |  |  |  |
| radio-group |  |  |  |  |  | — |  |  |  |
| slider |  |  |  |  |  |  | — |  |  |
| switch |  |  |  |  |  |  |  | — |  |
| toggle-group |  |  |  |  |  |  |  |  | — |

### style_kinship

| | button | checkbox | chip | dark-mode-toggle | number-field | radio-group | slider | switch | toggle-group |
|---|---|---|---|---|---|---|---|---|---|
| button | — |  |  |  |  |  |  |  |  |
| checkbox |  | — |  |  |  |  |  |  |  |
| chip |  |  | — |  |  |  |  |  |  |
| dark-mode-toggle |  |  |  | — |  |  |  |  |  |
| number-field |  |  |  |  | — |  |  |  |  |
| radio-group |  |  |  |  |  | — |  |  |  |
| slider |  |  |  |  |  |  | — |  |  |
| switch |  |  |  |  |  |  |  | — |  |
| toggle-group |  |  |  |  |  |  |  |  | — |

### animation_kinship

| | button | checkbox | chip | dark-mode-toggle | number-field | radio-group | slider | switch | toggle-group |
|---|---|---|---|---|---|---|---|---|---|
| button | — |  |  | 1.00 |  |  |  |  |  |
| checkbox |  | — |  |  |  |  |  |  |  |
| chip |  |  | — |  |  |  |  |  |  |
| dark-mode-toggle | 1.00 |  |  | — |  |  |  |  |  |
| number-field |  |  |  |  | — |  |  |  |  |
| radio-group |  |  |  |  |  | — |  |  |  |
| slider |  |  |  |  |  |  | — |  |  |
| switch |  |  |  |  |  |  |  | — |  |
| toggle-group |  |  |  |  |  |  |  |  | — |

### dom_topology (root-sfc, from composite sub-scores)

| | button | checkbox | chip | dark-mode-toggle | number-field | radio-group | slider | switch | toggle-group |
|---|---|---|---|---|---|---|---|---|---|
| button | — |  |  |  | 0.50 | 0.50 |  |  | 0.33 |
| checkbox |  | — |  |  | 0.17 | 0.17 |  |  |  |
| chip |  |  | — |  |  |  |  |  |  |
| dark-mode-toggle |  |  |  | — |  |  |  |  |  |
| number-field | 0.50 | 0.17 |  |  | — | 0.50 |  |  | 0.33 |
| radio-group | 0.50 | 0.17 |  |  | 0.50 | — |  |  | 0.33 |
| slider |  |  |  |  |  |  | — | 0.17 |  |
| switch |  |  |  |  |  |  | 0.17 | — |  |
| toggle-group | 0.33 |  |  |  | 0.33 | 0.33 |  |  | — |

## `field` (8)

### api_similarity

| | combobox | command | input | labeled-field | search | select | tags-input | textarea |
|---|---|---|---|---|---|---|---|---|
| combobox | — |  |  |  |  |  |  |  |
| command |  | — |  |  |  |  |  |  |
| input |  |  | — |  |  |  |  |  |
| labeled-field |  |  |  | — |  |  |  |  |
| search |  |  |  |  | — |  |  |  |
| select |  |  |  |  |  | — |  |  |
| tags-input |  |  |  |  |  |  | — |  |
| textarea |  |  |  |  |  |  |  | — |

### style_kinship

| | combobox | command | input | labeled-field | search | select | tags-input | textarea |
|---|---|---|---|---|---|---|---|---|
| combobox | — |  |  |  |  | 0.50 |  |  |
| command |  | — |  |  |  |  |  |  |
| input |  |  | — |  |  |  | 0.73 | 0.90 |
| labeled-field |  |  |  | — |  |  |  |  |
| search |  |  |  |  | — |  |  |  |
| select | 0.50 |  |  |  |  | — |  |  |
| tags-input |  |  | 0.73 |  |  |  | — | 0.67 |
| textarea |  |  | 0.90 |  |  |  | 0.67 | — |

### animation_kinship

| | combobox | command | input | labeled-field | search | select | tags-input | textarea |
|---|---|---|---|---|---|---|---|---|
| combobox | — |  |  |  |  |  |  |  |
| command |  | — |  |  |  |  |  |  |
| input |  |  | — |  |  |  |  |  |
| labeled-field |  |  |  | — |  |  |  |  |
| search |  |  |  |  | — |  |  |  |
| select |  |  |  |  |  | — |  |  |
| tags-input |  |  |  |  |  |  | — |  |
| textarea |  |  |  |  |  |  |  | — |

### dom_topology (root-sfc, from composite sub-scores)

| | combobox | command | input | labeled-field | search | select | tags-input | textarea |
|---|---|---|---|---|---|---|---|---|
| combobox | — | 0.67 |  |  |  | 0.33 | 0.33 |  |
| command | 0.67 | — |  |  |  | 0.50 | 0.50 |  |
| input |  |  | — |  |  |  |  |  |
| labeled-field |  |  |  | — |  |  |  |  |
| search |  |  |  |  | — |  |  |  |
| select | 0.33 | 0.50 |  |  |  | — | 0.50 |  |
| tags-input | 0.33 | 0.50 |  |  |  | 0.50 | — |  |
| textarea |  |  |  |  |  |  |  | — |

## `container` (7)

### api_similarity

| | accordion | card | collapsible | expandable-container | separator | surface | tabs |
|---|---|---|---|---|---|---|---|
| accordion | — |  |  |  |  |  |  |
| card |  | — |  |  |  |  |  |
| collapsible |  |  | — |  |  |  |  |
| expandable-container |  |  |  | — |  |  |  |
| separator |  |  |  |  | — |  |  |
| surface |  |  |  |  |  | — |  |
| tabs |  |  |  |  |  |  | — |

### style_kinship

| | accordion | card | collapsible | expandable-container | separator | surface | tabs |
|---|---|---|---|---|---|---|---|
| accordion | — |  | 1.00 |  |  |  |  |
| card |  | — |  |  |  |  |  |
| collapsible | 1.00 |  | — |  |  |  |  |
| expandable-container |  |  |  | — |  |  |  |
| separator |  |  |  |  | — |  |  |
| surface |  |  |  |  |  | — |  |
| tabs |  |  |  |  |  |  | — |

### animation_kinship

| | accordion | card | collapsible | expandable-container | separator | surface | tabs |
|---|---|---|---|---|---|---|---|
| accordion | — |  |  |  |  |  |  |
| card |  | — |  |  |  |  |  |
| collapsible |  |  | — |  |  |  |  |
| expandable-container |  |  |  | — |  |  |  |
| separator |  |  |  |  | — |  |  |
| surface |  |  |  |  |  | — |  |
| tabs |  |  |  |  |  |  | — |

### dom_topology (root-sfc, from composite sub-scores)

| | accordion | card | collapsible | expandable-container | separator | surface | tabs |
|---|---|---|---|---|---|---|---|
| accordion | — | 0.50 | 0.50 |  |  | 0.50 |  |
| card | 0.50 | — | 0.50 |  |  | 0.50 |  |
| collapsible | 0.50 | 0.50 | — |  |  | 0.50 |  |
| expandable-container |  |  |  | — |  |  |  |
| separator |  |  |  |  | — |  |  |
| surface | 0.50 | 0.50 | 0.50 |  |  | — |  |
| tabs |  |  |  |  |  |  | — |

## `overlay` (5)

### api_similarity

| | dialog | drawer | dropdown-menu | popover | tooltip |
|---|---|---|---|---|---|
| dialog | — |  |  |  |  |
| drawer |  | — |  |  |  |
| dropdown-menu |  |  | — |  |  |
| popover |  |  |  | — |  |
| tooltip |  |  |  |  | — |

### style_kinship

| | dialog | drawer | dropdown-menu | popover | tooltip |
|---|---|---|---|---|---|
| dialog | — | 1.00 | 0.50 | 1.00 | 1.00 |
| drawer | 1.00 | — | 0.50 | 1.00 | 1.00 |
| dropdown-menu | 0.50 | 0.50 | — | 0.50 | 0.50 |
| popover | 1.00 | 1.00 | 0.50 | — | 1.00 |
| tooltip | 1.00 | 1.00 | 0.50 | 1.00 | — |

### animation_kinship

| | dialog | drawer | dropdown-menu | popover | tooltip |
|---|---|---|---|---|---|
| dialog | — |  |  |  |  |
| drawer |  | — |  |  |  |
| dropdown-menu |  |  | — |  |  |
| popover |  |  |  | — |  |
| tooltip |  |  |  |  | — |

### dom_topology (root-sfc, from composite sub-scores)

| | dialog | drawer | dropdown-menu | popover | tooltip |
|---|---|---|---|---|---|
| dialog | — | 1.00 |  |  | 0.33 |
| drawer | 1.00 | — |  |  | 0.33 |
| dropdown-menu |  |  | — | 0.50 |  |
| popover |  |  | 0.50 | — |  |
| tooltip | 0.33 | 0.33 |  |  | — |

## `feedback` (8)

### api_similarity

| | alert | badge | completion-seal | progress | pulse | skeleton | status-dot | toast |
|---|---|---|---|---|---|---|---|---|
| alert | — |  |  |  |  |  |  |  |
| badge |  | — |  |  |  |  |  |  |
| completion-seal |  |  | — |  |  |  |  |  |
| progress |  |  |  | — |  |  |  |  |
| pulse |  |  |  |  | — |  | 0.68 |  |
| skeleton |  |  |  |  |  | — |  |  |
| status-dot |  |  |  |  | 0.68 |  | — |  |
| toast |  |  |  |  |  |  |  | — |

### style_kinship

| | alert | badge | completion-seal | progress | pulse | skeleton | status-dot | toast |
|---|---|---|---|---|---|---|---|---|
| alert | — |  |  |  |  |  |  |  |
| badge |  | — |  |  |  |  |  |  |
| completion-seal |  |  | — |  |  |  |  |  |
| progress |  |  |  | — |  |  |  |  |
| pulse |  |  |  |  | — |  | 0.75 |  |
| skeleton |  |  |  |  |  | — |  |  |
| status-dot |  |  |  |  | 0.75 |  | — |  |
| toast |  |  |  |  |  |  |  | — |

### animation_kinship

| | alert | badge | completion-seal | progress | pulse | skeleton | status-dot | toast |
|---|---|---|---|---|---|---|---|---|
| alert | — |  |  |  |  |  |  |  |
| badge |  | — |  |  |  |  |  |  |
| completion-seal |  |  | — |  |  |  |  |  |
| progress |  |  |  | — |  |  |  |  |
| pulse |  |  |  |  | — |  |  |  |
| skeleton |  |  |  |  |  | — |  |  |
| status-dot |  |  |  |  |  |  | — |  |
| toast |  |  |  |  |  |  |  | — |

### dom_topology (root-sfc, from composite sub-scores)

| | alert | badge | completion-seal | progress | pulse | skeleton | status-dot | toast |
|---|---|---|---|---|---|---|---|---|
| alert | — | 1.00 |  |  |  | 0.50 |  | 0.50 |
| badge | 1.00 | — |  |  |  | 0.50 |  | 0.50 |
| completion-seal |  |  | — |  |  |  |  |  |
| progress |  |  |  | — |  |  |  |  |
| pulse |  |  |  |  | — |  | 1.00 |  |
| skeleton | 0.50 | 0.50 |  |  |  | — |  |  |
| status-dot |  |  |  |  | 1.00 |  | — |  |
| toast | 0.50 | 0.50 |  |  |  |  |  | — |

## `data-display` (9)

### api_similarity

| | avatar | data-table | instrument-chassis | metric | metric-cell | metric-row | metric-stack | table | timeline |
|---|---|---|---|---|---|---|---|---|---|
| avatar | — |  |  |  |  |  |  |  |  |
| data-table |  | — |  |  |  |  |  |  |  |
| instrument-chassis |  |  | — |  |  |  |  |  |  |
| metric |  |  |  | — | 0.65 | 0.85 |  |  |  |
| metric-cell |  |  |  | 0.65 | — | 0.73 |  |  |  |
| metric-row |  |  |  | 0.85 | 0.73 | — |  |  |  |
| metric-stack |  |  |  |  |  |  | — |  |  |
| table |  |  |  |  |  |  |  | — |  |
| timeline |  |  |  |  |  |  |  |  | — |

### style_kinship

| | avatar | data-table | instrument-chassis | metric | metric-cell | metric-row | metric-stack | table | timeline |
|---|---|---|---|---|---|---|---|---|---|
| avatar | — |  |  |  |  |  |  |  |  |
| data-table |  | — |  |  |  |  |  |  |  |
| instrument-chassis |  |  | — |  |  |  |  |  |  |
| metric |  |  |  | — | 0.57 | 0.62 |  |  |  |
| metric-cell |  |  |  | 0.57 | — | 0.62 |  |  |  |
| metric-row |  |  |  | 0.62 | 0.62 | — |  |  |  |
| metric-stack |  |  |  |  |  |  | — |  |  |
| table |  |  |  |  |  |  |  | — |  |
| timeline |  |  |  |  |  |  |  |  | — |

### animation_kinship

| | avatar | data-table | instrument-chassis | metric | metric-cell | metric-row | metric-stack | table | timeline |
|---|---|---|---|---|---|---|---|---|---|
| avatar | — |  |  |  |  |  |  |  |  |
| data-table |  | — |  |  |  |  |  |  |  |
| instrument-chassis |  |  | — |  |  |  |  |  |  |
| metric |  |  |  | — |  |  |  |  |  |
| metric-cell |  |  |  |  | — |  |  |  |  |
| metric-row |  |  |  |  |  | — |  |  |  |
| metric-stack |  |  |  |  |  |  | — |  |  |
| table |  |  |  |  |  |  |  | — |  |
| timeline |  |  |  |  |  |  |  |  | — |

### dom_topology (root-sfc, from composite sub-scores)

| | avatar | data-table | instrument-chassis | metric | metric-cell | metric-row | metric-stack | table | timeline |
|---|---|---|---|---|---|---|---|---|---|
| avatar | — |  |  |  |  |  |  |  |  |
| data-table |  | — |  |  |  |  |  |  |  |
| instrument-chassis |  |  | — | 0.27 | 0.29 | 0.33 |  |  |  |
| metric |  |  | 0.27 | — | 0.71 | 0.50 |  |  |  |
| metric-cell |  |  | 0.29 | 0.71 | — | 0.64 |  |  |  |
| metric-row |  |  | 0.33 | 0.50 | 0.64 | — |  |  |  |
| metric-stack |  |  |  |  |  |  | — | 0.67 |  |
| table |  |  |  |  |  |  | 0.67 | — |  |
| timeline |  |  |  |  |  |  |  |  | — |

## `substrate` (8)

### api_similarity

| | aurora | blob | constellation | fourier-field | handmark | liquid-grid | paper-backdrop | watercolor-dot |
|---|---|---|---|---|---|---|---|---|
| aurora | — |  |  |  |  |  |  |  |
| blob |  | — |  |  |  |  |  |  |
| constellation |  |  | — |  |  |  |  |  |
| fourier-field |  |  |  | — |  |  |  |  |
| handmark |  |  |  |  | — |  |  |  |
| liquid-grid |  |  |  |  |  | — |  |  |
| paper-backdrop |  |  |  |  |  |  | — |  |
| watercolor-dot |  |  |  |  |  |  |  | — |

### style_kinship

| | aurora | blob | constellation | fourier-field | handmark | liquid-grid | paper-backdrop | watercolor-dot |
|---|---|---|---|---|---|---|---|---|
| aurora | — |  |  |  |  |  |  |  |
| blob |  | — |  |  |  |  |  |  |
| constellation |  |  | — |  |  |  |  |  |
| fourier-field |  |  |  | — |  |  |  |  |
| handmark |  |  |  |  | — |  |  |  |
| liquid-grid |  |  |  |  |  | — |  |  |
| paper-backdrop |  |  |  |  |  |  | — |  |
| watercolor-dot |  |  |  |  |  |  |  | — |

### animation_kinship

| | aurora | blob | constellation | fourier-field | handmark | liquid-grid | paper-backdrop | watercolor-dot |
|---|---|---|---|---|---|---|---|---|
| aurora | — |  |  |  |  |  |  |  |
| blob |  | — |  |  |  |  |  |  |
| constellation |  |  | — | 0.50 |  |  |  |  |
| fourier-field |  |  | 0.50 | — |  |  |  |  |
| handmark |  |  |  |  | — |  |  |  |
| liquid-grid |  |  |  |  |  | — |  |  |
| paper-backdrop |  |  |  |  |  |  | — |  |
| watercolor-dot |  |  |  |  |  |  |  | — |

### dom_topology (root-sfc, from composite sub-scores)

| | aurora | blob | constellation | fourier-field | handmark | liquid-grid | paper-backdrop | watercolor-dot |
|---|---|---|---|---|---|---|---|---|
| aurora | — |  | 0.50 | 0.50 |  | 0.50 |  |  |
| blob |  | — | 0.67 | 0.67 |  | 0.67 |  |  |
| constellation | 0.50 | 0.67 | — | 1.00 |  | 1.00 | 0.50 |  |
| fourier-field | 0.50 | 0.67 | 1.00 | — |  | 1.00 | 0.50 |  |
| handmark |  |  |  |  | — |  |  |  |
| liquid-grid | 0.50 | 0.67 | 1.00 | 1.00 |  | — | 0.50 |  |
| paper-backdrop |  |  | 0.50 | 0.50 |  | 0.50 | — |  |
| watercolor-dot |  |  |  |  |  |  |  | — |

## `motion-primitive` (7)

### api_similarity

| | animated-digit | easing-configurator | easing-picker | fading-scroll | infinite-scroll | sortable-list | typewriter |
|---|---|---|---|---|---|---|---|
| animated-digit | — |  |  |  |  |  |  |
| easing-configurator |  | — |  |  |  |  |  |
| easing-picker |  |  | — |  |  |  |  |
| fading-scroll |  |  |  | — |  |  |  |
| infinite-scroll |  |  |  |  | — |  |  |
| sortable-list |  |  |  |  |  | — |  |
| typewriter |  |  |  |  |  |  | — |

### style_kinship

| | animated-digit | easing-configurator | easing-picker | fading-scroll | infinite-scroll | sortable-list | typewriter |
|---|---|---|---|---|---|---|---|
| animated-digit | — |  |  |  |  |  |  |
| easing-configurator |  | — |  |  |  |  |  |
| easing-picker |  |  | — |  |  |  |  |
| fading-scroll |  |  |  | — |  |  |  |
| infinite-scroll |  |  |  |  | — |  |  |
| sortable-list |  |  |  |  |  | — |  |
| typewriter |  |  |  |  |  |  | — |

### animation_kinship

| | animated-digit | easing-configurator | easing-picker | fading-scroll | infinite-scroll | sortable-list | typewriter |
|---|---|---|---|---|---|---|---|
| animated-digit | — |  |  |  |  |  |  |
| easing-configurator |  | — |  |  |  |  |  |
| easing-picker |  |  | — |  |  |  |  |
| fading-scroll |  |  |  | — |  |  |  |
| infinite-scroll |  |  |  |  | — |  |  |
| sortable-list |  |  |  |  |  | — |  |
| typewriter |  |  |  |  |  |  | — |

### dom_topology (root-sfc, from composite sub-scores)

| | animated-digit | easing-configurator | easing-picker | fading-scroll | infinite-scroll | sortable-list | typewriter |
|---|---|---|---|---|---|---|---|
| animated-digit | — |  |  |  |  |  |  |
| easing-configurator |  | — |  |  |  |  |  |
| easing-picker |  |  | — |  |  |  |  |
| fading-scroll |  |  |  | — |  |  |  |
| infinite-scroll |  |  |  |  | — |  |  |
| sortable-list |  |  |  |  |  | — |  |
| typewriter |  |  |  |  |  |  | — |

## `chrome` (5)

### api_similarity

| | carousel | deck | header-ribbon | pager-dots | scroll-progress-rim |
|---|---|---|---|---|---|
| carousel | — |  |  |  |  |
| deck |  | — |  |  |  |
| header-ribbon |  |  | — |  |  |
| pager-dots |  |  |  | — |  |
| scroll-progress-rim |  |  |  |  | — |

### style_kinship

| | carousel | deck | header-ribbon | pager-dots | scroll-progress-rim |
|---|---|---|---|---|---|
| carousel | — |  |  |  |  |
| deck |  | — |  |  |  |
| header-ribbon |  |  | — |  |  |
| pager-dots |  |  |  | — |  |
| scroll-progress-rim |  |  |  |  | — |

### animation_kinship

| | carousel | deck | header-ribbon | pager-dots | scroll-progress-rim |
|---|---|---|---|---|---|
| carousel | — |  |  |  |  |
| deck |  | — |  |  |  |
| header-ribbon |  |  | — |  |  |
| pager-dots |  |  |  | — |  |
| scroll-progress-rim |  |  |  |  | — |

### dom_topology (root-sfc, from composite sub-scores)

| | carousel | deck | header-ribbon | pager-dots | scroll-progress-rim |
|---|---|---|---|---|---|
| carousel | — |  | 0.50 |  | 0.50 |
| deck |  | — |  |  |  |
| header-ribbon | 0.50 |  | — |  |  |
| pager-dots |  |  |  | — |  |
| scroll-progress-rim | 0.50 |  |  |  | — |

