# BB.W-PHASE-PALETTE — DELTA

> **Freshness header**
> - **Capture date**: 2026-06-17
> - **HEAD sha (pre-wave)**: `58c1d080cf5356833ee187355efd86a7aec39f1b`
> - **Route**: `/compositions/instrument-chassis` (driven to `phase="complete"`)
> - **Viewports**: mobile 390×844 · desktop 1280×800
> - **Modes**: light + dark
> - **Binding live π**: the painted frame-pair capture rides **W-REFLECT3** (Batch 7) on the consolidated build; this DELTA records the source-side demotion + the gate witnesses + the π spec contract. The π spec `tests-visual/phase-palette.spec.ts` is the re-runnable readback (auto-enrolled in `--run pi`).

## The charge (speedtest N18)

Demote the chassis `[data-phase=complete] ⇒ --phase-color: var(--color-gold)` assertion to a `--phase-complete-color` CONSUMER token (default gold for back-compat) so the bus carries phase IDENTITY and the consumer chooses the completion ink. The WHY is the brand-discipline one: **gold is EARNED (the dock CTA + personal-best garnish), not the chassis default leaking gold onto every completion + the survey/thank-you.**

## §0 RE-GROUND drift

Re-grepped every cite at HEAD `58c1d08`. Cites held — NO drift from the spec's authoring sha `f3c4170e`:
- The four good arms (`instrument-chassis.css:202-220`) + the leaking `complete` arm (`:222-226`) are exactly as cited.
- The root `--phase-color`/`--phase-color-label` idle defaults (`:72-73`).
- `--color-gold` = `var(--gold)` (bridges.css:209 / scale-paper.css:112) with the `.dark` arm (dark-arm.css:336) + the `light-dark()` arm (light-dark.css:177) — so the new tokens reading `var(--color-gold)` inherit the SAME mode resolution the hardcoded form did (the byte-identical floor by construction).
- The spine vignette consumer (glass.css:454, `color-mix(--phase-color 8%)`) + the backdrop tint (instrument-chassis.css:42,87) read `--phase-color` — kept byte-identical for an un-overriding consumer.
- The silver structure-twin comment (instrument-chassis.css:149-156) + the Vue doc-comment (InstrumentChassis.vue:37-38) reference "the gold complete-phase affirmation" — re-narrated to name the warm-gold DEFAULT.
- The demo exerciser (`demo/stories/compositions/instrument-chassis.vue`) cycles a `phase` ref through `"complete"` and binds `:style="{ color: 'var(--phase-color)' }"` — the π exerciser.

## The demotion (the two-line clean break + one root default)

### Before (HEAD — the leak)
```css
.instrument-chassis[data-phase="complete"] {
    --phase-color: var(--color-gold);                       /* the leak: a fixed brand ink, no consumer seam */
    --phase-color-label: var(--color-gold-dark, var(--color-gold));
    --phase-tint-amount: var(--phase-tint-peak);
}
```

### After (the consumer seam — matches the four active arms)
Root default (beside the `--phase-color` idle default):
```css
--phase-complete-color: var(--color-gold);
--phase-complete-color-label: var(--color-gold-dark, var(--color-gold));
```
The arm (the demotion):
```css
.instrument-chassis[data-phase="complete"] {
    --phase-color: var(--phase-complete-color);
    --phase-color-label: var(--phase-complete-color-label);
    --phase-tint-amount: var(--phase-tint-peak);           /* the warmth ramp STAYS — orthogonal to the ink */
}
```

This is a **clean break with a back-compat DEFAULT, not a back-compat ALIAS**: no `--color-gold` dual-read survives inside the arm; the gold lives ONLY in the token's default at the chassis root. After the re-point the `complete` arm is structurally identical to its four siblings — a `var(<consumer-token>)` read off the bus, not a fixed ink.

## The before/after gestalt (the binding readback contract)

The π `tests-visual/phase-palette.spec.ts` asserts on the live `/compositions/instrument-chassis` route:

| frame | `--phase-color` @ `data-phase="complete"` | verdict |
|---|---|---|
| **(a) un-overriding, light** | resolves `--color-gold` byte-identical | back-compat floor — the spine vignette / hero number / surface tint read the SAME gold as HEAD |
| **(a) un-overriding, dark** | resolves the `.dark`-arm gold byte-identical | the mode-resolution inherited (no hardcoded dark re-declaration in the arm) |
| **(b) `--phase-complete-color`-overriding host** | resolves the CONSUMER ink (synthetic `rgb(155,110,220)` violet), NOT gold | consumer-chooses-the-ink — the bus carried the IDENTITY; the override on an ANCESTOR reaches the arm via inheritance |
| **(c) WCAG twin under override** | `--phase-color-label` resolves the consumer label ink | the twin demotes in lockstep (both demote or neither — the WCAG companion contract) |

The override is set on the chassis's ANCESTOR (the cascade-win the spec Dispatch names): the arm reads `--phase-complete-color` via INHERITANCE, so a host-level set on any ancestor cascades to the arm — not a same-element override the arm clobbers.

## Gate evidence

`proof:phase-palette` (born-RED → GREEN):
- **Born-RED @ HEAD**: 9 source violations against the un-edited `instrument-chassis.css` (the arm reads `var(--color-gold)`; no consumer token; the canon unrecorded).
- **GREEN @ close**: W1 (arm reads consumer token, no gold leak) · W2 (tokens default to gold at the chassis root) · W3 (WCAG twin pairs 1:1) · W4 (canon recorded — CLAUDE.md phase-canon + design-idioms chassis row + silver-twin comments name the gold DEFAULT + the silver source byte-untouched) · self-test bite (the W1 no-leak negative predicate catches a synthetic gold-in-arm).
- The W4 CLAUDE.md witness greens once the orchestrator applies the phase-canon note (RETURN-only file). Simulated injection verified GREEN (0 violations).

## Fences honored

- `--color-gold` token family UNTOUCHED (the new tokens READ it as their default).
- The four active-phase arms UNTOUCHED (they already carry the seam — the model, not a surface).
- The silver/structure register SOURCE byte-untouched (W-NO-GRAY's sanctioned cool-neutral exception — only the comment narration of the gold default clarified; W4 negative predicate asserts the `--twin-line-*` silver recipes intact).
- `--phase-tint-amount`/`--phase-tint-peak` warmth ramp STAYS on the complete arm (the depth-of-tint is orthogonal to the ink).
- No speedtest/ppmycota hue enters a library token (presets-in-consumers — the library default stays the brand gold; speedtest SETS `--phase-complete-color` at AW.W7 in ITS repo).
- The GL shader fence holds (this is a CSS token indirection; no shader touched).

## gestalt verdict (proof:ba-gestalt, BA inv-4)

The data/instrument-band chassis surface is captured WHOLE-PAGE both modes, mobile + desktop, over its real backdrop, and judged: *does completion read as a deliberate phase affirmation the consumer owns — gold where EARNED, the consumer ink where set — not a reflexive gild on every completion?* The whole-page capture + the recorded PASS/FAIL verdict ride **W-REFLECT3** (the single authorized verdict-flipper). The source-green/visually-broken AZ close-class (the default shifted the gold, or the override does not reach the surface) does not close — the binding evidence is the W-REFLECT3 frame-pair, not this source DELTA alone.
