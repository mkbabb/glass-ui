# The orchestrator's line on critique 2, item 1 (2026-11-16). BINDING for fix seat 3 and critic 3.

Critique 2's item 1 asks for a ruling: the dock Select's entrance under reduced motion, WebKit at 1440, first painted frame at (681, 65) against a resting plate at (679, 66). Fix 2 and critic 2 read the offset as a start-aligned plate placed against a trigger pressed to scale 0.97. It does not happen when the Select is opened by keyboard.

**Ruling.** Under reduced motion a pressed control does not scale: the press shows as the fill step alone, in every engine, for every control that scales on press (Button, the dock's seats, segmented options). Row 8's law already says transform does not travel under reduced motion; a 3 % scale that lands at once is a jump of its own. The popper then places against the resting trigger and the first frame is in its place.

- **First confirm the cause** with one reading: the trigger's computed transform at the frame the plate is placed, WebKit 1440, reduced motion. If the trigger is not scaled at that frame, the cause is elsewhere: record the reading, do not build this ruling, and leave the cell red for critic 3 with what you found.
- **Do not widen the tolerance** and do not move the witness's reference point.
- **Witness:** the existing cell, unchanged, GREEN in WebKit 1440 on three readings and still GREEN in the other three projects; one new cell: under reduced motion a pressed Button and a pressed dock seat keep scale 1 (computed transform none or the identity, at pointerdown plus one frame), RED on v11.1.0 if v11.1.0 scales there, GREEN on the tip.
- **CHANGELOG:** one line in the reduced-motion entry: a pressed control shows its press by colour, not by size.
- Without reduced motion nothing changes: the entrance tween covers the press, and the critics have not found an offset there.

Items 2 to 4 are defects with their cures stated in the critique; they need no ruling. On item 2, layering `slider/styles.css` into the components layer is the cure that matches row 8's design (a site's unlayered rule wins; glass's own rules do not).

# Added: an outside witness for rows 1 and 2 (value.js's production check of color.babb.dev on 11.1.0, 2026-11-16)

value.js filmed the dock's Select as a phone sheet at 390x844 with touch, on the GPU lane, two runs. On 11.1.0 every close path empties the sheet between two painted frames (6.4 to 26.1 ms after the input) and a 192x326 plate appears under the trigger and recedes there: rows 1 and 2's fault, from `sheet-width.ts:24-35`. Frame data: `~/.dev-logs/owner-1112/PROD-1116/color/data/leave-screencast-presence.json`; strips `~/.dev-logs/owner-1112/PROD-1116/color/films/strip-m390t-pages-*.png`.

Two things its film adds to row 1's witness, which drives pick, press outside and Escape:
- **Five close paths, not three:** tap outside, Escape, a tap on the trigger, a tap on the current item, a tap on another item. Row 1's witness covers all five, both engines.
- **The material is latched with the form:** on the same dock the ⋮ DropdownMenu's fill flips from its sheet material to `blur(20px)` at alpha 0.22 on its first closed frame, then recedes in place. Row 1's latch holds `data-form`, `data-surface` and the reference together until the leave ends; a witness reads the fill and the backdrop filter on every exit frame.
