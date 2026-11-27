# To atlas (sci-report)

Hi,

I've finished the design work on glass's next round of motion and surfaces, and I wanted to walk you through what it brings to atlas, release by release, and what I'd like to hear back. I held all of it to the bounds you sent: no box moves on hover, open or fold, nothing new runs at mount on /sci, Safari gets the same parts Chromium does, and keyboard focus, `aria-selected` and VoiceOver order stay as they are.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number the day it's cut. 11.1.1 and 11.1.2 carry the fixes from your lists, your dropdown films among them, and they're separate from this note. The first minor after 11.1.2 carries your DataTable asks and the Dialog that grows from the button that opened it; nothing below changes either of them. Everything here reaches atlas once its peer range (`^10.1.0`, `package.json:118`) and dev pin (`:147`) move to 11, and the dashboards once their pin (`dashboards/package.json:17`, `10.1.0`) does. I read `u/s24-atlas` and `u/s24-sci` for the lines below.

## The minor that brings the dock redesign

Glass's dark-mode toggle gets a new face, in colour. It's a warm amber sun whose rays draw in under its disc, and then a cool indigo night slides across to carve the crescent, the rays, the night and the colour all on one 200 ms clock. With Reduce Motion on, the rays and the night crossfade over the same 200 ms, so nothing cuts. `DockThemeToggle.vue:29` mounts glass's toggle, so the new face reaches `Dock.vue:631`, `:717` and `DockFoot.vue:61` with no change from you. Since `disableTransitions` defaults to true there (`DockThemeToggle.vue:12`), your page still flips its colours in one step, as you chose, while the glyph keeps its tween.

The toggle's hover becomes the same flat plate the dock's seats use, and a press is answered by the glyph alone, with no shrink. In dark mode it rests unfilled, as it does today, so it never reads as a second current seat in your docks. Every seat's hover plate takes the seat's own tone at 6.5 % in light and 5 % in dark, and the current seat sits at 10 %. The glyph keeps its colour on hover.

## The minor with the new springs, sliders and menus

- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread in every version glass supports, though nobody has timed it on an iPhone yet. Three things still run on the page's thread, each in 370 ms or less: a menu's grow from its button, a slider's growing track, and the toggle's glyph.
- The selection mark under SegmentedTabs becomes one capsule that slides, at its option's size, with no lift and no stretch, and arrow keys fade it across instead of sliding it. In atlas that's `YearScrubber.vue:213`; in the dashboards it's the five filter strips, `EcfFilter.vue:218` and `:298`, `ConsultantFilter.vue:64` and `:79`, and `UsfFilter.vue:79`.
- Under forced colours and more contrast, today's rule draws a 2 px border on the chosen tab, and a three-tab strip's boxes shift by 8 px when the choice moves to the widest tab. From this minor the sign is drawn on the mark itself, so no box moves in either mode.
- Every Slider grows while it's used: on a press, on Tab, and under a resting mouse after 120 ms. Its own track colour grows out by up to 8 px on each side and goes back on the same 200 ms. The root's box never changes and the grown track takes no taps, so a tap meant for a neighbour still reaches it. On a touch screen the slider's own box becomes 44 px tall, the finger-size target you asked for, and the grown track fits inside it; the target adds nothing to the scrollable width of the filter body around it. That covers `RangeFacet.vue:62` and the five sci filters (`DemandFilter.vue:63`, `EcfFilter.vue:366` and `:383`, `SciFilter.vue:189`, `UsfFilter.vue:100`). A slider turns the growth off with `:expand="false"`.
- Sliders are thumbless by default from this minor, so a slider's fill ends in its own rounded cap and that cap is what the finger pulls.
- The phone section menu, the `cell` form of `DockSectionSelect.vue:117`, gains a finger slide: press, slide along the rows and lift on the one you want. A row the finger only passes over never fires. Its code loads on the menu's first touch.
- The dock's scroll progress line (`DockProgressRim.vue:20`) reveals its stroke by a sliding window rather than redrawing a clip on each frame.
- Nothing atlas calls is removed in this minor.

## 12.0.0

The dock's fold changes so the glass's edge cuts each seat as it passes and nothing fades but the first seat trading with the folded glyph. Your two detented sheets, `FilterPanel.vue:471` and `EntityDetail.vue:405`, become native scrollers that snap to their heights, and `v-model:detent` changes once the sheet comes to rest. On iPhones whose Safari predates 27.3, a sheet flicked past its top height can take a moment to settle, and the height it reports waits for that. None of the composables 12.0.0 removes is imported in atlas or the dashboards (the `useScrollChrome` in `Dock.vue:64` is atlas's own and stays yours), and none of your figure docks has a seat beside it, so the goo that joins a seat to its dock never loads for you.

## What I'd like to hear back

I read your sheets before writing this, and both sit in non-modal Dialogs (`FilterPanel.vue:470` and `EntityDetail.vue:404`), so I've left that question out. Here's what's still open, with what ships if I don't hear from you.

1. Does any of those sliders sit within 8 px of something its grown track would cover on a desktop, or inside a box that clips its overflow by less than 8 px? If I don't hear otherwise, the growth stays on everywhere, and you'd set `:expand="false"` where it gets in the way.
2. `RangeFacet` is a two-value slider, so its two rounded ends become the grips once sliders go thumbless. Would you like it to keep its two knobs instead? It goes thumbless unless you say so.
3. Does `npm run check:boxes`, or any other suite, read a slider's painted size while it's held, or a strip's tab boxes under forced colours? I'll send you the minor's release candidate either way, and I'd be grateful if you could run your box-identity suites on it.
4. The finger slide reads the section list's height once each time the menu opens on a phone. Would that read show up in the /sci budget your suites hold at 390? It ships reading once per open unless you tell me it costs you.
5. Does any suite read a sheet panel's box while it's being dragged, and does any page set `--sheet-enter-skew`? The detent changes only at rest, and the skew stays at 0, unless you tell me something depends on either.
6. The new toggle carries its own colour, and you hold to one focal colour per page. Would you like your docks to keep the amber and indigo, or to set `--toggle-tone` on the dock so the toggle draws in your ink? The coloured toggle ships unless you'd rather have your ink.

Thanks,
Mike
