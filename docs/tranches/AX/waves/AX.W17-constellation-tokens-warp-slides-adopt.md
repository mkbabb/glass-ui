# AX.W17 — Constellation: light/dark tokens + the drawOverlay/focal-warp seam; slides adopts; README

**Band** E · CONSTELLATION · **Severity** major · **dependsOn** AX.W00 (the π visual-runtime lane — the
close-criterion machinery this interaction wave's live audit + warp π-gate run inside) · **Charter** AX.md
§3 (the `### AX.W17` block, lines 925-999) + §4 note 12 (publish-currency: slides MEASURED published 3.6.0,
so the adoption is gated on the AX cut PUBLISHING — verify-against-HEAD then publish) + §4 note 15 (§15
click-to-warp is NET-NEW DESIGN, not a port — the focal-node first-class seam + the FORBID-useSpring
integrator) + §4 note 16 (the constellation is a DECORATIVE proximity-graph, NOT a data-graph renderer —
the explicit abstraction-gap non-goal; PLAIN-hsl light/dark, NEVER `light-dark()` into Canvas2D) + §2b
band-E precept row · **Audit** `deep-audit-corpus.json` slice `library-optimum` (index 24, findings F0 the
unreconciled greenfield extraction + F1 the palette-intelligence left in slides) + `constellation-analysis-corpus.json`
result[18] (slice `constellation-warp-design` — the 12-finding §15 design corpus: the premise correction,
the focal-node split-brain, the FORBID-useSpring integrator, nearestNode, LIVE-TARGET tracking, the
identity-ride arrival, the deck-scale `toLocal` mapping, the PRM policy, the warp π-gate) + result[29]
(slice `harden:aurora-blob-constellation` — the adversarial critique: PREFER the least-new-API focal seam
over a single-consumer `stepOverlay` hook; run the live audit on BOTH light and dark grounds) +
result[19] (slice `leverage:slides` — slides is the named consumer #2).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on FOUR falsifiable witnesses against HEAD `eaba94f` (the batch-1 integration,
UNPUBLISHED). The constellation ships the neutral MECHANICS but neither the PALETTE INTELLIGENCE nor the
focal/warp seam; slides still runs a 510-line duplicate.

- **RED witness 1 (ZERO `--constellation-*` tokens in the library stylesheet — the headline visibility
  gap).** `grep -rn "constellation" src/styles/` returns **EMPTY** (verified — no hits anywhere under
  `src/styles/`). The library ships NO `--constellation-*` default token block — no light arm, no `.dark`
  arm. `readPalette` (`constellationField.ts:95-105`) reads only **THREE** tokens
  (`--constellation-node` / `--constellation-node-dim` / `--constellation-line`) and falls back to a
  hardcoded three-hex `DEFAULT_PALETTE` (`:88-92`). The edge alpha `0.17` (`:207`) and the pointer-web
  alpha `0.24` (`:252`) are MAGIC-NUMBER literals in the paint passes — the exact values slides promoted to
  `--constellation-edge-alpha` / `--constellation-edge-anomaly-alpha` / `--constellation-alpha` tokens
  because `0.17` was below the cream perceptual floor. So the dark-mode-lift, the field-yields-to-type
  alpha, and the per-mode edge multipliers — the H.W4 legibility intelligence — live ENTIRELY in slides
  `deck.css`, captured NOWHERE in the library. RED: a consumer dropping in `<Constellation>` gets a lattice
  that is invisible on dark and below-floor on cream, with no library token to retune. The falsifiable
  assertion: *`grep -rn "\-\-constellation-" src/styles/ = 0 hits` AND `readPalette` reads `< 6` tokens.*

- **RED witness 2 (NO focal-node concept — the engine cannot warp or drift; drawOverlay is paint-only).**
  `constellationField.ts:110` states it baldly: *"No node is pinned — every node drifts (pinning a focal …"*.
  `seedField` pins nothing; there is no `focalIndex`, no `warpStep`, no `nearestNode`, no per-axis warp
  spring. `Constellation.vue:135` runs `drawOverlay?.(c, field, now)` AFTER `stepField` (`:124`) — a pure
  PAINT pass that **structurally cannot mutate node position** (the field is already stepped + read for the
  frame). `defineExpose({ field })` (`:179`) is the ONLY imperative seam — no `warpTo`, no `warpOnClick`
  prop. The falsifiable assertion: *`grep -rn "focalIndex\|warpTo\|warpStep\|nearestNode" src/components/custom/constellation/`
  = 0 hits.* RED: the §15 click-to-warp interaction the charter routes to W17 does not exist in EITHER repo
  (grep-proven across `slides/src` + `glass-ui/src` — `warpTo|nearest|snapToNode|closest.*lattice` = 0
  implementation hits; the only matches are the AX REQUIREMENTS prose), so the warp is NET-NEW DESIGN — the
  engine has no seam to express it.

- **RED witness 3 (slides runs a 510-line duplicate — the adoption loop never closed).** slides
  `src/decks/til-briefing/constellation.ts` is a 510-line `createConstellations` data-canvas scanner with a
  hand-rolled shared rAF + the `drift()` auto-anomaly re-targeter (`:174-195`). `grep "glass-ui/constellation"`
  across slides = **NOT IMPORTED**. The library demo story (`demo/stories/substrates/constellation.vue`) is
  the ONLY consumer of the AW.W17 component — its own comment (`:5-6`) names "the slides anomaly-ring deck
  (H.W10)" as the second consumer that was **never delivered**. The ≥2-consumer invariant is satisfied ON
  PAPER (demo story) but the REAL intended consumer never ported; the F-tranche `L05` KEEP-LOCAL verdict was
  never revisited and the duplication ossified. RED: two parallel constellation implementations, the
  consumer copy un-deleted.

- **RED witness 4 (a `light-dark()`-into-Canvas2D leak is unguarded at the library layer).** The W30 slides
  cardinal defect (`constellation.ts:107` reads the neutral edge color from `--foreground`, a `light-dark()`
  value Canvas2D SILENTLY REJECTS → `strokeStyle` stuck on the previously-set red accent → 86.3% red
  splatter) generalizes to the LIBRARY: there is NO static gate forbidding a `light-dark(` value inside a
  `--constellation-*` token, and `--constellation-line` is a plain-hex fallback today with NO library-shipped
  light/dark arm — the moment the library ships the token block, a `light-dark()` declaration would
  reintroduce the exact W30 defect at the library layer. The falsifiable assertion: *no
  `no-light-dark-in-constellation-token` gate exists at HEAD (`ls scripts/proof-constellation-tokens.mjs` =
  absent).* RED: the cardinal Canvas2D-color defect has no library-layer guard.

The wave is RED at HEAD on all four; the HardGate below drives each to GREEN (token-block presence +
readPalette-full-set, the no-`light-dark(` static assertion, the focal-warp render observation, and the
slides-deletion adoption gate gated on the AX publish).

---

## Goal

Complete the constellation abstraction — ship the `--constellation-*` light/dark legibility token block the
component reads in full, promote the focal node to a first-class engine concept with a click-to-warp + drift
spring seam (one mechanic, two target-sources), and re-point slides onto a thin `<Constellation :draw-overlay>`
wrapper that DELETES its 510-line `constellation.ts` — so a consumer drops in a legible-on-both-grounds
lattice with zero tuning and only the brand accent is theirs.

---

## Scope (the gestalt fix — the palette intelligence is library identity; warp+drift are ONE seam; no slides hack)

The audit's findings converge on one architectural truth the AW.W17 extraction missed: it lifted the
neutral MECHANICS but treated the dark-mode-lift / field-yields-to-type alpha / per-mode edge multipliers as
"consumer skin" when they are **universal legibility, not deck-identity** (NCSU-red is the deck identity; a
node color that reads on a dark ground is universal). And the §15 click-to-warp the charter routes here is
NET-NEW DESIGN that drawOverlay structurally cannot carry. This wave ships BOTH halves and re-points slides.

### 1. Token VOCABULARY reconcile — adopt slides' richer set as library identity (slice 24 F1)

Ship a `--constellation-*` block in `src/styles/tokens.css` with a **light arm** (`:root`) and a `.dark`
arm carrying the H.W4-derived legibility values (node lifted off the dark ground, the field-yields-to-type
alpha, the per-mode edge multipliers). Adopt slides' RICHER set as canonical:

- `--constellation-node` / `--constellation-node-dim` — the two node tones (the dark arm LIFTS them off the
  ink ground, the H.W4 fix).
- `--constellation-line` / `--constellation-edge` — resolve the edge-vs-line naming: slides uses `edge-*`
  for the multipliers; the BASE stroke color is `--constellation-line`. The component reads
  `--constellation-line` as the hairline stroke and the `edge-*` tokens as the alpha multipliers. **MUST be
  a plain-hsl token, NEVER `--foreground`** (the W30 leak — `--foreground` is a `light-dark()` value Canvas2D
  rejects).
- `--constellation-edge-alpha` — replaces the magic `0.17` edge hairline alpha (`constellationField.ts:207`).
- `--constellation-edge-anomaly-alpha` — the anomaly-proximity edge multiplier.
- `--constellation-alpha` — the field-yields-to-type knob (the global field dimmer slides promoted so the
  lattice recedes behind type).
- `--constellation-accent` — the anomaly tint. **STAYS a consumer override** (slides aliases it to
  `--ncsu-red`) — that is the legitimate preset boundary (presets-in-consumers); the library ships a neutral
  default.

Wire `readPalette` (`constellationField.ts:95-105`) to read the **FULL set** with the library tokens as
fallbacks; make the paint passes READ the alpha tokens (the `0.17` / `0.24` literals at `:207` / `:252`
become `var(--constellation-edge-alpha)` / `var(--constellation-alpha)` reads, resolved through the same
`getComputedStyle` probe). **PLAIN-hsl, NEVER `light-dark()`** at the token declaration — Canvas2D silently
rejects `light-dark()` into `strokeStyle`/`fillStyle` (the W30 cardinal defect); the light/dark split is the
`:root` vs `.dark` cascade, not a `light-dark()` function.

### 2. Focal node + click-to-warp — NET-NEW DESIGN (§4 note 15; result[18]) — RATIFY-BEFORE-IMPL

**§15's "first shipped in the slides constellation, GENERALIZE it" framing is a FACTUAL ERROR** (grep-proven:
`warpTo|nearest|snapToNode|closest.*lattice` = 0 hits in either repo). W17 AUTHORS the click-to-warp; slides
`drift()` is the architectural ANALOG (same node-position-mutation class), NOT a source to port. The
implementer MUST NOT hunt for a non-existent slides source.

**The design thesis (the headline — DRY/KISS resolution):** *drift and warp are THE SAME mechanic — "spring
the focal node toward a target node" — differing only in what PICKS the target (a periodic auto-pick for
drift, a click for warp).* ONE focal-node position spring + a pluggable target-source resolves §15's warp,
W17's "documented drift escape," AND the slides-deletes-constellation.ts goal in a SINGLE seam. This is the
precept-correct answer (no second parallel hook, no slides hack).

**RATIFY-BEFORE-IMPL — the focal-node seam shape (the load-bearing fork the adversarial critique flagged).**
result[29] warns that a NEW single-consumer `stepOverlay(field, k, now)` hook is the overfit anti-pattern
(one consumer = slides). The RECOMMENDED disposition (the charter §3 block already chose it; the adversarial
critique corroborates the LEAST-new-API direction): **promote the FOCAL NODE to a first-class LIBRARY
concept** — NOT a generic consumer-mutation hook — resolving the math/chrome split-brain (the consumer owns
WHICH node is focal + its SKIN via `drawOverlay`; the library owns its POSITION + spring):

1. **Focal-node model in `ConstellationField`.** An optional `focalIndex?: number` field + a per-axis
   (x, y) warp spring the engine STEPS inside `stepField` (the existing per-frame call). `drawOverlay`
   PAINTS the focal node at its engine-owned position (`field.nodes[field.focalIndex]`). This ONE seam
   carries BOTH warp and drift — node-position mutation `drawOverlay` cannot express — resolved by ONE
   first-class concept, not a second parallel hook. (This is STRICTLY LESS new API than the slice-24-F0
   `stepOverlay` hook: a `focalIndex` + `warpTo` is the focal node promoted to a typed field, not a generic
   mutate-the-field callback. The adversarial critique's least-new-API preference is honored by NOT shipping
   the generic hook.)

2. **`nearestNode(field, px, py, excludeIdx)`** — a linear **O(count)** min-d² scan over `field.nodes`
   (count 64 default — negligible, no spatial index; matches the existing O(count²) edge pass accepted at
   `README:186`). "Lattice point" = the nearest **drifting NODE** (the constellation has NO fixed lattice;
   every node drifts) — state this EXPLICITLY to kill the §15 wording ambiguity. EXCLUDE the focal node from
   its own candidate set; a degenerate (cursor exactly on focal) **no-ops**.

3. **LIVE-TARGET tracking** — store the target node **INDEX** (not a click-time position snapshot); each
   frame the warp spring re-reads `field.nodes[targetIdx].{x,y}` as its LIVE target, so it CHASES the
   drifting target and arrives ON it (a frozen snapshot lands the mark next-to the moved node — visually
   wrong). **Arrival = IDENTITY-RIDE:** on settle, the focal node's spring target stays the chosen node's
   live position, so the focal mark RIDES that node's drift until the next warp re-points it. The focal node
   remains a designated index that re-points on each warp; **node count is conserved**.

4. **Spring math — a dt-stepped 2nd-order critically-damped integrator advanced INSIDE `stepField` (a new
   `warpStep(field, dt)`), NOT `useSpring`. EXPLICITLY FORBID `useSpring` HERE.** `useSpring` wraps
   `SpringProgress.play()` which spawns its OWN rAF bound to a reactive ref — a SECOND rAF outside the
   parked-substrate contract would DEFEAT the offscreen/tab-hidden/PRM freeze the whole `useCanvas2D`
   substrate exists to provide. Reuse the keyframes.js `(response, dampingFraction)` param model but NOT its
   rAF ownership: `x += v*dt; v += (-2*zeta*omega*v - omega²*(x - target))*dt` with `omega = 2*PI/response`;
   per-axis (x, y) springs on the focal node; `now`-delta gives `dt` (**clamp ~50ms** for tab-throttle /
   park-resume resilience — a clamped dt also resolves the offscreen-park-mid-warp teleport for free).

5. **API seam** — `warpTo(point)` imperative method via `defineExpose` (the canonical low-level seam,
   matching the existing `defineExpose({ field })` at `Constellation.vue:179`) + a `warpOnClick?: boolean`
   prop as the SUGAR (wires the host `pointerdown` already added at `:175` for ripples → `nearestNode` →
   `warpTo`). **Coordinate mapping:** `warpTo(clientX, clientY)` reuses the EXISTING `toLocal`
   (`Constellation.vue:145-152` — `getBoundingClientRect` → canvas-local px) so the click lands in
   canvas-local px under any CSS scale/zoom (the deck-scale invariant at `README:163-165`); `warpTo(point)`
   accepting already-local px is the lower primitive. Document BOTH.

6. **PRM policy (STATE it, don't accident it).** Warp follows the ripple/steer precedent: **DISABLED under
   `prefers-reduced-motion`** (the click does not warp; the focal node stays put — consistent with the
   pointer reactivity already gated on `!handle.reducedMotion` at `Constellation.vue:130,144`). The `dt`
   clamp in `warpStep` is independent of PRM (it guards a park/resume gap on the active-motion path).

### 3. slides adopts — consumer #2, gated on the focal/warp seam landing (slice 24 F0; §4 note 12)

slides is the NAMED consumer #2: build its anomaly skin as a `drawOverlay` pass (pulse ring + core +
resolved-check + dashed callout label, reading `--constellation-accent` → `--ncsu-red`) + a thin
`<Constellation :draw-overlay>` wrapper, replace its bespoke `drift()` with the engine's focal-node spring
(drift becomes "warp to a periodically-chosen random node" — the same seam, an auto target-source), and
**DELETE `src/decks/til-briefing/constellation.ts` entirely (510 lines)**. The deletion is CONTINGENT on the
focal/warp seam landing HERE (drift+warp cannot move through a read-only overlay). **The adoption leg is a
SLIDES-side change routed to AX.W30/W31** (the L band; slides is a separate repo, tracked) and is **gated on
the AX cut PUBLISHING** (§4 note 12 — slides MEASURED published 3.6.0; the focal/warp seam is at-HEAD-only
until the AX publish). W17 OWNS the library-side seam + tokens + README; W30/W31 execute the slides port.
**Other consumers:** fourier (cream+ink — the SECOND token-driven ground, add to the visual-truth matrix;
gated on its pin bump), words (backdrop/atmosphere once it executes).

### 4. README — research-backed, canonical-readme-shape (band-E precept)

Document the token vocabulary (the full `--constellation-*` set + which is library-legibility vs the single
`--constellation-accent` consumer-preset boundary), the focal-node / warp-and-drift unified seam (`warpTo` +
`warpOnClick` + the FORBID-useSpring rationale + the deck-scale `toLocal` mapping + the PRM policy), and the
NON-GOAL (§5 below). Research-backed per the canonical-readme-shape precept.

### 5. Non-goal — the constellation is DECORATIVE, NOT a data-graph renderer (no-overfitting; §4 note 16)

Carry an EXPLICIT abstraction-gap non-goal: the constellation is a **DECORATIVE random-seeded
proximity-graph**, NOT a DATA-graph renderer — it will **NOT** absorb semantic fixed-topology graphs
(value.js conversion graph, slides node-flow charts). Routing a semantic graph through `drawOverlay` would
FAIL (drawOverlay paints OVER a random field it cannot pin to fixed nodes). A data-graph primitive, if ever
wanted, is a SEPARATE component, NOT constellation prop-bloat. State this in the README so the seam is not
mis-adopted.

### 6. Canvas2D substrate ride (coordinate with AX.W37)

The `drawOverlay` + focal-warp seam rides the W17 `useCanvas2D` substrate the component already composes;
W37 ships `resolveCanvasColor` (the probe-span `light-dark()` → `rgb()` resolver) — W17 reads the
plain-hsl `--constellation-*` tokens (NO `light-dark()` by construction), so the W37 resolver is a
COORDINATE, not a hard dependency: if a future token EVER needs `light-dark()` it routes through W37's
resolver. W17 does NOT edit `useCanvas2D` (W37 owns it).

## Live-feedback fold (§23/§24)

### 7. The `--constellation-alpha` default is RECESSIVE-calibrated per-mode (REQUIREMENTS §23.3; reconciles §12/§16/§24)

§1 above already ships `--constellation-alpha` (the field-yields-to-type knob) as part of the
`--constellation-*` block — the §23.3 live-feedback item PINS its CALIBRATION TARGET, which §1 did not state.
§23.3 reads the slides lattice as *"too present"* and asks for *"more translucent on BOTH light + dark,
legible-but-recessive, the right balance, per-mode."* This is NOT a new token (the mechanism is §1's) — it is
the DEFAULT VALUE the library ships for the two arms, and the calibration intent that governs it:

- **The library `--constellation-alpha` default is tuned to the legible-but-recessive MIDPOINT, NOT maximum
  legibility.** The lattice must RECEDE behind type while staying visible on both grounds — neither the §12/§16
  "not visible ENOUGH" failure (the H.W4 floor problem) NOR the §23.3 "too present" failure. The two arms are
  per-mode by construction (the `:root` vs `.dark` cascade): a LOWER alpha on light (the cream ground already
  lifts the node tones, so the field can recede further) + a MODESTLY-HIGHER alpha on dark (the ink ground
  needs more presence to read at all) — the `.dark` arm is NOT simply `1.0`. The slides values H.W4 landed
  (`0.92` light / `1.0` dark) are the MAXIMUM-legibility reference; the library default ships BELOW them as the
  recessive baseline a consumer inherits, so a drop-in `<Constellation>` reads recessive WITHOUT a consumer
  override.
- **§24 reconcile — tune ON TOP of the shipped color fix, never redo it.** The I-session 3.7.0 line landed the
  light-mode `--constellation-line` plain-hex resolved-color fix (`deck.css:279`/`:809` slides-side; W30 lands
  the library-side `--constellation-line` plain-hsl complement). The §23.3 translucency calibration is the
  ALPHA channel, ORTHOGONAL to that color/leak fix — it rides on top. W17 does NOT touch the resolved-color
  fix; it sets the recessive `--constellation-alpha` default + states the per-mode balance intent. (The W30
  no-`light-dark(`-in-`--constellation-*` static guard already forbids re-introducing the leak through the
  alpha tokens.)
- **Non-dup vs §12/§16.** §12.13 + §16 "not visible ENOUGH" and §23.3 "too present" are the SAME knob read at
  two ends of one calibration — recorded so the recessive default is not mistaken for a regression of the H.W4
  legibility win. ONE value per arm, tuned to the midpoint.

The slides-side ADOPTION (drop the local `0.92`/`1.0` override or retune it down to inherit/match the recessive
default) routes to **AX.W31 fold §E** (the slides repo; gated on the AX publish per §4 note 12) — W17 OWNS only
the library default + the per-mode calibration intent + the README documentation of the recessive balance.

**Explicitly OUT of W17 scope (routes elsewhere):**
- The slides-side `constellation.ts` DELETION + the slides anomaly drawOverlay skin authoring + the
  `--foreground` light-dark()-into-Canvas2D leak fix at `constellation.ts:107` → **AX.W30** (the slides
  baseline wave; the library-side `--constellation-line` plain-hsl token W17 ships is the COMPLEMENT the
  slides fix reads).
- `useCanvas2D` / `useCanvasLifecycle` / `resolveCanvasColor` authoring → **AX.W37** (W17 composes the
  existing substrate + reads plain-hsl tokens; it does not author the resolver).
- The `/deck-progress` subpath export + the DeckProgress rail → **AX.W24** (a SEPARATE slice-24 finding, a
  different surface).
- The slides `reveal.ts`/`useCountup.ts` motion adoption → **AX.W32** (a different slice-24 finding).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/tokens.css` | **ADD** the `--constellation-*` token block — a light arm (`:root`) + a `.dark` arm carrying the H.W4-derived legibility values (`--constellation-node` / `-node-dim` lifted off the dark ground, `--constellation-line`/`-edge` plain-hsl, `--constellation-edge-alpha` / `-edge-anomaly-alpha` / `--constellation-alpha`, a neutral `--constellation-accent` default). PLAIN-hsl, NEVER `light-dark()`. **§7** the `--constellation-alpha` DEFAULT is calibrated to the legible-but-recessive MIDPOINT per-mode (LOWER on `:root`/light, modestly-higher on `.dark` but NOT `1.0`) — BELOW the slides `0.92`/`1.0` max-legibility reference, so a drop-in consumer inherits a recessive field (REQUIREMENTS §23.3). |
| `src/components/custom/constellation/constellationField.ts` | Extend `readPalette` to read the FULL token set (`:95-105`); make the paint passes read `var(--constellation-edge-alpha)` / `var(--constellation-alpha)` (replacing the `0.17` `:207` / `0.24` `:252` literals). ADD the focal-node model (`focalIndex` + `warpStep(field, dt)` — the dt-stepped critically-damped integrator, per-axis, dt-clamped) + `nearestNode(field, px, py, excludeIdx)`. Strike the "No node is pinned" comment (`:110`) → the focal node IS pinnable. |
| `src/components/custom/constellation/Constellation.vue` | ADD the `warpOnClick?: boolean` prop + the `warpTo(point)` / `warpTo(clientX, clientY)` `defineExpose` method (reusing the existing `toLocal` mapping `:145-152` + the host `pointerdown` `:175`); thread `focalIndex` to `drawOverlay`; PRM-gate the warp (the click does not warp under reduced-motion). Step `warpStep` inside the existing `stepField` render hook (`:124` neighborhood). |
| `src/components/custom/constellation/README.md` | Research-backed canonical-readme-shape rewrite: the token vocabulary + the library-legibility-vs-`--constellation-accent`-preset boundary, the `--constellation-alpha` recessive-balance per-mode calibration intent (§7 — legible-but-recessive, not max-legibility), the unified focal-warp-and-drift seam (`warpTo` + `warpOnClick` + FORBID-useSpring rationale + the deck-scale `toLocal` mapping + the PRM policy), and the DECORATIVE-not-data-graph non-goal (§4 note 16). |
| `src/components/custom/constellation/index.ts` | Co-export any new public type (`ConstellationFocal` / the `warpTo` signature) if the public surface widens (the `/constellation` subpath barrel mirror already re-exports `*`; verify the new symbols ride). |
| `demo/stories/substrates/constellation.vue` | Add a `warpOnClick` + focal-skin demo section (the click-to-warp visible in the storybook) + the dark/light token-ladder tour; update the stale `:5-6` comment ("slides anomaly-ring deck never delivered" → "slides adopts at AX.W30"). DEMO-private — not a library edit. |
| `scripts/proof-constellation-tokens.mjs` | **NEW** — the gate: (a) the `--constellation-*` token block is PRESENT with both a `:root` and a `.dark` arm; (b) `readPalette` reads the FULL set (≥6 tokens); (c) **no `light-dark(` substring** inside any `--constellation-*` token declaration (the W30 cardinal-defect static assertion) AND `--constellation-line` is never `var(--foreground)`. |
| `scripts/proof-constellation-warp-live.mjs` | **NEW** — the π-lane render gate (runs in the W00 `tests-visual/` workspace): mount `<Constellation warpOnClick>`, dispatch a synthetic `pointerdown` at a known point, sample the focal node position over the settle window, assert (a) the focal centroid MIGRATES toward the click region, (b) it CONVERGES onto an existing node's position (min-d² to any node → 0 at settle), (c) it CHASES a live drifting target (re-targets each frame, not a frozen snapshot), (d) it is a spring-eased path (monotone-ish approach, NOT a single-frame snap). |
| `docs/tranches/AX/audit/W17-constellation-port.json` | **NEW** — the wave's audit artefact (born-RED→GREEN evidence + the focal-seam ratification record + the slides-adoption-gated-on-publish note). |
| `package.json` | (Verify only — the `/constellation` subpath + the gate registration. The subpath `src/subpaths/constellation.ts` already EXISTS; the new `proof:constellation-tokens` + `proof:constellation-warp-live` package.json script entries land here.) |

**OUT of bounds:** `src/decks/til-briefing/constellation.ts` + any slides repo file (the DELETION + the
slides anomaly skin → **AX.W30/W31**, a separate tracked repo — glass-ui writes NO slides source); `src/composables/glass/canvas2d/useCanvas2D.ts` + `resolveCanvasColor` (**AX.W37** — W17 composes the existing
substrate, reads plain-hsl tokens); `src/components/custom/deck-progress/` + the `/deck-progress` subpath
(**AX.W24**); `src/deck/reveal.ts` / `useCountup.ts` adoption (**AX.W32**); the W00 `pi-manifest.ts` /
`substrate-paints-color.spec.ts` (W00 owns those — W17 ADDS sibling π-lane gates, it does not edit W00's
members).

---

## Disjointness (sibling waves it must NOT overlap)

W17 is the SOLE wave in band E (CONSTELLATION); it dependsOn only AX.W00, so it can run CONCURRENTLY with
the dock band (A), the graphics blockers (B), and the aurora/blob bands (C/D) once W00 lands. The
disjointness contract:

- **vs AX.W00 (the π lane).** W17 **dependsOn W00** — SEQUENTIAL. W17 ADDS two sibling π-lane gates
  (`proof:constellation-tokens` headless + `proof:constellation-warp-live` device) into the W00 `tests-visual/`
  workspace; it does NOT edit W00's `pi-manifest.ts` / `substrate-paints-color.spec.ts` members. Disjoint by
  file within the shared workspace (W17 ADDS new spec files, W00 owns the manifest).

- **vs AX.W30 (slides baseline — the consumer #2 adoption).** W30 **dependsOn W17** (the charter declares it:
  `### AX.W30` line 1504 `dependsOn AX.W17`). They are SEQUENTIAL + REPO-DISJOINT: W17 owns the LIBRARY-side
  seam + tokens (`glass-ui/src`); W30 owns the SLIDES-side `constellation.ts` DELETION + the anomaly
  drawOverlay skin + the `--foreground` leak fix (`slides/src`). The shared SEMANTIC surface is the
  `--constellation-line` plain-hsl token (W17 SHIPS it library-side; W30 READS it slides-side to fix the
  `:107` leak). No shared FILE — different repos. The W17 adoption is gated on the AX cut PUBLISHING (§4 note
  12) — coordinate via `coordination/CONSTELLATION.md`.

- **vs AX.W37 (Canvas2D lifecycle + `resolveCanvasColor`).** Both depend only on W00; **CONCURRENT-eligible**.
  COORDINATE, not collide: W37 ships `useCanvas2D`/`useCanvasLifecycle`/`resolveCanvasColor`; the
  constellation ALREADY composes `useCanvas2D` at HEAD, and W17 reads PLAIN-hsl `--constellation-*` tokens
  (NO `light-dark()` by construction), so W17 needs NO `resolveCanvasColor`. W17 does NOT edit
  `useCanvas2D.ts` (W37's file). If W37 lands a substrate refactor that touches the constellation's compose
  site, sequence W37-then-W17 or coordinate the `Constellation.vue` render-hook hunk; the cleanest order is
  W37 ships the resolver as a future-token escape, W17 ships plain-hsl tokens that never need it. SHARED
  conceptual surface (Canvas2D color) but DISJOINT files.

- **vs AX.W24 (`/deck-progress` export).** DISJOINT by file entirely — a different slice-24 finding (the
  DeckProgress rail), a different component subtree. Concurrent-safe.

- **vs the aurora/blob bands (C/D, W10-W16, W38).** DISJOINT by file entirely — different custom-component
  subtrees. The constellation shares the W37 Canvas2D substrate CONCEPT with no aurora/blob source. The ONE
  shared file is `src/styles/tokens.css` (W17 ADDS a `--constellation-*` block; the aurora/blob waves may
  touch other token sections) — **disjoint by SECTION**: W17 appends a self-contained `§constellation` block;
  it touches no aurora/blob/glass token. Coordinate the tokens.css append point if two waves land
  concurrently (append-only, non-overlapping sections — three-way-merge-safe).

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤1 agent — the token block + readPalette wiring + the focal-warp seam + README).** Ship the
  `--constellation-*` light/dark token block in `tokens.css`; wire `readPalette` to the full set + the paint
  passes to the alpha tokens; add the focal-node model + `warpStep` (the dt-clamped critically-damped
  integrator, FORBID `useSpring`) + `nearestNode` to `constellationField.ts`; add the `warpOnClick` prop +
  `warpTo` `defineExpose` (reusing `toLocal`) + PRM-gate to `Constellation.vue`; add the demo section;
  rewrite the README. Lint + typecheck at every interval. (The slides adoption is W30 — a DIFFERENT repo +
  wave; this agent writes NO slides source.)
- **Adversarially-verify (≤1 read-only lane).** (a) Re-runs the four RED greps on the patched tree:
  `--constellation-*` tokens PRESENT with both arms; `readPalette` reads ≥6 tokens; `focalIndex`/`warpTo`/
  `warpStep`/`nearestNode` EXIST; no `light-dark(` in any `--constellation-*` declaration. (b) On the device:
  drives a synthetic warp + confirms the focal centroid converges onto a REAL node (not a click-time snapshot
  next-to the moved node — the LIVE-TARGET correctness) over a spring-eased path. ADVERSARIAL twists: (i)
  confirms NO second rAF spawns (the `useSpring`-forbid is honest — grep `useSpring` in
  `constellation/` = 0; the substrate's single rAF is the only loop); (ii) confirms warp is DISABLED under
  `prefers-reduced-motion` (the click no-ops); (iii) confirms the focal node EXCLUDES itself from its own
  candidate set (a degenerate cursor-on-focal no-ops); (iv) confirms a deck-CSS-scale transform does NOT
  break the click mapping (the `toLocal` reuse holds); (v) confirms `--constellation-accent` is a NEUTRAL
  library default (not an accidental NCSU-red bake — the consumer-preset boundary is honest).
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors `proof:constellation-tokens` (token-block presence +
  full-set readPalette + the no-`light-dark(` static assertion) + `proof:constellation-warp-live` (the
  π-lane focal-warp render observation: migrate-toward-click + converge-onto-node + chase-live-target +
  spring-eased-not-snap). Confirms each clause FAILS at the pre-wave tree (no tokens / no focal seam / no
  guard) and PASSES on the patched tree. Registers both `proof:*` package.json entries.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 3.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / static gate — born-RED→GREEN.**

- **`proof:constellation-tokens` (born-RED — token presence + readPalette-full-set + the no-`light-dark(`
  static assertion).** Asserts (a) `src/styles/tokens.css` ships a `--constellation-*` block with BOTH a
  `:root` (light) and a `.dark` arm; (b) `readPalette` reads the FULL token set (≥6 tokens: node, node-dim,
  line/edge, edge-alpha, edge-anomaly-alpha, alpha) — not the 3 it reads at HEAD; (c) **no `light-dark(`
  substring** inside any `--constellation-*` token declaration AND `--constellation-line` is never
  `var(--foreground)` (the W30 cardinal-defect static guard at the library layer). **Born-RED at HEAD** (zero
  `--constellation-*` tokens in `src/styles/`; readPalette reads 3; no guard exists). This is a
  build-source-presence + static-assertion artefact (an accepted SPEC.md §Hard-Gates form — token-block
  presence + a forbidden-substring static check, NOT a grep-for-runtime-behaviour).

- **`proof:constellation-warp-live` (born-RED — the π-lane focal-warp render observation, the INTERACTION
  gate).** Runs in the W00 `tests-visual/` workspace on a real device: mount `<Constellation warpOnClick>`,
  dispatch a synthetic `pointerdown` at a known point, sample the focal node position over the settle window,
  assert (a) the focal centroid MIGRATES toward the click region; (b) it CONVERGES onto an existing node's
  position (min-d² to any node → ~0 at settle — the IDENTITY-RIDE arrival); (c) it CHASES a LIVE drifting
  target (re-reads `field.nodes[targetIdx]` each frame, not a frozen snapshot); (d) it is a SPRING-EASED path
  (monotone-ish approach over N frames, NOT a single-frame snap). **Born-RED at HEAD** (no focal/warp seam
  exists → no focal node to sample → the assertion cannot run). This is a **runtime-observation** artefact
  (a real device render + per-frame position readback, the precept-valid form — NOT a grep for a source
  string), mirroring the AX.W15 blob pointer-centroid-shift gate.

This is a **build-source-presence + static-assertion + runtime-observation** gate trio (the precept-valid
artefact forms per SPEC.md §Hard Gates), NOT a "grep found a source string for runtime behaviour" invalid
form: the token-presence + no-`light-dark(` clauses are source-structure assertions; the warp clause is a
real device render + position readback.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on the live constellation demo (`/substrates/constellation`), at **≥ 3 viewports**
(375×667 / 1280×800 / 1440×900) in **light AND dark** (the adversarial-critique result[29] insistence: BOTH
grounds), AND on the fourier cream+ink ground (the §4.2 SECOND token-driven ground, gated on its pin bump):

- **The neutral lattice is LEGIBLE on cream AND ink with ZERO tuning:** the node tones read on both grounds,
  the edge hairlines clear the perceptual floor (the `0.17`-was-too-low fix), the field yields to type. ONE
  red anomaly is visible against the neutral field (the §4.2 ask — the `--constellation-accent` skin).
- **The click-to-warp reads as a spring-eased PATH to the nearest node, NEVER a snap** (the §4.3
  fully-dynamic-interactive ask): click anywhere, the focal mark springs to the nearest drifting node and
  RIDES it; click again, it re-points. The path is iOS-spring-eased — observed LIVE, not inferred from the
  numeric gate.
- **Under `prefers-reduced-motion`** the click does NOT warp (the focal node stays put — the STATED PRM
  policy, observed).
- **Affordance / hierarchy / NO visual occlusion** per the AX cardinal gate.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact per the W00 protocol: the invisible-on-dark / no-warp BEFORE vs the
legible-both-grounds / spring-warp AFTER, at ≥3 viewports × light/dark) is the binding close criterion. A
green token gate proves the tokens exist; only the live audit proves the lattice is LEGIBLE and the warp
reads as a spring.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the four RED witnesses against HEAD: `grep`
   `--constellation-*` in `src/styles/` = EMPTY; `readPalette` reads 3 tokens; `focalIndex`/`warpTo` = 0
   hits in either repo; no `proof-constellation-tokens.mjs`. Record as the born-RED baseline. Do NOT proceed
   on the audit's word — re-prove.
2. **RATIFY the focal-node seam (RATIFY-BEFORE-IMPL).** The orchestrator confirms the focal-node-as-library-concept
   disposition (a `focalIndex` + per-axis `warpStep` spring + `warpTo`/`warpOnClick`) over the rejected
   single-consumer `stepOverlay` hook (the result[29] overfit anti-pattern). Confirm the design thesis (drift
   and warp are ONE mechanic, two target-sources). Record the ratification in `audit/W17-constellation-port.json`.
3. **Author the born-RED gate clauses.** `proof:constellation-tokens` (token presence + full-set readPalette
   + no-`light-dark(`) + `proof:constellation-warp-live` (the π-lane warp observation); confirm each FAILS at
   the pre-wave tree.
4. **Ship the `--constellation-*` token block.** Add the light + `.dark` arms to `tokens.css` (the H.W4
   legibility values, PLAIN-hsl). Wire `readPalette` to the full set + the paint passes to the alpha tokens
   (replace the `0.17`/`0.24` literals). Lint + typecheck.
5. **Author the focal-node + warp seam.** Add `focalIndex` + `warpStep` (the dt-clamped critically-damped
   integrator, FORBID `useSpring`) + `nearestNode` to `constellationField.ts`; add `warpOnClick` + `warpTo`
   (reusing `toLocal`) + the PRM gate to `Constellation.vue`; thread `focalIndex` to `drawOverlay`. Lint +
   typecheck.
6. **Demo + README.** Add the warp + focal-skin + token-ladder demo section; rewrite the README to the
   canonical-readme-shape (the token vocabulary + the unified warp-and-drift seam + the
   DECORATIVE-not-data-graph non-goal).
7. **Gate GREEN + VISUAL-TRUTH.** Confirm both gates pass; run the live audit (legible-both-grounds + the
   spring-eased warp + the PRM no-op) on cream + ink + fourier grounds at ≥3 viewports; capture the paired-π
   BEFORE/AFTER + DELTA; write `audit/W17-constellation-port.json` to GREEN.
8. **Hand off the slides adoption to AX.W30 (gated on the AX publish).** Record in
   `coordination/CONSTELLATION.md` that the focal/warp seam + `--constellation-line` plain-hsl token have
   landed at HEAD; the slides `constellation.ts` deletion + anomaly drawOverlay skin are W30's (gated on the
   AX cut PUBLISHING per §4 note 12 — slides dev-resolves the published line).

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W17-constellation-port.json` — the born-RED→GREEN ledger: the four RED witnesses
  (the empty `--constellation-*` styles grep, the 3-token readPalette, the no-focal-seam grep across both
  repos, the absent `light-dark(` guard), the focal-node-seam ratification record (the design thesis + the
  rejected `stepOverlay` overfit alternative), the per-finding (slice 24 F0/F1 + result[18] findings 1-12)
  disposition with the OUT-of-scope routes (W30 slides-side / W37 substrate / W24 deck-progress / W32 motion),
  and the post-wave GREEN measurements (the token-block presence, the readPalette full-set, the warp
  converge-onto-node readback, the slides-adoption-gated-on-publish note).
- The NEW `scripts/proof-constellation-tokens.mjs` (token presence + full-set readPalette + no-`light-dark(`)
  + `scripts/proof-constellation-warp-live.mjs` (the π-lane warp observation) + their `proof:*` package.json
  registration.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the invisible-on-dark / below-floor-on-cream
  / no-warp BEFORE vs the legible-both-grounds / spring-warp AFTER, at ≥3 viewports × light/dark, on cream +
  ink + (pin-bump-gated) fourier grounds.
- The research-backed README (canonical-readme-shape): the token vocabulary, the unified focal-warp-and-drift
  seam, the FORBID-useSpring + deck-scale + PRM rationale, the DECORATIVE-not-data-graph non-goal.
- The `coordination/CONSTELLATION.md` entry: the seam + token landed-at-HEAD, the slides adoption gated on
  the AX publish (the W30/W31 + W33 republish hinge).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(constellation): proof:constellation-tokens + proof:constellation-warp-live born-RED (AX.W17)`
2. `feat(constellation): ship the --constellation-* light/dark legibility token block + readPalette full-set (AX.W17 slice24-F1)`
3. `feat(constellation): focal-node + warpStep critically-damped integrator + nearestNode — warp and drift unify on one seam, useSpring FORBIDDEN (AX.W17 §4-note-15)`
4. `feat(constellation): warpTo defineExpose + warpOnClick prop (toLocal deck-scale mapping) + PRM gate (AX.W17 result[18])`
5. `docs(constellation): canonical-readme-shape — token vocabulary + unified warp-and-drift seam + DECORATIVE-not-data-graph non-goal (AX.W17 §4-note-16)`
6. `chore(AX.W17): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + the focal-seam ratification record + slides-adoption-gated-on-publish handoff`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause, K W0. These are the messages the orchestrator authors. The slides-side
`constellation.ts` deletion + anomaly skin are AX.W30 commits in the SLIDES repo, gated on the AX publish.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (the π visual-runtime lane) — HARD.** W00 stands up the fail-CLOSED `tests-visual/` workspace
  (device render + readback) that W17's `proof:constellation-warp-live` gate runs inside, and codifies the
  paired-π BEFORE/AFTER + DELTA close protocol + the live-re-diagnosis wave-open ritual. W17 is an
  INTERACTION wave — the warp needs a live behavioral assertion (the focal centroid converges onto a node),
  not a static screenshot; that machinery is W00's. (Charter §3 dependsOn AX.W00.)
- **Position:** W17 is the SOLE wave in band E (CONSTELLATION); it dependsOn ONLY W00 (the adversarial
  critique result[29] confirms: "W17 dependsOn only W00 — constellation is not blocked on aurora/blob"). It
  is concurrent-eligible with the dock (A) / graphics (B) / aurora-blob (C/D) bands once W00 lands.
- **Downstream (NOT a W17 dependsOn — W17 is the predecessor):** **AX.W30** dependsOn AX.W17 (the slides
  `constellation.ts` deletion + anomaly drawOverlay skin cannot move until the focal/warp seam lands here);
  the W30 slides port is gated on the AX cut PUBLISHING (§4 note 12).
- **Coordinate (NOT a hard dependency):** **AX.W37** ships `useCanvas2D`/`resolveCanvasColor` — the
  constellation already composes `useCanvas2D` at HEAD and reads PLAIN-hsl tokens (no `light-dark()`), so the
  W37 resolver is a future-token escape, not a W17 prerequisite. Coordinate the `Constellation.vue` compose
  site if W37 refactors the substrate concurrently.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`da0495b`** (AW.W17 — the constellation ORIGIN) — landed the clean neutral `<Constellation>` +
  `constellationField.ts` composing the `useCanvas2D` substrate + the `drawOverlay(ctx, field, now)` skin
  seam, as a FRESH greenfield component modeled on slides, NOT a port of slides onto it. The two were never
  reconciled in the same wave. This is the substrate-WITHOUT-adopted-consumer the no-overfitting precept
  flags: the ≥2-consumer invariant is satisfied ON PAPER (the demo story) but the REAL consumer (slides)
  never ported, so the F-tranche `L05` KEEP-LOCAL verdict was never revisited and the duplication ossified.
  W17 closes the loop (tokens + focal seam + the slides re-point routed to W30).
- **The F-tranche `L05` KEEP-LOCAL verdict** (slides `docs/tranches/F/audit/L05-handrolled-to-gu.md`, finding
  F05) — explicitly said KEEP-LOCAL because the NCSU-red anomaly identity was "structurally embedded." AW.W17
  RESOLVED that exact objection by inventing the neutral lattice + `drawOverlay` skin seam (anomaly =
  consumer skin, not field mechanics) — but no follow-up wave re-pointed slides. W17 is the follow-up.
- **The H.W4 visibility tuning** (slides `constellation.ts:110,148` + `deck.css:259-262`) — the multi-wave
  dark/light contrast work (node colors lifted off the ink ground on dark, edge-alpha multipliers promoted
  to tokens, anomaly core `4.2→5.6`) lives ENTIRELY in slides. W17 captures this hard-won PALETTE
  INTELLIGENCE as library identity (the `--constellation-*` block) — it is universal legibility, NOT
  deck-identity (only `--constellation-accent` is the consumer preset).
- **The §15 premise correction (result[18] finding 1 + §4 note 15).** §15 / `REQUIREMENTS.md:183-188` assert
  click-to-warp "first shipped in the slides constellation, GENERALIZE it" — a FACTUAL ERROR. `grep`
  (`warpTo|nearest|snapToNode|closest.*lattice`) across `slides/src` + `glass-ui/src` = ZERO implementation
  hits; the only matches are the AX REQUIREMENTS prose. The slides `constellation.ts:174-195` `drift()` (the
  auto-anomaly re-targeter on a jittered easeInOutQuad) is the architectural ANALOG (same node-position-mutation
  class), NOT a source to port. W17 AUTHORS the warp net-new; the implementer must NOT hunt for a
  non-existent slides source.
- **§4 note 12 (publish-currency, not code).** slides MEASURED published 3.6.0; the focal/warp seam +
  `--constellation-line` plain-hsl token are at HEAD but NOT in what slides dev-resolves until the AX cut
  PUBLISHES. The slides adoption (W30) is gated on the AX publish — verify-against-HEAD, then publish; do NOT
  re-fix what is already at HEAD.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline: zero `--constellation-*` tokens
  in `src/styles/`, `readPalette` reads 3 tokens, no focal/warp seam, no `light-dark(` guard. The cardinal
  headless-green/visually-incomplete signature (the demo story passes the ≥2-consumer gate ON PAPER while the
  real consumer never ports + the lattice is invisible on dark).

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-E (CONSTELLATION) binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **substrate-with-consumer / wire-before-retire (precepts README "Substrate and consumer land together — a
  primitive that is not consumed is unfinished work"; the HEADLINE precept).** The AW.W17 constellation is a
  substrate whose REAL intended consumer (slides) never adopted — "unfinished work." W17 lands the focal-node
  + warpTo seam WITH slides as consumer #2 (the W30 adoption deletes the 510-line `constellation.ts`); the
  focal/warp seam is what UNBLOCKS the slides re-point (drift+warp cannot move through a read-only overlay).
  MUST NOT close the seam without the slides consumer leg sequenced (W30, gated on the AX publish).
- **no-overfitting (precepts README "No overfitting — a public surface … needs a current consumer and
  evidence. Otherwise delete it").** The focal-node seam is promoted to a FIRST-CLASS LIBRARY concept
  (`focalIndex` + `warpStep` + `warpTo`) rather than a generic single-consumer `stepOverlay` mutate-the-field
  hook (the result[29] overfit anti-pattern). It serves ≥2 consumers (the demo warp section + slides drift+warp
  + the §15 click-to-warp interaction itself). The DECORATIVE-not-data-graph non-goal (§4 note 16) is the
  explicit abstraction-gap guard: the seam will NOT absorb semantic fixed-topology graphs (no prop-bloat —
  a data-graph is a SEPARATE component). MUST NOT ship the seam with a single consumer or as data-graph
  substrate.
- **one-path / no-legacy-code (the Canvas2D-safe plain-hsl tokens, NEVER `light-dark()` into canvas).** The
  `--constellation-*` tokens ship PLAIN-hsl light + `.dark` arms — NEVER `light-dark()` at the declaration
  (Canvas2D SILENTLY REJECTS it → the W30 cardinal 86.3%-red-splatter defect). `--constellation-line` is a
  plain-hsl token, NEVER `var(--foreground)` (the W30 leak). The warp spring is ONE seam (the dt-stepped
  integrator INSIDE the substrate's single rAF), NOT a second rAF (the FORBID-`useSpring` constraint — a
  second rAF would defeat the one-path parked-substrate contract). MUST NOT introduce a `light-dark()` token
  or a second rAF.
- **canonical-readme-shape (band-E precept; `docs/precepts/canonical-readme-shape.md`).** The README is
  rewritten research-backed to the canonical shape: the token vocabulary (library-legibility vs the single
  `--constellation-accent` preset boundary), the unified focal-warp-and-drift seam, the FORBID-useSpring +
  deck-scale + PRM rationale, and the DECORATIVE-not-data-graph non-goal. Documentation is part of the change
  — the stale demo-story comment ("slides anomaly-ring deck never delivered") is corrected, not left to
  mislead.
- **π visual-runtime lane / Gates-close-on-evidence (precepts README "Gates close on evidence: test output,
  build output, runtime observation, benchmark artefact, generated diff, or deletion proof"; SPEC.md §Hard
  Gates — no grep-only runtime gate).** The token gate is a source-presence + static-assertion artefact; the
  warp gate is a RUNTIME-OBSERVATION (a real device render + per-frame focal-position readback) — NOT a "grep
  found a source string for runtime behaviour" invalid form. MUST NOT VIOLATE — the wave's close is the
  EXECUTED live Playwright + frontend-design audit (the legible-both-grounds lattice + the spring-eased warp
  on cream + ink + fourier grounds), never a headless proof alone (the cardinal AX precept; only the live
  audit proves the lattice is legible and the warp reads as a spring).
- **presets-in-consumers (MEMORY feedback_presets_in_consumer).** The library's `--constellation-*` block is
  its OWN legibility identity (the universal node/edge/alpha tokens evolve in `src/styles/`); only the
  `--constellation-accent` anomaly hue is the consumer preset (slides aliases it to `--ncsu-red`). MUST NOT
  bake a branded accent into the library default — the neutral default is library identity, the brand accent
  is the consumer's.
- **no-silent-deferrals (the slides adoption is sequenced, not "deferred to next tranche").** The slides
  `constellation.ts` deletion is explicitly ROUTED to AX.W30 (gated on the AX publish per §4 note 12), with
  the coordination recorded in `coordination/CONSTELLATION.md` — a sequenced cross-repo handoff with a
  named successor wave + a publish gate, NOT a silent deferral. MUST NOT close W17 leaving the slides
  duplication un-routed.
