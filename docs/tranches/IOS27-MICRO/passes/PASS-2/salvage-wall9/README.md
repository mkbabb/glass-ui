# WALL #9 salvage (2026-07-18, session limit, reset 12:10pm ET)

Verbatim copies of the six files the cure:F1 and cure:F4 seats (run wf_6af3ac86-fab,
resume 3) were mid-write on when the wall killed them (writes 08:16-08:27 ET, un-journaled).
Preserved per the user salvage edict 2026-07-18 — killed seats' progress is never discarded.

These are cure-lane working files, NOT REFABLE canon: the partials also remain live in the
tree (no restore) because f1/index.html carries the journaled safari-arm instrumentation
interleaved with cure:F1's partial edits, and the resumed cure seats re-derive and overwrite.
This directory is the pre-resume snapshot should the re-derivation need diffing.

- SPEC-F1-SCALAR-SPINE.md   (cure:F1, partial @ 08:27:06)
- SPEC-F4-ENERGY-FIELD.md   (cure:F4, partial @ 08:26:57)
- f1-index.html             (MIXED: safari-arm journaled + cure:F1 partial @ 08:21)
- f1-check.mjs              (cure:F1, partial @ 08:21)
- f4-index.html             (cure:F4, partial @ 08:26)
- f4-check.mjs              (cure:F4, new file @ 08:16)
