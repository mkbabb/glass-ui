# BI.W-P037 — Dock transient surfaces

Status: **superseded by existing overlay primitives**.

Dropdown, select, and popover surfaces use the existing Reka-backed component families.
They own top-layer/portal placement, focus, keyboard navigation, and dismissal while the
typed dock context keeps the dock active. No Dock-specific popover engine remains.
