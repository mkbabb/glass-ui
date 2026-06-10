# AY.W-PRIM-POLISH — the primitive-defect wave: gold-CTA contrast, the lying hover specimen, the cream-fog scrim, the dark destructive badge, the slider focus halo, the checks-band canon decision

**Tranche** AY (glass-ui) · **Band** B (component reconcile) · **Type** primitive defect-fix (token + scoped-CSS + one demo specimen + ONE design decision) · **State** OPEN · **Repo** glass-ui (`/Users/mkbabb/Programming/glass-ui`, branch `tranche/AY`)
**Depends on** W-CARDINAL-INFRA (the AY cardinal home + `proof:live-verified-ledger:ay`, which the painted-pixel DELTA arms name) + W-GLASS / W-LEG1 (the `--glass-level` + `--glass-backdrop` legibility seam the checks-band decision and the hover specimen ride — the post-W54 glass hover is the real hover the specimen must teach) + W54 (the glass-first default Button is the register the lying specimen mis-teaches).
**Source risk** LOW-MEDIUM — token splits (`--overlay-scrim`, the dark destructive badge plate) re-resolve at every consume site (clean break, no alias per the no-backwards-compat rule); the gold-CTA hover and the slider focus halo are scoped-CSS / utility edits; the one demo-specimen edit is demo-private; the checks-band decision is either a token re-route (glass canon) or an allowlist append (W54 allowlist) — both small, but the DECISION is load-bearing.

---

## Goal criterion

The four headline-surface primitive defects FD-primitives caught with painted-pixel numbers are fixed at the ROOT and re-proven against PIXELS (not tokens): the gold "Next →" CTA's light-mode hover is legible (≥4.5:1 painted, not 1.29:1) by deepening the plate or holding warm-ink text; the flagship buttons page no longer ships a hover specimen that lies (`bg-primary/90`, the pre-W54 solid-primary look on the post-W54 glass default, illegible in BOTH modes) — it teaches the REAL post-W54 glass hover; the dark-mode modal scrim recedes to ink instead of flooding the room with a cream fog (`--overlay-scrim` split off `--shadow-color`, pinned to ink in BOTH modes); and the dark destructive badge clears AA (≥4.5:1, was 3.07:1). The slider thumb focus is raised to the one-focus-system button register (30% ring / 15% halo, was an 8%-alpha ghost). The checks band (Checkbox/Radio/Switch) is DECIDED against the glass-first canon: either converted INTO the glass register or formally added to the W54 legibility allowlist — they are neither today (unratified opacity). A fresh reader sees every primitive page tell the truth its tokens promise, anchored by a painted-pixel contrast readback.

## Completion criterion

ALL of the §6 hard-gate set verify: `proof:affordance-contrast` is extended to a PAINTED-PIXEL sample of `gold-audacious` :hover in LIGHT mode (the gate asserts tokens today; it must sample the rendered backplate-vs-label ratio) and is GREEN at the fixed HEAD + born-RED on the 1.29:1 state; the demo specimen edit lands and a π readback confirms the buttons-page hover specimen paints the real glass-hover (not the 1.28:1 ink-on-ink); a `proof:scrim-contract` (or the extended affordance-contrast scrim arm) asserts `--overlay-scrim` resolves to an INK-receding wash in BOTH light and dark (born-RED on the dark cream-fog `srgb(0.91 0.906 0.89 / 0.5)`); the dark destructive badge painted ratio ≥4.5:1; the slider thumb focus halo reads at the button register (computed-style readback ≥ the 0.3/0.15 floor, born-RED on the 8%); and the checks-band decision is RECORDED with its mechanism landed (a glass-tier route OR a `VISUAL-ALLOWLIST`/legibility-allowlist append with rationale) + machine-checked by the relevant proof. The own-surface DELTA (`W-PRIM-POLISH-*.png`, light+dark, the four fixed primitive surfaces) is captured on the AY cardinal home and `proof:live-verified-ledger:ay` GREEN over the row.

---

## §1 — The verified defects (file:line — cited from the audit corpus, NOT re-derived)

All six are from `docs/tranches/AY/audit/design/FD-primitives.md` §3 (the D1-D6 table) + §4 (the weakest-three) + §7 (the recommended edits), corroborated for the dark Dialog scrim by `docs/tranches/AY/audit/reality/RA-anim-suite.md` §1.

### D1 — gold-audacious CTA light-mode hover paints WHITE-ON-PALE-GOLD at 1.29:1 (the label vanishes at the moment of intent)

`FD-primitives.md` §3 D1: on hover the gold "Next →" flips text to `rgb(255,255,255)` over a SAMPLED backplate of `rgb(240,226,188)` — pale gold, NOT the "saturated gold backplate" the AW.W13 contract names. White-on-near-white = **1.29:1**; the CTA label disappears at the exact moment of click intent. Dark mode is FINE (9.02:1 over `rgb(87,71,33)`), which is why a dark-leaning dev loop misses it. The recipe is `@utility btn-audacious-gold` in `src/styles/utilities.css` (the gold-sweep hover: a translucent `--color-gold-*` linear-gradient over the paper-grain + the `--glass-specular` catch-light + the `btn-gold-bg-sweep` shimmer; rest text warm-ink `--foreground`, hover/active flips to white per the AW.W13 contrast contract). **The gate is BLIND:** `proof:affordance-contrast` is presumably GREEN while 1.29:1 paints — it asserts the TOKEN values, not the painted-pixel ratio in light mode (FD-primitives §3 D1 + §7.1). Captures: `buttons-gold-hover-zoom--light.png`, `buttons-hover-gold--light.png`.

### D2 — the four-state-contract HOVER SPECIMEN lies, illegibly, in BOTH modes (teaches the pre-W54 hover on the flagship buttons page)

`FD-primitives.md` §3 D2: `demo/stories/display/buttons.vue:99` paints `<Button class="bg-primary/90">Hover (sim.)</Button>` — the PRE-W54 solid-primary hover slapped onto the post-W54 GLASS default, WITHOUT the text-flip that the `solid` variant carries. Painted result: ink-on-ink **1.28:1** light, putty-on-putty **1.18:1** dark. The REAL default hover is `--glass-bg-resting` (α 0.3→0.65 alpha-bump, no lift — the lift is opt-in `btn-interactive`, deliberate per W52). The spec page teaches a hover state the button no longer has, on the flagship buttons page (the page a consumer reads FIRST to learn the register). Captures: `buttons-1--light.png`, `buttons-1--dark.png`, probe.

### D3 — dark-mode modal scrim is a CREAM FOG (the scrim BRIGHTENS the room at the modal moment)

`FD-primitives.md` §3 D3 + §4.3 (corroborated by `RA-anim-suite.md` §1, the dark Dialog open observation): `--overlay-scrim = color-mix(… var(--shadow-color) 50% …)` and `--shadow-color: var(--foreground)` — CORRECT for shadows (the shadow re-tints under `.dark` by token construction, the cartoon-shadow contract), INVERTED for a scrim. In dark mode the Dialog overlay paints `srgb(0.91 0.906 0.89 / 0.5)` — a 50% near-WHITE wash that BRIGHTENS the whole page at the modal moment. Every native dark-mode register DIMS; this one FLOODS. Light mode is the classic ink scrim and reads right. A scrim's role is to RECEDE — it must pin to ink in both modes (FD-primitives §7.3: "break `--overlay-scrim` off `--shadow-color`… pin it to ink in both modes; clean break, no alias, per house rules"). The `ModalOverlay` consumer (`src/components/ui/_shared/`) + the Dialog/Sheet/Drawer overlays read the scrim token. Capture: probe (`dialog.dark.surfaces`), `dialog-open--dark.png`.

### D4 — dark destructive badge misses AA at 3.07:1

`FD-primitives.md` §3 D4: `rgb(235,71,71)` plate with `rgb(232,231,227)` text at 14px/600 (NOT large text → fails the 4.5:1 floor). Light passes (4.7). The badge destructive register is the loud-saturated-pill register (Badge is on the W54 legibility allowlist as a loud pill — but allowlisted opacity does NOT excuse a contrast miss). The dark plate must lift (or the text drop to ink) to clear 4.5:1 at 14px/600. The site is the `destructive` variant in `badgeVariants` CVA (`src/components/ui/badge/index.ts`) + its dark-arm tokens. Capture: probe (`badge.dark.variants`), `badge-0--dark.png`.

### D5 — slider thumb focus is a near-invisible 8%-alpha ghost (one focus system, two calibrations)

`FD-primitives.md` §3 D5 + §5 (the affordance table marks slider focus **FAIL-ish**): the rest thumb shadow is `none`; keyboard `:focus-visible` adds only a 4px halo at **8% alpha** (`srgb(0.11 0.098 0.09 / 0.08)`). On a 16px thumb that is a ghost — WCAG 2.4.7 in spirit, and far below the button/input focus register (the warm-ink double ring: 2px @ 30% + 8px halo @ 15%). ONE focus system, two calibrations — the slider must rise to the button register. The site is the `.slider-thumb:focus-visible` rule in `src/components/ui/slider/Slider.vue` scoped CSS (the focus halo leg), which should compose the SAME `--focus-ring-shadow` token the `.focus-ring` utility keys off (the token-first focus axis, CLAUDE.md §"The `.focus-ring` CSS utility over inline focus-visible"). Capture: `slider-thumb-focus--light.png`, probe.

### D6 — the glass default Button is indistinguishable from four siblings over flat cream (CONTEXT, not component — routed elsewhere)

`FD-primitives.md` §3 D6 + §4.1: default / outline / ghost / glass / glass-wash all paint near-identical white pills over the flat cream the storybook gives them; the default's hover is an alpha bump with no lift. This is the KNOWN W54→W60 sequencing gap — glass laid before the rich page backdrops that make it POP (W60 in the umbrella page-redesign). **NOT this wave's fix** — routed to the page-redesign band (the backdrop that makes glass legible-as-glass). This wave records it as the context defect and does NOT chase it with a per-variant tint (that would fight the W54 glass-first canon). Captures: `buttons-0--light.png`, `buttons-0--dark.png`, hover probe. (Also FD-primitives §4.1: the buttons page prose includes an all-caps mono spec-dump — "REST TEXT: VAR(--FOREGROUND)…" — internal-register text on a public surface; folds into the W-SB1 storybook KEEP/FIX pass, NOT here.)

### D7 — the checks band (Checkbox/Radio/Switch) is NEITHER glass-canon NOR allowlisted (unratified opacity — the DECISION this wave makes)

`FD-primitives.md` §4.2: Checkbox/Radio/Switch are 16px OPAQUE atoms — "the least distinctive objects in the library", the warm-ink ON-state the only signature, no glass, no rest-state spring. They read as "the unconverted remainder of the glass-first canon", AND they are NOT on the W54 legibility allowlist (`avatar/label/separator/skeleton/table/badge`), so their opacity is **unratified rather than blessed**. The glass-first canon (CLAUDE.md §"Glass-first canon (AX.W54)") is binary: a surface is EITHER glass (rides `--glass-level`) OR named on the allowlist with rationale. The checks band is in neither set → this wave DECIDES (§2.6) and machine-locks the decision.

---

## §2 — Objective (root-not-consumer; each fix at the token/recipe seam, re-proven against PIXELS)

1. **D1 — fix the gold CTA light-hover at the recipe + arm the painted-pixel gate.** TWO acceptable routes (decide against the capture, record in the DELTA):
   - **(a) deepen the plate** — push the light-mode hover backplate from the pale `rgb(240,226,188)` toward `--color-gold-600`+ (a saturated gold the white label clears at ≥4.5:1), keeping the white text flip; OR
   - **(b) hold warm-ink text** — keep the pale-gold plate but DON'T flip text to white in light mode until the plate saturates (warm-ink `--foreground` over pale gold clears the floor).
   Route (a) is the AW.W13-contract-true path (the contract names a "saturated gold backplate"); route (b) is the lower-risk hold. EITHER way, EXTEND `proof:affordance-contrast` to SAMPLE the painted backplate-vs-label ratio of `gold-audacious` :hover in LIGHT mode (the gate asserts tokens today and passes while 1.29:1 paints — FD-primitives §7.1). The fix is at `@utility btn-audacious-gold` in `utilities.css`, NOT a per-consumer override.

2. **D2 — replace the lying specimen with the REAL post-W54 glass hover.** `demo/stories/display/buttons.vue:99`: replace `class="bg-primary/90"` with the real default hover (`bg-[var(--glass-bg-resting)] border-[var(--glass-border-resting)]`), OR render a genuinely-:hover'd specimen (a forced-hover-state demo helper). The specimen must teach what the button actually does (FD-primitives §7.2). Demo-private edit; verified by a π readback of the specimen's painted color.

3. **D3 — split `--overlay-scrim` off `--shadow-color`; pin to ink in BOTH modes (clean break).** Mint `--overlay-scrim` as its own identity token in `tokens.css` (`color-mix(in srgb, <ink> N%, transparent)` against an INK base in `:root` AND a `.dark` re-resolution that stays DARK — NOT the cream `--foreground` flip). The scrim recedes; the shadow family is UNTOUCHED (it correctly rides `--shadow-color`). No alias, no migration shim (the no-backwards-compat rule). The `ModalOverlay` + Dialog/Sheet/Drawer overlays consume the new token (FD-primitives §7.3).

4. **D4 — lift the dark destructive badge to AA.** In `badgeVariants` (`badge/index.ts`) destructive dark arm: lift the plate (or drop the text to ink) so the painted ratio ≥4.5:1 at 14px/600. The loud-saturated register is preserved (Badge stays an allowlisted loud pill) — the fix is the contrast, not the register (FD-primitives §7.4).

5. **D5 — raise the slider thumb focus to the button register.** Re-point `.slider-thumb:focus-visible` (Slider.vue scoped CSS) to compose the `--focus-ring-shadow` token (the warm-ink 30% ring + 15% halo the buttons use) — ONE focus system, ONE calibration (FD-primitives §7.5). This is the token-first focus axis (CLAUDE.md): the slider must read the same focus token, not a hand-set 8%.

6. **D7 — DECIDE the checks band against the glass-first canon (the load-bearing decision; §2.6 below).**

7. **D6 — RECORD as the W54→W60 context defect, route to the page-redesign band; do NOT chase per-variant.** (Scope-fence below.)

### §2.6 — The checks-band DECISION (Checkbox/Radio/Switch: glass-canon OR W54 allowlist)

Per the glass-first canon (CLAUDE.md §AX.W54), a surface is EITHER glass (rides `--glass-level`, the opacity recipe `1 - (1 - <rung-α>) * --glass-level`) OR named on the W54 legibility allowlist with rationale. The checks band is in NEITHER. The two arms, both specced; the decision is made by the canon (NOT a user-hinge unless genuinely ambiguous):

- **ARM A — CONVERT into the glass register (the glass-canon-true arm).** The Switch TRACK gets the glass-wash tier + the specular top-edge (a glass surface big enough to read glass — FD-primitives §4.2 names "give the switch track the wash tier + specular"); the Checkbox/Radio BOXES are too small (16px) for a perceptible glass blur over a flat substrate, so they take the glass tier at `--glass-level` but read effectively-opaque at that size (the blur is sub-perceptual on a 16px atom over flat cream — the same W54→W60 truth as D6). The ON-state (the warm-ink fill + the check glyph) is UNCHANGED (the signature stays).
- **ARM B — ADD to the W54 legibility allowlist (the bless-the-opacity arm).** Checkbox/Radio/Switch join `avatar/label/separator/skeleton/table/badge` on the allowlist with the rationale: a form atom's STATE (checked/unchecked) must read at a glance with maximal contrast — translucency on a 16px selection control degrades the affordance, the same legibility argument the allowlist already makes for `badge`'s loud pill. The opacity becomes RATIFIED (blessed, not unconverted).

**The canon-decided default is ARM B for Checkbox/Radio + ARM A (track-only) for Switch** — the rationale: a 16px Checkbox/Radio box is below the size where glass reads as glass (the blur is sub-perceptual over a flat substrate; ARM A would ship machinery that paints opaque anyway, the speculative-substrate overfit), and its checked-state affordance wants maximal contrast → ALLOWLIST. The Switch TRACK is a 28–32px surface large enough to carry the glass-wash + specular legibly → ARM A (the one checks-atom that earns glass). This SPLIT is the canon-correct answer (size-gated): bless the small atoms, glass the large track. **Mark as a USER-HINGE ONLY IF** the executing orchestrator judges the split genuinely ambiguous against the live capture (a Switch track that reads worse as glass than opaque flips it to ARM B too) — the §3a diagnostic-loop bullet governs. The decision is RECORDED in the DELTA + machine-locked: ARM A adds the Switch track to the glass-tier proof set (`proof:glass-one-model` no longer flags it as an off-allowlist solid surface); ARM B appends `checkbox/radio` to the W54 legibility allowlist the `proof:glass-one-model` / `proof:glass-level` gate reads (the allowlist that LEGITIMATELY stays opaque).

---

## §3 — Edit-sites (exact; re-grep every cite against HEAD before editing — the stale-worktree discipline)

### E1 — `src/styles/utilities.css` (D1 gold CTA hover)
The `@utility btn-audacious-gold` recipe — the light-mode hover backplate. Route (a): deepen toward `--color-gold-600`+ so the white label clears ≥4.5:1; route (b): gate the white text-flip behind the saturated-plate state, holding warm-ink in light. Do NOT touch the dark arm (9.02:1, fine). Do NOT touch `btn-audacious` (the primary-audacious recipe — D1 is gold-only).

### E2 — `scripts/proof-affordance-contrast.mjs` (+ a π twin if the painted sample needs a live render) (D1 gate)
EXTEND the gate to sample the PAINTED `gold-audacious` :hover backplate-vs-label ratio in LIGHT mode (the gate asserts tokens today — FD-primitives §7.1). If the painted sample requires a live render (the gradient/blend backplate is not statically computable), add a π twin (`tests-visual/affordance-contrast-gold.spec.ts`) that drives the demo `display/buttons` route, hovers the gold CTA, samples the rendered label + backplate pixels, and asserts ≥4.5:1 — born-RED on the 1.29:1 HEAD state.

### E3 — `demo/stories/display/buttons.vue:99` (D2 lying specimen — DEMO-PRIVATE)
Replace `<Button class="bg-primary/90">Hover (sim.)</Button>` with the real post-W54 glass hover specimen (`bg-[var(--glass-bg-resting)] border-[var(--glass-border-resting)]`) OR a genuinely-hovered render. Re-grep `:99` against HEAD (the line may have drifted).

### E4 — `src/styles/tokens.css` (D3 scrim split)
Mint `--overlay-scrim` as its OWN identity token (NOT `color-mix(… var(--shadow-color) …)`). In `:root`: an ink-receding wash (`color-mix(in srgb, <ink> ~50%, transparent)`). In `.dark`: a re-resolution that STAYS DARK (NOT the cream `--foreground` flip — the scrim recedes in both modes). Re-grep the current `--overlay-scrim` declaration (FD-primitives §3 D3 cites the `var(--shadow-color) 50%` form) + every consumer (`grep -rn 'overlay-scrim' src/`). The `--shadow-color` / `--shadow-cartoon-*` family is UNTOUCHED (it correctly re-tints under `.dark` — the cartoon-shadow contract).

### E5 — `src/components/ui/badge/index.ts` (D4 dark destructive badge)
The `destructive` arm of `badgeVariants` — its dark-mode plate/text. Lift the plate (or drop text to ink) so the painted ratio ≥4.5:1 at 14px/600 (FD-primitives §3 D4). Re-grep the destructive variant + its dark tokens.

### E6 — `src/components/ui/slider/Slider.vue` (D5 focus halo)
The `.slider-thumb:focus-visible` scoped rule — re-point its halo to compose `--focus-ring-shadow` (the button register: 30% ring + 15% halo), replacing the 8%-alpha 4px halo. **CO-WRITE GUARD:** Slider.vue is touched by W-SLD1 (the cylinder geometry), W-GLASS (`--glass-level` legs), W-SCALE2 (hit-area), W-DOCK3 (read-only). Sequence this AFTER W-SLD1's geometry lands so the focus edit is surgical on the resolved thumb (the §3a / §4 disjointness governs). Re-grep the focus-visible rule against HEAD.

### E7 — the checks-band edit (D7; per the §2.6 decision)
- ARM B (Checkbox/Radio → allowlist): append `checkbox`, `radio` (or `radio-group`) to the W54 legibility-allowlist the `proof:glass-one-model` / `proof:glass-level` gate reads (re-grep the allowlist literal in `scripts/proof-glass-*.mjs`). The SFCs (`checkbox/Checkbox.vue`, `radio-group/RadioGroupItem.vue`) are UNCHANGED (they stay opaque-blessed).
- ARM A (Switch track → glass): the `switch/Switch.vue` track scoped CSS gains the `.glass-wash` tier + the specular top-edge (`--glass-specular` inset), and the Switch is removed from any "off-allowlist solid surface" the glass proof would flag. The ON-state (warm-ink fill + glyph) UNCHANGED.
Record the chosen arm per atom in the DELTA; machine-lock per the §6 gate.

### E8 — `docs/tranches/AY/audit/visual/W-PRIM-POLISH-DELTA.md` (NEW) + `VISUAL-ALLOWLIST.json`
The captured own-surface DELTA: the four fixed primitive surfaces (gold CTA hover, the corrected buttons specimen, the dark modal scrim, the dark destructive badge) + the slider focus + the checks-band result, light+dark, with the PAINTED-PIXEL contrast numbers (the gate's binding readback). Append `"W-PRIM-POLISH"` to `VISUAL-ALLOWLIST.json`.

---

## §3a — Triumvirate dispatch

- **Scope-reveal:** if the gold-CTA painted-pixel gate cannot be expressed without a NEW live-render harness beyond the existing `proof:affordance-contrast` shape (the gradient backplate is not samplable statically AND no π twin pattern fits) — the scope-reveal trigger fires; the orchestrator triumvirates (research the painted-sample harness, amend the gate edit-bounds, redress).
- **Checks-band ambiguity (the only user-hinge path):** §2.6 is canon-decided (ARM B small atoms / ARM A Switch track). If the LIVE Switch-track-as-glass capture reads WORSE than opaque (the glass blur muddies the on/off affordance over the flat substrate), the diagnostic-loop bullet fires: surface the Switch-glass capture to the user for the one-line ratification (glass track vs allowlist-opaque), NOT a third engineering iteration. The Checkbox/Radio allowlist arm is NOT a hinge (canon-clear: too small for legible glass).
- **Scrim-split blast radius:** if splitting `--overlay-scrim` off `--shadow-color` reveals a consumer reading the scrim token for a NON-overlay purpose (a grep surprise) — the scope-reveal trigger fires; the orchestrator triumvirates rather than silently re-pointing a shared token.

---

## §4 — File bounds + disjointness

| File | Access |
|---|---|
| `src/styles/utilities.css` | modify (`btn-audacious-gold` light-hover only — D1) |
| `scripts/proof-affordance-contrast.mjs` | modify (the painted-pixel gold-hover arm — D1 gate) |
| `tests-visual/affordance-contrast-gold.spec.ts` | create (IFF the painted sample needs a live render — D1 π twin) |
| `demo/stories/display/buttons.vue` | modify (`:99` specimen only — D2; demo-private) |
| `src/styles/tokens.css` | modify (`--overlay-scrim` split — D3; the shadow family UNTOUCHED) |
| `src/components/ui/badge/index.ts` | modify (`destructive` dark arm — D4) |
| `src/components/ui/slider/Slider.vue` | modify (`.slider-thumb:focus-visible` halo — D5; AFTER W-SLD1 geometry) |
| `src/components/ui/switch/Switch.vue` | modify (track glass-wash + specular — D7 ARM A, conditional) |
| `scripts/proof-glass-one-model.mjs` / `proof-glass-level.mjs` (the W54 allowlist literal) | modify (allowlist append — D7 ARM B) |
| `docs/tranches/AY/audit/visual/W-PRIM-POLISH-DELTA.md` | create |
| `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` | modify (append `"W-PRIM-POLISH"`) |

**Disjointness.** The scrim split (`tokens.css`) is disjoint from every other AY token wave EXCEPT W-LEG1 (legibility reconcile) — coordinate the `--overlay-scrim` mint with W-LEG1's token edits (sequence, do not co-write `tokens.css`). The Slider focus edit (E6) is the FIVE-writer Slider.vue case (W-SLD1/W-GLASS/W-SCALE2/W-DOCK3/this) — sequence AFTER W-SLD1's cylinder geometry so the focus rule edits the resolved thumb. The `VISUAL-ALLOWLIST.json` append merges with sibling appends (do not co-write in parallel). The buttons.vue specimen (E3) is demo-private and disjoint from every src wave. The badge + utilities + switch edits are each single-file disjoint.

---

## §5 — Risk ledger

1. **Token-assert-vs-pixel-assert (the #1 lesson, D1).** `proof:affordance-contrast` is GREEN today while 1.29:1 paints because it asserts tokens, not pixels (FD-primitives §3 D1). The gate extension MUST sample the rendered backplate — a token-only re-assert would re-ship the blind spot. Born-RED on the 1.29:1 HEAD state is mandatory.
2. **Scrim split clean-break (D3).** The split is a clean break (no alias, no `--overlay-scrim: var(--shadow-color)` shim — the no-backwards-compat rule). A consumer that overrode the OLD `--overlay-scrim` derivation re-points to the new identity token (one-line, the override-on-the-cascade pattern); the cartoon-shadow contract is UNTOUCHED (it rides `--shadow-color`, a different token).
3. **Checks-band overfit (D7).** ARM A on a 16px Checkbox/Radio would ship glass machinery that paints opaque at that size (sub-perceptual blur over flat cream — the speculative-substrate overfit the J-inv-10 / L-inv-8 bar forbids). The size-gated split (bless small / glass the large track) is the canon-correct refusal of that overfit. The DELTA records WHY each atom got its arm.
4. **Slider focus co-write (D5).** Slider.vue has five AY writers; the focus edit MUST land after W-SLD1's geometry (else it edits a thumb whose box is about to change). Sequence per §4.
5. **Gold-hover route choice (D1).** Route (a) deepen-plate is AW.W13-contract-true but a bigger visual change (the hover plate saturates); route (b) hold-warm-ink is lower-risk but diverges from the contract's "white over saturated gold". Decide against the capture; record the route + the painted ratio in the DELTA.
6. **D6 is NOT this wave's fix.** Chasing the five-identical-pills with per-variant tints would FIGHT the W54 glass-first canon (the variants are SUPPOSED to read similar over a flat substrate; the rich backdrop is W60's job). This wave records D6 as the W54→W60 context defect and routes it — it does not patch it.

---

## §6 — HARD GATE (evidence-backed; born-RED against the current state)

**Gate name:** `proof:live-verified-ledger:ay` (the cardinal forcing function) + the extended `proof:affordance-contrast` + the per-defect proofs. The wave closes GREEN only when ALL hold:

1. **D1 GOLD-CTA PAINTED ≥4.5:1 + GATE ARMED.** `proof:affordance-contrast` (extended) samples the PAINTED `gold-audacious` :hover backplate-vs-label ratio in LIGHT mode and asserts ≥4.5:1 — GREEN at the fixed HEAD, **born-RED on the 1.29:1 state** (revert the recipe → the gate REDs on the white-on-pale-gold). The dark arm (9.02:1) stays GREEN. **Born-RED witness:** at HEAD the gate asserts tokens and passes while 1.29:1 paints; the extension must FAIL on that exact painted state.

2. **D2 SPECIMEN PAINTS THE REAL HOVER.** A π readback of `demo/stories/display/buttons.vue`'s hover specimen confirms the painted color is the glass-hover (`--glass-bg-resting`-derived, ≥4.5:1 label-vs-surface), NOT the 1.28:1 ink-on-ink / 1.18:1 putty-on-putty. **Born-RED:** the HEAD specimen (`bg-primary/90`) paints 1.28:1 light / 1.18:1 dark — the readback REDs on it.

3. **D3 SCRIM RECEDES IN BOTH MODES.** `--overlay-scrim` resolves to an INK-receding wash in `:root` AND `.dark` (a `proof:scrim-contract` source arm: assert `--overlay-scrim` does NOT derive from `--shadow-color`/`--foreground` in the dark block, and a π readback of the Dialog overlay computed `background` in dark mode is a DARK wash, luma < the page, NOT `srgb(0.91 0.906 0.89 / 0.5)`). **Born-RED:** at HEAD the dark overlay paints the cream `srgb(0.91…)` fog — the π readback REDs on it.

4. **D4 DARK DESTRUCTIVE BADGE ≥4.5:1.** A painted-pixel readback of the dark destructive badge plate-vs-text ≥4.5:1 at 14px/600 (the same affordance-contrast harness, badge arm). **Born-RED on the 3.07:1 state.**

5. **D5 SLIDER FOCUS AT THE BUTTON REGISTER.** A computed-style readback of `.slider-thumb:focus-visible` box-shadow resolves the `--focus-ring-shadow` token (the 30%/15% register), NOT the 8%-alpha 4px halo. **Born-RED on the 8% state** (a synthetic revert to the 8% halo REDs).

6. **D7 CHECKS-BAND DECISION RECORDED + MACHINE-LOCKED.** The DELTA records the per-atom arm (Checkbox/Radio → ARM B allowlist; Switch track → ARM A glass, or the user-ratified alternative). For ARM B: `checkbox`/`radio` appear on the W54 legibility allowlist `proof:glass-one-model` reads (and the gate no longer would-flag them as off-allowlist solids — verified by the gate staying GREEN with them blessed). For ARM A: the Switch track carries the `.glass-wash` tier (a source assert + a π readback the track paints translucent-with-specular), and the gate treats it as a glass surface, not an off-allowlist solid. **Born-RED:** at HEAD the checks band is in NEITHER set — the gate (extended to REQUIRE every chrome/content atom be glass-or-allowlisted) REDs on the unratified checks band.

7. **DELTA REGISTERED + LEDGER GREEN.** `docs/tranches/AY/audit/visual/W-PRIM-POLISH-DELTA.md` exists, references own-surface `^W-PRIM-POLISH-` real PNGs (the four fixed surfaces + slider focus + checks result) at light+dark, carries the painted-pixel contrast numbers; `"W-PRIM-POLISH"` is on `VISUAL-ALLOWLIST.json`; the `AY/PROGRESS.md` W-PRIM-POLISH row flips to `live-verified` (or `complete` + allowlisted); `npm run proof:live-verified-ledger:ay` passes.

**Born-RED at HEAD (the whole gate):** the gold CTA paints 1.29:1 in light (clause 1 REDs the extended gate); the buttons specimen paints 1.28:1/1.18:1 (clause 2 REDs); the dark scrim is the cream fog (clause 3 REDs); the dark destructive badge is 3.07:1 (clause 4 REDs); the slider focus is 8% (clause 5 REDs); the checks band is unratified (clause 6 REDs); the DELTA row is absent (clause 7 REDs). The wave is complete only when all seven verify GREEN with the painted-pixel DELTA on disk.

---

## §7 — Scope fence + named successors

- **D6 (five-identical-pills + the prose spec-dump)** is NOT fixed here — the variant-sameness is the W54→W60 sequencing gap (glass before the backdrops), routed to the **page-redesign band (W60 umbrella)**; the prose spec-dump on the buttons page routes to **W-SB1** (the storybook KEEP/FIX/RETIRE pass). This wave records D6 as context and does NOT chase per-variant tints (that fights the canon).
- The **slider STANDARD-thumb geometry** (cylinder vs knob) is **W-SLD1**'s — this wave touches ONLY the focus halo (E6), AFTER W-SLD1's geometry lands.
- The **Toast register / Dialog-Popover enter doctrine** (the §6 easing-table conformance) is **W-MOTION / W-ANIM1**'s — this wave fixes the dark Dialog SCRIM (a token-contrast defect), NOT the Dialog ENTER easing.
- The **`--glass-backdrop` over-light legibility** (the slider track near-invisible in light, the glass-on-glass hover sub-perceptual) is **W-LEG1 / W55**'s — this wave's D5 fixes the FOCUS halo, not the track-vs-page legibility.
- **Named successor on any miss:** if the gold-hover painted-pixel gate cannot be produced on the runner (device-absent), the row stays `live-pending` (DELTA owed) — never `live-verified` from prose; the capture is the named successor for the orchestrator's real-device arm. If the checks-band Switch-glass capture is judged worse-than-opaque by the user, the named successor is the ARM-B-for-all fallback (allowlist the whole band) recorded with the user's verdict.

## §8 — Cross-references

- Audit corpus: `docs/tranches/AY/audit/design/FD-primitives.md` (§3 D1-D6, §4 weakest-three incl. the checks band, §7 recommended edits 1-6); `docs/tranches/AY/audit/reality/RA-anim-suite.md` §1 (the dark Dialog scrim corroboration).
- Canon: CLAUDE.md §"Glass-first canon (AX.W54)" (the glass-or-allowlist binary the checks-band decision serves) + §"Cartoon-shadow override contract" (the `--shadow-color` family the scrim split must NOT disturb) + §"The `.focus-ring` CSS utility" (the `--focus-ring-shadow` token the slider focus composes) + the easing doctrine §6 (the surface-vs-transform register the gold hover respects).
- Sibling waves: W-SLD1 (slider geometry — sequence before E6), W-GLASS / W-LEG1 (the `--glass-level` + `--glass-backdrop` seam), W-MOTION / W-ANIM1 (the Dialog/Toast ENTER easing — distinct from the scrim contrast), W-SB1 (the buttons-page prose spec-dump), W60 page-redesign (D6 the backdrop that makes glass pop).
- Precepts: `docs/precepts/instructions/TRANCHE-AND-WAVE-SPEC.md` §"Hard gate" (painted-pixel runtime, not grep); the no-backwards-compat rule (the scrim clean break); the ≥2-consumer / canon bar (the checks-band size-gated split refuses the speculative-glass overfit).
