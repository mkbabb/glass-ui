# Orchestrator ruling (2026-11-15, after build A): the Dialog's exit clock. BINDING for build seat B if it has not finished row 9, otherwise for the first fix seat, the critics and the close.

Build A left this open: the Dialog's exit runs about 120 ms, the spring generator's 0.12 s floor, which sits near the one-fifth-of-travel-per-frame bound in WebKit under load.

Ruling: do NOT raise the generator's floor (it also sets the press, slider, sortable-list and dot-ring exits). The Dialog's exit takes its own clock instead, set where `useSpringMount` picks the exit duration for a row: about 180 ms for a Dialog (still shorter than its entrance), with the Sheet at 250 ms unchanged. One named value beside the others, no new public name. Witness: the standing cell (no frame takes more than a fifth of the travel) passes for the Dialog in WebKit 2287 in five consecutive readings, and the Dialog's exit stays shorter than its entrance.

Whoever takes this adds the CHANGELOG clause to row 3's entry and records the readings.
