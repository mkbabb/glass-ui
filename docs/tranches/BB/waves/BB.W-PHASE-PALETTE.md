# BB.W-PHASE-PALETTE — de-gild the chassis complete phase: the hardcoded `[data-phase=complete] ⇒ --phase-color:--color-gold` becomes a `--phase-complete-color` CONSUMER token (default gold, back-compat), so the bus carries phase IDENTITY and the consumer chooses the ink

**Name**: W-PHASE-PALETTE - gold is EARNED, not the chassis default leaking onto every completion (the speedtest N18 ask)
**Opens after**: the Batch-0 integrity floor (W-CI-GREEN green, the harness trustworthy) + the Batch-1 gestalt hardening (the primitive's verdict rides the HARDENED `proof:ba-gestalt`). Runs in the PRIMITIVES band (Batch P, the §A1 cross-repo addition, P1), PARALLEL with Batches 2-4. The registry single-owner rule: a sibling primitive wave OWNS `package.json` + `scripts/gates.mjs` for the parallel group; this wave emits its gate row + its one `package.json` script line into that owner's sequence.
**Agents**: 1 (a single token-indirection demotion + its born-RED gate + the demo-driven π — the surface is a two-line CSS re-point + one new token declaration + the doc/gate, no multi-file fan-out)
**Hard gate**: `proof:phase-palette` (born-RED) — the chassis `[data-phase="complete"]` arm reads a `--phase-complete-color` CONSUMER token (NOT a hardcoded `var(--color-gold)`), the token DEFAULTS to gold at the chassis root (back-compat: an un-overriding consumer sees byte-identical gold), the WCAG label twin `--phase-complete-color-label` pairs 1:1, and the bus carries phase IDENTITY (a consumer sets ONE token to re-ink completion with zero library edit, the presets-in-consumers law); + the π readback (an un-overriding chassis paints gold complete byte-identical; a `--phase-complete-color`-overriding host paints the consumer ink, BOTH modes) + the `proof:ba-gestalt` chassis/data-band verdict (BA inv-4).
**Status**: SPEC

## The charge (speedtest N18 — the user's WHY, file:line evidence)

The speedtest AW v2.1 ask-brief (`speedtest/docs/tranches/AW/coordination/glass-ui-BB-ask-brief.md §P1.9 "COMPLETE-PHASE-PALETTE (N18)"`) names this directly: *demote the chassis `[data-phase=complete] ⇒ --phase-color:--color-gold` assertion to a `--phase-complete-color` CONSUMER token (default gold for back-compat) so the bus carries phase IDENTITY and the consumer chooses the ink.* The WHY is the brand-discipline one verbatim: **"gold should be EARNED (dock CTA + personal-best garnish), not the chassis default that leaks gold onto every completion + the survey/thank-you."**

The defect at HEAD is one hardcoded ink, leaking. The chassis owns a clean phase-IDENTITY bus — `--phase-color` cascades from `.instrument-chassis[data-phase="…"]` and every phase but `complete` resolves a CONSUMER-registerable chart token with a library fallback (`instrument-chassis.css:202-220`):

```css
.instrument-chassis[data-phase="ping"]     { --phase-color: var(--chart-ping, var(--viz-chebyshev)); … }
.instrument-chassis[data-phase="download"] { --phase-color: var(--chart-download, var(--viz-fourier)); … }
.instrument-chassis[data-phase="upload"]   { --phase-color: var(--chart-upload, var(--viz-amber)); … }
.instrument-chassis[data-phase="jitter"]   { --phase-color: var(--chart-jitter, var(--viz-legendre)); … }
```

Each of those four reads `var(--chart-{phase}, <viz-fallback>)` — the consumer overrides `--chart-download` in its preset (presets-in-consumers), the library ships a safe `--viz-*` default. The bus carries phase IDENTITY. But the `complete` arm BREAKS the pattern — it hardcodes the library's brand metal directly (`instrument-chassis.css:222-226`):

```css
.instrument-chassis[data-phase="complete"] {
    --phase-color: var(--color-gold);                       /* :223 — the leak: a fixed brand ink, no consumer seam */
    --phase-color-label: var(--color-gold-dark, var(--color-gold));  /* :224 — the WCAG twin, same leak */
    --phase-tint-amount: var(--phase-tint-peak);
}
```

So every consumer mounting a chassis at `phase="complete"` gets GOLD on the surface tint, the hero number, the phase fill, the spine vignette — whether or not gold is earned. speedtest's survey/thank-you completion + the routine-finish chassis all gild themselves the moment the phase flips, when gold is meant to be the CTA/personal-best garnish only. The ask: cut ONE indirection so the consumer chooses the completion ink (its phase spectrum, the aurora register, or — by default — gold). It is a token DEMOTION, the exact move the other four phases already shipped — `complete` is the one that never got the seam.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the ask-brief's authoritative WHAT/WHY/CONSUMER/ACCEPTANCE (`glass-ui-BB-ask-brief.md §P1.9`) re-verified against glass-ui HEAD (`f3c4170e` at this authoring) + the speedtest sibling at HEAD — NOT a blind re-diagnose (the §0 discipline: a stale cite is re-located, never trusted). There is NO cross-repo CONSUME dependency here (no value.js/kf helper needed — the fix is a pure glass-ui token indirection); the speedtest side is a consumer-token SET at AW.W7, never edited here. The agent re-greps each anchor; if a cite drifted (a sibling BB-Batch edit moved a line — W-DEAD-SWEEP or W-DARK-INK-WARM touch tokens), it records the drift in PROGRESS and re-locates the mechanism.

```
# 1. The phase cascade — the four GOOD arms (the consumer-seam pattern) + the ONE leaking complete arm
sed -n '202,226p' src/styles/instrument-chassis.css          # the [data-phase] cascade; :222-226 is the hardcoded gold complete arm
sed -n '59,73p'   src/styles/instrument-chassis.css          # the --phase-color / --phase-color-label root defaults (muted-foreground) + the WCAG-twin doc
grep -n "phase-color\|color-gold\|chart-" src/styles/instrument-chassis.css   # confirm complete is the ONLY hardcoded-ink arm

# 2. The gold token source (presets-in-consumers boundary — --color-gold is LIBRARY identity, not a demo preset)
grep -n "color-gold\b\|--gold\b\|color-gold-dark" src/styles/theme/bridges.css src/styles/tokens/scale-paper.css   # --color-gold = var(--gold); --color-gold-dark twin
grep -n "color-gold-dark" src/styles/tokens/scale-paper.css src/styles/tokens/dark-arm.css src/styles/tokens/light-dark.css   # the dark/light-dark arms the default must track

# 3. The phase-IDENTITY bus consumers (what reads --phase-color / --phase-color-label — what the default must keep painting)
grep -n "phase-color" src/styles/tokens/glass.css            # the spine vignette color-mix(--phase-color 8%) — a complete-phase consumer
grep -n "phase-color" src/styles/instrument-chassis.css      # the chassis backdrop tint + region wrappers
sed -n '7,20p'  src/components/custom/instrument-chassis/InstrumentChassis.vue   # InstrumentChassisPhase union ("complete" member) + the cascade doc

# 4. The structure twin (silver) — the cool-metal mirror that references the gold complete affirmation (a doc-cite to keep coherent)
sed -n '150,160p' src/styles/instrument-chassis.css          # the silver "cool-metal twin of the warm-gold complete affirmation" comment

# 5. The demo exerciser (the π drives the complete phase here — the own-surface DELTA)
sed -n '50,70p' demo/stories/compositions/instrument-chassis.vue   # the phase state machine cycling through "complete"

# 6. The idiom home + the canon record sites
grep -n "instrument-chassis\|phase cascade\|chassis" docs/precepts/design-idioms.md   # the BINDING idiom home (the chassis partial row)
grep -n "InstrumentChassis\|phase\|--phase" CLAUDE.md        # the InstrumentChassis phase-canon section (the doc to extend)

# 7. The gate house pattern + registration (the comment-strip pure-detector house pattern)
grep -n "proof:instrument-scope\|proof:suffuse\|proof:register-ios" scripts/gates.mjs   # the registration shape + the negative-predicate (no-brand-leak) precedent
grep -n "proof:instrument-scope\|proof:register-ios" package.json   # the package.json script + proof:all membership
```

Captures / authority cross-references:
- `speedtest/docs/tranches/AW/coordination/glass-ui-BB-ask-brief.md §P1.9` (the authoritative WHAT/WHY/CONSUMER/ACCEPTANCE — the binding ask: demote to a consumer token, default gold for back-compat).
- `docs/tranches/BB/BB-AMENDMENT-crossrepo.md §A1.P1 (W-PHASE-PALETTE)` (the BB-side charge: gold is EARNED, not the chassis default leaking onto every completion) + `§A4` (the consume cadence — glass-ui ships the demotion at 4.1.0, speedtest sets `--phase-complete-color` at AW.W7).
- `docs/tranches/BB/EXECUTION-DAG.md §A5` (the PRIMITIVES band runs PARALLEL with Batches 2-4 after the integrity floor + gestalt hardening).
- `docs/tranches/BB/waves/BB.W-CLOSE.md:111` (the §Close PRIMITIVES-band record: "the `--phase-complete-color` consumer-token demotion (W-PHASE-PALETTE — gold is now EARNED, not the chassis default)" — the named clean break to document at close).

**No moving cross-repo target.** Unlike the P0 spectrum waves, this fix consumes NO value.js/kf helper — it is a pure glass-ui CSS token indirection (one `var()` re-point + one root default declaration). The speedtest CONSUMER side (`speedtest sets --phase-complete-color`, the gold-exits-routine-completion ink) is the consumer's repo at AW.W7, NEVER edited here (the foreign-tree fence). The ONLY cross-repo coordination is the BY-NAME ask already relayed: the seam this wave mints (`--phase-complete-color`) is the token speedtest binds.

## The defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line (the cause at HEAD) | the mechanism |
|---|---|---|---|
| 1 | the complete arm hardcodes the brand metal [the headline] | `instrument-chassis.css:223` (`--phase-color: var(--color-gold)`) | the `complete` phase pins the library's gold DIRECTLY — no consumer seam — so every completion gilds itself the moment the phase flips; the bus carries the INK, not the phase IDENTITY (N18) |
| 2 | the WCAG label twin hardcodes too | `instrument-chassis.css:224` (`--phase-color-label: var(--color-gold-dark, var(--color-gold))`) | the text companion carries the same fixed gold — a consumer re-inking completion must override BOTH (the 1:1 twin pairing the four good arms already honor) |
| 3 | the four good arms are the model | `instrument-chassis.css:202-220` (`--phase-color: var(--chart-{phase}, var(--viz-*))`) | ping/download/upload/jitter each read a consumer-registerable `--chart-*` token with a library `--viz-*` fallback — the consumer-seam pattern `complete` never adopted; the demotion makes `complete` MATCH its four siblings |
| 4 | the gold leak's downstream consumers | `glass.css:454` (`color-mix(in oklab, var(--phase-color, …) 8%, …)` spine vignette); the chassis backdrop tint (`instrument-chassis.css:42,87`) | the spine vignette + backdrop tint + hero number + phase fill all read `--phase-color` — so the leak reaches every chassis surface; the default-gold demotion keeps them byte-identical for an un-overriding consumer |

## Scope (gestalt, not workaround — NO legacy, idiomatic transposition)

1. **Mint the `--phase-complete-color` + `--phase-complete-color-label` CONSUMER tokens with a gold DEFAULT at the chassis root** (the exact `--chart-{phase}` consumer-seam idiom the four good arms run). At the `.instrument-chassis` root (beside the `--phase-color: var(--muted-foreground)` idle default, `instrument-chassis.css:72-73`), declare the two completion-ink tokens DEFAULTING to the current gold values — `--phase-complete-color: var(--color-gold)` and `--phase-complete-color-label: var(--color-gold-dark, var(--color-gold))`. A consumer (or any ancestor) overrides EITHER on its host/preset (presets-in-consumers) to re-ink completion; an un-overriding consumer inherits the gold default → byte-identical to HEAD (the back-compat floor the ask names). The default lives at the chassis root (NOT `:root`/`tokens.css`) because it is a chassis-phase register, scoped to the surface that owns the phase bus — the same home the `--phase-color` idle default already occupies.

2. **Re-point the `[data-phase="complete"]` arm through the consumer tokens** (the demotion, the two-line clean break). The complete arm (`instrument-chassis.css:222-226`) re-points its two ink lines from the hardcoded gold to the new tokens:
   - `--phase-color: var(--phase-complete-color)` (was `var(--color-gold)`)
   - `--phase-color-label: var(--phase-complete-color-label)` (was `var(--color-gold-dark, var(--color-gold))`)
   - `--phase-tint-amount: var(--phase-tint-peak)` STAYS (the warmth ramp is orthogonal to the ink choice — the depth-of-tint is the same on any completion color).

   This is a CLEAN BREAK with a back-compat DEFAULT, not a back-compat ALIAS: there is no `--color-gold`-named shim, no dual-read — the arm reads ONLY the consumer token, and the token's DEFAULT is gold (the no-backwards-compat law honored: the seam is new, the gold is the new token's initial value, not a legacy alias the source still reads). After the re-point the `complete` arm is structurally identical to its four siblings — a `var(<consumer-token>, …)` read off the bus, not a fixed ink.

3. **Keep the silver structure twin's doc coherent** (the cool-metal mirror that references the gold complete affirmation). The `instrument-chassis.css:150-160` comment ("cool-metal twin of the warm-gold complete-phase affirmation") + the `InstrumentChassis.vue:38` doc-comment ("twin of the gold complete-phase affirmation") describe the SILVER variant against the gold default — re-phrase them so they name the DEFAULT (the warm-gold completion ink the chassis ships by default) rather than implying gold is the only completion ink. A one-line doc-clarity edit per site (the silver register is W-NO-GRAY's sanctioned cool-neutral exception — it is NOT re-pointed; only its narration of the now-overridable gold default is clarified). NO source change to the silver/structure register.

4. **Record the canon (CLAUDE.md + design-idioms) — the phase bus carries IDENTITY, the consumer chooses the completion ink.** CLAUDE.md's `### InstrumentChassis phase canon` section gains a one-paragraph record: the `complete` phase resolves `--phase-complete-color` (default `--color-gold`), the consumer-seam twin of the `--chart-{phase}` overrides the four active phases use — so completion ink is a CONSUMER choice (its phase spectrum, an aurora register, or the default gold), and gold is EARNED (the dock CTA + personal-best garnish), never the chassis default leaking onto every completion. The design-idioms idiom home (the chassis partial row, `design-idioms.md:76`) gains the phase-complete-color demotion line in the chassis idiom's record (the BINDING idiom home — the new token's home is the chassis partial, the consumer-seam discipline recorded beside the four `--chart-*` arms).

## Triumvirate Dispatch

- **The default re-point is NOT byte-identical** — if the demotion's gold DEFAULT does not paint byte-identically to the HEAD hardcoded `var(--color-gold)` (a cascade-order difference, a `light-dark()`/`.dark`-arm resolution the root-default declaration resolves differently than the `[data-phase]` arm did), that is a register-design miss in the default's home, NOT a license to re-add the hardcoded ink. Triumvirate: research where the default must be declared so it resolves byte-identically in BOTH modes (the `.dark` arm, the `light-dark()` arm — `--color-gold`/`--color-gold-dark` are mode-resolved tokens; the default must inherit the SAME resolution the hardcoded form did). The back-compat floor (un-overriding consumer = byte-identical gold) is the binding acceptance; a default that shifts the gold even subtly does not close.
- **The bus has a SECOND hardcoded-ink arm the census missed** — if the §0 re-grep finds another `[data-phase]` (or a `[data-phase]`-derived) selector hardcoding a brand ink directly (a fifth leak beyond `complete`), that is a scope-reveal: the N18 ask is `complete` ALONE, but a sibling leak is the same defect class. Triumvirate: research whether the additional leak is in scope (a consumer-seam demotion the ask implies) or owned elsewhere (the four good arms already have the seam — a regression would be W-CI-GREEN's). Do NOT silently widen the demotion to an un-named arm; record the finding and route it.
- **The demotion forces a token edit in another wave's bound** — if minting the chassis-root default forces an edit to `tokens.css`/`theme/bridges.css`/the `--color-gold` token family (a W-DEAD-SWEEP or W-DARK-INK-WARM surface), that is a scope-reveal — triumvirate, do NOT widen into the gold-token bound unilaterally. The default reads `var(--color-gold)` (the existing token, unedited); it declares a NEW chassis-local token, it does not re-tune the gold itself.
- **Hard-gate failure not local-edit-recoverable** — if the π readback shows an OVERRIDING consumer still paints gold (the override does not reach the bus — the `[data-phase="complete"]` arm's specificity wins over a host-level `--phase-complete-color` set, the cascade-trap the AZ.W-DOCK-RAIL class names), that is a cascade-precedence miss: triumvirate to locate where the override must land so it cascades to the arm (the consumer sets the token on an ANCESTOR of the chassis; the arm reads it via inheritance — confirm the read is an INHERITED `var()`, not a same-element override the arm clobbers). Do NOT loop on the token value; the cascade-win is the suspect.
- **Diagnostic loop halt** — if the override does not re-ink completion after the re-point and three iterations have not isolated the cascade layer (the root default vs the `[data-phase]` arm vs the host override), halt and triumvirate (the custom-property substitution-at-declaring-element trap — the substitution-vs-inheritance class the dock surfaced — is the suspect).

## Hard Gate

`proof:phase-palette` (born-RED at HEAD, driven GREEN by the wave) — the comment-strip pure-detector house pattern (mirroring `proof-register-ios.mjs`/`proof-suffuse.mjs` — the negative-predicate no-brand-leak precedent), four falsifiable SOURCE witnesses each red at HEAD pre-wave, AND the binding π readback:

1. **W1 — the complete arm reads the consumer token, NOT the hardcoded gold (the demotion landed).** The `.instrument-chassis[data-phase="complete"]` arm sets `--phase-color: var(--phase-complete-color)` and `--phase-color-label: var(--phase-complete-color-label)` — and carries NO `var(--color-gold)` directly. RED at HEAD: the arm is `--phase-color: var(--color-gold)` (`instrument-chassis.css:223`). **Bite (anti-evasion)**: a `grep` for `--color-gold` inside the `[data-phase="complete"]` selector block returns ZERO (the hardcoded brand ink is GONE from the arm); the arm reads ONLY `var(--phase-complete-color…)`. A wave that adds the token but leaves the `var(--color-gold)` as a dual-read or a fallback inside the arm fails this clause (the no-leak floor — the bus carries the consumer token, not the ink).
2. **W2 — the consumer tokens default to gold at the chassis root (the back-compat floor).** `--phase-complete-color` and `--phase-complete-color-label` are declared at the `.instrument-chassis` root with `var(--color-gold)` / `var(--color-gold-dark, var(--color-gold))` defaults respectively (the back-compat default an un-overriding consumer inherits). RED at HEAD: no such token. Source-asserted (the root declaration + the gold-default value). **Bite**: the default resolves the SAME gold the four hardcoded lines did (the byte-identical floor) — asserted by the π (W5), source-asserted here as the gold-default presence.
3. **W3 — the WCAG twin pairs 1:1 (the label companion demoted in lockstep).** `--phase-complete-color-label` exists as the text-on-background companion (the L≈0.40-register twin), paired 1:1 with `--phase-complete-color` exactly as `--phase-color-label` pairs `--phase-color` across the four active phases. RED at HEAD: the complete arm's `--phase-color-label` is hardcoded `var(--color-gold-dark, …)`. **Bite**: the label twin is NOT dropped (a wave that demotes only the canvas ink and leaves the label hardcoded gold fails — the twin pairing is the WCAG companion contract, both demote or neither).
4. **W4 — the canon is recorded + the silver doc coherent.** CLAUDE.md's InstrumentChassis phase-canon section records the `--phase-complete-color` consumer seam (gold default, EARNED-not-leaked), the design-idioms chassis idiom row carries the demotion line, and the silver structure-twin comments (`instrument-chassis.css:150-160`, `InstrumentChassis.vue:38`) name the gold DEFAULT (not gold-as-only-ink). RED at HEAD: the canon names gold as the fixed complete affirmation. Source-asserted (the doc lines present). **Bite**: the silver register source is UNTOUCHED (the structure twin is W-NO-GRAY's sanctioned exception — a `diff` shows only the comment narration changed, no silver token re-pointed).

5. **The π binding readback** (the cardinal-lesson DELTA — captured own-surface with AZ-form freshness headers (capture date, HEAD sha, the route/viewport), BOTH modes): a live capture on the `demo/stories/compositions/instrument-chassis.vue` story driving the chassis to `phase="complete"`, with a paired π `getComputedStyle` readback proving (a) an UN-OVERRIDING chassis (the default story) paints the complete phase's `--phase-color` resolving to the gold value BYTE-IDENTICAL to the HEAD capture (the back-compat floor — a before/after frame pair against the pre-wave gold complete) — the spine vignette, hero number, surface tint all read the same gold; (b) a chassis under an ancestor that SETS `--phase-complete-color` to a NON-gold ink (the π injects a test host setting it to, e.g., a `--viz-legendre` violet or a synthetic aurora register) paints the complete phase in the CONSUMER ink, NOT gold (the consumer-chooses-the-ink proof — the `--phase-color` readback at `data-phase="complete"` resolves the injected ink, the bus carried the IDENTITY); (c) the WCAG label twin tracks (the `--phase-color-label` readback resolves the consumer label ink under the override, the default gold-dark un-overriding). Captured to `docs/tranches/BB/audit/visual/W-PHASE-PALETTE-DELTA.md` with the before/after frames (un-overriding-gold-identical vs overridden-consumer-ink), BOTH modes.

6. **The `proof:ba-gestalt` verdict** (BA inv-4 — the P-1 close-class fix; the HARDENED gate from Batch 1). Per-mechanism W1-W4 greens do NOT close this visual wave. The owning surface (the data/instrument band where the chassis lives — the relevant gestalt roster surface, the dark-register/cross-repo lanes) is captured WHOLE-PAGE, BOTH modes, mobile + desktop, over its real backdrop, and judged as a gestalt ("does completion read as a deliberate phase affirmation the consumer owns — gold where EARNED, the consumer ink where set — not a reflexive gild on every completion?"). The verdict is recorded with the capture; a FAIL deploys the research→wave-spec→redress triumvirate (W-REFLECT3, Batch 7). A source-green/visually-broken gap (the AZ failure class — the token landed but the default shifted the gold, or the override does not reach the surface) does NOT close.

W1-W4 are the device-free CI half (`proof:phase-palette`); the π readback (W5) + the gestalt verdict (W6) are the binding visual truth. All must hold for a clean close.

## File Bounds

| File | Access |
|---|---|
| `src/styles/instrument-chassis.css` | modify (declare the `--phase-complete-color`/`-label` root defaults beside the `--phase-color` idle default; re-point the `[data-phase="complete"]` arm's two ink lines onto the tokens; re-phrase the silver-twin comment to name the gold DEFAULT) |
| `src/components/custom/instrument-chassis/InstrumentChassis.vue` | modify (the `:38` doc-comment: name the gold DEFAULT, not gold-as-only-ink — a comment-only edit; NO prop/template change) |
| `scripts/proof-phase-palette.mjs` | create (the born-RED gate — the four SOURCE witnesses) |
| `package.json` | modify (register `proof:phase-palette` + add to `proof:all`/parity — the ONE script line emitted into the parallel group's registry owner's sequence) |
| `scripts/gates.mjs` | modify (register the gate row in the registry — emitted into the registry single-owner's sequence) |
| `CLAUDE.md` | modify (the InstrumentChassis phase-canon section: the `--phase-complete-color` consumer-seam record) |
| `docs/precepts/design-idioms.md` | modify (the chassis idiom row: the phase-complete-color demotion line — the BINDING idiom home) |
| `tests-visual/phase-palette.spec.ts` | create (the π readback — the un-overriding-gold-identical + the overridden-consumer-ink, both modes) |
| `docs/tranches/BB/audit/visual/W-PHASE-PALETTE-DELTA.md` | create (the captured DELTA + the gestalt verdict + the freshness header) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge rows + the demotion ledger entry) |

Do NOT touch:
- **The `--color-gold` token family** — `src/styles/theme/bridges.css` (`--color-gold: var(--gold)`), `src/styles/tokens/scale-paper.css`, `src/styles/tokens/dark-arm.css`, `src/styles/tokens/light-dark.css`. The new tokens READ `var(--color-gold)`/`var(--color-gold-dark)` as their DEFAULT (the existing tokens, unedited); the demotion declares a NEW chassis-local consumer token, it does NOT re-tune the gold itself. A gold-token re-tune is W-DARK-INK-WARM / W-DEAD-SWEEP's bound (triumvirate per Dispatch).
- **The four active-phase arms** — `instrument-chassis.css:202-220` (ping/download/upload/jitter). They ALREADY carry the consumer-seam (`var(--chart-{phase}, …)`); this wave touches ONLY the `complete` arm (the one that never got the seam). The four good arms are the MODEL, not a surface.
- **The silver / structure register source** — the `<InstrumentChassis variant="structure">` silver tokens (W-NO-GRAY's sanctioned cool-neutral exception). This wave clarifies the silver-twin's COMMENT narration of the gold default; it re-points NO silver token (the W4 bite asserts the silver source is byte-untouched).
- **The `--phase-tint-amount` / `--phase-tint-peak` warmth ramp** — the depth-of-tint is orthogonal to the ink choice and STAYS on the `complete` arm (`--phase-tint-amount: var(--phase-tint-peak)` unchanged). The demotion is the INK only.
- **The value.js / slides / kf / speedtest foreign trees** — the cross-repo fence HOLDS (by-name asks + consume contracts only). speedtest SETS `--phase-complete-color` (the consumer ink → its phase spectrum / aurora register) at AW.W7 in ITS repo — NEVER edited here. The speedtest `--headline-ink-gradient` consumer seam (named in the ask) is a speedtest token, not a library one. No speedtest/ppmycota hue enters a library token (presets-in-consumers; the library default stays the brand gold).
- **The GL shader internals** (`aurora.frag`/`metaball.frag`) — this wave touches a CSS token indirection; no shader. The standing fences hold.

### Disjointness

ONE agent unit (the surface is small enough — a two-line CSS re-point + one root default + the gate/doc — that a single agent owns it end-to-end; no intra-wave fan-out). Across the PRIMITIVES band (Batch P): W-BORDER-PROGRESS (`/border-progress`), W-DECK (`/deck`), W-DOCK-MORPH-FAMILY (dock morph), W-ON-GLASS-FG (the on-glass foreground tokens), W-SCROLL-CARD (the scroll-shrink card family), W-LIQUIDHOVER (the specular auto-arm), W-PAPER-GRID-TEXTURE (the paper-grid affordance) — all component-family-disjoint from this wave's bound (`instrument-chassis.css` + `InstrumentChassis.vue`) by construction. The ONE shared file is `scripts/gates.mjs` + `package.json` (the registry single-owner rule: a designated wave OWNS them for the parallel group; this wave's gate row + its one `package.json` script line land in that owner's sequence — coordinate the single write, this wave emits a row, it does not own the file). The `instrument-chassis.css` re-point is this wave's alone (no sibling primitive writes the chassis partial — confirm W-ON-GLASS-FG's `--progress-track-on-glass`/`--input-on-glass` rungs do not touch the chassis phase cascade; they are a foreground-register surface, disjoint from the phase-ink bus).

## Format And Lint Cadence

`npm run build` after the `instrument-chassis.css` re-point + the root-default declaration (confirm the `/styles` bundle compiles + the chassis partial cascade-resolves; the byte-identical-gold floor is the binding check — diff the resolved complete-phase `--phase-color` before/after); `npm run typecheck` is a no-op for a CSS+comment change but run it to confirm the `InstrumentChassis.vue` comment edit did not touch a typed surface; `node scripts/proof-phase-palette.mjs` born-RED before the source edits (proof it fails at HEAD — the arm reads `var(--color-gold)`), GREEN at close; `npm run proof:gate-script-parity` + `npm run proof:gate-manifest-sound` after the package.json/gates.mjs registration (the harness stays sound); `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BB/audit/visual/W-PHASE-PALETTE-DELTA.md` — the before/after frames (the un-overriding chassis painting gold complete BYTE-IDENTICAL to HEAD vs an `--phase-complete-color`-overriding host painting the consumer ink) + the paired π readback (the `--phase-color` resolution at `data-phase="complete"` under default-gold vs override, the label-twin tracking, both modes) + the freshness header (capture date, HEAD sha, route/viewport).
- The `proof:phase-palette` JSON artefact (born-RED log — the arm reads `var(--color-gold)` → GREEN-at-close log — the arm reads `var(--phase-complete-color)`, the gold default present, the label twin paired, the canon recorded; the four witnesses named).
- The `tests-visual/phase-palette.spec.ts` π output (the gold-identical + the consumer-ink-override, both modes).
- The `gate-script-parity` + `gate-manifest-sound` GREEN-at-close outputs (the harness sound after the registration).
- The `proof:ba-gestalt` chassis/data-band capture + recorded verdict (the W-REFLECT3 binding evidence).

## Commit Plan

- demotion commit: `feat(chassis): demote [data-phase=complete] gold to the --phase-complete-color consumer token — gold is EARNED, not leaked (BB.W-PHASE-PALETTE)` — names the root-default + the arm re-point + the WCAG-twin demotion + the silver-comment clarification in the body.
- gate commit: `test(chassis): proof:phase-palette born-RED→GREEN + the π readback + parity registration` — the four SOURCE witnesses + the gold-identical/consumer-ink π.
- doc/status commit: the CLAUDE.md phase-canon record + the design-idioms idiom-home line + the DELTA doc + the PROGRESS rows (the demotion ledger entry).

## Dependencies

- **Depends on**: the Batch-0 integrity floor (W-CI-GREEN — the harness is trustworthy before the new gate registers) + the Batch-1 gestalt hardening (W-GESTALT-GATE2 + W-VISUAL-RUNNER — the primitive's `proof:ba-gestalt` verdict + the π runner are real before the close judges the demotion). NO cross-repo blocking dep (the fix is a pure glass-ui token indirection; no value.js/kf helper needed — distinguishing this from the P0 spectrum waves).
- **Blocks**: speedtest AW.W7 (the R-CONSUME wave — speedtest bumps `^4.1.0`, SETS `--phase-complete-color` (completion ink → the phase spectrum on W3, the aurora spectrum on the WV2 thank-you), and the chassis stops leaking gold onto routine completion; the consumer already landed its `--headline-ink-gradient` seam, so this demotion removes the chassis-override NEED). The ≥2-consumer trigger — speedtest W3 (completion ink → phase spectrum) + WV2 (thank-you → aurora spectrum) — is met on consume. The cross-repo consume is the consumer's repo (speedtest), never edited here.

## Named successors

- **speedtest AW.W7** — the consumer's R-CONSUME: sets `--phase-complete-color` on its completion surfaces (the phase spectrum, the thank-you aurora register), retires the chassis-override workaround, and gold exits routine completion (gold returns to the EARNED register: the dock CTA + the personal-best garnish). The deletion trigger is "the ask ships" — this wave at 4.1.0.
- **W-CLOSE (Batch 7)** — documents the `--phase-complete-color` consumer-token demotion as the named clean break (`BB.W-CLOSE.md:111` — "gold is now EARNED, not the chassis default"); the 4.1.0 cut ships the seam.
- **A consumer phase-palette family** — if a second/third consumer surfaces a genuine need for a fuller per-phase consumer-ink override family (the four active arms ALREADY have `--chart-{phase}`; a `--phase-{phase}-color` generalization would unify the bus) with ≥2 consumers, it is a successor scope, NOT a fold into this wave (the N18 ask is the `complete` arm ALONE — the one phase that never got the seam; the four good arms are already done, no speculative generalization).

## Archaeology

No prior attempt — the `complete` arm shipped hardcoded gold from the chassis's inception (the four active arms got the `--chart-{phase}` consumer seam; `complete` never did, the N18 finding). The guardrails carried from the BA waves: the W1 bite asserts the POSITIVE (the arm reads the consumer token) AND the negative (no `var(--color-gold)` survives inside the complete arm — the no-leak floor, the negative-predicate `proof:register-ios` precedent), and the W5 π readback is the binding visual truth (the gold-default-byte-identical AND the consumer-ink-override-reaches-the-bus), because the AZ failure class (a green source gate over a still-wrong live render — here, a default that shifts the gold, or an override the cascade clobbers) is exactly what re-opens these. The cardinal lesson holds: the binding evidence is the captured own-surface DELTA with freshness headers + the paired π (the before/after gold-identical frame pair + the override readback), not a close-message claim. The presets-in-consumers law holds: the demotion mints a CONSUMER seam with a library-default (gold stays the library identity, the override is the consumer's) — gold is EARNED at the consumer's choice, never the chassis default leaking onto every completion.
