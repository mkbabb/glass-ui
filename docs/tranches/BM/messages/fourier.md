# To fourier

Hi,

I wanted to tell you what glass's next releases change on fourier, ask you for one small change in the toggle, and ask about your sliders. I read `origin/master` before writing, where fourier pins glass at 11.1.0 (`web/package.json:22`), so each part below reaches you when you move that pin to the release that carries it.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut.

## The minor that brings the dock redesign

Every dock seat's hover becomes a flat plate in the seat's own tone, at 6.5 % in light and 5 % in dark, with the current seat at 10 %, and the glyph keeps its colour.

Your own toggle, `web/src/components/layout/DarkModeToggle.vue`, wears `DockControl` (`:36`) with `:aria-pressed="isDark"` (`:39`). On 11.1.0 that already rests it filled and lit in dark mode: the dock paints any control whose `aria-pressed` is true with its active fill and its resting light, so leaving out `active` (your note at `:28-30`) doesn't keep the paint away. The new plate would do the same. Glass adds one attribute for a control whose glyph already shows its state, which keeps the plate to hover and focus and lifts the active fill, the resting light and the press tone from it. Could you set it on that `DockControl` when you move to that minor? I'll send its name with the release notes. Glass's own toggle carries the same attribute from that minor.

Your toggle flips the theme through glass's `useGlobalDark` (`:95`), so the page's flip becomes one 200 ms crossfade of the whole page, the ground, the words and the glass together, instead of the one-frame flip value.js filmed on fourier. Your morph glyph would be crossed with its old self unless it's lifted out of the crossfade, so `toggleDark` takes your toggle's element as an optional argument, and the morph then draws live above the crossfade. I'll send its name with the same notes.

## The minor with the new springs, sliders and menus

- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, but nobody has timed it on an iPhone yet.
- Your DropdownMenus, the dock's (`AppDock.vue:646`) and the four in `AnimationControls.vue` among them, grow from their button as they do today, and that grow still runs on the page's thread. They leave by fading where they are, on the even exit curve 11.1.1 brings.
- The segmented mark in `EquationModeToggle.vue:59` and the Gallery's tabs (`GalleryView.vue:479`) becomes one capsule that slides, with no lift or stretch, and arrow keys fade it across.
- The scroll progress rim on your dock (`AppDock.vue:785`) reveals its stroke by a sliding window instead of redrawing a clip each frame. It still draws the value you feed it.
- Every Slider grows while it's used: on a press, on Tab, and under a resting mouse after 120 ms. Its track colour grows out by up to 8 px a side and goes back on the same 200 ms. While it's used the root's box doesn't move, and the grown track takes no taps. On a touch screen the slider's box becomes 44 px tall, and the grown track fits inside it. Sliders go thumbless by default, so a fill ends in its own rounded cap.
- If glass's Carousel work lands in time for this minor, the featured carousel's press under Reduce Motion (`GalleryFeaturedCarousel.vue:70`) fades out where it is, lands while hidden and fades back in, 100 ms each way.
- Glass's FourierField starts computing its series through `@mkbabb/fourier`. Thanks for getting 0.1.0 onto npm; it gives the package its first outside user.

## 12.0.0

The dock's fold changes so the glass's edge cuts each seat as it passes, and its per-frame script goes. Nothing fourier imports from glass is removed.

## What I'd like to hear back

Each default below is fixed at the springs-and-sliders minor's release candidate.

1. `FourierTimeline.vue:222` is a scrubber the finger already owns, under a stage you pan and pinch, and `SliderControl.vue:187` is the slider behind the equation input (`FunctionInput.vue:208`) and the morph controls (`HarmonicLevelGrid.vue:10` and `:20`, `MorphPhaseConfig.vue:46`). Should both grow while held, or would you set `:expand="false"` on either? Both grow unless you tell me otherwise.
2. Should the timeline's scrubber keep a visible knob once sliders go thumbless? It ends in its fill's cap unless you'd like the knob.
3. Does either slider sit within 8 px of the canvas or the dock, or inside a box that clips its overflow by less than 8 px? I'll take it that neither does unless you say so.
4. Does any of your tests read a slider's painted size while it's held, or the rim's clip? If one does, I'd like to know before the release candidate goes out so I can send you the new values.

Thanks,
Mike
