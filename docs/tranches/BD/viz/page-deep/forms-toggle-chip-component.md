# Pass-E COMPONENT deep-audit — forms/toggle-chip

**Page:** `forms/toggle-chip` · **Import label (page-declared):** `@mkbabb/glass-ui/toggle-chip`
**Real source audited:**
- `src/components/custom/toggle-chip/ToggleChip.vue` (48 L) — the SFC, a thin reka-`Toggle` wrapper
- `src/components/custom/toggle-chip/index.ts` (94 L) — `toggleChipVariants` CVA (chip · cell) + the barrel
- `src/styles/glass/accent-tone.css` (67 L) — the `.accent-tone` register both chips read
- `src/composables/color/useAccentTone.ts` — the value.js contrast-safe-ink half (consumed by SelectableChip, NOT by ToggleChip)
- sibling for contrast: `src/components/custom/selectable-chip/SelectableChip.vue` + `selectableChipVariants.ts`

No procedural-viz (no aurora/blob/fourier) — ToggleChip is a pure CVA-over-reka control. PROCEDURAL-SUITE axis = N/A.

---

## What the component actually IS

`ToggleChip` is a 48-line SFC that forwards `ToggleProps`/`ToggleEmits` to reka-ui's headless `<Toggle>` and applies one of two CVA shapes (`chip` inline token · `cell` square icon-card). reka owns the `aria-pressed`/`data-state="on"`/keyboard behavior; the CVA owns 100% of the paint. Since BC.W-ACCENT-TONE the tonal channels (idle fill · active band · active edge · ink) were re-pointed off per-state `color-mix(--primary…)` literals onto the shared `.accent-tone` register (one `--tone` → four contrast-floored channels). The structural padding/radius/text-size stay local.

---

## Findings (component, not demo)

### (1) ANIMATION — affordance present but PARTIAL; missing entrance/exit + interruptible spring

- **Four-state contract: present and idiomatic.** `index.ts:29-30` carries the canonical §6 split — `scale` (hover `--scale-hover-btn`, active/on `--scale-press-btn`) rides `--spring-smooth` on its `--spring-smooth-duration` clock; the SURFACE legs (bg/border/box-shadow/color) ride the bezier `--duration-fast`/`--ease-standard`. This is the post-BA.W-GLASS-CAL register and is correct (the old `transition-colors duration-150` jitter is gone — comment-recorded). **GOOD.**
- **DEAD/MISSING: no entrance/exit animation.** A chip just appears — no mount/`vReveal`/staggered entrance, no exit. motion-canon P2 (enter-bouncy) / P3 (fade-coupled-to-transform) are unrealized on the component. A `cell` grid in particular should build in (the IconChip `:reveal` precedent the sibling demos already use). **MISSING.**
- **JANK risk: CSS-transition press, not interruptible spring.** The press is a CSS `:active`/`data-[state=on]` scale via a `transition`, NOT `useSpringPress`/`useLiquidPress`. A rapid re-press restarts the transition (no velocity-continuity) — the exact non-interruptible class W-PRESS-UNIFY (BB) fixed for Button/Card. ToggleChip never reached the press-unify register. **MODIFY.**
- **No volume-preserving squish.** Sibling controls (tabs indicator, Button) carry the `useLiquidFlex` reciprocal X/Y squish; ToggleChip scales uniformly (a flat shrink, no gel). Lower priority but off-register.

### (2) PROCEDURAL VIZ — N/A (no GPU surface). Safari-GPU bar not applicable.

### (3) PERFORMANCE — clean

- Compositor-only: `scale` (transform) + `background-color`/`border-color`/`box-shadow`/`color` transitions. No layout property animates → `proof:no-layout-animation` holds by construction. No offscreen-pause needed (no rAF/canvas). No layout-thrash. **GOOD.**

### (4) SAFARI — compatible

- `scale`/`color-mix(in oklab,…)`/`data-[state]` are all Safari-26 safe. `.accent-tone` mixes `in oklab` (the perceptual glass-tint family) — Safari-supported. No `@property`-driven channel here (the `--accent-*` are plain custom props, no registration needed). **GOOD.**

### (5) IDIOMATIC / NO-LEGACY — TWO real architectural smells

- **DUAL-PATH: ToggleChip and SelectableChip are near-duplicate reka-`Toggle` wrappers both reading `.accent-tone`.** SelectableChip (BC.W-ACCENT-TONE) is the *public face* of the same register, adds a `size` rung + threads `useAccentTone` (value.js contrast-safe ink). ToggleChip predates it and was retro-fitted onto `.accent-tone` but NOT onto `useAccentTone`. Two SFCs, two CVAs, one register, overlapping intent — the no-dual-path SOTA bar (BB.W-PRUNE-CONSOLIDATE) is violated in spirit. Either ToggleChip becomes a thin `variant`-axis of SelectableChip, or its `cell` variant (the distinguishing value — square icon-card; SelectableChip has no cell) is folded INTO SelectableChip as a `shape`/`variant`, and ToggleChip retires (clean break, no alias). **PRUNE/FOLD.**
- **CONTRAST BUG: ToggleChip's active-band ink is NOT contrast-safe.** `index.ts:62,83` set `data-[state=on]:text-(--accent-ink)`, and `accent-tone.css:64` falls back `--accent-ink: var(--accent-ink-resolved, var(--foreground))`. `--accent-ink-resolved` is written ONLY by `useAccentTone` (SelectableChip's JS half). ToggleChip never calls it → the active-band label is always the warm `--foreground`, which can drop below AA over a saturated `--accent-band` (a dark consumer `--tone`). This is the exact failure `safeAccentColor` exists to prevent; ToggleChip silently bypasses it. **MODIFY (or resolved free by the FOLD).**

### (6) GLASS SIX-LAYER COMPOSITE — ABSENT

ToggleChip composes ZERO glass tier — no backdrop blur+saturate, no surface-tint plate, no edge rim beyond a flat `border`, no inner catch-light/specular, no drop shadow, no grain. It is a flat opaque `color-mix` tonal chip. Against the DESIGN.md North Star (every glassy control reads as the six-layer optical composite) and BC.W-DESHADCN (reka=behavior / glass-ui=100% material), a selectable chip rendering over a colorful aurora SHOULD read as liquid glass (the `.glass-menu-row` element-level oklab-tint + the W-LIQUIDHOVER tier-root specular auto-arm + the `--glass-accent` chromatic rim are the shipped seams it could compose). Today it reads as a flat pill on the field. **AUGMENT** — route the active state through a glass tier + the per-instance `--glass-accent` rim (the `--tone` already in hand), composing not forking. (Note: SelectableChip shares this gap — both are flat. This is a register-wide AUGMENT, not a per-component patch.)

---

## Mapping to the BD tranche

| # | Finding | Disposition | Wave |
|---|---------|-------------|------|
| 5a | ToggleChip ≈ SelectableChip dual-path (one register, two SFCs); fold `cell` into the accent-tone family, retire ToggleChip clean-break | **PRUNE/FOLD** | NEW `BD.W-CHIP-CONSOLIDATE` (no existing wave touches it; sits beside the BC.W-ACCENT-TONE family + W-PRUNE-CONSOLIDATE no-dual-path discipline) |
| 5b | ToggleChip active ink not contrast-safe (`useAccentTone` un-threaded → AA risk on a dark `--tone`) | **MODIFY** (resolved free by 5a's fold) | same `BD.W-CHIP-CONSOLIDATE` |
| 1a | No entrance/exit; `cell` grid should build-in (IconChip `:reveal`/scroll-cascade precedent) | **AUGMENT** | same fold wave OR `BD.W-CONTROL-SMOOTH` (which already owns the toggle/control de-shadcn reskins + control CLOCK) |
| 1b | Press is CSS-transition, not interruptible `useSpringPress`/`useLiquidPress` (no velocity-continuity, no squish) | **MODIFY** | `BD.W-CONTROL-SMOOTH` (the "kill the control lag — quick coupled response" wave; press-unify register extension) |
| 6 | No glass six-layer composite — flat opaque tonal pill; route active state through a glass tier + `--glass-accent` rim over aurora | **AUGMENT** (register-wide; SelectableChip shares it) | NEW `BD.W-CHIP-GLASS` OR extend `BD.W-DESHADCN-CANON`'s material-first scope to the chip family (de-shadcn = 100% material; a flat pill is the residual) |

**No existing BD wave covers ToggleChip's component-level animation/glass/dual-path gaps.** BD.W-CONTROL-SMOOTH is the nearest home (it owns the toggle reskins + the control clock), but it does NOT name toggle-chip and does not address the dual-path or the missing glass composite. Two new thin waves (`BD.W-CHIP-CONSOLIDATE` + `BD.W-CHIP-GLASS`) or a scope-widen of CONTROL-SMOOTH + DESHADCN-CANON are warranted.

---

## VERDICT (5 lines)

1. ToggleChip is a clean 48-line reka-`Toggle` wrapper with a CORRECT post-GLASS-CAL four-state §6 transition register, compositor-only and Safari-safe — the floor is sound.
2. DUAL-PATH: it is a near-duplicate of SelectableChip (same `.accent-tone` register, two SFCs/CVAs) and is the only one NOT threading `useAccentTone`, so its active-band ink is the warm `--foreground` fallback — a real AA contrast bug on a dark `--tone` → PRUNE/FOLD into the accent-tone family (clean break, no alias) which fixes the ink for free.
3. NO six-layer glass composite — a flat opaque `color-mix` pill (no blur/tint-plate/rim/catch-light/shadow/grain); against DESIGN.md + de-shadcn it should read as liquid glass with a `--glass-accent` per-instance rim over the colorful aurora → AUGMENT (register-wide, SelectableChip shares it).
4. ANIMATION partial: four-state ✓ but no entrance/exit (motion-canon P2/P3) and a CSS-transition press instead of the interruptible `useSpringPress`/`useLiquidPress` register (no velocity-continuity, no `useLiquidFlex` squish) → MODIFY via BD.W-CONTROL-SMOOTH.
5. No existing BD wave touches it — recommend `BD.W-CHIP-CONSOLIDATE` (fold + contrast-ink) + `BD.W-CHIP-GLASS` (glass six-layer + rim), with press/entrance folded into the existing BD.W-CONTROL-SMOOTH; standardize the page import label as `@mkbabb/glass-ui/toggle-chip` (or `/selectable-chip` post-fold).
