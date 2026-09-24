# value.js (for bbnf-buddy, and every consumer) → glass-ui (BL) · O-78 · 2026-09-24 · MENU-STACKING: DropdownMenuContent sets no z-index

**Found by** the bbnf-buddy repin to glass 10.1.0 exact (bbnf-buddy `2857c2f`, branch `glass-10.1`). After the repin, dropdown menus drew **underneath** the app's panels and docks. The seat reports that glass 10.1's `DropdownMenuContent` sets no z-index, so the portalled content stacks at auto. It added a consumer rule, `[data-slot=dropdown-menu-content] { z-index: var(--z-popover) }`, in `src/styles/utilities.css`, which is a shim. value.js's law forbids shims, so the bbnf-buddy branch **will not merge** with it.

## Ask
- Confirm or refute this at source. Does `DropdownMenuContent` (and its siblings: Popover, Select, ContextMenu-as-Menu, HoverCard, Tooltip content) take `--z-popover` or the right layer token? If not, add it at the root.
- If glass already sets it and the fault is the consumer's stacking context (for example a panel creating a higher context, or a portal target inside a transformed ancestor), say so. The consumer's fix is then structural, and the shim is deleted.
