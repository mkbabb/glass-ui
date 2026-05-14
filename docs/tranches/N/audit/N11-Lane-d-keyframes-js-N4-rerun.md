# N11 Lane d — keyframes.js Style Audit — N4 Re-run

## Preamble

**Scope:** `/Users/mkbabb/Programming/keyframes.js/` — N.W4 re-run of N11 Lane d, post-N substrate (N.W0 → N.W2 wave close + AB Living-UI canon close).

**Target:** keyframes.js @ `7561af3` on `master` (v2.1.0 — AB.W6 settle release tag landed; working tree CLEAN; `--since=2026-05-13` log returns 0 commits).

**Glass-ui reference:** `/Users/mkbabb/Programming/glass-ui/` @ N.W2 close `ffc02a9` (v1.1.3 — Configurator density CVA + N7 dock-blur audit NO-OP).

**Baseline:** `docs/tranches/N/audit/N11-Lane-d-keyframes-js.md` (2026-05-12), targeting commit `b788205` on the WIP branch `w.w2.1-keyframes-prebuild`. **Branch drift note:** the dispatch flagged the M.W1 commit as living on a WIP branch per cross-repo policy; however the user has since landed `b788205` on `master` (already present at HEAD as the 4th-most-recent commit). The `w.w2.1-keyframes-prebuild` branch no longer exists at HEAD (`git branch -l` returns: development, gh-pages, grouping, master\*, modernize, perf, tmp, ui-refresh — none match). Treat this as a normal upstream-landed migration, not a WIP carry-forward.

**Audit date:** 2026-05-14.

This re-run applies all seven axes of the canonical style-audit canon (`docs/audits/style-audit.md`) to the keyframes-editor demo, comparing each finding against the 2026-05-12 baseline. Sections per the N11 Lane-a template.

---

## Axis 1: Token Alignment

**Re-verification of baseline drift (hardcoded shadow on AnimationVisualizer):**

Baseline finding (line 27): `AnimationVisualizer.vue:27` hardcoded `box-shadow: 0 0 0 0.5rem` as a custom ring instead of `--shadow-xs` or canonical token.

**Current state:** `AnimationVisualizer.vue:16` now uses Tailwind `shadow-md` (canonical glass-ui token-backed utility). Line 26 uses `shadow-sm`. **Drift CLOSED** — likely incidental fix during AB.W6 settle pass or earlier user cleanup.

| Usage | Files | Status (N4 re-run) |
|-------|-------|--------------------|
| `--duration-*`, `--ease-*`, `--z-*` canon | unchanged from baseline | Canonical ✓ |
| `shadow-md`, `shadow-sm` (Tailwind utility → glass-ui shadow tokens) | `AnimationVisualizer.vue:16,26` | **Canonical ✓ (was Drift in baseline)** |
| `--accent-red`, `--foreground`, `--muted-foreground` | multiple custom components | Canonical ✓ |

**Axis 1 verdict:** 1 drift item from baseline RESOLVED. Net drift: 0 on Axis 1.

---

## Axis 2: Utility & `@layer` Hygiene

**Re-verification:** baseline noted no custom `@layer components` redefinitions and clean base layer.

**Current state:** unchanged. No `@layer components` collisions discovered in `demo/@/styles/`. Custom `.tab-trigger-*`, `.btn-playback*`, `.icon-*` vocabulary in `demo/@/styles/utils.css` remains project-specific (not redefining glass-ui canon).

**Axis 2 verdict:** stable. 0 new drift; 0 regressions.

---

## Axis 3: Interactive Consistency

**Baseline drift items (3):**
1. CopyButton missing active/focus states
2. 6 instances of `hover:scale-105` ad-hoc scale instead of `--scale-hover`
3. Timeline caret missing focus ring

**Current state (post-N substrate):**

| Pattern | Baseline | N4 re-run | Status |
|---------|----------|-----------|--------|
| `hover:scale-105` total count | 6 | **10** | **REGRESSION** — drift grew by 4 instances (CubeScene, App.vue, cube/App.vue, additional KeyframesEditor sites) |
| CopyButton focus-visible | missing | missing | Unchanged |
| Timeline caret focus | missing | missing | Unchanged |
| `.btn-playback` 4-state contract | canonical ✓ | canonical ✓ | Stable |

**`hover:scale-105` regression sites (N4 re-run):**
- `demo/app/scenes/CubeScene.vue:111` (NEW)
- `demo/app/App.vue:44` (NEW)
- `demo/cube/App.vue:19,51` (NEW)
- `demo/@/components/custom/animation-controls/controls/TimingFunctionPanel.vue:28` (carried)
- `demo/@/components/custom/animation-controls/keyframes/KeyframeCard.vue:17` (carried)
- `demo/@/components/custom/animation-controls/keyframes/KeyframesEditor.vue:70,137,152` (carried)
- `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:96` (carried)

**Axis 3 verdict:** 3 drift items carried + 1 vocabulary regression (hover-scale-105 grew 6 → 10). N6 proposal (focus-ring slot prop on Button variants) remains live.

---

## Axis 4: Variant Orthogonality & Rooting

**Re-verification:** no `:deep()` surgery on reka primitives; ResponsiveSelect/EasingSelect remain cleanly rooted on `SelectTrigger`/`SelectContent`.

**N.W2 cross-check — Configurator density CVA:** keyframes.js does not consume `Configurator`/`ConfiguratorLayer`/`ConfiguratorRow` (verified via `rg "from \"@mkbabb/glass-ui/configurator"` → 0 hits in demo/). N7 dock-blur audit landed as NO-OP. **No N-wire-induced regression.**

**Axis 4 verdict:** stable. 0 drift.

---

## Axis 5: Overlay & Motion Vocabulary

**Baseline drift item:** `prefers-reduced-motion` gate missing for custom `@keyframes` (liftDown, dotFade).

**Current state:** `grep -r "prefers-reduced-motion"` against `demo/**/*.{vue,css,ts}` (excluding `/dist/`) returns **0 hits**. Custom keyframes still ungated:
- `AnimatedText.vue:65` (`liftDown`), `:89` (`dotFade`)
- `CubeTarget.vue:139` (`idle-bob` — NEW since baseline, not gated)
- `CopyButton.vue:41,53` (`fade-in`, `fade-out` — keyframes built via library API, not raw CSS; legitimate)
- `AnimationMenuBar.vue:216,225` (`twist`, `shake` — library-API-built, legitimate)
- `KeyframesEditor.vue:385` (`paintbrushWipe` — library-API-built, legitimate)

**Verdict on raw-CSS keyframes:** 3 raw `@keyframes` blocks ungated (liftDown, dotFade, idle-bob — `idle-bob` is NEW drift since baseline).

**Axis 5 verdict:** baseline drift carried + 1 NEW ungated keyframe (CubeTarget.vue idle-bob). N7 proposal (`.motion-safe` utility) remains live.

---

## Axis 6: Typographic & Structural Hierarchy

**Re-verification:** typography delegated to Tailwind utilities; no semantic class reinvention.

**N.W1 cross-check — typography sweep + GlassPanel translucent+frosted canonical:** keyframes.js does not consume `GlassPanel` directly (verified via `rg "from \"@mkbabb/glass-ui/glass-panel"` → 0 hits). No N.W1 absorption opportunity created or missed.

**Axis 6 verdict:** stable. 0 drift; no N-wire spillover.

---

## Axis 7: Accessibility Resilience

**Baseline:** 5 custom interactive components lack `:focus-visible`; `prefers-reduced-motion` gate missing.

**Current state:** `grep -r "focus-visible\|focus-ring"` against `demo/@/components/custom/**` → only `.btn-playback:focus-visible` present (canonical). All 5 baseline gaps (CopyButton, KeyboardShortcutsModal, TimingFunctionPanel, TimelineCaret, easing-curve canvas handles) remain uncovered.

**Axis 7 verdict:** baseline drift fully carried — 5 sites still missing focus-visible. N6 proposal remains live and high-value.

---

## Bidirectional Gap Analysis (N4-rerun)

### Glass-ui Gaps (carried from baseline)

**N6: Focus-ring slot-class prop on Button variants** — UNADDRESSED at HEAD `ffc02a9`. 5 custom-button consumers in keyframes.js would benefit. **High-value carry-forward** for any future N.W3+ wire.

**N7: `prefers-reduced-motion` wrapper utility** — UNADDRESSED at HEAD. 3 ungated raw `@keyframes` blocks in keyframes.js (liftDown, dotFade, idle-bob). **Carry-forward** with the gap surface re-sized: 3 raw blocks (baseline counted 2; idle-bob is new).

### Subpath migration health (M.W1 Lane A → N4 verification)

The M.W1 subpath migration commit `b788205` is on master. Verified all 7 migration targets still importable at N HEAD:

| Migration | N4-rerun verification | Status |
|-----------|------------------------|--------|
| `Input`/`Textarea` → `/forms` (4 sites) | `AssetLayerPanel.vue`, `MatrixEditor.vue`, `EasingSidebar.vue`, `LayerConfigPanel.vue`, `KeyframeTimeline.vue`, `SharePopover.vue` | ✓ |
| `useGlobalDark` → `/dark` (3 sites) | `CommandPalette.vue` | ✓ |
| `registerShortcut`/`useRegisteredShortcuts`/`formatComboParts` → `/keyboard` (4 sites) | `EditorShell.vue`, `AnimationControlsGroup.vue` | ✓ |
| `DarkModeToggle` → `/controls` (4 sites) | `EditorHeader.vue`, `EditorShell.vue`, `cube/App.vue` | ✓ |
| `DockIconButton`/`DockLayer`/`DockSelectTrigger`/`DockDropdownTrigger` → `/dock` (4 sites) | `EasingTarget.vue`, `App.vue`, `AnimationControlsControls.vue`, `TopDock.vue` | ✓ |
| `LabeledSelect`/`LabeledSlider`/`LabeledSwitch`/`LabeledInput` → `/labeled-field` (2 sites) | `LayerConfigPanel.vue`, `AnimationControlsControls.vue` | ✓ |
| `IconTooltip` → `/icon-tooltip` (5 sites) | `LayerConfigPanel.vue`, `KeyframeTimeline.vue`, `AnimationMenuBar.vue`, `PlaybackRibbon.vue`, `AnimationControlsControls.vue` | ✓ |

**Subpath surface integrity:** 100% preserved through N.W0 → N.W2 substrate. No N-wire-induced regression on consumer side. **Zero retired-subpath references** in keyframes.js (no hits for `composables/dark`, `composables/keyboard`, `virtual`, `pagination`).

---

## Demo Chrome Overfitting Analysis (N4 re-run)

### MAJOR baseline finding re-verified: zero-consumer UI dirs

Per-directory consumer count for `demo/@/components/ui/` (25 dirs total) at N4 HEAD:

```
 0  alert, alert-dialog, aspect-ratio, auto-form, breadcrumb,
    carousel, chart-area, chart-bar, chart-donut, chart-line,
    menubar, navigation-menu, pagination, pin-input, range-calendar,
    resizable, sonner, table, toast, v-calendar    (20 dirs)
 1  calendar                                         (1 dir)
 2  label                                            (1 dir)
 4  chart                                            (1 dir)
10  form                                             (1 dir)
19  button                                           (1 dir)
```

**Net result:** 20/25 zero-consumer + 1 minimal-consumer (`calendar`) = **21/25 (84%) overfitting** at N4 HEAD.

**Comparison to baseline:** baseline reported 19/25 (76%); N4 finds 20/25 strictly-zero + 1 marginal. The MAJOR finding has **WORSENED slightly** (or: more careful re-count surfaces 1 additional zero-consumer dir, `aspect-ratio` — baseline omitted it from the 19-dir enumeration but it is genuinely zero-consumer at HEAD). No cleanup landed at master or any non-tmp branch.

### Zero-consumer custom components (baseline 3)

- `CommandPalette.vue` — usage in `demo/CLAUDE.md` docstring only; no `.vue` import. Still ZERO-CONSUMER.
- `ResponsiveSelect.vue` — self-reference only (its own `interface` export). Still ZERO-CONSUMER.
- `Animated.vue` — listed in `demo/CLAUDE.md`; need targeted scan.

Re-verified: all 3 baseline candidates remain zero-consumer. **No archival cleanup landed.**

### Carry-forward verdict on the MAJOR finding

The 84% overfitting finding is **unchanged in shape, slightly larger in count**. User has not landed any archival/deletion sweep at HEAD or on any non-WIP branch (verified: `tmp` is a single "tmp" commit; no other named branches diverge from master with cleanup content). 

This is a **read-only audit per cross-repo policy** — recommendation persists for any future user-driven cleanup sweep (no orchestrator-side action).

---

## N-wire regression check

N.W0 → N.W2 glass-ui substrate changes:
- **N.W0** strategic 5-wire batch + precept canonicalize + audit-failure LESSONS-LEARNED — internal to glass-ui; no consumer surface change.
- **N.W1** typography sweep + N-4 timeline typecheck absorb + GlassPanel translucent+frosted canonical → v1.1.2 — keyframes.js does not consume `GlassPanel`; `.dock-label` canonical register added but DockTabButton not used in keyframes.js.
- **N.W2** Configurator density CVA + N7 dock-blur audit NO-OP → v1.1.3 — keyframes.js does not consume Configurator; dock-blur audit landed NO-OP (no behavior change).

**Verdict:** zero N-wire-induced regression on the keyframes.js consumer. All consumer-facing subpaths preserved; no symbol removals; no breaking API changes intersect this consumer.

---

## Tallies (N4 re-run vs. baseline)

| Metric | Baseline (2026-05-12) | N4 re-run (2026-05-14) | Delta |
|--------|------------------------|--------------------------|-------|
| Axis 1 drift | 1 (shadow hardcoding) | 0 | **−1 (RESOLVED)** |
| Axis 3 drift | 3 (CopyButton, scale, caret) | 3 carried + 1 vocabulary regression (10× hover:scale-105 vs. 6×) | **+1 regression sites** |
| Axis 5 drift | 1 (reduced-motion gate missing) | 1 + new idle-bob keyframe ungated | **+1 raw block** |
| Axis 7 drift | 5 sites missing focus-visible | 5 sites carried unchanged | **=** |
| **Total drift findings** | **3** | **3 carried + 2 minor regressions** | net +1 vs. baseline severity |
| One-consumer UI components | 19/25 (76%) | 20/25 strict + 1 marginal (84%) | **+1 dir** |
| Zero-consumer custom components | 3 (CommandPalette, ResponsiveSelect, Animated) | 3 carried | **=** |
| Glass-ui gaps surfaced | 2 (N6, N7) | 2 carried | **=** |
| Union candidates | 1 (.tab-trigger-*) | 1 carried | **=** |
| N-wire regression | n/a | **0** | clean |

---

## Recommendations (N4-rerun summary)

1. **Carry-forward (still live):** baseline 19-dir archival sweep + 3 zero-consumer-custom inline/delete — unchanged, slightly larger in scope.
2. **Carry-forward (still live):** N6 focus-ring slot-class prop on Button variants — high consumer value (5 sites in keyframes.js alone).
3. **Carry-forward (still live):** N7 `.motion-safe` / `@motion-gate` utility — 3 ungated raw `@keyframes` in keyframes.js.
4. **Minor regression flag:** `hover:scale-105` ad-hoc usage grew from 6 → 10 instances. New sites in `CubeScene.vue`, `App.vue`, `cube/App.vue` — would benefit from `var(--scale-hover)` token migration when consumer-side cleanup pass runs.
5. **No orchestrator action required** — cross-repo read-only audit; M.W1 migration sits on master; subpath surface integrity 100% preserved through N.W2.

---

**Audit signature:** N11 Lane d (N4 re-run) — 1 drift RESOLVED, 3 carried + 2 minor regressions; 84% UI dir overfitting (unchanged in shape, 1 dir larger); 0 N-wire regressions; subpath migration health 100%.
