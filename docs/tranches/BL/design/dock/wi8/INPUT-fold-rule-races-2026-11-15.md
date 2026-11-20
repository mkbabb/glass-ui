# Input to the dock loop: what a scroll-driven fold rule must never do (atlas, 2026-11-15)

Atlas reproduced the owner's report (on a phone the dock vanishes when he presses Filters): three races, all in atlas's own code, none in glass. Write-up, read-only: `~/Programming/sci-report/atlas/docs/tranches/U/design/DOCK-RACE-2026-11-15.md`. They are evidence for the redesign's one setting for what folds a dock (O-369a):

1. A fold rule driven by scroll **never folds while a finger is down**, and **counts scroll per gesture, not across gestures**. Atlas's rule summed downward scroll across gestures and checked when a scroll ended; a touch that stops a fling ends the scroll, and it is the same touch meant for a control, so the bar slid out about 20 ms after the finger landed (12 of 12 on production).
2. On the dismissal side: **a surface's own trigger never counts as an outside press.** Atlas's drawer dismissed on outside press 32 ms after touch-down without exempting its trigger, so the trigger's click reopened it. Glass's own overlays opened from a dock must hold the same rule (check DockTrigger with Popover, Select, DropdownMenu and Sheet on the prototype: a press on the trigger of an open surface closes it once).
3. Unread on a real iPhone: whether iOS Safari fires `scrollend` when a touch stops momentum. A scroll-fold rule must not depend on it.
