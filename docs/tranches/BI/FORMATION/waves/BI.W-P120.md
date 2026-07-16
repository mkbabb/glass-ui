# BI.W-P120 — Timeline

**Status:** DONE

## Shipped contract

`Timeline` retains one component family with horizontal, vertical, and scrubber presentations.

- Discrete markers are native buttons with the current step exposed through `aria-current="step"`.
- The scrubber exposes its value, bounds, and human-readable step text through native slider semantics.
- Arrow, Home, and End keyboard paths share the same clamped value authority.
- Continuous structural progress and discrete selected-step state stay separate.
- Styling and interaction remain local to Timeline; no duplicate playback or motion engine was introduced.

## Evidence

The focused Timeline contract tests cover marker semantics, scrubber value text, boundary keys, continuous structure, and reduced-motion behavior.
