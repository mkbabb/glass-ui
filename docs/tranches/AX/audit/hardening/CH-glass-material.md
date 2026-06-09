# CH-glass-material — adversarial red-team of the glass/material band (W09, W52, W54, W55, W56, W59)

**Lane** CH-glass-material · **HEAD** ~89edffc (3.8.0 + convergence) · **Verdict** WEAK
**The headline:** under MAXIMAL glass-first the glass model is NOT coherent — it is THREE divergent
specular/default disciplines (Card opt-IN, dock/Button opt-OUT-impossible, the audacious hover-scale
fork), the squircle SHIPPED state directly CONTRADICTS the USER-DECIDED R1 hinge, and the two ROOT
waves the whole band leans on (W54, W55) are STILL UNAUTHORED-IN-SRC (zero `--glass-level`, zero
`--glass-backdrop`). The "glass-first ROOT" is a SPEC, not a default.

---

## Method

Read the two just-authored spec waves (W54, W55), the MASTER-PLAN DAG + the three USER-DECIDED hinges
(R3 MAXIMAL glass-first / R1 squircle membership / PR page-redesign), USER-DEFECTS pass-3 (Q1-Q9),
PROGRESS, the W56/W52/W09/W59 wave docs + their audit JSONs, the keyframes I.W6 coordination doc, and
the live src: `button/index.ts`, `Card.vue`, `DockIconButton.vue`, `tokens.css`, `glass.css`,
`dock.css`, `theme.css`, `dock-controls.css`, `glass-specular-track.css`. Every challenge below is a
file:line probe, not a hunch.

---

## CHALLENGES (the falsifiable findings)

### C1 — The glass model is INCOHERENT: three divergent specular disciplines (the I.W6 finding is the tip)

The keyframes I.W6 coordination (`from-keyframes-IW6-dock-button-specular.md:6-17`) reports "19 dock/
`<Button>` specular tracks still bloom" where Card is clean. Confirmed at source, and it is WORSE than a
count of 19 — it is an ARCHITECTURAL divergence:

- **Card = opt-IN.** `Card.vue:74` `specular: "off"` default; `:84-85` arms the track ONLY when
  `surface==="glass" && specular!=="off"`. A bare `<Card>` carries NO `glass-specular-track` class, NO
  `::before` pointer pseudo, NO `useSpecularTracking` pointermove handler.
- **DockIconButton = opt-OUT-IMPOSSIBLE.** `DockIconButton.vue:40` hardcodes the class string
  `"dock-icon-button glass-specular-track"` and `:53` unconditionally calls `useSpecularTracking()` +
  `:69` binds `:style="specularStyle"`. There is NO prop to turn it off — every dock icon button is
  permanently a specular host.
- **glass `<Button>` = opt-OUT-IMPOSSIBLE.** The `glass`/`glass-wash` variants compose `glass-wash`
  (`button/index.ts:62-64`) which is in the `.glass-material` selector group — they inherit the
  `::before` catch-light with no off switch.

`--glass-specular-intensity-rest: 0` (`tokens.css:1973`) means at REST the tracks paint nothing, so the
"bloom" is on HOVER (`:1974` rest→hover 0→0.1). The divergence: Card's hover is clean (no track exists);
dock/Button's hover wakes the gleam. That is the OPPOSITE of cohesion. The ONE-glass-model claim
(W54 §SOTA "one rest-specular discipline") is FALSE at HEAD: there are three disciplines, and W54 (the
wave that is supposed to unify them) has not landed. **This is the glass-cohesion headline and it is
un-owned in src** — W54's FileBounds (`button/index.ts`, `glass.css`) touch the specular-default seam in
the abstract but its Scope §4 only re-authors the button DEFAULT register, NOT the specular opt-in/out
parity. The I.W6 fold is filed against W54 but W54's own scope does not explicitly enumerate
"DockIconButton/glass-Button specular → opt-in like Card." It will slip.

### C2 — The squircle SHIPPED state CONTRADICTS the USER-DECIDED R1 hinge (a decided-vs-shipped incoherence)

This is the sharpest finding. The user DECIDED (R1, `MASTER-PLAN.md:59`): *"extend [squircle] to dialogs
+ sheets + panels + glass hero cards + where befitting (large-radius surfaces). Cards + pills STAY
rounded."* The gate column says **"W56 amend."**

The SHIPPED W56 (marked `live-verified (DEVELOPED)` in PROGRESS:74) does the OPPOSITE:

- `theme.css:92-95` ships `--corner-shape-card: round`, `--corner-shape-pill: round`,
  **`--corner-shape-panel: round`**, `--corner-shape-bigdock: superellipse(...)`. There is NO
  `--corner-shape-dialog`, NO `--corner-shape-sheet`, NO `--corner-shape-hero`.
- W56 wave doc:71-73 + :114-115 EXPLICITLY records the OLD policy: *"cards, pills/buttons, small docks,
  and panels stay ROUND; the big-dock card shell is the ONE squircle surface; ... dialogs/sheets/hero
  overlays [is] a consumer-opt-in."*
- `grep corner-shape src/components/` finds it ONLY on the slider thumb + GlassDock. Dialog, Sheet,
  GlassPanel resolve no corner-shape token → they paint `round`.

So the LIBRARY ships exactly what the user OVERRODE: panel=round (user said panel→squircle), dialog/
sheet=consumer-opt-in (user said the library extends it). **The "W56 amend" task (MASTER-PLAN Batch 0)
is unexecuted, W56 is still marked live-verified, and the contradiction is recorded nowhere as a
re-open.** This is a clean-break-decided-but-shipped-stale incoherence. PROGRESS shows W56 GREEN; the
user's own decision REDs it.

### C3 — The two ROOT waves the band leans on are SPEC-ONLY; "glass-first" is not a default, it is a document

`grep glass-level src/` = **0**. `grep glass-backdrop src/` = **0**. `grep contrast-color src/` = **0**.
W54 (glass-first ROOT) and W55 (adaptive legibility) are both `planned` (PROGRESS:72-73) and write zero
src. Consequences the band cannot escape:

- **The default `<Button>` is STILL an opaque `bg-primary` solid** (`button/index.ts:26-27`). A bare
  `<Button>` over the rich page-redesign backgrounds paints a solid slab — the literal antithesis of
  pass-3 G1 ("glass FIRST for buttons EVERYWHERE"). Every Q4/Q7/Q9/W60 page-redesign wave is BLOCKED on
  W54 (`MASTER-PLAN.md:29`), and W54 is unstarted.
- **The dock-over-light G2 collapse is still live** — `dock.css:146` paints a flat `var(--glass-bg-dock)`
  with no oklab tint wrapper (W55 RED witness 2), so even the half-built `--glass-tint-*` seam can never
  reach the dock. The user reported this LIVE ("Glass dock over VERY LIGHT materials is unreadable").
- W54+W55 are MUTUALLY entangled: W55 RED witness 4 rides W54's `--glass-level` for the a11y
  bracket-collapse; W54 RED witness 3 rewrites the SAME `glass.css:730-757` brackets onto `--glass-level`.
  Both waves edit the same a11y-bracket region. If they dispatch in parallel they COLLIDE; if serial,
  W55's bracket-collapse "defers to a W55-local `--glass-clarity` placeholder" (W55:206-207) — a
  parallel-scalar fork that is exactly the "no two scalars" anti-pattern the band claims to avoid. The
  serialization is asserted by line-region but the a11y brackets are a SHARED ~27-line region both waves
  rewrite onto the same token. This is a latent merge incoherence.

### C4 — Q3 (hover reads only on click) contradicts W52's "live-verified" mark — the cardinal lesson recurred IN-BAND

W52 is marked `live-verified (DEVELOPED)` (PROGRESS:70). Q3 (pass-3, `:28`) reports LIVE: *"The HOVER
effect for the dock + buttons is NOT noticeable — only on CLICK is it visible."* The W52 JSON's own
`liveArmHandoff` (`W52-liquid-glass-material.json:85`) admits: *"The PAINTED-pixel truth is the W00 π
live audit ... NOT this SOURCE gate alone (the cardinal lesson: W09 shipped headless-green over a
still-blooming surface, which is why D19 re-opened it)."* So W52 was marked live-verified on a SOURCE
gate, the live pass found the hover imperceptible, and W52 carries the EXACT recurrence its own JSON
warned about. The hover-scale story is also INCOHERENT at source:

- `button/index.ts` has `hover:scale` on EXACTLY TWO variants (`primary-audacious` :33, `gold-audacious`
  :40). The `default`, `destructive`, `outline`, `secondary`, `accent`, `ghost`, `glass`, `glass-wash`,
  `ai`, `link` variants get NO hover scale — they hover on bg-shift alone.
- `--scale-hover-btn: 1.035` (`tokens.css:1223`) — already W52-dialed-DOWN from 1.08, and it only
  applies to the two audacious variants. So the default + glass buttons (the ones the MAXIMAL-glass
  default makes the COMMON case) have NO hover scale AND a restrained bg cross-fade → sub-perceptible.
  Q3 is correct, and W52's "live-verified" mark is inflated. The MASTER-PLAN itself flags this
  (`:49` "Q3 hover contradicts W52's live-verified mark — a cardinal re-verify candidate") but PROGRESS
  still shows W52 GREEN with no re-open status.

### C5 — No captured visual DELTA backs ANY "live-verified" mark in the band — the audit/visual/ discipline is empty

`docs/tranches/AX/audit/visual/` contains ONLY `CAPTURE-PROTOCOL.md` — zero `.png` DELTAs. Yet W52,
W56, W59, W45, W57, W53 are all marked `live-verified (DEVELOPED)`. The cardinal lesson (the governing
precept, MASTER-PLAN:6 "complete never collapses to headless-green") REQUIRES a captured DELTA artefact
(the memory note: "live-verified needs a captured DELTA artefact, not a commit-message claim"). Every
"live-verified" mark in this band is a claim without the artefact. MASTER-PLAN:52 itself flags this:
"No audit/visual/ captures — institute the screenshot discipline for every live DELTA." It is flagged
and unaddressed.

### C6 — W55's `contrast-color()` + AA-floor is a single-magnitude guess with no per-rung calibration

W55 Scope drives `--glass-tint-strength` to "a bounded AA-clearing floor (≤18-24%)" with ONE magnitude
for all five rungs + the dock. But the rungs START at different opacities (`tokens.css:681-685`:
wash 0.30 … overlay 0.95). The contrast deficit over white is a function of the rung's resting opacity
AND the foreground ink. A SINGLE bright-bucket strength cannot clear 4.5:1 on the wash rung (0.30, near-
transparent) AND stay translucent on the overlay rung (0.95, already near-opaque) — the wash needs much
more tint than the overlay to reach the same floor. W55's gate asserts strength is "in the bounded AA
band (>0%, ≤~24%)" but a single 24% lift on the wash rung over white almost certainly does NOT clear
4.5:1 body text. The wave's own open-question ("18% vs 24%") treats this as one number; it is a
per-rung curve. This will surface as a goal-miss (clears AA only on the dense rungs) at the π readback.

### C7 — The opaque escape (`--glass-level:0`) double-binds the a11y floor and the design escape onto ONE path — a legibility risk

W54 collapses `prefers-reduced-transparency: reduce` AND `prefers-contrast: more` AND the design
`.glass-opaque` utility AND `<Card tier="opaque">` ALL onto `--glass-level:0/0.3`. Elegant, but: the
reduced-transparency a11y floor needs FULLY solid (level 0); `prefers-contrast: more` is set to a
bounded 0.3 (W54:289). These are DIFFERENT legibility requirements being routed through the same scalar
at different magnitudes. If a future consumer overrides `--glass-level` globally (the `inherits:true`
cascade W54 mints, `:164`), they silently DEFEAT the a11y floor — a host setting `--glass-level: 1.5`
on `<body>` for a "clearer" aesthetic would OVERRIDE the reduced-transparency `--glass-level:0` if the
cascade specificity loses. W54 does not record a guard that the a11y bracket wins the cascade over a
consumer's ancestor `--glass-level`. The single-knob elegance has an a11y-override foot-gun.

---

## CHRONIC (the deferrals + their slip-history)

### CHR-1 — The cardinal-lesson recurrence (headless-green over broken) — recurred in THIS band, again

History: W09 marked complete on headless-green over a still-blooming surface → re-opened as D11/D19 →
W52 → W52 marked live-verified on a SOURCE gate → Q3 found the hover imperceptible live (pass-3). The
W52 JSON `liveArmHandoff:85` names this exact loop. It has now recurred at least THREE times on the same
specular/hover surface (W09 → W52 → Q3). The fix (W54 Q3 re-tune) is filed but unstarted, and W52 still
shows live-verified. This is the single most-recurrent class in the band.

### CHR-2 — The "W56 amend" (R1 squircle membership) — decided, filed, unexecuted

R1 was USER-DECIDED (MASTER-PLAN:59), filed as "W56 amend" in Batch 0, and never executed. W56 remains
marked live-verified with the SUPERSEDED policy in src (panel=round, dialog/sheet=opt-in). The decided
membership (dialogs+sheets+panels+hero) has zero src footprint. One tranche-cycle of slip so far; at
risk of shipping 3.9.0 with the contradiction intact (the page-redesign W60 will wrap hero cards that
the user said should be squircle, over backgrounds, with round corners).

### CHR-3 — audit/visual/ screenshot discipline — flagged twice, instituted as a protocol-doc only

MASTER-PLAN:52 + the memory note both demand captured DELTA artefacts. The directory holds only a
protocol doc. Every band "live-verified" mark is unbacked. Recurs from the AU/AV/F tranches (the
"live-verify capture" memory: "the cardinal-lesson inflation recurs at the PROGRESS roll-up").

### CHR-4 — PROGRESS↔decision status inflation — W52/W56 GREEN over open contradictions

W52 = live-verified over Q3; W56 = live-verified over R1. Batch 0's "Reconcile PROGRESS↔JSON" task names
this class. Both marks are stale-GREEN. The reconcile has not reached these two rows.

---

## glassCohesion verdict (under MAXIMAL glass-first)

**The glass model is NOT one model — it is divergent on every axis the user named "ROOT."**

| Surface | Default register | Specular discipline | Squircle | Hover-reads |
|---|---|---|---|---|
| Card | glass (`resting`) ✓ | opt-IN (clean default) ✓ | round (user wants hero→squircle) ✗ | bg-only |
| `<Button>` default | **opaque `bg-primary`** ✗ | n/a | round | **no hover-scale** ✗ |
| `<Button>` glass | glass ✓ | opt-OUT-impossible ✗ | round | bg-only, sub-perceptible (Q3) ✗ |
| DockIconButton | glass ✓ | **opt-OUT-impossible** ✗ | (dock=squircle ✓) | sub-perceptible (Q3) ✗ |
| Dialog/Sheet/Panel | glass ✓ | inherited | **round (R1 says squircle)** ✗ | n/a |
| Dock shell over light | glass, **off the tint seam** ✗ | — | squircle ✓ | — |

**The ONE-model gap:** there is no `--glass-level` (the unifying scalar), no shared specular opt-in
parity (Card opt-in vs dock/Button hardcoded), no squircle membership matching the user decision, no
adaptive legibility reaching the dock, and the default button is still solid. The "glass-first ROOT"
(W54) is a SPEC; the band ships FIVE divergent surfaces. Cohesion = BROKEN-pending-W54/W55, and even W54
as specced does NOT enumerate the specular opt-in parity (C1) or the R1 squircle membership (C2) — they
will slip unless added.

---

## HARDENING ACTIONS (to PERFECT the band — PLANNING, no code)

1. **AMEND W54 Scope to enumerate the specular opt-in PARITY (close C1/I.W6 architecturally, not as a
   count).** Add an explicit fold: `DockIconButton`, `DockTabButton`, and the glass `<Button>` variants
   gain the SAME opt-in/off discipline as Card (a `specular?` prop or the track-class becomes conditional
   on a default-off token), so the ONE rest-specular discipline is real. Add a `proof:glass-specular-
   cohesion` gate asserting NO surface hardcodes `glass-specular-track` without an off path. Without this
   the 19 tracks "clear on the W54 publish edge" only because rest=0 — they STILL bloom on hover, and
   the keyframes I.W6 fold is not actually closed.

2. **EXECUTE the W56 amend NOW (close C2/CHR-2) — mint the R1 membership in src.** Add
   `--corner-shape-dialog`, `--corner-shape-sheet`, `--corner-shape-sheet-top`, `--corner-shape-hero`
   = `superellipse(var(--corner-k-squircle))` to `theme.css`; flip `--corner-shape-panel` from `round`
   to squircle (user said panel→squircle); wire Dialog/Sheet/GlassPanel/hero-card to read their token
   under the `@supports (corner-shape: superellipse(2))` PE gate. Re-mark W56 `live-pending` until the
   π readback captures the squircle on dialog/sheet/panel/hero. Record the R1 supersession in the W56
   wave doc (the prior "panels stay round / dialogs opt-in" policy is OVERRIDDEN).

3. **Sequence W54 BEFORE W55 hard-serial on the shared a11y-bracket region; KILL the `--glass-clarity`
   placeholder (close C3).** W54 must land `--glass-level` FIRST so W55 NEVER mints the parallel
   `--glass-clarity` placeholder (the no-two-scalars law). Make the dependsOn a HARD gate: `proof:
   adaptive-glass` REDs if `--glass-clarity` exists in src. Run a prototype: dispatch W54+W55 serial,
   diff the `glass.css:730-757` region, confirm ONE scalar survives.

4. **Add an a11y-floor cascade-guard to W54 (close C7).** The reduced-transparency `--glass-level:0`
   must WIN over any consumer ancestor `--glass-level`. Plan: set it in a `@layer` or with a guard that
   the a11y bracket's `--glass-level` is not overridable by a lower-specificity ancestor — OR keep the
   a11y floor on a SEPARATE non-inheriting token that the level recipe `min()`s against. Add a gate
   assertion: a synthetic `:root{--glass-level:1.5}` + `prefers-reduced-transparency:reduce` still
   resolves solid.

5. **Re-tune Q3 across ALL the glass-default variants, not just audacious (close C4/CHR-1).** W54's Q3
   fold must add `hover:scale-[var(--scale-hover-btn)]` to the `default`, `glass`, `glass-wash` variants
   (the MAXIMAL-glass common case), not only re-baseline the magnitude. Plan a live A/B prototype:
   capture the hover at 1.035 vs 1.045 vs 1.05 on the GLASS button (not audacious) over aurora, pick the
   perceptibility floor, capture the DELTA. Re-mark W52 `live-pending` until Q3 is captured-closed.

6. **Per-rung AA calibration for W55 (close C6).** Replace the single bright-bucket strength with a
   per-rung lift (the wash rung needs more tint than the overlay rung to clear the same 4.5:1). Prototype:
   the π contrast-readback over white for each of the five rungs at a candidate strength; derive the
   per-rung magnitude that clears 4.5:1 while keeping the most-translucent rung still glass. Capture the
   readback table as the W55 calibration artefact.

7. **Institute the captured-DELTA discipline as a CLOSE GATE, not a protocol doc (close CHR-3/CHR-4).**
   `proof:live-verified-ledger` (Batch 0) must REQUIRE a `audit/visual/<wave>-{before,after}.png` pair
   for every `live-verified` mark, and RED if a row is marked live-verified with no captured DELTA.
   Re-mark W52 + W56 `live-pending` until their DELTAs are captured (Q3 hover; R1 squircle). This is the
   single forcing function that breaks the headless-green inflation loop.

---

## Verdict: WEAK

The band has a coherent SPEC (W54/W55 are well-architected single-knob designs) but the SHIPPED state is
incoherent on every ROOT axis the user named, the two unifying waves are unstarted, the squircle ships
the OPPOSITE of the user decision, and two waves carry inflated live-verified marks over open
contradictions (Q3, R1). It is not BROKEN (the pieces compose; W52/W56 landed real value) but it is
WEAK — the "glass-first ROOT" is a document, not a default, and W54-as-specced will miss the specular
parity (C1) and the squircle membership (C2) unless amended.
