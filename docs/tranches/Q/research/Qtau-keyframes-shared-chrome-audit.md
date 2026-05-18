# Qτ — keyframes.js Shared-Chrome + Dropdown Deep Audit

Audit round: Q audit-augmentation round-4. Agent: Qτ (tau).
Scope: keyframes.js demo shared chrome — `demo/app/App.vue`, `demo/app/SceneNav.vue`, the TopDock, all dropdown/select surfaces, the `demo/@/components/{ui,custom}` shadow layer, demo global styles, the scene-router.
Sibling slices: Qρ (easing + playground), Qσ (animation scenes). Cross-ref: `Qeta-keyframes-cosmetic-regressions.md` (round-2).

Environment: keyframes.js dev server, `glass-ui` consumed via `node_modules/@mkbabb/glass-ui` symlink to the local checkout. Browser: Playwright Chromium at 1440x900, 768x1024, 375x812.

---

## Section 1 — Surface inventory

### 1.1 Shared-chrome surfaces

| Surface | File | Role | Status |
|---|---|---|---|
| App shell | `demo/app/App.vue` | Hosts TopDock + EditorShell, scene-router glue, playback-state save/restore | Mounted; functional |
| SceneNav | `demo/app/SceneNav.vue` | Standalone scene-pill nav | **ORPHANED** — imported by zero files; superseded by TopDock |
| TopDock | `demo/@/components/custom/dock/TopDock.vue` | Top glass dock — Controls-tab Select, Scene Select, `@mbabb` DropdownMenu | Mounted; functional with style losses |
| AnimationMenuBar | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue` | Bottom transport dock — **the "rotations dropdown"** ("Select animation"), reset / clear / play | Mounted; **headline defect here** |
| Scene router | `demo/app/router.ts`, `useSceneRouter.ts`, `useSceneUrl.ts`, `scenes.ts` | vue-router hash routing + `?anim=` query sync | Functional; one drift bug (see 2.x) |

### 1.2 Dropdown / select surfaces (grep of `demo/`)

| # | Surface | Component | Glass-ui primitive | Notes |
|---|---|---|---|---|
| D1 | **"Select animation" (rotations dropdown)** | `AnimationMenuBar.vue` | `Select` + `DockSelectTrigger` | **USER-NAMED P0.** Cube scene options: `Rotations`, `Matrix`, `Hover`. Each item carries a `.status-dot` "progress circle". |
| D2 | Controls-tab Select | `TopDock.vue` | `Select` + `DockSelectTrigger` | Options: Controls / Keyframes / Timeline. Each item has a `.status-dot`. |
| D3 | Scene Select | `TopDock.vue` | `Select` + `DockSelectTrigger` | Home + scene list. Each item has a `.status-dot`. |
| D4 | `@mbabb` DropdownMenu | `App.vue` (slotted into TopDock) | `DropdownMenu` family | Share / dark-mode / ppmycota / @mbabb rows. |
| D5 | View-mode Select | `EasingScene` chrome | `Select` | Qρ slice — listed for completeness only. |
| D6 | EasingSelect | `demo/@/components/custom/EasingSelect.vue` | `Select` + curve-preview SVG | Qρ slice. Uses undefined `gold-shimmer` class. |
| D7 | ResponsiveSelect | `demo/@/components/custom/ResponsiveSelect.vue` | `Select` desktop ↔ `Drawer` mobile | Generic wrapper; no chrome-specific defect. |

### 1.3 The `@/` shadow-copy layer mapping

`demo/@/components/ui/` contains **25 directories** of shadcn-vue base components:
`alert, alert-dialog, aspect-ratio, auto-form, breadcrumb, button, calendar, carousel, chart, chart-area, chart-bar, chart-donut, chart-line, form, label, menubar, navigation-menu, pagination, pin-input, range-calendar, resizable, sonner, table, toast, v-calendar`.

Key finding — **this is NOT a drift amplifier**. Cross-referencing the import graph:

- The demo's live UI primitives (`Button`, `Select`, `SelectContent`, `DropdownMenu`, `Dialog`, `Avatar`, `Drawer`, …) are imported **directly from `@mkbabb/glass-ui`** (28 import sites) or its subpaths (`/forms` 8, `/dock` 5, `/icon-tooltip` 5, `/controls` 3, `/dark` 3, `/keyboard` 3, `/labeled-field` 2, `/header-ribbon` 1). There is **no `ui/button/index.ts`, no `ui/select/`, no `ui/dropdown-menu/`** — those were deleted (commit `30efba3 "rewrite all UI/component imports to @mkbabb/glass-ui directly"`).
- The 25 remaining `ui/` dirs are **orphaned dead shadcn-vue components** — `auto-form`, `calendar`, `chart-*`, `pagination`, `pin-input`, `v-calendar`, etc. They only cross-reference each other inside `ui/`; no file outside `ui/` imports them. They are dead-code clutter, not a live shadow of glass-ui.

Conclusion: the demo correctly follows the CLAUDE.md "Consumer wiring" re-export/direct-import pattern for everything it actually uses. The shadow-copy layer is not the root cause. The root-cause amplifier is the **demo-global CSS** (`demo/@/styles/style.css` + `utils.css`) silently losing class definitions across "cleanup" refactors.

Recommendation: delete the 25 orphaned `ui/` dirs (overfitting-audit / substrate-without-consumer invariant — zero consumers).

### 1.4 Demo global styles

| File | Lines | Content |
|---|---|---|
| `demo/@/styles/style.css` | 89 | `@import "tailwindcss"` + `@import "@mkbabb/glass-ui/styles"`, `@theme` aliases, project tokens (`--color-progress`, `--axis-*`, layout vars), base layer |
| `demo/@/styles/utils.css` | 158 | `.tab-trigger-*`, `.btn-playback*`, `.instrument-serif`, `.demo-container`, `.ppmycota-*` |

---

## Section 2 — Functional defects

| # | Surface | Defect | Severity | Evidence |
|---|---|---|---|---|
| F1 | D1 rotations dropdown | Per-option progress dots render as **invisible** zero-color spans. `.status-dot--idle` (and `--active`/`--paused`) are referenced in markup but **undefined in any stylesheet** → `background-color: rgba(0,0,0,0)`, `background-image: none`. | **P0** | `browser_evaluate` on open dropdown: 3 options `Rotations/Matrix/Hover`, each `class="status-dot w-2.5 h-2.5 status-dot--idle"`, computed `backgroundColor: rgba(0,0,0,0)`. Screenshot `q-tau-05`. |
| F2 | D2, D3 (TopDock selects) | Same — Controls-tab + Scene select items use `status-dot--active` / `status-dot--idle`; both undefined → invisible state indicators. | **P0** | Probe: `.status-dot.status-dot--active` → `backgroundColor: rgba(0,0,0,0)`. |
| F3 | AnimationMenuBar play button | `dock-play-btn` class undefined → button loses its hover-scale/brightness/focus-ring affordance. `rainbow-pastel` / `rainbow-vivid` undefined → button falls back to `bg-primary` (solid near-black) instead of the rainbow gradient. | **P1** | Probe: `.rainbow-pastel` → `backgroundImage: none`; `.dock-play-btn` → `transitionProperty: all` (default). Screenshots `q-tau-02/06/08` show solid black play button. |
| F4 | Scene router | Clicking a select item / dropdown sometimes warps the scene to the last-restored scene (`/cube` → `/easing`) because `useSceneUrl` + the controls-store watcher restore stale `?anim=` state on a reactive flush. | P2 | Repeatedly observed in Playwright: click on `Select animation` navigated route to `/easing?anim=Easing+Preview`. Intermittent — race between the URL sync watcher and the click handler. |
| F5 | Scene transition | `TypeError: Cannot read properties of null (reading 'nextSibling' / 'subTree' / 'parentNode')` thrown from Vue's `getNextHostNode` during `<Transition name="scene">` leave on first home→scene switch. | P2 | Console errors on initial load. Likely the `KeepAlive`/`Transition` interaction in `App.vue` `#target` slot — overlaps Qσ scene slice; flagged for cross-check. |
| F6 | Font load | `403 Forbidden` on `glass-ui/src/fonts/fira-code/fira-code-latin.woff2` — Vite `fs.allow` does not whitelist the symlinked glass-ui `src/fonts` path, so Fira Code never loads; `font-mono` falls back to system mono. | P2 | Console: repeated 403 on the woff2. |

---

## Section 3 — Visual defects

| # | Surface | Defect | Severity | Screenshot |
|---|---|---|---|---|
| V1 | **D1 rotations dropdown (HEADLINE)** | Dropdown opens to **three bare text labels** — `Rotations`, `Matrix`, `Hover` — with **no progress circles, no status colors** at all. The leading `.status-dot` span exists in the DOM but paints nothing (transparent fill, no conic-gradient). The user's exact complaint: "the rotations dropdown not having proper progress circles/colors". | **P0** | `q-tau-04`, `q-tau-05` (close-up) |
| V2 | App background | The whole app renders over a **transparent checkerboard** — there is no opaque page/work-area background fill. Body `background-color` computes to `rgb(251,250,249)` but the rendered page shows the browser transparency checker, meaning the work-area panel paints no surface and the body fill is being clipped/overridden. Reads as "broken / unstyled". | **P1** | `q-tau-01`, `q-tau-02`, `q-tau-06`, `q-tau-08` |
| V3 | AnimationMenuBar play button | Solid near-black circle instead of the rainbow gradient (pastel when idle, vivid when playing). The single most recognizable brand element of the demo is gone. | **P1** | `q-tau-02`, `q-tau-06`, `q-tau-08` |
| V4 | TopDock + AnimationMenuBar glass pill | Dock backplates read as a faint, near-white wash with no perceptible glass depth over the checkerboard — the glass tier is barely distinguishable. (Partly downstream of V2: glass blur/opacity has nothing to refract.) | P2 | `q-tau-08` |
| V5 | Controls-pane tabs header | `glass-subtle` is consumed by `AnimationControls.vue` + `AnimationControlsGroup.vue` for the tabs-header chip; glass-ui **renamed `glass-subtle` → `glass-wash`** (documented breaking change, CHANGELOG line 3302). The old class is gone → the tabs header paints **no glass surface**. | P1 | Source-confirmed; pane partly off-screen in captures |
| V6 | `@mbabb` dropdown rows | App.vue uses `text-2xs` on the dropdown sub-labels — `2xs` is not a Tailwind default size nor a glass-ui token → undefined utility, sub-labels fall back to inherited (oversized) text. | P2 | Source-confirmed |
| V7 | EasingSelect | `gold-shimmer` class (detail-curve highlight) undefined → no shimmer treatment. (Qρ slice — noted for fold-in only.) | P3 | Source-confirmed |

---

## Section 4 — Feature inventory (last-known-good)

Git archaeology on `demo/@/styles/` traces every loss to two "cleanup" commits that removed demo-local CSS under the mistaken belief it duplicated glass-ui:

### 4.1 The status-dot color variants — removed in `17adae2`

Commit `70c9064 "add design tokens for durations, easing, status colors"` originally defined, in `demo/@/styles/utils.css`:

```css
.status-dot { /* shape only */ }
.status-dot--active { background: hsl(var(--color-status-active)); }
.status-dot--paused { background: hsl(var(--color-status-paused)); }
.status-dot--idle   { background: hsl(var(--color-status-idle)); }
```

Commit `17adae2 "clean up styles, remove glass-ui overlap from utils.css"` deleted the **entire `@layer components { .status-dot … }` block** plus the `--color-status-*` tokens. The reasoning was wrong: glass-ui ships only the **base `.status-dot`** utility (`src/styles/utilities.css` line 125 — shape, size, transition; **no background, no modifier classes**). The `--active/--paused/--idle` color variants were genuinely demo-local and should have survived. Their removal is the **direct root cause of the headline rotations-dropdown defect** (V1/F1) and the TopDock select defects (F2).

`17adae2` also removed `.dock-play-btn` and `.dock-label` (defect F3, partial).

### 4.2 The rainbow gradient suite — removed in `c7f7c96`

Commit `d94da32` defined `--rainbow-*` / `--rainbow-pastel-*` tokens and the `.rainbow-vivid`, `.rainbow-pastel`, `.rainbow-wrapper` classes plus `@keyframes rainbow`. Commit `c7f7c96 "modernize CSS tokens and remove redundant styles"` deleted all of it **and** removed an `@import "@mkbabb/glass-ui/presets/keyframes-js"` line.

That preset no longer exists in glass-ui (`glass-ui/presets/` now contains only `words.css`). glass-ui *does* ship `--rainbow-*` and `--rainbow-pastel-*` **tokens** (`tokens.css` lines 787–800+) but **no `.rainbow-vivid` / `.rainbow-pastel` utility classes**. So `c7f7c96` removed the demo-local classes assuming the preset would supply them — the preset was simultaneously retired upstream. Net result: defect F3/V3.

### 4.3 The glass-subtle rename — upstream breaking change

glass-ui renamed the `glass-subtle` tier to `glass-wash` (CHANGELOG line 3302: "Button `glass-subtle` variant renamed to `glass-wash`"; line 3265 maps `glass-subtle → glass-wash`). The keyframes demo never migrated — `AnimationControls.vue`, `AnimationControlsGroup.vue`, and the orphaned `SceneNav.vue` still reference `glass-subtle`, which no longer resolves (defect V5).

### 4.4 What the progress circles *were* — and the surviving half

The rotations-dropdown dot is a two-mode indicator:

1. **Idle / paused** — a flat colored dot via `.status-dot--idle` / `.status-dot--paused` (the deleted classes).
2. **Active (playing)** — a **conic-gradient progress ring** driven by a `--dot-p` (0–1) inline custom property set by `dotStyle(name)` in `AnimationMenuBar.vue`, consuming live per-animation progress from `useAnimationProgress` (rAF loop, `anim.t / duration`).

The active-mode CSS (`.status-dot[style*="--dot-p"]` — conic-gradient + glow, keyed off `--color-progress`) is **self-contained inside the `AnimationMenuBar.vue` `<style scoped>` block and SURVIVED**. `--color-progress` is still defined in `style.css`. So when an animation is *playing*, the progress arc still works. The loss is purely the **idle/paused flat-color states** — which is exactly what a user sees the moment they open the dropdown on a non-playing animation: bare text, no dots.

---

## Section 5 — Idiomatic glass-ui upgrade design

### 5.1 Restore the status-dot color variants — proper home

The demo should **not** reintroduce free-floating `.status-dot--*` classes. glass-ui already ships a **`StatusDot` component** (`@mkbabb/glass-ui/status-dot`) whose API is exactly this state machine:

```ts
// src/components/custom/status-dot/StatusDot.vue
variant?: "active" | "paused" | "idle" | "error" | "custom"
color?: string   // for variant="custom"
pulse?: boolean
size?: "xs" | "sm" | "md"
```

**Upgrade:** replace every hand-rolled `<span class="status-dot status-dot--…">` in `TopDock.vue` (D2, D3) and `AnimationMenuBar.vue` (D1) with `<StatusDot :variant="…" />`. This deletes the dependency on the missing CSS entirely and is the idiomatic component-over-CSS-class path (J invariant 2). `StatusDot` is already exported and has ≥2 consumers, so no substrate gap.

### 5.2 The active-progress conic ring — SUBSTRATE GAP candidate

`StatusDot` covers the three **discrete** states (idle/active/paused) but **not** the **continuous progress arc** — the conic-gradient ring driven by `--dot-p`. The demo currently hand-rolls this in `AnimationMenuBar.vue`'s scoped CSS.

glass-ui circular-progress inventory:
- `Progress` — **linear** bar only (default + gradient variant). Not circular.
- `Pulse` — dots / ring **loading indicator** — indeterminate, not progress-bound.
- No determinate **circular / radial progress** primitive exists.

**SUBSTRATE-GAP candidate: a `ProgressRing` (or `CircularProgress`) primitive.** A small token-driven radial-progress component (`value` 0–1, conic-gradient fill, optional glow). Apply the ≥2-consumer test:

- Consumer 1 — keyframes.js rotations dropdown (D1) per-animation progress.
- Consumer 2 — the AnimationMenuBar collapsed-pill could show overall group progress as a ring around the play button; the timeline scrubber caret is another natural consumer.
- Within glass-ui's own demo storybook a radial progress is a common pattern.

The ≥2-consumer bar is **plausibly met but not yet proven** with two *shipping binaries*. Recommendation: flag `ProgressRing` as a **provisional new-primitive candidate** for the Q tranche; if a second concrete consumer is not identified at tranche planning, the demo keeps the conic-gradient as a **demo-private** recipe (it is already correctly scoped to one SFC) and only the discrete `StatusDot` swap (5.1) lands. Either way the headline defect is fixed by 5.1 — the progress *ring* is the optional enhancement.

### 5.3 Rainbow play button

glass-ui ships `--rainbow-*` and `--rainbow-pastel-*` **tokens** but no `.rainbow-vivid/.rainbow-pastel` utilities, and the `presets/keyframes-js` preset was retired. Two idiomatic options:

- **Option A (preferred, demo-local):** the rainbow play button is a keyframes-demo brand element, not a glass-ui concern (memory: "presets in consumers"). Re-express `.rainbow-vivid` / `.rainbow-pastel` as demo-local `@utility` blocks in `utils.css`, built **on top of the glass-ui `--rainbow-*` tokens** (do not re-hardcode the stops — memory: "tailwind-first"). Drop `bg-primary` from the button so the gradient is not fighting a variant background — use `variant="ghost"` or a bare `Button` and let the utility own the background.
- **Option B (substrate):** add a `rainbow` Button variant to glass-ui's `buttonVariants` CVA. Only if a second consumer exists — otherwise it fails the ≥2-consumer test. Default to Option A.

`.dock-play-btn` (hover-scale + brightness + focus-ring) should be replaced by glass-ui's `scale-on-hover` utility (already used elsewhere in the demo) plus `focus-ring`; no need to resurrect a bespoke class.

### 5.4 App background (V2)

The transparent-checkerboard background means the root surface paints nothing. Audit `App.vue` / the work-area wrapper for a missing `bg-background` (or the body `overflow:hidden` clipping a panel that should fill). The fix is a single opaque surface class on the app root — likely `bg-background` lost in a refactor. Verify against glass-ui's `--background` token (already wired in `style.css` `@layer base`).

### 5.5 glass-subtle → glass-wash (V5)

Rename `glass-subtle` → `glass-wash` at all three call sites (`AnimationControls.vue`, `AnimationControlsGroup.vue`, and delete `SceneNav.vue` entirely). No alias — clean break (memory: "no backwards compat").

### 5.6 text-2xs (V6)

`text-2xs` is undefined. Either add a demo `@theme` `--text-2xs` token or use the existing glass-ui type ladder (`typography.css` golden-ratio scale). Prefer the glass-ui ladder — pick the smallest semantic class rather than minting a one-off.

### 5.7 Dead-code removal

- Delete `demo/app/SceneNav.vue` — zero importers (superseded by TopDock).
- Delete the 25 orphaned `demo/@/components/ui/` dirs — zero importers outside `ui/`.

### 5.8 Vite fs.allow (F6)

Add the glass-ui `src/fonts` path (or the symlink-resolved root) to `vite.config.ts` `server.fs.allow` so the Fira Code woff2 resolves.

---

## Section 6 — Wave fold-in

Proposed Q-tranche waves for the shared-chrome slice:

| Wave | Title | Folds in | Defects closed |
|---|---|---|---|
| Qτ-W1 | Status-dot restoration | Swap hand-rolled `.status-dot--*` spans for `<StatusDot variant>` in `TopDock.vue` (D2, D3) and `AnimationMenuBar.vue` (D1) | F1, F2, V1 (headline) |
| Qτ-W2 | Progress-ring decision | Either land `ProgressRing` glass-ui primitive (if ≥2 consumers proven) or keep the conic ring demo-private; wire the active-progress arc back onto the D1 dots | V1 enhancement, substrate-gap resolution |
| Qτ-W3 | Rainbow play button + dock-play-btn | Demo-local `@utility rainbow-vivid/pastel` over glass-ui `--rainbow-*` tokens; replace `dock-play-btn` with `scale-on-hover` + `focus-ring`; drop `bg-primary` | F3, V3 |
| Qτ-W4 | App background + glass-subtle migration | Restore root `bg-background`; `glass-subtle` → `glass-wash` at 3 sites; `text-2xs` → type ladder | V2, V4, V5, V6 |
| Qτ-W5 | Dead-code + plumbing | Delete `SceneNav.vue` + 25 orphaned `ui/` dirs; Vite `fs.allow` for fonts; investigate the scene-router warp (F4) and Transition null-deref (F5, coordinate with Qσ) | F4, F6, dead code; F5 cross-slice |

Counts: 6 functional defects (F1–F6), 7 visual defects (V1–V7), 5 proposed waves.

---

## Section 7 — Severity summary

| Severity | Count | Items |
|---|---|---|
| P0 | 3 | F1, F2, V1 — rotations-dropdown + TopDock-select progress dots invisible (undefined `.status-dot--*` classes) |
| P1 | 4 | F3, V2, V3, V5 — black play button, transparent app background, missing rainbow, `glass-subtle` dropped |
| P2 | 5 | F4, F5, F6, V4, V6 — scene-router warp, Transition null-deref, font 403, washed dock, undefined `text-2xs` |
| P3 | 1 | V7 — `gold-shimmer` (Qρ slice, noted only) |

### Headline root cause (one sentence)

The "rotations dropdown not having proper progress circles/colors" is caused by commit `17adae2 "clean up styles, remove glass-ui overlap from utils.css"`, which deleted the demo-local `.status-dot--active / --paused / --idle` color classes (and `--color-status-*` tokens) on the false assumption they duplicated glass-ui — glass-ui ships only the **base `.status-dot`** utility (shape, no color, no state modifiers), so the dropdown's per-option dots now paint a fully transparent fill and the discrete state colors are gone; the active-state conic-gradient progress arc survived (scoped inside `AnimationMenuBar.vue`) but only shows while an animation is actively playing.

### Substrate-gap primitive candidate

`ProgressRing` / `CircularProgress` — a determinate radial-progress primitive. glass-ui has linear `Progress` and indeterminate `Pulse` but no determinate circular progress. Flagged **provisional** — passes the ≥2-consumer test only if a second shipping consumer is confirmed at tranche planning; otherwise the conic-gradient stays demo-private (already correctly scoped) and only the discrete `StatusDot` swap lands. The headline defect is fully fixed by the `StatusDot` swap regardless.

### Shadow-copy assessment

The `demo/@/components/ui` layer is **not** a drift amplifier — all live primitives import `@mkbabb/glass-ui` directly per the CLAUDE.md consumer-wiring pattern; the 25 `ui/` dirs are orphaned dead shadcn-vue code. The true amplifier is the **demo-global CSS** silently shedding class definitions across "cleanup" refactors that misjudged the glass-ui overlap boundary.

### Screenshots (`docs/tranches/Q/research/screenshots/`)

`q-tau-01-home-1440.png`, `q-tau-02-cube-1440.png`, `q-tau-03-rotations-dropdown-open.png`, `q-tau-04-rotations-dropdown-open-1440.png`, `q-tau-05-rotations-dropdown-closeup.png` (headline), `q-tau-06-cube-375.png`, `q-tau-07-cube-768.png`, `q-tau-08-topdock-expanded.png` — 8 total.
