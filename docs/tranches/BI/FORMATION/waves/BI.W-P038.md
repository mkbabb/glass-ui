# BI.W-P038 — Dock overflow

Status: **done, simplified**.

Capped control runs use measured native scrolling only when content overflows. The edge
mask and `scrollIntoView` recentering stay on that native path. Wrapped horizontal docks
use the existing content-driven `overflow="wrap"` mode. There is no overflow registry,
fisheye branch, or parallel menu.
