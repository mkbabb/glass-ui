# AX.W54 — Glass-first-class: glass the DEFAULT for EVERY surface, the `--glass-level` single-knob scalar threaded through the opacity+blur ladders at their ONE site, the `--glass-level:0` opaque ESCAPE collapsing the a11y brackets, the Q3 hover re-tune so the lift reads on HOVER

**Band** G · GLASS-IDENTITY · **Severity** blocker (G1 / pass-3 TOP precedence — the user's loudest pass-3 reshaping: *"The default for ALL items is their glass variants — fix at the ROOT … GLASS FIRST for buttons + items EVERYWHERE, and in the dock (the keyframes dock is the model for selected elements)"* — `USER-DEFECTS-2026-06-08-pass3.md:13`)
· **dependsOn** AX.W00 (the π visual-runtime lane — the close machinery), AX.W52 (the material LOOK must be stable before `--glass-level` multiplies its opacity+blur — W54 makes that LOOK the DEFAULT + adds the level axis; W52 built it, W54 defaults it), AX.W56 (the corner-shape axis — the glass-default surfaces inherit the squircle vocabulary already landed)
· **Charter** the USER-DECIDED MAXIMAL glass-first hinge (`MASTER-PLAN.md:58` R3 — *"USER-DECIDED: MAXIMAL — everything glass. W54 makes glass the default for EVERY surface (containers, chrome, buttons, AND content panels) over the rich backgrounds; the `--glass-level` scalar + the explicit opaque escape remain for the rare solid need; W55 adaptive-over-light carries the legibility"*) + the pass-3 G1 ROOT-foundational bump
· **Audit** `R-path-glass.md` (the G-band path-forward — §2.1 the three-fold W54 deliverable + the pass-3 escalation arm + the Q3 hover fold) · `W-glass-material.md` (the band inventory — §2.1 the un-authored research-complete W54) · the verified seam (`R-path-glass.md:64-71` — the glass LEVEL is consumed in EXACTLY ONE place, the blur ladder is radius-first, the opaque endpoint is already produced by the reduced-transparency bracket)

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact only — this doc writes no `src`. The implementer session
> drives the §Cadence from this spec. Per the AX cardinal precept (§0 / AX.W00): this wave does NOT close
> on a green headless gate; it closes on a LIVE chrome-devtools-mcp DELTA at ≥2 viewports × light/dark. Per
> the hardened agent git clause (K W0): agents NEVER stage/commit/stash — the orchestrator owns the index.

> *Gloss.* **glass-first** = glass is the DEFAULT surface register for EVERY band — containers, chrome,
> buttons, content panels — over the rich (aurora / constellation / fourier / paper / grid) backgrounds the
> page-redesign (W60/Q4/Q7/Q9) introduces; NOT a special opt-in variant. **`--glass-level`** is the ONE
> `@property`-registered scalar (default `1`) that scales BOTH ladders in lockstep at their single sites —
> the opacity `color-mix` AND the blur radii — so the whole glass family clarifies/solidifies on one knob.
> The **opaque escape** is the `--glass-level:0` endpoint (the rare solid need — a dense data table, a
> forced-colors floor) routed through the SAME machinery, NOT a parallel solid recipe. **`level=1` is
> byte-identical to today** — the scalar is a no-op at its default, so minting it regresses nothing; only the
> DEFAULT-register flips (the opaque `default` button → glass; the surfaces that still default solid → glass)
> change paint. **W55** (adaptive-over-light) carries the legibility — W54 makes glass the default, W55
> darkens-where-the-backdrop-is-light so the maximal-glass default stays legible.

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `6569b7a` (3.8.0+convergence; the AX integrated band + the three USER-DECIDED
hinge ratifications) on **six** falsifiable witnesses, each a source-true line-probe the new gate inverts.
W52 built the material LOOK (the bounded gleam, plus-lighter, calm saturate, the smooth-hover register) and
W56 the corner-shape axis — both DONE + live-verified. But glass is NOT the DEFAULT: the `default` button is
an opaque `bg-primary` solid, there is NO `--glass-level` knob, and the a11y brackets clobber ten opacity
rungs individually with no single opaque path. Source-confirmed at HEAD:

- **RED witness 1 (the headline — there is NO `--glass-level` scalar; the glass family has no single knob,
  grep-falsifiable).** `grep -rn "glass-level" src/` returns ZERO. The opacity ladder
  (`tokens.css:681-685` — `--glass-opacity-{wash:0.30,quiet:0.50,resting:0.65,floating:0.80,overlay:0.95}`)
  and the blur ladder (`tokens.css:692-709` — the radius-first `--glass-blur-*-radius` → `--glass-blur-*`
  chain) are TWO independent ten-rung families with no scalar relating opacity-clarity to blur-diffusion. A
  consumer who wants "a bit more glass" (clearer, less blur) or "a bit less" must override every rung by hand.
  **The falsifiable RED:** *`grep "glass-level" src/` = NONE; the opacity rungs and the blur radii are
  un-scaled literals (RED). After the wave `--glass-level` is a minted `@property { syntax:"<number>";
  inherits:true; initial-value:1 }` threaded through the `--glass-bg-*` `color-mix` (the ONE opacity seam) AND
  the `--glass-blur-*` radii (the ONE blur seam), so one knob moves opacity + diffusion in lockstep, with
  `level=1` byte-identical to today (GREEN).*

- **RED witness 2 (the `default` button is an OPAQUE solid — glass is NOT the default register,
  parse-falsifiable).** `button/index.ts:81` resolves `defaultVariants.variant: 'default'`, and the `default`
  variant (`:26-27`) is `'bg-primary text-primary-foreground hover:bg-primary/90 …'` — a fully OPAQUE
  primary-fill button with no `backdrop-filter`, no glass tier. The library SHIPS `glass` + `glass-wash`
  variants (`:61-64` — `glass-wash btn-glass …`, the real liquid-glass register W52 fixed via `.btn-glass`)
  but they are OPT-IN, not the default. So a bare `<Button>` over the rich page-redesign backgrounds paints a
  solid primary slab, the literal antithesis of pass-3's *"glass FIRST for buttons EVERYWHERE."* **RED:** *the
  default button variant is the opaque `bg-primary` solid; the glass register is opt-in (RED). After the wave
  glass is the DEFAULT button register (the `glass`/`glass-wash` recipe becomes the `defaultVariants` target
  or the `default` recipe is re-authored to the glass tier), the opaque primary-fill demoted to the explicit
  ESCAPE variant — glass-first, solid opt-out (GREEN).*

- **RED witness 3 (the a11y brackets CLOBBER ten rungs individually — no single opaque PATH,
  parse-falsifiable).** `glass.css:730-746` (`prefers-reduced-transparency: reduce`) sets
  `--glass-opacity-{wash,quiet,resting,floating,overlay}: 1` + `--glass-blur-{wash,quiet,resting,floating,
  overlay,dock}: none` — TEN per-rung clobbers to reach the opaque floor; `glass.css:749-756`
  (`prefers-contrast: more`) does FIVE more. There is no `--glass-level: 0` line that would reach the same
  solid endpoint through the ONE scalar. So the opaque endpoint (the rare-solid-need the user names, AND the
  a11y floor) is produced by ten/fifteen hand-clobbered overrides, not the one knob. **RED:** *the
  reduced-transparency + prefers-contrast brackets clobber ten/fifteen `--glass-opacity-*`/`--glass-blur-*`
  rungs individually (RED). After the wave each bracket sets `--glass-level: 0` (ONE line — solid `--card`,
  `blur()=0`), so the a11y floor + the design opaque-escape + the `.glass-opaque` rung all ride ONE path; the
  per-rung clobber collapses onto the scalar (GREEN).*

- **RED witness 4 (there is NO `opaque` first-class rung; the opaque escape has no named surface,
  grep-falsifiable).** `grep -rn "glass-opaque" src/styles/` returns ZERO; the `CardTier` union
  (`Card.vue:18` — `"wash" | "quiet" | "resting" | "floating" | "overlay"`; `card/index.ts:3` re-exports it)
  carries NO opaque member.
  `DialogContent.vue:20-21` DOES ship `variant?: 'glass' | 'opaque'` (the precedent — a dialog can opt out to
  solid), but there is no library-wide `.glass-opaque` utility or `opaque` tier rung that routes through the
  glass machinery. So a content surface that legitimately needs solid (the maximal-glass-default's escape
  hatch) has no canonical, single-path way to declare it. **RED:** *`grep "glass-opaque" src/styles/` = NONE;
  `CardTier` has no opaque member; only `DialogContent` has an ad-hoc opaque variant (RED). After the wave
  `.glass-opaque { --glass-level: 0 }` is the first-class utility + `CardTier` is widened to include `opaque`
  (the level-0 endpoint of the SAME axis — a tier rung, not a parallel solid recipe), and `DialogContent`'s
  opaque arm is reconciled onto it (one opaque path, no second fork) (GREEN).*

- **RED witness 5 (the hover lift reads as NOTHING on hover — Q3, the W52 overshoot, parse + computed-style
  falsifiable).** `utilities.css:1040-1052` routes the button hover scale through `--scale-hover-btn` (`1.035`
  — `utilities.css` token neighbourhood) on `--spring-smooth`. W52 dialed the lift DOWN this far to kill the
  "egregious 1.08 snap"; pass-3 Q3 (`USER-DEFECTS-2026-06-08-pass3.md:28`) reports the consequence live:
  *"The HOVER effect for the dock + buttons is NOT noticeable — only on CLICK is it visible. The hover state
  must read on hover, not just active."* A `1.035` scale with NO accompanying surface change on a glass button
  (whose hover bg-shift is also restrained) is sub-perceptible. **RED:** *the hover lift is `--scale-hover-btn:
  1.035` with a restrained surface cross-fade — sub-perceptible on hover; the affordance reads only on
  active/press (RED). After the wave the glass-default hover reads ON HOVER — the lift re-tuned to a
  perceptible-but-restrained magnitude (the glass surface's hover = its specular gleam waking + a readable
  scale + a readable bg/border shift), still NOT the 1.08 snap, verified live that the hover is distinguishable
  from rest BEFORE click (GREEN).*

- **RED witness 6 (the two-layer / glass-first law is NOT recorded canon — grep-falsifiable).** `grep -rn
  "glass-first\|glass-level\|two-layer" CLAUDE.md` returns ZERO. CLAUDE.md documents the per-component glass
  recipes but records NO law that glass is the DEFAULT surface register library-wide, NO `--glass-level`
  axis, and NO opaque-escape contract. So the maximal-glass-default + the level knob + the opaque-at-level-0
  escape are un-canonized; a later agent has no recorded rule and the default drifts back to solid. **RED:**
  *CLAUDE.md records no glass-first law, no `--glass-level` axis, no opaque-escape (RED). After the wave
  CLAUDE.md enumerates: glass is the DEFAULT for every band (USER-DECIDED MAXIMAL); `--glass-level` is the ONE
  scalar (default 1, level-0 = opaque escape); the opaque rung is the level-0 endpoint; W55 carries the
  legibility (GREEN).*

The wave is RED at HEAD on all six; the HardGate below drives each to GREEN.

**Live re-diagnosis ritual (AX.W00 wave-open obligation).** BEFORE any edit, re-confirm the six witnesses on
the live demo at `localhost:5173` (the §HardGate π checks): a bare `<Button>` over the buttons page paints a
SOLID primary slab (not glass); there is no level knob to clarify/solidify the glass family; the
reduced-transparency a11y path clobbers rungs not a level; there is no `.glass-opaque` surface; and the button
hover reads as NOTHING before click (Q3). Capture the BEFORE π render (the solid default button over the rich
backdrop; the imperceptible hover) as the born-RED baseline in `audit/W54-glass-first-class.json`. Do NOT
proceed on the audit's word — re-prove (the cardinal AX lesson; W52 shipped headless-green with a hover that
the next live pass found imperceptible — Q3 — which is exactly the class this wave must not repeat).

**Status** — SPEC (this doc). DEV-only; writes no `src` from this session.

---

## Goal

Glass is the DEFAULT surface for EVERY band — containers, chrome, buttons, content panels — over the rich
page-redesign backgrounds, the USER-DECIDED MAXIMAL glass-first identity. ONE `@property` scalar
`--glass-level` (default `1`, byte-identical to today) threads BOTH the opacity `color-mix` seam AND the blur
radii at their single sites so the whole glass family clarifies/solidifies on one knob; the `--glass-level:0`
opaque endpoint is the explicit ESCAPE (the rare solid need) routed through the SAME machinery, collapsing
the ten-rung a11y clobber onto ONE line. The default button register flips from opaque solid to glass; the
opaque-fill becomes the named opt-out. The Q3 hover re-tune lands so the glass-default hover READS on hover,
not just on click. W55 (adaptive-over-light) is the legibility partner — W54 defaults glass, W55 darkens it
where the backdrop is light. Every magnitude a `--glass-*` token, no buried literal, the W52 material LOOK +
the W56 corner-shape KEPT, the level scalar a no-op at default — the library reads glass-first with one knob
and one opaque path.

---

## Scope (the gestalt — the level SCALAR, the DEFAULT flip, the ONE opaque PATH — no parallel recipe, no
legacy, no per-component patch)

The verified seam (`R-path-glass.md:64-71`) makes this an ADDITIVE fold on a clean spine, not a rebuild: the
glass LEVEL is consumed in EXACTLY ONE place (the `--glass-bg-*` `color-mix` recipe), the blur ladder is
radius-first, and the opaque endpoint is already produced by the reduced-transparency bracket — so
`--glass-level` folds in at ONE `calc()` site (opacity) + ONE `calc()` site (blur) with zero fan-out. Five
folds, all token-routed:

1. **MINT `--glass-level` — ONE `@property` scalar threaded through BOTH ladders at their single sites (the
   headline — `R-path-glass.md:81-89`, `W-glass-material.md:27`).** Register
   `@property --glass-level { syntax: "<number>"; inherits: true; initial-value: 1 }` in `tokens.css §8`.
   Thread it through:
   - **the opacity seam** (`tokens.css:769-775` — the ONE `--glass-bg-*` `color-mix` recipe). Invert the
     multiplier so the level acts as a clarity scalar that PRESERVES `level=1`: each rung becomes
     `color-mix(in srgb, var(--card) calc((1 - (1 - <rung-opacity>) * var(--glass-level)) * 100%), transparent)`.
     At `level=1`: `1 - (1-α)*1 = α` → byte-identical to today. At `level=0`: `1 - (1-α)*0 = 1` → solid
     `--card` (the opaque endpoint). At `level=2` (clearer): `1 - (1-α)*2` → MORE transparent. ONE expression,
     the same five rungs + dock + chassis.
   - **the blur seam** (`tokens.css:711-728` — the `--glass-blur-*` recipes built off `--glass-blur-*-radius`).
     Scale each radius by the level: `blur(calc(var(--glass-blur-wash-radius) * var(--glass-level)))` (and the
     four siblings + dock). At `level=1` byte-identical; `level=0` → `blur(0)` (drops with the opacity → a
     clean solid floor); `level>1` → more diffusion in lockstep with the clarity. KEEP the per-rung
     `saturate()`/`brightness()` companions (W52's calm `saturate(1.18)`/`saturate(1.2)` untouched — the
     level scales the RADIUS, not the saturation).
   The two seams move in LOCKSTEP off one knob — the SOTA single-glass-knob. `inherits: true` so a host setting
   `--glass-level` on any ancestor retunes every descendant glass surface (the `@container`-free cascade path).

2. **The `--glass-level:0` opaque ESCAPE as a first-class rung (`R-path-glass.md:90`, `W-glass-material.md:28`).**
   - **`.glass-opaque { --glass-level: 0 }`** — the one-line utility routing the solid endpoint through the
     SAME machinery (solid `--card` bg + `blur(0)`). NO parallel solid `background:` recipe — the opaque
     surface IS the level-0 glass surface, so the `@supports`-fallback + the rim + the under-shadow all still
     resolve coherently (a solid plate with a glass edge, not a bare div).
   - **`CardTier` widened to include `opaque`** (`Card.vue:18` — the union literal site) — the level-0 endpoint of the SAME tier
     axis (the recorded default: tier-rung over a separate surface-register, per `R-path-glass.md:199-200`).
     `<Card tier="opaque">` resolves `--glass-level:0`. The five glass rungs + `opaque` = ONE six-rung ladder.
   - **Reconcile `DialogContent`'s ad-hoc `variant: 'glass'|'opaque'`** (`DialogContent.vue:20-21,83`) onto the
     ONE opaque path — the opaque arm sets `--glass-level:0` rather than its own solid recipe (one opaque
     path, no second fork; clean break, no alias).

3. **REWRITE the a11y brackets onto the ONE level path (the gestalt collapse — `R-path-glass.md:88-90`,
   `W-glass-material.md:46`).** `glass.css:730-746` (`prefers-reduced-transparency: reduce`) → `:root {
   --glass-level: 0 }` (ONE line replaces the ten per-rung clobbers + the grain/highlight kills it keeps).
   `glass.css:749-756` (`prefers-contrast: more`) → a single bounded `--glass-level` set (e.g. `0.3` — solid
   enough for AA, not fully flat) replacing the five per-rung opacity clobbers. The a11y floor + the design
   opaque-escape + the `.glass-opaque` rung all ride ONE `--glass-level` path. COORDINATE with W36
   (forced-colors — one opaque path; W36's forced-colors block can set `--glass-level:0` too rather than
   forking) and with W55 (the adaptive-over-light tint is a SEPARATE axis — `--glass-tint-*`, not
   `--glass-level`; W54 does not touch the tint seam, W55 owns it; the two compose).

4. **Flip the DEFAULT surface register to glass for EVERY band (the MAXIMAL pass-3 escalation —
   USER-DECIDED `MASTER-PLAN.md:58`, `R-path-glass.md:93-98`).**
   - **Button — glass is the DEFAULT** (`button/index.ts`). Re-author so a bare `<Button>` paints glass: the
     `default` variant becomes the glass register (or `defaultVariants.variant` targets `glass`), and the
     OPAQUE primary-fill is demoted to the explicit ESCAPE variant (a named `solid`/`primary` opt-out — clean
     break, no alias; the AV/AW audacious variants KEEP their existing recipes). RECONCILE with W52: the glass
     button already reads as real liquid glass via `.btn-glass` (`button/index.ts:57-64`) — W54 makes that the
     default, it does not re-author the look.
   - **Dock — selected/active state reads as glass** (the keyframes-dock model the user names). The dock
     surface is already glass (`dock.css:146` `--glass-bg-dock`); the selected/active CONTROL state (DK2)
     reads as glass (its specular + the active bg over the glass substrate), not an opaque `--muted` plate —
     confirm + (where a control still defaults to a solid active fill) flip it. COORDINATE with the dock band
     (W45/DK2 owns the dock-control surfaces — W54 confirms the default-register intent; the dock-control
     re-point executes in the dock band if a control is still solid).
   - **Containers / chrome / content panels — glass by DESIGN.** Card already defaults glass
     (`Card.vue:70` `tier:"resting"` + `surface:"glass"`); confirm every CONTAINER/CHROME default (panels,
     overlays, sheets) resolves glass, the opaque rung the explicit opt-out. The page-redesign (W60/Q4/Q7/Q9)
     CONSUMES this default — every story card glass over its rich background.
   - **W55 carries the legibility.** The MAXIMAL default is legible because W55 darkens-over-light; W54 does
     NOT add per-rung legibility tints (that is W55's `--glass-tint-*` seam). W54's gate asserts the default
     reads glass; W55's gate asserts it reads LEGIBLE over light. The two are paired, disjoint seams.

5. **Fold the Q3 hover re-tune so the hover READS on hover (`USER-DEFECTS pass3 Q3:28`, `R-path-glass.md:116-124`).**
   `--scale-hover-btn:1.035` overshot DOWN (W52 fixed the 1.08 snap so hard the lift now reads as nothing).
   Re-tune to a perceptible-but-restrained magnitude (the glass surface's hover = its specular gleam waking +
   a readable scale + a readable bg/border cross-fade — ALL three legs reading together on hover, not just on
   click). KEEP the W52 easing doctrine (surface→bezier, transform→`--spring-smooth`) — the magnitude moves,
   the register does not. This is a TUNE on W52's knob (`--scale-hover-btn` + the glass hover bg/border deltas),
   NOT a material re-author. VERIFY LIVE that the hover is distinguishable from rest BEFORE click (the binding
   Q3 close — the cardinal lesson recurring inside the band; do NOT stamp it from source).

### KEEP — the load-bearing glass spine (do NOT touch; W52/W56 landed it)

UNCHANGED: the W52 material LOOK (the bounded `--glass-specular-size` gleam, `plus-lighter`, the calm
`saturate(1.18)`/`saturate(1.2)`, the `.btn-glass` real-glass backdrop, the easing doctrine — W54 makes this
the DEFAULT, it does not re-author it); the W56 corner-shape axis (`--corner-k-*`/`--corner-shape-*` — the
glass-default surfaces inherit it, no re-author); the `--glass-edge-light` rim + the `--glass-under-shadow-*`
floor (the level-0 opaque rung KEEPS them — a solid plate with a glass edge); the warm-cream `hsl(40 …)` tint
family; the `#glass-refract` PE garnish; the `@supports not (backdrop-filter)` fallback (`glass.css:761-781`
— the level-0 path composes cleanly over it). The `--glass-tint-source`/`--glass-tint-strength` seam
(`tokens.css:838-839`) is W55's — W54 does NOT touch it (the level axis is opacity+blur; the tint axis is
legibility — disjoint by design).

### CONVERGE folds (consumer-grounded design INPUT, NOT executed here)

- **The page-redesign umbrella (W60 / Q4/Q7/Q9) CONSUMES the glass-default + the level knob.** Every story
  card glass over its rich (aurora/constellation/fourier/paper/grid) background reads glass-first because W54
  flipped the default. The page-redesign is BLOCKED on W54 (`MASTER-PLAN.md:29` — Batch 4 blocked on W54);
  W54 writes the foundation, W60 consumes it. Author the cross-ref note; write no W60 source.
- **W55 (adaptive-over-light) is the paired legibility wave.** W54's MAXIMAL glass default is legible because
  W55 darkens-over-light. The two seams are disjoint (`--glass-level` opacity+blur vs `--glass-tint-*`
  legibility); the coherence pass (`R-path-glass.md:232-238`) cross-walks them at band close. Author the
  cross-ref; W55 executes in its own wave.

---

## SOTA deepening (the two-layer law, the single-glass-knob, the maximal-glass register)

The research corpus (R-glass-default, A-glass-tokens, R-ios27-adaptive-glass) + the iOS-26/WWDC25 §219
liquid-glass literature ground the level scalar + the glass-first register. Cited:

**The single-glass-knob (R-glass-default §DEDUP + A-glass-tokens §GESTALT, via `R-path-glass.md:81-89`).** The
SOTA liquid-glass systems expose ONE clarity scalar that moves opacity + diffusion together (Apple's "Clear ↔
Regular" axis is a single perceptual knob, not two independent sliders). The library's seam is verified clean
for exactly this: the opacity `color-mix` is ONE site, the blur is radius-first ONE site, so `--glass-level`
threads both at their single points with `level=1` byte-identical. The inversion `1 - (1-α)*level` is the
correct algebra — it preserves the today-baseline at `level=1`, reaches solid at `level=0`, and clarifies at
`level>1`, all monotonic. The level scalar is the ONE knob the whole glass family rides.

**The two-layer law — and the USER-DECIDED override (R-glass-default §two-layer, `MASTER-PLAN.md:58` R3).**
Apple's two-layer discipline says glass is the NAVIGATION/CHROME default and the CONTENT layer stays opaque
(no-glass-on-glass legibility). The library's prior research recorded this as the recommended default. **The
user OVERRODE it to MAXIMAL** (`MASTER-PLAN.md:58` — *"everything glass … containers, chrome, buttons, AND
content panels"*) — the rich page-redesign backgrounds are the substrate the maximal-glass default reads
against, and **W55 adaptive-over-light carries the legibility** that the two-layer law otherwise enforced via
opacity. So W54 does NOT gate content opaque (the prior recommended default is SUPERSEDED by the user
decision); it makes glass the maximal default and PAIRS with W55 for legibility. The opaque ESCAPE (`level:0`)
is the explicit opt-out for the rare surface a consumer truly needs solid — a level-0 endpoint, not a
content-band default.

**The opaque escape as a level endpoint, not a parallel recipe (A-glass-tokens §GESTALT, the abrogate-before-
patch precept).** The opaque surface is the `--glass-level:0` endpoint of the SAME axis — solid `--card` +
`blur(0)` produced by the ONE scalar — so the a11y reduced-transparency floor, the prefers-contrast bracket,
the forced-colors floor, the `.glass-opaque` utility, and the `<Card tier="opaque">` rung ALL collapse onto
ONE path. This is the gestalt the seam enables: ten per-rung clobbers → ONE `--glass-level:0` line. No
parallel solid recipe to drift; one path, one opaque endpoint.

**Reconciliation note:** W54 ADDS the `--glass-level` axis (a no-op at default), FLIPS the default register to
glass (button + chrome + the dock-selected confirm), COLLAPSES the a11y brackets onto the level path, MINTS
the opaque rung, and RE-TUNES the Q3 hover. It does NOT re-author the W52 material LOOK (it defaults it), does
NOT touch the W56 corner axis (it inherits it), does NOT touch the W55 tint seam (disjoint), and does NOT
re-author the dock-control surfaces (the dock band owns DK2 — W54 confirms the intent).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/tokens.css` | **MINT** `@property --glass-level { syntax:"<number>"; inherits:true; initial-value:1 }` (§8); **THREAD** it through the `--glass-bg-*` `color-mix` recipe (`:769-775` — invert to `calc((1 - (1 - <rung-opacity>) * var(--glass-level)) * 100%)` for all seven rungs incl. dock+chassis, `level=1` byte-identical); **THREAD** it through the `--glass-blur-*` radii (`:711-728` — `blur(calc(var(--glass-blur-<rung>-radius) * var(--glass-level)))` for all rungs incl. dock, KEEP the `saturate()`/`brightness()` companions untouched); record the glass-first / `--glass-level` axis note in the §8 header comment. Do NOT touch the `--glass-tint-*` seam (`:838-839` — W55's). |
| `src/styles/glass.css` | **REWRITE** the `prefers-reduced-transparency: reduce` bracket (`:730-746`) → `:root { --glass-level: 0; }` + KEEP the grain/highlight kills (`--glass-grain-opacity:0`, `--glass-highlight`); **REWRITE** the `prefers-contrast: more` bracket (`:749-756`) → a single bounded `--glass-level` set (≈`0.3`) replacing the five per-rung opacity clobbers; **ADD** `.glass-opaque { --glass-level: 0; }` (the first-class opaque-escape utility — one line, routes through the level machinery, NO parallel solid `background:`). Confirm the `@supports not (backdrop-filter)` fallback (`:761-781`) composes cleanly over the level-0 path (the level-0 opacity already → solid; no fallback edit needed). **glass.css co-writer serialization (HARDENING §G #28):** W54 owns the a11y-bracket region (`:730-757`) + the new `.glass-opaque` rule — line-region-disjoint from W52 (`.glass-material::before` specular `:108-141`) + W42 (`@supports --glass-refract-scale` append) + W24 (`.glass-progress-rail`); the orchestrator serializes by line-region. |
| `src/components/ui/button/index.ts` | **FLIP the default register to glass:** re-author so a bare `<Button>` paints glass (the `default` variant becomes the glass recipe OR `defaultVariants.variant` targets `glass`); DEMOTE the opaque `bg-primary` primary-fill to a named ESCAPE variant (`solid`/`primary` — clean break, no alias); KEEP the audacious variants (`primary-audacious`/`gold-audacious` `:32-40`) + the existing `glass`/`glass-wash` recipes (`:61-64`) unchanged; re-sync `api/index.ts` `ButtonVariants` if the variant key set changes. |
| `src/components/ui/card/Card.vue` | **WIDEN** the `CardTier` union (`Card.vue:18` — the union literal LIVES here; `card/index.ts:3` only re-exports the type) to `"wash" \| "quiet" \| "resting" \| "floating" \| "overlay" \| "opaque"` (the level-0 endpoint of the SAME tier axis). **Wire the `opaque` tier rung:** `tier="opaque"` resolves `.glass-opaque` (or sets `--glass-level:0` on the root) through the SAME tier→class mapping (`:136` `glass-${tier}`) — a `.glass-opaque` ladder class, not a parallel recipe; confirm the `resting` glass default (`:70`) is unchanged. |
| `src/components/ui/card/index.ts` | Pure re-export (`:3` `type CardTier`) — no edit unless the union widen needs a re-export refresh; re-sync `api/index.ts` `CardTier` re-export so the widened union publishes on `@mkbabb/glass-ui/api`. |
| `src/components/ui/dialog/DialogContent.vue` | **RECONCILE** the ad-hoc `variant: 'glass'\|'opaque'` (`:20-21,83`) onto the ONE opaque path — the `opaque` arm sets `--glass-level:0` / composes `.glass-opaque` rather than its own solid recipe (one opaque path, no second fork). |
| `src/styles/utilities.css` | **Q3 hover re-tune:** raise `--scale-hover-btn` from `1.035` to a perceptible-but-restrained magnitude (≈`1.045–1.05`, RATIFY against the live audit) on `--spring-smooth` (`:1040-1052` region); ensure the glass-button hover bg/border cross-fade reads (the surface legs on the bezier — coordinate with the `.btn-glass` hover deltas). NO change to the W52 specular recipe or the easing doctrine — the magnitude moves, the register does not. |
| `CLAUDE.md` | **DOCS (the glass-first canon).** Record: glass is the DEFAULT surface register for EVERY band (USER-DECIDED MAXIMAL); `--glass-level` is the ONE scalar (default 1, level-0 = the opaque escape); the opaque tier rung is the level-0 endpoint; the a11y brackets ride the ONE level path; W55 carries the legibility over light. Append `opaque` to the `CardTier` enumeration + the glass/solid button-default note. Documentation is part of the change. |
| `scripts/proof-glass-level.mjs` | **NEW** — the born-RED→GREEN gate (the device-free SOURCE arm + the registration). Asserts the level scalar threads both ladders; `level=1` byte-identical; the opaque rung resolves solid + `blur(0)`; the default surfaces resolve glass; the a11y brackets ride the level path; the content-band-... (here: the MAXIMAL-default reads glass) assertion. See §HardGate. |
| `package.json` | Register `proof:glass-level` + the W00 meta-gate parity match. |
| `docs/tranches/AX/audit/W54-glass-first-class.json` | **NEW** — the born-RED→GREEN audit artefact + the paired-π BEFORE/AFTER + DELTA reference. |
| `docs/tranches/AX/audit/W54-DELTA.md` | **NEW** — the paired-π BEFORE/AFTER + DELTA capture (the W00 protocol). |

**OUT of bounds:** the W52 `.glass-material::before` specular recipe (`glass.css:108-141` — W52 owns it; W54
DEFAULTS the look, never re-authors it); the W56 corner-shape axis (`theme.css` `--corner-*` — W54 inherits
it); the W55 `--glass-tint-source`/`--glass-tint-strength` seam (`tokens.css:838-839` — W55 owns the adaptive
legibility tint; W54's level is opacity+blur ONLY); the dock-control active-surface re-point (DK2 / the dock
band owns the dock-control recipes — W54 confirms the default-register intent, the control re-point executes in
the dock band); the forced-colors skin (W36 — W54 coordinates that W36's floor can set `--glass-level:0`, it
does not author the forced-colors block); the WebGL blob/aurora shaders; the `useSpecularTracking` composable
(W09/W52); the `#glass-refract` filter graph (W42/W20).

---

## Disjointness (sibling waves it must NOT overlap)

W54 is the glass-DEFAULT + level-scalar ROOT wave; it shares the glass token/style files with the material +
shape + adaptive siblings but is line-region-disjoint:

- **vs AX.W52 (the material LOOK) — DEPENDED-ON, line-region-disjoint, DISTINCT axis.** W52 = how the glass
  SURFACE reads (the specular gleam, the blend, the saturate, the smooth-hover register). W54 = whether glass
  is the DEFAULT + the level scalar that scales W52's opacity+blur. W54 DEFAULTS W52's look, never re-authors
  it. File overlap: W54 owns the a11y-bracket region (`glass.css:730-757`) + the opacity/blur token seams
  (`tokens.css:711-775`); W52 owns the `.glass-material::before` specular (`glass.css:108-141`) + the specular
  cohort (`tokens.css §11b`). Line-region-disjoint. The Q3 hover re-tune is a magnitude move on W52's
  `--scale-hover-btn` knob (W52 minted it; W54 re-tunes the value — a value edit on the existing knob, the
  same disjoint pattern W52 used on W09's cohort). **dependsOn W52** so the material is the stable model W54's
  level multiplies.
- **vs AX.W55 (adaptive-over-light legibility) — PAIRED, DISJOINT seam.** W54 = the level axis (opacity+blur,
  `--glass-level`). W55 = the legibility axis (the adaptive `--glass-tint-*` darken-over-light). The two are
  disjoint seams that compose: W54 makes glass the maximal default, W55 keeps it legible over light backdrops.
  W54 does NOT touch the `--glass-tint-*` seam (`tokens.css:838-839`); W55 does NOT touch `--glass-level`. The
  coherence pass cross-walks them at band close. W55 dependsOn W54 (it tints the glass-default W54 establishes)
  + W52 + W00.
- **vs AX.W56 (the corner-shape axis) — DEPENDED-ON, DISJOINT axis.** W56 = the SHAPE (`--corner-k-*`/
  `--corner-shape-*`, landed). W54 = the SURFACE register + opacity/blur level. The glass-default surfaces
  inherit the W56 corner vocabulary unchanged; W54 mints no corner token, W56 minted no glass-level. No file
  overlap (W56's axis is in `theme.css`; W54's is in `tokens.css`/`glass.css`).
- **vs AX.W36 (forced-colors skin) — COORDINATE the ONE opaque path.** W36 = the WHC structure-survival skin.
  W54 = the normal-render glass-default + the level path. COORDINATE: W36's forced-colors floor can set
  `--glass-level:0` (the ONE opaque path W54 establishes) rather than forking its own opacity clobbers — so
  the a11y reduced-transparency floor (W54), the prefers-contrast bracket (W54), and the forced-colors floor
  (W36) all ride the ONE level path. W54 authors NO forced-colors block; W36 consumes W54's `--glass-level:0`
  endpoint.
- **vs AX.W45/DK2 (the dock band) — COORDINATE the dock-selected-glass intent.** W45/DK2 own the dock-control
  surfaces. W54 confirms the default-register intent (the dock-selected state reads glass — the keyframes-dock
  model the user names); the dock-control re-point (if a control still defaults to a solid active fill)
  executes in the dock band, not W54. W54 writes NO dock-control recipe.
- **vs AX.W60 (the page-redesign umbrella) — W54 is the BLOCKING predecessor.** W60 CONSUMES the glass-default
  + the level knob (`MASTER-PLAN.md:29` — Batch 4 blocked on W54). W54 writes the foundation; W60 wraps each
  story in a glass card over its rich background. W54 authors the cross-ref note; writes NO W60 source.

### DEDUP (the explicit boundary vs the named waves)

- **vs W52 (material LOOK) — DISTINCT AXIS.** W52 built the LOOK; W54 makes it the DEFAULT + the level scalar.
  W52 = the gleam/blend/saturate/hover-register; W54 = the default-register flip + `--glass-level` (opacity+
  blur). W54 mints NO specular token, re-authors NO `.glass-material::before`; W52 minted NO level scalar,
  flipped NO default. The Q3 hover re-tune is a VALUE edit on W52's `--scale-hover-btn` (the magnitude
  overshot down; W54 re-tunes it up to perceptible) — a knob re-baseline, not a material re-author. This is
  the headline dedup: **W52 = the LOOK, W54 = the DEFAULT + the LEVEL.**
- **vs W55 (adaptive legibility) — DISTINCT SEAM.** W54 = the level axis (`--glass-level`, opacity+blur).
  W55 = the tint axis (`--glass-tint-*`, darken-over-light legibility). Two disjoint seams; W54 mints no tint,
  W55 mints no level. They compose (maximal default + legibility-over-light) but never collide.
- **vs W56 (corner shape) — DISTINCT AXIS.** W56 = SHAPE; W54 = SURFACE-register + level. No token overlap, no
  file overlap.
- **vs W36 (forced-colors) — ONE opaque PATH (coordinate, not collide).** W54 establishes `--glass-level:0` as
  the single opaque endpoint; W36's forced-colors floor consumes it. No fork.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

Per AX.md §0 agent-ceiling (≤6 implement / ≤7 read-only-audit). W54's split (count 3):

- **Implement (≤1 agent — the level scalar + the default flip are one cohesive fold).** Mints `--glass-level`
  + threads both ladders (tokens.css), rewrites the a11y brackets onto the level path + adds `.glass-opaque`
  (glass.css), flips the default button register to glass + demotes the opaque-fill (button/index.ts), widens
  `CardTier` + wires the opaque rung (card), reconciles `DialogContent`'s opaque arm onto the level path,
  re-tunes the Q3 hover (utilities.css), records the canon (CLAUDE.md), re-syncs `api/index.ts`. Lint +
  typecheck at every interval. The level seam + the default flip + the a11y collapse are line-disjoint within
  the shared files.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the six RED witnesses against the patched tree:
  asserts `--glass-level` is minted + threads BOTH ladders; computes the `level=1` byte-identity (the
  resolved `--glass-bg-*` + `--glass-blur-*` are unchanged from HEAD at default); asserts `level=0` → solid
  `--card` + `blur(0)`; asserts the default button resolves glass + the opaque-fill is the named escape;
  asserts the a11y brackets set `--glass-level` (not per-rung clobbers); asserts `.glass-opaque` + the `opaque`
  CardTier exist; asserts the Q3 hover magnitude reads (≥ a perceptibility floor). ADVERSARIAL twist: tries to
  pass the gate with the OLD per-rung a11y clobber still present (confirms the gate REDs on the legacy
  bracket); tries `level=1` NOT byte-identical (confirms the byte-identity assertion REDs); tries the default
  button still opaque (confirms the default-register assertion REDs). DRIVES the VISUAL-TRUTH live audit (the
  binding close — see HardGate).
- **Gate-author (≤1 agent).** Authors `proof-glass-level.mjs` (born-RED on the level-threads-both-ladders +
  byte-identity + opaque-endpoint + default-glass + a11y-on-level + Q3-hover-reads assertions); confirms it
  FAILS at HEAD `6569b7a` (no level scalar; opaque default button; per-rung a11y clobber) and PASSES on the
  patched tree. Registers `proof:glass-level` in `package.json` + the W00 meta-gate parity. Gate-author is
  distinct from implementer (the gate must be able to FAIL the implementer's work — the AW false-GREEN class).
  The π live arm rides the W00 readback, NOT a CPU text gate alone.

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b).** The
wave-agnostic grant lives ONCE in AX.md §6.1 with the 4-class halt-vs-work-around tree in §6.2 — by reference.
This wave's §3a triumvirate AUTO-TRIGGERS:

- **Out-of-FileBounds reveal → triumvirate (Class 2; NEVER absorb in-line).** Any need to touch the W52
  `.glass-material::before` specular, the W55 `--glass-tint-*` seam, the W56 corner axis, the dock-control
  active-surface recipes (DK2), the forced-colors skin (W36), the WebGL shaders, `useSpecularTracking`, or the
  `#glass-refract` filter graph — HALT + triumvirate (a glass-axis boundary the FileBounds did not home).
- **Non-local hard-gate failure → triumvirate (Class 2).** If `proof:glass-level` cannot simultaneously assert
  the level-threads-both-ladders + the `level=1` byte-identity + the opaque-endpoint + the default-glass + the
  a11y-on-level — OR if W52's `proof:liquid-glass-material` / W56's `proof:squircle-language` REDs after the
  level thread (the scalar desyncing a gate W52/W56 owns) — escalate the gate design, do NOT relax a ceiling
  or split the gate to pass over a residual opaque default / per-rung clobber.
- **3rd diagnostic-loop iteration → triumvirate (Class 2).** If `level=1` does NOT resolve byte-identical
  after three threading attempts (the `calc()` algebra drifting the default), OR the Q3 hover does NOT read on
  hover after three re-tunes, dispatch research→plan→redress rather than re-tuning the multiplier / spring
  magnitude ad hoc.
- **§Open-questions ratify reached un-ratified → HALT-and-ratify (Class 3).** The Q3 hover magnitude (how big
  is "perceptible but restrained"), the button default-register shape (re-author `default` vs re-target
  `defaultVariants`), and the prefers-contrast `--glass-level` value (the bounded-solid magnitude) are
  ratify-before-impl hinges — if any reaches impl un-ratified, take the recorded default (≈1.045–1.05 hover;
  re-target `defaultVariants` to the glass recipe; `0.3` prefers-contrast) and run the live-audit verification,
  do NOT self-ratify a divergent choice.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN. `proof:glass-level` (NEW; the device-free SOURCE + registration
arm + a fail-CLOSED π LIVE arm).**

The **device-free SOURCE arm** (always gates) — a source-parse + token-resolution gate (the precept-valid
artefact forms per SPEC.md §Hard Gates — source-structure for the CSS-cascade contract; the PAINTED render is
proven by the π arm, NEVER a text gate alone):

- **The level scalar threads BOTH ladders.** Assert `@property --glass-level` is registered
  (`syntax:"<number>"; inherits:true; initial-value:1`); assert it appears in the `--glass-bg-*` `color-mix`
  recipe (all seven rungs) AND in the `--glass-blur-*` radii (all rungs). **Born-RED at HEAD** (`grep
  glass-level src/` = NONE).
- **`level=1` is byte-identical.** Resolve the `--glass-bg-*` `color-mix` + the `--glass-blur-*` radii at
  `--glass-level:1` and assert they equal the HEAD literals (`wash` → `30%`, `quiet` → `50%`, … `blur(1px)`,
  `blur(10px)`, …). The no-op-at-default guarantee — minting the scalar regresses nothing.
- **`level=0` is the opaque endpoint.** Resolve at `--glass-level:0` and assert the `--glass-bg-*` rungs →
  solid `--card` (100%) AND the `--glass-blur-*` → `blur(0)`. Assert `.glass-opaque { --glass-level:0 }` exists
  + the `CardTier` union includes `opaque`. **Born-RED at HEAD** (`grep glass-opaque src/styles/` = NONE; no
  opaque CardTier member).
- **The default surface register is GLASS.** Assert the Button `defaultVariants` resolves the glass recipe (a
  bare `<Button>` composes `glass`/`glass-wash` + `.btn-glass`, NOT the opaque `bg-primary` solid); assert the
  opaque primary-fill is a NAMED escape variant; assert the Card default tier (`resting`) is glass (unchanged).
  **Born-RED at HEAD** (`button/index.ts:81` default = the opaque `bg-primary`).
- **The a11y brackets ride the ONE level path.** Assert `prefers-reduced-transparency: reduce` sets
  `--glass-level: 0` (NOT ten per-rung `--glass-opacity-*:1` + `--glass-blur-*:none` clobbers); assert
  `prefers-contrast: more` sets a single bounded `--glass-level` (NOT five per-rung clobbers). **Born-RED at
  HEAD** (`glass.css:730-757` clobbers ten/fifteen rungs).
- **The Q3 hover reads.** Assert `--scale-hover-btn` is raised above the W52 `1.035` to a perceptibility floor
  (≥ ~1.045) on `--spring-smooth`; assert the easing doctrine register is unchanged (transform→`--spring-
  smooth`, surface→bezier — the magnitude moved, the register did not). **Born-RED at HEAD** (`1.035`).
- **The canon is recorded.** Assert CLAUDE.md enumerates the glass-first default + the `--glass-level` axis +
  the level-0 opaque escape + the W55 legibility pairing. **Born-RED at HEAD** (`grep glass-first CLAUDE.md` =
  NONE).
- **W52/W56 INTACT (regression guard).** Assert `proof:liquid-glass-material` + `proof:squircle-language`
  still PASS after the level thread (the scalar did not desync the material cohort or the corner axis).

The **fail-CLOSED π LIVE arm** (rides the W00 readback; a non-animating/unreachable surface is a hard RED when
the Playwright workspace IS present, NEVER a false-green SKIP): probes `localhost:5173/primitives/buttons` —
`evaluate_script` reads a bare `<Button>`'s `getComputedStyle().backdropFilter` and asserts it is a glass blur
(NOT `none`), AND its `background` resolves the glass tier (NOT a solid `bg-primary`); probes the same button
on `:hover` and asserts the computed `scale` exceeds rest (the Q3 hover READS before click); reads
`getComputedStyle(document.documentElement).getPropertyValue('--glass-level')` = `1` at rest (the default).
With the Playwright workspace present, an opaque default button / an imperceptible hover is a hard RED.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion; the cardinal lesson — W52
shipped headless-green with a hover the next live pass — Q3 — found imperceptible, which is exactly the class
this wave must not repeat).** A fail-CLOSED live chrome-devtools-mcp pass the ORCHESTRATOR runs @
`localhost:5173` — `getComputedStyle` reads + screenshots over `/primitives/buttons`, a glass-card story over
a rich background (`/substrates/aurora` or a W60 page if landed), and the dock, in light AND dark at ≥2
viewports:

- **A bare `<Button>` reads GLASS.** Mount the default button over the buttons page: ASSERT it paints
  translucent glass (the backdrop visible through it, the W52 bounded gleam + edge rim), NOT a solid primary
  slab. The opaque primary-fill is reachable ONLY via the named escape variant.
- **The `--glass-level` knob WORKS.** `evaluate_script` sets `--glass-level: 0` on a glass tile and asserts it
  goes SOLID (`--card`, `blur(0)`); sets `--glass-level: 1.5` and asserts it goes CLEARER (more transparent,
  more blur); sets `1` and asserts byte-identical to the HEAD render. One knob, the whole glass family moves.
- **The opaque ESCAPE is solid + clean.** A `<Card tier="opaque">` / `.glass-opaque` surface: ASSERT it paints
  solid `--card` with the glass EDGE intact (the rim + under-shadow — a solid plate with a glass edge, not a
  bare div), `backdrop-filter: none`.
- **The Q3 hover READS on hover.** Hover the glass-default button SLOWLY (before any click): ASSERT the hover
  state is visibly distinguishable from rest — the specular gleam wakes, the scale lifts perceptibly, the
  bg/border cross-fades — ALL reading together on HOVER, not just on active/press. Press-and-hold confirms the
  press still springs and hover/press read as one motion language. A `performance_start_trace` confirms
  compositor-only on the scale.
- **The a11y opaque floor still works.** Emulate `prefers-reduced-transparency: reduce`: ASSERT every glass
  surface goes solid (the ONE `--glass-level:0` line reaches the floor the ten clobbers used to); emulate
  `prefers-contrast: more`: ASSERT the bounded-solid render.
- **W52/W56 UNCHANGED.** Side-by-side: the bounded gleam, the plus-lighter blend, the calm saturate (W52) and
  the corner squircle (W56) are UNAFFECTED by the level thread + the default flip (the default-glass surface
  carries the W52 look + the W56 shape).
- **Affordance / hierarchy / NO visual occlusion / no regression** per the AX cardinal gate, light AND dark,
  ≥2 viewports.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/W54-DELTA.md`, per the W00 protocol) is the binding
close criterion. The BEFORE capture pins the HEAD opaque default button + the imperceptible Q3 hover the flip
+ re-tune must visibly beat.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the six RED witnesses against HEAD `6569b7a` on
   the live demo: the opaque default button over the buttons page; no level knob; the per-rung a11y clobber;
   no `.glass-opaque`; the imperceptible Q3 hover. Capture the BEFORE π render as the born-RED baseline in
   `audit/W54-glass-first-class.json`. Confirm W52 (material) + W56 (shape) are settled. Do NOT proceed on the
   audit's word — re-prove.
2. **Author the gate born-RED.** Author `proof-glass-level.mjs` (level-threads-both-ladders + byte-identity +
   opaque-endpoint + default-glass + a11y-on-level + Q3-hover-reads + W52/W56-intact); register
   `proof:glass-level` in `package.json` + the W00 meta-gate; confirm it FAILS at HEAD.
3. **Mint `--glass-level` + thread both ladders.** `tokens.css`: register the `@property`; thread the opacity
   `color-mix` (`1 - (1-α)*level`, all seven rungs); thread the blur radii (`radius*level`, all rungs); record
   the §8 header note. Verify `level=1` byte-identical. Lint + typecheck.
4. **The opaque escape + the a11y collapse.** `glass.css`: rewrite the reduced-transparency + prefers-contrast
   brackets onto `--glass-level`; add `.glass-opaque { --glass-level:0 }`. `Card.vue`: widen the `CardTier`
   union (`:18`) + wire the opaque rung; re-sync `api/index.ts`. `DialogContent.vue`: reconcile the opaque arm onto the level path. Lint +
   typecheck.
5. **Flip the default register to glass.** `button/index.ts`: the default button → glass; demote the
   opaque-fill to the named escape; re-sync `api/index.ts`. Confirm the dock-selected-glass intent (coordinate
   with the dock band — no dock-control edit here). Lint + typecheck.
6. **The Q3 hover re-tune.** `utilities.css`: raise `--scale-hover-btn` to the perceptibility floor on
   `--spring-smooth`; ensure the glass-button hover bg/border cross-fade reads. Lint + typecheck.
7. **Record the canon (docs).** CLAUDE.md: the glass-first default + the `--glass-level` axis + the level-0
   opaque escape + the W55 legibility pairing + the `opaque` CardTier.
8. **Gate GREEN + VISUAL-TRUTH.** Confirm `proof:glass-level` passes; re-run `proof:liquid-glass-material` +
   `proof:squircle-language` (confirm the level thread did not red them); run the VISUAL-TRUTH live π audit
   (the default button glass, the level knob works, the opaque escape solid+clean, the Q3 hover reads on
   hover, the a11y floor holds, W52/W56 unchanged) over flat + aurora, light + dark, ≥2 viewports; capture the
   paired-π BEFORE/AFTER + DELTA (`W54-DELTA.md`); write `audit/W54-glass-first-class.json` to GREEN; author
   the W60 page-redesign + W55 cross-ref notes.

Lint/format cadence: `npm run typecheck` + the repo's eslint/prettier after each integration batch (steps
3–7) and before close; `git diff --check` on the doc/status commit.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W54-glass-first-class.json` — the born-RED→GREEN ledger: the six RED witnesses (no
  level scalar, opaque default button, per-rung a11y clobber, no opaque rung, imperceptible Q3 hover, no
  canon), the per-finding disposition (R-glass-default + A-glass-tokens + the pass-3 escalation), the W52/W56
  settled-confirmation, and the post-wave GREEN structure + π-readback (the `level=1` byte-identity proof, the
  default-glass readback, the Q3 hover-reads measurement).
- `docs/tranches/AX/audit/W54-DELTA.md` — the paired-π BEFORE/AFTER + DELTA: the opaque default button → glass;
  the level knob (0=solid / 1=baseline / 1.5=clearer); the opaque escape (solid + glass edge); the Q3 hover
  (imperceptible → reads on hover); the a11y floor (per-rung clobber → ONE level line); the W52/W56-unchanged
  canary; over flat + aurora, light + dark, ≥2 viewports.
- `scripts/proof-glass-level.mjs` — the NEW gate (level-threads-both-ladders + byte-identity + opaque-endpoint
  + default-glass + a11y-on-level + Q3-hover-reads + the fail-CLOSED π live arm).
- The diff localizing the `--glass-level` mint + the dual-ladder thread + the a11y collapse + the
  `.glass-opaque` rung + the `CardTier` widen + the default-register flip + the Q3 hover re-tune + the canon.
- The W60 page-redesign + W55 cross-ref notes (W54 is the BLOCKING predecessor of W60; the paired legibility
  partner of W55).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(glass): born-RED proof:glass-level — level threads both ladders + byte-identity + opaque-endpoint + default-glass + a11y-on-level + Q3-hover-reads (AX.W54 G1)`
2. `feat(tokens): mint --glass-level @property scalar threaded through the opacity color-mix + the blur radii — one glass knob, level=1 byte-identical (AX.W54 G1)`
3. `feat(glass): collapse the reduced-transparency + prefers-contrast a11y brackets onto --glass-level + add .glass-opaque (level-0) — one opaque path (AX.W54 G1)`
4. `feat(card,dialog): widen CardTier to opaque (the level-0 endpoint) + reconcile DialogContent's opaque arm onto the one level path (AX.W54 G1)`
5. `feat(button): flip the default register to glass; demote the opaque primary-fill to the named escape variant — glass-first (AX.W54 G1 / MAXIMAL)`
6. `fix(button): re-tune --scale-hover-btn up to a perceptible-but-restrained lift on --spring-smooth — the hover reads on HOVER not just click (AX.W54 Q3)`
7. `docs(claude): record the glass-first MAXIMAL default + the --glass-level axis + the level-0 opaque escape + the W55 legibility pairing (AX.W54 G1)`
8. `chore(AX.W54): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + the W60/W55 cross-ref notes`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the close machinery.** The fail-CLOSED π workspace is the home of the
  binding live-audit close criterion. W54 cannot close on the SOURCE gate alone (the cardinal AX lesson — a
  green CPU gate over an opaque default button / an imperceptible hover is exactly the Q3 gap W52 fell into);
  W00 stands up the lane it closes on + the paired-π BEFORE/AFTER + DELTA protocol.
- **AX.W52 (the material LOOK) — HARD predecessor.** W52 mints the bounded gleam, the plus-lighter blend, the
  calm saturate, the `.btn-glass` real-glass backdrop, the `--scale-hover-btn` knob, and the easing doctrine.
  W54 makes that LOOK the DEFAULT + scales its opacity+blur with `--glass-level` + re-tunes the
  `--scale-hover-btn` magnitude (Q3). There is no stable material to default until W52 lands — running W54
  before W52 would default a look W52 then rewrites.
- **AX.W56 (the corner-shape axis) — predecessor.** W56 mints the `--corner-k-*`/`--corner-shape-*` vocabulary
  the glass-default surfaces inherit. W54 makes glass the default register; the corner shape rides it. No
  re-author either way.
- **Downstream — W55 (adaptive-over-light legibility) dependsOn W54** (it tints the glass-default W54
  establishes — the paired legibility seam); **W60 (the page-redesign umbrella) is BLOCKED on W54**
  (`MASTER-PLAN.md:29` — every story card glass over its rich background CONSUMES the glass-default + the level
  knob). W54 writes the foundation both consume.
- **Coordinates with AX.W36 (forced-colors — the ONE opaque path; W36 consumes `--glass-level:0`), AX.W45/DK2
  (the dock band — the dock-selected-glass intent; the dock-control re-point executes there).** Neither is a
  hard dependsOn — declared so the orchestrator sequences the opaque-path + the dock-default intent coherently.

---

## Archaeology (the git / prior-tranche lineage + the research mandate)

- **G1 (the user defect — pass-2 §G1 → bumped pass-3 TOP, `USER-DEFECTS-2026-06-08-pass3.md:13`).** Pass-2
  asked *"why is the DEFAULT not glass?"*; pass-3 escalated to *"The default for ALL items is their glass
  variants — fix at the ROOT … GLASS FIRST for buttons + items EVERYWHERE, and in the dock (the keyframes dock
  is the model for selected elements)."* Bumped to TOP precedence — the foundational ROOT wave that BLOCKS the
  page-redesign umbrella.
- **The USER-DECIDED MAXIMAL hinge (`MASTER-PLAN.md:58` R3).** The boundary was a RATIFY hinge (navigation-band
  glass-first vs content-layer glass); the user DECIDED MAXIMAL — *"everything glass … containers, chrome,
  buttons, AND content panels … the `--glass-level` scalar + the explicit opaque escape remain for the rare
  solid need; W55 adaptive-over-light carries the legibility."* This SUPERSEDES the prior recommended
  two-layer default — W54 makes glass the maximal default, W55 the legibility partner.
- **The verified-clean seam (`R-path-glass.md:64-71`).** The glass LEVEL is consumed in EXACTLY ONE place
  (`tokens.css:769-775` the `--glass-bg-*` `color-mix`), the blur ladder is radius-first
  (`tokens.css:692-728`), and the opaque endpoint is already produced by the reduced-transparency bracket
  (`glass.css:730`). So `--glass-level` folds in at ONE opacity site + ONE blur site with zero fan-out — the
  reason W54 is an ADDITIVE fold, not a rebuild.
- **W52 (the material LOOK, landed `31d716e`/`97551ca`) — the stable substrate.** The bounded gleam, the
  plus-lighter blend, the calm saturate, the `.btn-glass` real-glass button backdrop, the `--scale-hover-btn:
  1.035` knob, and the easing doctrine all landed + live-verified. W54 defaults this look + scales it +
  re-tunes the hover (Q3).
- **W56 (the corner axis, landed `8e17346`) — the shape substrate.** `--corner-k-*`/`--corner-shape-*` landed;
  the glass-default surfaces inherit it.
- **Q3 (the W52 hover overshoot, `USER-DEFECTS-2026-06-08-pass3.md:28`).** W52 dialed the hover to `1.035` to
  kill the 1.08 snap; the live pass found it imperceptible (*"only on CLICK is it visible"*). The cardinal
  lesson recurring INSIDE the glass band — a wave marked live-verified that the next live pass refutes. W54
  folds the re-tune (a magnitude move, not a material re-author) + the binding live re-verify.
- **HEAD `6569b7a` (3.8.0+convergence, the three USER-DECIDED hinges) — the audit baseline.** The opaque
  default button (`button/index.ts:81`), the un-scaled opacity+blur ladders (`tokens.css:681-728`), the
  per-rung a11y clobber (`glass.css:730-757`), the absent `.glass-opaque`/`--glass-level`/glass-first-canon,
  and the `1.035` Q3 hover are all live-proven here.
- **The research corpus (R-glass-default, A-glass-tokens, R-ios27-adaptive-glass).** The single-glass-knob
  algebra, the two-layer law (+ its user-override to MAXIMAL), the opaque-as-level-endpoint gestalt, and the
  W55 pairing — all read via the R-path-glass + W-glass-material syntheses before this spec; the token deltas
  + seam threads are corpus-grounded, not speculative.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Pursuant to `docs/precepts/` (pinned `63240e6`); the band-G binding precepts this wave pursues + must not
violate:

- **token-first / no magic numbers (J invariant — "every visual behaviour is a CSS custom property; no
  consumer edits library source for styling").** `--glass-level` is the ONE scalar that re-tunes the whole
  glass family from `:root`; the opaque endpoint, the a11y floor, and the Q3 hover are all token-resolved. MUST
  NOT re-bury a literal (the level is the token, the threaded `calc()` reads it; the hover magnitude is
  `--scale-hover-btn`).
- **abrogate-before-patch (ask "can we delete?" before "can we patch?").** The a11y collapse DELETES the
  ten/fifteen per-rung clobbers → ONE `--glass-level:0` line (the abrogation); the opaque escape is the SAME
  axis's endpoint, not a parallel solid recipe. The default flip RE-AUTHORS the register, it does not add a
  second glass path.
- **one-path / no-legacy-code.** ONE glass-level scalar threading BOTH ladders; ONE opaque path (the a11y
  floor + the design escape + the forced-colors floor + the `.glass-opaque` utility + the `opaque` CardTier
  ALL ride `--glass-level:0`); ONE default register (glass). MUST NOT ship a parallel solid recipe or a second
  opaque fork.
- **no-backwards-compat / no-redundant-alias (MEMORY no-backwards-compat).** The default flip is a CLEAN BREAK
  — the opaque primary-fill is DEMOTED to a named escape variant, NOT kept as a dual default with an alias. The
  `DialogContent` opaque arm is RECONCILED onto the one level path, not left as a second recipe. No
  `glass-default` alias for the old opaque default.
- **substrate-with-consumer / no-overfitting (Design-Axis-3, L invariant 8).** `--glass-level` ships with its
  consumers (both ladders read it; the a11y brackets, the `.glass-opaque` rung, the `opaque` CardTier, and the
  forced-colors floor all consume the level-0 endpoint = ≥2); the default-glass flip serves every button + the
  page-redesign (W60). No speculative token.
- **the cardinal lesson (every wave closes on a LIVE chrome-devtools-mcp DELTA).** Q3 IS the cardinal lesson
  recurring inside the glass band — W52 stamped live-verified with a hover the next live pass found
  imperceptible. W54's close is BINDING on the executed live audit (the default button reads glass, the level
  knob works, the Q3 hover reads ON HOVER, the a11y floor holds), captured as a paired-π DELTA — NOT the SOURCE
  gate alone.
- **Goal + completion criterion paired (README §Edicts; WAVE_SPEC §2a/§6).** The §Goal (glass the maximal
  default, the one level knob, the one opaque path, the Q3 hover reads) and the §HardGate (born-RED→GREEN
  `proof:glass-level` + the visual-truth audit) are paired; a gate-pass with a goal-miss (the level threads but
  the default button still reads solid, or the hover still reads only on click) closes `complete_with_misses`,
  not `complete`.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **The Q3 hover magnitude — how big is "perceptible but restrained" — RATIFY against the live audit.** W52
   dialed `--scale-hover-btn` to `1.035` (imperceptible — Q3); the 1.08 snap was the prior over-reach. The
   sweet spot is a scale that READS on hover without snapping. **Recommendation: ≈1.045–1.05** on
   `--spring-smooth`, WITH the glass-button hover bg/border/gleam reading together (the hover affordance is the
   SUM of the legs, not the scale alone — a glass surface's hover is its specular gleam waking + a readable
   surface shift + the scale). RATIFY against the live audit (the binding Q3 close — verify it reads BEFORE
   click; raise further only if still imperceptible).
2. **The button default-register shape — re-author the `default` recipe vs re-target `defaultVariants` —
   RATIFY.** Two clean ways to make a bare `<Button>` glass: (A) re-author the `default` variant recipe to the
   glass register + demote the opaque-fill to a new named variant; (B) keep the `default` recipe and re-target
   `defaultVariants.variant` to `glass`, renaming the old opaque `default` to a named escape. **Recommendation:
   the clearest clean break** — make `default` the glass recipe (so a bare `<Button>` is glass by name) and add
   a named `solid`/`primary` escape for the opaque-fill. RATIFY the exact variant-key naming (no alias for the
   old default; clean break). Re-sync `api/index.ts` `ButtonVariants` whichever way.
3. **The prefers-contrast `--glass-level` value — RATIFY.** The reduced-transparency floor is unambiguous
   (`--glass-level: 0`, fully solid). prefers-contrast wants MORE solid than default but not necessarily fully
   flat (the HEAD bracket sets 0.85–0.98 opacity, not 1). **Recommendation: a single bounded `--glass-level:
   0.3`** (solid enough to clear the contrast intent, the glass character mostly gone) — RATIFY against the
   live prefers-contrast emulation (drop to 0 if 0.3 still reads too glassy under the media query).
4. **MAXIMAL content-glass + W55 sequencing — confirm the legibility handoff is REAL before close.** The
   USER-DECIDED MAXIMAL makes content panels glass; W55 carries the legibility-over-light. **Recommendation:
   W54 makes glass the maximal default + ships the opaque escape; the live audit confirms the default reads
   glass AND stays legible over the EXISTING (pre-W60) backgrounds; the rich-light-background legibility (the
   page-redesign heros) is W55's binding gate.** Do NOT close W54 `complete` if the maximal default reads
   ILLEGIBLE over a light backdrop at HEAD with W55 un-landed — sequence W55 before the page-redesign consumes
   the maximal default, or ship W54 with the opaque escape as the interim legibility floor and W55 as the hard
   follow. RATIFY the handoff at the band-close coherence pass.
5. **`--glass-level` `@property` vs plain custom property — RATIFY.** A plain inherited custom property
   suffices for a `:root` / per-surface override; `@property { syntax:"<number>"; inherits:true;
   initial-value:1 }` is warranted because the level is a NUMBER consumed in `calc()` (the registration gives
   it a typed initial value + interpolability if a consumer animates it — e.g. W42 springing the level). 
   **Recommendation: `@property`-registered** (the typed `<number>` + the guaranteed `initial-value:1` make the
   byte-identity robust + future-proof a W42 animated level); revisit only if the registration trips a
   Lightning-CSS emit issue (then a plain property with a documented default).

---

## Hardening amendment (golden pass · 2026-06-09)

The 32-lane hand-challenge returned the component layer **INCOHERENT** (`audit/hardening/GLASS-ui-components.md`,
the lone INCOHERENT verdict; corroborated by `GLASS-tokens-model.md` WEAK). The W54 body above flips Button +
Card + Dialog onto the `--glass-level` model — but the census found **FOUR independent glass recipes** the body
DOES NOT name, plus a set of fully-opaque chrome/content `ui/` surfaces that stay solid after the ROOT lands. So
W54-as-specced collapses Button+Card+Dialog and leaves Tabs/Alert/TagsInput/.input-pill/the-dock-bg as the NEW
divergences — the cohesion claim (G-1) is still FALSE post-wave. This amendment EXPANDS the FileBounds to absorb
all four recipes onto the ONE `--glass-level` + oklab tint seam, adds the `proof:glass-one-model` (G-1) gate
clause, and records the W56(R1) squircle COUPLING. The §Scope/§Goal/§Cadence above stand; this is an
ABSORPTION, not a rewrite — the same five folds, widened to the surfaces the census enumerated.

### The four divergent recipes the body under-scoped (source-true at HEAD `89edffc`)

The census (`GLASS-ui-components.md:36-53` glassCohesion table + `:62-108` surface census) found no single
`--glass-level`-driven model — four families, each with its own blur/opacity/tint contract, no shared knob:

| Recipe | Site (source-true) | Surface | What's wrong under MAXIMAL |
|--------|--------------------|---------|----------------------------|
| **SegmentedTabs (flagship)** | `custom/tabs/SegmentedTabs.vue:448` (`background: var(--muted-medium)`) + `:462` (`.segmented-indicator { background: var(--background) }`) | the AX.W53 unified tab family — the most-celebrated interactive surface | OPAQUE track + OPAQUE solid slider; tabs are nav chrome (the "chrome default" the MAXIMAL decision says is glass) yet fully OFF the glass model |
| **ui Tabs indicator** | `ui/tabs/TabsIndicator.vue:19` (`bg-secondary/80`) | the reka-ui `<Tabs>` underline/slider | opaque `bg-secondary/80`, no glass tier |
| **Alert** | `ui/alert/index.ts:12-26` — EVERY variant is `bg-card` (`grep -c glass → 0`) | a content panel | zero glass path; under MAXIMAL a content panel is a glass tier rung |
| **TagsInput** | `ui/tags-input/TagsInput.vue:18` (`bg-background`) | a form control | the sibling `.input-pill` family (Input/Textarea/NumberField) is glass-tinted; TagsInput was left `bg-background` — a surface-migration SIBLING-MISS inside the form atoms |

Plus the two RECIPE-level divergences (not new surfaces — the existing glass families that bypass the model):

- **`.input-pill` is a `blur(1px)` tinted plate, NOT real glass** (`glass.css:520-543`, `backdrop-filter:
  var(--glass-blur-wash)` = `blur(1px)`, `tokens.css:692` `--glass-blur-wash-radius: 1px`). It does NOT read as
  glass; it is a tinted plate with a 1px frost + a `--surface-tint-15` border that sits OFF the glass tint seam.
- **The dock background bypasses the oklab tint seam** (`tokens.css:774` `--glass-bg-dock: color-mix(in srgb,
  var(--card) …)` — a FLAT srgb mix with NO `color-mix(in oklab, …, --glass-tint-source --glass-tint-strength)`
  wrapper the five rungs use). So even after W55's adaptive axis the dock — the literal G2 unreadable-over-light
  surface — would not darken (`GLASS-tokens-model.md:80-84` C2; cross-walked to W55 RED witness 2). The dock
  SHELL is a second hand-rolled glass material (`GLASS-tokens-model.md:24-32` — duplicated `::after` grain, an
  inline-box-shadow rim vs the unified `::after` ring), carved out "by design" since AV.W15.

The keyframes I.W6 finding (19 dock/Button specular tracks bloom where Card is clean) is the SAME class one
level up — the specular layer is wired per-recipe (`.glass-card::before`, `.dock-icon-button`,
`.glass-specular-track`, `.btn-glass`) rather than from one model. The specular-discipline unification rides the
dock band (W45/DK2 owns the dock-control surfaces; W54 confirms the default-register intent) — W54 does NOT
re-author the dock specular here, it reconciles the dock BACKGROUND onto the tint seam so W55 can reach it.

### FileBounds ABSORPTION (the body's §FileBounds table is EXTENDED by these rows)

| File | Edit |
|------|------|
| `src/components/custom/tabs/SegmentedTabs.vue` | **RECONCILE the flagship opaque tab surfaces onto the glass model.** `:448` `.segmented-tabs { background: var(--muted-medium) }` → the glass track (a glass tier rung / a `--glass-level`-driven wash-or-quiet surface, NOT an opaque `--muted-medium` plate); `:462` `.segmented-indicator { background: var(--background) }` → the glass slider (the active indicator reads as a glass tile over the track — the keyframes-dock-selected model the user names, NOT an opaque `--background` solid). KEEP the AX.W53 spring-slider geometry + the volume-preserving squish UNTOUCHED — the SURFACE moves onto glass, the indicator MOTION does not change. Re-run `proof:tabs-unified` to confirm the geometry contract survives the surface re-point. |
| `src/components/ui/tabs/TabsIndicator.vue` | **`:19`** `bg-secondary/80` → the glass tier (the underline/slider indicator reads glass over the tab strip, one model with SegmentedTabs). The `rounded-pill` + the `--spring-snappy` transition stay. |
| `src/components/ui/alert/index.ts` | **`:12-26`** — every variant is `bg-card` opaque. RE-POINT the `default` variant onto a glass tier rung (a content panel = a glass surface under MAXIMAL); KEEP the AW.W25 semantic-tone parity (the success/warning/info border/glyph/description toning rides ON the glass surface, not a re-faked solid plate); the body text stays `--card-foreground` for legibility (W55 carries the over-light legibility). The opaque escape (`.glass-opaque`) is available for a dense/forced-colors alert. |
| `src/components/ui/tags-input/TagsInput.vue` | **`:18`** `bg-background` → the SAME `.input-pill` glass family its form-atom siblings (Input/Textarea/NumberField) compose — close the surface-migration sibling-miss so the form atoms are one register. (This rides the `.input-pill` real-glass fix below — TagsInput inherits the fixed pill, it does not fork a new recipe.) |
| `src/styles/glass.css` | **EXTEND the body's glass.css bounds:** RE-POINT `.input-pill` (`:520-543`) off the `blur(1px)` `--glass-blur-wash` onto the REAL-glass register — the level-scaled wash radius (so the level knob clarifies it) OR a quiet-tier re-point, so the form-pill reads as glass not a 1px-frosted plate; the `--surface-tint-15` border moves onto the glass tint seam (one tint axis, not the srgb `--surface-tint-*` fork). Line-region-disjoint from the body's a11y-bracket region (`:730-757`) + the new `.glass-opaque` rule — the orchestrator serializes by line-region. |
| `src/styles/tokens.css` | **EXTEND the body's tokens.css bounds:** WRAP `--glass-bg-dock` (`:774`) in the `color-mix(in oklab, var(--glass-bg-dock), var(--glass-tint-source) var(--glass-tint-strength))` tint wrapper the five rungs use (ZERO-delta at `--glass-tint-strength: 0%`, so byte-identical at HEAD) — so the dock background rides the SAME oklab tint seam + so W55's adaptive darken can reach the dock (the G2 over-light fix W55 owns; W54 lays the seam, W55 lifts the strength). W54 does NOT touch `--glass-tint-strength` (W55's) — it only routes the dock bg THROUGH the wrapper. The `--glass-level` thread (the body) already reaches `--glass-bg-dock`; this amendment adds the oklab tint wrapper on the same line. |

**The fully-opaque atoms that STAY opaque (the legibility allowlist — NOT a divergence).** Per the census
(`GLASS-ui-components.md:72-73`): `avatar`, `label`, `separator`, `skeleton`, `table`/`data-table` rows (dense
data — W54's own opaque-escape case). These are LEGITIMATELY solid and are the named allowlist the
`proof:glass-one-model` gate exempts. Badge stays a solid pill (R1 — pills stay rounded + Badge/Toast is the
loud-saturated-plate register, the deliberate counterpoint to the content-band glass surfaces); the "glass badge
variant" the census flags as a gap is NOT W54 scope (a future opt-in variant, not the default-register flip).

### The G-1 gate clause — `proof:glass-one-model` (NEW; folds into `proof:glass-level`)

G-1 of the GOLDEN done-definition (`GOLDEN.md:29`, `GOLDEN-criteria.md:22`) is the machine-lock this amendment
exists to satisfy: **glass cohesion is MEASURED, not asserted.** Add to the W54 gate (either a standalone
`proof:glass-one-model.mjs` or a fold into `proof-glass-level.mjs` — register `proof:glass-one-model` in
`package.json` either way; it is the named G-1 falsifier):

- **No solid chrome/content surface without the glass tier or the named escape.** Assert NO `ui/` chrome-or-
  content surface paints a solid `bg-{card,background,muted,secondary,primary}` (or the CSS `background:
  var(--{muted-medium,background,card})` equivalent in an SFC `<style>`) WITHOUT routing through the glass tier
  (the `--glass-level`-driven `--glass-bg-*` recipe / a `.glass-*` ladder class) OR the named `.glass-opaque`
  escape. **Born-RED at HEAD** on the four named sites (`SegmentedTabs.vue:448,462`; `TabsIndicator.vue:19`;
  `alert/index.ts:12-26`; `TagsInput.vue:18`).
- **The legibility allowlist.** EXEMPT the legitimately-opaque atoms — `avatar`, `label`, `separator`,
  `skeleton`, `table`/`data-table`, and Badge's solid-pill register — by an explicit allowlist constant (the
  same shape `proof:tabs-unified` uses for the tab family). A future component re-introducing a solid chrome
  surface OUTSIDE the allowlist REDs the gate (so the census cannot silently regress).
- **One recipe, one knob.** Assert every glass surface class (the 5 rungs, `.glass-card`, `.glass-dock`,
  `.dock-icon-button`, `.glass-btn`, `.input-pill`, and the re-pointed SegmentedTabs/Tabs/Alert surfaces)
  composes the `--glass-level`-driven `--glass-bg-*` recipe + the oklab tint wrapper (NO surface reads
  `--surface-tint-*` or an inline `[backdrop-filter:…]` OFF the `--glass-bg-*` recipe). The `.input-pill`
  `blur(1px)` and the `--glass-bg-dock` flat-srgb are the two born-RED divergences this asserts away.

This is the same role `proof:tabs-unified` plays for the tab family — it locks the census so a future surface
cannot re-introduce a divergent glass recipe. The π live arm (the body's `proof:glass-level` live arm)
additionally reads a mounted SegmentedTabs / Alert / TagsInput's `getComputedStyle().backdropFilter` and asserts
it is a glass blur (NOT `none`) over its rich backdrop — the VISUAL-TRUTH half (a source gate alone is the
cardinal-lesson trap).

### W56(R1) squircle COUPLING — land in the SAME batch (Batch 1)

The glass-default flip and the squircle hinge are ONE surface decision (`GOLDEN.md:68-69` — "Couple W56(R1)
squircle in the same batch (the glass+squircle hinges are one surface decision)"). When W54 makes the
dialog/sheet/panel/hero surfaces glass-default, W56's R1 squircle (`MASTER-PLAN.md:59` — USER-DECIDED: extend
the superellipse to dialogs + sheets + panels + glass hero cards + where befitting; cards + pills STAY rounded)
must land on the SAME surfaces in the SAME batch — NOT as two passes that each re-touch `rounded-dialog`
(`theme.css:47`, a plain `border-radius` today, no `corner-shape`) / SheetContent. The squircle rides the
`@supports (corner-shape: superellipse(2))` guard the big-dock already uses (`dock.css:637`); the glass-default
surfaces inherit the W56 corner vocabulary (the body's §KEEP `:224`) — but that vocabulary must EXIST on
dialog/sheet/panel before W54's glass-default surfaces can inherit it. The two hinges are coupled and currently
BOTH un-landed for these surfaces (`GLASS-ui-components.md:C9`). **Coordination:** W54 authors NO `corner-shape`
edit (W56 owns the corner axis — the body's §Disjointness vs W56 holds); the COUPLING is a batch-sequencing
clause — the orchestrator lands W54 (glass-default) + W56(R1) (squircle) on dialog/sheet/panel/hero in Batch 1
together, so the glass-first + squircle surfaces arrive as one coherent re-skin, not two re-touches.

### Amended disjointness + triumvirate notes

- **The SegmentedTabs surface re-point COORDINATES with `proof:tabs-unified` (AX.W53's gate)** — W54 moves the
  SURFACE onto glass, NOT the MOTION; the W53 spring-slider geometry + volume-preserving squish are OUT of
  bounds. If the surface re-point REDs `proof:tabs-unified` (the surface change desyncing the geometry contract),
  that is a Class-2 non-local gate failure → triumvirate (do NOT relax the W53 contract to pass W54).
- **The dock-bg oklab tint wrapper COORDINATES with W55** — W54 lays the seam (routes `--glass-bg-dock` through
  the oklab wrapper at zero-delta); W55 lifts `--glass-tint-strength` so the dock darkens over light. W54 does
  NOT touch the tint STRENGTH (the body's §KEEP `:228-230` + §Disjointness vs W55 hold) — only the WRAPPER.
- **The dock specular-discipline unification is OUT of W54's bounds** (the dock band / DK2 owns the dock-control
  specular recipes; the I.W6 19-track bloom clears there). W54 reconciles the dock BACKGROUND onto the tint seam
  ONLY. A need to re-author the dock specular `::before` → Class-2 out-of-FileBounds → triumvirate.
- **Open question (RATIFY).** The SegmentedTabs glass-track TIER (wash vs quiet) and the Alert glass TIER
  (wash content-panel vs quiet) are ratify-before-impl hinges — take the recorded default (SegmentedTabs track =
  wash, the active indicator = quiet so it reads forward of the track; Alert = wash content-panel) and verify
  LIVE that the tab indicator reads forward of the track + the alert reads legible over the existing backdrops,
  do NOT self-ratify a divergent tier.
