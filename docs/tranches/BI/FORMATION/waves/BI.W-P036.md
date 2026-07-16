# BI.W-P036 — Dock selection and face changes

Status: **implemented; native layering acceptance pending**.

Selection remains consumer-owned through `useSelectionGroup` or an equivalent model.
`DockCrossfade` performs controlled face changes and keeps inactive content inert.
Its isolated stack paints the entering face above the leaving face independent of DOM
order, while both remain present on the interruptible spring until settle.
Semantic grouping is ordinary DOM plus `DockSeparator`; it requires no descriptor
component.
