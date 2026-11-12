# Slider — the brief

The owner, three times, in his words:

- 2026-11-11: "sliders likely need a expanded granular view re-write, with popup animation that enlarges the slider to interact with it, animating in and out, and shrinking when not interacting with it."
- 2026-11-12 09:40 (frame `owner/daraksha-refine-view-2026-11-12.png`): "the granular tap to refine view with glass-ui needs to be more rounded, well-defined, and re-designed." And the fill should be "the color of the name text, not so grayed out".
- 2026-11-12 11:50 (frame `owner/daraksha-name-transport-2026-11-12.png`): "the granular UI sldier from glass-ui is not rounded properly--study the chatgpt app's screenshots and ios27 items for more information. Think of it again from first principles in glass-ui."

What the second frame shows, on glass 11.0.1: the fill is taller than the track; the fill's right end is a round cap that overhangs the track; the thumb sits inside that cap and is not concentric with it; the track's end is a different radius.

The laws that bind (docs/precepts): every change is tweened from its beginning to its end (motion-canon P0); intent first (affordance-map); "NO overuse of shading, transition, or markup--this is an AI smell. Have touch like apple." (restraint). Safari-compatible techniques, compositor properties, no layout per frame.

Rows: O-254, O-280, O-273 (`--slider-thumb-bg`), O-267 (forced-colors focus, cured in 11.0.2), O-236 (keep reka's hidden form input), O-253 (haptic detents later). First felt on color.babb.dev's L / C / h / α console, the keyframes controls, daraksha's Name transport, fourier.

What is wanted: one geometry law (track, fill and thumb in one height system, ends concentric at every value, 0 and 100 included, both orientations, every size), and an expanded view that is a designed, rounded, clearly bounded surface of its own, growing from the compact slider and shrinking back, start to stop. The geometry cure ships as a patch if it changes no API; the expanded view is additive in 11.2.0.

## Added 2026-11-12 12:05 (owner, on keyframes.babb.dev, 11.0.1)

Frame `owner/keyframes-scrubber-thumb-2026-11-12.png`: a dark thumb disc noticeably smaller than the fill's height, sitting inside the fill's round end. His words: "the glass-ui slider thumb should be more filled to the slider, taking up the full height".

So the geometry law is fixed on this point: the thumb's diameter equals the track and fill height, and it is concentric with the fill's end cap. The measure, design, prototype and challenge seats all read this section.
