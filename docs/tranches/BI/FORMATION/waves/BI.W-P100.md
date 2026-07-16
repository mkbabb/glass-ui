# BI.W-P100 — FocusScope

**Status:** SUPERSEDED—DELETED

## Product disposition

The public `FocusScope` wrapper and `/focus-scope` subpath are deleted. The wrapper
added no product semantics beyond Reka UI and had no independent product witness.

`ExpandableContainer` imports Reka UI's `FocusScope` directly for its fullscreen
focus containment. No private wrapper, compatibility alias, root export, package
subpath, or standalone story remains.
