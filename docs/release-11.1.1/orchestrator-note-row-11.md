# Orchestrator note (2026-11-15): the scope has an eleventh row. BINDING for build seat B, the critics and the close.

`docs/tranches/BL/driver/glass-11.1.1-exits-scope.md` in the main checkout gained row 11 after this run launched: a "leave finished" event on every surface that opens, the same name on all, emitted once after the exit's last frame and never on a reversed close. It is an addition the scope names, so it is in this release. Seat B builds it after row 9, with the witness the row states, the README line, and a CHANGELOG clause. Where your instructions say "rows 5 to 10" or "ten rows", read "rows 5 to 11" and "eleven rows". Seat A does not build it.

## Added 2026-11-15 22:00: row 11's shape is ruled. BINDING.

Re-read row 11 in the scope file: it now states the event's shape. Besides the Vue emit, the surface's content element dispatches a DOM CustomEvent that bubbles and is composed (it must be heard on a shadow host: add a witness with the surface mounted inside an open shadow root and the listener on the host), `detail.kind` names the surface, it fires once per close including when an unmount cuts the exit short, and a reversed close fires nothing. If seat B has already built row 11 without this, the first fix seat adds it; the critics check it.
