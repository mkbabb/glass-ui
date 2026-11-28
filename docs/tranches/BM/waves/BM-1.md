# BM-1: the toggle's new face, and the theme's one crossfade

| field | value |
|---|---|
| release | the dock-redesign minor (BL's W-I.8, with W-B.17's plate) |
| status | planned |
| order | IN O-428, the owner on glass.babb.dev, 2026-11-23 23:03 to 23:06: "we should re-design the darkmode toggle to be more like daraksha's for glass-ui, but slightly less ornate, but coloured too." BM's decision is letter B, the coloured design (D§9, D§14.1 item 3). The theme flip as one crossfade is O-353's ruling on P0 ("the theme flip cross-fades: ground, text and glass change together over at most 200 ms through a view transition … under reduced motion a plain fade; `disableTransitions` keeps its meaning for layout but no longer makes the flip a cut"), placed with this face by O-430 item 9's second half and O-436 (6) |
| DESIGN | §9; with §5.1, §5.3, §10.1, §10.3 and §10.6 |
| sketch | `study/pass-10/toggle/sketch/DarkModeToggle.next.vue` and `dark-mode-toggle.next.css`, as amended by the final fold (A10-1, A10-2, A10-9, B10-1, B10-4) and by BM part 3's fold (below) |
| page | P10-toggle, letter B (repaired by the pages seat before the owner reads it) |
| gates | G-2, G-3, G-5; G-4's reading on the dock-redesign minor's candidate |

## What it builds

daraksha's `ThemeControl.vue` is a private repo, so its idea is taken and none of its assets.

- **The glyph,** in a 24 × 24 viewBox. The sun is a disc of r 6.5 with eight round rays from r 8.5 to 10.5 (stroke 2). Going dark, the rays scale to 0.5 about the centre, under the disc, and a night circle of r 5.75 at (15.5, 8.5) slides from `translate: 9px -9px` to 0 inside the glyph's luminance mask and carves the crescent. The night is filled black inside the mask, since a luminance mask cuts only under black. The mask keeps its own white and black under forced colours (`forced-color-adjust: none`).
- **One clock.** The rays, the night and the colour start together and ride one 200 ms clock: the shapes on present's curve, the colour on `--ease-standard`. The sketch's 50 ms stagger is struck, so a tap's answer ends at 200 ms (`restraint.md`: "hover and toggle feedback at 200ms or less"), and every leg on the page's thread keeps its 167 ms or more.
- **Colour.** `--section-color-5` (amber, `src/styles/tokens/light-dark.css:190`) in light and `--section-color-2` (indigo, `:187`) in dark, the same lines on `release/11.1.1`. The colour's transition sits on the `svg`, which carries `data-allow-motion` with the two groups, so it survives the flip's `html.no-transition` (the sketch put it on the button, which does not carry the attribute, so on atlas's flip the amber turned indigo in one frame). The glyph takes `currentColor` from the `svg`. `--toggle-tone`, set on an ancestor, replaces both, so a site with one ink sets it to that ink.
- **The button** becomes a `.plate` that answers hover and focus with the plate growing from four fifths as every plate does (the sketch's `--plate-from: 1` is struck: `motion-canon.md` P0's "a hover plate grows from the control" and P0a's "a plate behind a 40 px control grows from four fifths"). Its glyph is its one on-mark and its press's answer, so it carries the attribute W-B.17's plate reads (BL's row, BM.md §8): no on fill from `aria-pressed`, no press tone and no shrink. `useLiquidPress` leaves the component.
- **The name** stays as 11.1.2 sets it (GL-7): a fixed "Dark mode", with `aria-pressed` for the state.
- **The theme's one crossfade.** Every flip glass starts goes through `useGlobalDark().toggleDark()`, which glass's toggle calls and fourier's own toggle calls too. It wraps the root's class change in a view transition through glass's own `useViewTransition`: the page's old and new pictures cross by `opacity` over 200 ms on `--ease-standard`, on the compositor, so the ground, the words and the glass change together. `disableTransitions` keeps its meaning: the page's own transitions sit out the flip, as atlas chose, and the page still crosses. The toggle's button takes a `view-transition-name` of its own, with its old picture hidden and its new one live, so its glyph tweens over the crossfade and is not crossed with its old self. `toggleDark` takes one optional element, named at the wave, so a site's own toggle that tweens its glyph (fourier's) is lifted out the same way. The wave reads glass's stated engine floor: if an engine in it lacks `document.startViewTransition`, the wave stops before building (BM.md §1), since a second path would be a cut.
- **Reduce Motion.** The glyph does not move and takes no view-transition name, so its change rides the page's crossfade, which runs 150 ms under Reduce Motion (O-350's ceiling for a reduced fade; an opacity change on the compositor, so the 30 fps line does not reach it). The crossfade's reduced form is an `!important` carve in `components`, named in `styles/view-transition.css` (BM.md §1). Nothing in the toggle needs a reduced carve of its own.
- **The count.** A tap runs three legs on the toggle, the rays, the night and the colour: one of the seven yields, by O-428, named in `restraint.md`'s ceiling, and the button's root carries `data-motion-count="3"` (G-3). The page's crossfade is the page's one leg, not the control's. A hover runs two, the plate's fade and its growth.

## Inputs folded

- **The theme change as one tween** (IN O-430, item 9's second half; IN O-436 (6), "With the toggle's new face: the theme flip"; O-353's ruling). 11.1.2 puts the dock's words and glyph on the plate's clock. BM-1 makes the rest of the page cross on the same flip, above. The formation's line "BM builds no page-wide colour tween: the study designs none" is struck: the ruling and both placements ask for it.
- **The specular rest light** (S112, the pointer-light section). The rest-light selector on `release/11.1.1` (`src/styles/glass/material.css:350-375`) lists the dock's own controls and not `.dark-mode-toggle-button`, so the toggle carries no rest light today, and BM-1 adds none.
- **More contrast and forced colours.** Both arms of `src/styles/accessibility.css:9-51` take `[aria-pressed="true"]`, so in dark mode they would draw a selection border on the toggle, a second sign of a state the glyph already shows. The proof reads it. If the arms ring the toggle, the same attribute that keeps the plate's on fill away narrows them too.

## Bytes

Today the svg is 251 B and the css 246 B. The new svg is 312 B and the css 411 B: +226 B gzipped in the toggle's own chunk (`study/pass-10/toggle/toggle.json`, re-priced by the final fold). It removes the toggle's own hover, focus and press rules (W-B.17's plate takes them) and the `useLiquidPress` call. The crossfade's wrapper in `useGlobalDark` and its rules in `view-transition.css` are priced at the wave.

## Proof

In headless Chromium and Playwright WebKit, through `guarded`, on P10-toggle's B and on glass's demo dock:

- the crescent read by pixels in light and dark, and under forced colours with a light-text and a dark-text theme;
- a tap's three legs starting together and ending by 200 ms, and a hover's two (the plate's fade and its growth from four fifths); in dark, no on fill, no rest light and no selection border;
- the glyph's contrast at 3:1 or more against the page and against the plate, in each theme, with and without `--toggle-tone`;
- **the flip strip, a proof cell:** one flip filmed frame by frame in each direction on glass's demo page, with `disable-transitions` on and off, and under Reduce Motion: at least three intermediate frames of the page's ground and of body text, no frame in which the ground has changed and the plate or the words have not (or the reverse), and no frame with dark text on a dark ground; the glyph's computed colour read on every frame, never a step;
- under Reduce Motion, the glyph still and its change inside the 150 ms crossfade, with no cut;
- the accessible name "Dark mode" and `aria-pressed` unchanged from 11.1.2;
- G-2 (the SVG children's transforms and the colour are effects of 200 ms, admitted by P5; the crossfade is `opacity`), G-3 (three, by `data-motion-count`) and G-5 in both modes.

## Sites it serves

| Site | Where it mounts glass's toggle | What the site does |
|---|---|---|
| atlas | `src/platform/chrome/dock/components/DockThemeToggle.vue:29`, used by `Dock.vue:631`, `:717` and `DockFoot.vue:61` (`u/s24-atlas`). Its `:aria-label="name"` at `:34` ("Switch to dark theme" or "light theme") overrides glass's fixed name, since `forwardedAttrs` spreads it last (`DarkModeToggle.vue:27-33`), and with `aria-pressed` the state is read twice | drops the label at `:34` to take the fixed name (asked); `--toggle-tone` on its docks for one ink (asked). Its page crosses on the flip with `disableTransitions` still on |
| keyframes | `demo/app/dock/ChromeDock.vue:641` (`origin/master`, with `kf47` merged), already named "Dark mode" | nothing |
| gaggle | `dashboard/src/App.vue:152` (`tranche-c`); `dashboard/src/report/kit/KitDock.vue:91`, `report/page/PageDock.vue:117`, `:138` and `shell/Dock.vue:221` (`site-redesign`) | nothing |
| slides | `src/deck/DeckView.vue:164`, inside the deck's dock, and `src/views/HomeView.vue:27` (`npig`, on glass 10.1.4) | moves to the dock-redesign minor when it next touches the decks |
| fourier | its own toggle (`web/src/components/layout/DarkModeToggle.vue`), which flips through glass's `useGlobalDark` (`:95`) | its page crosses on the flip with no change; it passes its toggle to `toggleDark` so its morph draws live over the crossfade (asked) |

Not mounted: color (its theme is a "Dark mode" checkbox row in two menus, `demo/shell/dock/menus/ProfileSection.vue:248` and `MobileMenuDropdown.vue:157`), daraksha (`ThemeControl`), dns-analysis (its own `frontend/src/components/layout/DarkModeToggle.vue`) and Home Assistant.

## Not this wave's

The theme's own corner dock (W-I.8's R-12, the same minor); the goo that joins a seat to its dock (BM-12, 12.0.0); 11.1.2's toggle fixes (the press stall, the reduced-motion cuts, the fade of the words).
