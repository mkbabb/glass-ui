# R-path-glass — PATH FORWARD: the glass-first-class identity + the squircle pivot + the material (the G-band)

**Lane** R-path-glass · **Type** PLANNING (path-forward synthesis, no code) · **HEAD** `77c08c5`
(pass-3 defect ledger; the glass-band source landed at `5cf2980` / `8e17346` / `a730782` and below)
**Scope** synthesize the gestalt path for the G-band glass IDENTITY: W52 (material — DONE) → W56
(squircle — DONE) → W59 (slider consumer — DONE) → **W54 glass-first-class (the now-ROOT wave)** →
**W55 adaptive-glass** → the coherence + page-redesign downstream.
**Read corpus** AX.md charter · PROGRESS.md (W52-W59 rows) · CONVERGENCE-PLAN-2.md · USER-DEFECTS
pass-2 §G + **pass-3 (the reshaping)** · wave docs W52/W56/W59 (full) · research R-glass-default /
R-ios27-adaptive-glass / R-squircle / A-glass-tokens / A-squircle-pivot · the W-glass-material
inventory · LIVE source verification of theme.css/tokens.css/glass.css/utilities.css/Card/Slider.

> This lane is the PATH-FORWARD synthesis for the G-band. It does NOT re-inventory the per-wave
> status (the W-glass-material lane already did that, GREEN). It answers: given W52/W56/W59 shipped
> and **pass-3 just bumped glass-first-class to the ROOT foundational wave**, what is the gestalt,
> idiomatic, token-first path that completes the glass identity and unblocks the page-redesign band —
> with NO quick fixes, NO glass-everywhere over-reach, NO duplicate token axes.

---

## 0 — The reshaping (why this lane re-opens vs the W-glass-material inventory)

The W-glass-material lane inventoried at `b03246c` and correctly read W52/W56/W59 DONE + W54/W55
NOT-STARTED. **HEAD has since advanced to `77c08c5` with the pass-3 defect ledger
(`USER-DEFECTS-2026-06-08-pass3.md`), which materially reshapes the G-band path forward:**

1. **Glass-first-class (G1/W54) is bumped from "a NET-NEW G-band wave" to the FOUNDATIONAL ROOT
   wave** — verbatim: *"The default for ALL items is their glass variants — fix at the ROOT … GLASS
   FIRST for buttons + items EVERYWHERE, and in the dock."* It now **BLOCKS the entire page-redesign
   umbrella** (pass-3 Q4/Q7/Q9 — "all pages re-designed with proper containers + design hierarchy,
   contain items in GLASS CARDS"). W54 is no longer a tidy docs+token slice at the back of the band;
   it is the keystone the demo-IA reinvention rides.
2. **Q3 reveals W52's hover loop did NOT fully close on the LIVE product** — verbatim: *"The HOVER
   effect for the dock + buttons is NOT noticeable — only on CLICK is it visible. The hover state
   must read on hover, not just active."* W52 is marked `live-verified (DEVELOPED)` in PROGRESS.md,
   yet the user's pass-3 live pass says the hover is still imperceptible. This is the **cardinal
   lesson recurring inside the glass band itself** (a wave marked live-verified that the next live
   pass refutes). W52's hover register needs a re-open arm, NOT a re-author of the material.
3. **The RATIFY hinge sharpens, it does not resolve.** Pass-2 G1 asked *"why is the DEFAULT not
   glass?"*; the research answered *"glass is the navigation-band default by design; content stays
   opaque (no-glass-on-glass)."* Pass-3's *"fix at the ROOT, glass FIRST everywhere"* pushes HARDER
   toward content glass. The tension between the user's "glass everywhere" framing and the SOTA +
   library `no-glass-on-glass` discipline is now LOAD-BEARING and must be ratified before W54 lands —
   it is the single highest-leverage decision in the band (see §4 + R-needs-user-decision).

This lane folds those three shifts into the path. The band is NOT "two un-authored waves at the
back" anymore — W54 is front-and-center foundational, and W52 carries a live-truth re-open.

---

## 1 — The G-band spine at HEAD (what the path stands on)

The shipped material is correct and live-verified; the path builds ON it, does not re-touch it.

| Wave | Role in the identity | State | Source anchor (verified at HEAD) |
|---|---|---|---|
| **W52** | the material LOOK — bounded edge gleam, plus-lighter, calm saturate, smooth hover | **DONE** + a Q3 hover re-open | `glass.css:121/132` bounded gleam, `:142` plus-lighter; `tokens.css:859` `--glass-specular-size:36%`; `utilities.css:715/1040` `--scale-hover-btn:1.035` on `--spring-smooth` |
| **W56** | the corner SHAPE axis — `--corner-k-*` + `--corner-shape-*`, big-dock squircle, cards round | **DONE** | `theme.css:81-100` the full token axis; `--corner-shape-bigdock: superellipse(var(--corner-k-squircle))` |
| **W59** | the FIRST consuming atom — integrated-cylinder glass slider + track-height squircle thumb | **DONE** | `theme.css:100` `--corner-shape-thumb`; `Slider.vue:313` `corner-shape: var(--corner-shape-thumb)` |
| **W09** | the moving-specular ALPHA + the 3 fixed-anchor radials | **DONE (absorbed by W52)** | the cohort + `useSpecularTracking` + dock corner radials all settled |
| **W54** | glass-first-class — `--glass-level` scalar + `opaque` escape + the ROOT default + the canon | **NOT-STARTED → now ROOT foundational** | `grep glass-level src/` = NONE |
| **W55** | adaptive-glass-legibility — iOS-27 backdrop-luminance darken-over-light | **NOT-STARTED** | `grep glass-backdrop src/` = NONE |

**The seam the path threads through is PROVEN sound.** The whole glass LEVEL is consumed in exactly
ONE place (`tokens.css:769-775` — the `--glass-bg-*` `color-mix(in srgb, var(--card) calc(α*100%),
transparent)` recipe), with the blur ladder factored radius-first (`tokens.css` `--glass-blur-*-radius`
→ `--glass-blur-*`), and the opaque endpoint already produced by the `prefers-reduced-transparency:
reduce` bracket (`glass.css:730`). So `--glass-level` (W54) folds in at ONE `calc()` site with zero
fan-out, and `--glass-tint-source`/`--glass-tint-strength` (`tokens.css:838-839`, default zero-delta
no-op) is the EXACT seam W55's darken-over-light re-points — no new compositing for either wave. **The
two remaining waves are ADDITIVE on a verified-clean seam, not a rebuild.**

---

## 2 — DEFERRED items that MUST FOLD INTO this tranche

1. **W54 (glass-first-class, G1) — un-authored, research-complete, NOW the ROOT foundational wave.**
   The bbnf wave doc does NOT exist (`ls waves/ | grep W54` = none). The three-fold deliverable
   (R-glass-default §DEDUP + A-glass-tokens §GESTALT) is unchanged in SHAPE but ELEVATED in
   precedence + scope by pass-3:
   - **(a) `--glass-level`** — ONE `@property`-registered scalar (`syntax:"<number>"; inherits:true;
     initial-value:1`) threaded through BOTH ladders at their single sites: the `--glass-bg-*`
     `color-mix` (invert the multiplier so `1 - (1-α)*level`, `level=0`→solid `--card`, `level=1`→
     byte-identical-to-today, `>1`→clearer) AND the `--glass-blur-*` radii (`blur(radius*level)`) so
     opacity + diffusion move in lockstep (the SOTA single-knob).
   - **(b) the `opaque` first-class rung** — `.glass-opaque { --glass-level: 0 }` routing through the
     SAME machinery, + `CardTier` widened to include `opaque`. The GESTALT collapse: **rewrite the
     `prefers-reduced-transparency` + `prefers-contrast` brackets (`glass.css:730+`) to set
     `--glass-level` instead of clobbering ten `--glass-opacity-*` rungs individually** — ONE override
     line replaces ten, and the a11y brackets + the design knob + the opaque rung all ride ONE path.
   - **(c) the two-layer-law canon doc** in CLAUDE.md (glass = navigation/overlay default BY DESIGN;
     content layer opaque BY DESIGN; `no-glass-on-glass`).
   - **(d) PASS-3 ESCALATION — the "glass FIRST everywhere" arm.** Pass-3 wants buttons + items glass
     by default, AND the dock's selected-element glass (keyframes dock = the model). This is NOT the
     glass-everywhere over-reach the research warns against — it is the `glass`/`glass-wash` BUTTON
     variants becoming the DEFAULT register where they are functional-layer, + the dock selected-state
     reading as glass. The W54 author must split the legible "navigation-band glass-first" arm (DO)
     from the "content-layer glass" over-reach (DO NOT, gated against re-breaking W52 legibility).
   **dependsOn W52** (the material must be stable before `--glass-level` multiplies it). **Coordinate
   with W36** (one opaque path). **The page-redesign umbrella (Q4/Q7/Q9 → likely a NET-NEW demo-IA
   wave) is BLOCKED on W54** — it lands first.

2. **W55 (adaptive-glass-legibility, G2) — un-authored, research-complete.** Per
   R-ios27-adaptive-glass §VERDICT: a `--glass-backdrop`/`--glass-backdrop-luma` declarative bucket
   via the SHIPPED `@container style()` mechanism (the density-cascade precedent); the bright bucket
   lifts `--glass-tint-strength` to a bounded AA floor (≤~18-24%) + re-points `--glass-tint-source` to
   low-luminance warm-ink — the "locally darken over light backdrops" move, ZERO new compositing seam
   (reuses the existing `color-mix(in oklab)` tint seam at `tokens.css:838`); `contrast-color()`
   `@supports`-gated foreground flip (Chrome 147+/Safari 26+); a `--glass-clarity` Clear↔Tinted escape
   reconciled with the existing `prefers-contrast`/`prefers-reduced-transparency` brackets (NOT a third
   fork); a `proof:adaptive-glass` π gate (4.5:1 over synthetic white). **dependsOn W52+W00.** **W36 is
   the WRONG anchor** (forced-colors is a binary palette override, disjoint from a continuous luminance
   probe) — the research EXPLICITLY rejects folding G2 into W36. This wave directly resolves pass-2
   G2's "glass dock over VERY LIGHT materials is unreadable."

3. **W52 hover re-open (pass-3 Q3) — must fold in, NOT silently assumed-closed.** Q3 says the hover
   is imperceptible live ("only on CLICK is it visible"). At source the hover lift is `--scale-hover-btn:
   1.035` on `--spring-smooth` (a deliberately restrained, sub-perceptual settle — W52 §6 doctrine).
   The diagnosis: W52 dialed the hover DOWN so far (to fix the "egregious specular HOVER" and the 1.08
   snap) that it now reads as NOTHING on hover. This is a TUNE re-open (the magnitude overshot the
   other way), routed to W52's hover arm OR the dock-band DK2 (the dock hover/select state) — NOT a
   material re-author. The glass-first-class W54 arm must ALSO ensure the glass BUTTON hover reads (a
   glass surface's hover is its specular gleam + a perceptible scale). Fold the Q3 re-tune into the
   W54 development pass (the band's hover register is one of W54's deliverables).

4. **The DELTA-artefact + audit-JSON coherence gap (the W00-protocol close obligation).** No
   `W52-DELTA.md` / `W56-DELTA.md` / `W59-DELTA.md` paired-π BEFORE/AFTER capture exists, and the
   W09/W52/W56/W59 audit JSONs still read `live-pending` while the commits + PROGRESS mark them
   `live-verified`. This is the soundness canary the cardinal lesson institutionalizes — folds into
   band close.

---

## 3 — GAPS (unaddressed prompts / plan divergences)

- **Q3 is a LIVE-TRUTH refutation of a "live-verified" wave — the band's own cardinal-lesson
  instance.** W52 is stamped `live-verified` yet pass-3's live pass found the hover broken. The path
  MUST treat W52 as carrying an open hover arm; closing the band `complete` while Q3 stands would
  repeat the exact AW failure class. The fix is a re-tune (1.035 is too low to read on hover) +
  re-verify, captured in a DELTA — not a stamp.

- **The "glass FIRST everywhere" RATIFY hinge is unresolved and now higher-stakes.** Pass-3's "fix
  at the ROOT, glass FIRST for buttons + items EVERYWHERE" pulls harder toward content-layer glass
  than pass-2's "why is the default not glass." SOTA (Apple two-layer law) + library `no-glass-on-glass`
  (`glass.css:1-28`) say content stays opaque. **Recorded default if un-ratified:** navigation/overlay-
  band glass-first + buttons-glass-where-functional + dock-selected-glass; do NOT glass the content
  layer (a data table, a form). The user must confirm the boundary BEFORE W54 lands, because W54 is
  the foundation the page-redesign rides — a wrong call propagates to every page. This is surfaced to
  R-needs-user-decision; the W54 author opens it as a Class-3 RATIFY hinge.

- **No machine-lock for the `no-glass-on-glass` content-band invariant.** The single load-bearing
  thing W54 must NOT regress (content stays opaque) has no proof asserting it. The W54 gate
  (`proof:glass-level`) MUST carry a CONTENT-BAND-STAYS-OPAQUE assertion (the content Card default
  tier resolves no `backdrop-filter`, the nav/overlay band resolves glass) so a later "glass
  everywhere" agent cannot silently re-break the legibility W52 fixed.

- **The glass-identity token axes are not cross-walked for coherence.** Four `@property`/token axes
  converge on the same surfaces — `--glass-level` (W54), `--corner-k-*`/`--corner-shape-*` (W56,
  landed), `--glass-backdrop-luma`/`--glass-clarity` (W55), `--superellipse-k`/`--morph-t` (W42). None
  has authored its cross-ref against the OTHERS. The path needs ONE coherence pass so the scalars are
  non-overlapping, the a11y brackets ride ONE opaque path (`--glass-level:0`, not per-rung clobber +
  W36 + W55 each forking), and W42's animated `k` reads the single `--corner-k-squircle` vocabulary.

- **G4 (Apple liquid + squishy mirror) has no named wave + no close cross-walk.** Pass-2 G4 ("audit
  apple.com/os liquid + squishy effects — mirror them") folds implicitly into W52-ratify (the
  press-squash atom, maxStretch ~1.06-1.10) + W53 (the elastic tab indicator) + W05 (the confirmed
  Apple spring numbers). The squish-spring residue (volume-preserving press-squash) should be
  confirmed reaching ALL glass atoms (button `.tap-squish`, slider cap `scaleX` squish, dock press) as
  ONE register at band close — currently un-cross-walked.

- **W59's `--corner-shape-thumb` extended the W56 axis WITHOUT a W56-doc cross-ref.** W59 minted
  `--corner-shape-thumb` (`theme.css:100`) on the W56 `--corner-k-squircle` vocabulary, correctly (one
  `k`, no second definition), but the W56 doc's "and the like" candidate list does not record the
  thumb as a consumer. Minor ledger hygiene for the coherence pass.

---

## 4 — The gestalt PATH FORWARD (planning, not code)

The G-band is the most-converged band in AX: the LOOK (W52), the SHAPE (W56), and the first consuming
atom (W59) are shipped + live-verified, forming a coherent liquid-glass identity. Pass-3 re-prioritizes
the two remaining waves: **W54 is now the foundational ROOT wave the page-redesign rides, and W52
carries a live-truth hover re-open.** The path is AUTHOR (W54 first, then W55), RE-TUNE (the Q3 hover),
DOCUMENT (DELTAs + canon), and COHERE (the token-axis cross-walk) — NO re-touch of the shipped material.

**Step 1 — RATIFY the glass-first-class boundary FIRST (the Class-3 hinge, before any W54 source).**
This is the highest-leverage decision in the band. Open the user hinge: does "glass FIRST everywhere,
fix at the ROOT" mean (A) navigation/overlay-band glass-first + functional buttons/items glass +
dock-selected glass, content opaque [the SOTA + library-discipline answer], OR (B) content-layer glass
too [the legibility-regressing reading]? **Recorded default if un-ratified: (A).** Everything
downstream (W54 scope, the page-redesign umbrella, the gate's content-band assertion) keys off this. Do
NOT self-ratify (B) from the "everywhere" phrasing — it re-breaks W52.

**Step 2 — Author + develop W54 (glass-first-class) as the ROOT foundational wave.** Scope per the
research consensus + the pass-3 escalation:
- `--glass-level` scalar at the ONE `--glass-bg-*` `color-mix` seam + the `--glass-blur-*` radii
  (`level=1` byte-identical to today — the clean-break collapse REWRITES the reduced-transparency +
  prefers-contrast brackets to set `--glass-level` instead of clobbering ten rungs).
- the `opaque` tier rung as the `--glass-level:0` endpoint of the SAME axis (recorded default:
  tier-rung over surface-register — `opaque` IS the level-0 endpoint, so it belongs on the tier ladder).
- the "navigation-band glass-first" arm: confirm + (where a functional-layer surface still defaults
  opaque) flip the DEFAULT button/item register to glass; the dock selected-state reads glass
  (keyframes-dock model). GATED against content-layer glass.
- the Q3 hover re-tune folded in: the glass button/dock hover must READ on hover (the `1.035` lift
  overshot down — re-tune to a perceptible-but-restrained magnitude + verify live).
- the two-layer-law canon doc in CLAUDE.md.
- machine-lock `proof:glass-level`: the level scalar threads both ladders; `level=1` byte-identical;
  the opaque rung resolves solid + `backdrop-filter:none`; **CONTENT-BAND-STAYS-OPAQUE** (the
  load-bearing assertion); + the π live arm (the glass default reads, the hover reads, content stays
  legible). dependsOn W52 (landed). Overfitting bar clears (content Card + form-over-aurora + the a11y
  opaque path = ≥2).

**Step 3 — Author + develop W55 (adaptive-glass-legibility) AFTER W54.** Purely additive on W52's
corrected `plus-lighter` blend + the `--glass-tint-*` seam — ZERO new compositing. The `@container
style(--glass-backdrop)` probe reuses the shipped density-cascade idiom; the darken-over-light is a
re-point of `--glass-tint-source` → warm-ink + a bounded `--glass-tint-strength` lift inside the bright
bucket; `contrast-color()` is the `@supports`-gated native flip; the Clear↔Tinted escape is a
`--glass-clarity` axis reconciled with the existing brackets (NOT a third fork). Gate
`proof:adaptive-glass` reads the rung foreground luminance over synthetic white and asserts ≥4.5:1 (the
π-lane harness). **Do NOT fold into W36** (the research's explicit dedup verdict). This wave is the one
that makes the glass dock legible over the very-light heros the page-redesign will introduce (pass-3
Q4/Q9 — glass cards over aurora/paper/grid heros), so it is a real precondition for that band, not a
nicety.

**Step 4 — Close the Q3 hover-truth + the DELTA / JSON coherence gap at band close.** Re-tune + live-
verify the hover (Q3) and capture it. Write `W52-DELTA.md` (+ W56/W59 DELTAs) from the paired-π the MCP
passes already produced; reconcile the W09/W52/W56/W59 audit JSONs from `live-pending` to `live-verified`
(or have them reference the DELTAs). A band cannot close `complete` with its ledgers claiming
`live-pending` while the commits claim `live-verified` AND a live pass (Q3) refutes the hover — the
soundness discipline forbids the stamp.

**Step 5 — ONE glass-identity token-axis coherence pass.** After W54/W55 author, cross-walk the four
axes — `--glass-level` (W54), `--corner-k-*`/`--corner-shape-*`/`--corner-shape-thumb` (W56/W59,
landed), `--glass-backdrop-luma`/`--glass-clarity` (W55), `--superellipse-k`/`--morph-t` (W42) — so the
`@property` scalars are non-overlapping, the a11y + adaptive + design brackets ride ONE `--glass-level`
opaque path (no W36/W55/reduced-transparency triple-fork), and the dock-morph reads the single
`--corner-k-squircle` vocabulary. This is the band's coherence keystone: four glass-character axes, one
consistent token grammar.

**Step 6 — Confirm the squish-spring (G4) reaches every glass atom at close.** Cross-walk that the
volume-preserving press-squash (W52-ratify atom + W53 tab indicator + the W59 slider cap `scaleX`
squish + the dock press) is the SAME register library-wide, so the Apple-liquid-squishy idiom is
coherent, not per-component-bespoke.

**The band unblocks the page-redesign.** W54 (the glass-card default + the level knob) + W55 (legible
glass over light heros) are the two foundations the pass-3 page-redesign umbrella (Q4/Q7/Q9 — every
story page a glass card over paper/grid/aurora/constellation/fourier heros) stands on. The G-band's
completion is the precondition for that NET-NEW demo-IA wave, not an independent back-of-tranche tidy.

**No code edits in this lane.** The shipped material (W52/W56/W59) is correct + live-verified; the work
is RATIFY (the glass boundary), AUTHOR (W54 as ROOT, then W55), RE-TUNE (Q3 hover live-truth),
DOCUMENT (DELTAs + canon), and COHERE (the token-axis cross-walk). All gestalt, token-first, clean-break
— no patches to the landed glass.
