# A-tabs-unify — Tabs unification source-audit (T1/T2/T4): bouncy-default + BouncyToggle merge + prefix drop

**Lane** AUDIT (T1/T2/T4 structural). **Severity** major.
**Verdict** **net-new-wave — `tabs-unify`** (no `docs/tranches/AX/waves/AX.W*-tabs*` plan file exists;
the structural T1/T2/T4 asks have no covering wave). This is the SAME wave the two research lanes
(`R-tabs-segmented`, `R-apple-liquid` §4) already feed — it consumes their SOTA recipe and owns the
component merge + prefix drop + consumer sweep + broken-story fix.

---

## The ask (USER-DEFECTS pass-2 §T)

- **T1** — Default tabs → the BOUNCY (custom spring-slider) variant; offer `tabs` (underline) + `pill`
  variants (pill NOT the default).
- **T2** — BouncyToggle → replaced by bouncy-tabs (remove OR leverage the EXACT same animation); drop
  the "Bouncy" prefix; update ALL consumers.
- **T4** — Two tab story pages flagged BROKEN.

(T3 — responsive-tabs subsumed into the underline variant — is the sibling lane's concern but the same
wave owns the component merge; recorded below as a coupled fold.)

---

## 1. Source map — the four tab surfaces at HEAD (5cf2980)

The tab/segmented family is FRAGMENTED into FIVE artefacts across two dirs, with overlapping shapes:

| Artefact | File | Lines | Shape | Reach |
|---|---|---|---|---|
| `BouncyToggle` | `src/components/custom/tabs/BouncyToggle.vue` | 495 | the REAL engine — segmented spring-slider, single+multi-select, `variant: default\|pill`, `overflow: none\|scroll\|auto`, anchor-CSS + JS-fallback slider, WAAPI press, tooltip | `/tabs` subpath + root barrel (via `custom/tabs`? — see §5) |
| `BouncyTabs` | `src/components/custom/tabs/BouncyTabs.vue` | 44 | thin single-select SHIM over `BouncyToggle` (`:multi-select="false"`, narrows the emit) | `/tabs` subpath |
| `UnderlineTabs` | `src/components/custom/tabs/UnderlineTabs.vue` | 119 | SEPARATE component — anchor-positioned underline rule, `role="tablist"`, own scoped CSS, NO slider engine shared | `/tabs` subpath + drives `ResponsiveTabs` |
| `useBouncySlider` | `src/components/custom/tabs/composables/useBouncySlider.ts` | 164 | package-private JS-measure slider path for `BouncyToggle` (multi + non-anchor fallback) | internal |
| `ui/tabs` (reka) | `src/components/ui/tabs/` (Tabs/List/Trigger/Indicator/Content) | — | the shadcn-vue reka-ui `TabsRoot` family — `role="tablist"` panel-nav, `TabsIndicator` spring pill (`--spring-snappy`), `data-[state=active]` | ROOT BARREL (`src/index.ts:110`) |

**The architectural defect (the root cause T1/T2 name):** there are THREE parallel tab implementations —
the reka `ui/tabs` (panel-nav, root barrel), the custom `BouncyToggle`/`BouncyTabs` (segmented slider,
`/tabs` subpath), and the custom `UnderlineTabs` (underline rule, `/tabs` subpath). They do NOT share a
slider engine: `BouncyToggle` runs the `useBouncySlider`/anchor-CSS slider; `UnderlineTabs` runs its own
anchor-`::before` rule; `ui/tabs` runs reka's `TabsIndicator`. The user's T1 ask — "default tabs → the
bouncy slider, offer underline + pill" — is a request to COLLAPSE these three into ONE component with a
`variant` axis (`segmented` default · `pill` · `underline`), the indicator-morph SHARED across all three.

## 2. T1 — the bouncy slider as the default, with `tabs`(underline)+`pill` variants

`BouncyToggle` ALREADY carries the variant skeleton (`variant: "default" | "pill"`, `BouncyToggle.vue:40`)
— but it is MISSING the `underline` variant entirely (underline is a separate component), and its
`default` is the muted slider the user wants promoted to the headline. The gestalt fix is NOT to bolt an
`underline` branch onto BouncyToggle; it is to author ONE `Tabs`-family component with a three-value
`variant` axis:
- `variant="segmented"` (DEFAULT) — the pill-slider over a muted track (formerly BouncyToggle `default`).
- `variant="pill"` — the solid `--foreground` pill (formerly BouncyToggle `--pill`).
- `variant="underline"` — the anchor-positioned underline rule (formerly UnderlineTabs).

The indicator (slider pill OR underline rule) is the SAME anchor-positioned body across all three; only
the chrome (filled pill vs. hairline rule) differs — which is a CSS-variant concern, not three components.
This is the exact "ONE component, three variants, one shared elastic indicator" shape `R-tabs-segmented`
§4 pins.

**ARIA contract (load-bearing — do NOT flatten):** per CLAUDE.md §Tabs-vs-ToggleGroup, the `underline`
variant is PANEL-NAV (`role="tablist"`, one active panel) — `UnderlineTabs.vue:33` already emits
`role="tablist"` + `role="tab"` + `aria-selected`. The `segmented`/`pill` variants are the
ToggleGroup-shaped surface (`role="group"`, `aria-pressed`) — `BouncyToggle.vue:272` emits `aria-pressed`.
The unified component MUST switch the ARIA role on the `variant` axis (tablist for underline,
group/pressed for segmented/pill), NOT collapse to one role. This is the subtlety the merge must preserve.

## 3. T2 — BouncyToggle/BouncyTabs merge + the "Bouncy" prefix drop

- **`BouncyTabs` is pure debris.** It is a 44-line single-select shim over `BouncyToggle` (`:multi-select="false"`
  + an emit-narrowing `onUpdate`). With one unified `Tabs` component carrying `multiSelect?`, `BouncyTabs`
  collapses to `<Tabs :multi-select="false">` — DELETE it (no shim, no alias per no-backwards-compat).
- **`BouncyToggle` is the keep-engine.** Rename `BouncyToggle` → the unified `Tabs` (or `SegmentedTabs`) —
  it owns the slider engine, the variant axis, the overflow axis, the multi-select path. Its
  `BouncyToggleProps`/`ToggleOption` types rename in lockstep (`api/index.ts:244` notes
  `ResponsiveTabsProps parallels BouncyToggleProps` — that comment + the export rename together).
- **The "Bouncy" prefix mis-signals.** Post-W05 the slider transitions ALREADY read `--spring-snappy`
  (`BouncyToggle.vue:352-354,373`; `UnderlineTabs.vue:77`) — the CONTROL register, NOT `--spring-bouncy`.
  "Bouncy" names a PLAYFUL register the component no longer uses on its travel; the rename matches the
  curve already shipped (R-tabs-segmented §3 confirms). Drop "Bouncy" from BOTH `BouncyTabs` +
  `BouncyToggle`; `useBouncySlider` → `useTabIndicator` (or similar).

**The consumer sweep (T2 "update ALL consumers") — the EXACT grep set at HEAD:**

| Consumer | Sites | Import |
|---|---|---|
| `demo/stories/navigation/tabs.vue` | 6 (`BouncyTabs` ×2, `BouncyToggle` ×2, types) | `custom/tabs` |
| `demo/stories/aurora/AuroraConfigDock.vue` | 2 `BouncyTabs` | `custom/tabs` |
| `demo/stories/aurora/config/MediumLayer.vue` | 4 `BouncyTabs` | `custom/tabs` |
| `demo/stories/aurora/config/FlowLayer.vue` | 1 `BouncyTabs` | `custom/tabs` |
| `demo/stories/aurora/config/CompositionLayer.vue` | 1 `BouncyTabs` | `custom/tabs` |
| `src/api/index.ts:244` | 1 type-comment ref to `BouncyToggleProps` | — |
| `src/components/custom/tabs/index.ts` | the barrel (3 default exports + 2 type exports) | — |
| `src/components/custom/configurator/ConfiguratorLayer.vue:15` | 1 comment ref ("BouncyTabs / DockLayerGroup at the parent") | — |
| `src/components/custom/responsive-tabs/ResponsiveTabs.vue` | imports `UnderlineTabs` (the survivor — re-points to `Tabs variant="underline"`) | `../tabs` |

The aurora config dock is the user's flagged surface (D1) — those 8 `BouncyTabs` enum-pickers are the
loud consumers; W38 (aurora restyle) AUGMENT already plans to re-author them onto `LabeledSelect` (so some
of these sites VANISH, not just rename — coordinate, see §6 W38 dedup). The remaining sites (demo tabs
story, responsive-tabs) re-point in lockstep.

## 4. T4 — the two broken tab stories

The TWO tab story pages are `demo/stories/navigation/tabs.vue` (`manifest.ts:160`) and
`demo/stories/navigation/responsive-tabs.vue` (`manifest.ts:166`). The orchestrator live pass-2
(`orchestrator-mcp-live-pass2.md`) flagged "tabs T1" pending but captured no render-error detail, so the
"broken" is the live-visual class, not a mount/404:

- **`navigation/tabs.vue` — the egregious press (W05/D3 carry).** The story mounts `BouncyTabs` (×2) +
  `BouncyToggle` (×2). The `animatePress` double-spring (`BouncyToggle.vue:125-155` — the `1.08`
  `--scale-hover` keyframe baked UNDER `--spring-bouncy` at a hardcoded 200ms) is the user's loudest
  motion defect (D3 "BouncyTabs egregious/jarring/abrupt"). This is what reads as "broken" — the press
  snaps, springs past 1.08, rings, resettles in 200ms. **This SHAPE fix is W05's MOTION-SHAPE arm, NOT
  tabs-unify** (W05 owns `animatePress`). tabs-unify INHERITS the W05-collapsed press; if tabs-unify lands
  after W05 the press is already smooth on the renamed component.
- **`navigation/responsive-tabs.vue` — likely the same travel-glide + the breakpoint-swap read.** It
  mounts `UnderlineTabs` via `ResponsiveTabs`. The underline glide is rigid (no squish — R-tabs-segmented
  §3) and the matchMedia Select↔UnderlineTabs swap is the T3 surface the unified component subsumes.

**The wave's T4 obligation:** re-author BOTH stories against the unified `Tabs` component (the variant
axis + the merged engine + the W05-smooth press + the new squish-on-travel), and the live π-audit confirms
both read coherently (the binding close criterion — the "broken" is only observable live). Note these two
stories also FOLD per W18 (responsive-tabs subsumes into tabs' underline-overflow), so the story re-author
+ the IA-row collapse land together (single-writer contract — W18 owns the manifest row, tabs-unify owns
the SFC body + component merge).

## 5. The `/tabs` subpath naming collision (a hazard the merge must resolve)

**Source finding — the `/tabs` subpath ships the CUSTOM family, not reka `ui/tabs`.** `src/subpaths/tabs.ts`
= `export * from "../components/custom/tabs"` → the `@mkbabb/glass-ui/tabs` subpath
(`package.json:284`, `./dist/tabs.js`) ships `BouncyTabs`/`BouncyToggle`/`UnderlineTabs`. Meanwhile the
reka `ui/tabs` (Tabs/TabsList/TabsTrigger/...) reaches consumers via the ROOT BARREL (`src/index.ts:110`,
`export * from "./components/ui/tabs"`) with NO dedicated subpath. So `import { Tabs } from "@mkbabb/glass-ui"`
= reka Tabs; `import { BouncyTabs } from "@mkbabb/glass-ui/tabs"` = the custom slider. After the merge the
unified `Tabs` component MUST resolve this: either (a) the unified custom `Tabs` REPLACES `ui/tabs` on the
root barrel + `/tabs` subpath (one `Tabs` symbol library-wide), or (b) the reka `ui/tabs` stays the
panel-nav primitive and the unified slider keeps a distinct name (`SegmentedTabs`). **This is a RATIFY for
the user** — does the unified bouncy-slider BECOME `Tabs` (replacing reka), or coexist as `SegmentedTabs`?
The user's T1 word "default tabs → the bouncy variant" reads as (a): the bouncy slider IS the default
`Tabs`, with reka's panel-nav surviving only as the `underline` variant's substrate (or retired). RATIFY
the symbol naming + the subpath target before the merge — it is a clean-break public-surface decision.

## 6. Verdict + dedup mapping (no duplicate prescription)

**Verdict: net-new-wave — `tabs-unify`.** No `AX.W*-tabs*` plan file exists. The STRUCTURAL arm (component
merge, prefix drop, consumer sweep, broken-story re-author, the `/tabs` subpath collision) has no covering
wave. The two research lanes already declared the SAME wave (R-tabs-segmented verdict=net-new-wave;
R-apple-liquid §4 "AUGMENT the T-tabs wave family" — which implies minting it). This audit lane CONFIRMS
net-new and supplies the STRUCTURAL spec (the research lanes supply the motion recipe).

**Dedup — what folds where:**

- **vs W05 (one-iOS-spring-vocabulary) — CLEAN DEPENDENCY, no overlap.** W05's MOTION-SHAPE arm OWNS the
  `animatePress` press double-spring collapse (the `scale(1)→--scale-press→scale(1)` squish on
  `--spring-snappy` at `--duration-normal`) AND the `--spring-snappy` register the indicator glides on.
  tabs-unify CONSUMES the W05-settled register + the W05-collapsed press — it adds NO spring token and does
  NOT re-litigate the press. **tabs-unify dependsOn W05.** The TRAVEL-squish (the new indicator-deform
  atom) is DISTINCT from the press-squish W05 owns (button vs indicator). W05 must land first (the rename
  edits `BouncyToggle.vue` which W05 also edits for the press — coordinate the file: W05 lands the press
  shape, tabs-unify lands the rename + the variant axis + the travel-squish; SEQUENCE tabs-unify AFTER W05
  so the rename does not orphan W05's `animatePress` edit).
- **vs W21 (primitive-recategorize ledger) — NO overlap.** W21 owns configurator/drawer/metric-pill/use-token-color
  — it does NOT touch the tabs family. The cross-ref "W21 (recategorize)" in the lane brief is a
  mis-anchor: W21's recategorize-ledger is verify-only against AV.W10 moves; tabs has no row in W21's
  scope. **No dedup edit; W21 is unrelated.** (The ONE shared concern: both touch `src/index.ts`/barrels,
  but DIFFERENT lines — W21 may demote configurator; tabs-unify re-points the tabs export. Coordinate the
  barrel lines at merge, no semantic overlap.)
- **vs W18 (storybook IA) — coupled, single-writer.** W18 owns the `manifest.ts` navigation tree
  re-baseline. T3 (responsive-tabs subsumed) + T4 (the story re-author) collapse the two
  `navigation/tabs` + `navigation/responsive-tabs` rows. **tabs-unify owns the COMPONENT merge + the SFC
  bodies; W18 owns the manifest rows.** Sequence so the SFC fold + the row collapse land together (the
  SFC-ships-with-row coupling W18 mandates). tabs-unify is a W18 input (the surviving component set), not a
  W18 edit.
- **vs R-tabs-segmented (research) — this audit's MOTION half.** R-tabs-segmented supplies the
  squish-on-travel MECHANISM (Material ELASTIC two-edge OR volume-preserving scaleX, `--tab-indicator-max-stretch`
  ~1.08, the easing/duration tokens). This audit supplies the STRUCTURAL spec (the merge map, the consumer
  sweep, the ARIA-role-per-variant, the subpath collision). **The tabs-unify wave consumes BOTH** — no
  duplicate, complementary halves.
- **vs R-apple-liquid §4 — the survey altitude.** R-apple-liquid §4 maps the segmented idiom at altitude
  ("drop Bouncy, one variant axis, snappy register"). This audit + R-tabs-segmented are the depth. Same
  wave consumes all three.
- **vs W38 (aurora configurator restyle) — coordinate the consumer sweep.** W38 AUGMENT plans to re-author
  the 8 `BouncyTabs` enum-pickers in `AuroraConfigDock`/`config/*Layer.vue` onto `LabeledSelect` — so those
  8 sites VANISH (not rename). tabs-unify's consumer sweep must NOT rename a `BouncyTabs` site W38 deletes.
  **Coordinate: W38 owns the aurora-config sites; tabs-unify owns the demo tabs story + responsive-tabs +
  the barrel rename.** Sequence or file-disjoint the aurora-config edits.
- **vs W42 (liquid-morph substrate) — tabs-unify is a CONSUMER, not the substrate.** Cross-element fusion
  (tab-indicator ↔ carousel-indicator) is W42's `MorphGroup`. The within-component indicator squish is
  local to tabs-unify. No overlap; tabs-unify may later consume W42 for cross-component morph.
- **Overfitting note — the squish atom.** If the volume-preserving scaleX squish has ≥2 consumers
  (tab-indicator + carousel page-indicator W23 + dock press-squish W06), it warrants a shared
  `useSquish`/`--*-max-stretch` token family, not three copies. Flag for the bar; tabs-unify is its first
  consumer (R-tabs-segmented §6 raises the same flag — converge, do not double-mint).

## 7. RATIFY-BEFORE-IMPL (the user's design calls)

1. **The unified symbol naming + `/tabs` subpath target (§5).** Does the bouncy slider BECOME `Tabs`
   (replacing reka `ui/tabs` on the root barrel + `/tabs` subpath), or coexist as `SegmentedTabs`? The T1
   word reads as the former. Clean-break public-surface decision — no alias.
2. **BouncyToggle: merge vs remove (T2 verbatim "remove OR leverage").** Recommended: MERGE the engine into
   the unified `Tabs` (it IS the slider engine), DELETE the `BouncyTabs` shim. The multi-select path stays
   (it is the ToggleGroup-shaped surface). Confirm the multi-select segmented surface survives the rename.
3. **The squish path (deferred from R-tabs-segmented §6).** Velocity-driven scaleX (preferred, JS) vs
   two-edge CSS `inset` easing (declarative, anchor-native). Recommend velocity-driven default + two-edge
   CSS `@supports` fallback.

## 8. The proposed `tabs-unify` wave shape (for the planner)

- **Title:** `tabs-unify` — bouncy-slider as the default `Tabs`, one `variant` axis (segmented·pill·underline),
  BouncyToggle merge + "Bouncy" prefix drop + consumer sweep + the squish-on-travel atom.
- **dependsOn:** W05 (the `--spring-snappy` register + the collapsed press), W18 (the IA tree the merged
  story folds into). Coordinates with W38 (the aurora-config consumer sites) + W23 (the shared squish atom).
- **FileBounds:** `src/components/custom/tabs/` (merge BouncyToggle→Tabs, delete BouncyTabs, fold
  UnderlineTabs into the `underline` variant, rename useBouncySlider), `src/components/custom/tabs/index.ts`
  (barrel rename), `src/components/custom/responsive-tabs/ResponsiveTabs.vue` (re-point UnderlineTabs →
  `Tabs variant="underline"`), `src/subpaths/tabs.ts` + `package.json ./tabs` (the subpath-target RATIFY),
  `src/index.ts` (the root-barrel tabs export per the symbol RATIFY), `src/api/index.ts:244` (the type
  rename), `src/styles/` (the `--tab-indicator-max-stretch` token + the squish CSS), the demo consumer
  sweep (`demo/stories/navigation/tabs.vue` + `responsive-tabs.vue` re-author — coordinate W18/W38).
- **Born-RED witnesses:** (a) grep `BouncyTabs|BouncyToggle` over src+demo → non-zero (the prefix survives);
  (b) `UnderlineTabs` is a SEPARATE component (no `variant="underline"` on the unified surface); (c) no
  `--tab-indicator-max-stretch` token (no squish-on-travel); (d) the two tab stories read broken/egregious
  live.
- **HardGate:** a no-`Bouncy`-survivor grep over src+demo (deletion-proof); a `variant` axis structural
  probe (the unified component accepts `segmented|pill|underline`); the squish-token presence; vue-tsc +
  build GREEN; the MANDATORY live π-audit of both re-authored stories (the squish reads RIGHT, the press is
  W05-smooth, the ARIA role switches per variant).

---

## Sources (this audit)

- `src/components/custom/tabs/{BouncyToggle,BouncyTabs,UnderlineTabs}.vue` + `composables/useBouncySlider.ts` + `index.ts` (HEAD 5cf2980)
- `src/components/ui/tabs/{Tabs,TabsList,TabsTrigger,TabsIndicator}.vue` + `index.ts`
- `src/components/custom/responsive-tabs/ResponsiveTabs.vue`
- `src/subpaths/tabs.ts` + `package.json:284` (`./tabs`) + `src/index.ts:110` + `src/api/index.ts:244`
- consumer grep: `demo/stories/navigation/tabs.vue`, `demo/stories/aurora/{AuroraConfigDock,config/*Layer}.vue`
- dedup: `docs/tranches/AX/waves/AX.W05-…`, `AX.W18-…`, `AX.W21-…` + `convergence2/{R-tabs-segmented,R-apple-liquid}.md` + `convergence/CONVERGENCE-PLAN.md`
