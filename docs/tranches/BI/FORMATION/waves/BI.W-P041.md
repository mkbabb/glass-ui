# BI.W-P041 — Dock motion

Status: **implemented; GCF-01 native acceptance pending**.

Collapse, resize, and face changes share the dock spring authority and reduced-motion
policy. The unconsumed fisheye renderer and its pointer clock were deleted. Motion stays
interruptible where geometry changes and seats immediately under reduced motion; there
is no per-device tuning matrix.
