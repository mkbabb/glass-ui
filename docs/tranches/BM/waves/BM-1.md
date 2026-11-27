# BM-1: the toggle's new face

| field | value |
|---|---|
| release | the dock-redesign minor (BL's W-I.8, with W-B.17's plate) |
| status | planned |
| order | IN O-428, the owner on glass.babb.dev, 2026-11-23 23:03 to 23:06: "we should re-design the darkmode toggle to be more like daraksha's for glass-ui, but slightly less ornate, but coloured too." BM's decision is letter B, the coloured design (D§9, D§14.1 item 3) |
| DESIGN | §9; with §5.1, §5.3, §10.1, §10.3 and §10.6 |
| sketch | `study/pass-10/toggle/sketch/DarkModeToggle.next.vue` and `dark-mode-toggle.next.css`, as amended by the final fold (A10-1, A10-2, A10-9, B10-1, B10-4) |
| page | P10-toggle, letter B (repaired by the pages seat before the owner reads it) |
| gates | G-2, G-3, G-5; G-4 on the dock-redesign minor's candidate |

## What it builds

daraksha's `ThemeControl.vue` is a private repo, so its idea is taken and none of its assets.

- **The glyph,** in a 24 × 24 viewBox. The sun is a disc of r 6.5 with eight round rays from r 8.5 to 10.5 (stroke 2). Going dark, the rays scale to 0.5 about the centre, under the disc, and a night circle of r 5.75 at (15.5, 8.5) slides from `translate: 9px -9px` to 0 inside the glyph's luminance mask and carves the crescent. The night is filled black inside the mask, since a luminance mask cuts only under black. The mask keeps its own white and black under forced colours (`forced-color-adjust: none`).
- **One clock.** The rays, the night and the colour ride one 200 ms clock: the shapes on present's curve, the colour on `--ease-standard`. Going dark the night follows the rays by 50 ms; coming back it leads them.
- **Colour.** `--section-color-5` (amber) in light and `--section-color-2` (indigo) in dark (`src/styles/tokens/light-dark.css:187`, `:190`). The colour tweens with the glyph, so nothing changes colour between two frames. `--toggle-tone`, set on an ancestor, replaces both, so a site with one ink sets it to that ink.
- **The button** becomes a `.plate` that answers hover and focus as a fill alone (`--plate-from: 1`). Its glyph is its one on-mark and its press's answer, so it carries the attribute W-B.17's plate reads (BL's row, §8 of BM.md): no on fill from `aria-pressed`, no press tone and no shrink. `useLiquidPress` leaves the component.
- **The name** stays as 11.1.2 sets it (GL-7): a fixed "Dark mode", with `aria-pressed` for the state.
- **Reduce Motion.** The rays' opacity crossfades against the night's at its carving place, on the same 200 ms clock, and the colour still tweens. The glyph's groups keep `data-allow-motion`, so the universal carve lets the crossfade through.
- **The count.** A tap runs three legs, the rays, the night and the colour: one of the five yields, by O-428, named in `restraint.md`'s ceiling. A hover runs one, the plate's fade.

## Inputs folded

- **The theme change as one tween** (IN O-430, item 9's second half, placed with this face; IN O-436 (6), "With the toggle's new face: the theme flip"). 11.1.2 puts the dock's words and glyph on the plate's clock. BM-1 starts the glyph's 200 ms on the frame the root's `.dark` changes, so the glyph lands with them. A site that sets `disable-transitions` re-prints its page in one style recalc by its own choice (atlas does by default, `DockThemeToggle.vue:12` and `:35` on `u/s24-atlas`); the glyph's groups carry `data-allow-motion`, so `html.no-transition *:not([data-allow-motion])` (`src/styles/utilities/a11y-overrides.css:72-74`) still lets the glyph tween. BM builds no page-wide colour tween: the study designs none. The wave's strip films one flip frame by frame in each theme on glass's demo dock, and if the ground cuts while the glyph tweens, that strip goes to the owner with the wave.
- **The specular rest light** (S112, the pointer-light section). The rest-light selector on `release/11.1.1` (`src/styles/glass/material.css:350-375`) lists the dock's own controls and not `.dark-mode-toggle-button`, so the toggle carries no rest light today, and BM-1 adds none.
- **More contrast and forced colours.** Both arms of `src/styles/accessibility.css:9-51` take `[aria-pressed="true"]`, so in dark mode they would draw a selection border on the toggle, a second sign of a state the glyph already shows. The proof reads it. If the arms ring the toggle, the same attribute that keeps the plate's on fill away narrows them too.

## Bytes

Today the svg is 251 B and the css 246 B. The new svg is 312 B and the css 411 B: +226 B gzipped in the toggle's own chunk (`study/pass-10/toggle/toggle.json`, re-priced by the final fold). It removes the toggle's own hover, focus and press rules (W-B.17's plate takes them) and the `useLiquidPress` call.

## Proof

In headless Chromium and Playwright WebKit, through `guarded`, on P10-toggle's B and on glass's demo dock:

- the crescent read by pixels in light and dark, and under forced colours with a light-text and a dark-text theme;
- a tap's three legs on one 200 ms clock and a hover's one; in dark, no on fill, no rest light and no selection border;
- the glyph's contrast at 3:1 or more against the page and against the plate, in each theme, with and without `--toggle-tone`;
- under Reduce Motion, the crossfade with no cut;
- the flip strip above, with `disable-transitions` on and off;
- the accessible name "Dark mode" and `aria-pressed` unchanged from 11.1.2;
- G-2 (the SVG children's transforms and the colour are effects of 200 ms, admitted by P5), G-3 (three, named) and G-5.

## Sites it serves

| Site | Where it mounts glass's toggle | What the site does |
|---|---|---|
| atlas | `src/platform/chrome/dock/components/DockThemeToggle.vue:29`, used by `Dock.vue:631`, `:717` and `DockFoot.vue:61` (`u/s24-atlas`) | nothing, or `--toggle-tone` on its docks for one ink (asked) |
| keyframes | `demo/app/dock/ChromeDock.vue:641` (`origin/master`, with `kf47` merged), already named "Dark mode" | nothing |
| gaggle | `dashboard/src/App.vue:152` (`tranche-c`); `dashboard/src/report/kit/KitDock.vue:91`, `report/page/PageDock.vue:117`, `:138` and `shell/Dock.vue:221` (`site-redesign`) | nothing |
| slides | `src/deck/DeckView.vue:164`, inside the deck's dock, and `src/views/HomeView.vue:27` (`npig`, on glass 10.1.4) | moves to the dock-redesign minor when it next touches the decks |

Not mounted: color (its theme is a "Dark mode" checkbox row in two menus, `demo/shell/dock/menus/ProfileSection.vue:248` and `MobileMenuDropdown.vue:157`), fourier (its own `web/src/components/layout/DarkModeToggle.vue`, a `DockControl` at `:36` with `:aria-pressed="isDark"` at `:39`, which BM-2's on-mark attribute serves), daraksha (`ThemeControl`), dns-analysis (its own `frontend/src/components/layout/DarkModeToggle.vue`) and Home Assistant.

## Not this wave's

The theme seat's place beside the dock (W-I.8's R-12, the same minor); the goo that joins it (BM-12, 12.0.0); 11.1.2's toggle fixes (the press stall, the reduced-motion cuts, the fade of the words).
