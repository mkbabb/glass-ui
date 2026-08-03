# Primary-source research applied to the addendum

- [CSS Scroll-driven Animations Level 1](https://www.w3.org/TR/scroll-animations-1/) supports named
  scroll/view timelines and informs the one-scroll-root, compositor-first scroll director.
- [CSS View Transitions Level 1](https://www.w3.org/TR/css-view-transitions-1/) supports the typed
  route grammar and the rule that one dominant shared object carries descend/ascend.
- [WCAG 2.2: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
  informs PRM parity for non-essential triggered motion.
- [WCAG 2.2: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
  bounds persistent ambient movement and prevents “breath of life” from becoming compulsory distraction:
  nonessential automatic beside-content motion gets the finite exception only when it ends within five
  seconds; otherwise it needs pause/stop/hide, and auto-updating information has no such exception.
- [WebKit features in Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/),
  [Safari 26.4](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/), and
  [Safari 26.5](https://webkit.org/blog/17938/webkit-features-for-safari-26-5/) ground the current
  scroll-timeline and backdrop-filter/WebKit evidence rather than assuming Chromium parity.
- [Apple HIG: Motion](https://developer.apple.com/design/human-interface-guidelines/motion) supports
  purposeful, brief, state-preserving motion and separately emphasizes touch response; it does not
  license constant spectacle or repeated idle motion.
- [Apple HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
  distinguishes semantic material thickness and vibrancy. That supports contextual transmission and
  legibility floors, not bright opaque fills decorated with a highlight.
- [WebKit's scroll-driven animation guide](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/)
  supplies the implementation vocabulary for content-named scroll beats. Safari 26.4's threaded
  compositor path and Safari 26.5's paused-animation, endpoint, and BFCache fixes make current WebKit
  capture mandatory rather than a Chromium-only inference.
- [WebKit's Safari 18.2 release](https://webkit.org/blog/16301/webkit-features-in-safari-18-2/)
  records cross-document View Transitions, while
  [Interop 2026](https://webkit.org/blog/17818/announcing-interop-2026/) keeps View Transitions an
  active interoperability focus. Shared-object continuity therefore stays progressive: the source
  and destination must remain truthful when the transition is absent or interrupted.

The standards support progressive, semantic motion. They do not justify nested scrollports, JS motion
fallbacks, engine-specific glass recipes, or animation as the only carrier of state. Safari support
is not a reason to animate blur radii: the retained IOS27 measurements still favor fixed masked blur
layers whose opacity/transform changes, with runtime paint evidence deciding any refraction path.
