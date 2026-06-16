# BB — cross-repo INBOUND (the asks ON glass-ui + the sibling dispositions)

The single record of what the constellation asks of BB + how each sibling dispositioned BB's outbound asks. Sources (read at HEAD 2026-06-16): the speedtest ask-brief (`speedtest/docs/tranches/AW/coordination/glass-ui-BB-ask-brief.md`), keyframes.js (`keyframes.js/docs/tranches/K/KF-TO-GLASSUI-BB-ASKS.md`), slides Tranche N (`slides/docs/tranches/N/N.md`), value.js N. The foreign-tree fence holds (by-name asks + consume contracts; slides is the ONE driven exception).

## §1 — keyframes.js K (the response to BB-AMENDMENT §A3) — FOLD into the specs

kf is the LAST constellation arm on 3.13.0; **K.W1′ adopts glass-ui `~4.0.0` NOW** — the user drove the live kf demo (2026-06-16) and hit the SAME 3.13.0 dock defects (the collapsed-pill oval-clip, the hover-expand flash) that BA 4.0.0 already cured (no 3.13.x backport; adopting 4.0.0 is the cure, inv-16 forbids patching the dock in the kf demo). Cadence: `4.0.0` now → re-pin `4.1.0` at the BB close (the constellation cadence, matching slides + value.js).

The dispositions (each is a DELTA to fold into the named BB spec after `wcvetf6f5` lands):

| item | kf disposition | fold into |
|---|---|---|
| `springTimingFunction` (W-DECK's `--spring-deck`) | **SATISFIED — already published.** A LIGHT value.js-free named export (`kf src/animation/springTimingFunction.ts`, gated by `proof:published-surface`); `springTimingFunction({response, dampingFraction}) → {fn, css}` where `css` is a `linear()` stops string ready for a CSS custom property. W-DECK consumes the PUBLISHED surface — **no kf change, no open ask.** | **W-DECK** + **W-CROSSREPO-ASKS** (mark the deck-spring ask SATISFIED, not pending) |
| KF-OSCILLATOR (speedtest idle-breath) | **ACCEPTED + BOOKED (kf-owned).** kf has no oscillator today; it adds a LIGHT `Oscillator`/phase-clock (periodic phase ∈[0,1) + frequency + optional waveform), value.js-free, timed to the speedtest/W-EASING consume. NOT blocking the 4.1.0 cut. | **W-CROSSREPO-ASKS** (mark BOOKED-kf-owned; glass-ui consumes when it lands) |
| W-EASING-PRIMITIVE boundary law | **AFFIRMED** (curve MATH = value.js · spring/playback = kf · editor COMPONENT = glass-ui). kf owns `springTimingFunction`/`springLinearStops`/`SpringProgress`/`RAFPlayback`; does not encroach on the curve-math or editor halves. | **W-EASING-PRIMITIVE** (the boundary law is mutually affirmed) |
| **kf is now a CONSUMER of glass-ui** | kf joins slides + value.js on the cadence. | **W-LINEAGE-PROBE** (ADD kf to the consumer constellation — the registry-probe must see it) |
| **kf consumes W-DOCK-MORPH-FAMILY at 4.1.0** | the 4.0.0 dock fix is the cure NOW; W-DOCK-MORPH-FAMILY (compositor-transform, settled-reveal, PRM synchronous seat, DockLayerGroup self-reserve) is the further repair kf wants at re-pin. A SECOND named consumer (with speedtest) → the ≥2 bar is by-construction. | **W-DOCK-MORPH-FAMILY** (add kf as the named 2nd consumer) |
| the peer-spine admits kf 4.x | kf is at 4.2.0; glass-ui declares `keyframes.js: ^4.0.0` (satisfied). Confirm 4.0.0/4.1.0 KEEP `^4.0.0` so the kf re-pin carries no peer warning. | **W-PEER-SPINE** (assert the kf `^4.0.0` floor holds across the bump — it already names this; confirm) |

kf's 4.0.0 consume-seam migration (kf-side, no glass-ui patch — recorded for awareness): W-TABS (Tabs→SegmentedTabs underline; segmented→pill), MetricBadge amount→value, the surface axis (GlassPanel/Dialog), menu-glass, scroll-fade→FadingScroll, /underline→/handmark. ExpandableContainer/removed-export exposure = 0.

## §2 — value.js N (the leg, cross-ref)

value.js ships the VJ scroll+perceptual-ramp grammar + the **OKLCH/shorter-hue spectrum helper** (glass-ui's W-BORDER-PROGRESS consumes it) at **0.13.0**; pins glass-ui at the clean cut (4.0.0 now → 4.1.0 at BB close). value.js's own W-PEER-SPINE admits glass-ui `^0.12.0 || ^0.13.0`. glass-ui's **W-PEER-SPINE** admits value.js `^0.12.0 || ^0.13.0` (closes F-2). The cadence is acyclic — everyone consumes the PUBLISHED predecessor.

## §3 — the constellation cadence (one picture)

```
glass-ui BA 4.0.0 (PUBLISHED) ──dock cure──► kf K.W1′ adopt NOW · slides N.W-ADOPT · value.js pin
glass-ui BB 4.1.0 (the cut)   ──W-DOCK-MORPH-FAMILY + /deck + BorderProgress──► kf/slides/value.js/speedtest re-pin
kf K  ──springTimingFunction (published, LIGHT)──► glass-ui W-DECK (--spring-deck)   [SATISFIED]
kf K  ──Oscillator (LIGHT, booked)──────────────► speedtest idle-breath / W-EASING   [BOOKED, kf-owned]
value.js 0.13.0 ──OKLCH spectrum helper─────────► glass-ui W-BORDER-PROGRESS
slides N src/deck/ ──donor──► glass-ui W-DECK ──consume-back──► slides N phase-2
glass-ui 4.1.0 ──the primitives──► speedtest AW.W7 (^4.1.0)
```

Everyone consumes the published predecessor; no cycle. The version cut + the npm re-pins stay USER-DOMAIN (confirm-first) per the constellation publish discipline.

## §4 — the fold checklist (after wcvetf6f5 lands)

- [ ] W-CROSSREPO-ASKS — springTimingFunction → SATISFIED; KF-OSCILLATOR → BOOKED-kf-owned; add kf-as-consumer + the 4.0.0→4.1.0 kf cadence row.
- [ ] W-PEER-SPINE — add the keyframes.js `^4.0.0` floor-holds assert (kf is now a consumer); keep the value.js `^0.12||^0.13` widen.
- [ ] W-LINEAGE-PROBE — ADD kf to the consumer constellation (with the Atlas + slides + value.js + speedtest).
- [ ] W-DOCK-MORPH-FAMILY — add kf as the named 2nd consumer (with speedtest); the ≥2 bar by construction.
- [ ] W-DECK — note `--spring-deck` consumes the PUBLISHED kf `springTimingFunction` (no kf change).
- [ ] W-EASING-PRIMITIVE — the boundary law is mutually affirmed (kf owns spring/playback).
- [ ] BB-AMENDMENT-crossrepo.md §A3 — re-point the deck-spring ask to SATISFIED + KF-OSCILLATOR to BOOKED-kf-owned.
