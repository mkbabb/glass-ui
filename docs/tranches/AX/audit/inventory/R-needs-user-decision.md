# R — needs-user-decision inventory (AX tranche, step-back)

**Lane** R · INVENTORY (read-only, planning) · **HEAD** c72d2ac (3.8.0 + convergence-1
W44-W52 + convergence-2 W53-W59) · **Scope** every open NEEDS-USER-DECISION / RATIFY /
USER-ADJUDICATED hinge across the convergence + wave + charter docs, listed crisply so
the user can adjudicate. These gate certain waves from driving.

The AX charter defines a closed class for these: **§5.3 ratify-before-drive decisions**
(`AX.md:2638`) + the §6.2 **Class-3 HALT-AND-RATIFY** boundary (`AX.md:2693`) — an agent
NEVER self-ratifies a USER-ADJUDICATED hinge (§6.1(iii), `AX.md:2687`); it halts and
surfaces. Each item below carries its **recorded default** (what the autonomous lane does
if the user never adjudicates) so the user can simply confirm-or-override.

The four items the lane prompt names — chassis-retire D12, the ColorSwatch primitive, the
squircle "and the like", and glass-default-vs-opaque — are all present and itemized below,
plus the residual G/DK ratify hinges and the older charter §5.3 list still open at HEAD.

---

## TABLE — every open decision, crisp (the user adjudicates each)

| # | Decision | Wave(s) | Recorded default (un-ratified) | Class |
|---|---|---|---|---|
| **R1** | **Squircle "and the like" membership** — which large-radius surfaces beyond the big-dock get `corner-shape: superellipse` (dialogs? sheets? Configurator/large panels? hero glass overlays?). | W56 (G3) | **big-dock ONLY**; all others stay round; each extra surface is a one-line `--corner-shape-<surface>` opt-in if the user wants it. | needs-user-decision (design call, not a halt) |
| **R2** | **ColorSwatch primitive — mint vs keep-native.** 3 native `type="color"` sites (atoms seed, palette derive-seed, OklchStopRow hex-paste). Mint a real `ColorSwatch`/color primitive (≥2-consumer bar cleared) OR keep the native swatch as a deliberate hex-paste affordance. | W38/W38b | **keep native** (no library primitive); minting a library primitive is a scope class W38 forbids → route to a dedicated sub-wave only if ratified. | §5.3 RATIFY-BEFORE-IMPL |
| **R3** | **glass-default-vs-opaque framing.** The user's "why is the DEFAULT not glass" implies the CONTENT layer should be glass too. SOTA + glass-ui's own no-glass-on-glass discipline say NO (content stays opaque; glass is the navigation/overlay default). Confirm "glass-first-class" = *navigation/overlay band's documented glass default + tunable `--glass-level` + an explicit `opaque` escape variant*, NOT glass-on-content. | W54 (G1) | **do NOT put glass on the content layer**; ship the `--glass-level` single-knob + first-class `opaque` tier-variant + the two-layer-law canon doc. | needs-user-decision (RATIFY hinge inside W54) |
| **R4** | **Chassis-retire confirm (D12).** "I thought the instrument chassis was to be removed?" — confirm the retire is intentional-but-PENDING (cross-repo native-first), not a stale survivor. | W28 → W29 | **already decided** (`AW repatriation/_DECISION.md`, user policy 2026-06-07): instrument-chassis = REPATRIATE, instrument-rail = PRUNE. Resolved-to-`augment` — only a PROGRESS-ledger visibility note is owed. | confirm-intent (effectively resolved) |
| **R5** | **Glass-scrubber rename (W23).** Rename the slider CVA key `standard` → `glass-scrubber` across the keyset + every call-site, OR keep `standard` as the CVA key with glass-scrubber as the prose name only. | W23 | **ACCEPT** — keep `standard` (zero call-site churn; no-backwards-compat precept satisfied; glass-scrubber stays prose). | §5.3 USER-ADJUDICATED |
| **R6** | **Card `specular` default — `off` vs `subtle` (W09).** Default the `<Card specular>` prop to `subtle` (rest≈0) or `off`. | W09 | **resolve-by-intent** (ratified by 3 consumers): content/data-backplate Cards default `off`; hero/glass surfaces default `subtle` (rest≈0). The prop default for the content-Card case is `off`. | §5.3 RATIFY (effectively resolved) |
| **R7** | **W42 second-consumer + distinct-wave.** Which glass primitive is the `useLiquidMorph` second consumer (tab-indicator glide vs card→detail expand), AND distinct-wave vs fold-into-W01. RATIFY against the live re-diagnosis at wave-open. | W42 | no recorded auto-default — **the one remaining open hinge** (`PROTOTYPE-HARDEN.md` 2A); GO only iff the second consumer reads BETTER off the substrate. | §5.3 USER-ADJUDICATED |
| **R8** | **Font register / Fraunces (W22).** KILL Fraunces (AS-P5) + re-ground onto Plus-Jakarta, OR SHIP the full-axes face + re-scope W22 to the body-default fix. | W22 | the W22 §Archaeology adjudicates; autonomous default is the body-default-off-Fraunces fix. **NOTE: W22 closed `complete` at 3.8.0** — this hinge is RESOLVED (kept here for the §5.3 record only). | §5.3 USER-ADJUDICATED (resolved at 3.8.0) |
| **R9** | **WebGPU-parity-default (W07↔W14).** Keep WebGPU as an OPT-IN enhancement over a parity-floor field (de-facto DELETE branch) vs W14 ports the six mediums into WGSL. | W14 | autonomous default = **EXCISE branch** (WebGPU stays opt-in, no medium WGSL port) if no override within the wave window. | §5.3 RATIFY-BEFORE-IMPL |
| **R10** | **POS_SCALE regime (W08/W15).** The minimal un-flood regime W08 owns + W15 inherits (KEEP) vs a full wrapper-normalized re-derivation (atomic, W15 only). | W08/W15 | **KEEP** the minimal un-flood (decided once, §4 note 13; `AX.md:689`). | §5.3 (effectively decided) |

---

## DETAIL — the four lane-named items + the residual hinges

### R1 — Squircle "and the like" membership (W56 / G3) — OPEN design call

Source: `convergence2/A-squircle-pivot.md` §4 + `R-squircle.md` + `waves/AX.W56-…md:72-77`.

The user's G3 ask: *"rounded for cards, rounded for (small) docks, but **big-docks + the
like** → squircles."* The big-dock is unambiguous and is the ONE shipped squircle surface
after W56's re-home. **"and the like" is a design call the wave must NOT guess.** The
candidate large-radius family (surface to user, do NOT default-in):

- Dialogs / `--radius-dialog` (2xl) — large overlay, plausible squircle.
- Large panels / `--radius-panel`, the Configurator panel.
- Sheets / Drawer top corners.
- Hero glass overlays.

Explicitly NOT: cards (round by policy), pills/buttons/badges (round/stadium),
inputs/controls (small radius where the superellipse is imperceptible anyway).

W56 is DEV-COMPLETE with **default = big-dock ONLY** (`AX.W56:72-77`). Each additional
surface is a trivial `--corner-shape-<surface>` re-point — zero-risk opt-in. **The user
adjudicates the membership list.** This is a `needs-user-decision` FACET, not a halt: the
wave ships with the big-dock-only default and the user opts surfaces in.

### R2 — ColorSwatch primitive: mint vs keep-native (W38) — §5.3 RATIFY-BEFORE-IMPL

Source: `convergence/D1.md:113-133` + `convergence/CONVERGENCE-PLAN.md:40` +
`A-waves-aurora.md:84`.

The aurora demo configurator has **3 native `<input type="color">` sites**:
`AuroraAtomsPanel.vue:82-87` (seed), the palette derive-seed, and `OklchStopRow`'s
hex-paste. The W38 demo-idiom pass transposes the 9 native controls onto library
primitives (`LabeledSelect`/`LabeledSlider`). The color swatch is the **single
exception**: glass-ui ships **no color-picker primitive** today. The decision:

- **MINT** a real `ColorSwatch`/color primitive — the 3 sites clear the ≥2-consumer
  overfitting bar, so it would be a legitimate library primitive; BUT minting a library
  primitive is a scope class W38 explicitly forbids → route to a dedicated sub-wave.
- **KEEP NATIVE** — keep the native `type="color"` swatch as a deliberate hex-paste
  affordance (matching `OklchStopRow`'s documented rationale).

**Recorded default: KEEP NATIVE** (no library primitive; W38's compose-only precept). The
user adjudicates before W38 impl. This is the one RATIFY in D1's whole fold
(`D1.md:133`: "the single exception requiring RATIFY is the color-swatch primitive").

### R3 — glass-default-vs-opaque (W54 / G1) — RATIFY hinge

Source: `convergence2/R-glass-default.md:82` (the explicit `needs-user-decision flag`) +
`A-glass-tokens.md`.

The user's G1: *"Glass should be FIRST-CLASS … Why is the DEFAULT not glass?"* The naive
read — make every surface glass — is WRONG per Apple-SOTA (the two-LAYER law: glass is the
navigation/overlay default, the CONTENT layer stays opaque) AND per glass-ui's own
`no-glass-on-glass` discipline. Putting glass on content would re-break exactly the
legibility W52 just fixed. The RATIFY: **confirm "glass-first-class" means the
navigation/overlay band's deliberate documented glass default + a tunable `--glass-level`
single-knob + an explicit `opaque`/solid escape variant — NOT glass on content surfaces.**

**Recorded default** (`R-glass-default.md:82`): do NOT put glass on the content layer;
deliver the `--glass-level` scalar (one `@property`, default 1, multiplies the opacity +
blur ladders) + the first-class `opaque` tier-variant (Apple's `.identity` made a design
choice, routed through the existing reduced-transparency opaque path) + the two-layer-law
canon doc. **W54 has NO wave doc authored yet** (PROGRESS shows `planned`) — this hinge is
live and un-resolved; it should be the W54 §RATIFY-BEFORE-IMPL.

### R4 — Chassis-retire confirm (D12) — confirm-intent, effectively resolved

Source: `convergence/D12.md` (full disposition) + `AW repatriation/_DECISION.md` (user
policy 2026-06-07).

The user saw the InstrumentChassis still shipping and asked "I thought it was to be
removed?" **The decision was ALREADY MADE** — `_DECISION.md`, user policy 2026-06-07 ("the
instrument chassis is not general enough, too"):

- **instrument-chassis → REPATRIATE** (domain-specific composition, ~10 speedtest + ~7
  muster consumers, but "not general enough"): land native in speedtest+muster, then
  strike from glass-ui. Owned by **W28 (native-first receive) → W29 (prune)**.
- **instrument-rail → PRUNE** (true zero-consumer orphan, L invariant 8). Owned by **W29**.

It still ships at HEAD because the retire is cross-repo native-first sequenced (W28/W29
sit behind the dock/graphics/aurora/blob arc). **The ONLY D12 action is a PROGRESS-ledger
visibility note** so the next live-audit pass does not re-file it. No net-new wave, no
W19/W20/W21 augment. This `needs-user-decision` resolved-to-`augment` because the decision
pre-exists — the user only needs to CONFIRM the prior policy still holds. (If the user now
wants the chassis retired in glass-ui ahead of the native-receive, that re-sequences
W28/W29 — but that contradicts inv-16' dangling-import safety and is not recommended.)

### R5 — Glass-scrubber rename (W23) — §5.3 USER-ADJUDICATED

Source: `waves/AX.W23-…md:145-150,282` + `AX.md:2648`.

The AV.W11-era directive asked to rename the slider CVA key `standard` →
`glass-scrubber`. The shipped code keeps `standard` as the CVA `defaultVariant` with a
doc-comment naming the glass-scrubber INTENT. The decision gate:

- **RENAME** `standard` → `glass-scrubber` across the keyset + every call-site (incl. the
  consumer ports SignalsLayer:113 + CommandPalette:485 + slides — routed to W34).
- **ACCEPT** — keep `standard`; glass-scrubber stays the prose name only.

**Recorded default: ACCEPT** (`AX.W23:150`) — zero call-site churn, no-backwards-compat
satisfied. This is a USER-ADJUDICATED naming decision (not a runtime defect); the
DEFAULT-ACCEPT path makes no rename edit.

### R6 — Card `specular` default `off` vs `subtle` (W09) — §5.3, effectively resolved

Source: `waves/AX.W09-…md:160-162,444-472` + `AX.md:2655`.

Add `specular?: 'off' | 'subtle' | 'full'` to `<Card>`; what is the default? The W09
live-feedback fold (§24) records a **consumer-confirmed resolution** (three live
consumers): the default resolves **by intent** — content/data-backplate Cards default
`off`; hero/glass surfaces default `subtle` (rest≈0). So the prop default for the
content-Card case is `off`. **Effectively resolved**; the recorded auto-default if it
re-opens un-ratified is `subtle` (rest≈0) per the §21 no-user-gate rule.

### R7 — W42 second-consumer + distinct-wave — §5.3, THE one remaining open hinge

Source: `PROTOTYPE-HARDEN.md` lines 36 + 71 + `AX.md:2652` + `waves/AX.W42 §Open-Questions`.

`useLiquidMorph` (the net-new §18.3 unified morph substrate) needs a SECOND consumer to
clear the ≥2-consumer bar. Two candidates: the `UnderlineTabs`/tab-indicator glide vs a
card→detail expand. AND: distinct-wave vs fold-into-W01. **GO only iff the second consumer
reads BETTER (not just compiles) off the substrate** — RATIFY against a real morph at
wave-open. No recorded auto-default; this is the genuinely-open API hinge
(`PROTOTYPE-HARDEN.md:71`: "the one remaining open hinge"). Note: W53 already unified the
tabs family onto its OWN `useTabIndicator` engine — so if the tab-indicator was the
intended second consumer, the W42 second-consumer choice must be RE-EVALUATED against the
post-W53 reality (the tab indicator now has its own glide engine; it may no longer be the
natural `useLiquidMorph` consumer). Flag for the user.

### R8-R10 — older §5.3 hinges (status notes)

- **R8 Font/Fraunces (W22):** RESOLVED — W22 closed `complete` at 3.8.0 (the font register
  reconciliation shipped). Kept here only for the §5.3 ledger completeness.
- **R9 WebGPU-parity (W14):** OPEN — W14 still `planned`. Autonomous default = EXCISE
  (WebGPU stays opt-in, no medium WGSL port) per the §4 note 14 forcing function. Tied to
  the PoC #15 `device.lost` wire-vs-excise ratify.
- **R10 POS_SCALE (W08/W15):** DECIDED ONCE (`AX.md:689`) — KEEP the minimal un-flood. Not
  a live open hinge.

---

## Items checked and found NOT to be open user-decisions (de-dup, so the user is not asked spuriously)

- **W47 van-Gogh rename** ("Oil Swirl" → "Van Gogh", `OIL_VANGOGH` → `VANGOGH`) — this is a
  CLEAN-BREAK key rename per the wave doc (`AX.W47:108`), NOT user-gated. The user already
  ASKED for it (D2 "where are the van-Gogh items?"). No adjudication owed.
- **W19 glyph-face P3 ("likely remove")** — DECIDED to remove. The wave is born-RED on the
  glyph-face excision (`AX.W19:33`); the "likely" was the pre-audit hedge, now resolved to
  a clean prune (zero binary consumers). No user-decision.
- **W19 disco-glyph / header-ribbon / glass-carousel (P2/P4) / use-token-color (P1)** —
  all decided-to-prune (substrate-without-consumer-binary, L invariant 8). No adjudication.
- **G2 adaptive-glass (W55)** — NOT a user-decision; it is a SOTA-research → impl lane
  (`R-ios27-adaptive-glass.md` + `A-glass-over-light.md`). The bounded AA floor (≤~18-24%)
  is a tuning magnitude the orchestrator owns at live-audit, not a user-gate.

---

## GAPS surfaced by this inventory

1. **W54 (G1 glass-first-class) has NO wave doc authored** — yet it carries the live R3
   glass-default-vs-opaque RATIFY hinge. The hinge must be the W54 §RATIFY-BEFORE-IMPL when
   the wave is authored. Until then the hinge floats un-homed in `R-glass-default.md:82`.
2. **W55 (G2 adaptive-glass) has NO wave doc authored** — the research+audit pair exists
   (`R-ios27-adaptive-glass.md` + `A-glass-over-light.md`) but no wave spec. The
   `A-glass-over-light` finding (the dock bypasses the `--glass-tint-*` seam) MUST land in
   the W55 scope.
3. **R7 W42 second-consumer is STALE vs W53** — W53 unified tabs onto its own
   `useTabIndicator` engine. If the tab-indicator was the intended `useLiquidMorph` second
   consumer, that choice is now contradicted and must be re-evaluated. This is the most
   load-bearing open hinge and it has drifted under the convergence-2 work.
4. **D12 PROGRESS-ledger note is OWED but unwritten** — `convergence/D12.md:110-115`
   prescribes a one-line "confirm-intent, satisfied-by-plan" note under W28/W29 so the
   next live-audit does not re-file it. PROGRESS.md has the W28/W29 rows but no D12
   intentional-pending annotation. (Read-only lane — recorded as a gap, not actioned.)

---

## PATH FORWARD (gestalt — planning only)

The needs-user-decision items split into THREE adjudication classes; surface them to the
user as ONE crisp batch so the gated waves can drive:

1. **Two genuine design calls the user must make** (no safe auto-default that satisfies
   intent): **R1** (squircle "and the like" membership — ship the candidate list, the user
   ticks surfaces; default big-dock-only) and **R3** (confirm glass-first-class = nav/overlay
   default + level-knob + opaque-escape, NOT glass-on-content). These should ride the W56
   close note (R1) and the W54 §RATIFY (R3).

2. **Two §5.3 ratify hinges with strong recorded defaults the user need only confirm**:
   **R2** (ColorSwatch — default KEEP NATIVE) and **R5** (glass-scrubber — default ACCEPT
   `standard`). Confirm-or-override; both default to the zero-churn / no-new-surface path,
   which is the precept-aligned choice.

3. **One stale hinge needing re-evaluation before adjudication**: **R7** (W42
   second-consumer) — the W53 tabs-unify changed the landscape; re-diagnose the second
   consumer against the post-W53 reality BEFORE asking the user, then bring the
   re-grounded choice to ratify.

The rest are RESOLVED (R4 chassis already-decided/augment-only, R6 specular resolved-by-
intent, R8 Fraunces shipped, R10 POS_SCALE decided-once) or NOT a user-gate (R9 WebGPU
autonomous-EXCISE, G2/W55 orchestrator-tuned, the W19 prunes decided). The user adjudicates
**R1 + R3** (design), **confirms R2 + R5** (ratify-with-default), and **re-grounds R7**.
Close the D12 PROGRESS-ledger gap as a bookkeeping note when the index is next touched.
