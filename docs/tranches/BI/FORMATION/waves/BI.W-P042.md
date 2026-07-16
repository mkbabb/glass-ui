# BI.W-P042 — Dock demo integration

Status: **source complete; native visual review pending the major batch**.

The demo shell uses ordinary named groups and `DockSeparator`. Context facets use a
private composition of `DropdownMenu` and `DockControl`; the sections story demonstrates
the same semantic-DOM pattern. The overflow story now shows only the supported native
scroll path. Browser verification is intentionally batched with the next major visual
review.
