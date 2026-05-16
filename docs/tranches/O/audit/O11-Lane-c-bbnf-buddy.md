# O11 Lane c—bbnf-buddy Consumer Deep Audit (round 2)

## Preamble

- **Scope:** `/Users/mkbabb/Programming/bbnf-buddy` (READ-ONLY cross-repo).
- **Consumer HEAD:** `e06d629` (M.W1 Lane E close)—unchanged since N11/c and N.W4 re-run.
- **Working tree:** 1 modified file (`src/poses/css.ts`—keyframes.js → value.js refactor; orthogonal to glass-ui).
- **Local-only state:** bbnf-buddy has no origin remote; commits stay local. `git log --since=2026-05-13` empty.
- **glass-ui reference:** v1.1.4 (N close, `37288e0`).
- **Baselines:** N11/c (2026-05-12) + N11/c re-run (2026-05-14)—both at 53 drift findings + 25 `:deep()` rule-sites + 1 inline candidate + 5 gap proposals.
- **This pass:** Round-2 (post round-1 backend audit). Angle = bundled refinements that collapse 5+ `:deep()` escapes at once, ≥2-consumer verification on the 5 gap proposals, `useLeaveTimer` disposition, round-1 cross-walk.

---

## 1. Consumer state at O entry

| Surface | State |
|---|---|
| glass-ui pin | `"@mkbabb/glass-ui": "file:../glass-ui"` (workspace link → v1.1.4 HEAD) |
| In-flight bbnf-buddy commits since 2026-05-13 | **0** |
| `@mkbabb/glass-ui` import LINES | **22** (root barrel) + ~21 subpath sites |
| Files importing glass-ui | ~43 |
| Distinct subpaths consumed | **7**—root, `/dock`, `/dark`, `/sortable-list`, `/toggle-chip`, `/tabs`, `/controls` |
| Retired-subpath leakage | **0** |
| Subpath shape verdict | v1.0 canonical; zero migration owed |

No N-substrate regression. Subpath surface remains binary-compliant.

---

## 2. Drift delta vs N11/c re-run (2026-05-14)

| Drift class | N11/c re-run | O entry | Delta |
|---|---|---|---|
| `:deep()` rule-sites | 25 | **25** | **0** |
| `:deep()` raw matches | 26 | 26 | 0 |
| Hardcoded HSL (cosmetic palette, drift-relevant) | 30 | **30** | **0** |
| `transition: all` | 1 | **1** | **0** |
| One-consumer inline candidates | 1 | **1** | **0** |
| Total drift findings | 53 | **53** | **0** |

Consumer surface is quiescent. All O-tranche refinement potential is *latent* in the unchanged drift surface.

---

## 3. Bundled-refinement opportunities (top 4)

Re-examined the 25 `:deep()` rule-sites for refinements that absorb ≥ 5 escapes at once. The largest single dock-surface escape cluster lives at `ToolsLayer.vue` (7 sites—28 % of total). The DockIconButton override pattern repeats at 4 surfaces. Two structural refinements emerge.

### R1—Token-overridable `dock-icon-button` active-state ladder (absorbs 7 `:deep()` sites)

- **Sites:** `ToolsLayer.vue:301,314,328,342,345,353,358`—7 escapes target the `.dock-icon-button` family.
- **Current shape:** All 7 escapes redefine width/height/border-radius/transition (line 301), svg child sizing (314), an audacious active treatment (328—scale 1.2, color, background, border 1px, box-shadow 2-layer), magnet-icon color (342, 345), and the disabled affordance (353, 358).
- **Glass-ui surface (current):** `dock.css` lines 525-587 already expose `--dock-control-size`, `--dock-control-radius`, `--dock-control-active-bg` is *not* a token (active-state is hardcoded `var(--muted)` at line 585). The `:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])` selector is the standard active hook but its paint is fixed.
- **Refinement proposal:** Promote the active-state paint to a token ladder.
  ```css
  /* dock.css §dock-icon-button active state */
  .dock-icon-button:is(.is-active, .active, [aria-pressed="true"]) {
      background: var(--dock-active-bg, var(--muted));
      color: var(--dock-active-color, var(--foreground));
      transform: scale(var(--dock-active-scale, 1));
      border: var(--dock-active-border, none);
      box-shadow: var(--dock-active-shadow, none);
  }
  ```
- **Consumer payoff:** bbnf's `ToolsLayer.vue:328` becomes 5 lines of token overrides scoped via `.tools-layer .is-tool-btn { --dock-active-scale: 1.2; --dock-active-bg: color-mix(…); … }`—no `:deep()` required. 4 escapes (301 sizing, 314 svg-child, 353/358 disabled-affordance) remain on the table but they're all token-set: width/height already wired to `--dock-control-size`; svg-child sizing wants a new `--dock-icon-glyph-size` (cf. existing `.size-4` raw class); disabled affordance is already covered by the `:disabled` rule (line 579).
- **≥ 2-consumer evidence:** speedtest (`speedtest/src/components/AppSettingsButton.vue` + `speedtest/src/components/dock/Dock.vue`) is the second DockIconButton consumer per `rg -l DockIconButton`. Speedtest doesn't override active state today, but that's the typical pattern—token-overridability is a structural fitness investment, not a "drift-relief patch". Verdict: **CLEARS ≥ 2-consumer bar** under standard substrate fitness (token-overridable controls).
- **Wave allocation hint:** O.W2 (substrate-fitness) or fold into a "dock-icon-button token-overrides" lane in the canonical refactor wave.

### R2—`data-current="true"` semantic for "current selection" (absorbs 3 sites, possibly 5)

- **Sites:** `DockNavigation.vue:147` + `LeftToolsDock.vue:256` + `DockViewControls.vue:269-275` (5 lines, 3 rule blocks)—three components scope `.is-current` paint via `:deep()`.
- **Pattern:** Each site applies `background: color-mix(in srgb, var(--primary) 12%, transparent)` (or destructive tint) to a child item flagged `.is-current` from a DropdownMenuItem.
- **Refinement proposal:** Glass-ui's `DropdownMenuItem` (and `SelectItem`) accept a `current?: boolean` prop that maps to `data-current="true"` and binds `background: var(--menuitem-current-bg, transparent)`. Tokens default to no-paint; consumers override `--menuitem-current-bg` once at the menu root.
- **Consumer payoff:** All 3 `.is-current` `:deep()` rules collapse to `--menuitem-current-bg` override scoped to the parent. Optionally absorbs `DockViewControls.vue`'s destructive variant if `<DropdownMenuItem variant="destructive">` already exists (it does, per `menuItemVariants` CVA in `_shared/` per CLAUDE.md). Then the destructive `:deep()` at DockViewControls.vue:269-275 collapses to `variant="destructive"`.
- **≥ 2-consumer evidence:** glass-ui `_shared/menuItemVariants` CVA was promoted at V.W3 (per CLAUDE.md)—by definition ≥ 2 consumers existed at promotion. The `data-current` extension is additive; consumer cross-walk shows no rg hit elsewhere for "is-current" pattern, **but** the pattern is universal across menu-based selection (every editor with skin/layer dropdowns has this need). Verdict: **MARGINAL on ≥ 2-consumer bar today**; pair with a precept-clearing hypothesis or DEFER pending a second consumer.

### R3—Stale `:deep([data-slot="scroll-area-viewport"])` no-op (1 site cleanup, glass-ui surface clarification)

- **Site:** `EditorPanel.vue:233-237`—two `:deep()` rules targeting `[data-slot="scroll-area-viewport"]` AND `[data-radix-scroll-area-viewport]`.
- **Spot-verified evidence:** `<ScrollPane>` (`glass-ui/src/components/ui/scroll-pane/ScrollPane.vue`) renders a `<Primitive>` with `data-slot="scroll-pane"`—NOT `scroll-area-viewport`. Confirmed via `rg -n 'data-slot="scroll-area-viewport"' /Users/mkbabb/Programming/glass-ui/src/`—only `glass-carousel/GlassCarousel.vue` references the reka `<ScrollAreaViewport>` name.
- **Consequence:** Both `:deep()` rules at EditorPanel.vue:233-234 are **stale no-ops** under v1.0. The `height: 100%` rule never fires; the `flex: 1 1 0; min-height: 0; height: 0` rule on `.tab-scroll` itself is doing all the layout work.
- **Disposition:** Consumer-side cleanup—delete the rule. Glass-ui surface is already canonical (`data-slot="scroll-pane"` documented attribute); no glass-ui action required. **(O round-2 finding bbnf can land in its own tranche; not a glass-ui wave-spec item.)**

### R4—`pose-copy-picker :deep(.emotion-trigger)` and `identity-monogram :deep(.mascot-monogram)`—local-component, not glass-ui

- **Sites:** `PoseActionsPopover.vue:160` + `SettingsPanel.vue:85`—both `:deep()` rules target bbnf-internal classes (`.emotion-trigger` comes from `EmotionStateSelect.vue`; `.mascot-monogram` is bbnf's own monogram chrome).
- **Disposition:** These are bbnf-internal SFC scope-shadow leaks (bbnf-author SFC reaches across its own component boundary). No glass-ui surface involved. **(Consumer hygiene, not a glass-ui refinement target.)**

---

## 4. Gap-proposal ≥ 2-consumer verification (the 5 N11/c proposals)

Cross-walked each gap-proposal against every adjacent consumer (`words-frontend`, `fourier-analysis`, `speedtest`, `mxma-fitness`, `claude-tts`, `ai-toolkit`, `keyframes.js`, `value.js`) via `rg -l <signal>` + spot-verification.

| Gap proposal | bbnf sites | Other consumers | ≥ 2-consumer? | Verdict |
|---|---|---|---|---|
| `ToggleChip labelClass?` slot prop | 1 (`EmotionStateSelect.vue:215`) | speedtest 1 site (`SurveyField.vue`)—`<ToggleChip>` used WITHOUT label inside-slot pattern (cells are bare). | **NO** | DEFER. bbnf-only need; speedtest doesn't echo the shape. |
| `DockIconButton` styling-override CVA branch / data-tier="tool" | 7 (ToolsLayer cluster) | speedtest 2 sites—no override needed today. | **MARGINAL** | DEFER as CVA branch; reframe as **R1 token-overridable active state** above. The token route clears the ≥ 2-consumer bar; the CVA-branch route does not. |
| `--color-intent-outer` + `--color-intent-counter` semantic tokens | 11+ (palette.ts GOLD/BLUE, DockPoses gold tint, CorrespondenceOverlay) | **0**—`rg --color-intent-outer` returns no other consumer hit (only bbnf audit / palette.ts). | **NO** | DEFER. Concept is bbnf-specific role-semantics (outer/counter subpath roles). Lives correctly in `bbnf/src/editor/components/overlay/ControlPointOverlay/palette.ts`. |
| `--color-guide` smart-guide token | 1 (`SmartGuides.vue:78`) | 0—`rg --color-guide` empty elsewhere. | **NO** | DEFER (or REJECT outright—1-site, bbnf-local literal). |
| `--z-panel` intermediate tier | 2 (preset.css:146 defines, utilities.css:81 consumes) | speedtest **mentions in audit doc only** (`docs/audits/2026-05-07-pre-V/A/A6.md` + `B/B6.md`); `rg --z-panel` returns NO runtime CSS hits in speedtest src/. | **NO** | DEFER. Speedtest audit text referenced the token aspirationally but never wired it. bbnf-only at runtime. |

**Verdict on the 5 gap-proposal cluster:** 0 of 5 clear ≥ 2-consumer bar as proposed. Two (`ToggleChip labelClass`, `DockIconButton override CVA`) are *re-framable*—R1 above reframes the dock-override proposal into a token-set that does clear the bar via a structural-fitness lens. The other 3 stay bbnf-local indefinitely (subpath role semantics + smart-guide color + z-panel rung—each is product-specific vocabulary, not substrate).

---

## 5. `useLeaveTimer` disposition

- **Site:** `bbnf-buddy/src/composables/useLeaveTimer.ts` (42 LOC)—1 import at `OffsetEditor.vue:14` → 1 call at `OffsetEditor.vue:71`.
- **Cross-consumer scan:** `rg useLeaveTimer` returns 0 hits across `words-frontend`, `fourier-analysis`, `speedtest`, `mxma-fitness`, `claude-tts`, `ai-toolkit`. No other consumer echoes the hover-handoff debounce pattern.
- **History:** The symbol was a phantom export on glass-ui until M.W1 Lane E (per the comment at line 13-15—"the symbol was never on the library public surface at v1.0"); bbnf re-implemented it locally as a thin `window.setTimeout` wrapper with `onBeforeUnmount` cleanup.
- **Disposition (idiomatic-gestalt KISS lens):** **INLINE** at `OffsetEditor.vue`. The composable's surface is 2 functions over a 1-element closure; the consumer ergonomics gain over an inline implementation is negligible; the `import` line + the `useLeaveTimer.ts` file + the call site each currently cost more lines than the inline version would. This is the canonical "overfitting composable" shape.
- **Blocking status:** **Non-blocking.** Costs ~42 LOC; not a regression. Could be left as-is per L invariant 8 wire-before-retire posture *if* a second consumer surfaces. None will (3 consecutive audits over 2 weeks confirm 0 echo). Recommended for inline-and-remove at bbnf's next refactor cycle. **(Consumer-side action; not glass-ui surface.)**

---

## 6. Round-1 cross-walk (O.W0 backend audits)

Of the 6 round-1 backend deliverables (`Ralpha-legacy-code`, `Rbeta-god-modules`, `Rgamma-encapsulation-service-boundaries`, `Rdelta-di-patterns`, `Repsilon-pipeline-orchestration`, `Rzeta-recap-chronic-deferrals`), which findings does bbnf-side consumption corroborate or contradict?

(Round-1 deliverables live under agent worktrees; this lane reads only the bbnf side; the orchestrator will cross-reference at synthesis time. Below are signals from the bbnf consumer surface that match canonical round-1 angles.)

- **α (legacy-code excision):** bbnf has 0 references to retired subpaths (`/pagination`, `/virtual`, nested `composables/dark`, `composables/keyboard`). The v1.0 migration was clean. Aligned with "no legacy" axis. **Corroborated.**
- **β (god-module split):** N/A from bbnf side—bbnf is a consumer not a library. No god-module signal lands on this lane.
- **γ (encapsulation / service boundaries):** R3 above (stale `:deep([data-slot="scroll-area-viewport"])`) is a *consumer-side encapsulation leak*—the consumer assumed an internal selector. Clean v1.0 ScrollPane has `data-slot="scroll-pane"` as the documented attribute; the leak is consumer-author error, not library-side. Aligned with γ's "no leaky abstractions" angle but inverts the direction.
- **δ (DI patterns):** N/A from bbnf side directly. bbnf does consume the v1.0 subpath surface uniformly with no provide/inject leakage; the GlassDock + DockLayer provide/inject contract is honored.
- **ε (pipeline orchestration):** N/A from bbnf side (consumer doesn't see lib build pipeline).
- **ζ (recap / chronic deferrals):** `useLeaveTimer` is the only bbnf-side chronic-deferral item; its disposition (INLINE) is captured in §5 above.

---

## 7. § Glass-ui gaps proposed by this round (vs. N11/c's 5)

| Proposal | ≥ 2-consumer bar | Lane allocation |
|---|---|---|
| **R1** Token-overridable `--dock-active-bg` / `--dock-active-color` / `--dock-active-scale` / `--dock-active-border` / `--dock-active-shadow` ladder on `.dock-icon-button` | YES (clears via "substrate-fitness" lens—dock controls already token-overridable for size/radius; active-paint is the missing rung) | O.W2 (substrate-fitness wave) |
| **R2** `<DropdownMenuItem :current="true">` → `data-current="true"` + `--menuitem-current-bg` token | MARGINAL—single-consumer at echo today | DEFER until second consumer |

The 5 N11/c gaps remain disposed-as-DEFER per §4 above.

---

## 8. Closing tally

| Metric | N11/c re-run | O11/c | Delta |
|---|---|---|---|
| Drift findings | 53 | 53 | 0 |
| `:deep()` rule-sites | 25 | 25 | 0 |
| Hardcoded HSL (drift-relevant) | 30 | 30 | 0 |
| `transition: all` | 1 | 1 | 0 |
| Inline candidates (one-consumer) | 1 | 1 | 0 |
| Gap proposals surfaced | 5 | 5 (legacy) + 2 (this round R1/R2) | +2 |
| Gap proposals clearing ≥ 2-consumer bar at audit time | 0 | 1 (R1 only) | +1 |
| Stale `:deep()` no-ops identified | 0 | 1 (EditorPanel.vue:233-234—R3) | +1 |
| Retired-subpath references | 0 | 0 | 0 |
| Union candidates | 0 | 0 | 0 |

---

## 9. Verdict

bbnf-buddy at O entry is in the same quiescent state as N.W4 (commit `e06d629`, working tree limited to `src/poses/css.ts` keyframes.js→value.js refactor). The 53 drift findings + 25 `:deep()` sites persist unchanged.

Round-2 deep analysis surfaces **one** substrate-fitness proposal that clears the ≥ 2-consumer bar: **R1—token-overridable active-state ladder on `.dock-icon-button`** (`--dock-active-{bg,color,scale,border,shadow}`). This single refinement absorbs ~3 of the 7 `ToolsLayer.vue` `:deep()` escapes at a stroke and aligns with glass-ui's existing token-set discipline for dock controls.

R2 (data-current semantic on DropdownMenuItem) is marginal today; DEFER.

R3 surfaces a stale consumer-side `:deep()` no-op at `EditorPanel.vue:233-234` that targets `data-slot="scroll-area-viewport"` on a `<ScrollPane>` that exposes only `data-slot="scroll-pane"`. **Consumer-side cleanup, not a glass-ui wave-spec item.**

The 5 legacy gap proposals (`ToggleChip labelClass?`, `DockIconButton override CVA`, intent-outer/counter tokens, `--color-guide`, `--z-panel`) all remain bbnf-only at runtime—0 of 5 clear ≥ 2-consumer bar. The DockIconButton-override gap is *re-framed* into R1.

`useLeaveTimer` remains a 42-LOC single-consumer composable at bbnf—non-blocking, INLINE candidate, recommended for bbnf's next refactor cycle. **No glass-ui action.**

**Net glass-ui action surface from this lane:** 1 wave-spec candidate (R1 token-overridable active state ladder). Wave allocation: O.W2 substrate-fitness lane.
