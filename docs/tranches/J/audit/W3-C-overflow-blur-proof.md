# J.W3.C — Overflow Scroll + Blur Reduction

**Wave**: J.W3 Lane C.
**Owner**: single-agent SEQUENTIAL.
**Status**: closed.

## Scope

Per W3.md Lane C + W0 amendment §F item 5 (which dropped step 3, the `INTERNAL_CATEGORY` localStorage gate, since `manifest.ts` at HEAD has no INTERNAL_CATEGORY).

1. Reduce `--glass-blur-dock-radius` from `1px` → `0px`; drop `saturate(1.025)` from `--glass-blur-dock`.
2. Add `--dock-max-inline-size` + `--dock-max-block-size` tokens.
3. Apply axis-aware overflow scroll on dock inner container with mask-fade.
4. Replace vertical-rail `scrollbar-width: none` with `thin` so users see the affordance at narrow viewports.

## Blur reduction

### Before

```css
--glass-blur-dock-radius: 1px;
--glass-blur-dock: blur(var(--glass-blur-dock-radius)) saturate(1.025);
```

The dock blur radius was already at `1px` (half the wash weight). Per R1 §C: the perceived "dock blur is too high" was carried by the chromatic punch (saturate 1.025 multiplier under aurora background) + 32% bg opacity, NOT the radius. The 1px radius itself was barely perceptible but still triggered compositor blur work on every dock paint.

### After

```css
--glass-blur-dock-radius: 0px;
--glass-blur-dock: blur(var(--glass-blur-dock-radius));
```

Dock blur composes `blur(0px)` only — no saturate, no chromatic punch. The dock relies on `--glass-bg-dock` (32% card opacity) for translucency; aurora bleeds cleanly without the chromatic accumulation.

The `prefers-reduced-transparency` path at `glass.css:229` already maps `--glass-blur-dock` to `none` for users who opt out — we've now made the reduced-transparency path effectively the default for all users (radius 0 ≈ no blur).

User finding 3 closes here.

## Overflow tokens

Added to `src/styles/tokens.css` § "Layout tokens" (post `--mask-fade-width`):

```css
--dock-max-inline-size: min(80vw, 64rem);
--dock-max-block-size: min(80vh, 48rem);
```

Defaults clamp to 80vw / 80vh capped at sensible desktop widths. Consumers override per-dock by setting either token directly on a `.glass-dock` instance.

`.glass-dock` root now applies:
- `max-inline-size: var(--dock-max-inline-size)` — clamps width on horizontal docks (and vertical rails, harmlessly since rails are skinny).
- `max-block-size: var(--dock-max-block-size)` (on `.glass-dock.vertical`) — replaces the legacy `--dock-vertical-max-height: calc(100vh - 2rem)` calculation.

## Overflow scroll + mask-fade

### Horizontal — inner `.dock-layers` scrolls + fades

```css
.glass-dock.expanded:not(.dock-wrap) > .dock-layers {
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: color-mix(in srgb, var(--muted-foreground) 25%, transparent) transparent;
    mask-image: linear-gradient(to right, transparent, black var(--mask-fade-width), black calc(100% - var(--mask-fade-width)), transparent);
}
```

When the active layer's natural width exceeds the dock root's content area (clamped by `max-inline-size`), the inner `.dock-layers` scrolls horizontally with a `--mask-fade-width: 1rem` feathered edge. The `:not(.dock-wrap)` exclusion preserves the wrap-flow path — wrap docks bypass scrolling entirely (their `.dock-layer--full` breaks to multiple rows instead).

`.dock-layers` also gets `min-width: 0` so the grid item can shrink under the cap (default min-content would prevent the clamp).

User finding 1 (docks-overflow-scroll) closes here.

### Vertical — rail scrolls + fades + thin scrollbar

```css
.glass-dock.vertical {
    max-block-size: var(--dock-max-block-size);
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: color-mix(in srgb, var(--muted-foreground) 25%, transparent) transparent;
    mask-image: linear-gradient(to bottom, transparent, black var(--mask-fade-width), black calc(100% - var(--mask-fade-width)), transparent);
}
```

Replaced `scrollbar-width: none` (which silently hid the scrollbar at narrow viewports — R6 cornerstone-2) with `thin` so users see the affordance when content overflows. The `mask-image: linear-gradient(to bottom, ...)` feathers the top + bottom rail edges. The `::-webkit-scrollbar { display: none }` rule is retired (not needed with `thin`).

User findings 5a (vertical-rail overflow) closes here.

## Playwright probes (3 viewports)

Probed `http://localhost:5173/navigation/dock` at three viewports:

### 375×667 (mobile)

`--dock-max-inline-size` resolves to 300px (80vw). The story-pager-dock with content scrollWidth=707 in clientWidth=281 → scrolls horizontally with mask-fade. All 4 horizontal expanded docks have `overflowX: auto` + mask-image active. Vertical rail (dock #0) has mask-image active.

### 1024×768 (tablet)

`--dock-max-inline-size` resolves to 819.2px. Story-pager-dock fits at 707px content < 819px cap; no overflow needed. Smaller docks (popover trigger row, etc.) all fit within cap.

### 1440×900 (desktop)

`--dock-max-inline-size` resolves to 1024px (64rem). All docks fit comfortably; mask-fade renders but contributes no visible feathering since content < cap.

**Hard gate (e) PASS.** Dock content scrolls without clip at every probed viewport; reduced-motion fallback (probed via `emulateMedia({ reducedMotion: 'reduce' })`) snaps the dock instantly without animation.

## Files modified

| File | LOC delta | Concern |
|---|---:|---|
| `src/styles/tokens.css` | +14 / -3 | Reduce `--glass-blur-dock-radius` to 0px; drop `saturate(1.025)` from `--glass-blur-dock`; add `--dock-max-inline-size` + `--dock-max-block-size` tokens |
| `src/styles/dock.css` | net +20 | Add `max-inline-size` + `max-block-size` to root + vertical; add `.glass-dock.expanded:not(.dock-wrap) > .dock-layers` overflow-scroll + mask-fade rule; add mask-fade + `scrollbar-width: thin` on `.glass-dock.vertical`; retire suppressed-scrollbar webkit rule; `min-width: 0` on `.dock-layers` |

`src/styles/utilities.css` — NOT touched. The existing `.scroll-fade-y` (vertical) + `.scroll-fade-mask` (horizontal) utilities exist but were not composed via `@apply` — the dock uses inline `mask-image: linear-gradient(...)` for clarity (the dock's CSS file is the substrate authority for dock visuals; reaching into utilities.css would invert the substrate-with-consumer precept).

## Hard-gate verification

| Gate | Status | Evidence |
|---|:-:|---|
| (d) `--glass-blur-dock-radius: 0px` | PASS | `rg "glass-blur-dock-radius:" src/styles/tokens.css` returns the 0px line |
| (e) Playwright at 375 / 1024 / 1440 — content scrolls without clip | PASS | confirmed via probe |
| (i) Reduced-motion confirms snap fallback | PASS | `emulateMedia({ reducedMotion: 'reduce' })` → t=8ms snaps to expanded width |
| `npm run typecheck` | PASS | clean (post-Lane-A+B+C combined) |
| `npm run build` | PASS | 17.8s build; declarations emitted |
| `npm test` | PASS | 269 / 269 |

## W0-amendment compliance

- Step 3 (`INTERNAL_CATEGORY` localStorage gate) — DROPPED per amendment. Verified `manifest.ts` at HEAD has no `INTERNAL_CATEGORY`, no `Wrench` icon, no `_internal` category. Step skipped.
- Step 4 (vertical-rail viewport overflow) — closed via `scroll-fade-y` mask + `scrollbar-width: thin` + `--dock-max-block-size: min(80vh, 48rem)`.

## Citation

- R1 §C dock blur proposal: file:line citation `src/styles/tokens.css:275, 283`. Resolved.
- R1 §D horizontal overflow scroll: `demo/layout/StoryPager.vue:54-69` workaround retained as consumer override; library now ships canonical mechanism. Resolved.
- R6 cornerstone-2 vertical-rail viewport overflow: closed.
- User findings 1 + 3 + 5a: closed.
