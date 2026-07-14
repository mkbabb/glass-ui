# First-party component demo assay

A concept earns a current demo witness only when a directly rendered manifest route reaches a runtime-used component binding/subpath through the transitive `demo/stories` import graph. Sharing a wave, appearing in the manifest, being imported by the global shell, or being named in prose earns nothing. Private-owner exceptions are authored and source-specific.

| concept | decision | witness mode | direct route stories | receipt rows |
| --- | --- | --- | --- | --- |
| surface | retain | DIRECT_ROUTE_GRAPH | demo/stories/foundations/surface-taxonomy.vue | 1 |
| section | private | DIRECT_ROUTE_GRAPH | demo/stories/display/section.vue | 1 |
| button | retain | DIRECT_ROUTE_GRAPH | demo/stories/compositions/auth-shell.vue, demo/stories/compositions/chassis.vue, demo/stories/compositions/empty-states.vue, demo/stories/compositions/form-validation.vue, demo/stories/compositions/gate-pattern.vue, demo/stories/containers/collapsible.vue, demo/stories/containers/dialog.vue, demo/stories/containers/drawer.vue, demo/stories/containers/dropdown-menu.vue, demo/stories/containers/hover-card.vue, demo/stories/containers/hover-popover.vue, demo/stories/containers/popover.vue, demo/stories/containers/sheet.vue, demo/stories/containers/tooltip.vue, demo/stories/display/buttons.vue, demo/stories/display/card.vue, demo/stories/dock/cta-receive.vue, demo/stories/feedback/completion-seal.vue, demo/stories/feedback/confirm-dialog.vue, demo/stories/feedback/notification.vue, demo/stories/feedback/progress.vue, demo/stories/feedback/toast.vue, demo/stories/forms/labeled-field.vue, demo/stories/foundations/motion.vue, demo/stories/motion/deck.vue, demo/stories/motion/handmark.vue, demo/stories/motion/reveal.vue, demo/stories/motion/scroll.vue, demo/stories/motion/springs.vue, demo/stories/motion/tempo.vue, demo/stories/motion/text-motion.vue, demo/stories/substrates/aurora.vue, demo/stories/substrates/glass-material.vue | 39 |
| label | retain | DIRECT_ROUTE_GRAPH | demo/stories/compositions/auth-shell.vue, demo/stories/compositions/form-validation.vue, demo/stories/containers/dialog.vue, demo/stories/containers/popover.vue, demo/stories/containers/sheet.vue, demo/stories/data/tags-input.vue, demo/stories/display/card.vue, demo/stories/forms/checks.vue, demo/stories/forms/inputs.vue, demo/stories/forms/number-field.vue, demo/stories/motion/springs.vue, demo/stories/motion/text-motion.vue, demo/stories/substrates/constellation.vue | 17 |
| input | retain | DIRECT_ROUTE_GRAPH | demo/stories/compositions/auth-shell.vue, demo/stories/compositions/form-validation.vue, demo/stories/compositions/gate-pattern.vue, demo/stories/containers/dialog.vue, demo/stories/containers/popover.vue, demo/stories/containers/sheet.vue, demo/stories/data/table.vue, demo/stories/forms/inputs.vue, demo/stories/forms/labeled-field.vue | 10 |
| textarea | retain | DIRECT_ROUTE_GRAPH | demo/stories/compositions/form-validation.vue, demo/stories/containers/sheet.vue, demo/stories/forms/inputs.vue | 3 |
| separator | retain | DIRECT_ROUTE_GRAPH | demo/stories/compositions/auth-shell.vue, demo/stories/compositions/settings.vue, demo/stories/display/atoms.vue | 3 |
| skeleton | retain | DIRECT_ROUTE_GRAPH | demo/stories/feedback/skeleton.vue | 1 |
| avatar | retain | DIRECT_ROUTE_GRAPH | demo/stories/containers/hover-card.vue, demo/stories/display/atoms.vue | 2 |
| badge | retain | DIRECT_ROUTE_GRAPH | demo/stories/compositions/chassis.vue, demo/stories/containers/dropdown-menu.vue, demo/stories/data/infinite-scroll.vue, demo/stories/data/search.vue, demo/stories/data/table.vue, demo/stories/data/virtual-section.vue, demo/stories/display/badge.vue | 7 |
| alert | retain | DIRECT_ROUTE_GRAPH | demo/stories/feedback/alert.vue | 1 |
| notification-toast | fold | DIRECT_ROUTE_GRAPH | demo/stories/feedback/notification.vue, demo/stories/feedback/toast.vue | 3 |
| progress | retain | DIRECT_ROUTE_GRAPH | demo/stories/feedback/progress.vue | 1 |
| pulse | retain | DIRECT_ROUTE_GRAPH | demo/stories/display/atoms.vue | 1 |
| status-dot | retain | DIRECT_ROUTE_GRAPH | demo/stories/display/atoms.vue | 1 |
| animated-digit | retain | DIRECT_ROUTE_GRAPH | demo/stories/motion/text-motion.vue | 1 |
| split-chars | retain | DIRECT_ROUTE_GRAPH | demo/stories/motion/text-motion.vue | 1 |
| typewriter | retain | DIRECT_ROUTE_GRAPH | demo/stories/motion/text-motion.vue | 1 |
| color-swatch | private | DIRECT_ROUTE_GRAPH | demo/stories/substrates/aurora.vue | 1 |
| dark-mode-toggle | rename | DIRECT_ROUTE_GRAPH | demo/stories/display/atoms.vue | 1 |
| stacked-icons | delete | DIRECT_ROUTE_GRAPH | demo/stories/display/atoms.vue | 1 |
| paper-backdrop | retain | DIRECT_ROUTE_GRAPH | demo/stories/foundations/paper-glass.vue | 1 |
| border-progress | delete | DIRECT_ROUTE_GRAPH | demo/stories/feedback/progress.vue | 1 |
| checkbox | retain | DIRECT_ROUTE_GRAPH | demo/stories/compositions/auth-shell.vue, demo/stories/forms/checks.vue, demo/stories/forms/inputs.vue | 3 |
| radio-group | retain | DIRECT_ROUTE_GRAPH | demo/stories/forms/checks.vue, demo/stories/forms/inputs.vue | 2 |
| switch | retain | DIRECT_ROUTE_GRAPH | demo/stories/compositions/chassis.vue, demo/stories/display/card.vue, demo/stories/forms/checks.vue, demo/stories/forms/inputs.vue, demo/stories/motion/text-motion.vue, demo/stories/substrates/constellation.vue | 6 |
| toggle | retain | DIRECT_ROUTE_GRAPH | demo/stories/forms/toggle.vue | 1 |
| toggle-group | retain | DIRECT_ROUTE_GRAPH | demo/stories/forms/toggle.vue, demo/stories/substrates/aurora.vue, demo/stories/substrates/glass-panel.vue | 3 |
| chip | fold | DIRECT_ROUTE_GRAPH | demo/stories/compositions/auth-shell.vue, demo/stories/compositions/empty-states.vue, demo/stories/containers/accordion.vue, demo/stories/containers/collapsible.vue, demo/stories/containers/command.vue, demo/stories/containers/context-menu.vue, demo/stories/containers/dialog.vue, demo/stories/containers/drawer.vue, demo/stories/containers/dropdown-menu.vue, demo/stories/containers/expandable-container.vue, demo/stories/containers/hover-card.vue, demo/stories/containers/hover-popover.vue, demo/stories/containers/popover.vue, demo/stories/containers/sheet.vue, demo/stories/containers/tooltip.vue, demo/stories/data/table.vue, demo/stories/display/badge.vue, demo/stories/feedback/alert.vue, demo/stories/feedback/confirm-dialog.vue, demo/stories/feedback/notification.vue, demo/stories/feedback/progress.vue, demo/stories/feedback/skeleton.vue, demo/stories/feedback/toast.vue, demo/stories/forms/checks.vue, demo/stories/forms/inputs.vue, demo/stories/forms/number-field.vue, demo/stories/forms/slider.vue, demo/stories/forms/toggle.vue, demo/stories/foundations/icons.vue, demo/stories/navigation/carousel.vue, demo/stories/navigation/header-ribbon.vue, demo/stories/navigation/tabs.vue | 41 |
| tabs | retain | DIRECT_ROUTE_GRAPH | demo/stories/containers/spa-view.vue, demo/stories/navigation/tabs.vue, demo/stories/substrates/aurora.vue | 5 |
| slider | retain | DIRECT_ROUTE_GRAPH | demo/stories/dock/overview.vue, demo/stories/forms/slider.vue, demo/stories/motion/tempo.vue, demo/stories/motion/text-motion.vue, demo/stories/substrates/aurora.vue | 5 |
| number-field | retain | DIRECT_ROUTE_GRAPH | demo/stories/forms/number-field.vue | 1 |
| select | retain | DIRECT_ROUTE_GRAPH | demo/stories/dock/controls.vue, demo/stories/dock/overview.vue, demo/stories/forms/inputs.vue, demo/stories/motion/curve-gallery.vue, demo/stories/motion/springs.vue | 5 |
| combobox | retain | DIRECT_ROUTE_GRAPH | demo/stories/forms/inputs.vue | 1 |
| tags-input | retain | DIRECT_ROUTE_GRAPH | demo/stories/data/tags-input.vue | 1 |
| labeled-field | retain | DIRECT_ROUTE_GRAPH | demo/stories/compositions/form-validation.vue, demo/stories/compositions/settings.vue, demo/stories/containers/configurator.vue, demo/stories/forms/labeled-field.vue, demo/stories/motion/springs.vue, demo/stories/substrates/aurora.vue, demo/stories/substrates/blob.vue, demo/stories/substrates/fourier-field.vue, demo/stories/substrates/liquid-grid.vue | 15 |
| search | retain | DIRECT_ROUTE_GRAPH | demo/stories/data/search.vue, demo/stories/forms/inputs.vue | 2 |
| focus-scope | private | INDIRECT_OWNER_COMPOSITION | demo/stories/containers/command.vue, demo/stories/containers/dialog.vue, demo/stories/containers/drawer.vue, demo/stories/containers/popover.vue | 4 |
| collapsible | retain | DIRECT_ROUTE_GRAPH | demo/stories/containers/collapsible.vue | 1 |
| accordion | retain | DIRECT_ROUTE_GRAPH | demo/stories/containers/accordion.vue | 1 |
| popover | retain | DIRECT_ROUTE_GRAPH | demo/stories/containers/hover-card.vue, demo/stories/containers/hover-popover.vue, demo/stories/containers/popover.vue, demo/stories/dock/overview.vue, demo/stories/motion/tempo.vue | 5 |
| tooltip | fold | DIRECT_ROUTE_GRAPH | demo/stories/containers/hover-card.vue, demo/stories/containers/icon-tooltip.vue, demo/stories/containers/tooltip.vue, demo/stories/dock/rail.vue | 4 |
| dropdown-menu | retain | DIRECT_ROUTE_GRAPH | demo/stories/containers/context-menu.vue, demo/stories/containers/dropdown-menu.vue, demo/stories/dock/overview.vue, demo/stories/motion/tempo.vue | 4 |
| dialog | retain | DIRECT_ROUTE_GRAPH | demo/stories/compositions/gate-pattern.vue, demo/stories/containers/dialog.vue, demo/stories/containers/sheet.vue, demo/stories/feedback/confirm-dialog.vue, demo/stories/motion/tempo.vue | 5 |
| drawer | retain | DIRECT_ROUTE_GRAPH | demo/stories/containers/drawer.vue | 1 |
| command | retain | DIRECT_ROUTE_GRAPH | demo/stories/containers/command.vue | 1 |
| card | retain | DIRECT_ROUTE_GRAPH | demo/stories/compositions/empty-states.vue, demo/stories/compositions/gate-pattern.vue, demo/stories/compositions/settings.vue, demo/stories/containers/card-pressable.vue, demo/stories/containers/dropdown-menu.vue, demo/stories/containers/hover-popover.vue, demo/stories/containers/popover.vue, demo/stories/containers/sheet.vue, demo/stories/data/search.vue, demo/stories/data/sortable-list.vue, demo/stories/data/tags-input.vue, demo/stories/display/atoms.vue, demo/stories/display/card.vue | 14 |
| expandable-container | retain | DIRECT_ROUTE_GRAPH | demo/stories/containers/expandable-container.vue | 1 |
| fading-scroll | retain | DIRECT_ROUTE_GRAPH | demo/stories/motion/curve-gallery.vue, demo/stories/navigation/carousel.vue, demo/stories/substrates/aurora.vue, demo/stories/substrates/blob.vue | 5 |
| infinite-scroll | retain | DIRECT_ROUTE_GRAPH | demo/stories/data/infinite-scroll.vue | 1 |
| spa-view | rehome | DIRECT_ROUTE_GRAPH | demo/stories/containers/spa-view.vue | 1 |
| header-ribbon | retain | DIRECT_ROUTE_GRAPH | demo/stories/navigation/header-ribbon.vue | 1 |
| table | retain | DIRECT_ROUTE_GRAPH | demo/stories/data/table.vue | 1 |
| data-table | retain | DIRECT_ROUTE_GRAPH | demo/stories/data/table.vue | 1 |
| metric | fold | DIRECT_ROUTE_GRAPH | demo/stories/data/instrument-chassis.vue, demo/stories/data/metrics.vue | 4 |
| pager-dots | retain | DIRECT_ROUTE_GRAPH | demo/stories/navigation/carousel.vue | 1 |
| carousel | retain | DIRECT_ROUTE_GRAPH | demo/stories/navigation/carousel.vue | 1 |
| timeline | retain | DIRECT_ROUTE_GRAPH | demo/stories/data/timeline.vue, demo/stories/substrates/fourier-field.vue | 4 |
| deck | retain | DIRECT_ROUTE_GRAPH | demo/stories/motion/deck.vue | 1 |
| instrument-chassis | retain | DIRECT_ROUTE_GRAPH | demo/stories/data/instrument-chassis.vue, demo/stories/foundations/chart-chassis-palette.vue | 2 |
| completion-seal | rehome | DIRECT_ROUTE_GRAPH | demo/stories/feedback/completion-seal.vue | 1 |
| easing | retain | DIRECT_ROUTE_GRAPH | demo/stories/motion/curve-gallery.vue | 1 |
| aurora | retain | DIRECT_ROUTE_GRAPH | demo/stories/compositions/auth-shell.vue, demo/stories/display/buttons.vue, demo/stories/display/card.vue, demo/stories/dock/controls.vue, demo/stories/dock/cta-receive.vue, demo/stories/dock/dock-search.vue, demo/stories/dock/layers.vue, demo/stories/dock/overflow.vue, demo/stories/dock/overview.vue, demo/stories/dock/rail.vue, demo/stories/dock/sections.vue, demo/stories/substrates/aurora.vue, demo/stories/substrates/glass-panel.vue | 22 |
| blob | retain | DIRECT_ROUTE_GRAPH | demo/stories/compositions/empty-states.vue, demo/stories/substrates/blob.vue | 5 |
| configurator | retain | DIRECT_ROUTE_GRAPH | demo/stories/containers/configurator.vue, demo/stories/substrates/aurora.vue, demo/stories/substrates/blob.vue, demo/stories/substrates/fourier-field.vue, demo/stories/substrates/liquid-grid.vue | 9 |
| constellation | retain | DIRECT_ROUTE_GRAPH | demo/stories/substrates/constellation.vue | 1 |
| dock | retain | DIRECT_ROUTE_GRAPH | demo/stories/data/instrument-chassis.vue, demo/stories/display/atoms.vue, demo/stories/dock/controls.vue, demo/stories/dock/cta-receive.vue, demo/stories/dock/dock-search.vue, demo/stories/dock/layers.vue, demo/stories/dock/overflow.vue, demo/stories/dock/overview.vue, demo/stories/dock/rail.vue, demo/stories/dock/sections.vue, demo/stories/motion/tempo.vue, demo/stories/navigation/header-ribbon.vue, demo/stories/substrates/blob.vue, demo/stories/substrates/fourier-field.vue, demo/stories/substrates/liquid-grid.vue | 17 |
| fourier-field | retain | DIRECT_ROUTE_GRAPH | demo/stories/substrates/fourier-field.vue | 2 |
| goo-filter | rehome-private | INDIRECT_OWNER_COMPOSITION | demo/stories/motion/deck.vue | 1 |
| handmark | retain | DIRECT_ROUTE_GRAPH | demo/stories/motion/handmark.vue | 1 |
| liquid-grid | retain | DIRECT_ROUTE_GRAPH | demo/stories/substrates/liquid-grid.vue | 2 |
| sortable-list | retain | DIRECT_ROUTE_GRAPH | demo/stories/data/sortable-list.vue, demo/stories/substrates/aurora.vue | 2 |
| watercolor-dot | retain | DIRECT_ROUTE_GRAPH | demo/stories/foundations/colors.vue, demo/stories/substrates/blob.vue | 2 |
