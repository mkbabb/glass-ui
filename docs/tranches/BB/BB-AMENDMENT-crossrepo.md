# BB — the cross-repo amendment (speedtest primitives · slides drive · kf/vjs augment)

**USER-DIRECTED 2026-06-16.** Adds to `BB.md`. Three directives: (1) BB **drives the extant slides tranche (N) in totality** — no longer coordination-only; (2) BB **builds the speedtest AW v2.1 primitives** (the authoritative ask: `speedtest/docs/tranches/AW/coordination/glass-ui-BB-ask-brief.md`); (3) **investigate kf K + vjs N** to augment + refine the primitives. The Batch-5 cross-repo band grows from coordination to a DRIVEN deliverable; a net-new PRIMITIVES band joins.

**The investigation (2026-06-16, read at HEAD):**
- **speedtest AW v2.1** ("The Living Instrument") — the ask-brief enumerates 5 P0 + 4 P1 + P2 primitives, each STILL-OPEN at 3.13.0. speedtest builds NONE (inv-16); BB builds + publishes; speedtest consumes via a `^` bump at AW.W7.
- **slides N** — the union tranche (til-briefing + feedback-coder); its two hinges are H-BA (the BA 4.0.0 publish — **NOW CLEARED**, published this turn) + H-DEPLOY (the user's re-publish greenlight — still pending; the site is down). So N's executable-now arm AND its H-BA arm (FC3-verified + ADOPT) are unblocked; only N.W-DEPLOY waits.
- **keyframes.js K** — active (repair + round-trip frontier); owns the deck-spring `springTimingFunction` + the KF-OSCILLATOR shared-oscillator ask; dispatched the VJ grammar to value.js (0.13.0).
- **value.js N** — heading to v1.0.0; pins glass-ui at the clean cut (now 4.0.0); the **OKLCH/shorter-hue spectrum helper** (for BorderProgress) belongs in its color core; ships the VJ grammar at 0.13.0.

The foreign-tree fence HOLDS for kf/vjs/speedtest (by-name asks + consume contracts, no edits to their trees). It is LIFTED for **slides** ONLY — the user explicitly directed BB to drive it (the orchestrator owns the slides index; agents stay read-only on git; the push/deploy stays USER-DOMAIN per slides N §4.7).

## §A1 — The PRIMITIVES band (Batch P — runs parallel with Batches 2-4, after the integrity floor + gestalt hardening)

Each wave: charge + consumers + acceptance + donor, from the ask-brief. The cross-repo deps are named.

### P0 — the living-chrome core
- **W-BORDER-PROGRESS** — progress paints as the element's BORDER: a `@property`-animated MASKED CONIC ring (radius-following, backdrop-intact, allocation-free — superior to a corner-squaring border-image), the brand-spectrum fill via the **value.js OKLCH/shorter-hue helper** (no chroma trough — a cross-repo CONSUME), a `coverage` prop (`full-ring`|`bottom-edge`), a 6-8px thickness envelope, a phase-edge milestone register. Build FRESH (no slides donor). Consumers: speedtest WC + WV2 (≥2). Acceptance: `<BorderProgress coverage :value>` on the card border + dock + survey band; speedtest retires its floating `PhaseTimeline`.
- **W-DECK** — lift `slides/src/deck/` (~1,600 LoC, unit+e2e-tested, the donor NAMES itself) into a SIBLING `@mkbabb/glass-ui/deck` subpath (NOT folded into `/carousel` — the deck is the full-viewport keyboard-paged aria-live PRESENTATION register, distinct from carousel's item-scroller): `DeckCore` (headless `useDeck`), `useDeckKeyboard` ← `deckKeys` (**focus-guarded** — Space/digit keep native control activation, the C6 fix), `<DeckPager>` + `pagerWindow` (focus survives a window recompute, never `<body>`; WCAG 2.5.8; role=group/aria-current), the `aria-live` announcer, `--spring-deck` (= keyframes.js `springTimingFunction`). **TRIGGERS the chronic `deck-subpath` disposition book** (speedtest survey + slides re-consume = ≥2). Consumers: speedtest WV2 + slides consumes-back. Acceptance: speedtest binds `useDeck` onto the survey machine; slides retires its own `src/deck/` onto the glass-ui deck (zero duplication).
- **W-DOCK-MORPH-FAMILY** — (a) the morph animates a COMPOSITOR TRANSFORM, not `inline-size` (no per-frame relayout — CDP Layout stays flat); (b) the reveal seats at the SETTLED geometry (no blank-icon partial-size interim); (c) **PRM SYNCHRONOUS SEAT** — under `prefers-reduced-motion` the geometry seats synchronously (TODAY a P0 TERMINAL failure: the dock collapses to a 10×74 blank sliver, every control painting outside the box); (d) `DockLayerGroup` self-reserves its peak-layer block-size (retire the consumer `--dock-host-reserve` guess); (e) `--dock-local-scale` `:root`-frozen preset. Consumers: speedtest WC + W7. Coordinates with the BA W-DOCK-MORPH-INSITU lineage (the in-situ morph) — this is the compositor + PRM + reserve REPAIR.
- **W-ON-GLASS-FG** — N13: a muted-foreground register whose contrast TARGET is the composited GLASS FILL, not `--background` (today `--muted-foreground` clears AA against the canvas but composites to a mid-grey over glass — the dark-theme whisper collapse, 1.15-3.29:1 measured) + the sibling `--input-on-glass` / `--progress-track-on-glass` rungs. MINE the slides `deck.css §1` TRUE-GLASS recipe for values (reference; build the token system fresh). Consumers: speedtest WG + WV1 + whole-app. Coordinates with the BA W-DARK-MATERIAL / adaptive-glass seam (a distinct contrast-target register, not a fork).
- **W-AURORA-SWRASTER** — a headless WebGL aurora fallback that does not crash under SwiftShader (a luminance-faithful CSS/2D fallback matching the WebGL composited ground, OR a stability guard). Consumers: speedtest CI/witness (the certifying captures). Coordinates with W-PAYLOAD-DEFER (the aurora split).

### P1
- **W-SCROLL-CARD** — the card scroll-shrink FAMILY (ABSORBS the Batch-3 W-CARD-COMPOSITE): (a) CardHeader-shrink-deep — fix the scoped-slot defect (the `.card-header--shrink` scroll-timeline lanes never match consumer-SLOTTED titles — 2 of 3 lanes structurally dead) + scroll-driven header background (transparent→painted on `--card-scroll`); (b) the `<ScrollCard>`/`<ScrollCardHeader>` family (larger header items shrink on scroll, compositor scroll-driven, no consumer rAF) — which also lands the A'-3 CLS fix (compositor-safe transform/opacity only, the keyframes never animate layout). Consumers: speedtest WV1. Gate: `proof:no-layout-animation`.
- **W-LIQUIDHOVER** — finish the tier-root specular auto-arm (interactive controls write `--mouse-x/y` so the pointer-following gleam works with ZERO per-consumer wiring; `useSpecularTracking` ships @3.13.0 but the tier-root auto-arm is incomplete) + the disco-grain pop kill (the `none→image` grain swap → an opacity cross-fade, direct-write, ~120ms). Consumers: speedtest WC.
- **W-PHASE-PALETTE** — N18: demote the chassis `[data-phase=complete] ⇒ --phase-color:--color-gold` to a `--phase-complete-color` CONSUMER token (default gold for back-compat) so the bus carries phase IDENTITY and the consumer chooses the ink (gold is EARNED, not the chassis default leaking onto every completion). Consumers: speedtest W3 + WV2.
- **W-PAPER-GRID-TEXTURE** — a `--paper-grid-texture` peer affordance so document-register cards opt their INTERIOR ground into the math/grid line-field (felt THROUGH the card, ~0.08; the brand pillar shows only in margins today). Consumers: speedtest W3 + WV1.

### P2 (refinements; speedtest ships green without them)
- **W-CONTROL-TOKENS** — TOGGLEITEM-CARD-RADIUS (N11: the `card` variant sets `rounded-card`, not `rounded-button`) + TOGGLEGROUP-RADIO-SEMANTICS (`role=radio`/`aria-checked` on the single-select chooser) + MetricRow label-align + icon-color tokens (primitive-internal control consumer scoped CSS can't reach without `:deep` — precept-6 forbidden) + the a11y pair (Toaster, FocusScope live-region/focus-trap). Consumers: speedtest WV1 + W3.

## §A2 — The SLIDES-DRIVE band (supersedes BB.md's W-SLIDES-HANDOFF — coordination → DRIVEN)

- **W-SLIDES-DRIVE** — drive slides Tranche N to completion. **H-BA is CLEARED** (4.0.0 published this turn). The orchestrator owns the slides index; agents read-only on git; the push/deploy stays USER-DOMAIN (slides N §4.7).
  - **Phase 1 (executable NOW)** — N.W-FC1 (the feedback-coder honesty pass: the metric name → L2 macro-F1, the retracted-0.72-floor rephrase, the 258-vs-1845 framing, research-as-audience), N.W-FC2 (the J-docs cherry-pick to main, unexecuted-marker), N.W-GATE (conformance + type-floor parity + the honesty machine-lock), N.W-FC3-verified (R5-11 fc-fourier G4 resolves against 4.0.0's FourierField root fix — NO deck workaround), N.W-ADOPT (pin `3.13.0`→`4.0.0` exact; `DeckGate.vue:70` `primary-audacious`→`solid`; DELETE the gray-arm self-engage opt-out `deck.css:1013-1023`).
  - **Phase 2 (after BB W-DECK ships at 4.1.0)** — the deck CONSUME-BACK: slides retires `src/deck/` onto `@mkbabb/glass-ui/deck`, re-pins 4.1.0 (the zero-duplication ≥2-consumer law closed).
  - **N.W-DEPLOY** — waits on H-DEPLOY (the user's re-publish greenlight; the site is a noindex holding page). Both decks publish together (one build, one CF Pages project). The orchestrator runs the pre-flight + the post-push live DELTA; THE USER pushes/deploys.

## §A3 — kf/vjs coordination (by-name asks; the foreign-tree fence HOLDS)

- **W-CROSSREPO-ASKS** — the by-name asks + consume contracts (no edits to the kf/vjs/speedtest trees):
  - **value.js (N → 0.13.0/v1.0.0):** ship the **OKLCH/shorter-hue spectrum helper** in the color core (glass-ui's W-BORDER-PROGRESS consumes it — the helper belongs in value.js, not glass-ui-local); pin glass-ui `4.0.0` now → `4.1.0` on the BB cut; the VJ grammar (scroll + perceptual ramp) lands 0.13.0. glass-ui's **W-PEER-SPINE** (Batch 5) admits value.js `^0.12.0 || ^0.13.0` (closes F-2).
  - **keyframes.js (K):** the **KF-OSCILLATOR** shared-oscillator phase (the speedtest idle-breath, currently a local clock-owner) — a by-name ask for the kf shared register; confirm the **deck-spring** `springTimingFunction` (W-DECK's `--spring-deck` consumes it). The **W-EASING-PRIMITIVE** (Batch 5) co-schedules with the kf donor study (the boundary law: curve MATH = value.js · playback/spring = kf · the editor COMPONENT = glass-ui).
  - **speedtest (AW):** bumps its `^` pin to `4.1.0` at AW.W7 (the R-CONSUME wave); its named-YELLOW consume-and-delete interims delete as each ask ships.

## §A4 — The cross-repo dependency graph + the consume cadence

```
value.js N (0.13.0)  ──OKLCH spectrum helper──►  glass-ui W-BORDER-PROGRESS
keyframes.js K       ──springTimingFunction───►  glass-ui W-DECK (--spring-deck)
                     ──KF-OSCILLATOR──────────►  (speedtest idle-breath; by-name ask)
slides N src/deck/   ──donor (lift)──────────►  glass-ui W-DECK (/deck) ──consume-back──► slides N phase-2
glass-ui 4.1.0 (BB)  ──the primitives──────────►  speedtest AW.W7 (^4.1.0 bump)
                     ──BA register fixes────────►  slides N.W-ADOPT (pin 4.0.0, NOW)
```

**Cadence (the user's fold-all decision holds):** glass-ui ships the primitives at the single **4.1.0** cut (the BB close). speedtest pins `^4.1.0` at AW.W7. value.js ships the OKLCH helper at 0.13.0 (glass-ui's W-BORDER-PROGRESS consumes it; until then, a glass-ui-local interim spectrum is the consume-and-delete). slides adopts 4.0.0 NOW (the N.W-ADOPT — H-BA cleared), then re-pins 4.1.0 for the deck consume-back. The `--run release` full battery (W-CLOSE-BATTERY) gates the 4.1.0 cut.

## §A5 — DAG placement + the reconciliations

- The PRIMITIVES band (Batch P) runs PARALLEL with Batches 2-4 (forward feature work), after the Batch-0 integrity floor + the Batch-1 gestalt hardening (every primitive's gestalt verdict rides the HARDENED `proof:ba-gestalt`).
- **W-SCROLL-CARD ABSORBS W-CARD-COMPOSITE** (the A'-3 CLS fix is part of the compositor-safe scroll-shrink family — one card-scroll wave, not two).
- **W-AURORA-SWRASTER coordinates with W-PAYLOAD-DEFER** (the headless fallback vs the lazy-split — distinct, sequenced).
- **W-DOCK-MORPH-FAMILY** extends the BA W-DOCK-MORPH-INSITU lineage (the compositor + PRM-seat + self-reserve repair on the in-situ morph).
- **W-ON-GLASS-FG** is a distinct contrast-target register beside the BA adaptive-glass seam (not a fork — it targets the composited fill, not `--background`).
- **W-SLIDES-DRIVE** supersedes BB.md's coordination-only W-SLIDES-HANDOFF.

Net: BB grows by **10 primitive waves + W-SLIDES-DRIVE + W-CROSSREPO-ASKS** (W-CARD-COMPOSITE folds into W-SCROLL-CARD). The per-wave specs follow (the second authoring pass).
