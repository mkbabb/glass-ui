# BI.W-P110 — ExpandableContainer

**Status:** DONE — PRODUCT COMPLETE

## Product contract

`ExpandableContainer` invokes one content subtree through one enabled or
disabled Vue Teleport. Expanding moves that subtree from its inline position to the
fullscreen layer; collapsing returns that subtree inline.

The component owns:

- one controlled `open` state and explicit expand/collapse chrome slots;
- reference-counted body scroll locking;
- topmost Escape dismissal;
- direct Reka UI focus containment, fullscreen focus entry, and trigger restoration;
- semantic `data-part`, `data-mode`, `data-state`, and surface hooks with colocated CSS.

It does not render a second Dialog, duplicate default-slot branch, compatibility path,
or parallel content instance.
