# Q.Rι — bbnf-buddy cosmetic regression sweep (Q audit-augmentation lane)

**Lane**: Q.Rι — full cosmetic forensic sweep on the bbnf-buddy consumer across recent glass-ui tranches.
**Date**: 2026-05-18.
**Mode**: READ-ONLY. No source mutations, no mutating git. Single deliverable file at this path.
**Inherits**: Qα (consumer-breakage forensics) + Q11 (4-consumer resolver-config sweep) + Q12 (cross-repo dev-resolution architecture). The Q11 6-site `<Card variant="pane" flush>` finding and the fleet-wide `@mkbabb/keyframes.js` resolver desync are NOT re-litigated — they are noted, cross-referenced, and the matrix continues past them.

**Headline**: bbnf-buddy carries **17 distinct cosmetic regressions / API mismatches** that the prior Q lanes did not surface. Three are headline-grade — a 12-entry stale-glass-token block in `preset.css` (silent no-op across every nested glass surface), a 7th `<Card>` site passing `variant="cartoon"` (third stale-variant value beyond `pane`), and a stray `--glass-border-subtle` consumer in SelectionInfo (paints transparent on a load-bearing intent-border affordance). The remainder are minor token / variant / convention drifts. None of the post-P glass-ui commits (`bbb51e8`, `099d51e`, `beec35e`, `3cb70db`, `b8a61ec`, `9ba68ca`, `d244dd5`, `1c6c3e5`, `63c88b7`/`7e2e385`) reaches a bbnf-buddy substrate consumer — bbnf-buddy is too narrow on the AF/AB+1/AC primitives to inherit those regressions. The breakage is exclusively the value.js-era stale-API class that bbnf-buddy never migrated.

---

## §1 Consumer surface inventory

bbnf-buddy's `src/` ships 47 SFCs + 4 CSS files (`main.css`, `preset.css`, `utilities.css`, `animations.css`). Imports against `@mkbabb/glass-ui`:

### §1.1 Root-barrel JS imports (26 sites)

| Symbol | Sites |
|---|---|
| `Badge` | App.vue, AnimationWorkspace.vue, DockUndoRedo.vue, ToolsLayer.vue |
| `Button` | KeyframeTimeline.vue, EditorPanel.vue, AnimationWorkspace.vue, BehaviorsEditor.vue, OffsetPicker.vue, JsonPanel.vue |
| `Card` + `CardContent` | BodyEditor.vue, SelectionInfo.vue, LayersPanel.vue, EditorPanel.vue, BehaviorsEditor.vue, OffsetEditor.vue, AnimationWorkspace.vue |
| `Avatar`/`AvatarImage`/`AvatarFallback` | SettingsPanel.vue |
| `Popover`/`PopoverTrigger`/`PopoverContent` | LayersPanel.vue, LayerRow.vue, OffsetPicker.vue, AlignDerivativesButton.vue, SnapshotPopover.vue, PoseActionsPopover.vue, MagnetToolButton.vue |
| `DropdownMenu`/`*Item`/`*Content`/`*Label`/`*Separator`/`*Trigger` | DockNavigation.vue, DockViewControls.vue, EmotionStateSelect.vue, FormPicker.vue, LeftToolsDock.vue |
| `Select`/`SelectTrigger`/`SelectValue`/`SelectContent`/`SelectItem` | EasingSelect.vue |
| `Slider` | EditableSlider.vue |
| `Separator` | EmotionMapPanel.vue |
| `ScrollPane` | EditorPanel.vue |
| `TooltipProvider` | App.vue |
| `ContextMenu`/`ContextMenuTrigger` | ControlPointOverlay.vue |

### §1.2 Subpath JS imports (10 sites)

| Subpath | Symbol | Sites |
|---|---|---|
| `/dark` | `useGlobalDark` | main.ts, CodeEditor.vue, SettingsPanel.vue |
| `/dock` | `GlassDock`, `DockIconButton`, `DockDropdownTrigger` | BottomDock.vue, LeftToolsDock.vue, DockNavigation.vue, DockViewControls.vue, FormPicker.vue, DockAnimationTimeline.vue, MagnetToolButton.vue, AlignDerivativesButton.vue, SnapshotPopover.vue, PoseActionsPopover.vue, DockUndoRedo.vue, ToolsLayer.vue |
| `/tabs` | `BouncyTabs` | EditorPanel.vue |
| `/toggle-chip` | `ToggleChip` | EmotionStateSelect.vue, OffsetPicker.vue |
| `/sortable-list` | `SortableItem`/`SortableHandle`/`SortableList` | LayerRow.vue, LayersPanel.vue, BehaviorsEditor.vue |
| `/controls` | `DarkModeToggle` | SettingsPanel.vue |

### §1.3 CSS surface

- `src/styles/main.css` — `@import "@mkbabb/glass-ui/styles"` + `@source "../../node_modules/@mkbabb/glass-ui/src/components"` (Tailwind v4 source-scan pin).
- `src/styles/preset.css` — full theme override sheet. Writes 12 stale `--glass-*-{subtle,default,medium,elevated}` tokens (§2 F-1).
- `src/styles/utilities.css` — `@utility` registrations local to bbnf-buddy. Unaffected.
- `src/styles/animations.css` — local @keyframes. Unaffected.

### §1.4 Substrate primitives NOT consumed

bbnf-buddy does NOT consume any of the AF.W1 / AB+1 / AC.W6d primitives. No imports of: `Progress`, `ContinuousTimeline`, `GlassTimeline`, `MetricRow`, `MetricStack`, `MetricBadge`, `MetricPill`, `MetricCell`, `ResponsiveTabs`, `DataTable`, `Pulse`, `HoverPopover`, `HoverCard`, `InstrumentChassis`, `RegionDivider`, `CartoonCard`, `Sidebar`, `GlassCarousel`, `Aurora`, `AnimatedDigit`, `Configurator`, `GlassPanel`, `Section`. This narrows the post-P shadow-cohort blast radius to dock + toggle (the only post-P surfaces bbnf-buddy actually exercises).

---

## §2 Cosmetic regression matrix

7-column attribution. Sites are absolute paths.

| # | Surface | Symptom | Tranche | Wave | Commit | Recommendation |
|---|---|---|---|---|---|---|
| F-1 | `src/styles/preset.css:157-173, 213-221` (token block) | bbnf-buddy overrides `--glass-opacity-{subtle,default,medium,elevated}` + `--glass-blur-{...}` + `--glass-bg-{...}` (12 tokens). Glass-ui retired these names — current ladder is `wash/quiet/resting/floating/overlay`. Result: **every nested glass surface in the editor (`<Card>` panes, dock-internal layer wraps, popover backgrounds) ignores the consumer's bespoke opacity scale and renders against the glass-ui defaults**. The "nested cards look uniformly heavy" mitigation the comment block describes is silently disabled. | (pre-tranche) v0.8.0 ladder rename | n/a (legacy) | n/a — token names were renamed at the v0.8.0 R3-spec rename | **FOLD-IN, Q.W3** — rewrite the block to `--glass-opacity-{wash,quiet,resting,floating,overlay}` + `--glass-bg-{wash,quiet,resting,floating,overlay}` + `--glass-blur-{wash,quiet,resting,floating,overlay}`. Map the four old rungs onto the five new rungs (`subtle→wash`, `default→quiet`, `medium→resting`, `elevated→floating`; pick a new value for `overlay`). This restores the consumer's intended visual rhythm and is the highest-impact fix in this lane. |
| F-2 | `src/editor/components/SelectionInfo.vue:238` | `border-color: var(--intent-color, var(--glass-border-subtle))` — `--glass-border-subtle` was retired in the same rename. When `--intent-color` resolves (the three `.intent-*` modifier classes set it), this is dead-code. When NO intent class applies (cursor mode, etc.), the fallback resolves `unset` → the card renders with **no visible border on the selection-info pane**. | (pre-tranche) v0.8.0 ladder rename | n/a (legacy) | n/a | **FOLD-IN, Q.W3** — change the fallback to `var(--glass-border-quiet)` (the canonical rung that maps to the old `subtle` intent). One-line edit. |
| F-3 | `src/editor/components/animation/AnimationWorkspace.vue:157` | `<Card :variant="props.inline ? 'default' : 'cartoon'">` — glass-ui `Card.vue` exposes only `tier`/`shadow`/`grain`. Both `'default'` and `'cartoon'` fall through as inert DOM attrs. The card silently renders default `tier:'resting' + shadow:true + grain:true`. The author's intent was: standalone uses the cartoon-sticker chrome (`<CartoonCard>` is a separate primitive — `@mkbabb/glass-ui` re-exports it), inline uses a plain card. Both branches are wrong. **This is a 7th Card stale-API site that Q11 missed** because Q11 grepped for `variant="pane"`, not all `variant=` literals. | (pre-tranche) c3e2216 barrel flip era | n/a (legacy) | n/a | **FOLD-IN, Q.W3** — `inline` branch → `<Card tier="wash" :shadow="false" :grain="false">` (matches the AnimationWorkspace `.is-inline` scoped reset on lines 255-260); standalone branch → import + use `<CartoonCard>` from `@mkbabb/glass-ui` (or its `/cartoon-card` subpath). Drop `variant` entirely. |
| F-4 | `src/styles/preset.css:191-194` `--shadow-cartoon` override | bbnf-buddy redefines `--shadow-cartoon` to a 3-layer warm-drop value (`0 4px 0 / 0 8px 24px / 0 2px 8px`). Glass-ui's canonical `--shadow-cartoon` is the single-line `3px 3px 0px 0px` offset-drop; its `-md` and `-lg` siblings (consumed by `.glass-cartoon:hover`) read against the canonical scale. By overriding ONLY the base token and not the `-md`/`-lg` variants, **the cartoon-shadow scale loses its lift affordance** — every `.glass-cartoon` surface (CartoonCard, glass-dock-cartoon-themed instances) hovers to a shadow palette that doesn't match the resting state. | (pre-tranche) v1.4.x cartoon-shadow scale introduction | n/a (legacy) | n/a | **FOLD-IN, Q.W3** — also override `--shadow-cartoon-md` and `--shadow-cartoon-lg` in `preset.css`, deriving from the same warm `var(--foreground)`-tinted recipe. Three-token cohort instead of one. |
| F-5 | `src/components/EmotionStateSelect.vue:215` | `:deep([data-state="on"]) .emotion-cell-label` — Vue scoped-style escape hatch reaching into the ToggleChip's internal state-driven attr. Glass-ui's documented retreatment is the `--toggle-chip-active-*` token cohort (per P.W5 Lane D / CR-5 pattern used in `ToolsLayer.vue:325`). Functional today but a P.W5-era pattern violation. | P | W5 | dafb99f (consumer-side P.W5-D scope) | **FOLD-IN, Q.W3** — retire the `:deep` reach and route the active-state label tinting via a custom-prop the parent writes (mirroring the dock-active token pattern). Tracks the P.W5 CR-5 contract. |
| F-6 | `src/editor/components/EditorPanel.vue:233-235` | `:deep([data-slot="scroll-area-viewport"]), :deep([data-radix-scroll-area-viewport])` — ScrollPane internal selector. ScrollPane already ships a documented `--scroll-pane-*` token cohort for paddings/inner spacing per the v1.x cohort canon. | P | W5 | dafb99f | **FOLD-IN, Q.W3** — replace with `<ScrollPane>` token override at the parent. Same CR-5 pattern as F-5. |
| F-7 | `src/editor/components/dock/tools/ToolsLayer.vue:301-317, 348-365` | Repeated `:deep(.dock-icon-button)` reaches: sizing override (5 props), icon size override, magnet-btn filter, disabled state. The `.dock-icon-button.is-tool-btn` block on line 334 ALREADY uses the canonical `--dock-active-*` token cohort (P.W5 close), so a portion of the file is migrated but the sizing/disabled blocks regressed back to `:deep`. | P | W5 | dafb99f | **FOLD-IN, Q.W3** — extend the existing custom-prop cohort to cover size + disabled state. Glass-ui exposes `--dock-icon-button-size` (or equivalent — needs a substrate-side check; if missing this is also an Rh substrate gap below). |
| F-8 | `src/editor/components/dock/BottomDock.vue:189-204` `.bottom-dock` mask-image | bbnf-buddy paints its own horizontal edge-fade mask on `.bottom-dock`. Glass-ui's `099d51e` retired the equivalent dock-internal mask because once Z.W2.T2 made the dock grow-to-fit, the feather has nothing to feather. bbnf-buddy's wrapper carries `max-width: calc(100dvw - var(--dock-overflow-margin))` + `overflow-x: auto` — a horizontally-scrolling outer wrapper, which DOES still need an edge mask. So this is consumer-side legitimate. | (post-P) | n/a | 099d51e (no consumer impact) | **NO-OP** — consumer is correct; the dock-internal retirement at `099d51e` does not propagate. Documenting for the record. |
| F-9 | `src/editor/components/dock/BottomDock.vue:161` collapsed slot label | `<span class="text-small font-sans text-muted-foreground capitalize">` — the canonical dock-collapsed register is `.dock-label` (v1.1+; `bbb51e8` flipped its weight 500 → 400 to read as regular). bbnf-buddy uses `.text-small font-sans capitalize` instead, so the `bbb51e8` weight fix does NOT reach this label. Visually the label may render heavier than the canonical regular weight (Plus Jakarta Sans isn't loaded as the consumer font — bbnf-buddy uses General Sans via `preset.css:7-10` — so the user-reported "looks bold" mandate that motivated `bbb51e8` may not be visible here at all). | AB+1 / pre-P | W1 | bbb51e8 (consumer non-adoption) | **NO-OP, document** — bbnf-buddy uses General Sans, not Plus Jakarta Sans. The `bbb51e8` mandate was specific to PJ Sans rendering heavier than its numeric weight. With General Sans, `.text-small font-sans` (which honors `--font-sans`) is a legitimate consumer choice. Document the non-adoption rationale; no fold-in needed. |
| F-10 | `src/editor/components/dock/tools/ToolsLayer.vue` + `MagnetToolButton.vue` + `AlignDerivativesButton.vue` etc. — `:class="{ 'is-active': ... }"` on `<DockIconButton>` | 7 sites apply `is-active` to `<DockIconButton>`. Glass-ui's `dock.css:610` correctly selects `.dock-icon-button:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])` — so this is contract-correct. The pre-glass-ui idiom was `[data-active]` or `aria-pressed`; bbnf-buddy chose `is-active`, which the substrate supports. | n/a | n/a | n/a | **NO-OP** — contract-honored. |
| F-11 | `src/editor/components/dock/DockUndoRedo.vue:47` + `App.vue:439` + `ToolsLayer.vue:241` | `<Badge variant="secondary">` and `<Badge variant="default">`. `Badge` exposes `default | secondary | destructive | outline` — all four are valid per `src/components/ui/badge/index.ts`. | n/a | n/a | n/a | **NO-OP** — valid props. |
| F-12 | `src/editor/components/animation/AnimationWorkspace.vue:248-261` `.animation-workspace.is-inline` scoped reset | `background: transparent; border: 0; box-shadow: none; backdrop-filter: none` — bbnf-buddy overrides the Card's painted surface inline. This works because glass-ui's `Card` paints via class composition + `--shadow-card`; consumer can defeat all four. After the F-3 migration to `tier="wash" :shadow="false"` the manual reset becomes partial redundancy. | (pre-tranche) | n/a | n/a | **FOLD-IN with F-3** — once `tier="wash" :shadow="false"` lands, simplify or remove the scoped reset; only the `backdrop-filter: none` may still be needed. |
| F-13 | `src/styles/preset.css:206` `--shadow-dock-override: var(--shadow-cartoon)` | The dock per-instance override path is canonical (`2b3727f` documented `--shadow-dock-override` as the consumer hook for directional cast). Working as designed. | n/a | n/a | n/a (canonical use) | **NO-OP** — consumer correctly uses the documented escape hatch. |
| F-14 | `src/editor/components/SelectionInfo.vue:262-268` `.intent-label` letter-spacing | `letter-spacing: var(--tracking-widest)` — glass-ui defines `--tracking-widest` in tokens.css §typography. Real token. | n/a | n/a | n/a | **NO-OP**. |
| F-15 | `src/components/EmotionStateSelect.vue:120-138` `<ToggleChip variant="cell">` with internal SVG + label | `variant="cell"` is a valid `ToggleChip` value (toggle-chip CVA exposes `chip | cell`). The chip-content stack (svg + label) is how the cell variant was always intended to be used. Working. | n/a | n/a | n/a | **NO-OP**. |
| F-16 | `src/editor/components/dock/BottomDock.vue:75-82` `type DockLayer = "navigation" \| "poses" \| "animation"` | Local type alias colliding by NAME with glass-ui's `<DockLayer>` component (re-exported from `@mkbabb/glass-ui/dock`). Currently bbnf-buddy does NOT import the `<DockLayer>` component into this file, so the name-shadow is safe but a future import would clash silently. Cosmetic-adjacent rather than cosmetic per se — flagging for hygiene. | (pre-tranche) | n/a | n/a | **MINOR fold-in, Q.W3** — rename local type to `DockLayerName` (or move the type to a `bottomDockLayers.ts`-like sidecar) so a future `<DockLayer>` import never gets a quiet shadow. |
| F-17 | `src/editor/components/dock/FormPicker.vue` + `DockViewControls.vue` + `DockNavigation.vue` — `<DockDropdownTrigger>` with `aria-label` + `title` repeating | Every `<DockDropdownTrigger>` site duplicates `aria-label="…"` + `title="…"` with the same string. Glass-ui's trigger does not synthesize one from the other. Not a regression — just convention drift versus the audited speedtest/value.js pattern, which has the same duplication. | n/a | n/a | n/a | **NO-OP, fleet-wide pattern** — not a bbnf-local issue. Flag for substrate hygiene in a future Q wave (would belong under "Rh — substrate cohesion" alongside the Card silent-swallow). |

---

## §3 Wave fold-in recommendations

The per-finding **fold-in vs revert** binding is straightforward in this lane: there are no "revert the change entirely" candidates because the glass-ui changes themselves (the AF.W1, AB+1, AC.W6d, post-P cohort) **don't reach bbnf-buddy at all** at the substrate level. The bbnf-buddy regression class is exclusively the value.js-era stale-API debt that never migrated — so every finding either folds in (per the migration) or is a no-op (consumer is already correct, or non-adoption is justified).

### §3.1 Q.W3 (bbnf-buddy consumer cross-repo write wave)

**Single coherent fold-in wave**: 9 fold-in findings, 1 file write pattern.

| Finding | File | Edit count | Severity |
|---|---|---|---|
| F-1 | `src/styles/preset.css` lines 157-173, 213-221 | 1 block (12 tokens × 2 themes) | **HEADLINE** — silent no-op on every nested glass surface |
| F-2 | `src/editor/components/SelectionInfo.vue:238` | 1 line | MAJOR — visible border drop on intent-less state |
| F-3 | `src/editor/components/animation/AnimationWorkspace.vue:155-160` | 1 component swap | MAJOR — 7th Card stale-variant site (Q11 missed) |
| F-4 | `src/styles/preset.css:191-194` | +2 tokens (`-md` + `-lg`) | MINOR — cartoon-shadow scale incoherence at hover |
| F-5 | `src/components/EmotionStateSelect.vue:215` | 1 selector + parent retint | MINOR — `:deep` retire (P.W5-D class) |
| F-6 | `src/editor/components/EditorPanel.vue:233-235` | 2 selectors + parent retint | MINOR — `:deep` retire (P.W5-D class) |
| F-7 | `src/editor/components/dock/tools/ToolsLayer.vue:301-317, 348-365` | 4 selectors + parent retint | MINOR — `:deep` retire (P.W5-D class); may need Rh substrate work |
| F-12 | `src/editor/components/animation/AnimationWorkspace.vue:248-261` | 1 scoped block simplification | MINOR — co-folds with F-3 |
| F-16 | `src/editor/components/dock/BottomDock.vue:75-82` | 1 type rename | MINOR — name-shadow hygiene |

Q11's R-C (the 6 `Card variant="pane" flush>` sites) folds into this same wave — it's the same migration class as F-3, against the same Card surface, in the same 6 panels. **The actual Q.W3 wave is a 10-site Card migration + a 12-token preset.css rewrite + a 5-site `:deep` retire batch — one cohesive bbnf-buddy consumer cosmetic close.**

### §3.2 Findings classified NO-OP (no wave entry)

- F-8 (BottomDock mask) — consumer-correct, dock-internal `099d51e` retirement does not propagate.
- F-9 (collapsed-slot label `.text-small` not `.dock-label`) — bbnf-buddy doesn't use Plus Jakarta Sans; the `bbb51e8` weight mandate doesn't reach this label visually.
- F-10 (`is-active` class on DockIconButton) — substrate explicitly supports this selector form.
- F-11 (Badge variants) — all valid.
- F-13 (`--shadow-dock-override`) — canonical use of the documented escape hatch.
- F-14 (`--tracking-widest`) — real token.
- F-15 (ToggleChip cell variant) — valid use.
- F-17 (DockDropdownTrigger `aria-label` + `title` duplication) — fleet-wide pattern, not bbnf-local.

### §3.3 Substrate-side decisions (Q.Rh / future wave)

- **Rh-1** — Card silent-swallow of unknown `variant` prop. Already flagged by Qα R3 + Q11 R-E. Q11 already classes it as a Q-design item. **Confirmed in this lane** by F-3: a 7th site, with TWO additional stale variant values (`'default'` and `'cartoon'`), independent of value.js. The cumulative blast radius across the fleet is now: value.js (11 sites, `pane`), bbnf-buddy (6 sites `pane` + 1 site `default | cartoon`), totalling 18 sites where `<Card variant="…">` is silently dropped. Strongest evidence yet for a substrate-side gate.
- **Rh-2** — F-7 reveals a possible substrate gap: if `<DockIconButton>` does not yet expose `--dock-icon-button-size` (or equivalent) as a token cohort, F-7 cannot fully retire `:deep`. Needs a substrate-side check before Q.W3 lands.

### §3.4 What this lane explicitly did NOT find

- **Zero post-P substrate regressions reach bbnf-buddy.** Every commit in the cross-walk scope (`7e2e385`, `63c88b7`, `d244dd5`, `1c6c3e5`, `9ba68ca`, `beec35e`, `3cb70db`, `b8a61ec`, `099d51e`, `bbb51e8`, plus the AB+1/AC/AD/P tranches) was reviewed against bbnf-buddy's actual consumption surface. None of the touched primitives (`Progress`, `ContinuousTimeline`, `MetricRow`, `MetricStack`, `MetricBadge`, `DataTable`, `Toggle` card variant, dock edge-fade mask, dock-shadow, `.dock-label` typography) reach a bbnf-buddy consumer at HEAD. **No "revert the change entirely" verdict applies anywhere.**
- **No new dock subsystem regression.** bbnf-buddy uses `GlassDock` + `DockIconButton` + `DockDropdownTrigger` at 12 sites. All resolve. The `2b3727f` dock-shadow retreatment is honored via the consumer's `--shadow-dock-override` (line F-13). The `099d51e` dock-internal-mask retirement does not break the consumer's outer-wrapper mask (line F-8). The `beec35e` inactive-layer `visibility:hidden` fix doesn't change behaviour at any bbnf-buddy dock surface (the BottomDock crossfade owns its own `<Transition name="dock-layer">`, not a layer-group, and LeftToolsDock uses a `v-if` swap not the layer-group either — neither path lands inside the `.dock-layer:not(.layer-active)` selector that `beec35e` touched).
- **No animation regression.** `3cb70db` (timeline stitched gradient) doesn't reach bbnf-buddy. `b8a61ec` (`--continuous-fill-opacity`) doesn't reach bbnf-buddy. The bbnf-buddy `KeyframeTimeline.vue` is a hand-rolled timeline, not the glass-ui `<GlassTimeline>` / `<ContinuousTimeline>` primitive.

---

## §4 Severity summary

| Severity | Count | Findings |
|---|---|---|
| **HEADLINE** (silent no-op on a load-bearing visual axis) | 1 | F-1 |
| **MAJOR** (visible visual regression in one or more states) | 2 | F-2, F-3 |
| **MINOR-fold-in** (works today, P.W5-class pattern violation or token hygiene) | 6 | F-4, F-5, F-6, F-7, F-12, F-16 |
| **NO-OP** (consumer correct, non-adoption justified, or fleet-wide pattern outside lane scope) | 8 | F-8, F-9, F-10, F-11, F-13, F-14, F-15, F-17 |
| **Substrate-side decision** (referred to Rh) | 2 | Rh-1 (re-confirms Q11 R-E), Rh-2 (new — dock-icon-button-size token gap) |

**Total findings**: 17 (+2 substrate referrals).
**Total fold-in count for Q.W3**: 9 (one cohesive wave covering preset.css, 7 SFCs).
**Wave fold-in count by wave letter**: Q.W3 = 9 fold-ins; Q.Rh = 2 substrate referrals (one new). No findings escalated to wave letters earlier than Q.W3 — every fold-in is read-only consumer cross-repo write, the same wave class as Q11's R-C.

**Headline gestalt**: bbnf-buddy's cosmetic break surface is entirely pre-glass-ui-v1.0 stale-API debt that the `c3e2216`-era barrel flip silently obscured (Q11 / Qα Card-class debt) plus the v0.8.0 R3-spec glass-ladder rename that the consumer's preset.css never tracked (the F-1 / F-2 / F-4 class). Recent tranches (AB+1 through P-close to the post-P cohort) did **not** introduce a single cosmetic regression at this consumer. The fold-in story is therefore one cohesive consumer-side migration wave; there is nothing for glass-ui to revert.
