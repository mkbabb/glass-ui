# AX.W56 — Squircle design language: the corner-SHAPE token axis + the rounded-vs-squircle POLICY (re-home AW.W23 off cards → onto the big-dock)

**Band** B · GRAPHICS / glass-IDENTITY · **Severity** major (G3 — the user's corner-shape ask: "rounded for cards, rounded for docks, but big-docks + the like → squircles")
· **dependsOn** AX.W00 (the π visual-runtime lane — the cornerShape live-readback close machinery)
· **Charter** convergence-2 NET-NEW wave G3 (`docs/tranches/AX/audit/convergence2/CONVERGENCE-PLAN-2.md:14` — "squircle-design-language … Mint `--corner-k-{squircle:2,soft:1.7,sharp:2.4}` parallel to `--radius-*` + semantic `--corner-shape-{card:round, pill:round, bigdock:superellipse(k), panel:round}`. Rounded for cards/docks, SUPERELLIPSE for big-docks + the like. `@supports` fallback to `--radius-*`. MANY waves consume it.")
· **Audit** `docs/tranches/AX/audit/convergence2/R-squircle.md` (the SOTA + browser-support + CSS recipe) + `docs/tranches/AX/audit/convergence2/A-squircle-pivot.md` (every radius/corner-shape file:line + the re-home policy map) — the research+audit pair that folds into ONE G3 wave.

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact. The implementer session lands the §FileBounds edits +
> the gate; the orchestrator drives the §HardGate π live cornerShape readback via chrome-devtools-mcp
> (the cardinal AX lesson — the agent has no browser). Per the hardened agent git clause (K W0): agents
> NEVER stage/commit/stash — the orchestrator owns the index.

> *Gloss.* The **corner SHAPE** is a SECOND corner axis parallel to the corner RADIUS. `border-radius`
> sets the radius BOX; `corner-shape` changes the CURVE within that box (`round`=circle, `squircle`=the
> superellipse). The **superellipse** is the iOS-26 corner geometry that `backdrop-filter`, borders, and
> shadows all follow — `superellipse(K)` paints `|x|^(2K)+|y|^(2K)=1`, so the curve exponent n=2K; the CSS
> `squircle` keyword == `superellipse(2)` == n=4 (the iOS-idiomatic web squircle). The **policy** is the
> rounded-vs-squircle map: cards/pills/panels round, big-docks squircle. The **PE tier** is `@supports
> (corner-shape: superellipse(2))` — Chrome 139+ only (~65% global May 2026, no Safari/Firefox through
> 2026), so the un-gated `border-radius` round is the cross-engine CONTRACT and the superellipse is the
> enhancement, NEVER the contract.

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `6050dc4` on five falsifiable source-true witnesses, each a line-probe the
new gate inverts. The squircle ALREADY ships (AW.W23) — this is NOT greenfield; the gap is the token
axis + the rounded-vs-squircle policy (the shipped keyword is INVERTED vs the user's intent + hardcoded).

- **RED witness 1 (no corner-SHAPE token axis, grep-falsifiable).** `theme.css` mints a complete
  `--radius-{xs..3xl,pill}` primitive ladder + semantic aliases (the corner-RADIUS half) but NO
  `--corner-k-*` / `--corner-shape-*` companion — the corner SHAPE is a hardcoded `squircle` keyword in
  two CSS files, not a token. `grep "corner-k-\|corner-shape-" src/styles/theme.css` returns NONE.
  **GREEN after:** `theme.css` mints `--corner-k-{squircle:2,soft:1.7,sharp:2.4}` + the semantic
  `--corner-shape-{card,pill,panel,bigdock}` aliases.

- **RED witness 2 (the policy is INVERTED — squircle is ON cards/buttons/pills, parse-falsifiable).**
  `glass.css:721-728` applies `corner-shape: squircle` to `.glass-card`, `.glass-btn`, `.btn-pill` — so
  EVERY glass card + EVERY icon-button/pill gets the squircle, which directly contradicts the user's
  "rounded for cards." **GREEN after:** the glass.css squircle block is RE-HOMED OFF cards/buttons/pills
  (they resolve `--corner-shape-card`/`-pill` == `round` — no `corner-shape` decl).

- **RED witness 3 (the big-dock shape is a bare hardcoded keyword, not a token — parse-falsifiable).**
  `dock.css:539` is a bare `corner-shape: squircle` — the shape is NOT overridable from `:root` and W42's
  dock-morph cannot `calc()` a `k` against it. **GREEN after:** `dock.css` reads `corner-shape:
  var(--corner-shape-bigdock)` — the shape is as token-overridable as the radius.

- **RED witness 4 (the `@supports` condition tests the keyword, not the literal-`2` feature query).**
  `dock.css:537` + `glass.css:721` gate on `@supports (corner-shape: squircle)`. The token resolves to
  `superellipse(var(--corner-k-squircle))`, and `var()` is NOT evaluable in an `@supports` query, so the
  gate condition must test the LITERAL `superellipse(2)` (the same Chrome-139 feature). **GREEN after:**
  the big-dock gate is `@supports (corner-shape: superellipse(2))`.

- **RED witness 5 (the clip-path-fallback REJECTION is unrecorded).** No DECISION records WHY the
  cross-engine clip-path figma-squircle fallback is rejected, so a later agent might "fix" the 35% Safari
  gap by bolting on a JS path generator (which hard-clips the box — severing the backdrop-filter blur
  halo + the cartoon offset-shadow). **GREEN after:** the rejection is recorded in this wave + a wave-doc
  comment, and the gate locks the `@supports`-over-`border-radius`-round shape (no clip-path).

The wave is RED at HEAD on all five; the HardGate below drives each to GREEN.

**Status** — DEV-COMPLETE (this session lands §FileBounds + the gate; the π live cornerShape readback is
the orchestrator's binding close).

---

## Goal

The corner SHAPE is a token axis as overridable as the corner RADIUS, and the rounded-vs-squircle policy
matches the user's intent: cards, pills/buttons, small docks, and panels stay ROUND; the big-dock card
shell (the large-radius surface where the superellipse READS) is the one squircle surface; "and the like"
(the large-radius family — dialogs/sheets/hero overlays) is a consumer-opt-in via re-pointing a
`--corner-shape-<surface>` alias. Every shape is a `--corner-shape-*` token over a single `--corner-k-*`
vocabulary (W42's dock-morph reads the SAME `k`). The native `corner-shape` is a progressive-enhancement
tier under `@supports (corner-shape: superellipse(2))` ONLY — the un-gated `border-radius` round is the
cross-engine contract on Safari/Firefox/old-Chrome (~35%), at zero cost, with NO clip-path JS generator.

---

## Scope (the gestalt — a token axis + a re-home, no workaround, no alias)

R-squircle.md §3 + A-squircle-pivot.md §3 located ONE architectural gap: the corner SHAPE is hardcoded
where the corner RADIUS is tokenized, and the shipped squircle is on the WRONG surfaces. Four folds, all
token-routed, a clean break (no alias):

1. **Mint the `--corner-k-*` + `--corner-shape-*` axis in `theme.css`** (the headline — R-squircle §3.1).
   In the LEADING plain `@theme` block alongside the radius primitives (the same rationale: each alias is
   its own override point; value-identical keyword siblings must not collapse under `@theme inline`):
   `--corner-k-squircle: 2` (MDN: `squircle == superellipse(2) == n=4`), `--corner-k-soft: 1.7` (n≈3.4),
   `--corner-k-sharp: 2.4` (n≈4.8); the semantic `--corner-shape-card: round`, `--corner-shape-pill:
   round`, `--corner-shape-panel: round`, `--corner-shape-bigdock: superellipse(var(--corner-k-squircle))`.
   The POLICY lives in these aliases. The bigdock superellipse rides the k token (ONE vocabulary W42 reads
   — no second `k` definition, no inline literal).

2. **Re-home the glass.css squircle OFF cards/buttons/pills** (the policy correction — A-squircle-pivot §0).
   DELETE the `@supports (corner-shape: squircle)` block applying `corner-shape: squircle` to
   `.glass-card`/`.glass-btn`/`.btn-pill`. Cards/buttons/pills resolve `--corner-shape-card`/`-pill` ==
   `round` (the default — a `corner-shape: round` decl would be a no-op, so the surfaces simply carry no
   `corner-shape`). This is a clean break — no alias. A consumer who WANTS a squircle card opts in by
   re-pointing `--corner-shape-card` at `superellipse(var(--corner-k-squircle))`. Record the policy +
   the no-re-add rule in a glass.css comment.

3. **Tokenize the big-dock corner shape in `dock.css`** (R-squircle §3.1). Re-point the bare `corner-shape:
   squircle` → `corner-shape: var(--corner-shape-bigdock)`, and change the gate condition from `@supports
   (corner-shape: squircle)` to `@supports (corner-shape: superellipse(2))` (the literal-`2` feature
   query, since `var()` is not evaluable in `@supports`). KEEP the `@supports` PE tier + the un-gated
   `border-radius` round fallback (the cross-engine contract). The big-dock is the ONE squircle surface.

4. **Record the clip-path REJECTION + the candidate "and the like" list** (R-squircle §3.3 / §3.2).
   The cross-engine clip-path figma-squircle fallback is REJECTED — it hard-clips the box, severing the
   `backdrop-filter` blur halo + the cartoon offset-shadow (which live OUTSIDE the border-box), needs a
   ResizeObserver + a runtime dep, and the round fallback is already visually honest at zero cost. The
   "and the like" large-radius family (dialogs / `--radius-dialog`, the Configurator panel, Drawer top
   corners, hero overlays) is a consumer-opt-in (each just re-points its `--corner-shape-<surface>`),
   default = big-dock ONLY. Both recorded here so a later agent does not "fix" the 35% gap or guess the
   membership.

### KEEP — the load-bearing radius + refraction substrate (do NOT touch)

UNCHANGED: the `--radius-*` ladder (`theme.css:28-65` — the corner-RADIUS axis is complete + token-first;
the squircle only changes the CURVE within the radius box); the big-dock radius morph
(`dock.css:525-531` — the pill↔card `--radius-pill → --dock-card-radius` lerp off `--dock-expand-t`);
`glass-refract.css` (the `#glass-refract` displacement filter is BAKED from the squircle profile `y =
⁴√(1−(1−x)⁴)` — the refraction substrate, NOT a corner-shape decl, orthogonal to G3); the `border-radius`
round CONTRACT on every surface (the cross-engine fallback the `@supports` PE tier rides over).

### CONVERGE folds (consumer-grounded design INPUT, NOT executed here)

- **W42 (liquid-MORPH substrate) §19.11 reads this wave's `--corner-k-*` band.** W42 owns the CONTINUOUS,
  animatable `--superellipse-k` axis `calc()`'d off `--morph-t` for the dock silhouette's liquid reshape
  (a MOTION axis on ONE surface). G3 mints the STATIC `--corner-k-squircle` vocabulary; W42's dock-morph
  `calc()`s its animated `k` against the SAME token (one `k` vocabulary, not two). G3 lands the band so
  W42 reads it — cross-ref both. NOT executed here; the cross-ref note is authored.

---

## SOTA deepening (squircle / superellipse research — R-squircle §1)

- **The CSS feature is shipped + spec-stable.** `corner-shape` + `superellipse()` landed Chrome/Edge 139
  (Aug 2025); ~65% global (May 2026). Safari + Firefox: NOT supported (no positive signal through 2026) —
  a progressive-enhancement tier ONLY, never the contract. glass-ui already ships it this way (AW.W23).
- **The superellipse math (MDN authoritative).** `superellipse(K)` paints `|x|^(2K) + |y|^(2K) = 1`, so
  the curve exponent n = 2K. The keyword equivalences: `bevel`=superellipse(0)=n1 (chamfer),
  `round`=superellipse(1)=n2 (circle), **`squircle`=superellipse(2)=n4** (the squircle), `square`≈K≥10.
  K>1 ⇒ more square-like. Use the linear `n=2K` relation for any `k`-token math (`--corner-k-squircle: 2`
  ⇒ n=4). A secondary blog's `n=2^K` claim lands the same value (squircle⇒n=4) but MDN's `n=2K` is the
  spec relation the token band rides.
- **n=4 ≈ iOS, not exact.** Apple's icon corner is a piecewise cubic-Bézier + circular-arc (Figma's `ξ`
  smoothing, ξ≈0.6 ≈ iOS app icon), NOT a pure superellipse. The early "n=5" guess is debunked. CSS
  `superellipse(2)` (n=4) is the accepted web-idiomatic squircle and reads as the iOS idiom at typical UI
  radii — ship it as the default, expose `k` so a consumer can dial 1.7–2.4 to taste. Do NOT chase n=5.
- **Borders/shadows/backdrop-filter follow the shape.** box-shadow + outline + `backdrop-filter` clip to
  the superellipse silhouette (WHY glass-ui put `corner-shape` on glass surfaces — the blur + edge-gleam +
  cartoon shadow inherit the squircle outline). Blink renders it via a precomputed cubic-Bézier
  approximation (cheap path build, animating `k` is affordable, no compositing penalty beyond a rounded
  clip). The geometry only READS at the LARGE radius — at a 16px card radius or a stadium pill the
  superellipse is imperceptible, so dropping it off cards/pills is visually free.
- **The clip-path cross-engine fallback is REJECTED.** A JS-generated `clip-path: path('<figma-squircle
  svg>')` at `cornerSmoothing: 0.6` would read squircle cross-engine, BUT it hard-clips the box (cutting
  the backdrop-filter blur halo + the cartoon offset-shadow that live OUTSIDE the border-box), needs a
  ResizeObserver to regenerate on resize, and adds a runtime dep. The round `border-radius` fallback is
  visually honest + zero-cost. Token-first + KISS beats a JS path generator — recorded as a DECISION.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/theme.css` | **MINT** the corner-SHAPE axis in the LEADING plain `@theme` block (after `--radius-tooltip`): `--corner-k-{squircle:2,soft:1.7,sharp:2.4}` + the semantic `--corner-shape-{card:round,pill:round,panel:round,bigdock:superellipse(var(--corner-k-squircle))}`. Plain (not inline) — the radius-sibling rationale (each alias is its own override point; value-identical keyword siblings must not collapse). |
| `src/styles/dock.css` | **TOKENIZE** the big-dock site (`:533-541`): bare `corner-shape: squircle` → `corner-shape: var(--corner-shape-bigdock)`; gate condition `@supports (corner-shape: squircle)` → `@supports (corner-shape: superellipse(2))`. KEEP the `@supports` PE tier + the un-gated `border-radius` round fallback (`:525-531`). |
| `src/styles/glass.css` | **RE-HOME** the squircle OFF cards/buttons/pills: DELETE the `@supports (corner-shape: squircle)` block (`:714-729`) applying `corner-shape: squircle` to `.glass-card`/`.glass-btn`/`.btn-pill`; replace with a policy comment (cards/pills round by policy; the squircle lives on the big-dock; no re-add; the `--corner-shape-*` axis is in theme.css). Clean break, no alias. |
| `src/components/custom/dock/GlassDock.vue` | Update the `shape="card"` doc comment (`:52-58`) to reference the AX.W56 squircle policy + the tokenized `var(--corner-shape-bigdock)` under `@supports (corner-shape: superellipse(2))`. Comment-only. |
| `scripts/proof-squircle-language.mjs` | **NEW** — the born-RED→GREEN gate (the device-free SOURCE arm + the fail-CLOSED π render arm + the registration). |
| `tests-visual/squircle-language.spec.ts` | **NEW** — the π render arm spec: the big-dock `getComputedStyle(...).cornerShape` readback (=== `superellipse(2)` on Chrome-139, the round fallback on a non-supporting engine; a card stays round — the re-home canary). |
| `package.json` | Register `proof:squircle-language` + the W00 meta-gate parity match. |
| `scripts/gates.mjs` | Register the `proof:squircle-language` GATES manifest row (local + ci tags). |
| `docs/tranches/AX/audit/W56-squircle-language.json` | **NEW** — the born-RED→GREEN audit artefact + the five RED witnesses + the per-finding disposition. |
| `docs/tranches/AX/audit/convergence2/CONVERGENCE-PLAN-2.md` | Mark the G3 / W56 row DEV-COMPLETE (the ledger update). |

**OUT of bounds:** the `--radius-*` ladder (the corner-RADIUS axis — unchanged); the big-dock radius morph
(`dock.css:525-531` — the radius lerp is W01's, the shape is G3's; line-region-disjoint); `glass-refract.css`
(the refraction substrate, not a corner-shape decl); W42's `--superellipse-k` continuous animation (it
READS G3's `k` band, G3 does not author the animation); the instrument-chassis / Configurator / Drawer
surfaces (the "and the like" candidates are consumer-opt-in, NOT applied by default this wave — no overfit).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs AX.W42 (liquid-MORPH substrate §19.11) — DECONFLICTED, composes, not a dup.** W42 owns the
  CONTINUOUS animatable `--superellipse-k` axis (`calc()`'d off `--morph-t`) for the dock silhouette's
  liquid reshape — a MOTION axis on ONE surface, a SCOPED-GO door. W56 is the STATIC library-wide SHAPE
  TOKEN SYSTEM + the rounded-vs-squircle POLICY. They share ONE `k` vocabulary: W56 mints
  `--corner-k-squircle`; W42's dock-morph `calc()`s its animated `k` against it. W56 lands the band so W42
  reads it (cross-ref both); no duplicate `k` definition.
- **vs AW.W23 (shipped) — W56 EXTENDS + RE-HOMES, not duplicates.** The 2 bare `corner-shape: squircle`
  keywords are AW.W23's. W56 tokenizes the big-dock keyword AND re-homes the card/button/pill keyword per
  the user's policy. A clean break — no alias.
- **vs AX.W52 (liquid-glass MATERIAL) — no overlap.** W52 is the blur/specular/edge-gleam material; it
  inherits whatever silhouette `corner-shape` paints. Orthogonal — W52 touches the `.glass-material::before`
  specular region, W56 touches the corner-shape declarations. Line-region-disjoint in glass.css.
- **vs AX.W01/W45 (dock morph + region-model) — no overlap.** W01 owns the big-dock RADIUS morph (the
  `--radius-pill → --dock-card-radius` lerp); W45 owns dock LAYOUT/scale. W56 owns the big-dock corner
  SHAPE (the `@supports` block — line-region-disjoint from the radius lerp). The shape rides whatever
  radius the morph paints.

### DEDUP (the explicit boundary)

- **W42 = the continuous `k` MOTION axis; W56 = the static SHAPE TOKEN SYSTEM.** One `k` vocabulary. W56
  lands the `--corner-k-*` band FIRST so W42 reads it.
- **AW.W23 = the shipped bare keyword; W56 = the tokenized + re-homed policy.** Clean break, no alias.
- **R-squircle + A-squircle-pivot are the SAME wave's research+audit pair, NOT two waves** — folded into
  this single G3 wave (the dedup verdict both files reach).

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤1 agent — one cohesive token-axis + re-home).** Mints the `--corner-k-*`/`--corner-shape-*`
  axis (theme.css), tokenizes the big-dock shape + the `@supports` condition (dock.css), re-homes the
  squircle off cards/buttons/pills (glass.css), updates the GlassDock.vue comment. Typecheck + build at
  every interval. The edits are line-region-disjoint within the shared glass.css (the corner-shape block
  is line-disjoint from W52's specular region).
- **Adversarially-verify (≤1 read-only lane).** Re-runs the five RED witnesses against the patched tree:
  asserts the token axis is minted; asserts the policy (card/pill/panel round, bigdock superellipse);
  asserts the big-dock reads `var(--corner-shape-bigdock)` (NOT a bare keyword); asserts the `@supports`
  gate tests `superellipse(2)` + is leak-free; asserts glass.css carries NO card squircle. ADVERSARIAL
  twist: re-hardcodes `corner-shape: squircle` on the big-dock (confirms BIGDOCK-READS-TOKEN REDs);
  re-adds a squircle to `.glass-card` (confirms CARD-REHOMED REDs); leaks a `corner-shape` decl outside
  `@supports` (confirms SUPPORTS-GATE-INTACT REDs); flips `--corner-shape-card` to a superellipse (confirms
  POLICY-CARD-ROUND REDs). DRIVES the π live cornerShape readback (the binding close — see HardGate).
- **Gate-author (≤1 agent).** Authors `proof-squircle-language.mjs` (born-RED on the token-axis +
  policy-card-round + bigdock-reads-token + supports-gate-intact + card-rehomed asserts + the fail-CLOSED
  π readback arm); confirms it FAILS on the un-re-homed tree (the bare keyword + card squircle present)
  and PASSES on the patched tree. Registers `proof:squircle-language` in `package.json` + `gates.mjs`. The
  gate must be able to FAIL the implementer's work (the AW false-GREEN class). The π live arm (the painted
  cornerShape truth) rides the W00 readback, NOT a CPU text gate alone.

---

## HardGate (born-RED→GREEN + the MANDATORY π cornerShape live readback)

**Headless / source gate — born-RED→GREEN. `proof:squircle-language` (NEW; the device-free SOURCE +
registration arm + the fail-CLOSED π render arm).** A source-parse + token-resolution gate:

- **TOKEN-AXIS-EXISTS.** Assert `theme.css` mints `--corner-k-squircle: 2` (squircle == superellipse(2) ==
  n=4) + `--corner-k-soft` + `--corner-k-sharp` + the semantic `--corner-shape-{card,pill,panel,bigdock}`
  aliases. **Born-RED at HEAD** (`grep "corner-k-\|corner-shape-" theme.css` = NONE).
- **POLICY-CARD-ROUND.** Assert `--corner-shape-card`/`-pill`/`-panel` resolve `round`;
  `--corner-shape-bigdock` resolves a `superellipse(...)` riding `var(--corner-k-squircle)` (NOT round, NOT
  an inline literal). **Born-RED at HEAD** (no tokens).
- **BIGDOCK-READS-TOKEN (the bite).** Assert the big-dock dock.css site reads `corner-shape:
  var(--corner-shape-bigdock)` (NOT a bare `squircle` keyword). **Born-RED at HEAD** (bare keyword).
- **SUPPORTS-GATE-INTACT.** Assert the big-dock corner-shape decl sits ONLY inside `@supports
  (corner-shape: superellipse(2))` (no leak onto the un-gated base — a leak breaks the round fallback on
  a partial-support engine) over a `border-radius` round fallback. **Born-RED at HEAD** (the gate tests
  `squircle` not `superellipse(2)`).
- **CARD-REHOMED.** Assert glass.css carries NO `corner-shape` on `.glass-card`/`.glass-btn`/`.btn-pill`
  (the AW.W23 inversion re-homed; cards stay round). **Born-RED at HEAD** (the card squircle block).

**π cornerShape live readback (NON-NEGOTIABLE per AX.W00 — the wave's close criterion; the cardinal AX
lesson — a green SOURCE gate over a wrong painted shape is NOT done).** A fail-CLOSED live Playwright pass
the ORCHESTRATOR runs via chrome-devtools-mcp @ `localhost:5173` on a real Chrome-139, over the dock route
(the big-dock card shell `.glass-dock.shape-card`):

- **The big-dock reads the squircle.** `evaluate_script` reads `getComputedStyle(bigDock).cornerShape` ===
  `superellipse(2)` (the squircle paints) on the Chrome-139 device — AND visually confirms the big-dock
  corners read as the iOS superellipse silhouette (the backdrop-filter + cartoon shadow follow the shape),
  not a plain rounded arc.
- **A card stays round (the re-home canary).** `getComputedStyle(glassCard).cornerShape` === `round`/`normal`
  — the squircle is OFF cards. Visually the card corners are ordinary rounded arcs.
- **The round fallback is honest.** On a non-supporting engine (Safari/Firefox — or a `CSS.supports`
  false), the big-dock falls back to the `border-radius` round arc with NO broken paint (the cross-engine
  contract). The spec's engine-aware assert never false-REDs the 35%.
- **No regression.** The dock morph (radius lerp) + the glass material still paint correctly with the
  squircle silhouette; light AND dark.

**The wave does NOT close on the headless gate alone** — the executed π cornerShape readback (captured in
`W56-squircle-language.json` per the W00 protocol) is the binding close criterion.

---

## Cadence (sub-step order)

1. **Author the gate born-RED.** `proof-squircle-language.mjs` (the token-axis + policy + bigdock-reads-token
   + supports-gate-intact + card-rehomed asserts + the fail-CLOSED π arm); register in `package.json` +
   `gates.mjs`; confirm it FAILS at HEAD.
2. **Mint the corner-SHAPE axis.** `theme.css`: `--corner-k-{squircle,soft,sharp}` + the semantic
   `--corner-shape-{card,pill,panel,bigdock}` aliases in the leading plain `@theme`. Typecheck.
3. **Tokenize the big-dock shape.** `dock.css`: `var(--corner-shape-bigdock)` + the `@supports
   (corner-shape: superellipse(2))` condition. Build + verify the cascade emits into `dist/styles/dock.css`
   + `dist/styles/theme.css` (the `/styles` consumer path).
4. **Re-home the card squircle.** `glass.css`: DELETE the card/button/pill squircle block + the policy
   comment. Typecheck + build.
5. **Update the GlassDock.vue comment.** Reference the AX.W56 policy + the tokenized shape.
6. **Gate GREEN + π readback.** Confirm `proof:squircle-language` passes; run the π cornerShape live
   readback (big-dock superellipse(2), card round, round fallback honest); write
   `W56-squircle-language.json` to GREEN; mark the CONVERGENCE-PLAN-2 G3 row DEV-COMPLETE.

Lint/format cadence: `npm run typecheck` + `npm run build` after each integration batch; the self-gate set
(`proof:squircle-language` + `proof:gate-script-parity` + `proof:theme` + `proof:components-css`) before
close.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W56-squircle-language.json` — the born-RED→GREEN ledger: the five RED witnesses
  (no token axis, the inverted card squircle, the bare keyword, the `squircle`-not-`superellipse(2)` gate,
  the unrecorded clip-path rejection), the per-finding disposition (R-squircle §3 + A-squircle-pivot §0-§5),
  and the post-wave GREEN structure + the π cornerShape readback measurements.
- `scripts/proof-squircle-language.mjs` — the NEW gate (token-axis + policy-card-round + bigdock-reads-token
  + supports-gate-intact + card-rehomed + the fail-CLOSED π readback arm).
- `tests-visual/squircle-language.spec.ts` — the π render arm spec (the engine-aware cornerShape readback).
- The diff localizing the `--corner-k-*`/`--corner-shape-*` mint + the big-dock tokenize + the card re-home.

---

## CommitPlan (conventional-commit messages — the orchestrator authors)

1. `test(squircle): born-RED proof:squircle-language — token-axis + policy-card-round + bigdock-reads-token + supports-gate-intact + card-rehomed + the fail-CLOSED π cornerShape readback (AX.W56 G3)`
2. `feat(tokens): mint the corner-SHAPE axis (--corner-k-{squircle:2,soft,sharp} + --corner-shape-{card,pill,panel,bigdock}) parallel to --radius-* (AX.W56 G3 / R-squircle §3.1)`
3. `feat(dock): tokenize the big-dock corner-shape → var(--corner-shape-bigdock) under @supports (corner-shape: superellipse(2)) (AX.W56 G3)`
4. `feat(glass): re-home the squircle OFF cards/buttons/pills — cards stay round by policy (AX.W56 G3 / A-squircle-pivot §0)`
5. `chore(AX.W56): audit ledger GREEN + the π cornerShape readback + CONVERGENCE-PLAN-2 G3 DEV-COMPLETE`

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the close machinery.** The fail-CLOSED π workspace is the home of the
  binding cornerShape live-readback. W56 cannot close on the SOURCE gate alone (a green CPU gate over a
  wrong painted shape is the cardinal AX failure class); W00 stands up the lane it closes on.
- **Foundational — MANY waves consume the `--corner-shape-*` axis.** Per CONVERGENCE-PLAN-2 sequencing, W56
  (squircle tokens) + W54 (glass-level) are the foundational token axes landed FIRST. W42's dock-morph
  reads W56's `--corner-k-*` band (cross-ref).

---

## Archaeology (the git / prior-tranche lineage)

- **G3 (the user ask — CONVERGENCE-PLAN-2:14).** "Mint `--corner-k-{squircle:2,soft:1.7,sharp:2.4}`
  parallel to `--radius-*` + semantic `--corner-shape-{card:round, pill:round, bigdock:superellipse(k),
  panel:round}`. Rounded for cards/docks, SUPERELLIPSE for big-docks + the like. `@supports` fallback to
  `--radius-*`. MANY waves consume it." A foundational glass-IDENTITY net-new wave.
- **AW.W23 (the shipped bare keyword) — the prior pass G3 extends + re-homes.** `corner-shape: squircle`
  on `.glass-card`/`.glass-btn`/`.btn-pill` (`glass.css:721-728`) + the big-dock (`dock.css:537-541`). The
  card/button/pill squircle is the policy INVERSION G3 corrects; the big-dock keyword is the one G3
  tokenizes.
- **AW.W3b (the big-dock card shell) — the radius substrate the shape rides.** `--radius-3xl`(24px) +
  `--radius-dock-card` + the `.shape-card` radius morph. The squircle reads ONLY at this large radius.
- **glass-refract.css (the squircle profile bake) — the geometry is already the library's lens curve.**
  The `#glass-refract` filter is baked from `y = ⁴√(1−(1−x)⁴)` (n=4 convex-lens corner) — the squircle
  geometry already IS the refraction substrate (orthogonal to G3; untouched).
- **The convergence-2 research pair (`R-squircle.md` + `A-squircle-pivot.md`).** Read in full before this
  spec — the recipe (R §3), the every-site audit (A §1-§2), the re-home policy map (A §0), the clip-path
  rejection (R §3.3), and the W42 dedup (both §4/§5) are corpus-grounded, not speculative.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

- **token-first / no magic numbers (J invariant).** The corner SHAPE is a `--corner-shape-*` token over a
  single `--corner-k-*` vocabulary — as overridable from `:root` as the radius. MUST NOT re-bury the
  shape as a bare keyword (the AW.W23 gap this wave closes) — the gate's BIGDOCK-READS-TOKEN bite locks it.
- **abrogate-before-patch / clean break / no-backwards-compat (MEMORY no-backwards-compat).** The squircle
  is RE-HOMED off cards (the abrogation) — DELETED, not aliased. No `--corner-shape-card` round decl on the
  card surface (it would be a no-op); no legacy keyword alias. A consumer opts a surface in by re-pointing
  the token. Clean break per the user's policy.
- **one-path / no-legacy-code.** ONE corner-shape vocabulary (`--corner-k-*`/`--corner-shape-*`); ONE
  squircle surface (the big-dock); ONE `@supports` PE tier over the round contract. W42's animated `k`
  reads the SAME band — no second `k` definition.
- **substrate-with-consumer / no-overfitting (Design-Axis-3, L invariant 8).** The `--corner-shape-bigdock`
  ships with its consumer (the big-dock reads it). The "and the like" candidates (dialogs/sheets/panels)
  are NOT applied by default — a speculative squircle on a surface with no consumer would be overfit; they
  are consumer-opt-in via re-pointing the token, surfaced as a candidate list, NOT guessed.
- **Safari-compatibility (the HARD constraint).** `corner-shape` is Chrome-139+ ONLY — the un-gated
  `border-radius` round is the cross-engine CONTRACT, the superellipse is the `@supports`-gated enhancement
  NEVER the contract (Safari/Firefox have no signal through 2026). The `@supports (corner-shape:
  superellipse(2))` condition tests the LITERAL feature (a `var()` is not `@supports`-evaluable). The
  clip-path cross-engine fallback is REJECTED (it severs the blur halo + cartoon shadow) — recorded so a
  later agent does not "fix" the 35% gap.
- **π visual-runtime lane (SPEC.md §π; AX.W00).** The wave closes on the EXECUTED π cornerShape readback
  (big-dock superellipse(2), card round, round fallback honest), light AND dark — NOT the SOURCE gate alone.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **The "and the like" membership — RATIFY against the live audit.** The big-dock is unambiguous. The
   large-radius family (dialogs / `--radius-dialog`, the Configurator panel, Drawer top corners, hero
   overlays) is a design call. **Recommendation: default = big-dock ONLY** (the no-overfitting bar — ship
   the token axis + the big-dock consumer; let the user opt additional surfaces in by re-pointing
   `--corner-shape-<surface>`). Surface the candidate list to the user; do NOT guess membership.
2. **`--corner-shape-*` plain token vs `@property`-registered — RATIFY.** A plain `@theme` token suffices
   for a `:root` override + the `var()` read in dock.css. `@property` registration is warranted ONLY if a
   per-surface ANIMATED shape is wanted (none at landing — W42 animates the `k` SCALAR, not the shape
   keyword). **Recommendation: plain token** (the no-overfitting bar); revisit if W42's lensing fold wants
   to spring the shape (that is W42's, not W56's).
3. **The k-band values (1.7 / 2 / 2.4) — RATIFY against the live audit.** R-squircle recommends a taste
   band of ~1.8–2.2 (n=3.6–4.4); the minted soft=1.7 / sharp=2.4 widen it slightly for large-surface
   crispness. **Recommendation: ship 1.7/2/2.4** (the squircle default is 2=n4, the canonical web
   squircle); the orchestrator tunes soft/sharp against the live big-dock render if either reads off.
