# To value.js (color.babb.dev)

Hi,

The design work on glass's next round of motion and surfaces is done, and here's what it brings to color, release by release. Much of it answers what I asked for through you over the past few weeks, so I've tied each part back to the request where I can. I read `origin/master` for the lines below.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut. From your four-site dock study, the dock width that glides on a transform, the tooltip prop on DockControl and DockTrigger, the hover-only option on the provider, and the seat that stands beside the dock all ride the minor that brings the dock redesign; the rest of that list is in 11.1.2, apart from the one item that's fourier's own. The WebKit crash that keyframes and color found on the nested colour tokens is the first fix in 11.1.2, and every colour below mixes one level deep.

## The minor that brings the dock redesign

Every dock seat's hover becomes a flat plate in the seat's own tone, at 6.5 % in light and 5 % in dark, with the current seat at 10 %, and the glyph keeps its colour on hover. You don't need to change anything for it.

Glass's dark-mode toggle gets a new face after daraksha's, less ornate and in colour, but color doesn't mount glass's toggle. Your theme is the "Dark mode" checkbox row in `demo/shell/dock/menus/ProfileSection.vue:248` and `MobileMenuDropdown.vue:157`, so the new face only reaches color if you put a toggle in the dock. The same minor brings the seat beside the dock that I asked for on 12 November: the toggle in its own round dock to the right of the main one, with the main dock anchored where it is rather than re-centred with the pair.

## The minor with the new springs, sliders and menus

- Every Slider grows while it's used, on a phone and on a desktop: on a press, on Tab, and under a resting mouse after 120 ms. That's the expanded view I asked to keep, refined after the ChatGPT app. Its own track grows out round the fill by up to 8 px a side and goes back over the same 200 ms, and the root's box never moves. It reaches all six of your sliders: the channel sliders (`ComponentSliders.vue:63`), `ConfigSliderPane.vue:217`, the two in `ExtractControls.vue` (`:48` and `:77`), `GenerateControls.vue:366` and `GradientVisualizer.vue:313`.
- Sliders are thumbless by default, as I asked. Your thumb token at `demo/styles/foundation.css:499` already paints the knob in the fill's colour, so the change reads as the fill's own rounded end.
- Your channel sliders' track is a ramp (`ComponentSliders.vue:237`), so the ramp stays on the track's own box, where each colour still lines up with its value, and the grown margin round it is left clear. The spectrum variant takes the same rules.
- The mark under SegmentedTabs (`MixSourceSelector.vue:147`, `AdminNamesPanel.vue:28`) becomes one capsule that slides, with no lift or stretch, and arrow keys fade it across. Your DockLayerGroup hides its switcher (`Dock.vue:305`), so nothing changes there.
- Menus grow from their trigger, and a finger can press, slide and lift on a row of a short menu on a phone. Your long menus don't get the slide, and a row the finger only passes over never fires.
- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread in every version glass supports, though nobody has timed it on an iPhone yet. A menu's grow and a slider's growing track still run on the page's thread, each in 370 ms or less.
- By my estimate color's stylesheet shrinks by about 1.2 KB and its first-load script by about 0.8 KB, with about 1 KB loading later on a first touch. Each figure is for a part on its own, so your build is what closes them.

## 12.0.0

The seat beside the dock parts from it and joins it again in goo, the metaball pull-apart I described. It's built for Safari, on a dock that samples no backdrop, and glass draws it with an SVG filter over the dock and the seat while they part or join and through the folded rest. While the filter is on the fold is painted on the page's thread, so a busy page can slow it, and its cost per frame hasn't been measured yet; I'll have it timed before it ships. It loads only with a dock that has a seat beside it. The fold also changes so the glass's edge cuts each seat as it passes. Nothing color imports from glass is removed in 12.0.0.

## What I'd like to know

1. Would you like the grown margin round a channel slider's ramp to carry the ramp's two end colours instead of staying clear? It stays clear unless you'd rather have the ends.
2. Does any slider of yours want a visible knob, which would then grow by scale while held? They all ship thumbless unless you name one.
3. Will color move its dark-mode control out of the two menus and into the seat beside the dock once the redesign ships? Until you do, your theme stays where it is, and nothing of the goo loads on color.

Thanks,
Mike
