# To daraksha

Hi,

Here's what the next glass-ui releases bring to daraksha, held to your budget. The reader route sits at 125.3 of its 126 KB, and the whole site has about 6 KB free.

**11.2.0.** Glass's own dark-mode toggle now follows your toggle's grammar, with fewer parts and its own glyph: a sun draws its rays in under its disc, and a night disc slides across to carve the crescent. Your ThemeControl stays yours, and nothing changes for you.

**11.3.0.**
- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, though nobody has timed it on an iPhone yet.
- By our estimate the curves free about 1.2 KB of stylesheet on every route. The small player that carries a release's speed loads on the first touch, so the reader route's eager script falls by about 0.8 KB. These are figures for each part alone, so your build closes them at the release candidate.
- Your transport slider grows while it's held, and it grows in its own gold: the groove you set at `gilt.css:60` is the colour that grows, by up to 8 px a side, and back on the same 200 ms. Your knob grows by scale to the band's height plus that margin. The root's box never moves, and the grown track takes no taps. With Reduce Motion on, nothing grows; the value fades in and the focus ring sits 2 px from the band.

**12.0.0.** Glass takes over the seat's pull-apart.
- The theme seat parts from the dock and joins it in goo, drawn by an SVG filter while they part or join and through the folded rest.
- It's built for Safari, on a dock that samples no backdrop. While the filter is on, the fold is drawn on the page's thread, and its cost per frame hasn't been measured yet; we'll time it before it ships.
- It adds about 0.5 KB, loaded only with a dock that has a seat beside it.
- When you adopt it, SiteDock can drop its own neck, the mirror script and the `.fission` rules, which come to up to 2 KB at `SiteDock.vue:68-137`, `:468-584` and `:280-292`. You'd keep whatever of `keepOpen("grasp")` you still need.

What I need from you:

1. The WebKit crash in occasion mode is still open on our side. Could you send the steps that reproduce it, the page, and the Safari or WebKit version it crashes in? I'd like to check every new glass part against it before 11.3.0, and I can't call the slider or the toggle safe in occasion mode until then.
2. Does the transport's gold reading as it grows on the gilt look right to you, or should the grown margin be quieter than the groove?
3. Your seat becomes a pill with its "i" on a page. Should the pill come out of the disc at the disc's width and widen as it leaves, or would you rather the "i" fade in after the seat lands?

Thanks,
Mike
