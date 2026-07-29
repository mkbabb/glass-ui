# Glass UI repository graph — schema v3

Observed: 2026-07-29T16:08:12.499Z

Deterministic receipt (the `observedAt` value is excluded):
`993a572241a07e2bc16c075224d53288963bf7780c50aa7e1e0c1f6b43aa7387`

Owner manifest receipt: `e19b663fb671e046727469832be1d160095eb5cb7d3ba54aa2818277043100ba`

## Scope and result

This is the pre-source execution instrument required by BK PLAN §6. Its seven
seed projections are product, demo, tests, visual tests, scripts/generators,
build configuration, and package surface. Local targets outside those seeds are
added as repository-boundary nodes, so a boundary edge remains traversable.

Vue SFCs are parsed with `@vue/compiler-sfc`, their script blocks with the
TypeScript AST, their templates with the Vue template AST, and CSS with
PostCSS. Literal Vite glob arrays retain negative patterns and
`eager`/`import`/`query` options. CSS imports retain layer, supports, and
media clauses. Every graph file matches exactly one checked owner rule and every
package export key maps to exactly one owner.

| Measure | Count |
| --- | ---: |
| Nodes | 1497 |
| Internal edges | 3574 |
| External edges | 1953 |
| Owners | 101 |
| Public entries | 72 |
| Public symbols | 1285 |
| Unresolved local references | 0 |
| Nonliteral local references | 0 |
| Dynamic nonlocal module references | 1 |
| Dynamic template/style asset expressions | 123 |
| Unmatched literal globs | 0 |
| Parse errors | 0 |
| Detectable-but-unmodeled file operations | 258 |
| Process invocations | 7 |
| Dynamic process arguments | 9 |

## Node types

Physical/content types remain separate from lifecycle provenance:

| Type | Count |
| --- | ---: |
| `binary` | 9 |
| `declaration` | 2 |
| `directory` | 23 |
| `documentation` | 29 |
| `generated-artifact` | 2 |
| `license` | 2 |
| `package-output` | 137 |
| `source` | 1154 |
| `style` | 131 |
| `virtual-placeholder` | 8 |

## Node lifecycle taxonomy

| Kind | Count |
| --- | ---: |
| `declared-package-output` | 137 |
| `directory` | 20 |
| `generated-by-write` | 5 |
| `missing-runtime-placeholder` | 8 |
| `repository-file` | 1327 |

`repository-file` is canonical source content even when a tool rewrites it
(for example, `package.json`). `generated-by-write` requires a real modeled
`generator-write` edge and names that generator in `generatedBy`.
`declared-package-output` is a pre-build package declaration, while
`missing-runtime-placeholder` is a missing path referenced by a test,
runtime, or ordinary file operation. Directories remain explicit rather than
masquerading as generated files. Every node belongs to exactly one lifecycle
kind; a generated directory therefore retains physical type `directory` and
lifecycle kind `generated-by-write`.

## Joinable projections

| Projection | Nodes |
| --- | ---: |
| `build-config` | 14 |
| `demo` | 195 |
| `package-surface` | 2 |
| `product` | 694 |
| `repository-boundary` | 175 |
| `scripts-generators` | 13 |
| `tests` | 213 |
| `visual-tests` | 191 |

Every node carries one `projection` and one `owner`; every internal edge
carries its source/target, semantic `edgeKind`, boundary class, and membership
in the three SCC views. That makes product/demo/test/visual/script/build/package
queries directly joinable without conflating them.

## Edge kinds

| Edge kind | Count |
| --- | ---: |
| `asset-url` | 8 |
| `build-entry` | 69 |
| `css-import` | 113 |
| `eager-runtime` | 3336 |
| `export-from` | 476 |
| `file-read` | 32 |
| `file-write` | 4 |
| `generator-read` | 10 |
| `generator-write` | 7 |
| `glob-lazy` | 107 |
| `literal-dynamic` | 67 |
| `literal-require` | 2 |
| `new-url` | 125 |
| `package-export` | 140 |
| `package-side-effect` | 4 |
| `require-resolve` | 1 |
| `type-only` | 941 |
| `types-version` | 66 |
| `vue-block` | 19 |

## Separate SCC views

| View | Edges | File cycles | Owner cycles |
| --- | ---: | ---: | ---: |
| `eagerRuntime` | 2220 | 2 | 3 |
| `buildLoad` | 3445 | 10 | 3 |
| `ownership` | 3574 | 10 | 3 |

`eagerRuntime` excludes type-only, lazy, CSS/asset, and generator reach.
`buildLoad` adds compile/load/package/generator relations.
`ownership` retains every internal dependency, including assets. Type-erased
and lazy edges therefore remain visible as ownership constraints even when
they do not create eager runtime cycles. The build-load and ownership
projections are definitionally distinct: ownership includes asset, template,
and URL relations that build-load excludes. Their cycle memberships in this
snapshot are nevertheless identical (degenerate);
their edge counts remain independently reported above.

### File-cycle membership

| View | Cycle | Size | Members |
| --- | ---: | ---: | --- |
| `eagerRuntime` | 1 | 2 | `src/components/alert/Alert.vue`<br>`src/components/alert/index.ts` |
| `eagerRuntime` | 2 | 2 | `src/components/badge/Badge.vue`<br>`src/components/badge/index.ts` |
| `buildLoad` | 1 | 105 | `demo/chassis/landing/SectionPreviewCard.vue`<br>`demo/chassis/landing/storyTile.ts`<br>`demo/chassis/page/StoryPage.vue`<br>`demo/chassis/useStoryNavigation.ts`<br>`demo/stories/compositions/auth-shell.vue`<br>`demo/stories/compositions/chassis.vue`<br>`demo/stories/compositions/empty-states.vue`<br>`demo/stories/compositions/form-validation.vue`<br>`demo/stories/compositions/gate-pattern.vue`<br>`demo/stories/compositions/settings.vue`<br>`demo/stories/containers/accordion.vue`<br>`demo/stories/containers/collapsible.vue`<br>`demo/stories/containers/command.vue`<br>`demo/stories/containers/configurator.vue`<br>`demo/stories/containers/context-menu.vue`<br>`demo/stories/containers/dialog.vue`<br>`demo/stories/containers/drawer.vue`<br>`demo/stories/containers/dropdown-menu.vue`<br>`demo/stories/containers/expandable-container.vue`<br>`demo/stories/containers/hover-card.vue`<br>`demo/stories/containers/hover-popover.vue`<br>`demo/stories/containers/popover.vue`<br>`demo/stories/containers/sheet.vue`<br>`demo/stories/containers/tooltip.vue`<br>`demo/stories/data/avatar.vue`<br>`demo/stories/data/data-table.vue`<br>`demo/stories/data/infinite-scroll.vue`<br>`demo/stories/data/instrument-chassis.vue`<br>`demo/stories/data/metric.vue`<br>`demo/stories/data/search.vue`<br>`demo/stories/data/sortable-list.vue`<br>`demo/stories/data/table.vue`<br>`demo/stories/data/tags-input.vue`<br>`demo/stories/data/timeline.vue`<br>`demo/stories/data/virtual-section.vue`<br>`demo/stories/display/atoms.vue`<br>`demo/stories/display/badge.vue`<br>`demo/stories/display/buttons.vue`<br>`demo/stories/display/card.vue`<br>`demo/stories/display/dark-mode-toggle.vue`<br>`demo/stories/display/separator.vue`<br>`demo/stories/display/status-dot.vue`<br>`demo/stories/display/surface.vue`<br>`demo/stories/dock/controls.vue`<br>`demo/stories/dock/cta-receive.vue`<br>`demo/stories/dock/dock-search.vue`<br>`demo/stories/dock/layers.vue`<br>`demo/stories/dock/overflow.vue`<br>`demo/stories/dock/overview.vue`<br>`demo/stories/dock/rail.vue`<br>`demo/stories/dock/sections.vue`<br>`demo/stories/feedback/alert.vue`<br>`demo/stories/feedback/completion-seal.vue`<br>`demo/stories/feedback/confirm-dialog.vue`<br>`demo/stories/feedback/progress.vue`<br>`demo/stories/feedback/skeleton.vue`<br>`demo/stories/feedback/toast.vue`<br>`demo/stories/feedback/toaster.vue`<br>`demo/stories/forms/checks.vue`<br>`demo/stories/forms/chip.vue`<br>`demo/stories/forms/inputs.vue`<br>`demo/stories/forms/label.vue`<br>`demo/stories/forms/labeled-field.vue`<br>`demo/stories/forms/number-field.vue`<br>`demo/stories/forms/select.vue`<br>`demo/stories/forms/slider.vue`<br>`demo/stories/forms/textarea.vue`<br>`demo/stories/forms/toggle.vue`<br>`demo/stories/foundations/chart-palette.vue`<br>`demo/stories/foundations/colors.vue`<br>`demo/stories/foundations/css-utilities.vue`<br>`demo/stories/foundations/icons.vue`<br>`demo/stories/foundations/intro.vue`<br>`demo/stories/foundations/motion.vue`<br>`demo/stories/foundations/overlays-scrims.vue`<br>`demo/stories/foundations/paper-glass.vue`<br>`demo/stories/foundations/paper-texture.vue`<br>`demo/stories/foundations/radii.vue`<br>`demo/stories/foundations/shadows.vue`<br>`demo/stories/foundations/surface-tints.vue`<br>`demo/stories/foundations/typography.vue`<br>`demo/stories/manifest.ts`<br>`demo/stories/motion/animated-digit.vue`<br>`demo/stories/motion/countup.vue`<br>`demo/stories/motion/curve-gallery.vue`<br>`demo/stories/motion/deck.vue`<br>`demo/stories/motion/handmark.vue`<br>`demo/stories/motion/reveal.vue`<br>`demo/stories/motion/scroll.vue`<br>`demo/stories/motion/springs.vue`<br>`demo/stories/motion/tempo.vue`<br>`demo/stories/motion/text-motion.vue`<br>`demo/stories/motion/typewriter.vue`<br>`demo/stories/navigation/carousel.vue`<br>`demo/stories/navigation/header-ribbon.vue`<br>`demo/stories/navigation/pager-dots.vue`<br>`demo/stories/navigation/tabs.vue`<br>`demo/stories/navigation/toc-tracking.vue`<br>`demo/stories/substrates/_frame/VizStudio.vue`<br>`demo/stories/substrates/aurora.vue`<br>`demo/stories/substrates/blob.vue`<br>`demo/stories/substrates/constellation.vue`<br>`demo/stories/substrates/fourier-field.vue`<br>`demo/stories/substrates/glass-material.vue`<br>`demo/stories/substrates/glass-panel.vue` |
| `buildLoad` | 2 | 7 | `src/components/drawer/Drawer.vue`<br>`src/components/drawer/DrawerContent.vue`<br>`src/components/drawer/DrawerOverlay.vue`<br>`src/components/drawer/composables/drawerSnapContext.ts`<br>`src/components/drawer/composables/useDrawerSnap.ts`<br>`src/components/drawer/constants.ts`<br>`src/components/drawer/index.ts` |
| `buildLoad` | 3 | 4 | `src/components/constellation/constants.ts`<br>`src/components/constellation/constellationField.ts`<br>`src/components/constellation/constellationInteraction.ts`<br>`src/components/constellation/constellationWell.ts` |
| `buildLoad` | 4 | 3 | `src/components/aurora/composables/frameLoop.ts`<br>`src/components/aurora/composables/glSetup.ts`<br>`src/components/aurora/composables/uniformBridge.ts` |
| `buildLoad` | 5 | 3 | `src/components/tabs/SegmentedTabs.vue`<br>`src/components/tabs/composables/useTabDragMorph.ts`<br>`src/components/tabs/composables/useTabResponsive.ts` |
| `buildLoad` | 6 | 2 | `src/components/_shared/interaction.ts`<br>`src/components/_shared/selection.ts` |
| `buildLoad` | 7 | 2 | `src/components/alert/Alert.vue`<br>`src/components/alert/index.ts` |
| `buildLoad` | 8 | 2 | `src/components/badge/Badge.vue`<br>`src/components/badge/index.ts` |
| `buildLoad` | 9 | 2 | `src/composables/color/accent-tone-solve.ts`<br>`src/composables/color/useAccentTone.ts` |
| `buildLoad` | 10 | 2 | `src/composables/glass/webgl/createCanvasLifecycle.ts`<br>`src/composables/glass/webgl/visibility.ts` |
| `ownership` | 1 | 105 | `demo/chassis/landing/SectionPreviewCard.vue`<br>`demo/chassis/landing/storyTile.ts`<br>`demo/chassis/page/StoryPage.vue`<br>`demo/chassis/useStoryNavigation.ts`<br>`demo/stories/compositions/auth-shell.vue`<br>`demo/stories/compositions/chassis.vue`<br>`demo/stories/compositions/empty-states.vue`<br>`demo/stories/compositions/form-validation.vue`<br>`demo/stories/compositions/gate-pattern.vue`<br>`demo/stories/compositions/settings.vue`<br>`demo/stories/containers/accordion.vue`<br>`demo/stories/containers/collapsible.vue`<br>`demo/stories/containers/command.vue`<br>`demo/stories/containers/configurator.vue`<br>`demo/stories/containers/context-menu.vue`<br>`demo/stories/containers/dialog.vue`<br>`demo/stories/containers/drawer.vue`<br>`demo/stories/containers/dropdown-menu.vue`<br>`demo/stories/containers/expandable-container.vue`<br>`demo/stories/containers/hover-card.vue`<br>`demo/stories/containers/hover-popover.vue`<br>`demo/stories/containers/popover.vue`<br>`demo/stories/containers/sheet.vue`<br>`demo/stories/containers/tooltip.vue`<br>`demo/stories/data/avatar.vue`<br>`demo/stories/data/data-table.vue`<br>`demo/stories/data/infinite-scroll.vue`<br>`demo/stories/data/instrument-chassis.vue`<br>`demo/stories/data/metric.vue`<br>`demo/stories/data/search.vue`<br>`demo/stories/data/sortable-list.vue`<br>`demo/stories/data/table.vue`<br>`demo/stories/data/tags-input.vue`<br>`demo/stories/data/timeline.vue`<br>`demo/stories/data/virtual-section.vue`<br>`demo/stories/display/atoms.vue`<br>`demo/stories/display/badge.vue`<br>`demo/stories/display/buttons.vue`<br>`demo/stories/display/card.vue`<br>`demo/stories/display/dark-mode-toggle.vue`<br>`demo/stories/display/separator.vue`<br>`demo/stories/display/status-dot.vue`<br>`demo/stories/display/surface.vue`<br>`demo/stories/dock/controls.vue`<br>`demo/stories/dock/cta-receive.vue`<br>`demo/stories/dock/dock-search.vue`<br>`demo/stories/dock/layers.vue`<br>`demo/stories/dock/overflow.vue`<br>`demo/stories/dock/overview.vue`<br>`demo/stories/dock/rail.vue`<br>`demo/stories/dock/sections.vue`<br>`demo/stories/feedback/alert.vue`<br>`demo/stories/feedback/completion-seal.vue`<br>`demo/stories/feedback/confirm-dialog.vue`<br>`demo/stories/feedback/progress.vue`<br>`demo/stories/feedback/skeleton.vue`<br>`demo/stories/feedback/toast.vue`<br>`demo/stories/feedback/toaster.vue`<br>`demo/stories/forms/checks.vue`<br>`demo/stories/forms/chip.vue`<br>`demo/stories/forms/inputs.vue`<br>`demo/stories/forms/label.vue`<br>`demo/stories/forms/labeled-field.vue`<br>`demo/stories/forms/number-field.vue`<br>`demo/stories/forms/select.vue`<br>`demo/stories/forms/slider.vue`<br>`demo/stories/forms/textarea.vue`<br>`demo/stories/forms/toggle.vue`<br>`demo/stories/foundations/chart-palette.vue`<br>`demo/stories/foundations/colors.vue`<br>`demo/stories/foundations/css-utilities.vue`<br>`demo/stories/foundations/icons.vue`<br>`demo/stories/foundations/intro.vue`<br>`demo/stories/foundations/motion.vue`<br>`demo/stories/foundations/overlays-scrims.vue`<br>`demo/stories/foundations/paper-glass.vue`<br>`demo/stories/foundations/paper-texture.vue`<br>`demo/stories/foundations/radii.vue`<br>`demo/stories/foundations/shadows.vue`<br>`demo/stories/foundations/surface-tints.vue`<br>`demo/stories/foundations/typography.vue`<br>`demo/stories/manifest.ts`<br>`demo/stories/motion/animated-digit.vue`<br>`demo/stories/motion/countup.vue`<br>`demo/stories/motion/curve-gallery.vue`<br>`demo/stories/motion/deck.vue`<br>`demo/stories/motion/handmark.vue`<br>`demo/stories/motion/reveal.vue`<br>`demo/stories/motion/scroll.vue`<br>`demo/stories/motion/springs.vue`<br>`demo/stories/motion/tempo.vue`<br>`demo/stories/motion/text-motion.vue`<br>`demo/stories/motion/typewriter.vue`<br>`demo/stories/navigation/carousel.vue`<br>`demo/stories/navigation/header-ribbon.vue`<br>`demo/stories/navigation/pager-dots.vue`<br>`demo/stories/navigation/tabs.vue`<br>`demo/stories/navigation/toc-tracking.vue`<br>`demo/stories/substrates/_frame/VizStudio.vue`<br>`demo/stories/substrates/aurora.vue`<br>`demo/stories/substrates/blob.vue`<br>`demo/stories/substrates/constellation.vue`<br>`demo/stories/substrates/fourier-field.vue`<br>`demo/stories/substrates/glass-material.vue`<br>`demo/stories/substrates/glass-panel.vue` |
| `ownership` | 2 | 7 | `src/components/drawer/Drawer.vue`<br>`src/components/drawer/DrawerContent.vue`<br>`src/components/drawer/DrawerOverlay.vue`<br>`src/components/drawer/composables/drawerSnapContext.ts`<br>`src/components/drawer/composables/useDrawerSnap.ts`<br>`src/components/drawer/constants.ts`<br>`src/components/drawer/index.ts` |
| `ownership` | 3 | 4 | `src/components/constellation/constants.ts`<br>`src/components/constellation/constellationField.ts`<br>`src/components/constellation/constellationInteraction.ts`<br>`src/components/constellation/constellationWell.ts` |
| `ownership` | 4 | 3 | `src/components/aurora/composables/frameLoop.ts`<br>`src/components/aurora/composables/glSetup.ts`<br>`src/components/aurora/composables/uniformBridge.ts` |
| `ownership` | 5 | 3 | `src/components/tabs/SegmentedTabs.vue`<br>`src/components/tabs/composables/useTabDragMorph.ts`<br>`src/components/tabs/composables/useTabResponsive.ts` |
| `ownership` | 6 | 2 | `src/components/_shared/interaction.ts`<br>`src/components/_shared/selection.ts` |
| `ownership` | 7 | 2 | `src/components/alert/Alert.vue`<br>`src/components/alert/index.ts` |
| `ownership` | 8 | 2 | `src/components/badge/Badge.vue`<br>`src/components/badge/index.ts` |
| `ownership` | 9 | 2 | `src/composables/color/accent-tone-solve.ts`<br>`src/composables/color/useAccentTone.ts` |
| `ownership` | 10 | 2 | `src/composables/glass/webgl/createCanvasLifecycle.ts`<br>`src/composables/glass/webgl/visibility.ts` |

### Owner-cycle membership

| View | Cycle | Size | Members |
| --- | ---: | ---: | --- |
| `eagerRuntime` | 1 | 9 | `product/component/_shared`<br>`product/component/dock`<br>`product/component/dropdown-menu`<br>`product/component/search`<br>`product/component/select`<br>`product/component/tabs`<br>`product/component/tooltip`<br>`product/composable/glass`<br>`product/composable/motion` |
| `eagerRuntime` | 2 | 2 | `demo/app`<br>`demo/shell` |
| `eagerRuntime` | 3 | 2 | `demo/chassis`<br>`demo/stories` |
| `buildLoad` | 1 | 9 | `product/component/_shared`<br>`product/component/dock`<br>`product/component/dropdown-menu`<br>`product/component/search`<br>`product/component/select`<br>`product/component/tabs`<br>`product/component/tooltip`<br>`product/composable/glass`<br>`product/composable/motion` |
| `buildLoad` | 2 | 2 | `demo/app`<br>`demo/shell` |
| `buildLoad` | 3 | 2 | `demo/chassis`<br>`demo/stories` |
| `ownership` | 1 | 9 | `product/component/_shared`<br>`product/component/dock`<br>`product/component/dropdown-menu`<br>`product/component/search`<br>`product/component/select`<br>`product/component/tabs`<br>`product/component/tooltip`<br>`product/composable/glass`<br>`product/composable/motion` |
| `ownership` | 2 | 2 | `demo/app`<br>`demo/shell` |
| `ownership` | 3 | 2 | `demo/chassis`<br>`demo/stories` |

### SCC containment ratchets

Current/baseline counts below are cyclic-node totals and maximum component
sizes. The checked manifest permits removals and splits, but rejects a new
member, a merge of previously separate baseline components, total cyclic-node
growth, or maximum-SCC growth.

| View | Kind | Cyclic nodes | Maximum SCC |
| --- | --- | ---: | ---: |
| `eagerRuntime` | `fileCycles` | 4/4 | 2/2 |
| `eagerRuntime` | `ownerCycles` | 13/13 | 9/9 |
| `buildLoad` | `fileCycles` | 132/132 | 105/105 |
| `buildLoad` | `ownerCycles` | 13/13 | 9/9 |
| `ownership` | `fileCycles` | 132/132 | 105/105 |
| `ownership` | `ownerCycles` | 13/13 | 9/9 |

## Package and public-symbol reach

`packageSurface` records every `exports` condition target,
`typesVersions`, `sideEffects`, and the Vite/Rolldown entry map obtained from
the repository's fail-closed subpath policy. `publicReach` joins each package
key to its owner, source entry, output targets, and AST-derived exported symbol
set. Whenever a source entry resolves, its node owner must equal the manifest's
declared public owner. CSS and font entries carry an explicit asset symbol.

## Failure contract and bounded limitations

Generation exits non-zero for an unowned or multiply owned graph file, a
package key without exactly one owner, an unresolved literal local reference,
an unmatched positive glob, a nonliteral local loader/worker/URL, or a parser
error, including TypeScript syntactic diagnostics. Generator filesystem calls
are modeled when their path expression can be
reduced from literals, `resolve`/`join`, `new URL(..., import.meta.url)`,
and local constants; irreducibly dynamic operations remain counted in
`unmodeledFileOperations` and are not represented as false edges. This
snapshot contains 258 such operations
(251 at the pre-source challenge seal). Literal CommonJS `require` and
`createRequire` targets are graph edges; `exec`/`execFile`/`spawn`
families are retained in a process-invocation ledger with statically reducible
command and argv targets plus an explicit dynamic-argument count. Dynamic
nonlocal module references are also ledgered, not falsely resolved into local
edges. Literal Vue bindings and static inline-style `url()` values become
asset edges; dynamic template or style asset expressions are retained in
`dynamicAssetReferences` rather than silently omitted.

Runtime template bindings that can resolve to network data are not guessed to
be local assets. Generated-write artifacts, declared package outputs, missing
runtime placeholders, and directories have distinct lifecycle kinds; a
generator's own file remains canonical source. Package outputs under `dist/`
remain virtual declarations because this is a pre-build source graph.

The instrument is intentionally visible inside its own measurement boundary:
its architecture test imports the generator, and literal manifest/package
loads are ordinary graph edges. The emitted JSON and Markdown artifacts remain
excluded from seed discovery to avoid a recursive receipt in which the graph
hashes itself. The round-one machine JSON was approximately 4.7 MB; the
binding, asset-expression, lifecycle, and ratchet ledgers bring this snapshot
to approximately 4.85 MB. That size is accepted because the tranche requires a
committed, exact every-node/every-edge snapshot, and the preserved v1/v2
machine receipts establish the same audit pattern.

The machine-readable graph contains every node, edge, defect ledger, package
relation, public symbol, file SCC, and owner SCC. Pass 1 and v2 remain separate
historical artifacts and are not rewritten by this generator.
