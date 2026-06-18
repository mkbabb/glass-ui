# BC.W-DOCK-VERTICAL-FIX — the vertical dock works + is CLICKABLE

- **Band:** 2 · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** after `BC.W-DOCK-ENGINE` (the rebuilt morph engine + the scale floor land first; this wave fixes the interactivity gating on top of the rebuilt engine) and after `BC.W-BLACK-BAR` (the rim source the vertical plate reads). Before `BC.W-DOCK-COLLAPSED-BOTH` (which needs a clickable vertical dock to demonstrate the collapsed state) and `BC.W-DOCK-STACK-RAIL` (the rail hangs off a working vertical dock).
- **Owns / closes:**
  - USER-DEFECTS §A "The ENTIRE vertical dock is broken + **NOT CLICKABLE**."
  - DEFECT-LEDGER (the vertical click-deadness root, glass-dock-codebase.md §2.3).
  - ORCHESTRATION §1 Band 2 box: `BC.W-DOCK-VERTICAL-FIX — the vertical dock works + is CLICKABLE`.
  - research/deferral/ay.md `dock-f2-first-mount-flip` (the degenerate first-mount expanded+collapsed-width state on a `#persistent`-slot vertical dock — the measurement seat that strands a vertical dock).

## Goal (the gestalt)
Open `/dock/layers` (or the demo SidebarDock) and the vertical dock is a live, responsive control column — every icon button, tab, and trigger inside it takes a click the instant you tap it, on desktop AND on a coarse-pointer phone. A collapsed vertical dock taps open and its freshly-revealed controls are immediately clickable (no dead first-tap, no must-wait-for-the-morph). Nothing inside the column is a painted-but-inert ghost. The vertical dock feels exactly as alive as the horizontal one — because it runs the same interactivity gating, not a forgotten branch.

## Starting state (measured, file:line)
The vertical dock paints fine but is interactivity-dead on the common collapsible config. The root is a single mis-gated attribute (glass-dock-codebase.md §2.3):

- `src/components/custom/dock/GlassDock.vue:434-436` — the full pane's visibility reads `visualExpanded` but its `inert` reads the RAW `expanded` ref:
  ```vue
  <div :class="['dock-layer dock-layer--full', { 'is-active': visualExpanded }]"
       :inert="!expanded || undefined">   <!-- line 436 -->
  ```
  `visualExpanded = alwaysExpanded.value || expanded.value` (`GlassDock.vue:123`). So for any state where `expanded` is `false` but `visualExpanded` is `true` — the full pane is **`is-active` (visible + painted) yet `inert` (every control non-interactive)** = the whole vertical dock reads as a dead painted column. The `--summary` pane carries the inverse `:inert="expanded || undefined"` (`GlassDock.vue:442`).
- The deadness is STATE-DEPENDENT, not universal: the live SidebarDock at `/dock/layers` measured `expanded` AND `alwaysExpanded` both present (59×631, visible, clickable) — so on the always-expanded config `expanded` happens to be true and it works. The dead path is (a) a collapsible vertical dock mid-flip (where `expanded` lags `visualExpanded` during the morph window), and (b) the `dock-f2-first-mount-flip` chronic — a `#persistent`-slot collapsible vertical first-mounts in a degenerate state where the morph hasn't yet flipped `expanded` true while the pane already paints active.
- Two secondary contributing roots (glass-dock-codebase.md §2.3):
  - `src/styles/dock/layers.css:170-175` — an inactive layer (`:not(.is-active):not(.is-leaving)`) gets `pointer-events: none` + `visibility: hidden`; if `visualExpanded` computes wrong the pane is pointer-dead from CSS too.
  - `src/styles/dock/layers.css:86-92` — the vertical morph does `scaleY(var(--dock-morph-scale))` with `transform-origin: center top`; a `scaleY(near-0)` (the morph-WHITE root, glass-dock-codebase.md §2.2 — fixed by `BC.W-DOCK-ENGINE`'s scale floor) collapses the clickable area to a sliver mid-morph, so even a correctly-gated pane has a near-zero hit area during a degenerate morph.
- The collapsed→tap→click path runs `useDockClickIntegrity` + `useTouchGate` (`GlassDock.vue:299-324`, the R5-TAP guard, `MORPH_SETTLE_MS = 320`, `constants.ts:106`) — correct in principle, but a click that lands during the morph-settle window on a DIFFERENT element than the pointerdown target is SWALLOWED (the post-swap-coordinate guard). On a vertical dock whose morph axis is `scaleY`, the coordinate shift during the settle is large, so legitimate first-clicks can fall into the swallow window if the morph is janky.

## Target spec (grounded)
The fix is the one-line gating correction at the root + two structural guarantees that a vertical dock's active layer can never be a painted-but-dead or near-zero-hit-area column. Token-first / component-over-class throughout.

1. **Gate `inert` on `visualExpanded`, not the raw `expanded`** (the one-line root, glass-dock-codebase.md §2.3 fix 1):
   - `GlassDock.vue:436` → `:inert="!visualExpanded || undefined"`. An always-expanded vertical dock (`alwaysExpanded` true, `expanded` false) is now interactive (the pane is visible AND live). A mid-flip collapsible dock follows `visualExpanded`, which is the SAME signal the `is-active` class reads — so visibility and interactivity can NEVER disagree (the class and the attribute read ONE source).
   - The `--summary` pane's inverse gate re-points to `:inert="visualExpanded || undefined"` (`GlassDock.vue:442`) — the SAME single-source symmetry (summary is inert exactly when the full pane is active).

2. **The CSS pointer/visibility gate reads the SAME signal.** `layers.css:170-175` gates `pointer-events`/`visibility` on `.is-active`, which already reads `visualExpanded` (the class binding). VERIFY this stays the sole CSS interactivity gate (no second `pointer-events: none` rule on a vertical-dock selector that reads a different state). The CSS gate and the `inert` attribute now both key off `visualExpanded` — one signal, two enforcement layers, never disagreeing.

3. **The active layer is never a near-zero hit area.** This is `BC.W-DOCK-ENGINE`'s scale floor (`max(var(--dock-morph-scale), 0.05)`, glass-dock-codebase.md §2.2) — this wave DEPENDS on it: an active vertical pane at `scaleY(0)` would be visible-but-unclickable (zero hit area). The floor guarantees a minimum hit area through the whole morph. This wave does NOT re-author the floor (that is W-DOCK-ENGINE's bound); it asserts the dependency in the gate (a vertical dock's active pane resolves a `scaleY` ≥ the floor at every morph frame).

4. **The collapsed→tap→click first-click reaches its target on the vertical axis.** The `useDockClickIntegrity` swallow window (`MORPH_SETTLE_MS = 320`) is correct, but it must not swallow the user's first real click on the freshly-expanded controls. VERIFY on the vertical-dock path: a tap that EXPANDS the dock, followed by a click on a now-visible control, reaches the control (the iOS one-tap contract). The mechanism is already in source (`GlassDock.vue:299-324`); this wave's job is to LIVE-VERIFY it on the vertical axis (the prior R5-TAP work verified the horizontal/iOS-tap path; the vertical axis morphs `scaleY` so its coordinate shift differs).

This is a gating correction (one source for visibility + interactivity), not a re-architecture — the engine is W-DOCK-ENGINE's; this wave makes the rebuilt engine's vertical pane HONESTLY interactive.

## Mechanism / files
- **Edit `src/components/custom/dock/GlassDock.vue:436`** — `:inert="!visualExpanded || undefined"` (was `!expanded`).
- **Edit `src/components/custom/dock/GlassDock.vue:442`** — the summary pane inverse `:inert="visualExpanded || undefined"` (was `expanded`).
- **No CSS edit** if `layers.css:170-175` already gates on `.is-active` (the `visualExpanded`-bound class) — VERIFY, do not re-author.
- The seam: ONE signal (`visualExpanded`) drives BOTH the `is-active` class (paint) AND the `inert` attribute (interactivity) — the substitution-over-redeclaration discipline applied to interactivity gating. A control is interactive IFF its pane is painted active; the two can never drift.
- DEPENDS ON `BC.W-DOCK-ENGINE` for the scale floor (a vertical active pane never `scaleY(0)`); this wave asserts the dependency, does not own the floor.

## Acceptance (gestalt + measured + gate)
1. **CAPTURED-PAINT gestalt criterion (dev-tools MCP — Playwright + chrome-devtools):** a recorded interaction on `/dock/layers` (the vertical SidebarDock) AND a collapsible vertical fixture, BOTH modes, desktop + coarse-touch viewport. The capture shows: (a) every icon button in the vertical column responds to a click (a state change / navigation fires) at rest; (b) a collapsed vertical dock taps open and its revealed control takes the very next click. The capture + the click-event log land at `docs/tranches/BC/audit/visual/W-DOCK-VERTICAL-FIX-DELTA.md` (Live-verify = captured delta, never a commit claim).
2. **Machine gate `proof:dock-vertical-clickable`** (born-RED on HEAD's `:inert="!expanded"` → GREEN at the fix; device-free SOURCE arm `["local","ci","release"]`):
   - **V1 — inert reads visualExpanded.** `GlassDock.vue`'s full-pane `inert` binding references `visualExpanded` (NOT the raw `expanded`); the summary-pane inverse references `visualExpanded` too. Born-RED: HEAD reads `expanded`/`expanded`. Self-test bite: a planted `:inert="!expanded"` reds.
   - **V2 — one signal drives paint + interactivity.** The full pane's `is-active` class AND its `inert` attribute reference the SAME computed (`visualExpanded`) — the gate asserts they read the identical identifier (the class and attr cannot drift). Self-test bite: a planted `is-active` on `visualExpanded` + `inert` on `expanded` reds (the drift the bug WAS).
   - **V3 — no second CSS interactivity gate disagrees.** No `layers.css` (or vertical-dock selector) rule sets `pointer-events: none` keyed off a state OTHER than `.is-active`/`.is-leaving` (the sanctioned set). Self-test bite: a planted `pointer-events: none` on a `.glass-dock.vertical .dock-layer--full` rule reds.
   - **V4 — the scale-floor dependency is declared.** The gate asserts `BC.W-DOCK-ENGINE`'s `--dock-morph-scale` floor (`max(..., 0.05)`) is present in `layers.css` (so a vertical active pane is never zero-hit-area) — a cross-gate no-regression check, NOT a re-author. Self-test bite: a removed floor reds.
   - **+ a self-test bite per clause** (each planted regression MUST flag).
3. **π readback `tests-visual/dock-vertical-clickable.spec.ts`** (both modes + WebKit, LOCAL real-render — rides `BC.W-PAINT-GATE` / the gestalt close):
   - On `/dock/layers`: query the vertical dock's full pane, assert `el.inert === false` AND a synthetic click on an inner `DockIconButton` fires its handler (a `@click` spy / a navigation assertion) — born-RED on HEAD where `el.inert === true` on the always-expanded-with-expanded-false config.
   - On a collapsible vertical fixture: tap the collapsed summary → assert the dock expands → click the now-visible control → assert the click reaches it (the one-tap contract on the vertical axis, the `useDockClickIntegrity` path).
   - A coarse-touch project run (the `useTouchGate` path): a touch-tap on the vertical dock's control fires (no swallowed touch).
   - Safari/WebKit: `inert` is Baseline (cite caniuse — `inert` shipped Safari 15.5+, fully Baseline); the WebKit run asserts the SAME `el.inert === false` + click-fires (no cross-engine interactivity gap).

## Fences / invariants (must NOT regress)
- **The morph engine is byte-untouched** — this wave edits ONLY the two `inert` bindings in `GlassDock.vue`. `dockMorphContext`/`dockMorphMeasure`/`DOCK_SPRING`/`useDockMorphOrchestrator` are `BC.W-DOCK-ENGINE`'s bound; this wave does not reach them.
- **The horizontal dock is unaffected** — `visualExpanded` collapses to `expanded` on a horizontal collapsible dock (no `alwaysExpanded`), so the horizontal interactivity gating is byte-identical to HEAD (the fix only changes behavior on the `alwaysExpanded`/mid-flip vertical path the bug lived on). The full dock fleet (7/7 dock tests, the AZ orchestrator-attrs-fix green) must stay green.
- **Clean break, no alias** (MEMORY: no backwards compat): the raw-`expanded` gating is DELETED, not aliased. No `inert-legacy` shim.
- **WCAG / a11y intact** — `inert` correctly removes a HIDDEN pane from the a11y tree; the fix makes the VISIBLE pane reachable (it does not expose a hidden pane). The `GlassDock` root stays presentational (no `aria-expanded` on the root — the AM gap-3 contract; that lives on the trigger).
- **The `useDockClickIntegrity` morph-settle guard is preserved** (R5-TAP) — this wave verifies it on the vertical axis, never weakens it (the iOS one-tap + the frozen-clock Vue-invoker trap stay documented in the test).
- **Presets-in-consumers:** the demo SidebarDock/BottomDock are the verification surfaces; no consumer-specific gating enters the library component.

## Folds (deferrals discharged)
- **`dock-f2-first-mount-flip`** (research/deferral/ay.md, §F2 — "a `#persistent`-slot collapsible dock first-mounts in a degenerate expanded+collapsed-width state (FLIP measures collapsed→collapsed)"). **DECIDED — BUILD/MEET:** the degenerate first-mount cannot strand a vertical dock once `inert` reads `visualExpanded` (the visible pane is interactive regardless of the morph's `expanded` lag), AND the rebuilt `BC.W-DOCK-ENGINE` engine seats `--dock-morph-from/to` before first paint so the first-mount FLIP is non-degenerate. The chronic first-mount class ends. The deferral marks it `BUILD — BC.W-DOCK-ENGINE` for the measurement seat; this wave discharges the INTERACTIVITY half (the seat fix alone would still leave a mid-flip-inert window without the `visualExpanded` gate).
- The `dock-feedback-2026-06-10-still-broken` item 1 (research/deferral/memory.md — "dock layers broken ... horizontal+vertical disambiguated + robust layering"): the vertical-clickable fix is the interactivity half of "robust layering"; the rail half is `BC.W-DOCK-STACK-RAIL`, the engine half is `BC.W-DOCK-ENGINE`. DECIDED — this wave owns the vertical interactivity.
