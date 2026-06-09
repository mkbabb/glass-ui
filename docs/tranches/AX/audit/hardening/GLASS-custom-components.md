# Hardening challenge — GLASS-custom-components

**Lane** glass-cohesion red-team across EVERY `src/components/custom/` component.
**Question** Do the custom components share ONE glass identity, or fork it N ways?
**Verdict** WEAK — the custom band is NOT one glass model. There are at least **5
divergent glass surfaces** + **1 confirmed default-discipline split** that the MAXIMAL
glass-first hinge (W54) does NOT reconcile, plus a foundational canon CONTRADICTION
(no-glass-on-glass vs maximal-glass-first) that nobody owns.

HEAD ~89edffc / 3.8.0+convergence. Source-grounded at file:line throughout.

---

## The unified glass model (the reference the forks are measured against)

`glass.css §components` is the SINGLE source for the band material (AW.W22 fold):

- The five ladder rungs + `.glass-card` + `.glass-specular-track` + `.dock-icon-button`
  compose `.glass-material` (`glass.css:54-64`) — ONE rim, ONE moving-specular `::before`,
  ONE grain `::after`.
- Every rung background routes through the adaptive tint seam:
  `color-mix(in oklab, var(--glass-bg-<rung>), var(--glass-tint-source) var(--glass-tint-strength))`
  (`glass.css:220,240,251,267,278,380`). This is the W55 adaptive-legibility hook — a glass
  surface gets darken-over-light legibility FOR FREE by routing its bg through this mix.
- W54 will thread `--glass-level` through the opacity recipe (`tokens.css:769-775`, all seven
  rungs incl. dock) + the blur radii (`tokens.css:711-728`) — so a token-routed surface
  clarifies/solidifies on ONE knob.

**The cohesion test:** does a custom surface (a) compose `.glass-material` (or a ladder rung)
so it inherits the rim/specular/grain, AND (b) route its background through the tint seam so
W55 reaches it, AND (c) read `--glass-bg-*`/`--glass-blur-*` tokens so `--glass-level` reaches
it? A surface that hand-rolls its own bg/rim/specular, or reads `--surface-tint-*` instead of
`--glass-bg-*`, FORKS — it will silently miss the level knob, the adaptive legibility, or both.

---

## CHALLENGE 1 — the DOCK SHELL forks the glass model BY DESIGN, and the fork bypasses W55 (CONFIRMED, BROKEN)

`glass.css:46-50` records the fork as intentional:

> "The `.glass-dock` SHELL is OUT of this group BY DESIGN — it hand-rolls a parallel surface
> (its own `--glass-*-dock` family + a local rim + an instrument-strip `::before`) the dock
> arm owns; the dock's catch-light lives on its CONTROL (`.dock-icon-button`), not the shell."

So the dock shell:
- Has its own opacity/blur/border primitives — `--glass-opacity-dock: 0.42` (`tokens.css:746`),
  `--glass-blur-dock-radius: 11px` (`tokens.css:709`), `--glass-border-dock` (`tokens.css:783`).
- Hand-wires its rim into `box-shadow` (`dock.css:152` — `var(--glass-edge-light), var(--shadow-dock...)`)
  rather than the unified material `::after` inset ring.
- **Bypasses the tint seam entirely.** `grep glass-tint src/styles/dock.css` = ZERO. The dock
  reads `var(--glass-bg-dock)` RAW at `dock.css:146`, NOT wrapped in
  `color-mix(in oklab, …, --glass-tint-source …)`. Every `.glass-*` RUNG routes its bg through
  that mix (`glass.css:220-380`); the dock does not.

**Why this is BROKEN, not merely divergent:** the dock is the LITERAL G2 surface — the user's
own defect is *"Glass dock over VERY LIGHT materials is unreadable — dynamically darken the
glass adaptively"* (`AX.W55` charter). W55's adaptive-legibility tint reaches a surface by
re-pointing `--glass-tint-source`/`--glass-tint-strength` at the seam. The dock is OFF the
seam, so **W55 cannot darken the dock without a dock-specific second hook** — the A-glass-over-light
audit already flagged this (`AX.W55` Audit line: *"the DOCK — the literal G2 surface — bypasses
the `--glass-tint-*` seam entirely, so the adaptive hook must reach `dock.css`, not only
`glass.css`'s five rungs"*). W54's FileBounds confirms glass(`--glass-level`) but writes NO
dock tint reconciliation (`AX.W54:198` only confirms the dock surface "is already glass").

**Falsifiable:** `grep -c glass-tint src/styles/dock.css` = 0; every other rung file has ≥1.
The dock's bg is `var(--glass-bg-dock)` not `color-mix(in oklab, var(--glass-bg-dock), …)`.

**Mitigant (fair weighting):** the dock CONTROL (`.dock-icon-button`) IS in the `.glass-material`
group (`glass.css:62,88`), so the dock's interactive catch-light DOES share the unified specular.
And the OPACITY of `--glass-bg-dock` IS in the W54-threaded recipe (`tokens.css:774`), so
`--glass-level` WILL reach the dock shell's clarity. The fork is the SHELL's tint + rim, not the
whole dock. But the legibility miss is real and user-reported.

---

## CHALLENGE 2 — the TIMELINE hand-rolls a glass surface off `--surface-tint-*`, not the ladder (BROKEN)

`ScrubberTimeline.vue:135-189` builds `.glass-track`/`.glass-fill`/`.glass-thumb` with:
- `background: var(--surface-tint-6)` (track), `var(--surface-tint-8)` (fill/hover),
  `var(--surface-tint-25/40)` (thumb) — the foreground-over-transparent overlay family,
  NOT `--glass-bg-*`.
- `backdrop-filter: var(--glass-blur-wash)` (`:141`) — reads the blur token (so blur scales with
  `--glass-level`) but the OPACITY is a fixed `--surface-tint-*` literal.

`ContinuousRail.vue:88`, `SegmentedTimeline.vue:132`, `ContinuousMarkers.vue:329` all read
`--glass-blur-wash`/`--glass-border-floating` raw but compose their own bg.

**Why BROKEN under glass-first:** the timeline's "glass" surface will NOT clarify with
`--glass-level` (its opacity is a fixed `--surface-tint-6`, off the recipe) and will NOT darken
with W55 (off the tint seam). It reads as glass at level=1 by coincidence of token values, but
it is a PARALLEL glass — the level knob moves the five rungs + dock and leaves the timeline at a
fixed translucency. A consumer who sets `--glass-level: 0` for an opaque-escape page gets solid
buttons/cards/dock and a STILL-TRANSLUCENT timeline scrubber. Incoherent.

**Falsifiable:** `grep surface-tint src/components/custom/timeline/ScrubberTimeline.vue` = 5 hits;
`grep glass-bg src/components/custom/timeline/*.vue` = 0. The timeline never reads a `--glass-bg-*`
opacity token.

---

## CHALLENGE 3 — the CONFIGURATOR shell conforms but its preset chips + dividers are opaque washes (WEAK)

`Configurator.vue:130` — the shell IS `glass-floating` (conforms, inherits material). GOOD.
But the chrome INSIDE the shell forks:
- The preset picker chips (`:237-239`): active = `bg-foreground text-background` (a SOLID
  foreground slab); inactive = `bg-card/40 … hover:bg-card/70` (opaque card washes, no glass tier).
- The aside/preset/footer dividers (`:206,215,271`): `border-border/40` hairlines — fine as
  hairlines, but the chips are the issue.

**Why WEAK (and the canon trap):** under MAXIMAL glass-first ("buttons + items EVERYWHERE …
glass", `USER-DEFECTS pass3:13`) the preset chips ARE buttons/items — they should read glass,
not `bg-card/40`. But here is the CONTRADICTION (see Challenge 5): the chips sit INSIDE the
`glass-floating` shell, so making them glass is glass-on-glass — which `glass.css:1-19` forbids.
So the Configurator is caught between two un-reconciled laws. As-is it forks (opaque chips inside
glass shell); the "fix" the user mandates collides with the recorded no-glass-on-glass canon.

**Falsifiable:** `Configurator.vue:238` literal `bg-card/40 … hover:bg-card/70` on the chip; no
`glass-*` tier, no `--glass-bg-*`.

---

## CHALLENGE 4 — the 19-track SPECULAR BLOOM: dock + glass Button default-ON while Card is default-OFF (BROKEN, CONFIRMED by the keyframes agent)

`from-keyframes-IW6-dock-button-specular.md:5-17` + orchestrator assay (HEAD 0b4bf79):

- `--glass-specular-intensity-rest: 0` globally (`tokens.css:1973`); W52 made `<Card>` opt-IN
  (`Card.vue:97` → tame 0.04, default surfaces stay 0).
- BUT the **dock controls + glass `<Button>` variants attach `glass-specular-track` by default**
  (DockIconButton.vue, button/index.ts, dock-controls.css) — never made opt-in like Card.
- Result: **19 dock/button specular tracks bloom where the stage cards are clean** — a live,
  cross-repo-observed (keyframes 3.8.0 assay) cohesion split in the rest-specular discipline.

This is the EXACT cohesion miss the lane prompt names. It is one glass model fracturing into
"Card: rest-specular off" vs "dock/Button: rest-specular on." It folds into W54 per the
coordination doc, but W54 is `planned` — UNADDRESSED at HEAD.

**Falsifiable:** mount the buttons page; a glass `<Button>` at rest shows a specular track
(`--specular-intensity` resolves > 0 via the default attach), while a `<Card>` shows none.

---

## CHALLENGE 5 — FOUNDATIONAL INCOHERENCE: no-glass-on-glass canon CONTRADICTS the MAXIMAL glass-first hinge, and NEITHER doc reconciles it (INCOHERENT)

`glass.css:1-19` records, as standing library canon (AV.W15 D5):

> "A glass surface nested INSIDE another glass surface is a discipline violation — the inner
> surface should read as a FLAT tier (a `--card`/`--muted` fill), not a second `.glass-*` plate
> (the blur stacks muddy, the rim doubles, the read collapses). … inside a glass panel, compose
> flat tiers."

The W54 MAXIMAL hinge mandates the OPPOSITE (`MASTER-PLAN.md:58`, R3):

> "USER-DECIDED: MAXIMAL — everything glass … containers, chrome, buttons, AND content panels."

W54's spec (`AX.W54:258-267`) ACKNOWLEDGES the two-layer law and says the user "OVERRODE it to
MAXIMAL … W55 adaptive-over-light carries the legibility." **But it stops there.** It does NOT:
- amend or delete the `glass.css:1-19` no-glass-on-glass canon block (W54's FileBounds touches
  `glass.css:730-757` + `.glass-opaque` only — the canon comment is OUT of bounds).
- give a rule for the COMMON maximal case: a `glass-wash` MetricCell inside a `glass-floating`
  Configurator inside a glass page card — three glass layers deep. MetricCell is DESIGNED to nest
  ("`appearance="bare"` drops the surface for consumers that host the cell inside a larger panel",
  `MetricCell.vue:79-99`), i.e. its own doc assumes the no-glass-on-glass discipline that W54 voids.

So the library will ship with TWO contradictory recorded laws and no resolution for the
glass-on-glass MUD the canon warns about ("the blur stacks muddy, the rim doubles, the read
collapses"). W55's legibility carries CONTRAST, not blur-stacking — darkening a doubly-blurred
surface does not un-muddy the stacked blur. **This is the deepest gap: the ONE-model question
the lane asks is unanswerable until someone reconciles maximal-glass-first with the blur-stacking
physics the no-glass-on-glass canon exists to prevent.**

**Falsifiable:** `glass.css:1-19` (forbid) vs `MASTER-PLAN.md:58` (mandate) vs `AX.W54` FileBounds
(does not touch the canon block) — the contradiction is un-reconciled in source AND spec.

---

## CHALLENGE 6 — ExpandableContainer trigger hand-rolls an arbitrary glass via inline `[backdrop-filter:…]` (WEAK)

`ExpandableContainer.vue:5,23` — the trigger is
`bg-card/70 [backdrop-filter:var(--glass-blur-wash)] … border border-border/40`. An arbitrary
Tailwind backdrop-filter over a `bg-card/70` opaque wash. It reads the blur token (blur scales)
but the opacity is `bg-card/70` (off the recipe → no `--glass-level`, no tint). A fifth parallel
glass. Lower severity (a small trigger button), but it is one more divergent surface that won't
move with the level knob. Also note `bg-background` solid for the expanded fullscreen surface
(`:20`) — fine (opaque-escape case) but un-named (not `.glass-opaque`).

**Falsifiable:** `grep '\[backdrop-filter' src/components/custom/expandable-container/ExpandableContainer.vue`
= 2 hits; arbitrary inline, not a glass tier.

---

## The cohesion verdict (glassCohesion)

**Under MAXIMAL glass-first, the custom band is NOT one model — it is 1 unified ladder + the
dock-control + ~5 forks.** CONFORM: DialogNative (`glass-top-layer glass-floating`), MetricCell
(`glass-wash`), GlassPanel (composes the ladder, reads `--glass-bg-*`), the Configurator SHELL
(`glass-floating`), the dock CONTROL (`.dock-icon-button` ∈ `.glass-material`). DIVERGE: the dock
SHELL (own primitives + rim, OFF the tint seam → W55 can't reach it), the timeline
(`--surface-tint-*` not `--glass-bg-*` → neither level nor tint reaches it), the Configurator
CHIPS (opaque `bg-card/40`), the ExpandableContainer trigger (arbitrary inline glass), and the
default-specular split (dock/Button bloom-on vs Card bloom-off). **The ONE-model gap:** three
surfaces (dock shell, timeline, expandable trigger) read glass tokens à la carte (the blur, maybe
a border) but NOT the `--glass-bg-*` opacity recipe or the oklab tint seam, so the two newest
glass axes — `--glass-level` (W54 clarity) and `--glass-tint-*` (W55 legibility) — reach the five
rungs and stop. A consumer turning the master glass knob gets a half-responding library. And the
no-glass-on-glass canon (`glass.css:1-19`) flatly contradicts the maximal-glass-first mandate with
no recorded reconciliation, leaving the most common nested case (cell-in-panel-in-page-card)
undefined and physically muddy.

---

## CHRONIC

- **Headless-green-over-broken recurrence — the specular bloom is a textbook instance.** W52
  shipped `live-verified (DEVELOPED)`; the keyframes 3.8.0 assay then found 19 dock/Button tracks
  blooming (`from-keyframes-IW6…:5`). The default-OFF discipline was applied to Card and declared
  done, while dock+Button silently kept the rest-specular on — exactly the "complete collapses to
  headless-green" class the cardinal lesson exists to catch. Slip history: W09 (specular tune)
  marked `complete` on headless-green while its own JSON said live-pending → re-opened to
  `live-pending` at the convergence round (`PROGRESS.md:25,185`); the bloom is the SAME specular
  cohort surfacing a SECOND time at the cross-repo edge.
- **The dock parallel-surface fork is a multi-tranche carry.** "BY DESIGN" since AV.W15
  (`glass.css:46`); the tint-bypass was flagged by the A-glass-over-light audit (convergence2) and
  routed to W55, but W55 is `planned (spec authored)` — the dock has been the named G2 unreadable
  surface across pass-2 AND pass-3 and the structural reason (off the tint seam) is STILL un-fixed.
- **The no-glass-on-glass vs maximal-glass contradiction has been latent since the R3 decision**
  (2026-06-06 user hinge, `MASTER-PLAN.md:58`) and survived the W54 spec authoring without
  reconciliation — a foundational-spec gap the Batch-0 "AUTHOR the missing foundational specs" step
  was meant to close but did not.

---

## Hardening actions (PLANNING — no code)

1. **AMEND W54 to OWN the glass-cohesion reconciliation, not just the level scalar.** Add a fold:
   reconcile the `glass.css:1-19` no-glass-on-glass canon WITH the maximal hinge. The resolution
   the physics demands: maximal glass-first means glass is the DEFAULT REGISTER, but nested glass
   must step DOWN the `--glass-level` (outer panel level=1, inner cell level≈0.4 toward opaque) so
   the blur does not stack — i.e. the level scalar IS the reconciliation tool (nest = decrement
   level, not forbid glass). Record this as the canonical nested-glass rule; rewrite the
   `glass.css:1-19` block from "compose flat tiers inside glass" to "step down `--glass-level`
   inside glass." This is the ONE-model answer the lane is missing.

2. **Add a W54/W55 fold to route the DOCK SHELL bg through the tint seam.** Change `dock.css:146`
   from `background: var(--glass-bg-dock)` to
   `background: color-mix(in oklab, var(--glass-bg-dock), var(--glass-tint-source) var(--glass-tint-strength))`
   — the SAME recipe the five rungs use — so W55's adaptive-darken reaches the literal G2 surface
   with ZERO new dock-specific hook. This collapses the dock onto the ONE tint axis without
   touching its (legitimately distinct) rim/shadow shell identity.

3. **Reconcile the TIMELINE glass surfaces onto `--glass-bg-*` + the tint seam.** Re-author
   `ScrubberTimeline.vue:135-189` (+ ContinuousRail/SegmentedTimeline) to read a `--glass-bg-*`
   opacity token (wash for the track) routed through the tint mix, instead of `--surface-tint-6/8`.
   Then the level knob + W55 reach the timeline. Prototype: set `--glass-level: 0` on the timeline
   story and confirm the scrubber goes solid in lockstep with the buttons/dock (today it stays
   translucent — the falsifiable failing case).

4. **Fold the 19-track specular default-off into W54 explicitly** (the coordination doc already
   routes it here). Make the dock controls + glass Button variants default-OFF at rest like Card
   (`--glass-specular-intensity-rest: 0` honored, not overridden by the default track attach);
   hover/active lift the gleam per Q3. Live-verify: a glass `<Button>` AND a dock icon at rest show
   NO specular track, matching the clean Card — capture the DELTA (the 19→0 track count the
   keyframes agent measures) as the binding close, not a headless gate.

5. **Configurator chips + ExpandableContainer trigger** — once the nested-glass rule (action 1)
   lands, re-author these to glass at a STEPPED-DOWN level (the inner-glass register), replacing
   `bg-card/40`/`bg-card/70`/the arbitrary inline `[backdrop-filter:…]` with a real glass tier at
   the nested level. They become consumers of the ONE model rather than two more forks.

6. **Add a cohesion GATE** (`proof:glass-cohesion`, born-RED): assert NO custom-component SFC/CSS
   composes a backdrop-blurred surface off `--surface-tint-*` or an arbitrary `[backdrop-filter:…]`
   inline without reading a `--glass-bg-*` token (catches the timeline + expandable forks); assert
   every backdrop-blurred custom surface either composes a `.glass-*`/`.glass-material` class OR
   routes its bg through the oklab tint seam (catches the dock-shell tint-bypass). This is the
   machine-lock that keeps the band from re-forking after W54/W55 land — the forks above all
   slipped precisely because there was no gate asserting one-model.
