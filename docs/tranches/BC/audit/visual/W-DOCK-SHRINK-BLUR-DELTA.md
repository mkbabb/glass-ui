# BC.W-DOCK-SHRINK-BLUR — DELTA (the shrunken dock is CRISP, not a blurry mess)

**Status:** SOURCE arm GREEN (`proof:dock-shrink-blur` S1-S4 born-RED→GREEN). The PAINT arm (the
before/after crisp-pill capture) is **pending-orchestrator-capture** — see below.

## What this wave landed (SOURCE)
The decongest bloom is a TRANSIENT, not a resting state. At HEAD the bare `.glass-dock` carried a
PERMANENT 3px own-pixel self-blur on the resting collapsed dock, STACKED on the 9px backdrop blur (the
"blurry mess when shrunken" defect, glass-dock-codebase.md §2.4 — `filter: blur(3px)` keyed off
`--dock-expand-t`, which AT REST resolves to the class endpoint 0 → `blur(3px)`).

**The fix (dock/morph.css):** the `--dock-reveal-blur: 3px` + the `filter: blur(...)` decongest move
INTO a `.glass-dock[data-morphing]` scope; the bare `.glass-dock` resting rule sets
`--dock-reveal-blur: 0px` (CRISP). The `[data-morphing]` clears on settle (the driver behavior), so:

| axis | HEAD | TARGET |
|---|---|---|
| resting collapsed self-blur | `blur(3px)` (permanent) | `blur(0)` (CRISP) |
| mid-morph decongest | `blur(3px → 0)` keyed on `--dock-expand-t` (bare rule) | `blur(3px → 0)` gated on `[data-morphing]` |
| backdrop blur | `9px` (`--glass-blur-dock-radius`) | KEEP (byte-untouched — the glass material) |
| PRM | self-blur zeroed | KEEP zeroed (on both bare + `[data-morphing]` scopes) |

**The perf-realism rider (recorded, NOT an fps gate):** the resting collapsed dock at HEAD stacked TWO
live filter passes on its own pixels — the `filter: blur(3px)` self-blur (an own-pixel render-to-texture
+ blur convolution every composite) ON TOP OF the `backdrop-filter: blur(9px)` glass material. Gating the
self-blur to `[data-morphing]` REMOVES the resting `filter` pass entirely: the at-rest dock drops from
**2 filter passes to 1** (the backdrop blur kept). This is a steady-state GPU cost reduction on every
route that mounts a collapsed dock (the shell docks are on every page); the decongest pass survives ONLY
during the bounded `[data-morphing]` window (~280ms on DOCK_SPRING, < 0.3s per toggle).

## PAINT arm — pending-orchestrator-capture
- **Before/after composited screenshot** of the COLLAPSED dock on `/dock/overview` (a real GPU host,
  BOTH modes, the collapsed pill at rest). A human reads: the collapsed pill is a CRISP glass pill —
  sharp glyph, sharp edges, the backdrop clean through it — NOT a muddy haze.
- **A mid-morph capture** showing the decongest bloom IS present during the gesture (the transient
  preserved, not regressed away).
- **A sharpness readback** (edge-gradient / high-frequency measure) of the collapsed-pill crop above a
  crispness threshold; `getComputedStyle` on the collapsed dock at rest reads `filter: blur(0px)`/`none`.
- **WebKit:** `filter: blur()` is cross-engine — the crisp-at-rest + transient-mid-morph behavior MUST
  paint identically.
- The DELTA notes the resting filter-pass count before (2) / after (1).

## Gates (SOURCE)
`proof:dock-shrink-blur` GREEN (S1 resting-zero · S2 morph-gated · S3 backdrop 9px byte-frozen · S4 PRM
carve) · `proof:no-layout-animation` LOCKED (the `filter` re-gate is a compositor/paint property) ·
`proof:dock-engine` GREEN.
