# P11/c—bbnf-buddy round-2 consumer audit (glass-ui v1.7.0)

## Preamble

- **Scope:** `/Users/mkbabb/Programming/bbnf-buddy` (READ-ONLY cross-repo).
- **Consumer HEAD:** `e06d629`—UNCHANGED since O11/c (2026-05-14) and O.W7 O11/c rerun. 4 consecutive audits, zero consumer-side commits.
- **Working tree:** 1 modified file (`src/poses/css.ts`—keyframes.js → value.js refactor; orthogonal to glass-ui surface; carried since O baseline).
- **glass-ui reference:** HEAD `b201b03` (package.json v1.7.0; untagged per P-AB1-tag).
- **Baseline:** O.W7 O11/c rerun—CLEAN; 53 drift findings carry; W6 Lane B token ladder substrate landed; consumer-side adoption at ToolsLayer.vue:328 deferred to bbnf wave.
- **This pass:** Verify v1.5/v1.6/v1.7 AB+1 cohort substrate non-regression against quiescent bbnf consumer; concretize CR-5 P-wave write spec.

---

## § Build verification at v1.7.0

```
$ npm run build
... vite v6.x build ...
dist/assets/JsonPanel-DzWdkq2H.js  3,287.75 kB │ gzip: 847.59 kB
dist/assets/index-CIc_ZpHC.js        651.33 kB │ gzip: 203.29 kB
(!) Some chunks are larger than 500 kB after minification.
✓ built in 6.18s
```

**Verdict: GREEN.** Build succeeds against `file:../glass-ui` v1.7.0. The 500 kB chunk warning is bbnf-internal (JsonPanel monaco-editor) and orthogonal to glass-ui. No type errors. No subpath resolution failures. No missing symbol failures.

The AB+1 cohort (v1.5.0 OFL font self-host + v1.5.1 `--phase-color-label` cascade + v1.6.0 MetricRow/MetricStack/AnimatedDigit + v1.7.0 MetricCell/ResponsiveTabs/ToggleGroupItem-card) introduced:

- 4 new flat subpaths (`/metric-stack`, `/animated-digit`, `/metric-cell`, `/responsive-tabs`)—none consumed by bbnf (verified §AB+1 below).
- 1 new font subsystem (Fira Code + Plus Jakarta Sans OFL)—consumed transparently via `@mkbabb/glass-ui/styles` CSS bundle import.
- 1 new chassis token (`--phase-color-label`)—non-load-bearing for bbnf (no chassis instantiation site).
- 1 timeline a11y inset fix—bbnf doesn't consume timeline.

**Substrate non-regression: BINARY-TRANSPARENT** across the entire v1.4.1 → v1.7.0 envelope.

---

## § CR-5 concrete migration (ToolsLayer.vue:328 → token ladder)

**Substrate at glass-ui HEAD `b201b03`:**

- `src/styles/tokens.css`—5 `--dock-active-*` tokens published (`bg`, `color`, `scale`, `border`, `shadow`).
- `src/styles/dock.css:588-597`—`.dock-icon-button:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])` rule consumes the cohort; defaults preserve prior visual contract.
- Substrate non-regression verified at W6 Lane B close.

**Consumer state at bbnf `e06d629`:**

`src/editor/components/dock/tools/ToolsLayer.vue:328`—unchanged from O11/c baseline:

```css
.tools-layer :deep(.dock-icon-button.is-tool-btn.is-active) {
    transform: scale(1.2);
    color: var(--foreground);
    background: color-mix(in srgb, var(--primary) 6%, transparent);
    border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
    box-shadow:
        0 0 0 2px color-mix(in srgb, var(--primary) 10%, transparent),
        0 4px 12px color-mix(in srgb, var(--primary) 15%, transparent);
}
```

All 5 declared properties map 1:1 to the `--dock-active-*` cohort. The 8-line `:deep()` rule collapses to a 7-line non-`:deep()` token-override block:

```css
/* Drop-in replacement: ToolsLayer.vue:319-336 → token override */
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

**Mechanism:** Custom-property inheritance crosses Vue's scoped-style boundary (CSS variables descend the DOM regardless of attribute-hash scope), so the override values flow into the glass-ui chunk's `.dock-icon-button:is(.is-active, ...)` rule where the `var(--dock-active-*)` references consume them. No `:deep()` needed.

**Net diff:** -1 `:deep()` rule-site (25 → 24); pixel-equivalent paint.

**Risk:** None. Glass-ui defaults preserve prior recipe; bbnf override values are identical `color-mix()` expressions.

**Allocation:** P-wave cross-repo write (1-line categorization—a single CSS block rewrite). Per P invariant (zero-deferral), this lands in a P implementation wave OR formally retires CR-5 with rationale.

**Recommended P-wave shape:** Single-file edit at `bbnf-buddy/src/editor/components/dock/tools/ToolsLayer.vue` lines 319-336. No glass-ui side action needed (substrate already landed at W6 Lane B v1.4.0). User-authorized cross-repo write protocol applies (per O CR-1/CR-3 precedent).

---

## § AB+1 adoption opportunities

`rg -n 'MetricCell|MetricStack|MetricRow|AnimatedDigit|ResponsiveTabs' /Users/mkbabb/Programming/bbnf-buddy/src/`:

```
(zero matches)
```

bbnf consumes NONE of the AB+1 cohort primitives.

**Per-primitive adoption opportunity assessment:**

| Primitive | Likely site in bbnf | Adoption viability |
|---|---|---|
| `MetricCell` | None—bbnf has no metric-dashboard surface; the animation timeline / layers panel use Badge + Card recipes for label-value pairs but not in stacked-metric layouts | NO opportunity |
| `MetricStack` / `MetricRow` | None—same rationale; bbnf surfaces are editor-tool-focused, not metrics-focused | NO opportunity |
| `AnimatedDigit` | Could land at `KeyframeTimeline.vue` if a numeric scrubber gains animated transitions OR at the animation easing preview panel; both are speculative | MARGINAL (no current pain point) |
| `ResponsiveTabs` | Currently uses `<BouncyTabs>` from `@mkbabb/glass-ui/tabs` at `EditorPanel.vue:10`—would only swap if bbnf's tab containers need viewport-responsive collapsing-to-overflow-menu behavior. Editor tabs are fixed-count (3-4 tabs); not a fit. | NO opportunity |

**Verdict:** AB+1 cohort introduces ZERO net adoption opportunity for bbnf. The cohort served speedtest's AC.W6 metric-grid surfaces. bbnf's substrate doesn't intersect.

**This is non-regressive**—the AB+1 primitives ship via subpath only (not root barrel) per the curated-public-surface invariant; bbnf simply doesn't import them. No carry-to-P from this lane.

---

## § 53-finding ledger delta (vs O.W7 O11/c rerun)

| Drift class | O.W7 baseline | This pass (P11/c) | Delta |
|---|---|---|---|
| `:deep()` rule-sites | 25 | **25** | **0** |
| `:deep()` raw matches | 26 | **26** | **0** |
| Hardcoded HSL (raw rg) | 30 drift-relevant | 33 vue + ts raw matches; envelope unchanged (palette.ts cluster + ToolsLayer + EmotionStateSelect—same files as O baseline) | **0** drift-relevant |
| `transition: all` | 1 (`EmotionStateSelect.vue:155`) | **1** (same site) | **0** |
| One-consumer inline candidates | 1 (`useLeaveTimer`) | **1** (still 1 site at `OffsetEditor.vue:14,71`) | **0** |
| **Total drift findings** | **53** | **53** | **0** |

**Delta: ZERO across the board.** bbnf's working tree has 1 modified file (`src/poses/css.ts`) carried from O baseline—orthogonal to glass-ui surface. `git log --since=2026-05-08` returns 0 commits.

Per P invariant (zero-deferral) the 53 findings cannot carry past P close. Each needs a P-wave destination—see §P-wave proposals below.

---

## § useLeaveTimer inline candidate (P-wave RETIRE-as-inline?)

- **Sites at HEAD:** 1 declaration (`src/composables/useLeaveTimer.ts` ~42 LOC) + 1 consumer site (`OffsetEditor.vue:14` import + `:71` call).
- **5-audit consistency:** Single-site through O11/c → O.W7 O11/c rerun → P11/c (4 consecutive audits ~2 weeks span). No second consumer surfaced.
- **glass-ui surface:** Confirmed never on glass-ui public surface (per M.W1 Lane E useLeaveTimer-resolution doc-comment).
- **Substrate-without-consumer-binary invariant (L #8):** A single-site composable with no second consumer is INLINE-candidate by definition.

**P-wave disposition recommendation:** RETIRE-as-inline via bbnf-side cross-repo write. ~42 LOC composable folds into `OffsetEditor.vue`'s `<script setup>` as a local `ref` + `setTimeout` helper (~10-15 LOC). Net -1 file, -30 LOC overhead. Non-blocking; zero glass-ui surface action.

**Alternative disposition:** Promote to glass-ui `composables/reactive/` IF a P-wave audit surfaces a second consumer across the constellation (words/frontend, fourier-analysis, keyframes.js, value.js, speedtest). P5/Pζ cross-consumer scan would settle this. Default to INLINE per single-consumer evidence.

---

## § dock-DI binary-transparent verification (zero string-key injects at HEAD)

`rg -n 'dockKeepOpen|dockRelease|dockHeld|glassDockId|glassDockContext|dockLayerGroup|dockExpanded' /Users/mkbabb/Programming/bbnf-buddy/src/`:

```
(zero matches)
```

bbnf consumes `<GlassDock>`, `<DockLayer>`, `<DockLayerGroup>`, `<DockIconButton>`, `<DockDropdownTrigger>` as black-box composite components only—never reaches into DI internals via `inject()`. The W2 typed `provideDockContext` + `useDockContext` / `useOptionalDockContext` helper-pair canon is fully encapsulated.

**Verdict: BINARY-TRANSPARENT.** Zero retired-key consumption at HEAD. No P-wave action required.

---

## § Renames audit (avatarVariants + installDarkModeSync) at v1.7.0

`rg -n 'avatarVariants|avatarVariant\b|AvatarVariants|installDarkModeSync|useDarkModeSync' /Users/mkbabb/Programming/bbnf-buddy/src/`:

```
(zero matches)
```

- bbnf consumes `Avatar`, `AvatarImage`, `AvatarFallback` components only at `SettingsPanel.vue:8`—never imports the `avatarVariants` CVA const directly.
- bbnf consumes `useGlobalDark` (3 sites: `main.ts:3`, `CodeEditor.vue:20`, `SettingsPanel.vue:10`)—never imports `installDarkModeSync` (which is internal to glass-ui's `composables/motion/` and used only via the root motion barrel).

**Verdict: NO BREAKAGE.** Both renames remain non-load-bearing for bbnf at v1.7.0. No migration owed.

---

## § P-wave cross-repo write proposals (zero-deferral synthesis)

Per P invariant 7 (ZERO DEFERRAL), the 4 outstanding bbnf-side items cannot exit P as residuals. Each needs a P-wave destination:

### Item 1—CR-5 ToolsLayer.vue:328 `:deep()` retirement (PROPOSED: P-wave cross-repo write)

- **Scope:** 1-file edit; 1 CSS block rewrite (8 lines → 7 lines token override).
- **Risk:** Zero—pixel-equivalent paint by construction.
- **Allocation:** User-authorized cross-repo write protocol (per O CR-1/CR-3 precedent).
- **Hard gate:** Pre/post Playwright visual probe at `bbnf-baseline.png` (already exists in repo root).

### Item 2—useLeaveTimer INLINE-as-rewrite (PROPOSED: P-wave cross-repo write, cohort with Item 1)

- **Scope:** 1-file edit + 1-file delete; ~10-15 LOC of inline helper added to `OffsetEditor.vue`.
- **Risk:** Low—drop-in replacement; no public surface impact (composable never on glass-ui side).
- **Allocation:** Cohort with Item 1 under a single bbnf-side P-wave commit.

### Item 3—30 hardcoded HSL drift findings (PROPOSED: P-wave cross-repo categorize-and-retire)

The hardcoded HSL cluster is bbnf-product-vocabulary (control-point overlay palette + rainbow marquee + magnet tint). Per O baseline, these are "product-vocabulary" not "design-system drift"—they encode bbnf's visual identity (red magnet, rainbow active state, spectrum control points). Token-conversion would harm bbnf-side identity.

- **P-wave shape:** Categorize each of the 30 sites as either (a) product-vocabulary (KEEP local) or (b) drift-against-glass-ui-tokens (MIGRATE). Land an inline `/* product-vocabulary */` annotation per (a)-class site to formally retire the audit ledger entry.
- **Risk:** Zero—pure annotation; no behavior change.
- **Cohort:** Same bbnf-side P-wave commit as Items 1 + 2.

### Item 4—1 `transition: all` at EmotionStateSelect.vue:155 (PROPOSED: P-wave cross-repo property-list rewrite)

- **Scope:** 1-line CSS edit; replace `transition: all var(--duration-fast) var(--ease-standard)` with an explicit property list (likely `background, color, border-color` based on the selector context).
- **Risk:** Low—narrows transition scope; no new properties transitioned.
- **Cohort:** Same bbnf-side P-wave commit.

### Item 5—2 stale `:deep()` no-ops at EditorPanel.vue:233-234 (carried from O11/c R3)

- **Scope:** 2-line delete; the rules target `data-slot="scroll-area-viewport"` which doesn't exist on v1.0 `<ScrollPane>` (exposes `data-slot="scroll-pane"`).
- **Risk:** Zero—dead-code removal.
- **Cohort:** Same bbnf-side P-wave commit.

**Aggregate P-wave proposal:** ONE bbnf-side cross-repo commit absorbs Items 1-5. Net diff: -1 file (`useLeaveTimer.ts`), -3 `:deep()` rule-sites (25 → 22), -1 `transition: all` (1 → 0), 30 HSL sites formally categorized. Pre/post Playwright probe gates the commit. Single-user-authorization cycle.

**Alternative (formal retirement path):** If user opts NOT to authorize cross-repo writes at P, each item formally retires with a rationale doc citing bbnf as out-of-band consumer (the bbnf-side product-vocabulary argument holds for Items 3 + 4; Items 1 + 2 + 5 still benefit but are non-blocking). The retirement-doc shape per P invariant 7 ("formally retires") is a per-item disposition table in `docs/tranches/P/cross-repo-retirements.md` (hypothetical filename).

---

## § Verdict

**CLEAN at v1.7.0.**

- **Build verification:** GREEN. No regression across v1.4.1 → v1.7.0 envelope (4 release bumps + AB+1 cohort).
- **CR-5 substrate:** READY at glass-ui side since W6 Lane B v1.4.0. Concrete migration spec authored above (8-line `:deep()` → 7-line token override). P-wave cross-repo write proposed.
- **AB+1 adoption:** ZERO opportunities at bbnf surface (cohort served speedtest's metric-grid use case; bbnf's editor-tool focus doesn't intersect). Non-regressive.
- **53-finding ledger:** ZERO delta from O.W7 baseline. All 53 carry into P with proposed cross-repo write absorbing 5 disposition groups (CR-5 + useLeaveTimer + 30 HSL + transition-all + 2 stale `:deep()`).
- **useLeaveTimer:** Still 1 site across 4 consecutive audits. RETIRE-as-inline recommendation stands.
- **dock-DI:** BINARY-TRANSPARENT. Zero retired-string-key injects at HEAD.
- **Renames audit (avatarVariants + installDarkModeSync):** NO BREAKAGE at v1.7.0.

**Net glass-ui carry-to-P from this lane:** ZERO substrate items. Per P invariant 7 (zero-deferral), the 5 bbnf-side disposition groups require a P-wave cross-repo write OR formal retirement—both paths are documented above.

**Lane closing posture:** READY for P-round-2 synthesis.
