# PROTO-maximal-glass — red-team + SOTA design-prototype for MAXIMAL glass-first that stays LEGIBLE

**Lane** hardening / adversarial red-team · **Target** the USER-DECIDED MAXIMAL glass-first hinge
(`MASTER-PLAN.md:58` R3) carried by W54 (glass-first-class ROOT) + W55 (adaptive-glass legibility).
**Verdict** WEAK — the W54+W55 pair is the right *direction* but ships THREE load-bearing
incoherences that, unaddressed, make the maximal-glass default either illegible (the SOTA's own
documented failure) or technically non-byte-identical (the W54 algebra), plus a chronic
under-scoping of "EVERY surface." **Date** 2026-06-09. **HEAD** ~89edffc, 3.8.0 published.

The deliverable: (1) the SOTA recipe for every-surface-glass-but-legible, source-grounded;
(2) the three falsifiable challenges that break the current W54/W55 spec; (3) the gestalt
hardening actions to PERFECT the pair.

---

## 0. The single most important SOTA fact the maximal-glass decision must reckon with

**The SOTA reference Apple itself, at its LATEST revision (WWDC 2026 / iOS 27, announced
2026-06-08 — the day before this audit), walked AWAY from "content on glass."** Two
independently-sourced facts:

1. **iOS 27 added a user transparency SLIDER (opaque ↔ clear), not more glass** — the headline
   legibility fix is *user-controlled opacity*, the continuous form of the iOS-26.2 Clear↔Tinted
   choice ([MacRumors 2026-06-08](https://www.macrumors.com/2026/06/08/apple-announces-liquid-glass-improvements/),
   [TweakTown](https://www.tweaktown.com/news/112090/)). The arc is iOS-26 maximally-clear →
   26.2 Clear/Tinted → 27 user-slider-toward-opaque. Apple's own trajectory is glass-LESS by
   default, opacity user-reachable.
2. **"Text always remains on solid layers, never directly on glass"** is the reaffirmed iOS
   accessibility rule (the iOS-27 readability summary). NN/g's teardown
   ([nngroup.com/articles/liquid-glass](https://www.nngroup.com/articles/liquid-glass/)) is
   blunt: *"Text on top of images is a bad idea because the contrast between the text and the
   background is often too low"*; deciphering *"one line of text written across another"* is
   *"illegible — it's also ugly."*

**Why this matters for the AX decision.** R3 (`MASTER-PLAN.md:58`) reads *"MAXIMAL — everything
glass … containers, chrome, buttons, AND content panels."* The W54 spec then explicitly records
(`AX.W54:258-267`) that it is **SUPERSEDING** the two-layer law (glass=chrome, content=opaque) on
the strength of "W55 carries the legibility." **The SOTA, as of literally the day before this
audit, does the OPPOSITE of that supersede** — it keeps text off glass and hands the user an
opacity slider. The W54 spec cites WWDC25 sess. 219; it has not been re-grounded against the
iOS-26.2→27 walk-back the SAME research corpus documents (`R-ios27:63-78`). The maximal-glass
decision is sound as a *brand identity* (glass-ui can choose to be glassier than iOS), but the
spec's framing — "this is the SOTA, two-layer is superseded" — is **factually inverted**. The
honest framing: *glass-ui is choosing a MORE aggressive glass register than current iOS, and W55
must therefore carry MORE legibility load than Apple's own system does* — which raises, not
lowers, the bar on W55.

This is not a reason to abandon MAXIMAL. It is the reason the legibility recipe below must be
**bulletproof**, because glass-ui is deliberately going past where Apple retreated.

---

## 1. The SOTA recipe — every surface glass AND legible (the concrete floors)

Distilled from R-ios27 + the 2026 glassmorphism-2.0 corpus + the iOS-27 walk-back. The recipe
glass-ui must hit, expressed in its existing token idiom:

### 1.1 The two-tier discipline glass-ui CANNOT escape (even at MAXIMAL)

The SOTA's hard rule, restated for a glass-everything system: **a glass surface may sit over a
rich background, but the READABLE CONTENT (body text, control labels, data) must sit over a
LOCAL legibility floor, not over raw glass-over-busy-backdrop.** Apple does this with the
*"locally darken the glass ONLY where the text exists"* scrim (`R-ios27:39-44`). The 2026 CSS
guidance is identical: *"never place text directly on a 10% opacity background; add a semi-opaque
film (~30% opacity) behind the text itself to dampen background noise"* (glassmorphism-2.0).

**The recipe for glass-ui:** the maximal-glass default is fine for the SURFACE (the card, the
dock, the button plate all glass). But the moment that surface bears reading-critical content
over a busy backdrop, a **local content-floor** must kick in. This is NOT the same as W55's
surface-darken — it is a per-text-region floor. glass-ui's existing `[data-over-content="text"]`
under-shadow modifier (`glass.css:~289`) is the *seed* of this but it only swaps a shadow rung; it
does not raise a legibility film. **The recipe needs a content-region tint floor, and neither W54
nor W55 ships one** (see Challenge 1).

### 1.2 The backdrop-luminance bucket (W55's core) — correct shape, under-scoped fan-out

The web-SOTA is a DECLARATIVE bucket (`--glass-backdrop: light`) read via `@container style()`,
because there is no web API that samples pixels behind a `backdrop-filter` element
(`R-ios27:84-95`). Confirmed correct. The bright bucket:
- lifts `--glass-tint-strength` to a bounded AA floor (≤18–24%) — keeps the surface translucent;
- re-points `--glass-tint-source` to a low-luminance warm-ink via the EXISTING
  `color-mix(in oklab, <bg>, var(--glass-tint-source) var(--glass-tint-strength))` seam — ZERO
  new compositing seam (the seam already exists at `glass.css:220,240,251,267,278,380`);
- `contrast-color()` (`@supports`-gated, Chrome 147+/Safari 26+) flips the foreground ink.

### 1.3 The numeric floors (the concrete recipe W55 must clamp to)

| Axis | Floor | Source |
|---|---|---|
| Body-text contrast over the resolved glass plate | **≥ 4.5:1** | WCAG AA / Apple clamp (`R-ios27:46-49`) |
| Large-text / icon contrast | **≥ 3:1** | WCAG AA-large |
| Bright-bucket tint-strength ceiling (translucency floor) | **≤ 24%** | "let content through" (`R-ios27:108-110`) |
| Tint mix space | **oklab** | house tint space (`tokens.css §tint`) |
| User opacity escape | **opacity-up via `--glass-level` / `prefers-contrast`** | iOS-27 slider analog |

### 1.4 The user-reachable opacity escape (the iOS-27 slider — the MISSING consumer affordance)

iOS-27's headline fix is a USER slider. glass-ui's analog is `--glass-level` (W54) +
`prefers-contrast`. **But there is no shipped CONSUMER control** that exposes `--glass-level` to
an end user (the dock has `DockBackgroundToggle` for motion-pause; nothing for glass-opacity).
The maximal-glass default with no user opacity escape is exactly the iOS-26 launch state the
industry panned. **A `--glass-level` slider/toggle in the dock is the missing affordance** —
the iOS-27 move, absent from both specs (see Hardening Action 4).

---

## 2. The falsifiable CHALLENGES (each breaks the current spec, source-grounded)

### CHALLENGE 1 — glass-on-glass-on-glass: the MAXIMAL default + Q4/Q7 "glass CARDS" produce a stack the SOTA forbids, and neither wave floors it. (INCOHERENT)

Pass-3 Q4 (`USER-DEFECTS pass3:29`) wants pages *"STRUCTURED within a GLASS CONTAINER"*; Q7
(`:32`) wants items *"contain[ed] in GLASS CARDS"*; Q9 (`:34`) wants the *hero CARD itself …
GLASSY over the full-page aurora.* Compose that with W54's MAXIMAL flip (buttons glass, panels
glass) and the page-redesign (W60) rich backgrounds, and the **literal render is: glass page
container → glass story card → glass button/panel → text**, all translucent, all over an aurora.
That is **three stacked glass layers over a busy backdrop** — the exact *"glass-on-glass
legibility"* case the two-layer law exists to prevent (`AX.W54:261`, R-glass-default §two-layer),
and the precise thing NN/g calls *"illegible"* and iOS-27 retreated from (§0).

- **The break:** W54's gate (`AX.W54:444-466`) asserts a bare `<Button>` *resolves glass* and the
  `--glass-level` knob *works*. It NEVER asserts a glass-button-on-a-glass-card-on-an-aurora
  clears 4.5:1. W55's gate (`AX.W55:469-480`) tests a `.glass-card` + a `.glass-dock` + ONE rung
  over white — it tests a SINGLE glass layer over a synthetic backdrop, **never a nested glass
  stack.** The compositional case the user's own Q4/Q7/Q9 asks create is **untested by either
  gate.**
- **Why it's load-bearing:** `color-mix` opacity does not compose linearly through stacked
  `backdrop-filter` layers — a 65%-card under a 42%-button is not "107% opaque"; each
  `backdrop-filter` re-samples the ALREADY-composited layer below, and blur stacks multiplicatively
  in cost while contrast degrades super-linearly. W55's per-surface bucket darken assumes ONE
  surface over the backdrop; it has no model for "this glass surface's backdrop is ANOTHER glass
  surface."
- **Falsifiable:** mount `<Card tier="resting"><Button variant="glass">Go</Button></Card>` over
  `/substrates/aurora` bright preset, light mode, and measure the button-label contrast. The spec
  predicts no gate catches a sub-4.5:1 result. The recipe (§1.1) says the INNER content needs a
  local floor the system does not provide.

### CHALLENGE 2 — W54's `1-(1-α)*level` byte-identity claim is FALSE against the real seam, and the prefers-contrast collapse is lossy. (BROKEN)

W54 (`AX.W54:154,288`) claims it threads `--glass-level` through the opacity color-mix as
`color-mix(in srgb, var(--card) calc((1 - (1 - <rung-opacity>) * var(--glass-level)) * 100%), transparent)`
and asserts `level=1` is **byte-identical** (the headline no-op guarantee, gated at `:435-437`).
Two source-confirmed problems:

1. **The real seam is `calc(var(--glass-opacity-resting) * 100%)`** (`tokens.css:769-775`,
   confirmed by grep), feeding NAMED rung tokens (`--glass-opacity-resting: 0.65`). To thread the
   level, the implementer must INLINE each literal into the new algebra
   (`1 - (1 - 0.65) * var(--glass-level)`) — which **deletes the named `--glass-opacity-*` tokens
   as the source of truth.** Those tokens are *also read by the a11y brackets*
   (`glass.css:730-746` sets `--glass-opacity-resting: 1`) and the `@supports` fallback. So the
   "ONE calc site, zero fan-out" claim (`AX.W54:144-146`) is false: the named tokens are read in
   ≥3 places, and inlining the algebra at the bg site orphans the bracket overrides. Either the
   brackets keep clobbering `--glass-opacity-*` (and the level path does NOT collapse them, the
   stated win evaporates) OR the brackets switch to `--glass-level` and the per-rung opacity tokens
   become dead. The spec wants both and gets neither cleanly.

2. **The prefers-contrast collapse is mathematically lossy.** Current `prefers-contrast: more`
   (`glass.css:749-756`) sets a PER-RUNG curve: wash 0.85, quiet 0.90, resting 0.94, floating
   0.98, overlay 1.0. W54 (`:289,448`) replaces all five with ONE `--glass-level: 0.3`. Run the
   algebra: `1-(1-0.65)*0.3 = 0.895` for resting — but the current value is **0.94**. A single
   scalar **cannot reproduce a 5-point per-rung curve** (the rungs have different baseline α, so a
   uniform scalar produces a different curve shape). The collapse is a behavior CHANGE dressed as a
   refactor — it makes high-contrast users' surfaces LESS opaque than today (0.895 < 0.94), the
   wrong direction for a *contrast* preference.

- **The break:** W54's own gate asserts byte-identity at `level=1` AND asserts the brackets "ride
  the ONE level path." Both cannot hold: byte-identity requires the named tokens stay; the bracket
  collapse requires they go. And the prefers-contrast scalar **regresses** the high-contrast curve.
- **Falsifiable:** compute the resolved `--glass-opacity-resting` under `prefers-contrast: more`
  before (0.94) and after (0.895) the W54 collapse. They differ. The gate at `:448` ("rides
  `--glass-level`") passes while the actual contrast for the a11y user DROPS — a green gate over a
  real regression, the exact AW class this tranche exists to kill.

### CHALLENGE 3 — "flip the default register to glass for EVERY band" is scoped to ONE file (Button); the 41 solid-surface sites + the form atoms are unaddressed. (DEFERRED-CHRONIC under-scope)

W54's charter is MAXIMAL — *"the default for ALL items is their glass variants"* (`pass3:13`).
Its FileBounds (`AX.W54:290-294`) touch exactly: `button/index.ts`, `Card.vue`,
`DialogContent.vue`. The spec then hand-waves (`:204-206`): *"confirm every CONTAINER/CHROME
default … resolves glass."*

- **Source reality:** `grep` finds **41 sites** carrying `bg-popover/bg-card/bg-background/
  bg-muted/bg-secondary` across `separator, toast, number-field, carousel-pager, tags-input,
  dialog, switch, command, input` (and more). The chrome/overlay surfaces (popover, dropdown,
  select, tooltip, command) ALREADY default `glass-floating` (good) — but the FORM ATOMS
  (`Input`, `Switch`, `NumberFieldInput`, `TagsInput`, `Toast`) are SOLID, and **the spec never
  decides whether a maximal-glass default makes them glass.** A glass `<Input>` over a busy
  backdrop is a real legibility question (typed text over translucent-over-aurora); the spec
  leaves it as an unscoped "confirm."
- **The chronic class:** this is the *visual-load-bearing-ness / overfitting-audit* slip pattern —
  a wave whose charter is "EVERYWHERE" but whose FileBounds is "the three files I named." Q4/Q7
  ("ALL pages," "ALL items") will surface every un-flipped atom the moment W60 wraps pages in
  glass, and the page-redesign is BLOCKED on W54 (`MASTER-PLAN:29`). So the under-scope is a
  predecessor defect that will re-open W54 mid-W60.
- **Falsifiable:** after W54 lands as specced, `grep -rn "bg-background\|bg-card\|bg-muted"
  src/components/ui` still returns ~30+ solid atoms. The MAXIMAL charter is not met; only Button
  flipped.

---

## 3. The CHRONIC deferrals (slip history)

- **Q3 hover "reads on hover" — slipped W52 → W54, will slip again.** W52 shipped headless-green
  with `--scale-hover-btn: 1.035`; the next live pass (Q3, `pass3:28`) found it imperceptible. W54
  folds the re-tune (`:211-218`) to ≈1.045–1.05. **A 1.5% scale delta is STILL sub-perceptible**
  (the JND for scale is ~5–8%); the spec admits the glass surface's hover must ALSO wake the
  specular + cross-fade bg/border, but the GATE (`:451`) only asserts `--scale-hover-btn ≥ 1.045`
  — a number, not the composite perceptibility. This is the **headless-green-over-imperceptible**
  recurrence the cardinal lesson names, re-armed: W54's gate will go green on 1.045 and the next
  live pass can again find the hover dead. The fix is a perceptual-floor live assertion, not a
  scalar bump (Hardening 3).

- **No `audit/visual/` DELTA captures — the cardinal lesson's own enforcement is itself deferred.**
  `MASTER-PLAN:52` flags *"No audit/visual/ captures — institute the screenshot discipline."* The
  W54/W55 specs both MANDATE a paired-π BEFORE/AFTER DELTA (`W54-DELTA.md`, `W55-DELTA.md`) as the
  binding close — but the directory `docs/tranches/AX/audit/visual/` exists (untracked, per git
  status) with no W54/W55 captures, and there is **no running dev server** at audit time
  (`localhost:5173` → no-server). Every "live-verified" mark in this band is currently
  un-capturable. The discipline is specced but not instituted — the chronic "live-verified without
  a captured delta" inflation.

- **W55 dock-seam thread fan-out under-counted (slipped from "five rungs" to "five rungs + dock"
  to … more).** W55 (`:54-66`) headlines that the DOCK is OFF the tint seam — correct. But `grep`
  finds MORE off-seam glass-derived surfaces: `glass.css:413` (`.glass-pane`?), `:532`, `:579`
  (destructive glass) all read `var(--glass-bg-*)` raw, WITHOUT the `color-mix(in oklab, …, tint)`
  wrapper. W55's FileBounds names the dock shell/chassis/tiers but not these. The "ALL glass
  families read ONE adaptive seam" claim (`:176`) is already incomplete at spec time — the fan-out
  is wider than the dock, and each missed surface is a silent G2-over-light hole.

---

## 4. The gestalt HARDENING ACTIONS (to PERFECT the maximal-glass pair)

1. **Add a W54.5 / W55-amend: the LOCAL content-floor for nested glass (Challenge 1 fix).** Mint a
   `--glass-content-floor` axis: any glass surface bearing reading-critical content gets a
   text-region semi-opaque film (the SOTA "~30% film behind the text" / Apple "locally darken where
   text exists"). Wire it as a `.glass-content` utility or a `[data-content="text"]` modifier that
   raises a LOCAL `color-mix` floor on the inner region (not the whole plate). Then add a NESTED-
   STACK gate case: a glass-button-in-glass-card-over-aurora must clear 4.5:1 on the label. This is
   the ONE-model fix — content legibility floored at the content region, surface glass everywhere
   else. Without it, MAXIMAL + Q4/Q7/Q9 ships the illegible stack.

2. **Re-ground the W54 algebra: keep `--glass-opacity-*` as the source of truth, thread the level
   as a SEPARATE multiplier token, drop the byte-identity-via-inlining claim (Challenge 2 fix).**
   Instead of inlining literals into `1-(1-α)*level` (which orphans the named tokens), make the
   level a multiplier the bg-mix reads ALONGSIDE the named token:
   `--glass-opacity-resting-eff: calc(1 - (1 - var(--glass-opacity-resting)) * var(--glass-level))`,
   keeping `--glass-opacity-resting` as the editable source AND giving the a11y brackets their
   per-rung control back. Then the prefers-contrast bracket keeps its 5-point curve (NOT a lossy
   single 0.3 scalar) — the level path is for the DESIGN knob + the opaque escape, the per-rung
   bracket curve stays for the a11y user (two axes, not a forced collapse). This kills the
   byte-identity contradiction AND the high-contrast regression.

3. **Replace the Q3 hover scalar-gate with a perceptual-FLOOR live assertion (chronic fix).** The
   gate must assert the COMPOSITE hover delta (scale × specular-intensity × bg/border ΔE) exceeds a
   perceptibility floor in a live readback, NOT `--scale-hover-btn ≥ 1.045`. Run a prototype:
   capture rest vs hover screenshots of a glass button over aurora, compute the pixel-ΔE; require
   it exceed a JND threshold. This is the only thing that stops Q3 slipping a third time.

4. **Ship the iOS-27 user opacity escape — a `--glass-level` consumer control (the missing
   affordance).** Add a dock/settings glass-clarity slider (or a 3-step toggle clear/regular/solid)
   bound to `--glass-level` on `:root`, mirroring `DockBackgroundToggle`'s pattern. This is the
   iOS-27 headline move and the honest answer to "maximal glass but the user can dial it back" —
   without it, glass-ui is shipping the iOS-26 launch state the whole industry rejected.

5. **Scope-true the "EVERY band" flip: enumerate the 41 solid sites, decide per-family, gate the
   decision (Challenge 3 fix).** W54 must enumerate every `bg-{card,background,muted,secondary}`
   atom and record a PER-FAMILY decision (form atoms: glass or solid? — the legibility-of-typed-
   text-over-glass call). The gate asserts the enumerated set, not just Button. This converts the
   "confirm chrome defaults" hand-wave into a closed ledger, so W60 cannot re-open W54.

6. **Run the NESTED-STACK + busy-backdrop prototype BEFORE W54 lands (the de-risk probe).** Stand
   up `localhost:5173`, mount the worst case (glass page → glass card → glass button + glass input,
   over the brightest aurora + the fourier field), in light AND dark, and measure every reading-
   critical contrast. This is the single highest-value de-risk: it either confirms the maximal
   default + W55 floor holds, or it surfaces the local-content-floor need (Action 1) BEFORE the
   page-redesign consumes a broken foundation. The deliverable's recipe (§1) predicts it will need
   Action 1; the prototype settles it empirically.

---

## 5. Glass-cohesion verdict (under MAXIMAL glass-first)

**The ONE-model gap:** the maximal-glass default has THREE divergent legibility models fighting,
not one. (a) The SURFACE-darken model (W55 per-surface bucket) — handles ONE glass layer over a
busy backdrop. (b) The under-shadow `[data-over-content]` modifier (`glass.css:~289`) — a shadow
swap, not a contrast floor. (c) The absent CONTENT-region floor — the thing the SOTA actually uses
and the thing nested glass needs. A perfected maximal-glass system has ONE composable legibility
model: *surface = glass everywhere; reading-content = floored locally; user = can dial `--glass-
level`.* W54+W55 ship (a) and gesture at (b); (c) and the user-level control are absent. Until the
content-floor + the user-level escape land, "everything glass" is not yet "everything glass AND
legible" — it is "everything glass and gated only at the single-surface case the spec happened to
test."

**Sources:**
[MacRumors — Liquid Glass improvements WWDC 2026](https://www.macrumors.com/2026/06/08/apple-announces-liquid-glass-improvements/) ·
[TweakTown — iOS 27 transparency slider](https://www.tweaktown.com/news/112090/) ·
[Nielsen Norman Group — Liquid Glass Is Cracked](https://www.nngroup.com/articles/liquid-glass/) ·
[Glassmorphism 2.0 CSS techniques 2026](https://weblogtrips.com/technology/glassmorphism-2-0-css-techniques-2026/) ·
the AX corpus (`R-ios27-adaptive-glass.md`, `A-glass-over-light.md`, `R-glass-default.md`) ·
source seams (`tokens.css:769-775`, `glass.css:220-380,730-756`, `dock.css:146,507`,
`button/index.ts:26,81`).
