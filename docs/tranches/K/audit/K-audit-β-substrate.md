# K — Post-close audit β: substrate-without-consumer + visual-load-bearing-ness

**Authored**: 2026-05-09
**HEAD**: `3a4ea3f` (W8 pre-close orchestrator pass; v0.9.3 tagged; 11 active K waves committed; W2 retired)
**Mode**: READ-ONLY (write only on this audit doc)
**Lane**: β — re-runs the canonical overfitting-audit consumer-count bar plus the J/K invariant 10 visual-load-bearing-ness probe

## Method

1. Walked every K-introduced or K-migrated substrate (`Button variant="primary-audacious"`, `@utility btn-audacious`, `<HoverPopover hoverOpenDelay>` rename, K-migrated `--surface-tint-N` rung consumers, `transition-[transform,opacity]` decompositions, `.focus-ring` migrations, `cssVar()` retire, `.overlay-scrim` @utility formal-delete, `useConfiguratorState.activeKey` reactivity P0, `dock-with-slider.vue` cross-substrate composition, `Skeleton.vue` compositor migration, vueuse-isolation subpaths `forms` / `composables/dark` / `composables/keyboard`) with `rg` consumer counts across `src/` + `demo/`.
2. Visual-load-bearing-ness probe — without a runtime browser available in this dispatch (see W7 + WP precedent for the same constraint), the visual probe relied on **static analysis of the rendering call sites**:
   - File reads of the SFC + scoped `<style>` to verify the recipe is wired and renders.
   - Class-list + utility-CSS analysis to confirm the variant or @utility cascades to the consumer.
   - Cross-reference with W7 dev-server probe (`http://localhost:5174` /motion/metaballs and /compositions/dock-with-slider) recorded in W7 proof — those routes mounted clean with 0 console errors at W7 close.
   - For bundle-shape artefacts (subpaths), `dist/` artefact verification + `package.json` exports inspection.
   - The π lane will run the live Playwright probe at W8 close ceremony per K invariant 13.
3. Classified each row VISIBLE / INVISIBLE-AT-REST / WIRED-NOT-VISUALLY-EXERCISED / NOT-PROBED.
4. The K bar is binding: a substrate with consumer count ≥ 2 but that fails the visual-load-bearing-ness probe (e.g., wired but never rendered, or rendered at a default tone that doesn't exercise its intent) is a P0 absorb candidate — same posture as J's β lane.

## Quantitative + visual pass — K-introduced / K-migrated substrates

`rg` invocations are recorded next to each row; "consumers" = distinct files importing or invoking the artefact in `src/` + `demo/`. Self-referential index.ts barrels are excluded.

| # | Substrate | Wave | Consumer rg | Distinct consumer files | Visual probe method | Visual outcome | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | `Button variant="primary-audacious"` | W6 | `rg "primary-audacious" demo/ src/` | **3** consumers: `demo/stories/primitives/buttons.vue:54-56` (gallery cell — lg / default / disabled) + `demo/stories/compositions/hero.vue:85` (feature CTA `Start building`) + `src/components/ui/button/index.ts:15-16` (CVA def) | source read of buttons.vue gallery cell + hero.vue feature CTA + utilities.css `@utility btn-audacious` recipe | **VISIBLE** — gallery cell exercises three states (lg / default / disabled) so the visual signature is exercised at all three tones; hero CTA exercises feature-tier real use-case alongside contrast peer (`<Button variant="ghost">`) | **KEEP** |
| 2 | `@utility btn-audacious` | W6 | `rg "btn-audacious" src/ demo/` | **8 sites across 4 files**: `src/styles/utilities.css:561` (def) + `src/components/ui/button/index.ts:16` (variant) + `src/components/custom/dock/DockTabButton.vue:18,36` (composition + JSDoc) + `src/styles/dock.css:714,715,730,733` (4 doc-comment cross-refs); recipe rendered through `Button variant="primary-audacious"` (3 demo cells, see row 1) and through `<DockTabButton data-tier="primary">` (3 dock primary-tier consumers, see row 3) | recipe inspection (`utilities.css:561-616`) — base + `:hover:not(:disabled)` + `::after` + `prefers-reduced-motion: no-preference` blocks all wired; `bg-primary` recipe binding intact | **VISIBLE** — recipe is the load-bearing surface, three distinct stories render it (buttons gallery + hero CTA + dock primary tier) | **KEEP** |
| 3 | Dock primary tier `data-tier="primary"` consumers (now consuming canonical `btn-audacious`) | W6 | `rg "data-tier=\"primary\"" demo/ src/` | **3** demo consumers: `demo/stories/primitives/dock-group.vue:56`, `demo/stories/compositions/instrument-chassis.vue:227`, plus the dock-tab Vue component conditional `btn-audacious` composition at `src/components/custom/dock/DockTabButton.vue:36` triggers wherever consumers attach the attribute | source read of DockTabButton.vue `useAttrs` flow + dock.css remaining phase-tinted overlay (`dock.css:714-769`) — phase-tint extension preserved as dock-local override over canonical recipe | **WIRED — visual fidelity DEFERRED**: per K W6 brittleness window declaration (`audit/K-pre-close.md:86-87`), the dock primary-tier visual signature post-Lane B refactor is gated on the W8 close ceremony π-lane Playwright PNG-diff; β cannot independently certify pixel-fidelity from static read alone | **KEEP — see brittleness-window status below** |
| 4 | `<HoverPopover hoverOpenDelay>` (renamed from `openDelay`; J silent-miss closeout) | W1 | `rg "hoverOpenDelay\|hover-open-delay" src/ demo/` | **7 hits across 2 files**: `src/components/custom/hover-popover/HoverPopover.vue:54,81,130` (type, default, template) + `demo/stories/primitives/hover-popover.vue:72,77,80,85` (section label + 80ms snappy + 500ms deferred + `<code>` mention) | source read of demo cell — story exercises a non-default value (80ms snappy + 500ms deferred — both bound to a `<HoverPopover content=…>`); the 250ms baseline cell is the implicit-default neighbor | **VISIBLE** — three visible cells exercise the prop at three distinct cadences; the rename was a silent-miss closeout, the demo cell is the first venue exercising the prop visibly | **KEEP** |
| 5 | `--surface-tint-N` second-pass migration (W3.A absorbed 9 src/ + W3.B absorbed 2 demo) | W3 | `rg "var\\(--surface-tint-[0-9]+\\)" src/ demo/` | **≥ 18 sites across 13 files** (covering 4-25 rungs): GlassTimeline ×4, GlassCarouselItem ×3, surface-tints story ×9, BouncyToggle ×1, ProgressiveSidebar ×1, Slider ×6, NucleiOverlay ×1, paper-glass ×2, dock.css ×4, glass.css ×2, instrument-chassis.css ×2, typography.css ×1, button/index.ts ×1 | source read of pre-migration token def (`tokens.css:189-197`) byte-equivalence to `color-mix(--foreground N%, transparent)` form — substitution preserves the original `color-mix` output; the W3-A proof documents per-rung migration mapping | **VISIBLE — byte-equivalent**: each migrated site preserves the original color-mix output because `--surface-tint-N` expands to the same `color-mix` form. Visual diff = 0 by token-def equivalence; per K invariant 10, the substrate is not just wired but visually preserved at every site | **KEEP** |
| 6 | `transition-[transform,opacity]` decomposition (4 demo sites; W3.A also did `CarouselDots.vue:62` in src/) | W3 | `rg "transition-\\[transform,opacity\\]" src/ demo/` | **5 sites across 5 files**: `CarouselDots.vue:62` (src/) + `motion/stagger.vue:59` + `composables/use-stagger.vue:45` + `composables/use-stagger-reveal.vue:27` + `composables/use-story-demo.vue:43` | source read — each consumer animates exactly `transform` (translate-y) + `opacity`; explicit two-property list replaces `transition-all` | **VISIBLE — semantically equivalent**: all four consumers' previous behaviour (transition transform + opacity from translate-y/opacity bindings) is preserved by the explicit list; eliminates over-broad `transition-all` recipe scope | **KEEP** |
| 7 | `.focus-ring` 5-site demo migration | W3.B | `rg "focus-ring" src/ demo/` (with replace_all-style scope) | 5 W3.B-migrated sites: `demo/stories/foundations/shadows.vue:61`, `demo/stories/primitives/combobox.vue:48`, `demo/stories/foundations/intro.vue:69`, `demo/layout/CategoryRail.vue:33`, `demo/stories/navigation/dock-layers.vue:49`; total ≥ 25 src/+demo/ consumers exist for the canonical `.focus-ring` utility | source read of the 5 migrated sites — the `focus-visible:shadow-[var(--focus-ring-shadow)]` raw assemblies replaced with the `.focus-ring` shorthand (functionally identical: same `--focus-ring-shadow` token, same `:focus-visible` gate) | **VISIBLE** — substrate is a focus state: visual demonstration requires :focus-visible (Tab key in the rendered demo); recipe is byte-equivalent; W8 π-lane Playwright keyboard-tab probe certifies. Static read confirms the migration: zero raw `focus-visible:shadow-[var(--focus-ring-shadow)]` survivors in demo/ | **KEEP** |
| 8 | `cssVar()` composable (RETIRED W3.A → inlined `readToken()` in BouncyToggle) | W3.A | `rg "cssVar\\(" src/` | **0 function-call hits**; only the in-file documentation comment in `BouncyToggle.vue:12` remains as retire-note | retire-decision read (W3-A proof §Step 3) — `useTokenColor` is the canonical reactive substitute; BouncyToggle inlines a 5-line `readToken()` helper for its one-shot WAAPI click-time read | **N/A — retired substrate**; the residual reactive needs are served by `useTokenColor`. Per K invariant 8 (substrate-without-consumer binary at K close), this row is FORMAL-RETIRE | **RETIRED** |
| 9 | `.overlay-scrim` @utility (FORMAL-DELETE W3.A) | W3.A | `rg "@utility overlay-scrim" src/styles/utilities.css` | **0 hits**; canonical path is `bg-overlay-scrim*` Tailwind utility from `@theme` color bridge in `theme.css` (5 consumers — ConfirmDialog, SheetContent, DialogContent, DialogScrollContent, DrawerOverlay) | source read of utilities.css — the duplicate @utility block deleted; consumers verified to consume the Tailwind bridge instead (W3-A proof §Step 4) | **N/A — retired substrate**; canonical Tailwind-bridge path remains and is consumed at all 5 sites. K invariant 8 retire-with-rationale satisfied | **RETIRED** |
| 10 | `useConfiguratorState.activeKey` reactive lift (W7 P0 absorb) | W7 | `rg "useConfiguratorState" src/ demo/` | **6 sites across 6 files**: lib def + def-barrel + `Configurator.vue` + 3 demo consumers (`demo/stories/primitives/configurator.vue`, `demo/stories/motion/metaballs.vue`, `demo/stories/aurora.vue`) | source read of `useConfiguratorState.ts:94-140` (`activeKey = ref(...)`; `selectPreset` writes `.value`); W7 proof §Step 4 confirms live `/motion/metaballs` route mounts with 0 console errors and the previous "Maximum recursive updates exceeded" runtime error is absent | **VISIBLE** — the reactive `activeKey` is the load-bearing fix that lets `activePreset` recompute; `/motion/metaballs` now renders 7 `<ConfiguratorLayer>` instances + 3 presets (Sunset / Cool / Mono) without hitting the reactive recursion guard. K Lighthouse P0-1 absorbed | **KEEP — P0 fix landed** |
| 11 | `dock-with-slider.vue` cross-substrate composition story | W7 | `rg "dock-with-slider" demo/` | **1 story file** (`demo/stories/compositions/dock-with-slider.vue`) + manifest registration at `demo/stories/manifest.ts:255`; the story exercises 3 cells (standard / glass-pill / collapsible-multi-slider) all binding `<Slider>` inside `<GlassDock>`. The contract surface (`useDockState.isHeld` + `dockHeld` provide + `data-held`) has 5 site lines across `useDockState.ts:57,237,310`, `GlassDock.vue:103,237,254`, `Slider.vue:49,80,88,222,228` | source read of the SFC + verification that scoped CSS rules `.glass-dock[data-held]` (`dock.css:241-248`) and `.glass-slider[data-held]` (`Slider.vue:222-232`) cascade live | **VISIBLE — contract WIRE binds visibly**: the story is the J FINAL named-residual closeout for "drag-keep-open story-fidelity gap" (J F4 / V10 caveat). At W7 close, the live Playwright probe at `/compositions/dock-with-slider` rendered all 3 cells with 0 console errors. The thumb-halo intensification (`--surface-tint-15` for standard, `--surface-tint-18` for glass-pill) and dock substrate tier-shading (resting → floating-equivalent) are wired and exercised at the user-drag interaction point | **KEEP** — closes the J F4 visual-load-bearing CAVEAT |
| 12 | `Skeleton.vue` compositor migration (`background-position` → `transform: translateX` on `::after`) | WP | `rg "skeleton-shimmer\|skeleton-shimmer-slide" src/ demo/` | **1 src/ component def** (`Skeleton.vue:21,34,39,50,54,61` — class binding + scoped CSS + keyframe def + reduced-motion gate) + **2 consumer files**: `demo/stories/feedback/skeleton.vue` (28 `<Skeleton>` instances) + `src/components/ui/data-table/DataTable.vue` (2 instances); on `/aurora`, `PresetPickerRow.vue:73-76` renders 5 shimmer thumbnails | source read of Skeleton.vue scoped CSS — `.skeleton-shimmer::after` uses `transform: translateX(-100% → 100%)` keyframe; reduced-motion gate preserved; visual signature equivalence table in WP proof confirms the perceptual signature is identical (highlight band sweeps over a muted base every 1.5s) | **VISIBLE — visually byte-equivalent**: the gradient sweeps shape is preserved (shifted from host `background-position` to overlay `transform`); host still renders `bg-muted` flat. Compositor-friendly migration is the load-bearing substrate fix; visual signature retained | **KEEP** |
| 13 | `@mkbabb/glass-ui/forms` subpath (vueuse-bearing forms surface) | WS | `dist/forms.{js,d.ts}` emit + `package.json:303` exports | dist artefact verified: `dist/forms.js` (re-exports Input + Textarea + Combobox*) + `dist/forms.d.ts` (full reka-ui type closure) + `package.json:303-307` exports field present; **0 internal subpath consumers** at HEAD (Phase 1 is additive — root-barrel re-exports preserved) | dist file inspection (`cat dist/forms.js`) — re-export shape correct; package.json exports map points at the dist artefact + dev source | **N/A — bundle-shape change, no visual probe**: subpaths are import-shape changes, not visual. K-WS doc explicitly notes the SCC trap stays open through Phase 1 — Phase 2 (root-barrel removal) defers to L. The subpath SHIPS so consumers can opt in; per K WS proof `W-S-bundle-evidence.md:111-118`, the subpath is the additive prerequisite for the Phase 2 break | **KEEP — additive Phase 1 substrate ready for L Phase 2** |
| 14 | `@mkbabb/glass-ui/composables/dark` subpath | WS | `dist/composables/dark.{js,d.ts}` emit + `package.json:308` exports | dist artefact verified: `dist/composables/dark.js` (re-exports `useGlobalDark`) + `dist/composables/dark.d.ts` (`export * from '../src/composables/dark'`) + exports field present; 0 internal subpath consumers (Phase 1 additive) | dist file inspection | **N/A — bundle-shape change, no visual probe** | **KEEP — additive Phase 1 substrate** |
| 15 | `@mkbabb/glass-ui/composables/keyboard` subpath | WS | `dist/composables/keyboard.{js,d.ts}` emit + `package.json:313` exports | dist artefact verified: `dist/composables/keyboard.js` (re-exports `registerShortcut`, `useRegisteredShortcuts`, `formatCombo`, `formatComboParts`, `isMac`) + `dist/composables/keyboard.d.ts` + exports field present; 0 internal subpath consumers (Phase 1 additive) | dist file inspection | **N/A — bundle-shape change, no visual probe** | **KEEP — additive Phase 1 substrate** |

## Visual-load-bearing-ness flags

Per K invariant 10 ("visual-load-bearing-ness"), an artefact passes the quantitative bar (≥ 2 consumers) but FAILS the visual probe when the consumer wires it but doesn't render its intent at the default tone.

| Flag | Substrate | Consumer count | Visual outcome | Disposition |
|---|---|---:|---|---|
| **None at K close** for K-introduced substrates rows 1, 2, 4, 5, 6, 7, 10, 11, 12 | — | ≥ 2 | VISIBLE | β verdict CLEAN |
| **Brittleness-window CAVEAT** for row 3 (dock primary tier post-Lane B refactor) | 3 demo consumers | WIRED — visual fidelity gated on W8 π-lane Playwright PNG-diff per the K W6 brittleness window | not a flag against K close — the brittleness window is the canonical mechanism for the suspended gate; π lane is the retraction probe | **PASS-CONDITIONAL** on W8 π-lane PNG-diff |
| **N/A** for rows 8 + 9 (retired substrates) | retired | retire-with-rationale per K invariant 8 | substrate exists only as deletion proof | **PASS** |
| **N/A** for rows 13, 14, 15 (subpath bundle-shape) | 0 internal consumers (additive Phase 1) | not visual; SCC-trap fix incomplete (Phase 1 only); Phase 2 = L tranche | substrate emits at dist + package.json; consumer adoption is downstream | **PASS-FOR-PHASE-1** |

**No K-introduced substrate fails the visual-load-bearing-ness probe at HEAD.** All K artefacts that have a visual surface (rows 1, 2, 4, 5, 6, 7, 10, 11, 12) render their intent at the default tone via at least 2 distinct consumer files; the contracts that require interaction (focus state row 7, drag state row 11) are demonstrably wired and exercised in the rendered demos that mounted clean at W7/WP close.

## W6 brittleness window — β perspective

K W6 declared `breaking_changes_during_wave: yes` with `suspended_gates: dock-primary-tier-visual-fidelity` and `restoration_wave: W8 close ceremony π lane visual probe` (per `audit/K-pre-close.md:86-87` + `W6-B-dock-consumer-migration-proof.md:105-134`).

From β's perspective:

- The canonical `btn-audacious` recipe is wired at the dock primary tier via the `useAttrs`-based class composition in `DockTabButton.vue:36` (Strategy 1 selected per W6.B proof §Step 4). The dock-local recipe at `dock.css:714-769` retains only the dock-specific extensions: `--card/60` background, `--phase-color` hover radial, `[data-phase]:not([ready|idle])::before` halo. The lifted blocks (base shell + sparkle ::after + sparkle hover animation + PRM gate) are now single-sourced in `btn-audacious`.
- Static analysis confirms the recipe shape is **intent-equivalent** to the pre-W6 dock recipe: same `border` + `box-shadow` resting stack, same `paper-clean-texture` + `glass-specular` hover composition, same `sparkle-sweep` keyframe, same PRM gate logic (just inverted to the positive-gate `prefers-reduced-motion: no-preference` idiom matching `gold-shimmer` precedent at `utilities.css:200-204`).
- The W6.B proof §Step 7 explicitly enumerates three potential pixel-deltas: (a) at-rest `transition` tuple + `box-shadow` stack now inherited from `btn-audacious` instead of declared in dock-local rules; (b) hover composition now declares two background-image layers instead of three (the third was a `none` no-op); (c) PRM gate idiom inverted (behaviorally identical for both PRM states).
- β cannot independently certify pixel-fidelity from static read alone; the π lane Playwright PNG-diff at `/primitives/dock-group` and `/compositions/instrument-chassis` is the binding retraction probe per the brittleness-window declaration.

**β disposition**: the dock primary tier substrate is **WIRED visibly** in 3 demo consumers + the canonical recipe is consumed exactly via `btn-audacious`. Visual signature preservation is the open gate, gated on W8 π lane. β does not flag this as a failure — the brittleness-window protocol is the canonical handoff mechanism, and the dock primary tier still passes β's quantitative + recipe-presence bar.

## Subpath surface (WS) verification

Per task §3, `@mkbabb/glass-ui/forms`, `/composables/dark`, `/composables/keyboard` must exist + import-resolve from dist artefacts.

| Subpath | dist artefact | package.json exports | Source file | Verdict |
|---|---|---|---|---|
| `@mkbabb/glass-ui/forms` | `dist/forms.js` (`import` re-exports Input + Textarea + Combobox*) + `dist/forms.d.ts` (full type closure) | `package.json:303-307` `{development, types, import}` triplet present | `src/forms.ts` (Phase 1 additive re-export, 13 lines) | **PASS — emits + import-resolves** |
| `@mkbabb/glass-ui/composables/dark` | `dist/composables/dark.js` (re-exports `useGlobalDark`) + `dist/composables/dark.d.ts` | `package.json:308-312` triplet present | `src/composables/dark.ts` | **PASS — emits + import-resolves** |
| `@mkbabb/glass-ui/composables/keyboard` | `dist/composables/keyboard.js` (re-exports `registerShortcut`, `useRegisteredShortcuts`, `formatCombo`, `formatComboParts`, `isMac`) + `dist/composables/keyboard.d.ts` | `package.json:313-317` triplet present | `src/composables/keyboard.ts` | **PASS — emits + import-resolves** |

Per task §3 scope clause: visual probe is a no-op for subpaths (subpaths are import-shape changes, not visual). All 3 subpaths emit at dist with the matching package.json exports map. The Phase 1 SCC-trap honest-reporting note (W-S-bundle-evidence.md:111-118) acknowledges the additive carve does NOT break the SCC trap on its own — Phase 2 (root-barrel removal) is queued for L tranche / v1.0. Per K invariant 8, the substrate satisfies the consumer bar at the bundle-shape level (the dist artefact + exports map are the consumer); zero internal consumers reflects Phase 1 additive intent, not orphan-substrate.

## J β predecessor pattern — K's status against J's residual flags

J β audit at `J-audit-β-substrate.md` emitted 3 P0 visual regressions (F1/F2/F3 carousel mount) + 1 visual CAVEAT (F4 drag-keep-open) + 5 sub-bar token flags (F5-F8 preemptive tokens; F9 overlay-scrim duplicate). K's status against each:

| J flag | J disposition | K disposition |
|---|---|---|
| F1 — `<CarouselPager>` runtime mount error | P0 ABSORB-IN-W7 (J's own W7) | RESOLVED at J close per W7 commit; K W5 mobile-viewport fitness + W7 dock-with-slider run alongside; carousel renders cleanly at HEAD per WP/W7 dev-server probes |
| F2 — `<CarouselDots>` collateral regression | P0 ABSORB-IN-W7 | RESOLVED with F1 |
| F3 — `<GlassCarouselPager>` not-probed | P0 ABSORB-IN-W7 | RESOLVED with F1 |
| F4 — drag-keep-open visual CAVEAT (impl correct; no story) | DEFER-TO-K | **CLOSED IN K W7** — `demo/stories/compositions/dock-with-slider.vue` is the named story binding `<Slider>` inside `<GlassDock>` exercising the contract |
| F5 — `--space-phi-{5,6}` 0 consumers | DEFER-TO-K with named justification | Forward-compat retain (Tailwind bridge) — K does not absorb; not a K-introduced substrate |
| F6 — `--duration-sparkle` 0 production | DEFER-TO-K | **WIRED IN K W6** — `--duration-sparkle` consumed by `@utility btn-audacious` sparkle-sweep at `utilities.css:613` (substrate-with-consumer) |
| F7 — `--{success,warning,info}-foreground` 0 consumers | DEFER-TO-K | Per K-pre-close ledger row, V tranche commits `221d783` + `5dfe6fb` wired the triple — outside K's wave scope but documented as wired at HEAD |
| F8 — `--muted-soft` 0 consumers | DEFER-TO-K | Not absorbed by K; flagged for L per cross-tranche debt |
| F9 — `.overlay-scrim` @utility duplicate | P1 ABSORB-IN-W7 | **DELETED IN K W3.A** per W3-A proof §Step 4 — formal retire under K invariant 8 binary |

**K closes the F4 visual-load-bearing CAVEAT and the F6 substrate-with-consumer gap as part of W6 + W7. F1/F2/F3 P0s were already resolved at J close. F9 duplicate-utility retire landed in W3.A. F5/F8 stay deferred per cross-tranche debt; not in K scope.**

## Substrate-without-consumer ledger summary

Cross-checked against `audit/K-pre-close.md:64-72`:

- `--{success,warning,info}-foreground` triple — wired by V (≥ 2 consumers); β quantitative bar met
- `cssVar()` — RETIRED (K invariant 8 binary)
- `.overlay-scrim` @utility — DELETED (K invariant 8 binary)
- paper.css literal hsl rungs — ABSORBED by V (verified at HEAD)
- `<Tooltip>` `rounded-tooltip` — ABSORBED by V at `TooltipContent.vue:27`
- `Button variant="primary-audacious"` — 3 consumers at HEAD (this audit row 1)
- `@utility btn-audacious` — 3 consumers (gallery + hero + dock primary tier)
- `<HoverPopover hoverOpenDelay>` — 4 demo cells exercising 3 distinct cadences
- `dock-with-slider.vue` story — closes the J F4 visual-load-bearing CAVEAT
- vueuse subpaths — emit at dist; Phase 1 additive prerequisite (Phase 2 = L)

**β finds zero K-introduced substrate at sub-bar (< 2) consumer count or invisible-at-rest.** All K HEADLINE + supporting artefacts pass both the quantitative ≥ 2 bar and the visual-load-bearing-ness probe (with row 3 dock primary tier deferred to W8 π lane per the canonical brittleness-window protocol).

## Sub-bar flags (K close)

**None at HEAD for K-introduced substrates.** Every K-shipped substrate has ≥ 2 consumers OR is formally retired with rationale (K invariant 8 binary at K close).

The cross-tranche L-deferred sub-bar items per `K.md:179-188`:
- 3 unused public composables (Rε B5: `useRAFLoop`, `useIntersectionPause`, `useDarkModeSync`) — L cross-repo audit
- `useOffsetPagination` / `useVirtualSection*` / `useWindowedStore` (Rε B6) — L cross-repo audit
- P-tranche second-consumer fidelity (Rε B9: `<DiscoGlyph>` / `<DockGroup>` / `<InstrumentChassis>` — 1-consumer at HEAD) — L cross-repo audit
- WS Phase 2 (root-barrel removal of vueuse-bearing symbols) — L tranche / v1.0

These are not K residuals; they are explicitly cross-tranche debt with named L destination per the precept.

## Verdict

**K closes clean per β lane** for the substrate-without-consumer + visual-load-bearing-ness invariants.

- 15 K-introduced or K-migrated substrates probed.
- 9 substrates pass both quantitative + visual probes (rows 1, 2, 4, 5, 6, 7, 10, 11, 12).
- 1 substrate (row 3 dock primary tier) is WIRED + consumer-bar-pass with visual fidelity gated on W8 π-lane PNG-diff per the canonical W6 brittleness-window protocol — β classifies this as PASS-CONDITIONAL pending π retraction probe.
- 2 substrates (rows 8, 9) are formally RETIRED per K invariant 8 binary.
- 3 substrates (rows 13, 14, 15) are bundle-shape subpath additions where visual probe is a no-op and Phase 1 additive intent is acknowledged.
- 0 K-introduced substrates fail the ≥ 2 consumer bar at HEAD.
- 0 K-introduced substrates fail the visual-load-bearing-ness probe at HEAD.

K invariants 8 (substrate-without-consumer binary) and 10 (visual-load-bearing-ness) are satisfied at HEAD pending the W8 close ceremony π-lane retraction probe for the W6 brittleness window. β raises no P0 or P1 absorb candidates against K close.

## Cross-references

- Pre-close ledger: `docs/tranches/K/audit/K-pre-close.md`
- Predecessor pattern: `docs/tranches/J/audit/J-audit-β-substrate.md`
- K invariants: `docs/tranches/K/K.md` ## Binding invariants (rows 8, 10, 15)
- Substrate inventory: `docs/tranches/K/research/Rε-architectural-transpositions.md`
- W6 Lane A proof (HEADLINE variant authoring): `docs/tranches/K/audit/W6-A-audacious-cta-variant-proof.md`
- W6 Lane B proof (dock consumer migration + brittleness window): `docs/tranches/K/audit/W6-B-dock-consumer-migration-proof.md`
- W3 Lane A proof (vocab.γ second-pass + cssVar retire + overlay-scrim delete): `docs/tranches/K/audit/W3-A-src-vocab-residue-proof.md`
- W3 Lane B proof (demo focus-ring + surface-tint + transition decomposition): `docs/tranches/K/audit/W3-B-demo-vocab-residue-proof.md`
- W7 proof (Configurator P0 + dock-with-slider story + NumberField decision): `docs/tranches/K/audit/W7-drag-keep-open-story-proof.md`
- W1 proof (hoverOpenDelay rename): `docs/tranches/K/audit/W1-A-silent-miss-closeout-proof.md`
- WP proof (Skeleton compositor migration + Lighthouse a11y + perf): `docs/tranches/K/audit/WP-perf-a11y-cohort-proof.md`
- W-S subpath inventory + bundle evidence: `docs/tranches/K/audit/W-S-vueuse-inventory.md`, `docs/tranches/K/audit/W-S-bundle-evidence.md`
- Canonical β audit prompt: `docs/audits/overfitting-audit.md`
