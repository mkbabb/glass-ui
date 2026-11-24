# To keyframes

Hi,

There are two sides to this one: what keyframes' demo site gains from the next glass-ui releases, and two things I'd like to ask of keyframes.js itself, since glass's springs will lean on it.

**What the site gains.**
- **11.2.0.** The toggle in ChromeDock is redrawn: a warm sun draws its rays in, and a cool night carves the crescent, over 200 ms. Its hover becomes the plate the dock's seats use, and a press is answered by the glyph itself.
- **11.3.0, the springs.** Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, though nobody has timed it on an iPhone yet. By our estimate the curves alone free about 1.5 KB of stylesheet.
- **11.3.0, the sliders.** Your four sliders grow while they're used, without a visible thumb, and the root's box never moves. A slider turns that off with `:expand="false"`.
- **12.0.0.** The dock's fold changes so the glass's edge cuts each seat, and the dock's per-frame script goes. Your detented pane becomes a native scroller that snaps to its heights. On iPhones whose Safari predates 27.3, a pane flicked past its top height can take a moment to settle, and the height it reports changes only once it rests.

You don't need to change anything for any of it.

**What I'd like to ask of keyframes.js.** Anything that carries a speed, like a release, a settle or a mark turned mid-glide, is played as keyframes sampled from the spring, so the browser plays it and no script runs per frame. keyframes.js is the one place spring maths should live.

1. Would you export a sampler that takes a spring (response and damping), a start position and a start speed, and returns keyframe offsets and values to a set tolerance, along with the spring's position and speed at any time, so a retarget can start from where the body is?
2. Would `Draggable` take a follow that writes the pointer's value directly while the finger is down, and starts the spring only at release with the release speed? Glass would seed that speed from your estimator over the last 80 ms.
3. If both suit you, which release would carry them? Glass's 11.3.0 player waits on the sampler.

Thanks,
Mike
