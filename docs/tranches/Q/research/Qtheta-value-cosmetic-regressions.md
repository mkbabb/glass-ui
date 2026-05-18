# Q.Rθ — value.js consumer cosmetic regression sweep (Q audit-augmentation lane)

**Lane**: Q.Rθ — full cosmetic regression sweep beyond the Qα + Q11 BLOCKER chain.
**Date**: 2026-05-18.
**Mode**: READ-ONLY. No source mutations. No mutating git in either repo.
**Scope**: glass-ui `@ HEAD 7e2e385` (AF.W1 + post-P shadow cohort + AF.W1 merge) vs value.js `@ w.w2.1-value-js-prebuild` (P.W5 + post-P consumer-side prep in place).
**Inheritance**: Qα + Q11 findings (11-site Card variant migration, dist clobber, keyframes.js exports, value.js hardcoded alias, 5-consumer resolver sweep) are already addressed in Q.W1 + Q.W2 — this lane does NOT re-litigate them. This lane scans for **cosmetic deltas not in that BLOCKER chain**.

**Headline finding**: the recent glass-ui commits (AF.W1 + the seven post-P shadow-cohort commits) **touch zero consumer-visible surfaces in value.js**. The cohort's primitives — Progress, MetricBadge, MetricRow/Stack, GlassTimeline, DataTable, Toggle — are NOT consumed in value.js. The two dock cohort commits (`099d51e` edge-fade retire + `beec35e` inactive-layer visibility) are strict improvements; the dock `dock-label` weight commit (`bbb51e8`) targets a utility value.js does not apply. **Verdict: zero cosmetic regressions reach value.js from the post-P + AF.W1 cohort.**

The Qα BLOCKER findings remain the entire load-bearing consumer-side delta. Everything I scanned is either:
- already migrated on the WIP branch (Q.W1 + Q.W2 work pre-staged — `vite.config.ts` demoConditions + `outDir: dist/gh-pages` + Card `tier="wash"` migration all DONE);
- a strict improvement with no breakage class (the two dock fixes);
- entirely outside value.js's component surface (Timeline, Progress, MetricStack, MetricBadge, DataTable, Toggle).

---

## §1 Consumer surface inventory

### §1.1 Direct glass-ui imports — 31 SFCs + 19 barrels + 4 composables/utilities

**Component re-export barrels** (every demo/@/components/ui/* with a barrel re-export):
`accordion`, `avatar`, `badge`, `button`, `card`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `hover-card`, `input` (forms), `label`, `number-field`, `popover`, `progress`, `radio-group`, `select`, `separator`, `sheet`, `skeleton`, `slider`, `switch`, `tabs`, `tags-input`, `textarea` (forms), `toggle`, `toggle-group`, `tooltip`, `accordion`.

**Direct imports from `@mkbabb/glass-ui` root barrel** — 31 SFCs (verified by `grep '@mkbabb/glass-ui'`); the most heavy hitters are the dock subsystem (`Dock.vue`, `DockMainLayer.vue`, `DockViewSelect.vue`, `layers/*`, `menus/MobileMenuDropdown.vue`) and the panes (`BrowsePane.vue`, `MixPane.vue`, `GeneratePane.vue`, `ConfigSliderPane.vue`, `PalettesPane.vue`, `AdminPane.vue`, `ExtractPane.vue`, `GradientPane.vue`).

**Subpath imports**:
- `@mkbabb/glass-ui/dock` — 11 sites (heaviest consumer).
- `@mkbabb/glass-ui/aurora` — 1 site (`useAtmosphere.ts`).
- `@mkbabb/glass-ui/controls` — `DarkModeToggle`.
- `@mkbabb/glass-ui/dark` — `useGlobalDark`.
- `@mkbabb/glass-ui/forms` — `Input`, `Textarea`.
- `@mkbabb/glass-ui/tabs` — `BouncyTabs` (MixSourceSelector + PaneSegmentedControl).
- `@mkbabb/glass-ui/search` — `SearchBar` (3 sites).
- `@mkbabb/glass-ui/confirm-dialog` — 3 sites.
- `@mkbabb/glass-ui/configurator` — 1 site (ConfigSliderPane).
- `@mkbabb/glass-ui/glass-carousel` — 1 site (ComponentSliders).

**NOT consumed anywhere** (the entire post-P + AF.W1 cohort's primitives):
- `MetricStack` / `MetricRow` / `MetricBadge` / `MetricCell` / `MetricPill` — zero.
- `GlassTimeline` / `ContinuousTimeline` / `ScrubberTimeline` / `SegmentedTimeline` — zero.
- `DataTable` — zero.
- `Progress` — barrelled at `demo/@/components/ui/progress/index.ts` but no `<Progress>` callsite in the demo.
- `Toggle` / `ToggleGroup` — zero (a few `onToggle` handler names appear, none use the primitive).

### §1.2 CSS surface — 4 demo-side stylesheets

- `demo/@/styles/style.css` (234 lines) — the token-override authority + project chrome.
- `demo/@/styles/animations.css` (41 lines) — value.js-specific keyframes.
- `demo/@/styles/utils.css` (27 lines) — `.fraunces`, `.fira-code`, `.section-subtitle`.
- `demo/hero-lab/hero-lab.css` (355 lines) — hero-lab specific.

`style.css` overrides:
- `--shadow-cartoon` / `--shadow-cartoon-hover` to a bold 8px/10px stamped offset (cartoon identity).
- `--shadow-card` / `--shadow-card-hover` route through `var(--shadow-cartoon{,-hover})` — cards inherit the cartoon identity.
- `--select-font` / `--dropdown-menu-font` → `var(--font-mono)`.
- `.underline-tabs button[role="tab"][data-state="active"]` — selector targets reka-ui's Tabs primitive's data-state, NOT custom `<UnderlineTabs>`. Comments flag it as retiring once glass-ui ships a `<Tabs>` `underline` variant.
- `--shadow-color: var(--foreground)` — drives both `--shadow-cartoon-{sm,md,lg}` (used at SearchFilterBar) and the project's stamped-offset cartoon.

### §1.3 Already-migrated work (pre-staged on the WIP branch)

The Qα BLOCKER chain is already addressed at `value.js @ HEAD`:
- Every pane SFC (`GradientPane`, `AdminPane`, `BrowsePane`, `ExtractPane`, `MixPane`, `PalettesPane`, `GeneratePane`) uses `<Card tier="wash" :shadow="false" :grain="false">` — zero `variant="pane"` survivors (`grep` returns nothing).
- `vite.config.ts` `gh-pages` mode emits to `dist/gh-pages/`, not the shared `dist/` (fixes the library-clobber class).
- Every demo mode (`dev`, `hero-lab`, `gh-pages`) declares `resolve.conditions: ["development", "module", "browser"]` (fixes the resolver-condition gap).
- No hardcoded `@mkbabb/keyframes.js → ../keyframes.js/dist/keyframes.js` alias in `vite.config.ts`. (The Qα-cited fossil alias has been removed.)

**Note that these fixes pre-date Q.W1's formal write — they are on the `w.w2.1-value-js-prebuild` WIP branch, not master.** Q-chron-1 (P.W5 WIP-vs-master) still needs the W1 canonical branch resolution.

---

## §2 Cosmetic regression matrix — 7-column attribution

I worked through every recent commit listed in the dispatch's "recent glass-ui commits relevant for cross-walk" + every cosmetic class category. Per-finding verdict: FOLD-IN means glass-ui (or value.js) accepts the new behaviour; REVERT means glass-ui rolls the change back; BOTH-PATHS-VIABLE means either is sound and the choice is editorial; UNATTRIBUTED means I could not pin the change to a commit.

| # | Surface | Symptom | Origin tranche | Origin wave | Origin commit | Recommendation |
|---|---------|---------|----------------|-------------|---------------|----------------|
| 1 | **Progress primitive rounded fills** (AF.W1 L1) | The gradient indicator + sectioned-fill + continuous-fill all get `border-start-end-radius`/`border-end-end-radius: var(--radius-pill)` so low fills read as rounded nubs. | AF | W1 | `63c88b7` | **N/A** — `Progress` is barrelled in value.js but ZERO `<Progress>` callsites. No reach. Document only: the change is a primitive cosmetic upgrade with no consumer impact for value.js. |
| 2 | **MetricBadge label weight token** (AF.W1 L2) | `--metric-badge-label-weight` (default 300) replaces baked `font-medium`. | AF | W1 | `63c88b7` | **N/A** — no MetricBadge consumers. |
| 3 | **MetricRow value+unit conjoin** (AF.W1 L3) | Unit folded into value track; 3-subgrid layout. | AF | W1 | `63c88b7` | **N/A** — no MetricRow consumers. |
| 4 | **ContinuousTimeline completion tick** (AF.W1 L4) | Completed segment dots draw a CSS check with overshoot pop. | AF | W1 | `63c88b7` | **N/A** — no timeline consumers. |
| 5 | **MetricStack `result` register** | New `register` prop + private clamp tokens. | (post-P shadow) | — | `9ba68ca` + `d244dd5` | **N/A** — no MetricStack consumers. The Qγ-flagged 8-token private-SFC dialect promotion is independent of value.js. |
| 6 | **Toggle `card` variant `compoundVariants`** (`beec35e`) | `h-auto` re-asserts per size; card toggle sizes to content. | (post-P shadow) | — | `beec35e` | **N/A** — value.js has no `<Toggle variant="card">` consumer. Strict-fix improvement. |
| 7 | **Inactive dock layer hit-test fix** (`beec35e`) | `.dock-layer:not(.layer-active)` + `.dock-layer-item-host` add `visibility: hidden` with delayed transition. | (post-P shadow) | — | `beec35e` | **FOLD-IN** — strict improvement for value.js's multi-layer dock (Dock.vue has 4 layers: mobile-edit, slug-edit, action-bar, main; inactive layers were `opacity:0` only — the new rule fixes the dead-control hazard for value.js too). No revert candidate. |
| 8 | **Dock edge-fade mask retire** (`099d51e`) | `.dock-layers` horizontal + `.glass-dock.vertical` vertical `mask-image` removed. | (post-P shadow) | — | `099d51e` | **FOLD-IN** — strict improvement for value.js's bottom dock (the right-edge ProfileSection chip's outer edge is no longer dissolved into the glass backdrop). No revert candidate. |
| 9 | **Timeline stitched gradient + glassy dots** (`3cb70db`) | Single-rail stitched gradient + rounded ends + glassy dots. | (post-P shadow) | — | `3cb70db` | **N/A** — no timeline consumers. |
| 10 | **DataTable responsive card-per-row** (`1c6c3e5`) | New `responsive`/`cardBreakpoint` props collapse table to stacked cards. | (post-P shadow) | — | `1c6c3e5` | **N/A** — no DataTable consumers. |
| 11 | **Timeline `--continuous-fill-opacity` custom prop** (`b8a61ec`) | New custom-prop cascade for consumer-driven dim. | (post-P shadow ancestor) | — | `b8a61ec` | **N/A** — no timeline consumers. |
| 12 | **Dock-label font-weight 500 → 400** (`bbb51e8`) | `.dock-label` utility weight retuned. | (post-P shadow ancestor) | — | `bbb51e8` | **N/A** — value.js does not apply `.dock-label` utility (grep returns zero). DockMainLayer.vue uses raw `text-small font-display` / `text-base font-display` for its dock labels — independent ladder. Strict-fix for callers that DO apply `.dock-label`. |
| 13 | **`--dock-active-bg/color/scale/border/shadow` cohort** (O.W6 Lane B) | New token-ladder active paint; `border: var(--dock-active-border, none)` would replace any inherited border on active. | O | W6 | (older — `25e1b5a` family) | **N/A** — value.js DockIconButton consumers do not use `data-tier="secondary"` (the only path where a non-`none` resting border exists). Defaults: `scale=1`, `border=none`, `shadow=none` — net-zero change vs prior hardcoded recipe. |
| 14 | **GlassDock `::after` paper-clean-texture overlay** | The grain `::after` overlay applies to every `<GlassDock>`. | (W1-D era) | — | `2e3b752` (warm-cream) | **N/A** — old change, baseline since L. No regression. |
| 15 | **dock `data-density` split-brain** (Qβ-F1 / Q-coh-1) | `[data-density="*"]` declared in BOTH `dock.css` (canonical density rungs) AND `utilities.css` (`--dock-tab-h-*` + `--dock-label-size`). Cascade-order accident. | (pre-P; legacy) | Q.W3 Lane A | (not consumer-visible) | **FOLD-IN** to Q.W3 Lane A as planned. value.js does NOT set `data-density` on GlassDock — falls through to the `comfortable` default. No consumer-visible regression today; consolidation closes the cascade hazard before value.js opts in. |
| 16 | **`.glass-cartoon` recipe location** (Qβ-F2 / Q-coh-2) | `.glass-cartoon` lives in `glass.css` though it is a cartoon-card recipe, not a glass-tier rung. | (pre-P; legacy) | Q.W3 Lane B | (not consumer-visible) | **FOLD-IN** to Q.W3 Lane B as planned. value.js does NOT compose `.glass-cartoon` directly (uses `--shadow-cartoon` tokens via the `--shadow-card` overlay). No regression. |
| 17 | **DropdownMenu scoped-style island** (Qβ-F3 / Q-coh-3) | `DropdownMenuContent` + `DropdownMenuSubContent` carry a lone scoped `<style>` (`--dropdown-menu-font`). value.js sets the token to `var(--font-mono)`. | (pre-P; legacy) | Q.W3 Lane C | (not consumer-visible) | **FOLD-IN** to Q.W3 Lane C — when the scoped style migrates to global CSS, value.js's `--dropdown-menu-font` override still binds (same token name). Verify the global-CSS migration preserves the `font-family: var(--dropdown-menu-font, inherit)` declaration verbatim so value.js's mono-font dropdown survives. |
| 18 | **`beec35e` dock-layer double rule-set** (Qβ-F5 / Q-coh-5) | The visibility:hidden fix is patched into BOTH `.dock-layer` (commit calls "legacy") AND `.dock-layer-item-host`. | (post-P shadow) | Q.W3 Lane C | `beec35e` | **FOLD-IN** to Q.W3 Lane C — value.js uses `<DockLayer>` (Vue SFC under `custom/dock/DockLayer.vue` which renders `.dock-layer-item-host`). The "legacy" `.dock-layer` selector may be dead code at HEAD; the consolidation determines which. value.js inherits the fix either way. |
| 19 | **CSS budget 93.6% gzip** (Qγ §CSS-budget) | Pre-W4 token-promotions, the budget sits near the ceiling. | (post-P shadow) | Q.W4 Lane D | — | **FOLD-IN** to Q.W4 Lane D as planned. Re-baseline post-token-promotions. No consumer effect. |
| 20 | **value.js underline-tabs override targets reka-ui `data-state`** (pre-existing demo workaround) | `demo/@/styles/style.css:164` — `.underline-tabs button[role="tab"][data-state="active"] { border-bottom: 2px solid var(--active-tab-color, var(--primary)) }`. Marker comment says retired once glass-ui ships a Tabs `underline` variant. | (consumer-side) | (none — consumer fossil) | — | **FOLD-IN** to a future glass-ui `<Tabs variant="underline">` substrate (NOT in Q scope — the marker pre-dates Q). value.js's BouncyTabs + UnderlineTabs are distinct primitives; the consumer is overriding reka-ui Tabs (the lower-level `<Tabs>` primitive). No regression today, but the consumer workaround should retire when the substrate lands. **Not a Q-wave item** — flagged as a longer-term substrate ask. |
| 21 | **`shadow-cartoon-{sm,md,lg}` Tailwind aliases bound to `--shadow-color`** | value.js's `palette-browser/SearchFilterBar.vue:76` uses `shadow-cartoon-sm hover:shadow-cartoon-md`. Tokens depend on `--shadow-color`. value.js overrides `--shadow-color: var(--foreground)` so swatches get a cartoon offset in both light/dark mode. | (baseline) | — | (stable since pre-P) | **CLEAN** — no regression. Documenting the binding for completeness. |
| 22 | **AnimatedDigit / Confirm-Dialog / Search / Configurator / GlassCarousel** | These subsystems are consumed; no recent edits touch their cosmetic surface. | — | — | — | **CLEAN** — verified by `git log --oneline -5` on each component dir — every one's last touch is pre-P. |
| 23 | **HoverCard / Popover / Dialog** | Used heavily in PaletteSlugBar, SwatchHoverMenu, FlagReportDialog. No recent edits. | — | — | — | **CLEAN** — stable since L → O era. |
| 24 | **Select / DropdownMenu** | Used at 8+ sites. value.js sets `--select-font` and `--dropdown-menu-font` to mono. | — | — | — | **CLEAN** — no recent cosmetic edits affect these. Note: the Q.W3 Lane C `dropdown-menu-font` scoped-style migration (item #17) MUST preserve the token name. |
| 25 | **Slider** | Used in ConfigSliderPane + ComponentSliders. `keepDockOpen` contract intact. | — | — | — | **CLEAN** — no recent slider edits. |
| 26 | **Aurora** | `demo/@/composables/useAtmosphere.ts` imports `useAuroraStudio`-style consumer wiring. No recent aurora edits (last: O.W4). | — | — | — | **CLEAN**. |
| 27 | **DarkModeToggle** | `dock-control` size carve at HEAD. value.js gets the dock-control size automatically. | — | — | — | **CLEAN** — stable since pre-K. |
| 28 | **GlassCarousel** | Used in ComponentSliders.vue (vertical label rail). No recent custom carousel edits. | — | — | — | **CLEAN**. |
| 29 | **BouncyTabs `pill` variant** | Used in PaneSegmentedControl + MixSourceSelector. | — | — | — | **CLEAN** — stable since V.W3 active-state canonicalisation (`3e925e1`). |
| 30 | **Dialog `DialogScrollContent`** | Used in PaletteDialog.vue. | — | — | — | **CLEAN** — last touch pre-O. |

---

## §3 Wave fold-in recommendations

### Q.W1 (consumer un-break)
The fleet-wide W1 work — keyframes.js exports + value.js outDir + value.js alias retire + glass-ui phantom devDep + 5-consumer `resolve.conditions` — is the headline. value.js's WIP branch shows that **W1's value.js writes are already pre-staged**. Q.W1's value.js lane confirms the WIP-vs-master canonical branch (Q-chron-1) and propagates the fix. **No new W1 inclusions from this Qθ sweep.**

### Q.W2 (Card cohesion + fail-explicit)
All 11 value.js `<Card variant="pane">` sites are migrated to `tier="wash" :shadow="false" :grain="false"` on the WIP branch. Q.W2's value.js lane is a confirmation pass + glass-ui `Card` invariant-31 fail-explicit work. **No new W2 inclusions from Qθ.**

### Q.W3 (core-feature cohesion — substrate transpositions)
Three Qθ findings reinforce existing Q.W3 lanes:
- **Item #15** — dock `data-density` split-brain (Q-coh-1). value.js does NOT consume `data-density` today, so the W3 Lane A consolidation is invisible to value.js but closes the cascade hazard before any future consumer (potentially a value.js admin pane) opts into compact/audacious density. **Re-affirm Lane A as planned**.
- **Item #16** — `.glass-cartoon` relocation (Q-coh-2). value.js consumes `--shadow-cartoon` via its `--shadow-card` overlay, NOT `.glass-cartoon` directly. The relocation is invisible to value.js. **Re-affirm Lane B as planned**.
- **Item #17** — DropdownMenu scoped-style migration (Q-coh-3). **Reinforce Q.W3 Lane C with a binding constraint**: the global-CSS migration MUST preserve `font-family: var(--dropdown-menu-font, inherit)` verbatim — value.js's mono-font dropdown is the load-bearing consumer of the token. Verify post-migration via a quick render check.
- **Item #18** — `beec35e` dock-duplication (Q-coh-5). value.js consumes the `.dock-layer-item-host` selector via `<DockLayer>`. **Re-affirm Lane C as planned**.

### Q.W4 (style + token co-location)
- **Item #19** — CSS budget rebaseline (Q-sty-6). No consumer effect. **Re-affirm Lane D as planned**.
- The four metric-stack + timeline private-token-dialect promotions (Q-sty-1, -2) and the manual `-webkit-backdrop-filter` excise (Q-sty-3) have **zero value.js consumer touch** — the affected SFCs are not consumed. **Confirm and proceed**.

### New proposed wave content — **NONE**.
Qθ did not surface any cosmetic regression that requires a new Q-wave or a wave amendment. The existing W1-W4 plan absorbs everything.

### Out-of-Q-scope flag (informational)
- **Item #20** — value.js's `.underline-tabs button[role="tab"][data-state="active"]` override is a consumer-side fossil pending a glass-ui `<Tabs variant="underline">` substrate. The marker comment dates to A.W2; not a Q item. Track for a future Tabs-variant wave (probably post-R).

---

## §4 Severity summary

Counts of the 30 matrix rows by recommendation verdict:

| Verdict | Count | Notes |
|---------|-------|-------|
| **N/A — primitive not consumed by value.js** | 10 | Items 1-6, 9-12 (the entire AF.W1 + most-of-post-P-shadow cohort) |
| **FOLD-IN to existing Q wave (no new wave)** | 6 | Items 7, 8, 15, 16, 17, 18 (W3 + strict-fix improvements that value.js already inherits) |
| **CLEAN — no recent change** | 9 | Items 21-29 (subsystems verified stable since pre-P) |
| **N/A — old change, baseline since pre-P** | 2 | Items 13, 14 |
| **Out-of-Q-scope** | 1 | Item 20 (Tabs underline variant — future substrate ask) |
| **REVERT** | 0 | No revert candidates. |
| **BOTH-PATHS-VIABLE** | 0 | No editorial choice surfaced. |
| **UNATTRIBUTED** | 0 | Every finding pinned to a commit or marked baseline. |

**Headline numbers**:
- P0/P1 cosmetic regressions reaching value.js from the recent cohort: **ZERO**.
- W3/W4 wave reinforcements: 6 items (all confirm-as-planned).
- New Q-wave additions: 0.
- The user's "audit our other consumers to look for what was modified in the last several tranches hereof, and plan to either PROPERLY fold in design items, or revert the changes entirely" directive resolves to: **fold-in (no reverts needed for value.js) — and the fold-in work is the existing Q.W3+W4 plan; Qθ does not expand it**.

---

## §5 Top-5 findings (priority-ordered for the orchestrator)

1. **Q.W3 Lane C MUST preserve `--dropdown-menu-font` token verbatim** (item #17). value.js sets it to `var(--font-mono)`; if the scoped-style migration drops the `font-family: var(--dropdown-menu-font, inherit)` declaration, value.js's mono-font dropdowns silently revert to inherited serif. **Binding constraint, not a bug** — confirm at W3 Lane C close.

2. **The `beec35e` inactive-layer fix is a strict-improvement for value.js's 4-layer dock** (item #7). Dock.vue stacks `mobile-edit`, `slug-edit`, `action-bar`, `main` layers; pre-fix, inactive layers answered `elementFromPoint()` and could intercept clicks meant for the active layer. The fix lands without consumer action — value.js inherits it through the symlinked `@mkbabb/glass-ui/dock` subpath. **Document, don't revert**.

3. **The `099d51e` edge-fade retire is a strict-improvement for value.js's bottom dock** (item #8). The 1rem transparent ramp at each edge dissolved the right-most control (ProfileSection's @mbabb chip) into the glass backdrop. The retire is a clean delete. **Document, don't revert**.

4. **value.js's WIP branch already ships Q.W1 + Q.W2 prep work** (§1.3). The canonical-branch resolution (Q-chron-1) is the load-bearing dispatch decision — the WIP branch has the demoConditions + outDir + Card migration + alias retire; if W1's value.js lane writes to master, it should merge from WIP rather than re-do. Confirm with the user before the W1 dispatch.

5. **The AF.W1 + post-P shadow cohort's primitive surface (Progress, MetricBadge, MetricRow/Stack, Timeline, DataTable, Toggle) has ZERO value.js consumers** (items #1-6, 9-12). Speedtest is the primary consumer of these primitives; bbnf-buddy is the secondary. value.js consumes the dock subsystem heavily but not the AF-tranche primitives. **No revert candidates for value.js**.

---

## §6 Status

COMPLETE — Qθ value.js cosmetic regression sweep. 30 surfaces inspected; zero P0/P1 regressions found; all six fold-in items confirm existing Q.W3+W4 lanes; one binding constraint flagged for Q.W3 Lane C (`--dropdown-menu-font` token preservation). Deliverable handed off to Q orchestrator for synthesis. No source mutations; no mutating git in either repo. Read-only forensic lane.
