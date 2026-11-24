# To keyframes

Hi,

This one has two sides: what keyframes' demo site gains from glass's next releases, and two things I'd like to ask of keyframes.js itself, since glass's springs are going to lean on it.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut.

## What the site gains

In the minor that brings the dock redesign, the toggle in `ChromeDock.vue:636` gets its new face: a warm sun whose rays draw in under its disc and a cool night that slides across to carve the crescent, all over 200 ms, crossfading under Reduce Motion. Its hover becomes the flat plate the dock's seats use, and a press is answered by the glyph itself. The `aria-label="Dark mode"` you already set matches the fixed name glass gives it. The same minor brings the seat that stands beside the dock, which is what your /cube page's open dock has been waiting for.

In the minor after that, with the new springs, sliders and menus:

- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, though nobody has timed it on an iPhone yet. By my estimate the curves alone free about 1.5 KB of stylesheet.
- Your four sliders (`LayerConfigPanel.vue:155`, `TransportScrub.vue:10`, `PlaybackRibbon.vue:65`, `SpringPhysicsFacet.vue:144`) grow while they're used, with no visible thumb, and the root's box never moves. A slider turns that off with `:expand="false"`.
- The EasingCatalogue's segmented mark slides as one capsule, the Switch in `LayerConfigPanel.vue` keeps its thumb as the mark of its two seats, and your menus grow from their trigger.

In 12.0.0 the dock's fold changes so the glass's edge cuts each seat, and the dock's per-frame script goes. Your detented pane (`ControlsPaneWrapper.vue`) becomes a native scroller that snaps to its heights. Your store's `isControlsPanelOpen` follows `v-model:detent` (`:197`), which from then on changes when the pane comes to rest rather than mid-drag. On iPhones whose Safari predates 27.3, a pane flicked past its top height can take a moment to settle, and the height it reports waits for that. If /cube's seat stands beside the dock by then, it parts from the dock and joins it again in goo.

You don't need to change anything on the site for any of it.

## What I'd like to ask of keyframes.js

Anything that carries a speed, like a release, a settle or a selection turned mid-glide, will be played as keyframes sampled from the spring, so the browser plays it and no script runs per frame. keyframes.js is where the spring maths should live, and glass won't write a sampler of its own. I read `origin/master` (6.5.0) before asking, and most of the maths is already there.

1. `sampleNormalizedSpring` (`src/animation/physics/spring/solver/sample.ts:75`) already steps the solver from a seeded speed, but it isn't in the package's public barrel (`src/animation/index.ts:54` exports `springTimingFunction`). Would you export a sampler that takes a spring's response and damping, a start position and a start speed, and returns keyframe offsets and values to a tolerance the caller sets, along with the spring's position and speed at any time, so a retarget can start from where the body is?
2. `Draggable` (`src/animation/orchestration/drag/draggable.ts:127`) makes the pointer a live spring target on each move and re-seats the spring from the release speed. Could it take an option that writes the pointer's value straight through while the finger is down, with no spring chasing it, and starts the spring only at release with that speed? Glass would seed the speed from your estimator over the last 80 ms.
3. If both suit you, which keyframes.js release would carry them? Until they ship, glass's single curves go out in the springs-and-sliders minor on their own, and the player that plays a settle with speed waits for your sampler.

Thanks,
Mike
