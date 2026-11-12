# Consumer notes: studentsafety.friday.institute (gaggle `dashboard/`), 2026-11-10

Filed by the gaggle site session for the library session to triage (P02: shared faults go to the
root library, batched). The site pins glass-ui 11.0.0 exact. Nothing here was patched locally.

1. **Default display weight (proposal).** The site now sets `--font-display-weight: 400` on
   `:root` (scale.css's documented public token, default 600), because its owner rules titles,
   units and counts are never bold (T06: weight 600+ is "bold"). Proposal: make 400 the default
   so consumers do not each override it. `text-title` / `text-heading` (700) and
   `text-subheading` (600) carry fixed bold weights with no token at all; the same rule applies.

2. **Fission is gone, but the owner's D08 still asks for it.** `GlassDock.vue` records the
   fission facility as removed ("clean break, no alias"). The owner's standing ruling (D08,
   11-09 value-js, 7x) is that the theme toggle fissions out of the dock to its side and the
   collapsed dock still shows its state. The site seats `DarkModeToggle size="dock"` in
   `#persistent-end`, which stays visible collapsed, and does not fission. Listed for the owner
   as BRIEF.md section 5 item 17. Decide whether fission returns, or the owner retires D08.

3. **The collapsed summary seat fits one glyph, not a word.** `.dock-layer--summary` is a square
   (`aspect-ratio: 1`, 40 px). A one-word label in `#collapsed` (the current view, e.g.
   "Calendar") overflows the seat and draws over the `#persistent-end` region at 390 px. The site
   uses a lucide icon there instead. If a text summary is meant to be supported, the seat should
   size to its content; if not, the README should say the slot takes a glyph.

4. **No collapse on scroll.** With `collapse="closed"` / `expandOn: "hover"` the dock collapses
   after the idle window and on pointer leave, but not on scroll (the owner's D02: "it shrinks on
   scroll or disuse").

5. **DarkModeToggle drops a wrapper's pointer and blur handlers.** It binds
   `{...forwardedAttrs, ...press.handlers}`, so a consumer `onPointerleave`, `onPointerdown` or
   `onBlur` (for example a reka `TooltipTrigger as-child`) is overwritten by the press
   handlers. The site wraps the toggle in a span to give it its explaining hover (K11), which
   loses the focus-opened tooltip. Merge the handlers instead of spreading over them, or give
   the toggle its own built-in hover label.

6. **The dock's 11.0.0 collapsed shape is a 16 px bar corner** when a summary and a persistent
   region are both present (morph.css, `--radius-dock`). The owner's "Rounded" ruling (D03)
   arrives as the 11.1.0 capsule; the site will move to 11.1.0 in one step when it is published.

7. **Tooltip never opens on a touch tap** (owner's A02: "tap opens popovers"). reka's
   `TooltipTrigger` ignores touch in `pointermove`, closes on `pointerdown` when open, and closes
   again on `click`, so a tap on a mark opens nothing at 390 px. Root fix: open on `pointerdown`
   when `pointerType === "touch"` (toggle when already open; the content's outside-press rule
   still closes it). Until a published release ships it, the site holds one composable,
   `dashboard/src/components/useTapOpen.ts` (controlled `open`, set after a touch tap), used only
   by its mark and term tooltips and marked for deletion on upgrade.
