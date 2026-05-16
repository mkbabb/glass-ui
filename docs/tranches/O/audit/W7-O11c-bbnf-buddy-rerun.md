# O.W7—O11/c bbnf-buddy consumer re-audit (post-O substrate)

## Preamble

- **Scope:** `/Users/mkbabb/Programming/bbnf-buddy` (READ-ONLY cross-repo).
- **Consumer HEAD:** `e06d629`—UNCHANGED since O11/c (2026-05-14 round-2) and N11/c re-run.
- **Working tree:** 1 modified file (`src/poses/css.ts`—keyframes.js → value.js refactor; orthogonal to glass-ui).
- **glass-ui reference:** post-W6 close at `25e1b5a` (v1.4.0; W6 Lane B `--dock-active-*` token ladder landed; W4 Lane C `avatarVariants` + W4 motion `installDarkModeSync` renames landed).
- **Baseline:** O11/c (2026-05-14)—53 drift findings + 25 `:deep()` rule-sites + 1 inline candidate + 5 gap proposals + R1 wave-spec candidate for `.dock-icon-button` token ladder.
- **This pass:** Post-O substrate verification. Confirm W6 Lane B token-ladder availability, dock-DI BINARY-TRANSPARENT, W4 renames non-breaking, drift findings delta.

---

## § Per-finding disposition

### 1. dock-icon-button token ladder consumption (W6 Lane B verification)

**Substrate state at HEAD (glass-ui `25e1b5a`):**

- `src/styles/tokens.css:682-686`—5 tokens published: `--dock-active-bg`, `--dock-active-color`, `--dock-active-scale`, `--dock-active-border`, `--dock-active-shadow`.
- `src/styles/dock.css:588-597`—`.dock-icon-button:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])` rule rewired to consume tokens; defaults preserve prior visual contract (`var(--muted)` + `var(--foreground)` + identity transform + no border + no shadow).
- Substrate verification: **CLEAN**. Token cohort is published; visual contract preserved by construction (verified upstream in W6 Lane B proof §"Visual-contract preservation argument").

**Consumer state at HEAD (bbnf `e06d629`):**

7 `:deep()` escapes at `src/editor/components/dock/tools/ToolsLayer.vue` unchanged from O entry baseline:

| Line | Selector | Adoption viability |
|---|---|---|
| 301 | `.dock-icon-button` | Sizing override (`var(--size-icon-btn)`, `var(--radius-lg)`) + custom transition. Per O11/c §3.R1—could swap to `--dock-control-size` / `--dock-control-radius` overrides instead. **Token-set already covers this rung pre-W6.** |
| 314 | `.dock-icon-button .size-4` | SVG-child sizing (1.25 rem). No glass-ui token covers this; per O11/c R1, a future `--dock-icon-glyph-size` would clear it. **NOT covered by W6 Lane B.** |
| **328** | `.dock-icon-button.is-tool-btn.is-active` | **5 properties**—`transform: scale(1.2)` + `color` + `background` + `border` + `box-shadow`. **All 5 map 1:1 to the new `--dock-active-*` cohort.** **PRIME R1 ADOPTION TARGET.** |
| 342 | `.magnet-btn svg` | bbnf-internal `.magnet-btn` class (not a glass-ui selector). Lives correctly local. |
| 345 | `.magnet-btn.is-active svg` | Same—bbnf-internal SVG filter. Local. |
| 353 | `.dock-icon-button.is-disabled` | Disabled affordance. glass-ui has a `:disabled` rule (dock.css line ~579) but bbnf uses a `.is-disabled` class flag—selector mismatch. Could be re-keyed to `:disabled` if bbnf flips its attribute model; out-of-scope for W6 Lane B. |
| 358 | `.dock-icon-button.is-disabled:hover` | Hover affordance for disabled. Same as 353. |

**Adoption path (ToolsLayer.vue:328 → token overrides):**

```css
/* Drop-in replacement for ToolsLayer.vue:319-336 */
.tools-layer .dock-icon-button.is-tool-btn {
    --dock-active-scale: 1.2;
    --dock-active-color: var(--foreground);
    --dock-active-bg: color-mix(in srgb, var(--primary) 6%, transparent);
    --dock-active-border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
    --dock-active-shadow:
        0 0 0 2px color-mix(in srgb, var(--primary) 10%, transparent),
        0 4px 12px color-mix(in srgb, var(--primary) 15%, transparent);
}
```

This collapses 1 `:deep()` rule (8 lines incl. selector) into 7 CSS custom-property overrides on a regular selector (no `:deep()` required—these are inherited custom properties that descend into the scoped glass-ui chunk through CSS variable inheritance, not Vue scope-shadow).

**Verdict for finding 1:** Substrate ready (W6 Lane B CLEAN at glass-ui side). Consumer adoption deferred to bbnf's own refactor cycle; **non-blocking** for glass-ui O close. Adoption net: -1 `:deep()` rule-site for bbnf (25 → 24 if landed); lines 301, 314, 342, 345, 353, 358 remain (covered by future R1 follow-ons—`--dock-icon-glyph-size` + `:disabled` selector alignment—both out-of-scope for W6 Lane B).

---

### 2. 53 drift findings delta

**Re-tallied at HEAD against glass-ui `25e1b5a`:**

| Drift class | O11/c (2026-05-14) | O.W7 entry | Delta | Carry-to-P? |
|---|---|---|---|---|
| `:deep()` rule-sites | 25 | **25** | **0** | Yes—R1 adoption pending bbnf-side wave |
| `:deep()` raw matches | 26 | 26 | 0 | Same |
| Hardcoded HSL (drift-relevant) | 30 | **30** | **0** | Yes—palette.ts cluster is bbnf-product-vocabulary; defers indefinitely |
| `transition: all` | 1 | **1** | **0** | Yes—local cleanup not glass-ui surface |
| One-consumer inline candidates | 1 | **1** | **0** | Yes—`useLeaveTimer` (§3) |
| **Total drift findings** | **53** | **53** | **0** | All carried forward to P unchanged |

bbnf consumer surface remains **fully quiescent** through the O tranche flight window. `git log --since=2026-05-13` returns 0 commits at bbnf-buddy. No drift progressed because no consumer-side work happened.

**Verdict for finding 2:** All 53 carry to P unchanged. No regression. R1 (W6 Lane B substrate) lands the canonical adoption-ready surface; landing adoption is downstream consumer wave.

---

### 3. useLeaveTimer inline candidate

- **Sites:** 1 declaration (`src/composables/useLeaveTimer.ts`) + 1 import + 1 call (`src/editor/components/OffsetEditor/OffsetEditor.vue` lines 14, 71). No second consumer surfaced.
- **Cross-consumer scan:** confirmed via `rg useLeaveTimer src/` returns the same 3 hits as O11/c baseline.
- **Disposition unchanged from O11/c §5:** INLINE candidate; ~42 LOC overhead; non-blocking; recommended for bbnf's next refactor cycle. **No glass-ui action.**

**Verdict for finding 3:** Single-site; consumer-owned; carry to P as-is.

---

### 4. dock-DI cleanup BINARY-TRANSPARENT (W2)

**Substrate state at HEAD (glass-ui `25e1b5a`):**

W2 Lane A landed typed `provideDockContext` + `useDockContext` (strict) / `useOptionalDockContext` (silent) helper-pair canon. W2.b retired the 5 transitional legacy string-key provides at v1.2.2.

**Retired string-keys:** `"dockKeepOpen"`, `"dockRelease"`, `"dockHeld"`, `"glassDockId"`, `"glassDockContext"`, `"dockLayerGroup"`, `"dockExpanded"`.

**Consumer verification (`rg -n 'dockKeepOpen|dockRelease|dockHeld|glassDockId|glassDockContext|dockLayerGroup|dockExpanded' /Users/mkbabb/Programming/bbnf-buddy/src/`):**

```
(zero matches)
```

bbnf consumes only `<GlassDock>`, `<DockLayer>`, `<DockLayerGroup>` as black-box composite components—never reaches into the DI internals via `inject()`. The W2 helper-pair canon is fully encapsulated under the public component API.

**Verdict for finding 4:** dock-DI cleanup **BINARY-TRANSPARENT** for bbnf. Zero retired-key consumption. Substrate non-regression CLEAN.

---

### 5. Renames audit (avatarVariants + installDarkModeSync)

**W4 Lane C—`avatarVariant` → `avatarVariants` (singular → plural CVA naming consistency):**

- Consumer search: `rg -n 'avatarVariants|avatarVariant\b|AvatarVariants' /Users/mkbabb/Programming/bbnf-buddy/src/` returns **0 hits**.
- bbnf consumes `Avatar`, `AvatarImage`, `AvatarFallback` components only (`SettingsPanel.vue:8`)—never imports the CVA const directly.
- Verdict: **NO BREAKAGE**.

**W4 motion—`useDarkModeSync` → `installDarkModeSync` (use-prefix → install-prefix imperative-installer canon):**

- Consumer search: `rg -n 'installDarkModeSync|useDarkModeSync' /Users/mkbabb/Programming/bbnf-buddy/src/` returns **0 hits**.
- bbnf consumes `useGlobalDark` (3 sites: `main.ts:3`, `CodeEditor.vue:20`, `SettingsPanel.vue:10`)—the dark-mode-sync installer is internal to glass-ui's motion sub-tree.
- Verdict: **NO BREAKAGE**.

**Verdict for finding 5:** Both renames are **non-load-bearing for bbnf** at consumer surface. No migration owed.

---

## § Substrate non-regression

| Substrate axis | Pre-O state | Post-W6 state | Bbnf consumer impact |
|---|---|---|---|
| Subpath surface | 7 subpaths (root, `/dock`, `/dark`, `/sortable-list`, `/toggle-chip`, `/tabs`, `/controls`) | Same 7 subpaths; all canonical v1.0 shape | **None**—no migration |
| Retired-subpath leakage | 0 | 0 | **None**—clean |
| Dock-DI internals | string-keys (legacy) → typed-context (canon) via W2.a + W2.b | typed-context BINARY-TRANSPARENT | **None**—bbnf never reaches into DI |
| `.dock-icon-button` active-state recipe | hardcoded `var(--muted)` + `var(--foreground)` | 5-token ladder; defaults preserve recipe | **None** at default; OPPORTUNITY at override (R1) |
| `avatarVariants` const rename | `avatarVariant` (singular) | `avatarVariants` (plural) + `AvatarVariants` type | **None**—bbnf doesn't import the const |
| `installDarkModeSync` rename | `useDarkModeSync` | `installDarkModeSync` (imperative-installer) | **None**—bbnf consumes `useGlobalDark` only |
| Net consumer-visible breakage |—|—| **0 sites** |

**Substrate non-regression verdict: CLEAN.**

---

## § Adoption opportunities

### A1—ToolsLayer.vue:319-336 → token-override block (R1 landing)

**Net change:** -1 `:deep()` rule-site at consumer; net `:deep()` rule count drops from 25 → 24.

**Mechanism:** Rewrite the `.tools-layer :deep(.dock-icon-button.is-tool-btn.is-active)` block as a non-`:deep()` block setting the 5 `--dock-active-*` custom properties on `.tools-layer .dock-icon-button.is-tool-btn`. Custom-property inheritance (cascading through the scoped boundary) carries the values into the glass-ui chunk's rules. The visual paint reproduces exactly.

**Risk:** None—defaults at glass-ui side restate prior pixel-equivalent recipe. Override values are the same `color-mix()` calls bbnf already uses.

**Allocation:** bbnf-side P-tranche (or whatever bbnf calls its next refactor cycle).

### A2—Future R1 follow-ons (out-of-scope for O)

- `--dock-icon-glyph-size` token would absorb ToolsLayer.vue:314 (the `.size-4` SVG-child rule). **Not in W6 Lane B; flag for P substrate-fitness wave if a second consumer surfaces.**
- `:disabled` vs `.is-disabled` selector alignment would absorb ToolsLayer.vue:353 + :358. **Consumer-side attribute-model decision; not a glass-ui surface item.**

### A3—R3 stale `:deep()` cleanup (carried from O11/c)

`EditorPanel.vue:233-234`—two `:deep()` rules targeting `data-slot="scroll-area-viewport"` are stale no-ops under v1.0 `<ScrollPane>` (which exposes `data-slot="scroll-pane"`). **Consumer-side cleanup; not glass-ui surface.**

### A4—R2 (data-current semantic on DropdownMenuItem)—still MARGINAL

Single-consumer at echo (3 bbnf sites). Per O11/c §3.R2, DEFER until a second consumer surfaces. No change since baseline.

---

## § Verdict

**CLEAN.**

Post-O substrate at glass-ui `25e1b5a` is non-regressive for bbnf-buddy. The W6 Lane B token-ladder lands the substrate side of O11/c R1 cleanly—bbnf consumer adoption is the downstream wave (1 rule-site collapse waiting at `ToolsLayer.vue:328`).

The 53 drift findings carry to P unchanged. The single inline candidate (`useLeaveTimer`) remains single-site after 4 consecutive audits over ~2 weeks; recommended for bbnf-side INLINE-and-remove. Both W4 renames (`avatarVariants`, `installDarkModeSync`) are non-load-bearing for bbnf (consumer surface uses component-only / different composable).

Dock-DI W2 cleanup is BINARY-TRANSPARENT for bbnf—zero retired-key consumption confirmed via 7-key grep returning 0 matches across all of bbnf's src/.

**Per-finding summary:**

| # | Finding | Verdict |
|---|---|---|
| 1 | W6 Lane B dock-icon-button token ladder | Substrate CLEAN; 1 consumer-side adoption opportunity (ToolsLayer.vue:328) |
| 2 | 53 drift findings delta | Carry to P unchanged (0 progression) |
| 3 | useLeaveTimer inline candidate | Still 1 site; non-blocking; bbnf-side INLINE recommendation stands |
| 4 | Dock-DI W2 cleanup BINARY-TRANSPARENT | CLEAN (0 retired-key hits) |
| 5 | Renames audit (avatarVariants + installDarkModeSync) | NO BREAKAGE (0 consumer-side echoes) |

**Net glass-ui carry-to-P from this lane:** ZERO substrate items (W6 Lane B already landed the R1 substrate; consumer adoption is bbnf-side). 

**Lane closing posture:** READY for orchestrator close.
