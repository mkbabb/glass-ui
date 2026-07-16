# BI.W-P103 — Popover

**Status:** DONE
**Disposition:** retained public anchored overlay with truthful click/hover triggers

Popover owns nonmodal anchored content, controlled/uncontrolled open state, trigger and
content linkage, focus, Escape/outside dismissal, portal positioning, collision handling,
and the shared transient-overlay material.

Its trigger contract is exactly `"click" | "hover"`:

- click uses Reka Popover semantics for an interactive anchored command surface;
- fine-pointer hover uses Reka HoverCard timing and card semantics;
- coarse-pointer hover requests promote to the click/tap Popover root so content remains
  reachable without synthesized hover.

The former `trigger="context"` spelling is removed. It never installed a contextmenu
listener and therefore behaved as an ordinary click Popover. Context commands remain
owned by DropdownMenu's context branch; Popover does not duplicate that menu contract.

Current product evidence:

- `src/components/popover/Popover.vue` restricts the shared trigger vocabulary to the
  truthful click/hover subrange and selects one Reka root.
- `PopoverTrigger.vue`, `PopoverContent.vue`, and `popoverContext.ts` preserve one compound
  markup shape across the two roots.
- `tests/components/popover.contract.test.ts` verifies the public trigger type, click
  root, fine-hover root, and coarse-pointer promotion.
- `demo/stories/containers/popover.vue` routes the fine-pointer hover specimen whose
  same trigger promotes to tap-toggle on coarse input; context commands remain
  DropdownMenu responsibility.

The public compound anatomy remains `Popover`, `PopoverTrigger`, and `PopoverContent`.
Existing PopoverContent material, portal, role, and Dock-owner behavior is unchanged by
the trigger cleanup.
