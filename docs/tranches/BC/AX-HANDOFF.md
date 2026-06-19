# BC — the speedtest-AX hand-off intake (Band 15) + the reconciliation map

> speedtest tranche **AX** (the consume-and-delete tranche, converged + Gate-1 ratified) delivered a
> 10-spec wave packet + Gate-1 ratifications + the coordination contract. **Determination (per AX +
> the BC posture): REOPEN BC, absorb as a new feature-band (Band 15), re-converge — do NOT open BD,
> do NOT in-flight-inject** (nothing has executed; absorb-then-reconcile is the clean path,
> structurally identical to the iter-21 + the feature-band reopens). The user adds: **address even
> the §6 out-of-scope items too.**
>
> HEAD re-verified at intake: `785a0993`, branch `tranche/BB`, published `4.0.1`, **85 waves** (already
> well past the packet's `339c41f8`/`2eba0c70` snapshot — BC added Bands 12/13/14 + SEARCH-CUSTOM
> since). The AX GAP claims re-confirmed against the live tree.

---

## 1 — The 10-spec reconciliation map (GAP → new wave · or fold into an existing wave · or already-ships)

The packet is precise about status; several specs RECONCILE into existing BC waves (no double-author).

| AX spec | status | BC disposition | band |
|---|---|---|---|
| **BC-W1** BorderProgress eager-graph-safe (composable dynamic-`import()` boundary; `spectrumStops` stays sync) | GAP | **NEW `BC.W-AX-BP-LAZY`** | 11 perf |
| **BC-W2** Dock CTA-receive seat + rest-geometry un-gate + FLIP reveal (`[data-cta-pending]` partial, plain `transition:opacity` NOT the morph-stagger) | GAP | **NEW `BC.W-AX-DOCK-CTA-SEAT`** (composes BB.W-DOCKMORPH-CTA; beside DOCK-ENGINE; DOCK_SPRING fenced) | 2 dock |
| **BC-W3** `/dock` subpath + pending API (`setPending()`/`clearPending()` on `useDockCtaReceive` return) | GAP | **FOLD into W2** (the re-export + the pending-state API) | 2 |
| **BC-W4** cockpit preset `[data-preset='cockpit']`→`2.75rem` + `--dock-label-ratio` (path fix: `typography/semantic.css:166`) | GAP | **NEW `BC.W-AX-DOCK-COCKPIT`** (2.75rem ratified Gate-1 Q6; closes the dock-oversize chronic with A-9) | 2 dock |
| **BC-W5** CompletionSeal — the hero-scale gold-draw seal + 4 `@property` motion tokens | GAP | **NEW `BC.W-AX-COMPLETION-SEAL`** — register **earned-GOLD** (Gate-1 Q2); relates to `W-PHASE-PALETTE` gold | 6 feedback |
| **BC-W6** `--metal-glow-blur`/`--metal-glow-opacity` (the gold catch-light, shared by loop sweep + one-shot headline) | GAP | **NEW `BC.W-AX-METAL-GLOW`** (extends BB.W-METAL-SHIMMER; gold per Gate-1 Q2) | 1 |
| **BC-W7** metric-badge hover (add `--metric-badge-hover-translate -2px`, scale `1.02→1.04`, shadow→`--shadow-cartoon-sm`) | PARTIAL (`components.css:50-57` has scale+shadow slots) | **NEW small `BC.W-AX-METRIC-HOVER`** (a value-lift, not new authoring) | 12 custom |
| **BC-W8** Skeleton `surface=glass` shimmer | **ALREADY-SHIPPED** (`Skeleton.vue`, 11 surface refs, PRM-honored) | **VERIFY clause in `BC.W-VISUAL-RECONCILE`** — the contrast verify (shimmer legibility over a translucent composited plate, light+dark) **GATES speedtest W0** → if it fails, author `--skeleton-shimmer-on-glass`. The one BC item on speedtest's critical path. | verify |
| **BC-W9** PaperGrid spacing + breathe (`<PaperGrid mode=static\|breathe>`, 64px default, one frequency, tier ladder, `.paper-grid` card-interior opt-in) | GAP | **RECONCILE into `BC.W-VIZ-PAPERGRID`** (the liquid paper-grid wave already owns the breathe; absorb the component API + the 64px/tier-ladder/card-interior + retire the `cards.css:55-61` 32px 4-layer stack) | 4 viz |
| **BC-W10** keystone `--glass-saturate-{tier}` per-rung knob | PARTIAL (alpha register + W-ONGLASS-FG SHIP; only the per-rung saturate is the gap — saturate is baked into the `--glass-blur-*` strings) | **RECONCILE into `BC.W-GLASS-LEGIBILITY-MEASURED`** — author ONLY the `--glass-saturate-{wash..overlay}` knob; do NOT re-author the alpha/W-ONGLASS-FG | 1 glass |

**Net Band-15 new waves: 6** (`AX-BP-LAZY`, `AX-DOCK-CTA-SEAT` (+W3), `AX-DOCK-COCKPIT`, `AX-COMPLETION-SEAL`, `AX-METAL-GLOW`, `AX-METRIC-HOVER`); **3 reconcile** into existing waves (W8→VISUAL-RECONCILE verify, W9→VIZ-PAPERGRID, W10→GLASS-LEGIBILITY-MEASURED).

## 2 — The §6 out-of-scope chronic asks (user: address these too → fold into BC)

| item | disposition |
|---|---|
| **Deck** | already **`BC.W-DECK`** (Band 10) — covered ✓ |
| **LiquidHover tier-root auto-arm** (the `vSpecular` leaf ships; the tier-root auto-arm is the gap) | **NEW `BC.W-AX-LIQUIDHOVER-AUTOARM`** (Band 1) — the tier-root auto-arm BB.W-LIQUIDHOVER specced; re-verify it landed in source, author the auto-arm if the gap is real; VISUAL-RECONCILE re-verifies |
| **animated-PaperGrid beyond BC-W9** | **`BC.W-VIZ-PAPERGRID`** covers (the `breathe` mode + the liquid-wave) — covered ✓ |
| **`deriveAurora` `avoidHues` option** | **FOLD into `BC.W-VIZ-AURORA`** — add the `avoidHues` config axis (a small additive option) |
| **`data-protagonist` MetricRow prop** | **FOLD into `BC.W-CONTROL-CUSTOM`** — the MetricRow protagonist-emphasis prop (a customizability knob) |

## 3 — Gate-1 ratifications (thread into the BC specs)
1. **Q2 earned-GOLD** (W5/W6): the completion register is gold, not phase-spectrum — the seal draws gold, `--metal-glow-*` is the gold catch-light.
2. **Q1 idle = skeleton-primary** (W8): the shipped `Skeleton variant=shimmer surface=glass` is speedtest's PRIMARY idle treatment → the contrast verify GATES speedtest W0 (do it first).
3. **Q5 functional skip arrows** (W2): the dock idle arrows are a functional, configurable consumer-side skip affordance — the `[data-cta-pending]` seat must NOT assume arrows are decorative/always-present.
4. **Q6 2.75rem** (W4): the cockpit control floor is the fixed value, not a range.

## 4 — The coordination contract (binding; `coordination/BC.md`)
- **Publish-then-consume**: a BC ship is consumable only after a published `4.0.x`/`4.1.0` bump + a speedtest `package.json` re-pin; speedtest typechecks against the PUBLISHED package (`feedback_published_dep_drift`).
- **AX writes only its own repo** — every glass-ui fix is this spec packet; AX never pushes to `tranche/BB`; revisions re-deliver the doc.
- **Re-verify the peer HEAD at each consume** (`feedback_constellation_baseline_drift`).

## 5 — Priority (speedtest most-wanted-first → BC sequence)
1. **BC-W8 contrast verify** — gates speedtest W0 (the idle skeleton). Cheapest, highest-leverage; FIRST.
2. **BC-W1 + W2 (+W3)** — BorderProgress lazy + dock-morph + CTA-receive (speedtest's biggest visual debt).
3. **BC-W4** — cockpit preset (closes the dock-oversize chronic).
4. **BC-W5/W6/W7/W9** — seal, gold glow, badge-hover, paper-grid.
5. **BC-W10 keystone last** — the `--glass-saturate-{tier}` knob (closes the "dark cards" chronic; speedtest begins the alpha-migration half now against the shipped `--glass-opacity-*`+W-ONGLASS-FG, the chroma-lift half waits on this ship).

## 6 — Intake path
Absorb via the triumvirate (verify-HEAD → plan/author the 6 new + 5 reconcile/fold + the §2 out-of-scope → CHALLENGE-REOPEN-2 → re-converge), AFTER the in-flight feature-band finish (`wjheldygx`) lands, to avoid double-spawn on the shared WAVE-INDEX/ORCHESTRATION/DAG.
