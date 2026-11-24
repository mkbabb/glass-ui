# To daraksha

Hi,

Here's what glass's next releases bring to daraksha, held to your budget: the reader route sits at 125.3 of its 126 KB of eager script, and the whole site has about 6 KB free. I read `b13` before writing, so the lines below are from there.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut.

## The minor that brings the dock redesign

Every dock seat's hover becomes a flat plate in the seat's own tone, at 6.5 % in light and 5 % in dark, with the current seat at 10 %, and the glyph keeps its colour.

Glass's own dark-mode toggle now follows your ThemeControl's grammar with fewer parts and a glyph of its own: a sun draws its rays in under its disc, and a night slides across to carve the crescent. I took the idea and none of its assets, and your ThemeControl stays yours.

This minor also brings the seat that stands beside the dock, anchored, which is what `SiteDock.vue` has been waiting for: its split is marked "REMOVE AT GLASS 11.2.0" (the script at `:70-137`, the seat and its neck at `:280-292`, the `.fission` rules at `:468-584`). The seat in this minor sits beside the dock and doesn't part from it or join it in goo, because glass draws no split on frosted chrome. The goo comes in 12.0.0, on the dock that samples no backdrop. So you have a choice of when to move, which I've put as a question below.

## The minor after that, with the new springs and sliders

- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, though nobody has timed it on an iPhone yet.
- By my estimate this minor leaves every route about 1.2 KB lighter in stylesheet, most of it from the curves. The small player that carries a release's speed loads on the first touch, and with the minor's other script changes the reader route's eager script falls by about 0.8 KB. Each is a figure for one part alone, so your `scripts/check-budget.mjs` is what closes them on the release candidate.
- Your two scrubbers (`src/name/NameDock.vue:116` and `src/portraits/PortraitsDock.vue:79`) grow while they're held, in their own gold. The groove you set at `src/gilt/gilt.css:60` is the colour that grows, by up to 8 px a side, and back over the same 200 ms. The root's box never moves, and the grown track takes no taps. With Reduce Motion on, nothing grows: the value fades in and the focus ring sits 2 px from the band.
- Sliders go thumbless by default in this minor. Your scrubbers show a knob today because `gilt.css:58` and `:65` give it a colour, and from this minor they'd end in the gold fill's rounded cap instead, unless you ask for the knob.

## 12.0.0

Glass takes over the seat's pull-apart. The theme seat parts from the dock and joins it in goo, drawn by an SVG filter while they part or join and through the folded rest. While the filter is on, the fold is painted on the page's thread, and its cost per frame hasn't been measured yet; I'll have it timed before it ships. It adds about 0.5 KB, loaded only with a dock that has a seat beside it. When you adopt it, `SiteDock.vue` can drop the neck, the mirror script and the `.fission` rules at the lines above, which come to up to 2 KB, and keep whatever of `keepOpen("grasp")` (`:129`) you still need.

## What I need from you

1. The WebKit crash in occasion mode is still open on my side. Could you send the steps that reproduce it, the page it happens on, and the Safari or WebKit version it crashes in? I'd like to run every new glass part against it before the springs-and-sliders minor ships, and until I can, I won't call the slider or the toggle safe in occasion mode.
2. Does the gold reading as it grows on the gilt look right to you, or should the grown margin be quieter than the groove? The groove's own gold grows unless you'd like it quieter.
3. Would you like the scrubbers to keep their knob? They go thumbless unless you say so.
4. Your seat becomes a pill with its "i" beside the khatam on a page that has one (`SiteDock.vue:286`). Should the pill come out of the disc at the disc's width and widen as it leaves, or would you rather the "i" fade in after the seat lands? It leaves at the disc's width and widens unless you'd prefer the fade.
5. Since I asked for the goo, I'd rather you kept your own split until 12.0.0 and moved ThemeControl into glass's seat then. Would that suit you, or would you rather move into the seat with the dock redesign and go without the neck until 12.0.0? Your split stays until 12.0.0 unless you tell me otherwise.

Thanks,
Mike
