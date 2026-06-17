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

## §5 — speedtest AW v3 relay intake (2026-06-17, via W-CROSSREPO-ASKS)

The speedtest AW v3 session relayed its hardened ask-set to the live BB tranche.
inv-16: speedtest authored the CONTENT; BB CONSUMES it here (no speedtest/kf/vjs
tree edits). Reconciled against BB HEAD — **most of the AW thesis-core already
LANDED**, so the intake is small. Per-item disposition:

### Amends / withdrawals (A)

- **A1 — ACTIONED (P0, time-critical).** `BorderProgress` thickness envelope
  **6-8px → 10-14px**, amended in `waves/BB.W-BORDER-PROGRESS.md` (the gate-summary
  line 6, the §Scope thickness bullet :85 with the full provenance, the W4 :116, the
  π :119) BEFORE the SPEC wave runs — so the born-RED gate W4 + π lock the THICKER
  band, not the hairline. Spectrum + coverage axes UNCHANGED. (Had 6-8px shipped on
  the 4.1.0 cut, the gate would have locked the wrong envelope + a third I3-D4
  hairline regression would ride the publish — the relay's single most time-critical
  item, now closed at the spec.)
- **A2 — WITHDRAWN (stale).** The `--ease-expo-out` publish ask is moot: W-MOTION-CANON
  (complete) deliberately did NOT mint it — the SOTA arrival ease ALREADY ships as
  `--ease-out-expo` (`scheme-motion.css`, `cubic-bezier(0.16,1,0.3,1)`). A second alias
  would RED `proof:animation-coherence`'s EASING-TABLE no-alias clause. speedtest
  CONSUMES the existing `--ease-out-expo` (→ C4). No BB edit.
- **A3 — ACTIONED (P2, Batch-V prep).** The `sdf-core.wgsl` importable-SDF boundary
  note added to the W-GOOBLOB-WGPU entry in `BB-AMENDMENT-viz.md:45` — `metaball.wgsl`
  imports the SDF from `sdf-core.wgsl` so the later DotBlob (B6) imports it too
  (no-duplication, the `procedural-color.wgsl.ts` shared-chunk precedent). ΔE parity
  unchanged. Lands when W-GOOBLOB-WGPU runs (Batch V).

### Confirms (C) — resolved against the landed waves

- **C1 — CONFIRMED.** `--phase-complete-color` is the celebration seam (W-PHASE-PALETTE,
  complete): the InstrumentChassis reads the token (8 references in
  `instrument-chassis.css`), no baked gold. speedtest's `CompleteHeadline` reads the
  token.
- **C2 — CONFIRMED.** `vSpecular` is exported on `/glass` (W-LIQUIDHOVER, complete; 3
  references in `composables/glass/index.ts`) + arms non-dock glass tiers (Button glass
  variants + Card gated). W-LENSING added `useSpecularPointer` (the angle channel) on the
  same core. A non-dock glass-tier surface arms by adding `v-specular`.
- **C3 — FORWARD (Batch V).** `curlFBM` does NOT exist at HEAD — the shared FBM/curl GLSL
  chunk lands with the procedural waves (W-AURORA-WGPU establishes the shared WGSL chunk;
  the `.frag` `curlFBM` home `flow.glsl.ts` + the ≥3-consumer bar are satisfied when B1
  (aurora-curl-warp) + B5 (paper-grid-breathe) + the flowfield consume it). Recorded as a
  Batch-V intake; not yet confirmable.
- **C4 — CONFIRMED.** `--ease-out-expo` is the published name (W-MOTION-CANON, complete).
  speedtest binds it; no alias minted (= A2).

### New asks (B) — placed at their loci + sequenced (§D)

The no-WebGPU new asks ride the ONE 4.1.0 cut (B1's `.frag` arm, B2, B3, B4-EARLY so
the born-WebGPU viz consume it at birth, B7, B8, B9); the procedural tail (B1's WGSL
arm, B5, B6 + A3) sequences AFTER the strict WebGPU viz chain (W-GPU-SUBSTRATE →
W-AURORA-WGPU → W-GOOBLOB-WGPU → W-FLOWFIELD → W-CONCENTRIC, all SPEC). The
"parked-on-BB" posture collapses on the single `^4.1.0` bump at AW.W7-BB.

| ID | placement | prio | status |
|---|---|---|---|
| B1 aurora-curl-warp (`warpMode:'curl'`, Bridson) | follow-on to W-AURORA-WGPU; `.frag` arm on the 4.1.0 cut, WGSL arm after the viz chain; shared `curlFBM` | P1 | BOOKED (split-arm) |
| B2 dockmorph-cta-receive | W-DOCK-MORPH-FAMILY (complete) — confirm-or-build the external-CTA-morphs-into-dock seam (compositor-flat, PRM-seats) | P1 | BOOKED (in-repo, 4.1.0) |
| B3 desktop-reserve `min-block-size` | NEW in-repo wave — wide-axis chassis reserve, desktop dial, CLS≈0; deletes the speedtest App.vue interim | P1 | BOOKED (in-repo, 4.1.0) |
| B4 viz-pointer-physics `usePointerVelocityField` | NEW in-repo, EARLY (pre-W-GPU-SUBSTRATE so the born-WebGPU viz consume it) — shared composable, no own rAF, PRM `tick(0)`, accel term | P1 | BOOKED (in-repo, 4.1.0, early) |
| B5 paper-grid-breathe (`<Card grid animated>`) | after W-FLOWFIELD — ¼-res compute ≤4ms, PRM-static, `curlFBM`-shared | P2 | BOOKED (procedural tail) |
| B6 DotBlob 6th suite member | after W-FLOWFIELD (W-DOTBLOB) — imports A3's `sdf-core.wgsl`; substrate-single A–G + dot-blob gate | P3 | BOOKED (procedural tail) |
| B7 spaview-cache `<SpaView :max>` | NEW in-repo — caches inactive views, out-in; rewires AdminDashboardLayout | P2 | BOOKED (in-repo, 4.1.0) |
| B8 card-tier-alpha-pin | NEW in-repo — per-tier alpha canonical; speedtest register.css overrides delete on consume | P2 | BOOKED (in-repo, 4.1.0) |
| B9 spring-crisp `--spring-crisp` | NEW in-repo, CONDITIONAL — mint IFF the ≥2-consumer bar is met (5+ speedtest sites named); else consumers ride `--spring-snappy` | P2 | BOOKED (in-repo, 4.1.0, conditional) |

These B-asks are the cross-repo SCOPE additions consumed at their named loci; the
in-repo ones (B2/B3/B4/B7/B8/B9 + B1-`.frag`) are sequenced onto the 4.1.0 cut as
follow-on waves, the procedural tail (B1-WGSL/B5/B6/A3) onto a later `^4.x` after the
WebGPU viz chain. None blocks the cut.
