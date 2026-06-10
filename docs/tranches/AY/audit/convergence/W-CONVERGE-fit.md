# AY.W-CONVERGE — Per-major-component glass-ui ↔ slides FIT audit

Read-only convergence audit answering the verbatim directive: "analyze every major glass-ui
component used [in slides] … converge on a library optimum for glass-ui, which is used by slides for
every major component that's BEFITTING … what gaps exist in glass-ui, what gaps exist in slides?"

Measured against the slides working tree (`/Users/mkbabb/Programming/slides`, the 13-slide poster +
feedback-coder + til-briefing decks) on 2026-06-10. The source FIXES land in the routed waves — this
wave only states the FIT verdict + routes the gaps + records the befitting exclusions.

## E1a — Per-component FIT disposition table

| component | slides consumer evidence (file:line / "not consumed") | glass-ui surface | FIT verdict | disposition | routed owning wave |
|---|---|---|---|---|---|
| dock | `slides/src/deck/DeckView.vue:5,136-179` (GlassDock + DockIconButton) + `DeckSettings.vue:12` | `@mkbabb/glass-ui/dock` | composed, but with deck-local wrapper glue (`keepOpen/release` `:64-68`; fixed-position `.deck-dock-wrap` `:192-201`) + the items-lag is the open FIT defect | EXTEND | AY.W-DOCK1 / AY.W-DOCK2 / AY.W-DOCK3 |
| constellation | NOT consumed — slides ships a BESPOKE copy `slides/src/decks/til-briefing/constellation.ts` (consumed by `deck.ts:3` + `SlideIntro.vue` + `SlideCloser.vue:32`) | `@mkbabb/glass-ui/constellation` | the exemplar to KILL — bespoke reimplementation of the library lattice | FIX | AY.W-CON1 / AY.W-CON2 / AY.W-CON3 → L.W-ADOPT |
| aurora | not consumed (`grep Aurora slides/src` → 0) | `@mkbabb/glass-ui/aurora` | correctly excluded — no befitting deck surface | EXCLUDE | — |
| blob | not consumed (`grep GooBlob slides/src` → 0) | `@mkbabb/glass-ui/goo-blob` | correctly excluded — no befitting deck surface | EXCLUDE | — |
| slider | not consumed (`grep glass-ui/slider slides/src` → 0) | `@mkbabb/glass-ui/slider` | correctly excluded — a deck has no continuous-value control | EXCLUDE | — |
| card | not consumed (`grep '<Card\|GlassCard\|glass-ui/card' slides/src` → 0); slides carries bespoke `deck.css` surfaces that EXPLICITLY opt OUT of glass (`deck.css:593-594` `.card { backdrop-filter: none }`) | `@mkbabb/glass-ui/card` (+ `.glass-card`) | befitting deck-local layout — the deck surfaces are print/capture-mode plates that DELIBERATELY flatten (no backdrop blur in a slide capture); NOT a `.glass-card` divergence to converge | EXCLUDE | — |
| button | `slides/src/deck/DeckView.vue:6,117-127` (`variant="glass"`) + `DeckGate.vue:4,70` (`variant="primary-audacious"`) | `@mkbabb/glass-ui/button` | composed cleanly — the glass-first W54 default + the primary-audacious CTA, both FIT variants | KEEP | — (verify-only; legibility cross-link below) |
| dialog | `slides/src/views/DeckGate.vue:3,43-72` | `@mkbabb/glass-ui/dialog` | composed cleanly | KEEP | — (legibility cross-link: AY.W-A11Y-PERF/AY.W-GLASS if the gate dialog over a bright backdrop is illegible) |
| configurator | not consumed | `@mkbabb/glass-ui/configurator` | correctly excluded — no preset-driven controls column in a deck; the `DeckSettings` dropdown is the right surface, already composed | EXCLUDE | — |

PLUS the two completeness rows (befitting-composed; the directive's "every major component used therein" reaches them):

| component | slides consumer evidence (file:line) | glass-ui surface | FIT verdict | disposition | routed owning wave |
|---|---|---|---|---|---|
| dropdown-menu / hover-card / toggle-group / forms / status-dot (the KEEP-cohort) | `DeckSettings.vue:12` (dropdown-menu); `feedback-coder/components/CodedTurnBank.vue:19-20` (toggle-group + hover-card); `DeckGate.vue:5` (forms/Input); `til-briefing/slides/SlidePipeline.vue:2` + `SlideXray.vue:3` + `SlideExampleAudit.vue:2` (status-dot) | the respective subpaths | composed cleanly — no divergent props/variants | KEEP | — |
| fourier-field | `feedback-coder/slides/Slide01.vue:10` + `Slide05.vue:23` (consumed) + `feedback-coder/theme.css:72` `--m-red: var(--viz-fourier)` (the 2nd bespoke-token-drift class) | `@mkbabb/glass-ui/fourier-field` | composed, but the intensity model is born-RED (W-FF1/2) AND a deck-local token re-point rides alongside | EXTEND | AY.W-FF1 / AY.W-FF2 → L.W-ADOPT (token-preset half) |

## E1b — Routing roll-up (the convergence worklist)

| disposition | component | owning wave (∈ AY.md §2) | gap one-liner |
|---|---|---|---|
| EXTEND | dock | AY.W-DOCK1 / AY.W-DOCK2 / AY.W-DOCK3 | the items-lag lockstep gate + the deck-local `keepOpen/release` wrapper glue to fold into a dock nav-pattern; verify the deck-edge `<Button variant="glass">` + GlassDock read as ONE glass register (else → AY.W-GLASS) |
| FIX | constellation | AY.W-CON1 / AY.W-CON2 / AY.W-CON3 → L.W-ADOPT | kill the bespoke `til-briefing/constellation.ts`; the library lattice + `wander` + `gravityWell` are the converged surface |
| EXTEND | fourier-field | AY.W-FF1 / AY.W-FF2 → L.W-ADOPT | the intensity loudness-knob model (born-RED) + the `--m-red: var(--viz-fourier)` documented-preset-not-silent-fork |

Every routed id appears in `AY.md §2`'s wave table (verified). No gap is left unrouted; no phantom route.

## E1c — Befitting-exclusion ledger

- **aurora** — a TIL/briefing deck's hero is the constellation field + the fourier viz; a full-bleed WebGL aurora is not a befitting deck surface. Deliberate exclusion, not an overlooked gap.
- **blob** — same: the bounded metaball creature has no befitting deck surface.
- **slider** — a slide deck has no continuous-value control surface; the dock-with-slider composition is a glass-ui demo, not a slides need.
- **configurator** — no preset-driven controls column in a deck; the `DeckSettings` dropdown is the right (already-composed) surface.
- **card** — the slides `deck.css` surfaces deliberately flatten (`backdrop-filter: none` for capture/print fidelity); a glass `.glass-card` would blur the capture. The deck card is a befitting deck-local layout, not a divergence.

## E1d — L-tranche adoption inventory delta (the input to L.W-ADOPT)

Once the routed library waves land + publish, slides adopts-or-stops-reimplementing:

1. **DELETE `til-briefing/constellation.ts`**, mount `<Constellation wander>` from `@mkbabb/glass-ui/constellation` (the bespoke-copy exemplar killed — the wander cadence + gravity-well now ship in the library).
2. **Document the feedback-coder `--m-red: var(--viz-fourier)` re-point** (`theme.css:72`) as a NAMED preset (a documented deck-local token re-point per the presets-in-consumers precept), NOT a silent fork — the broadened bespoke-copy-CLASS gate's input.
3. **The card FIT decision's consequence** — the deck surfaces STAY deck-local (EXCLUDE-with-rationale); no `.glass-card` adoption is owed. Recorded so a later "did we converge?" pass reads it as a deliberate exclusion.
4. **The dock wrapper-glue fold** — the `keepOpen/release` + fixed-position `.deck-dock-wrap` glue is a candidate to fold UP into a dock nav-pattern slot (routed to AY.W-DOCK*); slides drops the local glue once the pattern ships.

## §7 cross-references

- Routed owning waves (where the FIXES land, NOT here): `AY.W-CON1/2/3`, `AY.W-DOCK1/2/3`, `AY.W-FF1/2`, `AY.W-GLASS`, `AY.W-A11Y-PERF`.
- Downstream: `L.W-ADOPT` (consumes the E1d delta + the broadened `proof:no-bespoke-visual` gate — L's, not this wave's), `L.W-CHR`.
- This is a READ-ONLY audit: zero `src/` edits (the only adds are this doc + `scripts/proof-convergence-fit-coherent.mjs` + its package.json key).
