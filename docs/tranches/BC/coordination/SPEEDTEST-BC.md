# SPEEDTEST-BC — the speedtest-AX (Band 15) coordination relay

> The by-name cross-repo relay for the speedtest-AX intake (Band 15). glass-ui authors
> ZERO sibling-tree edits — the foreign-tree fence (inv-26) is binding; every speedtest
> edit lands in the SPEEDTEST repo on ITS `^4.x` bump. This doc is the formalized
> consume-and-delete ledger + the version/delete-trigger contract for the Band-15 waves.
> The broader 9-ask fleet adopt (the 5-interim consume-and-delete sweep) is
> `BC.W-SPEEDTEST-ADOPT` (Band 10) — this doc records the Band-15 AX-specific folds that
> RIDE the same publish-then-consume bump.

## Freshness header (the three-sibling HEAD + the publish reality)
- **glass-ui** — published `4.0.1`; branch `tranche/BB`; HEAD `3f013523` (the BC tranche-dev base). The BC cut version is USER-DOMAIN at `BC.W-CUT` (`4.0.x`/`4.1.0` or higher — `BC.W-SPEEDTEST-ADOPT` S5 records the re-point-at-the-cut).
- **speedtest** — HEAD `aed645e6`; pinned `@mkbabb/glass-ui: ^4.0.1`, `@mkbabb/value.js: ^0.13.0`, `@mkbabb/keyframes.js: ^4.3.0` (fully peer-aligned with glass-ui's own pins). Adoption HELD on `^4.0.1` because 4.1.0 never cut (the BB close never ran).
- **value.js** — HEAD `9fce504`.
- **keyframes.js** — HEAD `e2375b8`.
- *Re-verify the peer HEAD at each consume (`feedback_constellation_baseline_drift`).*

## The binding coordination contract (from `AX-HANDOFF.md §4`)
- **Publish-then-consume.** A BC ship is consumable ONLY after a published `4.0.x`/`4.1.0` bump + a speedtest `package.json` re-pin; speedtest typechecks against the PUBLISHED package (`feedback_published_dep_drift`). The Band-15 folds below land in the speedtest repo on its W3 (its `^4.x` re-pin), NEVER in glass-ui.
- **AX writes only its own repo** — every glass-ui fix is the Band-15 wave specs; AX never pushes to `tranche/BB`; a revision re-delivers the doc.
- **Re-verify the peer HEAD at each consume** (`feedback_constellation_baseline_drift`).

---

## speedtest folds + version+delete-trigger (the Band-15 AX-specific consume-seam)

Each row: the glass-ui wave that lands the primitive · the speedtest consume (the by-name ask) · the delete-trigger (what evaporates on the bump) · the publish-then-consume gate (the version the consume needs).

| # | glass-ui wave (the SHIP) | speedtest consume (the ASK) | delete-trigger (what evaporates) | publish-then-consume |
|---|---|---|---|---|
| 1 | **`BC.W-AX-BP-LAZY`** — BorderProgress value.js spectrum walk behind a dynamic `import()` boundary; `spectrumStops` stays sync; the `var()` fast path value.js-free | the speedtest results-card binds `<BorderProgress coverage="bottom-edge" :value :stops="phasePalette" :milestones>` at FIRST PAINT — the lazy boundary keeps value.js OFF the results-card's critical-path chunk | NO speedtest-side interim to delete — a transparent payload improvement the consumer inherits on the bump (the results-card's first-paint chunk drops the value.js weight). If `phasePalette` is `var(--chart-{phase})` tokens it rides the value.js-free fast path; concrete hex anchors load value.js on demand (off first paint) | the BC `4.0.x`/`4.1.0` cut publishes the lazy-boundary chunk; speedtest re-pins `^4.x` (its W3) |
| 2 | **`BC.W-AX-DOCK-CTA-SEAT`** — the `[data-cta-pending]` landing seat + the static resting-geometry reserve + the plain-`transition:opacity` FLIP reveal + `setPending()`/`clearPending()` on `useDockCtaReceive` + the `/dock` re-export | the speedtest dock/survey band wires a CTA morphing INTO the dock control on completion/advance — `setPending()` arms the seat (no box jump), `receive()` flies the CTA, `clearPending()` reveals the seated content; imports `useDockCtaReceive` from `@mkbabb/glass-ui/dock` | any speedtest hand-rolled CTA-into-dock animation (a bespoke fly-in) evaporates onto the shipped seam; the seat partial + the pending API are the consume | the BC cut publishes the `/dock`-re-exported `setPending`/`clearPending` + the `src/styles/dock/cta-seat.css` partial; speedtest re-pins `^4.x`. Q5: the seat is rect-driven — the speedtest functional skip arrows are NOT assumed decorative/always-present |
| 3 | **`BC.W-AX-DOCK-COCKPIT`** — `[data-preset="cockpit"]`→ fixed `2.75rem` control floor + `--dock-label-ratio` (label tracks control by proportion) | the speedtest cockpit surface sets `data-preset="cockpit"` on its dock + (optionally) a `--dock-label-ratio` override for its cockpit-tight identity | any speedtest hand-rolled dock-shrink override (a local `--dock-control-size`/font-size clamp on the cockpit dock) evaporates onto the named preset; the dock-oversize chronic (A-9) closes | the BC cut publishes the preset + the `--dock-label-ratio` knob; speedtest re-pins `^4.x`. Q6: the cockpit floor is the FIXED `2.75rem`. The speedtest cockpit-tight `--dock-label-ratio` is a preset-in-consumer (the library default reproduces the subheading rung; speedtest's tighter ratio is its own) |
| 4 | **`BC.W-AX-COMPLETION-SEAL`** — `<CompletionSeal>` (`/completion-seal`): the hero-scale earned-GOLD draw-on seal + 4 `@property` motion tokens, reading the W-PHASE-PALETTE `--phase-complete-color`/`--color-gold` register | the speedtest mounts `<CompletionSeal play>` on its speedtest-complete / personal-best surface — the gold seal marks the finished run (the C1 `--phase-complete-color` consumer already SETS the completion ink; the seal reads it) | any speedtest hand-rolled completion-mark animation (a bespoke check/badge draw) evaporates onto the shipped seal | the BC cut publishes `/completion-seal`; speedtest re-pins `^4.x`. Q2: the seal is GOLD (earned-gold) — the speedtest C1 `--phase-complete-color` override re-inks the seal in lockstep |
| 5 | **`BC.W-AX-METAL-GLOW`** — `--metal-glow-blur`/`--metal-glow-opacity` (the gold catch-light on the metal-shimmer family) | the speedtest gold wordmark / personal-best garnish inherits the lit-metal glow transparently (it composes `.metal-gold`) | NO speedtest-side interim to delete — an inherited visual upgrade on the metal family (the gold reads as lit metal on the bump) | the BC cut publishes the glow; speedtest re-pins `^4.x`. A speedtest preset wanting a different glow overrides `--metal-glow-*` from its `:root` (presets-in-consumers) |
| 6 | **`BC.W-AX-METRIC-HOVER`** — the metric-badge value-lift (`--metric-badge-hover-translate` -2px, scale 1.04, `--shadow-cartoon-sm`) | the speedtest metric badges (the result tiles) inherit the value-lift transparently (they compose `.metric-badge`) | NO speedtest-side interim to delete — an inherited visual upgrade on the hover (the metric pill lifts on the bump) | the BC cut publishes the lift; speedtest re-pins `^4.x`. A speedtest preset wanting a different lift overrides `--metric-badge-hover-*` (presets-in-consumers) |
| §6 | **`BC.W-AX-LIQUIDHOVER-AUTOARM`** — STRUCK-already-ships (the tier-root specular auto-arm SHIPS: Button `specularArmed`/`v-specular`, the four dock controls, Card, `proof:glass-cohesion` + `liquid-hover.spec.ts`) | the speedtest C2 vSpecular confirm (a non-dock glass tier carries `v-specular`) is a CONFIRM-no-edit — already set in the speedtest tree; re-confirms green on the bump | NO consume, NO delete — the auto-arm is shipping source; the live paint re-verify rides `BC.W-VISUAL-RECONCILE` unit 2 | the BC cut + speedtest re-pin re-confirm the C2 binding green (the auto-arm shipping is what makes the C2 confirm hold) |
| §6b | **`BC.W-VIZ-AURORA`** (the §6-out-of-scope `avoidHues` fold) — the additive `deriveAurora` `avoidHues` config axis (exclude named hue bands from a seed-derived palette — the teal-on-navy-by-construction guard) | a speedtest aurora-palette-derive passes `avoidHues` to keep named hue bands out of its derived background | NO speedtest-side interim to delete — an additive opt-in config axis the consumer adopts on the bump (no prior workaround to evaporate) | the BC cut publishes the `avoidHues` axis on the aurora configurator; speedtest re-pins `^4.x` |
| §6c | **`BC.W-CONTROL-CUSTOM`** (the §6-out-of-scope `data-protagonist` fold) — the additive `data-protagonist` MetricRow emphasis prop (the focal metric lifts to the display/audacious rung, reading the existing `--metric-row-*` cohort; the ONE focal color-event per W-SUFFUSE) | the speedtest marks its hero/protagonist metric `data-protagonist` for the one focal emphasis event | NO speedtest-side interim to delete — an additive emphasis prop the consumer adopts on the bump | the BC cut publishes the `data-protagonist` prop + the `--metric-row-*` emphasis register; speedtest re-pins `^4.x` |

### The version-reconcile clause (the AW relay `4.1.0` drift)
The cut VERSION is whatever `BC.W-CUT` publishes (USER-DOMAIN at the cut). The speedtest AW-relay docs that hard-name `4.1.0` re-point to the ACTUAL cut version AT THE CUT — recorded as a `BC.W-CUT`/`BC.W-SPEEDTEST-ADOPT` S5 acceptance clause, NOT a silent reconcile here. speedtest pins `^4.x` (one bump; the "parked-on-BB" posture collapses).

### The dest-soundness map (every consume names a real glass-ui surface)
| consume | the dest (must exist in `package.json` exports / a built token, post-BC-cut) |
|---|---|
| `<BorderProgress …>` (lazy) | `./border-progress` subpath (EXISTS; the lazy boundary is internal to the chunk) |
| `setPending`/`clearPending` + `useDockCtaReceive` from `/dock` | `./dock` subpath (EXISTS; the re-export + the seat partial land at BC) |
| `data-preset="cockpit"` + `--dock-label-ratio` | the `[data-preset="cockpit"]` CSS register + the `--dock-label-ratio` token (land at BC) |
| `<CompletionSeal play>` | `./completion-seal` subpath (NEW at BC — `proof:subpath-enumeration` +1) |
| `.metal-gold` glow / `.metric-badge` lift | inherited CSS upgrades on shipped utilities (no new export) |
| C2 `v-specular` | `./glass` subpath (EXISTS; the tier-root auto-arm ships) |
| `avoidHues` aurora-derive axis (§6b) | the aurora configurator `avoidHues` option (lands at BC — additive config axis, no new subpath) |
| `data-protagonist` MetricRow (§6c) | the `data-protagonist` prop + the `--metric-row-*` emphasis register (land at BC — additive prop on the shipped MetricRow) |

### The binding-verification sweep (the chronic)
The consumes + confirms are verified by a REAL install + typecheck on the speedtest sibling on its `^4.x` bump, NOT a paper handshake — the stale-API/inert-binding class (`memory glass_ui_binding_verification` / `precept_binding_verification_stale_no_op`: a stale `:setPending`/`v-model` binding renders fine but is INERT; vue-tsc + units miss it, only the e2e/typecheck catches). Swept on the bump.

### The foreign-tree fence (inv-26, the headline invariant)
glass-ui edits ZERO sibling tree. This doc + the Band-15 wave specs are the by-name relay — the ONLY channel. Every speedtest edit (the `<BorderProgress>`/`<SpaView>`/`data-preset`/`<CompletionSeal>` wiring + the `package.json` `^4.x` bump) lands in the speedtest repo on ITS bump. The `proof:speedtest-adopt` S4 machine-lock (`BC.W-SPEEDTEST-ADOPT`) reds any `../speedtest` write-path in a glass-ui wave's File Bounds.

### Priority (speedtest most-wanted-first → BC sequence, from `AX-HANDOFF.md §5`)
1. **BC-W8 contrast verify** — gates speedtest W0 (the idle skeleton). The one BC item on speedtest's critical path; routed to `BC.W-VISUAL-RECONCILE` (the Skeleton `surface=glass` shimmer contrast verify over a translucent composited plate, light+dark). Do FIRST.
2. **BC-W1 + W2 (+W3)** — BorderProgress lazy (`BC.W-AX-BP-LAZY`) + dock CTA seat (`BC.W-AX-DOCK-CTA-SEAT`, folds W3) — speedtest's biggest visual debt.
3. **BC-W4** — cockpit preset (`BC.W-AX-DOCK-COCKPIT`) — closes the dock-oversize chronic.
4. **BC-W5/W6/W7** — seal (`BC.W-AX-COMPLETION-SEAL`), gold glow (`BC.W-AX-METAL-GLOW`), badge-hover (`BC.W-AX-METRIC-HOVER`).
5. **BC-W9/W10** — paper-grid (reconciled into `BC.W-VIZ-PAPERGRID`), the `--glass-saturate-{tier}` keystone (reconciled into `BC.W-GLASS-LEGIBILITY-MEASURED`).
