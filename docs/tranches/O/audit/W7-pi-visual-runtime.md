# O.W7 π—visual-runtime audit

**Wave**: O.W7 (close ceremony—7-lane strengthened audit)
**Lane**: π visual-runtime (per `docs/tranches/O/waves/W7.md` line 34)
**Date**: 2026-05-14
**Read-only**: hardened agent git clause honored—no staging, no commits, no source edits. Only this proof doc authored.

## § Disposition—TOOLING-DEFERRED

**MCP Chrome browser extension is NOT connected.** Lane folds to P-tranche per W7.md §"π visual-runtime: Playwright + Chrome MCP probe IF tooling reconnects" (conditional clause—acceptable fold when tooling unavailable).

### Tooling discovery trace

| Probe | Result |
|---|---|
| `ToolSearch select:mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__tabs_context_mcp` | **3/3 schemas loaded**—tools surface-available |
| `mcp__claude-in-chrome__tabs_context_mcp` (no args; default `createIfEmpty=false`) | **FAIL**—`Browser extension is not connected. Please ensure the Claude browser extension is installed and running (https://claude.ai/chrome), and that you are logged into claude.ai with the same account as Claude Code.` |

Schemas are loadable; the runtime bridge to a live Chrome session is not. No `tabId` can be acquired, so navigate/read_page/get_page_text/javascript_tool are all unreachable. The Playwright alternative was not in scope per dispatch (W7.md names "Playwright + Chrome MCP" inclusively but the canonical π recipe at N.W4 used Chrome MCP; no Playwright runner is wired in `package.json`).

Same disposition as N.W4 π (`docs/tranches/N/audit/N-audit-pi-visual-runtime.md` was authored with a STATIC-ANALYSIS-ONLY fallback because the runtime tooling was likewise deferred). O ships the same fallback shape **plus an explicit named carry-forward** to P so the runtime probe lands once the bridge is reconnected.

---

## § Coverage that WOULD be probed (substrate inventory)

The π lane would exercise both the **W6 4-lane substrate promotions** + the **W2 dock-DI refactor cross-substrate proof story**. Per-substrate static-analysis grounding follows (read from HEAD source); the runtime portion (≥ 3 viewports + animation timing + contrast measurement + per-story consumption sweep) is the deferred work.

### 1. `dock-with-slider.vue` proof story—W2 dock-DI cross-substrate contract

**Location**: `demo/stories/compositions/dock-with-slider.vue` (124 LOC).
**Substrate touched**: `<GlassDock>` + `<DockIconButton>` + `<Slider>` + `useDockState` (W2 Lane A typed-context) + slider migration to typed context (W2 Lane B).

**What runtime probe would verify** (per the story's own `<script setup>` header comment block, lines 6–25—the contract is self-documenting):

| Behaviour | Static-analysis verdict | Runtime would measure |
|---|---|---|
| (1) Slider thumb-halo intensifies on drag (denser surface-tint rung) | Scoped CSS present—`.glass-slider[data-held] .slider-thumb` + `[data-variant="glass-pill"][data-held]` halo recipes intact at `src/components/ui/slider/Slider.vue:281–291` (verified at N.W4 π §1.1, unchanged at O HEAD per `git log --oneline src/components/ui/slider/Slider.vue`) | Pixel-level halo intensity delta on pointer-down/up; animation duration sample against `--motion-ease-standard` |
| (2) Dock substrate tier-shades up while any descendant holds `dockKeepOpen` | `.glass-dock[data-held]` rule lives in `src/styles/dock.css`; the `data-held` attribute is wired through W2 Lane A typed-context (`useDockState.dockHeld` computed) | Computed background-color sample on held vs. idle; tier-shade RGB delta |
| (3) Pointer-up at window scope restores both states (slider's `onPointerDown` attaches a window-scope `pointerup`/`pointercancel` listener) | Listener attach logic verified by reading `Slider.vue`; lift-off-dock-edge scenario must be runtime-confirmed | Drag-then-release-outside-dock recovery; idle-collapse re-acquisition window |
| (4) `prefers-reduced-motion` honoured (transitions cap at token duration) | Token-level governance—no story-side `<style scoped>` overrides; honoured upstream | Reduced-motion media-query assertion; computed `transition-duration` check |
| (5) Multi-slider ref-counted `keepOpenCount` (two sliders share one dock; either drag holds dock open) | `useDockState.keepOpenCount` ref-count implementation exists; story-section 3 exercises it (lines 92–122) | Two-finger / sequential-pointer behavior; ref-count edge case (rapid acquire+release) |
| (6) Collapsible dock + `template #collapsed` (story §3) | Slot composition verified; visual hover-to-expand transition | FLIP transition timing sample; `axis="horizontal"` dim resolution |

**Recommended viewports for runtime sweep**: 375×667 (iPhone SE—touch target validation under W6 Lane D `@media (pointer: coarse)` lift), 1280×800 (laptop default), 1440×900 (desktop reference). The 375 sweep is doubly load-bearing because **W6 Lane D shipped `--dock-touch-target: 2.75rem` under `@media (pointer: coarse)`** (`src/styles/dock.css` end-of-file block); the dock-icon-button + slider hit-area inflation at coarse pointer is a runtime-only assertion.

### 2. W6 Lane A—`useClipboard` promotion

**Substrate**: `src/composables/dom/useClipboard.ts` (NEW per W6 Lane A; canonical merged shape: async clipboard + execCommand fallback + reactive `copied: Ref<boolean>` with auto-reset).
**Demo-side wiring**: **NONE at HEAD** (grep `useClipboard` against `demo/stories/` returns 0 hits; `demo/@/composables/` is consumer-side, not glass-ui demo). The composable is **published on the public surface but lacks a demo story**—this is itself a finding the runtime probe would surface.

**π runtime would measure** (once a demo lands):

- Per-call copy-success rate across the two async paths (modern navigator.clipboard vs. execCommand fallback—runtime-switchable via permissions API mock).
- Reactive `copied` flag flip + auto-reset timing (default 1500ms per Lane A proof doc)—wall-clock measurement against `resetMs` knob.
- `onScopeDispose` cleanup verification (no pending-timer leak after component unmount).
- SSR-guard verification (`navigator`/`document` undefined → `false` return).

**Carry-forward**: a `use-clipboard.vue` story under `demo/stories/composables/` should land in P; π runtime probe re-runs against it.

### 3. W6 Lane A—`HeaderRibbon` promotion

**Substrate**: `src/components/custom/header-ribbon/` (NEW package per W6 Lane A; flat subpath `@mkbabb/glass-ui/header-ribbon`; canonical lift of the keyframes.js shape—`isMouseOver` hover-tracking guard + `--header-max-width: 500px` CSS var).
**Demo-side wiring**: **NONE at HEAD** (grep `HeaderRibbon` against `demo/` returns 0 hits).

**π runtime would measure**:

- Hover-tracking guard timing (`isMouseOver` open-delay vs. close-delay)
- Side-specific transition triples (top/bottom/left/right entry-exit choreography from value.js side-overrides)
- `--header-max-width` consumer override path (consumer-tunable knob behavior)
- Stacking-context—`z-[var(--z-dock)]` interplay with dock + tooltip layers
- Reduced-motion ramp behavior

**Carry-forward**: `header-ribbon.vue` story under `demo/stories/containers/` (or `navigation/`) lands in P; π re-runs.

### 4. W6 Lane B—`.dock-icon-button` active-state token ladder

**Substrate**: 5 new tokens at `src/styles/tokens.css` (§10 dock-geometry block):

```
--dock-active-bg: var(--muted);
--dock-active-color: var(--foreground);
--dock-active-scale: 1;
--dock-active-border: none;
--dock-active-shadow: none;
```

The pre-W6 recipe painted only `background` + `color`; the ladder restates that recipe verbatim (visual no-op for default consumers) plus three additional knobs (`scale` / `border` / `shadow`) that previously had no canonical handle.

**Demo-side wiring**: existing dock stories (`demo/stories/navigation/`) exercise the *default* token values—the ladder is BACKWARD-COMPATIBLE so default render is unchanged. The new knobs (`--dock-active-scale` / `-border` / `-shadow`) are **demo-unwired** at HEAD.

**π runtime would measure**:

- Default-state visual no-op verification (pre-W6 vs. post-W6 pixel-identity on existing dock stories).
- Token-override probe—runtime `style="--dock-active-scale: 1.05; --dock-active-border: 2px solid var(--primary); --dock-active-shadow: 0 0 0 3px var(--ring)"` injection on a `.dock-icon-button[aria-pressed="true"]` and verify the visual response.
- Selector cascade—`:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])`—assert all 4 active-state triggers paint identically.
- Contrast measurement on active state (WCAG 1.4.11 non-text contrast—`--dock-active-bg` vs. surrounding `.glass-dock` background; both light + dark themes).

**Carry-forward**: add a "dock token ladder demo" story to `demo/stories/navigation/` exercising all 5 knobs with live `<ConfiguratorRow>` controls; π runtime re-runs.

### 5. W6 Lane C—`@utility scale-on-hover` cross-consumer

**Substrate**: 17 LOC in `src/styles/utilities.css` (between `@layer components` close and `@utility sheet-animate`). Shape:

```css
@utility scale-on-hover {
    @apply transition-transform duration-fast ease-standard;
    &:hover { transform: scale(var(--scale-hover)); }
}
```

Single-token disposition (no `xs/sm/md/lg` ladder) per Lane C proof—`--scale-hover: 1.08` already canonical at `tokens.css:673`; 5 internal call sites bind through it.

**Demo-side wiring at HEAD**:
- `demo/stories/navigation/carousel.vue`—references `--scale-hover` in copy (descriptive only, not utility-applied).
- `demo/configurator/PresetEditor.vue`—`hover:scale-[var(--scale-hover)] active:scale-[var(--scale-press-btn)]`—applies the token via arbitrary-value class, not the new utility.

**No demo currently uses `class="scale-on-hover"` directly**—the utility is published but unapplied internally. This is intentional per Lane C (cross-consumer promotion targets keyframes.js + words/frontend; consumer-side adoption sweep deferred to user-authorized cross-repo wave). The internal call sites that already bind `--scale-hover` are recipe-level, not utility-level, and Lane C did NOT mandate internal migration (token already canonical).

**π runtime would measure**:

- Computed transform sample on hover (target: `scale(1.08)`)
- Transition timing (target: `--transition-duration-fast` * `--motion-ease-standard`)
- GPU-acceleration trace (no layout reflow—transform-only)
- Reduced-motion behavior (transition still fires per current CSS—token-level cap would be needed for full reduced-motion respect; flag for P review)

**Carry-forward**: a 3-card demo under `demo/stories/foundations/` (e.g., `utility-scale-on-hover.vue`) demonstrating the utility against `card` + `pill` + `btn-glass-wash` surfaces; π runtime re-runs.

### 6. W6 Lane D—AC.W6 cohort (6 deliverables)

Per W6 Lane D proof doc:

| # | Deliverable | π runtime would verify |
|---|---|---|
| 1 | Fira Code self-host (`src/fonts/` + `package.json#files`) | Font-face load success once binaries land; ligature rendering (`fi` / `==` / `=>` etc.); fallback-stack behavior pre-load |
| 2 | `@utility text-hero` (`src/styles/typography.css`) | Computed font-size / line-height / letter-spacing against `--type-display-audacious` cap; consumer-knob overrides (`--text-hero-size` / `-leading` / `-tracking`) honored |
| 3 | WCAG `--chart-{ping,download,upload,jitter}-label` companion tokens | Contrast ratio measurement light L≈0.40 vs. dark L≈0.85; verify WCAG 1.4.3 AA (≥4.5:1 small text, ≥3:1 large) against typical chart background |
| 4 | Dark-mode `--meter-track-stroke` fix (now `var(--foreground)` in `.dark`) | Visibility regression—pre-W6 was bg-on-bg invisible in dark; post-W6 should paint at foreground contrast |
| 5 | IconTooltip 44×44 hit-area enforcement (`<span class="icon-tooltip-trigger">` + `min-width/height: var(--icon-tooltip-hit-area, 44px)`) | Computed bounding-box ≥ 44×44 on every IconTooltip site; touch-target overlap audit (no inadvertent hit-area overlap between siblings) |
| 6 | Dock touch-target `@media (pointer: coarse)` | At 375×667 simulated touch viewport, `.glass-dock` `--dock-control-size` + `--size-icon-btn` lift to `var(--dock-touch-target, 2.75rem)`; non-coarse viewports unchanged |

**Demo-side wiring**: deliverables 2 (text-hero), 5 (IconTooltip), 6 (dock touch-target) are visible at existing demo sites under typography/icon-tooltip/dock story trees respectively. Deliverables 1 (Fira binary), 3 (WCAG companions), 4 (meter-track-stroke fix) are speedtest-consumer-facing and not yet demo'd inside glass-ui—runtime probe of these lives at the speedtest end.

---

## § Static-analysis sweep—unchanged-from-N.W4 substrate

The N.W4 π lane verified (static-only) these substrate areas under N close:

- Slider `useTouchGate` wire—`data-touch-active` + `data-held` (J.W5.C contract).
- `demo/stories/compositions/hero.vue`—metaballs + typewriter wire.
- `ui/section/Section.vue`—`backdrop="paper"`.
- ProgressiveSidebar slot-tier composition.
- Aurora story chrome (post-V.W3 sidebar adoption).
- Reduced-motion honour across all V.W3 motion primitives.

O did NOT touch any of these (per `docs/tranches/O/PROGRESS.md` per-wave landings; O scope was W1 fail-explicit migrations + W2 dock-DI typed-context + W3 god-module splits + W4 /api + W5 pipeline + W6 promotions). N.W4 π verdicts of "NONE" defect class carry forward—re-verifying static is not in scope for O.W7 π.

The W2 dock typed-context refactor (the only O lane touching live runtime substrate adjacent to N.W4 π coverage) ships with `dock-with-slider.vue` as the cross-substrate proof story (existence + structure verified above); runtime regression on that story is the singular new π workload for O and is precisely what's tooling-deferred.

---

## § Carry-forward to P (named-destination per item)

| Source item | Destination | Form |
|---|---|---|
| `dock-with-slider.vue` runtime regression sweep | P.π lane | 3-viewport + animation timing + cross-substrate `data-held` propagation |
| `useClipboard` demo story (under `demo/stories/composables/use-clipboard.vue`)—currently absent | P implementation wave (Lane A or equivalent) | New story; π then probes |
| `HeaderRibbon` demo story (under `demo/stories/containers/` or `/navigation/`)—currently absent | P implementation wave | New story; π then probes |
| `.dock-icon-button` token-ladder demo story (5 new knobs unwired at HEAD) | P implementation wave | New story under `demo/stories/navigation/`; π probes contrast + selector cascade |
| `@utility scale-on-hover` demo story | P implementation wave | New story under `demo/stories/foundations/`; π probes transform timing + reduced-motion |
| Fira Code woff2 binary integration (W6 Lane D flagged for orchestrator-fetch) | Orchestrator integration step + P π | Once binaries land, runtime font-load + ligature trace |
| WCAG `--chart-{phase}-label` contrast measurement under live charts | P π OR speedtest-side AC.W6 audit (cross-repo) | WCAG 1.4.3 AA ratio sample |
| 375×667 touch-viewport sweep (dock + IconTooltip 44px floor) | P π | `@media (pointer: coarse)` runtime assertion |
| Playwright runner addition (currently no `playwright` in `package.json`) | P infrastructure (separate decision) | If chosen as alternative to Chrome MCP, package.json + CI wire |

---

## § Verdict

**TOOLING-DEFERRED.** Per W7.md §"π visual-runtime: Playwright + Chrome MCP probe IF tooling reconnects"—the runtime bridge is unavailable; the static-analysis grounding is complete and the carry-forward to P is fully enumerated. Acceptable to fold under the W7.md conditional clause without blocking close.

Recurrence: N.W4 π was the prior deferral; O.W7 π is the **second** consecutive deferral. If P opens without the Chrome MCP bridge or a Playwright wire, P.π lane should escalate—runtime regression on `dock-with-slider.vue` + the 4 W6 substrate promotions has now been deferred for two close ceremonies and is the longest-lived ι-adjacent gap in the close-honesty checklist.

## § Read-only discipline

This lane authored exactly one file (`docs/tranches/O/audit/W7-pi-visual-runtime.md`). Zero git mutations performed. Zero source files modified. Hardened agent git clause (K W0 precept) honored.
