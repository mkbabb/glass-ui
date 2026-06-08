# A-responsive-tabs — ResponsiveTabs subsumed by the underline tabs (T3)

**Lane** A-responsive-tabs · **Severity** major · **Verdict** net-new-wave (the tabs-unify
wave — folds T1/T2/T3/T4 into ONE component-architecture convergence; no existing wave owns it)
**Source files** `src/components/custom/responsive-tabs/ResponsiveTabs.vue` (167 lines) ·
`src/components/custom/tabs/{UnderlineTabs,BouncyTabs,BouncyToggle}.vue` · the `/responsive-tabs`
+ `/tabs` subpaths · `src/api/index.ts:244-248` · `demo/stories/navigation/{tabs,responsive-tabs}.vue`

---

## The ask (pass-2 ledger T-band)

| # | Ask |
|---|---|
| T1 | Default tabs → the BOUNCY (custom spring-slider) variant; offer `tabs` (underline) + `pill` variants (pill NOT the default). |
| T2 | BouncyToggle → replaced by bouncy-tabs (remove OR leverage the EXACT same animation); drop the "Bouncy" prefix; update ALL consumers. |
| T3 | /navigation/responsive-tabs → subsumed by the underline tabs; ALL within ONE component. |
| T4 | Two tab story pages flagged BROKEN. |

My lane is T3 (the ResponsiveTabs subsumption) but T1/T2/T3/T4 are ONE component-architecture
class — they all reshape the `custom/tabs` family. Treating T3 in isolation would mint a wave
that collides with whatever owns T1/T2. The audit conclusion: there is NO tabs-unify wave today,
so T1-T4 should mint ONE.

## The current shape (HEAD — what T3 fights)

The tabs surface is FOUR components for ONE concept:

1. **`UnderlineTabs.vue`** — `role="tablist"` strip, CSS anchor-positioned underline indicator
   (`anchor-name: --gl-tab-active` + `::before` `position-anchor`, no JS measure — AQ.W6).
   `TabOption[]` + one `defineModel<string>`. The canonical PANEL-nav tab.
2. **`BouncyTabs.vue`** — a 44-line THIN WRAPPER over `BouncyToggle` with
   `:multi-select="false"` + a `string|string[]` → `string` narrowing shim. variant `default|pill`.
3. **`BouncyToggle.vue`** — the 17.8 KB spring-slider ENGINE (squash-stretch slider over a
   shared track; `useBouncySlider` composable; multi-select capable). The "Bouncy" name is the
   prefix T2 wants dropped.
4. **`ResponsiveTabs.vue`** — composes `<Select>` (mobile) ⊕ `<UnderlineTabs>` (desktop), swapped
   by a `window.matchMedia('(min-width: <breakpoint>)')` listener in `onMounted`. One `defineModel`
   drives both controls; `desktopOptions` subset + `effectiveDesktopValue` ternary handle a
   mobile-only tab.

**T3's specific finding:** `ResponsiveTabs` is NOT a distinct tab IDIOM — it is `UnderlineTabs`
plus a mobile-Select fallback bolted on. It shares the EXACT `TabOption[]` shape (imports
`type TabOption` from `../tabs`), the same single-`defineModel<string>`, the same selection
semantics. The matchMedia-swap is a RESPONSIVE BEHAVIOUR (a presentational concern: "below the
breakpoint, collapse the tab strip to a Select"), not a new component contract. A separate
component for it is the over-fragmentation T3 names.

## Root cause (why it's a separate component today)

`ResponsiveTabs` was PROMOTED at AC.W8e from speedtest's 3-site duplicated
`sm:hidden`/`hidden sm:block` Select-or-Tabs swap (AdminDataView / AdminDashboardLayout /
PublicDashboardLayout). At promotion-time the correct dedup target was "collapse the 3 duplicated
swaps into ONE primitive" — and a standalone component was the minimal move. The convergence ask
(T3) is the NEXT level: that primitive's behaviour belongs as a MODE on the underline tab itself,
not as a fourth sibling. The library now carries 4 tab-family components + 4 subpaths
(`/tabs`, `/responsive-tabs`) + 4 api-surface type re-exports (`TabOption`, `ResponsiveTabsProps`,
`ToggleOption`, `BouncyToggleProps`) + 2 demo story rows (`navigation/tabs`,
`navigation/responsive-tabs`) for what the user reads as ONE tab concept with two axes (the
INDICATOR style — underline vs bouncy-slider vs pill; the RESPONSIVE collapse — strip vs Select).

## The gestalt fix (the tabs-unify wave — net-new)

ONE `<Tabs>` component family (the custom one; distinct from the reka `ui/tabs`) with TWO
orthogonal axes, the responsive collapse a PROP not a component:

1. **`variant` axis (T1)** — `variant?: "bouncy" | "underline" | "pill"`, **default `"bouncy"`**
   (the spring-slider IS the default tab look the user wants); `"underline"` = the anchor-rule
   strip; `"pill"` = the solid-foreground pill (NOT default). The bouncy engine
   (`useBouncySlider` + the slider track) is shared — `BouncyTabs` (the 44-line wrapper) collapses
   INTO this; `BouncyToggle` is RENAMED (drop the "Bouncy" prefix per T2) — the spring engine
   becomes the internal slider primitive the bouncy/pill variants compose, and its multi-select
   capability stays reachable as a `<ToggleGroup>`-shaped surface (the Tabs-vs-ToggleGroup
   CLAUDE.md distinction holds: single-select PANEL-nav = Tabs; multi-select surface-mutate =
   ToggleGroup).
2. **`responsive` collapse axis (T3)** — `responsive?: boolean | { breakpoint?: string;
   desktopOptions?: TabOption[] }` (default off). When set, BELOW the breakpoint the strip
   collapses to the `<Select>` fallback (the EXACT matchMedia logic lifted verbatim from
   `ResponsiveTabs.vue:81-133` — the `onMounted` mql listener, the `effectiveDesktopValue`
   missing-tab ternary, the `mobileAriaLabel`). The `desktopOptions` subset + the mobile
   accessible-name carry over as nested options. `ResponsiveTabs` is DELETED (its dir, its
   `/responsive-tabs` subpath, its `package.json` exports + typesVersions rows, its
   `src/api/index.ts:244-248` `ResponsiveTabsProps` re-export, its `src/subpaths/responsive-tabs.ts`
   barrel) — NO legacy alias (feedback_no_backwards_compat). The one external consumer (speedtest,
   3 sites) migrates `<ResponsiveTabs>` → `<Tabs responsive>` in lockstep.
3. **Naming (T2)** — drop "Bouncy"; the family is `Tabs` (custom) + the renamed slider engine.
   Update ALL internal consumers: `BouncyTabs` is referenced by `demo/stories/navigation/tabs.vue`
   + the aurora config layers (`FlowLayer`/`CompositionLayer`/`MediumLayer`/`AuroraConfigDock`) +
   `ConfiguratorLayer.vue` + `ui/tabs/TabsList.vue` — all re-point to the renamed component (this
   is the binding-verification sweep — stale reka prop bindings silently no-op, per
   feedback_glass_ui_binding_verification; sweep on the rename).
4. **Story consolidation (T3 + T4)** — fold `navigation/responsive-tabs.vue` INTO
   `navigation/tabs.vue` as a `responsive` section (mirrors AV.W10 merging bouncy-tabs → tabs);
   delete the `navigation/responsive-tabs` manifest row + SFC. T4's two-broken-story flag is
   live-pending — the orchestrator must capture WHICH two story pages render broken (likely the
   `navigation/tabs` page itself + `responsive-tabs`); the unify wave re-authors them coherently.

Net surface delta: 4 tab components → 2 (the `Tabs` family + the renamed slider engine); 4 api
type re-exports → 2; 2 story rows → 1; the `/responsive-tabs` subpath retired.

## Overfitting / consumer check

- `UnderlineTabs` consumers: `navigation/tabs.vue` + (as the desktop arm) `ResponsiveTabs` only —
  becomes the `variant="underline"` path.
- `BouncyTabs` consumers: 7 (TabsList, ConfiguratorLayer, 4 aurora config SFCs, tabs story) —
  all migrate to `<Tabs variant="bouncy">` or the renamed slider.
- `ResponsiveTabs` consumers: the demo story + speedtest (3 sites, cross-repo). Clean-break
  migrate per feedback_no_backwards_compat — the speedtest consume-leg routes through the
  cross-repo build-supplier wave (cf. W28/W29 / W41 cross-repo annex pattern).

The unify wave SHRINKS the public surface (fewer components/subpaths/types) while preserving every
behaviour as an axis — the gestalt-over-fragmentation move.

## Dedup verdict — net-new-wave

**No existing AX wave owns the tabs-unify.** Checked all 51 wave plans:

- **W21** (the lane's cross-ref) is `primitive-recategorize-ledger + barrel coherence + metric-pill
  reconcile + Drawer spring prop` — it touches configurator/drawer/metric-pill/use-token-color,
  NOT tabs. The cross-ref is a red herring: W21 only CITES the AV.W10 "merging bouncy-tabs → tabs"
  precedent as an analogy for its drawer-story fold. W21 must NOT absorb T3.
- **W05** (one-iOS-spring-vocabulary) owns `BouncyToggle.vue:125-155` `animatePress` press-shape +
  the `--spring-*` register re-point on `UnderlineTabs:75` / `BouncyToggle:135`. That is the MOTION
  arm of T1/T2 (the spring feel) — it is ALREADY in flight and must NOT be re-litigated. The
  tabs-unify wave consumes W05's settled spring vocab; it owns the COMPONENT ARCHITECTURE
  (the variant axis + the responsive prop + the rename + the deletes), distinct from W05's motion
  governance. Sequence the unify wave AFTER W05 so the renamed slider inherits the governed
  register.
- **W18** (storybook IA reinvention) frames the category tree but EXPLICITLY keeps
  `navigation/tabs` (`manifest.ts:160`) and `navigation/responsive-tabs` (`:166`) as TWO separate
  rows — it does no tabs consolidation (its consolidations are the blob-trio D6 + the dock-category
  D14 only). The unify wave's story-fold (responsive-tabs → tabs) is a manifest-row delta W18 does
  NOT author; coordinate the single-writer `manifest.ts` contract (W18 owns the tree; the unify
  wave's row-delete lands WITH its src delete, the W18 disjointness pattern for prune-wave rows).

So: **mint ONE tabs-unify wave** folding T1 (variant axis, bouncy default) + T2 (drop Bouncy
prefix, update consumers) + T3 (ResponsiveTabs subsumed as a `responsive` prop, component deleted)
+ T4 (the two broken story pages re-authored) — a single component-architecture convergence on the
`custom/tabs` + `custom/responsive-tabs` surface. dependsOn W05 (settled spring vocab) + W18
(settled IA tree for the story-fold).

## Dedupe note

Fold into the wave set as ONE net-new tabs-unify wave (suggest `W53` or the next free number)
covering T1/T2/T3/T4 — do NOT split T3 into its own wave (it shares the `custom/tabs` surface with
T1/T2; separate waves would collide on the same files + the rename). Cross-coordinate: W05 owns the
spring MOTION (do not touch `animatePress`/the register re-point); W18 owns the `manifest.ts` TREE
(the unify wave deletes the `responsive-tabs` row WITH its src delete per the prune-row contract);
W21 is unrelated (its tabs cross-ref is an analogy only). The speedtest `<ResponsiveTabs>` →
`<Tabs responsive>` consume-leg routes through the cross-repo build-supplier annex (W28/W29/W41
pattern), born-RED until the AX publish + the speedtest bump.
