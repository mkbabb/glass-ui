# To fourier

Hi,

I wanted to tell you what the next three glass-ui releases change on fourier, and to ask about your timeline.

**11.2.0.** The dark-mode toggle is redrawn, a warm sun and a cool night over 200 ms, and every plate's hover takes its control's own tone. Nothing for you to change.

**11.3.0.**
- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, but nobody has timed it on an iPhone yet.
- The layers menu, which is glass's DropdownMenu, grows from its button as it does today, and that grow still runs on the page's thread. It leaves by a 120 ms fade.
- The Controls and Canvas tabs' mark is one capsule that slides.
- The scroll progress rim reveals its stroke by a sliding window rather than redrawing a clip each frame.
- Every Slider grows while it's used: on a press, on Tab, and under a resting mouse after 120 ms. Its track colour grows out by up to 8 px a side and back on the same 200 ms. The root's box never moves, and the grown track takes no taps. A slider turns this off with `:expand="false"`.
- Under Reduce Motion the carousel's press dips: it fades out where it is, lands while hidden, and fades in, 100 ms each way.

**12.0.0.** The dock's fold changes so the glass's edge cuts each seat as it passes, and its per-frame script goes.

Questions:

1. FourierTimeline (`FourierTimeline.vue:293`) is a scrubber the finger already owns, under a stage you pan and pinch. Should it grow while held, or would you set `:expand="false"` there? The same goes for SliderControl (`SliderControl.vue:272`).
2. Does either slider sit within 8 px of the canvas or a dock, or inside a box that clips its overflow by less than 8 px?
3. Does any test read a slider's painted size while it's held, or the rim's clip?

Thanks,
Mike
