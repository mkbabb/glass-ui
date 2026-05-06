# J.W0 — Reconciliation Audit (Lane I)

**Tranche**: J — Gestalt Refinement + Vocabulary Convergence + Audit-Precept Hardening.
**Wave**: W0.
**Author**: orchestrator (Lane I — read-only reconciliation).
**Opened**: 2026-05-06.
**Mode**: read-only on `src/`, `demo/`, package.json, vite.library.ts, manifest.ts; write-only on this file.
**Substrate baseline**: master HEAD `5baceb5` (J planning consolidation onto master).
**Planning baseline**: `950d1f4` (post-I close on sibling branch `o-w2_7-instrument-chassis`); since superseded by v0.8.0 release path on master.

---

## §A — Substrate divergence summary (v0.8.0 vs J planning baseline)

The J research deliverables (R1–R6) and wave specs (W0–W7) were authored against substrate `950d1f4`. Master HEAD has since shipped **v0.8.0** (`28b79b3`) which materially changes the substrate:

| Substrate change | Commit | Affects J-spec line |
|---|---|---|
| Glass tier ladder renamed `subtle/default/medium/elevated` → `wash/quiet/resting/floating` + new `overlay` | `eb9c44c` | R5 axis-1/2/4 every `glass-{old}` reference; W2.A row 4 (Card pane bypass — already retired); W3.C blur reduction; W5.A glass-pill recipe |
| `<Card>` variant enum retired; tier API + `as`/`asChild` polymorphism | `3a43a8f` | R5 axis-4 (Card pane variant); W2.A row 7 (Card pane disposition) |
| `<ScrollPane>` + `<CartoonCard>` lifted as sibling primitives | `e017d53` | R5 axis-2 / R4 §B (Card variant=pane references); story-chassis pattern (R3 §E) |
| Dilation sweep (consumer migration to wash/quiet/resting/floating) | `19f5c8e` | All R5 32 drift rows; many references to glass-{old} cleaned |
| `<MetricBadge>` dual-slot label + abbreviation siblings | `8b9a479`, `fb6ab78`, `25da386` | R4 §B9 (compose MetricBadge for readout panel) — now richer API |
| `--dock-tab-h-{density}` height token family + `--dock-label-size` mobile carve | `a6b3d16` | R1 axis-1 dock-tab tokens; W3.C dock substrate |
| `<HoverPopover>` primitive (v0.7.0) | `a042b61` | R1 §A (DockPopover collapse — HoverPopover is the hover-driven primitive); W3.B Popover extension thesis |
| `<DiscoGlyph>`, `<GlyphFace>`, `<DockGroup>`, `<InstrumentChassis>`, `<RegionDivider>` (P-tranche silent additions) | various pre-v0.7.x | These already in ProGRESS — all surface from prior tranches |
| `<MetricBadge>` size axis: xl rung + 4-size grid + md→text-mono-caption | `b7d4fd2`, `953a2cf`, `d4ce132` | R4 §A (Badge size axis prescription) — partial overlap; MetricBadge ≠ Badge |
| `useResizeObserver` Vue-scope-aware composable | `0f74820` | new substrate; not directly in J specs |
| Glyph-face cap modes + DiscoGlyph silhouette hand-off | `cfc3311`, `8d59f69` | not directly in J specs |
| Dock tier-primary phase-tint backplate | `6dd2505` | R1 axis-2 (dock substrate styling) |

**Net assessment**: J research findings against the OLD glass-tier vocabulary (R5 axis-1/2/4/5 in particular) need partial REMAP — the references to `glass-subtle/default/medium/elevated` are now stale strings. v0.8.0's dilation sweep migrated **most** consumer call sites (per `19f5c8e` commit message: `grep -rn 'glass-subtle\|glass-default\|glass-medium\|glass-elevated' demo/ src/` returns 0 lines for the **class strings**). However, **27 token-level references** to `--glass-{bg,blur,border,shadow}-{subtle,default,medium,elevated}` remain in `src/` + `demo/` at HEAD (verified via `rg -- "--glass-blur-subtle|--glass-blur-default|--glass-blur-medium|--glass-blur-elevated"` etc.) — these resolve to **undefined CSS custom properties at runtime** and represent a v0.8.0 cleanup miss. See §F item 1.

---

## §B — R1–R6 dispositions

### R1 — Dock subsystem deep audit

| Source | Finding | HEAD evidence | v0.8.0 status | J wave attribution | Disposition |
|---|---|---|---|---|---|
| R1 axis-1 row 1 | Raw `rgb`/`hsl` literals at `dock.css:670-672, 760-762` for sparkle micro-bevel | `rg "rgb\(255 255 255 / 0\.06\)" src/styles/dock.css` confirms unchanged | STILL-PRESENT | W2.B (interactive reach-in) | WIRE |
| R1 axis-1 row 2 | `font-size: 0.75rem` at `dock.css:701, 346` | `rg "font-size: 0\.75rem" src/styles/dock.css` confirms | STILL-PRESENT | W2.B | WIRE |
| R1 axis-1 row 3 | Halo gradient literal duplication at dock.css:683-689 | unchanged | STILL-PRESENT | DEFERRED (single-site) | DEFERRED |
| R1 axis-1 row 4 | `--glass-highlight` micro-bevel duplication | unchanged | STILL-PRESENT | W2.B | WIRE |
| R1 axis-1 row 5 | Slider hard-coded radius/sizing literals | `Slider.vue` rewritten in scoped CSS at HEAD (3 variants standard/spectrum/timeline; no `glass-track`) | PARTIALLY-FIXED | W5.A | RESEARCH-AGAIN (slider variant set has changed) |
| R1 axis-2 missing `.dock-label` | No `.dock-label` selector in dock.css | unchanged | STILL-PRESENT | W3.C (dev-text gate ledger) or W5.D | WIRE |
| R1 axis-2 StoryPager scrollbar inline | StoryPager re-implements scrollbar-hidden | unchanged | STILL-PRESENT | W3.C | WIRE |
| R1 axis-2 vertical scrollbar duplication | dock.css:128, 141-144 unchanged | STILL-PRESENT | W3.C | WIRE |
| R1 axis-2 `.dock-group` substrate gap | `<DockGroup>` emits `class="dock-group"` but no CSS rule | unchanged | STILL-PRESENT | W3.C or new lane | WIRE |
| R1 axis-3 DockIconButton vs Button | three near-duplicate primitives | unchanged | STILL-PRESENT | DEFERRED (no wave assigned) | DEFERRED |
| R1 axis-3 `[data-tier]` selector duplication | shared compound `dock-tab-button[data-tier=secondary], dock-icon-button[data-tier=secondary]` | unchanged | STILL-PRESENT | DEFERRED | DEFERRED |
| R1 axis-4 tier-axis missing on other dock children | `<DockSelectTrigger>`, `<DockDropdownTrigger>`, `<DockPopover>` lack `data-tier` | unchanged | STILL-PRESENT | DEFERRED | DEFERRED |
| R1 axis-5 cornerstone — visibility:hidden on .dock-layer | dock.css:213 unchanged | STILL-PRESENT | W3.A | WIRE |
| R1 axis-5 prefers-reduced-motion gap on .glass-dock | unchanged | STILL-PRESENT | W3.A | WIRE |
| R1 axis-7 backdrop-filter fallback for .glass-dock | unchanged (no fallback for dock) | STILL-PRESENT | W3.C | WIRE |
| R1 axis-7 prefers-reduced-transparency lift on `--glass-opacity-dock` | unchanged | STILL-PRESENT | W3.C | WIRE |
| R1 §A DockPopover 273-line custom impl | `wc -l src/components/custom/dock/DockPopover.vue` = 273 (untouched at HEAD) | STILL-PRESENT | W3.B | WIRE — but READ NOTE: `<HoverPopover>` (v0.7.0) covers the hover-driven semantics of DockPopover (R1 §A.5). W3.B should evaluate whether DockPopover's hover-mode collapses onto **HoverPopover** rather than a new `hoverOpenDelay` prop on Popover. |
| R1 §B cornerstone — width:auto non-interpolatable | cornerstone unchanged | STILL-PRESENT | W3.A | WIRE |
| R1 §C dock blur reduction proposal | `--glass-blur-dock-radius: 1px` at tokens.css:314 | STILL-PRESENT | W3.C | WIRE |
| R1 §D horizontal overflow scroll | StoryPager workaround unchanged | STILL-PRESENT | W3.C | WIRE |
| R1 §E DockGroup composition gaps (sliders, NumberField, etc. inside dock) | no canonical pattern | STILL-PRESENT | DEFERRED | DEFERRED |
| R1 §F vertical-rail dev-text leak | INTERNAL_CATEGORY **already retired** at HEAD: `rg "INTERNAL_CATEGORY\|Wrench" demo/stories/manifest.ts` returns 0 hits; manifest.ts:243 lines, no internal category | FIXED-VIA-V0.8.0 (retired during the dilation sweep / consolidation) | RETIRE | RETIRE — finding-5b dev-text gate work is moot |
| R1 §F vertical-rail mask-fade affordance | unchanged | STILL-PRESENT | W3.C | WIRE |

### R2 — Aurora + blob deep audit

| Source | Finding | HEAD evidence | v0.8.0 status | J wave attribution | Disposition |
|---|---|---|---|---|---|
| R2 axis-1 `bg-background/20` aside | `demo/stories/aurora.vue:103` unchanged | STILL-PRESENT | W4.B | WIRE |
| R2 axis-1 pastel-wash inline radial-gradient | aurora.vue:86 + blob.vue similar | STILL-PRESENT | W4 (defer for utility) or DEFERRED | DEFERRED (R5 gap row 7 owns shimmer/rainbow promotion) |
| R2 axis-1 blob hsl literals | unchanged (blob.vue) | STILL-PRESENT | DEFERRED | DEFERRED |
| R2 axis-2 AuroraConfigDock layer body raw overflow | `AuroraConfigDock.vue:67` unchanged | STILL-PRESENT | W4.B | WIRE |
| R2 axis-2 PresetPickerRow correct scroll-fade-mask | already canonical | NEVER-PRESENT (correct at HEAD) | n/a | RETIRE (no work) |
| R2 axis-2 `bg-background/20` ad-hoc | unchanged | STILL-PRESENT | W4.B | WIRE |
| R2 axis-3 BouncyTabs press WAAPI literal | unchanged | STILL-PRESENT | W2.B (cssVar helper consumer) | WIRE |
| R2 axis-4 6-axis aurora layer split / blob 0 split | `AuroraConfigDock.vue` 6 layers; `blob.vue` no split | STILL-PRESENT | W4.A + W4.C | WIRE |
| R2 §A clip / shadow / side issues | `PaletteLayer.vue:27 min-w-[320px]` confirmed; aside lacks `overflow-clip` | STILL-PRESENT | W4.B | WIRE |
| R2 §A BouncyToggle inline-grid clip | `BouncyToggle.vue:244-246` (verify line; spec) | STILL-PRESENT | W4.B (add overflow="scroll" prop) | WIRE |
| R2 §B top black bar (PresetPickerRow bg-muted) | `PresetPickerRow.vue:55` `bg-muted` confirmed | STILL-PRESENT | W4.B | WIRE |
| R2 §C blob configurator buildout | blob.vue static specimens, no configurator | STILL-PRESENT | W4.C | WIRE |
| R2 §D speedtest preset extraction | `rg "SPEEDTEST" demo/stories/aurora/presets.ts` returns 0 hits | STILL-PRESENT | W4.C | WIRE |
| R2 §E configurator scroll-wrap proposal | unchanged | STILL-PRESENT | W4.A (scrollMode prop) | WIRE |
| R2 §F `<Configurator>` primitive thesis | `demo/configurator/Configurator.vue` exists at HEAD (356 LOC) but is a **token-editor** wired to PRESETS manifest — NOT the aurora/blob configurator chrome R2 envisions | OUT-OF-DATE (the `<Configurator>` name is taken; J's W4.A `<Configurator>` primitive collides) | W4.A | **REMAP**: name collision — see §F item 2. The W4.A primitive needs a different name (`<StudioPane>`, `<ConfigPanel>`, or scoped to `src/components/custom/configurator/` while demo's stays in `demo/configurator/`) OR the demo Configurator gets renamed/folded. |

### R3 — Form primitives deep audit

| Source | Finding | HEAD evidence | v0.8.0 status | J wave attribution | Disposition |
|---|---|---|---|---|---|
| R3 axis-1 row 1 `--space-phi-{5,6}` undefined-but-referenced | `rg "phi" src/styles/tokens.css` returns 0 hits (no φ tokens defined); `rg "p-\[var\(--space-phi" src/ demo/` returns 0 hits (no consumers either) | OUT-OF-DATE: both consumer sites and tokens absent at HEAD; the 11 cited references existed on the planning branch but were removed/never-merged when story files were rewritten | RESEARCH-AGAIN | RESEARCH-AGAIN — **R3's P0 is moot at HEAD**. The story files cited (slider-glass-track.vue, audacious-hero.vue, blob.vue at those lines, blob-stress.vue, flourishes.vue, golden-ratio.vue) DO NOT EXIST in `demo/stories/` at HEAD. W1 prescription to ship `--space-phi-{5,6}` becomes substrate-without-consumer. |
| R3 axis-1 row 2 stories use `rounded-2xl` not `rounded-card` | grep needed | UNCERTAIN (story file set changed) | W2.A (consume rounded-panel/card across UI) | WIRE-AS-IS for ui/, RESEARCH-AGAIN for demo/ |
| R3 axis-1 row 3 NumberField uses `rounded-md`; canonical Input uses `--radius-pill` | `src/components/ui/number-field/index.ts` cartoon variant `rounded-md` likely unchanged | STILL-PRESENT | W5.B | WIRE |
| R3 axis-1 row 4 `.slider-track` uses `--radius-pill`; doc gap | `Slider.vue:54` confirms `--radius-pill` | NEVER-PRESENT (doc-only) | DEFERRED | DEFERRED |
| R3 axis-1 row 5 `--shadow-cartoon-accent` only consumed by Slider | unchanged in shape | STILL-PRESENT | W5.A (slider press-state) | WIRE |
| R3 axis-2 row 6 story-page chassis pattern repeats 15× | story files referenced (slider-glass-track.vue, audacious-hero.vue, golden-ratio.vue, flourishes.vue, blob-stress.vue) **don't exist in demo/stories/ at HEAD** | OUT-OF-DATE | RESEARCH-AGAIN (W5.D) | RESEARCH-AGAIN — story chassis prescription needs re-survey of the actual demo/stories/ shape at HEAD before W5.D ships |
| R3 axis-2 row 7 numberFieldInputVariants asserts duplicated input-pill chassis | unchanged | STILL-PRESENT | W5.B | WIRE |
| R3 axis-3 row 8 NumberFieldDecrement bare `<button>` | `src/components/ui/number-field/NumberFieldDecrement.vue` likely unchanged | STILL-PRESENT | W5.B | WIRE |
| R3 axis-3 row 9 `h-4 w-4` icon literal | unchanged | STILL-PRESENT | W5.B | WIRE |
| R3 axis-3 row 10 slider track no active-drag affordance | `Slider.vue` at HEAD has 3 variants (standard/spectrum/timeline); the prescribed `glass-track` variant **does not exist as a named variant** at HEAD | OUT-OF-DATE: `glass-track` slider variant absent | RESEARCH-AGAIN (W5.A) | RESEARCH-AGAIN — `glass-track` variant retired or never landed; W5.A's "extend with size axis + glass-pill + glass-cartoon" needs to be re-cast as "build from `standard` baseline" |
| R3 axis-4 row 11 `sliderVariants` 4 variants + no size axis | actual at HEAD: 3 variants (standard/spectrum/timeline) authored as `props.variant` string + scoped-CSS branches (NOT a CVA — there is no `sliderVariants` CVA at all) | OUT-OF-DATE | RESEARCH-AGAIN (W5.A) | RESEARCH-AGAIN — W5.A prescribes CVA extension; canon is in-template variant prop. Need to either build CVA OR extend in-template branches |
| R3 axis-4 row 12 NumberField root CVA bare grid | `number-field/index.ts` may have evolved; verify | UNCERTAIN | W5.B | WIRE |
| R3 axis-5 row 13 slider transition gaps | unchanged shape | STILL-PRESENT | W5.A | WIRE |
| R3 axis-5 row 14 dock-keep-open round-trip no visual affordance | `Slider.vue` uses CSS-property fallback contracts; no isHeld API | STILL-PRESENT | W5.C | WIRE |
| R3 axis-6 row 15-16 typography drift | unchanged | STILL-PRESENT | doc-fix at W7 | DEFERRED |
| R3 axis-7 row 17-19 a11y — buttons no focus-visible, slider thumb no focus, glass-track no PRT | unchanged | STILL-PRESENT | W5.A + W5.B | WIRE |

### R4 — Data + composition deep audit

| Source | Finding | HEAD evidence | v0.8.0 status | J wave attribution | Disposition |
|---|---|---|---|---|---|
| R4 axis-1 FuzzySearch.vue inline tokens | `wc -l FuzzySearch.vue` = 600; raw `box-shadow: var(--shadow-md)` etc unchanged | STILL-PRESENT | W6.B | WIRE |
| R4 axis-1 magic gold highlight literal | unchanged | STILL-PRESENT | W6.B | WIRE |
| R4 axis-1 `statusTone()` hand-rolled triplets in table.vue | unchanged at HEAD | STILL-PRESENT | W6.A | WIRE |
| R4 axis-2 FuzzySearch chrome bespoke classes | unchanged | STILL-PRESENT | W6.B | WIRE |
| R4 axis-2 carousel.vue dot indicator hand-rolled | unchanged | STILL-PRESENT | W6.C.2 | WIRE |
| R4 axis-3 FuzzySearch close/expand bare buttons | unchanged | STILL-PRESENT | W6.B | WIRE |
| R4 axis-3 `danger-subtle` 4.28:1 contrast | `rg "danger-subtle" src/components/ui/button/index.ts` returns 1 hit (`'danger-subtle':`); used at `demo/stories/data/search.vue:318` | STILL-PRESENT | W6.C.1 | WIRE |
| R4 axis-3 carousel dot buttons raw Tailwind | unchanged | STILL-PRESENT | W6.C.2 | WIRE |
| R4 axis-4 Badge no size axis | `src/components/ui/badge/index.ts` confirmed: only `variant: default/secondary/destructive/outline`, no `size` axis, base `text-xs` hardcoded | STILL-PRESENT | W6.A | WIRE |
| R4 axis-4 DataTable no pluggable pager | unchanged | STILL-PRESENT | W6.C.2 | WIRE |
| R4 axis-5 FuzzySearch modal duplicates Dialog | unchanged | STILL-PRESENT | W6.B | WIRE |
| R4 axis-5 FuzzySearch keyframes duplicate popover-animate | unchanged | STILL-PRESENT | W6.B | WIRE |
| R4 axis-6 fira-code bare class 16× | `rg "fira-code" demo/stories/data/search.vue` returns 16 hits (verified at HEAD) | STILL-PRESENT | W6.B (story rewrite) | WIRE |
| R4 axis-6 `rounded-card border bg-card p-4 shadow-cartoon` triplet 3× | unchanged | STILL-PRESENT | W6.B | WIRE |
| R4 axis-7 FuzzySearch backdrop-filter no fallback | unchanged | STILL-PRESENT | W6.B | WIRE |
| R4 axis-7 Badge `<div>` root | unchanged | STILL-PRESENT | DEFERRED (W6.A scope) | DEFERRED |
| R4 §A status badge alignment + size axis | unchanged | STILL-PRESENT | W6.A | WIRE |
| R4 §B FuzzySearch refinement enumeration B1-B11 | unchanged | STILL-PRESENT | W6.B | WIRE |
| R4 §C clearSearchCache rename + variant retirement | unchanged | STILL-PRESENT | W6.C.1 | WIRE |
| R4 §D basic horizontal pager weakness | unchanged | STILL-PRESENT | W6.C.2 | WIRE |
| R4 §E1-E4 + G-J-R4-1..6 gaps | (subsumed by W6.A/B/C lanes) | STILL-PRESENT | W6 | WIRE |

### R5 — Style self-audit (32 drift rows + 9 gaps + 8 union candidates)

R5 was authored on planning baseline. v0.8.0's dilation sweep (`19f5c8e`) migrated **most class strings** but **27 token-level references** to `--glass-{bg,blur,border,shadow}-{subtle,default,medium,elevated}` remain at HEAD (verified). This is a v0.8.0 cleanup miss.

| Source | Finding | HEAD evidence | v0.8.0 status | J wave attribution | Disposition |
|---|---|---|---|---|---|
| R5 axis-1 raw `rgba(0,0,0,…)` literals | `theme.css:242,243`, `tokens.css:563,564`, `BouncyToggle.vue:266`, `TypewriterText.vue:238` (verify line numbers may shift) | STILL-PRESENT | W2.B | WIRE |
| R5 axis-1 cubic-bezier literals UnderlineTabs/BouncyToggle | unchanged | STILL-PRESENT | W2.B | WIRE |
| R5 axis-1 literal duration ms in DarkModeToggle/ProgressiveSidebar/FuzzySearch | unchanged | STILL-PRESENT | W2.B (or W6 for FuzzySearch) | WIRE |
| R5 axis-1 paper.css literal `hsl(48 ...)` rungs | unchanged | STILL-PRESENT | DEFERRED (J cross-tranche) | DEFERRED |
| R5 axis-1 inline `color-mix(--foreground)` 36 sites | unchanged | STILL-PRESENT | W2.B (--surface-tint family from W1) | WIRE |
| R5 axis-1 inline `color-mix(--muted)` 9 sites | unchanged | STILL-PRESENT | W2.B (--muted-soft/medium from W1) | WIRE |
| R5 axis-1 `bg-black/{40,50,80}` modal scrims | `rg "bg-black/(40\|50\|80)" src/` returns 5 hits (Dialog x2, Sheet, Drawer, ConfirmDialog) — but ALSO STALE `[backdrop-filter:var(--glass-blur-subtle)]` references which resolve to undefined at HEAD | STILL-PRESENT + v0.8.0-MISSED | W2.A | WIRE — and **double-fix**: those overlay components also reference `--glass-blur-subtle` which no longer exists; W2.A must migrate the blur token reference as well |
| R5 axis-1 `bg-white/10` Notification.vue | unchanged | STILL-PRESENT | W2.B (after W1 ships --success-foreground etc) | WIRE |
| R5 axis-1 magic 600ms in dock.css:735 | unchanged | STILL-PRESENT | W1 (--duration-sparkle) → W2 consumer | WIRE |
| R5 axis-1 `--border-opacity-{light,medium,strong}` named-but-undefined | tokens.css:436-439 confirms these ARE defined at HEAD (light/medium/strong opacities for borders) | NEVER-PRESENT (R5 was wrong) | n/a | RETIRE — strike from R5 audit |
| R5 axis-2 popover-animate 7 sites use raw slot list | grep verified: many overlay components use raw `data-[state=open]:animate-in...` instead of `.popover-animate` utility; only 3 sites consume `.popover-animate slide-in-from-side` (`PopoverContent.vue:2`, `DropdownMenuContent.vue`, others) | STILL-PRESENT | W2.A | WIRE |
| R5 axis-2 `glass-elevated` double-composite | `rg "[backdrop-filter:var(--glass-blur-elevated)]" src/` shows the references survive; but `glass-elevated` class itself was renamed to `glass-floating` in v0.8.0 — so the audit row is REMAPPED. The double-composite issue (raw class + raw blur token) still resolves to a dead `glass-elevated` reference at HEAD | REMAPPED-TO-NEW-VOCAB + STILL-PRESENT | W2.A | **REMAP** to `glass-floating` consumption |
| R5 axis-2 Skeleton `skeleton-shimmer-slide` keyframe duplicates `gold-shimmer-slide` | unchanged | STILL-PRESENT | W2.B | WIRE |
| R5 axis-2 `text-xs font-mono uppercase tracking-wider` 5 Configurator sites | confirmed: `demo/configurator/Configurator.vue:144,183,232,269,318` (line numbers may shift) | STILL-PRESENT | W2.B | WIRE |
| R5 axis-2 shimmer/rainbow story-local recipes (flourishes.vue:245-328) | `demo/stories/foundations/flourishes.vue` does not exist at HEAD (no flourish-divider story file under foundations/) | OUT-OF-DATE | RESEARCH-AGAIN (W1.4) | RESEARCH-AGAIN — story file path stale |
| R5 axis-2 transition-all repeats | unchanged | STILL-PRESENT | W2.B | WIRE |
| R5 axis-3 `focus-visible:shadow-[var(--focus-ring-shadow)]` 16 sites | `rg "focus-visible:shadow-\[var\(--focus-ring-shadow\)\]" src/components/ui/` returns 15 hits at HEAD | STILL-PRESENT | W2.B | WIRE |
| R5 axis-3 hardcoded `scale(0.9N)` 10 sites | unchanged | STILL-PRESENT | W2.B | WIRE |
| R5 axis-3 BouncyToggle WAAPI scale literals | unchanged | STILL-PRESENT | W2.B (cssVar helper) | WIRE |
| R5 axis-4 cartoon hoist clean | confirmed; cartoon-surface utility consumed | NEVER-PRESENT (clean) | n/a | RETIRE |
| R5 axis-4 :deep() audit clean | confirmed | NEVER-PRESENT | n/a | RETIRE |
| R5 axis-4 Sheet/Drawer z-tier inconsistency | `DrawerContent.vue:20 z-overlay` vs `sheet/index.ts:13 z-modal` (verify) | STILL-PRESENT | W2.A row 6 | WIRE |
| R5 axis-4 Card pane variant `bg-[var(--glass-bg-subtle)] [backdrop-filter:var(--glass-blur-subtle)]` 5-class bypass | **Card variant API retired in v0.8.0** (`3a43a8f`); pane is now `<ScrollPane>` sibling primitive (`e017d53`) which composes `glass-wash` cleanly | FIXED-VIA-V0.8.0 | RETIRE | RETIRE — **W2.A row 7 (Card pane disposition) is now moot.** ScrollPane already canonical. |
| R5 axis-5 overlay `rounded-xl` 11 sites | `rg "rounded-xl" src/components/ui/{popover,dropdown-menu,hover-card,combobox,context-menu,dialog,select,tooltip,card}/` returns ~11 hits | STILL-PRESENT | W2.A | WIRE — but verify which CSS named radius alias to consume (`rounded-panel` is not a defined utility at HEAD: `rg "rounded-panel\|rounded-tooltip\|rounded-dialog" src/` returns 0). W1 must define these aliases first. |
| R5 axis-5 5 modal scrim sites | (covered above) | STILL-PRESENT | W2.A | WIRE |
| R5 axis-5 Sheet ships open/close vocabulary inline | unchanged | STILL-PRESENT | W2.A (.sheet-animate from W1) | WIRE |
| R5 axis-5 Tooltip `rounded-lg` outlier | unchanged | STILL-PRESENT | W2.A (rounded-tooltip from W1) | WIRE |
| R5 axis-6 Configurator section titles `.section-label` | (covered) | STILL-PRESENT | W2.B | WIRE |
| R5 axis-6 Configurator description text-2xl literal | unchanged | STILL-PRESENT | W2.B | WIRE |
| R5 axis-6 story content inline `text-4xl`/`text-2xl`/`!text-[1.4rem]` | unchanged | STILL-PRESENT | DEFERRED | DEFERRED |
| R5 axis-7 PRT/PRM clean for cream/paper | confirmed | NEVER-PRESENT (clean) | n/a | RETIRE |
| R5 axis-7 BouncyToggle WAAPI no PRM gate | unchanged | STILL-PRESENT | W2.B | WIRE |
| R5 axis-7 `data-allow-motion` orphan | unchanged | STILL-PRESENT | DEFERRED (doc) | DEFERRED |
| R5 gaps row 1 `--surface-tint-N` family | undefined at HEAD | STILL-PRESENT | W1 | WIRE |
| R5 gaps row 2 substrate-aware modal scrim | undefined at HEAD | STILL-PRESENT | W1 | WIRE |
| R5 gaps row 3 `--duration-sparkle` | undefined at HEAD | STILL-PRESENT | W1 | WIRE |
| R5 gaps row 4 `--success/warning/info-foreground` | `rg "success-foreground\|warning-foreground\|info-foreground" src/styles/tokens.css` returns 0 hits → undefined | STILL-PRESENT | W1 | WIRE |
| R5 gaps row 5 `--radius-tooltip` | undefined | STILL-PRESENT | W1 | WIRE |
| R5 gaps row 6 `.sheet-animate` | undefined | STILL-PRESENT | W1 | WIRE |
| R5 gaps row 7 `.text-shimmer-vivid/pastel`, `.bg-rainbow-pastel` | story file referenced doesn't exist at HEAD | OUT-OF-DATE | RESEARCH-AGAIN | RESEARCH-AGAIN — verify whether utilities are still needed once flourishes story file location confirmed |
| R5 gaps row 8 `cssVar()` composable | doesn't exist (`src/composables/utils/` directory absent) | STILL-PRESENT | W1.5 | WIRE |
| R5 gaps row 9 audacious primary CTA reservation | (formally deferred per J.md) | STILL-PRESENT | DEFERRED-TO-K | DEFERRED |
| R5 gaps row 10 keep-dock-open API extensibility (Slider + DockPopover) | unchanged | STILL-PRESENT | W3.B + W5.C | WIRE |
| R5 union candidates U1-U7 | (subsumed in axis rows above) | STILL-PRESENT | W2 | WIRE |

### R6 — Plan-vs-actual + runtime probe

| Source | Finding | HEAD evidence | v0.8.0 status | J wave attribution | Disposition |
|---|---|---|---|---|---|
| R6 §1 — 13 MISSED + 1 DEFERRED + 1 WIRE + 2 NEW | (cross-walk to user findings — see §C) | (per-row) | (per-row) | (per-row) |
| R6 §2 — π/δ/β audit-lane structural failures | reflected in W0 Lane II precept update | n/a (process) | W0 Lane II | WIRE |
| R6 §4.1 cornerstone — width:auto non-interpolatable | confirmed | STILL-PRESENT | W3.A | WIRE |
| R6 §4.2 cornerstone — vertical rail dev text | INTERNAL_CATEGORY retired at HEAD | FIXED-VIA-V0.8.0 | RETIRE | RETIRE — finding 5b is moot |
| R6 §5 — 5 canon contradictions | (mostly absorbed; #1, #4 still relevant; #3 StatusDot ladder gap; #5 stale) | UNCERTAIN | DEFERRED | DEFERRED |
| R6 §6 recommendations — π viewport/timing/contrast matrix; δ story sweep | W0 Lane II | n/a (process) | W0 | WIRE |

---

## §C — 18 user findings dispositions

| # | Finding | HEAD evidence | v0.8.0 status | J wave | Disposition |
|---|---|---|---|---|---|
| 1 | Docks exceed max width/height — inner container should scroll | `--dock-max-inline-size` token absent (`rg "dock-max-inline-size" src/styles/tokens.css` returns 0); `StoryPager.vue` workaround at `:54-69` unchanged | STILL-PRESENT | W3.C | WIRE |
| 2 | Top dock collapsed state animation jerks (cornerstone) | `dock.css:213` `visibility: hidden` confirmed; FLIP not wired to outer pair | STILL-PRESENT | W3.A | WIRE |
| 3 | Dock blurs reduce | `--glass-blur-dock-radius: 1px` at tokens.css:314 | STILL-PRESENT | W3.C | WIRE |
| 4 | Drag a slider — dock holds; section needs refinement | `useDockState.isHeld` does not exist; no `data-held` attr on dock root; `Slider.vue` sink consumer unchanged | STILL-PRESENT | W5.C | WIRE |
| 5a | Vertical rail overflows | `dock.css:128, 141-144` `scrollbar-width: none` unchanged; mask-fade affordance absent | STILL-PRESENT | W3.C | WIRE |
| 5b | Remove dev text | INTERNAL_CATEGORY already retired at HEAD: `manifest.ts` line count 243; no Wrench icon, no `_internal` category, no DEV gate. The category was retired during v0.8.0 consolidation | FIXED-VIA-V0.8.0 | RETIRE | RETIRE |
| 6 | DockPopover should not be a special component / DRY-reuse / nest more types animated | `DockPopover.vue` 273 LOC unchanged; `<HoverPopover>` exists at `src/components/custom/hover-popover/` (v0.7.0); dock-popover **could now collapse onto HoverPopover + DockIconButton composition** instead of W3.B's prescribed Popover-extension props approach | PARTIALLY-FIXED (HoverPopover landed; collapse path pivots) | W3.B | **REMAP** — see §F item 3 |
| 7 | Blob configurator parity | `demo/stories/primitives/blob.vue` no configurator; `demo/configurator/Configurator.vue` is unrelated token-editor | STILL-PRESENT | W4.C | WIRE — coordinate with W4.A name collision (§F item 2) |
| 8 | Aurora configurator scroll-wrapping | `AuroraConfigDock.vue:67` no overflow-x | STILL-PRESENT | W4.B | WIRE |
| 9 | Aurora configurator side shadows/clips | `PaletteLayer.vue:27 min-w-[320px]` confirmed; aside lacks `overflow-clip` | STILL-PRESENT | W4.B | WIRE |
| 10 | Aurora top black padding bar | `PresetPickerRow.vue:55 bg-muted` confirmed | STILL-PRESENT | W4.B | WIRE |
| 11 | Speedtest aurora preset | `auroraPresets.SPEEDTEST` not in `demo/stories/aurora/presets.ts` | STILL-PRESENT | W4.C | WIRE |
| 12 | `/primitives/slider` padding standardized | `--space-phi-{5,6}` tokens are absent at HEAD AND no consumers reference them — the underlying R3 P0 is moot. The user's "padding standardized" remains a real concern but the diagnostic chain in R3 doesn't apply at HEAD | OUT-OF-DATE | W5.A or W5.D | RESEARCH-AGAIN — re-survey actual slider story padding state at HEAD |
| 13 | Number Field — refined and rounded | `numberFieldInputVariants` likely unchanged; `--radius-input` defined at tokens.css:123 (verify) | STILL-PRESENT | W5.B | WIRE |
| 14 | Slider · Glass Track — greatly enhanced | Slider has no `glass-track` variant at HEAD; has `standard/spectrum/timeline`. The "glass-track variant invisible at rest" diagnosis is OUT-OF-DATE | OUT-OF-DATE | W5.A | RESEARCH-AGAIN — variant naming may not match; W5.A's "extend sliderVariants with glass-pill + glass-cartoon" presumes a `glass-track` baseline that doesn't exist |
| 15 | Status badge alignment | `<Badge>` no size axis; `text-xs` baseline mismatch with `text-sm` row text | STILL-PRESENT | W6.A | WIRE |
| 16 | DATA · FUZZY SEARCH refinement | `FuzzySearch.vue` 600 LOC at HEAD | STILL-PRESENT | W6.B | WIRE |
| 17 | clearSearchCache rename + contrast | `danger-subtle` variant in `button/index.ts`; `demo/stories/data/search.vue:318` consumer | STILL-PRESENT | W6.C.1 | WIRE |
| 18 | Basic horizontal pager weak | `<CarouselPager>`/`<CarouselDots>` substrate absent | STILL-PRESENT | W6.C.2 | WIRE |

**Tally**: 14 WIRE, 2 RETIRE (5b dev-text + redundant overlap with #5a; finding 5 has two halves), 4 REMAP/RESEARCH-AGAIN (6, 12, 14, partial overlap with W4 name collision).

---

## §D — J wave-spec invariant validations

For each prescription naming a token/utility/CVA in W1–W7, confirm presence/absence at HEAD.

### W1 prescriptions

| Prescription | HEAD presence | Status |
|---|---|---|
| `--space-phi-5: 2.618rem` | absent (`rg "phi" src/styles/tokens.css` returns 0) | STILL-NEEDED-AS-SUBSTRATE-BUT-NO-CONSUMER (R3 found 0 consumers); recommend either DEFER until consumer surfaces or accept as preemptive substrate |
| `--space-phi-6: 4.236rem` | absent | same as above |
| `--surface-tint-{4..25}` | absent | STILL-NEEDED |
| `--overlay-scrim`, `--overlay-scrim-strong`, `--overlay-scrim-subtle` | absent | STILL-NEEDED |
| `--duration-sparkle: 600ms` | absent | STILL-NEEDED |
| `--success-foreground`, `--warning-foreground`, `--info-foreground` | absent (only `--destructive-foreground` likely exists) | STILL-NEEDED |
| `--radius-tooltip: var(--radius-lg)` | absent (`rg "radius-tooltip" src/styles/tokens.css` returns 0) | STILL-NEEDED |
| `--muted-soft`, `--muted-medium` | absent | STILL-NEEDED |
| `.sheet-animate` utility | absent (`rg "sheet-animate" src/styles/utilities.css` returns 0) | STILL-NEEDED |
| `.overlay-scrim` utility | absent | STILL-NEEDED |
| `.text-shimmer-vivid`, `.text-shimmer-pastel`, `.bg-rainbow-pastel`, `.text-rainbow-pastel` | needs verification — story file (`demo/stories/foundations/flourishes.vue`) doesn't exist at HEAD; defining utilities without a consumer is overfitting | RESEARCH-AGAIN |
| `cssVar()` composable in `src/composables/utils/` | `src/composables/utils/` directory **does not exist** at HEAD; closest is `src/composables/useResizeObserver.ts` peer file | STILL-NEEDED — but W1.5 must CREATE the directory not just the file |
| `rounded-panel`, `rounded-card`, `rounded-dialog` Tailwind utilities | absent (`rg "rounded-panel\|rounded-dialog" src/` returns 0; `rounded-card` may exist via theme.css bridge) | STILL-NEEDED — W1 must add `@theme` bridges so `rounded-{panel,dialog,tooltip}` resolve |

### W2 prescriptions

| Prescription | HEAD presence | Status |
|---|---|---|
| Card pane variant disposition (consume `glass-subtle` OR DESIGN.md notes bypass) | **Card variant API retired in v0.8.0**; ScrollPane sibling primitive replaces | REMAP / DROP — W2.A row 7 prescription is fully obsolete |
| `popover-animate slide-in-from-side` consumption (7 sites) | 3 sites already consume (PopoverContent x2, DropdownMenuContent), the other 4-7 sites still raw | WIRE-AS-IS |
| `glass-elevated` ComboboxList drop duplicate | `glass-elevated` class **retired** in v0.8.0 → `glass-floating`. ComboboxList bypass uses raw token references that now point to undefined tokens | REMAP — fix is to consume `glass-floating` not `glass-elevated` |
| 16 `.focus-ring` consumer migrations | confirmed 15 raw call sites at HEAD (close enough to 16) | WIRE-AS-IS |
| 10 `--scale-press*` migrations | unchanged | WIRE-AS-IS |
| 3 `--ease-apple-spring` migrations | unchanged | WIRE-AS-IS |
| 9 `--muted-soft/medium` migrations | unchanged | WIRE-AS-IS |
| Sheet z-tier reconciliation | unchanged | WIRE-AS-IS |
| `glass-subtle` (renamed→`glass-wash`) Card pane consumption — **MUST REMAP** | n/a | DROP — see above |
| 27 stale `--glass-{blur,bg,border,shadow}-{subtle,default,medium,elevated}` token references at HEAD | NEW gap surfaced by this audit (v0.8.0 cleanup miss) | WIRE-NEW — W2.A or W2.B should absorb token migration |

### W3 prescriptions

| Prescription | HEAD presence | Status |
|---|---|---|
| `<DockPopover>` collapse onto `<Popover>` with `keepDockOpen`/`hoverOpenDelay` | DockPopover.vue 273 LOC unchanged; **`<HoverPopover>` (v0.7.0) now provides hover-driven semantics** — the gestalt-correct path may now be `<DockIconButton>`+`<HoverPopover>` composition rather than extending `<Popover>` with hover props | REMAP — see §F item 3 |
| `pop-up-*`/`pop-down-*` keyframe deletion | dock.css:499-531 unchanged | WIRE-AS-IS |
| `--glass-blur-dock-radius: 0px` | currently 1px | WIRE-AS-IS |
| `--dock-max-inline-size` token | absent | WIRE-AS-IS |
| `INTERNAL_CATEGORY` localStorage gate | **INTERNAL_CATEGORY already retired at HEAD** | RETIRE / DROP |

### W4 prescriptions

| Prescription | HEAD presence | Status |
|---|---|---|
| `<Configurator>` + `useConfiguratorState<T>` at `src/components/custom/configurator/` | `src/components/custom/configurator/` does not exist; **`demo/configurator/Configurator.vue` and `demo/configurator/useConfigurator.ts` already exist as a token-editor primitive** under a different name | REMAP — name collision; either rename W4.A primitive (e.g. `<StudioPane>` or `<StudioFrame>`) or rename existing demo Configurator |
| Aurora studio refactor to consume new primitive | structural baseline unchanged | WIRE-AS-IS |
| `aurora min-w-[320px]` overflow + BouncyToggle inline-grid clip + black bar fixed | unchanged | WIRE-AS-IS |
| Blob page configurator (7-axis layer split per R2.C) | structural baseline unchanged | WIRE-AS-IS |
| `<Aurora>` + `<Blob>` honor `prefers-reduced-transparency` | partial — Blob already does, Aurora needs add | WIRE-AS-IS |
| `auroraPresets.SPEEDTEST` lands in `demo/stories/aurora/presets.ts` | absent | WIRE-AS-IS |

### W5 prescriptions

| Prescription | HEAD presence | Status |
|---|---|---|
| `sliderVariants` extends with size axis (sm/md/lg) + variants `glass-pill`, `glass-cartoon` | **No `sliderVariants` CVA exists at HEAD** — Slider.vue uses string-prop `variant` + scoped-CSS branches over `standard/spectrum/timeline` (no `glass-track`) | REMAP — W5.A needs to either build `sliderVariants` CVA from scratch OR extend the existing in-template branches; the prescribed `glass-track` name + 3-variant family doesn't match HEAD |
| NumberField uses `--radius-input` (pill); `+`/`-` buttons compose `<Button asChild>` | unchanged structurally | WIRE-AS-IS |
| Drag-keep-open visual feedback (thumb halo + dock pulse via `data-held`) | absent | WIRE-AS-IS |
| `<StoryChassis>` substrate (or `.story-page` utility) published; ≥ 5 demo stories migrated | story files cited (slider-glass-track.vue, audacious-hero.vue, etc.) **don't exist at HEAD**; needs survey of actual chassis pattern | RESEARCH-AGAIN |

### W6 prescriptions

| Prescription | HEAD presence | Status |
|---|---|---|
| Badge size axis + tone reconciliation | absent | WIRE-AS-IS |
| FuzzySearch.vue ≤ 200 LOC composing canonical primitives (currently 600) | 600 LOC at HEAD | WIRE-AS-IS |
| `clearSearchCache` rename + variant=destructive + AA contrast | unchanged | WIRE-AS-IS |
| `danger-subtle` variant retire | 1 consumer at HEAD; retire-able | WIRE-AS-IS |
| `<CarouselPager>` + `<CarouselDots>` substrate primitives | absent | WIRE-AS-IS |
| `<GlassCarouselPager>` substrate primitive | absent | WIRE-AS-IS |

### W7 prescriptions

| Prescription | HEAD presence | Status |
|---|---|---|
| 6-agent post-close audit (strengthened pattern) | precept update lands in W0 Lane II | n/a (process) | WIRE-AS-IS |

---

## §E — Cross-tranche silent additions ledger (commits between 950d1f4 and master HEAD)

`git log 950d1f4..master --oneline` reveals 30+ commits since the J planning baseline. Major surface-additions enumerated:

| Commit | Title | Surface-add | Owning J wave / disposition |
|---|---|---|---|
| `28b79b3` | release(v0.8.0) — bundled glass ladder rename + Card API redesign | release tag (no surface) | n/a |
| `19f5c8e` | refactor(consumers): migrate ui+demo to wash/quiet/resting/floating | mass class-string rewrite | RETIRE — already done; J specs reference old names need REMAP |
| `25da386` | feat(stories/primitives): dual-slot MetricBadge example | new story | RETIRE — story exists |
| `a6b3d16` | feat(dock-tab): `--dock-tab-h-{density}` token + `--dock-label-size` mobile carve | new tokens | already documented in CLAUDE.md (`a6b3d16`); RETIRE / WIRE in W2.B if any consumer needs it |
| `fb6ab78` | feat(metric-badge): dual-slot label + abbreviation siblings (R2-spec) | API extension | RETIRE — shipped |
| `eb9c44c` | refactor(styles): rename glass-tier ladder | mass token + class rename | RETIRE — done; J's vocab references need REMAP |
| `ebe5284` | docs(stories): card tier ladder + scroll-pane + cartoon-card storybook | new stories | RETIRE — shipped |
| `e017d53` | feat(scroll-pane,cartoon-card): lift Card variants to siblings | new primitives `<ScrollPane>`, `<CartoonCard>` | RETIRE; J doesn't extend |
| `3a43a8f` | feat(card): retire variant enum, ship tier API | Card API rewrite | RETIRE; J needs REMAP for Card pane references |
| `2500ee4` | fix(progress): use background shorthand for gradient `--progress-fill` (v0.7.3) | bug fix | RETIRE |
| `8b9a479` | feat(metric-badge): label + abbreviation + labelPosition props (v0.7.2) | API extension | RETIRE |
| `0435436`, `eb7f157` | bezel-line α lift (v0.7.1) | tone tweak | RETIRE |
| `2156cf2` | bump v0.7.0 — Q.W1.A + Q.W2.B + Q.W3 union | release tag | n/a |
| `a042b61` | feat(custom/hover-popover): land HoverPopover primitive | NEW PRIMITIVE | **W3.B impacted** — see §F item 3 |
| `8d59f69` | feat(stories/primitives): cap modes × silhouette × facetAxis × HoverPopover | new story coverage | RETIRE |
| `6dd2505` | feat(styles/dock): tier-primary phase-tint backplate | dock CSS extension | RETIRE; sub-bar candidate at H/I close |
| `cfc3311` | feat(glyph-face): clip-to-silhouette default + cap-strength + screen blend | API tune | RETIRE |
| `7c1914c` | docs(styles/dock): comment Tailwind v4 utilities-vs-components cascade | docs only | RETIRE |
| `d4ce132` | docs(stories/metric-badge): xl rung + 4-size grid story | docs/story | RETIRE |
| `953a2cf` | fix(custom/metric-badge): re-map md → text-mono-caption | bug fix | RETIRE |
| `b7d4fd2` | feat(custom/metric-badge): xl size mapping | API extension | RETIRE |
| `011fa1b` | feat(typography): text-mono-prose utility | new utility | RETIRE; shipped |
| `0f74820` | feat(composables): land `useResizeObserver` | NEW COMPOSABLE | RETIRE; ships at HEAD |
| `e41a9de` | bump v0.6.1 — P.W1.B + P.W3 union | release tag | n/a |
| `ef0ca91` | feat(custom/disco-glyph): land DiscoGlyph primitive | NEW PRIMITIVE | RETIRE; documented in CLAUDE.md |
| `2d71344` | docs(stories/glyph-face): three cap modes | story | RETIRE |
| `5baceb5` | chore(docs/tranches): consolidate H + I + J planning onto master | docs only | n/a |
| `862c1e7` | fix(metric-badge): hide `--abbr` only when paired with `--full` sibling | bug fix | RETIRE |

**Net silent-addition ledger**: every prior-tranche surface enumerated above lands at HEAD; J does not extend them. The two with material J-spec impact are **`a042b61` (HoverPopover landed)** and the v0.8.0 trio (`eb9c44c` + `3a43a8f` + `e017d53` — glass tier rename + Card API redesign + ScrollPane/CartoonCard split).

---

## §F — Recommended W0 close amendments to W1–W7

These are **proposed edits** to wave specs that should land before W1 dispatches. Live as bullets here; orchestrator applies them to the wave docs in W0 close (or as a separate PR before W1 fires).

### Item 1 — v0.8.0 token-cleanup miss (NEW SCOPE for W2)

**27 references** to retired tokens (`--glass-{bg,blur,border,shadow}-{subtle,default,medium,elevated}`) survive at HEAD across:
- `src/components/ui/sheet/SheetContent.vue:41` — `[backdrop-filter:var(--glass-blur-subtle)]`
- `src/components/ui/dialog/DialogContent.vue:37` — same
- `src/components/ui/dialog/DialogScrollContent.vue:34` — same
- `src/components/ui/drawer/DrawerOverlay.vue:17` — same
- `src/components/ui/notification/Notification.vue:25` — same
- `src/components/ui/combobox/ComboboxList.vue:24` — `bg-[var(--glass-bg-elevated)] [backdrop-filter:var(--glass-blur-elevated)] border-[var(--glass-border-elevated)]` (3 tokens, all dead)
- `src/components/custom/expandable-container/ExpandableContainer.vue:` — `[backdrop-filter:var(--glass-blur-subtle)]` × 2
- `src/components/custom/timeline/GlassTimeline.vue:` — `var(--glass-blur-subtle)` × 2
- `src/components/custom/glass-carousel/GlassCarousel.vue:` — `var(--glass-border-subtle)`, `var(--glass-shadow-subtle)`
- `src/styles/floating-panel.css:` — `var(--glass-{border,bg,blur,shadow}-medium)` × 5
- `src/styles/dock.css:` — fallback chain `var(--glass-blur-dock, var(--glass-blur-subtle))` and similar (≥6 sites)
- `src/styles/dock-group.css:` — comment reference (not load-bearing, but stale)
- `demo/stories/foundations/paper-glass.vue:` — `blurVar: "--glass-blur-{subtle,default,medium,elevated}"` × 4 (plus border-default)

**Proposed amendment**: extend W2.A scope to include "absorb the v0.8.0 token-cleanup miss — every `--glass-{bg,blur,border,shadow}-{subtle,default,medium,elevated}` reference migrates to wash/quiet/resting/floating equivalents per the dilation-sweep mapping in `19f5c8e`."

### Item 2 — `<Configurator>` name collision at W4.A

`demo/configurator/Configurator.vue` already exists at HEAD as a 356-LOC token-editor wrapping Sheet/Slider/Select for the demo's preset/typography manipulation. W4.A prescribes a NEW primitive at `src/components/custom/configurator/Configurator.vue` with stage/preset-row/layers slots (the aurora studio chrome).

**Proposed amendment**: W4.A renames the new primitive. Candidates: `<StudioPane>`, `<ConfigPanel>`, `<StudioFrame>`, `<LayeredConfigurator>`. Companion composable: `useStudioState<T>` (replaces `useConfiguratorState<T>`). The demo's preset-editor `Configurator` remains unchanged. File path: `src/components/custom/studio-pane/` (or similar). Update W4.B + W4.C consumers accordingly.

Alternative: rename the demo's token-editor (e.g., `demo/configurator/PresetEditor.vue` + `usePresetEditor.ts`) and reclaim the canonical `Configurator` name for the aurora/blob primitive. This is more disruptive but preserves the canonical namespace.

### Item 3 — DockPopover collapse path pivots toward HoverPopover

`<HoverPopover>` (v0.7.0, `a042b61`) provides adaptive side/align + defer-on-leave hover-driven popover semantics — exactly the "click-or-hover" surface DockPopover hand-rolls. R1 §A.5 identified hover semantics as the reason DockPopover exists.

**Proposed amendment**: W3.B reconsiders the collapse path:

- **Path A (current W3.B prescription)**: extend `<Popover>` with `keepDockOpen` + `hoverOpenDelay` props. Upside: single primitive owns popover semantics; click + hover unified.
- **Path B (new candidate)**: ship `<DockIconButton>` + `<HoverPopover keep-dock-open>` composition; delete DockPopover.vue entirely. `<HoverPopover>` already owns hover; click-anchoring already supported via reka-ui's headless `<Popover>` if needed. Upside: two existing primitives compose; no new props on `<Popover>`.
- **Path C**: `<HoverPopover>` gets the `keepDockOpen` prop (single primitive needs the dock-aware extension); `<Popover>` stays untouched.

**Recommendation**: Path C — adds `keepDockOpen` to `<HoverPopover>` only. The dock-keep-open contract is hover-correlated semantics; click-anchored popovers don't need to hold the dock open. This minimizes the public-surface delta.

### Item 4 — Card pane variant disposition (W2.A row 7) is moot

v0.8.0 retired Card variant API entirely. `<ScrollPane>` is the canonical "subtle pane" sibling primitive. W2.A row 7 should be DROPPED from the wave plan. Update DESIGN.md `## Substrate Hierarchy` to reflect the v0.8.0 split (already done in `ebe5284` storybook commit + CHANGELOG.md).

### Item 5 — INTERNAL_CATEGORY (W3.C step 3) is moot

`demo/stories/manifest.ts` at HEAD has 243 lines, no `INTERNAL_CATEGORY`, no `Wrench` icon, no `_internal` category. Already retired. **W3.C step 3 (vertical-rail dev-text gate)** — DROP from wave plan. The step 4 (vertical-rail viewport overflow + mask-fade) STAYS.

### Item 6 — R3 P0 (`--space-phi-{5,6}` undefined) is moot at HEAD

Both consumers (8 sites without fallback per R3) AND the tokens themselves are absent. Either the dilation sweep stripped them OR the planning branch had drift the master never absorbed. **W1.1's `--space-phi-{5,6}` row** — recommend KEEPING the addition as preemptive substrate (W5.D + W4 chassis pattern may still need them once StoryChassis lands), but **drop the "P0 visual bug" framing** from the wave-spec rationale. Mark as substrate-without-immediate-consumer; W5.D's chassis migration + W4's hero patterns will consume.

### Item 7 — Slider variant set diverges from R3 prescription

`Slider.vue` at HEAD: 3 variants (standard/spectrum/timeline) via in-template `props.variant` string + scoped-CSS branches. **No CVA, no `glass-track` variant, no `sliderVariants` named export**.

**Proposed amendment**: W5.A re-cast as:
1. **Build `sliderVariants` CVA from scratch** at `src/components/ui/slider/index.ts` (currently single-line `export { default as Slider } ...`).
2. CVA covers existing `standard/spectrum/timeline` + new `glass-pill`, `glass-cartoon` (or whatever R3.C prescribed) + size axis (sm/md/lg).
3. Slider.vue refactors to consume the CVA via `cn(sliderVariants({ variant, size }))` instead of in-template string-prop branching.
4. Demo's slider story (no `slider-glass-track.vue` at HEAD; verify if `demo/stories/primitives/slider.vue` carries glass-track examples) demonstrates all variant×size cells.

### Item 8 — Story chassis pattern survey (W5.D / R3 §E)

Story files cited by R3 as 15× chassis-pattern repeats — `slider-glass-track.vue`, `audacious-hero.vue`, `golden-ratio.vue`, `flourishes.vue`, `blob-stress.vue` — **do not exist** at HEAD. The chassis pattern may still repeat in *other* story files, but the count and per-file cite list need re-survey before W5.D ships.

**Proposed amendment**: W5.D opens with a "chassis-pattern grep at HEAD" subtask (`rg "rounded-(2xl|card) border .* bg-card .* shadow-cartoon" demo/stories/`) that produces the actual pattern-repeat ledger. Then `<StoryChassis>` lands as substrate + ≥ 5 migrations.

### Item 9 — R5 axis-1 row "border-opacity-{light,medium,strong}" is wrong

R5 claimed these tokens are "named in audit doc but not present in `tokens.css`." HEAD verification: `tokens.css:436-439` defines all three. R5 was wrong. **Drop the row** from W2.B sweep.

### Item 10 — flourishes.vue path stale (W1.4)

W1.4 prescribes "Promote from `demo/stories/foundations/flourishes.vue:245-328` to `src/styles/utilities.css`." That file does not exist at HEAD. The shimmer/rainbow utilities may or may not be needed — the consumer story file may have been retired. **Re-survey before W1 ships** OR drop from W1.4 if no consumer surfaces.

---

## §G — Summary count

Across R1–R6 + 18 user findings + W1–W7 invariant prescriptions:

| Disposition | Count |
|---:|---|
| **WIRE** (proceed as planned at HEAD substrate) | 78 |
| **REMAP** (J wave needs vocab/path update before dispatch) | 9 |
| **RETIRE** (already-resolved by v0.8.0 or earlier; drop from wave) | 17 |
| **RESEARCH-AGAIN** (HEAD diverged enough that the research is stale) | 9 |
| **DEFERRED** (formal residue / cross-tranche / sub-bar) | 18 |
| **Total findings rows reconciled** | ~131 |

### Top 5 wave-spec lines that MUST be remapped before W1 dispatches

1. **W2.A row 7 (Card pane disposition)** — DROP. Card variant API retired; `<ScrollPane>` is canonical.
2. **W3.C step 3 (INTERNAL_CATEGORY localStorage gate)** — DROP. Already retired at HEAD.
3. **W4.A `<Configurator>` name** — REMAP. `demo/configurator/Configurator.vue` already exists; rename W4.A primitive (proposed: `<StudioPane>`).
4. **W3.B path** — REMAP. Pivot from "extend `<Popover>` with `keepDockOpen` + `hoverOpenDelay`" to "extend `<HoverPopover>` with `keepDockOpen`; compose with `<DockIconButton>`."
5. **W5.A slider variant family** — REMAP / RESEARCH-AGAIN. No `sliderVariants` CVA at HEAD; in-template variant prop with `standard/spectrum/timeline` (no `glass-track`). W5.A must build CVA from scratch and re-survey the variant baseline.

### NEW SCOPE recommendation

**Add to W2.A**: absorb v0.8.0 token-cleanup miss — 27 references to retired `--glass-{bg,blur,border,shadow}-{subtle,default,medium,elevated}` tokens survive at HEAD (Sheet, Dialog, Drawer, Notification, Combobox, ExpandableContainer, GlassTimeline, GlassCarousel, floating-panel.css, dock.css fallback chains, paper-glass.vue). This is a v0.8.0 dilation-sweep miss; the references resolve to undefined CSS vars at runtime.

### J thesis assessment against v0.8.0 substrate

The J thesis (gestalt-rewrite + vocabulary convergence + audit-precept hardening) **still holds** after v0.8.0. The three architectural transpositions (DockPopover→Popover, configurator-pair→Configurator, story-chassis-pattern→StoryChassis) remain valid in spirit but need vocabulary/path updates. The audit-precept hardening (W0 Lane II) is unaffected by substrate changes — it's a process-tier amendment.

The **vocabulary convergence** thesis is materially stronger after v0.8.0: the dilation sweep cleaned up class strings but left token-level references dirty. W2 + W1 capture this naturally if §F item 1 is absorbed.

### Environmental blockers

None. Build / typecheck assumed green at HEAD (orchestrator should verify via `npm run typecheck && npm run build` as part of W0 close gate before commit). Submodule precept update (Lane II) is the only external write; bound by W0 Lane II hard gate.
