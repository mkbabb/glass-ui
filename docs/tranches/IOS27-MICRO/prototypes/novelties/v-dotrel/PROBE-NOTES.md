# PROBE-NOTES — V-DOTREL, the dot-matrix state relay

verified-model: claude-fable-5 (system-context model ID, verbatim). Seat novelty:PROTO-2
(PROTO-ATTENTION-EXIT), 2026-07-18. Status: RUNS; `node check.mjs` 43/43 PASS at write time.
Files: `index.html` (self-contained, one canvas), `check.mjs` (extracts the physics block).

## What the prototype claims to prove

Roster card 8 whole: state changes travel as color through a static dot lattice — a
SUBSTRATE-family citizen bound by row K law. The wave is a phase field: per-dot delay =
distance/c (c=900px/s) + seeded jitter (mulberry32, parameter-not-sample — same seed, same
lattice, node-proven to zero diff); hue crossfades on the shortest arc over the rise while a
+16% luminance pulse rides the front on the law-11 lifecycle (rise-to-peak 692ms, decay-to-10%
3488ms, peak-normalized so the amplitude is the AMP token's alone). Node-proven: farther dots
never lead beyond the declared jitter bound; per-60Hz-frame luminance step 0.005 (breathes,
never ticks); the event window is finite (6.3s for the panel: travel + rise + decay) with
residual 0.029 at park and every hue settled — then the rAF dies on a still frame. Zero idle
rAF is WRITTEN, not hoped (structural gate on the park path). Row K structurally: no
setTimeout/setInterval anywhere; one `relay()` entry called only by page-state controls (the
lattice never relays its own state). The `--medium-t` handshake is published during the event:
front coverage, monotone 0→1 (node-proven). Budget: dot census computed at build/resize only
(ResizeObserver owns it; the tick body contains no layout reads), hard-capped at 900 dots (a
4000² viewport clamps to exactly the cap). Our palettes: warm cream calm/cream grounds, sky
listening, dusk-violet focus. PRM: still frame with composition preserved — the target state
in one step, no pulse.

## QUEUED-PAINT (the serialized browser arm's ledger — video path only)

1. **QUEUED-PAINT / the wave reads as a message.** Video each state press: a hue front must
   visibly TRAVEL from the pressed control through the lattice with the luminance pulse riding
   it — not a global crossfade. The +16% pulse is at the threshold class; if it vanishes on
   the smoky panel, the judge dial is ground luminance, never the AMP token (law 11's peak is
   corpus-fixed).
2. **QUEUED-PAINT / zero idle rAF observed.** Performance trace ≥10s after a relay settles:
   no rAF entries, no canvas paints — the still frame is the whole idle cost. The HUD's
   "parked" claim must match the trace.
3. **QUEUED-PAINT / event-window frame budget.** Trace during a relay: 323 arcs per frame on
   the 2d canvas at dpr≤2 must hold 60Hz on both engines (frame-gap statistics). If WebKit
   drops frames, the dial is dot pitch (fewer dots), not a second canvas.
4. **QUEUED-PAINT / hsl() hue truth over the panel.** The dots paint in `hsl()` over the
   smoky glass; confirm the four states are tellable at a glance in both themes (the
   value-structure-tellable discipline, A-QUARTET kin) — paired screenshots suffice here
   (canvas pixels, not backdrop-filter).
5. **QUEUED-PAINT / PRM still-step.** Emulate reduced motion: a state press must repaint once
   to the final palette — no wave, no pulse, composition intact.

## Known dishonesties and limits

1. The relay origin read (`getBoundingClientRect` of the pressed control) happens once per
   event — a resize-class read at event time, declared in the comment; it is still a layout
   read on the interaction path (before the first frame, not per-frame).
2. `--medium-t` is computed per frame as covered fraction over all dots (O(n) in JS, n≤900) —
   cheap, but the library form should precompute the sorted delay array once per relay and
   binary-search the fraction.
3. The panel is fixed-height in the stage; the viewport-area budget is exercised by the sim
   (4000² → cap), not by a live resize storm — the browser arm may drag-resize to confirm the
   census rebuild is still-frame clean.
4. Theme flip here is a palette state on the lattice, not a whole-page `.dark` flip — the
   co-owned `--medium-t` handshake with a real page-level medium change (N11's consumer) is
   integration work beyond this standalone.
