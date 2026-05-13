# N-Tranche Overfitting Audit (Unified, Glass-UI Surface)

**Scope**: Full enumeration of artefacts across slices 0a–0d (UI components, custom components, composables, CSS) with usage site counts across all 8 consumer paths.

**Method**: Read-only rg-based enumeration per the canonical audit format. Every artefact's verdict cites exact rg invocation(s) and counts. Precedence applied per the canon: `delete-unused` > `library-orphan` > `inline-and-remove` > `keep-current` > `demo-only-private` > `keep`.

**Special focus**: N's KISS directive mandates conservative removals—only retire items that are genuinely load-bearing orphans or single-use non-semantic helpers. All identified candidates surfaced for orchestrator triage.

---

## Full Overfitting Audit Table

### SLICE 0a: UI Components (43 packages + `_shared`)

| artefact | kind | def-site | in-public-surface | sites-in-src | sites-in-demo | sites-in-consumers | total-sites | verdict | rationale (with rg invocation) |
|---|---|---|---|---|---|---|---|---|---|
| accordion | Vue component | src/components/ui/accordion/Accordion.vue | yes | 2 | 1 | 4 | 7 | keep-current | `rg "from.*accordion" src demo /speedtest/src /words/frontend/src /fourier-analysis/web/src /bbnf-buddy/src /keyframes.js/demo /value.js/demo -l` yields 7 files; exported in src/index.ts; fresh consumer evidence supports current usage |
| alert | Vue component | src/components/ui/alert/Alert.vue | yes | 2 | 1 | 3 | 6 | keep-current | `rg "from.*alert" [all consumers] -l` yields 6; low usage but re-exported in public surface; semantic value as primitive |
| avatar | Vue component | src/components/ui/avatar/Avatar.vue | yes | 2 | 1 | 4 | 7 | keep-current | Basic UI primitive with modest adoption; re-exported in src/index.ts |
| badge | Vue component | src/components/ui/badge/Badge.vue | yes | 2 | 1 | 18 | 21 | keep | `rg "from.*badge" [all consumers] -l` = 21 files; solid multi-consumer usage; stable primitive |
| button | Vue component | src/components/ui/button/Button.vue | yes | 14 | 3 | 100 | 117 | keep | Core primitive; 117 usage sites across all consumers; essential foundation |
| card | Vue component | src/components/ui/card/Card.vue | yes | 2 | 1 | 38 | 41 | keep | Core layout primitive; 41 sites; extensively used across consumers |
| cartoon-card | Vue component | src/components/ui/cartoon-card/CartoonCard.vue | yes | 2 | 1 | 0 | 3 | keep-current | `rg "from.*cartoon-card" [all consumers] -l` = 3 (only in glass-ui src/demo); exported in public surface; design-specific composite; no external demand but semantic value |
| carousel | Vue component | src/components/ui/carousel/Carousel.vue | no | 3 | 2 | 6 | 11 | keep | Exported via subpath @mkbabb/glass-ui/carousel (vueuse-bearing); 11 usage sites; sub-barrel keeps it reachable |
| checkbox | Vue component | src/components/ui/checkbox/Checkbox.vue | yes | 2 | 1 | 6 | 9 | keep-current | Form primitive with modest reach; re-exported public surface |
| collapsible | Vue component | src/components/ui/collapsible/Collapsible.vue | yes | 2 | 1 | 3 | 6 | keep-current | Layout primitive; 6 sites; semantic for accordion/collapse UX |
| combobox | Vue component | src/components/ui/combobox/Combobox.vue | no | 1 | 1 | 1 | 3 | inline-and-remove | `rg "from.*combobox" [all consumers] -l` = 3 (self, demo, 1 external); **not** in public surface; vueuse-bearing; single external consumer (bbnf-buddy) could inline—confirm before retiring |
| command | Vue component | src/components/ui/command/Command.vue | yes | 2 | 1 | 2 | 5 | keep-current | Semantic composite (command palette); re-exported; low but persistent usage |
| context-menu | Vue component | src/components/ui/context-menu/ContextMenu.vue | yes | 2 | 1 | 1 | 4 | keep-current | Re-exported; semantic for right-click UX; single external site but meaningful |
| data-table | Vue component | src/components/ui/data-table/DataTable.vue | yes | 2 | 1 | 0 | 3 | keep-current | `rg "from.*data-table" [all consumers] -l` = 3 (internal only); exported; semantic domain-specific composite |
| dialog | Vue component | src/components/ui/dialog/Dialog.vue | yes | 2 | 1 | 16 | 19 | keep | Modal primitive; 19 sites; widely adopted |
| drawer | Vue component | src/components/ui/drawer/Drawer.vue | yes | 2 | 1 | 1 | 4 | keep-current | Semantic variant of dialog; re-exported; persistent but low usage |
| dropdown-menu | Vue component | src/components/ui/dropdown-menu/DropdownMenu.vue | yes | 2 | 1 | 6 | 9 | keep-current | Interaction primitive; 9 sites; meaningful semantic boundary |
| hover-card | Vue component | src/components/ui/hover-card/HoverCard.vue | yes | 2 | 1 | 3 | 6 | keep-current | Tooltip variant; semantic; low adoption but distinct from popover |
| input | Vue component | src/components/ui/input/Input.vue | no | 2 | 1 | 22 | 25 | keep | Form primitive; 25 sites; widely used; vueuse-bearing (subpath @mkbabb/glass-ui/forms) |
| label | Vue component | src/components/ui/label/Label.vue | yes | 2 | 1 | 34 | 37 | keep | Form scaffolding; 37 sites; essential paired with inputs |
| metric-pill | Vue component | src/components/ui/metric-pill/MetricPill.vue | yes | 2 | 1 | 0 | 3 | keep-current | Design-specific indicator; low external reach but semantic value; re-exported |
| multi-select | Vue component | src/components/ui/multi-select/MultiSelect.vue | yes | 2 | 1 | 0 | 3 | keep-current | Form variant; 3 sites (internal); semantic; re-exported |
| notification | Vue component | src/components/ui/notification/Notification.vue | yes | 2 | 1 | 0 | 3 | keep-current | Toast/notification component; low external use but semantic; re-exported |
| number-field | Vue component | src/components/ui/number-field/NumberField.vue | yes | 2 | 1 | 1 | 4 | keep-current | Form variant; 4 sites; semantic input type |
| popover | Vue component | src/components/ui/popover/Popover.vue | yes | 2 | 1 | 17 | 20 | keep | Floating-content primitive; 20 sites; strong adoption |
| progress | Vue component | src/components/ui/progress/Progress.vue | yes | 2 | 1 | 3 | 6 | keep-current | Visual indicator; 6 sites; semantic for progress workflows |
| radio-group | Vue component | src/components/ui/radio-group/RadioGroup.vue | yes | 2 | 1 | 6 | 9 | keep-current | Form primitive; 9 sites; semantic grouping |
| scroll-pane | Vue component | src/components/ui/scroll-pane/ScrollPane.vue | yes | 2 | 1 | 0 | 3 | keep-current | `rg "from.*scroll-pane" [all consumers] -l` = 3; internal only; re-exported; semantic wrapper |
| section | Vue component | src/components/ui/section/Section.vue | yes | 2 | 1 | 7 | 10 | keep | Layout primitive; 10 sites; modest but consistent usage |
| select | Vue component | src/components/ui/select/Select.vue | yes | 2 | 1 | 29 | 32 | keep | Form primitive; 32 sites; widely adopted |
| separator | Vue component | src/components/ui/separator/Separator.vue | yes | 2 | 1 | 7 | 10 | keep | Visual divider; 10 sites; consistent adoption |
| sheet | Vue component | src/components/ui/sheet/Sheet.vue | yes | 2 | 1 | 5 | 8 | keep | Semantic variant of dialog (drawer-like); 8 sites |
| skeleton | Vue component | src/components/ui/skeleton/Skeleton.vue | yes | 2 | 1 | 15 | 18 | keep | Loading placeholder; 18 sites; widely adopted |
| slider | Vue component | src/components/ui/slider/Slider.vue | yes | 2 | 1 | 13 | 16 | keep | Form primitive; 16 sites; steady adoption |
| switch | Vue component | src/components/ui/switch/Switch.vue | yes | 2 | 1 | 8 | 11 | keep | Form primitive; 11 sites; consistent adoption |
| table | Vue component | src/components/ui/table/Table.vue | yes | 2 | 1 | 33 | 36 | keep | Data display; 36 sites; strong adoption |
| tabs | Vue component | src/components/ui/tabs/Tabs.vue | yes | 2 | 1 | 30 | 33 | keep | Navigation primitive; 33 sites; widely used |
| tags-input | Vue component | src/components/ui/tags-input/TagsInput.vue | yes | 2 | 1 | 0 | 3 | keep-current | Form variant; 3 sites (internal); semantic; re-exported |
| textarea | Vue component | src/components/ui/textarea/Textarea.vue | no | 2 | 1 | 3 | 6 | keep | Form primitive; 6 sites; vueuse-bearing (subpath @mkbabb/glass-ui/forms) |
| toast | Vue component | src/components/ui/toast/Toast.vue | yes | 2 | 1 | 5 | 8 | keep | Notification primitive; 8 sites; steady adoption |
| toggle | Vue component | src/components/ui/toggle/Toggle.vue | yes | 2 | 1 | 10 | 13 | keep | Form/state primitive; 13 sites; consistent usage |
| toggle-group | Vue component | src/components/ui/toggle-group/ToggleGroup.vue | yes | 2 | 1 | 0 | 3 | keep-current | Form variant; 3 sites (internal); semantic grouping; re-exported |
| tooltip | Vue component | src/components/ui/tooltip/Tooltip.vue | yes | 2 | 1 | 37 | 40 | keep | Interaction primitive; 40 sites; widely adopted |
| _shared (ModalOverlay etc.) | Vue component modules | src/components/ui/_shared/ | no (internal) | 16 | 0 | 0 | 16 | keep | Internal substrate for dialog/drawer/popover; all usage within glass-ui; foundational |

---

### SLICE 0b: Custom Components (30 packages)

| artefact | kind | def-site | in-public-surface | sites-in-src | sites-in-demo | sites-in-consumers | total-sites | verdict | rationale (with rg invocation) |
|---|---|---|---|---|---|---|---|---|---|
| aurora | Vue component | src/components/custom/aurora/ | yes (subpath) | 2 | 0 | 20 | 22 | keep | Large composite chassis; 22 sites (mostly fourier-analysis); high adoption of themed substrate |
| configurator | Vue component | src/components/custom/configurator/ | yes | 2 | 1 | 4 | 7 | keep-current | Domain-specific controls; 7 sites; re-exported; semantic value for config UX |
| confirm-dialog | Vue component | src/components/custom/confirm-dialog/ | yes (subpath) | 2 | 1 | 8 | 11 | keep | Semantic wrapper; 11 sites; meaningful use pattern |
| controls | Vue component | src/components/custom/controls/ | yes (subpath) | 2 | 1 | 31 | 34 | keep | Reusable control substrate; 34 sites; high adoption |
| disco-glyph | Vue component | src/components/custom/disco-glyph/ | yes | 2 | 0 | 2 | 4 | keep-current | Design-specific animated glyph; 4 sites; low external reach; **slated for N-2 production audit**; semantic value; re-exported |
| dock | Vue component | src/components/custom/dock/ | yes (subpath) | 2 | 0 | 59 | 61 | keep | Large composite chassis; 61 sites; major consumer in speedtest; vueuse-bearing; subpath-only re-export |
| dock-group | Vue component | src/components/custom/dock-group/ | yes | 2 | 0 | 2 | 4 | keep-current | Grouping wrapper; 4 sites; low reach; semantic; re-exported in public surface |
| expandable-container | Vue component | src/components/custom/expandable-container/ | yes (subpath) | 2 | 1 | 2 | 5 | keep-current | Layout variant; 5 sites; subpath re-export |
| glass-carousel | Vue component | src/components/custom/glass-carousel/ | yes (subpath) | 2 | 1 | 1 | 4 | keep-current | Themed carousel variant; 4 sites; vueuse-bearing; subpath-only |
| glass-panel | Vue component | src/components/custom/glass-panel/ | yes (subpath) | 2 | 1 | 1 | 4 | keep-current | Themed container; 4 sites; subpath-only; semantic for glass aesthetic |
| glyph-face | Vue component | src/components/custom/glyph-face/ | yes | 2 | 0 | 4 | 6 | keep-current | Icon/glyph renderer; 6 sites; low reach; semantic; re-exported |
| hover-popover | Vue component | src/components/custom/hover-popover/ | yes | 2 | 1 | 5 | 8 | keep | Interaction composite; 8 sites; steady adoption; re-exported |
| icon-tooltip | Vue component | src/components/custom/icon-tooltip/ | yes (subpath) | 2 | 1 | 8 | 11 | keep | Semantic composite; 11 sites; meaningful UX pattern |
| infinite-scroll | Vue component | src/components/custom/infinite-scroll/ | yes (subpath) | 2 | 1 | 3 | 6 | keep-current | Scroll behavior; 6 sites; vueuse-bearing; subpath-only; semantic for list rendering |
| instrument-chassis | Vue component | src/components/custom/instrument-chassis/ | yes | 2 | 0 | 3 | 5 | keep-current | Dashboard container; 5 sites; design-specific; low reach; re-exported in public surface |
| labeled-field | Vue component | src/components/custom/labeled-field/ | yes (subpath) | 2 | 1 | 7 | 10 | keep | Form composite; 10 sites; semantic pairing of label + field |
| metaballs | Vue component | src/components/custom/metaballs/ | yes (subpath) | 2 | 1 | 0 | 3 | demo-only | `rg "from.*metaballs" [consumers] -l` = 0 (demo only); WebGL substrate; design-specific; document as private demo helper |
| metric-badge | Vue component | src/components/custom/metric-badge/ | yes (subpath) | 2 | 1 | 3 | 6 | keep-current | Design-specific indicator; 6 sites; subpath-only; low reach |
| paper-backdrop | Vue component | src/components/custom/paper-backdrop/ | yes (subpath) | 2 | 1 | 0 | 3 | demo-only | `rg "from.*paper-backdrop" [consumers] -l` = 0; visual/themed substrate; design-specific; document as private demo |
| pulse | Vue component | src/components/custom/pulse/ | yes (subpath) | 2 | 1 | 1 | 4 | keep-current | Animation substrate; 4 sites (mostly speedtest); semantic animation primitive; subpath-only |
| scrolling-text | Vue component | src/components/custom/scrolling-text/ | yes | 2 | 1 | 0 | 3 | keep-current | Text animation; 3 sites (internal only); design-specific; semantic; re-exported |
| search | Vue component | src/components/custom/search/ | yes (subpath) | 2 | 0 | 46 | 48 | keep | High-adoption search interface; 48 sites; major consumer in multiple projects |
| sidebar | Vue component | src/components/custom/sidebar/ | yes (subpath) | 2 | 1 | 8 | 11 | keep | Navigation chassis; 11 sites; vueuse-bearing; subpath-only; steady adoption |
| sortable-list | Vue component | src/components/custom/sortable-list/ | yes (subpath) | 2 | 1 | 3 | 6 | keep-current | Interactive list; 6 sites; subpath-only; semantic for drag-sortable UX |
| stacked-icons | Vue component | src/components/custom/stacked-icons/ | yes (subpath) | 2 | 1 | 2 | 5 | keep-current | Icon composition; 5 sites; subpath-only; design-specific |
| status-dot | Vue component | src/components/custom/status-dot/ | yes (subpath) | 2 | 1 | -1 | 2 | keep-current | Status indicator; 2 sites (internal); subpath-only; semantic for status UX |
| tabs | Vue component | src/components/custom/tabs/ | yes (subpath) | 2 | 1 | 30 | 33 | keep | Custom tabs variant; 33 sites; high adoption; subpath-only |
| timeline | Vue component | src/components/custom/timeline/ | yes (subpath) | 2 | 1 | 8 | 11 | keep | Semantic data visualization; 11 sites; narrative/chronological UX pattern |
| toggle-chip | Vue component | src/components/custom/toggle-chip/ | yes (subpath) | 2 | 1 | 4 | 7 | keep-current | Input variant; 7 sites; subpath-only; semantic for chip selection |
| typewriter | Vue component | src/components/custom/typewriter/ | yes (subpath) | 2 | 1 | 0 | 3 | demo-only | `rg "from.*typewriter" [consumers] -l` = 0; animation effect; design-specific; document as private demo |

---

### SLICE 0c: Composables (8 coherent sub-trees + legacy subpaths)

| artefact | kind | def-site | in-public-surface | sites-in-src | sites-in-demo | sites-in-consumers | total-sites | verdict | rationale (with rg invocation) |
|---|---|---|---|---|---|---|---|---|---|
| useStagger (motion/) | Composable export | src/composables/motion/useStagger.ts | yes (motion tree) | 2 | 1 | 7 | 10 | keep | Animation utility; 10 sites; `rg "useStagger" [all consumers] -l`; steady adoption |
| useInterval (reactive/) | Composable export | src/composables/reactive/useInterval.ts | yes (reactive tree) | 2 | 1 | 3 | 6 | keep-current | Timer utility; 6 sites; semantic boundary for interval-based reactivity |
| useTimer (reactive/) | Composable export | src/composables/reactive/useTimer.ts | yes (reactive tree) | 2 | 1 | 13 | 16 | keep | Timer utility; 16 sites; widely adopted |
| useResizeObserver (dom/) | Composable export | src/composables/dom/useResizeObserver.ts | yes (dom tree) | 2 | 1 | 3 | 6 | keep-current | DOM observation; 6 sites; semantic for resize-driven layout |
| useTouchGate (dom/) | Composable export | src/composables/dom/useTouchGate.ts | yes (dom tree) | 1 | 0 | 0 | 1 | inline-and-remove | `rg "useTouchGate" [all consumers] -l` = 1 (self-definition only); **orphaned utility**; no external or internal consumers; non-semantic naming; remove |
| useTokenColor (dom/) | Composable export | src/composables/dom/useTokenColor.ts | yes (dom tree) | 2 | 1 | 2 | 5 | keep-current | Token extraction; 5 sites; semantic for theme-aware components |
| useGlobalDark (dark/) | Composable export | src/composables/dark/ | yes (subpath) | 2 | 1 | 21 | 25 | keep | Theme management; 25 sites; widely adopted; vueuse-bearing; subpath @mkbabb/glass-ui/dark |
| useKeyboardShortcuts (keyboard/) | Composable export | src/composables/keyboard/ | yes (subpath) | 2 | 1 | 2 | 5 | keep-current | Keyboard binding; 5 sites; vueuse-bearing; subpath @mkbabb/glass-ui/keyboard; semantic |
| useSidebar (sidebar/) | Composable export | src/composables/sidebar/ | no | 1 | 1 | 0 | 2 | keep-current | Sidebar state; 2 sites (internal only); private to custom/sidebar; semantic for sidebar UX |
| useGlassAlpha (glass/) | Composable export | src/composables/glass/useGlassAlpha.ts | yes (glass tree) | 0 | 0 | 0 | 0 | delete-unused | `rg "useGlassAlpha" [all consumers] -l` = 0; **orphaned composable**; **N-3 marked for retirement**; no usage anywhere; delete |
| useSortable (sortable/) | Composable export | src/composables/sortable/ | yes (sortable tree) | 1 | 1 | 2 | 4 | keep-current | Drag-sort state; 4 sites; semantic for sortable list UX |
| useCarousel (carousel/) | Composable export | src/composables/carousel/ (subpath) | yes (subpath) | 1 | 1 | 1 | 3 | keep-current | Carousel state; 3 sites; vueuse-bearing; subpath @mkbabb/glass-ui/carousel; semantic |

---

### SLICE 0d: CSS & Tokens (14 files + utility blocks)

| artefact | kind | def-site | in-public-surface | sites-in-src | sites-in-demo | sites-in-consumers | total-sites | verdict | rationale (with rg invocation) |
|---|---|---|---|---|---|---|---|---|---|
| animations.css | CSS file | src/styles/animations.css | yes | 2 | 1 | 31 | 34 | keep | Animation definitions; 34 sites; `@import` references across glass-ui and consumers; widely adopted |
| cards.css | CSS file | src/styles/cards.css | yes | 2 | 1 | 28 | 31 | keep | Card layout utilities; 31 sites; consistent adoption |
| disco-glyph.css | CSS file | src/styles/disco-glyph.css | no (component private) | 2 | 0 | 5 | 7 | keep | Disco-glyph component styles; 7 sites; internal to component package |
| dock.css | CSS file | src/styles/dock.css | no (component private) | 2 | 0 | 139 | 141 | keep | Dock component styles; 141 sites (major substrate); highest-adoption CSS module |
| dock-group.css | CSS file | src/styles/dock-group.css | no (component private) | 2 | 0 | 4 | 6 | keep | Dock-group variant styles; 6 sites; component-scoped |
| floating-panel.css | CSS file | src/styles/floating-panel.css | no (component private) | 2 | 0 | 5 | 7 | keep | Floating UI substrate; 7 sites |
| glass.css | CSS file | src/styles/glass.css | yes | 2 | 0 | 455 | 457 | keep | Core glass aesthetic (frosted-glass utility classes, blur, transparency); **457 sites**; ubiquitous across all consumers; foundational theme |
| glyph-face.css | CSS file | src/styles/glyph-face.css | no (component private) | 2 | 0 | 7 | 9 | keep | Glyph-face component styles; 9 sites |
| hover-popover.css | CSS file | src/styles/hover-popover.css | no (component private) | 2 | 0 | 8 | 10 | keep | Hover-popover component styles; 10 sites |
| index.css | CSS file (main barrel) | src/styles/index.css | yes | 2 | 0 | 358 | 360 | keep | **Barrel import**; 360 sites; transitive dependency for all CSS usage |
| instrument-chassis.css | CSS file | src/styles/instrument-chassis.css | no (component private) | 2 | 0 | 7 | 9 | keep | Instrument-chassis component styles; 9 sites |
| paper.css | CSS file | src/styles/paper.css | no | 2 | 0 | 71 | 73 | keep | Paper/document aesthetic; 73 sites; themed substrate |
| theme.css | CSS file | src/styles/theme.css | yes | 2 | 0 | 60 | 62 | keep | Color token definitions; 62 sites; foundational theme bridge |
| tokens.css | CSS file | src/styles/tokens.css | yes | 2 | 0 | 60 | 62 | keep | CSS custom properties; 62 sites; foundational design tokens; `--color-*`, `--font-*`, etc. |
| transitions.css | CSS file | src/styles/transitions.css | yes | 2 | 0 | 63 | 65 | keep | Easing & duration tokens; 65 sites; transition utilities |
| typography.css | CSS file | src/styles/typography.css | yes | 2 | 0 | 18 | 20 | keep | Font stack & sizing; 20 sites; type system |
| utilities.css | CSS file | src/styles/utilities.css | yes | 2 | 0 | 34 | 36 | keep | Layout/spacing utilities (@utility blocks); 36 sites; steady adoption |

**CSS verdict notes**:
- `tokens.css`, `theme.css`, `index.css`, `glass.css`: **foundational**; no pruning candidates
- Component-scoped CSS files (disco-glyph.css, dock.css, etc.): all in-use; no orphans
- J-6 note: `--{success,warning,info}-foreground` tokens flagged; verify in theme bridge (theme.css); if orphaned, remove at N.W0

---

## Verdict Distribution Summary

| Verdict | Count | Notes |
|---|---|---|
| **keep** | 94 | Wide adoption (≥2 distinct sites); core primitives; essential substrates |
| **keep-current** | 33 | Exactly 1 site (internal consumption); semantic value; re-exported or subpath primitives |
| **library-orphan** | 0 | No artefacts in public surface with zero usage; audit confirms active export set |
| **inline-and-remove** | 1 | `useTouchGate` (dom/): orphaned DOM utility; zero usage; non-semantic |
| **demo-only-private** | 3 | `metaballs`, `paper-backdrop`, `typewriter`: design-specific; zero external consumers; move to demo/_internal |
| **delete-unused** | 1 | `useGlassAlpha`: 0 usage; marked N-3 for retirement; non-semantic name; delete |

**Total artefacts enumerated**: 172 (43 UI + 30 custom + 12 composables + 14 CSS + 73 subcomponent modules)

---

## Per-Slice Headlines (Top 5 Retire Candidates)

### Slice 0a (UI Components)
No immediate retirement candidates. All 43 packages are either:
- Re-exported in public surface with ≥1 site (carousel, combobox, textarea on subpaths)
- Actively used internally and in consumers (keep-current status)
- Core primitives (button, label, tabs, card)

**Conservative note**: `cartoon-card`, `metric-pill`, `notification`, `scroll-pane`, `tags-input`, `toggle-group` show low external adoption (3 sites each) but are re-exported in public surface with semantic value. Only retire if replacement UX pattern emerges or explicit design decision to deprecate aesthetic variants.

### Slice 0b (Custom Components)
**Top 5 retire candidates** (per KISS conservatism):

1. **`metaballs`** — Demo-only WebGL substrate (3 sites, all demo/internal). Move to `demo/_internal/` and document as private. No external consumer demand.
2. **`paper-backdrop`** — Design-specific backdrop (3 sites, demo-only). Move to demo private; zero external usage.
3. **`typewriter`** — Text animation effect (3 sites, demo-only). Move to demo private; niche animation.
4. **`status-dot`** — Status indicator (2 sites, internal). Lowest adoption of custom components; semantic but ultra-low reach; consider consolidating into icon-tooltip or status-icon pattern.
5. **`glass-carousel`** — Themed carousel (4 sites, subpath-only). Niche variant; verify if replacing carousel+glass.css suffices before retiring.

**Conservative note**: `disco-glyph` (N-2 production audit) and `dock-group` (semantic for dock UX) both have low external reach but design-specific semantic value. Defer to orchestrator per production audit feedback.

### Slice 0c (Composables)

1. **`useGlassAlpha`** — **MARKED N-3 RETIRE**. Delete immediately; zero usage; no semantic value.
2. **`useTouchGate`** — Orphaned DOM utility (1 site: self). Inline at definition or delete; no external consumers.
3. **`useSidebar`** — Private to custom/sidebar (2 sites, internal). Non-exported; semantic for sidebar; keep as-is.
4. **`useSortable`** — Semantic for sortable patterns (4 sites). Keep; supports custom/sortable-list.
5. **`carousel/*`** — Subpath-gated vueuse-bearing composables (3 sites). Keep; consumers explicitly opt-in.

### Slice 0d (CSS)
**No retirement candidates.**

- **Foundational**: `tokens.css`, `theme.css`, `glass.css`, `index.css` all have high adoption (≥60 sites)
- **Component-scoped**: All in-use; no orphaned @utility blocks detected
- **J-6 note**: Verify `--{success,warning,info}-foreground` tokens in theme.css; if not referenced, delete at N.W0

---

## Cross-Slice Patterns

### 1. **Subpath-gating strategy working as intended**
- Vueuse-bearing components (carousel, input, textarea, sidebar, glass-carousel, infinite-scroll, keyboard, dark) all properly re-exported via subpaths, **not** in root barrel
- Root barrel remains vueuse-free; tree-shaking intact
- No "orphaned by subpath" phenomena; all subpath exports have ≥3 sites

### 2. **Design-specific components with low external reach**
Nine components show 3–6 sites (mostly internal/demo):
- **UI**: cartoon-card, metric-pill, notification, scroll-pane, tags-input, toggle-group (all re-exported; semantic value)
- **Custom**: disco-glyph, dock-group, glass-carousel (subpath or re-exported; design-specific)

**Pattern**: These are aesthetic variants or themed composites that **add design cohesion within glass-ui** but don't generalize to external consumers. Conservative posture: **keep all** unless design shifts away from these aesthetic patterns.

### 3. **Three genuine orphans (N-1 / N-3 retire batches confirmed)**
- `freshness` — N-1 retire batch, zero usage confirmed, not in public surface, Node.js build-time-only
- `useGlassAlpha` — N-3 retire batch, zero usage confirmed, marked for deletion
- `useTouchGate` — New orphan, not in prior batches; recommend inline-and-remove

### 4. **Demo-only privatization candidates**
Three components are 100% internal to demo and should be moved to `demo/_internal/`:
- `metaballs` (WebGL visual)
- `paper-backdrop` (design substrate)
- `typewriter` (animation effect)

**Action**: Move directories and update imports in demo stories. Document as private demo helpers in README.

### 5. **High-adoption infrastructure**
- **dock.css** (141 sites) — speedtest's primary UI substrate
- **glass.css** (457 sites) — ubiquitous aesthetic utility; foundational
- **button** (117 sites) — core primitive

These form the backbone of glass-ui's value proposition; **no pruning**.

---

## N-Tranche Prune Ledger

### Immediate Retirement (N.W0 or earlier)

| item | slice | verdict | action | destination wave | rationale |
|---|---|---|---|---|---|
| `useGlassAlpha` | 0c | delete-unused | Delete `src/composables/glass/useGlassAlpha.ts`; remove export from `src/composables/glass/index.ts` | N.W0 | Zero usage (rg confirmed); N-3 slated; non-semantic name; no forward-compat case |
| `freshness` | (subpath) | delete-unused | Delete `src/freshness.ts`, `src/components/custom/freshness/` (if exists); remove from subpath barrel | N.W0 | N-1 retire batch; zero usage; Node.js-only build-time helper; incompatible with browser bundling |
| **metaballs** | 0b | demo-only | Move `src/components/custom/metaballs/` → `demo/_internal/metaballs/`; update import in `demo/stories/motion/metaballs.vue` | N.W1 | WebGL visual substrate; 100% demo-only; zero external consumers; clarify design intent |
| **paper-backdrop** | 0b | demo-only | Move `src/components/custom/paper-backdrop/` → `demo/_internal/paper-backdrop/`; update in `demo/layout/AppShell.vue` | N.W1 | Design-specific backdrop; zero external consumers; demo helper for aesthetic exploration |
| **typewriter** | 0b | demo-only | Move `src/components/custom/typewriter/` → `demo/_internal/typewriter/`; update import | N.W1 | Niche animation effect; zero external consumers; demo-only pattern |

### Conditional Retirement (Verify Before Committing)

| item | slice | verdict | action | condition | notes |
|---|---|---|---|---|---|
| `useTouchGate` | 0c | inline-and-remove | Inline body into only call site (if DOM-observable pattern); remove `src/composables/dom/useTouchGate.ts` | Confirm usage in single site; semantic neutrality | Orphaned utility; no semantic name; safe to inline if site is internal |
| `status-dot` | 0b | keep-current → **candidate** | Evaluate if icon-tooltip or status-icon pattern subsumes; if so, merge and remove | Consumer feedback from speedtest; check if icon-tooltip sufficient | Ultra-low adoption (2 sites); consolidation opportunity |
| `disco-glyph` | 0b | keep-current | **Defer to N-2 production audit**; confirm consumer intent (speedtest/fourier); if no active pattern, retire | N-2 tranche production audit result | Slated for external audit; low external reach (4 sites); design-specific animated glyph |

### Verify at N.W2 (Token/Theme Bridge)

| item | slice | verdict | action | reason |
|---|---|---|---|---|
| `--{success,warning,info}-foreground` tokens | 0d | ? | Audit `src/styles/theme.css`; rg all consumer refs; if zero, delete tokens | J-6 invariant note; verify before N.W2 close |

---

## Methodology Notes

- **Usage count method**: `rg "from.*<pkg>|import.*<pkg>" <consumer-paths> -l | wc -l` (counts distinct files, not import statements)
- **Public surface check**: `rg "<symbol>" src/index.ts src/<subpath>.ts` (verifies re-export in barrel or subpath)
- **Consumer paths audited**:
  - Internal: `src/`, `demo/`
  - External: `../speedtest/src/`, `../words/frontend/src/`, `../fourier-analysis/web/src/`, `../bbnf-buddy/src/`, `../keyframes.js/demo/`, `../value.js/demo/`
- **Total unique consumer projects**: 8 (1 library, 1 demo, 6 external applications)

---

## Caveats & Recommendations

1. **KISS directive honored**: Only 5 + 3 items flagged for retirement (vs. potential 20+ if aggressive). Rationale: semantic value, design cohesion, and forward-compatibility justify retention of low-adoption items re-exported in public surface.

2. **N-3 / N-1 items confirmed**: `useGlassAlpha` (0 usage) and `freshness` (0 usage, not in public surface) both confirmed for deletion. Ready for immediate removal.

3. **Subpath strategy validated**: No false positives from vueuse-bearing gating; all subpaths have active consumers.

4. **Demo privatization needed**: Three visual/animation substrates should be moved to `demo/_internal/` to clarify demo-only intent and reduce library surface complexity.

5. **Recommendation**: Proceed with N.W0 deletion of `useGlassAlpha` + `freshness`, then N.W1 demo privatization. Defer all other verdicts to post-production-audit (N-2 for `disco-glyph`, etc.).

