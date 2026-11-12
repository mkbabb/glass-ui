# Orchestrator note, round 6

These are rulings on the gaps that fix 6 left open.

1. **The vertical run yields too.** "A run that hides nothing has nothing to scroll" holds on both axes. The vertical run's reserves yield the same way the horizontal run's do, through the same single mechanism. A vertical run whose seats fit the port must report `sh == ch` in both engines.
2. **The hover-overhang bound is accepted, within limits.** At 320 coarse, a focused label tab that is also hovered loses 1-4 px of hover ink. Touch has no hover state, so that combination does not happen in use, and the bound is accepted for a coarse pointer. On a fine pointer, the e4 capped docks lose 1.5-1.7 px. That is also accepted, provided the focus ring itself stays whole. Record both bounds in the round's records and leave them out of the CHANGELOG.
3. **O-157 is in scope** (`inbound-O-157.md`). The next critic reproduces it, and the next fix cures it.
4. **The RTL reach sign and the known flakes stay as recorded.** They are not 10.1.5 regressions.
