# Specular: the ruling (orchestrator, 2026-11-16, on the owner's order "the glass specular dot for buttons and the like needs refinement"; his to reverse)

Read: `PROTOTYPE.md` and the strips (`strips/icon.png`, `strips/dock.png` and the rest), three rows each: today, no pointer light (V-A), no pointer light with a rim arc (V-B).

1. **V-A ships.** The pointer-following light leaves every control. In the strips the dot is the only thing that differs between "today" and V-A, and nothing reads as less glass without it. 248 CSS lines go; the opt-in for a surface a site arms on purpose stays, with its public names.
2. **V-B is dropped.** The arc is 2 to 3 levels in light (invisible), sits 4 px outside the fill in a dock, and adds a mark to answer a question the fill already answers. Restraint: one effect per change.
3. **The glass Button and the icon button get a real hover.** With the light gone their hover equals rest (0 levels). They take the same answer a dock seat has: the plate's fill steps one tint on hover, tweened in and out on the control's existing clock, no pointer tracking, under `(hover: hover)` only. Press and focus are unchanged. Gate: hover differs from rest by at least the dock seat's hover step, in dark and light, on a busy and a plain ground; no frame carries more than a fifth of the change; no box moves.
4. **Not in this change:** the selected dock seat has no rim (`--dock-active-shadow: none` overrides the capsule's rim): recorded for the dock redesign with daraksha's active-ring ask. `.glass-capsule-hover` outside a dock and the unread `--glass-btn-press-t` write are left as they are until 12.0.0 and listed as deprecated.
5. **Release:** 11.1.2 (11.1.1's scope is closed). The two deleted tokens were never in the manifest; the CHANGELOG names them.

## Added 2026-11-16 01:05: the hover in dark (after the first build of item 3)

The first build reused the light tint in both modes: in light it reads a clear step (12 to 25 levels, within 1.5 of the dock seat's); in dark it darkens the plate on a busy ground and shows nothing on a plain one. The dock seat already solved this: its dark hover lifts toward the foreground at 8% (`tokens/dark-arm.css:294-299`) because a darker tint reads as a hole.

Ruling: the Button's hover is its own rest fill mixed toward the foreground, one `color-mix()` on the one `background-color` it already tweens (no second layer, no shadow, no image): in dark by the same 8% the seat's dark token uses; in light it keeps the tint step as built. If the two modes can share one expression (rest fill mixed toward a per-mode hover ink that the seat's tokens already name), use that and delete the mode split. Gate: hover minus rest is positive in dark and negative in light on all four grounds, and within 3 levels of the dock seat's step on each; the per-frame and shift gates as before.
