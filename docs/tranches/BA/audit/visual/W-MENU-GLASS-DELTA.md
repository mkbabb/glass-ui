# BA.W-MENU-GLASS — DELTA (the binding π readback, captured own-surface, BOTH modes)

**Wave**: BA.W-MENU-GLASS — the glass menu-row + menu-section register minted on the shared `menuItemVariants` CVA.
**Captured**: tranche/BA HEAD, against the live demo at `:5199` `/containers/dropdown-menu`.
**Gate**: `proof:menu-glass` (born-RED 10 violations / 4 witnesses → GREEN 4/4). **π**: `tests-visual/menu-glass.spec.ts` (30 passed — 2 projects × 2 modes × 2 viewports + the PRM + the DELTA capture).
**Freshness**: this DELTA reflects the HEAD source at capture; the frames + the paired π readback are the binding truth, not a commit-message claim (the cardinal-lesson discipline).

## The defect (HEAD, pre-wave)

The shared `menuItemVariants` CVA (`_shared/menuItemVariants.ts`, composed by **13** menu/picker-family SFCs) painted a FLAT `bg-accent` accent triad on hover/focus/`data-highlighted`/`data-[state=open]` — NO `.glass-quiet` plate, NO `translateY` hover-lift, NO section recipe. Every menu item across DropdownMenu/ContextMenu/Command/Select/Combobox read as a flat-accent row; the slides `DeckSettings` gear hand-built ~120 lines of menu CSS to get a glassy menu. R5-10 (the named successor at AZ FINAL §6) never landed.

## The fix (the register minted ONCE on the shared CVA)

- **`menuItemVariants.ts`** — added a `surface` axis (an EXPRESSION of the shared `{glass·veil·opaque}` surface-decoration axis, not a fork): `glass` (DEFAULT, glass-first canon) composes `.glass-menu-row`; `accent` is the explicit flat-fill escape (clean break, no alias). The flat `bg-accent` utilities DROPPED from the base array (the cascade-trap pre-empt). All 13 SFCs inherit the glass register in ONE edit — no per-SFC template change.
- **`src/styles/menu.css`** (new) — `.glass-menu-row` (the element-level glass-quiet oklab tint on hover/highlight + the PRM-gated `translateY` lift on `--spring-smooth` + the 44px touch floor) + `.glass-menu-section` (mono caption + `--border-hairline`, `--menu-section-*` knobs). `@import`-ed AFTER `utilities.css` so it source-order-wins over `.interactive-item:hover` (the AZ dock-rail `@layer`-loses-to-utility trap pre-empted).
- **`SelectTrigger.vue`** — the `size` prop extended into a font-rung axis (`display`/`audacious`) writing BOTH `--dropdown-text` (the family lever) AND `--text-dropdown` (the var the `text-dropdown` @theme utility reads) so the trigger + items re-resolve at ONE scale (the BA-VJS-4 / WO-3 fix for the value.js 1.59× trigger/items desync).
- **`dropdown-menu.vue`** demo — the in-repo 2nd consumer of `.glass-menu-section` (the "LAYOUT" group label composes it).

## π readback (the binding visual truth — getComputedStyle, BOTH modes, ≥2 viewports)

| arm | assertion | result |
|---|---|---|
| (a) | the hovered DropdownMenuItem `background` is the TRANSLUCENT glass-quiet oklab tint (alpha < 1), NOT the flat `--accent` solid | PASS (light + dark, mobile + desktop) |
| (b) | the hovered row painted height clears the 44px WCAG-2.5.5 touch floor | PASS (≥44px both modes) |
| (c) | the hover-lift register `--menu-row-lift` is non-zero under motion AND the identity (0) under `prefers-reduced-motion: reduce` | PASS |
| (d) | the `.glass-menu-section` caption resolves the mono font + a box-shadow hairline divider | PASS |
| (e) | a font-rung scope writing `--dropdown-text` resolves the trigger AND its items at the SAME scale (no 1.59× desync) AND larger than the default rung | PASS |

## The two live-found defects the π caught (the source-green/visually-broken gap closed)

1. **The 44px floor read `--control-floor` — which is COARSE-pointer-ONLY.** `--control-floor: var(--touch-target, 2.75rem)` is declared ONLY inside `@media (pointer: coarse)`, so on a FINE pointer `var(--control-floor)` resolved to the guaranteed-invalid initial value → `0px` in the `max()`, and the floor silently vanished (the live π read a 36px row). Fixed: read `--touch-target` (the 44px token declared UNCONDITIONALLY at `:root`).
2. **The font-rung write of `--dropdown-text` ALONE was inert for the items.** The `@theme inline --text-dropdown: var(--dropdown-text)` bridge bakes at `:root`, so a descendant overriding only `--dropdown-text` does NOT re-resolve the `:root`-baked `--text-dropdown` (the substitution-vs-inheritance trap). Fixed: the SelectTrigger font-rung writes BOTH tokens.

Both were LOCAL-edit-recoverable (one-token fixes), not register-design misses — no triumvirate fired.

## Gestalt verdict

The captured frames (`W-MENU-GLASS-open-light.png`, `W-MENU-GLASS-open-dark.png`) read as a designed glassy whole: the hovered row is a translucent glass-quiet plate the backdrop reads through, the section caption is a mono small-caps label with a hairline above, the panel is a `glass-floating` surface — the iOS-grade glassy menu-row the R5-10/R8-12 mandate names, NOT the flat accent fill. The `proof:ba-gestalt` menu/dropdown verdict is consumed at W-REFLECT2 (W-GESTALT-GATE roster — never edited by this wave).

## Frames

- `W-MENU-GLASS-open-light.png` — the dropdown open, "New file" hovered (glassy plate), the "LAYOUT" mono section caption + hairline, light mode.
- `W-MENU-GLASS-open-dark.png` — the same in dark mode (the row darkens-over-light / lifts-over-dark per W-DARK-MATERIAL's tint arm).
