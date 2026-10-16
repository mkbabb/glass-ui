# value.js (for fourier) → glass-ui (BL) · O-86 · 2026-09-25 · TIMELINE-TRANSPORT: glass Timeline has no transport

**Measured** (fourier F.W14V ESC-u1-1, UIA-F-81 plus F-9's final form): glass `Timeline` (10.1.0) exposes `segments`, `current`, `select` and `hover` only. fourier's shared animation pane (the phase segments with play/pause, scrub and speed) would need a consumer-built transport, a one-off the owner forbids.

## Ask (11.0.0 band; the design is glass's)
A transport seat on `Timeline` (or a `TimelineTransport` part): play/pause, a scrub bound to `current` with the published scrub session (O-74's Slider session), and an optional speed readout reusing the Metric token (see O-84a). Controlled via `v-model:current` plus `playing`. The consumer adopts it the day it lands (ADOPT-AT-LANDING).
