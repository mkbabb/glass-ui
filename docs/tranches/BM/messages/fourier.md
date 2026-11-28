# To fourier

Hi,

I wanted to tell you what glass's next releases change on fourier, ask you for two small changes in the toggle and one in a test, and ask about your sliders. I read `origin/master` before writing, where fourier pins glass at 11.1.0 (`web/package.json:22`), so each part below reaches you when you move that pin to the release that carries it.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut.

## The minor that brings the dock redesign

The dock's seats move to a flat hover plate in the seat's own tone, at 6.5 % in light and 5 % in dark, with the current seat at 10 %, and the glyph keeps its colour. Those values come with the minor that brings the dock redesign.

Your own toggle, `web/src/components/layout/DarkModeToggle.vue`, wears `DockControl` (`:36`) with `:aria-pressed="isDark"` (`:39`). On 11.1.0 that already rests it filled and lit in dark mode: the dock paints any control whose `aria-pressed` is true with its active fill and its resting light, so leaving out `active` (your note at `:28-30`) doesn't keep the paint away. The plate the dock's controls move to would do the same. Glass adds one attribute for a control whose glyph already shows its state, which keeps the plate to hover and focus and lifts the dock's whole active paint from it (the fill, the colour, the scale, the border and the shadow), with the resting light and the press tone. Could you set it on that `DockControl` when you move to that minor? I'll send its name with the release notes. Glass's own toggle carries the same attribute from that minor.

Your toggle flips the theme through glass's `useGlobalDark` (`:95`), so the page's flip becomes one 200 ms crossfade of the whole page, the ground, the words and the glass together, instead of the one-frame flip value.js filmed on fourier. Your morph glyph would be crossed with its old self unless it's lifted out of the crossfade, so glass adds a second attribute, which you'd set on the glyph's own element: while the crossfade runs, glass gives that element a name of its own, and the morph draws live above the crossfade. I'll send its name with the same notes. Your header's view-transition rules aren't scoped to a type (`AppDock.vue:1040-1048`): they hide the header's old picture and leave its new one unanimated, which is right for a route change, but on a theme flip the header would show its new theme from the first frame, changing only on its own transitions, while the rest of the page crosses in 200 ms. Your routes are already typed `route` (`web/src/router/index.ts:14-18`), so scoping those three rules to that type puts the header on the flip's crossfade (my sixth question). One timing moves: the class now lands when the crossfade's update runs, a frame after the tap rather than at once, and the `onFlipSettled` hook in `web/src/App.vue:65` still runs once per flip, a frame after the class lands. Safari before 18 and Firefox before 144 have no view transitions, so there the ground and the words take the same 200 ms as a colour change instead.

## The minor with the new springs, sliders and menus

- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, but nobody has timed it on an iPhone yet.
- The configurator's columns and the sidebar's content move on glass's `--spring-panel` (`VisualizationView.vue:1325-1326`, `:1351-1352`). That curve keeps its small overshoot, since glass leaves it for a site's own spatial morph, while glass's own entrances move to `--spring-bloom`, which lands without passing its rest. If you'd like those to land without the overshoot, `--spring-bloom` is the one to point them at.
- With Reduce Motion on, glass's fades and colour changes keep a short clock of 150 ms or less instead of cutting, and nothing travels.
- Your DropdownMenus, the dock's (`AppDock.vue:646`) and the four in `AnimationControls.vue` among them, grow from their button as they do today, and that grow still runs on the page's thread. They leave by fading where they are, on the even exit curve 11.1.1 brings.
- The segmented mark in `EquationModeToggle.vue:59` and the Gallery's tabs (`GalleryView.vue:479`) becomes one capsule that slides, with no lift or stretch, and arrow keys fade it across.
- The scroll progress rim on your dock (`AppDock.vue:785`) reveals its stroke by a sliding window instead of redrawing a clip each frame. It still draws the value you feed it: a scroll follows at once, and a jump of more than a tenth of its length, such as a route's first value, eases over 100 to 150 ms. The custom property your paper spec reads (`web/e2e/f-w14u-paper.spec.ts:205-210`, `--scroll-progress-rim-fill`) goes with the clip; the rim's value stays readable as `aria-valuenow` over `aria-valuemax` on the rim (my fourth question).
- Every Slider grows while it's used: on a press, on Tab, and under a resting mouse after 120 ms. Its track colour grows out by up to 8 px a side and goes back on the same 200 ms. While it's used the root's box doesn't move, and the grown track takes no taps. On a touch screen the slider's box becomes 44 px tall, and the grown track fits inside it. Sliders that have a fill go thumbless by default, so a fill ends in its own rounded cap. All of this reaches the timeline (`FourierTimeline.vue:222`), the strength row (`AnimationControls.vue:294`) and every `SliderControl` mount through `SliderControl.vue:187`: the equation input, the morph controls, `BasisSelector.vue:186` and `:196`, the five in `ContourSettings.vue` (`:297` to `:360`), `EditorControlsDock.vue:121` and `EquationPanel.vue:116`.
- A slider with a small set of steps gets a discrete form: thicker and shorter, with its stops drawn as dots the value snaps to, at a length set by its stop count. The harmonic levels (`HarmonicLevelGrid.vue:10` and `:20`), the editor dock's control and the equation's term count step by whole numbers over small ranges, so the form may reach them, depending on where the design puts the line for a small set (my fifth question). You'll see the design before it's built, and if it isn't ready by this minor's candidate it comes in the minor after.
- If glass's Carousel work lands in time for this minor, the featured carousel's press under Reduce Motion (`GalleryFeaturedCarousel.vue:70`) fades out where it is, lands while hidden and fades back in, 100 ms each way.
- Glass's FourierField starts computing its series through `@mkbabb/fourier`. Thanks for getting 0.1.0 onto npm; it gives the package its first outside user.

## 12.0.0

The dock's fold changes so the glass's edge cuts each seat as it passes, and its per-frame script goes. Nothing fourier imports from glass is removed.

## What I'd like to hear back

Each default below is fixed at the springs-and-sliders minor's release candidate unless another is named beside it.

1. `FourierTimeline.vue:222` is a scrubber the finger already owns, under a stage you pan and pinch, and `SliderControl.vue:187` is the slider behind the equation input (`FunctionInput.vue:208`) and the morph controls (`HarmonicLevelGrid.vue:10` and `:20`, `MorphPhaseConfig.vue:46`). Should both grow while held, or would you set `:expand="false"` on either? Both grow unless you tell me otherwise.
2. Should the timeline's scrubber keep a visible knob once sliders go thumbless? It ends in its fill's cap unless you'd like the knob.
3. Does either slider sit within 8 px of the canvas or the dock, or inside a box that clips its overflow by less than 8 px? I'll take it that neither does unless you say so.
4. Would you move the paper spec's rim check (`f-w14u-paper.spec.ts:205-210`) to `aria-valuenow`? The property it reads goes in this minor, so the check reads nothing until it moves. Does any other test read a slider's painted size while it's held? If one does, I'd like to know before the release candidate goes out so I can send you the new values.
5. If the discrete form reaches the harmonic levels, the editor dock's control or the term count, would you keep any of them as they are? Glass will have a prop for that, and the form ships wherever the design's line puts it unless you name one (the candidate of the minor that carries it).
6. Would you scope the header's three view-transition rules to your `route` type? Until you do, the header takes each flip at once, on its own transitions (the dock-redesign minor's candidate).

Thanks,
Mike
