# PROBE-NOTES — F2 NATIVE-SCROLL (banked family; the two decisive probes, pass-2 shared probe seat)

## PASS-2 SAFARI ARM (Playwright-WebKit 26.5, 2026-07-18)

verified-model: claude-fable-5 (system-context model ID, verbatim). Serialized browser seat,
pass 2. The family is BANKED (no pass-1 prototype); per the agglomeration its two decisive
probes moved to this seat. Engine: repo-local Playwright 1.61.1 WebKit webkit-2311, version
26.5 (`Version/26.5 Safari/605.1.15`), headed, macOS, DPR 2. Probe pages committed here:
`f2-u2-scrolltop.html`, `f2-ur1-sda.html`.

### U2 — unclamped `scrollTop` during rubber-band: NOT DECIDED → DEVICE-DEFER

- Programmatic writes clamp (set −120 reads 0; set beyond-max reads max 1180) — expected, not
  the question.
- Synthetic wheel bursts (6×600px) at both bounds of an element scroller, rAF-sampled 75
  frames each: scrollTop pinned exactly at 0 / 1180 — **no overscroll value ever surfaced**.
  Window scroller at top: identical (min 0).
- Reading: Playwright's synthetic wheel carries no momentum phase, and desktop WebKit only
  rubber-bands on real gesture momentum — the UA rubber band is UNREACHABLE by desktop
  automation. The MDN unclamped-read claim therefore remains paper-only: neither confirmed
  nor refuted. The decisive arm is a real device (macOS trackpad momentum; iOS touch on an
  element scroller — the corpus platform, explicitly DEVICE-DEFER per the charter's honesty
  rule).
- Disposition consequence: the bank's re-trigger clause ("both probes green") cannot be
  evaluated from desktop automation alone; the bank HOLDS, neither promoted nor retired.

### U-R1 — scroll-driven animation + backdrop-filter: correctness PROVES, threading TOOL-DEFER

- Support: `CSS.supports("animation-timeline: scroll()")` true, `view()` true; computed
  `animation-timeline: scroll(root)` binds on WebKit 26.5.
- **Resample correctness PROVES:** an SDA animating `transform: translateX` on a fixed
  `backdrop-filter: blur(12px)` bar over a striped document — computed tx at scroll fractions
  0/.25/.5/.75/1 = 0/150/300/450/600 (expected exactly that), and the video-path frames show
  the bar genuinely frosting its backdrop at SDA-driven positions (inside-bar gradient energy
  0.0042 vs outside stripes 0.0084 at the half-scroll position). Artifacts:
  `f2-wk-sda-top.png`, `f2-wk-sda-half.png` (video frames).
- **Threading INCONCLUSIVE via this harness:** with the main thread jammed 800ms, Playwright's
  wheel dispatch serialized behind the jam (five wheels + screenshot completed only at block
  end — 819ms for a normally sub-40ms sequence), so whether the SDA + async scroll progressed
  on the compositor thread DURING the jam is unobservable from this tooling. Needs real Safari
  with Instruments/Web Inspector, or a physical trackpad. Marked TOOL-DEFER honestly — no
  inference recorded.
- One cross-family datum transfers: WebKit 26.5 fires `scrollend` per discrete `scrollTop`
  step exactly like Chrome (measured in the F4 arm: 89 steps → 89 scrollends) — F2's U-R4
  park-point question inherits the same debounce-primary answer on both engines.

Harness laws governing these rows (proven this pass; full statement in the F1 section):
Playwright WebKit screenshots are backdrop-filter-blind — the SDA material evidence above is
video-path; `performance.now()` quantizes to 1ms.
