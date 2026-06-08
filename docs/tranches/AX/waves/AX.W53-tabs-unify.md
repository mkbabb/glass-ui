# AX.W53 — tabs-unify: the unified `SegmentedTabs` — ONE component, a `variant` axis (segmented · pill · underline), ONE shared elastic indicator gliding + squishing on `--spring-snappy`

**Band** C · STRUCTURAL · **Severity** major (T1/T2/T3/T4 — "default tabs → the bouncy spring-slider; offer underline + pill; BouncyToggle replaced; drop the 'Bouncy' prefix + update ALL consumers; ResponsiveTabs subsumed; two tab story pages broken")
· **dependsOn** AX.W05 (the settled `--spring-snappy` CONTROL register + the collapsed press), AX.W18 (the storybook IA tree the merged story folds into)
· **Charter** AX convergence-2 CONVERGENCE-PLAN-2 NET-NEW row W53 (`docs/tranches/AX/audit/convergence2/CONVERGENCE-PLAN-2.md:11`)
· **Audit** `convergence2/A-tabs-unify.md` (the STRUCTURAL spec — the merge map, the consumer sweep, the ARIA-role-per-variant, the `/tabs` subpath collision), `convergence2/A-responsive-tabs.md` (T3 — ResponsiveTabs subsumed), `convergence2/R-tabs-segmented.md` (the squish-on-travel MECHANISM + the exact values), `convergence2/R-apple-liquid.md` §4 (the segmented idiom at altitude)

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact. The implementer session AUTHORED this doc AND implemented it (real code) in an isolated worktree. Per the AX cardinal precept (§0 / AX.W00): the wave does NOT close on a green headless gate — it closes on a LIVE chrome-devtools-mcp audit of the glide + squish (the orchestrator drives the live tuning; the implementer hands off exact magnitudes + checks in §HandOff). Per the hardened agent git clause (K W0): the implementer COMMITS to its worktree branch only; the orchestrator owns the main index.

> *Gloss.* The **indicator** is the single body the active tab tethers to — a filled pill on the `segmented`/`pill` variants, a hairline rule (`::before`) on `underline`. The **glide** is its `inset`/`transform` interpolation between tabs on `--spring-snappy`. The **travel-squish** is the new atom: a volume-preserving stretch along the travel axis (`scale: var(--stretch) calc(1 / var(--stretch))`) as it travels, released back to fit — the Material 3 ELASTIC / Apple Liquid-Glass "grow then shrink" register, capped LOW by `--tab-indicator-max-stretch` (default `1.08`).

---

## State (born-RED — the gate failed at HEAD)

Born-RED at `6050dc4` on four falsifiable witnesses, each inverted by the new `proof:tabs-unified` gate:

- **RED-1 — the FIVE-artefact fragmentation (parse-falsifiable).** The tabs surface was FIVE artefacts for ONE concept: `BouncyToggle.vue` (the 475-line engine — segmented spring-slider, single+multi-select, `variant: default|pill`, the overflow axis), `BouncyTabs.vue` (a 44-line single-select shim over it), `UnderlineTabs.vue` (a SEPARATE 119-line component with its own anchor `::before` rule — no shared engine), `useBouncySlider.ts` (the package-private JS-measure path), and the standalone `ResponsiveTabs.vue` (the matchMedia Select↔UnderlineTabs swap). The "Bouncy" prefix mis-signals PLAYFUL when the travel already reads `--spring-snappy` (the CONTROL register). **RED:** all five export; the prefix survives. **GREEN:** all five DELETED; `SegmentedTabs.vue` is the sole component; the barrel exports only `SegmentedTabs` + types.

- **RED-2 — `underline`/`responsive` are SEPARATE components, not axes (parse-falsifiable).** `UnderlineTabs` is a distinct component (no `variant="underline"` on the slider surface); `ResponsiveTabs` is a distinct component (responsive is not a prop). **RED:** two extra components + two extra subpaths (`/tabs` ships the custom trio; `/responsive-tabs` ships the swap). **GREEN:** a three-value `variant` axis (`segmented` DEFAULT · `pill` · `underline`) + a `responsive` prop fold both onto the one component; `/responsive-tabs` subpath retired.

- **RED-3 — the slider GLIDES but does NOT squish (source-confirmed).** The travel is a rigid `inset`/`transform` interpolation (`BouncyToggle.vue:361-375`, `useBouncySlider.ts:81-86`) — no `scaleX` overshoot, no two-edge out-of-step, no volume-preserving deform anywhere. There is NO `--tab-indicator-max-stretch` token. **RED:** the indicator is a sliding pill with the right register but the wrong SHAPE (it lacks the elastic squish the user names). **GREEN:** `--tab-indicator-max-stretch: 1.08` minted; `useTabIndicator` writes a distance-driven `--stretch` the indicator pairs reciprocally (volume-preserving) on `--spring-snappy`; PRM-gated.

- **RED-4 — the press double-spring rings (the egregious D3 carry).** `animatePress` (`BouncyToggle.vue:125-155`) is a `scale(1)→press→1.08→1` keyframe baked under `--spring-bouncy` at 200ms — it springs PAST the rest scale, rings, resettles (the "BouncyTabs egregious/abrupt" defect). **RED:** the press overshoots past rest on a playful register. **GREEN:** `animatePress` is ONE settle-into squish (`scale(1)→--scale-press-btn→scale(1)`) on the CONTROL register `--spring-snappy`; no overshoot-past-rest keyframe.

**Status** — IMPLEMENTED (this worktree). DEV-only from this session; committed to the worktree branch, NOT the main checkout.

---

## Goal

ONE `<SegmentedTabs>` component family (custom; distinct from reka `ui/tabs`) with a three-value `variant` axis (`segmented` DEFAULT · `pill` · `underline`) and ONE shared elastic indicator. The indicator GLIDES on `--spring-snappy` (the confirmed iOS segmented register — KEPT from the post-W05 shape) AND SQUISHES on travel (the new volume-preserving deform atom, capped LOW). The `BouncyToggle` engine is MERGED (single + multi-select preserved), the `BouncyTabs` shim + `UnderlineTabs` + `ResponsiveTabs` are SUBSUMED, the "Bouncy" prefix is DROPPED (clean break, no alias), and EVERY consumer is swept. The two tab story pages re-author coherently onto the unified surface.

---

## Scope (the gestalt unification — no shim, no alias, clean break)

1. **The unified `SegmentedTabs.vue` + the renamed `useTabIndicator` engine.** `BouncyToggle` is renamed `SegmentedTabs` (it IS the slider engine — owns the variant axis, the overflow axis, the multi-select path, the anchor/JS-fallback indicator); `BouncyTabs` (pure debris) is DELETED (collapses to `<SegmentedTabs :multi-select="false">`); `UnderlineTabs` is folded into `variant="underline"`; `useBouncySlider` → `useTabIndicator`. The types rename in lockstep: `ToggleOption`/`TabOption` → `SegmentedTabOption`; a new `SegmentedTabsVariant` union + `SegmentedTabsProps` + `SegmentedTabsResponsive`.

2. **The `variant` axis (T1).** `variant="segmented"` (DEFAULT — the pill-slider over a muted track), `variant="pill"` (the solid `--foreground` pill), `variant="underline"` (the panel-nav hairline rule). The indicator-morph is ONE animation grammar across all three; only the chrome (filled pill vs. hairline rule) differs (a CSS-variant concern, not three components).

3. **The shared elastic indicator on `--spring-snappy` + the squish-on-travel atom (T1, R-tabs-segmented §3-5).** The glide rides `--spring-snappy` (CONTROL, KEPT). The new squish: `useTabIndicator.squishOnTravel(idx)` writes a `--stretch` scalar (`1 + frac · (cap − 1)`, where `frac` is the travel distance / container width and `cap = --tab-indicator-max-stretch`) on selection, the indicator pairs it reciprocally (`scale: var(--stretch) calc(1 / var(--stretch))` — volume-preserving X/Y), and releases back to `1` on the same snappy clock (the Material "grow then shrink"). Capped LOW (`1.08`, ≤1.10 — the iOS-26.2-dialed-down restraint). PRM-gated (`squishOnTravel` early-returns under reduce; the indicator's `transition: scale` sits under `@media (prefers-reduced-motion: no-preference)`).

4. **ARIA-role-per-variant (load-bearing — A-tabs-unify §2).** `underline` is panel-nav (`role="tablist"` on the root + `role="tab"` + `aria-selected` on the buttons); `segmented`/`pill` are the ToggleGroup-shaped surface (`role="group"` + `aria-pressed`). The unified component switches the role on the `variant` axis — it does NOT collapse to one role.

5. **Multi-select + responsive folded onto the one component (T3).** `multiSelect?: boolean` (segmented/pill only — underline is panel-nav single-select) keeps the N-simultaneous-indicator ToggleGroup surface. `responsive?: boolean | { breakpoint?; desktopOptions?; ariaLabel?; triggerClass? }` collapses the strip to a `<Select>` below the breakpoint (the EXACT matchMedia logic lifted from `ResponsiveTabs` — the mql listener, the `effectiveDesktopValue` missing-tab fallback, the `mobileAriaLabel`). `ResponsiveTabs` + its `/responsive-tabs` subpath + its `api` re-export are DELETED.

6. **The "Bouncy" prefix drop + the consumer sweep (T2).** Drop "Bouncy" everywhere. Sweep ALL consumers: `demo/stories/navigation/tabs.vue` (re-authored), `demo/stories/aurora/{AuroraConfigDock, config/MediumLayer, config/FlowLayer, config/CompositionLayer}.vue` (`BouncyTabs` → `SegmentedTabs`), `src/api/index.ts` (type re-export), `src/components/ui/tabs/TabsList.vue` + `custom/configurator/ConfiguratorLayer.vue` + `src/utils/moveBefore.ts` (comment re-syncs), the proof scripts (`proof-package.mjs`, `proof-composable-return-types.mjs`, `proof-vt-names.mjs`, `proof-storybook-ia.mjs`).

7. **The two broken stories re-authored (T4).** `navigation/tabs.vue` re-authored against `SegmentedTabs` (5 sections: segmented default, pill, underline, multi-select, responsive); `navigation/responsive-tabs.vue` DELETED (folded into the tabs story's responsive section); the manifest row removed (the prune-row contract — the row-delete lands WITH the src-delete).

### KEEP — the load-bearing pieces (do NOT regress)

- The CSS anchor-positioned indicator (`position-anchor: --gl-tab-active` + `inset: anchor(...)`) on the supporting engine — the zero-measure-JS glide; the JS-measure fallback (`useTabIndicator`) for the multi-select + non-anchor branches.
- The `--bouncy-track-trim` token (the W20 magic-number lock — the track padding, the indicator `inset-block`, AND the `anchor()` offset all read it so they cannot drift).
- The overflow axis (`none`/`scroll`/`auto`) + the `.scroll-fade-mask` edge fades + the scroll-active-into-view.
- The reka `ui/tabs` family (panel-nav `Tabs`/`TabsList`/`TabsTrigger`) — UNTOUCHED; it stays the root-barrel panel-nav primitive. `SegmentedTabs` coexists on the `/tabs` subpath (the §5 subpath-collision resolution: the custom slider keeps the distinct `SegmentedTabs` name, reka `Tabs` stays the panel primitive — no symbol collision).

### Symbol-naming resolution (the A-tabs-unify §5/§7.1 RATIFY)

The unified custom component is named **`SegmentedTabs`** (NOT `Tabs`) — reka's `Tabs` stays the root-barrel panel-nav primitive, so the two cannot collide. `import { Tabs } from "@mkbabb/glass-ui"` = reka panel-nav; `import { SegmentedTabs } from "@mkbabb/glass-ui/tabs"` = the unified spring-slider. This is the clean-break public-surface decision (option (b) of the audit's two — distinct name, no ambiguity, no alias).

---

## FileBounds (the EXACT files this wave touched)

| File | Edit |
|------|------|
| `src/components/custom/tabs/SegmentedTabs.vue` | **NEW** — the unified component (variant axis, multi-select, responsive, the squish-on-travel wiring, ARIA-role-per-variant, the scoped CSS for all three variants). |
| `src/components/custom/tabs/composables/useTabIndicator.ts` | **NEW** — the renamed engine (the JS-measure single/multi slider path) + the `squishOnTravel` travel-squish writer. |
| `src/components/custom/tabs/index.ts` | RE-AUTHOR — exports `SegmentedTabs` + `SegmentedTabOption`/`SegmentedTabsVariant`/`SegmentedTabsProps`/`SegmentedTabsResponsive`. |
| `src/components/custom/tabs/{BouncyToggle,BouncyTabs,UnderlineTabs}.vue` + `composables/useBouncySlider.ts` | **DELETE.** |
| `src/components/custom/responsive-tabs/` + `src/subpaths/responsive-tabs.ts` | **DELETE dir + subpath barrel.** |
| `src/styles/tokens.css` | ADD `--tab-indicator-max-stretch: 1.08` (§11); comment re-syncs (the muted-rung + touch-target consumer lists). |
| `src/styles/utilities.css` | RENAME the `.responsive-tabs__trigger` coarse-pointer touch-floor hook → `.segmented-tabs__trigger`. |
| `src/api/index.ts` | RE-EXPORT `SegmentedTabsProps`/`SegmentedTabsVariant`/`SegmentedTabOption`; DROP `ResponsiveTabsProps`. |
| `src/index.ts`, `src/components/ui/tabs/TabsList.vue`, `src/components/custom/configurator/ConfiguratorLayer.vue`, `src/utils/moveBefore.ts` | Comment re-syncs. |
| `package.json` | RETIRE the `./responsive-tabs` export + its `typesVersions` row; REGISTER `proof:tabs-unified`. |
| `demo/stories/navigation/tabs.vue` | RE-AUTHOR onto `SegmentedTabs` (5 sections). |
| `demo/stories/navigation/responsive-tabs.vue` | **DELETE** (folded into tabs). |
| `demo/stories/manifest.ts` | Remove the `responsive-tabs` row; re-sync the `tabs` blurb. |
| `demo/stories/aurora/{AuroraConfigDock, config/MediumLayer, config/FlowLayer, config/CompositionLayer}.vue` | `BouncyTabs` → `SegmentedTabs` sweep (+ the single-select setter signatures widen to the model union). |
| `demo/stories/data/search.vue` | Search-keyword re-sync. |
| `scripts/proof-tabs-unified.mjs` | **NEW** gate. |
| `scripts/{proof-package, proof-composable-return-types, proof-vt-names, proof-storybook-ia}.mjs` + `scripts/__tests__/proof-vt-names.test.ts` | Symbol/path/allowlist/IA-row sweeps. |
| `scripts/gates.mjs` | Register the `proof:tabs-unified` manifest row. |
| `docs/tranches/AX/audit/W53-tabs-unified.json` | **NEW** — the born-RED→GREEN audit artefact. |
| `CLAUDE.md` | Structure tree (`tabs/` line + `responsive-tabs/` removal) + the Tabs-vs-ToggleGroup section + a new `### SegmentedTabs` contract section. |

**OUT of bounds:** the reka `ui/tabs` family (the panel-nav primitive — untouched); the `--spring-*` register tokens (W05 owns them — W53 CONSUMES `--spring-snappy`, mints no spring); the dock layer transitions (W01/W45); the carousel indicator (W23 — shares the squish PHYSICS but is a separate surface; the shared `useSquish` atom is the overfitting-bar flag, not minted here — W53 is its first consumer).

---

## Disjointness (sibling waves)

- **vs W05 (spring vocab) — CLEAN DEPENDENCY.** W05 owns the `--spring-snappy` register + the collapsed press SHAPE. W53 CONSUMES the settled register + lands the rename + the variant axis + the travel-squish. The travel-squish (indicator deform) is DISTINCT from the press-squish (button) W05 owns. dependsOn W05.
- **vs W18 (storybook IA) — coupled, single-writer.** W18 owns the `manifest.ts` tree. W53 deletes the `responsive-tabs` row WITH its src delete (the prune-row contract) + folds the story. The `proof:storybook-ia` IA fixture's `responsive-tabs` entry is removed in lockstep.
- **vs W23 (carousel) — W53 is a CONSUMER, not the substrate.** The shared volume-preserving scaleX squish atom (tab-indicator + carousel-indicator + dock-press) is the overfitting-bar flag for a future `useSquish`/`--*-max-stretch` family. W53 is its first consumer; it does NOT double-mint.
- **vs W38 (aurora config restyle) — coordinate the consumer sweep.** W38 may later re-author the 8 aurora `SegmentedTabs` enum-pickers onto `LabeledSelect` (those sites VANISH). W53's sweep RENAMES them (the clean-break rename); W38 may later delete them — file-disjoint, no collision at this commit.

---

## HardGate (born-RED→GREEN + the MANDATORY live audit)

**`proof:tabs-unified` (NEW; device-free SOURCE arm + a fail-CLOSED π LIVE arm).**

The device-free SOURCE arm (always gates): ONE Tabs family (`SegmentedTabs.vue` present; the four old artefacts + the `responsive-tabs/` dir + the `/responsive-tabs` subpath all DELETED); the three-value `variant` axis (default `segmented`); the indicator glides on `--spring-snappy` (NOT `--spring-bouncy`); the squish atom (`--tab-indicator-max-stretch` ≤ 1.10, the volume-preserving reciprocal `scale` pairing, the `useTabIndicator` `--stretch` writer, the PRM gate); the ARIA-role-per-variant contract; the multi-select + responsive props; the `api/index.ts` type re-sync; the deletion-proof grep (NO live `Bouncy*`/`UnderlineTabs`/`ResponsiveTabs` import/tag/export across src+demo — prose mentions that DESCRIBE the merge are allowed; comments are stripped before the scan).

The fail-CLOSED π LIVE arm: probes `localhost:5173/navigation/tabs` — the active `.segmented-indicator` MUST glide (its `getBoundingClientRect().left` deviates on a far-segment click) AND its `--stretch` MUST exceed `1` mid-travel (the squish). When the Playwright workspace IS present, a non-animating / unreachable indicator is a hard RED (never a false-green SKIP).

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the binding close; the orchestrator runs it via chrome-devtools-mcp).** See §HandOff for the exact magnitudes + checks. The wave does NOT close on the SOURCE gate alone — the executed live audit (captured as a paired-π artefact) is binding.

---

## Cadence (the sub-step order this session followed)

1. Reset to `6050dc4`; read the four convergence-2 files + the W52 template; mapped the five-artefact surface + the consumer grep.
2. Minted `--tab-indicator-max-stretch` (tokens.css). Wrote `useTabIndicator.ts` (renamed engine + `squishOnTravel`). Wrote `SegmentedTabs.vue` (variant axis + multi-select + responsive + squish wiring + ARIA-role-per-variant + the three-variant scoped CSS).
3. Deleted `BouncyToggle/BouncyTabs/UnderlineTabs.vue` + `useBouncySlider.ts` + `responsive-tabs/` + `subpaths/responsive-tabs.ts`. Re-authored the tabs barrel.
4. Swept ALL consumers (api/index.ts, the four aurora SFCs, the comment refs, the proof scripts, the IA fixture, the manifest, CLAUDE.md). Re-authored `navigation/tabs.vue`; deleted `responsive-tabs.vue`.
5. Authored `proof-tabs-unified.mjs` (born-RED→GREEN), registered it (package.json + gates.mjs). Confirmed it greens on the patched tree.
6. Self-gated: typecheck ✓, build ✓, proof:tabs-unified ✓, proof:gate-script-parity ✓, proof:theme ✓, proof:components-css ✓, + proof:vt-names / proof:composable-return-types / proof:package / proof:doc-consistency / proof:resolution / verify-export-types / proof:storybook-ia all ✓.

---

## HandOff (the orchestrator π live-tuning + verification — exact magnitudes)

**Live audit @ `localhost:5173/navigation/tabs` (light + dark), via chrome-devtools-mcp:**

1. **GLIDE** — click between two far segments on the DEFAULT segmented strip; `.segmented-indicator` must MOVE smoothly (its `getBoundingClientRect().left` deviates) on `--spring-snappy`, NOT crossfade.
2. **SQUISH** — `getComputedStyle(indicator).getPropertyValue('--stretch')` must EXCEED `1` mid-travel (peak ~`1.08` on a full-width jump, ~`1.0` on a neighbour hop) then RELEASE to `1`; the indicator visibly widens then settles to fit. **TUNE** `--tab-indicator-max-stretch` between `1.06`–`1.10` if the squish reads too strong/weak (iOS-26.2 is restrained — lower is safer).
3. **PRESS** — press-and-hold a segment: `animatePress` is ONE settle-into squish to `--scale-press-btn` (`0.97`) on `--spring-snappy`, NO ring-past-1 (the old `--spring-bouncy` `1.08` overshoot is GONE).
4. **VARIANTS** — confirm `pill` (solid `--foreground` pill) + `underline` (`role=tablist` hairline rule) both glide+squish; the underline `::before` reads `scale: var(--stretch) 1` (X-only width flex).
5. **ARIA** — `underline` emits `role=tablist`/`tab`+`aria-selected`; `segmented`/`pill` emit `role=group`+`aria-pressed` (axe-clean, no `aria-allowed-attr`/`aria-prohibited-attr` trip).
6. **RESPONSIVE** — narrow the viewport <640px on the responsive section: the strip collapses to a `<Select>`; widen restores the strip; one v-model drives both.
7. **MULTI-SELECT** — the multi-select section flips N segments independently (no glide between, each indicator pops in/out).

**Exact magnitudes:** `--tab-indicator-max-stretch: 1.08`; `--spring-snappy` (the CONTROL glide+squish register); `--scale-press-btn: 0.97` (the press); `--duration-normal` (the glide clock); `60ms` squish-release timer in `useTabIndicator.squishOnTravel`. **Live checks** the orchestrator verifies/tunes: the glide is smooth (not a crossfade or a snap), the `--stretch` peak reads RIGHT (restrained, ~+8% on a far jump), the press does not ring past rest, the underline + pill both inherit the squish, the ARIA roles switch per variant, the responsive swap is clean, and the multi-select pops are independent.
