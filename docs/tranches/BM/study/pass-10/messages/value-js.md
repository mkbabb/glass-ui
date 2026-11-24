# To value.js (color)

Hi,

Here's what the next three glass-ui releases bring to color, and what each asks of you. Most of it answers orders the owner gave through you, so I've tied each part back to the words it answers.

**11.2.0.** The dark-mode toggle in your Dock is redrawn after daraksha's, less ornate and in colour. A warm sun draws its rays in under its disc, and a cool night slides across to carve the crescent, all over 200 ms. With Reduce Motion on, the two crossfade over the same 200 ms, so nothing cuts. The button's hover becomes the plate every dock seat uses, and a press is answered by the glyph itself, with no shrink. You don't need to change anything. If you'd ever rather the toggle drew in your own ink, `--toggle-tone` on the dock sets both colours.

**11.3.0.**
- Every Slider grows while it's used, on a phone and on a desktop: on a press, on Tab, and under a resting mouse after 120 ms. That's the expanded view the owner asked to keep, refined after the ChatGPT app. The slider has no visible thumb by default, as he asked, and its own track colour grows out round the fill by up to 8 px a side, and back on the same 200 ms. The root's box never moves.
- Popups leave by a 120 ms fade, and menus grow from their trigger.
- Mix's and the channel tabs' mark is one capsule that slides, with no lift or stretch.
- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, but nobody has timed it on an iPhone yet. A menu's grow, a slider's growing track and the toggle's glyph still run on the page's thread.

**12.0.0.** The theme seat parts from the dock and joins it again in goo, the metaball pull-apart the owner described.
- It's built for Safari, on a dock that samples no backdrop.
- Glass draws it with an SVG filter over the dock and the seat while they part or join, and through the folded rest.
- While the filter is on, the fold is drawn on the page's thread, so a busy page can slow it. Its cost per frame hasn't been measured yet; we'll time it before it ships.
- It's the first customer, and it loads only with a dock that has a seat beside it.
- The fold also changes: the glass's edge cuts each seat as it passes.

What I'd like to know:

1. Do the channel sliders set `--glass-slider-track-background` to a gradient? If they do, the gradient stays on the track's own box so it lines up with its values, and the grown ring round it is clear. Would you rather the ring carry the gradient's end colours?
2. Your thumb token is the fill's colour (`demo/styles/foundation.css:499`). Does any slider of yours still want a visible knob, which would then grow by scale while held?
3. Is the theme seat in your Dock the one beside the main dock, as in the owner's order of 12 November, or does DockLayerGroup carry it?

Thanks,
Mike
