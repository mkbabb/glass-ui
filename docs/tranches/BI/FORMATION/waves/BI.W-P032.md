# BI.W-P032 — Dock pointer and gesture ownership

Status: **done, simplified**.

Dock pointer ownership remains in the shared state, hold, touch-gate, click-integrity,
and overlay-context paths. The unconsumed fisheye pointer writer was removed. Native
scrolling, coarse-pointer target sizing, and reduced-motion behavior are the universal
floor; no parallel gesture machine or device matrix remains.
