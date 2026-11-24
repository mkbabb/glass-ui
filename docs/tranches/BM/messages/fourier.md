# To fourier

Hi,

I wanted to tell you what glass's next releases change on fourier, ask you for one small change in the toggle, and ask about your two sliders. I read `origin/master` before writing, where fourier is on glass 11.1.0.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut.

## The minor that brings the dock redesign

Every dock seat's hover becomes a flat plate in the seat's own tone, at 6.5 % in light and 5 % in dark, with the current seat at 10 %, and the glyph keeps its colour.

That plate rests at full strength on any control whose `aria-pressed` is true, and your own toggle, `web/src/components/layout/DarkModeToggle.vue`, wears `DockControl` with `:aria-pressed="isDark"` (`:31-34`). In dark mode it would sit on a filled plate as if it were a second current seat. Glass adds one attribute for a control whose glyph already shows its state, which keeps the plate to hover and focus with no held fill, no press tone and no shrink. Could you set it on the `DockControl` at `DarkModeToggle.vue:31` when you move to that minor? I'll send its name with the release notes. Glass's own toggle carries the same attribute from that minor.

## The minor after that, with the new springs, sliders and menus

- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, but nobody has timed it on an iPhone yet.
- Your DropdownMenus, the dock's (`AppDock.vue:485`) and the four in `AnimationControls.vue` among them, grow from their button as they do today, and that grow still runs on the page's thread. They leave by 11.1.1's fade.
- The segmented mark in `EquationModeToggle.vue:59` and the Gallery's tabs (`GalleryView.vue:473`) becomes one capsule that slides, with no lift or stretch, and arrow keys fade it across.
- The scroll progress rim on your dock (`AppDock.vue:597`) reveals its stroke by a sliding window instead of redrawing a clip each frame.
- Every Slider grows while it's used: on a press, on Tab, and under a resting mouse after 120 ms. Its track colour grows out by up to 8 px a side and goes back on the same 200 ms. The root's box never moves, and the grown track takes no taps. On a touch screen the slider's box becomes 44 px tall, and the grown track fits inside it.
- Under Reduce Motion the featured carousel's press (`GalleryFeaturedCarousel.vue:70`) fades out where it is, lands while hidden and fades back in, 100 ms each way.
- Glass's FourierField starts computing its series through `@mkbabb/fourier`. Thanks for getting 0.1.0 onto npm; it gives the package its first outside user.

## 12.0.0

The dock's fold changes so the glass's edge cuts each seat as it passes, and its per-frame script goes. Nothing fourier imports from glass is removed.

## What I'd like to hear back

1. `FourierTimeline.vue:222` is a scrubber the finger already owns, under a stage you pan and pinch, and `SliderControl.vue:187` is the slider in the equation input (`FunctionInput.vue:208`). Should both grow while held, or would you set `:expand="false"` on either? Both grow unless you tell me otherwise.
2. Does either slider sit within 8 px of the canvas or the dock, or inside a box that clips its overflow by less than 8 px? I'll take it that neither does unless you say so.
3. Does any of your tests read a slider's painted size while it's held, or the rim's clip? If one does, I'd like to know before the release candidate goes out so I can send you the new values.

Thanks,
Mike
