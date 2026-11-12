# Inbound O-176 and O-177: parkway NPIG G8 and G14 (the dock)

These came in on 2026-11-05 at night from sci-report-36. The details are in `~/Programming/slides/docs/tranches/NPIG/DESIGN-v3.md` §11–§13, and the witness is `~/Programming/parkway` (read-only).

## O-176 (G8): `collapse="open"` arms no idle timer at mount

A GlassDock mounted with `collapse="open"` never idles shut until the first interaction. It should arm the idle window at mount, as the documented contract says: "both collapse after the one idle window". Parkway carries keepOpen/release glue to cover this and deletes it once the fix ships.

Gate, in both engines: a `collapse="open"` dock left untouched collapses after `DOCK_COLLAPSE_DELAY_MS` and the settle. The same holds after a remount.

## O-177 (G14): Tab focus and a press mid-expand

There are two defects:
- The folded dock face does not expand on Tab focus. "Reopen on pointer or focus" is the contract.
- A press made during the expand morph can be swallowed.

Gates, in both engines:
- Tab onto the folded summary expands the dock, and focus lands on a seat or stays on the summary as the disclosure contract says.
- A press on a seat at any point during the expand activates that seat exactly once.

## G11 witness moved

Parkway is replacing its dock Slider with discrete time stops. O-167's witness therefore moves to glass's own demo: a GlassDock hosting a Slider in the parkway composition from `inbound-O-166.md`. The defect still stands.
