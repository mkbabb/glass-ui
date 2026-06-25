# SELECT (forms) — WAVE-AMENDMENT: the concrete tranche reconcile (vs the 116-wave set)

> The buildable amendment for the welling warm-glass Select. Reconciled against
> `docs/tranches/BD/union/waves/` (the extant set), the sibling greenfield amendments
> (`page-background/`, `motion-spring-register/`, `glass-material/`), and the ledger §6.
> Reference implementation: `./GOLDEN.md` (FOLDING the three challenges' hardenings). Triage:
> **REFINE** (AUGMENT + COUPLE + POUR). No duplicative work — the field/motion/floating mints are
> DEPENDED from siblings; the Select owns only the overlay-floor + portal-field + reveal-couple +
> pour + accent-chip.

---

## A. PRUNE / EXCISE — none

No existing wave is pruned or excised. The Select is a UNION onto shipped seams; it re-points, it
does not replace. The GOLDEN's §10 proposed `W-OVERLAY-WARM-FLOOR` / `W-SELECT-PORTAL-FIELD` /
`W-SELECT-REVEAL-PUNCH` / `W-MENU-POUR` are RECONCILED below — several collapse into DEPEND edges
on sibling waves rather than net-new waves (the dedup).

---

## B. DEPEND (no new wave — the mint lands elsewhere; the Select consumes it)

These were authored as the Select GOLDEN's "Band-0 prerequisites." They are ALREADY OWNED by
sibling greenfield amendments — the Select must NOT re-mint them (the §6-ledger DRY law):

| concern | DEPEND-ON wave (already authored) | what the Select consumes |
|---|---|---|
| warm floating SOURCE | `W-GLASS-ABROGATE-GRAY.md` (**LANDED on disk**) | `--glass-bg-floating` = `hsl(30 85% 96%)`/`hsl(26 22% 17%)`, saturate 1.6/1.28 — the menu reads the warmed tinted seam; **DO NOT re-warm the source** |
| the colorful FIELD + `--field-h` | `BD.W-PAGE-FIELD` + `BD.W-FIELD-SCRIPT` (`page-background/WAVE-AMENDMENT.md`) | `@utility paper-field`, `@property --field-h` (clamped), `warmFieldHue(forms)=48`; the route mounts the field at z below the portal |
| `--ease-cartoon-punch` | `BD.W-CARTOON-PUNCH` (`motion-spring-register/WAVE-AMENDMENT.md`) | the punch `linear()` for the reveal SPATIAL legs + the chevron |
| `--motion-weight` | `BD.W-MOTION-WEIGHT` (`motion-spring-register/WAVE-AMENDMENT.md`) | the weight scalar (PRM→0) scaling the enter-squish + pour |
| trigger edge + hover | tabs GOLDEN `.glass-capsule-hover` + glass-material `--glass-edge-floor` | composed at rest/hover on the trigger; no select-private border |

**The Select RIDES the extant `--spring-snappy` for the default** so it is NOT blocked on the
punch/weight mint — the punch + pour are the calibrated upgrade once those land.

---

## C. AUGMENT (existing waves — widen in place, no fork)

### C1 — `BD.W-GLASS-ABROGATE-GRAY.md` — AUGMENT (the overlay-band warm FLOOR + plate-α drop)

ABROGATE-GRAY owns the warm-source + the `proof:no-gray` gate. The Select's overlay-floor is the
SAME `color-mix toward --glass-tint-source` discipline generalized to the floating/overlay band —
it belongs HERE, not a menu-only fork (the §10 dedup: "do NOT fork a menu-only tint"). ADD:

- **`--overlay-tint-floor` per-mode pair** (PLAIN per-mode arms, NEVER a `light-dark()` fragment —
  the inset-shadow trap): `tokens/glass.css` (light) + `tokens/dark-arm.css` (dark). Calibrated per
  the challenges so the **FILL-ONLY-over-flat composite clears C ≥ 0.02 in BOTH modes** OR, if it
  cannot at a sane value, the floor is honestly re-cast as the amplifier (see C1-note).
- **Widen `--glass-bg-floating-tinted` `:where()`** (`glass/surfaces.css`) to the overlay family
  (`[data-slot=select-content]`, `[data-slot=dropdown-menu-content]`, `[data-slot=popover-content]`)
  using `max(--glass-tint-strength, --overlay-tint-floor)` (a FLOOR, not a clamp). The menu surface
  reads `--glass-bg-floating-tinted` (1 decl on the shipped `[data-slot=select-content]` rule in
  `select.css`).
- **Drop the menu plate α** (0.80→~0.72 light) on the same `[data-slot=select-content]` fill so the
  warmed source + the field TRANSMIT (challenge #3 #1/#2/#6 — give real L-variance; the warmed
  ABROGATE-GRAY source is wasted behind an opaque-ish fill). Dark α stays (it needs the body).

**C1-note (the inverted framing — binding per all three challenges):** the floor ALONE composites
C 0.009–0.013 over flat (live + spike). The honest claim: **the FIELD is the un-gray guarantee;
the floor + the warmed source are the amplifier.** The `prefers-reduced-transparency` opaque-escape
needs a warm `--glass-bg-opaque` arm (the field cannot transmit through an opaque fill) — ADD it
here so the opaque menu reads warm, not gray.

- **Gate impact:** EXTEND `proof:no-gray` with the overlay-band arm — the FILL-ONLY-over-flat
  composite + the menu-over-FIELD composite (the A/B delta). Born-RED: `--overlay-tint-floor` UNSET
  (grep 0, live-verified).

### C2 — `BB.W-LIQUID-REVEAL` / `W-ANIM-IOS27-TUNE` — AUGMENT (the SPATIAL re-clock, family upgrade)

`.glass-reveal` (`glass/reveal.css`) is owned by `BB.W-LIQUID-REVEAL`; the enter-scale 0.88 was set
by `W-ANIM-IOS27-TUNE` (live-confirmed). The re-clock is a one-recipe edit the WHOLE reka overlay
family inherits — it belongs on the reveal recipe's home wave, NOT a select-only wave (the §10
dedup: "the reveal re-clock subsumes any per-overlay smoother-open ask; do NOT mint per-component
reveal waves"). ADD (gated on `BD.W-CARTOON-PUNCH`/`BD.W-MOTION-WEIGHT` DEPEND):

- SPATIAL legs (scale/translate) → `--ease-cartoon-punch × --motion-weight`; EFFECTS legs stay on
  `--ease-out` (the split preserved).
- **enter-scale `calc(1 - 0.20·--motion-weight)`** (challenge-hardened from the GOLDEN's 0.14 —
  the welling must be PERCEPTIBLE; PRM weight 0 → scale 1.0 clean fade).
- **Gate impact:** the reveal-shape arm of `proof:select-forms` (C3 below) measures the deepened
  pre-dip/overshoot on ABSOLUTE scale terms via a compositor-observable method (NOT main-thread
  `getComputedStyle` — challenge #2 R3 / #3 R3: scale transitions run off-thread).

---

## D. NEW WAVES (net-new src — the Select-owned legs the siblings do not cover)

### D1 — NEW `BD.W-SELECT-WELL.md` — the warm-glass listbox: portal-field + couple + accent + pour

**Band B (core component / forms) · Triage R · depends:** `BD.W-PAGE-FIELD`/`BD.W-FIELD-SCRIPT`
(field), `BD.W-CARTOON-PUNCH`/`BD.W-MOTION-WEIGHT` (motion), the C1/C2 augments (floor + reveal
re-clock). Reference: `docs/tranches/BD/greenfield/select-forms/GOLDEN.md`.

The ONE Select-owned wave — the legs no sibling covers. All re-points of shipped seams; ZERO new
component, ZERO fork; the reka selection engine BYTE-FROZEN.

1. **Portal-field re-emit** — `.glass-field-portal::before` recipe in `src/styles/menu.css` (the
   shared menu register) + `data-field-palette` re-emit on the `SelectPortal` root in
   `SelectContent.vue`. **HARDENED per challenges #1/#3:** `inset: 0` (clipped INSIDE — bends THROUGH
   the plate as real L-variance, NOT an `inset:-20%` halo leaking around the box). A normal painted
   layer BEHIND (z −1, NO `backdrop-filter` on it — glass-cannot-sample-glass avoided). `oklch` 3-stop
   warm spine keyed to `--field-h`; `@supports not (oklch)` → `hsl()` arm. **DARK** (challenge #2 R4):
   the dark field stops lift to a real glow band (oklch L ~0.22–0.30, higher chroma) so the §3
   field-thesis is met in dark, not a wash lost in near-black.

2. **Chevron couple** — `SelectTrigger.vue:126` swap the `transition-transform duration-200
   ease-standard` for `[transition:rotate_var(--spring-snappy-duration)_var(--ease-cartoon-punch)]`
   (the `rotate` longhand, composes). One gesture.

3. **The POUR — RE-MECHANIZED for a real index + Safari** (challenge #1 R3 / #2 R1 / #3 R4, the
   load-bearing fixes):
   - `@property --menu-pour-t` in `tokens/property-regs.css` (the `--progress`/`--glass-accent`
     registered-scalar precedent).
   - Per-row windowed read on `.glass-menu-row` (`menu.css`).
   - **REAL index:** a bounded `nth-child` index ladder in `menu.css` (the zero-JS floor, clamp
     beyond N → simultaneous, graceful) AND a `v-for`-index `:style="{'--menu-row-index': i}"` where
     the consumer/author iterates the items (budgeted plumbing, not "the viewport sets it" vapor).
   - **Safari floor:** `@supports (transition-property: --menu-pour-t)` gates the scalar form; ELSE
     a `transition-delay` ladder keyed off `--menu-row-index` on a plain `opacity`/`translate`
     transition (Safari 9+, compositor-only). Correct the GOLDEN §7's "Safari 16.4+" → **18+** for
     the scalar.
   - **Un-clip row-0** (challenge #2 R5): pour the arc from BELOW (positive translate → settle) OR
     `scroll-padding` so the −0.4rem travel lives in unclipped space — the `overflow-y: auto` clip
     shears a from-above arc on the top row.

4. **The warm-accent chip + dot** (the shared row — all 13 SFCs inherit, DRY):
   - `--glass-accent` admit on `[data-highlighted]`/`[aria-selected]` in `menu.css` — **mixed into a
     NEUTRAL base, not the already-tinted `--menu-row-bg`** (challenge #2 R2 / #3 R2 root cause) +
     a luminance lift (light) + `--glass-rim-top` catch-light → **ΔC ≥ 0.02 AND ΔL ≥ +0.05 on
     PAINTED pixels** (the GOLDEN's ΔL was wrong-signed/darker).
   - `--select-dot-color` default → `var(--glass-accent, currentColor)` in `SelectItem.vue` + a
     micro scale-pop. Dot stays `aria-hidden` decorative; reka's `aria-selected` is the a11y truth.

5. **The cartoon weight** (COMPOSE shipped, no new layer): `--shadow-cartoon-lg` under the soft
   elevation + `--paper-grain` overlay on the menu. Static, PRM-immune.

6. **Trigger edge** (DEPEND C-table): compose `--glass-edge-floor` + `.glass-capsule-hover` at
   rest/hover. No select-private border.

**Born-RED gate — NEW `proof:select-forms` (`tests-visual/select-forms.spec.ts`, chromium + webkit,
both modes, NEVER reducedMotion on the reveal/pour arm):** the painted-pixel cardinal rule —
sample the COMPOSITED painted pixel of the actual menu over the actual page (full-page screenshot →
`getImageData`), NEVER `getComputedStyle` over a hardcoded field. Folds the GOLDEN §9 G1–G12 with
the challenge hardenings:

- **G1 field-present** · **G2 menu-warm-not-gray** (painted C ≥ 0.02 warm + **explicit L-variance
  floor stdev ≥ 0.01 on the menu INTERIOR**, challenge #1 R4 / #3 #2 — a halo fails) · **G3 the A/B
  delta** (menu-over-field vs menu-over-flat, **ΔC ≥ 0.015 NON-NEGOTIABLE**, challenge #1 R4; dark
  arm required, challenge #2 R4) · **G4 dark-warm** · **G5/G6 reveal** (ABSOLUTE pre-dip ≥1% below
  closed / overshoot ≥2% above 1.0, measured via `performance_start_trace` compositor frames or a
  WAAPI per-frame screenshot diff, NOT main-thread `getComputedStyle` — challenge #2 R3 / #3 R3) ·
  **G7 chevron couple** · **G8 the POUR** (stagger on BOTH the scalar arm AND the `webkit`
  delay-ladder arm, challenge #2 R1; **+ row-0 arc not clipped**, challenge #2 R5) · **G9 warm-accent
  chip** (painted ΔC ≥ 0.02 AND **ΔL ≥ +0.05 POSITIVE**, challenge #2 R2 / #3 R2) · **G10
  trigger-edge** · **G11 PRM** (clean fade, warm plate + field + accent present) · **G12 anti-evasion
  ≥6 bites** + the challenge bites: the **FILL-ONLY-over-flat-fails** bite (challenge #1 R1 / #3 R6),
  the **halo-not-interior** bite, the **dark-A/B-delta** bite, the **Safari-<18-delay-ladder**
  bite, the **multi-open frame-series** (open/close ×5, no reload — the `@property` stale-latch,
  challenge #3 R7).

**Born-RED on HEAD (live-verified this pass):** `--field-h` UNSET (0 fields); `--overlay-tint-floor`
UNSET; `--menu-pour-t`/`--menu-row-index`/`--ease-cartoon-punch`/`--motion-weight` UNSET; chevron IS
`transition-transform duration-200 ease-standard`; highlighted row bg byte-identical to a quiet row
(ΔC≈0/ΔL≈0); `--glass-accent` `rgba(0,0,0,0)`. Genuine.

---

## E. RECONCILE LEDGER (what changed vs the GOLDEN §10 and why — no dup)

| GOLDEN §10 proposed | RECONCILED to | why |
|---|---|---|
| `W-OVERLAY-WARM-FLOOR` (new) | **AUGMENT `BD.W-GLASS-ABROGATE-GRAY` (C1)** | the floor is the SAME warm-source seam ABROGATE-GRAY owns, generalized to the overlay band; a menu-only tint would fork it (§10's own dedup law). The warm-accent chip + dot ride the same C1 augment + D1. |
| `W-SELECT-PORTAL-FIELD` (new) | **DEPEND `BD.W-PAGE-FIELD`/`BD.W-FIELD-SCRIPT` + fold the portal re-emit into D1** | the field mint is owned by page-background; only the portal re-emit (the structural close of the portal-gray hole) is Select-owned → D1.1. |
| `W-SELECT-REVEAL-PUNCH` (new) | **AUGMENT `BB.W-LIQUID-REVEAL`/`W-ANIM-IOS27-TUNE` (C2)** + chevron in D1.2 | the reveal re-clock is a FAMILY upgrade on the shared recipe — it belongs on the recipe's home wave, not a select fork (§10 dedup). The chevron couple is the one select-local bit. |
| `W-MENU-POUR` (new) | **fold into D1.3** | the pour rides the shared `.glass-menu-row`; it is the Select wave's boldest leg, not a separate wave (a separate POUR wave would need its own consumer — D1 already owns the row legs). |
| `proof:select-forms` (new) | **kept as the D1 gate** | the painted-pixel born-RED, hardened with the 6 challenge bites. |

**NET amendment:** 1 NEW wave (`BD.W-SELECT-WELL`) + 2 AUGMENTs (`W-GLASS-ABROGATE-GRAY`,
`BB.W-LIQUID-REVEAL`) + 5 DEPEND edges (page-field, field-script, cartoon-punch, motion-weight,
tabs/glass-material edge). The GOLDEN's 4-new-waves collapse to 1-new + 2-augments by the dedup —
the field/motion/floating mints are sibling-owned, the reveal re-clock is a family upgrade.
