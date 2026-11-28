# To value.js (color.babb.dev)

Hi,

The design work on glass's next round of motion and surfaces is done, and here's what it brings to color, release by release. Much of it answers what I asked for through you over the past few weeks, so I've tied each part back to the request where I can. I read `origin/master` for the lines below. The demo pins glass at 11.1.0 (`package.json:94`), so each part reaches color when you move that pin to the release that carries it, and apart from the questions at the end, that's all I'm asking of you.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut. From your four-site dock study, the dock width that glides on a transform, the tooltip prop on DockControl and DockTrigger, the hover-only option on the provider, and the theme seat with the main dock held where it is all ride the minor that brings the dock redesign; the rest of that list is in 11.1.2, apart from the one item that's fourier's own. The WebKit crash that keyframes and color found on the nested colour tokens is the first fix in 11.1.2, and every colour below mixes one level deep. The two things I asked of color's hero Blob and its "Colors" count are in the springs-and-sliders minor, below.

## The minor that brings the dock redesign

Every dock seat's hover becomes a flat plate in the seat's own tone, at 6.5 % in light and 5 % in dark, with the current seat at 10 %, and the glyph keeps its colour on hover. You don't need to change anything for it.

Glass's dark-mode toggle gets a new face after daraksha's, less ornate and in colour, and a theme change glass starts becomes one 200 ms crossfade of the whole page rather than a flip in one frame. color doesn't mount glass's toggle: your theme is the "Dark mode" checkbox row in `demo/shell/dock/menus/ProfileSection.vue:248` and `MobileMenuDropdown.vue:157`, so the new face only reaches color if you put a toggle in the dock. The same minor gives the theme seat a small round dock of its own, which a page places in a corner on the main dock's baseline. Glass doesn't couple the two docks in this minor, so the main dock stays anchored where it is rather than re-centring with a pair. The pull-apart and join I described on 12 November come in 12.0.0, below.

## The minor with the new springs, sliders and menus

- Every Slider grows while it's used, on a phone and on a desktop: on a press, on Tab, and under a resting mouse after 120 ms. That's the expanded view I asked to keep, refined after the ChatGPT app. Its own track grows out round the fill by up to 8 px a side and goes back over the same 200 ms, and while it's used the root's box doesn't move. On a touch screen the slider's own box becomes 44 px tall. With Reduce Motion on, the grown track fades in where it stands instead of growing. It reaches all six of your sliders: the channel sliders (`ComponentSliders.vue:63`), `ConfigSliderPane.vue:217`, the two in `ExtractControls.vue` (`:48` and `:77`), `GenerateControls.vue:366` and `GradientVisualizer.vue:313`.
- Sliders are thumbless by default, as I asked. Your thumb token at `demo/styles/foundation.css:499` already paints the knob in the fill's colour, so the change reads as the fill's own rounded end.
- Your channel sliders' track is a ramp (`ComponentSliders.vue:237`), so the ramp stays on the track's own box, where each colour still lines up with its value, and the grown margin round it is left clear. The spectrum variant takes the same rules.
- A slider with a small set of steps gets a discrete form, after my note on your "Colors" count: thicker and shorter, with its stops drawn as dots the value snaps to. It's designed in this minor and I'll show it to you before it's built; `GenerateControls.vue:366` and Extract's twin are where I'll check it.
- The Blob on your hero gets a fuller body, larger satellites and calmer motion as its defaults, once 11.1.2 has measured the jitter I saw. Values your hero sets itself stay yours.
- The mark under SegmentedTabs (`MixSourceSelector.vue:147`, `AdminNamesPanel.vue:28`) becomes one capsule that slides, with no lift or stretch, and arrow keys fade it across. Your DockLayerGroup hides its switcher (`Dock.vue:305`), so nothing changes there.
- Menus grow from their trigger. The finger slide on a phone is something a menu turns on, off by default, so none of your menus changes.
- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread in every version glass supports, though nobody has timed it on an iPhone yet. A menu's grow and a slider's growing track still run on the page's thread, each in 370 ms or less.
- By my estimate color's stylesheet shrinks by about 1.2 KB and its first-load script by about 0.8 KB, with about 1 KB loading later on a first touch. Each figure is for a part on its own, so your build is what closes them.

## 12.0.0

The seat beside the dock parts from it and joins it again in goo, the metaball pull-apart I described, if it ships: it's built for Safari, on a dock that samples no backdrop, and it ships only if the neck between the two shows for long enough to be seen and its cost per frame holds. Glass draws it with an SVG filter over the dock and the seat while they part or join and through the folded rest. While the filter is on the fold is painted on the page's thread, so a busy page can slow it, and I'll have it timed before it ships. It loads only with a dock that has a seat beside it. The fold also changes so the glass's edge cuts each seat as it passes. DockLayerGroup's switcher leaves, since no site shows it, so you can drop the `:show-switcher="false"` at `Dock.vue:305` then. Nothing else color imports from glass is removed in 12.0.0.

## What I'd like to know

Each default below is fixed at the release candidate named beside it.

1. Would you like the grown margin round a channel slider's ramp to carry the ramp's two end colours instead of staying clear? It stays clear unless you'd rather have the ends (the springs-and-sliders minor's candidate).
2. Does any slider of yours want a visible knob, which would then grow by scale while held? They all ship thumbless unless you name one (the same candidate).
3. Will color move its dark-mode control out of the two menus into a dock of its own once the redesign ships, and into the seat that joins the dock in 12.0.0? Until you do, your theme stays where it is, and nothing of the goo loads on color (12.0.0's candidate).

Thanks,
Mike
