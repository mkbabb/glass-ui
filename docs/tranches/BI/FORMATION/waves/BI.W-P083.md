# BI.W-P083 — StackedIcons retirement

**Status:** DONE

`StackedIconGroup` and `/stacked-icons` are absent from source, exports, package projections,
stories, and tests. Avatar/display owners use ordinary DOM, so no replacement wrapper or alias
is introduced.

Verification owner: public/export discovery and both typechecks. The deletion owns no visual
scenario.
