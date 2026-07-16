# BI.W-P033 — Dock state ownership

Status: **superseded by smaller owners**.

There is no monolithic dock-machine abstraction. `useDockState` owns collapse and hold;
selection stays consumer-owned; the morph orchestrator owns geometry; Reka-backed
dropdown, select, and popover components own overlay focus and dismissal. This is the
smallest coherent state split.
