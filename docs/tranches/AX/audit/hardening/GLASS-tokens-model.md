# Hardening red-team — GLASS-tokens-model

**Lane** GLASS-tokens-model · **Verdict** WEAK · **Date** 2026-06-09 · HEAD ~89edffc (3.8.0 + convergence)

Challenge target: is the `--glass-*` token model ONE coherent system or N accreted layers?
Sources read in full: `src/styles/tokens.css` (§8 glass block :666-1000, §11b specular :1910-1983, .dark
arm :1685-1849), `src/styles/glass.css` (entire), `src/styles/dock.css` (:75-680 shell/chassis),
`src/styles/dock-controls.css`, `AX.W54-glass-first-class.md`, `AX.W55-adaptive-glass-legibility.md`,
the I.W6 coordination doc, Card.vue / DockIconButton.vue / button/index.ts.

---

## glassCohesion verdict (under MAXIMAL glass-first)

**NOT one model — three divergent glass implementations + two un-landed unifiers.** The library has a
unified `.glass-material` selector group (glass.css:54-62) that SHOULD be the single source — the 5
ladder rungs + `.glass-card` + `.dock-icon-button` share the specular `::before`, the grain `::after`,
the `--glass-material-rim`, and the `color-mix(in oklab, …, --glass-tint-source …)` tint wrapper. But
THREE surfaces diverge from it:

1. **The dock SHELL (`.glass-dock`) is OUT of the unified group BY DESIGN** (glass.css:46-50 says so
   explicitly: "hand-rolls a parallel surface … the dock arm owns"). It carries:
   - its rim as `--glass-edge-light` directly in `box-shadow` (dock.css:152), NOT the unified
     `--glass-material-rim` `::after` ring;
   - its own `::after` grain (dock.css:439-450) duplicating the `.glass-material::after` recipe
     (glass.css:321-336) byte-for-byte — same `--paper-clean-texture`, same `mix-blend-mode: overlay`,
     same `.dark` → `soft-light` flip (dock.css:452 vs glass.css:360);
   - a FLAT `background: var(--glass-bg-dock)` (dock.css:146) — NO `color-mix(in oklab, …,
     --glass-tint-source …)` wrapper, so the dock CANNOT receive the adaptive tint the 5 rungs do;
   - NO moving-specular `::before` on the shell (only its control `.dock-icon-button` has one).
   This is a SECOND, parallel glass implementation maintained by hand. Two grain `::after` recipes,
   two rim wirings, two `.dark` blend flips — any change to the material must be made twice.

2. **`.glass-card` diverges from its OWN opacity peer.** It composes `--glass-bg-quiet` (0.50α) +
   `--glass-blur-quiet` (glass.css:380-381) — identical material to `.glass-quiet` — but its box-shadow
   is `--glass-material-rim, --card-focus-shadow` (= `--shadow-card` = `--shadow-md`), WITHOUT the
   `--glass-under-shadow-quiet` "glass thickness" hairline that `.glass-quiet` carries (glass.css:245).
   So the Card surface and the quiet rung are the same TINT/BLUR but a different ELEVATION floor. The
   under-shadow ("0.5px dark hairline = glass thickness", the iOS rim) is present on quiet/resting/
   floating but ABSENT on wash, overlay, AND card — an inconsistent "glass thickness" story across the
   ladder that is documented as a SLIM-retention decision (glass.css:235-237) but reads, under MAXIMAL
   glass-first where Card is now a default glass surface, as a cohesion gap.

3. **The specular HOVER/ACTIVE bloom is wired-by-default on dock+button but opt-in-OFF on Card** — the
   I.W6 finding, CONFIRMED at source. The rest intensity is uniformly 0 (tokens.css:1973, good). But
   the hover/active bloom (0.10/0.16, tokens.css:1974-1975) fires on every surface in the
   `.glass-material:hover::before` group (glass.css:172-193) — INCLUDING `.glass-wash` (which the glass
   `<Button>` composes, button/index.ts:61) and `.dock-icon-button` / `.glass-specular-track` (which
   DockIconButton ALWAYS attaches, DockIconButton.vue:40 + ALWAYS wires `useSpecularTracking`,
   :53). Meanwhile `<Card>` gates the whole pointer write behind `specularArmed = surface==='glass'
   && specular !== 'off'` with `specular: 'off'` as the DEFAULT (Card.vue:74,84-85), so a default Card
   neither blooms nor even wires the pointer move. The keyframes I.W6 assay measured exactly this: "the
   stage cards are now clean (0 specular tracks) … BUT 19 dock/Button specular tracks still bloom." The
   ONE-model gap: there is no single rest-AND-hover specular discipline; Card got the default-off
   treatment (W52), Button + dock did not.

**The ONE-model gap, stated plainly:** glass-ui has the SCAFFOLDING for one model (the unified
`.glass-material` group) but ships THREE conformance classes — the 5 rungs (full conformance), Card
(conforms on tint/specular-group membership, diverges on under-shadow + is opt-in-off on hover-bloom),
and the dock shell (a fully parallel hand-rolled material, off the tint seam entirely). The two waves
meant to UNIFY this (W54 single `--glass-level` knob; W55 adaptive tint reaching the dock) are BOTH
un-landed SPEC. So at HEAD the "single glass knob" and the "adaptive tint on every family" do not
exist; the cohesion the user demanded (MAXIMAL glass-first, ONE model) is planned, not shipped.

---

## CHALLENGES that found a weakness (each falsifiable, source-grounded)

- **C1 — The single glass knob does not exist; the opacity and blur ladders are still two un-related
  10-rung literal families.** `grep -rn "glass-level" src/` = ZERO (re-run, confirmed). The opacity
  rungs (`--glass-opacity-{wash..overlay}` 0.30/0.50/0.65/0.80/0.95, tokens.css:681-685) and the blur
  radii (`--glass-blur-*-radius` 1/10/12/16/15px, :692-709) are independent literals with no scalar
  relating clarity to diffusion. W54 (the wave that mints `--glass-level`) is "planned (spec authored)"
  in PROGRESS.md:72. So the SOTA "one Clear↔Regular knob" is a spec, not a fact.

- **C2 — The adaptive tint seam is a zero-delta no-op AND the dock — the literal G2 victim — bypasses
  it entirely.** `--glass-tint-strength: 0%` (tokens.css:839) makes `color-mix(in oklab, <bg>,
  --glass-tint-source 0%)` byte-identical to the un-tinted rung on all 5 rungs + Card. The dock shell
  (dock.css:146), chassis (:675), and floating/expanded tiers (:507,767,780) read a FLAT
  `var(--glass-bg-dock)` / `var(--glass-bg-chassis)` with NO oklab tint wrapper — so even if a consumer
  lifted `--glass-tint-strength`, the dock would not darken. `grep -rn "glass-backdrop\|contrast-color"
  src/` = ZERO. W55 (the wave that threads the tint onto the dock + adds the bright-bucket probe) is
  "planned" (PROGRESS.md:73). The user's named live defect ("glass dock over VERY LIGHT materials is
  unreadable") has NO landed fix at HEAD.

- **C3 — The dock is a maintained-by-hand SECOND glass material, not a tier of the one model.** Two
  grain `::after` recipes (glass.css:321-336 ≈ dock.css:439-450, including the identical `.dark` →
  `soft-light` flip), two rim wirings (the unified `::after` ring vs the dock's inline box-shadow), a
  shell with no `::before` specular vs a control with one. A material fix (e.g. the W52 plus-lighter
  gleam, the under-shadow floor) lands on the unified group and SILENTLY misses the dock shell. This is
  the canonical N-accreted-layers smell: the comment "the dock arm owns" is the justification, but
  under MAXIMAL glass-first the dock is the HERO glass surface and should be the most cohesive, not the
  one carved out.

- **C4 — `.glass-card` and `.glass-quiet` are the same material but a different elevation floor.** Both
  are 0.50α + quiet-blur, but `.glass-quiet` composes `--glass-under-shadow-quiet` (glass.css:245) and
  `.glass-card` does not (glass.css:384 — `--glass-material-rim, --card-focus-shadow` only). The
  under-shadow "glass thickness" hairline is on 3 of the 6 surfaces (quiet/resting/floating), absent on
  wash/overlay/card. There is no single rule "every glass surface carries an under-shadow proportional
  to its tier" — it's a per-rung hand-decision (the SLIM-retention note, glass.css:235-237).

- **C5 — The opacity/tint scalars are NOT `@property`-registered, and the seam W54 wants to thread has
  a documented Houdini hazard.** `grep "@property --glass" src/styles/` = ZERO; the only glass
  `@property` regs are the specular channel (tokens.css:1935-1951). The `--glass-opacity-*` and
  `--glass-tint-strength` are plain `<number>`/`<percentage>` customs — so they cannot interpolate, and
  the planned `--glass-level` thread through the `--glass-bg-*` `color-mix(… calc(<rung>*--glass-level)
  …)` site runs straight into the hazard glass.css:117 already records: "a registered-`@property`
  var() nested in an hsl() alpha computes to 0 in Chromium." W54's gate asserts `level=1` byte-identity
  but the spec does not address whether the `calc()`-in-`color-mix-percent` path is registration-safe.
  This is a falsifiable risk the W54 born-RED ritual MUST prototype before claiming byte-identity.

- **C6 — Three "adaptive/content-aware tint" mechanisms already coexist, none wired to a probe.**
  `--glass-tint-source/-strength` (oklab content-tint, AW.W23, tokens.css:827-839), the
  `[data-over-content="text|solid"]` under-shadow modifier (glass.css:299-318), and
  `--dock-fg-on-aurora` (consumer-push foreground, tokens.css:757) are THREE separate
  "adapt-to-backdrop" axes, all consumer-PUSH, none reading an actual backdrop signal. W55 proposes to
  reconcile them onto ONE `--glass-backdrop` bucket — but until it lands, a consumer facing the
  dock-over-light defect has to know about and hand-set all three. That is the accreted-layers state.

- **C7 — No gate locks cohesion across the three implementations.** `proof:glass-material-unified`,
  `proof:liquid-glass-material`, `proof:glass-material-sota`, `proof:liquid-glass-tokens`,
  `proof:glass-card-tiers` exist (package.json:627-650) but they parse recipe STRUCTURE of the unified
  group. None asserts "the dock shell composes the SAME tint/grain/rim recipe as the rungs" or "the
  hover-specular discipline is identical across Card/Button/dock." The dock's by-design carve-out is
  therefore invisible to the gate fleet — exactly how the I.W6 bloom survived to 3.8.0.

---

## CHRONIC deferrals / misses (with slip-history)

- **The dock-as-parallel-material has been carved out since AV.W15** (glass.css:46-50, AW.W22 unified
  the rungs but explicitly left the dock shell out). The tint-seam-misses-the-dock was re-surfaced as
  W55 RED witness 2 ("the source finding the SOTA lane MISSED") — i.e. even the convergence-2 SOTA
  research lane initially missed it; A-glass-over-light caught it. It is STILL un-landed (W55 planned).
  Slip: AV.W15 → AW.W22 → AW.W23 → AX.W52 → AX.W55-spec — at least 4 waves where the dock stayed off
  the unified material and the tint seam.

- **The specular default-off discipline reached Card at W52 but NOT Button/dock — a clean-break that
  missed sibling surfaces.** W52 made Card opt-in (`specular: 'off'`); Button + DockIconButton kept the
  always-on `glass-specular-track` attach. This is the chronic "clean-break renames/policies that miss
  sibling-consumers" class named in the brief. Caught only by an EXTERNAL consumer (the keyframes I.W6
  assay measuring 19 blooming tracks), not by glass-ui's own gates. Folded into W54 (un-landed).

- **The single-knob (`--glass-level`) has been the recommended unifier since the R-path-glass /
  A-glass-tokens convergence corpus** and is now the FOUNDATIONAL ROOT (R3, MASTER-PLAN). It has not
  landed across the entire AX convergence batch (W44-W61) — it is the blocker the page-redesign
  (Batch 4) waits on, and remains spec-only.

- **The `@property`-register-glass-scalars decision is repeatedly deferred.** tokens.css:1567-1571
  records a deliberate rule NOT to `@property`-register color tokens (descendant re-resolution trap),
  and glass.css:117 records the alpha-nesting hazard — but no wave has decided whether the
  opacity/blur/level scalars CAN be safely registered for interpolation. W54 needs this resolved and
  the spec leaves it open.

---

## HARDENING ACTIONS (gestalt, to PERFECT the one model — PLANNING only)

1. **Add a W54.A cohesion fold: fold the dock SHELL into the one glass model.** Re-point the dock
   shell + chassis + floating/expanded tiers off the flat `var(--glass-bg-dock)` onto the SAME
   `color-mix(in oklab, var(--glass-bg-dock), --glass-tint-source --glass-tint-strength)` wrapper the
   rungs use (zero-delta at 0%), and retire the duplicated `::after` grain (dock.css:439-450) in favour
   of the unified `.glass-material::after`. Keep only the genuinely dock-unique chrome (the morph,
   the instrument-strip). This collapses the second material implementation. Gate it with a NEW
   `proof:glass-dock-on-material` that asserts the dock shell composes the oklab tint + the unified
   grain/rim, REDs if the dock forks a parallel recipe.

2. **Unify the specular hover-discipline: make Button + DockIconButton opt-in-OFF like Card, OR make
   Card always-on like them — ONE policy, recorded in CLAUDE.md.** Given MAXIMAL glass-first wants the
   hover to READ (Q3), the right call is a single `--glass-specular-armed` gate on the unified group
   (rest 0 always; hover/active bloom only where armed), with the SAME default across Card/Button/dock.
   This is the W54 + I.W6 fold; the gate (`proof:glass-level` or a new `proof:specular-discipline`) must
   assert identical hover-specular wiring across all three surface classes. Verify LIVE that the 19
   dock/button tracks clear and the hover still reads (do NOT re-stamp from source — the W52→Q3 lesson).

3. **Mint the under-shadow as a TIER FUNCTION, not a per-rung hand-decision.** Author one rule: every
   glass surface composes an under-shadow proportional to its opacity tier (wash→none, quiet→quiet,
   resting→default, floating/overlay→vivid, card→quiet to match its 0.50α). Bring `.glass-card` and
   `.glass-overlay` onto the ladder so "glass thickness" is monotonic, not a 3-of-6 patchwork.

4. **Prototype the `--glass-level` × `color-mix`-percent × `@property` interaction BEFORE W54 claims
   byte-identity (the C5 hazard).** A 10-line Chromium+Safari π probe: register `@property
   --glass-level`, thread it through one `--glass-bg-*` `calc((1-(1-α)*var(--glass-level))*100%)` site,
   read back the resolved background at level=1/0/1.5 in both engines. If the registered-var-in-percent
   path resolves to 0 (the glass.css:117 class of bug), W54 must thread an UNREGISTERED `--glass-level`
   or restructure the calc. This is a born-RED prerequisite, not a post-hoc check.

5. **Add a cohesion gate that locks the THREE conformance classes onto one.** `proof:glass-one-model`:
   for every glass surface class (the 5 rungs, `.glass-card`, `.glass-dock`, `.dock-icon-button`,
   `.glass-btn`), assert it composes {the oklab tint wrapper, the unified rim source, the unified grain,
   the specular-armed discipline, a tier-correct under-shadow}. REDs on any parallel/hand-rolled
   divergence. This is the machine-lock the I.W6 bloom + the dock-off-the-seam needed and lacked.

6. **Reconcile the three backdrop-adaptive axes onto W55's ONE `--glass-backdrop` bucket in the same
   wave that lands the dock tint thread** — do not ship the bucket on the rungs and leave
   `--dock-fg-on-aurora` as a third fork (the spec already flags this; the hardening action is to gate
   it: `proof:adaptive-glass` must assert NO third foreground path survives).
