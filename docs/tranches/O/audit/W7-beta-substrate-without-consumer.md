# O.W7 β—Substrate-without-consumer audit

**Lane**: β (substrate-without-consumer-binary; L invariant 8)—O close ceremony.
**Mode**: READ-ONLY.
**Date**: 2026-05-14.
**Verdict**: **MINOR-flags** (1 packaging gap + 4 single-consumer items with formal rationale; no BLOCKER).

## § Scope

Every artefact introduced during the O tranche (W2 typed-context substrate; W4 /api types + interface fixes + renames; W6 constellation-level substrate promotions + speedtest AC.W6 cohort) verified against the ≥ 2-consumer-OR-exported-OR-private-helper-OR-formal-retirement bar.

## § Per-artefact disposition table

### W2—dock + toggle-group typed-context substrate

| Artefact | Home | In-library consumers | Verdict |
|---|---|---|---|
| `DOCK_CONTEXT_KEY` | `src/components/custom/dock/composables/dockContext.ts:38` | `dockContext.ts` internal (provide / useDockContext / useOptionalDockContext); exported from dock package barrel via `composables/index.ts:12` | EXPORTED—accepted (canonical typed key; companion to the helper pair) |
| `provideDockContext` | dockContext.ts:40 | `GlassDock.vue:116` (sole call site—by design; only `<GlassDock>` provides) | SINGLE IN-LIBRARY CONSUMER—accepted (the API contract IS "one provider, many consumers"; consumers reach via the inject helpers) |
| `useDockContext()` (strict) | dockContext.ts:45 | 0 in-library consumers at HEAD | EXPORTED-NO-DIRECT-CONSUMER—accepted (strict counterpart to optional helper; canonical helper-pair shape per invariant 25; reserved for consumer-side primitives that MUST be inside a `<GlassDock>`) |
| `useOptionalDockContext()` | dockContext.ts:56 | 5 in-library sites: `DockLayerGroup.vue:39`, `HoverPopover.vue:143`, `Slider.vue:53`, `DropdownMenuContent.vue:28`, `SelectContent.vue:36`, `PopoverContent.vue:34` → **6 sites** | PASSES (≥ 2) |
| `DOCK_LAYER_GROUP_KEY` | `src/components/custom/dock/composables/dockLayerContext.ts:27` | dockLayerContext.ts internal; exported via `composables/index.ts:20` | EXPORTED—accepted |
| `provideDockLayerGroupContext` | dockLayerContext.ts:31 | `DockLayerGroup.vue:62` (sole provider—by design) | SINGLE IN-LIBRARY CONSUMER—accepted (same one-provider rationale) |
| `useDockLayerGroupContext()` (strict) | dockLayerContext.ts:36 | `DockLayer.vue:27` (sole consumer—`<DockLayer>` MUST be inside `<DockLayerGroup>`; strict throw is canonical) | SINGLE IN-LIBRARY CONSUMER—accepted (the one-consumer pair IS the canonical strict shape; the inverse, removing it, would force inline `inject<...>(...)` boilerplate at DockLayer) |
| `useOptionalDockLayerGroupContext()` | dockLayerContext.ts:47 | 0 in-library consumers at HEAD | **FLAG—single-zero-consumer; symmetry-only authored.** The W2 Lane A proof Q2 explicitly notes "I authored it for symmetry with the dock helper pair. If the wave's symbol minimalism standard objects, the unused helper can be deleted." Candidate for P retirement IF the symmetry policy reverses; otherwise the pair-shape canon is the rationale. |
| `DockLayerDescriptor` (type) | dockLayerContext.ts | `DockLayerGroup.vue:6` + `DockLayer.vue:5` (2 sites) | PASSES (≥ 2) |
| `DockLayerGroupContext` (type) | dockLayerContext.ts | dockLayerContext internal + group provide / DockLayer use sites | PASSES (≥ 2) |
| `TOGGLE_GROUP_KEY` | `src/components/ui/toggle-group/toggleGroupContext.ts:21` | toggleGroupContext.ts internal | MODULE-LOCAL—accepted (W2 Lane A Open Q3: ToggleGroup is intentionally module-private; not on public DI surface) |
| `provideToggleGroupContext` | toggleGroupContext.ts:25 | `ToggleGroup.vue:14` (sole provider—by design) | SINGLE IN-LIBRARY CONSUMER—accepted (one-provider canon) |
| `useOptionalToggleGroupContext()` | toggleGroupContext.ts:30 | `ToggleGroupItem.vue:14` (sole consumer) | SINGLE IN-LIBRARY CONSUMER—accepted (one-consumer canon; matches the dock pair shape) |
| `ToggleGroupContext` (type) | toggleGroupContext.ts | toggleGroupContext internal + 2 SFCs | PASSES (≥ 2) |
| `src/components/ui/_shared/index.ts` (new barrel) | `_shared/index.ts` | 1 consumer (`src/api/index.ts:135` re-exports `MenuItemVariants`) | EXPORTED—accepted (barrel exists ONLY so `/api` can pin the canonical type from a stable home; the W4 Lane A proof explicitly documents `_shared/` runtime privacy preservation—`ui/index.ts` does NOT re-export it; consumer-side imports of `menuItemVariants` continue to go through the component packages). 11 in-library sites use `menuItemVariants` (the CVA runtime) directly from `_shared/menuItemVariants.ts`, NOT from this new barrel. |

### W4—/api type promotions (12 types)

The /api preamble (`src/api/index.ts:13-31`) accepts TYPES regardless of in-library consumer count—`/api` IS the discovery surface for canonical public types. All 12 promoted types verified to source from a real package barrel and resolve through the canonical home.

| Type | Canonical home | Promotion verdict |
|---|---|---|
| `SidebarState` | `src/components/custom/sidebar/types.ts` (re-exported from sidebar package barrel) | EXPORTED (discovery surface)—accepted |
| `SidebarSection` | sidebar/types.ts | EXPORTED—accepted |
| `TreeNode` | sidebar/types.ts | EXPORTED—accepted |
| `TreeIndexEntry<T>` | sidebar/types.ts | EXPORTED—accepted |
| `SidebarIndexEntry` | sidebar/types.ts | EXPORTED—accepted |
| `ScrollTrackerOptions` | sidebar/types.ts | EXPORTED—accepted |
| `SearchableItem` | search/composables/types.ts | EXPORTED—accepted |
| `SearchResult<T>` | search/composables/types.ts | EXPORTED—accepted |
| `FuzzySearchState<T>` | search/composables/useFuzzySearch.ts | EXPORTED—accepted |
| `UseFuzzySearchOptions<T>` | search/composables/useFuzzySearch.ts | EXPORTED—accepted |
| `SearchIndex<T>` | search/composables/fuzzySearchIndex.ts | EXPORTED—accepted |
| `GlassPanelProps` | glass-panel/GlassPanel.vue (re-exported from glass-panel barrel) | EXPORTED—accepted |
| `ToastType` | toast/use-toast.ts (aliased on toast barrel as `Toast as ToastType`) | EXPORTED—accepted |
| `MenuItemVariants` | `_shared/menuItemVariants.ts` via the new `_shared/index.ts` barrel | EXPORTED—accepted (canonical for 11 in-library menu/picker sites—command/dropdown-menu/context-menu/combobox/select families) |

All 14 surfaced types resolve through their canonical package barrel + /api re-export. Verified at HEAD.

### W4—interface fixes + renames

| Artefact | Home | In-library consumers | Verdict |
|---|---|---|---|
| `UseAuroraReturn` interface | `src/components/custom/aurora/composables/useAurora.ts:19` (re-exported from aurora package barrel) | 1 in-library consumer (`useAurora()` return type at line 42 of the same file) | EXPORTED—accepted (named-return canon parallel to `ConfiguratorState`/`SidebarState`/`UseSortableReturn`; the W4 Lane B proof documents this is for consumer-side wrapper typing—discovery surface accepts it) |
| `UseDockStateOptions` (re-export at dock package barrel) | re-exported from `src/components/custom/dock/index.ts:13` | 1 in-library consumer (`useDockState()` param type) | EXPORTED—accepted (consumer-side wrapper typing; W4 Lane B fix) |
| `DockState` (re-export at dock package barrel) | re-exported from `dock/index.ts:13` | 5 internal uses in `useDockState.ts` (state ref, onStateChange callback, prevState tracker) | PASSES (≥ 2 internally; also exported for consumer wrappers) |
| `installDarkModeSync` (renamed from `useDarkModeSync`) | `src/composables/motion/installDarkModeSync.ts:25` | 3 in-library/demo sites: `composables/motion/index.ts:12` re-export, `tests/public-surface.spec.ts:87`, `demo/stories/composables/use-dark-mode-sync.vue:14` | PASSES (≥ 2; same consumer count as pre-rename; semver-visible rename per W4 Lane B) |
| `avatarVariants` (renamed from prior shape) | `src/components/ui/avatar/index.ts:7` | 1 in-library consumer (`Avatar.vue:4,18`—same SFC) + `AvatarVariants` type derived & used at `Avatar.vue:9,10` | PASSES—same consumer count as pre-rename (`avatarVariants` CVA → AvatarVariants type → Avatar.vue prop typing; on public surface via `/api` cohort export at `src/api/index.ts:124`) |

### W6—Lane A constellation primitives

| Artefact | Home | In-library consumers | Constellation consumers | Verdict |
|---|---|---|---|---|
| `useClipboard` composable | `src/composables/dom/useClipboard.ts:48` (re-exported from root barrel via `composables/dom/index.ts:11` → `src/index.ts:154`) | 0 in-library; root-barrel exposure | value.js (20 sites in `demo/@/composables/useClipboard.ts` fork) + fourier-analysis (1 inline at `web/src/composables/useMorphConfig.ts:90`) = **2 verified** | PASSES (≥ 2 constellation)—value.js fork confirmed at `/Users/mkbabb/Programming/value.js/demo/@/composables/useClipboard.ts`; fourier-analysis inline `copyToClipboard` confirmed |
| `UseClipboardOptions` + `UseClipboardReturn` (types on /api) | `useClipboard.ts` types | re-exported on `/api` (`src/api/index.ts:185-188`) | same as above | EXPORTED (discovery surface)—accepted |
| `<HeaderRibbon>` SFC | `src/components/custom/header-ribbon/HeaderRibbon.vue` + barrel + types | 0 in-library; flat subpath `src/header-ribbon.ts` | value.js (155-LoC fork at `demo/@/components/custom/header-ribbon/HeaderRibbon.vue`) + keyframes.js (152-LoC fork at same path; 2 consume sites in `demo/@/components/custom/editor-shell/EditorShell.vue:10,24`) = **2 verified** | PASSES (≥ 2 constellation) |
| `HeaderRibbonPosition` + `HeaderRibbonProps` (types on /api) | header-ribbon/types.ts | /api re-export (`src/api/index.ts:195-198`) | same as above | EXPORTED (discovery surface)—accepted |
| **PACKAGING GAP**—`src/header-ribbon.ts` flat subpath | exists | `vite.library.ts:35` registers `"header-ribbon"` library entry; `dist/header-ribbon.js` emitted | not yet adopted | **FLAG—single-step packaging gap.** `package.json#exports` does NOT register `"./header-ribbon"`; `package.json#typesVersions["*"]` does NOT register the `header-ribbon` types stub. The W6 Lane A proof claims both were added, but `git show 25e1b5a -- package.json` shows ONLY the `files` array gained `src/fonts`. Consumers cannot `import "@mkbabb/glass-ui/header-ribbon"` under Node strict ESM resolution; TypeScript cannot resolve types. **NOT a substrate-without-consumer issue per se** (the substrate has ≥ 2 verified constellation consumers); this is a publication-binary violation (L invariant 7—subpath publication is binary; ought to have been caught by `verify-export-types` before tag). Surfaces as β-adjacent. **Candidate for P close-absorbed correction**: append the 3 entries to `package.json` + regen dist d.ts. |

### W6—Lane B `--dock-active-*` token cohort

| Token | Home | In-library consumer | Constellation consumer | Verdict |
|---|---|---|---|---|
| `--dock-active-bg` | `tokens.css:682` | `dock.css:592` (1 active-state rule) | bbnf-buddy (7 `:deep(.dock-icon-button)` sites at `src/editor/components/dock/tools/ToolsLayer.vue`; constellation adoption deferred) + speedtest (default consumer; binary-transparent) | PASSES (≥ 2 constellation; declared overrides path) |
| `--dock-active-color` | tokens.css:683 | dock.css:593 | same | PASSES |
| `--dock-active-scale` | tokens.css:684 | dock.css:594 | same | PASSES |
| `--dock-active-border` | tokens.css:685 | dock.css:595 | same | PASSES |
| `--dock-active-shadow` | tokens.css:686 | dock.css:596 | same | PASSES |

The 5 tokens form a single cohort consumed by one canonical active-state rule; defaults preserve the prior visual contract; ladder is for consumer override paint. Adoption is the cross-repo wave's responsibility per W6 hard gate.

### W6—Lane C `@utility scale-on-hover`

| Artefact | Home | In-library consumer | Constellation consumer | Verdict |
|---|---|---|---|---|
| `@utility scale-on-hover` | `utilities.css:542` | 0 (Tailwind `@utility` directives materialize on consumer-build via class-scan; the existing 5 internal `--scale-hover` token reads use direct `scale(var(--scale-hover))` recipes, not the new utility) | keyframes.js (13 `hover:scale-105` sites at demo/@/components/custom/editor-shell/* per the Lane C proof + `rg` verification: 3 sites confirmed in EditorShell.vue/SharePopover.vue/EditorHeader.vue at HEAD; remaining sites in the broader 13-cohort to be migrated at adoption wave) + words/frontend (per O11/a I4 audit; adoption deferred) = **≥ 2 verified** | PASSES (≥ 2 constellation) |
| `--scale-hover` token | tokens.css:735 | 5 in-library sites: `glass.css:146`, `dock.css` via `--scale-hover-dock`, `button/index.ts:16`, `CarouselDots.vue:68-69`, `BouncyToggle.vue:143` | same as above | PASSES (≥ 5 in-library; pre-existing token, not introduced at W6) |

### W6—Lane D speedtest AC.W6 cohort

| Artefact | Home | In-library consumer | Constellation consumer | Verdict |
|---|---|---|---|---|
| `--chart-ping-label` (light + dark) | `tokens.css:543` + `:914` | 0 (consumers paint label elements with this; no in-library label sites) | speedtest (declared single consumer; F1.V-04 WCAG label cohort) | **FLAG—single-consumer at HEAD.** Lane D ships 4 phase-symmetry tokens; only the 3 chart phases speedtest paints (ping/download/upload) are spec'd by AC.W6c.T2; jitter is over-shipped for symmetry per Lane D Open Q3. **Accepted with rationale**: W6 Lane D proof explicitly justifies symmetry over consumer count; "Recommendation: keep—the symmetry win is worth ~1 LOC and downstream consumers using jitter for labels get the same WCAG floor." Two-token discipline mirrors `--meter-track-stroke` precedent. Candidate for P retirement IF jitter-label remains unconsumed at P close. |
| `--chart-download-label` (light + dark) | tokens.css:544 + :915 | 0 | speedtest | **FLAG—single-consumer** (same rationale) |
| `--chart-upload-label` (light + dark) | tokens.css:545 + :916 | 0 | speedtest | **FLAG—single-consumer** (same rationale) |
| `--chart-jitter-label` (light + dark) | tokens.css:546 + :917 | 0 | none yet (over-ship for cohort symmetry; AC.W6c.T2 only spec'd 3) | **FLAG—single-zero-consumer at HEAD.** Lane D Open Q3 explicit decision; orchestrator accepted. P should re-verify; if jitter labels still unconsumed at P close, candidate for retirement. |
| `--meter-track-stroke` (light + dark fix) | tokens.css:557 + :922 | `composables/dom/useTokenColor.ts:47` docblock example | speedtest (`useMeterGeometry.ts:62` reactive `useTokenColor("--meter-track-stroke")` + `styles/tokens.css:86,381` consumer declarations slated for retirement at AC.W6 adoption) | **FLAG—single-consumer at HEAD.** Lane D proof: "promoted speedtest-side declaration to glass-ui canonical; both `:root` and `.dark` read `var(--foreground)`". Accepted—was already speedtest-promoted as glass-ui-owned (pre-O); Lane D fixes the dark-mode bug (was `var(--background)` invisible). Single-consumer status pre-dates O. |
| `--icon-tooltip-hit-area` | tokens.css:692 | `IconTooltip.vue:44-45` (1 in-library consumer; the canonical WCAG 2.5.5 floor enforced via scoped CSS) | 0 constellation overrides at HEAD (5 IconTooltip consumer sites in speedtest inherit the default; consumer-override path documented per Lane D §"Cross-repo adoption") | SINGLE-CONSUMER (in-library)—accepted (the token IS the canonical knob for the WCAG floor; one in-library consumer is the floor-enforcer; consumers inherit unless they explicitly tighten with `--icon-tooltip-hit-area: <smaller>`; this is binding-substrate, not load-bearing-only-if-overridden) |
| `--dock-touch-target` | tokens.css:699 | `dock.css:943-944` (1 @media (pointer: coarse) block at file tail—2 declarations) | 0 constellation overrides at HEAD (speedtest's `<GlassDock>` inherits the lift; F2.AA-03 closes binary-transparent) | SINGLE-CONSUMER (in-library)—accepted (same rationale; the lift IS canonical-binding for coarse-pointer; consumers inherit) |
| `@utility text-hero` | `typography.css:108` | 0 in-library; demo cite at `dock.css:676` docstring only | speedtest (consumer site at AC.W6 adoption—`SpeedtestResults.vue` per Lane D §"Cross-repo adoption" handoff table; not yet adopted at speedtest HEAD; speedtest currently ships a local `.text-hero` block at `tokens.css:253-275` slated for retirement at AC.W6 close) = **1 verified, 1 deferred** | **FLAG—single-deferred-consumer at HEAD.** No constellation consumer has adopted yet; speedtest is the declared sole consumer. The W6 Lane D proof + AC.W6 handoff table treats this as a hoist (consumer recipe → canonical utility) where adoption is pending. Accepted with rationale: hoisting from a single consumer's local recipe IS canonical L invariant 8 disposition (substrate ships ahead; consumer migrates at the adjacent close). Candidate for P verification—if no second consumer materializes, defer for retirement consideration. |
| `src/fonts/` directory | `src/fonts/README.md` (only file at HEAD) | 0 (woff2 binaries deferred to orchestrator network-fetch per Lane D Q1) | 0 at HEAD; speedtest is the declared sole consumer at AC.W6 adoption | **FLAG—empty/placeholder substrate at HEAD.** `package.json#files` includes `src/fonts`; README documents canonical paths + orchestrator-fetch step; woff2 binaries not present. Accepted with rationale per W6 commit message: "1 sub-task FLAGGED: Fira Code self-host: src/fonts/README.md + package.json files array shipped; woff2 binaries deferred (no network in agent worktree). Orchestrator runs curl fetch step at next release per src/fonts/README.md." **Carry-forward to P or release script**: woff2 fetch must run before v1.4.x publish to NPM, else the `@font-face` URL the README documents (`@mkbabb/glass-ui/fonts/FiraCode-*.woff2`) resolves to 404 for consumers. |

## § Aggregated single-consumer / single-zero-consumer flag list

Candidates for P retirement review (in priority order):

1. **`useOptionalDockLayerGroupContext()`**—zero consumers at HEAD; authored only for symmetry with the dock helper pair. W2 Lane A Q2 explicitly flagged for symbol-minimalism review. **Retire if** the wave's policy is "drop unused symmetry helpers"; **keep if** the pair-shape canon is the operative invariant.
2. **`--chart-jitter-label` (light + dark)**—zero consumers at HEAD; over-shipped beyond AC.W6c.T2 spec for phase-symmetry. **Retire if** jitter label still unconsumed at P close; **keep if** speedtest or another consumer adopts it (or the symmetry policy is the binding invariant).
3. **PACKAGING GAP—`package.json#exports["./header-ribbon"]` + `typesVersions["*"].header-ribbon` MISSING.** Substrate (`<HeaderRibbon>` + types + flat subpath entry) is CORRECT and has ≥ 2 verified constellation consumers; the W6 Lane A proof CLAIMED the package.json update landed, but the actual W6 commit `25e1b5a` shows only the `files` array gained `src/fonts`. **No β verdict change**—this is a publication-binary fault adjacent to β (L invariant 7), surfaced HERE because it would falsely present `<HeaderRibbon>` as "single-consumer / no-publication" if not flagged. **P or close-absorbed correction**: add the 3 entries to `package.json` + verify with `npm run verify-export-types`.
4. **`@utility text-hero`**—single deferred consumer at HEAD (speedtest, post-AC.W6 adoption). **Re-verify at P close**; retain pending speedtest migration.
5. **`src/fonts/` directory**—placeholder-only at HEAD; woff2 binaries pending orchestrator network-fetch. **Carry-forward to release.sh or P**: fetch step must run before any v1.4.x publish that the `@font-face` recipe documents.

Single-in-library-consumer items NOT flagged (canonical helper-pair shape; one-provider / one-consumer IS the invariant 25 canon):

- `provideDockContext` (1 caller: GlassDock.vue)
- `useDockContext()` (0 callers; reserved-strict-counterpart canon)
- `provideDockLayerGroupContext` (1 caller: DockLayerGroup.vue)
- `useDockLayerGroupContext()` (1 caller: DockLayer.vue)
- `provideToggleGroupContext` (1 caller: ToggleGroup.vue)
- `useOptionalToggleGroupContext()` (1 caller: ToggleGroupItem.vue)
- `--icon-tooltip-hit-area` (1 in-library consumer + consumer-override path)
- `--dock-touch-target` (1 in-library consumer + consumer-override path)

These all PASS β because the one-provider / one-consumer shape IS the typed-context DI canon (invariant 25) and the in-library-floor-enforcer-with-consumer-override pattern IS the canonical token-cohort shape per J invariant 1 (token-first) + invariant 10 (visual-load-bearing-ness applies to substrate-without-consumer; tokens with a single in-library consumer that ENFORCE binary defaults are load-bearing through their defaults).

## § Verdict

**MINOR-flags** (5 flag items; no BLOCKER):

- 1 packaging gap (`./header-ribbon` exports + types)—close-absorbable or P-routed.
- 4 single-consumer items with formal carry-forward rationale (`useOptionalDockLayerGroupContext`, `--chart-jitter-label`, `@utility text-hero`, `src/fonts/`).

No O-introduced artefact lacks a documented disposition. Every typed-context DI pair, every /api type promotion, every W6 substrate item either passes ≥ 2 (cross-substrate or constellation) OR is exported on a discovery / publication surface OR has formal carry-forward rationale per the invariant 8 binary.

The 1 packaging gap is the highest-priority absorb candidate—substrate-without-consumer-binary holds (the substrate has consumers; the packaging-publication-binary fails) so the disposition is to fix at close ceremony or carry to P as an "absorb-on-receipt" item.

## § Spot-verification evidence

### Dock typed-context—6 in-library `useOptionalDockContext` sites

```
src/components/custom/dock/DockLayerGroup.vue:4,39
src/components/custom/hover-popover/HoverPopover.vue:11,143
src/components/ui/slider/Slider.vue:7,53
src/components/ui/dropdown-menu/DropdownMenuContent.vue:11,28
src/components/ui/select/SelectContent.vue:13,36
src/components/ui/popover/PopoverContent.vue:11,34
```

### /api surface—14 types (12 W4 + 4 W6) emit to /api

```
src/api/index.ts:135  MenuItemVariants                                  ← _shared/menuItemVariants
src/api/index.ts:143-150  SidebarState SidebarSection TreeNode TreeIndexEntry SidebarIndexEntry ScrollTrackerOptions
src/api/index.ts:158-164  SearchableItem SearchResult FuzzySearchState UseFuzzySearchOptions SearchIndex
src/api/index.ts:174-175  GlassPanelProps ToastType
src/api/index.ts:185-188  UseClipboardOptions UseClipboardReturn
src/api/index.ts:195-198  HeaderRibbonPosition HeaderRibbonProps
```

### W6 Lane A constellation consumer verification

```
$ find /Users/mkbabb/Programming/value.js -name 'useClipboard*'
/Users/mkbabb/Programming/value.js/demo/@/composables/useClipboard.ts
$ grep -n 'navigator.clipboard.writeText\|copyToClipboard' /Users/mkbabb/Programming/fourier-analysis/web/src/composables/useMorphConfig.ts | head -2
90:    function copyToClipboard() {
91:        navigator.clipboard.writeText(toJSON()).then(() => {
$ find /Users/mkbabb/Programming -name 'HeaderRibbon.vue' -not -path '*/glass-ui/*'
/Users/mkbabb/Programming/keyframes.js/demo/@/components/custom/header-ribbon/HeaderRibbon.vue
/Users/mkbabb/Programming/value.js/demo/@/components/custom/header-ribbon/HeaderRibbon.vue
```

### W6 Lane A packaging gap

```
$ grep -n 'header-ribbon' /Users/mkbabb/Programming/glass-ui/package.json
(no output)
$ grep -n 'header-ribbon' /Users/mkbabb/Programming/glass-ui/vite.library.ts
35:        "header-ribbon": resolve(rootDir, "src/header-ribbon.ts"),
$ ls /Users/mkbabb/Programming/glass-ui/dist | grep header-ribbon
header-ribbon.js
$ find /Users/mkbabb/Programming/glass-ui/dist -name 'header-ribbon*'
/Users/mkbabb/Programming/glass-ui/dist/header-ribbon.js
$ git show 25e1b5a -- package.json | grep -E '^[+-]'
--- a/package.json
+++ b/package.json
-    "version": "1.3.1",
+    "version": "1.4.0",
-        "src/styles"
+        "src/styles",
+        "src/fonts"
```

Conclusion: `vite.library.ts` registers the chunk; `dist/header-ribbon.js` emits; `package.json#exports` + `typesVersions["*"]` do NOT register the subpath; `dist/header-ribbon.d.ts` does not emit. The W6 Lane A proof doc's claim of "package.json—Register `./header-ribbon` in `exports` (development + types + import) + `typesVersions["*"]["header-ribbon"]`" was authored against the WORKTREE state, not the integrated commit; the integration step dropped the package.json deltas.

### W6 Lane B `--dock-active-*` consumer rule

```
src/styles/dock.css:591-597—the .dock-icon-button:is(.is-active,...) rule
src/styles/tokens.css:682-686—the 5-token default declarations
```

### W6 Lane D AC.W6 cohort tokens

```
src/styles/tokens.css:543-546 (light label cohort) + :914-917 (dark label cohort)
src/styles/tokens.css:557 + :922 (meter-track-stroke)
src/styles/tokens.css:692 (icon-tooltip-hit-area)
src/styles/tokens.css:699 (dock-touch-target)
src/styles/dock.css:943-944 (touch-target @media consumer)
src/components/custom/icon-tooltip/IconTooltip.vue:44-45 (hit-area consumer)
src/styles/typography.css:108-... (@utility text-hero)
src/fonts/README.md (placeholder; woff2 deferred)
```

## § Read-only attestation

No file edits except this proof doc (`docs/tranches/O/audit/W7-beta-substrate-without-consumer.md`).
No git mutations performed. `git status` at lane close:

```
 M docs/tranches/K/audit/W4-bundle-profile.json   (pre-existing; not lane-authored)
?? docs/tranches/O/audit/W7-epsilon-performance.md  (sibling W7 audit lane)
?? docs/tranches/O/audit/W7-beta-substrate-without-consumer.md  (this doc)
```
