# AX.W55 — Adaptive glass legibility: a backdrop-luminance bucket probe that DARKENS the glass over light/busy backdrops to a bounded AA floor — the iOS-26/27 luminance-aware move, the thing that KEEPS the maximal-glass-first default legible

**Band** B · GRAPHICS / glass-IDENTITY · **Severity** blocker (G2 — the user's live defect: "Glass dock over VERY LIGHT materials is unreadable — dynamically darken the glass adaptively. SOTA as of iOS 27?") · **CRITICAL co-blocker of the MAXIMAL glass-first-class decision** (R3: glass is now the DEFAULT for EVERY surface over the rich backgrounds — W55 carries the legibility that makes that maximal default safe; without it the page-redesign waves ship content-on-glass over busy backdrops that collapses to mud)
· **dependsOn** AX.W00 (the π visual-runtime lane — the contrast-readback close machinery), AX.W52 (the corrected `plus-lighter` blend + the `--glass-tint-source`/`--glass-tint-strength` composite seam this wave repoints — W52 is the substrate PREREQUISITE, NOT the owner of the luminance-adaptive behaviour), AX.W54 (glass-first-class — the ROOT; W54 makes glass the default for every surface, W55 is the legibility floor that maximal default leans on; the `--glass-level` master scalar W54 mints is the axis W55's `--glass-clarity` a11y-escape rides — ONE scalar, not two)
· **Charter** USER-DEFECTS pass-2 §G G2 (`docs/tranches/AX/audit/USER-DEFECTS-2026-06-08.md` — "Glass dock over VERY LIGHT materials is unreadable — dynamically darken the glass adaptively. SOTA as of iOS 27?") + pass-3 (`USER-DEFECTS-2026-06-08-pass3.md:46` — "G1/W54 glass-first-class is now the FOUNDATIONAL ROOT wave — Q3/Q4/Q7/Q9 + glass-first … blocked on G1") — the maximal-glass default makes content-on-glass-over-busy-backdrops the COMMON case, which is exactly the G2 collapse at scale
· **Audit** `docs/tranches/AX/audit/convergence2/R-ios27-adaptive-glass.md` (the SOTA side — the iOS-26/27 luminance-switch / local-darken / 4.5:1-clamp / colored-glass-luminance-map recipe + the CSS-platform translation: the `@container style()` declarative bucket + `contrast-color()` + the repurposed `color-mix(in oklab)` tint seam; verdicts NET-NEW) + `docs/tranches/AX/audit/convergence2/A-glass-over-light.md` (the SOURCE audit — confirms R-ios27 at file:line AND surfaces the ONE finding the SOTA lane missed: the DOCK — the literal G2 surface — bypasses the `--glass-tint-*` seam entirely, so the adaptive hook must reach `dock.css`, not only `glass.css`'s five rungs)

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact only — this doc writes no `src`. The implementer session
> drives the §Cadence from this spec. Per the AX cardinal precept (§0 / AX.W00): this wave does NOT close
> on a green headless gate; it closes on a LIVE chrome-devtools-mcp + π contrast-readback audit — the dock +
> the rung foreground clearing 4.5:1 over a synthetic-white backdrop with the bright bucket active. Per the
> hardened agent git clause (K W0): agents NEVER stage/commit/stash — the orchestrator owns the index.

> *Gloss.* The **adaptive tint** is the iOS-26/27 "locally darken the glass over light content" move,
> expressed entirely in glass-ui's EXISTING `color-mix(in oklab, <rung bg>, var(--glass-tint-source)
> var(--glass-tint-strength))` seam (`glass.css:220,…`) — under a bright-backdrop probe, re-point
> `--glass-tint-source` to a low-luminance warm-ink + raise `--glass-tint-strength` to a bounded AA-clearing
> floor, so the rung mixes toward INK only over light backdrops. The **backdrop probe** is a DECLARATIVE
> BUCKET — `--glass-backdrop: light` (or the numeric `--glass-backdrop-luma`) set by the consumer on any
> ancestor, read via the SHIPPED `@container style()` mechanism (`utilities.css:537,543` is the live density
> precedent) — NOT a pixel sampler (there is no web API that reads what's painted behind a `backdrop-filter`
> element; that is the platform fact that makes the bucket the right shape). The **AA floor** is WCAG body
> 4.5:1 / large 3:1 — the numeric target the tint magnitude is driven to clear (the iOS clamp). The
> **`contrast-color()` flip** is the native (`@supports`-gated, Chrome 147+/Safari 26+) foreground-ink pick
> that reconciles `--dock-fg-on-aurora` into the probe. The **Clear↔Tinted escape** is the user a11y axis
> (`prefers-contrast: more` / `prefers-reduced-transparency: reduce`) — Apple's iOS-26.2 Clear↔Tinted analog,
> coordinated onto W54's `--glass-level` so there is ONE intensity scalar.

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `6569b7a` (3.8.0 + the AX integrated band + the foundational-spec batch) on
**six** falsifiable witnesses, each a source-true line-probe the new gate inverts. The adaptive-tint
plumbing the SOTA lane points at (`--glass-tint-source` / `--glass-tint-strength` + the `color-mix(in oklab)`
composite) is ~70% built and consumed by the five `.glass-*` rungs — but it is consumer-PUSH not
backdrop-ADAPTIVE, the DEFAULT is a zero-delta no-op, and the DOCK (the actual G2 surface) is OFF the seam.
Source-confirmed at HEAD:

- **RED witness 1 (the headline — there is NO backdrop probe; the tint is a zero-delta no-op by default,
  parse-falsifiable).** `tokens.css:838-839` mints `--glass-tint-source: var(--card)` + `--glass-tint-strength:
  0%`. With strength `0%` the `color-mix(in oklab, <rung bg>, var(--glass-tint-source) 0%)` is byte-identical
  to today — the surface stays warm-cream translucent over white and the text collapses. There is NO
  `--glass-backdrop` token, NO numeric `--glass-backdrop-luma`, and NO `@container style(--glass-backdrop: …)`
  block anywhere in `src/` (`grep -rn "glass-backdrop" src/` returns NONE; `grep -rn "glass-tint-strength"
  src/styles/tokens.css` shows only the `0%` default). Nothing reads the backdrop brightness and raises the
  strength. **The falsifiable RED:** *no `--glass-backdrop`/`--glass-backdrop-luma` token exists and no
  `@container style(--glass-backdrop: light)` block lifts `--glass-tint-strength`; the resolved strength is
  `0%` and the rung over a synthetic white backdrop fails 4.5:1 (RED). After the wave a `--glass-backdrop:
  light` (or `--glass-backdrop-luma ≤ <threshold>`) bucket, set on an ancestor and read via `@container
  style()`, lifts `--glass-tint-strength` to a bounded floor (≤18-24%) + re-points `--glass-tint-source`
  toward warm-ink, and the rung foreground clears 4.5:1 over white (GREEN).*

- **RED witness 2 (the DOCK — the literal G2 surface — is OFF the `--glass-tint-*` seam, parse-falsifiable —
  the source finding the SOTA lane MISSED, A-glass-over-light §audit-1).** `dock.css:146` paints the dock
  shell `background: var(--glass-bg-dock, var(--glass-bg-resting))` — a FLAT composed value with NO
  `color-mix(in oklab, …, var(--glass-tint-source) var(--glass-tint-strength))` wrapper. The five `.glass-*`
  rungs (`glass.css:220,240,251,267,278`) + `.glass-material` (`:380`) DO compose the oklab tint; the dock
  shell (`dock.css:146`), the expanded/floating tiers (`dock.css:507,767,780`), the chassis (`dock.css:675`,
  reading `--glass-bg-chassis`), and the morph-root chrome (`dock.css:507` morph interp) do NOT. `--glass-bg-
  dock` itself is a flat `color-mix(in srgb, var(--card) calc(var(--glass-opacity-dock) * 100%), transparent)`
  at `tokens.css:774` — srgb, no tint. So even after witness-1's adaptive axis lifts `--glass-tint-strength`,
  the DOCK would not darken. **RED:** *`dock.css:146,507,675,767,780` thread NO oklab tint wrapper; the dock
  over a synthetic white backdrop fails 4.5:1 even with `--glass-backdrop: light` set (RED). After the wave
  the dock shell + chassis + floating/expanded tiers compose `color-mix(in oklab, <bg>, var(--glass-tint-
  source) var(--glass-tint-strength))` so the adaptive darken reaches the G2 surface (GREEN).*

- **RED witness 3 (`--dock-fg-on-aurora` is the HALF-built foreground twin — push, not adaptive,
  parse-falsifiable; A-glass-over-light §audit-2).** `tokens.css:757` mints `--dock-fg-on-aurora:
  var(--foreground)` — "the dock control's foreground base … a consumer overrides it per-backdrop." This is
  the FOREGROUND half of the adaptive story with the SAME defect as the tint: consumer-PUSH (the consumer
  must KNOW the backdrop and set the token), never backdrop-adaptive, never paired with a `contrast-color()`
  native flip. **RED:** *`--dock-fg-on-aurora` resolves to a fixed `var(--foreground)` regardless of backdrop
  brightness; there is NO `contrast-color()` usage in `src/` (`grep -rn "contrast-color" src/` = NONE) (RED).
  After the wave the bright bucket re-points `--dock-fg-on-aurora` toward the contrast-clearing ink, and an
  `@supports (color: contrast-color(white))` block flips it natively — ONE reconciled path, not a third
  foreground fork (GREEN).*

- **RED witness 4 (the a11y Clear↔Tinted brackets CLOBBER per-rung instead of riding ONE scalar,
  parse-falsifiable; A-glass-over-light §audit-4).** `glass.css:730` (`prefers-reduced-transparency: reduce`)
  and `:749` (`prefers-contrast: more`) are the user-escape analogs to Apple's iOS-26.2 Clear↔Tinted axis, but
  they CLOBBER each `--glass-opacity-*` rung individually (multiple lines each) rather than riding ONE
  master-glassiness scalar. They touch OPACITY (more opaque) — a DIFFERENT axis from the adaptive TINT (darken
  the mix) — so the wave keeps them DISTINCT but COORDINATED onto W54's `--glass-level` so there is ONE
  intensity scalar, not two parallel forks. **RED:** *the two brackets re-declare `--glass-opacity-*` per-rung
  with no shared `--glass-clarity`/`--glass-level` axis; there is no single scalar both the design knob and
  the a11y escape ride (RED). After the wave the brackets ride W54's `--glass-level` (the shared
  master-glassiness scalar) — opacity-up for the a11y user-escape, tint-toward-ink for the automatic
  backdrop-bright case, one coordinated path (GREEN).*

- **RED witness 5 (the bright-bucket darkening direction does not exist — the W52 blend can only LIGHTEN,
  parse-falsifiable; A-glass-over-light §audit-3).** `glass.css:142` (W52) composites the specular gleam with
  `mix-blend-mode: plus-lighter` — HDR-clamped, no over-white blowout (the W52 fix), but still a LIGHTENER.
  After W52 the surface is correctly NOT-washed, but it still cannot DARKEN to re-open contrast over bright
  content. W52 fixed the WRONG-direction defect (the `screen` over-white); it did not add a RIGHT-direction
  (darken-over-light) path. The only darkening lever is the `color-mix(in oklab)` tint toward ink — which is
  the no-op default (witness 1). **RED:** *the only color-shift over a light backdrop is the `plus-lighter`
  lightener; nothing mixes the rung toward ink (RED). After the wave the bright bucket's `--glass-tint-source:
  <warm-ink>` + lifted `--glass-tint-strength` mix the rung TOWARD ink via the EXISTING `color-mix(in oklab)`
  — ZERO new compositing seam, the literal "locally darken the glass over light backdrops" move (GREEN).*

- **RED witness 6 (no contrast-readback π gate exists for the light-backdrop case, grep-falsifiable).** No
  `proof:adaptive-glass` is registered in `package.json` (`grep "proof:adaptive-glass" package.json` = NONE);
  no `scripts/proof-adaptive-glass.mjs` exists; the W00 `tests-visual/` workspace has no `adaptive-glass.spec.ts`
  contrast-readback probe over a synthetic-white backdrop. The G2-unreadable case is exactly the class no
  existing gate reaches (the glass fleet is CPU oracles + static bakes — `proof:liquid-glass-material`,
  `proof:glass-material-unified` parse the recipe STRUCTURE; none renders content-on-glass over white and reads
  back the contrast ratio). **RED:** *no `proof:adaptive-glass` gate, no contrast-readback spec (RED). After
  the wave `proof:adaptive-glass` asserts the dock + rung foreground clears 4.5:1 over a synthetic white
  backdrop with `--glass-backdrop: light` active — and REDs when the bucket block is removed (GREEN).*

The wave is RED at HEAD on all six; the HardGate below drives each to GREEN.

**Live re-diagnosis ritual (AX.W00 wave-open obligation).** BEFORE any edit, re-confirm the witnesses on the
live demo at `localhost:5173` (the §HardGate π checks): mount a `.glass-dock` + a `.glass-card` over a VERY
LIGHT backdrop (a near-white card surface, a pale aurora preset bleed, a bright speedtest grid) in light mode
and CONFIRM the text-on-glass collapses (the warm-cream translucent material has no edge, contrast measures
below 4.5:1). Capture the BEFORE π render (the unreadable dock-over-light + the unreadable card-over-light,
with the measured `getComputedStyle`-derived contrast ratio) as the born-RED baseline in
`audit/W55-adaptive-glass.json`. Do NOT proceed on the audit's word — re-prove (the cardinal AX lesson; the
exact G2 case the user reported live).

**Status** — SPEC (this doc). DEV-only; writes no `src` from this session.

---

## Goal

A glass surface (dock, card, popover, content panel) over a VERY LIGHT or busy backdrop stays LEGIBLE — the
material DARKENS adaptively to a bounded AA-clearing floor while letting as much of the backdrop through as
possible, the iOS-26/27 luminance-aware move expressed entirely in glass-ui's EXISTING token idiom. A
declarative `--glass-backdrop` bucket (consumed via the SHIPPED `@container style()` mechanism) lifts
`--glass-tint-strength` toward an AA floor (≤18-24%) + re-points `--glass-tint-source` to a low-luminance
warm-ink — ZERO new compositing seam, the literal "locally darken the glass over light content" recipe in the
existing `color-mix(in oklab)`. The adaptive hook REACHES the dock (the actual G2 surface, off the seam at
HEAD). `contrast-color()` (`@supports`-gated) layers the native foreground-ink flip, reconciling
`--dock-fg-on-aurora` into ONE path. The Clear↔Tinted user-escape rides W54's `--glass-level`. The MAXIMAL
glass-first default (W54) stays legible at scale — every content-on-glass-over-busy-backdrop case the
page-redesign waves create clears 4.5:1. Every magnitude a `--glass-*` token; no buried literal; the
warm-cream house identity KEPT; no parallel system.

---

## Scope (the adaptive hook — token-first, clean break, ZERO new compositing seam)

The fix is small, token-first, clean-break: a backdrop-luminance bucket probe consumed via the SHIPPED
`@container style()` mechanism, threading the EXISTING `--glass-tint-*` seam — but the seam must first reach
the dock + chassis + morph-chrome so the adaptive darken touches the surfaces G2 actually names. Five folds,
all token-routed:

1. **Mint the `--glass-backdrop` bucket + numeric `--glass-backdrop-luma` companion (the probe head —
   R-ios27 §CSS-1, A-glass-over-light §gestalt-1).** ADD `--glass-backdrop: dark` (or unset) + `--glass-
   backdrop-luma: <unset/dark-default>` at the head of the glass token block (`tokens.css` near `:838`, the
   `--glass-tint-*` neighbourhood). DEFAULT `--glass-backdrop: dark` (or unset) = today's zero-delta. The
   bucket is the DECLARATIVE axis a consumer (or a tiny opt-in observer) sets where it KNOWS the backdrop is
   bright (`--glass-backdrop: light` on the dock's ancestor over a pale surface). The numeric
   `--glass-backdrop-luma` companion is the heavier JS-probe escape hatch (a sampled backdrop luminance set
   numerically) — but it ships ONLY with ≥2 consumers (dock + a form-over-aurora) OR stays demo-private (the
   no-overfitting bar; A-glass-over-light §audit-3 caveat). The DEFAULT path is the declarative bucket; the
   numeric path is an optional enhancement, NOT the default.

2. **`@container style(--glass-backdrop: light)` blocks on ALL glass families — the bright bucket lifts the
   tint toward ink (the darken-over-light move — R-ios27 §CSS-3, A-glass-over-light §gestalt-2).** On the five
   `.glass-*` rungs (`glass.css:220,240,251,267,278`) AND `.glass-material` (`:380`) AND the dock/chassis
   surfaces (fold 3), author `@container style(--glass-backdrop: light)` blocks (the `utilities.css:537,543`
   density precedent) that:
   - lift `--glass-tint-strength` to a BOUNDED AA-clearing floor (≤18-24% — R-ios27 §CSS-3; the magnitude is
     whatever clears 4.5:1, capped LOW so the surface stays translucent — "let as much content through as
     possible"); and
   - re-point `--glass-tint-source` to a LOW-LUMINANCE warm-ink (`var(--foreground)` family — the warm-ink
     that mixes the rung TOWARD ink, not white).
   ZERO new compositing seam — this ONLY changes the VALUES the EXISTING `color-mix(in oklab, <rung bg>,
   var(--glass-tint-source) var(--glass-tint-strength))` reads. Stay in `oklab` (mwg-preferred, the house tint
   space — `tokens.css` §tint comment; the in-srgb surface-tint family is a DIFFERENT axis per CLAUDE.md, do
   not touch it).

3. **Thread the oklab tint wrapper onto the DOCK (this audit's headline gap — A-glass-over-light §audit-1).**
   Wrap the dock shell bg (`dock.css:146`), the chassis (`dock.css:675`), and the floating/expanded tiers
   (`dock.css:507,767,780`) in the SAME `color-mix(in oklab, <bg>, var(--glass-tint-source) var(--glass-tint-
   strength))` composite the five rungs use, so ALL glass families read ONE adaptive seam. With the default
   `--glass-tint-strength: 0%` this is a zero-delta change at rest (the mix is 0% toward the source =
   byte-identical to the flat `var(--glass-bg-dock)`); it only ACTIVATES under the bright bucket. **The
   morph-root interp (`dock.css:507`) is the careful one:** it interpolates bg ACROSS the morph and must stay
   `color-mix(in srgb …)` for the transition — the adaptive darken layers there as a SECOND composite or rides
   the resting endpoint only (a design call surfaced in §Open-Questions, ratify against the live audit; the
   conservative move darkens the resting endpoint, leaving the morph interp untouched).

4. **Reconcile `--dock-fg-on-aurora` into the probe + `contrast-color()` — ONE foreground path, not a third
   fork (R-ios27 §CSS-2, A-glass-over-light §audit-2).** Under the bright bucket re-point `--dock-fg-on-aurora`
   toward the contrast-clearing ink; layer an `@supports (color: contrast-color(white))` block (the native
   "pick light-or-dark material per backdrop" Apple does internally — Chrome 147+/Safari 26+) that flips the
   glass FOREGROUND ink + the rung's tint direction without a hand-authored `.dark` fork. This is a
   PROGRESSIVE-ENHANCEMENT layer — the declarative bucket carries the floor everywhere, `contrast-color()`
   refines it on supporting engines. NO third foreground fork — the `--dock-fg-on-aurora` push twin folds INTO
   the probe.

5. **Coordinate the Clear↔Tinted a11y escape onto W54's `--glass-level` — ONE scalar (A-glass-over-light
   §audit-4).** The `prefers-reduced-transparency: reduce` (`glass.css:730`) + `prefers-contrast: more`
   (`glass.css:749`) brackets are the user-escape analogs to Apple's iOS-26.2 Clear↔Tinted axis. Reconcile
   them so they ride W54's `--glass-level` master-glassiness scalar (the shared axis the design knob ALSO
   rides) rather than clobbering each `--glass-opacity-*` rung individually. The TINT axis (W55) and the
   OPACITY/LEVEL axis (W54) stay DISTINCT but share the bracket-collapse — opacity-up for the a11y
   user-escape, tint-toward-ink for the automatic backdrop-bright case. **Coordination note:** W54 OWNS the
   `--glass-level` mint; W55 CONSUMES it for the bracket-collapse (the brackets are in `glass.css`, W55's
   FileBounds). If W54's `--glass-level` is not yet landed when W55 drives, the bracket-collapse defers to a
   W55-local `--glass-clarity` placeholder reconciled onto `--glass-level` when W54 lands (the dependsOn AX.W54
   sequences them — W54 lands the scalar FIRST). See §Open-Questions / §Disjointness.

### KEEP — the load-bearing seams (do NOT re-author; A-glass-over-light §TL;DR)

UNCHANGED: the `color-mix(in oklab, …)` composite ITSELF (W55 only repoints the VALUES it reads — the
`--glass-tint-source`/`--glass-tint-strength` it consumes); the W52-corrected `plus-lighter` blend
(`glass.css:142` — W55 composes ON it, does NOT touch it — the lightener stays for the specular gleam; the
DARKENING is the orthogonal oklab-tint axis); the five rungs' tint-seam wiring (already correct — W55 adds the
bucket blocks, does not re-author the base `background:` line); the warm-cream house tint hue (the problem was
never the hue — it is the absence of a backdrop-bright DARKENING path); the `in-srgb` surface-tint family
(`--surface-tint-*` — a DIFFERENT axis, the deliberate house in-srgb choice per CLAUDE.md, NEVER touched
here); the `@container style()` mechanism (the SHIPPED density precedent W55 reuses verbatim — `utilities.css:
537,543`).

### CONVERGE folds (consumer-grounded design INPUT, NOT executed here)

- **The dock-over-light is the canonical G2 victim.** The fix lands in glass-ui (the dock tint-seam thread +
  the bright bucket blocks); speedtest + slides get it FREE via the AX publish + a pin bump (the
  consumer-adoption leg routes to W34, NOT executed here). Author the cross-ref note; write no sibling source.
- **The page-redesign waves (W60 + Q4/Q7/Q9) are the SCALE consumer.** W54's maximal glass-first wraps every
  story page in a glass card over a rich per-page background — content-on-glass-over-busy is the COMMON case
  those waves create. W55 is the legibility floor they LEAN on: each page background that runs bright sets
  `--glass-backdrop: light` (or the numeric luma) on its glass-card ancestor so the card content clears AA.
  Author the cross-ref note (W55 is a dependsOn-predecessor of the page-redesign waves' legibility close);
  the per-page bucket wiring is the page-redesign waves' consumption, not W55's edit.

---

## SOTA deepening (iOS-26/27 adaptive glass — R-ios27 + A-glass-over-light, read in full)

The convergence corpus extracts the iOS-26/27 "Liquid Glass" legibility mechanism + the CSS-platform
translation. Cited from the two research files:

**The mechanism — adaptive vibrancy bound to backdrop luminance (R-ios27 §SOTA, WWDC25 sess. 219):** Apple's
Liquid Glass is NOT a static frosting — "Each layer continuously adapts based on what's behind it, and the
amount of tint and the dynamic range shift to always ensure buttons remain legible, while letting as much of
the content through as possible." A per-frame, content-aware rendering pass. The concrete technique splits on
backdrop brightness:
- **L1 — backdrop-luminance switch (the core).** The material samples the relative luminance behind a region
  and picks a light-vs-dark material variant per region (two appearance variants — clear + dimmed — chosen per
  backdrop, not per app theme). The decision axis is the WCAG relative-luminance of the sampled backdrop. The
  web analog: the `--glass-backdrop` bucket (declarative; there is no web pixel-sampler).
- **L2 — local darkening behind the legible element (the EXACT G2 ask).** Over a light/busy backdrop the
  material "heavily blurs and tints the background behind the text, effectively locally darkening the glass
  ONLY where the text exists" — a localized dimming layer that drops the local backdrop luminance just enough
  to re-open contrast. The web analog: the bright-bucket `--glass-tint-source: <warm-ink>` + lifted
  `--glass-tint-strength` mixing the rung toward ink via the EXISTING `color-mix(in oklab)`.
- **L3 — contrast-ratio clamp (the target).** The adaptation is driven to a numeric floor: the system
  "tints/darkens to maintain a strictly calculated contrast ratio (often 4.5:1 or higher)" — WCAG AA body is
  the optimization target, not an aesthetic guess. The web analog: the AA floor the bounded tint magnitude is
  driven to clear, asserted by `proof:adaptive-glass`.
- **L4 — vibrancy ≠ transparency (the substrate distinction — WHY a naive lightener is wrong over light).**
  Liquid Glass text is "an advanced blend mode (vibrancy) that lifts or darkens relative to the backdrop" —
  NOT white pixels on top. A naive `mix-blend-mode: screen` is exactly WRONG over light content (it can only
  lighten — over near-white it washes to mud, the opposite of iOS). This is precisely why W52 fixed
  `screen`→`plus-lighter` AND why W52 alone is insufficient: `plus-lighter` is STILL a lightener; the DARKEN
  path is the orthogonal oklab-tint axis W55 adds.

**The iOS-26→27 trajectory (the user's "SOTA as of iOS 27?" — R-ios27 §trajectory):** Apple SHIPPED MORE
darkening/opacity by default over the iOS 26.x → 26.2 → 27 ("Golden Gate") arc because the launch "Clear"
material failed exactly the G2 case (NN/g's "Liquid Glass Is Cracked" documented text-over-image + floating-
control legibility as the headline launch defects). iOS-26.2 added a Clear↔Tinted system choice ("Tinted
increases opacity while adding more contrast"); iOS-27 walked the default further toward the opaque/tinted
end. **The SOTA lesson for glass-ui:** the legible answer over light content is a backdrop-luminance probe
that ADDS tint/darkening only when the backdrop is bright, clamped to an AA target — AND a user-reachable
"more opaque" escape (the Clear↔Tinted axis, which glass-ui already half-owns via `prefers-contrast: more` +
`prefers-reduced-transparency: reduce` — fold 5).

**The CSS-platform translation (what's actually implementable in 2026 — R-ios27 §CSS):** glass-ui cannot run
a per-frame GPU luminance sample of arbitrary DOM behind a `backdrop-filter` element — there is no web API
that reads backdrop pixels. So the web-SOTA recipe is a DECLARATIVE luminance-bucket probe, not a sampler.
Three composable primitives, all already in glass-ui's idiom: (1) the `@container style(--glass-backdrop)`
probe (the shipped density-cascade mechanism); (2) `contrast-color()` (native, Chrome 147+/Safari 26+) for the
foreground-ink flip; (3) the `color-mix(in oklab, …)` adaptive darkening (the EXISTING tint seam, repurposed —
ZERO new seam). The contrast TARGET is the AA floor Apple clamps to (4.5:1 body / 3:1 large). The W00 π-lane
contrast-readback proves the rung foreground clears 4.5:1 over a synthetic white backdrop with the bright
bucket active.

**Reconciliation note:** W55 ADDS the backdrop-bright DARKENING axis (the `--glass-backdrop` probe + the
bright-bucket tint lift on ALL glass families INCLUDING the dock); it REPOINTS the `--glass-tint-*` VALUES
under the probe (a value re-baseline on the EXISTING knob — NOT a re-mint of the seam); it RECONCILES
`--dock-fg-on-aurora` + the a11y brackets into the probe (no third fork); it composes ON W52's corrected blend
(does NOT touch it) and ON W54's `--glass-level` (consumes it, does not re-mint it). It does NOT touch the
WebGL aurora/blob shaders (a different subsystem — those run OKLCh in-shader, the separate correct oklab path
per CLAUDE.md), the forced-colors skin (W36 — disjoint, see DEDUP), or the in-srgb surface-tint family.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/tokens.css` | **MINT** `--glass-backdrop: dark` (or unset, the zero-delta default) + the numeric `--glass-backdrop-luma` companion (unset/dark-default) at the head of the glass token block (near `:838`, the `--glass-tint-*` neighbourhood); ADD the bright-bucket warm-ink value the `@container` blocks re-point `--glass-tint-source` to (a `--glass-tint-ink: var(--foreground)` family token so the magnitude is overridable, NOT an inline `var(--foreground)`); record the AA-floor `--glass-tint-strength` ceiling (≤18-24%) as the bucket-block target. Coordinate the `--glass-level`/`--glass-clarity` bracket-collapse with W54 (W54 mints `--glass-level`; W55 consumes it — if not yet landed, a W55-local placeholder reconciled later). NO change to the `--glass-tint-source`/`--glass-tint-strength` DEFAULTS (they stay `var(--card)`/`0%` — the zero-delta rest state; the bucket blocks override them, the `:root` defaults do not). |
| `src/styles/glass.css` | **ADD** `@container style(--glass-backdrop: light)` blocks on the five `.glass-*` rungs (`:220,240,251,267,278`) + `.glass-material` (`:380`) lifting `--glass-tint-strength` to the AA floor + re-pointing `--glass-tint-source` to the warm-ink; ADD the `@supports (color: contrast-color(white))` foreground-ink flip block; RECONCILE the `prefers-reduced-transparency: reduce` (`:730`) + `prefers-contrast: more` (`:749`) brackets onto W54's `--glass-level` (the bracket-collapse — opacity axis distinct from the tint axis). NO re-author of the base `background:` lines (already thread the seam) and NO touch to the `plus-lighter` blend (`:142` — W52's, composed-on not edited). **glass.css CO-WRITER serialization:** W55 owns the `@container style(--glass-backdrop)` blocks + the `contrast-color()` `@supports` block + the a11y-bracket region — line-region-disjoint from W52 (the `.glass-material::before` specular region + `.glass-btn` hover region) + W42 (the `@supports --glass-refract-scale` append); the orchestrator serializes by line-region. |
| `src/styles/dock.css` | **THREAD** the `color-mix(in oklab, <bg>, var(--glass-tint-source) var(--glass-tint-strength))` wrapper onto the dock shell bg (`:146`), the chassis (`:675`), and the floating/expanded tiers (`:507,767,780`) — zero-delta at the `0%` default, activates under the bright bucket; ADD the `@container style(--glass-backdrop: light)` companion blocks on the dock/chassis selectors (the same bright-bucket lift the rungs carry); RECONCILE `--dock-fg-on-aurora` (read at the dock control selectors) under the bright bucket + the `contrast-color()` flip. **The morph-root interp (`:507`) stays `color-mix(in srgb …)` for the transition** — the adaptive darken rides the resting endpoint or layers as a SECOND composite (§Open-Questions ratify; conservative = resting endpoint only). **dock.css CO-WRITER serialization:** W55 owns the dock-shell/chassis/tier BACKGROUND region + the `--glass-backdrop` companion blocks — line-region-disjoint from W45 (the dock-unify-root + nav-pattern region) + W01 (the `--dock-morph-t` scalar machinery); the orchestrator serializes by line-region. The `--dock-morph-t` machinery is NEVER touched here. |
| `tests-visual/adaptive-glass.spec.ts` | **NEW** — the π contrast-readback probe (the W00 workspace member). Mounts a `.glass-dock` + a `.glass-card` + a representative `.glass-*` rung over a SYNTHETIC WHITE backdrop (a `#ffffff` sibling behind the `backdrop-filter` element) with `--glass-backdrop: light` set on the ancestor; reads back the rung's resolved background luminance via `getComputedStyle` + the canvas readback (the W00 readPixels primitive); computes the WCAG contrast ratio of the foreground ink against the resolved-over-white plate; ASSERTS ≥ 4.5:1 (body) / ≥ 3:1 (large). RED-witness: remove the bright-bucket block → the contrast drops below 4.5:1 and the spec REDs. Runs in light AND dark, ≥2 viewports. |
| `scripts/proof-adaptive-glass.mjs` | **NEW** — the born-RED→GREEN gate (the device-free SOURCE arm + the registration). Asserts: `--glass-backdrop` + `--glass-backdrop-luma` are minted; the `@container style(--glass-backdrop: light)` blocks exist on the five rungs + `.glass-material` + the dock/chassis selectors; under the bright bucket the resolved `--glass-tint-strength` is in the bounded AA band (> 0%, ≤ ~24%) and `--glass-tint-source` re-points to the warm-ink (NOT `var(--card)`); the dock shell/chassis/tiers thread the `color-mix(in oklab, …)` wrapper (NOT a flat `var(--glass-bg-*)`); the `@supports (color: contrast-color(…))` foreground-flip block exists; the a11y brackets ride `--glass-level` (NOT a per-rung clobber); the `--glass-tint-source`/`-strength` :root DEFAULTS are UNCHANGED (the zero-delta rest state); the in-srgb `--surface-tint-*` family is UNTOUCHED (the oklab tint is the only axis edited). The PAINTED 4.5:1 truth is proven by the π arm above, NEVER the source gate alone. |
| `package.json` | Register `proof:adaptive-glass` + the W00 meta-gate (`proof:gate-script-parity`) parity match; register the `tests-visual/adaptive-glass.spec.ts` member under the W00 workspace. |
| `CLAUDE.md` | **DOCS.** Add an "Adaptive glass legibility" note under the glass-material / Conventions section: the `--glass-backdrop`/`--glass-backdrop-luma` bucket, the `@container style()`-driven bright-bucket tint lift toward warm-ink (the iOS-26/27 darken-over-light move in the existing `color-mix(in oklab)` seam), the dock-now-on-the-seam fix, the `contrast-color()` `@supports`-gated foreground flip, the Clear↔Tinted a11y escape on `--glass-level`. Documentation is part of the change. |
| `docs/tranches/AX/audit/W55-adaptive-glass.json` | **NEW** — the born-RED→GREEN audit artefact + the paired-π BEFORE/AFTER contrast measurements + DELTA reference. |
| `docs/tranches/AX/audit/W55-DELTA.md` | **NEW** — the paired-π BEFORE/AFTER + DELTA capture (the W00 protocol): the unreadable dock-over-light + card-over-light (measured contrast < 4.5:1) → the adaptively-darkened legible surface (measured ≥ 4.5:1), over flat-white + bright-aurora backdrops, light + dark. |

**OUT of bounds:** the `plus-lighter` blend (`glass.css:142` — W52's; W55 composes ON it, never edits it); the
`.glass-material::before` specular recipe (W52); the in-srgb `--surface-tint-*` family (the deliberate house
in-srgb axis per CLAUDE.md — NEVER touched); the `--glass-level` MINT (W54 owns it; W55 consumes it); the
`--dock-morph-t` morph machinery (W01); the dock-unify-root + nav-pattern region (W45); the WebGL aurora/blob
shaders (W07-W14 — they run OKLCh in-shader, the separate correct path); the forced-colors skin (W36 —
disjoint, see DEDUP); the `--glass-curvature-overlay` / corner radials (W09); the `#glass-refract` filter
(W42/W20); the numeric `--glass-backdrop-luma` JS-OBSERVER (ships only with ≥2 consumers OR stays demo-private
— the no-overfitting bar; the DEFAULT path is the declarative bucket).

---

## Disjointness (sibling waves it must NOT overlap)

W55 is the LUMINANCE-ADAPTIVE-TINT axis of the glass material; it shares the `glass.css`/`dock.css`/`tokens.css`
glass region with the material family but is line-region-disjoint from its siblings:

- **vs AX.W52 (liquid-glass material overhaul) — PREREQUISITE substrate, line-region-disjoint, W55 composes
  ON it.** W52 owns the `.glass-material::before` specular GEOMETRY/BLEND (the central-disc→gleam +
  screen→`plus-lighter`), the cohort re-baseline, the saturate tame, the button-hover smoothing, the easing
  doctrine, the gold promotion. W52 is a LIGHTENER fix — it adds NO backdrop probe and NO darken-over-light
  path (its tint family stays the consumer-push `--glass-tint-*` model). W55 owns the LUMINANCE-ADAPTIVE
  DARKENING axis: the `--glass-backdrop` probe, the bright-bucket tint lift toward ink, the dock-seam thread,
  the `contrast-color()` flip, the a11y-bracket reconcile. **dependsOn AX.W52; sequence AFTER** — W52's
  corrected `plus-lighter` blend + the `--glass-tint-source`/`--glass-tint-strength` seam are the fixed
  substrate W55's bucket blocks re-point. Shared `glass.css` region is line-disjoint: W52 = the `::before`
  specular + `.glass-btn` hover; W55 = the `@container style(--glass-backdrop)` blocks + the `contrast-color()`
  `@supports` block + the a11y-bracket region. W55 NEVER edits the `plus-lighter` blend or the `::before`.
- **vs AX.W54 (glass-first-class — the ROOT) — HARD predecessor, W55 is its legibility floor.** W54 makes
  glass the DEFAULT for EVERY surface (the MAXIMAL R3 decision) + mints the `--glass-level` master-glassiness
  scalar + the opaque escape rung. W55 is the legibility floor the maximal default LEANS on — every
  content-on-glass-over-busy case W54 creates clears 4.5:1 via W55's adaptive darken. **dependsOn AX.W54;
  sequence AFTER** — W54's `--glass-level` scalar is the axis W55's a11y-bracket collapse rides (ONE scalar,
  not two). If W54's `--glass-level` is not yet landed when W55 drives, the bracket-collapse defers to a
  W55-local `--glass-clarity` placeholder reconciled onto `--glass-level` when W54 lands (§Open-Questions).
  W55 does NOT re-mint `--glass-level` or the opaque rung — W54 owns those.
- **vs AX.W36 (forced-colors / WHC glass-language skin) — DISJOINT axis.** W36 ships the `@media
  (forced-colors: active)` Windows-High-Contrast structure-survival skin (tier panes → `CanvasText` borders,
  hue → bordered glyphs, focus → `Highlight`) — a BINARY palette-substitution axis, NOT a continuous
  luminance-probe over a light *content* backdrop. The W36 plan scopes to forced-colors and its `.dark` arm is
  "IRRELEVANT under WHC". Folding adaptive-tint into W36 would mis-scope a binary palette-override wave with a
  continuous luminance-probe concern. **Confirmed disjoint** (matches R-ios27 §DEDUP + A-glass-over-light §DEDUP).
  W55 authors NO forced-colors block; W36 authors NO `--glass-backdrop` probe.
- **vs AX.W45 (dock-unify-root + nav-pattern) — shared `dock.css`, line-region-disjoint.** W45 owns the
  dock-unify-root + the home-button-LEFT/navs/dividing-lines nav pattern + the persistent-nav region. W55 owns
  the dock-shell/chassis/tier BACKGROUND region (the tint-seam thread + the `--glass-backdrop` companion
  blocks). Line-region-disjoint per the dock.css co-writer serialization. W55 NEVER touches the
  `--dock-morph-t` machinery (W01) or the nav pattern (W45).
- **vs AX.W60 + the page-redesign waves (Q4/Q7/Q9) — W55 is a dependsOn-PREDECESSOR of their legibility
  close.** W60 wraps every story page in a glass card over a rich per-page background — content-on-glass-over-
  busy is the COMMON case those waves create. W55 is the legibility floor they consume (each bright page
  background sets `--glass-backdrop: light` on its glass-card ancestor). W55 authors the cross-ref note; the
  per-page bucket wiring is the page-redesign waves' consumption, NOT W55's edit. (W55 sequences BEFORE the
  page-redesign legibility close.)

---

## Triumvirate (implement / adversarially-verify / gate-author split)

Per AX.md §0 agent-ceiling (≤6 implement / ≤7 read-only-audit). W55's actual split (count 3):

- **Implement (≤1 agent — the surface is one cohesive token+cascade re-author).** Mints `--glass-backdrop`/
  `--glass-backdrop-luma` + the warm-ink bucket token (tokens.css); adds the `@container style(--glass-backdrop:
  light)` bright-bucket blocks on the five rungs + `.glass-material` + the dock/chassis (glass.css + dock.css);
  threads the oklab tint wrapper onto the dock shell/chassis/tiers (dock.css); adds the `contrast-color()`
  `@supports` foreground-flip; reconciles `--dock-fg-on-aurora` + the a11y brackets onto the probe +
  `--glass-level`; records the CLAUDE.md note. Lint + typecheck at every interval. The bucket blocks + the dock
  thread + the a11y reconcile are line-disjoint within the shared files.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the six RED witnesses against the patched tree: parses
  the `--glass-backdrop` mint + the bucket blocks; reads `getComputedStyle` under a synthetic `--glass-backdrop:
  light` ancestor (asserts `--glass-tint-strength` lifts into the bounded AA band + `--glass-tint-source`
  re-points to the warm-ink); asserts the dock shell/chassis/tiers thread the oklab wrapper (NOT flat
  `var(--glass-bg-*)`); asserts the `contrast-color()` `@supports` block exists; asserts the a11y brackets ride
  `--glass-level`; asserts the :root tint DEFAULTS + the in-srgb `--surface-tint-*` family are UNCHANGED.
  ADVERSARIAL twist: tries to make `proof:adaptive-glass` PASS with the dock STILL off the tint seam (confirms
  the gate REDs on the flat dock bg); tries a bright-bucket strength ABOVE the AA-band ceiling (confirms the
  bounded-floor assertion REDs — the surface must stay translucent, "let content through"); tries to satisfy
  the gate by editing the in-srgb surface-tint family (confirms the gate asserts the oklab axis, not srgb).
  DRIVES the VISUAL-TRUTH live audit (the binding close — see HardGate) incl. the synthetic-white + bright-
  aurora contrast-readback.
- **Gate-author (≤1 agent).** Authors `scripts/proof-adaptive-glass.mjs` (born-RED on the `--glass-backdrop`
  mint + the bucket blocks + the bounded-AA-band strength + the warm-ink re-point + the dock-seam thread + the
  `contrast-color()` block + the a11y-bracket reconcile + the unchanged-defaults + the untouched-srgb-family
  assertions); authors `tests-visual/adaptive-glass.spec.ts` (the π contrast-readback over synthetic white);
  confirms BOTH FAIL at HEAD `6569b7a` (no `--glass-backdrop`, the dock off the seam, the contrast < 4.5:1) and
  PASS on the patched tree. Registers `proof:adaptive-glass` in `package.json` + the W00 meta-gate parity +
  the workspace member. Gate-author is distinct from implementer (the gate must be able to FAIL the
  implementer's work — the AW false-GREEN class). The π live arm (the painted-contrast truth) rides the W00
  readback, NOT a CPU text gate alone (the SOURCE arm proves the recipe STRUCTURE; the π arm proves the
  RENDER clears 4.5:1).

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b —
mandatory):** the wave-agnostic authorization grant lives ONCE in AX.md §6.1 (devise an in-FileBounds
idiomatic gestalt fix; spawn a tangent triumvirate to work AROUND, never stall; escalate ONLY when genuinely
user-gated) with the 4-class halt-vs-work-around decision tree in AX.md §6.2 — by reference, not restated
here. This wave's §3a triumvirate AUTO-TRIGGERS (authored from its FileBounds + HardGate):

- **Out-of-FileBounds reveal → triumvirate (Class 2; NEVER absorb in-line).** Any need to touch the
  `plus-lighter` blend (W52), the `.glass-material::before` specular (W52), the `--glass-level` MINT (W54), the
  in-srgb `--surface-tint-*` family (the house axis), the `--dock-morph-t` machinery (W01), the nav-pattern
  region (W45), the WebGL shaders (W07-W14), or the forced-colors skin (W36) — HALT + triumvirate (a
  material/tint/morph/a11y boundary the FileBounds did not home).
- **Non-local hard-gate failure → triumvirate (Class 2).** If `proof:adaptive-glass` cannot simultaneously
  assert the bounded-AA-band strength + the warm-ink re-point + the dock-seam thread + the `contrast-color()`
  block + the a11y reconcile + the unchanged-defaults — OR if the bright bucket cannot clear 4.5:1 over
  synthetic white WITHOUT exceeding the bounded translucency ceiling (the surface goes opaque to clear AA, a
  goal-miss) — escalate the gate/recipe design (research the bounded-vs-AA tension), do NOT relax the AA floor
  or the translucency ceiling to pass.
- **3rd diagnostic-loop iteration → triumvirate (Class 2).** If the adaptively-darkened surface does NOT read
  as legible-AND-still-translucent (the text clears 4.5:1 BUT the surface reads as a solid dark plate, losing
  the glass — the "let content through" failure) after three authoring iterations, OR the dock over light still
  reads unreadable after three retunes, dispatch research→plan→redress rather than re-tuning the AA-band
  strength ad hoc.
- **§Open-Questions ratify reached un-ratified → HALT-and-ratify (Class 3).** The morph-root-interp
  (resting-endpoint-only vs second-composite), the numeric-`--glass-backdrop-luma`-JS-observer
  (ship-vs-demo-private), the AA-band-ceiling (18% vs 24%), and the `--glass-level`-vs-`--glass-clarity`
  placeholder (if W54 not yet landed) are ratify-before-impl hinges — if any reaches impl un-ratified, take
  the recorded default (resting-endpoint-only; demo-private observer; 24% ceiling clamped by the live 4.5:1
  readback; defer to the W55-local `--glass-clarity` placeholder reconciled when W54 lands) and run the
  live-audit verification step, do NOT self-ratify a divergent choice.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN. `proof:adaptive-glass` (NEW; the device-free SOURCE +
registration arm).** A source-parse + token-resolution gate (the precept-valid artefact forms per SPEC.md
§Hard Gates — source-structure for the CSS-cascade contract; the PAINTED 4.5:1 truth is proven by the π arm
below, NEVER a text gate alone):

- **The backdrop probe exists.** Assert `--glass-backdrop` + `--glass-backdrop-luma` are minted in tokens.css
  with a zero-delta default (`dark`/unset); assert the warm-ink bucket token (`--glass-tint-ink` family) is
  minted. **Born-RED at HEAD** (`grep "glass-backdrop" src/` = NONE).
- **The bright bucket lifts the tint toward ink — ON ALL glass families.** Assert `@container style(--glass-
  backdrop: light)` blocks exist on the five `.glass-*` rungs + `.glass-material` + the dock/chassis selectors;
  assert under the bright bucket the resolved `--glass-tint-strength` is in the bounded AA band (`> 0%`, `≤
  ~24%` — translucent floor preserved) and `--glass-tint-source` re-points to the warm-ink (NOT `var(--card)`).
  **Born-RED at HEAD** (no bucket blocks; strength resolves `0%`).
- **The dock is ON the seam.** Assert the dock shell bg (`dock.css:146`), the chassis (`:675`), and the
  floating/expanded tiers (`:507,767,780`) thread the `color-mix(in oklab, …, var(--glass-tint-source)
  var(--glass-tint-strength))` wrapper (NOT a flat `var(--glass-bg-*)`). **Born-RED at HEAD** (the dock is flat
  `var(--glass-bg-dock)`).
- **The foreground flip + the a11y reconcile.** Assert the `@supports (color: contrast-color(…))`
  foreground-flip block exists; assert `--dock-fg-on-aurora` re-points under the bright bucket (NOT a fixed
  `var(--foreground)`); assert the `prefers-reduced-transparency: reduce` + `prefers-contrast: more` brackets
  ride W54's `--glass-level` (NOT a per-rung `--glass-opacity-*` clobber). **Born-RED at HEAD** (`grep
  "contrast-color" src/` = NONE; the brackets clobber per-rung).
- **The seam-discipline guards (regression-locks).** Assert the `--glass-tint-source`/`--glass-tint-strength`
  :root DEFAULTS are UNCHANGED (`var(--card)`/`0%` — the zero-delta rest state); assert the in-srgb
  `--surface-tint-*` family is UNTOUCHED (the deliberate house in-srgb axis — the oklab tint is the ONLY axis
  W55 edits); assert the W52 `plus-lighter` blend (`glass.css:142`) is INTACT (W55 composes on it, never edits
  it). (HEAD is correct on these — the gate locks they stay so under the re-author.)

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion; the cardinal lesson — a
green SOURCE gate over a still-unreadable live render is NOT done; G2 is the exact live-truth case the user
reported).** A fail-CLOSED live chrome-devtools-mcp + π contrast-readback pass the ORCHESTRATOR runs via
chrome-devtools-mcp @ `localhost:5173` + the `tests-visual/` workspace — `getComputedStyle` reads +
canvas-readback contrast + screenshots over a `.glass-dock` + a `.glass-card` + a representative `.glass-*`
rung mounted over (a) a SYNTHETIC WHITE `#ffffff` backdrop and (b) a BRIGHT aurora preset bleed, in light AND
dark, ≥2 viewports, ideally with a Safari/WebKit pass:

- **The dock-over-light is now LEGIBLE.** Mount a `.glass-dock` over a near-white surface with `--glass-
  backdrop: light` set: ASSERT the dock material visibly DARKENS (the warm-ink tint mixes in) and the dock
  control text + icons read clearly. `evaluate_script` + the π readback computes the WCAG contrast ratio of
  the dock foreground against the resolved-over-white plate: ASSERT ≥ 4.5:1 (body) / ≥ 3:1 (large icons). The
  BEFORE capture (bucket removed) measures < 4.5:1 (the born-RED baseline).
- **The card-over-light is now LEGIBLE.** Mount a `.glass-card` over a bright backdrop with the bucket active:
  ASSERT the card content text clears 4.5:1; the card material darkens just enough — it STAYS translucent (the
  bright aurora is still visible through it, "let content through"), NOT an opaque dark plate.
- **The translucency floor holds — the surface is still GLASS.** ASSERT the adaptively-darkened surface is
  NOT a solid dark plate: the backdrop is still partially visible through it (the `--glass-tint-strength` is
  bounded ≤ ~24%, the glass identity survives). The goal-miss tell is a surface that clears AA by going opaque
  — that closes `complete_with_misses`, not `complete`.
- **The default (dark-backdrop / unset) path is byte-identical.** A `.glass-card` over the DEFAULT (no
  `--glass-backdrop: light`, the dark/canonical case): ASSERT the surface is UNCHANGED from HEAD (the
  zero-delta rest state — W55 only activates under the bright bucket; it must not regress the canonical
  glass-over-rich-background look the rest of the tranche tunes).
- **The `contrast-color()` enhancement (where supported).** On Chrome 147+/Safari 26+: ASSERT the foreground
  ink flips natively under the bright bucket (the `@supports` block engages); on a non-supporting engine
  ASSERT the declarative bucket carries the floor anyway (the progressive-enhancement degradation is clean —
  the bucket is the floor, `contrast-color()` the refinement).
- **The a11y Clear↔Tinted escape.** With `prefers-contrast: more` (or `prefers-reduced-transparency: reduce`)
  emulated: ASSERT the surface goes MORE OPAQUE (the user-escape opacity axis) AND the tint reconcile rides
  `--glass-level` (one scalar) — the two axes (opacity-up + tint-toward-ink) compose, not conflict.
- **Safari parity (HARD constraint).** Verify the `@container style()` bucket + the `color-mix(in oklab)`
  darken paint correctly in Safari/WebKit (NOT just Chromium); confirm `contrast-color()` engages on Safari
  26+ and the declarative bucket carries the floor on older Safari; confirm `-webkit-backdrop-filter` is in the
  computed style (the surface is blurred, not flat — the W52-locked Safari prefix).
- **No regression / affordance / hierarchy / NO visual occlusion** per the AX cardinal gate, light AND dark.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/W55-DELTA.md`, per the W00 protocol, with the
measured contrast ratios) is the binding close criterion. The BEFORE capture pins the HEAD unreadable
dock-over-light + card-over-light (measured < 4.5:1) the adaptive darken must visibly beat.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the six RED witnesses against HEAD `6569b7a` on
   the live demo: mount `.glass-dock` + `.glass-card` over a near-white + a bright-aurora backdrop in light
   mode, measure the foreground contrast (< 4.5:1, the G2 collapse). Capture the BEFORE π render + measured
   contrast as the born-RED baseline in `audit/W55-adaptive-glass.json`. Confirm W52 (the `plus-lighter` blend
   + the `--glass-tint-*` seam) + W54 (the `--glass-level` scalar) are the settled substrate. Do NOT proceed
   on the audit's word — re-prove.
2. **Author the gate born-RED.** Author `scripts/proof-adaptive-glass.mjs` (the source arm) +
   `tests-visual/adaptive-glass.spec.ts` (the π contrast-readback over synthetic white); register
   `proof:adaptive-glass` in `package.json` + the W00 meta-gate + the workspace member; confirm BOTH FAIL at
   HEAD.
3. **Mint the backdrop probe + the warm-ink bucket token.** `tokens.css`: `--glass-backdrop` (zero-delta
   default) + `--glass-backdrop-luma` + the `--glass-tint-ink` warm-ink token; record the AA-floor strength
   ceiling. Lint + typecheck.
4. **Add the bright-bucket `@container style()` blocks on the five rungs + `.glass-material`.** `glass.css`:
   the `@container style(--glass-backdrop: light)` blocks lifting `--glass-tint-strength` to the AA floor +
   re-pointing `--glass-tint-source` to the warm-ink. Lint + typecheck.
5. **Thread the oklab tint wrapper onto the dock + add the dock bright-bucket blocks.** `dock.css`: wrap the
   dock shell/chassis/tiers in `color-mix(in oklab, …)` (zero-delta at `0%`); add the `@container style(--glass-
   backdrop: light)` companion blocks; keep the morph-root interp `color-mix(in srgb …)` (resting endpoint
   only — the ratified default). Lint + typecheck.
6. **The `contrast-color()` foreground flip + the `--dock-fg-on-aurora` reconcile.** `glass.css` + `dock.css`:
   the `@supports (color: contrast-color(white))` block; re-point `--dock-fg-on-aurora` under the bright
   bucket. Lint + typecheck.
7. **Reconcile the a11y Clear↔Tinted brackets onto `--glass-level`.** `glass.css`: collapse the `prefers-
   reduced-transparency: reduce` + `prefers-contrast: more` brackets onto W54's `--glass-level` (the
   opacity axis, distinct-but-coordinated with the tint axis). Lint + typecheck.
8. **The CLAUDE.md note.** Add the "Adaptive glass legibility" note (the bucket, the bright-bucket darken, the
   dock-on-the-seam fix, the `contrast-color()` flip, the Clear↔Tinted escape on `--glass-level`).
9. **Gate GREEN + VISUAL-TRUTH.** Confirm `proof:adaptive-glass` passes (source arm) + the π
   `adaptive-glass.spec.ts` passes (the 4.5:1 readback over synthetic white); re-run W52's
   `proof:liquid-glass-material` (confirm the bucket blocks did not red it) + W54's glass-first gate; run the
   VISUAL-TRUTH live π audit (the dock + card over light now legible, the translucency floor held, the default
   path byte-identical, the `contrast-color()` enhancement, the a11y escape, Safari parity) over synthetic
   white + bright aurora, light + dark; capture the paired-π BEFORE/AFTER + DELTA (`W55-DELTA.md`) with the
   measured contrast ratios; write `audit/W55-adaptive-glass.json` to GREEN; author the speedtest/page-redesign
   consumer-leg NOTE (routes to W34/W60).

Lint/format cadence: `npm run typecheck` + the repo's eslint/prettier after each integration batch (steps 3-8)
and before close; `git diff --check` on the doc/status commit.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W55-adaptive-glass.json` — the born-RED→GREEN ledger: the six RED witnesses (no
  backdrop probe / zero-delta tint, the dock off the seam, the `--dock-fg-on-aurora` push twin, the per-rung
  a11y clobber, the lightener-only blend, the missing contrast gate), the per-finding disposition (R-ios27
  L1-L4 + the CSS translation + A-glass-over-light audit-1/2/3/4), the W52/W54-settled confirmation, and the
  post-wave GREEN structure + the π contrast-readback measurements (≥ 4.5:1 over synthetic white, bright bucket
  active).
- `docs/tranches/AX/audit/W55-DELTA.md` — the paired-π BEFORE/AFTER + DELTA: the unreadable dock-over-light +
  card-over-light (measured contrast < 4.5:1) → the adaptively-darkened legible surface (measured ≥ 4.5:1) that
  STAYS translucent; the default-path byte-identical canary; the `contrast-color()` enhancement A/B; the a11y
  Clear↔Tinted escape; the Safari/WebKit `@container style()` + `color-mix(in oklab)` parity; over synthetic
  white + bright aurora, light + dark.
- `scripts/proof-adaptive-glass.mjs` — the NEW source gate (backdrop-probe + bright-bucket-tint-lift + dock-
  seam-thread + contrast-color-flip + a11y-bracket-reconcile + unchanged-defaults + untouched-srgb-family).
- `tests-visual/adaptive-glass.spec.ts` — the NEW π contrast-readback probe (4.5:1 over synthetic white, the
  W00 workspace member).
- The diff localizing the `--glass-backdrop` probe mint + the bright-bucket blocks + the dock tint-seam thread
  + the `contrast-color()` flip + the a11y-bracket reconcile.
- A consumer-NOTE annex (folded into the W34/W60 coordination ledgers, NOT executed here): the speedtest
  dock-over-light + the page-redesign glass-card-over-busy-background legibility (clears AA after the bright
  bucket + a pin bump).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(glass): born-RED proof:adaptive-glass — backdrop-probe + bright-bucket tint-lift + dock-seam-thread + contrast-color-flip + the π 4.5:1-over-white contrast readback (AX.W55 G2)`
2. `feat(tokens): mint --glass-backdrop / --glass-backdrop-luma probe + the --glass-tint-ink warm-ink bucket token — the declarative backdrop-luminance axis (AX.W55 G2 / R-ios27 §CSS-1)`
3. `feat(glass): @container style(--glass-backdrop: light) bright-bucket blocks on the five rungs + .glass-material — lift the oklab tint toward ink, the iOS-26/27 darken-over-light move, ZERO new seam (AX.W55 / R-ios27 §CSS-3)`
4. `fix(dock): thread the color-mix(in oklab) tint wrapper onto the dock shell/chassis/tiers + the bright-bucket blocks — the adaptive darken now reaches the G2 surface (AX.W55 / A-glass-over-light §audit-1)`
5. `feat(glass): contrast-color() @supports foreground-ink flip + reconcile --dock-fg-on-aurora into the probe — one path, not a third fork (AX.W55 / R-ios27 §CSS-2)`
6. `refactor(glass): collapse the prefers-contrast/reduced-transparency Clear↔Tinted brackets onto --glass-level — one intensity scalar, opacity-axis distinct-but-coordinated with the tint axis (AX.W55 / A-glass-over-light §audit-4)`
7. `docs(claude): record adaptive glass legibility — the --glass-backdrop bucket, the bright-bucket darken, the dock-on-the-seam fix, the contrast-color() flip (AX.W55)`
8. `chore(AX.W55): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA (measured 4.5:1 over white) + speedtest/page-redesign consumer-leg note`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the close machinery.** The fail-CLOSED `tests-visual/` workspace (real
  device + readPixels) is the home of the binding contrast-readback close criterion. W55 cannot close on the
  SOURCE gate alone (the cardinal AX lesson — a green CPU gate over a still-unreadable live render is exactly
  the G2 gap the user reported live); W00 stands up the readPixels harness + the paired-π BEFORE/AFTER + DELTA
  protocol W55's contrast probe rides. `tests-visual/adaptive-glass.spec.ts` is a W00 workspace member.
- **AX.W52 (liquid-glass material overhaul) — HARD predecessor.** W52 fixes the blend (`screen`→`plus-lighter`)
  + corrects the `--glass-tint-source`/`--glass-tint-strength` composite seam. W55 COMPOSES on that corrected
  blend + REPOINTS the tint-seam VALUES under the backdrop probe. There is no corrected blend / settled tint
  seam to repoint until W52 lands — running W55 before W52 would build the adaptive axis on the `screen`
  lightener W52 is mid-replacing. **dependsOn AX.W52; sequence AFTER.**
- **AX.W54 (glass-first-class — the ROOT) — HARD predecessor.** W54 mints the `--glass-level` master-glassiness
  scalar (the axis W55's a11y-bracket collapse rides) + makes glass the maximal default (the legibility floor
  W55 carries). W55 CONSUMES `--glass-level` for the bracket reconcile (ONE scalar, not two). If `--glass-level`
  is not yet landed when W55 drives, the bracket-collapse defers to a W55-local `--glass-clarity` placeholder
  reconciled onto `--glass-level` when W54 lands. **dependsOn AX.W54; sequence AFTER.**
- **Downstream (waves that consume the legibility floor):** W60 + the page-redesign waves (Q4/Q7/Q9) — each
  wraps story content in a glass card over a rich background and SETS `--glass-backdrop: light` on the
  glass-card ancestor where the page background runs bright, so the card content clears AA. W34 receives the
  speedtest dock-over-light consumer-leg NOTE this wave authors. W55 sequences BEFORE the page-redesign
  legibility close.
- **Coordinates with AX.W36 (forced-colors — DISJOINT axis; binary palette-override vs continuous
  luminance-probe), AX.W45 (dock-unify-root — shared dock.css, line-region-disjoint).** Neither is a hard
  dependsOn (W55 reads each settled surface if it lands first, else the published baseline) — declared so the
  orchestrator sequences the adaptive axis after W52's blend + W54's scalar settle.

---

## Archaeology (the git / prior-tranche lineage + the research mandate)

- **G2 (the user defect — `docs/tranches/AX/audit/USER-DEFECTS-2026-06-08.md` §G + pass-2).** "Glass dock over
  VERY LIGHT materials is unreadable — dynamically darken the glass adaptively. SOTA as of iOS 27?" The pass-3
  ledger (`USER-DEFECTS-2026-06-08-pass3.md:46`) elevates the connection: "G1/W54 glass-first-class is now the
  FOUNDATIONAL ROOT wave" — the MAXIMAL glass-first decision (R3) makes content-on-glass-over-busy-backdrops
  the COMMON case, which is exactly the G2 collapse at scale. W55 is the legibility floor that keeps the
  maximal-glass default safe.
- **`AW.W23` (the `--glass-tint-source`/`--glass-tint-strength` seam — the ORIGIN of the adaptive-tint
  plumbing).** `tokens.css:838-839` minted the "content-aware adaptive tint" axis (WWDC25 sess. 219), but as a
  consumer-PUSH zero-delta no-op — a consumer must MANUALLY set the source to a sampled hue; there is NO
  automatic darkening when the backdrop is bright. The seam is ~70% built; W55 adds the missing
  backdrop-ADAPTIVE half (the probe + the bright-bucket lift).
- **`AW.W22` (the rung tint-seam wiring) — the five `.glass-*` rungs compose the oklab tint; the dock does
  NOT.** The dock composes its OWN `--glass-bg-dock` (`tokens.css:774`, a flat in-srgb mix) and applies it
  WITHOUT the oklab tint wrapper (`dock.css:146`). This is the root of G2: the surface the user reports
  unreadable is the ONE glass family OFF the adaptive seam — the source finding the SOTA lane MISSED, surfaced
  by A-glass-over-light §audit-1.
- **`AX.W52` (the `plus-lighter` blend fix) — the prerequisite substrate.** W52 fixed `screen`→`plus-lighter`
  (`glass.css:142`) — necessary (it stops the over-white wash), but still a LIGHTENER. After W52 the surface is
  correctly NOT-washed but it cannot DARKEN to re-open contrast over bright content. W52 fixed the
  wrong-direction defect; W55 adds the right-direction (darken-over-light) path.
- **HEAD `6569b7a` (the AX integrated band + the foundational-spec batch, UNPUBLISHED) — the audit baseline.**
  The zero-delta tint default (`tokens.css:838-839`), the dock off the seam (`dock.css:146,507,675,767,780`),
  the `--dock-fg-on-aurora` push twin (`tokens.css:757`), the per-rung a11y clobber (`glass.css:730,749`), the
  lightener-only blend (`glass.css:142`), and the absent contrast gate are all source-proven here.
- **The convergence corpus (the two research files).** `R-ios27-adaptive-glass.md` (the SOTA-side — the iOS
  recipe + the CSS translation + the net-new verdict) + `A-glass-over-light.md` (the SOURCE audit — confirms
  R-ios27 at file:line + adds the dock-off-the-seam finding). Both read in full before this spec — the token
  deltas, the cascade blocks, and the live checks are corpus-grounded, not speculative.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Pursuant to `docs/precepts/`; the band-B binding precepts (AX.md §2b) this wave pursues + must not violate:

- **token-first / no magic numbers (J invariant — "every visual behaviour is a CSS custom property; no
  consumer edits library source for styling").** Every magnitude is a `--glass-*` token: the `--glass-backdrop`
  bucket, the numeric `--glass-backdrop-luma`, the warm-ink `--glass-tint-ink`, the bounded AA-floor
  `--glass-tint-strength` — all overridable on `:root` / a consumer ancestor. MUST NOT re-bury a literal (the
  warm-ink is the `--glass-tint-ink` token, never an inline `var(--foreground)`; the AA-floor strength is the
  bucket-block value, recorded as the ceiling).
- **abrogate-before-patch / no-parallel-system (one-path).** The fix REUSES the EXISTING `color-mix(in oklab)`
  tint seam (ZERO new compositing seam) + the SHIPPED `@container style()` mechanism (the density precedent) +
  the EXISTING `--dock-fg-on-aurora`/`--glass-level` axes (reconciled, not forked). MUST NOT mint a parallel
  darkening compositor, a second backdrop-probe mechanism, or a third foreground-contrast fork. The dock-seam
  thread is the EXTENSION of the one seam to the surface that was missing it, not a parallel path.
- **no-backwards-compat / no-redundant-alias (MEMORY no-backwards-compat).** Clean break: the bright-bucket
  blocks override the tint VALUES; the a11y brackets collapse onto W54's `--glass-level` (no parallel
  `--glass-clarity` permanent fork — the placeholder is reconciled away when W54 lands). NO legacy alias, NO
  shim.
- **substrate-with-consumer / no-overfitting (Design-Axis-3, L invariant 8).** The `--glass-backdrop` bucket
  ships with its consumers (the five rungs + `.glass-material` + the dock/chassis — all read it via the
  `@container style()` blocks); the warm-ink token ships with its consumer (the bright-bucket re-point); the
  numeric `--glass-backdrop-luma` JS-observer ships ONLY with ≥2 consumers (dock + a form-over-aurora) OR stays
  demo-private (the DEFAULT path is the declarative bucket — no speculative observer). No overfit token.
- **deliberate-house-axis preservation (CLAUDE.md `in srgb` over `in oklab` for surface-tint).** W55 edits ONLY
  the `in oklab` glass tint axis (the perceptual-mix axis the rungs already speak); it NEVER touches the
  `--surface-tint-*` in-srgb family (the deliberate brand-calibrated house choice). The gate locks the in-srgb
  family is UNTOUCHED.
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation (README §Edicts;
  SPEC.md §Hard Gates).** The unreadable-glass-over-light is a library-internal legibility-contract violation
  (the surface fails AA over a bright backdrop); the wave makes the material clear AA. The `contrast-color()`-
  unsupported degradation to the declarative bucket floor is a BEFITTING-silent browser-API path; the
  `@container style()`-unsupported degradation to the canonical (non-darkened) glass is the graceful fallback
  (the bucket simply does not engage — the surface is the today's-glass, which is the pre-W55 state). The two
  are never collapsed.
- **Safari-compatibility (the HARD G2 constraint).** `@container style()` + `color-mix(in oklab)` (Safari-
  clean) over a JS pixel-sampler (impossible on the web); `contrast-color()` `@supports`-gated (Safari 26+) over
  a hand-authored `.dark` fork; the declarative-bucket floor carries on older Safari; `-webkit-backdrop-filter`
  (the W52-locked Safari prefix) intact. The Safari live pass is part of the binding close.
- **π visual-runtime lane (SPEC.md §π; AX.W00).** The wave closes on an EXECUTED live chrome-devtools-mcp + π
  contrast-readback audit (the dock + card over light now clears 4.5:1, the translucency floor held, the
  default path byte-identical, Safari parity) over synthetic white + bright aurora, light + dark — NOT the
  SOURCE gate alone (the cardinal AW failure this tranche corrects; G2 is the exact live-truth case the user
  reported).
- **Goal + completion criterion paired (README §Edicts; WAVE_SPEC §2a/§6).** The §Goal (the dock + card over
  light legible at ≥ 4.5:1 while STAYING translucent, the maximal-glass default kept safe, ZERO new seam) and
  the §HardGate (born-RED→GREEN `proof:adaptive-glass` + the π contrast readback) are paired; a gate-pass with
  a goal-miss (AA cleared by going opaque — losing the glass — or the dock still off the seam) closes
  `complete_with_misses`, not `complete`.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **The morph-root interp (`dock.css:507`) — resting-endpoint-only vs second-composite — RATIFY.** The
   morph-root chrome interpolates bg ACROSS the morph and must stay `color-mix(in srgb …)` for the transition;
   the adaptive darken cannot simply replace it. **Recommendation: darken the RESTING endpoint only** (the
   simpler one-axis change — the morph interp runs between two endpoints, darken the resting one so the settled
   dock clears AA; the in-flight morph frames are sub-perceptual). The counter (layer the darken as a SECOND
   composite over the morph interp) is viable if the live audit reads an unreadable in-flight frame; RATIFY
   against the live audit. No backwards-compat concern either way.
2. **The AA-band `--glass-tint-strength` ceiling — 18% vs 24% — RATIFY against the live 4.5:1 readback.**
   R-ios27 §CSS-3 bounds the floor at ≤18-24%. **Recommendation: clamp by the live readback** — set the
   strength to the LOWEST value that clears 4.5:1 over synthetic white (translucency-maximal, "let content
   through"), capped at 24%. If 24% does not clear AA over the brightest synthetic backdrop WITHOUT going
   opaque, that is a non-local gate failure → triumvirate (the bounded-vs-AA tension), do NOT raise the ceiling
   past the translucency floor.
3. **The numeric `--glass-backdrop-luma` JS-observer — ship vs demo-private — RATIFY.** The declarative bucket
   is the DEFAULT; the numeric luma (a sampled backdrop luminance set by a JS observer) is the heavier
   enhancement. **Recommendation: demo-private at landing** (the no-overfitting bar — ship the observer ONLY
   when ≥2 consumers need it: dock + a form-over-aurora). The numeric TOKEN is minted (the cascade reads it if
   set); the OBSERVER that sets it stays demo-private until the second consumer arrives.
4. **The `--glass-level`-vs-`--glass-clarity` placeholder (if W54 not yet landed) — RATIFY.** W55's a11y-
   bracket collapse rides W54's `--glass-level`. **Recommendation: dependsOn AX.W54 sequences them** — W54
   lands `--glass-level` FIRST, W55 consumes it. If the orchestrator drives W55 before W54's scalar lands, the
   bracket-collapse defers to a W55-local `--glass-clarity` placeholder reconciled onto `--glass-level` when
   W54 lands (a one-line follow, NOT a permanent parallel fork — no-backwards-compat). RATIFY at wave-open
   which scalar is live.
5. **The `contrast-color()` foreground flip — `@supports`-gated enhancement vs the bucket carries the floor
   alone — RATIFY.** `contrast-color()` is Chrome 147+/Safari 26+ (newer than the support floor). **Recommend-
   ation: `@supports`-gated PROGRESSIVE ENHANCEMENT** — the declarative bucket's warm-ink re-point carries the
   AA floor on ALL engines; `contrast-color()` refines the foreground-ink pick on supporting engines. The
   bucket is the floor; `contrast-color()` is never the sole legibility path (a non-supporting engine must
   still clear AA via the bucket). RATIFY that the bucket alone clears 4.5:1 (the `contrast-color()` block is
   refinement, not the load-bearing floor).
