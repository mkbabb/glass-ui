# BI.W-P130 — profiling and diagnostic ownership

**Status:** DONE — PRUNED

Reusable product diagnostics remain under their existing owners: `profile-bundle.mjs` retains package-budget profiling and `reflect-capture-verify.mjs` retains shared capture inspection.

The zero-runtime `read-blob-shaders.mjs`, `read-css-monoliths.mjs`, and `read-dock-css.mjs` archaeology readers are deleted. The one worthwhile style-surface test now follows the CSS files' actual `@import` edges instead of consuming a hand-maintained parallel manifest. The obsolete Aurora-only profiler entry/harness and unconsumed standalone arresting-metric residue are removed. No profile schema, receipt format, scenario generator, or replacement harness is introduced.
