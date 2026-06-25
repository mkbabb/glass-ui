# GLASS MATERIAL — WAVE-AMENDMENT (concrete tranche amendments)

> Reconciled against the extant 116-wave union set (`docs/tranches/BD/union/waves/`).
> Reference implementation: `docs/tranches/BD/greenfield/glass-material/GOLDEN.md`
> (FOLDED through the three challenges + the live DELTA-ASSAY — the falsified golden
> numbers are NOT inherited; every leg composes an extant seam). No duplicative work:
> the FIELD-ENGINE / AMBIENT / CAST legs AUGMENT extant waves; only the universal
> warm-field register + keyed-edge token are net-new (two augment-class waves).
> **Tranche-dev only; build is user-gated. No legacy, no fork, no dual path.**

---

## SUMMARY — the disposition (augment / new / prune / excise)

| action | wave | why |
|---|---|---|
| **AUGMENT** | `W-GLASS-ABROGATE-GRAY` | FROZEN tokens (leg a); ADD the F1–F4 gate arms (field/edge/transmit) to its own `proof:no-gray` discipline. Re-touch ZERO chroma tokens. |
| **AUGMENT** | `BD.W-AMBIENT-TINT` | the ambient-hue bias seam already specced ≤8% on the self-engage cascade — WIDEN its scope from dock-only to every glass tier OVER the field; add the combined-hue clamp. |
| **NEW** | `BD.W-GLASS-FIELD` (augment-class) | the universal warm-chroma plenum on the EXISTING mounted `<PaperBackdrop>`; the demo-chassis mount; the F1/F4 gate arms. |
| **NEW** | `BD.W-GLASS-KEY-EDGE` (augment-class) | the ONE `--glass-key` token re-pointing the EXISTING two-stop directional rim + the SHIPPED `.shadow-cartoon-*` cast; the F3 defined-edge arm. |
| **PRUNE** | `GOLDEN.md` §3/§5/§7/§8 numbers | the 0.018 bar, the spike's hardcoded `fieldSample`, the `backgroundColor` gate sample, the sign-inverted cast, the conic-on-occupied-pseudo — all struck; replaced by the union legs below. |
| **EXCISE** | none | nothing in the material is broken; no wave is deleted. |

---

## AUGMENT 1 — `W-GLASS-ABROGATE-GRAY.md` (the gate extension; tokens FROZEN)

**File:** `docs/tranches/BD/union/waves/W-GLASS-ABROGATE-GRAY.md`

**Change:** the `--card` / `--glass-saturate-*` / dark-arm tokens (leg a) are **FROZEN,
byte-untouched** (live-confirmed C 0.0123 light / 0.0181 dark — gate-green). EXTEND its
`proof:no-gray` / `tests-visual/no-gray.spec.ts` (arms a–f, `WARM_PLATE_FLOOR = 0.01`,
the KEEP-NEUTRAL byte-asserts, the AA re-ratification — all UNTOUCHED, the field + edge are
additive layers BEHIND the glass, the plate L unmoved) with FOUR new arms that assert the
RELATIONSHIP, so a warm plate over a flat field can no longer green.

**The born-RED arms (the falsified golden numbers REPLACED by paint-derived bars):**

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **F1 field-warmth** | every enrolled glass route paints a warm-field register whose PAINTED composite (sampled via canvas `drawImage`+`getImageData` of the field region — NOT `getComputedStyle().backgroundColor`, which resolves only the flat base, C #3 R2) reads **C ≥ FIELD_FLOOR warm** (H ∈ [45,85]). FIELD_FLOOR is set from the real-spike paint (§spike below), NOT the falsified 0.020. | the flat C 0.0029 H 84.6 page (live) | the warm field renders |
| **F2 composite-over-REAL-field** | the floating/control plate composited over the **painted** field (canvas-sampled) resolves **C ≥ COMPOSITE_FLOOR warm**. COMPOSITE_FLOOR is the honest paint number — likely ~0.012 (a measurable lift over the HEAD 0.0105 composite), NOT the spike-falsified 0.018 (C #1/#2/#3 R1). | the C 0.0105 plate-over-flat-page (live) | field + ambient lift land |
| **F3 defined-edge** | the control/wash rung resolves a non-flat keyed rim (the `--glass-rim-top`/`-bottom` stops carry the directional key) + a non-`none` warm cast + a border α ≥ 8% warm-ink; the rim's lit-edge vs. host **ΔL clears WCAG 1.4.11 (≥3:1 non-text)** — a NUMBER, proven, not a 0.6α white-on-cream whisper (C #3 R8). | the `box-shadow:none` / 5%-α trigger (live) | the keyed rim + cast wire |
| **F4 no-flat-glass (dev-assert, scoped)** | on the ENROLLED demo routes, a `.glass-*` painting with **no warm field compositing behind its box** triggers a dev `console.warn` (the precept as a runtime dev-assert, C #1 R6 / #3 R5). Tests field PRESENCE-BEHIND (not `closest('.paper-field')` — the field is a fixed sibling, NOT an ancestor, so the golden's `closest` arm fails 100% forever, C #1 R3). Scoped to enrolled routes — NEVER teleported portals/toasts (C #2 secondary, false-RED guard). | any current flat-page glass demo (0 fields, 24 glass — live) | the chassis mounts the field |

**The self-test guard (C #3 R2 hardening):** F1/F2 carry a self-test arm — the gate MUST
FAIL on a flat-base field and PASS on the gradient field, proving it reads the chroma layer,
not the achromatic base.

**Paired-engine (C #2 R6):** enroll `no-gray.spec.ts` (or a carved `no-gray-field.spec.ts`)
in the WebKit project `testMatch` in `playwright.config.ts` — OR state honestly "Chromium π +
a `local`-tagged WebKit capture." Pick one; the spec must not promise a gate the harness
can't run.

**Born-RED today** on all four arms (live-confirmed: 0 fields, flat page, `box-shadow:none`).

---

## AUGMENT 2 — `BD.W-AMBIENT-TINT.md` (widen the bias past the dock)

**File:** `docs/tranches/BD/union/waves/BD.W-AMBIENT-TINT.md`

**Current scope (verified):** A4 biases `--glass-tint-source` toward `--glass-ambient-hue`
at `--glass-ambient-strength` (≤8%) on the self-engage cascade, **wired ON for the DOCK
only** (`liquid-morph.css:33-36` `.liquid-stage`); every other surface stays at the `0%`
no-op default. The histogram (`useGlassBackdropLuminance.ts:112-221`) + the `@property
--glass-ambient-strength` (`glass.css:389`) ALREADY ship.

**Change (WIDEN, do not re-mint):** generalize the bias re-point from the dock stage to
every glass tier rendered OVER the warm field (`BD.W-GLASS-FIELD`), at the bounded ≤8%
strength. This is the golden's §5 "transmissive read" leg — but it is a RE-POINT of the
EXTANT `.liquid-stage` seam onto a `[data-paper-field]`-scoped block, NOT the "composable
surgery" the golden §5 implied (the histogram is already general — C #1 R2.2).

**Add the combined-hue clamp (C #1 R4):** the field warmth is counted into the plate up to
three times (intrinsic fill + field-through-blur + ambient-of-that-field). CLAMP the
combined plate-over-field-plus-ambient H to stay in [45,88] for ALL section-accents — skip
the ambient mix when the field already clears the bar (avoid over-rotation past `WARM_HUE_HI`
on a saturated accent). Add a non-default-accent gate case (a violet/teal section-accent +
warm ambient must not land outside [45,88]).

**Gate:** the existing `proof:ambient-hue` A4 (the bias rides the existing tint seam at ≤8%)
EXTENDS to the field-scoped tiers; F2 (above) is the painted witness. **Born-RED** off-dock
today (live: `--glass-ambient-hue: transparent`, `-strength: 0%` on `/forms/select`).

---

## NEW WAVE 1 — `BD.W-GLASS-FIELD` (augment-class; reference: GOLDEN.md §3)

**File to author:** `docs/tranches/BD/union/waves/BD.W-GLASS-FIELD.md`
**Band:** BD union — Band 0 (glass-material) + Band C (demo chassis mount).
**Reference:** `GOLDEN.md` §3 (FOLDED — `paper-field` is NOT a second fixed plane; it is a
warm register ON the EXISTING mounted `<PaperBackdrop>`, C #2 R8).

**The defect (live):** 0 fields behind 24 glass surfaces; the flat `--neutral-0` underpaint
gives the blur nothing to transmit; the warm plate over the flat page composites to C 0.0105
and reads gray. The `<PaperBackdrop>` IS mounted (`AppShell.vue:251`) but paints a flat
neutral ground.

**The build (DEFT — warm the mounted layer, decouple `--neutral-0`):**
1. **`src/styles/paper.css` — a warm-chroma `field` register on `paper-underpaint`.** Add
   three drifting warm radial stops (amber → terracotta → sand) at FIELD lightness (L
   0.90–0.93 light / 0.28–0.34 dark — where the gamut allows real chroma, NOT the gamut-bound
   L0.98 plate) OVER `--neutral-0` (the KEEP-NEUTRAL floor, untouched, decoupled). Gated
   behind a `field` prop / `[data-paper-field]` so the warm stops are OPT-IN (the calm neutral
   underpaint stays the default for solid-chrome routes). Compositor-only drift on a `::before`
   transform (ease, not linear — liquid-weight); PRM freezes the drift, warm stays;
   `prefers-reduced-transparency` → warm-but-static, `--neutral-0` shows.
2. **The mount (band-C):** `<PaperBackdrop field>` on the enrolled glass demo routes (the
   demo chassis — `AppShell.vue` / the storybook page wrapper). The library glass primitive
   is UNCHANGED — it finally has a backdrop worthy of it. This is a presets-in-consumers
   demo-chassis contract, NOT a material-API guarantee (C #1 R6 / #3 R5 — the "enforced by
   construction" language is down-ranked to "the chassis mounts the field").
3. **The exact field chroma/α is the GATE's calibration target** (§spike) — tuned until the
   live PAINTED composite clears F2's honest COMPOSITE_FLOOR, NOT the falsified 0.018.

**The spike (the honest de-risk — REPLACES the golden's falsified one):** a throwaway that
renders the plate over the PAINTED field and reads the ACTUAL pixel behind the plate centroid
(canvas `drawImage`+`getImageData` — NOT a hardcoded `fieldSample`, C #2 R1/R9). Push field
chroma / lower plate-α until a REAL composite clears a legible-AA bar in BOTH modes; quote
THAT number as FIELD_FLOOR / COMPOSITE_FLOOR. If 0.018 is unreachable through an AA plate,
the bar is the honestly-achievable number (~0.012), stated — NEVER an acceptance number the
evidence fails (C #1/#2/#3 R1, the cardinal live-verify lesson).

**The gate (born-RED):** F1 (field-warmth, painted) + F4 (no-flat-glass dev-assert) of the
AUGMENT-1 arms. Born-RED today (0 fields live). GREEN when the field register renders + the
chassis mounts it.

**Fences:** ONE backdrop, warmed (no second fixed plane); `--neutral-0` decoupled + untouched;
`<Aurora>` stays the GL opt-in (the field is the calm CSS floor); no `backdrop-filter:url`, no
SVG goo in the field path (CSS `radial-gradient` + `oklch()` + `transform` — Chrome+Safari
native, C #2 R7 has no trig here).

---

## NEW WAVE 2 — `BD.W-GLASS-KEY-EDGE` (augment-class; reference: GOLDEN.md §4)

**File to author:** `docs/tranches/BD/union/waves/BD.W-GLASS-KEY-EDGE.md`
**Band:** BD union — Band 0 (glass-material).
**Reference:** `GOLDEN.md` §4 (FOLDED — NO conic on an occupied pseudo, NO sign-inverted trig,
NO new layer; the key re-points the EXISTING two-stop rim + the SHIPPED cartoon cast).

**The defect (live):** the Select trigger paints `box-shadow: none` + a 5%-α ink border that
dissolves cream-on-cream — a glass control with no edge melts into its host.

**The build (DEFT — zero new layer, reuse the shipped directional rim + cartoon cast):**
1. **`src/styles/tokens/*.css` — ONE new `--glass-key` token** (the cel keystone, e.g. the
   upper-right key matching the SHIPPED `.shadow-cartoon-*` down-left cast convention —
   `shadow.css:92` `-3px 2px`). NOT `-58deg` with the sign-inverted formula (C #2 R3).
2. **`src/styles/glass/rim.css` — the keyed directional rim is a RE-POINT, not a new conic.**
   The rim ALREADY ships directional (`rim.css:70-83`, BC.W-BLACK-BAR D2: `--glass-rim-top`
   bright catch + `--glass-rim-bottom` warm under-shadow). Drive WHICH edge reads lit vs.
   shade off `--glass-key` — a token re-point of the existing two-stop rim (C #2 R4/R5
   hardening: "parametrize the existing two-stop rim by `--glass-key`"). **The moving-specular
   `::before` catch-light is UNTOUCHED** (it is fully occupied — C #1/#2/#3 R4). NO
   `mask-composite` border-ring, NO third pseudo, NO new DOM node.
3. **The warm cast is the SHIPPED `.shadow-cartoon-*` family** (`shadow.css:92-100`,
   down-left, key upper-right, warm-`--foreground`-tinted). The calm default keeps the
   six-layer cast; the loud register opts in via `<Card surface="cartoon">`. NO bespoke
   `cos()/sin()` trig (no first-use, no `@supports` floor, no box-shadow-drop risk — C #2 R7,
   the light-dark inset-shadow trap class). Rim + cast already agree on one key = the 1940s cel.

**The gate (born-RED):** F3 (defined-edge) of the AUGMENT-1 arms — the keyed rim carries the
directional key, the cast is non-`none` warm, the border α ≥ 8%, AND the rim's lit-edge vs.
host **ΔL ≥ 3:1 (WCAG 1.4.11)** proven with a number (C #3 R8 — the rim must define an edge
for low-vision, not a 0.6α whisper). Born-RED today (`box-shadow: none` live). GREEN when the
key wires.

**Fences:** zero new layer (re-point the shipped rim stops + shipped cast); the catch-light
`::before` and grain `::after` are untouched (both occupied); cross-engine (the cartoon cast
is plain `box-shadow`, the rim is the shipped box-shadow stops — no trig, no conic-from-calc,
no `mask-composite` collision — C #2 R3/R4/R7 all resolved by construction).

---

## PRUNE — `GOLDEN.md` corrections (struck, replaced by the union legs)

These golden claims are FALSIFIED (source/capture-grounded across all three challenges) and
are NOT inherited by the wave amendments:
- **§3/§5/§10 "composited C ≥ 0.018"** → struck; the bar is the honest paint number (~0.012),
  set from a REAL-composite spike (C #1/#2/#3 R1).
- **§3 "spike-calibrated, live-verified" field values + the spike's `fieldSample` constant** →
  struck; the spike re-derives from the painted field, never a hardcoded triple (C #2 R2/R9).
- **§4(A) "the HEAD rim is a flat omnidirectional halo" + "the conic rim composes the EXISTING
  `::before`, zero new layer"** → struck; the rim is ALREADY directional (BC.W-BLACK-BAR D2),
  the `::before` is occupied; the keyed edge re-points the shipped two-stop rim (C #1 R2.1, #2
  R4/R5, #3 R4).
- **§4(B) the `cos()/sin()` cast formula** → struck (sign-inverted + first-use); the cast is
  the shipped `.shadow-cartoon-*` (C #2 R3/R7).
- **§5 "luminance ONLY; the hue term is wired only on the dock"** → struck; the histogram is
  general and ships; the work is widening the bias re-point (C #1 R2.2).
- **§8 the `getComputedStyle().backgroundColor` gate sample** → struck; the gate samples the
  PAINTED field (C #3 R2); F4's `closest('.paper-field')` → field-presence-behind (C #1 R3).
- **§3/§9 "enforced by construction / a flat plate becomes impossible"** → down-ranked to a
  demo-chassis preset contract (C #1 R6, #3 R5).

---

## EXCISE — none

Nothing in the material is broken. The triumvirate cured the gray plate; the field + edge +
transmit are ADDITIVE. No wave is deleted.
