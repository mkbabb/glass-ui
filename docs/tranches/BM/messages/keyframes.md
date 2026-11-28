# To keyframes

Hi,

This one has two sides: what keyframes' demo site gains from glass's next releases, and two things I'd like to ask of keyframes.js itself, since glass's springs are going to lean on it. I read `origin/master`, with kf47 merged, for the lines below. The demo pins glass at 11.1.0 (`package.json:80`), so the site gains each part when you move that pin to the release that carries it.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut. Thank you, too, for the WebKit crash you and color caught on glass's nested colour tokens: flattening them is the first fix in 11.1.2, and every colour below mixes one level deep.

## What the site gains

In the minor that brings the dock redesign, the toggle in `ChromeDock.vue:641` gets its new face: a warm sun whose rays draw in under its disc and a cool night that slides across to carve the crescent, all starting together over 200 ms. Its hover becomes the plate the dock's seats use, growing out from just inside the button, and a press is answered by the glyph itself. The `aria-label="Dark mode"` you already set matches the fixed name glass gives it. The theme change value.js filmed on your site, where the ground and the plate flip in one frame while the words ease, becomes one 200 ms crossfade of the whole page, with the glyph tweening above it; under Reduce Motion the glyph stays still and the crossfade runs 150 ms. The same minor brings a small round controls dock that a page places in a corner on the main dock's baseline, so the toggle can move out of /cube's open dock, which is what it needs to fit at 390.

In the minor with the new springs, sliders and menus:

- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, though nobody has timed it on an iPhone yet. By my estimate the curves alone free about 1.5 KB of stylesheet.
- Your four sliders (`LayerConfigPanel.vue:155`, `TransportScrub.vue:10`, `PlaybackRibbon.vue:65`, `SpringPhysicsFacet.vue:144`) grow while they're used, with no visible thumb, and while they're used the root's box doesn't move. On a touch screen each slider's own box becomes 44 px tall, the finger-size target, so the transport row and the ribbon are taller on a phone than they are today. A slider turns the growth off with `:expand="false"`.
- The EasingCatalogue's segmented mark (`EasingCatalogue.vue:42`) slides as one capsule, the Switch in `LayerConfigPanel.vue:193` keeps its thumb as the mark of its two seats, and your menus grow from their trigger.

In 12.0.0 the dock's fold changes so the glass's edge cuts each seat, and the dock's per-frame script goes. Your detented pane (`ControlsPaneWrapper.vue:254`) becomes a native scroller that snaps to its heights. Your store's `isControlsPanelOpen` rides its `v-model:detent` (the note at `:197`), which from then on changes when the pane comes to rest rather than mid-drag. On iPhones whose Safari predates 27.3, a pane flicked past its top height can take a moment to settle, and the height it reports waits for that. If /cube's seat stands beside the dock by then, it parts from the dock and joins it again in goo, provided the goo ships: it does only if the neck between the two shows for long enough to be seen and its cost per frame holds on that dock.

Beyond moving the pin, you don't need to change anything on the site for any of it.

## What I'd like to ask of keyframes.js

Anything that carries a speed, like a release, a settle or a selection turned mid-glide, will be played as keyframes sampled from the spring, so the browser plays it and no script runs per frame. They have to be keyframes rather than a `linear()` easing, because Safari's compositor takes a `linear()` only from 27.3. keyframes.js is where the spring maths should live, and glass won't write a sampler of its own. I read 6.5.0 before asking, and most of it is already there: `SpringProgress` (exported in `src/animation/index.ts:37`) steps a spring from any position and speed, `springLinearStops` and `springTimingLUT` (`:52`, `:57`) take an `initialVelocity`, and `sampleNormalizedSpring` (`src/animation/physics/spring/solver/sample.ts:75`) is the seeded step loop they share.

1. Would you export one function that takes a spring's response and damping, a start position, a target and a start speed, and returns keyframe offsets and values to a tolerance the caller sets, rather than at even steps, along with the spring's position and speed at any time, so a retarget can start from where the body is?
2. `Draggable` (`src/animation/orchestration/drag/draggable.ts:127`) makes the pointer a live spring target on each move and re-seats the spring from the release speed. Could it take an option that writes the pointer's value straight through while the finger is down, with no spring chasing it, and starts the spring only at release with that speed? Glass would seed the speed from your estimator with `velocityWindow` set to 80 ms, a little shorter than its 100 ms default, so a flick reads as the flick it ended with.
3. If both suit you, which keyframes.js release would carry them? Until they ship, glass's single curves go out in the springs-and-sliders minor on their own, and the parts that need a settle with speed, the sliding selection mark among them, wait for your sampler.

## About the site

4. Should `TransportScrub` and `PlaybackRibbon` keep a visible knob? They go thumbless unless you say so by the springs-and-sliders minor's release candidate.

Thanks,
Mike
