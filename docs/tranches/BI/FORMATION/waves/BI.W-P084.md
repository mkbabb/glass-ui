# BI.W-P084 — PaperBackdrop apotheosis

**Status:** DONE

`PaperBackdrop` is a thin semantic mount over the global `paper-underpaint` content-field
recipe. It owns no material CSS and no per-instance opacity or frequency fork; route context
flows through the shared paper variables.

The story now demonstrates the one field across light, dark, long-content, print, and
reduced-transparency contexts rather than manufacturing local texture variants.

Verification owner: component smoke/public-surface tests, both typechecks, and the native
browser specimen when the in-app browser runtime is available.
