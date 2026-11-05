# Orchestrator note: the `anchor` prop (critique 1, D1)

My ruling is that the dock must not move inside its container. The auto-margin pin was new layout behaviour that the merge invented, and it doesn't work. Fixing it would mean adding more layout, so take it out.

`anchor` keeps the U line's own meaning: it names the edge that stays put while the dock morphs.
- If the measured origin from 10.1.3 already holds that edge, `anchor` feeds the measurement as its tie-breaker or override and does nothing else.
- If `anchor` changes nothing that layout doesn't already determine, say so in its docstring.

The CHANGELOG, README, docstring and MIGRATION text must say exactly that, and nothing more.

The witness: an `anchor="start"` dock and an `anchor="end"` dock each keep that edge fixed through expand and collapse, in Chromium and WebKit. Replace the unit test that only regex-matches the CSS with that witness.
